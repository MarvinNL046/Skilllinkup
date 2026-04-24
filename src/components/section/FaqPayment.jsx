import { getTranslations } from "next-intl/server";
import FaqAccordion from "@/components/ui/FaqAccordion";

export default async function FaqPayment() {
  const t = await getTranslations("faq");

  const items = [
    { id: "One",   q: t("pay1Q"), a: t("pay1A"), open: true },
    { id: "Two",   q: t("pay2Q"), a: t("pay2A") },
    { id: "Three", q: t("pay3Q"), a: t("pay3A") },
    { id: "Four",  q: t("pay4Q"), a: t("pay4A") },
    { id: "Five",  q: t("pay5Q"), a: t("pay5A") },
  ];

  return <FaqAccordion title={t("paymentsTitle")} items={items} />;
}
