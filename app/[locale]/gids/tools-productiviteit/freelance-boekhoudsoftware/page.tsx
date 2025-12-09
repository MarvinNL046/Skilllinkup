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

  const slug = 'freelance-boekhoudsoftware';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/gids/tools-productiviteit/${slug}`;

  if (locale === 'nl') {
    return {
      title: "Beste Boekhoudsoftware voor Freelancers 2026: Top 7 Vergelijking + Gratis Opties",
      description: "Vergelijk de 7 beste boekhoudsoftware tools voor freelancers in Nederland en België. Facturen, BTW, KvK-koppeling en meer. Van €0 tot €15/maand.",
      keywords: "freelance boekhoudsoftware, facturatie software, BTW software, boekhouden freelancer, moneybird, exact online",
      openGraph: {
        title: "Beste Boekhoudsoftware voor Freelancers 2026: Top 7 Vergelijking",
        description: "Vergelijk de 7 beste boekhoudsoftware tools voor freelancers in Nederland en België. Facturen, BTW, KvK-koppeling en meer.",
        url: pageUrl,
        siteName: 'SkillLinkup',
        images: [
          {
            url: `${siteUrl}/images/og/gids-og.png`,
            width: 1200,
            height: 630,
            alt: 'Freelance Boekhoudsoftware - SkillLinkup',
          }
        ],
        locale: 'nl_NL',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: "Beste Boekhoudsoftware voor Freelancers 2026",
        description: "Vergelijk de 7 beste boekhoudsoftware tools voor freelancers in Nederland en België.",
        images: [`${siteUrl}/images/og/gids-og.png`],
      },
      alternates: {
        canonical: pageUrl,
      },
    };
  }

  return {
    title: "Best Accounting Software for Freelancers 2026: Top 7 Comparison + Free Options",
    description: "Compare the 7 best accounting software tools for freelancers in the Netherlands and Belgium. Invoicing, VAT, company registration and more. From €0 to €15/month.",
    keywords: "freelance accounting software, invoicing software, VAT software, freelancer bookkeeping",
    openGraph: {
      title: "Best Accounting Software for Freelancers 2026: Top 7 Comparison",
      description: "Compare the 7 best accounting software tools for freelancers. Invoicing, VAT, company registration and more.",
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [
        {
          url: `${siteUrl}/images/og/gids-og.png`,
          width: 1200,
          height: 630,
          alt: 'Freelance Accounting Software - SkillLinkup',
        }
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Best Accounting Software for Freelancers 2026",
      description: "Compare the 7 best accounting software tools for freelancers.",
      images: [`${siteUrl}/images/og/gids-og.png`],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function FreelanceBoekhoudsoftwarePage({ params }: Props) {
  const { locale } = await params;

  const content = locale === 'nl' ? {
    h1: "Beste Boekhoudsoftware voor Freelancers in 2026",
    intro: "Als freelancer wil je zo min mogelijk tijd kwijt zijn aan administratie. Maar je BTW-aangifte, facturen en jaarafsluiting moeten wel kloppen. De juiste boekhoudsoftware bespaart je uren per maand én voorkomt dure fouten. Laten we de beste opties vergelijken.",
    cta1: "Vergelijk Factuur Tools",
    cta1Url: "/nl/gids/tools-productiviteit/freelance-factuur-generator",
  } : {
    h1: "Best Accounting Software for Freelancers in 2026",
    intro: "As a freelancer, you want to spend as little time as possible on administration. But your VAT returns, invoices and annual closing must be correct. The right accounting software saves you hours per month and prevents costly mistakes. Let's compare the best options.",
    cta1: "Compare Invoice Tools",
    cta1Url: "/en/gids/tools-productiviteit/freelance-factuur-generator",
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
              {/* Section 1: Waarom Goede Boekhoudsoftware Essentieel Is */}
              <section className="mb-16">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
                  Waarom Goede Boekhoudsoftware Essentieel Is
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-[#64607d] leading-relaxed mb-6">
                    Als freelancer ben je verplicht om je administratie bij te houden. Niet alleen voor de Belastingdienst, maar ook om grip te houden op je cashflow. Fouten in je BTW-aangifte kunnen leiden tot boetes van honderden euro's.
                  </p>

                  <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
                      5 Voordelen van Professionele Boekhoudsoftware
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <span className="text-[#ef2b70] font-bold mr-3 text-xl">1.</span>
                        <span className="text-[#64607d]">
                          <strong className="text-[#1e1541]">Tijdsbesparing:</strong> Automatische BTW-berekening en koppeling met je bankrekening
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#ef2b70] font-bold mr-3 text-xl">2.</span>
                        <span className="text-[#64607d]">
                          <strong className="text-[#1e1541]">Foutpreventie:</strong> Geen handmatige berekeningen meer, alles klopt automatisch
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#ef2b70] font-bold mr-3 text-xl">3.</span>
                        <span className="text-[#64607d]">
                          <strong className="text-[#1e1541]">Professionele Facturen:</strong> Branded facturen met je logo en huisstijl
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#ef2b70] font-bold mr-3 text-xl">4.</span>
                        <span className="text-[#64607d]">
                          <strong className="text-[#1e1541]">Realtime Inzicht:</strong> Dashboard met omzet, uitgaven en winstmarge
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#ef2b70] font-bold mr-3 text-xl">5.</span>
                        <span className="text-[#64607d]">
                          <strong className="text-[#1e1541]">Accountant-Ready:</strong> Exporteer alles voor je boekhouder met 1 klik
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 2: Top 7 Boekhoudsoftware Vergelijking */}
              <section className="mb-16">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
                  Top 7 Boekhoudsoftware voor Freelancers
                </h2>

                <div className="space-y-8">
                  {/* Tool 1: Moneybird */}
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-2">
                          1. Moneybird
                        </h3>
                        <p className="text-[#64607d]">Meest populaire keuze voor Nederlandse freelancers</p>
                      </div>
                      <div className="text-right">
                        <div className="text-[#ef2b70] font-heading font-bold text-2xl">€15</div>
                        <div className="text-[#64607d] text-sm">/maand</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-[#1e1541] mb-3">✅ Voordelen</h4>
                        <ul className="space-y-2 text-[#64607d]">
                          <li>• Automatische bankkoppeling (ING, Rabobank, ABN)</li>
                          <li>• BTW-aangifte rechtstreeks naar Belastingdienst</li>
                          <li>• Professionele facturen met automatische herinneringen</li>
                          <li>• Nederlandse interface en support</li>
                          <li>• KvK-integratie</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1e1541] mb-3">❌ Nadelen</h4>
                        <ul className="space-y-2 text-[#64607d]">
                          <li>• Geen gratis versie (wel 30 dagen trial)</li>
                          <li>• Beperkte internationale functies</li>
                          <li>• Geen mobile app</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-[#f8f9fb] rounded-lg p-4">
                      <p className="text-[#64607d] text-sm">
                        <strong className="text-[#1e1541]">Perfect voor:</strong> Nederlandse ZZP'ers die alles in één tool willen: factureren, boekhouden en BTW-aangifte.
                      </p>
                    </div>
                  </div>

                  {/* Tool 2: Exact Online */}
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-2">
                          2. Exact Online
                        </h3>
                        <p className="text-[#64607d]">Enterprise software voor groeiende freelancers</p>
                      </div>
                      <div className="text-right">
                        <div className="text-[#ef2b70] font-heading font-bold text-2xl">€0-€30</div>
                        <div className="text-[#64607d] text-sm">/maand</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-[#1e1541] mb-3">✅ Voordelen</h4>
                        <ul className="space-y-2 text-[#64607d]">
                          <li>• GRATIS Starter versie voor kleine freelancers</li>
                          <li>• Schaalbaar naar grotere bedrijven</li>
                          <li>• Uitgebreide rapportages en analytics</li>
                          <li>• Multi-currency ondersteuning</li>
                          <li>• Grote community en veel integraties</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1e1541] mb-3">❌ Nadelen</h4>
                        <ul className="space-y-2 text-[#64607d]">
                          <li>• Complexe interface (overkill voor starters)</li>
                          <li>• Gratis versie beperkt tot 15 facturen/maand</li>
                          <li>• Steile leercurve</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-[#f8f9fb] rounded-lg p-4">
                      <p className="text-[#64607d] text-sm">
                        <strong className="text-[#1e1541]">Perfect voor:</strong> Freelancers die groeien naar een klein bedrijf en meer geavanceerde functies nodig hebben.
                      </p>
                    </div>
                  </div>

                  {/* Tool 3: InformerOnline */}
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-2">
                          3. InformerOnline
                        </h3>
                        <p className="text-[#64607d]">Budget-vriendelijke optie met alle basics</p>
                      </div>
                      <div className="text-right">
                        <div className="text-[#ef2b70] font-heading font-bold text-2xl">€5,95</div>
                        <div className="text-[#64607d] text-sm">/maand</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-[#1e1541] mb-3">✅ Voordelen</h4>
                        <ul className="space-y-2 text-[#64607d]">
                          <li>• Laagste prijs op de markt</li>
                          <li>• Eenvoudige interface</li>
                          <li>• BTW-aangifte functionaliteit</li>
                          <li>• Nederlandse klantenservice</li>
                          <li>• Geen langlopend contract</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1e1541] mb-3">❌ Nadelen</h4>
                        <ul className="space-y-2 text-[#64607d]">
                          <li>• Geen automatische bankkoppeling</li>
                          <li>• Basis functionaliteit (geen bells & whistles)</li>
                          <li>• Beperkte rapportages</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-[#f8f9fb] rounded-lg p-4">
                      <p className="text-[#64607d] text-sm">
                        <strong className="text-[#1e1541]">Perfect voor:</strong> Startende freelancers met een beperkt budget die de basis willen.
                      </p>
                    </div>
                  </div>

                  {/* Tool 4: Tellow */}
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-2">
                          4. Tellow
                        </h3>
                        <p className="text-[#64607d]">All-in-one platform voor ZZP'ers</p>
                      </div>
                      <div className="text-right">
                        <div className="text-[#ef2b70] font-heading font-bold text-2xl">€12</div>
                        <div className="text-[#64607d] text-sm">/maand</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-[#1e1541] mb-3">✅ Voordelen</h4>
                        <ul className="space-y-2 text-[#64607d]">
                          <li>• Inclusief bedrijfsverzekeringen</li>
                          <li>• Gratis zakelijke rekening</li>
                          <li>• Moderne, gebruiksvriendelijke interface</li>
                          <li>• Mobile app (iOS & Android)</li>
                          <li>• Community van ZZP'ers</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1e1541] mb-3">❌ Nadelen</h4>
                        <ul className="space-y-2 text-[#64607d]">
                          <li>• Minder uitgebreid dan Moneybird</li>
                          <li>• Relatief nieuw (minder track record)</li>
                          <li>• Beperkte integraties</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-[#f8f9fb] rounded-lg p-4">
                      <p className="text-[#64607d] text-sm">
                        <strong className="text-[#1e1541]">Perfect voor:</strong> Freelancers die alles in één platform willen: boekhouden, bankieren én verzekeringen.
                      </p>
                    </div>
                  </div>

                  {/* Tool 5: Jortt */}
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-2">
                          5. Jortt
                        </h3>
                        <p className="text-[#64607d]">Specialist in factureren en debiteurenbeheer</p>
                      </div>
                      <div className="text-right">
                        <div className="text-[#ef2b70] font-heading font-bold text-2xl">€9</div>
                        <div className="text-[#64607d] text-sm">/maand</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-[#1e1541] mb-3">✅ Voordelen</h4>
                        <ul className="space-y-2 text-[#64607d]">
                          <li>• Slimme herinneringen voor openstaande facturen</li>
                          <li>• Makkelijke tijdregistratie</li>
                          <li>• Export naar je accountant</li>
                          <li>• Goede prijs-kwaliteit verhouding</li>
                          <li>• Nederlandse support</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1e1541] mb-3">❌ Nadelen</h4>
                        <ul className="space-y-2 text-[#64607d]">
                          <li>• Geen BTW-aangifte functie</li>
                          <li>• Beperkte boekhoudfuncties</li>
                          <li>• Meer facturatie dan boekhouden</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-[#f8f9fb] rounded-lg p-4">
                      <p className="text-[#64607d] text-sm">
                        <strong className="text-[#1e1541]">Perfect voor:</strong> Freelancers die vooral professioneel willen factureren en hun accountant de rest laten doen.
                      </p>
                    </div>
                  </div>

                  {/* Tool 6: Wave (Internationaal) */}
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-2">
                          6. Wave
                        </h3>
                        <p className="text-[#64607d]">100% gratis optie voor internationale freelancers</p>
                      </div>
                      <div className="text-right">
                        <div className="text-[#22c55e] font-heading font-bold text-2xl">GRATIS</div>
                        <div className="text-[#64607d] text-sm">voor altijd</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-[#1e1541] mb-3">✅ Voordelen</h4>
                        <ul className="space-y-2 text-[#64607d]">
                          <li>• Volledig gratis (onbeperkte facturen)</li>
                          <li>• Multi-currency ondersteuning</li>
                          <li>• Bankkoppeling (VS & Canada)</li>
                          <li>• Eenvoudig en overzichtelijk</li>
                          <li>• Mobile app</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1e1541] mb-3">❌ Nadelen</h4>
                        <ul className="space-y-2 text-[#64607d]">
                          <li>• Geen Nederlandse BTW-aangifte</li>
                          <li>• Geen Nederlandse bankkoppeling</li>
                          <li>• Support in Engels</li>
                          <li>• Niet geschikt voor NL/BE regelgeving</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-[#f8f9fb] rounded-lg p-4">
                      <p className="text-[#64607d] text-sm">
                        <strong className="text-[#1e1541]">Perfect voor:</strong> Internationale freelancers of wie werkt met buitenlandse klanten en geen BTW-verplichtingen heeft.
                      </p>
                    </div>
                  </div>

                  {/* Tool 7: SnelStart */}
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-2">
                          7. SnelStart
                        </h3>
                        <p className="text-[#64607d]">Klassieke keuze voor MKB en freelancers</p>
                      </div>
                      <div className="text-right">
                        <div className="text-[#ef2b70] font-heading font-bold text-2xl">€11</div>
                        <div className="text-[#64607d] text-sm">/maand</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-[#1e1541] mb-3">✅ Voordelen</h4>
                        <ul className="space-y-2 text-[#64607d]">
                          <li>• Bewezen track record (30+ jaar ervaring)</li>
                          <li>• Goede accountantskoppelingen</li>
                          <li>• BTW-aangifte functionaliteit</li>
                          <li>• Nederlandse interface en support</li>
                          <li>• Schaalbaar systeem</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1e1541] mb-3">❌ Nadelen</h4>
                        <ul className="space-y-2 text-[#64607d]">
                          <li>• Wat ouderwetse interface</li>
                          <li>• Minder modern dan concurrentie</li>
                          <li>• Langere leercurve</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-[#f8f9fb] rounded-lg p-4">
                      <p className="text-[#64607d] text-sm">
                        <strong className="text-[#1e1541]">Perfect voor:</strong> Freelancers die een betrouwbaar, Nederlands systeem willen met lange staat van dienst.
                      </p>
                    </div>
                  </div>

                </div>
              </section>

              {/* CTA Section 1 */}
              <section className="mb-16">
                <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
                  <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                    Genereer Gratis Facturen
                  </h3>
                  <p className="text-xl mb-6 text-white/90">
                    Gebruik onze gratis factuur generator zonder registratie
                  </p>
                  <Link
                    href="/nl/tools/invoice-generator"
                    className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
                  >
                    Start Gratis Generator →
                  </Link>
                </div>
              </section>

              {/* Section 3: Vergelijkingstabel */}
              <section className="mb-16">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
                  Snelle Vergelijking: Welke Past Bij Jou?
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
                    <thead className="bg-[#1e1541] text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-heading">Tool</th>
                        <th className="px-6 py-4 text-left font-heading">Prijs</th>
                        <th className="px-6 py-4 text-left font-heading">BTW-aangifte</th>
                        <th className="px-6 py-4 text-left font-heading">Bankkoppeling</th>
                        <th className="px-6 py-4 text-left font-heading">Best voor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-[#f8f9fb]">
                        <td className="px-6 py-4 font-semibold text-[#1e1541]">Moneybird</td>
                        <td className="px-6 py-4 text-[#64607d]">€15/mnd</td>
                        <td className="px-6 py-4">✅</td>
                        <td className="px-6 py-4">✅</td>
                        <td className="px-6 py-4 text-[#64607d]">All-in-one</td>
                      </tr>
                      <tr className="hover:bg-[#f8f9fb]">
                        <td className="px-6 py-4 font-semibold text-[#1e1541]">Exact Online</td>
                        <td className="px-6 py-4 text-[#64607d]">€0-€30/mnd</td>
                        <td className="px-6 py-4">✅</td>
                        <td className="px-6 py-4">✅</td>
                        <td className="px-6 py-4 text-[#64607d]">Groei</td>
                      </tr>
                      <tr className="hover:bg-[#f8f9fb]">
                        <td className="px-6 py-4 font-semibold text-[#1e1541]">InformerOnline</td>
                        <td className="px-6 py-4 text-[#64607d]">€5,95/mnd</td>
                        <td className="px-6 py-4">✅</td>
                        <td className="px-6 py-4">❌</td>
                        <td className="px-6 py-4 text-[#64607d]">Budget</td>
                      </tr>
                      <tr className="hover:bg-[#f8f9fb]">
                        <td className="px-6 py-4 font-semibold text-[#1e1541]">Tellow</td>
                        <td className="px-6 py-4 text-[#64607d]">€12/mnd</td>
                        <td className="px-6 py-4">✅</td>
                        <td className="px-6 py-4">✅ (eigen bank)</td>
                        <td className="px-6 py-4 text-[#64607d]">Alles-in-1</td>
                      </tr>
                      <tr className="hover:bg-[#f8f9fb]">
                        <td className="px-6 py-4 font-semibold text-[#1e1541]">Jortt</td>
                        <td className="px-6 py-4 text-[#64607d]">€9/mnd</td>
                        <td className="px-6 py-4">❌</td>
                        <td className="px-6 py-4">❌</td>
                        <td className="px-6 py-4 text-[#64607d]">Facturatie</td>
                      </tr>
                      <tr className="hover:bg-[#f8f9fb]">
                        <td className="px-6 py-4 font-semibold text-[#1e1541]">Wave</td>
                        <td className="px-6 py-4 text-[#22c55e] font-bold">GRATIS</td>
                        <td className="px-6 py-4">❌</td>
                        <td className="px-6 py-4">❌ (NL)</td>
                        <td className="px-6 py-4 text-[#64607d]">Internationaal</td>
                      </tr>
                      <tr className="hover:bg-[#f8f9fb]">
                        <td className="px-6 py-4 font-semibold text-[#1e1541]">SnelStart</td>
                        <td className="px-6 py-4 text-[#64607d]">€11/mnd</td>
                        <td className="px-6 py-4">✅</td>
                        <td className="px-6 py-4">✅</td>
                        <td className="px-6 py-4 text-[#64607d]">Betrouwbaar</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 4: Must-Have Features */}
              <section className="mb-16">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
                  8 Must-Have Features in Boekhoudsoftware
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-3xl mb-3">📊</div>
                    <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                      1. Automatische BTW-Berekening
                    </h3>
                    <p className="text-[#64607d]">
                      De software moet automatisch het juiste BTW-tarief (21%, 9% of 0%) toepassen en je BTW-aangifte voorbereiden.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-3xl mb-3">🏦</div>
                    <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                      2. Bankkoppeling
                    </h3>
                    <p className="text-[#64607d]">
                      Automatische import van transacties bespaart uren handmatig invoeren. Check of je bank ondersteund wordt.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-3xl mb-3">📄</div>
                    <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                      3. Professionele Facturen
                    </h3>
                    <p className="text-[#64607d]">
                      Branded facturen met je logo, huisstijl en alle wettelijk verplichte informatie. Plus automatische herinneringen.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-3xl mb-3">📱</div>
                    <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                      4. Mobile App
                    </h3>
                    <p className="text-[#64607d]">
                      Onderweg bonnetjes scannen, facturen versturen en je cashflow checken scheelt tijd.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-3xl mb-3">🔗</div>
                    <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                      5. Accountant Export
                    </h3>
                    <p className="text-[#64607d]">
                      Exporteer je administratie met 1 klik naar je boekhouder. Veelgebruikte formaten: Excel, PDF, Exact.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-3xl mb-3">⏱️</div>
                    <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                      6. Tijdregistratie
                    </h3>
                    <p className="text-[#64607d]">
                      Track je uren en zet ze automatisch om naar facturen. Ideaal voor uurtarief-opdrachten.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-3xl mb-3">📈</div>
                    <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                      7. Realtime Dashboard
                    </h3>
                    <p className="text-[#64607d]">
                      Overzicht van omzet, uitgaven, winstmarge en openstaande facturen in één oogopslag.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-3xl mb-3">🇳🇱</div>
                    <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                      8. Nederlandse Wetgeving
                    </h3>
                    <p className="text-[#64607d]">
                      Compliance met Nederlandse BTW-regels, KvK-koppeling en directe aangifte bij Belastingdienst.
                    </p>
                  </div>
                </div>
              </section>

              {/* CTA Section 2 */}
              <section className="mb-16">
                <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
                  <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                    Track Je Uren Professioneel
                  </h3>
                  <p className="text-xl mb-6 text-gray-300">
                    Gebruik onze gratis time tracker en factureer elke minuut
                  </p>
                  <Link
                    href="/nl/tools/time-tracker"
                    className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
                  >
                    Start Time Tracker →
                  </Link>
                </div>
              </section>

              {/* Section 5: Veelgemaakte Fouten */}
              <section className="mb-16">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
                  5 Veelgemaakte Fouten Bij Kiezen Boekhoudsoftware
                </h2>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
                    <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                      ❌ Fout 1: Kiezen Op Prijs Alleen
                    </h3>
                    <p className="text-[#64607d]">
                      De goedkoopste optie kost je vaak meer tijd. Reken uit hoeveel uur je bespaart met automatisering - dat is vaak meer waard dan €10/maand verschil.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
                    <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                      ❌ Fout 2: Te Complex Systeem Kiezen
                    </h3>
                    <p className="text-[#64607d]">
                      Enterprise software met 100 features klinkt goed, maar als je er maar 10 gebruikt betaal je voor overkill. Start simpel.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
                    <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                      ❌ Fout 3: Niet Checken Of Je Bank Ondersteund Wordt
                    </h3>
                    <p className="text-[#64607d]">
                      Bankkoppeling is een game-changer. Check of jouw bank (ING, Rabobank, ABN, etc.) ondersteund wordt voordat je kiest.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
                    <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                      ❌ Fout 4: Gratis Trial Overslaan
                    </h3>
                    <p className="text-[#64607d]">
                      Vrijwel elke tool heeft een gratis proefperiode. Test minimaal 2 opties voordat je een jaarlicensie afsluit.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
                    <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                      ❌ Fout 5: Niet Vragen Naar Accountant Voorkeur
                    </h3>
                    <p className="text-[#64607d]">
                      Als je een accountant hebt, vraag welke software hij/zij prefereert. Export en samenwerking wordt dan veel makkelijker.
                    </p>
                  </div>
                </div>
              </section>

              {/* Final CTA */}
              <section className="mb-16">
                <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
                  <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                    Vergelijk Alle Freelance Tools
                  </h3>
                  <p className="text-xl mb-6 text-white/90">
                    Ontdek meer tools om je productiviteit als freelancer te verhogen
                  </p>
                  <Link
                    href="/nl/tools"
                    className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
                  >
                    Bekijk Alle Tools →
                  </Link>
                </div>
              </section>

            </>
          ) : (
            <>
              {/* English content - simplified */}
              <section className="mb-16">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
                  Why Good Accounting Software Is Essential
                </h2>
                <p className="text-[#64607d] leading-relaxed mb-6">
                  As a freelancer, you're required to keep your administration up to date. Not only for tax purposes, but also to maintain control over your cash flow. Mistakes in your VAT returns can lead to hundreds of euros in fines.
                </p>
              </section>

              <section className="mb-16">
                <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
                  <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                    Generate Free Invoices
                  </h3>
                  <p className="text-xl mb-6 text-white/90">
                    Use our free invoice generator without registration
                  </p>
                  <Link
                    href="/en/tools/invoice-generator"
                    className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
                  >
                    Start Free Generator →
                  </Link>
                </div>
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
              "@graph": [
                {
                  "@type": "Article",
                  "headline": locale === 'nl'
                    ? "Beste Boekhoudsoftware voor Freelancers 2026: Top 7 Vergelijking + Gratis Opties"
                    : "Best Accounting Software for Freelancers 2026: Top 7 Comparison + Free Options",
                  "description": locale === 'nl'
                    ? "Vergelijk de 7 beste boekhoudsoftware tools voor freelancers in Nederland en België. Facturen, BTW, KvK-koppeling en meer."
                    : "Compare the 7 best accounting software tools for freelancers. Invoicing, VAT, company registration and more.",
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
                    "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/tools-productiviteit/freelance-boekhoudsoftware`
                  }
                },
                {
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
                      "name": locale === 'nl' ? "Gids" : "Guide",
                      "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids`
                    },
                    {
                      "@type": "ListItem",
                      "position": 3,
                      "name": locale === 'nl' ? "Tools & Productiviteit" : "Tools & Productivity",
                      "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/tools-productiviteit`
                    },
                    {
                      "@type": "ListItem",
                      "position": 4,
                      "name": locale === 'nl' ? "Freelance Boekhoudsoftware" : "Freelance Accounting Software"
                    }
                  ]
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
