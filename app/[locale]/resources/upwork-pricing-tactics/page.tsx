import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "nl") {
    return {
      title: "Maximaliseer Je Inkomsten op Upwork: Bewezen Prijsstrategieën (2025)",
      description: "Verhoog je Upwork-inkomen met bewezen prijsstrategieën. Leer concurrerende tarieven instellen en goed betaalde projecten winnen.",
      keywords: "upwork tarieven, upwork prijsstrategie, upwork inkomsten, upwork kosten, upwork prijzen instellen, upwork verdiensten maximaliseren",
      openGraph: {
        title: "Maximaliseer Je Inkomsten op Upwork: Bewezen Prijsstrategieën (2025)",
        description: "Beheers Upwork-prijzen met tactieken die worden gebruikt door top-beoordeelde freelancers. Win meer projecten en verdien meer per uur.",
        type: "article",
      },
    };
  }

  return {
    title: "Maximizing Your Earnings on Upwork: Proven Pricing Tactics (2025)",
    description: "Boost your Upwork income with proven pricing strategies. Learn to set competitive rates and win high-paying projects consistently.",
    keywords: "upwork pricing, upwork rates, upwork earnings, upwork fees, upwork pricing strategy, maximize upwork income",
    openGraph: {
      title: "Maximizing Your Earnings on Upwork: Proven Pricing Tactics (2025)",
      description: "Master Upwork pricing with tactics used by top-rated freelancers. Win more projects and earn more per hour.",
      type: "article",
    },
  };
}

