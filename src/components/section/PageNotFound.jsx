"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

/**
 * 404 page content on the SkillLinkup Design System.
 */
export default function PageNotFound() {
  const t = useTranslations("errorPages");

  return (
    <section
      style={{
        padding: "var(--space-16) 0",
        minHeight: "calc(100vh - 240px)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "var(--space-10)",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Image
              height={500}
              width={500}
              style={{ width: "100%", height: "auto", maxWidth: 440 }}
              src="/images/icon/error-page-img.svg"
              alt=""
            />
          </div>

          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(5rem, 10vw, 8rem)",
                fontWeight: 500,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                marginBottom: "var(--space-4)",
              }}
            >
              40<span style={{ color: "var(--primary-600)" }}>4</span>
            </div>
            <h1
              className="display-lg"
              style={{
                fontWeight: 500,
                marginBottom: "var(--space-3)",
              }}
            >
              {t("notFoundTitle")}
            </h1>
            <p
              className="body-lg"
              style={{ color: "var(--text-secondary)", marginBottom: "var(--space-6)" }}
            >
              {t("notFoundDescription")}
            </p>
            <Link href="/" className="btn btn--primary btn--lg">
              {t("goBackHome")}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
