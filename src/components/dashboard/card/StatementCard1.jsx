"use client";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

export default function StatementCard1({ data }) {
  const t = useTranslations("statements");

  return (
    <tr>
      <td data-label={t("columnDate")} className="align-middle">
        {data.date}
      </td>
      <td data-label={t("columnType")} className="align-middle">
        {data.type === 1 && <Badge variant="info">{t("servicePurchased")}</Badge>}
        {data.type === 2 && <Badge variant="warning">{t("walletTopup")}</Badge>}
      </td>
      <td data-label={t("columnDetail")} className="align-middle">
        {data.detail}
      </td>
      <td data-label={t("columnAmount")} className="align-middle">
        ${data.price}
      </td>
      <td data-label={t("columnStatus")} className="align-middle">
        ${data.amount}
      </td>
    </tr>
  );
}
