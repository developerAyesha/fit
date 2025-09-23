"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PrivacyPolicy() {
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
              Privacy Policy
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
              At FitnessAds.ai ("we," "our," or "us"), we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, services, and platform (collectively, the "Service").
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">2.1 Personal Information</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              We may collect the following types of personal information:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>Name and contact information (email address, phone number)</li>
              <li>Account credentials and authentication information</li>
              <li>Payment and billing information</li>
              <li>Business information (business name, type, location)</li>
              <li>Brand information and preferences</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.2 Usage Information</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              We automatically collect information about how you use our Service:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>Log data (IP address, browser type, pages visited)</li>
              <li>Device information (device type, operating system)</li>
              <li>Usage patterns and feature interactions</li>
              <li>Performance data and analytics</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.3 Content Information</h3>
            <p className="text-gray-300 leading-relaxed">
              We collect content you provide, including:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>Brand information and business details</li>
              <li>Marketing materials and preferences</li>
              <li>Generated ad content and campaigns</li>
              <li>Feedback and support communications</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We use your information for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>Provide, maintain, and improve our Service</li>
              <li>Generate personalized ad content and recommendations</li>
              <li>Process payments and manage subscriptions</li>
              <li>Communicate with you about your account and our Service</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Analyze usage patterns to improve user experience</li>
              <li>Prevent fraud and ensure security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Information Sharing and Disclosure</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
            </p>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.1 Service Providers</h3>
            <p className="text-gray-300 leading-relaxed">
              We may share information with trusted third-party service providers who assist us in operating our Service, including:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>Payment processors (Stripe, PayPal)</li>
              <li>Cloud hosting providers (AWS, Google Cloud)</li>
              <li>Analytics services (Google Analytics)</li>
              <li>Email service providers</li>
              <li>Customer support platforms</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.2 Legal Requirements</h3>
            <p className="text-gray-300 leading-relaxed">
              We may disclose your information if required by law or to:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>Comply with legal processes or government requests</li>
              <li>Protect our rights, property, or safety</li>
              <li>Protect the rights and safety of our users</li>
              <li>Investigate potential violations of our Terms</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.3 Business Transfers</h3>
            <p className="text-gray-300 leading-relaxed">
              In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Secure data storage and backup procedures</li>
              <li>Employee training on data protection practices</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Cookies and Tracking Technologies</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our Service. These technologies help us:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>Remember your preferences and settings</li>
              <li>Analyze how you use our Service</li>
              <li>Provide personalized content and recommendations</li>
              <li>Improve our Service performance and functionality</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              You can control cookie settings through your browser preferences. However, disabling cookies may affect the functionality of our Service.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Third-Party Services</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Our Service may contain links to third-party websites or integrate with third-party services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Common third-party integrations include:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>Social media platforms (Facebook, Instagram, Google)</li>
              <li>Payment processors</li>
              <li>Analytics services</li>
              <li>Advertising platforms</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Data Retention</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We retain your personal information for as long as necessary to provide our Service and fulfill the purposes outlined in this Privacy Policy. Specifically:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>Account information: Until you delete your account</li>
              <li>Usage data: Up to 2 years for analytics purposes</li>
              <li>Payment information: As required by law and payment processors</li>
              <li>Marketing communications: Until you opt out</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              We may retain certain information for longer periods to comply with legal obligations, resolve disputes, or enforce our agreements.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Your Rights and Choices</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Request transfer of your data</li>
              <li><strong>Restriction:</strong> Request limitation of processing</li>
              <li><strong>Objection:</strong> Object to certain types of processing</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              To exercise these rights, please contact us using the information provided in the Contact section below.
            </p>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. International Data Transfers</h2>
            <p className="text-gray-300 leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Children's Privacy</h2>
            <p className="text-gray-300 leading-relaxed">
              Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Changes to This Privacy Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Contact Us</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-bg-dark rounded-lg p-4">
              <p className="text-gray-300">
                <strong>Email:</strong> privacy@fitnessads.ai<br />
                <strong>Data Protection Officer:</strong> dpo@fitnessads.ai<br />
                <strong>Website:</strong> <Link href="/" className="text-red-500 hover:text-red-400 underline">fitnessads.ai</Link>
              </p>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            This Privacy Policy is effective as of January 2025.
          </p>
        </div>
      </div>
    </div>
  );
}
