"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, FileText } from "lucide-react";
import ContextMessageButton from "@/components/ui/ContextMessageButton";

const STATUS_VARIANTS = {
  pending: "warning",
  accepted: "success",
  rejected: "destructive",
};

export default function ProposalCard1({ data, bid }) {
  const t = useTranslations("proposals");
  const isConvexBid = !!bid;

  const title = isConvexBid ? bid.projectTitle : data?.title ?? t("untitledProject");
  const projectSlug = isConvexBid ? bid.projectSlug : null;
  const amount = isConvexBid ? bid.amount : null;
  const currency = isConvexBid ? bid.projectCurrency ?? "EUR" : null;
  const deliveryDays = isConvexBid ? bid.deliveryDays : null;
  const bidStatus = isConvexBid ? bid.status ?? "pending" : null;
  const createdAt = isConvexBid ? bid.createdAt : null;

  const legacyPriceMin = data?.price?.min;
  const legacyPriceMax = data?.price?.max;

  const STATUS_LABELS = {
    pending: t("statusPending"),
    accepted: t("statusAccepted"),
    rejected: t("statusRejected"),
  };
  const statusVariant = bidStatus ? STATUS_VARIANTS[bidStatus] ?? "muted" : null;
  const statusLabel = bidStatus ? STATUS_LABELS[bidStatus] ?? bidStatus : null;

  const submittedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "April 01, 2023";

  return (
    <tr>
      <td data-label={t("columnProject")} className="align-top">
        <h5 className="text-base font-semibold mb-2">
          {projectSlug ? (
            <Link href={`/en/projects/${projectSlug}`} className="hover:text-primary">
              {title}
            </Link>
          ) : (
            title
          )}
        </h5>
        {isConvexBid ? (
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--text-secondary)] mb-2">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              {t("submitted", { date: submittedDate })}
            </span>
            {deliveryDays && (
              <span className="inline-flex items-center gap-1">
                <FileText className="h-3.5 w-3.5 text-primary" />
                {deliveryDays !== 1
                  ? t("daysDelivery", { count: deliveryDays })
                  : t("dayDelivery")}
              </span>
            )}
          </div>
        ) : (
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--text-secondary)]">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              London, UK
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              April 01, 2023
            </span>
            <span className="inline-flex items-center gap-1">
              <FileText className="h-3.5 w-3.5 text-primary" />
              1 Received
            </span>
          </div>
        )}
        {statusLabel && <Badge variant={statusVariant}>{statusLabel}</Badge>}
      </td>
      <td data-label={t("columnBidAmount")} className="align-top">
        {isConvexBid ? (
          <h5 className="text-base font-semibold">
            {currency} {amount?.toFixed(2)}{" "}
            <span className="text-sm font-normal text-[var(--text-secondary)]">
              / {t("days", { count: deliveryDays })}
            </span>
          </h5>
        ) : (
          <h5 className="text-base font-semibold">
            ${legacyPriceMin} - ${legacyPriceMax}{" "}
            <span className="text-sm font-normal text-[var(--text-secondary)]">
              Hourly Rate
            </span>
          </h5>
        )}
      </td>
      <td data-label={t("columnAction")} className="align-top">
        {isConvexBid && ["pending", "accepted"].includes(bidStatus) ? (
          <ContextMessageButton
            context={{ type: "project_bid", bidId: bid._id }}
            label="Message client"
          />
        ) : null}
      </td>
    </tr>
  );
}
