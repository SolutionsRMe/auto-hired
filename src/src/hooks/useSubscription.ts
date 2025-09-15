import { useQuery } from "@tanstack/react-query";

async function fetchMe() {
  const res = await fetch("/api/auth/user");
  if (!res.ok) throw new Error("Failed to load user");
  return res.json();
}

export function useSubscription() {
  const { data, isLoading, error } = useQuery({ queryKey: ["me"], queryFn: fetchMe });
  // Assume API extends user object with subscription info later
  const isPro = !!data?.subscription?.active || false;
  return { isPro, user: data, isLoading, error };
}
