"use client";
import { Tooltip } from "react-tooltip";
import Link from "next/link";
import { useTranslations } from "next-intl";

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
    open: { label: t("statusOpen"), className: "text-success" },
    closed: { label: t("statusClosed"), className: "text-secondary" },
    filled: { label: t("statusFilled"), className: "text-primary" },
  };

  const statusInfo = STATUS_LABELS[status] ?? { label: status, className: "text-secondary" };

  const formatDate = (ts) => {
    if (!ts) return "\u2014";
    return new Date(ts).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const tooltipViewId = `job-view-${job?._id ?? Math.random()}`;
  const tooltipEditId = `job-edit-${job?._id ?? Math.random()}`;
  const tooltipDeleteId = `job-delete-${job?._id ?? Math.random()}`;

  return (
    <tr>
      <th scope="row">
        <div className="freelancer-style1 box-shadow-none row m-0 p-0">
          <div className="d-lg-flex px-0">
            <div className="details mb15-md-md">
              <h5 className="title mb5">{title}</h5>
              {company && (
                <p className="mb-0 fz14 text-muted">{company}</p>
              )}
              <p className="mb-0 fz13 mt5">
                <span className="text-muted">{categoryName}</span>
              </p>
            </div>
          </div>
        </div>
      </th>
      <td className="vam">
        <span className="fz15 fw400">{applicationCount}</span>
      </td>
      <td className="vam">
        <span className="fz14">{formatDate(createdAt)}</span>
        <br />
        <span className="fz13 text-muted">
          {expiresAt ? `${t("expiresPrefix")}${formatDate(expiresAt)}` : t("noExpiry")}
        </span>
      </td>
      <td className="vam">
        <span className={`fz13 fw500 ${statusInfo.className}`}>{statusInfo.label}</span>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {slug && (
            <Link
              href={`/jobs/${slug}`}
              className="icon me-2"
              id={tooltipViewId}
            >
              <Tooltip anchorSelect={`#${tooltipViewId}`} className="ui-tooltip" place="top">
                {t("viewJob")}
              </Tooltip>
              <span className="flaticon-document" />
            </Link>
          )}
          <a
            className="icon me-2"
            id={tooltipEditId}
            data-bs-toggle="modal"
            data-bs-target="#proposalModal"
            onClick={() => onEdit?.(job)}
            style={{ cursor: "pointer" }}
          >
            <Tooltip anchorSelect={`#${tooltipEditId}`} className="ui-tooltip" place="top">
              {t("edit")}
            </Tooltip>
            <span className="flaticon-pencil" />
          </a>
          <a
            className="icon"
            id={tooltipDeleteId}
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
            onClick={() => onDelete?.(job)}
            style={{ cursor: "pointer" }}
          >
            <Tooltip anchorSelect={`#${tooltipDeleteId}`} className="ui-tooltip" place="top">
              {t("delete")}
            </Tooltip>
            <span className="flaticon-delete" />
          </a>
        </div>
      </td>
    </tr>
  );
}
