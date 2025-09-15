import { useQuery } from "@tanstack/react-query";
import type { Me } from "@/types/app";

export function useSubscription() {
  const { data, isLoading, error } = useQuery<Me>({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await fetch("/api/auth/user");
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      return response.json() as Promise<Me>;
    },
  });

  const isPremium = data?.plan === "pro" || data?.plan === "pwyw";

  return { isPremium, user: data, isLoading, error };
}
