'use client';

import Link from 'next/link';
import { Calendar, Users, MapPin, Tag, Briefcase } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { safeText } from '@/lib/safe';

interface ProjectCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  category_name: string;
  required_skills: string[];
  budget_min: number | null;
  budget_max: number | null;
  currency: string;
  deadline: string | null;
  work_type: string;
  location_city: string | null;
  location_country: string | null;
  bid_count: number;
  client_name: string;
  status: string;
  created_at: string;
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

export function ProjectCard({
  slug,
  title,
  description,
  category_name,
  required_skills,
  budget_min,
  budget_max,
  currency,
  deadline,
  work_type,
  location_city,
  location_country,
  bid_count,
  client_name,
  created_at,
}: ProjectCardProps) {
  const locale = useLocale();
  const t = useTranslations('projects');

  const safeTitle = safeText(title, 'Untitled Project');
  const safeDescription = safeText(description, '');
  const safeCategoryName = safeText(category_name, 'Uncategorized');
  const safeClientName = safeText(client_name, 'Client');

  const showLocation = work_type === 'local' || work_type === 'hybrid';
  const locationText = [location_city, location_country].filter(Boolean).join(', ');

  const workTypeBadgeLabel =
    work_type === 'local'
      ? t('local')
      : work_type === 'hybrid'
      ? t('hybrid')
      : t('remote');

  const workTypeBadgeColor =
    work_type === 'local'
      ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
      : work_type === 'hybrid'
      ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
      : 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';

  const budgetText =
    budget_min && budget_max
      ? `${formatCurrency(budget_min, currency)} – ${formatCurrency(budget_max, currency)}`
      : budget_min
      ? `From ${formatCurrency(budget_min, currency)}`
      : budget_max
      ? `Up to ${formatCurrency(budget_max, currency)}`
      : null;

  const skills = Array.isArray(required_skills) ? required_skills : [];

  return (
    <Link
      href={`/${locale}/marketplace/projects/${slug}`}
      className="group block bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-primary/30 p-5"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {safeCategoryName}
            </span>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${workTypeBadgeColor}`}
            >
              {workTypeBadgeLabel}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {safeTitle}
          </h3>
        </div>
        {budgetText && (
          <div className="text-right flex-shrink-0">
            <p className="text-xs text-gray-400 dark:text-gray-500">{t('budget')}</p>
            <p className="text-sm font-bold text-primary leading-tight">{budgetText}</p>
          </div>
        )}
      </div>

      {/* Description */}
      {safeDescription && (
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">
          {safeDescription}
        </p>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              <Tag className="w-2.5 h-2.5" />
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
              +{skills.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Footer row */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Client */}
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Briefcase className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate max-w-[100px]">{safeClientName}</span>
          </div>

          {/* Deadline */}
          {deadline && (
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{formatDate(deadline)}</span>
            </div>
          )}

          {/* Location */}
          {showLocation && locationText && (
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate max-w-[100px]">{locationText}</span>
            </div>
          )}
        </div>

        {/* Bid count */}
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
          <Users className="w-3.5 h-3.5" />
          <span>
            {bid_count} {t('bids').toLowerCase()}
          </span>
        </div>
      </div>
    </Link>
  );
}
