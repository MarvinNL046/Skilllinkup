import { Metadata } from 'next';
import Link from 'next/link';
import { AdWidget } from '@/components/AdWidget';
import { Eye, Star, TrendingUp, CheckCircle, ArrowRight, Zap, Users, Target, Award } from 'lucide-react';

export async function generateMetadata({
 params
}: {
 params: Promise<{ locale: string }>
}): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'opvallen-op-freelance-platforms';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/succes-strategieen/${slug}`;

 if (locale === 'nl') {
 return {
 title: 'Opvallen op Freelance Platforms: Word Opgemerkt tussen de Massa',
 description: 'Word opgemerkt op drukke freelance platforms. Bewezen strategieën om je zichtbaarheid te verhogen, meer klanten aan te trekken en jezelf te onderscheiden van 1000+ concurrenten.',
 keywords: 'opvallen freelance platform, zichtbaarheid vergroten, profileren freelancer, opvallen tussen concurrenten, freelance marketing',
 openGraph: {
 title: 'Opvallen op Freelance Platforms: Word Opgemerkt tussen de Massa',
 description: 'Word opgemerkt op drukke freelance platforms met bewezen strategieën voor meer zichtbaarheid.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/resources-og.png`,
 width: 1200,
 height: 630,
 alt: 'Opvallen op Freelance Platforms',
 }
 ],
 locale: 'nl_NL',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Opvallen op Freelance Platforms: Word Opgemerkt tussen de Massa',
 description: 'Word opgemerkt op drukke freelance platforms. Bewezen strategieën om je zichtbaarheid te verhogen, meer klanten aan te trekken en jezelf te onderscheiden van 1000+ concurrenten.',
 images: [`${siteUrl}/images/og/resources-og.png`],
 creator: '@SkillLinkup',
 site: '@SkillLinkup',
 },
 alternates: {
 canonical: pageUrl,
 languages: {
 'nl': pageUrl,
 },
 },
 robots: {
 index: true,
 follow: true,
 googleBot: {
 index: true,
 follow: true,
 'max-video-preview': -1,
 'max-image-preview': 'large',
 'max-snippet': -1,
 },
 },
 };
 }

 return {
 title: 'Stand Out on Freelance Platforms: Get Noticed Above the Noise',
 description: 'Get noticed on crowded freelance platforms. Proven strategies to increase visibility, attract more clients, and differentiate yourself from 1000+ competitors.',
 keywords: 'stand out freelance platform, increase visibility, freelancer branding, compete freelancers, freelance marketing',
 openGraph: {
 title: 'Stand Out on Freelance Platforms: Get Noticed Above the Noise',
 description: 'Get noticed on crowded freelance platforms with proven visibility strategies.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/resources-og.png`,
 width: 1200,
 height: 630,
 alt: 'Stand Out on Freelance Platforms',
 }
 ],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Stand Out on Freelance Platforms: Get Noticed Above the Noise',
 description: 'Get noticed on crowded freelance platforms. Proven strategies to increase visibility, attract more clients, and differentiate yourself from 1000+ competitors.',
 images: [`${siteUrl}/images/og/resources-og.png`],
 creator: '@SkillLinkup',
 site: '@SkillLinkup',
 },
 alternates: {
 canonical: pageUrl,
 languages: {
 'en': pageUrl,
 },
 },
 robots: {
 index: true,
 follow: true,
 googleBot: {
 index: true,
 follow: true,
 'max-video-preview': -1,
 'max-image-preview': 'large',
 'max-snippet': -1,
 },
 },
 };
}

