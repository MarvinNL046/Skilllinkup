"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const locales = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = locales.find((l) => l.code === locale) || locales[0];

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(code) {
    document.cookie = `NEXT_LOCALE=${code};path=/;max-age=31536000;SameSite=Lax`;
    setOpen(false);
    router.refresh();
  }

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Switch language"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 10px",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          background: "transparent",
          cursor: "pointer",
          fontSize: "14px",
          color: "inherit",
        }}
      >
        <span style={{ fontSize: "18px" }}>{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.5 }}>
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            marginTop: "4px",
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            zIndex: 50,
            minWidth: "140px",
            overflow: "hidden",
          }}
        >
          {locales.map((l) => (
            <button
              key={l.code}
              onClick={() => switchLocale(l.code)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                padding: "8px 12px",
                border: "none",
                background: l.code === locale ? "#f1f5f9" : "transparent",
                cursor: "pointer",
                fontSize: "14px",
                color: "#1e1541",
                textAlign: "left",
              }}
            >
              <span style={{ fontSize: "18px" }}>{l.flag}</span>
              <span>{l.label}</span>
              {l.code === locale && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: "auto" }}>
                  <path d="M3 7L6 10L11 4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
