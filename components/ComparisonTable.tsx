"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Platform {
  id: string;
  name: string;
  slug: string;
  tagline?: string | null;
  logo_url?: string | null;
  fees?: string | null;
  rating?: number | null;
  review_count?: number | null;
  category?: string | null;
  affiliate_link?: string | null;
  website_url?: string | null;
}

interface ComparisonTableProps {
  platforms: Platform[];
  locale: string;
}

type SortField = 'name' | 'rating' | 'reviews';
type SortDirection = 'asc' | 'desc';

export function ComparisonTable({ platforms, locale }: ComparisonTableProps) {
  const t = useTranslations('comparisonsPage');
  const [sortField, setSortField] = useState<SortField>('rating');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const sortedPlatforms = useMemo(() => {
    return [...platforms].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'rating':
          comparison = (Number(a.rating) || 0) - (Number(b.rating) || 0);
          break;
        case 'reviews':
          comparison = (a.review_count || 0) - (b.review_count || 0);
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [platforms, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return sortDirection === 'asc' ? (
      <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <th
      className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors select-none"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-2">
        {children}
        <SortIcon field={field} />
      </div>
    </th>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Sort Controls */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('sort.label')}:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSort('rating')}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                sortField === 'rating'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {t('sort.rating')} {sortField === 'rating' && (sortDirection === 'desc' ? '↓' : '↑')}
            </button>
            <button
              onClick={() => handleSort('name')}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                sortField === 'name'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {t('sort.name')} {sortField === 'name' && (sortDirection === 'asc' ? 'A-Z' : 'Z-A')}
            </button>
            <button
              onClick={() => handleSort('reviews')}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                sortField === 'reviews'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {t('sort.reviews')} {sortField === 'reviews' && (sortDirection === 'desc' ? '↓' : '↑')}
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <SortableHeader field="name">
                {t('table.headers.platform')}
              </SortableHeader>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                {t('table.headers.commission')}
              </th>
              <SortableHeader field="rating">
                {t('table.headers.rating')}
              </SortableHeader>
              <SortableHeader field="reviews">
                {t('table.headers.reviews')}
              </SortableHeader>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                {t('table.headers.specialization')}
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">
                {t('table.headers.action')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {sortedPlatforms.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                  {t('table.emptyState')}
                </td>
              </tr>
            ) : (
              sortedPlatforms.map((platform) => (
                <tr key={platform.id} className="hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {platform.logo_url && (
                        <img
                          src={platform.logo_url}
                          alt={platform.name}
                          className="w-10 h-10 rounded object-contain"
                        />
                      )}
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{platform.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{platform.tagline}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {platform.fees ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        {platform.fees}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400 dark:text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1 font-semibold text-gray-900 dark:text-white">
                          {Number(platform.rating).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {platform.review_count || 0} {t('table.reviewsLabel')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {platform.category ? (
                        <span
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                        >
                          {platform.category}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400 dark:text-gray-500">{t('table.emptyCategory')}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/${locale}/platforms/${platform.slug}`}
                        className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                      >
                        {t('table.viewButton')}
                      </Link>
                      {(platform.affiliate_link || platform.website_url) && (
                        <a
                          href={platform.affiliate_link ?? platform.website_url ?? '#'}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors shadow-md"
                        >
                          {t('table.visitButton')}
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
