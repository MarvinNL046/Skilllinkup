"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useLocale, useTranslations } from "next-intl";

const iconPool = [
  "flaticon-web-design",
  "flaticon-illustration",
  "flaticon-mobile-app",
  "flaticon-marketing",
  "flaticon-microphone",
  "flaticon-video",
  "flaticon-writing",
  "flaticon-code",
];

interface BrowseCategoriesProps {
  categories: { name: string; slug: string; gig_count?: number }[];
}

export default function BrowseCategories({ categories }: BrowseCategoriesProps) {
  const t = useTranslations("home20");
  const locale = useLocale();

  return (
    <section className="pb190 pb130-md mx-auto maxw1700 bgc-thm4 bdrs24">
      <div className="container">
        <div className="row align-items-center wow fadeInUp">
          <div className="col-lg-9">
            <div className="main-title">
              <h2 className="title">{t("categories.title")}</h2>
              <p className="paragraph">{t("categories.subtitle")}</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-lg-end mb-3">
              <Link href={`/${locale}/marketplace/gigs`} className="ud-btn2">
                {t("categories.allCta")} <i className="fal fa-arrow-right-long"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="row position-relative">
          <div className="col-lg-12">
            <div className="ui-hightest-rated">
              <Swiper
                spaceBetween={30}
                navigation={{ prevEl: ".unique-13-pre", nextEl: ".unique-13-next" }}
                modules={[Navigation, Pagination]}
                className="mySwiper"
                loop
                breakpoints={{
                  0: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  992: { slidesPerView: 3 },
                  1200: { slidesPerView: 4 },
                }}
              >
                {categories.map((cat, index) => (
                  <SwiperSlide key={cat.slug}>
                    <div className="item">
                      <div className="iconbox-style1 bdrs12 default-box-shadow1">
                        <div className="icon">
                          <span className={iconPool[index % iconPool.length]}></span>
                        </div>
                        <div className="details mt20">
                          <p className="text mb5">
                            {cat.gig_count ?? 0} {t("categories.skillsLabel")}
                          </p>
                          <h4 className="title">
                            <Link href={`/${locale}/marketplace/gigs?category=${cat.slug}`}>
                              {cat.name}
                            </Link>
                          </h4>
                          <p className="mb-0">{t("categories.cardHint")}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <button
            type="button"
            style={{ left: "5px", top: "100%", transform: "scale(0.8)" }}
            className="prev-btn pre-slide3 unique-13-pre"
          >
            <i className="far fa-chevron-left" />
          </button>
          <button
            style={{ left: "70px", top: "100%", transform: "scale(0.8)" }}
            type="button"
            className="next-btn next-slide3 unique-13-next"
          >
            <i className="far fa-chevron-right" />
          </button>
        </div>
      </div>
    </section>
  );
}
