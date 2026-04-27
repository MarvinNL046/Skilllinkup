"use client";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../convex/_generated/api";
import StarRating from "@/components/ui/StarRating";
import useConvexUser from "@/hook/useConvexUser";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowRight, CheckCircle2, EyeOff } from "lucide-react";

export default function ReviewForm({ orderId, revieweeId, reviewerRole }) {
  const t = useTranslations("reviews");
  const { convexUser } = useConvexUser();

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

  const alreadyReviewed =
    orderReviews !== undefined &&
    convexUser?._id &&
    orderReviews.some((r) => r.reviewerId === convexUser._id);

  const isLoading = orderReviews === undefined || !convexUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (overallRating === 0) {
      setError(t("errorSelectRating"));
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
      setError(err.message || t("errorSubmitFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mt-5">
        <p className="text-sm text-[var(--text-secondary)]">{t("loadingReviewForm")}</p>
      </div>
    );
  }

  if (submitted || alreadyReviewed) {
    return (
      <div className="mt-5">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="h-5 w-5 text-success" />
          <h6 className="text-base font-semibold mb-0">
            {alreadyReviewed && !submitted ? t("alreadyReviewed") : t("thankYou")}
          </h6>
        </div>
        <p className="flex items-center gap-1 text-xs text-[var(--text-secondary)] mb-0">
          <EyeOff className="h-3 w-3" />
          {t("blindVisibilityNote")}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <h6 className="text-lg font-semibold mb-1">{t("leaveReview")}</h6>
      <p className="flex items-center gap-1 text-xs text-[var(--text-secondary)] mb-5">
        <EyeOff className="h-3 w-3" />
        {t("reviewBlindNote")}
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label className="block mb-2">
            {t("overallRating")} <span className="text-destructive">*</span>
          </Label>
          <StarRating value={overallRating} onChange={setOverallRating} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <div>
            <Label className="block mb-2 text-sm">{t("communication")}</Label>
            <StarRating
              value={communicationRating}
              onChange={setCommunicationRating}
              size="sm"
            />
          </div>
          <div>
            <Label className="block mb-2 text-sm">{t("quality")}</Label>
            <StarRating value={qualityRating} onChange={setQualityRating} size="sm" />
          </div>
          <div>
            <Label className="block mb-2 text-sm">{t("timeliness")}</Label>
            <StarRating
              value={timelinessRating}
              onChange={setTimelinessRating}
              size="sm"
            />
          </div>
          <div>
            <Label className="block mb-2 text-sm">{t("value")}</Label>
            <StarRating value={valueRating} onChange={setValueRating} size="sm" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="review-content">
            {t("writtenReview")}{" "}
            <span className="text-xs text-[var(--text-tertiary)] font-normal">
              {t("optional")}
            </span>
          </Label>
          <Textarea
            id="review-content"
            rows={4}
            placeholder={t("reviewPlaceholder")}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span
                  role="status"
                  aria-label={t("submitting")}
                  className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2"
                />
                {t("submitting")}
              </>
            ) : (
              <>
                {t("submitReview")}
                <ArrowRight className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
