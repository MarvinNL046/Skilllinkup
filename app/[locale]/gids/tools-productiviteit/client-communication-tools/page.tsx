import { Metadata } from 'next';
import Link from 'next/link';
import { AdWidget } from '@/components/AdWidget';
import { MessageSquare, CheckCircle, ArrowRight, Zap, Star, TrendingUp, Users, Video, Mail } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function generateMetadata({
 params
}: {
 params: Promise<{ locale: string }>
}): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'client-communication-tools';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/tools-productiviteit/${slug}`;

 return {
 title: 'Best Client Communication Tools for Freelancers 2026: Complete Guide',
 description: 'Discover the best client communication tools for freelancers. Compare Slack, Loom, Zoom and more. Reduce email overload by 80% and improve client satisfaction.',
 keywords: 'client communication tools, freelance communication software, Slack for freelancers, Loom, Zoom, async communication',
 openGraph: {
 title: 'Best Client Communication Tools for Freelancers 2026: Complete Guide',
 description: 'Reduce email overload by 80% with the right communication tools.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/resources-og.png`,
 width: 1200,
 height: 630,
 alt: 'Client Communication Tools 2026',
 }
 ],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Best Client Communication Tools for Freelancers 2026: Complete Guide',
 description: 'Discover the best client communication tools for freelancers.',
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

