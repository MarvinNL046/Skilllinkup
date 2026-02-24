'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface RatingCategory {
 key: string;
 labelKey: string;
}

const RATING_CATEGORIES: RatingCategory[] = [
 { key: 'overall_rating', labelKey: 'overallRating' },
 { key: 'communication_rating', labelKey: 'communication' },
 { key: 'quality_rating', labelKey: 'quality' },
 { key: 'timeliness_rating', labelKey: 'timeliness' },
 { key: 'value_rating', labelKey: 'value' },
];

interface ReviewFormData {
 overall_rating: number;
 communication_rating: number;
 quality_rating: number;
 timeliness_rating: number;
 value_rating: number;
 content: string;
}

interface OrderReviewFormProps {
 orderId: string;
 /** Whether this user has already submitted a review */
 alreadyReviewed?: boolean;
 /** Whether both parties have now submitted reviews */
 bothSubmitted?: boolean;
 onSuccess?: () =>void;
}

function StarRatingInput({
 value,
 onChange,
 label,
}: {
 value: number;
 onChange: (val: number) =>void;
 label: string;
}) {
 const [hovered, setHovered] = useState(0);

 return (
 <div className="flex items-center gap-3">
 <span className="w-40 text-sm text-gray-600 shrink-0">{label}</span>
 <div className="flex gap-1">
 {[1, 2, 3, 4, 5].map((star) =>(
 <button
 key={star}
 type="button"
 onClick={() =>onChange(star)}
 onMouseEnter={() =>setHovered(star)}
 onMouseLeave={() =>setHovered(0)}
 className="focus:outline-none transition-transform hover:scale-110"
 aria-label={`${star} star`}
 >
 <Star
 size={24}
 className={
 star <= (hovered || value)
 ? 'fill-yellow-400 text-yellow-400'
 : 'text-gray-300'
 }
 />
 </button>
 ))}
 </div>
 {value >0 && (
 <span className="text-sm text-gray-500">{value}/5</span>
 )}
 </div>
 );
}

export default function OrderReviewForm({
 orderId,
 alreadyReviewed = false,
 bothSubmitted = false,
 onSuccess,
}: OrderReviewFormProps) {
 const t = useTranslations('reviews');

 const [formData, setFormData] = useState<ReviewFormData>({
 overall_rating: 0,
 communication_rating: 0,
 quality_rating: 0,
 timeliness_rating: 0,
 value_rating: 0,
 content: '',
 });
 const [submitting, setSubmitting] = useState(false);
 const [submitted, setSubmitted] = useState(alreadyReviewed);
 const [error, setError] = useState<string | null>(null);

 const charCount = formData.content.length;
 const charMin = 20;
 const charMax = 500;
 const contentValid = charCount >= charMin && charCount <= charMax;

 function setRating(key: string, val: number) {
 setFormData((prev) =>({ ...prev, [key]: val }));
 }

 async function handleSubmit(e: React.FormEvent) {
 e.preventDefault();
 setError(null);

 if (formData.overall_rating === 0) {
 setError('Please provide an overall rating.');
 return;
 }
 if (!contentValid) {
 setError(`Review must be between ${charMin} and ${charMax} characters.`);
 return;
 }

 setSubmitting(true);
 try {
 const res = await fetch(`/api/marketplace/orders/${orderId}/review`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
 overall_rating: formData.overall_rating,
 communication_rating: formData.communication_rating || undefined,
 quality_rating: formData.quality_rating || undefined,
 timeliness_rating: formData.timeliness_rating || undefined,
 value_rating: formData.value_rating || undefined,
 content: formData.content,
 }),
 });

 const data = await res.json();

 if (!res.ok) {
 setError(data.error ?? 'Failed to submit review. Please try again.');
 return;
 }

 setSubmitted(true);
 onSuccess?.();
 } catch {
 setError('An unexpected error occurred. Please try again.');
 } finally {
 setSubmitting(false);
 }
 }

 // Already reviewed - show waiting/done state
 if (submitted) {
 return (
 <div className="rounded-xl border border-green-200 bg-green-50 p-6">
 <div className="flex items-start gap-3">
 <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
 <Star size={16} className="fill-green-600 text-green-600" />
 </div>
 <div>
 <p className="font-medium text-green-800">
 {bothSubmitted ? t('bothSubmitted') : t('submitted')}
 </p>
 {!bothSubmitted && (
 <p className="mt-1 text-sm text-green-700">{t('waitingForOther')}</p>
 )}
 </div>
 </div>
 </div>
 );
 }

 return (
 <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
 <h3 className="mb-6 font-heading text-xl font-semibold text-[#1e1541]">
 {t('leaveReview')}
 </h3>

 <form onSubmit={handleSubmit} className="space-y-5">
 {/* Star rating inputs */}
 <div className="space-y-4">
 {RATING_CATEGORIES.map(({ key, labelKey }) =>(
 <StarRatingInput
 key={key}
 label={t(labelKey as Parameters<typeof t>[0])}
 value={formData[key as keyof ReviewFormData] as number}
 onChange={(val) =>setRating(key, val)}
 />
 ))}
 </div>

 {/* Written review */}
 <div className="pt-2">
 <label
 htmlFor="review-content"
 className="mb-1.5 block text-sm font-medium text-gray-700"
 >
 {t('writtenReview')}
 </label>
 <textarea
 id="review-content"
 rows={4}
 value={formData.content}
 onChange={(e) =>
 setFormData((prev) =>({ ...prev, content: e.target.value }))
 }
 placeholder={t('reviewPlaceholder')}
 maxLength={charMax}
 className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-[#ef2b70] focus:outline-none focus:ring-2 focus:ring-[#ef2b70]/20 resize-none"
 />
 <div className="mt-1 flex items-center justify-between">
 <span className="text-xs text-gray-400">{t('minChars')}</span>
 <span
 className={`text-xs ${
 charCount < charMin
 ? 'text-gray-400'
 : charCount >charMax
 ? 'text-red-500'
 : 'text-green-600'
 }`}
 >
 {charCount}/{charMax}
 </span>
 </div>
 </div>

 {/* Error */}
 {error && (
 <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
 {error}
 </p>
 )}

 {/* Submit */}
 <button
 type="submit"
 disabled={submitting || formData.overall_rating === 0 || !contentValid}
 className="w-full rounded-lg bg-[#ef2b70] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
 >
 {submitting ? t('submitting') : t('submitReview')}
 </button>
 </form>
 </div>
 );
}
