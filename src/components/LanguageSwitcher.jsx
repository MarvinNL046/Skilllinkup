"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, Globe2 } from "lucide-react";

const locales = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "pl", label: "Polski", flag: "🇵🇱" },
];

export default function LanguageSwitcher({ navbar = false }) {
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
          justifyContent: "center",
          gap: navbar ? 7 : 6,
          height: navbar ? 42 : undefined,
          padding: navbar ? "0 11px" : "6px 10px",
          border: "1px solid #e2e7ee",
          borderRadius: navbar ? 12 : 8,
          background: navbar ? "#fff" : "transparent",
          cursor: "pointer",
          fontSize: navbar ? 13 : 14,
          fontWeight: navbar ? 600 : 400,
          color: navbar ? "#10213f" : "inherit",
          transition: "border-color .2s ease, box-shadow .2s ease",
          fontFamily: navbar ? "var(--font-inter), system-ui, sans-serif" : undefined,
        }}
      >
        {navbar ? <Globe2 size={17} strokeWidth={1.9} /> : <span style={{ fontSize: "18px" }}>{current.flag}</span>}
        <span>{current.code.toUpperCase()}</span>
        <ChevronDown size={13} strokeWidth={2} style={{ opacity: 0.55, transform: open ? "rotate(180deg)" : "none", transition: "transform .2s ease" }} />
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
              {l.code === locale && <Check size={14} strokeWidth={2.2} style={{ marginLeft: "auto", color: "#ff4b2b" }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
