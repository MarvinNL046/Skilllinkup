import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const slug = 'freelance-pricing-strategies';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

  if (locale === 'nl') {
    return {
      title: "Prijsstrategieën voor Freelancers: Vast Tarief vs Uurtarief",
      description: "Kies het juiste prijsmodel voor je freelance business. Vergelijk vast tarief, uurtarief, retainers en waarde-gebaseerde prijzen met voorbeelden.",
      keywords: "prijzen bepalen freelancer, vast tarief vs uurtarief, waarde-gebaseerde prijzen, freelance tariefmodellen, ZZP tarieven",
      openGraph: {
        title: "Prijsstrategieën voor Freelancers: Vast Tarief vs Uurtarief",
        description: "Beheers freelance prijsmodellen. Leer wanneer je vast tarief, uurtarief, retainer of waarde-gebaseerde prijzen gebruikt voor maximale winst.",
        url: pageUrl,
        siteName: 'SkillLinkup',
        images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Prijsstrategieën voor Freelancers: Vast Tarief vs Uurtarief' }],
        locale: "nl_NL",
        type: "article",
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Prijsstrategieën voor Freelancers: Vast Tarief vs Uurtarief',
        description: 'Kies het juiste prijsmodel voor je freelance business. Vergelijk vast tarief, uurtarief, retainers.',
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
    title: "Freelance Pricing Strategies: Fixed-Price vs Hourly Billing",
    description: "Choose the right pricing model for your freelance business. Compare fixed-price, hourly, retainers, and value-based pricing with real examples.",
    keywords: "freelance pricing strategies, fixed price vs hourly, value-based pricing, freelance billing models, project pricing",
    openGraph: {
      title: "Freelance Pricing Strategies: Fixed-Price vs Hourly Billing",
      description: "Master freelance pricing models. Learn when to use fixed-price, hourly, retainer, or value-based pricing for maximum profitability.",
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Freelance Pricing Strategies: Fixed-Price vs Hourly Billing' }],
      locale: 'en_US',
      type: "article",
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Freelance Pricing Strategies: Fixed-Price vs Hourly Billing',
      description: 'Choose the right pricing model for your freelance business. Compare fixed-price, hourly, retainers.',
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

export default async function FreelancePricingStrategiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const content = locale === 'nl' ? {
    hero: {
      h1: "Prijsstrategieën voor Freelancers: Vast Tarief vs Uurtarief",
      intro: "Kies het juiste prijsmodel om je inkomen te maximaliseren, je tijd te beschermen en een duurzame freelance business op te bouwen.",
      cta1: "Bereken Je Tarief",
      cta2: "Vergelijk Platforms"
    },
    intro: "Het kiezen van de juiste prijsstrategie is één van de meest cruciale beslissingen die je als freelancer neemt. Het verschil tussen uurtarief en vaste prijzen kan duizenden euro's per jaar betekenen—en heeft grote impact op je work-life balans. Deze uitgebreide gids legt de vier belangrijkste prijsstrategieën uit, wanneer je welke gebruikt, en hoe je de winstgevendheid maximaliseert met elk model.",
    section1: {
      title: "De 4 Belangrijkste Freelance Prijsmodellen",
      models: [
        {
          title: "Uurtarief",
          desc: "Declareer klanten per gewerkt uur. Simpel en transparant, maar beperkt je verdienpotentieel.",
          best: "Geschikt voor: Doorlopend werk",
          risk: "Risico: Laag"
        },
        {
          title: "Vast Tarief",
          desc: "Eén prijs voor het hele project. Hoog winstpotentieel als je efficiënt bent.",
          best: "Geschikt voor: Gedefinieerde projecten",
          risk: "Risico: Gemiddeld"
        },
        {
          title: "Retainer Model",
          desc: "Maandelijkse vergoeding voor gegarandeerde beschikbaarheid en vaste uren. Zorgt voor stabiel inkomen.",
          best: "Geschikt voor: Vaste klanten",
          risk: "Risico: Laag"
        },
        {
          title: "Waarde-Gebaseerd",
          desc: "Prijzen gebaseerd op de waarde die je levert aan de klant, niet op je tijd. Hoogste winstpotentieel.",
          best: "Geschikt voor: Strategisch werk",
          risk: "Risico: Hoog"
        }
      ]
    },
    section2: {
      title: "Uurtarief: Het Traditionele Freelance Model",
      subtitle: "Hoe Uurtarief Werkt",
      desc: "Je stelt een uurtarief vast en registreert alle tijd die je aan klantwerk besteedt. Aan het einde van de factureringsperiode (meestal wekelijks of maandelijks) factureer je de klant voor het totaal aantal gewerkte uren.",
      advantages: {
        title: "Voordelen:",
        items: [
          "Eenvoudig te begrijpen en uit te leggen",
          "Laag risico voor scope creep",
          "Eerlijk voor beide partijen",
          "Ideaal bij onduidelijke scope",
          "Makkelijk aan te passen bij wijzigingen"
        ]
      },
      disadvantages: {
        title: "Nadelen:",
        items: [
          "Inkomen gekoppeld aan gewerkte uren",
          "Gestraft voor efficiëntie",
          "Vereist gedetailleerde tijdregistratie",
          "Klanten kunnen uren micromanagen",
          "Beperkt verdienpotentieel"
        ]
      },
      example: {
        title: "Echt Voorbeeld: Webontwikkelaar met Uurtarief",
        rate: "Tarief: €75/uur",
        project: "Project: E-commerce website redesign",
        estimate: "Initiële schatting: 40 uur (€3.000)",
        actual: "Daadwerkelijke tijd: 55 uur (klant voegde functies toe)",
        invoice: "Eindfa ctuur: €4.125",
        result: "Resultaat: Je wordt gecompenseerd voor scope creep, maar je verdiensten zijn nog steeds beperkt tot gewerkte uren."
      },
      when: {
        title: "Wanneer Uurtarief Gebruiken:",
        items: [
          "Nieuwe klanten waar vertrouwen nog niet is opgebouwd",
          "Projecten met onduidelijke scope",
          "Doorlopend onderhoud en support",
          "Consultancy en advieswerk",
          "Wanneer je een nieuwe skill leert",
          "Platformvereisten (veel platforms vereisen uurtarief)"
        ]
      }
    },
    cta1: {
      title: "Registreer Je Uren Professioneel",
      desc: "Nauwkeurige tijdregistratie is cruciaal voor uurtarief. Probeer onze gratis time tracker.",
      button: "Start Tijdregistratie"
    },
    section3: {
      title: "Vast Tarief Projecten: Hoog Risico, Hoge Beloning",
      subtitle: "Hoe Vast Tarief Werkt",
      desc: "Je geeft één prijs voor het hele project gebaseerd op deliverables. Of het je nu 20 uur of 50 uur kost, de prijs blijft hetzelfde. Dit model beloont efficiëntie en expertise.",
      formula: {
        title: "Vast Tarief Formule voor Succes",
        calc: "Vast Tarief = (Geschatte Uren × Uurtarief) × 1,5",
        desc: "De 1,5 vermenigvuldiger (50% buffer) beschermt je tegen:",
        items: [
          "Scope creep en extra klantwensen",
          "Onderschatting van projectcomplexiteit",
          "Meerdere revisierondes",
          "Communicatie en projectmanagement tijd"
        ]
      },
      example: {
        title: "Echt Voorbeeld: Grafisch Ontwerper met Vast Tarief",
        quote: "Offerte: €5.000 voor complete merkidentiteit",
        deliverables: "Deliverables: Logo, kleurenpalet, typografie, merkrichtlijnen",
        estimate: "Geschatte tijd: 60 uur (€83/uur equivalent)",
        actual: "Daadwerkelijke tijd: 45 uur (dankzij templates en ervaring)",
        effective: "Effectief uurtarief: €111/uur",
        result: "Resultaat: Je verdiende 34% meer dan met uurtarief door efficiënt te zijn!"
      }
    },
    section4: {
      title: "Retainer Model: De Heilige Graal van Freelance Inkomen",
      desc: "Een retainer is een terugkerend maandelijks bedrag waarbij een klant je betaalt voor gegarandeerde beschikbaarheid en een vastgestelde hoeveelheid werk. Het is de meest stabiele vorm van freelance inkomen en zeer gewild.",
      types: [
        {
          title: "Uren-Gebaseerde Retainer",
          desc: "Klant betaalt voor X uur per maand tegen een vast tarief.",
          example: "Voorbeeld: €3.000/maand voor 40 uur",
          rate: "Effectief tarief: €75/uur"
        },
        {
          title: "Waarde-Gebaseerde Retainer",
          desc: "Klant betaalt voor resultaten en beschikbaarheid, niet voor uren.",
          example: "Voorbeeld: €5.000/maand voor social media management",
          rate: "Onbeperkt waardepotentieel"
        },
        {
          title: "Project Retainer",
          desc: "Maandelijks bedrag dekt terugkerende deliverables.",
          example: "Voorbeeld: €2.500/maand voor 4 blogposts",
          rate: "Voorspelbare werkbelasting"
        }
      ],
      why: {
        title: "Waarom Retainers Zo Waardevol Zijn",
        benefits: [
          "Voorspelbaar inkomen: Geen feast-or-famine cycli",
          "Terugkerende omzet: Samengesteld inkomen in de loop der tijd",
          "Minder salesetijd: Geen constant klanten zoeken",
          "Diepere relaties: Betere kwaliteit werk",
          "Premium prijzen: 10-20% hogere tarieven",
          "Business schaalbaarheid: Fundament voor groei"
        ]
      }
    },
    cta2: {
      title: "Klaar om Je Tarieven te Verhogen?",
      desc: "Leer bewezen onderhandelingstactieken om je verdiensten te verhogen op elk platform",
      button: "Leer Onderhandelingstactieken"
    },
    section5: {
      title: "Waarde-Gebaseerde Prijzen: Maximaal Verdienpotentieel",
      desc: "Waarde-gebaseerde prijzen is de praktijk van het vaststellen van prijzen gebaseerd op de waargenomen waarde voor de klant, niet op de kosten van de dienst of bestede tijd. Zo verdienen top-tier freelancers €10.000+ voor projecten die 20 uur duren.",
      formula: "Prijs = Klantwaarde × Jouw Bijdrage",
      example: {
        title: "Echt Waarde-Gebaseerd Prijzen Voorbeeld",
        scenario: "Scenario: Een marketingconsultant helpt een e-commerce bedrijf conversieratio's te verbeteren.",
        metrics: {
          title: "Bedrijfsstatistieken Klant:",
          items: [
            "Maandelijkse omzet: €100.000",
            "Huidige conversieratio: 2%",
            "Gemiddelde bestelwaarde: €150"
          ]
        },
        contribution: {
          title: "Jouw Bijdrage:",
          items: [
            "Verbetering conversie naar 3%",
            "Toegevoegde maandelijkse omzet: €50.000",
            "Jaarlijkse impact: €600.000"
          ]
        },
        fee: "Jouw vergoeding: €15.000",
        percentage: "(2,5% van toegevoegde jaarwaarde — klant krijgt 97,5% van de waarde)",
        time: "Bestede tijd: 30 uur",
        effective: "Effectief tarief: €500/uur"
      },
      when: {
        title: "Wanneer Waarde-Gebaseerd Werkt:",
        items: [
          "Meetbare business impact (omzet, kostenbesparingen, conversies)",
          "Strategisch werk (geen uitvoerende taken)",
          "High-stakes projecten met grote impact",
          "Ervaren freelancer met bewezen track record",
          "Klant begrijpt en waardeert het resultaat"
        ]
      }
    },
    section6: {
      title: "Welk Prijsmodel Moet Je Kiezen?",
      table: {
        headers: ["Situatie", "Beste Model", "Waarom"],
        rows: [
          ["Nieuwe freelancer", "Uurtarief", "Laag risico tijdens leerperiode"],
          ["Onduidelijke projectscope", "Uurtarief", "Beschermt tegen scope creep"],
          ["Herhaalbare dienst", "Vast Tarief", "Hoge winst door efficiëntie"],
          ["Langdurige klant", "Retainer", "Stabiel terugkerend inkomen"],
          ["High-impact strategisch werk", "Waarde-Gebaseerd", "Maximaal verdienpotentieel"],
          ["Complex enterprise project", "Uurtarief", "Meerdere stakeholders, wijzigingen"],
          ["Merkidentiteit ontwerp", "Vast Tarief", "Duidelijke deliverables, proces"]
        ]
      }
    },
    related: {
      title: "Gerelateerde Prijzen Resources",
      links: [
        {
          title: "Bereken Je Uurtarief",
          desc: "Gebruik onze bewezen formule om een winstgevend uurtarief vast te stellen",
          link: `/${locale}/resources/calculate-freelance-hourly-rate`
        },
        {
          title: "Upwork Prijstactieken",
          desc: "Platform-specifieke strategieën om je verdiensten te maximaliseren",
          link: `/${locale}/resources/upwork-pricing-tactics`
        },
        {
          title: "Begrijp Platform Kosten",
          desc: "Prijs om netto verdienste te maximaliseren na fees",
          link: `/${locale}/resources/platform-fees-maximize-earnings`
        }
      ]
    },
    finalCta: {
      title: "Vergelijk Platform Kosten om Je Verdiensten te Maximaliseren",
      desc: "Verschillende platforms hebben verschillende kostenstructuren. Kies de juiste voor jouw prijsmodel.",
      button: "Vergelijk Platforms Nu"
    }
  } : {
    hero: {
      h1: "Freelance Pricing Strategies: Fixed-Price vs. Hourly Billing",
      intro: "Choose the right pricing model to maximize your income, protect your time, and build a sustainable freelance business.",
      cta1: "Calculate Your Rate",
      cta2: "Compare Platforms"
    },
    intro: "Choosing the right pricing strategy is one of the most critical decisions you'll make as a freelancer. The difference between hourly billing and fixed-price projects can mean thousands of dollars in annual income—and significantly impact your work-life balance. This comprehensive guide breaks down the four main pricing strategies, when to use each one, and how to maximize profitability with every model.",
    section1: {
      title: "The 4 Main Freelance Pricing Models",
      models: [
        {
          title: "Hourly Billing",
          desc: "Charge clients for every hour you work. Simple, transparent, but can limit earning potential.",
          best: "Best for: Ongoing work",
          risk: "Risk: Low"
        },
        {
          title: "Fixed-Price",
          desc: "Set one price for the entire project. High profit potential if you're efficient.",
          best: "Best for: Defined projects",
          risk: "Risk: Medium"
        },
        {
          title: "Retainer Model",
          desc: "Monthly fee for guaranteed availability and set hours. Provides stable income.",
          best: "Best for: Regular clients",
          risk: "Risk: Low"
        },
        {
          title: "Value-Based",
          desc: "Price based on the value you deliver to the client, not time spent. Highest profit potential.",
          best: "Best for: Strategic work",
          risk: "Risk: High"
        }
      ]
    },
    section2: {
      title: "Hourly Billing: The Traditional Freelance Model",
      subtitle: "How Hourly Billing Works",
      desc: "You set an hourly rate and track all time spent on client work. At the end of the billing period (usually weekly or monthly), you invoice the client for total hours worked.",
      advantages: {
        title: "Advantages:",
        items: [
          "Simple to understand and explain",
          "Low risk for scope creep",
          "Fair for both parties",
          "Ideal for uncertain scope",
          "Easy to adjust for changes"
        ]
      },
      disadvantages: {
        title: "Disadvantages:",
        items: [
          "Income tied to hours worked",
          "Penalized for efficiency",
          "Requires detailed time tracking",
          "Clients may micromanage hours",
          "Limited earning potential"
        ]
      },
      example: {
        title: "Real Example: Web Developer on Hourly Billing",
        rate: "Rate: $75/hour",
        project: "Project: E-commerce website redesign",
        estimate: "Initial estimate: 40 hours ($3,000)",
        actual: "Actual time: 55 hours (client added features)",
        invoice: "Final invoice: $4,125",
        result: "Result: You're compensated for scope creep, but your earning is still limited to hours worked."
      },
      when: {
        title: "When to Use Hourly Billing:",
        items: [
          "New clients where trust isn't established",
          "Projects with unclear scope",
          "Ongoing maintenance and support",
          "Consulting and advisory work",
          "When you're learning a new skill",
          "Platform requirements (many require hourly)"
        ]
      }
    },
    cta1: {
      title: "Track Your Hours Like a Pro",
      desc: "Accurate time tracking is crucial for hourly billing. Try our free time tracker.",
      button: "Start Tracking Time"
    },
    section3: {
      title: "Fixed-Price Projects: High Risk, High Reward",
      subtitle: "How Fixed-Price Works",
      desc: "You quote a single price for the entire project based on deliverables. Whether it takes you 20 hours or 50 hours, the price remains the same. This model rewards efficiency and expertise.",
      formula: {
        title: "Fixed-Price Formula for Success",
        calc: "Fixed Price = (Estimated Hours × Hourly Rate) × 1.5",
        desc: "The 1.5 multiplier (50% buffer) protects you from:",
        items: [
          "Scope creep and additional client requests",
          "Underestimation of project complexity",
          "Multiple revision rounds",
          "Communication and project management time"
        ]
      },
      example: {
        title: "Real Example: Graphic Designer on Fixed-Price",
        quote: "Quote: $5,000 for complete brand identity",
        deliverables: "Deliverables: Logo, color palette, typography, brand guidelines",
        estimate: "Estimated time: 60 hours (at $83/hour equivalent)",
        actual: "Actual time: 45 hours (due to templates and experience)",
        effective: "Effective hourly rate: $111/hour",
        result: "Result: You earned 34% more than hourly billing by being efficient!"
      }
    },
    section4: {
      title: "Retainer Model: The Holy Grail of Freelance Income",
      desc: "A retainer is a recurring monthly fee where a client pays you for guaranteed availability and a set amount of work. It's the most stable form of freelance income and highly sought after.",
      types: [
        {
          title: "Hours-Based Retainer",
          desc: "Client pays for X hours per month at a set rate.",
          example: "Example: $3,000/month for 40 hours",
          rate: "Effective rate: $75/hour"
        },
        {
          title: "Value-Based Retainer",
          desc: "Client pays for outcomes and availability, not hours.",
          example: "Example: $5,000/month for social media management",
          rate: "Unlimited value potential"
        },
        {
          title: "Project Retainer",
          desc: "Monthly fee covers recurring deliverables.",
          example: "Example: $2,500/month for 4 blog posts",
          rate: "Predictable workload"
        }
      ],
      why: {
        title: "Why Retainers Are So Valuable",
        benefits: [
          "Predictable income: No feast-or-famine cycles",
          "Recurring revenue: Compound income over time",
          "Less sales time: No constant client hunting",
          "Deeper relationships: Better quality work",
          "Premium pricing: 10-20% higher rates",
          "Business scalability: Foundation for growth"
        ]
      }
    },
    cta2: {
      title: "Ready to Raise Your Rates?",
      desc: "Learn proven negotiation tactics to increase your earnings on any platform",
      button: "Learn Negotiation Tactics"
    },
    section5: {
      title: "Value-Based Pricing: Maximum Earning Potential",
      desc: "Value-based pricing is the practice of setting prices based on the perceived value to the customer rather than on the cost of the service or time spent. This is how top-tier freelancers earn $10,000+ for projects that take 20 hours.",
      formula: "Price = Client Value × Your Contribution",
      example: {
        title: "Real Value-Based Pricing Example",
        scenario: "Scenario: A marketing consultant helps an e-commerce business improve conversion rates.",
        metrics: {
          title: "Client's Business Metrics:",
          items: [
            "Monthly revenue: $100,000",
            "Current conversion rate: 2%",
            "Average order value: $150"
          ]
        },
        contribution: {
          title: "Your Contribution:",
          items: [
            "Improve conversion to 3%",
            "Added monthly revenue: $50,000",
            "Annual impact: $600,000"
          ]
        },
        fee: "Your fee: $15,000",
        percentage: "(2.5% of annual value added — client gets 97.5% of value)",
        time: "Time spent: 30 hours",
        effective: "Effective rate: $500/hour"
      },
      when: {
        title: "When Value-Based Works:",
        items: [
          "Measurable business impact (revenue, savings, conversions)",
          "Strategic work (not execution tasks)",
          "High-stakes projects with big impact",
          "Experienced freelancer with proven track record",
          "Client understands and values the outcome"
        ]
      }
    },
    section6: {
      title: "Which Pricing Model Should You Choose?",
      table: {
        headers: ["Situation", "Best Model", "Why"],
        rows: [
          ["New freelancer", "Hourly", "Low risk while learning"],
          ["Unclear project scope", "Hourly", "Protects from scope creep"],
          ["Repeatable service", "Fixed-Price", "High profit from efficiency"],
          ["Long-term client", "Retainer", "Stable recurring income"],
          ["High-impact strategic work", "Value-Based", "Maximum earning potential"],
          ["Complex enterprise project", "Hourly", "Multiple stakeholders, changes"],
          ["Brand identity design", "Fixed-Price", "Clear deliverables, process"]
        ]
      }
    },
    related: {
      title: "Related Pricing Resources",
      links: [
        {
          title: "Calculate Your Hourly Rate",
          desc: "Use our proven formula to set a profitable hourly rate",
          link: `/${locale}/resources/calculate-freelance-hourly-rate`
        },
        {
          title: "Upwork Pricing Tactics",
          desc: "Platform-specific strategies to maximize your earnings",
          link: `/${locale}/resources/upwork-pricing-tactics`
        },
        {
          title: "Understand Platform Fees",
          desc: "Price to maximize take-home pay after fees",
          link: `/${locale}/resources/platform-fees-maximize-earnings`
        }
      ]
    },
    finalCta: {
      title: "Compare Platform Fees to Maximize Your Earnings",
      desc: "Different platforms have different fee structures. Choose the right one for your pricing model.",
      button: "Compare Platforms Now"
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": locale === 'nl' ? "Prijsstrategieën voor Freelancers: Vast Tarief vs Uurtarief" : "Freelance Pricing Strategies: Fixed-Price vs. Hourly Billing",
    "description": locale === 'nl' ? "Complete vergelijking van freelance prijsmodellen inclusief vast tarief, uurtarief, retainers en waarde-gebaseerde prijzen." : "Complete comparison of freelance pricing models including fixed-price, hourly billing, retainers, and value-based pricing.",
    "inLanguage": locale === 'nl' ? "nl" : "en",
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
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {content.hero.h1}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                {content.hero.intro}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/tools/rate-calculator`}
                  className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark px-8 py-4 text-lg font-heading font-semibold text-white transition-all shadow-xl hover:shadow-2xl"
                >
                  {content.hero.cta1}
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 text-secondary px-8 py-4 text-lg font-heading font-semibold transition-all shadow-xl"
                >
                  {content.hero.cta2}
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

            {/* Quick Comparison */}
            <section className="mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">
                {content.section1.title}
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {content.section1.models.map((model, i) => (
                  <div key={i} className={`bg-gradient-to-br ${i === 0 ? 'from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 border-primary/30' : i === 1 ? 'from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 border-accent/30' : i === 2 ? 'from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 border-secondary/30' : 'from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 border-primary/30'} rounded-lg p-6 border-2`}>
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-full ${i === 0 ? 'bg-primary' : i === 1 ? 'bg-accent' : i === 2 ? 'bg-secondary' : 'bg-primary'} flex items-center justify-center text-white font-bold text-xl mr-4`}>
                        {i + 1}
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-secondary dark:text-white">
                        {model.title}
                      </h3>
                    </div>
                    <p className="text-text-secondary dark:text-gray-300 mb-4">
                      {model.desc}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-accent font-semibold">{model.best}</span>
                      <span className="text-text-muted">{model.risk}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Related Resources */}
            <section className="mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">
                {content.related.title}
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {content.related.links.map((link, i) => (
                  <Link key={i} href={link.link} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                    <h3 className="font-heading text-xl font-bold text-secondary dark:text-white mb-3">
                      {link.title}
                    </h3>
                    <p className="text-text-secondary dark:text-gray-300 mb-4">
                      {link.desc}
                    </p>
                    <span className="text-primary hover:underline font-semibold">
                      {locale === 'nl' ? 'Lees Gids →' : 'Read Guide →'}
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Final CTA */}
            <div className="bg-gradient-to-br from-secondary via-secondary-medium to-secondary-light rounded-lg p-8 md:p-12 text-center text-white shadow-xl">
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                {content.finalCta.title}
              </h3>
              <p className="text-xl mb-6 opacity-90">
                {content.finalCta.desc}
              </p>
              <Link
                href={`/${locale}/platforms`}
                className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 text-secondary px-8 py-4 text-lg font-heading font-semibold transition-all shadow-lg"
              >
                {content.finalCta.button}
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
