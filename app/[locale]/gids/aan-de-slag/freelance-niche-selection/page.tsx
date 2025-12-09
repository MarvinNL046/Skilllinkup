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

  const slug = 'freelance-niche-selection';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/gids/aan-de-slag/${slug}`;

  return {
    title: "How to Choose Your Freelance Niche in 2026 (Decision Framework + Examples)",
    description: "Specialists earn 2-3x more than generalists. Learn the proven framework to find your profitable niche in 3 steps. Includes 50+ niche ideas and validation checklist.",
    keywords: "freelance niche selection, find freelance niche, best freelance niches 2026, how to specialize, niche down freelancing",
    openGraph: {
      title: "How to Choose Your Freelance Niche in 2026 (Decision Framework + Examples)",
      description: "Specialists earn 2-3x more than generalists. Learn the proven framework to find your profitable niche in 3 steps. Includes 50+ niche ideas and validation checklist.",
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [
        {
          url: `${siteUrl}/images/og/gids-og.png`,
          width: 1200,
          height: 630,
          alt: 'How to Choose Your Freelance Niche - SkillLinkup',
        }
      ],
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: "How to Choose Your Freelance Niche in 2026 (Decision Framework + Examples)",
      description: "Specialists earn 2-3x more than generalists. Learn the proven framework to find your profitable niche in 3 steps. Includes 50+ niche ideas and validation checklist.",
      images: [`${siteUrl}/images/og/gids-og.png`],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function FreelanceNicheSelectionPage({ params }: Props) {
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
                How to Choose Your Freelance Niche (And Why It Matters More Than You Think)
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                "I'm a web developer." Great. So are 10,000 others. "I build e-commerce sites for organic food brands." Now you're interesting. Learn how to niche down and charge premium rates.
              </p>
              <Link
                href={`/${locale}/platforms`}
                className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Find Niche-Specific Clients →
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">

          {/* Section 1: Why Niche Matters */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              Why Generalists Struggle and Specialists Thrive
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-[#64607d] leading-relaxed mb-6">
                Would you hire a "general doctor" for brain surgery? No. You'd find a neurosurgeon—and pay whatever they charge. The same logic applies to freelancing.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="font-heading font-semibold text-xl text-red-900 mb-4">
                    ❌ The Generalist Problem
                  </h3>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li>• "I do web design, logo design, and social media"</li>
                    <li>• Competes with thousands of others</li>
                    <li>• Hard to prove expertise in everything</li>
                    <li>• Clients think: "Jack of all trades, master of none"</li>
                    <li>• Low rates because you're replaceable</li>
                    <li>• Endless competition from cheaper providers</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-heading font-semibold text-xl text-green-900 mb-4">
                    ✅ The Specialist Advantage
                  </h3>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>• "I design conversion-focused landing pages for SaaS"</li>
                    <li>• Competes with 10-20 specialists</li>
                    <li>• Proven track record in ONE thing</li>
                    <li>• Clients think: "This person gets my industry"</li>
                    <li>• Premium rates (2-3x higher)</li>
                    <li>• Clients seek YOU out instead</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
                  The Income Reality Check
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-[#64607d]">General "Web Developer"</span>
                    <strong className="text-[#1e1541]">$25-$50/hour</strong>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-[#64607d]">Shopify Expert for Fashion Brands</span>
                    <strong className="text-[#1e1541]">$80-$150/hour</strong>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-[#64607d]">General "Content Writer"</span>
                    <strong className="text-[#1e1541]">$0.05-$0.10/word</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#64607d]">B2B SaaS Technical Writer</span>
                    <strong className="text-[#1e1541]">$0.30-$0.75/word</strong>
                  </div>
                </div>
              </div>

              <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg mb-8">
                <p className="text-[#1e1541] font-semibold mb-2">
                  💡 The Paradox of Niching Down
                </p>
                <p className="text-[#64607d]">
                  Beginners fear: "If I niche down, I'll lose clients." Reality: When you specialize, you become the ONLY choice for specific clients—and they'll pay more for your expertise.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: The 3-Step Framework */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              The 3-Step Niche Selection Framework
            </h2>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4">
                    1
                  </div>
                  <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
                    Step 1: List Your Skills + Interests (The Venn Diagram)
                  </h3>
                </div>

                <p className="text-[#64607d] mb-6">
                  Your niche sits at the intersection of three circles:
                </p>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="border-2 border-[#ef2b70] rounded-lg p-4">
                    <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">What You're Good At</h4>
                    <p className="text-sm text-[#64607d] mb-3">Skills you can deliver confidently</p>
                    <p className="text-xs text-[#64607d] italic">Example: Writing, design, coding, video editing, consulting</p>
                  </div>

                  <div className="border-2 border-[#22c55e] rounded-lg p-4">
                    <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">What People Pay For</h4>
                    <p className="text-sm text-[#64607d] mb-3">Market demand and budget</p>
                    <p className="text-xs text-[#64607d] italic">Example: Landing pages, email marketing, app development</p>
                  </div>

                  <div className="border-2 border-blue-500 rounded-lg p-4">
                    <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-2">What You Enjoy</h4>
                    <p className="text-sm text-[#64607d] mb-3">Sustainable long-term interest</p>
                    <p className="text-xs text-[#64607d] italic">Example: Fitness industry, tech startups, non-profits</p>
                  </div>
                </div>

                <div className="bg-[#f8f9fb] rounded-lg p-6">
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    Worksheet: Fill This Out
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-[#1e1541] mb-1">Skills I have (list 5-10):</p>
                      <p className="text-[#64607d] italic">Example: Copywriting, SEO, WordPress, graphic design, social media ads...</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1e1541] mb-1">Industries I know or care about (list 5):</p>
                      <p className="text-[#64607d] italic">Example: Fitness, real estate, e-commerce, SaaS, healthcare...</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1e1541] mb-1">Problems I can solve (list 3):</p>
                      <p className="text-[#64607d] italic">Example: Low website conversions, poor SEO rankings, slow site speed...</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4">
                    2
                  </div>
                  <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
                    Step 2: Validate Demand (The Market Test)
                  </h3>
                </div>

                <p className="text-[#64607d] mb-6">
                  A niche is only good if people actually pay for it. Here's how to check:
                </p>

                <div className="space-y-4">
                  <div className="border-l-4 border-[#22c55e] pl-4">
                    <h4 className="font-semibold text-[#1e1541] mb-2">Test 1: Search Freelance Platforms</h4>
                    <p className="text-sm text-[#64607d] mb-2">
                      Go to Upwork, Fiverr, or Freelancer. Search for your niche. Are there active job postings? What do they pay?
                    </p>
                    <p className="text-xs text-[#22c55e] font-semibold">
                      ✅ Good Sign: 10+ job posts per week with budgets over $200
                    </p>
                  </div>

                  <div className="border-l-4 border-[#22c55e] pl-4">
                    <h4 className="font-semibold text-[#1e1541] mb-2">Test 2: Check Google Trends</h4>
                    <p className="text-sm text-[#64607d] mb-2">
                      Visit Google Trends and search "[your niche] services" or "[industry] freelancer". Is interest growing or declining?
                    </p>
                    <p className="text-xs text-[#22c55e] font-semibold">
                      ✅ Good Sign: Steady or rising trend over past 2 years
                    </p>
                  </div>

                  <div className="border-l-4 border-[#22c55e] pl-4">
                    <h4 className="font-semibold text-[#1e1541] mb-2">Test 3: Find 5 Competitors</h4>
                    <p className="text-sm text-[#64607d] mb-2">
                      Search "[your skill] for [industry]" and find other freelancers. If you find 5-20 people doing it successfully, that's validation.
                    </p>
                    <p className="text-xs text-[#22c55e] font-semibold">
                      ✅ Good Sign: Competitors with portfolios, testimonials, and active businesses
                    </p>
                  </div>

                  <div className="border-l-4 border-[#22c55e] pl-4">
                    <h4 className="font-semibold text-[#1e1541] mb-2">Test 4: Ask Potential Clients</h4>
                    <p className="text-sm text-[#64607d] mb-2">
                      Join Facebook groups, LinkedIn communities, or Reddit forums in your target industry. Ask: "What's your biggest challenge with [problem]?"
                    </p>
                    <p className="text-xs text-[#22c55e] font-semibold">
                      ✅ Good Sign: People respond with specific pain points you can solve
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4">
                    3
                  </div>
                  <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
                    Step 3: Craft Your Niche Statement
                  </h3>
                </div>

                <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg p-6 text-white mb-6">
                  <h4 className="font-heading font-bold text-xl mb-3">The Niche Statement Formula</h4>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 font-mono text-sm">
                    I help [TARGET CLIENT] achieve [SPECIFIC OUTCOME] through [YOUR METHOD]
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#f0fdf4] border border-[#22c55e] rounded-lg p-4">
                    <p className="text-sm font-semibold text-[#1e1541] mb-2">✅ Example 1: Writer</p>
                    <p className="text-sm text-[#64607d]">
                      "I help <strong>B2B SaaS companies</strong> achieve <strong>higher trial-to-paid conversions</strong> through <strong>email onboarding sequences</strong>."
                    </p>
                  </div>

                  <div className="bg-[#f0fdf4] border border-[#22c55e] rounded-lg p-4">
                    <p className="text-sm font-semibold text-[#1e1541] mb-2">✅ Example 2: Designer</p>
                    <p className="text-sm text-[#64607d]">
                      "I help <strong>health coaches and nutritionists</strong> achieve <strong>professional branding</strong> through <strong>Canva template kits</strong>."
                    </p>
                  </div>

                  <div className="bg-[#f0fdf4] border border-[#22c55e] rounded-lg p-4">
                    <p className="text-sm font-semibold text-[#1e1541] mb-2">✅ Example 3: Developer</p>
                    <p className="text-sm text-[#64607d]">
                      "I help <strong>online course creators</strong> achieve <strong>seamless payment processing</strong> through <strong>custom Stripe integrations</strong>."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section 1 */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Find Clients in Your Niche
              </h3>
              <p className="text-xl mb-6 text-white/90">
                Compare platforms that specialize in your industry
              </p>
              <Link
                href={`/${locale}/platforms`}
                className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Browse Platforms →
              </Link>
            </div>
          </section>

          {/* Section 3: 50+ Niche Ideas */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              50+ Profitable Freelance Niches (Organized by Skill)
            </h2>

            <p className="text-[#64607d] mb-8 leading-relaxed">
              Use this list as inspiration. Pick one that matches your skills + market demand + personal interest.
            </p>

            <div className="space-y-6">
              {/* Writers */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
                  ✍️ For Writers & Content Creators
                </h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• SaaS blog content and thought leadership</li>
                    <li>• E-commerce product descriptions (Shopify/Amazon)</li>
                    <li>• Email marketing sequences for coaches</li>
                    <li>• LinkedIn ghostwriting for executives</li>
                    <li>• Technical documentation for APIs</li>
                    <li>• SEO blog posts for real estate agents</li>
                    <li>• Case studies for B2B companies</li>
                  </ul>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Newsletter writing for newsletters</li>
                    <li>• Landing page copy for course creators</li>
                    <li>• White papers for fintech companies</li>
                    <li>• Video scripts for YouTube creators</li>
                    <li>• Press releases for startups</li>
                    <li>• Grant writing for non-profits</li>
                    <li>• Medical/health content (requires expertise)</li>
                  </ul>
                </div>
              </div>

              {/* Designers */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
                  🎨 For Designers & Creatives
                </h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Shopify store design for fashion brands</li>
                    <li>• Instagram templates for influencers</li>
                    <li>• Podcast cover art and branding</li>
                    <li>• Book cover design for self-publishers</li>
                    <li>• Presentation decks for sales teams</li>
                    <li>• Infographics for marketing agencies</li>
                    <li>• App UI/UX for fintech startups</li>
                  </ul>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Email newsletter design (Beehiiv, Substack)</li>
                    <li>• Twitch/YouTube branding packages</li>
                    <li>• Menu design for restaurants</li>
                    <li>• Real estate flyer templates</li>
                    <li>• Course platform design (Kajabi, Teachable)</li>
                    <li>• Wedding invitation suites</li>
                    <li>• Custom Notion workspace templates</li>
                  </ul>
                </div>
              </div>

              {/* Developers */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
                  💻 For Developers & Programmers
                </h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• WordPress speed optimization for agencies</li>
                    <li>• Shopify app development</li>
                    <li>• API integrations (Stripe, Zapier, etc.)</li>
                    <li>• Chrome extension development</li>
                    <li>• Custom Webflow components</li>
                    <li>• Bubble.io app development (no-code)</li>
                    <li>• WooCommerce customization</li>
                  </ul>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Mobile apps for local businesses</li>
                    <li>• Automation scripts (Python, JavaScript)</li>
                    <li>• Landing page builders (React, Vue)</li>
                    <li>• Database optimization for SaaS</li>
                    <li>• Security audits for startups</li>
                    <li>• Custom Airtable/Notion integrations</li>
                    <li>• Discord bot development</li>
                  </ul>
                </div>
              </div>

              {/* Marketers */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
                  📊 For Marketers & Strategists
                </h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Facebook ads for e-commerce brands</li>
                    <li>• SEO for law firms and attorneys</li>
                    <li>• Social media management for dentists</li>
                    <li>• Google Ads for SaaS companies</li>
                    <li>• Pinterest marketing for bloggers</li>
                    <li>• LinkedIn lead generation for B2B</li>
                  </ul>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• TikTok content strategy for brands</li>
                    <li>• Email automation for course creators</li>
                    <li>• Conversion rate optimization (CRO)</li>
                    <li>• Influencer marketing campaigns</li>
                    <li>• Community management for web3 projects</li>
                    <li>• Growth hacking for mobile apps</li>
                  </ul>
                </div>
              </div>

              {/* Other Skills */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
                  🎯 For Other Skills
                </h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Video editing for YouTubers</li>
                    <li>• Podcast editing and production</li>
                    <li>• Virtual assistance for real estate agents</li>
                    <li>• Bookkeeping for Shopify stores</li>
                    <li>• Transcription for legal firms</li>
                  </ul>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• 3D modeling for product designers</li>
                    <li>• Voice-over for e-learning courses</li>
                    <li>• Translation (Spanish, French, German)</li>
                    <li>• Data entry for healthcare providers</li>
                    <li>• Customer support for SaaS companies</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section 2 */}
          <section className="mb-16">
            <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Build Your Portfolio in Your Niche
              </h3>
              <p className="text-xl mb-6 text-gray-300">
                Learn how to create portfolio pieces even without clients
              </p>
              <Link
                href={`/${locale}/gids/aan-de-slag/freelance-portfolio-from-scratch`}
                className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Read Portfolio Guide →
              </Link>
            </div>
          </section>

          {/* Section 4: Common Mistakes */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              5 Niche Selection Mistakes to Avoid
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                  ❌ Mistake 1: Picking a Niche You Know Nothing About
                </h3>
                <p className="text-[#64607d] mb-2">
                  "Crypto is hot, I'll do crypto marketing!" If you don't understand the industry, you'll struggle to create compelling work.
                </p>
                <p className="text-sm text-[#22c55e]">
                  ✅ Better: Pick industries you already know or are willing to deeply research
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                  ❌ Mistake 2: Going Too Broad
                </h3>
                <p className="text-[#64607d] mb-2">
                  "I design websites" is still too general. "I design Shopify stores" is better. "I design Shopify stores for handmade jewelry brands" is perfect.
                </p>
                <p className="text-sm text-[#22c55e]">
                  ✅ Better: If your niche applies to 100,000+ businesses, it's too broad
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                  ❌ Mistake 3: Choosing a "Passion" with No Budget
                </h3>
                <p className="text-[#64607d] mb-2">
                  You love helping struggling artists? Great. But most artists can't afford $500 projects. Passion + budget = sustainable niche.
                </p>
                <p className="text-sm text-[#22c55e]">
                  ✅ Better: Validate that your target clients can and do pay for services
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                  ❌ Mistake 4: Switching Niches Every Month
                </h3>
                <p className="text-[#64607d] mb-2">
                  Niche success takes 3-6 months minimum. If you switch constantly, you never build authority or a portfolio.
                </p>
                <p className="text-sm text-[#22c55e]">
                  ✅ Better: Commit to one niche for at least 6 months before pivoting
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                  ❌ Mistake 5: Not Testing Before Committing
                </h3>
                <p className="text-[#64607d] mb-2">
                  Don't rebrand your entire profile overnight. Test your niche with 5-10 proposals first. See if people respond.
                </p>
                <p className="text-sm text-[#22c55e]">
                  ✅ Better: Soft launch with a few test projects, then go all-in
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Next Steps */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              What to Do After Choosing Your Niche
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
                <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                    Optimize Your Profile for Your Niche
                  </h3>
                  <p className="text-[#64607d] mb-3">
                    Rewrite your headline, bio, and portfolio to speak directly to your target client. Remove irrelevant projects.
                  </p>
                  <Link
                    href={`/${locale}/gids/aan-de-slag/profile-optimization-secrets`}
                    className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
                  >
                    Learn Profile Optimization →
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
                <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                    Create 3 Niche-Specific Portfolio Pieces
                  </h3>
                  <p className="text-[#64607d] mb-3">
                    Even if they're spec projects, create work that demonstrates your expertise in your chosen niche.
                  </p>
                  <Link
                    href={`/${locale}/gids/aan-de-slag/freelance-portfolio-from-scratch`}
                    className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
                  >
                    Build Your Portfolio →
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
                <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                    Start Applying to Niche-Specific Jobs
                  </h3>
                  <p className="text-[#64607d] mb-3">
                    Use your niche statement in every proposal. Apply only to jobs that match your specialization.
                  </p>
                  <Link
                    href={`/${locale}/gids/aan-de-slag/first-client-in-30-days`}
                    className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
                  >
                    Get Your First Client →
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Read More Getting Started Guides
              </h3>
              <p className="text-xl mb-6 text-white/90">
                Everything you need to launch your freelance career successfully
              </p>
              <Link
                href={`/${locale}/gids/aan-de-slag`}
                className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Browse All Guides →
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
              "@type": "HowTo",
              "name": "How to Choose Your Freelance Niche",
              "description": "Learn the proven framework to find your profitable freelance niche in 3 steps. Includes validation checklist and 50+ niche ideas.",
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "List Your Skills and Interests",
                  "text": "Find the intersection of what you're good at, what people pay for, and what you enjoy.",
                  "position": 1
                },
                {
                  "@type": "HowToStep",
                  "name": "Validate Market Demand",
                  "text": "Search freelance platforms, check Google Trends, find competitors, and ask potential clients.",
                  "position": 2
                },
                {
                  "@type": "HowToStep",
                  "name": "Craft Your Niche Statement",
                  "text": "Use the formula: I help [TARGET CLIENT] achieve [SPECIFIC OUTCOME] through [YOUR METHOD].",
                  "position": 3
                }
              ],
              "author": {
                "@type": "Organization",
                "name": "SkillLinkup"
              }
            })
          }}
        />
      </main>

      <Footer />
    </>
  );
}
