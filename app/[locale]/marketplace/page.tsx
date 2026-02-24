import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, Search } from 'lucide-react';
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { GigCard } from '@/components/marketplace/GigCard';

export const dynamic = 'force-dynamic';

interface MarketplacePageProps {
  params: Promise<{ locale: string }>;
}

export default async function MarketplacePage({ params }: MarketplacePageProps) {
  const { locale } = await params;
  const t = await getTranslations('marketplace');

  let featuredGigs: any[] = [];
  let categories: any[] = [];

  try {
    const [gigsResult, categoriesResult] = await Promise.all([
      fetchQuery(api.marketplace.gigs.list, { locale, limit: 8 }),
      fetchQuery(api.marketplace.categories.list, { locale }),
    ]);

    featuredGigs = gigsResult.map((gig: any) => ({
      id: gig._id,
      slug: gig.slug,
      title: gig.title,
      description: gig.description ?? '',
      images: gig.firstImage?.imageUrl ? [gig.firstImage.imageUrl] : [],
      freelancer_name: gig.freelancerProfile?.displayName ?? '',
      freelancer_avatar: gig.freelancerProfile?.avatarUrl ?? null,
      freelancer_verified: Boolean(gig.freelancerProfile?.isVerified),
      rating_average: gig.ratingAverage ?? 0,
      rating_count: gig.ratingCount ?? 0,
      order_count: gig.orderCount ?? 0,
      price_from: gig.minPrice ?? 0,
      currency: 'EUR',
      work_type: gig.workType ?? 'remote',
      location_city: gig.locationCity ?? null,
      location_country: gig.locationCountry ?? null,
      category_name: gig.category?.name ?? '',
    }));

    categories = categoriesResult.map((cat: any) => ({
      id: cat._id,
      name: cat.name,
      slug: cat.slug,
      icon: cat.icon ?? null,
      parent_id: cat.parentId ?? null,
      gig_count: cat.gigCount ?? 0,
    }));
  } catch (error) {
    console.error('Error fetching marketplace data:', error);
  }

  // Only show parent categories on the homepage
  const parentCategories = categories.filter((c) => !c.parent_id);

  return (
    <>
      {/* Hero section */}
      <section className="bg-gradient-to-br from-secondary to-secondary-medium text-white py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-4 leading-tight">
              {t('heroTitle')}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              {t('heroSubtitle')}
            </p>

            {/* Search bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <form action={`/${locale}/marketplace/gigs`} method="get">
                  <input
                    type="text"
                    name="search"
                    placeholder={t('searchPlaceholder')}
                    className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary text-base"
                  />
                  <button
                    type="submit"
                    className="mt-2 sm:hidden w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    {t('search')}
                  </button>
                </form>
              </div>
              <Link
                href={`/${locale}/marketplace/gigs`}
                className="hidden sm:inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors whitespace-nowrap"
              >
                {t('browseCategories')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories section */}
      {parentCategories.length > 0 && (
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 dark:text-white">
                {t('browseCategories')}
              </h2>
              <Link
                href={`/${locale}/marketplace/gigs`}
                className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              >
                {t('viewAll')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {parentCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/${locale}/marketplace/gigs?category=${category.slug}`}
                  className="group flex flex-col items-center p-4 bg-background-light dark:bg-gray-800 rounded-lg hover:bg-primary/5 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700 hover:border-primary/30 transition-all text-center"
                >
                  {/* Icon or emoji */}
                  {category.icon ? (
                    <span className="text-3xl mb-2">{category.icon}</span>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <span className="text-primary font-bold text-lg">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors leading-snug">
                    {category.name}
                  </span>
                  {Number(category.gig_count) > 0 && (
                    <span className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      {category.gig_count} {t('services')}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured gigs section */}
      <section className="py-12 bg-background-light dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 dark:text-white">
              {t('featuredGigs')}
            </h2>
            <Link
              href={`/${locale}/marketplace/gigs`}
              className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              {t('viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {featuredGigs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {featuredGigs.map((gig) => (
                <GigCard
                  key={gig.id}
                  id={gig.id}
                  slug={gig.slug}
                  title={gig.title}
                  description={gig.description}
                  images={gig.images}
                  freelancer_name={gig.freelancer_name}
                  freelancer_avatar={gig.freelancer_avatar}
                  freelancer_verified={Boolean(gig.freelancer_verified)}
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
            <div className="text-center py-12 text-gray-400 dark:text-gray-500">
              <p>{t('noResults')}</p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-10 text-center">
            <Link
              href={`/${locale}/marketplace/gigs`}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              {t('viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
