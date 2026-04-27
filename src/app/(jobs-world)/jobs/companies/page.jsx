import { getTranslations } from "next-intl/server";
import { Building2 } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";

export async function generateMetadata() {
  const t = await getTranslations("jobsHub");
  return {
    title: t("companiesTitle"),
    description: t("companiesDescription"),
  };
}

export default async function CompaniesPage() {
  const t = await getTranslations("jobsHub");
  return (
    <>
      <section
        style={{
          padding: "var(--space-14) 0",
          background:
            "linear-gradient(135deg, var(--primary-50) 0%, var(--secondary-50) 100%)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              gap: "var(--space-5)",
              alignItems: "flex-start",
              maxWidth: 720,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "var(--radius-lg)",
                background: "var(--bg-elevated)",
                color: "var(--primary-600)",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
                boxShadow: "var(--shadow-1)",
              }}
            >
              <Building2 size={26} />
            </div>
            <div style={{ minWidth: 0 }}>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-h1)",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  margin: 0,
                  marginBottom: "var(--space-3)",
                }}
              >
                {t("companiesHeading")}
              </h1>
              <p
                className="body-lg"
                style={{ color: "var(--text-secondary)", margin: 0 }}
              >
                {t("companiesText")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "var(--space-12) 0 var(--space-16)" }}>
        <div className="container">
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <EmptyState
              Icon={Building2}
              title={t("companiesComingSoon")}
              description={t("companiesComingSoonText")}
              actionLabel={t("browseJobs")}
              actionHref="/jobs/browse"
            />
          </div>
        </div>
      </section>
    </>
  );
}
