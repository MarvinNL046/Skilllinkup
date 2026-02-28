"use client";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";

export default function MyLeadsInfo() {
  const claims = useQuery(api.marketplace.leads.getMyClaims);

  if (claims === undefined) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-thm" role="status" />
      </div>
    );
  }

  if (claims.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="flaticon-place fz40 text mb20 d-block" />
        <h4>No Claimed Leads Yet</h4>
        <p className="body-color mb20">
          Browse quote requests in the Local Marketplace and claim leads to get client details.
        </p>
        <Link href="/local/quote-requests" className="ud-btn btn-thm bdrs4">
          Browse Quote Requests <i className="fal fa-arrow-right-long ms-1" />
        </Link>
      </div>
    );
  }

  return (
    <div className="row">
      {claims.map((claim) => (
        <div key={claim._id} className="col-lg-6 mb20">
          <div className="dashboard-style1 bdrs8 p20">
            <div className="d-flex justify-content-between align-items-start mb10">
              <div>
                <h5 className="list-title mb-1">
                  {claim.request?.title || "Quote Request"}
                </h5>
                <span className="fz13 body-color">{claim.categoryName || "General"}</span>
              </div>
              <span
                className={`badge ${
                  claim.claimType === "exclusive" ? "bg-warning" : "bg-thm"
                }`}
              >
                {claim.claimType === "exclusive" ? "Exclusive" : "Shared"}
              </span>
            </div>

            {claim.request?.description && (
              <p className="body-color fz14 mb15">
                {claim.request.description.length > 200
                  ? claim.request.description.slice(0, 200) + "..."
                  : claim.request.description}
              </p>
            )}

            {/* Client details — only visible because they claimed this lead */}
            {claim.client && (
              <div className="bgc-thm3 bdrs4 p15 mb15">
                <p className="fz13 fw500 mb5">Client Contact</p>
                <p className="fz14 mb-0">
                  <i className="flaticon-user me-1" />
                  {claim.client.name || "—"}
                </p>
                {claim.client.email && (
                  <p className="fz14 mb-0">
                    <i className="flaticon-mail me-1" />
                    <a href={`mailto:${claim.client.email}`}>{claim.client.email}</a>
                  </p>
                )}
                {claim.client.phone && (
                  <p className="fz14 mb-0">
                    <i className="flaticon-call me-1" />
                    <a href={`tel:${claim.client.phone}`}>{claim.client.phone}</a>
                  </p>
                )}
              </div>
            )}

            <div className="d-flex justify-content-between fz13 body-color">
              <span>
                {claim.request?.locationCity && `${claim.request.locationCity}`}
                {claim.request?.budgetIndication && ` · ${claim.request.budgetIndication}`}
              </span>
              <span>
                {claim.creditsSpent} credits · {new Date(claim.claimedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
