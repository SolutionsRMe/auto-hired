import { useSubscription } from "@/hooks/useSubscription";
import { Link } from "wouter";

export function GlobalUpgradeBanner() {
  const { isPremium } = useSubscription();
  if (isPremium) return null;
  return (
    <div className="w-full bg-yellow-50 border-b border-yellow-200 px-4 py-2 text-sm text-gray-900 flex items-center justify-center">
      <span>
        Unlock multi-board automation and advanced tracking with <strong>AutoHired Pro</strong>. {" "}
        <Link href="/billing" className="underline font-medium">Upgrade →</Link>
      </span>
    </div>
  );
}
