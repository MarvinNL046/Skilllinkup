import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AdWidget } from '@/components/AdWidget';
import { DollarSign, TrendingUp, Package, CheckCircle, ArrowRight, Zap, FileText, Video, ShoppingCart } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function generateMetadata({
 params
}: {
 params: Promise<{ locale: string }>
}): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'building-passive-income';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/best-practices/${slug}`;

 return {
 title: 'Building Passive Income Streams as a Freelancer: 2026 Guide',
 description: 'Create passive income alongside freelancing. Learn proven strategies for digital products, courses, templates, and recurring revenue that reduce client dependency.',
 keywords: 'passive income freelancers, digital products, freelance income streams, recurring revenue, online courses, templates, reduce client dependency',
 openGraph: {
 title: 'Building Passive Income Streams as a Freelancer: 2026 Guide',
 description: 'Create passive income alongside freelancing with digital products, courses, and recurring revenue strategies.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/resources-og.png`,
 width: 1200,
 height: 630,
 alt: 'Building Passive Income Streams as a Freelancer',
 }
 ],
 locale: locale === 'nl' ? 'nl_NL' : 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Building Passive Income Streams as a Freelancer',
 description: 'Create passive income alongside freelancing. Proven strategies for digital products, courses, and recurring revenue.',
 images: [`${siteUrl}/images/og/resources-og.png`],
 creator: '@SkillLinkup',
 site: '@SkillLinkup',
 },
 alternates: {
 canonical: pageUrl,
 languages: {
 'en': `${siteUrl}/en/gids/best-practices/${slug}`,
 'nl': `${siteUrl}/nl/gids/best-practices/${slug}`,
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

export default async function BuildingPassiveIncome({
 params
}: {
 params: Promise<{ locale: string }>;
}) {
 const { locale } = await params;

 return (
 <>
 <Header />
 <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
 {/* Hero Section */}
 <section className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] text-white py-16 sm:py-20">
 <div className="container mx-auto px-4">
 <div className="max-w-4xl mx-auto text-center">
 <div className="flex items-center justify-center gap-3 mb-6">
 <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
 <DollarSign className="w-7 h-7 text-white" />
 </div>
 </div>

 <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
 Building Passive Income Streams as a Freelancer
 </h1>

 <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
 Trading hours for dollars has a ceiling. Learn to build passive income streams—digital products, courses, templates, and recurring revenue—that diversify your income and reduce client dependency.
 </p>

 <div className="flex flex-wrap items-center justify-center gap-4">
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
 >
 Find Platforms
 <ArrowRight className="w-5 h-5" />
 </Link>
 <Link
 href={`/${locale}/blog`}
 className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20"
 >
 Read More Tips
 <Zap className="w-5 h-5" />
 </Link>
 </div>
 </div>
 </div>
 </section>

 {/* Schema.org Structured Data */}
 <script type="application/ld+json" dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "Article",
 "headline": "Building Passive Income Streams as a Freelancer: 2026 Guide",
 "description": "Create passive income alongside freelancing. Learn proven strategies for digital products, courses, templates, and recurring revenue.",
 "author": {
 "@type": "Organization",
 "name": "SkillLinkup"
 },
 "publisher": {
 "@type": "Organization",
 "name": "SkillLinkup"
 },
 "datePublished": "2026-01-15",
 "dateModified": "2026-01-15"
 })
 }} />

 <script type="application/ld+json" dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 "itemListElement": [
 {
 "@type": "ListItem",
 "position": 1,
 "name": "Home",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`
 },
 {
 "@type": "ListItem",
 "position": 2,
 "name": "Guide",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/gids`
 },
 {
 "@type": "ListItem",
 "position": 3,
 "name": "Best Practices",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/gids/best-practices`
 },
 {
 "@type": "ListItem",
 "position": 4,
 "name": "Building Passive Income",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/gids/best-practices/building-passive-income`
 }
 ]
 })
 }} />

 {/* Main Content */}
 <article className="container mx-auto px-4 py-16">
 <div className="max-w-4xl mx-auto">
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
 Why Freelancers Need Passive Income
 </h2>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
 Freelancing's dirty secret: <strong>your income stops the moment you stop working</strong>. Sick days, vacations, or slow months mean zero revenue. Top freelancers solve this by building passive income streams that generate money while they sleep, vacation, or focus on high-value client work.
 </p>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
 Passive income isn't "get rich quick"—it requires upfront work. But once established, these streams provide income stability, reduce client dependency, and give you the freedom to be selective about projects.
 </p>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
 <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border border-primary/20">
 <DollarSign className="w-10 h-10 text-primary mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">30% Average Income</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">From passive streams (successful freelancers)</p>
 </div>
 <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border border-accent/20">
 <TrendingUp className="w-10 h-10 text-accent mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">12-18 Months</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">To build meaningful passive revenue</p>
 </div>
 <div className="bg-gradient-to-br from-[#1e1541]/10 to-[#1e1541]/5 dark:from-[#1e1541]/30 dark:to-[#1e1541]/20 rounded-xl p-6 border border-[#1e1541]/20">
 <Package className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">3-5 Products</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">Optimal portfolio for diversification</p>
 </div>
 </div>
 </div>

 {/* Section 1: Digital Products & Templates */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
 Digital Products: Package Your Expertise
 </h2>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
 You already create valuable work for clients—templates, frameworks, processes, designs. Package these assets as products others can buy, turning your expertise into scalable revenue.
 </p>

 <div className="mb-10">
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 High-Demand Digital Product Types
 </h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
 Not all digital products sell equally well. Focus on products that solve specific, painful problems your audience faces repeatedly.
 </p>
 <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 mb-4 border border-primary/20">
 <h4 className="font-bold text-gray-900 dark:text-white mb-3">
 Proven Product Categories:
 </h4>
 <ul className="space-y-3">
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <div>
 <strong className="text-gray-900 dark:text-white">Templates & Frameworks:</strong>Proposal templates, contract templates, project management frameworks, design systems. Price: $29-$197. Example: "Freelance Proposal Template Pack (10 proven templates)."
 </div>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <Package className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <div>
 <strong className="text-gray-900 dark:text-white">Design Assets:</strong>UI kits, icon sets, stock photos, Figma templates, WordPress themes. Price: $19-$299. High volume potential if you hit trending niches.
 </div>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <ShoppingCart className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <div>
 <strong className="text-gray-900 dark:text-white">Code Libraries & Plugins:</strong>WordPress plugins, Shopify apps, component libraries, API integrations. Price: $49-$499. Recurring revenue potential with updates.
 </div>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <div>
 <strong className="text-gray-900 dark:text-white">Ebooks & Guides:</strong>Comprehensive guides solving specific problems. Price: $27-$97. Lower barrier than courses, easier to create.
 </div>
 </li>
 </ul>
 </div>
 </div>

 <div className="mb-10">
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 Product Creation Process
 </h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
 Don't spend 6 months building a product nobody wants. Use this validation-first approach to minimize risk and maximize market fit.
 </p>
 <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6 border border-accent/20">
 <h4 className="font-bold text-gray-900 dark:text-white mb-3">
 5-Step Product Launch Framework:
 </h4>
 <ul className="space-y-2">
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
 <span><strong>1. Validate Demand:</strong>Survey your audience, check existing products on Gumroad/Etsy, analyze keyword search volume. Aim for 50+ people expressing interest.</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
 <span><strong>2. Create MVP Version:</strong>Build the simplest version that delivers core value. Don't perfectionism-delay launch.</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
 <span><strong>3. Presell Before Building:</strong>Offer 50% early-bird discount. If 20+ people buy, finish the product. If not, refund and pivot.</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
 <span><strong>4. Launch to Audience:</strong>Email list first, then social media, then paid ads if converting well.</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
 <span><strong>5. Iterate Based on Feedback:</strong>Add features customers request, create bundles, develop complementary products.</span>
 </li>
 </ul>
 </div>
 </div>

 <div>
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 Where to Sell Digital Products
 </h3>
 <div className="bg-gradient-to-br from-[#1e1541]/5 to-[#1e1541]/10 dark:from-[#1e1541]/10 dark:to-[#1e1541]/20 rounded-xl p-6 border border-[#1e1541]/20">
 <ul className="space-y-2">
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <ShoppingCart className="w-5 h-5 text-[#1e1541] dark:text-white mt-0.5 flex-shrink-0" />
 <span><strong>Gumroad:</strong>Easiest setup, 10% fee, great for beginners. Built-in audience discovery.</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <ShoppingCart className="w-5 h-5 text-[#1e1541] dark:text-white mt-0.5 flex-shrink-0" />
 <span><strong>Your Own Website:</strong>Highest profit (no marketplace fees), requires traffic generation. Use Stripe + WordPress.</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <ShoppingCart className="w-5 h-5 text-[#1e1541] dark:text-white mt-0.5 flex-shrink-0" />
 <span><strong>Creative Market / Etsy:</strong>For design assets. Built-in traffic but 30-40% fees and high competition.</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <ShoppingCart className="w-5 h-5 text-[#1e1541] dark:text-white mt-0.5 flex-shrink-0" />
 <span><strong>AppSumo:</strong>Great for software products. They handle marketing but take 70%—worth it for volume.</span>
 </li>
 </ul>
 </div>
 </div>
 </div>

 {/* Section 2: Online Courses & Educational Content */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
 Online Courses: Teach What You Know
 </h2>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
 If clients pay you for expertise, others will pay to learn that expertise. Online courses can generate $3K-$20K per month once established, with higher margins than client work.
 </p>

 <div className="mb-10">
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 Course Topic Validation
 </h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
 The biggest mistake is creating courses nobody wants. Validate demand before investing 100+ hours in course creation.
 </p>
 <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 mb-4 border border-primary/20">
 <h4 className="font-bold text-gray-900 dark:text-white mb-3">
 3 Validation Signals You Need:
 </h4>
 <ul className="space-y-2">
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <Video className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <span><strong>Client Questions:</strong>What do clients repeatedly ask you to explain? Questions = pain points worth solving.</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <Video className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <span><strong>Existing Course Success:</strong>Are competitors selling similar courses? Check Udemy, Teachable, Skillshare for proof of market.</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <Video className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <span><strong>Presale Interest:</strong>Post course idea on social media. If 30+ people say "I'd buy this," you have validation.</span>
 </li>
 </ul>
 </div>
 </div>

 <div className="mb-10">
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 The Lean Course Creation Method
 </h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
 Don't spend 6 months recording a course. Create and sell simultaneously using this phased approach.
 </p>
 <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6 border border-accent/20">
 <h4 className="font-bold text-gray-900 dark:text-white mb-3">
 Phased Course Launch:
 </h4>
 <ul className="space-y-2">
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
 <span><strong>Phase 1 - Presell (Week 1):</strong>Create sales page and outline. Sell "early access" at 50% off. Need 10-15 buyers to proceed.</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
 <span><strong>Phase 2 - Core Content (Weeks 2-4):</strong>Create first 50% of course. Release modules weekly to early access students.</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
 <span><strong>Phase 3 - Feedback Integration (Weeks 5-6):</strong>Adjust remaining content based on student feedback. Create bonus modules addressing questions.</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
 <span><strong>Phase 4 - Full Launch (Week 7+):</strong>Open to public at full price. Use student testimonials in marketing.</span>
 </li>
 </ul>
 </div>
 </div>

 <div>
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 Course Platforms Comparison
 </h3>
 <div className="bg-gradient-to-br from-[#1e1541]/5 to-[#1e1541]/10 dark:from-[#1e1541]/10 dark:to-[#1e1541]/20 rounded-xl p-6 border border-[#1e1541]/20">
 <ul className="space-y-2">
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-[#1e1541] dark:text-white mt-0.5 flex-shrink-0" />
 <span><strong>Teachable:</strong>Best for beginners. 5% fee + payment processing. Easy setup, built-in marketing tools.</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-[#1e1541] dark:text-white mt-0.5 flex-shrink-0" />
 <span><strong>Udemy:</strong>Built-in traffic but 50% revenue share. Good for validation, bad for long-term profit.</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-[#1e1541] dark:text-white mt-0.5 flex-shrink-0" />
 <span><strong>Your Website (WordPress + LearnDash):</strong>Highest profit (no platform fees), but you handle all marketing.</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-[#1e1541] dark:text-white mt-0.5 flex-shrink-0" />
 <span><strong>Skillshare:</strong>Royalty model (per-minute watched). Great passive income but lower per-student revenue.</span>
 </li>
 </ul>
 </div>
 </div>
 </div>

 {/* Section 3: Recurring Revenue Models */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
 Recurring Revenue: The Holy Grail
 </h2>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
 One-time product sales are great. Recurring revenue is transformative. Subscriptions create predictable, compounding income that grows month over month.
 </p>

 <div className="mb-10">
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 Membership & Community Models
 </h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
 Build a paid community around your expertise. Members pay monthly for access to resources, networking, and your guidance.
 </p>
 <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 mb-4 border border-primary/20">
 <h4 className="font-bold text-gray-900 dark:text-white mb-3">
 Membership Site Ideas:
 </h4>
 <ul className="space-y-2">
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <DollarSign className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <span><strong>Resource Library:</strong>Monthly updated templates, tools, guides. $29-$99/month. Low maintenance once built.</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <DollarSign className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <span><strong>Private Community:</strong>Slack/Discord for networking + monthly Q&A calls. $49-$199/month. Requires ongoing engagement.</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <DollarSign className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <span><strong>Course Library:</strong>Netflix-style access to all your courses + new ones monthly. $97-$297/month. Highest value perception.</span>
 </li>
 </ul>
 </div>
 </div>

 <div className="mb-10">
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 SaaS & Software Products
 </h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
 If you're technical, building software tools creates high-margin recurring revenue. Start with tools that solve problems you personally face.
 </p>
 <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6 border border-accent/20">
 <h4 className="font-bold text-gray-900 dark:text-white mb-3">
 Micro-SaaS Opportunities:
 </h4>
 <ul className="space-y-2">
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <TrendingUp className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
 <span><strong>Freelancer Tools:</strong>Time tracking, invoicing, contract management, client portal. You know the pain points intimately.</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <TrendingUp className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
 <span><strong>Niche Automation:</strong>Tools that automate tedious tasks in your industry. Even 100 subscribers at $29/month = $35K/year.</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <TrendingUp className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
 <span><strong>API Services:</strong>Data enrichment, content generation, integration services. B2B customers pay 5-10x consumer prices.</span>
 </li>
 </ul>
 </div>
 </div>

 <div>
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 Retainer-Based Services
 </h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
 Not fully passive, but recurring service retainers provide predictable monthly income and reduce the feast-famine cycle.
 </p>
 <div className="bg-gradient-to-br from-[#1e1541]/5 to-[#1e1541]/10 dark:from-[#1e1541]/10 dark:to-[#1e1541]/20 rounded-xl p-6 border border-[#1e1541]/20">
 <ul className="space-y-2">
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-[#1e1541] dark:text-white mt-0.5 flex-shrink-0" />
 <span><strong>Ongoing Maintenance:</strong>Website updates, bug fixes, content updates. $500-$2000/month per client.</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-[#1e1541] dark:text-white mt-0.5 flex-shrink-0" />
 <span><strong>Content Production:</strong>Monthly blog posts, social media management, newsletters. Productized pricing makes it scalable.</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-[#1e1541] dark:text-white mt-0.5 flex-shrink-0" />
 <span><strong>Advisory Services:</strong>Monthly strategy calls + async support. $1000-$5000/month for expertise-heavy industries.</span>
 </li>
 </ul>
 </div>
 </div>
 </div>

 {/* CTA Sections */}
 <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white">
 <div className="max-w-3xl mx-auto text-center">
 <DollarSign className="w-16 h-16 text-white mx-auto mb-6" />
 <h2 className="text-3xl md:text-4xl font-bold mb-4">
 Diversify Your Freelance Income
 </h2>
 <p className="text-xl text-white/90 mb-8">
 Build passive income alongside client work using platforms that support creators. Find platforms with built-in marketplaces for templates, courses, and digital products.
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg"
 >
 Find Platforms
 <ArrowRight className="w-5 h-5" />
 </Link>
 </div>
 </div>

 <AdWidget placement="blog_sidebar" />

 {/* Final CTA */}
 <div className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
 <div className="max-w-3xl mx-auto">
 <TrendingUp className="w-16 h-16 text-white mx-auto mb-6" />
 <h2 className="text-3xl md:text-4xl font-bold mb-4">
 Start Building Passive Income Today
 </h2>
 <p className="text-xl text-white/90 mb-8">
 Passive income won't happen overnight, but every day you delay is another day of 100% client dependency. Start with one product, validate the market, and scale from there.
 </p>
 <div className="flex flex-wrap items-center justify-center gap-4">
 <Link
 href={`/${locale}/blog`}
 className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg"
 >
 Read More Tips
 <ArrowRight className="w-5 h-5" />
 </Link>
 <Link
 href={`/${locale}/newsletter`}
 className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20"
 >
 Join Community
 <Zap className="w-5 h-5" />
 </Link>
 </div>
 </div>
 </div>
 </div>
 </article>
 </main>
 <Footer />
 </>
 );
}
