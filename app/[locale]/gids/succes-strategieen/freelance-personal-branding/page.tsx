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

 const slug = 'freelance-personal-branding';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/succes-strategieen/${slug}`;

 return {
 title: "Personal Branding for Freelancers: Stand Out Online in 30 Days",
 description: "Build a personal brand that attracts premium clients. Complete 30-day framework with content templates, positioning strategies, and social media playbook.",
 keywords: "personal branding freelance, freelancer brand, online presence, thought leadership, freelance marketing",
 openGraph: {
 title: "Personal Branding for Freelancers: Stand Out Online in 30 Days",
 description: "Build a personal brand that attracts premium clients in 30 days.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Personal Branding for Freelancers - SkillLinkup',
 }
 ],
 locale: locale === 'nl' ? 'nl_NL' : 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "Personal Branding for Freelancers: Stand Out Online in 30 Days",
 description: "Build a personal brand that attracts premium clients in 30 days.",
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 },
 };
}

export default async function PersonalBrandingPage({ params }: Props) {
 const { locale } = await params;

 return (
 <>
 <Header />

 <main className="min-h-screen bg-[#f8f9fb]">
 <section className="bg-gradient-to-br from-[#1e1541] via-[#2a1f5e] to-[#1e1541] text-white py-16">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
 Personal Branding for Freelancers: Stand Out Online
 </h1>
 <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
 Generic freelancer profiles get ignored. A strong personal brand makes clients come to you, willing to pay premium rates. Here's your 30-day framework.
 </p>
 <Link
 href={locale === 'nl' ? '/nl/platforms' : '/en/platforms'}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Find Your Platform →
 </Link>
 </div>
 </div>
 </section>

 <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">

 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Why Personal Branding Matters (Even If You Hate Self-Promotion)
 </h2>
 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 "I just want to do good work and let my portfolio speak for itself." That worked in 2015. In 2026, there are 100+ freelancers with similar portfolios competing for every premium project.
 </p>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
 The Brand Premium Effect
 </h3>
 <div className="grid md:grid-cols-2 gap-6">
 <div className="border-l-4 border-red-500 pl-4">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
 Without Personal Brand
 </h4>
 <ul className="space-y-2 text-[#64607d] text-sm">
 <li>• You chase every lead</li>
 <li>• Compete on price</li>
 <li>• Explain your value constantly</li>
 <li>• Get commoditized</li>
 <li>• Struggle with rate increases</li>
 <li>• $40-$60/hour ceiling</li>
 </ul>
 </div>
 <div className="border-l-4 border-[#22c55e] pl-4">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
 With Strong Brand
 </h4>
 <ul className="space-y-2 text-[#64607d] text-sm">
 <li>• Clients find you</li>
 <li>• Premium pricing accepted</li>
 <li>• Pre-sold on your expertise</li>
 <li>• Seen as specialist</li>
 <li>• Rate increases expected</li>
 <li>• $100-$200+/hour achievable</li>
 </ul>
 </div>
 </div>
 </div>

 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 mb-8 text-white">
 <h3 className="font-heading font-bold text-2xl mb-4">
 What Personal Branding Actually Means
 </h3>
 <p className="text-white/90 mb-4">
 It's not about being famous or posting selfies. Personal branding is:
 </p>
 <ul className="space-y-3 text-white/90">
 <li>• <strong>Being known for solving a specific problem</strong>(not "I do websites")</li>
 <li>• <strong>Having a clear point of view</strong>(opinions attract, generic advice repels)</li>
 <li>• <strong>Consistent visibility</strong>(showing up where your clients hang out)</li>
 <li>• <strong>Proof of expertise</strong>(case studies, insights, frameworks)</li>
 </ul>
 </div>
 </div>
 </section>

 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 The 4-Part Personal Brand Framework
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-start mb-6">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 1
 </div>
 <div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-2">
 Part 1: Your Positioning Statement
 </h3>
 <p className="text-[#64607d]">
 This is your "I help..." statement that appears everywhere: profile, website, LinkedIn headline.
 </p>
 </div>
 </div>

 <div className="bg-gradient-to-br from-[#1e1541] to-[#2a1f5e] rounded-lg shadow-xl p-8 mb-6 text-white">
 <h4 className="font-heading font-bold text-xl mb-4">
 The Positioning Formula
 </h4>
 <div className="bg-white/10 backdrop-blur rounded-lg p-6">
 <p className="text-white/90 mb-4 font-mono text-sm">
 "I help [specific target] achieve [specific outcome] without [common obstacle]"
 </p>
 <div className="border-t border-white/20 pt-4">
 <p className="text-sm text-white/70 mb-3">Strong Examples:</p>
 <ul className="space-y-2 text-white/90 text-sm">
 <li>✓ "I help SaaS founders increase trial conversions 30%+ without redesigning their entire product"</li>
 <li>✓ "I help ecommerce brands scale to $1M+ without hiring a full dev team"</li>
 <li>✓ "I help B2B companies generate qualified leads without cold calling"</li>
 </ul>
 <p className="text-sm text-white/70 mb-2 mt-4">Weak Examples (too generic):</p>
 <ul className="space-y-2 text-red-300 text-sm">
 <li>✗ "I build websites and apps"</li>
 <li>✗ "Full-stack developer available for hire"</li>
 <li>✗ "I help businesses grow online"</li>
 </ul>
 </div>
 </div>
 </div>

 <div className="bg-gray-50 rounded-lg p-6">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-4">
 How to Build Your Positioning
 </h4>
 <div className="space-y-4">
 <div>
 <p className="text-[#64607d] font-semibold mb-2">Step 1: Identify Your Best Client Wins</p>
 <p className="text-[#64607d] text-sm">Which projects delivered the most value? What problems did you solve? What measurable results?</p>
 </div>
 <div>
 <p className="text-[#64607d] font-semibold mb-2">Step 2: Find the Pattern</p>
 <p className="text-[#64607d] text-sm">Is there a common client type (ecommerce, SaaS, agencies)? A common problem (low conversions, slow site, bad UX)?</p>
 </div>
 <div>
 <p className="text-[#64607d] font-semibold mb-2">Step 3: Test Your Statement</p>
 <p className="text-[#64607d] text-sm">When you tell someone "I help X achieve Y," do they immediately know if they're a fit? Good positioning is polarizing - it attracts some and repels others.</p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-start mb-6">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 2
 </div>
 <div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-2">
 Part 2: Your Content Pillars (What You Talk About)
 </h3>
 <p className="text-[#64607d]">
 Pick 3-5 topics you'll consistently create content around. This builds authority and SEO.
 </p>
 </div>
 </div>

 <div className="bg-gray-50 rounded-lg p-6 mb-6">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-4">
 Content Pillar Framework
 </h4>
 <div className="space-y-4">
 <div className="bg-white rounded-lg p-4 border-l-4 border-[#ef2b70]">
 <p className="font-semibold text-[#1e1541] mb-2">Pillar 1: Your Core Expertise</p>
 <p className="text-[#64607d] text-sm">The thing you're best at. Example: "Conversion rate optimization for SaaS"</p>
 </div>
 <div className="bg-white rounded-lg p-4 border-l-4 border-[#ef2b70]">
 <p className="font-semibold text-[#1e1541] mb-2">Pillar 2: Adjacent Skill</p>
 <p className="text-[#64607d] text-sm">Related expertise. Example: "A/B testing strategies"</p>
 </div>
 <div className="bg-white rounded-lg p-4 border-l-4 border-[#ef2b70]">
 <p className="font-semibold text-[#1e1541] mb-2">Pillar 3: Industry Insights</p>
 <p className="text-[#64607d] text-sm">Trends and analysis. Example: "SaaS pricing psychology"</p>
 </div>
 <div className="bg-white rounded-lg p-4 border-l-4 border-[#ef2b70]">
 <p className="font-semibold text-[#1e1541] mb-2">Pillar 4: Case Studies</p>
 <p className="text-[#64607d] text-sm">Real results. Example: "How we increased X's conversion 47%"</p>
 </div>
 <div className="bg-white rounded-lg p-4 border-l-4 border-[#ef2b70]">
 <p className="font-semibold text-[#1e1541] mb-2">Pillar 5: Freelance Journey (Optional)</p>
 <p className="text-[#64607d] text-sm">Behind-the-scenes. Example: "From $30/hr to $150/hr in 18 months"</p>
 </div>
 </div>
 </div>

 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg">
 <p className="text-[#1e1541] font-semibold mb-2">
 Content Mix Rule: 80/20
 </p>
 <p className="text-[#64607d] text-sm">
 80% educational/valuable content, 20% promotional. Never sell in every post. Build trust first.
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-start mb-6">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 3
 </div>
 <div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-2">
 Part 3: Your Distribution Channels
 </h3>
 <p className="text-[#64607d]">
 Don't try to be everywhere. Pick 1-2 platforms where your target clients hang out.
 </p>
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-6">
 <div className="bg-gray-50 rounded-lg p-6">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
 LinkedIn (B2B Freelancers)
 </h4>
 <p className="text-[#64607d] text-sm mb-3">
 <strong>Best for:</strong>Consultants, developers, designers targeting business clients
 </p>
 <ul className="space-y-2 text-[#64607d] text-sm">
 <li>• Post 3-5x per week</li>
 <li>• Mix: insights, case studies, frameworks</li>
 <li>• Engage 30 min/day (comment on others' posts)</li>
 <li>• DM warm connections with value-first messages</li>
 </ul>
 </div>

 <div className="bg-gray-50 rounded-lg p-6">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
 Twitter/X (Tech & Design)
 </h4>
 <p className="text-[#64607d] text-sm mb-3">
 <strong>Best for:</strong>Developers, designers, technical writers
 </p>
 <ul className="space-y-2 text-[#64607d] text-sm">
 <li>• Tweet 1-3x per day</li>
 <li>• Mix: tips, threads, project updates</li>
 <li>• Build in public (share WIP)</li>
 <li>• Engage with your niche community</li>
 </ul>
 </div>

 <div className="bg-gray-50 rounded-lg p-6">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
 YouTube (Visual Skills)
 </h4>
 <p className="text-[#64607d] text-sm mb-3">
 <strong>Best for:</strong>Designers, video editors, creatives
 </p>
 <ul className="space-y-2 text-[#64607d] text-sm">
 <li>• 1-2 videos per week</li>
 <li>• Tutorials, process videos, case studies</li>
 <li>• SEO optimize titles and descriptions</li>
 <li>• Patience required (6-12 months to grow)</li>
 </ul>
 </div>

 <div className="bg-gray-50 rounded-lg p-6">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
 Blog/Newsletter (Authority)
 </h4>
 <p className="text-[#64607d] text-sm mb-3">
 <strong>Best for:</strong>Long-form thinkers, strategists
 </p>
 <ul className="space-y-2 text-[#64607d] text-sm">
 <li>• Weekly or bi-weekly posts</li>
 <li>• Deep-dive guides and frameworks</li>
 <li>• Build email list (own your audience)</li>
 <li>• Repurpose content to social media</li>
 </ul>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-start mb-6">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 4
 </div>
 <div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-2">
 Part 4: Your Social Proof System
 </h3>
 <p className="text-[#64607d]">
 Proof makes your brand credible. Here's what you need:
 </p>
 </div>
 </div>

 <div className="space-y-4">
 <div className="bg-gray-50 rounded-lg p-6">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3 flex items-center">
 
 Case Studies (3 Minimum)
 </h4>
 <p className="text-[#64607d] mb-3">
 <strong>Format:</strong>Problem → Solution → Results (with numbers)
 </p>
 <div className="bg-white border-l-4 border-[#22c55e] p-4 rounded-r-lg">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Example:</strong>"Reduced cart abandonment from 68% to 41% for ecommerce client, resulting in $47K additional monthly revenue"
 </p>
 </div>
 </div>

 <div className="bg-gray-50 rounded-lg p-6">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3 flex items-center">
 
 Testimonials (5-10 Quality Ones)
 </h4>
 <p className="text-[#64607d] mb-3">
 <strong>Get specific testimonials:</strong>Don't ask "Can you write a review?" Ask "What specific result did you get from our work together?"
 </p>
 <div className="bg-white border-l-4 border-[#22c55e] p-4 rounded-r-lg">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Good:</strong>"Sarah increased our organic traffic 234% in 4 months" - John, Founder<br/>
 <strong className="text-[#1e1541]">Bad:</strong>"Great work, very professional!" - Anonymous
 </p>
 </div>
 </div>

 <div className="bg-gray-50 rounded-lg p-6">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3 flex items-center">
 
 Credentials & Achievements
 </h4>
 <ul className="space-y-2 text-[#64607d] text-sm">
 <li>• Platform ratings (Top Rated on Upwork, Rising Talent, etc.)</li>
 <li>• Certifications (Google Analytics, AWS, etc.)</li>
 <li>• Published work (articles, courses, talks)</li>
 <li>• Client roster (if impressive: "Worked with Nike, Spotify, Tesla")</li>
 </ul>
 </div>
 </div>
 </div>
 </div>
 </section>

 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Build Your Brand on Top Platforms
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Some platforms help you build authority faster with verified badges and featured profiles
 </p>
 <Link
 href={locale === 'nl' ? '/nl/platforms' : '/en/platforms'}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Compare Platforms →
 </Link>
 </div>
 </section>

 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 30-Day Brand Building Roadmap
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4 flex items-center">
 <span className="bg-[#ef2b70] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 text-sm">
 Week 1
 </span>
 Foundation & Positioning
 </h3>
 <ul className="space-y-3 text-[#64607d] ml-13">
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Write your positioning statement (3 variations, test with peers)</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Define 3-5 content pillars based on best client wins</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Choose 1-2 primary distribution channels</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Audit current profiles (LinkedIn, platform profiles, website)</span>
 </li>
 </ul>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4 flex items-center">
 <span className="bg-[#ef2b70] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 text-sm">
 Week 2
 </span>
 Content & Proof
 </h3>
 <ul className="space-y-3 text-[#64607d] ml-13">
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Create 3 case studies with measurable results</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Request 5-10 specific testimonials from past clients</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Update all profiles with new positioning statement</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Create content calendar (4 weeks of topics)</span>
 </li>
 </ul>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4 flex items-center">
 <span className="bg-[#ef2b70] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 text-sm">
 Week 3
 </span>
 Launch & Distribution
 </h3>
 <ul className="space-y-3 text-[#64607d] ml-13">
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Post first 5 pieces of content on chosen channels</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Engage 30 minutes daily (comment, share, connect)</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Reach out to 10 warm connections with value-first messages</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Start collecting email subscribers (simple opt-in form)</span>
 </li>
 </ul>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4 flex items-center">
 <span className="bg-[#ef2b70] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 text-sm">
 Week 4
 </span>
 Optimize & Scale
 </h3>
 <ul className="space-y-3 text-[#64607d] ml-13">
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Analyze what content performed best (engagement, reach)</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Double down on winning formats and topics</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Create content templates for efficiency</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span>Set up tracking: profile views, connection requests, inquiries</span>
 </li>
 </ul>
 </div>
 </div>
 </section>

 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Content Templates You Can Use Today
 </h2>

 <div className="grid md:grid-cols-2 gap-6">
 <div className="bg-white rounded-lg shadow-lg p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
 Template 1: The Framework Post
 </h3>
 <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-[#64607d] whitespace-pre-line">
{`I've [achieved result] using this [X-step] framework:

