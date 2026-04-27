"use client";
import { Tooltip } from "react-tooltip";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const STATUS_VARIANTS = {
  1: "success",
  2: "info",
  3: "warning",
};

export default function InvoiceCard1({ data }) {
  const t = useTranslations("invoice");
  const statusVariant = STATUS_VARIANTS[data.status] ?? "muted";
  const id = `invoice-view-${data.invoiceId ?? Math.random()}`;

  return (
    <tr>
      <td data-label={t("columnInvoiceId")} className="align-middle">
        #{data.invoiceId} <span className="ms-3">{data.invoiceName}</span>
      </td>
      <td data-label={t("columnPurchaseDate")} className="align-middle">
        {data.purchaseDate}
      </td>
      <td data-label={t("columnAmount")} className="align-middle">
        ${(data?.amount ?? 0).toFixed(2)}
      </td>
      <td data-label={t("columnPaymentStatus")} className="align-middle">
        <Badge variant={statusVariant}>{t("inProgress")}</Badge>
      </td>
      <td className="align-middle">
        <button
          type="button"
          id={id}
          aria-label={t("view")}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          <ExternalLink className="h-4 w-4" />
          {t("view")}
        </button>
        <Tooltip anchorSelect={`#${id}`} clickable>
          {t("view")}
        </Tooltip>
      </td>
    </tr>
  );
}
