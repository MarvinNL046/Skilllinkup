'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { safeImage, safeText } from '@/lib/safe';
import { DEFAULTS } from '@/lib/defaults';

export interface ReviewData {
 id: string;
 reviewer_id: string;
 reviewer_name: string;
 reviewer_avatar: string | null;
 reviewer_role: string;
 overall_rating: number;
 communication_rating: number | null;
 quality_rating: number | null;
 timeliness_rating: number | null;
 value_rating: number | null;
 content: string | null;
 order_title?: string | null;
 created_at: string;
}

interface StarDisplayProps {
 rating: number;
 size?: number;
}

export function StarDisplay({ rating, size = 14 }: StarDisplayProps) {
 return (
 <div className="flex gap-0.5">
 {[1, 2, 3, 4, 5].map((star) =>(
 <Star
 key={star}
 size={size}
 className={
 star <= Math.round(rating)
 ? 'fill-yellow-400 text-yellow-400'
 : 'text-gray-200'
 }
 />
 ))}
 </div>
 );
}

interface RatingRowProps {
 label: string;
 rating: number | null;
}

function RatingRow({ label, rating }: RatingRowProps) {
 if (rating === null || rating === undefined) return null;
 return (
 <div className="flex items-center gap-2">
 <span className="w-36 text-xs text-gray-500 shrink-0">{label}</span>
 <StarDisplay rating={rating} size={12} />
 <span className="text-xs text-gray-500">{rating}/5</span>
 </div>
 );
}

interface ReviewDisplayProps {
 review: ReviewData;
 showOrderTitle?: boolean;
}

export default function ReviewDisplay({
 review,
 showOrderTitle = false,
}: ReviewDisplayProps) {
 const t = useTranslations('reviews');

 const avatarSrc = safeImage(review.reviewer_avatar, DEFAULTS.featureImg);
 const reviewerName = safeText(review.reviewer_name, 'Anonymous');
 const content = safeText(review.content, '');

 const formattedDate = new Date(review.created_at).toLocaleDateString('en-US', {
 year: 'numeric',
 month: 'short',
 day: 'numeric',
 });

 return (
 <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
 {/* Header: reviewer info + overall rating badge */}
 <div className="flex items-start justify-between gap-4">
 <div className="flex items-center gap-3">
 <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
 <Image
 src={avatarSrc}
 alt={reviewerName}
 fill
 className="object-cover"
 sizes="40px"
 />
 </div>
 <div>
 <p className="text-sm font-semibold text-[#1e1541]">{reviewerName}</p>
 <p className="text-xs capitalize text-gray-500">{review.reviewer_role}</p>
 </div>
 </div>

 {/* Overall rating badge */}
 <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-yellow-50 px-3 py-1">
 <Star size={14} className="fill-yellow-400 text-yellow-400" />
 <span className="text-sm font-bold text-yellow-700">
 {review.overall_rating.toFixed(1)}
 </span>
 </div>
 </div>

 {/* Star display */}
 <div className="mt-3">
 <StarDisplay rating={review.overall_rating} size={16} />
 </div>

 {/* Optional order title */}
 {showOrderTitle && review.order_title && (
 <p className="mt-2 text-xs text-gray-400">
 Order: <span className="font-medium text-gray-600">{review.order_title}</span>
 </p>
 )}

 {/* Written content */}
 {content && (
 <p className="mt-3 text-sm leading-relaxed text-gray-700">{content}</p>
 )}

 {/* Sub-category ratings */}
 {(review.communication_rating ||
 review.quality_rating ||
 review.timeliness_rating ||
 review.value_rating) && (
 <div className="mt-4 space-y-1.5 border-t border-gray-100 pt-4">
 <RatingRow label={t('communication')} rating={review.communication_rating} />
 <RatingRow label={t('quality')} rating={review.quality_rating} />
 <RatingRow label={t('timeliness')} rating={review.timeliness_rating} />
 <RatingRow label={t('value')} rating={review.value_rating} />
 </div>
 )}

 {/* Date */}
 <p className="mt-3 text-right text-xs text-gray-400">{formattedDate}</p>
 </div>
 );
}
