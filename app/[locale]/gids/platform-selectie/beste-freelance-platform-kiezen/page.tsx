import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Target, Search, CheckCircle, TrendingUp, Users, Star, Award, ArrowRight } from 'lucide-react';

interface PageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata>{
 const { locale } = await params;
 const slug = 'beste-freelance-platform-kiezen';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/platform-selectie/${slug}`;

 if (locale === 'nl') {
 return {
 title: 'Het Beste Freelance Platform Kiezen: Complete Stap-voor-Stap Gids 2026',
 description: 'Vind jouw ideale freelance platform met onze complete gids. Leer hoe je platforms vergelijkt op basis van commissie, opdrachten, en jouw vakgebied.',
 keywords: 'beste freelance platform, freelance platform kiezen, freelance platforms vergelijken, upwork vs fiverr, freelance platform voor beginners',
 openGraph: {
 title: 'Het Beste Freelance Platform Kiezen: Complete Gids',
 description: 'Vind jouw ideale freelance platform met onze stap-voor-stap gids.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/platform-selectie-og.png`, width: 1200, height: 630, alt: 'Het Beste Freelance Platform Kiezen' }],
 locale: 'nl_NL',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Het Beste Freelance Platform Kiezen: Complete Gids',
 description: 'Vind jouw ideale freelance platform met onze stap-voor-stap gids.',
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
 title: 'How to Choose the Best Freelance Platform: Complete Guide 2026',
 description: 'Find your ideal freelance platform with our complete guide. Learn how to compare platforms based on commission, projects, and your expertise.',
 keywords: 'best freelance platform, choose freelance platform, compare freelance platforms, upwork vs fiverr, freelance platform for beginners',
 openGraph: {
 title: 'How to Choose the Best Freelance Platform: Complete Guide',
 description: 'Find your ideal freelance platform with our step-by-step guide.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/platform-selectie-og.png`, width: 1200, height: 630, alt: 'How to Choose the Best Freelance Platform' }],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'How to Choose the Best Freelance Platform: Complete Guide',
 description: 'Find your ideal freelance platform with our step-by-step guide.',
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

export default async function BestePlatformKiezenPage({ params }: PageProps) {
 const { locale } = await params;
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

 const content = locale === 'nl' ? {
 hero: {
 title: "Het Beste Freelance Platform Kiezen voor Jouw Vakgebied",
 intro: "Met honderden freelance platforms beschikbaar, hoe kies je degene die perfect bij jou past? Onze complete gids helpt je de juiste keuze maken op basis van jouw doelen, vaardigheden en werkstijl.",
 cta1: "Vergelijk Platforms",
 cta2: "Doe de Quiz"
 },
 sections: {
 intro: "Het kiezen van het juiste freelance platform kan het verschil maken tussen een bloeiende carrière en eindeloos frustratie. Elk platform heeft zijn eigen voordelen, nadelen, en ideale gebruikers. Deze gids neemt je stap voor stap door het selectieproces.",
 whyTitle: "Waarom Platformkeuze Cruciaal Is voor Je Succes",
 whyContent1: "Je freelance platform is meer dan een plek om opdrachten te vinden—het is de fundering van je hele freelance business. Het juiste platform geeft je toegang tot kwalitatieve klanten, eerlijke tarieven, en tools die je helpen succesvol te zijn.",
 whyContent2: "Onderzoek toont aan dat freelancers die het platform kiezen dat past bij hun vakgebied 65% sneller hun eerste opdracht binnenhalen en gemiddeld 40% hogere tarieven kunnen vragen dan freelancers op verkeerde platforms.",
 stepByStepTitle: "Stap-voor-Stap: Jouw Ideale Platform Vinden",
 step1Title: "1. Definieer Je Doelen en Verwachtingen",
 step1Content: "Begin met jezelf deze vragen te stellen: Zoek je een voltijds inkomen of extra bijverdiensten? Wil je lokaal of internationaal werken? Heb je directe betalingen nodig of kun je wachten op escrow-systemen? Hoeveel commissie ben je bereid te betalen?",
 step2Title: "2. Identificeer Je Vakgebied en Expertise Niveau",
 step2Content: "Sommige platforms zijn ideaal voor creatieve professionals, andere voor technische experts. Bepaal jouw primaire vakgebied (design, development, schrijven, marketing) en je ervaringsniveau. Beginners hebben andere behoeften dan experts met jaren ervaring.",
 step3Title: "3. Onderzoek Platform Specialisaties",
 step3Content: "Elk platform heeft zijn sterke punten. Upwork excelleert in lange-termijn projecten en enterprise klanten. Fiverr is perfect voor kleine gigs en snelle opdrachten. Toptal focust op top-tier talent. 99designs is dé plek voor designers. Onderzoek welke platforms dominant zijn in jouw niche.",
 step4Title: "4. Vergelijk Commissiestructuren",
 step4Content: "Commissies variëren van 5% tot 20% of meer. Upwork rekent 10-20% afhankelijk van je klantwaarde. Fiverr neemt 20% van elke transactie. Sommige platforms zoals Gun.io hanteren geen commissie maar een vetted entry process. Bereken wat elk platform werkelijk kost op basis van je verwachte inkomsten.",
 step5Title: "5. Evalueer Kwaliteit van Opdrachten",
 step5Content: "Kijk verder dan het aantal beschikbare opdrachten. Wat is de gemiddelde projectwaarde? Hoe serieus zijn de klanten? Zijn er veel spammy listings? Lees reviews van andere freelancers over hun ervaringen met opdrachtgevers op het platform.",
 step6Title: "6. Test Platform Features en UX",
 step6Content: "Maak gratis accounts op je top 3 platforms. Test de zoekfunctie, bekijk hoe opdrachten worden gepresenteerd, probeer de messaging tools, en ervaar het applicatieproces. Een platform met frustrerende UX kost je dagelijks tijd en energie.",
 keyFactorsTitle: "Belangrijke Factoren bij Platform Selectie",
 factorsIntro: "Verschillende factoren beïnvloeden welk platform het beste bij jou past:",
 platformTypesTitle: "Types Freelance Platforms en Hun Ideale Gebruikers",
 generalMarketplaces: "Algemene Marktplaatsen (Upwork, Freelancer)",
 generalMarketplacesDesc: "Ideaal voor generalisten en freelancers die diversiteit willen. Grote opdrachtpool maar ook veel competitie. Perfect als je flexibel bent in projecttypes.",
 nichePlatforms: "Niche Platforms (Toptal, Gun.io, Dribbble)",
 nichePlatformsDesc: "Focus op specifieke vakgebieden met hogere kwaliteit. Strenger vetted proces maar betere klanten en tarieven. Ideaal voor ervaren professionals.",
 gigPlatforms: "Gig-Based Platforms (Fiverr, TaskRabbit)",
 gigPlatformsDesc: "Perfect voor kleine, gestandaardiseerde diensten. Snelle betalingen en veel volume, maar lagere tarieven per opdracht. Goed voor beginners en snelle cash flow.",
 localPlatforms: "Lokale Platforms (Werkspot, Freelance.nl)",
 localPlatformsDesc: "Focus op specifieke geografische markten. Minder competitie, betere lokale connecties, vaak hogere tarieven. Ideaal als je lokaal wilt werken.",
 mistakesTitle: "Veelgemaakte Fouten bij Platform Selectie",
 mistake1: "Alleen Kiezen op Bekendheid",
 mistake1Desc: "Het grootste platform is niet altijd het beste voor jou. Kleinere niche platforms kunnen betere matches opleveren.",
 mistake2: "Commissie als Enige Factor",
 mistake2Desc: "Een platform met 5% commissie maar slechte opdrachten is duurder dan een platform met 15% commissie en premium klanten.",
 mistake3: "Te Veel Platforms Tegelijk",
 mistake3Desc: "Spreiden over 5+ platforms betekent dat je nergens een sterke reputatie opbouwt. Start met 1-2 platforms en bouw eerst daar je profiel op.",
 mistake4: "Verwachtingen te Hoog",
 mistake4Desc: "Geen enkel platform garandeert direct succes. Je moet investeren in je profiel, portfolio, en het leren van de platform-specifieke strategieën.",
 comparisonTitle: "Platform Vergelijking: Quick Overview",
 nextStepsTitle: "Je Volgende Stappen na Platform Selectie",
 nextStepsIntro: "Zodra je je platform gekozen hebt:",
 finalTitle: "Conclusie: De Juiste Keuze Maakt het Verschil"
 },
 cta: {
 title: "Klaar om Jouw Perfecte Platform te Vinden?",
 description: "Vergelijk alle freelance platforms op basis van commissie, vakgebied, en reviews. Of doe onze quiz om binnen 2 minuten jouw ideale match te ontdekken.",
 compareBtn: "Vergelijk Alle Platforms",
 quizBtn: "Doe de Platform Quiz"
 },
 related: {
 title: "Gerelateerde Gidsen",
 beginnerVsExpert: "Beginner vs Expert Platforms",
 beginnerVsExpertDesc: "Welke platforms passen bij jouw ervaringsniveau?",
 selectiefactoren: "Belangrijke Selectiefactoren",
 selectiefactorenDesc: "Waar moet je op letten bij het vergelijken van platforms?",
 meerdere: "Meerdere Platforms Gebruiken",
 meerdereDesc: "Wanneer heeft het zin om op meerdere platforms actief te zijn?"
 }
 } : {
 hero: {
 title: "How to Choose the Best Freelance Platform for Your Expertise",
 intro: "With hundreds of freelance platforms available, how do you choose the one that's perfect for you? Our complete guide helps you make the right choice based on your goals, skills, and working style.",
 cta1: "Compare Platforms",
 cta2: "Take the Quiz"
 },
 sections: {
 intro: "Choosing the right freelance platform can make the difference between a thriving career and endless frustration. Each platform has its own advantages, disadvantages, and ideal users. This guide takes you step-by-step through the selection process.",
 whyTitle: "Why Platform Choice Is Crucial for Your Success",
 whyContent1: "Your freelance platform is more than just a place to find projects—it's the foundation of your entire freelance business. The right platform gives you access to quality clients, fair rates, and tools that help you succeed.",
 whyContent2: "Research shows that freelancers who choose a platform that matches their expertise land their first project 65% faster and can charge 40% higher rates on average than freelancers on the wrong platforms.",
 stepByStepTitle: "Step-by-Step: Finding Your Ideal Platform",
 step1Title: "1. Define Your Goals and Expectations",
 step1Content: "Start by asking yourself these questions: Are you looking for full-time income or extra side earnings? Do you want to work locally or internationally? Do you need immediate payments or can you wait for escrow systems? How much commission are you willing to pay?",
 step2Title: "2. Identify Your Expertise and Experience Level",
 step2Content: "Some platforms are ideal for creative professionals, others for technical experts. Determine your primary expertise (design, development, writing, marketing) and your experience level. Beginners have different needs than experts with years of experience.",
 step3Title: "3. Research Platform Specializations",
 step3Content: "Each platform has its strengths. Upwork excels at long-term projects and enterprise clients. Fiverr is perfect for small gigs and quick projects. Toptal focuses on top-tier talent. 99designs is the place for designers. Research which platforms are dominant in your niche.",
 step4Title: "4. Compare Commission Structures",
 step4Content: "Commissions vary from 5% to 20% or more. Upwork charges 10-20% depending on your client value. Fiverr takes 20% of every transaction. Some platforms like Gun.io charge no commission but have a vetted entry process. Calculate what each platform actually costs based on your expected earnings.",
 step5Title: "5. Evaluate Project Quality",
 step5Content: "Look beyond the number of available projects. What's the average project value? How serious are the clients? Are there many spammy listings? Read reviews from other freelancers about their experiences with clients on the platform.",
 step6Title: "6. Test Platform Features and UX",
 step6Content: "Create free accounts on your top 3 platforms. Test the search function, see how projects are presented, try the messaging tools, and experience the application process. A platform with frustrating UX costs you time and energy daily.",
 keyFactorsTitle: "Key Factors in Platform Selection",
 factorsIntro: "Different factors influence which platform is best for you:",
 platformTypesTitle: "Types of Freelance Platforms and Their Ideal Users",
 generalMarketplaces: "General Marketplaces (Upwork, Freelancer)",
 generalMarketplacesDesc: "Ideal for generalists and freelancers who want diversity. Large project pool but also lots of competition. Perfect if you're flexible in project types.",
 nichePlatforms: "Niche Platforms (Toptal, Gun.io, Dribbble)",
 nichePlatformsDesc: "Focus on specific expertise with higher quality. Stricter vetting process but better clients and rates. Ideal for experienced professionals.",
 gigPlatforms: "Gig-Based Platforms (Fiverr, TaskRabbit)",
 gigPlatformsDesc: "Perfect for small, standardized services. Fast payments and high volume, but lower rates per project. Good for beginners and quick cash flow.",
 localPlatforms: "Local Platforms (Werkspot, Freelance.nl)",
 localPlatformsDesc: "Focus on specific geographic markets. Less competition, better local connections, often higher rates. Ideal if you want to work locally.",
 mistakesTitle: "Common Mistakes in Platform Selection",
 mistake1: "Choosing Only Based on Recognition",
 mistake1Desc: "The biggest platform isn't always the best for you. Smaller niche platforms can provide better matches.",
 mistake2: "Commission as Only Factor",
 mistake2Desc: "A platform with 5% commission but poor projects is more expensive than a platform with 15% commission and premium clients.",
 mistake3: "Too Many Platforms at Once",
 mistake3Desc: "Spreading across 5+ platforms means you don't build a strong reputation anywhere. Start with 1-2 platforms and build your profile there first.",
 mistake4: "Expectations Too High",
 mistake4Desc: "No platform guarantees immediate success. You must invest in your profile, portfolio, and learning platform-specific strategies.",
 comparisonTitle: "Platform Comparison: Quick Overview",
 nextStepsTitle: "Your Next Steps After Platform Selection",
 nextStepsIntro: "Once you've chosen your platform:",
 finalTitle: "Conclusion: The Right Choice Makes the Difference"
 },
 cta: {
 title: "Ready to Find Your Perfect Platform?",
 description: "Compare all freelance platforms based on commission, expertise, and reviews. Or take our quiz to discover your ideal match in 2 minutes.",
 compareBtn: "Compare All Platforms",
 quizBtn: "Take Platform Quiz"
 },
 related: {
 title: "Related Guides",
 beginnerVsExpert: "Beginner vs Expert Platforms",
 beginnerVsExpertDesc: "Which platforms match your experience level?",
 selectiefactoren: "Important Selection Factors",
 selectiefactorenDesc: "What should you look for when comparing platforms?",
 meerdere: "Using Multiple Platforms",
 meerdereDesc: "When does it make sense to be active on multiple platforms?"
 }
 };

 // Schema.org structured data
 const articleSchema = {
 '@context': 'https://schema.org',
 '@type': 'Article',
 headline: locale === 'nl' ? 'Het Beste Freelance Platform Kiezen: Complete Gids 2026' : 'How to Choose the Best Freelance Platform: Complete Guide 2026',
 description: locale === 'nl' ? 'Vind jouw ideale freelance platform met onze complete stap-voor-stap gids.' : 'Find your ideal freelance platform with our complete step-by-step guide.',
 author: {
 '@type': 'Organization',
 name: 'SkillLinkup',
 },
 publisher: {
 '@type': 'Organization',
 name: 'SkillLinkup',
 logo: {
 '@type': 'ImageObject',
 url: `${siteUrl}/images/logo/skilllinkup-transparant-rozepunt.webp`,
 },
 },
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
 { '@type': 'ListItem', position: 4, name: locale === 'nl' ? 'Beste Platform Kiezen' : 'Choose Best Platform' },
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
 <Target className="w-8 h-8 text-white" />
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
 <Search className="w-5 h-5" />
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
 {/* Introduction */}
 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-primary dark:border-accent pl-6 py-2 mb-8">
 {content.sections.intro}
 </p>

 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6 font-heading">
 {content.sections.whyTitle}
 </h2>
 <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
 {content.sections.whyContent1}
 </p>
 <div className="bg-gradient-to-r from-accent/10 to-primary/10 dark:from-accent/20 dark:to-primary/20 border-l-4 border-accent dark:border-primary rounded-lg p-6 mb-8">
 <p className="text-lg text-gray-800 dark:text-gray-200 font-semibold">
 {content.sections.whyContent2}
 </p>
 </div>

 {/* Step-by-Step Guide */}
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-8 font-heading">
 {content.sections.stepByStepTitle}
 </h2>

 <div className="space-y-8 mb-12">
 {[
 { title: content.sections.step1Title, content: content.sections.step1Content, icon: Target },
 { title: content.sections.step2Title, content: content.sections.step2Content, icon: Users },
 { title: content.sections.step3Title, content: content.sections.step3Content, icon: Search },
 { title: content.sections.step4Title, content: content.sections.step4Content, icon: TrendingUp },
 { title: content.sections.step5Title, content: content.sections.step5Content, icon: Star },
 { title: content.sections.step6Title, content: content.sections.step6Content, icon: CheckCircle },
 ].map((step, index) =>(
 <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
 <div className="flex items-start gap-4">
 <div className="w-12 h-12 bg-primary/10 dark:bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
 <step.icon className="w-6 h-6 text-primary dark:text-accent" />
 </div>
 <div>
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-heading">{step.title}</h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{step.content}</p>
 </div>
 </div>
 </div>
 ))}
 </div>

 {/* Platform Types */}
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-8 font-heading">
 {content.sections.platformTypesTitle}
 </h2>

 <div className="grid md:grid-cols-2 gap-6 mb-12">
 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-heading">
 {content.sections.generalMarketplaces}
 </h3>
 <p className="text-gray-700 dark:text-gray-300">
 {content.sections.generalMarketplacesDesc}
 </p>
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-heading">
 {content.sections.nichePlatforms}
 </h3>
 <p className="text-gray-700 dark:text-gray-300">
 {content.sections.nichePlatformsDesc}
 </p>
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-heading">
 {content.sections.gigPlatforms}
 </h3>
 <p className="text-gray-700 dark:text-gray-300">
 {content.sections.gigPlatformsDesc}
 </p>
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-heading">
 {content.sections.localPlatforms}
 </h3>
 <p className="text-gray-700 dark:text-gray-300">
 {content.sections.localPlatformsDesc}
 </p>
 </div>
 </div>

 {/* Common Mistakes */}
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-8 font-heading">
 {content.sections.mistakesTitle}
 </h2>

 <div className="space-y-4 mb-12">
 {[
 { title: content.sections.mistake1, desc: content.sections.mistake1Desc },
 { title: content.sections.mistake2, desc: content.sections.mistake2Desc },
 { title: content.sections.mistake3, desc: content.sections.mistake3Desc },
 { title: content.sections.mistake4, desc: content.sections.mistake4Desc },
 ].map((mistake, index) =>(
 <div key={index} className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 rounded-lg p-6">
 <h3 className="text-lg font-bold text-red-900 dark:text-red-300 mb-2 font-heading">{mistake.title}</h3>
 <p className="text-red-800 dark:text-red-200">{mistake.desc}</p>
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
 <Search className="w-5 h-5" />
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
 <Link
 href={`/${locale}/gids/platform-selectie/beginner-vs-expert-platforms`}
 className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-all"
 >
 <Users className="w-8 h-8 text-primary dark:text-accent mb-3" />
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-accent font-heading">
 {content.related.beginnerVsExpert}
 </h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
 {content.related.beginnerVsExpertDesc}
 </p>
 <div className="flex items-center text-primary dark:text-accent text-sm font-semibold">
 {locale === 'nl' ? 'Lees meer' : 'Read more'} <ArrowRight className="w-4 h-4 ml-1" />
 </div>
 </Link>
 <Link
 href={`/${locale}/gids/platform-selectie/belangrijke-selectiefactoren`}
 className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-all"
 >
 <CheckCircle className="w-8 h-8 text-primary dark:text-accent mb-3" />
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-accent font-heading">
 {content.related.selectiefactoren}
 </h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
 {content.related.selectiefactorenDesc}
 </p>
 <div className="flex items-center text-primary dark:text-accent text-sm font-semibold">
 {locale === 'nl' ? 'Lees meer' : 'Read more'} <ArrowRight className="w-4 h-4 ml-1" />
 </div>
 </Link>
 <Link
 href={`/${locale}/gids/platform-selectie/meerdere-platforms-gebruiken`}
 className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-all"
 >
 <TrendingUp className="w-8 h-8 text-primary dark:text-accent mb-3" />
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-accent font-heading">
 {content.related.meerdere}
 </h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
 {content.related.meerdereDesc}
 </p>
 <div className="flex items-center text-primary dark:text-accent text-sm font-semibold">
 {locale === 'nl' ? 'Lees meer' : 'Read more'} <ArrowRight className="w-4 h-4 ml-1" />
 </div>
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
