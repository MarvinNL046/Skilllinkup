"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";

const STATUS_CONFIG = {
  new:      { label: "Open",        className: "bg-warning text-dark" },
  reviewed: { label: "In progress", className: "bg-info text-white" },
  resolved: { label: "Resolved",    className: "bg-success text-white" },
};

const TYPE_CONFIG = {
  feedback: { label: "Feedback", icon: "flaticon-star" },
  bug:      { label: "Bug",      icon: "flaticon-warning" },
  feature:  { label: "Feature",  icon: "flaticon-settings" },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.new;
  return (
    <span className={`badge px-2 py-1 fz11 fw500 ${cfg.className}`} style={{ borderRadius: 8 }}>
      {cfg.label}
    </span>
  );
}

function StarRating({ value, onChange }) {
  return (
    <div className="d-flex gap-1 mb-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`fas fa-star fz18 ${star <= value ? "text-warning" : "text-muted"}`}
          style={{ cursor: "pointer" }}
          onClick={() => onChange(star)}
        />
      ))}
    </div>
  );
}

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(diff / 3600000);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(diff / 86400000);
  return `${days}d ago`;
}

export default function FeedbackInfo() {
  const { convexUser } = useConvexUser();
  const submitFeedback = useMutation(api.feedback.submit);
  const feedbackList = useQuery(
    api.feedback.getByUser,
    convexUser ? {} : "skip"
  );

  const [type, setType] = useState("feedback");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    setError("");
    try {
      await submitFeedback({
        type,
        message: message.trim(),
        rating: type === "feedback" && rating > 0 ? rating : undefined,
        pageUrl: window.location.href,
      });
      setMessage("");
      setRating(0);
      setType("feedback");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="row">
      <div className="col-12 mb-4">
        <h4 className="title fz17 mb-0">Feedback</h4>
      </div>

      {/* Submit form */}
      <div className="col-lg-5 mb-4">
        <div className="ps-widget bdrs8 p30 bdr1">
          <h6 className="mb20">Send feedback</h6>
          <form onSubmit={handleSubmit}>
            {/* Type tabs */}
            <div className="d-flex gap-2 mb20">
              {["feedback", "bug", "feature"].map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`ud-btn btn-sm ${type === t ? "btn-thm" : "btn-white"}`}
                  onClick={() => setType(t)}
                >
                  {TYPE_CONFIG[t].label}
                </button>
              ))}
            </div>

            {/* Star rating — only for feedback type */}
            {type === "feedback" && (
              <div className="mb-2">
                <label className="form-label fz14 fw500">Rating</label>
                <StarRating value={rating} onChange={setRating} />
              </div>
            )}

            <div className="mb20">
              <label className="form-label fz14 fw500">
                {type === "feedback" && "What do you think of the platform?"}
                {type === "bug" && "Describe the issue"}
                {type === "feature" && "Which feature are you missing?"}
              </label>
              <textarea
                className="form-control"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                required
              />
            </div>

            {error && <p className="text-danger fz13 mb10">{error}</p>}
            {success && (
              <p className="text-success fz13 mb10">
                Thank you! Your feedback has been received.
              </p>
            )}

            <button
              type="submit"
              className="ud-btn btn-thm w-100"
              disabled={loading || !message.trim()}
            >
              {loading ? "Submitting..." : "Submit"}
              <i className="fal fa-arrow-right-long" />
            </button>
          </form>
        </div>
      </div>

      {/* Feedback history */}
      <div className="col-lg-7 mb-4">
        <div className="ps-widget bdrs8 p30 bdr1">
          <h6 className="mb20">Your submitted feedback</h6>

          {feedbackList === undefined && (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" />
            </div>
          )}

          {feedbackList?.length === 0 && (
            <p className="text-muted fz14">You haven't submitted any feedback yet.</p>
          )}

          {feedbackList && feedbackList.length > 0 && (
            <div className="d-flex flex-column gap-3">
              {feedbackList.map((item) => (
                <div key={item._id} className="bdr1 bdrs8 p20">
                  <div className="d-flex align-items-center justify-content-between mb10">
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge bg-light text-dark fz11 fw500 px-2 py-1" style={{ borderRadius: 8 }}>
                        {TYPE_CONFIG[item.type]?.label || item.type}
                      </span>
                      {item.rating > 0 && (
                        <span className="fz12 text-warning">
                          {"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}
                        </span>
                      )}
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <StatusBadge status={item.status} />
                      <span className="fz12 text-muted">{timeAgo(item.createdAt)}</span>
                    </div>
                  </div>
                  <p className="fz14 mb-0 text-dark" style={{ whiteSpace: "pre-wrap" }}>
                    {item.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
