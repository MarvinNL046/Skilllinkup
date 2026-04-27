"use client";

import { useTranslations } from "next-intl";

const SECTIONS = [
  { n: 1, type: "two" },
  { n: 2, type: "two" },
  { n: 3, type: "two" },
  { n: 4, type: "two" },
  { n: 5, type: "two" },
  { n: 6, type: "one" },
  { n: 7, type: "two" },
  { n: 8, type: "one" },
  { n: 9, type: "one" },
  { n: 10, type: "email" },
];

export default function TermsCondition1() {
  const t = useTranslations("terms");

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
          {SECTIONS.map(({ n, type }) => (
            <div key={n}>
              <h4 className="text-xl font-bold mb-4">{t(`section${n}Title`)}</h4>
              {type === "two" && (
                <>
                  <p className="mb-4">{t(`section${n}p1`)}</p>
                  <p>{t(`section${n}p2`)}</p>
                </>
              )}
              {type === "one" && <p>{t(`section${n}Text`)}</p>}
              {type === "email" && (
                <p>
                  {t(`section${n}Text`)} {emailLink}.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
