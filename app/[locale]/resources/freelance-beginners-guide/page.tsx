import Link from "next/link";
import { Metadata } from "next";

interface PageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'freelance-beginners-guide';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

 if (locale === 'nl') {
 return {
 title: "Complete Freelance Gids 2026: Van Nul naar Eerste Klant",
 description: "Start je freelance carrière met vertrouwen. Complete stap-voor-stap gids met profiel, offertes, prijzen en je eerste klant binnen 30 dagen.",
 keywords: "freelance beginnen, ZZP starten, eerste freelance klant, freelance gids nederland, hoe word ik freelancer",
 openGraph: {
 title: "Complete Freelance Gids 2026: Van Nul naar Eerste Klant",
 description: "Start je freelance carrière met vertrouwen. Complete stap-voor-stap gids met profiel, offertes, prijzen en je eerste klant binnen 30 dagen.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Complete Freelance Gids' }],
 locale: 'nl_NL',
 type: "article",
 },
 twitter: {
 card: 'summary_large_image',
 title: "Complete Freelance Gids 2026: Van Nul naar Eerste Klant",
 description: "Start je freelance carrière met vertrouwen. Complete stap-voor-stap gids met profiel, offertes, prijzen.",
 images: [`${siteUrl}/images/og/resources-og.png`],
 creator: '@SkillLinkup',
 site: '@SkillLinkup',
 },
 alternates: {
 canonical: pageUrl,
 languages: { 'en': `${siteUrl}/en/resources/${slug}`, 'nl': `${siteUrl}/nl/resources/${slug}` },
 },
 robots: {
 index: true, follow: true,
 googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
 },
 };
 }

 return {
 title: "Complete Freelance Beginner's Guide 2026: Zero to First Client",
 description: "Start your freelance career with confidence. Step-by-step guide covering profiles, proposals, pricing, and landing your first client in 30 days.",
 keywords: "freelance beginner guide, how to start freelancing, first freelance client, freelancing for beginners, freelance career start",
 openGraph: {
 title: "Complete Freelance Beginner's Guide 2026: Zero to First Client",
 description: "Start your freelance career with confidence. Step-by-step guide covering profiles, proposals, pricing, and landing your first client in 30 days.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Complete Freelance Guide' }],
 locale: 'en_US',
 type: "article",
 },
 twitter: {
 card: 'summary_large_image',
 title: "Complete Freelance Beginner's Guide 2026: Zero to First Client",
 description: "Start your freelance career with confidence. Step-by-step guide covering profiles, proposals, pricing.",
 images: [`${siteUrl}/images/og/resources-og.png`],
 creator: '@SkillLinkup',
 site: '@SkillLinkup',
 },
 alternates: {
 canonical: pageUrl,
 languages: { 'en': `${siteUrl}/en/resources/${slug}`, 'nl': `${siteUrl}/nl/resources/${slug}` },
 },
 robots: {
 index: true, follow: true,
 googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
 },
 };
}

