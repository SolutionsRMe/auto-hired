import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Search, FileText, BarChart3, Mail, Target, Zap, Github } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AutoHired</h1>
              <p className="text-sm text-gray-500">Lite Version</p>
            </div>
          </div>
          <Button onClick={() => window.location.href = '/api/login'}>
            Sign In
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="outline" className="mb-4">
          Open Source • GitHub Available
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Automate Your Job
          <span className="text-primary block">Application Process</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Build your master resume, search jobs, generate tailored applications, and track your progress. 
          All in one intelligent platform designed for modern job seekers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={() => window.location.href = '/api/login'}
          >
            Get Started Free
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={() => window.location.href = '/premium-purchase'}
          >
            <Zap className="w-5 h-5 mr-2" />
            View Premium
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Land Your Dream Job
          </h2>
          <p className="text-xl text-gray-600">
            Streamline your job search with powerful automation tools
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Master Resume Builder</CardTitle>
              <CardDescription>
                Create a comprehensive resume profile by importing existing documents and organizing your experience
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Smart Job Search</CardTitle>
              <CardDescription>
                Browse curated job listings with intelligent matching based on your skills and preferences
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Tailored Applications</CardTitle>
              <CardDescription>
                Generate customized resumes and cover letters for each job application automatically
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-yellow-600" />
              </div>
              <CardTitle>Application Tracking</CardTitle>
              <CardDescription>
                Monitor all your applications with detailed status tracking and progress analytics
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle>Email Summaries</CardTitle>
              <CardDescription>
                Receive automated email reports with your application progress and new opportunities
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-indigo-600" />
              </div>
              <CardTitle>Goal Tracking</CardTitle>
              <CardDescription>
                Set daily, weekly, and monthly application goals to stay motivated and organized
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600">
            Start free with our Lite version or upgrade for advanced features
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Lite Version */}
          <Card className="border-2 border-gray-200">
            <CardHeader className="text-center">
              <Badge variant="outline" className="w-fit mx-auto mb-2">Open Source</Badge>
              <CardTitle className="text-2xl">AutoHired Lite</CardTitle>
              <div className="text-4xl font-bold text-gray-900">Free</div>
              <CardDescription>Perfect for getting started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  Basic resume builder
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  Job search & filtering
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  Application tracking
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  Email summaries
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  GitHub source code
                </li>
              </ul>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => window.location.href = '/auth'}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* Premium Version */}
          <Card className="border-2 border-primary relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-primary">Most Popular</Badge>
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">AutoHired Premium</CardTitle>
              <div className="text-4xl font-bold text-primary">$29/mo</div>
              <CardDescription>Advanced automation features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  Everything in Lite
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  AI-powered resume optimization
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  Automatic form submissions
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  OCR document parsing
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  Advanced analytics
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  Priority support
                </li>
              </ul>
              <Button 
                className="w-full"
                onClick={() => window.location.href = '/premium-purchase'}
              >
                Try Premium
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Job Search?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have automated their application process and landed their dream jobs faster.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="text-lg px-8 py-6"
            onClick={() => window.location.href = '/auth'}
          >
            Start Your Free Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold">AutoHired</h3>
                <p className="text-sm text-gray-400">Job Application Automation</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 AutoHired. Open source job application automation platform.
          </div>
        </div>
      </footer>
    </div>
  );
}
