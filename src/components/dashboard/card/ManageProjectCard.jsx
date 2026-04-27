"use client";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, FileText, Pencil, Trash2 } from "lucide-react";

const STATUS_VARIANTS = {
  open: "success",
  in_progress: "warning",
  completed: "info",
  cancelled: "destructive",
  closed: "muted",
};

export default function ManageProjectCard({ project, onEdit, onDelete }) {
  const t = useTranslations("manageProjects");

  const title = project?.title ?? t("untitledProject");
  const categoryName = project?.categoryName ?? t("uncategorized");
  const status = project?.status ?? "open";
  const bidCount = project?.bidCount ?? 0;
  const budgetMin = project?.budgetMin;
  const budgetMax = project?.budgetMax;
  const currency = project?.currency ?? "EUR";
  const workType = project?.workType ?? "remote";
  const createdAt = project?.createdAt;

  const STATUS_LABELS = {
    open: t("open"),
    in_progress: t("inProgress"),
    completed: t("completed"),
    cancelled: t("cancelled"),
    closed: t("closed"),
  };

  const statusLabel = STATUS_LABELS[status] ?? status;
  const statusVariant = STATUS_VARIANTS[status] ?? "muted";

  const budgetDisplay =
    budgetMin != null && budgetMax != null
      ? `${currency} ${budgetMin} - ${budgetMax}`
      : budgetMin != null
      ? `${currency} ${budgetMin}+`
      : t("budgetTBD");

  const timeAgo = createdAt
    ? (() => {
        const diff = Date.now() - createdAt;
        const hours = Math.floor(diff / 3600000);
        if (hours < 24) {
          return hours !== 1
            ? t("hoursAgoPlural", { count: hours || 1 })
            : t("hoursAgo", { count: 1 });
        }
        const days = Math.floor(diff / 86400000);
        return days !== 1
          ? t("daysAgoPlural", { count: days })
          : t("daysAgo", { count: 1 });
      })()
    : t("recently");

  const bidsText =
    bidCount !== 1
      ? t("bidsReceivedPlural", { count: bidCount })
      : t("bidsReceived", { count: bidCount });

  const idSuffix = project?._id ?? Math.random();
  const tooltipViewId = `view-${idSuffix}`;
  const tooltipEditId = `edit-${idSuffix}`;
  const tooltipDeleteId = `delete-${idSuffix}`;

  return (
    <tr data-testid="manage-project-row">
      <td data-label={t("columnTitle")} className="align-top">
        <h5 className="text-base font-semibold mb-2">{title}</h5>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--text-secondary)]">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {workType.charAt(0).toUpperCase() + workType.slice(1)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-primary" />
            {timeAgo}
          </span>
          <span className="inline-flex items-center gap-1 text-primary">
            <FileText className="h-3.5 w-3.5" />
            {bidsText}
          </span>
        </div>
      </td>
      <td data-label={t("columnCategory")} className="align-top">
        <span className="text-base">{categoryName}</span>
      </td>
      <td data-label={t("columnBudgetStatus")} className="align-top">
        <div className="space-y-1">
          <div className="text-sm">
            {budgetDisplay} / {t("fixed")}
          </div>
          <Badge variant={statusVariant}>{statusLabel}</Badge>
        </div>
      </td>
      <td data-label={t("columnActions")} className="align-top">
        <div className="flex items-center gap-2">
          {project?._id && (
            <>
              <Link
                href={`/projects/${project._id}`}
                id={tooltipViewId}
                aria-label={t("viewBids")}
                className="text-[var(--text-tertiary)] hover:text-foreground"
              >
                <FileText className="h-4 w-4" />
              </Link>
              <Tooltip anchorSelect={`#${tooltipViewId}`} place="top">
                {t("viewBids")}
              </Tooltip>
            </>
          )}
          <button
            type="button"
            id={tooltipEditId}
            onClick={() => onEdit?.(project)}
            data-testid="manage-project-edit"
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
            onClick={() => onDelete?.(project)}
            data-testid="manage-project-delete"
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
