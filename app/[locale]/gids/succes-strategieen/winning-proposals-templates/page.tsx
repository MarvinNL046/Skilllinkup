import Link from "next/link";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type Props = {
 params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'winning-proposals-templates';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/succes-strategieen/${slug}`;

 if (locale === 'nl') {
 return {
 title: "Winnende Proposal Templates: 40%+ Conversie Ratio (Inclusief Scripts)",
 description: "Kopieer de exacte proposal templates die 40%+ conversie behalen. Inclusief 3 kant-en-klare templates voor design, development en consulting projecten.",
 keywords: "proposal template, freelance offerte, 40% conversie, winning proposals, freelance pitch",
 openGraph: {
 title: "Winnende Proposal Templates: 40%+ Conversie Ratio (Inclusief Scripts)",
 description: "Kopieer de exacte proposal templates die 40%+ conversie behalen. Inclusief 3 kant-en-klare templates voor design, development en consulting projecten.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Winning Proposal Templates - SkillLinkup',
 }
 ],
 locale: 'nl_NL',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "Winnende Proposal Templates: 40%+ Conversie Ratio (Inclusief Scripts)",
 description: "Kopieer de exacte proposal templates die 40%+ conversie behalen.",
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 },
 };
 }

 return {
 title: "Winning Proposal Templates That Convert at 40%+ (Copy & Paste Ready)",
 description: "Copy the exact proposal templates that convert at 40%+. Includes 3 ready-to-use templates for design, development, and consulting projects.",
 keywords: "proposal template, freelance proposal, 40% conversion, winning proposals, freelance pitch",
 openGraph: {
 title: "Winning Proposal Templates That Convert at 40%+ (Copy & Paste Ready)",
 description: "Copy the exact proposal templates that convert at 40%+. Includes 3 ready-to-use templates for design, development, and consulting projects.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Winning Proposal Templates - SkillLinkup',
 }
 ],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "Winning Proposal Templates That Convert at 40%+ (Copy & Paste Ready)",
 description: "Copy the exact proposal templates that convert at 40%+.",
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 },
 };
}

export default async function WinningProposalsPage({ params }: Props) {
 const { locale } = await params;

 return (
 <>
 

 <main className="min-h-screen bg-[#f8f9fb]">
 {/* Hero Section */}
 <section className="bg-gradient-to-br from-[#1e1541] via-[#2a1f5e] to-[#1e1541] text-white py-16">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
 Winning Proposal Templates That Convert at 40%+
 </h1>
 <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
 Most freelancer proposals convert at 5-10%. These templates convert at 40-50%. The difference? A proven structure that clients can't ignore.
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

 {/* Main Content */}
 <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">

 {/* Section 1: Why Most Proposals Fail */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Why 90% of Proposals Get Ignored
 </h2>
 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 The average client posts a job and receives 20-50 proposals within 24 hours. They skim through in 30 seconds or less. Your proposal has one job: <strong className="text-[#1e1541]">make them stop scrolling</strong>.
 </p>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
 What Clients See vs. What They Want
 </h3>
 <div className="grid md:grid-cols-2 gap-6">
 <div className="border-l-4 border-red-500 pl-4">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3 flex items-center">
 <span className="text-red-500 mr-2">❌</span>
 What They Get (90% of Proposals)
 </h4>
 <ul className="space-y-2 text-[#64607d] text-sm">
 <li>• "I'm very interested in your project..."</li>
 <li>• 500-word essay about your experience</li>
 <li>• Generic "I can do this" statements</li>
 <li>• No specifics about their problem</li>
 <li>• List of skills and technologies</li>
 <li>• "Please review my portfolio"</li>
 </ul>
 </div>
 <div className="border-l-4 border-[#22c55e] pl-4">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3 flex items-center">
 <span className="text-[#22c55e] mr-2">✓</span>
 What They Want (Top 10%)
 </h4>
 <ul className="space-y-2 text-[#64607d] text-sm">
 <li>• "Here's your specific problem..."</li>
 <li>• Immediate solution outline</li>
 <li>• Proof you've solved this before</li>
 <li>• Clear timeline and deliverables</li>
 <li>• Specific pricing with options</li>
 <li>• One next step to take</li>
 </ul>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Section 2: The Universal Proposal Framework */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 The Universal Proposal Framework (Works for Any Project)
 </h2>

 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Every winning proposal follows the same 7-section structure. Adapt the content, keep the framework.
 </p>

 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 mb-8 text-white">
 <h3 className="font-heading font-bold text-2xl mb-6">
 The 7-Section Winning Formula
 </h3>
 <div className="space-y-4">
 <div className="bg-white/10 backdrop-blur rounded-lg p-4">
 <div className="flex items-start">
 <div className="bg-white text-[#ef2b70] font-heading font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
 1
 </div>
 <div>
 <h4 className="font-heading font-semibold mb-2">The Problem Mirror</h4>
 <p className="text-white/90 text-sm">Reflect their problem back with specific details from their job post</p>
 </div>
 </div>
 </div>
 <div className="bg-white/10 backdrop-blur rounded-lg p-4">
 <div className="flex items-start">
 <div className="bg-white text-[#ef2b70] font-heading font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
 2
 </div>
 <div>
 <h4 className="font-heading font-semibold mb-2">The Solution Snapshot</h4>
 <p className="text-white/90 text-sm">High-level approach in 3-4 bullet points (not technical details)</p>
 </div>
 </div>
 </div>
 <div className="bg-white/10 backdrop-blur rounded-lg p-4">
 <div className="flex items-start">
 <div className="bg-white text-[#ef2b70] font-heading font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
 3
 </div>
 <div>
 <h4 className="font-heading font-semibold mb-2">The Proof Point</h4>
 <p className="text-white/90 text-sm">One specific example with measurable results</p>
 </div>
 </div>
 </div>
 <div className="bg-white/10 backdrop-blur rounded-lg p-4">
 <div className="flex items-start">
 <div className="bg-white text-[#ef2b70] font-heading font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
 4
 </div>
 <div>
 <h4 className="font-heading font-semibold mb-2">The Timeline</h4>
 <p className="text-white/90 text-sm">Specific milestones with dates (shows you understand scope)</p>
 </div>
 </div>
 </div>
 <div className="bg-white/10 backdrop-blur rounded-lg p-4">
 <div className="flex items-start">
 <div className="bg-white text-[#ef2b70] font-heading font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
 5
 </div>
 <div>
 <h4 className="font-heading font-semibold mb-2">The Investment Options</h4>
 <p className="text-white/90 text-sm">3 pricing tiers: Essential, Recommended, Premium</p>
 </div>
 </div>
 </div>
 <div className="bg-white/10 backdrop-blur rounded-lg p-4">
 <div className="flex items-start">
 <div className="bg-white text-[#ef2b70] font-heading font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
 6
 </div>
 <div>
 <h4 className="font-heading font-semibold mb-2">The Risk Reversal</h4>
 <p className="text-white/90 text-sm">Guarantee, milestone payments, or revision policy</p>
 </div>
 </div>
 </div>
 <div className="bg-white/10 backdrop-blur rounded-lg p-4">
 <div className="flex items-start">
 <div className="bg-white text-[#ef2b70] font-heading font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
 7
 </div>
 <div>
 <h4 className="font-heading font-semibold mb-2">The Next Step</h4>
 <p className="text-white/90 text-sm">One clear action: "Schedule a 15-minute call" or "Answer these 3 questions"</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Template 1: Web Development */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Template #1: Web Development Project
 </h2>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <div className="mb-6">
 <span className="inline-block bg-[#22c55e] text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
 COPY & PASTE READY
 </span>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541]">
 Example: E-commerce Checkout Redesign
 </h3>
 </div>

 <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm text-[#64607d] whitespace-pre-line">
{`Hi [Client Name],

**Your Checkout Problem** 
I noticed your cart abandonment rate is around 70% (based on the screenshots you shared), with most drop-offs happening at the payment step. That's likely costing you $10K-$30K per month in lost revenue.

**How I'd Fix This** 
• Implement one-click guest checkout (no forced account creation)
• Add trust badges and security seals at payment step
• Enable autofill for shipping/billing addresses
• Add exit-intent popup with 10% discount code

**Proof This Works** 
I solved this exact issue for an online electronics retailer in Q3 2025. Results:
• Cart abandonment dropped from 68% to 47% (-21%)
• Monthly revenue increased by $47,000
• Mobile conversions improved by 34%

Case study: [link to portfolio piece]

**Timeline** 
Week 1: Discovery & wireframes
Week 2-3: Development & testing
Week 4: Launch & optimization
Total: 4 weeks from kickoff to live

**Investment Options** 

ESSENTIAL ($2,800)
• Guest checkout implementation
• Basic autofill functionality
• 2 rounds of revisions

RECOMMENDED ($4,200) 
• Everything in Essential, plus:
• Exit-intent popup system
• Trust badge integration
• A/B testing setup
• 4 weeks of post-launch support

PREMIUM ($6,500)
• Everything in Recommended, plus:
• Complete checkout flow redesign
• Payment method optimization
• Abandoned cart email automation
• 8 weeks of optimization support

**Your Protection** 
• Payment in 3 milestones (design approval, development, launch)
• Unlimited revisions during development phase
• 30-day bug fix guarantee post-launch

**Next Step** 
Let's schedule a 15-minute call to discuss your current checkout flow and answer any questions.

What's your availability this week?

Best,
[Your Name]
[Portfolio Link]
[Calendar Link]`}
 </div>
 </div>

 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
 Why This Template Works:
 </h4>
 <ul className="space-y-2 text-[#64607d]">
 <li>• <strong className="text-[#1e1541]">Specific problem identification:</strong>Uses client's screenshots, estimates revenue impact</li>
 <li>• <strong className="text-[#1e1541]">Clear solution:</strong>4 bullet points, no technical jargon</li>
 <li>• <strong className="text-[#1e1541]">Quantified proof:</strong>Real metrics from similar project</li>
 <li>• <strong className="text-[#1e1541]">Pricing psychology:</strong>3 options, middle tier highlighted</li>
 <li>• <strong className="text-[#1e1541]">Risk reversal:</strong>Milestone payments and guarantees</li>
 </ul>
 </div>
 </section>

 {/* CTA Section 1 */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Find Clients Ready to Pay Premium Rates
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Compare platforms to discover where serious buyers hang out
 </p>
 <Link
 href={locale === 'nl' ? '/nl/platforms' : '/en/platforms'}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Compare Platforms →
 </Link>
 </div>
 </section>

 {/* Template 2: Design Project */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Template #2: Design Project (Logo/Branding)
 </h2>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <div className="mb-6">
 <span className="inline-block bg-[#22c55e] text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
 COPY & PASTE READY
 </span>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541]">
 Example: SaaS Company Rebrand
 </h3>
 </div>

 <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm text-[#64607d] whitespace-pre-line">
{`Hi [Client Name],

**The Identity Gap** 
Your product has evolved from a simple tool to a comprehensive platform, but your brand still looks like a startup from 2020. This creates confusion for enterprise clients who expect a more mature, professional presence.

**My Rebranding Approach** 
• Brand strategy workshop (uncover what makes you different)
• Logo design with 3 distinct concepts
• Color palette that signals trust + innovation
• Typography system for web and print
• Brand guidelines document

**Recent Success Story** 
I rebranded a B2B SaaS platform in August 2025:
• Enterprise deal flow increased 156% in 90 days
• Pricing perception allowed 35% rate increase
• NPS score improved from 38 to 67

Portfolio: [link]

**Project Timeline** 
Week 1: Brand strategy workshop & research
Week 2-3: Logo concepts & refinement
Week 4: Brand system development
Week 5: Guidelines & asset delivery
Total: 5 weeks

**Package Options** 

ESSENTIALS ($3,500)
• 3 logo concepts
• 2 rounds of revisions
• Color palette (3 colors)
• Files: AI, PNG, SVG

PROFESSIONAL ($6,800) 
• Everything in Essentials, plus:
• Brand strategy session
• Extended color palette (8 colors)
• Typography system
• Social media templates (5)
• 30-page brand guidelines PDF

ENTERPRISE ($12,000)
• Everything in Professional, plus:
• Competitive analysis
• Messaging framework
• Marketing collateral suite
• 90-day implementation support
• Unlimited revisions

**Risk-Free Guarantee** ✓
• Milestone payments (strategy, concepts, finals)
• If you're not happy with initial concepts, full refund
• Exclusive rights transfer upon final payment

**Let's Talk** 
I'd love to understand your vision better. Can we schedule a 20-minute brand discovery call?

Available times: [calendar link]

Best,
[Your Name]
[Portfolio]`}
 </div>
 </div>
 </section>

 {/* Template 3: Consulting/Strategy */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Template #3: Consulting/Strategy Project
 </h2>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <div className="mb-6">
 <span className="inline-block bg-[#22c55e] text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
 COPY & PASTE READY
 </span>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541]">
 Example: SEO Strategy Audit
 </h3>
 </div>

 <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm text-[#64607d] whitespace-pre-line">
{`Hi [Client Name],

**Your Traffic Plateau** 
You mentioned organic traffic has been flat at 15K visitors/month for 6+ months despite publishing new content. This typically indicates a technical SEO issue or content-market mismatch, not a lack of effort.

**My Diagnostic Process** 
• Technical audit (crawl errors, site speed, mobile issues)
• Content gap analysis (vs. top 3 competitors)
• Backlink profile review
• Keyword cannibalization check
• Conversion funnel optimization

**Proven Results** 
For a SaaS client with similar symptoms (Q4 2025):
• Identified 47 technical issues blocking indexing
• Found $125K in "hidden" conversion opportunities
• Organic traffic grew from 12K to 43K in 5 months
• Qualified leads increased 218%

**Deliverables & Timeline** 
Week 1: Technical audit + priority fixes
Week 2: Content strategy + keyword roadmap
Week 3: Backlink strategy + outreach templates
Week 4: Implementation support + training

Final deliverable: 40-page action plan with 90-day roadmap

**Investment** 

AUDIT ONLY ($2,200)
• Complete technical audit
• Content gap analysis
• Prioritized fix list
• 1 hour strategy call

AUDIT + ROADMAP ($4,500) 
• Everything in Audit, plus:
• 90-day implementation roadmap
• Keyword research (100+ targets)
• Content templates
• 2 hours of training

FULL IMPLEMENTATION ($8,500)
• Everything in Audit + Roadmap, plus:
• 30 days of implementation support
• Weekly check-in calls
• Direct access via Slack
• Performance tracking dashboard

**Guarantee** 
If I don't identify at least 20 quick-win opportunities worth 5x my fee in potential revenue, I'll refund 50% of your payment.

**Next Step** 
I'd like to review your Google Search Console data before our call. Can you grant me view-only access? Then let's schedule 30 minutes to discuss what I find.

Availability: [calendar link]

Best,
[Your Name]
[LinkedIn | Case Studies]`}
 </div>
 </div>
 </section>

 {/* Advanced Techniques */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Advanced Proposal Techniques (Win Rate +15-20%)
 </h2>

 <div className="grid md:grid-cols-2 gap-6 mb-8">
 <div className="bg-white rounded-lg shadow-lg p-6">
 <div className="text-4xl mb-4"></div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 1. The Video Intro
 </h3>
 <p className="text-[#64607d] mb-4">
 Record a 60-90 second Loom video addressing the client by name, showing their website/product, and explaining your approach.
 </p>
 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-4 rounded-r-lg">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Result:</strong>60% higher response rate. Clients feel the personal connection.
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6">
 <div className="text-4xl mb-4"></div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 2. The Audit Preview
 </h3>
 <p className="text-[#64607d] mb-4">
 Spend 20 minutes analyzing their site/product and include 3-5 specific findings in your proposal. Show don't tell.
 </p>
 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-4 rounded-r-lg">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Example:</strong>"I found 12 broken links on your pricing page that are costing conversions"
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6">
 <div className="text-4xl mb-4"></div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 3. The ROI Calculator
 </h3>
 <p className="text-[#64607d] mb-4">
 Calculate the potential value of solving their problem. "If this increases conversions by just 15%, that's $23K extra revenue."
 </p>
 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-4 rounded-r-lg">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Psychology:</strong>Makes your $5K fee look like a bargain against $23K upside
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6">
 <div className="text-4xl mb-4"></div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 4. The Fast-Start Bonus
 </h3>
 <p className="text-[#64607d] mb-4">
 "If we start by [date], I'll include [bonus] at no extra cost." Creates urgency and rewards quick decision-making.
 </p>
 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-4 rounded-r-lg">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Bonus ideas:</strong>Extra revision round, 1-month support extension, free training
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* CTA Section 2 */}
 <section className="mb-16">
 <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Learn From Freelancers Earning $150K+
 </h3>
 <p className="text-xl mb-6 text-gray-300">
 Read real case studies of freelancers who increased their win rate by 3-5x
 </p>
 <Link
 href={locale === 'nl' ? '/nl/blog' : '/en/blog'}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Read Success Stories →
 </Link>
 </div>
 </section>

 {/* Common Mistakes */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 7 Proposal Mistakes That Kill Your Win Rate
 </h2>

 <div className="space-y-4">
 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 ❌ Mistake #1: Starting With "I"
 </h3>
 <p className="text-[#64607d]">
 <strong>Bad:</strong>"I am a developer with 5 years of experience..."<br/>
 <strong>Good:</strong>"Your checkout process is losing 70% of potential buyers because..."
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 ❌ Mistake #2: Vague Timelines
 </h3>
 <p className="text-[#64607d]">
 <strong>Bad:</strong>"This will take 2-3 weeks"<br/>
 <strong>Good:</strong>"Week 1: Design approval, Week 2-3: Development, Week 4: Testing & launch"
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 ❌ Mistake #3: Single Price Point
 </h3>
 <p className="text-[#64607d]">
 Offering one price forces binary yes/no. Three options (Essential/Recommended/Premium) lets clients choose their budget level.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 ❌ Mistake #4: No Social Proof
 </h3>
 <p className="text-[#64607d]">
 Every proposal needs at least one case study or testimonial with specific metrics. "Increased conversions 34%" &gt; "Great work!"
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 ❌ Mistake #5: Ending With "Let me know"
 </h3>
 <p className="text-[#64607d]">
 <strong>Bad:</strong>"Let me know if you have questions"<br/>
 <strong>Good:</strong>"Let's schedule a 15-minute call Thursday or Friday. What works for you?"
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 ❌ Mistake #6: Too Much Technical Detail
 </h3>
 <p className="text-[#64607d]">
 Clients don't care about React vs Vue or your tech stack. They care about results, timeline, and price.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 ❌ Mistake #7: No Risk Reversal
 </h3>
 <p className="text-[#64607d]">
 Add milestone payments, money-back guarantees, or unlimited revisions to reduce perceived risk.
 </p>
 </div>
 </div>
 </section>

 {/* Final CTA */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Get Weekly Proposal Templates
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Join our newsletter for done-for-you templates, scripts, and conversion strategies
 </p>
 <Link
 href={locale === 'nl' ? '/nl/newsletter' : '/en/newsletter'}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Get Free Template Library →
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
 "@type": ["Article", "HowTo"],
 "headline": "Winning Proposal Templates That Convert at 40%+",
 "description": "Copy the exact proposal templates that convert at 40%+. Includes 3 ready-to-use templates for design, development, and consulting projects.",
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
 "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/succes-strategieen/winning-proposals-templates`
 },
 "step": [
 {
 "@type": "HowToStep",
 "name": "Use the 7-Section Framework",
 "text": "Apply the universal proposal structure: Problem Mirror, Solution Snapshot, Proof Point, Timeline, Investment Options, Risk Reversal, Next Step"
 },
 {
 "@type": "HowToStep",
 "name": "Customize Templates",
 "text": "Adapt provided templates for web development, design, or consulting projects to your specific situation"
 },
 {
 "@type": "HowToStep",
 "name": "Add Advanced Techniques",
 "text": "Enhance with video intros, audit previews, ROI calculators, or fast-start bonuses"
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
 "name": "Winning Proposal Templates",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/succes-strategieen/winning-proposals-templates`
 }
 ]
 })
 }}
 />
 </main>

 
 </>
 );
}
