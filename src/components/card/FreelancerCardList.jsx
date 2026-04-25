"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LevelBadge } from "./FreelancerCard2";

export default function FreelancerCardList({ data }) {
  const t = useTranslations("freelancerCard");
  const tags = data.tags || [];
  const visibleTags = tags.slice(0, 3);
  const overflow = tags.length - 3;
  const profileHref = `/online/freelancer/${data.slug || data._id || data.id}`;

  return (
    <div
      className="freelancer-style1 bdr1 hover-box-shadow"
      style={{ borderRadius: 8, padding: 0, overflow: "hidden" }}
    >
      <div className="row g-0 align-items-center">
        {/* Left: Portfolio / Avatar */}
        <div className="col-auto d-none d-md-block">
          <div style={{ width: 160, height: 120, position: "relative", overflow: "hidden" }}>
            {data.portfolioImg ? (
              <Image
                src={data.portfolioImg}
                alt={`${data.name} portfolio`}
                fill
                style={{ objectFit: "cover", borderRadius: "8px 0 0 8px" }}
              />
            ) : (
              <div
                className="d-flex align-items-center justify-content-center h-100"
                style={{ background: "#f9fafb" }}
              >
                <Image
                  height={70}
                  width={70}
                  className="rounded-circle"
                  src={data.img}
                  alt={data.name}
                />
              </div>
            )}
          </div>
        </div>

        {/* Middle: Details */}
        <div className="col" style={{ padding: "16px 20px" }}>
          {/* Row 1: Avatar + Name + Tagline + Location */}
          <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
            <Image
              height={40}
              width={40}
              className="rounded-circle d-md-none"
              src={data.img}
              alt={data.name}
            />
            <Image
              height={40}
              width={40}
              className="rounded-circle d-none d-md-inline-block"
              src={data.img}
              alt={data.name}
            />
            <div>
              <h6 className="mb-0 fw500">{data.name}</h6>
              <span className="fz13 text-muted">{data.profession}</span>
            </div>
            {data.location && (
              <span className="fz12 text-muted ms-auto d-none d-lg-block">
                <i className="flaticon-place fz12 me-1" />
                {data.location}
              </span>
            )}
          </div>

          {/* Row 2: Stats */}
          <div className="d-flex align-items-center gap-3 fz13 mt-1 flex-wrap">
            {data.price > 0 && (
              <span className="fw500">€{data.price}/hr</span>
            )}
            {data.completionRate && (
              <span className="text-muted">{data.completionRate}% {t("jobSuccess")}</span>
            )}
            {data.totalOrders > 0 && (
              <span className="text-muted">{data.totalOrders} {t("jobsCompleted")}</span>
            )}
            {data.rating > 0 && (
              <span className="text-muted">
                <i className="fas fa-star fz10 review-color me-1" />
                {data.rating}
              </span>
            )}
          </div>

          {/* Row 3: Availability + Level */}
          <div className="d-flex align-items-center gap-2 mt-2">
            {data.isAvailable && (
              <span
                style={{
                  display: "inline-block",
                  background: "#f0fdf4",
                  color: "var(--primary-700)",
                  fontSize: 12,
                  padding: "2px 10px",
                  borderRadius: 999,
                  fontWeight: 500,
                }}
              >
                {t("availableNow")}
              </span>
            )}
            <LevelBadge level={data.level} />
          </div>

          {/* Row 4: Skill tags */}
          {visibleTags.length > 0 && (
            <div className="skill-tags d-flex align-items-center gap-1 mt-2 flex-wrap">
              {visibleTags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
              {overflow > 0 && (
                <span className="tag" style={{ background: "#f3f4f6", color: "#6b7280" }}>
                  +{overflow}
                </span>
              )}
            </div>
          )}

          {/* Row 5: Bio snippet */}
          {data.title && (
            <p
              className="fz13 text-muted mb-0 mt-2"
              style={{
                lineHeight: 1.4,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {data.title}
            </p>
          )}
        </div>

        {/* Right: View Profile button */}
        <div className="col-auto d-none d-md-flex align-items-center" style={{ padding: "16px 20px" }}>
          <Link
            href={profileHref}
            className="ud-btn btn-light-thm"
            style={{
              border: "2px solid var(--primary-600)",
              borderRadius: 8,
              whiteSpace: "nowrap",
            }}
          >
            {t("viewProfile")}
            <i className="fal fa-arrow-right-long" />
          </Link>
        </div>
      </div>

      {/* Mobile-only: full-width button */}
      <div className="d-md-none px-3 pb-3">
        <Link
          href={profileHref}
          className="ud-btn btn-light-thm w-100 text-center"
          style={{ border: "2px solid var(--primary-600)", borderRadius: 8 }}
        >
          {t("viewProfile")}
          <i className="fal fa-arrow-right-long" />
        </Link>
      </div>
    </div>
  );
}
