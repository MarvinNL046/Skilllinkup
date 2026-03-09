"use client";
import DOMPurify from "dompurify";
import Link from "next/link";
import Image from "next/image";
import Header20 from "@/components/header/Header20";
import Footer14 from "@/components/footer/Footer14";
import useConvexPlatform from "@/hook/useConvexPlatform";
import { useTranslations } from "next-intl";

function StarRating({ rating }) {
  const clamped = Math.min(5, Math.max(0, rating ?? 0));
  const fullStars = Math.floor(clamped);
  const halfStar = clamped - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="d-flex align-items-center gap-1">
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={`full-${i}`} className="fas fa-star fz14 review-color" />
      ))}
      {halfStar && <span className="fas fa-star-half-alt fz14 review-color" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={`empty-${i}`} className="far fa-star fz14 review-color" />
      ))}
    </div>
  );
}

function DifficultyBadge({ difficulty }) {
  const colors = {
    Easy: { bg: "#dcfce7", text: "#166534" },
    Medium: { bg: "#fef3c7", text: "#92400e" },
    Hard: { bg: "#fce7f3", text: "#9d174d" },
  };
  const style = colors[difficulty] || colors.Medium;

  return (
    <span
      className="badge"
      style={{
        background: style.bg,
        color: style.text,
        fontSize: "0.85rem",
        fontWeight: 500,
        padding: "6px 14px",
      }}
    >
      {difficulty}
    </span>
  );
}

