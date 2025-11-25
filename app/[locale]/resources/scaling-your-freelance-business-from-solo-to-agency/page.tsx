import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Rocket, TrendingUp, Users, DollarSign, Target, CheckCircle2, ArrowRight, Zap, Award, BarChart3, Shield } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'Scaling Your Freelance Business: From Solo to Agency',
    description: 'Strategic roadmap for scaling beyond solo freelancing. Learn how to build systems, hire strategically, and grow from $100K to $1M+ in annual revenue.',
    keywords: 'scale freelance business, freelance to agency, grow freelance income, hire freelance team, freelance business growth',
    openGraph: {
      title: 'Scaling Your Freelance Business: From Solo to Agency',
      description: 'Master the transition from solo freelancer to agency owner. Proven strategies for $1M+ growth.',
      type: 'article',
    },
  };
}

export default async function ScalingFreelanceBusinessPage({ params }: PageProps) {
  const { locale } = await params;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Scaling Your Freelance Business: From Solo to Agency',
    description: 'Comprehensive guide on strategically scaling a freelance business from solo operation to full-service agency.',
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
        <section className="bg-gradient-to-br from-primary via-accent to-secondary py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Rocket className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-semibold">Freelance Success Strategy #5</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
                Scaling Your Freelance Business: From Solo to Agency
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Master the strategic transition from solo freelancer to agency owner. Learn the systems, hiring strategies, and growth frameworks that enable $100K to $1M+ revenue scaling.
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
                  className="inline-flex items-center gap-2 bg-accent-dark hover:bg-accent text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg border-2 border-white/20"
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
              Every successful freelancer eventually hits the <strong>"solo ceiling"</strong>—the revenue limit imposed by trading time for money. While elite solo freelancers can reach $150-250K annually, breaking past $500K requires fundamental business transformation: building systems, hiring talent, and transitioning from service provider to agency owner.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              This guide provides the strategic roadmap for navigating this transition successfully, based on case studies of freelancers who've scaled to $1M+ agencies while maintaining profitability, client satisfaction, and personal freedom.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border border-gray-200 dark:border-slate-700">
              <div className="text-4xl font-bold text-primary mb-2">$150-250K</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Solo Freelancer Revenue Ceiling</div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border border-gray-200 dark:border-slate-700">
              <div className="text-4xl font-bold text-accent mb-2">$1M+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Agency Revenue Potential</div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border border-gray-200 dark:border-slate-700">
              <div className="text-4xl font-bold text-secondary mb-2">18-24</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Months for Full Transition</div>
            </div>
          </div>

          {/* Section 1: Readiness Assessment */}
          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  1. Assess Your Scaling Readiness
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Scaling prematurely destroys more freelance businesses than staying too long. Before transitioning to agency model, ensure you've met these <strong>critical readiness benchmarks</strong> that predict successful scaling.
            </p>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              The Scaling Readiness Scorecard
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Score yourself honestly on these 8 factors (1-10 scale). Total score 60+ indicates readiness:
            </p>

            <div className="space-y-4 mb-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-gray-200 dark:border-slate-700">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-5 h-5 text-accent" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Consistent $10K+ Monthly Revenue</h4>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">Score: ___/10</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-11">
                  You've maintained $10K+ monthly revenue for 6+ consecutive months with predictable client pipeline. This proves market demand and provides cash flow cushion for hiring.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-gray-200 dark:border-slate-700">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Turning Away Work Regularly</h4>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">Score: ___/10</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-11">
                  You decline 3-5 projects monthly due to capacity constraints. This indicates demand exceeds supply—the perfect scaling signal.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-gray-200 dark:border-slate-700">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-secondary" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Documented Systems & Processes</h4>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">Score: ___/10</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-11">
                  You have written SOPs for client onboarding, project delivery, quality control, and communication. Someone could replicate your service using your documentation.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-gray-200 dark:border-slate-700">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-accent" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Repeatable Service Offering</h4>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">Score: ___/10</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-11">
                  You deliver similar services repeatedly, not highly customized one-offs. Repeatable services are scalable; bespoke work isn't.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-gray-200 dark:border-slate-700">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Strong Client Retention (60%+)</h4>
                  </div>
                  <span className="text-xs text-gray-500 dark-gray-500 whitespace-nowrap">Score: ___/10</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-11">
                  60%+ of clients return for additional projects or ongoing work. High retention indicates quality delivery that's transferable to team.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-gray-200 dark:border-slate-700">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-5 h-5 text-secondary" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Healthy Profit Margins (40%+)</h4>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">Score: ___/10</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-11">
                  Your net profit margin exceeds 40%. Scaling initially reduces margins due to hiring costs—you need cushion to absorb this.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-gray-200 dark:border-slate-700">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Rocket className="w-5 h-5 text-accent" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Leadership Mindset Shift</h4>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">Score: ___/10</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-11">
                  You're excited about building systems and leading people, not just doing client work. Scaling requires working ON the business, not just IN it.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-gray-200 dark:border-slate-700">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Financial Runway (6+ Months)</h4>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">Score: ___/10</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-11">
                  You have 6+ months of operating expenses saved. Scaling is investment-heavy initially—you need financial buffer for lean periods.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-lg p-6 border border-primary/20">
              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Scoring Interpretation:</h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li><strong>70-80:</strong> Excellent scaling readiness—proceed with confidence</li>
                    <li><strong>60-69:</strong> Good foundation—address weak areas before scaling</li>
                    <li><strong>50-59:</strong> Premature—strengthen fundamentals for 6-12 months</li>
                    <li><strong>&lt;50:</strong> Too early—focus on solo growth and system building</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section 1 */}
          <div className="bg-gradient-to-br from-accent to-accent-dark rounded-lg shadow-xl p-8 md:p-12 mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                Find Platforms That Support Scaling
              </h3>
              <p className="text-xl text-white/90 mb-8">
                Some freelance platforms make agency operations easier with team accounts, white-labeling, and enterprise features. Discover which platforms best support your growth.
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

          {/* Section 2: The Scaling Roadmap */}
          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  2. The 18-Month Scaling Roadmap
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Successful scaling follows a <strong>predictable sequence</strong> that balances growth with stability. Here's the proven 18-month roadmap that minimizes risk while maximizing growth velocity.
            </p>

            <div className="space-y-6 mb-6">
              <div className="bg-gradient-to-r from-accent/5 to-transparent dark:from-accent/10 rounded-lg p-6 border-l-4 border-accent">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">Q1-Q2</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">Systematize & Document (Months 1-6)</h3>
                </div>
                <div className="ml-15 space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">Goal: Create transferable systems before hiring</p>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Month 1-2:</strong> Document every process (client onboarding, project delivery, quality control, communication protocols)
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Month 3-4:</strong> Build templates, checklists, and automation for repetitive tasks
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Month 5-6:</strong> Standardize service offerings into packages with clear scopes and pricing
                      </div>
                    </li>
                  </ul>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-sm">
                    <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Key Deliverable:</strong> Operations Manual</p>
                    <p className="text-gray-600 dark:text-gray-400">Complete documentation that enables someone with 70% of your skills to deliver 80% of your quality.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/5 to-transparent dark:from-primary/10 rounded-lg p-6 border-l-4 border-primary">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">Q3</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">First Hire & Test (Months 7-9)</h3>
                </div>
                <div className="ml-15 space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">Goal: Validate systems with first team member</p>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Month 7:</strong> Hire contractor/part-time specialist for one specific service component (not generalist)
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Month 8:</strong> Shadow their work closely, refine documentation based on gaps discovered
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Month 9:</strong> Gradually reduce oversight, measure quality and client satisfaction
                      </div>
                    </li>
                  </ul>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-sm">
                    <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Success Metric:</strong> 80%+ Quality Parity</p>
                    <p className="text-gray-600 dark:text-gray-400">Client satisfaction scores remain within 10% of your solo work. If not achieved, refine systems before expanding.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-secondary/5 to-transparent dark:from-secondary/10 rounded-lg p-6 border-l-4 border-secondary">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">Q4</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">Strategic Growth (Months 10-12)</h3>
                </div>
                <div className="ml-15 space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">Goal: Scale capacity and revenue</p>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Month 10:</strong> Add 2nd team member in complementary specialty, implement project management system
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Month 11:</strong> Increase prices 15-25% (team enables higher-value offerings)
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Month 12:</strong> Target 30-50% revenue increase from capacity expansion
                      </div>
                    </li>
                  </ul>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-sm">
                    <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Critical Checkpoint:</strong> Profitability Check</p>
                    <p className="text-gray-600 dark:text-gray-400">Ensure net profit margin remains 25%+ after team costs. If below 20%, pause hiring and optimize operations.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-accent/5 to-transparent dark:from-accent/10 rounded-lg p-6 border-l-4 border-accent">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">Q5-Q6</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">Leadership Transition (Months 13-18)</h3>
                </div>
                <div className="ml-15 space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">Goal: Shift from doer to leader</p>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Month 13-14:</strong> Hire operations manager or promote senior team member to coordinator role
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Month 15-16:</strong> Reduce client delivery involvement to 30% of time, focus on strategy/sales/leadership
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Month 17-18:</strong> Build 3-5 person specialized team, establish agency brand separate from personal brand
                      </div>
                    </li>
                  </ul>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-sm">
                    <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Target State:</strong> True Agency Model</p>
                    <p className="text-gray-600 dark:text-gray-400">You spend 70% of time on business development, leadership, and strategy. Team handles 90%+ of execution.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Hiring Strategy */}
          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  3. Strategic Hiring: Who, When, How
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Hiring decisions make or break scaling efforts. <strong>Hire too fast and cash flow suffers; hire too slow and you miss growth opportunities.</strong> Elite agency builders follow this strategic hiring sequence.
            </p>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              The Optimal Hiring Sequence
            </h3>

            <div className="space-y-6 mb-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-accent">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">1</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Specialist Contractor (Your Clone)</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">When to Hire:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Turning away 3-5 projects/month in your primary service</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">What They Do:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Execute your core service following your systems/templates</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Structure:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Project-based contractor, 10-20 hrs/week initially</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Success Metric:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Client satisfaction scores within 10% of yours</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-primary">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">2</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Complementary Specialist</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">When to Hire:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Frequently outsourcing or declining adjacent services</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">What They Do:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Add complementary skill that expands service offerings</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Example:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Designer hires developer, writer hires designer</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Benefit:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Enables full-service offerings, increases project value</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-secondary">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">3</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Junior Team Member (Leverage Hire)</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">When to Hire:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Spending 15+ hours/week on repetitive, teachable tasks</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">What They Do:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Handle research, admin, quality checks, client communication</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Structure:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Part-time VA or junior role, $15-30/hr</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">ROI:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Frees 10-15 hrs/week for high-value activities</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-accent">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">4</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Operations Manager / Coordinator</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">When to Hire:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Managing 3-5 team members and juggling projects becomes overwhelming</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">What They Do:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Project coordination, quality control, team communication, client updates</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Critical Role:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">This hire enables your CEO transition</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Investment:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">$40-70K/year or senior contractor 20-30 hrs/week</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-primary">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">5</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Sales / Business Development Lead</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">When to Hire:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Capacity exists but pipeline is inconsistent, or you're bottleneck in sales</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">What They Do:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Lead generation, proposal writing, client calls, account management</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Structure:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Base + commission structure (60/40 or 70/30 split)</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Game-Changer:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Transforms you from freelancer to true business owner</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-6">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Hiring Anti-Patterns to Avoid:</h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <li>• <strong>Hiring generalists first:</strong> Jack-of-all-trades can't match your specialist quality</li>
                    <li>• <strong>Hiring friends/family:</strong> Personal relationships complicate performance management</li>
                    <li>• <strong>Full-time before testing:</strong> Start contractor/part-time, earn full-time commitment</li>
                    <li>• <strong>Hiring for current needs:</strong> Hire for 6-12 months ahead to avoid constant recruiting</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section 2 */}
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-lg shadow-xl p-8 md:p-12 mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                Master the Complete Scaling Journey
              </h3>
              <p className="text-xl text-white/90 mb-8">
                Get weekly insights on agency building, team management, systems optimization, and strategic growth delivered to your inbox.
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

          {/* Section 4: Systems & Tools */}
          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  4. Essential Systems & Tech Stack
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Solo freelancers can get by with basic tools. Agencies need <strong>integrated systems that enable coordination, quality control, and scalability</strong>. Here's the minimum viable tech stack for agency operations.
            </p>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              The Agency Tech Stack
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  </div>
                  Project Management
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <strong>Tool:</strong> ClickUp, Asana, or Monday.com
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2"><strong>Essential Features:</strong></p>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Task assignment and tracking across team</li>
                  <li>• Project templates for repeatable workflows</li>
                  <li>• Client collaboration portals</li>
                  <li>• Time tracking integration</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  Communication Hub
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <strong>Tool:</strong> Slack or Microsoft Teams
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2"><strong>Essential Features:</strong></p>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Organized channels by project/client</li>
                  <li>• File sharing and search</li>
                  <li>• Integration with project management</li>
                  <li>• Video calling capabilities</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                  </div>
                  Documentation & SOPs
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <strong>Tool:</strong> Notion, Confluence, or Google Workspace
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2"><strong>Essential Features:</strong></p>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Centralized knowledge base</li>
                  <li>• Template libraries</li>
                  <li>• Version control and collaboration</li>
                  <li>• Search functionality</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  </div>
                  Client Portal / CRM
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <strong>Tool:</strong> HubSpot, Pipedrive, or Dubsado
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2"><strong>Essential Features:</strong></p>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Client communication history</li>
                  <li>• Proposal and contract management</li>
                  <li>• Invoice and payment tracking</li>
                  <li>• Sales pipeline visualization</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  Time & Resource Tracking
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <strong>Tool:</strong> Harvest, Toggl, or Clockify
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2"><strong>Essential Features:</strong></p>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Team time tracking by project</li>
                  <li>• Profitability analysis</li>
                  <li>• Capacity planning</li>
                  <li>• Billable vs. non-billable reporting</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                  </div>
                  Financial Management
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <strong>Tool:</strong> QuickBooks, Xero, or FreshBooks
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2"><strong>Essential Features:</strong></p>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Automated invoicing and payments</li>
                  <li>• Expense tracking and categorization</li>
                  <li>• Profit & loss reporting</li>
                  <li>• Tax preparation support</li>
                </ul>
              </div>
            </div>

            <div className="bg-accent/5 border-l-4 border-accent rounded-r-lg p-6">
              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Integration is Key:</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Choose tools that integrate with each other to avoid data silos and manual work. Your tech stack should save time, not create administrative overhead.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Budget Guideline:</strong> Allocate $200-500/month for software stack when starting, scaling to $1K-2K/month as team grows to 5-10 people.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Common Scaling Pitfalls */}
          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  5. Avoiding the 7 Deadly Scaling Mistakes
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Most freelance-to-agency transitions fail due to <strong>predictable mistakes</strong>. Learn from others' expensive lessons and avoid these common scaling pitfalls.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-4 p-5 bg-white dark:bg-slate-800 rounded-lg border-l-4 border-red-500">
                <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-red-500 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Scaling Before Systems</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Hiring team without documented processes creates chaos. You become bottleneck answering constant questions.
                  </p>
                  <p className="text-xs text-accent font-semibold">Solution: Document everything BEFORE first hire. If you can't explain it in writing, you can't teach it.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white dark:bg-slate-800 rounded-lg border-l-4 border-red-500">
                <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-red-500 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Hiring Too Fast</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Adding multiple team members simultaneously overwhelms management capacity and depletes cash reserves.
                  </p>
                  <p className="text-xs text-accent font-semibold">Solution: One hire at a time, prove profitability for 2-3 months before next hire.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white dark:bg-slate-800 rounded-lg border-l-4 border-red-500">
                <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-red-500 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Staying in Execution Mode</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Continuing to do all client work yourself defeats scaling purpose. You're paying team while still working 60-hour weeks.
                  </p>
                  <p className="text-xs text-accent font-semibold">Solution: Deliberately extract yourself from delivery. Set target: 50% time on execution by Month 6, 30% by Month 12.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white dark:bg-slate-800 rounded-lg border-l-4 border-red-500">
                <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-red-500 font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Ignoring Numbers</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Not tracking project profitability, utilization rates, or true costs leads to unprofitable growth.
                  </p>
                  <p className="text-xs text-accent font-semibold">Solution: Weekly financial review. Know exact: revenue, costs, profit margin, cash runway for every project and overall.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white dark:bg-slate-800 rounded-lg border-l-4 border-red-500">
                <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-red-500 font-bold">5</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Keeping Solo Pricing</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Maintaining freelancer rates while paying team salaries destroys margins and creates unsustainable business.
                  </p>
                  <p className="text-xs text-accent font-semibold">Solution: Increase prices 25-40% when transitioning to agency. Position as "team capacity" and "expanded capabilities."</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white dark:bg-slate-800 rounded-lg border-l-4 border-red-500">
                <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-red-500 font-bold">6</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Poor Communication Structure</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Team constantly interrupting you, or clients frustrated by lack of coordination signals broken communication systems.
                  </p>
                  <p className="text-xs text-accent font-semibold">Solution: Implement structured communication: daily standups, weekly 1-on-1s, project channels, response time expectations.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white dark:bg-slate-800 rounded-lg border-l-4 border-red-500">
                <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-red-500 font-bold">7</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Neglecting Client Experience</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Focus on internal operations causes client satisfaction to slip. Reviews decline, retention drops, referrals dry up.
                  </p>
                  <p className="text-xs text-accent font-semibold">Solution: Maintain personal touch at key moments. You handle sales calls, kick-offs, and check-ins even if team delivers.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-secondary via-accent to-primary rounded-lg shadow-xl p-8 md:p-12 mb-8">
            <div className="max-w-3xl mx-auto text-center">
              <Rocket className="w-16 h-16 text-white mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">
                Launch Your Freelance-to-Agency Journey
              </h3>
              <p className="text-xl text-white/90 mb-8">
                Access our complete library of scaling strategies, hiring frameworks, system templates, and growth tactics from freelancers who've successfully built $1M+ agencies.
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
                  className="inline-flex items-center gap-2 bg-primary-dark hover:bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg border-2 border-white/20"
                >
                  Compare Premium Platforms
                </Link>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <section className="border-t border-gray-200 dark:border-slate-700 pt-12">
            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              Complete Your Freelance Mastery
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href={`/${locale}/resources/building-long-term-client-relationships-on-freelance-platforms`} className="group bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 hover:border-accent hover:shadow-lg transition-all">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  Build Long-Term Client Relationships
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Foundation for sustainable agency growth
                </p>
              </Link>
              <Link href={`/${locale}/resources/how-to-get-5-star-reviews-on-every-freelance-project`} className="group bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 hover:border-accent hover:shadow-lg transition-all">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  Get 5-Star Reviews Every Time
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Reputation that supports premium agency pricing
                </p>
              </Link>
              <Link href={`/${locale}/resources/advanced-bidding-strategies-to-win-more-freelance-projects`} className="group bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 hover:border-accent hover:shadow-lg transition-all">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  Advanced Bidding Strategies
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Win high-value projects for agency pipeline
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
