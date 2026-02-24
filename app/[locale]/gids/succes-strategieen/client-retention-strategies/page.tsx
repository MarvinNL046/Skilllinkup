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

 const slug = 'client-retention-strategies';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/succes-strategieen/${slug}`;

 return {
 title: "Client Retention: Turn One-Time Clients into Long-Term Regulars (70% Repeat Rate)",
 description: "Discover the exact system that turns 70% of one-time clients into repeat customers. Includes email templates, retention triggers, and upsell frameworks.",
 keywords: "client retention, repeat clients, freelance retention, customer loyalty, retainer clients",
 openGraph: {
 title: "Client Retention: Turn One-Time Clients into Long-Term Regulars",
 description: "Discover the exact system that turns 70% of one-time clients into repeat customers.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Client Retention Strategies - SkillLinkup',
 }
 ],
 locale: locale === 'nl' ? 'nl_NL' : 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "Client Retention: Turn One-Time Clients into Long-Term Regulars",
 description: "Discover the exact system that turns 70% of one-time clients into repeat customers.",
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 },
 };
}

export default async function ClientRetentionPage({ params }: Props) {
 const { locale } = await params;

 return (
 <>
 <Header />

 <main className="min-h-screen bg-[#f8f9fb]">
 <section className="bg-gradient-to-br from-[#1e1541] via-[#2a1f5e] to-[#1e1541] text-white py-16">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
 Client Retention: Turn One-Time Clients into Regulars
 </h1>
 <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
 Finding new clients costs 5-7x more than retaining existing ones. Top freelancers get 60-80% of revenue from repeat clients. Here's the complete retention playbook.
 </p>
 <Link
 href={locale === 'nl' ? '/nl/platforms' : '/en/platforms'}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Find Your Platform →
 </Link>
 </div>
 </div>
 </section>

 <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">

 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Why Client Retention Is Your Secret Weapon
 </h2>
 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Most freelancers treat every project like a one-time transaction. They deliver, get paid, and move on. Then they're stuck in the exhausting cycle of constantly finding new clients.
 </p>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
 The Math of Client Retention
 </h3>
 <div className="grid md:grid-cols-2 gap-6">
 <div className="border-l-4 border-red-500 pl-4">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
 New Client Acquisition
 </h4>
 <ul className="space-y-2 text-[#64607d] text-sm">
 <li>• 20-30 hours per client (proposals, calls, negotiations)</li>
 <li>• 5-15% conversion rate</li>
 <li>• Higher risk (unknown work style)</li>
 <li>• Lower rates (building trust)</li>
 <li>• Unpredictable income</li>
 </ul>
 </div>
 <div className="border-l-4 border-[#22c55e] pl-4">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
 Repeat Clients
 </h4>
 <ul className="space-y-2 text-[#64607d] text-sm">
 <li>• 2-5 hours per project (they know you)</li>
 <li>• 60-80% conversion rate</li>
 <li>• Lower risk (proven relationship)</li>
 <li>• Higher rates (demonstrated value)</li>
 <li>• Predictable revenue stream</li>
 </ul>
 </div>
 </div>
 </div>

 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 mb-8 text-white">
 <h3 className="font-heading font-bold text-2xl mb-4">
 The 70/30 Rule
 </h3>
 <p className="text-white/90 mb-4">
 Top-earning freelancers generate 70% of their revenue from existing clients and only 30% from new acquisition. This creates:
 </p>
 <ul className="space-y-2 text-white/90">
 <li>• Stable monthly income</li>
 <li>• Time to focus on quality work (not constant sales)</li>
 <li>• Higher profit margins (less unpaid sales time)</li>
 <li>• Better work-life balance</li>
 </ul>
 </div>
 </div>
 </section>

 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 The Client Retention System (3 Phases)
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-start mb-6">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 1
 </div>
 <div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-2">
 Phase 1: Plant Seeds During the Project
 </h3>
 <p className="text-[#64607d]">
 Retention starts BEFORE the project ends. Here's what top freelancers do:
 </p>
 </div>
 </div>

 <div className="space-y-4 ml-16">
 <div className="bg-gray-50 rounded-lg p-4">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 ✓ The Roadmap Preview
 </h4>
 <p className="text-[#64607d] mb-3">
 When delivering Phase 1, mention what Phase 2 could look like. Example:
 </p>
 <div className="bg-white border-l-4 border-[#ef2b70] p-4 rounded-r-lg font-mono text-sm text-[#64607d]">
 "This landing page redesign should increase conversions 20-30%. Once we have 30 days of data, we could optimize the checkout flow next, which typically adds another 15-25% lift."
 </div>
 </div>

 <div className="bg-gray-50 rounded-lg p-4">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 ✓ The Strategic Check-In
 </h4>
 <p className="text-[#64607d] mb-3">
 Schedule a 30-day post-launch call to review results. Send calendar invite before project ends:
 </p>
 <div className="bg-white border-l-4 border-[#ef2b70] p-4 rounded-r-lg font-mono text-sm text-[#64607d]">
 "Let's schedule a 30-day review call to analyze the data and discuss optimization opportunities. Does [date] work?"
 </div>
 </div>

 <div className="bg-gray-50 rounded-lg p-4">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 ✓ The Value Breadcrumbs
 </h4>
 <p className="text-[#64607d] mb-3">
 During weekly updates, mention opportunities you noticed:
 </p>
 <ul className="space-y-2 text-[#64607d] text-sm">
 <li>• "I noticed your email open rates are low - we could tackle that next quarter"</li>
 <li>• "Your mobile experience has potential for improvement"</li>
 <li>• "I have ideas for your abandoned cart problem"</li>
 </ul>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-start mb-6">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 2
 </div>
 <div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-2">
 Phase 2: The Post-Project Follow-Up Sequence
 </h3>
 <p className="text-[#64607d]">
 After delivery, send 4 strategic emails over 90 days:
 </p>
 </div>
 </div>

 <div className="space-y-4 ml-16">
 <div className="bg-gray-50 rounded-lg p-4">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 Email 1: Day 7 - The Check-In
 </h4>
 <div className="bg-white border-l-4 border-[#22c55e] p-4 rounded-r-lg font-mono text-sm text-[#64607d] whitespace-pre-line">
{`Subject: Quick check - how's [project] performing?

