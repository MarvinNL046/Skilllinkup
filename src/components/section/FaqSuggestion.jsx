import { getTranslations } from "next-intl/server";
import FaqAccordion from "@/components/ui/FaqAccordion";

export default async function FaqSuggestion() {
  const t = await getTranslations("faq");

  const items = [
    { id: "Six",   q: t("start1Q"), a: t("start1A"), open: true },
    { id: "Seven", q: t("start2Q"), a: t("start2A") },
    { id: "Eight", q: t("start3Q"), a: t("start3A") },
    { id: "Nine",  q: t("start4Q"), a: t("start4A") },
    { id: "Ten",   q: t("start5Q"), a: t("start5A") },
  ];

  return <FaqAccordion title={t("startTitle")} items={items} />;
}
