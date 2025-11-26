import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const slug = 'what-is-upwork';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

  if (locale === 'nl') {
    return {
      title: "Wat is Upwork? Complete Gids voor 's Werelds Grootste Freelance Platform",
      description: "Wat is Upwork? Ontdek hoe het grootste freelance platform ter wereld werkt, welke banen beschikbaar zijn, tariefstructuur, hoe te beginnen, en voor wie het geschikt is.",
      keywords: "wat is upwork, upwork uitgelegd, hoe werkt upwork, upwork voor beginners, upwork freelance platform, upwork tarieven",
      openGraph: {
        title: "Wat is Upwork? Complete Gids voor 's Werelds Grootste Freelance Platform",
        description: "Wat is Upwork? Ontdek hoe het grootste freelance platform ter wereld werkt, welke banen beschikbaar zijn, tariefstructuur, hoe te beginnen, en voor wie het geschikt is.",
        url: pageUrl,
        siteName: 'SkillLinkup',
        images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Wat is Upwork?' }],
        locale: 'nl_NL',
        type: "article",
      },
      twitter: {
        card: 'summary_large_image',
        title: "Wat is Upwork? Complete Gids voor 's Werelds Grootste Freelance Platform",
        description: "Wat is Upwork? Ontdek hoe het grootste freelance platform ter wereld werkt, welke banen beschikbaar zijn, tariefstructuur, hoe te beginnen, en voor wie het geschikt is.",
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
    title: "What is Upwork? Complete Beginner's Guide to the World's Largest Freelance Platform",
    description: "What is Upwork? Learn how the world's largest freelance platform works, types of jobs available, fee structure, how to get started, and who uses it.",
    keywords: "what is upwork, upwork explained, upwork freelance, how upwork works, upwork for beginners, upwork platform guide",
    openGraph: {
      title: "What is Upwork? Complete Beginner's Guide to the World's Largest Freelance Platform",
      description: "What is Upwork? Learn how the world's largest freelance platform works, types of jobs available, fee structure, how to get started, and who uses it.",
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'What is Upwork?' }],
      locale: 'en_US',
      type: "article",
    },
    twitter: {
      card: 'summary_large_image',
      title: "What is Upwork? Complete Beginner's Guide to the World's Largest Freelance Platform",
      description: "What is Upwork? Learn how the world's largest freelance platform works, types of jobs available, fee structure, how to get started, and who uses it.",
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

export default async function WhatIsUpworkPage({ params }: Props) {
  const { locale } = await params;

  const content = locale === 'nl' ? {
    badge: "Platform Gids",
    title: "Wat is Upwork? Complete Gids voor Beginners",
    subtitle: "Upwork is 's werelds grootste freelance platform dat bedrijven verbindt met getalenteerde professionals wereldwijd. Ontdek hoe het werkt, welke banen beschikbaar zijn, de tariefstructuur, en of het geschikt is voor jou.",
    cta1: "Bekijk Upwork",
    cta2: "Vergelijk Platforms",
    quickAnswerTitle: "Snel Antwoord: Wat is Upwork?",
    quickAnswer: "Upwork is een online marktplaats waar freelancers hun diensten aanbieden aan bedrijven wereldwijd. Opgericht in mei 2015 door de fusie van Elance (1998) en oDesk (2003), verbindt het platform meer dan 18 miljoen freelancers met 796.000 actieve klanten (en meer dan 5 miljoen totaal geregistreerde klanten). Gevestigd in San Francisco, genereerde Upwork $769,3 miljoen omzet in 2024 en bedient 30% van de Fortune 100 bedrijven in 125+ categorieën.",
    foundedYear: "Opgericht",
    activeFreelancers: "Actieve Freelancers",
    totalJobs: "Totaal Geposte Banen",
    howItWorksTitle: "Hoe Werkt Upwork?",
    howItWorksIntro: "Upwork werkt als een tussenpersoon die freelancers en klanten samenbrengt. Hier is het basisproces:",
    step1Title: "Maak een Profiel",
    step1Text: "Freelancers maken een gratis profiel met hun vaardigheden, werkervaring, portfolio, en uurtarief. Dit profiel fungeert als je virtuele CV en showroom voor potentiële klanten.",
    step2Title: "Zoek & Solliciteer op Banen",
    step2Text: "Blader door duizenden beschikbare projecten in je vaardigheidsgebied. Dien voorstellen in die je expertise uitleggen, relevante ervaring tonen, en offreren voor het project. Je hebt 'Connects' (credits) nodig om te solliciteren op banen—Upwork geeft gratis connects elke maand.",
    step3Title: "Krijg Aangenomen & Werk",
    step3Text: "Klanten bekijken voorstellen en nodigen hun favoriete kandidaten uit voor interviews. Na aanneming, bepaal je werkuren bij, communiceer via Upwork's messaging, en werk aan het project. Gebruik Upwork's timetracker voor uurloonwerk.",
    step4Title: "Krijg Betaald",
    step4Text: "Na voltooiing beoordeelt de klant je werk en geeft betaling vrij. Upwork verwerkt alle betalingen veilig. Geld komt beschikbaar op je Upwork account en kan worden overgemaakt naar je bankrekening (opnametijden variëren per methode).",
    forFreelancers: "Voor Freelancers",
    forClients: "Voor Klanten",
    jobTypesTitle: "Welke Soorten Werk Kan Je Vinden op Upwork?",
    jobTypesIntro: "Upwork ondersteunt vrijwel elke digitale vaardigheid. De meest populaire categorieën zijn:",
    category1: "Web, Mobiel & Software Ontwikkeling",
    category1Jobs: "Full-stack ontwikkeling, frontend/backend, mobiele apps (iOS/Android), game development, blockchain, AI/machine learning, databases, WordPress, Shopify",
    category2: "Design & Creatief",
    category2Jobs: "Grafisch ontwerp, logo ontwerp, UX/UI design, illustratie, video editing, animatie, 3D modeling, productontwerp, branding",
    category3: "Schrijven & Vertaling",
    category3Jobs: "Content schrijven, copywriting, technisch schrijven, ghostwriting, proeflezen, vertaling, transcriptie, SEO content",
    category4: "Marketing & Sales",
    category4Jobs: "Digitale marketing, social media management, SEO, PPC advertising, email marketing, marktonderzoek, sales ontwikkeling",
    category5: "Admin & Klantenservice",
    category5Jobs: "Virtueel assistent werk, data-invoer, klantenondersteuning, projectmanagement, transcriptie, onderzoek",
    category6: "Boekhouding & Financiën",
    category6Jobs: "Boekhouding, financiële planning, belastingvoorbereiding, bedrijfsanalyse, Excel/spreadsheet werk",
    feeStructureTitle: "Hoeveel Kost Upwork? (Tariefstructuur Uitgelegd)",
    freelancerFeesTitle: "Tarieven voor Freelancers (Update Mei 2025)",
    freelancerFeesIntro: "Upwork gebruikt nu een variabel servicetarief van 0% tot 15% gebaseerd op je activiteit en inkomsten:",
    feeFirst500: "Variabel tariefstructuur:",
    feeNext500: "Freelancer servicetarief:",
    feeAbove10k: "Op basis van prestaties:",
    feeExample: "Let op: Tariefstructuur Gewijzigd in Mei 2025",
    feeExampleText: "Upwork gebruikt nu een variabel 0-15% tarief gebaseerd op je activiteit. Het oude gestapelde systeem (hieronder ter referentie) is niet meer van toepassing:",
    feeCalc1: "OUD: Eerste €500 × 20% =",
    feeCalc2: "OUD: Volgende €9.500 × 10% =",
    feeCalc3: "OUD: Laatste €2.000 × 5% =",
    feeTotalFee: "Totale Upwork Tarieven:",
    feeYourEarnings: "Jouw Netto Inkomsten:",
    additionalCostsTitle: "Bijkomende Kosten",
    costConnects: "Connects:",
    costConnectsText: "~€0,15 per connect (gratis 10-80/maand); nodig om te solliciteren op banen",
    costMembership: "Freelancer Plus:",
    costMembershipText: "€49,99/maand voor extra connects, verhoogde zichtbaarheid, exclusieve zoekmogelijkheden",
    costWithdrawal: "Opnametarieven:",
    costWithdrawalText: "Gratis eerste opname/maand, daarna €1-€30 afhankelijk van methode",
    clientCostsTitle: "Kosten voor Klanten (Update Mei 2025)",
    clientCostsText: "Klanten betalen een marktplaatstarief tot 7,99% boven op wat ze aan freelancers betalen. Het exacte tarief hangt af van hun uitgaven en accounttype. Betalingsbescherming is inbegrepen voor uurlooncontracten met Upwork's time tracking tool.",
    prosConsTitle: "Voordelen & Nadelen van Upwork",
    prosTitle: "Voordelen",
    prosItems: [
      { title: "Enorme Marktplaats", text: "Duizenden nieuwe banen gepost dagelijks in vrijwel elke categorie" },
      { title: "Veilige Betalingen", text: "Upwork garandeert betalingsbescherming via escrow systeem" },
      { title: "Wereldwijde Klanten", text: "Werk met bedrijven van over de hele wereld vanaf je huiskamer" },
      { title: "Flexibele Werkstructuren", text: "Kies tussen uurloon, vaste prijs, korte of langetermijn contracten" },
      { title: "Gebouwd In Hulpmiddelen", text: "Time tracking, messaging, file sharing, videoconferenties allemaal geïntegreerd" },
      { title: "Betalingsgarantie", text: "Betaling wordt in escrow geplaatst voordat werk begint voor vaste prijs projecten" }
    ],
    consTitle: "Nadelen",
    consItems: [
      { title: "Hoge Concurrentie", text: "Miljoenen freelancers betekent competitieve biedingen, vooral voor beginners" },
      { title: "Variabele Servicetarieven", text: "Tot 15% servicetarief kan hoog zijn, vooral voor nieuwere freelancers" },
      { title: "Connects Kosten", text: "Sollicitatie op banen kost connects (~€0,15 elk), wat zich opstapelt" },
      { title: "Moeilijke Start", text: "Nieuwkomers zonder recensies vinden het moeilijk om eerste banen te krijgen" },
      { title: "Lage-Tarief Concurrentie", text: "Wereldwijde marktplaats betekent bieden tegen lagere tarieven uit ontwikkelingslanden" },
      { title: "Platform Afhankelijkheid", text: "Je account kan worden opgeschort vanwege beleidsschendingen, waarbij toegang tot klanten wordt afgesneden" }
    ],
    howToStartTitle: "Hoe Begin Je op Upwork (5 Eenvoudige Stappen)",
    startStep1Title: "Aanmelden en Profiel Instellen",
    startStep1Text: "Maak een gratis account aan, vul je professionele informatie in, upload een professionele profielfoto, schrijf een overtuigende overzichtstekst die waarde benadrukt, en vermeld relevante vaardigheden. Hoe completer en professioneler je profiel, hoe beter.",
    startStep2Title: "Voeg Je Portfolio Toe",
    startStep2Text: "Upload voorbeelden van je beste werk. Als je net begint, creëer voorbeeld projecten of case studies. Voor schrijvers: blogposts, artikelen. Voor designers: logo mockups, websites. Voor ontwikkelaars: GitHub repositories, demo apps.",
    startStep3Title: "Neem Upwork Tests (Optioneel Maar Aanbevolen)",
    startStep3Text: "Upwork biedt gratis vaardigheidstests die als badges op je profiel verschijnen. Een hoge score op relevante tests kan je geloofwaardigheid helpen, vooral zonder werkgeschiedenis.",
    startStep4Title: "Solliciteer Op Banen",
    startStep4Text: "Begin met kleinere, minder competitieve projecten om je eerste recensies te krijgen. Schrijf gepersonaliseerde voorstellen die de behoeften van de klant aanpakken (geen generieke kopieën), toon relevante ervaring, en bied concurrerende tarieven voor eerste banen. Verwacht 10-20+ voorstellen voordat je je eerste klant krijgt.",
    startStep5Title: "Lever Uitzonderlijk Werk",
    startStep5Text: "Je eerste paar projecten bepalen je reputatie op het platform. Communiceer regelmatig, haal deadlines, en overtreft verwachtingen. Vraag tevreden klanten om gedetailleerde 5-sterren recensies—deze zijn cruciaal voor het aantrekken van toekomstige werk.",
    whoUsesTitle: "Wie Gebruikt Upwork?",
    freelancersSection: "Freelancers (Aanbod Kant)",
    freelancersText: "Meer dan 18 miljoen geregistreerde freelancers wereldwijd, van beginners tot expert-niveau professionals. Populaire rollen: ontwikkelaars, designers, schrijvers, marketeers, virtuele assistenten, boekhouders, consultants. Variërend van bijwerkers tot fulltime freelancers die hun hele inkomen verdienen via Upwork.",
    clientsSection: "Klanten (Vraag Kant)",
    clientsText: "Meer dan 5 miljoen bedrijven wereldwijd, van startups en kleine bedrijven tot Fortune 500 bedrijven zoals Microsoft, Airbnb, en GE. Klanten gebruiken Upwork voor korte projecten, langetermijn contracten, en zelfs voor het aannemen van fulltime externe medewerkers.",
    isRightTitle: "Is Upwork Geschikt Voor Jou?",
    goodFitTitle: "Upwork Is Goed Als Je:",
    goodFitItems: [
      "Een verhandelbare vaardigheid hebt in een digitaal gebied (schrijven, ontwerpen, programmeren, marketing, etc.)",
      "Op zoek bent naar locatie-onafhankelijk werk—werk vanaf huis of overal ter wereld",
      "Wilt starten als freelancer zonder eigen klanten of netwerk",
      "Flexibiliteit waardeert—kies je eigen projecten, klanten, en werkuren",
      "Bereid bent om in het begin te investeren in het opbouwen van recensies en reputatie",
      "Comfortabel bent met competitieve biedingen en project verwerving"
    ],
    notGoodTitle: "Misschien Niet Goed Als Je:",
    notGoodItems: [
      "Direct hoogbetaald werk verwacht zonder bewezen track record op Upwork",
      "Niet comfortabel bent met platform commissies (variabel tot 15%)",
      "Voorkeurt om lokaal of persoonlijk te werken in plaats van online",
      "Beperkte tijd hebt voor voorstellen schrijven en bieden",
      "In een niche bent die lokale aanwezigheid vereist (bouw, fysieke diensten, etc.)",
      "Wilt alle commissies vermijden en direct met klanten werken"
    ],
    tipsTitle: "Pro Tips om Succesvol te Zijn op Upwork",
    tipsItems: [
      { title: "Specialiseer Je Niche", text: "Brede 'doe-het-allemaal' profielen presteren slechter. Specialiseer je in een specifieke vaardigheid of industrie om op te vallen." },
      { title: "Perfect Je Voorstellen", text: "Lees baanpostings zorgvuldig, pak specifieke pijnpunten aan, en leg uit hoe je probleem kunt oplossen—geen algemene templates." },
      { title: "Begin Competitief Geprijsd", text: "Voor je eerste 5-10 banen, prijs competitief om recensies te krijgen. Je kunt tarieven verhogen zodra je reputatie hebt." },
      { title: "Reageer Snel", text: "Klanten krijgen meldingen wanneer freelancers solliciteren—vroege sollicitanten krijgen vaak meer aandacht." },
      { title: "Zorg Voor Uitstekende Communicatie", text: "Snelle reacties, duidelijke updates, en professionalisme bouwen sterke klantrelaties op." },
      { title: "Vraag Om Recensies", text: "Na succesvolle projecten, herinner klanten beleefd om een recensie achter te laten—deze zijn cruciaal voor groei." }
    ],
    upworkVsTitle: "Upwork vs Alternatieven",
    upworkVsFiverr: "Upwork vs Fiverr:",
    upworkVsFiverrText: "Upwork: op project gebaseerd bieden waar freelancers solliciteren op banen. Fiverr: service-marktplaats waar freelancers vaste 'gigs' posten. Upwork beter voor complexe projecten en langetermijn werk; Fiverr voor snelle, vaste-prijs diensten.",
    upworkVsFreelancer: "Upwork vs Freelancer.com:",
    upworkVsFreelancerText: "Zeer vergelijkbaar in structuur, maar Upwork heeft meer hoogwaardige klanten, betere betalingsbescherming, en schoner platform. Freelancer.com heeft lagere tarieven maar meer lage-kwaliteit banen.",
    upworkVsToptal: "Upwork vs Toptal:",
    upworkVsToptalText: "Toptal is exclusief (accepteert slechts top 3%), richt zich op elite klanten, en biedt hogere tarieven (€90-180+/uur). Upwork is open voor alle vaardigheidsniveaus met betere toegankelijkheid maar meer concurrentie.",
    finalThoughtsTitle: "Laatste Gedachten",
    finalThoughtsText: "Upwork is 's werelds grootste en meest gevestigde freelance platform, en biedt enorme kansen voor professionals van alle vaardigheidsniveaus. Hoewel het zijn uitdagingen heeft—hoge commissies, concurrentie, moeilijke start—blijft het een van de beste plaatsen om een freelance carrière te lanceren of te groeien.",
    bestForText: "Het is vooral goed voor digitale professionals (ontwikkelaars, designers, schrijvers, marketeers) die op zoek zijn naar locatie-onafhankelijk werk, wereldwijde klanten, en veilige betalingsverwerking. Als je bereid bent te investeren in het opbouwen van je profiel en reputatie, kan Upwork een betrouwbare bron van inkomen worden.",
    bottomLineTitle: "Conclusie:",
    bottomLineText: "Als je een verhandelbare vaardigheid hebt en bereid bent de tijd te steken in het opbouwen van je aanwezigheid, is Upwork een uitstekend platform om te overwegen. Start vandaag gratis—de enige investering is je tijd en inspanning.",
    exploreMore: "Ontdek Meer",
    visitUpwork: "Bezoek Upwork →",
    visitUpworkText: "Begin je freelance reis op 's werelds grootste platform",
    compareAllPlatforms: "Vergelijk Alle Platforms →",
    compareAllPlatformsText: "Zie hoe Upwork presteert ten opzichte van 25+ andere freelance marktplaatsen",
    upworkGuide: "Upwork Complete Gids →",
    upworkGuideText: "Diepgaande gids voor het maximaliseren van je succes op Upwork",
    calculateYourRate: "Bereken Je Tarief →",
    calculateYourRateText: "Bepaal competitieve prijzen voor je freelance diensten",
    readyTitle: "Klaar om Te Beginnen met Freelancen?",
    readyText: "Vergelijk Upwork met 25+ andere platforms om de perfecte match te vinden voor je vaardigheden, ervaringsniveau, en carrièredoelen.",
    browseAllPlatforms: "Bekijk Alle Platforms",
    getWeeklyInsights: "Krijg Wekelijkse Inzichten"
  } : {
    badge: "Platform Guide",
    title: "What is Upwork? Complete Beginner's Guide",
    subtitle: "Upwork is the world's largest freelance platform connecting businesses with talented professionals worldwide. Learn how it works, what jobs are available, the fee structure, and whether it's right for you.",
    cta1: "Visit Upwork",
    cta2: "Compare Platforms",
    quickAnswerTitle: "Quick Answer: What is Upwork?",
    quickAnswer: "Upwork is an online marketplace where freelancers offer their services to businesses worldwide. Founded in May 2015 from the merger of Elance (1998) and oDesk (2003), the platform connects 18+ million freelancers with 796,000 active clients (and 5+ million total registered clients). Operating from San Francisco, Upwork generated $769.3 million in revenue in 2024 and serves 30% of Fortune 100 companies across 125+ job categories.",
    foundedYear: "Founded",
    activeFreelancers: "Active Freelancers",
    totalJobs: "Total Jobs Posted",
    howItWorksTitle: "How Does Upwork Work?",
    howItWorksIntro: "Upwork operates as an intermediary connecting freelancers and clients. Here's the basic process:",
    step1Title: "Create a Profile",
    step1Text: "Freelancers create a free profile showcasing their skills, work experience, portfolio, and hourly rate. This profile acts as your virtual resume and showroom for potential clients.",
    step2Title: "Search & Apply for Jobs",
    step2Text: "Browse thousands of available projects in your skill area. Submit proposals explaining your expertise, showing relevant experience, and bidding on the project. You need 'Connects' (credits) to apply for jobs—Upwork provides free connects monthly.",
    step3Title: "Get Hired & Work",
    step3Text: "Clients review proposals and invite their favorite candidates for interviews. After hiring, log work hours, communicate via Upwork's messaging, and work on the project. Use Upwork's timetracker for hourly work.",
    step4Title: "Get Paid",
    step4Text: "Upon completion, the client reviews your work and releases payment. Upwork processes all payments securely. Money becomes available in your Upwork account and can be withdrawn to your bank (withdrawal times vary by method).",
    forFreelancers: "For Freelancers",
    forClients: "For Clients",
    jobTypesTitle: "What Types of Work Can You Find on Upwork?",
    jobTypesIntro: "Upwork supports virtually every digital skill. The most popular categories include:",
    category1: "Web, Mobile & Software Development",
    category1Jobs: "Full-stack development, frontend/backend, mobile apps (iOS/Android), game development, blockchain, AI/machine learning, databases, WordPress, Shopify",
    category2: "Design & Creative",
    category2Jobs: "Graphic design, logo design, UX/UI design, illustration, video editing, animation, 3D modeling, product design, branding",
    category3: "Writing & Translation",
    category3Jobs: "Content writing, copywriting, technical writing, ghostwriting, proofreading, translation, transcription, SEO content",
    category4: "Marketing & Sales",
    category4Jobs: "Digital marketing, social media management, SEO, PPC advertising, email marketing, market research, sales development",
    category5: "Admin & Customer Service",
    category5Jobs: "Virtual assistant work, data entry, customer support, project management, transcription, research",
    category6: "Accounting & Finance",
    category6Jobs: "Bookkeeping, financial planning, tax preparation, business analysis, Excel/spreadsheet work",
    feeStructureTitle: "How Much Does Upwork Cost? (Fee Structure Explained)",
    freelancerFeesTitle: "Fees for Freelancers (Updated May 2025)",
    freelancerFeesIntro: "Upwork now uses a variable service fee ranging from 0% to 15% based on your activity and earnings:",
    feeFirst500: "Variable fee structure:",
    feeNext500: "Freelancer service fee:",
    feeAbove10k: "Based on performance:",
    feeExample: "Note: Fee Structure Changed in May 2025",
    feeExampleText: "Upwork now uses a variable 0-15% fee based on your activity. The old tiered system (shown below for reference) no longer applies:",
    feeCalc1: "OLD: First $500 × 20% =",
    feeCalc2: "OLD: Next $9,500 × 10% =",
    feeCalc3: "OLD: Last $2,000 × 5% =",
    feeTotalFee: "Total Upwork Fees:",
    feeYourEarnings: "Your Net Earnings:",
    additionalCostsTitle: "Additional Costs",
    costConnects: "Connects:",
    costConnectsText: "~$0.15 per connect (free 10-80/month); needed to apply for jobs",
    costMembership: "Freelancer Plus:",
    costMembershipText: "$49.99/month for extra connects, boosted visibility, exclusive search options",
    costWithdrawal: "Withdrawal Fees:",
    costWithdrawalText: "Free first withdrawal/month, then $1-$30 depending on method",
    clientCostsTitle: "Costs for Clients (Updated May 2025)",
    clientCostsText: "Clients pay a marketplace fee that ranges up to 7.99% on top of what they pay freelancers. The exact fee depends on their spending and account type. Payment protection is included for hourly contracts with Upwork's time tracking tool.",
    prosConsTitle: "Pros & Cons of Upwork",
    prosTitle: "Pros",
    prosItems: [
      { title: "Massive Marketplace", text: "Thousands of new jobs posted daily across virtually every category" },
      { title: "Secure Payments", text: "Upwork guarantees payment protection through escrow system" },
      { title: "Global Clients", text: "Work with businesses from around the world from your home office" },
      { title: "Flexible Work Structures", text: "Choose between hourly, fixed-price, short-term or long-term contracts" },
      { title: "Built-In Tools", text: "Time tracking, messaging, file sharing, video conferencing all integrated" },
      { title: "Payment Guarantee", text: "Payment is held in escrow before work begins for fixed-price projects" }
    ],
    consTitle: "Cons",
    consItems: [
      { title: "High Competition", text: "Millions of freelancers means competitive bidding, especially for beginners" },
      { title: "Variable Service Fees", text: "Up to 15% service fee can be high, especially for newer freelancers" },
      { title: "Connects Cost", text: "Applying to jobs costs connects (~$0.15 each), which adds up" },
      { title: "Difficult Start", text: "Newcomers without reviews struggle to land first jobs" },
      { title: "Low-Rate Competition", text: "Global marketplace means bidding against lower rates from developing countries" },
      { title: "Platform Dependency", text: "Your account can be suspended for policy violations, cutting off client access" }
    ],
    howToStartTitle: "How to Get Started on Upwork (5 Simple Steps)",
    startStep1Title: "Sign Up and Set Up Profile",
    startStep1Text: "Create a free account, fill in your professional information, upload a professional profile photo, write a compelling overview that emphasizes value, and list relevant skills. The more complete and professional your profile, the better.",
    startStep2Title: "Add Your Portfolio",
    startStep2Text: "Upload samples of your best work. If you're just starting, create sample projects or case studies. For writers: blog posts, articles. For designers: logo mockups, websites. For developers: GitHub repositories, demo apps.",
    startStep3Title: "Take Upwork Tests (Optional But Recommended)",
    startStep3Text: "Upwork offers free skill tests that appear as badges on your profile. Scoring well on relevant tests can boost your credibility, especially without work history.",
    startStep4Title: "Apply for Jobs",
    startStep4Text: "Start with smaller, less competitive projects to get your first reviews. Write personalized proposals addressing the client's needs (no generic copy-paste), show relevant experience, and offer competitive rates for first jobs. Expect 10-20+ proposals before landing your first client.",
    startStep5Title: "Deliver Exceptional Work",
    startStep5Text: "Your first few projects determine your reputation on the platform. Communicate regularly, meet deadlines, and exceed expectations. Ask satisfied clients for detailed 5-star reviews—these are critical for attracting future work.",
    whoUsesTitle: "Who Uses Upwork?",
    freelancersSection: "Freelancers (Supply Side)",
    freelancersText: "18+ million registered freelancers worldwide, ranging from beginners to expert-level professionals. Popular roles include: developers, designers, writers, marketers, virtual assistants, accountants, consultants. Ranging from side-hustlers to full-time freelancers earning their entire income through Upwork.",
    clientsSection: "Clients (Demand Side)",
    clientsText: "5+ million businesses worldwide, from startups and small businesses to Fortune 500 companies like Microsoft, Airbnb, and GE. Clients use Upwork for short-term projects, long-term contracts, and even hiring full-time remote employees.",
    isRightTitle: "Is Upwork Right for You?",
    goodFitTitle: "Upwork Is a Good Fit If You:",
    goodFitItems: [
      "Have a marketable skill in a digital field (writing, design, programming, marketing, etc.)",
      "Want location-independent work—work from home or anywhere in the world",
      "Need to start freelancing without existing clients or network",
      "Value flexibility—choose your own projects, clients, and work hours",
      "Are willing to invest time upfront building reviews and reputation",
      "Are comfortable with competitive bidding and project acquisition"
    ],
    notGoodTitle: "Maybe Not a Good Fit If You:",
    notGoodItems: [
      "Expect high-paying work immediately without proven track record on Upwork",
      "Are uncomfortable with platform fees (variable up to 15%)",
      "Prefer to work locally or in-person rather than online",
      "Have limited time for proposal writing and bidding",
      "Are in a niche requiring local presence (construction, physical services, etc.)",
      "Want to avoid all fees and work directly with clients"
    ],
    tipsTitle: "Pro Tips for Success on Upwork",
    tipsItems: [
      { title: "Specialize Your Niche", text: "Broad 'I do everything' profiles perform poorly. Specialize in a specific skill or industry to stand out." },
      { title: "Perfect Your Proposals", text: "Read job postings carefully, address specific pain points, and explain how you'll solve the problem—no generic templates." },
      { title: "Start Competitively Priced", text: "For your first 5-10 jobs, price competitively to build reviews. You can raise rates once you have reputation." },
      { title: "Respond Quickly", text: "Clients get notifications when freelancers apply—early applicants often get more attention." },
      { title: "Provide Excellent Communication", text: "Quick responses, clear updates, and professionalism build strong client relationships." },
      { title: "Ask for Reviews", text: "After successful projects, politely remind clients to leave a review—these are critical for growth." }
    ],
    upworkVsTitle: "Upwork vs Alternatives",
    upworkVsFiverr: "Upwork vs Fiverr:",
    upworkVsFiverrText: "Upwork: project-based bidding where freelancers apply to jobs. Fiverr: service marketplace where freelancers post fixed 'gigs'. Upwork better for complex projects and long-term work; Fiverr for quick, fixed-price services.",
    upworkVsFreelancer: "Upwork vs Freelancer.com:",
    upworkVsFreelancerText: "Very similar in structure, but Upwork has more high-quality clients, better payment protection, and cleaner platform. Freelancer.com has lower fees but more low-quality jobs.",
    upworkVsToptal: "Upwork vs Toptal:",
    upworkVsToptalText: "Toptal is exclusive (accepts only top 3%), focuses on elite clients, and offers higher rates ($100-200+/hr). Upwork is open to all skill levels with better accessibility but more competition.",
    finalThoughtsTitle: "Final Thoughts",
    finalThoughtsText: "Upwork is the world's largest and most established freelance platform, offering massive opportunities for professionals at all skill levels. While it has challenges—high fees, competition, difficult start—it remains one of the best places to launch or grow a freelance career.",
    bestForText: "It's especially good for digital professionals (developers, designers, writers, marketers) seeking location-independent work, global clients, and secure payment processing. If you're willing to invest in building your profile and reputation, Upwork can become a reliable source of income.",
    bottomLineTitle: "Bottom line:",
    bottomLineText: "If you have a marketable skill and are willing to put in the time building your presence, Upwork is an excellent platform to consider. Start today for free—the only investment is your time and effort.",
    exploreMore: "Explore More",
    visitUpwork: "Visit Upwork →",
    visitUpworkText: "Start your freelance journey on the world's largest platform",
    compareAllPlatforms: "Compare All Platforms →",
    compareAllPlatformsText: "See how Upwork compares to 25+ other freelance marketplaces",
    upworkGuide: "Upwork Complete Guide →",
    upworkGuideText: "In-depth guide to maximizing your success on Upwork",
    calculateYourRate: "Calculate Your Rate →",
    calculateYourRateText: "Determine competitive pricing for your freelance services",
    readyTitle: "Ready to Start Freelancing?",
    readyText: "Compare Upwork to 25+ other platforms to find the perfect fit for your skills, experience level, and career goals.",
    browseAllPlatforms: "Browse All Platforms",
    getWeeklyInsights: "Get Weekly Insights"
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": locale === 'nl' ? "Wat is Upwork? Complete Gids voor Beginners" : "What is Upwork? Complete Beginner's Guide to the World's Largest Freelance Platform",
    "description": locale === 'nl' ? "Uitgebreide gids over Upwork: hoe het werkt, welke banen beschikbaar zijn, tariefstructuur, en hoe te beginnen als freelancer." : "Comprehensive guide to Upwork: how it works, types of jobs available, fee structure, and how to get started as a freelancer.",
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
    "dateModified": "2025-11-25"
  };

  const currencySymbol = locale === 'nl' ? '€' : '$';
  const fee1 = locale === 'nl' ? '€100' : '$100';
  const fee2 = locale === 'nl' ? '€950' : '$950';
  const fee3 = locale === 'nl' ? '€100' : '$100';
  const totalFee = locale === 'nl' ? '€1.150' : '$1,150';
  const netEarnings = locale === 'nl' ? '€10.850' : '$10,850';
  const totalBilled = locale === 'nl' ? '€12.000' : '$12,000';

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
                <span className="text-2xl">🌍</span>
                <span className="text-sm font-heading font-semibold">{content.badge}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                {content.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {content.subtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://www.upwork.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-white font-heading font-semibold hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl"
                >
                  {content.cta1}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-gray-800 text-secondary dark:text-accent border-2 border-secondary dark:border-accent font-heading font-semibold hover:bg-secondary/5 dark:hover:bg-accent/10 transition-all"
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
              <div className="bg-gradient-to-br from-secondary/10 to-primary/10 dark:from-secondary/20 dark:to-primary/20 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-3xl">💡</span>
                  {content.quickAnswerTitle}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {content.quickAnswer}
                </p>
                <div className="grid sm:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">📅</div>
                    <div className="text-2xl font-heading font-bold text-secondary mb-1">May 2015</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{content.foundedYear}</div>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">👥</div>
                    <div className="text-2xl font-heading font-bold text-accent mb-1">18M+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{content.activeFreelancers}</div>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">💰</div>
                    <div className="text-2xl font-heading font-bold text-primary mb-1">$769M</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">2024 Revenue</div>
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

              {/* How It Works */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">⚙️</span>
                    {content.howItWorksTitle}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    {content.howItWorksIntro}
                  </p>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 border-l-4 border-primary">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-heading font-bold flex-shrink-0">1</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">{content.step1Title}</h3>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">
                            {content.step1Text}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6 border-l-4 border-accent">
                      <div className="flex items-start gap-4">
                        <div className="bg-accent text-white rounded-full w-10 h-10 flex items-center justify-center font-heading font-bold flex-shrink-0">2</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">{content.step2Title}</h3>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">
                            {content.step2Text}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 dark:from-secondary/10 dark:to-secondary/20 rounded-xl p-6 border-l-4 border-secondary">
                      <div className="flex items-start gap-4">
                        <div className="bg-secondary text-white rounded-full w-10 h-10 flex items-center justify-center font-heading font-bold flex-shrink-0">3</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">{content.step3Title}</h3>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">
                            {content.step3Text}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-xl p-6 border-l-4 border-primary">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-heading font-bold flex-shrink-0">4</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">{content.step4Title}</h3>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">
                            {content.step4Text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 grid sm:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-xl p-4 border border-secondary/20">
                      <div className="text-2xl mb-2">🎯</div>
                      <h4 className="font-heading font-bold text-gray-900 dark:text-white mb-1">{content.forFreelancers}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{locale === 'nl' ? 'Bied je diensten aan, vind klanten, en verdien geld' : 'Offer your services, find clients, and earn money'}</p>
                    </div>
                    <div className="bg-gradient-to-r from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-4 border border-accent/20">
                      <div className="text-2xl mb-2">💼</div>
                      <h4 className="font-heading font-bold text-gray-900 dark:text-white mb-1">{content.forClients}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{locale === 'nl' ? 'Post projecten, vind talent, en krijg werk gedaan' : 'Post projects, find talent, and get work done'}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Job Types */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">🎨</span>
                    {content.jobTypesTitle}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    {content.jobTypesIntro}
                  </p>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border-l-4 border-primary">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span>💻</span>
                        {content.category1}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {content.category1Jobs}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border-l-4 border-accent">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span>🎨</span>
                        {content.category2}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {content.category2Jobs}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-xl p-6 border-l-4 border-secondary">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span>✍️</span>
                        {content.category3}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {content.category3Jobs}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-primary/10 to-accent/5 dark:from-primary/20 dark:to-accent/10 rounded-xl p-6 border-l-4 border-primary">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span>📈</span>
                        {content.category4}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {content.category4Jobs}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-secondary/10 to-primary/5 dark:from-secondary/20 dark:to-primary/10 rounded-xl p-6 border-l-4 border-secondary">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span>📞</span>
                        {content.category5}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {content.category5Jobs}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-accent/10 to-secondary/5 dark:from-accent/20 dark:to-secondary/10 rounded-xl p-6 border-l-4 border-accent">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span>📊</span>
                        {content.category6}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {content.category6Jobs}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Fee Structure */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">💰</span>
                    {content.feeStructureTitle}
                  </h2>

                  <div className="mb-8">
                    <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <span>🎯</span>
                      {content.freelancerFeesTitle}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      {content.freelancerFeesIntro}
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{content.feeFirst500}</p>
                        <p className="text-3xl font-heading font-bold text-blue-600 dark:text-blue-400">0-15%</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{content.feeNext500}</p>
                        <p className="text-3xl font-heading font-bold text-purple-600 dark:text-purple-400">Variable</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{content.feeAbove10k}</p>
                        <p className="text-3xl font-heading font-bold text-green-600 dark:text-green-400">Activity</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border-l-4 border-accent">
                      <h4 className="font-heading font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span>💡</span>
                        {content.feeExample}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                        {content.feeExampleText}
                      </p>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 space-y-2 text-sm font-mono">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{content.feeCalc1}</span>
                          <span className="text-gray-900 dark:text-white font-bold">{fee1}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{content.feeCalc2}</span>
                          <span className="text-gray-900 dark:text-white font-bold">{fee2}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{content.feeCalc3}</span>
                          <span className="text-gray-900 dark:text-white font-bold">{fee3}</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">{content.feeTotalFee}</span>
                          <span className="text-red-600 dark:text-red-400 font-bold">{totalFee}</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2">
                          <span className="text-accent font-bold">{content.feeYourEarnings}</span>
                          <span className="text-accent font-bold text-lg">{netEarnings}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">{content.additionalCostsTitle}</h4>
                    <div className="space-y-3">
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <p className="font-semibold text-gray-900 dark:text-white mb-1">{content.costConnects}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{content.costConnectsText}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <p className="font-semibold text-gray-900 dark:text-white mb-1">{content.costMembership}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{content.costMembershipText}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <p className="font-semibold text-gray-900 dark:text-white mb-1">{content.costWithdrawal}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{content.costWithdrawalText}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border-l-4 border-primary">
                    <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">{content.clientCostsTitle}</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {content.clientCostsText}
                    </p>
                  </div>
                </div>
              </section>

              {/* Pros & Cons */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                    <span className="text-4xl">⚖️</span>
                    {content.prosConsTitle}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
                      <h3 className="text-2xl font-heading font-bold text-green-800 dark:text-green-300 mb-6 flex items-center gap-2">
                        <span>✅</span>
                        {content.prosTitle}
                      </h3>
                      <ul className="space-y-4">
                        {content.prosItems.map((pro, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-green-600 text-xl mt-1">→</span>
                            <div>
                              <strong className="text-gray-900 dark:text-white block mb-1">{pro.title}</strong>
                              <span className="text-sm text-gray-700 dark:text-gray-300">{pro.text}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-6 border-2 border-red-200 dark:border-red-800">
                      <h3 className="text-2xl font-heading font-bold text-red-800 dark:text-red-300 mb-6 flex items-center gap-2">
                        <span>❌</span>
                        {content.consTitle}
                      </h3>
                      <ul className="space-y-4">
                        {content.consItems.map((con, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-red-600 text-xl mt-1">→</span>
                            <div>
                              <strong className="text-gray-900 dark:text-white block mb-1">{con.title}</strong>
                              <span className="text-sm text-gray-700 dark:text-gray-300">{con.text}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* How to Get Started */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                    <span className="text-4xl">🚀</span>
                    {content.howToStartTitle}
                  </h2>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border-l-4 border-primary">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">1</span>
                        {content.startStep1Title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {content.startStep1Text}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border-l-4 border-accent">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">2</span>
                        {content.startStep2Title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {content.startStep2Text}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-xl p-6 border-l-4 border-secondary">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">3</span>
                        {content.startStep3Title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {content.startStep3Text}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-primary/10 to-accent/5 dark:from-primary/20 dark:to-accent/10 rounded-xl p-6 border-l-4 border-primary">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">4</span>
                        {content.startStep4Title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {content.startStep4Text}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-secondary/10 to-primary/5 dark:from-secondary/20 dark:to-primary/10 rounded-xl p-6 border-l-4 border-secondary">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">5</span>
                        {content.startStep5Title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {content.startStep5Text}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Who Uses Upwork */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                    <span className="text-4xl">👥</span>
                    {content.whoUsesTitle}
                  </h2>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-xl p-6 border-l-4 border-secondary">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span>🎯</span>
                        {content.freelancersSection}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {content.freelancersText}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border-l-4 border-accent">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span>💼</span>
                        {content.clientsSection}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {content.clientsText}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Is Right For You */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                    <span className="text-4xl">🤔</span>
                    {content.isRightTitle}
                  </h2>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border-l-4 border-green-500">
                      <h3 className="text-xl font-heading font-bold text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
                        <span>✅</span>
                        {content.goodFitTitle}
                      </h3>
                      <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        {content.goodFitItems.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">→</span>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-6 border-l-4 border-red-500">
                      <h3 className="text-xl font-heading font-bold text-red-800 dark:text-red-300 mb-4 flex items-center gap-2">
                        <span>❌</span>
                        {content.notGoodTitle}
                      </h3>
                      <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        {content.notGoodItems.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-red-600 mt-1">→</span>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Pro Tips */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                    <span className="text-4xl">💡</span>
                    {content.tipsTitle}
                  </h2>

                  <div className="space-y-4">
                    {content.tipsItems.map((tip, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border-l-4 border-primary">
                        <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2">
                          {tip.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          {tip.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Upwork vs Alternatives */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                    <span className="text-4xl">⚡</span>
                    {content.upworkVsTitle}
                  </h2>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-xl p-6">
                      <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2">
                        {content.upworkVsFiverr}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {content.upworkVsFiverrText}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6">
                      <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2">
                        {content.upworkVsFreelancer}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {content.upworkVsFreelancerText}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6">
                      <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2">
                        {content.upworkVsToptal}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {content.upworkVsToptalText}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Final Thoughts */}
              <section className="mb-16">
                <div className="bg-gradient-to-br from-secondary/10 via-primary/10 to-accent/10 dark:from-secondary/20 dark:via-primary/20 dark:to-accent/20 rounded-2xl shadow-lg p-8 border-2 border-secondary/30 dark:border-secondary/50">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">📜</span>
                    {content.finalThoughtsTitle}
                  </h2>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <p className="text-lg">
                      {content.finalThoughtsText}
                    </p>
                    <p className="text-lg">
                      {content.bestForText}
                    </p>
                    <p className="text-lg">
                      <strong className="text-gray-900 dark:text-white">{content.bottomLineTitle}</strong> {content.bottomLineText}
                    </p>
                  </div>
                </div>
              </section>

              {/* Internal Links */}
              <section className="mb-16">
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6">{content.exploreMore}</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <a href="https://www.upwork.com" target="_blank" rel="noopener noreferrer" className="group bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-xl p-6 hover:shadow-lg transition-all border border-secondary/20">
                    <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-secondary transition-colors">
                      {content.visitUpwork}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {content.visitUpworkText}
                    </p>
                  </a>
                  <Link href={`/${locale}/platforms`} className="group bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 hover:shadow-lg transition-all border border-accent/20">
                    <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
                      {content.compareAllPlatforms}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {content.compareAllPlatformsText}
                    </p>
                  </Link>
                  <Link href={`/${locale}/resources/upwork-complete-guide`} className="group bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 hover:shadow-lg transition-all border border-primary/20">
                    <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                      {content.upworkGuide}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {content.upworkGuideText}
                    </p>
                  </Link>
                  <Link href={`/${locale}/tools/rate-calculator`} className="group bg-gradient-to-br from-secondary/10 to-accent/10 dark:from-secondary/20 dark:to-accent/20 rounded-xl p-6 hover:shadow-lg transition-all border border-secondary/20">
                    <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-secondary transition-colors">
                      {content.calculateYourRate}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {content.calculateYourRateText}
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
                {content.readyTitle}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                {content.readyText}
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
