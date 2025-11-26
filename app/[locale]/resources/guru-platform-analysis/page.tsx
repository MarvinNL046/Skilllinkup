import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const slug = 'guru-platform-analysis';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

  if (locale === "nl") {
    return {
      title: "Guru Platform Analyse 2025: Prijzen, Features & Ideale Gebruikers",
      description: "Complete Guru.com analyse met SafePay escrow, WorkRooms samenwerking, prijsstructuur, en voor welke freelancers dit professionele platform het meest geschikt is.",
      openGraph: {
        title: "Guru Platform Analyse 2025: Prijzen, Features & Ideale Gebruikers",
        description: "Complete Guru.com analyse met SafePay escrow, WorkRooms samenwerking, prijsstructuur, en voor welke freelancers dit professionele platform het meest geschikt is.",
        url: pageUrl,
        siteName: 'SkillLinkup',
        images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Guru Platform Analyse 2025' }],
        locale: 'nl_NL',
        type: "article",
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Guru Platform Analyse 2025',
        description: 'Complete Guru.com analyse met SafePay escrow, WorkRooms en prijsstructuur.',
        images: [`${siteUrl}/images/og/resources-og.png`],
        creator: '@SkillLinkup',
        site: '@SkillLinkup',
      },
      alternates: {
        canonical: pageUrl,
        languages: { 'en': `${siteUrl}/en/resources/${slug}`, 'nl': `${siteUrl}/nl/resources/${slug}` },
      },
      robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
      },
      keywords: ["Guru platform review", "Guru freelance Nederland", "Guru platform analyse", "SafePay escrow", "WorkRooms", "Guru prijzen", "freelance platform", "professioneel platform"],
    };
  }

  return {
    title: "Guru Platform Analysis 2025: Pricing, Features & Ideal Users",
    description: "Complete Guru.com analysis covering SafePay escrow, WorkRooms collaboration, pricing tiers, and which freelancers benefit most from this professional platform.",
    openGraph: {
      title: "Guru Platform Analysis 2025: Pricing, Features & Ideal Users",
      description: "Complete Guru.com analysis covering SafePay escrow, WorkRooms collaboration, pricing tiers, and which freelancers benefit most from this professional platform.",
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Guru Platform Analysis 2025' }],
      locale: 'en_US',
      type: "article",
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Guru Platform Analysis 2025',
      description: 'Complete Guru.com analysis covering SafePay escrow, WorkRooms and pricing tiers.',
      images: [`${siteUrl}/images/og/resources-og.png`],
      creator: '@SkillLinkup',
      site: '@SkillLinkup',
    },
    alternates: {
      canonical: pageUrl,
      languages: { 'en': `${siteUrl}/en/resources/${slug}`, 'nl': `${siteUrl}/nl/resources/${slug}` },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    keywords: ["Guru platform review", "Guru freelance", "Guru platform analysis", "SafePay escrow", "WorkRooms", "Guru pricing", "freelance platform", "professional platform"],
  };
}

