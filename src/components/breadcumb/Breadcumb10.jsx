"use client";

import { useState } from "react";
import { Share2, Bookmark, Check } from "lucide-react";

/**
 * Detail-page breadcrumb on the SkillLinkup Design System.
 * Matches the treatment used on Breadcumb1 (gradient-free subtle header
 * strip), sits under the main nav on freelancer + job detail pages.
 */
export default function Breadcumb10({ path }) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleShare() {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ url }).catch(() => {});
      return;
    }
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <section
      style={{
        borderBottom: "1px solid var(--border-subtle)",
        background: "var(--bg)",
        padding: "var(--space-6) 0",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          gap: "var(--space-4)",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <nav aria-label="Breadcrumb" style={{ minWidth: 0 }}>
          <ol
            style={{
              display: "flex",
              gap: "var(--space-2)",
              flexWrap: "wrap",
              alignItems: "center",
              listStyle: "none",
              padding: 0,
              margin: 0,
              fontSize: "var(--text-body-sm)",
              color: "var(--text-secondary)",
            }}
          >
            {path?.map((item, i) => (
              <li key={i} style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)" }}>
                {i > 0 && <span style={{ color: "var(--text-tertiary)" }}>/</span>}
                <span
                  style={
                    i === path.length - 1
                      ? { color: "var(--text-primary)", fontWeight: 500 }
                      : undefined
                  }
                >
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        <div style={{ display: "flex", gap: "var(--space-2)", flexShrink: 0 }}>
          <button
            type="button"
            onClick={handleShare}
            className="btn btn--ghost btn--sm"
            aria-label="Share"
          >
            {copied ? <Check size={15} /> : <Share2 size={15} />}
            <span className="hidden sm:inline">
              {copied ? "Copied" : "Share"}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setSaved((v) => !v)}
            className={`btn btn--sm ${saved ? "btn--primary" : "btn--ghost"}`}
            aria-pressed={saved}
            aria-label={saved ? "Saved" : "Save"}
          >
            <Bookmark size={15} fill={saved ? "currentColor" : "none"} />
            <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
