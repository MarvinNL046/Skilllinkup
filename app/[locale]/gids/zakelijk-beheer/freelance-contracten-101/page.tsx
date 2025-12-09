import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { FileSignature, CheckCircle2, ArrowRight, Shield, AlertTriangle, Scale, FileText, Lock, Clock, TrendingUp } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const slug = 'freelance-contracten-101';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/gids/zakelijk-beheer/${slug}`;

  return {
    title: 'Freelance Contracten 101: Bescherm Jezelf Juridisch 2026',
    description: 'Leer welke contractbepalingen essentieel zijn voor freelancers. Van betalingsvoorwaarden tot intellectueel eigendom - bescherm jezelf juridisch met de juiste contracten.',
    keywords: 'freelance contract, opdrachtovereenkomst, algemene voorwaarden, intellectueel eigendom, freelance juridisch, contractvoorwaarden',
    openGraph: {
      title: 'Freelance Contracten 101: Bescherm Jezelf Juridisch',
      description: 'Essentiële contractbepalingen en juridische bescherming voor freelancers.',
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [{ url: `${siteUrl}/images/og/zakelijk-beheer-og.png`, width: 1200, height: 630, alt: 'Freelance Contracten Gids' }],
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Freelance Contracten 101: Bescherm Jezelf',
      description: 'Essentiële contractbepalingen voor freelancers.',
      images: [`${siteUrl}/images/og/zakelijk-beheer-og.png`],
    },
    alternates: {
      canonical: pageUrl,
      languages: { 'nl': `${siteUrl}/nl/gids/zakelijk-beheer/${slug}` },
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

export default async function FreelanceContracten101Page({ params }: PageProps) {
  const { locale } = await params;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Freelance Contracten 101: Bescherm Jezelf Juridisch',
    description: 'Complete gids over essentiële contractbepalingen en juridische bescherming voor freelancers.',
    author: {
      '@type': 'Organization',
      name: 'SkillLinkup',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SkillLinkup',
      logo: {
        '@type': 'ImageObject',
        url: 'https://skilllinkup.com/logo.png',
      },
    },
    datePublished: '2026-01-09',
    dateModified: '2026-01-09',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary via-primary to-accent py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <FileSignature className="w-4 h-4 text-accent" />
                <span className="text-white text-sm font-semibold">Zakelijk Beheer #3</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
                Freelance Contracten 101: Bescherm Jezelf Juridisch
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Ontdek welke contractbepalingen essentieel zijn om jezelf te beschermen als freelancer. Van betalingsvoorwaarden tot intellectueel eigendom - leer hoe je sterke contracten opstelt die jouw belangen waarborgen.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={`/${locale}/tools/invoice-generator`}
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
                >
                  Maak Factuur
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href={`/${locale}/tools`}
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
                >
                  Bekijk Alle Tools
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
          {/* Introduction */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Een goed contract is je <strong>juridische veiligheidsnet als freelancer</strong>. Het voorkomt misverstanden, beschermt je tegen wanbetaling, en regelt wat er gebeurt als er iets misgaat. Toch werken veel freelancers zonder contract of met onvolledige overeenkomsten - een riskante keuze die duizenden euro's kan kosten.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Deze gids legt uit welke contractbepalingen je nodig hebt, waarom ze belangrijk zijn, en hoe je ze toepast in de praktijk.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border border-gray-200 dark:border-slate-700">
              <div className="text-4xl font-bold text-primary mb-2">67%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Freelancers zonder contract</div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border border-gray-200 dark:border-slate-700">
              <div className="text-4xl font-bold text-accent mb-2">€5.000</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Gem. schade zonder contract</div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border border-gray-200 dark:border-slate-700">
              <div className="text-4xl font-bold text-secondary mb-2">87%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Conflicten voorkomen met contract</div>
            </div>
          </div>

          {/* Section 1: Waarom Contracten Essentieel Zijn */}
          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  1. Waarom Elk Freelance Project een Contract Nodig Heeft
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Veel freelancers denken: "Het is maar een klein project, een contract is overdreven." <strong>Dit is een gevaarlijke misvatting</strong>. Juist bij kleine projecten gaat het vaak mis.
            </p>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Wat Een Contract Je Bescherming Geeft
            </h3>
            <div className="space-y-4 mb-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Bescherming Tegen Wanbetaling</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Met een contract heb je <strong>juridisch bewijs</strong> van afspraken. Zonder contract is het jouw woord tegen dat van de klant - en proceskosten zijn vaak hoger dan de vordering.
                    </p>
                    <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4 text-sm">
                      <p className="text-gray-600 dark:text-gray-400">
                        <strong>Voorbeeld:</strong> Klant beweert dat werk "niet volgens afspraak" is. Zonder contract geen bewijs van wat is afgesproken. Met contract: zwart op wit wat er geleverd moet worden.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Voorkomt Scope Creep</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      "Kun je dit ook nog even aanpassen?" en "Nog één extra feature" - zonder contract heb je geen basis om nee te zeggen of meerwerk te factureren.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Beschermt Intellectueel Eigendom</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Zonder duidelijke afspraken over eigendomsrechten kan een klant jouw werk claimen, doorverkopen, of je verbieden het in je portfolio te tonen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Regelt Aansprakelijkheid</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Wat als je code een bug heeft die een klant €10.000 schade oplevert? Een contract bepaalt de maximale aansprakelijkheid (vaak: gefactureerde bedrag).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Professionaliteit</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Klanten verwachten een contract. Geen contract = amateur. Met contract straal je professionaliteit uit en word je serieuzer genomen.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Veelgemaakte Fout: "E-mail is ook een contract"</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Een e-mail <em>kan</em> juridisch bindend zijn, maar bevat vaak <strong>niet alle essentiële clausules</strong>. Een uitgebreid contract voorkomt 90% van juridische geschillen. Gebruik altijd een formeel contract bij projecten boven €500.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section 1 */}
          <div className="bg-gradient-to-br from-accent to-accent-dark rounded-lg shadow-xl p-8 md:p-12 mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                Bescherm Je Inkomsten met Professionele Facturatie
              </h3>
              <p className="text-xl text-white/90 mb-8">
                Een contract is niets waard zonder correcte facturatie. Maak professionele facturen die juridisch waterdicht zijn.
              </p>
              <Link
                href={`/${locale}/tools/invoice-generator`}
                className="inline-flex items-center gap-2 bg-white text-accent hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
              >
                Maak Factuur
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Section 2: Essentiële Contractbepalingen */}
          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  2. De 10 Essentiële Contractbepalingen voor Freelancers
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Een sterk freelance contract bevat <strong>minimaal deze 10 clausules</strong>. Ontbreekt er één? Dan loop je risico.
            </p>

            <div className="space-y-6 mb-6">
              <div className="bg-gradient-to-r from-accent/5 to-transparent dark:from-accent/10 rounded-lg p-6 border-l-4 border-accent">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">Partijen & Contactgegevens</h4>
                </div>
                <div className="ml-13">
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Volledige naam, adres, KVK-nummer, en btw-nummer van beide partijen. Bij twijfel over juridische structuur: vraag bedrijfsgegevens.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/5 to-transparent dark:from-primary/10 rounded-lg p-6 border-l-4 border-primary">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">Omschrijving Opdracht (Scope)</h4>
                </div>
                <div className="ml-13">
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    <strong>Zo specifiek mogelijk</strong> wat je oplevert. Niet "een website", maar:
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li>• Homepage + 5 subpagina's (Diensten, Over, Contact, Blog, Portfolio)</li>
                    <li>• Responsive design (desktop, tablet, mobiel)</li>
                    <li>• WordPress CMS met admin training (2 uur)</li>
                    <li>• SEO-optimalisatie (meta tags, snelheid)</li>
                    <li>• Contactformulier met GDPR-compliance</li>
                    <li>• 2 revisierondes inbegrepen</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-secondary/5 to-transparent dark:from-secondary/10 rounded-lg p-6 border-l-4 border-secondary">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">Tarief & Betaling</h4>
                </div>
                <div className="ml-13">
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Vermeld duidelijk:
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li>• Uurtarief (€75/uur) of vaste prijs (€3.500 all-in)</li>
                    <li>• Exclusief of inclusief btw</li>
                    <li>• Betalingstermijn (14 dagen na factuurdatum)</li>
                    <li>• Vooruitbetaling (bijv. 30% vooraf, 70% bij oplevering)</li>
                    <li>• Extra kosten (reiskosten, externe tools, stockfoto's)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-accent/5 to-transparent dark:from-accent/10 rounded-lg p-6 border-l-4 border-accent">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">Planning & Deadlines</h4>
                </div>
                <div className="ml-13">
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Geef realistische deadlines en bouw buffer in:
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li>• Startdatum: 15 januari 2026</li>
                    <li>• Design oplevering: 5 februari 2026</li>
                    <li>• Ontwikkeling klaar: 25 februari 2026</li>
                    <li>• Eindoplevering: 10 maart 2026</li>
                    <li>• Clausule: "Deadlines zijn onder voorbehoud van tijdige aanlevering materiaal door klant"</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/5 to-transparent dark:from-primary/10 rounded-lg p-6 border-l-4 border-primary">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">5</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">Intellectueel Eigendom (IE)</h4>
                </div>
                <div className="ml-13">
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    <strong>Cruciale clausule!</strong> Bepaalt wie eigenaar is van jouw werk:
                  </p>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <strong>Optie A - Overdracht bij volledige betaling:</strong>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 italic">
                      "Alle rechten op het werk worden overgedragen aan opdrachtgever na volledige betaling van het gefactureerde bedrag. Tot die tijd blijft opdrachtnemer eigenaar."
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <strong>Optie B - Licentie (geen overdracht):</strong>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 italic">
                      "Opdrachtgever krijgt een niet-exclusieve licentie om het werk te gebruiken. Opdrachtnemer behoudt eigendomsrechten en mag het werk in portfolio gebruiken."
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-secondary/5 to-transparent dark:from-secondary/10 rounded-lg p-6 border-l-4 border-secondary">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">6</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">Revisies & Meerwerk</h4>
                </div>
                <div className="ml-13">
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Voorkom eindeloze aanpassingen:
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li>• "2 revisierondes inbegrepen op basis van originele scope"</li>
                    <li>• "Meerwerk wordt gefactureerd tegen €75/uur na goedkeuring"</li>
                    <li>• "Wijzigingen na goedkeuring eindresultaat: €150/uur"</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-accent/5 to-transparent dark:from-accent/10 rounded-lg p-6 border-l-4 border-accent">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">7</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">Annulering & Beëindiging</h4>
                </div>
                <div className="ml-13">
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Wat gebeurt er als project voortijdig stopt?
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li>• "Annulering door klant: betaling voor reeds verrichte uren + 50% resterende project"</li>
                    <li>• "Annulering door freelancer: terugbetaling vooruitbetaling minus gewerkte uren"</li>
                    <li>• "Opzegtermijn: 14 dagen schriftelijk"</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/5 to-transparent dark:from-primary/10 rounded-lg p-6 border-l-4 border-primary">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">8</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">Aansprakelijkheid & Garanties</h4>
                </div>
                <div className="ml-13">
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Beperk je aansprakelijkheid:
                  </p>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-sm">
                    <p className="text-gray-600 dark:text-gray-400 italic">
                      "Aansprakelijkheid van opdrachtnemer is beperkt tot het gefactureerde bedrag voor deze opdracht. Opdrachtnemer is niet aansprakelijk voor indirecte schade zoals omzetderving."
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-secondary/5 to-transparent dark:from-secondary/10 rounded-lg p-6 border-l-4 border-secondary">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">9</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">Geheimhouding (NDA)</h4>
                </div>
                <div className="ml-13">
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Vooral belangrijk bij toegang tot vertrouwelijke informatie:
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li>• "Beide partijen behandelen bedrijfsgevoelige informatie vertrouwelijk"</li>
                    <li>• "Geheimhouding geldt voor onbepaalde tijd, ook na beëindiging contract"</li>
                    <li>• "Uitzonderingen: publieke informatie, wettelijke verplichting"</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-accent/5 to-transparent dark:from-accent/10 rounded-lg p-6 border-l-4 border-accent">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">10</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">Toepasselijk Recht & Geschillen</h4>
                </div>
                <div className="ml-13">
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Welk rechtssysteem geldt bij conflict?
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li>• "Op deze overeenkomst is Nederlands recht van toepassing"</li>
                    <li>• "Geschillen worden voorgelegd aan bevoegde rechter te [jouw vestigingsplaats]"</li>
                    <li>• Optioneel: "Partijen streven naar minnelijke schikking via mediator"</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-accent/5 border-l-4 border-accent rounded-r-lg p-6">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Tip: Algemene Voorwaarden</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Laat een <strong>standaard set algemene voorwaarden</strong> opstellen door een jurist (eenmalige investering €300-600). Deze verwijs je in elk contract ("Van toepassing zijn de algemene voorwaarden van [naam], versie 2026"). Scheelt veel tijd en zorgt voor consistente bescherming.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section 2 */}
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-lg shadow-xl p-8 md:p-12 mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                Beheer Meerdere Klanten met Overzicht
              </h3>
              <p className="text-xl text-white/90 mb-8">
                Leer hoe je effectief meerdere klanten en projecten tegelijk beheert zonder chaos.
              </p>
              <Link
                href={`/${locale}/gids/zakelijk-beheer/meerdere-klanten-beheren`}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
              >
                Lees Meer
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Section 3: Contracttemplates */}
          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  3. Contracttemplates: Gebruik of Vermijd?
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Er zijn <strong>honderden gratis contracttemplates</strong> online. Zijn die veilig om te gebruiken?
            </p>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Voordelen & Risico's van Templates
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-accent">
                <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  Voordelen
                </h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Snel en gratis (of goedkoop)</li>
                  <li>• Goede basis voor standaardsituaties</li>
                  <li>• Laat essentiële clausules zien</li>
                  <li>• Beter dan helemaal geen contract</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-primary">
                <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Risico's
                </h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Vaak niet aangepast aan jouw situatie</li>
                  <li>• Juridische fouten of verouderde teksten</li>
                  <li>• Kan niet afdwingbaar zijn in rechtzaak</li>
                  <li>• Mist specifieke bescherming die jij nodig hebt</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Wanneer Template Volstaat vs. Jurist Inschakelen
            </h3>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-slate-800">
                    <th className="text-left p-4 border border-gray-200 dark:border-slate-700 font-bold text-gray-900 dark:text-white">Situatie</th>
                    <th className="text-left p-4 border border-gray-200 dark:border-slate-700 font-bold text-gray-900 dark:text-white">Template OK?</th>
                    <th className="text-left p-4 border border-gray-200 dark:border-slate-700 font-bold text-gray-900 dark:text-white">Advies</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">Klein project (&lt;€1.000)</td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-accent font-bold">✓ Ja</td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 text-sm">Gebruik template, pas aan</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-slate-800">
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">Project €1.000-€5.000</td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-accent font-bold">✓ Ja</td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 text-sm">Template + juridische review (€150)</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">Project &gt;€5.000</td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-primary font-bold">⚠ Risico</td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 text-sm">Laat opstellen door jurist (€400-800)</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-slate-800">
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">Internationale klant</td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-secondary font-bold">✗ Nee</td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 text-sm">Specialist internationaal recht</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">Complexe IE-afspraken</td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-secondary font-bold">✗ Nee</td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 text-sm">IP-advocaat inschakelen</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-slate-800">
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">Langlopend retainer</td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-primary font-bold">⚠ Risico</td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 text-sm">Juridische review verplicht</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Gouden Regel:</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Investeer <strong>1-2% van projectwaarde in juridische bescherming</strong>. Bij €10.000 project = €100-200 voor contractreview. Dit voorkomt potentiële schade van duizenden euro's. "Goedkoop" kan zeer duur uitpakken.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-secondary via-primary to-accent rounded-lg shadow-xl p-8 md:p-12 mb-8">
            <div className="max-w-3xl mx-auto text-center">
              <FileSignature className="w-16 h-16 text-white mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">
                Krijg Wekelijkse Tips over Zakelijk Beheer
              </h3>
              <p className="text-xl text-white/90 mb-8">
                Van contracten tot verzekeringen - alle kennis om jezelf juridisch en financieel te beschermen als freelancer.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={`/${locale}/tools`}
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
                >
                  Bekijk Alle Tools
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href={`/${locale}/newsletter`}
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
                >
                  Zakelijke Tips
                </Link>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <section className="border-t border-gray-200 dark:border-slate-700 pt-12">
            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              Lees Verder over Zakelijk Beheer
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href={`/${locale}/gids/zakelijk-beheer/freelance-factureren-gids`} className="group bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 hover:border-accent hover:shadow-lg transition-all">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  Professionele Facturatiepraktijken
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Leer hoe je correct en efficiënt factureert als freelancer
                </p>
              </Link>
              <Link href={`/${locale}/gids/zakelijk-beheer/freelance-zakelijke-verzekering`} className="group bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 hover:border-accent hover:shadow-lg transition-all">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  Heb Je Verzekering Nodig?
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Welke verzekeringen zijn essentieel voor freelancers?
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
