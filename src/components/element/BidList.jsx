"use client";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Image from "next/image";

export default function BidList({ projectId, isOwner }) {
  const bids = useQuery(api.marketplace.projects.getBids, { projectId });
  const acceptBid = useMutation(api.marketplace.projects.acceptBid);
  const [acceptingId, setAcceptingId] = useState(null);
  const [acceptError, setAcceptError] = useState("");

  const handleAccept = async (bidId) => {
    setAcceptingId(bidId);
    setAcceptError("");
    try {
      await acceptBid({ bidId });
    } catch (err) {
      setAcceptError(err.message || "Failed to accept bid");
    } finally {
      setAcceptingId(null);
    }
  };

  if (bids === undefined) {
    return (
      <p className="text mb20">Loading proposals...</p>
    );
  }

  if (!bids || bids.length === 0) {
    return (
      <p className="text mb20">No proposals yet. Be the first to submit!</p>
    );
  }

  // Compute average bid amount
  const avgAmount =
    bids.length > 0
      ? (bids.reduce((sum, b) => sum + b.amount, 0) / bids.length).toFixed(0)
      : null;

  return (
    <div>
      {isOwner && avgAmount && (
        <p className="text fz14 mb20">
          <i className="flaticon-dollar vam me-1 text-thm2"></i>
          Average bid: <strong>${avgAmount}</strong>
        </p>
      )}
      {acceptError && (
        <div className="alert alert-danger mb20 bdrs8 p15">
          <i className="fas fa-exclamation-circle me-2"></i>
          {acceptError}
        </div>
      )}
      <div className="bids-list">
        {bids.map((bid) => (
          <div
            key={bid._id}
            className={`d-flex align-items-start mb20 pb20 bdrb1 ${
              bid.status === "accepted" ? "bid-accepted" : ""
            }`}
          >
            {/* Freelancer avatar */}
            <div className="thumb flex-shrink-0 me-3">
              {bid.freelancerAvatar ? (
                <Image
                  src={bid.freelancerAvatar}
                  alt={bid.freelancerName}
                  width={50}
                  height={50}
                  className="rounded-circle"
                />
              ) : (
                <div
                  className="rounded-circle bg-secondary d-flex align-items-center justify-content-center"
                  style={{ width: 50, height: 50 }}
                >
                  <span className="text-white fw600 fz16">
                    {bid.freelancerName?.charAt(0)?.toUpperCase() || "?"}
                  </span>
                </div>
              )}
            </div>

            {/* Bid details */}
            <div className="flex-grow-1">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                <div>
                  <h6 className="mb-0">
                    {bid.freelancerName}
                    {bid.freelancerVerified && (
                      <i
                        className="fas fa-check-circle text-thm fz12 ms-1"
                        title="Verified freelancer"
                      ></i>
                    )}
                  </h6>
                  {bid.freelancerRating > 0 && (
                    <p className="mb-0 fz12 text">
                      <i className="fas fa-star fz10 review-color me-1"></i>
                      {bid.freelancerRating.toFixed(1)}
                    </p>
                  )}
                </div>
                <div className="text-end">
                  <p className="mb-0 fw600 dark-color">
                    ${bid.amount}
                  </p>
                  <p className="mb-0 fz12 text">{bid.deliveryDays} days</p>
                </div>
              </div>

              {/* Pitch / proposal text */}
              <p className="text fz14 mt10 mb10">{bid.pitch}</p>

              {/* Status badge */}
              {bid.status === "accepted" && (
                <span className="badge badge-thm fz12 px-2 py-1 bdrs4">
                  Accepted
                </span>
              )}

              {/* Accept button — only for owner, only for pending bids */}
              {isOwner && bid.status === "pending" && (
                <button
                  className="ud-btn btn-thm-border btn-sm mt10"
                  onClick={() => handleAccept(bid._id)}
                  disabled={acceptingId === bid._id}
                  style={{ fontSize: "13px", padding: "6px 16px" }}
                >
                  {acceptingId === bid._id ? "Accepting..." : "Accept Bid"}
                  <i className="fal fa-check ms-1"></i>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
