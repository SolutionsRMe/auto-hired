import express from "express";
import Stripe from "stripe";
import { isAuthenticated } from "./replitAuth";
import { storage } from "./storage";
import { stripe, stripeService } from "./stripe";

const billingRouter = express.Router();
const stripeWebhookRouter = express.Router();

function assertPaymentsOn(res: express.Response) {
  if (process.env.PAYMENTS_ENABLED !== "true") {
    res.status(400).json({ error: "Payments disabled" });
    return false;
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    res.status(500).json({ error: "Stripe is not configured" });
    return false;
  }

  return true;
}

function getAuthUserId(req: express.Request): string | undefined {
  const auth: any = req.user;
  return auth?.claims?.sub ?? auth?.id;
}

billingRouter.post("/checkout", isAuthenticated, async (req: any, res) => {
  if (!assertPaymentsOn(res)) return;

  const priceId = process.env.STRIPE_PRO_MONTHLY_PRICE_ID;
  if (!priceId) {
    return res.status(500).json({ error: "Pro plan price is not configured" });
  }

  const userId = getAuthUserId(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const customer = await stripeService.ensureCustomer({ ...user, id: userId });
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customer.id,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${req.protocol}://${req.get("host")}/billing/success`,
      cancel_url: `${req.protocol}://${req.get("host")}/billing/cancel`,
      metadata: { userId, plan: "pro" },
    });

    return res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
});

billingRouter.post("/pwyw-intent", isAuthenticated, async (req: any, res) => {
  if (!assertPaymentsOn(res)) return;

  const { amountCents } = req.body as { amountCents: number };
  const parsedAmount = Number(amountCents);
  const cents = Math.floor(Number.isFinite(parsedAmount) ? parsedAmount : NaN);

  if (!Number.isFinite(cents) || cents < 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  const userId = getAuthUserId(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (cents === 0) {
    await storage.updateUser(userId, {
      plan: "pwyw",
      subscriptionStatus: null,
      pwywAmountCents: 0,
      pwywGrantedAt: new Date(),
    });

    return res.json({ clientSecret: null, granted: true });
  }

  try {
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const customer = await stripeService.ensureCustomer({ ...user, id: userId });
    const intent = await stripe.paymentIntents.create({
      amount: cents,
      currency: "usd",
      customer: customer.id,
      description: "Recent Grad / First-Time Job Seeker — Pay What You Want",
      metadata: { userId, kind: "pwyw" },
      automatic_payment_methods: { enabled: true },
    });

    return res.json({ clientSecret: intent.client_secret, granted: false });
  } catch (error) {
    console.error("Error creating PWYW intent:", error);
    return res.status(500).json({ error: "Failed to create payment intent" });
  }
});

billingRouter.post("/pwyw-complete", isAuthenticated, async (req: any, res) => {
  const { amountCents } = req.body as { amountCents: number };
  const userId = getAuthUserId(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    await storage.updateUser(userId, {
      plan: "pwyw",
      subscriptionStatus: null,
      pwywAmountCents: Math.max(0, Math.floor(Number(amountCents) || 0)),
      pwywGrantedAt: new Date(),
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error("Error completing PWYW payment:", error);
    return res.status(500).json({ error: "Failed to complete payment" });
  }
});

stripeWebhookRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    if (process.env.PAYMENTS_ENABLED !== "true") {
      return res.status(200).json({ received: true });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("Stripe webhook secret is not configured");
      return res.status(500).json({ error: "Webhook not configured" });
    }

    let event: Stripe.Event;
    try {
      const signature = req.headers["stripe-signature"] as string;
      event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
    } catch (error: any) {
      console.error("Webhook signature verification failed:", error);
      return res.status(400).send(`Webhook error: ${error.message ?? error}`);
    }

    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;
          const customerId = typeof session.customer === "string" ? session.customer : undefined;
          const userId = typeof session.metadata?.userId === "string" ? session.metadata.userId : undefined;

          if (userId) {
            await storage.updateUser(userId, {
              stripeCustomerId: customerId,
              plan: "pro",
              subscriptionStatus: "active",
              pwywAmountCents: null,
              pwywGrantedAt: null,
            });
          } else if (customerId) {
            await storage.updateUserByCustomerId(customerId, {
              plan: "pro",
              subscriptionStatus: "active",
              pwywAmountCents: null,
              pwywGrantedAt: null,
            });
          }
          break;
        }
        case "customer.subscription.created":
        case "customer.subscription.updated": {
          const subscription = event.data.object as Stripe.Subscription;
          const customerId = typeof subscription.customer === "string" ? subscription.customer : undefined;
          const status = subscription.status;
          const plan = status === "active" || status === "trialing" ? "pro" : "free";

          await storage.updateUserByCustomerId(customerId ?? "", {
            plan,
            subscriptionStatus: status,
            currentPeriodEnd: subscription.current_period_end
              ? new Date(subscription.current_period_end * 1000)
              : null,
          });
          break;
        }
        case "customer.subscription.deleted": {
          const subscription = event.data.object as Stripe.Subscription;
          const customerId = typeof subscription.customer === "string" ? subscription.customer : undefined;
          await storage.updateUserByCustomerId(customerId ?? "", {
            plan: "free",
            subscriptionStatus: "canceled",
            currentPeriodEnd: null,
          });
          break;
        }
        case "payment_intent.succeeded": {
          const intent = event.data.object as Stripe.PaymentIntent;
          if (intent.metadata?.kind === "pwyw" && intent.customer) {
            const amount = typeof intent.amount_received === "number"
              ? intent.amount_received
              : intent.amount ?? 0;

            await storage.updateUserByCustomerId(String(intent.customer), {
              plan: "pwyw",
              subscriptionStatus: null,
              pwywAmountCents: amount,
              pwywGrantedAt: new Date(),
            });
          }
          break;
        }
        default: {
          break;
        }
      }

      return res.json({ received: true });
    } catch (error) {
      console.error("Webhook handling error:", error);
      return res.status(500).json({ error: "Webhook handler failed" });
    }
  }
);

export function hasPremium(user: { plan?: string | null }) {
  return user?.plan === "pro" || user?.plan === "pwyw";
}

export async function requirePremium(req: any, res: express.Response, next: express.NextFunction) {
  try {
    const userId = getAuthUserId(req);
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await storage.getUser(userId);
    if (!user || !hasPremium(user)) {
      return res.status(402).json({
        message: "Premium feature. Choose Pro ($9/mo) or Pay-What-You-Want (one-time).",
        upgradeUrl: "/billing",
      });
    }

    req.currentUser = user;
    return next();
  } catch (error) {
    console.error("Premium guard failed:", error);
    return res.status(500).json({ error: "Premium access check failed" });
  }
}

export { billingRouter, stripeWebhookRouter };
