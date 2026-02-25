import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import Hero20 from "@/components/homepage/Hero20";
import Partners from "@/components/homepage/Partners";
import TrendingServices from "@/components/homepage/TrendingServices";
import BrowseCategories from "@/components/homepage/BrowseCategories";
import NeedSomething from "@/components/homepage/NeedSomething";
import CtaBanner from "@/components/homepage/CtaBanner";
import Testimonials from "@/components/homepage/Testimonials";
import InspiringWork from "@/components/homepage/InspiringWork";
import InspiringServices from "@/components/homepage/InspiringServices";
import FinalCta from "@/components/homepage/FinalCta";

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

export default async function HomePage({ params }: HomePageProps) {
 const { locale } = await params;

 let featuredGigs: FeaturedGig[] = [];
 let homepageCategories: HomepageCategory[] = [];

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

 
 <main className="flex-1">
 <div className="body_content">
 <Hero20 categories={homepageCategories} />
 <Partners />
 <TrendingServices gigs={featuredGigs} categories={homepageCategories} />
 <BrowseCategories categories={homepageCategories} />
 <NeedSomething />
 <CtaBanner />
 <Testimonials />
 <InspiringWork />
 <InspiringServices gigs={featuredGigs} />
 <FinalCta />
 </div>
 </main>
 
 </>
 );
}
