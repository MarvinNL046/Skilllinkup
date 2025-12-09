import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const metadata: Metadata = {
  title: 'Freelance Platform Fees Comparison 2026 | Complete Cost Breakdown',
  description: 'Complete breakdown of all freelance platform fees: service fees, payment processing, withdrawal costs, and hidden charges. Calculate your real earnings.',
  openGraph: {
    title: 'Freelance Platform Fees Comparison 2026 | Complete Cost Breakdown',
    description: 'Complete breakdown of all freelance platform fees: service fees, payment processing, withdrawal costs, and hidden charges.',
    type: 'article',
    images: ['/images/defaults/og-image.jpg'],
  },
};

export default async function PlatformFeesComparisonPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Freelance Platform Fees Comparison 2026',
    description: 'Complete breakdown of all freelance platform fees including hidden costs and real earnings calculations.',
    author: {
      '@type': 'Organization',
      name: 'SkillLinkup',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SkillLinkup',
      logo: {
        '@type': 'ImageObject',
        url: 'https://skilllinkup.com/images/logo/logo-black.png',
      },
    },
    datePublished: '2026-01-01',
    dateModified: '2026-01-01',
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://skilllinkup.com/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Platform Selection Guide',
        item: `https://skilllinkup.com/${locale}/gids/platform-selectie`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Platform Fees Comparison',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e1541] to-[#ef2b70] text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Freelance Platform Fees Comparison 2026
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              The complete breakdown of platform fees, hidden costs, and what you actually take home. Stop losing money to unexpected charges.
            </p>
            <Link
              href={`/${locale}/platforms`}
              className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-3 text-[#ef2b70] font-heading font-semibold shadow-lg transition-colors"
            >
              Compare Platforms
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-700 leading-relaxed">
              &quot;10% platform fee&quot; sounds reasonable, right? But what if the real cost is closer to 25% after payment processing, withdrawal fees, and subscription charges?
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We&apos;ve analyzed the complete fee structures of 20 major freelance platforms. This guide reveals every cost—advertised and hidden—so you can calculate your actual earnings before committing.
            </p>
          </div>

          {/* Fee Calculator Widget */}
          <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 mb-12 text-white">
            <h2 className="text-3xl font-heading font-bold mb-6 text-center">
              Quick Fee Calculator
            </h2>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <p className="text-lg mb-4">
                <strong>Example:</strong> $1,000 project on Upwork (first-time client)
              </p>
              <div className="space-y-3 text-white/90">
                <div className="flex justify-between">
                  <span>Project value:</span>
                  <span className="font-bold">$1,000.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee (20%):</span>
                  <span className="font-bold">-$200.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment processing (2.75%):</span>
                  <span className="font-bold">-$27.50</span>
                </div>
                <div className="flex justify-between">
                  <span>Withdrawal fee:</span>
                  <span className="font-bold">-$0.99</span>
                </div>
                <div className="border-t border-white/30 pt-3 flex justify-between text-xl font-heading font-bold">
                  <span>You receive:</span>
                  <span className="text-[#22c55e]">$771.51</span>
                </div>
                <p className="text-sm text-white/70 italic text-right">Actual fee: 22.85%</p>
              </div>
            </div>
          </div>

          {/* Understanding Fee Types */}
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-[#1e1541] mb-6">
              Understanding Different Fee Types
            </h2>
            <p className="text-gray-700 mb-6">
              Most platforms charge multiple fees. Here&apos;s what each one means:
            </p>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#ef2b70]">
                <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-3">
                  1. Service Fee (Platform Commission)
                </h3>
                <p className="text-gray-700 mb-3">
                  The main platform fee, usually 5-20% of your project earnings. This is what platforms advertise most prominently.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Example:</strong> Upwork charges 5-20% sliding scale based on lifetime billings with each client.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#ef2b70]">
                <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-3">
                  2. Payment Processing Fee
                </h3>
                <p className="text-gray-700 mb-3">
                  Additional 2-3% fee when clients pay via credit card or PayPal. Often buried in fine print.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Example:</strong> Fiverr charges $1 + 2% for withdrawals under $100.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#ef2b70]">
                <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-3">
                  3. Withdrawal Fee
                </h3>
                <p className="text-gray-700 mb-3">
                  Fee to transfer your earnings to your bank account or PayPal. Can be flat-rate or percentage-based.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Example:</strong> $0.99 for ACH transfer, $2.99 for wire transfer, varies by payment method.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#ef2b70]">
                <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-3">
                  4. Subscription/Membership Fee
                </h3>
                <p className="text-gray-700 mb-3">
                  Monthly or annual fee for platform access or premium features. Can be optional or required.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Example:</strong> Some platforms charge $10-50/month for priority placement, more connects, or lower service fees.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#ef2b70]">
                <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-3">
                  5. Currency Conversion Fee
                </h3>
                <p className="text-gray-700 mb-3">
                  Extra 2-4% when getting paid in a currency different from your local currency.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Example:</strong> US platform paying European freelancer in EUR can add 2-3.5% conversion markup.
                </p>
              </div>
            </div>
          </div>

          {/* Complete Fee Comparison Table */}
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-[#1e1541] mb-6">
              Complete Fee Breakdown by Platform
            </h2>
            <p className="text-gray-700 mb-6">
              All fees current as of January 2026. Tap/hover for details on each fee type.
            </p>

            {/* Desktop Table */}
            <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden mb-8">
              <table className="w-full">
                <thead className="bg-[#1e1541] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-heading">Platform</th>
                    <th className="px-6 py-4 text-left font-heading">Service Fee</th>
                    <th className="px-6 py-4 text-left font-heading">Payment Processing</th>
                    <th className="px-6 py-4 text-left font-heading">Withdrawal</th>
                    <th className="px-6 py-4 text-left font-heading">Total Cost*</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Upwork</td>
                    <td className="px-6 py-4">5-20% sliding</td>
                    <td className="px-6 py-4">2.75%</td>
                    <td className="px-6 py-4">$0.99-2.99</td>
                    <td className="px-6 py-4 font-bold text-[#ef2b70]">7.8-23%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Fiverr</td>
                    <td className="px-6 py-4">20% flat</td>
                    <td className="px-6 py-4">2%</td>
                    <td className="px-6 py-4">$1 + 2%</td>
                    <td className="px-6 py-4 font-bold text-[#ef2b70]">~24%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Freelancer.com</td>
                    <td className="px-6 py-4">10% or $5 min</td>
                    <td className="px-6 py-4">Varies</td>
                    <td className="px-6 py-4">$1-30</td>
                    <td className="px-6 py-4 font-bold text-[#ef2b70]">~12-15%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Toptal</td>
                    <td className="px-6 py-4">Platform margin</td>
                    <td className="px-6 py-4">Included</td>
                    <td className="px-6 py-4">$0</td>
                    <td className="px-6 py-4 font-bold text-[#22c55e]">Variable**</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Guru</td>
                    <td className="px-6 py-4">5-9% tier-based</td>
                    <td className="px-6 py-4">2.9%</td>
                    <td className="px-6 py-4">$0.99</td>
                    <td className="px-6 py-4 font-bold text-[#ef2b70]">~8-12%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Contra</td>
                    <td className="px-6 py-4">0%</td>
                    <td className="px-6 py-4">2.9% + $0.30</td>
                    <td className="px-6 py-4">$0</td>
                    <td className="px-6 py-4 font-bold text-[#22c55e]">~3%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">PeoplePerHour</td>
                    <td className="px-6 py-4">20% (3.5% Pro)</td>
                    <td className="px-6 py-4">3.5%</td>
                    <td className="px-6 py-4">$3.49</td>
                    <td className="px-6 py-4 font-bold text-[#ef2b70]">~24-7%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-6 py-4 font-semibold">99designs</td>
                    <td className="px-6 py-4">Platform keeps 60%</td>
                    <td className="px-6 py-4">Included</td>
                    <td className="px-6 py-4">$5</td>
                    <td className="px-6 py-4 font-bold text-red-600">~60%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Braintrust</td>
                    <td className="px-6 py-4">0-10%</td>
                    <td className="px-6 py-4">Varies</td>
                    <td className="px-6 py-4">Gas fees (crypto)</td>
                    <td className="px-6 py-4 font-bold text-[#22c55e]">~0-12%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Flexjobs</td>
                    <td className="px-6 py-4">$14.95/mo</td>
                    <td className="px-6 py-4">N/A (job board)</td>
                    <td className="px-6 py-4">N/A</td>
                    <td className="px-6 py-4 font-bold text-[#22c55e]">Flat $15/mo</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              *Total cost calculated for $1,000 project. **Toptal includes fees in hourly rate negotiations.
            </p>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-4">Upwork</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee:</span>
                    <span className="font-semibold">5-20% sliding</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Processing:</span>
                    <span className="font-semibold">2.75%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Withdrawal:</span>
                    <span className="font-semibold">$0.99-2.99</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-bold">Total Cost:</span>
                    <span className="font-bold text-[#ef2b70]">7.8-23%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-4">Fiverr</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee:</span>
                    <span className="font-semibold">20% flat</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Processing:</span>
                    <span className="font-semibold">2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Withdrawal:</span>
                    <span className="font-semibold">$1 + 2%</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-bold">Total Cost:</span>
                    <span className="font-bold text-[#ef2b70]">~24%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-4">Contra</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee:</span>
                    <span className="font-semibold text-[#22c55e]">0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Processing:</span>
                    <span className="font-semibold">2.9% + $0.30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Withdrawal:</span>
                    <span className="font-semibold">$0</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-bold">Total Cost:</span>
                    <span className="font-bold text-[#22c55e]">~3%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA #1 */}
          <div className="bg-gradient-to-r from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 mb-12 text-center">
            <h3 className="text-2xl font-heading font-bold text-white mb-4">
              Avoid Hidden Fees - See Warning Signs
            </h3>
            <p className="text-white/90 text-lg mb-6">
              Learn the 12 red flags that signal expensive or unreliable platforms
            </p>
            <Link
              href={`/${locale}/gids/platform-selectie/freelance-platform-red-flags`}
              className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-3 text-[#ef2b70] font-heading font-semibold shadow-lg transition-colors"
            >
              Read Red Flags Guide
            </Link>
          </div>

          {/* Real World Examples */}
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-[#1e1541] mb-6">
              Real-World Earnings Examples
            </h2>
            <p className="text-gray-700 mb-6">
              See exactly what you&apos;d earn on different platforms for common project sizes:
            </p>

            <div className="space-y-8">
              {/* $500 Project */}
              <div>
                <h3 className="text-2xl font-heading font-bold text-[#1e1541] mb-4">
                  Scenario 1: $500 Logo Design Project
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="font-heading font-bold text-[#ef2b70] mb-2">Fiverr</h4>
                    <div className="space-y-1 text-sm text-gray-700 mb-3">
                      <p>Project: $500.00</p>
                      <p>Service fee (20%): -$100.00</p>
                      <p>Processing (2%): -$10.00</p>
                      <p>Withdrawal: -$3.00</p>
                    </div>
                    <p className="text-xl font-bold text-[#1e1541]">You get: $387.00</p>
                    <p className="text-xs text-gray-500">Effective fee: 22.6%</p>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="font-heading font-bold text-[#ef2b70] mb-2">Upwork</h4>
                    <div className="space-y-1 text-sm text-gray-700 mb-3">
                      <p>Project: $500.00</p>
                      <p>Service fee (20%): -$100.00</p>
                      <p>Processing (2.75%): -$13.75</p>
                      <p>Withdrawal: -$0.99</p>
                    </div>
                    <p className="text-xl font-bold text-[#1e1541]">You get: $385.26</p>
                    <p className="text-xs text-gray-500">Effective fee: 22.9%</p>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6 border-2 border-[#22c55e]">
                    <h4 className="font-heading font-bold text-[#22c55e] mb-2">Contra</h4>
                    <div className="space-y-1 text-sm text-gray-700 mb-3">
                      <p>Project: $500.00</p>
                      <p>Service fee (0%): $0.00</p>
                      <p>Processing (2.9%): -$14.50</p>
                      <p>Withdrawal: -$0.30</p>
                    </div>
                    <p className="text-xl font-bold text-[#22c55e]">You get: $485.20</p>
                    <p className="text-xs text-gray-500">Effective fee: 3%</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Difference:</strong> You earn $98.20 more on Contra vs Fiverr for the same project.
                </p>
              </div>

              {/* $5000 Project */}
              <div>
                <h3 className="text-2xl font-heading font-bold text-[#1e1541] mb-4">
                  Scenario 2: $5,000 Website Development (New Client)
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="font-heading font-bold text-[#ef2b70] mb-2">Upwork (20% tier)</h4>
                    <div className="space-y-1 text-sm text-gray-700 mb-3">
                      <p>Project: $5,000.00</p>
                      <p>Service fee (20%): -$1,000.00</p>
                      <p>Processing (2.75%): -$137.50</p>
                      <p>Withdrawal: -$2.99</p>
                    </div>
                    <p className="text-xl font-bold text-[#1e1541]">You get: $3,859.51</p>
                    <p className="text-xs text-gray-500">Effective fee: 22.8%</p>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="font-heading font-bold text-[#ef2b70] mb-2">Guru (9% tier)</h4>
                    <div className="space-y-1 text-sm text-gray-700 mb-3">
                      <p>Project: $5,000.00</p>
                      <p>Service fee (9%): -$450.00</p>
                      <p>Processing (2.9%): -$145.00</p>
                      <p>Withdrawal: -$0.99</p>
                    </div>
                    <p className="text-xl font-bold text-[#1e1541]">You get: $4,404.01</p>
                    <p className="text-xs text-gray-500">Effective fee: 11.9%</p>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6 border-2 border-[#22c55e]">
                    <h4 className="font-heading font-bold text-[#22c55e] mb-2">Contra</h4>
                    <div className="space-y-1 text-sm text-gray-700 mb-3">
                      <p>Project: $5,000.00</p>
                      <p>Service fee (0%): $0.00</p>
                      <p>Processing (2.9%): -$145.00</p>
                      <p>Withdrawal: -$0.30</p>
                    </div>
                    <p className="text-xl font-bold text-[#22c55e]">You get: $4,854.70</p>
                    <p className="text-xs text-gray-500">Effective fee: 2.9%</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Difference:</strong> You earn $995.19 more on Contra vs Upwork - almost $1,000 extra!
                </p>
              </div>

              {/* $20000 Project */}
              <div>
                <h3 className="text-2xl font-heading font-bold text-[#1e1541] mb-4">
                  Scenario 3: $20,000 Long-Term Contract (Repeat Client)
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg shadow p-6 border-2 border-[#22c55e]">
                    <h4 className="font-heading font-bold text-[#22c55e] mb-2">Upwork (5% tier)</h4>
                    <div className="space-y-1 text-sm text-gray-700 mb-3">
                      <p>Project: $20,000.00</p>
                      <p>Service fee (5%): -$1,000.00</p>
                      <p>Processing (2.75%): -$550.00</p>
                      <p>Withdrawal: -$2.99</p>
                    </div>
                    <p className="text-xl font-bold text-[#22c55e]">You get: $18,447.01</p>
                    <p className="text-xs text-gray-500">Effective fee: 7.8%</p>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="font-heading font-bold text-[#ef2b70] mb-2">Fiverr</h4>
                    <div className="space-y-1 text-sm text-gray-700 mb-3">
                      <p>Project: $20,000.00</p>
                      <p>Service fee (20%): -$4,000.00</p>
                      <p>Processing (2%): -$400.00</p>
                      <p>Withdrawal: -$12.00</p>
                    </div>
                    <p className="text-xl font-bold text-[#1e1541]">You get: $15,588.00</p>
                    <p className="text-xs text-gray-500">Effective fee: 22.1%</p>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="font-heading font-bold text-[#ef2b70] mb-2">Guru (5% tier)</h4>
                    <div className="space-y-1 text-sm text-gray-700 mb-3">
                      <p>Project: $20,000.00</p>
                      <p>Service fee (5%): -$1,000.00</p>
                      <p>Processing (2.9%): -$580.00</p>
                      <p>Withdrawal: -$0.99</p>
                    </div>
                    <p className="text-xl font-bold text-[#1e1541]">You get: $18,419.01</p>
                    <p className="text-xs text-gray-500">Effective fee: 7.9%</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Difference:</strong> Upwork&apos;s sliding scale rewards long-term clients - you earn $2,859 more than Fiverr.
                </p>
              </div>
            </div>
          </div>

          {/* Hidden Costs */}
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-[#1e1541] mb-6">
              Hidden Costs to Watch For
            </h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
              <p className="text-gray-700">
                <strong>Warning:</strong> The fees above don&apos;t include these common hidden costs that can add another 5-15% to your total expenses.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-heading font-bold text-[#1e1541] mb-2">
                  Connect/Bid Fees
                </h3>
                <p className="text-gray-700 mb-2">
                  Some platforms charge to apply for projects. Upwork charges &quot;Connects&quot; ($0.15 each), Freelancer.com charges for bids.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Impact:</strong> If you apply to 100 projects/month, that&apos;s $15-50 in application fees before you earn anything.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-heading font-bold text-[#1e1541] mb-2">
                  Premium Memberships
                </h3>
                <p className="text-gray-700 mb-2">
                  &quot;Optional&quot; memberships that are practically required to compete (better placement, lower fees, more bids).
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Cost:</strong> $10-50/month depending on platform and tier.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-heading font-bold text-[#1e1541] mb-2">
                  Currency Conversion
                </h3>
                <p className="text-gray-700 mb-2">
                  If you&apos;re paid in a currency different from your bank account currency, expect 2-4% conversion fees.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Example:</strong> US platform → European freelancer can lose another 3% to currency conversion.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-heading font-bold text-[#1e1541] mb-2">
                  Minimum Withdrawal Thresholds
                </h3>
                <p className="text-gray-700 mb-2">
                  Some platforms require you to earn $50-100 before you can withdraw, tying up your cash flow.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Impact:</strong> Delays payment for small projects or new freelancers.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-heading font-bold text-[#1e1541] mb-2">
                  Tax Withholding (International)
                </h3>
                <p className="text-gray-700 mb-2">
                  US-based platforms may withhold 30% taxes for non-US freelancers without proper tax documentation (W-8BEN form).
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Solution:</strong> Complete tax forms correctly to avoid withholding, or reclaim through your country&apos;s tax treaty.
                </p>
              </div>
            </div>
          </div>

          {/* CTA #2 */}
          <div className="bg-[#22c55e]/10 border-l-4 border-[#22c55e] rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-heading font-bold text-[#1e1541] mb-4">
              Find the Platform with Best Rates for Your Skills
            </h3>
            <p className="text-gray-700 text-lg mb-6">
              Different platforms work better for different skill sets. Take our quiz to find your perfect match.
            </p>
            <Link
              href={`/${locale}/gids/platform-selectie/platform-selectie-quiz`}
              className="inline-block rounded-lg bg-[#22c55e] hover:bg-[#22c55e]/90 px-8 py-3 text-white font-heading font-semibold shadow-lg transition-colors"
            >
              Take the Platform Quiz
            </Link>
          </div>

          {/* Money-Saving Tips */}
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-[#1e1541] mb-6">
              7 Ways to Minimize Platform Fees
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <span className="text-[#ef2b70] font-bold text-3xl mr-4">1</span>
                <div>
                  <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-2">Build Long-Term Client Relationships</h3>
                  <p className="text-gray-700">On sliding-scale platforms like Upwork, fees drop from 20% to 5% after $10,000 in billings with a single client. Focus on repeat work.</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-[#ef2b70] font-bold text-3xl mr-4">2</span>
                <div>
                  <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-2">Choose the Right Withdrawal Method</h3>
                  <p className="text-gray-700">ACH/bank transfer is usually cheapest. Wire transfers can cost $30+. Compare all options in your platform settings.</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-[#ef2b70] font-bold text-3xl mr-4">3</span>
                <div>
                  <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-2">Batch Withdrawals</h3>
                  <p className="text-gray-700">If withdrawal fees are flat-rate, withdraw larger amounts less frequently to minimize per-transaction costs.</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-[#ef2b70] font-bold text-3xl mr-4">4</span>
                <div>
                  <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-2">Negotiate Direct Contracts</h3>
                  <p className="text-gray-700">After establishing trust, some platforms allow direct contracts outside the platform (check terms first - some prohibit this).</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-[#ef2b70] font-bold text-3xl mr-4">5</span>
                <div>
                  <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-2">Use Zero-Fee Platforms for Existing Clients</h3>
                  <p className="text-gray-700">Platforms like Contra (0% commission) are perfect for working with clients you found elsewhere. Learn more about <Link href={`/${locale}/gids/platform-selectie/switching-platforms-guide`} className="text-[#ef2b70] hover:underline font-semibold">switching platforms</Link>.</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-[#ef2b70] font-bold text-3xl mr-4">6</span>
                <div>
                  <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-2">Factor Fees into Your Rates</h3>
                  <p className="text-gray-700">If platform takes 20%, charge 25% higher rates. Don&apos;t absorb the cost - pass it to clients through strategic pricing.</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-[#ef2b70] font-bold text-3xl mr-4">7</span>
                <div>
                  <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-2">Complete Tax Forms</h3>
                  <p className="text-gray-700">International freelancers: Submit W-8BEN forms to avoid 30% US tax withholding on platforms like Upwork.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Final Comparison Summary */}
          <div className="bg-[#1e1541] text-white rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-heading font-bold mb-6">Quick Summary: Best Platforms by Fee Structure</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-heading font-bold text-[#ef2b70] mb-2">Lowest Fees</h3>
                <p className="text-white/90"><strong>Contra (0% commission)</strong>, Braintrust (0-10%), Toptal (margin included in rates)</p>
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-[#ef2b70] mb-2">Best for Long-Term Clients</h3>
                <p className="text-white/90"><strong>Upwork</strong> (drops to 5% after $10K), Guru (5-9% tiers)</p>
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-[#ef2b70] mb-2">Predictable Flat Rates</h3>
                <p className="text-white/90"><strong>Fiverr (20% flat)</strong>, FlexJobs ($14.95/month flat)</p>
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-[#ef2b70] mb-2">Highest Fees (Avoid Unless Necessary)</h3>
                <p className="text-white/90"><strong>99designs (60%)</strong>, PeoplePerHour (20-24%)</p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-gradient-to-r from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">
              Ready to Compare All Platform Features?
            </h2>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              See complete platform comparisons including fees, payment options, client quality, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/platforms`}
                className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-3 text-[#ef2b70] font-heading font-semibold shadow-lg transition-colors"
              >
                Compare All Platforms
              </Link>
              <Link
                href={`/${locale}/gids/platform-selectie/remote-work-platforms-2026`}
                className="inline-block rounded-lg bg-[#1e1541] hover:bg-[#1e1541]/90 px-8 py-3 text-white font-heading font-semibold shadow-lg transition-colors"
              >
                Best Remote Platforms
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
