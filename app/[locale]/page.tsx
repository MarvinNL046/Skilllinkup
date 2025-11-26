import Link from "next/link";
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getPublishedPosts, getFeaturedPosts, getTopRatedPlatforms, getTrendingPosts } from "@/lib/queries";
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

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = [];
  let featuredPosts: Awaited<ReturnType<typeof getFeaturedPosts>> = [];
  let topPlatforms: Awaited<ReturnType<typeof getTopRatedPlatforms>> = [];
  let trendingPosts: Awaited<ReturnType<typeof getTrendingPosts>> = [];

  try {
    posts = await getPublishedPosts(6, 0, locale);
    featuredPosts = await getFeaturedPosts(3, locale);
    topPlatforms = await getTopRatedPlatforms(6, locale);
    trendingPosts = await getTrendingPosts(6, locale);

    console.log('📊 Data fetched:', {
      locale,
      posts: posts.length,
      featuredPosts: featuredPosts.length,
      topPlatforms: topPlatforms.length,
      trendingPosts: trendingPosts.length
    });
  } catch (error) {
    console.error('❌ Error fetching data:', error);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

  // Schema.org JSON-LD structured data for SEO
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SkillLinkup',
    url: siteUrl,
    description: locale === 'nl'
      ? 'Vergelijk en ontdek de beste freelance platforms voor jouw vaardigheden. Eerlijke reviews, gedetailleerde vergelijkingen en expert inzichten.'
      : 'Compare and discover the best freelance platforms for your skills. Honest reviews, detailed comparisons, and expert insights.',
    inLanguage: locale === 'nl' ? 'nl-NL' : 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/${locale}/search?q={search_term_string}`
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
      ? 'Het ultieme platform om freelance platforms te vergelijken en te ontdekken.'
      : 'The ultimate platform to compare and discover freelance platforms.',
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
        <Hero />
        <HowItWorks />
        <TopRatedPlatforms platforms={topPlatforms} />
        <FeaturedPlatforms posts={featuredPosts} />
        <PlatformComparison />
        <TrendingTopics posts={trendingPosts} />
        <Testimonials />
        <LatestReviews posts={posts} />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
