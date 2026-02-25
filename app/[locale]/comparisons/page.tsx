import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Metadata } from 'next';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { ComparisonTable } from '@/components/ComparisonTable';

interface PageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata>{
 const { locale } = await params;
 const t = await getTranslations({ locale, namespace: 'comparisonsPage.metadata' });

 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/comparisons`;

 return {
 title: t('title'),
 description: t('description'),
 keywords: t('keywords'),
 openGraph: {
 title: t('ogTitle'),
 description: t('ogDescription'),
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/comparisons-og.png`, width: 1200, height: 630, alt: t('ogImageAlt') }],
 locale: locale === 'nl' ? 'nl_NL' : 'en_US',
 type: 'website',
 },
 twitter: {
 card: 'summary_large_image',
 title: t('twitterTitle'),
 description: t('twitterDescription'),
 images: [`${siteUrl}/images/og/comparisons-og.png`],
 creator: '@SkillLinkup',
 site: '@SkillLinkup',
 },
 alternates: {
 canonical: pageUrl,
 languages: {
 'en': `${siteUrl}/en/comparisons`,
 'nl': `${siteUrl}/nl/comparisons`,
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

export default async function ComparisonsPage({ params }: PageProps) {
 const { locale } = await params;
 const t = await getTranslations({ locale, namespace: 'comparisonsPage' });
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

 const rawPlatforms = await fetchQuery(api.platforms.list, { locale, limit: 100 });

 // Map Convex camelCase to snake_case expected by ComparisonTable
 const platforms = rawPlatforms.map((p) => ({
   id: p._id,
   name: p.name,
   slug: p.slug,
   tagline: (p as any).tagline ?? null,
   logo_url: p.logoUrl ?? null,
   fees: p.fees ?? null,
   rating: p.rating ?? null,
   review_count: (p as any).reviewCount ?? null,
   category: p.category ?? null,
   affiliate_link: p.affiliateLink ?? null,
   website_url: p.websiteUrl ?? null,
   commission_rate: (p as any).commissionRate ?? null,
 }));

 // Calculate statistics for structured data
 const avgRating = platforms.length > 0
 ? platforms.reduce((sum, p) => sum + Number(p.rating || 0), 0) / platforms.length
 : 0;

 // Structured data for SEO
 const comparisonSchema = {
 '@context': 'https://schema.org',
 '@type': 'WebPage',
 name: locale === 'nl' ? 'Freelance Platform Vergelijkingen' : 'Freelance Platform Comparisons',
 description: locale === 'nl'
 ? 'Vergelijk de beste freelanceplatforms. Bekijk tarieven, beoordelingen en specialisaties om het perfecte platform te vinden.'
 : 'Compare the best freelance platforms. View fees, ratings, and specializations to find the perfect platform.',
 url: `${siteUrl}/${locale}/comparisons`,
 mainEntity: {
 '@type': 'ItemList',
 numberOfItems: platforms.length,
 itemListElement: platforms.slice(0, 10).map((platform, index) =>({
 '@type': 'ListItem',
 position: index + 1,
 item: {
 '@type': 'Product',
 name: platform.name,
 description: platform.tagline,
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
 name: locale === 'nl' ? 'Vergelijkingen' : 'Comparisons',
 item: `${siteUrl}/${locale}/comparisons`,
 },
 ],
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }}
 />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
 />
 
 <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
 {/* Hero Section */}
 <section className="bg-white dark:bg-gray-900 py-16 sm:py-20">
 <div className="container mx-auto px-4">
 <div className="max-w-3xl mx-auto text-center">
 <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
 {t('hero.title')}
 </h1>
 <p className="text-xl text-text-secondary">
 {t('hero.subtitle')}
 </p>
 </div>
 </div>
 </section>

 {/* Comparison Table */}
 <section className="container mx-auto px-4 py-12 dark:bg-gray-900">
 <ComparisonTable platforms={platforms} locale={locale} />

 {/* Stats Section */}
 {platforms.length > 0 && (
 <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
 <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
 {t('stats.totalPlatforms')}
 </div>
 <div className="text-3xl font-bold text-gray-900 dark:text-white">
 {platforms.length}
 </div>
 </div>
 <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
 <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
 {t('stats.averageCommission')}
 </div>
 <div className="text-3xl font-bold text-green-600 dark:text-green-400">
 {(
 platforms.reduce((sum, p) => sum + Number(p.commission_rate || 0), 0) /
 platforms.length
 ).toFixed(1)}
 %
 </div>
 </div>
 <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
 <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
 {t('stats.averageRating')}
 </div>
 <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
 {(
 platforms.reduce((sum, p) => sum + Number(p.rating || 0), 0) /
 platforms.length
 ).toFixed(1)}
 <span className="text-lg ml-1">★</span>
 </div>
 </div>
 </div>
 )}

 {/* CTA Section */}
 <div className="mt-12 bg-primary rounded-lg shadow-lg p-8 text-center text-white">
 <h2 className="text-2xl font-bold mb-4">
 {t('cta.heading')}
 </h2>
 <p className="text-white/90 mb-6 max-w-2xl mx-auto">
 {t('cta.description')}
 </p>
 <div className="flex items-center justify-center gap-4">
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-gray-100 transition-colors"
 >
 {t('cta.viewAllButton')}
 </Link>
 <Link
 href={`/${locale}/reviews`}
 className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-gray-100 transition-colors shadow-md"
 >
 {t('cta.readReviewsButton')}
 </Link>
 </div>
 </div>
 </section>
 </main>
 
 </>
 );
}
