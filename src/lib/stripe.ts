import { loadStripe, Stripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.warn('VITE_STRIPE_PUBLISHABLE_KEY not found in environment variables');
}

let stripePromise: Promise<Stripe | null> | null = null;

export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise && stripePublishableKey) {
    stripePromise = loadStripe(stripePublishableKey);
  }
  return stripePromise || Promise.resolve(null);
};

export interface CreateCheckoutSessionRequest {
  priceId: string;
  mode?: 'payment' | 'subscription' | 'setup';
}

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

/**
 * Create a Stripe Checkout session
 */
export async function createCheckoutSession(data: CreateCheckoutSessionRequest): Promise<CheckoutSessionResponse> {
  const response = await fetch('/api/stripe/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create checkout session');
  }

  return response.json();
}

/**
 * Redirect to Stripe Checkout
 */
export async function redirectToCheckout(priceId: string, mode: 'payment' | 'subscription' = 'subscription') {
  try {
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }

    const { sessionId } = await createCheckoutSession({ priceId, mode });

    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      console.error('Stripe checkout error:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    throw error;
  }
}

/**
 * Create a customer portal session
 */
export async function createPortalSession(): Promise<{ url: string }> {
  const response = await fetch('/api/stripe/create-portal-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create portal session');
  }

  return response.json();
}

/**
 * Redirect to customer portal
 */
export async function redirectToCustomerPortal() {
  try {
    const { url } = await createPortalSession();
    window.location.href = url;
  } catch (error) {
    console.error('Error redirecting to customer portal:', error);
    throw error;
  }
}

/**
 * Get user's subscription status
 */
export async function getSubscriptionStatus(): Promise<{
  hasActiveSubscription: boolean;
  subscriptions: any[];
}> {
  const response = await fetch('/api/stripe/subscription-status');

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get subscription status');
  }

  return response.json();
}

// Stripe pricing configuration
export const STRIPE_PRICES = {
  PRO_MONTHLY: import.meta.env.VITE_STRIPE_PRO_MONTHLY_PRICE_ID || 'price_1234567890',
  PRO_YEARLY: import.meta.env.VITE_STRIPE_PRO_YEARLY_PRICE_ID || 'price_0987654321',
} as const;

export const PRICING_PLANS = {
  lite: {
    name: 'Lite',
    price: 0,
    interval: null,
    features: [
      'Manual application tracking',
      'Basic job search',
      'Resume builder (1 template)',
      'Up to 5 applications/month',
      'Email summaries',
    ],
  },
  pro_monthly: {
    name: 'Pro',
    price: 29,
    interval: 'month' as const,
    stripePriceId: STRIPE_PRICES.PRO_MONTHLY,
    features: [
      'Everything in Lite',
      'Unlimited automated applications',
      'AI-powered resume optimization',
      'Advanced analytics',
      'Multiple resume templates',
      'Priority support',
      'ATS compatibility scoring',
    ],
  },
  pro_yearly: {
    name: 'Pro',
    price: 290, // $24.17/month when billed yearly
    interval: 'year' as const,
    stripePriceId: STRIPE_PRICES.PRO_YEARLY,
    features: [
      'Everything in Lite',
      'Unlimited automated applications', 
      'AI-powered resume optimization',
      'Advanced analytics',
      'Multiple resume templates',
      'Priority support',
      'ATS compatibility scoring',
      '2 months free (yearly billing)',
    ],
  },
} as const;