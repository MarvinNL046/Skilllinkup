'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { GigCard } from './GigCard';
import type { GigSummary, MarketplaceCategory } from '@/lib/marketplace-queries';

interface GigFiltersProps {
  gigs: GigSummary[];
  categories: MarketplaceCategory[];
}

export function GigFilters({ gigs, categories }: GigFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('marketplace');

  const [searchInput, setSearchInput] = useState(
    searchParams.get('search') || ''
  );

  // Get current filters from URL
  const selectedCategory = searchParams.get('category') || 'all';
  const selectedWorkType = searchParams.get('work_type') || 'all';
  const sortBy = searchParams.get('sort') || 'rating';
  const searchQuery = searchParams.get('search') || '';

  // Create URL with updated params
  const createQueryString = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([name, value]) => {
        if (value === null || value === '') {
          params.delete(name);
        } else {
          params.set(name, value);
        }
      });

      return params.toString();
    },
    [searchParams]
  );

  const updateFilter = useCallback(
    (updates: Record<string, string | null>) => {
      const qs = createQueryString(updates);
      router.push(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
    },
    [router, pathname, createQueryString]
  );

  const handleSearch = useCallback(() => {
    updateFilter({ search: searchInput || null });
  }, [searchInput, updateFilter]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    },
    [handleSearch]
  );

  const clearFilters = useCallback(() => {
    setSearchInput('');
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedWorkType !== 'all' ||
    sortBy !== 'rating' ||
    searchQuery !== '';

  // Flat list of categories for the dropdown (parents only)
  const parentCategories = useMemo(
    () => categories.filter((c) => !c.parent_id),
    [categories]
  );

  // Filter and sort gigs in-memory based on URL params
  const filteredGigs = useMemo(() => {
    let filtered = gigs;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.category_name.toLowerCase().includes(q) ||
          g.freelancer_name.toLowerCase().includes(q) ||
          (g.tags && g.tags.some((tag) => tag.toLowerCase().includes(q)))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (g) => g.category_slug === selectedCategory
      );
    }

    // Work type filter
    if (selectedWorkType !== 'all') {
      filtered = filtered.filter((g) => g.work_type === selectedWorkType);
    }

    // Sort
    if (sortBy === 'rating') {
      filtered = [...filtered].sort(
        (a, b) => Number(b.rating_average) - Number(a.rating_average)
      );
    } else if (sortBy === 'newest') {
      filtered = [...filtered].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sortBy === 'price_low') {
      filtered = [...filtered].sort(
        (a, b) => Number(a.price_from) - Number(b.price_from)
      );
    } else if (sortBy === 'price_high') {
      filtered = [...filtered].sort(
        (a, b) => Number(b.price_from) - Number(a.price_from)
      );
    }

    return filtered;
  }, [gigs, searchQuery, selectedCategory, selectedWorkType, sortBy]);

  return (
    <div>
      {/* Filter bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 p-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors shrink-0"
            >
              {t('search')}
            </button>
          </div>

          {/* Category filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) =>
                updateFilter({ category: e.target.value === 'all' ? null : e.target.value })
              }
              className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
            >
              <option value="all">{t('allCategories')}</option>
              {parentCategories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Work type filter */}
          <div className="relative">
            <select
              value={selectedWorkType}
              onChange={(e) =>
                updateFilter({
                  work_type: e.target.value === 'all' ? null : e.target.value,
                })
              }
              className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
            >
              <option value="all">{t('all')}</option>
              <option value="remote">{t('remote')}</option>
              <option value="local">{t('local')}</option>
              <option value="hybrid">{t('hybrid')}</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) =>
                updateFilter({ sort: e.target.value === 'rating' ? null : e.target.value })
              }
              className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
            >
              <option value="rating">{t('sortRating')}</option>
              <option value="newest">{t('sortNewest')}</option>
              <option value="price_low">{t('sortPriceLow')}</option>
              <option value="price_high">{t('sortPriceHigh')}</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary border border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
              {t('clearFilters')}
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <Filter className="inline w-4 h-4 mr-1 -mt-0.5" />
          {t('showingResults', { count: filteredGigs.length })}
        </p>
      </div>

      {/* Gig grid */}
      {filteredGigs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredGigs.map((gig) => (
            <GigCard
              key={gig.id}
              id={gig.id}
              slug={gig.slug}
              title={gig.title}
              description={gig.description}
              images={gig.images}
              freelancer_name={gig.freelancer_name}
              freelancer_avatar={gig.freelancer_avatar}
              freelancer_verified={gig.freelancer_verified}
              rating_average={Number(gig.rating_average)}
              rating_count={Number(gig.rating_count)}
              order_count={Number(gig.order_count)}
              price_from={Number(gig.price_from)}
              currency={gig.currency}
              work_type={gig.work_type}
              location_city={gig.location_city}
              location_country={gig.location_country}
              category_name={gig.category_name}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
            {t('noResults')}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-4 text-sm text-primary hover:underline"
            >
              {t('clearFilters')}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
