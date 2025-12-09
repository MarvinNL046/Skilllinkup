import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const slug = 'top-rated-freelancer-secrets';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/gids/succes-strategieen/${slug}`;

  if (locale === 'nl') {
    return {
      title: "Geheimen van Top-Rated Freelancers: Wat Ze Je Niet Vertellen",
      description: "Ontdek de 7 geheimen die top-rated freelancers gebruiken om 5-sterren reviews te krijgen en premium tarieven te vragen. Inclusief scripts en templates.",
      keywords: "top freelancer tips, 5 sterren reviews, premium tarieven, freelance succes, toptal niveau",
      openGraph: {
        title: "Geheimen van Top-Rated Freelancers: Wat Ze Je Niet Vertellen",
        description: "Ontdek de 7 geheimen die top-rated freelancers gebruiken om 5-sterren reviews te krijgen en premium tarieven te vragen. Inclusief scripts en templates.",
        url: pageUrl,
        siteName: 'SkillLinkup',
        images: [
          {
            url: `${siteUrl}/images/og/gids-og.png`,
            width: 1200,
            height: 630,
            alt: 'Top-Rated Freelancer Secrets - SkillLinkup',
          }
        ],
        locale: 'nl_NL',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: "Geheimen van Top-Rated Freelancers: Wat Ze Je Niet Vertellen",
        description: "Ontdek de 7 geheimen die top-rated freelancers gebruiken om 5-sterren reviews te krijgen en premium tarieven te vragen.",
        images: [`${siteUrl}/images/og/gids-og.png`],
      },
      alternates: {
        canonical: pageUrl,
      },
    };
  }

  return {
    title: "Secrets of Top-Rated Freelancers: What They Don't Tell You",
    description: "Discover the 7 secrets that top-rated freelancers use to earn 5-star reviews and charge premium rates. Includes scripts and templates.",
    keywords: "top freelancer tips, 5 star reviews, premium rates, freelance success, elite freelancing",
    openGraph: {
      title: "Secrets of Top-Rated Freelancers: What They Don't Tell You",
      description: "Discover the 7 secrets that top-rated freelancers use to earn 5-star reviews and charge premium rates. Includes scripts and templates.",
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [
        {
          url: `${siteUrl}/images/og/gids-og.png`,
          width: 1200,
          height: 630,
          alt: 'Top-Rated Freelancer Secrets - SkillLinkup',
        }
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Secrets of Top-Rated Freelancers: What They Don't Tell You",
      description: "Discover the 7 secrets that top-rated freelancers use to earn 5-star reviews and charge premium rates.",
      images: [`${siteUrl}/images/og/gids-og.png`],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function TopRatedFreelancerSecretsPage({ params }: Props) {
  const { locale } = await params;

  const content = locale === 'nl' ? {
    h1: "Geheimen van Top-Rated Freelancers: Wat Ze Je Niet Vertellen",
    intro: "Waarom verdienen sommige freelancers €150+ per uur terwijl anderen vastzit op €35? Het antwoord ligt niet alleen in skills. Top-rated freelancers gebruiken systemen en strategieën die ze zelden delen. Tot nu.",
    cta1: "Find Your Platform",
    cta1Url: "/nl/platforms",
  } : {
    h1: "Secrets of Top-Rated Freelancers: What They Don't Tell You",
    intro: "Why do some freelancers earn $175+ per hour while others are stuck at $40? The answer isn't just about skills. Top-rated freelancers use systems and strategies they rarely share. Until now.",
    cta1: "Find Your Platform",
    cta1Url: "/en/platforms",
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f8f9fb]">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#1e1541] via-[#2a1f5e] to-[#1e1541] text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                {content.h1}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                {content.intro}
              </p>
              <Link
                href={content.cta1Url}
                className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
              >
                {content.cta1} →
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">

          {/* Section 1: The Reality Gap */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              The Reality Gap: Why 5% Earn 80% of Revenue
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-[#64607d] leading-relaxed mb-6">
                On every freelance platform, there's a hidden hierarchy. The top 5% of freelancers earn the majority of revenue. They charge 3-5x more than average. They work with premium clients. And they get 5-star reviews consistently.
              </p>

              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
                  The Top 5% vs. Everyone Else
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-l-4 border-[#22c55e] pl-4">
                    <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                      Top 5% Freelancers
                    </h4>
                    <ul className="space-y-2 text-[#64607d]">
                      <li>• $100-$200+ per hour</li>
                      <li>• 95%+ job success rate</li>
                      <li>• Clients come to them</li>
                      <li>• Choose their projects</li>
                      <li>• Work 20-30 hours/week</li>
                      <li>• $150K-$300K+ annual income</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-[#ef2b70] pl-4">
                    <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                      Average Freelancers
                    </h4>
                    <ul className="space-y-2 text-[#64607d]">
                      <li>• $25-$50 per hour</li>
                      <li>• 70-85% job success rate</li>
                      <li>• Chase every client</li>
                      <li>• Take what they can get</li>
                      <li>• Work 40-60 hours/week</li>
                      <li>• $40K-$80K annual income</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p className="text-[#64607d] leading-relaxed mb-6">
                The difference isn't talent. It's systems. Top-rated freelancers follow a playbook that delivers results consistently. Here's what that playbook looks like.
              </p>
            </div>
          </section>

          {/* Section 2: Secret 1 - First Response Formula */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              Secret #1: The First Response Formula (Win Rate +40%)
            </h2>

            <div className="prose prose-lg max-w-none">
              <p className="text-[#64607d] leading-relaxed mb-6">
                Most freelancers respond to inquiries like this: "Hi, I'm interested in your project. I have 5 years of experience. My rate is $X. Let me know if you want to discuss."
              </p>

              <p className="text-[#64607d] leading-relaxed mb-6">
                <strong className="text-[#1e1541]">This converts at 5-10%.</strong>
              </p>

              <p className="text-[#64607d] leading-relaxed mb-6">
                Top-rated freelancers use the <strong className="text-[#ef2b70]">First Response Formula</strong> that converts at 40-50%:
              </p>

              <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 mb-8 text-white">
                <h3 className="font-heading font-bold text-2xl mb-4">
                  The First Response Formula
                </h3>
                <ol className="space-y-4 text-white/90">
                  <li><strong>1. Acknowledge their pain</strong> - "I see you're struggling with..."</li>
                  <li><strong>2. Show instant understanding</strong> - "This happens when..."</li>
                  <li><strong>3. Provide immediate value</strong> - "Here's what I'd do first..."</li>
                  <li><strong>4. Share relevant proof</strong> - "I solved this for [client], result was..."</li>
                  <li><strong>5. Ask qualifying question</strong> - "Before I prepare a proposal, one question..."</li>
                </ol>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
                  ✅ Example: Web Development Inquiry
                </h3>
                <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm text-[#64607d] whitespace-pre-line mb-4">
{`Hi [Client Name],

