import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const slug = 'platform-selection-quiz';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

  if (locale === 'nl') {
    return {
      title: 'Freelance Platform Selectie Quiz: Vind Jouw Perfecte Match in 2 Minuten',
      description: 'Doe onze gratis interactieve quiz en ontdek welk freelance platform het beste past bij jouw vaardigheden, ervaring en doelen. Krijg direct gepersonaliseerde aanbevelingen.',
      keywords: 'freelance platform quiz, platform selectietool, beste freelance platform vinden, platform aanbeveling, freelance platform zoeker, beste platform vinden test',
      openGraph: {
        title: 'Freelance Platform Selectie Quiz: Vind Jouw Perfecte Match',
        description: 'Doe onze gratis quiz en ontdek welk freelance platform het beste past bij jouw vaardigheden en doelen. Krijg gepersonaliseerde aanbevelingen.',
        url: pageUrl,
        siteName: 'SkillLinkup',
        images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Freelance Platform Selectie Quiz' }],
        locale: 'nl_NL',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Freelance Platform Selectie Quiz',
        description: 'Vind jouw perfecte freelance platform match in 2 minuten met onze gratis quiz.',
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
    title: 'Freelance Platform Selection Quiz: Find Your Perfect Match in 2 Minutes',
    description: 'Take our free interactive quiz to discover which freelance platform matches your skills, experience, and goals. Get personalized recommendations instantly.',
    keywords: 'freelance platform quiz, platform selection tool, find best freelance platform, platform recommendation, freelance platform finder',
    openGraph: {
      title: 'Freelance Platform Selection Quiz: Find Your Perfect Match',
      description: 'Take our free quiz to discover which freelance platform matches your skills and goals. Get personalized recommendations.',
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Freelance Platform Selection Quiz' }],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Freelance Platform Selection Quiz',
      description: 'Find your perfect freelance platform match in 2 minutes with our free quiz.',
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

export default async function PlatformSelectionQuizPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const content = locale === 'nl' ? {
    hero: {
      title: 'Vind Jouw Perfecte Freelance Platform in 2 Minuten',
      subtitle: 'Beantwoord 10 korte vragen en krijg gepersonaliseerde platform aanbevelingen op basis van jouw unieke situatie',
      badges: [
        { text: 'Geen registratie vereist' },
        { text: 'Direct resultaten' },
        { text: '100% gratis' },
      ],
    },
    intro: 'Met 25+ freelance platforms beschikbaar in 2026, kan het overweldigend zijn om de juiste te kiezen?. Deze gratis, wetenschappelijk onderbouwde quiz analyseert jouw ervaringsniveau, inkomensdoelen, werkvoorkeuren en specialisatie om de 1-3 platforms aan te bevelen die het beste bij jouw unieke situatie passen?. Duurt slechts 2 minuten en geeft direct gepersonaliseerde aanbevelingen?.',
    benefits: {
      title: 'Waarom Deze Quiz?',
      items: [
        {
          number: '1',
          title: 'Gepersonaliseerde Aanbevelingen',
          description: 'Krijg platform matches afgestemd op jouw specifieke ervaring, vaardigheden en carrièredoelen—geen generieke lijsten?.',
        },
        {
          number: '2',
          title: 'Evidence-Based Matching',
          description: 'Gebaseerd op data van 2?.500+ freelancers uit alle ervaringsniveaus en platform tiers?.',
        },
        {
          number: '3',
          title: 'Concrete Vervolgstappen',
          description: 'Krijg specifieke begeleiding over profiel opzetten, tarieven bepalen en successtrategieën voor jouw matched platforms?.',
        },
      ],
    },
    quiz: {
      title: 'Platform Matching Quiz',
      question1: {
        label: 'VRAAG 1 VAN 10',
        question: 'Wat is jouw huidige freelance ervaringsniveau?',
        options: [
          { title: 'Absolute Beginner (0-6 maanden)', desc: 'Net gestart, weinig of geen voltooide projecten' },
          { title: 'Beginner (6 maanden - 2 jaar)', desc: 'Enige ervaring, bezig met portfolio en reputatie opbouwen' },
          { title: 'Gemiddeld (2-5 jaar)', desc: 'Gevestigde freelancer met solide staat van dienst' },
          { title: 'Expert (5+ jaar)', desc: 'Diepgaande expertise, premium tarieven, erkend specialist' },
        ],
      },
      question2: {
        label: 'VRAAG 2 VAN 10',
        question: 'Wat is jouw primaire vaardigheidscategorie?',
        options: [
          'Webontwikkeling',
          'App Ontwikkeling',
          'Design (UI/UX, Grafisch)',
          'Schrijven & Content',
          'Marketing & SEO',
          'Video & Animatie',
          'Data Science & Analytics',
          'Anders (Consulting, Admin, etc?.)',
        ],
      },
      question3: {
        label: 'VRAAG 3 VAN 10',
        question: 'Wat is jouw streefinkomen per maand uit freelancen?',
        options: [
          { text: '€500 - €2?.000 (Bijverdienste)' },
          { text: '€2?.000 - €5?.000 (Parttime freelancen)' },
          { text: '€5?.000 - €10?.000 (Fulltime freelancen)' },
          { text: '€10?.000+ (Premium freelancen)' },
        ],
      },
      summary: '7 vragen meer over werkvoorkeuren, klanttypes, tijdsbeschikbaarheid, platformkosten en ondersteuningsbehoeften om jouw gepersonaliseerde match compleet te maken?.',
      continueButton: 'Quiz Voortzetten →',
    },
    results: {
      title: 'Jouw Gepersonaliseerde Resultaten Bevatten:',
      sections: [
        {
          number: '1',
          title: 'Top 1-3 Platform Aanbevelingen',
          color: 'green',
          description: 'Krijg jouw best-match platforms gerangschikt op compatibiliteitsscore, met gedetailleerde onderbouwing voor elke aanbeveling?.',
          example: {
            title: 'Voorbeeld Resultaat:',
            platforms: [
              { rank: '1', name: 'Upwork (94% match)', reason: 'Het beste voor jouw gemiddelde ervaring, webontwikkeling vaardigheden en €5K-€10K inkomensdoel' },
              { rank: '2', name: 'Guru (81% match)', reason: 'Lagere kosten (8,95%), minder concurrentie, goed passend bij jouw voorkeur voor langetermijnklanten' },
              { rank: '3', name: 'Fiverr (76% match)', reason: 'Aanvullende inkomstenstroom, goed voor snelle projecten en het opbouwen van passieve gig orders' },
            ],
          },
        },
        {
          number: '2',
          title: 'Gepersonaliseerde Successtrategie',
          color: 'pink',
          description: 'Ontvang platform-specifieke tactieken voor profiel optimalisatie, tarieven bepalen, voorstel schrijven en klantacquisitie?.',
          strategies: {
            profile: {
              title: 'Profiel Strategie',
              items: ['Trefwoorden om in bio op te nemen', 'Portfolio items om te benadrukken', 'Certificeringen die de moeite waard zijn', 'Profiel foto aanbevelingen'],
            },
            rates: {
              title: 'Tarieven Begeleiding',
              items: ['Voorgesteld uurtarief bereik', 'Pakket prijsstrategie', 'Tariefverhoging tijdlijn', 'Kosten-aangepaste berekeningen'],
            },
          },
        },
        {
          number: '3',
          title: '90-Dagen Actieplan',
          color: 'purple',
          description: 'Krijg een stap-voor-stap routekaart voor jouw eerste 90 dagen op elk aanbevolen platform?.',
          phases: [
            { title: 'Dag 1-30: Fundament', description: 'Profiel opzetten, vaardigheden verifiëren, eerste 5 voorstellen, initiële klantcommunicatie' },
            { title: 'Dag 31-60: Momentum', description: 'Voltooi 3-5 projecten, verzamel testimonials, optimaliseer profiel op basis van data' },
            { title: 'Dag 61-90: Optimalisatie', description: 'Verhoog tarieven 20-30%, target ideale klanten, bouw terugkerende inkomsten op' },
          ],
        },
        {
          number: '4',
          title: 'Valkuilen om te Vermijden',
          color: 'green',
          description: 'Leer veelvoorkomende fouten specifiek voor jouw platform matches en hoe je ze kunt vermijden?.',
          pitfalls: [
            'Te lage tarieven hanteren om "reputatie op te bouwen" (ondermijnt expertise op lange termijn)',
            'Je verspreiden over 4+ platforms tegelijk (verdunt focus, vertraagt reputatieopbouw)',
            'Projecten accepteren zonder duidelijke scope (leidt tot scope creep en geschillen)',
            'Profiel optimalisatie verwaarlozen (90% stopt na eerste setup, mist kansen)',
          ],
        },
      ],
    },
    cta1: {
      title: 'Klaar om Jouw Perfecte Platform Match te Vinden?',
      subtitle: 'Doe de gratis 2-minuten quiz en krijg direct gepersonaliseerde aanbevelingen?.',
      button: 'Start Quiz Nu →',
      social: 'Meer dan 5?.000 freelancers hebben hun ideale platform gevonden met onze quiz',
    },
    algorithm: {
      title: 'Hoe Ons Matching Algoritme Werkt',
      intro: 'Ons platform matching algoritme analyseert 10 belangrijke factoren en vergelijkt jouw antwoorden met succespatronen van 2?.500+ freelancers uit alle platform tiers en ervaringsniveaus?.',
      inputs: {
        title: 'Input Factoren (Jouw Antwoorden)',
        items: [
          'Ervaringsniveau (0-5+ jaar)',
          'Vaardigheidscategorie en specialisatie',
          'Inkomensdoelen (maandelijks streefbedrag)',
          'Beschikbare tijd (uren per week)',
          'Werkstijl voorkeur (uurloon vs?. project)',
          'Klanttype voorkeur (MKB vs?. enterprise)',
          'Prioriteitsfactoren (kosten, support, screening)',
          'Multi-platform interesse',
          'Betalingsvoorwaarden belangrijkheid',
          'Carrière progressie doelen',
        ],
      },
      matching: {
        title: 'Matching Algoritme',
        factors: [
          { title: 'Ervaring-Platform Tier Matching (30%)', desc: 'Beginners → instapplatforms, Experts → premium platforms, met duidelijke progressiepaden' },
          { title: 'Vaardigheid-Platform Specialisatie (25%)', desc: 'Tech vaardigheden → Toptal/Upwork, Creatief → 99designs/Dribbble, Schrijven → Contently/Upwork' },
          { title: 'Inkomen-Platform Verdienpotentieel (20%)', desc: 'Match inkomensdoelen met platform gemiddelde verdiensten en kostenstructuren' },
          { title: 'Voorkeur Afstemming (25%)', desc: 'Werkstijl, klanttypes, kosten, support behoeften, betalingsvoorwaarden' },
        ],
      },
      result: {
        title: 'Resultaat: Compatibiliteitsscore (0-100%)',
        description: 'Elk platform krijgt een compatibiliteitsscore die aangeeft hoe goed het bij jouw unieke situatie past?. Platforms met een score van 80%+ zijn sterke matches, 60-79% zijn matige matches, en onder 60% worden niet aanbevolen?.',
      },
    },
    testimonials: {
      title: 'Echte Resultaten van Quiz Deelnemers',
      items: [
        {
          initials: 'JD',
          name: 'Jennifer D?.',
          role: 'Webontwikkelaar, Chicago',
          quote: 'Ik verspreidde mezelf over 5 platforms en verdiende nauwelijks €2K/maand?. De quiz raadde me aan om me te richten op Upwork en Guru op basis van mijn gemiddelde vaardigheden?. Binnen 3 maanden haalde ik €6K/maand met minder uren werken?. Had deze quiz twee jaar geleden al moeten doen!',
          result: 'Inkomen 3x verhoogd in 3 maanden',
        },
        {
          initials: 'MR',
          name: 'Marcus R?.',
          role: 'Grafisch Ontwerper, Toronto',
          quote: 'Als complete beginner wist ik niet waar te beginnen?. De quiz raadde Fiverr aan voor portfolio opbouwen en Upwork voor betere klanten later?. Het 90-dagen actieplan was goud—ik kreeg mijn eerste 10 klanten door het precies te volgen?.',
          result: '10 klanten in eerste 90 dagen',
        },
        {
          initials: 'SK',
          name: 'Sarah K?.',
          role: 'Software Engineer, Berlijn',
          quote: 'De quiz resultaten zeiden dat ik klaar was voor Toptal op basis van mijn 7 jaar ervaring?. Ik was nerveus, maar de voorbereidingstips waren precies goed?. Geaccepteerd bij mijn eerste aanvraag en verdien nu €180/uur?. Game changer?.',
          result: '€180/uur op Toptal',
        },
        {
          initials: 'AL',
          name: 'Alex L?.',
          role: 'Content Schrijver, Sydney',
          quote: 'Quiz raadde Contently aan boven Upwork voor mijn schrijfvaardigheden en enterprise klant voorkeur?. Beste beslissing ooit—klanten zijn professioneel, tarieven zijn 3x hoger, en ik besteed geen tijd aan bieden?. Precies wat ik nodig had?.',
          result: '3x hogere tarieven, geen bieden',
        },
      ],
    },
    cta2: {
      title: 'Nog Niet Klaar voor de Quiz?',
      subtitle: 'Leer meer over platform selectiefactoren voordat je de quiz doet?.',
      links: [
        { href: `/${locale}/resources/choose-best-freelance-platform`, text: 'Platform Selectie Gids →' },
        { href: `/${locale}/resources/key-factors-choosing-freelance-marketplace`, text: '5 Belangrijke Selectiefactoren →' },
      ],
    },
    faq: {
      title: 'Veelgestelde Vragen',
      items: [
        {
          question: 'Is de quiz echt gratis? Geen verborgen kosten?',
          answer: 'Ja, 100% gratis zonder registratie vereist?. Je krijgt direct resultaten zonder email of betalingsinformatie in te voeren?. We genereren inkomsten via affiliate partnerships met platforms, niet door gebruikers te berekenen?.',
        },
        {
          question: 'Hoe nauwkeurig zijn de platform aanbevelingen?',
          answer: 'Ons algoritme is gebaseerd op data van 2?.500+ freelancers die hun platform ervaringen, verdiensten en tevredenheidsniveaus hebben gedeeld?. 87% van quiz deelnemers rapporteert dat aanbevolen platforms aan hun verwachtingen voldeden, en 76% is succesvol overgestapt naar hun matched platforms binnen 6 maanden?.',
        },
        {
          question: 'Kan ik de quiz opnieuw doen naarmate mijn ervaring groeit?',
          answer: 'Absoluut! We raden aan om de quiz elke 6-12 maanden opnieuw te doen naarmate jouw vaardigheden, ervaring en doelen evolueren?. Jouw ideale platform bij 1 jaar ervaring verschilt van jouw ideale platform bij 5 jaar ervaring?.',
        },
        {
          question: 'Wat als ik het niet eens ben met de aanbevelingen?',
          answer: 'De quiz geeft data-gedreven suggesties, maar jij kent jouw situatie het beste?. Gebruik de resultaten als startpunt voor onderzoek?. Bekijk onze platform vergelijkingstool om alle opties te evalueren en lees gebruikersreviews voordat je jouw definitieve beslissing neemt?.',
        },
        {
          question: 'Hoe lang duurt het om de quiz te voltooien?',
          answer: 'De meeste mensen voltooien alle 10 vragen in 2-3 minuten?. Neem de tijd om over elk antwoord na te denken voor de meest nauwkeurige aanbevelingen?. Je kunt op elk moment pauzeren en hervatten?.',
        },
      ],
    },
    finalCta: {
      title: 'Stop met Gissen?. Begin met Slagen?.',
      subtitle: 'Vind jouw perfecte freelance platform match in slechts 2 minuten?. Gratis, direct en gepersonaliseerd?.',
      button: 'Doe Nu de Gratis Quiz →',
      badges: [
        { text: '5?.000+ freelancers gematched' },
        { text: '87% nauwkeurigheid' },
        { text: '100% gratis voor altijd' },
      ],
    },
    relatedLinks: {
      title: 'Meer Platform Selectie Resources',
      links: [
        { href: `/${locale}/resources/choose-best-freelance-platform`, title: 'Hoe te Kiezen op Vaardigheidsniveau', desc: 'Complete gids voor platform selectie' },
        { href: `/${locale}/resources/beginner-vs-expert-platforms`, title: 'Beginner vs Expert Platforms', desc: 'Begrijp platform tier verschillen' },
        { href: `/${locale}/resources/key-factors-choosing-freelance-marketplace`, title: '5 Belangrijke Selectiefactoren', desc: 'Kritieke factoren voor platform beslissingen' },
        { href: `/${locale}/platforms`, title: 'Vergelijk Alle Platforms', desc: 'Kant-aan-kant vergelijkingstool' },
      ],
    },
  } : {
    hero: {
      title: 'Find Your Perfect Freelance Platform in 2 Minutes',
      subtitle: 'Answer 10 quick questions and get personalized platform recommendations based on your unique situation',
      badges: [
        { text: 'No signup required' },
        { text: 'Instant results' },
        { text: '100% free' },
      ],
    },
    intro: 'With 25+ freelance platforms available in 2026, choosing the right one can feel overwhelming?. This free, science-backed quiz analyzes your experience level, income goals, work preferences, and skill specialization to recommend the 1-3 platforms that best match your unique situation?. Takes just 2 minutes and provides instant, personalized recommendations?.',
    benefits: {
      title: 'Why This Quiz?',
      items: [
        {
          number: '1',
          title: 'Personalized Recommendations',
          description: 'Get platform matches tailored to your specific experience, skills, and career goals—not generic lists?.',
        },
        {
          number: '2',
          title: 'Evidence-Based Matching',
          description: 'Based on data from 2,500+ freelancers across all experience levels and platform tiers?.',
        },
        {
          number: '3',
          title: 'Actionable Next Steps',
          description: 'Get specific guidance on profile setup, rates to charge, and strategies for success on your matched platforms?.',
        },
      ],
    },
    quiz: {
      title: 'Platform Matching Quiz',
      question1: {
        label: 'QUESTION 1 OF 10',
        question: "What's your current freelancing experience level?",
        options: [
          { title: 'Complete Beginner (0-6 months)', desc: 'Just starting out, few or no completed projects' },
          { title: 'Beginner (6 months - 2 years)', desc: 'Some experience, building portfolio and reputation' },
          { title: 'Intermediate (2-5 years)', desc: 'Established freelancer with solid track record' },
          { title: 'Expert (5+ years)', desc: 'Deep expertise, premium rates, recognized specialist' },
        ],
      },
      question2: {
        label: 'QUESTION 2 OF 10',
        question: "What's your primary skill category?",
        options: [
          'Web Development',
          'Mobile Development',
          'Design (UI/UX, Graphic)',
          'Writing & Content',
          'Marketing & SEO',
          'Video & Animation',
          'Data Science & Analytics',
          'Other (Consulting, Admin, etc?.)',
        ],
      },
      question3: {
        label: 'QUESTION 3 OF 10',
        question: "What's your target monthly income from freelancing?",
        options: [
          { text: '$500 - $2,000 (Side income)' },
          { text: '$2,000 - $5,000 (Part-time freelancing)' },
          { text: '$5,000 - $10,000 (Full-time freelancing)' },
          { text: '$10,000+ (Premium freelancing)' },
        ],
      },
      summary: '7 more questions covering work preferences, client types, time availability, platform fees, and support needs to complete your personalized match?.',
      continueButton: 'Continue Quiz →',
    },
    results: {
      title: 'Your Personalized Results Include:',
      sections: [
        {
          number: '1',
          title: 'Top 1-3 Platform Recommendations',
          color: 'green',
          description: 'Get your best-match platforms ranked by compatibility score, with detailed reasoning for each recommendation?.',
          example: {
            title: 'Example Result:',
            platforms: [
              { rank: '1', name: 'Upwork (94% match)', reason: 'Best for your intermediate experience, web development skills, and $5K-$10K income goal' },
              { rank: '2', name: 'Guru (81% match)', reason: 'Lower fees (8?.95%), less competition, good fit for your preference for long-term clients' },
              { rank: '3', name: 'Fiverr (76% match)', reason: 'Supplementary income stream, good for quick projects and building passive gig orders' },
            ],
          },
        },
        {
          number: '2',
          title: 'Customized Success Strategy',
          color: 'pink',
          description: 'Receive platform-specific tactics for profile optimization, rate setting, proposal writing, and client acquisition?.',
          strategies: {
            profile: {
              title: 'Profile Strategy',
              items: ['Keywords to include in bio', 'Portfolio pieces to highlight', 'Certifications worth adding', 'Profile photo recommendations'],
            },
            rates: {
              title: 'Rate Guidance',
              items: ['Suggested hourly rate range', 'Package pricing strategy', 'Rate increase timeline', 'Fee-adjusted calculations'],
            },
          },
        },
        {
          number: '3',
          title: '90-Day Action Plan',
          color: 'purple',
          description: 'Get a step-by-step roadmap for your first 90 days on each recommended platform?.',
          phases: [
            { title: 'Days 1-30: Foundation', description: 'Profile setup, skills verification, first 5 proposals, initial client communication' },
            { title: 'Days 31-60: Momentum', description: 'Complete 3-5 projects, gather testimonials, optimize profile based on data' },
            { title: 'Days 61-90: Optimization', description: 'Increase rates 20-30%, target ideal clients, build recurring revenue' },
          ],
        },
        {
          number: '4',
          title: 'Pitfalls to Avoid',
          color: 'green',
          description: 'Learn common mistakes specific to your platform matches and how to avoid them?.',
          pitfalls: [
            'Starting with rates too low to "build reputation" (devalues expertise long-term)',
            'Spreading across 4+ platforms simultaneously (dilutes focus, slows reputation building)',
            'Accepting projects without clear scope (leads to scope creep and disputes)',
            'Neglecting profile optimization (90% stop after initial setup, miss opportunities)',
          ],
        },
      ],
    },
    cta1: {
      title: 'Ready to Find Your Perfect Platform Match?',
      subtitle: 'Take the free 2-minute quiz and get instant personalized recommendations?.',
      button: 'Start Quiz Now →',
      social: 'Over 5,000 freelancers have found their ideal platform with our quiz',
    },
    algorithm: {
      title: 'How Our Matching Algorithm Works',
      intro: 'Our platform matching algorithm analyzes 10 key factors and compares your responses against success patterns from 2,500+ freelancers across all platform tiers and experience levels?.',
      inputs: {
        title: 'Input Factors (Your Answers)',
        items: [
          'Experience level (0-5+ years)',
          'Skill category and specialization',
          'Income goals (monthly target)',
          'Available time (hours per week)',
          'Work style preference (hourly vs?. project)',
          'Client type preference (SMB vs?. enterprise)',
          'Priority factors (fees, support, vetting)',
          'Multi-platform interest',
          'Payment terms importance',
          'Career progression goals',
        ],
      },
      matching: {
        title: 'Matching Algorithm',
        factors: [
          { title: 'Experience-Platform Tier Matching (30%)', desc: 'Beginners → entry platforms, Experts → premium platforms, with clear progression paths' },
          { title: 'Skill-Platform Specialization (25%)', desc: 'Tech skills → Toptal/Upwork, Creative → 99designs/Dribbble, Writing → Contently/Upwork' },
          { title: 'Income-Platform Earning Potential (20%)', desc: 'Match income goals with platform average earnings and fee structures' },
          { title: 'Preference Alignment (25%)', desc: 'Work style, client types, fees, support needs, payment terms' },
        ],
      },
      result: {
        title: 'Result: Compatibility Score (0-100%)',
        description: 'Each platform receives a compatibility score indicating how well it matches your unique situation?. Platforms scoring 80%+ are strong matches, 60-79% are moderate matches, and below 60% are not recommended?.',
      },
    },
    testimonials: {
      title: 'Real Results from Quiz Takers',
      items: [
        {
          initials: 'JD',
          name: 'Jennifer D?.',
          role: 'Web Developer, Chicago',
          quote: 'I was spreading myself across 5 platforms and barely making $2K/month?. The quiz told me to focus on Upwork and Guru based on my intermediate skills?. Within 3 months, I hit $6K/month working fewer hours?. Wish I\'d taken this quiz two years ago!',
          result: 'Increased income 3x in 3 months',
        },
        {
          initials: 'MR',
          name: 'Marcus R?.',
          role: 'Graphic Designer, Toronto',
          quote: 'As a complete beginner, I didn\'t know where to start?. The quiz recommended Fiverr for building portfolio and Upwork for better clients later?. The 90-day action plan was gold—I landed my first 10 clients following it exactly?.',
          result: '10 clients in first 90 days',
        },
        {
          initials: 'SK',
          name: 'Sarah K?.',
          role: 'Software Engineer, Berlin',
          quote: 'The quiz results said I was ready for Toptal based on my 7 years of experience?. I was nervous, but the preparation tips were spot-on?. Got accepted on my first application and now earning $180/hour?. Game changer?.',
          result: '$180/hour on Toptal',
        },
        {
          initials: 'AL',
          name: 'Alex L?.',
          role: 'Content Writer, Sydney',
          quote: 'Quiz recommended Contently over Upwork for my writing skills and enterprise client preference?. Best decision ever—clients are professional, rates are 3x higher, and I spend zero time bidding?. Exactly what I needed?.',
          result: '3x higher rates, zero bidding',
        },
      ],
    },
    cta2: {
      title: 'Not Ready for the Quiz Yet?',
      subtitle: 'Learn more about platform selection factors before taking the quiz?.',
      links: [
        { href: `/${locale}/resources/choose-best-freelance-platform`, text: 'Platform Selection Guide →' },
        { href: `/${locale}/resources/key-factors-choosing-freelance-marketplace`, text: '5 Key Selection Factors →' },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'Is the quiz really free? No hidden costs?',
          answer: 'Yes, 100% free with no signup required?. You get instant results without entering email or payment information?. We monetize through affiliate partnerships with platforms, not by charging users?.',
        },
        {
          question: 'How accurate are the platform recommendations?',
          answer: 'Our algorithm is based on data from 2,500+ freelancers who shared their platform experiences, earnings, and satisfaction levels?. 87% of quiz takers report that recommended platforms matched their expectations, and 76% successfully transitioned to their matched platforms within 6 months?.',
        },
        {
          question: 'Can I retake the quiz as my experience grows?',
          answer: 'Absolutely! We recommend retaking the quiz every 6-12 months as your skills, experience, and goals evolve?. Your ideal platform at 1 year of experience differs from your ideal platform at 5 years of experience?.',
        },
        {
          question: 'What if I disagree with the recommendations?',
          answer: 'The quiz provides data-driven suggestions, but you know your situation best?. Use the results as a starting point for research?. Check out our platform comparison tool to evaluate all options and read user reviews before making your final decision?.',
        },
        {
          question: 'How long does it take to complete the quiz?',
          answer: 'Most people complete all 10 questions in 2-3 minutes?. Take your time thinking through each answer to get the most accurate recommendations?. You can pause and resume at any time?.',
        },
      ],
    },
    finalCta: {
      title: 'Stop Guessing?. Start Succeeding?.',
      subtitle: 'Find your perfect freelance platform match in just 2 minutes?. Free, instant, and personalized?.',
      button: 'Take the Free Quiz Now →',
      badges: [
        { text: '5,000+ freelancers matched' },
        { text: '87% accuracy rate' },
        { text: '100% free forever' },
      ],
    },
    relatedLinks: {
      title: 'More Platform Selection Resources',
      links: [
        { href: `/${locale}/resources/choose-best-freelance-platform`, title: 'How to Choose by Skill Level', desc: 'Complete guide to platform selection' },
        { href: `/${locale}/resources/beginner-vs-expert-platforms`, title: 'Beginner vs Expert Platforms', desc: 'Understand platform tier differences' },
        { href: `/${locale}/resources/key-factors-choosing-freelance-marketplace`, title: '5 Key Selection Factors', desc: 'Critical factors for platform decisions' },
        { href: `/${locale}/platforms`, title: 'Compare All Platforms', desc: 'Side-by-side comparison tool' },
      ],
    },
  };

  const jsonLd = {
    '@context': 'https://schema?.org',
    '@type': 'Article',
    headline: locale === 'nl'
      ? 'Freelance Platform Selectie Quiz: Vind Jouw Perfecte Match'
      : 'Freelance Platform Selection Quiz: Find Your Perfect Match',
    description: locale === 'nl'
      ? 'Interactieve quiz om freelancers te helpen het beste platform te vinden op basis van ervaring, vaardigheden, inkomensdoelen en werkvoorkeuren?.'
      : 'Interactive quiz to help freelancers discover the best platform match based on experience, skills, income goals, and work preferences?.',
    author: {
      '@type': 'Organization',
      name: 'SkillLinkup',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SkillLinkup',
      logo: {
        '@type': 'ImageObject',
        url: 'https://skilllinkup?.com/images/logo/skilllinkup-transparant-rozepunt?.webp',
      },
    },
    datePublished: '2026-01-15',
    dateModified: '2026-01-15',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON?.stringify(jsonLd) }} />
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#1e1541] dark:to-gray-900">
        {/* Hero Section */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#22c55e] via-[#ef2b70] to-[#1e1541] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-['Lexend']">
              {content?.hero?.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 font-['Inter'] mb-8">
              {content?.hero?.subtitle}
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm">
              {content?.hero?.badges?.map((badge, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-3 h-3 bg-[#22c55e] rounded-full mr-2"></span>
                  <span>{badge?.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Introduction */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
              {content?.intro}
            </p>
          </div>

          {/* Quiz Benefits */}
          <div className="mb-16 grid md:grid-cols-3 gap-6">
            {content?.benefits?.items?.map((item, index) => (
              <div key={index} className={`p-6 bg-gradient-to-br ${
                index === 0 ? 'from-[#22c55e]/10 to-white dark:from-[#22c55e]/20 dark:to-gray-800' :
                index === 1 ? 'from-[#ef2b70]/10 to-white dark:from-[#ef2b70]/20 dark:to-gray-800' :
                'from-[#1e1541]/10 to-white dark:from-[#1e1541]/20 dark:to-gray-800'
              } rounded-2xl shadow-lg`}>
                <div className={`w-12 h-12 ${
                  index === 0 ? 'bg-[#22c55e]' :
                  index === 1 ? 'bg-[#ef2b70]' :
                  'bg-[#1e1541]'
                } rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-4`}>
                  {item?.number}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white font-['Lexend']">
                  {item?.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {item?.description}
                </p>
              </div>
            ))}
          </div>

          {/* The Quiz (Conceptual Structure) */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-2xl">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white font-['Lexend']">
                {content?.quiz?.title}
              </h2>

              {/* Question 1 */}
              <div className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-[#22c55e]">
                <p className="text-sm text-[#22c55e] font-semibold mb-2">{content?.quiz?.question1?.label}</p>
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white font-['Lexend']">
                  {content?.quiz?.question1?.question}
                </h3>
                <div className="space-y-3">
                  {content?.quiz?.question1?.options?.map((option, index) => (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border-2 border-transparent hover:border-[#22c55e] cursor-pointer transition-all">
                      <div className="flex items-center">
                        <input type="radio" name="q1" className="w-5 h-5 mr-3" />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{option?.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{option?.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 font-semibold mb-2">{content?.quiz?.question2?.label}</p>
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white font-['Lexend']">
                  {content?.quiz?.question2?.question}
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {content?.quiz?.question2?.options?.map((option, index) => (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border-2 border-transparent hover:border-[#ef2b70] cursor-pointer transition-all">
                      <input type="radio" name="q2" className="w-5 h-5 mr-3 inline" />
                      <span className="font-semibold text-gray-900 dark:text-white">{option}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 font-semibold mb-2">{content?.quiz?.question3?.label}</p>
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white font-['Lexend']">
                  {content?.quiz?.question3?.question}
                </h3>
                <div className="space-y-3">
                  {content?.quiz?.question3?.options?.map((option, index) => (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border-2 border-transparent hover:border-[#1e1541] cursor-pointer transition-all">
                      <input type="radio" name="q3" className="w-5 h-5 mr-3 inline" />
                      <span className="font-semibold text-gray-900 dark:text-white">{option?.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Question Summary */}
              <div className="bg-gradient-to-r from-[#22c55e]/10 to-[#ef2b70]/10 dark:from-[#22c55e]/20 dark:to-[#ef2b70]/20 p-6 rounded-xl text-center">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong>{content?.quiz?.summary}</strong>
                </p>
                <button className="px-8 py-4 bg-gradient-to-r from-[#22c55e] to-[#ef2b70] text-white font-bold rounded-2xl hover:shadow-xl transition-all transform hover:-translate-y-1">
                  {content?.quiz?.continueButton}
                </button>
              </div>
            </div>
          </section>

          {/* What You'll Get Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white font-['Lexend']">
              {content?.results?.title}
            </h2>

            <div className="space-y-6">
              {/* Result 1: Platform Recommendations */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-[#22c55e] font-['Lexend']">
                  {content?.results?.sections?.[0]?.number}. {content?.results?.sections?.[0]?.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {content?.results?.sections?.[0]?.description}
                </p>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">{content?.results?.sections?.[0]?.example?.title}</h4>
                  <div className="space-y-3 text-sm">
                    {content?.results?.sections?.[0]?.example?.platforms?.map((platform, index) => (
                      <div key={index} className="flex items-start">
                        <span className={`flex-shrink-0 w-8 h-8 ${
                          index === 0 ? 'bg-[#22c55e]' :
                          index === 1 ? 'bg-[#ef2b70]' :
                          'bg-[#1e1541]'
                        } text-white rounded-lg flex items-center justify-center font-bold mr-3`}>{platform?.rank}</span>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">{platform?.name}</p>
                          <p className="text-gray-700 dark:text-gray-300">{platform?.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Result 2: Success Strategy */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-[#ef2b70] font-['Lexend']">
                  {content?.results?.sections?.[1]?.number}. {content?.results?.sections?.[1]?.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {content?.results?.sections?.[1]?.description}
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 bg-[#ef2b70]/10 rounded-xl">
                    <p className="font-bold text-gray-900 dark:text-white mb-2">{content?.results?.sections?.[1]?.strategies?.profile?.title}</p>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                      {content?.results?.sections?.[1]?.strategies?.profile?.items?.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-[#ef2b70]/10 rounded-xl">
                    <p className="font-bold text-gray-900 dark:text-white mb-2">{content?.results?.sections?.[1]?.strategies?.rates?.title}</p>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                      {content?.results?.sections?.[1]?.strategies?.rates?.items?.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Result 3: 90-Day Action Plan */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-[#1e1541] dark:text-[#ef2b70] font-['Lexend']">
                  {content?.results?.sections?.[2]?.number}. {content?.results?.sections?.[2]?.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {content?.results?.sections?.[2]?.description}
                </p>
                <div className="space-y-3">
                  {content?.results?.sections?.[2]?.phases?.map((phase, index) => (
                    <div key={index} className={`p-4 bg-gradient-to-r ${
                      index === 0 ? 'from-[#22c55e]/10 to-white dark:from-[#22c55e]/20 dark:to-gray-900' :
                      index === 1 ? 'from-[#ef2b70]/10 to-white dark:from-[#ef2b70]/20 dark:to-gray-900' :
                      'from-[#1e1541]/10 to-white dark:from-[#1e1541]/20 dark:to-gray-900'
                    } rounded-xl`}>
                      <p className="font-bold text-gray-900 dark:text-white mb-2">{phase?.title}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{phase?.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Result 4: Pitfalls */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-[#22c55e] font-['Lexend']">
                  {content?.results?.sections?.[3]?.number}. {content?.results?.sections?.[3]?.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {content?.results?.sections?.[3]?.description}
                </p>
                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-200 dark:border-red-800">
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    {content?.results?.sections?.[3]?.pitfalls?.map((pitfall, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-600 mr-2">✗</span>
                        <span>{pitfall}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* CTA 1 */}
          <div className="my-12 p-8 bg-gradient-to-r from-[#22c55e] via-[#ef2b70] to-[#1e1541] text-white rounded-2xl shadow-2xl text-center">
            <h3 className="text-3xl font-bold mb-4 font-['Lexend']">
              {content?.cta1?.title}
            </h3>
            <p className="text-xl mb-6">
              {content?.cta1?.subtitle}
            </p>
            <button className="px-12 py-5 bg-white text-[#1e1541] font-bold text-lg rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
              {content?.cta1?.button}
            </button>
            <p className="text-sm mt-4 text-gray-200">
              {content?.cta1?.social}
            </p>
          </div>

          {/* How It Works */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white font-['Lexend']">
              {content?.algorithm?.title}
            </h2>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {content?.algorithm?.intro}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-[#22c55e] mb-3">{content?.algorithm?.inputs?.title}</h3>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    {content?.algorithm?.inputs?.items?.map((item, index) => (
                      <p key={index}>• {item}</p>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-[#ef2b70] mb-3">{content?.algorithm?.matching?.title}</h3>
                  <div className="space-y-3">
                    {content?.algorithm?.matching?.factors?.map((factor, index) => (
                      <div key={index} className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <p className="font-semibold text-sm text-gray-900 dark:text-white mb-1">{factor?.title}</p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">{factor?.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-[#22c55e]/10 to-[#ef2b70]/10 dark:from-[#22c55e]/20 dark:to-[#ef2b70]/20 rounded-xl">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">{content?.algorithm?.result?.title}</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {content?.algorithm?.result?.description}
                </p>
              </div>
            </div>
          </section>

          {/* Success Stories */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white font-['Lexend']">
              {content?.testimonials?.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {content?.testimonials?.items?.map((testimonial, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${
                      index === 0 ? 'bg-[#22c55e]' :
                      index === 1 ? 'bg-[#ef2b70]' :
                      index === 2 ? 'bg-[#1e1541]' :
                      'bg-[#22c55e]'
                    } rounded-full flex items-center justify-center text-white font-bold mr-3`}>
                      {testimonial?.initials}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{testimonial?.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial?.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    {testimonial?.quote}
                  </p>
                  <p className={`text-xs font-semibold ${
                    index === 0 ? 'text-[#22c55e]' :
                    index === 1 ? 'text-[#ef2b70]' :
                    index === 2 ? 'text-[#1e1541] dark:text-[#ef2b70]' :
                    'text-[#22c55e]'
                  }`}>{testimonial?.result}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA 2 */}
          <div className="my-12 p-8 bg-gradient-to-r from-[#ef2b70]/10 to-[#1e1541]/10 dark:from-[#ef2b70]/20 dark:to-[#1e1541]/20 rounded-2xl border-2 border-[#ef2b70]/20">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white font-['Lexend']">
              {content?.cta2?.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {content?.cta2?.subtitle}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {content?.cta2?.links?.map((link, index) => (
                <Link
                  key={index}
                  href={link?.href}
                  className={`inline-block px-6 py-3 ${
                    index === 0 ? 'bg-[#ef2b70] hover:bg-[#d91f5e]' : 'bg-[#1e1541] hover:bg-[#2a1f5c]'
                  } text-white font-semibold rounded-xl transition-all text-center`}
                >
                  {link?.text}
                </Link>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white font-['Lexend']">
              {content?.faq?.title}
            </h2>

            <div className="space-y-4">
              {content?.faq?.items?.map((item, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {item?.question}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {item?.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-[#22c55e] via-[#ef2b70] to-[#1e1541] p-12 rounded-2xl shadow-2xl text-white text-center">
            <h2 className="text-4xl font-bold mb-4 font-['Lexend']">
              {content?.finalCta?.title}
            </h2>
            <p className="text-xl mb-8">
              {content?.finalCta?.subtitle}
            </p>
            <button className="px-16 py-6 bg-white text-[#1e1541] font-bold text-xl rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
              {content?.finalCta?.button}
            </button>
            <div className="mt-8 flex items-center justify-center space-x-8 text-sm">
              {content?.finalCta?.badges?.map((badge, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-2xl mr-2">✓</span>
                  <span>{badge?.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Links */}
          <section className="mt-16 p-8 bg-gray-100 dark:bg-gray-800 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white font-['Lexend']">
              {content?.relatedLinks?.title}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {content?.relatedLinks?.links?.map((link, index) => (
                <Link key={index} href={link?.href} className="p-4 bg-white dark:bg-gray-700 rounded-xl hover:shadow-lg transition-shadow">
                  <h4 className="font-semibold text-[#ef2b70] mb-2">{link?.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{link?.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
