"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function QuoteRequestDetail({ requestId }) {
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
          <h4>Quote Request Not Found</h4>
          <Link href="/local/quote-requests" className="ud-btn btn-thm bdrs4 mt15">
            Back to Quote Requests
          </Link>
        </div>
      </section>
    );
  }

  const isLoggedIn = credits !== null;
  const isFreelancer = credits?.profileId !== null;
  const balance = credits?.balance ?? 0;

  async function handleClaim(claimType) {
    setClaiming(true);
    try {
      const result = await claimLead({ quoteRequestId: requestId, claimType });
      toast.success(
        `Lead claimed! ${result.creditsSpent} credits deducted. New balance: ${result.newBalance}`
      );
    } catch (err) {
      toast.error(err.message || "Failed to claim lead.");
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

              <div className="d-flex gap-3 mb20 fz14 body-color">
                <span><i className="flaticon-place me-1" />{request.locationCity || "No location"}</span>
                <span><i className="flaticon-briefcase me-1" />{request.categoryName || "General"}</span>
                <span><i className="flaticon-dollar me-1" />{request.budgetIndication || "Flexible"}</span>
              </div>

              <h5 className="mb10">Description</h5>
              {leadStatus?.alreadyClaimed ? (
                <p className="fz15">{request.description}</p>
              ) : (
                <div>
                  <p className="fz15">
                    {request.description?.slice(0, 150)}
                    {request.description?.length > 150 && "..."}
                  </p>
                  {request.description?.length > 150 && (
                    <p className="fz13 body-color">
                      <i className="flaticon-lock me-1" />
                      Claim this lead to see the full description and client details.
                    </p>
                  )}
                </div>
              )}

              {request.preferredDate && (
                <p className="fz14 body-color mt15">
                  <i className="flaticon-calendar me-1" />
                  Preferred date: {new Date(request.preferredDate).toLocaleDateString()}
                </p>
              )}

              {/* Client details (only if claimed) */}
              {leadStatus?.alreadyClaimed && (
                <div className="bgc-thm3 bdrs8 p20 mt20">
                  <h5 className="mb10">Client Contact</h5>
                  <p className="fz14 mb5">
                    <i className="flaticon-user me-1" />
                    {request.clientName || "—"}
                  </p>
                  <p className="body-color fz13">
                    You have claimed this lead. Check your{" "}
                    <Link href="/dashboard/my-leads" className="text-thm">
                      My Leads
                    </Link>{" "}
                    page for full contact details.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="bdr1 bdrs8 p30">
              <h5 className="mb15">Lead Status</h5>

              <div className="d-flex justify-content-between fz14 mb10">
                <span>Slots taken</span>
                <span className="fw500">
                  {leadStatus?.claimedSlots ?? 0} / {leadStatus?.maxSlots ?? 3}
                </span>
              </div>

              <div className="d-flex justify-content-between fz14 mb10">
                <span>Slots remaining</span>
                <span className="fw500">{leadStatus?.slotsRemaining ?? 3}</span>
              </div>

              <div className="d-flex justify-content-between fz14 mb20">
                <span>Your balance</span>
                <span className="fw500">{balance} credits</span>
              </div>

              <hr className="mb20" />

              {leadStatus?.alreadyClaimed ? (
                <div className="text-center">
                  <i className="flaticon-review-1 fz30 text-success d-block mb10" />
                  <p className="fw500">You claimed this lead</p>
                </div>
              ) : request.status !== "open" ? (
                <p className="text-center body-color">This request is closed.</p>
              ) : !isLoggedIn ? (
                <Link href="/login" className="ud-btn btn-thm bdrs4 w-100">
                  Log In to Claim
                </Link>
              ) : !isFreelancer ? (
                <p className="fz13 body-color text-center">
                  You need a freelancer profile to claim leads.
                </p>
              ) : (
                <div>
                  {/* Shared claim */}
                  {leadStatus?.slotsRemaining > 0 && !leadStatus?.isExclusive && (
                    <button
                      className="ud-btn btn-thm bdrs4 w-100 mb10"
                      onClick={() => handleClaim("shared")}
                      disabled={claiming || balance < leadStatus.creditCost}
                    >
                      {claiming
                        ? "Claiming..."
                        : `Claim Lead (${leadStatus.creditCost} credits)`}
                    </button>
                  )}

                  {/* Exclusive claim */}
                  {leadStatus?.canClaimExclusive && (
                    <button
                      className="ud-btn btn-thm2 bdrs4 w-100 mb10"
                      onClick={() => handleClaim("exclusive")}
                      disabled={claiming || balance < leadStatus.exclusiveCost}
                    >
                      {claiming
                        ? "Claiming..."
                        : `Claim Exclusive (${leadStatus.exclusiveCost} credits)`}
                    </button>
                  )}

                  {/* Insufficient credits warning */}
                  {balance < leadStatus?.creditCost && (
                    <div className="mt10 text-center">
                      <p className="fz13 text-danger mb10">Insufficient credits</p>
                      <Link href="/dashboard/credits" className="ud-btn btn-white bdrs4 w-100">
                        Buy Credits
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