I see your current checkout process is losing customers at the payment step - that's costing you real revenue every day.

This typically happens when there's friction between the cart and payment processor. The most common culprits are slow page loads or confusing form validation.

Here's what I'd tackle first: add a progress indicator, enable guest checkout, and implement autofill for shipping. In a similar project for an ecommerce client, these three changes increased conversions by 23%.

Before I prepare a detailed proposal - are you seeing the biggest drop-off on mobile or desktop?

Looking forward to helping you recover those lost sales.

Best,
[Your Name]`}
                </div>
                <p className="text-[#64607d] text-sm">
                  <strong className="text-[#1e1541]">Why this works:</strong> You've shown expertise, provided value immediately, proven results, and demonstrated you understand their specific problem.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section 1 */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Find Clients Who Pay Premium Rates
              </h3>
              <p className="text-xl mb-6 text-white/90">
                Compare platforms to find where top-paying clients hang out
              </p>
              <Link
                href={locale === 'nl' ? '/nl/platforms' : '/en/platforms'}
                className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Compare Platforms →
              </Link>
            </div>
          </section>

          {/* Section 3: Secret 2 - The Expectation Management System */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              Secret #2: The Expectation Management System
            </h2>

            <div className="prose prose-lg max-w-none">
              <p className="text-[#64607d] leading-relaxed mb-6">
                Bad reviews don't come from bad work. They come from <strong className="text-[#1e1541]">mismanaged expectations</strong>.
              </p>

              <p className="text-[#64607d] leading-relaxed mb-6">
                Top-rated freelancers set crystal-clear expectations at three critical moments:
              </p>

              <div className="space-y-6 mb-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-start">
                    <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                        Before the Project: The Welcome Packet
                      </h3>
                      <p className="text-[#64607d] mb-4">
                        Send a project kickoff document that covers:
                      </p>
                      <ul className="space-y-2 text-[#64607d]">
                        <li>• Communication protocol (response times, preferred channels)</li>
                        <li>• Revision policy (how many rounds, what qualifies as scope creep)</li>
                        <li>• Timeline with milestones</li>
                        <li>• Payment schedule</li>
                        <li>• What you need from them (and by when)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-start">
                    <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                        During the Project: The Weekly Update
                      </h3>
                      <p className="text-[#64607d] mb-4">
                        Every Friday, send a status email with this format:
                      </p>
                      <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-[#64607d]">
                        <strong>Completed this week:</strong> [List with links]<br/>
                        <strong>In progress:</strong> [Current tasks]<br/>
                        <strong>Next week:</strong> [Upcoming deliverables]<br/>
                        <strong>Blockers:</strong> [What you need from client]<br/>
                        <strong>On track for:</strong> [Milestone date]
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-start">
                    <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                        After Delivery: The Review Request Script
                      </h3>
                      <p className="text-[#64607d] mb-4">
                        Don't just ask "Can you leave a review?" Use this script:
                      </p>
                      <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-[#64607d] whitespace-pre-line">
{`Hi [Client],

