import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (locale === 'nl') {
    return {
      title: "Upwork Prijzen 2025: Complete Kostengids voor Freelancers & Opdrachtgevers",
      description: "Complete Upwork prijzengids 2025: Variabel 0-15% freelancer tarief per contract, $0.15 Connects, Freelancer Plus €19.99/maand, client fees tot 7.99%, en tips om kosten te verlagen.",
      keywords: "upwork prijzen 2025, upwork kosten, upwork tarief, upwork service fee, upwork connects prijs, upwork freelancer plus",
      openGraph: {
        title: "Upwork Prijzen 2025: Complete Kostengids voor Freelancers & Opdrachtgevers",
        description: "Complete Upwork prijzengids 2025: Variabel 0-15% freelancer tarief per contract, $0.15 Connects, Freelancer Plus €19.99/maand, client fees tot 7.99%, en tips om kosten te verlagen.",
        type: "article",
      },
    };
  }

  return {
    title: "Upwork Pricing 2025: Complete Fee Guide for Freelancers & Clients",
    description: "Complete Upwork pricing guide 2025: Variable 0-15% freelancer fee per contract, $0.15 Connects, Freelancer Plus $19.99/month, client fees up to 7.99%, and tips to reduce fees.",
    keywords: "upwork pricing 2025, upwork fees, upwork cost, upwork service fee, upwork connects price, upwork freelancer plus",
    openGraph: {
      title: "Upwork Pricing 2025: Complete Fee Guide for Freelancers & Clients",
      description: "Complete Upwork pricing guide 2025: Variable 0-15% freelancer fee per contract, $0.15 Connects, Freelancer Plus $19.99/month, client fees up to 7.99%, and tips to reduce fees.",
      type: "article",
    },
  };
}

