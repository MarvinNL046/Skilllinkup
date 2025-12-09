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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/gids/platform-vergelijkingen/guru-vs-peopleperhour`;

  return {
    title: "Guru vs PeoplePerHour 2026: Which Platform Wins? (Complete Comparison)",
    description: "Guru vs PeoplePerHour head-to-head: Compare fees, features, payment protection, and which platform is better for UK/EU freelancers in 2026.",
    keywords: "guru vs peopleperhour, uk freelance platforms, european freelancers, safepay vs workstream, freelance marketplace comparison",
    openGraph: {
      title: "Guru vs PeoplePerHour 2026: Complete Platform Comparison",
      description: "In-depth comparison of Guru and PeoplePerHour for freelancers and clients.",
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [{ url: `${siteUrl}/images/og/gids-og.png`, width: 1200, height: 630 }],
      locale: locale === 'en' ? 'en_US' : 'nl_NL',
      type: 'article',
    },
    alternates: { canonical: pageUrl },
  };
}

export default async function GuruVsPeoplePerHourPage({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8f9fb]">
        <section className="bg-gradient-to-br from-[#1e1541] via-[#2a1f5e] to-[#1e1541] text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                Guru vs PeoplePerHour: Which Platform Wins in 2026?
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Two underdog platforms competing for the same market: flexible freelance work with competitive fees. This detailed comparison reveals which platform offers better value for UK/EU professionals.
              </p>
              <Link href={`/${locale}/comparisons`} className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg">
                See All Comparisons →
              </Link>
            </div>
          </div>
        </section>

        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-6xl">

          {/* Quick Verdict */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-white">
              <h2 className="font-heading font-bold text-3xl mb-6">⚡ Quick Verdict</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <h3 className="font-heading font-bold text-xl mb-3">Choose Guru If:</h3>
                  <ul className="space-y-2">
                    <li>✅ You're a US-based freelancer or client</li>
                    <li>✅ You want lowest fees (5% freelancer, 0% client)</li>
                    <li>✅ You need flexible payment terms (SafePay)</li>
                    <li>✅ You prefer traditional project-based work</li>
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <h3 className="font-heading font-bold text-xl mb-3">Choose PeoplePerHour If:</h3>
                  <ul className="space-y-2">
                    <li>✅ You're based in UK or Europe</li>
                    <li>✅ You want curated hourlie packages</li>
                    <li>✅ You prefer fixed-price simplicity</li>
                    <li>✅ You value WorkStream collaboration tools</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Head-to-Head Table */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              Complete Feature Comparison
            </h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#1e1541] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-heading">Feature</th>
                      <th className="px-6 py-4 text-left font-heading">Guru</th>
                      <th className="px-6 py-4 text-left font-heading">PeoplePerHour</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr><td className="px-6 py-4 font-semibold">Freelancer Fee</td><td className="px-6 py-4">5%</td><td className="px-6 py-4">20%</td></tr>
                    <tr><td className="px-6 py-4 font-semibold">Client Fee</td><td className="px-6 py-4">0%</td><td className="px-6 py-4">3.5%</td></tr>
                    <tr><td className="px-6 py-4 font-semibold">Payment Protection</td><td className="px-6 py-4">SafePay escrow</td><td className="px-6 py-4">WorkStream escrow</td></tr>
                    <tr><td className="px-6 py-4 font-semibold">Geographic Focus</td><td className="px-6 py-4">Global (US-heavy)</td><td className="px-6 py-4">UK & EU focused</td></tr>
                    <tr><td className="px-6 py-4 font-semibold">Payment Methods</td><td className="px-6 py-4">PayPal, Wire, Payoneer</td><td className="px-6 py-4">PayPal, Stripe, Bank</td></tr>
                    <tr><td className="px-6 py-4 font-semibold">Withdrawal Fee</td><td className="px-6 py-4">$2.99-$4.99</td><td className="px-6 py-4">Free (bank), 3% (PayPal)</td></tr>
                    <tr><td className="px-6 py-4 font-semibold">Contract Types</td><td className="px-6 py-4">Task, hourly, recurring</td><td className="px-6 py-4">Hourlies, custom projects</td></tr>
                    <tr><td className="px-6 py-4 font-semibold">Time Tracking</td><td className="px-6 py-4">Manual entry</td><td className="px-6 py-4">WorkStream tracker</td></tr>
                    <tr><td className="px-6 py-4 font-semibold">Dispute Resolution</td><td className="px-6 py-4">Mediation service</td><td className="px-6 py-4">Arbitration process</td></tr>
                    <tr><td className="px-6 py-4 font-semibold">Mobile App</td><td className="px-6 py-4">iOS & Android</td><td className="px-6 py-4">iOS & Android</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Fee Comparison */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              Fee Breakdown: The Real Cost
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-6">Guru Fees</h3>
                <div className="space-y-4 mb-6">
                  <div className="bg-[#f8f9fb] rounded-lg p-4">
                    <p className="font-semibold text-[#1e1541]">Freelancer Commission</p>
                    <p className="text-3xl font-bold text-[#22c55e]">5%</p>
                    <p className="text-sm text-[#64607d]">One of the lowest in the industry</p>
                  </div>
                  <div className="bg-[#f8f9fb] rounded-lg p-4">
                    <p className="font-semibold text-[#1e1541]">Client Fee</p>
                    <p className="text-3xl font-bold text-[#22c55e]">0%</p>
                    <p className="text-sm text-[#64607d]">No markup on project cost</p>
                  </div>
                  <div className="text-sm text-[#64607d]">
                    <strong>Example:</strong> $1,000 project → Freelancer receives $950 → Client pays $1,000
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-6">PeoplePerHour Fees</h3>
                <div className="space-y-4 mb-6">
                  <div className="bg-[#f8f9fb] rounded-lg p-4">
                    <p className="font-semibold text-[#1e1541]">Freelancer Commission</p>
                    <p className="text-3xl font-bold text-[#ef2b70]">20%</p>
                    <p className="text-sm text-[#64607d]">Standard marketplace rate</p>
                  </div>
                  <div className="bg-[#f8f9fb] rounded-lg p-4">
                    <p className="font-semibold text-[#1e1541]">Client Fee</p>
                    <p className="text-3xl font-bold text-[#64607d]">3.5%</p>
                    <p className="text-sm text-[#64607d]">Processing fee per invoice</p>
                  </div>
                  <div className="text-sm text-[#64607d]">
                    <strong>Example:</strong> $1,000 project → Freelancer receives $800 → Client pays $1,035
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg mt-8">
              <p className="font-semibold text-[#1e1541] mb-2">💰 Fee Winner: Guru by a Landslide</p>
              <p className="text-[#64607d]">
                On a $1,000 project, freelancers keep $150 more on Guru ($950 vs $800). For high-volume freelancers, this difference compounds quickly.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Explore All Platform Options
              </h3>
              <p className="text-xl mb-6 text-white/90">
                Compare Guru, PeoplePerHour, Upwork, Fiverr, and 20+ more platforms
              </p>
              <Link href={`/${locale}/platforms`} className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg">
                Browse Platforms →
              </Link>
            </div>
          </section>

          {/* Payment Protection */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              Payment Protection Systems
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-4">Guru SafePay</h3>
                <ul className="space-y-3 text-[#64607d]">
                  <li>✅ Escrow protection for all project types</li>
                  <li>✅ Milestone-based releases</li>
                  <li>✅ Automatic payment on approval</li>
                  <li>✅ Dispute mediation included</li>
                  <li>✅ Works with invoices and time tracking</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-4">PeoplePerHour WorkStream</h3>
                <ul className="space-y-3 text-[#64607d]">
                  <li>✅ Real-time collaboration workspace</li>
                  <li>✅ Integrated time tracking and invoicing</li>
                  <li>✅ Automatic payment protection</li>
                  <li>✅ File sharing and messaging</li>
                  <li>✅ Dispute arbitration service</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Final Recommendation */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              Final Recommendation
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="text-5xl mr-4">🏆</div>
                <div>
                  <h3 className="font-heading font-bold text-2xl text-[#1e1541]">Guru Wins for Freelancers</h3>
                  <p className="text-[#64607d]">Lower fees mean significantly higher take-home pay</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-4 border-[#22c55e] pl-6">
                  <h4 className="font-heading font-bold text-xl text-[#1e1541] mb-3">Choose Guru When:</h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• You want to maximize earnings (5% fee)</li>
                    <li>• You're targeting US clients</li>
                    <li>• You prefer flexible payment terms</li>
                    <li>• You value low withdrawal fees</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#204ecf] pl-6">
                  <h4 className="font-heading font-bold text-xl text-[#1e1541] mb-3">Choose PeoplePerHour When:</h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• You're based in UK/EU (better client pool)</li>
                    <li>• You want built-in project management</li>
                    <li>• You prefer hourlie package model</li>
                    <li>• WorkStream tools add workflow value</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

        </article>

        {/* Schema Markup */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Guru vs PeoplePerHour 2026: Which Platform Wins?",
            "author": { "@type": "Organization", "name": "SkillLinkup" },
            "publisher": { "@type": "Organization", "name": "SkillLinkup", "logo": { "@type": "ImageObject", "url": `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png` } }
          })
        }} />
      </main>
      <Footer />
    </>
  );
}
