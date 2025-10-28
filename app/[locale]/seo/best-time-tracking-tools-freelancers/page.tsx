import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Clock, CheckCircle, Zap, Timer, BarChart3, DollarSign, Star } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/seo/best-time-tracking-tools-freelancers`;

  return {
    title: 'Best Time Tracking Tools for Freelancers (Free and Paid) 2025',
    description: 'Compare the best time tracking tools for freelancers. Find free and paid options with features like invoicing integration, project tracking, and detailed reporting.',
    keywords: 'time tracking, freelance timer, billable hours, time tracker app, productivity tools',
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: 'Best Time Tracking Tools for Freelancers (Free and Paid)',
      description: 'Compare top time tracking tools for freelancers with features, pricing, and reviews.',
      url: pageUrl,
      siteName: 'SkillLinkup',
      type: 'article',
    },
  };
}

export default async function TimeTrackingToolsPage({ params }: PageProps) {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Time Tracking Tools for Freelancers (Free and Paid) 2025',
    description: 'Compare the best time tracking tools for freelancers.',
    author: { '@type': 'Organization', name: 'SkillLinkup' },
    publisher: {
      '@type': 'Organization',
      name: 'SkillLinkup',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/images/logo/skilllinkup-transparant-rozepunt.webp` },
    },
    datePublished: '2025-01-15',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        {/* Hero */}
        <section className="bg-gradient-to-br from-accent via-accent-dark to-primary dark:from-primary dark:via-accent-dark dark:to-accent py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Best Time Tracking Tools for Freelancers (Free and Paid)
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Compare top time tracking solutions to monitor billable hours, boost productivity, and get paid accurately for your work.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href={`/${locale}/tools/time-tracker`} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-accent rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg">
                  <Timer className="w-5 h-5" />
                  Try Free Time Tracker
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-accent pl-6 py-2 mb-8">
                  Time tracking isn't just about billing clients accurately—it's about understanding your productivity, optimizing your workflow, and ensuring every billable hour is accounted for. The right time tracking tool can transform how you work.
                </p>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  Why Freelancers Need Time Tracking Tools
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Whether you bill by the hour or charge fixed project fees, tracking your time provides invaluable insights. You'll discover which projects are profitable, how long tasks actually take, and where you can improve efficiency.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Studies show that freelancers who track time accurately earn 25-40% more than those who estimate hours. Why? Because they have data to back up their pricing, can spot underpriced services, and provide transparent billing that clients trust.
                </p>

                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <DollarSign className="w-10 h-10 text-accent mb-3" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Accurate Billing</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Never lose billable hours or undercharge clients again</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <BarChart3 className="w-10 h-10 text-accent mb-3" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Data Insights</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Understand which projects and tasks are most profitable</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <Zap className="w-10 h-10 text-accent mb-3" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Productivity Boost</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Identify time wasters and optimize your workflow</p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  Key Features to Look For
                </h2>
                <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>One-click timers:</strong> Start and stop tracking instantly without disrupting workflow</li>
                  <li><strong>Project categorization:</strong> Organize time by client, project, or task type</li>
                  <li><strong>Manual entry:</strong> Add time retroactively when you forget to start the timer</li>
                  <li><strong>Detailed reporting:</strong> Generate professional reports for clients and yourself</li>
                  <li><strong>Mobile apps:</strong> Track time on the go from phone or tablet</li>
                  <li><strong>Integrations:</strong> Connect with invoicing and project management tools</li>
                  <li><strong>Team features:</strong> Track time for assistants or collaborators (if applicable)</li>
                </ul>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  Top Time Tracking Tools Compared
                </h2>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  1. SkillLinkup Time Tracker (Free)
                </h3>
                <div className="bg-gradient-to-r from-accent/10 to-primary/10 dark:from-accent/20 dark:to-primary/20 rounded-xl p-6 my-6 border-l-4 border-accent">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-accent text-accent" />
                        <Star className="w-5 h-5 fill-accent text-accent" />
                        <Star className="w-5 h-5 fill-accent text-accent" />
                        <Star className="w-5 h-5 fill-accent text-accent" />
                        <Star className="w-5 h-5 fill-accent text-accent" />
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">5.0</span>
                    </div>
                    <span className="px-3 py-1 bg-accent text-white text-sm font-semibold rounded-full">FREE</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Our free time tracker offers everything freelancers need: live timers, project categorization, manual entry, and professional reporting. No signup required, all data stored locally for privacy.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>Unlimited projects and time entries</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>Live timer with pause/resume functionality</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>Export to CSV for invoicing integration</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>Automatic earnings calculation based on hourly rates</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <strong>Best for:</strong> Freelancers who want a simple, effective solution without monthly fees or account creation.
                  </p>
                  <Link href={`/${locale}/tools/time-tracker`} className="inline-flex items-center gap-2 text-accent dark:text-accent-light font-semibold hover:underline">
                    Start Tracking Time Free →
                  </Link>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  2. Toggl Track (Freemium)
                </h3>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 my-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600" />
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">4.7</span>
                    </div>
                    <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-semibold rounded-full">$10/mo</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Popular time tracking tool with robust features, excellent mobile apps, and strong integrations. Free plan available for solo freelancers.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-2">✅ Pros</p>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Intuitive interface</li>
                        <li>• Excellent mobile apps</li>
                        <li>• Strong integrations</li>
                        <li>• Idle detection</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-2">❌ Cons</p>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Limited free plan</li>
                        <li>• Requires account</li>
                        <li>• Can be pricey for teams</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Best for:</strong> Freelancers who need advanced reporting and integrations with other business tools.
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  3. Harvest (Paid)
                </h3>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 my-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600" />
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">4.6</span>
                    </div>
                    <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-semibold rounded-full">$12/mo</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    All-in-one time tracking and invoicing solution designed specifically for freelancers and small agencies. Seamlessly converts tracked time to invoices.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>Built-in invoicing with time tracking integration</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>Expense tracking and receipt capture</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>Project budgeting and alerts</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Best for:</strong> Established freelancers who want time tracking and invoicing in one platform.
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  4. Clockify (Free)
                </h3>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 my-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-primary text-primary" />
                        <Star className="w-5 h-5 fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600" />
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">4.5</span>
                    </div>
                    <span className="px-3 py-1 bg-accent text-white text-sm font-semibold rounded-full">FREE</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Generous free plan with unlimited users and projects. Great for freelancers who work with assistants or small teams.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Best for:</strong> Freelancers who need team features on a budget.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  Free vs. Paid: Which Should You Choose?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  For most solo freelancers just starting out, free tools like SkillLinkup Time Tracker or Clockify provide everything you need. Consider upgrading to paid tools when:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>You need advanced integrations with accounting or project management software</li>
                  <li>You want automated invoicing directly from tracked time</li>
                  <li>You need team features for collaborators or virtual assistants</li>
                  <li>You require priority support and training</li>
                  <li>Your client base expects reports from professional tools</li>
                </ul>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  Time Tracking Best Practices
                </h2>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 my-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 Track Everything</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Even if you charge fixed fees, track your time. You'll discover if projects are profitable and can adjust pricing accordingly.
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🏷️ Use Consistent Categories</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Create clear project and task categories so you can analyze your data effectively. Be specific but not overly complicated.
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Review Weekly</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Spend 15 minutes each week reviewing your time data. Look for patterns, inefficiencies, and opportunities to optimize.
                  </p>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">💰 Calculate True Hourly Rate</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Divide project earnings by total hours spent (including admin time). This reveals your actual hourly rate and helps with future pricing.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  Common Time Tracking Mistakes
                </h2>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 my-6">
                  <p className="text-red-800 dark:text-red-200 mb-3">
                    <strong>❌ Forgetting to Start the Timer:</strong> Set reminders or integrate with project management tools that auto-start timers.
                  </p>
                  <p className="text-red-800 dark:text-red-200 mb-3">
                    <strong>❌ Not Tracking Non-Billable Time:</strong> Track everything, even admin work. It helps you understand true project profitability.
                  </p>
                  <p className="text-red-800 dark:text-red-200">
                    <strong>❌ Rounding Excessively:</strong> Track actual time, then round when invoicing if needed. Accurate data is valuable for your business.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  Integration with Other Tools
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Time tracking becomes even more powerful when integrated with your workflow:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>Invoicing tools:</strong> Automatically create invoices from tracked time</li>
                  <li><strong>Project management:</strong> Start timers directly from task boards</li>
                  <li><strong>Calendar apps:</strong> Sync scheduled work with time entries</li>
                  <li><strong>Accounting software:</strong> Track billable vs non-billable time for taxes</li>
                </ul>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  Making the Switch: Migration Tips
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  If you're switching from one time tracker to another, here's how to do it smoothly:
                </p>
                <ol className="list-decimal pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Export all data from your current tool before canceling</li>
                  <li>Set up projects and categories in the new tool first</li>
                  <li>Run both tools in parallel for a week to ensure consistency</li>
                  <li>Import historical data if the new tool supports it</li>
                  <li>Update any integrations or workflows that reference the old tool</li>
                </ol>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-accent via-accent-dark to-primary rounded-2xl p-8 md:p-12 text-center mt-16 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Start Tracking Your Time Today
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Try our free time tracker with unlimited projects, live timers, and professional reporting. No signup required.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href={`/${locale}/tools/time-tracker`} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-accent rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg">
                    <Clock className="w-5 h-5" />
                    Start Tracking Free
                  </Link>
                  <Link href={`/${locale}/tools`} className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition-all">
                    View All Tools
                  </Link>
                </div>
              </div>

              {/* Related */}
              <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Tools</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Link href={`/${locale}/tools/invoice-generator`} className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-accent transition-all">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent">Invoice Generator</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Convert tracked hours into professional invoices</p>
                  </Link>
                  <Link href={`/${locale}/tools/rate-calculator`} className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-accent transition-all">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent">Rate Calculator</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Calculate your ideal hourly rate based on your goals</p>
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
