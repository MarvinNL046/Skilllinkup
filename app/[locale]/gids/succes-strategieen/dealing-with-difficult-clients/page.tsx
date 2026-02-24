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

 const slug = 'dealing-with-difficult-clients';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/succes-strategieen/${slug}`;

 return {
 title: "How to Handle Difficult Clients Professionally (Scripts + De-Escalation Techniques)",
 description: "Master the art of handling difficult clients without losing your cool or the contract. Includes word-for-word scripts, boundary-setting frameworks, and red flag detection.",
 keywords: "difficult clients, client management, freelance boundaries, scope creep, demanding clients",
 openGraph: {
 title: "How to Handle Difficult Clients Professionally (Scripts + De-Escalation Techniques)",
 description: "Master the art of handling difficult clients without losing your cool or the contract.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Handling Difficult Clients - SkillLinkup',
 }
 ],
 locale: locale === 'nl' ? 'nl_NL' : 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "How to Handle Difficult Clients Professionally (Scripts + De-Escalation Techniques)",
 description: "Master the art of handling difficult clients without losing your cool or the contract.",
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 },
 };
}

export default async function DifficultClientsPage({ params }: Props) {
 const { locale } = await params;

 return (
 <>
 <Header />

 <main className="min-h-screen bg-[#f8f9fb]">
 <section className="bg-gradient-to-br from-[#1e1541] via-[#2a1f5e] to-[#1e1541] text-white py-16">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
 How to Handle Difficult Clients Professionally
 </h1>
 <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
 Every freelancer deals with challenging clients. The difference between success and burnout? Having the right scripts, boundaries, and de-escalation techniques ready before you need them.
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
 The 6 Types of Difficult Clients (And How to Spot Them Early)
 </h2>
 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Not all difficult clients are the same. Identifying the type early helps you choose the right response strategy.
 </p>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
 <div className="flex items-start">
 <div className="text-3xl mr-4"></div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Type 1: The Scope Creep Client
 </h3>
 <p className="text-[#64607d] mb-3">
 <strong>Behavior:</strong>"While you're at it, can you also..." Small requests that add up to 50%+ more work.
 </p>
 <div className="bg-gray-50 rounded-lg p-4">
 <p className="text-sm text-[#64607d] mb-2"><strong className="text-[#1e1541]">Red flags:</strong></p>
 <ul className="space-y-1 text-[#64607d] text-sm">
 <li>• Vague project requirements during discovery</li>
 <li>• "We'll figure it out as we go" attitude</li>
 <li>• Comparing you to previous freelancer who "did more"</li>
 </ul>
 <p className="text-sm text-[#1e1541] mt-3 font-semibold">Strategy: Crystal-clear scope document with change order process</p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
 <div className="flex items-start">
 <div className="text-3xl mr-4"></div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Type 2: The Micromanager
 </h3>
 <p className="text-[#64607d] mb-3">
 <strong>Behavior:</strong>Wants to approve every pixel, color choice, and line of code. Daily check-ins. 47 revision rounds.
 </p>
 <div className="bg-gray-50 rounded-lg p-4">
 <p className="text-sm text-[#64607d] mb-2"><strong className="text-[#1e1541]">Red flags:</strong></p>
 <ul className="space-y-1 text-[#64607d] text-sm">
 <li>• Asks for hourly updates during discovery call</li>
 <li>• Wants access to your project management tools</li>
 <li>• Previous freelancers "didn't communicate enough"</li>
 </ul>
 <p className="text-sm text-[#1e1541] mt-3 font-semibold">Strategy: Structured check-in schedule + milestone-based approvals</p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500">
 <div className="flex items-start">
 <div className="text-3xl mr-4"></div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Type 3: The Ghost (Then Emergency) Client
 </h3>
 <p className="text-[#64607d] mb-3">
 <strong>Behavior:</strong>Disappears for weeks. Ignores requests for feedback. Then: "URGENT: Need this done by tomorrow!"
 </p>
 <div className="bg-gray-50 rounded-lg p-4">
 <p className="text-sm text-[#64607d] mb-2"><strong className="text-[#1e1541]">Red flags:</strong></p>
 <ul className="space-y-1 text-[#64607d] text-sm">
 <li>• Takes 3+ days to respond during sales conversation</li>
 <li>• Mentions being "really busy" multiple times</li>
 <li>• No clear decision-maker or approval process</li>
 </ul>
 <p className="text-sm text-[#1e1541] mt-3 font-semibold">Strategy: Response time requirements in contract + rush fee policy</p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
 <div className="flex items-start">
 <div className="text-3xl mr-4"></div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Type 4: The Negotiator
 </h3>
 <p className="text-[#64607d] mb-3">
 <strong>Behavior:</strong>Questions every line item. Asks for discounts. Compares your rates to cheaper options. Wants more for less.
 </p>
 <div className="bg-gray-50 rounded-lg p-4">
 <p className="text-sm text-[#64607d] mb-2"><strong className="text-[#1e1541]">Red flags:</strong></p>
 <ul className="space-y-1 text-[#64607d] text-sm">
 <li>• First question is "What's your lowest price?"</li>
 <li>• Mentions finding cheaper alternatives</li>
 <li>• Asks for "quick discount" before starting</li>
 </ul>
 <p className="text-sm text-[#1e1541] mt-3 font-semibold">Strategy: Value-based pricing + standing firm on rates</p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
 <div className="flex items-start">
 <div className="text-3xl mr-4"></div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Type 5: The "Expert" Client
 </h3>
 <p className="text-[#64607d] mb-3">
 <strong>Behavior:</strong>Hired you for expertise but argues with every recommendation. "I read an article that says..." or "Can't you just..."
 </p>
 <div className="bg-gray-50 rounded-lg p-4">
 <p className="text-sm text-[#64607d] mb-2"><strong className="text-[#1e1541]">Red flags:</strong></p>
 <ul className="space-y-1 text-[#64607d] text-sm">
 <li>• Describes exactly how you should do the work</li>
 <li>• Sends articles/tutorials during discovery</li>
 <li>• "I just need someone to execute my vision"</li>
 </ul>
 <p className="text-sm text-[#1e1541] mt-3 font-semibold">Strategy: Educational approach + documented recommendations</p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-gray-500">
 <div className="flex items-start">
 <div className="text-3xl mr-4"></div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Type 6: The Never-Satisfied Client
 </h3>
 <p className="text-[#64607d] mb-3">
 <strong>Behavior:</strong>Endless revision requests. "It's good but..." Moving goalposts. Impossible to please.
 </p>
 <div className="bg-gray-50 rounded-lg p-4">
 <p className="text-sm text-[#64607d] mb-2"><strong className="text-[#1e1541]">Red flags:</strong></p>
 <ul className="space-y-1 text-[#64607d] text-sm">
 <li>• Bad reviews mentioning multiple revision rounds</li>
 <li>• "I'm very particular" or "I know what I want"</li>
 <li>• Shows examples but can't articulate what they like</li>
 </ul>
 <p className="text-sm text-[#1e1541] mt-3 font-semibold">Strategy: Revision cap in contract + approval process</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Find Platforms With Better Client Quality
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Some platforms pre-screen clients and enforce professional standards
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
 Word-For-Word Scripts for Common Situations
 </h2>

 <div className="space-y-8">
 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4 flex items-center">
 
 Scenario 1: Handling Scope Creep
 </h3>
 <p className="text-[#64607d] mb-4">
 <strong>Situation:</strong>Client asks for "one small addition" that's actually 10+ hours of work.
 </p>
 <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm text-[#64607d] whitespace-pre-line">
{`Hi [Client],

