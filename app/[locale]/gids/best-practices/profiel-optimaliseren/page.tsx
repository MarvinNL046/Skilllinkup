import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AdWidget } from '@/components/AdWidget';
import { User, Search, Star, TrendingUp, CheckCircle, ArrowRight, Zap, Eye, Award } from 'lucide-react';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;

  const slug = 'profiel-optimaliseren';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/gids/best-practices/${slug}`;

  if (locale === 'nl') {
    return {
      title: 'Profiel Optimaliseren: Word Gevonden Door Klanten [2026 Gids]',
      description: 'Boost je zichtbaarheid met 300% door je freelance profiel te optimaliseren. Bewezen strategieën voor SEO, keywords en algoritmes die meer klanten aantrekken.',
      keywords: 'profiel optimaliseren freelance, freelance profiel zichtbaarheid, upwork profiel optimaliseren, freelance SEO, profiel algoritme',
      openGraph: {
        title: 'Profiel Optimaliseren: Word Gevonden Door Klanten',
        description: 'Boost je zichtbaarheid met 300% door je profiel te optimaliseren. Bewezen strategieën voor alle platforms.',
        url: pageUrl,
        siteName: 'SkillLinkup',
        images: [
          {
            url: `${siteUrl}/images/og/resources-og.png`,
            width: 1200,
            height: 630,
            alt: 'Profiel Optimaliseren: Word Gevonden Door Klanten',
          }
        ],
        locale: 'nl_NL',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Profiel Optimaliseren: Word Gevonden Door Klanten',
        description: 'Boost je zichtbaarheid met 300% door je profiel te optimaliseren. Bewezen strategieën voor alle platforms.',
        images: [`${siteUrl}/images/og/resources-og.png`],
        creator: '@SkillLinkup',
        site: '@SkillLinkup',
      },
      alternates: {
        canonical: pageUrl,
        languages: {
          'nl': pageUrl,
        },
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  }

  return {
    title: 'Optimize Your Profile: Get Found by Clients [2026 Guide]',
    description: 'Boost your visibility by 300% by optimizing your freelance profile. Proven strategies for SEO, keywords, and algorithms that attract more clients.',
    keywords: 'optimize freelance profile, freelance profile visibility, upwork profile optimization, freelance SEO, profile algorithm',
    openGraph: {
      title: 'Optimize Your Profile: Get Found by Clients',
      description: 'Boost your visibility by 300% by optimizing your profile. Proven strategies for all platforms.',
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [
        {
          url: `${siteUrl}/images/og/resources-og.png`,
          width: 1200,
          height: 630,
          alt: 'Optimize Your Profile: Get Found by Clients',
        }
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Optimize Your Profile: Get Found by Clients',
      description: 'Boost your visibility by 300% by optimizing your profile. Proven strategies for all platforms.',
      images: [`${siteUrl}/images/og/resources-og.png`],
      creator: '@SkillLinkup',
      site: '@SkillLinkup',
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'en': pageUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function ProfielOptimaliseren({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const content = locale === 'nl' ? {
    hero: {
      title: "Profiel Optimaliseren: Word Gevonden Door Klanten",
      subtitle: "Je profiel is je digitale etalage. Leer hoe je zichtbaarheid met 300% verhoogt door slim gebruik van keywords, SEO-principes en platform algoritmes die klanten naar jou toe leiden.",
      cta1: "Bekijk Top Platforms",
      cta2: "Lees Meer Gidsen"
    },
    intro: {
      title: "Waarom Je Profiel Je Niet Gevonden Wordt",
      text: "80% van alle freelance profielen wordt nooit gezien door potentiële klanten. Niet omdat de skills ontbreken, maar omdat het profiel onzichtbaar is voor zoekmachines en platform algoritmes. Een top-1% freelance profiel combineert strategische keyword plaatsing, algoritme-optimalisatie en conversie-gerichte copywriting om constant in de top zoekresultaten te verschijnen. Deze gids onthult de exacte tactieken die zes-cijfer freelancers gebruiken om hun profiel naar de top te brengen."
    },
    section1: {
      title: "Keyword Strategie: Gevonden Worden Voor De Juiste Projecten",
      intro: "Platform algoritmes matchen klanten met freelancers op basis van keywords. Zonder strategische keyword optimalisatie blijf je onzichtbaar, zelfs met uitstekende skills. Keyword strategie gaat verder dan simpel woorden toevoegen—het vereist onderzoek, strategische plaatsing en continue optimalisatie.",
      research: {
        title: "1. Keyword Research: Ontdek Wat Klanten Zoeken",
        text: "Succesvol keyword research begint met het begrijpen van client search intent. Wat typen klanten in zoekvelden? Welke termen gebruiken ze in projectomschrijvingen? Hoe beschrijven ze hun problemen en behoeften?",
        sources: "Keyword Research Bronnen:",
        list: [
          "Platform zoekbalk: Type je vaardigheid in en bekijk autocomplete suggesties",
          "Projectomschrijvingen: Analyseer hoe klanten in je niche hun behoeften beschrijven",
          "Concurrent profielen: Bekijk top-rated freelancers en hun keyword gebruik",
          "Google Trends: Identificeer trending termen in je vakgebied",
          "Client berichten: Let op de exacte woorden die klanten gebruiken in aanvragen"
        ],
        strategy: "Keyword Categorisatie Framework:",
        categories: [
          "Primary Keywords (Hoofdvaardigheden): Je core services (bijv. 'React Developer', 'Graphic Design', 'Content Writing')",
          "Secondary Keywords (Specialisaties): Specifieke expertises (bijv. 'E-commerce UI', 'SaaS Design', 'SEO Copywriting')",
          "Long-tail Keywords (Niche): Gedetailleerde combinaties (bijv. 'React Native E-commerce App Developer')",
          "Tool Keywords: Specifieke software/platforms (bijv. 'Figma', 'WordPress', 'Adobe XD')",
          "Industry Keywords: Target industrieën (bijv. 'Healthcare', 'FinTech', 'E-learning')"
        ]
      },
      placement: {
        title: "2. Strategische Keyword Plaatsing: Algoritme Optimalisatie",
        text: "Waar je keywords plaatst is net zo belangrijk als welke keywords je kiest. Platform algoritmes wegen verschillende sectie-locaties verschillend. Strategische plaatsing maximaliseert zichtbaarheid zonder spammy te worden.",
        hierarchy: "Keyword Plaatsing Hiërarchie (Impact Ranking):",
        locations: [
          "Profile Title (100% impact): Meest gewogen sectie. Gebruik primary keyword + waardepropositie",
          "Professional Overview (90% impact): Eerste 150 karakters zijn kritisch. Front-load met belangrijkste keywords",
          "Skills Section (80% impact): Tag alle relevante skills. Platforms gebruiken deze voor matching",
          "Portfolio Titles (70% impact): Keyword-rich project titels verhogen match scores",
          "Work History Descriptions (60% impact): Integreer keywords natuurlijk in ervaring beschrijvingen",
          "Certification Names (50% impact): Relevante certificeringen signaleren expertise"
        ],
        dos: "Keyword Plaatsing Do's:",
        dosList: [
          "✅ Gebruik primary keyword in eerste 5 woorden van je titel",
          "✅ Herhaal top 3 keywords 3-5x in je overview (natuurlijk geïntegreerd)",
          "✅ Varieer keyword formulering (singular/plural, synoniemen)",
          "✅ Gebruik long-tail keywords in portfolio beschrijvingen",
          "✅ Tag alle relevante tools en technologieën"
        ],
        donts: "Keyword Plaatsing Don'ts:",
        dontsList: [
          "❌ Keyword stuffing: 'React React Developer React Expert React Specialist'",
          "❌ Irrelevante keywords om zoekopdrachten te vangen",
          "❌ Te generieke termen ('Hard Worker', 'Team Player')",
          "❌ Verouderde tools/skills om 'volledig' te lijken",
          "❌ Keyword lijsten zonder context of zinnen"
        ]
      },
      density: {
        title: "3. Keyword Dichtheid & Natuurlijke Integratie",
        text: "Platform algoritmes detecteren keyword stuffing. De kunst is keywords natuurlijk integreren terwijl je hoge dichtheid behoudt in kritische secties. Optimale keyword dichtheid varieert per platform, maar 2-4% is een veilige range voor overview secties.",
        formula: "Keyword Dichtheid Formule:",
        formulaText: "Keyword Dichtheid (%) = (Aantal keer keyword verschijnt / Totaal aantal woorden) × 100",
        example: "Voorbeeld Optimalisatie:",
        exampleBefore: "Voor: 'Ik ben een developer met veel ervaring in het maken van websites en apps voor verschillende klanten in verschillende industrieën.'",
        exampleAfter: "Na: 'React Developer gespecialiseerd in e-commerce web applicaties. Ik bouw scalable React apps voor online retailers, met focus op conversion rate optimization en mobile-first design. 50+ succesvolle React projecten in fashion & lifestyle e-commerce.'",
        analysis: "Analyse: Primary keyword 'React Developer' verschijnt 3x in 35 woorden (8.6% dichtheid voor primary), met natuurlijke context en waardepropositie."
      }
    },
    section2: {
      title: "Algoritme Optimalisatie: Hoe Freelance Platforms Ranken",
      intro: "Elk freelance platform heeft een uniek algoritme dat bepaalt wie bovenaan zoekresultaten verschijnt. Begrip van deze algoritmes en optimalisatie voor ranking factoren is de sleutel tot consistente zichtbaarheid.",
      upwork: {
        title: "Upwork Algoritme: Job Success Score & Matching",
        text: "Upwork's algoritme weegt meerdere factoren om relevantie en kwaliteit te bepalen. De twee belangrijkste ranking factoren zijn Job Success Score (JSS) en keyword relevantie.",
        factors: "Upwork Ranking Factoren (Gewogen Belang):",
        list: [
          "Job Success Score (30%): Percentage succesvolle projecten, client feedback, repeats",
          "Keyword Match (25%): Hoeveel zoekwoorden matchen met je profiel",
          "Profile Completeness (15%): Alle secties ingevuld, verifieëerd, portfolio items",
          "Recent Activity (10%): Recente projects, proposals, logins",
          "Client Ratings (10%): Star ratings en geschreven reviews",
          "Acceptance Rate (5%): Hoeveel offers je accepteert vs. declines",
          "Response Rate/Time (5%): Hoe snel je reageert op berichten"
        ],
        optimization: "Upwork Optimalisatie Tactieken:",
        tactics: [
          "JSS Protection: Decline risky projects. Een slecht project schaadt JSS meer dan geen project",
          "Keyword Loading: Gebruik alle 1000+ karakters in overview met keyword variaties",
          "Portfolio Refresh: Update portfolio elke 2-3 weken met nieuwe work",
          "Specialized Profile: Niche specialisatie rankt hoger dan generalist",
          "Rising Talent Badge: Voor nieuwe accounts, behaal dit voor visibility boost",
          "Client Feedback Loop: Vraag tevreden klanten om uitgebreide feedback met keywords"
        ]
      },
      fiverr: {
        title: "Fiverr Algoritme: Gig Optimization & Level System",
        text: "Fiverr's algoritme bevoordeelt actieve sellers met hoge completion rates. Het level systeem (New, Level 1, Level 2, Top Rated) beïnvloedt zichtbaarheid dramatisch.",
        gig: "Gig SEO Optimalisatie:",
        gigList: [
          "Gig Title: 60 karakters met primary keyword aan het begin",
          "Gig Tags: Gebruik alle 5 tags met high-search-volume keywords",
          "Gig Description: Front-load eerste 150 karakters met keywords",
          "FAQ Section: Integreer long-tail keywords in vragen en antwoorden",
          "Gig Images: Alt-text en bestandsnamen met keywords (Fiverr indexeert deze)",
          "Video Thumbnail: Custom thumbnail met keyword overlay tekst"
        ],
        levels: "Level Systeem Strategie:",
        levelsTactics: [
          "New Seller: Focus op 100% completion rate. Accepteer alleen projecten die je zeker kunt leveren",
          "Level 1 (10 orders, 60 dagen): Maintain 4.7+ rating. Snelle response times (<1 hour)",
          "Level 2 (50 orders, 120 dagen): Diversify gig portfolio. Test nieuwe gig variaties",
          "Top Rated: Maintain status met perfect delivery, upsells, repeat clients"
        ]
      },
      freelancer: {
        title: "Freelancer.com Algoritme: Bid Positioning & Reputation",
        text: "Freelancer.com gebruikt een bid-based systeem waar algoritme bepaalt welke bids klanten eerst zien. Reputation score en bid quality zijn primaire factoren.",
        bidOptimization: "Bid Visibility Optimalisatie:",
        bidList: [
          "Bid Early: Eerste 5-10 bids krijgen meeste visibility",
          "Keyword in Bid Title: Match exact keywords uit project post",
          "Bid Description: Herhaal client's probleem met hun keywords",
          "Portfolio Links: Direct link naar relevant werk in bid",
          "Response Template: Personaliseer template met project-specifieke keywords"
        ]
      }
    },
    section3: {
      title: "Profiel Completeness: Elke Sectie Telt",
      intro: "Incomplete profielen worden gepenaliseerd door platform algoritmes. Een 100% compleet profiel signaleert professionaliteit en verhoogt ranking. Elke sectie is een kans om keywords te integreren en expertise te demonstreren.",
      checklist: {
        title: "Complete Profiel Checklist (Platform-Agnostic):",
        items: [
          "✅ Professional profielfoto (gezicht zichtbaar, professionele achtergrond)",
          "✅ Keyword-geoptimaliseerde titel/headline (60 karakters max)",
          "✅ Uitgebreide overview/bio (800-1200 woorden met keyword integratie)",
          "✅ Skills tagged (minimum 10, maximum relevante skills)",
          "✅ Portfolio (5-8 best work samples met keyword-rijke beschrijvingen)",
          "✅ Work history (alle relevante ervaring met kwantificeerbare resultaten)",
          "✅ Education (degrees, relevante cursussen, bootcamps)",
          "✅ Certifications (industrie-erkende certificeringen met badges)",
          "✅ Employment preferences (hourly rate, availability, languages)",
          "✅ Verification (ID, payment method, email, phone)"
        ]
      },
      overview: {
        title: "Professional Overview: Je Sales Pitch",
        text: "Je overview is de meest gelezen sectie. Eerste 150 karakters zijn kritisch—dit is wat klanten zien in zoekresultaten voor ze doorklikliken. Gebruik deze ruimte strategisch.",
        structure: "Winning Overview Structuur (800-1200 woorden):",
        sections: [
          "Hook (Eerste 150 karakters): Waardepropositie + primary keywords + resultaat claim",
          "Expertise Breakdown (200 woorden): Wat je doet, hoe je het doet, waarom je anders bent",
          "Results & Social Proof (200 woorden): Kwantificeerbare resultaten, client testimonials, metrics",
          "Services Breakdown (200 woorden): Specifieke services met keywords en deliverables",
          "Process Overview (150 woorden): Hoe werken met jou eruitziet (verlaagt drempel)",
          "Call-to-Action (50 woorden): Volgende stap om te starten"
        ],
        hookExample: "Hook Voorbeeld:",
        hookText: "'React Developer met 47% gemiddelde conversion rate verbetering voor e-commerce klanten. Ik transformeer slow, buggy webshops naar blazing-fast Progressive Web Apps die verkopen verhogen. 50+ tevreden retailers, €2.8M extra omzet gegenereerd.'"
      }
    },
    section4: {
      title: "Social Proof & Trust Signalen: Vertrouwen Opbouwen",
      intro: "Zichtbaar zijn is stap één. Vertrouwen winnen is stap twee. Strategic social proof integratie door je profiel verhoogt conversion van profile views naar aanvragen met 40-60%.",
      testimonials: {
        title: "Client Testimonials: Laat Anderen Je Waarde Bewijzen",
        text: "Testimonials zijn de krachtigste vorm van social proof. Maar niet alle testimonials zijn gelijk gecreëerd. Strategische testimonials zijn specifiek, kwantificeerbaar en keyword-rijk.",
        request: "Testimonial Request Strategie:",
        tactics: [
          "Timing: Vraag om feedback direct na succesvolle projectafronding",
          "Guide Don't Dictate: Geef een framework maar laat klant in eigen woorden schrijven",
          "Specificity Prompt: Vraag om specifieke resultaten, metrics, transformaties",
          "Keyword Integration: Suggest ze noemen specifieke skills/tools je gebruikte",
          "Permission: Vraag toestemming voor naam, titel, bedrijf, foto"
        ],
        template: "Testimonial Request Template:",
        templateText: "'Bedankt voor de geweldige samenwerking! Zou je 2 minuten hebben om feedback te delen? Het helpt enorm als je kunt vermelden: (1) Wat was je grootste challenge voor we samenwerkten? (2) Welke specifieke resultaten heb je bereikt? (3) Wat maakte onze aanpak anders dan anderen? Veel dank!'"
      },
      portfolio: {
        title: "Portfolio Optimization: Showcase Resultaten, Niet Alleen Werk",
        text: "Je portfolio is visual social proof. Elk portfolio stuk moet een verhaal vertellen van transformatie en impact—niet alleen 'mooi werk' tonen.",
        structure: "Portfolio Piece Structuur:",
        elements: [
          "Compelling Title: 'E-commerce Checkout Redesign: 47% Conversion Increase' (niet 'Website Design')",
          "Client Context: Beschrijf de client, industrie, challenge (met keywords)",
          "Your Solution: Wat deed je? Welke skills/tools gebruikte je? (keyword opportunities)",
          "Measurable Results: Kwantificeer impact (conversie, omzet, traffic, time saved)",
          "Visual Showcase: Before/after, mockups, screenshots, proces documentatie",
          "Client Quote: 1-2 zinnen testimonial specifiek over dit project"
        ]
      },
      stats: {
        title: "Profile Statistics: Credibility Through Numbers",
        text: "Zichtbare statistics demonstreren track record en bouwen instant credibility. Highlight de meest indrukwekkende metrics prominent.",
        display: "Statistics to Highlight:",
        list: [
          "Total Projects Completed: Toon ervaring en betrouwbaarheid",
          "Client Satisfaction Rate: '98% Client Satisfaction' is krachtig",
          "Total Earnings (platform-specific): Hoge earnings = hoge value",
          "Repeat Client Rate: '60% Repeat Clients' signaleert kwaliteit",
          "Average Project Rating: 4.9/5.0 is sterke social proof",
          "Years of Experience: In je niche, niet algemeen 'werk ervaring'",
          "Certifications Earned: Aantal relevante certificeringen",
          "Industries Served: '20+ E-commerce Clients' toont specialisatie"
        ]
      }
    },
    section5: {
      title: "Testing, Tracking & Continuous Optimization",
      intro: "Profiel optimalisatie is geen one-time activiteit. Top freelancers testen systematisch, tracken metrics en optimaliseren continu op basis van data. Een test-driven aanpak maximaliseert ROI van profiel optimalisatie.",
      testing: {
        title: "A/B Testing Your Profile: Data-Driven Optimization",
        text: "Test systematisch verschillende elementen om te ontdekken wat het beste werkt voor jouw niche en target klanten. Verander één element per keer en meet impact over 2-4 weken.",
        elements: "Elements to A/B Test:",
        list: [
          "Profile Title: Test verschillende waarde proposities en keyword combinaties",
          "Overview Hook: Test verschillende eerste zinnen voor click-through impact",
          "Portfolio Order: Wissel welk werk je featured en track welke meeste aanvragen genereert",
          "Pricing: Test verschillende hourly rates of package pricing",
          "CTA Language: Test verschillende calls-to-action in je overview",
          "Profile Photo: Test professionele headshot vs. casual vs. action shot"
        ],
        method: "Testing Methodologie:",
        steps: [
          "1. Baseline Measurement: Track current metrics (profile views, proposals sent, hire rate) voor 2 weken",
          "2. Single Variable Change: Verander ÉÉN element (bijv. profile title)",
          "3. Measurement Period: Laat nieuwe versie 2-4 weken draaien",
          "4. Compare Results: Analyse impact op key metrics",
          "5. Iterate or Revert: Keep winners, revert losers, test next element"
        ]
      },
      metrics: {
        title: "Key Metrics to Track: Measure What Matters",
        text: "Track systematisch deze metrics om profiel performance te begrijpen en optimization opportunities te identificeren.",
        kpis: "Profile Performance KPIs:",
        list: [
          "Profile Views (Weekly): Totale visibility indicator",
          "Profile View to Invite Ratio: Hoeveel views worden aanvragen (conversion)",
          "Invite to Hire Ratio: Hoeveel aanvragen worden jobs (close rate)",
          "Average Project Value: Stijgende value = betere client targeting",
          "Client Repeat Rate: High repeats = strong profile positioning",
          "Search Ranking Position: Track ranking voor top 5 keywords",
          "Profile Completeness Score: Platform-specific metric",
          "Response Rate & Time: Engagement metrics die ranking beïnvloeden"
        ],
        tools: "Tracking Tools:",
        toolsList: [
          "Platform Analytics: Gebruik ingebouwde dashboards (Upwork, Fiverr analytics)",
          "Spreadsheet Tracking: Wekelijkse manual log van key metrics",
          "Keyword Rank Tracker: Check ranking voor target keywords maandelijks",
          "Screenshot Archive: Maandelijkse screenshots van profiel voor historical comparison"
        ]
      },
      optimization: {
        title: "Continuous Optimization Cycle: Never Stop Improving",
        text: "Implementeer een systematische optimization routine die je profiel ahead of competition houdt.",
        schedule: "Optimization Schedule:",
        weekly: "Weekly (15 min):",
        weeklyList: [
          "Check profile views en identify any drops",
          "Respond to alle berichten binnen 1 hour",
          "Update availability status indien nodig"
        ],
        monthly: "Monthly (1-2 hours):",
        monthlyList: [
          "Add nieuwe portfolio piece met recent work",
          "Update overview met nieuwe resultaten/metrics",
          "Refresh skills: add trending, remove outdated",
          "Analyze metrics en identify optimization opportunities",
          "Research nieuwe keywords en test in overview"
        ],
        quarterly: "Quarterly (Half day):",
        quarterlyList: [
          "Complete profiel audit: alle secties current?",
          "Competitive analysis: check top freelancers in je niche",
          "Keyword research refresh: nieuwe trends?",
          "Portfolio overhaul: remove underperformers, add 2-3 strong pieces",
          "A/B test nieuwe profile title of hook",
          "Update pricing based op market rates en je expertise level"
        ]
      }
    },
    cta1: {
      title: "Vind Het Platform Dat Je Profiel Laat Schijnen",
      text: "Verschillende platforms hebben verschillende profiel features en algoritmes. Vergelijk hoe je profiel eruit ziet en rankt op 500+ freelance marketplaces.",
      button: "Bekijk Top Platforms"
    },
    cta2: {
      title: "Begin Vandaag Met Profiel Optimalisatie",
      text: "Pas deze strategieën toe en zie je zichtbaarheid vermenigvuldigen. Word gevonden door de juiste klanten, win meer aanvragen en bouw een consistente pipeline van kwaliteitsprojecten.",
      button1: "Lees Meer Best Practices",
      button2: "Ontvang Wekelijkse Tips"
    },
    related: {
      title: "Gerelateerde Best Practices",
      proposals: {
        title: "Winnende Voorstellen Schrijven",
        text: "Voorstellen die 40% meer converteren"
      },
      portfolio: {
        title: "Portfolio Dat Converteert",
        text: "Showcase werk dat verkoopt"
      },
      communication: {
        title: "Freelance Communicatie",
        text: "Imponeer klanten vanaf dag één"
      }
    }
  } : {
    hero: {
      title: "Optimize Your Profile: Get Found By Clients",
      subtitle: "Your profile is your digital storefront. Learn how to increase visibility by 300% through smart keyword use, SEO principles, and platform algorithms that lead clients to you.",
      cta1: "Browse Top Platforms",
      cta2: "Read More Guides"
    },
    intro: {
      title: "Why Your Profile Isn't Being Found",
      text: "80% of all freelance profiles are never seen by potential clients. Not because the skills are lacking, but because the profile is invisible to search engines and platform algorithms. A top-1% freelance profile combines strategic keyword placement, algorithm optimization and conversion-focused copywriting to consistently appear in top search results. This guide reveals the exact tactics that six-figure freelancers use to bring their profile to the top."
    },
    section1: {
      title: "Keyword Strategy: Being Found For The Right Projects",
      intro: "Platform algorithms match clients with freelancers based on keywords. Without strategic keyword optimization you remain invisible, even with excellent skills. Keyword strategy goes beyond simply adding words—it requires research, strategic placement and continuous optimization.",
      research: {
        title: "1. Keyword Research: Discover What Clients Search For",
        text: "Successful keyword research starts with understanding client search intent. What do clients type in search fields? What terms do they use in project descriptions? How do they describe their problems and needs?",
        sources: "Keyword Research Sources:",
        list: [
          "Platform search bar: Type your skill and view autocomplete suggestions",
          "Project descriptions: Analyze how clients in your niche describe their needs",
          "Competitor profiles: View top-rated freelancers and their keyword usage",
          "Google Trends: Identify trending terms in your field",
          "Client messages: Note the exact words clients use in requests"
        ],
        strategy: "Keyword Categorization Framework:",
        categories: [
          "Primary Keywords (Core skills): Your core services (e.g., 'React Developer', 'Graphic Design', 'Content Writing')",
          "Secondary Keywords (Specializations): Specific expertises (e.g., 'E-commerce UI', 'SaaS Design', 'SEO Copywriting')",
          "Long-tail Keywords (Niche): Detailed combinations (e.g., 'React Native E-commerce App Developer')",
          "Tool Keywords: Specific software/platforms (e.g., 'Figma', 'WordPress', 'Adobe XD')",
          "Industry Keywords: Target industries (e.g., 'Healthcare', 'FinTech', 'E-learning')"
        ]
      },
      placement: {
        title: "2. Strategic Keyword Placement: Algorithm Optimization",
        text: "Where you place keywords is just as important as which keywords you choose. Platform algorithms weight different section locations differently. Strategic placement maximizes visibility without becoming spammy.",
        hierarchy: "Keyword Placement Hierarchy (Impact Ranking):",
        locations: [
          "Profile Title (100% impact): Most weighted section. Use primary keyword + value proposition",
          "Professional Overview (90% impact): First 150 characters are critical. Front-load with most important keywords",
          "Skills Section (80% impact): Tag all relevant skills. Platforms use these for matching",
          "Portfolio Titles (70% impact): Keyword-rich project titles increase match scores",
          "Work History Descriptions (60% impact): Integrate keywords naturally in experience descriptions",
          "Certification Names (50% impact): Relevant certifications signal expertise"
        ],
        dos: "Keyword Placement Do's:",
        dosList: [
          "✅ Use primary keyword in first 5 words of your title",
          "✅ Repeat top 3 keywords 3-5x in your overview (naturally integrated)",
          "✅ Vary keyword formulation (singular/plural, synonyms)",
          "✅ Use long-tail keywords in portfolio descriptions",
          "✅ Tag all relevant tools and technologies"
        ],
        donts: "Keyword Placement Don'ts:",
        dontsList: [
          "❌ Keyword stuffing: 'React React Developer React Expert React Specialist'",
          "❌ Irrelevant keywords to catch searches",
          "❌ Too generic terms ('Hard Worker', 'Team Player')",
          "❌ Outdated tools/skills to seem 'complete'",
          "❌ Keyword lists without context or sentences"
        ]
      },
      density: {
        title: "3. Keyword Density & Natural Integration",
        text: "Platform algorithms detect keyword stuffing. The art is integrating keywords naturally while maintaining high density in critical sections. Optimal keyword density varies per platform, but 2-4% is a safe range for overview sections.",
        formula: "Keyword Density Formula:",
        formulaText: "Keyword Density (%) = (Number of times keyword appears / Total words) × 100",
        example: "Example Optimization:",
        exampleBefore: "Before: 'I'm a developer with lots of experience building websites and apps for various clients in various industries.'",
        exampleAfter: "After: 'React Developer specialized in e-commerce web applications. I build scalable React apps for online retailers, focusing on conversion rate optimization and mobile-first design. 50+ successful React projects in fashion & lifestyle e-commerce.'",
        analysis: "Analysis: Primary keyword 'React Developer' appears 3x in 35 words (8.6% density for primary), with natural context and value proposition."
      }
    },
    section2: {
      title: "Algorithm Optimization: How Freelance Platforms Rank",
      intro: "Each freelance platform has a unique algorithm that determines who appears at the top of search results. Understanding these algorithms and optimizing for ranking factors is the key to consistent visibility.",
      upwork: {
        title: "Upwork Algorithm: Job Success Score & Matching",
        text: "Upwork's algorithm weighs multiple factors to determine relevance and quality. The two most important ranking factors are Job Success Score (JSS) and keyword relevance.",
        factors: "Upwork Ranking Factors (Weighted Importance):",
        list: [
          "Job Success Score (30%): Percentage successful projects, client feedback, repeats",
          "Keyword Match (25%): How many search terms match your profile",
          "Profile Completeness (15%): All sections filled, verified, portfolio items",
          "Recent Activity (10%): Recent projects, proposals, logins",
          "Client Ratings (10%): Star ratings and written reviews",
          "Acceptance Rate (5%): How many offers you accept vs. decline",
          "Response Rate/Time (5%): How fast you respond to messages"
        ],
        optimization: "Upwork Optimization Tactics:",
        tactics: [
          "JSS Protection: Decline risky projects. A bad project hurts JSS more than no project",
          "Keyword Loading: Use all 1000+ characters in overview with keyword variations",
          "Portfolio Refresh: Update portfolio every 2-3 weeks with new work",
          "Specialized Profile: Niche specialization ranks higher than generalist",
          "Rising Talent Badge: For new accounts, achieve this for visibility boost",
          "Client Feedback Loop: Ask satisfied clients for detailed feedback with keywords"
        ]
      },
      fiverr: {
        title: "Fiverr Algorithm: Gig Optimization & Level System",
        text: "Fiverr's algorithm favors active sellers with high completion rates. The level system (New, Level 1, Level 2, Top Rated) dramatically influences visibility.",
        gig: "Gig SEO Optimization:",
        gigList: [
          "Gig Title: 60 characters with primary keyword at the beginning",
          "Gig Tags: Use all 5 tags with high-search-volume keywords",
          "Gig Description: Front-load first 150 characters with keywords",
          "FAQ Section: Integrate long-tail keywords in questions and answers",
          "Gig Images: Alt-text and filenames with keywords (Fiverr indexes these)",
          "Video Thumbnail: Custom thumbnail with keyword overlay text"
        ],
        levels: "Level System Strategy:",
        levelsTactics: [
          "New Seller: Focus on 100% completion rate. Only accept projects you can definitely deliver",
          "Level 1 (10 orders, 60 days): Maintain 4.7+ rating. Fast response times (<1 hour)",
          "Level 2 (50 orders, 120 days): Diversify gig portfolio. Test new gig variations",
          "Top Rated: Maintain status with perfect delivery, upsells, repeat clients"
        ]
      },
      freelancer: {
        title: "Freelancer.com Algorithm: Bid Positioning & Reputation",
        text: "Freelancer.com uses a bid-based system where the algorithm determines which bids clients see first. Reputation score and bid quality are primary factors.",
        bidOptimization: "Bid Visibility Optimization:",
        bidList: [
          "Bid Early: First 5-10 bids get most visibility",
          "Keyword in Bid Title: Match exact keywords from project post",
          "Bid Description: Repeat client's problem with their keywords",
          "Portfolio Links: Direct link to relevant work in bid",
          "Response Template: Personalize template with project-specific keywords"
        ]
      }
    },
    section3: {
      title: "Profile Completeness: Every Section Counts",
      intro: "Incomplete profiles are penalized by platform algorithms. A 100% complete profile signals professionalism and increases ranking. Every section is an opportunity to integrate keywords and demonstrate expertise.",
      checklist: {
        title: "Complete Profile Checklist (Platform-Agnostic):",
        items: [
          "✅ Professional profile photo (face visible, professional background)",
          "✅ Keyword-optimized title/headline (60 characters max)",
          "✅ Extensive overview/bio (800-1200 words with keyword integration)",
          "✅ Skills tagged (minimum 10, maximum relevant skills)",
          "✅ Portfolio (5-8 best work samples with keyword-rich descriptions)",
          "✅ Work history (all relevant experience with quantifiable results)",
          "✅ Education (degrees, relevant courses, bootcamps)",
          "✅ Certifications (industry-recognized certifications with badges)",
          "✅ Employment preferences (hourly rate, availability, languages)",
          "✅ Verification (ID, payment method, email, phone)"
        ]
      },
      overview: {
        title: "Professional Overview: Your Sales Pitch",
        text: "Your overview is the most read section. First 150 characters are critical—this is what clients see in search results before they click through. Use this space strategically.",
        structure: "Winning Overview Structure (800-1200 words):",
        sections: [
          "Hook (First 150 characters): Value proposition + primary keywords + result claim",
          "Expertise Breakdown (200 words): What you do, how you do it, why you're different",
          "Results & Social Proof (200 words): Quantifiable results, client testimonials, metrics",
          "Services Breakdown (200 words): Specific services with keywords and deliverables",
          "Process Overview (150 words): What working with you looks like (lowers barrier)",
          "Call-to-Action (50 words): Next step to get started"
        ],
        hookExample: "Hook Example:",
        hookText: "'React Developer with 47% average conversion rate improvement for e-commerce clients. I transform slow, buggy webshops into blazing-fast Progressive Web Apps that increase sales. 50+ satisfied retailers, $2.8M extra revenue generated.'"
      }
    },
    section4: {
      title: "Social Proof & Trust Signals: Building Trust",
      intro: "Being visible is step one. Winning trust is step two. Strategic social proof integration throughout your profile increases conversion from profile views to requests by 40-60%.",
      testimonials: {
        title: "Client Testimonials: Let Others Prove Your Value",
        text: "Testimonials are the most powerful form of social proof. But not all testimonials are created equal. Strategic testimonials are specific, quantifiable and keyword-rich.",
        request: "Testimonial Request Strategy:",
        tactics: [
          "Timing: Ask for feedback right after successful project completion",
          "Guide Don't Dictate: Give a framework but let client write in own words",
          "Specificity Prompt: Ask for specific results, metrics, transformations",
          "Keyword Integration: Suggest they mention specific skills/tools you used",
          "Permission: Ask permission for name, title, company, photo"
        ],
        template: "Testimonial Request Template:",
        templateText: "'Thank you for the great collaboration! Would you have 2 minutes to share feedback? It helps enormously if you could mention: (1) What was your biggest challenge before we worked together? (2) What specific results did you achieve? (3) What made our approach different from others? Many thanks!'"
      },
      portfolio: {
        title: "Portfolio Optimization: Showcase Results, Not Just Work",
        text: "Your portfolio is visual social proof. Each portfolio piece should tell a story of transformation and impact—not just show 'nice work'.",
        structure: "Portfolio Piece Structure:",
        elements: [
          "Compelling Title: 'E-commerce Checkout Redesign: 47% Conversion Increase' (not 'Website Design')",
          "Client Context: Describe the client, industry, challenge (with keywords)",
          "Your Solution: What did you do? Which skills/tools did you use? (keyword opportunities)",
          "Measurable Results: Quantify impact (conversion, revenue, traffic, time saved)",
          "Visual Showcase: Before/after, mockups, screenshots, process documentation",
          "Client Quote: 1-2 sentence testimonial specific about this project"
        ]
      },
      stats: {
        title: "Profile Statistics: Credibility Through Numbers",
        text: "Visible statistics demonstrate track record and build instant credibility. Highlight the most impressive metrics prominently.",
        display: "Statistics to Highlight:",
        list: [
          "Total Projects Completed: Shows experience and reliability",
          "Client Satisfaction Rate: '98% Client Satisfaction' is powerful",
          "Total Earnings (platform-specific): High earnings = high value",
          "Repeat Client Rate: '60% Repeat Clients' signals quality",
          "Average Project Rating: 4.9/5.0 is strong social proof",
          "Years of Experience: In your niche, not general 'work experience'",
          "Certifications Earned: Number of relevant certifications",
          "Industries Served: '20+ E-commerce Clients' shows specialization"
        ]
      }
    },
    section5: {
      title: "Testing, Tracking & Continuous Optimization",
      intro: "Profile optimization is not a one-time activity. Top freelancers test systematically, track metrics and optimize continuously based on data. A test-driven approach maximizes ROI of profile optimization.",
      testing: {
        title: "A/B Testing Your Profile: Data-Driven Optimization",
        text: "Test systematically different elements to discover what works best for your niche and target clients. Change one element at a time and measure impact over 2-4 weeks.",
        elements: "Elements to A/B Test:",
        list: [
          "Profile Title: Test different value propositions and keyword combinations",
          "Overview Hook: Test different first sentences for click-through impact",
          "Portfolio Order: Switch which work you feature and track which generates most requests",
          "Pricing: Test different hourly rates or package pricing",
          "CTA Language: Test different calls-to-action in your overview",
          "Profile Photo: Test professional headshot vs. casual vs. action shot"
        ],
        method: "Testing Methodology:",
        steps: [
          "1. Baseline Measurement: Track current metrics (profile views, proposals sent, hire rate) for 2 weeks",
          "2. Single Variable Change: Change ONE element (e.g., profile title)",
          "3. Measurement Period: Let new version run for 2-4 weeks",
          "4. Compare Results: Analyze impact on key metrics",
          "5. Iterate or Revert: Keep winners, revert losers, test next element"
        ]
      },
      metrics: {
        title: "Key Metrics to Track: Measure What Matters",
        text: "Track these metrics systematically to understand profile performance and identify optimization opportunities.",
        kpis: "Profile Performance KPIs:",
        list: [
          "Profile Views (Weekly): Total visibility indicator",
          "Profile View to Invite Ratio: How many views become requests (conversion)",
          "Invite to Hire Ratio: How many requests become jobs (close rate)",
          "Average Project Value: Rising value = better client targeting",
          "Client Repeat Rate: High repeats = strong profile positioning",
          "Search Ranking Position: Track ranking for top 5 keywords",
          "Profile Completeness Score: Platform-specific metric",
          "Response Rate & Time: Engagement metrics that influence ranking"
        ],
        tools: "Tracking Tools:",
        toolsList: [
          "Platform Analytics: Use built-in dashboards (Upwork, Fiverr analytics)",
          "Spreadsheet Tracking: Weekly manual log of key metrics",
          "Keyword Rank Tracker: Check ranking for target keywords monthly",
          "Screenshot Archive: Monthly screenshots of profile for historical comparison"
        ]
      },
      optimization: {
        title: "Continuous Optimization Cycle: Never Stop Improving",
        text: "Implement a systematic optimization routine that keeps your profile ahead of competition.",
        schedule: "Optimization Schedule:",
        weekly: "Weekly (15 min):",
        weeklyList: [
          "Check profile views and identify any drops",
          "Respond to all messages within 1 hour",
          "Update availability status if needed"
        ],
        monthly: "Monthly (1-2 hours):",
        monthlyList: [
          "Add new portfolio piece with recent work",
          "Update overview with new results/metrics",
          "Refresh skills: add trending, remove outdated",
          "Analyze metrics and identify optimization opportunities",
          "Research new keywords and test in overview"
        ],
        quarterly: "Quarterly (Half day):",
        quarterlyList: [
          "Complete profile audit: all sections current?",
          "Competitive analysis: check top freelancers in your niche",
          "Keyword research refresh: new trends?",
          "Portfolio overhaul: remove underperformers, add 2-3 strong pieces",
          "A/B test new profile title or hook",
          "Update pricing based on market rates and your expertise level"
        ]
      }
    },
    cta1: {
      title: "Find The Platform That Makes Your Profile Shine",
      text: "Different platforms have different profile features and algorithms. Compare how your profile looks and ranks on 500+ freelance marketplaces.",
      button: "Browse Top Platforms"
    },
    cta2: {
      title: "Start Profile Optimization Today",
      text: "Apply these strategies and see your visibility multiply. Get found by the right clients, win more requests and build a consistent pipeline of quality projects.",
      button1: "Read More Best Practices",
      button2: "Receive Weekly Tips"
    },
    related: {
      title: "Related Best Practices",
      proposals: {
        title: "Writing Winning Proposals",
        text: "Proposals that convert 40% more"
      },
      portfolio: {
        title: "Portfolio That Converts",
        text: "Showcase work that sells"
      },
      communication: {
        title: "Freelance Communication",
        text: "Impress clients from day one"
      }
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] text-white py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <User className="w-7 h-7 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {content.hero.title}
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                {content.hero.subtitle}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  {content.hero.cta1}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href={`/${locale}/gids/best-practices`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20"
                >
                  {content.hero.cta2}
                  <Zap className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Schema.org HowTo Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": content.hero.title,
            "description": content.hero.subtitle,
            "step": [
              {
                "@type": "HowToStep",
                "name": "Keyword Research",
                "text": "Ontdek welke keywords klanten gebruiken om freelancers te vinden"
              },
              {
                "@type": "HowToStep",
                "name": "Strategic Placement",
                "text": "Plaats keywords strategisch in titel, overview en portfolio"
              },
              {
                "@type": "HowToStep",
                "name": "Algorithm Optimization",
                "text": "Optimaliseer voor platform-specifieke algoritmes"
              },
              {
                "@type": "HowToStep",
                "name": "Profile Completeness",
                "text": "Vul elk profiel veld in voor maximale visibility"
              },
              {
                "@type": "HowToStep",
                "name": "Continuous Testing",
                "text": "Test, track en optimaliseer systematisch"
              }
            ]
          })
        }} />

        {/* Main Content */}
        <article className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Intro */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {content.intro.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {content.intro.text}
              </p>
            </div>

            {/* Section 1: Keyword Strategy */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {content.section1.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {content.section1.intro}
              </p>

              {/* Keyword Research */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <Search className="w-7 h-7 text-primary" />
                  {content.section1.research.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {content.section1.research.text}
                </p>

                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 mb-4 border border-primary/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    {content.section1.research.sources}
                  </h4>
                  <ul className="space-y-2">
                    {content.section1.research.list.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span><strong>{item.split(':')[0]}:</strong>{item.split(':').slice(1).join(':')}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-accent/5 dark:bg-accent/10 rounded-xl p-6 border border-accent/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    {content.section1.research.strategy}
                  </h4>
                  <ul className="space-y-3">
                    {content.section1.research.categories.map((category, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        <strong className="text-gray-900 dark:text-white">{category.split(':')[0]}:</strong>
                        {category.split(':').slice(1).join(':')}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Strategic Placement */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {content.section1.placement.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {content.section1.placement.text}
                </p>

                <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6 mb-4 border border-accent/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    {content.section1.placement.hierarchy}
                  </h4>
                  <ul className="space-y-3">
                    {content.section1.placement.locations.map((location, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        <strong className="text-gray-900 dark:text-white">{location.split(':')[0]}:</strong>
                        {location.split(':').slice(1).join(':')}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 border border-primary/20">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                      {content.section1.placement.dos}
                    </h4>
                    <ul className="space-y-2 text-sm">
                      {content.section1.placement.dosList.map((item, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                      {content.section1.placement.donts}
                    </h4>
                    <ul className="space-y-2 text-sm">
                      {content.section1.placement.dontsList.map((item, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Keyword Density */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {content.section1.density.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {content.section1.density.text}
                </p>

                <div className="bg-[#1e1541]/5 dark:bg-[#1e1541]/10 rounded-xl p-6 mb-4 border border-[#1e1541]/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                    {content.section1.density.formula}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 font-mono text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded">
                    {content.section1.density.formulaText}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-xl p-6 border border-primary/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    {content.section1.density.example}
                  </h4>
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-1">❌ {content.section1.density.exampleBefore.split(':')[0]}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                      {content.section1.density.exampleBefore.split(':').slice(1).join(':')}
                    </p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-accent mb-1">✅ {content.section1.density.exampleAfter.split(':')[0]}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 bg-accent/5 dark:bg-accent/10 p-3 rounded border border-accent/20">
                      {content.section1.density.exampleAfter.split(':').slice(1).join(':')}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    {content.section1.density.analysis}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA 1 */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <TrendingUp className="w-16 h-16 text-white mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {content.cta1.title}
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  {content.cta1.text}
                </p>
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg"
                >
                  {content.cta1.button}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <AdWidget placement="blog_sidebar" />

            {/* Final CTA */}
            <div className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
              <div className="max-w-3xl mx-auto">
                <User className="w-16 h-16 text-white mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {content.cta2.title}
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  {content.cta2.text}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href={`/${locale}/gids/best-practices`}
                    className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg"
                  >
                    {content.cta2.button1}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href={`/${locale}/newsletter`}
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20"
                  >
                    {content.cta2.button2}
                    <Zap className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Related Resources */}
            <div className="mt-12 pt-12 border-t border-gray-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {content.related.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                  href={`/${locale}/gids/best-practices/winnende-voorstellen-schrijven`}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group"
                >
                  <Award className="w-10 h-10 text-primary mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {content.related.proposals.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {content.related.proposals.text}
                  </p>
                </Link>
                <Link
                  href={`/${locale}/gids/best-practices/portfolio-dat-converteert`}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group"
                >
                  <Eye className="w-10 h-10 text-accent mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {content.related.portfolio.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {content.related.portfolio.text}
                  </p>
                </Link>
                <Link
                  href={`/${locale}/gids/best-practices/freelance-communicatie`}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group"
                >
                  <Star className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {content.related.communication.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {content.related.communication.text}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
