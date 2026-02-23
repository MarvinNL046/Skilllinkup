'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, CheckCircle, Clock } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { safeImage, safeText, safeArray, safeNumber } from '@/lib/safe';
import type { FreelancerProfile } from '@/lib/marketplace-queries';
import { FreelancerBadges } from '@/components/marketplace/FreelancerBadges';

interface FreelancerCardProps {
  freelancer: FreelancerProfile;
}

export function FreelancerCard({ freelancer }: FreelancerCardProps) {
  const locale = useLocale();
  const t = useTranslations('freelancers');

  const displayName = safeText(freelancer.display_name, 'Unknown');
  const tagline = safeText(freelancer.tagline, '');
  const avatarUrl = safeImage(freelancer.avatar_url, '/images/placeholder-avatar.png');
  const skills = safeArray<string>(freelancer.skills);
  const rating = safeNumber(freelancer.rating_average, 0);
  const ratingCount = safeNumber(freelancer.rating_count, 0);
  const hourlyRate = freelancer.hourly_rate ? safeNumber(freelancer.hourly_rate, 0) : null;
  const locationCity = safeText(freelancer.location_city, '');
  const locationCountry = safeText(freelancer.location_country, '');
  const workType = safeText(freelancer.work_type, 'remote');

  const showLocation = (workType === 'local' || workType === 'hybrid') && (locationCity || locationCountry);
  const locationText = [locationCity, locationCountry].filter(Boolean).join(', ');

  // Show first 3-4 skills
  const visibleSkills = skills.slice(0, 4);
  const remainingSkills = skills.length > 4 ? skills.length - 4 : 0;

  const profileUrl = `/${locale}/marketplace/freelancers/${freelancer.user_id}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col">
      {/* Card Body */}
      <div className="p-5 flex-1">
        {/* Avatar + Name Row */}
        <div className="flex items-start gap-3 mb-3">
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
              <Image
                src={avatarUrl}
                alt={displayName}
                width={56}
                height={56}
                className="object-cover w-full h-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/placeholder-avatar.png';
                }}
              />
            </div>
            {freelancer.is_verified && (
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-0.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                {displayName}
              </h3>
              {freelancer.is_verified && (
                <span className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded font-medium">
                  {t('verified')}
                </span>
              )}
            </div>
            {tagline && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                {tagline}
              </p>
            )}
          </div>
        </div>

        {/* Badges Row */}
        <div className="mb-3">
          <FreelancerBadges
            profile={{
              is_verified: freelancer.is_verified,
              rating_average: safeNumber(freelancer.rating_average, 0),
              rating_count: safeNumber(freelancer.rating_count, 0),
              total_orders: safeNumber(freelancer.total_orders, 0),
              completion_rate: safeNumber(freelancer.completion_rate, 0),
              created_at: freelancer.created_at,
            }}
            locale={locale}
            layout="inline"
          />
        </div>

        {/* Rating Row */}
        <div className="flex items-center gap-3 mb-3">
          {rating > 0 ? (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {rating.toFixed(1)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({ratingCount})
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
              <Star className="w-3.5 h-3.5" />
              <span>New</span>
            </div>
          )}

          {showLocation && (
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{locationText}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {visibleSkills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {visibleSkills.map((skill) => (
              <span
                key={skill}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full"
              >
                {skill}
              </span>
            ))}
            {remainingSkills > 0 && (
              <span className="text-xs text-gray-400 dark:text-gray-500 px-1 py-0.5">
                +{remainingSkills}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
        {hourlyRate !== null && hourlyRate > 0 ? (
          <div className="text-sm">
            <span className="font-bold text-gray-900 dark:text-white">${hourlyRate}</span>
            <span className="text-gray-500 dark:text-gray-400 text-xs">{t('perHour')}</span>
          </div>
        ) : (
          <div className="text-xs text-gray-400 dark:text-gray-500">
            {t('hourlyRate')}: —
          </div>
        )}

        <Link
          href={profileUrl}
          className="text-xs font-medium text-[#ef2b70] hover:text-[#d4235f] transition-colors"
        >
          {t('viewProfile')} &rarr;
        </Link>
      </div>
    </div>
  );
}