Great idea! I can definitely help with [new request].

Since this falls outside our original scope (attached for reference), here's how we can proceed:

Option 1: Add to Current Project
• Estimated time: [X hours]
• Additional cost: $[amount]
• Timeline impact: +[X days]

Option 2: Phase 2 Project
• Complete current scope on schedule
• Start [new feature] as separate project
• No timeline impact on current deliverables

Which works better for you?

Best,
[Your Name]`}
 </div>
 <div className="mt-4 bg-[#fff8f8] border-l-4 border-[#ef2b70] p-4 rounded-r-lg">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Key points:</strong>Reference original scope, provide options, frame as choice (not negotiation)
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4 flex items-center">
 
 Scenario 2: Client Asks for Discount
 </h3>
 <p className="text-[#64607d] mb-4">
 <strong>Situation:</strong>After seeing your proposal, client says "Can you do it for $X?" (significantly lower)
 </p>
 <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm text-[#64607d] whitespace-pre-line">
{`Hi [Client],

I appreciate you being direct about budget.

My pricing reflects [specific value/expertise]:
• [Differentiator 1, e.g., "10+ years experience in your industry"]
• [Differentiator 2, e.g., "Average ROI of 3-5x for similar projects"]
• [Differentiator 3, e.g., "30-day support included"]

If budget is a constraint, I can offer:

Reduced Scope Option:
• [Core features only]
• Investment: $[lower price]
• You can add [removed features] later

Or we could:
• Extend timeline (reduces rush fees)
• Payment plan: 3 installments
• Start with MVP, expand later

