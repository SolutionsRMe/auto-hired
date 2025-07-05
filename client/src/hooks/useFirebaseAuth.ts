import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { onAuthStateChange, signInWithGoogle, signOutUser, isFirebaseConfigured } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChange((firebaseUser: User | null) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      toast({
        title: "Welcome to AutoHired!",
        description: "You've successfully signed in with Google.",
      });
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "Failed to sign in with Google.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await signOutUser();
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message || "Failed to sign out.",
        variant: "destructive",
      });
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signOut,
  };
}