"use client";
import { useRef, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../convex/_generated/api";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Star, CheckCircle2, AlertCircle, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import ContextMessageButton from "@/components/ui/ContextMessageButton";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function BidList({
  projectId,
  isOwner,
  projectStatus = "open",
}) {
  const router = useRouter();
  const t = useTranslations("projectDetail");
  const bids = useQuery(
    api.marketplace.projects.getBids,
    isOwner && projectId ? { projectId } : "skip",
  );
  const acceptBid = useMutation(api.marketplace.projects.acceptBid);
  const [sort, setSort] = useState("received");
  const [acceptingId, setAcceptingId] = useState(null);
  const [acceptError, setAcceptError] = useState("");
  const [comparedIds, setComparedIds] = useState([]);
  const [reviewId, setReviewId] = useState(null);
  const accepting = useRef(false);
  const reviewedBid = bids?.find((bid) => bid._id === reviewId);
  const compared = bids?.filter((bid) => comparedIds.includes(bid._id)) || [];

  const handleAccept = async (bidId) => {
    if (
      accepting.current ||
      projectStatus !== "open" ||
      !bids?.some((bid) => bid._id === bidId && bid.status === "pending")
    )
      return;
    accepting.current = true;
    setAcceptingId(bidId);
    setAcceptError("");
    try {
      const result = await acceptBid({ bidId });
      setReviewId(null);
      router.push(`/orders/${result.orderId}`);
    } catch (err) {
      setAcceptError(err.message || t("failedToSubmit"));
    } finally {
      accepting.current = false;
      setAcceptingId(null);
    }
  };

  if (!isOwner) {
    return (
      <p className="text-[var(--text-secondary)] mb-5">
        {t("proposalsOwnerOnly")}
      </p>
    );
  }

  if (bids === undefined) {
    return (
      <p className="text-[var(--text-secondary)] mb-5">
        {t("loadingProposals")}
      </p>
    );
  }

  if (!bids || bids.length === 0) {
    return (
      <p className="text-[var(--text-secondary)] mb-5">{t("noProposals")}</p>
    );
  }

  const money = (amount, currency = "EUR") =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency }).format(
      amount,
    );
  const currencies = new Set(bids.map((bid) => bid.currency || "EUR"));
  const orderedBids = [...bids].sort((a, b) => {
    if ((a.status === "accepted") !== (b.status === "accepted"))
      return a.status === "accepted" ? -1 : 1;
    if (sort === "price" && currencies.size === 1) return a.amount - b.amount;
    if (sort === "delivery") return a.deliveryDays - b.deliveryDays;
    return (a.createdAt || 0) - (b.createdAt || 0);
  });

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">Compare proposals</h3>
          <p className="text-sm text-[var(--text-secondary)] mb-0">
            Compare the approach as well as the price. Clarify the scope before
            choosing.
          </p>
        </div>
        <label className="text-sm">
          Sort proposals
          <select
            aria-label="Sort proposals"
            className="block mt-1 rounded-md border p-2 bg-white"
            value={
              sort === "price" && currencies.size !== 1 ? "received" : sort
            }
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="received">First received</option>
            {currencies.size === 1 && (
              <option value="price">Lowest price</option>
            )}
            <option value="delivery">Shortest delivery</option>
          </select>
        </label>
      </div>
      {projectStatus !== "open" && (
        <p className="mb-5 text-sm text-[var(--text-secondary)]">
          This project is no longer accepting proposals. Existing proposals
          remain here for reference.
        </p>
      )}
      {acceptError && !reviewId && (
        <Alert variant="destructive" className="mb-5">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{acceptError}</AlertDescription>
        </Alert>
      )}
      <p className="mb-4 text-sm text-[var(--text-secondary)]">
        Select up to three proposals to compare. Your comparison selection stays
        on this page until you leave or reload.
      </p>
      {compared.length > 0 && (
        <section
          aria-label="Selected proposals comparison"
          className="mb-6 rounded-xl border border-[var(--border-subtle)] p-4"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">
              Your comparison ({compared.length}/3)
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setComparedIds([])}
            >
              Clear comparison
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {compared.map((bid) => (
              <article
                key={bid._id}
                className="min-w-0 rounded-lg border border-[var(--border-subtle)] p-4"
              >
                <h4 className="font-semibold">{bid.freelancerName}</h4>
                <dl className="my-3 space-y-2 text-sm">
                  <div>
                    <dt>Proposal price</dt>
                    <dd className="font-semibold">
                      {money(bid.amount, bid.currency || "EUR")}
                    </dd>
                  </div>
                  <div>
                    <dt>Delivery</dt>
                    <dd>
                      {bid.deliveryDays}{" "}
                      {bid.deliveryDays === 1 ? "day" : "days"}
                    </dd>
                  </div>
                  <div>
                    <dt>Rating</dt>
                    <dd>
                      {bid.freelancerRating > 0
                        ? `${bid.freelancerRating.toFixed(1)} / 5`
                        : "No rating yet"}
                    </dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd>{bid.status}</dd>
                  </div>
                </dl>
                <details className="mb-3 text-sm">
                  <summary className="cursor-pointer">Read approach</summary>
                  <p className="mt-2 whitespace-pre-wrap break-words">
                    {bid.pitch}
                  </p>
                </details>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setComparedIds((ids) =>
                        ids.filter((id) => id !== bid._id),
                      )
                    }
                  >
                    Remove
                  </Button>
                  {bid.status === "pending" && projectStatus === "open" && (
                    <Button
                      size="sm"
                      disabled={acceptingId !== null}
                      onClick={() => {
                        setReviewId(bid._id);
                        setAcceptError("");
                      }}
                    >
                      Review choice
                    </Button>
                  )}
                </div>
              </article>
            ))}
          </div>
          {new Set(compared.map((bid) => bid.currency || "EUR")).size > 1 && (
            <p className="mt-3 text-sm">
              These prices use different currencies and have not been converted.
            </p>
          )}
        </section>
      )}
      <div className="space-y-5">
        {orderedBids.map((bid) => (
          <article
            key={bid._id}
            className={cn(
              "flex flex-col sm:flex-row items-start gap-3 p-4 sm:p-5 rounded-xl border border-[var(--border-subtle)]",
              bid.status === "accepted" && "bg-emerald-50/40",
            )}
          >
            <div className="flex-shrink-0">
              {bid.freelancerAvatar ? (
                <Image
                  src={bid.freelancerAvatar}
                  alt={bid.freelancerName}
                  width={50}
                  height={50}
                  className="rounded-full h-[50px] w-[50px] object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-[50px] w-[50px] rounded-full bg-secondary text-secondary-foreground font-semibold">
                  {bid.freelancerName?.charAt(0)?.toUpperCase() || "?"}
                </div>
              )}
            </div>

            <div className="flex-grow min-w-0 w-full">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h6 className="text-base font-semibold mb-0 inline-flex items-center gap-1">
                    {bid.freelancerName}
                    {bid.freelancerVerified && (
                      <CheckCircle2
                        className="h-3 w-3 text-primary"
                        aria-label={t("verifiedFreelancer")}
                      />
                    )}
                  </h6>
                  {bid.freelancerRating > 0 && (
                    <p className="inline-flex items-center gap-1 text-xs text-[var(--text-secondary)] mb-0">
                      <Star
                        className="h-2.5 w-2.5 fill-warning text-warning"
                        aria-hidden="true"
                      />
                      {bid.freelancerRating.toFixed(1)}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground mb-0">
                    {money(bid.amount, bid.currency || "EUR")}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] mb-0">
                    Delivery: {bid.deliveryDays}{" "}
                    {bid.deliveryDays === 1 ? "day" : t("days")}
                  </p>
                </div>
              </div>

              <p className="text-sm text-[var(--text-secondary)] mt-3 mb-3 whitespace-pre-wrap break-words">
                {bid.pitch}
              </p>

              <Badge variant={bid.status === "accepted" ? "success" : "muted"}>
                {bid.status === "accepted"
                  ? t("accepted")
                  : bid.status === "pending"
                    ? projectStatus === "open"
                      ? "Awaiting decision"
                      : "Not selected"
                    : bid.status === "rejected"
                      ? "Not selected"
                      : bid.status}
              </Badge>
              <label className="mt-3 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={comparedIds.includes(bid._id)}
                  disabled={
                    !comparedIds.includes(bid._id) && compared.length >= 3
                  }
                  onChange={(event) =>
                    setComparedIds((ids) =>
                      event.target.checked
                        ? ids.length < 3
                          ? [...ids, bid._id]
                          : ids
                        : ids.filter((id) => id !== bid._id),
                    )
                  }
                />
                Compare {bid.freelancerName}
              </label>
              {bid.status === "accepted" && (
                <div className="mt-3">
                  {bid.orderId ? (
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/orders/${bid.orderId}`}>
                        Open workspace
                      </Link>
                    </Button>
                  ) : (
                    <p className="text-sm text-[var(--text-secondary)]">
                      The linked workspace is unavailable.
                    </p>
                  )}
                </div>
              )}

              {isOwner && ["pending", "accepted"].includes(bid.status) && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <ContextMessageButton
                    context={{ type: "project_bid", bidId: bid._id }}
                    label="Message professional"
                  />
                  {bid.status === "pending" && projectStatus === "open" ? (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => {
                        setReviewId(bid._id);
                        setAcceptError("");
                      }}
                      disabled={acceptingId !== null}
                    >
                      {acceptingId === bid._id
                        ? t("accepting")
                        : "Review choice"}
                      <Check className="ml-1 h-4 w-4" />
                    </Button>
                  ) : null}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
      <Dialog
        open={!!reviewedBid}
        onOpenChange={(open) => {
          if (!open && !accepting.current) setReviewId(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm your choice</DialogTitle>
            <DialogDescription>
              Review the agreed scope before creating the shared workspace.
            </DialogDescription>
          </DialogHeader>
          {reviewedBid && (
            <div className="space-y-3">
              <p className="font-semibold">{reviewedBid.freelancerName}</p>
              <p>
                {money(reviewedBid.amount, reviewedBid.currency || "EUR")} ·{" "}
                {reviewedBid.deliveryDays}{" "}
                {reviewedBid.deliveryDays === 1 ? "day" : "days"}
              </p>
              <p className="max-h-48 overflow-y-auto whitespace-pre-wrap break-words text-sm">
                {reviewedBid.pitch}
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                Confirming accepts this proposal and closes selection for this
                project. A shared workspace will be created. No payment is taken
                during the private beta.
              </p>
              {(projectStatus !== "open" ||
                reviewedBid.status !== "pending") && (
                <p role="status">
                  This proposal can no longer be selected. Close this window to
                  review the current status.
                </p>
              )}
              {acceptError && (
                <Alert variant="destructive">
                  <AlertDescription>{acceptError}</AlertDescription>
                </Alert>
              )}
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              disabled={acceptingId !== null}
              onClick={() => setReviewId(null)}
            >
              Keep comparing
            </Button>
            <Button
              disabled={
                acceptingId !== null ||
                projectStatus !== "open" ||
                reviewedBid?.status !== "pending"
              }
              onClick={() => handleAccept(reviewId)}
            >
              {acceptingId
                ? "Creating workspace…"
                : "Confirm and open workspace"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
