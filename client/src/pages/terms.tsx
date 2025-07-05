import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Terms() {
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
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-text-light/70">Last updated: January 2025</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Acceptance of Terms</h2>
            <p className="text-text-light/80 leading-relaxed">
              By accessing and using AutoHired, you accept and agree to be bound by the terms and provision 
              of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Use License</h2>
            <p className="text-text-light/80 mb-4">
              Permission is granted to temporarily download one copy of AutoHired per device for personal, 
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, 
              and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-text-light/80 space-y-2">
              <li>modify or copy the materials</li>
              <li>use the materials for any commercial purpose or for any public display</li>
              <li>attempt to reverse engineer any software contained on AutoHired</li>
              <li>remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">User Accounts</h2>
            <p className="text-text-light/80 mb-4">
              When you create an account with us, you must provide information that is accurate, complete, 
              and current at all times. You are responsible for safeguarding your account and all activities 
              that occur under your account.
            </p>
            <ul className="list-disc list-inside text-text-light/80 space-y-2">
              <li>You must be at least 18 years old to use this service</li>
              <li>You are responsible for maintaining the confidentiality of your login credentials</li>
              <li>You must notify us immediately of any unauthorized use of your account</li>
              <li>We reserve the right to terminate accounts that violate these terms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Acceptable Use</h2>
            <p className="text-text-light/80 mb-4">
              You agree to use AutoHired only for lawful purposes and in accordance with these Terms. 
              You agree not to use the service:
            </p>
            <ul className="list-disc list-inside text-text-light/80 space-y-2">
              <li>To violate any applicable local, state, national, or international law or regulation</li>
              <li>To submit false, misleading, or fraudulent information in job applications</li>
              <li>To spam employers or submit excessive applications to the same company</li>
              <li>To impersonate another person or entity</li>
              <li>To interfere with or disrupt the service or servers connected to the service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Premium Services</h2>
            <p className="text-text-light/80 mb-4">
              AutoHired offers both free and premium services. Premium features are subject to additional terms:
            </p>
            <ul className="list-disc list-inside text-text-light/80 space-y-2">
              <li>Premium subscriptions are billed in advance on a monthly or annual basis</li>
              <li>All fees are non-refundable except as required by law</li>
              <li>You may cancel your subscription at any time through your account settings</li>
              <li>Premium features remain available until the end of your billing period after cancellation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Intellectual Property</h2>
            <p className="text-text-light/80 mb-4">
              The service and its original content, features, and functionality are and will remain the 
              exclusive property of AutoHired and its licensors. The service is protected by copyright, 
              trademark, and other laws.
            </p>
            <p className="text-text-light/80">
              You retain ownership of any content you submit to the service, including your resume data 
              and personal information. By using our service, you grant us a license to use this content 
              to provide our services to you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Disclaimer</h2>
            <p className="text-text-light/80">
              The information on AutoHired is provided on an 'as is' basis. To the fullest extent permitted 
              by law, we exclude all representations, warranties, and conditions relating to our service and 
              the use of this service. We do not guarantee job placement or interview success.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Limitation of Liability</h2>
            <p className="text-text-light/80">
              In no event shall AutoHired, nor its directors, employees, partners, agents, suppliers, or 
              affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, 
              including without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
              resulting from your use of the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Changes to Terms</h2>
            <p className="text-text-light/80">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
              If a revision is material, we will try to provide at least 30 days notice prior to any new 
              terms taking effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-secondary">Contact Information</h2>
            <p className="text-text-light/80">
              If you have any questions about these Terms of Service, please contact us through our 
              <Link href="/support" className="text-secondary hover:text-secondary/80 mx-1">support page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}