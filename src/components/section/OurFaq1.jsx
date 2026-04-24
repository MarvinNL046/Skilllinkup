"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    id: "One",
    question: "How do I get started as a freelancer on SkillLinkup?",
    answer:
      "Sign up for a free account, complete your profile with your skills and portfolio, and start browsing available projects or create service listings. Clients can find you through search or you can apply to posted projects directly.",
  },
  {
    id: "Two",
    question: "How do payments work?",
    answer:
      "SkillLinkup uses a secure escrow system. When a client hires you, the payment is held in escrow until the work is completed and approved. Once the client confirms delivery, the funds are released to your account. This protects both freelancers and clients.",
  },
  {
    id: "Three",
    question: "Is it free to create an account?",
    answer:
      "Yes, creating an account on SkillLinkup is completely free for both freelancers and clients. You can browse platforms, compare services, and set up your profile at no cost.",
  },
  {
    id: "Four",
    question: "How do I find the right freelancer for my project?",
    answer:
      "Use the search and filter options on the Services page to find freelancers by skill, rating, price range, and delivery time. You can also browse our platform comparisons to find the best freelance platform for your specific needs.",
  },
  {
    id: "Five",
    question: "What if I have a dispute with a client or freelancer?",
    answer:
      "SkillLinkup has a built-in dispute resolution system. If you encounter any issues, you can open a dispute through your dashboard. Our team will review the case and help mediate a fair resolution for both parties.",
  },
];

/**
 * FAQ accordion on the DS — controlled state replaces Bootstrap's
 * data-bs-toggle. Single-open model with first item expanded by default.
 */
export default function OurFaq1() {
  const [openId, setOpenId] = useState(faqs[0].id);

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
          <div style={{ display: "grid", gap: "var(--space-3)" }}>
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="card"
                  style={{
                    padding: 0,
                    overflow: "hidden",
                    border: `1px solid ${isOpen ? "var(--primary-500)" : "var(--border-subtle)"}`,
                    boxShadow: isOpen ? "var(--shadow-2)" : "none",
                    transition: "border-color 160ms, box-shadow 160ms",
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-body-${faq.id}`}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "var(--space-4)",
                      padding: "var(--space-5) var(--space-6)",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-h5)",
                      fontWeight: 500,
                      color: "var(--text-primary)",
                    }}
                  >
                    {faq.question}
                    <span
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "999px",
                        background: isOpen ? "var(--primary-600)" : "var(--surface-2)",
                        color: isOpen ? "var(--neutral-0)" : "var(--text-primary)",
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                        transition: "background 160ms, color 160ms",
                      }}
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      id={`faq-body-${faq.id}`}
                      className="body-md"
                      style={{
                        padding: "0 var(--space-6) var(--space-6)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
