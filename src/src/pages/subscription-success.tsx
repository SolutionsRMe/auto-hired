import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Crown, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'wouter';

export default function SubscriptionSuccess() {
  const [location] = useLocation();
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.split('?')[1]);
    setIsMock(searchParams.get('mock') === 'true');
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-surface p-4">
      <div className="max-w-2xl mx-auto pt-20">
        {/* Success Card */}
        <Card className="bg-surface border-2 border-accent shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 w-16 h-16 bg-accent rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-3xl text-text-light mb-2">
              {isMock ? 'Integration Ready!' : 'Welcome to Premium!'}
            </CardTitle>
            <p className="text-text-light/70 text-lg">
              {isMock 
                ? 'Your Stripe integration is set up and ready for payments.' 
                : 'Your subscription has been successfully activated.'
              }
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {isMock ? (
              <div className="bg-primary/20 border border-accent/30 rounded-lg p-4">
                <h3 className="text-accent font-semibold mb-2 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Development Mode
                </h3>
                <p className="text-text-light/80 text-sm mb-3">
                  You're seeing this because Stripe is in test mode. To enable real payments:
                </p>
                <ul className="text-sm text-text-light/70 space-y-1 ml-4">
                  <li>• Add your Stripe API keys to environment variables</li>
                  <li>• Create products and prices in Stripe Dashboard</li>
                  <li>• Update STRIPE_PRO_MONTHLY_PRICE_ID in .env</li>
                  <li>• Set PAYMENTS_ENABLED=true</li>
                </ul>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2 text-accent">
                  <Crown className="w-5 h-5" />
                  <span className="font-semibold">Premium Features Unlocked</span>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-text-light">Unlimited automated applications</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-text-light">AI-powered resume optimization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-text-light">Advanced analytics & insights</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-text-light">Priority support</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="pt-6 border-t border-divider space-y-3">
              <Link href="/dashboard">
                <Button className="w-full bg-accent hover:bg-[#e85d5d] text-primary">
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              
              <div className="flex space-x-3">
                <Link href="/resume" className="flex-1">
                  <Button variant="outline" className="w-full text-text-light border-divider">
                    Build Resume
                  </Button>
                </Link>
                <Link href="/jobs" className="flex-1">
                  <Button variant="outline" className="w-full text-text-light border-divider">
                    Find Jobs
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-text-light/60 text-sm">
            Questions? Contact us at{' '}
            <a 
              href="mailto:info@thesolutiondesk.ca" 
              className="text-accent hover:text-accent/80 transition-colors"
            >
              info@thesolutiondesk.ca
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}