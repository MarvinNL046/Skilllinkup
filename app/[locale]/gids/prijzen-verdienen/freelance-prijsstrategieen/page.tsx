import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const slug = 'freelance-prijsstrategieen';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/gids/prijzen-verdienen/${slug}`;

  if (locale === 'nl') {
    return {
      title: "7 Geavanceerde Freelance Prijsstrategieën om 2-3x Meer te Verdienen in 2026",
      description: "Ontdek prijsstrategieën die topfreelancers gebruiken: value-based pricing, pakketdeals, retainer contracten en meer. Verhoog je inkomen zonder meer uren te werken.",
      keywords: "freelance prijsstrategieën, value based pricing, freelance pakketdeals, retainer contracten, prijspsychologie",
      openGraph: {
        title: "7 Geavanceerde Freelance Prijsstrategieën om 2-3x Meer te Verdienen in 2026",
        description: "Ontdek prijsstrategieën die topfreelancers gebruiken: value-based pricing, pakketdeals, retainer contracten en meer. Verhoog je inkomen zonder meer uren te werken.",
        url: pageUrl,
        siteName: 'SkillLinkup',
        images: [
          {
            url: `${siteUrl}/images/og/gids-og.png`,
            width: 1200,
            height: 630,
            alt: 'Freelance Prijsstrategieën - SkillLinkup',
          }
        ],
        locale: 'nl_NL',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: "7 Geavanceerde Freelance Prijsstrategieën om 2-3x Meer te Verdienen in 2026",
        description: "Ontdek prijsstrategieën die topfreelancers gebruiken: value-based pricing, pakketdeals, retainer contracten en meer.",
        images: [`${siteUrl}/images/og/gids-og.png`],
      },
      alternates: {
        canonical: pageUrl,
      },
    };
  }

  return {
    title: "7 Advanced Freelance Pricing Strategies to Earn 2-3x More in 2026",
    description: "Discover pricing strategies top freelancers use: value-based pricing, package deals, retainer contracts and more. Increase income without working more hours.",
    keywords: "freelance pricing strategies, value based pricing, freelance packages, retainer contracts, pricing psychology",
    openGraph: {
      title: "7 Advanced Freelance Pricing Strategies to Earn 2-3x More in 2026",
      description: "Discover pricing strategies top freelancers use: value-based pricing, package deals, retainer contracts and more.",
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [
        {
          url: `${siteUrl}/images/og/gids-og.png`,
          width: 1200,
          height: 630,
          alt: 'Freelance Pricing Strategies - SkillLinkup',
        }
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: "7 Advanced Freelance Pricing Strategies to Earn 2-3x More in 2026",
      description: "Discover pricing strategies top freelancers use: value-based pricing, package deals, retainer contracts and more.",
      images: [`${siteUrl}/images/og/gids-og.png`],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function FreelancePrijsstrategiePage({ params }: Props) {
  const { locale } = await params;

  const content = locale === 'nl' ? {
    h1: "7 Geavanceerde Freelance Prijsstrategieën voor 2026",
    intro: "Uurtarief × uren = inkomen. Dat is hoe de meeste freelancers denken. Maar wat als ik je vertel dat topfreelancers 2-3x meer verdienen met dezelfde skills? Het geheim: slimme prijsstrategieën.",
    cta1: "Bereken Je Basis Tarief",
    cta1Url: "/nl/tools/rate-calculator",
  } : {
    h1: "7 Advanced Freelance Pricing Strategies for 2026",
    intro: "Hourly rate × hours = income. That's how most freelancers think. But what if I told you top freelancers earn 2-3x more with the same skills? The secret: smart pricing strategies.",
    cta1: "Calculate Your Base Rate",
    cta1Url: "/en/tools/rate-calculator",
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
                href={content.cta1Url}
                className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
              >
                {content.cta1} →
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">

          {locale === 'nl' ? (
            <>
              {/* Section 1: Het Probleem met Uurtarieven */}
              <section className="mb-16">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
                  Waarom Uurtarieven Je Beperken
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-[#64607d] leading-relaxed mb-6">
                    Je hebt je uurtarief berekend. €75 per uur. Perfect, toch? Niet helemaal. Uurtarieven hebben een fundamenteel probleem: <strong className="text-[#1e1541]">je wordt gestraft voor efficiëntie</strong>.
                  </p>

                  <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
                      De Uurtarief Paradox
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <span className="text-red-500 text-2xl mr-3">❌</span>
                        <div>
                          <p className="text-[#64607d]">
                            <strong className="text-[#1e1541]">Jaar 1:</strong> Je doet 20 uur over een website → €75 × 20 = <strong>€1.500</strong>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-red-500 text-2xl mr-3">❌</span>
                        <div>
                          <p className="text-[#64607d]">
                            <strong className="text-[#1e1541]">Jaar 2:</strong> Je bent efficiënter, doet 10 uur over dezelfde website → €75 × 10 = <strong>€750</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg mt-6">
                      <p className="text-[#1e1541] font-semibold">
                        Je wordt BETER in je werk, maar verdient MINDER. Dat is het probleem.
                      </p>
                    </div>
                  </div>

                  <p className="text-[#64607d] leading-relaxed mb-6">
                    De oplossing? Prijsstrategieën die je waarderen op <strong className="text-[#1e1541]">resultaat</strong>, niet op tijd.
                  </p>
                </div>
              </section>

              {/* Strategy 1: Value-Based Pricing */}
              <section className="mb-16">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
                  Strategie #1: Value-Based Pricing
                </h2>

                <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 mb-8 text-white">
                  <h3 className="font-heading font-bold text-2xl mb-4">
                    Wat Is Het?
                  </h3>
                  <p className="text-lg text-white/90">
                    Je vraagt een percentage van de waarde die je creëert, niet een vast uurtarief. Als jouw werk €100.000 oplevert, vraag je €15.000-€25.000.
                  </p>
                </div>

                <div className="prose prose-lg max-w-none">
                  <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
                    Voorbeeld: Conversion Optimalisatie
                  </h3>

                  <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                    <p className="text-[#64607d] mb-4">
                      <strong className="text-[#1e1541]">Situatie:</strong> Een webshop doet €500.000 omzet/jaar met 2% conversie.
                    </p>
                    <p className="text-[#64607d] mb-4">
                      <strong className="text-[#1e1541]">Jouw werk:</strong> Je optimaliseert de checkout en verhoogt conversie naar 2.5%.
                    </p>
                    <p className="text-[#64607d] mb-6">
                      <strong className="text-[#1e1541]">Resultaat:</strong> €125.000 extra omzet per jaar.
                    </p>

                    <div className="bg-[#f8f9fb] rounded-lg p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-[#64607d] mb-2">Uurtarief Methode</p>
                          <p className="text-[#1e1541] font-semibold">40 uur × €75 = <span className="text-red-500">€3.000</span></p>
                        </div>
                        <div>
                          <p className="text-sm text-[#64607d] mb-2">Value-Based (10%)</p>
                          <p className="text-[#1e1541] font-semibold">€125.000 × 10% = <span className="text-[#22c55e]">€12.500</span></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h4 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
                      Wanneer Werkt Dit?
                    </h4>
                    <ul className="space-y-2 text-[#64607d]">
                      <li>✅ Je werk heeft meetbare impact (meer verkoop, lagere kosten, meer leads)</li>
                      <li>✅ Klant heeft substantieel budget en ROI-focus</li>
                      <li>✅ Je kunt aantonen hoe je waarde creëert</li>
                      <li>✅ Je bent zelfverzekerd genoeg om over business te praten</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Strategy 2: Pakketdeals */}
              <section className="mb-16">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
                  Strategie #2: Pakketdeals (Good-Better-Best)
                </h2>

                <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 mb-8 text-white">
                  <h3 className="font-heading font-bold text-2xl mb-4">
                    Wat Is Het?
                  </h3>
                  <p className="text-lg text-white/90">
                    In plaats van "€75/uur" bied je 3 vaste pakketten aan: Basic (€2.500), Premium (€5.000), Enterprise (€10.000). Klanten kiezen bijna altijd Premium.
                  </p>
                </div>

                <div className="prose prose-lg max-w-none">
                  <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
                    Voorbeeld: Logo Design Pakketten
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6 border-2 border-gray-200">
                      <h4 className="font-heading font-bold text-xl text-[#1e1541] mb-2">Basic</h4>
                      <p className="text-3xl font-bold text-[#1e1541] mb-4">€1.500</p>
                      <ul className="space-y-2 text-sm text-[#64607d]">
                        <li>✓ 2 logo concepten</li>
                        <li>✓ 1 revisieronde</li>
                        <li>✓ Basisbestanden (PNG, JPG)</li>
                        <li>✓ 7 dagen levertijd</li>
                      </ul>
                    </div>

                    <div className="bg-[#1e1541] rounded-lg shadow-xl p-6 border-4 border-[#ef2b70] relative">
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ef2b70] text-white px-4 py-1 rounded-full text-sm font-bold">
                        POPULAIR
                      </div>
                      <h4 className="font-heading font-bold text-xl text-white mb-2">Premium</h4>
                      <p className="text-3xl font-bold text-white mb-4">€3.500</p>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>✓ 4 logo concepten</li>
                        <li>✓ 3 revisierondes</li>
                        <li>✓ Alle bestanden + bronbestanden</li>
                        <li>✓ Brandgids (kleuren, fonts)</li>
                        <li>✓ Social media templates</li>
                        <li>✓ 5 dagen levertijd</li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 border-2 border-gray-200">
                      <h4 className="font-heading font-bold text-xl text-[#1e1541] mb-2">Enterprise</h4>
                      <p className="text-3xl font-bold text-[#1e1541] mb-4">€7.500</p>
                      <ul className="space-y-2 text-sm text-[#64607d]">
                        <li>✓ Onbeperkte concepten</li>
                        <li>✓ Onbeperkte revisies</li>
                        <li>✓ Complete brand identiteit</li>
                        <li>✓ Brandgids + styleguide</li>
                        <li>✓ Marketing materiaal</li>
                        <li>✓ 3 maanden support</li>
                        <li>✓ 3 dagen levertijd</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg mb-6">
                    <p className="text-[#1e1541] font-semibold mb-2">
                      💡 Prijspsychologie Geheim
                    </p>
                    <p className="text-[#64607d]">
                      60-70% van klanten kiest het middelste pakket. De duurste optie maakt Premium "redelijk" lijken. De goedkoopste optie maakt Premium "compleet" lijken.
                    </p>
                  </div>
                </div>
              </section>

              {/* CTA Section 1 */}
              <section className="mb-16">
                <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
                  <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                    Bekijk Upwork vs Fiverr Kosten
                  </h3>
                  <p className="text-xl mb-6 text-gray-300">
                    Ontdek op welk platform je het meeste overhoudt na commissie
                  </p>
                  <Link
                    href="/nl/gids/prijzen-verdienen/upwork-kosten"
                    className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
                  >
                    Vergelijk Platform Kosten →
                  </Link>
                </div>
              </section>

              {/* Strategy 3: Retainer Contracten */}
              <section className="mb-16">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
                  Strategie #3: Retainer Contracten
                </h2>

                <div className="bg-gradient-to-br from-[#1e1541] to-[#2a1f5e] rounded-lg shadow-xl p-8 mb-8 text-white">
                  <h3 className="font-heading font-bold text-2xl mb-4">
                    Wat Is Het?
                  </h3>
                  <p className="text-lg text-white/90">
                    Klanten betalen een vast maandelijks bedrag voor een bepaald aantal uren of diensten. Voorspelbaar inkomen + langetermijn relatie.
                  </p>
                </div>

                <div className="prose prose-lg max-w-none">
                  <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
                    Waarom Retainers Goud Waard Zijn
                  </h3>

                  <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
                          Voor Jou:
                        </h4>
                        <ul className="space-y-2 text-[#64607d]">
                          <li>✅ Voorspelbaar maandelijks inkomen</li>
                          <li>✅ Minder tijd kwijt aan acquisitie</li>
                          <li>✅ Langetermijn klantrelaties</li>
                          <li>✅ Gemakkelijker planning</li>
                          <li>✅ Premium pricing mogelijk</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
                          Voor Klant:
                        </h4>
                        <ul className="space-y-2 text-[#64607d]">
                          <li>✅ Gegarandeerde beschikbaarheid</li>
                          <li>✅ Prioriteit behandeling</li>
                          <li>✅ Vaste maandelijkse kosten</li>
                          <li>✅ Opgebouwde expertise over hun business</li>
                          <li>✅ Snelle reactietijd</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
                    Voorbeeld: Content Marketing Retainer
                  </h3>

                  <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <p className="text-[#64607d] mb-4">
                      <strong className="text-[#1e1541]">Pakket:</strong> €3.000/maand voor 3 maanden (minimale looptijd)
                    </p>
                    <p className="text-[#64607d] mb-4">
                      <strong className="text-[#1e1541]">Inbegrepen:</strong>
                    </p>
                    <ul className="space-y-2 text-[#64607d] mb-4">
                      <li>• 4 blogposts per maand (1.500+ woorden)</li>
                      <li>• SEO optimalisatie</li>
                      <li>• Social media promotie</li>
                      <li>• Maandelijkse performance rapportage</li>
                      <li>• Email support binnen 24 uur</li>
                    </ul>
                    <div className="bg-[#f8f9fb] rounded-lg p-4">
                      <p className="text-[#1e1541] font-semibold">
                        Jaarinkomen uit 3 retainers: €3.000 × 3 × 12 = <span className="text-[#22c55e]">€108.000</span>
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Strategy 4-7: Quick Overview */}
              <section className="mb-16">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
                  4 Extra Prijsstrategieën
                </h2>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-3">
                      Strategie #4: Rush Fee (Spoedtoeslag)
                    </h3>
                    <p className="text-[#64607d] mb-4">
                      Vraag 50-100% extra voor projecten met korte deadline. "Normale levering: €5.000 in 3 weken. Spoed levering: €7.500 in 1 week."
                    </p>
                    <div className="bg-[#f8f9fb] rounded-lg p-4">
                      <p className="text-sm text-[#64607d]">
                        <strong className="text-[#1e1541]">Best voor:</strong> Design, development, content creation waar deadlines kritisch zijn
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-3">
                      Strategie #5: Performance Bonus
                    </h3>
                    <p className="text-[#64607d] mb-4">
                      Basisprijs + bonus bij halen targets. "€5.000 vast + €2.000 bonus als we 20% meer conversies behalen."
                    </p>
                    <div className="bg-[#f8f9fb] rounded-lg p-4">
                      <p className="text-sm text-[#64607d]">
                        <strong className="text-[#1e1541]">Best voor:</strong> Marketing, sales, growth hacking met meetbare KPI's
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-3">
                      Strategie #6: Licensing / Royalties
                    </h3>
                    <p className="text-[#64607d] mb-4">
                      Verkoop je werk meerdere keren. Bijvoorbeeld: verkoop een online cursus voor €2.000 aan 50 klanten = €100.000.
                    </p>
                    <div className="bg-[#f8f9fb] rounded-lg p-4">
                      <p className="text-sm text-[#64607d]">
                        <strong className="text-[#1e1541]">Best voor:</strong> Trainers, designers met templates, developers met plugins/themes
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-3">
                      Strategie #7: Hybrid Pricing
                    </h3>
                    <p className="text-[#64607d] mb-4">
                      Combineer meerdere strategieën. "€2.000/maand retainer + €500 per extra project + 10% performance bonus."
                    </p>
                    <div className="bg-[#f8f9fb] rounded-lg p-4">
                      <p className="text-sm text-[#64607d]">
                        <strong className="text-[#1e1541]">Best voor:</strong> Ervaren freelancers met langetermijn klanten en diverse diensten
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA Section 2 */}
              <section className="mb-16">
                <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
                  <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                    Leer Hogere Tarieven Onderhandelen
                  </h3>
                  <p className="text-xl mb-6 text-white/90">
                    Ontdek hoe je deze strategieën communiceert zonder klanten af te schrikken
                  </p>
                  <Link
                    href="/nl/gids/prijzen-verdienen/hogere-tarieven-onderhandelen"
                    className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
                  >
                    Lees Onderhandelgids →
                  </Link>
                </div>
              </section>

              {/* Implementation Guide */}
              <section className="mb-16">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
                  Hoe Begin Je? Jouw Actieplan
                </h2>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
                    <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                        Start Met Pakketdeals
                      </h3>
                      <p className="text-[#64607d] mb-3">
                        Makkelijkste strategie om vandaag nog te implementeren. Maak 3 pakketten van je meest gevraagde dienst en test het bij je volgende prospect.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
                    <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                        Test Value-Based Bij Geschikte Projecten
                      </h3>
                      <p className="text-[#64607d] mb-3">
                        Als een klant vraagt "hoeveel kost een nieuwe website?", vraag eerst: "Wat is een goede website waard voor jullie business?" Dan weet je of value-based mogelijk is.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
                    <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                        Bouw Naar Retainers
                      </h3>
                      <p className="text-[#64607d] mb-3">
                        Vraag aan je beste klanten: "Zou je interesse hebben in een vast maandelijks pakket?" Retainers zijn het ultieme doel voor stabiel inkomen.
                      </p>
                      <Link
                        href="/nl/gids/prijzen-verdienen/freelance-uurtarief-berekenen"
                        className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
                      >
                        Eerst Je Basis Uurtarief Berekenen →
                      </Link>
                    </div>
                  </div>
                </div>
              </section>

              {/* Final CTA */}
              <section className="mb-16">
                <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
                  <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                    Download Gratis Pricing Template
                  </h3>
                  <p className="text-xl mb-6 text-white/90">
                    Krijg onze Good-Better-Best pricing template en implementeer vandaag nog
                  </p>
                  <Link
                    href="/nl/newsletter"
                    className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
                  >
                    Download Template →
                  </Link>
                </div>
              </section>

            </>
          ) : (
            <>
              {/* English content would go here - simplified */}
              <section className="mb-16">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
                  Why Hourly Rates Limit You
                </h2>
                <p className="text-[#64607d] leading-relaxed mb-6">
                  You've calculated your hourly rate. $85 per hour. Perfect, right? Not quite. Hourly rates have a fundamental problem: you're punished for efficiency.
                </p>
              </section>
            </>
          )}

        </article>

        {/* Schema.org Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": locale === 'nl'
                ? "7 Geavanceerde Freelance Prijsstrategieën om 2-3x Meer te Verdienen in 2026"
                : "7 Advanced Freelance Pricing Strategies to Earn 2-3x More in 2026",
              "description": locale === 'nl'
                ? "Ontdek prijsstrategieën die topfreelancers gebruiken: value-based pricing, pakketdeals, retainer contracten en meer."
                : "Discover pricing strategies top freelancers use: value-based pricing, package deals, retainer contracts and more.",
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
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/prijzen-verdienen/freelance-prijsstrategieen`
              }
            })
          }}
        />
      </main>

      <Footer />
    </>
  );
}
