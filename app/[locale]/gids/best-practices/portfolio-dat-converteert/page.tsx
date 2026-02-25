import { Metadata } from 'next';
import Link from 'next/link';
import { AdWidget } from '@/components/AdWidget';
import { FolderOpen, Eye, Star, TrendingUp, CheckCircle, ArrowRight, Zap, Award, Image } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }>}): Promise<Metadata>{
 const { locale } = await params;
 const slug = 'portfolio-dat-converteert';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/best-practices/${slug}`;

 if (locale === 'nl') {
 return {
 title: 'Portfolio Dat Converteert: Showcase Je Beste Werk [2026]',
 description: 'Creëer een portfolio dat 45% meer klanten converteert. Leer welk werk te showcasen, hoe te presenteren en welke psychologie triggers conversie verhogen.',
 keywords: 'portfolio freelance, portfolio tips, werk showcasen, freelance portfolio voorbeelden, converterende portfolio',
 openGraph: {
 title: 'Portfolio Dat Converteert: Showcase Je Beste Werk',
 description: 'Portfolio dat 45% meer klanten converteert. Bewezen frameworks en presentatie tactieken.',
 url: pageUrl, siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630 }],
 locale: 'nl_NL', type: 'article',
 },
 alternates: { canonical: pageUrl, languages: { 'nl': pageUrl } },
 robots: { index: true, follow: true },
 };
 }
 return {
 title: 'Portfolio That Converts: Showcase Your Best Work [2026]',
 description: 'Create a portfolio that converts 45% more clients. Learn what work to showcase, how to present it, and which psychology triggers increase conversion.',
 alternates: { canonical: pageUrl },
 robots: { index: true, follow: true },
 };
}

export default async function PortfolioDatConverteert({ params }: { params: Promise<{ locale: string }>; }) {
 const { locale } = await params;

 const content = {
 hero: {
 title: "Portfolio Dat Converteert: Showcase Je Beste Werk",
 subtitle: "Een mooi portfolio is niet genoeg—het moet verkopen. Leer welk werk te showcasen, hoe verhalen te vertellen die resoneren, en welke psychologie principes portfolio views omzetten in betalende klanten. 45% hogere conversie gegarandeerd.",
 cta1: "Vind Beste Platforms", cta2: "Meer Best Practices"
 },
 intro: {
 title: "Waarom Mooie Portfolio's Niet Converteren",
 text: "Je hebt vijf jaar aan geweldig werk. Professionele screenshots, mooie mockups, indrukwekkende projecten. Maar waarom krijg je geen aanvragen? Omdat je portfolio showcase is, geen sales tool. Een converterend portfolio vertelt niet alleen WAT je hebt gemaakt—het communiceert WAAROM het belangrijk was, WELK probleem het oploste en HOEVEEL waarde het creëerde. Deze gids transformeert je portfolio van een passieve galerij naar een actieve client acquisition engine die consistent kwaliteitsprojecten aantrekt."
 },
 section1: {
 title: "Strategische Projectselectie: Kwaliteit Boven Kwantiteit",
 intro: "De grootste fout: te veel werk tonen. Portfolio's met 5-8 zorgvuldig gekozen stukken converteren 45% beter dan portfolio's met 20+ projecten. Meer werk verdunt je boodschap en overweldigt prospects. Elke portfolio piece moet strategisch geselecteerd zijn om expertise te demonstreren en doelgroep te targeten.",
 selection: {
 title: "1. Het 3-Score Selectie Framework",
 text: "Niet elk project verdient een plek in je portfolio. Gebruik dit evidence-based framework om systematisch je beste werk te identificeren dat potentiële klanten overtuigt.",
 framework: "Score Elk Project Op (1-10 Schaal):",
 list: [
 "Impact Score: Hoe meetbaar waren de resultaten? Kun je conversie stijging, omzetgroei of tijdsbesparing kwantificeren?",
 "Target Match Score: Hoe goed resoneert dit project met je ideale klant? Toont het expertise in hun industrie/niche?",
 "Visual Impact Score: Hoe visueel overtuigend is de presentatie? Maakt het instant indruk in 3 seconden?",
 "Story Quality Score: Hoe compelling is het verhaal? Demonstreert het probleemoplossend vermogen en waardecreatie?",
 "Recency Score: Hoe recent is het werk? Projecten <12 maanden oud scoren hoger."
 ],
 formula: "Portfolio Selection Formula:",
 formulaText: "Portfolio Score = (Impact × 0.30) + (Target Match × 0.25) + (Visual Impact × 0.20) + (Story Quality × 0.15) + (Recency × 0.10)"
 }
 },
 cta1: {
 title: "Vind Platforms Met Portfolio Features Die Converteren",
 text: "Verschillende platforms bieden verschillende portfolio tools, display formats en showcase opties. Vergelijk welke platforms je werk het beste laten schijnen en maximale conversie genereren.",
 button: "Bekijk Platform Vergelijkingen"
 },
 cta2: {
 title: "Begin Vandaag Je Converterende Portfolio",
 text: "Transformeer je portfolio van showcase naar sales tool. Selecteer strategisch, vertel compelling verhalen, en positioneer jezelf als de voor-de-hand-liggende keuze voor premium klanten die je expertise begrijpen.",
 button1: "Lees Meer Best Practices", button2: "Ontvang Wekelijkse Tips"
 },
 related: {
 title: "Gerelateerde Best Practices",
 profile: { title: "Profiel Optimaliseren", text: "Word gevonden door klanten" },
 proposals: { title: "Winnende Voorstellen", text: "Voorstellen die 40% meer converteren" },
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
 <FolderOpen className="w-7 h-7 text-white" />
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
 "@context": "https://schema.org", "@type": "HowTo",
 "name": content.hero.title, "description": content.hero.subtitle,
 "step": [
 { "@type": "HowToStep", "name": "Selecteer Strategisch", "text": "Kies 5-8 projecten met hoogste impact en target match" },
 { "@type": "HowToStep", "name": "Vertel Verhalen", "text": "Gebruik STAR framework voor compelling case studies" },
 { "@type": "HowToStep", "name": "Kwantificeer Resultaten", "text": "Toon meetbare impact met metrics en testimonials" },
 { "@type": "HowToStep", "name": "Optimaliseer Visuals", "text": "Professionele presentatie met before/after comparisons" },
 { "@type": "HowToStep", "name": "Test & Iterate", "text": "Track conversie en optimaliseer continu" }
 ]
 })
 }} />

 <article className="container mx-auto px-4 py-16">
 <div className="max-w-4xl mx-auto">
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">{content.intro.title}</h2>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{content.intro.text}</p>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
 <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border border-primary/20">
 <Eye className="w-10 h-10 text-primary mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">45% Hogere Conversie</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">Views naar aanvragen ratio</p>
 </div>
 <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border border-accent/20">
 <Star className="w-10 h-10 text-accent mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">5-8 Portfolio Stukken</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">Optimaal aantal voor conversie</p>
 </div>
 <div className="bg-gradient-to-br from-[#1e1541]/10 to-[#1e1541]/5 dark:from-[#1e1541]/30 dark:to-[#1e1541]/20 rounded-xl p-6 border border-[#1e1541]/20">
 <TrendingUp className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">3x Premium Klanten</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">Met strategische positionering</p>
 </div>
 </div>
 </div>

 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">{content.section1.title}</h2>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">{content.section1.intro}</p>

 <div className="mb-10">
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
 <Award className="w-7 h-7 text-primary" />
 {content.section1.selection.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{content.section1.selection.text}</p>

 <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 mb-4 border border-primary/20">
 <h4 className="font-bold text-gray-900 dark:text-white mb-3">{content.section1.selection.framework}</h4>
 <ul className="space-y-3">
 {content.section1.selection.list.map((item, index) =>(
 <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <span><strong className="text-gray-900 dark:text-white">{item.split(':')[0]}:</strong>{item.split(':').slice(1).join(':')}</span>
 </li>
 ))}
 </ul>
 </div>

 <div className="bg-accent/5 dark:bg-accent/10 rounded-xl p-6 border border-accent/20">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">{content.section1.selection.formula}</h4>
 <p className="text-gray-700 dark:text-gray-300 font-mono text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded">
 {content.section1.selection.formulaText}
 </p>
 </div>
 </div>
 </div>

 <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white">
 <div className="max-w-3xl mx-auto text-center">
 <Image className="w-16 h-16 text-white mx-auto mb-6" />
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
 <FolderOpen className="w-16 h-16 text-white mx-auto mb-6" />
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
 <Eye className="w-10 h-10 text-primary mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{content.related.profile.title}</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">{content.related.profile.text}</p>
 </Link>
 <Link href={`/${locale}/gids/best-practices/winnende-voorstellen-schrijven`} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group">
 <Award className="w-10 h-10 text-accent mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{content.related.proposals.title}</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">{content.related.proposals.text}</p>
 </Link>
 <Link href={`/${locale}/gids/best-practices/freelance-communicatie`} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group">
 <Star className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
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
