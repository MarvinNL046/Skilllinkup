"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";

interface TrendingServiceItem {
  slug: string;
  title: string;
  description: string;
  images: string[];
  freelancer_name: string;
  freelancer_avatar: string | null;
  freelancer_verified: boolean;
  rating_average: number;
  rating_count: number;
  price_from: number;
  category_name: string;
  category_slug: string;
}

interface TrendingServicesProps {
  gigs: TrendingServiceItem[];
  categories: { name: string; slug: string }[];
}

const fallbackImages = [
  "/images/listings/ct-s-1.jpg",
  "/images/listings/ct-s-2.jpg",
  "/images/listings/ct-s-3.jpg",
  "/images/listings/ct-s-4.jpg",
];

export default function TrendingServices({ gigs, categories }: TrendingServicesProps) {
  const t = useTranslations("home20");
  const locale = useLocale();
  const [currentCategory, setCurrentCategory] = useState("all");

  const tabs = useMemo(
    () => [
      { label: t("trending.tabs.all"), slug: "all" },
      ...categories.slice(0, 5).map((c) => ({ label: c.name, slug: c.slug })),
    ],
    [categories, t]
  );

  const filtered = gigs.filter((gig) =>
    currentCategory === "all" ? true : gig.category_slug === currentCategory
  );

  return (
    <section className="pt-0 pb100">
      <div className="container">
        <div className="row align-items-center wow fadeInUp">
          <div className="col-xl-3">
            <div className="main-title mb30-lg">
              <h2 className="title">{t("trending.title")}</h2>
              <p className="paragraph">{t("trending.subtitle")}</p>
            </div>
          </div>
          <div className="col-xl-9">
            <div className="navpill-style2 at-home9 mb50-lg">
              <ul className="nav nav-pills mb20 justify-content-xl-end">
                {tabs.map((item) => (
                  <li key={item.slug} className="nav-item">
                    <button
                      onClick={() => setCurrentCategory(item.slug)}
                      className={`nav-link fw500 dark-color ${
                        currentCategory === item.slug ? "active" : ""
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          {filtered.slice(0, 4).map((gig, index) => {
            const image = gig.images?.[0] || fallbackImages[index % fallbackImages.length];
            return (
              <div key={gig.slug} className="col-sm-6 col-xl-3">
                <div className="listing-style1">
                  <div className="list-thumb">
                    <Image height={247} width={331} className="w-100" src={image} alt={gig.title} />
                  </div>
                  <div className="list-content">
                    <p className="list-text body-color fz14 mb-1">{gig.category_name}</p>
                    <h5 className="list-title">
                      <Link href={`/${locale}/marketplace/gigs/${gig.slug}`}>
                        {gig.title}
                      </Link>
                    </h5>
                    <div className="review-meta d-flex align-items-center">
                      <i className="fas fa-star fz10 review-color me-2" />
                      <p className="mb-0 body-color fz14">
                        <span className="dark-color me-2">
                          {gig.rating_average.toFixed(1)}
                        </span>
                        {gig.rating_count} {t("trending.reviewsLabel")}
                      </p>
                    </div>
                    <hr className="my-2" />
                    <div className="list-meta d-flex justify-content-between align-items-center mt15">
                      <span className="d-flex align-items-center">
                        <span className="position-relative mr10">
                          <Image
                            height={30}
                            width={30}
                            className="rounded-circle wa"
                            src={gig.freelancer_avatar || "/images/resource/user.png"}
                            alt={gig.freelancer_name}
                          />
                          {gig.freelancer_verified && <span className="online-badges" />}
                        </span>
                        <span className="fz14">{gig.freelancer_name}</span>
                      </span>
                      <div className="budget">
                        <p className="mb-0 body-color">
                          {t("trending.startingAt")}
                          <span className="fz17 fw500 dark-color ms-1">
                            €{gig.price_from}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
