"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useState } from "react";

export interface ProjectCardData {
  slug: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  clientName: string;
  clientAvatar: string | null;
  budgetMin: number | null;
  budgetMax: number | null;
  currency: string;
  bidCount: number;
  requiredSkills: string[];
  workType: string | null;
  locationCountry: string | null;
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
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months === 1 ? "" : "s"} ago`;
}

function formatBudget(
  budgetMin: number | null,
  budgetMax: number | null,
  currency: string
): string {
  const symbol = currency === "USD" ? "$" : currency === "GBP" ? "£" : "€";
  if (budgetMin !== null && budgetMax !== null) {
    return `${symbol}${budgetMin.toLocaleString()} - ${symbol}${budgetMax.toLocaleString()}`;
  }
  if (budgetMin !== null) return `From ${symbol}${budgetMin.toLocaleString()}`;
  if (budgetMax !== null) return `Up to ${symbol}${budgetMax.toLocaleString()}`;
  return "Budget TBD";
}

export default function ProjectCard({ data }: { data: ProjectCardData }) {
  const locale = useLocale();
  const [fav, setFav] = useState(false);

  const visibleSkills = data.requiredSkills.slice(0, 3);
  const extraSkills = data.requiredSkills.length - visibleSkills.length;

  return (
    <div className="freelancer-style1 bdrs12 bdr1 hover-box-shadow">
      <div className="d-flex align-items-center justify-content-between mb15">
        <div className="d-flex align-items-center">
          <Image
            height={24}
            width={24}
            className="rounded-circle wa mr10"
            src={data.clientAvatar || "/images/resource/user.png"}
            alt={data.clientName}
          />
          <span className="fz14 body-color">{data.clientName}</span>
        </div>
        <a
          onClick={() => setFav(!fav)}
          className={`listing-fav fz12 ${fav ? "ui-fav-active" : ""}`}
          style={{ cursor: "pointer" }}
        >
          <span className="far fa-heart" />
        </a>
      </div>

      <div className="d-flex align-items-center mb10 fz13 body-color flex-wrap" style={{ gap: "12px" }}>
        {data.locationCountry && (
          <span>
            <i className="fas fa-map-marker-alt me-1" />
            {data.locationCountry}
          </span>
        )}
        {data.workType && (
          <span className="text-capitalize">
            <i className="fas fa-briefcase me-1" />
            {data.workType}
          </span>
        )}
        <span>
          <i className="far fa-clock me-1" />
          {timeAgo(data.createdAt)}
        </span>
        <span>
          <i className="fas fa-gavel me-1" />
          {data.bidCount} bid{data.bidCount === 1 ? "" : "s"}
        </span>
      </div>

      <h5 className="list-title mb10">
        <Link href={`/${locale}/projects/${data.slug}`}>{data.title}</Link>
      </h5>

      <p
        className="fz14 body-color mb15"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {data.description}
      </p>

      {visibleSkills.length > 0 && (
        <div className="d-flex flex-wrap mb15" style={{ gap: "8px" }}>
          {visibleSkills.map((skill) => (
            <span key={skill} className="tag-badge bdrs4 fz12">
              {skill}
            </span>
          ))}
          {extraSkills > 0 && (
            <span className="tag-badge bdrs4 fz12">+{extraSkills} more</span>
          )}
        </div>
      )}

      <hr className="my-2" />

      <div className="d-flex justify-content-between align-items-center mt10">
        <p className="mb-0 fz13 body-color">{data.category}</p>
        <div className="budget">
          <p className="mb-0 body-color">
            <span className="fz17 fw500 dark-color">
              {formatBudget(data.budgetMin, data.budgetMax, data.currency)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
