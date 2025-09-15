import { stripeService } from "../../stripe";
import { db } from "../../db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";

interface SubscriptionInfo {
  active: boolean;
  plan?: "pro_monthly" | "pro_yearly" | null;
  currentPeriodEnd?: number | null;
}

export async function getUserSubscription(userId: string): Promise<SubscriptionInfo> {
  // In development mode or when PAYMENTS_ENABLED is false, return mock data
  const paymentsEnabled = process.env.PAYMENTS_ENABLED === "true";

  if (!paymentsEnabled) {
    return { active: false, plan: null, currentPeriodEnd: null };
  }

  // Fetch stored Stripe customer id for this user
  const [u] = await db.select().from(users).where(eq(users.id, userId));
  const customerId = u?.stripeCustomerId;

  if (!customerId) {
    return { active: false, plan: null, currentPeriodEnd: null };
  }

  const subscriptions = await stripeService.getCustomerSubscriptions(customerId);

  if (!subscriptions || subscriptions.length === 0) {
    return { active: false, plan: null, currentPeriodEnd: null };
  }

  const sub = subscriptions[0];
  const priceId = sub.items.data[0].price.id;

  let plan: SubscriptionInfo["plan"] = null;
  if (priceId === process.env.STRIPE_PRO_MONTHLY_PRICE_ID) plan = "pro_monthly";
  if (priceId === process.env.STRIPE_PRO_YEARLY_PRICE_ID) plan = "pro_yearly";

  return {
    active: sub.status === "active" || sub.status === "trialing",
    plan,
    currentPeriodEnd: sub.current_period_end || null,
  };
}
