"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Shared collapsible filter section for listing sidebars. DS-native:
 * controlled React state (no Bootstrap data-bs-toggle, no .collapse
 * class — so no clash with Tailwind's .collapse utility).
 *
 * Usage:
 *   <FilterGroup label="Category" defaultOpen>
 *     <CategoryOption1 />
 *   </FilterGroup>
 */
export default function FilterGroup({ label, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      style={{
        borderBottom: "1px solid var(--border-subtle)",
        padding: "var(--space-4) 0",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: 0,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-h5)",
          fontWeight: 500,
          letterSpacing: "-0.01em",
          color: "var(--text-primary)",
          textAlign: "left",
        }}
      >
        {label}
        <ChevronDown
          size={16}
          style={{
            color: "var(--text-tertiary)",
            transition: "transform 160ms var(--ease-standard, ease-out)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
        />
      </button>
      {open && (
        <div style={{ paddingTop: "var(--space-3)" }}>{children}</div>
      )}
    </div>
  );
}
