"use client";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../convex/_generated/api";
import ReviewForm from "@/components/element/ReviewForm";
import useConvexUser from "@/hook/useConvexUser";
import { toast } from "sonner";

function getCurrencySymbol(currency) {
  if (currency === "EUR") return "\u20AC";
  if (currency === "USD") return "$";
  if (currency === "GBP") return "\u00A3";
  return currency ?? "\u20AC";
}

function formatDate(timestamp) {
  if (!timestamp) return "\u2014";
  return new Date(timestamp).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function OrderCard({ order, role }) {
  const t = useTranslations("orders");
  const [actionLoading, setActionLoading] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showRevisionForm, setShowRevisionForm] = useState(false);
  const [revisionMessage, setRevisionMessage] = useState("");

  const { convexUser } = useConvexUser();

  const deliverOrder = useMutation(api.marketplace.orders.deliver);
  const approveOrder = useMutation(api.marketplace.orders.approve);
  const requestRevision = useMutation(api.marketplace.orders.requestRevision);

  const orderReviews = useQuery(
    api.marketplace.reviews.getByOrder,
    order.status === "completed" && order._id ? { orderId: order._id } : "skip"
  );

  const STATUS_CONFIG = {
    pending: { label: t("statusPending"), className: "pending-style" },
    in_progress: { label: t("statusInProgress"), className: "pending-style style1" },
    delivered: { label: t("statusDelivered"), className: "pending-style style2" },
    completed: { label: t("statusCompleted"), className: "pending-style style3" },
    revision_requested: { label: t("statusRevisionRequested"), className: "pending-style" },
    cancelled: { label: t("statusCancelled"), className: "pending-style style4" },
  };

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
      toast.success(t("orderDelivered"));
    } catch (err) {
      toast.error(err.message || t("orderDeliverFailed"));
    }
    setActionLoading(false);
  };

  const handleApprove = async () => {
    setActionLoading(true);
    try {
      await approveOrder({ orderId: order._id });
      toast.success(t("orderApproved"));
    } catch (err) {
      toast.error(err.message || t("orderApproveFailed"));
    }
    setActionLoading(false);
  };

  const handleRevision = async () => {
    if (!revisionMessage.trim()) return;
    setActionLoading(true);
    try {
      await requestRevision({ orderId: order._id, message: revisionMessage.trim() });
      toast.success(t("revisionRequested"));
      setShowRevisionForm(false);
      setRevisionMessage("");
    } catch (err) {
      toast.error(err.message || t("revisionFailed"));
    }
    setActionLoading(false);
  };

  const showDeliverButton = role === "freelancer" && order.status === "in_progress";
  const showClientButtons = role === "client" && order.status === "delivered";
  const isCompleted = order.status === "completed";

  const alreadyReviewed =
    orderReviews !== undefined &&
    convexUser?._id &&
    orderReviews.some((r) => r.reviewerId === convexUser._id);

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
            <div className="thumb w60 position-relative mb15-md d-flex align-items-center justify-content-center bgc-thm-light bdrs4">
              <i className="flaticon-receipt fz30 text-thm" />
            </div>

            <div className="details ml15 ml0-md mb15-md">
              <h5 className="title mb5 fz16">{order.title}</h5>
              <p className="mb-0 fz13 text">
                <span className="fw500 dark-color">{order.orderNumber}</span>
              </p>

              <div className="d-flex flex-wrap align-items-center gap-3 mt10">
                <p className="mb-0 fz14">
                  <i className="flaticon-user fz14 vam text-thm2 me-1" />
                  {role === "client"
                    ? order.freelancerName ?? "\u2014"
                    : order.clientName ?? "\u2014"}
                </p>

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
            <div className="text-lg-end mb10">
              <h5 className="mb-0">
                {currencySymbol}
                {(displayAmount ?? 0).toFixed(2)}
              </h5>
              {role === "freelancer" && order.freelancerEarnings != null && (
                <span className="fz12 text">{t("afterPlatformFee")}</span>
              )}
            </div>

            <div className="text-lg-end mb10">
              <span className={statusConfig.className}>{statusConfig.label}</span>
            </div>

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
                      {t("markAsDelivered")}
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
                        {t("approveReleasePayment")}
                        <i className="fal fa-arrow-right-long" />
                      </>
                    )}
                  </button>
                  <button
                    className="ud-btn btn-white fz14"
                    disabled={actionLoading}
                    onClick={() => setShowRevisionForm((prev) => !prev)}
                  >
                    {showRevisionForm ? t("cancel") : t("requestRevision")}
                    <i className="fal fa-arrow-right-long" />
                  </button>
                </>
              )}

              {isCompleted && revieweeId && (
                <button
                  className={`ud-btn fz14 ${alreadyReviewed ? "btn-white" : "btn-thm2"}`}
                  onClick={() => setShowReviewForm((prev) => !prev)}
                >
                  {alreadyReviewed ? (
                    <>
                      <i className="fas fa-check me-1" />
                      {t("reviewSubmitted")}
                    </>
                  ) : (
                    <>
                      {showReviewForm ? t("hideReviewForm") : t("leaveReview")}
                      <i className="fal fa-arrow-right-long" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Inline revision form */}
      {showRevisionForm && (
        <div className="row mt15">
          <div className="col-12">
            <div className="bdrb1 mb15" />
            <div className="bgc-thm4 bdrs4 p20">
              <p className="fz14 fw500 mb10">{t("revisionPrompt")}</p>
              <textarea
                className="form-control mb10"
                rows={3}
                value={revisionMessage}
                onChange={(e) => setRevisionMessage(e.target.value)}
                placeholder={t("revisionPlaceholder")}
              />
              <button
                className="ud-btn btn-thm btn-sm fz14"
                disabled={!revisionMessage.trim() || actionLoading}
                onClick={handleRevision}
              >
                {actionLoading ? (
                  <span className="spinner-border spinner-border-sm" role="status" />
                ) : t("submitRevisionRequest")}
              </button>
            </div>
          </div>
        </div>
      )}

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
