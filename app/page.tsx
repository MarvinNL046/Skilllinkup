import Link from "next/link";
import { getPublishedPosts, getFeaturedPosts } from "../lib/queries";
import { Header } from "../components/header";
import { Hero } from "../components/hero";
import { FeaturedPlatforms } from "../components/featured-platforms";
import { LatestReviews } from "../components/latest-reviews";
import { Newsletter } from "../components/newsletter";
import { Footer } from "../components/footer";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = [];
  let featuredPosts: Awaited<ReturnType<typeof getFeaturedPosts>> = [];

  try {
    posts = await getPublishedPosts(6, 0);
    featuredPosts = await getFeaturedPosts(3);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedPlatforms posts={featuredPosts} />
        <LatestReviews posts={posts} />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
