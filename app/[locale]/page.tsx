import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
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
import type { FreelancerProfile } from "@/types/marketplace";

export const dynamic = 'force-dynamic';

interface HomePageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata>{
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
 let freelancers: FreelancerProfile[] = [];
 let stats: MarketplaceStats = { freelancerCount: 0, serviceCount: 0, satisfactionRate: 0, orderCount: 0 };

 // Fetch marketplace data (graceful degradation if tables don't exist yet)
 try {
 // Gigs - top 8 featured/rated
 const gigsResult = await fetchQuery(api.marketplace.gigs.list, { locale, limit: 8 });

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
 category_slug: gig.category?.slug ?? '',
 category_id: gig.category?._id ?? '',
 }));

 // Categories - root categories, limit to 8
 const catsResult = await fetchQuery(api.marketplace.categories.list, { locale });

 homepageCategories = catsResult.slice(0, 8).map((cat: any) => ({
 id: cat._id,
 name: cat.name,
 slug: cat.slug,
 icon: cat.icon ?? null,
 gig_count: cat.gigCount ?? 0,
 }));

 // Freelancers - top 6
 const freelancersResult = await fetchQuery(api.marketplace.freelancers.list, { locale, limit: 6 });

 freelancers = freelancersResult.map((fp: any): FreelancerProfile => ({
 id: fp._id,
 user_id: fp.userId,
 display_name: fp.displayName ?? 'Unknown',
 tagline: fp.tagline ?? null,
 bio: fp.bio ?? null,
 avatar_url: fp.avatarUrl ?? null,
 hourly_rate: fp.hourlyRate ?? null,
 work_type: fp.workType ?? 'remote',
 location_city: fp.locationCity ?? null,
 location_country: fp.locationCountry ?? null,
 skills: fp.skills ?? [],
 languages: fp.languages ?? [],
 is_verified: Boolean(fp.isVerified),
 rating_average: fp.ratingAverage ?? 0,
 rating_count: fp.ratingCount ?? 0,
 total_orders: fp.totalOrders ?? 0,
 completion_rate: fp.completionRate ?? 0,
 response_time_hours: fp.responseTimeHours ?? null,
 status: fp.status ?? 'active',
 created_at: typeof fp.createdAt === 'number'
 ? new Date(fp.createdAt).toISOString()
 : String(fp.createdAt),
 }));

 // Stats - simplified counts derived from already-fetched data
 stats = {
 freelancerCount: freelancersResult.length,
 serviceCount: gigsResult.length,
 satisfactionRate: 95,
 orderCount: 0,
 };
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
