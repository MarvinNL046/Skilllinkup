import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AdWidget } from '@/components/AdWidget';
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Calculator, FileText, BarChart3, Clock, DollarSign, Users, Zap, Wrench, Eye, ArrowLeft, ExternalLink } from 'lucide-react';

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

interface PageProps {
 params: Promise<{
 locale: string;
 slug: string;
 }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata>{
 const { locale, slug } = await params;
 const t = await getTranslations({ locale, namespace: 'toolDetailPage.metadata' });
 const rawTool = await fetchQuery(api.tools.getBySlug, { slug, locale });
 const tool = rawTool ? { ...rawTool, tool_url: rawTool.toolUrl, is_available: rawTool.isAvailable } : null;

 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/tools/${slug}`;

 if (!tool) {
 return {
 title: t('notFoundTitle'),
 };
 }

 const title = `${tool.name} - ${t('titleSuffix')} | SkillLinkup`;
 const description = tool.description || t('defaultDescription', { toolName: tool.name });
 const category = tool.category || 'freelance';

 return {
 title,
 description,

 // Keywords based on tool
 keywords: `${tool.name}, freelance ${category}, ${category} tool, freelancer hulpmiddelen, zzp tools`,

 // Canonical URL with language alternates
 alternates: {
 canonical: pageUrl,
 languages: {
 'en': `${siteUrl}/en/tools/${slug}`,
 'nl': `${siteUrl}/nl/tools/${slug}`,
 },
 },

 // Open Graph
 openGraph: {
 title,
 description,
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/tools-og.png`,
 width: 1200,
 height: 630,
 alt: `${tool.name} - SkillLinkup`,
 }
 ],
 locale: locale === 'nl' ? 'nl_NL' : 'en_US',
 type: 'website',
 },

 // Twitter Card
 twitter: {
 card: 'summary_large_image',
 title,
 description,
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

export default async function ToolDetailPage({ params }: PageProps) {
 const { locale, slug } = await params;
 const rawTool = await fetchQuery(api.tools.getBySlug, { slug, locale });
 if (!rawTool) {
 notFound();
 }
 const tool = {
 ...rawTool,
 tool_url: rawTool.toolUrl,
 is_available: rawTool.isAvailable,
 };

 // Get related tools from same category
 const rawRelated = await fetchQuery(api.tools.getByCategory, { category: tool.category, locale });
 const relatedTools = rawRelated.map((r: any) => ({
 ...r,
 tool_url: r.toolUrl,
 is_available: r.isAvailable,
 }));
 const filteredRelated = relatedTools.filter((t: any) =>t._id !== rawTool._id).slice(0, 3);

 const Icon = tool.icon && iconMap[tool.icon] ? iconMap[tool.icon] : Wrench;

 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

 // Structured data for SEO
 const toolSchema = {
 '@context': 'https://schema.org',
 '@type': 'SoftwareApplication',
 name: tool.name,
 description: tool.description,
 url: `${siteUrl}/${locale}/tools/${slug}`,
 applicationCategory: 'BusinessApplication',
 operatingSystem: 'Web Browser',
 offers: {
 '@type': 'Offer',
 price: '0',
 priceCurrency: 'EUR',
 availability: tool.is_available ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
 },
 provider: {
 '@type': 'Organization',
 name: 'SkillLinkup',
 url: siteUrl,
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
 name: 'Tools',
 item: `${siteUrl}/${locale}/tools`,
 },
 {
 '@type': 'ListItem',
 position: 3,
 name: tool.name,
 item: `${siteUrl}/${locale}/tools/${slug}`,
 },
 ],
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
 />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
 />
 <Header />
 <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
 {/* Breadcrumb */}
 <section className="bg-white dark:bg-slate-800 border-b dark:border-slate-700">
 <div className="container mx-auto px-4 py-4">
 <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
 <Link href="/" className="hover:text-primary transition-colors">
 Home
 </Link>
 <span>→</span>
 <Link href="/tools" className="hover:text-primary transition-colors">
 Tools
 </Link>
 <span>→</span>
 <span className="text-gray-900 dark:text-white font-semibold">{tool.name}</span>
 </div>
 </div>
 </section>

 {/* Hero Section */}
 <section className="bg-primary text-white py-16">
 <div className="container mx-auto px-4">
 <Link
 href="/tools"
 className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
 >
 <ArrowLeft className="w-4 h-4" />
 Terug naar tools
 </Link>

 <div className="flex items-start gap-6">
 <div
 className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
 style={{ backgroundColor: tool.color }}
 >
 <Icon className="w-8 h-8 text-white" />
 </div>

 <div className="flex-1">
 <div className="flex items-center gap-3 mb-3">
 <h1 className="text-4xl md:text-5xl font-bold">{tool.name}</h1>
 {!tool.is_available && (
 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white">
 Binnenkort beschikbaar
 </span>
 )}
 </div>

 {tool.description && (
 <p className="text-xl text-white/90 max-w-3xl mb-4">
 {tool.description}
 </p>
 )}

 <div className="flex items-center gap-4 text-sm text-white/80">
 <div className="flex items-center gap-2">
 <Eye className="w-4 h-4" />
 <span>{tool.views} views</span>
 </div>
 <span>•</span>
 <span className="capitalize">{tool.category}</span>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Main Content */}
 <section className="container mx-auto px-4 py-12">
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 {/* Main Content Area */}
 <div className="lg:col-span-2">
 <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-slate-700">
 {tool.is_available ? (
 <>
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 Over deze tool
 </h2>
 <div className="prose dark:prose-invert max-w-none">
 <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
 {tool.description}
 </p>

 {tool.tool_url && (
 <div className="mt-8">
 <a
 href={tool.tool_url}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
 >
 Open tool
 <ExternalLink className="w-4 h-4" />
 </a>
 </div>
 )}
 </div>
 </>
 ) : (
 <>
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 Binnenkort beschikbaar
 </h2>
 <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
 Deze tool is momenteel in ontwikkeling. We werken hard om deze tool zo snel mogelijk beschikbaar te maken.
 </p>
 <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
 <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
 Blijf op de hoogte
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
 Wil je een melding ontvangen wanneer deze tool beschikbaar is? Schrijf je in voor onze nieuwsbrief.
 </p>
 <Link
 href="/#newsletter"
 className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm"
 >
 Schrijf je in
 </Link>
 </div>
 </>
 )}
 </div>
 </div>

 {/* Sidebar */}
 <div className="lg:col-span-1">
 {/* Tool Info Card */}
 <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-slate-700">
 <h3 className="font-bold text-gray-900 dark:text-white mb-4">Tool informatie</h3>
 <dl className="space-y-3">
 <div>
 <dt className="text-sm text-gray-600 dark:text-gray-400">Categorie</dt>
 <dd className="font-semibold text-gray-900 dark:text-white capitalize">{tool.category}</dd>
 </div>
 <div>
 <dt className="text-sm text-gray-600 dark:text-gray-400">Status</dt>
 <dd className="font-semibold text-gray-900 dark:text-white">
 {tool.is_available ? (
 <span className="text-green-600">Beschikbaar</span>
 ) : (
 <span className="text-gray-600">In ontwikkeling</span>
 )}
 </dd>
 </div>
 <div>
 <dt className="text-sm text-gray-600 dark:text-gray-400">Views</dt>
 <dd className="font-semibold text-gray-900 dark:text-white">{tool.views}</dd>
 </div>
 </dl>
 </div>

 {/* Related Tools */}
 {filteredRelated.length >0 && (
 <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-slate-700">
 <h3 className="font-bold text-gray-900 dark:text-white mb-4">Gerelateerde tools</h3>
 <div className="space-y-4">
 {filteredRelated.map((relatedTool) =>{
 const RelatedIcon = relatedTool.icon && iconMap[relatedTool.icon] ? iconMap[relatedTool.icon] : Wrench;
 return (
 <Link
 key={relatedTool._id}
 href={`/tools/${relatedTool.slug}`}
 className="flex items-start gap-3 group"
 >
 <div
 className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
 style={{ backgroundColor: relatedTool.color }}
 >
 <RelatedIcon className="w-5 h-5 text-white" />
 </div>
 <div className="flex-1">
 <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors text-sm">
 {relatedTool.name}
 </h4>
 <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
 {relatedTool.description}
 </p>
 </div>
 </Link>
 );
 })}
 </div>
 <Link
 href="/tools"
 className="mt-4 inline-flex items-center text-sm text-primary font-semibold hover:underline"
 >
 Bekijk alle tools →
 </Link>
 </div>
 )}

 {/* Ad Widget for Tools Detail */}
 <AdWidget placement="tools_detail" />
 </div>
 </div>
 </section>

 {/* CTA Section */}
 <section className="bg-primary py-12">
 <div className="container mx-auto px-4 text-center">
 <h2 className="text-2xl font-bold text-white mb-4">
 Ontdek meer tools voor freelancers
 </h2>
 <p className="text-white/90 mb-6 max-w-2xl mx-auto">
 We hebben nog veel meer handige tools en resources om je freelance business te laten groeien.
 </p>
 <div className="flex items-center justify-center gap-4">
 <Link
 href="/tools"
 className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-gray-100 transition-colors"
 >
 Bekijk alle tools
 </Link>
 <Link
 href="/blog"
 className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
 >
 Lees onze guides
 </Link>
 </div>
 </div>
 </section>
 </main>
 <Footer />
 </>
 );
}
