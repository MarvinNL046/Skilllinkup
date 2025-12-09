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

  const slug = 'retainer-pricing-strategies';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/gids/prijzen-verdienen/${slug}`;

  return {
    title: "Retainer Agreements for Freelancers: Build Stable Income in 2026",
    description: "Stop the feast-or-famine cycle. Learn how to structure retainer agreements that guarantee $5K-$20K monthly recurring income. Includes pricing models, contracts, and real examples.",
    keywords: "retainer agreements freelance, monthly retainer pricing, recurring freelance income, retainer contract template, stable freelance income",
    openGraph: {
      title: "Retainer Agreements for Freelancers: Build Stable Income in 2026",
      description: "Stop the feast-or-famine cycle. Learn how to structure retainer agreements that guarantee $5K-$20K monthly recurring income. Includes pricing models, contracts, and real examples.",
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [
        {
          url: `${siteUrl}/images/og/gids-og.png`,
          width: 1200,
          height: 630,
          alt: 'Retainer Pricing Strategies - SkillLinkup',
        }
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Retainer Agreements for Freelancers: Build Stable Income in 2026",
      description: "Stop the feast-or-famine cycle. Learn how to structure retainer agreements that guarantee $5K-$20K monthly recurring income. Includes pricing models, contracts, and real examples.",
      images: [`${siteUrl}/images/og/gids-og.png`],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function RetainerPricingStrategiesPage({ params }: Props) {
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
                Retainer Agreements: Stable Income for Freelancers
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Trade unpredictable project work for guaranteed monthly income. Learn how to structure retainers that clients renew year after year.
              </p>
              <Link
                href={`/${locale}/tools/rate-calculator`}
                className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Calculate Your Retainer Rate →
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">

          {/* Section 1: Why Retainers Transform Freelance Income */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              Why Retainers Are the Holy Grail of Freelancing
            </h2>

            <div className="prose prose-lg max-w-none">
              <p className="text-[#64607d] leading-relaxed mb-6">
                You're tired of the <strong className="text-[#1e1541]">feast-or-famine cycle</strong>. One month you bill $12K. The next, $2K because you spent 3 weeks pitching and got rejected. You can't budget. You can't plan. You're always stressed.
              </p>

              <p className="text-[#64607d] leading-relaxed mb-6">
                Retainer agreements fix this. <strong className="text-[#ef2b70]">They guarantee predictable monthly income</strong> in exchange for ongoing services. Instead of chasing projects, clients pay you every month—whether you work 10 hours or 40.
              </p>

              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
                  The Retainer Advantage
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-[#1e1541] mb-3 flex items-center">
                      <span className="text-2xl mr-2">💰</span> Financial Stability
                    </h4>
                    <ul className="space-y-2 text-sm text-[#64607d]">
                      <li>• Predictable monthly income (budget rent, expenses)</li>
                      <li>• Reduced sales/pitching time (40% → 10%)</li>
                      <li>• Lower platform fees (long-term client discounts)</li>
                      <li>• Qualify for mortgages and business loans easier</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-[#1e1541] mb-3 flex items-center">
                      <span className="text-2xl mr-2">🎯</span> Client Benefits
                    </h4>
                    <ul className="space-y-2 text-sm text-[#64607d]">
                      <li>• Priority access to your availability</li>
                      <li>• Consistent quality and context retention</li>
                      <li>• Discounted hourly rate vs. one-off projects</li>
                      <li>• No onboarding friction for each task</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg p-8 text-white mb-8">
                <h3 className="font-heading font-bold text-2xl mb-4">
                  Real Numbers: Project vs. Retainer Income
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-white/90 mb-2 text-sm">Project Model (5 clients/month)</p>
                    <p className="font-mono text-lg mb-1">$2,500 × 5 = <strong className="text-yellow-300">$12,500</strong></p>
                    <p className="text-xs text-white/80">Variable: 0-8 clients/month</p>
                    <p className="text-xs text-white/80">Sales time: 30 hours/month</p>
                  </div>

                  <div>
                    <p className="text-white/90 mb-2 text-sm">Retainer Model (4 clients @ $3K/mo)</p>
                    <p className="font-mono text-lg mb-1">$3,000 × 4 = <strong className="text-yellow-300">$12,000</strong></p>
                    <p className="text-xs text-white/80">Guaranteed: same every month</p>
                    <p className="text-xs text-white/80">Sales time: 5 hours/month</p>
                  </div>
                </div>

                <div className="mt-6 bg-white/10 rounded p-4">
                  <p className="text-sm text-white/90">
                    <strong>Same revenue, but:</strong> 25 extra billable hours/month (sales time saved) + zero income volatility stress
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: 5 Retainer Pricing Models */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              5 Proven Retainer Pricing Models
            </h2>

            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-[#ef2b70] rounded-lg p-4 mr-4">
                    <span className="text-3xl">⏱️</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
                      1. Hourly Bucket Retainer
                    </h3>
                    <p className="text-[#64607d]">Pre-paid hours with rollover or use-it-or-lose-it terms</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-[#1e1541] mb-3">How It Works:</h4>
                  <p className="text-[#64607d] mb-4">
                    Client pays for a fixed number of hours per month (e.g., 20 hours @ $120/hr = $2,400/mo). You track time and deliver within the bucket.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded p-4">
                      <p className="font-semibold text-green-800 mb-2">✅ Pros:</p>
                      <ul className="space-y-1 text-sm text-green-700">
                        <li>• Easy for clients to understand</li>
                        <li>• Flexible scope within hours</li>
                        <li>• Clear accountability (time tracking)</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded p-4">
                      <p className="font-semibold text-red-800 mb-2">❌ Cons:</p>
                      <ul className="space-y-1 text-sm text-red-700">
                        <li>• Still trading time for money</li>
                        <li>• Scope creep if client requests exceed hours</li>
                        <li>• Administrative overhead (time tracking)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f8f9fb] rounded p-4">
                  <p className="text-sm text-[#64607d]">
                    <strong className="text-[#1e1541]">Best for:</strong> Beginners transitioning from project work. Safe, predictable, and easy to sell.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-[#22c55e] rounded-lg p-4 mr-4">
                    <span className="text-3xl">📋</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
                      2. Scope-Based Retainer
                    </h3>
                    <p className="text-[#64607d]">Fixed deliverables each month, regardless of time spent</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-[#1e1541] mb-3">How It Works:</h4>
                  <p className="text-[#64607d] mb-4">
                    Define specific monthly deliverables (e.g., "4 blog posts + 8 social graphics + monthly analytics report" = $3,500/mo). Time spent is irrelevant.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded p-4">
                      <p className="font-semibold text-green-800 mb-2">✅ Pros:</p>
                      <ul className="space-y-1 text-sm text-green-700">
                        <li>• Value-based pricing (efficiency rewarded)</li>
                        <li>• Clear expectations for both parties</li>
                        <li>• No time tracking overhead</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded p-4">
                      <p className="font-semibold text-red-800 mb-2">❌ Cons:</p>
                      <ul className="space-y-1 text-sm text-red-700">
                        <li>• Scope must be very specific (avoid ambiguity)</li>
                        <li>• Clients may try to expand scope mid-month</li>
                        <li>• Requires strong boundaries</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f8f9fb] rounded p-4">
                  <p className="text-sm text-[#64607d]">
                    <strong className="text-[#1e1541]">Best for:</strong> Specialists with repeatable processes (content, design, SEO, social media management).
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-[#1e1541] rounded-lg p-4 mr-4">
                    <span className="text-3xl">🔄</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
                      3. Hybrid: Hours + Priority Access
                    </h3>
                    <p className="text-[#64607d]">Base retainer for availability + hourly billing for actual work</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-[#1e1541] mb-3">How It Works:</h4>
                  <p className="text-[#64607d] mb-4">
                    Client pays $1,500/mo base retainer for "priority access" (guaranteed response within 24 hours, reserved capacity). Actual work billed at $100/hr on top.
                  </p>

                  <div className="bg-[#f8f9fb] rounded p-4 mb-4">
                    <p className="text-sm text-[#64607d] mb-2">
                      <strong className="text-[#1e1541]">Example pricing:</strong>
                    </p>
                    <ul className="space-y-1 text-sm text-[#64607d]">
                      <li>• Base retainer: $1,500/mo (10 hours reserved capacity)</li>
                      <li>• Hourly overage: $100/hr after 10 hours</li>
                      <li>• Typical month: $1,500 + ($100 × 8 hours) = $2,300</li>
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded p-4">
                      <p className="font-semibold text-green-800 mb-2">✅ Pros:</p>
                      <ul className="space-y-1 text-sm text-green-700">
                        <li>• Guaranteed base income even in slow months</li>
                        <li>• Upside potential if client needs more</li>
                        <li>• Flexibility for variable workloads</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded p-4">
                      <p className="font-semibold text-red-800 mb-2">❌ Cons:</p>
                      <ul className="space-y-1 text-sm text-red-700">
                        <li>• Requires time tracking</li>
                        <li>• Can feel like "paying for nothing" if unused</li>
                        <li>• Complexity in billing (base + overage)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f8f9fb] rounded p-4">
                  <p className="text-sm text-[#64607d]">
                    <strong className="text-[#1e1541]">Best for:</strong> High-value clients with unpredictable needs (legal, technical support, consulting).
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-orange-500 rounded-lg p-4 mr-4">
                    <span className="text-3xl">📈</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
                      4. Performance-Based Retainer
                    </h3>
                    <p className="text-[#64607d]">Base fee + bonus tied to measurable results</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-[#1e1541] mb-3">How It Works:</h4>
                  <p className="text-[#64607d] mb-4">
                    Lower base retainer ($2,000/mo) + performance bonus (e.g., +$500 per 1,000 new email subscribers, or +10% of revenue increase).
                  </p>

                  <div className="bg-[#f8f9fb] rounded p-4 mb-4">
                    <p className="text-sm text-[#64607d] mb-2">
                      <strong className="text-[#1e1541]">Example structure:</strong>
                    </p>
                    <ul className="space-y-1 text-sm text-[#64607d]">
                      <li>• Base: $2,500/mo (SEO services)</li>
                      <li>• Bonus: $1,000 per 10,000 organic traffic increase</li>
                      <li>• Potential: $2,500-$6,500/mo depending on results</li>
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded p-4">
                      <p className="font-semibold text-green-800 mb-2">✅ Pros:</p>
                      <ul className="space-y-1 text-sm text-green-700">
                        <li>• High upside potential</li>
                        <li>• Aligns your incentives with client outcomes</li>
                        <li>• Easier to sell (client pays more only if it works)</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded p-4">
                      <p className="font-semibold text-red-800 mb-2">❌ Cons:</p>
                      <ul className="space-y-1 text-sm text-red-700">
                        <li>• Income volatility if results don't materialize</li>
                        <li>• External factors can affect bonuses (market, seasonality)</li>
                        <li>• Requires measurable, attributable metrics</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f8f9fb] rounded p-4">
                  <p className="text-sm text-[#64607d]">
                    <strong className="text-[#1e1541]">Best for:</strong> Marketing, SEO, sales, and growth roles where results are measurable and attributable.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-500 rounded-lg p-4 mr-4">
                    <span className="text-3xl">🎁</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
                      5. Tiered Service Packages
                    </h3>
                    <p className="text-[#64607d]">Good/Better/Best pricing with increasing scope and price</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-[#1e1541] mb-3">How It Works:</h4>
                  <p className="text-[#64607d] mb-4">
                    Offer 3 retainer tiers at different price points. Clients self-select based on needs and budget.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-[#f8f9fb] rounded p-4 border-2 border-gray-200">
                      <p className="font-semibold text-[#1e1541] mb-2">🥉 Basic</p>
                      <p className="text-2xl font-bold text-[#ef2b70] mb-3">$2,000/mo</p>
                      <ul className="space-y-1 text-xs text-[#64607d]">
                        <li>• 2 blog posts/month</li>
                        <li>• Basic SEO optimization</li>
                        <li>• Monthly report</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded p-4 border-2 border-[#22c55e] text-white">
                      <p className="font-semibold mb-2">🥈 Professional (Most Popular)</p>
                      <p className="text-2xl font-bold mb-3">$4,500/mo</p>
                      <ul className="space-y-1 text-xs">
                        <li>• 4 blog posts/month</li>
                        <li>• Advanced SEO + backlinks</li>
                        <li>• Social media scheduling</li>
                        <li>• Bi-weekly strategy calls</li>
                      </ul>
                    </div>

                    <div className="bg-[#f8f9fb] rounded p-4 border-2 border-gray-200">
                      <p className="font-semibold text-[#1e1541] mb-2">🥇 Enterprise</p>
                      <p className="text-2xl font-bold text-[#ef2b70] mb-3">$8,000/mo</p>
                      <ul className="space-y-1 text-xs text-[#64607d]">
                        <li>• 8 blog posts/month</li>
                        <li>• Full content strategy</li>
                        <li>• Social + email + SEO</li>
                        <li>• Weekly calls + Slack access</li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded p-4">
                      <p className="font-semibold text-green-800 mb-2">✅ Pros:</p>
                      <ul className="space-y-1 text-sm text-green-700">
                        <li>• Anchoring effect (middle tier sells best)</li>
                        <li>• Self-serve sales (clients choose, you don't pitch)</li>
                        <li>• Easy upsells to higher tiers</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded p-4">
                      <p className="font-semibold text-red-800 mb-2">❌ Cons:</p>
                      <ul className="space-y-1 text-sm text-red-700">
                        <li>• Requires standardized processes</li>
                        <li>• Less customization flexibility</li>
                        <li>• May not fit unique client needs</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f8f9fb] rounded p-4">
                  <p className="text-sm text-[#64607d]">
                    <strong className="text-[#1e1541]">Best for:</strong> Scalable services with repeatable processes (content, social media, design subscriptions).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section 1 */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Calculate Your Ideal Retainer Rate
              </h3>
              <p className="text-xl mb-6 text-white/90">
                Use our free calculator to determine your minimum monthly retainer
              </p>
              <Link
                href={`/${locale}/tools/rate-calculator`}
                className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Calculate Retainer Rate →
              </Link>
            </div>
          </section>

          {/* Section 3: How to Pitch Retainers */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              How to Pitch Retainers to Clients
            </h2>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
                The 3-Step Retainer Pitch
              </h3>

              <div className="space-y-8">
                <div>
                  <div className="flex items-start mb-4">
                    <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                        Demonstrate Value Through Initial Project
                      </h4>
                      <p className="text-[#64607d] mb-3">
                        Don't pitch retainers to cold leads. First, deliver exceptional results on a one-off project. Build trust and prove ROI.
                      </p>
                      <div className="bg-[#f8f9fb] rounded p-4 text-sm text-[#64607d]">
                        <strong className="text-[#1e1541]">Timing:</strong> Pitch retainer near end of initial project, when value is fresh and client is satisfied.
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start mb-4">
                    <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                        Frame as "Ongoing Partnership" Not "Monthly Fee"
                      </h4>
                      <p className="text-[#64607d] mb-3">
                        Positioning matters. Don't say "I want to charge you $3K/month." Say:
                      </p>
                      <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-3">
                        <p className="text-sm text-green-800">
                          <strong>Script:</strong> "I'd love to continue supporting your growth on an ongoing basis. Instead of project-by-project, what if we structured a partnership where I handle [specific outcomes] every month? This ensures consistency and lets me prioritize your needs. Does that sound valuable?"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start mb-4">
                    <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                        Offer Options, Not Ultimatums
                      </h4>
                      <p className="text-[#64607d] mb-3">
                        Present 2-3 retainer options so client feels in control:
                      </p>
                      <div className="bg-[#f8f9fb] rounded p-4 text-sm text-[#64607d]">
                        <ul className="space-y-2">
                          <li><strong className="text-[#1e1541]">Option A:</strong> $2,500/mo - 20 hours + monthly deliverables</li>
                          <li><strong className="text-[#1e1541]">Option B:</strong> $4,000/mo - 35 hours + weekly check-ins</li>
                          <li><strong className="text-[#1e1541]">Continue project-based:</strong> Same $125/hr rate, but no priority access</li>
                        </ul>
                        <p className="mt-3 text-xs">
                          <strong className="text-[#1e1541]">Psychology:</strong> Option B becomes the "recommended" middle choice. Option C (project-based) is the "loss aversion" option.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
                Handling Common Objections
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-[#1e1541] mb-2">
                    "What if we don't need you every month?"
                  </h4>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4">
                    <p className="text-sm text-green-800">
                      <strong>Response:</strong> "That's exactly why this works. Instead of ramping up and down, I stay embedded in your business. Months where you need less, I focus on strategy and planning. Months where you need more, I'm already up to speed. It smooths out the peaks and valleys for both of us."
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1e1541] mb-2">
                    "Can we do project-by-project instead?"
                  </h4>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4">
                    <p className="text-sm text-green-800">
                      <strong>Response:</strong> "Absolutely. My project rate is $150/hr without retainer. With a monthly retainer, you get the same quality at $120/hr because I can plan my capacity. Plus, you get priority—if a project comes in during a busy month, retainer clients go first."
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1e1541] mb-2">
                    "What if we want to cancel?"
                  </h4>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4">
                    <p className="text-sm text-green-800">
                      <strong>Response:</strong> "No problem. All my retainers are month-to-month with 30 days notice. If it's not working, either of us can end it. I'd rather you feel good about the partnership than locked into something that doesn't deliver."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section 2 */}
          <section className="mb-16">
            <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Read More About Stable Freelance Income
              </h3>
              <p className="text-xl mb-6 text-gray-300">
                Discover more strategies to build predictable revenue streams
              </p>
              <Link
                href={`/${locale}/blog`}
                className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Read Success Stories →
              </Link>
            </div>
          </section>

          {/* Section 4: Retainer Contract Essentials */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              What to Include in Your Retainer Contract
            </h2>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="text-[#64607d] mb-6">
                A solid contract protects both you and the client. Here are the must-have clauses:
              </p>

              <div className="space-y-6">
                <div className="border-l-4 border-[#ef2b70] pl-6">
                  <h4 className="font-semibold text-[#1e1541] mb-2">1. Scope of Services</h4>
                  <p className="text-sm text-[#64607d]">
                    <strong>Define exactly what's included.</strong> Be specific: "4 blog posts (1,200-1,500 words each), 8 social graphics, 1 monthly analytics report." Vague scope = scope creep.
                  </p>
                </div>

                <div className="border-l-4 border-[#ef2b70] pl-6">
                  <h4 className="font-semibold text-[#1e1541] mb-2">2. Payment Terms</h4>
                  <p className="text-sm text-[#64607d]">
                    <strong>Monthly fee, due date, late fees.</strong> Example: "$3,500 due on the 1st of each month. Payments more than 7 days late incur 5% late fee. Services paused until payment received."
                  </p>
                </div>

                <div className="border-l-4 border-[#ef2b70] pl-6">
                  <h4 className="font-semibold text-[#1e1541] mb-2">3. Term and Termination</h4>
                  <p className="text-sm text-[#64607d]">
                    <strong>Month-to-month or fixed term?</strong> Most retainers: "Month-to-month. Either party may terminate with 30 days written notice. If terminated mid-month, pro-rated refund provided."
                  </p>
                </div>

                <div className="border-l-4 border-[#ef2b70] pl-6">
                  <h4 className="font-semibold text-[#1e1541] mb-2">4. Rollover Policy (for hourly buckets)</h4>
                  <p className="text-sm text-[#64607d]">
                    <strong>Do unused hours roll over?</strong> "Unused hours expire at month-end" (use-it-or-lose-it) OR "Up to 10 hours may roll over to next month."
                  </p>
                </div>

                <div className="border-l-4 border-[#ef2b70] pl-6">
                  <h4 className="font-semibold text-[#1e1541] mb-2">5. Communication Expectations</h4>
                  <p className="text-sm text-[#64607d]">
                    <strong>Response times, meeting cadence.</strong> "Email responses within 24 hours on business days. Monthly strategy call (60 minutes). Slack access during business hours."
                  </p>
                </div>

                <div className="border-l-4 border-[#ef2b70] pl-6">
                  <h4 className="font-semibold text-[#1e1541] mb-2">6. Out-of-Scope Work</h4>
                  <p className="text-sm text-[#64607d]">
                    <strong>How to handle extra requests.</strong> "Work beyond defined scope will be quoted separately and billed at $150/hr or added to next month's retainer with mutual agreement."
                  </p>
                </div>

                <div className="border-l-4 border-[#ef2b70] pl-6">
                  <h4 className="font-semibold text-[#1e1541] mb-2">7. Intellectual Property</h4>
                  <p className="text-sm text-[#64607d]">
                    <strong>Who owns the work?</strong> "Upon full payment, Client owns all deliverables. Freelancer retains right to use work in portfolio with Client's permission."
                  </p>
                </div>

                <div className="border-l-4 border-[#ef2b70] pl-6">
                  <h4 className="font-semibold text-[#1e1541] mb-2">8. Rate Increase Clause</h4>
                  <p className="text-sm text-[#64607d]">
                    <strong>Protect against inflation.</strong> "Freelancer may increase retainer fee once per year with 60 days written notice."
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Ready to Build Stable Income?
              </h3>
              <p className="text-xl mb-6 text-white/90">
                Calculate your ideal retainer rate and start pitching stable monthly agreements
              </p>
              <Link
                href={`/${locale}/tools/rate-calculator`}
                className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Calculate Your Retainer Rate →
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
              "@type": "Article",
              "headline": "Retainer Agreements for Freelancers: Build Stable Income in 2026",
              "description": "Stop the feast-or-famine cycle. Learn how to structure retainer agreements that guarantee $5K-$20K monthly recurring income.",
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
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/prijzen-verdienen/retainer-pricing-strategies`
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
                  "name": "Retainer Pricing Strategies",
                  "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/prijzen-verdienen/retainer-pricing-strategies`
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
