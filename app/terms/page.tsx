import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Service | SkillLinkup",
  description: "Terms and conditions for using SkillLinkup services.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-heading font-bold text-text-primary mb-4">
          Terms of Service
        </h1>
        <p className="text-text-secondary mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-text-secondary mb-4">
              By accessing or using SkillLinkup ("the Website"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Website.
            </p>
            <p className="text-text-secondary mb-4">
              We reserve the right to modify these Terms at any time. Your continued use of the Website following any changes indicates your acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              2. Use of the Website
            </h2>
            <h3 className="text-xl font-heading font-semibold text-text-primary mb-3">
              Permitted Use
            </h3>
            <p className="text-text-secondary mb-4">
              You may use the Website for lawful purposes only. You agree not to:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2">
              <li>Use the Website in any way that violates applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to any portion of the Website</li>
              <li>Interfere with or disrupt the Website or servers</li>
              <li>Upload or transmit viruses or malicious code</li>
              <li>Collect or harvest any information from the Website using automated means</li>
              <li>Use the Website for any commercial purposes without our consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              3. Intellectual Property Rights
            </h2>
            <p className="text-text-secondary mb-4">
              The Website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio) are owned by SkillLinkup, its licensors, or other providers of such material.
            </p>
            <p className="text-text-secondary mb-4">
              You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any of the content without our express written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              4. User-Generated Content
            </h2>
            <p className="text-text-secondary mb-4">
              If you submit any content to the Website (reviews, comments, feedback), you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display such content.
            </p>
            <p className="text-text-secondary mb-4">
              You represent that you own or have the necessary rights to submit the content and that it does not violate any third-party rights or applicable laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              5. Third-Party Links and Services
            </h2>
            <p className="text-text-secondary mb-4">
              The Website may contain links to third-party websites or services (freelance platforms, affiliate partners). We are not responsible for:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2">
              <li>The content, privacy policies, or practices of third-party websites</li>
              <li>Any damages or losses caused by your use of third-party services</li>
              <li>The accuracy of information provided by third parties</li>
            </ul>
            <p className="text-text-secondary mb-4">
              Your use of third-party services is at your own risk and subject to their terms and conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              6. Affiliate Relationships
            </h2>
            <p className="text-text-secondary mb-4">
              SkillLinkup participates in affiliate marketing programs. We may earn commissions from qualifying purchases made through links on our Website. See our <a href="/disclosure" className="text-primary hover:text-primary-dark">Affiliate Disclosure</a> for more information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              7. Disclaimer of Warranties
            </h2>
            <p className="text-text-secondary mb-4">
              THE WEBSITE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
            </p>
            <p className="text-text-secondary mb-4">
              We do not warrant that:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2">
              <li>The Website will be uninterrupted or error-free</li>
              <li>Defects will be corrected</li>
              <li>The Website is free of viruses or harmful components</li>
              <li>The information provided is accurate, complete, or current</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              8. Limitation of Liability
            </h2>
            <p className="text-text-secondary mb-4">
              TO THE FULLEST EXTENT PERMITTED BY LAW, SKILLLINKUP SHALL NOT BE LIABLE FOR:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2">
              <li>Any indirect, incidental, special, or consequential damages</li>
              <li>Loss of profits, data, or business opportunities</li>
              <li>Damages arising from your use of or inability to use the Website</li>
              <li>Reliance on any information obtained from the Website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              9. Indemnification
            </h2>
            <p className="text-text-secondary mb-4">
              You agree to indemnify and hold harmless SkillLinkup and its affiliates from any claims, damages, losses, or expenses arising from:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2">
              <li>Your use of the Website</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Your content submissions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              10. Information Accuracy
            </h2>
            <p className="text-text-secondary mb-4">
              We strive to provide accurate and up-to-date information about freelance platforms. However:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2">
              <li>Platform features, fees, and policies may change without notice</li>
              <li>We are not responsible for the accuracy of third-party information</li>
              <li>Reviews and comparisons reflect our opinions and research at the time of publication</li>
              <li>You should verify information directly with the platforms before making decisions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              11. Termination
            </h2>
            <p className="text-text-secondary mb-4">
              We reserve the right to terminate or suspend your access to the Website at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              12. Governing Law
            </h2>
            <p className="text-text-secondary mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the Netherlands, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              13. Changes to Terms
            </h2>
            <p className="text-text-secondary mb-4">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the Website after changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              14. Contact Information
            </h2>
            <p className="text-text-secondary mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-text-secondary">
              Email: <a href="mailto:legal@skilllinkup.com" className="text-primary hover:text-primary-dark">legal@skilllinkup.com</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              15. Severability
            </h2>
            <p className="text-text-secondary mb-4">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that the Terms shall otherwise remain in full force and effect.
            </p>
          </section>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
