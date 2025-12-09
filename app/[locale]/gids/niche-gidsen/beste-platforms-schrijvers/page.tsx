import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'Beste Freelance Platforms voor Schrijvers & Copywriters 2026 | SkillLinkup',
    description: 'Ontdek waar schrijvers consistent werk vinden met eerlijke tarieven. Vergelijk de beste content platforms voor freelance writers, copywriters en bloggers.',
    alternates: {
      canonical: `https://skilllinkup.com/${locale}/gids/niche-gidsen/beste-platforms-schrijvers`,
      languages: {
        'nl': 'https://skilllinkup.com/nl/gids/niche-gidsen/beste-platforms-schrijvers',
        'en': 'https://skilllinkup.com/en/guide/niche-guides/best-platforms-writers',
        'x-default': 'https://skilllinkup.com/en/guide/niche-guides/best-platforms-writers',
      }
    },
    openGraph: {
      title: 'Beste Freelance Platforms voor Schrijvers & Copywriters 2026',
      description: 'Vind platforms met vaste opdrachten en eerlijke tarieven voor schrijvers.',
      url: `https://skilllinkup.com/${locale}/gids/niche-gidsen/beste-platforms-schrijvers`,
      siteName: 'SkillLinkup',
      locale: 'nl_NL',
      type: 'article',
    }
  };
}

export default async function BestePlatformsSchrijversPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Beste Freelance Platforms voor Schrijvers & Copywriters 2026',
    description: 'Ontdek waar schrijvers consistent werk vinden met eerlijke tarieven.',
    author: {
      '@type': 'Organization',
      name: 'SkillLinkup'
    },
    publisher: {
      '@type': 'Organization',
      name: 'SkillLinkup',
      logo: {
        '@type': 'ImageObject',
        url: 'https://skilllinkup.com/images/logo.png'
      }
    },
    datePublished: '2026-01-01',
    dateModified: '2026-01-01'
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-gradient-to-br from-[#1e1541] via-[#2a1f5e] to-[#1e1541] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Beste Freelance Platforms voor Schrijvers in 2026
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Als freelance schrijver wil je één ding: consistent werk tegen eerlijke tarieven. Genoeg van platforms die je €0,01 per woord betalen. Hier vind je waar schrijvers écht verdienen.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/platforms`}
                className="rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-3 text-white font-heading font-semibold shadow-lg transition-colors"
              >
                Vind Jouw Platform →
              </Link>
              <Link
                href={`/${locale}/gids/niche-gidsen`}
                className="rounded-lg bg-white/10 hover:bg-white/20 px-8 py-3 text-white font-heading font-semibold border border-white/30 transition-colors"
              >
                Meer Niche Gidsen
              </Link>
            </div>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">

          <section className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1e1541] mb-6">
              Waarom content mills je armer maken (niet rijker)
            </h2>
            <p className="text-lg text-[#64607d] mb-4">
              "500 woorden voor €5." Klinkt niet eens zo slecht tot je doorrekent dat dat <strong className="text-[#1e1541]">€0,01 per woord</strong> is. Je schrijft 2 uur voor een artikel, en verdient €2,50 per uur.
            </p>
            <p className="text-lg text-[#64607d] mb-4">
              Het probleem met content mills (TextBroker, Scripted, iWriter)? Ze racen naar de bodem. De klanten komen voor goedkoop content, niet voor kwaliteit. En dat betekent dat jij nooit goed betaald wordt, hoe goed je ook schrijft.
            </p>
            <p className="text-lg text-[#64607d] mb-6">
              Maar er zijn platforms waar schrijvers <strong className="text-[#1e1541]">€0,10-€0,50 per woord</strong> verdienen. Waar klanten begrijpen dat goed schrijven tijd en expertise kost. In deze gids laten we je zien welke platforms dat zijn.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1e1541] mb-6">
              Top 6 platforms voor freelance schrijvers
            </h2>

            <div className="space-y-8">
              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
                <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-3">
                  1. Contently - Voor premium content (€0,20-€1,00 per woord)
                </h3>
                <p className="text-[#64607d] mb-4">
                  <strong className="text-[#1e1541]">Waarom dit platform?</strong> Contently werkt alleen met enterprise klanten (Coca-Cola, Google, Microsoft) en vetted writers. Als je toegelaten wordt, schrijf je voor de beste merken ter wereld tegen topbedragen.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Top tarieven:</strong> €300-1.000+ per artikel (1.000-1.500 woorden)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Premium klanten:</strong> Fortune 500 bedrijven</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Steady work:</strong> Vaak maandelijkse retainers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Geen commissie:</strong> Je krijgt 100% van je tarief</span>
                  </li>
                </ul>
                <p className="text-[#64607d] italic">
                  Let op: Sollicitatie proces is zwaar. Je hebt minimaal 3-5 jaar ervaring nodig en publicaties in erkende media.
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
                <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-3">
                  2. Upwork - Grootste volume (€0,05-€0,30 per woord)
                </h3>
                <p className="text-[#64607d] mb-4">
                  <strong className="text-[#1e1541]">Waarom dit platform?</strong> Met 1.000+ nieuwe writing opdrachten per week is Upwork de Walmart van freelance schrijven. Je vindt hier alles: blogposts, whitepapers, SEO content, copywriting.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Enorm volume:</strong> Dagelijks 100+ nieuwe opdrachten</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Diverse niches:</strong> Tech, finance, health, marketing, etc.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Long-term clients:</strong> Bouw relaties met terugkerende klanten</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Flexibel:</strong> Per woord, per uur, of vaste prijs</span>
                  </li>
                </ul>
                <p className="text-[#64607d] italic">
                  Let op: 10% commissie op eerste €500 met klant, schaal af naar 5%.
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
                <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-3">
                  3. Skyword - Voor content marketing (€0,15-€0,60 per woord)
                </h3>
                <p className="text-[#64607d] mb-4">
                  <strong className="text-[#1e1541]">Waarom dit platform?</strong> Skyword is een content marketing platform dat schrijvers matcht met enterprise klanten. Ze focussen op long-form content en thought leadership.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Long-form focus:</strong> 1.500-3.000 woord artikelen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Goede tarieven:</strong> €250-800 per artikel</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Professioneel:</strong> Editors reviewen je werk</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
                <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-3">
                  4. ClearVoice - Voor niche specialisten (€0,10-€0,40 per woord)
                </h3>
                <p className="text-[#64607d] mb-4">
                  <strong className="text-[#1e1541]">Waarom dit platform?</strong> ClearVoice zoekt specifiek naar schrijvers met niche expertise (tech, SaaS, healthcare, finance). Als je een specialisatie hebt, betaalt dit goed.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Niche expertise:</strong> Specialisten verdienen meer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Direct matches:</strong> Platform matcht je met klanten</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Portfolio builder:</strong> Mooie portfolio feature</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
                <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-3">
                  5. Medium Partner Program - Voor thought leaders (Passief inkomen)
                </h3>
                <p className="text-[#64607d] mb-4">
                  <strong className="text-[#1e1541]">Waarom dit platform?</strong> Niet echt een freelance platform, maar een manier om passief inkomen te verdienen met je schrijven. Je krijgt betaald op basis van reading time van je artikelen.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Passief inkomen:</strong> Artikelen blijven verdienen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Geen klanten nodig:</strong> Je schrijft wat je wilt</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Audience building:</strong> Bouw je eigen volgers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Portfolio:</strong> Laat je expertise zien aan potentiële klanten</span>
                  </li>
                </ul>
                <p className="text-[#64607d] italic">
                  Realistisch: €100-500/maand voor actieve schrijvers met goede artikelen. Top writers verdienen €2.000-5.000/maand.
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
                <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-3">
                  6. ProBlogger Job Board - Voor bloggers (€0,10-€0,50 per woord)
                </h3>
                <p className="text-[#64607d] mb-4">
                  <strong className="text-[#1e1541]">Waarom dit platform?</strong> ProBlogger is een job board speciaal voor bloggers en content writers. Geen platform commissies, directe deals met klanten.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Geen commissie:</strong> 100% van je tarief</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Kwaliteit klanten:</strong> Bedrijven die bloggers waarderen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Transparante prijzen:</strong> Klanten vermelden vaak budget</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <div className="rounded-lg bg-gradient-to-r from-[#ef2b70] to-[#d91a5f] p-8 text-white mb-12">
            <h3 className="font-heading text-2xl font-bold mb-4">
              Copywriter of contentschrijver?
            </h3>
            <p className="text-lg mb-6">
              Copywriters verdienen vaak meer (€0,30-€1,00 per woord) maar hebben andere vaardigheden nodig. Als je sales copy, advertenties, of landingspages schrijft, zijn er betere platforms voor jou.
            </p>
            <Link
              href={`/${locale}/platforms`}
              className="inline-block rounded-lg bg-white text-[#ef2b70] hover:bg-gray-100 px-8 py-3 font-heading font-semibold shadow-lg transition-colors"
            >
              Filter op Copywriting →
            </Link>
          </div>

          <section className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1e1541] mb-6">
              Hoe kies je het juiste platform voor jouw schrijfstijl?
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-3">
                  Bepaal eerst wat voor schrijver je bent
                </h3>
                <div className="rounded-lg shadow bg-white p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[#ef2b70] font-bold mr-3">→</span>
                      <span className="text-[#64607d]">
                        <strong className="text-[#1e1541]">SEO contentschrijver:</strong> Upwork en ClearVoice hebben het meeste volume. Focus op blogposts en artikelen.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#ef2b70] font-bold mr-3">→</span>
                      <span className="text-[#64607d]">
                        <strong className="text-[#1e1541]">Copywriter:</strong> Contently of direct client acquisition. Sales copy betaalt beter dan blog content.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#ef2b70] font-bold mr-3">→</span>
                      <span className="text-[#64607d]">
                        <strong className="text-[#1e1541]">Technical writer:</strong> Upwork voor SaaS/tech bedrijven. Vraag €0,20-0,50 per woord.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#ef2b70] font-bold mr-3">→</span>
                      <span className="text-[#64607d]">
                        <strong className="text-[#1e1541]">Thought leader:</strong> Medium Partner Program + LinkedIn. Bouw audience, verdien passief.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#ef2b70] font-bold mr-3">→</span>
                      <span className="text-[#64607d]">
                        <strong className="text-[#1e1541]">Ghostwriter:</strong> Upwork of directe klant acquisitie. Vraag premium (€0,30-1,00 per woord).
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-3">
                  Niche expertise = hogere tarieven
                </h3>
                <p className="text-[#64607d] mb-4">
                  "Ik schrijf over alles" is de slechtste positie. Specialisten verdienen 2-3x meer dan generalisten. Waarom?
                </p>
                <div className="rounded-lg shadow bg-white p-6">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-3 font-heading text-[#1e1541]">Type</th>
                        <th className="pb-3 font-heading text-[#1e1541]">Tarief</th>
                        <th className="pb-3 font-heading text-[#1e1541]">Waarom</th>
                      </tr>
                    </thead>
                    <tbody className="text-[#64607d]">
                      <tr className="border-b">
                        <td className="py-3">Generalist</td>
                        <td className="py-3">€0,05-0,10</td>
                        <td className="py-3">Veel competitie, weinig differentiatie</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">SaaS writer</td>
                        <td className="py-3">€0,15-0,40</td>
                        <td className="py-3">Begrijpt tech, minder writers in niche</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Finance writer</td>
                        <td className="py-3">€0,20-0,60</td>
                        <td className="py-3">Compliance vereist, hoge value content</td>
                      </tr>
                      <tr>
                        <td className="py-3">Healthcare writer</td>
                        <td className="py-3">€0,25-0,80</td>
                        <td className="py-3">Medical kennis vereist, weinig experts</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1e1541] mb-6">
              Portfolio opbouwen als schrijver (zonder gratis te werken)
            </h2>
            <p className="text-lg text-[#64607d] mb-6">
              "Ik heb geen portfolio" is geen excuus meer. Hier is hoe je een killer portfolio maakt zonder gratis te werken:
            </p>

            <div className="space-y-6">
              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
                  Strategie #1: Medium artikelen schrijven
                </h3>
                <p className="text-[#64607d] mb-3">
                  Schrijf 5-8 artikelen op Medium in jouw niche. Dit zijn je portfolio voorbeelden én je krijgt betaald door het Partner Program.
                </p>
                <ul className="space-y-2 ml-6 list-disc text-[#64607d]">
                  <li>Kies onderwerpen waar je expertise in hebt</li>
                  <li>Maak het actionable (niet alleen theorie)</li>
                  <li>Gebruik data en voorbeelden</li>
                  <li>Promoot op LinkedIn en Twitter</li>
                </ul>
              </div>

              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
                  Strategie #2: Hypothetische case studies
                </h3>
                <p className="text-[#64607d] mb-3">
                  Schrijf artikelen voor niet-bestaande klanten. "Case study: Hoe ik Shopify's conversie met 40% zou verhogen" laat je skills zien zonder echte klant.
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
                  Strategie #3: Eigen blog met SEO focus
                </h3>
                <p className="text-[#64607d] mb-3">
                  Start een niche blog en rank voor relevante keywords. Dit laat zien dat je SEO snapt én je krijgt passief traffic/inbound leads.
                </p>
                <p className="text-[#64607d] italic">
                  Voorbeeld: Blog over "SaaS content marketing" rankt voor je keywords én trekt SaaS klanten aan.
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
                  Strategie #4: LinkedIn artikelen
                </h3>
                <p className="text-[#64607d]">
                  Post thought leadership artikelen op LinkedIn. Je bouwt je netwerk én gebruikt ze als portfolio voorbeelden. Bonus: potentiële klanten zien je expertise.
                </p>
              </div>
            </div>
          </section>

          <div className="rounded-lg bg-[#f8f9fb] p-8 mb-12">
            <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-4">
              Pricing guide: wat vraag je als schrijver?
            </h3>
            <p className="text-[#64607d] mb-6">
              De grootste fout? Te goedkoop beginnen. Hier zijn realistische tarieven voor 2026:
            </p>
            <div className="rounded-lg shadow bg-white p-6">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 font-heading text-[#1e1541]">Type Content</th>
                    <th className="pb-3 font-heading text-[#1e1541]">Beginner</th>
                    <th className="pb-3 font-heading text-[#1e1541]">Gevorderd</th>
                    <th className="pb-3 font-heading text-[#1e1541]">Expert</th>
                  </tr>
                </thead>
                <tbody className="text-[#64607d]">
                  <tr className="border-b">
                    <td className="py-3">Blogpost (1.000w)</td>
                    <td className="py-3">€50-100</td>
                    <td className="py-3">€100-300</td>
                    <td className="py-3">€300-800</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Long-form artikel (2.000w)</td>
                    <td className="py-3">€150-250</td>
                    <td className="py-3">€250-600</td>
                    <td className="py-3">€600-1.500</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Whitepaper (3.000-5.000w)</td>
                    <td className="py-3">€400-800</td>
                    <td className="py-3">€800-2.000</td>
                    <td className="py-3">€2.000-5.000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Sales page</td>
                    <td className="py-3">€200-400</td>
                    <td className="py-3">€400-1.000</td>
                    <td className="py-3">€1.000-3.000</td>
                  </tr>
                  <tr>
                    <td className="py-3">Per woord tarief</td>
                    <td className="py-3">€0,05-0,10</td>
                    <td className="py-3">€0,10-0,30</td>
                    <td className="py-3">€0,30-1,00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-[#64607d] mt-4 italic">
              * Niche specialisten (finance, healthcare, legal) kunnen 50-100% hogere tarieven vragen.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1e1541] mb-6">
              Grootste fouten van freelance schrijvers
            </h2>

            <div className="space-y-6">
              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3 flex items-center">
                  <span className="text-[#ef2b70] mr-3">✕</span>
                  Fout #1: Te goedkoop beginnen "om klanten te krijgen"
                </h3>
                <p className="text-[#64607d] mb-3">
                  €0,01-0,03 per woord omdat "ik heb nog geen ervaring". Je traint klanten om weinig te betalen. Het is bijna onmogelijk om later je tarief te verhogen met dezelfde klanten.
                </p>
                <p className="text-[#64607d] font-semibold text-[#22c55e]">
                  ✓ Beter: Start op €0,08-0,12 per woord. Lever kwaliteit. Goede klanten betalen graag voor kwaliteit, ook aan beginners.
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3 flex items-center">
                  <span className="text-[#ef2b70] mr-3">✕</span>
                  Fout #2: Schrijven zonder research
                </h3>
                <p className="text-[#64607d] mb-3">
                  Je levert generic content zonder data, voorbeelden, of originele insights. Klant kan het verschil zien tussen 30 minuten Googlen en échte expertise.
                </p>
                <p className="text-[#64607d] font-semibold text-[#22c55e]">
                  ✓ Beter: Investeer 30-40% van je tijd in research. Gebruik studies, data, interviews, examples. Premium content = premium tarief.
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3 flex items-center">
                  <span className="text-[#ef2b70] mr-3">✕</span>
                  Fout #3: Geen revisies limiet afspreken
                </h3>
                <p className="text-[#64607d] mb-3">
                  Klant vraagt "kleine aanpassingen" 5x. Jouw €100 artikel kost je nu 8 uur werk = €12,50 per uur.
                </p>
                <p className="text-[#64607d] font-semibold text-[#22c55e]">
                  ✓ Beter: Spreek af: "2 revisie rondes included, daarna €50 per extra revisie." Bescherm je tijd.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1e1541] mb-6">
              Stappenplan: je eerste €3.000 als freelance schrijver
            </h2>

            <div className="space-y-4">
              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#22c55e]">
                <div className="flex items-start">
                  <span className="text-3xl font-bold text-[#1e1541] mr-4">1</span>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-2">
                      Kies je niche (Week 1)
                    </h3>
                    <p className="text-[#64607d]">
                      Waar heb je ervaring of interesse? SaaS? E-commerce? Finance? Kies één ding en word daar expert in. Schrijf 3-5 sample artikelen op Medium.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#22c55e]">
                <div className="flex items-start">
                  <span className="text-3xl font-bold text-[#1e1541] mr-4">2</span>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-2">
                      Bouw je portfolio (Week 1-2)
                    </h3>
                    <p className="text-[#64607d]">
                      5-8 artikelen is genoeg. Mix van Medium posts, LinkedIn artikelen, en/of hypothetische case studies. Maak het scanbaar en laat je expertise zien.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#22c55e]">
                <div className="flex items-start">
                  <span className="text-3xl font-bold text-[#1e1541] mr-4">3</span>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-2">
                      Schrijf je in op 2-3 platforms (Week 2)
                    </h3>
                    <p className="text-[#64607d] mb-3">
                      Start met Upwork (volume) + ProBlogger (kwaliteit klanten). Solliciteer eventueel bij Contently of ClearVoice.
                    </p>
                    <p className="text-[#64607d] italic">
                      Pro tip: Maak je Upwork profiel niche-specifiek. &quot;SaaS Content Writer&quot; &gt; &quot;Freelance Writer&quot;
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#22c55e]">
                <div className="flex items-start">
                  <span className="text-3xl font-bold text-[#1e1541] mr-4">4</span>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-2">
                      Land je eerste klanten (Week 2-4)
                    </h3>
                    <p className="text-[#64607d] mb-3">
                      Bid op 5-10 opdrachten per dag op Upwork. Schrijf custom proposals (geen templates!). Referentie naar je portfolio. Start met €0,10 per woord.
                    </p>
                    <p className="text-[#64607d] italic">
                      Target: 2-3 klanten in eerste maand, 5.000-10.000 woorden schrijven = €500-1.000
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#22c55e]">
                <div className="flex items-start">
                  <span className="text-3xl font-bold text-[#1e1541] mr-4">5</span>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-2">
                      Schaal naar €3.000/maand (Maand 2-3)
                    </h3>
                    <p className="text-[#64607d] mb-3">
                      Met 3-5 reviews kun je selectiever worden:
                    </p>
                    <ul className="space-y-1 ml-6 list-disc text-[#64607d]">
                      <li>Verhoog tarief naar €0,15-0,20 per woord</li>
                      <li>Zoek retainer klanten (4-8 artikelen per maand)</li>
                      <li>15.000-20.000 woorden per maand = €3.000</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1e1541] mb-6">
              Veelgestelde vragen van schrijvers
            </h2>

            <div className="space-y-6">
              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
                  Kan ik fulltime leven van freelance schrijven?
                </h3>
                <p className="text-[#64607d]">
                  Ja. Met €0,15 per woord en 20.000 woorden per maand verdien je €3.000. Dat is 4-5 artikelen van 1.000 woorden per week. Realistisch als je 20-25 uur per week werkt (inclusief research, revisies, acquisitie).
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
                  Moet ik een bepaald Engels niveau hebben?
                </h3>
                <p className="text-[#64607d]">
                  Voor internationale platforms (Upwork, Contently): ja, near-native Engels. Voor Nederlandse content: perfecte Nederlandse spelling en grammatica. Investeer in Grammarly Premium of ProWritingAid als je in het Engels schrijft.
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
                  Hoeveel uur duurt het om een goed artikel te schrijven?
                </h3>
                <p className="text-[#64607d]">
                  1.000 woorden artikel: 3-5 uur (research 1-2u, schrijven 1-2u, edits 1u). Met ervaring wordt dit sneller. Top writers schrijven 1.000 woorden in 2-3 uur totaal.
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
                  Zijn AI tools zoals ChatGPT een bedreiging voor schrijvers?
                </h3>
                <p className="text-[#64607d]">
                  AI is een tool, geen vervanger. Gebruik ChatGPT voor research, outlines, en eerste drafts. Maar je expertise, originele insights, en schrijfstijl zijn wat klanten betalen. AI schrijft generic content. Jij schrijft waardevol content.
                </p>
              </div>
            </div>
          </section>

          <div className="rounded-lg bg-[#f8f9fb] p-8 mb-12">
            <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-4">
              Ontdek meer niche gidsen
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href={`/${locale}/gids/niche-gidsen/beste-platforms-webdevelopers`}
                className="rounded-lg bg-white hover:shadow-lg p-4 border border-gray-200 transition-shadow"
              >
                <h4 className="font-heading font-semibold text-[#1e1541] mb-2">
                  Voor Webontwikkelaars →
                </h4>
                <p className="text-sm text-[#64607d]">
                  Platforms speciaal voor developers met de hoogste tarieven
                </p>
              </Link>
              <Link
                href={`/${locale}/gids/niche-gidsen/beste-platforms-virtual-assistants`}
                className="rounded-lg bg-white hover:shadow-lg p-4 border border-gray-200 transition-shadow"
              >
                <h4 className="font-heading font-semibold text-[#1e1541] mb-2">
                  Voor Virtual Assistants →
                </h4>
                <p className="text-sm text-[#64607d]">
                  VA mogelijkheden met vaste klanten en recurring revenue
                </p>
              </Link>
            </div>
          </div>

          <div className="rounded-lg bg-gradient-to-br from-[#1e1541] to-[#2a1f5e] p-8 text-white text-center">
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
              Klaar om serieus geld te verdienen met schrijven?
            </h3>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              Vergelijk alle platforms op tarieven, type content, commissies en klant kwaliteit. Vind het platform waar jouw schrijftalent het meest gewaardeerd wordt.
            </p>
            <Link
              href={`/${locale}/platforms`}
              className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-colors text-lg"
            >
              Vind Jouw Ideale Platform →
            </Link>
          </div>

        </div>
      </article>
    </>
  );
}
