"use client";

/**
 * Shared dashboard tablist with optional count badges. Replaces the
 * mishmash of orange-pill / parens-text / no-counter variants the
 * audit found across /manage-projects, /orders, /saved, /reviews.
 *
 * Usage:
 *   <DashboardTabs
 *     value={activeTab}
 *     onChange={setActiveTab}
 *     options={[
 *       { value: 0, label: "All",      count: total },
 *       { value: 1, label: "Open",     count: open },
 *       { value: 2, label: "Closed",   count: closed },
 *     ]}
 *   />
 *
 * Active tab gets primary-50 fill; counts always render in a neutral
 * pill that flips to primary-600 when active.
 */
export default function DashboardTabs({
  value,
  onChange,
  options = [],
  ariaLabel,
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--space-2)",
        padding: 4,
        background: "var(--surface-2)",
        borderRadius: "var(--radius-md)",
      }}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange?.(opt.value)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-2)",
              padding: "8px 14px",
              border: "none",
              borderRadius: "var(--radius-sm)",
              fontFamily: "inherit",
              fontSize: "var(--text-body-sm)",
              fontWeight: active ? 600 : 500,
              cursor: active ? "default" : "pointer",
              background: active ? "var(--bg-elevated)" : "transparent",
              color: active ? "var(--text-primary)" : "var(--text-secondary)",
              boxShadow: active ? "var(--shadow-1)" : "none",
              transition: "all 140ms var(--ease-standard, ease-out)",
            }}
          >
            <span>{opt.label}</span>
            {typeof opt.count === "number" && (
              <span
                aria-hidden="true"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 22,
                  height: 20,
                  padding: "0 6px",
                  borderRadius: 999,
                  background: active ? "var(--primary-600)" : "var(--surface-3)",
                  color: active ? "var(--neutral-0)" : "var(--text-secondary)",
                  fontSize: 11,
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                {opt.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
