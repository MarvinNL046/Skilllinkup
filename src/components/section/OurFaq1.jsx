"use client";

import FaqAccordion from "@/components/ui/FaqAccordion";

const faqs = [
  {
    id: "One",
    q: "How do I get started as a freelancer on SkillLinkup?",
    a: "Sign up for a free account, complete your profile with your skills and portfolio, and start browsing available projects or create service listings. Clients can find you through search or you can apply to posted projects directly.",
    open: true,
  },
  {
    id: "Two",
    q: "How do payments work?",
    a: "SkillLinkup uses a secure escrow system. When a client hires you, the payment is held in escrow until the work is completed and approved. Once the client confirms delivery, the funds are released to your account. This protects both freelancers and clients.",
  },
  {
    id: "Three",
    q: "Is it free to create an account?",
    a: "Yes, creating an account on SkillLinkup is completely free for both freelancers and clients. You can browse platforms, compare services, and set up your profile at no cost.",
  },
  {
    id: "Four",
    q: "How do I find the right freelancer for my project?",
    a: "Use the search and filter options on the Services page to find freelancers by skill, rating, price range, and delivery time. You can also browse our platform comparisons to find the best freelance platform for your specific needs.",
  },
  {
    id: "Five",
    q: "What if I have a dispute with a client or freelancer?",
    a: "SkillLinkup has a built-in dispute resolution system. If you encounter any issues, you can open a dispute through your dashboard. Our team will review the case and help mediate a fair resolution for both parties.",
  },
];

/**
 * Contact / become-seller FAQ block — wraps the shared FaqAccordion
 * with a section header so it fits below heroes on pages that include
 * it (e.g. /contact). The /faq route uses FaqPayment + FaqSuggestion.
 */
export default function OurFaq1() {
  return (
    <section style={{ padding: "var(--space-14) 0" }}>
      <div className="container">
        <div
          style={{ maxWidth: 640, margin: "0 auto var(--space-10)", textAlign: "center" }}
        >
          <span className="overline" style={{ color: "var(--primary-600)" }}>
            FAQ
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h2)",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              margin: "var(--space-2) 0 var(--space-3)",
            }}
          >
            Frequently asked questions
          </h2>
          <p className="body-md" style={{ color: "var(--text-secondary)", margin: 0 }}>
            Everything you need to know about using SkillLinkup.
          </p>
        </div>

        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <FaqAccordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
