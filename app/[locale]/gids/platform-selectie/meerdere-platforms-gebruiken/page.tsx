import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Layers, TrendingUp, AlertTriangle, CheckCircle, Target, Zap, ArrowRight, Star } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const slug = 'meerdere-platforms-gebruiken';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/gids/platform-selectie/${slug}`;

  if (locale === 'nl') {
    return {
      title: 'Meerdere Freelance Platforms Gebruiken: Voor- en Nadelen Strategie 2026',
      description: 'Ontdek wanneer het slim is om actief te zijn op meerdere freelance platforms. Complete gids met strategieën, voor- en nadelen, en time management tips.',
      keywords: 'meerdere freelance platforms, multi platform strategie, freelance platforms combineren, upwork en fiverr tegelijk, freelance portfolio strategie',
      openGraph: {
        title: 'Meerdere Freelance Platforms Gebruiken: Voor- en Nadelen',
        description: 'Wanneer heeft het zin om op meerdere platforms actief te zijn? Complete strategie gids.',
        url: pageUrl,
        siteName: 'SkillLinkup',
        images: [{ url: `${siteUrl}/images/og/platform-selectie-og.png`, width: 1200, height: 630, alt: 'Meerdere Freelance Platforms Gebruiken' }],
        locale: 'nl_NL',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Meerdere Freelance Platforms Gebruiken',
        description: 'Complete strategie gids voor multi-platform freelancing',
        images: [`${siteUrl}/images/og/platform-selectie-og.png`],
        creator: '@SkillLinkup',
        site: '@SkillLinkup',
      },
      alternates: {
        canonical: pageUrl,
        languages: {
          'en': `${siteUrl}/en/guide/platform-selection/${slug}`,
          'nl': pageUrl,
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
    title: 'Using Multiple Freelance Platforms: Pros, Cons & Strategy 2026',
    description: 'Discover when it makes sense to be active on multiple freelance platforms. Complete guide with strategies, pros and cons, and time management tips.',
    keywords: 'multiple freelance platforms, multi platform strategy, combine freelance platforms, upwork and fiverr simultaneously, freelance portfolio strategy',
    openGraph: {
      title: 'Using Multiple Freelance Platforms: Pros and Cons',
      description: 'When does it make sense to be active on multiple platforms? Complete strategy guide.',
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [{ url: `${siteUrl}/images/og/platform-selectie-og.png`, width: 1200, height: 630, alt: 'Using Multiple Freelance Platforms' }],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Using Multiple Freelance Platforms',
      description: 'Complete strategy guide for multi-platform freelancing',
      images: [`${siteUrl}/images/og/platform-selectie-og.png`],
      creator: '@SkillLinkup',
      site: '@SkillLinkup',
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'en': pageUrl,
        'nl': `${siteUrl}/nl/gids/platform-selectie/${slug}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

