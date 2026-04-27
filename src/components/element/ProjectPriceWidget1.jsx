"use client";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function ProjectPriceWidget1({
  budgetMin,
  budgetMax,
  currency,
  scrollToBid,
}) {
  const t = useTranslations("projectDetail");
  const cur = currency || "EUR";
  const budgetDisplay =
    budgetMin != null && budgetMax != null
      ? `${cur} ${budgetMin} - ${budgetMax}`
      : budgetMin != null
      ? `${cur} ${budgetMin}+`
      : t("budgetTBD");

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-2xl font-semibold mb-1">{budgetDisplay}</h3>
        <p className="text-sm text-[var(--text-secondary)] mb-4">{t("fixedPrice")}</p>
        <Button className="w-full" onClick={() => scrollToBid?.()}>
          {t("submitProposal")}
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
