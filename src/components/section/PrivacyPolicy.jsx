"use client";

import { useTranslations } from "next-intl";

export default function PrivacyPolicy() {
  const t = useTranslations("privacy");

  const emailLink = (
    <a href="mailto:info@skilllinkup.com" className="text-thm">
      info@skilllinkup.com
    </a>
  );

  return (
    <section className="our-terms pb90">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="main-title mb40">
              <h2>{t("title")}</h2>
              <p className="text">{t("lastUpdated")}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-10">
            <div className="terms_condition_grid text-start">
              <div className="grids mb50">
                <h4 className="title mb15">{t("section1Title")}</h4>
                <p className="text fz15 mb15">{t("section1p1")}</p>
                <p className="text fz15">
                  {t("section1p2")} {emailLink}.
                </p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">{t("section2Title")}</h4>
                <p className="text fz15 mb15">
                  <strong>{t("section2AccountTitle")}</strong> &mdash;{" "}
                  {t("section2AccountText")}
                </p>
                <p className="text fz15 mb15">
                  <strong>{t("section2ProfileTitle")}</strong> &mdash;{" "}
                  {t("section2ProfileText")}
                </p>
                <p className="text fz15">
                  <strong>{t("section2UsageTitle")}</strong> &mdash;{" "}
                  {t("section2UsageText")}
                </p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">{t("section3Title")}</h4>
                <p className="text fz15 mb15">{t("section3p1")}</p>
                <p className="text fz15">{t("section3p2")}</p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">{t("section4Title")}</h4>
                <p className="text fz15 mb15">
                  <strong>{t("section4AuthTitle")}</strong> &mdash;{" "}
                  {t("section4AuthText")}
                </p>
                <p className="text fz15">
                  <strong>{t("section4AnalyticsTitle")}</strong> &mdash;{" "}
                  {t("section4AnalyticsText")}
                </p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">{t("section5Title")}</h4>
                <p className="text fz15 mb15">{t("section5p1")}</p>
                <p className="text fz15">{t("section5p2")}</p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">{t("section6Title")}</h4>
                <p className="text fz15 mb15">{t("section6Intro")}</p>
                <p className="text fz15 mb15">
                  <strong>{t("section6ClerkTitle")}</strong> &mdash;{" "}
                  {t("section6ClerkText")}
                </p>
                <p className="text fz15 mb15">
                  <strong>{t("section6StripeTitle")}</strong> &mdash;{" "}
                  {t("section6StripeText")}
                </p>
                <p className="text fz15 mb15">
                  <strong>{t("section6PostHogTitle")}</strong> &mdash;{" "}
                  {t("section6PostHogText")}
                </p>
                <p className="text fz15">
                  <strong>{t("section6ConvexTitle")}</strong> &mdash;{" "}
                  {t("section6ConvexText")}
                </p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">{t("section7Title")}</h4>
                <p className="text fz15 mb15">{t("section7Intro")}</p>
                <p className="text fz15 mb15">
                  <strong>{t("section7AccessTitle")}</strong> &mdash;{" "}
                  {t("section7AccessText")}
                </p>
                <p className="text fz15 mb15">
                  <strong>{t("section7RectificationTitle")}</strong> &mdash;{" "}
                  {t("section7RectificationText")}
                </p>
                <p className="text fz15 mb15">
                  <strong>{t("section7ErasureTitle")}</strong> &mdash;{" "}
                  {t("section7ErasureText")}
                </p>
                <p className="text fz15 mb15">
                  <strong>{t("section7PortabilityTitle")}</strong> &mdash;{" "}
                  {t("section7PortabilityText")}
                </p>
                <p className="text fz15">
                  <strong>{t("section7ObjectionTitle")}</strong> &mdash;{" "}
                  {t("section7ObjectionText")}{" "}
                  {emailLink}. {t("section7ResponseTime")}
                </p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">{t("section8Title")}</h4>
                <p className="text fz15 mb15">{t("section8p1")}</p>
                <p className="text fz15">{t("section8p2")}</p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">{t("section9Title")}</h4>
                <p className="text fz15 mb15">{t("section9p1")}</p>
                <p className="text fz15">
                  {t("section9p2")}{" "}
                  {emailLink}.
                </p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">{t("section10Title")}</h4>
                <p className="text fz15">
                  {t("section10Text")}{" "}
                  {emailLink}.
                </p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">{t("section11Title")}</h4>
                <p className="text fz15">{t("section11Text")}</p>
              </div>

              <div className="grids">
                <h4 className="title mb15">{t("section12Title")}</h4>
                <p className="text fz15">
                  {t("section12Text")}{" "}
                  {emailLink}. {t("section12Suffix")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
