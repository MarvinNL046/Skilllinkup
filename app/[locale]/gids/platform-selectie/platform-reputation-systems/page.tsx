import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const metadata: Metadata = {
 title: 'Understanding Freelance Platform Reputation Systems | Ratings & Trust Scores',
 description: 'Complete guide to platform rating systems, badges, trust scores, and reviews. Learn how different platforms calculate reputation and how to protect yours.',
 openGraph: {
 title: 'Understanding Freelance Platform Reputation Systems | Ratings & Trust Scores',
 description: 'Complete guide to platform rating systems, badges, trust scores, and reviews. Learn how different platforms calculate reputation.',
 type: 'article',
 images: ['/images/defaults/og-image.jpg'],
 },
};

export default async function PlatformReputationSystemsPage({ params }: { params: Promise<{ locale: string }>}) {
 const { locale } = await params;

 const jsonLd = {
 '@context': 'https://schema.org',
 '@type': 'Article',
 headline: 'Understanding Freelance Platform Reputation Systems',
 description: 'Complete guide to how different freelance platforms handle ratings, badges, trust scores, and reviews.',
 author: {
 '@type': 'Organization',
 name: 'SkillLinkup',
 },
 publisher: {
 '@type': 'Organization',
 name: 'SkillLinkup',
 logo: {
 '@type': 'ImageObject',
 url: 'https://skilllinkup.com/images/logo/logo-black.png',
 },
 },
 datePublished: '2026-01-01',
 dateModified: '2026-01-01',
 };

 const breadcrumbLd = {
 '@context': 'https://schema.org',
 '@type': 'BreadcrumbList',
 itemListElement: [
 {
 '@type': 'ListItem',
 position: 1,
 name: 'Home',
 item: `https://skilllinkup.com/${locale}`,
 },
 {
 '@type': 'ListItem',
 position: 2,
 name: 'Platform Selection Guide',
 item: `https://skilllinkup.com/${locale}/gids/platform-selectie`,
 },
 {
 '@type': 'ListItem',
 position: 3,
 name: 'Platform Reputation Systems',
 },
 ],
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
 />

 {/* Hero Section */}
 <section className="bg-gradient-to-br from-[#1e1541] to-[#ef2b70] text-white py-16">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
 Understanding Platform Reputation Systems
 </h1>
 <p className="text-xl md:text-2xl mb-8 text-white/90">
 Master ratings, badges, and trust scores. Learn how platforms calculate reputation and how to protect your professional credibility.
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-3 text-[#ef2b70] font-heading font-semibold shadow-lg transition-colors"
 >
 Compare Platform Features
 </Link>
 </div>
 </div>
 </section>

 {/* Main Content */}
 <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
 <div className="max-w-4xl mx-auto">
 {/* Introduction */}
 <div className="prose prose-lg max-w-none mb-12">
 <p className="text-xl text-gray-700 leading-relaxed">
 Your reputation score is your most valuable asset as a freelancer. One bad review can cost you thousands in lost opportunities. But how do different platforms calculate these scores? And what can you do to protect yourself from unfair ratings?
 </p>
 <p className="text-lg text-gray-600 leading-relaxed">
 We&apos;ve analyzed the reputation systems of 15 major platforms. This guide reveals how each system works, common manipulation tactics to watch for, and strategies to build and maintain a 5-star profile.
 </p>
 </div>

 {/* Why Reputation Matters */}
 <div className="mb-12">
 <h2 className="text-3xl font-heading font-bold text-[#1e1541] mb-6">
 Why Your Reputation Score Matters More Than You Think
 </h2>
 <div className="bg-[#ef2b70]/10 border-l-4 border-[#ef2b70] p-6 mb-6">
 <p className="text-gray-700">
 <strong>Critical stat:</strong>Freelancers with 4.9+ star ratings earn 30-40% more per hour than those with 4.5-4.8 ratings, even with identical skills.
 </p>
 </div>

 <div className="grid md:grid-cols-2 gap-6 mb-6">
 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="text-xl font-heading font-bold text-[#ef2b70] mb-3">
 Impact on Visibility
 </h3>
 <p className="text-gray-700 mb-2">
 Most platforms use reputation as a primary ranking factor. Higher ratings = more visibility in search results.
 </p>
 <p className="text-sm text-gray-600">
 <strong>Example:</strong>Upwork&apos;s algorithm prioritizes Top Rated freelancers (98%+ Job Success Score).
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="text-xl font-heading font-bold text-[#ef2b70] mb-3">
 Impact on Conversion Rate
 </h3>
 <p className="text-gray-700 mb-2">
 Clients are 5x more likely to hire a 5.0-rated freelancer vs. a 4.0-rated one, even if the 4.0 costs 30% less.
 </p>
 <p className="text-sm text-gray-600">
 <strong>Psychology:</strong>Social proof is one of the most powerful decision-making triggers.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="text-xl font-heading font-bold text-[#ef2b70] mb-3">
 Impact on Pricing Power
 </h3>
 <p className="text-gray-700 mb-2">
 Top-rated freelancers can charge 40-60% higher rates because reputation de-risks the client&apos;s decision.
 </p>
 <p className="text-sm text-gray-600">
 <strong>Math:</strong>5.0 rating at $100/hr &gt; 4.0 rating at $60/hr in client eyes.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="text-xl font-heading font-bold text-[#ef2b70] mb-3">
 Impact on Platform Privileges
 </h3>
 <p className="text-gray-700 mb-2">
 Many platforms unlock features (priority support, lower fees, exclusive invites) only for highly-rated freelancers.
 </p>
 <p className="text-sm text-gray-600">
 <strong>Example:</strong>Upwork&apos;s Plus program requires 90%+ Job Success Score.
 </p>
 </div>
 </div>
 </div>

 {/* How Different Platforms Calculate Reputation */}
 <div className="mb-12">
 <h2 className="text-3xl font-heading font-bold text-[#1e1541] mb-6">
 Platform-by-Platform Reputation Systems
 </h2>
 <p className="text-gray-700 mb-6">
 Each platform uses different algorithms. Understanding these helps you optimize your strategy.
 </p>

 {/* Upwork */}
 <div className="bg-white rounded-lg shadow p-8 mb-6 border-l-4 border-[#ef2b70]">
 <h3 className="text-2xl font-heading font-bold text-[#1e1541] mb-4">
 Upwork: Job Success Score (JSS)
 </h3>
 <div className="mb-4">
 <span className="bg-[#22c55e] text-white px-3 py-1 rounded-full text-sm font-semibold">
 Most Complex System
 </span>
 </div>
 <p className="text-gray-700 mb-4">
 <strong>How it works:</strong>Proprietary algorithm combines multiple factors, weighted by recency and contract value.
 </p>
 <div className="bg-gray-50 rounded-lg p-6 mb-4">
 <h4 className="font-heading font-bold text-[#1e1541] mb-3">JSS Factors (Estimated Weights)</h4>
 <ul className="space-y-2 text-gray-700">
 <li>✓ Client feedback ratings (40%): 1-5 star reviews</li>
 <li>✓ Contract completion rate (25%): Finishing vs. abandoning projects</li>
 <li>✓ Long-term relationships (15%): Repeat clients boost score</li>
 <li>✓ Responsiveness (10%): Reply time to messages</li>
 <li>✓ Recent performance (10%): Last 12 months weighted heavier</li>
 </ul>
 </div>
 <div className="grid md:grid-cols-3 gap-4 mb-4">
 <div>
 <p className="text-sm text-gray-600 mb-1">Minimum for Top Rated</p>
 <p className="text-xl font-bold text-[#1e1541]">98%+</p>
 </div>
 <div>
 <p className="text-sm text-gray-600 mb-1">Good Standing</p>
 <p className="text-xl font-bold text-[#1e1541]">80-89%</p>
 </div>
 <div>
 <p className="text-sm text-gray-600 mb-1">At Risk</p>
 <p className="text-xl font-bold text-red-600">&lt;70%</p>
 </div>
 </div>
 <p className="text-sm text-gray-600">
 <strong>Pro tip:</strong>JSS updates every 2 weeks. One bad review can drop you 5-10 points temporarily.
 </p>
 </div>

 {/* Fiverr */}
 <div className="bg-white rounded-lg shadow p-8 mb-6">
 <h3 className="text-2xl font-heading font-bold text-[#1e1541] mb-4">
 Fiverr: Seller Levels & Ratings
 </h3>
 <div className="mb-4">
 <span className="bg-[#ef2b70] text-white px-3 py-1 rounded-full text-sm font-semibold">
 Gamified System
 </span>
 </div>
 <p className="text-gray-700 mb-4">
 <strong>How it works:</strong>Level-based progression system with strict requirements for each tier.
 </p>
 <div className="bg-gray-50 rounded-lg p-6 mb-4">
 <h4 className="font-heading font-bold text-[#1e1541] mb-3">Seller Level Requirements</h4>
 <div className="space-y-4">
 <div>
 <p className="font-semibold text-[#1e1541]">Level 1 Seller:</p>
 <ul className="text-sm text-gray-700 ml-4">
 <li>• 60 days on platform + 10 orders + $400 earnings + 4.7★ rating</li>
 </ul>
 </div>
 <div>
 <p className="font-semibold text-[#1e1541]">Level 2 Seller:</p>
 <ul className="text-sm text-gray-700 ml-4">
 <li>• 120 days on platform + 50 orders + $2,000 earnings + 4.7★ rating</li>
 </ul>
 </div>
 <div>
 <p className="font-semibold text-[#1e1541]">Top Rated Seller:</p>
 <ul className="text-sm text-gray-700 ml-4">
 <li>• Hand-selected by Fiverr team + exceptional performance metrics</li>
 </ul>
 </div>
 </div>
 </div>
 <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
 <p className="text-sm text-gray-700">
 <strong>Warning:</strong>Fiverr demotes sellers who drop below 4.7★ or miss delivery deadlines. Can take 60 days to recover level.
 </p>
 </div>
 </div>

 {/* Toptal */}
 <div className="bg-white rounded-lg shadow p-8 mb-6">
 <h3 className="text-2xl font-heading font-bold text-[#1e1541] mb-4">
 Toptal: Vetting + Client Feedback
 </h3>
 <div className="mb-4">
 <span className="bg-[#22c55e] text-white px-3 py-1 rounded-full text-sm font-semibold">
 Pre-Screened Elite
 </span>
 </div>
 <p className="text-gray-700 mb-4">
 <strong>How it works:</strong>5-step vetting process filters to top 3%. Ongoing performance monitoring.
 </p>
 <div className="bg-gray-50 rounded-lg p-6 mb-4">
 <h4 className="font-heading font-bold text-[#1e1541] mb-3">Vetting Process</h4>
 <ol className="space-y-2 text-gray-700 list-decimal pl-6">
 <li>Language & communication screening</li>
 <li>Skills assessment & portfolio review</li>
 <li>Live technical interview (4+ hours)</li>
 <li>Test project evaluation</li>
 <li>Final interview with Toptal staff</li>
 </ol>
 </div>
 <p className="text-sm text-gray-600">
 <strong>Reputation maintenance:</strong>Client satisfaction below 4.5★ triggers review. Consistent low ratings = removal from platform.
 </p>
 </div>

 {/* CTA #1 */}
 <div className="bg-gradient-to-r from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 mb-8 text-center">
 <h3 className="text-2xl font-heading font-bold text-white mb-4">
 Choose Platforms with Fair Rating Systems
 </h3>
 <p className="text-white/90 text-lg mb-6">
 Compare reputation features and protection policies across all platforms
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-3 text-[#ef2b70] font-heading font-semibold shadow-lg transition-colors"
 >
 See Platform Comparison
 </Link>
 </div>

 {/* More Platforms (Condensed) */}
 <div className="space-y-4 mb-8">
 <h3 className="text-2xl font-heading font-bold text-[#1e1541] mb-4">
 More Platform Reputation Systems
 </h3>

 <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
 <h4 className="text-xl font-heading font-bold text-[#1e1541] mb-2">Freelancer.com: Percentage + Badges</h4>
 <p className="text-gray-700 mb-2">
 Simple percentage system (95%, 98%, 100%) + skill badges. Recent reviews weighted 2x heavier than old ones.
 </p>
 <p className="text-sm text-gray-600">
 <strong>Unique feature:</strong>&quot;Preferred Freelancer&quot; badge for top 1% in each category.
 </p>
 </div>

 <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
 <h4 className="text-xl font-heading font-bold text-[#1e1541] mb-2">Guru: Customer Satisfaction Score</h4>
 <p className="text-gray-700 mb-2">
 0-100 score based on client feedback, repeat hire rate, and on-time delivery. Updates monthly.
 </p>
 <p className="text-sm text-gray-600">
 <strong>Threshold:</strong>Need 90+ score to qualify for Elite status (lower service fees).
 </p>
 </div>

 <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
 <h4 className="text-xl font-heading font-bold text-[#1e1541] mb-2">Contra: No Rating System</h4>
 <p className="text-gray-700 mb-2">
 Portfolio-first platform with no public ratings. Clients review your work, not star ratings.
 </p>
 <p className="text-sm text-gray-600">
 <strong>Philosophy:</strong>Your work speaks for itself. Reduces rating gaming and stress.
 </p>
 </div>

 <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
 <h4 className="text-xl font-heading font-bold text-[#1e1541] mb-2">99designs: Contest Win Rate</h4>
 <p className="text-gray-700 mb-2">
 Reputation based on contest wins, client ratings after wins, and community votes.
 </p>
 <p className="text-sm text-gray-600">
 <strong>Tiers:</strong>Mid-level (20%+ win rate), Top-level (40%+ win rate), Elite (hand-selected).
 </p>
 </div>
 </div>
 </div>

 {/* Badge Systems */}
 <div className="mb-12">
 <h2 className="text-3xl font-heading font-bold text-[#1e1541] mb-6">
 Understanding Platform Badges & Certifications
 </h2>
 <p className="text-gray-700 mb-6">
 Badges signal expertise and trustworthiness. Here&apos;s what they actually mean:
 </p>

 <div className="grid md:grid-cols-2 gap-6">
 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="text-lg font-heading font-bold text-[#ef2b70] mb-3">
 Performance Badges
 </h3>
 <ul className="space-y-2 text-gray-700 text-sm">
 <li><strong>Top Rated</strong>(Upwork): 98%+ JSS, $1,000+ earnings, high client satisfaction</li>
 <li><strong>Rising Talent</strong>(Upwork): New freelancers showing strong early performance</li>
 <li><strong>Fiverr Pro</strong>: Hand-vetted elite sellers, top 1% of marketplace</li>
 <li><strong>Level 2 Seller</strong>(Fiverr): 50+ orders, 4.7★+, consistent delivery</li>
 </ul>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="text-lg font-heading font-bold text-[#ef2b70] mb-3">
 Skill Badges
 </h3>
 <ul className="space-y-2 text-gray-700 text-sm">
 <li><strong>Skill Tests</strong>: Pass platform-specific exams (often questionable quality)</li>
 <li><strong>Certifications</strong>: External certifications (Google, Adobe, AWS, etc.)</li>
 <li><strong>Portfolio Featured</strong>: Highlighted work samples meeting quality thresholds</li>
 <li><strong>Specialty Badges</strong>: Niche expertise recognition (e.g., &quot;WordPress Expert&quot;)</li>
 </ul>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="text-lg font-heading font-bold text-[#ef2b70] mb-3">
 Trust & Verification Badges
 </h3>
 <ul className="space-y-2 text-gray-700 text-sm">
 <li><strong>Identity Verified</strong>: Government ID confirmed</li>
 <li><strong>Payment Verified</strong>: Bank account or payment method validated</li>
 <li><strong>Background Check</strong>: Criminal record check passed (rare)</li>
 <li><strong>Email Verified</strong>: Basic account verification (minimal trust signal)</li>
 </ul>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="text-lg font-heading font-bold text-[#ef2b70] mb-3">
 Relationship Badges
 </h3>
 <ul className="space-y-2 text-gray-700 text-sm">
 <li><strong>Repeat Client Rate</strong>: Percentage of clients who rehire you</li>
 <li><strong>Long-term Relationship</strong>: Worked with clients for 6+ months</li>
 <li><strong>Referral Rate</strong>: How often clients refer you to others</li>
 <li><strong>Response Time</strong>: Average time to reply to inquiries</li>
 </ul>
 </div>
 </div>
 </div>

 {/* Protecting Your Reputation */}
 <div className="mb-12">
 <h2 className="text-3xl font-heading font-bold text-[#1e1541] mb-6">
 10 Strategies to Protect Your Reputation
 </h2>

 <div className="space-y-6">
 <div className="flex items-start">
 <span className="text-[#ef2b70] font-bold text-3xl mr-4">1</span>
 <div>
 <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-2">
 Set Clear Expectations Upfront
 </h3>
 <p className="text-gray-700">
 90% of bad reviews stem from mismatched expectations. Define scope, timeline, deliverables, and revision policy before accepting work. Use written contracts for everything.
 </p>
 </div>
 </div>

 <div className="flex items-start">
 <span className="text-[#ef2b70] font-bold text-3xl mr-4">2</span>
 <div>
 <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-2">
 Screen Clients Before Accepting
 </h3>
 <p className="text-gray-700 mb-3">
 Check client&apos;s review history, payment verification, and past projects. Red flags to avoid:
 </p>
 <ul className="list-disc pl-6 space-y-1 text-gray-700">
 <li>No payment method verified</li>
 <li>History of leaving bad reviews for freelancers</li>
 <li>Vague project descriptions with unrealistic budgets</li>
 <li>Requests work before contract is signed</li>
 </ul>
 </div>
 </div>

 <div className="flex items-start">
 <span className="text-[#ef2b70] font-bold text-3xl mr-4">3</span>
 <div>
 <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-2">
 Over-Communicate During Projects
 </h3>
 <p className="text-gray-700">
 Send daily/weekly updates even when not requested. Clients rate responsiveness heavily. If you&apos;ll miss a deadline, communicate 48+ hours in advance with solutions.
 </p>
 </div>
 </div>

 <div className="flex items-start">
 <span className="text-[#ef2b70] font-bold text-3xl mr-4">4</span>
 <div>
 <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-2">
 Use Milestone Payments Strategically
 </h3>
 <p className="text-gray-700">
 Break large projects into 3-5 milestones. This lets you collect reviews throughout the project and gives you exit points if client becomes difficult.
 </p>
 </div>
 </div>

 <div className="flex items-start">
 <span className="text-[#ef2b70] font-bold text-3xl mr-4">5</span>
 <div>
 <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-2">
 Document Everything
 </h3>
 <p className="text-gray-700 mb-3">
 Keep detailed records of all communication, deliverables, and client approvals. If a dispute arises, documentation is your defense.
 </p>
 <p className="text-sm text-gray-600">
 <strong>Pro tip:</strong>Use platform messaging for all important communications—email/Slack discussions don&apos;t count in disputes.
 </p>
 </div>
 </div>

 <div className="flex items-start">
 <span className="text-[#ef2b70] font-bold text-3xl mr-4">6</span>
 <div>
 <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-2">
 Request Reviews Immediately
 </h3>
 <p className="text-gray-700">
 Ask for review within 24 hours of project completion. Clients forget or procrastinate—strike while the satisfaction is fresh.
 </p>
 <div className="bg-gray-50 p-4 rounded mt-3">
 <p className="text-sm text-gray-700 italic">
 &quot;I&apos;m so glad you&apos;re happy with [deliverable]! If you have 2 minutes, I&apos;d really appreciate a review on your experience working together. It helps me attract more clients like you.&quot;
 </p>
 </div>
 </div>
 </div>

 <div className="flex items-start">
 <span className="text-[#ef2b70] font-bold text-3xl mr-4">7</span>
 <div>
 <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-2">
 Handle Difficult Clients Proactively
 </h3>
 <p className="text-gray-700 mb-3">
 If a client seems unhappy, address it immediately—don&apos;t wait for a bad review. Offer solutions:
 </p>
 <ul className="list-disc pl-6 space-y-1 text-gray-700">
 <li>Free revisions (within reason)</li>
 <li>Partial refund if expectations weren&apos;t met</li>
 <li>Additional deliverables to make things right</li>
 </ul>
 <p className="text-sm text-gray-600 mt-2">
 <strong>Math:</strong>A $200 refund is cheaper than a 1-star review costing you $10K in future work.
 </p>
 </div>
 </div>

 <div className="flex items-start">
 <span className="text-[#ef2b70] font-bold text-3xl mr-4">8</span>
 <div>
 <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-2">
 Respond to All Reviews (Good and Bad)
 </h3>
 <p className="text-gray-700 mb-3">
 Platforms that allow responses: use them strategically.
 </p>
 <ul className="list-disc pl-6 space-y-1 text-gray-700">
 <li><strong>5-star reviews:</strong>Thank client, mention specific project details</li>
 <li><strong>4-star reviews:</strong>Thank + ask what would&apos;ve made it 5 stars</li>
 <li><strong>1-3 star reviews:</strong>Professional response explaining your side (future clients read these)</li>
 </ul>
 </div>
 </div>

 <div className="flex items-start">
 <span className="text-[#ef2b70] font-bold text-3xl mr-4">9</span>
 <div>
 <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-2">
 Dilute Bad Reviews with Volume
 </h3>
 <p className="text-gray-700">
 One 1-star review among 100 5-star reviews barely affects your average. One 1-star among 5 reviews tanks your profile. Build review volume continuously.
 </p>
 </div>
 </div>

 <div className="flex items-start">
 <span className="text-[#ef2b70] font-bold text-3xl mr-4">10</span>
 <div>
 <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-2">
 Know Platform Dispute Processes
 </h3>
 <p className="text-gray-700 mb-3">
 If you receive an unfair review, most platforms have dispute/removal processes. Requirements vary:
 </p>
 <ul className="list-disc pl-6 space-y-1 text-gray-700">
 <li><strong>Upwork:</strong>Can dispute if review violates policies (profanity, threats, etc.)</li>
 <li><strong>Fiverr:</strong>Very difficult to remove reviews—focus on prevention</li>
 <li><strong>Freelancer.com:</strong>Mediation available for contract disputes</li>
 </ul>
 </div>
 </div>
 </div>
 </div>

 {/* CTA #2 */}
 <div className="bg-[#22c55e]/10 border-l-4 border-[#22c55e] rounded-lg p-8 mb-12">
 <h3 className="text-2xl font-heading font-bold text-[#1e1541] mb-4">
 Start Fresh on a Platform with Fair Rating System
 </h3>
 <p className="text-gray-700 text-lg mb-6">
 If your current platform&apos;s reputation system is working against you, it might be time to switch. Learn how to migrate without losing clients.
 </p>
 <Link
 href={`/${locale}/gids/platform-selectie/switching-platforms-guide`}
 className="inline-block rounded-lg bg-[#22c55e] hover:bg-[#22c55e]/90 px-8 py-3 text-white font-heading font-semibold shadow-lg transition-colors"
 >
 Read Migration Guide
 </Link>
 </div>

 {/* Gaming & Manipulation */}
 <div className="mb-12">
 <h2 className="text-3xl font-heading font-bold text-[#1e1541] mb-6">
 Rating Manipulation Tactics (And Why to Avoid Them)
 </h2>
 <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
 <p className="text-gray-700">
 <strong>Legal Warning:</strong>Most rating manipulation tactics violate platform Terms of Service and can result in permanent account suspension with forfeited earnings.
 </p>
 </div>

 <div className="space-y-4">
 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="text-lg font-heading font-bold text-red-600 mb-2">
 ❌ Buying Fake Reviews
 </h3>
 <p className="text-gray-700 mb-2">
 Services selling 5-star reviews for $5-10 each. Platforms detect these through:
 </p>
 <ul className="list-disc pl-6 text-sm text-gray-700">
 <li>Review patterns (multiple reviews same day, generic text)</li>
 <li>Client account analysis (new accounts, no payment history)</li>
 <li>IP address tracking</li>
 </ul>
 <p className="text-sm text-gray-600 mt-2">
 <strong>Consequence:</strong>Permanent ban, loss of all earnings in account.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="text-lg font-heading font-bold text-red-600 mb-2">
 ❌ Review Swapping with Other Freelancers
 </h3>
 <p className="text-gray-700 mb-2">
 Mutual 5-star reviews between freelancers posing as clients. Platforms track:
 </p>
 <ul className="list-disc pl-6 text-sm text-gray-700">
 <li>Reciprocal review patterns</li>
 <li>Payment flow irregularities</li>
 <li>Profile similarities (same location, login patterns)</li>
 </ul>
 <p className="text-sm text-gray-600 mt-2">
 <strong>Consequence:</strong>Both accounts suspended.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="text-lg font-heading font-bold text-yellow-600 mb-2">
 Creating Multiple Accounts
 </h3>
 <p className="text-gray-700 mb-2">
 Starting fresh account when reputation tanks. Platforms detect through:
 </p>
 <ul className="list-disc pl-6 text-sm text-gray-700">
 <li>Device fingerprinting</li>
 <li>Payment method tracking</li>
 <li>Portfolio image matching (reverse image search)</li>
 </ul>
 <p className="text-sm text-gray-600 mt-2">
 <strong>Consequence:</strong>Both accounts banned, IP address blacklisted.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-2 border-[#22c55e]">
 <h3 className="text-lg font-heading font-bold text-[#22c55e] mb-2">
 ✅ Legitimate Reputation Building
 </h3>
 <p className="text-gray-700 mb-2">
 What DOES work legally:
 </p>
 <ul className="list-disc pl-6 text-sm text-gray-700">
 <li>Start with lower rates to build volume quickly</li>
 <li>Over-deliver on first 10 projects to guarantee 5-star reviews</li>
 <li>Politely ask satisfied clients for reviews</li>
 <li>Showcase best testimonials in profile description</li>
 <li>Build portfolio with impressive case studies</li>
 </ul>
 </div>
 </div>
 </div>

 {/* Platform Comparison Table */}
 <div className="mb-12">
 <h2 className="text-3xl font-heading font-bold text-[#1e1541] mb-6">
 Quick Comparison: Reputation Features by Platform
 </h2>
 <div className="bg-white rounded-lg shadow overflow-hidden">
 <table className="w-full text-sm">
 <thead className="bg-[#1e1541] text-white">
 <tr>
 <th className="px-4 py-3 text-left font-heading">Platform</th>
 <th className="px-4 py-3 text-left font-heading">Rating Type</th>
 <th className="px-4 py-3 text-left font-heading">Can Respond</th>
 <th className="px-4 py-3 text-left font-heading">Dispute Process</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-200 text-gray-700">
 <tr>
 <td className="px-4 py-3 font-semibold">Upwork</td>
 <td className="px-4 py-3">Job Success Score (0-100%)</td>
 <td className="px-4 py-3">Yes</td>
 <td className="px-4 py-3">Yes (strict criteria)</td>
 </tr>
 <tr className="bg-gray-50">
 <td className="px-4 py-3 font-semibold">Fiverr</td>
 <td className="px-4 py-3">5-star + Level system</td>
 <td className="px-4 py-3">Yes</td>
 <td className="px-4 py-3">Limited</td>
 </tr>
 <tr>
 <td className="px-4 py-3 font-semibold">Toptal</td>
 <td className="px-4 py-3">Internal performance metrics</td>
 <td className="px-4 py-3">N/A (private)</td>
 <td className="px-4 py-3">Yes (account manager)</td>
 </tr>
 <tr className="bg-gray-50">
 <td className="px-4 py-3 font-semibold">Freelancer.com</td>
 <td className="px-4 py-3">Percentage (0-100%)</td>
 <td className="px-4 py-3">Yes</td>
 <td className="px-4 py-3">Yes (mediation)</td>
 </tr>
 <tr>
 <td className="px-4 py-3 font-semibold">Guru</td>
 <td className="px-4 py-3">Satisfaction Score (0-100)</td>
 <td className="px-4 py-3">Yes</td>
 <td className="px-4 py-3">Yes</td>
 </tr>
 <tr className="bg-gray-50">
 <td className="px-4 py-3 font-semibold">Contra</td>
 <td className="px-4 py-3">No public ratings</td>
 <td className="px-4 py-3">N/A</td>
 <td className="px-4 py-3">N/A</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 {/* Final Tips */}
 <div className="bg-[#1e1541] text-white rounded-lg p-8 mb-12">
 <h2 className="text-3xl font-heading font-bold mb-6">Key Takeaways</h2>
 <ul className="space-y-4">
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold text-2xl mr-4">1.</span>
 <span className="text-lg">Your reputation score directly impacts earnings—protect it like your bank account</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold text-2xl mr-4">2.</span>
 <span className="text-lg">Each platform calculates reputation differently—understand the specific algorithm</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold text-2xl mr-4">3.</span>
 <span className="text-lg">Prevention is easier than recovery—screen clients and set expectations upfront</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold text-2xl mr-4">4.</span>
 <span className="text-lg">Build review volume quickly to dilute inevitable bad reviews</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold text-2xl mr-4">5.</span>
 <span className="text-lg">Never attempt rating manipulation—the risk vastly outweighs any short-term gain</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold text-2xl mr-4">6.</span>
 <span className="text-lg">If you receive unfair reviews, follow platform dispute processes immediately</span>
 </li>
 </ul>
 </div>

 {/* Bottom CTA */}
 <div className="bg-gradient-to-r from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center">
 <h2 className="text-3xl font-heading font-bold text-white mb-4">
 Choose Platforms with Transparent Reputation Systems
 </h2>
 <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
 Compare rating systems, dispute processes, and freelancer protection policies across all major platforms
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <Link
 href={`/${locale}/platforms`}
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-3 text-[#ef2b70] font-heading font-semibold shadow-lg transition-colors"
 >
 Compare All Platforms
 </Link>
 <Link
 href={`/${locale}/gids/platform-selectie/freelance-platform-red-flags`}
 className="inline-block rounded-lg bg-[#1e1541] hover:bg-[#1e1541]/90 px-8 py-3 text-white font-heading font-semibold shadow-lg transition-colors"
 >
 See Warning Signs
 </Link>
 </div>
 </div>
 </div>
 </article>
 </>
 );
}
