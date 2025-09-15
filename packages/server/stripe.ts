import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY environment variable is required');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
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
  async createOrRetrieveCustomer(userId: string, email: string, name?: string): Promise<Stripe.Customer> {
    // First try to find existing customer by email
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      return existingCustomers.data[0];
    }

    // Create new customer
    const customer = await stripe.customers.create({
      email: email,
      name: name,
      metadata: {
        userId: userId,
      },
    });

    return customer;
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