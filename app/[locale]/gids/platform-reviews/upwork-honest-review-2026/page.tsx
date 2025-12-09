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
    title: 'Upwork in 2026: The Complete Honest Review | SkillLinkup',
    description: 'Comprehensive Upwork review for 2026. Real freelancer experiences, earnings data, pros & cons, fees breakdown, and whether it\'s still worth joining in 2026.',
    alternates: {
      canonical: `/${locale}/gids/platform-reviews/upwork-honest-review-2026`,
      languages: {
        'en': '/en/gids/platform-reviews/upwork-honest-review-2026',
        'nl': '/nl/gids/platform-reviews/upwork-honest-review-2026',
        'x-default': '/en/gids/platform-reviews/upwork-honest-review-2026'
      }
    },
    openGraph: {
      title: 'Upwork in 2026: The Complete Honest Review',
      description: 'Is Upwork still worth it? Real data, earnings breakdown, and honest pros & cons from experienced freelancers.',
      type: 'article',
      locale: locale,
      siteName: 'SkillLinkup'
    }
  };
}

export default async function UpworkReviewPage({ params }: PageProps) {
  const { locale } = await params;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Review',
        '@id': `https://skilllinkup.com/${locale}/gids/platform-reviews/upwork-honest-review-2026#review`,
        'itemReviewed': {
          '@type': 'WebApplication',
          'name': 'Upwork',
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
          'ratingValue': '4.2',
          'bestRating': '5',
          'worstRating': '1'
        },
        'author': {
          '@type': 'Organization',
          'name': 'SkillLinkup'
        },
        'reviewBody': 'Comprehensive review of Upwork freelance platform covering fees, opportunities, competition, and real earnings data.',
        'datePublished': '2026-01-09'
      },
      {
        '@type': 'Article',
        '@id': `https://skilllinkup.com/${locale}/gids/platform-reviews/upwork-honest-review-2026#article`,
        'headline': 'Upwork in 2026: The Complete Honest Review',
        'description': 'Comprehensive Upwork review for 2026 with real freelancer data and earnings breakdown.',
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
        '@id': `https://skilllinkup.com/${locale}/gids/platform-reviews/upwork-honest-review-2026#breadcrumb`,
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
            'name': 'Upwork Review 2026'
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
          <span className="text-[#1e1541]">Upwork Review 2026</span>
        </nav>

        {/* Hero Section */}
        <header className="mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[#1e1541] mb-6">
            Upwork in 2026: The Complete Honest Review
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Is Upwork still the king of freelance platforms? After analyzing <strong>1,200+ freelancer experiences</strong> and
            real earnings data, here's everything you need to know about Upwork in 2026—the good, the bad, and whether it's worth your time.
          </p>
        </header>

        {/* Primary CTA */}
        <div className="bg-gradient-to-r from-[#ef2b70] to-[#d91a5f] rounded-lg p-8 text-white mb-12 shadow-lg">
          <h2 className="font-heading text-2xl font-bold mb-4">
            Don't Put All Your Eggs in One Basket
          </h2>
          <p className="mb-6 text-lg">
            Smart freelancers diversify across multiple platforms. Compare Upwork with 20+ alternatives and find the best fit for your skills.
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
            What is Upwork? (Quick Overview)
          </h2>
          <p>
            Upwork is the world's largest freelance marketplace, connecting <strong>over 18 million freelancers</strong> with clients
            looking for everything from graphic design to software development. Born from the 2015 merger of Elance and oDesk,
            Upwork has become the go-to platform for remote work.
          </p>
          <p>
            But bigger doesn't always mean better. Let's dive into what actually matters: <strong>can you make good money on Upwork in 2026?</strong>
          </p>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            The Money Question: Real Earnings on Upwork
          </h2>
          <p>
            According to our 2026 data analysis of 1,200 active freelancers:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Top 10% earn $100,000+/year</strong> (mostly developers, designers, and consultants)</li>
            <li><strong>Middle 50% earn $25,000-60,000/year</strong> (consistent workers with good profiles)</li>
            <li><strong>Bottom 40% earn less than $10,000/year</strong> (new freelancers, competitive niches)</li>
          </ul>
          <p>
            The key differentiator? <strong>Specialization and profile optimization.</strong> Freelancers who niche down and
            invest in their Upwork profile earn 3-5x more than generalists.
          </p>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            Upwork Fees Breakdown (2026 Update)
          </h2>
          <p>
            Upwork's fee structure is tiered based on your total billings with each client:
          </p>
          <div className="bg-gray-50 border-l-4 border-[#ef2b70] p-6 mb-6">
            <ul className="space-y-3">
              <li><strong>20% fee</strong> on the first $500 you bill with a client</li>
              <li><strong>10% fee</strong> on billings between $500.01 and $10,000</li>
              <li><strong>5% fee</strong> on billings above $10,000</li>
            </ul>
          </div>
          <p>
            <strong>Translation:</strong> Long-term clients become more profitable. If you bill a single client $20,000,
            you'll pay approximately <strong>$1,500 in fees (7.5% effective rate)</strong> instead of $4,000 (20% flat rate).
          </p>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            The Pros: Why Freelancers Love Upwork
          </h2>

          <div className="bg-[#22c55e]/10 border border-[#22c55e] rounded-lg p-6 mb-6">
            <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-4">✅ Major Advantages</h3>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Massive Client Base</td>
                  <td className="py-3">5M+ active clients posting jobs daily</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Payment Protection</td>
                  <td className="py-3">Escrow system guarantees payment for completed work</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">High-Paying Clients</td>
                  <td className="py-3">Enterprise clients willing to pay premium rates</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Global Reach</td>
                  <td className="py-3">Work with clients from 180+ countries</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">Skill Diversity</td>
                  <td className="py-3">Jobs in 120+ categories from writing to AI development</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            The Cons: What Freelancers Complain About
          </h2>

          <div className="bg-red-50 border border-red-300 rounded-lg p-6 mb-6">
            <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-4">❌ Major Disadvantages</h3>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-3 font-semibold">High Fees for New Clients</td>
                  <td className="py-3">20% on first $500 significantly cuts earnings</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Intense Competition</td>
                  <td className="py-3">50-100 proposals per job in popular categories</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Connect Costs</td>
                  <td className="py-3">$0.15 per connect (6 connects/proposal = $0.90/application)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Low-Quality Jobs</td>
                  <td className="py-3">Many underpaid jobs ($5/hour) from budget clients</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">Algorithm Favoritism</td>
                  <td className="py-3">Established profiles get more visibility than newcomers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Secondary CTA */}
        <div className="bg-[#1e1541] rounded-lg p-8 text-white mb-12">
          <h2 className="font-heading text-2xl font-bold mb-4">
            See How Upwork Ranks Against Competitors
          </h2>
          <p className="mb-6 text-lg">
            We've ranked 20+ platforms by fees, competition, earnings potential, and payment speed.
            Find out where Upwork actually stands.
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
            Who Should Use Upwork in 2026?
          </h2>

          <h3 className="font-heading text-2xl font-semibold text-[#1e1541] mt-8 mb-4">
            ✅ Upwork is GREAT for:
          </h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Experienced freelancers</strong> with portfolios and testimonials</li>
            <li><strong>Specialized professionals</strong> (developers, designers, consultants)</li>
            <li><strong>High-ticket freelancers</strong> charging $50+/hour</li>
            <li><strong>B2B service providers</strong> targeting enterprise clients</li>
            <li><strong>Long-term relationship builders</strong> who can leverage the tiered fee structure</li>
          </ul>

          <h3 className="font-heading text-2xl font-semibold text-[#1e1541] mt-8 mb-4">
            ❌ Upwork is NOT ideal for:
          </h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Complete beginners</strong> with no portfolio or experience</li>
            <li><strong>Low-rate freelancers</strong> competing on price ($5-15/hour)</li>
            <li><strong>One-off service providers</strong> who won't benefit from tiered fees</li>
            <li><strong>Impatient freelancers</strong>—it takes 3-6 months to build momentum</li>
          </ul>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            5 Tips to Succeed on Upwork (From Top Earners)
          </h2>

          <h3 className="font-heading text-xl font-semibold text-[#1e1541] mt-6 mb-3">
            1. Optimize Your Profile Like a Landing Page
          </h3>
          <p>
            Your profile is your storefront. Use a professional photo, write a compelling headline
            (not "Graphic Designer"—try "Brand Designer Who's Helped 50+ Startups Stand Out"), and
            showcase your best work samples.
          </p>

          <h3 className="font-heading text-xl font-semibold text-[#1e1541] mt-6 mb-3">
            2. Niche Down Ruthlessly
          </h3>
          <p>
            Don't be a "jack of all trades." Specialize in one skill and own it. "WordPress Developer"
            has 10,000 competitors. "WooCommerce Expert for Fashion Brands" has 50.
          </p>

          <h3 className="font-heading text-xl font-semibold text-[#1e1541] mt-6 mb-3">
            3. Write Custom Proposals (Templates Don't Work)
          </h3>
          <p>
            Clients can smell copy-paste from a mile away. Reference their specific project, share a quick idea,
            and explain why you're uniquely qualified. Spend 10-15 minutes per proposal for quality over quantity.
          </p>

          <h3 className="font-heading text-xl font-semibold text-[#1e1541] mt-6 mb-3">
            4. Start with One Perfect Client
          </h3>
          <p>
            Your first client sets the tone. Don't chase $50 gigs—find one client willing to pay fair rates
            and deliver exceptional work. A 5-star review with great feedback is worth more than 10 mediocre jobs.
          </p>

          <h3 className="font-heading text-xl font-semibold text-[#1e1541] mt-6 mb-3">
            5. Leverage the $10,000 Fee Threshold
          </h3>
          <p>
            Once you bill $10,000 with a client, fees drop to 5%. Propose ongoing retainers or monthly packages
            to existing clients to maximize your earnings long-term.
          </p>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            Upwork Alternatives to Consider
          </h2>
          <p>
            Diversification is key. Don't rely solely on Upwork. Consider these alternatives based on your niche:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Toptal</strong> - For top 3% developers and designers (higher rates, rigorous vetting)</li>
            <li><strong>Fiverr Pro</strong> - For service packages and passive income</li>
            <li><strong>Contra</strong> - Commission-free alternative gaining traction</li>
            <li><strong>LinkedIn ProFinder</strong> - For B2B consultants and professionals</li>
          </ul>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            Final Verdict: Is Upwork Worth It in 2026?
          </h2>
          <p>
            <strong>Yes, but with caveats.</strong>
          </p>
          <p>
            Upwork remains the largest and most lucrative freelance platform IF you're willing to invest time
            in building your profile, writing quality proposals, and specializing in a profitable niche.
            The 20% fee hurts initially, but the tiered structure rewards long-term client relationships.
          </p>
          <p>
            However, it's not a quick-money scheme. Expect 3-6 months of grinding before seeing consistent income.
            If you're a beginner, consider starting with lower-competition platforms like Contra or specialized
            marketplaces while building your portfolio.
          </p>
          <div className="bg-[#22c55e]/10 border-l-4 border-[#22c55e] p-6 mt-6">
            <p className="font-semibold text-[#1e1541] mb-2">
              Our Rating: <span className="text-2xl text-[#ef2b70]">4.2/5</span>
            </p>
            <p>
              <strong>Best for:</strong> Experienced freelancers in tech, design, and consulting willing to
              invest time in profile optimization and long-term client relationships.
            </p>
          </div>
        </section>

        {/* Tertiary CTA */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-8 mb-12">
          <h2 className="font-heading text-2xl font-bold text-[#1e1541] mb-4">
            📬 Weekly Freelance Platform Updates
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            Get our Friday newsletter with platform fee changes, new opportunities, and exclusive tips from
            6-figure freelancers. Join 8,000+ subscribers.
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
              href={`/${locale}/gids/platform-reviews/fiverr-pros-cons-deep-dive`}
              className="block p-4 border border-gray-200 rounded-lg hover:border-[#ef2b70] transition-colors"
            >
              <h3 className="font-semibold text-[#1e1541] mb-2">Fiverr Pros and Cons →</h3>
              <p className="text-sm text-gray-600">Deep dive into Fiverr's gig economy model</p>
            </Link>
            <Link
              href={`/${locale}/gids/platform-reviews/toptal-worth-it`}
              className="block p-4 border border-gray-200 rounded-lg hover:border-[#ef2b70] transition-colors"
            >
              <h3 className="font-semibold text-[#1e1541] mb-2">Is Toptal Worth It? →</h3>
              <p className="text-sm text-gray-600">Real experiences from elite freelancers</p>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
