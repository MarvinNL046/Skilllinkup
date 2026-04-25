"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

function pathToServiceType(pathname) {
  if (pathname.startsWith("/local")) return "local";
  return "digital"; // /online/, /jobs/, default
}

/**
 * Category filter pills above the listing grid. DS tokens, primary-50
 * track + primary-600 active fill. Uses flex-wrap (no scrollbar) so the
 * row reflows on narrow viewports instead of forcing horizontal scroll.
 */
export default function CategoryPills() {
  const pathname = usePathname();
  const serviceType = pathToServiceType(pathname);
  const categories = useQuery(api.marketplace.categories.list, {
    locale: "en",
    serviceType,
  });
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const pathParts = pathname.split("/online/services/");
  const currentSlug = pathParts.length > 1 ? pathParts[1].split("/")[0] : "";
  const isAll = !currentSlug && !q;

  const pillStyle = (active) => ({
    padding: "6px 14px",
    borderRadius: 999,
    fontSize: "var(--text-body-sm)",
    fontWeight: active ? 600 : 500,
    background: active ? "var(--primary-600)" : "var(--surface-2)",
    color: active ? "var(--neutral-0)" : "var(--text-secondary)",
    border: active ? "1px solid var(--primary-600)" : "1px solid var(--border-subtle)",
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "background 140ms var(--ease-standard, ease-out)",
  });

  return (
    <div style={{ marginBottom: "var(--space-6)" }}>
      {q && (
        <p
          className="body-sm"
          style={{ color: "var(--text-secondary)", marginBottom: "var(--space-3)" }}
        >
          Results for: <strong style={{ color: "var(--text-primary)" }}>&ldquo;{q}&rdquo;</strong>
        </p>
      )}
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <Link href="/online/services" style={pillStyle(isAll)}>
          All
        </Link>
        {(categories || []).map((cat) => (
          <Link
            key={cat._id}
            href={`/online/services/${cat.slug}`}
            style={pillStyle(cat.slug === currentSlug)}
          >
            {cat.name || cat.slug}
          </Link>
        ))}
      </div>
    </div>
  );
}
