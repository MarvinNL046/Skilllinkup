import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AdWidget } from '@/components/AdWidget';
import { Zap, CheckCircle, ArrowRight, Star, TrendingUp, Clock, RefreshCw, Settings, DollarSign } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;

  const slug = 'automation-workflows-freelance';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/gids/tools-productiviteit/${slug}`;

  return {
    title: 'Automate Your Freelance Business: Complete Workflow Automation Guide 2026',
    description: 'Step-by-step guide to automating your freelance business. Save 20+ hours weekly with Zapier, Make, and n8n workflows. Includes 10 ready-to-use automation templates.',
    keywords: 'freelance automation, workflow automation, Zapier for freelancers, Make automation, n8n workflows, automate freelance business',
    openGraph: {
      title: 'Automate Your Freelance Business: Complete Workflow Automation Guide 2026',
      description: 'Save 20+ hours weekly with automation. Includes 10 ready-to-use templates.',
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [
        {
          url: `${siteUrl}/images/og/resources-og.png`,
          width: 1200,
          height: 630,
          alt: 'Freelance Automation Guide 2026',
        }
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Automate Your Freelance Business: Complete Workflow Automation Guide 2026',
      description: 'Save 20+ hours weekly with freelance automation workflows.',
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

export default async function AutomationWorkflowsFreelance({
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
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-heading">
                Automate Your Freelance Business: Complete Workflow Guide
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Save 20+ hours per week by automating repetitive tasks. Step-by-step guide with 10 ready-to-use automation templates for invoicing, client onboarding, project management, and more.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={`/${locale}/tools/time-tracker`}
                  className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl font-heading"
                >
                  Start with Time Tracker
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href={`/${locale}/tools/invoice-generator`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20 font-heading"
                >
                  Invoice Generator
                  <DollarSign className="w-5 h-5" />
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
            "headline": "Automate Your Freelance Business: Complete Workflow Automation Guide 2026",
            "description": "Comprehensive guide to freelance automation workflows using Zapier, Make, and n8n.",
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
                "name": "Automation Workflows",
                "item": `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/gids/tools-productiviteit/automation-workflows-freelance`
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
                <Clock className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 font-heading">20+ Hours Saved Weekly</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Through automation</p>
              </div>
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border border-accent/20">
                <RefreshCw className="w-10 h-10 text-accent mb-3" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 font-heading">10 Ready Templates</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Copy and implement today</p>
              </div>
              <div className="bg-gradient-to-br from-[#1e1541]/10 to-[#1e1541]/5 dark:from-[#1e1541]/30 dark:to-[#1e1541]/20 rounded-xl p-6 border border-[#1e1541]/20">
                <TrendingUp className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 font-heading">70% Less Admin Work</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Focus on client delivery</p>
              </div>
            </div>

            {/* Intro */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                Why Automation Is the Secret Weapon of Six-Figure Freelancers
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-4">
                Let me paint a picture: It's 11 PM. You just finished a client project. But before you can sleep, you need to update your time tracker, create an invoice, send a follow-up email, update your project management tool, and remember to post that invoice to your accounting software.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-4">
                Sound familiar? You're spending 2-3 hours daily on admin tasks that could be automated.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-4">
                Here's what most freelancers don't realize: The difference between struggling freelancers earning $3,000/month and thriving ones earning $10,000+ isn't talent - it's automation. The successful ones automated the boring stuff years ago.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                This guide reveals the exact automation workflows successful freelancers use to save 20+ hours weekly. You'll get 10 ready-to-use templates you can implement today, even if you've never automated anything before.
              </p>
            </div>

            {/* Core Automation Platforms */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <div className="flex items-center gap-4 mb-6">
                <Settings className="w-12 h-12 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-heading">
                  The 3 Automation Platforms Every Freelancer Should Know
                </h2>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                Before we dive into specific workflows, let's cover the three automation platforms you need to know. Each has strengths - choose based on your technical skills and budget.
              </p>

              <div className="space-y-6 mb-6">
                <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-xl font-heading">1. Zapier (Best for Beginners)</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    The most user-friendly automation platform. Connect 5,000+ apps with zero coding. Perfect for freelancers who want automation without technical headaches.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-2">Pros:</p>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">Easiest to learn (30 min setup)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">5,000+ app integrations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">Excellent documentation</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-2">Cons:</p>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-red-500">✗</span>
                          <span className="text-gray-700 dark:text-gray-300">Expensive ($20-70/month)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500">✗</span>
                          <span className="text-gray-700 dark:text-gray-300">Limited free tier (100 tasks/mo)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-primary font-semibold">Price: Free for 100 tasks/month, $20-70/month for 750-2000 tasks</p>
                </div>

                <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-xl font-heading">2. Make (formerly Integromat) - Best Value</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    More powerful than Zapier, cheaper pricing, visual workflow builder. Slight learning curve but worth it for complex automations.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-2">Pros:</p>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">Better pricing than Zapier</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">Visual workflow designer</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">More control over data</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-2">Cons:</p>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-red-500">✗</span>
                          <span className="text-gray-700 dark:text-gray-300">Steeper learning curve</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500">✗</span>
                          <span className="text-gray-700 dark:text-gray-300">Fewer pre-built templates</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-primary font-semibold">Price: Free for 1,000 operations/month, $9-29/month for 10K-40K operations</p>
                </div>

                <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-xl font-heading">3. n8n (Best for Technical Users)</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Open-source automation tool. Self-host for free or use their cloud. Unlimited automations with no monthly fees if you self-host.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-2">Pros:</p>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">100% free if self-hosted</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">Unlimited workflows</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">Full data control</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-2">Cons:</p>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-red-500">✗</span>
                          <span className="text-gray-700 dark:text-gray-300">Requires technical skills</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500">✗</span>
                          <span className="text-gray-700 dark:text-gray-300">Self-hosting maintenance</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-primary font-semibold">Price: Free (self-hosted), $20-50/month (cloud)</p>
                </div>
              </div>

              <div className="bg-accent/10 dark:bg-accent/20 rounded-xl p-6 border border-accent/30">
                <p className="text-gray-900 dark:text-white font-semibold mb-2">💡 Recommendation:</p>
                <p className="text-gray-700 dark:text-gray-300">Start with Zapier's free tier to learn automation basics. Once you hit the 100 tasks/month limit, switch to Make for better pricing. Only use n8n if you're comfortable with Docker and server management.</p>
              </div>
            </div>

            {/* 10 Automation Templates */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                10 Ready-to-Use Automation Templates
              </h2>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 text-lg">
                Copy these proven automation workflows into your business today. Each template includes step-by-step setup instructions for Zapier (easiest to implement).
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 border border-primary/20">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-xl font-heading">
                    1. Auto-Invoice When Project Completes
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    <strong>Trigger:</strong> When you mark a project as "Complete" in Trello/Asana<br/>
                    <strong>Action:</strong> Automatically create and send invoice via FreshBooks/Wave
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-3">Saves 30 minutes per project</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    <strong>Apps needed:</strong> Trello/Asana + FreshBooks/Wave + Gmail
                  </p>
                  <div className="bg-white/50 dark:bg-slate-700/50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Setup Steps:</p>
                    <ol className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-decimal list-inside">
                      <li>Connect Trello to Zapier</li>
                      <li>Set trigger: "Card Moved to List" → "Completed"</li>
                      <li>Add action: Create invoice in FreshBooks (pull client email from card)</li>
                      <li>Add action: Send invoice via Gmail</li>
                      <li>Test with dummy project</li>
                    </ol>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6 border border-accent/20">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-xl font-heading">
                    2. Client Onboarding Automation
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    <strong>Trigger:</strong> New client signs contract (DocuSign/HelloSign)<br/>
                    <strong>Actions:</strong> Create project in PM tool, send welcome email, add to CRM, schedule kickoff call
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-3">Saves 2 hours per new client</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    <strong>Apps needed:</strong> DocuSign + Notion/Asana + Gmail + Calendly + Airtable
                  </p>
                </div>

                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 border border-primary/20">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-xl font-heading">
                    3. Time Tracking to Invoice Pipeline
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    <strong>Trigger:</strong> End of week (Friday 5 PM)<br/>
                    <strong>Actions:</strong> Export time entries from Toggl, calculate total hours, create invoice draft, notify you to review
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-3">Saves 1 hour weekly</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    <strong>Apps needed:</strong> Toggl Track + FreshBooks + Slack/Email
                  </p>
                </div>

                <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6 border border-accent/20">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-xl font-heading">
                    4. Lead Magnet to Email Sequence
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    <strong>Trigger:</strong> Someone downloads your lead magnet (ebook, template, guide)<br/>
                    <strong>Actions:</strong> Add to email list, send welcome email, tag based on download, schedule follow-up sequence
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-3">Converts 15% more leads</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    <strong>Apps needed:</strong> Google Forms/Typeform + ConvertKit/Mailchimp
                  </p>
                </div>

                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 border border-primary/20">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-xl font-heading">
                    5. Payment Reminder Automation
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    <strong>Trigger:</strong> Invoice unpaid after 7 days<br/>
                    <strong>Actions:</strong> Send friendly reminder email, add task to follow up, notify you in Slack
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-3">Get paid 30% faster</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    <strong>Apps needed:</strong> FreshBooks/Wave + Gmail + Slack + Trello
                  </p>
                </div>
              </div>
            </div>

            {/* CTA 1 */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white text-center">
              <Zap className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
                Start Automating Today with Our Free Tools
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Our time tracker and invoice generator integrate with automation platforms. Get started free.
              </p>
              <Link
                href={`/${locale}/tools`}
                className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg font-heading"
              >
                Try Free Tools
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <AdWidget placement="blog_sidebar" />

            {/* Implementation Roadmap */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                4-Week Automation Implementation Roadmap
              </h2>

              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-xl font-heading">Week 1: Learn + Setup</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Create free Zapier account. Watch their tutorial videos (2 hours total). Build your first simple automation: Gmail to Google Sheets.
                  </p>
                  <p className="text-sm text-primary font-semibold">Goal: Understand basic automation concepts</p>
                </div>

                <div className="border-l-4 border-accent pl-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-xl font-heading">Week 2: Implement Core Workflows</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Build automations #1, #3, and #5 from the templates above. Test with real data. Fix any bugs.
                  </p>
                  <p className="text-sm text-accent font-semibold">Goal: Automate invoicing and payment reminders</p>
                </div>

                <div className="border-l-4 border-primary pl-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-xl font-heading">Week 3: Client-Facing Automation</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Implement client onboarding automation (#2) and lead magnet sequence (#4). Document your new processes.
                  </p>
                  <p className="text-sm text-primary font-semibold">Goal: Automate client experience</p>
                </div>

                <div className="border-l-4 border-accent pl-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-xl font-heading">Week 4: Optimize + Expand</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Review what's working. Tweak automations based on results. Identify next 2-3 processes to automate. Consider upgrading to Make for better pricing.
                  </p>
                  <p className="text-sm text-accent font-semibold">Goal: Continuous improvement mindset</p>
                </div>
              </div>
            </div>

            {/* Internal Links */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                Related Guides
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                  href={`/${locale}/gids/tools-productiviteit/ai-tools-for-freelancers`}
                  className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600 hover:shadow-lg transition-all group"
                >
                  <Star className="w-10 h-10 text-primary mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors font-heading">
                    Best AI Tools for Freelancers
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Combine AI tools with automation for maximum efficiency
                  </p>
                </Link>
                <Link
                  href={`/${locale}/gids/tools-productiviteit/freelance-crm-software`}
                  className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600 hover:shadow-lg transition-all group"
                >
                  <TrendingUp className="w-10 h-10 text-accent mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors font-heading">
                    CRM Software for Freelancers
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Track leads and automate client relationships
                  </p>
                </Link>
              </div>
            </div>

            {/* CTA 2 */}
            <div className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
              <RefreshCw className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
                Ready to Save 20+ Hours Per Week?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join automation-powered freelancers earning more while working less. Start your automation journey today.
              </p>
              <Link
                href={`/${locale}/platforms`}
                className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg font-heading"
              >
                Find Automation-Friendly Platforms
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
