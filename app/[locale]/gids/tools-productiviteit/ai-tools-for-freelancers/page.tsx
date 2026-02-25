import { Metadata } from 'next';
import Link from 'next/link';
import { AdWidget } from '@/components/AdWidget';
import { Brain, CheckCircle, ArrowRight, Zap, Star, TrendingUp, Sparkles, DollarSign, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function generateMetadata({
 params
}: {
 params: Promise<{ locale: string }>
}): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'ai-tools-for-freelancers';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/tools-productiviteit/${slug}`;

 return {
 title: 'Best AI Tools for Freelancers in 2026: 15+ Tools to 10x Productivity',
 description: 'Discover the best AI tools for freelancers in 2026. From ChatGPT to Midjourney - complete guide to AI tools that save 15+ hours per week and boost income by 50%.',
 keywords: 'AI tools for freelancers, ChatGPT for freelancers, AI productivity tools, best AI tools 2026, freelance AI software',
 openGraph: {
 title: 'Best AI Tools for Freelancers in 2026: 15+ Tools to 10x Productivity',
 description: 'Save 15+ hours per week with AI tools. Complete guide to ChatGPT, Midjourney, and more.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/resources-og.png`,
 width: 1200,
 height: 630,
 alt: 'Best AI Tools for Freelancers 2026',
 }
 ],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Best AI Tools for Freelancers in 2026: 15+ Tools to 10x Productivity',
 description: 'Discover the best AI tools for freelancers in 2026.',
 images: [`${siteUrl}/images/og/resources-og.png`],
 creator: '@SkillLinkup',
 site: '@SkillLinkup',
 },
 alternates: {
 canonical: pageUrl,
 languages: {
 'en': pageUrl,
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

export default async function AIToolsForFreelancers({
 params
}: {
 params: Promise<{ locale: string }>;
}) {
 const { locale } = await params;

 return (
 <>
 
 <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
 {/* Hero Section */}
 <section className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] text-white py-16 sm:py-20">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <div className="flex items-center justify-center gap-3 mb-6">
 <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
 <Brain className="w-7 h-7 text-white" />
 </div>
 </div>

 <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-heading">
 Best AI Tools for Freelancers in 2026: 10x Your Productivity
 </h1>

 <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
 Discover the 15+ AI tools that save successful freelancers 15+ hours per week and boost income by 50%. From ChatGPT to Midjourney - the complete toolkit.
 </p>

 <div className="flex flex-wrap items-center justify-center gap-4">
 <Link
 href={`/${locale}/tools`}
 className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl font-heading"
 >
 Try Our Free Tools
 <ArrowRight className="w-5 h-5" />
 </Link>
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20 font-heading"
 >
 Browse Platforms
 <Zap className="w-5 h-5" />
 </Link>
 </div>
 </div>
 </div>
 </section>

 {/* Schema.org Structured Data */}
 <script type="application/ld+json" dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "Article",
 "headline": "Best AI Tools for Freelancers in 2026: 15+ Tools to 10x Productivity",
 "description": "Comprehensive guide to the best AI tools for freelancers, including ChatGPT, Midjourney, and specialized AI assistants.",
 "author": {
 "@type": "Organization",
 "name": "SkillLinkup"
 },
 "publisher": {
 "@type": "Organization",
 "name": "SkillLinkup"
 },
 "datePublished": "2026-01-15",
 "dateModified": "2026-01-15"
 })
 }} />

 <script type="application/ld+json" dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 "itemListElement": [
 {
 "@type": "ListItem",
 "position": 1,
 "name": "Home",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`
 },
 {
 "@type": "ListItem",
 "position": 2,
 "name": "Guide",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/gids`
 },
 {
 "@type": "ListItem",
 "position": 3,
 "name": "Tools & Productivity",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/gids/tools-productiviteit`
 },
 {
 "@type": "ListItem",
 "position": 4,
 "name": "AI Tools for Freelancers",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/gids/tools-productiviteit/ai-tools-for-freelancers`
 }
 ]
 })
 }} />

 {/* Main Content */}
 <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
 <div className="max-w-4xl mx-auto">
 {/* Stats */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
 <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border border-primary/20">
 <TrendingUp className="w-10 h-10 text-primary mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 font-heading">50% Income Boost</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">With AI automation</p>
 </div>
 <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border border-accent/20">
 <Clock className="w-10 h-10 text-accent mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 font-heading">15+ Hours Saved Weekly</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">On repetitive tasks</p>
 </div>
 <div className="bg-gradient-to-br from-[#1e1541]/10 to-[#1e1541]/5 dark:from-[#1e1541]/30 dark:to-[#1e1541]/20 rounded-xl p-6 border border-[#1e1541]/20">
 <Brain className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 font-heading">15+ Essential AI Tools</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">For every freelancer</p>
 </div>
 </div>

 {/* Intro */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
 Why AI Tools Are Non-Negotiable for Freelancers in 2026
 </h2>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-4">
 The freelance landscape has fundamentally changed. While you were sleeping, AI tools became the secret weapon separating six-figure freelancers from struggling ones.
 </p>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-4">
 Here's the uncomfortable truth: If you're not using AI tools in 2026, you're competing with one hand tied behind your back. Your competitors are using ChatGPT to write proposals in 5 minutes that used to take 2 hours. They're using AI design tools to create client presentations faster than you can say "PowerPoint." And they're using AI automation to handle admin work while they sleep.
 </p>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
 The good news? It's not too late to catch up. This comprehensive guide reveals the 15+ AI tools that successful freelancers use daily to save 15+ hours per week, boost quality, and increase income by 50%. Let's dive in.
 </p>
 </div>

 {/* Category 1: AI Writing Tools */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <div className="flex items-center gap-4 mb-6">
 <Sparkles className="w-12 h-12 text-primary" />
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-heading">
 1. AI Writing Tools: Write 10x Faster (and Better)
 </h2>
 </div>

 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">
 Writing is the bottleneck for most freelancers. Proposals, emails, reports, blog posts - it all takes time. AI writing tools don't just speed up writing; they improve quality by catching errors, suggesting improvements, and generating ideas you'd never think of.
 </p>

 <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 mb-6 border border-primary/20">
 <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-xl font-heading">
 What AI Writing Tools Can Do:
 </h3>
 <ul className="space-y-3">
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <span>Write complete blog posts, proposals, and reports in minutes</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <span>Rewrite content for different audiences (technical vs. non-technical)</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <span>Generate unlimited content ideas from a single topic</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <span>Fix grammar, spelling, and tone automatically</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <span>Translate content to 50+ languages instantly</span>
 </li>
 </ul>
 </div>

 <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-2xl font-heading">
 Top AI Writing Tools:
 </h3>

 <div className="space-y-4 mb-6">
 <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg font-heading">ChatGPT (OpenAI)</h4>
 <p className="text-gray-700 dark:text-gray-300 mb-2">The king of AI writing. Handles everything from emails to 10,000-word reports. GPT-4 is shockingly good at matching your writing style once you train it.</p>
 <p className="text-sm text-primary font-semibold mb-2">Free for GPT-3.5, $20/month for GPT-4</p>
 <p className="text-sm text-gray-600 dark:text-gray-400 italic">Best for: Proposals, reports, brainstorming, research summaries</p>
 </div>

 <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg font-heading">Jasper AI</h4>
 <p className="text-gray-700 dark:text-gray-300 mb-2">Built specifically for marketers and content creators. Templates for everything: blog posts, ads, social media, product descriptions. Faster than ChatGPT for templated content.</p>
 <p className="text-sm text-primary font-semibold mb-2">From $49/month</p>
 <p className="text-sm text-gray-600 dark:text-gray-400 italic">Best for: Marketing copy, blog posts, social media content</p>
 </div>

 <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg font-heading">Grammarly Premium</h4>
 <p className="text-gray-700 dark:text-gray-300 mb-2">Not just grammar checking anymore. AI-powered suggestions for clarity, tone, engagement, and delivery. Works everywhere you write (email, docs, social media).</p>
 <p className="text-sm text-primary font-semibold mb-2">$12/month</p>
 <p className="text-sm text-gray-600 dark:text-gray-400 italic">Best for: Professional communication, client emails, polishing content</p>
 </div>

 <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg font-heading">Copy.ai</h4>
 <p className="text-gray-700 dark:text-gray-300 mb-2">Fastest way to generate marketing copy variations. Input your product/service, get 20+ headline variations in seconds. Perfect for A/B testing.</p>
 <p className="text-sm text-primary font-semibold mb-2">Free for 2,000 words/month, $49/month unlimited</p>
 <p className="text-sm text-gray-600 dark:text-gray-400 italic">Best for: Headlines, ad copy, product descriptions</p>
 </div>
 </div>

 <div className="bg-accent/10 dark:bg-accent/20 rounded-xl p-6 border border-accent/30">
 <p className="text-gray-900 dark:text-white font-semibold mb-2">Pro Tip:</p>
 <p className="text-gray-700 dark:text-gray-300">Start with ChatGPT (free version) to learn AI writing patterns. Once you hit the limitations, upgrade to GPT-4 or add specialized tools like Jasper for specific use cases.</p>
 </div>
 </div>

 {/* Category 2: AI Design Tools */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <div className="flex items-center gap-4 mb-6">
 <Star className="w-12 h-12 text-accent" />
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-heading">
 2. AI Design Tools: Create Professional Visuals (No Design Skills Required)
 </h2>
 </div>

 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">
 You don't need a design degree to create professional visuals anymore. AI design tools have democratized design - from logos to presentations to social media graphics. Your clients won't believe you made them yourself.
 </p>

 <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-2xl font-heading">
 Top AI Design Tools:
 </h3>

 <div className="space-y-4 mb-6">
 <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg font-heading">Canva AI (Magic Design)</h4>
 <p className="text-gray-700 dark:text-gray-300 mb-2">Describe what you want, get 10+ design variations instantly. Magic Eraser removes backgrounds. Magic Edit changes colors, objects, and styles with text prompts.</p>
 <p className="text-sm text-accent font-semibold mb-2">Free for basics, $13/month for Pro</p>
 <p className="text-sm text-gray-600 dark:text-gray-400 italic">Best for: Social media graphics, presentations, marketing materials</p>
 </div>

 <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg font-heading">Midjourney</h4>
 <p className="text-gray-700 dark:text-gray-300 mb-2">The most powerful AI image generator. Creates photorealistic images, illustrations, and concept art from text descriptions. Mind-blowing quality that rivals professional photographers.</p>
 <p className="text-sm text-accent font-semibold mb-2">From $10/month</p>
 <p className="text-sm text-gray-600 dark:text-gray-400 italic">Best for: Unique imagery, blog headers, custom illustrations</p>
 </div>

 <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg font-heading">Dall-E 3 (ChatGPT Plus)</h4>
 <p className="text-gray-700 dark:text-gray-300 mb-2">Built into ChatGPT Plus. Better at following complex prompts than Midjourney. Understands text in images. Perfect for creating infographics and diagrams with labels.</p>
 <p className="text-sm text-accent font-semibold mb-2">Included with ChatGPT Plus ($20/month)</p>
 <p className="text-sm text-gray-600 dark:text-gray-400 italic">Best for: Infographics, diagrams, concept visualization</p>
 </div>

 <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg font-heading">Galileo AI</h4>
 <p className="text-gray-700 dark:text-gray-300 mb-2">Generates complete UI designs from text descriptions. Perfect for freelance developers who need mockups fast. Outputs editable Figma files.</p>
 <p className="text-sm text-accent font-semibold mb-2">Waitlist (free beta)</p>
 <p className="text-sm text-gray-600 dark:text-gray-400 italic">Best for: UI/UX designers, web developers</p>
 </div>
 </div>
 </div>

 {/* CTA 1 */}
 <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white text-center">
 <Brain className="w-16 h-16 text-white mx-auto mb-6" />
 <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
 Ready to 10x Your Productivity with AI?
 </h2>
 <p className="text-xl text-white/90 mb-8">
 Start with our free tools and see why thousands of freelancers trust SkillLinkup.
 </p>
 <Link
 href={`/${locale}/tools`}
 className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg font-heading"
 >
 Try Free Tools
 <ArrowRight className="w-5 h-5" />
 </Link>
 </div>

 {/* Tool Comparison Table */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
 AI Tool Comparison: Which One Is Right for You?
 </h2>

 <div className="overflow-x-auto">
 <table className="w-full">
 <thead>
 <tr className="border-b-2 border-gray-300 dark:border-slate-600">
 <th className="text-left p-4 font-bold text-gray-900 dark:text-white">Tool</th>
 <th className="text-left p-4 font-bold text-gray-900 dark:text-white">Best For</th>
 <th className="text-left p-4 font-bold text-gray-900 dark:text-white">Price</th>
 <th className="text-left p-4 font-bold text-gray-900 dark:text-white">Learning Curve</th>
 </tr>
 </thead>
 <tbody>
 <tr className="border-b border-gray-200 dark:border-slate-700">
 <td className="p-4 font-semibold text-gray-900 dark:text-white">ChatGPT</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">All-purpose writing</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">Free - $20/mo</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">Easy</td>
 </tr>
 <tr className="border-b border-gray-200 dark:border-slate-700">
 <td className="p-4 font-semibold text-gray-900 dark:text-white">Midjourney</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">Image generation</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">$10 - $60/mo</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">Moderate</td>
 </tr>
 <tr className="border-b border-gray-200 dark:border-slate-700">
 <td className="p-4 font-semibold text-gray-900 dark:text-white">Jasper AI</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">Marketing copy</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">$49+/mo</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">Easy</td>
 </tr>
 <tr className="border-b border-gray-200 dark:border-slate-700">
 <td className="p-4 font-semibold text-gray-900 dark:text-white">Canva AI</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">Quick designs</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">Free - $13/mo</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">Very Easy</td>
 </tr>
 <tr className="border-b border-gray-200 dark:border-slate-700">
 <td className="p-4 font-semibold text-gray-900 dark:text-white">Grammarly</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">Writing polish</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">Free - $12/mo</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">Very Easy</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 <AdWidget placement="blog_sidebar" />

 {/* Internal Links */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
 Related Guides
 </h2>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <Link
 href={`/${locale}/gids/tools-productiviteit/automation-workflows-freelance`}
 className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600 hover:shadow-lg transition-all group"
 >
 <Zap className="w-10 h-10 text-primary mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors font-heading">
 Automation Workflows for Freelancers
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">
 Automate your entire freelance business workflow
 </p>
 </Link>
 <Link
 href={`/${locale}/gids/tools-productiviteit/productivity-systems-freelancers`}
 className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600 hover:shadow-lg transition-all group"
 >
 <TrendingUp className="w-10 h-10 text-accent mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors font-heading">
 Productivity Systems That Work
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">
 Build a system that actually gets things done
 </p>
 </Link>
 </div>
 </div>

 {/* CTA 2 */}
 <div className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
 <Star className="w-16 h-16 text-white mx-auto mb-6" />
 <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
 Find AI-Friendly Freelance Platforms
 </h2>
 <p className="text-xl text-white/90 mb-8">
 Some platforms embrace AI tools, others ban them. Discover which platforms support your AI-powered workflow.
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg font-heading"
 >
 Compare Platforms
 <ArrowRight className="w-5 h-5" />
 </Link>
 </div>
 </div>
 </article>
 </main>
 
 </>
 );
}
