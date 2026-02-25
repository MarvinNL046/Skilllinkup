"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useState } from "react";

export interface ServiceCardData {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  image: string;
  rating: number;
  reviewCount: number;
  freelancerName: string;
  freelancerAvatar: string | null;
  priceFrom: number;
  locationCountry?: string | null;
}

export default function ServiceCard({ data }: { data: ServiceCardData }) {
  const locale = useLocale();
  const [fav, setFav] = useState(false);

  return (
    <div className="listing-style1">
      <div className="list-thumb">
        <Image
          height={190}
          width={255}
          className="w-100 h-100 object-fit-cover"
          src={data.image}
          alt={data.title}
        />
        <a
          onClick={() => setFav(!fav)}
          className={`listing-fav fz12 ${fav ? "ui-fav-active" : ""}`}
        >
          <span className="far fa-heart" />
        </a>
      </div>
      <div className="list-content">
        <p className="list-text body-color fz14 mb-1">{data.category}</p>
        <h5 className="list-title">
          <Link href={`/${locale}/services/${data.slug}`}>{data.title}</Link>
        </h5>
        <div className="review-meta d-flex align-items-center">
          <i className="fas fa-star fz10 review-color me-2" />
          <p className="mb-0 body-color fz14">
            <span className="dark-color me-2">{data.rating.toFixed(1)}</span>
            {data.reviewCount} reviews
          </p>
        </div>
        <hr className="my-2" />
        <div className="list-meta d-flex justify-content-between align-items-center mt15">
          <span className="d-flex align-items-center">
            <span className="position-relative mr10">
              <Image
                height={24}
                width={24}
                className="rounded-circle wa"
                src={data.freelancerAvatar || "/images/resource/user.png"}
                alt={data.freelancerName}
              />
              <span className="online-badges" />
            </span>
            <span className="fz14">{data.freelancerName}</span>
          </span>
          <div className="budget">
            <p className="mb-0 body-color">
              Starting at
              <span className="fz17 fw500 dark-color ms-1">€{data.priceFrom}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
