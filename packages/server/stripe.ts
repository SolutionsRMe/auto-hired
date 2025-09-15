import Stripe from 'stripe';
import { storage } from './storage';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY environment variable is required');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
  typescript: true,
});

export interface CreateCheckoutSessionData {
  priceId: string;
  userId: string;
  userEmail: string;
  successUrl: string;
  cancelUrl: string;
  mode?: 'payment' | 'subscription' | 'setup';
}

export interface CreatePortalSessionData {
  customerId: string;
  returnUrl: string;
}

export class StripeService {
  /**
   * Create a checkout session for subscription
   */
  async createCheckoutSession(data: CreateCheckoutSessionData): Promise<Stripe.Checkout.Session> {
    const session = await stripe.checkout.sessions.create({
      customer_email: data.userEmail,
      line_items: [
        {
          price: data.priceId,
          quantity: 1,
        },
      ],
      mode: data.mode || 'subscription',
      success_url: data.successUrl,
      cancel_url: data.cancelUrl,
      metadata: {
        userId: data.userId,
      },
    });

    return session;
  }

  /**
   * Create a customer portal session for managing subscription
   */
  async createPortalSession(data: CreatePortalSessionData): Promise<Stripe.BillingPortal.Session> {
    const session = await stripe.billingPortal.sessions.create({
      customer: data.customerId,
      return_url: data.returnUrl,
    });

    return session;
  }

  /**
   * Get customer by ID
   */
  async getCustomer(customerId: string): Promise<Stripe.Customer | null> {
    try {
      const customer = await stripe.customers.retrieve(customerId);
      return customer as Stripe.Customer;
    } catch (error) {
      console.error('Error fetching customer:', error);
      return null;
    }
  }

  /**
   * Get customer's active subscriptions
   */
  async getCustomerSubscriptions(customerId: string): Promise<Stripe.Subscription[]> {
    try {
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: 'active',
      });
      return subscriptions.data;
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      return [];
    }
  }

  /**
   * Check if customer has active subscription
   */
  async hasActiveSubscription(customerId: string): Promise<boolean> {
    const subscriptions = await this.getCustomerSubscriptions(customerId);
    return subscriptions.length > 0;
  }

  /**
   * Create or retrieve customer
   */
  async createOrRetrieveCustomer(userId: string, email?: string, name?: string): Promise<Stripe.Customer> {
    const user = await storage.getUser(userId);
    const existingId = user?.stripeCustomerId;

    if (existingId) {
      try {
        const customer = await stripe.customers.retrieve(existingId);
        if (!('deleted' in customer && customer.deleted)) {
          return customer as Stripe.Customer;
        }
      } catch (error) {
        console.warn('Existing Stripe customer lookup failed, creating new one', error);
      }
    }

    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        userId,
      },
    });

    await storage.updateUser(userId, { stripeCustomerId: customer.id });

    return customer;
  }

  /**
   * Ensure a customer exists in Stripe, or create one if not
   */
  async ensureCustomer(user: any): Promise<Stripe.Customer> {
    const userId = user?.id || user?.claims?.sub;
    if (!userId) {
      throw new Error('User id is required to ensure a Stripe customer');
    }

    const storedUser = await storage.getUser(userId);
    const candidates = [user?.stripeCustomerId, storedUser?.stripeCustomerId].filter(Boolean) as string[];

    for (const candidate of candidates) {
      try {
        const customer = await stripe.customers.retrieve(candidate);
        if (!('deleted' in customer && customer.deleted)) {
          if (!storedUser?.stripeCustomerId) {
            await storage.updateUser(userId, { stripeCustomerId: candidate });
          }
          return customer as Stripe.Customer;
        }
      } catch (error) {
        console.warn('Stored Stripe customer lookup failed, creating new record', error);
      }
    }

    const email = user?.email ?? storedUser?.email ?? undefined;
    const firstName = user?.firstName ?? storedUser?.firstName ?? '';
    const lastName = user?.lastName ?? storedUser?.lastName ?? '';
    const name = [firstName, lastName].filter(Boolean).join(' ') || undefined;

    const customer = await stripe.customers.create({
      email,
      name,
      metadata: { userId },
    });

    await storage.updateUser(userId, { stripeCustomerId: customer.id });

    return customer;
  }

    // Create new customer
    const customer = await stripe.customers.create({
      email: user.email,
      name: [user.firstName, user.lastName].filter(Boolean).join(' '),
      metadata: { userId: user.id },
    });

    // In a real app, save the stripeCustomerId to your database
    // await storage.users.update(user.id, { stripeCustomerId: customer.id });
    
    return customer;
  }

  /**
   * Create a PaymentIntent for PWYW (Pay What You Want) flow
   */
  async createPaymentIntent(amount: number, customerId: string, metadata: Record<string, string> = {}) {
    return await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: customerId,
      metadata,
      automatic_payment_methods: { enabled: true },
    });
  }

  /**
   * Handle webhook events
   */
  constructWebhookEvent(body: string | Buffer, signature: string): Stripe.Event {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET environment variable is required');
    }

    return stripe.webhooks.constructEvent(body, signature, webhookSecret);
  }
}

export const stripeService = new StripeService();