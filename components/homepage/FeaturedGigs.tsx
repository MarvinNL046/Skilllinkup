'use client';

import Link from 'next/link';
import { ArrowRight, Briefcase } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { GigCard } from '@/components/marketplace/GigCard';

interface GigData {
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

interface FeaturedGigsProps {
  gigs: GigData[];
}

export function FeaturedGigs({ gigs }: FeaturedGigsProps) {
  const locale = useLocale();
  const t = useTranslations('homepage.featuredGigs');

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary dark:text-white mb-2">
              {t('title')}
            </h2>
            <p className="text-base text-text-secondary dark:text-gray-400">
              {t('subtitle')}
            </p>
          </div>
          <Link
            href={`/${locale}/marketplace/gigs`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors flex-shrink-0"
          >
            {t('browseAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {gigs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gigs.map((gig) => (
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
                rating_average={gig.rating_average}
                rating_count={gig.rating_count}
                order_count={gig.order_count}
                price_from={gig.price_from}
                currency={gig.currency}
                work_type={gig.work_type}
                location_city={gig.location_city}
                location_country={gig.location_country}
                category_name={gig.category_name}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 rounded-lg bg-background-light dark:bg-gray-900 border border-dashed border-gray-200 dark:border-gray-700">
            <Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-text-secondary dark:text-gray-400 mb-6 max-w-md mx-auto">
              {t('noGigsYet')}
            </p>
            <Link
              href={`/${locale}/marketplace/gigs`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              {t('exploreMarketplace')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