My rates won't drop, but I'm happy to find creative solutions.

What sounds best?

Best,
[Your Name]`}
 </div>
 <div className="mt-4 bg-[#fff8f8] border-l-4 border-[#ef2b70] p-4 rounded-r-lg">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Key points:</strong>Justify pricing, offer alternatives (not discounts), maintain rate integrity
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4 flex items-center">
 <span className="text-3xl mr-3">⏰</span>
 Scenario 3: Last-Minute "Emergency"
 </h3>
 <p className="text-[#64607d] mb-4">
 <strong>Situation:</strong>Client wants something "by tomorrow" that wasn't on your schedule.
 </p>
 <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm text-[#64607d] whitespace-pre-line">
{`Hi [Client],

I understand this feels urgent.

Here's what I can do:

Standard Timeline (No Rush Fee):
• Start: [date - your normal schedule]
• Delivery: [date]
• Cost: $[standard rate]

Rush Option (Priority Handling):
• Start: Today
• Delivery: [tomorrow/ASAP]
• Cost: $[standard rate] + 50% rush fee
• Note: I'll need to reschedule other commitments

Context: Rush work requires me to:
• Move other clients' projects
• Work evenings/weekends
• Potential quality trade-off due to compressed timeline

Which timeline works for your situation?

Best,
[Your Name]`}
 </div>
 <div className="mt-4 bg-[#fff8f8] border-l-4 border-[#ef2b70] p-4 rounded-r-lg">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Key points:</strong>Acknowledge urgency, explain impact, charge appropriately for priority
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4 flex items-center">
 
 Scenario 4: Revision #8 (Beyond Contract)
 </h3>
 <p className="text-[#64607d] mb-4">
 <strong>Situation:</strong>You've delivered 3 revision rounds (per contract), client wants more changes.
 </p>
 <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm text-[#64607d] whitespace-pre-line">
{`Hi [Client],

I've reviewed your latest feedback.

Quick check on our contract:
• Included revisions: 3 rounds ✓ (completed)
• Current request: Round 4

I'm happy to make these changes. Here's how:

Additional Revision Round:
• Cost: $[amount] (per contract terms)
• Timeline: [X days]
• Includes: [scope of changes]

OR we can schedule a 30-minute call to:
• Clarify remaining concerns
• Find the quickest path to approval
• Ensure we're aligned on final vision

Often a quick conversation resolves more than another revision round.

What works better for you?

Best,
[Your Name]`}
 </div>
 <div className="mt-4 bg-[#fff8f8] border-l-4 border-[#ef2b70] p-4 rounded-r-lg">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Key points:</strong>Reference contract, offer paid option AND free alternative (call)
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4 flex items-center">
 
 Scenario 5: Firing a Client (Professionally)
 </h3>
 <p className="text-[#64607d] mb-4">
 <strong>Situation:</strong>Client is consistently disrespectful, demanding, or violating boundaries. Time to end the relationship.
 </p>
 <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm text-[#64607d] whitespace-pre-line">
{`Hi [Client],

After careful consideration, I've decided I'm not the right fit to continue working on this project.

To ensure a smooth transition:

1. Current Work:
 • [Deliverable X] will be completed by [date]
 • All source files will be transferred
 • Final invoice: $[amount] (for completed work)

2. Transition Support:
 • I'll document all work completed
 • Happy to answer questions for 7 days
 • Can recommend other freelancers if helpful

3. Timeline:
 • Final delivery: [date]
 • Files transferred: [date]
 • Contract ends: [date]

I appreciate the opportunity to work together and wish you success with the project.

