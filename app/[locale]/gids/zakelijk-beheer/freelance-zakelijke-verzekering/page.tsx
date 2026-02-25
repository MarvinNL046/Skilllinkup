import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, CheckCircle2, ArrowRight, AlertTriangle, FileText, Heart, Briefcase, Home, DollarSign, TrendingUp } from 'lucide-react';

interface PageProps {
 params: Promise<{ locale: string }>;
}

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function generateMetadata({ params }: PageProps): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'freelance-zakelijke-verzekering';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/zakelijk-beheer/${slug}`;

 return {
 title: 'Welke Verzekeringen Heb Je Nodig als Freelancer? Complete Gids 2026',
 description: 'Ontdek welke verzekeringen essentieel zijn voor freelancers in Nederland en België. Van beroepsaansprakelijkheid tot arbeidsongeschiktheid - bescherm je inkomen en bedrijf.',
 keywords: 'freelance verzekeringen, beroepsaansprakelijkheid zzp, arbeidsongeschiktheidsverzekering, freelancer verzekering, zzp verzekeringen Nederland',
 openGraph: {
 title: 'Welke Verzekeringen Heb Je Nodig als Freelancer?',
 description: 'Complete gids over essentiële verzekeringen voor freelancers om je inkomen en bedrijf te beschermen.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/zakelijk-beheer-og.png`, width: 1200, height: 630, alt: 'Freelance Verzekeringen Gids' }],
 locale: locale === 'nl' ? 'nl_NL' : 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Welke Verzekeringen Heb Je Nodig als Freelancer?',
 description: 'Bescherm je inkomen en bedrijf met de juiste verzekeringen.',
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

