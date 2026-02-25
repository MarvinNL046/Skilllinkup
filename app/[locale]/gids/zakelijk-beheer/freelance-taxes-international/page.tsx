import Link from "next/link";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type Props = {
 params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'freelance-taxes-international';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/zakelijk-beheer/${slug}`;

 return {
 title: "International Freelance Taxes 2026: Complete Country-by-Country Guide",
 description: "Navigate international freelance taxes across 15+ countries. Tax rates, filing requirements, double taxation treaties, and compliance strategies for digital nomads and remote workers.",
 keywords: "international freelance taxes, digital nomad taxes, foreign tax obligations, double taxation treaty, expat freelancer taxes, cross-border taxation",
 openGraph: {
 title: "International Freelance Taxes 2026: Complete Country-by-Country Guide",
 description: "Navigate international freelance taxes across 15+ countries. Tax rates, filing requirements, double taxation treaties, and compliance strategies for digital nomads and remote workers.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'International Freelance Taxes Guide - SkillLinkup',
 }
 ],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "International Freelance Taxes 2026: Complete Country-by-Country Guide",
 description: "Navigate international freelance taxes across 15+ countries. Tax rates, filing requirements, double taxation treaties, and compliance strategies for digital nomads and remote workers.",
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 },
 };
}

export default async function InternationalTaxesPage({ params }: Props) {
 const { locale } = await params;

 return (
 <>
 

 <main className="min-h-screen bg-[#f8f9fb]">
 {/* Hero Section */}
 <section className="bg-gradient-to-br from-[#1e1541] via-[#2a1f5e] to-[#1e1541] text-white py-16">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
 International Freelance Taxes: Your Complete 2026 Guide
 </h1>
 <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
 Working across borders? Understand tax obligations in 15+ countries, avoid double taxation, and stay 100% compliant while maximizing your take-home income.
 </p>
 <Link
 href={`/${locale}/tools/invoice-generator`}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Create Professional Invoices →
 </Link>
 </div>
 </div>
 </section>

 {/* Main Content */}
 <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">

 {/* Section 1: Why International Taxes Are Complex */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Why International Freelance Taxes Are So Complex
 </h2>
 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Working with clients in multiple countries creates a tax maze. You might owe taxes in your home country, where you physically work, where your client is located, and where you're legally registered. Getting this wrong can mean double taxation, penalties, or worse.
 </p>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 3 Core Principles of International Taxation
 </h3>
 <ul className="space-y-4">
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3 text-xl">1.</span>
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Tax Residency:</strong>Determined by where you physically spend most of your time (usually 183+ days)
 </span>
 </li>
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3 text-xl">2.</span>
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Source Income:</strong>Where the work is performed vs. where the client is located
 </span>
 </li>
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3 text-xl">3.</span>
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Double Taxation Treaties:</strong>Agreements between countries to prevent paying taxes twice on the same income
 </span>
 </li>
 </ul>
 </div>
 </div>
 </section>

 {/* Section 2: Tax Rates by Country */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Freelance Tax Rates: Country-by-Country Comparison
 </h2>

 <div className="bg-white rounded-lg shadow-lg overflow-x-auto mb-8">
 <table className="w-full">
 <thead>
 <tr className="bg-[#1e1541] text-white">
 <th className="px-6 py-4 text-left font-heading font-semibold">Country</th>
 <th className="px-6 py-4 text-left font-heading font-semibold">Income Tax Rate</th>
 <th className="px-6 py-4 text-left font-heading font-semibold">VAT/Sales Tax</th>
 <th className="px-6 py-4 text-left font-heading font-semibold">Social Security</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-200">
 <tr className="hover:bg-gray-50">
 <td className="px-6 py-4 font-semibold text-[#1e1541]">🇺🇸 United States</td>
 <td className="px-6 py-4 text-[#64607d]">10-37% (federal)</td>
 <td className="px-6 py-4 text-[#64607d]">0-10% (state)</td>
 <td className="px-6 py-4 text-[#64607d]">15.3% (self-employment)</td>
 </tr>
 <tr className="hover:bg-gray-50">
 <td className="px-6 py-4 font-semibold text-[#1e1541]">🇬🇧 United Kingdom</td>
 <td className="px-6 py-4 text-[#64607d]">20-45%</td>
 <td className="px-6 py-4 text-[#64607d]">20%</td>
 <td className="px-6 py-4 text-[#64607d]">9% (Class 4 NI)</td>
 </tr>
 <tr className="hover:bg-gray-50">
 <td className="px-6 py-4 font-semibold text-[#1e1541]">🇳🇱 Netherlands</td>
 <td className="px-6 py-4 text-[#64607d]">37.1-49.5%</td>
 <td className="px-6 py-4 text-[#64607d]">21%</td>
 <td className="px-6 py-4 text-[#64607d]">Included in income tax</td>
 </tr>
 <tr className="hover:bg-gray-50">
 <td className="px-6 py-4 font-semibold text-[#1e1541]">🇩🇪 Germany</td>
 <td className="px-6 py-4 text-[#64607d]">14-45%</td>
 <td className="px-6 py-4 text-[#64607d]">19%</td>
 <td className="px-6 py-4 text-[#64607d]">19.6% (health + pension)</td>
 </tr>
 <tr className="hover:bg-gray-50">
 <td className="px-6 py-4 font-semibold text-[#1e1541]">🇨🇦 Canada</td>
 <td className="px-6 py-4 text-[#64607d]">15-33% (federal)</td>
 <td className="px-6 py-4 text-[#64607d]">5-15% (GST/HST)</td>
 <td className="px-6 py-4 text-[#64607d]">11.9% (CPP + EI)</td>
 </tr>
 <tr className="hover:bg-gray-50">
 <td className="px-6 py-4 font-semibold text-[#1e1541]">🇦🇺 Australia</td>
 <td className="px-6 py-4 text-[#64607d]">19-45%</td>
 <td className="px-6 py-4 text-[#64607d]">10% (GST)</td>
 <td className="px-6 py-4 text-[#64607d]">11% (superannuation)</td>
 </tr>
 <tr className="hover:bg-gray-50">
 <td className="px-6 py-4 font-semibold text-[#1e1541]">🇵🇹 Portugal</td>
 <td className="px-6 py-4 text-[#64607d]">14.5-48%</td>
 <td className="px-6 py-4 text-[#64607d]">23%</td>
 <td className="px-6 py-4 text-[#64607d]">21.4% (mandatory)</td>
 </tr>
 <tr className="hover:bg-gray-50">
 <td className="px-6 py-4 font-semibold text-[#1e1541]">🇪🇸 Spain</td>
 <td className="px-6 py-4 text-[#64607d]">19-47%</td>
 <td className="px-6 py-4 text-[#64607d]">21%</td>
 <td className="px-6 py-4 text-[#64607d]">29.8% (autonomo)</td>
 </tr>
 <tr className="hover:bg-gray-50">
 <td className="px-6 py-4 font-semibold text-[#1e1541]">🇫🇷 France</td>
 <td className="px-6 py-4 text-[#64607d]">11-45%</td>
 <td className="px-6 py-4 text-[#64607d]">20%</td>
 <td className="px-6 py-4 text-[#64607d]">22% (micro-entrepreneur)</td>
 </tr>
 <tr className="hover:bg-gray-50">
 <td className="px-6 py-4 font-semibold text-[#1e1541]">🇮🇹 Italy</td>
 <td className="px-6 py-4 text-[#64607d]">23-43%</td>
 <td className="px-6 py-4 text-[#64607d]">22%</td>
 <td className="px-6 py-4 text-[#64607d]">24% (INPS)</td>
 </tr>
 <tr className="hover:bg-gray-50">
 <td className="px-6 py-4 font-semibold text-[#1e1541]">🇸🇬 Singapore</td>
 <td className="px-6 py-4 text-[#64607d]">2-22%</td>
 <td className="px-6 py-4 text-[#64607d]">8% (GST)</td>
 <td className="px-6 py-4 text-[#64607d]">Optional CPF</td>
 </tr>
 <tr className="hover:bg-gray-50">
 <td className="px-6 py-4 font-semibold text-[#1e1541]">🇦🇪 UAE (Dubai)</td>
 <td className="px-6 py-4 text-[#64607d]">0% (personal)</td>
 <td className="px-6 py-4 text-[#64607d]">5%</td>
 <td className="px-6 py-4 text-[#64607d]">None</td>
 </tr>
 <tr className="hover:bg-gray-50">
 <td className="px-6 py-4 font-semibold text-[#1e1541]">🇲🇽 Mexico</td>
 <td className="px-6 py-4 text-[#64607d]">1.92-35%</td>
 <td className="px-6 py-4 text-[#64607d]">16% (IVA)</td>
 <td className="px-6 py-4 text-[#64607d]">Voluntary IMSS</td>
 </tr>
 <tr className="hover:bg-gray-50">
 <td className="px-6 py-4 font-semibold text-[#1e1541]">🇹🇭 Thailand</td>
 <td className="px-6 py-4 text-[#64607d]">5-35%</td>
 <td className="px-6 py-4 text-[#64607d]">7%</td>
 <td className="px-6 py-4 text-[#64607d]">5% (voluntary)</td>
 </tr>
 <tr className="hover:bg-gray-50">
 <td className="px-6 py-4 font-semibold text-[#1e1541]">🇧🇷 Brazil</td>
 <td className="px-6 py-4 text-[#64607d]">7.5-27.5%</td>
 <td className="px-6 py-4 text-[#64607d]">17-25% (ICMS/ISS)</td>
 <td className="px-6 py-4 text-[#64607d]">20% (INSS)</td>
 </tr>
 </tbody>
 </table>
 </div>

 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg">
 <p className="text-[#1e1541] font-semibold mb-2">
 Important: These Are Baseline Rates
 </p>
 <p className="text-[#64607d]">
 Actual tax liability varies based on deductions, business structure, double taxation treaties, and specific income levels. Always consult a local tax professional for your situation.
 </p>
 </div>
 </section>

 {/* CTA Section 1 */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Track Billable Hours Across Time Zones
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Free time tracker for international clients with automatic timezone conversion
 </p>
 <Link
 href={`/${locale}/tools/time-tracker`}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Start Time Tracker →
 </Link>
 </div>
 </section>

 {/* Section 3: Double Taxation Treaties */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Understanding Double Taxation Treaties
 </h2>

 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Double taxation treaties (DTT) prevent you from paying income tax twice on the same earnings. Most developed countries have extensive treaty networks. Here's how they work:
 </p>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 How Double Taxation Relief Works
 </h3>
 <div className="space-y-6">
 <div>
 <h4 className="font-semibold text-[#1e1541] mb-2">Method 1: Tax Credit</h4>
 <p className="text-[#64607d]">
 Pay tax in the source country, then claim a credit for that amount in your home country. This is the most common method.
 </p>
 <div className="bg-gray-50 rounded p-4 mt-2">
 <p className="text-sm text-[#64607d] font-mono">
 Example: Earn $50,000 from US client → Pay $7,500 US tax → Owe $15,000 in home country → Claim $7,500 credit → Net home country tax = $7,500
 </p>
 </div>
 </div>

 <div>
 <h4 className="font-semibold text-[#1e1541] mb-2">Method 2: Tax Exemption</h4>
 <p className="text-[#64607d]">
 Income earned abroad is completely exempt from home country taxation (less common).
 </p>
 <div className="bg-gray-50 rounded p-4 mt-2">
 <p className="text-sm text-[#64607d] font-mono">
 Example: Foreign earned income exclusion (US) allows excluding up to $120,000 (2026) of foreign income
 </p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 Countries with Extensive Treaty Networks
 </h3>
 <div className="grid md:grid-cols-2 gap-4">
 <div>
 <h4 className="font-semibold text-[#1e1541] mb-2">100+ Treaties:</h4>
 <ul className="text-[#64607d] space-y-1">
 <li>• United Kingdom (130+)</li>
 <li>• France (120+)</li>
 <li>• Netherlands (100+)</li>
 <li>• Germany (90+)</li>
 </ul>
 </div>
 <div>
 <h4 className="font-semibold text-[#1e1541] mb-2">50+ Treaties:</h4>
 <ul className="text-[#64607d] space-y-1">
 <li>• United States (60+)</li>
 <li>• Canada (90+)</li>
 <li>• Australia (45+)</li>
 <li>• Singapore (85+)</li>
 </ul>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Section 4: Tax Residency Rules */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Tax Residency: The 183-Day Rule Explained
 </h2>

 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Most countries use the "183-day rule" to determine tax residency. Spend 183+ days in a country during a tax year, and you're typically considered a tax resident. But it's more nuanced than that.
 </p>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 4 Common Tax Residency Scenarios for Digital Nomads
 </h3>

 <div className="space-y-6">
 <div className="border-l-4 border-[#ef2b70] pl-4">
 <h4 className="font-semibold text-[#1e1541] mb-2">Scenario 1: Single Tax Resident</h4>
 <p className="text-[#64607d] mb-2">
 You spend 183+ days in one country. Simple: you're a tax resident there.
 </p>
 <p className="text-sm text-[#64607d] italic">
 Tax obligation: File and pay taxes in that country only (unless your home country has citizenship-based taxation like the US)
 </p>
 </div>

 <div className="border-l-4 border-[#ef2b70] pl-4">
 <h4 className="font-semibold text-[#1e1541] mb-2">Scenario 2: No Tax Residence ("Perpetual Traveler")</h4>
 <p className="text-[#64607d] mb-2">
 You spend &lt;183 days in every country. Technically, you might not be a tax resident anywhere.
 </p>
 <p className="text-sm text-[#64607d] italic">
 Tax obligation: Many countries have "tie-breaker" rules. Usually defaults to where your "permanent home" or "center of vital interests" is located. High audit risk.
 </p>
 </div>

 <div className="border-l-4 border-[#ef2b70] pl-4">
 <h4 className="font-semibold text-[#1e1541] mb-2">Scenario 3: Dual Tax Resident</h4>
 <p className="text-[#64607d] mb-2">
 You spend significant time in two countries (e.g., 180 days in each).
 </p>
 <p className="text-sm text-[#64607d] italic">
 Tax obligation: Double taxation treaty determines primary residence using tie-breaker tests (permanent home → center of vital interests → habitual abode → citizenship)
 </p>
 </div>

 <div className="border-l-4 border-[#ef2b70] pl-4">
 <h4 className="font-semibold text-[#1e1541] mb-2">Scenario 4: Citizenship-Based Taxation (US Citizens)</h4>
 <p className="text-[#64607d] mb-2">
 US citizens must file and potentially pay US taxes regardless of where they live.
 </p>
 <p className="text-sm text-[#64607d] italic">
 Tax obligation: File US taxes annually. Use Foreign Earned Income Exclusion ($120,000 in 2026) or Foreign Tax Credit to reduce liability.
 </p>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Section 5: Compliance Checklist */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 International Tax Compliance Checklist
 </h2>

 <div className="space-y-4">
 <div className="bg-white rounded-lg shadow p-6">
 <div className="flex items-start">
 <input type="checkbox" className="mt-1 mr-4 w-5 h-5 text-[#ef2b70]" />
 <div>
 <h3 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 Track Your Physical Location
 </h3>
 <p className="text-[#64607d]">
 Use apps like TravelSpend, Nomad List, or a simple spreadsheet to track days spent in each country. Border stamps, flight records, and hotel receipts are proof.
 </p>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <div className="flex items-start">
 <input type="checkbox" className="mt-1 mr-4 w-5 h-5 text-[#ef2b70]" />
 <div>
 <h3 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 Determine Your Tax Residency Status Annually
 </h3>
 <p className="text-[#64607d]">
 Before January 31st each year, calculate where you spent the most time and determine your primary tax residence.
 </p>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <div className="flex items-start">
 <input type="checkbox" className="mt-1 mr-4 w-5 h-5 text-[#ef2b70]" />
 <div>
 <h3 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 Register in Your Tax Residence Country
 </h3>
 <p className="text-[#64607d]">
 Get a local tax ID number (TIN, NIF, ABN, etc.) and register as self-employed if required by local law.
 </p>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <div className="flex items-start">
 <input type="checkbox" className="mt-1 mr-4 w-5 h-5 text-[#ef2b70]" />
 <div>
 <h3 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 Maintain Proper Invoices for International Clients
 </h3>
 <p className="text-[#64607d] mb-3">
 Include VAT/GST numbers if applicable, specify currency, and clearly state payment terms. Use professional invoicing software.
 </p>
 <Link
 href={`/${locale}/tools/invoice-generator`}
 className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
 >
 Create International Invoice →
 </Link>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <div className="flex items-start">
 <input type="checkbox" className="mt-1 mr-4 w-5 h-5 text-[#ef2b70]" />
 <div>
 <h3 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 File Tax Returns in All Applicable Countries
 </h3>
 <p className="text-[#64607d]">
 Even if you owe $0 due to treaties, you often still need to file. US citizens must file regardless. Missed deadlines = penalties.
 </p>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <div className="flex items-start">
 <input type="checkbox" className="mt-1 mr-4 w-5 h-5 text-[#ef2b70]" />
 <div>
 <h3 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 Claim Treaty Benefits Correctly
 </h3>
 <p className="text-[#64607d]">
 Use form W-8BEN (US), certificate of residence, or equivalent documents to prove treaty eligibility and reduce withholding tax.
 </p>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <div className="flex items-start">
 <input type="checkbox" className="mt-1 mr-4 w-5 h-5 text-[#ef2b70]" />
 <div>
 <h3 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 Hire a Cross-Border Tax Specialist
 </h3>
 <p className="text-[#64607d]">
 Cost: $500-$2,500/year. Worth it to avoid penalties of 20-40% of unpaid taxes plus interest. Look for CPAs/accountants with international experience.
 </p>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <div className="flex items-start">
 <input type="checkbox" className="mt-1 mr-4 w-5 h-5 text-[#ef2b70]" />
 <div>
 <h3 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 Report Foreign Bank Accounts (FBAR, FATCA)
 </h3>
 <p className="text-[#64607d]">
 US persons with $10,000+ in foreign accounts must file FBAR. Many countries have similar reporting requirements. Penalties for non-compliance are severe ($10,000+).
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
 Calculate Your True Hourly Rate
 </h3>
 <p className="text-xl mb-6 text-gray-300">
 Factor in taxes, fees, and expenses to set profitable international rates
 </p>
 <Link
 href={`/${locale}/tools/rate-calculator`}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Calculate Your Rate →
 </Link>
 </div>
 </section>

 {/* Section 6: Common Mistakes */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 7 Costly International Tax Mistakes to Avoid
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake 1: Assuming No Tax Residence = No Tax Obligation
 </h3>
 <p className="text-[#64607d]">
 Even if you're a perpetual traveler, tax authorities can deem you a resident based on citizenship, permanent home, or family location. You can't escape taxes by constantly moving.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake 2: Not Reporting Cryptocurrency Income
 </h3>
 <p className="text-[#64607d]">
 Paid in crypto? It's taxable income at the fair market value when received. Exchanging crypto-to-crypto is also a taxable event in most countries. Track every transaction.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake 3: Ignoring VAT/GST Registration Thresholds
 </h3>
 <p className="text-[#64607d]">
 Earning €100,000 from EU clients while not VAT-registered? You might owe back-taxes on 20%+ of your revenue. Thresholds vary: UK £90k, Germany €22k, Netherlands €20k.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake 4: Mixing Personal and Business Expenses
 </h3>
 <p className="text-[#64607d]">
 One bank account for everything = audit nightmare. Separate accounts make tax filing 10x easier and reduce audit risk. Deduct legitimate business expenses only.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake 5: Not Withholding Client Taxes Properly
 </h3>
 <p className="text-[#64607d]">
 US clients may withhold 30% from payments to foreign contractors without a W-8BEN form. Get treaty benefits documented BEFORE you start work.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake 6: Using "Tax Haven" Corporations Incorrectly
 </h3>
 <p className="text-[#64607d]">
 Setting up a company in Estonia, Dubai, or Singapore doesn't automatically reduce your personal tax burden. If YOU live in a high-tax country, YOU still pay personal income tax.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake 7: Not Keeping Records for 7+ Years
 </h3>
 <p className="text-[#64607d]">
 Tax audits can go back 3-7 years (or unlimited for fraud). Keep all invoices, receipts, contracts, and travel records digitally backed up.
 </p>
 </div>
 </div>
 </section>

 {/* Section 7: Next Steps */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Your International Tax Action Plan
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 1
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Document Your Tax Residency
 </h3>
 <p className="text-[#64607d] mb-3">
 Track days spent in each country this year. Determine your primary tax residence using the 183-day rule and tie-breaker tests.
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 2
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Find a Cross-Border Tax Professional
 </h3>
 <p className="text-[#64607d] mb-3">
 Search for "international tax accountant [your location]" or use platforms like Upwork to find specialists. Budget $500-$2,500 annually.
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
 >
 Find Tax Professionals on Upwork →
 </Link>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 3
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Set Up Compliant Invoicing Systems
 </h3>
 <p className="text-[#64607d] mb-3">
 Create invoices that meet international standards with proper tax information, payment terms, and legal requirements.
 </p>
 <Link
 href={`/${locale}/tools/invoice-generator`}
 className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
 >
 Create International Invoice →
 </Link>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 4
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Learn About Legal Structures
 </h3>
 <p className="text-[#64607d] mb-3">
 Should you operate as a sole proprietor, LLC, or corporation? The right structure can save thousands in taxes.
 </p>
 <Link
 href={`/${locale}/gids/zakelijk-beheer/freelance-legal-structure`}
 className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
 >
 Compare Legal Structures →
 </Link>
 </div>
 </div>
 </div>
 </section>

 {/* Final CTA */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Master International Freelance Business
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Get our complete guide to running a compliant global freelance business
 </p>
 <Link
 href={`/${locale}/newsletter`}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Download Free International Tax Checklist →
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
 "headline": "International Freelance Taxes 2026: Complete Country-by-Country Guide",
 "description": "Navigate international freelance taxes across 15+ countries. Tax rates, filing requirements, double taxation treaties, and compliance strategies for digital nomads and remote workers.",
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
 "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/zakelijk-beheer/freelance-taxes-international`
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
 "name": "How to Handle International Freelance Taxes",
 "description": "Step-by-step guide to managing taxes as an international freelancer",
 "step": [
 {
 "@type": "HowToStep",
 "name": "Track Your Physical Location",
 "text": "Document days spent in each country to determine tax residency status"
 },
 {
 "@type": "HowToStep",
 "name": "Determine Tax Residency",
 "text": "Calculate where you spent 183+ days and identify your primary tax residence"
 },
 {
 "@type": "HowToStep",
 "name": "Register for Taxes",
 "text": "Get a local tax ID and register as self-employed in your tax residence country"
 },
 {
 "@type": "HowToStep",
 "name": "Claim Treaty Benefits",
 "text": "Use double taxation treaties to avoid paying taxes twice on the same income"
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
 "name": "International Freelance Taxes",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/zakelijk-beheer/freelance-taxes-international`
 }
 ]
 })
 }}
 />
 </main>

 
 </>
 );
}
