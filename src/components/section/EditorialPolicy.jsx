"use client";

import { useTranslations } from "next-intl";

export default function EditorialPolicy() {
  const t = useTranslations("editorialPolicy");

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
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("section2li1")}</li>
              <li>{t("section2li2")}</li>
              <li>{t("section2li3")}</li>
              <li>{t("section2li4")}</li>
              <li>{t("section2li5")}</li>
            </ul>
          </div>

          {[3, 4, 5, 6].map((n) => (
            <div key={n}>
              <h4 className="text-xl font-bold mb-4">{t(`section${n}Title`)}</h4>
              <p className="mb-4">{t(`section${n}p1`)}</p>
              <p>{t(`section${n}p2`)}</p>
            </div>
          ))}

          <div>
            <h4 className="text-xl font-bold mb-4">{t("section7Title")}</h4>
            <p>
              {t("section7p1")} {emailLink}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
