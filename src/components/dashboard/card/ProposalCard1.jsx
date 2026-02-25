"use client";
import Link from "next/link";
import { Tooltip } from "react-tooltip";

const BID_STATUS_CONFIG = {
  pending: { label: "Pending", badgeClass: "bg-warning text-dark" },
  accepted: { label: "Accepted", badgeClass: "bg-success text-white" },
  rejected: { label: "Rejected", badgeClass: "bg-danger text-white" },
};

export default function ProposalCard1({ data, bid }) {
  // Support both legacy static `data` prop and new Convex `bid` prop
  const isConvexBid = !!bid;

  const title = isConvexBid ? bid.projectTitle : (data?.title ?? "Untitled Project");
  const projectSlug = isConvexBid ? bid.projectSlug : null;
  const amount = isConvexBid ? bid.amount : null;
  const currency = isConvexBid ? (bid.projectCurrency ?? "EUR") : null;
  const deliveryDays = isConvexBid ? bid.deliveryDays : null;
  const bidStatus = isConvexBid ? (bid.status ?? "pending") : null;
  const createdAt = isConvexBid ? bid.createdAt : null;

  // Legacy static data fields
  const legacyPriceMin = data?.price?.min;
  const legacyPriceMax = data?.price?.max;
  const legacyImg = data?.img ?? "/images/team/client-1.png";

  const statusConfig = bidStatus ? (BID_STATUS_CONFIG[bidStatus] ?? BID_STATUS_CONFIG.pending) : null;

  const submittedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "April 01, 2023";

  const tooltipEditId = `proposal-edit-${bid?._id ?? data?.id ?? Math.random()}`;
  const tooltipDeleteId = `proposal-delete-${bid?._id ?? data?.id ?? Math.random()}`;

  return (
    <>
      <tr>
        <th className="ps-0" scope="row">
          <div className="freelancer-style1 p-0 mb-0 box-shadow-none">
            <div className="d-lg-flex align-items-lg-center">
              <div className="details ml15 ml0-md mb15-md">
                <h5 className="title mb-2">
                  {projectSlug ? (
                    <Link href={`/en/projects/${projectSlug}`} className="text-dark">
                      {title}
                    </Link>
                  ) : (
                    title
                  )}
                </h5>
                {isConvexBid ? (
                  <>
                    <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
                      <i className="flaticon-30-days fz16 vam text-thm2 me-1" />{" "}
                      Submitted {submittedDate}
                    </p>
                    {deliveryDays && (
                      <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
                        <i className="flaticon-contract fz16 vam text-thm2 me-1 bdrl1 pl15 pl0-xs bdrn-xs" />{" "}
                        {deliveryDays} day{deliveryDays !== 1 ? "s" : ""} delivery
                      </p>
                    )}
                    {statusConfig && (
                      <span className={`badge ${statusConfig.badgeClass} fz12 mt5`}>
                        {statusConfig.label}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
                      <i className="flaticon-place fz16 vam text-thm2 me-1" />{" "}
                      London, UK
                    </p>
                    <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
                      <i className="flaticon-30-days fz16 vam text-thm2 me-1 bdrl1 pl15 pl0-xs bdrn-xs" />{" "}
                      April 01, 2023
                    </p>
                    <p className="mb-0 fz14 list-inline-item mb5-sm">
                      <i className="flaticon-contract fz16 vam text-thm2 me-1 bdrl1 pl15 pl0-xs bdrn-xs" />{" "}
                      1 Received
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </th>
        <td className="vam">
          {isConvexBid ? (
            <h5 className="mb-0">
              {currency} {amount?.toFixed(2)}{" "}
              <span className="fz14 fw400">/ {deliveryDays} days</span>
            </h5>
          ) : (
            <h5 className="mb-0">
              ${legacyPriceMin} - ${legacyPriceMax}{" "}
              <span className="fz14 fw400">Hourly Rate</span>
            </h5>
          )}
        </td>
        <td>
          <div className="d-flex">
            <a
              className="icon me-2"
              id={tooltipEditId}
              data-bs-toggle="modal"
              data-bs-target="#proposalModal"
            >
              <Tooltip anchorSelect={`#${tooltipEditId}`} className="ui-tooltip">
                Edit
              </Tooltip>
              <span className="flaticon-pencil" />
            </a>
            <a
              className="icon"
              id={tooltipDeleteId}
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
            >
              <Tooltip anchorSelect={`#${tooltipDeleteId}`} className="ui-tooltip">
                Delete
              </Tooltip>
              <span className="flaticon-delete" />
            </a>
          </div>
        </td>
      </tr>
    </>
  );
}
