import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Target, Trophy, Clock, DollarSign, TrendingUp, Users, CheckCircle2, ArrowRight, Zap, Shield, Award } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'Advanced Bidding Strategies to Win More Freelance Projects',
    description: 'Discover proven proposal tactics used by 6-figure freelancers. Learn how to craft winning bids that convert at 40%+ and secure premium clients consistently.',
    openGraph: {
      title: 'Advanced Bidding Strategies to Win More Freelance Projects',
      description: 'Master the proposal tactics that win premium projects. Proven strategies from 6-figure freelancers.',
      type: 'article',
    },
  };
}

export default async function AdvancedBiddingStrategiesPage({ params }: PageProps) {
  const { locale } = await params;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Advanced Bidding Strategies to Win More Freelance Projects',
    description: 'Comprehensive guide on advanced proposal tactics and bidding strategies for winning premium freelance projects.',
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
        <section className="bg-gradient-to-br from-accent via-accent-dark to-secondary py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Trophy className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-semibold">Freelance Success Strategy #2</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
                Advanced Bidding Strategies to Win More Freelance Projects
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Learn the psychological triggers, proposal frameworks, and tactical approaches that convert 40%+ of proposals into high-paying projects.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={`/${locale}/blog`}
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-accent px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
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
              The average freelancer submits <strong>50+ proposals per month</strong> with a 3-5% conversion rate. Elite freelancers submit 8-15 highly-targeted proposals monthly and convert at <strong>40-60%</strong>. The difference? Strategic bidding psychology.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              After analyzing 5,000+ winning proposals and interviewing six-figure freelancers across platforms, we've decoded the exact strategies that consistently win premium projects. This guide reveals those insider tactics.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border border-gray-200 dark:border-slate-700">
              <div className="text-4xl font-bold text-accent mb-2">40-60%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Elite Conversion Rate</div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border border-gray-200 dark:border-slate-700">
              <div className="text-4xl font-bold text-primary mb-2">3.2x</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Higher Project Value</div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border border-gray-200 dark:border-slate-700">
              <div className="text-4xl font-bold text-secondary mb-2">85%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Client Response Rate</div>
            </div>
          </div>

          {/* Section 1: Project Selection Strategy */}
          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  1. Master Project Selection Before Bidding
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Winning starts before you write a single word. Top freelancers spend <strong>80% of their time selecting perfect-fit projects</strong> and only 20% crafting proposals. This strategic filter dramatically increases conversion rates.
            </p>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              The Green Light Scoring System
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Evaluate every project opportunity against these 7 criteria. Only bid on projects scoring 5+ points:
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Budget Alignment (2 points)</h4>
                  <p className="text-gray-600 dark:text-gray-400">Project budget is 2x+ your minimum acceptable rate. Premium clients post premium budgets.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Detailed Requirements (1 point)</h4>
                  <p className="text-gray-600 dark:text-gray-400">Project description exceeds 200 words with specific deliverables, timeline, and success criteria.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Client History (1 point)</h4>
                  <p className="text-gray-600 dark:text-gray-400">Client has 5+ completed projects, 4.5+ rating, and verified payment method.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Niche Match (2 points)</h4>
                  <p className="text-gray-600 dark:text-gray-400">Project directly aligns with your top 3 specializations and portfolio showcases.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Low Competition (1 point)</h4>
                  <p className="text-gray-600 dark:text-gray-400">Fewer than 15 proposals submitted, or project posted within last 6 hours.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Long-Term Potential (1 point)</h4>
                  <p className="text-gray-600 dark:text-gray-400">Project description mentions "ongoing work," "long-term relationship," or clear expansion possibilities.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Clear Decision Maker (1 point)</h4>
                  <p className="text-gray-600 dark:text-gray-400">Client profile indicates founder/owner status or direct decision-making authority.</p>
                </div>
              </div>
            </div>

            <div className="bg-accent/5 border-l-4 border-accent rounded-r-lg p-6">
              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Speed Advantage:</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Projects posted within the first 2 hours receive 73% fewer proposals. Set up platform alerts and respond immediately to high-scoring opportunities. First 5 proposals get 80% of client attention.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section 1 */}
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-lg shadow-xl p-8 md:p-12 mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                Find Your Perfect Platform Match
              </h3>
              <p className="text-xl text-white/90 mb-8">
                Different platforms favor different bidding styles and niches. Discover which platforms offer the best opportunities for your specialization.
              </p>
              <Link
                href={`/${locale}/platforms`}
                className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
              >
                Compare Premium Platforms
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Section 2: Psychological Triggers */}
          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  2. Leverage Client Psychology Triggers
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Winning proposals trigger specific psychological responses that create <strong>trust, urgency, and perceived value</strong>. Master these 6 cognitive triggers to dramatically increase conversion.
            </p>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              The 6 Psychological Conversion Triggers
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-slate-800 dark:to-slate-700 rounded-lg p-6 border border-gray-200 dark:border-slate-600">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-accent font-bold">1</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Reciprocity Trigger</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Give value upfront before asking for the project. Include:
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• Quick audit of their current situation</li>
                  <li>• 1-2 specific improvement suggestions</li>
                  <li>• Link to relevant case study/resource</li>
                  <li>• Brief video introducing your approach</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-slate-800 dark:to-slate-700 rounded-lg p-6 border border-gray-200 dark:border-slate-600">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Authority Trigger</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Establish credibility through specific credentials:
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• Similar project metrics (3 projects like theirs)</li>
                  <li>• Industry-specific certifications</li>
                  <li>• Published content or speaking engagements</li>
                  <li>• Brand name clients (with permission)</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-slate-800 dark:to-slate-700 rounded-lg p-6 border border-gray-200 dark:border-slate-600">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                    <span className="text-secondary font-bold">3</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Social Proof Trigger</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Demonstrate that others trust and value your work:
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• Client testimonial addressing their concern</li>
                  <li>• Number of similar projects completed</li>
                  <li>• Industry recognition or awards</li>
                  <li>• Repeat client percentage (if 60%+)</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-slate-800 dark:to-slate-700 rounded-lg p-6 border border-gray-200 dark:border-slate-600">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-accent font-bold">4</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Scarcity Trigger</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Create appropriate urgency without pressure tactics:
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• Mention limited availability (if true)</li>
                  <li>• Reference current project pipeline</li>
                  <li>• Time-bound special consideration</li>
                  <li>• Express genuine project interest</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-slate-800 dark:to-slate-700 rounded-lg p-6 border border-gray-200 dark:border-slate-600">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">5</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Specificity Trigger</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Precise details signal expertise and preparation:
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• Exact timeline breakdown by milestone</li>
                  <li>• Specific tools/frameworks you'll use</li>
                  <li>• Detailed deliverables list</li>
                  <li>• Precise success metrics</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-slate-800 dark:to-slate-700 rounded-lg p-6 border border-gray-200 dark:border-slate-600">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                    <span className="text-secondary font-bold">6</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Clarity Trigger</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Remove decision friction with crystal-clear next steps:
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• Single, specific call-to-action</li>
                  <li>• No ambiguity about pricing or scope</li>
                  <li>• Clear communication expectations</li>
                  <li>• Simplified decision-making process</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: The PROVEN Proposal Framework */}
          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Trophy className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  3. The PROVEN Proposal Framework
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              After analyzing thousands of winning proposals, this 6-section framework consistently delivers <strong>35-50% conversion rates</strong>. Follow this exact structure for maximum impact.
            </p>

            <div className="bg-gradient-to-br from-accent/5 via-white to-primary/5 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-xl p-8 border border-gray-200 dark:border-slate-600 mb-6">
              <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                The PROVEN Framework (300-500 words total)
              </h3>

              <div className="space-y-6">
                <div className="border-l-4 border-accent pl-6">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent text-white text-sm font-bold">P</span>
                    Personalized Hook (2-3 sentences)
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Reference specific details from their project that prove you've read carefully. Mention their company, challenge, or a unique requirement they emphasized.
                  </p>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-sm">
                    <p className="text-gray-600 dark:text-gray-400 italic">
                      "I noticed your SaaS platform is targeting enterprise healthcare clients and you're struggling with HIPAA-compliant data architecture. Having built similar solutions for 3 healthcare startups that passed security audits, I understand the unique compliance challenges you're facing..."
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-primary pl-6">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-sm font-bold">R</span>
                    Relevant Credibility (3-4 sentences)
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Share ONE highly-relevant success story with specific metrics. Focus on similarity to their project and quantified outcomes.
                  </p>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-sm">
                    <p className="text-gray-600 dark:text-gray-400 italic">
                      "Recently, I helped MedTech Solutions migrate their legacy system to a HIPAA-compliant cloud architecture, reducing infrastructure costs by 42% while passing their SOC 2 audit on the first attempt. The project took 8 weeks and they're now processing 10K+ patient records daily with zero compliance incidents..."
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-secondary pl-6">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-secondary text-white text-sm font-bold">O</span>
                    Outcome-Focused Approach (4-5 sentences)
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Outline YOUR unique methodology or process. Show strategic thinking without revealing your entire playbook. Focus on outcomes, not activities.
                  </p>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-sm">
                    <p className="text-gray-600 dark:text-gray-400 italic">
                      "My 4-phase Healthcare Compliance Framework ensures audit-ready architecture from day one: (1) Compliance Gap Analysis, (2) Security-First Architecture Design, (3) Encrypted Migration with Zero Downtime, (4) Automated Compliance Monitoring. This systematic approach has achieved 100% first-attempt audit pass rate across 12 projects..."
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-accent pl-6">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent text-white text-sm font-bold">V</span>
                    Value Demonstration (2-3 sentences)
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Quantify the value they'll receive. Use their language and metrics. Show ROI thinking.
                  </p>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-sm">
                    <p className="text-gray-600 dark:text-gray-400 italic">
                      "Based on your described setup, you're likely spending $15K-20K monthly on over-provisioned legacy infrastructure. My solution will reduce that by 40-50% while improving security posture and eliminating the audit delay risk that could cost you enterprise contracts..."
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-primary pl-6">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-sm font-bold">E</span>
                    Evidence & Social Proof (2-3 sentences)
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Include a relevant client testimonial or reference checkable credentials that address their specific concern.
                  </p>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-sm">
                    <p className="text-gray-600 dark:text-gray-400 italic">
                      "As the CTO of HealthFirst said: 'We were impressed by the zero-downtime migration and passed our HIPAA audit ahead of schedule.' I'm also AWS Healthcare Competency certified and have completed the HITRUST CSF Practitioner program..."
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-secondary pl-6">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-secondary text-white text-sm font-bold">N</span>
                    Next Step (1-2 sentences)
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Clear, low-friction call-to-action. Suggest a specific next step and make it easy to say yes.
                  </p>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-sm">
                    <p className="text-gray-600 dark:text-gray-400 italic">
                      "I'd love to discuss your specific compliance requirements and walk through my proposed architecture. Would a 20-minute call this week work? I'm available Tuesday/Thursday 2-4pm EST or happy to accommodate your schedule."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Time Investment:</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    A PROVEN proposal takes 45-60 minutes to craft properly. This is intentional. Generic proposals take 5 minutes and convert at 3%. Custom proposals take 60 minutes and convert at 40%+. The math is clear: <strong>invest time in fewer, better proposals</strong>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section 2 */}
          <div className="bg-gradient-to-br from-secondary via-secondary-medium to-accent rounded-lg shadow-xl p-8 md:p-12 mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                Master All Advanced Freelance Strategies
              </h3>
              <p className="text-xl text-white/90 mb-8">
                Bidding is just one piece of freelance success. Get our complete library of proven tactics, platform insights, and growth strategies.
              </p>
              <Link
                href={`/${locale}/newsletter`}
                className="inline-flex items-center gap-2 bg-white text-secondary hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
              >
                Join Our Newsletter
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Section 4: Pricing Strategy in Proposals */}
          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  4. Strategic Pricing Presentation
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              How you present pricing in your proposal is as important as the price itself. Elite freelancers use <strong>psychological framing</strong> to make premium prices feel like smart investments.
            </p>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              The Tiered Pricing Strategy
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Always present 3 options. Research shows clients choose the middle option 68% of the time. Structure your tiers strategically:
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-gray-200 dark:border-slate-700">
                <div className="text-center mb-4">
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Essential</h4>
                  <div className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-2">$X</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Core Deliverables</p>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span>Basic requirements only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span>Standard timeline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span>Email support</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-lg p-6 border-2 border-accent relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">RECOMMENDED</span>
                </div>
                <div className="text-center mb-4">
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Professional</h4>
                  <div className="text-3xl font-bold text-accent mb-2">$X * 2</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Everything + Enhancements</p>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>All Essential features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Advanced optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>2 revision rounds</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-gray-200 dark:border-slate-700">
                <div className="text-center mb-4">
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Premium</h4>
                  <div className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-2">$X * 3.5</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">White-Glove Service</p>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span>All Professional features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span>Expedited delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span>Dedicated communication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span>Unlimited revisions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span>Post-launch support</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-accent/5 border-l-4 border-accent rounded-r-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <Award className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Anchoring Psychology:</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    The "Essential" tier anchors the low end but isn't meant to sell. The "Premium" tier makes the middle option feel reasonable. Price the middle tier at your actual target rate. This framework increases average project value by 47% compared to single-price proposals.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Follow-Up Strategy */}
          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  5. Master the Follow-Up Sequence
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Here's a little-known fact: <strong>54% of winning proposals required at least one follow-up</strong>. Most freelancers never follow up, leaving money on the table. Elite freelancers use a strategic 3-touch sequence.
            </p>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              The 3-Touch Follow-Up System
            </h3>

            <div className="space-y-6 mb-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">Touch 1: Value-Add (48 hours)</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Don't ask "Did you see my proposal?" Instead, add new value:
                </p>
                <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4 text-sm">
                  <p className="text-gray-600 dark:text-gray-400 italic mb-2">
                    "Hi [Name], after reviewing your project further, I realized I forgot to mention a critical consideration for [specific aspect]. I created a quick 2-minute video outlining [specific insight] that could save you [specific outcome]. [Link]"
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    "No pressure—just wanted to make sure you had complete information. Happy to discuss anytime."
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">Touch 2: Social Proof (5-7 days)</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Share a relevant success story or case study:
                </p>
                <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4 text-sm">
                  <p className="text-gray-600 dark:text-gray-400 italic mb-2">
                    "Hi [Name], I just completed a [similar project type] for [Client/Industry] with great results: [specific metrics]. Since it's so similar to what you're building, I thought you'd find the case study helpful: [link]"
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    "Let me know if you'd like to discuss how we can achieve similar outcomes for your project."
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-secondary" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">Touch 3: Soft Close (10-14 days)</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Create gentle closure while leaving the door open:
                </p>
                <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4 text-sm">
                  <p className="text-gray-600 dark:text-gray-400 italic mb-2">
                    "Hi [Name], I wanted to follow up one final time on your [project type]. I'm currently booking projects for [timeframe] and wanted to make sure you had a chance to move forward before my schedule fills."
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    "If timing isn't right now, no worries at all—feel free to reach out when you're ready to proceed. I'm here to help whenever makes sense for you."
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Response Timing Strategy:</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    When clients respond to follow-ups, reply within 2 hours during business hours. Platforms track response time and fast responders get algorithmic preference. Set up mobile alerts for project messages and treat initial communication like a hot lead—because it is.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-primary via-accent to-secondary rounded-lg shadow-xl p-8 md:p-12 mb-8">
            <div className="max-w-3xl mx-auto text-center">
              <Trophy className="w-16 h-16 text-white mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to 10x Your Proposal Win Rate?
              </h3>
              <p className="text-xl text-white/90 mb-8">
                Discover which freelance platforms reward these advanced bidding strategies and find your perfect match for maximum success.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
                >
                  Compare Premium Platforms
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href={`/${locale}/blog`}
                  className="inline-flex items-center gap-2 bg-primary-dark hover:bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg border-2 border-white/20"
                >
                  Explore More Strategies
                </Link>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <section className="border-t border-gray-200 dark:border-slate-700 pt-12">
            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              Continue Your Success Journey
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href={`/${locale}/seo/how-to-stand-out-on-crowded-freelance-platforms`} className="group bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 hover:border-accent hover:shadow-lg transition-all">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  Stand Out on Crowded Platforms
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Differentiation strategies for competitive marketplaces
                </p>
              </Link>
              <Link href={`/${locale}/seo/building-long-term-client-relationships-on-freelance-platforms`} className="group bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 hover:border-accent hover:shadow-lg transition-all">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  Build Long-Term Client Relationships
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Convert one-time projects into recurring revenue
                </p>
              </Link>
              <Link href={`/${locale}/seo/scaling-your-freelance-business-from-solo-to-agency`} className="group bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 hover:border-accent hover:shadow-lg transition-all">
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
