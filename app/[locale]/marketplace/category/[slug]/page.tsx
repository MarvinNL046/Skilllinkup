// app/[locale]/marketplace/category/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ChevronRight, Star, Briefcase, Users, Tag } from 'lucide-react';
import { sql } from '@/lib/db';
import { GigCard } from '@/components/marketplace/GigCard';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// ============================================================
// Types
// ============================================================

interface CategoryDetail {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  image_url: string | null;
  parent_id: string | null;
  service_type: string;
  is_active: boolean;
  seo_metadata: {
    meta_title?: string;
    meta_description?: string;
    intro_paragraph?: string;
  } | null;
}

interface SubCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  gig_count: number;
}

interface GigRow {
  id: string;
  freelancer_id: string;
  freelancer_name: string;
  freelancer_avatar: string | null;
  freelancer_rating: number;
  freelancer_verified: boolean;
  title: string;
  slug: string;
  description: string;
  category_id: string;
  category_name: string;
  category_slug: string;
  tags: string[];
  work_type: string;
  location_city: string | null;
  location_country: string | null;
  price_from: number;
  currency: string;
  views: number;
  order_count: number;
  rating_average: number;
  rating_count: number;
  is_featured: boolean;
  status: string;
  images: string[];
  created_at: string;
}

// ============================================================
// Data fetching helpers
// ============================================================

async function getCategoryBySlug(
  slug: string,
  locale: string
): Promise<CategoryDetail | null> {
  try {
    const rows = await sql`
      SELECT
        id,
        COALESCE(name, '') AS name,
        COALESCE(slug, '') AS slug,
        description,
        icon,
        image_url,
        parent_id,
        COALESCE(service_type, 'digital') AS service_type,
        COALESCE(is_active, true) AS is_active,
        COALESCE(seo_metadata, '{}') AS seo_metadata
      FROM marketplace_categories
      WHERE slug = ${slug}
        AND locale = ${locale}
        AND parent_id IS NULL
        AND is_active = true
      LIMIT 1
    `;
    if (!rows || rows.length === 0) return null;
    return rows[0] as CategoryDetail;
  } catch {
    return null;
  }
}

async function getSubCategories(
  parentId: string,
  locale: string
): Promise<SubCategory[]> {
  try {
    const rows = await sql`
      SELECT
        mc.id,
        COALESCE(mc.name, '') AS name,
        COALESCE(mc.slug, '') AS slug,
        mc.description,
        mc.icon,
        COALESCE(
          (
            SELECT COUNT(*)::int
            FROM gigs g
            WHERE g.category_id = mc.id
              AND g.status = 'active'
              AND g.locale = ${locale}
          ),
          0
        ) AS gig_count
      FROM marketplace_categories mc
      WHERE mc.parent_id = ${parentId}
        AND mc.is_active = true
        AND mc.locale = ${locale}
      ORDER BY mc.sort_order ASC, mc.name ASC
    `;
    return rows as SubCategory[];
  } catch {
    return [];
  }
}

async function getGigsByCategory(
  categoryId: string,
  locale: string,
  limit = 12
): Promise<GigRow[]> {
  try {
    const rows = await sql`
      SELECT
        g.id,
        g.freelancer_id,
        COALESCE(fp.display_name, 'Unknown') AS freelancer_name,
        fp.avatar_url AS freelancer_avatar,
        COALESCE(fp.rating_average, 0) AS freelancer_rating,
        COALESCE(fp.is_verified, false) AS freelancer_verified,
        g.title,
        g.slug,
        COALESCE(g.description, '') AS description,
        g.category_id,
        COALESCE(mc.name, 'Uncategorized') AS category_name,
        COALESCE(mc.slug, '') AS category_slug,
        COALESCE(g.tags, '{}') AS tags,
        COALESCE(g.work_type, 'remote') AS work_type,
        g.location_city,
        g.location_country,
        COALESCE(
          (
            SELECT MIN(gp.price)
            FROM gig_packages gp
            WHERE gp.gig_id = g.id
          ),
          0
        ) AS price_from,
        COALESCE(
          (
            SELECT gp.currency
            FROM gig_packages gp
            WHERE gp.gig_id = g.id
            ORDER BY gp.price ASC
            LIMIT 1
          ),
          'EUR'
        ) AS currency,
        COALESCE(g.views, 0) AS views,
        COALESCE(g.order_count, 0) AS order_count,
        COALESCE(g.rating_average, 0) AS rating_average,
        COALESCE(g.rating_count, 0) AS rating_count,
        COALESCE(g.is_featured, false) AS is_featured,
        g.status,
        COALESCE(
          (
            SELECT ARRAY_AGG(gi.url ORDER BY gi.sort_order ASC)
            FROM gig_images gi
            WHERE gi.gig_id = g.id
            LIMIT 1
          ),
          '{}'
        ) AS images,
        g.created_at
      FROM gigs g
      JOIN freelancer_profiles fp ON g.freelancer_id = fp.id
      JOIN marketplace_categories mc ON g.category_id = mc.id
      WHERE g.category_id = ${categoryId}
        AND g.status = 'active'
        AND g.locale = ${locale}
      ORDER BY g.is_featured DESC, g.rating_average DESC, g.created_at DESC
      LIMIT ${limit}
    `;
    return rows as GigRow[];
  } catch {
    return [];
  }
}

async function getCategoryGigCount(
  categoryId: string,
  locale: string
): Promise<number> {
  try {
    const rows = await sql`
      SELECT COUNT(*)::int AS count
      FROM gigs
      WHERE category_id = ${categoryId}
        AND status = 'active'
        AND locale = ${locale}
    `;
    return Number(rows[0]?.count ?? 0);
  } catch {
    return 0;
  }
}

