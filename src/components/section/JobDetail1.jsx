"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Calendar, MapPin, Clock, Wallet, Check, ArrowRight } from "lucide-react";
import useConvexJobDetail from "@/hook/useConvexJobDetail";

export default function JobDetail1() {
  const t = useTranslations("jobsHub");
  const { id } = useParams();
  const convexData = useConvexJobDetail(id);

  const isLoading = convexData === undefined;

  const data = !isLoading
    ? convexData
      ? {
          _id: convexData._id,
          title: convexData.title,
          description: convexData.description || null,
          location: convexData.locationCity
            ? `${convexData.locationCity}, ${convexData.locationCountry || ""}`
            : convexData.workType === "remote"
            ? t("remote")
            : null,
          postedAt: convexData.createdAt
            ? (() => {
                const diffMs = Date.now() - convexData.createdAt;
                const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                if (diffDays === 0) return t("postedToday");
                if (diffDays === 1) return t("posted1Day");
                return t("postedDaysAgo", { days: diffDays });
              })()
            : null,
          hours: convexData.hoursPerWeek
            ? t("hoursPerWeek", { hours: convexData.hoursPerWeek })
            : null,
          salary:
            convexData.salaryMin && convexData.salaryMax
              ? `$${Math.round(convexData.salaryMin / 1000)}k - $${Math.round(
                  convexData.salaryMax / 1000
                )}k`
              : convexData.salaryMax
              ? `$${Math.round(convexData.salaryMax / 1000)}k`
              : null,
          responsibilities: convexData.responsibilities || [],
          requirements: convexData.requirements || [],
        }
      : null
    : null;

  if (isLoading) {
    return (
      <section style={{ padding: "var(--space-12) 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", color: "var(--text-secondary)" }}>
            <p>{t("loadingJob")}</p>
          </div>
        </div>
      </section>
    );
  }

  const location = data?.location || null;
  const postedAt = data?.postedAt || null;
  const hours = data?.hours || null;
  const salary = data?.salary || null;
  const description = data?.description || null;
  const responsibilities = data?.responsibilities || [];
  const requirements = data?.requirements || [];

  const stats = [
    postedAt && { icon: Calendar, label: t("datePosted"), value: postedAt },
    location && { icon: MapPin, label: t("location"), value: location },
    hours && { icon: Clock, label: t("hours"), value: hours },
    salary && { icon: Wallet, label: t("salary"), value: salary },
  ].filter(Boolean);

  return (
    <section style={{ padding: "var(--space-12) 0 var(--space-16)" }}>
      <div className="container" style={{ maxWidth: "var(--container-md)" }}>
        {stats.length > 0 && (
          <div
            className="card"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "var(--space-5)",
              padding: "var(--space-6)",
              marginBottom: "var(--space-8)",
            }}
          >
            {stats.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)" }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "var(--radius-md)",
                    background: "var(--primary-50)",
                    color: "var(--primary-600)",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    className="overline"
                    style={{ color: "var(--text-tertiary)", marginBottom: 2 }}
                  >
                    {label}
                  </div>
                  <div
                    className="body-md"
                    style={{ fontWeight: 600, color: "var(--text-primary)" }}
                  >
                    {value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {description && (
          <div style={{ marginBottom: "var(--space-10)" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h3)",
                fontWeight: 500,
                marginBottom: "var(--space-4)",
              }}
            >
              {t("description")}
            </h2>
            <p
              className="body-lg"
              style={{ color: "var(--text-secondary)", whiteSpace: "pre-wrap" }}
            >
              {description}
            </p>
          </div>
        )}

        {responsibilities.length > 0 && (
          <div style={{ marginBottom: "var(--space-10)" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h3)",
                fontWeight: 500,
                marginBottom: "var(--space-5)",
              }}
            >
              {t("keyResponsibilities")}
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-3)" }}>
              {responsibilities.map((item, i) => (
                <li
                  key={i}
                  style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}
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
                  <span className="body-md" style={{ color: "var(--text-primary)" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {requirements.length > 0 && (
          <div style={{ marginBottom: "var(--space-10)" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h3)",
                fontWeight: 500,
                marginBottom: "var(--space-5)",
              }}
            >
              {t("requirements")}
            </h2>
            <ul style={{ paddingLeft: "var(--space-6)", margin: 0, display: "grid", gap: "var(--space-2)" }}>
              {requirements.map((item, i) => (
                <li key={i} className="body-md" style={{ color: "var(--text-secondary)" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Link
          href="/contact"
          className="btn btn--primary btn--lg"
          style={{ width: "100%", justifyContent: "center" }}
        >
          {t("applyForJob")}
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
