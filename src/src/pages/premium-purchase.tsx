import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function PremiumPurchase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-surface p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="flex items-center space-x-2 text-text-light hover:text-text-light hover:bg-surface/50">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to App</span>
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-12 h-12 text-accent mr-3" />
            <h1 className="text-4xl font-bold text-text-light">AutoHired Premium</h1>
          </div>
          <p className="text-xl text-text-light/80 max-w-3xl mx-auto">
            Supercharge your job search with AI-powered automation, advanced analytics, and premium features designed for serious job seekers.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Lite Plan */}
          <Card className="relative bg-surface border-2 border-divider shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-text-light">AutoHired Lite</CardTitle>
                <Badge variant="outline" className="text-success border-success">Current Plan</Badge>
              </div>
              <div className="text-3xl font-bold text-secondary">Free</div>
              <p className="text-text-light/70">Perfect for getting started</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-success" />
                  <span className="text-text-light">Basic resume builder</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-success" />
                  <span className="text-text-light">Manual application tracking</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-success" />
                  <span className="text-text-light">Job search with filters</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-success" />
                  <span className="text-text-light">Basic notifications</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-success" />
                  <span className="text-text-light">Profile management</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full text-text-light border-divider" disabled>
                Current Plan
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="relative bg-surface border-2 border-accent shadow-xl ring-2 ring-accent/20">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-accent text-primary px-4 py-1">
                <Star className="w-4 h-4 mr-1" />
                Most Popular
              </Badge>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-text-light">AutoHired Premium</CardTitle>
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <div className="text-3xl font-bold text-accent">
                $29<span className="text-lg text-text-light/70">/month</span>
              </div>
              <p className="text-text-light/70">Everything in Lite, plus premium features</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-accent" />
                  <span className="text-text-light">AI-powered resume optimization</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-accent" />
                  <span className="text-text-light">Automated job application submission</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-accent" />
                  <span className="text-text-light">Advanced analytics & insights</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-accent" />
                  <span className="text-text-light">Custom resume templates</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-accent" />
                  <span className="text-text-light">ATS compatibility scoring</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-accent" />
                  <span className="text-text-light">Bulk application management</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-accent" />
                  <span className="text-text-light">Priority support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-accent" />
                  <span className="text-text-light">Export to multiple formats</span>
                </li>
              </ul>
              <Button className="w-full bg-accent hover:bg-[#e85d5d] text-primary transition-all duration-200 transform hover:scale-105">
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Feature Comparison */}
        <Card className="mb-12 bg-surface border-2 border-divider">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-text-light">Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-divider">
                    <th className="text-left py-3 px-4 text-text-light">Feature</th>
                    <th className="text-center py-3 px-4 text-text-light">Lite</th>
                    <th className="text-center py-3 px-4 text-text-light">Premium</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  <tr className="border-b border-divider">
                    <td className="py-3 px-4 text-text-light">Resume Builder</td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-5 h-5 text-success mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-5 h-5 text-success mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-divider">
                    <td className="py-3 px-4 text-text-light">Application Tracking</td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-5 h-5 text-success mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-5 h-5 text-success mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-divider">
                    <td className="py-3 px-4 text-text-light">AI Resume Optimization</td>
                    <td className="text-center py-3 px-4 text-text-light/50">-</td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-5 h-5 text-accent mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-divider">
                    <td className="py-3 px-4 text-text-light">Automated Applications</td>
                    <td className="text-center py-3 px-4 text-text-light/50">-</td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-5 h-5 text-accent mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-divider">
                    <td className="py-3 px-4 text-text-light">Advanced Analytics</td>
                    <td className="text-center py-3 px-4 text-text-light/50">-</td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-5 h-5 text-accent mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-divider">
                    <td className="py-3 px-4 text-text-light">Premium Templates</td>
                    <td className="text-center py-3 px-4 text-text-light/50">-</td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-5 h-5 text-accent mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center bg-surface rounded-lg p-8 shadow-xl border-2 border-divider">
          <h2 className="text-3xl font-bold text-text-light mb-4">Ready to Supercharge Your Job Search?</h2>
          <p className="text-text-light/80 mb-6 max-w-2xl mx-auto">
            Join thousands of successful job seekers who have accelerated their careers with AutoHired Premium.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-[#e85d5d] text-primary px-8 transition-all duration-200 transform hover:scale-105"
              onClick={() => alert('Premium trial functionality coming soon!')}
            >
              Start Premium Trial
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-text-light border-divider hover:bg-surface/50 transition-all duration-200"
              onClick={(e) => {
                e.preventDefault();
                window.open('mailto:info@thesolutiondesk.ca?subject=AutoHired Premium Sales Inquiry', '_self');
              }}
            >
              Contact Sales
            </Button>
          </div>
          <p className="text-sm text-text-light/60 mt-4">
            30-day money-back guarantee • Cancel anytime • No setup fees
          </p>
        </div>
      </div>
    </div>
  );
}