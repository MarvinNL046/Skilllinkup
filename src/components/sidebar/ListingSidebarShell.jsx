"use client";
import ClearButton from "../button/ClearButton";

/**
 * Shared chrome for listing-page filter sidebars on the SkillLinkup
 * Design System. Wraps a stack of FilterGroup children inside a DS .card
 * and adds the "Clear filters" footer. Used by ListingSidebar1 / 5 / 6.
 */
export default function ListingSidebarShell({ children, hideClear = false }) {
  return (
    <div
      className="card d-none d-lg-block"
      style={{
        padding: "var(--space-5) var(--space-6)",
        position: "sticky",
        top: "calc(var(--space-3) + 60px)",
      }}
    >
      <div style={{ display: "grid", gap: 0 }}>{children}</div>
      {!hideClear && (
        <div style={{ paddingTop: "var(--space-4)" }}>
          <ClearButton />
        </div>
      )}
    </div>
  );
}
