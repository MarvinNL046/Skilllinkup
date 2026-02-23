'use client';

import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ReviewDisplay, { ReviewData } from './ReviewDisplay';

interface CategoryAverage {
  label: string;
  value: number | null;
}

interface ReviewListProps {
  reviews: ReviewData[];
  /** Overall average rating across all reviews */
  averageRating?: number;
  /** Total review count (may differ from reviews.length if paginated) */
  totalCount?: number;
}

function RatingBar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
      <div
        className="h-full rounded-full bg-yellow-400 transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function CategoryBreakdown({
  label,
  value,
}: {
  label: string;
  value: number | null;
}) {
  if (value === null || value === undefined) return null;
  return (
    <div className="flex items-center gap-3">
      <span className="w-36 text-sm text-gray-600 shrink-0">{label}</span>
      <div className="flex-1">
        <RatingBar value={value} />
      </div>
      <span className="w-8 text-right text-sm font-medium text-gray-700">
        {value.toFixed(1)}
      </span>
    </div>
  );
}

function computeAverage(reviews: ReviewData[], key: keyof ReviewData): number | null {
  const vals = reviews
    .map((r) => r[key] as number | null)
    .filter((v): v is number => v !== null && v !== undefined);
  if (vals.length === 0) return null;
  return vals.reduce((s, v) => s + v, 0) / vals.length;
}

export default function ReviewList({
  reviews,
  averageRating,
  totalCount,
}: ReviewListProps) {
  const t = useTranslations('reviews');

  const displayTotal = totalCount ?? reviews.length;
  const displayAvg =
    averageRating ??
    (reviews.length > 0
      ? reviews.reduce((s, r) => s + r.overall_rating, 0) / reviews.length
      : 0);

  const commAvg = computeAverage(reviews, 'communication_rating');
  const qualAvg = computeAverage(reviews, 'quality_rating');
  const timeAvg = computeAverage(reviews, 'timeliness_rating');
  const valAvg = computeAverage(reviews, 'value_rating');

  const categories: CategoryAverage[] = [
    { label: t('communication'), value: commAvg },
    { label: t('quality'), value: qualAvg },
    { label: t('timeliness'), value: timeAvg },
    { label: t('value'), value: valAvg },
  ];

  const hasBreakdown = categories.some((c) => c.value !== null);

  if (reviews.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center">
        <Star size={32} className="mx-auto mb-3 text-gray-300" />
        <p className="text-sm text-gray-500">{t('noReviews')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary header */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-heading text-lg font-semibold text-[#1e1541]">
          {t('title')}
        </h3>

        {/* Overall score */}
        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-yellow-50">
            <span className="text-2xl font-bold text-yellow-600">
              {displayAvg.toFixed(1)}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  className={
                    star <= Math.round(displayAvg)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-200'
                  }
                />
              ))}
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {t('basedOn')} {displayTotal} {t('reviewsCount')}
            </p>
          </div>
        </div>

        {/* Category breakdown */}
        {hasBreakdown && (
          <>
            <p className="mb-3 text-sm font-medium text-gray-700">
              {t('ratingBreakdown')}
            </p>
            <div className="space-y-3">
              {categories.map((cat) => (
                <CategoryBreakdown
                  key={cat.label}
                  label={cat.label}
                  value={cat.value}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Individual reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewDisplay key={review.id} review={review} showOrderTitle />
        ))}
      </div>
    </div>
  );
}
