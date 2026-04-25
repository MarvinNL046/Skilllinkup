"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "announcementBar_dismissed_v1";

/**
 * Top-of-page pre-launch announcement strip on the SkillLinkup DS.
 * Single-line ellipsis on narrow viewports so the bar stays compact;
 * full multi-line wrap from md+. Dismissable, persists in localStorage.
 */
export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position: "relative",
        background: "var(--primary-600)",
        color: "var(--neutral-0)",
        fontSize: "var(--text-body-sm)",
        lineHeight: 1.4,
        padding: "8px 48px 8px 16px",
        textAlign: "center",
      }}
    >
      <span
        style={{
          display: "inline-block",
          maxWidth: "100%",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          verticalAlign: "middle",
        }}
        className="announcement-text"
      >
        🚀 <strong>SkillLinkup is in pre-launch.</strong> We&apos;re building
        the best platform for freelancers and clients — we can&apos;t wait
        to welcome you!
      </span>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Close announcement"
        style={{
          position: "absolute",
          right: 10,
          top: "50%",
          transform: "translateY(-50%)",
          width: 26,
          height: 26,
          display: "grid",
          placeItems: "center",
          background: "oklch(100% 0 0 / 0.15)",
          border: "none",
          borderRadius: "999px",
          color: "var(--neutral-0)",
          cursor: "pointer",
          opacity: 0.85,
          transition: "opacity 140ms",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
      >
        <X size={14} />
      </button>
    </div>
  );
}
