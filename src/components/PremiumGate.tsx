import React, { ReactNode, useEffect } from "react";
import { useSubscription } from "@/hooks/useSubscription";

interface PremiumGateProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const PremiumGate = ({ children, fallback }: PremiumGateProps) => {
  const { isPremium } = useSubscription();

  useEffect(() => {
    if (!isPremium) console.log("User hit premium wall:", location.pathname);
  }, [isPremium]);

  return isPremium ? <>{children}</> : <>{fallback ?? <UpgradePrompt />}</>;
};

const UpgradePrompt = () => (
  <div className="border border-dashed border-yellow-500 p-4 rounded text-yellow-800">
    This is a premium feature. <a href="/upgrade" className="underline text-blue-600">Upgrade your account</a> to unlock it.
  </div>
);

export default PremiumGate;
