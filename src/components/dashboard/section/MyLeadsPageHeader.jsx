"use client";
import { useTranslations } from "next-intl";

export default function MyLeadsPageHeader() {
  const t = useTranslations("myLeads");

  return (
    <div className="dashboard_title_area">
      <h2>{t("title")}</h2>
      <p className="text">{t("pageDescription")}</p>
    </div>
  );
}
