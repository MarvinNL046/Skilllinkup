"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface Hero20Props {
  categories: { name: string; slug: string }[];
}

export default function Hero20({ categories }: Hero20Props) {
  const t = useTranslations("home20");
  const locale = useLocale();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState<string | null>(null);

  const popular = (t.raw("hero.popular") as string[]) ?? [];
  const locations = (t.raw("hero.locations") as string[]) ?? [];

  const locationLabel = useMemo(() => {
    if (location) return location;
    return locations[0] ?? t("hero.locationPlaceholder");
  }, [location, locations, t]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    router.push(`/${locale}/marketplace/gigs${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <section className="hero-home13 at-home20 overflow-hidden">
      <div className="home20-hero-imgs-left d-none d-lg-block">
        <Image width={94} height={94} src="/images/about/home20-hero-1.png" alt="" className="img-1 bounce-y" />
        <Image width={66} height={66} src="/images/about/home20-hero-2.png" alt="" className="img-2 bounce-y" />
        <Image width={68} height={67} src="/images/about/home20-hero-3.png" alt="" className="img-3 bounce-y" />
        <Image width={93} height={94} src="/images/about/home20-hero-4.png" alt="" className="img-4 bounce-y" />
      </div>
      <div className="home20-hero-imgs-right d-none d-lg-block">
        <Image width={65} height={66} src="/images/about/home20-hero-5.png" alt="" className="img-1 bounce-y" />
        <Image width={69} height={68} src="/images/about/home20-hero-6.png" alt="" className="img-2 bounce-y" />
        <Image width={94} height={94} src="/images/about/home20-hero-7.png" alt="" className="img-3 bounce-y" />
        <Image width={94} height={94} src="/images/about/home20-hero-8.png" alt="" className="img-4 bounce-y" />
      </div>
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-7">
            <div className="home20-hero-content text-center">
              <h1 className="animate-up-1 mb25 title">
                {t("hero.title")}
                <br className="d-none d-xl-block" />
                {t("hero.titleHighlight")}
              </h1>
              <p className="text mb30 animate-up-2">
                {t("hero.subtitle")}
              </p>
              <div className="advance-search-tab bgc-white bdr1-dark bdrs60 p10 bdrs4-sm banner-btn position-relative zi9 animate-up-3">
                <div className="row">
                  <div className="col-md-5 col-lg-6 col-xl-6">
                    <div className="advance-search-field mb10-sm bdrr1 bdrn-sm">
                      <form className="form-search position-relative" onSubmit={(e) => e.preventDefault()}>
                        <div className="box-search">
                          <span className="icon far fa-magnifying-glass" />
                          <input
                            className="form-control"
                            type="text"
                            name="search"
                            placeholder={t("hero.searchPlaceholder")}
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-4 col-xl-3">
                    <div className="bselect-style1">
                      <div className="dropdown bootstrap-select">
                        <button
                          type="button"
                          className="btn dropdown-toggle btn-light"
                          data-bs-toggle="dropdown"
                        >
                          <div className="filter-option">
                            <div className="filter-option-inner">
                              <div className="filter-option-inner-inner">
                                {locationLabel}
                              </div>
                            </div>
                          </div>
                        </button>
                        <div className="dropdown-menu">
                          <div className="inner show">
                            <ul className="dropdown-menu inner show">
                              {locations.map((item) => (
                                <li
                                  onClick={() => setLocation(item)}
                                  key={item}
                                  className="selected active"
                                >
                                  <a className={`dropdown-item ${location === item ? "active" : ""}`}>
                                    <span className="text">{item}</span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-lg-2 col-xl-3">
                    <div className="text-center text-xl-start">
                      <button
                        className="ud-btn btn-thm default-box-shadow2 bdrs60 bdrs4-sm w-100"
                        type="button"
                        onClick={handleSearch}
                      >
                        {t("hero.searchCta")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-block d-md-flex justify-content-center mt30 text-center animate-up-4">
                <p className="hero-text fz15 me-2 mb-0">{t("hero.popularLabel")}</p>
                {popular.length > 0
                  ? popular.map((item, index) => (
                      <Link
                        key={item}
                        className="text"
                        style={{ marginRight: "5px" }}
                        href={`/${locale}/marketplace/gigs?search=${encodeURIComponent(item)}`}
                      >
                        {`${item}${index !== popular.length - 1 ? "," : ""} `}
                      </Link>
                    ))
                  : categories.slice(0, 6).map((cat, index) => (
                      <Link
                        key={cat.slug}
                        className="text"
                        style={{ marginRight: "5px" }}
                        href={`/${locale}/marketplace/gigs?category=${cat.slug}`}
                      >
                        {`${cat.name}${index !== Math.min(categories.length, 6) - 1 ? "," : ""} `}
                      </Link>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
