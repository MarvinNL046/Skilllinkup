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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="prose prose-lg dark:prose-invert max-w-none
          prose-headings:font-heading
          prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8
          prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-3 prose-h3:mt-6
          prose-p:mb-4
          prose-ul:mb-4 prose-ul:space-y-2
          prose-li:marker:text-primary dark:prose-li:marker:text-accent
          prose-strong:font-semibold
          prose-a:text-primary dark:prose-a:text-accent prose-a:no-underline
          prose-a:hover:text-primary-dark dark:prose-a:hover:text-accent/90">

          <section className="mb-8">
            <h2>1. Introduction</h2>
            <p>
              Welcome to SkillLinkup ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
            <p>
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          <section className="mb-8">
            <h2>2. Information We Collect</h2>
            <h3>Personal Information You Disclose to Us</h3>
            <p>
              We collect personal information that you voluntarily provide to us when you:
            </p>
            <ul>
              <li>Subscribe to our newsletter</li>
              <li>Fill out contact forms</li>
              <li>Participate in surveys or promotions</li>
              <li>Otherwise contact us</li>
            </ul>
            <p>
              The personal information we collect may include:
            </p>
            <ul>
              <li>Name and contact data (email address)</li>
              <li>Message content (when you contact us)</li>
            </ul>

            <h3>Information Automatically Collected</h3>
            <p>
              We automatically collect certain information when you visit, use, or navigate our website. This information does not reveal your specific identity but may include:
            </p>
            <ul>
              <li>Device and usage information (IP address, browser type, operating system)</li>
              <li>Location data (country, region)</li>
              <li>Log and usage data (pages viewed, time spent on pages)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>3. How We Use Your Information</h2>
            <p>
              We use the information we collect or receive:
            </p>
            <ul>
              <li>To send you marketing and promotional communications (with your consent)</li>
              <li>To respond to your inquiries and solve any potential issues</li>
              <li>To send administrative information (updates, security alerts)</li>
              <li>To improve our website and services</li>
              <li>To analyze usage trends and optimize user experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>4. Sharing Your Information</h2>
            <p>
              We may share or transfer your information in the following situations:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> We may share your information with third-party service providers who perform services for us (email delivery, analytics, hosting)</li>
              <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with a merger, sale, or acquisition</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information where required by law or to protect our rights</li>
            </ul>
            <p>
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2>5. Cookies and Tracking Technologies</h2>
            <p>
              We may use cookies and similar tracking technologies to access or store information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section className="mb-8">
            <h2>6. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
            </p>
          </section>

          <section className="mb-8">
            <h2>7. Data Security</h2>
            <p>
              We have implemented appropriate technical and organizational security measures to protect your personal information. However, no electronic transmission or storage method is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2>8. Your Privacy Rights</h2>
            <p>
              Depending on your location, you may have the following rights:
            </p>
            <ul>
              <li>Access to your personal information</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your personal information</li>
              <li>Withdrawal of consent (for newsletter subscriptions)</li>
              <li>Objection to processing of your data</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided below.
            </p>
          </section>

          <section className="mb-8">
            <h2>9. Data Retention</h2>
            <p>
              We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2>10. Children's Privacy</h2>
            <p>
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section className="mb-8">
            <h2>11. Updates to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last updated" date at the top of this page.
            </p>
          </section>

          <section className="mb-8">
            <h2>12. Contact Us</h2>
            <p>
              If you have questions or comments about this privacy policy, please contact us at:
            </p>
            <p>
              Email: <a href="mailto:privacy@skilllinkup.com">privacy@skilllinkup.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
