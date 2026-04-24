"use client";

import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { browserCategory } from "@/data/project";
import BrowserCategoryCard1 from "../card/BrowserCategoryCard1";
import OurFaq1 from "./OurFaq1";

/**
 * /help landing section — DS hero with inline search (visual only,
 * there's no backend yet so the form intentionally doesn't submit),
 * a category grid of common help topics, and the shared FAQ accordion.
 */
export default function OurFaqSection1() {
  const t = useTranslations("help");

  return (
    <>
      <section
        style={{
          padding: "var(--space-16) 0 var(--space-12)",
          background:
            "linear-gradient(135deg, var(--primary-50) 0%, var(--secondary-50) 100%)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <span className="overline" style={{ color: "var(--primary-600)" }}>
              Help
            </span>
            <h1
              className="display-lg"
              style={{
                fontWeight: 500,
                margin: "var(--space-2) 0 var(--space-3)",
              }}
            >
              {t("heading")}
            </h1>
            <p
              className="body-lg"
              style={{ color: "var(--text-secondary)", marginBottom: "var(--space-6)" }}
            >
              {t("subtitle")}
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{
                display: "flex",
                gap: "var(--space-2)",
                maxWidth: 520,
                margin: "0 auto",
              }}
            >
              <div style={{ position: "relative", flex: 1 }}>
                <Search
                  size={16}
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-tertiary)",
                    pointerEvents: "none",
                  }}
                />
                <input
                  type="text"
                  className="input"
                  placeholder={t("searchPlaceholder")}
                  style={{ paddingLeft: 40, width: "100%" }}
                />
              </div>
              <button type="submit" className="btn btn--primary">
                <Search size={16} />
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {browserCategory.length > 0 && (
        <section style={{ padding: "var(--space-14) 0 var(--space-8)" }}>
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "var(--space-5)",
              }}
            >
              {browserCategory.slice(0, 8).map((item, i) => (
                <BrowserCategoryCard1 key={i} data={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <OurFaq1 />
    </>
  );
}
