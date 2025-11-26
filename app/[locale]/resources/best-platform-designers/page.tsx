import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const slug = 'best-platform-designers';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

  if (locale === "nl") {
    return {
      title: "Beste Freelance Platform voor Designers 2025: Volledige Gids",
      description: "Vergelijk Upwork, 99designs, Dribbble en Behance voor freelance designwerk. Vind het platform met de beste tarieven, projecten en portfolio exposure in Nederland.",
      keywords: "beste platform designers, freelance design sites, grafisch ontwerp platform, UI/UX freelance, 99designs vs upwork, design platforms Nederland",
      openGraph: {
        title: "Beste Freelance Platform voor Designers 2025: Volledige Gids",
        description: "Vergelijk Upwork, 99designs, Dribbble en Behance voor freelance designwerk. Vind het beste platform voor designers.",
        url: pageUrl,
        siteName: 'SkillLinkup',
        images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Beste Freelance Platform voor Designers 2025' }],
        type: "article",
        locale: "nl_NL",
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Beste Freelance Platform voor Designers 2025',
        description: 'Vergelijk Upwork, 99designs, Dribbble en Behance voor freelance designwerk.',
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
    };
  }

  return {
    title: "Best Freelance Platform for Designers 2025: Complete Guide",
    description: "Compare Upwork, 99designs, Dribbble, and Behance for freelance design work. Find the platform that offers the best rates, projects, and portfolio exposure.",
    keywords: "best platform for designers, freelance design sites, graphic design platform, UI/UX freelance, 99designs vs upwork",
    openGraph: {
      title: "Best Freelance Platform for Designers 2025: Complete Guide",
      description: "Compare Upwork, 99designs, Dribbble, and Behance for freelance design work. Find the best platform for designers.",
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Best Freelance Platform for Designers 2025' }],
      type: "article",
      locale: "en_US",
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Best Freelance Platform for Designers 2025',
      description: 'Compare Upwork, 99designs, Dribbble, and Behance for freelance design work.',
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
  };
}

export default async function BestPlatformDesignersPage({ params }: Props) {
  const { locale } = await params;

  const content = locale === "nl" ? {
    hero: {
      title: "Beste Freelance Platform voor Designers: 2025 Vergelijkingsgids",
      description: "Vergelijk Upwork, 99designs, Dribbble, Behance en Toptal om het platform te vinden dat jouw design-inkomen maximaliseert en jouw creatieve portfolio onder de aandacht brengt.",
      cta1: "Bekijk Alle Platforms",
      cta2: "Lees Reviews"
    },
    comparisonTable: {
      title: "Designer-Gerichte Platform Vergelijking",
      headers: {
        feature: "Functie",
        avgRate: "Gem. Projecttarief",
        platformFee: "Platform Fee",
        projectType: "Projecttype",
        portfolio: "Portfolio Showcase",
        clientQuality: "Klantkwaliteit",
        bestFor: "Best Voor"
      },
      upwork: {
        avgRate: "€450-€9.000+",
        platformFee: "10% glijdend",
        projectType: "1-op-1 projecten",
        portfolio: "Basis profiel",
        clientQuality: "Gemengd (alle groottes)",
        bestFor: "Alle designers"
      },
      designs99: {
        avgRate: "€270-€2.700",
        platformFee: "15-40%",
        projectType: "Wedstrijden + 1-op-1",
        portfolio: "Portfolio + statistieken",
        clientQuality: "MKB gericht",
        bestFor: "Logo/branding"
      },
      dribbble: {
        avgRate: "€900-€13.500+",
        platformFee: "€5/maand Pro",
        projectType: "Directe werving",
        portfolio: "Premium showcase",
        clientQuality: "Startups/bureaus",
        bestFor: "UI/UX designers"
      },
      toptal: {
        avgRate: "€4.500-€45.000+",
        platformFee: "0% (uitnodiging)",
        projectType: "Geselecteerde matching",
        portfolio: "Samengestelde portfolio",
        clientQuality: "Enterprise/Fortune 500",
        bestFor: "Elite designers"
      }
    },
    platform1: {
      title: "Platform #1: Upwork – De Veelzijdige Design Marktplaats",
      intro: "Upwork is de grootste algemene freelance marktplaats die designprojecten aanbiedt in elke specialisatie – grafisch ontwerp, UI/UX, branding, illustratie, motion graphics en productontwerp.",
      prosConsTitle: "Upwork voor Designers: Voor- en Nadelen",
      pros: {
        title: "Voordelen",
        items: [
          "Enorm projectvolume (500+ designopdrachten dagelijks)",
          "Alle designniches vertegenwoordigd",
          "Projecttarieven: €450-€9.000+ typisch",
          "Langetermijn klantrelaties",
          "Uurtarief (€23-€135/uur) en vaste prijs"
        ]
      },
      cons: {
        title: "Nadelen",
        items: [
          "Hoge concurrentie (30-70 voorstellen/opdracht)",
          "Voorstelkosten (Connects-systeem)",
          "Veel projecten met laag budget",
          "Basis portfolio showcase"
        ]
      },
      bestFor: "Best voor: Designers die vertrouwd zijn met verkoop/pitchen, degenen die portfolio's opbouwen, en freelancers die op zoek zijn naar diverse projecttypes. Succes vereist sterke voorstelvaardigheden en portfolio-optimalisatie."
    },
    platform2: {
      title: "Platform #2: 99designs – Wedstrijd-Gebaseerd Designplatform",
      intro: "99designs is gespecialiseerd in logoontwerp, branding en visuele identiteit via een wedstrijdmodel waarbij klanten briefings plaatsen en designers concurrerende inzendingen indienen. Het biedt ook 1-op-1 projectopties.",
      prosConsTitle: "99designs voor Designers: Voor- en Nadelen",
      pros: {
        title: "Voordelen",
        items: [
          "Geen voorafgaande klantacquisitiekosten",
          "Mogelijkheden voor portfolio-opbouw",
          "Levelingsysteem (opkomend → elite)",
          "1-op-1 projectopties beschikbaar",
          "Design-specifieke community"
        ]
      },
      cons: {
        title: "Nadelen",
        items: [
          "Wedstrijdmodel = risico op onbetaald werk",
          "Hoge kosten: 15-40% afhankelijk van niveau",
          "Prijsdruk naar beneden",
          "Beperkt tot logo/branding/webdesign",
          "Tijdintensief met lage winkansen"
        ]
      },
      bestFor: "Best voor: Logodesigners en brandingspecialisten die bereid zijn om speculatief werk te maken, beginners die portfolio's opbouwen, en designers die uitblinken in snelle iteratie."
    },
    cta1: {
      title: "Verschillende designplatforms verkennen?",
      description: "Vergelijk gedetailleerde platformreviews, portfoliofuncties en vind de beste match voor jouw designcarrière.",
      button: "Vergelijk Meer Platforms"
    },
    platform3: {
      title: "Platform #3: Dribbble – Premium Design Portfolio & Vacaturebank",
      intro: "Dribbble is 's werelds toonaangevende design showcase-platform waar UI/UX designers, illustratoren en productontwerpers werk tonen en met klanten verbinden via een vacaturebank en directe verzoeken.",
      prosConsTitle: "Dribbble voor Designers: Voor- en Nadelen",
      pros: {
        title: "Voordelen",
        items: [
          "Premium portfolio showcase",
          "Hoogwaardige klantverzoeken",
          "Startup- en bureauklanten",
          "Passief inkomen (klanten vinden jou)",
          "Community- en netwerkvoordelen",
          "Projecttarieven: €900-€13.500+"
        ]
      },
      cons: {
        title: "Nadelen",
        items: [
          "Pro-lidmaatschap vereist (€5/maand)",
          "Lager projectvolume dan Upwork",
          "Vereist uitzonderlijke portfoliokwaliteit",
          "Verzadigd met topdesigners",
          "Focus op UI/UX en digitaal ontwerp"
        ]
      },
      bestFor: "Best voor: UI/UX designers met sterke portfolio's, productontwerpers die zich richten op startups, en designers die de voorkeur geven aan inbound klantacquisitie boven actief pitchen."
    },
    platform4: {
      title: "Platform #4: Toptal – Elite Designnetwerk",
      intro: "Toptal is een exclusief talentennetwerk dat alleen de top 3% van designaanvragers accepteert. Het verbindt elite designers met Fortune 500-bedrijven, unicorn startups en snelgroeiende techbedrijven.",
      prosConsTitle: "Toptal voor Designers: Voor- en Nadelen",
      pros: {
        title: "Voordelen",
        items: [
          "Premium tarieven: €55-€180+/uur",
          "Nul platformkosten (100% inkomsten)",
          "Enterprise klanten (Airbnb, Zendesk, JPMorgan)",
          "Samengestelde klantmatching (geen bieding)",
          "Langetermijnopdrachten (3-12+ maanden)",
          "Strategische designprojecten"
        ]
      },
      cons: {
        title: "Nadelen",
        items: [
          "Strenge 5-stappen screening (2-5 weken)",
          "Slechts top 3% acceptatiepercentage",
          "Vereist 5+ jaar senior ervaring",
          "Live design-uitdagingen in interview",
          "Beperkt projectvolume (samengesteld)"
        ]
      },
      bestFor: "Best voor: Elite designers met 5+ jaar ervaring, productdesignleiders, UX-strategen en designers die zich richten op enterprise klanten en premium tarieven."
    },
    platform5: {
      title: "Platform #5: Behance (Adobe) – Creatief Portfolionetwerk",
      intro: "Behance is Adobe's creatieve portfolioplatform dat werk showcaset van illustratoren, grafisch ontwerpers, fotografen en motion designers. Hoewel primair een portfoliohost, bevat het vacaturebanken en klantverzoeken.",
      keyFeatures: {
        title: "Belangrijkste Kenmerken",
        items: [
          { label: "Gratis Portfoliohosting:", text: "Onbeperkte projecten en casestudies" },
          { label: "Adobe-integratie:", text: "Directe upload vanuit Creative Cloud-apps" },
          { label: "Creatieve Vacaturebank:", text: "Bureau- en inhouse posities" },
          { label: "Community-functies:", text: "Waarderingen, reacties, volgers" },
          { label: "Best voor:", text: "Portfoliohosting en merkopbouw, niet direct freelancewerk" }
        ]
      }
    },
    recommendations: {
      title: "Welk Platform Moeten Designers Kiezen?",
      subtitle: "Platform Aanbevelingen per Designspecialisatie",
      uiux: {
        title: "UI/UX Designers",
        primary: "Primair: Dribbble Pro",
        secondary: "Secundair: Upwork (voor consistent werk)",
        goal: "Doel: Toptal (na 5+ jaar)",
        note: "Showcase premium werk op Dribbble, vul gaten met Upwork-projecten"
      },
      branding: {
        title: "Logo & Branding Specialisten",
        primary: "Primair: Upwork",
        secondary: "Secundair: 99designs (alleen 1-op-1 projecten)",
        avoid: "Vermijd: 99designs wedstrijden (lage ROI)",
        note: "Focus op 1-op-1 relaties voor duurzaam inkomen"
      },
      graphic: {
        title: "Grafisch Ontwerpers (Print/Digitaal)",
        primary: "Primair: Upwork",
        portfolio: "Portfolio: Behance + Dribbble",
        volume: "Volume: Fiverr (voor snelle projecten)",
        note: "Diversifieer over platforms voor consistent werk"
      },
      elite: {
        title: "Elite Productontwerpers",
        primary: "Primair: Toptal (indien geaccepteerd)",
        secondary: "Secundair: Dribbble Pro",
        backup: "Backup: Upwork (alleen premium klanten)",
        note: "Richt op enterprise klanten en strategisch designwerk"
      }
    },
    multiPlatform: {
      title: "Multi-Platform Strategie voor Designers",
      subtitle: "Het 3-Platform Systeem",
      step1: {
        title: "Portfolio Platform (Gratis):",
        description: "Behance of Dribbble voor het tonen van je beste werk en SEO-zichtbaarheid"
      },
      step2: {
        title: "Primair Inkomen Platform:",
        description: "Upwork of Dribbble Pro (€5/maand) voor consistente klantenstroom"
      },
      step3: {
        title: "Premium Doel Platform:",
        description: "Solliciteer bij Toptal zodra je 5+ jaar en €90+/uur tarieven hebt bereikt"
      }
    },
    finalVerdict: {
      title: "Eindoordeel",
      mostDesigners: "Voor de meeste designers: Start met Upwork om je klantenbasis en inkomen op te bouwen. Toon gelijktijdig werk op Behance (gratis) of Dribbble Pro (€5/maand) voor portfoliozichtbaarheid. Zodra je €4.500+/maand verdient en 5+ jaar ervaring hebt, solliciteer bij Toptal voor 2-3x tariefverhoging.",
      uiuxSpecialists: "Voor UI/UX specialisten: Dribbble Pro biedt de beste balans tussen portfolio showcase en hoogwaardige klantverzoeken. Vul aan met Upwork-projecten tijdens rustigere periodes.",
      avoid: "Vermijd: Wedstrijd-gebaseerde platforms zoals 99designs tenzij je een eerste portfolio opbouwt. De tijdsinvestering rechtvaardigt zelden de potentiële inkomsten vergeleken met direct klantwerk."
    },
    ctaSection: {
      title: "Klaar om Je Designcarrière Te Lanceren?",
      description: "Verken uitgebreide platformreviews en begin vandaag nog met verdienen als freelance designer.",
      button: "Bekijk Alle Platforms"
    },
    relatedComparisons: {
      title: "Gerelateerde Platform Vergelijkingen",
      writers: {
        title: "Beste Platform voor Schrijvers",
        description: "Gedetailleerde schrijversplatform vergelijking"
      },
      upworkFiverr: {
        title: "Upwork vs Fiverr",
        description: "Welk platform is het beste voor freelancers?"
      },
      toptalUpwork: {
        title: "Toptal vs Upwork",
        description: "Elite netwerk vs massale marktplaats"
      }
    }
  } : {
    hero: {
      title: "Best Freelance Platform for Designers: 2025 Comparison Guide",
      description: "Compare Upwork, 99designs, Dribbble, Behance, and Toptal to find the platform that maximizes your design income and showcases your creative portfolio.",
      cta1: "View All Platforms",
      cta2: "Read Reviews"
    },
    comparisonTable: {
      title: "Designer-Focused Platform Comparison",
      headers: {
        feature: "Feature",
        avgRate: "Avg. Project Rate",
        platformFee: "Platform Fee",
        projectType: "Project Type",
        portfolio: "Portfolio Showcase",
        clientQuality: "Client Quality",
        bestFor: "Best For"
      },
      upwork: {
        avgRate: "$500-$10,000+",
        platformFee: "10% sliding",
        projectType: "1-on-1 projects",
        portfolio: "Basic profile",
        clientQuality: "Mixed (all sizes)",
        bestFor: "All designers"
      },
      designs99: {
        avgRate: "$299-$2,999",
        platformFee: "15-40%",
        projectType: "Contests + 1-on-1",
        portfolio: "Portfolio + stats",
        clientQuality: "SMB focused",
        bestFor: "Logo/branding"
      },
      dribbble: {
        avgRate: "$1,000-$15,000+",
        platformFee: "$5/month Pro",
        projectType: "Direct hire",
        portfolio: "Premium showcase",
        clientQuality: "Startups/agencies",
        bestFor: "UI/UX designers"
      },
      toptal: {
        avgRate: "$5,000-$50,000+",
        platformFee: "0% (invited)",
        projectType: "Curated matching",
        portfolio: "Curated portfolio",
        clientQuality: "Enterprise/Fortune 500",
        bestFor: "Elite designers"
      }
    },
    platform1: {
      title: "Platform #1: Upwork – The All-Purpose Design Marketplace",
      intro: "Upwork is the largest general freelance marketplace offering design projects across every specialty – graphic design, UI/UX, branding, illustration, motion graphics, and product design.",
      prosConsTitle: "Upwork for Designers: Pros & Cons",
      pros: {
        title: "Pros",
        items: [
          "Massive project volume (500+ design jobs daily)",
          "All design niches represented",
          "Project rates: $500-$10,000+ typical",
          "Long-term client relationships",
          "Hourly ($25-$150/hr) and fixed-price"
        ]
      },
      cons: {
        title: "Cons",
        items: [
          "High competition (30-70 proposals/job)",
          "Proposal costs (Connects system)",
          "Many low-budget projects",
          "Basic portfolio showcase"
        ]
      },
      bestFor: "Best for: Designers comfortable with sales/pitching, those building portfolios, and freelancers seeking diverse project types. Success requires strong proposal skills and portfolio optimization."
    },
    platform2: {
      title: "Platform #2: 99designs – Contest-Based Design Platform",
      intro: "99designs specializes in logo design, branding, and visual identity through a contest model where clients post briefs and designers submit competing entries. It also offers 1-on-1 project options.",
      prosConsTitle: "99designs for Designers: Pros & Cons",
      pros: {
        title: "Pros",
        items: [
          "No upfront client acquisition cost",
          "Portfolio building opportunities",
          "Leveling system (emerging → elite)",
          "1-on-1 project options available",
          "Design-specific community"
        ]
      },
      cons: {
        title: "Cons",
        items: [
          "Contest model = unpaid work risk",
          "High fees: 15-40% depending on tier",
          "Race-to-bottom pricing pressure",
          "Limited to logo/branding/web design",
          "Time-intensive with low win rates"
        ]
      },
      bestFor: "Best for: Logo designers and branding specialists willing to create spec work, beginners building portfolios, and designers who excel at rapid iteration."
    },
    cta1: {
      title: "Exploring different design platforms?",
      description: "Compare detailed platform reviews, portfolio features, and find the best match for your design career.",
      button: "Compare More Platforms"
    },
    platform3: {
      title: "Platform #3: Dribbble – Premium Design Portfolio & Job Board",
      intro: "Dribbble is the world's leading design showcase platform where UI/UX designers, illustrators, and product designers display work and connect with clients through a job board and direct inquiries.",
      prosConsTitle: "Dribbble for Designers: Pros & Cons",
      pros: {
        title: "Pros",
        items: [
          "Premium portfolio showcase",
          "High-quality client inquiries",
          "Startup and agency clients",
          "Passive income (clients find you)",
          "Community and networking benefits",
          "Project rates: $1,000-$15,000+"
        ]
      },
      cons: {
        title: "Cons",
        items: [
          "Pro membership required ($5/month)",
          "Lower project volume than Upwork",
          "Requires exceptional portfolio quality",
          "Saturated with top-tier designers",
          "Focus on UI/UX and digital design"
        ]
      },
      bestFor: "Best for: UI/UX designers with strong portfolios, product designers targeting startups, and designers who prefer inbound client acquisition over active pitching."
    },
    platform4: {
      title: "Platform #4: Toptal – Elite Design Network",
      intro: "Toptal is an exclusive talent network accepting only the top 3% of design applicants. It connects elite designers with Fortune 500 companies, unicorn startups, and high-growth tech companies.",
      prosConsTitle: "Toptal for Designers: Pros & Cons",
      pros: {
        title: "Pros",
        items: [
          "Premium rates: $60-$200+/hour",
          "Zero platform fees (100% earnings)",
          "Enterprise clients (Airbnb, Zendesk, JPMorgan)",
          "Curated client matching (no bidding)",
          "Long-term engagements (3-12+ months)",
          "Strategic design projects"
        ]
      },
      cons: {
        title: "Cons",
        items: [
          "Rigorous 5-step vetting (2-5 weeks)",
          "Only top 3% acceptance rate",
          "Requires 5+ years senior experience",
          "Live design challenges in interview",
          "Limited project volume (curated)"
        ]
      },
      bestFor: "Best for: Elite designers with 5+ years experience, product design leaders, UX strategists, and designers targeting enterprise clients and premium rates."
    },
    platform5: {
      title: "Platform #5: Behance (Adobe) – Creative Portfolio Network",
      intro: "Behance is Adobe's creative portfolio platform showcasing work from illustrators, graphic designers, photographers, and motion designers. While primarily a portfolio host, it includes job boards and client inquiries.",
      keyFeatures: {
        title: "Key Features",
        items: [
          { label: "Free Portfolio Hosting:", text: "Unlimited projects and case studies" },
          { label: "Adobe Integration:", text: "Direct upload from Creative Cloud apps" },
          { label: "Creative Job Board:", text: "Agency and in-house positions" },
          { label: "Community Features:", text: "Appreciations, comments, follows" },
          { label: "Best for:", text: "Portfolio hosting and brand building, not direct freelance work" }
        ]
      }
    },
    recommendations: {
      title: "Which Platform Should Designers Choose?",
      subtitle: "Platform Recommendations by Design Specialty",
      uiux: {
        title: "UI/UX Designers",
        primary: "Primary: Dribbble Pro",
        secondary: "Secondary: Upwork (for consistent work)",
        goal: "Goal: Toptal (after 5+ years)",
        note: "Showcase premium work on Dribbble, fill gaps with Upwork projects"
      },
      branding: {
        title: "Logo & Branding Specialists",
        primary: "Primary: Upwork",
        secondary: "Secondary: 99designs (1-on-1 projects only)",
        avoid: "Avoid: 99designs contests (low ROI)",
        note: "Focus on 1-on-1 relationships for sustainable income"
      },
      graphic: {
        title: "Graphic Designers (Print/Digital)",
        primary: "Primary: Upwork",
        portfolio: "Portfolio: Behance + Dribbble",
        volume: "Volume: Fiverr (for quick projects)",
        note: "Diversify across platforms for consistent work"
      },
      elite: {
        title: "Elite Product Designers",
        primary: "Primary: Toptal (if accepted)",
        secondary: "Secondary: Dribbble Pro",
        backup: "Backup: Upwork (premium clients only)",
        note: "Target enterprise clients and strategic design work"
      }
    },
    multiPlatform: {
      title: "Multi-Platform Strategy for Designers",
      subtitle: "The 3-Platform System",
      step1: {
        title: "Portfolio Platform (Free):",
        description: "Behance or Dribbble for showcasing best work and SEO visibility"
      },
      step2: {
        title: "Primary Income Platform:",
        description: "Upwork or Dribbble Pro ($5/month) for consistent client flow"
      },
      step3: {
        title: "Premium Goal Platform:",
        description: "Apply to Toptal once you've reached 5+ years and $100+/hour rates"
      }
    },
    finalVerdict: {
      title: "Final Verdict",
      mostDesigners: "For most designers: Start with Upwork to build your client base and income. Simultaneously showcase work on Behance (free) or Dribbble Pro ($5/month) for portfolio visibility. Once you're earning $5,000+/month and have 5+ years experience, apply to Toptal for 2-3x rate increase.",
      uiuxSpecialists: "For UI/UX specialists: Dribbble Pro offers the best balance of portfolio showcase and high-quality client inquiries. Supplement with Upwork during slower periods.",
      avoid: "Avoid: Contest-based platforms like 99designs unless you're building an initial portfolio. The time investment rarely justifies the potential earnings compared to direct client work."
    },
    ctaSection: {
      title: "Ready to Launch Your Design Career?",
      description: "Explore comprehensive platform reviews and start earning as a freelance designer today.",
      button: "Browse All Platforms"
    },
    relatedComparisons: {
      title: "Related Platform Comparisons",
      writers: {
        title: "Best Platform for Writers",
        description: "Detailed writer platform comparison"
      },
      upworkFiverr: {
        title: "Upwork vs Fiverr",
        description: "Which platform is best for freelancers?"
      },
      toptalUpwork: {
        title: "Toptal vs Upwork",
        description: "Elite network vs mass marketplace"
      }
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: locale === "nl"
      ? "Beste Freelance Platform voor Designers 2025: Volledige Gids"
      : "Best Freelance Platform for Designers 2025: Complete Guide",
    description: locale === "nl"
      ? "Vergelijk Upwork, 99designs, Dribbble en Behance voor freelance designwerk. Vind het platform met de beste tarieven, projecten en portfolio exposure."
      : "Compare Upwork, 99designs, Dribbble, and Behance for freelance design work. Find the platform that offers the best rates, projects, and portfolio exposure.",
    datePublished: "2025-01-15",
    dateModified: "2025-01-15",
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
                {content.hero.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {content.hero.description}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-heading font-semibold hover:bg-primary-dark transition-colors shadow-lg"
                >
                  {content.hero.cta1}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/reviews`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-gray-800 text-primary dark:text-accent border-2 border-primary dark:border-accent font-heading font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {content.hero.cta2}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Comparison Table */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8 text-center">
                {content.comparisonTable.title}
              </h2>
              <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-heading font-semibold text-gray-900 dark:text-white">{content.comparisonTable.headers.feature}</th>
                      <th className="px-4 py-4 text-left text-sm font-heading font-semibold text-primary dark:text-accent">Upwork</th>
                      <th className="px-4 py-4 text-left text-sm font-heading font-semibold text-primary dark:text-accent">99designs</th>
                      <th className="px-4 py-4 text-left text-sm font-heading font-semibold text-primary dark:text-accent">Dribbble</th>
                      <th className="px-4 py-4 text-left text-sm font-heading font-semibold text-primary dark:text-accent">Toptal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr className="bg-white dark:bg-gray-800">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{content.comparisonTable.headers.avgRate}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparisonTable.upwork.avgRate}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparisonTable.designs99.avgRate}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparisonTable.dribbble.avgRate}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparisonTable.toptal.avgRate}</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{content.comparisonTable.headers.platformFee}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparisonTable.upwork.platformFee}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparisonTable.designs99.platformFee}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparisonTable.dribbble.platformFee}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparisonTable.toptal.platformFee}</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{content.comparisonTable.headers.projectType}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparisonTable.upwork.projectType}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparisonTable.designs99.projectType}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparisonTable.dribbble.projectType}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparisonTable.toptal.projectType}</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{content.comparisonTable.headers.portfolio}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparisonTable.upwork.portfolio}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparisonTable.designs99.portfolio}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparisonTable.dribbble.portfolio}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparisonTable.toptal.portfolio}</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{content.comparisonTable.headers.clientQuality}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparisonTable.upwork.clientQuality}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparisonTable.designs99.clientQuality}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparisonTable.dribbble.clientQuality}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparisonTable.toptal.clientQuality}</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{content.comparisonTable.headers.bestFor}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparisonTable.upwork.bestFor}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparisonTable.designs99.bestFor}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparisonTable.dribbble.bestFor}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparisonTable.toptal.bestFor}</td>
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
                  {content.platform1.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {content.platform1.intro}
                </p>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 my-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">{content.platform1.prosConsTitle}</h4>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-heading font-semibold text-accent mb-3">{content.platform1.pros.title}</h5>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        {content.platform1.pros.items.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-accent mt-1">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-heading font-semibold text-primary mb-3">{content.platform1.cons.title}</h5>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        {content.platform1.cons.items.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">✗</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  <strong>{content.platform1.bestFor}</strong>
                </p>

                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 mt-12">
                  {content.platform2.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {content.platform2.intro}
                </p>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 my-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">{content.platform2.prosConsTitle}</h4>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-heading font-semibold text-accent mb-3">{content.platform2.pros.title}</h5>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        {content.platform2.pros.items.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-accent mt-1">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-heading font-semibold text-primary mb-3">{content.platform2.cons.title}</h5>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        {content.platform2.cons.items.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">✗</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  <strong>{content.platform2.bestFor}</strong>
                </p>

                <div className="bg-accent/10 dark:bg-accent/20 border-l-4 border-accent rounded-r-lg p-6 my-8">
                  <p className="text-gray-900 dark:text-white font-semibold mb-2">
                    {content.cta1.title}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {content.cta1.description}
                  </p>
                  <Link
                    href={`/${locale}/comparisons`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white font-heading font-semibold hover:bg-accent-dark transition-colors"
                  >
                    {content.cta1.button}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 mt-12">
                  {content.platform3.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {content.platform3.intro}
                </p>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 my-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">{content.platform3.prosConsTitle}</h4>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-heading font-semibold text-accent mb-3">{content.platform3.pros.title}</h5>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        {content.platform3.pros.items.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-accent mt-1">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-heading font-semibold text-primary mb-3">{content.platform3.cons.title}</h5>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        {content.platform3.cons.items.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">✗</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  <strong>{content.platform3.bestFor}</strong>
                </p>

                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 mt-12">
                  {content.platform4.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {content.platform4.intro}
                </p>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 my-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">{content.platform4.prosConsTitle}</h4>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-heading font-semibold text-accent mb-3">{content.platform4.pros.title}</h5>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        {content.platform4.pros.items.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-accent mt-1">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-heading font-semibold text-primary mb-3">{content.platform4.cons.title}</h5>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        {content.platform4.cons.items.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">✗</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  <strong>{content.platform4.bestFor}</strong>
                </p>

                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 mt-12">
                  {content.platform5.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {content.platform5.intro}
                </p>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 my-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">{content.platform5.keyFeatures.title}</h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    {content.platform5.keyFeatures.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className={index < 4 ? "text-accent mt-1" : "text-primary mt-1"}>{index < 4 ? "✓" : "•"}</span>
                        <span><strong>{item.label}</strong> {item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  {content.recommendations.title}
                </h2>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 my-6 border-2 border-accent dark:border-accent">
                  <h4 className="text-xl font-heading font-bold text-accent mb-4">{content.recommendations.subtitle}</h4>

                  <div className="space-y-6">
                    <div>
                      <h5 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">{content.recommendations.uiux.title}</h5>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        <strong>{content.recommendations.uiux.primary}</strong><br />
                        <strong>{content.recommendations.uiux.secondary}</strong><br />
                        <strong>{content.recommendations.uiux.goal}</strong>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        {content.recommendations.uiux.note}
                      </p>
                    </div>

                    <div>
                      <h5 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">{content.recommendations.branding.title}</h5>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        <strong>{content.recommendations.branding.primary}</strong><br />
                        <strong>{content.recommendations.branding.secondary}</strong><br />
                        <strong>{content.recommendations.branding.avoid}</strong>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        {content.recommendations.branding.note}
                      </p>
                    </div>

                    <div>
                      <h5 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">{content.recommendations.graphic.title}</h5>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        <strong>{content.recommendations.graphic.primary}</strong><br />
                        <strong>{content.recommendations.graphic.portfolio}</strong><br />
                        <strong>{content.recommendations.graphic.volume}</strong>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        {content.recommendations.graphic.note}
                      </p>
                    </div>

                    <div>
                      <h5 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">{content.recommendations.elite.title}</h5>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        <strong>{content.recommendations.elite.primary}</strong><br />
                        <strong>{content.recommendations.elite.secondary}</strong><br />
                        <strong>{content.recommendations.elite.backup}</strong>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        {content.recommendations.elite.note}
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {content.multiPlatform.title}
                </h3>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 my-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">{content.multiPlatform.subtitle}</h4>
                  <ol className="space-y-3 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="font-heading font-bold text-primary dark:text-accent mt-0.5">1.</span>
                      <div>
                        <strong className="text-gray-900 dark:text-white">{content.multiPlatform.step1.title}</strong>
                        <p className="text-sm mt-1">{content.multiPlatform.step1.description}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-heading font-bold text-primary dark:text-accent mt-0.5">2.</span>
                      <div>
                        <strong className="text-gray-900 dark:text-white">{content.multiPlatform.step2.title}</strong>
                        <p className="text-sm mt-1">{content.multiPlatform.step2.description}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-heading font-bold text-primary dark:text-accent mt-0.5">3.</span>
                      <div>
                        <strong className="text-gray-900 dark:text-white">{content.multiPlatform.step3.title}</strong>
                        <p className="text-sm mt-1">{content.multiPlatform.step3.description}</p>
                      </div>
                    </li>
                  </ol>
                </div>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {content.finalVerdict.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {content.finalVerdict.mostDesigners}
                </p>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {content.finalVerdict.uiuxSpecialists}
                </p>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {content.finalVerdict.avoid}
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
                {content.ctaSection.title}
              </h2>
              <p className="text-lg mb-8 opacity-90">
                {content.ctaSection.description}
              </p>
              <Link
                href={`/${locale}/platforms`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-primary font-heading font-bold hover:bg-gray-100 transition-colors shadow-xl text-lg"
              >
                {content.ctaSection.button}
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
                {content.relatedComparisons.title}
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  href={`/${locale}/resources/best-platform-writers`}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-colors"
                >
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">
                    {content.relatedComparisons.writers.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {content.relatedComparisons.writers.description}
                  </p>
                </Link>
                <Link
                  href={`/${locale}/resources/upwork-vs-fiverr`}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-colors"
                >
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">
                    {content.relatedComparisons.upworkFiverr.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {content.relatedComparisons.upworkFiverr.description}
                  </p>
                </Link>
                <Link
                  href={`/${locale}/resources/toptal-vs-upwork`}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-colors"
                >
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">
                    {content.relatedComparisons.toptalUpwork.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {content.relatedComparisons.toptalUpwork.description}
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
