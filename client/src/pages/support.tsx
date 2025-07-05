import { Link } from "wouter";
import { ArrowLeft, Mail, MessageCircle, Github, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Support() {
  return (
    <div className="min-h-screen bg-primary text-text-light">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 text-text-light hover:text-secondary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-6">Support & Help</h1>
          <p className="text-xl text-text-light/80">
            We're here to help you get the most out of AutoHired. Find answers to common questions 
            or get in touch with our support team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="bg-surface border-divider">
            <CardHeader>
              <CardTitle className="flex items-center text-secondary">
                <HelpCircle className="w-5 h-5 mr-2" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription className="text-text-light/70">
                Quick answers to common questions about using AutoHired
              </CardDescription>
            </CardHeader>
            <CardContent className="text-text-light/80">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-accent mb-2">How do I create my master resume?</h4>
                  <p className="text-sm">
                    Navigate to the Resume Builder section and start by filling out your personal information, 
                    work experience, and skills. This becomes your master profile for generating tailored applications.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-accent mb-2">What's the difference between Lite and Premium?</h4>
                  <p className="text-sm">
                    Lite version includes basic resume building and application tracking. Premium adds AI-powered 
                    optimization, automated job scraping, advanced analytics, and priority support.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-accent mb-2">How do I track my job applications?</h4>
                  <p className="text-sm">
                    Use the Applications section to log your submissions, track their status, schedule follow-ups, 
                    and view analytics on your job search progress.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-divider">
            <CardHeader>
              <CardTitle className="flex items-center text-secondary">
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact Support
              </CardTitle>
              <CardDescription className="text-text-light/70">
                Get personalized help from our support team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-primary/50 rounded-lg">
                  <Mail className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-medium text-text-light">Email Support</p>
                    <p className="text-sm text-text-light/70">info@thesolutiondesk.ca</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-primary/50 rounded-lg">
                  <Github className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-medium text-text-light">GitHub Issues</p>
                    <p className="text-sm text-text-light/70">Report bugs or request features</p>
                  </div>
                </div>
                <p className="text-sm text-text-light/70 mt-4">
                  Response time: Usually within 24 hours for free users, 
                  priority support for Premium subscribers.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-secondary">Getting Started Guide</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-surface border-divider">
              <CardHeader>
                <CardTitle className="text-lg text-accent">1. Set Up Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-light/80 text-sm">
                  Complete your master resume with personal information, work experience, 
                  education, and skills. This forms the foundation for all applications.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-surface border-divider">
              <CardHeader>
                <CardTitle className="text-lg text-accent">2. Search & Apply</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-light/80 text-sm">
                  Browse job listings, use filters to find relevant positions, 
                  and apply with tailored resumes generated from your master profile.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-surface border-divider">
              <CardHeader>
                <CardTitle className="text-lg text-accent">3. Track Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-light/80 text-sm">
                  Monitor your applications, schedule follow-ups, track interview progress, 
                  and analyze your job search success rates.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-secondary">Troubleshooting</h2>
          <div className="space-y-4">
            <Card className="bg-surface border-divider">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-accent mb-2">My resume isn't saving</h3>
                <p className="text-text-light/80 text-sm mb-2">
                  Make sure all required fields are filled out and you have a stable internet connection. 
                  Try refreshing the page and saving again.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-surface border-divider">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-accent mb-2">I can't see my job applications</h3>
                <p className="text-text-light/80 text-sm mb-2">
                  Check that you're logged in to the correct account. Applications are tied to your 
                  user profile and may not appear if logged in with a different account.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-surface border-divider">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-accent mb-2">Premium features aren't working</h3>
                <p className="text-text-light/80 text-sm mb-2">
                  Verify your subscription status in your profile settings. If you recently upgraded, 
                  try logging out and back in to refresh your account permissions.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-surface p-6 rounded-lg border border-divider">
          <h2 className="text-2xl font-semibold mb-4 text-secondary">Still Need Help?</h2>
          <p className="text-text-light/80 mb-4">
            Can't find what you're looking for? Our support team is ready to help you succeed 
            in your job search.
          </p>
          <Button 
            className="bg-secondary text-primary hover:bg-secondary/90"
            onClick={() => window.location.href = 'mailto:info@thesolutiondesk.ca?subject=AutoHired Support Request'}
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact Support Team
          </Button>
        </section>
      </div>
    </div>
  );
}