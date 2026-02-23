'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  BadgeCheck,
  Clock,
  Star,
  CheckCircle,
  Loader2,
  AlertCircle,
  Calendar,
} from 'lucide-react';
import { safeImage, safeText } from '@/lib/safe';

export interface QuoteData {
  id: string;
  quote_request_id: string;
  freelancer_id: string;
  freelancer_name: string;
  freelancer_avatar: string | null;
  freelancer_rating: number;
  freelancer_rating_count: number;
  freelancer_verified: boolean;
  freelancer_city: string | null;
  freelancer_country: string | null;
  amount: number;
  currency: string;
  description: string;
  estimated_days: number | null;
  valid_until: string | null;
  status: string;
  created_at: string;
}

interface QuoteCardProps {
  quote: QuoteData;
  isOwner: boolean;
  quoteRequestId: string;
  onAccepted?: (quoteId: string) => void;
}

function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

function formatDate(dateStr: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export function QuoteCard({
  quote,
  isOwner,
  quoteRequestId,
  onAccepted,
}: QuoteCardProps) {
  const t = useTranslations('quotes');
  const [accepting, setAccepting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const freelancerName = safeText(quote.freelancer_name, 'Freelancer');
  const avatarSrc = safeImage(
    quote.freelancer_avatar,
    '/images/placeholder-avatar.webp'
  );
  const rating = Number(quote.freelancer_rating) || 0;
  const ratingCount = Number(quote.freelancer_rating_count) || 0;
  const isAccepted = quote.status === 'accepted';
  const isRejected = quote.status === 'rejected';

  const handleAccept = async () => {
    if (accepting) return;
    setAccepting(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/marketplace/quote-request/${quoteRequestId}/accept`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quote_id: quote.id }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Failed to accept quote. Please try again.');
        return;
      }

      onAccepted?.(quote.id);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setAccepting(false);
    }
  };

  return (
    <div
      className={`flex flex-col bg-white dark:bg-gray-800 rounded-xl border p-5 transition-colors h-full ${
        isAccepted
          ? 'border-accent/50 ring-1 ring-accent/20'
          : isRejected
          ? 'border-gray-200 dark:border-gray-700 opacity-50'
          : 'border-gray-200 dark:border-gray-700 hover:border-primary/30'
      }`}
    >
      {/* Accepted badge */}
      {isAccepted && (
        <div className="flex items-center gap-1.5 mb-3 px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium w-fit">
          <CheckCircle className="w-3.5 h-3.5" />
          {t('accepted')}
        </div>
      )}

      {/* Freelancer header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="relative w-12 h-12 flex-shrink-0">
          <Image
            src={avatarSrc}
            alt={freelancerName}
            fill
            sizes="48px"
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {freelancerName}
            </span>
            {quote.freelancer_verified && (
              <BadgeCheck
                className="w-4 h-4 text-accent flex-shrink-0"
                aria-label="Verified"
              />
            )}
          </div>
          {/* Rating */}
          {rating > 0 && (
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {rating.toFixed(1)}
              </span>
              {ratingCount > 0 && (
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  ({ratingCount})
                </span>
              )}
            </div>
          )}
          {/* Location */}
          {(quote.freelancer_city || quote.freelancer_country) && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              {[quote.freelancer_city, quote.freelancer_country]
                .filter(Boolean)
                .join(', ')}
            </p>
          )}
        </div>
      </div>

      {/* Price + Delivery */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
        <div>
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(quote.amount, quote.currency)}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {t('quoteAmount')}
          </p>
        </div>
        {quote.estimated_days && (
          <div className="text-right">
            <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300 justify-end">
              <Clock className="w-4 h-4" />
              <span className="text-base font-semibold">
                {quote.estimated_days}d
              </span>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              {t('estimatedDays')}
            </p>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 line-clamp-4">
        {quote.description}
      </p>

      {/* Valid Until */}
      {quote.valid_until && (
        <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-400 dark:text-gray-500">
          <Calendar className="w-3.5 h-3.5" />
          <span>
            {t('validUntil')}: {formatDate(quote.valid_until)}
          </span>
        </div>
      )}

      {/* Accept button (owner only, pending quotes only) */}
      {isOwner && !isAccepted && !isRejected && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          {error && (
            <div className="flex items-start gap-2 mb-3 p-2.5 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}
          <button
            onClick={handleAccept}
            disabled={accepting}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {accepting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Accepting...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                {t('acceptQuote')}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
