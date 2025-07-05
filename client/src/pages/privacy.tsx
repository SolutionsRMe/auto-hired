import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Privacy() {
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
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-text-light/70">Last updated: January 2025</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Introduction</h2>
            <p className="text-text-light/80 leading-relaxed mb-4">
              At AutoHired, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our job application automation platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-accent">Personal Information</h3>
            <ul className="list-disc list-inside text-text-light/80 mb-4 space-y-2">
              <li>Name, email address, and contact information</li>
              <li>Professional information including work experience, skills, and education</li>
              <li>Resume and cover letter content</li>
              <li>Job preferences and search criteria</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-accent">Usage Information</h3>
            <ul className="list-disc list-inside text-text-light/80 mb-4 space-y-2">
              <li>Application usage patterns and feature interactions</li>
              <li>Job search activities and application tracking data</li>
              <li>Device information and browser details</li>
              <li>IP address and location data (general geographic area only)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-text-light/80 space-y-2">
              <li>Provide and maintain our job application automation services</li>
              <li>Generate tailored resumes and cover letters for job applications</li>
              <li>Match you with relevant job opportunities</li>
              <li>Track and manage your job applications</li>
              <li>Improve our services and develop new features</li>
              <li>Communicate with you about your account and our services</li>
              <li>Provide customer support and respond to your inquiries</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Information Sharing</h2>
            <p className="text-text-light/80 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties, except:
            </p>
            <ul className="list-disc list-inside text-text-light/80 space-y-2">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations or court orders</li>
              <li>To protect our rights, property, or safety, or that of our users</li>
              <li>With trusted service providers who assist in operating our platform (under strict confidentiality agreements)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Data Security</h2>
            <p className="text-text-light/80 mb-4">
              We implement appropriate technical and organizational security measures to protect your information:
            </p>
            <ul className="list-disc list-inside text-text-light/80 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication systems</li>
              <li>Secure database hosting with backup procedures</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Your Rights</h2>
            <p className="text-text-light/80 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-text-light/80 space-y-2">
              <li>Access and review your personal information</li>
              <li>Correct or update your information</li>
              <li>Delete your account and associated data</li>
              <li>Export your data in a portable format</li>
              <li>Opt-out of certain communications</li>
              <li>Withdraw consent for data processing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Data Retention</h2>
            <p className="text-text-light/80">
              We retain your information only as long as necessary to provide our services and comply with 
              legal obligations. You may request deletion of your account at any time through your profile 
              settings or by contacting our support team.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Contact Us</h2>
            <p className="text-text-light/80">
              If you have questions about this Privacy Policy or our data practices, please contact us 
              through our <Link href="/support" className="text-secondary hover:text-secondary/80">support page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}