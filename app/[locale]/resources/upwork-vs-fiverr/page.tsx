import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  if (locale === 'nl') {
    return {
      title: "Upwork of Fiverr 2025: Welk Platform is het Beste voor Freelancers?",
      description: "Vergelijk Upwork en Fiverr: prijzen, commissies, projecttypes en welk freelance platform het beste past bij jouw carrière. Complete analyse voor 2025.",
      keywords: "upwork vs fiverr, freelance platform vergelijken, beste freelance site, upwork of fiverr, freelance marktplaats",
      openGraph: {
        title: "Upwork of Fiverr 2025: Welk Platform is het Beste?",
        description: "Vergelijk Upwork en Fiverr: prijzen, commissies en projecttypes. Complete analyse voor 2025.",
        type: "article",
        locale: "nl_NL",
      },
    };
  }

  return {
    title: "Upwork vs Fiverr 2025: Which Platform is Best for Your Career?",
    description: "Compare Upwork and Fiverr side-by-side. Detailed analysis of pricing, fees, features, and which platform suits your freelance career best.",
    keywords: "upwork vs fiverr, freelance platform comparison, best freelance site, upwork or fiverr, freelance marketplace",
    openGraph: {
      title: "Upwork vs Fiverr 2025: Which Platform is Best?",
      description: "Compare Upwork and Fiverr side-by-side. Pricing, fees, features analysis.",
      type: "article",
      locale: "en_US",
    },
  };
}