Hi [Name],

It's been a week since we launched [project]. I'm curious:

1. What results are you seeing so far?
2. Has anything surprised you (good or bad)?
3. Any questions coming from your team?

If you're seeing issues or have questions, let me know. Happy to jump on a quick call.

Best,
[Your Name]`}
 </div>
 </div>

 <div className="bg-gray-50 rounded-lg p-4">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 Email 2: Day 30 - The Results Review
 </h4>
 <div className="bg-white border-l-4 border-[#22c55e] p-4 rounded-r-lg font-mono text-sm text-[#64607d] whitespace-pre-line">
{`Subject: 30-day results + next optimization opportunity

Hi [Name],

We're at the 30-day mark for [project]. Based on typical results, you should be seeing:
• [Expected outcome 1]
• [Expected outcome 2]
• [Expected outcome 3]

How does that match your data?

I've been thinking about your [related problem] and have a strategy that could [expected result]. Want to explore that on a quick call?

Best,
[Your Name]`}
 </div>
 </div>

 <div className="bg-gray-50 rounded-lg p-4">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 Email 3: Day 60 - The Value Add
 </h4>
 <div className="bg-white border-l-4 border-[#22c55e] p-4 rounded-r-lg font-mono text-sm text-[#64607d] whitespace-pre-line">
{`Subject: Free audit: I found 3 opportunities for [company]

Hi [Name],

I was reviewing [related area] for a similar project and noticed a few opportunities that apply to [your company]:

1. [Specific opportunity with estimated impact]
2. [Specific opportunity with estimated impact]
3. [Specific opportunity with estimated impact]

Want me to send over a detailed breakdown? No strings attached - just thought you'd find this valuable.

Best,
[Your Name]`}
 </div>
 </div>

 <div className="bg-gray-50 rounded-lg p-4">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 Email 4: Day 90 - The Soft Pitch
 </h4>
 <div className="bg-white border-l-4 border-[#22c55e] p-4 rounded-r-lg font-mono text-sm text-[#64607d] whitespace-pre-line">
{`Subject: Planning Q2? I have availability

Hi [Name],

I'm planning my Q2 schedule and wanted to reach out before I'm fully booked.

