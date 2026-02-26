"use client";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import ReviewForm from "@/components/element/ReviewForm";
import useConvexUser from "@/hook/useConvexUser";

const STATUS_CONFIG = {
  pending: { label: "Pending", className: "pending-style" },
  in_progress: { label: "In Progress", className: "pending-style style1" },
  delivered: { label: "Delivered", className: "pending-style style2" },
  completed: { label: "Completed", className: "pending-style style3" },
  revision_requested: { label: "Revision Requested", className: "pending-style" },
  cancelled: { label: "Cancelled", className: "pending-style style4" },
};

function getCurrencySymbol(currency) {
  if (currency === "EUR") return "\u20AC";
  if (currency === "USD") return "$";
  if (currency === "GBP") return "\u00A3";
  return currency ?? "\u20AC";
}

function formatDate(timestamp) {
  if (!timestamp) return "—";
  return new Date(timestamp).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function OrderCard({ order, role }) {
  const [actionLoading, setActionLoading] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const { convexUser } = useConvexUser();

  const deliverOrder = useMutation(api.marketplace.orders.deliver);
  const approveOrder = useMutation(api.marketplace.orders.approve);
  const requestRevision = useMutation(api.marketplace.orders.requestRevision);

  // Fetch reviews for this order to check if user already reviewed
  const orderReviews = useQuery(
    api.marketplace.reviews.getByOrder,
    order.status === "completed" && order._id ? { orderId: order._id } : "skip"
  );

  const statusConfig = STATUS_CONFIG[order.status] ?? {
    label: order.status.replace(/_/g, " "),
    className: "pending-style",
  };

  const currencySymbol = getCurrencySymbol(order.currency);
  const displayAmount =
    role === "freelancer" && order.freelancerEarnings != null
      ? order.freelancerEarnings
      : order.amount;

  const handleDeliver = async () => {
    setActionLoading(true);
    try {
      await deliverOrder({ orderId: order._id });
    } catch (err) {
      alert(err.message);
    }
    setActionLoading(false);
  };

  const handleApprove = async () => {
    setActionLoading(true);
    try {
      await approveOrder({ orderId: order._id });
    } catch (err) {
      alert(err.message);
    }
    setActionLoading(false);
  };

  const handleRevision = async () => {
    const msg = prompt("Please describe what needs to be revised:");
    if (!msg || !msg.trim()) return;
    setActionLoading(true);
    try {
      await requestRevision({ orderId: order._id, message: msg.trim() });
    } catch (err) {
      alert(err.message);
    }
    setActionLoading(false);
  };

  const showDeliverButton = role === "freelancer" && order.status === "in_progress";
  const showClientButtons = role === "client" && order.status === "delivered";

  // Show "Leave Review" button only for completed orders
  const isCompleted = order.status === "completed";

  // Check if the current user already reviewed this order
  const alreadyReviewed =
    orderReviews !== undefined &&
    convexUser?._id &&
    orderReviews.some((r) => r.reviewerId === convexUser._id);

  // Determine the reviewee ID for the ReviewForm
  // Client reviews the freelancer (need freelancer's user ID)
  // Freelancer reviews the client (need client's user ID)
  const revieweeId =
    role === "client"
      ? order.freelancerUserId ?? null
      : order.clientId ?? null;

  return (
    <div className="freelancer-style1 bdr1 hover-box-shadow ms-0 mb20">
      <div className="row align-items-lg-center">
        {/* Left section: order info */}
        <div className="col-lg-8 ps-0">
          <div className="d-lg-flex bdrr1 bdrn-xl pr15 pr0-lg align-items-start">
            {/* Icon */}
            <div className="thumb w60 position-relative mb15-md d-flex align-items-center justify-content-center bgc-thm-light bdrs4">
              <i className="flaticon-receipt fz30 text-thm" />
            </div>

            {/* Details */}
            <div className="details ml15 ml0-md mb15-md">
              <h5 className="title mb5 fz16">{order.title}</h5>
              <p className="mb-0 fz13 text">
                <span className="fw500 dark-color">{order.orderNumber}</span>
              </p>

              <div className="d-flex flex-wrap align-items-center gap-3 mt10">
                {/* Counterpart name */}
                <p className="mb-0 fz14">
                  <i className="flaticon-user fz14 vam text-thm2 me-1" />
                  {role === "client"
                    ? order.freelancerName ?? "—"
                    : order.clientName ?? "—"}
                </p>

                {/* Date */}
                <p className="mb-0 fz14">
                  <i className="flaticon-30-days fz14 vam text-thm2 me-1" />
                  {formatDate(order.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right section: amount, status, actions */}
        <div className="col-lg-4 ps-0 ps-xl-3 pe-0">
          <div className="details">
            {/* Amount */}
            <div className="text-lg-end mb10">
              <h5 className="mb-0">
                {currencySymbol}
                {displayAmount.toFixed(2)}
              </h5>
              {role === "freelancer" && order.freelancerEarnings != null && (
                <span className="fz12 text">after platform fee</span>
              )}
            </div>

            {/* Status badge */}
            <div className="text-lg-end mb10">
              <span className={statusConfig.className}>{statusConfig.label}</span>
            </div>

            {/* Action buttons */}
            <div className="d-grid gap-2 mt10">
              {showDeliverButton && (
                <button
                  className="ud-btn btn-thm fz14"
                  disabled={actionLoading}
                  onClick={handleDeliver}
                >
                  {actionLoading ? (
                    <span className="spinner-border spinner-border-sm" role="status" />
                  ) : (
                    <>
                      Mark as Delivered
                      <i className="fal fa-arrow-right-long" />
                    </>
                  )}
                </button>
              )}

              {showClientButtons && (
                <>
                  <button
                    className="ud-btn btn-thm fz14"
                    disabled={actionLoading}
                    onClick={handleApprove}
                  >
                    {actionLoading ? (
                      <span className="spinner-border spinner-border-sm" role="status" />
                    ) : (
                      <>
                        Approve &amp; Release Payment
                        <i className="fal fa-arrow-right-long" />
                      </>
                    )}
                  </button>
                  <button
                    className="ud-btn btn-white fz14"
                    disabled={actionLoading}
                    onClick={handleRevision}
                  >
                    Request Revision
                    <i className="fal fa-arrow-right-long" />
                  </button>
                </>
              )}

              {/* Leave Review button for completed orders */}
              {isCompleted && revieweeId && (
                <button
                  className={`ud-btn fz14 ${alreadyReviewed ? "btn-white" : "btn-thm2"}`}
                  onClick={() => setShowReviewForm((prev) => !prev)}
                >
                  {alreadyReviewed ? (
                    <>
                      <i className="fas fa-check me-1" />
                      Review Submitted
                    </>
                  ) : (
                    <>
                      {showReviewForm ? "Hide Review Form" : "Leave a Review"}
                      <i className="fal fa-arrow-right-long" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Inline review form for completed orders */}
      {isCompleted && showReviewForm && revieweeId && !alreadyReviewed && (
        <div className="row mt15">
          <div className="col-12">
            <div className="bdrb1 mb15" />
            <ReviewForm
              orderId={order._id}
              revieweeId={revieweeId}
              reviewerRole={role}
            />
          </div>
        </div>
      )}
    </div>
  );
}