// ============================================================
// Metadata
// ============================================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const category = await getCategoryBySlug(slug, locale);

  if (!category) {
    return {
      title: 'Category Not Found | SkillLinkup',
    };
  }

  const seo = category.seo_metadata ?? {};

  // Use stored SEO metadata if available, otherwise generate defaults
  const metaTitle =
    seo.meta_title ||
    `Best ${category.name} Freelancers | SkillLinkup`;

  const metaDescription =
    seo.meta_description ||
    `Find top ${category.name} freelancers on SkillLinkup. Browse services, compare prices, and hire the best talent for your project.`;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://skilllinkup.com';

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `${baseUrl}/${locale}/marketplace/category/${slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/marketplace/category/${slug}`,
      languages: {
        en: `${baseUrl}/en/marketplace/category/${slug}`,
        nl: `${baseUrl}/nl/marketplace/category/${slug}`,
      },
    },
  };
}

// ============================================================
// Page Component
// ============================================================

export default async function MarketplaceCategoryPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations('marketplace');

  // Fetch all data in parallel
  const category = await getCategoryBySlug(slug, locale);

  if (!category) {
    notFound();
  }

  const [subCategories, gigs, gigCount] = await Promise.all([
    getSubCategories(category.id, locale),
    getGigsByCategory(category.id, locale, 12),
    getCategoryGigCount(category.id, locale),
  ]);

  const seo = category.seo_metadata ?? {};

  // Serialize gigs for GigCard
  const serializableGigs = gigs.map((gig) => ({
    id: gig.id,
    slug: gig.slug,
    title: gig.title,
    description: gig.description,
    images: Array.isArray(gig.images) ? gig.images : [],
    freelancer_name: gig.freelancer_name,
    freelancer_avatar: gig.freelancer_avatar,
    freelancer_verified: Boolean(gig.freelancer_verified),
    rating_average: Number(gig.rating_average),
    rating_count: Number(gig.rating_count),
    order_count: Number(gig.order_count),
    price_from: Number(gig.price_from),
    currency: gig.currency,
    work_type: gig.work_type,
    location_city: gig.location_city,
    location_country: gig.location_country,
    category_name: gig.category_name,
  }));

  return (
    <>
      {/* Hero / Header */}
      <section className="bg-gradient-to-br from-secondary to-secondary-medium text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-white/70 mb-6"
          >
            <Link
              href={`/${locale}/marketplace`}
              className="hover:text-white transition-colors"
            >
              {t('title') || 'Marketplace'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">{category.name}</span>
          </nav>

          <div className="flex items-start gap-4">
            {/* Category icon */}
            {category.icon ? (
              <span className="text-5xl flex-shrink-0 leading-none">
                {category.icon}
              </span>
            ) : (
              <div className="w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
            )}

            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-2">
                {category.name}
              </h1>

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80 mt-3">
                {gigCount > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4" />
                    {gigCount} {t('services') || 'services'}
                  </span>
                )}
                {subCategories.length > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4" />
                    {subCategories.length} subcategories
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Category description or SEO intro */}
          {(seo.intro_paragraph || category.description) && (
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-white/85 leading-relaxed">
              {seo.intro_paragraph || category.description}
            </p>
          )}
        </div>
      </section>

      {/* Subcategories */}
      {subCategories.length > 0 && (
        <section className="py-10 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-5">
              Browse Subcategories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {subCategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/${locale}/marketplace/gigs?category=${sub.slug}`}
                  className="group flex flex-col items-center p-3 bg-background-light dark:bg-gray-800 rounded-lg hover:bg-primary/5 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700 hover:border-primary/30 transition-all text-center"
                >
                  {sub.icon ? (
                    <span className="text-2xl mb-1.5">{sub.icon}</span>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-1.5">
                      <span className="text-primary font-bold text-sm">
                        {sub.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <span className="text-xs font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors leading-snug">
                    {sub.name}
                  </span>
                  {Number(sub.gig_count) > 0 && (
                    <span className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      {sub.gig_count}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gigs Grid */}
      <section className="py-10 bg-background-light dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 dark:text-white">
              Top {category.name} Freelancers
            </h2>
            <Link
              href={`/${locale}/marketplace/gigs?category=${category.slug}`}
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
            >
              {t('viewAll') || 'View all'}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {serializableGigs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {serializableGigs.map((gig) => (
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
            <div className="text-center py-16 text-gray-400 dark:text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="text-base">
                No {category.name} freelancers yet. Be the first to offer a
                service in this category.
              </p>
              <Link
                href={`/${locale}/dashboard/seller/gigs/new`}
                className="inline-flex items-center gap-2 mt-4 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-5 rounded-lg transition-colors text-sm"
              >
                <Star className="w-4 h-4" />
                Create a Gig
              </Link>
            </div>
          )}

          {/* See all CTA */}
          {serializableGigs.length > 0 && (
            <div className="mt-10 text-center">
              <Link
                href={`/${locale}/marketplace/gigs?category=${category.slug}`}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                {t('viewAll') || 'View all'} {category.name}{' '}
                {t('services') || 'services'}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* SEO text block (only if no intro paragraph in hero) */}
      {!seo.intro_paragraph && category.description && (
        <section className="py-10 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-4">
              About {category.name} Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {category.description}
            </p>
          </div>
        </section>
      )}
    </>
  );
}
