import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'Beste Freelance Platforms voor Grafisch Designers 2026 | SkillLinkup',
    description: 'Ontdek waar designers het meeste verdienen. Vergelijk de beste freelance platforms voor grafisch ontwerpers, UX/UI designers en creatieve professionals.',
    alternates: {
      canonical: `https://skilllinkup.com/${locale}/gids/niche-gidsen/beste-platforms-grafisch-designers`,
      languages: {
        'nl': 'https://skilllinkup.com/nl/gids/niche-gidsen/beste-platforms-grafisch-designers',
        'en': 'https://skilllinkup.com/en/guide/niche-guides/best-platforms-graphic-designers',
        'x-default': 'https://skilllinkup.com/en/guide/niche-guides/best-platforms-graphic-designers',
      }
    },
    openGraph: {
      title: 'Beste Freelance Platforms voor Grafisch Designers 2026',
      description: 'Vind de platforms waar designers topklanten en eerlijke tarieven vinden.',
      url: `https://skilllinkup.com/${locale}/gids/niche-gidsen/beste-platforms-grafisch-designers`,
      siteName: 'SkillLinkup',
      locale: 'nl_NL',
      type: 'article',
    }
  };
}

export default async function BestePlatformsGrafischDesignersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Beste Freelance Platforms voor Grafisch Designers 2026',
    description: 'Ontdek waar designers het meeste verdienen. Vergelijk de beste freelance platforms voor grafisch ontwerpers.',
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
              Beste Freelance Platforms voor Grafisch Designers in 2026
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Als designer wil je werken voor topklanten die jouw creativiteit waarderen en er goed voor betalen. Niet elk platform snapt dat. Hier vind je de platforms waar design écht gewaardeerd wordt.
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
              Waarom designers speciale platforms nodig hebben
            </h2>
            <p className="text-lg text-[#64607d] mb-4">
              "Ik heb een logo nodig voor €50." Deze zin hoor je te vaak op algemene freelance platforms. Het probleem? Klanten die design niet begrijpen, racen naar de bodem qua prijzen.
            </p>
            <p className="text-lg text-[#64607d] mb-4">
              Maar er zijn gelukkig platforms waar <strong className="text-[#1e1541]">kwaliteit centraal staat</strong> en klanten begrijpen dat goed design je €2.000-5.000 voor een logo oplevert, niet €50.
            </p>
            <p className="text-lg text-[#64607d] mb-6">
              In deze gids laten we je zien waar designers zoals jij topklanten vinden, eerlijke tarieven krijgen, en waar je portfolio het verschil maakt - niet alleen je prijs.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1e1541] mb-6">
              Top 6 platforms voor grafisch designers
            </h2>

            <div className="space-y-8">
              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
                <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-3">
                  1. Dribbble Pro - Voor top designers (€1.000-5.000 per project)
                </h3>
                <p className="text-[#64607d] mb-4">
                  <strong className="text-[#1e1541]">Waarom dit platform?</strong> Dribbble is in de eerste plaats een portfolio platform, maar de Pro versie geeft je toegang tot het "Freelance" dashboard waar bedrijven jou vinden. Dit zijn geen willekeurige klanten - denk aan Airbnb, Shopify en Nike.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Portfolio first:</strong> Klanten zien eerst je werk, dan pas je prijs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Topklanten:</strong> Bedrijven die begrijpen wat design waard is</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Geen race naar de bodem:</strong> Kwaliteit &gt; prijs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Community:</strong> Netwerk met andere top designers</span>
                  </li>
                </ul>
                <p className="text-[#64607d] italic">
                  Let op: Je hebt een sterk portfolio nodig om Dribbble Pro te halen. Maar als je erin komt, is het goudmijn.
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
                <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-3">
                  2. 99designs - Voor contest lovers (€500-3.000 per project)
                </h3>
                <p className="text-[#64607d] mb-4">
                  <strong className="text-[#1e1541]">Waarom dit platform?</strong> 99designs werkt anders: klanten schrijven een design contest uit, designers dienen werk in, winnaar krijgt betaald. Controversieel, maar kan lucratief zijn als je weet hoe je moet winnen.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Hoge prijzen:</strong> Gemiddelde contest is €800-1.500</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Portfolio builder:</strong> Win contests = sterke portfolio</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>1-op-1 projects:</strong> Ook mogelijk buiten contests</span>
                  </li>
                </ul>
                <p className="text-[#64607d] italic">
                  Let op: Je doet gratis werk als je niet wint. Strategisch meedoen aan contests waar je een goede kans hebt.
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
                <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-3">
                  3. Behance - Voor Adobe liefhebbers (Gratis portfolio + hiring)
                </h3>
                <p className="text-[#64607d] mb-4">
                  <strong className="text-[#1e1541]">Waarom dit platform?</strong> Behance is Adobe's portfolio platform met 150+ miljoen bezoekers per maand. Klanten komen naar jou toe als ze onder de indruk zijn van je work.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Gratis:</strong> Geen platform fees of commissies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Enorm bereik:</strong> Miljoenen potentiële klanten</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Adobe integratie:</strong> Projecten uploaden vanuit Creative Cloud</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
                <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-3">
                  4. Upwork Design - Voor steady income (€40-80/uur)
                </h3>
                <p className="text-[#64607d] mb-4">
                  <strong className="text-[#1e1541]">Waarom dit platform?</strong> Upwork heeft een dedicated design categorie met duizenden opdrachten per week. Minder prestigieus dan Dribbble, maar wel consistent werk.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Volume:</strong> 500+ nieuwe design jobs per week</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Variety:</strong> Logos, websites, illustraties, branding</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Long-term clients:</strong> Vind retainer deals</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
                <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-3">
                  5. Toptal Design - Voor senior UX/UI designers (€70-120/uur)
                </h3>
                <p className="text-[#64607d] mb-4">
                  <strong className="text-[#1e1541]">Waarom dit platform?</strong> Toptal's design tak is selectief (3% acceptance rate) maar betaalt top dollar voor product designers en UX specialists.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Premium tarieven:</strong> €80-120/uur standaard</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Enterprise klanten:</strong> Fortune 500 bedrijven</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Fulltime projects:</strong> 3-12 maanden contracten</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
                <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-3">
                  6. Fiverr Pro - Voor productized services (€300-2.000 per gig)
                </h3>
                <p className="text-[#64607d] mb-4">
                  <strong className="text-[#1e1541]">Waarom dit platform?</strong> Fiverr Pro is alleen voor top designers. Je maakt gestandaardiseerde packages (bijv. "Logo + Brand Guide €1.200") en klanten bestellen.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Passive income model:</strong> Klanten komen naar jou</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Clear pricing:</strong> Geen onderhandelen over tarief</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#22c55e] mr-2">✓</span>
                    <span className="text-[#64607d]"><strong>Schaalbaar:</strong> Meerdere klanten tegelijk</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <div className="rounded-lg bg-gradient-to-r from-[#ef2b70] to-[#d91a5f] p-8 text-white mb-12">
            <h3 className="font-heading text-2xl font-bold mb-4">
              Ben je UX/UI designer of product designer?
            </h3>
            <p className="text-lg mb-6">
              Dan zijn de vereisten anders. UX/UI designers verdienen meer (€60-120/uur) maar hebben portfolio met case studies nodig. Vergelijk de platforms speciaal voor product design.
            </p>
            <Link
              href={`/${locale}/platforms`}
              className="inline-block rounded-lg bg-white text-[#ef2b70] hover:bg-gray-100 px-8 py-3 font-heading font-semibold shadow-lg transition-colors"
            >
              Filter op UX/UI Design →
            </Link>
          </div>

          <section className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1e1541] mb-6">
              Hoe kies je tussen deze platforms?
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-3">
                  Je design specialisatie bepaalt het beste platform
                </h3>
                <div className="rounded-lg shadow bg-white p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[#ef2b70] font-bold mr-3">→</span>
                      <span className="text-[#64607d]">
                        <strong className="text-[#1e1541]">Logo & Branding:</strong> Start op 99designs of Fiverr Pro. Veel volume, vaste prijzen.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#ef2b70] font-bold mr-3">→</span>
                      <span className="text-[#64607d]">
                        <strong className="text-[#1e1541]">UX/UI Design:</strong> Ga voor Toptal of Dribbble Pro. Klanten zoeken ervaren designers.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#ef2b70] font-bold mr-3">→</span>
                      <span className="text-[#64607d]">
                        <strong className="text-[#1e1541]">Web Design:</strong> Upwork heeft het meeste volume voor website design.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#ef2b70] font-bold mr-3">→</span>
                      <span className="text-[#64607d]">
                        <strong className="text-[#1e1541]">Illustratie:</strong> Behance + Dribbble combinatie werkt het beste.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#ef2b70] font-bold mr-3">→</span>
                      <span className="text-[#64607d]">
                        <strong className="text-[#1e1541]">Motion Graphics:</strong> Upwork en directe klant acquisitie via Behance.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-3">
                  Je ervaringsniveau maakt verschil
                </h3>
                <p className="text-[#64607d] mb-4">
                  Wees eerlijk tegen jezelf. Platforms zoals Toptal en Dribbble Pro zijn voor seniors. Probeer je er te vroeg in te komen, dan ben je kansloos.
                </p>
                <div className="rounded-lg shadow bg-white p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-heading font-bold text-[#1e1541] mb-2">Beginnend designer (0-2 jaar)</h4>
                      <p className="text-[#64607d]">
                        Start op <strong>Fiverr</strong> (niet Pro!) of <strong>99designs</strong>. Bouw portfolio op, verzamel reviews, leer van feedback. Investeer zwaar in je Behance portfolio.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-[#1e1541] mb-2">Mid-level designer (2-5 jaar)</h4>
                      <p className="text-[#64607d]">
                        Tijd voor <strong>Upwork</strong>, <strong>Fiverr Pro</strong>, of <strong>99designs</strong> high-end contests. Je portfolio is sterk genoeg om €50-80/uur te vragen.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-[#1e1541] mb-2">Senior designer (5+ jaar)</h4>
                      <p className="text-[#64607d]">
                        Solliciteer bij <strong>Toptal</strong> en maak een killer <strong>Dribbble Pro</strong> profiel. Dit is waar je €80-120/uur verdient aan enterprise klanten.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1e1541] mb-6">
              Portfolio opbouwen: wat klanten echt willen zien
            </h2>
            <p className="text-lg text-[#64607d] mb-6">
              Je portfolio maakt of breekt je succes op elk platform. Maar wat werkt écht?
            </p>

            <div className="space-y-6">
              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
                  1. Case studies &gt; mooie plaatjes
                </h3>
                <p className="text-[#64607d] mb-3">
                  Stop met alleen je eindresultaat te laten zien. Klanten willen begrijpen:
                </p>
                <ul className="space-y-2 ml-6 list-disc text-[#64607d]">
                  <li>Wat was het probleem?</li>
                  <li>Hoe heb je het opgelost?</li>
                  <li>Wat was het resultaat? (metrics!)</li>
                  <li>Hoe zag je proces eruit?</li>
                </ul>
                <p className="text-[#64607d] mt-3 italic">
                  Voorbeeld: &quot;Logo redesign die sales met 40% verhoogde&quot; &gt; &quot;Mooi logo voor klant X&quot;
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
                  2. Laat je specialisatie zien
                </h3>
                <p className="text-[#64607d] mb-3">
                  Geen portfolio vol "van alles een beetje". Klanten willen een specialist inhuren:
                </p>
                <ul className="space-y-2 ml-6 list-disc text-[#64607d]">
                  <li><strong>Goed:</strong> 10 logo projecten die laten zien dat je branding snapt</li>
                  <li><strong>Fout:</strong> 2 logos, 1 website, 3 illustraties, 1 foto</li>
                </ul>
              </div>

              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
                  3. Resultaten spreken harder dan stijl
                </h3>
                <p className="text-[#64607d]">
                  &quot;Redesign die conversie met 60% verhoogde&quot; verkoopt beter dan &quot;Award-winning design&quot;. Business impact &gt; design awards.
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
                  4. Hoge resolutie mockups zijn de standaard
                </h3>
                <p className="text-[#64607d] mb-3">
                  Investeer in goede mockup templates. Je logo op een koffiekopje, visitiekaartje en billboard laat zien hoe het in de echte wereld werkt.
                </p>
                <p className="text-[#64607d] italic">
                  Tools: Placeit, Smartmockups, of Adobe Stock mockups
                </p>
              </div>
            </div>
          </section>

          <div className="rounded-lg bg-[#f8f9fb] p-8 mb-12">
            <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-4">
              Design pricing guide: wat vraag je?
            </h3>
            <p className="text-[#64607d] mb-6">
              Pricing is lastig. Te goedkoop en je wordt niet serieus genomen. Te duur en je krijgt geen klanten. Hier zijn marktconforme prijzen voor 2026:
            </p>
            <div className="rounded-lg shadow bg-white p-6">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 font-heading text-[#1e1541]">Service</th>
                    <th className="pb-3 font-heading text-[#1e1541]">Junior</th>
                    <th className="pb-3 font-heading text-[#1e1541]">Mid</th>
                    <th className="pb-3 font-heading text-[#1e1541]">Senior</th>
                  </tr>
                </thead>
                <tbody className="text-[#64607d]">
                  <tr className="border-b">
                    <td className="py-3">Logo design</td>
                    <td className="py-3">€200-500</td>
                    <td className="py-3">€500-1.500</td>
                    <td className="py-3">€1.500-5.000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Website design</td>
                    <td className="py-3">€800-2.000</td>
                    <td className="py-3">€2.000-5.000</td>
                    <td className="py-3">€5.000-15.000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Brand identity</td>
                    <td className="py-3">€1.000-2.500</td>
                    <td className="py-3">€2.500-8.000</td>
                    <td className="py-3">€8.000-25.000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">UX/UI (per scherm)</td>
                    <td className="py-3">€100-250</td>
                    <td className="py-3">€250-600</td>
                    <td className="py-3">€600-1.500</td>
                  </tr>
                  <tr>
                    <td className="py-3">Uurtarief</td>
                    <td className="py-3">€30-50</td>
                    <td className="py-3">€50-80</td>
                    <td className="py-3">€80-150</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-[#64607d] mt-4 italic">
              * Prijzen zijn voor de Nederlandse/Belgische markt. Amerikaanse klanten betalen vaak 50-100% meer.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1e1541] mb-6">
              Designers' grootste fouten op freelance platforms
            </h2>

            <div className="space-y-6">
              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3 flex items-center">
                  <span className="text-[#ef2b70] mr-3">✕</span>
                  Fout #1: Meedoen aan 99designs contests zonder strategie
                </h3>
                <p className="text-[#64607d] mb-3">
                  Zomaar 30 designs maken voor elke contest is verspilling van tijd. 90% van de designers wint nooit omdat ze de briefing niet goed lezen of de verkeerde contests kiezen.
                </p>
                <p className="text-[#64607d] font-semibold text-[#22c55e]">
                  ✓ Beter: Kies contests waar je ervaring hebt, lees de briefing 3x, en lever max 5-8 sterke concepten. Kwaliteit &gt; kwantiteit.
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3 flex items-center">
                  <span className="text-[#ef2b70] mr-3">✕</span>
                  Fout #2: Een saai, generiek portfolio
                </h3>
                <p className="text-[#64607d] mb-3">
                  20 logo's zonder context, geen process shots, geen uitleg. Klanten kunnen niet zien waarom ze jou zouden inhuren boven designer #4728.
                </p>
                <p className="text-[#64607d] font-semibold text-[#22c55e]">
                  ✓ Beter: 8-10 projecten met case studies. Laat je proces zien, de uitdaging, en het resultaat. Maak het personal.
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3 flex items-center">
                  <span className="text-[#ef2b70] mr-3">✕</span>
                  Fout #3: Design files niet professioneel opleveren
                </h3>
                <p className="text-[#64607d] mb-3">
                  Je levert een .jpg logo aan zonder vectorbestanden, style guide, of verschillende formaten. Klant moet terugkomen voor aanpassingen = slechte review.
                </p>
                <p className="text-[#64607d] font-semibold text-[#22c55e]">
                  ✓ Beter: Lever altijd een compleet package: AI/EPS/PDF + PNG/JPG in verschillende sizes + style guide met kleuren/fonts. Overdeliver.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1e1541] mb-6">
              Veelgestelde vragen van designers
            </h2>

            <div className="space-y-6">
              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
                  Moet ik gratis werk doen om mijn portfolio op te bouwen?
                </h3>
                <p className="text-[#64607d]">
                  Nee. Maak liever conceptuele projecten voor niet-bestaande merken. "Rebrand voor Spotify" of "Nike campaign concept" laten net zo goed je skills zien zonder dat je gratis werkt. Klanten respecteren designers die hun tijd waarderen.
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
                  Welk platform is het beste voor Nederlandse designers?
                </h3>
                <p className="text-[#64607d]">
                  Als je alleen Nederlandse klanten wilt: kijk naar Freelance.nl of Werkspot. Maar internationale platforms (Upwork, Dribbble) betalen vaak beter. Amerikaanse klanten betalen €80-120/uur waar Nederlandse klanten €40-60/uur betalen voor hetzelfde werk.
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
                  Hoe lang duurt het voordat ik mijn eerste klant heb?
                </h3>
                <p className="text-[#64607d]">
                  Met een sterk portfolio: 1-2 weken op Upwork, 2-4 weken op Dribbble, direct op 99designs (via contests). Zonder portfolio: maak eerst 5-8 conceptuele projecten. Investeer 20-30 uur in een killer portfolio voordat je start.
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
                  Zijn Fiverr en Upwork niet te goedkoop voor designers?
                </h3>
                <p className="text-[#64607d]">
                  Ja en nee. Fiverr regulier is inderdaad goedkoop (€5-50 per logo). Maar Fiverr Pro en Upwork met €60-80/uur zijn prima. Het gaat om hoe je jezelf positioneert. Focus op value, niet op prijs, en klanten betalen graag.
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
                href={`/${locale}/gids/niche-gidsen/beste-platforms-schrijvers`}
                className="rounded-lg bg-white hover:shadow-lg p-4 border border-gray-200 transition-shadow"
              >
                <h4 className="font-heading font-semibold text-[#1e1541] mb-2">
                  Voor Schrijvers →
                </h4>
                <p className="text-sm text-[#64607d]">
                  Content platforms met vaste opdrachten en eerlijke tarieven
                </p>
              </Link>
            </div>
          </div>

          <div className="rounded-lg bg-gradient-to-br from-[#1e1541] to-[#2a1f5e] p-8 text-white text-center">
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
              Klaar om je design carrière naar het volgende level te tillen?
            </h3>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              Vergelijk alle platforms op commissie, type klanten, gemiddelde project waardes en support. Vind het platform waar jouw design skills het meest gewaardeerd worden.
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
