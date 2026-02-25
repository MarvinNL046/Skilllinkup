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
 // ...
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

 <main>
 {/* Hero / Breadcrumb */}
 <section className="breadcumb-section">
 <div className="container">
 <div className="row">
 <div className="col-lg-12">
 <div className="breadcumb-style1 text-center">
 <div
 className="d-flex align-items-center justify-content-center bdrs12 mx-auto mb20"
 style={{ width: 60, height: 60, background: 'var(--primary-color)' }}
 >
 <Wrench size={28} color="#fff" />
 </div>
 <h2 className="title">{t('hero.title')}</h2>
 <p className="text fz17 mt10">{t('hero.subtitle')}</p>
 <div className="breadcumb-list mt15">
 <Link href={`/${locale}`}>Home</Link>
 <span className="mx10">/</span>
 <span className="active">Tools</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Tools Grid */}
 <section className="pt50 pb90">
 <div className="container">
 <div className="row mb30">
 <div className="col-12">
 <h3 className="title mb10">{t('toolsSection.title')}</h3>
 <p className="fz17 body-color">{t('toolsSection.description')}</p>
 </div>
 </div>

 {tools.length > 0 ? (
 <>
 <div className="row">
 {tools.map((tool) => {
 const Icon = tool.icon && iconMap[tool.icon] ? iconMap[tool.icon] : Wrench;
 return (
 <div key={tool.id} className="col-sm-6 col-lg-4">
 <div className="freelancer-style1 bdrs12 bdr1 hover-box-shadow mb25 p30">
 <div
 className="bdrs12 d-flex align-items-center justify-content-center mb20"
 style={{ width: 52, height: 52, backgroundColor: tool.color }}
 >
 <Icon size={24} color="#fff" />
 </div>
 <h5 className="fw600 mb10">{tool.name}</h5>
 <p className="fz14 body-color mb20">{tool.description}</p>
 {tool.is_available ? (
 <Link
 href={`/${locale}/tools/${tool.slug}`}
 className="ud-btn btn-thm w-100 text-center"
 >
 {t('toolsSection.startButton')}
 </Link>
 ) : (
 <span className="fz13 fw500 text-muted px15 py8 bdrs4 bgc-f7 d-inline-block">
 {t('toolsSection.comingSoon')}
 </span>
 )}
 </div>
 </div>
 );
 })}
 </div>

 {/* Ad Widget for Tools Listing */}
 <div className="row mt20 mb30">
 <div className="col-md-6 offset-md-3">
 <AdWidget placement="tools_listing" />
 </div>
 </div>
 </>
 ) : (
 <div className="row">
 <div className="col-12 text-center py50">
 <p className="fz17 body-color">{t('emptyStates.noTools')}</p>
 </div>
 </div>
 )}

 {/* Resources Section */}
 <div className="row mb30 mt20">
 <div className="col-12">
 <h3 className="title mb10">{t('resourcesSection.title')}</h3>
 <p className="fz17 body-color">{t('resourcesSection.description')}</p>
 </div>
 </div>

 {resources.length > 0 ? (
 <div className="row mb30">
 {resources.map((resource) => {
 const Icon = resource.icon && iconMap[resource.icon] ? iconMap[resource.icon] : FileText;
 return (
 <div key={resource.id} className="col-sm-6 col-lg-3">
 <div className="ps-widget bgc-white bdrs12 bdr1 hover-box-shadow p30 mb25">
 <div
 className="bdrs12 d-flex align-items-center justify-content-center mb20"
 style={{ width: 52, height: 52, backgroundColor: resource.color }}
 >
 <Icon size={24} color="#fff" />
 </div>
 <h6 className="fw600 mb10">{resource.name}</h6>
 <p className="fz14 body-color mb0">{resource.description}</p>
 </div>
 </div>
 );
 })}
 </div>
 ) : (
 <div className="ps-widget bgc-thm bdrs12 p50 mb30 text-center">
 <div className="mb30">
 <Zap size={64} color="#fff" style={{ display: 'block', margin: '0 auto 16px' }} />
 <h3 className="text-white mb15">{t('moneyBiiCta.title')}</h3>
 <p className="fz17 mb30" style={{ color: 'rgba(255,255,255,0.9)' }}>
 {t('moneyBiiCta.description')}
 </p>
 </div>

 <div className="row mb30 text-start">
 <div className="col-sm-6">
 <div className="d-flex align-items-start p20 bdrs8 mb15" style={{ background: 'rgba(255,255,255,0.1)', gap: '12px' }}>
 <FileText size={22} color="#fff" style={{ flexShrink: 0, marginTop: '2px' }} />
 <p className="text-white fw600 mb0">{t('moneyBiiCta.features.invoicing')}</p>
 </div>
 </div>
 <div className="col-sm-6">
 <div className="d-flex align-items-start p20 bdrs8 mb15" style={{ background: 'rgba(255,255,255,0.1)', gap: '12px' }}>
 <Calculator size={22} color="#fff" style={{ flexShrink: 0, marginTop: '2px' }} />
 <p className="text-white fw600 mb0">{t('moneyBiiCta.features.quotes')}</p>
 </div>
 </div>
 <div className="col-sm-6">
 <div className="d-flex align-items-start p20 bdrs8 mb15" style={{ background: 'rgba(255,255,255,0.1)', gap: '12px' }}>
 <Users size={22} color="#fff" style={{ flexShrink: 0, marginTop: '2px' }} />
 <p className="text-white fw600 mb0">{t('moneyBiiCta.features.crm')}</p>
 </div>
 </div>
 <div className="col-sm-6">
 <div className="d-flex align-items-start p20 bdrs8 mb15" style={{ background: 'rgba(255,255,255,0.1)', gap: '12px' }}>
 <BarChart3 size={22} color="#fff" style={{ flexShrink: 0, marginTop: '2px' }} />
 <p className="text-white fw600 mb0">{t('moneyBiiCta.features.reports')}</p>
 </div>
 </div>
 </div>

 {/* MoneyBii launch button - temporarily disabled until product is ready */}
 <div
 className="d-inline-flex align-items-center px30 py15 bdrs8 fw600 fz17"
 style={{ background: 'rgba(255,255,255,0.8)', color: '#6c757d', cursor: 'not-allowed', gap: '8px' }}
 >
 {t('moneyBiiCta.comingSoon')}
 <Zap size={18} />
 </div>
 </div>
 )}

 {/* CTA Section */}
 <div className="ps-widget bgc-thm bdrs12 p50 text-center text-white">
 <h3 className="text-white mb15">{t('cta.title')}</h3>
 <p className="fz17 mb30" style={{ color: 'rgba(255,255,255,0.9)' }}>
 {t('cta.description')}
 </p>
 <div className="d-flex align-items-center justify-content-center" style={{ gap: '16px' }}>
 <Link href={`/${locale}/blog`} className="ud-btn btn-white">
 {t('cta.guidesButton')}
 </Link>
 <Link href={`/${locale}#newsletter`} className="ud-btn btn-white2">
 {t('cta.updatesButton')}
 </Link>
 </div>
 </div>
 </div>
 </section>
 </main>
 </>
 );
}
