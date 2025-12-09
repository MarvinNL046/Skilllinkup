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

  const slug = 'invoicing-best-practices';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/gids/zakelijk-beheer/${slug}`;

  return {
    title: "Invoicing Best Practices 2026: Get Paid Faster as a Freelancer",
    description: "Master professional invoicing to get paid in 7 days instead of 45. Payment terms, late fees, invoice design, automation, and collections strategies that actually work.",
    keywords: "invoicing best practices, freelance payment terms, invoice template, get paid faster, invoice automation, late payment collection",
    openGraph: {
      title: "Invoicing Best Practices 2026: Get Paid Faster as a Freelancer",
      description: "Master professional invoicing to get paid in 7 days instead of 45. Payment terms, late fees, invoice design, automation, and collections strategies that actually work.",
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [
        {
          url: `${siteUrl}/images/og/gids-og.png`,
          width: 1200,
          height: 630,
          alt: 'Invoicing Best Practices Guide - SkillLinkup',
        }
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Invoicing Best Practices 2026: Get Paid Faster as a Freelancer",
      description: "Master professional invoicing to get paid in 7 days instead of 45. Payment terms, late fees, invoice design, automation, and collections strategies that actually work.",
      images: [`${siteUrl}/images/og/gids-og.png`],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function InvoicingPage({ params }: Props) {
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
                Invoicing Best Practices: Get Paid in 7 Days, Not 45
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Stop chasing late payments. Professional invoicing systems, payment terms that work, and proven collection strategies to accelerate your cash flow.
              </p>
              <Link
                href={`/${locale}/tools/invoice-generator`}
                className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Create Professional Invoice →
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">

          {/* Section 1: The Invoicing Problem */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              The $10,000 Invoicing Problem Most Freelancers Face
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-[#64607d] leading-relaxed mb-6">
                You do the work. Send the invoice. Wait. And wait. Then send awkward follow-up emails. By day 60, you're wondering if you'll ever get paid. Sound familiar? Poor invoicing habits cost freelancers an average of $10,000 annually in delayed payments, write-offs, and lost time.
              </p>

              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
                  Industry Payment Statistics (2026)
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-[#ef2b70] font-bold mr-3 text-xl">📊</span>
                    <span className="text-[#64607d]">
                      Average payment time: <strong className="text-[#1e1541]">42 days</strong> (should be 14-30)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ef2b70] font-bold mr-3 text-xl">💸</span>
                    <span className="text-[#64607d]">
                      <strong className="text-[#1e1541]">64%</strong> of freelancers have unpaid invoices over 90 days old
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ef2b70] font-bold mr-3 text-xl">⏰</span>
                    <span className="text-[#64607d]">
                      Freelancers spend <strong className="text-[#1e1541]">6-8 hours/month</strong> chasing payments
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ef2b70] font-bold mr-3 text-xl">❌</span>
                    <span className="text-[#64607d]">
                      <strong className="text-[#1e1541]">$9,200</strong> average annual write-offs from non-payment
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Essential Invoice Elements */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              12 Must-Have Elements of a Professional Invoice
            </h2>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">Basic Information:</h3>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• <strong>Invoice Number</strong> (sequential: INV-2026-001)</li>
                    <li>• <strong>Invoice Date</strong> (date sent)</li>
                    <li>• <strong>Due Date</strong> (clear payment deadline)</li>
                    <li>• <strong>Your Business Name & Address</strong></li>
                    <li>• <strong>Client Name & Billing Address</strong></li>
                    <li>• <strong>Tax ID / VAT Number</strong> (if applicable)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">Work Details:</h3>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• <strong>Line Items</strong> (description + quantity + rate)</li>
                    <li>• <strong>Subtotal</strong> (before taxes)</li>
                    <li>• <strong>Tax Amount</strong> (VAT/GST breakdown)</li>
                    <li>• <strong>Total Amount Due</strong> (bold, large font)</li>
                    <li>• <strong>Payment Methods Accepted</strong></li>
                    <li>• <strong>Late Payment Terms</strong> (interest rate)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white mb-8">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Create Perfect Invoices in 2 Minutes
              </h3>
              <p className="text-xl mb-6 text-white/90">
                Free invoice generator with all required fields, professional design, and instant PDF export
              </p>
              <Link
                href={`/${locale}/tools/invoice-generator`}
                className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Create Invoice Now →
              </Link>
            </div>
          </section>

          {/* Section 3: Payment Terms That Work */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              Payment Terms That Actually Get You Paid
            </h2>

            <div className="bg-white rounded-lg shadow-lg overflow-x-auto mb-8">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#1e1541] text-white">
                    <th className="px-6 py-4 text-left font-heading font-semibold">Payment Term</th>
                    <th className="px-6 py-4 text-left font-heading font-semibold">When to Use</th>
                    <th className="px-6 py-4 text-left font-heading font-semibold">Average Payment Time</th>
                    <th className="px-6 py-4 text-left font-heading font-semibold">Risk Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-[#1e1541]">100% Upfront</td>
                    <td className="px-6 py-4 text-[#64607d]">New clients, small projects (&lt;$500)</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">0 days (before work)</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">✅ Zero risk</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-green-50">
                    <td className="px-6 py-4 font-semibold text-[#1e1541]">50% Deposit + 50% On Delivery</td>
                    <td className="px-6 py-4 text-[#64607d]">Most projects ($500-$10k)</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">7-14 days</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">✅ Low risk</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-[#1e1541]">Net 15</td>
                    <td className="px-6 py-4 text-[#64607d]">Trusted clients, recurring work</td>
                    <td className="px-6 py-4 text-[#64607d]">18-25 days</td>
                    <td className="px-6 py-4 text-orange-600 font-semibold">⚠️ Moderate</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-[#1e1541]">Net 30</td>
                    <td className="px-6 py-4 text-[#64607d]">Corporate clients (required)</td>
                    <td className="px-6 py-4 text-orange-600">35-50 days</td>
                    <td className="px-6 py-4 text-orange-600 font-semibold">⚠️ Moderate</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-[#1e1541]">Net 60/90</td>
                    <td className="px-6 py-4 text-[#64607d]">Large enterprises only</td>
                    <td className="px-6 py-4 text-red-600">60-120 days</td>
                    <td className="px-6 py-4 text-red-600 font-semibold">❌ High risk</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-[#1e1541]">Monthly Retainer (1st of month)</td>
                    <td className="px-6 py-4 text-[#64607d]">Ongoing client relationships</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">1-7 days</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">✅ Low risk</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
                Recommended Payment Term Structure
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-[#ef2b70] pl-4">
                  <h4 className="font-semibold text-[#1e1541] mb-2">For Projects Under $1,000:</h4>
                  <p className="text-[#64607d]">
                    <strong>100% upfront</strong> or <strong>50% deposit, 50% before final delivery</strong>. Never deliver final files before payment.
                  </p>
                </div>

                <div className="border-l-4 border-[#ef2b70] pl-4">
                  <h4 className="font-semibold text-[#1e1541] mb-2">For Projects $1,000-$10,000:</h4>
                  <p className="text-[#64607d]">
                    <strong>50% deposit to start</strong>, 25% at midpoint milestone, <strong>25% on completion (Net 7)</strong>. Milestones protect both parties.
                  </p>
                </div>

                <div className="border-l-4 border-[#ef2b70] pl-4">
                  <h4 className="font-semibold text-[#1e1541] mb-2">For Recurring Clients:</h4>
                  <p className="text-[#64607d]">
                    <strong>Monthly retainer billed on the 1st, due by the 15th</strong>. Auto-charge via Stripe or PayPal recurring billing for zero hassle.
                  </p>
                </div>

                <div className="border-l-4 border-[#ef2b70] pl-4">
                  <h4 className="font-semibold text-[#1e1541] mb-2">For Large Enterprises:</h4>
                  <p className="text-[#64607d]">
                    Accept <strong>Net 30</strong> (their requirement) but add a <strong>2% early payment discount for Net 10</strong>. Incentivizes faster payment.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Late Payment Strategy */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              How to Handle Late Payments (Without Damaging Relationships)
            </h2>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
                The 5-Step Late Payment Follow-Up System
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#ef2b70] text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg mr-4 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-[#1e1541] mb-1">Day 0 (Due Date): Friendly Reminder</h4>
                    <p className="text-[#64607d] text-sm mb-2">
                      "Hi [Name], just a heads up that invoice #123 for $X is due today. Let me know if you have any questions!"
                    </p>
                    <p className="text-xs text-[#64607d] italic">Tone: Helpful, assumes they just forgot</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#ef2b70] text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg mr-4 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-[#1e1541] mb-1">Day 7: Second Reminder with Payment Link</h4>
                    <p className="text-[#64607d] text-sm mb-2">
                      "Hi [Name], following up on invoice #123 for $X (now 7 days overdue). Here's a quick payment link: [link]. Can you let me know when I can expect payment?"
                    </p>
                    <p className="text-xs text-[#64607d] italic">Tone: Professional, still friendly, includes action item</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#ef2b70] text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg mr-4 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-[#1e1541] mb-1">Day 14: Phone Call + Email</h4>
                    <p className="text-[#64607d] text-sm mb-2">
                      Call them directly. If no answer, leave voicemail + send email: "Hi [Name], I left you a voicemail regarding the overdue invoice #123 ($X). Is there an issue preventing payment? Happy to work out a payment plan if needed."
                    </p>
                    <p className="text-xs text-[#64607d] italic">Tone: Direct but solution-oriented</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#ef2b70] text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg mr-4 flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold text-[#1e1541] mb-1">Day 30: Final Notice with Late Fee</h4>
                    <p className="text-[#64607d] text-sm mb-2">
                      "This is a final notice for invoice #123 ($X + $50 late fee as per our terms). Payment is now 30 days overdue. If not received by [date], I'll be forced to escalate to collections."
                    </p>
                    <p className="text-xs text-[#64607d] italic">Tone: Firm, mentions consequences</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#ef2b70] text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg mr-4 flex-shrink-0">5</div>
                  <div>
                    <h4 className="font-semibold text-[#1e1541] mb-1">Day 45+: Collections or Small Claims Court</h4>
                    <p className="text-[#64607d] text-sm mb-2">
                      Report to collections agency (they take 25-40% of recovered amount) or file in small claims court ($30-$100 fee, no lawyer needed for claims &lt;$5,000-$10,000 depending on state).
                    </p>
                    <p className="text-xs text-[#64607d] italic">Tone: Legal action, relationship is over</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
                Late Fee Best Practices
              </h3>
              <ul className="space-y-3 text-[#64607d]">
                <li className="flex items-start">
                  <span className="text-[#22c55e] mr-2">✓</span>
                  <span><strong>State late fees in your contract and on every invoice</strong> (e.g., "1.5% per month on overdue balance" or "$50 flat fee after 30 days")</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#22c55e] mr-2">✓</span>
                  <span>Most states allow 1.5% monthly interest (18% APR) or up to state usury limit</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#22c55e] mr-2">✓</span>
                  <span>Actually charge the late fee (87% of freelancers don't, which trains clients to pay late)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#22c55e] mr-2">✓</span>
                  <span>Can waive once for good clients, but make it clear: "Waiving the $50 late fee this time as a courtesy..."</span>
                </li>
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-16">
            <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Track Time for Accurate Invoicing
              </h3>
              <p className="text-xl mb-6 text-gray-300">
                Know exactly what to bill with automatic time tracking
              </p>
              <Link
                href={`/${locale}/tools/time-tracker`}
                className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Start Time Tracker →
              </Link>
            </div>
          </section>

          {/* Section 5: Automation */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              Invoice Automation: Save 5 Hours Per Month
            </h2>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
                Top Invoicing Tools for Freelancers (2026)
              </h3>

              <div className="space-y-4">
                <div className="border-l-4 border-[#ef2b70] pl-4">
                  <h4 className="font-semibold text-[#1e1541] mb-1">Free: SkillLinkup Invoice Generator</h4>
                  <p className="text-[#64607d] text-sm">
                    No signup required, instant PDF download, professional templates, supports multi-currency
                  </p>
                </div>

                <div className="border-l-4 border-gray-300 pl-4">
                  <h4 className="font-semibold text-[#1e1541] mb-1">Wave (Free)</h4>
                  <p className="text-[#64607d] text-sm">
                    Full accounting suite, unlimited invoices, payment processing (2.9% + $0.30 fee)
                  </p>
                </div>

                <div className="border-l-4 border-gray-300 pl-4">
                  <h4 className="font-semibold text-[#1e1541] mb-1">FreshBooks ($17/month)</h4>
                  <p className="text-[#64607d] text-sm">
                    Automatic payment reminders, expense tracking, time tracking, recurring invoices
                  </p>
                </div>

                <div className="border-l-4 border-gray-300 pl-4">
                  <h4 className="font-semibold text-[#1e1541] mb-1">QuickBooks Self-Employed ($20/month)</h4>
                  <p className="text-[#64607d] text-sm">
                    Invoicing + mileage tracking + quarterly tax estimates, integrates with TurboTax
                  </p>
                </div>

                <div className="border-l-4 border-gray-300 pl-4">
                  <h4 className="font-semibold text-[#1e1541] mb-1">Stripe Invoicing (2.9% + $0.30 per transaction)</h4>
                  <p className="text-[#64607d] text-sm">
                    One-click payment link, automatic reminders, recurring billing, integrates with 100+ tools
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <p className="text-[#1e1541] font-semibold mb-2">
                💡 Automation ROI: Get Paid 2x Faster
              </p>
              <p className="text-[#64607d]">
                Freelancers using automated invoicing get paid in 18 days on average vs. 42 days for manual invoices. Automatic reminders increase on-time payment rates from 35% to 72%.
              </p>
            </div>
          </section>

          {/* Section 6: Next Steps */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              Your Invoicing Improvement Action Plan
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
                <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                    Create Your Invoice Template Today
                  </h3>
                  <p className="text-[#64607d] mb-3">
                    Use a professional template with all 12 required elements. Include clear payment terms and late fees.
                  </p>
                  <Link
                    href={`/${locale}/tools/invoice-generator`}
                    className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
                  >
                    Create Template Now →
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
                <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                    Update Your Contracts with Better Payment Terms
                  </h3>
                  <p className="text-[#64607d]">
                    Add 50% deposit requirement, Net 15 payment terms, and 1.5% monthly late fees to all new contracts.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
                <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                    Set Up Automatic Time Tracking
                  </h3>
                  <p className="text-[#64607d] mb-3">
                    Track billable hours accurately to create precise invoices and avoid leaving money on the table.
                  </p>
                  <Link
                    href={`/${locale}/tools/time-tracker`}
                    className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
                  >
                    Start Tracking Time →
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
                <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                    Plan for Taxes and Retirement
                  </h3>
                  <p className="text-[#64607d] mb-3">
                    Getting paid faster means planning for taxes quarterly and setting aside retirement savings.
                  </p>
                  <Link
                    href={`/${locale}/gids/zakelijk-beheer/freelance-retirement-planning`}
                    className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
                  >
                    Learn Retirement Planning →
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Master Freelance Financial Management
              </h3>
              <p className="text-xl mb-6 text-white/90">
                Get our complete invoicing templates, payment scripts, and cash flow strategies
              </p>
              <Link
                href={`/${locale}/newsletter`}
                className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Download Free Invoicing Kit →
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
              "headline": "Invoicing Best Practices 2026: Get Paid Faster as a Freelancer",
              "description": "Master professional invoicing to get paid in 7 days instead of 45. Payment terms, late fees, invoice design, automation, and collections strategies that actually work.",
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
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/zakelijk-beheer/invoicing-best-practices`
              }
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to Create Professional Freelance Invoices",
              "description": "Step-by-step guide to professional invoicing",
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Include All Required Elements",
                  "text": "Add invoice number, dates, business details, client info, line items, and payment terms"
                },
                {
                  "@type": "HowToStep",
                  "name": "Set Clear Payment Terms",
                  "text": "Specify due date, accepted payment methods, and late fee policy"
                },
                {
                  "@type": "HowToStep",
                  "name": "Send Immediately After Work Completion",
                  "text": "Invoice same day or next business day to maximize payment speed"
                },
                {
                  "@type": "HowToStep",
                  "name": "Follow Up Systematically",
                  "text": "Use automated reminders on days 0, 7, 14, and 30"
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
                  "name": "Guide",
                  "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Business Management",
                  "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/zakelijk-beheer`
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Invoicing Best Practices",
                  "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/zakelijk-beheer/invoicing-best-practices`
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
