import Link from "next/link";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type Props = {
 params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'freelance-portfolio-from-scratch';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/aan-de-slag/${slug}`;

 return {
 title: "Build a Stunning Freelance Portfolio from Scratch in 2026 (Step-by-Step)",
 description: "Create a portfolio that wins clients in 7 days. No experience needed. Learn what to include, tools to use, and mistakes to avoid. Free templates included.",
 keywords: "freelance portfolio, build portfolio from scratch, portfolio examples, freelance portfolio website, beginner portfolio 2026",
 openGraph: {
 title: "Build a Stunning Freelance Portfolio from Scratch in 2026 (Step-by-Step)",
 description: "Create a portfolio that wins clients in 7 days. No experience needed. Learn what to include, tools to use, and mistakes to avoid. Free templates included.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Build a Freelance Portfolio from Scratch - SkillLinkup',
 }
 ],
 locale: locale === 'nl' ? 'nl_NL' : 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "Build a Stunning Freelance Portfolio from Scratch in 2026 (Step-by-Step)",
 description: "Create a portfolio that wins clients in 7 days. No experience needed. Learn what to include, tools to use, and mistakes to avoid. Free templates included.",
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 },
 };
}

export default async function FreelancePortfolioFromScratchPage({ params }: Props) {
 const { locale } = await params;

 return (
 <>
 

 <main className="min-h-screen bg-[#f8f9fb]">
 {/* Hero Section */}
 <section className="bg-gradient-to-br from-[#1e1541] via-[#2a1f5e] to-[#1e1541] text-white py-16">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
 Build a Stunning Freelance Portfolio from Scratch in 7 Days
 </h1>
 <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
 No previous work? No problem. Learn the exact framework successful freelancers use to create portfolios that win high-paying clients—even without experience.
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Browse Platforms to Showcase Your Work →
 </Link>
 </div>
 </div>
 </section>

 {/* Main Content */}
 <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">

 {/* Section 1: Why Your Portfolio Matters */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Why Your Portfolio Is Your Most Powerful Sales Tool
 </h2>
 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Your portfolio isn't just a collection of past work—it's proof that you can solve client problems. It's the difference between "I can do this" and "I've already done this."
 </p>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 3 Reasons Why Portfolios Win Clients
 </h3>
 <ul className="space-y-4">
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3 text-xl">1.</span>
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Trust Acceleration:</strong>Clients see your work and immediately understand your capabilities—no explaining needed
 </span>
 </li>
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3 text-xl">2.</span>
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Price Justification:</strong>Great portfolios command premium rates because they demonstrate proven results
 </span>
 </li>
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3 text-xl">3.</span>
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Competitive Edge:</strong>73% of freelancers don't have a portfolio—having one puts you ahead instantly
 </span>
 </li>
 </ul>
 </div>

 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg mb-8">
 <p className="text-[#1e1541] font-semibold mb-2">
 The Beginner's Paradox
 </p>
 <p className="text-[#64607d]">
 "I need clients to build a portfolio, but I need a portfolio to get clients." We'll solve this exact problem in the next section with 5 proven strategies.
 </p>
 </div>
 </div>
 </section>

 {/* Section 2: What to Include */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 The 7-Day Portfolio Building Framework
 </h2>

 <div className="space-y-8">
 {/* Day 1 */}
 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-center mb-4">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4">
 1
 </div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
 Day 1: Choose Your Platform
 </h3>
 </div>
 <p className="text-[#64607d] mb-4">
 Don't overthink this. Pick ONE platform to start. You can always add more later.
 </p>

 <div className="grid md:grid-cols-3 gap-4">
 <div className="border border-gray-200 rounded-lg p-4">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 Notion (Free)
 </h4>
 <p className="text-sm text-[#64607d] mb-2">Best for: Writers, consultants, beginners</p>
 <p className="text-xs text-[#64607d]">Easy setup, templates available, no coding needed</p>
 </div>

 <div className="border border-gray-200 rounded-lg p-4">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 Behance (Free)
 </h4>
 <p className="text-sm text-[#64607d] mb-2">Best for: Designers, creatives, visual artists</p>
 <p className="text-xs text-[#64607d]">Portfolio-focused, built-in audience, Adobe integration</p>
 </div>

 <div className="border border-gray-200 rounded-lg p-4">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
 GitHub (Free)
 </h4>
 <p className="text-sm text-[#64607d] mb-2">Best for: Developers, programmers, tech roles</p>
 <p className="text-xs text-[#64607d]">Code samples, contributions, technical credibility</p>
 </div>
 </div>
 </div>

 {/* Day 2-3 */}
 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-center mb-4">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4">
 2-3
 </div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
 Day 2-3: Create Your First 3 Projects (Even Without Clients)
 </h3>
 </div>

 <div className="mb-6">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
 5 Ways to Build Portfolio Projects Without Experience:
 </h4>

 <div className="space-y-4">
 <div className="border-l-4 border-[#22c55e] pl-4">
 <p className="font-semibold text-[#1e1541] mb-1">
 1. Redesign Existing Work
 </p>
 <p className="text-[#64607d] text-sm">
 Find a poorly designed website, app, or brand. Redesign it and document your process. Show before/after comparisons.
 </p>
 </div>

 <div className="border-l-4 border-[#22c55e] pl-4">
 <p className="font-semibold text-[#1e1541] mb-1">
 2. Volunteer for Non-Profits
 </p>
 <p className="text-[#64607d] text-sm">
 Reach out to 5 local charities. Offer free work in exchange for a testimonial and portfolio piece. Get real client experience.
 </p>
 </div>

 <div className="border-l-4 border-[#22c55e] pl-4">
 <p className="font-semibold text-[#1e1541] mb-1">
 3. Create Self-Initiated Projects
 </p>
 <p className="text-[#64607d] text-sm">
 Build something you wish existed. A tool, design, article series, or product concept. Document the entire process.
 </p>
 </div>

 <div className="border-l-4 border-[#22c55e] pl-4">
 <p className="font-semibold text-[#1e1541] mb-1">
 4. Recreate Popular Work
 </p>
 <p className="text-[#64607d] text-sm">
 Study successful projects in your field. Recreate them to demonstrate your skills. Label clearly as "recreation" or "inspired by."
 </p>
 </div>

 <div className="border-l-4 border-[#22c55e] pl-4">
 <p className="font-semibold text-[#1e1541] mb-1">
 5. Use Freelance Platforms
 </p>
 <p className="text-[#64607d] text-sm">
 Take 1-2 small, low-budget projects to build initial portfolio pieces. Focus on getting testimonials and case studies.
 </p>
 </div>
 </div>
 </div>
 </div>

 {/* Day 4-5 */}
 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-center mb-4">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4">
 4-5
 </div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
 Day 4-5: Write Compelling Project Descriptions
 </h3>
 </div>

 <p className="text-[#64607d] mb-4">
 Don't just show work—tell the story. Use this proven framework for each project:
 </p>

 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg p-6 text-white mb-4">
 <h4 className="font-heading font-bold text-xl mb-3">
 The Problem-Solution-Result Framework
 </h4>
 <div className="space-y-3 text-sm">
 <div>
 <strong className="block mb-1">1. The Problem (2 sentences)</strong>
 <p className="text-white/90">What challenge did the client face? What was broken or missing?</p>
 </div>
 <div>
 <strong className="block mb-1">2. Your Solution (3-4 sentences)</strong>
 <p className="text-white/90">What did you create? What approach did you take? Why did you make these decisions?</p>
 </div>
 <div>
 <strong className="block mb-1">3. The Result (2 sentences + metrics)</strong>
 <p className="text-white/90">What changed? Include numbers if possible: 50% faster, 10,000 views, 30% conversion increase.</p>
 </div>
 </div>
 </div>

 <div className="bg-[#f0fdf4] border border-[#22c55e] rounded-lg p-4">
 <p className="text-sm text-[#1e1541] font-semibold mb-2">
 ✅ Example: Good Project Description
 </p>
 <p className="text-xs text-[#64607d] italic">
 "Local bakery had no online ordering system during COVID-19, losing 60% of potential sales. I built a simple WordPress site with WooCommerce integration, custom menu design, and mobile optimization. Result: Online orders now represent 45% of revenue, with 200+ weekly orders and 4.8-star customer reviews."
 </p>
 </div>
 </div>

 {/* Day 6 */}
 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-center mb-4">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4">
 6
 </div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
 Day 6: Add Essential Portfolio Elements
 </h3>
 </div>

 <div className="grid md:grid-cols-2 gap-6">
 <div>
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
 Must-Have Elements:
 </h4>
 <ul className="space-y-2 text-[#64607d]">
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Professional headshot (or well-lit photo)</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>2-3 sentence bio focusing on client benefits</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Clear services list (3-5 offerings max)</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Contact information or booking link</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Social proof (testimonials or endorsements)</span>
 </li>
 </ul>
 </div>

 <div>
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
 Nice-to-Have Elements:
 </h4>
 <ul className="space-y-2 text-[#64607d]">
 <li className="flex items-start">
 <span className="text-[#64607d] mr-2">○</span>
 <span>Process or methodology explanation</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#64607d] mr-2">○</span>
 <span>Skills or tools list</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#64607d] mr-2">○</span>
 <span>Blog or thought leadership content</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#64607d] mr-2">○</span>
 <span>Awards, certifications, or credentials</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#64607d] mr-2">○</span>
 <span>Video introduction (30-60 seconds)</span>
 </li>
 </ul>
 </div>
 </div>
 </div>

 {/* Day 7 */}
 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-center mb-4">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4">
 7
 </div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
 Day 7: Polish and Launch
 </h3>
 </div>

 <div className="space-y-4">
 <div>
 <h4 className="font-semibold text-[#1e1541] mb-2">Final Checklist:</h4>
 <div className="space-y-2">
 <label className="flex items-center text-[#64607d]">
 <input type="checkbox" className="mr-2" disabled />
 <span>All images load quickly (under 2 seconds)</span>
 </label>
 <label className="flex items-center text-[#64607d]">
 <input type="checkbox" className="mr-2" disabled />
 <span>No typos or grammar errors (use Grammarly)</span>
 </label>
 <label className="flex items-center text-[#64607d]">
 <input type="checkbox" className="mr-2" disabled />
 <span>Mobile-friendly layout (test on phone)</span>
 </label>
 <label className="flex items-center text-[#64607d]">
 <input type="checkbox" className="mr-2" disabled />
 <span>Contact form or email works correctly</span>
 </label>
 <label className="flex items-center text-[#64607d]">
 <input type="checkbox" className="mr-2" disabled />
 <span>Links to social media or freelance profiles</span>
 </label>
 <label className="flex items-center text-[#64607d]">
 <input type="checkbox" className="mr-2" disabled />
 <span>Analytics installed (Google Analytics or similar)</span>
 </label>
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
 Ready to Get Your First Clients?
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Browse freelance platforms to showcase your new portfolio
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Compare Platforms Now →
 </Link>
 </div>
 </section>

 {/* Section 3: Common Mistakes */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 7 Portfolio Mistakes That Lose You Clients
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake 1: Waiting for "Perfect" Work
 </h3>
 <p className="text-[#64607d] mb-2">
 Perfect portfolios don't exist. Good-enough portfolios win clients. Launch with 3 solid projects and improve as you go.
 </p>
 <p className="text-sm text-[#22c55e]">
 ✅ Better: Launch now, add better projects later
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake 2: Showing Every Project You've Ever Done
 </h3>
 <p className="text-[#64607d] mb-2">
 More projects ≠ better portfolio. Show your 3-6 BEST projects that demonstrate the work you WANT to do.
 </p>
 <p className="text-sm text-[#22c55e]">
 ✅ Better: Quality over quantity—curate ruthlessly
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake 3: No Results or Metrics
 </h3>
 <p className="text-[#64607d] mb-2">
 "I designed a website" tells clients nothing. "I designed a website that increased conversions by 32%" proves your value.
 </p>
 <p className="text-sm text-[#22c55e]">
 ✅ Better: Include numbers, percentages, or client quotes
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake 4: Generic "About Me" Section
 </h3>
 <p className="text-[#64607d] mb-2">
 "I'm a passionate designer who loves to create" could describe anyone. Focus on specific client benefits and outcomes.
 </p>
 <p className="text-sm text-[#22c55e]">
 ✅ Better: "I help SaaS companies increase signups through conversion-focused design"
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake 5: No Clear Next Step
 </h3>
 <p className="text-[#64607d] mb-2">
 Make it obvious how clients can hire you. Don't make them search for your contact information.
 </p>
 <p className="text-sm text-[#22c55e]">
 ✅ Better: "Book a free 15-minute call" button on every page
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake 6: Slow Loading Speed
 </h3>
 <p className="text-[#64607d] mb-2">
 53% of visitors leave if a page takes longer than 3 seconds to load. Compress images and use fast hosting.
 </p>
 <p className="text-sm text-[#22c55e]">
 ✅ Better: Test with PageSpeed Insights, optimize images
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Mistake 7: Ignoring Mobile Experience
 </h3>
 <p className="text-[#64607d] mb-2">
 Over 60% of portfolio visitors browse on mobile. If your portfolio doesn't work on phones, you're losing clients.
 </p>
 <p className="text-sm text-[#22c55e]">
 ✅ Better: Always test on mobile before launching
 </p>
 </div>
 </div>
 </section>

 {/* CTA Section 2 */}
 <section className="mb-16">
 <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Use Professional Tools to Boost Your Freelance Career
 </h3>
 <p className="text-xl mb-6 text-gray-300">
 Track time, calculate rates, and create invoices—all free
 </p>
 <Link
 href={`/${locale}/tools`}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Explore Free Tools →
 </Link>
 </div>
 </section>

 {/* Section 4: Next Steps */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 What to Do After Building Your Portfolio
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 1
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Optimize Your Profile on Freelance Platforms
 </h3>
 <p className="text-[#64607d] mb-3">
 Link your portfolio in your Upwork, Fiverr, or Freelancer profile. Use it as proof of your skills during the application process.
 </p>
 <Link
 href={`/${locale}/gids/aan-de-slag/profile-optimization-secrets`}
 className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
 >
 Learn Profile Optimization →
 </Link>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 2
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Choose Your Niche
 </h3>
 <p className="text-[#64607d] mb-3">
 Generalists struggle to stand out. Specialists charge 2-3x more because they solve specific problems for specific clients.
 </p>
 <Link
 href={`/${locale}/gids/aan-de-slag/freelance-niche-selection`}
 className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
 >
 Discover How to Pick Your Niche →
 </Link>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 3
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Land Your First Client
 </h3>
 <p className="text-[#64607d] mb-3">
 Follow our proven 30-day system to go from zero clients to your first paid project—even as a complete beginner.
 </p>
 <Link
 href={`/${locale}/gids/aan-de-slag/first-client-in-30-days`}
 className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
 >
 Get Your First Client →
 </Link>
 </div>
 </div>
 </div>
 </section>

 {/* Final CTA */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Start Reading Our Beginner Guides
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Everything you need to launch your freelance career in 2026
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
 "@type": "HowTo",
 "name": "Build a Stunning Freelance Portfolio from Scratch in 7 Days",
 "description": "Create a portfolio that wins clients in 7 days. No experience needed. Learn what to include, tools to use, and mistakes to avoid.",
 "totalTime": "P7D",
 "step": [
 {
 "@type": "HowToStep",
 "name": "Choose Your Platform",
 "text": "Pick ONE platform to start: Notion (free), Behance (for designers), or GitHub (for developers).",
 "position": 1
 },
 {
 "@type": "HowToStep",
 "name": "Create Your First 3 Projects",
 "text": "Build portfolio projects without clients: redesign existing work, volunteer for non-profits, create self-initiated projects, recreate popular work, or use freelance platforms.",
 "position": 2
 },
 {
 "@type": "HowToStep",
 "name": "Write Compelling Project Descriptions",
 "text": "Use the Problem-Solution-Result framework: describe the challenge, explain your solution, and show measurable results.",
 "position": 3
 },
 {
 "@type": "HowToStep",
 "name": "Add Essential Portfolio Elements",
 "text": "Include professional headshot, 2-3 sentence bio, services list, contact information, and social proof.",
 "position": 4
 },
 {
 "@type": "HowToStep",
 "name": "Polish and Launch",
 "text": "Final checklist: optimize images, check for typos, ensure mobile-friendly layout, test contact form, add analytics.",
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

 
 </>
 );
}
