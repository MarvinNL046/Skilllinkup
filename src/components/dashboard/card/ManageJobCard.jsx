"use client";
import { Tooltip } from "react-tooltip";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { FileText, Pencil, Trash2 } from "lucide-react";

const STATUS_VARIANTS = {
  open: "success",
  closed: "muted",
  filled: "info",
};

export default function ManageJobCard({ job, onEdit, onDelete }) {
  const t = useTranslations("manageJobs");

  const title = job?.title ?? t("untitledJob");
  const company = job?.company ?? "";
  const status = job?.status ?? "open";
  const applicationCount = job?.applicationCount ?? 0;
  const categoryName = job?.categoryName ?? t("uncategorized");
  const slug = job?.slug ?? "";
  const createdAt = job?.createdAt;
  const expiresAt = job?.expiresAt;

  const STATUS_LABELS = {
    open: t("statusOpen"),
    closed: t("statusClosed"),
    filled: t("statusFilled"),
  };

  const statusLabel = STATUS_LABELS[status] ?? status;
  const statusVariant = STATUS_VARIANTS[status] ?? "muted";

  const formatDate = (ts) => {
    if (!ts) return "—";
    return new Date(ts).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const idSuffix = job?._id ?? Math.random();
  const tooltipViewId = `job-view-${idSuffix}`;
  const tooltipEditId = `job-edit-${idSuffix}`;
  const tooltipDeleteId = `job-delete-${idSuffix}`;

  return (
    <tr>
      <td data-label={t("columnTitle")} className="align-top">
        <h5 className="text-base font-semibold mb-1">{title}</h5>
        {company && <p className="text-sm text-[var(--text-secondary)]">{company}</p>}
        <p className="text-xs text-[var(--text-tertiary)] mt-1">{categoryName}</p>
      </td>
      <td data-label={t("columnApplications")} className="align-top">
        <span className="text-base">{applicationCount}</span>
      </td>
      <td data-label={t("columnCreatedExpired")} className="align-top">
        <div className="text-sm">{formatDate(createdAt)}</div>
        <div className="text-xs text-[var(--text-tertiary)]">
          {expiresAt ? `${t("expiresPrefix")}${formatDate(expiresAt)}` : t("noExpiry")}
        </div>
      </td>
      <td data-label={t("columnStatus")} className="align-top">
        <Badge variant={statusVariant}>{statusLabel}</Badge>
      </td>
      <td data-label={t("columnAction")} className="align-top">
        <div className="flex items-center gap-2">
          {slug && (
            <>
              <Link
                href={`/jobs/${slug}`}
                id={tooltipViewId}
                aria-label={t("viewJob")}
                className="text-[var(--text-tertiary)] hover:text-foreground"
              >
                <FileText className="h-4 w-4" />
              </Link>
              <Tooltip anchorSelect={`#${tooltipViewId}`} place="top">
                {t("viewJob")}
              </Tooltip>
            </>
          )}
          <button
            type="button"
            id={tooltipEditId}
            onClick={() => onEdit?.(job)}
            aria-label={t("edit")}
            className="text-[var(--text-tertiary)] hover:text-foreground"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <Tooltip anchorSelect={`#${tooltipEditId}`} place="top">
            {t("edit")}
          </Tooltip>
          <button
            type="button"
            id={tooltipDeleteId}
            onClick={() => onDelete?.(job)}
            aria-label={t("delete")}
            className="text-[var(--text-tertiary)] hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <Tooltip anchorSelect={`#${tooltipDeleteId}`} place="top">
            {t("delete")}
          </Tooltip>
        </div>
      </td>
    </tr>
  );
}
