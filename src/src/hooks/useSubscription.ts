import { useQuery } from "@tanstack/react-query";
import type { Me } from "@/types/app";

export function useSubscription() {
  const { data, isLoading, error } = useQuery<Me>({ 
    queryKey: ["me"], 
    queryFn: () => fetch("/api/auth/user").then(r => r.json())
  });
  const isPro = !!data?.subscription?.active || false;
  return { isPro, user: data, isLoading, error };
}
