import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type Props = {
 params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'first-client-in-30-days';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/aan-de-slag/${slug}`;

 return {
 title: "Land Your First Freelance Client in 30 Days (2026 Proven System)",
 description: "Zero to paid client in 30 days. Follow this daily action plan used by 500+ beginners. No portfolio required. Works for all skills. Step-by-step checklist included.",
 keywords: "first freelance client, get freelance clients, find clients 30 days, beginner freelance guide, how to get clients 2026",
 openGraph: {
 title: "Land Your First Freelance Client in 30 Days (2026 Proven System)",
 description: "Zero to paid client in 30 days. Follow this daily action plan used by 500+ beginners. No portfolio required. Works for all skills. Step-by-step checklist included.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Land Your First Freelance Client in 30 Days - SkillLinkup',
 }
 ],
 locale: locale === 'nl' ? 'nl_NL' : 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "Land Your First Freelance Client in 30 Days (2026 Proven System)",
 description: "Zero to paid client in 30 days. Follow this daily action plan used by 500+ beginners. No portfolio required. Works for all skills. Step-by-step checklist included.",
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 },
 };
}

export default async function FirstClientIn30DaysPage({ params }: Props) {
 const { locale } = await params;

 return (
 <>
 <Header />

 <main className="min-h-screen bg-[#f8f9fb]">
 {/* Hero Section */}
 <section className="bg-gradient-to-br from-[#1e1541] via-[#2a1f5e] to-[#1e1541] text-white py-16">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
 Land Your First Freelance Client in 30 Days (Even With Zero Experience)
 </h1>
 <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
 Follow this daily action plan to go from "I want to freelance" to "I just got paid." No guessing. No wasted time. Just a proven system that works.
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Find Clients on Top Platforms →
 </Link>
 </div>
 </div>
 </section>

 {/* Main Content */}
 <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">

 {/* Section 1: Why 30 Days */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Why 30 Days Is the Perfect Timeline
 </h2>
 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Not too fast to feel rushed. Not too slow to lose momentum. 30 days gives you enough time to build foundations, make connections, and land your first paying project.
 </p>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 What You'll Accomplish in 30 Days
 </h3>
 <div className="grid md:grid-cols-3 gap-6">
 <div className="text-center">
 <div className="bg-[#ef2b70]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
 <span className="text-3xl">1</span>
 </div>
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">Week 1</h4>
 <p className="text-sm text-[#64607d]">Foundation setup: profile, portfolio, positioning</p>
 </div>
 <div className="text-center">
 <div className="bg-[#ef2b70]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
 <span className="text-3xl">2</span>
 </div>
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">Week 2-3</h4>
 <p className="text-sm text-[#64607d]">Active outreach: proposals, applications, networking</p>
 </div>
 <div className="text-center">
 <div className="bg-[#ef2b70]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
 <span className="text-3xl">3</span>
 </div>
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">Week 4</h4>
 <p className="text-sm text-[#64607d]">Close deals, start work, deliver results</p>
 </div>
 </div>
 </div>

 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg mb-8">
 <p className="text-[#1e1541] font-semibold mb-2">
 Reality Check
 </p>
 <p className="text-[#64607d]">
 This isn't "get rich quick." This is "get your first paying client by being strategic and consistent." If you follow the daily actions, you WILL get results.
 </p>
 </div>
 </div>
 </section>

 {/* Section 2: Week 1 - Foundation */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Week 1: Build Your Foundation (Days 1-7)
 </h2>

 <div className="space-y-6">
 {/* Day 1 */}
 <div className="bg-white rounded-lg shadow-lg p-6">
 <div className="flex items-start mb-4">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
 1
 </div>
 <div className="flex-1">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Day 1: Pick Your Service (1 Hour)
 </h3>
 <p className="text-[#64607d] mb-3">
 Don't try to be everything to everyone. Pick ONE service you can deliver confidently. You can expand later.
 </p>
 <div className="bg-[#f8f9fb] rounded-lg p-4">
 <p className="text-sm font-semibold text-[#1e1541] mb-2">Action Steps:</p>
 <ul className="space-y-1 text-sm text-[#64607d]">
 <li>• List 3 skills you have (writing, design, coding, etc.)</li>
 <li>• Research which skill has demand on Upwork/Fiverr</li>
 <li>• Choose ONE to focus on for these 30 days</li>
 </ul>
 </div>
 </div>
 </div>
 </div>

 {/* Day 2-3 */}
 <div className="bg-white rounded-lg shadow-lg p-6">
 <div className="flex items-start mb-4">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
 2-3
 </div>
 <div className="flex-1">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Day 2-3: Create Platform Profiles (3 Hours Total)
 </h3>
 <p className="text-[#64607d] mb-3">
 Sign up for 2-3 freelance platforms. Don't overthink this—get profiles live quickly.
 </p>
 <div className="bg-[#f8f9fb] rounded-lg p-4 mb-3">
 <p className="text-sm font-semibold text-[#1e1541] mb-2">Recommended Platforms for Beginners:</p>
 <div className="space-y-2 text-sm">
 <div className="flex justify-between items-center">
 <span className="text-[#64607d]">Upwork</span>
 <span className="text-xs bg-[#22c55e]/20 text-[#22c55e] px-2 py-1 rounded">Best overall</span>
 </div>
 <div className="flex justify-between items-center">
 <span className="text-[#64607d]">Fiverr</span>
 <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Easiest to start</span>
 </div>
 <div className="flex justify-between items-center">
 <span className="text-[#64607d]">Freelancer</span>
 <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">High volume</span>
 </div>
 </div>
 </div>
 <div className="bg-[#f8f9fb] rounded-lg p-4">
 <p className="text-sm font-semibold text-[#1e1541] mb-2">Profile Checklist:</p>
 <ul className="space-y-1 text-sm text-[#64607d]">
 <li>• Professional photo (or well-lit headshot)</li>
 <li>• Clear headline: "I help [client type] with [specific result]"</li>
 <li>• 150-word bio focusing on client benefits</li>
 <li>• List your ONE service with 3 bullet points</li>
 <li>• Add skills/keywords clients search for</li>
 </ul>
 </div>
 </div>
 </div>
 </div>

 {/* Day 4-5 */}
 <div className="bg-white rounded-lg shadow-lg p-6">
 <div className="flex items-start mb-4">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
 4-5
 </div>
 <div className="flex-1">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Day 4-5: Create 2-3 Portfolio Samples (4 Hours)
 </h3>
 <p className="text-[#64607d] mb-3">
 No clients yet? Create samples anyway. Here's how:
 </p>
 <div className="space-y-3">
 <div className="border-l-4 border-[#22c55e] pl-4">
 <p className="font-semibold text-[#1e1541] mb-1">Writers:</p>
 <p className="text-sm text-[#64607d]">Write 2-3 blog posts on topics in your niche. Publish on Medium or LinkedIn.</p>
 </div>
 <div className="border-l-4 border-[#22c55e] pl-4">
 <p className="font-semibold text-[#1e1541] mb-1">Designers:</p>
 <p className="text-sm text-[#64607d]">Redesign 2-3 existing websites or apps. Show before/after on Behance or Dribbble.</p>
 </div>
 <div className="border-l-4 border-[#22c55e] pl-4">
 <p className="font-semibold text-[#1e1541] mb-1">Developers:</p>
 <p className="text-sm text-[#64607d]">Build 2-3 small projects (calculator, to-do app, portfolio site). Push to GitHub.</p>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Day 6-7 */}
 <div className="bg-white rounded-lg shadow-lg p-6">
 <div className="flex items-start mb-4">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
 6-7
 </div>
 <div className="flex-1">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Day 6-7: Write Your Proposal Template (2 Hours)
 </h3>
 <p className="text-[#64607d] mb-3">
 Create a reusable template you'll customize for each application.
 </p>
 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg p-6 text-white">
 <h4 className="font-heading font-bold text-lg mb-3">Winning Proposal Template</h4>
 <div className="text-sm space-y-2 font-mono bg-white/10 rounded p-4">
 <p><strong>Line 1:</strong>Hi [Name], I read your [project type] post.</p>
 <p><strong>Line 2-3:</strong>I noticed you need [specific thing they mentioned].</p>
 <p><strong>Line 4-5:</strong>I've done similar work: [brief example with result].</p>
 <p><strong>Line 6:</strong>I can deliver [their outcome] by [timeframe].</p>
 <p><strong>Line 7:</strong>My rate is [price]. Does this work for you?</p>
 <p><strong>Line 8:</strong>Happy to discuss. [Your name]</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* CTA Section 1 */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Compare Freelance Platforms
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Find the best platform for your skills and location
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Browse Platforms Now →
 </Link>
 </div>
 </section>

 {/* Section 3: Week 2-3 - Outreach */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Week 2-3: Active Outreach (Days 8-21)
 </h2>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 The Daily Numbers Game
 </h3>
 <p className="text-[#64607d] mb-4">
 Freelancing is a numbers game when you're starting. Here's your daily target:
 </p>

 <div className="grid md:grid-cols-3 gap-6">
 <div className="bg-[#f8f9fb] rounded-lg p-6 text-center">
 <div className="text-4xl font-bold text-[#ef2b70] mb-2">5</div>
 <p className="text-sm text-[#64607d]">Job applications sent per day</p>
 </div>
 <div className="bg-[#f8f9fb] rounded-lg p-6 text-center">
 <div className="text-4xl font-bold text-[#ef2b70] mb-2">10</div>
 <p className="text-sm text-[#64607d]">Direct outreach messages to potential clients</p>
 </div>
 <div className="bg-[#f8f9fb] rounded-lg p-6 text-center">
 <div className="text-4xl font-bold text-[#ef2b70] mb-2">3</div>
 <p className="text-sm text-[#64607d]">Networking connections made (LinkedIn, Reddit, forums)</p>
 </div>
 </div>

 <div className="mt-6 bg-[#22c55e]/10 border border-[#22c55e] rounded-lg p-4">
 <p className="text-sm text-[#1e1541]">
 <strong>Math:</strong>5 applications × 14 days = 70 applications. Industry average: 10% response rate = 7 conversations. 30% conversion = 2-3 clients. You only need ONE to succeed.
 </p>
 </div>
 </div>

 <div className="space-y-6">
 {/* Application Strategy */}
 <div className="bg-white rounded-lg shadow-lg p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
 How to Find Jobs Worth Applying To
 </h3>

 <div className="space-y-4">
 <div className="flex items-start">
 <span className="text-[#22c55e] font-bold mr-3">✓</span>
 <div>
 <p className="font-semibold text-[#1e1541] mb-1">Look for "Verified Payment" badges</p>
 <p className="text-sm text-[#64607d]">Client has spent money before = more likely to hire</p>
 </div>
 </div>

 <div className="flex items-start">
 <span className="text-[#22c55e] font-bold mr-3">✓</span>
 <div>
 <p className="font-semibold text-[#1e1541] mb-1">Avoid posts with 50+ proposals</p>
 <p className="text-sm text-[#64607d]">Your proposal gets buried. Target 0-20 proposals for better odds</p>
 </div>
 </div>

 <div className="flex items-start">
 <span className="text-[#22c55e] font-bold mr-3">✓</span>
 <div>
 <p className="font-semibold text-[#1e1541] mb-1">Apply within first 2 hours of posting</p>
 <p className="text-sm text-[#64607d]">Early applications get 3x more views than late ones</p>
 </div>
 </div>

 <div className="flex items-start">
 <span className="text-[#22c55e] font-bold mr-3">✓</span>
 <div>
 <p className="font-semibold text-[#1e1541] mb-1">Read the ENTIRE job post</p>
 <p className="text-sm text-[#64607d]">Reference specific details in your proposal to stand out</p>
 </div>
 </div>

 <div className="flex items-start">
 <span className="text-[#22c55e] font-bold mr-3">✓</span>
 <div>
 <p className="font-semibold text-[#1e1541] mb-1">Start with smaller projects ($50-$200)</p>
 <p className="text-sm text-[#64607d]">Build reviews and credibility before chasing big contracts</p>
 </div>
 </div>
 </div>
 </div>

 {/* Direct Outreach */}
 <div className="bg-white rounded-lg shadow-lg p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
 Direct Outreach Strategy (LinkedIn, Email, Twitter)
 </h3>

 <p className="text-[#64607d] mb-4">
 Don't wait for job posts. Go find potential clients and offer value first.
 </p>

 <div className="bg-[#f8f9fb] rounded-lg p-6">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
 Cold Outreach Template (LinkedIn/Email)
 </h4>
 <div className="bg-white rounded border border-gray-200 p-4 text-sm font-mono text-[#64607d] space-y-2">
 <p>Subject: Quick idea for [their company]</p>
 <p className="pt-2">Hi [Name],</p>
 <p>I came across [their company/project] and noticed [specific observation about their work].</p>
 <p>I had a quick idea: [1-sentence suggestion for improvement].</p>
 <p>I'm a [your role] and I've helped [similar client type] achieve [specific result].</p>
 <p>Would you be open to a 15-minute call to discuss?</p>
 <p className="pt-2">Best,<br />[Your name]</p>
 </div>

 <p className="text-xs text-[#64607d] mt-3">
 <strong>Pro Tip:</strong>Always lead with value, not your services. Show you understand their business first.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* CTA Section 2 */}
 <section className="mb-16">
 <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Use Free Tools to Stay Organized
 </h3>
 <p className="text-xl mb-6 text-gray-300">
 Track applications, calculate rates, and manage time—all free
 </p>
 <Link
 href={`/${locale}/tools`}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Explore Free Freelance Tools →
 </Link>
 </div>
 </section>

 {/* Section 4: Week 4 - Close Deals */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Week 4: Close Your First Deal (Days 22-30)
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
 When Clients Respond: The Follow-Up Framework
 </h3>

 <div className="space-y-4">
 <div className="border-l-4 border-[#ef2b70] pl-4">
 <p className="font-semibold text-[#1e1541] mb-2">Step 1: Respond Within 2 Hours</p>
 <p className="text-sm text-[#64607d]">
 Fast responses show professionalism. Set phone notifications for platform messages. Speed beats perfection here.
 </p>
 </div>

 <div className="border-l-4 border-[#ef2b70] pl-4">
 <p className="font-semibold text-[#1e1541] mb-2">Step 2: Ask Clarifying Questions</p>
 <p className="text-sm text-[#64607d] mb-2">
 Don't pitch immediately. Ask 2-3 questions about their goals, timeline, and budget. Shows you care about results.
 </p>
 <p className="text-xs text-[#64607d] italic">
 Example: "What's your main goal for this project? Who's your target audience? Do you have a timeline in mind?"
 </p>
 </div>

 <div className="border-l-4 border-[#ef2b70] pl-4">
 <p className="font-semibold text-[#1e1541] mb-2">Step 3: Propose a Simple Solution</p>
 <p className="text-sm text-[#64607d] mb-2">
 Break complex projects into Phase 1 and Phase 2. Start small to build trust.
 </p>
 <p className="text-xs text-[#64607d] italic">
 Example: "Let's start with a pilot project ($150) to test fit. If you're happy, we'll move to the full scope."
 </p>
 </div>

 <div className="border-l-4 border-[#ef2b70] pl-4">
 <p className="font-semibold text-[#1e1541] mb-2">Step 4: Handle Price Objections</p>
 <p className="text-sm text-[#64607d] mb-2">
 "Your rate is too high." Translation: "I don't see the value yet."
 </p>
 <p className="text-xs text-[#64607d] italic">
 Response: "I understand. What's your budget? I can adjust the scope to fit. What's most important to you?"
 </p>
 </div>

 <div className="border-l-4 border-[#ef2b70] pl-4">
 <p className="font-semibold text-[#1e1541] mb-2">Step 5: Get Contract Signed ASAP</p>
 <p className="text-sm text-[#64607d]">
 Use platform escrow or simple written agreement. Never start work without payment secured.
 </p>
 </div>
 </div>
 </div>

 {/* Pricing Guide */}
 <div className="bg-white rounded-lg shadow-lg p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
 How to Price Your First Project
 </h3>

 <p className="text-[#64607d] mb-4">
 Don't underprice to "get experience." Don't overprice and scare them away. Use this simple formula:
 </p>

 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg p-6 text-white mb-4">
 <h4 className="font-heading font-bold text-lg mb-3">Beginner Pricing Formula</h4>
 <div className="text-sm space-y-2">
 <p><strong>Step 1:</strong>Estimate hours needed (be realistic + 20% buffer)</p>
 <p><strong>Step 2:</strong>Calculate minimum rate: local minimum wage × 2.5</p>
 <p><strong>Step 3:</strong>Hours × rate = your price</p>
 <p className="pt-2 border-t border-white/20"><strong>Example:</strong>10 hours × $25/hour = $250 project</p>
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-4">
 <div className="border border-green-200 rounded-lg p-4 bg-green-50">
 <p className="text-sm font-semibold text-green-900 mb-2">✅ Good First Project Prices</p>
 <ul className="text-xs text-green-800 space-y-1">
 <li>• Blog post (800 words): $50-$100</li>
 <li>• Logo design: $150-$300</li>
 <li>• Simple website: $300-$800</li>
 <li>• Social media graphics (5): $75-$150</li>
 <li>• Code feature: $100-$500</li>
 </ul>
 </div>

 <div className="border border-red-200 rounded-lg p-4 bg-red-50">
 <p className="text-sm font-semibold text-red-900 mb-2">❌ Avoid These Prices</p>
 <ul className="text-xs text-red-800 space-y-1">
 <li>• Anything under $25 (not worth your time)</li>
 <li>• "Pay what you want" (invites lowballers)</li>
 <li>• Hourly under $15 (you're worth more)</li>
 <li>• Free work "for exposure" (rarely pays off)</li>
 <li>• Open-ended projects with no cap</li>
 </ul>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Section 5: What If Nothing Works */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 What If You Don't Get a Client in 30 Days?
 </h2>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <p className="text-[#64607d] mb-6">
 First: Don't panic. Here's your troubleshooting checklist:
 </p>

 <div className="space-y-4">
 <div className="flex items-start">
 
 <div>
 <p className="font-semibold text-[#1e1541] mb-1">Check: Are you applying to enough jobs?</p>
 <p className="text-sm text-[#64607d]">Target: 5 applications per day = 150 total. If you're below this, increase volume.</p>
 </div>
 </div>

 <div className="flex items-start">
 
 <div>
 <p className="font-semibold text-[#1e1541] mb-1">Check: Is your proposal personalized?</p>
 <p className="text-sm text-[#64607d]">Generic proposals get ignored. Reference specific details from their job post in the first 2 sentences.</p>
 </div>
 </div>

 <div className="flex items-start">
 
 <div>
 <p className="font-semibold text-[#1e1541] mb-1">Check: Is your rate competitive?</p>
 <p className="text-sm text-[#64607d]">Search similar services on your platform. If you're 2x higher than others with more experience, adjust.</p>
 </div>
 </div>

 <div className="flex items-start">
 
 <div>
 <p className="font-semibold text-[#1e1541] mb-1">Check: Does your profile look professional?</p>
 <p className="text-sm text-[#64607d]">Clear photo, no typos, portfolio samples visible. Ask a friend to review it objectively.</p>
 </div>
 </div>

 <div className="flex items-start">
 
 <div>
 <p className="font-semibold text-[#1e1541] mb-1">Check: Are you targeting the right projects?</p>
 <p className="text-sm text-[#64607d]">Avoid expert-level jobs. Focus on entry-level, small budget projects ($50-$300) to build reviews.</p>
 </div>
 </div>
 </div>

 <div className="mt-6 bg-[#22c55e]/10 border border-[#22c55e] rounded-lg p-4">
 <p className="text-sm text-[#1e1541]">
 <strong>Still stuck?</strong>Try a different platform, adjust your service offering, or consider taking ONE $50 project at a discount just to get your first review. Momentum beats perfection.
 </p>
 </div>
 </div>
 </section>

 {/* Section 6: Next Steps */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 After Your First Client: What's Next?
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 1
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Overdeliver on Your First Project
 </h3>
 <p className="text-[#64607d] mb-3">
 Your goal isn't just completion—it's a 5-star review and testimonial. Respond fast, deliver early, and ask for feedback.
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 2
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Ask for Referrals
 </h3>
 <p className="text-[#64607d] mb-3">
 After delivering great work: "I'm glad you're happy! Do you know anyone else who might need [your service]?" Referrals close 5x faster than cold outreach.
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 3
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Optimize Your Pricing
 </h3>
 <p className="text-[#64607d] mb-3">
 Once you have 3-5 reviews, you can charge 20-30% more. Learn the exact pricing formula that professionals use.
 </p>
 <Link
 href={`/${locale}/gids/aan-de-slag/freelance-contracts-basics`}
 className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
 >
 Learn Contract Basics →
 </Link>
 </div>
 </div>
 </div>
 </section>

 {/* Final CTA */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Read More Getting Started Guides
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Master every aspect of launching your freelance career
 </p>
 <Link
 href={`/${locale}/gids/aan-de-slag`}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Browse All Guides →
 </Link>
 </div>
 </section>

 </article>

 {/* Schema.org Markup */}
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "HowTo",
 "name": "Land Your First Freelance Client in 30 Days",
 "description": "Zero to paid client in 30 days. Follow this daily action plan to get your first freelance client as a complete beginner.",
 "totalTime": "P30D",
 "step": [
 {
 "@type": "HowToStep",
 "name": "Week 1: Build Your Foundation",
 "text": "Pick your service, create platform profiles, make portfolio samples, and write proposal template.",
 "position": 1
 },
 {
 "@type": "HowToStep",
 "name": "Week 2-3: Active Outreach",
 "text": "Send 5 applications per day, do 10 direct outreach messages, and make 3 networking connections daily.",
 "position": 2
 },
 {
 "@type": "HowToStep",
 "name": "Week 4: Close Your First Deal",
 "text": "Follow up with interested clients, handle objections, price your project correctly, and get contract signed.",
 "position": 3
 }
 ],
 "author": {
 "@type": "Organization",
 "name": "SkillLinkup"
 }
 })
 }}
 />
 </main>

 <Footer />
 </>
 );
}