export default async function MeerderePlatformsPage({ params }: PageProps) {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

  const content = locale === 'nl' ? {
    hero: {
      title: "Multi-Platform Strategie: Maximaliseer Je Freelance Kansen",
      intro: "Moet je al je eieren in één mand leggen of spreiden over meerdere platforms? Ontdek de voor- en nadelen en leer wanneer een multi-platform strategie werkt.",
      cta1: "Vergelijk Platforms",
      cta2: "Lees Beste Platform Kiezen"
    },
    sections: {
      intro: "De meeste succesvolle freelancers gebruiken meerdere platforms strategisch. Maar timing is alles—te vroeg diversifiëren kan je groei vertragen, terwijl te lang op één platform blijven je beperkt. Deze gids helpt je de juiste balans te vinden.",
      prosTitle: "Voordelen van Meerdere Platforms",
      pros: [
        { title: "Meer Inkomstenstabiliteit", desc: "Als één platform tijdelijk weinig opdrachten heeft, kun je terugvallen op andere bronnen. Je bent niet afhankelijk van één algoritme of marketplace dynamiek." },
        { title: "Grotere Opdrachtpool", desc: "Toegang tot verschillende klantenbases en projecttypes. Wat op Upwork niet beschikbaar is, vind je misschien op Toptal of Guru." },
        { title: "Risico Spreiding", desc: "Als een platform zijn commissie verhoogt, zijn ToS aanpast, of zelfs failliet gaat, heb je backup bronnen waar je reputatie al opgebouwd is." },
        { title: "Experimenteren en Optimaliseren", desc: "Test welk platform de hoogste tarieven, beste klanten, of snelste conversie biedt voor jouw specifieke diensten." },
        { title: "Niche Matching", desc: "Gebruik generalist platforms voor volume en niche platforms voor premium opdrachten. Elk platform heeft zijn sterke punten—gebruik ze strategisch." }
      ],
      consTitle: "Nadelen en Uitdagingen",
      cons: [
        { title: "Versnipperde Reputatie", desc: "In plaats van 50 reviews op één platform heb je 10-15 reviews verspreid. Dit maakt het moeilijker om 'Top Rated' of 'Pro' status te behalen." },
        { title: "Time Management Overhead", desc: "Elk platform heeft zijn eigen dashboard, messaging systeem, en proposal proces. Je tijd wordt opgegeten door platform management in plaats van productief werk." },
        { title: "Profile Onderhoud", desc: "Je moet meerdere profielen actueel houden, portfolio's updaten, en beschikbaarheid synchroniseren. Dit is repetitief en tijdrovend." },
        { title: "Hogere Totale Commissie", desc: "Als je €5.000 verdeeld over 3 platforms verdient, betaal je meer totale commissie dan €5.000 op één platform (vanwege tier-based rates)." },
        { title: "Verwarring en Burnout Risico", desc: "Constant schakelen tussen platforms, verschillende deadlines, en meerdere client bases kan mentaal uitputtend zijn." }
      ],
      whenTitle: "Wanneer Wel Meerdere Platforms?",
      whenIntro: "Multi-platform strategie werkt het beste in deze scenario's:",
      when1: "Je Hebt Stabiele Inkomsten op Één Platform",
      when1Desc: "Eerst een solide fundatie bouwen op één platform (4.5+ rating, 15+ reviews, constante opdrachten). Dan uitbreiden naar een tweede platform zonder je hoofdbron te verwaarlozen.",
      when2: "Je Specialiseert in Meerdere Niches",
      when2Desc: "Als je zowel webdesign als copywriting doet, kun je design opdrachten via 99designs en writing via Upwork targeten. Verschillende platforms voor verschillende services.",
      when3: "Je Target Verschillende Klant Types",
      when3Desc: "Kleine quick gigs via Fiverr ($50-200), mid-range projecten via Upwork ($500-2K), en enterprise consulting via Toptal ($5K+). Elk platform serveert een ander klantsegment.",
      when4: "Platform-Specifieke Opportunities",
      when4Desc: "Sommige platforms hebben unieke features zoals Upwork's long-term hourly contracts of Fiverr's gig packages. Gebruik elk platform waar het excelleert.",
      when5: "Backup en Risk Management",
      when5Desc: "Als je volledig afhankelijk bent van freelance inkomsten (geen andere baan), is diversificatie over 2-3 platforms verstandig tegen platform-specific risico's.",
      whenNotTitle: "Wanneer Niet Meerdere Platforms?",
      whenNotIntro: "In deze situaties is multi-platform geen goed idee:",
      whenNot: [
        { title: "Je Bent Absolute Beginner", desc: "Focus 100% op één beginner-friendly platform tot je 20+ reviews en solide reputatie hebt. Splitting attention vertraagt je groei enorm." },
        { title: "Je Hebt Beperkte Tijd", desc: "Als je part-time freelancet naast een baan, is de overhead van meerdere platforms vaak meer dan het oplevert. Beter om excellent te zijn op één platform." },
        { title: "Je Platform Werkt Perfect", desc: "Als je vol zit met werk, goede tarieven krijgt, en tevreden bent met je huidige platform—waarom veranderen? Don't fix what isn't broken." },
        { title: "Je Mist Organizational Skills", desc: "Multi-platform vereist sterke time management, administratie, en scheduling. Als je hier al mee worstelt op één platform, voeg niet meer toe." }
      ],
      strategiesTitle: "Effectieve Multi-Platform Strategieën",
      strategy1: "Primary + Secondary Model",
      strategy1Desc: "Kies één hoofdplatform waar je 70% van je tijd en aandacht investeert. Gebruik een tweede platform voor 20% (experimenteel of backup) en mogelijk een derde voor 10% (opportunistisch).",
      strategy2: "Specialisatie Per Platform",
      strategy2Desc: "Bied verschillende diensten op verschillende platforms. Bijvoorbeeld: WordPress development op Upwork, logo design op 99designs, quick edits op Fiverr. Elk platform voor zijn sterke punt.",
      strategy3: "Experience-Based Progression",
      strategy3Desc: "Start op beginner platform (Fiverr/Upwork), bouw reputatie, migreer naar mid-tier (Guru/PeoplePerHour), en uiteindelijk naar elite platforms (Toptal/Gun.io) terwijl je de vorige als backup houdt.",
      strategy4: "Geographic Segmentation",
      strategy4Desc: "Lokaal platform voor Nederlandse/Belgische klanten (Freelance.nl, Werkspot), internationaal platform voor wereldwijde opdrachten (Upwork). Scheiden op geografische markt.",
      strategy5: "Project Size Differentiation",
      strategy5Desc: "Kleine quick tasks op Fiverr (<€200), mid-sized projects op Upwork (€500-5K), grote consulting via Catalant of Toptal (€10K+). Elk platform voor zijn typische project size.",
      toolsTitle: "Tools om Multi-Platform te Managen",
      tools: [
        { name: "Centrale Time Tracker", desc: "Gebruik één tool zoals SkillLinkup Time Tracker of Toggl voor alle platforms. Voorkom dubbel time tracking in platform-native tools." },
        { name: "Unified Calendar", desc: "Google Calendar of Notion om alle deadlines, client meetings, en deliverables van alle platforms te centraliseren." },
        { name: "Template Library", desc: "Bewaar je beste proposals, intro messages, en contract terms in een tool zoals Notion. Copy-paste en personaliseer per platform." },
        { name: "Portfolio Sync Tool", desc: "Gebruik een centrale portfolio site (Behance, persoonlijke website) en link daar vanuit alle platform profielen. Update op één plek." },
        { name: "Financial Dashboard", desc: "Spreadsheet of tool zoals QuickBooks om inkomsten van alle platforms bij te houden. Zie totaal overzicht van je freelance business." }
      ],
      mistakesTitle: "Veelgemaakte Fouten bij Multi-Platform",
      mistake1: "Copy-Paste Profielen",
      mistake1Desc: "Elk platform heeft zijn eigen cultuur en optimale profile format. Een Upwork profiel copy-pasten naar Toptal werkt niet—personaliseer per platform.",
      mistake2: "Niet Bijhouden Waar Klanten Vandaan Komen",
      mistake2Desc: "Na 6 maanden weet je niet meer welk platform de beste ROI heeft. Track nauwkeurig tijd geïnvesteerd vs inkomsten per platform.",
      mistake3: "Over-Promising Availability",
      mistake3Desc: "Je accepteert projecten op 3 platforms tegelijk en realiseert dan dat je overboekt bent. Houd een master calendar en wees realistisch over je capaciteit.",
      mistake4: "Verschillende Tarieven per Platform",
      mistake4Desc: "Klanten kunnen je op meerdere platforms vinden. Als je €50/uur op Upwork vraagt en €30/uur op Fiverr, ondermijn je je waarde.",
      caseTitle: "Case Study: Sarah's Multi-Platform Journey",
      caseContent: "Sarah, een content writer, begon op Fiverr met €15 artikelen. Na 6 maanden had ze 50+ reviews en switchte naar Upwork als primary platform (€40/uur). Ze hield Fiverr als backup voor quick cash flow. Na 1 jaar appliceerde ze bij Contently (vetted platform) en werd aangenomen (€100/artikel). Nu werkt ze 60% via Contently, 30% Upwork for retainer clients, 10% Fiverr for filler work. Resultaat: €4.500/maand stable income met risico spreiding."
    },
    cta: {
      title: "Klaar om Je Platform Strategie te Optimaliseren?",
      description: "Vergelijk alle freelance platforms en vind de combinatie die perfect bij jou past. Of doe onze quiz voor een gepersonaliseerde aanbeveling.",
      compareBtn: "Vergelijk Alle Platforms",
      quizBtn: "Doe de Platform Quiz"
    },
    related: {
      title: "Gerelateerde Gidsen",
      beste: "Beste Platform Kiezen",
      besteDesc: "Stap-voor-stap gids voor het vinden van jouw ideale platform",
      factoren: "Belangrijke Selectiefactoren",
      factorenDesc: "Waar moet je op letten bij het vergelijken van platforms?",
      beginnerExpert: "Beginner vs Expert Platforms",
      beginnerExpertDesc: "Welke platforms passen bij jouw ervaringsniveau?"
    }
  } : {
    hero: {
      title: "Multi-Platform Strategy: Maximize Your Freelance Opportunities",
      intro: "Should you put all your eggs in one basket or spread across multiple platforms? Discover the pros and cons and learn when a multi-platform strategy works.",
      cta1: "Compare Platforms",
      cta2: "Read Choose Best Platform"
    },
    sections: {
      intro: "Most successful freelancers use multiple platforms strategically. But timing is everything—diversifying too early can slow your growth, while staying too long on one platform limits you. This guide helps you find the right balance.",
      prosTitle: "Advantages of Multiple Platforms",
      pros: [
        { title: "More Income Stability", desc: "If one platform temporarily has few projects, you can fall back on other sources. You're not dependent on one algorithm or marketplace dynamics." },
        { title: "Larger Project Pool", desc: "Access to different client bases and project types. What's not available on Upwork, you might find on Toptal or Guru." },
        { title: "Risk Diversification", desc: "If a platform raises its commission, changes its ToS, or even goes bankrupt, you have backup sources where you've already built reputation." },
        { title: "Experimenting and Optimizing", desc: "Test which platform offers the highest rates, best clients, or fastest conversion for your specific services." },
        { title: "Niche Matching", desc: "Use generalist platforms for volume and niche platforms for premium projects. Each platform has its strengths—use them strategically." }
      ],
      consTitle: "Disadvantages and Challenges",
      cons: [
        { title: "Fragmented Reputation", desc: "Instead of 50 reviews on one platform you have 10-15 reviews spread out. This makes it harder to achieve 'Top Rated' or 'Pro' status." },
        { title: "Time Management Overhead", desc: "Each platform has its own dashboard, messaging system, and proposal process. Your time is consumed by platform management instead of productive work." },
        { title: "Profile Maintenance", desc: "You need to keep multiple profiles current, update portfolios, and synchronize availability. This is repetitive and time-consuming." },
        { title: "Higher Total Commission", desc: "If you earn €5,000 spread across 3 platforms, you pay more total commission than €5,000 on one platform (due to tier-based rates)." },
        { title: "Confusion and Burnout Risk", desc: "Constantly switching between platforms, different deadlines, and multiple client bases can be mentally exhausting." }
      ],
      whenTitle: "When to Use Multiple Platforms?",
      whenIntro: "Multi-platform strategy works best in these scenarios:",
      when1: "You Have Stable Income on One Platform",
      when1Desc: "First build a solid foundation on one platform (4.5+ rating, 15+ reviews, constant projects). Then expand to a second platform without neglecting your main source.",
      when2: "You Specialize in Multiple Niches",
      when2Desc: "If you do both web design and copywriting, you can target design projects via 99designs and writing via Upwork. Different platforms for different services.",
      when3: "You Target Different Client Types",
      when3Desc: "Small quick gigs via Fiverr ($50-200), mid-range projects via Upwork ($500-2K), and enterprise consulting via Toptal ($5K+). Each platform serves a different client segment.",
      when4: "Platform-Specific Opportunities",
      when4Desc: "Some platforms have unique features like Upwork's long-term hourly contracts or Fiverr's gig packages. Use each platform where it excels.",
      when5: "Backup and Risk Management",
      when5Desc: "If you're completely dependent on freelance income (no other job), diversification across 2-3 platforms is wise against platform-specific risks.",
      whenNotTitle: "When Not to Use Multiple Platforms?",
      whenNotIntro: "In these situations multi-platform is not a good idea:",
      whenNot: [
        { title: "You're an Absolute Beginner", desc: "Focus 100% on one beginner-friendly platform until you have 20+ reviews and solid reputation. Splitting attention slows your growth enormously." },
        { title: "You Have Limited Time", desc: "If you freelance part-time alongside a job, the overhead of multiple platforms is often more than it yields. Better to be excellent on one platform." },
        { title: "Your Platform Works Perfectly", desc: "If you're full of work, getting good rates, and satisfied with your current platform—why change? Don't fix what isn't broken." },
        { title: "You Lack Organizational Skills", desc: "Multi-platform requires strong time management, administration, and scheduling. If you're already struggling with this on one platform, don't add more." }
      ],
      strategiesTitle: "Effective Multi-Platform Strategies",
      strategy1: "Primary + Secondary Model",
      strategy1Desc: "Choose one main platform where you invest 70% of your time and attention. Use a second platform for 20% (experimental or backup) and possibly a third for 10% (opportunistic).",
      strategy2: "Specialization Per Platform",
      strategy2Desc: "Offer different services on different platforms. For example: WordPress development on Upwork, logo design on 99designs, quick edits on Fiverr. Each platform for its strength.",
      strategy3: "Experience-Based Progression",
      strategy3Desc: "Start on beginner platform (Fiverr/Upwork), build reputation, migrate to mid-tier (Guru/PeoplePerHour), and eventually to elite platforms (Toptal/Gun.io) while keeping previous as backup.",
      strategy4: "Geographic Segmentation",
      strategy4Desc: "Local platform for Dutch/Belgian clients (Freelance.nl, Werkspot), international platform for worldwide projects (Upwork). Separate by geographic market.",
      strategy5: "Project Size Differentiation",
      strategy5Desc: "Small quick tasks on Fiverr (<€200), mid-sized projects on Upwork (€500-5K), large consulting via Catalant or Toptal (€10K+). Each platform for its typical project size.",
      toolsTitle: "Tools to Manage Multi-Platform",
      tools: [
        { name: "Central Time Tracker", desc: "Use one tool like SkillLinkup Time Tracker or Toggl for all platforms. Avoid double time tracking in platform-native tools." },
        { name: "Unified Calendar", desc: "Google Calendar or Notion to centralize all deadlines, client meetings, and deliverables from all platforms." },
        { name: "Template Library", desc: "Store your best proposals, intro messages, and contract terms in a tool like Notion. Copy-paste and personalize per platform." },
        { name: "Portfolio Sync Tool", desc: "Use a central portfolio site (Behance, personal website) and link from all platform profiles. Update in one place." },
        { name: "Financial Dashboard", desc: "Spreadsheet or tool like QuickBooks to track income from all platforms. See total overview of your freelance business." }
      ],
      mistakesTitle: "Common Mistakes with Multi-Platform",
      mistake1: "Copy-Paste Profiles",
      mistake1Desc: "Each platform has its own culture and optimal profile format. Copy-pasting an Upwork profile to Toptal doesn't work—personalize per platform.",
      mistake2: "Not Tracking Where Clients Come From",
      mistake2Desc: "After 6 months you don't remember which platform has the best ROI. Track accurately time invested vs income per platform.",
      mistake3: "Over-Promising Availability",
      mistake3Desc: "You accept projects on 3 platforms simultaneously and then realize you're overbooked. Keep a master calendar and be realistic about your capacity.",
      mistake4: "Different Rates Per Platform",
      mistake4Desc: "Clients can find you on multiple platforms. If you charge €50/hour on Upwork and €30/hour on Fiverr, you undermine your value.",
      caseTitle: "Case Study: Sarah's Multi-Platform Journey",
      caseContent: "Sarah, a content writer, started on Fiverr with €15 articles. After 6 months she had 50+ reviews and switched to Upwork as primary platform (€40/hour). She kept Fiverr as backup for quick cash flow. After 1 year she applied to Contently (vetted platform) and was accepted (€100/article). Now she works 60% via Contently, 30% Upwork for retainer clients, 10% Fiverr for filler work. Result: €4,500/month stable income with risk diversification."
    },
    cta: {
      title: "Ready to Optimize Your Platform Strategy?",
      description: "Compare all freelance platforms and find the combination that's perfect for you. Or take our quiz for a personalized recommendation.",
      compareBtn: "Compare All Platforms",
      quizBtn: "Take Platform Quiz"
    },
    related: {
      title: "Related Guides",
      beste: "Choose Best Platform",
      besteDesc: "Step-by-step guide for finding your ideal platform",
      factoren: "Important Selection Factors",
      factorenDesc: "What should you look for when comparing platforms?",
      beginnerExpert: "Beginner vs Expert Platforms",
      beginnerExpertDesc: "Which platforms match your experience level?"
    }
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: locale === 'nl' ? 'Meerdere Freelance Platforms Gebruiken: Voor- en Nadelen' : 'Using Multiple Freelance Platforms: Pros and Cons',
    description: locale === 'nl' ? 'Complete strategie gids voor multi-platform freelancing.' : 'Complete strategy guide for multi-platform freelancing.',
    author: { '@type': 'Organization', name: 'SkillLinkup' },
    publisher: { '@type': 'Organization', name: 'SkillLinkup', logo: { '@type': 'ImageObject', url: `${siteUrl}/images/logo/skilllinkup-transparant-rozepunt.webp` }},
    datePublished: '2026-01-15',
    dateModified: '2026-01-15',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: locale === 'nl' ? 'Gids' : 'Guide', item: `${siteUrl}/${locale}/gids` },
      { '@type': 'ListItem', position: 3, name: locale === 'nl' ? 'Platform Selectie' : 'Platform Selection', item: `${siteUrl}/${locale}/gids/platform-selectie` },
      { '@type': 'ListItem', position: 4, name: locale === 'nl' ? 'Meerdere Platforms' : 'Multiple Platforms' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-secondary dark:from-secondary dark:via-primary-dark dark:to-primary py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
                <Layers className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-heading">
                {content.hero.title}
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {content.hero.intro}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold font-heading hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                >
                  <Star className="w-5 h-5" />
                  {content.hero.cta1}
                </Link>
                <Link
                  href={`/${locale}/gids/platform-selectie/beste-freelance-platform-kiezen`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-xl font-semibold font-heading hover:bg-accent-dark transition-all shadow-lg hover:shadow-xl"
                >
                  <Target className="w-5 h-5" />
                  {content.hero.cta2}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-primary dark:border-accent pl-6 py-2 mb-12">
                  {content.sections.intro}
                </p>

                {/* Pros */}
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 font-heading flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-accent" />
                  {content.sections.prosTitle}
                </h2>
                <div className="space-y-4 mb-12">
                  {content.sections.pros.map((pro, index) => (
                    <div key={index} className="bg-accent/5 dark:bg-accent/10 border-l-4 border-accent rounded-lg p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 font-heading">{pro.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{pro.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Cons */}
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 font-heading flex items-center gap-3">
                  <AlertTriangle className="w-8 h-8 text-primary" />
                  {content.sections.consTitle}
                </h2>
                <div className="space-y-4 mb-12">
                  {content.sections.cons.map((con, index) => (
                    <div key={index} className="bg-primary/5 dark:bg-primary/10 border-l-4 border-primary dark:border-accent rounded-lg p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 font-heading">{con.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300">{con.desc}</p>
                    </div>
                  ))}
                </div>

                {/* When to Use */}
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-16 mb-6 font-heading">
                  {content.sections.whenTitle}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{content.sections.whenIntro}</p>
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {[
                    { title: content.sections.when1, desc: content.sections.when1Desc },
                    { title: content.sections.when2, desc: content.sections.when2Desc },
                    { title: content.sections.when3, desc: content.sections.when3Desc },
                    { title: content.sections.when4, desc: content.sections.when4Desc },
                    { title: content.sections.when5, desc: content.sections.when5Desc }
                  ].map((when, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-5 h-5 text-accent" />
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white font-heading">{when.title}</h3>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{when.desc}</p>
                    </div>
                  ))}
                </div>

                {/* When Not to Use */}
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-16 mb-6 font-heading">
                  {content.sections.whenNotTitle}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{content.sections.whenNotIntro}</p>
                <div className="space-y-4 mb-12">
                  {content.sections.whenNot.map((whenNot, index) => (
                    <div key={index} className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-red-900 dark:text-red-300 mb-2 font-heading">{whenNot.title}</h3>
                      <p className="text-red-800 dark:text-red-200">{whenNot.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Strategies */}
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-16 mb-8 font-heading">
                  {content.sections.strategiesTitle}
                </h2>
                <div className="space-y-6 mb-12">
                  {[
                    { title: content.sections.strategy1, desc: content.sections.strategy1Desc, icon: Target },
                    { title: content.sections.strategy2, desc: content.sections.strategy2Desc, icon: Layers },
                    { title: content.sections.strategy3, desc: content.sections.strategy3Desc, icon: TrendingUp },
                    { title: content.sections.strategy4, desc: content.sections.strategy4Desc, icon: Star },
                    { title: content.sections.strategy5, desc: content.sections.strategy5Desc, icon: Zap }
                  ].map((strategy, index) => (
                    <div key={index} className="bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-xl p-6 border border-primary/20 dark:border-accent/20">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/20 dark:bg-accent/30 rounded-lg flex items-center justify-center">
                          <strategy.icon className="w-5 h-5 text-primary dark:text-accent" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white font-heading">{strategy.title}</h3>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{strategy.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Case Study */}
                <div className="bg-gradient-to-br from-accent/10 to-primary/10 dark:from-accent/20 dark:to-primary/20 rounded-2xl p-8 mb-12 border-2 border-accent/30 dark:border-accent/40">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-heading">{content.sections.caseTitle}</h3>
                  <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">{content.sections.caseContent}</p>
                </div>
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-br from-primary via-primary-dark to-secondary dark:from-secondary dark:via-primary-dark dark:to-primary rounded-2xl p-8 md:p-12 text-center mt-16 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-4 font-heading">
                  {content.cta.title}
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  {content.cta.description}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href={`/${locale}/platforms`}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-bold font-heading hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Star className="w-5 h-5" />
                    {content.cta.compareBtn}
                  </Link>
                  <Link
                    href={`/${locale}/gids/platform-selectie/platform-selectie-quiz`}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-xl font-bold font-heading hover:bg-accent-dark transition-all shadow-lg hover:shadow-xl"
                  >
                    <CheckCircle className="w-5 h-5" />
                    {content.cta.quizBtn}
                  </Link>
                </div>
              </div>

              {/* Related Articles */}
              <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                  {content.related.title}
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <Link href={`/${locale}/gids/platform-selectie/beste-freelance-platform-kiezen`} className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-all">
                    <Target className="w-8 h-8 text-primary dark:text-accent mb-3" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-accent font-heading">{content.related.beste}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{content.related.besteDesc}</p>
                    <div className="flex items-center text-primary dark:text-accent text-sm font-semibold">{locale === 'nl' ? 'Lees meer' : 'Read more'} <ArrowRight className="w-4 h-4 ml-1" /></div>
                  </Link>
                  <Link href={`/${locale}/gids/platform-selectie/belangrijke-selectiefactoren`} className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-all">
                    <CheckCircle className="w-8 h-8 text-primary dark:text-accent mb-3" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-accent font-heading">{content.related.factoren}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{content.related.factorenDesc}</p>
                    <div className="flex items-center text-primary dark:text-accent text-sm font-semibold">{locale === 'nl' ? 'Lees meer' : 'Read more'} <ArrowRight className="w-4 h-4 ml-1" /></div>
                  </Link>
                  <Link href={`/${locale}/gids/platform-selectie/beginner-vs-expert-platforms`} className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-all">
                    <TrendingUp className="w-8 h-8 text-primary dark:text-accent mb-3" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-accent font-heading">{content.related.beginnerExpert}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{content.related.beginnerExpertDesc}</p>
                    <div className="flex items-center text-primary dark:text-accent text-sm font-semibold">{locale === 'nl' ? 'Lees meer' : 'Read more'} <ArrowRight className="w-4 h-4 ml-1" /></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
