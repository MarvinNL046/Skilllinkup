"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";

interface EmployeeCardProps {
  _id: string;
  name: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  locationCity: string | null;
  locationCountry: string | null;
  createdAt: number;
}

export function EmployeeCard({
  _id,
  name,
  avatar,
  bio,
  locationCity,
  locationCountry,
}: EmployeeCardProps) {
  const locale = useLocale();

  const displayName = name || "Unknown";
  const avatarSrc = avatar || "/images/resource/user.png";
  const locationText = [locationCity, locationCountry].filter(Boolean).join(", ");
  const profileUrl = `/${locale}/employees/${_id}`;

  return (
    <div className="freelancer-style1 bdrs12 bdr1 hover-box-shadow text-center">
      <div className="thumb w60 mb20 mx-auto position-relative rounded-circle">
        <Image
          height={60}
          width={60}
          className="rounded-circle mx-auto"
          src={avatarSrc}
          alt={displayName}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/resource/user.png";
          }}
        />
      </div>

      <div className="details">
        <h5 className="title mb-1">{displayName}</h5>

        {bio && (
          <p
            className="mb-2 fz14"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {bio}
          </p>
        )}

        {!bio && (
          <p className="mb-2 fz14 text-muted">Looking for great freelancers</p>
        )}

        {locationText && (
          <div className="fl-meta d-flex align-items-center justify-content-center mb10">
            <span className="fz14 fw400">
              <i className="fal fa-map-marker-alt mr5" />
              {locationText}
            </span>
          </div>
        )}

        <div className="d-grid mt15">
          <Link href={profileUrl} className="ud-btn btn-light-thm">
            View Profile
            <i className="fal fa-arrow-right-long" />
          </Link>
        </div>
      </div>
    </div>
  );
}
