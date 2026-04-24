"use client";
import { useTranslations } from "next-intl";
import WaitlistButton from "@/components/ui/WaitlistButton";
import { Check, Globe, MapPin, Briefcase } from "lucide-react";

/**
 * Bottom-of-page CTA banner — pre-launch waitlist push with value props.
 * Replaces the old marketplace banner + stock photography. Kept the
 * CtaBanner18 export name so existing imports don't break.
 */

const valueProps = [
  { Icon: Globe, key: "onlineProp", fallback: "Digital freelancers, remote" },
  { Icon: MapPin, key: "localProp", fallback: "Local pros near you" },
  { Icon: Briefcase, key: "jobsProp", fallback: "Permanent roles" },
];

const bullets = [
  { key: "b1", fallback: "Built network-first — day one with real demand" },
  { key: "b2", fallback: "One place for online, local, and jobs" },
  { key: "b3", fallback: "Honest pricing, transparent escrow" },
  { key: "b4", fallback: "No spam between now and launch" },
];

export default function CtaBanner18() {
  const t = useTranslations("ctaBanner");

  return (
    <section style={{ padding: "var(--space-24) 0" }}>
      <div className="container" style={{ maxWidth: "var(--container-xl)" }}>
        <div
          style={{
            position: "relative",
            borderRadius: "var(--radius-2xl)",
            padding: "clamp(40px, 6vw, 72px)",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, var(--primary-700) 0%, var(--primary-900) 70%, oklch(28% 0.10 40) 100%)",
            color: "var(--neutral-0)",
            boxShadow: "var(--shadow-4)",
          }}
        >
          {/* Decorative "link" motif */}
          <svg
            aria-hidden="true"
            style={{
              position: "absolute",
              right: -80,
              top: -40,
              width: 420,
              height: 420,
              opacity: 0.15,
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "var(--space-12)",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div>
              <span
                className="overline"
                style={{
                  display: "inline-block",
                  color: "var(--secondary-300)",
                  marginBottom: "var(--space-4)",
                }}
              >
                {t("eyebrow", { default: "One platform, three worlds" })}
              </span>
              <h2
                className="display-lg"
                style={{
                  margin: 0,
                  marginBottom: "var(--space-4)",
                  color: "var(--neutral-0)",
                  fontWeight: 500,
                }}
              >
                {t("title", { default: "Online, local, jobs — pick your world." })}
              </h2>
              <p
                className="body-lg"
                style={{
                  color: "oklch(92% 0.02 285)",
                  maxWidth: 520,
                  marginBottom: "var(--space-6)",
                }}
              >
                {t("subtitle", {
                  default:
                    "Everything that connects skill and need — in one place. Join the waitlist to be part of day one.",
                })}
              </p>
              <WaitlistButton
                className="btn btn--accent btn--lg"
                label={t("cta", { default: "Join the waitlist" })}
              />
            </div>

            <div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-3)",
                  marginBottom: "var(--space-6)",
                }}
              >
                {bullets.map((b) => (
                  <li
                    key={b.key}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "var(--space-3)",
                      color: "oklch(94% 0.015 285)",
                    }}
                  >
                    <span
                      className="inline-flex items-center justify-center"
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "var(--radius-full)",
                        background: "var(--secondary-500)",
                        color: "oklch(20% 0.05 35)",
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      <Check size={14} strokeWidth={2.4} />
                    </span>
                    <span className="body-md">
                      {t(b.key, { default: b.fallback })}
                    </span>
                  </li>
                ))}
              </ul>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "var(--space-2)",
                }}
              >
                {valueProps.map((v) => (
                  <div
                    key={v.key}
                    style={{
                      padding: "var(--space-3) var(--space-4)",
                      border: "1px solid oklch(100% 0 0 / 0.14)",
                      borderRadius: "var(--radius-md)",
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-2)",
                      color: "oklch(94% 0.015 285)",
                      fontSize: "var(--text-body-sm)",
                      fontWeight: 500,
                    }}
                  >
                    <v.Icon size={16} strokeWidth={2} />
                    <span>{t(v.key, { default: v.fallback })}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
