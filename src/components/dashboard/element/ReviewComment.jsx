"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Star, Flag } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ReviewComment({ review, i, lenght }) {
  const t = useTranslations("reviews");

  const reviewerName = review?.reviewerName ?? t("anonymous");
  const reviewerAvatar = review?.reviewerAvatar ?? "/images/blog/comments-2.png";
  const rating = review?.overallRating ?? 5;
  const content = review?.content ?? "";
  const orderTitle = review?.orderTitle ?? null;
  const isLast = i + 1 === lenght;

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const diff = Date.now() - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return t("today");
    if (days === 1) return t("yesterday");
    if (days < 30) return t("daysAgo", { count: days });
    const months = Math.floor(days / 30);
    if (months === 1) return t("monthAgo");
    if (months < 12) return t("monthsAgo", { count: months });
    return t("yearsAgo", { count: Math.floor(months / 12) });
  };

  return (
    <div
      className={cn(
        "pb-5",
        !isLast && "border-b border-[var(--border-subtle)]"
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 relative pt-4">
        <Image
          height={60}
          width={60}
          src={reviewerAvatar}
          alt={reviewerName}
          className="rounded-full flex-shrink-0"
          onError={(e) => {
            e.currentTarget.src = "/images/blog/comments-2.png";
          }}
        />
        <div className="flex-1 min-w-0 sm:pr-12">
          <Button asChild variant="ghost" size="icon" className="absolute right-0 top-4">
            <Link href="/dashboard/support" aria-label="Get help with this review"><Flag /></Link>
          </Button>
          <h3 className="text-base font-semibold mb-1 break-words">{reviewerName}</h3>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div className="inline-flex items-center gap-1">
              <Star className="h-3 w-3 fill-warning text-warning" aria-hidden="true" />
              <span className="font-medium">{rating.toFixed(1)}</span>
            </div>
            {review?.createdAt && (
              <span className="text-[var(--text-secondary)]">
                {formatDate(review.createdAt)}
              </span>
            )}
            {orderTitle && (
              review.orderId
                ? <Link href={`/orders/${review.orderId}#workspace-review`} className="text-[var(--action-link-text)] underline">{orderTitle}</Link>
                : <span className="text-[var(--text-secondary)] italic">{orderTitle}</span>
            )}
          </div>
        </div>
      </div>
      {content && (
        <p className="text-sm text-[var(--text-secondary)] mt-4 mb-4 whitespace-pre-wrap break-words">{content}</p>
      )}
    </div>
  );
}
