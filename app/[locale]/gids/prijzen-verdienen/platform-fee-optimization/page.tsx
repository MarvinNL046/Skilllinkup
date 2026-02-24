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

 const slug = 'platform-fee-optimization';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/prijzen-verdienen/${slug}`;

 return {
 title: "Minimize Platform Fees and Maximize Take-Home Pay: 2026 Strategy Guide",
 description: "Platform fees range from 0% to 20%. Learn how to minimize fees, negotiate better rates, and keep more of what you earn. Save $5K-$20K annually with these proven strategies.",
 keywords: "platform fees, upwork fees, fiverr commission, freelance platform costs, reduce platform fees, maximize freelance income",
 openGraph: {
 title: "Minimize Platform Fees and Maximize Take-Home Pay: 2026 Strategy Guide",
 description: "Platform fees range from 0% to 20%. Learn how to minimize fees, negotiate better rates, and keep more of what you earn. Save $5K-$20K annually with these proven strategies.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Platform Fee Optimization Guide - SkillLinkup',
 }
 ],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "Minimize Platform Fees and Maximize Take-Home Pay: 2026 Strategy Guide",
 description: "Platform fees range from 0% to 20%. Learn how to minimize fees, negotiate better rates, and keep more of what you earn. Save $5K-$20K annually with these proven strategies.",
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 },
 };
}

export default async function PlatformFeeOptimizationPage({ params }: Props) {
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
 Stop Losing 20% to Platform Fees
 </h1>
 <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
 Platform fees eat $8,000-$20,000 of your annual income. Here's how to minimize them and keep more of what you earn.
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Compare Platform Fees →
 </Link>
 </div>
 </div>
 </section>

 {/* Main Content */}
 <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">

 {/* Section 1: The True Cost of Platform Fees */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 The $20,000 Annual Tax You're Paying
 </h2>

 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 You think you're charging $100/hour. But after platform fees, you're actually earning $80-$95/hour. Over a year, <strong className="text-[#1e1541]">this "convenience fee" costs you $8,000-$20,000</strong>.
 </p>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
 Annual Platform Fee Calculator
 </h3>

 <div className="space-y-6">
 <div>
 <h4 className="font-semibold text-[#1e1541] mb-3">Scenario: $80,000 Annual Revenue</h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse">
 <thead>
 <tr className="bg-[#f8f9fb]">
 <th className="text-left p-3 font-semibold text-[#1e1541]">Platform</th>
 <th className="text-center p-3 font-semibold text-[#1e1541]">Fee %</th>
 <th className="text-right p-3 font-semibold text-[#1e1541]">Annual Cost</th>
 <th className="text-right p-3 font-semibold text-[#1e1541]">Take-Home</th>
 </tr>
 </thead>
 <tbody className="text-sm">
 <tr className="border-b border-gray-100">
 <td className="p-3 text-[#64607d]">Direct Client (No Platform)</td>
 <td className="text-center p-3 font-semibold text-green-600">0%</td>
 <td className="text-right p-3 font-semibold text-green-600">$0</td>
 <td className="text-right p-3 font-semibold text-green-600">$80,000</td>
 </tr>
 <tr className="border-b border-gray-100">
 <td className="p-3 text-[#64607d]">Toptal</td>
 <td className="text-center p-3 font-semibold text-green-600">0%</td>
 <td className="text-right p-3 font-semibold text-green-600">$0</td>
 <td className="text-right p-3 font-semibold text-green-600">$80,000</td>
 </tr>
 <tr className="border-b border-gray-100">
 <td className="p-3 text-[#64607d]">Upwork (3+ clients, $10K+ lifetime)</td>
 <td className="text-center p-3 font-semibold text-[#1e1541]">5%</td>
 <td className="text-right p-3 font-semibold text-orange-600">$4,000</td>
 <td className="text-right p-3 font-semibold text-[#1e1541]">$76,000</td>
 </tr>
 <tr className="border-b border-gray-100">
 <td className="p-3 text-[#64607d]">Upwork (New clients, $0-$500)</td>
 <td className="text-center p-3 font-semibold text-orange-600">20%</td>
 <td className="text-right p-3 font-semibold text-red-600">$16,000</td>
 <td className="text-right p-3 font-semibold text-[#1e1541]">$64,000</td>
 </tr>
 <tr className="border-b border-gray-100">
 <td className="p-3 text-[#64607d]">Fiverr</td>
 <td className="text-center p-3 font-semibold text-red-600">20%</td>
 <td className="text-right p-3 font-semibold text-red-600">$16,000</td>
 <td className="text-right p-3 font-semibold text-[#1e1541]">$64,000</td>
 </tr>
 <tr className="border-b border-gray-100">
 <td className="p-3 text-[#64607d]">99designs</td>
 <td className="text-center p-3 font-semibold text-red-600">10-40%</td>
 <td className="text-right p-3 font-semibold text-red-600">$8K-$32K</td>
 <td className="text-right p-3 font-semibold text-[#1e1541]">$48K-$72K</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>
 </div>

 <div className="mt-6 bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg">
 <p className="text-[#1e1541] font-semibold mb-2">
 The Opportunity Cost
 </p>
 <p className="text-[#64607d]">
 Over 5 years at 20% fees: <strong className="text-[#ef2b70]">$80,000 lost</strong>. That's a down payment on a house, retirement savings, or a year of living expenses.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* Section 2: Platform Fee Structures Explained */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Understanding Platform Fee Structures
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-center mb-6">
 <div className="bg-orange-500 rounded-lg p-4 mr-4">
 
 </div>
 <div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
 Upwork: Sliding Scale Fees
 </h3>
 <p className="text-[#64607d]">The more you earn per client, the less you pay</p>
 </div>
 </div>

 <div className="space-y-4">
 <div className="border-l-4 border-red-500 pl-4">
 <p className="font-semibold text-red-600 mb-1">20% on first $500 per client</p>
 <p className="text-sm text-[#64607d]">Starting rate for all new clients</p>
 </div>
 <div className="border-l-4 border-orange-500 pl-4">
 <p className="font-semibold text-orange-600 mb-1">10% on $500.01-$10,000 per client</p>
 <p className="text-sm text-[#64607d]">Medium-term relationship discount</p>
 </div>
 <div className="border-l-4 border-green-500 pl-4">
 <p className="font-semibold text-green-600 mb-1">5% on $10,000+ per client (lifetime)</p>
 <p className="text-sm text-[#64607d]">Long-term client loyalty rate</p>
 </div>
 </div>

 <div className="mt-6 bg-[#f8f9fb] rounded-lg p-4">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Strategy:</strong>Focus on high-value, long-term clients to reach the 5% tier faster. A $15K project pays $750 in fees instead of $3,000.
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-center mb-6">
 <div className="bg-red-500 rounded-lg p-4 mr-4">
 
 </div>
 <div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
 Fiverr: Flat 20% Fee
 </h3>
 <p className="text-[#64607d]">No negotiations, no discounts</p>
 </div>
 </div>

 <p className="text-[#64607d] mb-4">
 Fiverr charges a non-negotiable 20% commission on all earnings, regardless of order size or seller level. A $1,000 project nets you $800.
 </p>

 <div className="bg-red-50 border border-red-200 rounded-lg p-4">
 <p className="text-sm text-red-800">
 <strong>Warning:</strong>Additional fees apply for withdrawals, currency conversions, and expedited payouts. Effective cost can reach 22-25%.
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-center mb-6">
 <div className="bg-green-500 rounded-lg p-4 mr-4">
 
 </div>
 <div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
 Toptal: 0% Fee (But High Barrier)
 </h3>
 <p className="text-[#64607d]">You keep 100%, but acceptance rate is &lt;3%</p>
 </div>
 </div>

 <p className="text-[#64607d] mb-4">
 Toptal doesn't charge freelancers fees. They charge clients markup (typically 50-100%). But getting accepted requires:
 </p>

 <ul className="space-y-2 text-sm text-[#64607d] mb-4">
 <li>• 5+ years professional experience</li>
 <li>• Rigorous 5-step screening process</li>
 <li>• Live coding tests and interviews</li>
 <li>• Portfolio review and reference checks</li>
 </ul>

 <div className="bg-green-50 border border-green-200 rounded-lg p-4">
 <p className="text-sm text-green-800">
 <strong>Benefit:</strong>If accepted, you keep 100% of negotiated rate. Worth the effort if you qualify.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* CTA Section 1 */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Compare 20+ Freelance Platforms
 </h3>
 <p className="text-xl mb-6 text-white/90">
 See fees, features, and payment terms side-by-side
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 View Full Comparison →
 </Link>
 </div>
 </section>

 {/* Section 3: 10 Strategies to Minimize Platform Fees */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 10 Proven Strategies to Minimize Platform Fees
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#22c55e]">
 <div className="flex items-start">
 <div className="bg-[#22c55e] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 1
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Raise Rates to Offset Fees
 </h3>
 <p className="text-[#64607d] mb-3">
 If a platform charges 20%, increase your rate by 25%. This makes your take-home equivalent to your target rate.
 </p>
 <div className="bg-[#f8f9fb] rounded p-4 text-sm">
 <p className="text-[#64607d]">
 <strong>Example:</strong>Target $100/hr → Charge $125/hr on platform → After 20% fee = $100/hr take-home
 </p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#22c55e]">
 <div className="flex items-start">
 <div className="bg-[#22c55e] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 2
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Focus on Long-Term Clients (Upwork)
 </h3>
 <p className="text-[#64607d] mb-3">
 On Upwork, push clients past the $10K lifetime threshold as quickly as possible to unlock 5% fees.
 </p>
 <div className="bg-[#f8f9fb] rounded p-4 text-sm">
 <p className="text-[#64607d] mb-2">
 <strong>Tactics:</strong>
 </p>
 <ul className="space-y-1 text-[#64607d]">
 <li>• Propose monthly retainers instead of one-off projects</li>
 <li>• Bundle multiple small projects into one large contract</li>
 <li>• Offer volume discounts for $10K+ commitments</li>
 </ul>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#22c55e]">
 <div className="flex items-start">
 <div className="bg-[#22c55e] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 3
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Use Multiple Platforms Strategically
 </h3>
 <p className="text-[#64607d] mb-3">
 Don't rely on one platform. Diversify to leverage each platform's strengths:
 </p>
 <div className="bg-[#f8f9fb] rounded p-4 text-sm">
 <ul className="space-y-2 text-[#64607d]">
 <li>• <strong>Upwork:</strong>Long-term clients (5% fees)</li>
 <li>• <strong>Toptal:</strong>High-paying enterprise clients (0% fees)</li>
 <li>• <strong>Direct:</strong>Referrals and repeat business (0% fees)</li>
 <li>• <strong>Fiverr:</strong>Only for quick gigs where 20% is acceptable</li>
 </ul>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#22c55e]">
 <div className="flex items-start">
 <div className="bg-[#22c55e] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 4
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Transition Clients Off-Platform (Carefully)
 </h3>
 <p className="text-[#64607d] mb-3">
 Many platforms prohibit direct contact outside their system. But some allow it after initial engagement:
 </p>
 <div className="bg-orange-50 border border-orange-200 rounded p-4 text-sm mb-3">
 <p className="text-orange-800">
 <strong>Warning:</strong>Read ToS carefully. Upwork bans circumvention. Fiverr penalizes off-platform communication. Violating rules can result in permanent account suspension.
 </p>
 </div>
 <div className="bg-[#f8f9fb] rounded p-4 text-sm">
 <p className="text-[#64607d]">
 <strong>Safe approach:</strong>After 1-2 years on platform, propose transitioning to direct billing "to reduce costs for both of us." Some clients appreciate this.
 </p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#22c55e]">
 <div className="flex items-start">
 <div className="bg-[#22c55e] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 5
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Apply for Toptal or Gun.io
 </h3>
 <p className="text-[#64607d] mb-3">
 If you have 5+ years experience, apply to vetted platforms with 0% freelancer fees. Yes, acceptance is tough, but worth it.
 </p>
 <div className="bg-[#f8f9fb] rounded p-4 text-sm">
 <p className="text-[#64607d] mb-2">
 <strong>Preparation tips:</strong>
 </p>
 <ul className="space-y-1 text-[#64607d]">
 <li>• Polish your portfolio with 5-10 best projects</li>
 <li>• Practice live coding if you're a developer</li>
 <li>• Prepare to explain your problem-solving process</li>
 <li>• Have references ready from past clients</li>
 </ul>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#22c55e]">
 <div className="flex items-start">
 <div className="bg-[#22c55e] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 6
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Build Your Own Client Pipeline
 </h3>
 <p className="text-[#64607d] mb-3">
 The ultimate fee reduction: 0%. Invest time in:
 </p>
 <div className="bg-[#f8f9fb] rounded p-4 text-sm">
 <ul className="space-y-2 text-[#64607d]">
 <li>• <strong>LinkedIn outreach:</strong>Connect with 10 ideal clients/week</li>
 <li>• <strong>Content marketing:</strong>Publish weekly insights in your niche</li>
 <li>• <strong>Referral program:</strong>Offer 10% kickback for client introductions</li>
 <li>• <strong>Cold email:</strong>20 personalized pitches/week to target companies</li>
 </ul>
 <p className="text-[#64607d] mt-3">
 <strong>Timeline:</strong>Expect 3-6 months before consistent direct leads. But once flowing, you keep 100%.
 </p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#22c55e]">
 <div className="flex items-start">
 <div className="bg-[#22c55e] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 7
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Bundle Services to Increase Project Value
 </h3>
 <p className="text-[#64607d] mb-3">
 On sliding-scale platforms like Upwork, larger projects mean lower effective fees.
 </p>
 <div className="bg-[#f8f9fb] rounded p-4 text-sm">
 <p className="text-[#64607d] mb-2">
 <strong>Example:</strong>Instead of "Logo design: $500", offer "Complete Brand Package: Logo + Business Cards + Social Templates = $2,500"
 </p>
 <p className="text-[#64607d]">
 This pushes you into the 10% tier faster and positions you as full-service provider.
 </p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#22c55e]">
 <div className="flex items-start">
 <div className="bg-[#22c55e] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 8
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Negotiate Platform Discounts (Enterprise)
 </h3>
 <p className="text-[#64607d] mb-3">
 If you're billing $100K+/year through a platform, contact their enterprise sales team. Some negotiate custom fee structures for high-volume freelancers.
 </p>
 <div className="bg-[#f8f9fb] rounded p-4 text-sm">
 <p className="text-[#64607d]">
 <strong>Leverage:</strong>"I'm projected to bill $150K this year. At 10% fees, that's $15K. Is there an enterprise rate for high-volume freelancers?"
 </p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#22c55e]">
 <div className="flex items-start">
 <div className="bg-[#22c55e] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 9
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Use Wise/Payoneer for International Payments
 </h3>
 <p className="text-[#64607d] mb-3">
 Platform withdrawal fees and currency conversion add another 2-5% cost. Use services optimized for international freelancers:
 </p>
 <div className="bg-[#f8f9fb] rounded p-4 text-sm">
 <ul className="space-y-2 text-[#64607d]">
 <li>• <strong>Wise:</strong>Mid-market exchange rates, ~0.5% fee</li>
 <li>• <strong>Payoneer:</strong>Multi-currency accounts, direct withdrawals</li>
 <li>• <strong>Avoid:</strong>Platform's built-in wire transfers (often 3-5% markup)</li>
 </ul>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#22c55e]">
 <div className="flex items-start">
 <div className="bg-[#22c55e] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 10
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Track and Optimize Your Platform Mix Quarterly
 </h3>
 <p className="text-[#64607d] mb-3">
 Every 3 months, calculate effective fee rate across all income sources. Shift effort toward lowest-fee channels.
 </p>
 <div className="bg-[#f8f9fb] rounded p-4 text-sm">
 <p className="text-[#64607d] mb-2">
 <strong>Simple tracking spreadsheet:</strong>
 </p>
 <ul className="space-y-1 text-[#64607d] text-xs">
 <li>• Platform | Revenue | Fees Paid | Effective Rate %</li>
 <li>• Upwork | $20K | $1,200 | 6%</li>
 <li>• Direct | $15K | $0 | 0%</li>
 <li>• Fiverr | $5K | $1,000 | 20%</li>
 <li><strong>Total: $40K revenue, $2,200 fees (5.5% blended rate)</strong></li>
 </ul>
 <p className="text-[#64607d] mt-2">
 <strong>Action:</strong>Reduce Fiverr, grow Direct and Upwork long-term clients.
 </p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Section 4: Real Savings Calculation */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Real Example: $18,000 Annual Savings
 </h2>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
 Sarah's Fee Optimization Journey
 </h3>

 <div className="grid md:grid-cols-2 gap-8 mb-8">
 <div>
 <h4 className="font-heading font-semibold text-lg text-red-600 mb-4">
 ❌ Before Optimization (Year 1)
 </h4>
 <div className="space-y-3 text-sm">
 <div className="flex justify-between border-b border-gray-100 pb-2">
 <span className="text-[#64607d]">Fiverr revenue</span>
 <strong className="text-[#1e1541]">$40,000</strong>
 </div>
 <div className="flex justify-between border-b border-gray-100 pb-2">
 <span className="text-[#64607d]">Fiverr fees (20%)</span>
 <strong className="text-red-600">-$8,000</strong>
 </div>
 <div className="flex justify-between border-b border-gray-100 pb-2">
 <span className="text-[#64607d]">Upwork revenue (new clients)</span>
 <strong className="text-[#1e1541]">$30,000</strong>
 </div>
 <div className="flex justify-between border-b border-gray-100 pb-2">
 <span className="text-[#64607d]">Upwork fees (20%)</span>
 <strong className="text-red-600">-$6,000</strong>
 </div>
 <div className="flex justify-between border-b border-gray-100 pb-2">
 <span className="text-[#64607d]">Direct clients</span>
 <strong className="text-[#1e1541]">$10,000</strong>
 </div>
 <div className="flex justify-between border-b border-gray-100 pb-2">
 <span className="text-[#64607d]">Direct fees</span>
 <strong className="text-green-600">$0</strong>
 </div>
 <div className="flex justify-between pt-3 bg-red-50 p-3 rounded">
 <strong className="text-red-800">Total fees paid</strong>
 <strong className="text-red-800 text-lg">$14,000</strong>
 </div>
 <div className="flex justify-between bg-[#f8f9fb] p-3 rounded">
 <strong className="text-[#1e1541]">Take-home</strong>
 <strong className="text-[#1e1541] text-lg">$66,000</strong>
 </div>
 </div>
 </div>

 <div>
 <h4 className="font-heading font-semibold text-lg text-green-600 mb-4">
 ✅ After Optimization (Year 2)
 </h4>
 <div className="space-y-3 text-sm">
 <div className="flex justify-between border-b border-gray-100 pb-2">
 <span className="text-[#64607d]">Fiverr revenue (reduced)</span>
 <strong className="text-[#1e1541]">$10,000</strong>
 </div>
 <div className="flex justify-between border-b border-gray-100 pb-2">
 <span className="text-[#64607d]">Fiverr fees (20%)</span>
 <strong className="text-orange-600">-$2,000</strong>
 </div>
 <div className="flex justify-between border-b border-gray-100 pb-2">
 <span className="text-[#64607d]">Upwork revenue (long-term clients)</span>
 <strong className="text-[#1e1541]">$35,000</strong>
 </div>
 <div className="flex justify-between border-b border-gray-100 pb-2">
 <span className="text-[#64607d]">Upwork fees (5% tier)</span>
 <strong className="text-orange-600">-$1,750</strong>
 </div>
 <div className="flex justify-between border-b border-gray-100 pb-2">
 <span className="text-[#64607d]">Direct clients (grown)</span>
 <strong className="text-[#1e1541]">$35,000</strong>
 </div>
 <div className="flex justify-between border-b border-gray-100 pb-2">
 <span className="text-[#64607d]">Direct fees</span>
 <strong className="text-green-600">$0</strong>
 </div>
 <div className="flex justify-between pt-3 bg-green-50 p-3 rounded">
 <strong className="text-green-800">Total fees paid</strong>
 <strong className="text-green-800 text-lg">$3,750</strong>
 </div>
 <div className="flex justify-between bg-[#f8f9fb] p-3 rounded">
 <strong className="text-[#1e1541]">Take-home</strong>
 <strong className="text-[#1e1541] text-lg">$76,250</strong>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg p-6 text-white text-center">
 <p className="text-lg mb-2">Annual Savings</p>
 <p className="font-heading font-bold text-4xl mb-3">
 $10,250 <span className="text-xl">saved in fees</span>
 </p>
 <p className="text-white/90 text-sm">
 Plus $10,250 extra take-home from same revenue = <strong>$20,500 total benefit</strong>
 </p>
 </div>
 </div>

 <div className="bg-[#f8f9fb] border-l-4 border-[#ef2b70] p-6 rounded-r-lg">
 <p className="text-[#1e1541] font-semibold mb-2">
 What Sarah Did
 </p>
 <ul className="space-y-2 text-sm text-[#64607d]">
 <li>• Shifted 75% of Fiverr clients to direct or Upwork</li>
 <li>• Focused Upwork clients into long-term retainers (5% tier)</li>
 <li>• Built content marketing funnel generating 3-5 direct leads/month</li>
 <li>• Increased rates 20% to offset platform fees</li>
 </ul>
 </div>
 </section>

 {/* CTA Section 2 */}
 <section className="mb-16">
 <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Calculate How Much Fees Cost You
 </h3>
 <p className="text-xl mb-6 text-gray-300">
 Use our rate calculator to see your true take-home after platform fees
 </p>
 <Link
 href={`/${locale}/tools/rate-calculator`}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Calculate Net Income →
 </Link>
 </div>
 </section>

 {/* Section 5: Action Plan */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Your 90-Day Fee Reduction Plan
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-16 h-16 flex items-center justify-center text-lg mr-4 flex-shrink-0">
 Days<br/>1-30
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Audit & Baseline
 </h3>
 <p className="text-[#64607d] mb-3">
 Track every dollar earned and every fee paid. Calculate your current blended fee rate across all platforms.
 </p>
 <div className="bg-[#f8f9fb] rounded p-3 text-sm text-[#64607d]">
 <strong>Deliverable:</strong>Spreadsheet showing revenue by platform, fees paid, and effective fee percentages
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-16 h-16 flex items-center justify-center text-lg mr-4 flex-shrink-0">
 Days<br/>31-60
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Implement Quick Wins
 </h3>
 <p className="text-[#64607d] mb-3">
 Apply strategies #1, #2, #7 (raise rates, focus long-term clients, bundle services). These require no platform changes.
 </p>
 <div className="bg-[#f8f9fb] rounded p-3 text-sm text-[#64607d]">
 <strong>Goal:</strong>Reduce effective fee rate by 3-5% within 60 days
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-16 h-16 flex items-center justify-center text-lg mr-4 flex-shrink-0">
 Days<br/>61-90
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Build Direct Pipeline
 </h3>
 <p className="text-[#64607d] mb-3">
 Start outreach, content marketing, and referral program. Goal: 1-2 direct clients within 90 days.
 </p>
 <div className="bg-[#f8f9fb] rounded p-3 text-sm text-[#64607d]">
 <strong>Long-term vision:</strong>50%+ revenue from 0% fee sources within 12 months
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Final CTA */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Compare All Platform Fees Side-by-Side
 </h3>
 <p className="text-xl mb-6 text-white/90">
 See which platforms cost the least and offer the best value for your niche
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 View Full Platform Comparison →
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
 "headline": "Minimize Platform Fees and Maximize Take-Home Pay: 2026 Strategy Guide",
 "description": "Platform fees range from 0% to 20%. Learn how to minimize fees, negotiate better rates, and keep more of what you earn.",
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
 "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/prijzen-verdienen/platform-fee-optimization`
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
 "name": "Platform Fee Optimization",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/prijzen-verdienen/platform-fee-optimization`
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
