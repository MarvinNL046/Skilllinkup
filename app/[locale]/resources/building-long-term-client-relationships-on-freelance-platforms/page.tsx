import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Heart, Repeat, Shield, TrendingUp, Users, CheckCircle2, ArrowRight, Zap, Award, DollarSign } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const slug = 'building-long-term-client-relationships-on-freelance-platforms';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

  return {
    title: 'Building Long-Term Client Relationships on Freelance Platforms',
    description: 'Transform one-time projects into recurring revenue streams. Learn proven strategies for client retention that increase lifetime value by 400%+ on freelance platforms.',
    keywords: 'freelance client retention, long-term clients, recurring freelance income, client relationships, freelance repeat business',
    openGraph: {
      title: 'Building Long-Term Client Relationships on Freelance Platforms',
      description: 'Master client retention strategies that transform one-time gigs into 6-figure partnerships.',
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Building Long-Term Client Relationships on Freelance Platforms' }],
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Building Long-Term Client Relationships on Freelance Platforms',
      description: 'Master client retention strategies that transform one-time gigs into 6-figure partnerships.',
      images: [`${siteUrl}/images/og/resources-og.png`],
      creator: '@SkillLinkup',
      site: '@SkillLinkup',
    },
    alternates: {
      canonical: pageUrl,
      languages: { 'en': `${siteUrl}/en/resources/${slug}`, 'nl': `${siteUrl}/nl/resources/${slug}` },
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

export default async function BuildingClientRelationshipsPage({ params }: PageProps) {
  const { locale } = await params;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Building Long-Term Client Relationships on Freelance Platforms',
    description: 'Comprehensive guide on transforming one-time freelance projects into long-term, high-value client partnerships.',
    author: {
      '@type': 'Organization',
      name: 'SkillLinkup',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SkillLinkup',
      logo: {
        '@type': 'ImageObject',
        url: 'https://skilllinkup.com/logo.png',
      },
    },
    datePublished: '2025-01-15',
    dateModified: '2025-01-15',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary via-primary to-accent py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Heart className="w-4 h-4 text-accent" />
                <span className="text-white text-sm font-semibold">Freelance Success Strategy #3</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
                Building Long-Term Client Relationships on Freelance Platforms
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Discover how to transform one-time projects into recurring revenue streams that increase client lifetime value by 400%+ and create predictable monthly income.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={`/${locale}/blog`}
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
                >
                  Explore Advanced Strategies
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
                >
                  Compare Premium Platforms
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
          {/* Introduction */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Most freelancers chase new clients endlessly. Elite freelancers build <strong>relationship systems that generate 70-80% of income from repeat clients</strong>. The economics are compelling: acquiring a new client costs 5-7x more than retaining an existing one, and repeat clients pay 23% more on average.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              This guide reveals the exact retention strategies used by six-figure freelancers to build client relationships that last years, not weeks—transforming platform gigs into stable, high-value partnerships.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border border-gray-200 dark:border-slate-700">
              <div className="text-4xl font-bold text-primary mb-2">70-80%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Revenue from Repeat Clients</div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border border-gray-200 dark:border-slate-700">
              <div className="text-4xl font-bold text-accent mb-2">400%+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Increased Lifetime Value</div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border border-gray-200 dark:border-slate-700">
              <div className="text-4xl font-bold text-secondary mb-2">23%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Higher Rates from Repeats</div>
            </div>
          </div>

          {/* Section 1: Foundation Phase */}
          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  1. The First Project: Setting Relationship Foundations
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Long-term relationships begin with exceptional first impressions. The initial project is your <strong>audition for the ongoing role</strong>. Top freelancers treat every first project as the beginning of a multi-year partnership.
            </p>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              The Onboarding Excellence Framework
            </h3>
            <div className="space-y-4 mb-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Pre-Project Kick-Off Call</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Schedule a 30-minute video call before starting work. This separates you from 90% of freelancers who jump straight into tasks.
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                      <li>• Clarify project requirements and success metrics</li>
                      <li>• Understand broader business context and goals</li>
                      <li>• Establish communication preferences and cadence</li>
                      <li>• Set expectations for deliverables and timeline</li>
                      <li>• Ask about future projects and ongoing needs</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Project Brief Documentation</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Create a detailed project brief summarizing your understanding and approach. Share it within 24 hours of project start.
                    </p>
                    <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4 text-sm">
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        <strong>Include:</strong> Objectives, deliverables, timeline, milestones, communication plan, and success criteria.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        <strong>Benefit:</strong> Shows professionalism and creates alignment that prevents scope creep.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-secondary font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Regular Progress Updates</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Don't wait for clients to ask for updates. Proactive communication builds trust and reduces anxiety.
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                      <li>• Send updates every 2-3 days minimum</li>
                      <li>• Share work-in-progress snapshots or demos</li>
                      <li>• Highlight completed milestones and next steps</li>
                      <li>• Flag potential issues early with solutions</li>
                      <li>• Celebrate wins and positive progress</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Over-Deliver Strategically</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Include 1-2 unexpected value additions that demonstrate your investment in their success:
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                      <li>• Additional optimization beyond scope</li>
                      <li>• Documentation or training resources</li>
                      <li>• Recommendations for future improvements</li>
                      <li>• Relevant industry insights or tools</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-6">
              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Response Time Standard:</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Commit to responding to all client messages within 4 business hours (2 hours ideal). Fast, reliable communication is the #1 factor clients cite when explaining why they work with freelancers long-term. Set expectations upfront and honor them consistently.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section 1 */}
          <div className="bg-gradient-to-br from-accent to-accent-dark rounded-lg shadow-xl p-8 md:p-12 mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                Maximize Your Platform Success
              </h3>
              <p className="text-xl text-white/90 mb-8">
                Different platforms reward client relationships differently. Find platforms with the best repeat-client features and retention incentives.
              </p>
              <Link
                href={`/${locale}/platforms`}
                className="inline-flex items-center gap-2 bg-white text-accent hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
              >
                Compare Premium Platforms
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Section 2: Retention Strategy */}
          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Repeat className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  2. The Retention Sequence: From Project to Partnership
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              The period immediately after project completion is <strong>critical for converting one-time clients into ongoing relationships</strong>. Most freelancers disappear after delivery. Elite freelancers implement a strategic 4-week retention sequence.
            </p>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              The 4-Week Post-Project Sequence
            </h3>

            <div className="space-y-6 mb-6">
              <div className="bg-gradient-to-r from-accent/5 to-transparent dark:from-accent/10 rounded-lg p-6 border-l-4 border-accent">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">W1</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">Week 1: Delivery Excellence</h4>
                </div>
                <div className="ml-13 space-y-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Comprehensive Handoff Package:</strong>
                  </p>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>Complete deliverables with organized file structure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>Detailed documentation and usage instructions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>Video walkthrough explaining key features (3-5 minutes)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>Performance metrics report showing achieved outcomes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>Recommendations for next steps and optimization opportunities</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/5 to-transparent dark:from-primary/10 rounded-lg p-6 border-l-4 border-primary">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">W2</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">Week 2: Check-In & Value Add</h4>
                </div>
                <div className="ml-13">
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Follow up to ensure smooth implementation and add unexpected value:
                  </p>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-sm">
                    <p className="text-gray-600 dark:text-gray-400 italic mb-2">
                      "Hi [Name], wanted to check in and see how the [deliverable] is performing. I've been monitoring [relevant metric] and noticed [specific insight]."
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 italic mb-2">
                      "I created a quick optimization guide for you: [link to resource]"
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 italic">
                      "Any questions or areas where I can provide additional support?"
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-secondary/5 to-transparent dark:from-secondary/10 rounded-lg p-6 border-l-4 border-secondary">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">W3</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">Week 3: Strategic Expansion Offer</h4>
                </div>
                <div className="ml-13">
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Present a logical next step based on their goals and the completed work:
                  </p>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>Natural extension of completed project</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>Addresses identified opportunity or gap</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>Includes loyalty discount or "existing client" pricing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>No pressure—positioned as "thought you'd be interested"</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-accent/5 to-transparent dark:from-accent/10 rounded-lg p-6 border-l-4 border-accent">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">W4</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">Week 4: Long-Term Partnership Invitation</h4>
                </div>
                <div className="ml-13">
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    For high-value clients, propose ongoing collaboration structure:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                      <h5 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">Monthly Retainer</h5>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Fixed monthly hours for ongoing work, priority access, and strategic consultation
                      </p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                      <h5 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">Strategic Advisor</h5>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Quarterly planning sessions plus on-demand project support at preferred rates
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Retainer Systems */}
          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  3. Building Predictable Income Through Retainers
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Retainer relationships represent the <strong>ultimate form of client partnership</strong>—predictable income, premium pricing, and strategic positioning. Top freelancers derive 40-60% of revenue from retainer clients.
            </p>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              The 3-Tier Retainer Framework
            </h3>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-gray-200 dark:border-slate-700">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Support Retainer</h4>
                  <div className="text-2xl font-bold text-accent mb-1">$2K-5K</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">10-20 hrs/month</p>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Ongoing maintenance & updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Email/chat support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Small enhancements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Priority response (24hr)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg p-6 border-2 border-primary relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</span>
                </div>
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Growth Retainer</h4>
                  <div className="text-2xl font-bold text-primary mb-1">$5K-15K</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">20-40 hrs/month</p>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>All Support features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>New feature development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Strategic planning sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Performance optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Priority response (4hr)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-gray-200 dark:border-slate-700">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Partnership</h4>
                  <div className="text-2xl font-bold text-secondary mb-1">$15K+</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">40+ hrs/month</p>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <span>All Growth features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Dedicated capacity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Executive strategy advisor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Team coordination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <span>24/7 emergency access</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-accent/5 border-l-4 border-accent rounded-r-lg p-6">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Retainer Transition Strategy:</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Introduce retainer options after 2-3 successful one-off projects with the same client. Frame it as "making collaboration more efficient" rather than a sales pitch. Offer a 2-month trial retainer at 15% discount to reduce commitment friction.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Conversion Rate:</strong> 35-45% of clients who complete 3+ projects accept retainer proposals when properly positioned.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section 2 */}
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-lg shadow-xl p-8 md:p-12 mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                Master All Client Relationship Strategies
              </h3>
              <p className="text-xl text-white/90 mb-8">
                Get weekly insights on client retention, relationship building, and turning freelance gigs into long-term partnerships.
              </p>
              <Link
                href={`/${locale}/newsletter`}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
              >
                Join Our Newsletter
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Section 4: Client Communication Systems */}
          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  4. Build a Client Relationship Operating System
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Elite freelancers don't rely on memory—they build <strong>systematic relationship touchpoint systems</strong> that ensure no client feels neglected. These automated-yet-personal systems drive 80%+ client retention rates.
            </p>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              The Quarterly Touch System
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Even when not actively working together, maintain quarterly contact with all past clients:
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-4 p-5 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-accent font-bold">Q1</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Industry Insights Share</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Send relevant industry report, trend analysis, or tool recommendation with brief personal note explaining why you thought of them.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">Q2</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Success Check-In</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Ask about their progress on goals discussed during your last project. Show genuine interest in their business outcomes, not just selling your services.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-secondary font-bold">Q3</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Value-Add Resource</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Share custom template, checklist, or mini-audit relevant to their business. Position as "created this and thought you'd find it useful."
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-accent font-bold">Q4</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Strategic Planning Offer</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Reach out about next year planning and offer complimentary strategy session to discuss their goals and how you might support them.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Client Appreciation Moments
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Build emotional connections through thoughtful, personal gestures:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Project Anniversaries:</strong> Send note celebrating 1-year since launching their project with current performance metrics</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Business Milestones:</strong> Congratulate on funding announcements, product launches, or growth achievements you notice</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Holiday Cards:</strong> Send personalized (non-sales) message during holidays referencing specific projects you worked on together</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Referral Thanks:</strong> When clients refer you, send thank-you gift and impact report showing referral outcomes</span>
              </li>
            </ul>
          </section>

          {/* Section 5: Managing Client Portfolio */}
          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  5. Strategic Client Portfolio Management
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Not all client relationships deliver equal value. Elite freelancers strategically manage their <strong>client portfolio mix to maximize lifetime value and minimize risk</strong>.
            </p>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              The Ideal Client Portfolio Composition
            </h3>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-slate-800">
                    <th className="text-left p-4 border border-gray-200 dark:border-slate-700 font-bold text-gray-900 dark:text-white">Client Tier</th>
                    <th className="text-left p-4 border border-gray-200 dark:border-slate-700 font-bold text-gray-900 dark:text-white">% of Revenue</th>
                    <th className="text-left p-4 border border-gray-200 dark:border-slate-700 font-bold text-gray-900 dark:text-white">Target Count</th>
                    <th className="text-left p-4 border border-gray-200 dark:border-slate-700 font-bold text-gray-900 dark:text-white">Engagement Model</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border border-gray-200 dark:border-slate-700">
                      <strong className="text-gray-900 dark:text-white">Anchor Clients</strong>
                      <p className="text-xs text-gray-600 dark:text-gray-400">High-value retainers</p>
                    </td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">40-50%</td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">2-3 clients</td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">Monthly retainer $10K+</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-slate-800">
                    <td className="p-4 border border-gray-200 dark:border-slate-700">
                      <strong className="text-gray-900 dark:text-white">Core Clients</strong>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Regular project work</p>
                    </td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">30-40%</td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">5-8 clients</td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">Quarterly projects</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 dark:border-slate-700">
                      <strong className="text-gray-900 dark:text-white">Growth Clients</strong>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Pipeline development</p>
                    </td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">15-20%</td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">3-5 clients</td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">1-2 projects (testing fit)</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-slate-800">
                    <td className="p-4 border border-gray-200 dark:border-slate-700">
                      <strong className="text-gray-900 dark:text-white">Strategic Reserve</strong>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Fill-in capacity</p>
                    </td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">5-10%</td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">Flexible</td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">One-off premium projects</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Risk Mitigation Strategy:</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Never let one client represent more than 50% of your monthly revenue. If an anchor client reaches this threshold, actively develop 1-2 additional anchor relationships. This diversification protects against sudden contract terminations and gives you negotiating leverage.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Continuously move Growth Clients into Core Clients, and Core Clients into Anchor Clients through strategic upselling and relationship deepening.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-secondary via-primary to-accent rounded-lg shadow-xl p-8 md:p-12 mb-8">
            <div className="max-w-3xl mx-auto text-center">
              <Heart className="w-16 h-16 text-white mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">
                Transform Your Freelance Business with Proven Relationship Strategies
              </h3>
              <p className="text-xl text-white/90 mb-8">
                Access our complete library of retention tactics, client management systems, and growth strategies used by six-figure freelancers.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={`/${locale}/blog`}
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
                >
                  Explore Advanced Strategies
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
                >
                  Compare Premium Platforms
                </Link>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <section className="border-t border-gray-200 dark:border-slate-700 pt-12">
            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              Continue Building Your Success
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href={`/${locale}/resources/how-to-get-5-star-reviews-on-every-freelance-project`} className="group bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 hover:border-accent hover:shadow-lg transition-all">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  Get 5-Star Reviews Every Time
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Proven tactics for perfect client feedback and testimonials
                </p>
              </Link>
              <Link href={`/${locale}/resources/advanced-bidding-strategies-to-win-more-freelance-projects`} className="group bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 hover:border-accent hover:shadow-lg transition-all">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  Advanced Bidding Strategies
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Win more premium projects with strategic proposals
                </p>
              </Link>
              <Link href={`/${locale}/resources/scaling-your-freelance-business-from-solo-to-agency`} className="group bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 hover:border-accent hover:shadow-lg transition-all">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  Scale from Solo to Agency
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Strategic growth beyond solo freelancing
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
