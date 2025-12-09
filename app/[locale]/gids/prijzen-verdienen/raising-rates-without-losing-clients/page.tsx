import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const slug = 'raising-rates-without-losing-clients';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/gids/prijzen-verdienen/${slug}`;

  return {
    title: "How to Raise Your Freelance Rates Without Losing Clients in 2026",
    description: "Learn the psychology and scripts to increase rates 20-50% while keeping 90%+ of clients. Proven strategies from freelancers who successfully raised rates multiple times.",
    keywords: "raise freelance rates, increase hourly rate, freelance rate increase, how to charge more, rate negotiation freelance",
    openGraph: {
      title: "How to Raise Your Freelance Rates Without Losing Clients in 2026",
      description: "Learn the psychology and scripts to increase rates 20-50% while keeping 90%+ of clients. Proven strategies from freelancers who successfully raised rates multiple times.",
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [
        {
          url: `${siteUrl}/images/og/gids-og.png`,
          width: 1200,
          height: 630,
          alt: 'Raising Rates Without Losing Clients - SkillLinkup',
        }
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: "How to Raise Your Freelance Rates Without Losing Clients in 2026",
      description: "Learn the psychology and scripts to increase rates 20-50% while keeping 90%+ of clients. Proven strategies from freelancers who successfully raised rates multiple times.",
      images: [`${siteUrl}/images/og/gids-og.png`],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function RaisingRatesWithoutLosingClientsPage({ params }: Props) {
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
                How to Raise Your Rates Without Losing Clients
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                You're worth more than you're charging. Here's exactly how to increase your rates 20-50% while keeping 90% of your clients.
              </p>
              <Link
                href={`/${locale}/tools/rate-calculator`}
                className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Calculate Your New Rate →
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">

          {/* Section 1: Why Most Freelancers Undercharge */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              Why You're Probably Undercharging (And How to Fix It)
            </h2>

            <div className="prose prose-lg max-w-none">
              <p className="text-[#64607d] leading-relaxed mb-6">
                You set your rate 2 years ago. Since then, you've gained 500 hours of experience, delivered 30+ successful projects, and mastered 5 new skills. <strong className="text-[#1e1541]">But you're still charging the same rate.</strong>
              </p>

              <p className="text-[#64607d] leading-relaxed mb-6">
                Meanwhile, inflation is 3-5% per year. Your expenses increased. Your skills improved. Your results got better. Yet your rate stayed flat.
              </p>

              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
                  The Real Cost of Not Raising Rates
                </h3>

                <div className="bg-[#f8f9fb] rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-[#1e1541] mb-3">Example: $75/hour for 3 years</h4>
                  <div className="space-y-2 text-sm text-[#64607d]">
                    <div className="flex justify-between">
                      <span>Year 1: 1,200 billable hours @ $75/hr</span>
                      <strong className="text-[#1e1541]">$90,000</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Year 2: 1,200 hours @ $75/hr (should be $81/hr +8%)</span>
                      <strong className="text-[#1e1541]">$90,000</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Year 3: 1,200 hours @ $75/hr (should be $87/hr +16%)</span>
                      <strong className="text-[#1e1541]">$90,000</strong>
                    </div>
                    <div className="flex justify-between pt-3 mt-3 border-t-2 border-gray-200">
                      <strong className="text-[#1e1541]">Total earned (3 years)</strong>
                      <strong className="text-[#1e1541]">$270,000</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">If you raised 8% per year</span>
                      <strong className="text-green-700">$298,080</strong>
                    </div>
                    <div className="flex justify-between bg-red-50 p-3 rounded mt-2">
                      <strong className="text-red-700">Money left on table</strong>
                      <strong className="text-red-700 text-lg">$28,080</strong>
                    </div>
                  </div>
                </div>

                <p className="text-[#64607d] italic">
                  <strong className="text-[#ef2b70]">$28,080 lost</strong> over 3 years by not raising rates annually. That's a down payment on a house.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg p-8 text-white">
                <h3 className="font-heading font-bold text-2xl mb-4">
                  When to Raise Your Rates
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-2xl mr-3">📅</span>
                    <span><strong>Annually:</strong> Minimum 3-5% to match inflation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl mr-3">🎓</span>
                    <span><strong>After new skills/certifications:</strong> 10-20% increase</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl mr-3">📈</span>
                    <span><strong>When booked solid (90%+ capacity):</strong> 20-30% increase</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl mr-3">⭐</span>
                    <span><strong>After exceptional results for client:</strong> 15-25% increase</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl mr-3">🎯</span>
                    <span><strong>When repositioning/specializing:</strong> 30-50% increase</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: The Psychology of Rate Increases */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              The Psychology: Why Clients Don't Leave
            </h2>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <p className="text-[#64607d] leading-relaxed mb-6">
                Here's what you fear: "If I raise rates, my clients will leave for someone cheaper."
              </p>

              <p className="text-[#64607d] leading-relaxed mb-6">
                Here's the reality: <strong className="text-[#1e1541]">90-95% of quality clients stay when you raise rates 20-30%</strong>.
              </p>

              <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
                Why Clients Actually Stay
              </h3>

              <div className="space-y-6">
                <div className="border-l-4 border-[#22c55e] pl-6">
                  <h4 className="font-semibold text-[#1e1541] mb-2">1. Switching Costs Are High</h4>
                  <p className="text-sm text-[#64607d] mb-2">
                    Finding, vetting, onboarding a new freelancer takes 20-40 hours. That's $2,000-$5,000 in internal time. A 25% rate increase ($1,500/year on $6K annual spend) is cheaper than switching.
                  </p>
                  <div className="bg-[#f8f9fb] rounded p-3 text-xs text-[#64607d]">
                    <strong>Client math:</strong> Pay you $1,500 more OR spend $3,000 finding replacement + risk of lower quality = Easy decision
                  </div>
                </div>

                <div className="border-l-4 border-[#22c55e] pl-6">
                  <h4 className="font-semibold text-[#1e1541] mb-2">2. You Have Context Other Freelancers Don't</h4>
                  <p className="text-sm text-[#64607d]">
                    You know their business, brand voice, team dynamics, and goals. A new freelancer starts from zero. That knowledge is worth paying more for.
                  </p>
                </div>

                <div className="border-l-4 border-[#22c55e] pl-6">
                  <h4 className="font-semibold text-[#1e1541] mb-2">3. Proven Track Record &gt; Unknown Quantity</h4>
                  <p className="text-sm text-[#64607d]">
                    You've delivered results. A cheaper freelancer might save 20% but risk project failure. Most clients won't gamble on mission-critical work.
                  </p>
                </div>

                <div className="border-l-4 border-[#22c55e] pl-6">
                  <h4 className="font-semibold text-[#1e1541] mb-2">4. Price Anchoring: Higher Rates = Higher Perceived Value</h4>
                  <p className="text-sm text-[#64607d] mb-2">
                    When you charge more, clients subconsciously assume you're better. "They raised their rates—they must be in demand and worth it."
                  </p>
                  <div className="bg-[#f8f9fb] rounded p-3 text-xs text-[#64607d]">
                    <strong>Reverse psychology:</strong> Charging TOO LITTLE makes clients question quality. "Why are they so cheap? Are they desperate?"
                  </div>
                </div>

                <div className="border-l-4 border-[#22c55e] pl-6">
                  <h4 className="font-semibold text-[#1e1541] mb-2">5. Good Clients Expect Rate Increases</h4>
                  <p className="text-sm text-[#64607d]">
                    Professional clients know skilled people get raises. If you NEVER raise rates, they wonder: "Why aren't they growing? Are they stuck?"
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg">
              <p className="text-[#1e1541] font-semibold mb-2">
                ⚠️ The Clients Who Leave Are the Ones You Don't Want
              </p>
              <p className="text-[#64607d] text-sm">
                If a client leaves over a 20% rate increase, they were price-shopping, not value-seeking. These are the clients who nickel-and-dime, demand revisions, and churn anyway. Losing them is a feature, not a bug.
              </p>
            </div>
          </section>

          {/* CTA Section 1 */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Calculate Your New Rate
              </h3>
              <p className="text-xl mb-6 text-white/90">
                Determine what you SHOULD be charging based on experience and market value
              </p>
              <Link
                href={`/${locale}/tools/rate-calculator`}
                className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Calculate Fair Rate →
              </Link>
            </div>
          </section>

          {/* Section 3: The Announcement Framework */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              How to Announce Rate Increases (Word-for-Word Scripts)
            </h2>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
                The 4-Part Rate Increase Email
              </h3>

              <div className="space-y-8">
                <div>
                  <h4 className="font-semibold text-[#1e1541] mb-3 flex items-center">
                    <span className="bg-[#ef2b70] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1</span>
                    Appreciation & Context
                  </h4>
                  <div className="bg-[#f8f9fb] rounded-lg p-4 border-l-4 border-[#ef2b70]">
                    <p className="text-sm text-[#64607d] italic">
                      "I wanted to reach out personally because I really value our working relationship. Over the past [timeframe], we've accomplished [specific results/projects], and it's been a pleasure collaborating with you."
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1e1541] mb-3 flex items-center">
                    <span className="bg-[#ef2b70] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">2</span>
                    The Increase (Direct & Confident)
                  </h4>
                  <div className="bg-[#f8f9fb] rounded-lg p-4 border-l-4 border-[#ef2b70]">
                    <p className="text-sm text-[#64607d] italic">
                      "I'm writing to let you know that starting [date - 60-90 days from now], my rate will be increasing from $[old rate] to $[new rate] per hour / my monthly retainer will increase from $[old] to $[new]."
                    </p>
                  </div>
                  <p className="text-xs text-[#64607d] mt-2 ml-11">
                    <strong>Why this works:</strong> No apologies. No justifications yet. State it as fact—confident and matter-of-fact.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1e1541] mb-3 flex items-center">
                    <span className="bg-[#ef2b70] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">3</span>
                    The Rationale (Value, Not Need)
                  </h4>
                  <div className="bg-[#f8f9fb] rounded-lg p-4 border-l-4 border-[#ef2b70]">
                    <p className="text-sm text-[#64607d] italic mb-3">
                      "This increase reflects [choose 1-2]:
                    </p>
                    <ul className="space-y-2 text-sm text-[#64607d] italic">
                      <li>• The expanded scope and complexity of work we're doing together</li>
                      <li>• New certifications/skills I've acquired (e.g., [specific skill])</li>
                      <li>• The measurable results we've achieved ([specific metric])</li>
                      <li>• Market adjustments to align with industry standards for my experience level</li>
                      <li>• Increased operational costs and continued professional development"</li>
                    </ul>
                  </div>
                  <p className="text-xs text-[#64607d] mt-2 ml-11">
                    <strong>Key:</strong> Frame as VALUE you deliver, not YOUR expenses. Clients don't care about your rent—they care about results.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1e1541] mb-3 flex items-center">
                    <span className="bg-[#ef2b70] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">4</span>
                    The Transition (Smooth & Generous)
                  </h4>
                  <div className="bg-[#f8f9fb] rounded-lg p-4 border-l-4 border-[#ef2b70]">
                    <p className="text-sm text-[#64607d] italic">
                      "Any projects starting before [date] will be billed at the current rate. If you have questions or want to discuss how we can continue working together at the new rate, I'm happy to schedule a quick call. Otherwise, the increase will take effect automatically on [date]."
                    </p>
                  </div>
                  <p className="text-xs text-[#64607d] mt-2 ml-11">
                    <strong>Subtlety:</strong> Assume they'll stay. Don't ask "Do you want to continue?" Frame it as "How we'll continue."
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-3">📧 Full Example Email</h4>
                <div className="text-sm text-green-900 space-y-3 font-mono bg-white p-4 rounded border border-green-100">
                  <p><strong>Subject:</strong> Rate Adjustment - Effective March 1, 2026</p>
                  <p className="pt-3">Hi [Client Name],</p>
                  <p>I wanted to reach out personally because I really value our working relationship. Over the past 18 months, we've launched 3 major campaigns that generated $450K in revenue, and it's been a pleasure being part of your growth.</p>
                  <p>I'm writing to let you know that starting March 1, 2026, my hourly rate will be increasing from $100 to $125.</p>
                  <p>This increase reflects the expanded scope of strategic work we're doing together, as well as new certifications I've earned in conversion optimization and the measurable ROI we've achieved.</p>
                  <p>Any projects starting before March 1 will be billed at the current $100 rate. If you have questions or want to discuss how we can continue working together, I'm happy to schedule a quick call. Otherwise, the new rate takes effect automatically on March 1.</p>
                  <p>Looking forward to continuing our partnership!</p>
                  <p>Best,<br/>[Your Name]</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Handling Objections */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              How to Handle Rate Increase Objections
            </h2>

            <p className="text-[#64607d] leading-relaxed mb-8">
              Most clients accept rate increases without pushback. But if they object, here's how to respond:
            </p>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                  Objection #1: "That's too expensive / We can't afford that"
                </h3>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                  <p className="text-sm text-red-800 mb-2">
                    <strong>❌ Bad Response:</strong> "I can keep you at the old rate" (Immediate cave)
                  </p>
                  <p className="text-xs text-red-700">
                    Signals your increase was arbitrary. Client will negotiate every time.
                  </p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <p className="text-sm text-green-800 mb-2">
                    <strong>✅ Better Response:</strong>
                  </p>
                  <p className="text-sm text-green-900 italic mb-3">
                    "I understand budget is always a consideration. Let's talk about options. We could reduce scope to fit your budget—for example, [specific deliverable reduction]. Or, we could transition you to my project-based pricing instead of a retainer. What would work better for your needs?"
                  </p>
                  <p className="text-xs text-green-700">
                    Offers flexibility WITHOUT discounting. Maintains new rate integrity.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                  Objection #2: "We just got a quote from someone at $75/hour (vs. your $125)"
                </h3>

                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <p className="text-sm text-green-800 mb-2">
                    <strong>✅ Response:</strong>
                  </p>
                  <p className="text-sm text-green-900 italic mb-3">
                    "That's great—there are talented people at every price point. The difference is context and proven results. I already know your business, your audience, and what works. A new freelancer will need 10-20 hours just to get up to speed, which effectively makes their rate $90-100/hour for the first project. Plus, we've consistently delivered [specific metric]. If you're looking for the absolute lowest cost, I'm probably not the right fit. But if you want guaranteed results from someone who knows your business inside and out, I'm confident the value justifies the investment."
                  </p>
                  <p className="text-xs text-green-700">
                    Reframes price as investment. Qualifies the client—if they're price-shopping, they're not ideal anyway.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                  Objection #3: "Can you grandfather us in at the old rate since we've been working together so long?"
                </h3>

                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <p className="text-sm text-green-800 mb-2">
                    <strong>✅ Response:</strong>
                  </p>
                  <p className="text-sm text-green-900 italic mb-3">
                    "I appreciate our long-term relationship, which is exactly why I'm giving you 90 days notice instead of 30. That said, my rates reflect current market value and the expertise I bring. What I CAN do is structure a volume discount if you commit to [X hours/month] or offer a 6-month lock-in at $115/hour if you prepay a retainer. But the old rate no longer reflects the value I deliver. Does one of those options work for you?"
                  </p>
                  <p className="text-xs text-green-700">
                    Honors relationship but holds boundary. Offers compromise without caving.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                  Objection #4: "We need to discuss this with our team / Can we wait 6 months?"
                </h3>

                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <p className="text-sm text-green-800 mb-2">
                    <strong>✅ Response:</strong>
                  </p>
                  <p className="text-sm text-green-900 italic mb-3">
                    "Absolutely—take the time you need. The new rate takes effect [date]. Any projects started before that date lock in the current rate, so if there's work you're planning, we can prioritize getting it started before the increase. Let me know what makes sense for your timeline."
                  </p>
                  <p className="text-xs text-green-700">
                    Accommodates their process while creating urgency. Doesn't extend the deadline—holds firm on effective date.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                  Objection #5: "We're going to pause and revisit this later"
                </h3>

                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <p className="text-sm text-green-800 mb-2">
                    <strong>✅ Response:</strong>
                  </p>
                  <p className="text-sm text-green-900 italic mb-3">
                    "No problem—I understand priorities shift. Just so you know, when you're ready to restart, my rate at that point will be [new rate]. I'm not holding the old rate open because my capacity fills quickly and my rates continue to adjust with market demand. But I'd love to work together again when the timing is right. Let's stay in touch!"
                  </p>
                  <p className="text-xs text-green-700">
                    Polite but firm. No negotiations later. If they come back at lower rate, say no.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section 2 */}
          <section className="mb-16">
            <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                See How Others Raised Rates Successfully
              </h3>
              <p className="text-xl mb-6 text-gray-300">
                Read real stories from freelancers who doubled their rates
              </p>
              <Link
                href={`/${locale}/blog`}
                className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Read Success Stories →
              </Link>
            </div>
          </section>

          {/* Section 5: Implementation Timeline */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              Your 90-Day Rate Increase Implementation Plan
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
                <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-16 h-16 flex items-center justify-center text-lg mr-4 flex-shrink-0">
                  Day<br/>1-7
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                    Calculate & Decide
                  </h3>
                  <p className="text-[#64607d] mb-3">
                    Determine your new rate using market research, value delivered, and cost of living. Aim for 20-30% increase (3-5% = inflation, 15-25% = value/experience).
                  </p>
                  <div className="bg-[#f8f9fb] rounded p-3 text-sm text-[#64607d]">
                    <strong>Action:</strong> Use rate calculator, research competitors, review project results from past year
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
                <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-16 h-16 flex items-center justify-center text-lg mr-4 flex-shrink-0">
                  Day<br/>7-14
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                    Segment Your Clients
                  </h3>
                  <p className="text-[#64607d] mb-3">
                    Divide clients into 3 categories: (A) Would pay more, (B) Will accept increase, (C) Might leave. Tailor messaging accordingly.
                  </p>
                  <div className="bg-[#f8f9fb] rounded p-3 text-sm text-[#64607d]">
                    <ul className="space-y-1">
                      <li>• <strong>A Clients:</strong> Consider larger increase (30-40%) - they value you highly</li>
                      <li>• <strong>B Clients:</strong> Standard increase (20-25%)</li>
                      <li>• <strong>C Clients:</strong> Smallest increase (15-20%) or let them go</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
                <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-16 h-16 flex items-center justify-center text-lg mr-4 flex-shrink-0">
                  Day<br/>14-21
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                    Draft & Review Announcement
                  </h3>
                  <p className="text-[#64607d] mb-3">
                    Write your 4-part email. Run it by a fellow freelancer or mentor for feedback. Make sure tone is confident, not apologetic.
                  </p>
                  <div className="bg-[#f8f9fb] rounded p-3 text-sm text-[#64607d]">
                    <strong>Key:</strong> Set effective date 60-90 days out. This gives clients time to budget and shows respect.
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
                <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-16 h-16 flex items-center justify-center text-lg mr-4 flex-shrink-0">
                  Day<br/>21
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                    Send Announcements
                  </h3>
                  <p className="text-[#64607d] mb-3">
                    Send personalized emails to all active clients on the same day. Don't stagger—rumors spread. Be consistent and fair.
                  </p>
                  <div className="bg-[#f8f9fb] rounded p-3 text-sm text-[#64607d]">
                    <strong>Pro tip:</strong> Send during business hours (Tuesday-Thursday, 10am-2pm) for best response rates
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
                <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-16 h-16 flex items-center justify-center text-lg mr-4 flex-shrink-0">
                  Day<br/>21-30
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                    Handle Responses
                  </h3>
                  <p className="text-[#64607d] mb-3">
                    Expect 60-70% no response (silent acceptance), 20-30% positive acknowledgment, 5-10% questions/objections.
                  </p>
                  <div className="bg-[#f8f9fb] rounded p-3 text-sm text-[#64607d]">
                    <strong>Action:</strong> Respond within 24 hours. Use objection scripts above. Stay firm on new rate.
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
                <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-16 h-16 flex items-center justify-center text-lg mr-4 flex-shrink-0">
                  Day<br/>90
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                    New Rate Goes Live
                  </h3>
                  <p className="text-[#64607d] mb-3">
                    Update all invoices, contracts, and proposals with new rate. Celebrate! You just increased your annual income by 20-30%.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded p-3 text-sm text-green-800">
                    <strong>Typical retention:</strong> 90-95% of clients stay. Any who leave were price-shoppers, not value-seekers.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: What to Do if Client Leaves */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              What to Do When a Client Leaves Over Price
            </h2>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="text-[#64607d] leading-relaxed mb-6">
                It will happen. Not often—maybe 1 in 10 clients—but someone will leave because of your rate increase. Here's how to handle it professionally:
              </p>

              <div className="space-y-6">
                <div className="border-l-4 border-[#22c55e] pl-6">
                  <h4 className="font-semibold text-[#1e1541] mb-2">1. Stay Professional and Gracious</h4>
                  <p className="text-sm text-[#64607d] mb-3">
                    <strong>Response:</strong> "I completely understand, and I appreciate the opportunity to work together. If your needs change in the future, I'd be happy to reconnect. Wishing you all the best!"
                  </p>
                  <p className="text-xs text-[#64607d]">
                    <strong>Why:</strong> Many clients come back 6-12 months later when cheaper alternatives underdeliver. Leave the door open.
                  </p>
                </div>

                <div className="border-l-4 border-[#22c55e] pl-6">
                  <h4 className="font-semibold text-[#1e1541] mb-2">2. Offer a Smooth Transition</h4>
                  <p className="text-sm text-[#64607d] mb-3">
                    Offer to finish current projects or provide brief handoff documentation to their new freelancer. This builds goodwill and maintains your reputation.
                  </p>
                </div>

                <div className="border-l-4 border-[#22c55e] pl-6">
                  <h4 className="font-semibold text-[#1e1541] mb-2">3. Do NOT Discount or Cave</h4>
                  <p className="text-sm text-[#64607d] mb-3">
                    If you reduce your rate to keep them, you've taught them that your rates are negotiable. They'll negotiate every invoice forever. Let them go.
                  </p>
                </div>

                <div className="border-l-4 border-[#22c55e] pl-6">
                  <h4 className="font-semibold text-[#1e1541] mb-2">4. Fill the Gap Quickly</h4>
                  <p className="text-sm text-[#64607d] mb-3">
                    Lost $2K/month client? You now have 15-20 hours/month to fill. Pitch new clients at your NEW rate. You only need to replace 13-16 hours at $125/hr to match 20 hours at $100/hr.
                  </p>
                </div>

                <div className="border-l-4 border-[#22c55e] pl-6">
                  <h4 className="font-semibold text-[#1e1541] mb-2">5. Analyze the Loss (Was it Really About Price?)</h4>
                  <p className="text-sm text-[#64607d] mb-3">
                    Sometimes "too expensive" is code for "not seeing enough value." If multiple clients leave, reassess:
                  </p>
                  <ul className="space-y-1 text-xs text-[#64607d] ml-4">
                    <li>• Are you communicating ROI clearly?</li>
                    <li>• Are you delivering measurable results?</li>
                    <li>• Did you raise rates too much too fast (&gt;50% increase)?</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-[#f8f9fb] rounded p-4">
                <p className="text-sm text-[#64607d]">
                  <strong className="text-[#1e1541]">Remember:</strong> Losing 1-2 price-sensitive clients at $100/hr and replacing them with 1 value-focused client at $150/hr = same revenue, less work, better clients. This is called "upgrading your client base."
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Stop Leaving Money on the Table
              </h3>
              <p className="text-xl mb-6 text-white/90">
                Calculate what you should be charging and increase your income by 20-30% this year
              </p>
              <Link
                href={`/${locale}/tools/rate-calculator`}
                className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Calculate Your Fair Rate →
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
              "name": "How to Raise Your Freelance Rates Without Losing Clients",
              "description": "A comprehensive guide to increasing freelance rates 20-50% while keeping 90%+ of clients through strategic communication and psychology.",
              "step": [
                {
                  "@type": "HowToStep",
                  "position": 1,
                  "name": "Calculate Your New Rate",
                  "text": "Determine fair market rate based on experience, skills, and value delivered. Aim for 20-30% increase annually."
                },
                {
                  "@type": "HowToStep",
                  "position": 2,
                  "name": "Segment Your Clients",
                  "text": "Divide clients into A/B/C categories based on value perception and budget flexibility."
                },
                {
                  "@type": "HowToStep",
                  "position": 3,
                  "name": "Draft Announcement Email",
                  "text": "Write 4-part email: Appreciation, Increase, Rationale, Transition. Set effective date 60-90 days out."
                },
                {
                  "@type": "HowToStep",
                  "position": 4,
                  "name": "Send Personalized Announcements",
                  "text": "Send to all clients on same day with confident, professional tone."
                },
                {
                  "@type": "HowToStep",
                  "position": 5,
                  "name": "Handle Objections Professionally",
                  "text": "Use proven scripts to address concerns while maintaining rate integrity."
                },
                {
                  "@type": "HowToStep",
                  "position": 6,
                  "name": "Implement New Rate",
                  "text": "Update invoices, contracts, and proposals. Expect 90-95% client retention."
                }
              ],
              "totalTime": "P90D"
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "How to Raise Your Freelance Rates Without Losing Clients in 2026",
              "description": "Learn the psychology and scripts to increase rates 20-50% while keeping 90%+ of clients.",
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
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/prijzen-verdienen/raising-rates-without-losing-clients`
              }
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
                  "name": "Guides",
                  "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Pricing & Earnings",
                  "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/prijzen-verdienen`
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Raising Rates Without Losing Clients",
                  "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/prijzen-verdienen/raising-rates-without-losing-clients`
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
