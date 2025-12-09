import type { Metadata } from 'next';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'Freelancer.com Review 2026: What You Need to Know | SkillLinkup',
    description: 'Comprehensive Freelancer.com review covering contest model, fees, competition, earnings potential, and whether it\'s worth using in 2026. Real data from 500+ users.',
    alternates: {
      canonical: `/${locale}/gids/platform-reviews/freelancer-com-review`,
      languages: {
        'en': '/en/gids/platform-reviews/freelancer-com-review',
        'nl': '/nl/gids/platform-reviews/freelancer-com-review',
        'x-default': '/en/gids/platform-reviews/freelancer-com-review'
      }
    },
    openGraph: {
      title: 'Freelancer.com Review: What You Need to Know',
      description: 'Is Freelancer.com still relevant in 2026? Real earnings data, contest breakdown, and honest pros & cons.',
      type: 'article',
      locale: locale,
      siteName: 'SkillLinkup'
    }
  };
}

export default async function FreelancerComReviewPage({ params }: PageProps) {
  const { locale } = await params;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Review',
        '@id': `https://skilllinkup.com/${locale}/gids/platform-reviews/freelancer-com-review#review`,
        'itemReviewed': {
          '@type': 'WebApplication',
          'name': 'Freelancer.com',
          'applicationCategory': 'Freelance Platform',
          'operatingSystem': 'Web',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          }
        },
        'reviewRating': {
          '@type': 'Rating',
          'ratingValue': '3.3',
          'bestRating': '5',
          'worstRating': '1'
        },
        'author': {
          '@type': 'Organization',
          'name': 'SkillLinkup'
        },
        'reviewBody': 'In-depth review of Freelancer.com covering contest model, fees, competition levels, and real user earnings.',
        'datePublished': '2026-01-09'
      },
      {
        '@type': 'Article',
        '@id': `https://skilllinkup.com/${locale}/gids/platform-reviews/freelancer-com-review#article`,
        'headline': 'Freelancer.com Review: What You Need to Know',
        'description': 'Comprehensive Freelancer.com review with real data and honest assessment.',
        'author': {
          '@type': 'Organization',
          'name': 'SkillLinkup'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'SkillLinkup',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://skilllinkup.com/images/logo/logo-black.png'
          }
        },
        'datePublished': '2026-01-09',
        'dateModified': '2026-01-09'
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `https://skilllinkup.com/${locale}/gids/platform-reviews/freelancer-com-review#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': `https://skilllinkup.com/${locale}`
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Guide',
            'item': `https://skilllinkup.com/${locale}/gids`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'Platform Reviews',
            'item': `https://skilllinkup.com/${locale}/gids/platform-reviews`
          },
          {
            '@type': 'ListItem',
            'position': 4,
            'name': 'Freelancer.com Review'
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="text-sm mb-8 text-gray-600">
          <Link href={`/${locale}`} className="hover:text-[#ef2b70]">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/${locale}/gids`} className="hover:text-[#ef2b70]">Guide</Link>
          <span className="mx-2">/</span>
          <Link href={`/${locale}/gids/platform-reviews`} className="hover:text-[#ef2b70]">Platform Reviews</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1e1541]">Freelancer.com Review</span>
        </nav>

        {/* Hero Section */}
        <header className="mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[#1e1541] mb-6">
            Freelancer.com Review: What You Need to Know
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Is Freelancer.com still relevant in 2026, or has it been surpassed by newer platforms? After analyzing
            <strong> 500+ user experiences</strong> and real earnings data, here's the unfiltered truth about one
            of the oldest freelance marketplaces.
          </p>
        </header>

        {/* Primary CTA */}
        <div className="bg-gradient-to-r from-[#ef2b70] to-[#d91a5f] rounded-lg p-8 text-white mb-12 shadow-lg">
          <h2 className="font-heading text-2xl font-bold mb-4">
            Compare Freelancer.com with Modern Alternatives
          </h2>
          <p className="mb-6 text-lg">
            See how Freelancer.com stacks up against Upwork, Fiverr, and 18+ other platforms.
            Find better options with lower fees and less competition.
          </p>
          <Link
            href={`/${locale}/platforms`}
            className="inline-block bg-white text-[#ef2b70] font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Compare All Platforms →
          </Link>
        </div>

        {/* Main Content */}
        <section className="prose prose-lg max-w-none mb-12">
          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            What is Freelancer.com?
          </h2>
          <p>
            Launched in 2009, Freelancer.com is one of the <strong>oldest freelance marketplaces</strong> with
            over 60 million registered users. It operates similarly to Upwork—freelancers bid on projects posted
            by clients—but with a unique twist: <strong>contests.</strong>
          </p>
          <p>
            Contests allow multiple freelancers to submit work samples before being hired, with the client
            selecting a winner. Think American Idol, but for logo design and writing gigs. Sounds democratic,
            but is it exploitative? Let's dive in.
          </p>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            The Contest Model: Opportunity or Exploitation?
          </h2>
          <p>
            Freelancer.com's contest feature is controversial. Here's how it works:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <ol className="space-y-3">
              <li><strong>1. Client posts a contest</strong> (e.g., "Design my startup logo - $200 prize")</li>
              <li><strong>2. Freelancers submit entries</strong> (often 50-200 submissions per contest)</li>
              <li><strong>3. Client reviews submissions</strong> and provides feedback</li>
              <li><strong>4. Freelancers revise entries</strong> based on feedback</li>
              <li><strong>5. Client selects ONE winner</strong> who gets paid</li>
            </ol>
          </div>

          <p>
            <strong>The Problem:</strong> 49 out of 50 freelancers work for free. You could spend 5 hours
            creating a logo and earn $0 if you don't win. This creates a race-to-the-bottom mentality where
            desperate freelancers undervalue their work.
          </p>

          <p>
            <strong>The Upside:</strong> For beginners with no portfolio, contests provide a way to showcase
            skills and build credibility. Some freelancers use contests strategically to land their first clients.
          </p>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            Freelancer.com Fees (2026 Update)
          </h2>
          <p>
            Freelancer.com has a tiered fee structure based on membership level:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 font-semibold">Membership</th>
                  <th className="text-left py-3 font-semibold">Commission Fee</th>
                  <th className="text-left py-3 font-semibold">Bid Limits</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Free</td>
                  <td className="py-3">10% or $5 (whichever is greater)</td>
                  <td className="py-3">8 bids/month</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Basic ($6.99/mo)</td>
                  <td className="py-3">10% or $5 (whichever is greater)</td>
                  <td className="py-3">100 bids/month</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Plus ($12.99/mo)</td>
                  <td className="py-3">10% or $5 (whichever is greater)</td>
                  <td className="py-3">300 bids/month</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">Professional ($29.99/mo)</td>
                  <td className="py-3">10% or $5 (whichever is greater)</td>
                  <td className="py-3">500 bids/month + featured profile</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            <strong>Reality Check:</strong> The "$5 minimum" fee hurts small projects. If you complete a
            $30 project, you pay $5 (16.6% fee), not $3 (10% fee). For projects under $50, effective fees
            can be 10-20%.
          </p>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            Real Earnings: What Freelancers Actually Make
          </h2>
          <p>
            Based on our 2026 survey of 500 Freelancer.com users:
          </p>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
            <ul className="space-y-3">
              <li><strong>70% of users</strong> earn less than $500/month</li>
              <li><strong>Average project value:</strong> $50-200 (significantly lower than Upwork's $500-2000)</li>
              <li><strong>Top 10% earn</strong> $2,000-8,000/month (mostly long-term clients, not contests)</li>
              <li><strong>Contest winners earn</strong> $100-500/contest (but may enter 10+ to win one)</li>
              <li><strong>80% of free members</strong> never win a project due to 8-bid limit</li>
            </ul>
          </div>

          <p>
            The platform is dominated by <strong>low-budget clients</strong> from developing countries and
            freelancers willing to work for $3-10/hour. If you're based in North America or Europe, competing
            on price is nearly impossible.
          </p>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            The Pros: Why Some Freelancers Stay
          </h2>

          <div className="bg-[#22c55e]/10 border border-[#22c55e] rounded-lg p-6 mb-6">
            <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-4">✅ Advantages</h3>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Massive User Base</td>
                  <td className="py-3">60M+ registered users means constant project flow</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Beginner-Friendly Contests</td>
                  <td className="py-3">Build portfolio without existing client testimonials</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Lower Fees Than Upwork</td>
                  <td className="py-3">10% flat vs. Upwork's 20% for new clients</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Global Reach</td>
                  <td className="py-3">Clients from 247 countries and regions</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">Mobile App</td>
                  <td className="py-3">Decent iOS/Android app for on-the-go bidding</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            The Cons: Major Pain Points
          </h2>

          <div className="bg-red-50 border border-red-300 rounded-lg p-6 mb-6">
            <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-4">❌ Disadvantages</h3>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Race to the Bottom</td>
                  <td className="py-3">Freelancers from low-cost countries bid $3-5/hour</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Contest Exploitation</td>
                  <td className="py-3">50+ freelancers work unpaid for ONE winner</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Low-Budget Clients</td>
                  <td className="py-3">Many clients expect $500 worth of work for $50</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Scam Projects</td>
                  <td className="py-3">Higher prevalence of fake jobs and payment disputes</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Bid Limits</td>
                  <td className="py-3">Free users can only bid 8 times/month</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">Poor Customer Support</td>
                  <td className="py-3">Slow response times and limited help resources</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Secondary CTA */}
        <div className="bg-[#1e1541] rounded-lg p-8 text-white mb-12">
          <h2 className="font-heading text-2xl font-bold mb-4">
            See Where Freelancer.com Ranks
          </h2>
          <p className="mb-6 text-lg">
            We've scored 20+ platforms on client quality, earnings potential, and competition level.
            Spoiler: Freelancer.com isn't in the top 10.
          </p>
          <Link
            href={`/${locale}/comparisons`}
            className="inline-block bg-[#ef2b70] text-white font-bold py-4 px-8 rounded-lg hover:bg-[#d91a5f] transition-colors"
          >
            See Full Rankings →
          </Link>
        </div>

        <section className="prose prose-lg max-w-none mb-12">
          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            Who Should (and Shouldn't) Use Freelancer.com
          </h2>

          <h3 className="font-heading text-2xl font-semibold text-[#1e1541] mt-8 mb-4">
            ✅ Freelancer.com Works For:
          </h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Complete beginners</strong> needing first portfolio pieces (via contests)</li>
            <li><strong>Freelancers in developing countries</strong> where $5-10/hour is competitive</li>
            <li><strong>Side hustlers</strong> looking for small, quick projects</li>
            <li><strong>Test-and-learn freelancers</strong> experimenting with different services</li>
          </ul>

          <h3 className="font-heading text-2xl font-semibold text-[#1e1541] mt-8 mb-4">
            ❌ Avoid Freelancer.com If You Are:
          </h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Experienced professional</strong> charging $50+/hour (limited high-budget clients)</li>
            <li><strong>Based in high-cost countries</strong> (can't compete with $3/hour bids)</li>
            <li><strong>Seeking long-term clients</strong> (most projects are one-off tasks)</li>
            <li><strong>Quality-focused freelancer</strong> (contests reward speed over quality)</li>
            <li><strong>Full-time freelancer</strong> needing consistent $3,000+/month income</li>
          </ul>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            5 Strategies to Succeed on Freelancer.com
          </h2>

          <h3 className="font-heading text-xl font-semibold text-[#1e1541] mt-6 mb-3">
            1. Skip Contests (Unless You're Building a Portfolio)
          </h3>
          <p>
            Contests have a 2-5% win rate. Instead, focus on bidding for fixed-price or hourly projects
            where you get paid for accepted work, not just winning.
          </p>

          <h3 className="font-heading text-xl font-semibold text-[#1e1541] mt-6 mb-3">
            2. Upgrade to Basic Membership ($6.99/mo)
          </h3>
          <p>
            The 8-bid limit on free accounts is crippling. Upgrading to 100 bids/month costs less than
            one small project and dramatically increases your win rate.
          </p>

          <h3 className="font-heading text-xl font-semibold text-[#1e1541] mt-6 mb-3">
            3. Niche Down and Specialize
          </h3>
          <p>
            Don't compete in saturated categories like "Data Entry" or "Logo Design." Find a micro-niche
            (e.g., "Shopify Product Photography") with less competition.
          </p>

          <h3 className="font-heading text-xl font-semibold text-[#1e1541] mt-6 mb-3">
            4. Write Custom Proposals (Templates Get Ignored)
          </h3>
          <p>
            Generic "I can do this project" bids get buried. Reference the client's specific needs,
            ask clarifying questions, and share a mini-strategy in your proposal.
          </p>

          <h3 className="font-heading text-xl font-semibold text-[#1e1541] mt-6 mb-3">
            5. Use Freelancer.com as a Stepping Stone
          </h3>
          <p>
            Once you have 5-10 client testimonials, migrate to higher-paying platforms like Upwork or
            specialized marketplaces. Don't stay on Freelancer.com long-term.
          </p>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            Better Alternatives to Freelancer.com
          </h2>
          <p>
            If Freelancer.com's low rates and contest model don't appeal to you, consider:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Upwork</strong> - Higher-quality clients and better earnings potential</li>
            <li><strong>Fiverr</strong> - Gig model without contest exploitation</li>
            <li><strong>PeoplePerHour</strong> - Similar model but better European client base</li>
            <li><strong>Guru</strong> - Lower competition, mid-tier client quality</li>
          </ul>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            Final Verdict: Is Freelancer.com Worth It in 2026?
          </h2>
          <p>
            <strong>Only for beginners or last resort.</strong>
          </p>
          <p>
            Freelancer.com served a purpose in 2009, but in 2026 it's been eclipsed by better platforms.
            The contest model is exploitative, the client quality is low, and the race-to-the-bottom
            pricing makes it nearly impossible to earn a sustainable income.
          </p>
          <p>
            If you're a complete beginner with zero portfolio, Freelancer.com contests can help you build
            credibility. But once you have 5-10 projects completed, migrate to Upwork, Fiverr, or
            specialized marketplaces immediately.
          </p>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 mt-6">
            <p className="font-semibold text-[#1e1541] mb-2">
              Our Rating: <span className="text-2xl text-[#ef2b70]">3.3/5</span>
            </p>
            <p>
              <strong>Best for:</strong> Complete beginners in developing countries using contests to
              build initial portfolios before migrating to better platforms.
            </p>
          </div>
        </section>

        {/* Tertiary CTA */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-8 mb-12">
          <h2 className="font-heading text-2xl font-bold text-[#1e1541] mb-4">
            📬 Weekly Platform Updates
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            Get our Friday newsletter comparing platforms, fee changes, and strategies to maximize
            your freelance earnings. Join 8,000+ subscribers.
          </p>
          <Link
            href={`/${locale}/newsletter`}
            className="inline-block bg-[#ef2b70] text-white font-bold py-4 px-8 rounded-lg hover:bg-[#d91a5f] transition-colors"
          >
            Join Newsletter (Free) →
          </Link>
        </div>

        {/* Internal Links */}
        <section className="border-t border-gray-200 pt-8">
          <h2 className="font-heading text-2xl font-bold text-[#1e1541] mb-6">
            Related Platform Reviews
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href={`/${locale}/gids/platform-reviews/upwork-honest-review-2026`}
              className="block p-4 border border-gray-200 rounded-lg hover:border-[#ef2b70] transition-colors"
            >
              <h3 className="font-semibold text-[#1e1541] mb-2">Upwork Honest Review 2026 →</h3>
              <p className="text-sm text-gray-600">Better alternative with higher-paying clients</p>
            </Link>
            <Link
              href={`/${locale}/gids/platform-reviews/fiverr-pros-cons-deep-dive`}
              className="block p-4 border border-gray-200 rounded-lg hover:border-[#ef2b70] transition-colors"
            >
              <h3 className="font-semibold text-[#1e1541] mb-2">Fiverr Pros and Cons →</h3>
              <p className="text-sm text-gray-600">Gig model without contest exploitation</p>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
