"use client";
import { useQuery, useMutation } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Lock,
  User,
  Calendar,
  CheckCircle2,
} from "lucide-react";

export default function QuoteRequestDetail({ requestId }) {
  const t = useTranslations("localHub");
  const request = useQuery(api.marketplace.quotes.getRequestById, { requestId });
  const leadStatus = useQuery(api.marketplace.leads.getLeadStatus, {
    quoteRequestId: requestId,
  });
  const credits = useQuery(api.marketplace.leads.getMyCredits);
  const claimLead = useMutation(api.marketplace.leads.claimLead);
  const [claiming, setClaiming] = useState(false);

  if (request === undefined || leadStatus === undefined) {
    return (
      <section className="pt-8 pb-24">
        <div className="container flex justify-center py-12">
          <div
            role="status"
            aria-label="Loading"
            className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--border-subtle)] border-t-primary"
          />
        </div>
      </section>
    );
  }

  if (!request) {
    return (
      <section className="pt-8 pb-24">
        <div className="container text-center py-12">
          <h4 className="text-xl font-semibold mb-5">{t("notFound")}</h4>
          <Button asChild>
            <Link href="/local/quote-requests">{t("backToQuoteRequests")}</Link>
          </Button>
        </div>
      </section>
    );
  }

  const isLoggedIn = credits !== null;
  const isFreelancer = credits?.profileId !== null;
  const balance = credits?.balance ?? 0;
  const canViewFullDetails = !!request.canViewFullDetails;

  async function handleClaim(claimType) {
    setClaiming(true);
    try {
      const result = await claimLead({ quoteRequestId: requestId, claimType });
      toast.success(
        `Lead claimed! ${result.creditsSpent} credits deducted. New balance: ${result.newBalance}`
      );
    } catch (err) {
      toast.error(err.message || t("failedToClaim"));
    } finally {
      setClaiming(false);
    }
  }

  return (
    <section className="pt-8 pb-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4">{request.title}</h3>

                <div className="flex flex-wrap gap-x-4 gap-y-2 mb-5 text-sm text-[var(--text-secondary)]">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    {request.locationCity || t("noLocation")}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Briefcase className="h-4 w-4 text-primary" />
                    {request.categoryName || t("general")}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-primary" />
                    {request.budgetIndication || t("flexible")}
                  </span>
                </div>

                <h5 className="text-lg font-semibold mb-3">{t("description")}</h5>
                {canViewFullDetails ? (
                  <p className="text-base">
                    {request.description || request.descriptionPreview}
                  </p>
                ) : (
                  <div>
                    <p className="text-base">{request.descriptionPreview}</p>
                    {request.descriptionPreview !== request.description && (
                      <p className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] mt-2">
                        <Lock className="h-4 w-4" />
                        {t("claimToSee")}
                      </p>
                    )}
                  </div>
                )}

                {request.preferredDate && (
                  <p className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] mt-5">
                    <Calendar className="h-4 w-4" />
                    {t("preferredDate")}{" "}
                    {new Date(request.preferredDate).toLocaleDateString()}
                  </p>
                )}

                {canViewFullDetails && !request.isOwner && (
                  <div className="rounded-lg bg-[var(--surface-2)] p-5 mt-5">
                    <h5 className="text-base font-semibold mb-2">
                      {t("clientContact")}
                    </h5>
                    <p className="inline-flex items-center gap-1 text-sm mb-2">
                      <User className="h-4 w-4 text-primary" />
                      {request.clientName || "—"}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {t.rich("claimedLeadInfo", {
                        link: () => (
                          <Link
                            href="/dashboard/my-leads"
                            className="text-primary hover:underline"
                          >
                            {t("myLeads")}
                          </Link>
                        ),
                      })}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            <Card>
              <CardContent className="p-8">
                <h5 className="text-lg font-semibold mb-4">{t("leadStatus")}</h5>

                <div className="space-y-3 mb-5 text-sm">
                  <div className="flex justify-between">
                    <span>{t("slotsTaken")}</span>
                    <span className="font-medium">
                      {leadStatus?.claimedSlots ?? 0} / {leadStatus?.maxSlots ?? 3}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("slotsRemaining")}</span>
                    <span className="font-medium">
                      {leadStatus?.slotsRemaining ?? 3}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("yourBalance")}</span>
                    <span className="font-medium">
                      {balance} {t("credits")}
                    </span>
                  </div>
                </div>

                <Separator className="mb-5" />

                {leadStatus?.alreadyClaimed ? (
                  <div className="text-center">
                    <CheckCircle2 className="h-8 w-8 text-success mx-auto mb-2" />
                    <p className="font-medium">{t("youClaimedLead")}</p>
                  </div>
                ) : request.isOwner ? (
                  <p className="text-center text-[var(--text-secondary)]">
                    {t("yourRequest")}
                  </p>
                ) : request.status !== "open" ? (
                  <p className="text-center text-[var(--text-secondary)]">
                    {t("requestClosed")}
                  </p>
                ) : !isLoggedIn ? (
                  <Button asChild className="w-full">
                    <Link href="/login">{t("logInToClaim")}</Link>
                  </Button>
                ) : !isFreelancer ? (
                  <p className="text-center text-xs text-[var(--text-secondary)]">
                    {t("needFreelancerProfile")}
                  </p>
                ) : (
                  <div className="space-y-3">
                    {leadStatus?.slotsRemaining > 0 && !leadStatus?.isExclusive && (
                      <Button
                        className="w-full"
                        onClick={() => handleClaim("shared")}
                        disabled={claiming || balance < leadStatus.creditCost}
                      >
                        {claiming
                          ? t("claiming")
                          : t("claimLead", { cost: leadStatus.creditCost })}
                      </Button>
                    )}

                    {leadStatus?.canClaimExclusive && (
                      <Button
                        variant="secondary"
                        className="w-full"
                        onClick={() => handleClaim("exclusive")}
                        disabled={claiming || balance < leadStatus.exclusiveCost}
                      >
                        {claiming
                          ? t("claiming")
                          : t("claimExclusive", { cost: leadStatus.exclusiveCost })}
                      </Button>
                    )}

                    {balance < leadStatus?.creditCost && (
                      <div className="text-center">
                        <p className="text-xs text-destructive mb-2">
                          {t("insufficientCredits")}
                        </p>
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/dashboard/credits">{t("buyCredits")}</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
