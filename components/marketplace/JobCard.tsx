"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

export interface JobCardData {
  slug: string;
  title: string;
  company: string | null;
  companyLogo: string | null;
  category: string;
  categorySlug: string;
  locationCity: string | null;
  locationCountry: string | null;
  workType: string | null;
  jobType: string;
  salaryMin: number | null;
  salaryMax: number | null;
  currency: string;
  benefits: string[];
  requiredSkills: string[];
  createdAt: number;
}

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function formatSalary(min: number | null, max: number | null, currency: string): string {
  const symbol = currency === "USD" ? "$" : currency === "GBP" ? "£" : "€";
  if (min && max) return `${symbol}${min.toLocaleString()} - ${symbol}${max.toLocaleString()}`;
  if (min) return `From ${symbol}${min.toLocaleString()}`;
  if (max) return `Up to ${symbol}${max.toLocaleString()}`;
  return "Negotiable";
}

function formatJobType(type: string): string {
  const labels: Record<string, string> = {
    full_time: "Full Time",
    part_time: "Part Time",
    freelance: "Freelance",
    internship: "Internship",
  };
  return labels[type] ?? type;
}

const jobTypeBadgeClass: Record<string, string> = {
  full_time: "badge-success",
  part_time: "badge-info",
  freelance: "badge-warning",
  internship: "badge-secondary",
};

export default function JobCard({ data }: { data: JobCardData }) {
  const locale = useLocale();

  const location = [data.locationCity, data.locationCountry].filter(Boolean).join(", ") || "Remote";
  const badgeClass = jobTypeBadgeClass[data.jobType] ?? "badge-secondary";
  const visibleSkills = data.requiredSkills.slice(0, 4);
  const remaining = data.requiredSkills.length - 4;

  return (
    <div className="freelancer-style1 bdrs12 bdr1 hover-box-shadow">
      <div className="list-content">
        {/* Company logo + name */}
        <div className="d-flex align-items-center mb15">
          <div className="position-relative me-2 flex-shrink-0">
            <Image
              src={data.companyLogo || "/images/resource/user.png"}
              alt={data.company || "Company"}
              width={40}
              height={40}
              className="rounded-circle wa"
            />
          </div>
          <span className="fz14 fw500 dark-color">{data.company || "Company"}</span>
        </div>

        {/* Job title */}
        <h5 className="list-title">
          <Link href={`/${locale}/jobs/${data.slug}`}>{data.title}</Link>
        </h5>

        {/* Category */}
        <p className="list-text body-color fz14 mb-1">{data.category}</p>

        {/* Skills/benefits tags */}
        {visibleSkills.length > 0 && (
          <div className="skill-tags d-flex align-items-center flex-wrap gap-1 mb15">
            {visibleSkills.map((skill) => (
              <span key={skill} className="tag bdrs4 fz12">{skill}</span>
            ))}
            {remaining > 0 && (
              <span className="tag bdrs4 fz12 text-thm">+{remaining}</span>
            )}
          </div>
        )}

        <hr className="my-2" />

        {/* Bottom meta */}
        <div className="list-meta d-flex justify-content-between align-items-center mt10">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <span className="fz13 body-color">
              <i className="flaticon-place fz12 me-1" />
              {location}
            </span>
            <span className={`badge ${badgeClass} fz11`}>{formatJobType(data.jobType)}</span>
          </div>
          <div className="budget">
            <p className="mb-0 body-color">
              <span className="fz15 fw500 dark-color">
                {formatSalary(data.salaryMin, data.salaryMax, data.currency)}
              </span>
            </p>
          </div>
        </div>

        {/* Posted time */}
        <p className="fz12 body-color mt10 mb-0">
          <i className="flaticon-calendar fz11 me-1" />
          {timeAgo(data.createdAt)}
        </p>
      </div>
    </div>
  );
}