Best,
[Your Name]`}
 </div>
 <div className="mt-4 bg-[#fff8f8] border-l-4 border-[#ef2b70] p-4 rounded-r-lg">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Key points:</strong>Professional tone, clear timeline, complete existing obligations, no negativity
 </p>
 </div>
 </div>
 </div>
 </section>

 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 The Boundary-Setting Framework
 </h2>

 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Preventing difficult situations is easier than resolving them. Set these boundaries from day one:
 </p>

 <div className="grid md:grid-cols-2 gap-6">
 <div className="bg-white rounded-lg shadow-lg p-6">
 <div className="text-3xl mb-3">⏰</div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 Communication Boundaries
 </h3>
 <ul className="space-y-2 text-[#64607d] text-sm">
 <li>• Response time: Within 24 business hours</li>
 <li>• Availability: Monday-Friday, 9am-5pm [timezone]</li>
 <li>• Preferred channel: Email for requests, Slack for quick questions</li>
 <li>• No weekend/late-night messages (or 2x rate applies)</li>
 </ul>
 <div className="mt-4 bg-gray-50 rounded-lg p-3 text-xs text-[#64607d]">
 <strong className="text-[#1e1541]">Add to contract:</strong>"Response time of 24 business hours. Messages sent outside business hours will be addressed on next business day."
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6">
 <div className="text-3xl mb-3"></div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 Scope Boundaries
 </h3>
 <ul className="space-y-2 text-[#64607d] text-sm">
 <li>• Detailed scope document with deliverables list</li>
 <li>• "Included" vs "Not Included" sections</li>
 <li>• Change order process with pricing</li>
 <li>• Definition of "minor tweaks" (5 min max)</li>
 </ul>
 <div className="mt-4 bg-gray-50 rounded-lg p-3 text-xs text-[#64607d]">
 <strong className="text-[#1e1541]">Add to contract:</strong>"Any work beyond defined scope requires written approval and separate pricing."
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6">
 <div className="text-3xl mb-3"></div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 Revision Boundaries
 </h3>
 <ul className="space-y-2 text-[#64607d] text-sm">
 <li>• Number of included revision rounds (typically 2-3)</li>
 <li>• Cost per additional round ($X or hourly)</li>
 <li>• Definition of "revision" vs "new direction"</li>
 <li>• Timeline for providing feedback (7-day max)</li>
 </ul>
 <div className="mt-4 bg-gray-50 rounded-lg p-3 text-xs text-[#64607d]">
 <strong className="text-[#1e1541]">Add to contract:</strong>"Includes 3 revision rounds. Additional revisions billed at $X/round. Major direction changes constitute new scope."
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6">
 <div className="text-3xl mb-3"></div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 Payment Boundaries
 </h3>
 <ul className="space-y-2 text-[#64607d] text-sm">
 <li>• 50% upfront, 50% on completion (or milestone-based)</li>
 <li>• Payment terms: Net 7 days (not 30 or 60)</li>
 <li>• Late fee: 5% per week after due date</li>
 <li>• Work stops if payment overdue &gt;14 days</li>
 </ul>
 <div className="mt-4 bg-gray-50 rounded-lg p-3 text-xs text-[#64607d]">
 <strong className="text-[#1e1541]">Add to contract:</strong>"Payment due within 7 days of invoice. Late payments incur 5% weekly fee. Work pauses after 14 days overdue."
 </div>
 </div>
 </div>
 </div>
 </section>

 <section className="mb-16">
 <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Learn From Real Conflict Resolutions
 </h3>
 <p className="text-xl mb-6 text-gray-300">
 Read case studies of how top freelancers turned difficult situations into wins
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
 When to Fire a Client (Red Line Checklist)
 </h2>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Some clients aren't worth keeping, no matter how much they pay. End the relationship if they:
 </p>

 <div className="space-y-4">
 <div className="flex items-start">
 
 <div>
 <p className="font-semibold text-[#1e1541] mb-1">Disrespect Your Boundaries Repeatedly</p>
 <p className="text-[#64607d] text-sm">After 2-3 warnings, if they continue calling at midnight, demanding instant responses, or ignoring your stated availability.</p>
 </div>
 </div>

 <div className="flex items-start">
 
 <div>
 <p className="font-semibold text-[#1e1541] mb-1">Verbally Abuse or Harass You</p>
 <p className="text-[#64607d] text-sm">Yelling, personal attacks, threats, or inappropriate behavior. Zero tolerance. Document and end immediately.</p>
 </div>
 </div>

 <div className="flex items-start">
 
 <div>
 <p className="font-semibold text-[#1e1541] mb-1">Consistently Refuse to Pay on Time</p>
 <p className="text-[#64607d] text-sm">Excuses every invoice, delays beyond 30 days repeatedly, or tries to negotiate payment after work is complete.</p>
 </div>
 </div>

 <div className="flex items-start">
 
 <div>
 <p className="font-semibold text-[#1e1541] mb-1">Ask You to Do Unethical/Illegal Work</p>
 <p className="text-[#64607d] text-sm">Black-hat SEO, misleading advertising, copyright infringement, or anything that could harm your reputation or break laws.</p>
 </div>
 </div>

 <div className="flex items-start">
 
 <div>
 <p className="font-semibold text-[#1e1541] mb-1">Damage Your Mental Health</p>
 <p className="text-[#64607d] text-sm">Anxiety before every call, dreading their messages, losing sleep. No client is worth your wellbeing.</p>
 </div>
 </div>

 <div className="flex items-start">
 
 <div>
 <p className="font-semibold text-[#1e1541] mb-1">Take 3x More Time Than They Pay For</p>
 <p className="text-[#64607d] text-sm">If a $2K project requires $6K worth of effort due to constant changes, poor communication, or unrealistic demands.</p>
 </div>
 </div>
 </div>

 <div className="mt-8 bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg p-6 text-white">
 <h4 className="font-heading font-bold text-lg mb-3">
 The 3-Strike Rule
 </h4>
 <p className="text-white/90 text-sm mb-3">
 For boundary violations (not abuse or non-payment):
 </p>
 <ol className="space-y-2 text-white/90 text-sm">
 <li><strong>Strike 1:</strong>Gentle reminder about boundary</li>
 <li><strong>Strike 2:</strong>Formal written warning referencing contract</li>
 <li><strong>Strike 3:</strong>Professional termination with transition plan</li>
 </ol>
 <p className="text-white/90 text-sm mt-4">
 Document everything. You may need it for platform disputes or legal protection.
 </p>
 </div>
 </div>
 </section>

 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Prevention Checklist (Start Every Project Right)
 </h2>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Print this and check off before signing any client:
 </p>

 <div className="space-y-3">
 <label className="flex items-start cursor-pointer">
 <input type="checkbox" className="mt-1 mr-3 h-5 w-5 text-[#ef2b70]" />
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Discovery call completed</strong>- Discussed goals, timeline, budget, work style
 </span>
 </label>

 <label className="flex items-start cursor-pointer">
 <input type="checkbox" className="mt-1 mr-3 h-5 w-5 text-[#ef2b70]" />
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Written contract signed</strong>- Includes scope, revisions, payment terms, timelines
 </span>
 </label>

 <label className="flex items-start cursor-pointer">
 <input type="checkbox" className="mt-1 mr-3 h-5 w-5 text-[#ef2b70]" />
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Deposit received</strong>- 50% upfront payment cleared before starting
 </span>
 </label>

 <label className="flex items-start cursor-pointer">
 <input type="checkbox" className="mt-1 mr-3 h-5 w-5 text-[#ef2b70]" />
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Red flags assessed</strong>- No major warning signs or concerns addressed
 </span>
 </label>

 <label className="flex items-start cursor-pointer">
 <input type="checkbox" className="mt-1 mr-3 h-5 w-5 text-[#ef2b70]" />
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Communication plan set</strong>- Check-in schedule, preferred channels, response times
 </span>
 </label>

 <label className="flex items-start cursor-pointer">
 <input type="checkbox" className="mt-1 mr-3 h-5 w-5 text-[#ef2b70]" />
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Scope documented</strong>- Deliverables list with "included" and "not included" sections
 </span>
 </label>

 <label className="flex items-start cursor-pointer">
 <input type="checkbox" className="mt-1 mr-3 h-5 w-5 text-[#ef2b70]" />
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Revision policy explained</strong>- Client understands limits and additional costs
 </span>
 </label>

 <label className="flex items-start cursor-pointer">
 <input type="checkbox" className="mt-1 mr-3 h-5 w-5 text-[#ef2b70]" />
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Gut check passed</strong>- You feel good about this partnership
 </span>
 </label>
 </div>

 <div className="mt-6 bg-[#fff8f8] border-l-4 border-[#ef2b70] p-4 rounded-r-lg">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">If you can't check all boxes:</strong>Don't start the project. Address concerns or walk away. It's easier to decline than to fire mid-project.
 </p>
 </div>
 </div>
 </section>

 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Get Client Management Templates
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Join our newsletter for contract templates, scripts, and boundary-setting frameworks
 </p>
 <Link
 href={locale === 'nl' ? '/nl/newsletter' : '/en/newsletter'}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Get Free Client Kit →
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
 "headline": "How to Handle Difficult Clients Professionally",
 "description": "Master the art of handling difficult clients without losing your cool or the contract.",
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
 "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/succes-strategieen/dealing-with-difficult-clients`
 },
 "step": [
 {
 "@type": "HowToStep",
 "name": "Identify Client Type",
 "text": "Recognize the 6 types of difficult clients and their red flags early"
 },
 {
 "@type": "HowToStep",
 "name": "Use Professional Scripts",
 "text": "Apply word-for-word scripts for scope creep, discounts, emergencies, and revisions"
 },
 {
 "@type": "HowToStep",
 "name": "Set Clear Boundaries",
 "text": "Establish communication, scope, revision, and payment boundaries from day one"
 },
 {
 "@type": "HowToStep",
 "name": "Know When to Fire",
 "text": "Use the red line checklist and 3-strike rule to protect your wellbeing"
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
 "name": "Dealing with Difficult Clients",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/succes-strategieen/dealing-with-difficult-clients`
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
