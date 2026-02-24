import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AdWidget } from '@/components/AdWidget';
import { Users, CheckCircle, ArrowRight, Zap, Star, TrendingUp, Database, DollarSign, Target } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function generateMetadata({
 params
}: {
 params: Promise<{ locale: string }>
}): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'freelance-crm-software';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/tools-productiviteit/${slug}`;

 return {
 title: 'CRM Software for Freelancers 2026: Track Leads & Clients Like a Pro',
 description: 'Best CRM software for freelancers and solopreneurs. Compare Pipedrive, HubSpot, Notion CRM. Increase close rate by 40% with proper lead tracking.',
 keywords: 'freelance CRM, CRM for freelancers, lead tracking software, client management freelance, Pipedrive, HubSpot CRM',
 openGraph: {
 title: 'CRM Software for Freelancers 2026: Track Leads & Clients Like a Pro',
 description: 'Increase close rate by 40% with the right CRM. Complete guide for freelancers.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/resources-og.png`,
 width: 1200,
 height: 630,
 alt: 'Freelance CRM Software 2026',
 }
 ],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'CRM Software for Freelancers 2026: Track Leads & Clients Like a Pro',
 description: 'Best CRM software for freelancers. Increase close rate by 40%.',
 images: [`${siteUrl}/images/og/resources-og.png`],
 creator: '@SkillLinkup',
 site: '@SkillLinkup',
 },
 alternates: {
 canonical: pageUrl,
 languages: {
 'en': pageUrl,
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

export default async function FreelanceCRMSoftware({
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
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <div className="flex items-center justify-center gap-3 mb-6">
 <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
 <Users className="w-7 h-7 text-white" />
 </div>
 </div>

 <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-heading">
 CRM Software for Freelancers: Track Leads & Clients Like a Pro
 </h1>

 <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
 Stop losing leads in your inbox. Discover the CRM systems that help freelancers increase close rates by 40%, never forget a follow-up, and build predictable income.
 </p>

 <div className="flex flex-wrap items-center justify-center gap-4">
 <Link
 href={`/${locale}/tools`}
 className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl font-heading"
 >
 Try Our Free Tools
 <ArrowRight className="w-5 h-5" />
 </Link>
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20 font-heading"
 >
 Browse Platforms
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
 "headline": "CRM Software for Freelancers 2026: Track Leads & Clients Like a Pro",
 "description": "Comprehensive guide to CRM software for freelancers, including Pipedrive, HubSpot, Notion CRM, and DIY solutions.",
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
 "name": "Tools & Productivity",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/gids/tools-productiviteit`
 },
 {
 "@type": "ListItem",
 "position": 4,
 "name": "Freelance CRM Software",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/gids/tools-productiviteit/freelance-crm-software`
 }
 ]
 })
 }} />

 {/* Main Content */}
 <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
 <div className="max-w-4xl mx-auto">
 {/* Stats */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
 <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border border-primary/20">
 <Target className="w-10 h-10 text-primary mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 font-heading">40% Higher Close Rate</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">With proper lead tracking</p>
 </div>
 <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border border-accent/20">
 <DollarSign className="w-10 h-10 text-accent mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 font-heading">2x Revenue Growth</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">Through better follow-up</p>
 </div>
 <div className="bg-gradient-to-br from-[#1e1541]/10 to-[#1e1541]/5 dark:from-[#1e1541]/30 dark:to-[#1e1541]/20 rounded-xl p-6 border border-[#1e1541]/20">
 <Database className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 font-heading">Zero Lost Leads</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">Everything in one place</p>
 </div>
 </div>

 {/* Intro */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
 Why Freelancers Who Use CRMs Earn 2x More Than Those Who Don't
 </h2>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-4">
 Let's talk about the leads you're losing right now.
 </p>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-4">
 That potential client who emailed you 3 weeks ago? You meant to follow up, but it got buried in your inbox. The networking contact who said "let's talk in a few months"? You forgot to circle back. The client who went quiet mid-conversation? You have no system to re-engage them.
 </p>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-4">
 Here's the painful truth: Research shows freelancers without a CRM lose 40% of their leads to simple forgetfulness. Not competition. Not pricing. Just forgetting to follow up.
 </p>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-4">
 But here's the exciting news: Freelancers who implement a simple CRM system see their income grow by an average of 50-100% within a year. Why? Because they never lose a lead, they follow up at the perfect time, and they can predict their income based on their pipeline.
 </p>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
 This guide reveals the exact CRM systems successful freelancers use, from simple (free Notion templates) to sophisticated (Pipedrive). By the end, you'll know exactly which CRM fits your business and how to implement it this week.
 </p>
 </div>

 {/* Do You Need a CRM? */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
 Do You Actually Need a CRM? (Take This 60-Second Quiz)
 </h2>

 <div className="space-y-4 mb-6">
 <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 border border-primary/20">
 <p className="text-gray-900 dark:text-white font-semibold mb-3">Answer YES or NO to each question:</p>
 <ul className="space-y-3">
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <span className="font-bold text-primary">1.</span>
 <span>Have you ever forgotten to follow up with a potential client?</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <span className="font-bold text-primary">2.</span>
 <span>Do you have multiple leads in different stages (inquiry → proposal → negotiation)?</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <span className="font-bold text-primary">3.</span>
 <span>Do you want to earn more without working more hours?</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <span className="font-bold text-primary">4.</span>
 <span>Do you struggle to predict your income 3-6 months from now?</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <span className="font-bold text-primary">5.</span>
 <span>Do you lose track of past conversations with leads?</span>
 </li>
 </ul>
 </div>

 <div className="bg-accent/10 dark:bg-accent/20 rounded-xl p-6 border border-accent/30">
 <p className="text-gray-900 dark:text-white font-semibold mb-2">Results:</p>
 <ul className="text-gray-700 dark:text-gray-300 space-y-2">
 <li><strong>3+ YES:</strong>You absolutely need a CRM. Start with a simple one today.</li>
 <li><strong>1-2 YES:</strong>A basic CRM will help. Try a free option first.</li>
 <li><strong>0 YES:</strong>You're either a genius or not doing enough outreach </li>
 </ul>
 </div>
 </div>
 </div>

 {/* CRM Options */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <div className="flex items-center gap-4 mb-6">
 <Database className="w-12 h-12 text-primary" />
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-heading">
 The 5 Best CRM Options for Freelancers (Ranked by Complexity)
 </h2>
 </div>

 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 text-lg">
 From dead simple to surprisingly powerful, here are your options:
 </p>

 <div className="space-y-6">
 <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border-l-4 border-accent">
 <div className="flex items-center gap-3 mb-3">
 <span className="bg-accent text-white font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center">1</span>
 <h3 className="font-bold text-gray-900 dark:text-white text-xl font-heading">Google Sheets (Free, Easiest)</h3>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 Yes, really. A simple spreadsheet with columns: Lead Name, Email, Status (New/Contacted/Proposal Sent/Won/Lost), Next Follow-up Date, Notes. That's it.
 </p>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
 <div>
 <p className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Pros:</p>
 <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
 <li>✓ 100% free forever</li>
 <li>✓ Zero learning curve</li>
 <li>✓ Start in 5 minutes</li>
 </ul>
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Cons:</p>
 <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
 <li>✗ No automation</li>
 <li>✗ Manual updates</li>
 <li>✗ No reminders</li>
 </ul>
 </div>
 </div>
 <p className="text-sm text-primary font-semibold">Best for: Absolute beginners, &lt;5 leads/month</p>
 </div>

 <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border-l-4 border-primary">
 <div className="flex items-center gap-3 mb-3">
 <span className="bg-primary text-white font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center">2</span>
 <h3 className="font-bold text-gray-900 dark:text-white text-xl font-heading">Notion CRM Template (Free, Simple)</h3>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 Notion's database feature makes an excellent CRM. Drag-and-drop pipeline view, automatic reminders, link to notes and projects. Beautiful interface that doesn't feel like a CRM.
 </p>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
 <div>
 <p className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Pros:</p>
 <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
 <li>✓ Free for individuals</li>
 <li>✓ Beautiful interface</li>
 <li>✓ Combines notes + CRM</li>
 <li>✓ Many free templates</li>
 </ul>
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Cons:</p>
 <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
 <li>✗ Manual data entry</li>
 <li>✗ Limited automation</li>
 <li>✗ No email integration</li>
 </ul>
 </div>
 </div>
 <p className="text-sm text-primary font-semibold">Best for: Creative freelancers, 5-20 leads/month, those who love Notion</p>
 </div>

 <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border-l-4 border-accent">
 <div className="flex items-center gap-3 mb-3">
 <span className="bg-accent text-white font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center">3</span>
 <h3 className="font-bold text-gray-900 dark:text-white text-xl font-heading">HubSpot CRM (Free, Feature-Rich)</h3>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 The most powerful free CRM. Email integration, automatic activity logging, deal pipeline, email sequences, meeting scheduler. Shocking that it's free.
 </p>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
 <div>
 <p className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Pros:</p>
 <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
 <li>✓ 100% free (unlimited contacts)</li>
 <li>✓ Email tracking & templates</li>
 <li>✓ Meeting scheduler</li>
 <li>✓ Deal pipeline</li>
 </ul>
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Cons:</p>
 <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
 <li>✗ Overwhelming interface</li>
 <li>✗ Built for sales teams</li>
 <li>✗ Steep learning curve</li>
 </ul>
 </div>
 </div>
 <p className="text-sm text-accent font-semibold">Best for: Serious freelancers, 20+ leads/month, those willing to learn</p>
 </div>

 <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border-l-4 border-primary">
 <div className="flex items-center gap-3 mb-3">
 <span className="bg-primary text-white font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center">4</span>
 <h3 className="font-bold text-gray-900 dark:text-white text-xl font-heading">Pipedrive (Paid, Freelance-Friendly)</h3>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 Built specifically for solo salespeople. Visual pipeline, smart follow-up reminders, email integration, mobile app. The CRM that feels like it was made for freelancers (because it was).
 </p>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
 <div>
 <p className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Pros:</p>
 <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
 <li>✓ Dead simple interface</li>
 <li>✓ Smart activity reminders</li>
 <li>✓ Mobile-first design</li>
 <li>✓ Email sync & templates</li>
 </ul>
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Cons:</p>
 <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
 <li>✗ Paid ($15-99/month)</li>
 <li>✗ Overkill for &lt;10 leads/month</li>
 </ul>
 </div>
 </div>
 <p className="text-sm text-primary font-semibold">Price: From $15/month • Best for: Full-time freelancers, 30+ leads/month</p>
 </div>

 <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border-l-4 border-accent">
 <div className="flex items-center gap-3 mb-3">
 <span className="bg-accent text-white font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center">5</span>
 <h3 className="font-bold text-gray-900 dark:text-white text-xl font-heading">Airtable (Hybrid, Customizable)</h3>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 Spreadsheet meets database meets CRM. Infinitely customizable with forms, automations, and integrations. Power users love it. Build exactly the CRM you want.
 </p>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
 <div>
 <p className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Pros:</p>
 <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
 <li>✓ Free for basics</li>
 <li>✓ Completely customizable</li>
 <li>✓ Great templates</li>
 <li>✓ Automation features</li>
 </ul>
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Cons:</p>
 <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
 <li>✗ Requires setup time</li>
 <li>✗ Learning curve</li>
 </ul>
 </div>
 </div>
 <p className="text-sm text-accent font-semibold">Price: Free for 1,200 records, $20/month for Pro • Best for: Tech-savvy freelancers who want control</p>
 </div>
 </div>
 </div>

 {/* CTA 1 */}
 <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white text-center">
 <Users className="w-16 h-16 text-white mx-auto mb-6" />
 <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
 Ready to Never Lose a Lead Again?
 </h2>
 <p className="text-xl text-white/90 mb-8">
 Start tracking your leads today with our free tools and see your income grow.
 </p>
 <Link
 href={`/${locale}/tools`}
 className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg font-heading"
 >
 Try Free Tools
 <ArrowRight className="w-5 h-5" />
 </Link>
 </div>

 {/* Implementation Guide */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
 How to Implement Your CRM in One Weekend
 </h2>

 <div className="space-y-6">
 <div className="border-l-4 border-primary pl-6">
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-xl font-heading">Friday Evening (2 hours): Choose & Setup</h3>
 <ul className="text-gray-700 dark:text-gray-300 space-y-2">
 <li>• Pick your CRM based on your lead volume (see recommendations above)</li>
 <li>• Create account and watch setup tutorial</li>
 <li>• Customize pipeline stages: Lead → Contacted → Proposal → Negotiation → Won/Lost</li>
 <li>• Connect your email (if applicable)</li>
 </ul>
 </div>

 <div className="border-l-4 border-accent pl-6">
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-xl font-heading">Saturday Morning (3 hours): Import Existing Data</h3>
 <ul className="text-gray-700 dark:text-gray-300 space-y-2">
 <li>• Go through your email and add every potential lead from the past 6 months</li>
 <li>• Add current clients with their project history</li>
 <li>• Add past clients (for future upsell opportunities)</li>
 <li>• Set follow-up reminders for each active lead</li>
 </ul>
 </div>

 <div className="border-l-4 border-primary pl-6">
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-xl font-heading">Saturday Afternoon (1 hour): Create Templates</h3>
 <ul className="text-gray-700 dark:text-gray-300 space-y-2">
 <li>• Email template: Initial outreach</li>
 <li>• Email template: Follow-up #1, #2, #3</li>
 <li>• Email template: Proposal follow-up</li>
 <li>• Notes template: Discovery call notes</li>
 </ul>
 </div>

 <div className="border-l-4 border-accent pl-6">
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-xl font-heading">Sunday (30 min): Daily Habit Setup</h3>
 <ul className="text-gray-700 dark:text-gray-300 space-y-2">
 <li>• Set calendar reminder: "Check CRM" at 9 AM daily</li>
 <li>• Complete your first 3 follow-ups</li>
 <li>• Commit to updating CRM after every client interaction</li>
 </ul>
 </div>
 </div>
 </div>

 <AdWidget placement="blog_sidebar" />

 {/* Internal Links */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
 Related Guides
 </h2>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <Link
 href={`/${locale}/gids/tools-productiviteit/client-communication-tools`}
 className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600 hover:shadow-lg transition-all group"
 >
 <Star className="w-10 h-10 text-primary mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors font-heading">
 Client Communication Tools
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">
 Integrate your CRM with communication tools
 </p>
 </Link>
 <Link
 href={`/${locale}/gids/tools-productiviteit/automation-workflows-freelance`}
 className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600 hover:shadow-lg transition-all group"
 >
 <Zap className="w-10 h-10 text-accent mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors font-heading">
 Automation Workflows
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">
 Automate your CRM follow-ups and updates
 </p>
 </Link>
 </div>
 </div>

 {/* CTA 2 */}
 <div className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
 <TrendingUp className="w-16 h-16 text-white mx-auto mb-6" />
 <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
 Find Platforms That Integrate with Your CRM
 </h2>
 <p className="text-xl text-white/90 mb-8">
 Some freelance platforms sync with popular CRMs. Discover which platforms make lead management easier.
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg font-heading"
 >
 Compare Platforms
 <ArrowRight className="w-5 h-5" />
 </Link>
 </div>
 </div>
 </article>
 </main>
 <Footer />
 </>
 );
}
