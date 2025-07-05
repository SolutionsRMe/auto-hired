import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import ResumeBuilder from "@/pages/resume-builder";
import JobSearch from "@/pages/job-search";
import Applications from "@/pages/applications";
import Profile from "@/pages/profile";
import GoogleAuth from "@/pages/google-auth";
import PremiumPurchase from "@/pages/premium-purchase";
import MainLayout from "@/components/layout/main-layout";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/auth" component={GoogleAuth} />
        <Route path="/premium-purchase" component={PremiumPurchase} />
        <Route component={Landing} />
      </Switch>
    );
  }

  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/resume" component={ResumeBuilder} />
        <Route path="/jobs" component={JobSearch} />
        <Route path="/applications" component={Applications} />
        <Route path="/profile" component={Profile} />
        <Route path="/premium-purchase" component={PremiumPurchase} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
