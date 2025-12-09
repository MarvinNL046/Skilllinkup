import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Receipt, CheckCircle2, ArrowRight, FileText, Calendar, Euro, AlertTriangle, TrendingUp, Clock, Shield } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const slug = 'freelance-factureren-gids';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/gids/zakelijk-beheer/${slug}`;

  return {
    title: 'Professionele Facturatie voor Freelancers: Complete Gids 2026',
    description: 'Leer hoe je professioneel factureert als freelancer. Van wettelijke vereisten tot betaalvoorwaarden - alles wat je moet weten over factureren in Nederland en België.',
    keywords: 'freelance factureren, factuur maken, btw freelancer, facturatie software, betalingstermijn, factuur vereisten Nederland',
    openGraph: {
      title: 'Professionele Facturatie voor Freelancers: Complete Gids 2026',
      description: 'Alles wat je moet weten over professioneel factureren als freelancer in Nederland en België.',
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [{ url: `${siteUrl}/images/og/zakelijk-beheer-og.png`, width: 1200, height: 630, alt: 'Freelance Facturatie Gids' }],
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Professionele Facturatie voor Freelancers: Complete Gids',
      description: 'Leer professioneel factureren als freelancer in Nederland en België.',
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

export default async function FreelanceFacturerenGidsPage({ params }: PageProps) {
  const { locale } = await params;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Professionele Facturatie voor Freelancers: Complete Gids 2026',
    description: 'Uitgebreide gids over professioneel factureren als freelancer in Nederland en België, inclusief wettelijke vereisten en best practices.',
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
                <Receipt className="w-4 h-4 text-accent" />
                <span className="text-white text-sm font-semibold">Zakelijk Beheer #1</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
                Professionele Facturatie voor Freelancers
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Ontdek hoe je professioneel factureert als freelancer. Van wettelijke vereisten tot betaalvoorwaarden - alles wat je moet weten om correct en efficiënt te factureren.
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
              Professioneel factureren is cruciaal voor je succes als freelancer. <strong>Een correcte factuur zorgt voor snellere betaling, voorkomt juridische problemen, en straalt professionaliteit uit</strong>. Toch maken veel freelancers vermijdbare fouten die leiden tot betalingsvertragingen of zelfs boetes.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Deze gids legt uit wat er op een factuur moet staan, hoe je omgaat met btw, welke betalingstermijnen gebruikelijk zijn, en welke tools je kunnen helpen om efficiënt te factureren.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border border-gray-200 dark:border-slate-700">
              <div className="text-4xl font-bold text-primary mb-2">14-30</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Dagen betalingstermijn</div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border border-gray-200 dark:border-slate-700">
              <div className="text-4xl font-bold text-accent mb-2">21%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Standaard btw-tarief NL</div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border border-gray-200 dark:border-slate-700">
              <div className="text-4xl font-bold text-secondary mb-2">7 jaar</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Factuur bewaarplicht</div>
            </div>
          </div>

          {/* Section 1: Wettelijke Vereisten */}
          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  1. Wettelijke Vereisten voor een Geldige Factuur
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Een factuur is niet alleen een verzoek om betaling, maar ook een <strong>officieel document voor de Belastingdienst</strong>. Daarom zijn er strikte regels over wat erop moet staan.
            </p>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Verplichte Gegevens op Elke Factuur
            </h3>
            <div className="space-y-4 mb-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Jouw Bedrijfsgegevens</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                      <li>• Bedrijfsnaam (handelsnaam of je eigen naam)</li>
                      <li>• KVK-nummer (verplicht in Nederland)</li>
                      <li>• Btw-nummer (als je btw-plichtig bent)</li>
                      <li>• Volledig adres (geen postbus)</li>
                      <li>• Contactgegevens (telefoon, email)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Klantgegevens</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                      <li>• Bedrijfsnaam klant (of volledige naam privépersoon)</li>
                      <li>• Volledig adres</li>
                      <li>• Btw-nummer (bij zakelijke klanten binnen EU)</li>
                      <li>• Referentienummer (zoals PO-nummer als gevraagd)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Factuurnummer & Datum</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Gebruik een uniek, doorlopend factuurnummer (bijv. 2026-001, 2026-002, etc.). Je mag geen nummers overslaan.
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                      <li>• Factuurdatum (dag van uitgifte)</li>
                      <li>• Betalingstermijn (bijv. "Betalen binnen 14 dagen")</li>
                      <li>• Vervaldatum (datum waarop betaling uiterlijk moet zijn ontvangen)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Omschrijving Diensten/Producten</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Geef een duidelijke omschrijving van wat je hebt geleverd:
                    </p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                      <li>• Specifieke dienst of product (bijv. "Webdesign homepage", "20 uur consultancy")</li>
                      <li>• Aantal uren of stuks</li>
                      <li>• Uurtarief of stuksprijs (exclusief btw)</li>
                      <li>• Subtotaal per regel</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Btw-Berekening</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                      <li>• Subtotaal (exclusief btw)</li>
                      <li>• Btw-percentage (21% of 9% in Nederland, 21% of 6% in België)</li>
                      <li>• Btw-bedrag</li>
                      <li>• Totaalbedrag (inclusief btw)</li>
                      <li>• Bij btw-vrijstelling of verlegd: vermeld reden (bijv. "Btw verlegd naar afnemer art. 69 Wet OB")</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Betaalgegevens</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                      <li>• IBAN-nummer</li>
                      <li>• BIC/SWIFT (bij internationale betalingen)</li>
                      <li>• Tenaamstelling bankrekening</li>
                      <li>• Eventueel: PayPal, Stripe, of andere betaalmethoden</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Let Op: Bewaarplicht</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    In Nederland ben je verplicht om facturen minimaal <strong>7 jaar</strong> te bewaren. In België is dit ook 7 jaar. Bewaar zowel de originele facturen als kopieën van alle verzonden facturen, digitaal of fysiek.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section 1 */}
          <div className="bg-gradient-to-br from-accent to-accent-dark rounded-lg shadow-xl p-8 md:p-12 mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                Maak Professionele Facturen in Seconden
              </h3>
              <p className="text-xl text-white/90 mb-8">
                Gebruik onze gratis factuurgenerator om correcte, professionele facturen te maken die aan alle wettelijke eisen voldoen.
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

          {/* Section 2: Btw voor Freelancers */}
          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Euro className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  2. Btw voor Freelancers: Wat Moet Je Weten?
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Btw (belasting over de toegevoegde waarde) is een <strong>belangrijk onderdeel van factureren</strong>. Of je btw moet berekenen hangt af van je situatie.
            </p>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Wanneer Ben Je Btw-Plichtig?
            </h3>

            <div className="space-y-6 mb-6">
              <div className="bg-gradient-to-r from-accent/5 to-transparent dark:from-accent/10 rounded-lg p-6 border-l-4 border-accent">
                <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-3">Nederland</h4>
                <div className="space-y-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    Je bent btw-plichtig als je <strong>omzet meer dan €20.000 per jaar bedraagt</strong>. Onder deze grens mag je gebruik maken van de kleineondernemersregeling (KOR) en hoef je geen btw te berekenen.
                  </p>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <strong>Voordelen KOR:</strong> Eenvoudiger administratie, geen btw-aangifte, lagere prijzen voor particuliere klanten
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Nadelen KOR:</strong> Je kunt geen btw terugvragen op zakelijke uitgaven
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/5 to-transparent dark:from-primary/10 rounded-lg p-6 border-l-4 border-primary">
                <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-3">België</h4>
                <div className="space-y-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    In België ben je btw-plichtig als je jaarlijkse omzet <strong>meer dan €25.000</strong> bedraagt (bijberoep). Voor hoofdberoep is er geen drempel.
                  </p>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Btw-tarieven België:</strong> 21% (algemeen), 12% (socio-culturele diensten), 6% (voedingsmiddelen, boeken)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Btw Verlegd naar de Afnemer
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Bij zakelijke diensten aan een Nederlandse onderneming met btw-nummer hoef je <strong>geen btw te berekenen</strong>. De btw wordt "verlegd" naar de klant.
            </p>
            <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-6 mb-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Vermeld op je factuur:</h4>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "Btw verlegd naar afnemer volgens artikel 69 Wet OB"
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Dit geldt alleen als je zelf btw-plichtig bent en je klant ook in Nederland gevestigd is met een geldig btw-nummer.
              </p>
            </div>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Internationale Facturen (EU)
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Bij diensten aan zakelijke klanten in andere EU-landen gelden speciale regels:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-gray-700 dark:text-gray-300"><strong>B2B binnen EU:</strong> 0% btw, vermelding "Reverse charge" of "Btw verlegd"</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-gray-700 dark:text-gray-300"><strong>B2C binnen EU:</strong> Meestal btw van jouw land (tot bepaalde omzetgrens)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Buiten EU:</strong> Meestal 0% btw, maar vraag het na bij je accountant</span>
              </li>
            </ul>
          </section>

          {/* Section 3: Betalingsvoorwaarden */}
          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  3. Betalingsvoorwaarden en Termijnen
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Duidelijke betalingsvoorwaarden zijn <strong>cruciaal voor een gezonde cashflow</strong>. Ze voorkomen misverstanden en geven je juridische bescherming bij wanbetaling.
            </p>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Gangbare Betalingstermijnen
            </h3>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-accent">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">14 Dagen</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Meest gebruikelijk</p>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Standaard voor freelancers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Snelle cashflow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Aanbevolen voor nieuwe klanten</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-primary">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">30 Dagen</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Zakelijk gebruikelijk</p>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Standaard grote bedrijven</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Meer tijd voor klant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Wettelijk maximum B2B</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-secondary">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-secondary" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Direct</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Bij levering</p>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Vooruitbetaling mogelijk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Geen betalingsrisico</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Voor nieuwe/risicovolle klanten</span>
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Wat Vermeld Je in Je Betalingsvoorwaarden?
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Betalingstermijn:</strong> "Betalen binnen 14 dagen na factuurdatum"</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Rente bij te late betaling:</strong> "Bij overschrijding betalingstermijn wettelijke handelsrente 8% + €40 incassokosten"</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Incassokosten:</strong> "Extra kosten voor aanmaningen en incasso komen voor rekening opdrachtgever"</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Eigendomsvoorbehoud:</strong> "Geleverde diensten blijven eigendom tot volledige betaling"</span>
              </li>
            </ul>

            <div className="bg-accent/5 border-l-4 border-accent rounded-r-lg p-6">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Wettelijke Bescherming:</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    In Nederland is de <strong>wettelijke betalingstermijn maximaal 30 dagen voor B2B</strong> transacties. Bij overschrijding heb je recht op wettelijke handelsrente (momenteel 8% + ECB-tarief) en minimaal €40 incassokosten zonder aanmaning.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section 2 */}
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-lg shadow-xl p-8 md:p-12 mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                Alle Freelance Tools op Eén Plek
              </h3>
              <p className="text-xl text-white/90 mb-8">
                Van facturatie tot urenregistratie - ontdek onze gratis tools die je zakelijke administratie eenvoudiger maken.
              </p>
              <Link
                href={`/${locale}/tools`}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
              >
                Bekijk Alle Tools
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Section 4: Facturatie Software */}
          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  4. Facturatiesoftware: Handmatig vs. Geautomatiseerd
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Je kunt facturen handmatig maken in Word of Excel, maar <strong>professionele facturatiesoftware bespaart tijd en voorkomt fouten</strong>.
            </p>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Opties voor Facturatie
            </h3>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-slate-800">
                    <th className="text-left p-4 border border-gray-200 dark:border-slate-700 font-bold text-gray-900 dark:text-white">Methode</th>
                    <th className="text-left p-4 border border-gray-200 dark:border-slate-700 font-bold text-gray-900 dark:text-white">Voordelen</th>
                    <th className="text-left p-4 border border-gray-200 dark:border-slate-700 font-bold text-gray-900 dark:text-white">Nadelen</th>
                    <th className="text-left p-4 border border-gray-200 dark:border-slate-700 font-bold text-gray-900 dark:text-white">Kosten</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border border-gray-200 dark:border-slate-700">
                      <strong className="text-gray-900 dark:text-white">Word/Excel</strong>
                    </td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 text-sm">
                      Volledig gratis, volledige controle
                    </td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 text-sm">
                      Tijdrovend, foutgevoelig, handmatige nummering
                    </td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">€0</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-slate-800">
                    <td className="p-4 border border-gray-200 dark:border-slate-700">
                      <strong className="text-gray-900 dark:text-white">Gratis Tools (SkillLinkup)</strong>
                    </td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 text-sm">
                      Snel, eenvoudig, professioneel design
                    </td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 text-sm">
                      Geen koppeling boekhouding
                    </td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">€0</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 dark:border-slate-700">
                      <strong className="text-gray-900 dark:text-white">Moneybird / Informer</strong>
                    </td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 text-sm">
                      Volledige boekhouding, automatisering, btw-aangifte
                    </td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 text-sm">
                      Maandelijkse kosten, leercurve
                    </td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">€8-15/mnd</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-slate-800">
                    <td className="p-4 border border-gray-200 dark:border-slate-700">
                      <strong className="text-gray-900 dark:text-white">Accountantssoftware</strong>
                    </td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 text-sm">
                      Professioneel, alle functies, support
                    </td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 text-sm">
                      Duur, complex voor starters
                    </td>
                    <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">€30-100/mnd</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Wat Moet Goede Facturatiesoftware Kunnen?
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Automatische nummering:</strong> Doorlopende factuurnummers zonder hiaten</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Btw-berekening:</strong> Automatisch de juiste btw-percentages en verlegd btw</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Klantendatabase:</strong> Bewaar klantgegevens voor hergebruik</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Sjablonen:</strong> Professionele factuurontwerpen met je logo</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Herinneringen:</strong> Automatische aanmaningen bij wanbetaling</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Rapportages:</strong> Inzicht in omzet, openstaande facturen, en betaalgedrag</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-gray-700 dark:text-gray-300"><strong>Export:</strong> PDF-generatie en integratie met boekhoudprogramma's</span>
              </li>
            </ul>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Tip voor Starters:</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Begin met een <strong>gratis factuurgenerator</strong> als je net start. Zodra je regelmatig factureert (5+ facturen per maand) of btw-plichtig wordt, is een abonnement op facturatiesoftware de investering waard voor tijdsbesparing en foutpreventie.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-secondary via-primary to-accent rounded-lg shadow-xl p-8 md:p-12 mb-8">
            <div className="max-w-3xl mx-auto text-center">
              <Receipt className="w-16 h-16 text-white mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">
                Start Direct met Professioneel Factureren
              </h3>
              <p className="text-xl text-white/90 mb-8">
                Krijg wekelijkse tips over zakelijk beheer, facturatie, en belastingen voor freelancers.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={`/${locale}/tools/invoice-generator`}
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
                >
                  Maak Factuur
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
              <Link href={`/${locale}/gids/zakelijk-beheer/freelance-belasting-gids`} className="group bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 hover:border-accent hover:shadow-lg transition-all">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  Navigeer Freelance Belastingen
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Alles over belastingaangifte,aftrekposten en btw voor freelancers in NL en BE
                </p>
              </Link>
              <Link href={`/${locale}/gids/zakelijk-beheer/freelance-contracten-101`} className="group bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 hover:border-accent hover:shadow-lg transition-all">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  Bescherm Jezelf met Contracten
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Essentiële contractbepalingen en templates voor freelancers
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
