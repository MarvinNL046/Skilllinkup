import Link from "next/link";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type Props = {
 params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'freelance-contracts-basics';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/aan-de-slag/${slug}`;

 return {
 title: "Freelance Contracts 101: Protect Yourself in 2026 (Templates Included)",
 description: "Never work without a contract again. Learn what to include, red flags to avoid, and get free templates. Protect your time, money, and legal rights as a freelancer.",
 keywords: "freelance contract template, freelance agreement, contract basics, protect yourself freelancer, legal documents 2026",
 openGraph: {
 title: "Freelance Contracts 101: Protect Yourself in 2026 (Templates Included)",
 description: "Never work without a contract again. Learn what to include, red flags to avoid, and get free templates. Protect your time, money, and legal rights as a freelancer.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Freelance Contracts 101 - SkillLinkup',
 }
 ],
 locale: locale === 'nl' ? 'nl_NL' : 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "Freelance Contracts 101: Protect Yourself in 2026 (Templates Included)",
 description: "Never work without a contract again. Learn what to include, red flags to avoid, and get free templates. Protect your time, money, and legal rights as a freelancer.",
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 },
 };
}

export default async function FreelanceContractsBasicsPage({ params }: Props) {
 const { locale } = await params;

 return (
 <>
 

 <main className="min-h-screen bg-[#f8f9fb]">
 {/* Hero Section */}
 <section className="bg-gradient-to-br from-[#1e1541] via-[#2a1f5e] to-[#1e1541] text-white py-16">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
 Freelance Contracts 101: Protect Yourself From Nightmare Clients
 </h1>
 <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
 "Can we skip the contract? I trust you." Famous last words before scope creep, non-payment, and endless revisions. Learn how to protect yourself the smart way.
 </p>
 <Link
 href={`/${locale}/tools/invoice-generator`}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Use Our Free Invoice Generator →
 </Link>
 </div>
 </div>
 </section>

 {/* Main Content */}
 <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">

 {/* Section 1: Why Contracts Matter */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Why Every Freelancer Needs a Contract (Horror Stories Inside)
 </h2>
 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 "They seemed nice." That's what Sarah thought before delivering a website and getting ghosted. No contract = no legal recourse. Here's what can go wrong—and how contracts prevent it.
 </p>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 5 Disasters Contracts Prevent
 </h3>
 <ul className="space-y-4">
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3 text-xl">1.</span>
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Non-Payment:</strong>Client receives work but "doesn't have budget right now." Contract gives you legal basis to demand payment.
 </span>
 </li>
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3 text-xl">2.</span>
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Scope Creep:</strong>"Can you add just one more feature?" 10 features later, you've doubled the work for the same price.
 </span>
 </li>
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3 text-xl">3.</span>
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Endless Revisions:</strong>"Actually, can we change it again?" Contract limits revisions to 2-3 rounds.
 </span>
 </li>
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3 text-xl">4.</span>
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">IP Theft:</strong>Client claims they own the work before paying. Contract clarifies ownership transfer happens AFTER payment.
 </span>
 </li>
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3 text-xl">5.</span>
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Timeline Confusion:</strong>"I thought you'd be done in 2 days?" Contract sets clear deadlines and expectations.
 </span>
 </li>
 </ul>
 </div>

 <div className="grid md:grid-cols-2 gap-6 mb-8">
 <div className="bg-red-50 border border-red-200 rounded-lg p-6">
 <h3 className="font-heading font-semibold text-xl text-red-900 mb-4">
 ❌ Without a Contract
 </h3>
 <ul className="space-y-2 text-sm text-red-800">
 <li>• "He said, she said" disputes</li>
 <li>• No legal protection if client ghosts</li>
 <li>• Clients demand unlimited changes</li>
 <li>• Payment terms are unclear</li>
 <li>• You look unprofessional</li>
 <li>• Small claims court is your only option</li>
 </ul>
 </div>

 <div className="bg-green-50 border border-green-200 rounded-lg p-6">
 <h3 className="font-heading font-semibold text-xl text-green-900 mb-4">
 ✅ With a Contract
 </h3>
 <ul className="space-y-2 text-sm text-green-800">
 <li>• Everything in writing (proof)</li>
 <li>• Legal basis for payment enforcement</li>
 <li>• Clear revision limits (2-3 rounds)</li>
 <li>• Payment terms crystal clear</li>
 <li>• Professional, trustworthy image</li>
 <li>• Stronger position in disputes</li>
 </ul>
 </div>
 </div>

 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg mb-8">
 <p className="text-[#1e1541] font-semibold mb-2">
 The Truth About Contracts
 </p>
 <p className="text-[#64607d]">
 Good clients WANT a contract. It protects them too. If someone resists signing, that's a red flag. Run.
 </p>
 </div>
 </div>
 </section>

 {/* Section 2: Essential Contract Elements */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 The 10 Essential Elements Every Freelance Contract Must Have
 </h2>

 <div className="space-y-6">
 {/* Element 1 */}
 <div className="bg-white rounded-lg shadow-lg p-6">
 <div className="flex items-start mb-3">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
 1
 </div>
 <div className="flex-1">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Parties Involved (Who's Who)
 </h3>
 <p className="text-[#64607d] mb-3">
 Full legal names, addresses, and contact info for both you and the client. Use business names if applicable.
 </p>
 <div className="bg-[#f8f9fb] rounded-lg p-4 text-sm font-mono text-[#64607d]">
 This Agreement is between [Your Full Name/Business Name] ("Freelancer") and [Client Full Name/Company] ("Client").
 </div>
 </div>
 </div>
 </div>

 {/* Element 2 */}
 <div className="bg-white rounded-lg shadow-lg p-6">
 <div className="flex items-start mb-3">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
 2
 </div>
 <div className="flex-1">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Scope of Work (What You'll Deliver)
 </h3>
 <p className="text-[#64607d] mb-3">
 Be SPECIFIC. Vague scope = scope creep. List deliverables, features, and what's NOT included.
 </p>
 <div className="bg-[#f0fdf4] border border-green-200 rounded-lg p-4 mb-2">
 <p className="text-sm font-semibold text-green-900 mb-2">✅ Good Example:</p>
 <p className="text-sm text-green-800">
 "Freelancer will design and develop a 5-page WordPress website including: Home, About, Services, Blog, Contact. Includes mobile responsiveness, contact form integration, and basic SEO setup. Does NOT include: e-commerce, custom plugins, or ongoing maintenance."
 </p>
 </div>
 <div className="bg-red-50 border border-red-200 rounded-lg p-4">
 <p className="text-sm font-semibold text-red-900 mb-2">❌ Bad Example:</p>
 <p className="text-sm text-red-800">
 "Freelancer will create a website for the client."
 </p>
 </div>
 </div>
 </div>
 </div>

 {/* Element 3 */}
 <div className="bg-white rounded-lg shadow-lg p-6">
 <div className="flex items-start mb-3">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
 3
 </div>
 <div className="flex-1">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Payment Terms (How Much, When, How)
 </h3>
 <p className="text-[#64607d] mb-3">
 Total cost, payment schedule, accepted methods, and late fees. Never start work without at least 50% upfront.
 </p>
 <div className="bg-[#f8f9fb] rounded-lg p-4">
 <p className="text-sm font-semibold text-[#1e1541] mb-2">Recommended Payment Structure:</p>
 <ul className="text-sm text-[#64607d] space-y-1">
 <li>• <strong>Small projects (&lt;$500):</strong>100% upfront</li>
 <li>• <strong>Medium projects ($500-$2K):</strong>50% upfront, 50% on delivery</li>
 <li>• <strong>Large projects ($2K+):</strong>33% upfront, 33% midpoint, 34% on completion</li>
 <li>• <strong>Ongoing retainers:</strong>Paid monthly in advance</li>
 </ul>
 </div>
 </div>
 </div>
 </div>

 {/* Element 4 */}
 <div className="bg-white rounded-lg shadow-lg p-6">
 <div className="flex items-start mb-3">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
 4
 </div>
 <div className="flex-1">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Timeline and Deadlines
 </h3>
 <p className="text-[#64607d] mb-3">
 Start date, key milestones, final delivery date. Include buffer for client delays.
 </p>
 <div className="bg-[#f8f9fb] rounded-lg p-4 text-sm">
 <p className="text-[#1e1541] mb-2"><strong>Example Timeline:</strong></p>
 <ul className="text-[#64607d] space-y-1">
 <li>• Day 1-3: Initial consultation and requirements gathering</li>
 <li>• Day 4-10: First draft delivered for client review</li>
 <li>• Day 11-14: Revisions based on client feedback</li>
 <li>• Day 15-17: Final delivery and handover</li>
 </ul>
 <p className="text-[#64607d] mt-2 text-xs italic">
 Note: Timeline assumes client provides feedback within 48 hours. Delays in client response will extend final delivery date accordingly.
 </p>
 </div>
 </div>
 </div>
 </div>

 {/* Element 5 */}
 <div className="bg-white rounded-lg shadow-lg p-6">
 <div className="flex items-start mb-3">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
 5
 </div>
 <div className="flex-1">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Revision Policy (Stop Endless Changes)
 </h3>
 <p className="text-[#64607d] mb-3">
 Limit revisions to 2-3 rounds. Define what counts as a revision vs. new work.
 </p>
 <div className="bg-[#f8f9fb] rounded-lg p-4 text-sm font-mono text-[#64607d]">
 Client is entitled to TWO (2) rounds of revisions within the agreed scope. Additional revisions will be billed at $[X]/hour. Major scope changes require a new contract and additional payment.
 </div>
 </div>
 </div>
 </div>

 {/* Element 6 */}
 <div className="bg-white rounded-lg shadow-lg p-6">
 <div className="flex items-start mb-3">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
 6
 </div>
 <div className="flex-1">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Intellectual Property Rights
 </h3>
 <p className="text-[#64607d] mb-3">
 Who owns the work? Usually client owns it AFTER full payment. You keep rights until paid.
 </p>
 <div className="bg-[#f8f9fb] rounded-lg p-4 text-sm font-mono text-[#64607d]">
 Upon receipt of final payment, all intellectual property rights will transfer to Client. Freelancer retains rights to use work in portfolio. Freelancer retains ownership until full payment received.
 </div>
 </div>
 </div>
 </div>

 {/* Element 7-10 Condensed */}
 <div className="bg-white rounded-lg shadow-lg p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
 Additional Essential Clauses
 </h3>
 <div className="space-y-4">
 <div className="border-l-4 border-[#22c55e] pl-4">
 <p className="font-semibold text-[#1e1541] mb-1">7. Cancellation Policy</p>
 <p className="text-sm text-[#64607d]">What happens if client or freelancer needs to cancel? Usually: upfront payment non-refundable, work-in-progress billed at hourly rate.</p>
 </div>
 <div className="border-l-4 border-[#22c55e] pl-4">
 <p className="font-semibold text-[#1e1541] mb-1">8. Confidentiality (NDA)</p>
 <p className="text-sm text-[#64607d]">Both parties agree not to share proprietary information. Standard for most projects.</p>
 </div>
 <div className="border-l-4 border-[#22c55e] pl-4">
 <p className="font-semibold text-[#1e1541] mb-1">9. Liability Limitations</p>
 <p className="text-sm text-[#64607d]">Cap your liability at the project fee. Protects you from unreasonable lawsuits if something goes wrong.</p>
 </div>
 <div className="border-l-4 border-[#22c55e] pl-4">
 <p className="font-semibold text-[#1e1541] mb-1">10. Dispute Resolution</p>
 <p className="text-sm text-[#64607d]">How will disagreements be handled? Mediation first, then arbitration. Avoids expensive court battles.</p>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* CTA Section 1 */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Create Professional Invoices for Your Contracts
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Generate invoices with payment terms, late fees, and professional branding
 </p>
 <Link
 href={`/${locale}/tools/invoice-generator`}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Use Free Invoice Generator →
 </Link>
 </div>
 </section>

 {/* Section 3: Red Flags */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 7 Contract Red Flags That Mean "Run Away"
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Red Flag 1: "We Don't Need a Contract, I Trust You"
 </h3>
 <p className="text-[#64607d] mb-2">
 Translation: "I want maximum flexibility to change scope, delay payment, or ghost you." Professional businesses always use contracts.
 </p>
 <p className="text-sm text-[#22c55e]">
 ✅ Your Response: "I appreciate the trust! For both our protection, I always use a simple agreement. It's standard practice."
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Red Flag 2: "Payment Upon Completion Only"
 </h3>
 <p className="text-[#64607d] mb-2">
 You do 40 hours of work, deliver everything, and then they decide not to pay. Always require at least 50% upfront.
 </p>
 <p className="text-sm text-[#22c55e]">
 ✅ Your Response: "My standard terms are 50% upfront to begin, 50% on delivery. This is industry standard."
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Red Flag 3: Unlimited Revisions Clause
 </h3>
 <p className="text-[#64607d] mb-2">
 "We'll need unlimited changes until we're happy." You'll be working on this project forever for the same price.
 </p>
 <p className="text-sm text-[#22c55e]">
 ✅ Your Response: "I include 2-3 revision rounds in the base price. Additional revisions are billed hourly."
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Red Flag 4: Vague Scope in Contract
 </h3>
 <p className="text-[#64607d] mb-2">
 Contract says "design a website" with no specifics. They'll expect 50 pages when you quoted for 5.
 </p>
 <p className="text-sm text-[#22c55e]">
 ✅ Your Response: "Let's clarify exactly what's included. I'll update the contract with specific deliverables."
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Red Flag 5: "We'll Pay When We Get Paid"
 </h3>
 <p className="text-[#64607d] mb-2">
 Their cash flow problems become your problem. You're not their bank. Get paid on YOUR schedule, not theirs.
 </p>
 <p className="text-sm text-[#22c55e]">
 ✅ Your Response: "I require payment within 14 days of invoice, regardless of your client payments."
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Red Flag 6: They Own Everything, Including Your Process
 </h3>
 <p className="text-[#64607d] mb-2">
 Some contracts claim they own your methods, templates, and tools. You're selling the output, not your entire business.
 </p>
 <p className="text-sm text-[#22c55e]">
 ✅ Your Response: "Client owns final deliverables. I retain rights to my templates, processes, and tools."
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Red Flag 7: No Termination Clause
 </h3>
 <p className="text-[#64607d] mb-2">
 What if the client is impossible to work with? You need an exit strategy. Include termination terms for both parties.
 </p>
 <p className="text-sm text-[#22c55e]">
 ✅ Your Response: "Let's add a termination clause: Either party can end with 7 days notice. Work completed will be billed."
 </p>
 </div>
 </div>
 </section>

 {/* CTA Section 2 */}
 <section className="mb-16">
 <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Track Your Time and Calculate Accurate Rates
 </h3>
 <p className="text-xl mb-6 text-gray-300">
 Use our free tools to manage your freelance business professionally
 </p>
 <Link
 href={`/${locale}/tools`}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Explore Free Tools →
 </Link>
 </div>
 </section>

 {/* Section 4: Contract Workflow */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Step-by-Step: How to Use Contracts in Your Workflow
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 1
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Initial Consultation (Gather Requirements)
 </h3>
 <p className="text-[#64607d] mb-3">
 Before sending a contract, have a detailed call/meeting. Understand scope, timeline, budget. Take notes—you'll need them for the contract.
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 2
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Send Contract + Invoice Together
 </h3>
 <p className="text-[#64607d] mb-3">
 Use a tool like DocuSign, HelloSign, or PandaDoc for e-signatures. Include invoice for upfront payment (50%+).
 </p>
 <p className="text-sm text-[#64607d]">
 Email template: "Excited to work together! Attached is the contract and invoice for the 50% deposit ($X). Once signed and paid, I'll start on [date]."
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 3
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Wait for Signature + Payment Before Starting
 </h3>
 <p className="text-[#64607d] mb-3">
 Never start work with just a verbal agreement. Signed contract + payment received = green light to begin.
 </p>
 <p className="text-sm bg-[#fff8f8] border-l-4 border-[#ef2b70] p-3 rounded-r">
 <strong>Rule:</strong>No signature + no payment = no work. No exceptions.
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 4
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Deliver Work According to Contract Timeline
 </h3>
 <p className="text-[#64607d] mb-3">
 Follow your agreed scope and deadlines. Document everything: progress updates, client requests, changes.
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 5
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Final Invoice + Transfer of Rights
 </h3>
 <p className="text-[#64607d] mb-3">
 When project is complete, send final invoice. Upon payment, transfer intellectual property rights as stated in contract.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* Section 5: Next Steps */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 What to Do After Learning Contract Basics
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 1
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Find a Contract Template
 </h3>
 <p className="text-[#64607d] mb-3">
 Use free templates from Bonsai, AND CO, or HelloSign. Customize for your specific services and industry.
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 2
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Start Building Your Client Base
 </h3>
 <p className="text-[#64607d] mb-3">
 Now that you know how to protect yourself, start applying to projects with confidence.
 </p>
 <Link
 href={`/${locale}/gids/aan-de-slag/first-client-in-30-days`}
 className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
 >
 Follow Our 30-Day Client System →
 </Link>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 3
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Consider Legal Review (Optional)
 </h3>
 <p className="text-[#64607d] mb-3">
 For large projects ($5K+), have a lawyer review your contract. Cost: $200-$500. Worth it for peace of mind.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* Final CTA */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Read More Getting Started Guides
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Master every aspect of launching your freelance career
 </p>
 <Link
 href={`/${locale}/gids/aan-de-slag`}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Browse All Getting Started Guides →
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
 "headline": "Freelance Contracts 101: Protect Yourself in 2026",
 "description": "Never work without a contract again. Learn what to include, red flags to avoid, and how to protect your time, money, and legal rights as a freelancer.",
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
 "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/aan-de-slag/freelance-contracts-basics`
 }
 })
 }}
 />
 </main>

 
 </>
 );
}