export default async function ClientCommunicationTools({
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
 <MessageSquare className="w-7 h-7 text-white" />
 </div>
 </div>

 <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-heading">
 Best Client Communication Tools for Freelancers in 2026
 </h1>

 <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
 Stop drowning in email chaos. Discover the communication tools that reduce email overload by 80%, keep clients happy, and make you look like a total professional.
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
 "headline": "Best Client Communication Tools for Freelancers in 2026",
 "description": "Comprehensive guide to client communication tools including Slack, Loom, Zoom, and async communication platforms.",
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
 "name": "Client Communication Tools",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/gids/tools-productiviteit/client-communication-tools`
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
 <Mail className="w-10 h-10 text-primary mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 font-heading">80% Less Email</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">With organized communication</p>
 </div>
 <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border border-accent/20">
 <Users className="w-10 h-10 text-accent mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 font-heading">95% Client Satisfaction</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">Clear communication wins</p>
 </div>
 <div className="bg-gradient-to-br from-[#1e1541]/10 to-[#1e1541]/5 dark:from-[#1e1541]/30 dark:to-[#1e1541]/20 rounded-xl p-6 border border-[#1e1541]/20">
 <TrendingUp className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 font-heading">3x Faster Responses</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">Real-time vs email</p>
 </div>
 </div>

 {/* Intro */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
 Why Email Is Killing Your Freelance Business (And What to Use Instead)
 </h2>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-4">
 Picture this: It's Monday morning. You open your inbox and there are 47 unread emails. 12 from one client alone, spread across 3 different conversation threads, all about the same project. You spend 90 minutes just figuring out what everyone needs.
 </p>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-4">
 Sound familiar? Email wasn't designed for modern project collaboration. It's a mess of scattered threads, lost attachments, and the dreaded "following up on my last email" messages.
 </p>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-4">
 Here's what successful freelancers know: The right communication tools don't just save time - they make you look more professional, keep clients happier, and prevent the miscommunications that lead to scope creep and unpaid revisions.
 </p>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
 This guide reveals the exact communication stack that top freelancers use to reduce email by 80%, respond 3x faster, and maintain clear boundaries with clients. Let's dive in.
 </p>
 </div>

 {/* Category 1: Real-Time Chat */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <div className="flex items-center gap-4 mb-6">
 <MessageSquare className="w-12 h-12 text-primary" />
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-heading">
 1. Real-Time Chat Tools: When You Need Quick Answers
 </h2>
 </div>

 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">
 Real-time chat is perfect for quick questions, status updates, and staying connected with clients without email formality. But choosing the wrong tool can make you too accessible (hello 11 PM messages).
 </p>

 <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 mb-6 border border-primary/20">
 <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-xl font-heading">
 When to Use Real-Time Chat:
 </h3>
 <ul className="space-y-3">
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <span>Quick clarifications during active projects</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <span>Urgent updates that can't wait for email</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <span>Team collaboration with other contractors</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <span>Building rapport with regular clients</span>
 </li>
 <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <span>Sharing files and links instantly</span>
 </li>
 </ul>
 </div>

 <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-2xl font-heading">
 Top Real-Time Chat Tools:
 </h3>

 <div className="space-y-4 mb-6">
 <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg font-heading">Slack (Most Popular)</h4>
 <p className="text-gray-700 dark:text-gray-300 mb-3">
 The industry standard for team chat. Channels keep conversations organized. Integrates with 2,000+ tools. Thread replies prevent notification chaos. Perfect for ongoing client relationships.
 </p>
 <div className="mb-3">
 <p className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Best Features:</p>
 <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
 <li>• Channels per project/client</li>
 <li>• Searchable message history</li>
 <li>• File sharing with previews</li>
 <li>• Set custom status (vacation mode!)</li>
 </ul>
 </div>
 <p className="text-sm text-primary font-semibold mb-2">Free for 90-day history, $7/month per user for unlimited</p>
 <p className="text-sm text-gray-600 dark:text-gray-400 italic">Best for: Tech-savvy clients, ongoing projects, team collaboration</p>
 </div>

 <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg font-heading">Microsoft Teams (Enterprise Clients)</h4>
 <p className="text-gray-700 dark:text-gray-300 mb-3">
 If your client uses Office 365, they probably have Teams. Deeper integration with Microsoft ecosystem. Video calls built-in. Less "cool" than Slack but more corporate-friendly.
 </p>
 <p className="text-sm text-primary font-semibold mb-2">Free with Microsoft 365, included in most corporate plans</p>
 <p className="text-sm text-gray-600 dark:text-gray-400 italic">Best for: Corporate clients, Microsoft-heavy organizations</p>
 </div>

 <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg font-heading">WhatsApp Business (Casual Clients)</h4>
 <p className="text-gray-700 dark:text-gray-300 mb-3">
 Everyone has WhatsApp. Zero learning curve. Great for small business clients who aren't tech-savvy. Warning: Can blur work/life boundaries if you're not careful.
 </p>
 <p className="text-sm text-primary font-semibold mb-2">100% free</p>
 <p className="text-sm text-gray-600 dark:text-gray-400 italic">Best for: Small business clients, international clients, non-technical users</p>
 </div>

 <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg font-heading">Discord (Creative Industries)</h4>
 <p className="text-gray-700 dark:text-gray-300 mb-3">
 Originally for gamers, now used by many creative freelancers. Excellent voice channels for brainstorming. Great for building communities around your services.
 </p>
 <p className="text-sm text-primary font-semibold mb-2">Free, $10/month for Nitro features</p>
 <p className="text-sm text-gray-600 dark:text-gray-400 italic">Best for: Creative clients, community building, voice chat sessions</p>
 </div>
 </div>

 <div className="bg-accent/10 dark:bg-accent/20 rounded-xl p-6 border border-accent/30">
 <p className="text-gray-900 dark:text-white font-semibold mb-2">Pro Tip:</p>
 <p className="text-gray-700 dark:text-gray-300">Set "Do Not Disturb" hours in Slack (6 PM - 9 AM). Clients can still message you, but you won't get notifications. Train clients that you respond during business hours only.</p>
 </div>
 </div>

 {/* Category 2: Async Video */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <div className="flex items-center gap-4 mb-6">
 <Video className="w-12 h-12 text-accent" />
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-heading">
 2. Async Video Tools: Show, Don't Tell
 </h2>
 </div>

 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">
 Sometimes explaining something in writing takes 500 words and 30 minutes. A 2-minute video can do it better. Async video tools are the secret weapon of efficient freelancers.
 </p>

 <div className="space-y-4 mb-6">
 <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg font-heading">Loom (The Game-Changer)</h4>
 <p className="text-gray-700 dark:text-gray-300 mb-3">
 Record your screen + webcam in one click. Perfect for: showing design feedback, walking through a report, explaining a complex concept, giving project updates. Clients LOVE this.
 </p>
 <div className="mb-3">
 <p className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Use Cases:</p>
 <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
 <li>• Weekly project status updates (5 min video vs 800-word email)</li>
 <li>• Design/website feedback with annotations</li>
 <li>• Explaining technical concepts to non-technical clients</li>
 <li>• Tutorial videos for deliverables ("how to use this spreadsheet")</li>
 </ul>
 </div>
 <p className="text-sm text-accent font-semibold mb-2">Free for 25 videos, $8/month for unlimited</p>
 <p className="text-sm text-gray-600 dark:text-gray-400 italic">Best for: Design feedback, status updates, complex explanations</p>
 </div>

 <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg font-heading">Vidyard (Enterprise)</h4>
 <p className="text-gray-700 dark:text-gray-300 mb-3">
 Like Loom but with enterprise features: viewer analytics (see who watched what), custom thumbnails, CTAs in videos. Overkill for most freelancers but great for sales.
 </p>
 <p className="text-sm text-accent font-semibold mb-2">Free for basics, $19+/month for pro features</p>
 <p className="text-sm text-gray-600 dark:text-gray-400 italic">Best for: Client proposals, sales videos, analytics tracking</p>
 </div>

 <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg font-heading">CloudApp (Quick Screenshots)</h4>
 <p className="text-gray-700 dark:text-gray-300 mb-3">
 Instant screenshots and screen recordings with automatic link sharing. Fast. Simple. No fuss. Great for quick "here's what I mean" moments.
 </p>
 <p className="text-sm text-accent font-semibold mb-2">Free for 25/month, $10/month for unlimited</p>
 <p className="text-sm text-gray-600 dark:text-gray-400 italic">Best for: Quick screenshots, bug reports, fast feedback</p>
 </div>
 </div>
 </div>

 {/* CTA 1 */}
 <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white text-center">
 <MessageSquare className="w-16 h-16 text-white mx-auto mb-6" />
 <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
 Ready to Escape Email Hell?
 </h2>
 <p className="text-xl text-white/90 mb-8">
 Start with our free tools and build better client relationships through clear communication.
 </p>
 <Link
 href={`/${locale}/tools`}
 className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg font-heading"
 >
 Try Free Tools
 <ArrowRight className="w-5 h-5" />
 </Link>
 </div>

 {/* Communication Frameworks */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
 Communication Framework: When to Use What
 </h2>

 <div className="overflow-x-auto">
 <table className="w-full">
 <thead>
 <tr className="border-b-2 border-gray-300 dark:border-slate-600">
 <th className="text-left p-4 font-bold text-gray-900 dark:text-white">Situation</th>
 <th className="text-left p-4 font-bold text-gray-900 dark:text-white">Best Tool</th>
 <th className="text-left p-4 font-bold text-gray-900 dark:text-white">Why</th>
 </tr>
 </thead>
 <tbody>
 <tr className="border-b border-gray-200 dark:border-slate-700">
 <td className="p-4 font-semibold text-gray-900 dark:text-white">Quick question</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">Slack/Teams</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">Instant response, searchable later</td>
 </tr>
 <tr className="border-b border-gray-200 dark:border-slate-700">
 <td className="p-4 font-semibold text-gray-900 dark:text-white">Status update</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">Loom video</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">5 min video beats 800-word email</td>
 </tr>
 <tr className="border-b border-gray-200 dark:border-slate-700">
 <td className="p-4 font-semibold text-gray-900 dark:text-white">Design feedback</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">Loom + annotation</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">Show exactly what you mean</td>
 </tr>
 <tr className="border-b border-gray-200 dark:border-slate-700">
 <td className="p-4 font-semibold text-gray-900 dark:text-white">Weekly check-in</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">Zoom call</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">Build relationships, read body language</td>
 </tr>
 <tr className="border-b border-gray-200 dark:border-slate-700">
 <td className="p-4 font-semibold text-gray-900 dark:text-white">Contract/legal</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">Email</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">Written record, formality</td>
 </tr>
 <tr className="border-b border-gray-200 dark:border-slate-700">
 <td className="p-4 font-semibold text-gray-900 dark:text-white">Bug report</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">CloudApp screenshot</td>
 <td className="p-4 text-gray-700 dark:text-gray-300">Visual proof, instant share</td>
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
 href={`/${locale}/gids/tools-productiviteit/freelance-crm-software`}
 className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600 hover:shadow-lg transition-all group"
 >
 <Users className="w-10 h-10 text-primary mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors font-heading">
 CRM Software for Freelancers
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">
 Track all client interactions in one place
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
 Build systems that actually get things done
 </p>
 </Link>
 </div>
 </div>

 {/* CTA 2 */}
 <div className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
 <Star className="w-16 h-16 text-white mx-auto mb-6" />
 <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
 Find Freelance Platforms That Value Clear Communication
 </h2>
 <p className="text-xl text-white/90 mb-8">
 Some platforms have built-in communication tools. Others leave you scrambling. Discover which platforms support professional communication.
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
