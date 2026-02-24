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

 const slug = 'profile-optimization-secrets';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/aan-de-slag/${slug}`;

 return {
 title: "Profile Optimization Secrets That Get You Hired in 2026 (Freelancer's Guide)",
 description: "Transform your freelance profile from ignored to irresistible. Learn the psychological triggers top earners use. Includes before/after examples and optimization checklist.",
 keywords: "freelance profile optimization, upwork profile tips, fiverr profile optimization, get hired freelance, profile writing 2026",
 openGraph: {
 title: "Profile Optimization Secrets That Get You Hired in 2026 (Freelancer's Guide)",
 description: "Transform your freelance profile from ignored to irresistible. Learn the psychological triggers top earners use. Includes before/after examples and optimization checklist.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Profile Optimization Secrets - SkillLinkup',
 }
 ],
 locale: locale === 'nl' ? 'nl_NL' : 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "Profile Optimization Secrets That Get You Hired in 2026 (Freelancer's Guide)",
 description: "Transform your freelance profile from ignored to irresistible. Learn the psychological triggers top earners use. Includes before/after examples and optimization checklist.",
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 },
 };
}

export default async function ProfileOptimizationSecretsPage({ params }: Props) {
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
 Profile Optimization Secrets That Get You Hired (Even as a Beginner)
 </h1>
 <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
 Your profile isn't just a resume—it's a sales page. Learn the psychological triggers that make clients click "Hire" instead of scrolling past.
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Find Platforms to Optimize →
 </Link>
 </div>
 </div>
 </section>

 {/* Main Content */}
 <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">

 {/* Section 1: Why Profiles Matter */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Why Most Freelance Profiles Get Ignored (And Yours Won't)
 </h2>
 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Clients spend 7 seconds deciding whether to read your full profile or move on. Your profile either passes this test or you're invisible.
 </p>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 The 7-Second First Impression Test
 </h3>
 <p className="text-[#64607d] mb-4">In those 7 seconds, clients look for:</p>
 <ul className="space-y-3">
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3">1.</span>
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Professional photo:</strong>Real person or mystery profile?
 </span>
 </li>
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3">2.</span>
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Clear headline:</strong>Do you solve their specific problem?
 </span>
 </li>
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3">3.</span>
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Portfolio samples:</strong>Can you actually do what you claim?
 </span>
 </li>
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3">4.</span>
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Reviews/ratings:</strong>Have others trusted you before?
 </span>
 </li>
 </ul>
 </div>

 <div className="grid md:grid-cols-2 gap-6 mb-8">
 <div className="bg-red-50 border border-red-200 rounded-lg p-6">
 <h4 className="font-heading font-semibold text-lg text-red-900 mb-3">
 ❌ Why Clients Skip You
 </h4>
 <ul className="space-y-2 text-sm text-red-800">
 <li>• Generic photo or no photo at all</li>
 <li>• Vague headline: "Experienced freelancer"</li>
 <li>• Bio focused on YOU, not client benefits</li>
 <li>• Empty portfolio or unrelated samples</li>
 <li>• Zero reviews (looks risky)</li>
 <li>• Typos and poor grammar</li>
 </ul>
 </div>

 <div className="bg-green-50 border border-green-200 rounded-lg p-6">
 <h4 className="font-heading font-semibold text-lg text-green-900 mb-3">
 ✅ Why Clients Choose You
 </h4>
 <ul className="space-y-2 text-sm text-green-800">
 <li>• Professional, friendly headshot</li>
 <li>• Specific headline: "I increase e-com conversions"</li>
 <li>• Bio addresses their pain points</li>
 <li>• 3-5 relevant portfolio pieces</li>
 <li>• Even 1-2 five-star reviews help</li>
 <li>• Polished, error-free writing</li>
 </ul>
 </div>
 </div>
 </div>
 </section>

 {/* Section 2: Profile Photo */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Step 1: Your Profile Photo (The Trust Builder)
 </h2>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 Photo Psychology: Why It Matters
 </h3>
 <p className="text-[#64607d] mb-4">
 Studies show profiles with professional photos get <strong className="text-[#1e1541]">14x more views</strong>than those without. Humans trust faces.
 </p>

 <div className="grid md:grid-cols-2 gap-6">
 <div className="bg-red-50 border-l-4 border-red-500 p-4">
 <p className="font-semibold text-red-900 mb-2">❌ Avoid These Photos:</p>
 <ul className="text-sm text-red-800 space-y-1">
 <li>• Group photos (who are you?)</li>
 <li>• Sunglasses or hats hiding your face</li>
 <li>• Party/vacation shots (unprofessional)</li>
 <li>• Blurry or dark lighting</li>
 <li>• Logo or artwork instead of face</li>
 <li>• Mirror selfies with messy background</li>
 </ul>
 </div>

 <div className="bg-green-50 border-l-4 border-green-500 p-4">
 <p className="font-semibold text-green-900 mb-2">✅ Perfect Profile Photo:</p>
 <ul className="text-sm text-green-800 space-y-1">
 <li>• Clear face, direct eye contact</li>
 <li>• Friendly smile (approachable)</li>
 <li>• Clean, simple background</li>
 <li>• Good lighting (natural daylight best)</li>
 <li>• Professional but not stiff</li>
 <li>• Shoulders up, centered framing</li>
 </ul>
 </div>
 </div>
 </div>

 <div className="bg-[#f8f9fb] rounded-lg p-6">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
 Quick DIY Photo Shoot (10 Minutes)
 </h4>
 <ol className="space-y-2 text-sm text-[#64607d]">
 <li><strong>1. Find good light:</strong>Stand near a window during daytime (no direct sun in face)</li>
 <li><strong>2. Clean background:</strong>Plain wall or neat bookshelf works great</li>
 <li><strong>3. Camera at eye level:</strong>Use phone on a stack of books or timer mode</li>
 <li><strong>4. Take 20 shots:</strong>Different angles, expressions. Pick the best 3</li>
 <li><strong>5. Test with friends:</strong>Ask which photo feels most trustworthy</li>
 </ol>
 </div>
 </section>

 {/* Section 3: Headline Formula */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Step 2: Your Headline (The Hook)
 </h2>

 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg p-8 text-white mb-6">
 <h3 className="font-heading font-bold text-2xl mb-4">
 The Winning Headline Formula
 </h3>
 <div className="bg-white/10 backdrop-blur rounded-lg p-4 font-mono text-sm mb-4">
 I help [TARGET CLIENT] achieve [DESIRED OUTCOME] through [YOUR METHOD]
 </div>
 <p className="text-sm text-white/90">
 This formula passes the "So what?" test. It immediately tells clients why they should care.
 </p>
 </div>

 <div className="space-y-4">
 <div className="bg-white rounded-lg shadow p-6">
 <div className="flex items-start mb-3">
 <span className="text-red-500 font-bold mr-3 text-xl">❌</span>
 <div>
 <p className="font-semibold text-[#1e1541] mb-1">Bad: "Experienced Web Developer"</p>
 <p className="text-sm text-[#64607d]">Problem: Says nothing about who you help or what results you deliver. Could be anyone.</p>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <div className="flex items-start mb-3">
 <span className="text-green-500 font-bold mr-3 text-xl">✅</span>
 <div>
 <p className="font-semibold text-[#1e1541] mb-1">Good: "I help SaaS companies increase trial-to-paid conversions through optimized onboarding flows"</p>
 <p className="text-sm text-[#64607d]">Why it works: Specific client type + measurable outcome + clear method</p>
 </div>
 </div>
 </div>
 </div>

 <div className="mt-6 grid md:grid-cols-2 gap-4">
 <div className="bg-[#f0fdf4] border border-green-200 rounded-lg p-4">
 <p className="text-sm font-semibold text-green-900 mb-2">Example: Designer</p>
 <p className="text-sm text-green-800">"I help health coaches attract dream clients through Instagram-ready brand kits"</p>
 </div>
 <div className="bg-[#f0fdf4] border border-green-200 rounded-lg p-4">
 <p className="text-sm font-semibold text-green-900 mb-2">Example: Writer</p>
 <p className="text-sm text-green-800">"I help B2B SaaS companies generate leads through SEO-optimized blog content"</p>
 </div>
 <div className="bg-[#f0fdf4] border border-green-200 rounded-lg p-4">
 <p className="text-sm font-semibold text-green-900 mb-2">Example: Developer</p>
 <p className="text-sm text-green-800">"I help course creators automate payments through custom Stripe integrations"</p>
 </div>
 <div className="bg-[#f0fdf4] border border-green-200 rounded-lg p-4">
 <p className="text-sm font-semibold text-green-900 mb-2">Example: Marketer</p>
 <p className="text-sm text-green-800">"I help e-commerce brands scale profitably through Facebook ads management"</p>
 </div>
 </div>
 </section>

 {/* CTA Section 1 */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Ready to Apply These Optimizations?
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Compare platforms and start building your optimized profile
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Browse Platforms →
 </Link>
 </div>
 </section>

 {/* Section 4: Bio Writing */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Step 3: Your Bio (The Convincer)
 </h2>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 The 3-Paragraph Bio Framework
 </h3>

 <div className="space-y-6">
 <div className="border-l-4 border-[#ef2b70] pl-6">
 <h4 className="font-semibold text-[#1e1541] mb-2">Paragraph 1: The Problem (2-3 sentences)</h4>
 <p className="text-sm text-[#64607d] mb-2">Address your client's pain point. Show you understand their struggle.</p>
 <div className="bg-[#f8f9fb] rounded p-3 text-sm italic text-[#64607d]">
 "Are you launching a course but struggling with tech setup? You're not alone—78% of course creators cite payment integration as their #1 roadblock."
 </div>
 </div>

 <div className="border-l-4 border-[#22c55e] pl-6">
 <h4 className="font-semibold text-[#1e1541] mb-2">Paragraph 2: Your Solution (3-4 sentences)</h4>
 <p className="text-sm text-[#64607d] mb-2">Explain how you solve it. Include your experience and method.</p>
 <div className="bg-[#f8f9fb] rounded p-3 text-sm italic text-[#64607d]">
 "I'm a Stripe-certified developer who's built payment systems for 30+ course creators. I handle the technical complexity—Stripe integration, webhook setup, subscription management—so you can focus on teaching."
 </div>
 </div>

 <div className="border-l-4 border-blue-500 pl-6">
 <h4 className="font-semibold text-[#1e1541] mb-2">Paragraph 3: The Result (2-3 sentences)</h4>
 <p className="text-sm text-[#64607d] mb-2">What happens when they hire you? Paint the after picture.</p>
 <div className="bg-[#f8f9fb] rounded p-3 text-sm italic text-[#64607d]">
 "When we're done, your students will have a seamless checkout experience—and you'll have a reliable income stream. Let's get your course live in 2 weeks."
 </div>
 </div>
 </div>
 </div>

 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg">
 <p className="text-[#1e1541] font-semibold mb-2">
 Common Bio Mistakes to Avoid
 </p>
 <ul className="text-sm text-[#64607d] space-y-1">
 <li>• Starting with "I'm a passionate..." (everyone says this)</li>
 <li>• Listing every skill you've ever learned (focus on 1-2)</li>
 <li>• Talking about YOUR journey instead of THEIR results</li>
 <li>• No call-to-action ("Let's chat" or "Book a call")</li>
 <li>• Writing in third person ("John is a developer...")</li>
 </ul>
 </div>
 </section>

 {/* Section 5: Portfolio Strategy */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Step 4: Portfolio Selection (Quality Over Quantity)
 </h2>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 The 5-3-1 Portfolio Rule
 </h3>

 <div className="space-y-4">
 <div className="flex items-start">
 <span className="bg-[#ef2b70] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">5</span>
 <div>
 <p className="font-semibold text-[#1e1541] mb-1">Maximum 5 Portfolio Pieces</p>
 <p className="text-sm text-[#64607d]">More than 5 dilutes your message. Show your absolute best work only.</p>
 </div>
 </div>

 <div className="flex items-start">
 <span className="bg-[#ef2b70] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">3</span>
 <div>
 <p className="font-semibold text-[#1e1541] mb-1">At Least 3 Must Be Relevant to Your Niche</p>
 <p className="text-sm text-[#64607d]">If you target SaaS companies, show 3 SaaS projects—not random work.</p>
 </div>
 </div>

 <div className="flex items-start">
 <span className="bg-[#ef2b70] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">1</span>
 <div>
 <p className="font-semibold text-[#1e1541] mb-1">Every Project Needs 1 Strong Description</p>
 <p className="text-sm text-[#64607d]">Use Problem-Solution-Result format (see portfolio guide for details).</p>
 </div>
 </div>
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-6">
 <div className="bg-red-50 border border-red-200 rounded-lg p-6">
 <h4 className="font-heading font-semibold text-lg text-red-900 mb-3">
 ❌ Portfolio Mistakes
 </h4>
 <ul className="space-y-2 text-sm text-red-800">
 <li>• Showing 15+ projects (overwhelming)</li>
 <li>• No descriptions ("Here's a logo I made")</li>
 <li>• Irrelevant work (web dev showing paintings)</li>
 <li>• Low-quality images or broken links</li>
 <li>• Projects from 5+ years ago</li>
 </ul>
 </div>

 <div className="bg-green-50 border border-green-200 rounded-lg p-6">
 <h4 className="font-heading font-semibold text-lg text-green-900 mb-3">
 ✅ Portfolio Best Practices
 </h4>
 <ul className="space-y-2 text-sm text-green-800">
 <li>• 3-5 curated, relevant projects</li>
 <li>• Each has problem + solution + result</li>
 <li>• All projects match your niche</li>
 <li>• High-quality images/mockups</li>
 <li>• Recent work (last 1-2 years)</li>
 </ul>
 </div>
 </div>

 <div className="mt-6 bg-[#f8f9fb] rounded-lg p-6">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Don't have client work yet?</strong>Create spec projects, redesign existing sites, volunteer for non-profits, or use personal projects.
 <Link href={`/${locale}/gids/aan-de-slag/freelance-portfolio-from-scratch`} className="text-[#ef2b70] hover:underline ml-1">
 Read our portfolio building guide →
 </Link>
 </p>
 </div>
 </section>

 {/* CTA Section 2 */}
 <section className="mb-16">
 <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Use Free Tools to Track Your Success
 </h3>
 <p className="text-xl mb-6 text-gray-300">
 Monitor profile views, track applications, and manage projects
 </p>
 <Link
 href={`/${locale}/tools`}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Explore Free Tools →
 </Link>
 </div>
 </section>

 {/* Section 6: Skills & Keywords */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Step 5: Skills & Keywords (The Search Optimizer)
 </h2>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 How Platform Search Works
 </h3>
 <p className="text-[#64607d] mb-4">
 Clients search for specific skills. If "WordPress" isn't in your profile, you won't show up when they search "WordPress developer."
 </p>

 <div className="bg-[#f8f9fb] rounded-lg p-6">
 <h4 className="font-semibold text-[#1e1541] mb-3">Keyword Research Process:</h4>
 <ol className="space-y-2 text-sm text-[#64607d]">
 <li><strong>1.</strong>Go to your target platform (Upwork, Fiverr, etc.)</li>
 <li><strong>2.</strong>Search for your service type in the job listings</li>
 <li><strong>3.</strong>Note which skills appear in 5+ job posts</li>
 <li><strong>4.</strong>Add those exact terms to your skills section</li>
 <li><strong>5.</strong>Limit to 10-15 most relevant skills (not 50+)</li>
 </ol>
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-6">
 <div className="bg-white rounded-lg shadow p-6">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
 Example: Web Developer Keywords
 </h4>
 <div className="flex flex-wrap gap-2">
 <span className="bg-[#ef2b70]/10 text-[#ef2b70] px-3 py-1 rounded-full text-sm">React.js</span>
 <span className="bg-[#ef2b70]/10 text-[#ef2b70] px-3 py-1 rounded-full text-sm">Next.js</span>
 <span className="bg-[#ef2b70]/10 text-[#ef2b70] px-3 py-1 rounded-full text-sm">WordPress</span>
 <span className="bg-[#ef2b70]/10 text-[#ef2b70] px-3 py-1 rounded-full text-sm">Responsive Design</span>
 <span className="bg-[#ef2b70]/10 text-[#ef2b70] px-3 py-1 rounded-full text-sm">API Integration</span>
 <span className="bg-[#ef2b70]/10 text-[#ef2b70] px-3 py-1 rounded-full text-sm">Shopify</span>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
 Example: Content Writer Keywords
 </h4>
 <div className="flex flex-wrap gap-2">
 <span className="bg-[#22c55e]/10 text-[#22c55e] px-3 py-1 rounded-full text-sm">SEO Writing</span>
 <span className="bg-[#22c55e]/10 text-[#22c55e] px-3 py-1 rounded-full text-sm">Blog Posts</span>
 <span className="bg-[#22c55e]/10 text-[#22c55e] px-3 py-1 rounded-full text-sm">Copywriting</span>
 <span className="bg-[#22c55e]/10 text-[#22c55e] px-3 py-1 rounded-full text-sm">Technical Writing</span>
 <span className="bg-[#22c55e]/10 text-[#22c55e] px-3 py-1 rounded-full text-sm">Content Strategy</span>
 <span className="bg-[#22c55e]/10 text-[#22c55e] px-3 py-1 rounded-full text-sm">SaaS Content</span>
 </div>
 </div>
 </div>
 </section>

 {/* Section 7: Optimization Checklist */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Complete Profile Optimization Checklist
 </h2>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="space-y-3">
 <label className="flex items-start">
 <input type="checkbox" className="mt-1 mr-3" disabled />
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Profile Photo:</strong>Professional, clear face, good lighting, friendly expression
 </span>
 </label>
 <label className="flex items-start">
 <input type="checkbox" className="mt-1 mr-3" disabled />
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Headline:</strong>Uses formula "I help [client] achieve [outcome] through [method]"
 </span>
 </label>
 <label className="flex items-start">
 <input type="checkbox" className="mt-1 mr-3" disabled />
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Bio Paragraph 1:</strong>Addresses client pain point
 </span>
 </label>
 <label className="flex items-start">
 <input type="checkbox" className="mt-1 mr-3" disabled />
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Bio Paragraph 2:</strong>Explains your solution and experience
 </span>
 </label>
 <label className="flex items-start">
 <input type="checkbox" className="mt-1 mr-3" disabled />
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Bio Paragraph 3:</strong>Describes the result clients get
 </span>
 </label>
 <label className="flex items-start">
 <input type="checkbox" className="mt-1 mr-3" disabled />
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Portfolio:</strong>3-5 relevant projects with descriptions
 </span>
 </label>
 <label className="flex items-start">
 <input type="checkbox" className="mt-1 mr-3" disabled />
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Skills:</strong>10-15 searchable keywords clients actually use
 </span>
 </label>
 <label className="flex items-start">
 <input type="checkbox" className="mt-1 mr-3" disabled />
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">No Typos:</strong>Ran through Grammarly or spell-check
 </span>
 </label>
 <label className="flex items-start">
 <input type="checkbox" className="mt-1 mr-3" disabled />
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Call-to-Action:</strong>Clear next step ("Let's chat" or "Book a call")
 </span>
 </label>
 <label className="flex items-start">
 <input type="checkbox" className="mt-1 mr-3" disabled />
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Niche-Focused:</strong>Everything speaks to one specific target client
 </span>
 </label>
 </div>
 </div>
 </section>

 {/* Section 8: Next Steps */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 After Optimizing Your Profile: What's Next?
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 1
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Start Applying to Jobs
 </h3>
 <p className="text-[#64607d] mb-3">
 Your optimized profile won't get you hired by itself. You need to actively apply to 5-10 jobs per day.
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
 2
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Get Your First Review
 </h3>
 <p className="text-[#64607d] mb-3">
 Even one 5-star review dramatically increases your hire rate. Overdeliver on your first project to earn it.
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 3
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Track and Iterate
 </h3>
 <p className="text-[#64607d] mb-3">
 Monitor which proposals get responses. If you're applying to 20+ jobs with zero replies, test different headlines or portfolio pieces.
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
 Master every step of your freelance journey
 </p>
 <Link
 href={`/${locale}/gids/aan-de-slag`}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Browse All Guides →
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
 "name": "Profile Optimization Secrets That Get You Hired",
 "description": "Transform your freelance profile from ignored to irresistible. Learn the psychological triggers top earners use to get hired.",
 "step": [
 {
 "@type": "HowToStep",
 "name": "Optimize Your Profile Photo",
 "text": "Use a professional, friendly headshot with good lighting and clean background.",
 "position": 1
 },
 {
 "@type": "HowToStep",
 "name": "Write a Compelling Headline",
 "text": "Use formula: I help [TARGET CLIENT] achieve [DESIRED OUTCOME] through [YOUR METHOD]",
 "position": 2
 },
 {
 "@type": "HowToStep",
 "name": "Craft Your Bio Using 3-Paragraph Framework",
 "text": "Paragraph 1: Client pain point, Paragraph 2: Your solution, Paragraph 3: Their result",
 "position": 3
 },
 {
 "@type": "HowToStep",
 "name": "Curate 3-5 Portfolio Pieces",
 "text": "Show only your best, most relevant work with problem-solution-result descriptions.",
 "position": 4
 },
 {
 "@type": "HowToStep",
 "name": "Add Searchable Skills and Keywords",
 "text": "Research platform job posts and add 10-15 skills that clients actually search for.",
 "position": 5
 }
 ],
 "author": {
 "@type": "Organization",
 "name": "SkillLinkup"
 }
 })
 }}
 />
 </main>

 <Footer />
 </>
 );
}
