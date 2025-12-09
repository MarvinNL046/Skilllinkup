import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const metadata: Metadata = {
  title: 'How to Switch Freelance Platforms Without Losing Clients | Complete Guide',
  description: 'Step-by-step guide to migrating from one freelance platform to another. Keep your clients, protect your income, and transition smoothly.',
  openGraph: {
    title: 'How to Switch Freelance Platforms Without Losing Clients',
    description: 'Step-by-step guide to migrating from one freelance platform to another. Keep your clients, protect your income, and transition smoothly.',
    type: 'article',
    images: ['/images/defaults/og-image.jpg'],
  },
};

export default async function SwitchingPlatformsGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Switch Freelance Platforms Without Losing Clients',
    description: 'Complete guide to migrating from one freelance platform to another while protecting your client relationships.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Evaluate Your Current Platform',
        text: 'Identify what is working and what is not before making the switch.',
      },
      {
        '@type': 'HowToStep',
        name: 'Choose Your New Platform',
        text: 'Research and select a platform that addresses your current pain points.',
      },
      {
        '@type': 'HowToStep',
        name: 'Review Legal Restrictions',
        text: 'Check Terms of Service for client contact and migration policies.',
      },
      {
        '@type': 'HowToStep',
        name: 'Export Your Data',
        text: 'Download portfolio, testimonials, and client information.',
      },
      {
        '@type': 'HowToStep',
        name: 'Rebuild Your Profile',
        text: 'Set up your new profile with optimized descriptions and portfolio.',
      },
      {
        '@type': 'HowToStep',
        name: 'Migrate Your Clients',
        text: 'Communicate professionally with existing clients about the transition.',
      },
    ],
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
        name: 'Switching Platforms Guide',
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
              How to Switch Freelance Platforms Without Losing Clients
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Your complete guide to migrating platforms while protecting your income, client relationships, and professional reputation.
            </p>
            <Link
              href={`/${locale}/platforms`}
              className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-3 text-[#ef2b70] font-heading font-semibold shadow-lg transition-colors"
            >
              Compare New Platforms
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
              Feeling trapped by high fees, unfair policies, or toxic client pools? You&apos;re not alone. Thousands of freelancers successfully switch platforms every year—but only those who plan carefully keep their clients and income intact.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              This guide covers everything from legal considerations to client communication scripts. Whether you&apos;re leaving Upwork for Contra, Fiverr for your own website, or exploring entirely new platforms, here&apos;s your roadmap.
            </p>
          </div>

          {/* Why Switch? */}
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-[#1e1541] mb-6">
              Why Freelancers Switch Platforms
            </h2>
            <p className="text-gray-700 mb-6">
              Before diving into the how, let&apos;s validate the why. Common reasons freelancers migrate:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-heading font-bold text-[#ef2b70] mb-3">High Fees</h3>
                <p className="text-gray-700">Platform taking 20-30% of your earnings? That&apos;s $20,000-30,000 on a $100K annual income.</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-heading font-bold text-[#ef2b70] mb-3">Low-Quality Clients</h3>
                <p className="text-gray-700">Constant low-ball offers and tire-kickers waste time and damage morale.</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-heading font-bold text-[#ef2b70] mb-3">Unfair Policies</h3>
                <p className="text-gray-700">Account suspensions without warning, biased dispute resolution, unclear rules.</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-heading font-bold text-[#ef2b70] mb-3">Better Opportunities</h3>
                <p className="text-gray-700">New platform offers higher rates, better clients, or features aligned with your goals.</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-heading font-bold text-[#ef2b70] mb-3">Career Growth</h3>
                <p className="text-gray-700">Moving from generalist platforms to specialized ones as your expertise deepens.</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-heading font-bold text-[#ef2b70] mb-3">Independence</h3>
                <p className="text-gray-700">Building your own brand and direct client relationships without platform intermediaries.</p>
              </div>
            </div>
          </div>

          {/* Step 1: Evaluate */}
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-[#1e1541] mb-6">
              Step 1: Evaluate Your Current Situation
            </h2>
            <div className="bg-[#22c55e]/10 border-l-4 border-[#22c55e] p-6 mb-6">
              <p className="text-gray-700">
                <strong>Before you switch:</strong> Understand exactly what&apos;s working and what&apos;s not. This prevents jumping to another platform with the same problems.
              </p>
            </div>
            <p className="text-gray-700 mb-4">
              <strong>Questions to answer honestly:</strong>
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>What percentage of my income comes from this platform? (If &gt;80%, proceed cautiously)</li>
              <li>Which clients would I want to keep working with?</li>
              <li>What specific problems am I trying to solve by switching?</li>
              <li>Will a new platform actually solve those problems?</li>
              <li>Can I afford a 2-3 month income dip during transition?</li>
              <li>Do I have enough savings to bridge the gap? (Recommended: 3-6 months)</li>
            </ul>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-heading font-bold text-[#1e1541] mb-3">
                Calculate Your True Platform Cost
              </h3>
              <p className="text-gray-700 mb-3">Use this formula to see if switching makes financial sense:</p>
              <div className="bg-gray-50 p-4 rounded font-mono text-sm">
                <p>Annual platform fees = (Total earnings × Fee %) + Subscriptions + Hidden costs</p>
                <p className="mt-2">Example: ($60,000 × 20%) + ($15/mo × 12) + $500 = $12,680</p>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                If you&apos;re losing $10K+/year to fees, switching could save serious money. See our <Link href={`/${locale}/gids/platform-selectie/platform-fees-comparison`} className="text-[#ef2b70] hover:underline font-semibold">complete fee comparison</Link>.
              </p>
            </div>
          </div>

          {/* Step 2: Choose New Platform */}
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-[#1e1541] mb-6">
              Step 2: Choose Your New Platform Strategically
            </h2>
            <p className="text-gray-700 mb-6">
              Don&apos;t just jump to the first alternative. Research thoroughly:
            </p>
            <div className="space-y-4 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-heading font-bold text-[#1e1541] mb-2">Match Platform to Career Stage</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Beginner (0-1 years):</strong> Fiverr, Upwork (easy entry, high volume)</li>
                  <li><strong>Intermediate (1-3 years):</strong> Guru, Freelancer.com (better rates, less competition)</li>
                  <li><strong>Advanced (3+ years):</strong> Toptal, Gun.io (premium rates, vetted clients)</li>
                  <li><strong>Expert (5+ years):</strong> Your own website, Contra (zero fees, full control)</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-heading font-bold text-[#1e1541] mb-2">Consider Multi-Platform Strategy</h3>
                <p className="text-gray-700 mb-3">
                  Instead of switching completely, many successful freelancers use multiple platforms strategically:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Platform A (Upwork):</strong> Find new clients, build relationships</li>
                  <li><strong>Platform B (Contra):</strong> Move repeat clients here (0% fees)</li>
                  <li><strong>Your Website:</strong> Long-term, premium clients direct</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA #1 */}
          <div className="bg-gradient-to-r from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 mb-12 text-center">
            <h3 className="text-2xl font-heading font-bold text-white mb-4">
              Not Sure Which Platform to Switch To?
            </h3>
            <p className="text-white/90 text-lg mb-6">
              Take our 2-minute quiz to find the best platform for your skill level and goals
            </p>
            <Link
              href={`/${locale}/gids/platform-selectie/platform-selectie-quiz`}
              className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-3 text-[#ef2b70] font-heading font-semibold shadow-lg transition-colors"
            >
              Take the Platform Quiz
            </Link>
          </div>

          {/* Step 3: Legal Review */}
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-[#1e1541] mb-6">
              Step 3: Review Legal Restrictions (Critical!)
            </h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
              <p className="text-gray-700">
                <strong>Warning:</strong> Most platforms have Terms of Service that restrict how you can contact or work with clients found through their platform. Violating these can result in account suspension and loss of earnings.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-heading font-bold text-[#1e1541] mb-4">Common Legal Restrictions</h3>
                <div className="bg-white rounded-lg shadow p-6 mb-4">
                  <h4 className="font-heading font-bold text-[#ef2b70] mb-2">Upwork&apos;s Policy</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Can contact clients directly after contract ends (with conditions)</li>
                    <li>✗ Cannot circumvent fees while contract is active</li>
                    <li>✓ Can work together off-platform after 24 months OR paying $2,500 conversion fee</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-4">
                  <h4 className="font-heading font-bold text-[#ef2b70] mb-2">Fiverr&apos;s Policy</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>✗ Very restrictive - prohibits sharing external contact info</li>
                    <li>✗ Lifetime fees on any client relationship started on platform</li>
                    <li>✓ Can add clients to email list for content (check current TOS)</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="font-heading font-bold text-[#ef2b70] mb-2">Toptal&apos;s Policy</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ More flexible after contract completion</li>
                    <li>✓ Can often negotiate direct relationships with transparency</li>
                    <li>~ Varies by contract - always read your specific agreement</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-3">What You CAN Do Legally</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Work with clients on Platform A while building presence on Platform B</li>
                  <li>Mention in your bio that you have multiple channels (if ToS allows)</li>
                  <li>Keep platform work separate from direct work until restrictions expire</li>
                  <li>Ask platform support for clarification on specific scenarios</li>
                  <li>Wait out non-compete periods before transitioning clients</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-heading font-bold text-[#1e1541] mb-3">What You CANNOT Do</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Share personal email/phone in platform messages (automated filters catch this)</li>
                  <li>Ask clients to work outside platform while contract is active</li>
                  <li>Create duplicate accounts to bypass fees</li>
                  <li>Use platform messaging to recruit clients to your website</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 4: Export Data */}
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-[#1e1541] mb-6">
              Step 4: Export Your Data Before You Leave
            </h2>
            <p className="text-gray-700 mb-6">
              Download everything while you still have access. Some platforms delete your data after account closure.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
              <p className="text-gray-700">
                <strong>Do this BEFORE announcing your departure.</strong> Some platforms suspend accounts immediately when freelancers mention leaving.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-heading font-bold text-[#1e1541] mb-3">Portfolio Work</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Download all portfolio images at full resolution</li>
                  <li>✓ Save project descriptions and case studies</li>
                  <li>✓ Screenshot or export any video portfolio items</li>
                  <li>✓ Save work samples with proper file naming</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-heading font-bold text-[#1e1541] mb-3">Client Reviews & Testimonials</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Screenshot all 5-star reviews</li>
                  <li>✓ Copy testimonial text to a document</li>
                  <li>✓ Note reviewer names (for potential LinkedIn recommendations later)</li>
                  <li>✓ Export overall rating and stats</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-heading font-bold text-[#1e1541] mb-3">Financial Records</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Download all invoices and payment receipts</li>
                  <li>✓ Export transaction history (for taxes)</li>
                  <li>✓ Save annual earnings statements</li>
                  <li>✓ Document any pending payments or disputes</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-heading font-bold text-[#1e1541] mb-3">Client Information (Within ToS)</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ List of project names/types (not client personal data)</li>
                  <li>✓ General industry/niche information</li>
                  <li>✓ Project complexity notes for your reference</li>
                  <li>✗ Do NOT export client emails, phone numbers, or personal info (ToS violation)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 5: Rebuild Profile */}
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-[#1e1541] mb-6">
              Step 5: Rebuild Your Profile on New Platform
            </h2>
            <p className="text-gray-700 mb-6">
              Your new profile needs to match or exceed your old one. This takes time—don&apos;t rush it.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-heading font-bold text-[#1e1541] mb-4">Profile Setup Checklist</h3>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="w-5 h-5 text-[#ef2b70]" />
                      <span className="text-gray-700">Professional profile photo (same quality as old profile)</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="w-5 h-5 text-[#ef2b70]" />
                      <span className="text-gray-700">Compelling headline with keywords</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="w-5 h-5 text-[#ef2b70]" />
                      <span className="text-gray-700">Detailed bio explaining expertise and value proposition</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="w-5 h-5 text-[#ef2b70]" />
                      <span className="text-gray-700">Upload portfolio (10+ high-quality samples)</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="w-5 h-5 text-[#ef2b70]" />
                      <span className="text-gray-700">Add skills and certifications</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="w-5 h-5 text-[#ef2b70]" />
                      <span className="text-gray-700">Set competitive but sustainable rates</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="w-5 h-5 text-[#ef2b70]" />
                      <span className="text-gray-700">Complete all verification steps (ID, payment, etc.)</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="w-5 h-5 text-[#ef2b70]" />
                      <span className="text-gray-700">Write detailed service descriptions</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-[#22c55e]/10 border-l-4 border-[#22c55e] p-6">
                <h3 className="text-lg font-heading font-bold text-[#1e1541] mb-2">
                  Pro Tip: Build Credibility from Zero
                </h3>
                <p className="text-gray-700 mb-3">
                  Starting fresh means no reviews. Here&apos;s how to build trust quickly:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Offer first 2-3 projects at slight discount for 5-star reviews</li>
                  <li>Link to your LinkedIn profile with recommendations</li>
                  <li>Add &quot;testimonials&quot; section with screenshots from old platform (within copyright limits)</li>
                  <li>Create detailed case studies showing your process and results</li>
                  <li>Get platform-specific certifications/badges quickly</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA #2 */}
          <div className="bg-[#22c55e]/10 border-l-4 border-[#22c55e] rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-heading font-bold text-[#1e1541] mb-4">
              Switching to Avoid High Fees?
            </h3>
            <p className="text-gray-700 text-lg mb-6">
              See exactly how much you&apos;ll save on different platforms with our complete fee breakdown.
            </p>
            <Link
              href={`/${locale}/gids/platform-selectie/platform-fees-comparison`}
              className="inline-block rounded-lg bg-[#22c55e] hover:bg-[#22c55e]/90 px-8 py-3 text-white font-heading font-semibold shadow-lg transition-colors"
            >
              Compare Platform Fees
            </Link>
          </div>

          {/* Step 6: Client Migration */}
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-[#1e1541] mb-6">
              Step 6: Migrate Your Best Clients (The Right Way)
            </h2>
            <p className="text-gray-700 mb-6">
              This is the most sensitive step. Approach it professionally and legally.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-heading font-bold text-[#1e1541] mb-4">
                  Email Template: Informing Clients of Platform Change
                </h3>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-300">
                  <p className="text-sm text-gray-600 mb-4"><em>Use this AFTER you&apos;re legally allowed to contact clients directly:</em></p>
                  <div className="text-gray-700 space-y-4">
                    <p><strong>Subject:</strong> Update: New Ways to Work Together</p>
                    <p>Hi [Client Name],</p>
                    <p>
                      I wanted to let you know that I&apos;ve expanded my freelance practice and now accept projects through [New Platform/Website].
                    </p>
                    <p>
                      This doesn&apos;t affect our current projects—we&apos;ll complete those as planned on [Current Platform]. But for future projects, working through [New Option] offers some benefits:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Lower service fees mean better rates for you OR faster turnaround</li>
                      <li>More flexible payment options</li>
                      <li>Direct communication channels</li>
                    </ul>
                    <p>
                      I&apos;ll send you details once we wrap up our current project. Looking forward to continuing our partnership!
                    </p>
                    <p>
                      Best,<br />
                      [Your Name]
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
                <h3 className="text-lg font-heading font-bold text-[#1e1541] mb-2">
                  Important Timing Notes
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Wait until current contracts are COMPLETED before mentioning new platform</li>
                  <li>Never use platform messaging to share external contact info</li>
                  <li>If client asks how to contact you directly, you can respond (this isn&apos;t solicitation)</li>
                  <li>Document all communications in case of disputes</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-heading font-bold text-[#1e1541] mb-4">
                  Client Prioritization Matrix
                </h3>
                <p className="text-gray-700 mb-4">
                  You can&apos;t migrate everyone at once. Prioritize strategically:
                </p>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-[#1e1541] text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-heading">Priority</th>
                        <th className="px-6 py-4 text-left font-heading">Client Type</th>
                        <th className="px-6 py-4 text-left font-heading">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 font-bold text-[#22c55e]">HIGH</td>
                        <td className="px-6 py-4">Repeat clients, high-value projects</td>
                        <td className="px-6 py-4">Migrate first, offer incentive</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-bold text-[#ef2b70]">MEDIUM</td>
                        <td className="px-6 py-4">One-time large projects</td>
                        <td className="px-6 py-4">Mention new option, no pressure</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-gray-600">LOW</td>
                        <td className="px-6 py-4">Small, infrequent clients</td>
                        <td className="px-6 py-4">Keep on current platform</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline & Transition Strategy */}
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-[#1e1541] mb-6">
              Recommended Transition Timeline
            </h2>
            <p className="text-gray-700 mb-6">
              Don&apos;t switch cold turkey. Use this 90-day phased approach:
            </p>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-heading font-bold text-[#ef2b70] mb-3">
                  Month 1: Preparation Phase
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Research and select new platform</li>
                  <li>✓ Review legal restrictions thoroughly</li>
                  <li>✓ Export all data from current platform</li>
                  <li>✓ Set up and optimize new profile</li>
                  <li>✓ Get first 2-3 reviews on new platform (small test projects)</li>
                  <li>✓ Build financial buffer (2-3 months expenses)</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-heading font-bold text-[#ef2b70] mb-3">
                  Month 2: Dual Platform Phase
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Continue current platform work (maintain income)</li>
                  <li>✓ Accept new clients ONLY on new platform</li>
                  <li>✓ Build reputation and reviews on new platform</li>
                  <li>✓ Complete current contracts professionally</li>
                  <li>✓ Test new platform&apos;s client quality and payment reliability</li>
                  <li>~ Income split: 70% old platform, 30% new platform</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-heading font-bold text-[#ef2b70] mb-3">
                  Month 3: Full Migration Phase
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Notify best clients about new platform (if legally allowed)</li>
                  <li>✓ Stop accepting new work on old platform</li>
                  <li>✓ Finish remaining old platform contracts</li>
                  <li>✓ Withdraw all pending payments</li>
                  <li>✓ Download final records for taxes</li>
                  <li>~ Income split: 30% old platform, 70% new platform</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-heading font-bold text-[#ef2b70] mb-3">
                  Month 4+: Post-Migration
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ 100% income from new platform/direct clients</li>
                  <li>✓ Keep old platform profile active but dormant (for credibility/referrals)</li>
                  <li>✓ Evaluate if migration achieved your goals</li>
                  <li>✓ Adjust strategy based on results</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-[#1e1541] mb-6">
              7 Costly Mistakes to Avoid
            </h2>
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-6">
                <h3 className="text-lg font-heading font-bold text-red-800 mb-2">
                  1. Burning Bridges
                </h3>
                <p className="text-gray-700">
                  Leaving negative reviews or complaining publicly about your old platform can damage your reputation. Stay professional.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6">
                <h3 className="text-lg font-heading font-bold text-red-800 mb-2">
                  2. Violating Terms of Service
                </h3>
                <p className="text-gray-700">
                  Sharing contact info in messages, circumventing fees while contracts are active, or other ToS violations can get you banned and lose pending payments.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6">
                <h3 className="text-lg font-heading font-bold text-red-800 mb-2">
                  3. Switching Without Financial Buffer
                </h3>
                <p className="text-gray-700">
                  Expect 30-50% income drop for 2-3 months during transition. Without savings, you&apos;ll panic and accept low-quality work.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6">
                <h3 className="text-lg font-heading font-bold text-red-800 mb-2">
                  4. Incomplete Profile on New Platform
                </h3>
                <p className="text-gray-700">
                  Rushing profile setup results in lower quality leads. Spend 2-3 weeks building a professional presence before going live.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6">
                <h3 className="text-lg font-heading font-bold text-red-800 mb-2">
                  5. Switching for the Wrong Reasons
                </h3>
                <p className="text-gray-700">
                  If the problem is your skills or pricing strategy, switching platforms won&apos;t help. Fix the root cause first.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6">
                <h3 className="text-lg font-heading font-bold text-red-800 mb-2">
                  6. Abandoning Old Clients Abruptly
                </h3>
                <p className="text-gray-700">
                  Finish current projects professionally. Your reputation follows you across platforms through word-of-mouth and social proof.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6">
                <h3 className="text-lg font-heading font-bold text-red-800 mb-2">
                  7. Not Testing New Platform First
                </h3>
                <p className="text-gray-700">
                  Complete 2-3 small projects on new platform before committing fully. Verify payment reliability, client quality, and support responsiveness.
                </p>
              </div>
            </div>
          </div>

          {/* Alternative Paths */}
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-[#1e1541] mb-6">
              Alternative Migration Paths
            </h2>
            <p className="text-gray-700 mb-6">
              Switching to another platform isn&apos;t your only option. Consider these alternatives:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-heading font-bold text-[#ef2b70] mb-3">
                  Build Your Own Website
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Pros:</strong> Zero platform fees, full control, build your brand
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Cons:</strong> Need to handle marketing, payments, contracts yourself
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Best for:</strong> Established freelancers with existing client base
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-heading font-bold text-[#ef2b70] mb-3">
                  Multi-Platform Strategy
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Pros:</strong> Diversify income, test multiple platforms, hedge risk
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Cons:</strong> More complex to manage, divided attention
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Best for:</strong> Freelancers who want to maximize opportunities
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-heading font-bold text-[#ef2b70] mb-3">
                  Agency Model
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Pros:</strong> Higher project values, team collaboration, scalability
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Cons:</strong> Management overhead, need to hire/coordinate others
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Best for:</strong> Senior freelancers ready to scale beyond solo work
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-heading font-bold text-[#ef2b70] mb-3">
                  Hybrid: Platform + Direct
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Pros:</strong> Platform for new clients, direct for repeat work
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Cons:</strong> Still pay platform fees for initial client acquisition
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Best for:</strong> Most freelancers - best of both worlds
                </p>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="bg-[#1e1541] text-white rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-heading font-bold mb-6">Real Success Stories</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-[#ef2b70] pl-6">
                <p className="text-lg mb-2">
                  &quot;I switched from Upwork to Contra after 3 years. Took 60 days, but now I keep 97% of earnings instead of 75%. That&apos;s $22K extra per year.&quot;
                </p>
                <p className="text-white/70 text-sm">— Sarah K., Graphic Designer</p>
              </div>
              <div className="border-l-4 border-[#ef2b70] pl-6">
                <p className="text-lg mb-2">
                  &quot;Used multi-platform strategy: Upwork for new clients, moved them to my website after first project. Income up 40%, stress down significantly.&quot;
                </p>
                <p className="text-white/70 text-sm">— Marcus T., Web Developer</p>
              </div>
              <div className="border-l-4 border-[#ef2b70] pl-6">
                <p className="text-lg mb-2">
                  &quot;Switched from Fiverr to Toptal. Had to pass vetting, but now earn 3x per hour. Only took 2 months to replace my old income.&quot;
                </p>
                <p className="text-white/70 text-sm">— Priya R., Software Engineer</p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-gradient-to-r from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">
              Ready to Find Your New Platform Home?
            </h2>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Compare features, fees, and client quality across all major freelance platforms
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
                Avoid These Red Flags
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
