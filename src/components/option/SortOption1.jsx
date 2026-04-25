"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import listingStore from "@/store/listingStore";

const sortOptions = [
  { key: "bestSeller", value: "best-seller" },
  { key: "recommended", value: "recommended" },
  { key: "newArrivals", value: "new-arrivals" },
];

/**
 * "Sort by" dropdown for listing toolbars. DS-native — no bootstrap-select
 * runtime, no data-bs-toggle. Outside-click + ESC dismiss, animated
 * popover with shadow-3 panel. Replaces the legacy .pcs_dropdown
 * .bootstrap-select markup that was overlapping the "Sort by" label.
 */
export default function SortOption1() {
  const t = useTranslations("listing");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const getBestSeller = listingStore((state) => state.getBestSeller);
  const setBestSeller = listingStore((state) => state.setBestSeller);

  const selected =
    sortOptions.find((item) => item.value === getBestSeller) || sortOptions[0];

  useEffect(() => {
    if (!open) return;
    function onDoc(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        flexShrink: 0,
      }}
    >
      <span
        className="body-sm"
        style={{ color: "var(--text-secondary)", whiteSpace: "nowrap" }}
      >
        {t("sortBy")}:
      </span>
      <div ref={wrapperRef} style={{ position: "relative" }}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="listbox"
          className="btn btn--secondary btn--sm"
          style={{
            minWidth: 160,
            justifyContent: "space-between",
            fontWeight: 500,
          }}
        >
          {t(selected.key)}
          <ChevronDown
            size={14}
            style={{
              transition: "transform 160ms var(--ease-standard, ease-out)",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              flexShrink: 0,
            }}
          />
        </button>
        {open && (
          <ul
            role="listbox"
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              right: 0,
              minWidth: 200,
              padding: "var(--space-1)",
              listStyle: "none",
              margin: 0,
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-3)",
              zIndex: 60,
            }}
          >
            {sortOptions.map((item) => {
              const active = item.value === selected.value;
              return (
                <li key={item.value} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => {
                      setBestSeller(item.value);
                      setOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "var(--space-3)",
                      width: "100%",
                      padding: "var(--space-2) var(--space-3)",
                      borderRadius: "var(--radius-sm)",
                      background: active ? "var(--primary-50)" : "transparent",
                      color: active ? "var(--primary-700)" : "var(--text-primary)",
                      fontSize: "var(--text-body-sm)",
                      fontWeight: active ? 600 : 500,
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      textAlign: "left",
                    }}
                  >
                    <span>{t(item.key)}</span>
                    {active && <Check size={14} style={{ flexShrink: 0 }} />}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
