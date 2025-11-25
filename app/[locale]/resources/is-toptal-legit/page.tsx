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
      title: "Is Toptal Betrouwbaar? Eerlijke Review van het Elite Freelance Netwerk",
      description: "Is Toptal legit? JA - BBB A+ beoordeling, 4.0/5 Trustpilot (2.095 reviews), sinds 2010, Fortune 500 klanten (J.P. Morgan, Airbnb, Shopify). Leer over betalingsbetrouwbaarheid en hoe je namaak oplichting herkent.",
      keywords: "is toptal legit, toptal betrouwbaar, toptal scam, toptal legitimate, toptal trustworthy, toptal echt, toptal BBB beoordeling",
      openGraph: {
        title: "Is Toptal Betrouwbaar? Eerlijke Review van het Elite Freelance Netwerk",
        description: "Is Toptal legit? JA - BBB A+ beoordeling, 4.0/5 Trustpilot (2.095 reviews), sinds 2010, Fortune 500 klanten (J.P. Morgan, Airbnb, Shopify). Leer over betalingsbetrouwbaarheid en hoe je namaak oplichting herkent.",
        type: "article",
      },
    };
  }

  return {
    title: "Is Toptal Legit? Honest Review of the Elite Freelance Network",
    description: "Is Toptal a legit company? YES - BBB A+ rating, 4.0/5 Trustpilot (2,095 reviews), founded 2010, Fortune 500 clients (J.P. Morgan, Airbnb, Shopify). Learn about payment reliability and how to spot impersonation scams.",
    keywords: "is toptal legit, is toptal a legit company, toptal scam, toptal legitimate, toptal trustworthy, toptal real, toptal BBB rating",
    openGraph: {
      title: "Is Toptal Legit? Honest Review of the Elite Freelance Network",
      description: "Is Toptal a legit company? YES - BBB A+ rating, 4.0/5 Trustpilot (2,095 reviews), founded 2010, Fortune 500 clients (J.P. Morgan, Airbnb, Shopify). Learn about payment reliability and how to spot impersonation scams.",
      type: "article",
    },
  };
}

