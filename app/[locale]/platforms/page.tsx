import { Metadata } from 'next';
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { PlatformFilters } from "@/components/platform-filters";
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface PlatformsPageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }>}): Promise<Metadata>{
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

 // Fetch platforms and categories from Convex
 let platforms: any[] = [];

 let platformCategories: Array<{ category: string; count: number }> = [];

 try {
 const rawPlatforms = await fetchQuery(api.platforms.list, { locale, limit: 50 });

 // Map Convex camelCase fields to snake_case shape expected by JSX/PlatformFilters
 platforms = rawPlatforms.map((p) => ({
 id: p._id as string,
 name: p.name,
 slug: p.slug,
 description: p.description ?? null,
 logo_url: p.logoUrl ?? null,
 website_url: p.websiteUrl ?? null,
 affiliate_link: p.affiliateLink ?? null,
 rating: p.rating ?? 0,
 rating_avg: p.rating ?? 0,
 review_count: null,
 category: p.category ?? '',
 fees: p.fees ?? null,
 difficulty: p.difficulty ?? 'Medium',
 featured: p.featured ?? false,
 pros: p.pros ?? [],
 cons: p.cons ?? [],
 features: p.features ?? [],
 status: p.status ?? 'published',
 work_type: p.workType ?? 'remote',
 countries: p.countries ?? [],
 color: '',
 published_at: p.publishedAt ? new Date(p.publishedAt) : null,
 created_at: new Date(p.createdAt),
 tagline: null,
 }));

 const rawCategories = await fetchQuery(api.platforms.getCategories, { locale });
 platformCategories = rawCategories;
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
 itemListElement: platforms.slice(0, 20).map((platform: any, index: number) =>({
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

 <main>
 {/* Page Header / Breadcrumb */}
 <section className="breadcumb-section">
 <div className="container">
 <div className="row">
 <div className="col-lg-12">
 <div className="breadcumb-style1 text-center">
 <h2 className="title">{t('title')}</h2>
 <p className="text fz17 mt10">
 {t('subtitle', { count: platforms.length })}
 </p>
 <div className="breadcumb-list mt15">
 <Link href={`/${locale}`}>Home</Link>
 <span className="mx10">/</span>
 <span className="active">Platforms</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Filters & Content */}
 <section className="pt50 pb90">
 <div className="container">
 <PlatformFilters platforms={platforms} categories={categories} />
 </div>
 </section>
 </main>
 </>
 );
}
