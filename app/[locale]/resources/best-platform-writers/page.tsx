import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const slug = 'best-platform-writers';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

  if (locale === "nl") {
    return {
      title: "Beste Platform voor Schrijvers 2026: Upwork vs Fiverr vs Contently",
      description: "Vergelijk Upwork, Fiverr, Contently en WriterAccess voor freelance schrijvers. Ontdek welk platform de beste tarieven en kansen biedt voor writers.",
      keywords: "beste platform schrijvers, freelance schrijven platformen, contentwriters Nederland, upwork voor schrijvers, fiverr schrijven, freelance content platformen",
      openGraph: {
        title: "Beste Platform voor Schrijvers 2026: Upwork vs Fiverr vs Contently",
        description: "Vergelijk Upwork, Fiverr, Contently en WriterAccess. Vind het beste platform voor freelance schrijvers.",
        url: pageUrl,
        siteName: 'SkillLinkup',
        images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Beste Platform voor Schrijvers 2026: Upwork vs Fiverr vs Contently' }],
        locale: "nl_NL",
        type: "article",
      },
      twitter: { card: 'summary_large_image', title: 'Beste Platform voor Schrijvers 2026: Upwork vs Fiverr vs Contently', description: 'Vergelijk Upwork, Fiverr, Contently en WriterAccess. Vind het beste platform voor freelance schrijvers.', images: [`${siteUrl}/images/og/resources-og.png`], creator: '@SkillLinkup', site: '@SkillLinkup' },
      alternates: { canonical: pageUrl, languages: { 'en': `${siteUrl}/en/resources/${slug}`, 'nl': `${siteUrl}/nl/resources/${slug}` } },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    };
  }

  return {
    title: "Best Freelance Platform for Writers 2026: Detailed Comparison",
    description: "Compare Upwork, Fiverr, Contently, and WriterAccess for freelance writing. Discover which platform offers the best rates, projects, and opportunities for writers.",
    keywords: "best platform for writers, freelance writing sites, content writing platform, upwork for writers, fiverr writing",
    openGraph: {
      title: "Best Freelance Platform for Writers 2026: Detailed Comparison",
      description: "Compare Upwork, Fiverr, Contently, and WriterAccess. Find the best platform for freelance writers.",
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Best Freelance Platform for Writers 2026: Detailed Comparison' }],
      locale: "en_US",
      type: "article",
    },
    twitter: { card: 'summary_large_image', title: 'Best Freelance Platform for Writers 2026: Detailed Comparison', description: 'Compare Upwork, Fiverr, Contently, and WriterAccess. Find the best platform for freelance writers.', images: [`${siteUrl}/images/og/resources-og.png`], creator: '@SkillLinkup', site: '@SkillLinkup' },
    alternates: { canonical: pageUrl, languages: { 'en': `${siteUrl}/en/resources/${slug}`, 'nl': `${siteUrl}/nl/resources/${slug}` } },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  };
}

