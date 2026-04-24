"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import WaitlistButton from "@/components/ui/WaitlistButton";

/**
 * Breadcrumb / page-hero component. Rebuilt on the SkillLinkup Design
 * System 2026-04-24 — token-driven gradient block, lucide chevron, and
 * a WaitlistButton instead of the old become-seller link.
 */
export default function Breadcumb1({ title, brief, isBtnActive, crumbs = [] }) {
  return (
    <section style={{ padding: "var(--space-12) 0 var(--space-8)" }}>
      <div className="container" style={{ maxWidth: "var(--container-xl)" }}>
        <div
          style={{
            position: "relative",
            borderRadius: "var(--radius-2xl)",
            padding: "clamp(40px, 5vw, 72px)",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, var(--primary-700) 0%, var(--primary-900) 70%, oklch(30% 0.10 40) 100%)",
            color: "var(--neutral-0)",
            boxShadow: "var(--shadow-4)",
          }}
        >
          {/* Decorative link motif */}
          <svg
            aria-hidden="true"
            style={{
              position: "absolute",
              right: -60,
              top: -30,
              width: 320,
              height: 320,
              opacity: 0.14,
              pointerEvents: "none",
            }}
            viewBox="0 0 200 200"
          >
            <path
              d="M20 100 Q 60 20 100 100 T 180 100"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="20" cy="100" r="6" fill="currentColor" />
            <circle cx="180" cy="100" r="6" fill="currentColor" />
          </svg>

          <div style={{ position: "relative", zIndex: 1, maxWidth: 720 }}>
            {crumbs.length > 0 && (
              <nav
                aria-label="Breadcrumb"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-2)",
                  marginBottom: "var(--space-4)",
                  color: "oklch(88% 0.02 285)",
                  fontSize: "var(--text-body-sm)",
                  flexWrap: "wrap",
                }}
              >
                {crumbs.map((c, i) => (
                  <span
                    key={c.href || c.name}
                    style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
                  >
                    {c.href ? (
                      <Link href={c.href} style={{ color: "inherit", textDecoration: "none", opacity: 0.85 }}>
                        {c.name}
                      </Link>
                    ) : (
                      <span>{c.name}</span>
                    )}
                    {i < crumbs.length - 1 && (
                      <ChevronRight size={14} strokeWidth={2} style={{ opacity: 0.5 }} />
                    )}
                  </span>
                ))}
              </nav>
            )}

            <h1
              className="display-lg"
              style={{ margin: 0, color: "var(--neutral-0)", fontWeight: 500 }}
            >
              {title}
            </h1>
            {brief && (
              <p
                className="body-lg"
                style={{
                  color: "oklch(92% 0.02 285)",
                  marginTop: "var(--space-3)",
                  marginBottom: 0,
                  maxWidth: 580,
                }}
              >
                {brief}
              </p>
            )}
            {isBtnActive && (
              <div style={{ marginTop: "var(--space-6)" }}>
                <WaitlistButton className="btn btn--accent" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
