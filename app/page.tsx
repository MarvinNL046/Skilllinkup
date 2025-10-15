import Link from "next/link";
import { getPublishedPosts, getFeaturedPosts, getTopRatedPlatforms, getTrendingPosts } from "../lib/queries";
import { Header } from "../components/header";
import { Hero } from "../components/hero";
import { FeaturedPlatforms } from "../components/featured-platforms";
import { TopRatedPlatforms } from "../components/top-rated-platforms";
import { PlatformComparison } from "../components/platform-comparison";
import { HowItWorks } from "../components/how-it-works";
import { TrendingTopics } from "../components/trending-topics";
import { LatestReviews } from "../components/latest-reviews";
import { Testimonials } from "../components/testimonials";
import { Newsletter } from "../components/newsletter";
import { Footer } from "../components/footer";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = [];
  let featuredPosts: Awaited<ReturnType<typeof getFeaturedPosts>> = [];
  let topPlatforms: Awaited<ReturnType<typeof getTopRatedPlatforms>> = [];
  let trendingPosts: Awaited<ReturnType<typeof getTrendingPosts>> = [];

  try {
    posts = await getPublishedPosts(6, 0);
    featuredPosts = await getFeaturedPosts(3);
    topPlatforms = await getTopRatedPlatforms(6);
    trendingPosts = await getTrendingPosts(6);

    console.log('📊 Data fetched:', {
      posts: posts.length,
      featuredPosts: featuredPosts.length,
      topPlatforms: topPlatforms.length,
      trendingPosts: trendingPosts.length
    });
  } catch (error) {
    console.error('❌ Error fetching data:', error);
  }

  // Schema.org JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SkillLinkup',
    url: 'https://skilllinkup.com',
    description: 'Compare and discover the best freelance platforms for your skills. Honest reviews, detailed comparisons, and expert insights.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://skilllinkup.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'SkillLinkup',
      logo: {
        '@type': 'ImageObject',
        url: 'https://skilllinkup.com/images/logo/skilllinkup-transparant-rozepunt.webp'
      }
    }
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