export default async function UpworkPricingPage({ params }: Props) {
  const { locale } = await params;

  const content = locale === 'nl' ? {
    badge: "Complete Prijzengids",
    title: "Upwork Prijzen 2025: Complete Kostengids voor Freelancers & Opdrachtgevers",
    subtitle: "Vanaf 1 mei 2025 gebruikt Upwork een nieuw variabel tariefmodel. We leggen het nieuwe 0-15% tarief per contract, het Connects-systeem, betalingskosten, en Freelancer Plus (€19.99/maand) uit, plus strategieën om uw kosten te verlagen.",
    cta1: "Vergelijk Platform Kosten",
    cta2: "Bereken Uw Tarief",
    overallPricing: "Prijsoverzicht",
    freelancerFees: "Freelancer Kosten",
    clientFees: "Opdrachtgever Kosten",
    connectsCost: "Connects Kosten",
    subscriptionValue: "Abonnement Waarde",
    whatIsUpworkPricing: "Hoe Werkt Upwork Prijzen? (Nieuw sinds 1 Mei 2025)",
    whatIsUpworkPricingText: "Upwork heeft op 1 mei 2025 een revolutionair nieuw tariefmodel geïntroduceerd. Het oude sliding scale systeem (20%-10%-5%) is vervangen door een variabel tarief van 0-15% per contract, gebaseerd op project complexiteit, urgentie, client geschiedenis, en type contract. Freelancers betalen ook $0.15 per Connect om te bieden, terwijl opdrachtgevers tot 7.99% marketplace fee betalen.",
    freelancersPayFor: "Freelancers Betalen Voor:",
    clientsPayFor: "Opdrachtgevers Betalen Voor:",
    freelancerCosts: [
      { title: "Service Fee (Variabel per Contract):", text: "0-15% gebaseerd op complexiteit, urgentie, client geschiedenis, contract type" },
      { title: "Connects:", text: "$0.15 per Connect (40 gratis bij signup, 10/maand recurring, 30 per badge)" },
      { title: "Freelancer Plus (Optioneel):", text: "$19.99/maand - 100 Connects/maand + 0% fee op Direct Contracts" },
      { title: "Withdrawal Fees:", text: "US Bank (ACH): GRATIS | Local Bank: $0.99 | Wire: $50 | Instant Pay/PayPal: $2" }
    ],
    clientCosts: [
      { title: "Marketplace Fee:", text: "Tot 7.99% op alle betalingen aan freelancers (3% US bank)" },
      { title: "Betalingsverwerking:", text: "Creditcard (~3%), ACH (US bank: 3%), PayPal (varieert)" },
      { title: "Talent Scout (Optioneel):", text: "Van $499/maand voor gepersonaliseerde talentmatching" },
      { title: "Enterprise (Optioneel):", text: "10% flat fee voor enterprise clients" }
    ],
    freelancerFeeStructure: "Upwork Freelancer Fee Structuur 2025: Variabel Tarief Model",
    freelancerFeeIntro: "Sinds 1 mei 2025 gebruikt Upwork een revolutionair nieuw variabel tariefsysteem dat het oude sliding scale model vervangt. Het tarief varieert van 0-15% per individueel contract op basis van meerdere factoren:",
    tier1Title: "Standaard Contracten: 0-15% Variabel",
    tier1Text: "Voor de meeste contracten bepaalt Upwork een variabel tarief tussen 0-15% gebaseerd op: (1) Project complexiteit - eenvoudiger werk = hogere fees, (2) Urgentie - spoedeisende projecten = hogere fees, (3) Client geschiedenis - nieuwe clients vs. terugkerende clients, (4) Contract grootte - grotere contracten kunnen lagere fees krijgen. Het exacte percentage wordt per contract bepaald en getoond voordat u accepteert.",
    tier1Fee: "Service Fee:",
    tier1Example: "Voorbeeld:",
    tier2Title: "Enterprise Clients: 10% Flat Fee",
    tier2Text: "Werk met geverifieerde enterprise organisaties (Fortune 500 bedrijven, grote corporations) wordt belast met een vaste 10% service fee. Dit is een voorspelbaar en vaak lager tarief dan standaard contracten. Enterprise clients zijn herkenbaar aan hun badge in job postings.",
    tier2Fee: "Service Fee:",
    tier2Example: "Voorbeeld:",
    tier3Title: "Any Hire Contracts & Direct Contracts (Freelancer Plus): 0% Fee",
    tier3Text: "Any Hire contracten (waar de client u direct benadert via Upwork's Talent Marketplace) hebben 0% service fee. Ook Freelancer Plus leden ($19.99/maand) betalen 0% op Direct Contracts waar clients hen rechtstreeks uitnodigen. Dit is het meest voordelige tarief op Upwork—u houdt 100% van uw inkomsten.",
    tier3Fee: "Service Fee:",
    tier3Example: "Voorbeeld:",
    criticalNote: "Kritieke Informatie Over Het Nieuwe Tariefsysteem",
    criticalPoints: [
      "Fees worden berekend PER CONTRACT, niet per client zoals voorheen",
      "Het exacte percentage (0-15%) wordt getoond voordat u een contract accepteert—geen verrassingen",
      "Freelancer Plus leden betalen 0% op Direct Contracts en Any Hire contracten",
      "Enterprise clients hebben altijd 10% flat fee, ongeacht andere factoren",
      "Het oude sliding scale systeem bestaat niet meer—geen opbouw naar lagere fees over tijd"
    ],
    ctaMid: "Bereken Uw Ware Netto-Inkomen",
    ctaMidText: "Gebruik onze gratis rate calculator om te bepalen hoeveel u moet factureren om uw inkomensdoelen te bereiken na Upwork fees.",
    ctaMidButton: "Gratis Rate Calculator",
    connectsSystem: "Het Connects Systeem: Betalen om te Bieden",
    connectsIntro: "Upwork gebruikt een 'Connects'-systeem waarbij freelancers Connects uitgeven om voorstel in te dienen. Dit ontmoedigt spam voorstel en helpt opdrachtgevers relevante aanbiedingen te ontvangen:",
    connectsPricing: "Connects Prijzen 2025",
    connectsPricingText: "Connects worden gratis verkregen of gekocht in bundels:",
    freeConnects: "Gratis Connects (Nieuw in 2025)",
    freeConnectsText: "40 Connects bij signup | 10 Connects/maand recurring | 30 Connects per badge earned | Max 200 Connects balance",
    purchasedConnects: "Gekochte Connects",
    purchasedConnectsText: "$0.15 per Connect (beschikbaar in bundels van 10, 20, 40, 60, 80, maximum 200 Connects balance)",
    costPerProposal: "Kosten Per Voorstel",
    costPerProposalText: "Varieert per job (meestal 2-16 Connects, gemiddeld 4-6 Connects)",
    connectsCalculation: "Hoe Worden Connects Kosten Berekend?",
    connectsCalculationText: "Upwork bepaalt de Connects kosten op basis van job complexiteit, client history, en project waarde:",
    simpleJobs: "Eenvoudige Jobs (2-4 Connects)",
    simpleJobsText: "Kleine taken, vaste prijs projecten onder $100, eenvoudige vaardigheden vereist",
    standardJobs: "Standaard Jobs (6-8 Connects)",
    standardJobsText: "Middelgrote projecten, ongoing contracten, $100-500 budget",
    complexJobs: "Complexe Jobs (12-16 Connects)",
    complexJobsText: "Grote projecten, $1.000+ budget, lang-termijn contracten, gespecialiseerde vaardigheden",
    connectsTips: "Slimme Tips om Connects te Besparen (2025 Update)",
    connectsTipsList: [
      { title: "Verdien Gratis Connects via Badges:", text: "Elke badge geeft 30 gratis Connects—focus op Rising Talent, Top Rated, Top Rated Plus badges" },
      { title: "Gebruik Freelancer Plus Strategisch:", text: "$19.99/maand krijg je 100 Connects (90+10)—breakevenpoint is 7 voorstel/maand, plus 0% fee op Direct Contracts" },
      { title: "Focus op Any Hire & Direct Invites:", text: "Deze gebruiken geen Connects EN hebben 0% service fee—optimaliseer uw profiel voor invites" },
      { title: "Prioriteer Hoge-Waarde Jobs:", text: "Spendeer meer Connects op grote contracten waar de ROI rechtvaardig is" }
    ],
    clientFeesExplained: "Opdrachtgever Fees 2025: Wat Werkgevers Betalen",
    clientFeesIntro: "Terwijl freelancers het grootste deel van de aandacht krijgen, betalen opdrachtgevers ook voor het gebruik van Upwork. In 2025 zijn de client fees herzien naar een variabel model:",
    marketplaceFee: "Marketplace Fee (Tot 7.99%)",
    marketplaceFeeText: "Alle betalingen aan freelancers omvatten een marketplace fee van tot 7.99%. US clients die met US bank account betalen betalen 3%. Voor een $1.000 project betaalt een internationale client met creditcard ~$1.079 totaal. Deze fee dekt Upwork's escrow service, dispute resolution, betalingsverwerking, en platformonderhoud.",
    marketplaceFeeExample: "Voorbeeld: $1.000 project → $79 marketplace fee (max) → $1.079 totaal | US bank: $30 (3%)",
    paymentProcessing: "Betalingsverwerkingskosten",
    paymentProcessingText: "Opdrachtgevers betalen extra kosten op basis van hun betalingsmethode:",
    creditCardFee: "Creditcard",
    creditCardFeeText: "~3% verwerkingskosten",
    achFee: "ACH (Bank Transfer)",
    achFeeText: "$0.50 per transactie",
    paypalFee: "PayPal",
    paypalFeeText: "Varieert per land en bedrag",
    contractToHireFee: "Contract-to-Hire Conversie Fee",
    contractToHireFeeText: "Als een opdrachtgever een Upwork freelancer buiten het platform aanneemt binnen 24 maanden, wordt een conversie fee van $2.999 of 15% van hun 12-maanden inkomsten via Upwork (wat hoger is) in rekening gebracht. Deze fee ontmoedigt circumvention van Upwork's platform.",
    freelancerPlusBreakdown: "Freelancer Plus 2025: Is $19.99/Maand de Moeite Waard?",
    freelancerPlusIntro: "Upwork's Freelancer Plus abonnement kost $19.99/maand (prijsverhoging vanaf 2025) en biedt krachtige voordelen. Of het waardevol is hangt af van hoeveel u biedt en of u Direct Contracts wint:",
    plusBenefits: "Freelancer Plus Voordelen (2025 Update)",
    plusBenefitsList: [
      { title: "100 Connects/Maand (90 + 10 recurring)", text: "Waarde van $15/maand—alleen dit dekt 75% van de abonnementskosten" },
      { title: "0% Service Fee op Direct Contracts", text: "De grootste waarde! Als u Direct Contracts wint, betaalt u 0% fee—dit kan duizenden dollars besparen" },
      { title: "Uma AI Toegang", text: "AI-powered proposal assistant en job matching—helpt u betere voorstellen schrijven" },
      { title: "Zie Concurrent Bids", text: "Bekijk hoeveel anderen hebben geboden om uw strategie aan te passen" },
      { title: "Custom Profile URL", text: "Aangepaste URL voor eenvoudiger delen en branding (bijv. upwork.com/fl/yourname)" },
      { title: "Profiel Badge", text: "Visuele badge toont commitment aan platform en professionaliteit" }
    ],
    worthItCalculation: "Is Freelancer Plus het Waard? (2025 Berekening)",
    worthItCalculationText: "Laten we het uitrekenen op basis van uw biedgewoonten en Direct Contracts:",
    lowBidder: "Lage Bieder (1-5 voorstel/maand, geen Direct Contracts)",
    lowBidderText: "Waarschijnlijk niet waard—u gebruikt slechts $7.50 aan Connects, tenzij u Uma AI echt nodig heeft",
    moderateBidder: "Matige Bieder (7-15 voorstel/maand)",
    moderateBidderText: "Breakevenpoint is ~7 voorstel/maand (100 Connects = $15 waarde). Waardevol als u Uma AI + concurrent visibility gebruikt",
    activeBidder: "Actieve Bieder of Direct Contract Focus (15+ voorstel OF 1+ Direct Contract/maand)",
    activeBidderText: "Absoluut waard—100 gratis Connects + 0% fee op Direct Contracts = enorme besparing. Eén $1.000 Direct Contract bespaart $100-150 in fees!",
    withdrawalFees: "Opname Kosten 2025: Uw Geld Krijgen",
    withdrawalIntro: "Zodra u op Upwork verdient, moet u uw geld opnemen. Kosten variëren aanzienlijk per methode (2025 update):",
    withdrawalMethods: "Opname Methoden & Kosten (2025)",
    directToUSBank: "US Bank Account (ACH) - GRATIS!",
    directToUSBankText: "GRATIS voor alle US bank transfers via ACH (grote verbetering in 2025, voorheen $0.99)",
    payoneer: "Local Bank Transfer",
    payoneerText: "$0.99 per transactie voor lokale bank transfers (niet-US)",
    paypalWithdrawal: "PayPal of Instant Pay",
    paypalWithdrawalText: "$2.00 fee per transactie voor PayPal opnames of Instant Pay (verhoging van $1.00)",
    wireTransfer: "Wire Transfer",
    wireTransferText: "$50 fee per transactie (alleen voor zeer grote bedragen, verhoging van $30)",
    smartWithdrawalStrategy: "Slimme Opname Strategie 2025",
    smartWithdrawalStrategyText: "Voor US freelancers is de keuze simpel—gebruik GRATIS ACH transfers! Internationale freelancers moeten local bank transfer ($0.99) gebruiken en minder frequente, grotere opnames doen. Vermijd PayPal ($2) en vooral wire transfer ($50) tenzij absoluut noodzakelijk.",
    realWorldExamples: "Real-World Prijsvoorbeelden: Hoeveel Verdient U Werkelijk?",
    realWorldIntro: "Laten we bekijken wat freelancers daadwerkelijk netto verdienen na alle Upwork fees, Connects-kosten, en opnames:",
    example1Title: "Voorbeeld 1: Nieuwe Freelancer - Kleine Projecten",
    example1Subtitle: "Beginner freelancer die 5 kleine jobs wint (@$200 elk)",
    example1Gross: "Bruto inkomsten (5 × $200):",
    example1ServiceFee: "Upwork service fee (20% op alle):",
    example1Connects: "Connects gebruikt (10 voorstel @ 6 Connects):",
    example1Withdrawal: "Opname fees (1 opname):",
    example1Net: "Netto inkomsten:",
    example1Effective: "Effectieve fee rate:",
    example2Title: "Voorbeeld 2: Gevestigde Freelancer - Mid-Size Projecten",
    example2Subtitle: "Ervaren freelancer met 3 terugkerende klanten (€10.000+ elk gedurende hun leven)",
    example2Gross: "Bruto inkomsten (3 × $2.000):",
    example2ServiceFee: "Upwork service fee (5% op alle):",
    example2Connects: "Connects gebruikt (meesteendig uitnodigingen):",
    example2Withdrawal: "Freelancer Plus abonnement:",
    example2WithdrawalFee: "Opname fees (1 opname):",
    example2Net: "Netto inkomsten:",
    example2Effective: "Effectieve fee rate:",
    example3Title: "Voorbeeld 3: Top-Rated Plus Freelancer - Enterprise Project",
    example3Subtitle: "Elite freelancer met één groot enterprise klant",
    example3Gross: "Bruto inkomsten (1 project):",
    example3ServiceFee: "Upwork service fee (5% op alle):",
    example3Connects: "Connects gebruikt (direct invite):",
    example3FreelancerPlus: "Freelancer Plus ($14.99/maand):",
    example3Withdrawal: "Opname fees (Wire transfer):",
    example3Net: "Netto inkomsten:",
    example3Effective: "Effectieve fee rate:",
    tipsToReduceFees: "7 Strategische Tips om Upwork Fees te Verlagen",
    tipsIntro: "Slimme freelancers minimaliseren hun effectieve fee rate met deze bewezen tactieken:",
    tip1: "Bouw Langetermijn Klantrelaties",
    tip1Text: "De snelste manier om fees te verlagen is door de sliding scale te beklimmen. Focus op het krijgen van terugkerende werk van bestaande klanten in plaats van steeds nieuwe klanten te zoeken. Zodra u $10.000+ levenslange inkomsten per klant bereikt, betaalt u slechts 5%.",
    tip2: "Gebruik Freelancer Plus Strategisch",
    tip2Text: "Als u 5+ voorstel per maand indient, betaalt Freelancer Plus zichzelf terug via gratis Connects alleen. De Connects terugbetaling functie op niet-beantwoorde jobs verhoogt de waarde verder. Annuleer tijdens langzame periodes en herabonneer wanneer u weer actief biedt.",
    tip3: "Prioriteer Hoge-Waarde Opportuniteiten",
    tip3Text: "In plaats van te bieden op tientallen kleine jobs, focus op minder grote projecten waar u sneller $500+ per klant kan verdienen. Dit brengt u sneller naar lagere fee tiers en maximaliseert ROI op Connects investering.",
    tip4: "Optimaliseer Uw Profiel voor Direct Invites",
    tip4Text: "Wanneer clients u direct uitnodigen, gebruikt u geen Connects om te bieden. Investeer in een sterk profiel, collect client reviews, behoud Top Rated status, en gebruik een professionele video intro om uitnodigingspercentage te verhogen—sommige top freelancers bieden nooit zelf en ontvangen alleen invites.",
    tip5: "Bundel Opnames om Kosten te Verlagen",
    tip5Text: "In plaats van dagelijks op te nemen, laat inkomsten oplopen en doe minder frequente grotere opnames. Dit minimaliseert fixed transaction fees. Voor US freelancers, kies direct bank transfer ($0.99) boven PayPal ($1.00) of wire transfer ($30).",
    tip6: "Onderhandel Fixed-Price Contracten Slim",
    tip6Text: "Op fixed-price contracten worden fees berekend op het totale contract bedrag ongeacht betalingsmijlpalen. Structureer grote projecten als meerdere kleinere fixed-price contracten om langzamer door fee tiers te bewegen en fees te minimaliseren terwijl u de sliding scale opbouwt.",
    tip7: "Overweeg Direct Contracteren Voor Top Klanten",
    tip7Text: "Voor zeer grote klanten ($50.000+), kan het waard zijn om de $2.999 contract-to-hire fee te betalen om Upwork te verlaten als u op 5% fee bent. Bereken uw besparing: op $50.000 werk bespaart u $2.500/jaar in fees—de conversie fee betaalt zichzelf terug in 14 maanden.",
    upworkVsCompetitors: "Upwork Prijzen vs. Concurrentie",
    upworkVsIntro: "Hoe vergelijkt Upwork's prijzen met andere grote freelance platforms?",
    fiverr: "Fiverr",
    fiverrFee: "20% flat fee op alle transacties (nooit daalt)",
    fiverrVs: "vs",
    freelancerCom: "Freelancer.com",
    freelancerComFee: "10% flat fee of $5 minimaal (geen sliding scale)",
    toptal: "Toptal",
    toptalFee: "20-30% fee voor freelancers (maar geen bieden nodig)",
    direct: "Direct Contracteren",
    directFee: "0% fees (maar vereist eigen client acquisitie, betaalverwerking, legal)",
    bottomLine: "Conclusie:",
    bottomLineText: "Upwork's sliding scale betekent dat fees competitive worden voor gevestigde freelancers met terugkerende klanten. Nieuwe freelancers betalen meer (20%), maar naarmate u klantrelaties opbouwt, daalt Upwork's effectieve fee rate dramatisch—uiteindelijk competitiever dan de meeste alternatieven.",
    finalVerdict: "Eindoordeel: Is Upwork Prijzen Eerlijk?",
    verdictIntro: "Upwork's prijzen weerspiegelen een 'pay for success' model dat zowel nieuwe als gevestigde freelancers bedient:",
    verdictNewbies: "Voor Nieuwe Freelancers:",
    verdictNewbiesText: "De 20% initiële fee lijkt steil, maar u betaalt alleen wanneer u verdient. Connects-kosten kunnen oplopen tijdens de leer-curve. Verwacht 22-25% effectieve fee rate inclusief alle kosten tot u uw eerste paar clients stabiliseert.",
    verdictEstablished: "Voor Gevestigde Freelancers:",
    verdictEstablishedText: "De sliding scale is Upwork's beste feature—5% op terugkerende werk is uitstekend waarde gegeven het betalingsbescherming, escrow service, en client access. Op dit level zijn Upwork's fees competitief met direct contracteren wanneer accounting voor client acquisitie tijd en kosten.",
    verdictClients: "Voor Opdrachtgevers:",
    verdictClientsText: "De 5% marketplace fee + betalingsverwerking (~8-9% totaal) is redelijk voor de talent pool access, escrow bescherming, en dispute resolution services. Goedkoper dan recruiting agencies (15-25%) voor vergelijkbare kwaliteit talent.",
    smartStrategy: "De Slimme Strategie:",
    smartStrategyText: "Gebruik Upwork om klantrelaties te bouwen, profiteer van de sliding scale tot u op 5% bent, behoud hoge-waarde klanten op het platform voor 5% fee (betere waarde dan de meeste alternatieven), en overweeg alleen direct contracteren voor zeer grote (>$100.000/jaar) klanten waar de $2.999 conversie fee zich in < 1 jaar terugbetaalt.",
    worthThePrice: "De Waarde Overweegt de Kosten Voor de Meeste Freelancers",
    exploreMore: "Ontdek Meer Middelen",
    compareAllPlatforms: "Vergelijk Alle Platforms →",
    compareAllPlatformsText: "Zie hoe Upwork's prijzen vergelijkt met 25+ andere freelance marktplaatsen",
    readPlatformReviews: "Lees Platform Reviews →",
    readPlatformReviewsText: "Echte freelancer ervaringen over pricing en waarde op alle grote platforms",
    calculateYourRate: "Bereken Uw Tarief →",
    calculateYourRateText: "Bepaal hoeveel u moet factureren om uw doelen te bereiken na fees",
    upworkGuide: "Upwork Complete Gids →",
    upworkGuideText: "Master alle aspecten van succesvol freelancen op Upwork",
    maximizeEarnings: "Maximaliseer Uw Upwork Inkomsten",
    maximizeEarningsText: "Vergelijk platforms, bereken uw ideale tarief, en ontdek strategieën om meer te verdienen bij lagere kosten.",
    browseAllPlatforms: "Bekijk Alle Platforms",
    getWeeklyInsights: "Krijg Wekelijkse Inzichten"
  } : {
    badge: "Complete Pricing Guide",
    title: "Upwork Pricing 2025: Complete Fee Guide for Freelancers & Clients",
    subtitle: "As of May 1, 2025, Upwork uses a revolutionary new variable fee model. We break down the new 0-15% per-contract fee, Connects system, payment fees, Freelancer Plus ($19.99/month), and share strategies to reduce your costs.",
    cta1: "Compare Platform Costs",
    cta2: "Calculate Your Rate",
    overallPricing: "Pricing Overview",
    freelancerFees: "Freelancer Fees",
    clientFees: "Client Fees",
    connectsCost: "Connects Cost",
    subscriptionValue: "Subscription Value",
    whatIsUpworkPricing: "How Does Upwork Pricing Work? (New as of May 1, 2025)",
    whatIsUpworkPricingText: "Upwork introduced a revolutionary new pricing model on May 1, 2025. The old sliding scale system (20%-10%-5%) has been replaced with a variable fee of 0-15% per contract, based on project complexity, urgency, client history, and contract type. Freelancers also pay $0.15 per Connect to bid, while clients pay up to 7.99% marketplace fee.",
    freelancersPayFor: "Freelancers Pay For:",
    clientsPayFor: "Clients Pay For:",
    freelancerCosts: [
      { title: "Service Fee (Variable per Contract):", text: "0-15% based on complexity, urgency, client history, contract type" },
      { title: "Connects:", text: "$0.15 per Connect (40 free on signup, 10/month recurring, 30 per badge)" },
      { title: "Freelancer Plus (Optional):", text: "$19.99/month - 100 Connects/month + 0% fee on Direct Contracts" },
      { title: "Withdrawal Fees:", text: "US Bank (ACH): FREE | Local Bank: $0.99 | Wire: $50 | Instant Pay/PayPal: $2" }
    ],
    clientCosts: [
      { title: "Marketplace Fee:", text: "Up to 7.99% on all payments to freelancers (3% US bank)" },
      { title: "Payment Processing:", text: "Credit card (~3%), ACH (US bank: 3%), PayPal (varies)" },
      { title: "Talent Scout (Optional):", text: "From $499/month for personalized talent matching" },
      { title: "Enterprise (Optional):", text: "10% flat fee for enterprise clients" }
    ],
    freelancerFeeStructure: "Upwork Freelancer Fee Structure 2025: Variable Fee Model",
    freelancerFeeIntro: "As of May 1, 2025, Upwork uses a revolutionary new variable fee system that replaces the old sliding scale model. Fees range from 0-15% per individual contract based on multiple factors:",
    tier1Title: "Standard Contracts: 0-15% Variable",
    tier1Text: "For most contracts, Upwork determines a variable fee between 0-15% based on: (1) Project complexity - simpler work = higher fees, (2) Urgency - rush projects = higher fees, (3) Client history - new vs. returning clients, (4) Contract size - larger contracts may get lower fees. The exact percentage is shown before you accept.",
    tier1Fee: "Service Fee:",
    tier1Example: "Example:",
    tier2Title: "Enterprise Clients: 10% Flat Fee",
    tier2Text: "Work with verified enterprise organizations (Fortune 500 companies, large corporations) is charged a flat 10% service fee. This is predictable and often lower than standard contracts. Enterprise clients are identifiable by their badge in job postings.",
    tier2Fee: "Service Fee:",
    tier2Example: "Example:",
    tier3Title: "Any Hire Contracts & Direct Contracts (Freelancer Plus): 0% Fee",
    tier3Text: "Any Hire contracts (where the client approaches you directly via Upwork's Talent Marketplace) have 0% service fee. Also, Freelancer Plus members ($19.99/month) pay 0% on Direct Contracts where clients invite them directly. This is the most advantageous rate on Upwork—you keep 100% of your earnings.",
    tier3Fee: "Service Fee:",
    tier3Example: "Example:",
    criticalNote: "Critical Information About the New Fee System",
    criticalPoints: [
      "Fees are calculated PER CONTRACT, not per client like before",
      "The exact percentage (0-15%) is shown before you accept a contract—no surprises",
      "Freelancer Plus members pay 0% on Direct Contracts and Any Hire contracts",
      "Enterprise clients always have 10% flat fee, regardless of other factors",
      "The old sliding scale system no longer exists—no building up to lower fees over time"
    ],
    ctaMid: "Calculate Your True Take-Home",
    ctaMidText: "Use our free rate calculator to determine how much you need to charge to hit your income goals after Upwork fees.",
    ctaMidButton: "Free Rate Calculator",
    connectsSystem: "The Connects System: Paying to Bid",
    connectsIntro: "Upwork uses a 'Connects' system where freelancers spend Connects to submit proposals. This discourages spam proposals and helps clients receive relevant bids:",
    connectsPricing: "Connects Pricing 2025",
    connectsPricingText: "Connects are earned free or purchased in bundles:",
    freeConnects: "Free Connects (New in 2025)",
    freeConnectsText: "40 Connects on signup | 10 Connects/month recurring | 30 Connects per badge earned | Max 200 Connects balance",
    purchasedConnects: "Purchased Connects",
    purchasedConnectsText: "$0.15 per Connect (available in bundles of 10, 20, 40, 60, 80, maximum 200 Connects balance)",
    costPerProposal: "Cost Per Proposal",
    costPerProposalText: "Varies by job (typically 2-16 Connects, average 4-6 Connects)",
    connectsCalculation: "How Are Connects Costs Calculated?",
    connectsCalculationText: "Upwork determines Connects costs based on job complexity, client history, and project value:",
    simpleJobs: "Simple Jobs (2-4 Connects)",
    simpleJobsText: "Small tasks, fixed-price projects under $100, simple skills required",
    standardJobs: "Standard Jobs (6-8 Connects)",
    standardJobsText: "Mid-size projects, ongoing contracts, $100-500 budget",
    complexJobs: "Complex Jobs (12-16 Connects)",
    complexJobsText: "Large projects, $1,000+ budget, long-term contracts, specialized skills",
    connectsTips: "Smart Tips to Save Connects (2025 Update)",
    connectsTipsList: [
      { title: "Earn Free Connects via Badges:", text: "Each badge gives 30 free Connects—focus on Rising Talent, Top Rated, Top Rated Plus badges" },
      { title: "Use Freelancer Plus Strategically:", text: "$19.99/month gets you 100 Connects (90+10)—breakeven is 7 proposals/month, plus 0% fee on Direct Contracts" },
      { title: "Focus on Any Hire & Direct Invites:", text: "These don't use Connects AND have 0% service fee—optimize your profile for invites" },
      { title: "Prioritize High-Value Jobs:", text: "Spend more Connects on large contracts where the ROI justifies it" }
    ],
    clientFeesExplained: "Client Fees 2025: What Employers Pay",
    clientFeesIntro: "While freelancers get most of the attention, clients also pay to use Upwork. In 2025, client fees were revised to a variable model:",
    marketplaceFee: "Marketplace Fee (Up to 7.99%)",
    marketplaceFeeText: "All payments to freelancers include a marketplace fee of up to 7.99%. US clients paying with US bank accounts pay 3%. For a $1,000 project, an international client with credit card pays ~$1,079 total. This fee covers Upwork's escrow service, dispute resolution, payment processing, and platform maintenance.",
    marketplaceFeeExample: "Example: $1,000 project → $79 marketplace fee (max) → $1,079 total | US bank: $30 (3%)",
    paymentProcessing: "Payment Processing Costs",
    paymentProcessingText: "Clients pay additional fees based on their payment method:",
    creditCardFee: "Credit Card",
    creditCardFeeText: "~3% processing fee",
    achFee: "ACH (Bank Transfer)",
    achFeeText: "$0.50 per transaction",
    paypalFee: "PayPal",
    paypalFeeText: "Varies by country and amount",
    contractToHireFee: "Contract-to-Hire Conversion Fee",
    contractToHireFeeText: "If a client hires an Upwork freelancer outside the platform within 24 months, a conversion fee of $2,999 or 15% of their 12-month Upwork earnings (whichever is higher) is charged. This fee discourages circumventing Upwork's platform.",
    freelancerPlusBreakdown: "Freelancer Plus 2025: Is $19.99/Month Worth It?",
    freelancerPlusIntro: "Upwork's Freelancer Plus subscription costs $19.99/month (price increase from 2025) and offers powerful benefits. Whether it's valuable depends on how much you bid and whether you win Direct Contracts:",
    plusBenefits: "Freelancer Plus Benefits (2025 Update)",
    plusBenefitsList: [
      { title: "100 Connects/Month (90 + 10 recurring)", text: "Worth $15/month—this alone covers 75% of the subscription cost" },
      { title: "0% Service Fee on Direct Contracts", text: "The biggest value! If you win Direct Contracts, you pay 0% fee—this can save thousands of dollars" },
      { title: "Uma AI Access", text: "AI-powered proposal assistant and job matching—helps you write better proposals" },
      { title: "See Competitor Bids", text: "View how many others have bid to adjust your strategy" },
      { title: "Custom Profile URL", text: "Custom URL for easier sharing and branding (e.g., upwork.com/fl/yourname)" },
      { title: "Profile Badge", text: "Visual badge shows commitment to platform and professionalism" }
    ],
    worthItCalculation: "Is Freelancer Plus Worth It? (2025 Calculation)",
    worthItCalculationText: "Let's break it down based on your bidding habits and Direct Contracts:",
    lowBidder: "Low Bidder (1-5 proposals/month, no Direct Contracts)",
    lowBidderText: "Probably not worth it—you're only using $7.50 in Connects, unless you really need Uma AI",
    moderateBidder: "Moderate Bidder (7-15 proposals/month)",
    moderateBidderText: "Breakeven is ~7 proposals/month (100 Connects = $15 value). Valuable if you use Uma AI + competitor visibility",
    activeBidder: "Active Bidder or Direct Contract Focus (15+ proposals OR 1+ Direct Contract/month)",
    activeBidderText: "Absolutely worth it—100 free Connects + 0% fee on Direct Contracts = huge savings. One $1,000 Direct Contract saves $100-150 in fees!",
    withdrawalFees: "Withdrawal Fees 2025: Getting Your Money",
    withdrawalIntro: "Once you've earned on Upwork, you need to withdraw your money. Fees vary significantly by method (2025 update):",
    withdrawalMethods: "Withdrawal Methods & Fees (2025)",
    directToUSBank: "US Bank Account (ACH) - FREE!",
    directToUSBankText: "FREE for all US bank transfers via ACH (huge improvement in 2025, previously $0.99)",
    payoneer: "Local Bank Transfer",
    payoneerText: "$0.99 per transaction for local bank transfers (non-US)",
    paypalWithdrawal: "PayPal or Instant Pay",
    paypalWithdrawalText: "$2.00 fee per transaction for PayPal withdrawals or Instant Pay (increase from $1.00)",
    wireTransfer: "Wire Transfer",
    wireTransferText: "$50 fee per transaction (only for very large amounts, increase from $30)",
    smartWithdrawalStrategy: "Smart Withdrawal Strategy 2025",
    smartWithdrawalStrategyText: "For US freelancers, the choice is simple—use FREE ACH transfers! International freelancers should use local bank transfer ($0.99) and do less frequent, larger withdrawals. Avoid PayPal ($2) and especially wire transfer ($50) unless absolutely necessary.",
    realWorldExamples: "Real-World Pricing Examples: How Much Do You Actually Earn?",
    realWorldIntro: "Let's look at what freelancers actually net after all Upwork fees, Connects costs, and withdrawals:",
    example1Title: "Example 1: New Freelancer - Small Projects",
    example1Subtitle: "Beginner freelancer winning 5 small jobs (@$200 each)",
    example1Gross: "Gross earnings (5 × $200):",
    example1ServiceFee: "Upwork service fee (20% on all):",
    example1Connects: "Connects used (10 proposals @ 6 Connects):",
    example1Withdrawal: "Withdrawal fees (1 withdrawal):",
    example1Net: "Net earnings:",
    example1Effective: "Effective fee rate:",
    example2Title: "Example 2: Established Freelancer - Mid-Size Projects",
    example2Subtitle: "Experienced freelancer with 3 recurring clients ($10,000+ each lifetime)",
    example2Gross: "Gross earnings (3 × $2,000):",
    example2ServiceFee: "Upwork service fee (5% on all):",
    example2Connects: "Connects used (mostly invites):",
    example2Withdrawal: "Freelancer Plus subscription:",
    example2WithdrawalFee: "Withdrawal fees (1 withdrawal):",
    example2Net: "Net earnings:",
    example2Effective: "Effective fee rate:",
    example3Title: "Example 3: Top-Rated Plus Freelancer - Enterprise Project",
    example3Subtitle: "Elite freelancer with one large enterprise client",
    example3Gross: "Gross earnings (1 project):",
    example3ServiceFee: "Upwork service fee (5% on all):",
    example3Connects: "Connects used (direct invite):",
    example3FreelancerPlus: "Freelancer Plus ($14.99/month):",
    example3Withdrawal: "Withdrawal fees (Wire transfer):",
    example3Net: "Net earnings:",
    example3Effective: "Effective fee rate:",
    tipsToReduceFees: "7 Strategic Tips to Reduce Upwork Fees",
    tipsIntro: "Smart freelancers minimize their effective fee rate with these proven tactics:",
    tip1: "Build Long-Term Client Relationships",
    tip1Text: "The fastest way to reduce fees is by climbing the sliding scale. Focus on getting repeat work from existing clients rather than constantly seeking new clients. Once you hit $10,000+ lifetime earnings per client, you're only paying 5%.",
    tip2: "Use Freelancer Plus Strategically",
    tip2Text: "If you submit 5+ proposals per month, Freelancer Plus pays for itself via free Connects alone. The Connects refund feature on unanswered jobs adds even more value. Cancel during slow periods and resubscribe when you're actively bidding.",
    tip3: "Prioritize High-Value Opportunities",
    tip3Text: "Rather than bidding on dozens of small jobs, focus on fewer large projects where you can earn $500+ per client faster. This gets you to lower fee tiers quicker and maximizes ROI on Connects investment.",
    tip4: "Optimize Your Profile for Direct Invites",
    tip4Text: "When clients invite you directly, you don't use Connects to bid. Invest in a strong profile, collect client reviews, maintain Top Rated status, and use a professional video intro to increase invite rate—some top freelancers never bid and only receive invites.",
    tip5: "Bundle Withdrawals to Reduce Costs",
    tip5Text: "Rather than withdrawing daily, let earnings accumulate and do less frequent larger withdrawals. This minimizes fixed transaction fees. For US freelancers, choose direct bank transfer ($0.99) over PayPal ($1.00) or wire transfer ($30).",
    tip6: "Negotiate Fixed-Price Contracts Smart",
    tip6Text: "On fixed-price contracts, fees are calculated on the total contract amount regardless of payment milestones. Structure large projects as multiple smaller fixed-price contracts to move through fee tiers more slowly and minimize fees while building the sliding scale.",
    tip7: "Consider Direct Contracting For Top Clients",
    tip7Text: "For very large clients ($50,000+), it may be worth paying the $2,999 contract-to-hire fee to move off Upwork if you're at the 5% fee tier. Calculate your savings: on $50,000 of work, you save $2,500/year in fees—the conversion fee pays itself back in 14 months.",
    upworkVsCompetitors: "Upwork Pricing vs. Competitors",
    upworkVsIntro: "How does Upwork's pricing compare to other major freelance platforms?",
    fiverr: "Fiverr",
    fiverrFee: "20% flat fee on all transactions (never decreases)",
    fiverrVs: "vs",
    freelancerCom: "Freelancer.com",
    freelancerComFee: "10% flat fee or $5 minimum (no sliding scale)",
    toptal: "Toptal",
    toptalFee: "20-30% fee for freelancers (but no bidding required)",
    direct: "Direct Contracting",
    directFee: "0% fees (but requires own client acquisition, payment processing, legal)",
    bottomLine: "Bottom Line:",
    bottomLineText: "Upwork's sliding scale means fees become competitive for established freelancers with repeat clients. New freelancers pay more (20%), but as you build client relationships, Upwork's effective fee rate drops dramatically—eventually becoming more competitive than most alternatives.",
    finalVerdict: "Final Verdict: Is Upwork Pricing Fair?",
    verdictIntro: "Upwork's pricing reflects a 'pay for success' model that serves both new and established freelancers:",
    verdictNewbies: "For New Freelancers:",
    verdictNewbiesText: "The 20% initial fee seems steep, but you only pay when you earn. Connects costs can add up during the learning curve. Expect 22-25% effective fee rate including all costs until you stabilize your first few clients.",
    verdictEstablished: "For Established Freelancers:",
    verdictEstablishedText: "The sliding scale is Upwork's best feature—5% on repeat work is excellent value given the payment protection, escrow service, and client access. At this level, Upwork's fees are competitive with direct contracting when accounting for client acquisition time and costs.",
    verdictClients: "For Clients:",
    verdictClientsText: "The 5% marketplace fee + payment processing (~8-9% total) is reasonable for the talent pool access, escrow protection, and dispute resolution services. Cheaper than recruiting agencies (15-25%) for comparable quality talent.",
    smartStrategy: "The Smart Strategy:",
    smartStrategyText: "Use Upwork to build client relationships, leverage the sliding scale until you're at 5%, maintain high-value clients on platform for 5% fee (better value than most alternatives), and only consider direct contracting for very large (>$100,000/year) clients where the $2,999 conversion fee pays itself back in < 1 year.",
    worthThePrice: "The Value Outweighs the Costs For Most Freelancers",
    exploreMore: "Explore More Resources",
    compareAllPlatforms: "Compare All Platforms →",
    compareAllPlatformsText: "See how Upwork's pricing compares to 25+ other freelance marketplaces",
    readPlatformReviews: "Read Platform Reviews →",
    readPlatformReviewsText: "Real freelancer experiences about pricing and value across all major platforms",
    calculateYourRate: "Calculate Your Rate →",
    calculateYourRateText: "Determine how much you need to charge to hit your goals after fees",
    upworkGuide: "Upwork Complete Guide →",
    upworkGuideText: "Master all aspects of successful freelancing on Upwork",
    maximizeEarnings: "Maximize Your Upwork Earnings",
    maximizeEarningsText: "Compare platforms, calculate your ideal rate, and discover strategies to earn more at lower costs.",
    browseAllPlatforms: "Browse All Platforms",
    getWeeklyInsights: "Get Weekly Insights"
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": locale === 'nl' ? "Upwork Prijzen 2025: Complete Kostengids voor Freelancers & Opdrachtgevers" : "Upwork Pricing 2025: Complete Fee Guide for Freelancers & Clients",
    "description": locale === 'nl' ? "Complete Upwork prijzengids 2025: Variabel 0-15% tarief per contract, $0.15 Connects, Freelancer Plus €19.99/maand, client fees tot 7.99%, en strategieën om kosten te verlagen." : "Complete Upwork pricing guide 2025: Variable 0-15% fee per contract, $0.15 Connects, Freelancer Plus $19.99/month, client fees up to 7.99%, and strategies to reduce costs.",
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
    "datePublished": "2025-01-25",
    "dateModified": "2025-01-25"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary/10 via-white to-primary/10 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 dark:bg-secondary/30 text-secondary dark:text-white mb-6">
                <span className="text-2xl">💰</span>
                <span className="text-sm font-heading font-semibold">{content.badge}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                {content.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {content.subtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-white font-heading font-semibold hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl"
                >
                  {content.cta1}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/tools/rate-calculator`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-gray-800 text-secondary dark:text-accent border-2 border-secondary dark:border-accent font-heading font-semibold hover:bg-secondary/5 dark:hover:bg-accent/10 transition-all"
                >
                  {content.cta2}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Overall Pricing Overview */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-secondary/10 to-primary/10 dark:from-secondary/20 dark:to-primary/20 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 text-center">{content.overallPricing}</h2>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📊</div>
                    <div className="text-3xl font-heading font-bold text-secondary dark:text-accent mb-1">0-15%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{content.freelancerFees}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">🏢</div>
                    <div className="text-3xl font-heading font-bold text-accent mb-1">~8%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{content.clientFees}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎯</div>
                    <div className="text-3xl font-heading font-bold text-primary mb-1">$0.15</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{content.connectsCost}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">⭐</div>
                    <div className="text-3xl font-heading font-bold text-secondary mb-1">$19.99</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{content.subscriptionValue}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              {/* What is Upwork Pricing */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">💡</span>
                    {content.whatIsUpworkPricing}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    {content.whatIsUpworkPricingText}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border border-accent/20">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span>👨‍💻</span>
                        {content.freelancersPayFor}
                      </h3>
                      <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
                        {content.freelancerCosts.map((cost, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-accent mt-1">→</span>
                            <div><strong className="text-gray-900 dark:text-white">{cost.title}</strong> {cost.text}</div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border border-primary/20">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span>🏢</span>
                        {content.clientsPayFor}
                      </h3>
                      <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
                        {content.clientCosts.map((cost, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary mt-1">→</span>
                            <div><strong className="text-gray-900 dark:text-white">{cost.title}</strong> {cost.text}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Freelancer Fee Structure - Sliding Scale */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">📈</span>
                    {content.freelancerFeeStructure}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    {content.freelancerFeeIntro}
                  </p>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-6 border-l-4 border-red-500">
                      <div className="flex items-start gap-4">
                        <div className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-heading font-bold flex-shrink-0">1</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">{content.tier1Title}</h3>
                          <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                            {content.tier1Text}
                          </p>
                          <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1"><strong>{content.tier1Fee}</strong> 0-15% (variable)</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400"><strong>{content.tier1Example}</strong> $1,000 project at 12% → $120 fee → $880 net</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl p-6 border-l-4 border-yellow-500">
                      <div className="flex items-start gap-4">
                        <div className="bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-heading font-bold flex-shrink-0">2</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">{content.tier2Title}</h3>
                          <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                            {content.tier2Text}
                          </p>
                          <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1"><strong>{content.tier2Fee}</strong> 10% (flat)</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400"><strong>{content.tier2Example}</strong> $5,000 enterprise project → $500 fee → $4,500 net</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border-l-4 border-green-500">
                      <div className="flex items-start gap-4">
                        <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-heading font-bold flex-shrink-0">3</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">{content.tier3Title}</h3>
                          <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                            {content.tier3Text}
                          </p>
                          <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1"><strong>{content.tier3Fee}</strong> 0% (FREE!)</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400"><strong>{content.tier3Example}</strong> $2,000 Direct Contract → $0 fee → $2,000 net</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
                    <h4 className="font-heading font-bold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
                      <span>💡</span>
                      {content.criticalNote}
                    </h4>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      {content.criticalPoints.map((point, idx) => (
                        <li key={idx}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* CTA Mid-Article */}
              <div className="mb-16">
                <div className="bg-gradient-to-r from-secondary to-primary rounded-2xl p-8 text-center shadow-2xl">
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4">
                    {content.ctaMid}
                  </h3>
                  <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                    {content.ctaMidText}
                  </p>
                  <Link
                    href={`/${locale}/tools/rate-calculator`}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-secondary font-heading font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl text-lg"
                  >
                    {content.ctaMidButton}
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Connects System */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">🎯</span>
                    {content.connectsSystem}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    {content.connectsIntro}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <span>💰</span>
                      {content.connectsPricing}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                      {content.connectsPricingText}
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-lg p-4 border border-accent/20">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{content.freeConnects}</p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{content.freeConnectsText}</p>
                      </div>
                      <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg p-4 border border-primary/20">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{content.purchasedConnects}</p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{content.purchasedConnectsText}</p>
                      </div>
                      <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-lg p-4 border border-secondary/20">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{content.costPerProposal}</p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{content.costPerProposalText}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <span>🧮</span>
                      {content.connectsCalculation}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                      {content.connectsCalculationText}
                    </p>
                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4 border-l-4 border-green-500">
                        <p className="font-heading font-bold text-gray-900 dark:text-white mb-1">{content.simpleJobs}</p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{content.simpleJobsText}</p>
                      </div>
                      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg p-4 border-l-4 border-yellow-500">
                        <p className="font-heading font-bold text-gray-900 dark:text-white mb-1">{content.standardJobs}</p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{content.standardJobsText}</p>
                      </div>
                      <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-4 border-l-4 border-red-500">
                        <p className="font-heading font-bold text-gray-900 dark:text-white mb-1">{content.complexJobs}</p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{content.complexJobsText}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border-l-4 border-accent">
                    <h4 className="font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <span>💡</span>
                      {content.connectsTips}
                    </h4>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
                      {content.connectsTipsList.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-accent mt-1">→</span>
                          <div><strong className="text-gray-900 dark:text-white">{tip.title}</strong> {tip.text}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Client Fees */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">🏢</span>
                    {content.clientFeesExplained}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    {content.clientFeesIntro}
                  </p>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border-l-4 border-primary">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">{content.marketplaceFee}</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                        {content.marketplaceFeeText}
                      </p>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-mono">{content.marketplaceFeeExample}</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border-l-4 border-accent">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">{content.paymentProcessing}</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                        {content.paymentProcessingText}
                      </p>
                      <div className="grid md:grid-cols-3 gap-3">
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{content.creditCardFee}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{content.creditCardFeeText}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{content.achFee}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{content.achFeeText}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{content.paypalFee}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{content.paypalFeeText}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-6 border-l-4 border-red-500">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">{content.contractToHireFee}</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {content.contractToHireFeeText}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Freelancer Plus */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">⭐</span>
                    {content.freelancerPlusBreakdown}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    {content.freelancerPlusIntro}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">{content.plusBenefits}</h3>
                    <div className="space-y-3">
                      {content.plusBenefitsList.map((benefit, idx) => (
                        <div key={idx} className="bg-gradient-to-r from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-lg p-4 border-l-4 border-accent">
                          <p className="font-heading font-bold text-gray-900 dark:text-white mb-1">{benefit.title}</p>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">{benefit.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-xl p-6 border-l-4 border-secondary">
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">{content.worthItCalculation}</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                      {content.worthItCalculationText}
                    </p>
                    <div className="space-y-3">
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
                        <p className="font-heading font-bold text-gray-900 dark:text-white mb-1">{content.lowBidder}</p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{content.lowBidderText}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
                        <p className="font-heading font-bold text-gray-900 dark:text-white mb-1">{content.moderateBidder}</p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{content.moderateBidderText}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
                        <p className="font-heading font-bold text-gray-900 dark:text-white mb-1">{content.activeBidder}</p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{content.activeBidderText}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Withdrawal Fees */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">💸</span>
                    {content.withdrawalFees}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    {content.withdrawalIntro}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">{content.withdrawalMethods}</h3>
                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4 border-l-4 border-green-500">
                        <p className="font-heading font-bold text-gray-900 dark:text-white mb-1">{content.directToUSBank}</p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{content.directToUSBankText}</p>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border-l-4 border-blue-500">
                        <p className="font-heading font-bold text-gray-900 dark:text-white mb-1">{content.payoneer}</p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{content.payoneerText}</p>
                      </div>
                      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg p-4 border-l-4 border-yellow-500">
                        <p className="font-heading font-bold text-gray-900 dark:text-white mb-1">{content.paypalWithdrawal}</p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{content.paypalWithdrawalText}</p>
                      </div>
                      <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-4 border-l-4 border-red-500">
                        <p className="font-heading font-bold text-gray-900 dark:text-white mb-1">{content.wireTransfer}</p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{content.wireTransferText}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border-l-4 border-accent">
                    <h4 className="font-heading font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <span>💡</span>
                      {content.smartWithdrawalStrategy}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {content.smartWithdrawalStrategyText}
                    </p>
                  </div>
                </div>
              </section>

              {/* Real World Examples */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">🧾</span>
                    {content.realWorldExamples}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    {content.realWorldIntro}
                  </p>

                  <div className="space-y-6">
                    {/* Example 1 */}
                    <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-6 border-2 border-red-200 dark:border-red-800">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">{content.example1Title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{content.example1Subtitle}</p>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 space-y-2 font-mono text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{content.example1Gross}</span>
                          <span className="text-gray-900 dark:text-white font-bold">$1,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{content.example1ServiceFee}</span>
                          <span className="text-red-600 dark:text-red-400">-$200</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{content.example1Connects}</span>
                          <span className="text-red-600 dark:text-red-400">-$9</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{content.example1Withdrawal}</span>
                          <span className="text-red-600 dark:text-red-400">-$0.99</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2">
                          <span className="text-gray-900 dark:text-white font-bold">{content.example1Net}</span>
                          <span className="text-accent font-bold text-lg">$790.01</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{content.example1Effective}</span>
                          <span>21%</span>
                        </div>
                      </div>
                    </div>

                    {/* Example 2 */}
                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">{content.example2Title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{content.example2Subtitle}</p>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 space-y-2 font-mono text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{content.example2Gross}</span>
                          <span className="text-gray-900 dark:text-white font-bold">$6,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{content.example2ServiceFee}</span>
                          <span className="text-red-600 dark:text-red-400">-$300</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{content.example2Connects}</span>
                          <span className="text-gray-600 dark:text-gray-400">$0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{content.example2Withdrawal}</span>
                          <span className="text-red-600 dark:text-red-400">-$19.99</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{content.example2WithdrawalFee}</span>
                          <span className="text-red-600 dark:text-red-400">-$0.99</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2">
                          <span className="text-gray-900 dark:text-white font-bold">{content.example2Net}</span>
                          <span className="text-accent font-bold text-lg">$5,684.02</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{content.example2Effective}</span>
                          <span>5.3%</span>
                        </div>
                      </div>
                    </div>

                    {/* Example 3 */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">{content.example3Title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{content.example3Subtitle}</p>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 space-y-2 font-mono text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{content.example3Gross}</span>
                          <span className="text-gray-900 dark:text-white font-bold">$25,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{content.example3ServiceFee}</span>
                          <span className="text-red-600 dark:text-red-400">-$1,250</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{content.example3Connects}</span>
                          <span className="text-gray-600 dark:text-gray-400">$0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{content.example3FreelancerPlus}</span>
                          <span className="text-red-600 dark:text-red-400">-$19.99</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{content.example3Withdrawal}</span>
                          <span className="text-red-600 dark:text-red-400">-$50</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2">
                          <span className="text-gray-900 dark:text-white font-bold">{content.example3Net}</span>
                          <span className="text-accent font-bold text-lg">$23,705.01</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{content.example3Effective}</span>
                          <span>5.2%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Tips to Reduce Fees */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">🎯</span>
                    {content.tipsToReduceFees}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    {content.tipsIntro}
                  </p>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border-l-4 border-accent">
                      <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2">1. {content.tip1}</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{content.tip1Text}</p>
                    </div>
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border-l-4 border-primary">
                      <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2">2. {content.tip2}</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{content.tip2Text}</p>
                    </div>
                    <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-xl p-6 border-l-4 border-secondary">
                      <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2">3. {content.tip3}</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{content.tip3Text}</p>
                    </div>
                    <div className="bg-gradient-to-r from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border-l-4 border-accent">
                      <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2">4. {content.tip4}</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{content.tip4Text}</p>
                    </div>
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border-l-4 border-primary">
                      <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2">5. {content.tip5}</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{content.tip5Text}</p>
                    </div>
                    <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-xl p-6 border-l-4 border-secondary">
                      <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2">6. {content.tip6}</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{content.tip6Text}</p>
                    </div>
                    <div className="bg-gradient-to-r from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border-l-4 border-accent">
                      <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2">7. {content.tip7}</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{content.tip7Text}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Upwork vs Competitors */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">⚖️</span>
                    {content.upworkVsCompetitors}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    {content.upworkVsIntro}
                  </p>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg p-4 border-l-4 border-primary">
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-bold text-gray-900 dark:text-white">Upwork 2025</span>
                        <span className="text-primary font-bold">0-15% variable per contract</span>
                      </div>
                    </div>
                    <div className="text-center text-gray-400 text-sm">{content.fiverrVs}</div>
                    <div className="bg-gradient-to-r from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-lg p-4 border-l-4 border-accent">
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-bold text-gray-900 dark:text-white">{content.fiverr}</span>
                        <span className="text-accent font-bold">{content.fiverrFee}</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-lg p-4 border-l-4 border-secondary">
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-bold text-gray-900 dark:text-white">{content.freelancerCom}</span>
                        <span className="text-secondary font-bold">{content.freelancerComFee}</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg p-4 border-l-4 border-primary">
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-bold text-gray-900 dark:text-white">{content.toptal}</span>
                        <span className="text-primary font-bold">{content.toptalFee}</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4 border-l-4 border-green-500">
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-bold text-gray-900 dark:text-white">{content.direct}</span>
                        <span className="text-green-600 font-bold">{content.directFee}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      <strong className="text-gray-900 dark:text-white">{content.bottomLine}</strong> {content.bottomLineText}
                    </p>
                  </div>
                </div>
              </section>

              {/* Final Verdict */}
              <section className="mb-16">
                <div className="bg-gradient-to-br from-secondary/10 via-primary/10 to-accent/10 dark:from-secondary/20 dark:via-primary/20 dark:to-accent/20 rounded-2xl shadow-lg p-8 border-2 border-secondary/30 dark:border-secondary/50">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">📜</span>
                    {content.finalVerdict}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {content.verdictIntro}
                  </p>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <p>
                      <strong className="text-gray-900 dark:text-white">{content.verdictNewbies}</strong> {content.verdictNewbiesText}
                    </p>
                    <p>
                      <strong className="text-gray-900 dark:text-white">{content.verdictEstablished}</strong> {content.verdictEstablishedText}
                    </p>
                    <p>
                      <strong className="text-gray-900 dark:text-white">{content.verdictClients}</strong> {content.verdictClientsText}
                    </p>
                    <p>
                      <strong className="text-gray-900 dark:text-white">{content.smartStrategy}</strong> {content.smartStrategyText}
                    </p>
                  </div>
                  <div className="mt-6 bg-white dark:bg-gray-900 rounded-xl p-6 text-center">
                    <div className="text-4xl font-heading font-bold text-secondary dark:text-accent mb-2">8.5/10</div>
                    <p className="text-gray-600 dark:text-gray-400">{content.worthThePrice}</p>
                  </div>
                </div>
              </section>

              {/* Internal Links */}
              <section className="mb-16">
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6">{content.exploreMore}</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Link href={`/${locale}/platforms`} className="group bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-xl p-6 hover:shadow-lg transition-all border border-secondary/20">
                    <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-secondary transition-colors">
                      {content.compareAllPlatforms}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {content.compareAllPlatformsText}
                    </p>
                  </Link>
                  <Link href={`/${locale}/reviews`} className="group bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 hover:shadow-lg transition-all border border-accent/20">
                    <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
                      {content.readPlatformReviews}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {content.readPlatformReviewsText}
                    </p>
                  </Link>
                  <Link href={`/${locale}/tools/rate-calculator`} className="group bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 hover:shadow-lg transition-all border border-primary/20">
                    <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                      {content.calculateYourRate}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {content.calculateYourRateText}
                    </p>
                  </Link>
                  <Link href={`/${locale}/resources/upwork-complete-guide`} className="group bg-gradient-to-br from-secondary/10 to-primary/10 dark:from-secondary/20 dark:to-primary/20 rounded-xl p-6 hover:shadow-lg transition-all border border-secondary/20">
                    <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-secondary transition-colors">
                      {content.upworkGuide}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {content.upworkGuideText}
                    </p>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </article>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                {content.maximizeEarnings}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                {content.maximizeEarningsText}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-secondary text-white font-heading font-bold hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl"
                >
                  {content.browseAllPlatforms}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/newsletter`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white dark:bg-gray-800 text-secondary dark:text-accent border-2 border-secondary dark:border-accent font-heading font-bold hover:bg-secondary/5 dark:hover:bg-accent/10 transition-all"
                >
                  {content.getWeeklyInsights}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
