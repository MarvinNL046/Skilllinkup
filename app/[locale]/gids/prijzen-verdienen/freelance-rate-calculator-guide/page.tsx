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

 const slug = 'freelance-rate-calculator-guide';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/prijzen-verdienen/${slug}`;

 return {
 title: "How to Calculate Your Perfect Freelance Rate: 2026 Complete Guide",
 description: "Master freelance pricing with our proven 5-step calculator method. Discover the exact formula used by $200/hour freelancers to price profitably. Includes free tools and real examples.",
 keywords: "freelance rate calculator, hourly rate formula, freelance pricing guide, calculate freelance rate, pricing strategy freelancers",
 openGraph: {
 title: "How to Calculate Your Perfect Freelance Rate: 2026 Complete Guide",
 description: "Master freelance pricing with our proven 5-step calculator method. Discover the exact formula used by $200/hour freelancers to price profitably. Includes free tools and real examples.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Freelance Rate Calculator Guide - SkillLinkup',
 }
 ],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "How to Calculate Your Perfect Freelance Rate: 2026 Complete Guide",
 description: "Master freelance pricing with our proven 5-step calculator method. Discover the exact formula used by $200/hour freelancers to price profitably. Includes free tools and real examples.",
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 },
 };
}

export default async function FreelanceRateCalculatorGuidePage({ params }: Props) {
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
 How to Calculate Your Perfect Freelance Rate
 </h1>
 <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
 Stop guessing. Use the proven 5-step method that successful freelancers use to price profitably and confidently.
 </p>
 <Link
 href={`/${locale}/tools/rate-calculator`}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Calculate Your Rate Now →
 </Link>
 </div>
 </div>
 </section>

 {/* Main Content */}
 <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">

 {/* Section 1: The Pricing Problem */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 The $50,000 Pricing Mistake
 </h2>
 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Here's the brutal truth: <strong className="text-[#1e1541]">most freelancers are leaving $50,000+ on the table</strong>every year because they don't know how to calculate their true hourly rate.
 </p>

 <p className="text-[#64607d] leading-relaxed mb-6">
 They look at job boards, see "$50/hour" listings, and think "That sounds good." Three months later, they're working 60-hour weeks, stressed about bills, and wondering why freelancing feels harder than their old 9-to-5.
 </p>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 Why Random Rate Picking Fails
 </h3>
 <div className="space-y-4">
 <div className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3 text-xl flex-shrink-0">1.</span>
 <p className="text-[#64607d]">
 <strong className="text-[#1e1541]">Hidden costs eat profits:</strong>Taxes, health insurance, equipment, software—these aren't optional extras. They're $15,000-$30,000 in annual expenses most freelancers forget to include.
 </p>
 </div>
 <div className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3 text-xl flex-shrink-0">2.</span>
 <p className="text-[#64607d]">
 <strong className="text-[#1e1541]">Billable hours ≠ work hours:</strong>You can't bill for proposals, invoicing, marketing, or learning new skills. Yet these consume 30-40% of your week.
 </p>
 </div>
 <div className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3 text-xl flex-shrink-0">3.</span>
 <p className="text-[#64607d]">
 <strong className="text-[#1e1541]">Market rates are averages:</strong>They don't account for YOUR experience, expenses, or income goals. Following them guarantees mediocre earnings.
 </p>
 </div>
 </div>
 </div>

 <p className="text-[#64607d] leading-relaxed">
 The solution? A <strong className="text-[#1e1541]">systematic calculator approach</strong>that factors in EVERYTHING you need to earn and spend—not just what sounds "competitive."
 </p>
 </div>
 </section>

 {/* Section 2: The 5-Step Calculator Method */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 The 5-Step Calculator Method
 </h2>

 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 mb-8 text-white">
 <h3 className="font-heading font-bold text-2xl mb-4">
 The Master Formula
 </h3>
 <div className="bg-white/10 backdrop-blur rounded-lg p-6 font-mono text-lg">
 Hourly Rate = (Annual Income Goal + Business Expenses + Taxes) ÷ Billable Hours
 </div>
 <p className="mt-4 text-white/90">
 This isn't complicated math. It's methodical accounting that ensures you actually make money.
 </p>
 </div>

 {/* Step 1 */}
 <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-l-4 border-[#ef2b70]">
 <div className="flex items-center mb-4">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 1
 </div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
 Define Your Annual Income Goal
 </h3>
 </div>

 <p className="text-[#64607d] leading-relaxed mb-4">
 What do you need to live comfortably? Not survive—<strong>thrive</strong>. Include rent/mortgage, food, insurance, savings, retirement, and yes, fun money.
 </p>

 <div className="bg-[#f8f9fb] rounded-lg p-6">
 <p className="font-semibold text-[#1e1541] mb-3">Example Annual Income Goals:</p>
 <ul className="space-y-2 text-[#64607d]">
 <li>• <strong>Entry-level:</strong>$50,000-$65,000 (comfortable single income)</li>
 <li>• <strong>Mid-level:</strong>$75,000-$100,000 (family support, savings)</li>
 <li>• <strong>Senior-level:</strong>$120,000-$180,000 (wealth building)</li>
 </ul>
 </div>
 </div>

 {/* Step 2 */}
 <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-l-4 border-[#22c55e]">
 <div className="flex items-center mb-4">
 <div className="bg-[#22c55e] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 2
 </div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
 Calculate Business Expenses
 </h3>
 </div>

 <p className="text-[#64607d] leading-relaxed mb-4">
 Freelancing isn't free. Here's what you'll spend annually:
 </p>

 <div className="overflow-x-auto">
 <table className="w-full border-collapse">
 <thead>
 <tr className="bg-[#f8f9fb]">
 <th className="text-left p-3 font-semibold text-[#1e1541]">Expense Category</th>
 <th className="text-right p-3 font-semibold text-[#1e1541]">Annual Cost</th>
 </tr>
 </thead>
 <tbody className="text-[#64607d]">
 <tr className="border-b border-gray-100">
 <td className="p-3">Health Insurance</td>
 <td className="text-right p-3 font-semibold">$6,000-$12,000</td>
 </tr>
 <tr className="border-b border-gray-100">
 <td className="p-3">Software & Tools (Adobe, Figma, hosting, etc.)</td>
 <td className="text-right p-3 font-semibold">$1,200-$3,600</td>
 </tr>
 <tr className="border-b border-gray-100">
 <td className="p-3">Accounting & Legal</td>
 <td className="text-right p-3 font-semibold">$800-$2,400</td>
 </tr>
 <tr className="border-b border-gray-100">
 <td className="p-3">Equipment & Workspace</td>
 <td className="text-right p-3 font-semibold">$1,500-$5,000</td>
 </tr>
 <tr className="border-b border-gray-100">
 <td className="p-3">Marketing & Website</td>
 <td className="text-right p-3 font-semibold">$600-$2,400</td>
 </tr>
 <tr className="border-b border-gray-100">
 <td className="p-3">Professional Development</td>
 <td className="text-right p-3 font-semibold">$500-$2,000</td>
 </tr>
 <tr className="bg-[#f8f9fb] font-bold">
 <td className="p-3 text-[#1e1541]">Total Business Expenses</td>
 <td className="text-right p-3 text-[#ef2b70]">$10,600-$27,400</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 {/* Step 3 */}
 <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-l-4 border-[#1e1541]">
 <div className="flex items-center mb-4">
 <div className="bg-[#1e1541] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 3
 </div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
 Account for Taxes
 </h3>
 </div>

 <p className="text-[#64607d] leading-relaxed mb-4">
 Unlike W-2 employees, you pay BOTH sides of payroll taxes plus income tax. Plan for 25-35% depending on your state.
 </p>

 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg">
 <p className="text-[#1e1541] font-semibold mb-2">Tax Calculation Example:</p>
 <p className="text-[#64607d] mb-3">If your income goal is $80,000:</p>
 <ul className="space-y-2 text-[#64607d]">
 <li>• Income tax (22% bracket): $17,600</li>
 <li>• Self-employment tax (15.3%): $12,240</li>
 <li>• <strong className="text-[#ef2b70]">Total tax burden: ~$29,840 (37.3%)</strong></li>
 </ul>
 </div>
 </div>

 {/* Step 4 */}
 <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-l-4 border-orange-500">
 <div className="flex items-center mb-4">
 <div className="bg-orange-500 text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 4
 </div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
 Calculate Billable Hours (The Critical Step)
 </h3>
 </div>

 <p className="text-[#64607d] leading-relaxed mb-4">
 This is where most freelancers <strong>massively miscalculate</strong>. You do NOT have 2,080 billable hours per year (40 hrs/week × 52 weeks).
 </p>

 <div className="bg-[#f8f9fb] rounded-lg p-6 mb-4">
 <h4 className="font-semibold text-[#1e1541] mb-3">Realistic Billable Hours Calculation:</h4>
 <div className="space-y-2 text-[#64607d]">
 <div className="flex justify-between">
 <span>Total calendar hours (40 hrs/week × 52 weeks)</span>
 <strong>2,080 hours</strong>
 </div>
 <div className="flex justify-between text-red-600">
 <span>- Vacation (3 weeks)</span>
 <strong>-120 hours</strong>
 </div>
 <div className="flex justify-between text-red-600">
 <span>- Holidays (10 days)</span>
 <strong>-80 hours</strong>
 </div>
 <div className="flex justify-between text-red-600">
 <span>- Sick days (1 week)</span>
 <strong>-40 hours</strong>
 </div>
 <div className="flex justify-between border-t-2 border-gray-300 pt-2 mt-2">
 <strong>Available work hours</strong>
 <strong>1,840 hours</strong>
 </div>
 <div className="flex justify-between text-red-600">
 <span>- Non-billable activities (admin, sales, learning) @ 35%</span>
 <strong>-644 hours</strong>
 </div>
 <div className="flex justify-between border-t-2 border-[#ef2b70] pt-2 mt-2 font-bold text-[#ef2b70]">
 <span>REALISTIC BILLABLE HOURS</span>
 <strong>1,196 hours/year</strong>
 </div>
 </div>
 </div>

 <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
 <p className="text-orange-800 font-semibold">
 Reality Check: If you're working 40 hours/week, only about <strong>23 hours are actually billable</strong>. Plan accordingly.
 </p>
 </div>
 </div>

 {/* Step 5 */}
 <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#ef2b70]">
 <div className="flex items-center mb-4">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 5
 </div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
 Calculate Your Minimum Hourly Rate
 </h3>
 </div>

 <p className="text-[#64607d] leading-relaxed mb-4">
 Now plug everything into the formula:
 </p>

 <div className="bg-gradient-to-br from-[#1e1541] to-[#2a1f5e] rounded-lg p-8 text-white">
 <h4 className="font-heading font-bold text-xl mb-4">Example Calculation:</h4>
 <div className="space-y-3 mb-6">
 <div className="flex justify-between">
 <span>Income goal</span>
 <strong>$80,000</strong>
 </div>
 <div className="flex justify-between">
 <span>+ Business expenses</span>
 <strong>$15,000</strong>
 </div>
 <div className="flex justify-between">
 <span>+ Taxes (30%)</span>
 <strong>$24,000</strong>
 </div>
 <div className="flex justify-between border-t-2 border-white/20 pt-3 mt-3 text-xl">
 <strong>Total needed</strong>
 <strong className="text-[#22c55e]">$119,000</strong>
 </div>
 <div className="flex justify-between">
 <span>÷ Billable hours</span>
 <strong>1,200 hours</strong>
 </div>
 </div>
 <div className="bg-[#ef2b70] rounded-lg p-6 text-center">
 <p className="text-lg mb-2">Your Minimum Hourly Rate:</p>
 <p className="font-heading font-bold text-5xl">
 $99<span className="text-2xl">/hour</span>
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* CTA Section 1 */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Calculate Your Rate in 60 Seconds
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Use our free calculator tool to find your perfect hourly rate based on YOUR numbers
 </p>
 <Link
 href={`/${locale}/tools/rate-calculator`}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Calculate Now (It's Free) →
 </Link>
 </div>
 </section>

 {/* Section 3: Common Calculator Mistakes */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 7 Calculator Mistakes That Kill Your Income
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake #1: Using 2,000 Billable Hours
 </h3>
 <p className="text-[#64607d] mb-3">
 40 hours/week × 50 weeks = 2,000 hours sounds right, but it ignores vacation, sick time, and non-billable work. Use 1,200-1,400 hours instead.
 </p>
 <p className="text-[#22c55e] font-semibold">
 ✅ Fix: Track your actual billable vs. total hours for one month. Multiply by 12 for annual reality.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake #2: Forgetting Health Insurance
 </h3>
 <p className="text-[#64607d] mb-3">
 Employers pay 70-80% of health insurance premiums. As a freelancer, you pay 100%—often $500-$1,000/month.
 </p>
 <p className="text-[#22c55e] font-semibold">
 ✅ Fix: Add $6,000-$12,000 to annual expenses. It's not optional.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake #3: Ignoring Platform Fees
 </h3>
 <p className="text-[#64607d] mb-3">
 Upwork takes 5-20%. Fiverr takes 20%. Toptal takes 0% but is highly selective. These fees aren't negotiable.
 </p>
 <p className="text-[#22c55e] font-semibold">
 ✅ Fix: Increase your rate by the platform percentage. Charge $120/hr to net $100/hr after 20% fees.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake #4: Using Pre-Tax Income as Your Goal
 </h3>
 <p className="text-[#64607d] mb-3">
 "I want to make $60,000" sounds good until you realize you'll pay $18,000-$22,000 in taxes.
 </p>
 <p className="text-[#22c55e] font-semibold">
 ✅ Fix: Decide your post-tax take-home goal, then gross up by 30-35% for taxes.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake #5: No Profit Margin
 </h3>
 <p className="text-[#64607d] mb-3">
 Your calculated rate covers expenses. But what about reinvestment, equipment upgrades, or slow months?
 </p>
 <p className="text-[#22c55e] font-semibold">
 ✅ Fix: Add 15-25% profit margin to your minimum rate. This is your growth fund.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake #6: Copying Market Averages
 </h3>
 <p className="text-[#64607d] mb-3">
 "The average web developer charges $65/hour" is meaningless. YOUR rate depends on YOUR costs and goals.
 </p>
 <p className="text-[#22c55e] font-semibold">
 ✅ Fix: Use market data to validate, not determine. If your calculated rate is higher, charge it.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake #7: No Adjustment for Experience
 </h3>
 <p className="text-[#64607d] mb-3">
 Your minimum rate is just that—minimum. If you have 5+ years experience, niche expertise, or exceptional results, charge more.
 </p>
 <p className="text-[#22c55e] font-semibold">
 ✅ Fix: Add 20-50% experience premium to your minimum rate. Clients pay for value, not just hours.
 </p>
 </div>
 </div>
 </section>

 {/* CTA Section 2 */}
 <section className="mb-16">
 <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Compare Platform Fees Before You Price
 </h3>
 <p className="text-xl mb-6 text-gray-300">
 Platform fees range from 0% to 20%. Know the true cost before setting your rate.
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Compare Platforms →
 </Link>
 </div>
 </section>

 {/* Section 4: Advanced Calculator Strategies */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Beyond the Basics: Advanced Pricing Strategies
 </h2>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
 Tiered Pricing Calculator Approach
 </h3>

 <p className="text-[#64607d] leading-relaxed mb-6">
 Instead of one rate, calculate three tiers based on project complexity and client value:
 </p>

 <div className="grid md:grid-cols-3 gap-6">
 <div className="bg-[#f8f9fb] rounded-lg p-6 border-2 border-gray-200">
 <div className="text-3xl mb-3"></div>
 <h4 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 Base Rate
 </h4>
 <p className="text-[#64607d] mb-4 text-sm">
 Your calculated minimum for standard projects
 </p>
 <p className="font-heading font-bold text-2xl text-[#ef2b70]">
 Minimum Rate
 </p>
 <p className="text-sm text-[#64607d] mt-2">
 Use for: Long-term retainers, ideal clients, portfolio pieces
 </p>
 </div>

 <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg p-6 border-2 border-[#22c55e] text-white">
 <div className="text-3xl mb-3"></div>
 <h4 className="font-heading font-semibold text-xl mb-3">
 Standard Rate
 </h4>
 <p className="mb-4 text-sm text-white/90">
 Base rate + 20-30% for typical complexity
 </p>
 <p className="font-heading font-bold text-2xl">
 +25% Premium
 </p>
 <p className="text-sm text-white/80 mt-2">
 Use for: Most projects, new clients, moderate complexity
 </p>
 </div>

 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg p-6 border-2 border-[#ef2b70] text-white">
 <div className="text-3xl mb-3"></div>
 <h4 className="font-heading font-semibold text-xl mb-3">
 Premium Rate
 </h4>
 <p className="mb-4 text-sm text-white/90">
 Base rate + 50-100% for high complexity/value
 </p>
 <p className="font-heading font-bold text-2xl">
 +75% Premium
 </p>
 <p className="text-sm text-white/80 mt-2">
 Use for: Rush jobs, complex projects, difficult clients
 </p>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
 When to Adjust Your Calculated Rate
 </h3>

 <div className="grid md:grid-cols-2 gap-6">
 <div>
 <div className="flex items-center mb-4">
 <div className="bg-[#22c55e] rounded-lg p-3 mr-3">
 
 </div>
 <h4 className="font-heading font-semibold text-lg text-[#1e1541]">
 Charge MORE When:
 </h4>
 </div>
 <ul className="space-y-3 text-[#64607d]">
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Client has enterprise budget ($500K+ revenue)</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Rush deadline (less than 2 weeks)</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Complex technical requirements</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>You're their ONLY option (specialized skill)</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Project has high revenue impact for client</span>
 </li>
 </ul>
 </div>

 <div>
 <div className="flex items-center mb-4">
 <div className="bg-orange-500 rounded-lg p-3 mr-3">
 
 </div>
 <h4 className="font-heading font-semibold text-lg text-[#1e1541]">
 Consider Discounts When:
 </h4>
 </div>
 <ul className="space-y-3 text-[#64607d]">
 <li className="flex items-start">
 <span className="text-orange-500 mr-2">!</span>
 <span>Guaranteed 6+ month retainer (stability premium)</span>
 </li>
 <li className="flex items-start">
 <span className="text-orange-500 mr-2">!</span>
 <span>Portfolio piece in new niche (strategic)</span>
 </li>
 <li className="flex items-start">
 <span className="text-orange-500 mr-2">!</span>
 <span>Bulk hours (40+ hours/month commitment)</span>
 </li>
 <li className="flex items-start">
 <span className="text-orange-500 mr-2">!</span>
 <span>Referral network opportunity (leads to more work)</span>
 </li>
 <li className="flex items-start">
 <span className="text-orange-500 mr-2">!</span>
 <span className="font-semibold">NEVER go below your minimum rate</span>
 </li>
 </ul>
 </div>
 </div>
 </div>
 </section>

 {/* Section 5: Implementation Action Plan */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Your 7-Day Implementation Plan
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 1
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Day 1-2: Gather Your Numbers
 </h3>
 <p className="text-[#64607d] mb-3">
 Review last 12 months: income, expenses, hours worked, hours billed. Be brutally honest about non-billable time.
 </p>
 <div className="bg-[#f8f9fb] rounded p-3 text-sm text-[#64607d]">
 <strong>Deliverable:</strong>Spreadsheet with actual income, expenses, and time breakdown
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 2
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Day 3: Calculate Your Minimum Rate
 </h3>
 <p className="text-[#64607d] mb-3">
 Use our rate calculator with your real numbers. Don't fudge the billable hours or expenses.
 </p>
 <Link
 href={`/${locale}/tools/rate-calculator`}
 className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
 >
 Use Rate Calculator →
 </Link>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 3
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Day 4: Build Your Tiered Rates
 </h3>
 <p className="text-[#64607d] mb-3">
 Create base, standard, and premium tiers. Document when to use each tier.
 </p>
 <div className="bg-[#f8f9fb] rounded p-3 text-sm text-[#64607d]">
 <strong>Example:</strong>$100 base, $125 standard, $175 premium
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 4
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Day 5: Research Platform Fees
 </h3>
 <p className="text-[#64607d] mb-3">
 If you use Upwork, Fiverr, or other platforms, calculate how fees affect your take-home.
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
 >
 Compare Platform Fees →
 </Link>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 5
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Day 6: Update Your Proposals
 </h3>
 <p className="text-[#64607d] mb-3">
 Revise proposal templates with new rates. Prepare explanations for why you charge what you charge.
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 6
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Day 7: Notify Current Clients (If Raising Rates)
 </h3>
 <p className="text-[#64607d] mb-3">
 Give 30-90 days notice with clear rationale. Most clients respect transparency and fair pricing.
 </p>
 <Link
 href={`/${locale}/gids/prijzen-verdienen/raising-rates-without-losing-clients`}
 className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
 >
 Learn How to Raise Rates →
 </Link>
 </div>
 </div>
 </div>
 </section>

 {/* Final CTA */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Ready to Calculate Your Profitable Rate?
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Use our free calculator to discover your minimum hourly rate in under 60 seconds
 </p>
 <Link
 href={`/${locale}/tools/rate-calculator`}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Calculate Your Rate Now →
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
 "name": "How to Calculate Your Perfect Freelance Rate",
 "description": "A comprehensive 5-step guide to calculating your freelance hourly rate based on income goals, expenses, taxes, and billable hours.",
 "step": [
 {
 "@type": "HowToStep",
 "position": 1,
 "name": "Define Your Annual Income Goal",
 "text": "Determine what you need to live comfortably, including rent/mortgage, food, insurance, savings, retirement, and discretionary spending."
 },
 {
 "@type": "HowToStep",
 "position": 2,
 "name": "Calculate Business Expenses",
 "text": "Add up all annual business costs including health insurance, software, accounting, equipment, marketing, and professional development."
 },
 {
 "@type": "HowToStep",
 "position": 3,
 "name": "Account for Taxes",
 "text": "Plan for 25-35% tax burden including both income tax and self-employment tax."
 },
 {
 "@type": "HowToStep",
 "position": 4,
 "name": "Calculate Billable Hours",
 "text": "Determine realistic billable hours (typically 1,200-1,400 hours per year) accounting for vacation, sick time, and non-billable activities."
 },
 {
 "@type": "HowToStep",
 "position": 5,
 "name": "Calculate Your Minimum Hourly Rate",
 "text": "Divide total needed income by billable hours to determine your minimum profitable hourly rate."
 }
 ],
 "totalTime": "PT7D",
 "tool": [
 {
 "@type": "HowToTool",
 "name": "Freelance Rate Calculator"
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
 "@type": "Article",
 "headline": "How to Calculate Your Perfect Freelance Rate: 2026 Complete Guide",
 "description": "Master freelance pricing with our proven 5-step calculator method. Discover the exact formula used by $200/hour freelancers to price profitably.",
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
 "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/prijzen-verdienen/freelance-rate-calculator-guide`
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
 "name": "Freelance Rate Calculator Guide",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/prijzen-verdienen/freelance-rate-calculator-guide`
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
