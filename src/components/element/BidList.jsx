"use client";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../convex/_generated/api";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Star,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BidList({ projectId, isOwner }) {
  const t = useTranslations("projectDetail");
  const bids = useQuery(
    api.marketplace.projects.getBids,
    isOwner && projectId ? { projectId } : "skip"
  );
  const acceptBid = useMutation(api.marketplace.projects.acceptBid);
  const [acceptingId, setAcceptingId] = useState(null);
  const [acceptError, setAcceptError] = useState("");

  const handleAccept = async (bidId) => {
    setAcceptingId(bidId);
    setAcceptError("");
    try {
      await acceptBid({ bidId });
    } catch (err) {
      setAcceptError(err.message || t("failedToSubmit"));
    } finally {
      setAcceptingId(null);
    }
  };

  if (!isOwner) {
    return <p className="text-[var(--text-secondary)] mb-5">{t("proposalsOwnerOnly")}</p>;
  }

  if (bids === undefined) {
    return <p className="text-[var(--text-secondary)] mb-5">{t("loadingProposals")}</p>;
  }

  if (!bids || bids.length === 0) {
    return <p className="text-[var(--text-secondary)] mb-5">{t("noProposals")}</p>;
  }

  const avgAmount =
    bids.length > 0
      ? (bids.reduce((sum, b) => sum + b.amount, 0) / bids.length).toFixed(0)
      : null;

  return (
    <div>
      {isOwner && avgAmount && (
        <p className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] mb-5">
          <DollarSign className="h-4 w-4 text-primary" />
          {t("averageBid")} <strong className="text-foreground">€{avgAmount}</strong>
        </p>
      )}
      {acceptError && (
        <Alert variant="destructive" className="mb-5">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{acceptError}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-5">
        {bids.map((bid) => (
          <div
            key={bid._id}
            className={cn(
              "flex items-start gap-3 pb-5 border-b border-[var(--border-subtle)]",
              bid.status === "accepted" && "opacity-90"
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

            <div className="flex-grow min-w-0">
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
                  <p className="font-semibold text-foreground mb-0">€{bid.amount}</p>
                  <p className="text-xs text-[var(--text-secondary)] mb-0">
                    {bid.deliveryDays} {t("days")}
                  </p>
                </div>
              </div>

              <p className="text-sm text-[var(--text-secondary)] mt-3 mb-3">
                {bid.pitch}
              </p>

              {bid.status === "accepted" && (
                <Badge variant="success">{t("accepted")}</Badge>
              )}

              {isOwner && bid.status === "pending" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => handleAccept(bid._id)}
                  disabled={acceptingId === bid._id}
                >
                  {acceptingId === bid._id ? t("accepting") : t("acceptBid")}
                  <Check className="ml-1 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
