import { Metadata } from 'next';
import Link from 'next/link';
import { AdWidget } from '@/components/AdWidget';
import { FileText, Target, Zap, TrendingUp, CheckCircle, ArrowRight, Award, Lightbulb, BarChart } from 'lucide-react';

export async function generateMetadata({
 params
}: {
 params: Promise<{ locale: string }>
}): Promise<Metadata>{
 const { locale } = await params;
 const slug = 'winnende-voorstellen-schrijven';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/best-practices/${slug}`;

 if (locale === 'nl') {
 return {
 title: 'Winnende Voorstellen Schrijven: 40% Hogere Conversie [2026]',
 description: 'Leer voorstellen schrijven die klanten converteren. Bewezen templates, psychologie tactieken en frameworks die je win rate met 40% verhogen op elk platform.',
 keywords: 'voorstellen schrijven freelance, upwork proposals, fiverr gig beschrijving, freelance pitch, proposal template',
 openGraph: {
 title: 'Winnende Voorstellen Schrijven: 40% Hogere Conversie',
 description: 'Voorstellen die klanten converteren. Templates en frameworks die je win rate met 40% verhogen.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630 }],
 locale: 'nl_NL',
 type: 'article',
 },
 alternates: { canonical: pageUrl, languages: { 'nl': pageUrl } },
 robots: { index: true, follow: true },
 };
 }

 return {
 title: 'Write Winning Proposals: 40% Higher Conversion [2026]',
 description: 'Learn to write proposals that convert clients. Proven templates, psychology tactics, and frameworks that increase win rate by 40% on any platform.',
 alternates: { canonical: pageUrl, languages: { 'en': pageUrl } },
 robots: { index: true, follow: true },
 };
}

export default async function WinnendeVoorstellenSchrijven({ params }: { params: Promise<{ locale: string }>; }) {
 const { locale } = await params;

 const content = {
 hero: {
 title: "Winnende Voorstellen Schrijven: Voorstellen Die Converteren",
 subtitle: "90% van alle freelance voorstellen wordt genegeerd. Leer de exacte frameworks, psychologie principes en templates die je win rate met 40% verhogen en premium klanten aantrekken die je waarde begrijpen.",
 cta1: "Vind Beste Platforms", cta2: "Meer Best Practices"
 },
 intro: {
 title: "Waarom De Meeste Voorstellen Falen",
 text: "De gemiddelde freelancer schrijft generieke voorstellen die direct in de prullenbak belanden. Klanten ontvangen 20-50+ voorstellen per project. Jouw voorstel heeft 3-5 seconden om aandacht te trekken of het wordt overgeslagen. Een winnend voorstel is geen sollicitatiebrief—het is een gepersonaliseerde sales pitch die de klant ervan overtuigt dat JIJ de juiste keuze bent. Deze gids revealeert de psychologie, structuur en tactieken achter voorstellen die consistent 40%+ win rates behalen."
 },
 section1: {
 title: "De Psychologie Van Overtuigende Voorstellen",
 intro: "Voordat je een letter typt, moet je begrijpen wat er in het hoofd van de klant afspeelt. Effectieve voorstellen spelen in op fundamentele psychologische principes die beslissingen beïnvloeden.",
 psychology: {
 title: "1. Probleem-First Mindset: Toon Begrip Voor Het Pijnpunt",
 text: "Klanten posten projecten omdat ze een probleem hebben. Ze zoeken geen skills—ze zoeken een oplossing. Voorstellen die beginnen met 'Hallo, ik ben X met Y jaar ervaring' missen de mark. Start met het PROBLEEM van de klant.",
 template: "Problem-First Opening Template:",
 templateText: "'Ik begrijp dat je [specifiek probleem uit projectomschrijving] ervaart, wat resulteert in [negatieve impact op business]. Dit is een uitdaging die [je doelgroep] vaak tegen komt wanneer [context]. Ik heb [X aantal] klanten geholpen dit exact op te lossen door [jouw aanpak], wat resulteerde in [meetbaar resultaat].'"
 }
 },
 section2: {
 title: "De Winnende Voorstel Structuur: AIDA Framework",
 intro: "Het AIDA framework (Attention, Interest, Desire, Action) is een bewezen sales structuur die perfect werkt voor freelance voorstellen. Elk element speelt een kritische rol in het leiden van de klant naar 'hire'.",
 aida: {
 attention: {
 title: "A - Attention (Eerste 50 Woorden): Grijp Direct Aandacht",
 text: "Je hebt 3-5 seconden. Open met iets dat de klant doet pauzeren en lezen. Gebruik hun naam, refereer naar hun specifieke probleem, of open met een relevante statistiek.",
 examples: "Attention-Grabbing Openers:",
 list: [
 "'Hi [Naam], je Shopify conversie rate van 1.2% laat €15.000/maand op tafel liggen. Hier is hoe we dat in 30 dagen naar 3.5% brengen...'",
 "'Dit exact probleem—React performance bottlenecks in product pages—heb ik opgelost voor 8 e-commerce klanten met 40% snelheidsverbetering.'",
 "'Je hebt gelijk dat SEO specialisten vaak over-promise. Laat me je tonen waarom mijn aanpak anders is (en meetbaar)...'"
 ]
 }
 }
 },
 cta1: {
 title: "Vind Platforms Met De Beste Proposal Tools",
 text: "Verschillende platforms hebben verschillende proposal formats. Vergelijk proposal interfaces, character limits en conversion features op 500+ freelance marketplaces.",
 button: "Bekijk Top Platforms"
 },
 cta2: {
 title: "Begin Vandaag Met Winnende Voorstellen Schrijven",
 text: "Pas deze frameworks toe en zie je win rate vermenigvuldigen. Schrijf voorstellen die resoneren, vertrouwen opbouwen en klanten overtuigen dat je de voor-de-hand-liggende keuze bent.",
 button1: "Lees Meer Best Practices", button2: "Ontvang Wekelijkse Tips"
 },
 related: {
 title: "Gerelateerde Best Practices",
 profile: { title: "Profiel Optimaliseren", text: "Word gevonden door klanten" },
 portfolio: { title: "Portfolio Dat Converteert", text: "Showcase werk dat verkoopt" },
 communication: { title: "Freelance Communicatie", text: "Imponeer klanten vanaf dag één" }
 }
 };

 return (
 <>
 
 <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
 <section className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] text-white py-16 sm:py-20">
 <div className="container mx-auto px-4">
 <div className="max-w-4xl mx-auto text-center">
 <div className="flex items-center justify-center gap-3 mb-6">
 <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
 <FileText className="w-7 h-7 text-white" />
 </div>
 </div>
 <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{content.hero.title}</h1>
 <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">{content.hero.subtitle}</p>
 <div className="flex flex-wrap items-center justify-center gap-4">
 <Link href={`/${locale}/platforms`} className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg">
 {content.hero.cta1} <ArrowRight className="w-5 h-5" />
 </Link>
 <Link href={`/${locale}/gids/best-practices`} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20">
 {content.hero.cta2} <Zap className="w-5 h-5" />
 </Link>
 </div>
 </div>
 </div>
 </section>

 <script type="application/ld+json" dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "HowTo",
 "name": content.hero.title,
 "description": content.hero.subtitle,
 "step": [
 { "@type": "HowToStep", "name": "Begrijp Client Psychologie", "text": "Identificeer het echte probleem achter de projectpost" },
 { "@type": "HowToStep", "name": "Gebruik AIDA Framework", "text": "Structureer je voorstel voor maximale overtuigingskracht" },
 { "@type": "HowToStep", "name": "Personaliseer Elk Voorstel", "text": "Toon research en begrip van client situatie" },
 { "@type": "HowToStep", "name": "Kwantificeer Je Value", "text": "Gebruik metrics en case studies als bewijs" },
 { "@type": "HowToStep", "name": "Sluit Met Duidelijke CTA", "text": "Maak de volgende stap kristalhelder" }
 ]
 })
 }} />

 <article className="container mx-auto px-4 py-16">
 <div className="max-w-4xl mx-auto">
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">{content.intro.title}</h2>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{content.intro.text}</p>
 </div>

 <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white">
 <div className="max-w-3xl mx-auto text-center">
 <Target className="w-16 h-16 text-white mx-auto mb-6" />
 <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.cta1.title}</h2>
 <p className="text-xl text-white/90 mb-8">{content.cta1.text}</p>
 <Link href={`/${locale}/platforms`} className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg">
 {content.cta1.button} <ArrowRight className="w-5 h-5" />
 </Link>
 </div>
 </div>

 <AdWidget placement="blog_sidebar" />

 <div className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
 <div className="max-w-3xl mx-auto">
 <FileText className="w-16 h-16 text-white mx-auto mb-6" />
 <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.cta2.title}</h2>
 <p className="text-xl text-white/90 mb-8">{content.cta2.text}</p>
 <div className="flex flex-wrap items-center justify-center gap-4">
 <Link href={`/${locale}/gids/best-practices`} className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg">
 {content.cta2.button1} <ArrowRight className="w-5 h-5" />
 </Link>
 <Link href={`/${locale}/newsletter`} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20">
 {content.cta2.button2} <Zap className="w-5 h-5" />
 </Link>
 </div>
 </div>
 </div>

 <div className="mt-12 pt-12 border-t border-gray-200 dark:border-slate-700">
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{content.related.title}</h2>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <Link href={`/${locale}/gids/best-practices/profiel-optimaliseren`} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group">
 <Award className="w-10 h-10 text-primary mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{content.related.profile.title}</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">{content.related.profile.text}</p>
 </Link>
 <Link href={`/${locale}/gids/best-practices/portfolio-dat-converteert`} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group">
 <Lightbulb className="w-10 h-10 text-accent mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{content.related.portfolio.title}</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">{content.related.portfolio.text}</p>
 </Link>
 <Link href={`/${locale}/gids/best-practices/freelance-communicatie`} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group">
 <BarChart className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{content.related.communication.title}</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">{content.related.communication.text}</p>
 </Link>
 </div>
 </div>
 </div>
 </article>
 </main>
 
 </>
 );
}
