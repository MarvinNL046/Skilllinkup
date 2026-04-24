"use client";

import CountUp from "react-countup";
import { useTranslations } from "next-intl";
import { useQuery } from "convex/react";
import { Users, Sparkles, Heart, Layers } from "lucide-react";
import { api } from "../../../convex/_generated/api";

/**
 * Social-proof band below the hero. Redesigned 2026-04-24 on the
 * SkillLinkup Design System — the first stat is the live waitlist
 * counter (pre-launch honesty); the rest are illustrative until we
 * have real platform data.
 */
const stats = [
  { key: "waitlist", Icon: Users, suffix: "+", tone: "primary" },
  { end: 1200, Icon: Layers, suffix: "+", labelKey: "services", tone: "secondary" },
  { end: 98, Icon: Heart, suffix: "%", labelKey: "satisfaction", tone: "primary" },
  { end: 50, Icon: Sparkles, suffix: "+", labelKey: "categoriesLabel", tone: "secondary" },
];

export default function SocialProofStats() {
  const t = useTranslations("stats");
  const waitlistCount = useQuery(api.waitlist.getCount);

  return (
    <section
      style={{
        padding: "var(--space-16) 0",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        background: "var(--bg-elevated)",
      }}
    >
      <div className="container" style={{ maxWidth: "var(--container-xl)" }}>
        <div
          style={{
            display: "grid",
            gap: "var(--space-6)",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          }}
        >
          {stats.map((stat) => {
            const tone = stat.tone === "primary"
              ? { bg: "var(--primary-50)", fg: "var(--primary-700)" }
              : { bg: "var(--secondary-50)", fg: "var(--secondary-700)" };
            const isWaitlist = stat.key === "waitlist";
            const value = isWaitlist ? (waitlistCount ?? 0) : stat.end;
            const label = isWaitlist
              ? t("waitlistLabel", { default: "On the waitlist" })
              : t(stat.labelKey);

            return (
              <div
                key={stat.key ?? stat.labelKey}
                className="text-center"
                style={{ padding: "var(--space-6) var(--space-4)" }}
              >
                <div
                  className="inline-flex items-center justify-center"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "var(--radius-md)",
                    background: tone.bg,
                    color: tone.fg,
                    marginBottom: "var(--space-3)",
                  }}
                >
                  <stat.Icon size={20} strokeWidth={2} />
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 4vw, 2.75rem)",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    letterSpacing: "var(--tracking-tighter)",
                    lineHeight: 1,
                    marginBottom: "var(--space-2)",
                  }}
                >
                  <CountUp
                    end={value}
                    suffix={stat.suffix}
                    duration={2.2}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </div>
                <p
                  className="body-sm"
                  style={{
                    color: "var(--text-secondary)",
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  {label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
