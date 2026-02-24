import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AdWidget } from '@/components/AdWidget';
import { Cpu, TrendingUp, Zap, CheckCircle, ArrowRight, Award, Target, BarChart } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }>}): Promise<Metadata>{
 const { locale } = await params;
 const slug = 'platform-algoritmes-beheersen';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/best-practices/${slug}`;

 if (locale === 'nl') {
 return {
 title: 'Platform Algoritmes Beheersen: Hack Het Systeem [2026]',
 description: 'Ontdek hoe Upwork, Fiverr en Freelancer algoritmes werken. Bewezen tactieken om ranking te verhogen, meer zichtbaarheid te krijgen en 3x meer projecten binnen te halen.',
 keywords: 'upwork algoritme, fiverr ranking, freelancer zoekopdracht, freelance platform SEO, ranking verhogen',
 openGraph: {
 title: 'Platform Algoritmes Beheersen: Hack Het Systeem',
 description: 'Ontdek hoe platform algoritmes werken en hack het systeem voor 3x meer projecten.',
 url: pageUrl, siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630 }],
 locale: 'nl_NL', type: 'article',
 },
 alternates: { canonical: pageUrl, languages: { 'nl': pageUrl } },
 robots: { index: true, follow: true },
 };
 }
 return {
 title: 'Master Platform Algorithms: Hack The System [2026]',
 description: 'Discover how Upwork, Fiverr and Freelancer algorithms work. Proven tactics to increase ranking, get more visibility and land 3x more projects.',
 alternates: { canonical: pageUrl },
 robots: { index: true, follow: true },
 };
}

export default async function PlatformAlgoritmesBeheersen({ params }: { params: Promise<{ locale: string }>; }) {
 const { locale } = await params;

 const content = {
 hero: {
 title: "Platform Algoritmes Beheersen: Hack Het Algoritme",
 subtitle: "Elk freelance platform heeft een geheim algoritme dat bepaalt wie zichtbaar is en wie onzichtbaar blijft. Leer de exacte ranking factoren, tactieken en hacks die top freelancers gebruiken om constant bovenaan te staan en 3x meer projecten binnen te halen.",
 cta1: "Vind Beste Platforms", cta2: "Meer Best Practices"
 },
 intro: {
 title: "Waarom Sommige Freelancers Constant Zichtbaar Zijn",
 text: "Het is geen toeval dat dezelfde freelancers altijd bovenaan zoekresultaten verschijnen. Ze begrijpen de onzichtbare ranking factoren die platform algoritmes gebruiken om relevantie en kwaliteit te bepalen. Deze algoritmes zijn niet random—ze volgen specifieke regels, gewichten en patronen. Door deze regels te begrijpen en te optimaliseren voor ranking factoren, kun je je zichtbaarheid dramatisch verhogen en consistent meer kwaliteitsprojecten aantrekken. Deze gids onthult de black box van freelance platform algoritmes."
 },
 section1: {
 title: "Hoe Platform Algoritmes Werken: De Fundamentals",
 intro: "Alle freelance platforms gebruiken algoritmes om duizenden freelancers te matchen met projecten. Deze algoritmes balanceren relevantie (keyword match), kwaliteit (ratings, stats) en engagement (activity, response time). Begrip van deze fundamentals is de basis voor algoritme optimalisatie.",
 fundamentals: {
 title: "1. De Drie Ranking Pilaren: Relevantie, Kwaliteit, Engagement",
 text: "Elk platform algoritme weegt drie primaire factoren om ranking te bepalen. Het relatieve gewicht verschilt per platform, maar de fundamentals blijven hetzelfde.",
 pillars: "Ranking Pilaren Breakdown:",
 list: [
 "Relevantie (30-40%): Keyword match tussen freelancer profiel en project/zoekopdracht. Hoe beter je profiel matcht met client search intent, hoe hoger je rankt.",
 "Kwaliteit (30-40%): Completion rate, client ratings, earnings history, portfolio quality. Platforms favoriseren proven performers.",
 "Engagement (20-30%): Recent activity, response time, proposal acceptance rate, login frequency. Active freelancers krijgen voorrang."
 ]
 }
 },
 cta1: {
 title: "Vergelijk Platform Algoritmes & Ranking Systemen",
 text: "Verschillende platforms gebruiken verschillende ranking factoren en weging. Vind het platform waar jouw profiel het beste rankt en optimaliseer voor dat specifieke algoritme.",
 button: "Bekijk Platform Vergelijkingen"
 },
 cta2: {
 title: "Begin Vandaag Met Algoritme Optimalisatie",
 text: "Pas deze tactieken toe en zie je ranking stijgen. Hack het systeem, verhoog je zichtbaarheid en trek consistent meer premium projecten aan die je verdient.",
 button1: "Lees Meer Best Practices", button2: "Ontvang Wekelijkse Tips"
 },
 related: {
 title: "Gerelateerde Best Practices",
 profile: { title: "Profiel Optimaliseren", text: "Word gevonden door klanten" },
 proposals: { title: "Winnende Voorstellen", text: "Voorstellen die 40% meer converteren" },
 portfolio: { title: "Portfolio Dat Converteert", text: "Showcase werk dat verkoopt" }
 }
 };

 return (
 <>
 <Header />
 <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
 <section className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] text-white py-16 sm:py-20">
 <div className="container mx-auto px-4">
 <div className="max-w-4xl mx-auto text-center">
 <div className="flex items-center justify-center gap-3 mb-6">
 <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
 <Cpu className="w-7 h-7 text-white" />
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
 { "@type": "HowToStep", "name": "Begrijp Ranking Factoren", "text": "Leer de drie pilaren: relevantie, kwaliteit, engagement" },
 { "@type": "HowToStep", "name": "Optimaliseer Voor Keywords", "text": "Strategische keyword plaatsing voor maximale relevantie" },
 { "@type": "HowToStep", "name": "Boost Quality Signals", "text": "Verhoog ratings, completion rate en earnings" },
 { "@type": "HowToStep", "name": "Maximize Engagement", "text": "Blijf actief, reageer snel, accepteer de juiste projecten" },
 { "@type": "HowToStep", "name": "Platform-Specific Tactics", "text": "Gebruik unieke features van elk platform" }
 ]
 })
 }} />

 <article className="container mx-auto px-4 py-16">
 <div className="max-w-4xl mx-auto">
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">{content.intro.title}</h2>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{content.intro.text}</p>
 </div>

 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">{content.section1.title}</h2>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">{content.section1.intro}</p>

 <div className="mb-10">
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
 <Target className="w-7 h-7 text-primary" />
 {content.section1.fundamentals.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{content.section1.fundamentals.text}</p>

 <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 border border-primary/20">
 <h4 className="font-bold text-gray-900 dark:text-white mb-3">{content.section1.fundamentals.pillars}</h4>
 <ul className="space-y-3">
 {content.section1.fundamentals.list.map((item, index) =>(
 <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <span><strong className="text-gray-900 dark:text-white">{item.split(':')[0]}:</strong>{item.split(':').slice(1).join(':')}</span>
 </li>
 ))}
 </ul>
 </div>
 </div>
 </div>

 <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white">
 <div className="max-w-3xl mx-auto text-center">
 <TrendingUp className="w-16 h-16 text-white mx-auto mb-6" />
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
 <Cpu className="w-16 h-16 text-white mx-auto mb-6" />
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
 <Link href={`/${locale}/gids/best-practices/winnende-voorstellen-schrijven`} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group">
 <Target className="w-10 h-10 text-accent mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{content.related.proposals.title}</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">{content.related.proposals.text}</p>
 </Link>
 <Link href={`/${locale}/gids/best-practices/portfolio-dat-converteert`} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group">
 <BarChart className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{content.related.portfolio.title}</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">{content.related.portfolio.text}</p>
 </Link>
 </div>
 </div>
 </div>
 </article>
 </main>
 <Footer />
 </>
 );
}
