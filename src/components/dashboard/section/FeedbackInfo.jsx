"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";

function StarRating({ value, onChange }) {
  return (
    <div className="flex gap-1 mb-3">
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

export default function FeedbackInfo() {
  const t = useTranslations("feedback");
  const { convexUser } = useConvexUser();
  const submitFeedback = useMutation(api.feedback.submit);
  const feedbackList = useQuery(
    api.feedback.getByUser,
    convexUser ? {} : "skip"
  );

  const STATUS_CONFIG = {
    new:      { label: t("statusOpen"),       className: "bg-warning text-dark" },
    reviewed: { label: t("statusInProgress"), className: "bg-info text-white" },
    resolved: { label: t("statusResolved"),   className: "bg-success text-white" },
  };

  const TYPE_CONFIG = {
    feedback: { label: t("typeFeedback"), icon: "flaticon-star" },
    bug:      { label: t("typeBug"),      icon: "flaticon-warning" },
    feature:  { label: t("typeFeature"),  icon: "flaticon-settings" },
  };

  const [type, setType] = useState("feedback");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function timeAgo(ts) {
    const diff = Date.now() - ts;
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return t("minutesAgo", { count: mins });
    const hrs = Math.floor(diff / 3600000);
    if (hrs < 24) return t("hoursAgo", { count: hrs });
    const days = Math.floor(diff / 86400000);
    return t("daysAgo", { count: days });
  }

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
      setError(t("errorGeneric"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="row">
      <div className="col-12 mb-4">
        <h4 className="title fz17 mb-0">{t("title")}</h4>
      </div>

      {/* Submit form */}
      <div className="col-lg-5 mb-4">
        <div className="ps-widget bdrs8 p30 bdr1">
          <h6 className="mb20">{t("sendFeedback")}</h6>
          <form onSubmit={handleSubmit}>
            {/* Type tabs */}
            <div className="flex gap-2 mb20">
              {["feedback", "bug", "feature"].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`ud-btn btn-sm ${type === item ? "btn-thm" : "btn-white"}`}
                  onClick={() => setType(item)}
                >
                  {TYPE_CONFIG[item].label}
                </button>
              ))}
            </div>

            {/* Star rating — only for feedback type */}
            {type === "feedback" && (
              <div className="mb-2">
                <label className="form-label fz14 fw500">{t("ratingLabel")}</label>
                <StarRating value={rating} onChange={setRating} />
              </div>
            )}

            <div className="mb20">
              <label className="form-label fz14 fw500">
                {type === "feedback" && t("promptFeedback")}
                {type === "bug" && t("promptBug")}
                {type === "feature" && t("promptFeature")}
              </label>
              <textarea
                className="form-control"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("placeholder")}
                required
              />
            </div>

            {error && <p className="text-danger fz13 mb10">{error}</p>}
            {success && (
              <p className="text-success fz13 mb10">
                {t("successMessage")}
              </p>
            )}

            <button
              type="submit"
              className="ud-btn btn-thm w-full"
              disabled={loading || !message.trim()}
            >
              {loading ? t("submitting") : t("submit")}
              <i className="fal fa-arrow-right-long" />
            </button>
          </form>
        </div>
      </div>

      {/* Feedback history */}
      <div className="col-lg-7 mb-4">
        <div className="ps-widget bdrs8 p30 bdr1">
          <h6 className="mb20">{t("yourFeedback")}</h6>

          {feedbackList === undefined && (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" />
            </div>
          )}

          {feedbackList?.length === 0 && (
            <p className="text-muted fz14">{t("noFeedbackYet")}</p>
          )}

          {feedbackList && feedbackList.length > 0 && (
            <div className="flex flex-col gap-3">
              {feedbackList.map((item) => (
                <div key={item._id} className="bdr1 bdrs8 p20">
                  <div className="flex items-center justify-between mb10">
                    <div className="flex items-center gap-2">
                      <span className="badge bg-light text-dark fz11 fw500 px-2 py-1" style={{ borderRadius: 8 }}>
                        {TYPE_CONFIG[item.type]?.label || item.type}
                      </span>
                      {item.rating > 0 && (
                        <span className="fz12 text-warning">
                          {"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`badge px-2 py-1 fz11 fw500 ${(STATUS_CONFIG[item.status] || STATUS_CONFIG.new).className}`} style={{ borderRadius: 8 }}>
                        {(STATUS_CONFIG[item.status] || STATUS_CONFIG.new).label}
                      </span>
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
