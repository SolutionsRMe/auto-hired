import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe with the publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

interface BillingOptionsProps {
  user: {
    id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    plan: 'free' | 'pro' | 'pwyw';
  };
  onSuccess?: () => void;
}

export default function BillingOptions({ user, onSuccess }: BillingOptionsProps) {
  const [choice, setChoice] = useState<'pro' | 'pwyw'>('pro');
  const [amount, setAmount] = useState<string>('0');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChoice(e.target.value as 'pro' | 'pwyw');
    setError(null);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and one decimal point
    const value = e.target.value.replace(/[^0-9.]/g, '');
    // Ensure only two decimal places
    const parts = value.split('.');
    if (parts[1] && parts[1].length > 2) return;
    setAmount(value);
  };

  const startPro = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const res = await fetch('/api/billing/checkout', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to start checkout');
      }
      
      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      console.error('Error starting Pro checkout:', err);
      setError(err instanceof Error ? err.message : 'Failed to start checkout');
    } finally {
      setIsLoading(false);
    }
  };

  const startPWYW = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const cents = Math.round((parseFloat(amount) || 0) * 100);
      
      // For $0, we handle it directly without Stripe
      if (cents === 0) {
        const res = await fetch('/api/billing/pwyw-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amountCents: 0 }),
        });
        
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || 'Failed to process PWYW');
        }
        
        const data = await res.json();
        if (data.granted) {
          onSuccess?.();
          return;
        }
        return;
      }
      
      // For non-zero amounts, create a PaymentIntent
      const res = await fetch('/api/billing/pwyw-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountCents: cents }),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create payment intent');
      }
      
      const data = await res.json();
      
      if (data.granted) {
        onSuccess?.();
      } else if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      }
    } catch (err) {
      console.error('Error starting PWYW flow:', err);
      setError(err instanceof Error ? err.message : 'Failed to process payment');
    } finally {
      setIsLoading(false);
    }
  };

  if (clientSecret) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PWYWConfirm 
          amount={amount} 
          onSuccess={onSuccess}
          onBack={() => setClientSecret(null)}
        />
      </Elements>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Choose your plan</h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
          <p>{error}</p>
        </div>
      )}
      
      <fieldset className="space-y-4 mb-6">
        <legend className="sr-only">Billing options</legend>
        
        {/* Pro Plan Option */}
        <div className="relative">
          <input
            type="radio"
            id="pro-plan"
            name="billing-option"
            value="pro"
            checked={choice === 'pro'}
            onChange={onSelect}
            className="sr-only"
            aria-describedby="pro-plan-description"
          />
          <label 
            htmlFor="pro-plan" 
            className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              choice === 'pro' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Pro — $9/month</h2>
                <p id="pro-plan-description" className="mt-1 text-sm text-gray-600">
                  Unlimited applications, resume tailoring, and analytics.
                </p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <div className="h-5 w-5 rounded-full border-2 flex items-center justify-center">
                  {choice === 'pro' && (
                    <div className="h-3 w-3 rounded-full bg-blue-600" />
                  )}
                </div>
              </div>
            </div>
          </label>
        </div>
        
        {/* PWYW Option */}
        <div className="relative">
          <input
            type="radio"
            id="pwyw-plan"
            name="billing-option"
            value="pwyw"
            checked={choice === 'pwyw'}
            onChange={onSelect}
            className="sr-only"
            aria-describedby="pwyw-plan-description"
          />
          <label 
            htmlFor="pwyw-plan" 
            className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              choice === 'pwyw' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">
                  Recent Grad / First-Time Job Seeker — Pay What You Want (one-time)
                </h2>
                <div className="flex-shrink-0 ml-4">
                  <div className="h-5 w-5 rounded-full border-2 flex items-center justify-center">
                    {choice === 'pwyw' && (
                      <div className="h-3 w-3 rounded-full bg-blue-600" />
                    )}
                  </div>
                </div>
              </div>
              
              <div id="pwyw-plan-description" className="mt-2 text-sm text-gray-600">
                <p className="mb-2">
                  Pay any amount you can afford, starting from $0. Every bit helps us support more job seekers!
                </p>
                
                <div className="mt-3 flex items-center">
                  <label htmlFor="pwyw-amount" className="sr-only">
                    Enter your amount in US dollars
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="text"
                      id="pwyw-amount"
                      inputMode="decimal"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2 border"
                      placeholder="0.00"
                      value={amount}
                      onChange={handleAmountChange}
                      aria-describedby="amount-currency"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm" id="amount-currency">
                        USD
                      </span>
                    </div>
                  </div>
                </div>
                
                {parseFloat(amount || '0') > 0 && parseFloat(amount) < 5 && (
                  <p className="mt-2 text-xs text-yellow-600">
                    Note: Payments under $5 may have higher processing fees.
                  </p>
                )}
              </div>
            </div>
          </label>
        </div>
      </fieldset>
      
      <div className="mt-6">
        {choice === 'pro' ? (
          <button
            type="button"
            onClick={startPro}
            disabled={isLoading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isLoading 
                ? 'bg-blue-400' 
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
            aria-label="Subscribe to Pro for $9 per month"
          >
            {isLoading ? 'Processing...' : 'Continue to checkout'}
          </button>
        ) : (
          <button
            type="button"
            onClick={startPWYW}
            disabled={isLoading || (choice === 'pwyw' && isNaN(parseFloat(amount)) && amount !== '0')}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isLoading || (choice === 'pwyw' && isNaN(parseFloat(amount)) && amount !== '0')
                ? 'bg-green-400' 
                : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            }`}
            aria-label="Continue with Pay What You Want"
          >
            {isLoading ? 'Processing...' : 'Continue'}
          </button>
        )}
        
        <p className="mt-3 text-center text-sm text-gray-500">
          {choice === 'pro' 
            ? 'You\'ll be redirected to complete your subscription.'
            : 'No credit card required for $0. For other amounts, you\'ll enter payment details next.'}
        </p>
      </div>
    </div>
  );
}

interface PWYWConfirmProps {
  amount: string;
  onSuccess?: () => void;
  onBack: () => void;
}

function PWYWConfirm({ amount, onSuccess, onBack }: PWYWConfirmProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cents = Math.round((parseFloat(amount) || 0) * 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw submitError;
      }

      const { error: confirmationError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/billing/success`,
        },
        redirect: 'if_required',
      });

      if (confirmationError) {
        throw confirmationError;
      }

      // As a fallback (in case webhooks are delayed), tell the server
      const res = await fetch('/api/billing/pwyw-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountCents: cents }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to complete payment');
      }

      onSuccess?.();
    } catch (err) {
      console.error('Error confirming payment:', err);
      setError(err instanceof Error ? err.message : 'Failed to process payment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <button
        type="button"
        onClick={onBack}
        className="text-sm font-medium text-blue-600 hover:text-blue-500 mb-6 inline-flex items-center"
      >
        <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to plan selection
      </button>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Complete your payment</h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
          <p>{error}</p>
        </div>
      )}
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Amount to pay:</span>
          <span className="font-medium">${parseFloat(amount).toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-500">
          {cents === 0 
            ? 'You\'ll get full access to all premium features for free.'
            : 'Thank you for supporting AutoHired! Your one-time payment helps us continue improving our service.'
          }
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <PaymentElement />
        
        <div className="mt-6">
          <button
            type="submit"
            disabled={!stripe || isLoading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              !stripe || isLoading
                ? 'bg-green-400' 
                : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            }`}
            aria-label={`Pay $${parseFloat(amount).toFixed(2)}`}
          >
            {isLoading ? 'Processing...' : `Pay $${parseFloat(amount).toFixed(2)}`}
          </button>
          
          <p className="mt-3 text-center text-sm text-gray-500">
            Your payment is secure and encrypted.
          </p>
        </div>
      </form>
    </div>
  );
}
