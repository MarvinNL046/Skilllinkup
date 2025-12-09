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
  const slug = 'fiverr-vs-99designs';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/gids/platform-vergelijkingen/${slug}`;

  if (locale === 'nl') {
    return {
      title: "Fiverr vs 99designs 2026: Welk Platform is Beter voor Design Opdrachten?",
      description: "Diepgaande vergelijking van Fiverr vs 99designs. Ontdek prijzen, kwaliteit, vergoedingen en welk platform het beste is voor logo's, graphics en design werk.",
      keywords: "fiverr vs 99designs, beste design platform, freelance design, logo ontwerpen, graphic design platform",
      openGraph: {
        title: "Fiverr vs 99designs 2026: Beste Platform voor Design Werk",
        description: "Vergelijk Fiverr en 99designs voor design opdrachten. Prijzen, kwaliteit en vergoedingen uitgelegd.",
        url: pageUrl,
        siteName: 'SkillLinkup',
        images: [{ url: `${siteUrl}/images/og/gids-og.png`, width: 1200, height: 630, alt: 'Fiverr vs 99designs Vergelijking' }],
        locale: 'nl_NL',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: "Fiverr vs 99designs 2026: Beste Platform voor Design",
        description: "Diepgaande vergelijking van Fiverr vs 99designs voor design opdrachten.",
        images: [`${siteUrl}/images/og/gids-og.png`],
      },
      alternates: { canonical: pageUrl },
    };
  }

  return {
    title: "Fiverr vs 99designs 2026: Which Platform is Best for Design Work?",
    description: "In-depth comparison of Fiverr vs 99designs. Discover pricing, quality, fees, and which platform is best for logos, graphics, and design projects in 2026.",
    keywords: "fiverr vs 99designs, best design platform, freelance design, logo design, graphic design platform, design marketplace comparison",
    openGraph: {
      title: "Fiverr vs 99designs 2026: Best Platform for Design Work",
      description: "Compare Fiverr and 99designs for design projects. Pricing, quality, and fees explained in detail.",
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [{ url: `${siteUrl}/images/og/gids-og.png`, width: 1200, height: 630, alt: 'Fiverr vs 99designs Comparison' }],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Fiverr vs 99designs 2026: Best Platform for Design",
      description: "In-depth comparison of Fiverr vs 99designs for design projects.",
      images: [`${siteUrl}/images/og/gids-og.png`],
    },
    alternates: { canonical: pageUrl },
  };
}

export default async function FiverrVs99DesignsPage({ params }: Props) {
  const { locale } = await params;
  const isEnglish = locale === 'en';

  const content = isEnglish ? {
    h1: "Fiverr vs 99designs: The Ultimate Comparison for Design Work (2026)",
    intro: "Choosing between Fiverr and 99designs? Both platforms dominate the design marketplace, but they work fundamentally differently. This complete comparison reveals which platform delivers better value, quality, and ROI for your design projects.",
    ctaPrimary: "See All Comparisons",
    ctaPrimaryUrl: "/en/comparisons",
    ctaSecondary: "Browse All Platforms",
    ctaSecondaryUrl: "/en/platforms",
    ctaTertiary: "Take Platform Quiz",
    ctaTertiaryUrl: "/en/gids/platform-selectie/platform-selectie-quiz",
  } : {
    h1: "Fiverr vs 99designs: De Complete Vergelijking voor Design Werk (2026)",
    intro: "Keuze maken tussen Fiverr en 99designs? Beide platforms domineren de design markt, maar werken fundamenteel anders. Deze complete vergelijking onthult welk platform betere waarde, kwaliteit en ROI biedt voor jouw design projecten.",
    ctaPrimary: "Bekijk Alle Vergelijkingen",
    ctaPrimaryUrl: "/nl/comparisons",
    ctaSecondary: "Alle Platforms",
    ctaSecondaryUrl: "/nl/platforms",
    ctaTertiary: "Platform Quiz",
    ctaTertiaryUrl: "/nl/gids/platform-selectie/platform-selectie-quiz",
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
                href={content.ctaPrimaryUrl}
                className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
              >
                {content.ctaPrimary} →
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-6xl">

          {isEnglish ? (
            <>
              {/* Quick Verdict */}
              <section className="mb-16">
                <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-white">
                  <h2 className="font-heading font-bold text-3xl mb-6">⚡ Quick Verdict</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                      <h3 className="font-heading font-bold text-xl mb-3">Choose Fiverr If:</h3>
                      <ul className="space-y-2">
                        <li>✅ You need fast, affordable designs</li>
                        <li>✅ Budget under $500</li>
                        <li>✅ You know exactly what you want</li>
                        <li>✅ You're comfortable managing designers</li>
                      </ul>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                      <h3 className="font-heading font-bold text-xl mb-3">Choose 99designs If:</h3>
                      <ul className="space-y-2">
                        <li>✅ You want multiple design options</li>
                        <li>✅ Budget $500-$2,000+</li>
                        <li>✅ You're open to creative exploration</li>
                        <li>✅ You prefer hands-off management</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Platform Overview */}
              <section className="mb-16">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
                  Platform Overview: Fundamentally Different Models
                </h2>
                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-[#64607d] leading-relaxed">
                    Fiverr and 99designs serve the same market—businesses needing design—but their approaches couldn't be more different. Understanding this distinction is crucial to making the right choice.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-[#1dbf73] rounded-lg flex items-center justify-center text-white font-bold text-2xl mr-4">F</div>
                      <h3 className="font-heading font-bold text-2xl text-[#1e1541]">Fiverr</h3>
                    </div>
                    <p className="text-[#64607d] mb-4 font-semibold">One-to-One Marketplace</p>
                    <ul className="space-y-3 text-[#64607d]">
                      <li>• You hire <strong>one designer</strong> for your project</li>
                      <li>• Browse portfolios and reviews</li>
                      <li>• Fixed-price gigs starting at $5</li>
                      <li>• Direct communication with designer</li>
                      <li>• Revisions depend on package selected</li>
                    </ul>
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p className="text-sm text-[#64607d]"><strong>Best For:</strong> Clear briefs, budget projects, fast turnaround</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-[#ff6b35] rounded-lg flex items-center justify-center text-white font-bold text-2xl mr-4">99</div>
                      <h3 className="font-heading font-bold text-2xl text-[#1e1541]">99designs</h3>
                    </div>
                    <p className="text-[#64607d] mb-4 font-semibold">Design Contest Platform</p>
                    <ul className="space-y-3 text-[#64607d]">
                      <li>• You receive <strong>dozens of designs</strong> from multiple designers</li>
                      <li>• Contest-based with prize money</li>
                      <li>• Packages start at $299</li>
                      <li>• Platform manages designer communication</li>
                      <li>• Unlimited revisions with winner</li>
                    </ul>
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p className="text-sm text-[#64607d]"><strong>Best For:</strong> Exploring options, brand identity, higher budgets</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Head-to-Head Comparison Table */}
              <section className="mb-16">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
                  Head-to-Head Comparison
                </h2>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#1e1541] text-white">
                        <tr>
                          <th className="px-6 py-4 text-left font-heading font-semibold">Feature</th>
                          <th className="px-6 py-4 text-left font-heading font-semibold">Fiverr</th>
                          <th className="px-6 py-4 text-left font-heading font-semibold">99designs</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-semibold text-[#1e1541]">Starting Price</td>
                          <td className="px-6 py-4 text-[#64607d]">$5-$50</td>
                          <td className="px-6 py-4 text-[#64607d]">$299</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-semibold text-[#1e1541]">Logo Design Range</td>
                          <td className="px-6 py-4 text-[#64607d]">$50-$500</td>
                          <td className="px-6 py-4 text-[#64607d]">$299-$1,299</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-semibold text-[#1e1541]">Platform Fee (Buyers)</td>
                          <td className="px-6 py-4 text-[#64607d]">$2-$7.5 per order</td>
                          <td className="px-6 py-4 text-[#64607d]">Included in price</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-semibold text-[#1e1541]">Designer Fee</td>
                          <td className="px-6 py-4 text-[#64607d]">20% commission</td>
                          <td className="px-6 py-4 text-[#64607d]">Contest prize split</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-semibold text-[#1e1541]">Design Options</td>
                          <td className="px-6 py-4 text-[#64607d]">1 designer, 2-5 concepts</td>
                          <td className="px-6 py-4 text-[#64607d]">30-100+ concepts</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-semibold text-[#1e1541]">Revisions</td>
                          <td className="px-6 py-4 text-[#64607d]">Limited (2-5 depending on package)</td>
                          <td className="px-6 py-4 text-[#64607d]">Unlimited with winner</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-semibold text-[#1e1541]">Delivery Time</td>
                          <td className="px-6 py-4 text-[#64607d]">24 hours - 7 days</td>
                          <td className="px-6 py-4 text-[#64607d]">7-14 days</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-semibold text-[#1e1541]">Quality Control</td>
                          <td className="px-6 py-4 text-[#64607d]">Portfolio + reviews</td>
                          <td className="px-6 py-4 text-[#64607d]">Vetted designers</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-semibold text-[#1e1541]">Money-Back Guarantee</td>
                          <td className="px-6 py-4 text-[#64607d]">✅ Yes (with conditions)</td>
                          <td className="px-6 py-4 text-[#64607d]">✅ Yes (100%)</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-semibold text-[#1e1541]">Copyright Ownership</td>
                          <td className="px-6 py-4 text-[#64607d]">Full rights (verify in gig)</td>
                          <td className="px-6 py-4 text-[#64607d]">Full rights guaranteed</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* CTA 1 */}
              <section className="mb-16">
                <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
                  <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                    Compare All Design Platforms
                  </h3>
                  <p className="text-xl mb-6 text-white/90">
                    See how Fiverr and 99designs stack up against Upwork, Dribbble, and more
                  </p>
                  <Link
                    href={content.ctaSecondaryUrl}
                    className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
                  >
                    {content.ctaSecondary} →
                  </Link>
                </div>
              </section>

              {/* Pricing Deep Dive */}
              <section className="mb-16">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
                  Pricing Deep Dive: What You Actually Pay
                </h2>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-6">Fiverr Pricing Structure</h3>
                    <div className="space-y-4 mb-6">
                      <div className="border-l-4 border-[#1dbf73] pl-4">
                        <p className="font-semibold text-[#1e1541] mb-1">Basic Package</p>
                        <p className="text-[#64607d]">$50-$150 • 1-2 concepts • 2 revisions • 3 days</p>
                      </div>
                      <div className="border-l-4 border-[#1dbf73] pl-4">
                        <p className="font-semibold text-[#1e1541] mb-1">Standard Package</p>
                        <p className="text-[#64607d]">$150-$300 • 3 concepts • 4 revisions • 5 days</p>
                      </div>
                      <div className="border-l-4 border-[#1dbf73] pl-4">
                        <p className="font-semibold text-[#1e1541] mb-1">Premium Package</p>
                        <p className="text-[#64607d]">$300-$500+ • 5 concepts • Unlimited revisions • 7 days</p>
                      </div>
                    </div>
                    <div className="bg-[#f8f9fb] rounded-lg p-4">
                      <p className="text-sm text-[#64607d]"><strong>Hidden Costs:</strong> +$2-$7.5 service fee, rush delivery (+30-50%), source files (+$10-$50)</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-6">99designs Pricing Structure</h3>
                    <div className="space-y-4 mb-6">
                      <div className="border-l-4 border-[#ff6b35] pl-4">
                        <p className="font-semibold text-[#1e1541] mb-1">Bronze Package</p>
                        <p className="text-[#64607d]">$299 • 30+ designs • 7 days • Mid-level designers</p>
                      </div>
                      <div className="border-l-4 border-[#ff6b35] pl-4">
                        <p className="font-semibold text-[#1e1541] mb-1">Silver Package</p>
                        <p className="text-[#64607d]">$499 • 60+ designs • 7 days • Top-level designers</p>
                      </div>
                      <div className="border-l-4 border-[#ff6b35] pl-4">
                        <p className="font-semibold text-[#1e1541] mb-1">Gold Package</p>
                        <p className="text-[#64607d]">$1,299 • 100+ designs • Priority support • Elite designers</p>
                      </div>
                    </div>
                    <div className="bg-[#f8f9fb] rounded-lg p-4">
                      <p className="text-sm text-[#64607d]"><strong>Included:</strong> All fees, unlimited revisions, source files, full copyright, money-back guarantee</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg">
                  <p className="font-semibold text-[#1e1541] mb-2">💰 Real Cost Example: Logo Design</p>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• <strong>Fiverr:</strong> $200 gig + $5 service fee + $30 rush + $25 source files = <strong>$260 total</strong></li>
                    <li>• <strong>99designs:</strong> $299 Bronze package = <strong>$299 total</strong> (everything included)</li>
                    <li>• <strong>Value difference:</strong> 99designs gives you 30+ concepts vs. Fiverr's 3 concepts for only $39 more</li>
                  </ul>
                </div>
              </section>

              {/* Quality Comparison */}
              <section className="mb-16">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
                  Quality Comparison: Designer Caliber
                </h2>
                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-[#64607d] leading-relaxed">
                    Quality varies significantly on both platforms, but 99designs has stricter vetting. Here's what to expect:
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-4">Fiverr Quality</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-[#1e1541] mb-2">✅ Pros:</p>
                        <ul className="space-y-2 text-[#64607d]">
                          <li>• Top-rated sellers deliver professional work</li>
                          <li>• You can thoroughly vet portfolios</li>
                          <li>• Reviews provide transparency</li>
                          <li>• Direct communication ensures alignment</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-[#1e1541] mb-2">❌ Cons:</p>
                        <ul className="space-y-2 text-[#64607d]">
                          <li>• Wide quality variance (beginners to experts)</li>
                          <li>• Template-based designs common</li>
                          <li>• No minimum quality standards</li>
                          <li>• Risk of plagiarism with cheap gigs</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-4">99designs Quality</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-[#1e1541] mb-2">✅ Pros:</p>
                        <ul className="space-y-2 text-[#64607d]">
                          <li>• Pre-vetted designer community</li>
                          <li>• Multiple concepts guarantee variety</li>
                          <li>• Platform moderates for quality</li>
                          <li>• Higher average design sophistication</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-[#1e1541] mb-2">❌ Cons:</p>
                        <ul className="space-y-2 text-[#64607d]">
                          <li>• Less control over specific designer selection</li>
                          <li>• Some generic concepts in lower tiers</li>
                          <li>• Contest model can feel impersonal</li>
                          <li>• Quality varies between packages</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Use Cases */}
              <section className="mb-16">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
                  When to Use Each Platform: Real Scenarios
                </h2>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-start">
                      <div className="bg-[#1dbf73] text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">F</div>
                      <div>
                        <h3 className="font-heading font-bold text-xl text-[#1e1541] mb-3">Choose Fiverr For:</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-semibold text-[#1e1541] mb-2">1. Social Media Graphics</p>
                            <p className="text-[#64607d] text-sm">Need 20 Instagram posts? Fiverr's bulk pricing wins.</p>
                          </div>
                          <div>
                            <p className="font-semibold text-[#1e1541] mb-2">2. Quick One-Off Projects</p>
                            <p className="text-[#64607d] text-sm">Business card, flyer, or simple illustration needed fast.</p>
                          </div>
                          <div>
                            <p className="font-semibold text-[#1e1541] mb-2">3. Specific Designer Style</p>
                            <p className="text-[#64607d] text-sm">Found a portfolio you love? Hire them directly.</p>
                          </div>
                          <div>
                            <p className="font-semibold text-[#1e1541] mb-2">4. Ongoing Design Needs</p>
                            <p className="text-[#64607d] text-sm">Building relationship with one designer for monthly work.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-start">
                      <div className="bg-[#ff6b35] text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">99</div>
                      <div>
                        <h3 className="font-heading font-bold text-xl text-[#1e1541] mb-3">Choose 99designs For:</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-semibold text-[#1e1541] mb-2">1. Brand Identity Projects</p>
                            <p className="text-[#64607d] text-sm">Logo, business card, letterhead—complete brand package.</p>
                          </div>
                          <div>
                            <p className="font-semibold text-[#1e1541] mb-2">2. Exploring Creative Directions</p>
                            <p className="text-[#64607d] text-sm">Not sure what style you want? See 50+ interpretations.</p>
                          </div>
                          <div>
                            <p className="font-semibold text-[#1e1541] mb-2">3. High-Stakes Designs</p>
                            <p className="text-[#64607d] text-sm">Product launch, rebranding, or investor presentations.</p>
                          </div>
                          <div>
                            <p className="font-semibold text-[#1e1541] mb-2">4. Time-Rich, Research-Poor</p>
                            <p className="text-[#64607d] text-sm">Don't want to vet 50 Fiverr portfolios? Let them compete.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA 2 */}
              <section className="mb-16">
                <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
                  <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                    Not Sure Which Platform Fits You?
                  </h3>
                  <p className="text-xl mb-6 text-gray-300">
                    Take our 2-minute quiz to find your perfect freelance platform match
                  </p>
                  <Link
                    href={content.ctaTertiaryUrl}
                    className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
                  >
                    {content.ctaTertiary} →
                  </Link>
                </div>
              </section>

              {/* Final Recommendation */}
              <section className="mb-16">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
                  Final Recommendation: Our Winner
                </h2>
                <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-white">
                  <div className="flex items-center mb-6">
                    <div className="text-5xl mr-4">🏆</div>
                    <div>
                      <h3 className="font-heading font-bold text-2xl mb-2">It Depends on Your Budget</h3>
                      <p className="text-white/90">There's no universal winner—both platforms excel in different scenarios</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                      <h4 className="font-heading font-bold text-xl mb-3">Choose Fiverr When:</h4>
                      <ul className="space-y-2">
                        <li>• Budget under $300</li>
                        <li>• Need fast delivery (24-48 hours)</li>
                        <li>• You have a clear design vision</li>
                        <li>• You're comfortable managing the process</li>
                        <li>• You found a designer whose style you love</li>
                      </ul>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                      <h4 className="font-heading font-bold text-xl mb-3">Choose 99designs When:</h4>
                      <ul className="space-y-2">
                        <li>• Budget $300-$2,000</li>
                        <li>• You want to explore creative options</li>
                        <li>• Brand identity is critical to success</li>
                        <li>• You prefer a hands-off experience</li>
                        <li>• You value money-back guarantees</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

            </>
          ) : (
            <>{/* Dutch content would be similar structure */}</>
          )}
        </article>

        {/* Schema.org Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": isEnglish
                ? "Fiverr vs 99designs 2026: Which Platform is Best for Design Work?"
                : "Fiverr vs 99designs 2026: Welk Platform is Beter voor Design Opdrachten?",
              "description": isEnglish
                ? "In-depth comparison of Fiverr vs 99designs. Discover pricing, quality, fees, and which platform is best for design projects."
                : "Diepgaande vergelijking van Fiverr vs 99designs voor design opdrachten.",
              "author": { "@type": "Organization", "name": "SkillLinkup" },
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
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/platform-vergelijkingen/fiverr-vs-99designs`
              }
            })
          }}
        />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": isEnglish ? "Is Fiverr or 99designs better for logo design?" : "Is Fiverr of 99designs beter voor logo ontwerp?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": isEnglish
                      ? "99designs is better for exploring creative options with 30-100 logo concepts starting at $299. Fiverr is better if you found a specific designer whose portfolio you love, with prices starting at $50-$500."
                      : "99designs is beter voor het verkennen van creatieve opties met 30-100 logo concepten vanaf $299. Fiverr is beter als je een specifieke designer hebt gevonden wiens portfolio je mooi vindt, met prijzen vanaf $50-$500."
                  }
                },
                {
                  "@type": "Question",
                  "name": isEnglish ? "What's cheaper: Fiverr or 99designs?" : "Wat is goedkoper: Fiverr of 99designs?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": isEnglish
                      ? "Fiverr is cheaper for basic projects ($50-$200), but 99designs offers better value for brand identity work when you factor in the number of design options, unlimited revisions, and money-back guarantee."
                      : "Fiverr is goedkoper voor basis projecten ($50-$200), maar 99designs biedt betere waarde voor merkidentiteit werk wanneer je het aantal design opties, onbeperkte revisies en geld-terug-garantie meerekent."
                  }
                }
              ]
            })
          }}
        />

        {/* BreadcrumbList Schema */}
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
                  "name": isEnglish ? "Platform Comparisons" : "Platform Vergelijkingen",
                  "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/platform-vergelijkingen`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": isEnglish ? "Fiverr vs 99designs" : "Fiverr vs 99designs",
                  "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/platform-vergelijkingen/fiverr-vs-99designs`
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
