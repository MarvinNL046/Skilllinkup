"use client";

import { useTranslations } from "next-intl";

export default function EditorialPolicy() {
  const t = useTranslations("editorialPolicy");

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
                <p className="text fz15">{t("section1p2")}</p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">{t("section2Title")}</h4>
                <p className="text fz15 mb15">{t("section2p1")}</p>
                <ul className="list-style-type-disc ml20">
                  <li className="text fz15 mb10">{t("section2li1")}</li>
                  <li className="text fz15 mb10">{t("section2li2")}</li>
                  <li className="text fz15 mb10">{t("section2li3")}</li>
                  <li className="text fz15 mb10">{t("section2li4")}</li>
                  <li className="text fz15 mb10">{t("section2li5")}</li>
                </ul>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">{t("section3Title")}</h4>
                <p className="text fz15 mb15">{t("section3p1")}</p>
                <p className="text fz15">{t("section3p2")}</p>
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
                <p className="text fz15 mb15">{t("section6p1")}</p>
                <p className="text fz15">{t("section6p2")}</p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">{t("section7Title")}</h4>
                <p className="text fz15 mb15">
                  {t("section7p1")} {emailLink}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
