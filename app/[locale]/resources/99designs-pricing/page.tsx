import type { Metadata } from "next";
import Link from "next/link";

type Props = {
 params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata>{
 const { locale } = await params;

 const slug = '99designs-pricing';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

 if (locale === "nl") {
 return {
 title: "99designs Prijzen 2026: Complete Kostengids voor Logo & Design Wedstrijden",
 description: "Gedetailleerde 99designs prijzengids: Bronze €279, Silver €465, Gold €745, Platinum €1.117 voor logo's. Contest vs 1-op-1 projecten, ontwerper uitbetalingen 60-70%, en alternatieven.",
 keywords: "99designs prijzen, 99designs kosten, 99designs logo prijs, 99designs tarieven, design contest pricing, 99designs fees",
 openGraph: {
 title: "99designs Prijzen 2026: Complete Kostengids voor Logo & Design Wedstrijden",
 description: "Volledige uitsplitsing van 99designs prijzen, wat je krijgt bij elke tier, en hoe het werkt voor ontwerpers en klanten.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: '99designs Prijzen 2026: Complete Kostengids voor Logo & Design Wedstrijden' }],
 locale: 'nl_NL',
 type: "article",
 },
 twitter: {
 card: 'summary_large_image',
 title: '99designs Prijzen 2026: Complete Kostengids voor Logo & Design Wedstrijden',
 description: 'Gedetailleerde 99designs prijzengids: Bronze €279, Silver €465, Gold €745, Platinum €1.117 voor logos.',
 images: [`${siteUrl}/images/og/resources-og.png`],
 creator: '@SkillLinkup',
 site: '@SkillLinkup',
 },
 alternates: {
 canonical: pageUrl,
 languages: {
 'en': `${siteUrl}/en/resources/${slug}`,
 'nl': `${siteUrl}/nl/resources/${slug}`,
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
 title: "99designs Pricing 2026: Complete Cost Guide for Logo & Design Contests",
 description: "Detailed 99designs pricing guide: Bronze $299, Silver $499, Gold $799, Platinum $1,199 for logos. Contest vs 1-to-1 projects, designer payouts 60-70%, and alternatives.",
 keywords: "99designs pricing, 99designs cost, 99designs logo price, 99designs fees, design contest pricing, 99designs rates",
 openGraph: {
 title: "99designs Pricing 2026: Complete Cost Guide for Logo & Design Contests",
 description: "Complete breakdown of 99designs pricing, what you get at each tier, and how it works for designers and clients.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: '99designs Pricing 2026: Complete Cost Guide for Logo & Design Contests' }],
 locale: 'en_US',
 type: "article",
 },
 twitter: {
 card: 'summary_large_image',
 title: '99designs Pricing 2026: Complete Cost Guide for Logo & Design Contests',
 description: 'Detailed 99designs pricing guide: Bronze $299, Silver $499, Gold $799, Platinum $1,199 for logos.',
 images: [`${siteUrl}/images/og/resources-og.png`],
 creator: '@SkillLinkup',
 site: '@SkillLinkup',
 },
 alternates: {
 canonical: pageUrl,
 languages: {
 'en': `${siteUrl}/en/resources/${slug}`,
 'nl': `${siteUrl}/nl/resources/${slug}`,
 },
 },
 robots: {
 index: true,
 follow: true,
 googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
 },
 };
}

export default async function NinetyNineDesignsPricingPage({ params }: Props) {
 const { locale } = await params;

 const content = locale === "nl" ? {
 badge: "99designs Prijzengids",
 title: "99designs Prijzen 2026: Complete Kostengids voor Logo & Design Wedstrijden",
 subtitle: "Begrijp de volledige kostenstructuur van 99designs, van Bronze tot Platinum pakketten, ontwerper uitbetalingen, en of design wedstrijden de investering waard zijn.",
 cta1: "Vergelijk Designplatforms",
 cta2: "Bekijk Alternatieven",
 intro: "99designs is een van de grootste design wedstrijdplatforms ter wereld, waarbij bedrijven een prijs uitschrijven en tientallen ontwerpers meedingen met concepten. Maar hoeveel kost het werkelijk? Deze gids biedt transparante prijzen voor alle projecttypes, wat je bij elke tier krijgt, hoe ontwerpers betaald worden, en of je waar voor je geld krijgt.",

 pricingOverview: "Overzicht 99designs Prijzen",
 pricingIntro: "99designs hanteert een gelaagd prijsmodel waarbij hogere pakketten meer ontwerpers aantrekken en extra functies bieden. Prijzen variëren per projecttype:",

 logoContestTitle: "Logo Design Wedstrijdprijzen",
 websiteContestTitle: "Website Design Wedstrijdprijzen",
 packageContestTitle: "Verpakkingsontwerp Wedstrijdprijzen",

 bronzeTier: "Bronze",
 bronzePrice: "€279",
 bronzeDesigners: "~30 ontwerpen",
 bronzeFeatures: [
 "Basis concurrentie niveau",
 "Standaard tijdlijn (7-10 dagen)",
 "100% geld-terug-garantie (60 dagen)",
 "Copyright overdracht"
 ],

 silverTier: "Silver",
 silverPrice: "€465",
 silverDesigners: "~60 ontwerpen",
 silverFeatures: [
 "Alle Bronze features",
 "Mid-level ontwerpers",
 "Featured listing (meer zichtbaarheid)",
 "NDA bescherming"
 ],

 goldTier: "Gold",
 goldPrice: "€745",
 goldDesigners: "~90 ontwerpen",
 goldBadge: "POPULAIRST",
 goldFeatures: [
 "Alle Silver features",
 "Top-level ontwerpers",
 "Toegewijde accountmanager",
 "Prioriteitsondersteuning",
 "Extra herzieningen"
 ],

 platinumTier: "Platinum",
 platinumPrice: "€1.117",
 platinumDesigners: "~60 premium ontwerpen",
 platinumFeatures: [
 "Alle Gold features",
 "Handgekozen elite ontwerpers",
 "Toegewijde projectmanager",
 "Hoogste prioriteit matching",
 "Premium designkwaliteit"
 ],

 logoWebsitePricing: "Logo + Website Bundel Prijzen",
 logoWebsiteIntro: "99designs biedt bundelprijzen voor meerdere projecten die tegelijkertijd worden uitgevoerd:",
 logoWebsitePrice: "Vanaf €1.860",
 logoWebsiteSavings: "(~15% besparing vs afzonderlijke wedstrijden)",

 oneToOneTitle: "1-op-1 Project Prijzen (Geen Wedstrijd)",
 oneToOneIntro: "Als je liever direct met één ontwerper werkt in plaats van een wedstrijd te hosten:",
 oneToOneDesignerSets: "Ontwerper stelt prijs",
 oneToOneTypicalRange: "Typisch bereik",
 oneToOneNoFee: "Geen platformkosten bovenop prijs ontwerper",
 oneToOneFasterTimeline: "Snellere tijdlijn (geen wedstrijdfase)",
 oneToOneDirectContact: "Direct contact met gekozen ontwerper",

 contestBreakdown: "Wat Je Krijgt Met Elke Wedstrijdtier",

 designsReceived: "Ontvangen Ontwerpen",
 designsReceivedText: "Hogere tiers trekken meer inzendingen. Bronze: ~30 ontwerpen, Silver: ~60 ontwerpen, Gold: ~90 ontwerpen, Platinum: ~60 premium ontwerpen (handgeselecteerde elite designers).",

 designerQuality: "Ontwerper Kwaliteit",
 designerQualityText: "Bronze trekt beginners aan. Gold/Platinum trekken Top-Level en Elite ontwerpers met proven portfolios aan.",

 timelineSpeed: "Tijdlijn Snelheid",
 timelineSpeedText: "Bronze/Silver: 7-10 dagen. Gold: 5-7 dagen met versnelde opties. Platinum: 3-5 dagen met hoogste prioriteit.",

 supportLevel: "Ondersteuningsniveau",
 supportLevelText: "Bronze/Silver: Standaard support. Gold: Prioriteitsondersteuning. Platinum: Toegewijde projectmanager die je door elk stadium begeleidt.",

 revisionRounds: "Herzieningsrondes",
 revisionRoundsText: "Alle tiers krijgen herzieningsrondes, maar Gold/Platinum krijgen snellere doorlooptijden en meer flexibiliteit.",

 additionalCosts: "Extra Kosten om Rekening Mee Te Houden",

 upgradesMidContest: "Upgrades Halverwege Wedstrijd",
 upgradesMidContestText: "Je kunt upgraden naar een hogere tier tijdens een wedstrijd. Kosten: €93-€279 afhankelijk van sprongniveau.",

 extendTimeline: "Tijdlijn Verlengen",
 extendTimelineText: "+€23-€46 om je wedstrijd met 3-7 dagen te verlengen als je meer tijd nodig hebt voor beslissingen.",

 extraDesignerInvites: "Extra Ontwerper Uitnodigingen",
 extraDesignerInvitesText: "Nodig specifieke ontwerpers uit naar je wedstrijd: €9-€19 per uitnodiging.",

 blindContest: "Blinde Wedstrijd Optie",
 blindContestText: "+€93 om je wedstrijd privé te maken (ontwerpers zien elkaars werk niet).",

 designerPayoutStructure: "Hoe Worden Ontwerpers Betaald?",
 designerPayoutIntro: "Begrijpen hoe ontwerpers worden gecompenseerd helpt je te evalueren of prijzen redelijk zijn:",

 designerPayout: "Ontwerper Uitbetaling",
 designerPayoutDetails: "99designs neemt 30-40% platformkosten voor wedstrijden. Voor 1-op-1 projecten varieert dit: Entry-level (15%), Mid-level (10%), Top-level (5%). Wedstrijd winnaars ontvangen:",
 designerPayoutBronze: "Bronze wedstrijd (€279 klantprijs) → ~€167-€195 ontwerper uitbetaling (60-70%)",
 designerPayoutSilver: "Silver wedstrijd (€465 klantprijs) → ~€279-€325 ontwerper uitbetaling (60-70%)",
 designerPayoutGold: "Gold wedstrijd (€745 klantprijs) → ~€447-€522 ontwerper uitbetaling (60-70%)",
 designerPayoutPlatinum: "Platinum wedstrijd (€1.117 klantprijs) → ~€670-€782 ontwerper uitbetaling (60-70%)",

 realCostAnalysis: "Echte Kosten Analyse: Is 99designs De Moeite Waard?",
 realCostIntro: "Laten we de waarde per ontvangen ontwerp uitsplitsen:",

 costPerDesign: "Kosten Per Ontwerp",
 costPerDesignBronze: "Bronze: €279 ÷ 30 ontwerpen = €9,30 per concept",
 costPerDesignSilver: "Silver: €465 ÷ 60 ontwerpen = €7,75 per concept",
 costPerDesignGold: "Gold: €745 ÷ 90 ontwerpen = €8,28 per concept",
 costPerDesignPlatinum: "Platinum: €1.117 ÷ 60 premium ontwerpen = €18,62 per concept",

 valueInsight: "Waarde Inzicht",
 valueInsightText: "Je betaalt hoofdzakelijk voor variëteit en ontwerper kwaliteit, niet volume. Gold biedt de beste balans tussen prijs, kwaliteit en opties.",

 prosAndCons: "Voor- & Nadelen van 99designs Prijzen",
 advantages: "Voordelen",
 advantagesList: [
 { title: "Vaste Kosten", text: "Je weet vooraf precies wat je betaalt—geen verborgen kosten tenzij je upgrades toevoegt" },
 { title: "Meerdere Opties", text: "Ontvang tientallen ontwerpen om uit te kiezen vs slechts 1-2 van traditionele agencies" },
 { title: "Geld-Terug-Garantie", text: "Als je niet tevreden bent, kan je een terugbetaling aanvragen (met voorwaarden)" },
 { title: "Copyright Inbegrepen", text: "Volledige rechten overdracht bij winnaarselectie—geen extra kosten" },
 { title: "Voorspelbare Tijdlijnen", text: "Wedstrijden eindigen binnen 7-10 dagen, sneller dan de meeste agency projecten" }
 ],
 disadvantages: "Nadelen",
 disadvantagesList: [
 { title: "Platformkosten", text: "30-40% platformkosten voor wedstrijden (ontwerpers ontvangen 60-70% van de prijs)" },
 { title: "Inconsistente Kwaliteit", text: "Bronze/Silver tiers trekken veel beginnende ontwerpers—kwaliteit varieert enorm" },
 { title: "Geen Directe Samenwerking", text: "Wedstrijdformaat beperkt diepgaande strategische gesprekken vs 1-op-1 engagements" },
 { title: "Veel Handmatig Werk", text: "Je moet tientallen ontwerpen beoordelen, feedback geven en beheren—tijdrovend" },
 { title: "Beperkte Herzieningen", text: "Eenmaal gewonnen, zijn herzieningen beperkt—extra werk kan extra kosten betekenen" }
 ],

 costComparison: "Kostenvergelijking: 99designs vs Alternatieven",
 comparisonIntro: "Hoe stapelen 99designs prijzen zich op tegen andere design opties?",

 freelancePlatforms: "Freelance Platforms (Upwork, Fiverr)",
 freelancePlatformsCost: "€93-€465 voor logodesign",
 freelancePlatformsPros: "Lagere kosten, directe samenwerking, meer flexibiliteit",
 freelancePlatformsCons: "Moeten ontwerpers vinden/screenen, kwaliteit minder gegarandeerd",

 designAgencies: "Design Agencies",
 designAgenciesCost: "€1.860-€9.300+ voor logodesign",
 designAgenciesPros: "Hoogste kwaliteit, strategische begeleiding, merk expertise",
 designAgenciesCons: "5-10x duurdere prijzen, langere tijdlijnen (4-8+ weken)",

 aiDesignTools: "AI Design Tools (Looka, Canva)",
 aiDesignToolsCost: "€19-€93 voor AI-gegenereerde logo's",
 aiDesignToolsPros: "Onmiddellijke levering, zeer goedkoop, onbeperkte herzieningen",
 aiDesignToolsCons: "Geen menselijke creativiteit, generieke output, beperkte aanpassingsmogelijkheden",

 twentyNineDesigns: "99designs",
 twentyNineDesignsCost: "€279-€1.117 voor logodesign",
 twentyNineDesignsPros: "Meerdere opties, vaste prijzen, copyright inbegrepen, 100% geld-terug-garantie",
 twentyNineDesignsCons: "30-40% platformkosten, inconsistente kwaliteit op lage tiers",

 whoShouldUse: "Wie Moet 99designs Gebruiken?",
 goodFitTitle: "Je Bent Een Goede Match Als:",
 goodFitList: [
 "Je hebt een budget van €465-€745 (Gold tier is sweet spot)",
 "Je waardeert meerdere ontwerpopties boven diepgaande samenwerking",
 "Je hebt tijd om tientallen ontwerpen te beoordelen",
 "Je hebt duidelijke merkrichtlijnen om te delen met ontwerpers",
 "Je wilt een snelle doorlooptijd (7-10 dagen)",
 "Je bent comfortabel met het beheren van een wedstrijdproces"
 ],
 skipIfTitle: "Sla Over Als:",
 skipIfList: [
 "Je budget is onder €279 (kwaliteit is te laag op Bronze tier)",
 "Je wilt strategische merk begeleiding, niet alleen ontwerp executie",
 "Je hebt een complexe ontwerpbehoefte die diepe samenwerking vereist",
 "Je wilt direct met één vertrouwde ontwerper werken",
 "Je bent niet voorbereid om tientallen ontwerpen te beoordelen",
 "Je wilt AI-gegenereerde opties verkennen voor onder €93"
 ],

 finalVerdict: "Eindoordeel: Is 99designs De Moeite Waard?",
 verdictText: "99designs biedt goede waarde op Gold/Platinum tiers (€745-€1.117) als je variëteit waardeert en kunt omgaan met het wedstrijdproces. Bronze/Silver (€279-€465) trekken te veel beginners—kwaliteit is een gokje. Let op: Platinum biedt minder ontwerpen (60) maar hogere kwaliteit dan Gold (90).",
 verdictRecommendation: "Beste voor:",
 verdictRecommendationText: "Bedrijven met €465-€745 budgetten die meerdere ontwerpopties willen zonder agency prijzen te betalen. Als je budget onder €279 is, probeer Fiverr of AI tools. Boven €1.117, overweeg boutique agencies voor meer strategische waarde. Gold biedt de beste balans: 90 ontwerpen met toegewijde accountmanager voor €745.",
 verdictRating: "3.5/5",
 verdictSubtext: "Solide voor mid-market bedrijven, maar niet de beste voor strakke budgetten of complexe behoeften",

 exploreMore: "Ontdek Meer Designplatforms",
 compareAllPlatforms: "Vergelijk Alle Platforms →",
 compareAllPlatformsText: "Zie hoe 99designs presteert ten opzichte van 25+ andere freelance marktplaatsen",
 readPlatformReviews: "Lees Platform Reviews →",
 readPlatformReviewsText: "Echte freelancer en klant ervaringen over alle grote design platforms",
 calculateYourRate: "Bereken Je Tarief →",
 calculateYourRateText: "Bepaal concurrerende prijzen voor designwerk op freelance platforms",
 designPlatformComparison: "Design Platform Vergelijking →",
 designPlatformComparisonText: "99designs vs Fiverr, Upwork en andere design marktplaatsen",

 findPerfectPlatform: "Vind Jouw Perfecte Designplatform",
 findPerfectPlatformText: "Vergelijk 25+ platforms om de beste match te ontdekken voor je designbehoeften, budget en project complexiteit.",
 browseAllPlatforms: "Bekijk Alle Platforms",
 getWeeklyInsights: "Krijg Wekelijkse Inzichten"
 } : {
 badge: "99designs Pricing Guide",
 title: "99designs Pricing 2026: Complete Cost Guide for Logo & Design Contests",
 subtitle: "Understand the full cost structure of 99designs, from Bronze to Platinum packages, designer payouts, and whether design contests are worth the investment.",
 cta1: "Compare Design Platforms",
 cta2: "See Alternatives",
 intro: "99designs is one of the largest design contest platforms in the world, where businesses post a prize and dozens of designers compete with concepts. But how much does it really cost? This guide provides transparent pricing for all project types, what you get at each tier, how designers get paid, and whether you're getting value for money.",

 pricingOverview: "99designs Pricing Overview",
 pricingIntro: "99designs uses a tiered pricing model where higher packages attract more designers and offer additional features. Prices vary by project type:",

 logoContestTitle: "Logo Design Contest Pricing",
 websiteContestTitle: "Website Design Contest Pricing",
 packageContestTitle: "Packaging Design Contest Pricing",

 bronzeTier: "Bronze",
 bronzePrice: "$299",
 bronzeDesigners: "~30 designs",
 bronzeFeatures: [
 "Basic competition level",
 "Standard timeline (7-10 days)",
 "100% money-back guarantee (60 days)",
 "Copyright transfer"
 ],

 silverTier: "Silver",
 silverPrice: "$499",
 silverDesigners: "~60 designs",
 silverFeatures: [
 "All Bronze features",
 "Mid-level designers",
 "Featured listing (more visibility)",
 "NDA protection"
 ],

 goldTier: "Gold",
 goldPrice: "$799",
 goldDesigners: "~90 designs",
 goldBadge: "MOST POPULAR",
 goldFeatures: [
 "All Silver features",
 "Top-level designers",
 "Dedicated account manager",
 "Priority support",
 "Extra revisions"
 ],

 platinumTier: "Platinum",
 platinumPrice: "$1,199",
 platinumDesigners: "~60 premium designs",
 platinumFeatures: [
 "All Gold features",
 "Handpicked elite designers",
 "Dedicated project manager",
 "Highest priority matching",
 "Premium design quality"
 ],

 logoWebsitePricing: "Logo + Website Bundle Pricing",
 logoWebsiteIntro: "99designs offers bundled pricing for multiple projects run simultaneously:",
 logoWebsitePrice: "Starting at $2,000",
 logoWebsiteSavings: "(~15% savings vs separate contests)",

 oneToOneTitle: "1-to-1 Project Pricing (No Contest)",
 oneToOneIntro: "If you'd rather work directly with one designer instead of hosting a contest:",
 oneToOneDesignerSets: "Designer sets price",
 oneToOneTypicalRange: "Typical range",
 oneToOneNoFee: "No platform fee on top of designer price",
 oneToOneFasterTimeline: "Faster timeline (no contest phase)",
 oneToOneDirectContact: "Direct communication with chosen designer",

 contestBreakdown: "What You Get With Each Contest Tier",

 designsReceived: "Designs Received",
 designsReceivedText: "Higher tiers attract more submissions. Bronze: ~30 designs, Silver: ~60 designs, Gold: ~90 designs, Platinum: ~60 premium designs (handpicked elite designers).",

 designerQuality: "Designer Quality",
 designerQualityText: "Bronze attracts beginners. Gold/Platinum attract Top-Level and Elite designers with proven portfolios.",

 timelineSpeed: "Timeline Speed",
 timelineSpeedText: "Bronze/Silver: 7-10 days. Gold: 5-7 days with fast-track options. Platinum: 3-5 days with highest priority.",

 supportLevel: "Support Level",
 supportLevelText: "Bronze/Silver: Standard support. Gold: Priority support. Platinum: Dedicated project manager guiding you through every stage.",

 revisionRounds: "Revision Rounds",
 revisionRoundsText: "All tiers get revision rounds, but Gold/Platinum get faster turnaround times and more flexibility.",

 additionalCosts: "Additional Costs to Consider",

 upgradesMidContest: "Upgrades Mid-Contest",
 upgradesMidContestText: "You can upgrade to a higher tier during a contest. Cost: $100-$300 depending on jump level.",

 extendTimeline: "Extend Timeline",
 extendTimelineText: "+$25-$50 to extend your contest by 3-7 days if you need more time for decisions.",

 extraDesignerInvites: "Extra Designer Invites",
 extraDesignerInvitesText: "Invite specific designers to your contest: $10-$20 per invite.",

 blindContest: "Blind Contest Option",
 blindContestText: "+$100 to make your contest private (designers can't see each other's work).",

 designerPayoutStructure: "How Do Designers Get Paid?",
 designerPayoutIntro: "Understanding how designers are compensated helps you evaluate whether pricing is fair:",

 designerPayout: "Designer Payout",
 designerPayoutDetails: "99designs takes 30-40% platform fees for contests. For 1-to-1 projects, fees vary: Entry-level (15%), Mid-level (10%), Top-level (5%). Contest winners receive:",
 designerPayoutBronze: "Bronze contest ($299 client price) → ~$179-$209 designer payout (60-70%)",
 designerPayoutSilver: "Silver contest ($499 client price) → ~$299-$349 designer payout (60-70%)",
 designerPayoutGold: "Gold contest ($799 client price) → ~$479-$559 designer payout (60-70%)",
 designerPayoutPlatinum: "Platinum contest ($1,199 client price) → ~$719-$839 designer payout (60-70%)",

 realCostAnalysis: "Real Cost Analysis: Is 99designs Worth It?",
 realCostIntro: "Let's break down the value per design received:",

 costPerDesign: "Cost Per Design",
 costPerDesignBronze: "Bronze: $299 ÷ 30 designs = $9.97 per concept",
 costPerDesignSilver: "Silver: $499 ÷ 60 designs = $8.32 per concept",
 costPerDesignGold: "Gold: $799 ÷ 90 designs = $8.88 per concept",
 costPerDesignPlatinum: "Platinum: $1,199 ÷ 60 premium designs = $19.98 per concept",

 valueInsight: "Value Insight",
 valueInsightText: "You're primarily paying for variety and designer quality, not volume. Gold offers the best balance between price, quality, and options.",

 prosAndCons: "Pros & Cons of 99designs Pricing",
 advantages: "Advantages",
 advantagesList: [
 { title: "Fixed Costs", text: "You know exactly what you'll pay upfront—no hidden fees unless you add upgrades" },
 { title: "Multiple Options", text: "Receive dozens of designs to choose from vs just 1-2 from traditional agencies" },
 { title: "Money-Back Guarantee", text: "If unsatisfied, you can request a refund (with conditions)" },
 { title: "Copyright Included", text: "Full rights transfer upon winner selection—no extra fees" },
 { title: "Predictable Timelines", text: "Contests end within 7-10 days, faster than most agency projects" }
 ],
 disadvantages: "Disadvantages",
 disadvantagesList: [
 { title: "Platform Fees", text: "30-40% platform fees for contests (designers receive 60-70% of the prize)" },
 { title: "Inconsistent Quality", text: "Bronze/Silver tiers attract many beginner designers—quality varies wildly" },
 { title: "No Direct Collaboration", text: "Contest format limits deep strategic conversations vs 1-on-1 engagements" },
 { title: "Lots of Manual Work", text: "You must review dozens of designs, provide feedback, and manage—time-consuming" },
 { title: "Limited Revisions", text: "Once won, revisions are limited—additional work can mean extra charges" }
 ],

 costComparison: "Cost Comparison: 99designs vs Alternatives",
 comparisonIntro: "How does 99designs pricing stack up against other design options?",

 freelancePlatforms: "Freelance Platforms (Upwork, Fiverr)",
 freelancePlatformsCost: "$100-$500 for logo design",
 freelancePlatformsPros: "Lower costs, direct collaboration, more flexibility",
 freelancePlatformsCons: "Must find/vet designers, quality less guaranteed",

 designAgencies: "Design Agencies",
 designAgenciesCost: "$2,000-$10,000+ for logo design",
 designAgenciesPros: "Highest quality, strategic guidance, brand expertise",
 designAgenciesCons: "5-10x higher prices, longer timelines (4-8+ weeks)",

 aiDesignTools: "AI Design Tools (Looka, Canva)",
 aiDesignToolsCost: "$20-$100 for AI-generated logos",
 aiDesignToolsPros: "Instant delivery, very cheap, unlimited revisions",
 aiDesignToolsCons: "No human creativity, generic output, limited customization",

 twentyNineDesigns: "99designs",
 twentyNineDesignsCost: "$299-$1,199 for logo design",
 twentyNineDesignsPros: "Multiple options, fixed pricing, copyright included, 100% money-back guarantee",
 twentyNineDesignsCons: "30-40% platform fees, inconsistent quality at low tiers",

 whoShouldUse: "Who Should Use 99designs?",
 goodFitTitle: "You're a Good Fit If:",
 goodFitList: [
 "You have a budget of $500-$799 (Gold tier is sweet spot)",
 "You value multiple design options over deep collaboration",
 "You have time to review dozens of designs",
 "You have clear brand guidelines to share with designers",
 "You want a quick turnaround (7-10 days)",
 "You're comfortable managing a contest process"
 ],
 skipIfTitle: "Skip If:",
 skipIfList: [
 "Your budget is under $300 (quality is too low at Bronze tier)",
 "You want strategic brand guidance, not just design execution",
 "You have a complex design need requiring deep collaboration",
 "You want to work directly with one trusted designer",
 "You're not prepared to review dozens of designs",
 "You'd rather explore AI-generated options for under $100"
 ],

 finalVerdict: "Final Verdict: Is 99designs Worth It?",
 verdictText: "99designs offers good value at Gold/Platinum tiers ($799-$1,199) if you value variety and can handle the contest process. Bronze/Silver ($299-$499) attract too many beginners—quality is hit-or-miss. Note: Platinum offers fewer designs (60) but higher quality than Gold (90).",
 verdictRecommendation: "Best for:",
 verdictRecommendationText: "Businesses with $500-$799 budgets who want multiple design options without paying agency prices. If your budget is under $300, try Fiverr or AI tools. Above $1,199, consider boutique agencies for more strategic value. Gold offers the best balance: 90 designs with dedicated account manager for $799.",
 verdictRating: "3.5/5",
 verdictSubtext: "Solid for mid-market businesses, but not best for tight budgets or complex needs",

 exploreMore: "Explore More Design Platforms",
 compareAllPlatforms: "Compare All Platforms →",
 compareAllPlatformsText: "See how 99designs compares to 25+ other freelance marketplaces",
 readPlatformReviews: "Read Platform Reviews →",
 readPlatformReviewsText: "Real freelancer and client experiences across all major design platforms",
 calculateYourRate: "Calculate Your Rate →",
 calculateYourRateText: "Determine competitive pricing for design work on freelance platforms",
 designPlatformComparison: "Design Platform Comparison →",
 designPlatformComparisonText: "99designs vs Fiverr, Upwork, and other design marketplaces",

 findPerfectPlatform: "Find Your Perfect Design Platform",
 findPerfectPlatformText: "Compare 25+ platforms to discover the best fit for your design needs, budget, and project complexity.",
 browseAllPlatforms: "Browse All Platforms",
 getWeeklyInsights: "Get Weekly Insights"
 };

 const jsonLd = {
 "@context": "https://schema.org",
 "@type": "Article",
 "headline": locale === "nl"
 ? "99designs Prijzen 2026: Complete Kostengids voor Logo & Design Wedstrijden"
 : "99designs Pricing 2026: Complete Cost Guide for Logo & Design Contests",
 "description": locale === "nl"
 ? "Volledige uitsplitsing van 99designs prijzen, wat je krijgt bij elke tier, ontwerper uitbetalingen, en of design wedstrijden de investering waard zijn."
 : "Complete breakdown of 99designs pricing, what you get at each tier, designer payouts, and whether design contests are worth the investment.",
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
 "dateModified": "2026-01-15"
 };

 return (
 <><script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 /><main className="flex-1 bg-white dark:bg-gray-900">{/* Hero Section */}
 <section className="bg-gradient-to-br from-secondary via-secondary-medium to-secondary-light dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl"><div className="text-center"><div className="inline-block bg-accent/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"><span className="text-accent font-semibold">{content.badge}</span></div><h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{content.title}
 </h1><p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">{content.subtitle}
 </p><div className="flex flex-col sm:flex-row gap-4 justify-center"><Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark px-8 py-4 text-lg font-heading font-semibold text-white transition-all shadow-xl hover:shadow-2xl"
 >{content.cta1}
 <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></Link><Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 text-secondary px-8 py-4 text-lg font-heading font-semibold transition-all shadow-xl"
 >{content.cta2}
 </Link></div></div></div></section>{/* Main Content */}
 <article className="py-16 md:py-24"><div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">{/* Introduction */}
 <div className="prose prose-lg dark:prose-invert max-w-none mb-12"><p className="text-xl text-text-secondary dark:text-gray-300 leading-relaxed">{content.intro}
 </p></div>{/* Pricing Overview */}
 <section className="mb-16"><h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">{content.pricingOverview}
 </h2><p className="text-lg text-text-secondary dark:text-gray-300 mb-8">{content.pricingIntro}
 </p>{/* Logo Contest Pricing */}
 <div className="mb-12"><h3 className="font-heading text-2xl font-bold text-secondary dark:text-white mb-6">{content.logoContestTitle}
 </h3><div className="grid md:grid-cols-4 gap-6">{/* Bronze */}
 <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700"><h4 className="font-heading text-lg font-bold text-gray-600 dark:text-gray-400 mb-2">{content.bronzeTier}
 </h4><div className="text-3xl font-bold text-secondary dark:text-white mb-1">{content.bronzePrice}
 </div><div className="text-sm text-text-muted mb-4">{content.bronzeDesigners}
 </div><ul className="space-y-2 text-sm text-text-secondary dark:text-gray-300">{content.bronzeFeatures.map((feature, i) =>(
 <li key={i} className="flex items-start"><span className="text-primary mr-2">•</span>{feature}
 </li>))}
 </ul></div>{/* Silver */}
 <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700"><h4 className="font-heading text-lg font-bold text-gray-600 dark:text-gray-400 mb-2">{content.silverTier}
 </h4><div className="text-3xl font-bold text-secondary dark:text-white mb-1">{content.silverPrice}
 </div><div className="text-sm text-text-muted mb-4">{content.silverDesigners}
 </div><ul className="space-y-2 text-sm text-text-secondary dark:text-gray-300">{content.silverFeatures.map((feature, i) =>(
 <li key={i} className="flex items-start"><span className="text-accent mr-2">•</span>{feature}
 </li>))}
 </ul></div>{/* Gold */}
 <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-lg p-6 shadow-xl border-2 border-accent"><div className="text-xs font-bold text-accent mb-2">{content.goldBadge}
 </div><h4 className="font-heading text-lg font-bold text-accent mb-2">{content.goldTier}
 </h4><div className="text-3xl font-bold text-secondary dark:text-white mb-1">{content.goldPrice}
 </div><div className="text-sm text-text-muted mb-4">{content.goldDesigners}
 </div><ul className="space-y-2 text-sm text-text-secondary dark:text-gray-300">{content.goldFeatures.map((feature, i) =>(
 <li key={i} className="flex items-start"><span className="text-accent mr-2">•</span>{feature}
 </li>))}
 </ul></div>{/* Platinum */}
 <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700"><h4 className="font-heading text-lg font-bold text-gray-600 dark:text-gray-400 mb-2">{content.platinumTier}
 </h4><div className="text-3xl font-bold text-secondary dark:text-white mb-1">{content.platinumPrice}
 </div><div className="text-sm text-text-muted mb-4">{content.platinumDesigners}
 </div><ul className="space-y-2 text-sm text-text-secondary dark:text-gray-300">{content.platinumFeatures.map((feature, i) =>(
 <li key={i} className="flex items-start"><span className="text-primary mr-2">•</span>{feature}
 </li>))}
 </ul></div></div></div>{/* Bundle Pricing */}
 <div className="bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-lg p-6 border-l-4 border-primary"><h3 className="font-heading text-xl font-bold text-secondary dark:text-white mb-3">{content.logoWebsitePricing}
 </h3><p className="text-text-secondary dark:text-gray-300 mb-3">{content.logoWebsiteIntro}
 </p><div className="flex items-baseline gap-3"><span className="text-2xl font-bold text-primary">{content.logoWebsitePrice}</span><span className="text-sm text-text-muted">{content.logoWebsiteSavings}</span></div></div></section>{/* 1-to-1 Pricing */}
 <section className="mb-16"><div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg"><h2 className="font-heading text-2xl font-bold text-secondary dark:text-white mb-4">{content.oneToOneTitle}
 </h2><p className="text-text-secondary dark:text-gray-300 mb-6">{content.oneToOneIntro}
 </p><div className="grid md:grid-cols-2 gap-6"><div className="bg-accent/5 dark:bg-accent/10 rounded-lg p-4"><div className="text-sm text-text-muted mb-1">{content.oneToOneDesignerSets}</div><div className="text-xl font-bold text-secondary dark:text-white">{content.oneToOneTypicalRange}: {locale === "nl" ? "€93-€930+" : "$100-$1,000+"}
 </div></div><ul className="space-y-2 text-sm text-text-secondary dark:text-gray-300"><li className="flex items-start"><svg className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{content.oneToOneNoFee}
 </li><li className="flex items-start"><svg className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{content.oneToOneFasterTimeline}
 </li><li className="flex items-start"><svg className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{content.oneToOneDirectContact}
 </li></ul></div></div></section>{/* What You Get */}
 <section className="mb-16"><h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">{content.contestBreakdown}
 </h2><div className="space-y-4"><div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-primary"><h3 className="font-heading text-lg font-bold text-secondary dark:text-white mb-2">{content.designsReceived}
 </h3><p className="text-text-secondary dark:text-gray-300 text-sm">{content.designsReceivedText}
 </p></div><div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-accent"><h3 className="font-heading text-lg font-bold text-secondary dark:text-white mb-2">{content.designerQuality}
 </h3><p className="text-text-secondary dark:text-gray-300 text-sm">{content.designerQualityText}
 </p></div><div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-secondary"><h3 className="font-heading text-lg font-bold text-secondary dark:text-white mb-2">{content.timelineSpeed}
 </h3><p className="text-text-secondary dark:text-gray-300 text-sm">{content.timelineSpeedText}
 </p></div><div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-primary"><h3 className="font-heading text-lg font-bold text-secondary dark:text-white mb-2">{content.supportLevel}
 </h3><p className="text-text-secondary dark:text-gray-300 text-sm">{content.supportLevelText}
 </p></div><div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-accent"><h3 className="font-heading text-lg font-bold text-secondary dark:text-white mb-2">{content.revisionRounds}
 </h3><p className="text-text-secondary dark:text-gray-300 text-sm">{content.revisionRoundsText}
 </p></div></div></section>{/* Additional Costs */}
 <section className="mb-16"><h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">{content.additionalCosts}
 </h2><div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg"><div className="space-y-6"><div><h3 className="font-heading text-lg font-bold text-secondary dark:text-white mb-2">{content.upgradesMidContest}
 </h3><p className="text-text-secondary dark:text-gray-300 text-sm">{content.upgradesMidContestText}
 </p></div><div><h3 className="font-heading text-lg font-bold text-secondary dark:text-white mb-2">{content.extendTimeline}
 </h3><p className="text-text-secondary dark:text-gray-300 text-sm">{content.extendTimelineText}
 </p></div><div><h3 className="font-heading text-lg font-bold text-secondary dark:text-white mb-2">{content.extraDesignerInvites}
 </h3><p className="text-text-secondary dark:text-gray-300 text-sm">{content.extraDesignerInvitesText}
 </p></div><div><h3 className="font-heading text-lg font-bold text-secondary dark:text-white mb-2">{content.blindContest}
 </h3><p className="text-text-secondary dark:text-gray-300 text-sm">{content.blindContestText}
 </p></div></div></div></section>{/* Designer Payouts */}
 <section className="mb-16"><h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">{content.designerPayoutStructure}
 </h2><p className="text-lg text-text-secondary dark:text-gray-300 mb-6">{content.designerPayoutIntro}
 </p><div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-lg p-8 border-2 border-accent/30"><h3 className="font-heading text-xl font-bold text-secondary dark:text-white mb-4">{content.designerPayout}
 </h3><p className="text-text-secondary dark:text-gray-300 mb-4">{content.designerPayoutDetails}
 </p><ul className="space-y-2 text-text-secondary dark:text-gray-300"><li className="flex items-start"><span className="text-accent mr-2">→</span>{content.designerPayoutBronze}
 </li><li className="flex items-start"><span className="text-accent mr-2">→</span>{content.designerPayoutSilver}
 </li><li className="flex items-start"><span className="text-accent mr-2">→</span>{content.designerPayoutGold}
 </li><li className="flex items-start"><span className="text-accent mr-2">→</span>{content.designerPayoutPlatinum}
 </li></ul></div></section>{/* Real Cost Analysis */}
 <section className="mb-16"><h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">{content.realCostAnalysis}
 </h2><p className="text-lg text-text-secondary dark:text-gray-300 mb-6">{content.realCostIntro}
 </p><div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg mb-6"><h3 className="font-heading text-xl font-bold text-secondary dark:text-white mb-4">{content.costPerDesign}
 </h3><div className="space-y-2 text-text-secondary dark:text-gray-300 font-mono text-sm"><p>{content.costPerDesignBronze}</p><p>{content.costPerDesignSilver}</p><p className="text-accent font-bold">{content.costPerDesignGold}</p><p>{content.costPerDesignPlatinum}</p></div></div><div className="bg-accent/5 dark:bg-accent/10 border-l-4 border-accent rounded-lg p-6"><h4 className="font-heading text-lg font-bold text-secondary dark:text-white mb-3">{content.valueInsight}
 </h4><p className="text-text-secondary dark:text-gray-300">{content.valueInsightText}
 </p></div></section>{/* Pros & Cons */}
 <section className="mb-16"><h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-8">{content.prosAndCons}
 </h2><div className="grid md:grid-cols-2 gap-6"><div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6 border-2 border-green-200 dark:border-green-800"><h3 className="font-heading text-xl font-bold text-green-800 dark:text-green-300 mb-6 flex items-center gap-2"><span>✅</span>{content.advantages}
 </h3><ul className="space-y-4">{content.advantagesList.map((adv, idx) =>(
 <li key={idx} className="flex items-start gap-3"><span className="text-green-600 text-xl mt-1">→</span><div><strong className="text-gray-900 dark:text-white block mb-1">{adv.title}</strong><span className="text-sm text-gray-700 dark:text-gray-300">{adv.text}</span></div></li>))}
 </ul></div><div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border-2 border-red-200 dark:border-red-800"><h3 className="font-heading text-xl font-bold text-red-800 dark:text-red-300 mb-6 flex items-center gap-2"><span>❌</span>{content.disadvantages}
 </h3><ul className="space-y-4">{content.disadvantagesList.map((dis, idx) =>(
 <li key={idx} className="flex items-start gap-3"><span className="text-red-600 text-xl mt-1">→</span><div><strong className="text-gray-900 dark:text-white block mb-1">{dis.title}</strong><span className="text-sm text-gray-700 dark:text-gray-300">{dis.text}</span></div></li>))}
 </ul></div></div></section>{/* Cost Comparison */}
 <section className="mb-16"><h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">{content.costComparison}
 </h2><p className="text-lg text-text-secondary dark:text-gray-300 mb-8">{content.comparisonIntro}
 </p><div className="space-y-4"><div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"><h3 className="font-heading text-lg font-bold text-secondary dark:text-white mb-2">{content.freelancePlatforms}
 </h3><p className="text-2xl font-bold text-primary mb-2">{content.freelancePlatformsCost}</p><p className="text-sm text-green-600 dark:text-green-400 mb-1">✅ {content.freelancePlatformsPros}</p><p className="text-sm text-red-600 dark:text-red-400">❌ {content.freelancePlatformsCons}</p></div><div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"><h3 className="font-heading text-lg font-bold text-secondary dark:text-white mb-2">{content.designAgencies}
 </h3><p className="text-2xl font-bold text-primary mb-2">{content.designAgenciesCost}</p><p className="text-sm text-green-600 dark:text-green-400 mb-1">✅ {content.designAgenciesPros}</p><p className="text-sm text-red-600 dark:text-red-400">❌ {content.designAgenciesCons}</p></div><div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"><h3 className="font-heading text-lg font-bold text-secondary dark:text-white mb-2">{content.aiDesignTools}
 </h3><p className="text-2xl font-bold text-primary mb-2">{content.aiDesignToolsCost}</p><p className="text-sm text-green-600 dark:text-green-400 mb-1">✅ {content.aiDesignToolsPros}</p><p className="text-sm text-red-600 dark:text-red-400">❌ {content.aiDesignToolsCons}</p></div><div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-lg p-6 border-2 border-accent"><h3 className="font-heading text-lg font-bold text-accent mb-2">{content.twentyNineDesigns}
 </h3><p className="text-2xl font-bold text-secondary dark:text-white mb-2">{content.twentyNineDesignsCost}</p><p className="text-sm text-green-600 dark:text-green-400 mb-1">✅ {content.twentyNineDesignsPros}</p><p className="text-sm text-red-600 dark:text-red-400">❌ {content.twentyNineDesignsCons}</p></div></div></section>{/* Who Should Use */}
 <section className="mb-16"><h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">{content.whoShouldUse}
 </h2><div className="space-y-6"><div className="bg-gradient-to-r from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-lg p-6 border-l-4 border-accent"><h3 className="font-heading text-xl font-bold text-secondary dark:text-white mb-4 flex items-center gap-2"><span>✅</span>{content.goodFitTitle}
 </h3><ul className="space-y-3 text-text-secondary dark:text-gray-300">{content.goodFitList.map((item, idx) =>(
 <li key={idx} className="flex items-start gap-2"><span className="text-accent mt-1">→</span><span>{item}</span></li>))}
 </ul></div><div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg p-6 border-l-4 border-primary"><h3 className="font-heading text-xl font-bold text-secondary dark:text-white mb-4 flex items-center gap-2">{content.skipIfTitle}
 </h3><ul className="space-y-3 text-text-secondary dark:text-gray-300">{content.skipIfList.map((item, idx) =>(
 <li key={idx} className="flex items-start gap-2"><span className="text-primary mt-1">→</span><span>{item}</span></li>))}
 </ul></div></div></section>{/* Final Verdict */}
 <section className="mb-16"><div className="bg-gradient-to-br from-secondary/10 via-primary/10 to-accent/10 dark:from-secondary/20 dark:via-primary/20 dark:to-accent/20 rounded-2xl shadow-lg p-8 border-2 border-secondary/30 dark:border-secondary/50"><h2 className="font-heading text-3xl font-bold text-secondary dark:text-white mb-6 flex items-center gap-3">{content.finalVerdict}
 </h2><p className="text-lg text-text-secondary dark:text-gray-300 mb-6">{content.verdictText}
 </p><p className="text-lg text-text-secondary dark:text-gray-300 mb-4"><strong className="text-secondary dark:text-white">{content.verdictRecommendation}</strong>{content.verdictRecommendationText}
 </p><div className="mt-6 bg-white dark:bg-gray-900 rounded-xl p-6 text-center"><div className="text-5xl font-heading font-bold text-secondary dark:text-accent mb-2">{content.verdictRating}
 </div><p className="text-gray-600 dark:text-gray-400">{content.verdictSubtext}</p></div></div></section>{/* Internal Links */}
 <section className="mb-16"><h2 className="font-heading text-3xl font-bold text-secondary dark:text-white mb-6">{content.exploreMore}
 </h2><div className="grid sm:grid-cols-2 gap-6"><Link href={`/${locale}/platforms`} className="group bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-xl p-6 hover:shadow-lg transition-all border border-secondary/20"><h3 className="font-heading font-bold text-secondary dark:text-white mb-2 group-hover:text-secondary transition-colors">{content.compareAllPlatforms}
 </h3><p className="text-gray-600 dark:text-gray-400 text-sm">{content.compareAllPlatformsText}
 </p></Link><Link href={`/${locale}/reviews`} className="group bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 hover:shadow-lg transition-all border border-accent/20"><h3 className="font-heading font-bold text-secondary dark:text-white mb-2 group-hover:text-accent transition-colors">{content.readPlatformReviews}
 </h3><p className="text-gray-600 dark:text-gray-400 text-sm">{content.readPlatformReviewsText}
 </p></Link><Link href={`/${locale}/tools/rate-calculator`} className="group bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 hover:shadow-lg transition-all border border-primary/20"><h3 className="font-heading font-bold text-secondary dark:text-white mb-2 group-hover:text-primary transition-colors">{content.calculateYourRate}
 </h3><p className="text-gray-600 dark:text-gray-400 text-sm">{content.calculateYourRateText}
 </p></Link><Link href={`/${locale}/comparisons`} className="group bg-gradient-to-br from-secondary/10 to-primary/10 dark:from-secondary/20 dark:to-primary/20 rounded-xl p-6 hover:shadow-lg transition-all border border-secondary/20"><h3 className="font-heading font-bold text-secondary dark:text-white mb-2 group-hover:text-secondary transition-colors">{content.designPlatformComparison}
 </h3><p className="text-gray-600 dark:text-gray-400 text-sm">{content.designPlatformComparisonText}
 </p></Link></div></section></div></article>{/* Final CTA */}
 <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-4xl mx-auto text-center"><h2 className="font-heading text-3xl sm:text-4xl font-bold text-secondary dark:text-white mb-6">{content.findPerfectPlatform}
 </h2><p className="text-xl text-text-secondary dark:text-gray-300 mb-8 max-w-2xl mx-auto">{content.findPerfectPlatformText}
 </p><div className="flex flex-wrap justify-center gap-4"><Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-secondary text-white font-heading font-bold hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl"
 >{content.browseAllPlatforms}
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link><Link
 href={`/${locale}/newsletter`}
 className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white dark:bg-gray-800 text-secondary dark:text-accent border-2 border-secondary dark:border-accent font-heading font-bold hover:bg-secondary/5 dark:hover:bg-accent/10 transition-all"
 >{content.getWeeklyInsights}
 </Link></div></div></div></section></main></>);
}