export default async function OpvallenOpFreelancePlatforms({
 params
}: {
 params: Promise<{ locale: string }>;
}) {
 const { locale } = await params;

 const content = locale === 'nl' ? {
 hero: {
 title: "Opvallen op Freelance Platforms: Word Opgemerkt tussen de Massa",
 subtitle: "Freelance platforms zijn verzadigd. 1000+ freelancers vechten voor dezelfde projecten. Maar de top 5% krijgt 80% van het werk. Deze gids onthult exact hoe je jezelf differentieert, je zichtbaarheid verhoogt en meer premium klanten aantrekt—zelfs als je net begint.",
 cta1: "Start Jouw Succes",
 cta2: "Leer Bieden"
 },
 stats: {
 visibility: "300% Hogere Zichtbaarheid",
 visibilityDesc: "Met strategische profilering",
 invites: "5x Meer Uitnodigingen",
 invitesDesc: "Van premium klanten",
 competition: "Top 5% Freelancers",
 competitionDesc: "Krijgt 80% van het werk"
 },
 intro: {
 title: "Waarom de Meeste Freelancers Onzichtbaar Blijven",
 text: "Elk uur komen er 100+ nieuwe freelancers bij op populaire platforms. De gemiddelde klant ziet slechts de eerste 10-20 profielen in zoekresultaten. Als je niet in die top staat, ben je praktisch onzichtbaar. Het goede nieuws? Platform zichtbaarheid is geen geluk—het is een strategie. En die strategie kun je vandaag nog implementeren.",
 challenge: "De Zichtbaarheids Challenge",
 challengeText: "Upwork alleen al heeft 18+ miljoen freelancers. Fiverr heeft 4+ miljoen actieve verkopers. Freelancer.com telt 60+ miljoen gebruikers. Hoe val je op tussen miljoenen concurrenten? Door de platform algorithmes te begrijpen en strategisch te optimaliseren voor wat ze belonen."
 },
 section1: {
 title: "Platform Algoritme Optimalisatie: Word Zichtbaar in Zoekresultaten",
 intro: "Elk freelance platform heeft een algoritme dat bepaalt welke profielen bovenaan verschijnen in zoekresultaten. Snap je het algoritme, dan kun je het spel winnen. Negeer je het, dan blijf je onzichtbaar.",
 strategy1: {
 title: "1. Response Rate & Tijd: Het #1 Ranking Factor",
 text: "Alle grote platforms (Upwork, Fiverr, Freelancer) geven prioriteit aan freelancers met hoge response rates en snelle reactietijden. Waarom? Omdat platforms meer geld verdienen wanneer deals snel tot stand komen.",
 metrics: "Target Metrics voor Top Rankings:",
 list: [
 "Response Rate: >90% (beantwoord alle aanvragen, ook als je niet geïnteresseerd bent)",
 "Response Time: <2 uur gemiddeld (stel notificaties in op je telefoon)",
 "Proposal Acceptance: >30% (selecteer projecten waar je kans maakt)",
 "Project Completion: >95% (alleen accepteer wat je zeker kunt leveren)"
 ],
 tip: "Pro Tip: Snelheid Wint",
 tipText: "Zet push notificaties aan voor nieuwe projecten in jouw niche. De eerste 5 proposals hebben 3x hogere kans om geselecteerd te worden. Snelheid + kwaliteit = meer wins."
 },
 strategy2: {
 title: "2. Profile Completeness Score: Maximaliseer je Score",
 text: "Incomplete profielen worden automatisch lager gerankt. Platforms willen professionele, betrouwbare freelancers tonen aan klanten. Een 100% compleet profiel is non-negotiable.",
 checklist: "100% Complete Profile Checklist:",
 items: [
 "Professionele profielfoto (geen selfie, geen groepsfoto)",
 "Uitgebreide bio (300+ woorden, keyword-rich)",
 "Portfolio met minimaal 5-8 stukken werk",
 "Complete skill lijst (alle relevante skills toegevoegd)",
 "Verified payment method en email",
 "Video introductie (platforms geven +10-15% boost)",
 "Certifications en diploma's geüpload",
 "Hourly rate of package pricing ingesteld"
 ]
 },
 strategy3: {
 title: "3. Keyword Optimization: Match Klant Zoekopdrachten",
 text: "Klanten zoeken met specifieke keywords. Als jouw profiel die keywords niet bevat, kom je niet in hun resultaten. Maar je moet slim zijn—keyword stuffing werkt averechts.",
 approach: "Strategic Keyword Placement:",
 locations: [
 "Profile Title: Primaire keyword + specialisatie (bijv. 'WordPress Developer | E-commerce Specialist')",
 "Bio Opening: 2-3 belangrijkste keywords in eerste 50 woorden",
 "Skills Section: Alle relevante tools, frameworks, technieken",
 "Portfolio Titles: Keyword-rich project titles",
 "Work History: Keywords in project beschrijvingen",
 "Certifications: Voeg certificaten toe voor credibility signals"
 ],
 research: "Keyword Research Methode:",
 researchText: "Ga naar het platform's project search. Typ in wat klanten zouden zoeken voor jouw service. Analyseer de top 10 resultaten—welke keywords gebruiken ze? Welke skills highlighten ze? Adopteer bewezen patterns, maar kopieer niet letterlijk."
 }
 },
 section2: {
 title: "Personal Branding Strategieën: Onderscheid Je van de Massa",
 intro: "Iedereen op het platform claimt 'expert' en 'hoogwaardig werk' te zijn. Maar weinigen tonen daadwerkelijk wat hen uniek maakt. Personal branding gaat niet over opscheppen—het gaat over duidelijk maken waarom klanten specifiek jou zouden moeten kiezen.",
 brand1: {
 title: "Specialiseer in een Winstgevende Niche",
 text: "Generalisten verdrinken in de concurrentie. Specialisten worden gezocht. Maar niet elke niche is winstgevend. Je moet de sweet spot vinden: vraag + waarde + passie.",
 formula: "Niche Selection Formula:",
 formulaText: "Jouw ideale niche ligt op het snijpunt van: (1) Markt Vraag - genoeg klanten zoeken deze service, (2) Hoge Waarde - klanten betalen premium prijzen, (3) Jouw Expertise - je bent echt goed in dit vakgebied. Voorbeelden: Shopify migration specialist, healthcare content writer, SaaS email automation expert.",
 examples: "Niche Positioning Voorbeelden:",
 list: [
 "❌ Generic: 'Web Designer' → ✅ Specific: 'Conversion-focused Landing Page Designer voor SaaS Startups'",
 "❌ Generic: 'Writer' → ✅ Specific: 'Healthcare SEO Content Specialist | Rank Higher, Convert More'",
 "❌ Generic: 'Developer' → ✅ Specific: 'WordPress to Headless Migration Expert | Shopify & WooCommerce'"
 ]
 },
 brand2: {
 title: "Ontwikkel een Signature Process of Methodology",
 text: "Premium klanten betalen niet alleen voor deliverables—ze betalen voor zekerheid. Een signature process communiceert dat je dit al 100x hebt gedaan en exact weet hoe je resultaten levert.",
 process: "Signature Process Voorbeeld (UX Designer):",
 steps: [
 "Discovery Workshop: Diepgaande sessie om doelen, gebruikers en pijnpunten te begrijpen",
 "Competitive Analysis: Analyseer wat concurrenten goed/slecht doen",
 "User Journey Mapping: Visualiseer de complete user experience",
 "Wireframe Iterations: 2-3 rondes wireframes met client feedback",
 "Visual Design: High-fidelity mockups met brand identity",
 "Usability Testing: Test met echte gebruikers voor validatie",
 "Developer Handoff: Complete design specs + support tijdens implementatie"
 ],
 benefit: "Waarom Dit Werkt:",
 benefitText: "Klanten zien exact wat ze krijgen, wanneer, en waarom elke stap belangrijk is. Dit elimineert onzekerheid en rechtvaardigt premium pricing. Bonus: je kunt deze process showcasen in je portfolio met visuele diagrams."
 },
 brand3: {
 title: "Leverage Social Proof Strategisch",
 text: "90% van klanten leest reviews voordat ze contact opnemen. Maar niet alle social proof is gelijk. Je moet strategisch zijn over welke testimonials je highlight en waar.",
 hierarchy: "Social Proof Hierarchy:",
 levels: [
 "Level 1 - Numbers: '500+ Projecten Voltooid | 98% Job Success Score | Top Rated Seller'",
 "Level 2 - Logos: Herkenbare bedrijven waar je voor werkt (vraag toestemming)",
 "Level 3 - Testimonials: Quotes van klanten die specifieke resultaten noemen",
 "Level 4 - Case Studies: Volledige project stories met voor/na data",
 "Level 5 - Video Testimonials: Klanten die je op camera aanbevelen (ultieme trust signal)"
 ],
 ask: "Hoe Vraag Je om Testimonials?",
 askText: "Timing is alles. Vraag direct na project afronding, wanneer de klant nog enthousiast is. Template: 'Hey [Naam], ik ben zo blij dat je tevreden bent met [project]! Zou je een korte review willen schrijven over je ervaring? Het helpt me enorm om meer klanten zoals jij aan te trekken. Specifiek zou ik graag willen dat je [resultaat of proces aspect] noemt.' 70% zegt ja als je het zo vraagt."
 }
 },
 section3: {
 title: "Tactical Visibility Hacks: Praktische Technieken die Werken",
 intro: "Naast lange-termijn strategie zijn er tactical hacks die je zichtbaarheid direct boosten. Sommige werken op alle platforms, andere zijn platform-specifiek.",
 hack1: {
 title: "De Dagelijkse Activity Boost",
 text: "Platform algoritmes belonen activiteit. Hoe meer je betrokken bent, hoe hoger je rankt. Maar je moet de juiste soort activiteit genereren.",
 schedule: "Daily Activity Routine (15-20 min/dag):",
 tasks: [
 "Log in elke dag op hetzelfde tijdstip (consistency signaleert serieuze freelancer)",
 "Update je 'availability status' naar online/available",
 "Beantwoord alle berichten binnen 2 uur",
 "Submit 2-3 proposals (kwaliteit >kwantiteit)",
 "Update één portfolio piece of voeg nieuwe skill toe",
 "Engage in platform communities (upvote, comment op discussies)"
 ]
 },
 hack2: {
 title: "Platform-Specific Badges & Certifications",
 text: "Elk platform heeft eigen badge systemen. Deze badges zijn niet alleen ego-boost—ze beïnvloeden direct je ranking en klant vertrouwen.",
 upwork: "Upwork Badges:",
 upworkList: [
 "Top Rated (vereist 90%+ JSS, $1000+ earnings, 100% completion): +25% proposal visibility",
 "Top Rated Plus (invitation only): front page visibility boost",
 "Rising Talent (eerste 3 maanden, good performance): compete met ervaren freelancers"
 ],
 fiverr: "Fiverr Levels:",
 fiverrList: [
 "Level 1 Seller (60 dagen, $400 revenue, 90% rating): algorithm boost",
 "Level 2 Seller (120 dagen, $2000 revenue, 95% rating): extra gig slots",
 "Top Rated Seller (invitation): homepage features, priority support"
 ]
 },
 hack3: {
 title: "Strategic Pricing voor Visibility",
 text: "Pricing beïnvloedt je ranking. Te laag suggereert low quality. Te hoog filtert je uit zoekresultaten. De sweet spot? Midrange met strategische upsells.",
 pricing: "Visibility-Optimized Pricing Strategy:",
 strategy: [
 "Starter Package: Competitief geprijsd voor volume en reviews (20-30% onder marktgemiddelde)",
 "Standard Package: Waar je eigenlijke profit zit (op of net boven marktgemiddelde)",
 "Premium Package: High-margin upsell voor klanten die zekerheid willen (50-100% boven standard)",
 "Add-ons: Extra's die je margin verhogen zonder pricing te verhogen"
 ],
 psychology: "Pricing Psychology:",
 psychologyText: "Klanten filteren vaak op budget range. Prijs jezelf net binnen die range, maar differentieer op waarde. Bijv. in plaats van '$50/uur generalist', positioneer als '$55/uur + gratis revision + 48uur delivery' specialist."
 }
 },
 section4: {
 title: "Content Marketing op Platforms: Bouw Autoriteit & Trek Inbound Leads",
 intro: "De meeste freelancers reageren alleen op projecten. De top 5% creëert content die klanten naar hen toe trekt. Platform content marketing is één van de meest ondergewaardeerde strategieën.",
 content1: {
 title: "Platform Blog/Forum Strategie",
 text: "Upwork, Freelancer, en andere platforms hebben community sectiesblogs, forums, Q&A. Weinigen gebruiken ze. Dat is jouw kans.",
 approach: "Content Approach:",
 steps: [
 "Beantwoord vragen in jouw niche (bijv. Upwork Community, Fiverr Forum)",
 "Schrijf helpful, gedetailleerde antwoorden (geen sales pitch)",
 "Voeg links toe naar relevante portfolio stukken als voorbeelden",
 "Wees consistent—post 2-3x per week",
 "Positioneer jezelf als expert door waarde te geven, niet te verkopen"
 ],
 benefit: "Waarom Dit Werkt:",
 benefitText: "Klanten zien je helpen anderen. Ze denken: 'Als hij zoveel gratis deelt, wat kan hij dan doen als ik hem betaal?' Je bouwt vertrouwen voordat ze zelfs contact opnemen. Plus, platform algoritmes belonen community engagement met hogere rankings."
 },
 content2: {
 title: "Portfolio als Content Hub",
 text: "Je portfolio is niet alleen werk tonen—het is een content marketing asset. Elk portfolio stuk kan een mini case study zijn die klanten educa, inspireert én converteert.",
 template: "Content-Rich Portfolio Piece Template:",
 sections: [
 "Hero Visual: High-impact afbeelding die de transformatie toont",
 "Client Challenge: Wat was het probleem? Waarom kwam de klant naar jou?",
 "Your Solution: Niet wat je maakte, maar hoe je dacht en welke beslissingen je nam",
 "Process Visuals: Screenshots van je workflow, sketches, iterations",
 "Results Data: Harde cijfers (conversie +47%, tijd bespaard 20 uur/week, omzet +€50K)",
 "Client Testimonial: Quote die specifieke waarde noemt",
 "CTA: 'Need Similar Results? Let's Talk' met link naar je profiel"
 ]
 },
 content3: {
 title: "Video Content: De Ultieme Differentiator",
 text: "<5% van freelancers gebruikt video. Maar video verhoogt conversie met 80%. Het hoeft geen Hollywood productie te zijn—authenticiteit wint.",
 videos: "Video Content Types:",
 types: [
 "Profile Intro Video: 60-90 seconden, wie je bent, wat je doet, waarom clients met jou werken",
 "Portfolio Walkthroughs: Screen recording waarin je een project uitlegt (3-5 min)",
 "Process Explainers: Laat zien hoe je werkt met tools (builds trust)",
 "Client Testimonials: Vraag tevreden klanten om korte video review (goud waard)",
 "Quick Tips: Wekelijkse 1-min tips in jouw niche (builds following)"
 ],
 equipment: "Equipment Nodig:",
 equipmentText: "Smartphone + goede verlichting (€30 ringlight) + gratis editing app (CapCut/iMovie). Klaar. Focus op waarde, niet op productie kwaliteit. Klanten willen expertise zien, geen cinematografie."
 }
 },
 section5: {
 title: "Netwerkstrategieën: Relaties die Je Naar de Top Brengen",
 intro: "Opvallen gaat niet alleen over wat je doet—het gaat ook om wie je kent. Netwerken op freelance platforms is anders dan traditioneel netwerken. Hier is hoe je het doet.",
 network1: {
 title: "Collaboratie over Competitie",
 text: "Je concurrenten kunnen je beste allies zijn. Premium klanten vragen vaak om meer werk dan één freelancer aankan. Dat is jouw kans.",
 strategy: "Collaboration Strategy:",
 steps: [
 "Identificeer non-competing freelancers in gerelateerde niches (designer + developer + copywriter)",
 "Bouw relaties door hun werk te complimenteren en te endorsen",
 "Stel voor om elkaar te refereren voor overflow werk",
 "Maak een 'preferred partners' list van betrouwbare freelancers",
 "Bied samen packages aan (bijv. 'Complete Website: Design + Development + Copywriting')"
 ],
 win: "Win-Win Scenario:",
 winText: "Klant krijgt complete oplossing. Jij krijgt meer waarde per deal. Je partner krijgt werk dat ze anders niet hadden. Iedereen wint. En klanten betalen premium voor convenience van one-stop-shop."
 },
 network2: {
 title: "Upward Networking: Leer van Top Performers",
 text: "De beste manier om top 5% te worden? Leer van mensen die er al zijn. Maar je moet het strategisch aanpakken.",
 approach: "Upward Networking Approach:",
 tactics: [
 "Studeer profielen van top-rated freelancers in jouw niche",
 "Analyseer hun positioning, pricing, portfolio structuur",
 "Bereik uit met genuine compliment + specifieke vraag",
 "Vraag niet om gratis mentorship—bied waarde (help met kleine taak, deel inzicht)",
 "Volg hun content, comment thoughtfully, bouw relatie over tijd"
 ],
 template: "Outreach Template:",
 templateText: "'Hi [Naam], ik bewonder je werk aan [specific project]. De manier waarop je [specific thing] deed was briljant. Ik ben relatief nieuw in [niche] en zou graag leren van jouw ervaring. Zou je open staan voor een 15-min gesprek? Ik kan je helpen met [skill you have] in ruil voor je tijd en inzichten.' 30% response rate als het genuine is."
 },
 network3: {
 title: "Client Relationships: Van Eenmalig naar Recurring",
 text: "De beste manier om op te vallen? Zo goed zijn dat klanten je blijven inhuren. Recurring werk betekent minder tijd besteden aan proposals en meer tijd aan betaald werk.",
 retention: "Client Retention Framework:",
 framework: [
 "Overdeliver op eerste project (set lage verwachtingen, sla ze uit het water)",
 "Proactive communication (update zonder dat ze vragen)",
 "Anticipate needs (stel voor wat ze daarna nodig hebben voordat ze het weten)",
 "Easy maintenance plans (maandelijkse retainer voor ongoing support)",
 "Check-ins (ping clients 1-2 maanden na project—'Hoe gaat het? Nog verbeteringen nodig?')"
 ],
 impact: "Impact van Recurring Clients:",
 impactText: "80% van succesvolle freelancers verdient 60%+ van inkomen van recurring clients. Deze clients referren ook nieuwe klanten (gratis marketing). Focus niet alleen op nieuwe klanten vinden—focus op huidige klanten behouden."
 }
 },
 cta1: {
 title: "Vind het Beste Platform voor Jouw Niche",
 text: "Niet elk platform is gelijk. Sommige platforms hebben meer vraag naar jouw skills, betere visibility features, of hogere gemiddelde projectwaarde. Vergelijk platforms en vind waar jouw expertise het meest gewaardeerd wordt.",
 button: "Bekijk Top Platforms"
 },
 cta2: {
 title: "Begin Vandaag met Beter Bieden",
 text: "Zichtbaarheid is stap 1. Maar als je proposals niet converteren, win je nog steeds geen werk. Leer hoe je proposals schrijft die opvallen, waarde communiceren en klanten overtuigen om jou te kiezen.",
 button1: "Leer Bieden",
 button2: "Krijg Succes Tips"
 },
 related: {
 title: "Gerelateerde Gidsen",
 bidding: {
 title: "Geavanceerde Biedstrategieën",
 text: "Win meer projecten met slimme biedtactieken"
 },
 reviews: {
 title: "5-Sterren Reviews Krijgen",
 text: "Consistent perfecte beoordelingen verdienen"
 },
 scale: {
 title: "Freelance Business Opschalen",
 text: "Groei van solo naar bureau-level inkomen"
 }
 }
 } : {
 hero: {
 title: "Stand Out on Freelance Platforms: Get Noticed Above the Noise",
 subtitle: "Freelance platforms are saturated. 1000+ freelancers compete for the same projects. Yet the top 5% captures 80% of the work. This guide reveals exactly how to differentiate yourself, increase visibility, and attract premium clients—even if you're just starting.",
 cta1: "Start Your Success",
 cta2: "Learn Bidding"
 },
 stats: {
 visibility: "300% Higher Visibility",
 visibilityDesc: "With strategic profiling",
 invites: "5x More Invitations",
 invitesDesc: "From premium clients",
 competition: "Top 5% Freelancers",
 competitionDesc: "Capture 80% of the work"
 },
 intro: {
 title: "Why Most Freelancers Stay Invisible",
 text: "Every hour, 100+ new freelancers join popular platforms. The average client only sees the first 10-20 profiles in search results. If you're not in that top tier, you're practically invisible. The good news? Platform visibility isn't luck—it's strategy. And you can implement that strategy today.",
 challenge: "The Visibility Challenge",
 challengeText: "Upwork alone has 18+ million freelancers. Fiverr has 4+ million active sellers. Freelancer.com counts 60+ million users. How do you stand out among millions of competitors? By understanding platform algorithms and strategically optimizing for what they reward."
 },
 section1: {
 title: "Platform Algorithm Optimization: Become Visible in Search Results",
 intro: "Every freelance platform has an algorithm determining which profiles appear at the top of search results. Understand the algorithm, and you can win the game. Ignore it, and you stay invisible.",
 strategy1: {
 title: "1. Response Rate & Time: The #1 Ranking Factor",
 text: "All major platforms (Upwork, Fiverr, Freelancer) prioritize freelancers with high response rates and fast response times. Why? Because platforms make more money when deals close quickly.",
 metrics: "Target Metrics for Top Rankings:",
 list: [
 "Response Rate: >90% (answer all inquiries, even if not interested)",
 "Response Time: <2 hours average (set notifications on your phone)",
 "Proposal Acceptance: >30% (select projects you have a real shot at)",
 "Project Completion: >95% (only accept what you can surely deliver)"
 ],
 tip: "Pro Tip: Speed Wins",
 tipText: "Enable push notifications for new projects in your niche. The first 5 proposals have 3x higher chance of being selected. Speed + quality = more wins."
 },
 strategy2: {
 title: "2. Profile Completeness Score: Maximize Your Score",
 text: "Incomplete profiles are automatically ranked lower. Platforms want to show professional, reliable freelancers to clients. A 100% complete profile is non-negotiable.",
 checklist: "100% Complete Profile Checklist:",
 items: [
 "Professional profile photo (no selfie, no group photo)",
 "Comprehensive bio (300+ words, keyword-rich)",
 "Portfolio with minimum 5-8 work pieces",
 "Complete skill list (all relevant skills added)",
 "Verified payment method and email",
 "Video introduction (platforms give +10-15% boost)",
 "Certifications and diplomas uploaded",
 "Hourly rate or package pricing set"
 ]
 },
 strategy3: {
 title: "3. Keyword Optimization: Match Client Searches",
 text: "Clients search with specific keywords. If your profile doesn't contain those keywords, you won't appear in their results. But you need to be smart—keyword stuffing backfires.",
 approach: "Strategic Keyword Placement:",
 locations: [
 "Profile Title: Primary keyword + specialization (e.g., 'WordPress Developer | E-commerce Specialist')",
 "Bio Opening: 2-3 main keywords in first 50 words",
 "Skills Section: All relevant tools, frameworks, techniques",
 "Portfolio Titles: Keyword-rich project titles",
 "Work History: Keywords in project descriptions",
 "Certifications: Add certificates for credibility signals"
 ],
 research: "Keyword Research Method:",
 researchText: "Go to the platform's project search. Type what clients would search for your service. Analyze the top 10 results—which keywords do they use? Which skills do they highlight? Adopt proven patterns, but don't copy verbatim."
 }
 },
 section2: {
 title: "Personal Branding Strategies: Differentiate from the Crowd",
 intro: "Everyone on the platform claims to be an 'expert' offering 'high-quality work'. But few actually show what makes them unique. Personal branding isn't about boasting—it's about clearly communicating why clients should choose you specifically.",
 brand1: {
 title: "Specialize in a Profitable Niche",
 text: "Generalists drown in competition. Specialists are sought after. But not every niche is profitable. You need to find the sweet spot: demand + value + passion.",
 formula: "Niche Selection Formula:",
 formulaText: "Your ideal niche lies at the intersection of: (1) Market Demand - enough clients seeking this service, (2) High Value - clients pay premium prices, (3) Your Expertise - you're genuinely good at this. Examples: Shopify migration specialist, healthcare content writer, SaaS email automation expert.",
 examples: "Niche Positioning Examples:",
 list: [
 "❌ Generic: 'Web Designer' → ✅ Specific: 'Conversion-focused Landing Page Designer for SaaS Startups'",
 "❌ Generic: 'Writer' → ✅ Specific: 'Healthcare SEO Content Specialist | Rank Higher, Convert More'",
 "❌ Generic: 'Developer' → ✅ Specific: 'WordPress to Headless Migration Expert | Shopify & WooCommerce'"
 ]
 },
 brand2: {
 title: "Develop a Signature Process or Methodology",
 text: "Premium clients don't just pay for deliverables—they pay for certainty. A signature process communicates that you've done this 100 times and know exactly how to deliver results.",
 process: "Signature Process Example (UX Designer):",
 steps: [
 "Discovery Workshop: Deep session to understand goals, users, and pain points",
 "Competitive Analysis: Analyze what competitors do well/poorly",
 "User Journey Mapping: Visualize the complete user experience",
 "Wireframe Iterations: 2-3 rounds of wireframes with client feedback",
 "Visual Design: High-fidelity mockups with brand identity",
 "Usability Testing: Test with real users for validation",
 "Developer Handoff: Complete design specs + support during implementation"
 ],
 benefit: "Why This Works:",
 benefitText: "Clients see exactly what they get, when, and why each step matters. This eliminates uncertainty and justifies premium pricing. Bonus: you can showcase this process in your portfolio with visual diagrams."
 },
 brand3: {
 title: "Leverage Social Proof Strategically",
 text: "90% of clients read reviews before reaching out. But not all social proof is equal. You need to be strategic about which testimonials you highlight and where.",
 hierarchy: "Social Proof Hierarchy:",
 levels: [
 "Level 1 - Numbers: '500+ Projects Completed | 98% Job Success Score | Top Rated Seller'",
 "Level 2 - Logos: Recognizable companies you've worked for (ask permission)",
 "Level 3 - Testimonials: Quotes from clients mentioning specific results",
 "Level 4 - Case Studies: Complete project stories with before/after data",
 "Level 5 - Video Testimonials: Clients recommending you on camera (ultimate trust signal)"
 ],
 ask: "How to Ask for Testimonials?",
 askText: "Timing is everything. Ask right after project completion, when the client is still excited. Template: 'Hey [Name], I'm so glad you're happy with [project]! Would you mind writing a short review about your experience? It helps me tremendously to attract more clients like you. Specifically, I'd love if you could mention [result or process aspect].' 70% say yes when asked this way."
 }
 },
 section3: {
 title: "Tactical Visibility Hacks: Practical Techniques That Work",
 intro: "Beyond long-term strategy, there are tactical hacks that boost your visibility immediately. Some work on all platforms, others are platform-specific.",
 hack1: {
 title: "The Daily Activity Boost",
 text: "Platform algorithms reward activity. The more engaged you are, the higher you rank. But you need to generate the right kind of activity.",
 schedule: "Daily Activity Routine (15-20 min/day):",
 tasks: [
 "Log in every day at the same time (consistency signals serious freelancer)",
 "Update your 'availability status' to online/available",
 "Answer all messages within 2 hours",
 "Submit 2-3 proposals (quality >quantity)",
 "Update one portfolio piece or add new skill",
 "Engage in platform communities (upvote, comment on discussions)"
 ]
 },
 hack2: {
 title: "Platform-Specific Badges & Certifications",
 text: "Each platform has its own badge systems. These badges aren't just ego-boosts—they directly influence your ranking and client trust.",
 upwork: "Upwork Badges:",
 upworkList: [
 "Top Rated (requires 90%+ JSS, $1000+ earnings, 100% completion): +25% proposal visibility",
 "Top Rated Plus (invitation only): front page visibility boost",
 "Rising Talent (first 3 months, good performance): compete with experienced freelancers"
 ],
 fiverr: "Fiverr Levels:",
 fiverrList: [
 "Level 1 Seller (60 days, $400 revenue, 90% rating): algorithm boost",
 "Level 2 Seller (120 days, $2000 revenue, 95% rating): extra gig slots",
 "Top Rated Seller (invitation): homepage features, priority support"
 ]
 },
 hack3: {
 title: "Strategic Pricing for Visibility",
 text: "Pricing influences your ranking. Too low suggests low quality. Too high filters you out of search results. The sweet spot? Midrange with strategic upsells.",
 pricing: "Visibility-Optimized Pricing Strategy:",
 strategy: [
 "Starter Package: Competitively priced for volume and reviews (20-30% below market average)",
 "Standard Package: Where your actual profit sits (at or just above market average)",
 "Premium Package: High-margin upsell for clients wanting certainty (50-100% above standard)",
 "Add-ons: Extras that increase your margin without raising pricing"
 ],
 psychology: "Pricing Psychology:",
 psychologyText: "Clients often filter by budget range. Price yourself just within that range, but differentiate on value. E.g., instead of '$50/hr generalist', position as '$55/hr + free revision + 48hr delivery' specialist."
 }
 },
 section4: {
 title: "Content Marketing on Platforms: Build Authority & Attract Inbound Leads",
 intro: "Most freelancers only respond to projects. The top 5% create content that attracts clients to them. Platform content marketing is one of the most underrated strategies.",
 content1: {
 title: "Platform Blog/Forum Strategy",
 text: "Upwork, Freelancer, and other platforms have community sections—blogs, forums, Q&A. Few use them. That's your opportunity.",
 approach: "Content Approach:",
 steps: [
 "Answer questions in your niche (e.g., Upwork Community, Fiverr Forum)",
 "Write helpful, detailed answers (no sales pitch)",
 "Add links to relevant portfolio pieces as examples",
 "Be consistent—post 2-3x per week",
 "Position yourself as expert by giving value, not selling"
 ],
 benefit: "Why This Works:",
 benefitText: "Clients see you helping others. They think: 'If he shares this much for free, what can he do if I pay him?' You build trust before they even contact you. Plus, platform algorithms reward community engagement with higher rankings."
 },
 content2: {
 title: "Portfolio as Content Hub",
 text: "Your portfolio isn't just showing work—it's a content marketing asset. Each portfolio piece can be a mini case study that educates, inspires, and converts clients.",
 template: "Content-Rich Portfolio Piece Template:",
 sections: [
 "Hero Visual: High-impact image showing the transformation",
 "Client Challenge: What was the problem? Why did the client come to you?",
 "Your Solution: Not what you made, but how you thought and what decisions you made",
 "Process Visuals: Screenshots of your workflow, sketches, iterations",
 "Results Data: Hard numbers (conversion +47%, time saved 20 hrs/week, revenue +$50K)",
 "Client Testimonial: Quote mentioning specific value",
 "CTA: 'Need Similar Results? Let's Talk' with link to your profile"
 ]
 },
 content3: {
 title: "Video Content: The Ultimate Differentiator",
 text: "<5% of freelancers use video. But video increases conversion by 80%. It doesn't need to be Hollywood production—authenticity wins.",
 videos: "Video Content Types:",
 types: [
 "Profile Intro Video: 60-90 seconds, who you are, what you do, why clients work with you",
 "Portfolio Walkthroughs: Screen recording explaining a project (3-5 min)",
 "Process Explainers: Show how you work with tools (builds trust)",
 "Client Testimonials: Ask satisfied clients for short video review (worth gold)",
 "Quick Tips: Weekly 1-min tips in your niche (builds following)"
 ],
 equipment: "Equipment Needed:",
 equipmentText: "Smartphone + good lighting ($30 ring light) + free editing app (CapCut/iMovie). Done. Focus on value, not production quality. Clients want to see expertise, not cinematography."
 }
 },
 section5: {
 title: "Networking Strategies: Relationships That Elevate You to the Top",
 intro: "Standing out isn't just about what you do—it's also about who you know. Networking on freelance platforms is different from traditional networking. Here's how to do it.",
 network1: {
 title: "Collaboration over Competition",
 text: "Your competitors can be your best allies. Premium clients often request more work than one freelancer can handle. That's your opportunity.",
 strategy: "Collaboration Strategy:",
 steps: [
 "Identify non-competing freelancers in related niches (designer + developer + copywriter)",
 "Build relationships by complimenting and endorsing their work",
 "Propose referring each other for overflow work",
 "Create a 'preferred partners' list of reliable freelancers",
 "Offer packages together (e.g., 'Complete Website: Design + Development + Copywriting')"
 ],
 win: "Win-Win Scenario:",
 winText: "Client gets complete solution. You get more value per deal. Your partner gets work they wouldn't otherwise have. Everyone wins. And clients pay premium for one-stop-shop convenience."
 },
 network2: {
 title: "Upward Networking: Learn from Top Performers",
 text: "The best way to become top 5%? Learn from people who are already there. But you need to approach it strategically.",
 approach: "Upward Networking Approach:",
 tactics: [
 "Study profiles of top-rated freelancers in your niche",
 "Analyze their positioning, pricing, portfolio structure",
 "Reach out with genuine compliment + specific question",
 "Don't ask for free mentorship—offer value (help with small task, share insight)",
 "Follow their content, comment thoughtfully, build relationship over time"
 ],
 template: "Outreach Template:",
 templateText: "'Hi [Name], I admire your work on [specific project]. The way you [specific thing] was brilliant. I'm relatively new to [niche] and would love to learn from your experience. Would you be open to a 15-min conversation? I can help you with [skill you have] in exchange for your time and insights.' 30% response rate when genuine."
 },
 network3: {
 title: "Client Relationships: From One-Time to Recurring",
 text: "The best way to stand out? Be so good clients keep hiring you. Recurring work means less time on proposals and more time on paid work.",
 retention: "Client Retention Framework:",
 framework: [
 "Overdeliver on first project (set low expectations, blow them away)",
 "Proactive communication (update without them asking)",
 "Anticipate needs (suggest what they'll need next before they know it)",
 "Easy maintenance plans (monthly retainer for ongoing support)",
 "Check-ins (ping clients 1-2 months post-project—'How's it going? Any improvements needed?')"
 ],
 impact: "Impact of Recurring Clients:",
 impactText: "80% of successful freelancers earn 60%+ of income from recurring clients. These clients also refer new clients (free marketing). Don't just focus on finding new clients—focus on keeping current ones."
 }
 },
 cta1: {
 title: "Find the Best Platform for Your Niche",
 text: "Not all platforms are equal. Some platforms have more demand for your skills, better visibility features, or higher average project value. Compare platforms and find where your expertise is most valued.",
 button: "Browse Top Platforms"
 },
 cta2: {
 title: "Start Bidding Better Today",
 text: "Visibility is step 1. But if your proposals don't convert, you still won't win work. Learn how to write proposals that stand out, communicate value, and convince clients to choose you.",
 button1: "Learn Bidding",
 button2: "Get Success Tips"
 },
 related: {
 title: "Related Guides",
 bidding: {
 title: "Advanced Bidding Strategies",
 text: "Win more projects with smart bidding tactics"
 },
 reviews: {
 title: "Getting 5-Star Reviews",
 text: "Consistently earn perfect ratings"
 },
 scale: {
 title: "Scale Your Freelance Business",
 text: "Grow from solo to agency-level income"
 }
 }
 };

 return (
 <>
 
 <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
 {/* Hero Section */}
 <section className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] text-white py-16 sm:py-20">
 <div className="container mx-auto px-4">
 <div className="max-w-4xl mx-auto text-center">
 <div className="flex items-center justify-center gap-3 mb-6">
 <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
 <Eye className="w-7 h-7 text-white" />
 </div>
 </div>

 <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
 {content.hero.title}
 </h1>

 <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
 {content.hero.subtitle}
 </p>

 <div className="flex flex-wrap items-center justify-center gap-4">
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
 >
 {content.hero.cta1}
 <ArrowRight className="w-5 h-5" />
 </Link>
 <Link
 href={`/${locale}/gids/aan-de-slag/eerste-freelance-voorstel`}
 className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20"
 >
 {content.hero.cta2}
 <Zap className="w-5 h-5" />
 </Link>
 </div>
 </div>
 </div>
 </section>

 {/* Schema.org Structured Data */}
 <script type="application/ld+json" dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "HowTo",
 "name": content.hero.title,
 "description": content.hero.subtitle,
 "step": [
 {
 "@type": "HowToStep",
 "name": locale === 'nl' ? "Platform Algoritme Optimalisatie" : "Platform Algorithm Optimization",
 "text": locale === 'nl' ? "Optimaliseer je profiel voor platform algoritmes door response rate, profile completeness en keyword optimalisatie te verbeteren." : "Optimize your profile for platform algorithms by improving response rate, profile completeness, and keyword optimization."
 },
 {
 "@type": "HowToStep",
 "name": locale === 'nl' ? "Personal Branding Strategieën" : "Personal Branding Strategies",
 "text": locale === 'nl' ? "Onderscheid jezelf door te specialiseren in een winstgevende niche, een signature process te ontwikkelen en social proof strategisch te gebruiken." : "Differentiate yourself by specializing in a profitable niche, developing a signature process, and leveraging social proof strategically."
 },
 {
 "@type": "HowToStep",
 "name": locale === 'nl' ? "Tactical Visibility Hacks" : "Tactical Visibility Hacks",
 "text": locale === 'nl' ? "Boost je zichtbaarheid met dagelijkse activiteit, platform badges en strategische pricing." : "Boost your visibility with daily activity, platform badges, and strategic pricing."
 }
 ]
 })
 }} />

 {/* Main Content */}
 <article className="container mx-auto px-4 py-16">
 <div className="max-w-4xl mx-auto">
 {/* Stats Section */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border border-primary/20">
 <TrendingUp className="w-10 h-10 text-primary mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">{content.stats.visibility}</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">{content.stats.visibilityDesc}</p>
 </div>
 <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border border-accent/20">
 <Users className="w-10 h-10 text-accent mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">{content.stats.invites}</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">{content.stats.invitesDesc}</p>
 </div>
 <div className="bg-gradient-to-br from-[#1e1541]/10 to-[#1e1541]/5 dark:from-[#1e1541]/30 dark:to-[#1e1541]/20 rounded-xl p-6 border border-[#1e1541]/20">
 <Award className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">{content.stats.competition}</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">{content.stats.competitionDesc}</p>
 </div>
 </div>
 </div>

 {/* Introduction */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
 {content.intro.title}
 </h2>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
 {content.intro.text}
 </p>
 <div className="bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-xl p-6 border-l-4 border-primary">
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">{content.intro.challenge}</h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{content.intro.challengeText}</p>
 </div>
 </div>

 {/* Section 1: Algorithm Optimization */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
 {content.section1.title}
 </h2>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
 {content.section1.intro}
 </p>

 {/* Strategy 1 */}
 <div className="mb-10">
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 {content.section1.strategy1.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
 {content.section1.strategy1.text}
 </p>
 <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 mb-4 border border-primary/20">
 <h4 className="font-bold text-gray-900 dark:text-white mb-3">
 {content.section1.strategy1.metrics}
 </h4>
 <ul className="space-y-2">
 {content.section1.strategy1.list.map((item, index) =>(
 <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <span>{item}</span>
 </li>
 ))}
 </ul>
 </div>
 <div className="bg-accent/5 dark:bg-accent/10 rounded-xl p-6 border border-accent/20">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">
 {content.section1.strategy1.tip}
 </h4>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
 {content.section1.strategy1.tipText}
 </p>
 </div>
 </div>

 {/* Strategy 2 */}
 <div className="mb-10">
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 {content.section1.strategy2.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
 {content.section1.strategy2.text}
 </p>
 <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6 border border-accent/20">
 <h4 className="font-bold text-gray-900 dark:text-white mb-3">
 {content.section1.strategy2.checklist}
 </h4>
 <ul className="space-y-2">
 {content.section1.strategy2.items.map((item, index) =>(
 <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
 <span>{item}</span>
 </li>
 ))}
 </ul>
 </div>
 </div>

 {/* Strategy 3 */}
 <div>
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 {content.section1.strategy3.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
 {content.section1.strategy3.text}
 </p>
 <div className="bg-gradient-to-br from-[#1e1541]/5 to-[#1e1541]/10 dark:from-[#1e1541]/10 dark:to-[#1e1541]/20 rounded-xl p-6 mb-4 border border-[#1e1541]/20">
 <h4 className="font-bold text-gray-900 dark:text-white mb-3">
 {content.section1.strategy3.approach}
 </h4>
 <ul className="space-y-2">
 {content.section1.strategy3.locations.map((location, index) =>(
 <li key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
 <strong className="text-gray-900 dark:text-white">{location.split(':')[0]}:</strong>
 {location.split(':').slice(1).join(':')}
 </li>
 ))}
 </ul>
 </div>
 <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 border border-primary/20">
 <h4 className="font-bold text-gray-900 dark:text-white mb-2">
 {content.section1.strategy3.research}
 </h4>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
 {content.section1.strategy3.researchText}
 </p>
 </div>
 </div>
 </div>

 {/* Continue with remaining sections... */}
 {/* Due to length, I'll add the remaining sections in the next parts */}

 {/* CTA Section 1 */}
 <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white">
 <div className="max-w-3xl mx-auto text-center">
 <Target className="w-16 h-16 text-white mx-auto mb-6" />
 <h2 className="text-3xl md:text-4xl font-bold mb-4">
 {content.cta1.title}
 </h2>
 <p className="text-xl text-white/90 mb-8">
 {content.cta1.text}
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg"
 >
 {content.cta1.button}
 <ArrowRight className="w-5 h-5" />
 </Link>
 </div>
 </div>

 <AdWidget placement="blog_sidebar" />

 {/* Final CTA */}
 <div className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] rounded-2xl shadow-xl p-8 md:p-12 text-white text-center mb-12">
 <div className="max-w-3xl mx-auto">
 <Zap className="w-16 h-16 text-white mx-auto mb-6" />
 <h2 className="text-3xl md:text-4xl font-bold mb-4">
 {content.cta2.title}
 </h2>
 <p className="text-xl text-white/90 mb-8">
 {content.cta2.text}
 </p>
 <div className="flex flex-wrap items-center justify-center gap-4">
 <Link
 href={`/${locale}/gids/aan-de-slag/eerste-freelance-voorstel`}
 className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg"
 >
 {content.cta2.button1}
 <ArrowRight className="w-5 h-5" />
 </Link>
 <Link
 href={`/${locale}/newsletter`}
 className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20"
 >
 {content.cta2.button2}
 <Star className="w-5 h-5" />
 </Link>
 </div>
 </div>
 </div>

 {/* Related Resources */}
 <div className="pt-12 border-t border-gray-200 dark:border-slate-700">
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
 {content.related.title}
 </h2>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <Link
 href={`/${locale}/gids/succes-strategieen/geavanceerde-biedstrategieen`}
 className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group"
 >
 <Target className="w-10 h-10 text-primary mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
 {content.related.bidding.title}
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">
 {content.related.bidding.text}
 </p>
 </Link>
 <Link
 href={`/${locale}/gids/succes-strategieen/5-sterren-reviews-krijgen`}
 className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group"
 >
 <Star className="w-10 h-10 text-accent mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
 {content.related.reviews.title}
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">
 {content.related.reviews.text}
 </p>
 </Link>
 <Link
 href={`/${locale}/gids/succes-strategieen/freelance-business-opschalen`}
 className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group"
 >
 <TrendingUp className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
 {content.related.scale.title}
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">
 {content.related.scale.text}
 </p>
 </Link>
 </div>
 </div>
 </div>
 </article>
 </main>
 
 </>
 );
}
