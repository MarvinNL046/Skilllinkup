import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, CheckCircle2, ArrowRight, FileText, TrendingDown, Euro, AlertTriangle, PiggyBank, Clock, Shield } from 'lucide-react';

interface PageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'freelance-belasting-gids';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/zakelijk-beheer/${slug}`;

 return {
 title: 'Freelance Belastingen Navigeren: Gids voor NL & BE 2026',
 description: 'Alles over belastingaangifte, aftrekposten, btw-aangifte en belastingplanning voor freelancers in Nederland en België. Bespaar geld met slimme tips.',
 keywords: 'freelance belastingen, belastingaangifte zzp, aftrekposten, zelfstandigenaftrek, btw aangifte, inkomstenbelasting freelancer',
 openGraph: {
 title: 'Freelance Belastingen Navigeren: Complete Gids NL & BE',
 description: 'Bespaar belasting met slimme aftrekposten en planning voor freelancers.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/zakelijk-beheer-og.png`, width: 1200, height: 630, alt: 'Freelance Belasting Gids' }],
 locale: locale === 'nl' ? 'nl_NL' : 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Freelance Belastingen Navigeren: Complete Gids',
 description: 'Bespaar belasting met slimme aftrekposten en planning.',
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

export default async function FreelanceBelastingGidsPage({ params }: PageProps) {
 const { locale } = await params;

 const jsonLd = {
 '@context': 'https://schema.org',
 '@type': 'Article',
 headline: 'Freelance Belastingen Navigeren: Complete Gids voor Nederland en België',
 description: 'Uitgebreide gids over belastingaangifte, aftrekposten, btw-aangifte en belastingplanning voor freelancers.',
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
 
 <main className="min-h-screen bg-white dark:bg-gray-900">
 {/* Hero Section */}
 <section className="bg-gradient-to-br from-secondary via-primary to-accent py-16 sm:py-24">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
 <Calculator className="w-4 h-4 text-accent" />
 <span className="text-white text-sm font-semibold">Zakelijk Beheer #2</span>
 </div>
 <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
 Navigeer Freelance Belastingen in Nederland & België
 </h1>
 <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
 Leer hoe je als freelancer slim omgaat met belastingen. Van inkomstenbelasting tot btw-aangifte - bespaar duizenden euro's met de juiste kennis en aftrekposten.
 </p>
 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
 <Link
 href={`/${locale}/tools/rate-calculator`}
 className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
 >
 Bereken Je Tarief
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
 Belastingen zijn voor veel freelancers een bron van stress. <strong>Gemiddeld betalen freelancers 35-52% van hun inkomen aan belastingen</strong>- maar met de juiste kennis en planning kun je deze last flink verlagen. Het verschil tussen slim belastingbeheer en onwetendheid kan duizenden euro's per jaar schelen.
 </p>
 <p className="text-lg text-gray-600 dark:text-gray-400">
 Deze gids behandelt de belangrijkste belastingonderwerpen voor freelancers in Nederland en België, inclusief praktische tips om legaal minder te betalen.
 </p>
 </div>

 {/* Stats Section */}
 <div className="grid md:grid-cols-3 gap-6 mb-16">
 <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border border-gray-200 dark:border-slate-700">
 <div className="text-4xl font-bold text-primary mb-2">35-52%</div>
 <div className="text-sm text-gray-600 dark:text-gray-400">Belastingdruk freelancers</div>
 </div>
 <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border border-gray-200 dark:border-slate-700">
 <div className="text-4xl font-bold text-accent mb-2">€3.750</div>
 <div className="text-sm text-gray-600 dark:text-gray-400">Zelfstandigenaftrek NL 2026</div>
 </div>
 <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border border-gray-200 dark:border-slate-700">
 <div className="text-4xl font-bold text-secondary mb-2">Q4</div>
 <div className="text-sm text-gray-600 dark:text-gray-400">Btw-aangifte kwartaal</div>
 </div>
 </div>

 {/* Section 1: Inkomstenbelasting Nederland */}
 <section className="mb-16">
 <div className="flex items-start gap-4 mb-6">
 <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
 <Euro className="w-6 h-6 text-primary" />
 </div>
 <div>
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 1. Inkomstenbelasting voor Freelancers in Nederland
 </h2>
 </div>
 </div>

 <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
 Als freelancer betaal je <strong>inkomstenbelasting over je winst</strong>(omzet minus kosten). Je doet eenmaal per jaar aangifte, meestal voor 1 mei.
 </p>

 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 Belastingtarieven 2026 (Box 1)
 </h3>
 <div className="overflow-x-auto mb-6">
 <table className="w-full border-collapse">
 <thead>
 <tr className="bg-gray-50 dark:bg-slate-800">
 <th className="text-left p-4 border border-gray-200 dark:border-slate-700 font-bold text-gray-900 dark:text-white">Schijf</th>
 <th className="text-left p-4 border border-gray-200 dark:border-slate-700 font-bold text-gray-900 dark:text-white">Inkomen</th>
 <th className="text-left p-4 border border-gray-200 dark:border-slate-700 font-bold text-gray-900 dark:text-white">Tarief</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">Schijf 1</td>
 <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">€0 - €38.098</td>
 <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 font-bold">36,97%</td>
 </tr>
 <tr className="bg-gray-50 dark:bg-slate-800">
 <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">Schijf 2</td>
 <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">€38.098 - €75.518</td>
 <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 font-bold">36,97%</td>
 </tr>
 <tr>
 <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">Schijf 3</td>
 <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">Boven €75.518</td>
 <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 font-bold">49,50%</td>
 </tr>
 </tbody>
 </table>
 </div>

 <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-6 mb-6">
 <div className="flex items-start gap-3">
 <AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
 <div>
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">Let Op: Progressief Systeem</h4>
 <p className="text-gray-700 dark:text-gray-300">
 De tarieven zijn <strong>progressief</strong>: je betaalt niet 49,50% over je hele inkomen als je in schijf 3 zit, alleen over het deel boven €75.518. Dus met €80.000 inkomen betaal je 36,97% over de eerste €75.518 en 49,50% over de laatste €4.482.
 </p>
 </div>
 </div>
 </div>

 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 Belangrijke Aftrekposten Nederland
 </h3>
 <div className="space-y-4 mb-6">
 <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
 <div className="flex items-start gap-4">
 <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
 <Euro className="w-5 h-5 text-accent" />
 </div>
 <div>
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">Zelfstandigenaftrek (2026)</h4>
 <p className="text-gray-600 dark:text-gray-400 mb-3">
 <strong>€3.750 korting op je belastbaar inkomen</strong>als je voldoet aan het urencriterium (1.225 uur per jaar in je bedrijf).
 </p>
 <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4 text-sm">
 <p className="text-gray-600 dark:text-gray-400">
 <strong>Besparing:</strong>Bij 37% tarief = €1.388 minder belasting. Bij 49,50% tarief = €1.856 minder.
 </p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
 <div className="flex items-start gap-4">
 <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
 <PiggyBank className="w-5 h-5 text-primary" />
 </div>
 <div>
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">Startersaftrek (eerste 3 jaar)</h4>
 <p className="text-gray-600 dark:text-gray-400 mb-3">
 Extra <strong>€2.123 aftrek</strong>in je eerste 3 jaar als zelfstandige (naast de zelfstandigenaftrek).
 </p>
 <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
 <li>• Geldt alleen als je voor het eerst start als ondernemer</li>
 <li>• Maximaal 3 keer in je leven te gebruiken</li>
 <li>• Je moet voldoen aan het urencriterium</li>
 </ul>
 </div>
 </div>
 </div>

 <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
 <div className="flex items-start gap-4">
 <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
 <FileText className="w-5 h-5 text-secondary" />
 </div>
 <div>
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">MKB-winstvrijstelling</h4>
 <p className="text-gray-600 dark:text-gray-400 mb-3">
 <strong>14% van je winst is belastingvrij</strong>(na aftrek van zelfstandigenaftrek).
 </p>
 <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4 text-sm">
 <p className="text-gray-600 dark:text-gray-400 mb-2">
 <strong>Voorbeeld:</strong>Winst €50.000 - Zelfstandigenaftrek €3.750 = €46.250
 </p>
 <p className="text-gray-600 dark:text-gray-400">
 14% MKB-vrijstelling = €6.475 extra aftrek → Je betaalt belasting over €39.775
 </p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
 <div className="flex items-start gap-4">
 <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
 <CheckCircle2 className="w-5 h-5 text-accent" />
 </div>
 <div>
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">Zakelijke Kosten</h4>
 <p className="text-gray-600 dark:text-gray-400 mb-3">
 Alle kosten die je maakt voor je bedrijf mag je aftrekken van je omzet:
 </p>
 <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
 <li>• Werkruimte (thuiswerkkamer of extern kantoor)</li>
 <li>• Apparatuur (laptop, monitor, software, telefoon)</li>
 <li>• Reiskosten (€0,23/km met eigen auto in 2026)</li>
 <li>• Zakelijke telefoon en internet (eventueel percentage)</li>
 <li>• Cursussen, vakliteratuur, conferenties</li>
 <li>• Accountant, boekhouder, advocaat</li>
 <li>• Marketing en reclame</li>
 <li>• Verzekeringen (aansprakelijkheid, rechtsbijstand)</li>
 <li>• Kantoorbenodigdheden</li>
 </ul>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-accent/5 border-l-4 border-accent rounded-r-lg p-6">
 <div className="flex items-start gap-3">
 <Shield className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
 <div>
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">Bewaar Altijd Je Bonnetjes!</h4>
 <p className="text-gray-700 dark:text-gray-300">
 De Belastingdienst kan tot <strong>5 jaar terug</strong>controle doen. Bewaar daarom alle facturen, bonnetjes, en bankafschriften zorgvuldig (digitaal of fysiek). Zonder bewijs worden aftrekposten geweigerd.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* CTA Section 1 */}
 <div className="bg-gradient-to-br from-accent to-accent-dark rounded-lg shadow-xl p-8 md:p-12 mb-16">
 <div className="max-w-3xl mx-auto text-center">
 <h3 className="text-3xl font-bold text-white mb-4">
 Bereken Je Ideale Uurtarief Inclusief Belastingen
 </h3>
 <p className="text-xl text-white/90 mb-8">
 Ontdek hoeveel je moet vragen per uur om je gewenste netto-inkomen over te houden na belastingen en kosten.
 </p>
 <Link
 href={`/${locale}/tools/rate-calculator`}
 className="inline-flex items-center gap-2 bg-white text-accent hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
 >
 Bereken Je Tarief
 <ArrowRight className="w-5 h-5" />
 </Link>
 </div>
 </div>

 {/* Section 2: België Belastingen */}
 <section className="mb-16">
 <div className="flex items-start gap-4 mb-6">
 <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
 <Calculator className="w-6 h-6 text-secondary" />
 </div>
 <div>
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 2. Belastingen voor Freelancers in België
 </h2>
 </div>
 </div>

 <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
 In België betaal je als zelfstandige <strong>personenbelasting</strong>over je winst, plus sociale bijdragen. Het systeem verschilt van Nederland.
 </p>

 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 Personenbelasting Tarieven België 2026
 </h3>
 <div className="overflow-x-auto mb-6">
 <table className="w-full border-collapse">
 <thead>
 <tr className="bg-gray-50 dark:bg-slate-800">
 <th className="text-left p-4 border border-gray-200 dark:border-slate-700 font-bold text-gray-900 dark:text-white">Schijf</th>
 <th className="text-left p-4 border border-gray-200 dark:border-slate-700 font-bold text-gray-900 dark:text-white">Belastbaar Inkomen</th>
 <th className="text-left p-4 border border-gray-200 dark:border-slate-700 font-bold text-gray-900 dark:text-white">Tarief</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">Schijf 1</td>
 <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">€0 - €15.200</td>
 <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 font-bold">25%</td>
 </tr>
 <tr className="bg-gray-50 dark:bg-slate-800">
 <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">Schijf 2</td>
 <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">€15.200 - €26.830</td>
 <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 font-bold">40%</td>
 </tr>
 <tr>
 <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">Schijf 3</td>
 <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">€26.830 - €46.440</td>
 <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 font-bold">45%</td>
 </tr>
 <tr className="bg-gray-50 dark:bg-slate-800">
 <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">Schijf 4</td>
 <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">Boven €46.440</td>
 <td className="p-4 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 font-bold">50%</td>
 </tr>
 </tbody>
 </table>
 </div>

 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 Sociale Bijdragen België
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 Naast belasting betaal je <strong>sociale bijdragen</strong>aan een sociaal verzekeringsfonds:
 </p>
 <div className="space-y-4 mb-6">
 <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">Hoofdberoep</h4>
 <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
 <li>• <strong>20,5%</strong>over eerste €66.866 netto belastbaar inkomen</li>
 <li>• <strong>14,16%</strong>over het deel boven €66.866</li>
 <li>• Minimumbijdrage: ±€850/kwartaal (ook zonder inkomen)</li>
 </ul>
 </div>

 <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">Bijberoep</h4>
 <p className="text-gray-600 dark:text-gray-400 mb-2">
 Als je bijberoep hebt, betaal je geen minimumbijdrage maar wel sociale bijdragen vanaf bepaalde inkomensdrempel:
 </p>
 <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
 <li>• <strong>Geen bijdragen</strong>als inkomen onder ±€1.800/jaar</li>
 <li>• Dezelfde percentages als hoofdberoep boven deze grens</li>
 </ul>
 </div>
 </div>

 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 Belangrijke Aftrekposten België
 </h3>
 <ul className="space-y-3 mb-6">
 <li className="flex items-start gap-3">
 <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
 <span className="text-gray-700 dark:text-gray-300"><strong>Beroepskosten:</strong>Forfait 30% (tot €4.940) of werkelijke kosten</span>
 </li>
 <li className="flex items-start gap-3">
 <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
 <span className="text-gray-700 dark:text-gray-300"><strong>Pensioensparen:</strong>Tot €1.020/jaar (belastingvoordeel 30% of 25%)</span>
 </li>
 <li className="flex items-start gap-3">
 <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
 <span className="text-gray-700 dark:text-gray-300"><strong>Aanvullend pensioen zelfstandigen (VAPZ):</strong>Tot €3.707/jaar aftrekbaar</span>
 </li>
 <li className="flex items-start gap-3">
 <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
 <span className="text-gray-700 dark:text-gray-300"><strong>Kinderen ten laste:</strong>Extra belastingvermindering</span>
 </li>
 <li className="flex items-start gap-3">
 <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
 <span className="text-gray-700 dark:text-gray-300"><strong>Dienstencheques:</strong>Aftrek voor gezinshulp</span>
 </li>
 </ul>

 <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
 <div className="flex items-start gap-3">
 <TrendingDown className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
 <div>
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">Tip: Vennootschap Overwegen?</h4>
 <p className="text-gray-700 dark:text-gray-300">
 Vanaf <strong>€50.000-70.000 winst</strong>kan een vennootschap (BV/BVBA) fiscaal interessanter zijn dan eenmanszaak. Je betaalt vennootschapsbelasting (25%) i.p.v. personenbelasting (tot 50%). Nadeel: complexere administratie en extra kosten. Raadpleeg een accountant.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* Section 3: Btw-Aangifte */}
 <section className="mb-16">
 <div className="flex items-start gap-4 mb-6">
 <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
 <FileText className="w-6 h-6 text-accent" />
 </div>
 <div>
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 3. Btw-Aangifte voor Freelancers
 </h2>
 </div>
 </div>

 <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
 Als je btw-plichtig bent, moet je <strong>periodiek btw-aangifte</strong>doen. Je draagt de btw af die je hebt ontvangen van klanten, minus de btw die je hebt betaald op zakelijke aankopen.
 </p>

 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 Btw-Aangifte Frequentie
 </h3>

 <div className="grid md:grid-cols-2 gap-6 mb-6">
 <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-accent">
 <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-3">Nederland</h4>
 <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
 <li className="flex items-start gap-2">
 <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
 <span><strong>Kwartaal:</strong>Meest gebruikelijk voor freelancers</span>
 </li>
 <li className="flex items-start gap-2">
 <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
 <span><strong>Maand:</strong>Verplicht bij omzet &gt;€75.000/jaar</span>
 </li>
 <li className="flex items-start gap-2">
 <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
 <span><strong>Jaar:</strong>Mogelijk bij omzet &lt;€20.000</span>
 </li>
 <li className="flex items-start gap-2">
 <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
 <span>Aangifte uiterlijk 1 maand na periode</span>
 </li>
 </ul>
 </div>

 <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-primary">
 <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-3">België</h4>
 <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
 <li className="flex items-start gap-2">
 <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
 <span><strong>Maand:</strong>Standaard voor meeste ondernemers</span>
 </li>
 <li className="flex items-start gap-2">
 <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
 <span><strong>Kwartaal:</strong>Als omzet &lt;€2.500.000</span>
 </li>
 <li className="flex items-start gap-2">
 <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
 <span>Aangifte uiterlijk 20e van volgende maand</span>
 </li>
 <li className="flex items-start gap-2">
 <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
 <span>Listing klanten (intra-communautair) apart</span>
 </li>
 </ul>
 </div>
 </div>

 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 Wat Moet Je Bijhouden?
 </h3>
 <ul className="space-y-3 mb-6">
 <li className="flex items-start gap-3">
 <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
 <span className="text-gray-700 dark:text-gray-300"><strong>Uitgaande btw:</strong>Btw die je aan klanten hebt gefactureerd (te betalen aan Belastingdienst/FOD)</span>
 </li>
 <li className="flex items-start gap-3">
 <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
 <span className="text-gray-700 dark:text-gray-300"><strong>Ingaande btw:</strong>Btw die je hebt betaald op zakelijke aankopen (aftrekbaar)</span>
 </li>
 <li className="flex items-start gap-3">
 <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
 <span className="text-gray-700 dark:text-gray-300"><strong>Verlegd btw:</strong>B2B-transacties waarbij de klant btw afdraagt</span>
 </li>
 <li className="flex items-start gap-3">
 <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
 <span className="text-gray-700 dark:text-gray-300"><strong>Buitenlandse transacties:</strong>Speciale codes voor EU en niet-EU</span>
 </li>
 </ul>

 <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-6">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">Veelgemaakte Fout: Privéuitgaven Aftrekken</h4>
 <p className="text-gray-700 dark:text-gray-300 mb-2">
 Je mag <strong>alleen btw terugvragen op zakelijke uitgaven</strong>. Privéaankopen (ook al gebruik je ze deels zakelijk) zijn niet aftrekbaar, tenzij je een verdeelsleutel gebruikt (bijv. 60% zakelijk gebruik).
 </p>
 <p className="text-gray-700 dark:text-gray-300">
 <strong>Voorbeeld zakelijk:</strong>Laptop uitsluitend voor werk, software-abonnementen, kantoorbenodigdheden, zakelijke telefoon.<br/>
 <strong>Voorbeeld deels zakelijk:</strong>Auto (zakelijke kilometers), thuiswerkkamer (percentage woonoppervlak).
 </p>
 </div>
 </section>

 {/* CTA Section 2 */}
 <div className="bg-gradient-to-br from-primary to-primary-dark rounded-lg shadow-xl p-8 md:p-12 mb-16">
 <div className="max-w-3xl mx-auto text-center">
 <h3 className="text-3xl font-bold text-white mb-4">
 Krijg Wekelijkse Belastingtips voor Freelancers
 </h3>
 <p className="text-xl text-white/90 mb-8">
 Mis geen aftrekposten meer. Ontvang praktische belastingtips en updates over wetgeving in onze nieuwsbrief.
 </p>
 <Link
 href={`/${locale}/newsletter`}
 className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
 >
 Zakelijke Tips
 <ArrowRight className="w-5 h-5" />
 </Link>
 </div>
 </div>

 {/* Section 4: Belastingplanning */}
 <section className="mb-16">
 <div className="flex items-start gap-4 mb-6">
 <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
 <Clock className="w-6 h-6 text-primary" />
 </div>
 <div>
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 4. Slimme Belastingplanning: Bespaar Legaal Duizenden Euro's
 </h2>
 </div>
 </div>

 <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
 Belastingplanning betekent <strong>legaal je belastingdruk verlagen</strong>door slimme keuzes te maken. Hier zijn de belangrijkste strategieën:
 </p>

 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 10 Slimme Belastingtips voor Freelancers
 </h3>

 <div className="space-y-4 mb-6">
 <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-l-4 border-accent">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">1. Maximaliseer Zakelijke Kosten</h4>
 <p className="text-gray-600 dark:text-gray-400 text-sm">
 Trek alles af wat écht zakelijk is: cursussen, vakliteratuur, software-abonnementen, coworkingspace, netwerkevenementen. Bij twijfel: vraag een accountant.
 </p>
 </div>

 <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-l-4 border-primary">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">2. Spreid Inkomsten Over Jaren</h4>
 <p className="text-gray-600 dark:text-gray-400 text-sm">
 Factureer grote projecten in december voor uitbetaling in januari, of vice versa. Zo kun je belasting spreiden en lagere schijven benutten.
 </p>
 </div>

 <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-l-4 border-secondary">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">3. Investeer in Pensioen (België)</h4>
 <p className="text-gray-600 dark:text-gray-400 text-sm">
 VAPZ (Vrij Aanvullend Pensioen Zelfstandigen) geeft belastingvoordeel tot 30% op max. €3.707/jaar. Investeer voor later én bespaar nu belasting.
 </p>
 </div>

 <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-l-4 border-accent">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">4. Thuiswerkkamer Aftrekken</h4>
 <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
 Als je een aparte kamer gebruikt voor werk, mag je een deel van huur, energie, internet aftrekken (percentage woonoppervlak).
 </p>
 <p className="text-xs text-gray-500 dark:text-gray-500">
 <strong>NL:</strong>Strikte regels - kamer moet echt zakelijk zijn. <strong>BE:</strong>Ruimer, ook deel woonkamer mogelijk.
 </p>
 </div>

 <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-l-4 border-primary">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">5. Auto Zakelijk Gebruiken</h4>
 <p className="text-gray-600 dark:text-gray-400 text-sm">
 <strong>NL:</strong>€0,23/km aftrekbaar (2026). <strong>BE:</strong>Forfaitaire aftrek of werkelijke kosten + btw op benzine/diesel. Elektrisch = voordeligst fiscaal.
 </p>
 </div>

 <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-l-4 border-secondary">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">6. Investeer Voor Einde Jaar</h4>
 <p className="text-gray-600 dark:text-gray-400 text-sm">
 Koop laptop, software, of bureaumeubels in december om direct het volledige bedrag af te trekken van winst dit jaar (investeringsaftrek BE).
 </p>
 </div>

 <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-l-4 border-accent">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">7. Gebruik Voor- en Nakosten</h4>
 <p className="text-gray-600 dark:text-gray-400 text-sm">
 Voorbereidende kosten (vóór bedrijfsstart) en nakostenkunt je 3 jaar terug aftrekken. Start je in 2026? Kosten uit 2025 zijn alsnog aftrekbaar.
 </p>
 </div>

 <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-l-4 border-primary">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">8. Reserveer Voor Belasting</h4>
 <p className="text-gray-600 dark:text-gray-400 text-sm">
 Zet maandelijks <strong>35-50% van je winst apart</strong>op spaarrekening voor belasting. Zo voorkom je financiële stress bij aanslag.
 </p>
 </div>

 <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-l-4 border-secondary">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">9. Schakel een Accountant In</h4>
 <p className="text-gray-600 dark:text-gray-400 text-sm">
 Kosten accountant zijn aftrekbaar. Een goede accountant bespaart je vaak <strong>meer dan hij kost</strong>door slimme planning en geen gemiste aftrekposten.
 </p>
 </div>

 <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-l-4 border-accent">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">10. Blijf Op de Hoogte van Wetgeving</h4>
 <p className="text-gray-600 dark:text-gray-400 text-sm">
 Belastingregels veranderen jaarlijks. Volg nieuwsbrieven, lees fiscale updates, en bespreek wijzigingen met je accountant om geen kansen te missen.
 </p>
 </div>
 </div>

 <div className="bg-accent/5 border-l-4 border-accent rounded-r-lg p-6">
 <div className="flex items-start gap-3">
 <Shield className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
 <div>
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">Let Op: Belastingontwijking vs. Belastingontduiking</h4>
 <p className="text-gray-700 dark:text-gray-300">
 <strong>Belastingontwijking</strong>(legaal) = Gebruik maken van wettelijke regelingen om minder te betalen.<br/>
 <strong>Belastingontduiking</strong>(illegaal) = Opzettelijk inkomen verzwijgen of valse kosten opgeven. Dit leidt tot boetes, naheffingen en strafrechtelijke vervolging. Blijf altijd binnen de grenzen van de wet.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* Final CTA */}
 <div className="bg-gradient-to-br from-secondary via-primary to-accent rounded-lg shadow-xl p-8 md:p-12 mb-8">
 <div className="max-w-3xl mx-auto text-center">
 <Calculator className="w-16 h-16 text-white mx-auto mb-6" />
 <h3 className="text-3xl font-bold text-white mb-4">
 Ontdek Meer Zakelijke Tools voor Freelancers
 </h3>
 <p className="text-xl text-white/90 mb-8">
 Van urenregistratie tot tarifering - alle tools om je zakelijke administratie op orde te krijgen.
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
 Alles over facturen maken, betalingstermijnen en wettelijke vereisten
 </p>
 </Link>
 <Link href={`/${locale}/gids/zakelijk-beheer/freelance-zakelijke-verzekering`} className="group bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 hover:border-accent hover:shadow-lg transition-all">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
 Heb Je Verzekering Nodig?
 </h4>
 <p className="text-sm text-gray-600 dark:text-gray-400">
 Overzicht van essentiële verzekeringen voor freelancers
 </p>
 </Link>
 </div>
 </section>
 </article>
 </main>
 
 </>
 );
}
