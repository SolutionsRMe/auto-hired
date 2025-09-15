import React from "react";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import { Link } from "wouter";
import { useSubscription } from "@/hooks/useSubscription";

export const ProOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isPremium } = useSubscription();
  if (!isPremium) return <UpgradeCallout />;
  return <>{children}</>;
};

export function UpgradeCallout() {
  return (
    <div className="border-2 border-accent/40 bg-accent/10 rounded-lg p-6 text-text-light">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Crown className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold">Pro feature</h3>
          </div>
          <p className="text-text-light/80">
            Upgrade to AutoHired Pro to unlock automation, AI resume optimization, and advanced analytics.
          </p>
        </div>
        <Link href="/premium-purchase">
          <Button className="bg-accent hover:bg-[#e85d5d] text-primary">Upgrade</Button>
        </Link>
      </div>
    </div>
  );
}
