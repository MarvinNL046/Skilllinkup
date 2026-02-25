import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, DollarSign, Users, Shield, Star, Clock, Globe, ArrowRight } from 'lucide-react';

interface PageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata>{
 const { locale } = await params;
 const slug = 'belangrijke-selectiefactoren';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/platform-selectie/${slug}`;

 if (locale === 'nl') {
 return {
 title: 'Belangrijke Selectiefactoren voor Freelance Platforms: Complete Checklist 2026',
 description: 'Leer waar je op moet letten bij het kiezen van een freelance platform. Complete gids met checklist voor commissie, opdrachtenkwaliteit, betalingen en meer.',
 keywords: 'freelance platform selectiefactoren, platform kiezen checklist, commissie freelance platforms, betalingen freelance, platform vergelijken',
 openGraph: {
 title: 'Belangrijke Selectiefactoren voor Freelance Platforms',
 description: 'Complete checklist: waar moet je op letten bij het vergelijken van platforms?',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/platform-selectie-og.png`, width: 1200, height: 630, alt: 'Belangrijke Selectiefactoren Freelance Platforms' }],
 locale: 'nl_NL',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Belangrijke Selectiefactoren voor Freelance Platforms',
 description: 'Complete checklist voor het vergelijken van platforms',
 images: [`${siteUrl}/images/og/platform-selectie-og.png`],
 creator: '@SkillLinkup',
 site: '@SkillLinkup',
 },
 alternates: {
 canonical: pageUrl,
 languages: {
 'en': `${siteUrl}/en/guide/platform-selection/${slug}`,
 'nl': pageUrl,
 },
 },
 robots: {
 index: true,
 follow: true,
 googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
 },
 };
 }

 return {
 title: 'Important Selection Factors for Freelance Platforms: Complete Checklist 2026',
 description: 'Learn what to look for when choosing a freelance platform. Complete guide with checklist for commission, project quality, payments, and more.',
 keywords: 'freelance platform selection factors, platform selection checklist, commission freelance platforms, freelance payments, compare platforms',
 openGraph: {
 title: 'Important Selection Factors for Freelance Platforms',
 description: 'Complete checklist: what should you look for when comparing platforms?',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/platform-selectie-og.png`, width: 1200, height: 630, alt: 'Important Selection Factors Freelance Platforms' }],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Important Selection Factors for Freelance Platforms',
 description: 'Complete checklist for comparing platforms',
 images: [`${siteUrl}/images/og/platform-selectie-og.png`],
 creator: '@SkillLinkup',
 site: '@SkillLinkup',
 },
 alternates: {
 canonical: pageUrl,
 languages: {
 'en': pageUrl,
 'nl': `${siteUrl}/nl/gids/platform-selectie/${slug}`,
 },
 },
 robots: {
 index: true,
 follow: true,
 googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
 },
 };
}

export default async function SelectiefactorenPage({ params }: PageProps) {
 const { locale } = await params;
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

 const content = locale === 'nl' ? {
 hero: {
 title: "Belangrijke Factoren bij Platform Selectie",
 intro: "Niet alle freelance platforms zijn gelijk. Leer waar je op moet letten om een geïnformeerde keuze te maken die past bij jouw doelen, vakgebied en werkstijl.",
 cta1: "Vergelijk Platforms",
 cta2: "Download Checklist"
 },
 sections: {
 intro: "Het vergelijken van freelance platforms kan overweldigend zijn. Met deze complete gids leer je de 8 cruciale factoren die je succes bepalen, plus een praktische checklist om platforms objectief te evalueren.",
 factor1: "1. Commissiestructuur en Kosten",
 factor1Intro: "Commissie is vaak de eerste factor die freelancers bekijken, maar het is niet de enige kostenpost.",
 factor1Content1: "Platforms rekenen commissie van 0% tot 20% of meer. Upwork neemt 10-20% afhankelijk van je lifetime earnings per klant. Fiverr rekent standaard 20% op elke transactie. Toptal en sommige andere elite platforms rekenen geen commissie aan freelancers maar een vetted entry fee.",
 factor1Content2: "Maar commissie is niet de enige cost. Kijk ook naar: Connects/bids kosten (Upwork), membership fees voor premium features, withdrawal/transfer fees, currency conversion kosten, en subscription costs voor verhoogde zichtbaarheid.",
 factor2: "2. Kwaliteit en Kwantiteit van Opdrachten",
 factor2Intro: "Veel opdrachten betekent niet automatisch goede opdrachten. Kwaliteit wint van kwantiteit.",
 factor2Content1: "Evalueer: Gemiddelde projectwaarde (€100 vs €5.000 projecten), serieuze vs spammy job postings, ratio van nieuwe vs repeat clients, en projectcomplexiteit (match met jouw skills).",
 factor2Content2: "Red flags: Te veel 'test projects' voor €10, vage project descriptions zonder budget, clients met 0 reviews en hoge hiring rate, opdrachten die vragen om 'samples' zonder betaling.",
 factor3: "3. Betalingszekerheid en -snelheid",
 factor3Intro: "Op tijd betaald worden is cruciaal voor je cash flow. Platforms verschillen enorm in betalingssystemen.",
 factor3Content1: "Beveiligde betalingen via escrow (geld wordt vastgehouden tot levering), dispute resolution systemen, payment protection voor frauduleuze klanten, en withdrawal opties (PayPal, banktransfer, Payoneer).",
 factor3Content2: "Let op withdrawal times: Sommige platforms betalen binnen 24 uur, andere kunnen 14+ dagen duren. Check ook minimum withdrawal bedragen en transfer fees per methode.",
 factor4: "4. Doelgroep en Geografische Focus",
 factor4Intro: "Sommige platforms focussen op specifieke markten, andere zijn wereldwijd. Dit beïnvloedt je competitie en tarieven.",
 factor4Content1: "Lokale platforms (Freelance.nl, Werkspot) geven toegang tot Nederlandse/Belgische klanten met vaak hogere budgetten en minder internationale competitie. Wereldwijde platforms (Upwork, Fiverr) betekenen meer kansen maar ook meer competitie met lagelonenlanden.",
 factor4Content2: "Overweeg ook tijdzones: Als je met US klanten wilt werken, zijn platforms met sterke US presence (Upwork, Toptal) ideaal. Voor Europese klanten kijk naar platforms met EU-focus.",
 factor5: "5. Niche en Specialisatie Match",
 factor5Intro: "Generalist platforms vs niche platforms—beide hebben voor- en nadelen afhankelijk van jouw profiel.",
 factor5Content1: "Niche platforms (99designs voor designers, Toptal voor developers, Scripted voor writers) trekken klanten die specifiek jouw expertise zoeken. Dit betekent hogere tarieven, minder tijdverspilling, en klanten die waarde begrijpen.",
 factor5Content2: "Generalist platforms (Upwork, Freelancer) bieden diversiteit en volume. Goed als je meerdere skills aanbiedt of nog experimenteert met wat het beste werkt.",
 factor6: "6. Platform Reputatie en Review Systemen",
 factor6Intro: "Het review systeem kan je carrière maken of breken. Begrijp hoe elk platform ratings beheert.",
 factor6Content1: "Kan je reviews beantwoorden? Kunnen klanten reviews aanpassen na publicatie? Hoe zwaar weegt een enkele slechte review? Is er een minimum aantal reviews voordat je zichtbaar wordt?",
 factor6Content2: "Sommige platforms zoals Upwork tonen je Job Success Score prominent. Eén slechte ervaring kan je score voor maanden beïnvloeden. Andere platforms zijn minder streng met review-impact.",
 factor7: "7. Platform Tools en Features",
 factor7Intro: "De tools die een platform biedt kunnen je workflow significant verbeteren of bemoeilijken.",
 factor7Content1: "Essentiële features: Time tracking tools (automatische screenshots vs simpele timers), messaging systeem (in-platform chat vs externe communicatie), file sharing capabilities, contract/proposal templates, mobile app kwaliteit.",
 factor7Content2: "Nice-to-have features: Video call integratie, portfolio showcasing opties, skill tests/badges voor credibility, analytics/earnings dashboard, en CRM functies voor client relationship management.",
 factor8: "8. Client Kwaliteit en Vetting",
 factor8Intro: "Niet alle platforms screenen klanten even streng. Dit beïnvloedt je ervaring enorm.",
 factor8Content1: "Platforms zoals Toptal en Gun.io vetten zowel freelancers als klanten. Dit betekent serieuze budgetten en professionele communicatie. Platforms zonder client vetting hebben vaak 'tire kickers' en lowballers.",
 factor8Content2: "Check of het platform verified payment methods vereist van klanten, reviews van klanten toont (net zoals freelancers), en scam/fraud protection biedt tegen onbetrouwbare opdrachtgevers.",
 checklistTitle: "Platform Vergelijking Checklist",
 checklistIntro: "Gebruik deze checklist om platforms te scoren van 1-5 per criterium:",
 redFlagsTitle: "Red Flags: Wanneer een Platform Vermijden",
 redFlag1: "Geen Escrow of Payment Protection",
 redFlag1Desc: "Als een platform geen geld beschermt tot je geleverd hebt, loop je enorm risico op non-payment.",
 redFlag2: "Onduidelijke Commissiestructuur",
 redFlag2Desc: "Als je niet kunt vinden hoeveel commissie je betaalt, zijn er waarschijnlijk verborgen kosten.",
 redFlag3: "Overweldigend Negatieve Reviews",
 redFlag3Desc: "Google '[platform naam] reviews' en let op patronen in klachten van freelancers.",
 redFlag4: "Geen Dispute Resolution",
 redFlag4Desc: "Zonder arbitration of mediation ben je op jezelf aangewezen bij problemen met klanten.",
 priorityTitle: "Prioriteiten Bepalen: Wat Is Voor Jou Het Belangrijkst?",
 priorityIntro: "Niet elke factor weegt even zwaar voor elke freelancer. Bepaal je persoonlijke prioriteiten:",
 casesTitle: "Case Studies: Hoe Freelancers Platforms Kozen"
 },
 cta: {
 title: "Klaar om Platforms te Vergelijken?",
 description: "Gebruik onze interactieve platform vergelijker om je ideale match te vinden op basis van deze selectiefactoren. Of doe de quiz voor een gepersonaliseerde aanbeveling.",
 compareBtn: "Vergelijk Alle Platforms",
 quizBtn: "Doe de Platform Quiz"
 },
 related: {
 title: "Gerelateerde Gidsen",
 beste: "Beste Platform Kiezen",
 besteDesc: "Stap-voor-stap gids voor het vinden van jouw ideale platform",
 beginnerExpert: "Beginner vs Expert Platforms",
 beginnerExpertDesc: "Welke platforms passen bij jouw ervaringsniveau?",
 meerdere: "Meerdere Platforms Gebruiken",
 meerdereDesc: "Wanneer heeft het zin om op meerdere platforms actief te zijn?"
 }
 } : {
 hero: {
 title: "Important Factors in Platform Selection",
 intro: "Not all freelance platforms are equal. Learn what to look for to make an informed choice that matches your goals, expertise, and working style.",
 cta1: "Compare Platforms",
 cta2: "Download Checklist"
 },
 sections: {
 intro: "Comparing freelance platforms can be overwhelming. With this complete guide, you'll learn the 8 crucial factors that determine your success, plus a practical checklist to objectively evaluate platforms.",
 factor1: "1. Commission Structure and Costs",
 factor1Intro: "Commission is often the first factor freelancers look at, but it's not the only cost.",
 factor1Content1: "Platforms charge commission from 0% to 20% or more. Upwork takes 10-20% depending on your lifetime earnings per client. Fiverr charges a standard 20% on every transaction. Toptal and some other elite platforms charge no commission to freelancers but have a vetted entry fee.",
 factor1Content2: "But commission isn't the only cost. Also consider: Connects/bids costs (Upwork), membership fees for premium features, withdrawal/transfer fees, currency conversion costs, and subscription costs for increased visibility.",
 factor2: "2. Quality and Quantity of Projects",
 factor2Intro: "Many projects doesn't automatically mean good projects. Quality wins over quantity.",
 factor2Content1: "Evaluate: Average project value (€100 vs €5,000 projects), serious vs spammy job postings, ratio of new vs repeat clients, and project complexity (match with your skills).",
 factor2Content2: "Red flags: Too many 'test projects' for €10, vague project descriptions without budget, clients with 0 reviews and high hiring rate, projects asking for 'samples' without payment.",
 factor3: "3. Payment Security and Speed",
 factor3Intro: "Getting paid on time is crucial for your cash flow. Platforms differ enormously in payment systems.",
 factor3Content1: "Secure payments via escrow (money is held until delivery), dispute resolution systems, payment protection against fraudulent clients, and withdrawal options (PayPal, bank transfer, Payoneer).",
 factor3Content2: "Note withdrawal times: Some platforms pay within 24 hours, others can take 14+ days. Also check minimum withdrawal amounts and transfer fees per method.",
 factor4: "4. Target Audience and Geographic Focus",
 factor4Intro: "Some platforms focus on specific markets, others are worldwide. This affects your competition and rates.",
 factor4Content1: "Local platforms (Freelance.nl, Werkspot) provide access to Dutch/Belgian clients with often higher budgets and less international competition. Worldwide platforms (Upwork, Fiverr) mean more opportunities but also more competition with low-wage countries.",
 factor4Content2: "Also consider time zones: If you want to work with US clients, platforms with strong US presence (Upwork, Toptal) are ideal. For European clients look for platforms with EU focus.",
 factor5: "5. Niche and Specialization Match",
 factor5Intro: "Generalist platforms vs niche platforms—both have pros and cons depending on your profile.",
 factor5Content1: "Niche platforms (99designs for designers, Toptal for developers, Scripted for writers) attract clients specifically seeking your expertise. This means higher rates, less time wasted, and clients who understand value.",
 factor5Content2: "Generalist platforms (Upwork, Freelancer) offer diversity and volume. Good if you offer multiple skills or are still experimenting with what works best.",
 factor6: "6. Platform Reputation and Review Systems",
 factor6Intro: "The review system can make or break your career. Understand how each platform manages ratings.",
 factor6Content1: "Can you respond to reviews? Can clients modify reviews after publication? How heavily does a single bad review weigh? Is there a minimum number of reviews before you become visible?",
 factor6Content2: "Some platforms like Upwork show your Job Success Score prominently. One bad experience can affect your score for months. Other platforms are less strict with review impact.",
 factor7: "7. Platform Tools and Features",
 factor7Intro: "The tools a platform provides can significantly improve or hinder your workflow.",
 factor7Content1: "Essential features: Time tracking tools (automatic screenshots vs simple timers), messaging system (in-platform chat vs external communication), file sharing capabilities, contract/proposal templates, mobile app quality.",
 factor7Content2: "Nice-to-have features: Video call integration, portfolio showcasing options, skill tests/badges for credibility, analytics/earnings dashboard, and CRM functions for client relationship management.",
 factor8: "8. Client Quality and Vetting",
 factor8Intro: "Not all platforms screen clients equally strictly. This affects your experience enormously.",
 factor8Content1: "Platforms like Toptal and Gun.io vet both freelancers and clients. This means serious budgets and professional communication. Platforms without client vetting often have 'tire kickers' and lowballers.",
 factor8Content2: "Check if the platform requires verified payment methods from clients, shows reviews of clients (just like freelancers), and offers scam/fraud protection against unreliable clients.",
 checklistTitle: "Platform Comparison Checklist",
 checklistIntro: "Use this checklist to score platforms from 1-5 per criterion:",
 redFlagsTitle: "Red Flags: When to Avoid a Platform",
 redFlag1: "No Escrow or Payment Protection",
 redFlag1Desc: "If a platform doesn't protect money until you've delivered, you run huge risk of non-payment.",
 redFlag2: "Unclear Commission Structure",
 redFlag2Desc: "If you can't find how much commission you pay, there are probably hidden costs.",
 redFlag3: "Overwhelmingly Negative Reviews",
 redFlag3Desc: "Google '[platform name] reviews' and look for patterns in freelancer complaints.",
 redFlag4: "No Dispute Resolution",
 redFlag4Desc: "Without arbitration or mediation you're on your own with client problems.",
 priorityTitle: "Determining Priorities: What's Most Important to You?",
 priorityIntro: "Not every factor weighs equally for every freelancer. Determine your personal priorities:",
 casesTitle: "Case Studies: How Freelancers Chose Platforms"
 },
 cta: {
 title: "Ready to Compare Platforms?",
 description: "Use our interactive platform comparer to find your ideal match based on these selection factors. Or take the quiz for a personalized recommendation.",
 compareBtn: "Compare All Platforms",
 quizBtn: "Take Platform Quiz"
 },
 related: {
 title: "Related Guides",
 beste: "Choose Best Platform",
 besteDesc: "Step-by-step guide for finding your ideal platform",
 beginnerExpert: "Beginner vs Expert Platforms",
 beginnerExpertDesc: "Which platforms match your experience level?",
 meerdere: "Using Multiple Platforms",
 meerdereDesc: "When does it make sense to be active on multiple platforms?"
 }
 };

 const articleSchema = {
 '@context': 'https://schema.org',
 '@type': 'Article',
 headline: locale === 'nl' ? 'Belangrijke Selectiefactoren voor Freelance Platforms' : 'Important Selection Factors for Freelance Platforms',
 description: locale === 'nl' ? 'Complete checklist voor het vergelijken van freelance platforms.' : 'Complete checklist for comparing freelance platforms.',
 author: { '@type': 'Organization', name: 'SkillLinkup' },
 publisher: { '@type': 'Organization', name: 'SkillLinkup', logo: { '@type': 'ImageObject', url: `${siteUrl}/images/logo/skilllinkup-transparant-rozepunt.webp` }},
 datePublished: '2026-01-15',
 dateModified: '2026-01-15',
 };

 const breadcrumbSchema = {
 '@context': 'https://schema.org',
 '@type': 'BreadcrumbList',
 itemListElement: [
 { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
 { '@type': 'ListItem', position: 2, name: locale === 'nl' ? 'Gids' : 'Guide', item: `${siteUrl}/${locale}/gids` },
 { '@type': 'ListItem', position: 3, name: locale === 'nl' ? 'Platform Selectie' : 'Platform Selection', item: `${siteUrl}/${locale}/gids/platform-selectie` },
 { '@type': 'ListItem', position: 4, name: locale === 'nl' ? 'Selectiefactoren' : 'Selection Factors' },
 ],
 };

 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

 
 <main className="flex-1 bg-gray-50 dark:bg-gray-900">
 {/* Hero Section */}
 <section className="bg-gradient-to-br from-primary via-primary-dark to-secondary dark:from-secondary dark:via-primary-dark dark:to-primary py-16 sm:py-24">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
 <CheckCircle className="w-8 h-8 text-white" />
 </div>
 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-heading">
 {content.hero.title}
 </h1>
 <p className="text-xl text-white/90 mb-8 leading-relaxed">
 {content.hero.intro}
 </p>
 <div className="flex flex-wrap gap-4 justify-center">
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold font-heading hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
 >
 <Star className="w-5 h-5" />
 {content.hero.cta1}
 </Link>
 <Link
 href={`/${locale}/gids/platform-selectie/platform-selectie-quiz`}
 className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-xl font-semibold font-heading hover:bg-accent-dark transition-all shadow-lg hover:shadow-xl"
 >
 <CheckCircle className="w-5 h-5" />
 {content.hero.cta2}
 </Link>
 </div>
 </div>
 </div>
 </section>

 {/* Article Content */}
 <article className="py-16">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-primary dark:border-accent pl-6 py-2 mb-12">
 {content.sections.intro}
 </p>

 {/* 8 Factors */}
 {[
 { title: content.sections.factor1, intro: content.sections.factor1Intro, content1: content.sections.factor1Content1, content2: content.sections.factor1Content2, icon: DollarSign },
 { title: content.sections.factor2, intro: content.sections.factor2Intro, content1: content.sections.factor2Content1, content2: content.sections.factor2Content2, icon: Star },
 { title: content.sections.factor3, intro: content.sections.factor3Intro, content1: content.sections.factor3Content1, content2: content.sections.factor3Content2, icon: Shield },
 { title: content.sections.factor4, intro: content.sections.factor4Intro, content1: content.sections.factor4Content1, content2: content.sections.factor4Content2, icon: Globe },
 { title: content.sections.factor5, intro: content.sections.factor5Intro, content1: content.sections.factor5Content1, content2: content.sections.factor5Content2, icon: Star },
 { title: content.sections.factor6, intro: content.sections.factor6Intro, content1: content.sections.factor6Content1, content2: content.sections.factor6Content2, icon: Users },
 { title: content.sections.factor7, intro: content.sections.factor7Intro, content1: content.sections.factor7Content1, content2: content.sections.factor7Content2, icon: CheckCircle },
 { title: content.sections.factor8, intro: content.sections.factor8Intro, content1: content.sections.factor8Content1, content2: content.sections.factor8Content2, icon: Shield },
 ].map((factor, index) =>(
 <div key={index} className="mb-12">
 <div className="flex items-center gap-4 mb-4">
 <div className="w-12 h-12 bg-primary/10 dark:bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
 <factor.icon className="w-6 h-6 text-primary dark:text-accent" />
 </div>
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-heading m-0">{factor.title}</h2>
 </div>
 <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">{factor.intro}</p>
 <p className="text-gray-700 dark:text-gray-300 mb-4">{factor.content1}</p>
 <div className="bg-gradient-to-r from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-lg p-6 border-l-4 border-primary dark:border-accent">
 <p className="text-gray-700 dark:text-gray-300 m-0">{factor.content2}</p>
 </div>
 </div>
 ))}

 {/* Red Flags */}
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-16 mb-8 font-heading">
 {content.sections.redFlagsTitle}
 </h2>
 <div className="space-y-4 mb-12">
 {[
 { title: content.sections.redFlag1, desc: content.sections.redFlag1Desc },
 { title: content.sections.redFlag2, desc: content.sections.redFlag2Desc },
 { title: content.sections.redFlag3, desc: content.sections.redFlag3Desc },
 { title: content.sections.redFlag4, desc: content.sections.redFlag4Desc },
 ].map((flag, index) =>(
 <div key={index} className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 rounded-lg p-6">
 <h3 className="text-lg font-bold text-red-900 dark:text-red-300 mb-2 font-heading">{flag.title}</h3>
 <p className="text-red-800 dark:text-red-200">{flag.desc}</p>
 </div>
 ))}
 </div>
 </div>

 {/* CTA Section */}
 <div className="bg-gradient-to-br from-primary via-primary-dark to-secondary dark:from-secondary dark:via-primary-dark dark:to-primary rounded-2xl p-8 md:p-12 text-center mt-16 shadow-2xl">
 <h2 className="text-3xl font-bold text-white mb-4 font-heading">
 {content.cta.title}
 </h2>
 <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
 {content.cta.description}
 </p>
 <div className="flex flex-wrap gap-4 justify-center">
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-bold font-heading hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
 >
 <Star className="w-5 h-5" />
 {content.cta.compareBtn}
 </Link>
 <Link
 href={`/${locale}/gids/platform-selectie/platform-selectie-quiz`}
 className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-xl font-bold font-heading hover:bg-accent-dark transition-all shadow-lg hover:shadow-xl"
 >
 <CheckCircle className="w-5 h-5" />
 {content.cta.quizBtn}
 </Link>
 </div>
 </div>

 {/* Related Articles */}
 <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
 {content.related.title}
 </h2>
 <div className="grid md:grid-cols-3 gap-6">
 <Link href={`/${locale}/gids/platform-selectie/beste-freelance-platform-kiezen`} className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-all">
 <Star className="w-8 h-8 text-primary dark:text-accent mb-3" />
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-accent font-heading">{content.related.beste}</h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{content.related.besteDesc}</p>
 <div className="flex items-center text-primary dark:text-accent text-sm font-semibold">{locale === 'nl' ? 'Lees meer' : 'Read more'} <ArrowRight className="w-4 h-4 ml-1" /></div>
 </Link>
 <Link href={`/${locale}/gids/platform-selectie/beginner-vs-expert-platforms`} className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-all">
 <Users className="w-8 h-8 text-primary dark:text-accent mb-3" />
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-accent font-heading">{content.related.beginnerExpert}</h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{content.related.beginnerExpertDesc}</p>
 <div className="flex items-center text-primary dark:text-accent text-sm font-semibold">{locale === 'nl' ? 'Lees meer' : 'Read more'} <ArrowRight className="w-4 h-4 ml-1" /></div>
 </Link>
 <Link href={`/${locale}/gids/platform-selectie/meerdere-platforms-gebruiken`} className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-all">
 <Clock className="w-8 h-8 text-primary dark:text-accent mb-3" />
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-accent font-heading">{content.related.meerdere}</h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{content.related.meerdereDesc}</p>
 <div className="flex items-center text-primary dark:text-accent text-sm font-semibold">{locale === 'nl' ? 'Lees meer' : 'Read more'} <ArrowRight className="w-4 h-4 ml-1" /></div>
 </Link>
 </div>
 </div>
 </div>
 </div>
 </article>
 </main>
 
 </>
 );
}
