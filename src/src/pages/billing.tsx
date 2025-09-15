import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { redirectToCheckout, PRICING_PLANS } from "@/lib/stripe";
import { Check } from "lucide-react";

export default function Billing() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Choose Your Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Lite */}
            <div className="border-2 border-divider rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{PRICING_PLANS.lite.name}</h3>
              <div className="text-3xl font-bold mb-4">Free</div>
              <ul className="space-y-2 mb-4">
                {PRICING_PLANS.lite.features.map((f: string) => (
                  <li key={f} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-success" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" disabled>
                Current Plan
              </Button>
            </div>

            {/* Pro Monthly */}
            <div className="border-2 border-accent rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{PRICING_PLANS.pro_monthly.name}</h3>
              <div className="text-3xl font-bold mb-1">${PRICING_PLANS.pro_monthly.price}<span className="text-base font-medium">/mo</span></div>
              <ul className="space-y-2 mb-4">
                {PRICING_PLANS.pro_monthly.features.map((f: string) => (
                  <li key={f} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="bg-accent hover:bg-[#e85d5d] text-primary"
                onClick={() => redirectToCheckout(PRICING_PLANS.pro_monthly.stripePriceId!)}
              >
                Upgrade Monthly
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
