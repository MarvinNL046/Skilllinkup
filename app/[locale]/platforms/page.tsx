import { Metadata } from 'next';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getPublishedPlatforms, getPlatformCategories } from "@/lib/queries";
import { PlatformFilters } from "@/components/platform-filters";
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PlatformsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'platformsPage.metadata' });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/platforms`;

  return {
    title: t('title'),
    description: t('description'),

    // Keywords
    keywords: t('keywords'),

    // Canonical URL with language alternates
    alternates: {
      canonical: pageUrl,
      languages: {
        'en': `${siteUrl}/en/platforms`,
        'nl': `${siteUrl}/nl/platforms`,
      },
    },

    // Open Graph (Facebook, LinkedIn, etc.)
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [
        {
          url: `${siteUrl}/images/og/platforms-og.png`,
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        }
      ],
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: 'website',
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${siteUrl}/images/og/platforms-og.png`],
      creator: '@SkillLinkup',
      site: '@SkillLinkup',
    },

    // Robots
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

export default async function PlatformsPage({ params }: PlatformsPageProps) {
  const { locale } = await params;
  const t = await getTranslations('platformsPage');

  let platforms: Awaited<ReturnType<typeof getPublishedPlatforms>> = [];
  let platformCategories: Awaited<ReturnType<typeof getPlatformCategories>> = [];

  try {
    platforms = await getPublishedPlatforms(50, locale);
    platformCategories = await getPlatformCategories(locale);
  } catch (error) {
    console.error('Error fetching platforms:', error);
  }

  // Add "All Platforms" category
  const categories = [
    { category: t('allPlatformsCategory'), count: platforms.length },
    ...platformCategories,
  ];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

  // Structured data for SEO
  const platformsListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: locale === 'nl' ? 'Freelance Platforms Vergelijken' : 'Compare Freelance Platforms',
    description: locale === 'nl'
      ? 'Ontdek en vergelijk de beste freelance platforms. Vind het perfecte platform voor jouw vaardigheden.'
      : 'Discover and compare the best freelance platforms. Find the perfect platform for your skills.',
    url: `${siteUrl}/${locale}/platforms`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: platforms.length,
      itemListElement: platforms.slice(0, 20).map((platform: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: platform.name,
          description: platform.tagline || platform.description,
          url: `${siteUrl}/${locale}/platforms/${platform.slug}`,
          aggregateRating: platform.rating ? {
            '@type': 'AggregateRating',
            ratingValue: Number(platform.rating).toFixed(1),
            bestRating: 5,
            worstRating: 1,
            reviewCount: platform.review_count || 0,
          } : undefined,
        },
      })),
    },
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
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'nl' ? 'Platforms' : 'Platforms',
        item: `${siteUrl}/${locale}/platforms`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(platformsListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white sm:text-5xl mb-4">
                {t('title')}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {t('subtitle', { count: platforms.length })}
              </p>
            </div>
          </div>
        </section>

        {/* Filters & Content */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <PlatformFilters platforms={platforms} categories={categories} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
