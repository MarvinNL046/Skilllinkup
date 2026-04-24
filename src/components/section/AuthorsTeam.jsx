"use client";

import { useTranslations } from "next-intl";

/**
 * Long-form editorial-style page layout used by /authors and reused
 * for editorial/legal pages. Keeps narrow reading measure with DS type
 * scale + primary-colored inline links.
 */
export default function AuthorsTeam() {
  const t = useTranslations("authorsTeam");

  const emailLink = (
    <a
      href="mailto:info@skilllinkup.com"
      style={{ color: "var(--primary-600)", fontWeight: 500 }}
    >
      info@skilllinkup.com
    </a>
  );

  const h2 = {
    fontFamily: "var(--font-display)",
    fontSize: "var(--text-h3)",
    fontWeight: 500,
    letterSpacing: "-0.01em",
    marginBottom: "var(--space-4)",
    color: "var(--text-primary)",
  };

  const body = {
    color: "var(--text-secondary)",
    marginBottom: "var(--space-3)",
  };

  const bullets = {
    color: "var(--text-secondary)",
    paddingLeft: "var(--space-5)",
    marginBottom: "var(--space-4)",
    display: "grid",
    gap: "var(--space-2)",
  };

  return (
    <section style={{ padding: "var(--space-14) 0" }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <div style={{ marginBottom: "var(--space-10)" }}>
          <span className="overline" style={{ color: "var(--primary-600)" }}>
            Team
          </span>
          <h1
            className="display-lg"
            style={{
              fontWeight: 500,
              margin: "var(--space-2) 0 var(--space-3)",
            }}
          >
            {t("title")}
          </h1>
          <p className="body-lg" style={{ color: "var(--text-secondary)", margin: 0 }}>
            {t("subtitle")}
          </p>
        </div>

        <div style={{ display: "grid", gap: "var(--space-10)" }}>
          <section>
            <h2 style={h2}>{t("section1Title")}</h2>
            <p className="body-md" style={body}>{t("section1p1")}</p>
            <p className="body-md" style={body}>{t("section1p2")}</p>
          </section>

          <section>
            <h2 style={h2}>{t("section2Title")}</h2>
            <p className="body-md" style={body}>{t("section2p1")}</p>
            <ul className="body-md" style={bullets}>
              <li>{t("section2li1")}</li>
              <li>{t("section2li2")}</li>
              <li>{t("section2li3")}</li>
              <li>{t("section2li4")}</li>
            </ul>
          </section>

          <section>
            <h2 style={h2}>{t("section3Title")}</h2>
            <p className="body-md" style={body}>{t("section3p1")}</p>
            <ul className="body-md" style={bullets}>
              <li>{t("section3li1")}</li>
              <li>{t("section3li2")}</li>
              <li>{t("section3li3")}</li>
              <li>{t("section3li4")}</li>
            </ul>
          </section>

          <section>
            <h2 style={h2}>{t("section4Title")}</h2>
            <p className="body-md" style={body}>{t("section4p1")}</p>
            <p className="body-md" style={body}>{t("section4p2")}</p>
          </section>

          <section>
            <h2 style={h2}>{t("section5Title")}</h2>
            <p className="body-md" style={body}>
              {t("section5p1")} {emailLink}.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
