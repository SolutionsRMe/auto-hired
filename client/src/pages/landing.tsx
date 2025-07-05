import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Search, FileText, BarChart3, Mail, Target, Zap, Github } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-primary text-text-light">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-light">AutoHired</h1>
              <p className="text-sm text-text-light/70">Lite Version</p>
            </div>
          </div>
          <Button 
            className="bg-secondary text-primary hover:bg-secondary/90 border-secondary"
            onClick={() => window.location.href = '/api/login'}
          >
            Sign In
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="outline" className="mb-4">
          Open Source • GitHub Available
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold text-text-light mb-6">
          Automate Your Job
          <span className="block text-secondary">Application Process</span>
        </h1>
        <p className="text-xl text-text-light/80 mb-8 max-w-3xl mx-auto">
          Build your master resume, search jobs, generate tailored applications, and track your progress. 
          All in one intelligent platform designed for modern job seekers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-secondary text-primary hover:bg-secondary/90 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
            onClick={() => window.location.href = '/api/login'}
          >
            Get Started Free
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-6 border-2 text-accent border-accent hover:bg-accent/10 hover:border-accent hover:text-accent transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
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
          <h2 className="text-3xl md:text-4xl font-bold text-text-light mb-4">
            Everything You Need to Land Your Dream Job
          </h2>
          <p className="text-xl text-text-light/80">
            Streamline your job search with powerful automation tools
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-divider bg-surface text-text-light shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-secondary">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-text-light">Master Resume Builder</CardTitle>
              <CardDescription className="text-text-light/70">
                Create a comprehensive resume profile by importing existing documents and organizing your experience
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-divider bg-surface text-text-light shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-accent">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-text-light">Smart Job Search</CardTitle>
              <CardDescription className="text-text-light/70">
                Browse curated job listings with intelligent matching based on your skills and preferences
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-divider bg-surface text-text-light shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-primary">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle className="text-text-light">Tailored Applications</CardTitle>
              <CardDescription className="text-text-light/70">
                Generate customized resumes and cover letters for each job application automatically
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-divider bg-surface text-text-light shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-warning/20">
                <BarChart3 className="w-6 h-6 text-warning" />
              </div>
              <CardTitle className="text-text-light">Application Tracking</CardTitle>
              <CardDescription className="text-text-light/70">
                Monitor all your applications with detailed status tracking and progress analytics
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-divider bg-surface text-text-light shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-primary/20">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-text-light">Email Summaries</CardTitle>
              <CardDescription className="text-text-light/70">
                Receive automated email reports with your application progress and new opportunities
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-divider bg-surface text-text-light shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-secondary/20">
                <Target className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle className="text-text-light">Goal Tracking</CardTitle>
              <CardDescription className="text-text-light/70">
                Set daily, weekly, and monthly application goals to stay motivated and organized
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-light mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-text-light/80">
            Start free with our Lite version or upgrade for advanced features
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Lite Version */}
          <Card className="border-2 border-divider bg-surface text-text-light">
            <CardHeader className="text-center">
              <Badge variant="outline" className="w-fit mx-auto mb-2">Open Source</Badge>
              <CardTitle className="text-2xl text-text-light">AutoHired Lite</CardTitle>
              <div className="text-4xl font-bold text-secondary">Free</div>
              <CardDescription className="text-text-light/70">Perfect for getting started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center text-text-light">
                  <div className="w-5 h-5 bg-success/20 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                  </div>
                  Basic resume builder
                </li>
                <li className="flex items-center text-text-light">
                  <div className="w-5 h-5 bg-success/20 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                  </div>
                  Job search & filtering
                </li>
                <li className="flex items-center text-text-light">
                  <div className="w-5 h-5 bg-success/20 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                  </div>
                  Application tracking
                </li>
                <li className="flex items-center text-text-light">
                  <div className="w-5 h-5 bg-success/20 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                  </div>
                  Email summaries
                </li>
                <li className="flex items-center text-text-light">
                  <div className="w-5 h-5 bg-success/20 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                  </div>
                  GitHub source code
                </li>
              </ul>
              <Button 
                className="w-full bg-secondary text-primary hover:bg-secondary/90 transition-all duration-200 transform hover:scale-105" 
                onClick={() => window.location.href = '/api/login'}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* Premium Version */}
          <Card className="border-2 border-accent bg-surface text-text-light relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-accent text-primary">Most Popular</Badge>
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-text-light">AutoHired Premium</CardTitle>
              <div className="text-4xl font-bold text-accent">$29/mo</div>
              <CardDescription className="text-text-light/70">Advanced automation features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center text-text-light">
                  <div className="w-5 h-5 bg-success/20 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                  </div>
                  Everything in Lite
                </li>
                <li className="flex items-center text-text-light">
                  <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                  </div>
                  AI-powered resume optimization
                </li>
                <li className="flex items-center text-text-light">
                  <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                  </div>
                  Automatic form submissions
                </li>
                <li className="flex items-center text-text-light">
                  <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                  </div>
                  OCR document parsing
                </li>
                <li className="flex items-center text-text-light">
                  <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                  </div>
                  Advanced analytics
                </li>
                <li className="flex items-center text-text-light">
                  <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                  </div>
                  Priority support
                </li>
              </ul>
              <Button 
                className="w-full bg-accent text-primary hover:bg-accent/90 transition-all duration-200 transform hover:scale-105"
                onClick={() => window.location.href = '/premium-purchase'}
              >
                Try Premium
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-surface text-text-light py-20 border-t border-divider">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-light">
            Ready to Transform Your Job Search?
          </h2>
          <p className="text-xl text-text-light/80 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have automated their application process and landed their dream jobs faster.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-secondary text-primary hover:bg-secondary/90 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
            onClick={() => window.location.href = '/api/login'}
          >
            Start Your Free Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-text-light py-12 border-t border-divider">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-text-light">AutoHired</h3>
                <p className="text-sm text-text-light/70">Job Application Automation</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-text-light/70">
              <a href="#" className="hover:text-text-light transition-colors">About</a>
              <a href="#" className="hover:text-text-light transition-colors">Privacy</a>
              <a href="#" className="hover:text-text-light transition-colors">Terms</a>
              <a href="#" className="hover:text-text-light transition-colors">Support</a>
            </div>
          </div>
          <div className="border-t border-divider mt-8 pt-8 text-center text-sm text-text-light/70">
            © 2025 AutoHired. Open source job application automation platform.
          </div>
        </div>
      </footer>
    </div>
  );
}
