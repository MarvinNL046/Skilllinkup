"use client";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../convex/_generated/api";
import ReviewForm from "@/components/element/ReviewForm";
import OpenDisputeModal from "@/components/dispute/OpenDisputeModal";
import useConvexUser from "@/hook/useConvexUser";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Receipt,
  User,
  Calendar,
  ArrowRight,
  Check,
  AlertTriangle,
} from "lucide-react";

function getCurrencySymbol(currency) {
  if (currency === "EUR") return "€";
  if (currency === "USD") return "$";
  if (currency === "GBP") return "£";
  return currency ?? "€";
}

function formatDate(timestamp) {
  if (!timestamp) return "—";
  return new Date(timestamp).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const STATUS_VARIANTS = {
  pending: "warning",
  in_progress: "info",
  delivered: "success",
  completed: "success",
  revision_requested: "warning",
  cancelled: "destructive",
};

export default function OrderCard({ order, role }) {
  const t = useTranslations("orders");
  const tDispute = useTranslations("disputes");
  const [actionLoading, setActionLoading] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showRevisionForm, setShowRevisionForm] = useState(false);
  const [revisionMessage, setRevisionMessage] = useState("");
  const [showDisputeModal, setShowDisputeModal] = useState(false);

  const { convexUser } = useConvexUser();

  const deliverOrder = useMutation(api.marketplace.orders.deliver);
  const approveOrder = useMutation(api.marketplace.orders.approve);
  const requestRevision = useMutation(api.marketplace.orders.requestRevision);

  const orderReviews = useQuery(
    api.marketplace.reviews.getByOrder,
    order.status === "completed" && order._id ? { orderId: order._id } : "skip"
  );

  const STATUS_LABELS = {
    pending: t("statusPending"),
    in_progress: t("statusInProgress"),
    delivered: t("statusDelivered"),
    completed: t("statusCompleted"),
    revision_requested: t("statusRevisionRequested"),
    cancelled: t("statusCancelled"),
  };

  const statusVariant = STATUS_VARIANTS[order.status] ?? "muted";
  const statusLabel =
    STATUS_LABELS[order.status] ?? order.status.replace(/_/g, " ");

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
      await requestRevision({
        orderId: order._id,
        message: revisionMessage.trim(),
      });
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

  const canOpenDispute =
    ["in_progress", "delivered", "revision_requested"].includes(order.status) &&
    order.escrowStatus !== "disputed" &&
    order.escrowStatus !== "released" &&
    order.escrowStatus !== "refunded";

  const alreadyReviewed =
    orderReviews !== undefined &&
    convexUser?._id &&
    orderReviews.some((r) => r.reviewerId === convexUser._id);

  const revieweeId =
    role === "client"
      ? order.freelancerUserId ?? null
      : order.clientId ?? null;

  return (
    <Card>
      <CardContent className="p-5">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 lg:items-center">
          {/* Left section: order info */}
          <div className="lg:pr-5 lg:border-r lg:border-[var(--border-subtle)] flex flex-col lg:flex-row gap-4 items-start">
            <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Receipt className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-grow">
              <h5 className="text-base font-semibold mb-1">{order.title}</h5>
              <p className="text-xs text-[var(--text-secondary)] mb-2">
                <span className="font-medium text-foreground">
                  {order.orderNumber}
                </span>
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]">
                <span className="inline-flex items-center gap-1">
                  <User className="h-3.5 w-3.5 text-primary" />
                  {role === "client"
                    ? order.freelancerName ?? "—"
                    : order.clientName ?? "—"}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  {formatDate(order.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Right section: amount, status, actions */}
          <div className="lg:text-right">
            <div className="mb-2">
              <h5 className="text-lg font-semibold mb-0">
                {currencySymbol}
                {(displayAmount ?? 0).toFixed(2)}
              </h5>
              {role === "freelancer" && order.freelancerEarnings != null && (
                <span className="text-xs text-[var(--text-secondary)]">
                  {t("afterPlatformFee")}
                </span>
              )}
            </div>
            <div className="mb-3">
              <Badge variant={statusVariant}>{statusLabel}</Badge>
            </div>

            <div className="flex flex-col gap-2">
              {showDeliverButton && (
                <Button
                  size="sm"
                  disabled={actionLoading}
                  onClick={handleDeliver}
                >
                  {actionLoading ? (
                    <span
                      role="status"
                      aria-label="Loading"
                      className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                    />
                  ) : (
                    <>
                      {t("markAsDelivered")}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}

              {showClientButtons && (
                <>
                  <Button
                    size="sm"
                    disabled={actionLoading}
                    onClick={handleApprove}
                  >
                    {actionLoading ? (
                      <span
                        role="status"
                        aria-label="Loading"
                        className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                      />
                    ) : (
                      <>
                        {t("approveReleasePayment")}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={actionLoading}
                    onClick={() => setShowRevisionForm((prev) => !prev)}
                  >
                    {showRevisionForm ? t("cancel") : t("requestRevision")}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </>
              )}

              {isCompleted && revieweeId && (
                <Button
                  size="sm"
                  variant={alreadyReviewed ? "outline" : "secondary"}
                  onClick={() => setShowReviewForm((prev) => !prev)}
                >
                  {alreadyReviewed ? (
                    <>
                      <Check className="mr-1 h-4 w-4" />
                      {t("reviewSubmitted")}
                    </>
                  ) : (
                    <>
                      {showReviewForm ? t("hideReviewForm") : t("leaveReview")}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}

              {canOpenDispute && (
                <Button
                  size="sm"
                  variant="outline"
                  type="button"
                  onClick={() => setShowDisputeModal(true)}
                  disabled={actionLoading}
                  className="border-destructive/30 text-destructive hover:bg-destructive/5"
                >
                  {tDispute("openDispute")}
                  <AlertTriangle className="ml-1 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Inline revision form */}
        {showRevisionForm && (
          <>
            <Separator className="my-4" />
            <div className="rounded-md bg-[var(--surface-2)] p-5">
              <p className="text-sm font-medium mb-3">{t("revisionPrompt")}</p>
              <Textarea
                rows={3}
                value={revisionMessage}
                onChange={(e) => setRevisionMessage(e.target.value)}
                placeholder={t("revisionPlaceholder")}
                className="mb-3"
              />
              <Button
                size="sm"
                disabled={!revisionMessage.trim() || actionLoading}
                onClick={handleRevision}
              >
                {actionLoading ? (
                  <span
                    role="status"
                    aria-label="Loading"
                    className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                  />
                ) : (
                  t("submitRevisionRequest")
                )}
              </Button>
            </div>
          </>
        )}

        {/* Inline review form for completed orders */}
        {isCompleted && showReviewForm && revieweeId && !alreadyReviewed && (
          <>
            <Separator className="my-4" />
            <ReviewForm
              orderId={order._id}
              revieweeId={revieweeId}
              reviewerRole={role}
            />
          </>
        )}

        {showDisputeModal && (
          <OpenDisputeModal
            orderId={order._id}
            onClose={() => setShowDisputeModal(false)}
          />
        )}
      </CardContent>
    </Card>
  );
}
