"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowRight, Star, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

function StarRating({ value, onChange }) {
  return (
    <div role="radiogroup" aria-label="Rating" className="flex flex-wrap gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={star === value}
          aria-label={`${star} ${star === 1 ? "star" : "stars"}`}
          onClick={() => onChange(star)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border-none bg-transparent p-0 cursor-pointer hover:bg-[var(--surface-2)] transition-colors"
        >
          <Star
            className={cn(
              "h-6 w-6",
              star <= value
                ? "fill-warning text-warning"
                : "text-[var(--text-tertiary)]"
            )}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}

const STATUS_VARIANTS = {
  new: "warning",
  reviewed: "info",
  resolved: "success",
};

export default function FeedbackInfo() {
  const t = useTranslations("feedback");
  const { convexUser } = useConvexUser();
  const submitFeedback = useMutation(api.feedback.submit);
  const feedbackList = useQuery(
    api.feedback.getByUser,
    convexUser ? {} : "skip"
  );

  const STATUS_LABELS = {
    new: t("statusOpen"),
    reviewed: t("statusInProgress"),
    resolved: t("statusResolved"),
  };

  const TYPE_LABELS = {
    feedback: t("typeFeedback"),
    bug: t("typeBug"),
    feature: t("typeFeature"),
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
    <div className="space-y-6">
      <h4 className="text-xl font-semibold">{t("title")}</h4>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Submit form */}
        <Card className="lg:col-span-5">
          <CardHeader className="border-b border-[var(--border-subtle)] pb-4">
            <CardTitle className="text-base font-semibold">
              {t("sendFeedback")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Type tabs — wrap + min-touch on mobile */}
              <div
                role="tablist"
                aria-label={t("sendFeedback")}
                className="flex flex-wrap gap-2"
              >
                {["feedback", "bug", "feature"].map((item) => (
                  <Button
                    key={item}
                    type="button"
                    role="tab"
                    aria-selected={type === item}
                    variant={type === item ? "default" : "outline"}
                    size="sm"
                    onClick={() => setType(item)}
                    className="flex-1 sm:flex-initial min-w-[90px]"
                  >
                    {TYPE_LABELS[item]}
                  </Button>
                ))}
              </div>

              {/* Star rating — only for feedback type */}
              {type === "feedback" && (
                <div className="space-y-2">
                  <Label>{t("ratingLabel")}</Label>
                  <StarRating value={rating} onChange={setRating} />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="feedback-message">
                  {type === "feedback" && t("promptFeedback")}
                  {type === "bug" && t("promptBug")}
                  {type === "feature" && t("promptFeature")}
                </Label>
                <Textarea
                  id="feedback-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("placeholder")}
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert variant="success">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>{t("successMessage")}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading || !message.trim()}
              >
                {loading ? t("submitting") : t("submit")}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Feedback history */}
        <Card className="lg:col-span-7">
          <CardHeader className="border-b border-[var(--border-subtle)] pb-4">
            <CardTitle className="text-base font-semibold">
              {t("yourFeedback")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {feedbackList === undefined && (
              <div className="flex justify-center py-8">
                <div
                  role="status"
                  aria-label="Loading"
                  className="h-6 w-6 animate-spin rounded-full border-3 border-[var(--border-subtle)] border-t-primary"
                />
              </div>
            )}

            {feedbackList?.length === 0 && (
              <p className="text-sm text-[var(--text-secondary)]">
                {t("noFeedbackYet")}
              </p>
            )}

            {feedbackList && feedbackList.length > 0 && (
              <div className="flex flex-col gap-3">
                {feedbackList.map((item) => {
                  const statusVariant =
                    STATUS_VARIANTS[item.status] ?? STATUS_VARIANTS.new;
                  const statusLabel =
                    STATUS_LABELS[item.status] ?? STATUS_LABELS.new;
                  return (
                    <div
                      key={item._id}
                      className="rounded-lg border border-[var(--border-subtle)] p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="muted">
                            {TYPE_LABELS[item.type] || item.type}
                          </Badge>
                          {item.rating > 0 && (
                            <span
                              className="inline-flex items-center gap-0.5 text-xs"
                              aria-label={`${item.rating} stars`}
                            >
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  className={cn(
                                    "h-3 w-3",
                                    s <= item.rating
                                      ? "fill-warning text-warning"
                                      : "text-[var(--text-tertiary)]"
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={statusVariant}>{statusLabel}</Badge>
                          <span className="text-xs text-[var(--text-tertiary)]">
                            {timeAgo(item.createdAt)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm whitespace-pre-wrap mb-0">
                        {item.message}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