export default async function FreelanceBeginnerGuidePage({ params }: PageProps) {
 const { locale } = await params;

 const content = locale === 'nl' ? {
 hero: {
 badge: "Aan de Slag als Freelancer",
 h1: "Complete Freelance Gids voor Beginners: Van Nul naar Eerste Klant",
 intro: "Start je freelance reis met vertrouwen. Deze uitgebreide gids neemt je mee door elke stap—van het maken van je eerste profiel tot het binnenhalen van betaald werk binnen 30 dagen.",
 cta1: "Bekijk Beginner-Vriendelijke Platforms",
 cta2: "Lees Succesverhalen"
 },
 toc: {
 title: "Wat Je Leert",
 items: [
 "Het freelance landschap begrijpen",
 "Je eerste freelance platform kiezen",
 "Een winnend profiel opzetten",
 "Je diensten correct prijzen",
 "Offertes schrijven die gehired worden",
 "Je eerste klant binnen 30 dagen binnenhalen"
 ]
 },
 intro: {
 title: "Waarom Freelancen in 2026?",
 p1: "De freelance economie is nog nooit zo sterk geweest. In 2026 werken wereldwijd meer dan 100 miljoen mensen als freelancer. Maar verder dan de indrukwekkende cijfers biedt freelancen iets waardevols: vrijheid.",
 p2: "Vrijheid om je klanten te kiezen. Vrijheid om je tarieven te bepalen. Vrijheid om overal te werken. Of je nu wilt ontsnappen aan de 9-tot-5, je inkomen wilt aanvullen of een fulltime bedrijf wilt bouwen, freelancen biedt een bewezen pad naar financiële onafhankelijkheid.",
 p3: "Deze gids is speciaal ontworpen voor absolute beginners—mensen die nog nooit gefreelanced hebben maar online geld willen verdienen. We nemen je mee door elke stap, van het kiezen van je niche tot het binnenhalen van je eerste betalende klant binnen 30 dagen."
 },
 step1: {
 title: "Stap 1: Ontdek Je Verkoopbare Vaardigheden",
 p1: "De eerste vraag die elke beginner stelt is: \"Wat kan ik eigenlijk verkopen?\" Het goede nieuws? Je hebt waarschijnlijk meer verkoopbare vaardigheden dan je denkt. Freelancen is niet alleen voor designers en developers—het is voor iedereen met vaardigheden die bedrijven nodig hebben.",
 skillsTitle: "Populaire Beginner-Vriendelijke Freelance Vaardigheden:",
 skills: [
 { title: "Schrijven & Content Creatie:", desc: "Blogposts, artikelen, copywriting, social media content" },
 { title: "Grafisch Ontwerp:", desc: "Logo's, social media graphics, presentaties, infographics" },
 { title: "Virtueel Assistentschap:", desc: "E-mailbeheer, planning, klantenservice, data-invoer" },
 { title: "Webontwikkeling:", desc: "WordPress sites, landingspagina's, basis HTML/CSS werk" },
 { title: "Social Media Management:", desc: "Contentplanning, posten, community management" },
 { title: "Video Editing:", desc: "YouTube video's, social media clips, promotionele content" }
 ],
 p2: "Heb je deze vaardigheden nog niet? Geen probleem! Veel succesvolle freelancers zijn begonnen door specifiek een vaardigheid te leren om te freelancen. Platforms zoals YouTube, Coursera en Udemy bieden gratis of betaalbare cursussen in bijna elk freelance vakgebied. Je kunt vaardig genoeg worden om je eerste klant binnen 2-4 weken intensief leren binnen te halen.",
 proTip: "Pro Tip: Begin met vaardigheden die je al in je huidige baan of hobby's gebruikt. Ben je goed in organiseren? Overweeg virtueel assistentschap. Hou je van e-mails schrijven? Probeer copywriting. Je bestaande ervaring is waardevoller dan je denkt."
 },
 step2: {
 title: "Stap 2: Kies Je Eerste Freelance Platform",
 p1: "Zodra je weet wat je verkoopt, moet je beslissen waar je het verkoopt. Er zijn tientallen freelance platforms beschikbaar, maar als beginner wil je je focussen op platforms die:",
 criteria: [
 { title: "Beginner-vriendelijk:", desc: "Eenvoudige aanmelding, duidelijke instructies, ondersteunende community" },
 { title: "Hoog verkeer:", desc: "Veel klanten die actief opdrachten plaatsen" },
 { title: "Eerlijke betalingsbescherming:", desc: "Escrow systemen die je verdiensten beschermen" },
 { title: "Lage toegangsdrempel:", desc: "Je hebt geen enorme portfolio nodig om te beginnen" }
 ],
 platformsTitle: "Top Platforms voor Beginners in 2026:",
 platforms: [
 { name: "Freelance.nl", desc: "Grootste Nederlandse klantenbasis, alle vaardigheidsniveaus. 10% platformkosten." },
 { name: "Upwork", desc: "Grootste internationale klantenbasis, portfolio opbouwen. 10% platformkosten." },
 { name: "Fiverr", desc: "Op diensten gebaseerd model, jij bepaalt vaste prijzen. Geweldig voor creatieve diensten. 20% platformkosten." }
 ],
 recommendation: "Onze aanbeveling? Start met twee platforms tegelijk. Dit vergroot je kansen om snel werk te vinden terwijl je leert welk platform het beste voor jouw niche werkt. Je kunt altijd later versmallen zodra je consistente klanten krijgt."
 },
 cta1: {
 title: "Klaar om Platforms te Vergelijken?",
 desc: "Bekijk onze uitgebreide directory van beginner-vriendelijke freelance platforms met gedetailleerde reviews, prijzen en succestips.",
 button: "Bekijk Alle Platforms"
 },
 step3: {
 title: "Stap 3: Maak Je Professionele Profiel",
 p1: "Je profiel is je digitale etalage—het is wat klanten zien voordat ze besluiten of ze contact met je opnemen. Een professioneel profiel kan het verschil maken tussen stilte en een volle klantenlijst. Dit maakt een profiel onderscheidend:",
 elements: [
 { title: "Professionele Profielfoto", desc: "Gebruik een duidelijke, vriendelijke headshot met goede belichting. Kleed je professioneel maar benaderbaar. Profielen met foto's krijgen 40% meer views dan die zonder." },
 { title: "Aandacht-Trekkende Kop", desc: "Geef niet alleen je functietitel. Focus op de waarde die je biedt. In plaats van \"Freelance Schrijver\", probeer \"Ik help bedrijven bezoekers om te zetten naar klanten met conversie-gerichte content.\"" },
 { title: "Resultaatgerichte Bio", desc: "Structureer je bio in drie delen: (1) Wat je doet, (2) Wie je helpt, (3) Welke resultaten je levert. Houd het onder 300 woorden en focus op voordelen, niet features." },
 { title: "Portfolio Voorbeelden (Zelfs als Beginner)", desc: "Nog geen klantwerk? Maak 2-3 voorbeeldprojecten die je vaardigheden tonen. Schrijf blogposts, ontwerp logo's voor fictieve bedrijven, of bouw voorbeeldwebsites. Kwaliteit verslaat kwantiteit—drie excellente voorbeelden zijn beter dan tien middelmatige." },
 { title: "Vaardigheden & Certificaten", desc: "Lijst relevante vaardigheden op (de meeste platforms beperken je tot 10-15). Doe platform vaardigheidstests om badges te verdienen. Overweeg betaalbare certificaten van Google, HubSpot of Facebook om geloofwaardigheid te verhogen." }
 ],
 linkText: "Voor gedetailleerde profielcreatie strategieën, templates en echte voorbeelden die gehired werden, bekijk onze uitgebreide gids over het maken van winnende freelance profielen."
 },
 step4: {
 title: "Stap 4: Beheers de Kunst van Prijzen",
 p1: "Prijzen is waar de meeste beginners moeite mee hebben. Prijs te hoog en je krijgt geen klanten. Prijs te laag en je werkt jezelf kapot voor stuivers. Hier is de strategische aanpak:",
 strategyTitle: "De Beginner Prijsstrategie:",
 phases: [
 {
 title: "Fase 1: Eerste 5 Klanten (Weken 1-4)",
 desc: "Prijs 20-30% onder de marktwaarde. Je doel is niet maximale winst—het is snel testimonials en je reputatie opbouwen. Als de marktwaarde voor blogposts €100 is, vraag dan €70-80."
 },
 {
 title: "Fase 2: Momentum Opbouwen (Weken 5-8)",
 desc: "Zodra je 5 positieve reviews hebt, verhoog je tarieven naar marktgemiddelde. Je hebt nu sociaal bewijs dat standaard prijzen rechtvaardigt. Blijf je portfoliokwaliteit opbouwen."
 },
 {
 title: "Fase 3: Premium Positionering (Maand 3+)",
 desc: "Met 15-20 excellente reviews en bewezen resultaten, prijs 10-20% boven de marktwaarde. Target hogere kwaliteit klanten die expertise waarderen boven kosten. Specialiseer in een winstgevende niche."
 }
 ],
 warning: "Waarschuwing: Vermijd de €5 Val. Prijs jezelf nooit op de absolute bodem van de markt. €5 klussen trekken nachtmerrie klanten aan die je tijd niet respecteren. Zelfs als complete beginner, handhaaf een minimum standaard—€25-50 per project of €15-20 per uur.",
 researchTip: "Onderzoek de markttarieven van je niche door vergelijkbare profielen op je gekozen platforms te bekijken. Kijk naar freelancers met 10-50 reviews (niet de superstars met 1000+ reviews) om realistische beginner-tot-gemiddelde prijsbenchmarks te krijgen."
 },
 jsonLd: {
 "@context": "https://schema.org",
 "@type": "Article",
 "headline": "Complete Freelance Gids: Van Nul naar Eerste Klant",
 "description": "Uitgebreide gids voor absolute beginners die hun freelance carrière starten, met alle stappen van het opzetten van profielen tot het binnenhalen van de eerste klant.",
 "author": { "@type": "Organization", "name": "SkillLinkup" },
 "publisher": { "@type": "Organization", "name": "SkillLinkup", "logo": { "@type": "ImageObject", "url": "https://skillLinkup.com/logo.png" } },
 "datePublished": "2026-01-15",
 "dateModified": "2026-01-15"
 }
 } : {
 hero: {
 badge: "Getting Started as a Freelancer",
 h1: "Complete Freelance Beginner's Guide: From Zero to First Client",
 intro: "Start your freelance journey with confidence. This comprehensive guide walks you through every step—from creating your first profile to landing paid work in 30 days.",
 cta1: "Browse Beginner-Friendly Platforms",
 cta2: "Read Success Stories"
 },
 toc: {
 title: "What You'll Learn",
 items: [
 "Understanding the freelance landscape",
 "Choosing your first freelance platform",
 "Setting up a winning profile",
 "Pricing your services correctly",
 "Writing proposals that get hired",
 "Landing your first client in 30 days"
 ]
 },
 intro: {
 title: "Why Start Freelancing in 2026?",
 p1: "The freelance economy has never been stronger. In 2026, over 73 million Americans work as freelancers, contributing $1.4 trillion to the economy. But beyond the impressive numbers, freelancing offers something more valuable: freedom.",
 p2: "Freedom to choose your clients. Freedom to set your rates. Freedom to work from anywhere. Whether you're looking to escape the 9-to-5 grind, supplement your income, or build a full-time business, freelancing provides a proven path to financial independence.",
 p3: "This guide is designed specifically for absolute beginners—people who have never freelanced before but want to start earning money online. We'll walk you through every single step, from choosing your niche to landing your first paying client within 30 days."
 },
 step1: {
 title: "Step 1: Discover Your Marketable Skills",
 p1: "The first question every beginner asks is: \"What can I actually sell?\" The good news? You probably have more marketable skills than you realize. Freelancing isn't just for designers and developers—it's for anyone with skills that businesses need.",
 skillsTitle: "Popular Beginner-Friendly Freelance Skills:",
 skills: [
 { title: "Writing & Content Creation:", desc: "Blog posts, articles, copywriting, social media content" },
 { title: "Graphic Design:", desc: "Logos, social media graphics, presentations, infographics" },
 { title: "Virtual Assistance:", desc: "Email management, scheduling, customer service, data entry" },
 { title: "Web Development:", desc: "WordPress sites, landing pages, basic HTML/CSS work" },
 { title: "Social Media Management:", desc: "Content planning, posting, community management" },
 { title: "Video Editing:", desc: "YouTube videos, social media clips, promotional content" }
 ],
 p2: "Don't have any of these skills yet? That's okay! Many successful freelancers started by learning a skill specifically to freelance. Platforms like YouTube, Coursera, and Udemy offer free or affordable courses in almost every freelance discipline. You can become proficient enough to land your first client in just 2-4 weeks of focused learning.",
 proTip: "Pro Tip: Start with skills you already use in your current job or hobbies. Are you good at organizing? Consider virtual assistance. Love writing emails? Try copywriting. Your existing experience is more valuable than you think."
 },
 step2: {
 title: "Step 2: Choose Your First Freelance Platform",
 p1: "Once you know what you're selling, you need to decide where to sell it. There are dozens of freelance platforms available, but as a beginner, you want to focus on platforms that are:",
 criteria: [
 { title: "Beginner-friendly:", desc: "Easy signup, clear instructions, supportive community" },
 { title: "High traffic:", desc: "Lots of clients actively posting jobs" },
 { title: "Fair payment protection:", desc: "Escrow systems that protect your earnings" },
 { title: "Low barrier to entry:", desc: "You don't need a huge portfolio to start" }
 ],
 platformsTitle: "Top Platforms for Beginners in 2026:",
 platforms: [
 { name: "Upwork", desc: "Largest client base, all skill levels, excellent for building portfolio. 10% platform fee." },
 { name: "Fiverr", desc: "Service-based model, you set fixed prices. Great for creative services. 20% platform fee." },
 { name: "Freelancer.com", desc: "International client base, contest features to showcase skills. 10% platform fee." }
 ],
 recommendation: "Our recommendation? Start with two platforms simultaneously. This increases your chances of landing work quickly while you learn which platform works best for your niche. You can always narrow down once you start getting consistent clients."
 },
 cta1: {
 title: "Ready to Compare Platforms?",
 desc: "Browse our comprehensive directory of beginner-friendly freelance platforms with detailed reviews, pricing, and success tips.",
 button: "Explore All Platforms"
 },
 step3: {
 title: "Step 3: Create Your Professional Profile",
 p1: "Your profile is your digital storefront—it's what clients see before deciding whether to contact you. A professional profile can be the difference between crickets and a full client roster. Here's what makes a profile stand out:",
 elements: [
 { title: "Professional Profile Photo", desc: "Use a clear, friendly headshot with good lighting. Dress professionally but approachably. Profiles with photos get 40% more views than those without." },
 { title: "Attention-Grabbing Headline", desc: "Don't just list your job title. Focus on the value you provide. Instead of \"Freelance Writer,\" try \"I help businesses turn visitors into customers with conversion-focused content.\"" },
 { title: "Results-Oriented Bio", desc: "Structure your bio in three parts: (1) What you do, (2) Who you help, (3) What results you deliver. Keep it under 300 words and focus on benefits, not features." },
 { title: "Portfolio Samples (Even as a Beginner)", desc: "No client work yet? Create 2-3 sample projects that showcase your skills. Write blog posts, design logos for fictional companies, or build sample websites. Quality beats quantity—three excellent samples are better than ten mediocre ones." },
 { title: "Skills & Certifications", desc: "List relevant skills (most platforms limit you to 10-15). Take platform skill tests to earn badges. Consider getting affordable certifications from Google, HubSpot, or Facebook to boost credibility." }
 ],
 linkText: "For detailed profile creation strategies, templates, and real examples that got hired, check out our comprehensive guide on creating winning freelance profiles."
 },
 step4: {
 title: "Step 4: Master the Art of Pricing",
 p1: "Pricing is where most beginners struggle. Price too high and you won't get clients. Price too low and you'll work yourself to exhaustion for pennies. Here's the strategic approach:",
 strategyTitle: "The Beginner Pricing Strategy:",
 phases: [
 {
 title: "Phase 1: First 5 Clients (Weeks 1-4)",
 desc: "Price 20-30% below market rate. Your goal isn't maximum profit—it's getting testimonials and building your reputation fast. For example, if market rate for blog posts is $100, charge $70-80."
 },
 {
 title: "Phase 2: Building Momentum (Weeks 5-8)",
 desc: "Once you have 5 positive reviews, increase your rates to market average. You now have social proof that justifies standard pricing. Continue building your portfolio quality."
 },
 {
 title: "Phase 3: Premium Positioning (Month 3+)",
 desc: "With 15-20 excellent reviews and proven results, price 10-20% above market rate. Target higher-quality clients who value expertise over cost. Specialize in a profitable niche."
 }
 ],
 warning: "Warning: Avoid the $5 Trap. Never price yourself at the absolute bottom of the market. $5 gigs attract nightmare clients who don't respect your time. Even as a complete beginner, maintain a minimum standard—$25-50 per project or $15-20 per hour.",
 researchTip: "Research your niche's market rates by browsing similar profiles on your chosen platforms. Look at freelancers with 10-50 reviews (not the superstars with 1000+ reviews) to get realistic beginner-to-intermediate pricing benchmarks."
 },
 jsonLd: {
 "@context": "https://schema.org",
 "@type": "Article",
 "headline": "Complete Freelance Beginner's Guide: From Zero to First Client",
 "description": "Comprehensive guide for absolute beginners starting their freelance career, covering everything from setting up profiles to landing the first client.",
 "author": { "@type": "Organization", "name": "SkillLinkup" },
 "publisher": { "@type": "Organization", "name": "SkillLinkup", "logo": { "@type": "ImageObject", "url": "https://skillLinkup.com/logo.png" } },
 "datePublished": "2026-01-15",
 "dateModified": "2026-01-15"
 }
 };

 return (
 <><script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(content.jsonLd) }}
 /><main className="flex-1">{/* Hero Section */}
 <section className="bg-gradient-to-br from-primary/10 via-white to-accent/10 dark:from-secondary dark:via-gray-900 dark:to-gray-800 py-16 sm:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-4xl mx-auto text-center"><div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 dark:bg-primary/30 text-primary dark:text-accent text-sm font-semibold mb-6"><span>{content.hero.badge}</span></div><h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6">{content.hero.h1}
 </h1><p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">{content.hero.intro}
 </p><div className="flex flex-col sm:flex-row gap-4 justify-center"><Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-primary text-white font-heading font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
 >{content.hero.cta1}
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link><Link
 href={`/${locale}/reviews`}
 className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-heading font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-md border-2 border-gray-200 dark:border-gray-700"
 >{content.hero.cta2}
 
 </Link></div></div></div></section>{/* Table of Contents */}
 <section className="py-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-4xl mx-auto"><div className="bg-gradient-to-br from-accent/10 to-primary/10 dark:from-accent/20 dark:to-primary/20 rounded-2xl p-8 border border-accent/20 dark:border-accent/30"><h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">{content.toc.title}
 </h2><div className="grid md:grid-cols-2 gap-4">{content.toc.items.map((item, i) =>(
 <div key={i} className="flex items-start gap-3"><span className="text-accent text-xl mt-1">✓</span><span className="text-gray-700 dark:text-gray-300">{item}</span></div>))}
 </div></div></div></div></section>{/* Main Content - Introduction */}
 <article className="py-16 bg-white dark:bg-gray-800"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert"><div className="mb-12"><h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">{content.intro.title}
 </h2><p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{content.intro.p1}
 </p><p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{content.intro.p2}
 </p><p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{content.intro.p3}
 </p></div>{/* Step 1 */}
 <div className="mb-12"><h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">{content.step1.title}
 </h2><p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{content.step1.p1}
 </p><div className="bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-2xl p-6 my-6 border border-primary/20 dark:border-primary/30"><h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">{content.step1.skillsTitle}</h3><div className="grid md:grid-cols-2 gap-3">{content.step1.skills.map((skill, i) =>(
 <div key={i} className="flex items-start gap-2"><span className="text-primary text-lg mt-1">▸</span><div><strong className="text-gray-900 dark:text-white">{skill.title}</strong><span className="text-gray-700 dark:text-gray-300">{skill.desc}</span></div></div>))}
 </div></div><p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{content.step1.p2}
 </p><div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 p-6 my-6 rounded-r-xl"><p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">{content.step1.proTip.split(':')[0]}:</p><p className="text-gray-700 dark:text-gray-300">{content.step1.proTip.split(':').slice(1).join(':')}
 </p></div></div>{/* Step 2 */}
 <div className="mb-12"><h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">{content.step2.title}
 </h2><p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{content.step2.p1}
 </p><ul className="space-y-3 mb-6">{content.step2.criteria.map((item, i) =>(
 <li key={i} className="flex items-start gap-3"><span className="text-accent text-2xl mt-1">✓</span><span className="text-gray-700 dark:text-gray-300"><strong>{item.title}</strong>{item.desc}</span></li>))}
 </ul><div className="bg-gradient-to-br from-secondary/5 to-primary/5 dark:from-secondary/10 dark:to-primary/10 rounded-2xl p-6 my-6 border border-secondary/20 dark:border-secondary/30"><h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">{content.step2.platformsTitle}</h3><div className="space-y-4">{content.step2.platforms.map((platform, i) =>(
 <div key={i} className="border-l-4 border-primary pl-4"><h4 className="font-bold text-gray-900 dark:text-white mb-1">{platform.name}</h4><p className="text-gray-700 dark:text-gray-300">{platform.desc}</p></div>))}
 </div></div><p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{content.step2.recommendation}
 </p></div>{/* CTA 1 */}
 <div className="my-12 bg-gradient-to-r from-primary via-primary/90 to-accent rounded-2xl p-8 text-center shadow-xl"><h3 className="text-2xl font-heading font-bold text-white mb-4">{content.cta1.title}
 </h3><p className="text-white/90 mb-6 max-w-2xl mx-auto">{content.cta1.desc}
 </p><Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary font-heading font-semibold hover:bg-gray-100 transition-all shadow-lg"
 >{content.cta1.button}
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></Link></div>{/* Step 3 */}
 <div className="mb-12"><h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">{content.step3.title}
 </h2><p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{content.step3.p1}
 </p><div className="space-y-6 mb-6">{content.step3.elements.map((element, i) =>(
 <div key={i}><h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">{element.title}</h3><p className="text-gray-700 dark:text-gray-300 mb-2">{element.desc}</p></div>))}
 </div><p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{content.step3.linkText.split('creating winning freelance profiles')[0]}
 <Link href={`/${locale}/resources/freelance-profile-templates`} className="text-primary hover:text-primary/80 font-semibold underline decoration-2 decoration-primary/30 hover:decoration-primary">{locale === 'nl' ? 'het maken van winnende freelance profielen' : 'creating winning freelance profiles'}
 </Link>{content.step3.linkText.split('creating winning freelance profiles')[1]}
 </p></div>{/* Step 4 */}
 <div className="mb-12"><h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">{content.step4.title}
 </h2><p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{content.step4.p1}
 </p><div className="bg-gradient-to-br from-accent/10 to-primary/10 dark:from-accent/20 dark:to-primary/20 rounded-2xl p-6 my-6 border border-accent/20 dark:border-accent/30"><h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">{content.step4.strategyTitle}</h3><div className="space-y-4">{content.step4.phases.map((phase, i) =>(
 <div key={i}><h4 className="font-bold text-gray-900 dark:text-white mb-2">{phase.title}</h4><p className="text-gray-700 dark:text-gray-300">{phase.desc}</p></div>))}
 </div></div><div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-500 p-6 my-6 rounded-r-xl"><p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">{content.step4.warning.split('.')[0]}</p><p className="text-gray-700 dark:text-gray-300">{content.step4.warning.split('.').slice(1).join('.')}
 </p></div><p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{content.step4.researchTip}
 </p></div></div></div></article></main></>);
}
