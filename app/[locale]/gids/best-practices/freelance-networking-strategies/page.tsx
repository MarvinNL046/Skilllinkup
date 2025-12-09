import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AdWidget } from '@/components/AdWidget';
import { Users, MessageCircle, Coffee, CheckCircle, ArrowRight, Zap, Mail, Target, Shield } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;

  const slug = 'freelance-networking-strategies';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/gids/best-practices/${slug}`;

  return {
    title: 'Networking Strategies for Introverted Freelancers: Build Connections Authentically',
    description: 'Networking strategies designed for introverts. Build genuine professional connections, grow your freelance network, and win referrals without exhausting yourself at events.',
    keywords: 'introvert networking, freelance networking tips, authentic networking, professional connections, freelancer community, networking for introverts',
    openGraph: {
      title: 'Networking Strategies for Introverted Freelancers',
      description: 'Build genuine professional connections and grow your network without exhausting yourself. Networking strategies designed for introverts.',
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [
        {
          url: `${siteUrl}/images/og/resources-og.png`,
          width: 1200,
          height: 630,
          alt: 'Networking Strategies for Introverted Freelancers',
        }
      ],
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Networking Strategies for Introverted Freelancers',
      description: 'Build genuine professional connections without exhausting yourself. Networking strategies designed for introverts.',
      images: [`${siteUrl}/images/og/resources-og.png`],
      creator: '@SkillLinkup',
      site: '@SkillLinkup',
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'en': `${siteUrl}/en/gids/best-practices/${slug}`,
        'nl': `${siteUrl}/nl/gids/best-practices/${slug}`,
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

export default async function FreelanceNetworkingStrategies({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] text-white py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Users className="w-7 h-7 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Networking Strategies for Introverted Freelancers
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Hate networking events but know you need connections? Learn authentic networking strategies designed for introverts that build genuine relationships, win referrals, and grow your business without exhausting yourself.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  Find Platforms
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href={`/${locale}/blog`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20"
                >
                  Read More Tips
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
            "headline": "Networking Strategies for Introverted Freelancers: Build Connections Authentically",
            "description": "Networking strategies designed for introverts. Build genuine professional connections, grow your freelance network, and win referrals without exhausting yourself.",
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
                "name": "Best Practices",
                "item": `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/gids/best-practices`
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Networking Strategies",
                "item": `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/gids/best-practices/freelance-networking-strategies`
              }
            ]
          })
        }} />

        {/* Main Content */}
        <article className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why Traditional Networking Fails Introverts
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Research shows that <strong>65% of freelancers identify as introverts</strong>, yet most networking advice assumes you thrive in crowded rooms making small talk with strangers. The traditional "work the room" approach drains introverts while producing shallow connections that rarely lead to actual business.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Here's the good news: introverts have natural networking advantages. You excel at deep one-on-one conversations, thoughtful follow-up, and building genuine relationships—all more valuable than collecting 200 business cards.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border border-primary/20">
                  <Users className="w-10 h-10 text-primary mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">65% Introverts</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Among freelancers</p>
                </div>
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border border-accent/20">
                  <Target className="w-10 h-10 text-accent mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">78% Referrals</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">From quality relationships</p>
                </div>
                <div className="bg-gradient-to-br from-[#1e1541]/10 to-[#1e1541]/5 dark:from-[#1e1541]/30 dark:to-[#1e1541]/20 rounded-xl p-6 border border-[#1e1541]/20">
                  <Shield className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">5-7 Deep Connections</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Beat 100 shallow ones</p>
                </div>
              </div>
            </div>

            {/* Section 1: One-on-One Connection Strategies */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Master One-on-One Connections
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                Introverts shine in one-on-one settings where depth matters more than breadth. Focus your networking energy on building meaningful individual relationships rather than exhausting yourself at large events.
              </p>

              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Coffee Chats: The Introvert's Networking Superpower
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  One 30-minute coffee chat with the right person generates more value than 3 hours at a networking event. Coffee chats let you control the environment, prepare questions in advance, and have genuine conversations.
                </p>
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 mb-4 border border-primary/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    Coffee Chat Framework:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Coffee className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Who to Invite:</strong> Fellow freelancers in complementary fields, past clients you enjoyed working with, professionals in your target industries, or people doing work you admire.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Coffee className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>The Ask:</strong> "I'm connecting with people in [industry]. Would you be open to a 30-minute coffee chat? I'd love to learn about [specific thing]."</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Coffee className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Prepare Questions:</strong> Come with 5-7 genuine questions about their work, challenges, or industry insights. This eliminates awkward silences.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Coffee className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Give Value First:</strong> Share an article they'd find useful, introduce them to someone helpful, or offer your expertise on a challenge they mention.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Email Networking: Play to Your Strengths
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Introverts often communicate better in writing than face-to-face. Use email to build relationships on your terms, with time to craft thoughtful messages.
                </p>
                <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6 border border-accent/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    High-Value Email Networking:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Mail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>The Value-First Email:</strong> Send an article/resource/idea that relates to their recent work with no ask attached. "Saw your post about X. This article might interest you." 80% response rate.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Mail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>The Thoughtful Comment:</strong> When someone shares work/wins on LinkedIn, send a specific comment about what impressed you. Generic "congrats!" is noise; specific insights build relationships.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Mail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>The Strategic Introduction:</strong> Connect two people who would benefit from knowing each other. "Sarah, meet John. John's solving [problem] you mentioned." Builds goodwill with both.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Mail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>The Follow-Up Loop:</strong> After coffee chats or meeting someone valuable, send a follow-up within 24 hours. Reference specific conversation points and suggest next steps.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Leverage Existing Clients for Referrals
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Your best networking opportunities come from people who already know and value your work. Happy clients are referral goldmines if you ask strategically.
                </p>
                <div className="bg-gradient-to-br from-[#1e1541]/5 to-[#1e1541]/10 dark:from-[#1e1541]/10 dark:to-[#1e1541]/20 rounded-xl p-6 border border-[#1e1541]/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    Client Referral System:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-[#1e1541] dark:text-white mt-0.5 flex-shrink-0" />
                      <span><strong>Project Completion Ask:</strong> After delivering excellent work: "I'm accepting 2 new clients next month. If you know anyone who needs [service], I'd appreciate the referral."</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-[#1e1541] dark:text-white mt-0.5 flex-shrink-0" />
                      <span><strong>Specific Targeting:</strong> "Do you know any [specific role] at [type of company] who might need [service]?" Specific asks are 3x more effective than vague ones.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-[#1e1541] dark:text-white mt-0.5 flex-shrink-0" />
                      <span><strong>Make It Easy:</strong> Provide a short intro template clients can forward. "Feel free to forward this email to anyone who might benefit from working together."</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-[#1e1541] dark:text-white mt-0.5 flex-shrink-0" />
                      <span><strong>Referral Incentives:</strong> Offer referral bonuses ($100-$500) or discounts on future work. People need motivation to actively refer.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 2: Online Community Building */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Build Your Network Online
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                Online communities let introverts network on their own schedule, contribute when energy is high, and build reputation through helpfulness rather than small talk.
              </p>

              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Strategic Online Community Participation
                </h3>
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 mb-4 border border-primary/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    Where to Show Up:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <MessageCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Niche Slack/Discord Communities:</strong> Join 2-3 high-quality communities in your field. Contribute valuable answers to questions—this builds reputation as an expert.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <MessageCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>LinkedIn Engagement:</strong> Comment thoughtfully on 3-5 posts daily from your target audience. Specific insights beat generic "great post!" comments.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <MessageCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Reddit/Forums:</strong> Answer questions in subreddits where your ideal clients hang out. Help generously without promoting—your profile does that.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <MessageCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Twitter/X Threads:</strong> Share valuable insights in your niche through threads. 1 great thread per week builds more authority than daily random tweets.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  The "Give First" Strategy
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Building a network isn't about collecting contacts—it's about becoming valuable to your community. Give value consistently, and the network builds itself.
                </p>
                <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6 border border-accent/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    Ways to Add Value:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Share Resources:</strong> When you discover a great tool, template, or article, share it with people who'd benefit. Tag relevant people.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Answer Questions:</strong> Spend 30 minutes weekly answering questions in communities. Genuine help builds massive goodwill.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Make Introductions:</strong> Connect people who'd benefit from knowing each other. "You should meet X—they're solving the problem you mentioned."</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Amplify Others:</strong> Share and comment on work from your network. Support creates reciprocity.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3: Selective Event Attendance */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Attend Events Strategically (Not Frequently)
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                You don't need to attend every networking event. Choose 1-2 strategic events per quarter where your ideal clients or collaborators gather, then prepare to make them count.
              </p>

              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Event Selection Criteria
                </h3>
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 border border-primary/20">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Attendee Quality Over Quantity:</strong> Smaller, niche events (20-50 people) beat massive conferences (500+) for meaningful connections.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Structured Networking:</strong> Events with roundtable discussions or workshops reduce awkward mingling pressure while facilitating conversation.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Bring a Buddy:</strong> Attend with a freelance friend. You can recharge by talking to each other between meeting new people.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Set Time Limits:</strong> Plan to stay 90 minutes max. This prevents exhaustion and gives you an exit strategy.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Maximize Event ROI with Follow-Up
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Most people waste networking events by not following up. As an introvert, your superpower is thoughtful follow-up that transforms brief conversations into real relationships.
                </p>
                <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6 border border-accent/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    Post-Event Follow-Up System:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>24-Hour Rule:</strong> Send personalized follow-ups within 24 hours. Reference specific conversation topics: "Great talking about [specific thing]. Here's that resource I mentioned."</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Quality Over Quantity:</strong> Only follow up with 5-7 most promising connections. Deep relationships beat shallow contact lists.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Suggest Next Steps:</strong> Propose coffee chats or specific ways to collaborate. "Would you be open to a 30-minute virtual coffee to discuss [topic]?"</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Long-Term Nurture:</strong> Add valuable contacts to a CRM or spreadsheet. Touch base every 2-3 months with value (article, intro, question).</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Sections */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <Users className="w-16 h-16 text-white mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Find Platforms with Built-In Communities
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  Some freelance platforms have thriving communities where you can network naturally through forums, skill-sharing, and collaboration. Compare platforms with strong community features.
                </p>
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg"
                >
                  Find Platforms
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <AdWidget placement="blog_sidebar" />

            {/* Final CTA */}
            <div className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
              <div className="max-w-3xl mx-auto">
                <MessageCircle className="w-16 h-16 text-white mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Build Your Network Authentically
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  You don't need to become an extrovert to network successfully. Play to your strengths: depth over breadth, quality over quantity, and genuine relationships over transactional exchanges.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href={`/${locale}/blog`}
                    className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg"
                  >
                    Read More Tips
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href={`/${locale}/newsletter`}
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20"
                  >
                    Join Community
                    <Zap className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