export default async function GuruPlatformAnalysisPage({ params }: Props) {
  const { locale } = await params;

  const content = locale === "nl" ? {
    hero: {
      badge: "Platform Analyse",
      title: "Guru Platform Analyse: Prijzen, Features & Ideale Gebruikers",
      description: "Ontdek waarom Guru.com professionele freelancers aantrekt die op zoek zijn naar langetermijnklanten. Verken SafePay bescherming, WorkRooms samenwerkingstools, transparante prijzen, en of Guru het juiste platform is voor jouw freelance bedrijf.",
      cta1: "Vergelijk Alle Platforms",
      cta2: "Lees Reviews"
    },
    stats: {
      freelancers: "Actieve Freelancers",
      employers: "Actieve Opdrachtgevers",
      revenue: "Jaarlijkse Omzet",
      rating: "Gem. Gebruikerswaardering"
    },
    overview: {
      title: "Wat is Guru.com?",
      intro: "Guru is opgericht in 1998 en is een van de oudste en meest gevestigde freelance marktplaatsen. Het platform positioneert zich als een professionele omgeving voor langetermijnklantrelaties. In tegenstelling tot platforms die zich richten op snelle klussen of hoogvolume biedingen, legt Guru de nadruk op kwaliteit boven kwantiteit met features die zijn ontworpen voor voortdurende samenwerking en transparant projectmanagement.",
      philosophy: {
        title: "Guru's Kernfilosofie",
        description: "Guru richt zich op ervaren freelancers die op zoek zijn naar serieuze, professionele klanten die bereid zijn eerlijke tarieven te betalen voor kwaliteitswerk. Het platform geeft prioriteit aan vertrouwen, transparantie en langetermijnpartnerschappen in plaats van prijsconcurrentie.",
        features: [
          { label: "SafePay Escrow:", text: "Toonaangevende betalingsbescherming voor beide partijen" },
          { label: "WorkRooms:", text: "Toegewijde samenwerkingsruimtes voor elk project" },
          { label: "Dagelijkse Betaling:", text: "Word binnen 24 uur betaald na voltooiing van taken" },
          { label: "Geen Commissie Verhogingen:", text: "Transparante, vaste tarieven die niet stijgen" }
        ]
      },
      services: {
        title: "Populaire Services",
        items: [
          "Programmeren & Ontwikkeling",
          "Design & Creatief",
          "Schrijven & Vertalen",
          "Administratie & Virtuele Assistentie",
          "Verkoop & Marketing",
          "Bedrijfsadvies"
        ]
      },
      bestFor: {
        title: "Meest Geschikt Voor",
        items: [
          "Ervaren professionals (3+ jaar)",
          "Freelancers op zoek naar langetermijnklanten",
          "Kwaliteitsgerichte dienstverleners",
          "Wie betalingszekerheid waardeert",
          "Samenwerkende projectmanagers",
          "Voornamelijk VS-gebaseerde freelancers"
        ]
      }
    },
    safepay: {
      title: "SafePay: Toonaangevende Betalingsbescherming",
      intro: "SafePay is Guru's eigen escrow systeem dat zowel freelancers als klanten beschermt. Het is flexibeler en transparanter dan de betalingssystemen van concurrerende platforms, en biedt meerdere vrijgaveopties en mogelijkheden voor betaling op dezelfde dag.",
      howItWorks: {
        title: "Hoe SafePay Werkt",
        steps: [
          { label: "Klant Stort in Escrow:", text: "Voordat het werk begint, stort de klant het overeengekomen bedrag op de SafePay rekening" },
          { label: "Je Voltooit het Werk:", text: "Lever volgens de overeengekomen specificaties en tijdlijn" },
          { label: "Vraag Betaling Aan:", text: "Dien factuur in of vraag mijlpaalvrijgave aan via WorkRoom" },
          { label: "Snelle Vrijgave:", text: "Klant keurt goed en bedrag wordt binnen 24 uur vrijgegeven naar jouw rekening" },
          { label: "Auto-Vrijgave:", text: "Als klant niet reageert binnen 7 dagen, wordt betaling automatisch vrijgegeven" }
        ]
      },
      advantages: {
        title: "SafePay Voordelen",
        items: [
          "7-daagse auto-vrijgave (vs 14+ dagen bij concurrenten)",
          "Betaling op dezelfde dag mogelijk",
          "Flexibele mijlpaalstructuren",
          "Transparante geschillenbeslechting",
          "Geen betalingsblokkades voor gevestigde freelancers"
        ]
      },
      bestPractices: {
        title: "SafePay Best Practices",
        items: [
          "Gebruik altijd SafePay voor alle transacties",
          "Definieer duidelijke mijlpalen voordat je begint",
          "Documenteer alle deliverables in WorkRoom",
          "Vraag betaling onmiddellijk aan na levering",
          "Gebruik terugkerende SafePay voor doorlopende contracten"
        ]
      }
    },
    workrooms: {
      title: "WorkRooms: Gecentraliseerd Projectmanagement",
      intro: "Elk project op Guru krijgt een toegewijde WorkRoom—een gecentraliseerde werkruimte met alle communicatie, bestanden, overeenkomsten, facturen en betalingen. Dit elimineert verspreide e-mails en biedt een permanent overzicht van de projectgeschiedenis.",
      components: {
        title: "WorkRoom Componenten",
        items: [
          { title: "Berichten", text: "Threaded gesprekken met bestandsbijlagen, houdt alle projectcommunicatie georganiseerd" },
          { title: "Bestanden", text: "Gedeelde bestandsrepository met versiebeheer en onbeperkte opslag" },
          { title: "Overeenkomsten", text: "Formele werkovereenkomsten met scope, mijlpalen en gedocumenteerde voorwaarden" },
          { title: "Tijdregistratie", text: "Ingebouwde timer voor uurtariefprojecten met gedetailleerde activiteitenlogboeken" },
          { title: "Facturen", text: "Professionele factuurgeneratie met automatische betalingstracking" },
          { title: "Rapporten", text: "Projectanalyses, tijdrapporten en betalingsgeschiedenis" }
        ]
      },
      whyMatters: {
        title: "Waarom WorkRooms Belangrijk Zijn",
        description: "WorkRooms elimineren de chaos van projectmanagement via e-mail, Slack, Google Drive en aparte facturatietools. Alles staat op één plek, wat transparantie creëert en miscommunicatie vermindert—vooral waardevol voor langetermijnklantrelaties.",
        benefits: [
          "Klanten zien je als professioneler en georganiseerder",
          "Vermindert heen-en-weer en vermiste bestanden",
          "Biedt gedocumenteerd overzicht voor geschillenbeslechting",
          "Maakt factureren en betalingstracking naadloos"
        ]
      }
    },
    ctaMid: {
      title: "Vergelijk Guru met Andere Professionele Platforms",
      description: "Bekijk gedetailleerde vergelijkingen van features, prijzen en gebruikerservaringen over alle grote freelance marktplaatsen.",
      cta: "Verken Alle Platforms"
    },
    pricing: {
      title: "Transparante Prijzen & Lidmaatschapsniveaus",
      intro: "Guru biedt eenvoudige, transparante prijzen met vaste commissies en optionele lidmaatschapsupgrades voor verbeterde features. Geen verborgen kosten of stijgende commissiestructuren.",
      tiers: [
        {
          name: "Basic (Gratis)",
          price: "€0/mnd",
          features: [
            { included: true, text: "8,95% servicekosten op inkomsten" },
            { included: true, text: "10 biedingen per maand" },
            { included: true, text: "Basis profielzichtbaarheid" },
            { included: true, text: "SafePay bescherming inbegrepen" },
            { included: false, text: "Geen uitgelichte profielboost" }
          ],
          bestFor: "Het platform testen, incidentele freelancers"
        },
        {
          name: "Professional",
          price: "€15,95/mnd",
          features: [
            { included: true, text: "7,95% servicekosten (1% besparing)" },
            { included: true, text: "40 biedingen per maand" },
            { included: true, text: "Verbeterde profielzichtbaarheid" },
            { included: true, text: "Uitgelicht in zoekresultaten" },
            { included: true, text: "Prioriteit klantenservice" }
          ],
          bestFor: "Actieve freelancers, groeiende portfolio's"
        },
        {
          name: "Business",
          price: "€39,95/mnd",
          badge: "MEEST POPULAIR",
          features: [
            { included: true, text: "5,95% servicekosten (3% besparing)" },
            { included: true, text: "150 biedingen per maand" },
            { included: true, text: "Premium profielbadge" },
            { included: true, text: "Top zoekrangschikking prioriteit" },
            { included: true, text: "Toegewijde accountmanager" },
            { included: true, text: "Geavanceerde analyses" }
          ],
          bestFor: "Fulltime freelancers, serieuze professionals"
        }
      ],
      roi: {
        title: "Lidmaatschap ROI Berekening",
        description: "De Business tier (€39,95/mnd) verdient zichzelf snel terug door lagere kosten en verhoogde zichtbaarheid:",
        calculation: {
          target: "€5.000",
          basicFee: "-€447,50",
          businessFee: "-€297,50",
          membership: "-€39,95",
          savings: "+€110,05"
        },
        labels: {
          target: "Maandelijks inkomensdoel:",
          basicFee: "Basic kosten (8,95%):",
          businessFee: "Business kosten (5,95%):",
          membership: "Lidmaatschapskosten:",
          savings: "Maandelijkse besparing:"
        },
        note: "*Plus verhoogde zichtbaarheid leidt doorgaans tot 20-30% meer projectuitnodigingen"
      }
    },
    idealUsers: {
      title: "Wie Zou Guru Moeten Gebruiken?",
      perfect: {
        title: "Perfect Voor Deze Freelancers",
        items: [
          {
            label: "Ervaren Professionals (3+ jaar):",
            text: "Guru's klantbestand verwacht kwaliteit en professionaliteit, waardoor het ideaal is voor gevestigde freelancers"
          },
          {
            label: "Langetermijnrelatie Zoekers:",
            text: "WorkRooms en SafePay faciliteren voortdurende partnerschappen beter dan snelle-klus platforms"
          },
          {
            label: "Betalingszekerheid Gefocust:",
            text: "SafePay's 7-daagse auto-vrijgave en optie voor dezelfde dag bieden uitstekende cashflow bescherming"
          },
          {
            label: "Noord-Amerikaanse Freelancers:",
            text: "Meerderheid van klanten zijn VS-gebaseerde bedrijven bereid concurrerende tarieven te betalen"
          },
          {
            label: "Kwaliteit-boven-Volume Werkers:",
            text: "Lager projectvolume maar hogere gemiddelde projectwaarden en langere duur"
          }
        ]
      },
      alternatives: {
        title: "Overweeg Alternatieven Als",
        items: [
          {
            label: "Je een complete beginner bent:",
            text: "Begin met Fiverr of Upwork om eerst portfolio en reviews op te bouwen"
          },
          {
            label: "Je de voorkeur geeft aan hoogvolume snelle klussen:",
            text: "Guru richt zich op substantiële projecten vs. micro-taken"
          },
          {
            label: "Je internationale klanten target:",
            text: "Guru heeft kleinere mondiale voetafdruk dan Upwork of Freelancer.com"
          },
          {
            label: "Je nul platformkosten wilt:",
            text: "Overweeg je eigen klantenbestand op te bouwen of verwijzingsnetwerken te gebruiken"
          }
        ]
      }
    },
    proscons: {
      title: "Uitgebreide Voor- & Nadelen",
      pros: {
        title: "Sterke Punten",
        items: [
          { label: "Superieure Betalingsbescherming:", text: "7-daagse auto-vrijgave en betaling op dezelfde dag opties" },
          { label: "Transparante Prijzen:", text: "Vaste 5,95-8,95% kosten zonder verborgen kosten of verhogingen" },
          { label: "Professioneel Klantenbestand:", text: "Kwaliteitsgerichte klanten bereid concurrerende tarieven te betalen" },
          { label: "WorkRooms Excellentie:", text: "Best-in-class projectmanagement en samenwerkingstools" },
          { label: "Langetermijn Focus:", text: "Platform moedigt doorlopende klantrelaties en retainers aan" },
          { label: "Lagere Concurrentie:", text: "Kleinere gebruikersgroep betekent minder biedingsconcurrentie op projecten" },
          { label: "Professionele Reputatie:", text: "20+ jaar geschiedenis bouwt vertrouwen op met enterprise klanten" }
        ]
      },
      cons: {
        title: "Zwakke Punten",
        items: [
          { label: "Kleiner Projectvolume:", text: "Minder vacatures vergeleken met Upwork of Freelancer.com" },
          { label: "Beperkt Internationaal Bereik:", text: "Voornamelijk VS-centrisch, minder mondiale diversiteit" },
          { label: "Hogere Toegangsdrempel:", text: "Professionele klanten verwachten bewezen ervaring en portfolio's" },
          { label: "Maandelijkse Biedingslimieten:", text: "Zelfs Business tier beperkt tot 150 biedingen/maand" },
          { label: "Langzamere Opstartfase:", text: "Reputatie opbouwen duurt langer met minder beschikbare projecten" },
          { label: "Geen Contest Model:", text: "Alleen traditioneel bieden—geen crowdsourcing wedstrijden zoals Freelancer.com" }
        ]
      }
    },
    verdict: {
      title: "Definitieve Aanbeveling",
      experienced: "Voor ervaren professionals die kwaliteitsklanten zoeken: Guru is een uitstekende keuze. De SafePay bescherming, WorkRooms samenwerking en transparante prijzen creëren een professionele omgeving voor langetermijn freelance succes. Als je betalingszekerheid waardeert en de voorkeur geeft aan werken met serieuze klanten boven hoogvolume snelle klussen, zou Guru in je platform mix moeten zitten.",
      beginners: "Voor beginners of internationale freelancers: Begin ergens anders. Guru's kleinere projectvolume en professionele klantverwachtingen maken het uitdagend voor nieuwkomers. Bouw je portfolio op via Fiverr, Upwork of Freelancer.com eerst, en stap dan over naar Guru zodra je bewezen ervaring hebt en kunt concurreren voor hogere-waarde projecten.",
      strategic: "Strategische aanpak: Gebruik Guru naast andere platforms—niet als je enige bron. Besteed de 150 maandelijkse biedingen van de Business tier aan hoogwaardige kansen terwijl je aanvult met andere marktplaatsen. Guru blinkt uit in het veiligstellen van kwaliteit retainerklanten, waardoor het de maandelijkse investering waard is voor gevestigde freelancers die €3.000+/maand verdienen.",
      rating: "Uitstekend voor ervaren professionals, minder ideaal voor beginners"
    },
    explore: {
      title: "Blijf Verkennen",
      links: [
        { href: "/platforms", title: "Vergelijk Alle Platforms →", description: "Bekijk hoe Guru zich verhoudt tot 25+ andere freelance marktplaatsen" },
        { href: "/reviews", title: "Lees Platform Reviews →", description: "Echte freelancer ervaringen van alle grote platforms" },
        { href: "/tools/rate-calculator", title: "Bereken Je Tarief →", description: "Bepaal concurrerende prijzen rekening houdend met platformkosten" },
        { href: "/comparisons", title: "Gedetailleerde Vergelijkingen →", description: "Guru vs Upwork, Fiverr, Toptal, en meer" }
      ]
    },
    finalCta: {
      title: "Vind Jouw Perfecte Freelance Platform",
      description: "Vergelijk Guru met 25+ andere platforms om de beste match te vinden voor jouw ervaringsniveau, vaardigheden en inkomensdoelen.",
      cta1: "Bekijk Alle Platforms",
      cta2: "Ontvang Wekelijkse Inzichten"
    }
  } : {
    hero: {
      badge: "Platform Analysis",
      title: "Guru Platform Analysis: Pricing, Features & Ideal Users",
      description: "Discover why Guru.com attracts professional freelancers seeking long-term clients. Explore SafePay protection, WorkRooms collaboration tools, transparent pricing, and whether Guru is the right platform for your freelance business.",
      cta1: "Compare All Platforms",
      cta2: "Read Reviews"
    },
    stats: {
      freelancers: "Active Freelancers",
      employers: "Active Employers",
      revenue: "Annual Revenue",
      rating: "Avg User Rating"
    },
    overview: {
      title: "What is Guru.com?",
      intro: "Founded in 1998, Guru is one of the oldest and most established freelance marketplaces, positioning itself as a professional platform for long-term client relationships. Unlike platforms focused on quick gigs or high-volume bidding, Guru emphasizes quality over quantity with features designed for ongoing collaboration and transparent project management.",
      philosophy: {
        title: "Guru's Core Philosophy",
        description: "Guru caters to experienced freelancers seeking serious, professional clients willing to pay fair rates for quality work. The platform prioritizes trust, transparency, and long-term partnerships over race-to-the-bottom pricing.",
        features: [
          { label: "SafePay Escrow:", text: "Industry-leading payment protection for both parties" },
          { label: "WorkRooms:", text: "Dedicated collaboration spaces for each project" },
          { label: "Daily Pay:", text: "Get paid as quickly as 24 hours after completing tasks" },
          { label: "No Commission Increases:", text: "Transparent, flat-rate fees that don't escalate" }
        ]
      },
      services: {
        title: "Popular Services",
        items: [
          "Programming & Development",
          "Design & Creative",
          "Writing & Translation",
          "Administrative & Virtual Assistance",
          "Sales & Marketing",
          "Business Consulting"
        ]
      },
      bestFor: {
        title: "Best Suited For",
        items: [
          "Experienced professionals (3+ years)",
          "Freelancers seeking long-term clients",
          "Quality-focused service providers",
          "Those valuing payment security",
          "Collaborative project managers",
          "US-based freelancers primarily"
        ]
      }
    },
    safepay: {
      title: "SafePay: Industry-Leading Payment Protection",
      intro: "SafePay is Guru's proprietary escrow system that protects both freelancers and clients. It's more flexible and transparent than competing platforms' payment systems, offering multiple release options and same-day payment capabilities.",
      howItWorks: {
        title: "How SafePay Works",
        steps: [
          { label: "Client Funds Escrow:", text: "Before work begins, client deposits agreed amount into SafePay account" },
          { label: "You Complete Work:", text: "Deliver according to agreed specifications and timeline" },
          { label: "Request Payment:", text: "Submit invoice or request milestone release through WorkRoom" },
          { label: "Fast Release:", text: "Client approves and funds release within 24 hours to your account" },
          { label: "Auto-Release:", text: "If client doesn't respond in 7 days, payment automatically releases to you" }
        ]
      },
      advantages: {
        title: "SafePay Advantages",
        items: [
          "7-day auto-release (vs 14+ days on competitors)",
          "Same-day payment option available",
          "Flexible milestone structures",
          "Transparent dispute resolution",
          "No payment holds for established freelancers"
        ]
      },
      bestPractices: {
        title: "SafePay Best Practices",
        items: [
          "Always use SafePay for all transactions",
          "Define clear milestones before starting",
          "Document all deliverables in WorkRoom",
          "Request payment immediately after delivery",
          "Use recurring SafePay for ongoing contracts"
        ]
      }
    },
    workrooms: {
      title: "WorkRooms: Centralized Project Management",
      intro: "Each project on Guru gets a dedicated WorkRoom—a centralized workspace containing all communication, files, agreements, invoices, and payments. This eliminates scattered emails and provides a permanent record of project history.",
      components: {
        title: "WorkRoom Components",
        items: [
          { title: "Messages", text: "Threaded conversations with file attachments, keeping all project communication organized" },
          { title: "Files", text: "Shared file repository with version control and unlimited storage" },
          { title: "Agreements", text: "Formal work agreements with scope, milestones, and terms documented" },
          { title: "Time Tracking", text: "Built-in timer for hourly projects with detailed activity logs" },
          { title: "Invoices", text: "Professional invoice generation with automatic payment tracking" },
          { title: "Reports", text: "Project analytics, time reports, and payment histories" }
        ]
      },
      whyMatters: {
        title: "Why WorkRooms Matter",
        description: "WorkRooms eliminate the chaos of managing projects across email, Slack, Google Drive, and separate invoicing tools. Everything lives in one place, creating transparency and reducing miscommunication—especially valuable for long-term client relationships.",
        benefits: [
          "Clients see you as more professional and organized",
          "Reduces back-and-forth and missing files",
          "Provides documented record for dispute resolution",
          "Makes invoicing and payment tracking seamless"
        ]
      }
    },
    ctaMid: {
      title: "Compare Guru with Other Professional Platforms",
      description: "See detailed comparisons of features, pricing, and user experiences across all major freelance marketplaces.",
      cta: "Explore All Platforms"
    },
    pricing: {
      title: "Transparent Pricing & Membership Tiers",
      intro: "Guru offers simple, transparent pricing with flat-rate commissions and optional membership upgrades for enhanced features. No hidden fees or escalating commission structures.",
      tiers: [
        {
          name: "Basic (Free)",
          price: "$0/mo",
          features: [
            { included: true, text: "8.95% service fee on earnings" },
            { included: true, text: "10 bids per month" },
            { included: true, text: "Basic profile visibility" },
            { included: true, text: "SafePay protection included" },
            { included: false, text: "No featured profile boost" }
          ],
          bestFor: "Testing the platform, occasional freelancers"
        },
        {
          name: "Professional",
          price: "$15.95/mo",
          features: [
            { included: true, text: "7.95% service fee (1% savings)" },
            { included: true, text: "40 bids per month" },
            { included: true, text: "Enhanced profile visibility" },
            { included: true, text: "Featured in search results" },
            { included: true, text: "Priority customer support" }
          ],
          bestFor: "Active freelancers, growing portfolios"
        },
        {
          name: "Business",
          price: "$39.95/mo",
          badge: "MOST POPULAR",
          features: [
            { included: true, text: "5.95% service fee (3% savings)" },
            { included: true, text: "150 bids per month" },
            { included: true, text: "Premium profile badge" },
            { included: true, text: "Top search ranking priority" },
            { included: true, text: "Dedicated account manager" },
            { included: true, text: "Advanced analytics" }
          ],
          bestFor: "Full-time freelancers, serious professionals"
        }
      ],
      roi: {
        title: "Membership ROI Calculation",
        description: "The Business tier ($39.95/mo) pays for itself quickly through reduced fees and increased visibility:",
        calculation: {
          target: "$5,000",
          basicFee: "-$447.50",
          businessFee: "-$297.50",
          membership: "-$39.95",
          savings: "+$110.05"
        },
        labels: {
          target: "Monthly earnings target:",
          basicFee: "Basic fee (8.95%):",
          businessFee: "Business fee (5.95%):",
          membership: "Membership cost:",
          savings: "Monthly savings:"
        },
        note: "*Plus increased visibility typically leads to 20-30% more project invitations"
      }
    },
    idealUsers: {
      title: "Who Should Use Guru?",
      perfect: {
        title: "Perfect For These Freelancers",
        items: [
          {
            label: "Experienced Professionals (3+ years):",
            text: "Guru's client base expects quality and professionalism, making it ideal for established freelancers"
          },
          {
            label: "Long-Term Relationship Seekers:",
            text: "WorkRooms and SafePay facilitate ongoing partnerships better than quick-gig platforms"
          },
          {
            label: "Payment Security Focused:",
            text: "SafePay's 7-day auto-release and same-day option provide excellent cash flow protection"
          },
          {
            label: "North American Freelancers:",
            text: "Majority of clients are US-based businesses willing to pay competitive rates"
          },
          {
            label: "Quality-over-Volume Workers:",
            text: "Lower project volume but higher average project values and longer durations"
          }
        ]
      },
      alternatives: {
        title: "Consider Alternatives If",
        items: [
          {
            label: "You're a complete beginner:",
            text: "Start with Fiverr or Upwork to build portfolio and reviews first"
          },
          {
            label: "You prefer high-volume quick gigs:",
            text: "Guru focuses on substantial projects vs. micro-tasks"
          },
          {
            label: "You're targeting international clients:",
            text: "Guru has smaller global footprint than Upwork or Freelancer.com"
          },
          {
            label: "You want zero platform fees:",
            text: "Consider building your own client base or using referral networks"
          }
        ]
      }
    },
    proscons: {
      title: "Comprehensive Pros & Cons",
      pros: {
        title: "Strengths",
        items: [
          { label: "Superior Payment Protection:", text: "7-day auto-release and same-day payment options" },
          { label: "Transparent Pricing:", text: "Flat 5.95-8.95% fee with no hidden costs or increases" },
          { label: "Professional Client Base:", text: "Quality-focused clients willing to pay competitive rates" },
          { label: "WorkRooms Excellence:", text: "Best-in-class project management and collaboration tools" },
          { label: "Long-Term Focus:", text: "Platform encourages ongoing client relationships and retainers" },
          { label: "Lower Competition:", text: "Smaller user base means less bidding competition on projects" },
          { label: "Professional Reputation:", text: "20+ year history builds trust with enterprise clients" }
        ]
      },
      cons: {
        title: "Weaknesses",
        items: [
          { label: "Smaller Project Volume:", text: "Fewer job postings compared to Upwork or Freelancer.com" },
          { label: "Limited International Reach:", text: "Primarily US-centric, less global diversity" },
          { label: "Higher Entry Barrier:", text: "Professional clients expect proven experience and portfolios" },
          { label: "Monthly Bid Limits:", text: "Even Business tier caps at 150 bids/month" },
          { label: "Slower Ramp-Up:", text: "Building reputation takes longer with fewer projects available" },
          { label: "No Contest Model:", text: "Traditional bidding only—no crowdsourcing competitions like Freelancer.com" }
        ]
      }
    },
    verdict: {
      title: "Final Recommendation",
      experienced: "For experienced professionals seeking quality clients: Guru is an excellent choice. The SafePay protection, WorkRooms collaboration, and transparent pricing create a professional environment for long-term freelance success. If you value payment security and prefer working with serious clients over high-volume quick gigs, Guru should be in your platform mix.",
      beginners: "For beginners or international freelancers: Start elsewhere. Guru's smaller project volume and professional client expectations make it challenging for newcomers. Build your portfolio on Fiverr, Upwork, or Freelancer.com first, then transition to Guru once you have proven experience and can compete for higher-value projects.",
      strategic: "Strategic approach: Use Guru alongside other platforms—not as your only source. Dedicate the Business tier's 150 monthly bids to high-value opportunities while supplementing with other marketplaces. Guru excels at securing quality retainer clients, making it worth the monthly investment for established freelancers earning $3,000+/month.",
      rating: "Excellent for experienced professionals, less ideal for beginners"
    },
    explore: {
      title: "Keep Exploring",
      links: [
        { href: "/platforms", title: "Compare All Platforms →", description: "See how Guru compares to 25+ other freelance marketplaces" },
        { href: "/reviews", title: "Read Platform Reviews →", description: "Real freelancer experiences from all major platforms" },
        { href: "/tools/rate-calculator", title: "Calculate Your Rate →", description: "Determine competitive pricing accounting for platform fees" },
        { href: "/comparisons", title: "Detailed Comparisons →", description: "Guru vs Upwork, Fiverr, Toptal, and more" }
      ]
    },
    finalCta: {
      title: "Find Your Perfect Freelance Platform",
      description: "Compare Guru with 25+ other platforms to discover the best fit for your experience level, skills, and income goals.",
      cta1: "Browse All Platforms",
      cta2: "Get Weekly Insights"
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": locale === "nl" ? "Guru Platform Analyse: Prijzen, Features en Ideale Gebruikers" : "Guru Platform Analysis: Pricing, Features, and Ideal Users",
    "description": locale === "nl" ? "Uitgebreide analyse van Guru.com platform features, prijsstructuur en ideale gebruikersprofielen voor freelancers." : "Comprehensive analysis of Guru.com platform features, pricing structure, and ideal user profiles for freelancers.",
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
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-accent/10 via-white to-secondary/10 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 dark:bg-accent/30 text-accent dark:text-accent mb-6">
                <span className="text-2xl">🔍</span>
                <span className="text-sm font-heading font-semibold">{content.hero.badge}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                {content.hero.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {content.hero.description}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-heading font-semibold hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
                >
                  {content.hero.cta1}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/reviews`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-gray-800 text-accent dark:text-accent border-2 border-accent dark:border-accent font-heading font-semibold hover:bg-accent/5 dark:hover:bg-accent/10 transition-all"
                >
                  {content.hero.cta2}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Key Stats */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid sm:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 text-center border border-accent/20">
                  <div className="text-4xl mb-3">👥</div>
                  <div className="text-3xl font-heading font-bold text-accent mb-2">3M+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{content.stats.freelancers}</div>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 text-center border border-primary/20">
                  <div className="text-4xl mb-3">🏢</div>
                  <div className="text-3xl font-heading font-bold text-primary mb-2">250K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{content.stats.employers}</div>
                </div>
                <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-xl p-6 text-center border border-secondary/20">
                  <div className="text-4xl mb-3">💰</div>
                  <div className="text-3xl font-heading font-bold text-secondary mb-2">$250M+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{content.stats.revenue}</div>
                </div>
                <div className="bg-gradient-to-br from-accent/10 to-primary/10 dark:from-accent/20 dark:to-primary/20 rounded-xl p-6 text-center border border-primary/20">
                  <div className="text-4xl mb-3">⭐</div>
                  <div className="text-3xl font-heading font-bold text-accent mb-2">4.2/5</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{content.stats.rating}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              {/* Platform Overview */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">🎯</span>
                    {content.overview.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {content.overview.intro}
                  </p>

                  <div className="bg-gradient-to-r from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border-l-4 border-accent mb-8">
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <span>💎</span>
                      {content.overview.philosophy.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {content.overview.philosophy.description}
                    </p>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      {content.overview.philosophy.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-accent text-xl mt-1">→</span>
                          <div><strong className="text-gray-900 dark:text-white">{feature.label}</strong> {feature.text}</div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6">
                      <h4 className="font-heading font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="text-primary">🎨</span>
                        {content.overview.services.title}
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        {content.overview.services.items.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6">
                      <h4 className="font-heading font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="text-accent">🎯</span>
                        {content.overview.bestFor.title}
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        {content.overview.bestFor.items.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* SafePay Feature */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">🔒</span>
                    {content.safepay.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {content.safepay.intro}
                  </p>

                  <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6 border-l-4 border-accent mb-8">
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">{content.safepay.howItWorks.title}</h3>
                    <ol className="space-y-4 text-gray-700 dark:text-gray-300">
                      {content.safepay.howItWorks.steps.map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="font-bold text-accent">{index + 1}.</span>
                          <div><strong className="text-gray-900 dark:text-white">{step.label}</strong> {step.text}</div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
                      <h4 className="font-heading font-bold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">
                        <span>✅</span>
                        {content.safepay.advantages.title}
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        {content.safepay.advantages.items.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-600">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
                      <h4 className="font-heading font-bold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
                        <span>💡</span>
                        {content.safepay.bestPractices.title}
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        {content.safepay.bestPractices.items.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-600">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* WorkRooms Feature */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">🏢</span>
                    {content.workrooms.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {content.workrooms.intro}
                  </p>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span>📋</span>
                        {content.workrooms.components.title}
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {content.workrooms.components.items.map((item, index) => (
                          <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-4">
                            <h4 className="font-heading font-bold text-gray-900 dark:text-white mb-2 text-sm">
                              {index === 0 && "💬"} {index === 1 && "📂"} {index === 2 && "📜"} {index === 3 && "⏱️"} {index === 4 && "💰"} {index === 5 && "📊"} {item.title}
                            </h4>
                            <p className="text-xs text-gray-700 dark:text-gray-300">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border-l-4 border-accent">
                      <h4 className="font-heading font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span>🚀</span>
                        {content.workrooms.whyMatters.title}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                        {content.workrooms.whyMatters.description}
                      </p>
                      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        {content.workrooms.whyMatters.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-accent">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA Mid-Article */}
              <div className="mb-16">
                <div className="bg-gradient-to-r from-accent to-secondary rounded-2xl p-8 text-center shadow-2xl">
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4">
                    {content.ctaMid.title}
                  </h3>
                  <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                    {content.ctaMid.description}
                  </p>
                  <Link
                    href={`/${locale}/platforms`}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-accent font-heading font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl text-lg"
                  >
                    {content.ctaMid.cta}
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Pricing Tiers */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">💳</span>
                    {content.pricing.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    {content.pricing.intro}
                  </p>

                  <div className="space-y-6">
                    {content.pricing.tiers.map((tier, index) => (
                      <div
                        key={index}
                        className={`rounded-xl p-6 border-2 ${
                          tier.badge
                            ? "bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/30 border-yellow-500 relative overflow-hidden"
                            : index === 1
                            ? "bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-500"
                            : "bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        {tier.badge && (
                          <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-heading font-bold">
                            {tier.badge}
                          </div>
                        )}
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">{tier.name}</h3>
                          <span className={`text-3xl font-heading font-bold ${
                            tier.badge ? "text-yellow-600" : index === 1 ? "text-blue-600" : "text-gray-600 dark:text-gray-400"
                          }`}>
                            {tier.price}
                          </span>
                        </div>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm mb-4">
                          {tier.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center gap-2">
                              <span className={feature.included ? "text-accent" : "text-red-500"}>
                                {feature.included ? "✓" : "✗"}
                              </span>
                              {feature.text}
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {locale === "nl" ? "Het beste voor: " : "Best for: "}{tier.bestFor}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-xl p-6">
                    <h4 className="font-heading font-bold text-gray-900 dark:text-white mb-4">{content.pricing.roi.title}</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                      {content.pricing.roi.description}
                    </p>
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 space-y-2 text-sm font-mono">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">{content.pricing.roi.labels.target}</span>
                        <span className="text-gray-900 dark:text-white font-bold">{content.pricing.roi.calculation.target}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">{content.pricing.roi.labels.basicFee}</span>
                        <span className="text-red-600 dark:text-red-400">{content.pricing.roi.calculation.basicFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">{content.pricing.roi.labels.businessFee}</span>
                        <span className="text-gray-700 dark:text-gray-300">{content.pricing.roi.calculation.businessFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">{content.pricing.roi.labels.membership}</span>
                        <span className="text-gray-700 dark:text-gray-300">{content.pricing.roi.calculation.membership}</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2">
                        <span className="text-gray-900 dark:text-white font-bold">{content.pricing.roi.labels.savings}</span>
                        <span className="text-accent font-bold text-lg">{content.pricing.roi.calculation.savings}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
                      {content.pricing.roi.note}
                    </p>
                  </div>
                </div>
              </section>

              {/* Ideal User Profiles */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">👤</span>
                    {content.idealUsers.title}
                  </h2>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border-l-4 border-accent">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span>✅</span>
                        {content.idealUsers.perfect.title}
                      </h3>
                      <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        {content.idealUsers.perfect.items.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-accent text-xl mt-1">→</span>
                            <div>
                              <strong className="text-gray-900 dark:text-white">{item.label}</strong> {item.text}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border-l-4 border-primary">
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span>⚠️</span>
                        {content.idealUsers.alternatives.title}
                      </h3>
                      <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        {content.idealUsers.alternatives.items.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-primary text-xl mt-1">→</span>
                            <div>
                              <strong className="text-gray-900 dark:text-white">{item.label}</strong> {item.text}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Pros & Cons */}
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                    <span className="text-4xl">⚖️</span>
                    {content.proscons.title}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
                      <h3 className="text-2xl font-heading font-bold text-green-800 dark:text-green-300 mb-6 flex items-center gap-2">
                        <span>✅</span>
                        {content.proscons.pros.title}
                      </h3>
                      <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                        {content.proscons.pros.items.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-600">✓</span>
                            <span><strong>{item.label}</strong> {item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-6 border-2 border-red-200 dark:border-red-800">
                      <h3 className="text-2xl font-heading font-bold text-red-800 dark:text-red-300 mb-6 flex items-center gap-2">
                        <span>❌</span>
                        {content.proscons.cons.title}
                      </h3>
                      <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                        {content.proscons.cons.items.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-red-600">✗</span>
                            <span><strong>{item.label}</strong> {item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Final Verdict */}
              <section className="mb-16">
                <div className="bg-gradient-to-br from-accent/10 via-primary/10 to-secondary/10 dark:from-accent/20 dark:via-primary/20 dark:to-secondary/20 rounded-2xl shadow-lg p-8 border-2 border-accent/30 dark:border-accent/50">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">🎯</span>
                    {content.verdict.title}
                  </h2>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <p className="text-lg">
                      <strong className="text-gray-900 dark:text-white">
                        {locale === "nl" ? "Voor ervaren professionals die kwaliteitsklanten zoeken:" : "For experienced professionals seeking quality clients:"}
                      </strong>{" "}
                      {content.verdict.experienced}
                    </p>
                    <p className="text-lg">
                      <strong className="text-gray-900 dark:text-white">
                        {locale === "nl" ? "Voor beginners of internationale freelancers:" : "For beginners or international freelancers:"}
                      </strong>{" "}
                      {content.verdict.beginners}
                    </p>
                    <p className="text-lg">
                      <strong className="text-gray-900 dark:text-white">
                        {locale === "nl" ? "Strategische aanpak:" : "Strategic approach:"}
                      </strong>{" "}
                      {content.verdict.strategic}
                    </p>
                  </div>
                  <div className="mt-6 bg-white dark:bg-gray-900 rounded-xl p-6 text-center">
                    <div className="text-5xl font-heading font-bold text-accent mb-2">4.2/5</div>
                    <p className="text-gray-600 dark:text-gray-400">{content.verdict.rating}</p>
                  </div>
                </div>
              </section>

              {/* Internal Links */}
              <section className="mb-16">
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6">{content.explore.title}</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {content.explore.links.map((link, index) => (
                    <Link
                      key={index}
                      href={`/${locale}${link.href}`}
                      className={`group rounded-xl p-6 hover:shadow-lg transition-all border ${
                        index === 0
                          ? "bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 border-accent/20"
                          : index === 1
                          ? "bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 border-primary/20"
                          : index === 2
                          ? "bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 border-secondary/20"
                          : "bg-gradient-to-br from-accent/10 to-primary/10 dark:from-accent/20 dark:to-primary/20 border-accent/20"
                      }`}
                    >
                      <h3 className={`font-heading font-bold text-gray-900 dark:text-white mb-2 transition-colors ${
                        index === 0 ? "group-hover:text-accent" : index === 1 ? "group-hover:text-primary" : index === 2 ? "group-hover:text-secondary" : "group-hover:text-accent"
                      }`}>
                        {link.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {link.description}
                      </p>
                    </Link>
                  ))}
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
                {content.finalCta.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                {content.finalCta.description}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-white font-heading font-bold hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
                >
                  {content.finalCta.cta1}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/newsletter`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white dark:bg-gray-800 text-accent dark:text-accent border-2 border-accent dark:border-accent font-heading font-bold hover:bg-accent/5 dark:hover:bg-accent/10 transition-all"
                >
                  {content.finalCta.cta2}
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
