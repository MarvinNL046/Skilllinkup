"use client";

import { useTranslations } from "next-intl";

export default function PrivacyPolicy() {
  const t = useTranslations("privacy");

  const emailLink = (
    <a href="mailto:info@skilllinkup.com" className="text-primary hover:underline">
      info@skilllinkup.com
    </a>
  );

  return (
    <section className="py-14">
      <div className="container">
        <div className="max-w-3xl">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{t("title")}</h2>
            <p className="text-sm text-[var(--text-secondary)]">{t("lastUpdated")}</p>
          </div>
        </div>
        <div className="max-w-4xl space-y-12 text-base text-foreground leading-relaxed">
          <div>
            <h4 className="text-xl font-bold mb-4">{t("section1Title")}</h4>
            <p className="mb-4">{t("section1p1")}</p>
            <p>
              {t("section1p2")} {emailLink}.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">{t("section2Title")}</h4>
            <p className="mb-4">
              <strong>{t("section2AccountTitle")}</strong> &mdash;{" "}
              {t("section2AccountText")}
            </p>
            <p className="mb-4">
              <strong>{t("section2ProfileTitle")}</strong> &mdash;{" "}
              {t("section2ProfileText")}
            </p>
            <p>
              <strong>{t("section2UsageTitle")}</strong> &mdash;{" "}
              {t("section2UsageText")}
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">{t("section3Title")}</h4>
            <p className="mb-4">{t("section3p1")}</p>
            <p>{t("section3p2")}</p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">{t("section4Title")}</h4>
            <p className="mb-4">
              <strong>{t("section4AuthTitle")}</strong> &mdash;{" "}
              {t("section4AuthText")}
            </p>
            <p>
              <strong>{t("section4AnalyticsTitle")}</strong> &mdash;{" "}
              {t("section4AnalyticsText")}
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">{t("section5Title")}</h4>
            <p className="mb-4">{t("section5p1")}</p>
            <p>{t("section5p2")}</p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">{t("section6Title")}</h4>
            <p className="mb-4">{t("section6Intro")}</p>
            <p className="mb-4">
              <strong>{t("section6ClerkTitle")}</strong> &mdash;{" "}
              {t("section6ClerkText")}
            </p>
            <p className="mb-4">
              <strong>{t("section6StripeTitle")}</strong> &mdash;{" "}
              {t("section6StripeText")}
            </p>
            <p className="mb-4">
              <strong>{t("section6PostHogTitle")}</strong> &mdash;{" "}
              {t("section6PostHogText")}
            </p>
            <p>
              <strong>{t("section6ConvexTitle")}</strong> &mdash;{" "}
              {t("section6ConvexText")}
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">{t("section7Title")}</h4>
            <p className="mb-4">{t("section7Intro")}</p>
            <p className="mb-4">
              <strong>{t("section7AccessTitle")}</strong> &mdash;{" "}
              {t("section7AccessText")}
            </p>
            <p className="mb-4">
              <strong>{t("section7RectificationTitle")}</strong> &mdash;{" "}
              {t("section7RectificationText")}
            </p>
            <p className="mb-4">
              <strong>{t("section7ErasureTitle")}</strong> &mdash;{" "}
              {t("section7ErasureText")}
            </p>
            <p className="mb-4">
              <strong>{t("section7PortabilityTitle")}</strong> &mdash;{" "}
              {t("section7PortabilityText")}
            </p>
            <p>
              <strong>{t("section7ObjectionTitle")}</strong> &mdash;{" "}
              {t("section7ObjectionText")} {emailLink}. {t("section7ResponseTime")}
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">{t("section8Title")}</h4>
            <p className="mb-4">{t("section8p1")}</p>
            <p>{t("section8p2")}</p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">{t("section9Title")}</h4>
            <p className="mb-4">{t("section9p1")}</p>
            <p>
              {t("section9p2")} {emailLink}.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">{t("section10Title")}</h4>
            <p>
              {t("section10Text")} {emailLink}.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">{t("section11Title")}</h4>
            <p>{t("section11Text")}</p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">{t("section12Title")}</h4>
            <p>
              {t("section12Text")} {emailLink}. {t("section12Suffix")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
