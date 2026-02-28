"use client";
import Image from "next/image";
import Link from "next/link";

function StarRating({ rating }) {
  const clamped = Math.min(5, Math.max(0, rating ?? 0));
  const fullStars = Math.floor(clamped);
  const halfStar = clamped - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="d-flex align-items-center gap-1">
      {Array.from({ length: fullStars }).map((_, i) => (
        <i key={`full-${i}`} className="fas fa-star fz10 review-color" />
      ))}
      {halfStar && <i className="fas fa-star-half-alt fz10 review-color" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <i key={`empty-${i}`} className="far fa-star fz10 review-color" />
      ))}
    </div>
  );
}

function stripHtml(html) {
  if (!html) return "";
  let text = html.replace(/<[^>]*>/g, "");
  text = text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");
  return text.trim();
}

export default function PlatformCard({ data }) {
  const {
    name = "Unnamed Platform",
    slug,
    description,
    logoUrl,
    rating,
    fees,
    category,
    difficulty,
    featured,
  } = data;

  const plainDescription = stripHtml(description);
  const truncatedDescription =
    plainDescription && plainDescription.length > 100
      ? plainDescription.slice(0, 100) + "..."
      : plainDescription;

  return (
    <div className="listing-style1">
      <div className="list-content px20 pt20 pb20">
        {/* Header: logo + name */}
        <div className="d-flex align-items-center mb15">
          {logoUrl ? (
            <div
              className="position-relative me-3 flex-shrink-0"
              style={{ width: 48, height: 48, borderRadius: 8, overflow: "hidden", background: "#f5f5f5" }}
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
                width: 48,
                height: 48,
                borderRadius: 8,
                background: "#f0f0f0",
                fontSize: 22,
                color: "#999",
              }}
            >
              <i className="flaticon-web" />
            </div>
          )}
          <div className="flex-grow-1 min-w-0">
            <h5 className="list-title mb-0" style={{ fontSize: "1rem", lineHeight: 1.3 }}>
              {name}
              {featured && (
                <span
                  className="ms-2 badge"
                  style={{ fontSize: "0.65rem", background: "#ef2b70", color: "#fff", verticalAlign: "middle" }}
                >
                  Featured
                </span>
              )}
            </h5>
            {category && (
              <p className="body-color fz12 mb-0">{category}</p>
            )}
          </div>
        </div>

        {/* Rating */}
        {rating !== null && rating !== undefined && (
          <div className="review-meta d-flex align-items-center mb10">
            <StarRating rating={rating} />
            <span className="body-color fz13 ms-2">{rating.toFixed(1)}</span>
          </div>
        )}

        {/* Description */}
        {truncatedDescription && (
          <p className="body-color fz14 mb10" style={{ minHeight: 40 }}>
            {truncatedDescription}
          </p>
        )}

        <hr className="my-2" />

        {/* Footer: fees + difficulty + link */}
        <div className="d-flex justify-content-between align-items-center mt10">
          <div>
            {fees && (
              <span className="body-color fz13">
                <i className="far fa-money-bill-alt me-1" />
                {fees}
              </span>
            )}
            {difficulty && (
              <span className="body-color fz13 ms-2">
                <i className="far fa-signal me-1" />
                {difficulty}
              </span>
            )}
          </div>
          <Link
            href={slug ? `/platforms/${slug}` : "#"}
            className="ud-btn btn-thm2 bdrs4"
            style={{ fontSize: "0.8rem", padding: "6px 14px" }}
          >
            View Details
            <i className="fal fa-arrow-right-long ms-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
