import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AdWidget } from '@/components/AdWidget';
import { Heart, Battery, AlertTriangle, CheckCircle, ArrowRight, Zap, Calendar, Coffee, Moon, Brain } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;

  const slug = 'avoiding-freelance-burnout';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/gids/best-practices/${slug}`;

  return {
    title: 'Avoiding Burnout: Self-Care Strategies for Freelancers',
    description: 'Prevent freelance burnout with proven self-care strategies. Learn to recognize warning signs, set boundaries, and maintain sustainable work practices for long-term success.',
    keywords: 'freelance burnout, self-care freelancers, work-life balance, preventing burnout, freelancer mental health, sustainable freelancing',
    openGraph: {
      title: 'Avoiding Burnout: Self-Care Strategies for Freelancers',
      description: 'Prevent freelance burnout with proven self-care strategies and sustainable work practices.',
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [
        {
          url: `${siteUrl}/images/og/resources-og.png`,
          width: 1200,
          height: 630,
          alt: 'Avoiding Burnout: Self-Care Strategies for Freelancers',
        }
      ],
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Avoiding Burnout: Self-Care Strategies for Freelancers',
      description: 'Prevent freelance burnout with proven self-care strategies. Learn to recognize warning signs, set boundaries, and maintain sustainable work practices.',
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

export default async function AvoidingFreelanceBurnout({
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
                  <Heart className="w-7 h-7 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Avoiding Burnout: Self-Care for Freelancers
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Freelance freedom comes with a hidden cost: burnout. Learn to recognize the warning signs, implement proven self-care strategies, and build sustainable work practices that protect your mental health and long-term success.
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
            "headline": "Avoiding Burnout: Self-Care Strategies for Freelancers",
            "description": "Prevent freelance burnout with proven self-care strategies. Learn to recognize warning signs, set boundaries, and maintain sustainable work practices for long-term success.",
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
                "name": "Avoiding Burnout",
                "item": `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/gids/best-practices/avoiding-freelance-burnout`
              }
            ]
          })
        }} />

        {/* Main Content */}
        <article className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                The Hidden Epidemic of Freelance Burnout
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Studies show that <strong>71% of freelancers experience burnout</strong> at some point in their career—significantly higher than traditional employees at 57%. The flexibility that attracts people to freelancing ironically becomes the source of their exhaustion when boundaries blur and "always available" becomes the default.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Unlike office workers who can leave work at 5 PM, freelancers carry their office everywhere. Client messages at dinner time, weekend work "emergencies," and the constant pressure to say yes to avoid missing opportunities create a perfect storm for burnout.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 dark:from-red-500/20 dark:to-red-500/10 rounded-xl p-6 border border-red-500/20">
                  <AlertTriangle className="w-10 h-10 text-red-500 mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">71% Burnout Rate</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Freelancers vs 57% employees</p>
                </div>
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border border-accent/20">
                  <Battery className="w-10 h-10 text-accent mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">3-6 Month Recovery</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Average burnout recovery time</p>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border border-primary/20">
                  <Heart className="w-10 h-10 text-primary mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">40% Revenue Loss</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">During burnout periods</p>
                </div>
              </div>
            </div>

            {/* Section 1: Recognizing Burnout Warning Signs */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Recognizing Burnout Warning Signs Early
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                Burnout doesn't happen overnight. It's a gradual process with clear warning signs that most freelancers ignore until it's too late. The key to prevention is catching these signals early when intervention is still simple.
              </p>

              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Physical Warning Signs
                </h3>
                <div className="bg-gradient-to-br from-red-500/5 to-red-500/10 dark:from-red-500/10 dark:to-red-500/20 rounded-xl p-6 mb-4 border border-red-500/20">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Chronic Fatigue:</strong> Feeling exhausted even after sleeping 8+ hours. Waking up tired becomes your default state.
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Frequent Headaches:</strong> Tension headaches that appear during work and persist through evenings.
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Sleep Disruption:</strong> Can't fall asleep due to racing thoughts about work, or waking at 3 AM with anxiety about deadlines.
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Weakened Immunity:</strong> Getting sick more frequently than usual—constant colds, flu, or infections.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Emotional & Mental Warning Signs
                </h3>
                <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6 mb-4 border border-accent/20">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Brain className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Loss of Passion:</strong> Projects that used to excite you now feel like burdens. Creative work becomes mechanical.
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Brain className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Irritability:</strong> Small annoyances—client emails, Slack messages, revision requests—trigger disproportionate frustration.
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Brain className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Cynicism:</strong> Developing negative attitudes toward clients, projects, or freelancing itself. "All clients are difficult" thinking.
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Brain className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Decision Paralysis:</strong> Simple decisions become overwhelming. Spending hours choosing between minor options.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Behavioral Warning Signs
                </h3>
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 border border-primary/20">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Procrastination Increase:</strong> Avoiding work until the last minute, then rushing through in panic mode.
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Social Withdrawal:</strong> Canceling plans with friends, ignoring messages, isolating yourself to "focus on work."
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Quality Decline:</strong> Making more mistakes, missing details, delivering work that doesn't meet your usual standards.
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Self-Medication:</strong> Increased caffeine, alcohol, or other substances to cope with stress or fatigue.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 2: Setting Sustainable Boundaries */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Setting Sustainable Work Boundaries
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                Boundaries aren't about being rigid or unresponsive—they're about creating sustainable work patterns that protect your energy and effectiveness. Clear boundaries actually make you a better freelancer because you're working from a place of energy, not exhaustion.
              </p>

              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Time Boundaries: Protect Your Off-Hours
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  The "always available" mindset is the fastest path to burnout. Set clear work hours and communicate them to clients upfront. Most clients respect boundaries when they're clearly stated.
                </p>
                <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6 mb-4 border border-accent/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    Practical Time Boundary Strategies:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Define Core Hours:</strong> Set specific work hours (e.g., 9 AM - 6 PM) and stick to them. Communicate these hours in your email signature and onboarding docs.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Use Auto-Responders:</strong> Set up email auto-replies outside work hours: "I'll respond to your message within 24 hours during business hours (9 AM - 6 PM EST)."</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Schedule "Off" Days:</strong> Take at least one full day off per week with zero work—no emails, no "quick edits," complete disconnection.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Batch Communication:</strong> Check emails at set times (e.g., 9 AM, 1 PM, 5 PM) instead of constant monitoring.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Client Boundaries: Train Your Clients
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  How clients treat you is largely determined by what you train them to expect. Set clear expectations from day one about response times, revision rounds, and project scope.
                </p>
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 border border-primary/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    Client Expectation Management:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Response Time Policy:</strong> "I respond to all messages within 24 business hours." Then actually stick to it—don't train clients to expect instant replies.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Scope Protection:</strong> Define project scope clearly in contracts. Additional requests = new quotes. "That's outside the project scope—I can provide a quote for that work."</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Revision Limits:</strong> Include specific revision rounds in contracts (e.g., "2 rounds of revisions included"). Extra revisions are billable.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Emergency Fees:</strong> Charge premium rates (1.5x-2x) for rush requests or weekend work. Make last-minute requests financially painful.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Workload Boundaries: Learn to Say No
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Taking on more work than you can handle sustainably is the most common cause of freelance burnout. Saying no to projects protects the quality of your yes projects.
                </p>
                <div className="bg-gradient-to-br from-red-500/5 to-red-500/10 dark:from-red-500/10 dark:to-red-500/20 rounded-xl p-6 border border-red-500/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    Capacity Management Framework:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Battery className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Track Your Capacity:</strong> Know your sustainable weekly hours. Most freelancers burn out trying to maintain 50-60 hour weeks. 35-40 is more sustainable.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Battery className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Build in Buffer:</strong> Only schedule 80% of your capacity. The remaining 20% handles unexpected revisions, delays, or personal emergencies.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Battery className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span><strong>No Scripts:</strong> Have polite ways to decline: "My schedule is fully booked through [date]. I can start your project on [later date] if that works."</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Battery className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Refer Out:</strong> Build a network of trusted freelancers. When you're at capacity, refer clients to colleagues. They'll do the same for you.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3: Daily Self-Care Practices */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Daily Self-Care Practices That Actually Work
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                Self-care isn't bubble baths and face masks (though those are fine). It's daily practices that protect your energy, maintain your health, and sustain your ability to do great work long-term.
              </p>

              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Morning Routines: Start Strong
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  How you start your day sets the tone for everything that follows. A morning routine creates a buffer between sleep and work stress, giving you time to center yourself.
                </p>
                <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6 mb-4 border border-accent/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    Sustainable Morning Practices:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Coffee className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>No Email Before 10 AM:</strong> Start your day with focused work, not reactive firefighting. Client emergencies can wait 2 hours.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Coffee className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Move Your Body:</strong> 15-30 minute walk, yoga, or workout. Physical activity reduces cortisol and improves focus for hours afterward.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Coffee className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Plan Your Top 3:</strong> Identify the 3 most important tasks for the day. Everything else is secondary.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Coffee className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Hydration Ritual:</strong> Drink a full glass of water before coffee. Dehydration increases fatigue and reduces cognitive performance.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Work Session Structure: Energy Management
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Your brain isn't designed for 8-hour focus marathons. Structure your workday around your natural energy cycles for sustainable productivity.
                </p>
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 border border-primary/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    Energy-Based Work Structure:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Brain className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>90-Minute Work Blocks:</strong> Research shows optimal focus blocks are 90 minutes. Work intensely for 90 minutes, then take a real break.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Brain className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>True Breaks:</strong> Get away from screens. Walk outside, stretch, talk to a human. Scrolling social media is not a break.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Brain className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Peak Hours for Hard Work:</strong> Schedule your most demanding work during your peak energy hours (usually morning for most people).</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Brain className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Admin in Low-Energy Time:</strong> Save emails, invoicing, and administrative tasks for when your creative energy is lower (usually afternoon).</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Evening Wind-Down: Disconnect Completely
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Sleep quality directly impacts burnout risk. Create an evening routine that signals to your brain that work is done and it's time to recover.
                </p>
                <div className="bg-gradient-to-br from-[#1e1541]/5 to-[#1e1541]/10 dark:from-[#1e1541]/10 dark:to-[#1e1541]/20 rounded-xl p-6 border border-[#1e1541]/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    Wind-Down Routine:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Moon className="w-5 h-5 text-[#1e1541] dark:text-white mt-0.5 flex-shrink-0" />
                      <span><strong>Hard Stop Time:</strong> Set a firm end to your workday (e.g., 6 PM). Close your laptop, turn off notifications, physically leave your workspace.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Moon className="w-5 h-5 text-[#1e1541] dark:text-white mt-0.5 flex-shrink-0" />
                      <span><strong>Transition Ritual:</strong> Create a clear end-of-work ritual: change clothes, go for a walk, or do 10 minutes of stretching.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Moon className="w-5 h-5 text-[#1e1541] dark:text-white mt-0.5 flex-shrink-0" />
                      <span><strong>Screen Curfew:</strong> No work screens 2 hours before bed. Blue light and work stress both disrupt sleep quality.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Moon className="w-5 h-5 text-[#1e1541] dark:text-white mt-0.5 flex-shrink-0" />
                      <span><strong>Next-Day Preparation:</strong> Spend 10 minutes preparing tomorrow's top 3 tasks. This prevents 3 AM anxiety about what you're forgetting.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Sections */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <Heart className="w-16 h-16 text-white mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Find Platforms That Support Work-Life Balance
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  Some freelance platforms offer better work-life balance features than others. Compare platforms based on client quality, payment protection, and boundary-respecting communication tools.
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
                <Battery className="w-16 h-16 text-white mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Build a Sustainable Freelance Career
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  Preventing burnout isn't about working less—it's about working sustainably. Implement these self-care strategies and protect your most valuable asset: your energy and creativity.
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
