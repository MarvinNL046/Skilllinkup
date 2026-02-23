import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { sql } from "@/lib/db";
import { searchFreelancers } from "@/lib/marketplace-queries";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MarketplaceHero } from "@/components/homepage/MarketplaceHero";
import { CategoryGrid } from "@/components/homepage/CategoryGrid";
import { FeaturedGigs } from "@/components/homepage/FeaturedGigs";
import { MarketplaceHowItWorks } from "@/components/homepage/MarketplaceHowItWorks";
import { FeaturedFreelancers } from "@/components/homepage/FeaturedFreelancers";
import { Testimonials } from "@/components/testimonials";
import { TrustStats } from "@/components/homepage/TrustStats";
import { CTABanner } from "@/components/homepage/CTABanner";
import { Newsletter } from "@/components/newsletter";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'homePage.metadata' });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}`;

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
        'en': `${siteUrl}/en`,
        'nl': `${siteUrl}/nl`,
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

// Shared types for data fetching
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

interface MarketplaceStats {
  freelancerCount: number;
  serviceCount: number;
  satisfactionRate: number;
  orderCount: number;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  let featuredGigs: FeaturedGig[] = [];
  let homepageCategories: HomepageCategory[] = [];
  let freelancers: Awaited<ReturnType<typeof searchFreelancers>> = [];
  let stats: MarketplaceStats = { freelancerCount: 0, serviceCount: 0, satisfactionRate: 0, orderCount: 0 };

  // Fetch marketplace data (graceful degradation if tables don't exist yet)
  try {
    // Gigs - top 8 featured/rated
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
      LIMIT 8
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

    // Categories - 8 parent categories
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

    // Freelancers - top 6
    freelancers = await searchFreelancers(6, 0, locale);

    // Stats
    const statsResult = await sql`
      SELECT
        (SELECT COUNT(*)::int FROM freelancer_profiles WHERE status = 'active') AS freelancer_count,
        (SELECT COUNT(*)::int FROM gigs WHERE status = 'active') AS service_count,
        (SELECT COUNT(*)::int FROM orders WHERE status IN ('completed', 'delivered')) AS order_count,
        (SELECT COALESCE(ROUND(AVG(rating)::numeric, 0), 0)::int FROM reviews WHERE status = 'approved') AS avg_rating
    `;

    if (statsResult && statsResult.length > 0) {
      const row = statsResult[0] as { freelancer_count: number; service_count: number; order_count: number; avg_rating: number };
      stats = {
        freelancerCount: Number(row.freelancer_count) || 0,
        serviceCount: Number(row.service_count) || 0,
        orderCount: Number(row.order_count) || 0,
        satisfactionRate: Number(row.avg_rating) > 0 ? Math.min(Number(row.avg_rating) * 20, 100) : 0,
      };
    }
  } catch (marketplaceError) {
    // Marketplace tables may not exist yet - silently degrade
    console.warn('Marketplace data not available:', (marketplaceError as Error).message);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

  // Schema.org JSON-LD structured data
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SkillLinkup',
    url: siteUrl,
    description: locale === 'nl'
      ? 'Vind en huur top freelancers voor elk project. Vergelijk diensten, bekijk reviews en werk samen met vertrouwde professionals.'
      : 'Find and hire top freelancers for any project. Compare services, read reviews, and collaborate with trusted professionals.',
    inLanguage: locale === 'nl' ? 'nl-NL' : 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/${locale}/marketplace/gigs?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'SkillLinkup',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo/skilllinkup-transparant-rozepunt.webp`
      }
    }
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SkillLinkup',
    url: siteUrl,
    logo: `${siteUrl}/images/logo/skilllinkup-transparant-rozepunt.webp`,
    description: locale === 'nl'
      ? 'De marktplaats waar bedrijven en freelancers elkaar vinden. Vergelijk, huur in en groei.'
      : 'The marketplace where businesses and freelancers connect. Compare, hire, and grow.',
    sameAs: [
      'https://twitter.com/SkillLinkup',
    ],
  };

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
    ],
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />
      <main className="flex-1">
        <MarketplaceHero categories={homepageCategories} />
        <CategoryGrid categories={homepageCategories} />
        <FeaturedGigs gigs={featuredGigs} />
        <MarketplaceHowItWorks />
        <FeaturedFreelancers freelancers={freelancers} />
        <Testimonials />
        <TrustStats
          freelancerCount={stats.freelancerCount}
          serviceCount={stats.serviceCount}
          satisfactionRate={stats.satisfactionRate}
          orderCount={stats.orderCount}
        />
        <CTABanner />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
