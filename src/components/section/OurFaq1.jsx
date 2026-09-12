"use client";

import FaqAccordion from "@/components/ui/FaqAccordion";
import { helpFaqs } from "@/data/helpFaqs";

const faqs = helpFaqs.filter((item) =>
  ["getting-started", "finding-professionals", "payments", "orders", "support"].includes(item.id)
);

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
            The basics of getting started and working together during the beta.
          </p>
        </div>

        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <FaqAccordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