function PlatformDetailContent({ slug }) {
  const tc = useTranslations("common");
  const t = useTranslations("platformDetail");
  const platform = useConvexPlatform(slug);

  // Loading
  if (platform === undefined) {
    return (
      <section className="pt60 pb90">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">{tc("loading")}</span>
            </div>
            <p className="body-color mt-3">{tc("loading")}</p>
          </div>
        </div>
      </section>
    );
  }

  // Not found
  if (platform === null) {
    return (
      <section className="pt60 pb90">
        <div className="container">
          <div className="text-center py-5">
            <h2 className="mb10">{t("notFound")}</h2>
            <p className="body-color mb20">
              {t("notFoundDescription")}
            </p>
            <Link href="/platforms" className="ud-btn btn-thm">
              {t("browsePlatforms")}
              <i className="fal fa-arrow-right-long ms-2" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const {
    name,
    description,
    logoUrl,
    websiteUrl,
    rating,
    category,
    fees,
    difficulty,
    featured,
    pros,
    cons,
    features,
    workType,
    countries,
    affiliateLink,
  } = platform;

  const visitUrl = affiliateLink || websiteUrl;

  return (
    <section className="pt30 pb90">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb20">
          <Link href="/" className="body-color fz14">
            {t("home")}
          </Link>
          <span className="body-color fz14 mx-1">/</span>
          <Link href="/platforms" className="body-color fz14">
            {t("platforms")}
          </Link>
          <span className="body-color fz14 mx-1">/</span>
          <span className="dark-color fz14 fw500">{name}</span>
        </nav>

        <div className="row">
          {/* Main Content */}
          <div className="col-lg-8">
            {/* Header Card */}
            <div className="bgc-white default-box-shadow1 bdrs12 p30 mb30">
              <div className="d-flex align-items-center mb20">
                {logoUrl ? (
                  <div
                    className="position-relative me-3 flex-shrink-0"
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 12,
                      overflow: "hidden",
                      background: "#f5f5f5",
                    }}
                  >
                    <Image
                      src={logoUrl}
                      alt={`${name} logo`}
                      fill
                      className="object-fit-contain"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div
                    className="me-3 flex-shrink-0 d-flex align-items-center justify-content-center"
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 12,
                      background: "#f0f0f0",
                      fontSize: 28,
                      color: "#999",
                    }}
                  >
                    <i className="flaticon-web" />
                  </div>
                )}
                <div>
                  <h1
                    className="mb5"
                    style={{ fontSize: "1.75rem", lineHeight: 1.3 }}
                  >
                    {name}
                    {featured && (
                      <span
                        className="ms-2 badge"
                        style={{
                          fontSize: "0.7rem",
                          background: "#ef2b70",
                          color: "#fff",
                          verticalAlign: "middle",
                        }}
                      >
                        {t("featured")}
                      </span>
                    )}
                  </h1>
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    {category && (
                      <span className="body-color fz14">{category}</span>
                    )}
                    {rating != null && (
                      <>
                        <span className="body-color">|</span>
                        <StarRating rating={rating} />
                        <span className="dark-color fw500 fz14">
                          {rating.toFixed(1)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              {description && (
                <div
                  className="fz15 body-color lh-lg"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
                />
              )}
            </div>

            {/* Pros & Cons */}
            {((pros && pros.length > 0) || (cons && cons.length > 0)) && (
              <div className="bgc-white default-box-shadow1 bdrs12 p30 mb30">
                <h4 className="mb20">{t("prosAndCons")}</h4>
                <div className="row">
                  {pros && pros.length > 0 && (
                    <div className="col-md-6 mb20">
                      <h6 className="mb10" style={{ color: "#22c55e" }}>
                        <i className="fas fa-check-circle me-2" />
                        {t("pros")}
                      </h6>
                      <ul className="list-unstyled">
                        {pros.map((pro, i) => (
                          <li
                            key={i}
                            className="fz14 body-color mb-2 d-flex align-items-start"
                          >
                            <i
                              className="fas fa-plus fz10 me-2 mt-1"
                              style={{ color: "#22c55e" }}
                            />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {cons && cons.length > 0 && (
                    <div className="col-md-6 mb20">
                      <h6 className="mb10" style={{ color: "#ef4444" }}>
                        <i className="fas fa-times-circle me-2" />
                        {t("cons")}
                      </h6>
                      <ul className="list-unstyled">
                        {cons.map((con, i) => (
                          <li
                            key={i}
                            className="fz14 body-color mb-2 d-flex align-items-start"
                          >
                            <i
                              className="fas fa-minus fz10 me-2 mt-1"
                              style={{ color: "#ef4444" }}
                            />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Features */}
            {features && features.length > 0 && (
              <div className="bgc-white default-box-shadow1 bdrs12 p30 mb30">
                <h4 className="mb20">{t("features")}</h4>
                <div className="row">
                  {features.map((feature, i) => (
                    <div key={i} className="col-md-6 mb10">
                      <span className="fz14 body-color d-flex align-items-start">
                        <i
                          className="far fa-check me-2 mt-1"
                          style={{ color: "#22c55e" }}
                        />
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            {/* CTA Card */}
            <div className="bgc-white default-box-shadow1 bdrs12 p30 mb30">
              {visitUrl && (
                <a
                  href={visitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ud-btn btn-thm w-100 mb15"
                >
                  {t("visit", { name })}
                  <i className="fal fa-arrow-up-right-from-square ms-2" />
                </a>
              )}
              <Link
                href="/platforms"
                className="ud-btn btn-white2 w-100"
              >
                {t("comparePlatforms")}
                <i className="fal fa-arrow-right-long ms-2" />
              </Link>
            </div>

            {/* Quick Info Card */}
            <div className="bgc-white default-box-shadow1 bdrs12 p30 mb30">
              <h5 className="mb20">{t("quickInfo")}</h5>

              {category && (
                <div className="d-flex justify-content-between align-items-center mb15 pb15 bdrb1">
                  <span className="body-color fz14">{t("category")}</span>
                  <span className="dark-color fz14 fw500">{category}</span>
                </div>
              )}

              {fees && (
                <div className="d-flex justify-content-between align-items-center mb15 pb15 bdrb1">
                  <span className="body-color fz14">{t("fees")}</span>
                  <span className="dark-color fz14 fw500">{fees}</span>
                </div>
              )}

              {difficulty && (
                <div className="d-flex justify-content-between align-items-center mb15 pb15 bdrb1">
                  <span className="body-color fz14">{t("difficulty")}</span>
                  <DifficultyBadge difficulty={difficulty} />
                </div>
              )}

              {workType && (
                <div className="d-flex justify-content-between align-items-center mb15 pb15 bdrb1">
                  <span className="body-color fz14">{t("workType")}</span>
                  <span className="dark-color fz14 fw500 text-capitalize">
                    {workType}
                  </span>
                </div>
              )}

              {countries && countries.length > 0 && (
                <div className="d-flex justify-content-between align-items-center mb15">
                  <span className="body-color fz14">{t("availableIn")}</span>
                  <span className="dark-color fz14 fw500">
                    {countries.includes("Worldwide")
                      ? t("worldwide")
                      : countries.join(", ")}
                  </span>
                </div>
              )}

              {rating != null && (
                <div className="d-flex justify-content-between align-items-center">
                  <span className="body-color fz14">{t("rating")}</span>
                  <div className="d-flex align-items-center gap-2">
                    <StarRating rating={rating} />
                    <span className="dark-color fw500">
                      {rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PlatformPageClient({ slug }) {
  return (
    <>
      <Header20 />
      <PlatformDetailContent slug={slug} />
      <Footer14 />
    </>
  );
}