1. [Step 1 with brief explanation]
2. [Step 2 with brief explanation]
3. [Step 3 with brief explanation]

Example: [Quick case study or result]

Try it on [specific use case].

What's your approach?`}
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
 Template 2: The Mistake Post
 </h3>
 <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-[#64607d] whitespace-pre-line">
{`Most [target audience] make this mistake with [topic]:

They [common wrong approach].

This causes [negative outcome].

Instead, do this:
→ [Better approach]
→ [Why it works]
→ [Expected result]

I learned this after [personal experience].

Are you making this mistake?`}
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
 Template 3: The Case Study
 </h3>
 <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-[#64607d] whitespace-pre-line">
{`Client came to me with [specific problem].

The situation:
• [Metric 1 before]
• [Metric 2 before]
• [Pain point]

What we did:
→ [Action 1]
→ [Action 2]
→ [Action 3]

Results after [timeframe]:
✓ [Metric 1 after]
✓ [Metric 2 after]
✓ [Additional win]

Key lesson: [Insight]`}
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
 Template 4: The Contrarian Take
 </h3>
 <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-[#64607d] whitespace-pre-line">
{`Unpopular opinion: [Contrarian statement]

Everyone says you should [common advice].

But here's why that's wrong:

1. [Reason 1 with evidence]
2. [Reason 2 with evidence]
3. [Reason 3 with evidence]

Try [alternative approach] instead.

[Your result from doing this]

Change my mind.`}
 </div>
 </div>
 </div>
 </section>

 <section className="mb-16">
 <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Learn From Successful Personal Brands
 </h3>
 <p className="text-xl mb-6 text-gray-300">
 Read case studies of freelancers who built 6-figure brands from scratch
 </p>
 <Link
 href={locale === 'nl' ? '/nl/blog' : '/en/blog'}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Read Success Stories →
 </Link>
 </div>
 </section>

 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Get Weekly Branding Tips & Templates
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Join our newsletter for content templates, positioning strategies, and growth tactics
 </p>
 <Link
 href={locale === 'nl' ? '/nl/newsletter' : '/en/newsletter'}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Get Free Branding Kit →
 </Link>
 </div>
 </section>

 </article>

 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": ["Article", "HowTo"],
 "headline": "Personal Branding for Freelancers: Stand Out Online in 30 Days",
 "description": "Build a personal brand that attracts premium clients in 30 days.",
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
 "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/succes-strategieen/freelance-personal-branding`
 },
 "step": [
 {
 "@type": "HowToStep",
 "name": "Create Your Positioning Statement",
 "text": "Define who you help, what outcome you deliver, and what obstacle you remove"
 },
 {
 "@type": "HowToStep",
 "name": "Establish Content Pillars",
 "text": "Choose 3-5 topics to consistently create content around"
 },
 {
 "@type": "HowToStep",
 "name": "Select Distribution Channels",
 "text": "Pick 1-2 platforms where your target clients hang out"
 },
 {
 "@type": "HowToStep",
 "name": "Build Social Proof",
 "text": "Create case studies, collect testimonials, and showcase credentials"
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
 "name": locale === 'nl' ? "Gids" : "Guide",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids`
 },
 {
 "@type": "ListItem",
 "position": 3,
 "name": locale === 'nl' ? "Succes Strategieën" : "Success Strategies",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/succes-strategieen`
 },
 {
 "@type": "ListItem",
 "position": 4,
 "name": "Personal Branding for Freelancers",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/succes-strategieen/freelance-personal-branding`
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
