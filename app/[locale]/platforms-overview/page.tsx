import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
// Local type definitions (previously imported from lib/queries)
interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  feature_img: string | null;
  post_format: string;
  status: string;
  published_at: Date | null;
  updated_at: Date | null;
  views: number;
  read_time: number | null;
  featured: boolean;
  sticky: boolean;
  created_at: Date;
  author_id: string | null;
  author_name: string | null;
  author_email: string | null;
  author_avatar: string | null;
  category_id: string | null;
  category_name: string | null;
  category_slug: string | null;
  tags: string[];
  meta_title: string | null;
  meta_description: string | null;
  ad_image: string | null;
  ad_link: string | null;
  platform_type: string | null;
  fee_structure: string | null;
  difficulty_level: string | null;
  best_for: string | null;
}

interface Platform {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  affiliate_link: string | null;
  rating: number;
  category: string;
  fees: string | null;
  difficulty: string;
  color: string;
  featured: boolean;
  pros: string[];
  cons: string[];
  features: string[];
  status: string;
  published_at: Date | null;
  created_at: Date;
  work_type: string;
  countries: string[];
}
import { Hero } from "@/components/hero";
import { FeaturedPlatforms } from "@/components/featured-platforms";
import { TopRatedPlatforms } from "@/components/top-rated-platforms";
import { PlatformComparison } from "@/components/platform-comparison";
import { HowItWorks } from "@/components/how-it-works";
import { TrendingTopics } from "@/components/trending-topics";
import { LatestReviews } from "@/components/latest-reviews";
import { Testimonials } from "@/components/testimonials";
import { Newsletter } from "@/components/newsletter";
import { PopularServices } from "@/components/popular-services";

export const dynamic = 'force-dynamic';

interface PlatformsOverviewPageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PlatformsOverviewPageProps): Promise<Metadata>{
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

 // Fetch blog/platform data via Convex and map to legacy shape expected by components
 let posts: Post[] = [];
 let featuredPosts: Post[] = [];
 let topPlatforms: Platform[] = [];

 interface TrendingPost {
  id: string;
  title: string;
  slug: string;
  views: number;
  category_name: string | null;
 }
 let trendingPosts: TrendingPost[] = [];

 let featuredGigs: FeaturedGig[] = [];
 let homepageCategories: HomepageCategory[] = [];

 /**
  * Map a Convex post (camelCase) to the legacy Post shape (snake_case)
  * that LatestReviews, FeaturedPlatforms, etc. expect.
  */
 function mapPost(p: any): Post {
  return {
  id: String(p._id),
  title: p.title ?? '',
  slug: p.slug ?? '',
  excerpt: p.excerpt ?? null,
  content: p.content ?? '',
  feature_img: p.featureImg ?? null,
  post_format: p.postFormat ?? 'standard',
  status: p.status ?? 'published',
  published_at: p.publishedAt ? new Date(p.publishedAt) : null,
  updated_at: p.updatedAt ? new Date(p.updatedAt) : null,
  views: p.views ?? 0,
  read_time: p.readTime ?? null,
  featured: p.featured ?? false,
  sticky: p.sticky ?? false,
  created_at: p.createdAt ? new Date(p.createdAt) : new Date(),
  author_id: p.authorId ? String(p.authorId) : null,
  author_name: p.authorName ?? p.author?.name ?? null,
  author_email: p.author?.email ?? null,
  author_avatar: p.author?.avatar ?? p.author?.image ?? null,
  category_id: p.categoryId ? String(p.categoryId) : null,
  category_name: p.category?.name ?? null,
  category_slug: p.category?.slug ?? null,
  tags: p.tags ?? [],
  meta_title: p.metaTitle ?? null,
  meta_description: p.metaDescription ?? null,
  ad_image: p.adImage ?? null,
  ad_link: p.adLink ?? null,
  platform_type: null,
  fee_structure: null,
  difficulty_level: null,
  best_for: null,
  };
 }

