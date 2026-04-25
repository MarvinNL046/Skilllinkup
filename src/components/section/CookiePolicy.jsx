"use client";

import { useTranslations } from "next-intl";

export default function CookiePolicy() {
  const t = useTranslations("cookiePolicy");

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
            <div className="terms_condition_grid text-left">
              <div className="grids mb50">
                <h4 className="title mb15">{t("section1Title")}</h4>
                <p className="text fz15 mb15">{t("section1p1")}</p>
                <p className="text fz15">{t("section1p2")}</p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">{t("section2Title")}</h4>
                <p className="text fz15 mb15">
                  <strong>{t("section2EssentialTitle")}</strong> &mdash;{" "}
                  {t("section2EssentialText")}
                </p>
                <p className="text fz15 mb15">
                  <strong>{t("section2AnalyticsTitle")}</strong> &mdash;{" "}
                  {t("section2AnalyticsText")}
                </p>
                <p className="text fz15 mb15">
                  <strong>{t("section2PreferenceTitle")}</strong> &mdash;{" "}
                  {t("section2PreferenceText")}
                </p>
                <p className="text fz15">
                  <strong>{t("section2AdvertisingTitle")}</strong> &mdash;{" "}
                  {t("section2AdvertisingText")}
                </p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">{t("section3Title")}</h4>
                <p className="text fz15 mb15">{t("section3p1")}</p>
                <ul className="list-style-type-disc ml20">
                  <li className="text fz15 mb10">{t("section3li1")}</li>
                  <li className="text fz15 mb10">{t("section3li2")}</li>
                  <li className="text fz15 mb10">{t("section3li3")}</li>
                </ul>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">{t("section4Title")}</h4>
                <p className="text fz15 mb15">{t("section4p1")}</p>
                <p className="text fz15">{t("section4p2")}</p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">{t("section5Title")}</h4>
                <p className="text fz15 mb15">{t("section5p1")}</p>
                <p className="text fz15">{t("section5p2")}</p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">{t("section6Title")}</h4>
                <p className="text fz15 mb15">
                  {t("section6p1")} {emailLink}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
