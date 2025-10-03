import Link from "next/link";
import { getPublishedPosts, getFeaturedPosts } from "../lib/queries";
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
  let latestPosts: Awaited<ReturnType<typeof getPublishedPosts>> = [];

  try {
    posts = await getPublishedPosts(6, 0);
    featuredPosts = await getFeaturedPosts(3);
    latestPosts = await getPublishedPosts(6, 0);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedPlatforms posts={featuredPosts} />
        <TopRatedPlatforms posts={latestPosts} />
        <PlatformComparison />
        <HowItWorks />
        <TrendingTopics />
        <LatestReviews posts={posts} />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