 /**
  * Map a Convex platform (camelCase) to the legacy Platform shape (snake_case).
  */
 function mapPlatform(p: any): Platform {
  return {
  id: String(p._id),
  name: p.name ?? '',
  slug: p.slug ?? '',
  description: p.description ?? null,
  logo_url: p.logoUrl ?? null,
  website_url: p.websiteUrl ?? null,
  affiliate_link: p.affiliateLink ?? null,
  rating: p.rating ?? 0,
  category: p.category ?? '',
  fees: p.fees ?? null,
  difficulty: p.difficulty ?? 'Medium',
  color: p.color ?? '',
  featured: p.featured ?? false,
  pros: p.pros ?? [],
  cons: p.cons ?? [],
  features: p.features ?? [],
  status: p.status ?? 'published',
  published_at: p.publishedAt ? new Date(p.publishedAt) : null,
  created_at: p.createdAt ? new Date(p.createdAt) : new Date(),
  work_type: p.workType ?? 'remote',
  countries: p.countries ?? [],
  };
 }

 try {
 const rawPosts = await fetchQuery(api.posts.list, { locale, limit: 6 });
 posts = rawPosts.map(mapPost);

 const rawFeatured = await fetchQuery(api.posts.getFeatured, { locale, limit: 3 });
 featuredPosts = rawFeatured.map(mapPost);

 const rawTop = await fetchQuery(api.platforms.getTopRated, { locale, limit: 6 });
 topPlatforms = rawTop.map(mapPlatform);

 const rawTrending = await fetchQuery(api.posts.getTrending, { locale, limit: 6 });
 trendingPosts = rawTrending.map((p: any) => ({
  id: String(p._id),
  title: p.title ?? '',
  slug: p.slug ?? '',
  views: p.views ?? 0,
  category_name: p.category?.name ?? null,
 }));
 } catch (error) {
 console.error('Error fetching data:', error);
 }

 // Fetch marketplace data separately so a missing marketplace table doesn't break the page
 try {
 const rawGigs = await fetchQuery(api['marketplace/gigs'].list, { locale, limit: 4 });

 featuredGigs = rawGigs.map((gig) => ({
 id: String(gig._id),
 slug: String(gig.slug),
 title: String(gig.title),
 description: String(gig.description ?? ''),
 images: gig.firstImage?.imageUrl ? [gig.firstImage.imageUrl] : [],
 freelancer_name: String(gig.freelancerProfile?.displayName ?? ''),
 freelancer_avatar: gig.freelancerProfile?.avatarUrl ? String(gig.freelancerProfile.avatarUrl) : null,
 freelancer_verified: Boolean(gig.freelancerProfile?.isVerified),
 rating_average: Number(gig.ratingAverage) || 0,
 rating_count: Number(gig.ratingCount) || 0,
 order_count: Number(gig.orderCount) || 0,
 price_from: Number(gig.minPrice) || 0,
 currency: 'EUR',
 work_type: String(gig.workType ?? 'remote'),
 location_city: gig.locationCity ? String(gig.locationCity) : null,
 location_country: gig.locationCountry ? String(gig.locationCountry) : null,
 category_name: String(gig.category?.name ?? ''),
 category_slug: String(gig.category?.slug ?? ''),
 category_id: gig.category?._id ? String(gig.category._id) : '',
 }));

 const rawCategories = await fetchQuery(api['marketplace/categories'].list, { locale });

 // Flatten tree to root-level categories only (parentId is null/undefined for roots)
 homepageCategories = rawCategories
 .filter((cat) => !cat.parentId)
 .slice(0, 8)
 .map((cat) => ({
 id: String(cat._id),
 name: String(cat.name),
 slug: String(cat.slug),
 icon: cat.icon ? String(cat.icon) : null,
 gig_count: Number(cat.gigCount) || 0,
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
 
 </>
 );
}