export default async function BestPlatformWritersPage({ params }: Props) {
  const { locale } = await params;

  const content = locale === "nl" ? {
    hero: {
      title: "Beste Freelance Platform voor Schrijvers: Uitgebreide Vergelijking",
      description: "Vergelijk Upwork, Fiverr, Contently en WriterAccess om het platform te vinden dat jouw schrijfinkomsten en carrièregroei in 2026 maximaliseert.",
      cta1: "Bekijk Alle Platforms",
      cta2: "Lees Reviews",
    },
    comparison: {
      title: "Schrijver-Gerichte Platform Vergelijking",
      table: {
        headers: {
          feature: "Kenmerk",
          upwork: "Upwork",
          fiverr: "Fiverr",
          contently: "Contently",
          writerAccess: "WriterAccess",
        },
        rows: {
          ratePerWord: "Gem. Tarief/Woord",
          platformFee: "Platformkosten",
          vettingProcess: "Selectieproces",
          clientQuality: "Klantkwaliteit",
          projectVolume: "Projectvolume",
          bestFor: "Het Beste Voor",
        },
        data: {
          upwork: {
            rate: "€0,03-€0,45",
            fee: "10% variabel",
            vetting: "Open (profiel)",
            quality: "Gemengd (alle groottes)",
            volume: "Zeer Hoog",
            bestFor: "Veelzijdige schrijvers",
          },
          fiverr: {
            rate: "€0,02-€0,18",
            fee: "20% vast",
            vetting: "Open (gigs)",
            quality: "Budgetbewust",
            volume: "Zeer Hoog",
            bestFor: "Volume/beginners",
          },
          contently: {
            rate: "€0,30-€1,80",
            fee: "0% (uitgenodigd)",
            vetting: "Alleen op uitnodiging",
            quality: "Enterprise merken",
            volume: "Gemiddeld",
            bestFor: "Premium schrijvers",
          },
          writerAccess: {
            rate: "€0,04-€0,27",
            fee: "30-50%",
            vetting: "Sterrensysteem",
            quality: "MKB-Enterprise",
            volume: "Hoog",
            bestFor: "SEO/marketing",
          },
        },
      },
    },
    platform1: {
      title: "Platform #1: Upwork – De Universele Schrijfmarktplaats",
      intro: "Upwork is de grootste algemene freelance marktplaats, met dagelijks duizenden schrijfopdrachten in elke denkbare niche – van blogposts en technische documentatie tot ghostwriting en copywriting.",
      prosConsTitle: "Upwork voor Schrijvers: Voor- en Nadelen",
      pros: "Voordelen",
      cons: "Nadelen",
      prosList: [
        "Enorm opdrachtvolume (1.000+ nieuwe vacatures per dag)",
        "Elke schrijfniche vertegenwoordigd",
        "Langdurige klantrelaties mogelijk",
        "Uurtarief en vaste prijs opties",
        "Tarieven: €0,03-€0,45/woord (€22-€135/uur)",
      ],
      consList: [
        "Hevige concurrentie (20-50 voorstellen per opdracht)",
        "Voorstellkosten (Connects systeem)",
        "Veel lage-budget klanten",
        "Constant voorstellen schrijven vereist",
      ],
      bestFor: "Het beste voor: Schrijvers die zich comfortabel voelen met verkoop/pitching, degenen die portfolio's opbouwen, en freelancers die diverse projecttypen zoeken. Succes vereist sterke voorstellvaardigheden en competitieve positionering.",
    },
    platform2: {
      title: "Platform #2: Fiverr – Volume-Gebaseerde Content Marktplaats",
      intro: "Fiverr werkt volgens een gig-gebaseerd model waarbij je voorverpakte schrijfdiensten creëert (bijv. '500-woord blogpost voor €45') en klanten direct kopen. Het is ideaal voor gestandaardiseerde contentcreatie op schaal.",
      prosConsTitle: "Fiverr voor Schrijvers: Voor- en Nadelen",
      prosList: [
        "Passief inkomensmodel (klanten vinden jou)",
        "Geen voorstellen schrijven nodig",
        "Volume-gebaseerd opschalingsmogelijkheden",
        "Gemakkelijk te starten (lage toegangsdrempel)",
      ],
      consList: [
        "20% platformkosten (hoogste van alle platforms)",
        "Budgetbewuste klanten (€5-€90 projecten)",
        "Tarieven: €0,02-€0,18/woord typisch",
        "Race-to-bottom prijsdruk",
      ],
      bestFor: "Het beste voor: Beginners die portfolio's opbouwen, schrijvers die gestandaardiseerde diensten aanbieden, en degenen die passieve marketing verkiezen boven actieve pitching.",
    },
    cta1: {
      title: "Onderzoek je verschillende freelance platforms?",
      description: "Vergelijk gedetailleerde platformreviews, kostenstructuren en vind de beste match voor jouw schrijfcarrière.",
      button: "Vergelijk Meer Platforms",
    },
    platform3: {
      title: "Platform #3: Contently – Premium Content Netwerk",
      intro: "Contently is een platform met alleen uitnodiging dat elite schrijvers verbindt met Fortune 500 merken en enterprise klanten. Het vertegenwoordigt de premium tier van freelance schrijfplatforms.",
      prosConsTitle: "Contently voor Schrijvers: Voor- en Nadelen",
      prosList: [
        "Premium tarieven: €0,30-€1,80/woord",
        "Geen platformkosten (schrijvers uitgenodigd)",
        "Enterprise klanten (Coca-Cola, Walmart, IBM)",
        "Hoogwaardige, strategische content projecten",
        "Langere journalistieke kansen",
      ],
      consList: [
        "Alleen op uitnodiging (geen open aanmeldingen)",
        "Vereist gevestigd portfolio",
        "Beperkt projectvolume",
        "Zeer selectief (top 5% van schrijvers)",
      ],
      bestFor: "Het beste voor: Ervaren schrijvers met gepubliceerd werk in grote publicaties, journalisten die overstappen naar freelance, en content strateeg met bewezen expertise.",
    },
    platform4: {
      title: "Platform #4: WriterAccess – SEO & Marketing Content Hub",
      intro: "WriterAccess specialiseert zich in SEO-geoptimaliseerde content en marketingcopy, met een sterrenbeoordeling systeem (2-6 sterren) om schrijvers te matchen met klanten op basis van vaardigheidsniveau en prijsstelling.",
      prosConsTitle: "WriterAccess voor Schrijvers: Voor- en Nadelen",
      prosList: [
        "Stabiel projectvolume",
        "Duidelijk sterrenbeoordeling progressiesysteem",
        "MKB en enterprise klanten",
        "SEO/marketing trainingsbronnen",
        "Tarieven: €0,04-€0,27/woord",
      ],
      consList: [
        "Hoge platformkosten (30-50% afhankelijk van tier)",
        "Voornamelijk SEO/marketing content",
        "Beperkte creatieve schrijfkansen",
        "Competitief selectieproces",
      ],
      bestFor: "Het beste voor: SEO-gerichte schrijvers, marketing copywriters, en freelancers die bereid zijn hogere kosten te accepteren voor consistente projectstroom en gestructureerde progressie.",
    },
    recommendations: {
      title: "Welk Platform Moeten Schrijvers Kiezen?",
      subtitle: "Platform Aanbevelingen per Ervaringsniveau",
      beginners: {
        title: "Beginners (0-2 jaar)",
        primary: "Primair:",
        secondary: "Secundair:",
        description: "Bouw portfolio met volume, leer klantbeheer, ontwikkel niche",
        income: "Verwacht inkomen: €450-€1.800/maand",
      },
      intermediate: {
        title: "Gemiddeld (2-5 jaar)",
        description: "Focus op beter betaalde klanten, bouw langdurige relaties, specialiseer",
        income: "Verwacht inkomen: €1.800-€5.400/maand",
      },
      advanced: {
        title: "Gevorderd (5+ jaar)",
        description: "Eis premium tarieven, focus op strategische content, enterprise klanten",
        income: "Verwacht inkomen: €5.400-€13.500+/maand",
      },
    },
    multiPlatform: {
      title: "Multi-Platform Strategie",
      intro: "Meest succesvolle schrijvers gebruiken 2-3 platforms tegelijk:",
      strategies: [
        {
          title: "Volume + Premium:",
          description: "Fiverr voor snelle projecten + Upwork voor hogere waarde klanten",
        },
        {
          title: "SEO + Algemeen:",
          description: "WriterAccess voor consistent SEO werk + Upwork voor diverse projecten",
        },
        {
          title: "Premium Hybride:",
          description: "Contently voor enterprise klanten + Upwork voor het opvullen van gaten",
        },
      ],
    },
    finalVerdict: {
      title: "Eindoordeel",
      forMost: "Voor de meeste schrijvers: Begin met Upwork om je portfolio en klantrelaties op te bouwen. Het platform biedt de beste balans tussen volume, klantkwaliteit en verdienpotentieel. Zodra je consistent €2.700+/maand verdient, diversifieer naar WriterAccess of zoek een Contently uitnodiging.",
      forPremium: "Voor premium schrijvers: Contently is de gouden standaard als je een uitnodiging kunt bemachtigen. Geen kosten en €0,45-€1,80/woord tarieven maken het 3-10x lucratiever dan andere platforms.",
    },
    ctaSection: {
      title: "Klaar om Je Schrijfcarrière te Lanceren?",
      description: "Verken uitgebreide platformreviews en begin vandaag als freelance schrijver te verdienen.",
      button: "Bekijk Alle Platforms",
    },
    related: {
      title: "Gerelateerde Platform Vergelijkingen",
      designers: {
        title: "Beste Platform voor Ontwerpers",
        description: "2026 ontwerpplatform vergelijkingsgids",
      },
      upworkVsFiverr: {
        title: "Upwork vs Fiverr",
        description: "Welk platform is het beste voor freelancers?",
      },
      tools: {
        title: "Freelance Tools",
        description: "Essentiële tools voor schrijvers",
      },
    },
  } : {
    hero: {
      title: "Best Freelance Platform for Writers: Detailed Comparison",
      description: "Compare Upwork, Fiverr, Contently, and WriterAccess to find the platform that maximizes your writing income and career growth in 2026.",
      cta1: "View All Platforms",
      cta2: "Read Reviews",
    },
    comparison: {
      title: "Writer-Focused Platform Comparison",
      table: {
        headers: {
          feature: "Feature",
          upwork: "Upwork",
          fiverr: "Fiverr",
          contently: "Contently",
          writerAccess: "WriterAccess",
        },
        rows: {
          ratePerWord: "Avg. Rate/Word",
          platformFee: "Platform Fee",
          vettingProcess: "Vetting Process",
          clientQuality: "Client Quality",
          projectVolume: "Project Volume",
          bestFor: "Best For",
        },
        data: {
          upwork: {
            rate: "$0.03-$0.50",
            fee: "10% sliding",
            vetting: "Open (profile)",
            quality: "Mixed (all sizes)",
            volume: "Very High",
            bestFor: "Versatile writers",
          },
          fiverr: {
            rate: "$0.02-$0.20",
            fee: "20% flat",
            vetting: "Open (gigs)",
            quality: "Budget-conscious",
            volume: "Very High",
            bestFor: "Volume/beginners",
          },
          contently: {
            rate: "$0.35-$2.00",
            fee: "0% (invited)",
            vetting: "Invitation only",
            quality: "Enterprise brands",
            volume: "Medium",
            bestFor: "Premium writers",
          },
          writerAccess: {
            rate: "$0.04-$0.30",
            fee: "30-50%",
            vetting: "Star rating system",
            quality: "SMB-Enterprise",
            volume: "High",
            bestFor: "SEO/marketing",
          },
        },
      },
    },
    platform1: {
      title: "Platform #1: Upwork – The All-Purpose Writing Marketplace",
      intro: "Upwork is the largest general freelance marketplace, offering thousands of writing jobs daily across every niche imaginable – from blog posts and technical documentation to ghostwriting and copywriting.",
      prosConsTitle: "Upwork for Writers: Pros & Cons",
      pros: "Pros",
      cons: "Cons",
      prosList: [
        "Massive job volume (1,000+ new postings daily)",
        "Every writing niche represented",
        "Long-term client relationships possible",
        "Hourly and fixed-price options",
        "Rates: $0.03-$0.50/word ($25-$150/hour)",
      ],
      consList: [
        "Fierce competition (20-50 proposals/job)",
        "Proposal costs (Connects system)",
        "Many low-budget clients",
        "Constant proposal writing required",
      ],
      bestFor: "Best for: Writers comfortable with sales/pitching, those building portfolios, and freelancers seeking diverse project types. Success requires strong proposal skills and competitive positioning.",
    },
    platform2: {
      title: "Platform #2: Fiverr – Volume-Based Content Marketplace",
      intro: "Fiverr operates on a gig-based model where you create pre-packaged writing services (e.g., '500-word blog post for $50') and clients purchase directly. It's ideal for standardized content creation at scale.",
      prosConsTitle: "Fiverr for Writers: Pros & Cons",
      prosList: [
        "Passive income model (clients find you)",
        "No proposal writing needed",
        "Volume-based scaling potential",
        "Easy to start (low barrier to entry)",
      ],
      consList: [
        "20% platform fee (highest among platforms)",
        "Budget-conscious clients ($5-$100 projects)",
        "Rates: $0.02-$0.20/word typical",
        "Race-to-bottom pricing pressure",
      ],
      bestFor: "Best for: Beginners building portfolios, writers offering standardized services, and those who prefer passive marketing over active pitching.",
    },
    cta1: {
      title: "Exploring different freelance platforms?",
      description: "Compare detailed platform reviews, fee structures, and find the best match for your writing career.",
      button: "Compare More Platforms",
    },
    platform3: {
      title: "Platform #3: Contently – Premium Content Network",
      intro: "Contently is an invitation-only platform connecting elite writers with Fortune 500 brands and enterprise clients. It represents the premium tier of freelance writing platforms.",
      prosConsTitle: "Contently for Writers: Pros & Cons",
      prosList: [
        "Premium rates: $0.35-$2.00/word",
        "Zero platform fees (writers invited)",
        "Enterprise clients (Coca-Cola, Walmart, IBM)",
        "High-quality, strategic content projects",
        "Long-form journalism opportunities",
      ],
      consList: [
        "Invitation-only (no open applications)",
        "Requires established portfolio",
        "Limited project volume",
        "Highly selective (top 5% of writers)",
      ],
      bestFor: "Best for: Experienced writers with published work in major publications, journalists transitioning to freelance, and content strategists with proven expertise.",
    },
    platform4: {
      title: "Platform #4: WriterAccess – SEO & Marketing Content Hub",
      intro: "WriterAccess specializes in SEO-optimized content and marketing copy, using a star-rating system (2-6 stars) to match writers with clients based on skill level and pricing.",
      prosConsTitle: "WriterAccess for Writers: Pros & Cons",
      prosList: [
        "Steady project volume",
        "Clear star-rating progression system",
        "SMB and enterprise clients",
        "SEO/marketing training resources",
        "Rates: $0.04-$0.30/word",
      ],
      consList: [
        "High platform fee (30-50% depending on tier)",
        "Primarily SEO/marketing content",
        "Limited creative writing opportunities",
        "Competitive entry vetting process",
      ],
      bestFor: "Best for: SEO-focused writers, marketing copywriters, and freelancers willing to sacrifice higher fees for consistent project flow and structured progression.",
    },
    recommendations: {
      title: "Which Platform Should Writers Choose?",
      subtitle: "Platform Recommendations by Experience Level",
      beginners: {
        title: "Beginners (0-2 years)",
        primary: "Primary:",
        secondary: "Secondary:",
        description: "Build portfolio with volume, learn client management, develop niche",
        income: "Expected income: $500-$2,000/month",
      },
      intermediate: {
        title: "Intermediate (2-5 years)",
        description: "Focus on higher-paying clients, build long-term relationships, specialize",
        income: "Expected income: $2,000-$6,000/month",
      },
      advanced: {
        title: "Advanced (5+ years)",
        description: "Command premium rates, focus on strategic content, enterprise clients",
        income: "Expected income: $6,000-$15,000+/month",
      },
    },
    multiPlatform: {
      title: "Multi-Platform Strategy",
      intro: "Most successful writers use 2-3 platforms simultaneously:",
      strategies: [
        {
          title: "Volume + Premium:",
          description: "Fiverr for quick projects + Upwork for higher-value clients",
        },
        {
          title: "SEO + General:",
          description: "WriterAccess for consistent SEO work + Upwork for diverse projects",
        },
        {
          title: "Premium Hybrid:",
          description: "Contently for enterprise clients + Upwork for filling gaps",
        },
      ],
    },
    finalVerdict: {
      title: "Final Verdict",
      forMost: "For most writers: Start with Upwork to build your portfolio and client relationships. The platform offers the best balance of volume, client quality, and earning potential. Once you've established consistent $3,000+/month income, diversify to WriterAccess or seek Contently invitation.",
      forPremium: "For premium writers: Contently is the gold standard if you can secure an invitation. Zero fees and $0.50-$2.00/word rates make it 3-10x more lucrative than other platforms.",
    },
    ctaSection: {
      title: "Ready to Launch Your Writing Career?",
      description: "Explore comprehensive platform reviews and start earning as a freelance writer today.",
      button: "Browse All Platforms",
    },
    related: {
      title: "Related Platform Comparisons",
      designers: {
        title: "Best Platform for Designers",
        description: "2026 design platform comparison guide",
      },
      upworkVsFiverr: {
        title: "Upwork vs Fiverr",
        description: "Which platform is best for freelancers?",
      },
      tools: {
        title: "Freelance Tools",
        description: "Essential tools for writers",
      },
    },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: locale === "nl"
      ? "Beste Platform voor Schrijvers 2026: Upwork vs Fiverr vs Contently"
      : "Best Freelance Platform for Writers 2026: Detailed Comparison",
    description: locale === "nl"
      ? "Vergelijk Upwork, Fiverr, Contently en WriterAccess voor freelance schrijvers. Ontdek welk platform de beste tarieven en kansen biedt voor writers."
      : "Compare Upwork, Fiverr, Contently, and WriterAccess for freelance writing. Discover which platform offers the best rates, projects, and opportunities for writers.",
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
                {content.comparison.title}
              </h2>
              <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-heading font-semibold text-gray-900 dark:text-white">{content.comparison.table.headers.feature}</th>
                      <th className="px-4 py-4 text-left text-sm font-heading font-semibold text-primary dark:text-accent">{content.comparison.table.headers.upwork}</th>
                      <th className="px-4 py-4 text-left text-sm font-heading font-semibold text-primary dark:text-accent">{content.comparison.table.headers.fiverr}</th>
                      <th className="px-4 py-4 text-left text-sm font-heading font-semibold text-primary dark:text-accent">{content.comparison.table.headers.contently}</th>
                      <th className="px-4 py-4 text-left text-sm font-heading font-semibold text-primary dark:text-accent">{content.comparison.table.headers.writerAccess}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr className="bg-white dark:bg-gray-800">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{content.comparison.table.rows.ratePerWord}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.table.data.upwork.rate}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.table.data.fiverr.rate}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.table.data.contently.rate}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.table.data.writerAccess.rate}</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{content.comparison.table.rows.platformFee}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.table.data.upwork.fee}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.table.data.fiverr.fee}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.table.data.contently.fee}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.table.data.writerAccess.fee}</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{content.comparison.table.rows.vettingProcess}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.table.data.upwork.vetting}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.table.data.fiverr.vetting}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.table.data.contently.vetting}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.table.data.writerAccess.vetting}</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{content.comparison.table.rows.clientQuality}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.table.data.upwork.quality}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.table.data.fiverr.quality}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.table.data.contently.quality}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.table.data.writerAccess.quality}</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{content.comparison.table.rows.projectVolume}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.table.data.upwork.volume}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.table.data.fiverr.volume}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.table.data.contently.volume}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.table.data.writerAccess.volume}</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{content.comparison.table.rows.bestFor}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.table.data.upwork.bestFor}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.table.data.fiverr.bestFor}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.table.data.contently.bestFor}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{content.comparison.table.data.writerAccess.bestFor}</td>
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
                      <h5 className="font-heading font-semibold text-accent mb-3">{content.platform1.pros}</h5>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        {content.platform1.prosList.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-accent mt-1">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-heading font-semibold text-primary mb-3">{content.platform1.cons}</h5>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        {content.platform1.consList.map((item, index) => (
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
                  {content.platform1.bestFor}
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
                      <h5 className="font-heading font-semibold text-accent mb-3">{content.platform1.pros}</h5>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        {content.platform2.prosList.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-accent mt-1">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-heading font-semibold text-primary mb-3">{content.platform1.cons}</h5>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        {content.platform2.consList.map((item, index) => (
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
                  {content.platform2.bestFor}
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
                      <h5 className="font-heading font-semibold text-accent mb-3">{content.platform1.pros}</h5>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        {content.platform3.prosList.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-accent mt-1">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-heading font-semibold text-primary mb-3">{content.platform1.cons}</h5>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        {content.platform3.consList.map((item, index) => (
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
                  {content.platform3.bestFor}
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
                      <h5 className="font-heading font-semibold text-accent mb-3">{content.platform1.pros}</h5>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        {content.platform4.prosList.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-accent mt-1">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-heading font-semibold text-primary mb-3">{content.platform1.cons}</h5>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        {content.platform4.consList.map((item, index) => (
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
                  {content.platform4.bestFor}
                </p>

                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  {content.recommendations.title}
                </h2>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 my-6 border-2 border-accent dark:border-accent">
                  <h4 className="text-xl font-heading font-bold text-accent mb-4">{content.recommendations.subtitle}</h4>

                  <div className="space-y-6">
                    <div>
                      <h5 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">{content.recommendations.beginners.title}</h5>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        <strong>{content.recommendations.beginners.primary}</strong> {locale === "nl" ? "Fiverr of Upwork" : "Fiverr or Upwork"}<br />
                        {content.recommendations.beginners.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        {content.recommendations.beginners.income}
                      </p>
                    </div>

                    <div>
                      <h5 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">{content.recommendations.intermediate.title}</h5>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        <strong>{content.recommendations.beginners.primary}</strong> Upwork<br />
                        <strong>{content.recommendations.beginners.secondary}</strong> WriterAccess<br />
                        {content.recommendations.intermediate.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        {content.recommendations.intermediate.income}
                      </p>
                    </div>

                    <div>
                      <h5 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">{content.recommendations.advanced.title}</h5>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        <strong>{content.recommendations.beginners.primary}</strong> {locale === "nl" ? "Contently (indien uitgenodigd)" : "Contently (if invited)"}<br />
                        <strong>{content.recommendations.beginners.secondary}</strong> {locale === "nl" ? "Upwork (alleen premium klanten)" : "Upwork (premium clients only)"}<br />
                        {content.recommendations.advanced.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        {content.recommendations.advanced.income}
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {content.multiPlatform.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {content.multiPlatform.intro}
                </p>

                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                  {content.multiPlatform.strategies.map((strategy, index) => (
                    <li key={index}>
                      <strong className="text-gray-900 dark:text-white">{strategy.title}</strong> {strategy.description}
                    </li>
                  ))}
                </ul>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {content.finalVerdict.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {content.finalVerdict.forMost}
                </p>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {content.finalVerdict.forPremium}
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
                {content.related.title}
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  href={`/${locale}/resources/best-platform-designers`}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-colors"
                >
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">
                    {content.related.designers.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {content.related.designers.description}
                  </p>
                </Link>
                <Link
                  href={`/${locale}/resources/upwork-vs-fiverr`}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-colors"
                >
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">
                    {content.related.upworkVsFiverr.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {content.related.upworkVsFiverr.description}
                  </p>
                </Link>
                <Link
                  href={`/${locale}/tools`}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-colors"
                >
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">
                    {content.related.tools.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {content.related.tools.description}
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
