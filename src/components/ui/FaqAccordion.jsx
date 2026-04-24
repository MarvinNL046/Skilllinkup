"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

/**
 * Reusable FAQ accordion on the SkillLinkup Design System.
 *
 * Props:
 *   - title?: optional section heading (rendered on display font)
 *   - items: Array<{ id, q, a, open?: boolean }> — first `open: true` sets default
 *
 * Single-open model (click an item to close it). Controlled with React
 * state so we don't depend on Bootstrap's data-bs-toggle runtime.
 */
export default function FaqAccordion({ title, items = [] }) {
  const defaultOpen = items.find((i) => i.open)?.id ?? items[0]?.id ?? null;
  const [openId, setOpenId] = useState(defaultOpen);

  return (
    <div style={{ marginBottom: "var(--space-10)" }}>
      {title && (
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h4)",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            marginBottom: "var(--space-5)",
          }}
        >
          {title}
        </h3>
      )}
      <div style={{ display: "grid", gap: "var(--space-3)" }}>
        {items.map((faq) => {
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
                {faq.q}
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
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
