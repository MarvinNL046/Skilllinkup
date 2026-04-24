"use client";
import useConvexPlatforms from "@/hook/useConvexPlatforms";
import PlatformCard from "@/components/card/PlatformCard";
import EmptyState from "@/components/ui/EmptyState";
import { useTranslations } from "next-intl";

/**
 * /platforms hub — grid of freelance platforms we review. Rebuilt on
 * the SkillLinkup Design System with a centered hero header and a
 * responsive auto-fill grid (no more Bootstrap row/col scaffolding).
 */
export default function PlatformListing() {
  const t = useTranslations("platformsListing");
  const tc = useTranslations("common");
  const platforms = useConvexPlatforms("en");

  return (
    <section style={{ padding: "var(--space-14) 0 var(--space-16)" }}>
      <div className="container">
        <div style={{ maxWidth: 720, marginBottom: "var(--space-10)" }}>
          <span className="overline" style={{ color: "var(--primary-600)" }}>
            Platforms
          </span>
          <h1
            className="display-lg"
            style={{
              fontWeight: 500,
              margin: "var(--space-2) 0 var(--space-3)",
            }}
          >
            {t("heading")}
          </h1>
          <p
            className="body-lg"
            style={{ color: "var(--text-secondary)", margin: 0 }}
          >
            {t("subheading")}
          </p>
        </div>

        {platforms === undefined && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--space-3)",
              padding: "var(--space-12) 0",
              color: "var(--text-secondary)",
            }}
          >
            <div
              role="status"
              aria-label={tc("loading")}
              style={{
                width: 28,
                height: 28,
                border: "3px solid var(--border-subtle)",
                borderTopColor: "var(--primary-600)",
                borderRadius: "999px",
                animation: "spin 0.9s linear infinite",
              }}
            />
            <p className="body-sm" style={{ margin: 0 }}>
              {tc("loading")}
            </p>
          </div>
        )}

        {platforms !== undefined && platforms.length === 0 && (
          <EmptyState
            title={t("noPlatforms")}
            description={t("noPlatformsDescription")}
          />
        )}

        {platforms !== undefined && platforms.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "var(--space-5)",
            }}
          >
            {platforms.map((platform) => (
              <PlatformCard key={platform._id} data={platform} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
