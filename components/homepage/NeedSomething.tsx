"use client";

import { useTranslations } from "next-intl";

export default function NeedSomething() {
  const t = useTranslations("home20");

  return (
    <section className="our-features pb90 pb30-md pt60">
      <div className="container wow fadeInUp">
        <div className="row">
          <div className="col-lg-12">
            <div className="main-title">
              <h2>{t("needSomething.title")}</h2>
              <p className="text">{t("needSomething.subtitle")}</p>
            </div>
          </div>
        </div>
        <div className="row wow fadeInUp" data-wow-delay="300ms">
          {["post", "choose", "pay", "support"].map((key, index) => (
            <div key={key} className="col-sm-6 col-lg-3">
              <div className="iconbox-style1 border-less p-0">
                <div className="icon before-none">
                  <span className={t(`needSomething.items.${key}.icon`)} />
                </div>
                <div className="details">
                  <h4 className="title mt10 mb-3">{t(`needSomething.items.${key}.title`)}</h4>
                  <p className="text">{t(`needSomething.items.${key}.text`)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
