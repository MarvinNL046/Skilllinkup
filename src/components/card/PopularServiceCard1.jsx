"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Star, ImageIcon } from "lucide-react";
import { isRealImage } from "@/lib/images";

/**
 * Service/gig card on the SkillLinkup Design System. Replaces the legacy
 * .listing-style1 template with .card and DS tokens. Falls back to a
 * gradient placeholder when no real image is available so we don't ship
 * "329×245" stock placeholders pre-launch.
 */
export default function PopularServiceCard1({
  data,
  style = "",
  isContentExpanded = false,
}) {
  const [favActive, setFavActive] = useState(false);
  const realImg = isRealImage(data?.img) ? data.img : null;
  const titleText = data?.title || "Service";
  const truncated = titleText.length > 60 ? titleText.slice(0, 60) + "…" : titleText;

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
        {realImg ? (
          <Image
            height={247}
            width={331}
            src={realImg}
            alt={titleText}
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
          }}
        >
          <Heart size={14} fill={favActive ? "currentColor" : "none"} />
        </button>
      </div>
      <div
        style={{
          padding: "var(--space-5)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-3)",
          flex: 1,
        }}
      >
        {data?.category && (
          <div
            className="overline"
            style={{ color: "var(--text-tertiary)" }}
          >
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
            href={`/service/${data?.slug || data?.id}`}
            style={{ color: "var(--text-primary)", textDecoration: "none" }}
          >
            {truncated}
          </Link>
        </h3>
        {(data?.rating || data?.review) && (
          <div
            className="rating"
            style={{ marginTop: -4 }}
          >
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
          }}
        >
          {data?.author && (
            <div
              style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)" }}
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
                style={{ color: "var(--text-secondary)", fontWeight: 500 }}
              >
                {data.author.name}
              </span>
            </div>
          )}
          {data?.price != null && (
            <div className="body-sm" style={{ color: "var(--text-tertiary)", textAlign: "right" }}>
              Starting at{" "}
              <strong style={{ color: "var(--text-primary)", fontSize: "var(--text-body-md)" }}>
                ${data.price}
              </strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
