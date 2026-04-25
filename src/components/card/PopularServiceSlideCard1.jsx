"use client";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { Heart, Star, ImageIcon, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { isRealImage, pickRealImage } from "@/lib/images";

/**
 * Service/gig card with image carousel — DS sibling of PopularServiceCard1.
 * Filters template placeholders so we never render "329×245" stock images;
 * falls back to a primary→secondary gradient card when no real assets.
 */
export default function PopularServiceSlideCard1({ data }) {
  const [favActive, setFavActive] = useState(false);
  const realGallery = (data?.gallery || []).filter(isRealImage);
  const titleText = data?.title || "Service";
  const slug = data?.slug || data?.id;

  return (
    <div
      className="card"
      style={{
        padding: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div style={{ position: "relative", aspectRatio: "16 / 11" }}>
        {realGallery.length > 0 ? (
          <Swiper
            navigation={{
              prevEl: `.btn__prev__${slug}`,
              nextEl: `.btn__next__${slug}`,
            }}
            modules={[Navigation, Pagination]}
            loop={realGallery.length > 1}
            pagination={{ el: `.pagi__${slug}`, clickable: true }}
            style={{ width: "100%", height: "100%" }}
          >
            {realGallery.map((src, i) => (
              <SwiperSlide key={i}>
                <Image
                  height={247}
                  width={331}
                  src={src}
                  alt={titleText}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </SwiperSlide>
            ))}
            {realGallery.length > 1 && (
              <div
                style={{
                  position: "absolute",
                  bottom: 8,
                  left: 0,
                  right: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  zIndex: 5,
                }}
              >
                <button
                  type="button"
                  className={`btn__prev__${slug}`}
                  aria-label="Previous"
                  style={swiperBtn}
                >
                  <ChevronLeft size={14} />
                </button>
                <div className={`pagi__${slug}`} style={{ display: "flex", gap: 4 }} />
                <button
                  type="button"
                  className={`btn__next__${slug}`}
                  aria-label="Next"
                  style={swiperBtn}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </Swiper>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
              background:
                "linear-gradient(135deg, var(--primary-100) 0%, var(--secondary-100) 100%)",
              color: "var(--primary-700)",
            }}
          >
            <ImageIcon size={32} style={{ opacity: 0.7 }} />
          </div>
        )}

        <button
          type="button"
          onClick={() => setFavActive((v) => !v)}
          aria-label={favActive ? "Remove from saved" : "Save"}
          aria-pressed={favActive}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 32,
            height: 32,
            borderRadius: "999px",
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-subtle)",
            color: favActive ? "var(--primary-600)" : "var(--text-secondary)",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            boxShadow: "var(--shadow-1)",
            zIndex: 6,
          }}
        >
          <Heart size={14} fill={favActive ? "currentColor" : "none"} />
        </button>
      </div>

      <div
        style={{
          padding: "var(--space-6)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-3)",
          flex: 1,
        }}
      >
        {data?.category && (
          <div className="overline" style={{ color: "var(--text-tertiary)" }}>
            {data.category}
          </div>
        )}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h5)",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            margin: 0,
            lineHeight: 1.35,
          }}
        >
          <Link
            href={`/service/${slug}`}
            style={{ color: "var(--text-primary)", textDecoration: "none" }}
          >
            {titleText}
          </Link>
        </h3>
        {(data?.rating || data?.review) && (
          <div className="rating" style={{ marginTop: -4 }}>
            <span className="rating__star">
              <Star size={13} fill="currentColor" />
            </span>
            {data?.rating && <span className="rating__value">{data.rating}</span>}
            {data?.review && (
              <span className="rating__count">({data.review} reviews)</span>
            )}
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "var(--space-3)",
            marginTop: "auto",
            borderTop: "1px solid var(--border-subtle)",
            gap: "var(--space-3)",
          }}
        >
          {data?.author && (
            <div
              style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)", minWidth: 0 }}
            >
              <span className="avatar avatar--sm">
                {isRealImage(data.author.img) ? (
                  <Image
                    height={28}
                    width={28}
                    src={data.author.img}
                    alt={data.author.name || "Freelancer"}
                  />
                ) : (
                  <span>{(data.author.name || "U").slice(0, 1)}</span>
                )}
              </span>
              <span
                className="body-sm"
                style={{
                  color: "var(--text-secondary)",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {data.author.name}
              </span>
            </div>
          )}
          {data?.price != null && (
            <div className="body-sm" style={{ color: "var(--text-tertiary)", textAlign: "right", flexShrink: 0 }}>
              <div>
                Starting at{" "}
                <strong style={{ color: "var(--text-primary)", fontSize: "var(--text-body-md)" }}>
                  €{data.price}
                </strong>
              </div>
              {data?.deliveryTime && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    color: "var(--text-tertiary)",
                    fontSize: 12,
                    marginTop: 2,
                  }}
                >
                  <Clock size={11} />
                  {data.deliveryTime}d delivery
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const swiperBtn = {
  width: 24,
  height: 24,
  display: "grid",
  placeItems: "center",
  borderRadius: "999px",
  background: "oklch(100% 0 0 / 0.85)",
  border: "none",
  color: "var(--text-primary)",
  cursor: "pointer",
  boxShadow: "var(--shadow-1)",
};
