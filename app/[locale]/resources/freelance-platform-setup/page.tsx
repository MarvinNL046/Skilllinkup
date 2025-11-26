import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;

  const slug = 'freelance-platform-setup';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

  return {
    title: "Freelance Platform Onboarding: Complete Step-by-Step Setup",
    description: "Master platform setup for Upwork, Fiverr, Freelancer, and more. Complete onboarding guide with screenshots, best practices, and optimization tips for beginners.",
    keywords: "freelance platform setup, upwork account setup, fiverr onboarding, freelance profile creation, platform registration guide",
    openGraph: {
      title: "Freelance Platform Onboarding: Complete Step-by-Step Setup",
      description: "Master platform setup for Upwork, Fiverr, Freelancer, and more. Complete onboarding guide with screenshots, best practices, and optimization tips for beginners.",
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [
        {
          url: `${siteUrl}/images/og/resources-og.png`,
          width: 1200,
          height: 630,
          alt: 'Freelance Platform Onboarding: Complete Step-by-Step Setup',
        }
      ],
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Freelance Platform Onboarding: Complete Step-by-Step Setup",
      description: "Master platform setup for Upwork, Fiverr, Freelancer, and more. Complete onboarding guide with screenshots, best practices, and optimization tips for beginners.",
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

export default async function FreelancePlatformSetupPage({ params }: PageProps) {
  const { locale } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Freelance Platform Onboarding: Step-by-Step Setup Guide",
    "description": "Complete guide to setting up profiles on major freelance platforms including Upwork, Fiverr, and Freelancer with optimization tips.",
    "totalTime": "PT3H",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Create Account",
        "text": "Sign up with professional email and verify your account through email confirmation."
      },
      {
        "@type": "HowToStep",
        "name": "Complete Profile",
        "text": "Add professional photo, compelling headline, detailed bio, and portfolio samples."
      },
      {
        "@type": "HowToStep",
        "name": "Set Up Payment",
        "text": "Configure payment methods, set your rates, and understand platform fee structures."
      },
      {
        "@type": "HowToStep",
        "name": "Optimize for Search",
        "text": "Add relevant skills, take platform tests, and optimize keywords for client search visibility."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary/10 via-white to-accent/10 dark:from-secondary dark:via-gray-900 dark:to-gray-800 py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 dark:bg-secondary/30 text-secondary dark:text-accent text-sm font-semibold mb-6">
                <span className="text-xl">⚙️</span>
                <span>Platform Setup Guide</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                Freelance Platform Onboarding: Step-by-Step Setup Guide
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Get your freelance profiles set up correctly from day one. Complete walkthroughs for Upwork, Fiverr, Freelancer, and other major platforms with optimization tips that maximize your visibility.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-secondary text-white font-heading font-semibold hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl"
                >
                  Compare All Platforms
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Overview */}
        <section className="py-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 text-center">
                Choosing Your First Platform
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center">
                Each platform has unique strengths. Here&apos;s which to start with based on your skill:
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border border-primary/20 dark:border-primary/30">
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">Upwork</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">Best for: All skills</div>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Largest client base</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Long-term projects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>10% platform fee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Escrow protection</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border border-accent/20 dark:border-accent/30">
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">Fiverr</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">Best for: Creative services</div>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Package-based pricing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Clients come to you</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>20% platform fee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Fast payment release</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-xl p-6 border border-secondary/20 dark:border-secondary/30">
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">Freelancer.com</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">Best for: International clients</div>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Global reach</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Contest features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>10% platform fee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Milestone payments</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href={`/${locale}/platforms`}
                  className="text-primary hover:text-primary/80 font-semibold underline decoration-2 decoration-primary/30 hover:decoration-primary"
                >
                  See detailed comparison of all platforms →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              {/* Universal Setup Steps */}
              <div className="mb-16">
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="text-4xl">🎯</span>
                  Universal Setup Steps (All Platforms)
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Before diving into platform-specific instructions, these steps apply to virtually every freelance marketplace. Master these fundamentals first:
                </p>

                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                    <div className="flex items-start gap-4 mb-4">
                      <span className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">1</span>
                      <div className="flex-1">
                        <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">Create Professional Email</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">
                          Use a professional email address, not casual ones. firstname.lastname@gmail.com works better than coolkid2000@hotmail.com.
                        </p>
                        <div className="bg-accent/10 dark:bg-accent/20 rounded-lg p-4 border-l-4 border-accent">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <strong>Pro Tip:</strong> Create a dedicated freelance email (e.g., yourname.freelance@gmail.com) to keep work and personal life separate. This also looks more professional to clients.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                    <div className="flex items-start gap-4 mb-4">
                      <span className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</span>
                      <div className="flex-1">
                        <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">Gather Required Documents</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">
                          Most platforms require identity verification. Have these ready before starting:
                        </p>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                          <li className="flex items-start gap-2">
                            <span className="text-primary">▸</span>
                            <span>Government-issued photo ID (passport or driver&apos;s license)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary">▸</span>
                            <span>Proof of address (utility bill or bank statement from last 3 months)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary">▸</span>
                            <span>Tax information (SSN or Tax ID depending on country)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary">▸</span>
                            <span>Bank account or PayPal for payments</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                    <div className="flex items-start gap-4 mb-4">
                      <span className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</span>
                      <div className="flex-1">
                        <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">Prepare Profile Materials</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">
                          Have these ready to speed up onboarding (see our <Link href={`/${locale}/resources/freelance-profile-templates`} className="text-primary underline">profile guide</Link> for details):
                        </p>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                          <li className="flex items-start gap-2">
                            <span className="text-accent">✓</span>
                            <span>Professional headshot (clear, friendly, good lighting)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent">✓</span>
                            <span>Written bio (200-300 words, client-focused)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent">✓</span>
                            <span>Headline/tagline showcasing your value proposition</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent">✓</span>
                            <span>3-5 portfolio samples (even if from practice projects)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent">✓</span>
                            <span>List of 10-15 relevant skills</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Platform-Specific: Upwork */}
              <div className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-primary/20 dark:border-primary/30">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary/20 dark:bg-primary/30 rounded-xl flex items-center justify-center">
                    <span className="text-3xl">🟢</span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Upwork Setup Guide</h2>
                    <p className="text-gray-600 dark:text-gray-400">Average setup time: 2-3 hours</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">Step 1: Create Account (10 minutes)</h3>
                    <ol className="space-y-2 text-gray-700 dark:text-gray-300 list-decimal list-inside">
                      <li>Go to Upwork.com and click &quot;Sign Up&quot;</li>
                      <li>Choose &quot;I&apos;m a freelancer&quot;</li>
                      <li>Enter your professional email and create strong password</li>
                      <li>Verify email through confirmation link</li>
                      <li>Select your country and agree to terms</li>
                    </ol>
                  </div>

                  <div className="border-l-4 border-accent pl-6">
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">Step 2: Complete Profile (60-90 minutes)</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Profile Photo:</h4>
                        <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm ml-4">
                          <li>• Upload clear headshot (min 250x250px, recommended 400x400px)</li>
                          <li>• Upwork allows photo retakes—use this to test different options</li>
                          <li>• Profiles with photos get 40% more views</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Professional Headline (50 characters max):</h4>
                        <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm ml-4">
                          <li>• Focus on value you deliver, not just job title</li>
                          <li>• Example: &quot;I Help SaaS Companies 2x Their Organic Traffic&quot;</li>
                          <li>• Not: &quot;Freelance SEO Writer&quot;</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Overview (5,000 characters max, aim for 300-500):</h4>
                        <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm ml-4">
                          <li>• Start with client pain point or bold statement</li>
                          <li>• Include specific results with numbers when possible</li>
                          <li>• End with clear call-to-action</li>
                          <li>• Use our <Link href={`/${locale}/resources/freelance-profile-templates`} className="text-primary underline">bio template</Link></li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Hourly Rate:</h4>
                        <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm ml-4">
                          <li>• Start 20-30% below market rate for first 5 clients</li>
                          <li>• Minimum recommended: $15-20/hr for beginners</li>
                          <li>• You can adjust anytime (do so every 5 reviews)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-secondary pl-6">
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">Step 3: Add Portfolio & Skills (30 minutes)</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Portfolio Projects:</h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                          Add 3-5 samples. For each project include:
                        </p>
                        <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm ml-4">
                          <li>• Descriptive title (e.g., &quot;SEO Blog Post That Ranked #1 on Google&quot;)</li>
                          <li>• Image/thumbnail or link to work</li>
                          <li>• Description explaining challenge, your solution, and results</li>
                          <li>• Relevant skills tags</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Skills (max 15):</h4>
                        <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm ml-4">
                          <li>• Choose skills clients actually search for</li>
                          <li>• Mix broad terms (&quot;Content Writing&quot;) with specific ones (&quot;SaaS Copywriting&quot;)</li>
                          <li>• Take Upwork skill tests to earn badges (increases visibility)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">Step 4: Verification & Payment (20 minutes)</h3>
                    <ol className="space-y-2 text-gray-700 dark:text-gray-300 list-decimal list-inside">
                      <li>Complete identity verification (upload ID, takes 1-2 hours to approve)</li>
                      <li>Add tax information (W-9 for US, W-8BEN for international)</li>
                      <li>Set up payment method (direct deposit, PayPal, wire transfer)</li>
                      <li>Set availability status to &quot;Available Now&quot;</li>
                    </ol>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-400 dark:border-blue-500 mt-6">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">💡 Upwork-Specific Tips:</p>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li>• <strong>Connects:</strong> You get 10-60 free connects monthly. Each proposal costs 1-6 connects. Don&apos;t waste them on low-quality jobs.</li>
                      <li>• <strong>Profile Visibility:</strong> New profiles get boosted in search for 2 weeks. Apply aggressively during this window.</li>
                      <li>• <strong>Specialized Profiles:</strong> After 90 days, you can create specialized profiles for different niches (e.g., one for writing, one for editing).</li>
                      <li>• <strong>Job Success Score:</strong> Maintain 90%+ JSS to access better jobs and Top Rated status.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CTA 1 */}
              <div className="my-16 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl p-8 text-center shadow-xl">
                <h3 className="text-2xl font-heading font-bold text-white mb-4">
                  Compare All Freelance Platforms
                </h3>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                  See detailed comparisons, fees, pros/cons, and user reviews for every major freelance platform.
                </p>
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary font-heading font-semibold hover:bg-gray-100 transition-all shadow-lg"
                >
                  View All Platforms
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>

              {/* Platform-Specific: Fiverr */}
              <div className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-accent/20 dark:border-accent/30">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-accent/20 dark:bg-accent/30 rounded-xl flex items-center justify-center">
                    <span className="text-3xl">💚</span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Fiverr Setup Guide</h2>
                    <p className="text-gray-600 dark:text-gray-400">Average setup time: 2 hours</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-400 dark:border-yellow-500 mb-6">
                    <p className="text-gray-800 dark:text-gray-200 text-sm">
                      <strong>Key Difference:</strong> Fiverr uses &quot;Gigs&quot; (service packages) instead of job applications. You create offerings and clients come to you.
                    </p>
                  </div>

                  <div className="border-l-4 border-accent pl-6">
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">Step 1: Account Creation (10 minutes)</h3>
                    <ol className="space-y-2 text-gray-700 dark:text-gray-300 list-decimal list-inside">
                      <li>Visit Fiverr.com and click &quot;Become a Seller&quot;</li>
                      <li>Sign up with email or Google account</li>
                      <li>Verify email address</li>
                      <li>Complete personal information (name, country, language)</li>
                      <li>Choose &quot;Continue&quot; to start profile setup</li>
                    </ol>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">Step 2: Seller Profile (30 minutes)</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Profile Picture & Description:</h4>
                        <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm ml-4">
                          <li>• Upload professional photo (square format, 400x400px minimum)</li>
                          <li>• Write 150-200 word description focused on what you offer clients</li>
                          <li>• Include years of experience and top 3 skills</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Languages & Skills:</h4>
                        <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm ml-4">
                          <li>• Add all languages you speak (proficiency level)</li>
                          <li>• Select up to 15 relevant skills from Fiverr&apos;s list</li>
                          <li>• Skills affect search ranking—choose carefully</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-secondary pl-6">
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">Step 3: Create Your First Gig (60 minutes)</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      This is the most important step on Fiverr. Your gig is your product listing:
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Gig Title (80 characters max):</h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">Include &quot;I will&quot; + what you do + who for</p>
                        <div className="bg-accent/10 dark:bg-accent/20 rounded-lg p-3">
                          <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                            Example: &quot;I will write SEO blog posts for your SaaS company&quot;
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Category & Tags:</h4>
                        <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm ml-4">
                          <li>• Choose most specific category available</li>
                          <li>• Add 5 search tags (keywords clients use to find you)</li>
                          <li>• Research competitor gigs for popular tag ideas</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Pricing Packages (3 tiers):</h4>
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700 space-y-3">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Basic ($25-50):</p>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">Entry-level offering with core deliverable. Example: &quot;1 x 500-word blog post, 2-day delivery&quot;</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Standard ($75-150):</p>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">Most popular package with extras. Example: &quot;2 x 1000-word posts, SEO keywords, 3-day delivery&quot;</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Premium ($200+):</p>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">Premium offering for serious clients. Example: &quot;5 x 2000-word posts, keyword research, meta descriptions, 7-day delivery&quot;</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Gig Description (1,200 characters):</h4>
                        <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm ml-4">
                          <li>• Start with what you offer and who you help</li>
                          <li>• List exactly what&apos;s included in each package</li>
                          <li>• Explain your process in 3-5 bullet points</li>
                          <li>• End with clear call-to-action</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Gig Images/Video:</h4>
                        <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm ml-4">
                          <li>• Upload 3 images (1280x720px recommended)</li>
                          <li>• First image is most important—shows in search results</li>
                          <li>• Optional but recommended: Create 60-second intro video</li>
                          <li>• Video gigs get 2-3x more orders</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-accent pl-6">
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">Step 4: Verification & Requirements (20 minutes)</h3>
                    <ol className="space-y-2 text-gray-700 dark:text-gray-300 list-decimal list-inside">
                      <li>Complete phone verification</li>
                      <li>Add payment method for receiving funds (PayPal, Payoneer, bank transfer)</li>
                      <li>Set up gig requirements (questions for buyers before ordering)</li>
                      <li>Publish your first gig and wait for approval (usually 24-48 hours)</li>
                    </ol>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-400 dark:border-blue-500 mt-6">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">💡 Fiverr-Specific Tips:</p>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li>• <strong>Response Time:</strong> Respond to messages within 24 hours or risk account penalties. Aim for under 1 hour.</li>
                      <li>• <strong>Delivery Time:</strong> Always deliver on time. Late deliveries hurt rankings. Build in buffer time.</li>
                      <li>• <strong>Gig Multiples:</strong> Create 7 different gigs (the maximum) to rank in more searches.</li>
                      <li>• <strong>Buyer Requests:</strong> Check &quot;Buyer Requests&quot; section daily and send offers to find first clients faster.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Quick Setup Guide for Other Platforms */}
              <div className="mb-16">
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="text-4xl">⚡</span>
                  Quick Setup Guides: Other Platforms
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Freelancer.com */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border-2 border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">Freelancer.com</h3>
                    <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">1.</span>
                        <span>Sign up and complete email verification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">2.</span>
                        <span>Build profile similar to Upwork (photo, bio, portfolio)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">3.</span>
                        <span>Take skill tests to earn certifications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">4.</span>
                        <span>Browse projects and submit bids (similar to proposals)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">5.</span>
                        <span>Consider entering contests to showcase skills</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-accent/10 dark:bg-accent/20 rounded-lg border-l-4 border-accent">
                      <p className="text-xs text-gray-700 dark:text-gray-300">
                        <strong>Unique Feature:</strong> Contests let you compete with other freelancers. Submit work, client picks winner. Great for building portfolio fast.
                      </p>
                    </div>
                  </div>

                  {/* Toptal */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border-2 border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">Toptal (Advanced)</h3>
                    <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">1.</span>
                        <span>Submit application with portfolio and resume</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">2.</span>
                        <span>Pass English communication screening call</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">3.</span>
                        <span>Complete technical skills assessment (coding/design)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">4.</span>
                        <span>Pass live technical interview with expert</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">5.</span>
                        <span>Complete test project to demonstrate abilities</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-400 dark:border-yellow-500">
                      <p className="text-xs text-gray-700 dark:text-gray-300">
                        <strong>Note:</strong> Toptal only accepts top 3% of applicants. Not recommended for absolute beginners. Start with Upwork/Fiverr first.
                      </p>
                    </div>
                  </div>

                  {/* PeoplePerHour */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border-2 border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">PeoplePerHour</h3>
                    <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold">1.</span>
                        <span>Register account with email verification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold">2.</span>
                        <span>Create profile with professional photo and bio</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold">3.</span>
                        <span>Create &quot;Hourlies&quot; (like Fiverr gigs) for fixed-price services</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold">4.</span>
                        <span>Browse projects and send proposals (15 free monthly proposals)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold">5.</span>
                        <span>Build certifications through platform skill tests</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-primary/10 dark:bg-primary/20 rounded-lg border-l-4 border-primary">
                      <p className="text-xs text-gray-700 dark:text-gray-300">
                        <strong>Hybrid Model:</strong> Combine Upwork-style bidding with Fiverr-style service packages for maximum flexibility.
                      </p>
                    </div>
                  </div>

                  {/* Guru */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border-2 border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">Guru.com</h3>
                    <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold">1.</span>
                        <span>Create account and verify email address</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold">2.</span>
                        <span>Complete profile with detailed work history</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold">3.</span>
                        <span>Add portfolio items with descriptions and links</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold">4.</span>
                        <span>Choose payment terms (hourly, fixed, milestones, recurring)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold">5.</span>
                        <span>Submit quotes to jobs (get 10 free quotes per month)</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-secondary/10 dark:bg-secondary/20 rounded-lg border-l-4 border-secondary">
                      <p className="text-xs text-gray-700 dark:text-gray-300">
                        <strong>Payment Flexibility:</strong> Offers 4 payment types including recurring contracts for retainer clients.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post-Setup Optimization */}
              <div className="mb-16 bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-2xl p-8 border border-primary/20 dark:border-primary/30">
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="text-4xl">🚀</span>
                  Post-Setup Optimization Checklist
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Your profile is live—now make it work harder for you:
                </p>

                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border-l-4 border-primary">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">☐ Take Platform Skill Tests</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Most platforms offer skill assessments. Top scores = badges = more visibility. Spend 1-2 hours taking tests in your core skills.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border-l-4 border-accent">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">☐ Optimize for Search Keywords</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Research what keywords clients use. Include them naturally in your headline, bio, and skills. Check competitors&apos; profiles for ideas.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border-l-4 border-secondary">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">☐ Set Up Availability Status</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Mark yourself &quot;Available Now&quot; or &quot;Full Time&quot; as a beginner. This increases your search ranking significantly.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border-l-4 border-primary">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">☐ Enable All Notifications</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Turn on email/mobile notifications for new jobs and messages. Fast response time = competitive advantage.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border-l-4 border-accent">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">☐ Add Certifications & Education</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Even free certifications from Google, HubSpot, or Coursera add credibility. Include relevant degrees or training.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border-l-4 border-secondary">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">☐ Write Sample Job Applications</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Practice your proposal before applying. Write 2-3 sample proposals and get feedback from the community.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border-l-4 border-primary">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">☐ Join Platform Community Forums</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Most platforms have forums where freelancers share tips. Active participation can lead to mentorship and insider knowledge.
                    </p>
                  </div>
                </div>

                <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-400 dark:border-blue-500">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">💪 Next Step:</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Your profile is ready. Time to start applying! Follow our <Link href={`/${locale}/resources/first-freelance-proposal`} className="text-primary underline">proposal writing guide</Link> to craft applications that get hired.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Aim to send 5-10 proposals per day for your first week. Track your response rate and refine your approach.
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
                Profile Set Up? Start Applying Today
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Your profiles are ready. Now it&apos;s time to land your first client. Get weekly tips on proposals, pricing, and platform strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/resources/freelance-beginners-guide`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-secondary font-heading font-semibold hover:bg-gray-100 transition-all shadow-lg"
                >
                  Read Beginner&apos;s Guide
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
                Complete Your Freelance Journey
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link
                  href={`/${locale}/resources/freelance-profile-templates`}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group"
                >
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    Creating a Winning Profile
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Templates and examples to make your profile stand out and attract premium clients.
                  </p>
                </Link>
                <Link
                  href={`/${locale}/resources/first-freelance-proposal`}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group"
                >
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    Writing Your First Proposal
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Proven proposal formulas and real examples that consistently get hired.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
