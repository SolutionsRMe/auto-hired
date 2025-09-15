import React, { useEffect, useState } from "react";
import BillingOptions from "@/components/BillingOptions";

interface User {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  plan: "free" | "pro" | "pwyw";
  subscriptionStatus?: string | null;
  pwywAmountCents?: number | null;
  pwywGrantedAt?: string | null;
}

export default function Billing() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/user", { credentials: "include" });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = (await response.json()) as User;
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to load billing information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSuccess = () => {
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading billing information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Choose Your Plan</h1>
          <p className="mt-3 text-xl text-gray-500">Select the option that works best for you</p>
        </div>

        {user && (
          <div className="mb-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Current Plan</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {user.plan === "free" && "Free Plan"}
                  {user.plan === "pro" && "Pro Plan ($9/month)"}
                  {user.plan === "pwyw" && `Supporter (Paid $${(user.pwywAmountCents || 0) / 100})`}
                </p>
              </div>
              {(user.plan === "pro" || user.plan === "pwyw") && (
                <div className="mt-3 sm:mt-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <BillingOptions user={user || { id: "", plan: "free" }} onSuccess={handleSuccess} />
        </div>

        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">What's the difference between Pro and Pay What You Want?</h4>
              <p className="mt-1 text-sm text-gray-600">
                The Pro plan is a monthly subscription that gives you full access to all features. The Pay What You Want option is a one-time
                payment that also gives you full access, perfect for recent grads or first-time job seekers on a budget.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Can I change my plan later?</h4>
              <p className="mt-1 text-sm text-gray-600">
                Yes! You can upgrade, downgrade, or cancel your plan at any time. If you choose the Pay What You Want option, you can upgrade to
                Pro later if you need to.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Is there a free trial?</h4>
              <p className="mt-1 text-sm text-gray-600">
                You can use the free plan with basic features. The Pay What You Want option lets you get started for as little as $0 if you're on a
                tight budget.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Need help? <a href="mailto:support@autohired.com" className="text-blue-600 hover:text-blue-500">Contact our support team</a>
          </p>
        </div>
      </div>
    </div>
  );
}
