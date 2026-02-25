import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Download, CheckCircle, Zap, DollarSign, Shield, Clock } from 'lucide-react';

interface PageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata>{
 const { locale } = await params;
 const slug = 'freelance-invoice-generator';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

 return {
 title: 'Freelance Invoice Generator: Create Professional Invoices in Minutes',
 description: 'Free invoice generator for freelancers. Create, customize, and download professional invoices as PDF. Add logo, calculate taxes, and get paid faster.',
 keywords: 'invoice generator, freelance invoice, create invoice, PDF invoice, invoice template',
 openGraph: {
 title: 'Free Invoice Generator for Freelancers',
 description: 'Create professional invoices in minutes. Free, no signup required.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Free Invoice Generator for Freelancers' }],
 locale: locale === 'nl' ? 'nl_NL' : 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Freelance Invoice Generator: Create Professional Invoices in Minutes',
 description: 'Free invoice generator for freelancers. Create, customize, and download professional invoices as PDF.',
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
 googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
 },
 };
}

export default async function InvoiceGeneratorPage({ params }: PageProps) {
 const { locale } = await params;
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

 const articleSchema = {
 '@context': 'https://schema.org',
 '@type': 'Article',
 headline: 'Freelance Invoice Generator: Create Professional Invoices in Minutes',
 description: 'Free invoice generator for freelancers.',
 author: { '@type': 'Organization', name: 'SkillLinkup' },
 publisher: {
 '@type': 'Organization',
 name: 'SkillLinkup',
 logo: { '@type': 'ImageObject', url: `${siteUrl}/images/logo/skilllinkup-transparant-rozepunt.webp` },
 },
 datePublished: '2026-01-15',
 };

 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

 
 <main className="flex-1 bg-gray-50 dark:bg-gray-900">
 {/* Hero */}
 <section className="bg-gradient-to-br from-primary via-primary-dark to-secondary py-16 sm:py-24">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
 <FileText className="w-8 h-8 text-white" />
 </div>
 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
 Create Professional Invoices in Minutes
 </h1>
 <p className="text-xl text-white/90 mb-8">
 Free invoice generator for freelancers. Add your logo, customize line items, calculate taxes, and download as PDF. No signup required.
 </p>
 <div className="flex flex-wrap gap-4 justify-center">
 <Link href={`/${locale}/tools/invoice-generator`} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg">
 <FileText className="w-5 h-5" />
 Generate Invoice Now
 </Link>
 </div>
 </div>
 </div>
 </section>

 {/* Content */}
 <article className="py-16">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto">
 <div className="prose prose-lg dark:prose-invert max-w-none">
 <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-primary dark:border-accent pl-6 py-2 mb-8">
 Professional invoicing is crucial for getting paid on time and maintaining a credible freelance business. Our free invoice generator helps you create polished, branded invoices in minutes—no complicated software or monthly fees required.
 </p>

 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
 Why Professional Invoices Matter
 </h2>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 Your invoice is often your last touchpoint with a client for each project. A professional, well-designed invoice reinforces your credibility and makes it easier for clients to process payment quickly. Studies show that freelancers who use professional invoicing get paid 30% faster than those who send informal bills.
 </p>

 <div className="grid md:grid-cols-3 gap-6 my-8">
 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
 <DollarSign className="w-10 h-10 text-primary dark:text-accent mb-3" />
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Faster Payments</h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm">Clear, professional invoices get paid 30% faster on average</p>
 </div>
 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
 <Shield className="w-10 h-10 text-primary dark:text-accent mb-3" />
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Legal Protection</h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm">Proper documentation protects you in payment disputes</p>
 </div>
 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
 <CheckCircle className="w-10 h-10 text-primary dark:text-accent mb-3" />
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Tax Compliance</h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm">Organized invoices simplify tax filing and audits</p>
 </div>
 </div>

 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
 Essential Invoice Components
 </h2>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 Every professional invoice should include these critical elements:
 </p>

 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 my-6 border border-gray-200 dark:border-gray-700">
 <ul className="space-y-4">
 <li className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
 <div>
 <strong className="text-gray-900 dark:text-white">Your Business Details:</strong>
 <p className="text-gray-700 dark:text-gray-300 text-sm">Name, address, tax/VAT number, contact information</p>
 </div>
 </li>
 <li className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
 <div>
 <strong className="text-gray-900 dark:text-white">Client Information:</strong>
 <p className="text-gray-700 dark:text-gray-300 text-sm">Client name, company, billing address</p>
 </div>
 </li>
 <li className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
 <div>
 <strong className="text-gray-900 dark:text-white">Invoice Number:</strong>
 <p className="text-gray-700 dark:text-gray-300 text-sm">Unique identifier for tracking and accounting</p>
 </div>
 </li>
 <li className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
 <div>
 <strong className="text-gray-900 dark:text-white">Dates:</strong>
 <p className="text-gray-700 dark:text-gray-300 text-sm">Invoice date and payment due date</p>
 </div>
 </li>
 <li className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
 <div>
 <strong className="text-gray-900 dark:text-white">Itemized Services:</strong>
 <p className="text-gray-700 dark:text-gray-300 text-sm">Description, quantity, rate, and amount for each line item</p>
 </div>
 </li>
 <li className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
 <div>
 <strong className="text-gray-900 dark:text-white">Tax Calculations:</strong>
 <p className="text-gray-700 dark:text-gray-300 text-sm">Subtotal, tax/VAT amount, and total due</p>
 </div>
 </li>
 <li className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
 <div>
 <strong className="text-gray-900 dark:text-white">Payment Instructions:</strong>
 <p className="text-gray-700 dark:text-gray-300 text-sm">Bank details, payment methods accepted, terms</p>
 </div>
 </li>
 </ul>
 </div>

 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
 Using SkillLinkup Invoice Generator
 </h2>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 Our free invoice generator is designed specifically for freelancers who need professional invoices without the complexity of full accounting software.
 </p>

 <div className="bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-xl p-6 my-6 border-l-4 border-primary">
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h3>
 <ul className="space-y-3">
 <li className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-primary dark:text-accent flex-shrink-0 mt-0.5" />
 <span className="text-gray-700 dark:text-gray-300">
 <strong>Logo Upload:</strong>Add your branding for professional appearance
 </span>
 </li>
 <li className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-primary dark:text-accent flex-shrink-0 mt-0.5" />
 <span className="text-gray-700 dark:text-gray-300">
 <strong>Real-time Preview:</strong>See your invoice as you build it
 </span>
 </li>
 <li className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-primary dark:text-accent flex-shrink-0 mt-0.5" />
 <span className="text-gray-700 dark:text-gray-300">
 <strong>Multiple Currencies:</strong>Invoice in USD, EUR, GBP, and more
 </span>
 </li>
 <li className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-primary dark:text-accent flex-shrink-0 mt-0.5" />
 <span className="text-gray-700 dark:text-gray-300">
 <strong>Automatic Calculations:</strong>Subtotals, taxes, and totals calculated instantly
 </span>
 </li>
 <li className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-primary dark:text-accent flex-shrink-0 mt-0.5" />
 <span className="text-gray-700 dark:text-gray-300">
 <strong>Save Templates:</strong>Store frequently used invoice details locally
 </span>
 </li>
 <li className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-primary dark:text-accent flex-shrink-0 mt-0.5" />
 <span className="text-gray-700 dark:text-gray-300">
 <strong>PDF Download:</strong>One-click download for easy sending
 </span>
 </li>
 </ul>
 <div className="mt-6">
 <Link href={`/${locale}/tools/invoice-generator`} className="inline-flex items-center gap-2 text-primary dark:text-accent font-semibold hover:underline text-lg">
 Try Invoice Generator Free →
 </Link>
 </div>
 </div>

 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
 Invoice Numbering Best Practices
 </h2>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 Proper invoice numbering is essential for organization and legal compliance. Here are proven systems freelancers use:
 </p>

 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
 Sequential System
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 Example: INV-0001, INV-0002, INV-0003
 </p>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 Simple and straightforward. Start at 1 and count up. Great for new freelancers.
 </p>

 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
 Date-Based System
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 Example: INV-2026-001, INV-2026-002
 </p>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 Includes year for easy yearly reconciliation. Resets each year.
 </p>

 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
 Client-Based System
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 Example: ACME-001, TECHCO-001
 </p>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 Organizes invoices by client. Useful if you have recurring clients with multiple projects.
 </p>

 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
 Payment Terms: What to Include
 </h2>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 Clear payment terms prevent disputes and set expectations. Always specify:
 </p>

 <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
 <li><strong>Payment due date:</strong>Net 15, Net 30, or Due on Receipt</li>
 <li><strong>Accepted payment methods:</strong>Bank transfer, PayPal, Stripe, etc.</li>
 <li><strong>Bank details or payment links:</strong>Make it easy for clients to pay</li>
 <li><strong>Late fee policy:</strong>Optional but can encourage on-time payment</li>
 <li><strong>Currency and exchange rate:</strong>If working internationally</li>
 </ul>

 <div className="bg-accent/10 dark:bg-accent/20 border border-accent/30 rounded-xl p-6 my-6">
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Pro Tip: Payment Terms That Work</h3>
 <p className="text-gray-700 dark:text-gray-300 mb-3">
 For new clients, use shorter payment terms like Net 15 or even Due on Receipt. Once you've established trust, you can extend to Net 30 for their convenience.
 </p>
 <p className="text-gray-700 dark:text-gray-300">
 Consider offering a small discount (2-3%) for early payment to improve cash flow.
 </p>
 </div>

 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
 Tax Considerations for Invoices
 </h2>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 Tax requirements vary by location and client type. Here's what you need to know:
 </p>

 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
 VAT/Sales Tax
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 If you're VAT registered (Europe) or collect sales tax (US), clearly show:
 </p>
 <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
 <li>Your VAT/tax registration number</li>
 <li>Subtotal before tax</li>
 <li>Tax rate percentage</li>
 <li>Tax amount in currency</li>
 <li>Total including tax</li>
 </ul>

 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
 International Clients
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 Cross-border services often have different tax rules:
 </p>
 <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
 <li>B2B services to EU clients: Reverse charge mechanism (no VAT if they provide VAT number)</li>
 <li>US clients: Generally no sales tax for services</li>
 <li>UK clients: Check if VAT applies based on service type</li>
 <li>Always consult a tax professional for your specific situation</li>
 </ul>

 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
 Following Up on Unpaid Invoices
 </h2>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 Even with perfect invoices, you'll occasionally need to follow up. Here's a professional approach:
 </p>

 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 my-6 border border-gray-200 dark:border-gray-700">
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Day 1 (Due Date)</h3>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 Friendly reminder email: "Just wanted to confirm you received invoice #XXX. Payment is due today. Let me know if you have any questions!"
 </p>

 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Day 7 (One Week Late)</h3>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 Polite follow-up: "I wanted to check in about invoice #XXX from [date]. Was there any issue with the invoice? Happy to discuss."
 </p>

 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Day 14 (Two Weeks Late)</h3>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 Firmer tone: "Invoice #XXX is now 14 days overdue. Please arrange payment this week. I'm available to discuss any concerns."
 </p>

 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Day 30 (One Month Late)</h3>
 <p className="text-gray-700 dark:text-gray-300">
 Final notice: "This is a final request for payment of invoice #XXX. If payment isn't received by [date], I will need to take further action."
 </p>
 </div>

 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
 Digital vs. PDF Invoices
 </h2>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 There are two main ways to send invoices:
 </p>

 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
 PDF Attachments (Our Generator)
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 <strong>Pros:</strong>
 </p>
 <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-1">
 <li>Universal format - works everywhere</li>
 <li>Professional appearance</li>
 <li>Easy to print and file</li>
 <li>No monthly fees</li>
 </ul>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 <strong>Cons:</strong>
 </p>
 <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-1">
 <li>No automatic payment tracking</li>
 <li>Manual follow-up required</li>
 <li>No online payment integration</li>
 </ul>

 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
 Online Invoice Platforms
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 <strong>Pros:</strong>
 </p>
 <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-1">
 <li>Automatic payment reminders</li>
 <li>Online payment buttons</li>
 <li>Payment tracking dashboard</li>
 <li>Recurring invoice automation</li>
 </ul>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 <strong>Cons:</strong>
 </p>
 <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-1">
 <li>Monthly subscription fees</li>
 <li>Transaction fees on payments</li>
 <li>Learning curve</li>
 </ul>

 <p className="text-gray-700 dark:text-gray-300 mb-6">
 <strong>Our recommendation:</strong>Start with PDF invoices using our free generator. Once you're earning consistently and managing multiple clients, consider upgrading to a paid invoicing platform for automation.
 </p>

 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
 Organizing Your Invoices
 </h2>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 Keep your invoices organized for tax purposes and business analysis:
 </p>
 <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
 <li><strong>Digital folders:</strong>Create folders by year and client</li>
 <li><strong>Naming convention:</strong>Use consistent file names like "2026-001-ClientName.pdf"</li>
 <li><strong>Backup:</strong>Store copies in cloud storage (Google Drive, Dropbox)</li>
 <li><strong>Spreadsheet tracker:</strong>Maintain a simple spreadsheet of all invoices with status</li>
 <li><strong>Retention:</strong>Keep invoices for at least 7 years for tax purposes</li>
 </ul>

 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
 Common Invoicing Mistakes to Avoid
 </h2>
 <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 my-6">
 <ul className="space-y-3">
 <li className="text-red-800 dark:text-red-200">
 <strong>❌ Unclear payment terms:</strong>Always specify exact due date, not just "Net 30"
 </li>
 <li className="text-red-800 dark:text-red-200">
 <strong>❌ Missing tax information:</strong>Include your tax ID and calculate taxes correctly
 </li>
 <li className="text-red-800 dark:text-red-200">
 <strong>❌ Vague service descriptions:</strong>Be specific about what was delivered
 </li>
 <li className="text-red-800 dark:text-red-200">
 <strong>❌ Incorrect client details:</strong>Double-check spelling and addresses
 </li>
 <li className="text-red-800 dark:text-red-200">
 <strong>❌ Delaying invoices:</strong>Send invoices immediately after completing work
 </li>
 </ul>
 </div>

 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
 When to Invoice: Timing Strategies
 </h2>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 Invoice timing affects cash flow. Here are common approaches:
 </p>

 <div className="space-y-4 mb-6">
 <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">Upon Completion</h3>
 <p className="text-gray-700 dark:text-gray-300 text-sm">
 Invoice immediately when project is delivered. Standard for most project work.
 </p>
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">Milestone Billing</h3>
 <p className="text-gray-700 dark:text-gray-300 text-sm">
 Invoice at predetermined project milestones. Reduces risk on long projects.
 </p>
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">Monthly Retainers</h3>
 <p className="text-gray-700 dark:text-gray-300 text-sm">
 Invoice on the same day each month for ongoing services. Provides predictable income.
 </p>
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">Upfront Deposits</h3>
 <p className="text-gray-700 dark:text-gray-300 text-sm">
 Require 25-50% deposit before starting. Final invoice upon completion. Protects against non-payment.
 </p>
 </div>
 </div>
 </div>

 {/* CTA */}
 <div className="bg-gradient-to-br from-primary via-primary-dark to-secondary rounded-2xl p-8 md:p-12 text-center mt-16 shadow-2xl">
 <h2 className="text-3xl font-bold text-white mb-4">
 Create Your First Professional Invoice
 </h2>
 <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
 Start generating professional invoices in minutes. Free forever, no signup required. Add your logo, customize, and download as PDF.
 </p>
 <div className="flex flex-wrap gap-4 justify-center">
 <Link href={`/${locale}/tools/invoice-generator`} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg">
 <FileText className="w-5 h-5" />
 Generate Invoice Now
 </Link>
 <Link href={`/${locale}/tools`} className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition-all">
 View All Tools
 </Link>
 </div>
 </div>

 {/* Related */}
 <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Complete Your Freelance Toolkit</h2>
 <div className="grid md:grid-cols-2 gap-6">
 <Link href={`/${locale}/tools/time-tracker`} className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary transition-all">
 <Clock className="w-8 h-8 text-primary dark:text-accent mb-3" />
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-accent">Time Tracker</h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm">Track billable hours to include in your invoices</p>
 </Link>
 <Link href={`/${locale}/tools/rate-calculator`} className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary transition-all">
 <DollarSign className="w-8 h-8 text-primary dark:text-accent mb-3" />
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-accent">Rate Calculator</h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm">Calculate what rates to charge on your invoices</p>
 </Link>
 </div>
 </div>
 </div>
 </div>
 </article>
 </main>
 
 </>
 );
}
