"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

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

  return (
    <div className="freelancer-style1 service-single mb-0">
      <div className="wrapper d-flex align-items-center">
        <div className="thumb position-relative mb25">
          <Image
            height={90}
            width={90}
            className="rounded-circle mx-auto"
            src={avatar}
            alt={`${name} photo`}
          />
          <span className="online" />
        </div>
        <div className="ml20">
          <h5 className="title mb-1">{name}</h5>
          {freelancer?.tagline && (
            <p className="mb-0">{freelancer.tagline}</p>
          )}
          {rating !== null && (
            <div className="review">
              <p>
                <i className="fas fa-star fz10 review-color pr10" />
                <span className="dark-color">{rating.toFixed(1)}</span>
                {reviewCount !== null && ` (${reviewCount} ${t("reviews")})`}
              </p>
            </div>
          )}
        </div>
      </div>
      <hr className="opacity-100" />
      <div className="details">
        <div className="fl-meta d-flex align-items-center justify-content-between">
          <a className="meta fw500 text-start">
            {t("location")}
            <br />
            <span className="fz14 fw400">{location}</span>
          </a>
          {hourlyRate !== null && (
            <a className="meta fw500 text-start">
              {t("rate")}
              <br />
              <span className="fz14 fw400">€{hourlyRate} / hr</span>
            </a>
          )}
          {jobSuccess !== null && (
            <a className="meta fw500 text-start">
              {t("jobSuccess")}
              <br />
              <span className="fz14 fw400">{jobSuccess}%</span>
            </a>
          )}
        </div>
      </div>
      <div className="d-grid mt30">
        <Link
          href={freelancerId ? `/freelancers/${freelancerId}` : "/freelancers"}
          className="ud-btn btn-thm-border"
        >
          {t("contactMe")}
          <i className="fal fa-arrow-right-long" />
        </Link>
      </div>
    </div>
  );
}
