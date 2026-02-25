import Link from "next/link";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type Props = {
 params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'freelance-legal-structure';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/zakelijk-beheer/${slug}`;

 return {
 title: "LLC vs Sole Proprietorship vs Corporation: Best Legal Structure for Freelancers 2026",
 description: "Choose the right legal structure for your freelance business. Compare LLC, sole proprietorship, S-corp, and C-corp on taxes, liability, costs, and complexity with decision framework.",
 keywords: "freelance legal structure, LLC vs sole proprietor, S-corp for freelancers, business entity comparison, freelance incorporation, self-employment structure",
 openGraph: {
 title: "LLC vs Sole Proprietorship vs Corporation: Best Legal Structure for Freelancers 2026",
 description: "Choose the right legal structure for your freelance business. Compare LLC, sole proprietorship, S-corp, and C-corp on taxes, liability, costs, and complexity with decision framework.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Freelance Legal Structure Guide - SkillLinkup',
 }
 ],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "LLC vs Sole Proprietorship vs Corporation: Best Legal Structure for Freelancers 2026",
 description: "Choose the right legal structure for your freelance business. Compare LLC, sole proprietorship, S-corp, and C-corp on taxes, liability, costs, and complexity with decision framework.",
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 },
 };
}

export default async function LegalStructurePage({ params }: Props) {
 const { locale } = await params;

 return (
 <>
 

 <main className="min-h-screen bg-[#f8f9fb]">
 {/* Hero Section */}
 <section className="bg-gradient-to-br from-[#1e1541] via-[#2a1f5e] to-[#1e1541] text-white py-16">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
 LLC, Sole Proprietor, or Corporation? Choose the Right Legal Structure
 </h1>
 <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
 Your business structure affects taxes, liability, paperwork, and growth potential. Make the right choice from day one and save thousands in taxes and legal fees.
 </p>
 <Link
 href={`/${locale}/tools/rate-calculator`}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Calculate Your Ideal Rate →
 </Link>
 </div>
 </div>
 </section>

 {/* Main Content */}
 <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">

 {/* Section 1: Overview */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 4 Legal Structures for Freelancers: Quick Overview
 </h2>

 <div className="bg-white rounded-lg shadow-lg overflow-x-auto mb-8">
 <table className="w-full">
 <thead>
 <tr className="bg-[#1e1541] text-white">
 <th className="px-6 py-4 text-left font-heading font-semibold">Structure</th>
 <th className="px-6 py-4 text-left font-heading font-semibold">Setup Cost</th>
 <th className="px-6 py-4 text-left font-heading font-semibold">Liability Protection</th>
 <th className="px-6 py-4 text-left font-heading font-semibold">Tax Complexity</th>
 <th className="px-6 py-4 text-left font-heading font-semibold">Best For</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-200">
 <tr className="hover:bg-gray-50">
 <td className="px-6 py-4">
 <div className="font-semibold text-[#1e1541]">Sole Proprietorship</div>
 <div className="text-sm text-[#64607d]">(DBA, Self-Employed)</div>
 </td>
 <td className="px-6 py-4 text-[#64607d]">$0-$100</td>
 <td className="px-6 py-4">
 <span className="text-red-600 font-semibold">❌ None</span>
 </td>
 <td className="px-6 py-4">
 <span className="text-green-600 font-semibold">✅ Simple</span>
 </td>
 <td className="px-6 py-4 text-[#64607d]">Side hustlers, beginners, low-risk businesses</td>
 </tr>
 <tr className="hover:bg-gray-50 bg-green-50">
 <td className="px-6 py-4">
 <div className="font-semibold text-[#1e1541]">LLC</div>
 <div className="text-sm text-[#64607d]">(Limited Liability Company)</div>
 </td>
 <td className="px-6 py-4 text-[#64607d]">$50-$500</td>
 <td className="px-6 py-4">
 <span className="text-green-600 font-semibold">✅ Strong</span>
 </td>
 <td className="px-6 py-4">
 <span className="text-green-600 font-semibold">✅ Simple</span>
 </td>
 <td className="px-6 py-4">
 <strong className="text-[#1e1541]">Most freelancers</strong>
 <div className="text-sm text-[#64607d]">Full-time, client-facing work</div>
 </td>
 </tr>
 <tr className="hover:bg-gray-50">
 <td className="px-6 py-4">
 <div className="font-semibold text-[#1e1541]">S-Corporation</div>
 <div className="text-sm text-[#64607d]">(S-Corp, LLC taxed as S-Corp)</div>
 </td>
 <td className="px-6 py-4 text-[#64607d]">$500-$1,500</td>
 <td className="px-6 py-4">
 <span className="text-green-600 font-semibold">✅ Strong</span>
 </td>
 <td className="px-6 py-4">
 <span className="text-orange-600 font-semibold">Moderate</span>
 </td>
 <td className="px-6 py-4 text-[#64607d]">High earners ($80k+), payroll setup</td>
 </tr>
 <tr className="hover:bg-gray-50">
 <td className="px-6 py-4">
 <div className="font-semibold text-[#1e1541]">C-Corporation</div>
 <div className="text-sm text-[#64607d]">(C-Corp)</div>
 </td>
 <td className="px-6 py-4 text-[#64607d]">$1,000-$3,000</td>
 <td className="px-6 py-4">
 <span className="text-green-600 font-semibold">✅ Strongest</span>
 </td>
 <td className="px-6 py-4">
 <span className="text-red-600 font-semibold">❌ Complex</span>
 </td>
 <td className="px-6 py-4 text-[#64607d]">Raising capital, investors, tech startups</td>
 </tr>
 </tbody>
 </table>
 </div>

 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg">
 <p className="text-[#1e1541] font-semibold mb-2">
 The 80/20 Rule: Most Freelancers Choose LLC
 </p>
 <p className="text-[#64607d]">
 For 80% of freelancers earning $30k-$150k/year, an LLC offers the best balance of liability protection, tax simplicity, and professional credibility. Start here unless you have specific reasons to choose otherwise.
 </p>
 </div>
 </section>

 {/* Section 2: Sole Proprietorship */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Option 1: Sole Proprietorship (DBA)
 </h2>

 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 The simplest structure. You ARE your business. No separation between personal and business assets. File taxes on Schedule C with your personal tax return.
 </p>

 <div className="grid md:grid-cols-2 gap-6 mb-8">
 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="font-heading font-semibold text-xl text-green-600 mb-4">
 ✅ Advantages
 </h3>
 <ul className="space-y-2 text-[#64607d]">
 <li>• No formation costs or paperwork</li>
 <li>• Simplest tax filing (Schedule C)</li>
 <li>• Full control, no board meetings</li>
 <li>• All profits are yours (no payroll)</li>
 <li>• Easy to dissolve anytime</li>
 </ul>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="font-heading font-semibold text-xl text-red-600 mb-4">
 ❌ Disadvantages
 </h3>
 <ul className="space-y-2 text-[#64607d]">
 <li>• <strong>Unlimited personal liability</strong></li>
 <li>• Clients can sue your house, car, savings</li>
 <li>• Pay self-employment tax (15.3%) on all profits</li>
 <li>• Less professional credibility</li>
 <li>• Hard to raise capital or get business loans</li>
 </ul>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 When to Choose Sole Proprietorship
 </h3>
 <ul className="space-y-3 text-[#64607d]">
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>You're testing a side hustle (earning &lt;$10k/year)</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Your work has minimal liability risk (writing, consulting, coaching)</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>You have professional liability insurance ($1M+ coverage)</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>You plan to upgrade to LLC within 6-12 months</span>
 </li>
 </ul>
 </div>

 <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
 <p className="text-[#1e1541] font-semibold mb-2">
 Danger Zone: When NOT to Use Sole Proprietorship
 </p>
 <p className="text-[#64607d]">
 Avoid if: You work with physical products, handle client data, have employees, earn &gt;$30k/year, or face any lawsuit risk. One mistake could cost you your home.
 </p>
 </div>
 </div>
 </section>

 {/* CTA Section 1 */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Track Time Professionally with Any Structure
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Free time tracker for billable hours, perfect for sole props and LLCs
 </p>
 <Link
 href={`/${locale}/tools/time-tracker`}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Start Time Tracker →
 </Link>
 </div>
 </section>

 {/* Section 3: LLC */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Option 2: LLC (Limited Liability Company) Recommended
 </h2>

 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 The goldilocks option. Protects your personal assets from business liabilities while keeping taxes simple. Available in all 50 US states and most countries (called "BV" in Netherlands, "GmbH" in Germany, "Ltd" in UK).
 </p>

 <div className="grid md:grid-cols-2 gap-6 mb-8">
 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="font-heading font-semibold text-xl text-green-600 mb-4">
 ✅ Advantages
 </h3>
 <ul className="space-y-2 text-[#64607d]">
 <li>• <strong>Personal asset protection</strong></li>
 <li>• Simple "pass-through" taxation</li>
 <li>• Professional credibility with clients</li>
 <li>• Flexible management structure</li>
 <li>• Can elect S-Corp status later</li>
 <li>• Easier to get business credit cards</li>
 </ul>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="font-heading font-semibold text-xl text-red-600 mb-4">
 ❌ Disadvantages
 </h3>
 <ul className="space-y-2 text-[#64607d]">
 <li>• Formation cost: $50-$500 (varies by state)</li>
 <li>• Annual fees: $50-$800/year (state dependent)</li>
 <li>• Requires separate business bank account</li>
 <li>• Annual filing requirements</li>
 <li>• Still pay self-employment tax (15.3%)</li>
 </ul>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 LLC Formation Costs by State (2026)
 </h3>
 <div className="grid md:grid-cols-2 gap-4">
 <div>
 <h4 className="font-semibold text-[#1e1541] mb-2">Cheapest States:</h4>
 <ul className="text-[#64607d] space-y-1">
 <li>• Kentucky: <strong>$40</strong></li>
 <li>• Mississippi: <strong>$50</strong></li>
 <li>• New Mexico: <strong>$50</strong></li>
 <li>• Arkansas: <strong>$50</strong></li>
 <li>• Michigan: <strong>$50</strong></li>
 </ul>
 </div>
 <div>
 <h4 className="font-semibold text-[#1e1541] mb-2">Most Expensive States:</h4>
 <ul className="text-[#64607d] space-y-1">
 <li>• Massachusetts: <strong>$500</strong></li>
 <li>• Illinois: <strong>$500</strong></li>
 <li>• California: <strong>$70 + $800/year tax</strong></li>
 <li>• Delaware: <strong>$90 + $300/year</strong></li>
 <li>• Nevada: <strong>$425</strong></li>
 </ul>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 How to Form an LLC in 5 Steps
 </h3>
 <div className="space-y-4">
 <div className="flex items-start">
 <div className="bg-[#ef2b70] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3 flex-shrink-0">1</div>
 <div>
 <h4 className="font-semibold text-[#1e1541]">Choose a Business Name</h4>
 <p className="text-[#64607d] text-sm">Must include "LLC" and be unique in your state. Search your state's business registry to check availability.</p>
 </div>
 </div>
 <div className="flex items-start">
 <div className="bg-[#ef2b70] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3 flex-shrink-0">2</div>
 <div>
 <h4 className="font-semibold text-[#1e1541]">File Articles of Organization</h4>
 <p className="text-[#64607d] text-sm">Submit formation documents to your Secretary of State (online in most states). Pay $50-$500 filing fee.</p>
 </div>
 </div>
 <div className="flex items-start">
 <div className="bg-[#ef2b70] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3 flex-shrink-0">3</div>
 <div>
 <h4 className="font-semibold text-[#1e1541]">Get an EIN (Employer Identification Number)</h4>
 <p className="text-[#64607d] text-sm">Free from IRS.gov. Takes 5 minutes online. This is your business's social security number.</p>
 </div>
 </div>
 <div className="flex items-start">
 <div className="bg-[#ef2b70] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3 flex-shrink-0">4</div>
 <div>
 <h4 className="font-semibold text-[#1e1541]">Create an Operating Agreement</h4>
 <p className="text-[#64607d] text-sm">Internal rules for your LLC. Not filed with state but crucial for legal protection. Templates available free online.</p>
 </div>
 </div>
 <div className="flex items-start">
 <div className="bg-[#ef2b70] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3 flex-shrink-0">5</div>
 <div>
 <h4 className="font-semibold text-[#1e1541]">Open Business Bank Account</h4>
 <p className="text-[#64607d] text-sm">Legally required to keep business and personal finances separate. Bring EIN, Articles of Organization, and ID to bank.</p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
 <p className="text-[#1e1541] font-semibold mb-2">
 Pro Tip: Single-Member LLC Taxation
 </p>
 <p className="text-[#64607d]">
 As a one-person LLC, you're taxed as a sole proprietor by default (Schedule C). Same tax rate, but you get liability protection. Best of both worlds for most freelancers.
 </p>
 </div>
 </div>
 </section>

 {/* Section 4: S-Corp */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Option 3: S-Corporation (Tax Election)
 </h2>

 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Not a business structure, but a tax election. You form an LLC, then elect S-Corp status with the IRS. This allows you to split income between salary (subject to self-employment tax) and distributions (not subject to self-employment tax).
 </p>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 How S-Corp Tax Savings Work
 </h3>
 <div className="bg-gray-50 rounded-lg p-6 mb-4">
 <h4 className="font-semibold text-[#1e1541] mb-3">Example: $120,000 Annual Profit</h4>

 <div className="mb-6">
 <p className="font-semibold text-[#1e1541] mb-2">As LLC (Default):</p>
 <ul className="text-[#64607d] space-y-1 text-sm">
 <li>• $120,000 × 15.3% self-employment tax = <strong className="text-red-600">$18,360</strong></li>
 <li>• Plus income tax on full $120,000</li>
 </ul>
 </div>

 <div>
 <p className="font-semibold text-[#1e1541] mb-2">As S-Corp:</p>
 <ul className="text-[#64607d] space-y-1 text-sm">
 <li>• Salary: $60,000 × 15.3% = <strong>$9,180</strong>(self-employment tax)</li>
 <li>• Distribution: $60,000 × 0% = <strong>$0</strong>(no self-employment tax)</li>
 <li>• Total self-employment tax: <strong className="text-green-600">$9,180</strong></li>
 <li>• <strong className="text-[#22c55e]">Annual savings: $9,180</strong></li>
 </ul>
 </div>
 </div>

 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-4 rounded-r">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">IRS Rule:</strong>Your salary must be "reasonable" for your role and industry. Can't pay yourself $1 and take $119,999 as distributions. Typical split: 40-60% salary, 60-40% distributions.
 </p>
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-6 mb-8">
 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="font-heading font-semibold text-xl text-green-600 mb-4">
 ✅ Advantages
 </h3>
 <ul className="space-y-2 text-[#64607d]">
 <li>• Save 7-10% on self-employment taxes</li>
 <li>• Keep LLC liability protection</li>
 <li>• Better for high earners ($80k+)</li>
 <li>• More retirement contribution options</li>
 </ul>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="font-heading font-semibold text-xl text-red-600 mb-4">
 ❌ Disadvantages
 </h3>
 <ul className="space-y-2 text-[#64607d]">
 <li>• Must run payroll (cost: $500-$2,000/year)</li>
 <li>• Additional accounting complexity</li>
 <li>• Not worth it below $60-80k income</li>
 <li>• Requires quarterly payroll tax filings</li>
 </ul>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 When to Elect S-Corp Status
 </h3>
 <ul className="space-y-3 text-[#64607d]">
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>You earn $80,000+ annually as a freelancer</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Your income is stable (not wildly fluctuating month-to-month)</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>You can afford payroll service ($500-$2,000/year)</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Tax savings (7-10% of profit) exceed additional costs</span>
 </li>
 <li className="flex items-start">
 <span className="text-red-600] mr-2">✗</span>
 <span>Below $60k/year: stick with regular LLC (not worth the hassle)</span>
 </li>
 </ul>
 </div>
 </div>
 </section>

 {/* CTA Section 2 */}
 <section className="mb-16">
 <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Create Professional Invoices for Your Business
 </h3>
 <p className="text-xl mb-6 text-gray-300">
 Free invoice generator with business name, logo, and tax details
 </p>
 <Link
 href={`/${locale}/tools/invoice-generator`}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Create Invoice →
 </Link>
 </div>
 </section>

 {/* Section 5: C-Corp */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Option 4: C-Corporation (For Startups, Not Freelancers)
 </h2>

 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 The traditional corporation. A separate legal entity that pays its own taxes. Almost never the right choice for solo freelancers, but essential if you plan to raise venture capital.
 </p>

 <div className="grid md:grid-cols-2 gap-6 mb-8">
 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="font-heading font-semibold text-xl text-green-600 mb-4">
 ✅ Advantages
 </h3>
 <ul className="space-y-2 text-[#64607d]">
 <li>• Can raise venture capital</li>
 <li>• Unlimited shareholders</li>
 <li>• Stock options for employees</li>
 <li>• Strongest liability protection</li>
 <li>• Can go public (IPO)</li>
 </ul>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="font-heading font-semibold text-xl text-red-600 mb-4">
 ❌ Disadvantages
 </h3>
 <ul className="space-y-2 text-[#64607d]">
 <li>• <strong>Double taxation</strong>(corporate + personal)</li>
 <li>• Complex accounting requirements</li>
 <li>• Board meetings and corporate formalities</li>
 <li>• Expensive to maintain ($2,000-$5,000/year)</li>
 <li>• Not suitable for pass-through income</li>
 </ul>
 </div>
 </div>

 <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
 <p className="text-[#1e1541] font-semibold mb-2">
 Warning: C-Corp for Freelancers = Bad Idea
 </p>
 <p className="text-[#64607d]">
 Unless you're raising millions from VCs or planning to IPO, avoid C-Corps. Double taxation means paying 21% corporate tax + 20-37% personal tax on dividends. You'd pay taxes twice on the same money.
 </p>
 </div>
 </div>
 </section>

 {/* Section 6: Decision Framework */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Decision Framework: Choose Your Structure in 3 Questions
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 Question 1: How much do you earn annually?
 </h3>
 <ul className="space-y-3 text-[#64607d]">
 <li>• <strong className="text-[#1e1541]">$0-$10,000:</strong>Sole Proprietorship (simplest, test the waters)</li>
 <li>• <strong className="text-[#1e1541]">$10,000-$80,000:</strong>LLC (protection + simplicity)</li>
 <li>• <strong className="text-[#1e1541]">$80,000-$250,000:</strong>LLC taxed as S-Corp (tax savings)</li>
 <li>• <strong className="text-[#1e1541]">$250,000+:</strong>Consult CPA (might need C-Corp for specific strategies)</li>
 </ul>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 Question 2: What's your liability risk?
 </h3>
 <ul className="space-y-3 text-[#64607d]">
 <li>• <strong className="text-[#1e1541]">Low Risk</strong>(writing, design, consulting with insurance): Sole Prop or LLC</li>
 <li>• <strong className="text-[#1e1541]">Medium Risk</strong>(client-facing services, handling data): LLC required</li>
 <li>• <strong className="text-[#1e1541]">High Risk</strong>(physical products, events, heavy equipment): LLC or Corp</li>
 </ul>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 Question 3: Do you plan to raise capital or hire employees?
 </h3>
 <ul className="space-y-3 text-[#64607d]">
 <li>• <strong className="text-[#1e1541]">Solo forever:</strong>LLC (perfect for one person)</li>
 <li>• <strong className="text-[#1e1541]">Hiring contractors:</strong>LLC (no change needed)</li>
 <li>• <strong className="text-[#1e1541]">Hiring W-2 employees:</strong>LLC or S-Corp (payroll already set up)</li>
 <li>• <strong className="text-[#1e1541]">Raising VC funding:</strong>C-Corp (investor requirement)</li>
 </ul>
 </div>
 </div>
 </section>

 {/* Section 7: Common Mistakes */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 5 Legal Structure Mistakes That Cost Thousands
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake 1: Forming LLC in Delaware/Nevada "For Tax Benefits"
 </h3>
 <p className="text-[#64607d]">
 Unless you live there, you'll pay taxes in BOTH your home state AND Delaware. Double the fees, zero benefits for most freelancers. Form your LLC where you physically work.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake 2: Electing S-Corp Too Early
 </h3>
 <p className="text-[#64607d]">
 Below $60-80k income, payroll costs ($500-$2,000/year) eat up tax savings. Wait until you consistently earn $80k+ before switching. You can always upgrade later.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake 3: Mixing Personal and Business Finances
 </h3>
 <p className="text-[#64607d]">
 Using your personal bank account for business = "piercing the corporate veil." In a lawsuit, you lose your LLC liability protection. Separate accounts are legally required.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake 4: Paying for "LLC Formation Services"
 </h3>
 <p className="text-[#64607d]">
 LegalZoom, ZenBusiness, etc. charge $300-$500 for what you can do yourself in 30 minutes for $50-$150. Save money by filing directly with your Secretary of State.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake 5: Forgetting Annual Reports and Renewals
 </h3>
 <p className="text-[#64607d]">
 Most states require annual reports ($50-$300/year). Miss the deadline and your LLC gets dissolved. Set calendar reminders for your formation anniversary.
 </p>
 </div>
 </div>
 </section>

 {/* Section 8: Next Steps */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Your Business Structure Action Plan
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 1
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Calculate Your Annual Income
 </h3>
 <p className="text-[#64607d] mb-3">
 Use last year's tax return or estimate this year's earnings. This determines which structure makes financial sense.
 </p>
 <Link
 href={`/${locale}/tools/rate-calculator`}
 className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
 >
 Calculate Your Income →
 </Link>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 2
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Form Your LLC (If Applicable)
 </h3>
 <p className="text-[#64607d] mb-3">
 File Articles of Organization with your Secretary of State. Get EIN from IRS. Open business bank account. Total time: 1-2 hours.
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 3
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Set Up Invoicing and Tax Systems
 </h3>
 <p className="text-[#64607d] mb-3">
 Create professional invoices with your business name. Track income quarterly for tax estimates.
 </p>
 <Link
 href={`/${locale}/tools/invoice-generator`}
 className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
 >
 Create Business Invoice →
 </Link>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 4
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Understand Your Tax Obligations
 </h3>
 <p className="text-[#64607d] mb-3">
 Learn about quarterly estimated taxes, self-employment tax, and deductions for your structure.
 </p>
 <Link
 href={`/${locale}/gids/zakelijk-beheer/freelance-taxes-international`}
 className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
 >
 Learn Tax Strategy →
 </Link>
 </div>
 </div>
 </div>
 </section>

 {/* Final CTA */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Master Freelance Business Management
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Get our complete guide to legal structures, taxes, and business setup
 </p>
 <Link
 href={`/${locale}/newsletter`}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Download Free Business Setup Guide →
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
 "headline": "LLC vs Sole Proprietorship vs Corporation: Best Legal Structure for Freelancers 2026",
 "description": "Choose the right legal structure for your freelance business. Compare LLC, sole proprietorship, S-corp, and C-corp on taxes, liability, costs, and complexity with decision framework.",
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
 "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/zakelijk-beheer/freelance-legal-structure`
 }
 })
 }}
 />

 {/* HowTo Schema */}
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "HowTo",
 "name": "How to Form an LLC for Freelancing",
 "description": "Step-by-step guide to forming an LLC as a freelancer",
 "step": [
 {
 "@type": "HowToStep",
 "name": "Choose a Business Name",
 "text": "Select a unique name that includes 'LLC' and is available in your state"
 },
 {
 "@type": "HowToStep",
 "name": "File Articles of Organization",
 "text": "Submit formation documents to Secretary of State with filing fee"
 },
 {
 "@type": "HowToStep",
 "name": "Get an EIN",
 "text": "Apply for free Employer Identification Number from IRS"
 },
 {
 "@type": "HowToStep",
 "name": "Create Operating Agreement",
 "text": "Draft internal LLC rules and procedures"
 },
 {
 "@type": "HowToStep",
 "name": "Open Business Bank Account",
 "text": "Separate business and personal finances with dedicated account"
 }
 ]
 })
 }}
 />

 {/* BreadcrumbList Schema */}
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
 "name": "Legal Structure",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/zakelijk-beheer/freelance-legal-structure`
 }
 ]
 })
 }}
 />
 </main>

 
 </>
 );
}
