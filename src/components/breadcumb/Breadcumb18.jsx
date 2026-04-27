"use client";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import listingStore from "@/store/listingStore";

/**
 * /online/projects hero — DS rewrite of the legacy .cta-service-v6
 * banner. Drops the generic Trafalgar template image, uses a primary→
 * deep-aubergine gradient with a subtle "project cards" SVG pattern
 * that visually nods to the cards rendered below the hero. Heading
 * is a proper <h1> on display-lg type.
 *
 * Earlier versions also rendered a live "X open projects · live now"
 * counter via api.marketplace.projects.getOpenCount, but that meant
 * the entire page crashed on environments where Convex deploy was out
 * of sync (audit 2026-04-25). The counter is dropped — a non-essential
 * stat is not allowed to break the page.
 */
export default function Breadcumb18() {
  const t = useTranslations("projects");
  const getSearch = listingStore((state) => state.getSearch);
  const setSearch = listingStore((state) => state.setSearch);

  function handleSubmit(e) {
    e.preventDefault();
    const el = document.querySelector(".listing_area, .pt-8, [data-projects-list]");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section style={{ padding: "var(--space-6) 0 0" }}>
      <div className="container">
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "var(--radius-2xl)",
            padding: "clamp(40px, 6vw, 80px) clamp(24px, 4vw, 56px)",
            color: "var(--neutral-0)",
            background:
              "linear-gradient(135deg, var(--primary-700) 0%, var(--primary-900) 70%, oklch(28% 0.10 40) 100%)",
            boxShadow: "var(--shadow-4)",
          }}
        >
          {/* Decorative project-card pattern — subtle rounded rectangles */}
          <svg
            aria-hidden="true"
            style={{
              position: "absolute",
              right: -60,
              top: -40,
              width: 460,
              height: 460,
              opacity: 0.08,
              pointerEvents: "none",
            }}
            viewBox="0 0 200 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="20"  y="40"  width="80" height="50" rx="6" />
            <rect x="110" y="30"  width="70" height="46" rx="6" />
            <rect x="30"  y="100" width="64" height="42" rx="6" />
            <rect x="105" y="92"  width="78" height="56" rx="6" />
            <rect x="40"  y="150" width="58" height="36" rx="6" />
            <line x1="100" y1="65" x2="110" y2="50" />
            <line x1="62"  y1="120" x2="105" y2="115" />
            <line x1="98"  y1="165" x2="142" y2="148" />
          </svg>

          <div style={{ position: "relative", maxWidth: 720 }}>
            <h1
              className="display-lg"
              style={{
                color: "var(--neutral-0)",
                fontWeight: 500,
                margin: 0,
                marginBottom: "var(--space-3)",
                letterSpacing: "-0.02em",
              }}
            >
              {t("heroTitle")}
            </h1>
            <p
              className="body-lg"
              style={{
                color: "oklch(94% 0.015 285)",
                margin: 0,
                marginBottom: "var(--space-6)",
                maxWidth: 540,
              }}
            >
              {t("heroSubtitle")}
            </p>

            <form
              onSubmit={handleSubmit}
              role="search"
              aria-label="Search projects"
              style={{
                display: "flex",
                gap: "var(--space-2)",
                background: "var(--bg-elevated)",
                padding: 6,
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-2)",
                maxWidth: 600,
              }}
            >
              <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
                <Search
                  size={16}
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-tertiary)",
                    pointerEvents: "none",
                  }}
                  aria-hidden="true"
                />
                <input
                  type="text"
                  className="input"
                  name="search"
                  placeholder={t("searchPlaceholder")}
                  aria-label={t("searchPlaceholder")}
                  value={getSearch}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    paddingLeft: 40,
                    width: "100%",
                    border: "none",
                    background: "transparent",
                    boxShadow: "none",
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn btn--primary"
                style={{ flexShrink: 0 }}
              >
                {t("search")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
