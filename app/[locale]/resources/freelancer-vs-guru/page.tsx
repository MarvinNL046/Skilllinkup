import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const slug = 'freelancer-vs-guru';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

  if (locale === "nl") {
    return {
      title: "Freelancer.com of Guru 2026: Functie-voor-functie Vergelijking",
      description: "Vergelijk Freelancer.com en Guru naast elkaar. Gedetailleerde analyse van kosten, SafePay, WorkRooms, en welk platform betere waarde biedt voor freelancers.",
      keywords: "freelancer.com of guru, freelance platforms vergelijken, guru workrooms, freelancer safepay, beste freelance site",
      openGraph: {
        title: "Freelancer.com of Guru 2026: Functie-voor-functie Vergelijking",
        description: "Vergelijk Freelancer.com en Guru: kosten, SafePay, WorkRooms. Welk platform biedt de beste waarde?",
        url: pageUrl,
        siteName: 'SkillLinkup',
        images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Freelancer.com of Guru Vergelijking' }],
        locale: 'nl_NL',
        type: "article",
      },
      twitter: {
        card: 'summary_large_image',
        title: "Freelancer.com of Guru 2026: Functie-voor-functie Vergelijking",
        description: "Vergelijk Freelancer.com en Guru naast elkaar. Gedetailleerde analyse van kosten, SafePay, WorkRooms.",
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
    title: "Freelancer.com vs Guru 2026: Feature-by-Feature Comparison",
    description: "Compare Freelancer.com and Guru side-by-side. Detailed analysis of fees, SafePay, WorkRooms, and which platform offers better value for freelancers.",
    keywords: "freelancer.com vs guru, freelance platform comparison, guru workrooms, freelancer safepay, best freelance site",
    openGraph: {
      title: "Freelancer.com vs Guru 2026: Feature-by-Feature Comparison",
      description: "Compare Freelancer.com and Guru: fees, SafePay, WorkRooms. Which platform offers better value?",
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Freelancer.com vs Guru Comparison' }],
      locale: 'en_US',
      type: "article",
    },
    twitter: {
      card: 'summary_large_image',
      title: "Freelancer.com vs Guru 2026: Feature-by-Feature Comparison",
      description: "Compare Freelancer.com and Guru side-by-side. Detailed analysis of fees, SafePay, WorkRooms.",
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

export default async function FreelancerVsGuruPage({ params }: PageProps) {
  const { locale } = await params;

  const content = {
    en: {
      hero: {
        title: "Freelancer.com vs. Guru: Feature-by-Feature Comparison",
        subtitle: "Compare two veteran freelance platforms to determine which offers better fees, project management tools, and earning potential in 2026.",
        viewPlatforms: "View All Platforms",
        readReviews: "Read Reviews"
      },
      comparison: {
        title: "Side-by-Side Platform Comparison",
        feature: "Feature",
        freelancer: "Freelancer.com",
        guru: "Guru",
        commission: "Commission Rate",
        freelancerCommission: "10% or $5 minimum",
        guruCommission: "5-9% (membership tier)",
        payment: "Payment Protection",
        freelancerPayment: "Milestone Payments + SafePay",
        guruPayment: "SafePay escrow system",
        membership: "Membership Cost",
        freelancerMembership: "Free-$49.95/month",
        guruMembership: "Free-$39.95/month",
        bidLimits: "Bid Limits (Free)",
        freelancerBids: "8 bids/month",
        guruBids: "10 bids/month",
        projectMgmt: "Project Management",
        freelancerPM: "Basic tools + time tracker",
        guruPM: "WorkRooms collaboration suite",
        users: "Active Users",
        freelancerUsers: "60+ million registered",
        guruUsers: "3+ million members",
        contest: "Contest Feature",
        freelancerContest: "Yes (design/creative)",
        guruContest: "No"
      },
      overview: {
        title: "Platform Overview: Veterans of the Freelance Economy",
        intro: "Both Freelancer.com and Guru are established platforms with over 15 years of operation. While they share similar core features – job bidding, escrow protection, and global reach – key differences in fee structures, project management tools, and community size create distinct experiences for freelancers."
      },
      fees: {
        title: "Fee Structures: Understanding What You'll Actually Earn",
        freelancerTitle: "Freelancer.com Commission",
        freeAccount: "Free Account:",
        freeRate: "10% commission or $5 minimum (whichever is greater)",
        plusMember: "Plus Member ($6.99/month):",
        plusRate: "10% commission or $5 minimum",
        professional: "Professional ($24.99/month):",
        professionalRate: "10% commission or $5 minimum",
        premier: "Premier ($49.95/month):",
        premierRate: "10% commission or $5 minimum",
        note: "Note: Membership tiers increase bid limits but don't reduce commission rates.",
        guruTitle: "Guru Commission (Tiered by Membership)",
        basic: "Basic (Free):",
        basicRate: "9% commission on all projects",
        guruProfessional: "Professional ($11.99/month):",
        guruProfessionalRate: "7% commission",
        business: "Business ($23.99/month):",
        businessRate: "6% commission",
        executive: "Executive ($39.95/month):",
        executiveRate: "5% commission",
        guruNote: "Guru's tiered commission structure rewards active freelancers with paid memberships.",
        example: "Commission Comparison Example:",
        exampleText: "On a $1,000 project, Freelancer.com charges $100 (10%), while Guru charges $90 (Basic), $70 (Professional), $60 (Business), or $50 (Executive). For high-volume freelancers earning $5,000+ monthly, Guru's Executive tier ($39.95/month) saves $200-$250 in fees compared to Freelancer.com."
      },
      cta1: {
        title: "Want to explore more platform options?",
        description: "Discover detailed platform reviews, fee comparisons, and find the perfect match for your freelance business.",
        button: "Compare More Platforms"
      },
      membership: {
        title: "Membership Tiers and Bid Limits",
        intro: "Both platforms restrict monthly bid submissions on free accounts, pushing freelancers toward paid memberships:",
        freelancerLimits: "Freelancer.com Limits",
        free: "Free:",
        freeBids: "8 bids/month",
        plus: "Plus ($6.99):",
        plusBids: "50 bids/month",
        prof: "Professional ($24.99):",
        profBids: "200 bids/month",
        prem: "Premier ($49.95):",
        premBids: "500 bids/month",
        guruLimits: "Guru Limits",
        guruFree: "Basic (Free):",
        guruFreeBids: "10 bids/month",
        guruProf: "Professional ($11.99):",
        guruProfBids: "30 bids/month",
        guruBus: "Business ($23.99):",
        guruBusBids: "60 bids/month",
        guruExec: "Executive ($39.95):",
        guruExecBids: "100 bids/month"
      },
      safepay: {
        title: "Payment Protection: SafePay Systems Compared",
        intro: "Both platforms use escrow-based payment protection called \"SafePay,\" but implementation differs:",
        freelancerTitle: "Freelancer.com SafePay:",
        freelancerStep1: "Clients deposit milestone payments into escrow",
        freelancerStep2: "You complete work and submit deliverables",
        freelancerStep3: "Client approves and releases funds (or disputes)",
        freelancerStep4: "Funds available for withdrawal within 15 days of project approval",
        freelancerStep5: "Dispute resolution through platform arbitration",
        guruTitle: "Guru SafePay:",
        guruStep1: "Client funds SafePay agreement before work begins",
        guruStep2: "Milestone-based or full project funding options",
        guruStep3: "You invoice upon completion",
        guruStep4: "Client approves invoice, releasing funds",
        guruStep5: "9-day holding period after project completion",
        guruStep6: "Integrated dispute resolution with mediation"
      },
      projectMgmt: {
        title: "Project Management Tools",
        intro: "Guru's WorkRooms provide a significant advantage over Freelancer.com's basic messaging system. WorkRooms include:",
        workroomsTitle: "Guru WorkRooms Features",
        task: "Task Management:",
        taskDesc: "Create, assign, and track tasks with due dates",
        file: "File Sharing:",
        fileDesc: "Centralized document storage and version control",
        time: "Time Tracking:",
        timeDesc: "Built-in time tracker with invoicing integration",
        comm: "Communication Hub:",
        commDesc: "Threaded discussions, @mentions, notifications",
        calendar: "Calendar Integration:",
        calendarDesc: "Deadline tracking and scheduling",
        conclusion: "Freelancer.com offers basic messaging, milestone tracking, and a simple time tracker, but lacks the integrated collaboration suite that makes Guru attractive for long-term client relationships."
      },
      market: {
        title: "Market Size and Competition",
        freelancerIntro: "Freelancer.com boasts 60+ million registered users across 247 countries, making it one of the world's largest freelance marketplaces. This massive scale means:",
        freelancerPoint1: "More job postings daily (hundreds of thousands)",
        freelancerPoint2: "Higher competition (30-100+ bids per project)",
        freelancerPoint3: "Greater variety of project types and budgets",
        freelancerPoint4: "More international clients (pros and cons)",
        guruIntro: "Guru has 3+ million members – a smaller but potentially more focused community:",
        guruPoint1: "Fewer job postings (lower volume)",
        guruPoint2: "Less competition per project (10-30 bids typical)",
        guruPoint3: "Professional-focused positioning",
        guruPoint4: "Higher percentage of US-based clients"
      },
      contest: {
        title: "Contest Feature: Freelancer.com's Unique Offering",
        description: "Freelancer.com offers a contest feature where clients post design challenges (logos, website designs, graphics) and hundreds of freelancers submit entries. Winners receive the prize money, while others receive nothing. This model works for clients seeking variety but creates a race-to-the-bottom dynamic that many designers avoid. Guru doesn't offer contests, focusing instead on traditional project-based work."
      },
      decision: {
        title: "Which Platform Should You Choose?",
        guruTitle: "Choose Guru If You:",
        guruPoint1: "Earn $3,000+/month (Executive tier saves on fees)",
        guruPoint2: "Value project management tools (WorkRooms)",
        guruPoint3: "Prefer long-term client relationships",
        guruPoint4: "Target US-based clients",
        guruPoint5: "Want lower commission rates (5-9%)",
        freelancerTitle: "Choose Freelancer.com If You:",
        freelancerPoint1: "Want maximum project volume and variety",
        freelancerPoint2: "Can compete effectively (strong proposals)",
        freelancerPoint3: "Prefer global client diversity",
        freelancerPoint4: "Offer design services (contest opportunities)",
        freelancerPoint5: "Are building your portfolio"
      },
      verdict: {
        title: "Final Verdict",
        established: "For established freelancers earning $3,000+/month:",
        establishedText: "Guru's lower commission rates (5-9% with paid membership) and superior WorkRooms collaboration tools make it more cost-effective and professional. The $39.95/month Executive membership pays for itself if you earn just $800/month, saving 4-5% in fees compared to Freelancer.com's flat 10%.",
        beginners: "For beginners and volume-based freelancers:",
        beginnersText: "Freelancer.com's massive job volume provides more opportunities to build your portfolio, even if competition is fierce. The platform's scale means you'll never run out of projects to bid on, though success requires strong proposal skills and competitive pricing."
      },
      cta2: {
        title: "Explore More Platform Comparisons",
        description: "Find the perfect freelance platform with our comprehensive reviews and side-by-side comparisons.",
        button: "Browse All Platforms"
      },
      related: {
        title: "Related Platform Comparisons",
        upwork: "Upwork vs Fiverr",
        upworkDesc: "Compare the two largest platforms",
        designers: "Best Platform for Designers",
        designersDesc: "2026 design platform comparison",
        tools: "Freelance Tools",
        toolsDesc: "Essential tools for freelancers"
      }
    },
    nl: {
      hero: {
        title: "Freelancer.com of Guru: Functie-voor-functie Vergelijking",
        subtitle: "Vergelijk twee gevestigde freelance platforms om te bepalen welke betere kosten, projectmanagement tools en verdieningsmogelijkheden biedt in 2026.",
        viewPlatforms: "Alle Platforms Bekijken",
        readReviews: "Reviews Lezen"
      },
      comparison: {
        title: "Platform Vergelijking Naast Elkaar",
        feature: "Functie",
        freelancer: "Freelancer.com",
        guru: "Guru",
        commission: "Commissiepercentage",
        freelancerCommission: "10% of €5 minimum",
        guruCommission: "5-9% (lidmaatschap niveau)",
        payment: "Betalingsbescherming",
        freelancerPayment: "Mijlpaalbetalingen + SafePay",
        guruPayment: "SafePay escrow systeem",
        membership: "Lidmaatschapskosten",
        freelancerMembership: "Gratis-€49,95/maand",
        guruMembership: "Gratis-€39,95/maand",
        bidLimits: "Bod Limieten (Gratis)",
        freelancerBids: "8 biedingen/maand",
        guruBids: "10 biedingen/maand",
        projectMgmt: "Projectmanagement",
        freelancerPM: "Basis tools + tijdregistratie",
        guruPM: "WorkRooms samenwerkingssuite",
        users: "Actieve Gebruikers",
        freelancerUsers: "60+ miljoen geregistreerd",
        guruUsers: "3+ miljoen leden",
        contest: "Wedstrijd Functie",
        freelancerContest: "Ja (ontwerp/creatief)",
        guruContest: "Nee"
      },
      overview: {
        title: "Platform Overzicht: Veteranen van de Freelance Economie",
        intro: "Zowel Freelancer.com als Guru zijn gevestigde platforms met meer dan 15 jaar ervaring. Hoewel ze vergelijkbare kernfuncties delen – job bidding, escrow bescherming en wereldwijd bereik – creëren belangrijke verschillen in kostenstructuren, projectmanagement tools en gemeenschapsgrootte onderscheidende ervaringen voor freelancers."
      },
      fees: {
        title: "Kostenstructuren: Begrijpen Wat Je Werkelijk Verdient",
        freelancerTitle: "Freelancer.com Commissie",
        freeAccount: "Gratis Account:",
        freeRate: "10% commissie of €5 minimum (wat het hoogst is)",
        plusMember: "Plus Lid (€6,99/maand):",
        plusRate: "10% commissie of €5 minimum",
        professional: "Professional (€24,99/maand):",
        professionalRate: "10% commissie of €5 minimum",
        premier: "Premier (€49,95/maand):",
        premierRate: "10% commissie of €5 minimum",
        note: "Opmerking: Lidmaatschap niveaus verhogen bod limieten maar verlagen geen commissiepercentages.",
        guruTitle: "Guru Commissie (Gelaagd per Lidmaatschap)",
        basic: "Basic (Gratis):",
        basicRate: "9% commissie op alle projecten",
        guruProfessional: "Professional (€11,99/maand):",
        guruProfessionalRate: "7% commissie",
        business: "Business (€23,99/maand):",
        businessRate: "6% commissie",
        executive: "Executive (€39,95/maand):",
        executiveRate: "5% commissie",
        guruNote: "Guru's gelaagde commissiestructuur beloont actieve freelancers met betaalde lidmaatschappen.",
        example: "Commissie Vergelijkingsvoorbeeld:",
        exampleText: "Bij een project van €1.000 rekent Freelancer.com €100 (10%), terwijl Guru €90 (Basic), €70 (Professional), €60 (Business), of €50 (Executive) rekent. Voor drukke freelancers die €5.000+ per maand verdienen, bespaart Guru's Executive niveau (€39,95/maand) €200-€250 aan kosten vergeleken met Freelancer.com's vaste 10%."
      },
      cta1: {
        title: "Wil je meer platform opties verkennen?",
        description: "Ontdek gedetailleerde platform reviews, kostenvergelijkingen en vind de perfecte match voor jouw freelance business.",
        button: "Vergelijk Meer Platforms"
      },
      membership: {
        title: "Lidmaatschap Niveaus en Bod Limieten",
        intro: "Beide platforms beperken maandelijkse bod inzendingen op gratis accounts, waardoor freelancers naar betaalde lidmaatschappen worden geduwd:",
        freelancerLimits: "Freelancer.com Limieten",
        free: "Gratis:",
        freeBids: "8 biedingen/maand",
        plus: "Plus (€6,99):",
        plusBids: "50 biedingen/maand",
        prof: "Professional (€24,99):",
        profBids: "200 biedingen/maand",
        prem: "Premier (€49,95):",
        premBids: "500 biedingen/maand",
        guruLimits: "Guru Limieten",
        guruFree: "Basic (Gratis):",
        guruFreeBids: "10 biedingen/maand",
        guruProf: "Professional (€11,99):",
        guruProfBids: "30 biedingen/maand",
        guruBus: "Business (€23,99):",
        guruBusBids: "60 biedingen/maand",
        guruExec: "Executive (€39,95):",
        guruExecBids: "100 biedingen/maand"
      },
      safepay: {
        title: "Betalingsbescherming: SafePay Systemen Vergeleken",
        intro: "Beide platforms gebruiken escrow-gebaseerde betalingsbescherming genaamd \"SafePay\", maar de implementatie verschilt:",
        freelancerTitle: "Freelancer.com SafePay:",
        freelancerStep1: "Klanten storten mijlpaalbetalingen in escrow",
        freelancerStep2: "Je voltooit het werk en dient oplevering in",
        freelancerStep3: "Klant keurt goed en geeft fondsen vrij (of betwist)",
        freelancerStep4: "Fondsen beschikbaar voor opname binnen 15 dagen na projectgoedkeuring",
        freelancerStep5: "Geschillenbeslechting via platform arbitrage",
        guruTitle: "Guru SafePay:",
        guruStep1: "Klant financiert SafePay overeenkomst voordat werk begint",
        guruStep2: "Mijlpaal-gebaseerde of volledige projectfinanciering opties",
        guruStep3: "Je factureert bij voltooiing",
        guruStep4: "Klant keurt factuur goed, waardoor fondsen vrijkomen",
        guruStep5: "9-daagse wachtperiode na projectvoltooiing",
        guruStep6: "Geïntegreerde geschillenbeslechting met bemiddeling"
      },
      projectMgmt: {
        title: "Projectmanagement Tools",
        intro: "Guru's WorkRooms bieden een significant voordeel ten opzichte van Freelancer.com's basis berichtensysteem. WorkRooms omvatten:",
        workroomsTitle: "Guru WorkRooms Functies",
        task: "Taakbeheer:",
        taskDesc: "Creëer, wijs toe en volg taken met deadlines",
        file: "Bestand Delen:",
        fileDesc: "Gecentraliseerde documentopslag en versiebeheer",
        time: "Tijdregistratie:",
        timeDesc: "Ingebouwde tijdregistratie met facturatie-integratie",
        comm: "Communicatie Hub:",
        commDesc: "Discussiedraden, @vermeldingen, meldingen",
        calendar: "Agenda Integratie:",
        calendarDesc: "Deadline tracking en planning",
        conclusion: "Freelancer.com biedt basis berichtenuitwisseling, mijlpaal tracking en een eenvoudige tijdregistratie, maar mist de geïntegreerde samenwerkingssuite die Guru aantrekkelijk maakt voor langetermijn klantrelaties."
      },
      market: {
        title: "Marktomvang en Concurrentie",
        freelancerIntro: "Freelancer.com heeft 60+ miljoen geregistreerde gebruikers in 247 landen, wat het een van 's werelds grootste freelance marktplaatsen maakt. Deze enorme schaal betekent:",
        freelancerPoint1: "Meer vacatures dagelijks (honderdduizenden)",
        freelancerPoint2: "Hogere concurrentie (30-100+ biedingen per project)",
        freelancerPoint3: "Grotere variëteit aan projecttypen en budgetten",
        freelancerPoint4: "Meer internationale klanten (voor- en nadelen)",
        guruIntro: "Guru heeft 3+ miljoen leden – een kleinere maar mogelijk meer gefocuste gemeenschap:",
        guruPoint1: "Minder vacatures (lager volume)",
        guruPoint2: "Minder concurrentie per project (10-30 biedingen typisch)",
        guruPoint3: "Professionele positionering",
        guruPoint4: "Hoger percentage Amerikaanse klanten"
      },
      contest: {
        title: "Wedstrijd Functie: Freelancer.com's Unieke Aanbod",
        description: "Freelancer.com biedt een wedstrijd functie waarbij klanten ontwerpuitdagingen plaatsen (logo's, website ontwerpen, graphics) en honderden freelancers inzendingen indienen. Winnaars ontvangen het prijzengeld, terwijl anderen niets ontvangen. Dit model werkt voor klanten die variëteit zoeken maar creëert een race naar de bodem dynamiek die veel ontwerpers vermijden. Guru biedt geen wedstrijden aan en focust in plaats daarvan op traditioneel project-gebaseerd werk."
      },
      decision: {
        title: "Welk Platform Moet Je Kiezen?",
        guruTitle: "Kies Guru Als Je:",
        guruPoint1: "€3.000+/maand verdient (Executive niveau bespaart op kosten)",
        guruPoint2: "Projectmanagement tools waardeert (WorkRooms)",
        guruPoint3: "Voorkeur hebt voor langetermijn klantrelaties",
        guruPoint4: "Amerikaanse klanten targeteert",
        guruPoint5: "Lagere commissiepercentages wilt (5-9%)",
        freelancerTitle: "Kies Freelancer.com Als Je:",
        freelancerPoint1: "Maximum projectvolume en variëteit wilt",
        freelancerPoint2: "Effectief kunt concurreren (sterke voorstellen)",
        freelancerPoint3: "Voorkeur hebt voor wereldwijde klantendiversiteit",
        freelancerPoint4: "Ontwerpservices aanbiedt (wedstrijd mogelijkheden)",
        freelancerPoint5: "Je portfolio aan het opbouwen bent"
      },
      verdict: {
        title: "Eindoordeel",
        established: "Voor gevestigde freelancers die €3.000+/maand verdienen:",
        establishedText: "Guru's lagere commissiepercentages (5-9% met betaald lidmaatschap) en superieure WorkRooms samenwerkingstools maken het kosteneffectiever en professioneler. Het €39,95/maand Executive lidmaatschap betaalt zichzelf terug als je slechts €800/maand verdient, met een besparing van 4-5% aan kosten vergeleken met Freelancer.com's vaste 10%.",
        beginners: "Voor beginners en volume-gebaseerde freelancers:",
        beginnersText: "Freelancer.com's enorme vacaturevolume biedt meer mogelijkheden om je portfolio op te bouwen, zelfs als de concurrentie hevig is. De schaal van het platform betekent dat je nooit zonder projecten zult zitten om op te bieden, hoewel succes sterke voorstelvaardigheid en competitieve prijzen vereist."
      },
      cta2: {
        title: "Verken Meer Platform Vergelijkingen",
        description: "Vind het perfecte freelance platform met onze uitgebreide reviews en vergelijkingen naast elkaar.",
        button: "Bekijk Alle Platforms"
      },
      related: {
        title: "Gerelateerde Platform Vergelijkingen",
        upwork: "Upwork of Fiverr",
        upworkDesc: "Vergelijk de twee grootste platforms",
        designers: "Best Platform voor Ontwerpers",
        designersDesc: "2026 ontwerp platform vergelijking",
        tools: "Freelance Tools",
        toolsDesc: "Essentiële tools voor freelancers"
      }
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: locale === "nl"
      ? "Freelancer.com of Guru 2026: Functie-voor-functie Vergelijking"
      : "Freelancer.com vs Guru 2026: Feature-by-Feature Comparison",
    description: locale === "nl"
      ? "Vergelijk Freelancer.com en Guru naast elkaar. Gedetailleerde analyse van kosten, SafePay, WorkRooms, en welk platform betere waarde biedt voor freelancers."
      : "Compare Freelancer.com and Guru side-by-side. Detailed analysis of fees, SafePay, WorkRooms, and which platform offers better value for freelancers.",
    datePublished: "2026-01-15",
    dateModified: "2026-01-15",
    author: {
      "@type": "Organization",
      name: "SkillLinkup",
    },
    publisher: {
      "@type": "Organization",
      name: "SkillLinkup",
    },
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
        <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                {t.hero.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-heading font-semibold hover:bg-primary-dark transition-colors shadow-lg"
                >
                  {t.hero.viewPlatforms}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/reviews`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-gray-800 text-primary dark:text-accent border-2 border-primary dark:border-accent font-heading font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {t.hero.readReviews}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Comparison Table */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8 text-center">
                {t.comparison.title}
              </h2>
              <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-heading font-semibold text-gray-900 dark:text-white">{t.comparison.feature}</th>
                      <th className="px-6 py-4 text-left text-sm font-heading font-semibold text-primary dark:text-accent">{t.comparison.freelancer}</th>
                      <th className="px-6 py-4 text-left text-sm font-heading font-semibold text-primary dark:text-accent">{t.comparison.guru}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{t.comparison.commission}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{t.comparison.freelancerCommission}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{t.comparison.guruCommission}</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{t.comparison.payment}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{t.comparison.freelancerPayment}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{t.comparison.guruPayment}</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{t.comparison.membership}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{t.comparison.freelancerMembership}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{t.comparison.guruMembership}</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{t.comparison.bidLimits}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{t.comparison.freelancerBids}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{t.comparison.guruBids}</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{t.comparison.projectMgmt}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{t.comparison.freelancerPM}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{t.comparison.guruPM}</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{t.comparison.users}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{t.comparison.freelancerUsers}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{t.comparison.guruUsers}</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{t.comparison.contest}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{t.comparison.freelancerContest}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{t.comparison.guruContest}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Analysis Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <article className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                  {t.overview.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t.overview.intro}
                </p>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {t.fees.title}
                </h3>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 my-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">{t.fees.freelancerTitle}</h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>{t.fees.freeAccount}</strong> {t.fees.freeRate}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>{t.fees.plusMember}</strong> {t.fees.plusRate}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>{t.fees.professional}</strong> {t.fees.professionalRate}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>{t.fees.premier}</strong> {t.fees.premierRate}</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 italic">
                    {t.fees.note}
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 my-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">{t.fees.guruTitle}</h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span><strong>{t.fees.basic}</strong> {t.fees.basicRate}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span><strong>{t.fees.guruProfessional}</strong> {t.fees.guruProfessionalRate}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span><strong>{t.fees.business}</strong> {t.fees.businessRate}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span><strong>{t.fees.executive}</strong> {t.fees.executiveRate}</span>
                    </li>
                  </ul>
                  <p className="text-sm text-accent dark:text-accent-light mt-4 italic">
                    {t.fees.guruNote}
                  </p>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  <strong>{t.fees.example}</strong> {t.fees.exampleText}
                </p>

                <div className="bg-accent/10 dark:bg-accent/20 border-l-4 border-accent rounded-r-lg p-6 my-8">
                  <p className="text-gray-900 dark:text-white font-semibold mb-2">
                    {t.cta1.title}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {t.cta1.description}
                  </p>
                  <Link
                    href={`/${locale}/comparisons`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white font-heading font-semibold hover:bg-accent-dark transition-colors"
                  >
                    {t.cta1.button}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {t.membership.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t.membership.intro}
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-primary dark:border-accent">
                    <h4 className="text-xl font-heading font-bold text-primary dark:text-accent mb-4">{t.membership.freelancerLimits}</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>{t.membership.free}</strong> {t.membership.freeBids}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>{t.membership.plus}</strong> {t.membership.plusBids}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>{t.membership.prof}</strong> {t.membership.profBids}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>{t.membership.prem}</strong> {t.membership.premBids}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-primary dark:border-accent">
                    <h4 className="text-xl font-heading font-bold text-primary dark:text-accent mb-4">{t.membership.guruLimits}</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">✓</span>
                        <span><strong>{t.membership.guruFree}</strong> {t.membership.guruFreeBids}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">✓</span>
                        <span><strong>{t.membership.guruProf}</strong> {t.membership.guruProfBids}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">✓</span>
                        <span><strong>{t.membership.guruBus}</strong> {t.membership.guruBusBids}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">✓</span>
                        <span><strong>{t.membership.guruExec}</strong> {t.membership.guruExecBids}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {t.safepay.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t.safepay.intro}
                </p>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <strong className="text-gray-900 dark:text-white">{t.safepay.freelancerTitle}</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                  <li>{t.safepay.freelancerStep1}</li>
                  <li>{t.safepay.freelancerStep2}</li>
                  <li>{t.safepay.freelancerStep3}</li>
                  <li>{t.safepay.freelancerStep4}</li>
                  <li>{t.safepay.freelancerStep5}</li>
                </ul>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <strong className="text-gray-900 dark:text-white">{t.safepay.guruTitle}</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                  <li>{t.safepay.guruStep1}</li>
                  <li>{t.safepay.guruStep2}</li>
                  <li>{t.safepay.guruStep3}</li>
                  <li>{t.safepay.guruStep4}</li>
                  <li>{t.safepay.guruStep5}</li>
                  <li>{t.safepay.guruStep6}</li>
                </ul>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {t.projectMgmt.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t.projectMgmt.intro}
                </p>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 my-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">{t.projectMgmt.workroomsTitle}</h4>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span><strong>{t.projectMgmt.task}</strong> {t.projectMgmt.taskDesc}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span><strong>{t.projectMgmt.file}</strong> {t.projectMgmt.fileDesc}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span><strong>{t.projectMgmt.time}</strong> {t.projectMgmt.timeDesc}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span><strong>{t.projectMgmt.comm}</strong> {t.projectMgmt.commDesc}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span><strong>{t.projectMgmt.calendar}</strong> {t.projectMgmt.calendarDesc}</span>
                    </li>
                  </ul>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t.projectMgmt.conclusion}
                </p>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {t.market.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <strong className="text-gray-900 dark:text-white">{t.comparison.freelancer}</strong> {t.market.freelancerIntro}
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                  <li>{t.market.freelancerPoint1}</li>
                  <li>{t.market.freelancerPoint2}</li>
                  <li>{t.market.freelancerPoint3}</li>
                  <li>{t.market.freelancerPoint4}</li>
                </ul>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <strong className="text-gray-900 dark:text-white">{t.comparison.guru}</strong> {t.market.guruIntro}
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                  <li>{t.market.guruPoint1}</li>
                  <li>{t.market.guruPoint2}</li>
                  <li>{t.market.guruPoint3}</li>
                  <li>{t.market.guruPoint4}</li>
                </ul>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {t.contest.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t.contest.description}
                </p>

                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  {t.decision.title}
                </h2>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-accent dark:border-accent">
                    <h4 className="text-xl font-heading font-bold text-accent mb-4">{t.decision.guruTitle}</h4>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">✓</span>
                        <span>{t.decision.guruPoint1}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">✓</span>
                        <span>{t.decision.guruPoint2}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">✓</span>
                        <span>{t.decision.guruPoint3}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">✓</span>
                        <span>{t.decision.guruPoint4}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">✓</span>
                        <span>{t.decision.guruPoint5}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-primary dark:border-primary">
                    <h4 className="text-xl font-heading font-bold text-primary mb-4">{t.decision.freelancerTitle}</h4>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">✓</span>
                        <span>{t.decision.freelancerPoint1}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">✓</span>
                        <span>{t.decision.freelancerPoint2}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">✓</span>
                        <span>{t.decision.freelancerPoint3}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">✓</span>
                        <span>{t.decision.freelancerPoint4}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">✓</span>
                        <span>{t.decision.freelancerPoint5}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {t.verdict.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  <strong>{t.verdict.established}</strong> {t.verdict.establishedText}
                </p>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  <strong>{t.verdict.beginners}</strong> {t.verdict.beginnersText}
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-secondary dark:from-primary-dark dark:to-secondary-dark text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
                {t.cta2.title}
              </h2>
              <p className="text-lg mb-8 opacity-90">
                {t.cta2.description}
              </p>
              <Link
                href={`/${locale}/platforms`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-primary font-heading font-bold hover:bg-gray-100 transition-colors shadow-xl text-lg"
              >
                {t.cta2.button}
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Related Comparisons */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                {t.related.title}
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  href={`/${locale}/resources/upwork-vs-fiverr`}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-colors"
                >
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">
                    {t.related.upwork}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {t.related.upworkDesc}
                  </p>
                </Link>
                <Link
                  href={`/${locale}/resources/best-platform-designers`}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-colors"
                >
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">
                    {t.related.designers}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {t.related.designersDesc}
                  </p>
                </Link>
                <Link
                  href={`/${locale}/tools`}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-colors"
                >
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">
                    {t.related.tools}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {t.related.toolsDesc}
                  </p>
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
