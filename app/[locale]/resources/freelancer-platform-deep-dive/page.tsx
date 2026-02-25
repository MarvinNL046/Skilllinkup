import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({
 params,
}: {
 params: Promise<{ locale: string }>;
}): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'freelancer-platform-deep-dive';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

 if (locale === "nl") {
 return {
 title: "Freelancer.com Review 2026: Diepgaande Platform Analyse & Winnende Strategieën | SkillLinkup",
 description: "Complete gids over Freelancer.com contests, mijlpaalbetalingen, lidmaatschapsniveaus, biedstrategieën en bewezen tactieken om consistent projecten te winnen. €6B+ uitgekeerd aan 50M+ gebruikers.",
 keywords: "Freelancer.com review, Freelancer platform analyse Nederland, Freelancer.com gids, freelance biedstrategieën, Freelancer.com prijzen, Freelancer.com contests, Freelancer.com mijlpalen, Freelancer.com lidmaatschap",
 openGraph: {
 title: "Freelancer.com Review 2026: Platform Analyse & Winnende Strategieën",
 description: "Complete gids over Freelancer.com contests, mijlpaalbetalingen, lidmaatschapsniveaus en bewezen biedstrategieën voor freelancers.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Freelancer.com Review' }],
 locale: 'nl_NL',
 type: "article",
 },
 twitter: {
 card: 'summary_large_image',
 title: "Freelancer.com Review 2026: Platform Analyse & Winnende Strategieën",
 description: "Complete gids over Freelancer.com contests, mijlpaalbetalingen en lidmaatschapsniveaus.",
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
 title: "Freelancer.com Deep Dive: Platform Features & Best Practices 2026 | SkillLinkup",
 description: "Complete guide to Freelancer.com covering contests, milestone payments, membership tiers, bidding strategies, and proven tactics to win projects consistently. $6B+ paid out to 50M+ users.",
 keywords: "Freelancer.com review, Freelancer platform analysis, Freelancer.com guide, freelance bidding strategies, Freelancer.com pricing, Freelancer.com contests, Freelancer.com milestones, Freelancer.com membership",
 openGraph: {
 title: "Freelancer.com Deep Dive: Platform Features & Best Practices 2026",
 description: "Complete guide to Freelancer.com covering contests, milestone payments, membership tiers, bidding strategies, and proven tactics to win projects consistently.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Freelancer.com Deep Dive' }],
 locale: 'en_US',
 type: "article",
 },
 twitter: {
 card: 'summary_large_image',
 title: "Freelancer.com Deep Dive: Platform Features & Best Practices 2026",
 description: "Complete guide to Freelancer.com covering contests, milestone payments, membership tiers.",
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

export default async function FreelancerPlatformDeepDivePage({
 params,
}: {
 params: Promise<{ locale: string }>;
}) {
 const { locale } = await params;

 const content = locale === "nl" ? {
 badge: "Platform Diepgaande Analyse",
 title: "Freelancer.com Review: Kenmerken & Best Practices",
 subtitle: "Beheers Freelancer.com's unieke kenmerken zoals contests, mijlpaalbetalingen en lidmaatschapsniveaus. Leer bewezen biedstrategieën om meer projecten te winnen en inkomsten te maximaliseren.",
 cta1: "Vergelijk Platforms",
 cta2: "Lees Reviews",
 statsTitle: "Gebruikers Wereldwijd",
 statsJobs: "Projecten Gepost",
 statsContests: "Contests Gehouden",
 statsPayout: "Totaal Uitbetaald",
 overview: {
 title: "Freelancer.com Platform Overzicht",
 intro: "Opgericht in 2009, is Freelancer.com een van 's werelds grootste freelance- en crowdsourcingmarktplaatsen qua aantal gebruikers en projecten. Met meer dan 50 miljoen geregistreerde gebruikers in 247 landen, biedt het platform een unieke mix van traditioneel projectbieden en competitieve contests.",
 uniqueTitle: "Wat Freelancer.com Onderscheidt",
 unique1: "Contest Model: Unieke crowdsourcing contests waarbij freelancers concurreren door werk in te dienen voordat ze worden ingehuurd",
 unique2: "Mijlpaalbetalingen: Ingebouwd escrow-systeem met flexibele mijlpaal-gebaseerde vrijgaven voor projectgebaseerd werk",
 unique3: "Wereldwijd Bereik: Enorme internationale gebruikersbasis creëert kansen op alle vaardigheidsniveaus en prijspunten",
 unique4: "Vaardigheidstests: Meer dan 1.000 certificeringsexamens om expertise te valideren en profielgeloofwaardigheid te vergroten",
 categoriesTitle: "Populaire Categorieën",
 cat1: "Website Ontwikkeling & Design",
 cat2: "Mobiele App Ontwikkeling",
 cat3: "Content Schrijven & Vertaling",
 cat4: "Grafisch Ontwerp & Branding",
 cat5: "Data-invoer & Admin Ondersteuning",
 cat6: "Marketing & SEO",
 bestForTitle: "Het Beste Voor",
 best1: "Beginners die portfolio's bouwen",
 best2: "Ontwerpers die aan contests deelnemen",
 best3: "Internationale freelancers",
 best4: "High-volume bieders",
 best5: "Technische specialisten",
 best6: "Budget-bewuste klanten",
 },
 features: {
 title: "Essentiële Platform Kenmerken",
 contests: {
 title: "Contests: Crowdsourcing op Schaal",
 intro: "Freelancer.com pionierde het contest model waarbij klanten een prijsbedrag posten en freelancers concurreren door voltooid werk in te dienen. De klant beoordeelt alle inzendingen en selecteert een winnaar die het volledige prijsgeld ontvangt.",
 typesTitle: "Populaire Contest Types:",
 type1: "Logo & Merkidentiteit Design",
 type2: "Website & App UI Design",
 type3: "Product Naamgeving & Taglines",
 type4: "T-Shirt & Merchandise Design",
 type5: "Visitekaartje & Briefpapier",
 benefitsTitle: "Contest Voordelen:",
 benefit1: "Snelle portfolio opbouw",
 benefit2: "Geen vooraf voorstel schrijven",
 benefit3: "Toon creativiteit direct",
 benefit4: "Bouw klantrelaties op",
 benefit5: "Potentieel voor herhalingswerk",
 tip: "Pro Tip:",
 tipText: "Doe dagelijks mee aan 3-5 contests vroeg in je carrière om snel je portfolio op te bouwen. Focus op \"Gegarandeerde\" contests waar prijzen moeten worden toegekend, en richt je op contests met 10-30 inzendingen voor betere winkansen.",
 },
 milestones: {
 title: "Mijlpaalbetaling Systeem",
 intro: "Het mijlpaalsysteem van Freelancer.com stelt je in staat projecten op te delen in kleinere, beheersbare fases met betalingen die worden vrijgegeven bij voltooiing van elke mijlpaal. Dit beschermt zowel freelancers als klanten terwijl het cashflow biedt tijdens langere projecten.",
 howTitle: "Hoe Mijlpaalbetalingen Werken:",
 step1: "Definieer Mijlpalen: Verdeel project in 3-7 leverbare fases met duidelijke beschrijvingen en bedragen",
 step2: "Klant Financiert Escrow: Klant stort fondsen voor eerste mijlpaal (en optioneel toekomstige mijlpalen) in escrow",
 step3: "Voltooien & Verzoeken: Lever mijlpaalwerk op en vraag vrijgave van betaling via platform aan",
 step4: "Klant Beoordeelt: Klant heeft 14 dagen om te beoordelen en ofwel goed te keuren of revisies aan te vragen",
 step5: "Auto-vrijgave: Als klant niet binnen 14 dagen reageert, wordt betaling automatisch vrijgegeven aan freelancer",
 },
 exams: {
 title: "Vaardigheidstests & Certificeringen",
 intro: "Freelancer.com biedt 1.000+ vaardigheidstests in alle categorieën. Slagen voor examens toont badges op je profiel, wat geloofwaardigheid vergroot en zoekrangschikking verbetert. Tests variëren van beginner tot expert niveaus.",
 selectionTitle: "Strategische Test Selectie:",
 selection1: "Doe 5-10 tests in je kernvaardigheden",
 selection2: "Focus op veelgevraagde technologieën",
 selection3: "Herhaal mislukte tests na studeren",
 selection4: "Toon topscores prominent",
 impactTitle: "Impact op Succes:",
 impact1: "+40% hogere profielzichtbaarheid",
 impact2: "Verhoogde biedgeloofwaardigheid",
 impact3: "Betere zoekrangschikking",
 impact4: "Rechtvaardigt hogere tarieven",
 },
 },
 midCta: {
 title: "Bereken Je Competitieve Biedprijs",
 subtitle: "Gebruik onze gratis tarievencalculator om optimale prijzen te bepalen die biedingen winnen terwijl winstgevendheid behouden blijft.",
 button: "Bereken Je Tarief",
 },
 membership: {
 title: "Lidmaatschapsniveaus & Prijzen",
 free: {
 title: "Gratis Lidmaatschap",
 price: "€0/mnd",
 feature1: "8 biedingen per maand",
 feature2: "Basis profielkenmerken",
 feature3: "3% + €3 opnamekosten",
 feature4: "Geen preferred freelancer status",
 bestFor: "Het beste voor: Platform testen, beginners",
 },
 plus: {
 title: "Plus Lidmaatschap",
 price: "€6,95/mnd",
 feature1: "100 biedingen per maand",
 feature2: "5 vaardigheden vermeld in zoekresultaten",
 feature3: "Werk e-mailmeldingen",
 feature4: "1% + €1 opnamekosten",
 bestFor: "Het beste voor: Actieve freelancers, regelmatige bieders",
 },
 professional: {
 title: "Professional",
 price: "€24,95/mnd",
 badge: "POPULAIR",
 feature1: "300 biedingen per maand",
 feature2: "10 vaardigheden in zoekresultaten",
 feature3: "Preferred Freelancer badge",
 feature4: "Hogere zoekrangschikking",
 feature5: "1% + €1 opnamekosten",
 bestFor: "Het beste voor: Fulltime freelancers, serieuze inkomstenzoekers",
 },
 premier: {
 title: "Premier",
 price: "€49,95/mnd",
 feature1: "500 biedingen per maand",
 feature2: "Onbeperkte vaardigheden in zoekresultaten",
 feature3: "Premier badge & prioriteitsondersteuning",
 feature4: "Maximale zoekzichtbaarheid",
 feature5: "1% + €1 opnamekosten",
 bestFor: "Het beste voor: High-volume bieders, bureaus",
 },
 roiTitle: "Lidmaatschap ROI Strategie",
 roiText: "Start met Plus (€6,95/mnd) als je regelmatig biedt. Upgrade naar Professional (€24,95/mnd) zodra je 2-3 projecten per maand binnenhaalt—de Preferred badge en hogere rangschikking betalen zichzelf snel terug. Premier is alleen de moeite waard voor bureaus of freelancers die 15+ keer per dag bieden.",
 },
 bidding: {
 title: "Bewezen Biedstrategieën",
 pricing: {
 title: "Strategisch Prijsmodel",
 intro: "Freelancer.com is zeer competitief met bieders uit lagere-kosten regio's. Je prijsstrategie moet concurrentievermogen balanceren met winstgevendheid.",
 approachTitle: "De 3-Niveau Prijs Aanpak:",
 tier1Title: "Niveau 1: Entry Biedingen (Eerste 10-20 projecten)",
 tier1Text: "Bied 10-20% onder marktgemiddelde om reviews op te bouwen. Focus op snelle-turnaround projecten.",
 tier2Title: "Niveau 2: Marktprijs (20-100 projecten)",
 tier2Text: "Bied tegen competitieve marktprijzen zodra je 10+ vijf-sterren reviews hebt.",
 tier3Title: "Niveau 3: Premium (100+ projecten)",
 tier3Text: "Vraag 20-30% boven markt met sterke portfolio en Top Rated badge.",
 },
 proposal: {
 title: "Winnend Voorstel Template",
 copyText: "Kopieer deze structuur voor hogere responspercentages:",
 greeting: "1. Gepersonaliseerde Begroeting (1 zin)",
 greetingExample: "\"Hoi [Naam], ik zie dat je [specifieke vereiste uit projectbeschrijving] nodig hebt.\"",
 understanding: "2. Toon Begrip (2-3 zinnen)",
 understandingExample: "\"Uit je beschrijving begrijp ik dat je zoekt naar [vat behoefte samen]. De belangrijkste uitdagingen zullen zijn [noem 1-2 specifieke uitdagingen].\"",
 solution: "3. Jouw Oplossing (3-4 zinnen)",
 solutionExample: "\"Ik zal dit oplossen door [specifieke aanpak]. Ik heb [X vergelijkbare projecten] voltooid inclusief [relevant voorbeeld]. Je ontvangt [specifieke deliverables] binnen [tijdsbestek].\"",
 proof: "4. Bewijs & Portfolio (1-2 zinnen)",
 proofExample: "\"Zie mijn portfolio met [relevant werk]. Ik heb een [X%] voltooiingspercentage en [Y] sterren gemiddelde.\"",
 cta: "5. Call to Action (1 zin)",
 ctaExample: "\"Ik ben beschikbaar om direct te starten. Laten we je project in detail bespreken.\"",
 },
 tactics: {
 title: "Geavanceerde Biedtactieken",
 doTitle: "✓ Doe Dit:",
 do1: "Bied binnen eerste 3 uur na posting",
 do2: "Stel verduidelijkende vragen om interesse te tonen",
 do3: "Voeg relevante portfolio samples toe",
 do4: "Bied gratis consultatie of audit aan",
 do5: "Stel mijlpaalstructuur vooraf voor",
 do6: "Follow up eenmaal na 48 uur",
 avoidTitle: "✗ Vermijd Dit:",
 avoid1: "Generieke kopieer-plak voorstellen",
 avoid2: "Bieden op 100+ projecten dagelijks",
 avoid3: "Extreem lage biedingen (schaadt geloofwaardigheid)",
 avoid4: "Overbeloven van onrealistische tijdlijnen",
 avoid5: "Noemen van concurrerende platforms",
 avoid6: "Meerdere follow-ups (lijkt wanhopig)",
 },
 },
 fees: {
 title: "Kostenstructuur & Commissies",
 structure: "Platform Kosten",
 commission: "Project Commissie (Vast & Per Uur)",
 contest: "Contest Deelnamekosten (per contest)",
 withdrawal: "Opnamekosten (PayPal/Bankoverschrijving)",
 milestone: "Mijlpaal Vrijgavekosten (klant betaalt)",
 exampleTitle: "Echte Verdiensten Voorbeeld",
 exampleText: "Een ontwikkelaar die €1.000 verdient op een vast-prijs project met Professional lidmaatschap:",
 examplePayment: "Project betaling:",
 examplePlatform: "Platform kosten (10%):",
 exampleWithdrawal: "Opnamekosten (1%):",
 exampleTakeHome: "Jouw netto-inkomen:",
 },
 links: {
 title: "Blijf Verkennen",
 compare: "Vergelijk Alle Platforms →",
 compareText: "Zie hoe Freelancer.com zich verhoudt tot 25+ andere marktplaatsen",
 reviews: "Lees Gebruikersreviews →",
 reviewsText: "Echte freelancer ervaringen en succesverhalen",
 calculator: "Tarievencalculator →",
 calculatorText: "Bereken competitieve prijzen voor je biedingen",
 comparisons: "Platform Vergelijkingen →",
 comparisonsText: "Gedetailleerde side-by-side vergelijkingen",
 },
 finalCta: {
 title: "Klaar om Freelancer.com te Beheersen?",
 subtitle: "Gebruik deze strategieën om meer projecten te winnen, je portfolio op te bouwen en je freelance-inkomen te laten groeien.",
 button1: "Verken Alle Platforms",
 button2: "Ontvang Wekelijkse Tips",
 },
 } : {
 badge: "Platform Deep Dive",
 title: "Freelancer.com Deep Dive: Features & Best Practices",
 subtitle: "Master Freelancer.com's unique features including contests, milestone payments, and membership tiers. Learn proven bidding strategies to win more projects and maximize earnings.",
 cta1: "Compare Platforms",
 cta2: "Read Reviews",
 statsTitle: "Users Worldwide",
 statsJobs: "Jobs Posted",
 statsContests: "Contests Held",
 statsPayout: "Total Paid Out",
 overview: {
 title: "Freelancer.com Platform Overview",
 intro: "Founded in 2009, Freelancer.com is one of the world's largest freelancing and crowdsourcing marketplaces by number of users and projects. With over 50 million registered users across 247 countries, the platform offers a unique blend of traditional project bidding and competitive contests.",
 uniqueTitle: "What Sets Freelancer.com Apart",
 unique1: "Contest Model: Unique crowdsourcing contests where freelancers compete by submitting work before getting hired",
 unique2: "Milestone Payments: Built-in escrow system with flexible milestone-based releases for project-based work",
 unique3: "Global Reach: Massive international user base creates opportunities across all skill levels and price points",
 unique4: "Skills Tests: Over 1,000 certification exams to validate expertise and boost profile credibility",
 categoriesTitle: "Popular Categories",
 cat1: "Website Development & Design",
 cat2: "Mobile App Development",
 cat3: "Content Writing & Translation",
 cat4: "Graphic Design & Branding",
 cat5: "Data Entry & Admin Support",
 cat6: "Marketing & SEO",
 bestForTitle: "Best For",
 best1: "Beginners building portfolios",
 best2: "Designers entering contests",
 best3: "International freelancers",
 best4: "High-volume bidders",
 best5: "Technical specialists",
 best6: "Budget-conscious clients",
 },
 features: {
 title: "Essential Platform Features",
 contests: {
 title: "Contests: Crowdsourcing at Scale",
 intro: "Freelancer.com pioneered the contest model where clients post a prize amount and freelancers compete by submitting completed work. The client reviews all entries and selects a winner who receives the full prize.",
 typesTitle: "Popular Contest Types:",
 type1: "Logo & Brand Identity Design",
 type2: "Website & App UI Design",
 type3: "Product Naming & Taglines",
 type4: "T-Shirt & Merchandise Design",
 type5: "Business Card & Stationery",
 benefitsTitle: "Contest Benefits:",
 benefit1: "Quick portfolio building",
 benefit2: "No upfront proposal writing",
 benefit3: "Showcase creativity directly",
 benefit4: "Build client relationships",
 benefit5: "Potential for repeat work",
 tip: "Pro Tip:",
 tipText: "Enter 3-5 contests daily early in your career to build portfolio quickly. Focus on \"Guaranteed\" contests where prizes must be awarded, and target contests with 10-30 entries for better winning odds.",
 },
 milestones: {
 title: "Milestone Payment System",
 intro: "Freelancer.com's milestone system allows you to break projects into smaller, manageable phases with payments released upon completion of each milestone. This protects both freelancers and clients while providing cash flow throughout longer projects.",
 howTitle: "How Milestone Payments Work:",
 step1: "Define Milestones: Break project into 3-7 deliverable phases with clear descriptions and amounts",
 step2: "Client Funds Escrow: Client deposits funds for first milestone (and optionally future milestones) into escrow",
 step3: "Complete & Request: Deliver milestone work and request release of payment through platform",
 step4: "Client Reviews: Client has 14 days to review and either approve or request revisions",
 step5: "Auto-Release: If client doesn't respond within 14 days, payment auto-releases to freelancer",
 },
 exams: {
 title: "Skills Tests & Certifications",
 intro: "Freelancer.com offers 1,000+ skills tests across all categories. Passing exams displays badges on your profile, increasing credibility and search ranking. Tests range from beginner to expert levels.",
 selectionTitle: "Strategic Test Selection:",
 selection1: "Take 5-10 tests in your core skills",
 selection2: "Focus on high-demand technologies",
 selection3: "Retake failed tests after studying",
 selection4: "Display top scores prominently",
 impactTitle: "Impact on Success:",
 impact1: "+40% higher profile visibility",
 impact2: "Increased bid credibility",
 impact3: "Better search ranking",
 impact4: "Justifies higher rates",
 },
 },
 midCta: {
 title: "Calculate Your Competitive Bid Pricing",
 subtitle: "Use our free rate calculator to determine optimal pricing that wins bids while maintaining profitability.",
 button: "Calculate Your Rate",
 },
 membership: {
 title: "Membership Tiers & Pricing",
 free: {
 title: "Free Membership",
 price: "$0/mo",
 feature1: "8 bids per month",
 feature2: "Basic profile features",
 feature3: "3% + $3 withdrawal fee",
 feature4: "No preferred freelancer status",
 bestFor: "Best for: Testing the platform, beginners",
 },
 plus: {
 title: "Plus Membership",
 price: "$6.95/mo",
 feature1: "100 bids per month",
 feature2: "5 skills listed in search",
 feature3: "Job email notifications",
 feature4: "1% + $1 withdrawal fee",
 bestFor: "Best for: Active freelancers, regular bidders",
 },
 professional: {
 title: "Professional",
 price: "$24.95/mo",
 badge: "POPULAR",
 feature1: "300 bids per month",
 feature2: "10 skills in search results",
 feature3: "Preferred Freelancer badge",
 feature4: "Higher search ranking",
 feature5: "1% + $1 withdrawal fee",
 bestFor: "Best for: Full-time freelancers, serious income seekers",
 },
 premier: {
 title: "Premier",
 price: "$49.95/mo",
 feature1: "500 bids per month",
 feature2: "Unlimited skills in search",
 feature3: "Premier badge & priority support",
 feature4: "Maximum search visibility",
 feature5: "1% + $1 withdrawal fee",
 bestFor: "Best for: High-volume bidders, agencies",
 },
 roiTitle: "Membership ROI Strategy",
 roiText: "Start with Plus ($6.95/mo) if bidding regularly. Upgrade to Professional ($24.95/mo) once you're landing 2-3 projects per month—the Preferred badge and higher ranking pays for itself quickly. Premier is only worth it for agencies or freelancers bidding 15+ times daily.",
 },
 bidding: {
 title: "Proven Bidding Strategies",
 pricing: {
 title: "Strategic Pricing Model",
 intro: "Freelancer.com is highly competitive with bidders from lower-cost regions. Your pricing strategy must balance competitiveness with profitability.",
 approachTitle: "The 3-Tier Pricing Approach:",
 tier1Title: "Tier 1: Entry Bids (First 10-20 projects)",
 tier1Text: "Bid 10-20% below market average to build reviews. Focus on quick-turnaround projects.",
 tier2Title: "Tier 2: Market Rate (20-100 projects)",
 tier2Text: "Bid at competitive market rates once you have 10+ five-star reviews.",
 tier3Title: "Tier 3: Premium (100+ projects)",
 tier3Text: "Charge 20-30% above market with strong portfolio and Top Rated badge.",
 },
 proposal: {
 title: "Winning Proposal Template",
 copyText: "Copy this structure for higher response rates:",
 greeting: "1. Personalized Greeting (1 sentence)",
 greetingExample: "\"Hi [Name], I noticed you need [specific requirement from project description].\"",
 understanding: "2. Demonstrate Understanding (2-3 sentences)",
 understandingExample: "\"From your description, I understand you're looking for [summarize need]. The key challenges will be [mention 1-2 specific challenges].\"",
 solution: "3. Your Solution (3-4 sentences)",
 solutionExample: "\"I'll solve this by [specific approach]. I've completed [X similar projects] including [relevant example]. You'll receive [specific deliverables] within [timeframe].\"",
 proof: "4. Proof & Portfolio (1-2 sentences)",
 proofExample: "\"Please see my portfolio showcasing [relevant work]. I maintain a [X%] completion rate and [Y] star average.\"",
 cta: "5. Call to Action (1 sentence)",
 ctaExample: "\"I'm available to start immediately. Let's discuss your project in detail.\"",
 },
 tactics: {
 title: "Advanced Bidding Tactics",
 doTitle: "✓ Do This:",
 do1: "Bid within first 3 hours of posting",
 do2: "Ask clarifying questions to show interest",
 do3: "Attach relevant portfolio samples",
 do4: "Offer a free consultation or audit",
 do5: "Propose milestone structure upfront",
 do6: "Follow up once after 48 hours",
 avoidTitle: "✗ Avoid This:",
 avoid1: "Generic copy-paste proposals",
 avoid2: "Bidding on 100+ projects daily",
 avoid3: "Extremely low bids (damages credibility)",
 avoid4: "Overpromising unrealistic timelines",
 avoid5: "Mentioning competing platforms",
 avoid6: "Multiple follow-ups (appears desperate)",
 },
 },
 fees: {
 title: "Fee Structure & Commissions",
 structure: "Platform Fees",
 commission: "Project Commission (Fixed & Hourly)",
 contest: "Contest Entry Fee (per contest)",
 withdrawal: "Withdrawal Fee (PayPal/Bank Transfer)",
 milestone: "Milestone Release Fee (client pays)",
 exampleTitle: "Real Earnings Example",
 exampleText: "A developer earning $1,000 on a fixed-price project with Professional membership:",
 examplePayment: "Project payment:",
 examplePlatform: "Platform fee (10%):",
 exampleWithdrawal: "Withdrawal fee (1%):",
 exampleTakeHome: "Your take-home:",
 },
 links: {
 title: "Continue Exploring",
 compare: "Compare All Platforms →",
 compareText: "See how Freelancer.com compares to 25+ other marketplaces",
 reviews: "Read User Reviews →",
 reviewsText: "Real freelancer experiences and success stories",
 calculator: "Rate Calculator →",
 calculatorText: "Calculate competitive pricing for your bids",
 comparisons: "Platform Comparisons →",
 comparisonsText: "Detailed side-by-side comparisons",
 },
 finalCta: {
 title: "Ready to Master Freelancer.com?",
 subtitle: "Use these strategies to win more projects, build your portfolio, and grow your freelance income.",
 button1: "Explore All Platforms",
 button2: "Get Weekly Tips",
 },
 };

 const currency = locale === "nl" ? "€" : "$";
 const currencySymbol = locale === "nl" ? "€" : "$";

 const jsonLd = {
 "@context": "https://schema.org",
 "@type": "Article",
 "headline": locale === "nl"
 ? "Freelancer.com Review: Diepgaande Platform Analyse en Best Practices"
 : "Freelancer.com Deep Dive: Platform Features and Best Practices",
 "description": locale === "nl"
 ? "Uitgebreide analyse van Freelancer.com platform kenmerken, biedstrategieën en best practices voor het winnen van projecten."
 : "Comprehensive analysis of Freelancer.com platform features, bidding strategies, and best practices for winning projects.",
 "author": {
 "@type": "Organization",
 "name": "SkillLinkup"
 },
 "publisher": {
 "@type": "Organization",
 "name": "SkillLinkup",
 "logo": {
 "@type": "ImageObject",
 "url": "https://skilllinkup.com/images/logo/skilllinkup-transparant-rozepunt.webp"
 }
 },
 "datePublished": "2026-01-15",
 "dateModified": "2026-01-15",
 "inLanguage": locale === "nl" ? "nl-NL" : "en-US"
 };

 return (
 <><script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 /><main className="flex-1">{/* Hero Section */}
 <section className="bg-gradient-to-br from-primary/10 via-white to-accent/10 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 sm:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-4xl mx-auto text-center"><div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 dark:bg-primary/30 text-primary dark:text-accent mb-6"><span className="text-sm font-heading font-semibold">{content.badge}</span></div><h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6">{content.title}
 </h1><p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{content.subtitle}
 </p><div className="flex flex-wrap justify-center gap-4"><Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-heading font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
 >{content.cta1}
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link><Link
 href={`/${locale}/reviews`}
 className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-gray-800 text-primary dark:text-accent border-2 border-primary dark:border-accent font-heading font-semibold hover:bg-primary/5 dark:hover:bg-accent/10 transition-all"
 >{content.cta2}
 </Link></div></div></div></section>{/* Quick Stats */}
 <section className="py-12 bg-white dark:bg-gray-800"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-4xl mx-auto"><div className="grid sm:grid-cols-4 gap-6"><div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 text-center border border-primary/20"><div className="text-3xl font-heading font-bold text-primary mb-2">50M+</div><div className="text-sm text-gray-600 dark:text-gray-400">{content.statsTitle}</div></div><div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 text-center border border-accent/20"><div className="text-3xl font-heading font-bold text-accent mb-2">19M+</div><div className="text-sm text-gray-600 dark:text-gray-400">{content.statsJobs}</div></div><div className="bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-xl p-6 text-center border border-secondary/20"><div className="text-3xl font-heading font-bold text-secondary mb-2">1M+</div><div className="text-sm text-gray-600 dark:text-gray-400">{content.statsContests}</div></div><div className="bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-xl p-6 text-center border border-primary/20"><div className="text-3xl font-heading font-bold text-primary mb-2">{currencySymbol}6B+</div><div className="text-sm text-gray-600 dark:text-gray-400">{content.statsPayout}</div></div></div></div></div></section>{/* Main Content */}
 <article className="py-16 bg-gray-50 dark:bg-gray-900"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-4xl mx-auto">{/* Platform Overview */}
 <section className="mb-16"><div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"><h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">{content.overview.title}
 </h2><p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{content.overview.intro}
 </p><div className="bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-xl p-6 border-l-4 border-primary mb-8"><h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">{content.overview.uniqueTitle}
 </h3><ul className="space-y-3 text-gray-700 dark:text-gray-300"><li className="flex items-start gap-3"><span className="text-accent text-xl mt-1">→</span><div><strong className="text-gray-900 dark:text-white">Contest Model:</strong>{content.overview.unique1.split(': ')[1]}</div></li><li className="flex items-start gap-3"><span className="text-accent text-xl mt-1">→</span><div><strong className="text-gray-900 dark:text-white">Milestone Payments:</strong>{content.overview.unique2.split(': ')[1]}</div></li><li className="flex items-start gap-3"><span className="text-accent text-xl mt-1">→</span><div><strong className="text-gray-900 dark:text-white">Global Reach:</strong>{content.overview.unique3.split(': ')[1]}</div></li><li className="flex items-start gap-3"><span className="text-accent text-xl mt-1">→</span><div><strong className="text-gray-900 dark:text-white">Skills Tests:</strong>{content.overview.unique4.split(': ')[1]}</div></li></ul></div><div className="grid sm:grid-cols-2 gap-6"><div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6"><h4 className="font-heading font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">{content.overview.categoriesTitle}
 </h4><ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300"><li>• {content.overview.cat1}</li><li>• {content.overview.cat2}</li><li>• {content.overview.cat3}</li><li>• {content.overview.cat4}</li><li>• {content.overview.cat5}</li><li>• {content.overview.cat6}</li></ul></div><div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6"><h4 className="font-heading font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">{content.overview.bestForTitle}
 </h4><ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300"><li>• {content.overview.best1}</li><li>• {content.overview.best2}</li><li>• {content.overview.best3}</li><li>• {content.overview.best4}</li><li>• {content.overview.best5}</li><li>• {content.overview.best6}</li></ul></div></div></div></section>{/* Key Features */}
 <section className="mb-16"><div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"><h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">{content.features.title}
 </h2><div className="space-y-8">{/* Contests */}
 <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 dark:from-secondary/10 dark:to-secondary/20 rounded-xl p-6 border-l-4 border-secondary"><h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">{content.features.contests.title}
 </h3><p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{content.features.contests.intro}
 </p><div className="grid sm:grid-cols-2 gap-4 mb-4"><div className="bg-white dark:bg-gray-900 rounded-lg p-4"><h4 className="font-heading font-bold text-gray-900 dark:text-white mb-2 text-sm">{content.features.contests.typesTitle}</h4><ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300"><li>• {content.features.contests.type1}</li><li>• {content.features.contests.type2}</li><li>• {content.features.contests.type3}</li><li>• {content.features.contests.type4}</li><li>• {content.features.contests.type5}</li></ul></div><div className="bg-white dark:bg-gray-900 rounded-lg p-4"><h4 className="font-heading font-bold text-gray-900 dark:text-white mb-2 text-sm">{content.features.contests.benefitsTitle}</h4><ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300"><li>• {content.features.contests.benefit1}</li><li>• {content.features.contests.benefit2}</li><li>• {content.features.contests.benefit3}</li><li>• {content.features.contests.benefit4}</li><li>• {content.features.contests.benefit5}</li></ul></div></div><div className="bg-accent/10 dark:bg-accent/20 rounded-lg p-4"><p className="text-sm font-heading font-bold text-gray-900 dark:text-white mb-2">{content.features.contests.tip}</p><p className="text-sm text-gray-700 dark:text-gray-300">{content.features.contests.tipText}
 </p></div></div>{/* Milestone Payments */}
 <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6 border-l-4 border-accent"><h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">{content.features.milestones.title}
 </h3><p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{content.features.milestones.intro}
 </p><div className="bg-white dark:bg-gray-900 rounded-lg p-6"><h4 className="font-heading font-bold text-gray-900 dark:text-white mb-4">{content.features.milestones.howTitle}</h4><ol className="space-y-3 text-gray-700 dark:text-gray-300"><li className="flex items-start gap-3"><span className="font-bold text-accent">1.</span><div>{content.features.milestones.step1}</div></li><li className="flex items-start gap-3"><span className="font-bold text-accent">2.</span><div>{content.features.milestones.step2}</div></li><li className="flex items-start gap-3"><span className="font-bold text-accent">3.</span><div>{content.features.milestones.step3}</div></li><li className="flex items-start gap-3"><span className="font-bold text-accent">4.</span><div>{content.features.milestones.step4}</div></li><li className="flex items-start gap-3"><span className="font-bold text-accent">5.</span><div>{content.features.milestones.step5}</div></li></ol></div></div>{/* Exams & Certifications */}
 <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 border-l-4 border-primary"><h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">{content.features.exams.title}
 </h3><p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{content.features.exams.intro}
 </p><div className="grid sm:grid-cols-2 gap-4"><div className="bg-white dark:bg-gray-900 rounded-lg p-4"><h4 className="font-heading font-bold text-gray-900 dark:text-white mb-2 text-sm">{content.features.exams.selectionTitle}</h4><ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300"><li className="flex items-start gap-2"><span className="text-accent">→</span><span>{content.features.exams.selection1}</span></li><li className="flex items-start gap-2"><span className="text-accent">→</span><span>{content.features.exams.selection2}</span></li><li className="flex items-start gap-2"><span className="text-accent">→</span><span>{content.features.exams.selection3}</span></li><li className="flex items-start gap-2"><span className="text-accent">→</span><span>{content.features.exams.selection4}</span></li></ul></div><div className="bg-white dark:bg-gray-900 rounded-lg p-4"><h4 className="font-heading font-bold text-gray-900 dark:text-white mb-2 text-sm">{content.features.exams.impactTitle}</h4><ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300"><li className="flex items-start gap-2"><span className="text-primary">✓</span><span>{content.features.exams.impact1}</span></li><li className="flex items-start gap-2"><span className="text-primary">✓</span><span>{content.features.exams.impact2}</span></li><li className="flex items-start gap-2"><span className="text-primary">✓</span><span>{content.features.exams.impact3}</span></li><li className="flex items-start gap-2"><span className="text-primary">✓</span><span>{content.features.exams.impact4}</span></li></ul></div></div></div></div></div></section>{/* CTA Mid-Article */}
 <div className="mb-16"><div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-center shadow-2xl"><h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4">{content.midCta.title}
 </h3><p className="text-white/90 mb-6 max-w-2xl mx-auto">{content.midCta.subtitle}
 </p><Link
 href={`/${locale}/tools/rate-calculator`}
 className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-primary font-heading font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl text-lg"
 >{content.midCta.button}
 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg></Link></div></div>{/* Membership Tiers */}
 <section className="mb-16"><div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"><h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">{content.membership.title}
 </h2><div className="space-y-6"><div className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border-2 border-gray-300 dark:border-gray-600"><div className="flex items-center justify-between mb-4"><h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">{content.membership.free.title}</h3><span className="text-3xl font-heading font-bold text-gray-600 dark:text-gray-400">{content.membership.free.price}</span></div><ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm mb-4"><li className="flex items-center gap-2"><span className="text-accent">✓</span>{content.membership.free.feature1}</li><li className="flex items-center gap-2"><span className="text-accent">✓</span>{content.membership.free.feature2}</li><li className="flex items-center gap-2"><span className="text-accent">✓</span>{content.membership.free.feature3}</li><li className="flex items-center gap-2"><span className="text-red-500">✗</span>{content.membership.free.feature4}</li></ul><p className="text-xs text-gray-600 dark:text-gray-400">{content.membership.free.bestFor}</p></div><div className="bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-6 border-2 border-blue-500"><div className="flex items-center justify-between mb-4"><h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">{content.membership.plus.title}</h3><span className="text-3xl font-heading font-bold text-blue-600">{content.membership.plus.price}</span></div><ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm mb-4"><li className="flex items-center gap-2"><span className="text-accent">✓</span>{content.membership.plus.feature1}</li><li className="flex items-center gap-2"><span className="text-accent">✓</span>{content.membership.plus.feature2}</li><li className="flex items-center gap-2"><span className="text-accent">✓</span>{content.membership.plus.feature3}</li><li className="flex items-center gap-2"><span className="text-accent">✓</span>{content.membership.plus.feature4}</li></ul><p className="text-xs text-gray-600 dark:text-gray-400">{content.membership.plus.bestFor}</p></div><div className="bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-xl p-6 border-2 border-yellow-500 relative overflow-hidden"><div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-heading font-bold">{content.membership.professional.badge}</div><div className="flex items-center justify-between mb-4"><h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">{content.membership.professional.title}</h3><span className="text-3xl font-heading font-bold text-yellow-600">{content.membership.professional.price}</span></div><ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm mb-4"><li className="flex items-center gap-2"><span className="text-accent">✓</span>{content.membership.professional.feature1}</li><li className="flex items-center gap-2"><span className="text-accent">✓</span>{content.membership.professional.feature2}</li><li className="flex items-center gap-2"><span className="text-accent">✓</span>{content.membership.professional.feature3}</li><li className="flex items-center gap-2"><span className="text-accent">✓</span>{content.membership.professional.feature4}</li><li className="flex items-center gap-2"><span className="text-accent">✓</span>{content.membership.professional.feature5}</li></ul><p className="text-xs text-gray-600 dark:text-gray-400">{content.membership.professional.bestFor}</p></div><div className="bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-6 border-2 border-purple-500"><div className="flex items-center justify-between mb-4"><h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">{content.membership.premier.title}</h3><span className="text-3xl font-heading font-bold text-purple-600">{content.membership.premier.price}</span></div><ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm mb-4"><li className="flex items-center gap-2"><span className="text-accent">✓</span>{content.membership.premier.feature1}</li><li className="flex items-center gap-2"><span className="text-accent">✓</span>{content.membership.premier.feature2}</li><li className="flex items-center gap-2"><span className="text-accent">✓</span>{content.membership.premier.feature3}</li><li className="flex items-center gap-2"><span className="text-accent">✓</span>{content.membership.premier.feature4}</li><li className="flex items-center gap-2"><span className="text-accent">✓</span>{content.membership.premier.feature5}</li></ul><p className="text-xs text-gray-600 dark:text-gray-400">{content.membership.premier.bestFor}</p></div></div><div className="mt-6 bg-accent/10 dark:bg-accent/20 rounded-xl p-6 border-l-4 border-accent"><h4 className="font-heading font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">{content.membership.roiTitle}
 </h4><p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{content.membership.roiText}
 </p></div></div></section>{/* Bidding Strategies */}
 <section className="mb-16"><div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"><h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">{content.bidding.title}
 </h2><div className="space-y-8"><div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6"><h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">{content.bidding.pricing.title}
 </h3><p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{content.bidding.pricing.intro}
 </p><div className="bg-white dark:bg-gray-900 rounded-lg p-6"><h4 className="font-heading font-bold text-gray-900 dark:text-white mb-3">{content.bidding.pricing.approachTitle}</h4><div className="space-y-4"><div className="border-l-4 border-accent pl-4"><p className="font-bold text-gray-900 dark:text-white mb-1">{content.bidding.pricing.tier1Title}</p><p className="text-sm text-gray-700 dark:text-gray-300">{content.bidding.pricing.tier1Text}</p></div><div className="border-l-4 border-primary pl-4"><p className="font-bold text-gray-900 dark:text-white mb-1">{content.bidding.pricing.tier2Title}</p><p className="text-sm text-gray-700 dark:text-gray-300">{content.bidding.pricing.tier2Text}</p></div><div className="border-l-4 border-secondary pl-4"><p className="font-bold text-gray-900 dark:text-white mb-1">{content.bidding.pricing.tier3Title}</p><p className="text-sm text-gray-700 dark:text-gray-300">{content.bidding.pricing.tier3Text}</p></div></div></div></div><div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6"><h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">{content.bidding.proposal.title}
 </h3><div className="bg-white dark:bg-gray-900 rounded-lg p-6"><p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{content.bidding.proposal.copyText}</p><div className="space-y-4 text-sm"><div><p className="font-bold text-gray-900 dark:text-white mb-1">{content.bidding.proposal.greeting}</p><p className="text-gray-700 dark:text-gray-300 italic">{content.bidding.proposal.greetingExample}</p></div><div><p className="font-bold text-gray-900 dark:text-white mb-1">{content.bidding.proposal.understanding}</p><p className="text-gray-700 dark:text-gray-300 italic">{content.bidding.proposal.understandingExample}</p></div><div><p className="font-bold text-gray-900 dark:text-white mb-1">{content.bidding.proposal.solution}</p><p className="text-gray-700 dark:text-gray-300 italic">{content.bidding.proposal.solutionExample}</p></div><div><p className="font-bold text-gray-900 dark:text-white mb-1">{content.bidding.proposal.proof}</p><p className="text-gray-700 dark:text-gray-300 italic">{content.bidding.proposal.proofExample}</p></div><div><p className="font-bold text-gray-900 dark:text-white mb-1">{content.bidding.proposal.cta}</p><p className="text-gray-700 dark:text-gray-300 italic">{content.bidding.proposal.ctaExample}</p></div></div></div></div><div className="bg-gradient-to-br from-secondary/5 to-secondary/10 dark:from-secondary/10 dark:to-secondary/20 rounded-xl p-6"><h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">{content.bidding.tactics.title}
 </h3><div className="grid sm:grid-cols-2 gap-6"><div><h4 className="font-heading font-bold text-accent mb-3">{content.bidding.tactics.doTitle}</h4><ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300"><li>• {content.bidding.tactics.do1}</li><li>• {content.bidding.tactics.do2}</li><li>• {content.bidding.tactics.do3}</li><li>• {content.bidding.tactics.do4}</li><li>• {content.bidding.tactics.do5}</li><li>• {content.bidding.tactics.do6}</li></ul></div><div><h4 className="font-heading font-bold text-primary mb-3">{content.bidding.tactics.avoidTitle}</h4><ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300"><li>• {content.bidding.tactics.avoid1}</li><li>• {content.bidding.tactics.avoid2}</li><li>• {content.bidding.tactics.avoid3}</li><li>• {content.bidding.tactics.avoid4}</li><li>• {content.bidding.tactics.avoid5}</li><li>• {content.bidding.tactics.avoid6}</li></ul></div></div></div></div></div></section>{/* Fees & Commissions */}
 <section className="mb-16"><div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"><h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">{content.fees.title}
 </h2><div className="space-y-6"><div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6"><h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">{content.fees.structure}</h3><div className="space-y-3"><div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700"><span className="text-gray-700 dark:text-gray-300">{content.fees.commission}</span><span className="font-heading font-bold text-primary">10%</span></div><div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700"><span className="text-gray-700 dark:text-gray-300">{content.fees.contest}</span><span className="font-heading font-bold text-primary">{currencySymbol}0-5</span></div><div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700"><span className="text-gray-700 dark:text-gray-300">{content.fees.withdrawal}</span><span className="font-heading font-bold text-primary">1-3%</span></div><div className="flex justify-between items-center py-3"><span className="text-gray-700 dark:text-gray-300">{content.fees.milestone}</span><span className="font-heading font-bold text-accent">{currencySymbol}0</span></div></div></div><div className="bg-accent/10 dark:bg-accent/20 rounded-xl p-6 border-l-4 border-accent"><h4 className="font-heading font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">{content.fees.exampleTitle}
 </h4><p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{content.fees.exampleText}
 </p><div className="bg-white dark:bg-gray-900 rounded-lg p-4 space-y-2 text-sm font-mono"><div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">{content.fees.examplePayment}</span><span className="text-gray-900 dark:text-white font-bold">{currencySymbol}1,000</span></div><div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">{content.fees.examplePlatform}</span><span className="text-red-600 dark:text-red-400">-{currencySymbol}100</span></div><div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">{content.fees.exampleWithdrawal}</span><span className="text-red-600 dark:text-red-400">-{currencySymbol}9</span></div><div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2"><span className="text-gray-900 dark:text-white font-bold">{content.fees.exampleTakeHome}</span><span className="text-accent font-bold text-lg">{currencySymbol}891</span></div></div></div></div></div></section>{/* Internal Links */}
 <section className="mb-16"><h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6">{content.links.title}</h2><div className="grid sm:grid-cols-2 gap-6"><Link href={`/${locale}/platforms`} className="group bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 hover:shadow-lg transition-all border border-primary/20"><h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{content.links.compare}
 </h3><p className="text-gray-600 dark:text-gray-400 text-sm">{content.links.compareText}
 </p></Link><Link href={`/${locale}/reviews`} className="group bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 hover:shadow-lg transition-all border border-accent/20"><h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent transition-colors">{content.links.reviews}
 </h3><p className="text-gray-600 dark:text-gray-400 text-sm">{content.links.reviewsText}
 </p></Link><Link href={`/${locale}/tools/rate-calculator`} className="group bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-xl p-6 hover:shadow-lg transition-all border border-secondary/20"><h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-secondary transition-colors">{content.links.calculator}
 </h3><p className="text-gray-600 dark:text-gray-400 text-sm">{content.links.calculatorText}
 </p></Link><Link href={`/${locale}/comparisons`} className="group bg-gradient-to-br from-accent/10 to-primary/10 dark:from-accent/20 dark:to-primary/20 rounded-xl p-6 hover:shadow-lg transition-all border border-accent/20"><h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{content.links.comparisons}
 </h3><p className="text-gray-600 dark:text-gray-400 text-sm">{content.links.comparisonsText}
 </p></Link></div></section></div></div></article>{/* Final CTA */}
 <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-4xl mx-auto text-center"><h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-6">{content.finalCta.title}
 </h2><p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">{content.finalCta.subtitle}
 </p><div className="flex flex-wrap justify-center gap-4"><Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-white font-heading font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
 >{content.finalCta.button1}
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link><Link
 href={`/${locale}/newsletter`}
 className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white dark:bg-gray-800 text-primary dark:text-accent border-2 border-primary dark:border-accent font-heading font-bold hover:bg-primary/5 dark:hover:bg-accent/10 transition-all"
 >{content.finalCta.button2}
 </Link></div></div></div></section></main></>);
}
