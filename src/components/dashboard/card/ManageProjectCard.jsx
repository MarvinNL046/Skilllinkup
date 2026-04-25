"use client";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import { useTranslations } from "next-intl";

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
    open: { label: t("open"), className: "text-success" },
    in_progress: { label: t("inProgress"), className: "text-warning" },
    completed: { label: t("completed"), className: "text-primary" },
    cancelled: { label: t("cancelled"), className: "text-danger" },
    closed: { label: t("closed"), className: "text-secondary" },
  };

  const statusInfo = STATUS_LABELS[status] ?? { label: status, className: "text-secondary" };

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

  const bidsText = bidCount !== 1
    ? t("bidsReceivedPlural", { count: bidCount })
    : t("bidsReceived", { count: bidCount });

  const tooltipViewId = `view-${project?._id ?? Math.random()}`;
  const tooltipEditId = `edit-${project?._id ?? Math.random()}`;
  const tooltipDeleteId = `delete-${project?._id ?? Math.random()}`;

  return (
    <tr data-testid="manage-project-row">
      <th scope="row">
        <div className="freelancer-style1 box-shadow-none row m-0 p-0 lg:items-end">
          <div className="lg:flex px-0">
            <div className="details mb15-md-md">
              <h5 className="title mb10">{title}</h5>
              <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
                <i className="flaticon-place fz16 vam text-thm2 me-1" />{" "}
                {workType.charAt(0).toUpperCase() + workType.slice(1)}
              </p>
              <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
                <i className="flaticon-30-days fz16 vam text-thm2 me-1 bdrl1 pl15 pl0-xs bdrn-xs" />{" "}
                {timeAgo}
              </p>
              <p className="mb-0 fz14 list-inline-item mb5-sm text-thm">
                <i className="flaticon-contract fz16 vam me-1 bdrl1 pl15 pl0-xs bdrn-xs" />{" "}
                {bidsText}
              </p>
            </div>
          </div>
        </div>
      </th>
      <td className="vam">
        <span className="fz15 fw400">{categoryName}</span>
      </td>
      <td className="vam">
        <div>
          <span className="fz14 fw400">{budgetDisplay} / {t("fixed")}</span>
          <br />
          <span className={`fz13 fw500 ${statusInfo.className}`}>{statusInfo.label}</span>
        </div>
      </td>
      <td>
        <div className="flex items-center">
          {project?._id && (
            <Link
              href={`/projects/${project._id}`}
              className="icon me-2"
              id={tooltipViewId}
            >
              <Tooltip anchorSelect={`#${tooltipViewId}`} className="ui-tooltip" place="top">
                {t("viewBids")}
              </Tooltip>
              <span className="flaticon-document" />
            </Link>
          )}
          <button
            type="button"
            className="icon me-2"
            id={tooltipEditId}
            onClick={() => onEdit?.(project)}
            style={{ cursor: "pointer", border: "none", background: "transparent", padding: 0 }}
            data-testid="manage-project-edit"
          >
            <Tooltip anchorSelect={`#${tooltipEditId}`} className="ui-tooltip" place="top">
              {t("edit")}
            </Tooltip>
            <span className="flaticon-pencil" />
          </button>
          <button
            type="button"
            className="icon"
            id={tooltipDeleteId}
            onClick={() => onDelete?.(project)}
            style={{ cursor: "pointer", border: "none", background: "transparent", padding: 0 }}
            data-testid="manage-project-delete"
          >
            <Tooltip
              anchorSelect={`#${tooltipDeleteId}`}
              place="top"
              className="ui-tooltip"
            >
              {t("delete")}
            </Tooltip>
            <span className="flaticon-delete" />
          </button>
        </div>
      </td>
    </tr>
  );
}
