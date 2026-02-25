import { Metadata } from 'next';
import Link from 'next/link';
import { AdWidget } from '@/components/AdWidget';
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Wrench, Calculator, FileText, BarChart3, Clock, DollarSign, Users, Zap } from 'lucide-react';
import * as Icons from 'lucide-react';
import { getTranslations } from 'next-intl/server';

interface PageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata>{
 const { locale } = await params;
 const t = await getTranslations({ locale, namespace: 'toolsPage.metadata' });

 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/tools`;

 return {
 title: t('title'),
 description: t('description'),

 // Keywords
 keywords: t('keywords'),

 // Canonical URL with language alternates
 alternates: {
 canonical: pageUrl,
 languages: {
 'en': `${siteUrl}/en/tools`,
 'nl': `${siteUrl}/nl/tools`,
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
 url: `${siteUrl}/images/og/tools-og.png`,
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
 images: [`${siteUrl}/images/og/tools-og.png`],
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

// Icon mapping for lucide-react
const iconMap: { [key: string]: any } = {
 Calculator,
 FileText,
 BarChart3,
 Clock,
 DollarSign,
 Users,
 Zap,
};

export default async function ToolsPage({ params }: PageProps) {
 const { locale } = await params;
 const t = await getTranslations({ locale, namespace: 'toolsPage' });

 let tools: any[] = [];
 let resources: any[] = [];

 try {
 tools = await fetchQuery(api.tools.getByCategory, { category: 'tool', locale });
 resources = await fetchQuery(api.tools.getByCategory, { category: 'resource', locale });
 } catch (error) {
 console.error('Error fetching tools:', error);
 }

 // Add hardcoded tools if database is empty
 const hardcodedTools = [
 {
 id: 'time-tracker-temp',
 owner_id: 'system',
 name: t('hardcodedTools.timeTracker.name'),
 slug: 'time-tracker',
 description: t('hardcodedTools.timeTracker.description'),
 category: 'tool',
 icon: 'Clock',
 color: '#3B82F6',
 tool_url: `/${locale}/tools/time-tracker`,
 is_available: true,
 featured: true,
 sort_order: 1,
 views: 0,
 status: 'published',
 created_at: new Date(),
 updated_at: new Date(),
 },
 {
 id: 'rate-calculator-temp',
 owner_id: 'system',
 name: t('hardcodedTools.rateCalculator.name'),
 slug: 'rate-calculator',
 description: t('hardcodedTools.rateCalculator.description'),
 category: 'tool',
 icon: 'Calculator',
 color: '#10B981',
 tool_url: `/${locale}/tools/rate-calculator`,
 is_available: true,
 featured: true,
 sort_order: 2,
 views: 0,
 status: 'published',
 created_at: new Date(),
 updated_at: new Date(),
 },
 {
 id: 'invoice-generator-temp',
 owner_id: 'system',
 name: t('hardcodedTools.invoiceGenerator.name'),
 slug: 'invoice-generator',
 description: t('hardcodedTools.invoiceGenerator.description'),
 category: 'tool',
 icon: 'FileText',
 color: '#8B5CF6',
 tool_url: `/${locale}/tools/invoice-generator`,
 is_available: true,
 featured: true,
 sort_order: 3,
 views: 0,
 status: 'published',
 created_at: new Date(),
 updated_at: new Date(),
 },
 {
 id: 'income-tracker-temp',
 owner_id: 'system',
 name: t('hardcodedTools.incomeTracker.name'),
 slug: 'income-tracker',
 description: t('hardcodedTools.incomeTracker.description'),
 category: 'tool',
 icon: 'BarChart3',
 color: '#F59E0B',
 tool_url: `/${locale}/tools/income-tracker`,
 is_available: true,
 featured: true,
 sort_order: 4,
 views: 0,
 status: 'published',
 created_at: new Date(),
 updated_at: new Date(),
 },
 {
 id: 'project-price-calculator-temp',
 owner_id: 'system',
 name: t('hardcodedTools.projectPriceCalculator.name'),
 slug: 'project-price-calculator',
 description: t('hardcodedTools.projectPriceCalculator.description'),
 category: 'tool',
 icon: 'DollarSign',
 color: '#EF4444',
 tool_url: `/${locale}/tools/project-price-calculator`,
 is_available: true,
 featured: true,
 sort_order: 5,
 views: 0,
 status: 'published',
 created_at: new Date(),
 updated_at: new Date(),
 },
 // Client Manager temporarily disabled - MoneyBii not yet ready
 // {
 // id: 'client-manager-temp',
 // owner_id: 'system',
 // name: t('hardcodedTools.clientManager.name'),
 // slug: 'client-manager',
 // description: t('hardcodedTools.clientManager.description'),
 // category: 'tool',
 // icon: 'Users',
 // color: '#06B6D4',
 // tool_url: `/${locale}/tools/client-manager`,
 // is_available: true,
 // featured: false,
 // sort_order: 6,
 // views: 0,
 // status: 'published',
 // created_at: new Date(),
 // updated_at: new Date(),
 // },
 ];

 // Merge hardcoded tools with database tools
 // Always use hardcoded tools, add any database tools that aren't in the hardcoded list
 const hardcodedSlugs = hardcodedTools.map(t =>t.slug);
 const databaseOnlyTools = tools.filter(t =>!hardcodedSlugs.includes(t.slug));

 // Temporarily hidden tools (MoneyBii not ready yet)
 const hiddenSlugs = ['client-manager'];

 tools = [...hardcodedTools as any, ...databaseOnlyTools].filter(
 t =>!hiddenSlugs.includes(t.slug)
 );

 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

 // Structured data for SEO
 const toolsListSchema = {
 '@context': 'https://schema.org',
 '@type': 'CollectionPage',
 name: locale === 'nl' ? 'Gratis Freelance Tools' : 'Free Freelance Tools',
 description: locale === 'nl'
 ? 'Gratis tools voor freelancers: urenregistratie, facturatie, uurtarief calculator en meer.'
 : 'Free tools for freelancers: time tracking, invoicing, rate calculator and more.',
 url: `${siteUrl}/${locale}/tools`,
 mainEntity: {
 '@type': 'ItemList',
 numberOfItems: tools.length,
 itemListElement: tools.map((tool: any, index: number) =>({
 '@type': 'ListItem',
 position: index + 1,
 item: {
 '@type': 'SoftwareApplication',
 name: tool.name,
 description: tool.description,
 url: `${siteUrl}/${locale}/tools/${tool.slug}`,
 applicationCategory: 'BusinessApplication',
 operatingSystem: 'Web Browser',
 offers: {
 '@type': 'Offer',
 price: '0',
 priceCurrency: 'EUR',
 },
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
 name: locale === 'nl' ? 'Tools' : 'Tools',
 item: `${siteUrl}/${locale}/tools`,
 },
 ],
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsListSchema) }}
 />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
 />
 
 <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
 {/* Hero Section */}
 <section className="bg-white dark:bg-slate-800 py-16 sm:py-20">
 <div className="container mx-auto px-4">
 <div className="max-w-3xl mx-auto text-center">
 <div className="flex items-center justify-center gap-3 mb-6">
 <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center">
 <Wrench className="w-7 h-7 text-white" />
 </div>
 </div>

 <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
 {t('hero.title')}
 </h1>
 <p className="text-xl text-gray-700 dark:text-gray-300">
 {t('hero.subtitle')}
 </p>
 </div>
 </div>
 </section>

 {/* Tools Grid */}
 <section className="container mx-auto px-4 py-16">
 <div className="mb-12">
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
 {t('toolsSection.title')}
 </h2>
 <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
 {t('toolsSection.description')}
 </p>
 </div>

 {tools.length >0 ? (
 <>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
 {tools.map((tool) =>{
 const Icon = tool.icon && iconMap[tool.icon] ? iconMap[tool.icon] : Wrench;
 return (
 <div
 key={tool.id}
 className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-200 dark:border-slate-700"
 >
 <div className="p-6">
 <div
 className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
 style={{ backgroundColor: tool.color }}
 >
 <Icon className="w-6 h-6 text-white" />
 </div>
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
 {tool.name}
 </h3>
 <p className="text-gray-600 dark:text-gray-300 mb-4">
 {tool.description}
 </p>
 {tool.is_available ? (
 <Link
 href={`/${locale}/tools/${tool.slug}`}
 className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
 >
 {t('toolsSection.startButton')}
 </Link>
 ) : (
 <div className="flex items-center gap-2">
 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
 {t('toolsSection.comingSoon')}
 </span>
 </div>
 )}
 </div>
 </div>
 );
 })}
 </div>

 {/* Ad Widget for Tools Listing */}
 <div className="mb-16 max-w-md mx-auto">
 <AdWidget placement="tools_listing" />
 </div>
 </>
 ) : (
 <div className="text-center py-12 mb-16">
 <p className="text-lg text-gray-600 dark:text-gray-300">
 {t('emptyStates.noTools')}
 </p>
 </div>
 )}

 {/* Resources Section */}
 <div className="mb-12">
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
 {t('resourcesSection.title')}
 </h2>
 <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
 {t('resourcesSection.description')}
 </p>
 </div>

 {resources.length >0 ? (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
 {resources.map((resource) =>{
 const Icon = resource.icon && iconMap[resource.icon] ? iconMap[resource.icon] : FileText;
 return (
 <div
 key={resource.id}
 className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-all border border-gray-200 dark:border-slate-700"
 >
 <div
 className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
 style={{ backgroundColor: resource.color }}
 >
 <Icon className="w-6 h-6 text-white" />
 </div>
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
 {resource.name}
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">
 {resource.description}
 </p>
 </div>
 );
 })}
 </div>
 ) : (
 <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl shadow-xl p-8 md:p-12 mb-16">
 <div className="max-w-4xl mx-auto text-center">
 <div className="mb-6">
 <Zap className="w-16 h-16 text-white mx-auto mb-4" />
 <h3 className="text-3xl font-bold text-white mb-4">
 {t('moneyBiiCta.title')}
 </h3>
 <p className="text-xl text-white/90 mb-8">
 {t('moneyBiiCta.description')}
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
 <div className="flex items-start space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
 <FileText className="w-6 h-6 text-white flex-shrink-0 mt-1" />
 <div>
 <p className="text-white font-semibold">{t('moneyBiiCta.features.invoicing')}</p>
 </div>
 </div>
 <div className="flex items-start space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
 <Calculator className="w-6 h-6 text-white flex-shrink-0 mt-1" />
 <div>
 <p className="text-white font-semibold">{t('moneyBiiCta.features.quotes')}</p>
 </div>
 </div>
 <div className="flex items-start space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
 <Users className="w-6 h-6 text-white flex-shrink-0 mt-1" />
 <div>
 <p className="text-white font-semibold">{t('moneyBiiCta.features.crm')}</p>
 </div>
 </div>
 <div className="flex items-start space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
 <BarChart3 className="w-6 h-6 text-white flex-shrink-0 mt-1" />
 <div>
 <p className="text-white font-semibold">{t('moneyBiiCta.features.reports')}</p>
 </div>
 </div>
 </div>

{/* MoneyBii launch button - temporarily disabled until product is ready */}
 <div
 className="inline-flex items-center gap-2 bg-white/80 text-gray-500 px-8 py-4 rounded-lg font-bold text-lg shadow-lg cursor-not-allowed"
 >
 {t('moneyBiiCta.comingSoon')}
 <Zap className="w-5 h-5" />
 </div>
 </div>
 </div>
 )}

 {/* CTA Section */}
 <div className="bg-primary rounded-lg shadow-lg p-8 text-center text-white">
 <h2 className="text-2xl font-bold mb-4">
 {t('cta.title')}
 </h2>
 <p className="text-white/90 mb-6 max-w-2xl mx-auto">
 {t('cta.description')}
 </p>
 <div className="flex items-center justify-center gap-4">
 <Link
 href={`/${locale}/blog`}
 className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-gray-100 transition-colors"
 >
 {t('cta.guidesButton')}
 </Link>
 <Link
 href={`/${locale}#newsletter`}
 className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
 >
 {t('cta.updatesButton')}
 </Link>
 </div>
 </div>
 </section>
 </main>
 
 </>
 );
}
