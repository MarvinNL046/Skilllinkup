import Link from "next/link";
import { getTranslations } from "next-intl/server";

interface PageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
 const { locale } = await params;

 const slug = 'first-freelance-proposal';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

 return {
 title: "First Freelance Proposal Guide: Templates That Get You Hired",
 description: "Learn how to write winning freelance proposals with proven templates, real examples, and strategies that convert 15-20% of submissions into paying clients.",
 keywords: "freelance proposal template, how to write proposals, first freelance proposal, proposal examples, winning freelance bids",
 openGraph: {
 title: "First Freelance Proposal Guide: Templates That Get You Hired",
 description: "Learn how to write winning freelance proposals with proven templates, real examples, and strategies that convert 15-20% of submissions into paying clients.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'First Freelance Proposal Guide: Templates That Get You Hired' }],
 locale: locale === 'nl' ? 'nl_NL' : 'en_US',
 type: "article",
 },
 twitter: {
 card: 'summary_large_image',
 title: 'First Freelance Proposal Guide: Templates That Get You Hired',
 description: 'Learn how to write winning freelance proposals with proven templates, real examples, and strategies.',
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

export default async function FirstFreelanceProposalPage({ params }: PageProps) {
 const { locale } = await params;

 const jsonLd = {
 "@context": "https://schema.org",
 "@type": "HowTo",
 "name": "How to Write Your First Freelance Proposal That Gets Hired",
 "description": "Complete guide to writing effective freelance proposals with templates, examples, and proven strategies for beginners.",
 "totalTime": "PT30M",
 "step": [
 {
 "@type": "HowToStep",
 "name": "Research the Client",
 "text": "Review their profile, past projects, and specific job requirements to personalize your approach."
 },
 {
 "@type": "HowToStep",
 "name": "Write Personalized Opening",
 "text": "Reference something specific from their job post to show you actually read and understood their needs."
 },
 {
 "@type": "HowToStep",
 "name": "Demonstrate Understanding",
 "text": "Summarize their problem in your own words to build trust and show comprehension."
 },
 {
 "@type": "HowToStep",
 "name": "Present Your Solution",
 "text": "Explain exactly how you'll solve their problem with specific examples and relevant experience."
 }
 ]
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />
 
 <main className="flex-1">
 {/* Hero Section */}
 <section className="bg-gradient-to-br from-secondary/10 via-white to-primary/10 dark:from-secondary dark:via-gray-900 dark:to-gray-800 py-16 sm:py-24">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 dark:bg-secondary/30 text-secondary dark:text-accent text-sm font-semibold mb-6">
 <span>Proposal Writing Masterclass</span>
 </div>
 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6">
 How to Write Your First Freelance Proposal That Gets Hired
 </h1>
 <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
 Stop sending generic proposals that get ignored. Master the proven 4-part formula that converts 15-20% of proposals into paying clients—even as a complete beginner.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-secondary text-white font-heading font-semibold hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl"
 >
 Browse Job Platforms
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
 </svg>
 </Link>
 </div>
 </div>
 </div>
 </section>

 {/* Reality Check Stats */}
 <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto">
 <div className="grid grid-cols-3 gap-4">
 <div className="text-center">
 <div className="text-3xl font-heading font-bold text-red-500 mb-1">5-10%</div>
 <div className="text-sm text-gray-600 dark:text-gray-400">Average proposal response rate</div>
 </div>
 <div className="text-center">
 <div className="text-3xl font-heading font-bold text-accent mb-1">15-20%</div>
 <div className="text-sm text-gray-600 dark:text-gray-400">With optimized proposals</div>
 </div>
 <div className="text-center">
 <div className="text-3xl font-heading font-bold text-primary mb-1">3 min</div>
 <div className="text-sm text-gray-600 dark:text-gray-400">Client decision time</div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Main Content */}
 <article className="py-16 bg-white dark:bg-gray-800">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">

 {/* Introduction */}
 <div className="mb-12">
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
 Why Most Beginner Proposals Fail
 </h2>
 <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
 You&apos;ve found the perfect job. The pay is good, the project aligns with your skills, and you&apos;re excited to apply. You spend 30 minutes crafting what you think is a great proposal. You hit submit. And then... crickets.
 </p>
 <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
 This scenario happens to 90% of beginners. But it&apos;s not because you&apos;re not good enough—it&apos;s because you&apos;re making the same mistakes everyone makes when they start.
 </p>

 <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-500 p-6 my-6 rounded-r-xl">
 <p className="text-gray-800 dark:text-gray-200 font-semibold mb-3">❌ The 5 Fatal Proposal Mistakes:</p>
 <ul className="space-y-2 text-gray-700 dark:text-gray-300">
 <li><strong>1. Generic templates:</strong>&quot;Dear Sir/Madam, I am interested in your project...&quot; (Instant delete)</li>
 <li><strong>2. Talking about yourself:</strong>&quot;I am a skilled writer with 3 years of experience...&quot; (They don&apos;t care about you yet)</li>
 <li><strong>3. Too long:</strong>500+ word proposals that clients won&apos;t read (Skim and skip)</li>
 <li><strong>4. No personalization:</strong>Clearly copy-pasted with no reference to their specific needs (Red flag)</li>
 <li><strong>5. Vague promises:</strong>&quot;I&apos;ll do a great job&quot; without explaining how (Zero trust built)</li>
 </ul>
 </div>

 <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
 The good news? Once you understand what clients actually want to see, writing winning proposals becomes a repeatable formula. Let&apos;s break down that formula step by step.
 </p>
 </div>

 {/* The Formula */}
 <div className="mb-12">
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
 The 4-Part Proposal Formula That Works
 </h2>
 <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
 This formula is used by top-rated freelancers who consistently convert 15-20% of their proposals into paid work. It works because it&apos;s focused on the client&apos;s needs, not your credentials.
 </p>

 <div className="bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-2xl p-8 border border-primary/20 dark:border-primary/30 mb-8">
 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">The Winning Formula:</h3>

 <div className="space-y-8">
 <div className="border-l-4 border-primary pl-6">
 <div className="flex items-center gap-3 mb-3">
 <span className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">1</span>
 <h4 className="text-xl font-bold text-gray-900 dark:text-white">Personalized Opening (2-3 sentences)</h4>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 Reference something specific from their job post. Show you actually read it. Use their company name or mention their specific goal.
 </p>
 <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
 <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-semibold">Example:</p>
 <p className="text-gray-700 dark:text-gray-300 italic">
 &quot;Hi Sarah, I saw you&apos;re looking to redesign your e-commerce site to increase mobile conversions. I noticed your current mobile bounce rate concern—that&apos;s exactly the problem I solved for three other Shopify stores last quarter.&quot;
 </p>
 </div>
 </div>

 <div className="border-l-4 border-accent pl-6">
 <div className="flex items-center gap-3 mb-3">
 <span className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">2</span>
 <h4 className="text-xl font-bold text-gray-900 dark:text-white">Demonstrate Understanding (3-4 sentences)</h4>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 Summarize their problem in your own words. Show you understand what they need better than other applicants. This builds instant trust.
 </p>
 <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
 <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-semibold">Example:</p>
 <p className="text-gray-700 dark:text-gray-300 italic">
 &quot;From your description, it sounds like you need a mobile-first redesign that loads fast, has a streamlined checkout process, and maintains your brand identity. You want to reduce cart abandonment while keeping your current customers happy with a familiar experience.&quot;
 </p>
 </div>
 </div>

 <div className="border-l-4 border-secondary pl-6">
 <div className="flex items-center gap-3 mb-3">
 <span className="bg-secondary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">3</span>
 <h4 className="text-xl font-bold text-gray-900 dark:text-white">Your Solution (4-6 sentences)</h4>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 Explain exactly how you&apos;ll solve their problem. Be specific about your process. Include 1-2 relevant examples or portfolio links.
 </p>
 <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
 <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-semibold">Example:</p>
 <p className="text-gray-700 dark:text-gray-300 italic">
 &quot;Here&apos;s how I&apos;d approach this: First, I&apos;ll audit your current mobile UX and identify the biggest friction points. Then, I&apos;ll create mobile-first mockups focusing on fast load times (under 2 seconds) and a 2-click checkout process. Finally, I&apos;ll build it in Shopify with optimized images and clean code. I recently did this for [Link to Portfolio] and they saw a 34% increase in mobile conversions within 30 days.&quot;
 </p>
 </div>
 </div>

 <div className="border-l-4 border-primary pl-6">
 <div className="flex items-center gap-3 mb-3">
 <span className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">4</span>
 <h4 className="text-xl font-bold text-gray-900 dark:text-white">Clear Call-to-Action (1-2 sentences)</h4>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 End with a question or invitation to discuss. Make it easy for them to respond. Show you&apos;re ready to start.
 </p>
 <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
 <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-semibold">Example:</p>
 <p className="text-gray-700 dark:text-gray-300 italic">
 &quot;Does this approach align with your vision? I&apos;m available to start this week and can have mockups ready for your review within 3 business days. Let&apos;s schedule a quick call to discuss your specific requirements.&quot;
 </p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-500 p-6 my-6 rounded-r-xl">
 <p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">Why This Formula Works:</p>
 <ul className="space-y-2 text-gray-700 dark:text-gray-300">
 <li>• <strong>Personalization</strong>shows you&apos;re not mass-applying</li>
 <li>• <strong>Understanding</strong>builds trust before credentials</li>
 <li>• <strong>Specific solution</strong>proves you know what you&apos;re doing</li>
 <li>• <strong>Clear CTA</strong>makes it easy for client to respond</li>
 </ul>
 </div>
 </div>

 {/* CTA 1 */}
 <div className="my-12 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl p-8 text-center shadow-xl">
 <h3 className="text-2xl font-heading font-bold text-white mb-4">
 Ready to Start Applying?
 </h3>
 <p className="text-white/90 mb-6 max-w-2xl mx-auto">
 Find beginner-friendly platforms with thousands of active jobs. Compare features, fees, and start sending proposals today.
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary font-heading font-semibold hover:bg-gray-100 transition-all shadow-lg"
 >
 Browse Job Platforms
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
 </svg>
 </Link>
 </div>

 {/* Complete Example */}
 <div className="mb-12">
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
 Complete Proposal Examples That Got Hired
 </h2>
 <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
 Let&apos;s look at real proposals that landed paying clients. Study these carefully—they follow the formula perfectly while maintaining authenticity and personality.
 </p>

 <div className="space-y-8">
 <div className="bg-gradient-to-br from-accent/10 to-primary/10 dark:from-accent/20 dark:to-primary/20 rounded-2xl p-8 border border-accent/20 dark:border-accent/30">
 <div className="mb-4">
 <span className="bg-accent/20 dark:bg-accent/30 text-accent px-3 py-1 rounded-full text-sm font-semibold">Writing Project</span>
 </div>
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">Example 1: Blog Writing Proposal</h3>
 <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
{`Hi Michael,

I noticed you're looking for a writer to create SEO blog posts for your marketing agency's new clients. The 2,000-word comprehensive guides you mentioned are exactly the type of content I specialize in.

From your description, it sounds like you need someone who can research unfamiliar industries quickly, write with authority, and optimize for both readers and search engines. You want posts that actually rank and drive traffic—not just filler content.

Here's my approach: I'll start by researching your client's top competitors and analyzing what's already ranking for target keywords. Then I'll create an outline focused on search intent and reader value. Finally, I'll write the post with proper heading structure, internal links, and meta descriptions. I recently wrote a 2,500-word guide on "CRM Software for Small Businesses" that ranked #3 on Google within 6 weeks [portfolio link]. The client reported a 45% increase in demo requests from that single article.

I can deliver 2-3 posts per week and turnaround time is 3-4 business days per post. Does this timeline work for your client schedule? I'd love to discuss your specific quality standards and see if we're a good fit.

Best,
Sarah`}
 </p>
 </div>
 <div className="mt-4 bg-white dark:bg-gray-900 rounded-lg p-4 border-l-4 border-accent">
 <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">What Made This Work:</p>
 <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
 <li>✓ Used client's name and referenced specific requirements (2,000 words, SEO)</li>
 <li>✓ Showed understanding of deeper needs (authority, not filler)</li>
 <li>✓ Described specific 3-step process</li>
 <li>✓ Included concrete result (45% increase)</li>
 <li>✓ Addressed practical concern (timeline)</li>
 </ul>
 </div>
 </div>

 <div className="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-8 border border-primary/20 dark:border-primary/30">
 <div className="mb-4">
 <span className="bg-primary/20 dark:bg-primary/30 text-primary px-3 py-1 rounded-full text-sm font-semibold">Design Project</span>
 </div>
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">Example 2: Logo Design Proposal</h3>
 <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
{`Hi Jennifer,

I saw your post about needing a modern logo for your sustainable fashion startup. I love that you're focusing on eco-friendly materials—that's a story I can translate into visual identity.

It sounds like you want a logo that communicates both elegance and environmental consciousness. Something clean and minimalist that works on clothing tags, social media, and packaging. You need versatility without losing brand personality.

Here's how I'd approach your logo: First, I'll create 3 distinct concepts based on a mood board we'll develop together. Each concept will explore different ways to blend sophistication with sustainability themes. Then, I'll refine your favorite concept through 2-3 revision rounds. You'll get the final files in all formats (vector, PNG, JPG) plus a simple brand guide showing color codes and usage rules. I recently designed a logo for an organic skincare brand [portfolio link] that increased their Instagram engagement by 60% because it was so shareable.

I typically complete logo projects in 7-10 days from kickoff to final delivery. Would you like to schedule a call this week to discuss your vision and brand personality? I have questionnaires ready to help clarify your style preferences.

Looking forward to hearing from you,
Marcus`}
 </p>
 </div>
 <div className="mt-4 bg-white dark:bg-gray-900 rounded-lg p-4 border-l-4 border-primary">
 <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">What Made This Work:</p>
 <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
 <li>✓ Connected with client's values (sustainability)</li>
 <li>✓ Understood core challenge (elegance + environmental consciousness)</li>
 <li>✓ Clear 3-step process with deliverables</li>
 <li>✓ Relevant case study with outcome (60% engagement boost)</li>
 <li>✓ Proactive next step (call + questionnaire)</li>
 </ul>
 </div>
 </div>

 <div className="bg-gradient-to-br from-secondary/10 to-accent/10 dark:from-secondary/20 dark:to-accent/20 rounded-2xl p-8 border border-secondary/20 dark:border-secondary/30">
 <div className="mb-4">
 <span className="bg-secondary/20 dark:bg-secondary/30 text-secondary dark:text-accent px-3 py-1 rounded-full text-sm font-semibold">Virtual Assistant Project</span>
 </div>
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">Example 3: Virtual Assistant Proposal</h3>
 <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
{`Hi David,

I read your post about needing a VA to manage your email inbox and calendar. As a real estate agent, I know you can't afford to miss client appointments or let important emails slip through the cracks.

It sounds like you need someone to triage your emails daily, respond to routine inquiries, and coordinate your showing schedule without constant back-and-forth. You want peace of mind that nothing important gets missed while you focus on closing deals.

Here's how I'd manage this: I'll check your inbox 3x daily (morning, noon, evening), categorize emails by priority, draft responses for your approval on anything important, and handle routine questions directly using templates we'll create together. For your calendar, I'll coordinate with clients via email or phone, send appointment reminders, and flag scheduling conflicts immediately. I do this for two other real estate agents who've each saved 10+ hours per week since hiring me.

I'm available to work EST hours and typically respond within 1-2 hours during business days. Would you like to start with a 2-week trial to see if my system works for your workflow? I can set up everything within 24 hours of your go-ahead.

Thanks for considering,
Jessica`}
 </p>
 </div>
 <div className="mt-4 bg-white dark:bg-gray-900 rounded-lg p-4 border-l-4 border-secondary">
 <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">What Made This Work:</p>
 <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
 <li>✓ Showed industry understanding (real estate agent pressures)</li>
 <li>✓ Identified core need (peace of mind, nothing missed)</li>
 <li>✓ Detailed system description (3x daily checks, templates)</li>
 <li>✓ Social proof (two other real estate agents)</li>
 <li>✓ Risk-free trial offer to lower barrier</li>
 </ul>
 </div>
 </div>
 </div>
 </div>

 {/* Advanced Tips */}
 <div className="mb-12">
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
 Advanced Proposal Strategies
 </h2>
 <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
 Once you&apos;ve mastered the basic formula, these advanced techniques will help you stand out even more:
 </p>

 <div className="space-y-6">
 <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
 <span className="text-primary">1.</span>
 The &quot;Quick Win&quot; Technique
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-3">
 Identify one small improvement you can deliver immediately. Mention it in your proposal:
 </p>
 <div className="bg-accent/10 dark:bg-accent/20 rounded-lg p-4 border-l-4 border-accent">
 <p className="text-gray-700 dark:text-gray-300 italic text-sm">
 &quot;Before we even start the main project, I noticed your site's images aren't compressed. I can optimize them for you this week at no charge—that alone should improve load time by 30%.&quot;
 </p>
 </div>
 </div>

 <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
 <span className="text-accent">2.</span>
 The &quot;Clarifying Question&quot; Strategy
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-3">
 Ask one thoughtful question that shows expertise. This encourages response and demonstrates you&apos;re thinking critically:
 </p>
 <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-4 border-l-4 border-primary">
 <p className="text-gray-700 dark:text-gray-300 italic text-sm">
 &quot;Quick question: Are you targeting local customers or nationwide? This will affect our SEO keyword strategy significantly.&quot;
 </p>
 </div>
 </div>

 <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
 <span className="text-secondary">3.</span>
 The &quot;Risk Reversal&quot; Approach
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-3">
 Offer something that reduces client risk. This works especially well for beginners building reviews:
 </p>
 <div className="bg-secondary/10 dark:bg-secondary/20 rounded-lg p-4 border-l-4 border-secondary">
 <p className="text-gray-700 dark:text-gray-300 italic text-sm">
 &quot;Since I'm building my portfolio, I offer a satisfaction guarantee: If you're not happy with the first draft, you don't pay. I've never had to use this policy because I over-deliver, but it's there for your peace of mind.&quot;
 </p>
 </div>
 </div>

 <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
 <span className="text-primary">4.</span>
 The &quot;Relevant Attachment&quot; Power Move
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-3">
 Attach a relevant sample or mini-deliverable that demonstrates your approach:
 </p>
 <div className="bg-accent/10 dark:bg-accent/20 rounded-lg p-4 border-l-4 border-accent">
 <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
 For writers: Attach a sample outline for their project
 </p>
 <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
 For designers: Include a quick mood board or style reference
 </p>
 <p className="text-gray-700 dark:text-gray-300 text-sm">
 For developers: Share a CodePen demo of a similar feature
 </p>
 </div>
 </div>
 </div>

 <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 p-6 my-8 rounded-r-xl">
 <p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">Warning: Don't Overuse These</p>
 <p className="text-gray-700 dark:text-gray-300">
 These advanced techniques are powerful but should be used strategically. Don't try to cram all four into every proposal—pick one that best fits the specific job. Remember: Personalization beats tricks every time.
 </p>
 </div>
 </div>

 {/* Common Mistakes */}
 <div className="mb-12">
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
 Proposal Mistakes That Kill Your Chances
 </h2>
 <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
 Even with a great template, these mistakes can sabotage your success. Avoid them at all costs:
 </p>

 <div className="space-y-4">
 <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-5 border-l-4 border-red-400 dark:border-red-500">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">❌ Typos and Grammar Errors</h4>
 <p className="text-gray-700 dark:text-gray-300 text-sm">
 Nothing screams &quot;unprofessional&quot; like spelling the client's name wrong or having obvious typos. Use Grammarly or have someone proofread before sending.
 </p>
 </div>

 <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-5 border-l-4 border-red-400 dark:border-red-500">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">❌ Bidding Too Low Out of Desperation</h4>
 <p className="text-gray-700 dark:text-gray-300 text-sm">
 &quot;I&apos;ll do this for $50 because I really need the work!&quot; This signals low quality and attracts nightmare clients. Price competitively, not desperately.
 </p>
 </div>

 <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-5 border-l-4 border-red-400 dark:border-red-500">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">❌ Overpromising to Win the Job</h4>
 <p className="text-gray-700 dark:text-gray-300 text-sm">
 &quot;I can do this in 24 hours!&quot; when it realistically takes a week will backfire. Under-promise and over-deliver, not the reverse.
 </p>
 </div>

 <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-5 border-l-4 border-red-400 dark:border-red-500">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">❌ Talking About Payment/Terms Too Early</h4>
 <p className="text-gray-700 dark:text-gray-300 text-sm">
 Don't lead with &quot;I require 50% upfront&quot; or &quot;My rate is non-negotiable.&quot; Focus on value first, logistics later.
 </p>
 </div>

 <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-5 border-l-4 border-red-400 dark:border-red-500">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">❌ Copying Templates Without Customization</h4>
 <p className="text-gray-700 dark:text-gray-300 text-sm">
 Clients can tell when you've used a template without personalizing. Always spend 5-10 minutes customizing for each specific job.
 </p>
 </div>

 <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-5 border-l-4 border-red-400 dark:border-red-500">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">❌ Not Following Instructions</h4>
 <p className="text-gray-700 dark:text-gray-300 text-sm">
 If the job post says &quot;Start your proposal with 'I understand'&quot; or &quot;Include 3 samples,&quot; follow those instructions exactly. It's an automatic filter.
 </p>
 </div>
 </div>
 </div>

 {/* CTA 2 */}
 <div className="my-12 bg-gradient-to-r from-accent via-secondary to-primary rounded-2xl p-8 text-center shadow-xl">
 <h3 className="text-2xl font-heading font-bold text-white mb-4">
 Learn From Real Freelancer Experiences
 </h3>
 <p className="text-white/90 mb-6 max-w-2xl mx-auto">
 See how other beginners used these exact proposal strategies to land their first clients and build thriving careers.
 </p>
 <Link
 href={`/${locale}/reviews`}
 className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary font-heading font-semibold hover:bg-gray-100 transition-all shadow-lg"
 >
 Read Success Stories
 </Link>
 </div>

 {/* Action Plan */}
 <div className="mb-12">
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
 Your Proposal Action Plan
 </h2>
 <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
 Knowledge without action is useless. Here's your exact plan to start sending winning proposals today:
 </p>

 <div className="bg-gradient-to-br from-accent/10 to-primary/10 dark:from-accent/20 dark:to-primary/20 rounded-2xl p-8 border border-accent/20 dark:border-accent/30">
 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">Today's Action Items:</h3>
 <div className="space-y-4">
 <div className="flex items-start gap-3">
 <div>
 <strong className="text-gray-900 dark:text-white">Create Your Proposal Template (30 minutes)</strong>
 <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
 Write the 4-part formula template with [brackets] for customization points. Save it somewhere easily accessible.
 </p>
 </div>
 </div>
 <div className="flex items-start gap-3">
 <div>
 <strong className="text-gray-900 dark:text-white">Find 5 Relevant Jobs (20 minutes)</strong>
 <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
 Browse <Link href={`/${locale}/platforms`} className="text-primary hover:text-primary/80 underline">freelance platforms</Link>and save 5 jobs you could apply to right now.
 </p>
 </div>
 </div>
 <div className="flex items-start gap-3">
 <div>
 <strong className="text-gray-900 dark:text-white">Write 1 Complete Proposal (40 minutes)</strong>
 <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
 Take your best job match and write a fully customized proposal using the formula. Don't overthink it—just send it.
 </p>
 </div>
 </div>
 <div className="flex items-start gap-3">
 <div>
 <strong className="text-gray-900 dark:text-white">Send 5 Proposals (2 hours)</strong>
 <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
 Apply to all 5 jobs with customized proposals. Track which ones get responses. Refine your approach based on results.
 </p>
 </div>
 </div>
 </div>

 <div className="mt-8 p-6 bg-white dark:bg-gray-900 rounded-xl border-2 border-primary/20 dark:border-primary/30">
 <p className="text-gray-700 dark:text-gray-300 font-semibold mb-2">
 Track Your Results:
 </p>
 <p className="text-gray-700 dark:text-gray-300 text-sm">
 Create a simple spreadsheet tracking: Job title, Date sent, Response received?, Interview?, Hired?. After 20-30 proposals, you'll see patterns in what works and can optimize further.
 </p>
 </div>
 </div>

 <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-500 p-6 my-8 rounded-r-xl">
 <p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">Reality Check:</p>
 <p className="text-gray-700 dark:text-gray-300">
 Your first 10 proposals probably won't all convert. That's normal! The goal is to learn what resonates with clients in your niche. By proposal #20, you'll have a system that consistently gets responses.
 </p>
 </div>
 </div>

 </div>
 </div>
 </article>

 {/* Final CTA */}
 <section className="py-16 bg-gradient-to-br from-secondary via-primary to-accent">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
 Start Sending Winning Proposals Today
 </h2>
 <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
 Find active jobs on beginner-friendly platforms and put your new proposal skills to work. Your first client is waiting.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-secondary font-heading font-semibold hover:bg-gray-100 transition-all shadow-lg"
 >
 Browse Job Platforms
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
 </svg>
 </Link>
 <Link
 href={`/${locale}/newsletter`}
 className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent text-white font-heading font-semibold hover:bg-accent/90 transition-all shadow-lg"
 >
 Get Weekly Tips
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
 </svg>
 </Link>
 </div>
 </div>
 </div>
 </section>

 {/* Related Articles */}
 <section className="py-12 bg-gray-50 dark:bg-gray-900">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto">
 <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
 Complete Your Freelance Setup
 </h2>
 <div className="grid md:grid-cols-2 gap-6">
 <Link
 href={`/${locale}/resources/freelance-beginners-guide`}
 className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group"
 >
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
 Complete Freelance Beginner&apos;s Guide
 </h3>
 <p className="text-gray-600 dark:text-gray-300 text-sm">
 Your complete roadmap from zero to first client in 30 days with step-by-step instructions.
 </p>
 </Link>
 <Link
 href={`/${locale}/resources/freelance-profile-templates`}
 className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group"
 >
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
 Creating a Winning Freelance Profile
 </h3>
 <p className="text-gray-600 dark:text-gray-300 text-sm">
 Build a profile that attracts premium clients with templates and real examples.
 </p>
 </Link>
 </div>
 </div>
 </div>
 </section>
 </main>
 
 </>
 );
}
