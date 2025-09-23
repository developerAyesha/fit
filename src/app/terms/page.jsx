"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TermsAndConditions() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => router.back()}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-4xl font-extrabold text-white bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Terms and Conditions
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Last updated: January 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-bg-light rounded-lg p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p className="text-gray-300 leading-relaxed">
              Welcome to FitnessAds.ai ("we," "our," or "us"). These Terms and Conditions ("Terms") govern your use of our website, services, and platform (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms.
            </p>
          </section>

          {/* Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Acceptance of Terms</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              By creating an account, accessing our Service, or using any of our features, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
            </p>
            <p className="text-gray-300 leading-relaxed">
              If you do not agree to these Terms, you may not access or use our Service.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Service Description</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              FitnessAds.ai is an AI-powered platform that helps fitness professionals, coaches, and gym owners create high-converting advertisements for their fitness services and products.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our Service includes but is not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>AI-generated ad content and copywriting</li>
              <li>Campaign template generation</li>
              <li>Targeting recommendations</li>
              <li>Performance analytics and insights</li>
              <li>Integration with advertising platforms</li>
            </ul>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. User Accounts</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              To access certain features of our Service, you must create an account. You are responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>Providing accurate and complete information</li>
              <li>Maintaining the security of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Acceptable Use</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              You agree not to use our Service for any unlawful or prohibited activities, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>Creating misleading or false advertising content</li>
              <li>Violating any applicable laws or regulations</li>
              <li>Infringing on intellectual property rights</li>
              <li>Attempting to gain unauthorized access to our systems</li>
              <li>Using the Service to spam or harass others</li>
              <li>Reverse engineering or attempting to extract our algorithms</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The Service and its original content, features, and functionality are owned by FitnessAds.ai and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Content generated by our AI for your use belongs to you, subject to these Terms and our licensing restrictions.
            </p>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Payment Terms</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Some features of our Service require payment. By subscribing to a paid plan, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>Pay all fees associated with your subscription</li>
              <li>Provide accurate billing information</li>
              <li>Authorize us to charge your payment method</li>
              <li>Understand that fees are non-refundable unless otherwise stated</li>
            </ul>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Privacy</h2>
            <p className="text-gray-300 leading-relaxed">
              Your privacy is important to us. Please review our <Link href="/privacy" className="text-red-500 hover:text-red-400 underline">Privacy Policy</Link>, which explains how we collect, use, and protect your information.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              To the maximum extent permitted by law, FitnessAds.ai shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our total liability to you for any claims arising from or related to these Terms or the Service shall not exceed the amount you paid us in the 12 months preceding the claim.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Termination</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including if you breach these Terms.
            </p>
            <p className="text-gray-300 leading-relaxed">
              You may terminate your account at any time by contacting us or using the account deletion feature in your settings.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Changes to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the Service after such modifications constitutes acceptance of the updated Terms.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Contact Information</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="bg-bg-dark rounded-lg p-4">
              <p className="text-gray-300">
                <strong>Email:</strong> legal@fitnessads.ai<br />
                <strong>Website:</strong> <Link href="/" className="text-red-500 hover:text-red-400 underline">fitnessads.ai</Link>
              </p>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            These Terms and Conditions are effective as of January 2025.
          </p>
        </div>
      </div>
    </div>
  );
}
