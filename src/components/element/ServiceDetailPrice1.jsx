"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { Clock, RefreshCcw, Check, ArrowRight } from "lucide-react";

/**
 * Gig pricing widget in the service-detail sidebar. Rebuilt on the
 * SkillLinkup Design System — DS card, segmented control for tiers,
 * feature list with success-tinted checks, primary CTA with price echo.
 */
export default function ServiceDetailPrice1({ packages = [], gigId }) {
  const t = useTranslations("gigDetail");
  const [selectedTab, setSelectedTab] = useState(0);
  const router = useRouter();
  const { isSignedIn } = useUser();

  const hasPackages = packages && packages.length > 0;
  const displayPackages = packages;

  const activeIndex = Math.min(selectedTab, displayPackages.length - 1);
  const activePackage = displayPackages[activeIndex];

  const currencySymbol =
    activePackage?.currency === "USD"
      ? "$"
      : activePackage?.currency === "GBP"
      ? "£"
      : "€";

  function handleOrder() {
    if (!hasPackages) return;
    if (!isSignedIn) {
      const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "/";
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    router.push("/dashboard/orders");
  }

  if (!hasPackages) {
    return (
      <div
        className="card"
        style={{ padding: "var(--space-7)", marginBottom: "var(--space-6)" }}
      >
        <p
          className="body-sm"
          style={{ color: "var(--text-tertiary)", margin: 0 }}
        >
          {t("noPackages")}
        </p>
      </div>
    );
  }

  return (
    <div
      className="card"
      style={{
        padding: "var(--space-7)",
        marginBottom: "var(--space-6)",
      }}
    >
      {/* Segmented control: tier tabs */}
      <div
        role="tablist"
        style={{
          display: "flex",
          gap: 4,
          padding: 4,
          background: "var(--surface-2)",
          borderRadius: "var(--radius-md)",
          marginBottom: "var(--space-5)",
        }}
      >
        {displayPackages.map((pkg, i) => {
          const active = activeIndex === i;
          return (
            <button
              key={pkg._id || i}
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedTab(i)}
              style={{
                flex: 1,
                padding: "8px 12px",
                fontSize: "var(--text-body-sm)",
                fontWeight: 500,
                border: "none",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                background: active ? "var(--bg-elevated)" : "transparent",
                color: active ? "var(--text-primary)" : "var(--text-secondary)",
                boxShadow: active ? "var(--shadow-1)" : "none",
                textTransform: "capitalize",
                transition: "all 140ms var(--ease-standard, ease-out)",
              }}
            >
              {pkg.tier || pkg.title}
            </button>
          );
        })}
      </div>

      <div className="price" style={{ marginBottom: "var(--space-3)" }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-display-sm, 2.25rem)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          {currencySymbol}
          {activePackage?.price}
        </span>
      </div>
      {activePackage?.title && (
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h5)",
            fontWeight: 500,
            marginBottom: "var(--space-2)",
          }}
        >
          {activePackage.title}
        </div>
      )}
      {activePackage?.description && (
        <p
          className="body-sm"
          style={{ color: "var(--text-secondary)", marginBottom: "var(--space-5)" }}
        >
          {activePackage.description}
        </p>
      )}

      <div
        style={{
          display: "flex",
          gap: "var(--space-5)",
          paddingTop: "var(--space-4)",
          marginTop: "var(--space-4)",
          marginBottom: "var(--space-5)",
          borderTop: "1px solid var(--border-subtle)",
          flexWrap: "wrap",
          fontSize: "var(--text-body-sm)",
          color: "var(--text-secondary)",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Clock size={14} style={{ color: "var(--primary-600)" }} />
          <strong style={{ color: "var(--text-primary)" }}>
            {activePackage?.deliveryDays}
          </strong>
          {t("daysDelivery")}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <RefreshCcw size={14} style={{ color: "var(--primary-600)" }} />
          <strong style={{ color: "var(--text-primary)" }}>
            {activePackage?.revisionCount != null
              ? activePackage.revisionCount === 0
                ? t("unlimited")
                : activePackage.revisionCount
              : t("unlimited")}
          </strong>
          {t("revisions")}
        </span>
      </div>

      {activePackage?.features && activePackage.features.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "0 0 var(--space-5)",
            display: "grid",
            gap: "var(--space-3)",
          }}
        >
          {activePackage.features.map((feature, fi) => (
            <li
              key={fi}
              style={{
                display: "flex",
                gap: "var(--space-3)",
                alignItems: "flex-start",
                fontSize: "var(--text-body-sm)",
                color: "var(--text-primary)",
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "999px",
                  background: "var(--success-50)",
                  color: "var(--success-700)",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                <Check size={12} strokeWidth={3} />
              </span>
              {typeof feature === "string"
                ? feature
                : feature?.label || feature?.name || ""}
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        className="btn btn--primary btn--lg"
        onClick={handleOrder}
        disabled={!hasPackages}
        title={!hasPackages ? t("noPackagesTitle") : undefined}
        style={{ width: "100%", justifyContent: "center" }}
      >
        {t("continue")} ({currencySymbol}
        {activePackage?.price})
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
