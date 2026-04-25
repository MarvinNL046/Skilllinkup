"use client";
import Link from "next/link";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import WaitlistButton from "@/components/ui/WaitlistButton";
import { api } from "../../../convex/_generated/api";

/**
 * Shared pre-launch landing for the three "worlds" — /online, /local,
 * /jobs. The worlds are visually distinct (tone prop shifts the accent
 * gradient between primary-indigo and secondary-terracotta) while
 * sharing the same content structure: tone-specific hero + honest
 * "we're building" blurb + category preview + waitlist CTA.
 */
export default function PrelaunchWorld({
  eyebrow,
  title,
  accent,
  subtitle,
  bullets = [],
  categories = [],
  tone = "primary",
  translationsNs = "home",
}) {
  const t = useTranslations(translationsNs);
  const waitlistCount = useQuery(api.waitlist.getCount);

  const palette =
    tone === "secondary"
      ? {
          ring: "var(--secondary-500)",
          bg: "var(--secondary-50)",
          fg: "var(--secondary-700)",
          accent: "var(--secondary-600)",
        }
      : tone === "neutral"
        ? {
            ring: "var(--neutral-400)",
            bg: "var(--surface-2)",
            fg: "var(--text-primary)",
            accent: "var(--text-primary)",
          }
        : {
            ring: "var(--primary-500)",
            bg: "var(--primary-50)",
            fg: "var(--primary-700)",
            accent: "var(--primary-600)",
          };

  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          padding: "clamp(48px, 7vw, 96px) 0 clamp(40px, 6vw, 80px)",
          background:
            tone === "secondary"
              ? "radial-gradient(1000px 420px at 80% -10%, var(--secondary-50) 0%, transparent 55%)"
              : tone === "neutral"
                ? "var(--bg-sunken)"
                : "radial-gradient(1000px 420px at 80% -10%, var(--primary-50) 0%, transparent 55%)",
          overflow: "hidden",
        }}
      >
        <div className="container" style={{ maxWidth: "var(--container-xl)", position: "relative", zIndex: 1 }}>
          {eyebrow && (
            <span
              className="tag"
              style={{
                background: "var(--bg-elevated)",
                borderColor: "var(--border-default)",
                color: "var(--text-secondary)",
                boxShadow: "var(--shadow-1)",
                marginBottom: "var(--space-6)",
              }}
            >
              <Sparkles size={12} strokeWidth={2.4} style={{ color: palette.accent }} />
              {eyebrow}
            </span>
          )}
          <div style={{ maxWidth: 820 }}>
            <h1
              className="display-xl"
              style={{ margin: 0, color: "var(--text-primary)", fontWeight: 500 }}
            >
              {title}
              {accent && (
                <>
                  {" "}
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      color: palette.accent,
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
                color: "var(--text-secondary)",
                maxWidth: 640,
                margin: "var(--space-6) 0 var(--space-8)",
              }}
            >
              {subtitle}
            </p>
            <div className="flex items-center" style={{ gap: "var(--space-3)", flexWrap: "wrap" }}>
              <WaitlistButton
                className={tone === "secondary" ? "btn btn--accent btn--lg" : "btn btn--primary btn--lg"}
              />
              {waitlistCount !== undefined && (
                <span
                  className="body-sm"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {waitlistCount}{" "}
                  {t("waitlistAlreadyJoined", {
                    default: "already on the list",
                  })}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* What's coming */}
      {bullets.length > 0 && (
        <section style={{ padding: "var(--space-16) 0" }}>
          <div
            className="container"
            style={{ maxWidth: "var(--container-xl)" }}
          >
            <h2
              className="h2"
              style={{ margin: 0, marginBottom: "var(--space-8)", maxWidth: 680 }}
            >
              {t("worldWhatsComing", {
                default: "What's coming when we launch",
              })}
            </h2>
            <div
              style={{
                display: "grid",
                gap: "var(--space-4)",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              }}
            >
              {bullets.map((b, i) => (
                <div
                  key={i}
                  className="card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-3)",
                  }}
                >
                  <span
                    className="inline-flex items-center justify-center"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "var(--radius-md)",
                      background: palette.bg,
                      color: palette.fg,
                      flexShrink: 0,
                    }}
                  >
                    <Check size={18} strokeWidth={2.4} />
                  </span>
                  <h3
                    className="h5"
                    style={{ margin: 0, letterSpacing: "-0.01em" }}
                  >
                    {b.title}
                  </h3>
                  <p
                    className="body-sm"
                    style={{
                      color: "var(--text-secondary)",
                      margin: 0,
                      lineHeight: "var(--leading-relaxed)",
                    }}
                  >
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category preview */}
      {categories.length > 0 && (
        <section
          style={{
            padding: "var(--space-16) 0",
            background: "var(--bg-sunken)",
            borderTop: "1px solid var(--border-subtle)",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <div
            className="container"
            style={{ maxWidth: "var(--container-xl)" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "var(--space-4)",
                marginBottom: "var(--space-6)",
                flexWrap: "wrap",
              }}
            >
              <h2 className="h2" style={{ margin: 0 }}>
                {t("worldCategoriesTitle", {
                  default: "Categories we're building first",
                })}
              </h2>
              <span
                className="body-sm"
                style={{ color: "var(--text-tertiary)" }}
              >
                {t("worldCategoriesHint", {
                  default:
                    "Tell us which one you'd use — via the waitlist form",
                })}
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gap: "var(--space-3)",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              }}
            >
              {categories.map((cat, i) => (
                <Link
                  key={`${cat.name}-${i}`}
                  href={cat.href || "#"}
                  className="card group"
                  style={{
                    padding: "var(--space-4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "var(--space-3)",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <span className="body-md" style={{ fontWeight: 500 }}>
                    {cat.name}
                  </span>
                  <ArrowRight
                    size={16}
                    strokeWidth={2}
                    style={{
                      color: "var(--text-tertiary)",
                      transition: "transform var(--dur-base) var(--ease-spring)",
                    }}
                    className="group-hover:translate-x-[2px]"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
