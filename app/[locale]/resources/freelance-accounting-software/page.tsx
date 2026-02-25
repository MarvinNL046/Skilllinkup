import { Metadata } from 'next';
import Link from 'next/link';
import { DollarSign, CheckCircle, Zap, Calculator, FileText, TrendingUp, Shield, Clock } from 'lucide-react';

interface PageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'freelance-accounting-software';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

 return {
 title: 'Freelance Accounting Software: Track Income, Expenses, and Taxes',
 description: 'Best accounting software for freelancers. Track income, manage expenses, calculate taxes, and stay compliant. Compare QuickBooks, FreshBooks, Wave, and more.',
 keywords: 'freelance accounting, expense tracking, tax software, income tracking, bookkeeping',
 openGraph: {
 title: 'Best Accounting Software for Freelancers',
 description: 'Track income, expenses, and taxes with top accounting tools for freelancers.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/resources-og.png`,
 width: 1200,
 height: 630,
 alt: 'Best Accounting Software for Freelancers',
 }
 ],
 locale: locale === 'nl' ? 'nl_NL' : 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Freelance Accounting Software: Track Income, Expenses, and Taxes',
 description: 'Best accounting software for freelancers. Track income, manage expenses, calculate taxes, and stay compliant. Compare QuickBooks, FreshBooks, Wave, and more.',
 images: [`${siteUrl}/images/og/resources-og.png`],
 creator: '@SkillLinkup',
 site: '@SkillLinkup',
 },
 alternates: {
 canonical: pageUrl,
 languages: {
 'en': `${siteUrl}/en/resources/${slug}`,
 'nl': `${siteUrl}/nl/resources/${slug}`,
 },
 },
 robots: {
 index: true,
 follow: true,
 googleBot: {
 index: true,
 follow: true,
 'max-video-preview': -1,
 'max-image-preview': 'large',
 'max-snippet': -1,
 },
 },
 };
}

