"use client";
import Link from "next/link";
import { Tooltip } from "react-tooltip";

const STATUS_LABELS = {
  open: { label: "Open", className: "text-success" },
  in_progress: { label: "In Progress", className: "text-warning" },
  completed: { label: "Completed", className: "text-primary" },
  cancelled: { label: "Cancelled", className: "text-danger" },
  closed: { label: "Closed", className: "text-secondary" },
};

export default function ManageProjectCard({ project, onEdit, onDelete }) {
  const title = project?.title ?? "Untitled Project";
  const categoryName = project?.categoryName ?? "Uncategorized";
  const status = project?.status ?? "open";
  const bidCount = project?.bidCount ?? 0;
  const budgetMin = project?.budgetMin;
  const budgetMax = project?.budgetMax;
  const currency = project?.currency ?? "EUR";
  const workType = project?.workType ?? "remote";
  const slug = project?.slug ?? "";
  const createdAt = project?.createdAt;

  const statusInfo = STATUS_LABELS[status] ?? { label: status, className: "text-secondary" };

  const budgetDisplay =
    budgetMin != null && budgetMax != null
      ? `${currency} ${budgetMin} - ${budgetMax}`
      : budgetMin != null
      ? `${currency} ${budgetMin}+`
      : "Budget TBD";

  const timeAgo = createdAt
    ? (() => {
        const diff = Date.now() - createdAt;
        const hours = Math.floor(diff / 3600000);
        if (hours < 24) return `${hours || 1} hour${hours !== 1 ? "s" : ""} ago`;
        const days = Math.floor(diff / 86400000);
        return `${days} day${days !== 1 ? "s" : ""} ago`;
      })()
    : "Recently";

  const tooltipViewId = `view-${project?._id ?? Math.random()}`;
  const tooltipEditId = `edit-${project?._id ?? Math.random()}`;
  const tooltipDeleteId = `delete-${project?._id ?? Math.random()}`;

  return (
    <tr>
      <th scope="row">
        <div className="freelancer-style1 box-shadow-none row m-0 p-0 align-items-lg-end">
          <div className="d-lg-flex px-0">
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
                {bidCount} Bid{bidCount !== 1 ? "s" : ""} Received
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
          <span className="fz14 fw400">{budgetDisplay} / Fixed</span>
          <br />
          <span className={`fz13 fw500 ${statusInfo.className}`}>{statusInfo.label}</span>
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {slug && (
            <Link
              href={`/en/projects/${slug}`}
              className="icon me-2"
              id={tooltipViewId}
            >
              <Tooltip anchorSelect={`#${tooltipViewId}`} className="ui-tooltip" place="top">
                View Bids
              </Tooltip>
              <span className="flaticon-eye" />
            </Link>
          )}
          <a
            className="icon me-2"
            id={tooltipEditId}
            data-bs-toggle="modal"
            data-bs-target="#proposalModal"
            onClick={() => onEdit?.(project)}
            style={{ cursor: "pointer" }}
          >
            <Tooltip anchorSelect={`#${tooltipEditId}`} className="ui-tooltip" place="top">
              Edit
            </Tooltip>
            <span className="flaticon-pencil" />
          </a>
          <a
            className="icon"
            id={tooltipDeleteId}
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
            onClick={() => onDelete?.(project)}
            style={{ cursor: "pointer" }}
          >
            <Tooltip
              anchorSelect={`#${tooltipDeleteId}`}
              place="top"
              className="ui-tooltip"
            >
              Delete
            </Tooltip>
            <span className="flaticon-delete" />
          </a>
        </div>
      </td>
    </tr>
  );
}
