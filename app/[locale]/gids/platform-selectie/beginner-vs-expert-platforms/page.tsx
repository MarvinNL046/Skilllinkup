import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { GraduationCap, Trophy, TrendingUp, Award, Star, Zap, Shield, ArrowRight } from 'lucide-react';

interface PageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata>{
 const { locale } = await params;
 const slug = 'beginner-vs-expert-platforms';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/platform-selectie/${slug}`;

 if (locale === 'nl') {
 return {
 title: 'Beginner vs Expert Freelance Platforms: Welke Past Bij Jouw Niveau? 2026',
 description: 'Ontdek welke freelance platforms perfect zijn voor beginners en welke voor ervaren professionals. Complete vergelijking met platform aanbevelingen per niveau.',
 keywords: 'freelance platform beginners, expert freelance platforms, freelance platforms voor beginners, ervaren freelancer platforms, toptal vs upwork',
 openGraph: {
 title: 'Beginner vs Expert Freelance Platforms: Welke Past Bij Jouw Niveau?',
 description: 'Complete vergelijking: welke platforms zijn ideaal voor beginners en welke voor experts?',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/platform-selectie-og.png`, width: 1200, height: 630, alt: 'Beginner vs Expert Freelance Platforms' }],
 locale: 'nl_NL',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Beginner vs Expert Freelance Platforms',
 description: 'Welke platforms passen bij jouw ervaringsniveau?',
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
 title: 'Beginner vs Expert Freelance Platforms: Which Fits Your Level? 2026',
 description: 'Discover which freelance platforms are perfect for beginners and which for experienced professionals. Complete comparison with platform recommendations per level.',
 keywords: 'freelance platform beginners, expert freelance platforms, freelance platforms for beginners, experienced freelancer platforms, toptal vs upwork',
 openGraph: {
 title: 'Beginner vs Expert Freelance Platforms: Which Fits Your Level?',
 description: 'Complete comparison: which platforms are ideal for beginners and which for experts?',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/platform-selectie-og.png`, width: 1200, height: 630, alt: 'Beginner vs Expert Freelance Platforms' }],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Beginner vs Expert Freelance Platforms',
 description: 'Which platforms match your experience level?',
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

export default async function BeginnerVsExpertPage({ params }: PageProps) {
 const { locale } = await params;
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

 const content = locale === 'nl' ? {
 hero: {
 title: "Beginner vs Expert Platforms: Vind Jouw Match",
 intro: "Niet elk freelance platform is geschikt voor elk ervaringsniveau. Ontdek welke platforms perfect zijn voor starters en welke platforms de beste kansen bieden voor ervaren professionals.",
 cta1: "Bekijk Beginner Platforms",
 cta2: "Bekijk Expert Platforms"
 },
 sections: {
 intro: "Je ervaringsniveau bepaalt grotendeels welk freelance platform het beste voor jou werkt. Beginners hebben behoefte aan platforms met lage drempels en goede leeromgevingen. Experts zoeken premium klanten, hogere tarieven, en minder competitie. In deze gids vergelijken we beide werelden.",
 whyTitle: "Waarom Ervaringsniveau Belangrijk Is bij Platform Keuze",
 whyContent: "Een beginnende grafisch ontwerper die zich aanmeldt bij Toptal wordt direct afgewezen—het platform accepteert alleen de top 3% wereldwijd. Tegelijkertijd verliest een ervaren developer met 10 jaar ervaring op Fiverr tegen beginners die $5 per uur vragen. Het juiste platform matchen met jouw niveau voorkomt frustratie en verhoogt je succeskansen dramatisch.",
 statsTitle: "De Getallen Spreken",
 stat1: "78% van beginners vindt eerste opdracht binnen 30 dagen op beginner-vriendelijke platforms",
 stat2: "Expert platforms betalen gemiddeld 3-5x hogere tarieven dan algemene marktplaatsen",
 stat3: "Acceptance rate van elite platforms ligt tussen 1-5% van alle aanmeldingen",
 beginnerTitle: "Beginner-Vriendelijke Platforms: Jouw Startpunt",
 beginnerIntro: "Als je net start, zijn dit de beste platforms om ervaring op te bouwen:",
 beginnerCharacteristics: "Kenmerken van Beginner Platforms",
 char1Title: "Lage Toetredingsdrempel",
 char1Desc: "Geen uitgebreide screening, geen portfolio vereist, makkelijke approval binnen 24-48 uur.",
 char2Title: "Educatieve Resources",
 char2Desc: "Tutorials, webinars, community forums, en support om je te helpen starten.",
 char3Title: "Volume over Waarde",
 char3Desc: "Veel kleine opdrachten beschikbaar, perfect om portfolio en reviews op te bouwen.",
 char4Title: "Beschermende Systemen",
 char4Desc: "Escrow payments, dispute resolution, en rating systemen die beide partijen beschermen.",
 topBeginnerTitle: "Top 5 Beginner Platforms",
 fiverr: "Fiverr",
 fiverrDesc: "Perfect voor beginners: creëer gigs, stel je eigen prijzen, bouw reviews op. Start laag ($5-20) en verhoog naarmate je reputatie groeit.",
 upwork: "Upwork",
 upworkDesc: "Enorme opdrachtpool, alle niveaus welkom. Gebruik connects strategisch, focus op kleinere projecten eerst.",
 freelancer: "Freelancer.com",
 freelancerDesc: "Competitieve marktplaats met veel entry-level opdrachten. Deel je profiel gratis, bid op projecten.",
 peopleperhour: "PeoplePerHour",
 peopleperhourDesc: "UK-georiënteerd platform met goede beginner support. Hourlie systeem helpt gestandaardiseerde diensten verkopen.",
 guru: "Guru",
 guruDesc: "Stabiel platform met SafePay systeem. Goede balans tussen beginner-toegankelijkheid en serieuze klanten.",
 beginnerStrategyTitle: "Successtrategie voor Beginners",
 strategy1: "Start met 2-3 Platforms",
 strategy1Desc: "Probeer niet alle platforms tegelijk. Focus je energie op 2-3 beginner-vriendelijke platforms en bouw daar je reputatie op.",
 strategy2: "Begin Onder Marktprijs",
 strategy2Desc: "Je eerste 5-10 opdrachten mogen onder tarief—je koopt reviews en portfolio items. Verhoog prijzen zodra je 5-star rating hebt.",
 strategy3: "Over-Deliver op Eerste Opdrachten",
 strategy3Desc: "Elke opdracht is een kans op een review. Lever meer dan verwacht, wees professioneel, vraag om feedback.",
 strategy4: "Bouw Specialisatie Op",
 strategy4Desc: "Word expert in een niche (bijv. 'WordPress landing pages' ipv 'webdesign'). Niche-experts winnen van generalisten.",
 expertTitle: "Expert Platforms: Voor Ervaren Professionals",
 expertIntro: "Als je 3+ jaar ervaring hebt en een sterk portfolio, zijn deze platforms de moeite waard:",
 expertCharacteristics: "Kenmerken van Expert Platforms",
 expertChar1Title: "Strenge Screening",
 expertChar1Desc: "Portfolio review, skills tests, interviews—soms meerdere rondes voordat je geaccepteerd wordt.",
 expertChar2Title: "Premium Klanten",
 expertChar2Desc: "Enterprise bedrijven, VC-backed startups, en klanten met budgetten van $50-200+ per uur.",
 expertChar3Title: "Exclusiviteit",
 expertChar3Desc: "Lagere freelancer density betekent minder competitie en hogere winkansen per proposal.",
 expertChar4Title: "Platform Matching",
 expertChar4Desc: "Het platform matched jou actief met klanten, je hoeft niet constant te zoeken of bidden.",
 topExpertTitle: "Top 5 Expert Platforms",
 toptal: "Toptal",
 toptalDesc: "Top 3% wereldwijd. Streng screeningproces maar premium rates ($100-200+/uur). Perfect voor developers, designers, finance experts.",
 gunio: "Gun.io",
 gunioDesc: "Vetted developer network. 0% commissie maar strenge acceptance. Enterprise klanten met lange-termijn projecten.",
 catalant: "Catalant",
 catalantDesc: "Consultant platform voor strategy, operations, finance. Fortune 500 klanten, project-based, premium compensation.",
 cloudfpeeps: "CloudPeeps",
 cloudpeepsDesc: "Marketing en content professionals. Vetted community, direct client matching, hogere tarieven dan algemene platforms.",
 gigster: "Gigster",
 gigsterDesc: "Software development projecten met managed teams. Premium rates, enterprise klanten, stabiele lange-termijn werk.",
 expertStrategyTitle: "Successtrategie voor Experts",
 expertStrategy1: "Investeer in Application Process",
 expertStrategy1Desc: "Neem de tijd voor je aanmelding. Portfolio kwaliteit is belangrijker dan kwantiteit—10 sterke projecten >50 middelmatige.",
 expertStrategy2: "Specialiseer Diep",
 expertStrategy2Desc: "Expert platforms zoeken niet generalisten maar deep specialists (bijv. 'React Native + Firebase' of 'B2B SaaS content marketing').",
 expertStrategy3: "Verwijs naar Resultaten",
 expertStrategy3Desc: "Klanten betalen voor outcomes, niet uren. Showcase ROI: 'verhoogde conversie met 40%' of 'besparde 20u/week met automation'.",
 expertStrategy4: "Netwerk Strategisch",
 expertStrategy4Desc: "Veel expert platforms hebben private communities. Wees actief, help anderen, krijg referrals van andere experts.",
 transitionTitle: "Van Beginner naar Expert Platform: De Transitie",
 transitionIntro: "Wanneer ben je klaar voor de stap naar expert platforms?",
 readySign1: "Portfolio van 15+ Succesvolle Projecten",
 readySign1Desc: "Je hebt bewezen track record met tevreden klanten en meetbare resultaten.",
 readySign2: "Consistente 5-Star Ratings",
 readySign2Desc: "Je rating op beginner platforms is 4.8+ met minstens 20 reviews.",
 readySign3: "Specialisatie Ontwikkeld",
 readySign3Desc: "Je bent niet meer generalist maar erkend expert in een specifiek vakgebied.",
 readySign4: "Premium Tarieven op Huidige Platform",
 readySign4Desc: "Je vraagt al $50-100+/uur en klanten betalen het zonder discussie.",
 readySign5: "Vraag Overtreft Tijd",
 readySign5Desc: "Je moet werk afslaan omdat je agenda vol zit—tijd om kwaliteit boven kwantiteit te kiezen.",
 hybridTitle: "Hybride Strategie: Het Beste van Beide Werelden",
 hybridIntro: "Veel succesvolle freelancers gebruiken beide platform types strategisch:",
 hybridContent: "Houd een beginner platform voor quick cash flow en volume, terwijl je tegelijkertijd op een expert platform grotere, winstgevende projecten binnenhaalt. Dit geeft financiële stabiliteit (veel kleine opdrachten) én groeikansen (premium projecten).",
 mistakesTitle: "Veelgemaakte Fouten bij Niveau-Matching",
 mistake1: "Te Vroeg naar Expert Platforms",
 mistake1Desc: "Rejection van Toptal kan demotiverend zijn. Bouw eerst je portfolio en skills op voordat je expert platforms probeert.",
 mistake2: "Te Lang op Beginner Platforms Blijven",
 mistake2Desc: "Als je al jaren ervaring hebt maar nog steeds op Fiverr $25 diensten verkoopt, laat je geld liggen.",
 mistake3: "Platform Reputatie Verwaarlozen",
 mistake3Desc: "Je ratings en reviews zijn je online CV. Een slechte review kan maanden werk kosten om te herstellen.",
 },
 cta: {
 title: "Klaar om Het Juiste Platform voor Jouw Niveau te Vinden?",
 description: "Vergelijk alle freelance platforms op basis van ervaringsniveau, vakgebied en tarieven. Of doe onze quiz om je perfecte match te ontdekken.",
 compareBtn: "Vergelijk Alle Platforms",
 quizBtn: "Doe de Platform Quiz"
 },
 related: {
 title: "Gerelateerde Gidsen",
 selectie: "Beste Platform Kiezen",
 selectieDesc: "Complete gids voor het vinden van jouw ideale freelance platform",
 factoren: "Belangrijke Selectiefactoren",
 factorenDesc: "Waar moet je op letten bij het vergelijken van platforms?",
 meerdere: "Meerdere Platforms Gebruiken",
 meerdereDesc: "Wanneer is het slim om actief te zijn op meerdere platforms?"
 }
 } : {
 hero: {
 title: "Beginner vs Expert Platforms: Find Your Match",
 intro: "Not every freelance platform suits every experience level. Discover which platforms are perfect for beginners and which offer the best opportunities for experienced professionals.",
 cta1: "View Beginner Platforms",
 cta2: "View Expert Platforms"
 },
 sections: {
 intro: "Your experience level largely determines which freelance platform works best for you. Beginners need platforms with low barriers and good learning environments. Experts seek premium clients, higher rates, and less competition. In this guide, we compare both worlds.",
 whyTitle: "Why Experience Level Matters in Platform Choice",
 whyContent: "A beginning graphic designer who signs up for Toptal gets immediately rejected—the platform only accepts the top 3% worldwide. At the same time, an experienced developer with 10 years of experience on Fiverr loses to beginners charging $5 per hour. Matching the right platform with your level prevents frustration and dramatically increases your chances of success.",
 statsTitle: "The Numbers Speak",
 stat1: "78% of beginners find their first project within 30 days on beginner-friendly platforms",
 stat2: "Expert platforms pay 3-5x higher rates on average than general marketplaces",
 stat3: "Acceptance rate of elite platforms ranges between 1-5% of all applications",
 beginnerTitle: "Beginner-Friendly Platforms: Your Starting Point",
 beginnerIntro: "If you're just starting, these are the best platforms to build experience:",
 beginnerCharacteristics: "Characteristics of Beginner Platforms",
 char1Title: "Low Entry Barrier",
 char1Desc: "No extensive screening, no portfolio required, easy approval within 24-48 hours.",
 char2Title: "Educational Resources",
 char2Desc: "Tutorials, webinars, community forums, and support to help you get started.",
 char3Title: "Volume over Value",
 char3Desc: "Many small projects available, perfect for building portfolio and reviews.",
 char4Title: "Protective Systems",
 char4Desc: "Escrow payments, dispute resolution, and rating systems that protect both parties.",
 topBeginnerTitle: "Top 5 Beginner Platforms",
 fiverr: "Fiverr",
 fiverrDesc: "Perfect for beginners: create gigs, set your own prices, build reviews. Start low ($5-20) and increase as your reputation grows.",
 upwork: "Upwork",
 upworkDesc: "Huge project pool, all levels welcome. Use connects strategically, focus on smaller projects first.",
 freelancer: "Freelancer.com",
 freelancerDesc: "Competitive marketplace with many entry-level projects. Share your profile for free, bid on projects.",
 peopleperhour: "PeoplePerHour",
 peopleperhourDesc: "UK-oriented platform with good beginner support. Hourlie system helps sell standardized services.",
 guru: "Guru",
 guruDesc: "Stable platform with SafePay system. Good balance between beginner accessibility and serious clients.",
 beginnerStrategyTitle: "Success Strategy for Beginners",
 strategy1: "Start with 2-3 Platforms",
 strategy1Desc: "Don't try all platforms at once. Focus your energy on 2-3 beginner-friendly platforms and build your reputation there.",
 strategy2: "Start Below Market Rate",
 strategy2Desc: "Your first 5-10 projects may be below rate—you're buying reviews and portfolio items. Raise prices once you have a 5-star rating.",
 strategy3: "Over-Deliver on First Projects",
 strategy3Desc: "Every project is a chance for a review. Deliver more than expected, be professional, ask for feedback.",
 strategy4: "Build Specialization",
 strategy4Desc: "Become an expert in a niche (e.g., 'WordPress landing pages' instead of 'web design'). Niche experts win over generalists.",
 expertTitle: "Expert Platforms: For Experienced Professionals",
 expertIntro: "If you have 3+ years of experience and a strong portfolio, these platforms are worth it:",
 expertCharacteristics: "Characteristics of Expert Platforms",
 expertChar1Title: "Strict Screening",
 expertChar1Desc: "Portfolio review, skills tests, interviews—sometimes multiple rounds before you're accepted.",
 expertChar2Title: "Premium Clients",
 expertChar2Desc: "Enterprise companies, VC-backed startups, and clients with budgets of $50-200+ per hour.",
 expertChar3Title: "Exclusivity",
 expertChar3Desc: "Lower freelancer density means less competition and higher win rates per proposal.",
 expertChar4Title: "Platform Matching",
 expertChar4Desc: "The platform actively matches you with clients, you don't have to constantly search or bid.",
 topExpertTitle: "Top 5 Expert Platforms",
 toptal: "Toptal",
 toptalDesc: "Top 3% worldwide. Strict screening process but premium rates ($100-200+/hour). Perfect for developers, designers, finance experts.",
 gunio: "Gun.io",
 gunioDesc: "Vetted developer network. 0% commission but strict acceptance. Enterprise clients with long-term projects.",
 catalant: "Catalant",
 catalantDesc: "Consultant platform for strategy, operations, finance. Fortune 500 clients, project-based, premium compensation.",
 cloudfpeeps: "CloudPeeps",
 cloudpeepsDesc: "Marketing and content professionals. Vetted community, direct client matching, higher rates than general platforms.",
 gigster: "Gigster",
 gigsterDesc: "Software development projects with managed teams. Premium rates, enterprise clients, stable long-term work.",
 expertStrategyTitle: "Success Strategy for Experts",
 expertStrategy1: "Invest in Application Process",
 expertStrategy1Desc: "Take time for your application. Portfolio quality is more important than quantity—10 strong projects >50 mediocre ones.",
 expertStrategy2: "Specialize Deeply",
 expertStrategy2Desc: "Expert platforms don't seek generalists but deep specialists (e.g., 'React Native + Firebase' or 'B2B SaaS content marketing').",
 expertStrategy3: "Reference Results",
 expertStrategy3Desc: "Clients pay for outcomes, not hours. Showcase ROI: 'increased conversion by 40%' or 'saved 20h/week with automation'.",
 expertStrategy4: "Network Strategically",
 expertStrategy4Desc: "Many expert platforms have private communities. Be active, help others, get referrals from other experts.",
 transitionTitle: "From Beginner to Expert Platform: The Transition",
 transitionIntro: "When are you ready for the step to expert platforms?",
 readySign1: "Portfolio of 15+ Successful Projects",
 readySign1Desc: "You have a proven track record with satisfied clients and measurable results.",
 readySign2: "Consistent 5-Star Ratings",
 readySign2Desc: "Your rating on beginner platforms is 4.8+ with at least 20 reviews.",
 readySign3: "Specialization Developed",
 readySign3Desc: "You're no longer a generalist but a recognized expert in a specific field.",
 readySign4: "Premium Rates on Current Platform",
 readySign4Desc: "You already charge $50-100+/hour and clients pay it without discussion.",
 readySign5: "Demand Exceeds Time",
 readySign5Desc: "You have to turn down work because your schedule is full—time to choose quality over quantity.",
 hybridTitle: "Hybrid Strategy: Best of Both Worlds",
 hybridIntro: "Many successful freelancers use both platform types strategically:",
 hybridContent: "Keep a beginner platform for quick cash flow and volume, while simultaneously landing larger, profitable projects on an expert platform. This provides financial stability (many small projects) and growth opportunities (premium projects).",
 mistakesTitle: "Common Mistakes in Level Matching",
 mistake1: "Too Early to Expert Platforms",
 mistake1Desc: "Rejection from Toptal can be demotivating. Build your portfolio and skills first before trying expert platforms.",
 mistake2: "Staying Too Long on Beginner Platforms",
 mistake2Desc: "If you already have years of experience but are still selling $25 services on Fiverr, you're leaving money on the table.",
 mistake3: "Neglecting Platform Reputation",
 mistake3Desc: "Your ratings and reviews are your online CV. A bad review can cost months of work to recover from.",
 },
 cta: {
 title: "Ready to Find the Right Platform for Your Level?",
 description: "Compare all freelance platforms based on experience level, expertise, and rates. Or take our quiz to discover your perfect match.",
 compareBtn: "Compare All Platforms",
 quizBtn: "Take Platform Quiz"
 },
 related: {
 title: "Related Guides",
 selectie: "Choose Best Platform",
 selectieDesc: "Complete guide for finding your ideal freelance platform",
 factoren: "Important Selection Factors",
 factorenDesc: "What should you look for when comparing platforms?",
 meerdere: "Using Multiple Platforms",
 meerdereDesc: "When is it smart to be active on multiple platforms?"
 }
 };

 const articleSchema = {
 '@context': 'https://schema.org',
 '@type': 'Article',
 headline: locale === 'nl' ? 'Beginner vs Expert Freelance Platforms: Welke Past Bij Jouw Niveau?' : 'Beginner vs Expert Freelance Platforms: Which Fits Your Level?',
 description: locale === 'nl' ? 'Complete vergelijking van freelance platforms voor beginners en experts.' : 'Complete comparison of freelance platforms for beginners and experts.',
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
 { '@type': 'ListItem', position: 4, name: locale === 'nl' ? 'Beginner vs Expert' : 'Beginner vs Expert' },
 ],
 };

 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

 <Header />
 <main className="flex-1 bg-gray-50 dark:bg-gray-900">
 {/* Hero Section */}
 <section className="bg-gradient-to-br from-primary via-primary-dark to-secondary dark:from-secondary dark:via-primary-dark dark:to-primary py-16 sm:py-24">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
 <TrendingUp className="w-8 h-8 text-white" />
 </div>
 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-heading">
 {content.hero.title}
 </h1>
 <p className="text-xl text-white/90 mb-8 leading-relaxed">
 {content.hero.intro}
 </p>
 <div className="flex flex-wrap gap-4 justify-center">
 <Link
 href={`/${locale}/platforms?level=beginner`}
 className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold font-heading hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
 >
 <GraduationCap className="w-5 h-5" />
 {content.hero.cta1}
 </Link>
 <Link
 href={`/${locale}/platforms?level=expert`}
 className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-xl font-semibold font-heading hover:bg-accent-dark transition-all shadow-lg hover:shadow-xl"
 >
 <Trophy className="w-5 h-5" />
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
 {/* Introduction */}
 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-primary dark:border-accent pl-6 py-2 mb-8">
 {content.sections.intro}
 </p>

 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6 font-heading">
 {content.sections.whyTitle}
 </h2>
 <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
 {content.sections.whyContent}
 </p>

 {/* Stats Grid */}
 <div className="grid md:grid-cols-3 gap-6 mb-12">
 <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border-2 border-accent/30 dark:border-accent/40">
 <div className="text-4xl font-bold text-accent dark:text-accent mb-2 font-heading">78%</div>
 <p className="text-sm text-gray-700 dark:text-gray-300">{content.sections.stat1}</p>
 </div>
 <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border-2 border-primary/30 dark:border-primary/40">
 <div className="text-4xl font-bold text-primary dark:text-primary mb-2 font-heading">3-5x</div>
 <p className="text-sm text-gray-700 dark:text-gray-300">{content.sections.stat2}</p>
 </div>
 <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-xl p-6 border-2 border-secondary/30 dark:border-secondary/40">
 <div className="text-4xl font-bold text-secondary dark:text-primary mb-2 font-heading">1-5%</div>
 <p className="text-sm text-gray-700 dark:text-gray-300">{content.sections.stat3}</p>
 </div>
 </div>

 {/* Beginner Section */}
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-16 mb-6 font-heading flex items-center gap-3">
 <GraduationCap className="w-8 h-8 text-primary dark:text-accent" />
 {content.sections.beginnerTitle}
 </h2>
 <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
 {content.sections.beginnerIntro}
 </p>

 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
 {content.sections.beginnerCharacteristics}
 </h3>
 <div className="grid md:grid-cols-2 gap-6 mb-12">
 {[
 { title: content.sections.char1Title, desc: content.sections.char1Desc, icon: Zap },
 { title: content.sections.char2Title, desc: content.sections.char2Desc, icon: GraduationCap },
 { title: content.sections.char3Title, desc: content.sections.char3Desc, icon: TrendingUp },
 { title: content.sections.char4Title, desc: content.sections.char4Desc, icon: Shield }
 ].map((char, index) =>(
 <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
 <div className="flex items-center gap-3 mb-3">
 <char.icon className="w-6 h-6 text-primary dark:text-accent" />
 <h4 className="text-lg font-bold text-gray-900 dark:text-white font-heading">{char.title}</h4>
 </div>
 <p className="text-gray-700 dark:text-gray-300 text-sm">{char.desc}</p>
 </div>
 ))}
 </div>

 {/* Expert Section */}
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-16 mb-6 font-heading flex items-center gap-3">
 <Trophy className="w-8 h-8 text-primary dark:text-accent" />
 {content.sections.expertTitle}
 </h2>
 <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
 {content.sections.expertIntro}
 </p>

 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
 {content.sections.expertCharacteristics}
 </h3>
 <div className="grid md:grid-cols-2 gap-6 mb-12">
 {[
 { title: content.sections.expertChar1Title, desc: content.sections.expertChar1Desc, icon: Shield },
 { title: content.sections.expertChar2Title, desc: content.sections.expertChar2Desc, icon: Star },
 { title: content.sections.expertChar3Title, desc: content.sections.expertChar3Desc, icon: Award },
 { title: content.sections.expertChar4Title, desc: content.sections.expertChar4Desc, icon: Zap }
 ].map((char, index) =>(
 <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
 <div className="flex items-center gap-3 mb-3">
 <char.icon className="w-6 h-6 text-primary dark:text-accent" />
 <h4 className="text-lg font-bold text-gray-900 dark:text-white font-heading">{char.title}</h4>
 </div>
 <p className="text-gray-700 dark:text-gray-300 text-sm">{char.desc}</p>
 </div>
 ))}
 </div>

 {/* Transition Section */}
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-16 mb-6 font-heading">
 {content.sections.transitionTitle}
 </h2>
 <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
 {content.sections.transitionIntro}
 </p>

 <div className="space-y-4 mb-12">
 {[
 { title: content.sections.readySign1, desc: content.sections.readySign1Desc },
 { title: content.sections.readySign2, desc: content.sections.readySign2Desc },
 { title: content.sections.readySign3, desc: content.sections.readySign3Desc },
 { title: content.sections.readySign4, desc: content.sections.readySign4Desc },
 { title: content.sections.readySign5, desc: content.sections.readySign5Desc }
 ].map((sign, index) =>(
 <div key={index} className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
 <div className="w-8 h-8 bg-accent/10 dark:bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
 <span className="text-accent font-bold font-heading">{index + 1}</span>
 </div>
 <div>
 <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 font-heading">{sign.title}</h4>
 <p className="text-gray-700 dark:text-gray-300 text-sm">{sign.desc}</p>
 </div>
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
 <TrendingUp className="w-5 h-5" />
 {content.cta.compareBtn}
 </Link>
 <Link
 href={`/${locale}/gids/platform-selectie/platform-selectie-quiz`}
 className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-xl font-bold font-heading hover:bg-accent-dark transition-all shadow-lg hover:shadow-xl"
 >
 <Award className="w-5 h-5" />
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
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-accent font-heading">{content.related.selectie}</h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{content.related.selectieDesc}</p>
 <div className="flex items-center text-primary dark:text-accent text-sm font-semibold">{locale === 'nl' ? 'Lees meer' : 'Read more'} <ArrowRight className="w-4 h-4 ml-1" /></div>
 </Link>
 <Link href={`/${locale}/gids/platform-selectie/belangrijke-selectiefactoren`} className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-all">
 <Shield className="w-8 h-8 text-primary dark:text-accent mb-3" />
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-accent font-heading">{content.related.factoren}</h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{content.related.factorenDesc}</p>
 <div className="flex items-center text-primary dark:text-accent text-sm font-semibold">{locale === 'nl' ? 'Lees meer' : 'Read more'} <ArrowRight className="w-4 h-4 ml-1" /></div>
 </Link>
 <Link href={`/${locale}/gids/platform-selectie/meerdere-platforms-gebruiken`} className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-all">
 <TrendingUp className="w-8 h-8 text-primary dark:text-accent mb-3" />
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
 <Footer />
 </>
 );
}
