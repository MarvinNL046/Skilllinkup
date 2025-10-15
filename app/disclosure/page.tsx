import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | SkillLinkup",
  description: "Learn about SkillLinkup's affiliate partnerships and how we maintain transparency.",
};

export default function DisclosurePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-heading font-bold text-text-primary mb-4">
          Affiliate Disclosure
        </h1>
        <p className="text-text-secondary mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              Our Commitment to Transparency
            </h2>
            <p className="text-text-secondary mb-4">
              At SkillLinkup, we believe in complete transparency with our readers. This page explains our affiliate relationships and how we earn revenue while maintaining our commitment to providing honest, unbiased reviews and recommendations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              What Are Affiliate Links?
            </h2>
            <p className="text-text-secondary mb-4">
              Affiliate links are special tracking links that allow us to earn a commission when you click through to a platform and make a purchase or sign up for a service. These links help support our work at no additional cost to you.
            </p>
            <p className="text-text-secondary mb-4">
              When you use an affiliate link, the price you pay remains the same. The platform simply pays us a small commission for referring you to their service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              How We Use Affiliate Links
            </h2>
            <p className="text-text-secondary mb-4">
              SkillLinkup participates in affiliate marketing programs with various freelance platforms and services, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2">
              <li>Upwork</li>
              <li>Fiverr</li>
              <li>Freelancer.com</li>
              <li>Toptal</li>
              <li>99designs</li>
              <li>Other freelance marketplaces and tools</li>
            </ul>
            <p className="text-text-secondary mb-4">
              Not all links on our website are affiliate links. We clearly mark affiliate content where appropriate and only recommend platforms and services we genuinely believe can benefit our readers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              Our Editorial Independence
            </h2>
            <p className="text-text-secondary mb-4">
              While we do earn commissions from some platforms we review, this does not influence our editorial content. Our commitment to you includes:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2">
              <li><strong>Honest Reviews:</strong> We provide unbiased, accurate reviews based on thorough research and real user experiences</li>
              <li><strong>No Pay-to-Play:</strong> Platforms cannot pay us to receive positive reviews or higher rankings</li>
              <li><strong>Balanced Coverage:</strong> We highlight both pros and cons of every platform we review</li>
              <li><strong>Regular Updates:</strong> We update our content regularly to reflect changes in platform features and pricing</li>
              <li><strong>User-First Approach:</strong> Our recommendations are based on what's best for our readers, not commission rates</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              How Affiliate Commissions Work
            </h2>
            <p className="text-text-secondary mb-4">
              We may earn a commission when:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2">
              <li>You click an affiliate link and sign up for a platform</li>
              <li>You make a purchase through an affiliate link</li>
              <li>You subscribe to a service after clicking our link</li>
            </ul>
            <p className="text-text-secondary mb-4">
              Commission rates vary by platform and are subject to change. Some platforms offer one-time commissions, while others provide recurring commissions for ongoing subscriptions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              Your Support Helps Us
            </h2>
            <p className="text-text-secondary mb-4">
              When you use our affiliate links, you help support SkillLinkup at no extra cost to you. These commissions allow us to:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2">
              <li>Continue providing free, comprehensive platform reviews and comparisons</li>
              <li>Maintain and improve our website</li>
              <li>Research and test new freelance platforms</li>
              <li>Create helpful guides, tutorials, and resources</li>
              <li>Keep our content up-to-date and accurate</li>
            </ul>
            <p className="text-text-secondary mb-4">
              We deeply appreciate your support and trust in our recommendations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              FTC Compliance
            </h2>
            <p className="text-text-secondary mb-4">
              SkillLinkup complies with the Federal Trade Commission's (FTC) guidelines concerning the use of endorsements and testimonials in advertising. We disclose our affiliate relationships in accordance with the FTC's 16 CFR Part 255: "Guides Concerning the Use of Endorsements and Testimonials in Advertising."
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              Third-Party Advertising
            </h2>
            <p className="text-text-secondary mb-4">
              In addition to affiliate links, we may display advertisements from third-party networks. These ads are clearly labeled and do not influence our editorial content or platform rankings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              No Guarantees
            </h2>
            <p className="text-text-secondary mb-4">
              While we strive to provide accurate information, we cannot guarantee:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2">
              <li>That you will earn income using the platforms we recommend</li>
              <li>Specific results or outcomes from using any freelance platform</li>
              <li>That platform features, fees, or policies won't change</li>
            </ul>
            <p className="text-text-secondary mb-4">
              Your success on any freelance platform depends on many factors including your skills, effort, market demand, and the platform's policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              Due Diligence
            </h2>
            <p className="text-text-secondary mb-4">
              We encourage you to:
            </p>
            <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2">
              <li>Conduct your own research before signing up for any platform</li>
              <li>Read the platform's terms of service and fee structure</li>
              <li>Compare multiple platforms to find the best fit for your needs</li>
              <li>Start with free trials or basic plans when available</li>
              <li>Read recent user reviews from multiple sources</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              Updates to This Disclosure
            </h2>
            <p className="text-text-secondary mb-4">
              We may update this Affiliate Disclosure from time to time to reflect changes in our affiliate partnerships or policies. The "Last updated" date at the top of this page indicates when changes were last made.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
              Questions or Concerns?
            </h2>
            <p className="text-text-secondary mb-4">
              If you have any questions about our affiliate relationships or this disclosure, please contact us at:
            </p>
            <p className="text-text-secondary mb-4">
              Email: <a href="mailto:disclosure@skilllinkup.com" className="text-primary hover:text-primary-dark">disclosure@skilllinkup.com</a>
            </p>
            <p className="text-text-secondary">
              We value your trust and are committed to maintaining transparency in all our business practices.
            </p>
          </section>

          <section className="mb-8 bg-background-light p-6 rounded-lg border-l-4 border-primary">
            <h3 className="text-xl font-heading font-semibold text-text-primary mb-3">
              Thank You for Your Support
            </h3>
            <p className="text-text-secondary">
              By using our affiliate links, you're helping us continue to provide free, valuable content to the freelance community. We appreciate your trust and support in our mission to help freelancers find the best platforms for their careers.
            </p>
          </section>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
