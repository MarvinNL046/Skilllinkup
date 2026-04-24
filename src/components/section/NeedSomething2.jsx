"use client";
import { useTranslations } from "next-intl";
import { UserCheck, Handshake, Rocket } from "lucide-react";

/**
 * "How it works" band — replaces the old AllTimeSelling mock grid.
 * Pre-launch appropriate: explains the model instead of faking
 * marketplace activity we don't have yet. Redesigned against the
 * SkillLinkup Design System 2026-04-24.
 */

const steps = [
  {
    Icon: UserCheck,
    titleKey: "step1Title",
    descKey: "step1Desc",
    fallbackTitle: "Show your skill",
    fallbackDesc:
      "Join the waitlist and tell us what you offer — design, development, writing, whatever you're great at.",
    tone: "primary",
  },
  {
    Icon: Handshake,
    titleKey: "step2Title",
    descKey: "step2Desc",
    fallbackTitle: "We build the match",
    fallbackDesc:
      "We assemble the network before going live — so day one has real freelancers, real clients, real demand.",
    tone: "secondary",
  },
  {
    Icon: Rocket,
    titleKey: "step3Title",
    descKey: "step3Desc",
    fallbackTitle: "Launch together",
    fallbackDesc:
      "When we hit critical mass, everyone on the waitlist gets the launch email. No marketing spam in between.",
    tone: "primary",
  },
];

export default function NeedSomething2() {
  const t = useTranslations("howItWorks");

  return (
    <section style={{ padding: "var(--space-24) 0" }}>
      <div
        className="container"
        style={{ maxWidth: "var(--container-xl)" }}
      >
        <div className="text-center" style={{ marginBottom: "var(--space-12)" }}>
          <span className="overline" style={{ display: "inline-block", color: "var(--primary-600)", marginBottom: "var(--space-3)" }}>
            {t("eyebrow", { default: "How it works" })}
          </span>
          <h2
            className="display-lg"
            style={{
              margin: 0,
              maxWidth: 720,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {t("title", { default: "A platform built network-first." })}
          </h2>
          <p
            className="body-lg"
            style={{
              color: "var(--text-secondary)",
              maxWidth: 560,
              margin: "var(--space-4) auto 0",
            }}
          >
            {t("subtitle", {
              default:
                "We're not pretending to be live yet. Here's what happens between now and launch.",
            })}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: "var(--space-4)",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {steps.map((step, i) => {
            const tone = step.tone === "primary"
              ? { bg: "var(--primary-50)", fg: "var(--primary-700)" }
              : { bg: "var(--secondary-50)", fg: "var(--secondary-700)" };
            return (
              <div
                key={i}
                className="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-4)",
                }}
              >
                <div
                  className="flex items-center justify-between"
                  style={{ marginBottom: "var(--space-2)" }}
                >
                  <div
                    className="inline-flex items-center justify-center"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "var(--radius-md)",
                      background: tone.bg,
                      color: tone.fg,
                    }}
                  >
                    <step.Icon size={22} strokeWidth={2} />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-h3)",
                      fontWeight: 600,
                      color: "var(--text-tertiary)",
                      lineHeight: 1,
                    }}
                  >
                    0{i + 1}
                  </span>
                </div>
                <h3
                  className="h4"
                  style={{ margin: 0, letterSpacing: "-0.015em" }}
                >
                  {t(step.titleKey, { default: step.fallbackTitle })}
                </h3>
                <p
                  className="body-sm"
                  style={{
                    color: "var(--text-secondary)",
                    margin: 0,
                    lineHeight: "var(--leading-relaxed)",
                  }}
                >
                  {t(step.descKey, { default: step.fallbackDesc })}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
