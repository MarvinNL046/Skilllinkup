import Link from "next/link";
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getPublishedPosts, getFeaturedPosts, getTopRatedPlatforms, getTrendingPosts } from "@/lib/queries";
import { sql } from "@/lib/db";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { FeaturedPlatforms } from "@/components/featured-platforms";
import { TopRatedPlatforms } from "@/components/top-rated-platforms";
import { PlatformComparison } from "@/components/platform-comparison";
import { HowItWorks } from "@/components/how-it-works";
import { TrendingTopics } from "@/components/trending-topics";
import { LatestReviews } from "@/components/latest-reviews";
import { Testimonials } from "@/components/testimonials";
import { Newsletter } from "@/components/newsletter";
import { Footer } from "@/components/footer";
import { PopularServices } from "@/components/popular-services";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface PlatformsOverviewPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PlatformsOverviewPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'platformsOverviewPage.metadata' });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/platforms-overview`;

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [{ url: `${siteUrl}/images/og/home-og.png`, width: 1200, height: 630, alt: t('ogImageAlt') }],
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      images: [`${siteUrl}/images/og/home-og.png`],
      creator: '@SkillLinkup',
      site: '@SkillLinkup',
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'en': `${siteUrl}/en/platforms-overview`,
        'nl': `${siteUrl}/nl/platforms-overview`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function PlatformsOverviewPage({ params }: PlatformsOverviewPageProps) {
  const { locale } = await params;

  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = [];
  let featuredPosts: Awaited<ReturnType<typeof getFeaturedPosts>> = [];
  let topPlatforms: Awaited<ReturnType<typeof getTopRatedPlatforms>> = [];
  let trendingPosts: Awaited<ReturnType<typeof getTrendingPosts>> = [];

  interface FeaturedGig {
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
    category_slug: string;
    category_id: string;
  }

  interface HomepageCategory {
    id: string;
    name: string;
    slug: string;
    icon: string | null;
    gig_count: number;
  }

  let featuredGigs: FeaturedGig[] = [];
  let homepageCategories: HomepageCategory[] = [];

  try {
    posts = await getPublishedPosts(6, 0, locale);
    featuredPosts = await getFeaturedPosts(3, locale);
    topPlatforms = await getTopRatedPlatforms(6, locale);
    trendingPosts = await getTrendingPosts(6, locale);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  // Fetch marketplace data separately so a missing marketplace table doesn't break the page
  try {
    const gigsResult = await sql`
      SELECT g.id, g.title, g.slug, g.description, g.tags, g.work_type,
        g.location_city, g.location_country, g.views, g.order_count,
        g.rating_average, g.rating_count, g.is_featured, g.status, g.created_at,
        fp.display_name AS freelancer_name, fp.avatar_url AS freelancer_avatar,
        fp.rating_average AS freelancer_rating, fp.is_verified AS freelancer_verified,
        fp.id AS freelancer_id,
        mc.name AS category_name, mc.slug AS category_slug, mc.id AS category_id,
        COALESCE((SELECT MIN(price) FROM gig_packages WHERE gig_id = g.id), 0) AS price_from,
        COALESCE((SELECT currency FROM gig_packages WHERE gig_id = g.id LIMIT 1), 'EUR') AS currency,
        COALESCE(
          (SELECT ARRAY_AGG(image_url ORDER BY sort_order) FROM gig_images WHERE gig_id = g.id),
          ARRAY[]::TEXT[]
        ) AS images
      FROM gigs g
      JOIN freelancer_profiles fp ON g.freelancer_id = fp.id
      JOIN marketplace_categories mc ON g.category_id = mc.id
      WHERE g.status = 'active' AND g.locale = ${locale}
      ORDER BY g.is_featured DESC, g.rating_average DESC
      LIMIT 4
    `;

    featuredGigs = (gigsResult as FeaturedGig[]).map((row) => ({
      id: String(row.id),
      slug: String(row.slug),
      title: String(row.title),
      description: String(row.description ?? ''),
      images: Array.isArray(row.images) ? (row.images as string[]) : [],
      freelancer_name: String(row.freelancer_name ?? ''),
      freelancer_avatar: row.freelancer_avatar ? String(row.freelancer_avatar) : null,
      freelancer_verified: Boolean(row.freelancer_verified),
      rating_average: Number(row.rating_average) || 0,
      rating_count: Number(row.rating_count) || 0,
      order_count: Number(row.order_count) || 0,
      price_from: Number(row.price_from) || 0,
      currency: String(row.currency ?? 'EUR'),
      work_type: String(row.work_type ?? 'remote'),
      location_city: row.location_city ? String(row.location_city) : null,
      location_country: row.location_country ? String(row.location_country) : null,
      category_name: String(row.category_name ?? ''),
      category_slug: String(row.category_slug ?? ''),
      category_id: String(row.category_id ?? ''),
    }));

    const catsResult = await sql`
      SELECT
        mc.id,
        COALESCE(mc.name, '') AS name,
        COALESCE(mc.slug, '') AS slug,
        mc.icon,
        COALESCE(
          (SELECT COUNT(*)::int FROM gigs g
           WHERE g.category_id = mc.id AND g.status = 'active' AND g.locale = ${locale}),
          0
        ) AS gig_count
      FROM marketplace_categories mc
      WHERE mc.parent_id IS NULL AND mc.is_active = true AND mc.locale = ${locale}
      ORDER BY mc.sort_order ASC, mc.name ASC
      LIMIT 8
    `;

    homepageCategories = (catsResult as HomepageCategory[]).map((row) => ({
      id: String(row.id),
      name: String(row.name),
      slug: String(row.slug),
      icon: row.icon ? String(row.icon) : null,
      gig_count: Number(row.gig_count) || 0,
    }));
  } catch (marketplaceError) {
    console.warn('Marketplace data not available:', (marketplaceError as Error).message);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${siteUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Platforms Overview',
        item: `${siteUrl}/${locale}/platforms-overview`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <TopRatedPlatforms platforms={topPlatforms} />
        <FeaturedPlatforms posts={featuredPosts} />
        <PlatformComparison />
        <TrendingTopics posts={trendingPosts} />
        <Testimonials />
        <LatestReviews posts={posts} />
        <PopularServices gigs={featuredGigs} categories={homepageCategories} />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
