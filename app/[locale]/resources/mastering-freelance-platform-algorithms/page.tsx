import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AdWidget } from '@/components/AdWidget';
import { Cpu, TrendingUp, Target, CheckCircle, ArrowRight, Zap, Bell, Award, BarChart } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const slug = 'mastering-freelance-platform-algorithms';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

  if (locale === 'nl') {
    return {
      title: 'Beheers Freelance Platform Algoritmes: Krijg Meer Job Uitnodigingen',
      description: 'Kraak de code van Upwork, Fiverr en Freelancer algoritmes. Leer hoe platform ranking werkt en verhoog job uitnodigingen met 200% met bewezen algoritmische strategieën.',
      keywords: 'upwork algoritme, fiverr algoritme, freelancer ranking, platform SEO, meer uitnodigingen krijgen, freelance zichtbaarheid, platform algoritmes begrijpen, Upwork algoritme hacken, zichtbaarheid verhogen freelance',
      openGraph: {
        title: 'Beheers Freelance Platform Algoritmes: Krijg Meer Job Uitnodigingen',
        description: 'Verhoog job uitnodigingen met 200% door te begrijpen hoe Upwork, Fiverr en Freelancer algoritmes profielen ranken.',
        url: pageUrl,
        siteName: 'SkillLinkup',
        images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Beheers Freelance Platform Algoritmes' }],
        locale: 'nl_NL',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Beheers Freelance Platform Algoritmes',
        description: 'Verhoog job uitnodigingen met 200% door platform algoritmes te begrijpen.',
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
    title: 'Master Freelance Platform Algorithms: Get More Job Invites',
    description: 'Crack the code of Upwork, Fiverr, and Freelancer algorithms. Learn how platform ranking works and boost job invites by 200% with proven algorithmic strategies.',
    keywords: 'upwork algorithm, fiverr algorithm, freelancer ranking, platform SEO, get more invites, freelance visibility',
    openGraph: {
      title: 'Master Freelance Platform Algorithms: Get More Job Invites',
      description: 'Boost job invites by 200% by understanding how Upwork, Fiverr, and Freelancer algorithms rank profiles.',
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Master Freelance Platform Algorithms' }],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Master Freelance Platform Algorithms',
      description: 'Boost job invites by 200% by understanding platform algorithms.',
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

export default async function MasteringFreelancePlatformAlgorithms({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const content = locale === 'nl' ? {
    hero: {
      title: "Platform Algoritmes Beheersen: Krijg Meer Job Uitnodigingen",
      description: "Kraak de algoritmische code van Upwork, Fiverr en Freelancer. Leer precies hoe platforms profielen ranken en implementeer strategieën die job uitnodigingen met 200% verhogen in 30-60 dagen.",
      cta1: "Bekijk Top Platforms",
      cta2: "Lees Expert Gidsen"
    },
    stats: {
      invites: "200% Meer Uitnodigingen",
      invitesDesc: "Gemiddelde toename in 60 dagen",
      ranking: "Top 10% Ranking",
      rankingDesc: "In jouw vaardigheid categorie",
      views: "5x Profiel Weergaven",
      viewsDesc: "Door zoekoptimalisatie"
    },
    intro: {
      title: "Het Verborgen Systeem Dat Jouw Freelance Succes Controleert",
      text1: "Elk freelance platform werkt met geavanceerde algoritmes die bepalen welke profielen verschijnen in zoekresultaten, directe uitnodigingen ontvangen en worden aanbevolen aan klanten. Deze algoritmes verwerken honderden signalen—van profielcompleteness en reactietijden tot job success scores en klantfeedback—om miljoenen freelancers te ranken. Begrijpen hoe deze systemen werken is het verschil tussen worstelen voor zichtbaarheid en dat klanten jou automatisch vinden.",
      text2: "Deze uitgebreide gids onthult de algoritmische mechanica achter Upwork, Fiverr, Freelancer en andere grote platforms. Je leert de exacte ranking factoren, hun relatieve gewichten en uitvoerbare strategieën om elk te optimaliseren. Freelancers die deze algoritmes beheersen zien typisch 200-300% toenames in profielweergaven en directe uitnodigingen binnen 30-60 dagen na implementatie."
    },
    platformAlgorithms: {
      title: "Platform-Specifieke Algoritme Analyses",
      description: "Elk platform gebruikt unieke ranking systemen geoptimaliseerd voor hun marktplaats model. Hier is hoe de drie grootste platforms algoritmisch freelancers ranken.",
      upwork: {
        title: "Upwork Algoritme: Job Success Score (JSS) + Relevantie",
        description: "Upwork's algoritme weegt zwaar op Job Success Score (JSS), een gepatenteerde metric die klanttevredenheid, contractvoltooiing en herhalende business combineert. Profielen met 90%+ JSS ranken significant hoger dan die onder 80%.",
        factorsTitle: "Upwork Ranking Factoren (Gewogen):",
        factors: [
          { weight: "35%", text: "Job Success Score (JSS): Privé feedback, publieke reviews, contract completeness rate, terugkerende klanten" },
          { weight: "25%", text: "Profiel Compleetheid: 100% profiel, portfolio stukken, certificeringen, werkgeschiedenis" },
          { weight: "20%", text: "Keyword Relevantie: Match tussen profiel keywords en zoektermen" },
          { weight: "10%", text: "Reactie Rate/Tijd: 90%+ reactie rate, sub-24-uur gemiddelde reactietijd" },
          { weight: "10%", text: "Activiteit Niveau: Recente login, voorstel indieningen, profiel updates" }
        ],
        strategy: "Focus eerste 10 contracten op het behalen van perfecte JSS. Wijs projecten af met rode vlaggen (onduidelijke scope, budget mismatches) die lage ratings riskeren. Gebruik Rising Talent of Top Rated badges wanneer verkrijgbaar—deze bieden algoritmische boosts van 20-30%."
      },
      fiverr: {
        title: "Fiverr Algoritme: Gig Prestatie + Verkoper Niveau",
        description: "Fiverr's algoritme prioriteert gig-niveau prestatie metrics boven verkoper profielen. Elke gig concurreert onafhankelijk, wat betekent dat meerdere succesvolle gigs jouw zichtbaarheid exponentieel kunnen versterken.",
        factorsTitle: "Fiverr Ranking Factoren (Gewogen):",
        factors: [
          { weight: "30%", text: "Gig Prestatie: Click-through rate (CTR), order conversie rate, order voltooiing rate" },
          { weight: "25%", text: "Reviews & Ratings: 5-sterren percentage, review recentheid, gedetailleerde positieve feedback" },
          { weight: "20%", text: "Verkoper Niveau: New Seller → Level 1 → Level 2 → Top Rated (algoritmische multiplier)" },
          { weight: "15%", text: "Levering Metrics: Op tijd levering rate (95%+), order voltooiing zonder annulering" },
          { weight: "10%", text: "Reactietijd: Sub-1-uur eerste reactie, 90%+ reactie rate" }
        ],
        strategy: "Optimaliseer gig afbeeldingen voor CTR (test meerdere thumbnails), overdeliver op eerste 10 orders om 5-sterren reviews te behalen, en reageer binnen 1 uur tijdens actieve uren. Niveau promoties (New → Level 1 vereist 60 dagen, 10 orders, 4.7+ rating) bieden 40-60% zichtbaarheid boosts."
      },
      freelancer: {
        title: "Freelancer.com Algoritme: Bod Concurrentievermogen + Reviews",
        description: "Freelancer.com gebruikt een competitief biedsysteem waarbij algoritmische ranking bod zichtbaarheid naar klanten bepaalt. Lagere biedingen ranken niet automatisch hoger—waarde-prijs ratio en historische prestatie wegen zwaarder.",
        factorsTitle: "Freelancer.com Ranking Factoren (Gewogen):",
        factors: [
          { weight: "30%", text: "Bod Kwaliteit Score: Relevantie voor project, voorstel detail, bod concurrentievermogen vs. budget" },
          { weight: "25%", text: "Profiel Sterkte: Voltooide projecten, inkomsten geschiedenis, vaardigheid testen, certificeringen" },
          { weight: "20%", text: "Reviews & Ratings: Algemene rating (4.8+), review hoeveelheid, recente positieve feedback" },
          { weight: "15%", text: "Mijlpaal Voltooiing: Op tijd levering, nul geschillen, terugkerende klant rate" },
          { weight: "10%", text: "Lidmaatschap Niveau: Gratis vs. betaalde lidmaatschappen (betaalde leden krijgen zichtbaarheid boost)" }
        ],
        strategy: "Schrijf gedetailleerde, aangepaste voorstellen (algoritmes detecteren en belonen voorstel inspanning), doe relevante vaardigheid testen om profiel sterkte te boosten, en handhaaf 4.9+ rating door eerste 20 projecten. Overweeg betaald lidmaatschap zodra je 10+ reviews hebt—ROI rechtvaardigt typisch kosten door verhoogde zichtbaarheid."
      }
    },
    cta1: {
      title: "Vergelijk Platforms en Hun Algoritmes",
      description: "Verschillende platforms belonen verschillende gedragingen. Vind welke marktplaats algoritmes jouw werkstijl, vaardigheden en klanttype bevoordelen om zichtbaarheid en uitnodigingen te maximaliseren.",
      button: "Bekijk Top Platforms"
    },
    universalStrategies: {
      title: "Universele Algoritmische Optimalisatie Strategieën",
      description: "Hoewel elk platform unieke algoritmes heeft, verbeteren bepaalde strategieën ranking op alle marktplaatsen. Deze universele optimalisatie tactieken vormen de basis van algoritmisch succes.",
      strategy1: {
        title: "De Eerste 10 Projecten Regel: Algoritmische Geloofwaardigheid Opbouwen",
        description: "Jouw eerste 10 voltooide projecten hebben disproportioneel impact op lange-termijn algoritmische prestatie. Algoritmes wegen vroege prestatie als signalen van aanhoudende kwaliteit. Een perfecte 5.0 rating door jouw eerste 10 projecten kan jouw ranking met 60-80% boosten vergeleken met profielen met gemengde vroege ratings.",
        strategyTitle: "Strategie:",
        steps: [
          "Accepteer alleen projecten met kristalheldere scope en redelijke tijdlijnen",
          "Overdeliver op waarde (extra revisie, snellere levering, bonus inzichten)",
          "Wijs projecten met rode vlaggen af zelfs als je het werk nodig hebt",
          "Volg op na-project om tevredenheid te verzekeren voordat review window sluit"
        ]
      },
      strategy2: {
        title: "Reactietijd Optimalisatie: De 2-Uur Regel",
        description: "Alle grote platforms volgen reactietijd en rate. Sub-2-uur gemiddelde reactietijden en 95%+ reactie rates signaleren actieve, betrokken freelancers. Deze metrics alleen kunnen ranking met 20-30% verbeteren.",
        implementationTitle: "Implementatie:",
        steps: [
          "Schakel mobiele push notificaties in voor berichten en uitnodigingen",
          "Creëer opgeslagen antwoorden voor veel voorkomende vragen (handhaaft snelheid zonder kwaliteit op te offeren)",
          "Check platform 3x daags minimum (ochtend, middag, avond)",
          "Reageer op elke uitnodiging binnen 24 uur, zelfs als je beleefd afwijst"
        ]
      },
      strategy3: {
        title: "Activiteit Signalen: De Maandelijkse Refresh Strategie",
        description: "Algoritmes bevoordelen actieve profielen boven slapende. Regelmatige activiteit signaleert dat je betrokken, beschikbaar en actueel bent in jouw vaardigheden. Maandelijkse profiel updates kunnen zichtbaarheid met 15-25% boosten.",
        checklistTitle: "Maandelijkse Checklist:",
        steps: [
          "Voeg nieuw portfolio stuk toe of update beschrijvingen",
          "Verfijn profiel overzicht met verse prestatie of metric",
          "Doe nieuwe vaardigheid test of voeg recente certificering toe",
          "Update beschikbaarheid status en uurloon indien nodig",
          "Vernieuw profiel foto of header afbeelding (zelfs kleine veranderingen signaleren activiteit)"
        ]
      }
    },
    advancedTactics: {
      title: "Geavanceerde Algoritmische Tactieken voor Aanhoudende Zichtbaarheid",
      keyword: {
        title: "Keyword Strategie: De Taal van het Algoritme Spreken",
        description: "Platform zoek algoritmes scannen jouw profiel voor keywords die overeenkomen met klant zoekopdrachten. Strategische keyword plaatsing in hoge-prioriteit secties (titel, eerste 150 karakters van overzicht, vaardigheden) verbetert relevantie scores dramatisch.",
        processTitle: "Research → Implementeer → Monitor Proces:",
        steps: [
          "1. Research: Gebruik platform zoekbalken om automatisch aanvullen suggesties te zien (dit zijn hoog-volume zoektermen)",
          "2. Analyseer Concurrenten: Bestudeer profielen die #1-5 ranken voor jouw doel keywords—identificeer veel voorkomende termen",
          "3. Natuurlijke Integratie: Plaats primaire keyword in titel, eerste zin van overzicht en als eerste vermelde vaardigheid",
          "4. Secundaire Keywords: Verdeel 3-5 gerelateerde termen door portfolio beschrijvingen en overzicht",
          "5. Monitor Prestatie: Volg profiel weergaven wekelijks—test verschillende keyword combinaties maandelijks"
        ]
      },
      specialization: {
        title: "Het Specialisatie Voordeel: Algoritmische Niche Dominantie",
        description: "Algoritmes belonen specialisatie boven generalisatie. Profielen gefocust op specifieke niches ranken hoger voor die zoekopdrachten dan generalisten profielen die concurreren over meerdere categorieën.",
        point1Title: "Waarom Specialisatie Wint:",
        point1Text: "Algoritmes berekenen relevantie scores gebaseerd op keyword dichtheid en portfolio consistentie. Een React specialist met 10 React portfolio stukken rankt hoger voor 'React ontwikkelaar' zoekopdrachten dan een full-stack ontwikkelaar met 2 React stukken tussen 10 gevarieerde projecten.",
        point2Title: "Implementatie:",
        point2Text: "Kies 1-2 kern specialisaties. Bouw alle portfolio stukken, vaardigheden en profiel taal rond deze niches. Creëer aparte profielen of gigs voor echt verschillende specialisaties in plaats van één profiel te verwateren."
      },
      timing: {
        title: "Timing Strategie: Wanneer Algoritmes Activiteit Belonen",
        description: "Platform algoritmes factoren recentheid in—recent actieve profielen ontvangen tijdelijke ranking boosts. Strategische timing van profiel updates, voorstel indieningen en login activiteit kan zichtbaarheid effecten versterken.",
        scheduleTitle: "Optimaal Activiteit Schema:",
        steps: [
          "Login Dagelijks: Zelfs 5 minuten signaleert actieve status—algoritmes volgen laatste login timestamp",
          "Dien Voorstellen In Maandag-Donderdag 8-11am Klant Tijdzone: Hoogste klant activiteit = hoogste algoritmische gewicht voor tijdige reacties",
          "Update Profiel Zondag Avonden: Vangt Maandag ochtend zoekopdrachten wanneer veel klanten nieuwe projecten plaatsen",
          "Voeg Portfolio Stukken Toe Mid-Week: Maximaliseert blootstelling tijdens hoogste wekelijkse verkeer periodes"
        ]
      }
    },
    cta2: {
      title: "Krijg Wekelijkse Algoritme Updates en Strategieën",
      description: "Platform algoritmes veranderen frequent. Sluit je aan bij 10.000+ freelancers die wekelijkse updates ontvangen over algoritme verschuivingen, optimalisatie tactieken en bewezen strategieën die nu werken.",
      button: "Krijg Wekelijkse Tips"
    },
    tracking: {
      title: "Algoritmische Prestatie Volgen: Metrics Die Ertoe Doen",
      description: "Je kunt niet optimaliseren wat je niet meet. Deze vijf metrics onthullen algoritmische prestatie en indiceren wanneer strategieën werken.",
      metric1: {
        title: "Profiel Weergave Snelheid",
        description: "Volg wekelijkse profiel weergaven. Gezonde algoritmische standing toont consistente of toenemende weergaven over tijd. Plotselinge dalingen signaleren algoritmische straffen of verminderde relevantie.",
        target: "Doel: 10-20% maand-over-maand groei in profiel weergaven"
      },
      metric2: {
        title: "Zoekresultaat Positionering",
        description: "Gebruik incognito modus om jouw doel keywords wekelijks te zoeken. Volg jouw ranking positie (pagina 1, pagina 2, etc.). Verbeterde rankings indiceren betere algoritmische optimalisatie.",
        target: "Doel: Pagina 1 (top 10-20 resultaten) binnen 60-90 dagen van optimalisatie"
      },
      metric3: {
        title: "Uitnodiging Rate",
        description: "Monitor directe uitnodigingen per week. Toenemende uitnodigingen signaleren sterke algoritmische positionering—platforms bevelen jouw profiel automatisch aan aan klanten.",
        target: "Doel: 5-10 directe uitnodigingen wekelijks voor actieve, geoptimaliseerde profielen"
      },
      metric4: {
        title: "Voorstel Zichtbaarheid Score",
        description: "Sommige platforms tonen voorstel ranking of boost status. Volg hoe vaak jouw voorstellen verschijnen in top posities. Hogere zichtbaarheid correleert met betere algemene algoritmische standing.",
        target: "Doel: 40%+ van voorstellen rankend in top 5 posities"
      },
      metric5: {
        title: "Conversie Rate (Weergaven naar Aanstellingen)",
        description: "Bereken percentage profiel weergaven leidend tot vragen of aanstellingen. Verbeterende conversie terwijl weergave snelheid behouden blijft indiceeert zowel algoritmisch succes als profiel kwaliteit.",
        target: "Doel: 2-5% conversie rate van weergaven naar project discussies"
      },
      habitTitle: "Wekelijkse Volg Gewoonte:",
      habitText: "Stel een terugkerende kalender herinnering in elke Maandag om deze vijf metrics te loggen in een eenvoudige spreadsheet. Consistent volgen onthult patronen, valideert optimalisaties en signaleert wanneer aanpassingen nodig zijn."
    },
    finalCta: {
      title: "Beheers het Algoritme, Beheers Freelancen",
      description: "Platform algoritmes begrijpen transformeert freelancen van constante drukte naar duurzame zichtbaarheid. Implementeer deze strategieën, volg jouw metrics en zie job uitnodigingen vermenigvuldigen over de komende 60 dagen.",
      cta1: "Lees Meer Expert Gidsen",
      cta2: "Bekijk Top Platforms"
    },
    relatedTitle: "Gerelateerde Bronnen",
    related: [
      {
        title: "Optimaliseer Jouw Profiel",
        description: "Verhoog zichtbaarheid met 300% met bewezen tactieken"
      },
      {
        title: "Schrijf Winnende Voorstellen",
        description: "Templates die 40% meer klanten converteren"
      },
      {
        title: "Bouw Converterende Portfolio",
        description: "Beste praktijken en echte voorbeelden"
      }
    ]
  } : {
    hero: {
      title: "Mastering Freelance Platform Algorithms: Get More Job Invites",
      description: "Crack the algorithmic code of Upwork, Fiverr, and Freelancer. Learn exactly how platforms rank profiles and implement strategies that boost job invites by 200% in 30-60 days.",
      cta1: "Browse Top Platforms",
      cta2: "Read Expert Guides"
    },
    stats: {
      invites: "200% More Invites",
      invitesDesc: "Average increase in 60 days",
      ranking: "Top 10% Ranking",
      rankingDesc: "In your skill category",
      views: "5x Profile Views",
      viewsDesc: "Through search optimization"
    },
    intro: {
      title: "The Hidden System That Controls Your Freelance Success",
      text1: "Every freelance platform operates on sophisticated algorithms that determine which profiles appear in search results, receive direct invitations, and get featured in client recommendations. These algorithms process hundreds of signals—from profile completeness and response times to job success scores and client feedback—to rank millions of freelancers. Understanding how these systems work is the difference between struggling for visibility and having clients find you automatically.",
      text2: "This comprehensive guide reveals the algorithmic mechanics behind Upwork, Fiverr, Freelancer, and other major platforms. You'll learn the exact ranking factors, their relative weights, and actionable strategies to optimize each one. Freelancers who master these algorithms typically see 200-300% increases in profile views and direct invitations within 30-60 days of implementation."
    },
    platformAlgorithms: {
      title: "Platform-Specific Algorithm Breakdowns",
      description: "Each platform uses unique ranking systems optimized for their marketplace model. Here's how the three largest platforms algorithmically rank freelancers.",
      upwork: {
        title: "Upwork Algorithm: Job Success Score (JSS) + Relevance",
        description: "Upwork's algorithm heavily weights Job Success Score (JSS), a proprietary metric combining client satisfaction, contract completion, and repeat business. Profiles with 90%+ JSS rank significantly higher than those below 80%.",
        factorsTitle: "Upwork Ranking Factors (Weighted):",
        factors: [
          { weight: "35%", text: "Job Success Score (JSS): Private feedback, public reviews, contract completion rate, repeat clients" },
          { weight: "25%", text: "Profile Completeness: 100% profile, portfolio pieces, certifications, employment history" },
          { weight: "20%", text: "Keyword Relevance: Match between profile keywords and search terms" },
          { weight: "10%", text: "Response Rate/Time: 90%+ response rate, sub-24-hour average response time" },
          { weight: "10%", text: "Activity Level: Recent login, proposal submissions, profile updates" }
        ],
        strategy: "Focus first 10 contracts on achieving perfect JSS. Decline projects with red flags (unclear scope, budget mismatches) that risk low ratings. Use Rising Talent or Top Rated badges when eligible—these provide algorithmic boosts of 20-30%."
      },
      fiverr: {
        title: "Fiverr Algorithm: Gig Performance + Seller Level",
        description: "Fiverr's algorithm prioritizes gig-level performance metrics over seller profiles. Each gig competes independently, meaning multiple successful gigs can compound your visibility exponentially.",
        factorsTitle: "Fiverr Ranking Factors (Weighted):",
        factors: [
          { weight: "30%", text: "Gig Performance: Click-through rate (CTR), order conversion rate, order completion rate" },
          { weight: "25%", text: "Reviews & Ratings: 5-star percentage, review recency, detailed positive feedback" },
          { weight: "20%", text: "Seller Level: New Seller → Level 1 → Level 2 → Top Rated (algorithmic multiplier)" },
          { weight: "15%", text: "Delivery Metrics: On-time delivery rate (95%+), order completion without cancellation" },
          { weight: "10%", text: "Response Time: Sub-1-hour first response, 90%+ response rate" }
        ],
        strategy: "Optimize gig images for CTR (test multiple thumbnails), overdeliver on first 10 orders to secure 5-star reviews, and respond within 1 hour during active hours. Level promotions (New → Level 1 requires 60 days, 10 orders, 4.7+ rating) provide 40-60% visibility boosts."
      },
      freelancer: {
        title: "Freelancer.com Algorithm: Bid Competitiveness + Reviews",
        description: "Freelancer.com uses a competitive bidding system where algorithmic ranking determines bid visibility to clients. Lower bids don't automatically rank higher—value-to-price ratio and historical performance matter more.",
        factorsTitle: "Freelancer.com Ranking Factors (Weighted):",
        factors: [
          { weight: "30%", text: "Bid Quality Score: Relevance to project, proposal detail, bid competitiveness vs. budget" },
          { weight: "25%", text: "Profile Strength: Completed projects, earnings history, skills tests, certifications" },
          { weight: "20%", text: "Reviews & Ratings: Overall rating (4.8+), review quantity, recent positive feedback" },
          { weight: "15%", text: "Milestone Completion: On-time delivery, zero disputes, repeat client rate" },
          { weight: "10%", text: "Membership Level: Free vs. paid memberships (paid members get visibility boost)" }
        ],
        strategy: "Write detailed, customized proposals (algorithms detect and reward proposal effort), take relevant skills tests to boost profile strength, and maintain 4.9+ rating through first 20 projects. Consider paid membership once you have 10+ reviews—ROI typically justifies cost through increased visibility."
      }
    },
    cta1: {
      title: "Compare Platforms and Their Algorithms",
      description: "Different platforms reward different behaviors. Find which marketplace algorithms favor your working style, skills, and client type to maximize visibility and invitations.",
      button: "Browse Top Platforms"
    },
    universalStrategies: {
      title: "Universal Algorithmic Optimization Strategies",
      description: "While each platform has unique algorithms, certain strategies improve ranking across all marketplaces. These universal optimization tactics form the foundation of algorithmic success.",
      strategy1: {
        title: "The First 10 Projects Rule: Building Algorithmic Credibility",
        description: "Your first 10 completed projects disproportionately impact long-term algorithmic performance. Algorithms weight early performance as signals of sustained quality. A perfect 5.0 rating through your first 10 projects can boost your ranking by 60-80% compared to profiles with mixed early ratings.",
        strategyTitle: "Strategy:",
        steps: [
          "Accept only projects with crystal-clear scope and reasonable timelines",
          "Overdeliver on value (extra revision, faster delivery, bonus insights)",
          "Decline projects with red flags even if you need the work",
          "Follow up post-project to ensure satisfaction before review window closes"
        ]
      },
      strategy2: {
        title: "Response Time Optimization: The 2-Hour Rule",
        description: "All major platforms track response time and rate. Sub-2-hour average response times and 95%+ response rates signal active, engaged freelancers. These metrics alone can improve ranking by 20-30%.",
        implementationTitle: "Implementation:",
        steps: [
          "Enable mobile push notifications for messages and invitations",
          "Create saved responses for common questions (maintains speed without sacrificing quality)",
          "Check platform 3x daily minimum (morning, midday, evening)",
          "Respond to every invitation within 24 hours, even if declining politely"
        ]
      },
      strategy3: {
        title: "Activity Signals: The Monthly Refresh Strategy",
        description: "Algorithms favor active profiles over dormant ones. Regular activity signals you're engaged, available, and current in your skills. Monthly profile updates can boost visibility by 15-25%.",
        checklistTitle: "Monthly Checklist:",
        steps: [
          "Add new portfolio piece or update descriptions",
          "Refine profile overview with fresh achievement or metric",
          "Take new skill test or add recent certification",
          "Update availability status and hourly rate if needed",
          "Refresh profile photo or header image (even minor changes signal activity)"
        ]
      }
    },
    advancedTactics: {
      title: "Advanced Algorithmic Tactics for Sustained Visibility",
      keyword: {
        title: "Keyword Strategy: Speaking the Algorithm's Language",
        description: "Platform search algorithms scan your profile for keywords matching client searches. Strategic keyword placement in high-priority sections (title, first 150 characters of overview, skills) improves relevance scores dramatically.",
        processTitle: "Research → Implement → Monitor Process:",
        steps: [
          "1. Research: Use platform search bars to see autocomplete suggestions (these are high-volume search terms)",
          "2. Analyze Competitors: Study profiles ranking #1-5 for your target keywords—identify common terms",
          "3. Natural Integration: Place primary keyword in title, first sentence of overview, and as first listed skill",
          "4. Secondary Keywords: Distribute 3-5 related terms throughout portfolio descriptions and overview",
          "5. Monitor Performance: Track profile views weekly—test different keyword combinations monthly"
        ]
      },
      specialization: {
        title: "The Specialization Advantage: Algorithmic Niche Dominance",
        description: "Algorithms reward specialization over generalization. Profiles focused on specific niches rank higher for those searches than generalist profiles competing across multiple categories.",
        point1Title: "Why Specialization Wins:",
        point1Text: "Algorithms calculate relevance scores based on keyword density and portfolio consistency. A React specialist with 10 React portfolio pieces ranks higher for 'React developer' searches than a full-stack developer with 2 React pieces among 10 varied projects.",
        point2Title: "Implementation:",
        point2Text: "Choose 1-2 core specializations. Build all portfolio pieces, skills, and profile language around these niches. Create separate profiles or gigs for truly distinct specializations rather than diluting one profile."
      },
      timing: {
        title: "Timing Strategy: When Algorithms Reward Activity",
        description: "Platform algorithms factor in recency—recently active profiles receive temporary ranking boosts. Strategic timing of profile updates, proposal submissions, and login activity can compound visibility effects.",
        scheduleTitle: "Optimal Activity Schedule:",
        steps: [
          "Login Daily: Even 5 minutes signals active status—algorithms track last login timestamp",
          "Submit Proposals Monday-Thursday 8-11am Client Timezone: Highest client activity = highest algorithmic weight for timely responses",
          "Update Profile Sunday Evenings: Captures Monday morning searches when many clients post new projects",
          "Add Portfolio Pieces Mid-Week: Maximizes exposure during highest weekly traffic periods"
        ]
      }
    },
    cta2: {
      title: "Get Weekly Algorithm Updates and Strategies",
      description: "Platform algorithms change frequently. Join 10,000+ freelancers receiving weekly updates on algorithm shifts, optimization tactics, and proven strategies that work right now.",
      button: "Get Weekly Tips"
    },
    tracking: {
      title: "Tracking Algorithmic Performance: Metrics That Matter",
      description: "You can't optimize what you don't measure. These five metrics reveal algorithmic performance and indicate when strategies are working.",
      metric1: {
        title: "Profile View Velocity",
        description: "Track weekly profile views. Healthy algorithmic standing shows consistent or increasing views over time. Sudden drops signal algorithmic penalties or reduced relevance.",
        target: "Target: 10-20% month-over-month growth in profile views"
      },
      metric2: {
        title: "Search Result Positioning",
        description: "Use incognito mode to search your target keywords weekly. Track your ranking position (page 1, page 2, etc.). Improved rankings indicate better algorithmic optimization.",
        target: "Target: Page 1 (top 10-20 results) within 60-90 days of optimization"
      },
      metric3: {
        title: "Invitation Rate",
        description: "Monitor direct invitations per week. Increasing invitations signal strong algorithmic positioning—platforms recommend your profile to clients automatically.",
        target: "Target: 5-10 direct invitations weekly for active, optimized profiles"
      },
      metric4: {
        title: "Proposal Visibility Score",
        description: "Some platforms show proposal ranking or boost status. Track how often your proposals appear in top positions. Higher visibility correlates with better overall algorithmic standing.",
        target: "Target: 40%+ of proposals ranking in top 5 positions"
      },
      metric5: {
        title: "Conversion Rate (Views to Hires)",
        description: "Calculate percentage of profile views leading to inquiries or hires. Improving conversion while maintaining view velocity indicates both algorithmic success and profile quality.",
        target: "Target: 2-5% conversion rate from views to project discussions"
      },
      habitTitle: "Weekly Tracking Habit:",
      habitText: "Set a recurring calendar reminder every Monday to log these five metrics in a simple spreadsheet. Consistent tracking reveals patterns, validates optimizations, and signals when adjustments are needed."
    },
    finalCta: {
      title: "Master the Algorithm, Master Freelancing",
      description: "Understanding platform algorithms transforms freelancing from constant hustle to sustainable visibility. Implement these strategies, track your metrics, and watch job invitations multiply over the next 60 days.",
      cta1: "Read More Expert Guides",
      cta2: "Browse Top Platforms"
    },
    relatedTitle: "Related Resources",
    related: [
      {
        title: "Optimize Your Profile",
        description: "Boost visibility by 300% with proven tactics"
      },
      {
        title: "Write Winning Proposals",
        description: "Templates that convert 40% more clients"
      },
      {
        title: "Build Converting Portfolio",
        description: "Best practices and real examples"
      }
    ]
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
                  <Cpu className="w-7 h-7 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {content.hero.title}
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                {content.hero.description}
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
            "description": content.hero.description,
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

            {/* Introduction */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {content.intro.title}
              </h2>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {content.intro.text1}
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {content.intro.text2}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border border-primary/20">
                    <Bell className="w-10 h-10 text-primary mb-3" />
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{content.stats.invites}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{content.stats.invitesDesc}</p>
                  </div>
                  <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border border-accent/20">
                    <TrendingUp className="w-10 h-10 text-accent mb-3" />
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{content.stats.ranking}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{content.stats.rankingDesc}</p>
                  </div>
                  <div className="bg-gradient-to-br from-[#1e1541]/10 to-[#1e1541]/5 dark:from-[#1e1541]/30 dark:to-[#1e1541]/20 rounded-xl p-6 border border-[#1e1541]/20">
                    <BarChart className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{content.stats.views}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{content.stats.viewsDesc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform-Specific Algorithms */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {content.platformAlgorithms.title}
              </h2>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {content.platformAlgorithms.description}
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    {content.platformAlgorithms.upwork.title}
                  </h3>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {content.platformAlgorithms.upwork.description}
                  </p>

                  <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 border border-primary/20 mb-4">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">{content.platformAlgorithms.upwork.factorsTitle}</h4>
                    <ul className="space-y-2 text-sm">
                      {content.platformAlgorithms.upwork.factors.map((factor, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-primary font-bold min-w-[60px]">{factor.weight}</span>
                          <span className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: factor.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{locale === 'nl' ? 'Optimalisatie Strategie:' : 'Optimization Strategy:'}</p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{content.platformAlgorithms.upwork.strategy}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 dark:bg-accent/20 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-accent" />
                    </div>
                    {content.platformAlgorithms.fiverr.title}
                  </h3>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {content.platformAlgorithms.fiverr.description}
                  </p>

                  <div className="bg-accent/5 dark:bg-accent/10 rounded-xl p-6 border border-accent/20 mb-4">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">{content.platformAlgorithms.fiverr.factorsTitle}</h4>
                    <ul className="space-y-2 text-sm">
                      {content.platformAlgorithms.fiverr.factors.map((factor, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-accent font-bold min-w-[60px]">{factor.weight}</span>
                          <span className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: factor.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{locale === 'nl' ? 'Optimalisatie Strategie:' : 'Optimization Strategy:'}</p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{content.platformAlgorithms.fiverr.strategy}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1e1541]/10 dark:bg-[#1e1541]/30 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-[#1e1541] dark:text-white" />
                    </div>
                    {content.platformAlgorithms.freelancer.title}
                  </h3>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {content.platformAlgorithms.freelancer.description}
                  </p>

                  <div className="bg-[#1e1541]/5 dark:bg-[#1e1541]/20 rounded-xl p-6 border border-[#1e1541]/20 mb-4">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">{content.platformAlgorithms.freelancer.factorsTitle}</h4>
                    <ul className="space-y-2 text-sm">
                      {content.platformAlgorithms.freelancer.factors.map((factor, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-[#1e1541] dark:text-white font-bold min-w-[60px]">{factor.weight}</span>
                          <span className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: factor.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#1e1541] dark:text-white flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{locale === 'nl' ? 'Optimalisatie Strategie:' : 'Optimization Strategy:'}</p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{content.platformAlgorithms.freelancer.strategy}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section 1 */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <Cpu className="w-16 h-16 text-white mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {content.cta1.title}
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  {content.cta1.description}
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

            {/* Universal Optimization Strategies */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {content.universalStrategies.title}
              </h2>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {content.universalStrategies.description}
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border border-primary/20">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                    <Award className="w-6 h-6 text-primary" />
                    {content.universalStrategies.strategy1.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                    {content.universalStrategies.strategy1.description}
                  </p>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{content.universalStrategies.strategy1.strategyTitle}</p>
                    <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      {content.universalStrategies.strategy1.steps.map((step, idx) => (
                        <li key={idx}>→ {step}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border border-accent/20">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                    <Bell className="w-6 h-6 text-accent" />
                    {content.universalStrategies.strategy2.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                    {content.universalStrategies.strategy2.description}
                  </p>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{content.universalStrategies.strategy2.implementationTitle}</p>
                    <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      {content.universalStrategies.strategy2.steps.map((step, idx) => (
                        <li key={idx}>→ {step}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#1e1541]/10 to-[#1e1541]/5 dark:from-[#1e1541]/30 dark:to-[#1e1541]/20 rounded-xl p-6 border border-[#1e1541]/20">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                    <BarChart className="w-6 h-6 text-[#1e1541] dark:text-white" />
                    {content.universalStrategies.strategy3.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                    {content.universalStrategies.strategy3.description}
                  </p>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{content.universalStrategies.strategy3.checklistTitle}</p>
                    <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      {content.universalStrategies.strategy3.steps.map((step, idx) => (
                        <li key={idx}>→ {step}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Ad Widget */}
            <div className="mb-12">
              <AdWidget placement="blog_sidebar" />
            </div>

            {/* Advanced Tactics */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {content.advancedTactics.title}
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {content.advancedTactics.keyword.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {content.advancedTactics.keyword.description}
                  </p>
                  <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 border border-primary/20">
                    <p className="font-semibold text-gray-900 dark:text-white mb-3">{content.advancedTactics.keyword.processTitle}</p>
                    <ol className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      {content.advancedTactics.keyword.steps.map((step, idx) => (
                        <li key={idx} dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      ))}
                    </ol>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {content.advancedTactics.specialization.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {content.advancedTactics.specialization.description}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{content.advancedTactics.specialization.point1Title}</p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{content.advancedTactics.specialization.point1Text}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{content.advancedTactics.specialization.point2Title}</p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{content.advancedTactics.specialization.point2Text}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {content.advancedTactics.timing.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {content.advancedTactics.timing.description}
                  </p>
                  <div className="bg-accent/5 dark:bg-accent/10 rounded-xl p-6 border border-accent/20">
                    <p className="font-semibold text-gray-900 dark:text-white mb-3">{content.advancedTactics.timing.scheduleTitle}</p>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      {content.advancedTactics.timing.steps.map((step, idx) => (
                        <li key={idx} dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/→/g, '→ ') }} />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section 2 */}
            <div className="bg-gradient-to-br from-[#1e1541] to-[#1e1541]/80 rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <TrendingUp className="w-16 h-16 text-accent mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {content.cta2.title}
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  {content.cta2.description}
                </p>
                <Link
                  href={`/${locale}/newsletter`}
                  className="inline-flex items-center gap-2 bg-white text-[#1e1541] hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg"
                >
                  {content.cta2.button}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Tracking and Metrics */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {content.tracking.title}
              </h2>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {content.tracking.description}
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-6 py-3">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{content.tracking.metric1.title}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{content.tracking.metric1.description}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400"><strong>{locale === 'nl' ? 'Doel:' : 'Target:'}</strong> {content.tracking.metric1.target}</p>
                </div>

                <div className="border-l-4 border-accent pl-6 py-3">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{content.tracking.metric2.title}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{content.tracking.metric2.description}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400"><strong>{locale === 'nl' ? 'Doel:' : 'Target:'}</strong> {content.tracking.metric2.target}</p>
                </div>

                <div className="border-l-4 border-[#1e1541] pl-6 py-3">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{content.tracking.metric3.title}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{content.tracking.metric3.description}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400"><strong>{locale === 'nl' ? 'Doel:' : 'Target:'}</strong> {content.tracking.metric3.target}</p>
                </div>

                <div className="border-l-4 border-primary pl-6 py-3">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{content.tracking.metric4.title}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{content.tracking.metric4.description}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400"><strong>{locale === 'nl' ? 'Doel:' : 'Target:'}</strong> {content.tracking.metric4.target}</p>
                </div>

                <div className="border-l-4 border-accent pl-6 py-3">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{content.tracking.metric5.title}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{content.tracking.metric5.description}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400"><strong>{locale === 'nl' ? 'Doel:' : 'Target:'}</strong> {content.tracking.metric5.target}</p>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border border-primary/20">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">{content.tracking.habitTitle}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{content.tracking.habitText}</p>
              </div>
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
              <div className="max-w-3xl mx-auto">
                <Cpu className="w-16 h-16 text-white mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {content.finalCta.title}
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  {content.finalCta.description}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href={`/${locale}/blog`}
                    className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg"
                  >
                    {content.finalCta.cta1}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href={`/${locale}/platforms`}
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20"
                  >
                    {content.finalCta.cta2}
                    <Zap className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Related Resources */}
            <div className="mt-12 pt-12 border-t border-gray-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {content.relatedTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                  href={`/${locale}/resources/optimizing-freelance-profile-maximum-visibility`}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group"
                >
                  <Target className="w-10 h-10 text-primary mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {content.related[0].title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {content.related[0].description}
                  </p>
                </Link>
                <Link
                  href={`/${locale}/resources/how-to-write-proposals-that-win`}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group"
                >
                  <Award className="w-10 h-10 text-accent mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {content.related[1].title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {content.related[1].description}
                  </p>
                </Link>
                <Link
                  href={`/${locale}/resources/building-portfolio-that-converts`}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group"
                >
                  <BarChart className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {content.related[2].title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {content.related[2].description}
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