Based on our work together, here are a few projects that could make sense:
• [Project idea 1 with ROI estimate]
• [Project idea 2 with ROI estimate]
• [Project idea 3 with ROI estimate]

If any of these resonate, I'd love to put together a proposal. My next opening is [date].

Best,
[Your Name]`}
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-start mb-6">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 3
 </div>
 <div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-2">
 Phase 3: The Long-Term Nurture System
 </h3>
 <p className="text-[#64607d]">
 Stay top-of-mind without being annoying:
 </p>
 </div>
 </div>

 <div className="space-y-4 ml-16">
 <div className="bg-gray-50 rounded-lg p-4">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 ✓ Quarterly Value Emails
 </h4>
 <p className="text-[#64607d] mb-2">
 Every 3 months, send something valuable (not a sales pitch):
 </p>
 <ul className="space-y-2 text-[#64607d] text-sm">
 <li>• Industry trend analysis relevant to their business</li>
 <li>• Case study from recent project in their niche</li>
 <li>• Tool/resource recommendation that solves their problem</li>
 <li>• Quick tip that could improve their metrics</li>
 </ul>
 </div>

 <div className="bg-gray-50 rounded-lg p-4">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 ✓ Birthday/Anniversary Messages
 </h4>
 <p className="text-[#64607d]">
 Track project anniversary dates and send a "Happy 1-Year!" email with their original goals vs. current results.
 </p>
 </div>

 <div className="bg-gray-50 rounded-lg p-4">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 ✓ The Referral Request
 </h4>
 <p className="text-[#64607d] mb-3">
 90 days after successful delivery:
 </p>
 <div className="bg-white border-l-4 border-[#ef2b70] p-4 rounded-r-lg font-mono text-sm text-[#64607d]">
 "Who else do you know facing [problem you solved]? I'd love to help them get similar results. As a thank you, I'll give you 15% off your next project."
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Find Platforms With High Client Retention
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Some platforms make retention easier with built-in tools and long-term contracts
 </p>
 <Link
 href={locale === 'nl' ? '/nl/platforms' : '/en/platforms'}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Compare Platforms →
 </Link>
 </div>
 </section>

 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 5 Retention Triggers That Work Every Time
 </h2>

 <div className="grid md:grid-cols-2 gap-6">
 <div className="bg-white rounded-lg shadow-lg p-6">
 <div className="text-4xl mb-4"></div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 1. The Surprise Bonus
 </h3>
 <p className="text-[#64607d] mb-4">
 Include something extra in your final delivery that wasn't in the scope. Example: "I noticed your images were slow, so I optimized them (saved 2.3 seconds load time)."
 </p>
 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-4 rounded-r-lg">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Psychology:</strong>Reciprocity. They feel obligated to repay unexpected value.
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6">
 <div className="text-4xl mb-4"></div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 2. The Results Dashboard
 </h3>
 <p className="text-[#64607d] mb-4">
 Send monthly metric reports showing the ongoing impact of your work. "Month 3 update: Your conversion rate is now 34% (started at 19%)."
 </p>
 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-4 rounded-r-lg">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Benefit:</strong>Keeps you top-of-mind and reinforces your value
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6">
 <div className="text-4xl mb-4"></div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 3. The Proactive Alert
 </h3>
 <p className="text-[#64607d] mb-4">
 Monitor their site/product and alert them to issues before they notice. "Hey, I saw your homepage is loading slowly. Want me to take a quick look?"
 </p>
 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-4 rounded-r-lg">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Tool:</strong>Use uptime monitors like UptimeRobot (free)
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6">
 <div className="text-4xl mb-4"></div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 4. The Retainer Proposal
 </h3>
 <p className="text-[#64607d] mb-4">
 After 2-3 successful projects, propose a monthly retainer: "Reserve 10 hours/month at a 20% discount vs. one-off pricing."
 </p>
 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-4 rounded-r-lg">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Win-Win:</strong>Predictable income for you, priority access for them
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6">
 <div className="text-4xl mb-4"></div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 5. The Training Session
 </h3>
 <p className="text-[#64607d] mb-4">
 Offer to train their team on what you built. "I can do a 60-minute session for your marketing team on how to use the new analytics dashboard."
 </p>
 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-4 rounded-r-lg">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Benefit:</strong>Builds relationship with multiple stakeholders
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6">
 <div className="text-4xl mb-4"></div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 6. The Content Collaboration
 </h3>
 <p className="text-[#64607d] mb-4">
 Invite them to co-create content: "I'm writing about [topic]. Can I feature your success story?" Gets you content + strengthens relationship.
 </p>
 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-4 rounded-r-lg">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Double win:</strong>Free marketing for them, social proof for you
 </p>
 </div>
 </div>
 </div>
 </section>

 <section className="mb-16">
 <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Learn From Top Freelancers
 </h3>
 <p className="text-xl mb-6 text-gray-300">
 Read case studies of freelancers building 6-figure businesses through client retention
 </p>
 <Link
 href={locale === 'nl' ? '/nl/blog' : '/en/blog'}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Read Success Stories →
 </Link>
 </div>
 </section>

 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Your 90-Day Retention Implementation Plan
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4 flex items-center">
 <span className="bg-[#ef2b70] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 text-sm">
 Month 1
 </span>
 Build Your System
 </h3>
 <ul className="space-y-3 text-[#64607d] ml-13">
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Create 4-email follow-up sequence templates</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Set up CRM or spreadsheet to track client touchpoints</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Schedule post-project review calls for current clients</span>
 </li>
 </ul>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4 flex items-center">
 <span className="bg-[#ef2b70] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 text-sm">
 Month 2
 </span>
 Activate Phase 1 Tactics
 </h3>
 <ul className="space-y-3 text-[#64607d] ml-13">
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Plant roadmap seeds in current project communications</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Schedule 30-day review calls before project delivery</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Add surprise bonus to next delivery</span>
 </li>
 </ul>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4 flex items-center">
 <span className="bg-[#ef2b70] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 text-sm">
 Month 3
 </span>
 Launch Long-Term Nurture
 </h3>
 <ul className="space-y-3 text-[#64607d] ml-13">
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Send first quarterly value email to past clients</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Propose retainer to best-fit client</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Track retention metrics and refine system</span>
 </li>
 </ul>
 </div>
 </div>
 </section>

 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Get Client Retention Templates
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Join our newsletter for email templates, scripts, and retention strategies used by 6-figure freelancers
 </p>
 <Link
 href={locale === 'nl' ? '/nl/newsletter' : '/en/newsletter'}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Get Free Retention Kit →
 </Link>
 </div>
 </section>

 </article>

 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": ["Article", "HowTo"],
 "headline": "Client Retention: Turn One-Time Clients into Long-Term Regulars",
 "description": "Discover the exact system that turns 70% of one-time clients into repeat customers.",
 "author": {
 "@type": "Organization",
 "name": "SkillLinkup"
 },
 "publisher": {
 "@type": "Organization",
 "name": "SkillLinkup",
 "logo": {
 "@type": "ImageObject",
 "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/images/logo.png`
 }
 },
 "mainEntityOfPage": {
 "@type": "WebPage",
 "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/succes-strategieen/client-retention-strategies`
 },
 "step": [
 {
 "@type": "HowToStep",
 "name": "Plant Seeds During Project",
 "text": "Use roadmap previews, strategic check-ins, and value breadcrumbs during active projects"
 },
 {
 "@type": "HowToStep",
 "name": "Execute Follow-Up Sequence",
 "text": "Send 4 strategic emails over 90 days: check-in, results review, value add, soft pitch"
 },
 {
 "@type": "HowToStep",
 "name": "Implement Long-Term Nurture",
 "text": "Send quarterly value emails, birthday messages, and proactive alerts to stay top-of-mind"
 }
 ]
 })
 }}
 />

 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 "itemListElement": [
 {
 "@type": "ListItem",
 "position": 1,
 "name": "Home",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}`
 },
 {
 "@type": "ListItem",
 "position": 2,
 "name": locale === 'nl' ? "Gids" : "Guide",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids`
 },
 {
 "@type": "ListItem",
 "position": 3,
 "name": locale === 'nl' ? "Succes Strategieën" : "Success Strategies",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/succes-strategieen`
 },
 {
 "@type": "ListItem",
 "position": 4,
 "name": "Client Retention Strategies",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/succes-strategieen/client-retention-strategies`
 }
 ]
 })
 }}
 />
 </main>

 <Footer />
 </>
 );
}
