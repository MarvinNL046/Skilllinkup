"use client";
import { useTranslations } from "next-intl";

export default function ProjectPriceWidget1({ budgetMin, budgetMax, currency, scrollToBid }) {
  const t = useTranslations("projectDetail");
  const cur = currency || "EUR";
  const budgetDisplay =
    budgetMin != null && budgetMax != null
      ? `${cur} ${budgetMin} - ${budgetMax}`
      : budgetMin != null
      ? `${cur} ${budgetMin}+`
      : t("budgetTBD");

  return (
    <>
      <div className="price-widget pt25 bdrs8">
        <h3 className="widget-title">{budgetDisplay}</h3>
        <p className="text fz14">{t("fixedPrice")}</p>
        <div className="grid">
          <button
            type="button"
            className="ud-btn btn-thm"
            onClick={() => scrollToBid?.()}
          >
            {t("submitProposal")}
            <i className="fal fa-arrow-right-long" />
          </button>
        </div>
      </div>
    </>
  );
}
