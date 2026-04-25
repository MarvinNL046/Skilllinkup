"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Star, ArrowRight } from "lucide-react";

/**
 * Freelancer sidebar contact card on the service-detail page. Rebuilt on
 * the SkillLinkup Design System (.card, .avatar, .btn, tokens) — replaces
 * the legacy .freelancer-style1 template markup.
 */
export default function ServiceContactWidget1({ freelancer }) {
  const t = useTranslations("gigDetail");
  const name = freelancer?.displayName || "Freelancer";
  const avatar = freelancer?.avatarUrl || "/images/team/default-avatar.svg";
  const rating = freelancer?.ratingAverage ?? null;
  const reviewCount = freelancer?.ratingCount ?? null;
  const location =
    freelancer?.locationCity
      ? `${freelancer.locationCity}${freelancer.locationCountry ? `, ${freelancer.locationCountry}` : ""}`
      : freelancer?.locationCountry || t("remote");
  const hourlyRate = freelancer?.hourlyRate ?? null;
  const jobSuccess = freelancer?.jobSuccessRate ?? null;
  const freelancerId = freelancer?._id || null;

  const meta = [
    { label: t("location"), value: location },
    hourlyRate !== null && { label: t("rate"), value: `€${hourlyRate} / hr` },
    jobSuccess !== null && { label: t("jobSuccess"), value: `${jobSuccess}%` },
  ].filter(Boolean);

  return (
    <div
      className="card"
      style={{
        padding: "var(--space-7)",
        marginBottom: "var(--space-6)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "var(--space-4)",
          alignItems: "center",
          paddingBottom: "var(--space-5)",
          marginBottom: "var(--space-5)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <span className="avatar avatar--lg" style={{ flexShrink: 0 }}>
          <Image height={64} width={64} src={avatar} alt={`${name} photo`} />
        </span>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h5)",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            {name}
          </div>
          {freelancer?.tagline && (
            <p
              className="body-sm"
              style={{ color: "var(--text-secondary)", margin: "2px 0 0" }}
            >
              {freelancer.tagline}
            </p>
          )}
          {rating !== null && (
            <div
              className="rating"
              style={{ marginTop: 6 }}
            >
              <span className="rating__star">
                <Star size={13} fill="currentColor" />
              </span>
              <span className="rating__value">{rating.toFixed(1)}</span>
              {reviewCount !== null && (
                <span className="rating__count">
                  ({reviewCount} {t("reviews")})
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "var(--space-4)",
          marginBottom: "var(--space-5)",
        }}
      >
        {meta.map(({ label, value }) => (
          <div key={label}>
            <div
              className="overline"
              style={{ color: "var(--text-tertiary)", marginBottom: 4 }}
            >
              {label}
            </div>
            <div
              className="body-sm"
              style={{ color: "var(--text-primary)", fontWeight: 500 }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      <Link
        href={freelancerId ? `/freelancers/${freelancerId}` : "/freelancers"}
        className="btn btn--secondary"
        style={{ width: "100%", justifyContent: "center" }}
      >
        {t("contactMe")}
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
