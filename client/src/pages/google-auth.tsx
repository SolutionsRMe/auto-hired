import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Shield, Zap, Users } from "lucide-react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { useLocation } from "wouter";

export default function GoogleAuth() {
  const { user, isLoading, signIn } = useFirebaseAuth();
  const [, setLocation] = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !isLoading) {
      setLocation("/");
    }
  }, [user, isLoading, setLocation]);

  const handleSignIn = async () => {
    await signIn();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">AutoHired</h1>
            </div>
            <h2 className="text-xl text-gray-600">Welcome back!</h2>
            <p className="text-gray-500 mt-2">Sign in to continue your job search automation</p>
          </div>

          {/* Sign In Card */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>
                Access your personalized job application dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button
                onClick={handleSignIn}
                className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm"
                size="lg"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              <div className="text-center text-sm text-gray-500">
                <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
              </div>
            </CardContent>
          </Card>

          {/* Features Preview */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
              <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Secure</h3>
              <p className="text-xs text-gray-600">Google OAuth protection</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
              <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Fast Setup</h3>
              <p className="text-xs text-gray-600">Start in seconds</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500">
        <p>© 2025 AutoHired. Streamlining job applications with intelligent automation.</p>
      </footer>
    </div>
  );
}