export default async function UpworkVsFiverrPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const content = locale === 'nl' ? {
    hero: {
      h1: "Upwork vs. Fiverr: Welk Platform is het Beste voor Jouw Freelance Carrière?",
      intro: "Een complete vergelijking van de twee grootste freelance marktplaatsen ter wereld om je te helpen het juiste platform te kiezen voor jouw vaardigheden en doelen.",
      cta1: "Bekijk Alle Platforms",
      cta2: "Lees Reviews"
    },
    comparison: {
      title: "Snelle Vergelijking in één Oogopslag",
      feature: "Kenmerk",
      businessModel: {
        label: "Bedrijfsmodel",
        upwork: "Opdrachtgever plaatst opdrachten",
        fiverr: "Freelancer plaatst diensten"
      },
      platformFee: {
        label: "Platformkosten",
        upwork: "10% (schaalmodel)",
        fiverr: "20% vast tarief"
      },
      bestFor: {
        label: "Beste Voor",
        upwork: "Langetermijnprojecten",
        fiverr: "Snelle diensten"
      },
      projectTypes: {
        label: "Projecttypen",
        upwork: "Uurtarief & Vaste prijs",
        fiverr: "Gig-pakketten"
      },
      connects: {
        label: "Connects/Credits",
        upwork: "Betalen per voorstel",
        fiverr: "Gratis voorstellen"
      },
      protection: {
        label: "Betalingsbescherming",
        upwork: "Escrow-systeem",
        fiverr: "Order-gebaseerde bescherming"
      }
    },
    analysis: {
      mainTitle: "De Kernverschillen Begrijpen",
      intro: "De keuze tussen Upwork en Fiverr is een van de belangrijkste beslissingen die je als freelancer maakt. Hoewel beide platforms freelancers wereldwijd verbinden met opdrachtgevers, werken ze met fundamenteel verschillende bedrijfsmodellen die beïnvloeden hoe je werk vindt, prijzen vaststelt en je carrière opbouwt.",

      businessModelTitle: "Bedrijfsmodel: Opdrachtmarktplaats vs. Dienstencatalogus",
      businessModelUpwork: "Upwork werkt als een traditionele opdrachtmarktplaats waar opdrachtgevers projectbeschrijvingen plaatsen en freelancers voorstellen indienen. Je concurreert met andere freelancers door je unieke waardepropositie te pitchen, relevante ervaring te tonen en tarieven te onderhandelen. Dit model bevoordeelt freelancers die sterk zijn in verkoop, solide portfolio's hebben en hun waarde kunnen verwoorden.",
      businessModelFiverr: "Fiverr draait dit model volledig om. In plaats van te solliciteren op opdrachten, creëer je 'gigs' – voorverpakte diensten met vaste prijzen en te leveren resultaten. Opdrachtgevers bladeren door je dienstencatalogus en kopen direct. Dit model past bij freelancers die passief inkomen verkiezen, duidelijke dienstdefinities en gestandaardiseerde prijsstructuren.",

      pricingTitle: "Prijsstructuur en Kosten: Wat je Daadwerkelijk Overhoudt",
      pricingIntro: "Voor langetermijnrelaties met opdrachtgevers wordt Upwork aanzienlijk winstgevender. Een opdrachtgever die je jaarlijks €50.000 betaalt, kost je ongeveer €2.975 aan kosten (effectief tarief ~6%). Dezelfde inkomsten op Fiverr zouden je €10.000 aan kosten kosten – een verschil van €7.025.",

      projectTypesTitle: "Projecttypen: Complexiteit vs. Eenvoud",
      projectTypesUpworkTitle: "Upwork blinkt uit bij complexe, langetermijnprojecten:",
      projectTypesFiverrTitle: "Fiverr specialiseert zich in snelle diensten:",

      ctaBoxTitle: "Klaar om meer platforms te vergelijken?",
      ctaBoxText: "Ontdek gedetailleerde reviews, functievergelijkingen en vind het perfecte platform voor jouw freelance bedrijf.",
      ctaBoxButton: "Vergelijk Meer Platforms",

      proposalCostsTitle: "Voorstelkosten: Upwork Connects vs. Fiverr's Gratis Model",
      proposalCostsUpwork: "Een van de meest frustrerende aspecten van Upwork is het 'Connects'-systeem. Elk voorstel kost 1-6 Connects (ongeveer €0.15-€0.90), afhankelijk van de complexiteit van het project. Je ontvangt maandelijks 10 gratis Connects, maar extra Connects kosten €0.15 per stuk bij bulkaankoop.",
      proposalCostsFiverr: "Fiverr elimineert deze kosten volledig. Je kunt onbeperkt voorstellen sturen naar kopersverzoeken zonder kosten. Echter, Fiverr's zoekalgoritme geeft prioriteit aan freelancers met betere statistieken, voltooide opdrachten en premium lidmaatschappen, wat andere barrières voor zichtbaarheid creëert.",

      clientQualityTitle: "Opdrachtgeverkwaliteit en Projectbudgetten",
      clientQualityUpwork: "Upwork trekt gevestigde bedrijven, startups en enterprise-klanten aan die bereid zijn professionele tarieven te betalen. Gemiddelde projectwaarden variëren van €500 tot €5.000+, met veel opdrachtgevers die langdurige relaties zoeken. Je vindt Fortune 500-bedrijven, VC-gefinancierde startups en bureaus die gespecialiseerde expertise inhuren.",
      clientQualityFiverr: "Fiverr heeft historisch budgetbewuste kopers aangetrokken die snelle, betaalbare diensten zoeken. Hoewel Fiverr Pro en Business-services nu op opdrachtgevers met hogere budgetten richten, valt de meerderheid van de bestellingen nog steeds in de €50-€500 range. Het platform blinkt uit in volume-gebaseerde bedrijven in plaats van premium prijzen.",

      paymentProtectionTitle: "Betalingsbescherming en Geschillenbeslechting",
      paymentProtectionIntro: "Beide platforms bieden betalingsbescherming, maar met verschillende mechanismen:",
      paymentProtectionUpwork: "Upwork's Escrow-Systeem: Voor vaste prijsprojecten financieren opdrachtgevers mijlpalen vooraf. Voor uurwerk garandeert Upwork's time tracker met schermafbeeldingverificatie freelancers. Betalingsbescherming garandeert dat je betaald wordt voor bijgehouden uren, zelfs als een opdrachtgever verdwijnt of betalingen betwist.",
      paymentProtectionFiverr: "Fiverr's Order-Gebaseerde Bescherming: Wanneer een opdrachtgever een bestelling plaatst, worden fondsen door Fiverr vastgehouden totdat je levert. Opdrachtgevers hebben een beoordelingsperiode van 3 dagen om revisies aan te vragen. Eenmaal goedgekeurd, worden fondsen beschikbaar voor opname. Fiverr's geschillenbeslechting heeft de neiging kopers te bevoordelen, waardoor sterke documentatie van freelancers vereist is.",

      choiceTitle: "Welk Platform Zou Je Moeten Kiezen?",
      chooseUpworkTitle: "Kies Upwork Als Je:",
      chooseUpworkItems: [
        "Gespecialiseerde vaardigheden hebt (development, design, consulting)",
        "Voorkeur geeft aan langetermijnrelaties met opdrachtgevers",
        "Overtuigende voorstellen kunt schrijven",
        "Uurtarief projectopties wilt",
        "Richt op enterprise of mid-market opdrachtgevers"
      ],
      chooseFiverrTitle: "Kies Fiverr Als Je:",
      chooseFiverrItems: [
        "Gestandaardiseerde, herhaalbare diensten aanbiedt",
        "Voorkeur geeft aan passief inkomen (opdrachtgevers vinden jou)",
        "Eenvoudige, pakket-gebaseerde prijzen wilt",
        "Snelle levertijden biedt",
        "Volume-gebaseerde bedrijfsmodellen bouwt"
      ],

      bothPlatformsTitle: "Kun Je Beide Platforms Gebruiken?",
      bothPlatformsText: "Absoluut. Veel succesvolle freelancers onderhouden profielen op beide platforms en gebruiken Upwork voor complexe, hoogwaardige projecten en Fiverr voor gestandaardiseerde diensten die passief inkomen genereren. Deze diversificatiestrategie vermindert platformafhankelijkheid en maximaliseert verdienpotentieel over verschillende opdrachtgeversegmenten.",

      finalVerdictTitle: "Eindoordeel: Welke is Beter?",
      finalVerdictIntro: "Er is geen universele winnaar – het beste platform hangt af van je vaardigheden, bedrijfsmodel en carrièredoelen:",
      finalVerdictItems: [
        "Voor developers, designers en consultants: De hogere budgetten en complexe projecten van Upwork maken het de duidelijke keuze",
        "Voor content creators, grafisch ontwerpers en virtuele assistenten: Fiverr's passieve model en volumepotentieel bieden snellere schaalvergroting",
        "Voor beginners: Fiverr's eenvoudigere interface en gratis voorstellen bieden een gemakkelijker startpunt",
        "Voor ervaren professionals: Upwork's lagere kosten en enterprise-klanten leveren betere langetermijnwaarde"
      ],
      finalVerdictOutro: "Begin met één platform, beheers het en breid dan uit naar anderen zodra je consistent inkomen hebt opgebouwd. Succes op beide platforms vereist optimalisatie, sterke profielen, uitstekende communicatie met opdrachtgevers en continue vaardighedensontwikkeling."
    },
    cta: {
      title: "Meer Platformvergelijkingen Nodig?",
      text: "Ontdek onze uitgebreide reviews en gedetailleerde vergelijkingen om het perfecte freelance platform voor jouw carrière te vinden.",
      button: "Bekijk Alle Platforms"
    },
    related: {
      title: "Gerelateerde Platformvergelijkingen",
      items: [
        {
          title: "Toptal vs Upwork",
          description: "Elite netwerk vs massa marktplaats vergelijking"
        },
        {
          title: "Freelancer.com vs Guru",
          description: "Functie-voor-functie platformanalyse"
        },
        {
          title: "Freelance Tools",
          description: "Essentiële tools voor freelancers"
        }
      ]
    }
  } : {
    hero: {
      h1: "Upwork vs. Fiverr: Which Platform is Best for Your Freelance Career?",
      intro: "A comprehensive comparison of the world's two largest freelance marketplaces to help you choose the right platform for your skills and goals.",
      cta1: "View All Platforms",
      cta2: "Read Reviews"
    },
    comparison: {
      title: "Quick Comparison at a Glance",
      feature: "Feature",
      businessModel: {
        label: "Business Model",
        upwork: "Client-posts-jobs",
        fiverr: "Freelancer-posts-services"
      },
      platformFee: {
        label: "Platform Fee",
        upwork: "10% (sliding scale)",
        fiverr: "20% flat fee"
      },
      bestFor: {
        label: "Best For",
        upwork: "Long-term projects",
        fiverr: "Quick services"
      },
      projectTypes: {
        label: "Project Types",
        upwork: "Hourly & Fixed-price",
        fiverr: "Package-based gigs"
      },
      connects: {
        label: "Connects/Credits",
        upwork: "Pay per proposal",
        fiverr: "Free proposals"
      },
      protection: {
        label: "Payment Protection",
        upwork: "Escrow system",
        fiverr: "Order-based protection"
      }
    },
    analysis: {
      mainTitle: "Understanding the Core Differences",
      intro: "Choosing between Upwork and Fiverr is one of the most important decisions you'll make as a freelancer. While both platforms connect freelancers with clients globally, they operate on fundamentally different business models that affect how you find work, set prices, and build your career.",

      businessModelTitle: "Business Model: Job Marketplace vs. Service Catalog",
      businessModelUpwork: "Upwork operates as a traditional job marketplace where clients post project descriptions and freelancers submit proposals. You're competing with other freelancers by pitching your unique value proposition, showcasing relevant experience, and negotiating rates. This model favors freelancers who excel at sales, have strong portfolios, and can articulate their value.",
      businessModelFiverr: "Fiverr flips this model entirely. Instead of applying to jobs, you create 'gigs' – pre-packaged services with fixed prices and deliverables. Clients browse your service catalog and purchase directly. This model suits freelancers who prefer passive income, clear service definitions, and standardized pricing structures.",

      pricingTitle: "Pricing Structure and Fees: What You Actually Keep",
      pricingIntro: "For long-term client relationships, Upwork becomes significantly more profitable. A client who pays you $50,000 annually would cost you approximately $2,975 in fees (effective rate ~6%). The same earnings on Fiverr would cost you $10,000 in fees – a $7,025 difference.",

      projectTypesTitle: "Project Types: Complexity vs. Simplicity",
      projectTypesUpworkTitle: "Upwork excels at complex, long-term projects:",
      projectTypesFiverrTitle: "Fiverr specializes in quick-turnaround services:",

      ctaBoxTitle: "Ready to compare more platforms?",
      ctaBoxText: "Explore detailed reviews, feature comparisons, and find the perfect platform for your freelance business.",
      ctaBoxButton: "Compare More Platforms",

      proposalCostsTitle: "Proposal Costs: Upwork Connects vs. Fiverr's Free Model",
      proposalCostsUpwork: "One of the most frustrating aspects of Upwork is the 'Connects' system. Each proposal costs 1-6 Connects (approximately $0.15-$0.90), depending on the project's complexity. You receive 10 free Connects monthly, but additional Connects cost $0.15 each when purchased in bulk.",
      proposalCostsFiverr: "Fiverr eliminates this cost entirely. You can send unlimited proposals to buyer requests at no charge. However, Fiverr's search algorithm prioritizes freelancers with better metrics, completed orders, and premium memberships, creating different barriers to visibility.",

      clientQualityTitle: "Client Quality and Project Budgets",
      clientQualityUpwork: "Upwork attracts established businesses, startups, and enterprise clients willing to pay professional rates. Average project values range from $500 to $5,000+, with many clients seeking ongoing relationships. You'll find Fortune 500 companies, VC-backed startups, and agencies hiring for specialized expertise.",
      clientQualityFiverr: "Fiverr has historically attracted budget-conscious buyers seeking quick, affordable services. While Fiverr Pro and Business services now target higher-budget clients, the majority of orders still fall in the $50-$500 range. The platform excels at volume-based businesses rather than premium pricing.",

      paymentProtectionTitle: "Payment Protection and Dispute Resolution",
      paymentProtectionIntro: "Both platforms offer payment protection, but with different mechanisms:",
      paymentProtectionUpwork: "Upwork's Escrow System: For fixed-price projects, clients fund milestones in advance. For hourly work, Upwork's time tracker with screenshot verification protects freelancers. Payment Protection guarantees you'll be paid for tracked hours, even if a client disappears or disputes charges.",
      paymentProtectionFiverr: "Fiverr's Order-Based Protection: When a client places an order, funds are held by Fiverr until you deliver. Clients have a 3-day review period to request revisions. Once approved, funds become available for withdrawal. Fiverr's dispute resolution tends to favor buyers, requiring strong documentation from freelancers.",

      choiceTitle: "Which Platform Should You Choose?",
      chooseUpworkTitle: "Choose Upwork If You:",
      chooseUpworkItems: [
        "Have specialized skills (development, design, consulting)",
        "Prefer long-term client relationships",
        "Can write compelling proposals",
        "Want hourly project options",
        "Target enterprise or mid-market clients"
      ],
      chooseFiverrTitle: "Choose Fiverr If You:",
      chooseFiverrItems: [
        "Offer standardized, repeatable services",
        "Prefer passive income (clients find you)",
        "Want simple, package-based pricing",
        "Provide quick-turnaround deliverables",
        "Build volume-based business models"
      ],

      bothPlatformsTitle: "Can You Use Both Platforms?",
      bothPlatformsText: "Absolutely. Many successful freelancers maintain profiles on both platforms, using Upwork for complex, high-value projects and Fiverr for standardized services that generate passive income. This diversification strategy reduces platform dependency and maximizes earning potential across different client segments.",

      finalVerdictTitle: "Final Verdict: Which is Better?",
      finalVerdictIntro: "There's no universal winner – the best platform depends on your skills, business model, and career goals:",
      finalVerdictItems: [
        "For developers, designers, and consultants: Upwork's higher budgets and complex projects make it the clear choice",
        "For content creators, graphic designers, and virtual assistants: Fiverr's passive model and volume potential offer faster scaling",
        "For beginners: Fiverr's simpler interface and free proposals provide an easier entry point",
        "For experienced professionals: Upwork's lower fees and enterprise clients deliver better long-term value"
      ],
      finalVerdictOutro: "Start with one platform, master it, and then expand to others once you've established consistent income. Success on either platform requires optimization, strong profiles, excellent client communication, and continuous skill development."
    },
    cta: {
      title: "Need More Platform Comparisons?",
      text: "Explore our comprehensive reviews and detailed comparisons to find the perfect freelance platform for your career.",
      button: "Browse All Platforms"
    },
    related: {
      title: "Related Platform Comparisons",
      items: [
        {
          title: "Toptal vs Upwork",
          description: "Elite network vs mass marketplace comparison"
        },
        {
          title: "Freelancer.com vs Guru",
          description: "Feature-by-feature platform analysis"
        },
        {
          title: "Freelance Tools",
          description: "Essential tools for freelancers"
        }
      ]
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: locale === 'nl'
      ? "Upwork of Fiverr 2025: Welk Platform is het Beste voor Freelancers?"
      : "Upwork vs Fiverr 2025: Which Platform is Best for Your Career?",
    description: locale === 'nl'
      ? "Vergelijk Upwork en Fiverr: prijzen, commissies, projecttypes en welk freelance platform het beste past bij jouw carrière. Complete analyse voor 2025."
      : "Compare Upwork and Fiverr side-by-side. Detailed analysis of pricing, fees, features, and which platform suits your freelance career best.",
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
                {content.hero.h1}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {content.hero.intro}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/platforms"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-heading font-semibold hover:bg-primary-dark transition-colors shadow-lg"
                >
                  {content.hero.cta1}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/reviews"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-gray-800 text-primary dark:text-accent border-2 border-primary dark:border-accent font-heading font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {content.hero.cta2}
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
                {content.comparison.title}
              </h2>
              <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-heading font-semibold text-gray-900 dark:text-white">{content.comparison.feature}</th>
                      <th className="px-6 py-4 text-left text-sm font-heading font-semibold text-primary dark:text-accent">Upwork</th>
                      <th className="px-6 py-4 text-left text-sm font-heading font-semibold text-primary dark:text-accent">Fiverr</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{content.comparison.businessModel.label}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.businessModel.upwork}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.businessModel.fiverr}</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{content.comparison.platformFee.label}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.platformFee.upwork}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.platformFee.fiverr}</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{content.comparison.bestFor.label}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.bestFor.upwork}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.bestFor.fiverr}</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{content.comparison.projectTypes.label}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.projectTypes.upwork}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.projectTypes.fiverr}</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{content.comparison.connects.label}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.connects.upwork}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.connects.fiverr}</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{content.comparison.protection.label}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.protection.upwork}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.protection.fiverr}</td>
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
                  {content.analysis.mainTitle}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {content.analysis.intro}
                </p>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {content.analysis.businessModelTitle}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <strong className="text-gray-900 dark:text-white">Upwork</strong> {content.analysis.businessModelUpwork}
                </p>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  <strong className="text-gray-900 dark:text-white">Fiverr</strong> {content.analysis.businessModelFiverr}
                </p>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {content.analysis.pricingTitle}
                </h3>

                {locale === 'en' && (
                  <>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 my-6 border border-gray-200 dark:border-gray-700">
                      <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">Upwork's Sliding Fee Scale</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>20% fee on first $500 with a client</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>10% fee on earnings between $500.01 and $10,000</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>5% fee on earnings above $10,000</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 my-6 border border-gray-200 dark:border-gray-700">
                      <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">Fiverr's Flat Fee Structure</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">✗</span>
                          <span>20% flat fee on all orders regardless of amount</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>Simple, predictable pricing (you keep 80% always)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>No sliding scale or client relationship tracking</span>
                        </li>
                      </ul>
                    </div>
                  </>
                )}

                {locale === 'nl' && (
                  <>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 my-6 border border-gray-200 dark:border-gray-700">
                      <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">Upwork's Schaalmodel Kosten</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>20% kosten op eerste €500 met een opdrachtgever</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>10% kosten op inkomsten tussen €500,01 en €10.000</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>5% kosten op inkomsten boven €10.000</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 my-6 border border-gray-200 dark:border-gray-700">
                      <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">Fiverr's Vaste Kostenstructuur</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">✗</span>
                          <span>20% vaste kosten op alle bestellingen ongeacht bedrag</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>Eenvoudige, voorspelbare prijzen (je houdt altijd 80% over)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>Geen schaalmodel of opdrachtgeversrelatie tracking</span>
                        </li>
                      </ul>
                    </div>
                  </>
                )}

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {content.analysis.pricingIntro}
                </p>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {content.analysis.projectTypesTitle}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <strong className="text-gray-900 dark:text-white">{content.analysis.projectTypesUpworkTitle}</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                  {locale === 'nl' ? (
                    <>
                      <li>Uurcontracten met tijdregistratie</li>
                      <li>Vaste prijsprojecten met mijlpaalbetalingen</li>
                      <li>Doorlopende retainer relaties</li>
                      <li>Multi-maand opdrachten met scope wijzigingen</li>
                      <li>Enterprise opdrachtgevers met complexe vereisten</li>
                    </>
                  ) : (
                    <>
                      <li>Hourly contracts with time tracking</li>
                      <li>Fixed-price projects with milestone payments</li>
                      <li>Ongoing retainer relationships</li>
                      <li>Multi-month engagements with scope changes</li>
                      <li>Enterprise clients with complex requirements</li>
                    </>
                  )}
                </ul>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <strong className="text-gray-900 dark:text-white">{content.analysis.projectTypesFiverrTitle}</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                  {locale === 'nl' ? (
                    <>
                      <li>Logo design pakketten (€50-€500)</li>
                      <li>Content writing bundels (5 artikelen, 7 dagen levertijd)</li>
                      <li>Social media posts (10 posts, 3 dagen doorlooptijd)</li>
                      <li>Video editing diensten (basis/standaard/premium niveaus)</li>
                      <li>Voice-over opnames (per woord of per minuut prijzen)</li>
                    </>
                  ) : (
                    <>
                      <li>Logo design packages ($50-$500)</li>
                      <li>Content writing bundles (5 articles, 7-day delivery)</li>
                      <li>Social media post creation (10 posts, 3-day turnaround)</li>
                      <li>Video editing services (basic/standard/premium tiers)</li>
                      <li>Voiceover recordings (per-word or per-minute pricing)</li>
                    </>
                  )}
                </ul>

                <div className="bg-accent/10 dark:bg-accent/20 border-l-4 border-accent rounded-r-lg p-6 my-8">
                  <p className="text-gray-900 dark:text-white font-semibold mb-2">
                    {content.analysis.ctaBoxTitle}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {content.analysis.ctaBoxText}
                  </p>
                  <Link
                    href="/comparisons"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white font-heading font-semibold hover:bg-accent-dark transition-colors"
                  >
                    {content.analysis.ctaBoxButton}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {content.analysis.proposalCostsTitle}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {content.analysis.proposalCostsUpwork}
                </p>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {content.analysis.proposalCostsFiverr}
                </p>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {content.analysis.clientQualityTitle}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <strong className="text-gray-900 dark:text-white">Upwork</strong> {content.analysis.clientQualityUpwork}
                </p>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  <strong className="text-gray-900 dark:text-white">Fiverr</strong> {content.analysis.clientQualityFiverr}
                </p>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {content.analysis.paymentProtectionTitle}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {content.analysis.paymentProtectionIntro}
                </p>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <strong className="text-gray-900 dark:text-white">{content.analysis.paymentProtectionUpwork}</strong>
                </p>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  <strong className="text-gray-900 dark:text-white">{content.analysis.paymentProtectionFiverr}</strong>
                </p>

                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  {content.analysis.choiceTitle}
                </h2>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-primary dark:border-accent">
                    <h4 className="text-xl font-heading font-bold text-primary dark:text-accent mb-4">{content.analysis.chooseUpworkTitle}</h4>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                      {content.analysis.chooseUpworkItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-primary dark:border-accent">
                    <h4 className="text-xl font-heading font-bold text-primary dark:text-accent mb-4">{content.analysis.chooseFiverrTitle}</h4>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                      {content.analysis.chooseFiverrItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {content.analysis.bothPlatformsTitle}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {content.analysis.bothPlatformsText}
                </p>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {content.analysis.finalVerdictTitle}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {content.analysis.finalVerdictIntro}
                </p>

                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                  {content.analysis.finalVerdictItems.map((item, idx) => (
                    <li key={idx}><strong className="text-gray-900 dark:text-white">{item.split(':')[0]}:</strong>{item.split(':')[1]}</li>
                  ))}
                </ul>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {content.analysis.finalVerdictOutro}
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
                {content.cta.title}
              </h2>
              <p className="text-lg mb-8 opacity-90">
                {content.cta.text}
              </p>
              <Link
                href="/platforms"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-primary font-heading font-bold hover:bg-gray-100 transition-colors shadow-xl text-lg"
              >
                {content.cta.button}
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
                {content.related.title}
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  href="/resources/toptal-vs-upwork"
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-colors"
                >
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">
                    {content.related.items[0].title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {content.related.items[0].description}
                  </p>
                </Link>
                <Link
                  href="/resources/freelancer-vs-guru"
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-colors"
                >
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">
                    {content.related.items[1].title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {content.related.items[1].description}
                  </p>
                </Link>
                <Link
                  href="/tools"
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-colors"
                >
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">
                    {content.related.items[2].title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {content.related.items[2].description}
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
