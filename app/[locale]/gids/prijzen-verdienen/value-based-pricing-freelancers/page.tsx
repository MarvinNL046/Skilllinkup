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

 const slug = 'value-based-pricing-freelancers';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/prijzen-verdienen/${slug}`;

 return {
 title: "Value-Based Pricing for Freelancers: Charge What You're Worth in 2026",
 description: "Stop trading time for money. Learn how top freelancers use value-based pricing to charge $10K-$50K per project instead of $50/hour. Includes real examples and implementation framework.",
 keywords: "value-based pricing, project pricing freelance, charge more freelance, freelance pricing strategy, stop hourly billing",
 openGraph: {
 title: "Value-Based Pricing for Freelancers: Charge What You're Worth in 2026",
 description: "Stop trading time for money. Learn how top freelancers use value-based pricing to charge $10K-$50K per project instead of $50/hour. Includes real examples and implementation framework.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Value-Based Pricing Guide - SkillLinkup',
 }
 ],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "Value-Based Pricing for Freelancers: Charge What You're Worth in 2026",
 description: "Stop trading time for money. Learn how top freelancers use value-based pricing to charge $10K-$50K per project instead of $50/hour. Includes real examples and implementation framework.",
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 },
 };
}

export default async function ValueBasedPricingFreelancersPage({ params }: Props) {
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
 Value-Based Pricing: Charge What You're Worth
 </h1>
 <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
 Why charge $100/hour when your work generates $100,000 in client value? Learn the pricing strategy that earns 3-10x more per project.
 </p>
 <Link
 href={`/${locale}/tools/rate-calculator`}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Calculate Your Value →
 </Link>
 </div>
 </div>
 </section>

 {/* Main Content */}
 <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">

 {/* Section 1: The Hourly Billing Trap */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Why Hourly Billing Kills Your Income
 </h2>

 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 You're a web developer charging $100/hour. A client needs an e-commerce site. You estimate 80 hours of work. You quote <strong className="text-[#1e1541]">$8,000</strong>.
 </p>

 <p className="text-[#64607d] leading-relaxed mb-6">
 But here's what you didn't ask: <strong className="text-[#ef2b70]">How much revenue will this site generate for the client?</strong>
 </p>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 The Real Numbers
 </h3>
 <div className="space-y-4 mb-6">
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Your hourly quote</span>
 <strong className="text-[#1e1541]">$8,000</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Client's annual revenue from site</span>
 <strong className="text-[#1e1541]">$500,000</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Client's profit from site (20% margin)</span>
 <strong className="text-[#1e1541]">$100,000</strong>
 </div>
 <div className="flex justify-between items-center bg-[#fff8f8] p-4 rounded">
 <strong className="text-[#1e1541]">Value you created</strong>
 <strong className="text-[#ef2b70] text-2xl">$100,000/year</strong>
 </div>
 <div className="flex justify-between items-center bg-[#f8f9fb] p-4 rounded">
 <strong className="text-[#1e1541]">Your share of value</strong>
 <strong className="text-orange-600 text-2xl">8%</strong>
 </div>
 </div>

 <p className="text-[#64607d] italic">
 You captured 8% of the value you created. The client captured 92%. This is the hourly billing trap.
 </p>
 </div>

 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg p-8 text-white mb-8">
 <h3 className="font-heading font-bold text-2xl mb-4">
 What Is Value-Based Pricing?
 </h3>
 <p className="text-lg leading-relaxed">
 Value-based pricing means charging based on the <strong>outcome your work delivers</strong>, not the time it takes you to deliver it. If your work generates $100K in profit, charging $15K-$25K isn't expensive—it's a 4-6x ROI for the client.
 </p>
 </div>
 </div>
 </section>

 {/* Section 2: The Value Conversation Framework */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 The 5-Question Value Discovery Framework
 </h2>

 <p className="text-[#64607d] leading-relaxed mb-8">
 Before you quote any price, ask these questions. They shift the conversation from "How much do you cost?" to "How much is this worth to you?"
 </p>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#ef2b70]">
 <div className="flex items-start mb-4">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 1
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 "What problem are you trying to solve?"
 </h3>
 <p className="text-[#64607d] mb-3">
 Don't ask what they want built. Ask what problem they're solving. A website redesign might really be about increasing conversion rates from 1% to 3%.
 </p>
 <div className="bg-[#f8f9fb] rounded p-4">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Example:</strong>"We're losing $50K/month in abandoned carts because our checkout is confusing."
 </p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#22c55e]">
 <div className="flex items-start mb-4">
 <div className="bg-[#22c55e] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 2
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 "What's the cost of not solving this?"
 </h3>
 <p className="text-[#64607d] mb-3">
 Pain quantification. If they're losing $50K/month now, that's $600K/year. Suddenly a $20K project seems cheap.
 </p>
 <div className="bg-[#f8f9fb] rounded p-4">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Follow-up:</strong>"How long has this been a problem? How much has it cost you so far?"
 </p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#1e1541]">
 <div className="flex items-start mb-4">
 <div className="bg-[#1e1541] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 3
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 "What does success look like in numbers?"
 </h3>
 <p className="text-[#64607d] mb-3">
 Make them quantify success. "Increased conversion" is vague. "2% to 4% conversion rate, which means $30K extra monthly revenue" is concrete.
 </p>
 <div className="bg-[#f8f9fb] rounded p-4">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Your job:</strong>Help them articulate measurable outcomes—revenue, cost savings, time saved, leads generated.
 </p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
 <div className="flex items-start mb-4">
 <div className="bg-orange-500 text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 4
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 "What's this worth to your business?"
 </h3>
 <p className="text-[#64607d] mb-3">
 The boldest question. If solving this problem saves them $600K/year, ask: "What would it be worth to eliminate this $600K loss?"
 </p>
 <div className="bg-[#f8f9fb] rounded p-4">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Listen carefully:</strong>Their answer reveals their budget ceiling. If they say "easily $100K+," don't quote $8K.
 </p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
 <div className="flex items-start mb-4">
 <div className="bg-purple-500 text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 5
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 "What happens if we exceed expectations?"
 </h3>
 <p className="text-[#64607d] mb-3">
 Set up performance bonuses. "If we hit 4% conversion instead of 3%, is there a performance incentive?" This aligns your compensation with results.
 </p>
 <div className="bg-[#f8f9fb] rounded p-4">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Advanced:</strong>Structure deals as "base fee + performance bonus." You share in the upside.
 </p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* CTA Section 1 */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Calculate Your Minimum Rate First
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Before value pricing, know your hourly floor. Use our calculator to find your break-even rate.
 </p>
 <Link
 href={`/${locale}/tools/rate-calculator`}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Calculate Break-Even Rate →
 </Link>
 </div>
 </section>

 {/* Section 3: Real Value Pricing Examples */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Real Examples: Hourly vs. Value Pricing
 </h2>

 <div className="space-y-8">
 {/* Example 1: Website Redesign */}
 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-center mb-6">
 <div className="bg-[#ef2b70] rounded-lg p-4 mr-4">
 
 </div>
 <div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
 E-Commerce Website Redesign
 </h3>
 <p className="text-[#64607d]">Converting 1% → 3% increases revenue by $360K/year</p>
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-6">
 <div className="bg-red-50 rounded-lg p-6 border-2 border-red-200">
 <h4 className="font-heading font-semibold text-lg text-red-800 mb-4">
 ❌ Hourly Billing Approach
 </h4>
 <div className="space-y-3 text-sm">
 <div className="flex justify-between">
 <span className="text-[#64607d]">80 hours estimated</span>
 <strong className="text-red-800">× $100/hr</strong>
 </div>
 <div className="flex justify-between border-t-2 border-red-200 pt-3">
 <strong className="text-red-800">Total price</strong>
 <strong className="text-red-800 text-xl">$8,000</strong>
 </div>
 <p className="text-[#64607d] text-xs italic pt-2">
 Client gets $360K value, pays $8K (98% profit for them)
 </p>
 </div>
 </div>

 <div className="bg-green-50 rounded-lg p-6 border-2 border-green-500">
 <h4 className="font-heading font-semibold text-lg text-green-800 mb-4">
 ✅ Value-Based Pricing
 </h4>
 <div className="space-y-3 text-sm">
 <div className="flex justify-between">
 <span className="text-[#64607d]">Annual revenue increase</span>
 <strong className="text-green-800">$360,000</strong>
 </div>
 <div className="flex justify-between">
 <span className="text-[#64607d]">Value capture (5%)</span>
 <strong className="text-green-800">5%</strong>
 </div>
 <div className="flex justify-between border-t-2 border-green-500 pt-3">
 <strong className="text-green-800">Total price</strong>
 <strong className="text-green-800 text-xl">$18,000</strong>
 </div>
 <p className="text-[#64607d] text-xs italic pt-2">
 Client gets $342K net value (20x ROI)
 </p>
 </div>
 </div>
 </div>

 <div className="mt-6 bg-[#f8f9fb] rounded-lg p-4">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#ef2b70]">Result:</strong>You earn 2.25x more ($18K vs $8K), client still gets incredible ROI, and you're incentivized to maximize results.
 </p>
 </div>
 </div>

 {/* Example 2: Lead Generation System */}
 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-center mb-6">
 <div className="bg-[#22c55e] rounded-lg p-4 mr-4">
 
 </div>
 <div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
 Sales Funnel Optimization
 </h3>
 <p className="text-[#64607d]">50 → 100 qualified leads/month @ $5K customer value</p>
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-6">
 <div className="bg-red-50 rounded-lg p-6 border-2 border-red-200">
 <h4 className="font-heading font-semibold text-lg text-red-800 mb-4">
 ❌ Hourly Billing Approach
 </h4>
 <div className="space-y-3 text-sm">
 <div className="flex justify-between">
 <span className="text-[#64607d]">60 hours estimated</span>
 <strong className="text-red-800">× $125/hr</strong>
 </div>
 <div className="flex justify-between border-t-2 border-red-200 pt-3">
 <strong className="text-red-800">Total price</strong>
 <strong className="text-red-800 text-xl">$7,500</strong>
 </div>
 </div>
 </div>

 <div className="bg-green-50 rounded-lg p-6 border-2 border-green-500">
 <h4 className="font-heading font-semibold text-lg text-green-800 mb-4">
 ✅ Value-Based Pricing
 </h4>
 <div className="space-y-3 text-sm">
 <div className="flex justify-between">
 <span className="text-[#64607d]">50 extra leads/month × $5K</span>
 <strong className="text-green-800">$250K/month</strong>
 </div>
 <div className="flex justify-between">
 <span className="text-[#64607d]">Value share (10% of 1st month)</span>
 <strong className="text-green-800">10%</strong>
 </div>
 <div className="flex justify-between border-t-2 border-green-500 pt-3">
 <strong className="text-green-800">Total price</strong>
 <strong className="text-green-800 text-xl">$25,000</strong>
 </div>
 </div>
 </div>
 </div>

 <div className="mt-6 bg-[#f8f9fb] rounded-lg p-4">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#ef2b70]">Result:</strong>You earn 3.3x more ($25K vs $7.5K). Client recoups investment in less than 5 days of additional revenue.
 </p>
 </div>
 </div>

 {/* Example 3: Automation Project */}
 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-center mb-6">
 <div className="bg-[#1e1541] rounded-lg p-4 mr-4">
 
 </div>
 <div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
 Process Automation System
 </h3>
 <p className="text-[#64607d]">Saves 20 hours/week of manual work ($50/hr employee cost)</p>
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-6">
 <div className="bg-red-50 rounded-lg p-6 border-2 border-red-200">
 <h4 className="font-heading font-semibold text-lg text-red-800 mb-4">
 ❌ Hourly Billing Approach
 </h4>
 <div className="space-y-3 text-sm">
 <div className="flex justify-between">
 <span className="text-[#64607d]">100 hours estimated</span>
 <strong className="text-red-800">× $85/hr</strong>
 </div>
 <div className="flex justify-between border-t-2 border-red-200 pt-3">
 <strong className="text-red-800">Total price</strong>
 <strong className="text-red-800 text-xl">$8,500</strong>
 </div>
 </div>
 </div>

 <div className="bg-green-50 rounded-lg p-6 border-2 border-green-500">
 <h4 className="font-heading font-semibold text-lg text-green-800 mb-4">
 ✅ Value-Based Pricing
 </h4>
 <div className="space-y-3 text-sm">
 <div className="flex justify-between">
 <span className="text-[#64607d]">Annual savings (20hr/wk × 52 × $50)</span>
 <strong className="text-green-800">$52,000/year</strong>
 </div>
 <div className="flex justify-between">
 <span className="text-[#64607d]">First-year value share (40%)</span>
 <strong className="text-green-800">40%</strong>
 </div>
 <div className="flex justify-between border-t-2 border-green-500 pt-3">
 <strong className="text-green-800">Total price</strong>
 <strong className="text-green-800 text-xl">$20,800</strong>
 </div>
 </div>
 </div>
 </div>

 <div className="mt-6 bg-[#f8f9fb] rounded-lg p-4">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#ef2b70]">Result:</strong>You earn 2.4x more ($20.8K vs $8.5K). Client saves $31.2K net in year 1, $52K every year after.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* Section 4: How to Calculate Value-Based Prices */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 The Value Pricing Formula
 </h2>

 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 mb-8 text-white">
 <h3 className="font-heading font-bold text-2xl mb-4">
 Calculate Your Value-Based Price
 </h3>
 <div className="bg-white/10 backdrop-blur rounded-lg p-6 font-mono text-lg mb-4">
 Price = (Client's Quantified Value × Value Capture %) + Complexity Premium
 </div>
 <p className="text-white/90">
 Where Value Capture % typically ranges from 5-25% depending on project risk, client size, and your positioning.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
 Step-by-Step Value Calculation
 </h3>

 <div className="space-y-6">
 <div>
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
 Step 1: Quantify the Client's Value
 </h4>
 <div className="bg-[#f8f9fb] rounded-lg p-4">
 <p className="text-[#64607d] mb-2">Ask:</p>
 <ul className="space-y-2 text-sm text-[#64607d]">
 <li>• What revenue will this generate? (Sales increases, new customers)</li>
 <li>• What costs will this save? (Labor, errors, waste, inefficiency)</li>
 <li>• What time will this save? (Hours × hourly cost × people affected)</li>
 <li>• What risk will this mitigate? (Legal fees, compliance fines, security breaches)</li>
 </ul>
 </div>
 </div>

 <div>
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
 Step 2: Choose Your Value Capture %
 </h4>
 <div className="overflow-x-auto">
 <table className="w-full border-collapse">
 <thead>
 <tr className="bg-[#f8f9fb]">
 <th className="text-left p-3 font-semibold text-[#1e1541]">Scenario</th>
 <th className="text-center p-3 font-semibold text-[#1e1541]">Capture %</th>
 <th className="text-left p-3 font-semibold text-[#1e1541]">Justification</th>
 </tr>
 </thead>
 <tbody className="text-sm">
 <tr className="border-b border-gray-100">
 <td className="p-3 text-[#64607d]">Low-risk, proven solution</td>
 <td className="text-center p-3 font-semibold text-[#1e1541]">5-10%</td>
 <td className="p-3 text-[#64607d]">Guaranteed results, replicable</td>
 </tr>
 <tr className="border-b border-gray-100">
 <td className="p-3 text-[#64607d]">Moderate complexity</td>
 <td className="text-center p-3 font-semibold text-[#1e1541]">10-15%</td>
 <td className="p-3 text-[#64607d]">Custom work, some unknowns</td>
 </tr>
 <tr className="border-b border-gray-100">
 <td className="p-3 text-[#64607d]">High complexity or risk</td>
 <td className="text-center p-3 font-semibold text-[#1e1541]">15-25%</td>
 <td className="p-3 text-[#64607d]">Significant effort, uncertain outcome</td>
 </tr>
 <tr className="border-b border-gray-100">
 <td className="p-3 text-[#64607d]">Transformational impact</td>
 <td className="text-center p-3 font-semibold text-[#1e1541]">25-40%</td>
 <td className="p-3 text-[#64607d]">Business-critical, unique expertise</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 <div>
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
 Step 3: Add Complexity Premium (Optional)
 </h4>
 <div className="bg-[#f8f9fb] rounded-lg p-4">
 <p className="text-[#64607d] mb-2">For projects with:</p>
 <ul className="space-y-2 text-sm text-[#64607d]">
 <li>• Tight deadlines: +20-50%</li>
 <li>• Cutting-edge technology: +15-30%</li>
 <li>• Multiple stakeholders: +10-25%</li>
 <li>• Difficult client history: +25-50%</li>
 </ul>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
 Example Calculation
 </h3>

 <div className="space-y-4">
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Client's quantified annual value</span>
 <strong className="text-[#1e1541]">$200,000</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Your value capture % (moderate complexity)</span>
 <strong className="text-[#1e1541]">12%</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Base value price ($200K × 12%)</span>
 <strong className="text-[#1e1541]">$24,000</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Rush deadline premium (+30%)</span>
 <strong className="text-[#1e1541]">$7,200</strong>
 </div>
 <div className="flex justify-between items-center bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] text-white p-4 rounded">
 <strong className="text-lg">Final project price</strong>
 <strong className="text-2xl">$31,200</strong>
 </div>
 </div>

 <div className="mt-6 bg-[#f8f9fb] rounded-lg p-4">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Client perspective:</strong>Pays $31.2K to gain $200K in value = 6.4x ROI. Easy decision.
 </p>
 </div>
 </div>
 </section>

 {/* CTA Section 2 */}
 <section className="mb-16">
 <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Read Success Stories From Value Pricers
 </h3>
 <p className="text-xl mb-6 text-gray-300">
 See how freelancers 3-10x'd their income by switching to value-based pricing
 </p>
 <Link
 href={`/${locale}/blog`}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Read Case Studies →
 </Link>
 </div>
 </section>

 {/* Section 5: Overcoming Objections */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 "But My Client Wants an Hourly Rate"
 </h2>

 <p className="text-[#64607d] leading-relaxed mb-8">
 Here's how to pivot the conversation from hourly to value:
 </p>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 Objection #1: "What's your hourly rate?"
 </h3>
 <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
 <p className="text-sm text-red-800 mb-2">
 <strong>❌ Bad Response:</strong>"$100/hour"
 </p>
 <p className="text-xs text-red-700">
 Now you're competing on price. The client will find someone at $75/hour.
 </p>
 </div>
 <div className="bg-green-50 border-l-4 border-green-500 p-4">
 <p className="text-sm text-green-800 mb-2">
 <strong>✅ Better Response:</strong>"I price based on the value I deliver, not hours worked. Let's talk about what you're trying to achieve and what that's worth to your business. Then I'll provide a fixed project price."
 </p>
 <p className="text-xs text-green-700">
 Shifts focus to outcomes and positions you as results-oriented.
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 Objection #2: "That's too expensive"
 </h3>
 <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
 <p className="text-sm text-red-800 mb-2">
 <strong>❌ Bad Response:</strong>"I can drop it to $X" (Immediate discount)
 </p>
 <p className="text-xs text-red-700">
 Signals your initial price was arbitrary. Teaches client to negotiate every time.
 </p>
 </div>
 <div className="bg-green-50 border-l-4 border-green-500 p-4">
 <p className="text-sm text-green-800 mb-2">
 <strong>✅ Better Response:</strong>"Compared to what? If this project generates $200K in value and you're paying $30K, that's a 6.6x return. Most investments struggle to return 2x. Can you help me understand your concern?"
 </p>
 <p className="text-xs text-green-700">
 Reframes price as investment. Forces client to articulate real objection (often it's budget, not price).
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 Objection #3: "We're getting quotes from $50/hour developers"
 </h3>
 <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
 <p className="text-sm text-red-800 mb-2">
 <strong>❌ Bad Response:</strong>"I can match $50/hour"
 </p>
 <p className="text-xs text-red-700">
 Race to the bottom. You'll resent the client and do mediocre work.
 </p>
 </div>
 <div className="bg-green-50 border-l-4 border-green-500 p-4">
 <p className="text-sm text-green-800 mb-2">
 <strong>✅ Better Response:</strong>"That's great—there are talented developers at every price point. My pricing reflects the specific value I deliver: [outcome-based results]. If your primary concern is lowest cost per hour, I'm probably not the right fit. But if you want guaranteed results, let's talk about what that's worth."
 </p>
 <p className="text-xs text-green-700">
 Qualify the client. Ideal clients care about results, not hourly rates.
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 Objection #4: "How do I know you'll deliver?"
 </h3>
 <div className="bg-green-50 border-l-4 border-green-500 p-4">
 <p className="text-sm text-green-800 mb-2">
 <strong>✅ Best Response:</strong>"Great question. I structure payments in milestones tied to deliverables. You only pay for completed, approved work. Here's the payment schedule: [30% at kickoff, 40% at design approval, 30% at final delivery]. At any point, if you're not satisfied, we'll revise until it meets the agreed outcomes."
 </p>
 <p className="text-xs text-green-700">
 Mitigates risk. Milestone-based payments protect both parties.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* Section 6: Implementation Roadmap */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Your 30-Day Transition to Value Pricing
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-16 h-16 flex items-center justify-center text-lg mr-4 flex-shrink-0">
 Week<br/>1
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Audit Your Last 5 Projects
 </h3>
 <p className="text-[#64607d] mb-3">
 For each project, calculate: (1) What you charged, (2) What value the client received (quantified), (3) What you could have charged using value pricing.
 </p>
 <div className="bg-[#f8f9fb] rounded p-3 text-sm text-[#64607d]">
 <strong>Goal:</strong>Identify your "value gap"—how much you left on the table
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-16 h-16 flex items-center justify-center text-lg mr-4 flex-shrink-0">
 Week<br/>2
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Master the Value Discovery Questions
 </h3>
 <p className="text-[#64607d] mb-3">
 Practice the 5-question framework with current clients (even on existing projects). Get comfortable asking about value, not just deliverables.
 </p>
 <div className="bg-[#f8f9fb] rounded p-3 text-sm text-[#64607d]">
 <strong>Practice script:</strong>"I'm refining my process. Can I ask a few questions about how this project impacts your business?"
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-16 h-16 flex items-center justify-center text-lg mr-4 flex-shrink-0">
 Week<br/>3
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Create Your Value Pricing Template
 </h3>
 <p className="text-[#64607d] mb-3">
 Build a proposal template that focuses on outcomes, ROI, and value rather than hours and tasks. Include sections for: Problem, Solution, Measurable Outcomes, Investment, Timeline, Guarantees.
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-16 h-16 flex items-center justify-center text-lg mr-4 flex-shrink-0">
 Week<br/>4
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Test Value Pricing on Next 3 Proposals
 </h3>
 <p className="text-[#64607d] mb-3">
 Don't convert all clients overnight. Test value pricing on your next 3 proposals. Track: (1) Close rate, (2) Average project value, (3) Client satisfaction, (4) Your confidence level.
 </p>
 <div className="bg-[#f8f9fb] rounded p-3 text-sm text-[#64607d]">
 <strong>Expectation:</strong>Close rate might dip initially (you're filtering for ideal clients), but average deal size should increase 2-5x
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Final CTA */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Start With Your Minimum Rate
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Before value pricing, calculate your hourly floor. Then multiply it by the value you deliver.
 </p>
 <Link
 href={`/${locale}/tools/rate-calculator`}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Calculate Your Base Rate →
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
 "headline": "Value-Based Pricing for Freelancers: Charge What You're Worth in 2026",
 "description": "Stop trading time for money. Learn how top freelancers use value-based pricing to charge $10K-$50K per project instead of $50/hour.",
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
 "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/prijzen-verdienen/value-based-pricing-freelancers`
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
 "name": "Value-Based Pricing",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/prijzen-verdienen/value-based-pricing-freelancers`
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
