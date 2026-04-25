"use client";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import toggleStore from "@/store/toggleStore";
import listingStore from "@/store/listingStore";
import SortOption1 from "../option/SortOption1";

/**
 * Listing toolbar — count on the left, view-mode toggle + sort on the
 * right. Rebuilt on a flex row with gap (no Bootstrap row/col, no
 * absolute-positioned dropdowns) so the "Sort by" label can no longer
 * be overlapped by the dropdown button.
 */
export default function ListingOption2({
  itemLength,
  itemLabel = "services",
}) {
  const t = useTranslations("listing");
  const listingToggle = toggleStore((state) => state.listingToggleHandler);
  const viewMode = listingStore((state) => state.getViewMode);
  const setViewMode = listingStore((state) => state.setViewMode);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-4)",
        flexWrap: "wrap",
        marginBottom: "var(--space-5)",
      }}
    >
      <p
        className="body-sm"
        style={{ color: "var(--text-secondary)", margin: 0, flexShrink: 0 }}
      >
        <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>
          {itemLength}
        </strong>{" "}
        {itemLabel} {t("available")}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-3)",
          flexWrap: "wrap",
          marginLeft: "auto",
        }}
      >
        {/* Mobile filter button — d-lg-none stays */}
        <button
          type="button"
          onClick={listingToggle}
          className="btn btn--secondary btn--sm d-lg-none"
          aria-label={t("allFilter")}
        >
          <SlidersHorizontal size={14} />
          {t("allFilter")}
        </button>

        {/* Grid / List view toggle — md+ */}
        <div
          className="d-none d-md-inline-flex"
          role="group"
          aria-label={t("viewMode")}
          style={{
            padding: 3,
            background: "var(--surface-2)",
            borderRadius: "var(--radius-md)",
            gap: 2,
          }}
        >
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            aria-pressed={viewMode === "grid"}
            title={t("gridView")}
            style={iconBtn(viewMode === "grid")}
          >
            <LayoutGrid size={14} />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            aria-pressed={viewMode === "list"}
            title={t("listView")}
            style={iconBtn(viewMode === "list")}
          >
            <List size={14} />
          </button>
        </div>

        <SortOption1 />
      </div>
    </div>
  );
}

const iconBtn = (active) => ({
  width: 28,
  height: 28,
  display: "grid",
  placeItems: "center",
  border: "none",
  background: active ? "var(--bg-elevated)" : "transparent",
  color: active ? "var(--primary-700)" : "var(--text-secondary)",
  borderRadius: "var(--radius-sm)",
  cursor: "pointer",
  boxShadow: active ? "var(--shadow-1)" : "none",
  transition: "all 140ms var(--ease-standard, ease-out)",
});