export default async function IsToptalLegitPage({ params }: Props) {
  const { locale } = await params;

  const content = locale === 'nl' ? {
    badge: "Betrouwbaarheidscheck",
    title: "Is Toptal Betrouwbaar? De Waarheid Over het Elite Freelance Netwerk",
    subtitle: "Als je je afvraagt of Toptal een legitiem bedrijf is - het korte antwoord is JA. BBB A+ beoordeling, 4.0/5 Trustpilot (2.095 reviews), opgericht in 2010, bedient Fortune 500-bedrijven zoals J.P. Morgan en Airbnb. Maar PAS OP voor namaak oplichting.",
    cta1: "Bekijk Betrouwbare Platforms",
    cta2: "Lees Meer Reviews",
    quickAnswer: "Het Korte Antwoord",
    quickAnswerYes: "JA - Toptal is een Legitiem Bedrijf",
    quickAnswerPoints: [
      "✅ BBB A+ beoordeling (hoogst mogelijke) + 4.0/5 Trustpilot (2.095 reviews)",
      "✅ Opgericht in 2010 (14+ jaar in bedrijf)",
      "✅ Bedient Fortune 500-bedrijven (J.P. Morgan, Pfizer, Airbnb, Shopify)",
      "✅ Vrijwel geen betalingsproblemen gerapporteerd - betalingen zijn betrouwbaar",
      "✅ Streng selectieproces (alleen 3% geaccepteerd) bewijst legitimiteit"
    ],
    butImportant: "Maar Belangrijk:",
    warningPoint: "Hoewel Toptal zelf 100% legitiem is, doen OPLICHTERS zich voor als Toptal recruiters via WhatsApp, Telegram en Facebook Messenger. Echte Toptal vraagt NOOIT geld vooraf en neemt NOOIT contact op via social media DM's. Leer hieronder hoe je echte Toptal-communicatie kunt verifiëren.",
    trustSignals: "Waarom Toptal Betrouwbaar is: De Bewijzen",
    established: "Gevestigde Bedrijfsgeschiedenis",
    establishedText: "Toptal werd opgericht in 2010 door Taso Du Val en Breanden Beneschott. Het bedrijf heeft 14+ jaar geopereerd als een gerespecteerde freelance marktplaats, bediend duizenden elite freelancers en tientallen Fortune 500-bedrijven waaronder J.P. Morgan, Pfizer, Airbnb en Shopify.",
    proofPoints: "Bewijspunten:",
    establishedPoints: [
      "Geregistreerd bedrijf met een verifieerbare juridische entiteit (Toptal, LLC)",
      "Hoofdkantoor in San Francisco, CA met wereldwijde kantoren",
      "Uitgebreide bedrijfspagina op LinkedIn met 100K+ volgers",
      "Tienduizenden geverifieerde werknemersreviews op Glassdoor & Indeed"
    ],
    fortune500: "Fortune 500 Klanten & Prestigieuze Klanten",
    fortune500Text: "Toptal werkt met enkele van de grootste en meest gerespecteerde bedrijven ter wereld - bedrijven die rigoureuze due diligence uitvoeren voordat ze met leveranciers werken.",
    confirmedClients: "Bevestigde Klanten Omvatten:",
    clientsList: [
      "J.P. Morgan - Financiële technologie expertise",
      "Pfizer - Gezondheidszorg IT-oplossingen",
      "Airbnb - Gasthost technologie talent",
      "Shopify - E-commerce ontwikkeling",
      "Zendesk - Ontwikkeling klantenservice platform",
      "Motorola - Mobiele technologie projecten",
      "Bridgestone - Enterprise technologie projecten"
    ],
    impossibleScam: "Het zou onmogelijk zijn voor een scam-bedrijf om met deze klanten te werken - ze hebben juridische teams die contracten verifiëren en leveranciers onderzoeken.",
    securePayments: "Beveiligde Betalingsverwerking",
    securePaymentsText: "Een van de grootste zorgen bij freelance platforms is betrouwbare betalingen. Toptal heeft vrijwel GEEN meldingen van betalingsproblemen - wanneer betalingen plaatsvinden, zijn ze betrouwbaar en op tijd:",
    paymentProtections: "Betalingsbeschermingen:",
    protectionsList: [
      "Gecentraliseerde betalingsverwerking - klanten betalen Toptal, Toptal betaalt freelancers",
      "Consistente betalingsschema's (meestal twee weken) met geautomatiseerde verwerking",
      "Meerdere betalingsopties (directe storting, PayPal, Payoneer, wire)",
      "Escrow-bescherming voor projecten - klanten financieren mijlpalen vooraf",
      "Geschillenresolutie met toegewijde ondersteuningsteams"
    ],
    realFreelancers: "Echte Freelancers Delen Ervaringen",
    realFreelancersText: "Duizenden onafhankelijke reviews van werkelijke freelancers bevestigen dat Toptal legitiem is:",
    reviewBreakdown: "Review Breakdown:",
    trustpilot: "Trustpilot",
    trustpilotScore: "4.0/5 sterren (2.095 reviews) - Goede beoordeling",
    glassdoor: "Glassdoor",
    glassdoorScore: "3.5/5 sterren (748 werknemersreviews) - Gemiddelde beoordeling",
    bbb: "Better Business Bureau (BBB)",
    bbbScore: "A+ beoordeling (hoogst mogelijke) - Uitstekend",
    reddit: "Reddit r/freelance",
    redditScore: "Gemengde maar authentieke discussies over acceptatiepercentages en klantkwaliteit",
    commonThemes: "Veelvoorkomende Thema's in Positieve Reviews:",
    positiveThemes: [
      "Betalingen komen altijd op tijd zonder problemen",
      "Toegang tot hoogbetaalde premium klanten",
      "Professionele ondersteuning van toegewijde talentmanagers",
      "Geen tijd verspild aan voorstellen schrijven of bieden"
    ],
    rigorous: "Streng Selectieproces (Geen Scam Accepteert 'Iedereen')",
    rigorousText: "Het beruchte moeilijke 5-stappen selectieproces van Toptal is feitelijk een bewijs van legitimiteit. Scam-platforms accepteren iedereen om bedrogen worden te kunnen. Toptal's 3% acceptatiepercentage laat zien dat ze echt elite talent cureren:",
    screeningSteps: "5-Stappen Screening:",
    step1: "Taal & Persoonlijkheidstest (~70% slagingspercentage)",
    step2: "Live technische vaardigheden interview (~25% slagingspercentage)",
    step3: "Real-world testproject (~15% slagingspercentage)",
    step4: "Projectreview & code critique (~10% slagingspercentage)",
    step5: "Betaalde trial met echte klant (~3-5% cumulatief)",
    scamWouldnt: "Een scam-bedrijf zou zo'n tijdrovend proces nooit implementeren - ze zouden je geld vragen vooraf of 'plaatsingskosten' vragen (wat Toptal NOOIT doet).",
    redFlags: "🚨 Waarschuwingssignalen: Hoe Je Toptal-Oplichting Kunt Herkennen",
    redFlagsIntro: "Hoewel Toptal legitiem is, proberen scammers freelancers voor de gek te houden door zich voor te doen als 'Toptal recruiters'. Hier is hoe je ze kunt herkennen:",
    scamSign1: "Onmiddellijk Baanaanbod Zonder Screening",
    scamSign1Text: "SCAM: 'Gefeliciteerd! Je bent geaccepteerd in Toptal zonder interview!' / ECHT: Toptal vereist ALTIJD een streng 5-stappen selectieproces dat weken duurt.",
    scamSign2: "Gevraagd Geld Vooraf Te Betalen",
    scamSign2Text: "SCAM: 'Betaal $500 voor plaatsing' of 'Registratiekosten' / ECHT: Toptal vraagt NOOIT geld van freelancers. ALLE kosten worden aan klanten doorberekend.",
    scamSign3: "Niet-Toptal E-mailadressen of Social Media Contact",
    scamSign3Text: "SCAM: recruiter@toptal-hiring.com, jobs.toptal@gmail.com, WhatsApp/Telegram/Facebook Messenger contact / ECHT: Legitieme Toptal-e-mails komen ALTIJD van @toptal.com domeinen. Toptal neemt NOOIT contact op via social media DM's.",
    scamSign4: "Geen Verifieerbaar Toptal Profiel",
    scamSign4Text: "SCAM: Kan LinkedIn-profiel of bedrijfsidentiteit niet verifiëren, gecontacteerd via WhatsApp/Telegram / ECHT: Alle echte Toptal-rekruteringsmanagers hebben verifieerbare LinkedIn-profielen gekoppeld aan Toptal. Ze gebruiken GEEN social media berichten.",
    scamSign5: "Te-Mooi-Om-Waar-Te-Zijn Aanbiedingen",
    scamSign5Text: "SCAM: '$200/uur gegarandeerd, start volgende week!' / ECHT: Toptal heeft prijzen gebaseerd op vaardigheden & vraag, en screening duurt 3-5 weken.",
    verify: "Hoe Je Kunt Verifiëren dat Je Met Echte Toptal Spreekt",
    verifyIntro: "Als je een 'Toptal'-vacature ontvangt, volg deze verificatiestappen voordat je doorgaat:",
    verifyStep1: "Controleer het E-maildomein",
    verifyStep1Text: "Echte communicatie komt ALTIJD van @toptal.com. Als het een andere domein is, is het een scam.",
    verifyStep2: "Bezoek Toptal.com Direct",
    verifyStep2Text: "Ga naar https://www.toptal.com en log in op je account. Kijk of de vacature daar wordt weergegeven. Klik NIET op links in verdachte e-mails.",
    verifyStep3: "Contact Toptal Ondersteuning",
    verifyStep3Text: "E-mail support@toptal.com of gebruik de chat op hun website om elke recruitingcommunicatie te verifiëren.",
    verifyStep4: "LinkedIn Profiel Verificatie",
    verifyStep4Text: "Als een recruiter je benadert, verifieer hun LinkedIn-profiel. Ze moeten 'Toptal' hebben als huidige werkgever met geschiedenis.",
    verifyStep5: "Nooit Vooruitbetalen",
    verifyStep5Text: "Als IEMAND je vraagt te betalen voor plaatsing, screening of 'fast-track' acceptatie, is het 100% een scam. Blokkeer en rapporteer.",
    realConcerns: "Echte Zorgen Freelancers Hebben (En of Ze Valide Zijn)",
    concern1: "Zorg: 'Het Selectieproces Duurt Te Lang'",
    concern1Valid: "Valide?",
    concern1Answer: "JA - Het Toptal-selectieproces duurt 3-5 weken en vereist 40-60 uur werk. Dit is geen scam, maar een echte tijdsinvestering. Pas aan als je de tijd en vertrouwen hebt.",
    concern2: "Zorg: 'Hoog Afwijzingspercentage (97%)'",
    concern2Valid: "Valide?",
    concern2Answer: "JA - Toptal accepteert werkelijk slechts 3% van aanvragers. Afwijzing betekent niet dat je niet bekwaam bent; het weerspiegelt hun ultra-selectieve standaarden. Overweeg alternatieven zoals Upwork of Freelancer.com als je wordt afgewezen.",
    concern3: "Zorg: 'Downtime Tussen Projecten'",
    concern3Valid: "Valide?",
    concern3Answer: "JA - Sommige freelancers rapporteren hiaten tussen projectcontracten afhankelijk van klantvraag. Toptal garandeert geen voortdurend werk, dus onderhoud inkomensbuffer.",
    concern4: "Zorg: 'Hoge Commissiepercentages (20-30%)'",
    concern4Valid: "Valide?",
    concern4Answer: "JA - Toptal neemt 20-30% commissie, hoger dan sommige concurrenten. MAAR dit is duidelijk gecommuniceerd en compenseert met hogere tarieven ($100-200+/uur) en premium klanten.",
    concern5: "Zorg: 'Beperkte Feedback bij Afwijzing'",
    concern5Valid: "Valide?",
    concern5Answer: "JA - Toptal geeft minimale details waarom je werd afgewezen. Dit is frustrerend maar standaardpraktijk in hoogvolume screening. Niet scam, gewoon frustrerende beleid.",
    knownIssues: "Bekende Problemen & Juridische Controverses",
    knownIssuesIntro: "Hoewel Toptal legitiem is, zijn er enkele juridische controverses geweest:",
    lawsuit2025: "2025 Rechtszaak - Denis Grosz 'Takedown Plot'",
    lawsuit2025Text: "In 2025 oordeelde een jury dat Denis Grosz een 'takedown plot' tegen Toptal had georkestreerd. Deze rechtszaak bevestigt Toptal's legitimiteit - een scam zou geen juridische actie ondernemen.",
    lawsuitAndela: "Rechtszaak vs Andela",
    lawsuitAndelaText: "Toptal heeft handelsgeheimbeschuldigingen ingediend tegen concurrent Andela. Dit is typische zakelijke geschillen, geen bewijs van illegitimiteit.",
    qualityVariance: "Prijzen & Kwaliteitsklachten",
    qualityVarianceText: "Sommige klanten rapporteren hoge prijzen en kwaliteitsverschillen. Dit zijn zakelijke zorgen, geen scam-indicatoren. Legitieme bedrijven kunnen servicekwaliteitsproblemen hebben.",
    finalVerdict: "Eindoordeel: Is Toptal Legitiem & De Moeite Waard?",
    legitimacy: "Legitimiteit:",
    legitimacyText: "JA, Toptal is 100% een legitiem, gevestigd bedrijf met BBB A+ beoordeling, 4.0/5 Trustpilot (2.095 reviews), 14+ jaar geschiedenis, Fortune 500-klanten (J.P. Morgan, Pfizer, Airbnb, Shopify) en vrijwel geen betalingsproblemen. Dit is GEEN scam.",
    worthIt: "De Moeite Waard?",
    forElite: "Voor Elite Freelancers (5+ jaar ervaring):",
    forEliteText: "JA - Als je de strenge screening kunt doorstaan, biedt Toptal ongeëvenaarde toegang tot premium klanten, hoogbetaalde projecten ($100-200+/uur) en betalingsbescherming. De 40-60 uur screening investering loont af.",
    forBeginner: "Voor Beginners (<3 jaar ervaring):",
    forBeginnerText: "NEE - Het 3% acceptatiepercentage en lange screening maken risico hoog. Begin met platforms zoals Upwork, Fiverr of Freelancer.com om je portfolio en vaardigheden eerst op te bouwen.",
    trustButVerify: "Vertrouw Maar Verifieer:",
    trustButVerifyText: "Toptal is legit, maar wees waakzaam tegen scammers die doen alsof ze Toptal zijn. Controleer ALTIJD e-mailadressen, verifieer recruiters via LinkedIn en neem nooit contact op met ondersteuning via officiële kanalen voordat je betaalt of persoonlijke info deelt.",
    bottomLine: "Conclusie:",
    bottomLineText: "Toptal is een betrouwbaar, legitiem elite freelance netwerk - niet een scam. Maar de strikte acceptatiecriteria, tijdsinvestering en concurrentie betekenen dat het alleen geschikt is voor top 3% van talent. Ga met realistische verwachtingen in, verifieer altijd communicatie, en wees bereid voor een streng selectieproces.",
    compareOptions: "Vergelijk Betrouwbare Freelance Platforms",
    compareOptionsText: "Toptal is legitiem, maar het is niet het enige vertrouwde platform. Verken andere betrouwbare opties voor je vaardighedenniveau:",
    exploreMore: "Ontdek Meer Platforms",
    viewAllPlatforms: "Bekijk Alle Platforms →",
    viewAllPlatformsText: "25+ geverifieerde, legitieme freelance marktplaatsen vergeleken",
    readReviews: "Lees Platform Reviews →",
    readReviewsText: "Echte freelancer ervaringen op vertrouwde platforms",
    calculateRate: "Bereken Je Tarief →",
    calculateRateText: "Bepaal competitieve prijzen voor je vaardigheden",
    scamGuide: "Freelance Scam Gids →",
    scamGuideText: "Leer rode vlaggen te herkennen op alle platforms",
    needHelp: "Hulp Nodig Bij Het Kiezen van een Platform?",
    needHelpText: "Vergelijk 25+ legitieme freelance marktplaatsen om de beste match te vinden voor je vaardigheden en ervaringsniveau.",
    browseAllPlatforms: "Bekijk Alle Platforms",
    getWeeklyInsights: "Krijg Wekelijkse Inzichten"
  } : {
    badge: "Legitimacy Check",
    title: "Is Toptal Legit? The Truth About the Elite Freelance Network",
    subtitle: "If you're wondering whether Toptal is a legitimate company - the short answer is YES. BBB A+ rating, 4.0/5 Trustpilot (2,095 reviews), founded in 2010, serving Fortune 500 companies like J.P. Morgan and Airbnb. But BEWARE of impersonation scams.",
    cta1: "View Trusted Platforms",
    cta2: "Read More Reviews",
    quickAnswer: "The Quick Answer",
    quickAnswerYes: "YES - Toptal is a Legitimate Company",
    quickAnswerPoints: [
      "✅ BBB A+ rating (highest possible) + 4.0/5 Trustpilot (2,095 reviews)",
      "✅ Founded in 2010 (14+ years in business)",
      "✅ Serves Fortune 500 companies (J.P. Morgan, Pfizer, Airbnb, Shopify)",
      "✅ Virtually zero payment issues reported - payments are reliable",
      "✅ Rigorous screening process (only 3% accepted) proves legitimacy"
    ],
    butImportant: "But Important:",
    warningPoint: "While Toptal itself is 100% legitimate, SCAMMERS impersonate Toptal recruiters via WhatsApp, Telegram, and Facebook Messenger. Real Toptal NEVER requests money upfront or contacts via social media DMs. Learn how to verify real Toptal communication below.",
    trustSignals: "Why Toptal is Legit: The Evidence",
    established: "Established Company History",
    establishedText: "Toptal was founded in 2010 by Taso Du Val and Breanden Beneschott. The company has operated for 14+ years as a respected freelance marketplace, serving thousands of elite freelancers and dozens of Fortune 500 companies including J.P. Morgan, Pfizer, Airbnb, and Shopify.",
    proofPoints: "Proof Points:",
    establishedPoints: [
      "Registered company with verifiable legal entity (Toptal, LLC)",
      "Headquarters in San Francisco, CA with global offices",
      "Extensive LinkedIn company page with 100K+ followers",
      "Tens of thousands of verified employee reviews on Glassdoor & Indeed"
    ],
    fortune500: "Fortune 500 Clients & Prestigious Customers",
    fortune500Text: "Toptal works with some of the world's largest and most respected companies - businesses that conduct rigorous due diligence before working with vendors.",
    confirmedClients: "Confirmed Clients Include:",
    clientsList: [
      "J.P. Morgan - Financial technology expertise",
      "Pfizer - Healthcare IT solutions",
      "Airbnb - Hosted technology talent",
      "Shopify - E-commerce development",
      "Zendesk - Customer service platform development",
      "Motorola - Mobile technology projects",
      "Bridgestone - Enterprise technology projects"
    ],
    impossibleScam: "It would be impossible for a scam company to work with these clients - they have legal teams that verify contracts and vet vendors.",
    securePayments: "Secure Payment Processing",
    securePaymentsText: "One of the biggest concerns with freelance platforms is reliable payments. Toptal has virtually ZERO reports of payment issues - when payments occur, they're reliable and on-time:",
    paymentProtections: "Payment Protections:",
    protectionsList: [
      "Centralized payment processing - clients pay Toptal, Toptal pays freelancers",
      "Consistent payment schedules (typically bi-weekly) with automated processing",
      "Multiple payment options (direct deposit, PayPal, Payoneer, wire)",
      "Escrow protection for projects - clients fund milestones upfront",
      "Dispute resolution with dedicated support teams"
    ],
    realFreelancers: "Real Freelancers Share Experiences",
    realFreelancersText: "Thousands of independent reviews from actual freelancers confirm Toptal is legitimate:",
    reviewBreakdown: "Review Breakdown:",
    trustpilot: "Trustpilot",
    trustpilotScore: "4.0/5 stars (2,095 reviews) - Good rating",
    glassdoor: "Glassdoor",
    glassdoorScore: "3.5/5 stars (748 employee reviews) - Average rating",
    bbb: "Better Business Bureau (BBB)",
    bbbScore: "A+ rating (highest possible) - Excellent",
    reddit: "Reddit r/freelance",
    redditScore: "Mixed but authentic discussions about acceptance rates and client quality",
    commonThemes: "Common Themes in Positive Reviews:",
    positiveThemes: [
      "Payments always arrive on time without issues",
      "Access to high-paying premium clients",
      "Professional support from dedicated talent managers",
      "No time wasted writing proposals or bidding"
    ],
    rigorous: "Rigorous Screening Process (No Scam Accepts 'Everyone')",
    rigorousText: "Toptal's notoriously difficult 5-step screening process is actually proof of legitimacy. Scam platforms accept anyone to maximize victims. Toptal's 3% acceptance rate shows they're genuinely curating elite talent:",
    screeningSteps: "5-Step Screening:",
    step1: "Language & Personality test (~70% pass rate)",
    step2: "Live technical skills interview (~25% pass rate)",
    step3: "Real-world test project (~15% pass rate)",
    step4: "Project review & code critique (~10% pass rate)",
    step5: "Paid trial with real client (~3-5% cumulative)",
    scamWouldnt: "A scam company would never implement such a time-consuming process - they'd ask for your money upfront or charge 'placement fees' (which Toptal NEVER does).",
    redFlags: "🚨 Red Flags: How to Spot Toptal Scams",
    redFlagsIntro: "While Toptal is legitimate, scammers try to trick freelancers by impersonating 'Toptal recruiters'. Here's how to spot them:",
    scamSign1: "Immediate Job Offer Without Screening",
    scamSign1Text: "SCAM: 'Congratulations! You're accepted to Toptal without interview!' / REAL: Toptal ALWAYS requires rigorous 5-step screening taking weeks.",
    scamSign2: "Asked to Pay Money Upfront",
    scamSign2Text: "SCAM: 'Pay $500 for placement' or 'Registration fee' / REAL: Toptal NEVER asks freelancers for money. ALL fees are charged to clients.",
    scamSign3: "Non-Toptal Email Addresses or Social Media Contact",
    scamSign3Text: "SCAM: recruiter@toptal-hiring.com, jobs.toptal@gmail.com, WhatsApp/Telegram/Facebook Messenger contact / REAL: Legitimate Toptal emails ALWAYS come from @toptal.com domains. Toptal NEVER contacts via social media DMs.",
    scamSign4: "No Verifiable Toptal Profile",
    scamSign4Text: "SCAM: Cannot verify LinkedIn profile or company identity, contacted via WhatsApp/Telegram / REAL: All real Toptal hiring managers have verifiable LinkedIn profiles linked to Toptal. They DON'T use social media messaging.",
    scamSign5: "Too-Good-To-Be-True Offers",
    scamSign5Text: "SCAM: '$200/hr guaranteed, start next week!' / REAL: Toptal rates are based on skills & demand, and screening takes 3-5 weeks.",
    verify: "How to Verify You're Talking to Real Toptal",
    verifyIntro: "If you receive a 'Toptal' job offer, follow these verification steps before proceeding:",
    verifyStep1: "Check Email Domain",
    verifyStep1Text: "Real communication comes ALWAYS from @toptal.com. If it's any other domain, it's a scam.",
    verifyStep2: "Visit Toptal.com Directly",
    verifyStep2Text: "Go to https://www.toptal.com and log into your account. Check if the job posting appears there. DON'T click links in suspicious emails.",
    verifyStep3: "Contact Toptal Support",
    verifyStep3Text: "Email support@toptal.com or use chat on their website to verify any recruiting communication.",
    verifyStep4: "LinkedIn Profile Verification",
    verifyStep4Text: "If a recruiter contacts you, verify their LinkedIn profile. They should have 'Toptal' as current employer with history.",
    verifyStep5: "Never Pay Upfront",
    verifyStep5Text: "If ANYONE asks you to pay for placement, screening, or 'fast-track' acceptance, it's 100% a scam. Block and report.",
    realConcerns: "Real Concerns Freelancers Have (And Whether They're Valid)",
    concern1: "Concern: 'The Screening Process Takes Too Long'",
    concern1Valid: "Valid?",
    concern1Answer: "YES - Toptal's screening process takes 3-5 weeks and requires 40-60 hours of work. This isn't a scam, but a real time investment. Only apply if you have the time and confidence.",
    concern2: "Concern: 'High Rejection Rate (97%)'",
    concern2Valid: "Valid?",
    concern2Answer: "YES - Toptal truly accepts only 3% of applicants. Rejection doesn't mean you're not skilled; it reflects their ultra-selective standards. Consider alternatives like Upwork or Freelancer.com if rejected.",
    concern3: "Concern: 'Downtime Between Projects'",
    concern3Valid: "Valid?",
    concern3Answer: "YES - Some freelancers report gaps between project contracts depending on client demand. Toptal doesn't guarantee continuous work, so maintain income buffer.",
    concern4: "Concern: 'High Commission Rates (20-30%)'",
    concern4Valid: "Valid?",
    concern4Answer: "YES - Toptal takes 20-30% commission, higher than some competitors. BUT this is clearly communicated and compensates with higher rates ($100-200+/hr) and premium clients.",
    concern5: "Concern: 'Limited Feedback on Rejection'",
    concern5Valid: "Valid?",
    concern5Answer: "YES - Toptal provides minimal details on why you were rejected. This is frustrating but standard practice in high-volume screening. Not scam, just frustrating policy.",
    knownIssues: "Known Issues & Legal Controversies",
    knownIssuesIntro: "While Toptal is legitimate, there have been some legal controversies:",
    lawsuit2025: "2025 Lawsuit - Denis Grosz 'Takedown Plot'",
    lawsuit2025Text: "In 2025, a jury found that Denis Grosz orchestrated a 'takedown plot' against Toptal. This lawsuit confirms Toptal's legitimacy - a scam wouldn't pursue legal action.",
    lawsuitAndela: "Lawsuit vs Andela",
    lawsuitAndelaText: "Toptal filed trade secret allegations against competitor Andela. This is typical business litigation, not evidence of illegitimacy.",
    qualityVariance: "Pricing & Quality Complaints",
    qualityVarianceText: "Some clients report high pricing and quality variance. These are business concerns, not scam indicators. Legitimate companies can have service quality issues.",
    finalVerdict: "Final Verdict: Is Toptal Legit & Worth It?",
    legitimacy: "Legitimacy:",
    legitimacyText: "YES, Toptal is 100% a legitimate, established company with BBB A+ rating, 4.0/5 Trustpilot (2,095 reviews), 14+ years of history, Fortune 500 clients (J.P. Morgan, Pfizer, Airbnb, Shopify), and virtually zero payment issues. This is NOT a scam.",
    worthIt: "Worth It?",
    forElite: "For Elite Freelancers (5+ years experience):",
    forEliteText: "YES - If you can pass the rigorous screening, Toptal offers unparalleled access to premium clients, high-paying projects ($100-200+/hr), and payment protection. The 40-60 hour screening investment pays off.",
    forBeginner: "For Beginners (<3 years experience):",
    forBeginnerText: "NO - The 3% acceptance rate and lengthy screening make risk high. Start with platforms like Upwork, Fiverr, or Freelancer.com to build your portfolio and skills first.",
    trustButVerify: "Trust But Verify:",
    trustButVerifyText: "Toptal is legit, but be vigilant against scammers impersonating Toptal. ALWAYS check email addresses, verify recruiters via LinkedIn, and contact support through official channels before paying or sharing personal info.",
    bottomLine: "Bottom Line:",
    bottomLineText: "Toptal is a trustworthy, legitimate elite freelance network - not a scam. But the strict acceptance criteria, time investment, and competition mean it's only suitable for top 3% of talent. Go in with realistic expectations, always verify communication, and be prepared for a rigorous screening process.",
    compareOptions: "Compare Trusted Freelance Platforms",
    compareOptionsText: "Toptal is legitimate, but it's not the only trusted platform. Explore other reputable options for your skill level:",
    exploreMore: "Explore More Platforms",
    viewAllPlatforms: "View All Platforms →",
    viewAllPlatformsText: "25+ verified, legitimate freelance marketplaces compared",
    readReviews: "Read Platform Reviews →",
    readReviewsText: "Real freelancer experiences on trusted platforms",
    calculateRate: "Calculate Your Rate →",
    calculateRateText: "Determine competitive pricing for your skills",
    scamGuide: "Freelance Scam Guide →",
    scamGuideText: "Learn to spot red flags across all platforms",
    needHelp: "Need Help Choosing a Platform?",
    needHelpText: "Compare 25+ legitimate freelance marketplaces to find the best match for your skills and experience level.",
    browseAllPlatforms: "Browse All Platforms",
    getWeeklyInsights: "Get Weekly Insights"
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": locale === 'nl' ? "Is Toptal Betrouwbaar? Eerlijke Review van het Elite Freelance Netwerk" : "Is Toptal Legit? Honest Review of the Elite Freelance Network",
    "description": locale === 'nl' ? "Is Toptal legit? JA - sinds 2010, Fortune 500 klanten, betrouwbare betalingen. Leer over echte ervaringen en hoe je oplichting herkent." : "Is Toptal a legit company? YES - founded 2010, Fortune 500 clients, secure payments. Learn about real experiences and how to spot scams.",
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
        <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 mb-6">
                <span className="text-2xl">🔍</span>
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white font-heading font-semibold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
                >
                  {content.cta1}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/reviews`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 border-2 border-green-600 dark:border-green-400 font-heading font-semibold hover:bg-green-50 dark:hover:bg-green-900/20 transition-all"
                >
                  {content.cta2}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Answer */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-8 shadow-lg border-2 border-green-200 dark:border-green-800">
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <span className="text-3xl">✅</span>
                  {content.quickAnswer}
                </h2>
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-4">
                  <p className="text-3xl font-heading font-bold text-green-600 dark:text-green-400 mb-4">
                    {content.quickAnswerYes}
                  </p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    {content.quickAnswerPoints.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border-l-4 border-yellow-500">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">{content.butImportant}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{content.warningPoint}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              {/* Trust Signals */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">🛡️</span>
                    {content.trustSignals}
                  </h2>

                  {/* Established History */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <span>📅</span>
                      {content.established}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {content.establishedText}
                    </p>
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border-l-4 border-blue-500">
                      <p className="font-semibold text-gray-900 dark:text-white mb-3">{content.proofPoints}</p>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                        {content.establishedPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1">→</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Fortune 500 Clients */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <span>🏢</span>
                      {content.fortune500}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {content.fortune500Text}
                    </p>
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border-l-4 border-purple-500">
                      <p className="font-semibold text-gray-900 dark:text-white mb-3">{content.confirmedClients}</p>
                      <ul className="grid sm:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300 text-sm mb-4">
                        {content.clientsList.map((client, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">✓</span>
                            <span>{client}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-gray-600 dark:text-gray-400 italic">{content.impossibleScam}</p>
                    </div>
                  </div>

                  {/* Secure Payments */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <span>💳</span>
                      {content.securePayments}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {content.securePaymentsText}
                    </p>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border-l-4 border-green-500">
                      <p className="font-semibold text-gray-900 dark:text-white mb-3">{content.paymentProtections}</p>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                        {content.protectionsList.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">→</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Real Freelancer Reviews */}
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <span>⭐</span>
                      {content.realFreelancers}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {content.realFreelancersText}
                    </p>
                    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl p-6 border-l-4 border-yellow-500 mb-4">
                      <p className="font-semibold text-gray-900 dark:text-white mb-3">{content.reviewBreakdown}</p>
                      <div className="space-y-3 text-sm">
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-3 border-l-4 border-green-500">
                          <p className="font-semibold text-gray-900 dark:text-white">{content.bbb}</p>
                          <p className="text-green-600 dark:text-green-400 font-bold">{content.bbbScore}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
                          <p className="font-semibold text-gray-900 dark:text-white">{content.trustpilot}</p>
                          <p className="text-gray-600 dark:text-gray-400">{content.trustpilotScore}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
                          <p className="font-semibold text-gray-900 dark:text-white">{content.glassdoor}</p>
                          <p className="text-gray-600 dark:text-gray-400">{content.glassdoorScore}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
                          <p className="font-semibold text-gray-900 dark:text-white">{content.reddit}</p>
                          <p className="text-gray-600 dark:text-gray-400">{content.redditScore}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border-l-4 border-green-500">
                      <p className="font-semibold text-gray-900 dark:text-white mb-3">{content.commonThemes}</p>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                        {content.positiveThemes.map((theme, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span>{theme}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Rigorous Screening */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">🎯</span>
                    {content.rigorous}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {content.rigorousText}
                  </p>
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border-l-4 border-blue-500 mb-4">
                    <p className="font-semibold text-gray-900 dark:text-white mb-3">{content.screeningSteps}</p>
                    <ol className="space-y-2 text-gray-700 dark:text-gray-300 text-sm list-decimal list-inside">
                      <li>{content.step1}</li>
                      <li>{content.step2}</li>
                      <li>{content.step3}</li>
                      <li>{content.step4}</li>
                      <li>{content.step5}</li>
                    </ol>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border-l-4 border-green-500">
                    <p className="text-sm text-gray-700 dark:text-gray-300 italic">💡 {content.scamWouldnt}</p>
                  </div>
                </div>
              </section>

              {/* Red Flags Section */}
              <section className="mb-16">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl shadow-lg p-8 border-2 border-red-200 dark:border-red-800">
                  <h2 className="text-3xl font-heading font-bold text-red-800 dark:text-red-300 mb-6 flex items-center gap-3">
                    <span className="text-4xl">🚨</span>
                    {content.redFlags}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {content.redFlagsIntro}
                  </p>

                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-l-4 border-red-500">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span>❌</span>
                        {content.scamSign1}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{content.scamSign1Text}</p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-l-4 border-red-500">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span>💰</span>
                        {content.scamSign2}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{content.scamSign2Text}</p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-l-4 border-red-500">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span>📧</span>
                        {content.scamSign3}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{content.scamSign3Text}</p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-l-4 border-red-500">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span>🔗</span>
                        {content.scamSign4}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{content.scamSign4Text}</p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-l-4 border-red-500">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span>🎁</span>
                        {content.scamSign5}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{content.scamSign5Text}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Verification Steps */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">✅</span>
                    {content.verify}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {content.verifyIntro}
                  </p>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border-l-4 border-blue-500">
                      <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">1</span>
                        {content.verifyStep1}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{content.verifyStep1Text}</p>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border-l-4 border-green-500">
                      <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">2</span>
                        {content.verifyStep2}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{content.verifyStep2Text}</p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border-l-4 border-purple-500">
                      <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">3</span>
                        {content.verifyStep3}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{content.verifyStep3Text}</p>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl p-6 border-l-4 border-yellow-500">
                      <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">4</span>
                        {content.verifyStep4}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{content.verifyStep4Text}</p>
                    </div>

                    <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-6 border-l-4 border-red-500">
                      <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">5</span>
                        {content.verifyStep5}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{content.verifyStep5Text}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Real Concerns */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">🤔</span>
                    {content.realConcerns}
                  </h2>

                  <div className="space-y-6">
                    {[
                      { concern: content.concern1, valid: content.concern1Valid, answer: content.concern1Answer },
                      { concern: content.concern2, valid: content.concern2Valid, answer: content.concern2Answer },
                      { concern: content.concern3, valid: content.concern3Valid, answer: content.concern3Answer },
                      { concern: content.concern4, valid: content.concern4Valid, answer: content.concern4Answer },
                      { concern: content.concern5, valid: content.concern5Valid, answer: content.concern5Answer }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-xl p-6 border-l-4 border-gray-400">
                        <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-3">
                          {item.concern}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <strong>{item.valid}</strong> {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Known Issues & Legal Controversies */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">⚖️</span>
                    {content.knownIssues}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {content.knownIssuesIntro}
                  </p>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border-l-4 border-blue-500">
                      <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-3">
                        {content.lawsuit2025}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {content.lawsuit2025Text}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border-l-4 border-purple-500">
                      <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-3">
                        {content.lawsuitAndela}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {content.lawsuitAndelaText}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl p-6 border-l-4 border-yellow-500">
                      <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-3">
                        {content.qualityVariance}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {content.qualityVarianceText}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Final Verdict */}
              <section className="mb-16">
                <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-purple-900/20 rounded-2xl shadow-lg p-8 border-2 border-green-200 dark:border-green-800">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">📜</span>
                    {content.finalVerdict}
                  </h2>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <p className="text-lg">
                      <strong className="text-gray-900 dark:text-white">{content.legitimacy}</strong> {content.legitimacyText}
                    </p>
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                      <p className="text-lg mb-2">
                        <strong className="text-gray-900 dark:text-white">{content.worthIt}</strong>
                      </p>
                      <p className="mb-2">
                        <strong className="text-green-600 dark:text-green-400">{content.forElite}</strong> {content.forEliteText}
                      </p>
                      <p>
                        <strong className="text-red-600 dark:text-red-400">{content.forBeginner}</strong> {content.forBeginnerText}
                      </p>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border-l-4 border-yellow-500">
                      <p className="text-lg mb-2">
                        <strong className="text-gray-900 dark:text-white">{content.trustButVerify}</strong>
                      </p>
                      <p>{content.trustButVerifyText}</p>
                    </div>
                    <p className="text-lg">
                      <strong className="text-gray-900 dark:text-white">{content.bottomLine}</strong> {content.bottomLineText}
                    </p>
                  </div>
                </div>
              </section>

              {/* Compare Options */}
              <section className="mb-16">
                <div className="bg-gradient-to-r from-secondary to-primary rounded-2xl p-8 text-center shadow-2xl">
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4">
                    {content.compareOptions}
                  </h3>
                  <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                    {content.compareOptionsText}
                  </p>
                  <Link
                    href={`/${locale}/platforms`}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-secondary font-heading font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl text-lg"
                  >
                    {locale === 'nl' ? 'Bekijk Platforms' : 'View Platforms'}
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </section>

              {/* Internal Links */}
              <section className="mb-16">
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6">{content.exploreMore}</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Link href={`/${locale}/platforms`} className="group bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 hover:shadow-lg transition-all border border-green-200 dark:border-green-800">
                    <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 transition-colors">
                      {content.viewAllPlatforms}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {content.viewAllPlatformsText}
                    </p>
                  </Link>
                  <Link href={`/${locale}/reviews`} className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 hover:shadow-lg transition-all border border-blue-200 dark:border-blue-800">
                    <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                      {content.readReviews}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {content.readReviewsText}
                    </p>
                  </Link>
                  <Link href={`/${locale}/tools/rate-calculator`} className="group bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 hover:shadow-lg transition-all border border-purple-200 dark:border-purple-800">
                    <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">
                      {content.calculateRate}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {content.calculateRateText}
                    </p>
                  </Link>
                  <Link href={`/${locale}/resources`} className="group bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl p-6 hover:shadow-lg transition-all border border-yellow-200 dark:border-yellow-800">
                    <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-600 transition-colors">
                      {content.scamGuide}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {content.scamGuideText}
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
                {content.needHelp}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                {content.needHelpText}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-green-600 text-white font-heading font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
                >
                  {content.browseAllPlatforms}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/newsletter`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 border-2 border-green-600 dark:border-green-400 font-heading font-bold hover:bg-green-50 dark:hover:bg-green-900/20 transition-all"
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
