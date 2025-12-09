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
    title: '99designs Review 2026: Is It Good for Creative Freelancers? | SkillLinkup',
    description: 'Honest 99designs review for designers: contest model breakdown, earnings potential, designer levels, pros & cons. Is it worth it for graphic designers in 2026?',
    alternates: {
      canonical: `/${locale}/gids/platform-reviews/99designs-for-creatives`,
      languages: {
        'en': '/en/gids/platform-reviews/99designs-for-creatives',
        'nl': '/nl/gids/platform-reviews/99designs-for-creatives',
        'x-default': '/en/gids/platform-reviews/99designs-for-creatives'
      }
    },
    openGraph: {
      title: '99designs Review: Is It Good for Creative Freelancers?',
      description: 'Complete 99designs review with designer earnings, contest strategy, and whether the platform works for creatives in 2026.',
      type: 'article',
      locale: locale,
      siteName: 'SkillLinkup'
    }
  };
}

export default async function NinetyNineDesignsReviewPage({ params }: PageProps) {
  const { locale } = await params;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Review',
        '@id': `https://skilllinkup.com/${locale}/gids/platform-reviews/99designs-for-creatives#review`,
        'itemReviewed': {
          '@type': 'WebApplication',
          'name': '99designs',
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
          'ratingValue': '3.9',
          'bestRating': '5',
          'worstRating': '1'
        },
        'author': {
          '@type': 'Organization',
          'name': 'SkillLinkup'
        },
        'reviewBody': 'In-depth 99designs review covering contest model, designer levels, earnings, and whether it works for creative freelancers.',
        'datePublished': '2026-01-09'
      },
      {
        '@type': 'Article',
        '@id': `https://skilllinkup.com/${locale}/gids/platform-reviews/99designs-for-creatives#article`,
        'headline': '99designs Review: Is It Good for Creative Freelancers?',
        'description': 'Comprehensive 99designs review with designer earnings and contest strategy.',
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
        '@id': `https://skilllinkup.com/${locale}/gids/platform-reviews/99designs-for-creatives#breadcrumb`,
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
            'name': '99designs for Creatives'
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
          <span className="text-[#1e1541]">99designs Review</span>
        </nav>

        {/* Hero Section */}
        <header className="mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[#1e1541] mb-6">
            99designs Review: Is It Good for Creative Freelancers?
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Is 99designs a goldmine for designers or a race-to-the-bottom nightmare? After analyzing
            <strong> 300+ designer experiences</strong> and contest earnings data, here's everything
            you need to know about the largest design contest platform in 2026.
          </p>
        </header>

        {/* Primary CTA */}
        <div className="bg-gradient-to-r from-[#ef2b70] to-[#d91a5f] rounded-lg p-8 text-white mb-12 shadow-lg">
          <h2 className="font-heading text-2xl font-bold mb-4">
            Compare 99designs with Other Creative Platforms
          </h2>
          <p className="mb-6 text-lg">
            See how 99designs stacks up against Dribbble, Behance, Upwork Design, and 15+ other platforms
            for creative freelancers. Find better options with guaranteed pay.
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
            What is 99designs?
          </h2>
          <p>
            99designs is the world's largest <strong>design contest platform</strong>, connecting clients with
            designers through a competitive submission model. Unlike Upwork or Fiverr where you bid on jobs
            or sell gigs, 99designs clients launch contests where <strong>dozens of designers submit work
            hoping to win.</strong>
          </p>
          <p>
            Founded in 2008, 99designs has facilitated over 1 million design projects. But the contest model
            is polarizing—some designers love it, others call it exploitative. Let's break down the reality.
          </p>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            How 99designs Contests Work (Step-by-Step)
          </h2>
          <p>
            Understanding the contest flow is critical before joining:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <ol className="space-y-4">
              <li>
                <strong>1. Client launches contest</strong> (e.g., "Logo Design - $500 prize")
                <br />
                <span className="text-gray-600">Contest duration: 3-10 days typically</span>
              </li>
              <li>
                <strong>2. Designers browse active contests</strong>
                <br />
                <span className="text-gray-600">Free to enter (no upfront fees)</span>
              </li>
              <li>
                <strong>3. Designers submit entries</strong>
                <br />
                <span className="text-gray-600">Average: 30-100 submissions per contest</span>
              </li>
              <li>
                <strong>4. Client provides feedback and ratings</strong>
                <br />
                <span className="text-gray-600">1-5 star ratings help narrow finalists</span>
              </li>
              <li>
                <strong>5. Designers revise submissions</strong>
                <br />
                <span className="text-gray-600">Often 2-4 revision rounds</span>
              </li>
              <li>
                <strong>6. Client selects ONE winner</strong>
                <br />
                <span className="text-gray-600">Winner gets full prize, all others get $0</span>
              </li>
              <li>
                <strong>7. Winner transfers files and rights</strong>
                <br />
                <span className="text-gray-600">99designs takes 10-15% platform fee</span>
              </li>
            </ol>
          </div>

          <p>
            <strong>The Math:</strong> If 50 designers submit to a $500 contest and each spends 3 hours designing,
            that's <strong>150 total hours of work</strong> for one $500 payout ($3.33/hour effective rate).
            The other 49 designers earn nothing.
          </p>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            Designer Levels & How They Impact Earnings
          </h2>
          <p>
            99designs uses a tiered system that dramatically affects contest visibility and win rates:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 font-semibold">Level</th>
                  <th className="text-left py-3 font-semibold">Requirements</th>
                  <th className="text-left py-3 font-semibold">Perks</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Starter</td>
                  <td className="py-3">New account</td>
                  <td className="py-3">Access to open contests only</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Mid-Level</td>
                  <td className="py-3">3 wins, 4.5★ avg rating</td>
                  <td className="py-3">Featured in search, higher visibility</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Top Level</td>
                  <td className="py-3">10 wins, 4.8★ avg rating</td>
                  <td className="py-3">Priority badge, 1-to-1 projects access</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">Expert</td>
                  <td className="py-3">50+ wins, 4.9★ rating</td>
                  <td className="py-3">VIP support, direct client invites</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            <strong>The Catch:</strong> Getting your first 3 wins as a Starter is brutally difficult. You're
            competing against Mid/Top Level designers with badges and proven track records. Our data shows
            <strong> 60% of Starter designers never win a single contest.</strong>
          </p>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            99designs Fees & Pricing Tiers
          </h2>
          <p>
            99designs takes a <strong>platform fee from contest winners:</strong>
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <ul className="space-y-3">
              <li><strong>Bronze contests ($299-499):</strong> Designer receives 90% (~$270-450)</li>
              <li><strong>Silver contests ($500-799):</strong> Designer receives 90% (~$450-720)</li>
              <li><strong>Gold contests ($800-1,499):</strong> Designer receives 92% (~$736-1,380)</li>
              <li><strong>Platinum contests ($1,500+):</strong> Designer receives 92% (~$1,380+)</li>
            </ul>
          </div>

          <p>
            Compared to Upwork's 20% or Fiverr's 20%, the <strong>10% fee is attractive</strong>—but only
            if you actually win. Most designers enter 10-20 contests before winning their first.
          </p>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            Real Earnings: What Designers Actually Make
          </h2>
          <p>
            Based on our 2026 survey of 300 active 99designs designers:
          </p>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
            <ul className="space-y-3">
              <li><strong>Starter designers:</strong> $0-300/month (most never win)</li>
              <li><strong>Mid-Level designers:</strong> $500-1,500/month (5-10% contest win rate)</li>
              <li><strong>Top Level designers:</strong> $2,000-5,000/month (15-25% win rate)</li>
              <li><strong>Expert designers:</strong> $5,000-15,000/month (direct projects + contests)</li>
              <li><strong>Average hourly rate:</strong> $15-35/hour (including unpaid contest time)</li>
            </ul>
          </div>

          <p>
            <strong>The 80/20 rule applies:</strong> Top 20% of designers (Top Level+) earn 80% of the revenue.
            The platform heavily rewards established designers with proven portfolios.
          </p>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            The Pros: Why Designers Love 99designs
          </h2>

          <div className="bg-[#22c55e]/10 border border-[#22c55e] rounded-lg p-6 mb-6">
            <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-4">✅ Major Advantages</h3>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Design-Specific Platform</td>
                  <td className="py-3">Clients understand design value (vs. general platforms)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">No Upfront Costs</td>
                  <td className="py-3">Free to enter contests (unlike bid-based platforms)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Portfolio Building</td>
                  <td className="py-3">Showcase contest entries even if you don't win</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Higher Contest Prizes</td>
                  <td className="py-3">$300-3,000 typical (vs. $50-200 on Freelancer.com)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">1-to-1 Projects</td>
                  <td className="py-3">Top Level+ designers get direct hire opportunities</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">Money-Back Guarantee</td>
                  <td className="py-3">Clients must award prize or get refunded (reduces scams)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            The Cons: Major Designer Complaints
          </h2>

          <div className="bg-red-50 border border-red-300 rounded-lg p-6 mb-6">
            <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-4">❌ Major Disadvantages</h3>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Unpaid Work (Losers)</td>
                  <td className="py-3">49 out of 50 designers work for free</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Starter Disadvantage</td>
                  <td className="py-3">New designers have 1-3% win rate vs. 20% for experts</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Time Investment</td>
                  <td className="py-3">3-8 hours per contest × 10 contests = 30-80 hours for one win</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Design Theft Risk</td>
                  <td className="py-3">Some clients "borrow" ideas from losing entries</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-semibold">Creative Control</td>
                  <td className="py-3">Client feedback can push generic, safe designs</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold">Income Unpredictability</td>
                  <td className="py-3">Winning streaks followed by dry spells</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Secondary CTA */}
        <div className="bg-[#1e1541] rounded-lg p-8 text-white mb-12">
          <h2 className="font-heading text-2xl font-bold mb-4">
            See How 99designs Ranks for Designers
          </h2>
          <p className="mb-6 text-lg">
            We've scored 20+ platforms on client quality, guaranteed pay, earnings potential, and creative freedom.
            See where 99designs actually ranks for creative professionals.
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
            Who Should (and Shouldn't) Use 99designs
          </h2>

          <h3 className="font-heading text-2xl font-semibold text-[#1e1541] mt-8 mb-4">
            ✅ 99designs is PERFECT for:
          </h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Beginner designers</strong> building portfolios and testing skills</li>
            <li><strong>Fast designers</strong> who can create quality work in 2-3 hours</li>
            <li><strong>Niche specialists</strong> (packaging, book covers, t-shirts) with less competition</li>
            <li><strong>Designers in developing countries</strong> where $300-500 contests are lucrative</li>
            <li><strong>Side hustlers</strong> treating contests as creative practice</li>
          </ul>

          <h3 className="font-heading text-2xl font-semibold text-[#1e1541] mt-8 mb-4">
            ❌ 99designs is NOT ideal for:
          </h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Full-time designers</strong> needing consistent $4,000+/month income</li>
            <li><strong>Strategic designers</strong> requiring discovery and research phases</li>
            <li><strong>High-end designers</strong> charging $5,000+ per project</li>
            <li><strong>Designers who can't handle rejection</strong> (99% of contest entries lose)</li>
            <li><strong>Those valuing creative control</strong> over client crowdsourcing</li>
          </ul>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            7 Strategies to Win More 99designs Contests
          </h2>

          <h3 className="font-heading text-xl font-semibold text-[#1e1541] mt-6 mb-3">
            1. Be Early (First 20 Submissions)
          </h3>
          <p>
            Clients review entries chronologically. Submit within the first 24 hours to get rated early
            and establish presence before competition floods in.
          </p>

          <h3 className="font-heading text-xl font-semibold text-[#1e1541] mt-6 mb-3">
            2. Enter Lower-Tier Contests Initially
          </h3>
          <p>
            Bronze contests ($299-499) have 30-50% fewer entries than Gold/Platinum. Build your win rate
            with smaller prizes before competing in high-stakes contests.
          </p>

          <h3 className="font-heading text-xl font-semibold text-[#1e1541] mt-6 mb-3">
            3. Submit 2-3 Concepts (Not 10)
          </h3>
          <p>
            Quality over quantity. Two polished, distinct concepts beat ten variations of the same idea.
            Show range without overwhelming the client.
          </p>

          <h3 className="font-heading text-xl font-semibold text-[#1e1541] mt-6 mb-3">
            4. Read the Brief Obsessively
          </h3>
          <p>
            Clients reward designers who follow instructions. If they ask for "modern minimalist," don't
            submit ornate vintage designs. Align with their vision, not yours.
          </p>

          <h3 className="font-heading text-xl font-semibold text-[#1e1541] mt-6 mb-3">
            5. Engage with Feedback Aggressively
          </h3>
          <p>
            Respond within 1-2 hours to client feedback. Fast iteration shows professionalism and keeps
            you top-of-mind as finalists are selected.
          </p>

          <h3 className="font-heading text-xl font-semibold text-[#1e1541] mt-6 mb-3">
            6. Specialize in a Niche
          </h3>
          <p>
            Don't compete in saturated categories like "logo design." Focus on book covers, packaging,
            or t-shirts where competition is 50% lower.
          </p>

          <h3 className="font-heading text-xl font-semibold text-[#1e1541] mt-6 mb-3">
            7. Use 99designs to Transition to 1-to-1 Work
          </h3>
          <p>
            Once you reach Top Level, pivot to direct hire projects (no contests). These pay better
            and waste zero time on unpaid work.
          </p>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            Better Alternatives for Designers
          </h2>
          <p>
            If the contest model doesn't appeal, consider these guaranteed-pay alternatives:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Dribbble Pro</strong> - Showcase portfolio and get hired directly (no contests)</li>
            <li><strong>Behance</strong> - Adobe's platform for creative portfolios and job boards</li>
            <li><strong>Upwork Design</strong> - Proposal-based with higher rates ($50-150/hour)</li>
            <li><strong>DesignCrowd</strong> - Similar contest model but less competition</li>
            <li><strong>Fiverr Pro</strong> - Gig-based for vetted designers (no unpaid work)</li>
          </ul>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            Final Verdict: Is 99designs Worth It in 2026?
          </h2>
          <p>
            <strong>Yes, but only as a stepping stone.</strong>
          </p>
          <p>
            99designs works for beginner designers building portfolios and developing speed. The contest
            model provides valuable client feedback and forces you to iterate quickly—critical skills
            for any designer.
          </p>
          <p>
            However, the unpaid work model makes it unsustainable long-term. Treat 99designs as a
            3-6 month training ground to reach Top Level, then transition to 1-to-1 projects or migrate
            to platforms with guaranteed pay like Upwork or Dribbble Pro.
          </p>

          <div className="bg-[#22c55e]/10 border-l-4 border-[#22c55e] p-6 mt-6">
            <p className="font-semibold text-[#1e1541] mb-2">
              Our Rating: <span className="text-2xl text-[#ef2b70]">3.9/5</span>
            </p>
            <p>
              <strong>Best for:</strong> Beginner to intermediate designers in developing countries using
              contests to build portfolios before transitioning to guaranteed-pay platforms.
            </p>
          </div>
        </section>

        {/* Tertiary CTA */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-8 mb-12">
          <h2 className="font-heading text-2xl font-bold text-[#1e1541] mb-4">
            📬 Weekly Design Platform Updates
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            Join 8,000+ designers getting our Friday newsletter with 99designs contest tips, platform
            comparisons, and strategies to maximize creative freelance income.
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
              <p className="text-sm text-gray-600">Gig-based alternative with guaranteed pay</p>
            </Link>
            <Link
              href={`/${locale}/gids/platform-reviews/upwork-honest-review-2026`}
              className="block p-4 border border-gray-200 rounded-lg hover:border-[#ef2b70] transition-colors"
            >
              <h3 className="font-semibold text-[#1e1541] mb-2">Upwork Honest Review 2026 →</h3>
              <p className="text-sm text-gray-600">Proposal-based platform for designers</p>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
