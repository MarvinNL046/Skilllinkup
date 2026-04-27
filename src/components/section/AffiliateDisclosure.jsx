"use client";

import { useTranslations } from "next-intl";

export default function AffiliateDisclosure() {
  const t = useTranslations("affiliateDisclosure");

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
            <p>{t("section1p2")}</p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">{t("section2Title")}</h4>
            <p className="mb-4">{t("section2p1")}</p>
            <p>{t("section2p2")}</p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">{t("section3Title")}</h4>
            <p className="mb-4">{t("section3p1")}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("section3li1")}</li>
              <li>{t("section3li2")}</li>
              <li>{t("section3li3")}</li>
              <li>{t("section3li4")}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">{t("section4Title")}</h4>
            <p className="mb-4">{t("section4p1")}</p>
            <p>{t("section4p2")}</p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">{t("section5Title")}</h4>
            <p className="mb-4">{t("section5p1")}</p>
            <p>{t("section5p2")}</p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">{t("section6Title")}</h4>
            <p>
              {t("section6p1")} {emailLink}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
