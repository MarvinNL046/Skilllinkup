"use client";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import StarRating from "@/components/ui/StarRating";
import useConvexUser from "@/hook/useConvexUser";

/**
 * ReviewForm - Submit a review for a completed order.
 *
 * Props:
 *   orderId      {string}  Convex ID of the order
 *   revieweeId   {string}  Convex user ID of the person being reviewed
 *   reviewerRole {string}  "client" or "freelancer"
 */
export default function ReviewForm({ orderId, revieweeId, reviewerRole }) {
  const { convexUser } = useConvexUser();

  // Fetch existing reviews for this order to check if user already reviewed
  const orderReviews = useQuery(
    api.marketplace.reviews.getByOrder,
    orderId ? { orderId } : "skip"
  );

  const createReview = useMutation(api.marketplace.reviews.create);

  const [overallRating, setOverallRating] = useState(0);
  const [communicationRating, setCommunicationRating] = useState(0);
  const [qualityRating, setQualityRating] = useState(0);
  const [timelinessRating, setTimelinessRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);
  const [content, setContent] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Check if the current user already reviewed this order
  const alreadyReviewed =
    orderReviews !== undefined &&
    convexUser?._id &&
    orderReviews.some((r) => r.reviewerId === convexUser._id);

  // Loading state while queries resolve
  const isLoading = orderReviews === undefined || !convexUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (overallRating === 0) {
      setError("Please select an overall rating.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createReview({
        orderId,
        revieweeId,
        reviewerRole,
        overallRating,
        communicationRating: communicationRating > 0 ? communicationRating : undefined,
        qualityRating: qualityRating > 0 ? qualityRating : undefined,
        timelinessRating: timelinessRating > 0 ? timelinessRating : undefined,
        valueRating: valueRating > 0 ? valueRating : undefined,
        content: content.trim() || undefined,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bsp_reveiw_wrt mt20">
        <p className="text fz14">Loading review form...</p>
      </div>
    );
  }

  if (submitted || alreadyReviewed) {
    return (
      <div className="bsp_reveiw_wrt mt20">
        <div className="d-flex align-items-center gap-2 mb10">
          <i className="fas fa-check-circle text-success fz18" />
          <h6 className="fz16 mb-0">
            {alreadyReviewed && !submitted
              ? "You have already submitted your review."
              : "Thank you! Your review has been submitted."}
          </h6>
        </div>
        <p className="text fz13 mb-0">
          <i className="fas fa-eye-slash me-1" />
          Your review will be visible once both parties have submitted their review.
        </p>
      </div>
    );
  }

  return (
    <div className="bsp_reveiw_wrt mt20">
      <h6 className="fz17 mb5">Leave a Review</h6>
      <p className="text fz13 mb20">
        <i className="fas fa-eye-slash me-1" />
        Your review will be visible after both parties have submitted their review.
      </p>

      <form className="comments_form" onSubmit={handleSubmit}>
        <div className="row">
          {/* Overall rating - required */}
          <div className="col-md-12 mb20">
            <label className="fw500 ff-heading dark-color mb-2 d-block">
              Overall Rating <span className="text-danger">*</span>
            </label>
            <StarRating value={overallRating} onChange={setOverallRating} />
          </div>

          {/* Sub-ratings */}
          <div className="col-sm-6 col-xl-3 mb20">
            <label className="fw500 ff-heading dark-color mb-2 d-block fz14">
              Communication
            </label>
            <StarRating value={communicationRating} onChange={setCommunicationRating} size="sm" />
          </div>

          <div className="col-sm-6 col-xl-3 mb20">
            <label className="fw500 ff-heading dark-color mb-2 d-block fz14">
              Quality
            </label>
            <StarRating value={qualityRating} onChange={setQualityRating} size="sm" />
          </div>

          <div className="col-sm-6 col-xl-3 mb20">
            <label className="fw500 ff-heading dark-color mb-2 d-block fz14">
              Timeliness
            </label>
            <StarRating value={timelinessRating} onChange={setTimelinessRating} size="sm" />
          </div>

          <div className="col-sm-6 col-xl-3 mb20">
            <label className="fw500 ff-heading dark-color mb-2 d-block fz14">
              Value
            </label>
            <StarRating value={valueRating} onChange={setValueRating} size="sm" />
          </div>

          {/* Written review */}
          <div className="col-md-12 mb20">
            <label className="fw500 ff-heading dark-color mb-2 d-block">
              Written Review <span className="text fz13">(optional)</span>
            </label>
            <textarea
              className="pt15"
              rows={4}
              placeholder="Share your experience working with this person..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="col-md-12 mb15">
              <div className="alert alert-danger fz14 py-2 px-3">{error}</div>
            </div>
          )}

          {/* Submit */}
          <div className="col-md-12">
            <button
              type="submit"
              className="ud-btn btn-thm fz14"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Review
                  <i className="fal fa-arrow-right-long" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
