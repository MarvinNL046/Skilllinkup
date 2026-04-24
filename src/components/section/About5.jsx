import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

/**
 * About-page hero split — rebuilt on the SkillLinkup Design System.
 * Left: mission card on a primary-tinted gradient surface. Right: copy
 * + checklist + outbound CTA to /platforms.
 */
export default function About5() {
  const bullets = [
    "Compare 19+ freelance platforms side by side",
    "Find services from verified freelancers",
    "Secure payments with built-in escrow protection",
  ];

  return (
    <section style={{ padding: "var(--space-14) 0" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "var(--space-10)",
            alignItems: "center",
          }}
        >
          {/* Mission card */}
          <div
            style={{
              minHeight: 420,
              padding: "var(--space-10)",
              borderRadius: "var(--radius-2xl)",
              background:
                "linear-gradient(135deg, var(--primary-700) 0%, var(--primary-900, oklch(32% 0.15 284)) 100%)",
              color: "var(--neutral-0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              boxShadow: "var(--shadow-3)",
            }}
          >
            <div style={{ maxWidth: 420 }}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 2.75rem)",
                  fontWeight: 500,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  margin: 0,
                  marginBottom: "var(--space-4)",
                  color: "inherit",
                }}
              >
                Connecting talent <br /> with opportunity
              </h2>
              <p
                className="body-md"
                style={{
                  color: "oklch(100% 0 0 / 0.7)",
                  margin: 0,
                }}
              >
                Helping freelancers find the right platforms and clients find the
                right talent.
              </p>
            </div>
          </div>

          {/* Copy + CTA */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h2)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                marginBottom: "var(--space-4)",
              }}
            >
              Your guide to the freelance world
            </h2>
            <p
              className="body-lg"
              style={{ color: "var(--text-secondary)", marginBottom: "var(--space-6)" }}
            >
              SkillLinkup helps you navigate the freelance landscape. Whether
              you&apos;re a freelancer looking for the best platform to sell
              your services, or a client searching for the right talent — we&apos;ve
              got you covered with honest reviews, comparisons, and a growing
              marketplace.
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 var(--space-7)",
                display: "grid",
                gap: "var(--space-3)",
              }}
            >
              {bullets.map((b) => (
                <li
                  key={b}
                  style={{
                    display: "flex",
                    gap: "var(--space-3)",
                    alignItems: "flex-start",
                    color: "var(--text-primary)",
                    fontSize: "var(--text-body-md)",
                  }}
                >
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "999px",
                      background: "var(--success-50)",
                      color: "var(--success-700)",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <Link href="/platforms" className="btn btn--secondary btn--lg">
              Explore platforms
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