Now that we've wrapped up [project], I'd love your feedback on two things:

1. What worked well that we should do again?
2. What could I improve for next time?

If you're happy with the results, would you mind sharing your experience in a review? It helps me attract more clients like you.

Either way, thank you for trusting me with this project!

Best,
[Your Name]`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Secret 3 - The Premium Positioning Framework */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              Secret #3: The Premium Positioning Framework
            </h2>

            <div className="prose prose-lg max-w-none">
              <p className="text-[#64607d] leading-relaxed mb-6">
                Top-rated freelancers don't compete on price. They position themselves as specialists who solve specific, expensive problems.
              </p>

              <div className="bg-gradient-to-br from-[#1e1541] to-[#2a1f5e] rounded-lg shadow-xl p-8 mb-8 text-white">
                <h3 className="font-heading font-bold text-2xl mb-6">
                  The Positioning Formula
                </h3>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 space-y-4">
                  <p className="text-white/90">
                    "I help [specific target client] achieve [specific outcome] without [common pain point]"
                  </p>
                  <div className="border-t border-white/20 pt-4">
                    <p className="text-sm text-white/70 mb-2">Examples:</p>
                    <ul className="space-y-2 text-white/90 text-sm">
                      <li>• "I help SaaS companies increase trial-to-paid conversion by 30%+ without redesigning their entire product"</li>
                      <li>• "I help ecommerce brands reduce cart abandonment by 25%+ without slashing prices"</li>
                      <li>• "I help B2B companies generate qualified leads without cold calling"</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
                  How to Build Your Positioning
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
                      Step 1: Identify Your Most Valuable Project
                    </h4>
                    <p className="text-[#64607d]">
                      Look at your past work. Which project delivered the highest ROI for the client? That's your positioning anchor.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
                      Step 2: Define the Before/After
                    </h4>
                    <ul className="space-y-2 text-[#64607d]">
                      <li>• <strong>Before:</strong> What problem did they have?</li>
                      <li>• <strong>After:</strong> What measurable result did you deliver?</li>
                      <li>• <strong>Bridge:</strong> What specific method did you use?</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
                      Step 3: Package It as Your Signature System
                    </h4>
                    <p className="text-[#64607d] mb-3">
                      Give your process a name. Examples:
                    </p>
                    <ul className="space-y-2 text-[#64607d]">
                      <li>• "The Conversion Acceleration Framework"</li>
                      <li>• "The Retention Flywheel System"</li>
                      <li>• "The Premium Lead Generation Method"</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Secret 4-7 Quick Overview */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              Secrets #4-7: The Full Playbook
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                  Secret #4: The Scarcity Lever
                </h3>
                <p className="text-[#64607d] mb-4">
                  Top freelancers limit their availability. "I only take 3 clients per quarter" or "My next opening is in 2 weeks" creates urgency and positions you as in-demand.
                </p>
                <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-4 rounded-r-lg">
                  <p className="text-sm text-[#64607d]">
                    <strong className="text-[#1e1541]">Tactic:</strong> Block out calendar slots even if you're available. It forces clients to commit faster.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                  Secret #5: The Proof Portfolio
                </h3>
                <p className="text-[#64607d] mb-4">
                  Don't show all your work. Show 3-5 case studies with specific metrics: "Increased revenue by $47K in 90 days" beats "Built a website."
                </p>
                <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-4 rounded-r-lg">
                  <p className="text-sm text-[#64607d]">
                    <strong className="text-[#1e1541]">Formula:</strong> Problem → Solution → Result (with numbers)
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                  Secret #6: The Speed Advantage
                </h3>
                <p className="text-[#64607d] mb-4">
                  Respond to inquiries within 30 minutes (not 24 hours). First responder wins 40% more often. Set up mobile alerts for new messages.
                </p>
                <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-4 rounded-r-lg">
                  <p className="text-sm text-[#64607d]">
                    <strong className="text-[#1e1541]">Tool:</strong> Use platform mobile apps with push notifications enabled
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                  Secret #7: The Referral Machine
                </h3>
                <p className="text-[#64607d] mb-4">
                  After delivering great work, ask: "Who else do you know facing similar challenges?" 60% of top freelancers' revenue comes from referrals.
                </p>
                <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-4 rounded-r-lg">
                  <p className="text-sm text-[#64607d]">
                    <strong className="text-[#1e1541]">Incentive:</strong> Offer 10-15% discount on their next project for successful referrals
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section 2 */}
          <section className="mb-16">
            <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Learn From Real Success Stories
              </h3>
              <p className="text-xl mb-6 text-gray-300">
                Read case studies of freelancers who went from $40/hr to $150+/hr
              </p>
              <Link
                href={locale === 'nl' ? '/nl/blog' : '/en/blog'}
                className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Read Success Stories →
              </Link>
            </div>
          </section>

          {/* Section 6: Implementation Plan */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              Your 30-Day Implementation Plan
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4 flex items-center">
                  <span className="bg-[#ef2b70] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 text-sm">
                    Week 1
                  </span>
                  Build Your Foundation
                </h3>
                <ul className="space-y-3 text-[#64607d] ml-13">
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span>Write your positioning statement using the formula above</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span>Create 3 case studies with specific metrics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span>Set up mobile alerts for platform messages</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4 flex items-center">
                  <span className="bg-[#ef2b70] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 text-sm">
                    Week 2
                  </span>
                  Master Your First Response
                </h3>
                <ul className="space-y-3 text-[#64607d] ml-13">
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span>Write 5 first-response templates for common inquiries</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span>Practice responding within 30 minutes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span>Track your response time and win rate</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4 flex items-center">
                  <span className="bg-[#ef2b70] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 text-sm">
                    Week 3
                  </span>
                  Implement Expectation Management
                </h3>
                <ul className="space-y-3 text-[#64607d] ml-13">
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span>Create your project welcome packet template</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span>Set up Friday update email template</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span>Prepare review request scripts</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4 flex items-center">
                  <span className="bg-[#ef2b70] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 text-sm">
                    Week 4
                  </span>
                  Activate Premium Positioning
                </h3>
                <ul className="space-y-3 text-[#64607d] ml-13">
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span>Update profile with new positioning statement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span>Raise rates by 20-30% for new clients</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span>Implement scarcity messaging in proposals</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Get Weekly Success Tips
              </h3>
              <p className="text-xl mb-6 text-white/90">
                Join 10,000+ freelancers getting strategies to increase rates and win premium clients
              </p>
              <Link
                href={locale === 'nl' ? '/nl/newsletter' : '/en/newsletter'}
                className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Get Free Success Guide →
              </Link>
            </div>
          </section>

        </article>

        {/* Schema.org Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Article", "HowTo"],
              "headline": locale === 'nl'
                ? "Geheimen van Top-Rated Freelancers: Wat Ze Je Niet Vertellen"
                : "Secrets of Top-Rated Freelancers: What They Don't Tell You",
              "description": locale === 'nl'
                ? "Ontdek de 7 geheimen die top-rated freelancers gebruiken om 5-sterren reviews te krijgen en premium tarieven te vragen."
                : "Discover the 7 secrets that top-rated freelancers use to earn 5-star reviews and charge premium rates.",
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
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/succes-strategieen/top-rated-freelancer-secrets`
              },
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Master the First Response Formula",
                  "text": "Use the 5-part formula: acknowledge pain, show understanding, provide value, share proof, ask qualifying question"
                },
                {
                  "@type": "HowToStep",
                  "name": "Implement Expectation Management",
                  "text": "Set clear expectations with welcome packet, weekly updates, and review request scripts"
                },
                {
                  "@type": "HowToStep",
                  "name": "Build Premium Positioning",
                  "text": "Position yourself as a specialist solving specific problems with your signature system"
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
                  "name": locale === 'nl' ? "Top-Rated Freelancer Geheimen" : "Top-Rated Freelancer Secrets",
                  "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/succes-strategieen/top-rated-freelancer-secrets`
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
