"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { UserSearch, ArrowRight } from "lucide-react";

export default function FreelancerNotFound() {
  const t = useTranslations("errorPages");

  return (
    <section
      style={{
        padding: "var(--space-16) 0",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        background: "var(--bg)",
      }}
    >
      <div className="container">
        <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "999px",
              background: "var(--primary-50)",
              color: "var(--primary-600)",
              display: "grid",
              placeItems: "center",
              margin: "0 auto var(--space-5)",
            }}
          >
            <UserSearch size={32} />
          </div>
          <h1
            className="display-lg"
            style={{ fontWeight: 500, marginBottom: "var(--space-3)" }}
          >
            {t("freelancerNotFound")}
          </h1>
          <p
            className="body-lg"
            style={{ color: "var(--text-secondary)", marginBottom: "var(--space-6)" }}
          >
            {t("freelancerNotFoundDescription")}
          </p>
          <Link href="/online/freelancers" className="btn btn--primary">
            {t("browseFreelancers")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
