import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AdWidget } from '@/components/AdWidget';
import { FolderOpen, Star, Award, CheckCircle, ArrowRight, Zap, TrendingUp, Eye, Image } from 'lucide-react';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;

  const slug = 'building-portfolio-that-converts';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

  if (locale === 'nl') {
    return {
      title: 'Portfolio Bouwen dat Converteert: Best Practices & Voorbeelden',
      description: 'Creëer een freelance portfolio dat converteert. Bewezen best practices, echte voorbeelden en templates die je aanvraagpercentage met 45% verhogen.',
      keywords: 'portfolio bouwen freelance, werk showcasen, portfolio voorbeelden conversie, freelance portfolio maken, portfolio best practices',
      openGraph: {
        title: 'Portfolio Bouwen dat Converteert: Best Practices & Voorbeelden',
        description: 'Creëer een portfolio dat 45% meer klanten converteert. Bewezen best practices en echte voorbeelden.',
        url: pageUrl,
        siteName: 'SkillLinkup',
        images: [
          {
            url: `${siteUrl}/images/og/resources-og.png`,
            width: 1200,
            height: 630,
            alt: 'Portfolio Bouwen dat Converteert: Best Practices & Voorbeelden',
          }
        ],
        locale: 'nl_NL',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Portfolio Bouwen dat Converteert: Best Practices & Voorbeelden',
        description: 'Creëer een freelance portfolio dat converteert. Bewezen best practices, echte voorbeelden en templates die je aanvraagpercentage met 45% verhogen.',
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
    title: 'Build a Portfolio That Converts: Best Practices & Examples',
    description: 'Create a freelance portfolio that converts browsers into clients. Get proven best practices, real examples, and templates that increase hiring rates by 45%.',
    keywords: 'freelance portfolio examples, portfolio best practices, how to build portfolio, portfolio that converts, freelance showcase',
    openGraph: {
      title: 'Build a Portfolio That Converts: Best Practices & Examples',
      description: 'Create a portfolio that converts 45% more clients. Proven best practices and real examples included.',
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [
        {
          url: `${siteUrl}/images/og/resources-og.png`,
          width: 1200,
          height: 630,
          alt: 'Build a Portfolio That Converts: Best Practices & Examples',
        }
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Build a Portfolio That Converts: Best Practices & Examples',
      description: 'Create a freelance portfolio that converts browsers into clients. Get proven best practices, real examples, and templates that increase hiring rates by 45%.',
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

export default async function BuildingPortfolioThatConverts({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const content = locale === 'nl' ? {
    hero: {
      title: "Portfolio Bouwen dat Converteert: Best Practices en Voorbeelden",
      subtitle: "Stop met werk showcasen dat niet verkoopt. Leer hoe je een portfolio bouwt dat bezoekers omzet in klanten met bewezen frameworks, echte voorbeelden en templates die je aanvraagpercentage met 45% verhogen.",
      cta1: "Bekijk Top Platforms",
      cta2: "Lees Expert Gidsen"
    },
    stats: {
      conversion: "45% Hogere Conversie",
      conversionDesc: "Bezoekers naar aanvragen ratio",
      pieces: "5-8 Portfolio Stukken",
      piecesDesc: "Optimaal aantal voor conversie",
      clients: "3x Meer Premium Klanten",
      clientsDesc: "Met strategische positionering"
    },
    intro: {
      title: "Waarom de Meeste Freelance Portfolio's Niet Converteren",
      text: "Je portfolio is je krachtigste verkooptool, maar 80% van alle freelance portfolio's converteert geen bezoekers naar klanten. Het verschil tussen portfolio's die stof verzamelen en portfolio's die consistente aanvragen genereren zit niet in de kwaliteit van het werk—maar in hoe dat werk wordt gepresenteerd, gecontextualiseerd en strategisch gepositioneerd. Deze uitgebreide gids onthult het conversie-gerichte portfolio framework dat wordt gebruikt door zes-cijfer freelancers."
    },
    section1: {
      title: "Het Portfolio Conversie Framework: 5 Essentiële Elementen",
      intro: "Een portfolio dat converteert is meer dan een verzameling werkvoorbeelden. Het is een strategisch ontworpen verkooptraject dat potentiële klanten van interesse naar actie leidt. Elk element speelt een kritische rol in het opbouwen van vertrouwen, het demonstreren van waarde en het motiveren tot contact.",
      element1: {
        title: "1. Strategische Projectselectie: Kwaliteit boven Kwantiteit",
        text: "De grootste fout die freelancers maken is te veel werk tonen. Onderzoek toont aan dat portfolio's met 5-8 zorgvuldig geselecteerde stukken 45% beter converteren dan portfolio's met 15+ projecten. Meer werk verdunt je boodschap en overweldigt potentiële klanten.",
        subtitle: "Selectiecriteria voor High-Impact Portfolio Stukken:",
        criteria: [
          "Resultaat-gedreven werk: Kies projecten met meetbare resultaten die je kunt kwantificeren",
          "Doelgroep-afstemming: Toon werk dat resoneert met je ideale klanten",
          "Proces showcase: Selecteer projecten waar je je werkwijze goed kunt demonstreren",
          "Recente relevantie: Geef voorrang aan werk van de afgelopen 12-18 maanden",
          "Visuele impact: Kies projecten die visueel overtuigend zijn en professionalisme uitstralen"
        ],
        strategy: "Portfolio Curation Strategie",
        strategyText: "Begin met een inventaris van al je werk. Beoordeel elk project op drie criteria: resultaat impact (1-10), doelgroep match (1-10), en visuele kwaliteit (1-10). Vermenigvuldig de scores voor een totaalscore. Selecteer de top 5-8 projecten en roteer ze elk kwartaal op basis van welke aanvragen ze genereren."
      },
      element2: {
        title: "2. Overtuigende Case Study Structuur: Het STAR+ Framework",
        text: "Je portfolio stukken moeten meer zijn dan mooie plaatjes. Elk stuk moet een verhaal vertellen dat aantoont hoe je problemen oplost en waarde creëert. Het STAR+ framework (Situation, Task, Action, Result, Proof) transformeert portfolio stukken in overtuigende verkoopverhalen.",
        framework: "STAR+ Framework Template:",
        sections: [
          "Situation (Context): Beschrijf de klant, hun industrie en de business challenge die ze tegenkwamen. Specifieke details maken het verhaal geloofwaardig.",
          "Task (Doel): Verduidelijk wat je moest bereiken. Wat waren de specifieke doelen, beperkingen en succesindicatoren?",
          "Action (Aanpak): Detail je proces, methodologie en creatieve beslissingen. Toon je expertise en probleemoplossend vermogen.",
          "Result (Resultaat): Kwantificeer de impact met specifieke metrics: conversie stijgingen, omzetgroei, tijdsbesparing, of gebruikerstevredenheid.",
          "Proof (Bewijs): Voeg testimonials, data screenshots, of voor-na vergelijkingen toe die je claims valideren."
        ],
        example: "Voorbeeld Case Study Opening:",
        exampleText: "\"Een e-commerce startup verloor 60% van mobiele bezoekers tijdens checkout. Ik herontwierp hun checkout flow met een mobiel-first aanpak, wat resulteerde in een 47% toename in voltooide bestellingen en €180.000 extra omzet in het eerste kwartaal. De klant omschreef het als 'transformatief voor hun groei.'\""
      },
      element3: {
        title: "3. Visuele Presentatie: Toon, Vertel Niet Alleen",
        text: "Hoe je werk wordt gepresenteerd is net zo belangrijk als het werk zelf. Portfolio's met professionele visuals converteren 3x beter dan tekst-zware portfolio's. Potentiële klanten beoordelen je werk in seconden—maak die seconden tellen.",
        practices: "Visuele Best Practices:",
        list: [
          "Hero Images: Begin elk portfolio stuk met een high-impact hero image die de essentie van het project vangt",
          "Multiple Formats: Combineer screenshots, mockups, process sketches, en finale deliverables",
          "Contextual Presentation: Toon werk in context (websites op devices, logos in gebruik, designs in real-world settings)",
          "Before/After Comparisons: Visualiseer transformaties met duidelijke voor-na vergelijkingen",
          "Process Documentation: Neem wireframes, sketches, of iteration examples op om je aanpak te tonen",
          "Professional Quality: Investeer in professionele product photography of mockup templates—het is het waard"
        ],
        technical: "Technische Specificaties:",
        technical1: "Images: Minimaal 1200px breed, geoptimaliseerd tot <200KB per image",
        technical2: "Format: WebP voor kleinere bestandsgroottes, met JPEG fallbacks",
        technical3: "Alt Text: Beschrijvende alt text voor accessibility en SEO",
        technical4: "Loading: Lazy loading voor snellere page performance"
      }
    },
    section2: {
      title: "Portfolio Structuur & Organisatie: Gebruikersreis Optimalisatie",
      intro: "Je portfolio structuur beïnvloedt direct hoe potentiële klanten je werk consumeren en beoordelen. Een strategisch georganiseerde portfolio leidt bezoekers naar je sterkste werk en maakt het makkelijk voor hen om te zien waarom ze met jou zouden moeten werken.",
      structure1: {
        title: "Homepage Portfolio Sectie: De 3-Seconden Test",
        text: "Je homepage portfolio sectie moet binnen 3 seconden twee vragen beantwoorden: 'Wat doe je?' en 'Ben je goed genoeg voor mijn project?' Deze sectie is je eerste indruk—maak hem tellen.",
        elements: "Kritische Homepage Elementen:",
        list: [
          "Headline & Specialisatie: Duidelijke waardepropositie en focus gebied",
          "Featured Work Grid: 3-4 van je beste projecten met thumbnails",
          "Resultaat Highlights: Kwantificeerbare resultaten direct zichtbaar",
          "Social Proof: Klant logos of testimonials voor geloofwaardigheid",
          "Clear CTA: Duidelijke volgende stap (contact, meer werk bekijken)"
        ],
        formula: "Homepage Portfolio Formula:",
        formulaText: "[Specialisatie] + [Type Klanten] + [Resultaat Focus]. Voorbeeld: 'E-commerce UX Designer helping fashion brands increase conversions through mobile-first design (avg. 40% lift).'"
      },
      structure2: {
        title: "Individuele Project Pages: Deep Dive Format",
        text: "Elk portfolio stuk verdient een dedicated page die het volledige verhaal vertelt. Deze pages zijn waar je expertise echt schijnt en waar geïnteresseerde prospects diep duiken om je aanpak en resultaten te begrijpen.",
        template: "Project Page Template Structuur:",
        sections: [
          "Hero Section: Project title, klant (indien toegestaan), category, large hero image",
          "Quick Facts Sidebar: Project timeline, je rol, tools gebruikt, team grootte, sleutel metrics",
          "Challenge Section: Client context, business problem, beperkingen, wat er op het spel stond",
          "Solution Section: Je aanpak, proces overview, belangrijke beslissingen, methodologie",
          "Visual Showcase: Multiple images, mockups, screenshots die het werk tonen",
          "Results Section: Kwantificeerbare outcomes, voor/na metrics, klant feedback",
          "Testimonial: Klant quote die je impact valideert",
          "CTA: Volgende stap voor geïnteresseerde prospects"
        ]
      },
      structure3: {
        title: "Navigatie & Filtering: Maak Ontdekking Makkelijk",
        text: "Als bezoekers niet snel kunnen vinden wat ze zoeken, vertrekken ze. Implementeer slimme navigatie en filtering die prospects helpt relevant werk te ontdekken op basis van hun behoeften.",
        filters: "Portfolio Filter Opties:",
        list: [
          "By Category: Maak categories op basis van service type (web design, branding, development)",
          "By Industry: Filter op client industrie (tech, healthcare, e-commerce)",
          "By Project Type: Organiseer op project scope (full redesign, ongoing, sprint project)",
          "By Skill: Tag projecten met relevante skills of tools"
        ],
        ux: "Navigatie UX Best Practices:",
        ux1: "Sticky Navigation: Houd filter opties zichtbaar tijdens scrollen",
        ux2: "Active Filters: Toon welke filters actief zijn met duidelijke visuele indicators",
        ux3: "Result Count: Toon hoeveel projecten matchen met huidige filters",
        ux4: "Clear All: Bied een makkelijke manier om alle filters te resetten"
      }
    },
    section3: {
      title: "Conversie Optimalisatie: Van Portfolio Bezoek naar Client Aanvraag",
      intro: "Een mooi portfolio is niet genoeg—het moet actie motiveren. Conversie optimalisatie transformeert je portfolio van een passieve showcase naar een actieve client acquisition tool. Elk element moet bezoekers dichter bij contact brengen.",
      optimization1: {
        title: "Strategische CTA Plaatsing: Guided Action Hierarchy",
        text: "Call-to-actions moeten niet opdringerig zijn, maar ze moeten ook niet gemist worden. Strategische CTA plaatsing op verschillende engagement niveaus maximaliseert conversies zonder geïnteresseerde prospects weg te jagen.",
        hierarchy: "CTA Hierarchy Framework:",
        levels: [
          "Primary CTA (Homepage): Prominent 'Start a Project' of 'Get a Quote' button in de hero section",
          "Secondary CTA (Portfolio Piece): 'Interested in Similar Results?' aan het einde van case studies",
          "Tertiary CTA (About Page): 'Let's Talk About Your Project' na je expertise wordt getoond",
          "Exit Intent CTA: Popup of banner wanneer gebruikers op het punt staan te vertrekken"
        ],
        copywriting: "CTA Copywriting Principes:",
        principles: [
          "Action-Oriented: Gebruik sterke werkwoorden (Start, Get, Explore, Discover)",
          "Value-Focused: Communiceer wat ze krijgen (Free Consultation, Project Quote)",
          "Low-Friction: Verminder perceptie van commitment (No Obligation, Quick Chat)",
          "Urgency (Subtle): Voeg zachte urgentie toe zonder desperate te klinken"
        ]
      },
      optimization2: {
        title: "Social Proof Integratie: Bouw Vertrouwen op Elk Niveau",
        text: "Vertrouwen is de grootste barrière tot conversie. Strategische social proof integratie gedurende je portfolio overwint bezwaren, valideert expertise en geeft prospects het vertrouwen om contact op te nemen.",
        types: "Types Social Proof voor Portfolio:",
        list: [
          "Client Testimonials: Quotes van tevreden klanten met naam, rol en foto",
          "Case Study Results: Harde data die je impact toont",
          "Client Logos: Herkenbare merken waar je voor hebt gewerkt",
          "Awards & Recognition: Industrie awards of features in publicaties",
          "Certification Badges: Relevante certificeringen of platform badges",
          "Project Statistics: Totaal aantal projecten, jaren ervaring, clients geholpen"
        ],
        placement: "Social Proof Placement Strategy:",
        placement1: "Homepage: Client logos of featured testimonial",
        placement2: "Portfolio Pieces: Client quotes na result section",
        placement3: "About Page: Comprehensive credentials en achievements",
        placement4: "Contact Page: Quick trust signals bij contact form"
      },
      optimization3: {
        title: "Frictionless Contact: Maak Conversie Makkelijk",
        text: "Elke extra stap tussen interesse en contact verhoogt het risico dat prospects afhaken. Ontwerp je contact flow om friction te minimaliseren terwijl je genoeg informatie verzamelt om kwalificatie mogelijk te maken.",
        form: "Contact Form Best Practices:",
        practices: [
          "Minimal Fields: Vraag alleen essentiele informatie (naam, email, project type)",
          "Smart Defaults: Pre-select common options op basis van de portfolio piece die ze bekeken",
          "Progress Indicators: Als je een multi-step form hebt, toon voortgang",
          "Instant Validation: Realtime validatie voor form fields om fouten te voorkomen",
          "Mobile Optimization: Grote tap targets, autocomplete support, mobile-friendly inputs"
        ],
        alternatives: "Alternatieve Contact Opties:",
        alt1: "Direct Email Link: Voor mensen die forms liever overslaan",
        alt2: "Calendar Integration: Embedded booking voor consultations",
        alt3: "WhatsApp/Telegram: Instant messaging voor snelle vragen",
        alt4: "Live Chat: Realtime support tijdens browsing"
      }
    },
    section4: {
      title: "Platform-Specifieke Portfolio Strategieën: Maximale Zichtbaarheid",
      intro: "Verschillende freelance platforms hebben verschillende portfolio features, beperkingen en best practices. Optimaliseer je portfolio presentatie voor elk platform waar je actief bent om maximale zichtbaarheid en conversie te bereiken.",
      upwork: {
        title: "Upwork Portfolio Optimalisatie",
        text: "Upwork's portfolio systeem beïnvloedt je profile visibility en client perception direct. Gebruik deze features strategisch om je profile naar boven te krijgen.",
        tips: [
          "Featured Project: Zet je sterkste, meest relevante project als featured met impactvolle thumbnail",
          "Project Titles: Gebruik keyword-rich titles die matchen met wat clients zoeken",
          "Descriptions: Focus op client results en business impact in de eerste 2 zinnen",
          "Skills Tagging: Tag elk project met alle relevante skills om in zoekopdrachten te verschijnen",
          "Client Testimonials: Vraag clients om feedback direct op de platform voor extra social proof",
          "Regular Updates: Refresh je portfolio elke 2-3 maanden met recente werk"
        ]
      },
      fiverr: {
        title: "Fiverr Gig Gallery Strategie",
        text: "Fiverr's gig structure vereist een andere aanpak. Je portfolio moet snel showcasen dat je consistent high-quality werk levert.",
        tips: [
          "Gig Images: 3 impactvolle portfolio pieces in elke gig gallery",
          "Before/After: Transformatie shots converteren beter op Fiverr",
          "Consistent Style: Toon consistentie in kwaliteit en delivery",
          "Quick Showcase: Buyers scannen snel—gebruik visuals die instant impact maken",
          "Relevant to Package: Match portfolio pieces met specifieke gig packages"
        ]
      },
      freelancer: {
        title: "Freelancer.com Portfolio Tips",
        text: "Freelancer.com's bid-based model betekent dat je portfolio moet tonen dat je bids waard zijn.",
        tips: [
          "Detailed Descriptions: Leg je proces en value proposition uit",
          "Cost vs Value: Laat zien hoe je werk ROI genereert",
          "Range of Work: Toon versatiliteit binnen je niche",
          "Recent Work: Prioritize recent projecten voor relevantie"
        ]
      }
    },
    section5: {
      title: "Maintenance & Evolution: Houd Je Portfolio Relevant",
      intro: "Een portfolio is niet een 'set and forget' asset. De meest effectieve portfolios evolueren met je skills, target markt en industrie trends. Implementeer een maintenance routine die je portfolio fresh, relevant en conversion-focused houdt.",
      update: {
        title: "Portfolio Update Cadence",
        text: "Creëer een systematisch update schema dat je portfolio current houdt zonder overwhelmed te raken.",
        schedule: "Update Schedule:",
        quarterly: "Quarterly Review (Elk Kwartaal):",
        quarterlyList: [
          "Voeg 1-2 nieuwste projecten toe die je beste werk vertegenwoordigen",
          "Vervang onderpresterende portfolio stukken (low engagement, geen aanvragen)",
          "Update metrics en resultaten voor bestaande case studies indien nieuw data beschikbaar",
          "Refresh testimonials en voeg nieuwe client feedback toe"
        ],
        annual: "Annual Audit (Jaarlijks):",
        annualList: [
          "Complete portfolio herziening—verwijder gedateerde werk",
          "Herassess je target market en pas project selectie aan",
          "Update je value proposition en messaging",
          "Refresh design en visuele presentatie indien nodig",
          "Analyseer analytics om te zien welke portfolio stukken het beste presteren"
        ]
      },
      analytics: {
        title: "Portfolio Performance Tracking",
        text: "Wat je meet, verbeter je. Track portfolio performance systematisch om data-driven decisions te maken over wat werkt en wat verbeterd moet worden.",
        metrics: "Key Metrics om te Tracken:",
        list: [
          "Page Views: Totale views per portfolio piece",
          "Time on Page: Hoe lang bezoekers op elke project page blijven",
          "Click-Through Rate: Percentage dat doorklikt van homepage naar project details",
          "Conversion Rate: Bezoekers die contact opnemen na portfolio review",
          "Source Attribution: Welke marketing kanalen sturen traffic naar je portfolio",
          "Device Breakdown: Desktop vs mobile portfolio viewing patterns"
        ],
        tools: "Analytics Tools:",
        tool1: "Google Analytics: Uitgebreide website analytics en user behavior tracking",
        tool2: "Hotjar: Heatmaps en session recordings om te zien hoe users je portfolio ervaren",
        tool3: "Platform Analytics: Gebruik ingebouwde analytics van Upwork, Fiverr, etc."
      }
    },
    cta1: {
      title: "Vind Platforms die Je Beste Werk Showcasen",
      text: "Verschillende platforms bieden verschillende portfolio features. Vergelijk portfolio opties, display formats en visibility tools op 500+ freelance marketplaces.",
      button: "Bekijk Top Platforms"
    },
    cta2: {
      title: "Begin Vandaag Je Converterende Portfolio te Bouwen",
      text: "Pas deze portfolio frameworks toe en zie je aanvraagpercentage vermenigvuldigen. Showcase werk dat verkoopt, vertel overtuigende verhalen, en positioneer jezelf als de voor de hand liggende keuze voor premium klanten.",
      button1: "Lees Meer Expert Gidsen",
      button2: "Ontvang Wekelijkse Tips"
    },
    related: {
      title: "Gerelateerde Bronnen",
      profile: {
        title: "Optimaliseer Je Profiel",
        text: "Boost zichtbaarheid met 300% met bewezen tactieken"
      },
      proposals: {
        title: "Schrijf Winnende Voorstellen",
        text: "Templates die 40% meer klanten converteren"
      },
      communication: {
        title: "Client Communicatie",
        text: "Imponneer klanten en win herhaalbusiness"
      }
    }
  } : {
    hero: {
      title: "Building a Portfolio That Converts: Best Practices and Examples",
      subtitle: "Stop showcasing work that doesn't sell. Learn how to build a portfolio that converts browsers into clients with proven frameworks, real examples, and templates that increase hiring rates by 45%.",
      cta1: "Browse Top Platforms",
      cta2: "Read Expert Guides"
    },
    stats: {
      conversion: "45% Higher Conversion",
      conversionDesc: "Views to inquiries rate",
      pieces: "5-8 Portfolio Pieces",
      piecesDesc: "Optimal number for conversion",
      clients: "3x More Premium Clients",
      clientsDesc: "With strategic positioning"
    },
    intro: {
      title: "Why Most Freelance Portfolios Fail to Convert",
      text: "Your portfolio is your most powerful sales tool, yet 80% of freelance portfolios fail to convert browsers into clients. The difference between portfolios that sit idle and those that generate consistent inquiries isn't the quality of work—it's how that work is presented, contextualized, and strategically positioned. This comprehensive guide reveals the conversion-focused portfolio framework used by six-figure freelancers."
    },
    section1: {
      title: "The Portfolio Conversion Framework: 5 Essential Elements",
      intro: "A portfolio that converts is more than a collection of work samples. It's a strategically designed sales journey that moves potential clients from interest to action. Each element plays a critical role in building trust, demonstrating value, and motivating contact.",
      element1: {
        title: "1. Strategic Project Selection: Quality Over Quantity",
        text: "The biggest mistake freelancers make is showing too much work. Research shows that portfolios with 5-8 carefully selected pieces convert 45% better than portfolios with 15+ projects. More work dilutes your message and overwhelms potential clients.",
        subtitle: "Selection Criteria for High-Impact Portfolio Pieces:",
        criteria: [
          "Result-driven work: Choose projects with measurable outcomes you can quantify",
          "Target audience alignment: Show work that resonates with your ideal clients",
          "Process showcase: Select projects where you can demonstrate your methodology",
          "Recent relevance: Prioritize work from the last 12-18 months",
          "Visual impact: Choose projects that are visually compelling and showcase professionalism"
        ],
        strategy: "Portfolio Curation Strategy",
        strategyText: "Start with an inventory of all your work. Score each project on three criteria: outcome impact (1-10), target audience match (1-10), and visual quality (1-10). Multiply the scores for a total. Select your top 5-8 projects and rotate them quarterly based on which ones generate inquiries."
      },
      element2: {
        title: "2. Compelling Case Study Structure: The STAR+ Framework",
        text: "Your portfolio pieces must be more than pretty pictures. Each piece should tell a story that demonstrates how you solve problems and create value. The STAR+ framework (Situation, Task, Action, Result, Proof) transforms portfolio pieces into compelling sales narratives.",
        framework: "STAR+ Framework Template:",
        sections: [
          "Situation (Context): Describe the client, their industry, and the business challenge they faced. Specific details make the story credible.",
          "Task (Objective): Clarify what you needed to achieve. What were the specific goals, constraints, and success indicators?",
          "Action (Approach): Detail your process, methodology, and creative decisions. Show your expertise and problem-solving ability.",
          "Result (Outcome): Quantify the impact with specific metrics: conversion increases, revenue growth, time saved, or user satisfaction.",
          "Proof (Evidence): Add testimonials, data screenshots, or before/after comparisons that validate your claims."
        ],
        example: "Example Case Study Opening:",
        exampleText: "\"An e-commerce startup was losing 60% of mobile visitors during checkout. I redesigned their checkout flow with a mobile-first approach, resulting in a 47% increase in completed orders and $180,000 in additional revenue in the first quarter. The client described it as 'transformative for their growth.'\""
      },
      element3: {
        title: "3. Visual Presentation: Show, Don't Just Tell",
        text: "How your work is presented is just as important as the work itself. Portfolios with professional visuals convert 3x better than text-heavy portfolios. Potential clients judge your work in seconds—make those seconds count.",
        practices: "Visual Best Practices:",
        list: [
          "Hero Images: Start each portfolio piece with a high-impact hero image that captures the essence of the project",
          "Multiple Formats: Combine screenshots, mockups, process sketches, and final deliverables",
          "Contextual Presentation: Show work in context (websites on devices, logos in use, designs in real-world settings)",
          "Before/After Comparisons: Visualize transformations with clear before/after comparisons",
          "Process Documentation: Include wireframes, sketches, or iteration examples to show your approach",
          "Professional Quality: Invest in professional product photography or mockup templates—it's worth it"
        ],
        technical: "Technical Specifications:",
        technical1: "Images: Minimum 1200px wide, optimized to <200KB per image",
        technical2: "Format: WebP for smaller file sizes, with JPEG fallbacks",
        technical3: "Alt Text: Descriptive alt text for accessibility and SEO",
        technical4: "Loading: Lazy loading for faster page performance"
      }
    },
    section2: {
      title: "Portfolio Structure & Organization: User Journey Optimization",
      intro: "Your portfolio structure directly impacts how potential clients consume and evaluate your work. A strategically organized portfolio guides visitors to your strongest work and makes it easy for them to see why they should work with you.",
      structure1: {
        title: "Homepage Portfolio Section: The 3-Second Test",
        text: "Your homepage portfolio section must answer two questions within 3 seconds: 'What do you do?' and 'Are you good enough for my project?' This section is your first impression—make it count.",
        elements: "Critical Homepage Elements:",
        list: [
          "Headline & Specialization: Clear value proposition and focus area",
          "Featured Work Grid: 3-4 of your best projects with thumbnails",
          "Result Highlights: Quantifiable outcomes immediately visible",
          "Social Proof: Client logos or testimonials for credibility",
          "Clear CTA: Obvious next step (contact, view more work)"
        ],
        formula: "Homepage Portfolio Formula:",
        formulaText: "[Specialization] + [Client Type] + [Result Focus]. Example: 'E-commerce UX Designer helping fashion brands increase conversions through mobile-first design (avg. 40% lift).'"
      },
      structure2: {
        title: "Individual Project Pages: Deep Dive Format",
        text: "Each portfolio piece deserves a dedicated page that tells the full story. These pages are where your expertise truly shines and where interested prospects dive deep to understand your approach and results.",
        template: "Project Page Template Structure:",
        sections: [
          "Hero Section: Project title, client (if allowed), category, large hero image",
          "Quick Facts Sidebar: Project timeline, your role, tools used, team size, key metrics",
          "Challenge Section: Client context, business problem, constraints, what was at stake",
          "Solution Section: Your approach, process overview, key decisions, methodology",
          "Visual Showcase: Multiple images, mockups, screenshots demonstrating the work",
          "Results Section: Quantifiable outcomes, before/after metrics, client feedback",
          "Testimonial: Client quote that validates your impact",
          "CTA: Next step for interested prospects"
        ]
      },
      structure3: {
        title: "Navigation & Filtering: Make Discovery Easy",
        text: "If visitors can't quickly find what they're looking for, they leave. Implement smart navigation and filtering that helps prospects discover relevant work based on their needs.",
        filters: "Portfolio Filter Options:",
        list: [
          "By Category: Create categories based on service type (web design, branding, development)",
          "By Industry: Filter by client industry (tech, healthcare, e-commerce)",
          "By Project Type: Organize by project scope (full redesign, ongoing, sprint project)",
          "By Skill: Tag projects with relevant skills or tools"
        ],
        ux: "Navigation UX Best Practices:",
        ux1: "Sticky Navigation: Keep filter options visible during scrolling",
        ux2: "Active Filters: Show which filters are active with clear visual indicators",
        ux3: "Result Count: Display how many projects match current filters",
        ux4: "Clear All: Provide an easy way to reset all filters"
      }
    },
    section3: {
      title: "Conversion Optimization: From Portfolio Visit to Client Inquiry",
      intro: "A beautiful portfolio isn't enough—it must motivate action. Conversion optimization transforms your portfolio from a passive showcase into an active client acquisition tool. Every element should move visitors closer to contact.",
      optimization1: {
        title: "Strategic CTA Placement: Guided Action Hierarchy",
        text: "Call-to-actions shouldn't be intrusive, but they also can't be missed. Strategic CTA placement at different engagement levels maximizes conversions without pushing away interested prospects.",
        hierarchy: "CTA Hierarchy Framework:",
        levels: [
          "Primary CTA (Homepage): Prominent 'Start a Project' or 'Get a Quote' button in hero section",
          "Secondary CTA (Portfolio Piece): 'Interested in Similar Results?' at end of case studies",
          "Tertiary CTA (About Page): 'Let's Talk About Your Project' after expertise is shown",
          "Exit Intent CTA: Popup or banner when users are about to leave"
        ],
        copywriting: "CTA Copywriting Principles:",
        principles: [
          "Action-Oriented: Use strong verbs (Start, Get, Explore, Discover)",
          "Value-Focused: Communicate what they get (Free Consultation, Project Quote)",
          "Low-Friction: Reduce perception of commitment (No Obligation, Quick Chat)",
          "Urgency (Subtle): Add gentle urgency without sounding desperate"
        ]
      },
      optimization2: {
        title: "Social Proof Integration: Build Trust at Every Level",
        text: "Trust is the biggest barrier to conversion. Strategic social proof integration throughout your portfolio overcomes objections, validates expertise, and gives prospects confidence to reach out.",
        types: "Types of Social Proof for Portfolios:",
        list: [
          "Client Testimonials: Quotes from satisfied clients with name, role, and photo",
          "Case Study Results: Hard data showing your impact",
          "Client Logos: Recognizable brands you've worked with",
          "Awards & Recognition: Industry awards or features in publications",
          "Certification Badges: Relevant certifications or platform badges",
          "Project Statistics: Total projects, years of experience, clients helped"
        ],
        placement: "Social Proof Placement Strategy:",
        placement1: "Homepage: Client logos or featured testimonial",
        placement2: "Portfolio Pieces: Client quotes after result section",
        placement3: "About Page: Comprehensive credentials and achievements",
        placement4: "Contact Page: Quick trust signals near contact form"
      },
      optimization3: {
        title: "Frictionless Contact: Make Conversion Easy",
        text: "Every extra step between interest and contact increases the risk of prospects dropping off. Design your contact flow to minimize friction while collecting enough information to enable qualification.",
        form: "Contact Form Best Practices:",
        practices: [
          "Minimal Fields: Ask only essential information (name, email, project type)",
          "Smart Defaults: Pre-select common options based on the portfolio piece they viewed",
          "Progress Indicators: If you have a multi-step form, show progress",
          "Instant Validation: Real-time validation for form fields to prevent errors",
          "Mobile Optimization: Large tap targets, autocomplete support, mobile-friendly inputs"
        ],
        alternatives: "Alternative Contact Options:",
        alt1: "Direct Email Link: For people who prefer to skip forms",
        alt2: "Calendar Integration: Embedded booking for consultations",
        alt3: "WhatsApp/Telegram: Instant messaging for quick questions",
        alt4: "Live Chat: Real-time support during browsing"
      }
    },
    section4: {
      title: "Platform-Specific Portfolio Strategies: Maximum Visibility",
      intro: "Different freelance platforms have different portfolio features, limitations, and best practices. Optimize your portfolio presentation for each platform where you're active to achieve maximum visibility and conversion.",
      upwork: {
        title: "Upwork Portfolio Optimization",
        text: "Upwork's portfolio system directly impacts your profile visibility and client perception. Use these features strategically to move your profile to the top.",
        tips: [
          "Featured Project: Set your strongest, most relevant project as featured with impactful thumbnail",
          "Project Titles: Use keyword-rich titles that match what clients search for",
          "Descriptions: Focus on client results and business impact in the first 2 sentences",
          "Skills Tagging: Tag each project with all relevant skills to appear in searches",
          "Client Testimonials: Ask clients for feedback directly on the platform for extra social proof",
          "Regular Updates: Refresh your portfolio every 2-3 months with recent work"
        ]
      },
      fiverr: {
        title: "Fiverr Gig Gallery Strategy",
        text: "Fiverr's gig structure requires a different approach. Your portfolio must quickly showcase that you consistently deliver high-quality work.",
        tips: [
          "Gig Images: 3 impactful portfolio pieces in each gig gallery",
          "Before/After: Transformation shots convert better on Fiverr",
          "Consistent Style: Show consistency in quality and delivery",
          "Quick Showcase: Buyers scan quickly—use visuals that make instant impact",
          "Relevant to Package: Match portfolio pieces with specific gig packages"
        ]
      },
      freelancer: {
        title: "Freelancer.com Portfolio Tips",
        text: "Freelancer.com's bid-based model means your portfolio must show that your bids are worth it.",
        tips: [
          "Detailed Descriptions: Explain your process and value proposition",
          "Cost vs Value: Show how your work generates ROI",
          "Range of Work: Show versatility within your niche",
          "Recent Work: Prioritize recent projects for relevance"
        ]
      }
    },
    section5: {
      title: "Maintenance & Evolution: Keep Your Portfolio Relevant",
      intro: "A portfolio is not a 'set and forget' asset. The most effective portfolios evolve with your skills, target market, and industry trends. Implement a maintenance routine that keeps your portfolio fresh, relevant, and conversion-focused.",
      update: {
        title: "Portfolio Update Cadence",
        text: "Create a systematic update schedule that keeps your portfolio current without getting overwhelmed.",
        schedule: "Update Schedule:",
        quarterly: "Quarterly Review (Every Quarter):",
        quarterlyList: [
          "Add 1-2 newest projects that represent your best work",
          "Replace underperforming portfolio pieces (low engagement, no inquiries)",
          "Update metrics and results for existing case studies if new data available",
          "Refresh testimonials and add new client feedback"
        ],
        annual: "Annual Audit (Yearly):",
        annualList: [
          "Complete portfolio review—remove dated work",
          "Reassess your target market and adjust project selection",
          "Update your value proposition and messaging",
          "Refresh design and visual presentation if needed",
          "Analyze analytics to see which portfolio pieces perform best"
        ]
      },
      analytics: {
        title: "Portfolio Performance Tracking",
        text: "What you measure, you improve. Track portfolio performance systematically to make data-driven decisions about what works and what needs improvement.",
        metrics: "Key Metrics to Track:",
        list: [
          "Page Views: Total views per portfolio piece",
          "Time on Page: How long visitors stay on each project page",
          "Click-Through Rate: Percentage clicking through from homepage to project details",
          "Conversion Rate: Visitors who contact after portfolio review",
          "Source Attribution: Which marketing channels send traffic to your portfolio",
          "Device Breakdown: Desktop vs mobile portfolio viewing patterns"
        ],
        tools: "Analytics Tools:",
        tool1: "Google Analytics: Comprehensive website analytics and user behavior tracking",
        tool2: "Hotjar: Heatmaps and session recordings to see how users experience your portfolio",
        tool3: "Platform Analytics: Use built-in analytics from Upwork, Fiverr, etc."
      }
    },
    cta1: {
      title: "Find Platforms That Showcase Your Best Work",
      text: "Different platforms offer different portfolio features. Compare portfolio options, display formats, and visibility tools across 500+ freelance marketplaces.",
      button: "Browse Top Platforms"
    },
    cta2: {
      title: "Start Building Your Converting Portfolio Today",
      text: "Apply these portfolio frameworks and watch your inquiry rate multiply. Showcase work that sells, tell compelling stories, and position yourself as the obvious choice for premium clients.",
      button1: "Read More Expert Guides",
      button2: "Get Weekly Tips"
    },
    related: {
      title: "Related Resources",
      profile: {
        title: "Optimize Your Profile",
        text: "Boost visibility by 300% with proven tactics"
      },
      proposals: {
        title: "Write Winning Proposals",
        text: "Templates that convert 40% more clients"
      },
      communication: {
        title: "Client Communication",
        text: "Impress clients and win repeat business"
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
                  <FolderOpen className="w-7 h-7 text-white" />
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
                  href={`/${locale}/blog`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20"
                >
                  {content.hero.cta2}
                  <Zap className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Schema.org Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": content.hero.title,
            "description": content.hero.subtitle,
            "author": {
              "@type": "Organization",
              "name": "SkillLinkup"
            },
            "publisher": {
              "@type": "Organization",
              "name": "SkillLinkup"
            },
            "datePublished": "2025-01-15",
            "dateModified": "2025-01-15"
          })
        }} />

        {/* Main Content */}
        <article className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {content.intro.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {content.intro.text}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border border-primary/20">
                  <Eye className="w-10 h-10 text-primary mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{content.stats.conversion}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{content.stats.conversionDesc}</p>
                </div>
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border border-accent/20">
                  <Star className="w-10 h-10 text-accent mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{content.stats.pieces}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{content.stats.piecesDesc}</p>
                </div>
                <div className="bg-gradient-to-br from-[#1e1541]/10 to-[#1e1541]/5 dark:from-[#1e1541]/30 dark:to-[#1e1541]/20 rounded-xl p-6 border border-[#1e1541]/20">
                  <TrendingUp className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{content.stats.clients}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{content.stats.clientsDesc}</p>
                </div>
              </div>
            </div>

            {/* Section 1: Portfolio Conversion Framework */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {content.section1.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {content.section1.intro}
              </p>

              {/* Element 1: Project Selection */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {content.section1.element1.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {content.section1.element1.text}
                </p>
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 mb-4 border border-primary/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    {content.section1.element1.subtitle}
                  </h4>
                  <ul className="space-y-2">
                    {content.section1.element1.criteria.map((criterion, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-accent/5 dark:bg-accent/10 rounded-xl p-6 border border-accent/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                    {content.section1.element1.strategy}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {content.section1.element1.strategyText}
                  </p>
                </div>
              </div>

              {/* Element 2: Case Study Structure */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {content.section1.element2.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {content.section1.element2.text}
                </p>
                <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6 mb-4 border border-accent/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    {content.section1.element2.framework}
                  </h4>
                  <ul className="space-y-3">
                    {content.section1.element2.sections.map((section, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        <strong className="text-gray-900 dark:text-white">{section.split(':')[0]}:</strong>
                        {section.split(':').slice(1).join(':')}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 border border-primary/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                    {content.section1.element2.example}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                    {content.section1.element2.exampleText}
                  </p>
                </div>
              </div>

              {/* Element 3: Visual Presentation */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {content.section1.element3.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {content.section1.element3.text}
                </p>
                <div className="bg-gradient-to-br from-[#1e1541]/5 to-[#1e1541]/10 dark:from-[#1e1541]/10 dark:to-[#1e1541]/20 rounded-xl p-6 mb-4 border border-[#1e1541]/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    {content.section1.element3.practices}
                  </h4>
                  <ul className="space-y-2">
                    {content.section1.element3.list.map((item, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        <strong className="text-gray-900 dark:text-white">{item.split(':')[0]}:</strong>
                        {item.split(':').slice(1).join(':')}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-accent/5 dark:bg-accent/10 rounded-xl p-6 border border-accent/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    {content.section1.element3.technical}
                  </h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-3">
                      <Image className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>{content.section1.element3.technical1}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Image className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>{content.section1.element3.technical2}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Image className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>{content.section1.element3.technical3}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Image className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>{content.section1.element3.technical4}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 2: Portfolio Structure */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {content.section2.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {content.section2.intro}
              </p>

              {/* Homepage Section */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {content.section2.structure1.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {content.section2.structure1.text}
                </p>
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 mb-4 border border-primary/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    {content.section2.structure1.elements}
                  </h4>
                  <ul className="space-y-2">
                    {content.section2.structure1.list.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-accent/5 dark:bg-accent/10 rounded-xl p-6 border border-accent/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                    {content.section2.structure1.formula}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {content.section2.structure1.formulaText}
                  </p>
                </div>
              </div>

              {/* Project Pages */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {content.section2.structure2.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {content.section2.structure2.text}
                </p>
                <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6 border border-accent/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    {content.section2.structure2.template}
                  </h4>
                  <ul className="space-y-2">
                    {content.section2.structure2.sections.map((section, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        <strong className="text-gray-900 dark:text-white">{section.split(':')[0]}:</strong>
                        {section.split(':').slice(1).join(':')}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Navigation & Filtering */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {content.section2.structure3.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {content.section2.structure3.text}
                </p>
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 mb-4 border border-primary/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    {content.section2.structure3.filters}
                  </h4>
                  <ul className="space-y-2">
                    {content.section2.structure3.list.map((item, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        <strong className="text-gray-900 dark:text-white">{item.split(':')[0]}:</strong>
                        {item.split(':').slice(1).join(':')}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#1e1541]/5 dark:bg-[#1e1541]/10 rounded-xl p-6 border border-[#1e1541]/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    {content.section2.structure3.ux}
                  </h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong className="text-gray-900 dark:text-white">{content.section2.structure3.ux1.split(':')[0]}:</strong>{content.section2.structure3.ux1.split(':').slice(1).join(':')}</li>
                    <li><strong className="text-gray-900 dark:text-white">{content.section2.structure3.ux2.split(':')[0]}:</strong>{content.section2.structure3.ux2.split(':').slice(1).join(':')}</li>
                    <li><strong className="text-gray-900 dark:text-white">{content.section2.structure3.ux3.split(':')[0]}:</strong>{content.section2.structure3.ux3.split(':').slice(1).join(':')}</li>
                    <li><strong className="text-gray-900 dark:text-white">{content.section2.structure3.ux4.split(':')[0]}:</strong>{content.section2.structure3.ux4.split(':').slice(1).join(':')}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3: Conversion Optimization */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {content.section3.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {content.section3.intro}
              </p>

              {/* CTA Placement */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {content.section3.optimization1.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {content.section3.optimization1.text}
                </p>
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 mb-4 border border-primary/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    {content.section3.optimization1.hierarchy}
                  </h4>
                  <ul className="space-y-2">
                    {content.section3.optimization1.levels.map((level, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        <strong className="text-gray-900 dark:text-white">{level.split(':')[0]}:</strong>
                        {level.split(':').slice(1).join(':')}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-accent/5 dark:bg-accent/10 rounded-xl p-6 border border-accent/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    {content.section3.optimization1.copywriting}
                  </h4>
                  <ul className="space-y-2">
                    {content.section3.optimization1.principles.map((principle, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        <strong className="text-gray-900 dark:text-white">{principle.split(':')[0]}:</strong>
                        {principle.split(':').slice(1).join(':')}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Social Proof */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {content.section3.optimization2.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {content.section3.optimization2.text}
                </p>
                <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6 mb-4 border border-accent/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    {content.section3.optimization2.types}
                  </h4>
                  <ul className="space-y-2">
                    {content.section3.optimization2.list.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <Star className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 border border-primary/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    {content.section3.optimization2.placement}
                  </h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong className="text-gray-900 dark:text-white">{content.section3.optimization2.placement1.split(':')[0]}:</strong>{content.section3.optimization2.placement1.split(':').slice(1).join(':')}</li>
                    <li><strong className="text-gray-900 dark:text-white">{content.section3.optimization2.placement2.split(':')[0]}:</strong>{content.section3.optimization2.placement2.split(':').slice(1).join(':')}</li>
                    <li><strong className="text-gray-900 dark:text-white">{content.section3.optimization2.placement3.split(':')[0]}:</strong>{content.section3.optimization2.placement3.split(':').slice(1).join(':')}</li>
                    <li><strong className="text-gray-900 dark:text-white">{content.section3.optimization2.placement4.split(':')[0]}:</strong>{content.section3.optimization2.placement4.split(':').slice(1).join(':')}</li>
                  </ul>
                </div>
              </div>

              {/* Frictionless Contact */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {content.section3.optimization3.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {content.section3.optimization3.text}
                </p>
                <div className="bg-gradient-to-br from-[#1e1541]/5 to-[#1e1541]/10 dark:from-[#1e1541]/10 dark:to-[#1e1541]/20 rounded-xl p-6 mb-4 border border-[#1e1541]/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    {content.section3.optimization3.form}
                  </h4>
                  <ul className="space-y-2">
                    {content.section3.optimization3.practices.map((practice, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        <strong className="text-gray-900 dark:text-white">{practice.split(':')[0]}:</strong>
                        {practice.split(':').slice(1).join(':')}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-accent/5 dark:bg-accent/10 rounded-xl p-6 border border-accent/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    {content.section3.optimization3.alternatives}
                  </h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong className="text-gray-900 dark:text-white">{content.section3.optimization3.alt1.split(':')[0]}:</strong>{content.section3.optimization3.alt1.split(':').slice(1).join(':')}</li>
                    <li><strong className="text-gray-900 dark:text-white">{content.section3.optimization3.alt2.split(':')[0]}:</strong>{content.section3.optimization3.alt2.split(':').slice(1).join(':')}</li>
                    <li><strong className="text-gray-900 dark:text-white">{content.section3.optimization3.alt3.split(':')[0]}:</strong>{content.section3.optimization3.alt3.split(':').slice(1).join(':')}</li>
                    <li><strong className="text-gray-900 dark:text-white">{content.section3.optimization3.alt4.split(':')[0]}:</strong>{content.section3.optimization3.alt4.split(':').slice(1).join(':')}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 4: Platform-Specific Strategies */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {content.section4.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {content.section4.intro}
              </p>

              {/* Upwork */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {content.section4.upwork.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {content.section4.upwork.text}
                </p>
                <ul className="space-y-2">
                  {content.section4.upwork.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fiverr */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {content.section4.fiverr.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {content.section4.fiverr.text}
                </p>
                <ul className="space-y-2">
                  {content.section4.fiverr.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Freelancer */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {content.section4.freelancer.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {content.section4.freelancer.text}
                </p>
                <ul className="space-y-2">
                  {content.section4.freelancer.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 text-[#1e1541] dark:text-white mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 5: Maintenance & Evolution */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {content.section5.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {content.section5.intro}
              </p>

              {/* Update Cadence */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {content.section5.update.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {content.section5.update.text}
                </p>
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 mb-4 border border-primary/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    {content.section5.update.schedule}
                  </h4>
                  <div className="mb-4">
                    <h5 className="font-bold text-gray-900 dark:text-white mb-2">
                      {content.section5.update.quarterly}
                    </h5>
                    <ul className="space-y-2">
                      {content.section5.update.quarterlyList.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 dark:text-white mb-2">
                      {content.section5.update.annual}
                    </h5>
                    <ul className="space-y-2">
                      {content.section5.update.annualList.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Performance Tracking */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {content.section5.analytics.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {content.section5.analytics.text}
                </p>
                <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6 mb-4 border border-accent/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    {content.section5.analytics.metrics}
                  </h4>
                  <ul className="space-y-2">
                    {content.section5.analytics.list.map((metric, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <TrendingUp className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#1e1541]/5 dark:bg-[#1e1541]/10 rounded-xl p-6 border border-[#1e1541]/20">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    {content.section5.analytics.tools}
                  </h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong className="text-gray-900 dark:text-white">{content.section5.analytics.tool1.split(':')[0]}:</strong>{content.section5.analytics.tool1.split(':').slice(1).join(':')}</li>
                    <li><strong className="text-gray-900 dark:text-white">{content.section5.analytics.tool2.split(':')[0]}:</strong>{content.section5.analytics.tool2.split(':').slice(1).join(':')}</li>
                    <li><strong className="text-gray-900 dark:text-white">{content.section5.analytics.tool3.split(':')[0]}:</strong>{content.section5.analytics.tool3.split(':').slice(1).join(':')}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Sections */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <Award className="w-16 h-16 text-white mx-auto mb-6" />
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
                <FolderOpen className="w-16 h-16 text-white mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {content.cta2.title}
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  {content.cta2.text}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href={`/${locale}/blog`}
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
                  href={`/${locale}/resources/optimizing-freelance-profile-maximum-visibility`}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group"
                >
                  <Eye className="w-10 h-10 text-primary mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {content.related.profile.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {content.related.profile.text}
                  </p>
                </Link>
                <Link
                  href={`/${locale}/resources/how-to-write-proposals-that-win`}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group"
                >
                  <Award className="w-10 h-10 text-accent mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {content.related.proposals.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {content.related.proposals.text}
                  </p>
                </Link>
                <Link
                  href={`/${locale}/resources/freelance-platform-communication`}
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
