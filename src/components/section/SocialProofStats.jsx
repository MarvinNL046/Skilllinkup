"use client";

import CountUp from "react-countup";
import { useTranslations } from "next-intl";
import { useQuery } from "convex/react";
import { Users, Sparkles, Heart, Layers } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { cn } from "@/lib/utils";

const STATS = [
  { key: "waitlist", Icon: Users, suffix: "+", tone: "primary" },
  { end: 1200, Icon: Layers, suffix: "+", labelKey: "services", tone: "secondary" },
  { end: 98, Icon: Heart, suffix: "%", labelKey: "satisfaction", tone: "primary" },
  {
    end: 50,
    Icon: Sparkles,
    suffix: "+",
    labelKey: "categoriesLabel",
    tone: "secondary",
  },
];

const WAITLIST_DISPLAY_THRESHOLD = 25;

export default function SocialProofStats() {
  const t = useTranslations("stats");
  const waitlistCount = useQuery(api.waitlist.getCount);
  const showWaitlist =
    waitlistCount !== undefined && waitlistCount >= WAITLIST_DISPLAY_THRESHOLD;

  const visibleStats = STATS.filter((s) => s.key !== "waitlist" || showWaitlist);

  return (
    <section className="py-16 border-y border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
      <div className="container max-w-screen-xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleStats.map((stat) => {
            const toneClass =
              stat.tone === "primary"
                ? "bg-primary/10 text-primary"
                : "bg-secondary/20 text-secondary-700";
            const isWaitlist = stat.key === "waitlist";
            const value = isWaitlist ? waitlistCount ?? 0 : stat.end;
            const label = isWaitlist
              ? t("waitlistLabel", { default: "On the waitlist" })
              : t(stat.labelKey);

            return (
              <div
                key={stat.key ?? stat.labelKey}
                className="text-center px-4 py-6"
              >
                <div
                  className={cn(
                    "inline-flex items-center justify-center h-11 w-11 rounded-md mb-3",
                    toneClass
                  )}
                >
                  <stat.Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <div
                  className="font-semibold text-foreground tracking-tight leading-none mb-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 4vw, 2.75rem)",
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
                <p className="text-sm font-medium text-[var(--text-secondary)] mb-0">
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
