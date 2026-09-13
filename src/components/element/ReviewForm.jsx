"use client";
import { useId, useRef, useState } from "react";
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
  const contentId = useId();
  const pending = useRef(false);
  const { convexUser } = useConvexUser();

  const orderReviews = useQuery(
    api.marketplace.reviews.getByOrder,
    orderId && convexUser?._id ? { orderId } : "skip"
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

  const ownReview = orderReviews?.find((r) => r.reviewerId === convexUser?._id);
  const receivedReview = orderReviews?.find((r) => r.reviewerId !== convexUser?._id && r.isPublic);
  const alreadyReviewed = Boolean(ownReview);

  const isLoading = orderReviews === undefined || !convexUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pending.current || isLoading || submitted || alreadyReviewed) return;
    setError(null);

    if (overallRating === 0) {
      setError(t("errorSelectRating"));
      return;
    }

    if (content.trim() && (content.trim().length < 10 || content.trim().length > 3000)) {
      setError("Written reviews must be between 10 and 3,000 characters.");
      return;
    }
    pending.current = true;
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
      pending.current = false;
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
          <h3 className="text-base font-semibold mb-0">
            {alreadyReviewed && !submitted ? t("alreadyReviewed") : t("thankYou")}
          </h3>
        </div>
        {ownReview && <div className="my-3 space-y-2">
          <StarRating value={ownReview.overallRating} readOnly label="Your review" />
          {ownReview.content && <p className="whitespace-pre-wrap break-words text-sm">{ownReview.content}</p>}
        </div>}
        <p role="status" className="flex items-center gap-1 text-xs text-[var(--text-secondary)] mb-0">
          {ownReview?.isPublic ? <CheckCircle2 className="h-3 w-3 shrink-0" /> : <EyeOff className="h-3 w-3 shrink-0" />}
          {ownReview?.isPublic ? "Both reviews are now visible." : t("blindVisibilityNote")}
        </p>
        {receivedReview && <div className="mt-5 border-t pt-4 space-y-2">
          <h3 className="text-base font-semibold">Review from {reviewerRole === "client" ? "your freelancer" : "your client"}</h3>
          <StarRating value={receivedReview.overallRating} readOnly label="Received review" />
          {receivedReview.content && <p className="whitespace-pre-wrap break-words text-sm">{receivedReview.content}</p>}
        </div>}
      </div>
    );
  }

  return (
    <div className="mt-5">
      <h3 className="text-lg font-semibold mb-1">{t("leaveReview")}</h3>
      <p className="flex items-center gap-1 text-xs text-[var(--text-secondary)] mb-5">
        <EyeOff className="h-3 w-3" />
        {t("reviewBlindNote")}
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label className="block mb-2">
            {t("overallRating")} <span className="text-destructive">*</span>
          </Label>
          <StarRating value={overallRating} onChange={setOverallRating} label={t("overallRating")} disabled={isSubmitting} />
        </div>

        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))" }}>
          <div>
            <Label className="block mb-2 text-sm">{t("communication")}</Label>
            <StarRating
              value={communicationRating}
              label={t("communication")} disabled={isSubmitting}
              onChange={setCommunicationRating}
              size="sm"
            />
          </div>
          <div>
            <Label className="block mb-2 text-sm">{t("quality")}</Label>
            <StarRating value={qualityRating} onChange={setQualityRating} size="sm" label={t("quality")} disabled={isSubmitting} />
          </div>
          <div>
            <Label className="block mb-2 text-sm">{t("timeliness")}</Label>
            <StarRating
              value={timelinessRating}
              label={t("timeliness")} disabled={isSubmitting}
              onChange={setTimelinessRating}
              size="sm"
            />
          </div>
          <div>
            <Label className="block mb-2 text-sm">{t("value")}</Label>
            <StarRating value={valueRating} onChange={setValueRating} size="sm" label={t("value")} disabled={isSubmitting} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={contentId}>
            {t("writtenReview")}{" "}
            <span className="text-xs text-[var(--text-tertiary)] font-normal">
              {t("optional")}
            </span>
          </Label>
          <Textarea
            id={contentId}
            maxLength={3000}
            disabled={isSubmitting}
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
