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
  const pageUrl = `${siteUrl}/${locale}/gids/platform-vergelijkingen/best-platforms-by-skill`;

  return {
    title: "Best Freelance Platform by Skill Type 2026: Complete Guide (Developers, Designers, Writers)",
    description: "Find the best freelance platform for your skill: developers, designers, writers, marketers, and more. Compare Upwork, Toptal, 99designs, Fiverr, and specialized platforms.",
    keywords: "best freelance platform by skill, developer platforms, design platforms, writing platforms, marketing freelance, specialized marketplaces",
    openGraph: {
      title: "Best Freelance Platform by Skill Type: Complete 2026 Guide",
      description: "Discover which platform is best for your specific skill: development, design, writing, marketing, and more.",
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [{ url: `${siteUrl}/images/og/gids-og.png`, width: 1200, height: 630 }],
      locale: locale === 'en' ? 'en_US' : 'nl_NL',
      type: 'article',
    },
    alternates: { canonical: pageUrl },
  };
}

export default async function BestPlatformsBySkillPage({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8f9fb]">
        <section className="bg-gradient-to-br from-[#1e1541] via-[#2a1f5e] to-[#1e1541] text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                Best Freelance Platform by Skill Type: Complete 2026 Guide
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Not all platforms are created equal. The best marketplace for web developers differs drastically from the best for graphic designers or copywriters. This comprehensive guide matches 15+ skills to their ideal platforms.
              </p>
              <Link href={`/${locale}/comparisons`} className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg">
                See Platform Comparisons →
              </Link>
            </div>
          </div>
        </section>

        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-6xl">

          {/* Quick Navigation */}
          <section className="mb-16">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="font-heading font-bold text-2xl text-[#1e1541] mb-6">Jump to Your Skill:</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="#developers" className="text-[#ef2b70] hover:underline">→ Software Development</a>
                <a href="#designers" className="text-[#ef2b70] hover:underline">→ Design & Creative</a>
                <a href="#writers" className="text-[#ef2b70] hover:underline">→ Writing & Content</a>
                <a href="#marketing" className="text-[#ef2b70] hover:underline">→ Marketing & SEO</a>
                <a href="#video" className="text-[#ef2b70] hover:underline">→ Video & Animation</a>
                <a href="#business" className="text-[#ef2b70] hover:underline">→ Business & Consulting</a>
                <a href="#data" className="text-[#ef2b70] hover:underline">→ Data & Analytics</a>
                <a href="#admin" className="text-[#ef2b70] hover:underline">→ Admin & Support</a>
                <a href="#translation" className="text-[#ef2b70] hover:underline">→ Translation & Language</a>
              </div>
            </div>
          </section>

          {/* Software Development */}
          <section id="developers" className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              💻 Software Development & Programming
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border-l-4 border-[#22c55e] pl-6">
                  <h3 className="font-heading font-bold text-xl text-[#1e1541] mb-3">🏆 Best Overall</h3>
                  <p className="text-2xl font-bold text-[#ef2b70] mb-2">Toptal</p>
                  <p className="text-[#64607d] text-sm mb-3">Top 3% talent, rigorous vetting</p>
                  <ul className="space-y-1 text-sm text-[#64607d]">
                    <li>• Average rate: $100-$150/hr</li>
                    <li>• Risk-free 2-week trial</li>
                    <li>• Enterprise-level projects</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#204ecf] pl-6">
                  <h3 className="font-heading font-bold text-xl text-[#1e1541] mb-3">💰 Best Value</h3>
                  <p className="text-2xl font-bold text-[#ef2b70] mb-2">Upwork</p>
                  <p className="text-[#64607d] text-sm mb-3">Largest talent pool, all skill levels</p>
                  <ul className="space-y-1 text-sm text-[#64607d]">
                    <li>• Average rate: $30-$80/hr</li>
                    <li>• 12M freelancers</li>
                    <li>• Flexible contracts</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#ef2b70] pl-6">
                  <h3 className="font-heading font-bold text-xl text-[#1e1541] mb-3">🚀 Best for Startups</h3>
                  <p className="text-2xl font-bold text-[#ef2b70] mb-2">Gun.io</p>
                  <p className="text-[#64607d] text-sm mb-3">Pre-vetted developers, fast matching</p>
                  <ul className="space-y-1 text-sm text-[#64607d]">
                    <li>• Average rate: $80-$120/hr</li>
                    <li>• 2,000+ vetted developers</li>
                    <li>• Tech stack specialization</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#f8f9fb] rounded-lg p-6 mb-6">
              <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">Platform Rankings for Developers:</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="bg-[#22c55e] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1</span>
                    <span className="font-semibold text-[#1e1541]">Toptal</span>
                  </div>
                  <span className="text-[#64607d]">Elite talent, high rates</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="bg-[#6fda44] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">2</span>
                    <span className="font-semibold text-[#1e1541]">Gun.io</span>
                  </div>
                  <span className="text-[#64607d]">Vetted developers, startup-friendly</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="bg-[#a8e063] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">3</span>
                    <span className="font-semibold text-[#1e1541]">Upwork</span>
                  </div>
                  <span className="text-[#64607d]">Largest pool, all levels</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="bg-gray-300 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">4</span>
                    <span className="font-semibold text-[#1e1541]">Freelancer.com</span>
                  </div>
                  <span className="text-[#64607d]">Budget option, high competition</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="bg-gray-300 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">5</span>
                    <span className="font-semibold text-[#1e1541]">Fiverr</span>
                  </div>
                  <span className="text-[#64607d]">Quick tasks, lower quality</span>
                </div>
              </div>
            </div>
          </section>

          {/* Design & Creative */}
          <section id="designers" className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              🎨 Design & Creative Work
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border-l-4 border-[#22c55e] pl-6">
                  <h3 className="font-heading font-bold text-xl text-[#1e1541] mb-3">🏆 Best for Logos</h3>
                  <p className="text-2xl font-bold text-[#ef2b70] mb-2">99designs</p>
                  <p className="text-[#64607d] text-sm mb-3">Contest model, 30-100 design options</p>
                  <ul className="space-y-1 text-sm text-[#64607d]">
                    <li>• Starting price: $299</li>
                    <li>• Money-back guarantee</li>
                    <li>• Brand identity packages</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#204ecf] pl-6">
                  <h3 className="font-heading font-bold text-xl text-[#1e1541] mb-3">💰 Best Value</h3>
                  <p className="text-2xl font-bold text-[#ef2b70] mb-2">Fiverr</p>
                  <p className="text-[#64607d] text-sm mb-3">Affordable graphics, fast turnaround</p>
                  <ul className="space-y-1 text-sm text-[#64607d]">
                    <li>• Starting price: $5-$50</li>
                    <li>• Social media graphics</li>
                    <li>• Huge designer pool</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#ef2b70] pl-6">
                  <h3 className="font-heading font-bold text-xl text-[#1e1541] mb-3">🚀 Best for Web Design</h3>
                  <p className="text-2xl font-bold text-[#ef2b70] mb-2">Dribbble</p>
                  <p className="text-[#64607d] text-sm mb-3">Elite UI/UX designers, portfolio showcase</p>
                  <ul className="space-y-1 text-sm text-[#64607d]">
                    <li>• Average rate: $80-$150/hr</li>
                    <li>• Designer community</li>
                    <li>• Curated talent</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#f8f9fb] rounded-lg p-6">
              <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">Platform Rankings for Designers:</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="bg-[#22c55e] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1</span>
                    <span className="font-semibold text-[#1e1541]">99designs</span>
                  </div>
                  <span className="text-[#64607d]">Best for logos & brand identity</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="bg-[#6fda44] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">2</span>
                    <span className="font-semibold text-[#1e1541]">Dribbble</span>
                  </div>
                  <span className="text-[#64607d]">Best for UI/UX & web design</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="bg-[#a8e063] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">3</span>
                    <span className="font-semibold text-[#1e1541]">Fiverr</span>
                  </div>
                  <span className="text-[#64607d]">Best for quick graphics</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="bg-gray-300 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">4</span>
                    <span className="font-semibold text-[#1e1541]">Upwork</span>
                  </div>
                  <span className="text-[#64607d]">Best for ongoing design needs</span>
                </div>
              </div>
            </div>
          </section>

          {/* CTA 1 */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Browse Full Platform Database
              </h3>
              <p className="text-xl mb-6 text-white/90">
                Explore 25+ freelance platforms with filters, reviews, and pricing details
              </p>
              <Link href={`/${locale}/platforms`} className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg">
                Browse All Platforms →
              </Link>
            </div>
          </section>

          {/* Writing & Content */}
          <section id="writers" className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              ✍️ Writing & Content Creation
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="border-l-4 border-[#22c55e] pl-6">
                  <h3 className="font-heading font-bold text-xl text-[#1e1541] mb-3">🏆 Best Overall</h3>
                  <p className="text-2xl font-bold text-[#ef2b70] mb-2">Contently</p>
                  <p className="text-[#64607d] text-sm mb-3">Enterprise content marketing platform</p>
                  <ul className="space-y-1 text-sm text-[#64607d]">
                    <li>• Average rate: $75-$200/article</li>
                    <li>• Vetted journalists</li>
                    <li>• Brand storytelling focus</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#204ecf] pl-6">
                  <h3 className="font-heading font-bold text-xl text-[#1e1541] mb-3">💰 Best Value</h3>
                  <p className="text-2xl font-bold text-[#ef2b70] mb-2">Upwork</p>
                  <p className="text-[#64607d] text-sm mb-3">Largest writer pool, all niches</p>
                  <ul className="space-y-1 text-sm text-[#64607d]">
                    <li>• Average rate: $25-$100/hr</li>
                    <li>• Blog, copy, technical writing</li>
                    <li>• Flexible hiring</li>
                  </ul>
                </div>
                <div className="border-l-4 border-[#ef2b70] pl-6">
                  <h3 className="font-heading font-bold text-xl text-[#1e1541] mb-3">🚀 Best for SEO</h3>
                  <p className="text-2xl font-bold text-[#ef2b70] mb-2">Textbroker</p>
                  <p className="text-[#64607d] text-sm mb-3">SEO-optimized content at scale</p>
                  <ul className="space-y-1 text-sm text-[#64607d]">
                    <li>• Starting price: $0.01-$0.10/word</li>
                    <li>• Quality tiers</li>
                    <li>• Bulk ordering</li>
                  </ul>
                </div>
              </div>
              <div className="bg-[#f8f9fb] rounded-lg p-6">
                <p className="text-sm text-[#64607d]">
                  <strong>Honorable Mentions:</strong> ClearVoice (B2B content), WriterAccess (content marketplace), Scripted (subscription model)
                </p>
              </div>
            </div>
          </section>

          {/* Marketing & SEO */}
          <section id="marketing" className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              📈 Marketing, SEO & Social Media
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-6">
                <div className="flex items-start border-b border-gray-200 pb-6">
                  <span className="bg-[#22c55e] text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg mr-4 flex-shrink-0">1</span>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-[#1e1541] mb-2">Upwork</h3>
                    <p className="text-[#64607d] mb-2">Best all-around for digital marketing, PPC, SEO, social media management</p>
                    <p className="text-sm text-[#64607d]">Average rate: $30-$80/hr</p>
                  </div>
                </div>
                <div className="flex items-start border-b border-gray-200 pb-6">
                  <span className="bg-[#6fda44] text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg mr-4 flex-shrink-0">2</span>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-[#1e1541] mb-2">Fiverr Pro</h3>
                    <p className="text-[#64607d] mb-2">Vetted marketing experts, fixed-price packages</p>
                    <p className="text-sm text-[#64607d]">Average price: $200-$2,000/project</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-[#a8e063] text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg mr-4 flex-shrink-0">3</span>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-[#1e1541] mb-2">Mayple</h3>
                    <p className="text-[#64607d] mb-2">AI-matched marketing experts with proven track records</p>
                    <p className="text-sm text-[#64607d]">Average rate: $100-$200/hr</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Reference Table */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              Quick Reference: Best Platform by Skill
            </h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#1e1541] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-heading">Skill Category</th>
                      <th className="px-6 py-4 text-left font-heading">Best Platform</th>
                      <th className="px-6 py-4 text-left font-heading">Alternative</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr><td className="px-6 py-4">Web Development</td><td className="px-6 py-4 font-semibold">Toptal</td><td className="px-6 py-4">Upwork</td></tr>
                    <tr><td className="px-6 py-4">Mobile Development</td><td className="px-6 py-4 font-semibold">Toptal</td><td className="px-6 py-4">Gun.io</td></tr>
                    <tr><td className="px-6 py-4">Logo Design</td><td className="px-6 py-4 font-semibold">99designs</td><td className="px-6 py-4">Fiverr</td></tr>
                    <tr><td className="px-6 py-4">UI/UX Design</td><td className="px-6 py-4 font-semibold">Dribbble</td><td className="px-6 py-4">Toptal</td></tr>
                    <tr><td className="px-6 py-4">Content Writing</td><td className="px-6 py-4 font-semibold">Contently</td><td className="px-6 py-4">Upwork</td></tr>
                    <tr><td className="px-6 py-4">Copywriting</td><td className="px-6 py-4 font-semibold">Upwork</td><td className="px-6 py-4">Fiverr Pro</td></tr>
                    <tr><td className="px-6 py-4">Digital Marketing</td><td className="px-6 py-4 font-semibold">Upwork</td><td className="px-6 py-4">Mayple</td></tr>
                    <tr><td className="px-6 py-4">SEO</td><td className="px-6 py-4 font-semibold">Upwork</td><td className="px-6 py-4">Fiverr Pro</td></tr>
                    <tr><td className="px-6 py-4">Video Editing</td><td className="px-6 py-4 font-semibold">Fiverr</td><td className="px-6 py-4">Upwork</td></tr>
                    <tr><td className="px-6 py-4">Animation</td><td className="px-6 py-4 font-semibold">Fiverr</td><td className="px-6 py-4">99designs</td></tr>
                    <tr><td className="px-6 py-4">Data Science</td><td className="px-6 py-4 font-semibold">Toptal</td><td className="px-6 py-4">Upwork</td></tr>
                    <tr><td className="px-6 py-4">Translation</td><td className="px-6 py-4 font-semibold">Gengo</td><td className="px-6 py-4">Upwork</td></tr>
                    <tr><td className="px-6 py-4">Virtual Assistant</td><td className="px-6 py-4 font-semibold">Belay</td><td className="px-6 py-4">Upwork</td></tr>
                    <tr><td className="px-6 py-4">Accounting</td><td className="px-6 py-4 font-semibold">Upwork</td><td className="px-6 py-4">Freelancer</td></tr>
                    <tr><td className="px-6 py-4">Legal Services</td><td className="px-6 py-4 font-semibold">Upwork</td><td className="px-6 py-4">LawTrades</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* CTA 2 */}
          <section className="mb-16">
            <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Still Not Sure Which Platform?
              </h3>
              <p className="text-xl mb-6 text-gray-300">
                Take our interactive quiz to get a personalized platform recommendation
              </p>
              <Link href={`/${locale}/gids/platform-selectie/platform-selectie-quiz`} className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg">
                Take Platform Quiz →
              </Link>
            </div>
          </section>

        </article>

        {/* Schema Markup */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Best Freelance Platform by Skill Type 2026: Complete Guide",
            "author": { "@type": "Organization", "name": "SkillLinkup" },
            "publisher": { "@type": "Organization", "name": "SkillLinkup", "logo": { "@type": "ImageObject", "url": `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png` } }
          })
        }} />
      </main>
      <Footer />
    </>
  );
}