export default async function UpworkPricingTacticsPage({ params }: Props) {
  const { locale } = await params;

  const content = locale === "nl" ? {
    badge: "Upwork Succeshandleiding",
    title: "Maximaliseer Je Inkomsten op Upwork: Bewezen Prijsstrategieën",
    subtitle: "Leer de prijsstrategieën die top-beoordeelde Upwork-freelancers gebruiken om 2-3x meer te verdienen dan gemiddelde freelancers.",
    cta1: "Bereken Je Upwork-Tarief",
    cta2: "Vergelijk Platforms",
    intro: "Upwork is 's werelds grootste freelancemarktplaats, met meer dan €2,8 miljard aan jaarlijks bruto dienstenvolume. Met zoveel geld dat door het platform stroomt, is er enorm verdienpotentieel—maar alleen als je weet hoe je jezelf correct moet prijzen. Deze gids onthult de exacte tactieken die top-beoordeelde Upwork-freelancers gebruiken om hun inkomen te maximaliseren terwijl ze een gestage stroom van hoogwaardige klanten behouden.",

    section1Title: "Upwork's Kostenstructuur Begrijpen (En Hoe Deze Te Optimaliseren)",
    section1Subtitle: "Upwork's Gelaagde Servicekosten",
    fee1Title: "Eerste €465 met een klant",
    fee1Desc: "Hoogste kostencategorie, beïnvloedt vroege projecten het meest",
    fee2Title: "€465,01 tot €9.300 met een klant",
    fee2Desc: "Middencategorie, waar het meeste doorlopende werk gebeurt",
    fee3Title: "Meer dan €9.300 met een klant",
    fee3Desc: "Beste tarief, haalbaar met langetermijnklanten",

    insightTitle: "Kritisch Inzicht: Lifetime Value Per Klant",
    insightText: "De kostenstructuur is per klant, niet per project. Dit betekent dat als je langetermijnrelaties kunt opbouwen, je effectieve vergoeding dramatisch daalt. Een klant die je €14.000 aan werk geeft, betekent dat je gemiddeld slechts 8,3% aan kosten betaalt in plaats van 20%.",

    exampleTitle: "Praktijkvoorbeeld: Impact van Kosten op Verdiensten",
    scenarioA: "Scenario A: Meerdere Kleine Klanten",
    scenarioAList: [
      "10 klanten × €370 elk = €3.700 bruto",
      "Al het werk in 20% kostencategorie",
      "Upwork-kosten: €740 (20%)",
      "Netto-inkomen: €2.960"
    ],
    scenarioB: "Scenario B: Eén Langetermijnklant",
    scenarioBList: [
      "1 klant × €3.700 totaal",
      "€465 @ 20% + €3.235 @ 10%",
      "Upwork-kosten: €417 (11,25%)",
      "Netto-inkomen: €3.283"
    ],
    resultText: "Resultaat: Zelfde bruto-inkomen, €323 meer netto (11% toename)",

    section2Title: "Hoe Stel Je Je Upwork-Uurtarief In",
    formulaTitle: "De Upwork-Tariefformule",
    formulaText: "Upwork-Tarief = Gewenst Tarief ÷ (1 - 0,20)",
    formulaSimple: "Of simpelweg: Gewenst Tarief × 1,25",
    formulaExplanation: "Als je €56/uur netto wilt verdienen na Upwork's 20% vergoeding, moet je €70/uur berekenen.",
    formulaExample: "€56 gewenst ÷ 0,80 (na 20% kosten) = €70 Upwork-tarief",

    step1Title: "Stap 1: Onderzoek Je Markttarief",
    step1Text: "Voordat je je tarief instelt, onderzoek wat anderen in jouw vaardighedencategorie berekenen:",
    step1List: [
      "Zoek op Upwork naar je exacte vaardigheid (bijv. \"React-ontwikkelaar\")",
      "Filter op \"Top Rated\" en \"Expert Level\"",
      "Noteer de uurtarieven van freelancers met vergelijkbare ervaring",
      "Identificeer de 25e, 50e en 75e percentiel tarieven"
    ],

    step2Title: "Stap 2: Positioneer Jezelf Strategisch",
    entryPricing: "Instaptarieven",
    entryPercentile: "25e percentiel",
    entryDesc: "Nieuw op Upwork, portfolio en reviews opbouwen",
    competitivePricing: "Concurrerende Prijzen",
    competitivePercentile: "50e percentiel",
    competitiveDesc: "Gevestigd profiel, enkele reviews, solide portfolio",
    premiumPricing: "Premium Prijzen",
    premiumPercentile: "75e+ percentiel",
    premiumDesc: "Top Rated, uitstekende reviews, bewezen expertise",

    step3Title: "Stap 3: Houd Rekening Met Je Ervaringsniveau",
    experienceLevel: "Ervaringsniveau",
    rateMultiplier: "Tariefmultiplicator",
    example: "Voorbeeld (Basis: €47)",
    entryLevel: "Instapniveau (0-1 jaar)",
    intermediate: "Gemiddeld (2-3 jaar)",
    advanced: "Gevorderd (4-6 jaar)",
    expert: "Expert (7+ jaar)",

    cta1Title: "Bereken Je Ideale Upwork-Tarief",
    cta1Text: "Gebruik onze gratis calculator om je optimale uurtarief te bepalen na Upwork-kosten",
    cta1Button: "Bereken Je Tarief",

    section3Title: "7 Bewezen Tactieken om Goed Betaalde Upwork-Projecten Te Winnen",

    tactic1Title: "Richt Je op Langetermijnklanten om Impact van Kosten Te Verminderen",
    tactic1Text: "Focus op klanten die doorlopend werk nodig hebben in plaats van eenmalige projecten. Zoek naar trefwoorden zoals \"langetermijn\", \"doorlopend\", \"retainer\", \"maandelijks\" of \"wekelijkse uren nodig\".",
    tactic1Tip: "Pro Tip: Wanneer je lifetime facturering met een klant €9.300 overschrijdt, neemt Upwork slechts 5%. Dit kan duizenden aan je jaarinkomen toevoegen.",

    tactic2Title: "Gebruik Gelaagde Voorstellen om Projectwaarde Te Verhogen",
    tactic2Text: "In plaats van één optie voor te stellen, bied drie niveaus aan (Basis, Standaard, Premium). Deze psychologische tactiek verhoogt de gemiddelde projectwaarde met 30-50%.",
    basicTier: "Basis - €465",
    basicList: ["Kernleveringen", "1 herzieningsronde", "7 dagen levering"],
    standardTier: "Standaard - €745",
    mostPopular: "MEEST POPULAIR",
    standardList: ["Alle Basis-functies", "3 herzieningsrondes", "5 dagen levering", "Bronbestanden inbegrepen"],
    premiumTier: "Premium - €1.115",
    premiumList: ["Alle Standaard-functies", "Onbeperkte herzieningen", "3 dagen levering", "Prioriteitsondersteuning"],

    tactic3Title: "Gebruik \"Boosted Proposals\" Strategisch",
    tactic3Text: "Upwork stelt je in staat om voorstellen te boosten voor €0,90-€4,65 om bovenaan de lijst van de klant te verschijnen. Gebruik dit voor hoogwaardige projecten (€930+) waar de boost-kosten verwaarloosbaar zijn.",
    tactic3Example: "ROI Voorbeeld: Besteed €2,80 om een voorstel te boosten voor een €4.650 project. Zelfs met Upwork's 20% vergoeding, netto €3.717. Dat is een 132.750% ROI op je boost-investering.",

    tactic4Title: "Bouw een \"Top Rated\" Profiel op voor Premium Prijzen",
    tactic4Text: "Upwork's Top Rated badge (90%+ Job Success Score, 100% compleet profiel, €930+ verdiensten) stelt je in staat om 20-40% meer te berekenen dan niet-gebadgede freelancers.",
    tactic4List: [
      "Behoud 90%+ Job Success Score (lever kwaliteit, haal deadlines)",
      "Voltooi 100% van profielsecties (portfolio, certificeringen, tests)",
      "Verdien minimaal €930 binnen 6 maanden om badge te behouden",
      "Vraag privéfeedback aan voor eventuele negatieve reviews"
    ],

    tactic5Title: "Beheers de \"Value Ladder\" Strategie",
    tactic5Text: "Begin met een klein, laagrisico-project om je waarde te bewijzen, en verkoop dan door naar hogere-waarde diensten. Dit bouwt vertrouwen op en verhoogt lifetime klantwaarde.",
    valueLadderStep1: "Stap 1",
    valueLadderStep1Text: "Instapbod: €185-€465 quick win project",
    valueLadderStep2: "Stap 2",
    valueLadderStep2Text: "Kerndienst: €930-€2.790 hoofdproduct",
    valueLadderStep3: "Stap 3",
    valueLadderStep3Text: "Premium pakket: €4.650+ doorlopende retainer",

    tactic6Title: "Onderhandel Vaste Prijs voor Herhaalbaar Werk",
    tactic6Text: "Als je regelmatig hetzelfde type project doet, schakel dan over naar vaste prijs om je effectieve uurtarief te verhogen door efficiëntiewinsten.",
    tactic6Example: "Voorbeeld: Website-setup project",
    tactic6List: [
      "Eerste keer: 20 uur @ €70/uur = €1.400",
      "Na 10 projecten: Zelfde kwaliteit in 12 uur",
      "Vaste prijs: €1.400 ÷ 12 uur = €116/uur effectief tarief"
    ],

    tactic7Title: "Gebruik Mijlpalen om Cashflow Te Beschermen",
    tactic7Text: "Voor vaste-prijs projecten, verdeel werk altijd in gefinancierde mijlpalen. Dit zorgt ervoor dat je betaald wordt terwijl je werk voltooit en vermindert risico.",
    tactic7Example: "Mijlpalenstructuur Voorbeeld (€2.790 project):",
    tactic7List: [
      "Mijlpaal 1 (30%): Discovery & planning - €837",
      "Mijlpaal 2 (40%): Ontwikkeling & implementatie - €1.116",
      "Mijlpaal 3 (30%): Testen & levering - €837"
    ],

    cta2Title: "Begrijp Platformkosten om Verdiensten Te Maximaliseren",
    cta2Text: "Leer hoe verschillende platforms zich verhouden en welke de beste kostenstructuur biedt voor jouw diensten",
    cta2Button: "Vergelijk Platformkosten",

    section4Title: "5 Upwork-Prijsfouten Die Je Duizenden Kosten",

    mistake1Title: "1. Beginnen met Onrealistisch Lage Tarieven",
    mistake1Text: "Veel nieuwe freelancers denken dat ze €9-14/uur moeten berekenen om te concurreren. Dit trekt laagwaardige klanten aan, devalueert je werk en maakt het moeilijker om later tarieven te verhogen.",
    mistake1Solution: "Betere aanpak: Begin op het 40e-50e percentiel voor je vaardigheidsniveau. Je trekt betere klanten aan die je expertise respecteren en waarschijnlijker langetermijnpartners worden.",

    mistake2Title: "2. Tarieven Niet Aanpassen voor Upwork's 20% Vergoeding",
    mistake2Text: "Als je €47/uur wilt verdienen, betekent €47 berekenen op Upwork dat je slechts €37 netto overhoudt na de 20% servicekosten.",
    mistake2Solution: "Oplossing: Vermenigvuldig altijd je gewenste netto-tarief met 1,25 om rekening te houden met Upwork's kostenstructuur.",

    mistake3Title: "3. Elke Klant Behandelen als Een Eenmalig Project",
    mistake3Text: "Voortdurend nieuwe klanten najagen betekent dat je altijd de 20% kostencategorie betaalt. Het opbouwen van langetermijnrelaties verlaagt je effectieve vergoeding naar 5-10%.",
    mistake3Solution: "Strategie: Stel aan het einde van elk project doorlopend werk of een retainer-regeling voor. Zelfs kleine maandelijkse retainers leiden tot aanzienlijke kostenbesparingen.",

    mistake4Title: "4. Job Success Score Negeren",
    mistake4Text: "Een lage Job Success Score (onder 90%) maakt het bijna onmogelijk om goed betaalde projecten te winnen. Klanten filteren op deze metriek.",
    mistake4Solution: "Bescherming: Sluit contracten met wederzijdse overeenstemming, vraag privéfeedback aan vóór openbare reviews, en wijs moeilijke klanten beleefd af die negatieve reviews kunnen achterlaten.",

    mistake5Title: "5. Je Profiel Niet Specialiseren",
    mistake5Text: "Generalistprofielen (\"Ik kan alles!\") winnen zelden premium projecten. Specialisten vragen 40-60% hogere tarieven.",
    mistake5Solution: "Oplossing: Kies één primaire vaardigheid en word bekend als expert in die niche. Creëer een portfolio en casestudies gericht op die specialisatie.",

    section5Title: "Echte Upwork Succesverhalen: Hoe Prijsveranderingen Inkomen Verhoogden",

    story1Name: "Sarah - Contentschrijver",
    story1Before: "Voor: €23/uur, tientallen kleine klanten najagen",
    story1MonthlyBefore: "Maandelijks inkomen: ~€2.320 (100 uur @ 20% kosten)",
    story1After: "Na: €56/uur, 3 langetermijn retainer-klanten",
    story1MonthlyAfter: "Maandelijks inkomen: ~€5.580 (100 uur @ 5-10% gem. kosten)",
    story1Result: "Resultaat: 140% inkomenstoename",

    story2Name: "Marcus - Webontwikkelaar",
    story2Before: "Voor: €42/uur, vooral eenmalige projecten",
    story2MonthlyBefore: "Maandelijks inkomen: ~€5.020 (120 uur @ 20% kosten)",
    story2After: "Na: €79/uur vaste prijs + efficiëntiewinsten",
    story2MonthlyAfter: "Maandelijks inkomen: ~€9.480 (zelfde 120 factureerbare uren @ 10% gem. kosten)",
    story2Result: "Resultaat: 89% inkomenstoename",

    section6Title: "Blijf Je Freelance-Verdiensten Optimaliseren",

    resource1Title: "Bereken Je Basisstarief",
    resource1Text: "Leer de formule om je ideale uurtarief te berekenen vóór platformkosten",
    resource1Link: "Lees Handleiding →",

    resource2Title: "Onderhandelingstactieken",
    resource2Text: "Beheers de kunst van tarieven verhogen zonder klanten te verliezen",
    resource2Link: "Lees Handleiding →",

    resource3Title: "Platformkostenvergelijking",
    resource3Text: "Vergelijk kosten over alle grote freelanceplatforms",
    resource3Link: "Lees Handleiding →",

    finalCtaTitle: "Volg Je Upwork-Uren Nauwkeurig",
    finalCtaText: "Nauwkeurige tijdregistratie helpt je tarieven te valideren en je meest winstgevende projecttypes te identificeren",
    finalCtaButton: "Probeer Gratis Tijdregistratie",
  } : {
    badge: "Upwork Success Guide",
    title: "Maximizing Your Earnings on Upwork: Proven Pricing Tactics",
    subtitle: "Learn the pricing strategies that top-rated Upwork freelancers use to earn 2-3x more than average freelancers.",
    cta1: "Calculate Your Upwork Rate",
    cta2: "Compare Platforms",
    intro: "Upwork is the world's largest freelance marketplace, with over $3 billion in annual gross services volume. With that much money flowing through the platform, there's enormous earning potential—but only if you know how to price yourself correctly. This guide reveals the exact tactics that top-rated Upwork freelancers use to maximize their income while maintaining a steady stream of high-quality clients.",

    section1Title: "Understanding Upwork's Fee Structure (And How to Optimize For It)",
    section1Subtitle: "Upwork's Tiered Service Fees",
    fee1Title: "First $500 with a client",
    fee1Desc: "Highest fee tier, impacts early projects most",
    fee2Title: "$500.01 to $10,000 with a client",
    fee2Desc: "Middle tier, where most ongoing work happens",
    fee3Title: "Over $10,000 with a client",
    fee3Desc: "Best rate, achievable with long-term clients",

    insightTitle: "Critical Insight: Lifetime Value Per Client",
    insightText: "The fee structure is per client, not per project. This means if you can build long-term relationships, your effective fee drops dramatically. A client who gives you $15,000 in work means you only pay an average of 8.3% in fees instead of 20%.",

    exampleTitle: "Real Example: Fee Impact on Earnings",
    scenarioA: "Scenario A: Multiple Small Clients",
    scenarioAList: [
      "10 clients × $400 each = $4,000 gross",
      "All work in 20% fee tier",
      "Upwork fees: $800 (20%)",
      "Take-home: $3,200"
    ],
    scenarioB: "Scenario B: One Long-Term Client",
    scenarioBList: [
      "1 client × $4,000 total",
      "$500 @ 20% + $3,500 @ 10%",
      "Upwork fees: $450 (11.25%)",
      "Take-home: $3,550"
    ],
    resultText: "Result: Same gross income, $350 more take-home (11% increase)",

    section2Title: "How to Set Your Upwork Hourly Rate",
    formulaTitle: "The Upwork Rate Formula",
    formulaText: "Upwork Rate = Desired Rate ÷ (1 - 0.20)",
    formulaSimple: "Or simply: Desired Rate × 1.25",
    formulaExplanation: "If you want to take home $60/hour after Upwork's 20% fee, you need to charge $75/hour.",
    formulaExample: "$60 desired ÷ 0.80 (after 20% fee) = $75 Upwork rate",

    step1Title: "Step 1: Research Your Market Rate",
    step1Text: "Before setting your rate, research what others in your skill category are charging:",
    step1List: [
      "Search Upwork for your exact skill (e.g., \"React developer\")",
      "Filter by \"Top Rated\" and \"Expert Level\"",
      "Note the hourly rates of freelancers with similar experience",
      "Identify the 25th, 50th, and 75th percentile rates"
    ],

    step2Title: "Step 2: Position Yourself Strategically",
    entryPricing: "Entry Pricing",
    entryPercentile: "25th percentile",
    entryDesc: "New to Upwork, building portfolio and reviews",
    competitivePricing: "Competitive Pricing",
    competitivePercentile: "50th percentile",
    competitiveDesc: "Established profile, some reviews, solid portfolio",
    premiumPricing: "Premium Pricing",
    premiumPercentile: "75th+ percentile",
    premiumDesc: "Top Rated, excellent reviews, proven expertise",

    step3Title: "Step 3: Factor in Your Experience Level",
    experienceLevel: "Experience Level",
    rateMultiplier: "Rate Multiplier",
    example: "Example (Base: $50)",
    entryLevel: "Entry Level (0-1 year)",
    intermediate: "Intermediate (2-3 years)",
    advanced: "Advanced (4-6 years)",
    expert: "Expert (7+ years)",

    cta1Title: "Calculate Your Ideal Upwork Rate",
    cta1Text: "Use our free calculator to determine your optimal hourly rate after Upwork fees",
    cta1Button: "Calculate Your Rate",

    section3Title: "7 Proven Tactics to Win High-Paying Upwork Projects",

    tactic1Title: "Target Long-Term Clients to Reduce Fee Impact",
    tactic1Text: "Focus on clients who need ongoing work rather than one-off projects. Look for keywords like \"long-term,\" \"ongoing,\" \"retainer,\" \"monthly,\" or \"weekly hours needed.\"",
    tactic1Tip: "Pro Tip: When your lifetime billing with a client exceeds $10,000, Upwork only takes 5%. This can add thousands to your annual income.",

    tactic2Title: "Use Tiered Proposals to Increase Project Value",
    tactic2Text: "Instead of proposing a single option, offer three tiers (Basic, Standard, Premium). This psychological tactic increases average project value by 30-50%.",
    basicTier: "Basic - $500",
    basicList: ["Core deliverables", "1 revision round", "7-day delivery"],
    standardTier: "Standard - $800",
    mostPopular: "MOST POPULAR",
    standardList: ["All Basic features", "3 revision rounds", "5-day delivery", "Source files included"],
    premiumTier: "Premium - $1,200",
    premiumList: ["All Standard features", "Unlimited revisions", "3-day delivery", "Priority support"],

    tactic3Title: "Leverage \"Boosted Proposals\" Strategically",
    tactic3Text: "Upwork allows you to boost proposals for $0.99-$4.99 to appear at the top of the client's list. Use this for high-value projects ($1,000+) where the boost cost is negligible.",
    tactic3Example: "ROI Example: Spend $3 to boost a proposal for a $5,000 project. Even with Upwork's 20% fee, you net $3,997. That's a 133,233% ROI on your boost investment.",

    tactic4Title: "Build a \"Top Rated\" Profile for Premium Pricing",
    tactic4Text: "Upwork's Top Rated badge (90%+ Job Success Score, 100% complete profile, $1,000+ earnings) allows you to charge 20-40% more than non-badged freelancers.",
    tactic4List: [
      "Maintain 90%+ Job Success Score (deliver quality, meet deadlines)",
      "Complete 100% of profile sections (portfolio, certifications, tests)",
      "Earn at least $1,000 within 6 months to maintain badge",
      "Request private feedback for any negative reviews"
    ],

    tactic5Title: "Master the \"Value Ladder\" Strategy",
    tactic5Text: "Start with a small, low-risk project to prove your value, then upsell to higher-value services. This builds trust and increases lifetime client value.",
    valueLadderStep1: "Step 1",
    valueLadderStep1Text: "Entry offer: $200-$500 quick win project",
    valueLadderStep2: "Step 2",
    valueLadderStep2Text: "Core service: $1,000-$3,000 main deliverable",
    valueLadderStep3: "Step 3",
    valueLadderStep3Text: "Premium package: $5,000+ ongoing retainer",

    tactic6Title: "Negotiate Fixed-Price for Repeatable Work",
    tactic6Text: "If you do the same type of project frequently, switch to fixed-price to increase your effective hourly rate through efficiency gains.",
    tactic6Example: "Example: Website setup project",
    tactic6List: [
      "First time: 20 hours @ $75/hr = $1,500",
      "After 10 projects: Same quality in 12 hours",
      "Fixed price: $1,500 ÷ 12 hours = $125/hr effective rate"
    ],

    tactic7Title: "Use Milestones to Protect Cash Flow",
    tactic7Text: "For fixed-price projects, always break work into funded milestones. This ensures you get paid as you complete work and reduces risk.",
    tactic7Example: "Milestone Structure Example ($3,000 project):",
    tactic7List: [
      "Milestone 1 (30%): Discovery & planning - $900",
      "Milestone 2 (40%): Development & implementation - $1,200",
      "Milestone 3 (30%): Testing & delivery - $900"
    ],

    cta2Title: "Understand Platform Fees to Maximize Earnings",
    cta2Text: "Learn how different platforms compare and which one offers the best fee structure for your services",
    cta2Button: "Compare Platform Fees",

    section4Title: "5 Upwork Pricing Mistakes That Cost You Thousands",

    mistake1Title: "1. Starting with Unrealistically Low Rates",
    mistake1Text: "Many new freelancers think they need to charge $10-15/hour to compete. This attracts low-quality clients, devalues your work, and makes it harder to raise rates later.",
    mistake1Solution: "Better approach: Start at the 40th-50th percentile for your skill level. You'll attract better clients who respect your expertise and are more likely to become long-term partners.",

    mistake2Title: "2. Not Adjusting Rates for Upwork's 20% Fee",
    mistake2Text: "If you want to earn $50/hour, charging $50 on Upwork means you only take home $40 after the 20% service fee.",
    mistake2Solution: "Solution: Always multiply your desired take-home rate by 1.25 to account for Upwork's fee structure.",

    mistake3Title: "3. Treating Every Client as a One-Off Project",
    mistake3Text: "Chasing new clients constantly means you're always paying the 20% fee tier. Building long-term relationships drops your effective fee to 5-10%.",
    mistake3Solution: "Strategy: At the end of every project, propose ongoing work or a retainer arrangement. Even small monthly retainers add up to significant fee savings.",

    mistake4Title: "4. Ignoring Your Job Success Score",
    mistake4Text: "A low Job Success Score (below 90%) makes it nearly impossible to win high-paying projects. Clients filter by this metric.",
    mistake4Solution: "Protection: Close contracts with mutual agreement, ask for private feedback before public reviews, and politely decline difficult clients who might leave negative reviews.",

    mistake5Title: "5. Not Specializing Your Profile",
    mistake5Text: "Generalist profiles (\"I can do everything!\") rarely win premium projects. Specialists command 40-60% higher rates.",
    mistake5Solution: "Fix: Choose one primary skill and become known as an expert in that niche. Create a portfolio and case studies focused on that specialty.",

    section5Title: "Real Upwork Success Stories: How Pricing Changes Increased Income",

    story1Name: "Sarah - Content Writer",
    story1Before: "Before: $25/hour, chasing dozens of small clients",
    story1MonthlyBefore: "Monthly income: ~$2,500 (100 hours @ 20% fee)",
    story1After: "After: $60/hour, 3 long-term retainer clients",
    story1MonthlyAfter: "Monthly income: ~$6,000 (100 hours @ 5-10% avg fee)",
    story1Result: "Result: 140% income increase",

    story2Name: "Marcus - Web Developer",
    story2Before: "Before: $45/hour, mostly one-off projects",
    story2MonthlyBefore: "Monthly income: ~$5,400 (120 hours @ 20% fee)",
    story2After: "After: $85/hour fixed-price + efficiency gains",
    story2MonthlyAfter: "Monthly income: ~$10,200 (same 120 billable hrs @ 10% avg fee)",
    story2Result: "Result: 89% income increase",

    section6Title: "Continue Optimizing Your Freelance Earnings",

    resource1Title: "Calculate Your Base Rate",
    resource1Text: "Learn the formula to calculate your ideal hourly rate before platform fees",
    resource1Link: "Read Guide →",

    resource2Title: "Negotiation Tactics",
    resource2Text: "Master the art of raising rates without losing clients",
    resource2Link: "Read Guide →",

    resource3Title: "Platform Fee Comparison",
    resource3Text: "Compare fees across all major freelance platforms",
    resource3Link: "Read Guide →",

    finalCtaTitle: "Track Your Upwork Hours Accurately",
    finalCtaText: "Accurate time tracking helps you validate rates and identify your most profitable project types",
    finalCtaButton: "Try Free Time Tracker",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": locale === "nl"
      ? "Maximaliseer Je Inkomsten op Upwork: Bewezen Prijsstrategieën"
      : "Maximizing Your Earnings on Upwork: Proven Pricing Tactics",
    "description": locale === "nl"
      ? "Volledige gids voor Upwork-prijsstrategieën inclusief tarieven instellen, kostenoptimalisatie en tactieken om goed betaalde klanten te winnen."
      : "Complete guide to Upwork pricing strategies including rate setting, fee optimization, and tactics to win high-paying clients.",
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
    "datePublished": "2025-01-15",
    "dateModified": "2025-01-15"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="flex-1 bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary via-secondary-medium to-secondary-light dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center">
              <div className="inline-block bg-accent/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="text-accent font-semibold">{content.badge}</span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {content.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                {content.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/tools/rate-calculator`}
                  className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark px-8 py-4 text-lg font-heading font-semibold text-white transition-all shadow-xl hover:shadow-2xl"
                >
                  {content.cta1}
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 text-secondary px-8 py-4 text-lg font-heading font-semibold transition-all shadow-xl"
                >
                  {content.cta2}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

            {/* Introduction */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p className="text-xl text-text-secondary dark:text-gray-300 leading-relaxed">
                {content.intro}
              </p>
            </div>

            {/* Understanding Upwork Fees */}
            <section className="mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">
                {content.section1Title}
              </h2>

              <div className="bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-lg p-8 mb-8 border-2 border-primary/30">
                <h3 className="font-heading text-2xl font-bold text-secondary dark:text-white mb-4">
                  {content.section1Subtitle}
                </h3>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-secondary dark:text-white">{content.fee1Title}</span>
                      <span className="text-2xl font-bold text-primary">20%</span>
                    </div>
                    <p className="text-sm text-text-muted">{content.fee1Desc}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-secondary dark:text-white">{content.fee2Title}</span>
                      <span className="text-2xl font-bold text-accent">10%</span>
                    </div>
                    <p className="text-sm text-text-muted">{content.fee2Desc}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-secondary dark:text-white">{content.fee3Title}</span>
                      <span className="text-2xl font-bold text-secondary">5%</span>
                    </div>
                    <p className="text-sm text-text-muted">{content.fee3Desc}</p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 dark:bg-accent/10 border-l-4 border-accent rounded-lg p-6 mb-8">
                <h4 className="font-heading text-lg font-bold text-secondary dark:text-white mb-3">
                  {content.insightTitle}
                </h4>
                <p className="text-text-secondary dark:text-gray-300">
                  {content.insightText}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
                <h4 className="font-heading text-xl font-bold text-secondary dark:text-white mb-6">
                  {content.exampleTitle}
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-6">
                    <h5 className="font-semibold text-lg text-secondary dark:text-white mb-4">{content.scenarioA}</h5>
                    <ul className="space-y-2 text-text-secondary dark:text-gray-300 text-sm">
                      {content.scenarioAList.map((item, i) => (
                        <li key={i} className={i === 3 ? "font-bold pt-2 border-t border-primary/20 text-lg text-primary" : ""}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-accent/10 dark:bg-accent/20 rounded-lg p-6">
                    <h5 className="font-semibold text-lg text-secondary dark:text-white mb-4">{content.scenarioB}</h5>
                    <ul className="space-y-2 text-text-secondary dark:text-gray-300 text-sm">
                      {content.scenarioBList.map((item, i) => (
                        <li key={i} className={i === 3 ? "font-bold pt-2 border-t border-accent/20 text-lg text-accent" : ""}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 bg-gradient-to-r from-accent/20 to-accent/10 dark:from-accent/30 dark:to-accent/20 rounded-lg p-4 text-center">
                  <p className="font-bold text-secondary dark:text-white">
                    {content.resultText}
                  </p>
                </div>
              </div>
            </section>

            {/* Setting Your Upwork Rate */}
            <section className="mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">
                {content.section2Title}
              </h2>

              <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-lg p-8 mb-8">
                <h3 className="font-heading text-2xl font-bold text-secondary dark:text-white mb-4">
                  {content.formulaTitle}
                </h3>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6">
                  <p className="text-xl font-mono font-bold text-center text-secondary dark:text-white mb-4">
                    {content.formulaText}
                  </p>
                  <p className="text-center text-text-secondary dark:text-gray-300">
                    {content.formulaSimple}
                  </p>
                </div>
                <p className="text-text-secondary dark:text-gray-300 mb-4">
                  {content.formulaExplanation}
                </p>
                <div className="bg-accent/10 dark:bg-accent/20 rounded-lg p-4">
                  <p className="text-sm text-text-secondary dark:text-gray-300">
                    <strong>{locale === "nl" ? "Voorbeeld:" : "Example:"}</strong> {content.formulaExample}
                  </p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h4 className="font-heading text-xl font-bold text-secondary dark:text-white mb-4">
                    {content.step1Title}
                  </h4>
                  <p className="text-text-secondary dark:text-gray-300 mb-4">
                    {content.step1Text}
                  </p>
                  <ul className="space-y-2 text-text-secondary dark:text-gray-300">
                    {content.step1List.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h4 className="font-heading text-xl font-bold text-secondary dark:text-white mb-4">
                    {content.step2Title}
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4">
                      <h5 className="font-semibold text-secondary dark:text-white mb-2">{content.entryPricing}</h5>
                      <p className="text-2xl font-bold text-primary mb-2">{content.entryPercentile}</p>
                      <p className="text-sm text-text-secondary dark:text-gray-300">
                        {content.entryDesc}
                      </p>
                    </div>
                    <div className="bg-accent/10 dark:bg-accent/20 rounded-lg p-4">
                      <h5 className="font-semibold text-secondary dark:text-white mb-2">{content.competitivePricing}</h5>
                      <p className="text-2xl font-bold text-accent mb-2">{content.competitivePercentile}</p>
                      <p className="text-sm text-text-secondary dark:text-gray-300">
                        {content.competitiveDesc}
                      </p>
                    </div>
                    <div className="bg-secondary/10 dark:bg-secondary/20 rounded-lg p-4">
                      <h5 className="font-semibold text-secondary dark:text-white mb-2">{content.premiumPricing}</h5>
                      <p className="text-2xl font-bold text-secondary dark:text-white mb-2">{content.premiumPercentile}</p>
                      <p className="text-sm text-text-secondary dark:text-gray-300">
                        {content.premiumDesc}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h4 className="font-heading text-xl font-bold text-secondary dark:text-white mb-4">
                    {content.step3Title}
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                          <th className="p-3 font-semibold">{content.experienceLevel}</th>
                          <th className="p-3 font-semibold">{content.rateMultiplier}</th>
                          <th className="p-3 font-semibold">{content.example}</th>
                        </tr>
                      </thead>
                      <tbody className="text-text-secondary dark:text-gray-300">
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <td className="p-3">{content.entryLevel}</td>
                          <td className="p-3">0.7x - 1.0x</td>
                          <td className="p-3 font-semibold">{locale === "nl" ? "€33-€47/uur" : "$35-$50/hr"}</td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <td className="p-3">{content.intermediate}</td>
                          <td className="p-3">1.0x - 1.5x</td>
                          <td className="p-3 font-semibold">{locale === "nl" ? "€47-€70/uur" : "$50-$75/hr"}</td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <td className="p-3">{content.advanced}</td>
                          <td className="p-3">1.5x - 2.0x</td>
                          <td className="p-3 font-semibold">{locale === "nl" ? "€70-€93/uur" : "$75-$100/hr"}</td>
                        </tr>
                        <tr>
                          <td className="p-3">{content.expert}</td>
                          <td className="p-3">2.0x - 3.0x+</td>
                          <td className="p-3 font-semibold">{locale === "nl" ? "€93-€140+/uur" : "$100-$150+/hr"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA 1 */}
            <div className="bg-gradient-to-r from-primary to-primary-dark rounded-lg p-8 md:p-12 text-center text-white mb-16 shadow-xl">
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                {content.cta1Title}
              </h3>
              <p className="text-xl mb-6 opacity-90">
                {content.cta1Text}
              </p>
              <Link
                href={`/${locale}/tools/rate-calculator`}
                className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 text-secondary px-8 py-4 text-lg font-heading font-semibold transition-all shadow-lg"
              >
                {content.cta1Button}
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Winning Tactics */}
            <section className="mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">
                {content.section3Title}
              </h2>

              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border-l-4 border-accent">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-secondary dark:text-white mb-3">
                        {content.tactic1Title}
                      </h3>
                      <p className="text-text-secondary dark:text-gray-300 mb-4">
                        {content.tactic1Text}
                      </p>
                      <div className="bg-accent/10 dark:bg-accent/20 rounded-lg p-4">
                        <p className="text-sm text-text-secondary dark:text-gray-300">
                          <strong>{locale === "nl" ? "Pro Tip:" : "Pro Tip:"}</strong> {content.tactic1Tip}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border-l-4 border-primary">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-secondary dark:text-white mb-3">
                        {content.tactic2Title}
                      </h3>
                      <p className="text-text-secondary dark:text-gray-300 mb-4">
                        {content.tactic2Text}
                      </p>
                      <div className="grid md:grid-cols-3 gap-4 mt-4">
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                          <h4 className="font-semibold mb-2">{content.basicTier}</h4>
                          <ul className="text-sm space-y-1 text-text-secondary dark:text-gray-300">
                            {content.basicList.map((item, i) => <li key={i}>{item}</li>)}
                          </ul>
                        </div>
                        <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-4 border-2 border-primary">
                          <div className="text-xs font-bold text-primary mb-1">{content.mostPopular}</div>
                          <h4 className="font-semibold mb-2">{content.standardTier}</h4>
                          <ul className="text-sm space-y-1 text-text-secondary dark:text-gray-300">
                            {content.standardList.map((item, i) => <li key={i}>{item}</li>)}
                          </ul>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                          <h4 className="font-semibold mb-2">{content.premiumTier}</h4>
                          <ul className="text-sm space-y-1 text-text-secondary dark:text-gray-300">
                            {content.premiumList.map((item, i) => <li key={i}>{item}</li>)}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border-l-4 border-secondary">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-secondary dark:text-white mb-3">
                        {content.tactic3Title}
                      </h3>
                      <p className="text-text-secondary dark:text-gray-300 mb-4">
                        {content.tactic3Text}
                      </p>
                      <div className="bg-secondary/10 dark:bg-secondary/20 rounded-lg p-4">
                        <p className="text-sm text-text-secondary dark:text-gray-300">
                          <strong>{locale === "nl" ? "ROI Voorbeeld:" : "ROI Example:"}</strong> {content.tactic3Example}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border-l-4 border-accent">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-secondary dark:text-white mb-3">
                        {content.tactic4Title}
                      </h3>
                      <p className="text-text-secondary dark:text-gray-300 mb-4">
                        {content.tactic4Text}
                      </p>
                      <ul className="space-y-2 text-text-secondary dark:text-gray-300">
                        {content.tactic4List.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="w-5 h-5 text-accent mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border-l-4 border-primary">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
                      5
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-secondary dark:text-white mb-3">
                        {content.tactic5Title}
                      </h3>
                      <p className="text-text-secondary dark:text-gray-300 mb-4">
                        {content.tactic5Text}
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <div className="bg-primary/20 rounded-lg px-3 py-1 text-sm font-semibold mr-3">{content.valueLadderStep1}</div>
                          <span className="text-text-secondary dark:text-gray-300">{content.valueLadderStep1Text}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="bg-accent/20 rounded-lg px-3 py-1 text-sm font-semibold mr-3">{content.valueLadderStep2}</div>
                          <span className="text-text-secondary dark:text-gray-300">{content.valueLadderStep2Text}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="bg-secondary/20 rounded-lg px-3 py-1 text-sm font-semibold mr-3">{content.valueLadderStep3}</div>
                          <span className="text-text-secondary dark:text-gray-300">{content.valueLadderStep3Text}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border-l-4 border-accent">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
                      6
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-secondary dark:text-white mb-3">
                        {content.tactic6Title}
                      </h3>
                      <p className="text-text-secondary dark:text-gray-300 mb-4">
                        {content.tactic6Text}
                      </p>
                      <div className="bg-accent/10 dark:bg-accent/20 rounded-lg p-4">
                        <p className="text-sm text-text-secondary dark:text-gray-300 mb-2">
                          <strong>{content.tactic6Example}</strong>
                        </p>
                        <ul className="text-sm space-y-1 text-text-secondary dark:text-gray-300">
                          {content.tactic6List.map((item, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: item.replace('$125/hr effective rate', '<strong className="text-accent">$125/hr effective rate</strong>').replace('€116/uur effectief tarief', '<strong class="text-accent">€116/uur effectief tarief</strong>') }} />
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border-l-4 border-secondary">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
                      7
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-secondary dark:text-white mb-3">
                        {content.tactic7Title}
                      </h3>
                      <p className="text-text-secondary dark:text-gray-300 mb-4">
                        {content.tactic7Text}
                      </p>
                      <div className="bg-secondary/10 dark:bg-secondary/20 rounded-lg p-4">
                        <p className="text-sm font-semibold text-secondary dark:text-white mb-2">
                          {content.tactic7Example}
                        </p>
                        <ul className="text-sm space-y-1 text-text-secondary dark:text-gray-300">
                          {content.tactic7List.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA 2 */}
            <div className="bg-gradient-to-r from-accent to-accent-dark rounded-lg p-8 md:p-12 text-center text-white mb-16 shadow-xl">
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                {content.cta2Title}
              </h3>
              <p className="text-xl mb-6 opacity-90">
                {content.cta2Text}
              </p>
              <Link
                href={`/${locale}/platforms`}
                className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 text-secondary px-8 py-4 text-lg font-heading font-semibold transition-all shadow-lg"
              >
                {content.cta2Button}
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Common Mistakes */}
            <section className="mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">
                {content.section4Title}
              </h2>

              <div className="space-y-6">
                <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-6 border-l-4 border-primary">
                  <h3 className="font-heading text-xl font-bold text-secondary dark:text-white mb-3">
                    {content.mistake1Title}
                  </h3>
                  <p className="text-text-secondary dark:text-gray-300 mb-3">
                    {content.mistake1Text}
                  </p>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-text-secondary dark:text-gray-300">
                      <strong>{locale === "nl" ? "Betere aanpak:" : "Better approach:"}</strong> {content.mistake1Solution}
                    </p>
                  </div>
                </div>

                <div className="bg-accent/5 dark:bg-accent/10 rounded-lg p-6 border-l-4 border-accent">
                  <h3 className="font-heading text-xl font-bold text-secondary dark:text-white mb-3">
                    {content.mistake2Title}
                  </h3>
                  <p className="text-text-secondary dark:text-gray-300 mb-3">
                    {content.mistake2Text}
                  </p>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-text-secondary dark:text-gray-300">
                      <strong>{locale === "nl" ? "Oplossing:" : "Solution:"}</strong> {content.mistake2Solution}
                    </p>
                  </div>
                </div>

                <div className="bg-secondary/5 dark:bg-secondary/10 rounded-lg p-6 border-l-4 border-secondary">
                  <h3 className="font-heading text-xl font-bold text-secondary dark:text-white mb-3">
                    {content.mistake3Title}
                  </h3>
                  <p className="text-text-secondary dark:text-gray-300 mb-3">
                    {content.mistake3Text}
                  </p>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-text-secondary dark:text-gray-300">
                      <strong>{locale === "nl" ? "Strategie:" : "Strategy:"}</strong> {content.mistake3Solution}
                    </p>
                  </div>
                </div>

                <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-6 border-l-4 border-primary">
                  <h3 className="font-heading text-xl font-bold text-secondary dark:text-white mb-3">
                    {content.mistake4Title}
                  </h3>
                  <p className="text-text-secondary dark:text-gray-300 mb-3">
                    {content.mistake4Text}
                  </p>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-text-secondary dark:text-gray-300">
                      <strong>{locale === "nl" ? "Bescherming:" : "Protection:"}</strong> {content.mistake4Solution}
                    </p>
                  </div>
                </div>

                <div className="bg-accent/5 dark:bg-accent/10 rounded-lg p-6 border-l-4 border-accent">
                  <h3 className="font-heading text-xl font-bold text-secondary dark:text-white mb-3">
                    {content.mistake5Title}
                  </h3>
                  <p className="text-text-secondary dark:text-gray-300 mb-3">
                    {content.mistake5Text}
                  </p>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-text-secondary dark:text-gray-300">
                      <strong>{locale === "nl" ? "Oplossing:" : "Fix:"}</strong> {content.mistake5Solution}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Real Success Stories */}
            <section className="mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">
                {content.section5Title}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-lg p-6 border border-accent/30">
                  <h3 className="font-heading text-xl font-bold text-secondary dark:text-white mb-4">
                    {content.story1Name}
                  </h3>
                  <div className="space-y-3 text-text-secondary dark:text-gray-300 text-sm">
                    <p><strong>{locale === "nl" ? "Voor:" : "Before:"}</strong> {content.story1Before.split(':')[1]}</p>
                    <p><strong>{locale === "nl" ? "Maandelijks inkomen:" : "Monthly income:"}</strong> {content.story1MonthlyBefore.split(':')[1]}</p>
                    <p className="pt-3 border-t border-accent/20">
                      <strong>{locale === "nl" ? "Na:" : "After:"}</strong> {content.story1After.split(':')[1]}
                    </p>
                    <p><strong>{locale === "nl" ? "Maandelijks inkomen:" : "Monthly income:"}</strong> {content.story1MonthlyAfter.split(':')[1]}</p>
                    <p className="pt-3 border-t border-accent/20 font-bold text-accent text-lg">
                      {content.story1Result}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg p-6 border border-primary/30">
                  <h3 className="font-heading text-xl font-bold text-secondary dark:text-white mb-4">
                    {content.story2Name}
                  </h3>
                  <div className="space-y-3 text-text-secondary dark:text-gray-300 text-sm">
                    <p><strong>{locale === "nl" ? "Voor:" : "Before:"}</strong> {content.story2Before.split(':')[1]}</p>
                    <p><strong>{locale === "nl" ? "Maandelijks inkomen:" : "Monthly income:"}</strong> {content.story2MonthlyBefore.split(':')[1]}</p>
                    <p className="pt-3 border-t border-primary/20">
                      <strong>{locale === "nl" ? "Na:" : "After:"}</strong> {content.story2After.split(':')[1]}
                    </p>
                    <p><strong>{locale === "nl" ? "Maandelijks inkomen:" : "Monthly income:"}</strong> {content.story2MonthlyAfter.split(':')[1]}</p>
                    <p className="pt-3 border-t border-primary/20 font-bold text-primary text-lg">
                      {content.story2Result}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Related Resources */}
            <section className="mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">
                {content.section6Title}
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <Link href={`/${locale}/resources/calculate-freelance-hourly-rate`} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                  <h3 className="font-heading text-xl font-bold text-secondary dark:text-white mb-3">
                    {content.resource1Title}
                  </h3>
                  <p className="text-text-secondary dark:text-gray-300 mb-4">
                    {content.resource1Text}
                  </p>
                  <span className="text-primary hover:underline font-semibold">
                    {content.resource1Link}
                  </span>
                </Link>

                <Link href={`/${locale}/resources/negotiate-higher-rates`} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                  <h3 className="font-heading text-xl font-bold text-secondary dark:text-white mb-3">
                    {content.resource2Title}
                  </h3>
                  <p className="text-text-secondary dark:text-gray-300 mb-4">
                    {content.resource2Text}
                  </p>
                  <span className="text-primary hover:underline font-semibold">
                    {content.resource2Link}
                  </span>
                </Link>

                <Link href={`/${locale}/resources/platform-fees-maximize-earnings`} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                  <h3 className="font-heading text-xl font-bold text-secondary dark:text-white mb-3">
                    {content.resource3Title}
                  </h3>
                  <p className="text-text-secondary dark:text-gray-300 mb-4">
                    {content.resource3Text}
                  </p>
                  <span className="text-primary hover:underline font-semibold">
                    {content.resource3Link}
                  </span>
                </Link>
              </div>
            </section>

            {/* Final CTA */}
            <div className="bg-gradient-to-br from-secondary via-secondary-medium to-secondary-light rounded-lg p-8 md:p-12 text-center text-white shadow-xl">
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                {content.finalCtaTitle}
              </h3>
              <p className="text-xl mb-6 opacity-90">
                {content.finalCtaText}
              </p>
              <Link
                href={`/${locale}/tools/time-tracker`}
                className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 text-secondary px-8 py-4 text-lg font-heading font-semibold transition-all shadow-lg"
              >
                {content.finalCtaButton}
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
