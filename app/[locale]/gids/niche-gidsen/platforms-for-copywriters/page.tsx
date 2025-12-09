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

  const slug = 'platforms-for-copywriters';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/gids/niche-gidsen/${slug}`;

  return {
    title: "Top Freelance Platforms for Copywriters & Content Writers in 2026",
    description: "Find the best platforms for freelance copywriters. Compare rates ($0.05-$2/word), project types, and client quality. From Contently to Upwork.",
    keywords: "freelance copywriting platforms, content writer jobs, copywriting gigs 2026, freelance writing websites, best platforms for writers",
    openGraph: {
      title: "Top Freelance Platforms for Copywriters & Content Writers in 2026",
      description: "Find the best platforms for freelance copywriters. Compare rates ($0.05-$2/word), project types, and client quality. From Contently to Upwork.",
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [
        {
          url: `${siteUrl}/images/og/gids-og.png`,
          width: 1200,
          height: 630,
          alt: 'Top Platforms for Copywriters 2026 - SkillLinkup',
        }
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Top Freelance Platforms for Copywriters & Content Writers in 2026",
      description: "Find the best platforms for freelance copywriters. Compare rates ($0.05-$2/word), project types, and client quality. From Contently to Upwork.",
      images: [`${siteUrl}/images/og/gids-og.png`],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function CopywriterPlatformsPage({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f8f9fb]">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#1e1541] via-[#2a1f5e] to-[#1e1541] text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                Best Platforms for Copywriters & Content Writers in 2026
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                You have the words. You need the clients. Where do professional writers actually find work that pays more than $0.05/word? This guide reveals 8 platforms where copywriters earn $500-5,000 per project.
              </p>
              <Link
                href={`/${locale}/platforms`}
                className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Compare All Platforms →
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">

          {/* Section 1: Quick Comparison */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              Copywriting Platforms at a Glance
            </h2>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#1e1541] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-heading font-semibold">Platform</th>
                      <th className="px-6 py-4 text-left font-heading font-semibold">Typical Rate</th>
                      <th className="px-6 py-4 text-left font-heading font-semibold">Commission</th>
                      <th className="px-6 py-4 text-left font-heading font-semibold">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-[#1e1541]">Contently</td>
                      <td className="px-6 py-4 text-[#64607d]">$0.50-$2/word</td>
                      <td className="px-6 py-4 text-[#64607d]">15-25%</td>
                      <td className="px-6 py-4 text-[#64607d]">Enterprise content</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-[#1e1541]">Scripted</td>
                      <td className="px-6 py-4 text-[#64607d]">$0.10-$0.50/word</td>
                      <td className="px-6 py-4 text-[#64607d]">30%</td>
                      <td className="px-6 py-4 text-[#64607d]">Volume content</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-[#1e1541]">Skyword</td>
                      <td className="px-6 py-4 text-[#64607d]">$0.25-$1/word</td>
                      <td className="px-6 py-4 text-[#64607d]">Variable</td>
                      <td className="px-6 py-4 text-[#64607d]">Brand storytelling</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-[#1e1541]">Upwork</td>
                      <td className="px-6 py-4 text-[#64607d]">$0.05-$1/word</td>
                      <td className="px-6 py-4 text-[#64607d]">5-20%</td>
                      <td className="px-6 py-4 text-[#64607d]">All niches</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-[#1e1541]">Fiverr Pro</td>
                      <td className="px-6 py-4 text-[#64607d]">$100-500/project</td>
                      <td className="px-6 py-4 text-[#ef2b70] font-semibold">20%</td>
                      <td className="px-6 py-4 text-[#64607d]">Packaged services</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-[#1e1541]">ProBlogger</td>
                      <td className="px-6 py-4 text-[#64607d]">$50-500/post</td>
                      <td className="px-6 py-4 text-[#22c55e] font-semibold">0% (job board)</td>
                      <td className="px-6 py-4 text-[#64607d]">Blog writing</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-[#1e1541]">Freelance Writing</td>
                      <td className="px-6 py-4 text-[#64607d]">$100-2,000/article</td>
                      <td className="px-6 py-4 text-[#22c55e] font-semibold">0% (job board)</td>
                      <td className="px-6 py-4 text-[#64607d]">Premium publications</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-[#1e1541]">Reedsy</td>
                      <td className="px-6 py-4 text-[#64607d]">$0.02-$0.10/word</td>
                      <td className="px-6 py-4 text-[#64607d]">10%</td>
                      <td className="px-6 py-4 text-[#64607d]">Book editing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 2: Platform Deep Dives */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              Platform-by-Platform Breakdown
            </h2>

            {/* Contently */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-heading font-bold text-2xl text-[#1e1541]">
                  1. Contently - Premium Content Marketing Platform
                </h3>
                <span className="bg-[#22c55e] text-white px-4 py-2 rounded-lg font-semibold text-sm">
                  Highest Rates
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ✅ Pros
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Highest rates ($0.50-$2/word)</li>
                    <li>• Enterprise clients (Fortune 500)</li>
                    <li>• Long-form content (1,500-3,000 words)</li>
                    <li>• Stable recurring work</li>
                    <li>• Editorial support and feedback</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ❌ Cons
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Application process (portfolio review)</li>
                    <li>• 15-25% platform fee</li>
                    <li>• Requires proven expertise</li>
                    <li>• Competitive selection</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#f8f9fb] rounded-lg p-6">
                <p className="text-[#1e1541] font-semibold mb-2">
                  💡 Perfect If:
                </p>
                <p className="text-[#64607d]">
                  You have 3+ years writing experience with published portfolio. You specialize in B2B, tech, healthcare, or finance content. You want stable, high-paying work with quality clients.
                </p>
              </div>
            </div>

            {/* Scripted */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-4">
                2. Scripted - Volume Content Marketplace
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ✅ Pros
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Steady work availability</li>
                    <li>• Clear project briefs</li>
                    <li>• Fast payments (weekly)</li>
                    <li>• Industry specialization options</li>
                    <li>• Easy to get started</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ❌ Cons
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Lower rates ($0.10-$0.50/word)</li>
                    <li>• 30% commission (highest)</li>
                    <li>• Strict deadlines</li>
                    <li>• Limited client interaction</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#f8f9fb] rounded-lg p-6">
                <p className="text-[#1e1541] font-semibold mb-2">
                  💡 Perfect If:
                </p>
                <p className="text-[#64607d]">
                  You want consistent work without client hunting. You can write quickly (800-1,000 words/hour). You prefer clear briefs over creative freedom. You're building your portfolio.
                </p>
              </div>
            </div>

            {/* Skyword */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-4">
                3. Skyword - Brand Storytelling Platform
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ✅ Pros
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Premium brands (Dell, IBM, Philips)</li>
                    <li>• Good rates ($0.25-$1/word)</li>
                    <li>• Creative storytelling focus</li>
                    <li>• Editorial collaboration</li>
                    <li>• Multimedia opportunities</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ❌ Cons
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Invitation-based access</li>
                    <li>• Requires strong portfolio</li>
                    <li>• Variable commission structure</li>
                    <li>• Competitive assignments</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#f8f9fb] rounded-lg p-6">
                <p className="text-[#1e1541] font-semibold mb-2">
                  💡 Perfect If:
                </p>
                <p className="text-[#64607d]">
                  You excel at brand storytelling and thought leadership. You have journalism or content marketing experience. You want to work with recognizable brands on creative campaigns.
                </p>
              </div>
            </div>

            {/* Upwork */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-heading font-bold text-2xl text-[#1e1541]">
                  4. Upwork - Largest Freelance Writing Marketplace
                </h3>
                <span className="bg-[#ef2b70] text-white px-4 py-2 rounded-lg font-semibold text-sm">
                  Most Projects
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ✅ Pros
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Thousands of writing jobs daily</li>
                    <li>• All niches (tech, health, travel, finance)</li>
                    <li>• Beginner-friendly</li>
                    <li>• Escrow payment protection</li>
                    <li>• Build long-term clients</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ❌ Cons
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• High competition (100+ proposals/job)</li>
                    <li>• 20% fee on first $500</li>
                    <li>• Connect costs ($0.15/bid)</li>
                    <li>• Rate varies widely ($0.05-$1/word)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#f8f9fb] rounded-lg p-6">
                <p className="text-[#1e1541] font-semibold mb-2">
                  💡 Perfect If:
                </p>
                <p className="text-[#64607d]">
                  You're starting your freelance writing career. You want niche flexibility. You're willing to write proposals. You can compete on value and quality, not just price.
                </p>
              </div>
            </div>

            {/* Fiverr Pro */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-4">
                5. Fiverr Pro - Package-Based Copywriting Services
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ✅ Pros
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Clients come to you (no bidding)</li>
                    <li>• Package pricing ($100-500+)</li>
                    <li>• Passive income potential</li>
                    <li>• Diverse services (web copy, emails, scripts)</li>
                    <li>• Pro badge credibility</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ❌ Cons
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• 20% commission</li>
                    <li>• Must create gig catalog</li>
                    <li>• Application for Pro badge</li>
                    <li>• Fixed deliverables per package</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#f8f9fb] rounded-lg p-6">
                <p className="text-[#1e1541] font-semibold mb-2">
                  💡 Perfect If:
                </p>
                <p className="text-[#64607d]">
                  You offer specific services (landing page copy, email sequences, product descriptions). You hate writing proposals. You want clients to discover you through search.
                </p>
              </div>
            </div>

            {/* ProBlogger */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-4">
                6. ProBlogger - Blog Writing Job Board
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ✅ Pros
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Zero platform fees</li>
                    <li>• Blog-focused opportunities</li>
                    <li>• Direct client relationships</li>
                    <li>• Clear pay rates upfront</li>
                    <li>• Quality job postings</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ❌ Cons
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Limited job volume</li>
                    <li>• No escrow protection</li>
                    <li>• Must apply individually</li>
                    <li>• Blog-only (not copywriting)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#f8f9fb] rounded-lg p-6">
                <p className="text-[#1e1541] font-semibold mb-2">
                  💡 Perfect If:
                </p>
                <p className="text-[#64607d]">
                  You specialize in blog content. You want direct relationships with publishers. You prefer traditional application process. You don't want to pay platform fees.
                </p>
              </div>
            </div>

            {/* Freelance Writing */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-4">
                7. Freelance Writing - Premium Publication Jobs
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ✅ Pros
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Premium rates ($100-2,000/article)</li>
                    <li>• Reputable publications</li>
                    <li>• Portfolio-building opportunities</li>
                    <li>• No platform fees</li>
                    <li>• Curated job listings</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ❌ Cons
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Highly competitive</li>
                    <li>• Requires strong portfolio</li>
                    <li>• Lower job volume</li>
                    <li>• Selective publications</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#f8f9fb] rounded-lg p-6">
                <p className="text-[#1e1541] font-semibold mb-2">
                  💡 Perfect If:
                </p>
                <p className="text-[#64607d]">
                  You have journalism experience or published clips. You want to write for well-known publications. You're willing to compete for quality over quantity.
                </p>
              </div>
            </div>

            {/* Reedsy */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-4">
                8. Reedsy - Book Editing & Writing Platform
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ✅ Pros
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Specialized in book projects</li>
                    <li>• Authors seeking editors/ghostwriters</li>
                    <li>• Project-based pricing</li>
                    <li>• 10% commission (reasonable)</li>
                    <li>• Free profile creation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ❌ Cons
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Lower rates ($0.02-$0.10/word)</li>
                    <li>• Book-focused only</li>
                    <li>• Long-term projects</li>
                    <li>• Application review process</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#f8f9fb] rounded-lg p-6">
                <p className="text-[#1e1541] font-semibold mb-2">
                  💡 Perfect If:
                </p>
                <p className="text-[#64607d]">
                  You're an editor, ghostwriter, or manuscript evaluator. You enjoy long-form book projects. You have experience in fiction or nonfiction book development.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section 1 */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Compare All Copywriting Platforms Side-by-Side
              </h3>
              <p className="text-xl mb-6 text-white/90">
                See detailed fee structures, payment terms, and client quality ratings
              </p>
              <Link
                href={`/${locale}/platforms`}
                className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
              >
                View Full Comparison →
              </Link>
            </div>
          </section>

          {/* Section 3: Rates & Pricing */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              What Should You Charge? Copywriting Rates 2026
            </h2>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
                Standard Rates by Experience Level
              </h3>

              <div className="space-y-6">
                <div className="border-l-4 border-[#22c55e] pl-6">
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
                    Beginner (0-2 years)
                  </h4>
                  <div className="space-y-2 text-[#64607d]">
                    <p>• <strong>Per word:</strong> $0.05-$0.15</p>
                    <p>• <strong>Per hour:</strong> $25-$50</p>
                    <p>• <strong>Blog post (800 words):</strong> $40-$120</p>
                    <p>• <strong>Landing page:</strong> $150-$400</p>
                  </div>
                </div>

                <div className="border-l-4 border-[#ef2b70] pl-6">
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
                    Intermediate (2-5 years)
                  </h4>
                  <div className="space-y-2 text-[#64607d]">
                    <p>• <strong>Per word:</strong> $0.15-$0.50</p>
                    <p>• <strong>Per hour:</strong> $50-$100</p>
                    <p>• <strong>Blog post (1,000 words):</strong> $150-$500</p>
                    <p>• <strong>Landing page:</strong> $500-$1,500</p>
                  </div>
                </div>

                <div className="border-l-4 border-[#1e1541] pl-6">
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">
                    Expert (5+ years)
                  </h4>
                  <div className="space-y-2 text-[#64607d]">
                    <p>• <strong>Per word:</strong> $0.50-$2.00+</p>
                    <p>• <strong>Per hour:</strong> $100-$250+</p>
                    <p>• <strong>Blog post (1,500 words):</strong> $750-$3,000</p>
                    <p>• <strong>Landing page:</strong> $1,500-$5,000+</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg">
              <p className="text-[#1e1541] font-semibold mb-2">
                💡 Pro Tip: Price by Project, Not by Word
              </p>
              <p className="text-[#64607d]">
                Per-word pricing punishes fast writers. A $500 landing page pays the same whether you write it in 2 hours or 8 hours. Experienced writers charge by project value, not time spent.
              </p>
            </div>
          </section>

          {/* Section 4: How to Choose */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              Which Platform Should You Choose?
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3 flex items-center">
                  <span className="bg-[#22c55e] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
                  If You're Just Starting: Upwork + Scripted
                </h3>
                <p className="text-[#64607d] ml-11">
                  Start on Upwork to build portfolio diversity. Add Scripted for consistent income while you hunt for better-paying clients. Accept that first 20 articles will be low-paid learning experiences.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3 flex items-center">
                  <span className="bg-[#ef2b70] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
                  If You Have 3+ Years Experience: Contently + Skyword
                </h3>
                <p className="text-[#64607d] ml-11">
                  Apply to premium platforms where your expertise commands top dollar. These platforms vet clients as much as writers, ensuring quality projects and fair rates.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3 flex items-center">
                  <span className="bg-[#1e1541] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
                  If You Want Passive Income: Fiverr Pro
                </h3>
                <p className="text-[#64607d] ml-11">
                  Create 5-10 packaged services (email sequences, product descriptions, social media bundles). Optimize for search. Let clients come to you while you work on other projects.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3 flex items-center">
                  <span className="bg-[#64607d] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">4</span>
                  If You're a Specialist: Niche Job Boards
                </h3>
                <p className="text-[#64607d] ml-11">
                  ProBlogger for bloggers. Reedsy for book editors. Freelance Writing for journalists. Specialists earn more on focused platforms than general marketplaces.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section 2 */}
          <section className="mb-16">
            <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Calculate Your Copywriting Rate
              </h3>
              <p className="text-xl mb-6 text-gray-300">
                Free tool shows what to charge based on experience, niche, and project type
              </p>
              <Link
                href={`/${locale}/tools/rate-calculator`}
                className="inline-block rounded-lg bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Calculate Your Rate →
              </Link>
            </div>
          </section>

          {/* Section 5: Success Tips */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              5 Keys to Success on Copywriting Platforms
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                  1. Specialize in a Profitable Niche
                </h3>
                <p className="text-[#64607d] mb-3">
                  Generalists compete on price. Specialists command premium rates. The highest-paying niches in 2026:
                </p>
                <ul className="space-y-2 text-[#64607d] ml-6">
                  <li>• <strong>SaaS/Tech:</strong> $0.50-$2/word</li>
                  <li>• <strong>Finance/Crypto:</strong> $0.40-$1.50/word</li>
                  <li>• <strong>Healthcare/Medical:</strong> $0.30-$1/word</li>
                  <li>• <strong>B2B Marketing:</strong> $0.25-$0.75/word</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                  2. Build a Portfolio That Converts
                </h3>
                <p className="text-[#64607d]">
                  Your portfolio is your sales page. Don't just list articles—show RESULTS. "Increased email open rates by 43%" beats "Wrote 10 email campaigns." Include 5-10 best samples with context.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                  3. Write Proposals That Win (Upwork/Freelancer)
                </h3>
                <p className="text-[#64607d] mb-3">
                  Generic proposals get ignored. Winning proposals:
                </p>
                <ul className="space-y-2 text-[#64607d] ml-6">
                  <li>• Reference specific details from the job post</li>
                  <li>• Lead with relevant sample (not full portfolio)</li>
                  <li>• Ask one smart question about their project</li>
                  <li>• Keep it under 150 words</li>
                  <li>• End with clear next step</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                  4. Deliver More Than Expected
                </h3>
                <p className="text-[#64607d]">
                  First project with a client? Deliver early. Add a bonus headline variation. Include SEO keyword suggestions. Overdelivery on first project earns retainer contracts.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                  5. Raise Rates Systematically
                </h3>
                <p className="text-[#64607d]">
                  Don't stay stuck at beginner rates. Raise rates 20% after every 5 projects or 6 months. If you book 80%+ of pitches, your rates are too low. Aim for 30-50% booking rate.
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Explore More Niche Career Guides
              </h3>
              <p className="text-xl mb-6 text-white/90">
                Find specialized platform guides for your specific creative niche
              </p>
              <Link
                href={`/${locale}/gids/niche-gidsen`}
                className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Browse All Niche Guides →
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
              "@type": "Article",
              "headline": "Top Freelance Platforms for Copywriters & Content Writers in 2026",
              "description": "Find the best platforms for freelance copywriters. Compare rates ($0.05-$2/word), project types, and client quality. From Contently to Upwork.",
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
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/niche-gidsen/platforms-for-copywriters`
              }
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
                  "name": "Guides",
                  "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Niche Guides",
                  "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/niche-gidsen`
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Best Platforms for Copywriters",
                  "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/niche-gidsen/platforms-for-copywriters`
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
