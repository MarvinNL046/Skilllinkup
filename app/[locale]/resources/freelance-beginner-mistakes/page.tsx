import Link from "next/link";
import { getTranslations } from "next-intl/server";

interface PageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
 const { locale } = await params;

 const slug = 'freelance-beginner-mistakes';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

 return {
 title: "Top 10 Mistakes New Freelancers Make (And How to Avoid Them)",
 description: "Learn the costly mistakes 90% of new freelancers make and how to avoid them. Save months of frustration with this proven guide for beginners.",
 keywords: "freelance mistakes to avoid, new freelancer tips, beginner freelance errors, common freelance problems, freelance pitfalls",
 openGraph: {
 title: "Top 10 Mistakes New Freelancers Make (And How to Avoid Them)",
 description: "Learn the costly mistakes 90% of new freelancers make and how to avoid them. Save months of frustration with this proven guide for beginners.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/resources-og.png`,
 width: 1200,
 height: 630,
 alt: 'Top 10 Mistakes New Freelancers Make (And How to Avoid Them)',
 }
 ],
 locale: locale === 'nl' ? 'nl_NL' : 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "Top 10 Mistakes New Freelancers Make (And How to Avoid Them)",
 description: "Learn the costly mistakes 90% of new freelancers make and how to avoid them. Save months of frustration with this proven guide for beginners.",
 images: [`${siteUrl}/images/og/resources-og.png`],
 creator: '@SkillLinkup',
 site: '@SkillLinkup',
 },
 alternates: {
 canonical: pageUrl,
 languages: {
 'en': `${siteUrl}/en/resources/${slug}`,
 'nl': `${siteUrl}/nl/resources/${slug}`,
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

export default async function FreelanceBeginnerMistakesPage({ params }: PageProps) {
 const { locale} = await params;

 const jsonLd = {
 "@context": "https://schema.org",
 "@type": "Article",
 "headline": "Top 10 Mistakes New Freelancers Make (and How to Avoid Them)",
 "description": "Comprehensive guide covering the most common and costly mistakes beginners make when starting their freelance career, with actionable solutions.",
 "author": {
 "@type": "Organization",
 "name": "SkillLinkup"
 },
 "datePublished": "2026-01-15",
 "dateModified": "2026-01-15"
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />
 
 <main className="flex-1">
 {/* Hero Section */}
 <section className="bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-16 sm:py-24">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-semibold mb-6">
 <span>Avoid These Common Pitfalls</span>
 </div>
 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6">
 Top 10 Mistakes New Freelancers Make (and How to Avoid Them)
 </h1>
 <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
 Don&apos;t learn the hard way. These mistakes cost beginners thousands of dollars and months of frustration. Learn from others&apos; failures and fast-track your freelance success.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-primary text-white font-heading font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
 >
 Browse Platforms
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
 </svg>
 </Link>
 </div>
 </div>
 </div>
 </section>

 {/* Introduction */}
 <section className="py-12 bg-white dark:bg-gray-800">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto">
 <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-yellow-200 dark:border-yellow-800/30">
 <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
 The Cost of Common Mistakes
 </h2>
 <div className="grid md:grid-cols-3 gap-4">
 <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-xl">
 <div className="text-3xl font-heading font-bold text-red-500 mb-1">73%</div>
 <div className="text-sm text-gray-600 dark:text-gray-400">Quit within first year</div>
 </div>
 <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-xl">
 <div className="text-3xl font-heading font-bold text-orange-500 mb-1">$3,200</div>
 <div className="text-sm text-gray-600 dark:text-gray-400">Avg lost to bad clients</div>
 </div>
 <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-xl">
 <div className="text-3xl font-heading font-bold text-yellow-500 mb-1">6-9mo</div>
 <div className="text-sm text-gray-600 dark:text-gray-400">Time to recover</div>
 </div>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mt-6 text-center">
 Most mistakes are completely avoidable. This guide will save you months of trial and error.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* Main Content */}
 <article className="py-16 bg-gray-50 dark:bg-gray-900">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto">

 {/* Mistake 1 */}
 <div className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md border-l-4 border-red-500">
 <div className="flex items-start gap-4 mb-6">
 <span className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">1</span>
 <div className="flex-1">
 <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">
 Waiting for the "Perfect" Moment to Start
 </h2>
 <p className="text-red-600 dark:text-red-400 font-semibold">Cost: 3-6 months of potential income</p>
 </div>
 </div>

 <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
 <p>
 <strong>The Mistake:</strong>&quot;I&apos;ll start freelancing once I have 5 portfolio pieces, complete this course, get certified, and feel 100% ready.&quot; Meanwhile, months pass and you haven&apos;t applied to a single job.
 </p>
 <p>
 <strong>Why It Hurts:</strong>The &quot;perfect&quot; moment never comes. While you&apos;re preparing, you&apos;re missing out on real-world learning that only comes from actual client work. That 3-month delay costs you $3,000-$6,000 in potential earnings plus delayed momentum.
 </p>

 <div className="bg-accent/10 dark:bg-accent/20 rounded-xl p-6 border-l-4 border-accent my-6">
 <p className="font-semibold text-gray-900 dark:text-white mb-3">✓ How to Avoid It:</p>
 <ul className="space-y-2">
 <li className="flex items-start gap-2">
 <span className="text-accent mt-1">▸</span>
 <span><strong>Start before you&apos;re ready:</strong>Apply to 5 jobs this week, even if you only have 1 portfolio piece</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-accent mt-1">▸</span>
 <span><strong>Learn by doing:</strong>You&apos;ll learn more from one real project than from three courses</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-accent mt-1">▸</span>
 <span><strong>Set a hard deadline:</strong>&quot;I will send my first proposal by Friday at 5pm&quot;</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-accent mt-1">▸</span>
 <span><strong>Remember:</strong>Clients care about solving their problem, not your credentials</span>
 </li>
 </ul>
 </div>

 <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-400 dark:border-blue-500">
 <p className="text-gray-800 dark:text-gray-200 text-sm">
 <strong>Real Story:</strong>Jessica waited 4 months &quot;preparing&quot; before sending her first proposal. When she finally started, she landed a client within a week. She now makes $6K/month and regrets not starting sooner.
 </p>
 </div>
 </div>
 </div>

 {/* Mistake 2 */}
 <div className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md border-l-4 border-orange-500">
 <div className="flex items-start gap-4 mb-6">
 <span className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">2</span>
 <div className="flex-1">
 <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">
 Underpricing Yourself Out of Fear
 </h2>
 <p className="text-orange-600 dark:text-orange-400 font-semibold">Cost: $10,000+ in first year</p>
 </div>
 </div>

 <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
 <p>
 <strong>The Mistake:</strong>Setting your rate at $5-10/hour because you&apos;re &quot;just starting&quot; and competing on price. Accepting every lowball offer because you&apos;re desperate for reviews.
 </p>
 <p>
 <strong>Why It Hurts:</strong>Rock-bottom pricing attracts the worst clients—the ones who demand endless revisions, pay late, leave bad reviews, and drain your energy. You&apos;ll work 60+ hours per week and still barely make rent. Plus, it&apos;s nearly impossible to raise rates later without losing all your clients.
 </p>

 <div className="bg-primary/10 dark:bg-primary/20 rounded-xl p-6 border-l-4 border-primary my-6">
 <p className="font-semibold text-gray-900 dark:text-white mb-3">✓ How to Avoid It:</p>
 <ul className="space-y-2">
 <li className="flex items-start gap-2">
 <span className="text-primary mt-1">▸</span>
 <span><strong>Research market rates:</strong>Check 20-30 similar profiles, target the 30th-50th percentile as a beginner</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary mt-1">▸</span>
 <span><strong>Set minimums:</strong>Never go below $15-20/hour or $50/project, regardless of desperation</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary mt-1">▸</span>
 <span><strong>Start at 20-30% below market:</strong>Still competitive but not basement-level</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary mt-1">▸</span>
 <span><strong>Raise rates every 5 clients:</strong>Increase by $5-10/hr or 15-20% per project</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary mt-1">▸</span>
 <span><strong>Compete on value, not price:</strong>Focus proposals on results, not being cheapest</span>
 </li>
 </ul>
 </div>

 <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-400 dark:border-red-500">
 <p className="text-gray-800 dark:text-gray-200 text-sm">
 <strong>The $5 Trap:</strong>Sarah charged $5 for logo designs &quot;to build reviews.&quot; She got 20 clients who each demanded 15+ revisions, took weeks to approve, and some still left 3-star reviews. She made $100 for 80+ hours of work. Don&apos;t be Sarah.
 </p>
 </div>
 </div>
 </div>

 {/* Mistake 3 */}
 <div className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md border-l-4 border-yellow-500">
 <div className="flex items-start gap-4 mb-6">
 <span className="bg-yellow-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">3</span>
 <div className="flex-1">
 <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">
 Sending Generic Copy-Paste Proposals
 </h2>
 <p className="text-yellow-600 dark:text-yellow-400 font-semibold">Cost: 90% lower response rate</p>
 </div>
 </div>

 <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
 <p>
 <strong>The Mistake:</strong>Creating one &quot;good&quot; proposal and sending it to 100 jobs with minimal changes. &quot;Dear Client, I am a professional [skill] with [years] experience...&quot;
 </p>
 <p>
 <strong>Why It Hurts:</strong>Clients can spot templates instantly. They receive 20-50 proposals per job and yours gets skipped in 3 seconds. You waste time applying to jobs with zero chance of winning. Your response rate stays below 5% when it should be 15-20%.
 </p>

 <div className="bg-accent/10 dark:bg-accent/20 rounded-xl p-6 border-l-4 border-accent my-6">
 <p className="font-semibold text-gray-900 dark:text-white mb-3">✓ How to Avoid It:</p>
 <ul className="space-y-2">
 <li className="flex items-start gap-2">
 <span className="text-accent mt-1">▸</span>
 <span><strong>Read the entire job post:</strong>Spend 5 minutes understanding their actual needs</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-accent mt-1">▸</span>
 <span><strong>Reference something specific:</strong>Mention their company name, project goal, or specific requirement</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-accent mt-1">▸</span>
 <span><strong>Restate their problem:</strong>Show understanding before pitching your solution</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-accent mt-1">▸</span>
 <span><strong>Use a framework, not a template:</strong>Follow structure but customize every word</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-accent mt-1">▸</span>
 <span><strong>Quality over quantity:</strong>5 personalized proposals beat 50 generic ones</span>
 </li>
 </ul>
 </div>

 <p className="text-sm text-gray-600 dark:text-gray-400 italic">
 Learn the proven 4-part proposal formula in our guide: <Link href={`/${locale}/resources/first-freelance-proposal`} className="text-primary hover:text-primary/80 underline font-semibold">How to Write Your First Freelance Proposal</Link>
 </p>
 </div>
 </div>

 {/* CTA 1 */}
 <div className="my-16 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl p-8 text-center shadow-xl">
 <h3 className="text-2xl font-heading font-bold text-white mb-4">
 Avoid These Mistakes From Day One
 </h3>
 <p className="text-white/90 mb-6 max-w-2xl mx-auto">
 Start your freelance journey the right way. Browse beginner-friendly platforms and apply these lessons immediately.
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary font-heading font-semibold hover:bg-gray-100 transition-all shadow-lg"
 >
 Browse Platforms
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
 </svg>
 </Link>
 </div>

 {/* Mistake 4 */}
 <div className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md border-l-4 border-red-500">
 <div className="flex items-start gap-4 mb-6">
 <span className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">4</span>
 <div className="flex-1">
 <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">
 Poor Communication with Clients
 </h2>
 <p className="text-red-600 dark:text-red-400 font-semibold">Cost: 60% of negative reviews</p>
 </div>
 </div>

 <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
 <p>
 <strong>The Mistake:</strong>Taking 24+ hours to respond to messages. Going silent for days while working. Not updating clients on progress. Assuming they know what you&apos;re doing.
 </p>
 <p>
 <strong>Why It Hurts:</strong>Clients value responsiveness more than raw skill. Slow communication triggers anxiety—they worry you disappeared with their money. Even if you deliver great work, poor communication leads to bad reviews, refund requests, and damaged reputation.
 </p>

 <div className="bg-primary/10 dark:bg-primary/20 rounded-xl p-6 border-l-4 border-primary my-6">
 <p className="font-semibold text-gray-900 dark:text-white mb-3">✓ How to Avoid It:</p>
 <ul className="space-y-2">
 <li className="flex items-start gap-2">
 <span className="text-primary mt-1">▸</span>
 <span><strong>Respond within 2 hours during business hours:</strong>Even if just to say &quot;Got it, I&apos;ll have details by tomorrow&quot;</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary mt-1">▸</span>
 <span><strong>Send daily updates on active projects:</strong>Quick message: &quot;Made great progress today, 60% complete&quot;</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary mt-1">▸</span>
 <span><strong>Over-communicate at the start:</strong>Set expectations, confirm requirements, outline process</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary mt-1">▸</span>
 <span><strong>Use auto-responses:</strong>Set up &quot;I&apos;m working and will respond by [time]&quot; messages</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary mt-1">▸</span>
 <span><strong>Warn about delays immediately:</strong>Don&apos;t let deadlines pass silently</span>
 </li>
 </ul>
 </div>

 <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-400 dark:border-blue-500">
 <p className="text-gray-800 dark:text-gray-200 text-sm">
 <strong>Communication Template:</strong>&quot;Hi [Name], quick update: I&apos;ve completed [X] and [Y]. Tomorrow I&apos;ll work on [Z]. On track for Friday delivery. Let me know if you have any questions!&quot; Takes 30 seconds, prevents 100% of anxiety.
 </p>
 </div>
 </div>
 </div>

 {/* Mistake 5 */}
 <div className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md border-l-4 border-orange-500">
 <div className="flex items-start gap-4 mb-6">
 <span className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">5</span>
 <div className="flex-1">
 <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">
 Starting Work Without Clear Scope
 </h2>
 <p className="text-orange-600 dark:text-orange-400 font-semibold">Cost: Scope creep steals 30% of time</p>
 </div>
 </div>

 <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
 <p>
 <strong>The Mistake:</strong>Client: &quot;I need a logo.&quot; You: &quot;Great, I&apos;ll start!&quot; Then they expect 10 revisions, 5 color variations, social media versions, and business card layouts—all for your $50 quote.
 </p>
 <p>
 <strong>Why It Hurts:</strong>Vague agreements lead to endless scope creep. What you thought was a 2-hour job becomes 15 hours. You can&apos;t say no without risking a bad review. Your effective hourly rate plummets. You work weekends to catch up. Burnout hits within 3 months.
 </p>

 <div className="bg-accent/10 dark:bg-accent/20 rounded-xl p-6 border-l-4 border-accent my-6">
 <p className="font-semibold text-gray-900 dark:text-white mb-3">✓ How to Avoid It:</p>
 <ul className="space-y-2">
 <li className="flex items-start gap-2">
 <span className="text-accent mt-1">▸</span>
 <span><strong>Define everything upfront:</strong>Exactly what will be delivered, format, specifications</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-accent mt-1">▸</span>
 <span><strong>Limit revisions:</strong>&quot;Includes 2 rounds of revisions, additional revisions $X each&quot;</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-accent mt-1">▸</span>
 <span><strong>Get written agreement:</strong>Send a message summarizing scope before starting</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-accent mt-1">▸</span>
 <span><strong>Politely push back:</strong>&quot;That would be outside our agreement. I can add it for $X&quot;</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-accent mt-1">▸</span>
 <span><strong>Use contracts/statements of work:</strong>Even simple ones protect both sides</span>
 </li>
 </ul>
 </div>

 <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-400 dark:border-yellow-500">
 <p className="text-gray-800 dark:text-gray-200 text-sm mb-2">
 <strong>Scope Definition Template:</strong>
 </p>
 <p className="text-gray-700 dark:text-gray-300 text-sm">
 &quot;To confirm, I&apos;ll deliver: [Specific deliverables]. Format: [File types]. Timeline: [Days]. Includes: [Number] of revisions. Additional requests will be quoted separately. Does this match your expectations?&quot;
 </p>
 </div>
 </div>
 </div>

 {/* Mistakes 6-10 Condensed */}
 <div className="mb-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700">
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8 text-center">
 5 More Critical Mistakes to Avoid
 </h2>

 <div className="space-y-8">
 {/* Mistake 6 */}
 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-l-4 border-yellow-500">
 <div className="flex items-start gap-3 mb-3">
 <span className="bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">6</span>
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
 Not Reading Job Posts Completely
 </h3>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-3">
 <strong>The Mistake:</strong>Skimming job posts and missing crucial requirements or specific instructions like &quot;Start your proposal with [keyword]&quot; to prove you read it.
 </p>
 <p className="text-gray-700 dark:text-gray-300 mb-3">
 <strong>The Fix:</strong>Read every word of job posts. Take notes. Clients who add secret instructions are filtering out lazy applicants—don&apos;t be one of them. This alone can triple your response rate.
 </p>
 </div>

 {/* Mistake 7 */}
 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-l-4 border-red-500">
 <div className="flex items-start gap-3 mb-3">
 <span className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">7</span>
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
 Ignoring Red Flag Clients
 </h3>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-3">
 <strong>The Mistake:</strong>Accepting jobs from clients with no reviews, unclear requirements, or unrealistic expectations because you need the money.
 </p>
 <p className="text-gray-700 dark:text-gray-300 mb-3">
 <strong>The Fix:</strong>Trust your gut. Red flags include: demanding work before payment, asking for free samples, unclear scope, aggressive communication, or &quot;this should be easy&quot; attitude. One bad client can destroy your rating and mental health. It&apos;s okay to say no.
 </p>
 </div>

 {/* Mistake 8 */}
 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-l-4 border-orange-500">
 <div className="flex items-start gap-3 mb-3">
 <span className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">8</span>
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
 Not Building an Email List
 </h3>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-3">
 <strong>The Mistake:</strong>Relying 100% on platforms for clients. Never asking for client contact info. Platform suspends your account = you lose everything overnight.
 </p>
 <p className="text-gray-700 dark:text-gray-300 mb-3">
 <strong>The Fix:</strong>Once you complete projects successfully, ask clients if they&apos;d like to work directly in the future. Build your own client list and website. Most platforms allow this after the first project. Your goal: 50% platform work, 50% direct clients by month 6.
 </p>
 </div>

 {/* Mistake 9 */}
 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-l-4 border-yellow-500">
 <div className="flex items-start gap-3 mb-3">
 <span className="bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">9</span>
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
 Neglecting Your Profile & Portfolio
 </h3>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-3">
 <strong>The Mistake:</strong>Creating your profile once and never updating it. Not adding new work to your portfolio. Letting it go stale.
 </p>
 <p className="text-gray-700 dark:text-gray-300 mb-3">
 <strong>The Fix:</strong>Update your portfolio monthly with best new work. Refresh your bio every quarter. Test new profile headlines. Add testimonials immediately after positive reviews. Active profiles get 3x more visibility in platform search.
 </p>
 </div>

 {/* Mistake 10 */}
 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-l-4 border-red-500">
 <div className="flex items-start gap-3 mb-3">
 <span className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">10</span>
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
 Giving Up Too Soon
 </h3>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-3">
 <strong>The Mistake:</strong>Sending 10-15 proposals, getting no responses, and concluding &quot;freelancing doesn&apos;t work.&quot; Quitting after one bad client experience.
 </p>
 <p className="text-gray-700 dark:text-gray-300 mb-3">
 <strong>The Fix:</strong>Expect a 5-10% response rate as a beginner. That means sending 50-100 proposals to land 5-10 interviews and 2-3 clients. This is normal. Success comes from persistence and continuous improvement. Most successful freelancers failed for their first 2-3 months before breaking through. The ones who made it simply didn&apos;t quit.
 </p>
 </div>
 </div>
 </div>

 {/* Action Plan */}
 <div className="mb-16 bg-gradient-to-br from-accent/10 to-primary/10 dark:from-accent/20 dark:to-primary/20 rounded-2xl p-8 border border-accent/20 dark:border-accent/30">
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
 Your Mistake-Proof Action Plan
 </h2>
 <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
 Knowledge is worthless without action. Here&apos;s how to implement everything you learned today:
 </p>

 <div className="space-y-4">
 <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-l-4 border-primary">
 <h3 className="font-bold text-gray-900 dark:text-white mb-3">This Week:</h3>
 <ul className="space-y-2 text-gray-700 dark:text-gray-300">
 <li className="flex items-start gap-2">
 <span>Set your minimum rate at $15-20/hr minimum (no exceptions)</span>
 </li>
 <li className="flex items-start gap-2">
 <span>Create proposal template following the <Link href={`/${locale}/resources/first-freelance-proposal`} className="text-primary underline">4-part formula</Link></span>
 </li>
 <li className="flex items-start gap-2">
 <span>Update your <Link href={`/${locale}/resources/freelance-profile-templates`} className="text-primary underline">profile</Link>with results-focused bio</span>
 </li>
 <li className="flex items-start gap-2">
 <span>Write your scope definition template and save it</span>
 </li>
 <li className="flex items-start gap-2">
 <span>Send 10 personalized proposals to relevant jobs</span>
 </li>
 </ul>
 </div>

 <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-l-4 border-accent">
 <h3 className="font-bold text-gray-900 dark:text-white mb-3">First 30 Days:</h3>
 <ul className="space-y-2 text-gray-700 dark:text-gray-300">
 <li className="flex items-start gap-2">
 <span>Apply to 5-10 jobs daily with personalized proposals</span>
 </li>
 <li className="flex items-start gap-2">
 <span>Respond to all client messages within 2 hours</span>
 </li>
 <li className="flex items-start gap-2">
 <span>Send daily updates on active projects</span>
 </li>
 <li className="flex items-start gap-2">
 <span>Get scope agreement in writing before starting work</span>
 </li>
 <li className="flex items-start gap-2">
 <span>Track proposal success rate and refine approach</span>
 </li>
 </ul>
 </div>

 <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-l-4 border-secondary">
 <h3 className="font-bold text-gray-900 dark:text-white mb-3">After First Client:</h3>
 <ul className="space-y-2 text-gray-700 dark:text-gray-300">
 <li className="flex items-start gap-2">
 <span>Over-deliver on quality to earn 5-star review</span>
 </li>
 <li className="flex items-start gap-2">
 <span>Ask for testimonial and add to portfolio</span>
 </li>
 <li className="flex items-start gap-2">
 <span>Increase rates by $5-10/hr for next proposals</span>
 </li>
 <li className="flex items-start gap-2">
 <span>Maintain momentum by continuing to apply daily</span>
 </li>
 <li className="flex items-start gap-2">
 <span>Don&apos;t quit—success compounds with each client</span>
 </li>
 </ul>
 </div>
 </div>
 </div>

 </div>
 </div>
 </article>

 {/* CTA 2 */}
 <section className="py-16 bg-gradient-to-br from-secondary via-primary to-accent">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
 Learn From Others&apos; Mistakes, Not Your Own
 </h2>
 <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
 Join successful freelancers who avoided these pitfalls and built thriving careers. Get weekly tips and success strategies.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <Link
 href={`/${locale}/reviews`}
 className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-primary font-heading font-semibold hover:bg-gray-100 transition-all shadow-lg"
 >
 Read Success Stories
 </Link>
 <Link
 href={`/${locale}/newsletter`}
 className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent text-white font-heading font-semibold hover:bg-accent/90 transition-all shadow-lg"
 >
 Get Weekly Tips
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
 </svg>
 </Link>
 </div>
 </div>
 </div>
 </section>

 {/* Related Articles */}
 <section className="py-12 bg-gray-50 dark:bg-gray-900">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto">
 <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
 Build Your Freelance Foundation
 </h2>
 <div className="grid md:grid-cols-2 gap-6">
 <Link
 href={`/${locale}/resources/freelance-beginners-guide`}
 className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group"
 >
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
 Complete Freelance Beginner&apos;s Guide
 </h3>
 <p className="text-gray-600 dark:text-gray-300 text-sm">
 Start from zero and land your first client in 30 days with our comprehensive step-by-step roadmap.
 </p>
 </Link>
 <Link
 href={`/${locale}/resources/freelance-platform-setup`}
 className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group"
 >
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
 Freelance Platform Setup Guide
 </h3>
 <p className="text-gray-600 dark:text-gray-300 text-sm">
 Step-by-step instructions for setting up profiles on all major freelance platforms the right way.
 </p>
 </Link>
 </div>
 </div>
 </div>
 </section>
 </main>
 
 </>
 );
}
