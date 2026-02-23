'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, BadgeCheck } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { safeImage, safeText } from '@/lib/safe';

interface GigCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  images: string[];
  freelancer_name: string;
  freelancer_avatar: string | null;
  freelancer_verified: boolean;
  rating_average: number;
  rating_count: number;
  order_count: number;
  price_from: number;
  currency: string;
  work_type: string;
  location_city: string | null;
  location_country: string | null;
  category_name: string;
}

function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

export function GigCard({
  slug,
  title,
  images,
  freelancer_name,
  freelancer_avatar,
  freelancer_verified,
  rating_average,
  rating_count,
  price_from,
  currency,
  work_type,
  location_city,
  location_country,
}: GigCardProps) {
  const locale = useLocale();
  const t = useTranslations('marketplace');

  const coverImage = safeImage(
    images && images.length > 0 ? images[0] : null,
    '/images/placeholder-gig.webp'
  );

  const avatarImage = safeImage(
    freelancer_avatar,
    '/images/placeholder-avatar.webp'
  );

  const safeTitle = safeText(title, 'Untitled Service');
  const safeName = safeText(freelancer_name, 'Freelancer');

  const showLocation =
    work_type === 'local' || work_type === 'hybrid';
  const locationText = [location_city, location_country]
    .filter(Boolean)
    .join(', ');

  const workTypeBadgeLabel =
    work_type === 'local'
      ? t('local')
      : work_type === 'hybrid'
      ? t('hybrid')
      : null;

  const rating = Number(rating_average) || 0;
  const reviews = Number(rating_count) || 0;

  return (
    <Link
      href={`/${locale}/marketplace/gigs/${slug}`}
      className="group block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      {/* Cover image */}
      <div className="relative w-full aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Image
          src={coverImage}
          alt={safeTitle}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {workTypeBadgeLabel && (
          <span className="absolute top-2 left-2 bg-secondary text-white text-xs font-medium px-2 py-0.5 rounded-full">
            {workTypeBadgeLabel}
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        {/* Freelancer info */}
        <div className="flex items-center gap-2 mb-3">
          <div className="relative w-8 h-8 flex-shrink-0">
            <Image
              src={avatarImage}
              alt={safeName}
              fill
              sizes="32px"
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
              {safeName}
            </span>
            {freelancer_verified && (
              <BadgeCheck className="w-4 h-4 text-accent flex-shrink-0" aria-label="Verified" />
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-3 leading-snug">
          {safeTitle}
        </h3>

        {/* Location (for local/hybrid) */}
        {showLocation && locationText && (
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-2">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{locationText}</span>
          </div>
        )}

        {/* Rating + price */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700 mt-2">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 flex-shrink-0" />
            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
              {rating > 0 ? rating.toFixed(1) : '—'}
            </span>
            {reviews > 0 && (
              <span className="text-xs text-gray-400">({reviews})</span>
            )}
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {t('startingAt')}
            </span>
            <p className="text-sm font-bold text-primary leading-tight">
              {formatCurrency(price_from, currency)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
