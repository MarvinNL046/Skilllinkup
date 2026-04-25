"use client";
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

/**
 * Gig gallery slider on the SkillLinkup Design System.
 *
 * - Uses `images` prop when the gig has real assets, otherwise renders
 *   a primary→secondary gradient placeholder so we don't show "839×548"
 *   stock placeholders on pre-launch.
 * - DS card wrapper with radius-2xl, no dark letterbox.
 * - Prev/Next buttons rebuilt on .btn .btn--secondary with lucide icons.
 */
/**
 * Filter out template/placeholder URLs so we render the DS gradient card
 * instead of "839×548" stock placeholders. The Uideck template seeded
 * these paths at install time; real gig uploads land under /uploads/
 * or external CDNs (cloudinary, convex storage).
 */
function isRealImage(src) {
  if (typeof src !== "string" || !src) return false;
  if (src.includes("/images/listings/service-details")) return false;
  if (src.includes("placeholder")) return false;
  return true;
}

export default function ServiceDetailSlider2({ images = [], title }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const realImages = Array.isArray(images) ? images.filter(isRealImage) : [];
  const hasImages = realImages.length > 0;
  const slides = hasImages ? realImages : [null];

  return (
    <div style={{ marginBottom: "var(--space-6)" }}>
      <div
        style={{
          position: "relative",
          borderRadius: "var(--radius-2xl)",
          overflow: "hidden",
          border: "1px solid var(--border-subtle)",
          background: "var(--bg-elevated)",
        }}
      >
        <Swiper
          loop={slides.length > 1}
          spaceBetween={10}
          navigation={{ prevEl: ".gig-prev", nextEl: ".gig-next" }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
          style={{ aspectRatio: "16 / 10" }}
        >
          {slides.map((src, i) => (
            <SwiperSlide key={i}>
              {src ? (
                <Image
                  height={554}
                  width={929}
                  src={src}
                  alt={title || "Gig image"}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
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
                  <div style={{ textAlign: "center", padding: "var(--space-6)" }}>
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: "var(--radius-lg)",
                        background: "var(--bg-elevated)",
                        boxShadow: "var(--shadow-2)",
                        display: "grid",
                        placeItems: "center",
                        margin: "0 auto var(--space-3)",
                      }}
                    >
                      <ImageIcon size={28} />
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-h5)",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {title || "Gig preview"}
                    </div>
                    <div
                      className="body-sm"
                      style={{
                        color: "var(--primary-700)",
                        opacity: 0.8,
                        marginTop: 4,
                      }}
                    >
                      Visuals coming soon
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {slides.length > 1 && (
          <>
            <button
              type="button"
              className="gig-prev btn btn--secondary btn--icon btn--sm"
              aria-label="Previous image"
              style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 5,
                background: "var(--bg-elevated)",
                boxShadow: "var(--shadow-2)",
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              className="gig-next btn btn--secondary btn--icon btn--sm"
              aria-label="Next image"
              style={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 5,
                background: "var(--bg-elevated)",
                boxShadow: "var(--shadow-2)",
              }}
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {hasImages && realImages.length > 1 && (
        <div style={{ marginTop: "var(--space-3)" }}>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper ui-service-gig-slder-bottom"
          >
            {realImages.map((src, i) => (
              <SwiperSlide key={i}>
                <Image
                  height={112}
                  width={150}
                  src={src}
                  alt={`Thumb ${i + 1}`}
                  style={{
                    width: "100%",
                    height: 84,
                    objectFit: "cover",
                    borderRadius: "var(--radius-md)",
                    cursor: "pointer",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
