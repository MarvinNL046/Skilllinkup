"use client";
import { Tooltip } from "react-tooltip";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Pencil, Trash2, UsersRound } from "lucide-react";

const STATUS_VARIANTS = {
  open: "success",
  closed: "muted",
  filled: "info",
};

export default function ManageJobCard({
  job,
  onEdit,
  onDelete,
  canViewPublic = true,
}) {
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
        {company && (
          <p className="text-sm text-[var(--text-secondary)]">{company}</p>
        )}
        <p className="text-xs text-[var(--text-tertiary)] mt-1">
          {categoryName}
        </p>
      </td>
      <td data-label={t("columnApplications")} className="align-top">
        <span className="text-base">{applicationCount}</span>
      </td>
      <td data-label={t("columnCreatedExpired")} className="align-top">
        <div className="text-sm">{formatDate(createdAt)}</div>
        <div className="text-xs text-[var(--text-tertiary)]">
          {expiresAt
            ? `${t("expiresPrefix")}${formatDate(expiresAt)}`
            : t("noExpiry")}
        </div>
      </td>
      <td data-label={t("columnStatus")} className="align-top">
        <Badge variant={statusVariant}>{statusLabel}</Badge>
      </td>
      <td data-label={t("columnAction")} className="align-top">
        <div className="flex flex-wrap items-center gap-2">
          {slug &&
            canViewPublic &&
            status === "open" &&
            (!expiresAt || expiresAt > Date.now()) && (
              <>
                <Button asChild variant="ghost" size="icon">
                  <Link
                    href={`/jobs/job/${slug}`}
                    id={tooltipViewId}
                    aria-label={t("viewJob")}
                  >
                    <FileText className="h-4 w-4" />
                  </Link>
                </Button>
                <Tooltip anchorSelect={`#${tooltipViewId}`} place="top">
                  {t("viewJob")}
                </Tooltip>
              </>
            )}
          <Button asChild variant="outline">
            <Link href={`/manage-jobs/${job._id}/applications`}>
              <UsersRound className="h-4 w-4" /> Hiring overview
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            id={tooltipEditId}
            onClick={() => onEdit?.(job)}
            aria-label={t("edit")}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Tooltip anchorSelect={`#${tooltipEditId}`} place="top">
            {t("edit")}
          </Tooltip>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            id={tooltipDeleteId}
            onClick={() => onDelete?.(job)}
            aria-label={t("delete")}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Tooltip anchorSelect={`#${tooltipDeleteId}`} place="top">
            {t("delete")}
          </Tooltip>
        </div>
      </td>
    </tr>
  );
}
