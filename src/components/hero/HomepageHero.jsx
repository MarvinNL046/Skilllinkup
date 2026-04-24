"use client";
import Link from "next/link";
import SearchBarWithDropdown from "@/components/ui/SearchBarWithDropdown";
import { useTranslations } from "next-intl";
import { Globe, MapPin, Briefcase, ArrowUpRight } from "lucide-react";

/**
 * Homepage hero — redesigned 2026-04-24 against the SkillLinkup Design
 * System. Uses OKLCH tokens, Instrument Serif display accent, and the
 * warm terracotta-amber highlight rather than the old fuchsia pink.
 */

const worlds = [
  {
    Icon: Globe,
    titleKey: "onlineMarketplace",
    descKey: "onlineMarketplaceDesc",
    href: "/online",
    tone: "primary", // indigo-aubergine
  },
  {
    Icon: MapPin,
    titleKey: "localMarketplace",
    descKey: "localMarketplaceDesc",
    href: "/local",
    tone: "secondary", // warm terracotta
  },
  {
    Icon: Briefcase,
    titleKey: "jobsTitle",
    descKey: "jobsDesc",
    href: "/jobs",
    tone: "neutral",
  },
];

function WorldCard({ Icon, title, description, href, tone }) {
  const toneStyles = {
    primary: {
      iconBg: "var(--primary-50)",
      iconFg: "var(--primary-700)",
      border: "1px solid var(--border-subtle)",
    },
    secondary: {
      iconBg: "var(--secondary-50)",
      iconFg: "var(--secondary-700)",
      border: "1px solid var(--border-subtle)",
    },
    neutral: {
      iconBg: "var(--surface-2)",
      iconFg: "var(--text-primary)",
      border: "1px solid var(--border-subtle)",
    },
  }[tone];

  return (
    <Link
      href={href}
      className="card group"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
        textDecoration: "none",
        color: "inherit",
        height: "100%",
      }}
    >
      <div className="flex items-center justify-between">
        <div
          className="inline-flex items-center justify-center"
          style={{
            width: 44,
            height: 44,
            borderRadius: "var(--radius-md)",
            background: toneStyles.iconBg,
            color: toneStyles.iconFg,
          }}
        >
          <Icon size={22} strokeWidth={1.8} />
        </div>
        <ArrowUpRight
          size={18}
          strokeWidth={2}
          style={{ color: "var(--text-tertiary)" }}
          className="transition-transform duration-base ease-standard group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
        />
      </div>
      <div>
        <h3
          className="h4"
          style={{ margin: 0, marginBottom: 4, letterSpacing: "-0.015em" }}
        >
          {title}
        </h3>
        <p
          className="body-sm"
          style={{ color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}
        >
          {description}
        </p>
      </div>
    </Link>
  );
}

export default function HomepageHero() {
  const t = useTranslations("home");
  const rawTitle = t("heroTitle");
  const [primary, accent] = rawTitle.includes(",")
    ? [rawTitle.split(",")[0], rawTitle.split(",").slice(1).join(",").trim()]
    : [rawTitle, ""];

  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(48px, 8vw, 96px) 0 clamp(56px, 8vw, 120px)",
        background:
          "radial-gradient(1200px 500px at 80% -20%, var(--secondary-50) 0%, transparent 60%), " +
          "radial-gradient(1000px 400px at 10% 0%, var(--primary-50) 0%, transparent 60%)",
        overflow: "hidden",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: "var(--container-xl)", position: "relative", zIndex: 1 }}
      >
        {/* Eyebrow */}
        <div
          className="text-center"
          style={{ marginBottom: "var(--space-6)" }}
        >
          <span
            className="tag"
            style={{
              background: "var(--bg-elevated)",
              borderColor: "var(--border-default)",
              color: "var(--text-secondary)",
              boxShadow: "var(--shadow-1)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "var(--radius-full)",
                background: "var(--secondary-500)",
                display: "inline-block",
              }}
            />
            {t("metaTitle")?.split("—")[0]?.trim() || "SkillLinkup"}
          </span>
        </div>

        {/* Hero headline */}
        <div className="text-center" style={{ maxWidth: 920, margin: "0 auto" }}>
          <h1
            className="display-xl"
            style={{
              margin: 0,
              color: "var(--text-primary)",
              fontWeight: 400,
            }}
          >
            {primary}
            {accent && (
              <>
                ,{" "}
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    color: "var(--primary-600)",
                    letterSpacing: "-0.025em",
                  }}
                >
                  {accent}
                </span>
              </>
            )}
          </h1>
          <p
            className="body-lg"
            style={{
              margin: "var(--space-6) auto 0",
              color: "var(--text-secondary)",
              maxWidth: 640,
            }}
          >
            {t("heroSubtitle")}
          </p>
        </div>

        {/* Search */}
        <div
          style={{
            margin: "var(--space-12) auto 0",
            maxWidth: 640,
          }}
        >
          <SearchBarWithDropdown />
        </div>

        {/* World cards */}
        <div
          style={{
            display: "grid",
            gap: "var(--space-4)",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            marginTop: "var(--space-12)",
          }}
        >
          {worlds.map((w) => (
            <WorldCard
              key={w.href}
              Icon={w.Icon}
              title={t(w.titleKey)}
              description={t(w.descKey)}
              href={w.href}
              tone={w.tone}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
