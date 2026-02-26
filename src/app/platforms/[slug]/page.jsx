"use client";
import { use } from "react";
import DOMPurify from "dompurify";
import Link from "next/link";
import Image from "next/image";
import Header20 from "@/components/header/Header20";
import Footer14 from "@/components/footer/Footer14";
import useConvexPlatform from "@/hook/useConvexPlatform";

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
  const platform = useConvexPlatform(slug);

  // Loading
  if (platform === undefined) {
    return (
      <section className="pt60 pb90">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="body-color mt-3">Loading platform...</p>
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
            <h2 className="mb10">Platform not found</h2>
            <p className="body-color mb20">
              The platform you&apos;re looking for doesn&apos;t exist or has
              been removed.
            </p>
            <Link href="/platforms" className="ud-btn btn-thm">
              Browse Platforms
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
            Home
          </Link>
          <span className="body-color fz14 mx-1">/</span>
          <Link href="/platforms" className="body-color fz14">
            Platforms
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
                        Featured
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
                <h4 className="mb20">Pros & Cons</h4>
                <div className="row">
                  {pros && pros.length > 0 && (
                    <div className="col-md-6 mb20">
                      <h6 className="mb10" style={{ color: "#22c55e" }}>
                        <i className="fas fa-check-circle me-2" />
                        Pros
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
                        Cons
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
                <h4 className="mb20">Features</h4>
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
                  Visit {name}
                  <i className="fal fa-arrow-up-right-from-square ms-2" />
                </a>
              )}
              <Link
                href="/platforms"
                className="ud-btn btn-white2 w-100"
              >
                Compare Platforms
                <i className="fal fa-arrow-right-long ms-2" />
              </Link>
            </div>

            {/* Quick Info Card */}
            <div className="bgc-white default-box-shadow1 bdrs12 p30 mb30">
              <h5 className="mb20">Quick Info</h5>

              {category && (
                <div className="d-flex justify-content-between align-items-center mb15 pb15 bdrb1">
                  <span className="body-color fz14">Category</span>
                  <span className="dark-color fz14 fw500">{category}</span>
                </div>
              )}

              {fees && (
                <div className="d-flex justify-content-between align-items-center mb15 pb15 bdrb1">
                  <span className="body-color fz14">Fees</span>
                  <span className="dark-color fz14 fw500">{fees}</span>
                </div>
              )}

              {difficulty && (
                <div className="d-flex justify-content-between align-items-center mb15 pb15 bdrb1">
                  <span className="body-color fz14">Difficulty</span>
                  <DifficultyBadge difficulty={difficulty} />
                </div>
              )}

              {workType && (
                <div className="d-flex justify-content-between align-items-center mb15 pb15 bdrb1">
                  <span className="body-color fz14">Work Type</span>
                  <span className="dark-color fz14 fw500 text-capitalize">
                    {workType}
                  </span>
                </div>
              )}

              {countries && countries.length > 0 && (
                <div className="d-flex justify-content-between align-items-center mb15">
                  <span className="body-color fz14">Available In</span>
                  <span className="dark-color fz14 fw500">
                    {countries.includes("Worldwide")
                      ? "Worldwide"
                      : countries.join(", ")}
                  </span>
                </div>
              )}

              {rating != null && (
                <div className="d-flex justify-content-between align-items-center">
                  <span className="body-color fz14">Rating</span>
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

export default function PlatformDetailPage({ params }) {
  const { slug } = use(params);

  return (
    <>
      <Header20 />
      <PlatformDetailContent slug={slug} />
      <Footer14 />
    </>
  );
}
