import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Users, Calendar, CheckCircle, Clock, Zap, FileText } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const slug = 'managing-multiple-clients';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

  if (locale === 'nl') {
    return {
      title: 'Meerdere Klanten Beheren: Organisatie & Tijdsmanagement Tips',
      description: 'Leer hoe je succesvol meerdere freelance klanten beheert met bewezen organisatiesystemen, tijdsmanagementstrategieën en productiviteitstools.',
      keywords: 'meerdere klanten beheren, freelance organisatie, tijdsmanagement, productiviteitstools, klanten management, klanten management freelance, tijd indelen ZZP',
      openGraph: {
        title: 'Meerdere Klanten Beheren: Organisatie & Tijdsmanagement Tips',
        description: 'Beheers de kunst van het beheren van meerdere freelance klanten met organisatiesystemen en tijdsmanagementstrategieën die werken.',
        url: pageUrl,
        siteName: 'SkillLinkup',
        images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Meerdere Klanten Beheren' }],
        locale: 'nl_NL',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Meerdere Klanten Beheren: Organisatie & Tijdsmanagement Tips',
        description: 'Beheers de kunst van het beheren van meerdere freelance klanten.',
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
    title: 'Managing Multiple Clients: Organization & Time Management Tips',
    description: 'Learn how to successfully manage multiple freelance clients with proven organization systems, time management strategies, and productivity tools.',
    keywords: 'managing multiple clients, freelance organization, time management, productivity tools, client management',
    openGraph: {
      title: 'Managing Multiple Clients: Organization & Time Management Tips',
      description: 'Master the art of managing multiple freelance clients with organization systems and time management strategies that work.',
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Managing Multiple Clients' }],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Managing Multiple Clients: Organization & Time Management Tips',
      description: 'Master the art of managing multiple freelance clients.',
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

export default async function ManagingMultipleClientsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const content = locale === 'nl' ? {
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Meerdere Klanten Beheren: Organisatie en Tijdsmanagement Tips',
      description: 'Complete gids voor het beheren van meerdere freelance klanten inclusief organisatiesystemen, tijdsmanagement en productiviteitsstrategieën.',
      author: {
        '@type': 'Organization',
        name: 'SkillLinkup',
      },
      publisher: {
        '@type': 'Organization',
        name: 'SkillLinkup',
        logo: {
          '@type': 'ImageObject',
          url: 'https://skilllinkup.com/images/logo/skilllinkup-transparant-rozepunt.webp',
        },
      },
      datePublished: '2025-01-15',
      dateModified: '2025-01-15',
      inLanguage: 'nl-NL',
    },
    hero: {
      title: 'Meerdere Klanten Beheren: Organisatie & Tijdsmanagement',
      description: 'Leer bewezen systemen en strategieën om succesvol meerdere freelance klanten te jongleren zonder op te branden of deadlines te missen.',
      cta1: 'Tijd Bijhouden',
      cta2: 'Zakelijke Tools',
    },
    intro: {
      text: 'Succesvol meerdere freelance klanten beheren is de sleutel tot het opschalen van je inkomen zonder in te boeten op kwaliteit of op te branden. Of je nu 3 klanten of 10 klanten beheert, de juiste organisatiesystemen en tijdsmanagementstrategieën helpen je uitstekend werk te leveren terwijl je je gezond verstand behoudt.',
    },
    challenge: {
      title: 'De Uitdaging van Meerdere Klanten',
      intro: 'Het gelijktijdig beheren van meerdere klanten creëert unieke uitdagingen die niet bestaan bij het werken met slechts één klant:',
      items: [
        {
          title: 'Context Wisselen',
          text: 'Springen tussen verschillende projecten, tools, communicatiestijlen en verwachtingen put mentale energie uit en vermindert productiviteit.',
        },
        {
          title: 'Concurrerende Deadlines',
          text: 'Wanneer meerdere klanten tegelijkertijd urgente behoeften hebben, wordt prioriteren cruciaal en stressvol.',
        },
        {
          title: 'Communicatie Overload',
          text: 'E-mails, Slack-berichten, telefoontjes en vergaderingen van meerdere klanten kunnen je hele dag opslokken als het niet goed beheerd wordt.',
        },
        {
          title: 'Kwaliteitscontrole',
          text: 'Consistente kwaliteit behouden over meerdere projecten vereist systemen, focus en zorgvuldige aandacht voor de standaarden van elke klant.',
        },
      ],
    },
    organization: {
      title: 'Organisatiesystemen Die Werken',
      tracker: {
        title: '1. De Master Project Tracker',
        intro: 'Creëer een gecentraliseerd overzicht van alle actieve projecten met belangrijke informatie in één oogopslag:',
        subtitle: 'Essentiële Tracker Kolommen',
        items: [
          { col: 'Klantnaam', desc: 'Primair contact en bedrijf' },
          { col: 'Projecttitel', desc: 'Duidelijke, beschrijvende naam' },
          { col: 'Status', desc: 'Niet Gestart, Bezig, Review, Voltooid' },
          { col: 'Prioriteit', desc: 'Hoog, Gemiddeld, Laag op basis van urgentie deadline' },
          { col: 'Volgende Deadline', desc: 'Direct aankomende mijlpaal' },
          { col: 'Uren Deze Week', desc: 'Tijd toegewezen aan dit project' },
          { col: 'Blokkerende Problemen', desc: 'Wachten op klantfeedback, ontbrekende assets, etc.' },
          { col: 'Factuurstatus', desc: 'Niet Gefactureerd, Verzonden, Betaald' },
        ],
        tools: 'Tools: Notion, Airtable, Google Sheets of Monday.com werken uitstekend voor project tracking.',
      },
      timeBlocking: {
        title: '2. Tijdblokken voor Klantwerk',
        intro: 'Wijs specifieke tijdblokken toe aan elke klant om context wisselen te minimaliseren:',
        scheduleTitle: 'Voorbeeld Weekschema',
        schedule: [
          {
            day: 'Maandag',
            slots: [
              '9-12: Klant A (diep werk)',
              '13-15: Klant B (vergaderingen + werk)',
              '15-17: Admin (e-mails, factureren)',
            ],
          },
          {
            day: 'Dinsdag',
            slots: [
              '9-12: Klant C (diep werk)',
              '13-17: Klant A (vervolg)',
            ],
          },
          {
            day: 'Woensdag',
            slots: [
              '9-12: Klant D (diep werk)',
              '13-15: Klant B (vervolg)',
              '15-17: Marketing + BD',
            ],
          },
          {
            day: 'Donderdag',
            slots: [
              '9-12: Klant C (vervolg)',
              '13-17: Klant D (vervolg)',
            ],
          },
          {
            day: 'Vrijdag',
            slots: [
              '9-11: Inhalen / overflow werk',
              '11-13: Admin + planning volgende week',
              'Middag: VRIJ',
            ],
          },
        ],
      },
      communication: {
        title: '3. Communicatiegrenzen en Batching',
        intro: 'Stel duidelijke communicatieverwachtingen met alle klanten om je focustijd te beschermen:',
        items: [
          {
            title: 'E-mail Reactietijden',
            text: 'Stel verwachtingen voor 24-uurs e-mail reactietijden (behalve weekenden). Controleer e-mail 2-3 keer per dag op geplande tijden: \'s ochtends (9 uur), middag (13 uur) en einde van de dag (16 uur). Vermijd constant de inbox monitoren.',
          },
          {
            title: 'Vergaderbeleid',
            text: 'Batch klantgesprekken op specifieke dagen (bijv. dinsdagen en donderdagen). Bied 2-3 tijdslots aan in plaats van "wat werkt voor jou?" Gebruik Calendly of vergelijkbare tools voor zelfbediening planning.',
          },
          {
            title: 'Urgent Communicatie Protocol',
            text: 'Definieer wat "urgent" betekent (productie down, kritieke deadline binnen 24 uur). Echte urgencies kunnen je via telefoontje bereiken. Al het andere kan wachten tot je volgende e-mail check.',
          },
          {
            title: 'Status Update Routine',
            text: 'Stuur wekelijkse status updates naar alle actieve klanten elke vrijdagmiddag. Vermeld gemaakte vooruitgang, aankomende mijlpalen en eventuele blokkades. Deze proactieve communicatie vermindert "even checken" e-mails gedurende de week.',
          },
        ],
      },
    },
    ctaTimeTracker: {
      title: 'Houd Tijd Nauwkeurig Bij Voor Alle Klanten',
      description: 'Weet precies waar je tijd naartoe gaat met onze gratis time tracking tool. Genereer rapporten per klant en zorg dat je nauwkeurig factureert.',
      button: 'Start Tijd Bijhouden',
    },
    prioritization: {
      title: 'Prioriteringsstrategieën',
      abcde: {
        title: 'De ABCDE Methode voor Klantwerk',
        intro: 'Categoriseer alle taken met dit prioriteitssysteem:',
        items: [
          {
            letter: 'A',
            title: 'A Taken: Moet Doen',
            description: 'Kritieke deadlines met ernstige gevolgen als ze gemist worden. Deze worden eerst gedaan, geen uitzonderingen.',
            example: 'Voorbeeld: Klantpresentatie morgen, productie deployment vandaag gepland',
            color: 'red',
          },
          {
            letter: 'B',
            title: 'B Taken: Zou Moeten Doen',
            description: 'Belangrijk maar minder urgent. Gevolgen bestaan maar zijn niet kritiek. Doe deze na A taken.',
            example: 'Voorbeeld: Projectwerk volgende week, klant check-in vergaderingen',
            color: 'orange',
          },
          {
            letter: 'C',
            title: 'C Taken: Leuk om te Doen',
            description: 'Minimale gevolgen als het niet gedaan wordt. Doe deze alleen na A en B taken zijn voltooid.',
            example: 'Voorbeeld: Interne procesverbeteringen, bestanden organiseren',
            color: 'yellow',
          },
          {
            letter: 'D',
            title: 'D Taken: Delegeren',
            description: 'Taken die iemand anders kan doen. Naarmate je groeit, wordt delegeren essentieel.',
            example: 'Voorbeeld: Data-entry, social media planning, factuur opvolging',
            color: 'blue',
          },
          {
            letter: 'E',
            title: 'E Taken: Elimineren',
            description: 'Taken die niet bijdragen aan je doelen. Stop volledig met deze.',
            example: 'Voorbeeld: Overdreven vergadervoorbereiding, perfectionisme op kleine details',
            color: 'gray',
          },
        ],
      },
      competing: {
        title: 'Wanneer Alle Klanten Prioriteit Willen',
        intro: 'Wanneer meerdere klanten concurrerende urgente behoeften hebben:',
        items: [
          { step: 'Beoordeel Echte Urgentie', text: 'Vraag: Wat gebeurt er als dit 24 uur vertraagd wordt? Echte urgencies zijn zeldzaam.' },
          { step: 'Communiceer Proactief', text: 'Vertel klanten onmiddellijk wanneer concurrerende prioriteiten ontstaan. De meesten zullen redelijke vertragingen begrijpen en accepteren.' },
          { step: 'Bied Oplossingen', text: '"Ik kan een werkende versie leveren voor einde werkdag vandaag en de gepolijste versie morgen" geeft klanten opties.' },
          { step: 'Wie Het Eerst Komt, Het Eerst Maalt', text: 'Wanneer urgentie gelijk is, honoreer de volgorde waarin verplichtingen zijn aangegaan.' },
          { step: 'Overweeg Relatiewaarde', text: 'Langdurige, waardevolle klanten kunnen voorkeur krijgen boven nieuwe, kleine projecten.' },
        ],
      },
    },
    tools: {
      title: 'Essentiële Tools voor Meerdere Klanten Beheren',
      categories: [
        {
          title: 'Projectmanagement',
          items: [
            { name: 'Notion', desc: 'All-in-one werkruimte voor notities, databases en project tracking' },
            { name: 'Asana', desc: 'Taakbeheer met klant-specifieke projecten en tijdlijnen' },
            { name: 'Trello', desc: 'Visueel bord-gebaseerd projectmanagement' },
          ],
        },
        {
          title: 'Tijd Bijhouden',
          items: [
            { name: 'SkillLinkup Time Tracker', desc: 'Gratis tool voor nauwkeurige tijdsregistratie' },
            { name: 'Toggl Track', desc: 'Eenvoudige tijdsregistratie met gedetailleerde rapporten' },
            { name: 'Harvest', desc: 'Tijdsregistratie + facturering geïntegreerd' },
          ],
        },
        {
          title: 'Communicatie',
          items: [
            { name: 'Superhuman/Spark', desc: 'E-mail clients met snooze en planning' },
            { name: 'Calendly', desc: 'Zelfbediening vergaderplanning' },
            { name: 'Slack', desc: 'Georganiseerde klant communicatiekanalen' },
          ],
        },
        {
          title: 'Bestandsbeheer',
          items: [
            { name: 'Google Drive', desc: 'Klant-specifieke mappen met georganiseerde structuur' },
            { name: 'Dropbox', desc: 'Grote bestandsdeling met versiebeheer' },
            { name: 'Notion', desc: 'Gecombineerde documenten en bestandsopslag' },
          ],
        },
      ],
    },
    burnout: {
      title: 'Burnout Vermijden Tijdens Opschalen',
      capacity: {
        title: 'Stel Capaciteitslimieten',
        intro: 'Ken je duurzame werkbelasting en houd je eraan:',
        items: [
          { title: 'Factureerbare Uren Limiet', text: 'De meeste freelancers branden op boven 30-35 factureerbare uren per week (inclusief admin, marketing, etc.)' },
          { title: 'Klantaantal Limiet', text: '5-7 actieve klanten is beheersbaar voor de meeste freelancers; meer vereist systemen en mogelijk hulp' },
          { title: 'Project Overlap', text: 'Beperk projecten in dezelfde fase tegelijkertijd (bijv. niet meer dan 3 projecten in "actieve ontwikkeling" tegelijk)' },
        ],
      },
      buffer: {
        title: 'Bouw Buffertijd In',
        intro: 'Boek jezelf niet op 100% capaciteit:',
        items: [
          { title: '20% buffer', text: 'Laat 20% van je planning ongealloceerd voor urgente klantverzoeken, ziekdagen en mentale gezondheid breaks' },
          { title: 'Vrijdag inhalen', text: 'Reserveer vrijdagmiddagen voor overflow werk en planning, niet voor klantverplichtingen' },
          { title: 'Maandelijkse bufferdag', text: 'Één dag per maand zonder klantwerk voor admin, planning en herstel' },
        ],
      },
      timeOff: {
        title: 'Neem Echte Vrije Tijd',
        intro: 'Plan en communiceer vakantietijd proactief:',
        items: [
          'Informeer klanten 4-6 weken voor vakanties',
          'Stel duidelijke afwezigheid verwachtingen (wie zal niet reageren)',
          'Front-load of back-load werk om echte vrije tijd te creëren',
          'Neem minimaal 2-3 weken vakantie per jaar',
        ],
      },
    },
    ctaContracts: {
      title: 'Bescherm Je Bedrijf met Solide Contracten',
      description: 'Meerdere klanten beheren vereist duidelijke afspraken. Leer hoe je uitgebreide contracten maakt die je tijd beschermen en scope definiëren.',
      button1: 'Contract Gids',
      button2: 'Facturering Best Practices',
    },
    sayNo: {
      title: 'Wanneer Nee Zeggen Tegen Nieuwe Klanten',
      intro: 'Leren om kansen te weigeren is net zo belangrijk als ze accepteren:',
      items: [
        {
          title: 'Je Zit Op Capaciteit',
          text: 'Wanneer je al vol zit, schaadt meer werk aannemen bestaande klanten en jezelf. Bied aan om ze op je wachtlijst te plaatsen of verwijs ze door naar collega\'s.',
        },
        {
          title: 'Rode Vlaggen in Discovery Call',
          text: 'Gebrek aan respect, onrealistische verwachtingen, weigering om budget te bespreken, of het afgeven op vorige freelancers zijn waarschuwingssignalen. Vertrouw je instinct.',
        },
        {
          title: 'Onder Je Tarief',
          text: 'Laag betaald werk aannemen wanneer je op capaciteit zit betekent beter betaalde kansen afwijzen. Geef alleen korting om strategische redenen (portfolio stuk, droomklant, leerervaring).',
        },
        {
          title: 'Buiten Je Expertise',
          text: 'Werk aannemen waar je niet voor gekwalificeerd bent verspilt ieders tijd en schaadt je reputatie. Verwijs ze in plaats daarvan door naar een specialist.',
        },
      ],
    },
    conclusion: {
      title: 'Schaal Slim Op, Niet Alleen Snel',
      paragraphs: [
        'Succesvol meerdere freelance klanten beheren gaat niet over meer uren werken—het gaat over slimmer werken met betere systemen, duidelijke communicatie en duurzame praktijken. Het doel is om inkomen te verhogen zonder in te boeten op kwaliteit, relaties of je mentale gezondheid.',
        'Implementeer organisatiesystemen die werken voor jouw workflow. Stel duidelijke grenzen met klanten en houd je eraan. Prioriteer meedogenloos met objectieve criteria. En het belangrijkste, ken je limieten en respecteer ze.',
        'Naarmate je groeit, overweeg of je wilt opschalen door meer klanten of hogere tarieven. Veel succesvolle freelancers vinden dat minder, beter betalende klanten met retainer afspraken betere werk-privé balans bieden dan constant veel kleinere projecten jongleren.',
      ],
    },
    relatedResources: {
      title: 'Gerelateerde Bronnen',
      links: [
        { href: '/resources/freelance-contracts-101', icon: 'FileText', text: 'Freelance Contracten 101' },
        { href: '/resources/freelance-tax-guide', icon: 'CheckCircle', text: 'Freelance Belasting Gids' },
        { href: '/tools/time-tracker', icon: 'Clock', text: 'Gratis Time Tracker' },
        { href: '/tools', icon: 'Zap', text: 'Alle Zakelijke Tools' },
      ],
    },
  } : {
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Managing Multiple Clients: Organization and Time Management Tips',
      description: 'Complete guide to managing multiple freelance clients including organization systems, time management, and productivity strategies.',
      author: {
        '@type': 'Organization',
        name: 'SkillLinkup',
      },
      publisher: {
        '@type': 'Organization',
        name: 'SkillLinkup',
        logo: {
          '@type': 'ImageObject',
          url: 'https://skilllinkup.com/images/logo/skilllinkup-transparant-rozepunt.webp',
        },
      },
      datePublished: '2025-01-15',
      dateModified: '2025-01-15',
    },
    hero: {
      title: 'Managing Multiple Clients: Organization & Time Management',
      description: 'Learn proven systems and strategies to successfully juggle multiple freelance clients without burning out or missing deadlines.',
      cta1: 'Track Your Time',
      cta2: 'Business Tools',
    },
    intro: {
      text: 'Successfully managing multiple freelance clients is the key to scaling your income without sacrificing quality or burning out. Whether you\'re handling 3 clients or 10, the right organization systems and time management strategies will help you deliver excellent work while maintaining your sanity.',
    },
    challenge: {
      title: 'The Multiple-Client Challenge',
      intro: 'Managing multiple clients simultaneously creates unique challenges that don\'t exist when working with just one client:',
      items: [
        {
          title: 'Context Switching',
          text: 'Jumping between different projects, tools, communication styles, and expectations drains mental energy and reduces productivity.',
        },
        {
          title: 'Competing Deadlines',
          text: 'When multiple clients have urgent needs simultaneously, prioritization becomes critical and stressful.',
        },
        {
          title: 'Communication Overload',
          text: 'Emails, Slack messages, calls, and meetings from multiple clients can consume your entire day if not managed properly.',
        },
        {
          title: 'Quality Control',
          text: 'Maintaining consistent quality across multiple projects requires systems, focus, and careful attention to each client\'s standards.',
        },
      ],
    },
    organization: {
      title: 'Organization Systems That Work',
      tracker: {
        title: '1. The Master Project Tracker',
        intro: 'Create a centralized overview of all active projects with key information at a glance:',
        subtitle: 'Essential Tracker Columns',
        items: [
          { col: 'Client Name', desc: 'Primary contact and company' },
          { col: 'Project Title', desc: 'Clear, descriptive name' },
          { col: 'Status', desc: 'Not Started, In Progress, Review, Completed' },
          { col: 'Priority', desc: 'High, Medium, Low based on deadline urgency' },
          { col: 'Next Deadline', desc: 'Immediate upcoming milestone' },
          { col: 'Hours This Week', desc: 'Time allocated to this project' },
          { col: 'Blocking Issues', desc: 'Awaiting client feedback, missing assets, etc.' },
          { col: 'Invoice Status', desc: 'Not invoiced, Sent, Paid' },
        ],
        tools: 'Tools: Notion, Airtable, Google Sheets, or Monday.com work excellently for project tracking.',
      },
      timeBlocking: {
        title: '2. Time Blocking for Client Work',
        intro: 'Assign specific time blocks to each client to minimize context switching:',
        scheduleTitle: 'Example Weekly Schedule',
        schedule: [
          {
            day: 'Monday',
            slots: [
              '9-12: Client A (deep work)',
              '1-3: Client B (meetings + work)',
              '3-5: Admin (emails, invoicing)',
            ],
          },
          {
            day: 'Tuesday',
            slots: [
              '9-12: Client C (deep work)',
              '1-5: Client A (continued)',
            ],
          },
          {
            day: 'Wednesday',
            slots: [
              '9-12: Client D (deep work)',
              '1-3: Client B (continued)',
              '3-5: Marketing + BD',
            ],
          },
          {
            day: 'Thursday',
            slots: [
              '9-12: Client C (continued)',
              '1-5: Client D (continued)',
            ],
          },
          {
            day: 'Friday',
            slots: [
              '9-11: Catch-up / overflow work',
              '11-1: Admin + planning next week',
              'Afternoon: OFF',
            ],
          },
        ],
      },
      communication: {
        title: '3. Communication Boundaries and Batching',
        intro: 'Set clear communication expectations with all clients to protect your focus time:',
        items: [
          {
            title: 'Email Response Times',
            text: 'Set expectations for 24-hour email response times (except weekends). Check email 2-3 times daily at scheduled times: morning (9am), midday (1pm), and end of day (4pm). Avoid constantly monitoring inbox.',
          },
          {
            title: 'Meeting Policies',
            text: 'Batch client calls on specific days (e.g., Tuesdays and Thursdays). Offer 2-3 time slots rather than "what works for you?" Use Calendly or similar tools for self-service scheduling.',
          },
          {
            title: 'Urgent Communication Protocol',
            text: 'Define what "urgent" means (production down, critical deadline within 24h). True urgencies can reach you via phone call. Everything else can wait for your next email check.',
          },
          {
            title: 'Status Update Routine',
            text: 'Send weekly status updates to all active clients every Friday afternoon. Include progress made, upcoming milestones, and any blockers. This proactive communication reduces "checking in" emails throughout the week.',
          },
        ],
      },
    },
    ctaTimeTracker: {
      title: 'Track Time Accurately Across All Clients',
      description: 'Know exactly where your time goes with our free time tracking tool. Generate reports per client and ensure you\'re billing accurately.',
      button: 'Start Time Tracking',
    },
    prioritization: {
      title: 'Prioritization Strategies',
      abcde: {
        title: 'The ABCDE Method for Client Work',
        intro: 'Categorize all tasks using this priority system:',
        items: [
          {
            letter: 'A',
            title: 'A Tasks: Must Do',
            description: 'Critical deadlines with serious consequences if missed. These get done first, no exceptions.',
            example: 'Example: Client presentation due tomorrow, production deployment scheduled today',
            color: 'red',
          },
          {
            letter: 'B',
            title: 'B Tasks: Should Do',
            description: 'Important but less urgent. Consequences exist but aren\'t critical. Do these after A tasks.',
            example: 'Example: Project work due next week, client check-in meetings',
            color: 'orange',
          },
          {
            letter: 'C',
            title: 'C Tasks: Nice to Do',
            description: 'Minimal consequences if not done. Do these only after A and B tasks are complete.',
            example: 'Example: Internal process improvements, organizing files',
            color: 'yellow',
          },
          {
            letter: 'D',
            title: 'D Tasks: Delegate',
            description: 'Tasks that someone else can do. As you grow, delegation becomes essential.',
            example: 'Example: Data entry, social media scheduling, invoice follow-ups',
            color: 'blue',
          },
          {
            letter: 'E',
            title: 'E Tasks: Eliminate',
            description: 'Tasks that don\'t contribute to your goals. Stop doing these entirely.',
            example: 'Example: Excessive meeting prep, perfectionism on minor details',
            color: 'gray',
          },
        ],
      },
      competing: {
        title: 'When All Clients Want Priority',
        intro: 'When multiple clients have competing urgent needs:',
        items: [
          { step: 'Assess True Urgency', text: 'Ask: What happens if this is delayed 24 hours? Real urgencies are rare.' },
          { step: 'Communicate Proactively', text: 'Tell clients immediately when competing priorities arise. Most will understand and accept reasonable delays.' },
          { step: 'Offer Solutions', text: '"I can deliver a working version by EOD today and the polished version tomorrow" gives clients options.' },
          { step: 'First Come, First Served', text: 'When urgency is equal, honor the order commitments were made.' },
          { step: 'Consider Relationship Value', text: 'Long-term, high-value clients may receive preference over new, small projects.' },
        ],
      },
    },
    tools: {
      title: 'Essential Tools for Managing Multiple Clients',
      categories: [
        {
          title: 'Project Management',
          items: [
            { name: 'Notion', desc: 'All-in-one workspace for notes, databases, and project tracking' },
            { name: 'Asana', desc: 'Task management with client-specific projects and timelines' },
            { name: 'Trello', desc: 'Visual board-based project management' },
          ],
        },
        {
          title: 'Time Tracking',
          items: [
            { name: 'SkillLinkup Time Tracker', desc: 'Free tool for accurate time tracking' },
            { name: 'Toggl Track', desc: 'Simple time tracking with detailed reports' },
            { name: 'Harvest', desc: 'Time tracking + invoicing integrated' },
          ],
        },
        {
          title: 'Communication',
          items: [
            { name: 'Superhuman/Spark', desc: 'Email clients with snooze and scheduling' },
            { name: 'Calendly', desc: 'Self-service meeting scheduling' },
            { name: 'Slack', desc: 'Organized client communication channels' },
          ],
        },
        {
          title: 'File Management',
          items: [
            { name: 'Google Drive', desc: 'Client-specific folders with organized structure' },
            { name: 'Dropbox', desc: 'Large file sharing with version control' },
            { name: 'Notion', desc: 'Combined docs and file storage' },
          ],
        },
      ],
    },
    burnout: {
      title: 'Avoiding Burnout While Scaling',
      capacity: {
        title: 'Set Capacity Limits',
        intro: 'Know your sustainable workload and stick to it:',
        items: [
          { title: 'Billable Hours Cap', text: 'Most freelancers burn out above 30-35 billable hours per week (includes admin, marketing, etc.)' },
          { title: 'Client Number Limit', text: '5-7 active clients is manageable for most freelancers; more requires systems and possibly help' },
          { title: 'Project Overlap', text: 'Limit projects in the same phase simultaneously (e.g., no more than 3 projects in "active development" at once)' },
        ],
      },
      buffer: {
        title: 'Build in Buffer Time',
        intro: 'Don\'t book yourself at 100% capacity:',
        items: [
          { title: '20% buffer', text: 'Leave 20% of your schedule unallocated for urgent client requests, sick days, and mental health breaks' },
          { title: 'Friday catch-up', text: 'Reserve Friday afternoons for overflow work and planning, not client commitments' },
          { title: 'Monthly buffer day', text: 'One day per month with no client work for admin, planning, and recovery' },
        ],
      },
      timeOff: {
        title: 'Take Real Time Off',
        intro: 'Schedule and communicate vacation time proactively:',
        items: [
          'Inform clients 4-6 weeks before vacations',
          'Set clear out-of-office expectations (who will not respond)',
          'Front-load or back-load work to create true time off',
          'Take at least 2-3 weeks of vacation annually',
        ],
      },
    },
    ctaContracts: {
      title: 'Protect Your Business with Solid Contracts',
      description: 'Managing multiple clients requires clear agreements. Learn how to create comprehensive contracts that protect your time and define scope.',
      button1: 'Contract Guide',
      button2: 'Invoicing Best Practices',
    },
    sayNo: {
      title: 'When to Say No to New Clients',
      intro: 'Learning to decline opportunities is as important as accepting them:',
      items: [
        {
          title: 'You\'re at Capacity',
          text: 'When you\'re already maxed out, taking on more work hurts existing clients and yourself. Offer to add them to your waitlist or refer them to colleagues.',
        },
        {
          title: 'Red Flags in Discovery Call',
          text: 'Disrespect, unrealistic expectations, refusal to discuss budget, or bad-mouthing previous freelancers are warning signs. Trust your instincts.',
        },
        {
          title: 'Below Your Rate',
          text: 'Taking low-paying work when you\'re at capacity means turning down better-paying opportunities. Only discount for strategic reasons (portfolio piece, dream client, learning opportunity).',
        },
        {
          title: 'Outside Your Expertise',
          text: 'Taking on work you\'re not qualified for wastes everyone\'s time and damages your reputation. Refer them to a specialist instead.',
        },
      ],
    },
    conclusion: {
      title: 'Scale Smartly, Not Just Fast',
      paragraphs: [
        'Successfully managing multiple freelance clients isn\'t about working more hours—it\'s about working smarter with better systems, clear communication, and sustainable practices. The goal is to increase income without sacrificing quality, relationships, or your mental health.',
        'Implement organization systems that work for your workflow. Set clear boundaries with clients and stick to them. Prioritize ruthlessly using objective criteria. And most importantly, know your limits and respect them.',
        'As you grow, consider whether you want to scale through more clients or higher rates. Many successful freelancers find that fewer, higher-paying clients with retainer arrangements provide better work-life balance than constantly juggling many smaller projects.',
      ],
    },
    relatedResources: {
      title: 'Related Resources',
      links: [
        { href: '/resources/freelance-contracts-101', icon: 'FileText', text: 'Freelance Contracts 101' },
        { href: '/resources/freelance-tax-guide', icon: 'CheckCircle', text: 'Freelance Tax Guide' },
        { href: '/tools/time-tracker', icon: 'Clock', text: 'Free Time Tracker' },
        { href: '/tools', icon: 'Zap', text: 'All Business Tools' },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(content.jsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                {content.hero.title}
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                {content.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/tools/time-tracker`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-heading font-semibold rounded-lg shadow-lg transition-all hover:shadow-xl"
                >
                  <Clock className="w-5 h-5" />
                  {content.hero.cta1}
                </Link>
                <Link
                  href={`/${locale}/tools`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-heading font-semibold rounded-lg shadow border-2 border-gray-200 dark:border-gray-700 transition-all"
                >
                  {content.hero.cta2}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <article className="prose prose-lg dark:prose-invert max-w-none">

                {/* Introduction */}
                <div className="mb-12">
                  <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    {content.intro.text}
                  </p>
                </div>

                {/* The Challenge */}
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  {content.challenge.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {content.challenge.intro}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {content.challenge.items.map((item, index) => (
                    <div key={index} className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-6">
                      <h3 className="text-xl font-heading font-bold text-red-900 dark:text-red-400 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-red-800 dark:text-red-300 text-sm">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Organization Systems */}
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  {content.organization.title}
                </h2>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {content.organization.tracker.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {content.organization.tracker.intro}
                </p>

                <div className="bg-gradient-to-br from-accent/5 to-primary/5 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 mb-8">
                  <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                    {content.organization.tracker.subtitle}
                  </h4>
                  <ul className="space-y-3">
                    {content.organization.tracker.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <div>
                          <strong>{item.col}:</strong> {item.desc}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                    <strong>{locale === 'nl' ? 'Tools:' : 'Tools:'}</strong> {content.organization.tracker.tools}
                  </p>
                </div>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {content.organization.timeBlocking.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {content.organization.timeBlocking.intro}
                </p>

                <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
                  <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                    {content.organization.timeBlocking.scheduleTitle}
                  </h4>
                  <div className="space-y-3 text-sm">
                    {content.organization.timeBlocking.schedule.map((item, index) => (
                      <div key={index} className={`flex items-center gap-4 py-3 ${index < content.organization.timeBlocking.schedule.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}>
                        <div className="w-24 font-semibold text-primary">{item.day}</div>
                        <div className="flex-1">
                          {item.slots.map((slot, slotIndex) => (
                            <p key={slotIndex} className="text-gray-900 dark:text-white">{slot}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {content.organization.communication.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {content.organization.communication.intro}
                </p>

                <div className="space-y-4 mb-8">
                  {content.organization.communication.items.map((item, index) => (
                    <div key={index} className="bg-gradient-to-r from-accent/10 to-transparent dark:from-gray-800 dark:to-transparent border-l-4 border-accent p-6 rounded-r-lg">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA Box */}
                <div className="bg-gradient-to-br from-primary to-primary-dark dark:from-primary dark:to-primary-dark rounded-2xl p-8 my-12 text-center shadow-xl">
                  <Clock className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">
                    {content.ctaTimeTracker.title}
                  </h3>
                  <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                    {content.ctaTimeTracker.description}
                  </p>
                  <Link
                    href={`/${locale}/tools/time-tracker`}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary hover:bg-gray-100 font-heading font-semibold rounded-lg shadow-lg transition-all"
                  >
                    <Clock className="w-5 h-5" />
                    {content.ctaTimeTracker.button}
                  </Link>
                </div>

                {/* Prioritization Strategies */}
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  {content.prioritization.title}
                </h2>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {content.prioritization.abcde.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {content.prioritization.abcde.intro}
                </p>

                <div className="space-y-4 mb-8">
                  {content.prioritization.abcde.items.map((item, index) => (
                    <div key={index} className={`bg-white dark:bg-gray-800 border-l-4 border-${item.color}-500 rounded-r-lg p-6`}>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        {item.description}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.example}
                      </p>
                    </div>
                  ))}
                </div>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {content.prioritization.competing.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {content.prioritization.competing.intro}
                </p>
                <ol className="list-decimal pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-3">
                  {content.prioritization.competing.items.map((item, index) => (
                    <li key={index}><strong>{item.step}:</strong> {item.text}</li>
                  ))}
                </ol>

                {/* Tools Stack */}
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  {content.tools.title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {content.tools.categories.map((category, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
                      <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">{category.title}</h4>
                      <ul className="space-y-3 text-sm">
                        {category.items.map((tool, toolIndex) => (
                          <li key={toolIndex} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            <div>
                              <strong>{tool.name}:</strong> {tool.desc}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Avoiding Burnout */}
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  {content.burnout.title}
                </h2>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {content.burnout.capacity.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {content.burnout.capacity.intro}
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                  {content.burnout.capacity.items.map((item, index) => (
                    <li key={index}><strong>{item.title}:</strong> {item.text}</li>
                  ))}
                </ul>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {content.burnout.buffer.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {content.burnout.buffer.intro}
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                  {content.burnout.buffer.items.map((item, index) => (
                    <li key={index}><strong>{item.title}:</strong> {item.text}</li>
                  ))}
                </ul>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {content.burnout.timeOff.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {content.burnout.timeOff.intro}
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                  {content.burnout.timeOff.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                {/* CTA Box */}
                <div className="bg-gradient-to-br from-accent/10 to-primary/10 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 my-12 text-center border-2 border-accent/20 dark:border-gray-700">
                  <FileText className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-3">
                    {content.ctaContracts.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                    {content.ctaContracts.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href={`/${locale}/resources/freelance-contracts-101`}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-white font-heading font-semibold rounded-lg shadow-lg transition-all"
                    >
                      <FileText className="w-5 h-5" />
                      {content.ctaContracts.button1}
                    </Link>
                    <Link
                      href={`/${locale}/resources/freelance-invoicing-guide`}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-heading font-semibold rounded-lg shadow border-2 border-gray-200 dark:border-gray-700 transition-all"
                    >
                      {content.ctaContracts.button2}
                    </Link>
                  </div>
                </div>

                {/* When to Say No */}
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  {content.sayNo.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {content.sayNo.intro}
                </p>

                <div className="space-y-4 mb-8">
                  {content.sayNo.items.map((item, index) => (
                    <div key={index} className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                      <h4 className="font-semibold text-yellow-900 dark:text-yellow-400 mb-2">{item.title}</h4>
                      <p className="text-yellow-800 dark:text-yellow-300 text-sm">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Conclusion */}
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  {content.conclusion.title}
                </h2>
                {content.conclusion.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 dark:text-gray-300 mb-6">
                    {paragraph}
                  </p>
                ))}

                {/* Internal Links */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                    {content.relatedResources.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.relatedResources.links.map((link, index) => {
                      const IconComponent = link.icon === 'FileText' ? FileText : link.icon === 'CheckCircle' ? CheckCircle : link.icon === 'Clock' ? Clock : Zap;
                      return (
                        <Link
                          key={index}
                          href={`/${locale}${link.href}`}
                          className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <IconComponent className="w-6 h-6 text-primary" />
                          <span className="font-semibold text-gray-900 dark:text-white">{link.text}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
