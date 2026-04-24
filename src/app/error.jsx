"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { AlertTriangle, RotateCw, Home } from "lucide-react";

export default function Error({ error, reset }) {
  const t = useTranslations("errorPages");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section
      style={{
        padding: "var(--space-16) 0",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "var(--bg)",
      }}
    >
      <div className="container">
        <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "999px",
              background: "var(--error-50, oklch(96% 0.03 25))",
              color: "var(--error-700, oklch(42% 0.18 25))",
              display: "grid",
              placeItems: "center",
              margin: "0 auto var(--space-6)",
            }}
          >
            <AlertTriangle size={36} />
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 7vw, 5rem)",
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              marginBottom: "var(--space-3)",
            }}
          >
            {t("oops").replace("!", "")}
            <span style={{ color: "var(--primary-600)" }}>!</span>
          </div>
          <h1
            className="display-lg"
            style={{ fontWeight: 500, marginBottom: "var(--space-3)" }}
          >
            {t("somethingWentWrong")}
          </h1>
          <p
            className="body-lg"
            style={{ color: "var(--text-secondary)", marginBottom: "var(--space-6)" }}
          >
            {t("errorDescription")}
          </p>
          <div
            style={{
              display: "flex",
              gap: "var(--space-3)",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button type="button" onClick={reset} className="btn btn--primary">
              <RotateCw size={16} />
              {t("tryAgain")}
            </button>
            <Link href="/" className="btn btn--secondary">
              <Home size={16} />
              {t("goHome")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
