"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function CategoryPills() {
  const categories = useQuery(api.marketplace.categories.list, {
    locale: "en",
  });
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  // Haal slug op uit /online/services/[slug]
  const pathParts = pathname.split("/online/services/");
  const currentSlug = pathParts.length > 1 ? pathParts[1].split("/")[0] : "";
  const isAll = !currentSlug && !q;

  const pillStyle = (active) => ({
    padding: "6px 16px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 500,
    background: active ? "#ef2b70" : "#f4f4f5",
    color: active ? "#fff" : "#444",
    textDecoration: "none",
    whiteSpace: "nowrap",
    display: "inline-block",
  });

  return (
    <div style={{ marginBottom: 24 }}>
      {q && (
        <p style={{ fontSize: 14, color: "#555", marginBottom: 12 }}>
          Results for: <strong>&ldquo;{q}&rdquo;</strong>
        </p>
      )}
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          overflowX: "auto",
          paddingBottom: 4,
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
