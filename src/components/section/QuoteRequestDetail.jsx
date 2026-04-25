"use client";
import { useQuery, useMutation } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function QuoteRequestDetail({ requestId }) {
  const t = useTranslations("localHub");
  const request = useQuery(api.marketplace.quotes.getRequestById, { requestId });
  const leadStatus = useQuery(api.marketplace.leads.getLeadStatus, { quoteRequestId: requestId });
  const credits = useQuery(api.marketplace.leads.getMyCredits);
  const claimLead = useMutation(api.marketplace.leads.claimLead);
  const [claiming, setClaiming] = useState(false);

  if (request === undefined || leadStatus === undefined) {
    return (
      <section className="pt30 pb90">
        <div className="container text-center py-5">
          <div className="spinner-border text-thm" role="status" />
        </div>
      </section>
    );
  }

  if (!request) {
    return (
      <section className="pt30 pb90">
        <div className="container text-center py-5">
          <h4>{t("notFound")}</h4>
          <Link href="/local/quote-requests" className="ud-btn btn-thm bdrs4 mt15">
            {t("backToQuoteRequests")}
          </Link>
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
    <section className="pt30 pb90">
      <div className="container">
        <div className="row">
          {/* Main content */}
          <div className="col-lg-8">
            <div className="bdr1 bdrs8 p30 mb30">
              <h3 className="mb15">{request.title}</h3>

              <div className="flex gap-3 mb20 fz14 body-color">
                <span><i className="flaticon-place me-1" />{request.locationCity || t("noLocation")}</span>
                <span><i className="flaticon-briefcase me-1" />{request.categoryName || t("general")}</span>
                <span><i className="flaticon-dollar me-1" />{request.budgetIndication || t("flexible")}</span>
              </div>

              <h5 className="mb10">{t("description")}</h5>
              {canViewFullDetails ? (
                <p className="fz15">{request.description || request.descriptionPreview}</p>
              ) : (
                <div>
                  <p className="fz15">{request.descriptionPreview}</p>
                  {request.descriptionPreview !== request.description && (
                    <p className="fz13 body-color">
                      <i className="flaticon-lock me-1" />
                      {t("claimToSee")}
                    </p>
                  )}
                </div>
              )}

              {request.preferredDate && (
                <p className="fz14 body-color mt15">
                  <i className="flaticon-calendar me-1" />
                  {t("preferredDate")} {new Date(request.preferredDate).toLocaleDateString()}
                </p>
              )}

              {/* Client details (only if claimed) */}
              {canViewFullDetails && !request.isOwner && (
                <div className="bgc-thm3 bdrs8 p20 mt20">
                  <h5 className="mb10">{t("clientContact")}</h5>
                  <p className="fz14 mb5">
                    <i className="flaticon-user me-1" />
                    {request.clientName || "—"}
                  </p>
                  <p className="body-color fz13">
                    {t.rich("claimedLeadInfo", {
                      link: (chunks) => (
                        <Link href="/dashboard/my-leads" className="text-thm">
                          {t("myLeads")}
                        </Link>
                      ),
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="bdr1 bdrs8 p30">
              <h5 className="mb15">{t("leadStatus")}</h5>

              <div className="flex justify-between fz14 mb10">
                <span>{t("slotsTaken")}</span>
                <span className="fw500">
                  {leadStatus?.claimedSlots ?? 0} / {leadStatus?.maxSlots ?? 3}
                </span>
              </div>

              <div className="flex justify-between fz14 mb10">
                <span>{t("slotsRemaining")}</span>
                <span className="fw500">{leadStatus?.slotsRemaining ?? 3}</span>
              </div>

              <div className="flex justify-between fz14 mb20">
                <span>{t("yourBalance")}</span>
                <span className="fw500">{balance} {t("credits")}</span>
              </div>

              <hr className="mb20" />

              {leadStatus?.alreadyClaimed ? (
                <div className="text-center">
                  <i className="flaticon-review-1 fz30 text-success block mb10" />
                  <p className="fw500">{t("youClaimedLead")}</p>
                </div>
              ) : request.isOwner ? (
                <p className="text-center body-color">{t("yourRequest")}</p>
              ) : request.status !== "open" ? (
                <p className="text-center body-color">{t("requestClosed")}</p>
              ) : !isLoggedIn ? (
                <Link href="/login" className="ud-btn btn-thm bdrs4 w-full">
                  {t("logInToClaim")}
                </Link>
              ) : !isFreelancer ? (
                <p className="fz13 body-color text-center">
                  {t("needFreelancerProfile")}
                </p>
              ) : (
                <div>
                  {/* Shared claim */}
                  {leadStatus?.slotsRemaining > 0 && !leadStatus?.isExclusive && (
                    <button
                      className="ud-btn btn-thm bdrs4 w-full mb10"
                      onClick={() => handleClaim("shared")}
                      disabled={claiming || balance < leadStatus.creditCost}
                    >
                      {claiming
                        ? t("claiming")
                        : t("claimLead", { cost: leadStatus.creditCost })}
                    </button>
                  )}

                  {/* Exclusive claim */}
                  {leadStatus?.canClaimExclusive && (
                    <button
                      className="ud-btn btn-thm2 bdrs4 w-full mb10"
                      onClick={() => handleClaim("exclusive")}
                      disabled={claiming || balance < leadStatus.exclusiveCost}
                    >
                      {claiming
                        ? t("claiming")
                        : t("claimExclusive", { cost: leadStatus.exclusiveCost })}
                    </button>
                  )}

                  {/* Insufficient credits warning */}
                  {balance < leadStatus?.creditCost && (
                    <div className="mt10 text-center">
                      <p className="fz13 text-danger mb10">{t("insufficientCredits")}</p>
                      <Link href="/dashboard/credits" className="ud-btn btn-white bdrs4 w-full">
                        {t("buyCredits")}
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
