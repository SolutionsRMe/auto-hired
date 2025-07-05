import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
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
          <h1 className="text-4xl font-bold mb-6">About AutoHired</h1>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Our Mission</h2>
            <p className="text-lg text-text-light/80 leading-relaxed mb-6">
              AutoHired is designed to revolutionize the job search process by automating the most time-consuming 
              aspects of job applications. We believe that finding the right job should be about showcasing your 
              skills and passion, not spending countless hours on repetitive tasks.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">What We Do</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-surface p-6 rounded-lg border border-divider">
                <h3 className="text-xl font-semibold mb-3 text-accent">Master Resume Builder</h3>
                <p className="text-text-light/70">
                  Create a comprehensive master resume that serves as the foundation for all your applications. 
                  Our intelligent system helps you organize your experience, skills, and achievements.
                </p>
              </div>
              <div className="bg-surface p-6 rounded-lg border border-divider">
                <h3 className="text-xl font-semibold mb-3 text-accent">Smart Job Matching</h3>
                <p className="text-text-light/70">
                  Our algorithm analyzes job postings and matches them with your profile, highlighting the 
                  most relevant opportunities and helping you focus your efforts.
                </p>
              </div>
              <div className="bg-surface p-6 rounded-lg border border-divider">
                <h3 className="text-xl font-semibold mb-3 text-accent">Application Tracking</h3>
                <p className="text-text-light/70">
                  Keep track of all your applications, interview schedules, and follow-ups in one 
                  centralized dashboard with detailed analytics and insights.
                </p>
              </div>
              <div className="bg-surface p-6 rounded-lg border border-divider">
                <h3 className="text-xl font-semibold mb-3 text-accent">Premium Features</h3>
                <p className="text-text-light/70">
                  Advanced automation tools, AI-powered resume optimization, automated job scraping, 
                  and priority support for serious job seekers.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Open Source Commitment</h2>
            <p className="text-lg text-text-light/80 leading-relaxed mb-4">
              AutoHired is proudly open source. We believe in transparency and community-driven development. 
              Our core platform is available for free, ensuring that everyone has access to powerful job 
              search tools regardless of their financial situation.
            </p>
            <p className="text-text-light/70">
              Premium features help us maintain and improve the platform while keeping the core functionality 
              accessible to all job seekers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Contact Us</h2>
            <p className="text-text-light/80">
              Have questions or feedback? We'd love to hear from you. Reach out through our 
              <Link href="/support" className="text-secondary hover:text-secondary/80 mx-1">support page</Link>
              or connect with our community on GitHub.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}