export default async function FreelanceVerzekeringPage({ params }: PageProps) {
 const { locale } = await params;

 const jsonLd = {
 '@context': 'https://schema.org',
 '@graph': [
 {
 '@type': 'Article',
 headline: 'Welke Verzekeringen Heb Je Nodig als Freelancer? Complete Gids 2026',
 description: 'Uitgebreide gids over essentiële en optionele verzekeringen voor freelancers in Nederland en België.',
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
 },
 {
 '@type': 'BreadcrumbList',
 itemListElement: [
 { '@type': 'ListItem', position: 1, name: 'Home', item: `https://skilllinkup.com/${locale}` },
 { '@type': 'ListItem', position: 2, name: 'Gids', item: `https://skilllinkup.com/${locale}/gids` },
 { '@type': 'ListItem', position: 3, name: 'Zakelijk Beheer', item: `https://skilllinkup.com/${locale}/gids/zakelijk-beheer` },
 { '@type': 'ListItem', position: 4, name: 'Verzekeringen', item: `https://skilllinkup.com/${locale}/gids/zakelijk-beheer/freelance-zakelijke-verzekering` },
 ],
 },
 ],
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />
 
 <main className="min-h-screen bg-white dark:bg-gray-900">
 {/* Hero Section */}
 <section className="bg-gradient-to-br from-secondary via-primary to-accent py-16 sm:py-24">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
 <Shield className="w-4 h-4 text-accent" />
 <span className="text-white text-sm font-semibold">Zakelijk Beheer #9</span>
 </div>
 <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
 Welke Verzekeringen Heb Je Nodig als Freelancer?
 </h1>
 <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
 Als freelancer ben je zelf verantwoordelijk voor je financiële zekerheid. Ontdek welke verzekeringen essentieel zijn, welke nice-to-have, en hoeveel je moet budgetteren voor volledige bescherming.
 </p>
 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
 <Link
 href={`/${locale}/tools/rate-calculator`}
 className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
 >
 Bereken Verzekeringbudget
 <ArrowRight className="w-5 h-5" />
 </Link>
 <Link
 href={`/${locale}/gids`}
 className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
 >
 Alle Gidsen
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
 Freelancen biedt vrijheid, maar ook <strong>financiële risico's</strong>. In tegenstelling tot werknemers heb je geen werkgever die je verzekert bij ziekte, ongevallen of schade. Zonder de juiste verzekeringen kan één tegenslag je hele bedrijf in gevaar brengen.
 </p>
 <p className="text-lg text-gray-600 dark:text-gray-400">
 Deze gids behandelt alle relevante verzekeringen voor freelancers in Nederland en België: wat ze dekken, wat ze kosten, en welke absoluut noodzakelijk zijn versus nice-to-have. Leer hoe je jezelf en je bedrijf optimaal beschermt zonder te veel te betalen.
 </p>
 </div>

 {/* Stats Section */}
 <div className="grid md:grid-cols-3 gap-6 mb-16">
 <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border border-gray-200 dark:border-slate-700">
 <div className="text-4xl font-bold text-primary mb-2">40%</div>
 <div className="text-sm text-gray-600 dark:text-gray-400">Freelancers zonder AOV</div>
 </div>
 <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border border-gray-200 dark:border-slate-700">
 <div className="text-4xl font-bold text-accent mb-2">€100-300</div>
 <div className="text-sm text-gray-600 dark:text-gray-400">Maandelijkse verzekeringkosten</div>
 </div>
 <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border border-gray-200 dark:border-slate-700">
 <div className="text-4xl font-bold text-secondary mb-2">€50K+</div>
 <div className="text-sm text-gray-600 dark:text-gray-400">Gemiddelde schadeclaim BA</div>
 </div>
 </div>

 {/* Section 1: Essentiële Verzekeringen */}
 <section className="mb-16">
 <div className="flex items-start gap-4 mb-6">
 <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
 <Shield className="w-6 h-6 text-primary" />
 </div>
 <div>
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 1. Essentiële Verzekeringen (Verplicht of Zeer Aanbevolen)
 </h2>
 </div>
 </div>

 <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
 Deze verzekeringen zijn <strong>absoluut noodzakelijk</strong>voor elke freelancer. Zonder deze dekking loop je grote financiële risicos die je carrière kunnen beëindigen.
 </p>

 <div className="space-y-6 mb-6">
 {/* Beroepsaansprakelijkheid */}
 <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-lg p-6 border border-primary/20">
 <div className="flex items-start justify-between mb-4">
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Beroepsaansprakelijkheid (BA)</h3>
 <span className="inline-flex items-center gap-1 bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-semibold">
 <Shield className="w-4 h-4" />
 Must-have
 </span>
 </div>

 <p className="text-gray-700 dark:text-gray-300 mb-4">
 <strong>Wat dekt het:</strong>Schade die je veroorzaakt tijdens je werk aan klanten of derden. Denk aan fouten in code die leiden tot downtime, verkeerde marketing advies die omzetverlies veroorzaakt, of datalekken door je toedoen.
 </p>

 <div className="grid md:grid-cols-2 gap-4 mb-4">
 <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
 <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>Voorbeelden van gedekte schade:</strong></p>
 <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
 <li>• Website crash door je code → klant mist verkoop</li>
 <li>• Fout in design → product recall kosten</li>
 <li>• Datalekpersoonsgegevens door jouw systeem</li>
 <li>• Verkeerd advies → financieel verlies klant</li>
 </ul>
 </div>
 <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
 <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>Kosten & dekking:</strong></p>
 <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
 <li>• <strong>Premie:</strong>€30-€100/maand</li>
 <li>• <strong>Dekking:</strong>€500K - €2,5M</li>
 <li>• <strong>Eigen risico:</strong>€250-€1000</li>
 <li>• <strong>Verplicht:</strong>Voor sommige opdrachten/klanten</li>
 </ul>
 </div>
 </div>

 <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
 <p className="text-sm text-gray-700 dark:text-gray-300">
 <strong>Pro Tip:</strong>Veel grote bedrijven <strong>eisen een BA-verzekering</strong>voordat ze met je werken. Check altijd je contracten—sommige opdrachten vereisen minimaal €1M dekking.
 </p>
 </div>
 </div>

 {/* Arbeidsongeschiktheid */}
 <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-lg p-6 border border-accent/20">
 <div className="flex items-start justify-between mb-4">
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Arbeidsongeschiktheidsverzekering (AOV)</h3>
 <span className="inline-flex items-center gap-1 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">
 <Heart className="w-4 h-4" />
 Zeer belangrijk
 </span>
 </div>

 <p className="text-gray-700 dark:text-gray-300 mb-4">
 <strong>Wat dekt het:</strong>Inkomen als je door ziekte of ongeval niet meer kunt werken. De belangrijkste verzekering voor freelancers—<strong>40% heeft deze niet en loopt enorm risico</strong>.
 </p>

 <div className="grid md:grid-cols-2 gap-4 mb-4">
 <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
 <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>Wat gebeurt er zonder AOV:</strong></p>
 <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
 <li>• Bij langdurige ziekte: €0 inkomen</li>
 <li>• Geen WIA (alleen voor werknemers)</li>
 <li>• Bijstand mogelijk, maar zeer laag (€1150/mnd)</li>
 <li>• Spaargeld raakt op binnen maanden</li>
 </ul>
 </div>
 <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
 <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>Kosten & dekking:</strong></p>
 <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
 <li>• <strong>Premie:</strong>€80-€250/maand (afhankelijk leeftijd/beroep)</li>
 <li>• <strong>Uitkering:</strong>70-80% van je inkomen</li>
 <li>• <strong>Wachttijd:</strong>1-3 maanden (korter = duurder)</li>
 <li>• <strong>Maximaal:</strong>Vaak tot pensioenleeftijd</li>
 </ul>
 </div>
 </div>

 <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
 <div className="flex items-start gap-3">
 <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
 <p className="text-sm text-gray-700 dark:text-gray-300">
 <strong>Let op:</strong>AOV wordt duurder naarmate je ouder wordt. <strong>Sluit af vóór je 35e</strong>voor beste premies. Wacht niet tot je 40+ bent—premies kunnen 2-3x hoger zijn.
 </p>
 </div>
 </div>
 </div>

 {/* Zorgverzekering */}
 <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 dark:from-secondary/10 dark:to-secondary/20 rounded-lg p-6 border border-secondary/20">
 <div className="flex items-start justify-between mb-4">
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Zorgverzekering</h3>
 <span className="inline-flex items-center gap-1 bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-semibold">
 Verplicht
 </span>
 </div>

 <p className="text-gray-700 dark:text-gray-300 mb-4">
 <strong>Wat dekt het:</strong>Medische kosten. In Nederland is dit <strong>wettelijk verplicht</strong>, ook voor freelancers.
 </p>

 <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4">
 <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
 <strong>Freelancer-specifieke tips:</strong>
 </p>
 <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
 <li className="flex items-start gap-2">
 <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
 <span><strong>Kies hoger eigen risico (€385-€885):</strong>Lagere premie, maar betaal meer bij ziekenhuis. Goed als je gezond bent.</span>
 </li>
 <li className="flex items-start gap-2">
 <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
 <span><strong>Aanvullende verzekering:</strong>Tandarts, fysio, brillen. Bereken of het rendabel is (premie vs verwachte kosten).</span>
 </li>
 <li className="flex items-start gap-2">
 <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
 <span><strong>Zorgtoeslag:</strong>Bij laag inkomen (&lt;€35K) krijg je tot €156/maand terug van de overheid.</span>
 </li>
 </ul>
 </div>

 <div className="grid md:grid-cols-2 gap-4">
 <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
 <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>Nederland:</strong></p>
 <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
 <li>• Basispremie: €120-€150/maand</li>
 <li>• Verplicht eigen risico: €385/jaar</li>
 <li>• Aanvullend: €10-€50/maand</li>
 </ul>
 </div>
 <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
 <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>België:</strong></p>
 <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
 <li>• Mutualiteit verplicht</li>
 <li>• Bijdrage: 3,55% inkomen</li>
 <li>• Hospitalisatieverzekering: €50-€100/mnd</li>
 </ul>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* CTA Section 1 */}
 <div className="bg-gradient-to-br from-accent to-accent-dark rounded-lg shadow-xl p-8 md:p-12 mb-16">
 <div className="max-w-3xl mx-auto text-center">
 <h3 className="text-3xl font-bold text-white mb-4">
 Bereken Je Verzekeringbudget
 </h3>
 <p className="text-xl text-white/90 mb-8">
 Gebruik onze calculator om te bepalen hoeveel je maandelijks moet budgetteren voor verzekeringen op basis van je inkomen en situatie.
 </p>
 <Link
 href={`/${locale}/tools/rate-calculator`}
 className="inline-flex items-center gap-2 bg-white text-accent hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
 >
 Bereken Budget
 <ArrowRight className="w-5 h-5" />
 </Link>
 </div>
 </div>

 {/* Section 2: Optionele Verzekeringen */}
 <section className="mb-16">
 <div className="flex items-start gap-4 mb-6">
 <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
 <Briefcase className="w-6 h-6 text-accent" />
 </div>
 <div>
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 2. Optionele Verzekeringen (Situatie-Afhankelijk)
 </h2>
 </div>
 </div>

 <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
 Deze verzekeringen zijn <strong>niet voor iedereen noodzakelijk</strong>, maar kunnen waardevol zijn afhankelijk van je specifieke situatie, bedrijfstype, of persoonlijke omstandigheden.
 </p>

 <div className="space-y-6">
 {/* Rechtsbijstand */}
 <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
 <div className="flex items-start gap-4 mb-4">
 <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
 <FileText className="w-5 h-5 text-primary" />
 </div>
 <div className="flex-1">
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Rechtsbijstandverzekering</h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
 Juridische kosten bij geschillen met klanten, leveranciers, of overheid
 </p>
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-4 mb-3">
 <div>
 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nuttig als:</p>
 <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
 <li>• Je werkt met grote contracten (€10K+)</li>
 <li>• Je hebt internationale klanten</li>
 <li>• Je maakt complexe deliverables</li>
 </ul>
 </div>
 <div>
 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Kosten:</p>
 <p className="text-gray-600 dark:text-gray-400 text-sm">€15-€30/maand | Dekking tot €100K juridische kosten</p>
 </div>
 </div>

 <div className="bg-gray-50 dark:bg-slate-700 rounded p-3">
 <p className="text-xs text-gray-600 dark:text-gray-400">
 <strong>Overweeg als:</strong>Je regelmatig wanbetalers hebt, complexe IP-vragen, of risico op geschillen door je werk.
 </p>
 </div>
 </div>

 {/* Pensioen */}
 <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
 <div className="flex items-start gap-4 mb-4">
 <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
 <TrendingUp className="w-5 h-5 text-accent" />
 </div>
 <div className="flex-1">
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Pensioenopbouw / Lijfrente</h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
 Geen werkgever die pensioen opbouwt? Zelf regelen via lijfrentepolis of beleggingsrekening
 </p>
 </div>
 </div>

 <div className="bg-primary/5 border-l-4 border-primary rounded-r p-4 mb-3">
 <p className="text-sm text-gray-700 dark:text-gray-300">
 <strong>Realiteit check:</strong>Met alleen AOA (algemene ouderdomswet) krijg je €1300-€1500/maand vanaf 67 jaar. Niet genoeg om comfortabel van te leven.
 </p>
 </div>

 <div className="grid md:grid-cols-2 gap-4">
 <div>
 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Opties:</p>
 <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
 <li>• <strong>Lijfrente:</strong>Fiscaal voordelig, maar rigide</li>
 <li>• <strong>Index ETFs:</strong>Flexibel, maar geen fiscaal voordeel</li>
 <li>• <strong>Eigen BV + pensioen:</strong>Voor hoge inkomens</li>
 </ul>
 </div>
 <div>
 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Budget:</p>
 <p className="text-gray-600 dark:text-gray-400 text-sm">10-15% van je inkomen | Minimaal €300-€500/maand aanbevolen</p>
 </div>
 </div>
 </div>

 {/* Bedrijfsinventaris */}
 <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
 <div className="flex items-start gap-4 mb-4">
 <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
 <Home className="w-5 h-5 text-secondary" />
 </div>
 <div className="flex-1">
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Bedrijfsinventarisverzekering</h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
 Laptop, camera, apparatuur tegen diefstal, brand, of schade
 </p>
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-4 mb-3">
 <div>
 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nuttig voor:</p>
 <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
 <li>• Fotografen (€20K+ apparatuur)</li>
 <li>• Videografen, designers met dure setups</li>
 <li>• Developers met €5K+ hardware</li>
 </ul>
 </div>
 <div>
 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Kosten:</p>
 <p className="text-gray-600 dark:text-gray-400 text-sm">€10-€40/maand | Dekking €2K-€25K</p>
 </div>
 </div>

 <div className="bg-gray-50 dark:bg-slate-700 rounded p-3">
 <p className="text-xs text-gray-600 dark:text-gray-400">
 <strong>Tip:</strong>Check eerst je inboedelverzekering—deze dekt vaak al thuiswerkende freelancer apparatuur tot €10K.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* CTA Section 2 */}
 <div className="bg-gradient-to-br from-primary to-primary-dark rounded-lg shadow-xl p-8 md:p-12 mb-16">
 <div className="max-w-3xl mx-auto text-center">
 <h3 className="text-3xl font-bold text-white mb-4">
 Optimaliseer Je Freelance Financiën
 </h3>
 <p className="text-xl text-white/90 mb-8">
 Van belastingen tot verzekeringen—ontdek alle tools en gidsen om je zakelijke administratie op orde te krijgen.
 </p>
 <Link
 href={`/${locale}/tools`}
 className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
 >
 Bekijk Tools
 <ArrowRight className="w-5 h-5" />
 </Link>
 </div>
 </div>

 {/* Section 3: Budget Planning */}
 <section className="mb-16">
 <div className="flex items-start gap-4 mb-6">
 <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
 <DollarSign className="w-6 h-6 text-secondary" />
 </div>
 <div>
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 3. Totaal Verzekeringbudget: Wat Moet Je Budgetteren?
 </h2>
 </div>
 </div>

 <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
 Als freelancer moet je <strong>10-15% van je bruto inkomen</strong>reserveren voor verzekeringen. Hier is een breakdown per inkomensniveau.
 </p>

 <div className="space-y-6">
 {/* Starter Budget */}
 <div className="bg-gradient-to-r from-accent/5 to-transparent dark:from-accent/10 rounded-lg p-6 border-l-4 border-accent">
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
 Starter Freelancer (€2000-€3000/maand inkomen)
 </h3>
 <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4">
 <p className="text-sm text-gray-700 dark:text-gray-300 mb-3"><strong>Minimaal pakket (€180-€250/maand):</strong></p>
 <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
 <li className="flex justify-between"><span>Zorgverzekering (basis)</span><strong>€120/mnd</strong></li>
 <li className="flex justify-between"><span>Beroepsaansprakelijkheid</span><strong>€30/mnd</strong></li>
 <li className="flex justify-between"><span>AOV (beperkt, 3mnd wachttijd)</span><strong>€80/mnd</strong></li>
 <li className="flex justify-between border-t pt-2 mt-2"><span><strong>Totaal</strong></span><strong>€230/mnd</strong></li>
 </ul>
 </div>
 <p className="text-sm text-gray-600 dark:text-gray-400">
 <strong>Advies:</strong>Focus op BA en minimale zorg. AOV optioneel als je buffer hebt van 6+ maanden.
 </p>
 </div>

 {/* Mid-level Budget */}
 <div className="bg-gradient-to-r from-primary/5 to-transparent dark:from-primary/10 rounded-lg p-6 border-l-4 border-primary">
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
 Established Freelancer (€4000-€6000/maand inkomen)
 </h3>
 <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4">
 <p className="text-sm text-gray-700 dark:text-gray-300 mb-3"><strong>Aanbevolen pakket (€350-€500/maand):</strong></p>
 <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
 <li className="flex justify-between"><span>Zorgverzekering (basis + aanvullend)</span><strong>€150/mnd</strong></li>
 <li className="flex justify-between"><span>Beroepsaansprakelijkheid (€1M dekking)</span><strong>€50/mnd</strong></li>
 <li className="flex justify-between"><span>AOV (70% dekking, 1mnd wachttijd)</span><strong>€150/mnd</strong></li>
 <li className="flex justify-between"><span>Rechtsbijstand</span><strong>€20/mnd</strong></li>
 <li className="flex justify-between border-t pt-2 mt-2"><span><strong>Totaal</strong></span><strong>€370/mnd</strong></li>
 </ul>
 </div>
 <p className="text-sm text-gray-600 dark:text-gray-400">
 <strong>Advies:</strong>AOV is nu cruciaal—je levensstijl hangt af van je inkomen. Voeg rechtsbijstand toe als je grote projecten doet.
 </p>
 </div>

 {/* Senior Budget */}
 <div className="bg-gradient-to-r from-secondary/5 to-transparent dark:from-secondary/10 rounded-lg p-6 border-l-4 border-secondary">
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
 High-Income Freelancer (€8000+/maand inkomen)
 </h3>
 <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4">
 <p className="text-sm text-gray-700 dark:text-gray-300 mb-3"><strong>Premium pakket (€600-€900/maand):</strong></p>
 <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
 <li className="flex justify-between"><span>Zorgverzekering (uitgebreid aanvullend)</span><strong>€200/mnd</strong></li>
 <li className="flex justify-between"><span>Beroepsaansprakelijkheid (€2,5M dekking)</span><strong>€100/mnd</strong></li>
 <li className="flex justify-between"><span>AOV (80% dekking, direct uitkering)</span><strong>€300/mnd</strong></li>
 <li className="flex justify-between"><span>Rechtsbijstand + Cyberverzekering</span><strong>€50/mnd</strong></li>
 <li className="flex justify-between"><span>Pensioenopbouw (lijfrente)</span><strong>€500/mnd</strong></li>
 <li className="flex justify-between border-t pt-2 mt-2"><span><strong>Totaal</strong></span><strong>€1150/mnd</strong></li>
 </ul>
 </div>
 <p className="text-sm text-gray-600 dark:text-gray-400">
 <strong>Advies:</strong>Investeer zwaar in AOV en pensioen. Overweeg BV met pensioenregeling voor fiscaal voordeel. Voeg cyberverzekering toe als je met data werkt.
 </p>
 </div>
 </div>

 <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 mt-6">
 <div className="flex items-start gap-3">
 <Shield className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
 <div>
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">Smart Budgettering: De 10-15% Regel</h4>
 <p className="text-gray-700 dark:text-gray-300">
 Reserveer <strong>10-15% van je bruto inkomen</strong>voor verzekeringen én pensioen. Bij €5000/mnd bruto = €500-750/mnd budget. Prioriteer essentiële verzekeringen eerst, voeg optionele toe als je groeit.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* Final CTA */}
 <div className="bg-gradient-to-br from-secondary via-primary to-accent rounded-lg shadow-xl p-8 md:p-12 mb-8">
 <div className="max-w-3xl mx-auto text-center">
 <Shield className="w-16 h-16 text-white mx-auto mb-6" />
 <h3 className="text-3xl font-bold text-white mb-4">
 Bescherm Je Freelance Carrière Vandaag
 </h3>
 <p className="text-xl text-white/90 mb-8">
 Start met de essentiële verzekeringen en bouw je dekking op naarmate je groeit.
 </p>
 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
 <Link
 href={`/${locale}/tools/rate-calculator`}
 className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
 >
 Bereken Budget
 <ArrowRight className="w-5 h-5" />
 </Link>
 <Link
 href={`/${locale}/gids`}
 className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
 >
 Alle Gidsen
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
 Alles over belastingaangifte, aftrekposten en btw voor freelancers
 </p>
 </Link>
 <Link href={`/${locale}/gids/zakelijk-beheer/freelance-factureren-gids`} className="group bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 hover:border-accent hover:shadow-lg transition-all">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
 Professioneel Factureren
 </h4>
 <p className="text-sm text-gray-600 dark:text-gray-400">
 Leer hoe je correct en efficiënt factureert als freelancer
 </p>
 </Link>
 </div>
 </section>
 </article>
 </main>
 
 </>
 );
}
