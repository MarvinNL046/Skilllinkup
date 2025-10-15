import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | SkillLinkup",
  description: "Learn how SkillLinkup collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-heading font-bold text-text-primary mb-4">
          Privacy Policy
        </h1>
        <p className="text-text-secondary mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              1. Introduction
            </h2>
            <p className="text-text-secondary mb-4">
              Welcome to SkillLinkup ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
            <p className="text-text-secondary mb-4">
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              2. Information We Collect
            </h2>
            <h3 className="text-xl font-heading font-semibold text-text-primary mb-3">
              Personal Information You Disclose to Us
            </h3>
            <p className="text-text-secondary mb-4">
              We collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2">
              <li>Subscribe to our newsletter</li>
              <li>Fill out contact forms</li>
              <li>Participate in surveys or promotions</li>
              <li>Otherwise contact us</li>
            </ul>
            <p className="text-text-secondary mb-4">
              The personal information we collect may include:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2">
              <li>Name and contact data (email address)</li>
              <li>Message content (when you contact us)</li>
            </ul>

            <h3 className="text-xl font-heading font-semibold text-text-primary mb-3 mt-6">
              Information Automatically Collected
            </h3>
            <p className="text-text-secondary mb-4">
              We automatically collect certain information when you visit, use, or navigate our website. This information does not reveal your specific identity but may include:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2">
              <li>Device and usage information (IP address, browser type, operating system)</li>
              <li>Location data (country, region)</li>
              <li>Log and usage data (pages viewed, time spent on pages)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-text-secondary mb-4">
              We use the information we collect or receive:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2">
              <li>To send you marketing and promotional communications (with your consent)</li>
              <li>To respond to your inquiries and solve any potential issues</li>
              <li>To send administrative information (updates, security alerts)</li>
              <li>To improve our website and services</li>
              <li>To analyze usage trends and optimize user experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              4. Sharing Your Information
            </h2>
            <p className="text-text-secondary mb-4">
              We may share or transfer your information in the following situations:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2">
              <li><strong>Service Providers:</strong> We may share your information with third-party service providers who perform services for us (email delivery, analytics, hosting)</li>
              <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with a merger, sale, or acquisition</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information where required by law or to protect our rights</li>
            </ul>
            <p className="text-text-secondary mb-4">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              5. Cookies and Tracking Technologies
            </h2>
            <p className="text-text-secondary mb-4">
              We may use cookies and similar tracking technologies to access or store information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              6. Third-Party Links
            </h2>
            <p className="text-text-secondary mb-4">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              7. Data Security
            </h2>
            <p className="text-text-secondary mb-4">
              We have implemented appropriate technical and organizational security measures to protect your personal information. However, no electronic transmission or storage method is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              8. Your Privacy Rights
            </h2>
            <p className="text-text-secondary mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your personal information</li>
              <li>Withdrawal of consent (for newsletter subscriptions)</li>
              <li>Objection to processing of your data</li>
            </ul>
            <p className="text-text-secondary mb-4">
              To exercise these rights, please contact us using the information provided below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              9. Data Retention
            </h2>
            <p className="text-text-secondary mb-4">
              We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              10. Children's Privacy
            </h2>
            <p className="text-text-secondary mb-4">
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              11. Updates to This Policy
            </h2>
            <p className="text-text-secondary mb-4">
              We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last updated" date at the top of this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              12. Contact Us
            </h2>
            <p className="text-text-secondary mb-4">
              If you have questions or comments about this privacy policy, please contact us at:
            </p>
            <p className="text-text-secondary">
              Email: <a href="mailto:privacy@skilllinkup.com" className="text-primary hover:text-primary-dark">privacy@skilllinkup.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