export default async function AccountingSoftwarePage({ params }: PageProps) {
 const { locale } = await params;
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

 const articleSchema = {
 '@context': 'https://schema.org',
 '@type': 'Article',
 headline: 'Freelance Accounting Software: Track Income, Expenses, and Taxes',
 description: 'Best accounting software for freelancers.',
 author: { '@type': 'Organization', name: 'SkillLinkup' },
 publisher: {
 '@type': 'Organization',
 name: 'SkillLinkup',
 logo: { '@type': 'ImageObject', url: `${siteUrl}/images/logo/skilllinkup-transparant-rozepunt.webp` },
 },
 datePublished: '2026-01-15',
 };

 return (
 <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} /><main className="flex-1 bg-gray-50 dark:bg-gray-900">{/* Hero */}
 <section className="bg-gradient-to-br from-accent via-accent-dark to-primary py-16 sm:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-4xl mx-auto text-center"><div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6"><DollarSign className="w-8 h-8 text-white" /></div><h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">Freelance Accounting Software: Track Income, Expenses, and Taxes
 </h1><p className="text-xl text-white/90 mb-8">Master your freelance finances with the right accounting tools. Track every dollar, prepare for taxes, and make data-driven business decisions.
 </p><div className="flex flex-wrap gap-4 justify-center"><Link href={`/${locale}/tools/rate-calculator`} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-accent rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg"><Calculator className="w-5 h-5" />Calculate Your Rates
 </Link></div></div></div></section>{/* Content */}
 <article className="py-16"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-4xl mx-auto"><div className="prose prose-lg dark:prose-invert max-w-none"><p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-accent pl-6 py-2 mb-8">Financial management is the difference between a sustainable freelance career and constant stress. Proper accounting software helps you track income, manage expenses, calculate taxes, and understand your business health—all without a finance degree.
 </p><h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Why Freelancers Need Accounting Software
 </h2><p className="text-gray-700 dark:text-gray-300 mb-6">As a freelancer, you're running a business—even if you're a one-person operation. Unlike employees with automatic tax withholding and employer benefits, freelancers must manage their own finances, set aside tax money, and track every business expense for deductions.
 </p><p className="text-gray-700 dark:text-gray-300 mb-6">Without proper tracking, you'll overpay on taxes (by missing deductions), underpay estimated taxes (leading to penalties), or simply have no idea if your business is actually profitable.
 </p><div className="grid md:grid-cols-3 gap-6 my-8"><div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"><TrendingUp className="w-10 h-10 text-accent mb-3" /><h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Know Your Profitability</h3><p className="text-gray-600 dark:text-gray-400 text-sm">Track real profit after all expenses and taxes</p></div><div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"><Shield className="w-10 h-10 text-accent mb-3" /><h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Tax Compliance</h3><p className="text-gray-600 dark:text-gray-400 text-sm">Organized records for audit protection and easy filing</p></div><div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"><DollarSign className="w-10 h-10 text-accent mb-3" /><h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Maximize Deductions</h3><p className="text-gray-600 dark:text-gray-400 text-sm">Capture every deductible expense to reduce tax burden</p></div></div><h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Essential Accounting Features for Freelancers
 </h2><ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2"><li><strong>Income tracking:</strong>Record all payments from clients automatically</li><li><strong>Expense categorization:</strong>Organize spending by tax-deductible categories</li><li><strong>Receipt capture:</strong>Photo receipts with your phone for digital records</li><li><strong>Mileage tracking:</strong>Track business driving for deductions</li><li><strong>Bank connections:</strong>Sync bank accounts for automatic transaction import</li><li><strong>Tax calculations:</strong>Estimate quarterly tax payments</li><li><strong>Profit & loss reports:</strong>See business performance at a glance</li><li><strong>Invoice integration:</strong>Connect invoicing with accounting</li></ul><h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Top Accounting Software for Freelancers
 </h2><h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Wave (Free)
 </h3><div className="bg-gradient-to-r from-accent/10 to-primary/10 dark:from-accent/20 dark:to-primary/20 rounded-xl p-6 my-6 border-l-4 border-accent"><div className="flex items-start justify-between mb-4"><h4 className="text-xl font-bold text-gray-900 dark:text-white">Best Free Option</h4><span className="px-3 py-1 bg-accent text-white text-sm font-semibold rounded-full">FREE</span></div><p className="text-gray-700 dark:text-gray-300 mb-4">Completely free accounting software with invoicing, expense tracking, and financial reports. Monetizes through optional paid payment processing.
 </p><div className="grid md:grid-cols-2 gap-4 mb-4"><div><p className="font-semibold text-gray-900 dark:text-white mb-2">✅ Pros</p><ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1"><li>• Completely free forever</li><li>• Unlimited invoices and expenses</li><li>• Bank connection included</li><li>• Receipt scanning via mobile</li><li>• Clean, simple interface</li></ul></div><div><p className="font-semibold text-gray-900 dark:text-white mb-2">❌ Cons</p><ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1"><li>• US, Canada, UK only</li><li>• Limited tax features</li><li>• No time tracking</li><li>• Fees for payment processing</li></ul></div></div><p className="text-sm text-gray-600 dark:text-gray-400"><strong>Best for:</strong>New freelancers who need solid accounting without monthly fees. Perfect for US/Canada/UK freelancers.
 </p></div><h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. QuickBooks Self-Employed (Paid)
 </h3><div className="bg-white dark:bg-gray-800 rounded-xl p-6 my-6 border border-gray-200 dark:border-gray-700"><div className="flex items-start justify-between mb-4"><h4 className="text-xl font-bold text-gray-900 dark:text-white">Most Comprehensive</h4><span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-semibold rounded-full">$15/mo</span></div><p className="text-gray-700 dark:text-gray-300 mb-4">Industry-leading accounting specifically designed for freelancers and solopreneurs. Excellent tax features including quarterly tax estimates and mileage tracking.
 </p><div className="space-y-2 mb-4"><div className="flex items-center gap-2 text-gray-700 dark:text-gray-300"><CheckCircle className="w-5 h-5 text-accent flex-shrink-0" /><span>Automatic quarterly tax calculations</span></div><div className="flex items-center gap-2 text-gray-700 dark:text-gray-300"><CheckCircle className="w-5 h-5 text-accent flex-shrink-0" /><span>Built-in mileage tracker with GPS</span></div><div className="flex items-center gap-2 text-gray-700 dark:text-gray-300"><CheckCircle className="w-5 h-5 text-accent flex-shrink-0" /><span>Schedule C tax form preparation</span></div><div className="flex items-center gap-2 text-gray-700 dark:text-gray-300"><CheckCircle className="w-5 h-5 text-accent flex-shrink-0" /><span>Year-end tax package for accountant</span></div></div><p className="text-sm text-gray-600 dark:text-gray-400"><strong>Best for:</strong>US freelancers serious about tax optimization and who drive for work frequently.
 </p></div><h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. FreshBooks (Paid)
 </h3><div className="bg-white dark:bg-gray-800 rounded-xl p-6 my-6 border border-gray-200 dark:border-gray-700"><div className="flex items-start justify-between mb-4"><h4 className="text-xl font-bold text-gray-900 dark:text-white">Best All-in-One</h4><span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-semibold rounded-full">$17/mo</span></div><p className="text-gray-700 dark:text-gray-300 mb-4">Beautiful, user-friendly platform combining invoicing, expenses, time tracking, and accounting. Popular with creative freelancers.
 </p><p className="text-sm text-gray-600 dark:text-gray-400"><strong>Best for:</strong>Freelancers who want professional invoicing integrated with expense tracking.
 </p></div><h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Xero (Paid)
 </h3><div className="bg-white dark:bg-gray-800 rounded-xl p-6 my-6 border border-gray-200 dark:border-gray-700"><div className="flex items-start justify-between mb-4"><h4 className="text-xl font-bold text-gray-900 dark:text-white">Best International Option</h4><span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-semibold rounded-full">$13/mo</span></div><p className="text-gray-700 dark:text-gray-300 mb-4">Cloud-based accounting with multi-currency support and strong international tax compliance features. Excellent for freelancers with global clients.
 </p><p className="text-sm text-gray-600 dark:text-gray-400"><strong>Best for:</strong>International freelancers working across borders with multiple currencies.
 </p></div><h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. Bonsai (Paid)
 </h3><div className="bg-white dark:bg-gray-800 rounded-xl p-6 my-6 border border-gray-200 dark:border-gray-700"><div className="flex items-start justify-between mb-4"><h4 className="text-xl font-bold text-gray-900 dark:text-white">Best Complete Suite</h4><span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-semibold rounded-full">$24/mo</span></div><p className="text-gray-700 dark:text-gray-300 mb-4">All-in-one platform for freelancers: contracts, proposals, invoicing, time tracking, expenses, and taxes. Built specifically for freelancers.
 </p><p className="text-sm text-gray-600 dark:text-gray-400"><strong>Best for:</strong>Freelancers who want everything in one place and are willing to pay for convenience.
 </p></div><h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Understanding Freelance Tax Basics
 </h2><p className="text-gray-700 dark:text-gray-300 mb-6">One of the biggest adjustments for new freelancers is handling taxes. Here's what you need to know:
 </p><h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Quarterly Estimated Taxes (US)
 </h3><p className="text-gray-700 dark:text-gray-300 mb-4">Unlike employees, freelancers must pay taxes quarterly to avoid penalties:
 </p><ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2"><li><strong>Q1:</strong>April 15 (January-March income)</li><li><strong>Q2:</strong>June 15 (April-May income)</li><li><strong>Q3:</strong>September 15 (June-August income)</li><li><strong>Q4:</strong>January 15 (September-December income)</li></ul><p className="text-gray-700 dark:text-gray-300 mb-6">Set aside approximately 25-30% of your gross income for federal and state taxes. QuickBooks and similar tools calculate these automatically.
 </p><h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Self-Employment Tax
 </h3><p className="text-gray-700 dark:text-gray-300 mb-6">In addition to income tax, freelancers pay self-employment tax (15.3%) which covers Social Security and Medicare. This is automatic for employees but must be calculated and paid by freelancers.
 </p><div className="bg-accent/10 dark:bg-accent/20 border border-accent/30 rounded-xl p-6 my-6"><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Tax Tip: The Safe Harbor Rule</h3><p className="text-gray-700 dark:text-gray-300 mb-3">To avoid penalties, pay at least 90% of current year's tax or 100% of last year's tax (110% if income &gt;$150k). Many freelancers use the previous year's number for simplicity.
 </p></div><h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Common Tax-Deductible Expenses
 </h2><p className="text-gray-700 dark:text-gray-300 mb-6">Proper expense tracking can save thousands in taxes. Common deductions for freelancers:
 </p><div className="bg-white dark:bg-gray-800 rounded-xl p-6 my-6 border border-gray-200 dark:border-gray-700"><div className="grid md:grid-cols-2 gap-6"><div><h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">✅ Fully Deductible</h3><ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2"><li>• Software and subscriptions</li><li>• Professional development courses</li><li>• Business insurance</li><li>• Office supplies</li><li>• Professional services (lawyer, accountant)</li><li>• Business travel and accommodations</li><li>• Marketing and advertising</li><li>• Website hosting and domains</li></ul></div><div><h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Partially Deductible</h3><ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2"><li>• Home office (based on square footage)</li><li>• Internet/phone (business use %)</li><li>• Business meals (50% deductible)</li><li>• Vehicle expenses (business miles only)</li><li>• Computer equipment (may need depreciation)</li></ul></div></div></div><h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Setting Up Your Accounting System
 </h2><p className="text-gray-700 dark:text-gray-300 mb-6">Follow these steps to get your accounting organized:
 </p><div className="bg-white dark:bg-gray-800 rounded-xl p-6 my-6 border border-gray-200 dark:border-gray-700"><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Step 1: Separate Business and Personal</h3><p className="text-gray-700 dark:text-gray-300 mb-4">Open a dedicated business bank account and credit card. This simplifies bookkeeping and looks professional to the IRS.
 </p><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Step 2: Choose and Set Up Software</h3><p className="text-gray-700 dark:text-gray-300 mb-4">Start with Wave if you're budget-conscious. Connect your bank account for automatic transaction import.
 </p><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Step 3: Create Expense Categories</h3><p className="text-gray-700 dark:text-gray-300 mb-4">Set up categories matching IRS Schedule C categories: advertising, office supplies, professional services, travel, etc.
 </p><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Step 4: Establish a Routine</h3><p className="text-gray-700 dark:text-gray-300">Categorize expenses weekly (15 minutes). Review financials monthly. Prepare quarterly tax estimates. This prevents year-end chaos.
 </p></div><h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Financial Reports Every Freelancer Needs
 </h2><p className="text-gray-700 dark:text-gray-300 mb-6">Your accounting software should generate these key reports:
 </p><div className="space-y-4 mb-6"><div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700"><h3 className="font-bold text-gray-900 dark:text-white mb-2">Profit & Loss Statement (P&L)</h3><p className="text-gray-700 dark:text-gray-300 text-sm">Shows income minus expenses over a period. Review monthly to understand profitability and identify spending patterns.
 </p></div><div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700"><h3 className="font-bold text-gray-900 dark:text-white mb-2">Balance Sheet</h3><p className="text-gray-700 dark:text-gray-300 text-sm">Snapshot of assets, liabilities, and equity. Important for loan applications or when selling your business.
 </p></div><div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700"><h3 className="font-bold text-gray-900 dark:text-white mb-2">Expense Report</h3><p className="text-gray-700 dark:text-gray-300 text-sm">Categorized spending breakdown. Identify areas to cut costs and maximize tax deductions.
 </p></div><div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700"><h3 className="font-bold text-gray-900 dark:text-white mb-2">Tax Summary</h3><p className="text-gray-700 dark:text-gray-300 text-sm">Year-to-date income, expenses, and estimated tax liability. Essential for quarterly tax planning.
 </p></div></div><h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Working With an Accountant
 </h2><p className="text-gray-700 dark:text-gray-300 mb-6">Even with great software, many freelancers benefit from professional help:
 </p><div className="grid md:grid-cols-2 gap-6 my-6"><div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6"><h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-3">✅ Consider an Accountant When:</h3><ul className="text-sm text-green-800 dark:text-green-200 space-y-2"><li>• Earning over $50k annually</li><li>• Complex tax situations (multiple states, international)</li><li>• Significant business expenses to optimize</li><li>• Hiring contractors or employees</li><li>• Facing an audit or tax issue</li></ul></div><div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6"><h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-3">What They Do:</h3><ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2"><li>• Review your books quarterly</li><li>• Identify missed deductions</li><li>• File annual tax returns</li><li>• Provide strategic tax planning</li><li>• Answer complex tax questions</li></ul></div></div><p className="text-gray-700 dark:text-gray-300 mb-6"><strong>Cost:</strong>Expect to pay $500-2000 for annual tax filing, or $200-500/month for ongoing bookkeeping. Many accountants offer discounted rates if you use organized accounting software like QuickBooks.
 </p><h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Common Accounting Mistakes
 </h2><div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 my-6"><ul className="space-y-3"><li className="text-red-800 dark:text-red-200"><strong>❌ Mixing Personal and Business Expenses:</strong>Makes bookkeeping painful and raises audit flags.
 </li><li className="text-red-800 dark:text-red-200"><strong>❌ Not Saving for Taxes:</strong>Set aside 25-30% of every payment immediately.
 </li><li className="text-red-800 dark:text-red-200"><strong>❌ Losing Receipts:</strong>Use mobile apps to photograph receipts immediately.
 </li><li className="text-red-800 dark:text-red-200"><strong>❌ Waiting Until Tax Season:</strong>Categorize expenses weekly, not yearly.
 </li><li className="text-red-800 dark:text-red-200"><strong>❌ Ignoring Quarterly Taxes:</strong>Leads to penalties and cash flow problems.
 </li></ul></div><div className="bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-xl p-6 my-6 border-l-4 border-primary"><h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Calculate Your Rates Correctly</h3><p className="text-gray-700 dark:text-gray-300 mb-4">Many freelancers underprice because they don't account for taxes, expenses, and non-billable time. Our rate calculator helps you determine what you need to charge to hit your income goals after all costs.
 </p><Link href={`/${locale}/tools/rate-calculator`} className="inline-flex items-center gap-2 text-primary dark:text-accent font-semibold hover:underline">Calculate Your Ideal Rate →
 </Link></div><h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Audit Protection and Record Keeping
 </h2><p className="text-gray-700 dark:text-gray-300 mb-6">While audits are rare, proper record keeping protects you:
 </p><ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2"><li><strong>Keep records for 7 years:</strong>IRS can audit up to 6 years back in some cases</li><li><strong>Document everything:</strong>Receipts, invoices, bank statements, contracts</li><li><strong>Backup digitally:</strong>Cloud storage prevents loss from disasters</li><li><strong>Be honest:</strong>Don't claim personal expenses as business</li><li><strong>Stay organized:</strong>Good accounting software makes audits painless</li></ul></div>{/* CTA */}
 <div className="bg-gradient-to-br from-accent via-accent-dark to-primary rounded-2xl p-8 md:p-12 text-center mt-16 shadow-2xl"><h2 className="text-3xl font-bold text-white mb-4">Master Your Freelance Finances
 </h2><p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Start with our free rate calculator to ensure you're charging enough to cover taxes and expenses. Then use our time tracker and invoice generator to manage your business professionally.
 </p><div className="flex flex-wrap gap-4 justify-center"><Link href={`/${locale}/tools/rate-calculator`} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-accent rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg"><Calculator className="w-5 h-5" />Calculate Your Rates
 </Link><Link href={`/${locale}/tools`} className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition-all">Browse All Tools
 </Link></div></div>{/* Related */}
 <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700"><h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Complete Financial Toolkit</h2><div className="grid md:grid-cols-3 gap-6"><Link href={`/${locale}/tools/rate-calculator`} className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-accent transition-all"><Calculator className="w-8 h-8 text-accent mb-3" /><h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent">Rate Calculator</h3><p className="text-gray-600 dark:text-gray-400 text-sm">Calculate rates that cover all costs and taxes</p></Link><Link href={`/${locale}/tools/time-tracker`} className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-accent transition-all"><Clock className="w-8 h-8 text-accent mb-3" /><h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent">Time Tracker</h3><p className="text-gray-600 dark:text-gray-400 text-sm">Track billable hours for accurate income reporting</p></Link><Link href={`/${locale}/tools/invoice-generator`} className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-accent transition-all"><FileText className="w-8 h-8 text-accent mb-3" /><h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent">Invoice Generator</h3><p className="text-gray-600 dark:text-gray-400 text-sm">Create professional invoices with tax calculations</p></Link></div></div></div></div></article></main></>);
}
