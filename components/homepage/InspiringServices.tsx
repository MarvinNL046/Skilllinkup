"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

interface InspiringServicesProps {
  gigs: {
    slug: string;
    title: string;
    images: string[];
    freelancer_name: string;
    freelancer_avatar: string | null;
  }[];
}

const fallbackImages = [
  "/images/listings/ct-s-5.jpg",
  "/images/listings/ct-s-6.jpg",
  "/images/listings/ct-s-7.jpg",
  "/images/listings/ct-s-8.jpg",
];

export default function InspiringServices({ gigs }: InspiringServicesProps) {
  const t = useTranslations("home20");
  const locale = useLocale();

  return (
    <section className="pb90 pb20-md">
      <div className="container">
        <div className="row align-items-center wow fadeInUp" data-wow-delay="00ms">
          <div className="col-lg-9">
            <div className="main-title">
              <h2 className="title">{t("inspiringServices.title")}</h2>
              <p className="paragraph">{t("inspiringServices.subtitle")}</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-start text-lg-end mb-4 mb-lg-2">
              <Link className="ud-btn2" href={`/${locale}/marketplace/gigs`}>
                {t("inspiringServices.cta")}<i className="fal fa-arrow-right-long"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="row wow fadeInUp" data-wow-delay="300ms">
          {gigs.slice(0, 4).map((gig, index) => {
            const image = gig.images?.[0] || fallbackImages[index % fallbackImages.length];
            return (
              <div key={gig.slug} className="col-sm-6 col-xl-3">
                <div className="listing-style1 bdrs12 default-box-shadow1">
                  <div className="list-thumb">
                    <Image
                      width={330}
                      height={250}
                      style={{ height: "fit-content" }}
                      className="w-100"
                      src={image}
                      alt={gig.title}
                    />
                  </div>
                  <div className="list-content">
                    <div className="list-meta">
                      <Link className="d-flex align-items-center" href={`/${locale}/marketplace/gigs/${gig.slug}`}>
                        <span className="position-relative mr15">
                          <Image
                            width={60}
                            height={60}
                            className="rounded-circle"
                            src={gig.freelancer_avatar || "/images/resource/user.png"}
                            alt={gig.freelancer_name}
                          />
                        </span>
                        <span>
                          <h5 className="fz14 mb-1">{gig.title}</h5>
                          <p className="fz14 mb-0">{t("inspiringServices.by", { name: gig.freelancer_name })}</p>
                        </span>
                      </Link>
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
