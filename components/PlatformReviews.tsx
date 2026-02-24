'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ReviewAvatar } from './ReviewAvatar';
import { ReviewForm } from './ReviewForm';

interface Review {
 id: string;
 user_name: string;
 user_avatar: string | null;
 user_role: string | null;
 title: string;
 content: string;
 overall_rating: number;
 ease_of_use_rating: number;
 support_rating: number;
 value_rating: number;
 pros: string[];
 cons: string[];
 project_type: string | null;
 earnings_range: string | null;
 years_experience: number | null;
 verified: boolean;
 helpful_count: number;
 created_at: string;
}

interface PlatformReviewsProps {
 platformId: string;
 platformName: string;
 locale: string;
 reviews: Review[];
}

export function PlatformReviews({ platformId, platformName, locale, reviews: initialReviews }: PlatformReviewsProps) {
 const t = useTranslations('platformReviews');
 const [showForm, setShowForm] = useState(false);
 const [reviews] = useState(initialReviews);

 // Calculate average ratings
 const averageRating = reviews.length >0
 ? reviews.reduce((sum, r) =>sum + Number(r.overall_rating), 0) / reviews.length
 : 0;

 const averageEaseOfUse = reviews.length >0
 ? reviews.reduce((sum, r) =>sum + Number(r.ease_of_use_rating), 0) / reviews.length
 : 0;

 const averageSupport = reviews.length >0
 ? reviews.reduce((sum, r) =>sum + Number(r.support_rating), 0) / reviews.length
 : 0;

 const averageValue = reviews.length >0
 ? reviews.reduce((sum, r) =>sum + Number(r.value_rating), 0) / reviews.length
 : 0;

 // Rating breakdown
 const ratingCounts = [5, 4, 3, 2, 1].map(rating =>({
 rating,
 count: reviews.filter(r =>Math.round(Number(r.overall_rating)) === rating).length,
 percentage: reviews.length >0
 ? (reviews.filter(r =>Math.round(Number(r.overall_rating)) === rating).length / reviews.length) * 100
 : 0,
 }));

 const RatingBar = ({ label, value }: { label: string; value: number }) =>(
 <div className="flex items-center gap-3">
 <span className="text-sm text-gray-600 dark:text-gray-400 w-24">{label}</span>
 <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
 <div
 className="h-full bg-yellow-400 rounded-full transition-all"
 style={{ width: `${(value / 5) * 100}%` }}
 />
 </div>
 <span className="text-sm font-semibold text-gray-900 dark:text-white w-8">{value.toFixed(1)}</span>
 </div>
 );

 return (
 <section id="reviews" className="scroll-mt-20">
 <div className="flex items-center justify-between mb-8">
 <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
 {t('userReviews')} ({reviews.length})
 </h2>
 <button
 onClick={() =>setShowForm(!showForm)}
 className="px-4 py-2 bg-primary hover:bg-primary-dark dark:bg-accent dark:hover:bg-accent-dark text-white font-heading font-semibold rounded-lg transition-colors text-sm"
 >
 {showForm ? t('cancelReview') : t('writeReview')}
 </button>
 </div>

 {/* Review Form */}
 {showForm && (
 <div className="mb-12 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6 shadow-lg">
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-6">
 {t('shareExperience', { platform: platformName })}
 </h3>
 <ReviewForm
 platformId={platformId}
 platformName={platformName}
 locale={locale}
 onSubmitSuccess={() =>setShowForm(false)}
 />
 </div>
 )}

 {/* Rating Summary */}
 {reviews.length >0 && (
 <div className="grid gap-8 lg:grid-cols-2 mb-12">
 {/* Overall Rating */}
 <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
 <div className="flex items-center gap-6">
 <div className="text-center">
 <div className="text-5xl font-heading font-bold text-gray-900 dark:text-white">
 {averageRating.toFixed(1)}
 </div>
 <div className="flex items-center justify-center mt-2">
 {[1, 2, 3, 4, 5].map((star) =>(
 <svg
 key={star}
 className={`w-5 h-5 ${star <= Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
 viewBox="0 0 24 24"
 >
 <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
 </svg>
 ))}
 </div>
 <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
 {reviews.length} {t('reviews')}
 </div>
 </div>
 <div className="flex-1 space-y-2">
 {ratingCounts.map(({ rating, count, percentage }) =>(
 <div key={rating} className="flex items-center gap-2">
 <span className="text-sm text-gray-600 dark:text-gray-400 w-3">{rating}</span>
 <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
 <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
 </svg>
 <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
 <div
 className="h-full bg-yellow-400 rounded-full transition-all"
 style={{ width: `${percentage}%` }}
 />
 </div>
 <span className="text-sm text-gray-600 dark:text-gray-400 w-6">{count}</span>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Category Ratings */}
 <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
 <h4 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">
 {t('ratingBreakdown')}
 </h4>
 <RatingBar label={t('easeOfUse')} value={averageEaseOfUse} />
 <RatingBar label={t('support')} value={averageSupport} />
 <RatingBar label={t('value')} value={averageValue} />
 </div>
 </div>
 )}

 {/* Reviews List */}
 {reviews.length === 0 ? (
 <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
 <div className="mb-4"></div>
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
 {t('noReviews')}
 </h3>
 <p className="text-gray-600 dark:text-gray-300 mb-6">
 {t('beFirst', { platform: platformName })}
 </p>
 {!showForm && (
 <button
 onClick={() =>setShowForm(true)}
 className="px-6 py-3 bg-primary hover:bg-primary-dark dark:bg-accent dark:hover:bg-accent-dark text-white font-heading font-semibold rounded-lg transition-colors"
 >
 {t('writeFirstReview')}
 </button>
 )}
 </div>
 ) : (
 <div className="space-y-6">
 {reviews.map((review) =>(
 <article
 key={review.id}
 className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
 >
 {/* Review Header */}
 <div className="flex items-start justify-between mb-4">
 <div className="flex items-center gap-3">
 <ReviewAvatar
 userAvatar={review.user_avatar}
 userName={review.user_name}
 />
 <div>
 <div className="flex items-center gap-2">
 <h4 className="font-heading font-semibold text-gray-900 dark:text-white">
 {review.user_name}
 </h4>
 {review.verified && (
 <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900 px-2 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-200">
 ✓ {t('verified')}
 </span>
 )}
 </div>
 {review.user_role && (
 <p className="text-sm text-gray-500 dark:text-gray-400">{review.user_role}</p>
 )}
 <p className="text-xs text-gray-400 dark:text-gray-500">
 {new Date(review.created_at).toLocaleDateString()}
 </p>
 </div>
 </div>
 <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 px-3 py-1.5 rounded-lg">
 <span className="text-yellow-400">★</span>
 <span className="font-heading font-semibold text-gray-900 dark:text-white">
 {Number(review.overall_rating).toFixed(1)}
 </span>
 </div>
 </div>

 {/* Review Title */}
 <h5 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-2">
 {review.title}
 </h5>

 {/* Review Content */}
 <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
 {review.content}
 </p>

 {/* Pros and Cons */}
 {(review.pros.length >0 || review.cons.length >0) && (
 <div className="grid gap-4 sm:grid-cols-2 mb-4">
 {review.pros.length >0 && (
 <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-4">
 <h6 className="text-sm font-heading font-semibold text-green-800 dark:text-green-400 mb-2 flex items-center gap-1">
 <span>✓</span>{t('pros')}
 </h6>
 <ul className="space-y-1">
 {review.pros.map((pro, index) =>(
 <li key={index} className="text-sm text-green-700 dark:text-green-300">
 • {pro}
 </li>
 ))}
 </ul>
 </div>
 )}
 {review.cons.length >0 && (
 <div className="bg-red-50 dark:bg-red-900/10 rounded-lg p-4">
 <h6 className="text-sm font-heading font-semibold text-red-800 dark:text-red-400 mb-2 flex items-center gap-1">
 <span>✗</span>{t('cons')}
 </h6>
 <ul className="space-y-1">
 {review.cons.map((con, index) =>(
 <li key={index} className="text-sm text-red-700 dark:text-red-300">
 • {con}
 </li>
 ))}
 </ul>
 </div>
 )}
 </div>
 )}

 {/* Meta Info */}
 <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-slate-700">
 {review.project_type && (
 <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
 {review.project_type}
 </span>
 )}
 {review.years_experience && (
 <span>{review.years_experience} {t('yearsExp')}</span>
 )}
 {review.earnings_range && (
 <span>{review.earnings_range}</span>
 )}
 <div className="flex items-center gap-1 ml-auto">
 <button className="hover:text-primary dark:hover:text-accent transition-colors">
 {review.helpful_count} {t('helpful')}
 </button>
 </div>
 </div>
 </article>
 ))}
 </div>
 )}
 </section>
 );
}
