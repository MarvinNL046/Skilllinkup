"use client";
import { useState } from "react";
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

  const handleAccept = async (bidId) => {
    if (acceptingId !== null || projectStatus !== "open") return;
    setAcceptingId(bidId);
    setAcceptError("");
    try {
      const result = await acceptBid({ bidId });
      router.push(`/orders/${result.orderId}`);
    } catch (err) {
      setAcceptError(err.message || t("failedToSubmit"));
    } finally {
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
      {acceptError && (
        <Alert variant="destructive" className="mb-5">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{acceptError}</AlertDescription>
        </Alert>
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
                      onClick={() => handleAccept(bid._id)}
                      disabled={acceptingId !== null}
                    >
                      {acceptingId === bid._id
                        ? t("accepting")
                        : "Choose this proposal"}
                      <Check className="ml-1 h-4 w-4" />
                    </Button>
                  ) : null}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
