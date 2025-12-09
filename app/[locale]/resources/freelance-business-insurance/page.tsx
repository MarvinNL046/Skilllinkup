import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Shield, AlertTriangle, CheckCircle, FileText, DollarSign } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const slug = 'freelance-business-insurance';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

  if (locale === 'nl') {
    return {
      title: 'Verzekering voor ZZP: Heb je het nodig? Complete Gids',
      description: 'Leer welke verzekeringen ZZP\'ers nodig hebben: AOV, aansprakelijkheid, beroepsaansprakelijkheid. Vergelijk kosten, dekking en bepaal of verzekering de moeite waard is.',
      keywords: 'verzekering ZZP, AOV verzekering, arbeidsongeschiktheidsverzekering, aansprakelijkheidsverzekering freelancer, beroepsaansprakelijkheid, WIA verzekering, cyber verzekering',
      openGraph: {
        title: 'Verzekering voor ZZP\'ers: Complete Gids 2024',
        description: 'Uitgebreide gids over verzekeringen voor ZZP\'ers. Leer welke dekking je nodig hebt en of het de investering waard is.',
        url: pageUrl,
        siteName: 'SkillLinkup',
        images: [
          {
            url: `${siteUrl}/images/og/resources-og.png`,
            width: 1200,
            height: 630,
            alt: 'Verzekering voor ZZP\'ers: Complete Gids 2024',
          }
        ],
        locale: 'nl_NL',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Verzekering voor ZZP: Heb je het nodig? Complete Gids',
        description: 'Leer welke verzekeringen ZZP\'ers nodig hebben: AOV, aansprakelijkheid, beroepsaansprakelijkheid. Vergelijk kosten, dekking en bepaal of verzekering de moeite waard is.',
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
    title: 'Freelance Business Insurance: Do You Need It? Complete Guide',
    description: 'Learn which insurance freelancers need including liability, E&O, and health insurance. Compare costs, coverage, and determine if insurance is worth it for your business.',
    keywords: 'freelance insurance, business insurance, liability insurance, E&O insurance, freelance health insurance',
    openGraph: {
      title: 'Freelance Business Insurance: Do You Need It? Complete Guide',
      description: 'Comprehensive guide to freelance business insurance. Learn what coverage you need and whether it is worth the investment.',
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [
        {
          url: `${siteUrl}/images/og/resources-og.png`,
          width: 1200,
          height: 630,
          alt: 'Freelance Business Insurance: Do You Need It? Complete Guide',
        }
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Freelance Business Insurance: Do You Need It? Complete Guide',
      description: 'Learn which insurance freelancers need including liability, E&O, and health insurance. Compare costs, coverage, and determine if insurance is worth it for your business.',
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

export default async function FreelanceBusinessInsurancePage({ params }: PageProps) {
  const { locale } = await params;

  const content = locale === 'nl' ? {
    // Hero Section
    heroTitle: 'Verzekering voor ZZP\'ers: Heb je het Nodig?',
    heroDescription: 'Begrijp welke verzekeringen ZZP\'ers nodig hebben, vergelijk kosten en dekking, en bepaal of een zakelijke verzekering de investering waard is voor jouw situatie.',
    heroButtonContract: 'Contract Bescherming Gids',
    heroButtonTools: 'Zakelijke Tools',

    // Introduction
    introText: 'Als ZZP\'er run je een bedrijf—en bedrijven lopen risico\'s. Van claims door opdrachtgevers tot datalekken, de vraag is niet of risico\'s bestaan, maar of verzekering de kosten waard is voor jouw specifieke situatie. Deze gids behandelt alles wat je moet weten over verzekeringen voor ZZP\'ers.',

    // Need Insurance Section
    needTitle: 'Hebben ZZP\'ers Echt een Verzekering Nodig?',
    needIntro: 'Het korte antwoord: Het hangt af van je branche, eisen van opdrachtgevers en risicotolerantie. Overweeg deze factoren:',
    needYesTitle: 'Je Hebt Waarschijnlijk Verzekering Nodig Als:',
    needYesItems: [
      'Opdrachtgevers bewijs van verzekering eisen (gebruikelijk bij grote bedrijven)',
      'Je gevoelige klantgegevens of intellectueel eigendom beheert',
      'Je professioneel advies geeft (consultancy, juridisch, financieel)',
      'Je werk financiële schade kan veroorzaken bij fouten',
      'Je jaarlijks meer dan €45.000 verdient (aanzienlijke vermogensrisico\'s)',
      'Je werkt met waardevolle opdrachtgevers of grote projecten'
    ],
    needMaybeTitle: 'Je Kunt Mogelijk zonder Verzekering Als:',
    needMaybeItems: [
      'Je net begint met minimaal inkomen (< €18.000/jaar)',
      'Je werk laag-risico is (basis contentschrijven, data-invoer)',
      'Je minimale persoonlijke bezittingen hebt om te beschermen',
      'Opdrachtgevers kleine bedrijven zijn met beperkt procerisico',
      'Je freelancet als bijbaan, niet als hoofdinkomen',
      'Je budget extreem krap is en je haalbaarheid test'
    ],
    needInfoBoxTitle: 'Risico vs. Kosten Analyse',
    needInfoBoxText: 'Verzekering kost €450-€1.800 per jaar voor de meeste ZZP\'ers. Een enkele rechtszaak kan €45.000+ kosten, zelfs als je wint. Overweeg je persoonlijke risicotolerantie en de waarschijnlijkheid van claims in jouw branche bij het beslissen.',

    // Types Section
    typesTitle: 'Soorten Verzekeringen voor ZZP\'ers',

    // Professional Liability
    proTitle: 'Beroepsaansprakelijkheidsverzekering',
    proSubtitle: 'Belangrijkst voor dienstverleners',
    proCoversTitle: 'Wat Het Dekt:',
    proCoversItems: [
      'Claims van professionele nalatigheid of fouten in je werk',
      'Het niet leveren van diensten zoals beloofd',
      'Gemiste deadlines die financiële schade aan opdrachtgever veroorzaken',
      'Auteursrechtschending of geschillen over intellectueel eigendom',
      'Juridische verdedigingskosten zelfs als claims ongegrond zijn'
    ],
    proWhoTitle: 'Wie Heeft Het Nodig:',
    proWhoText: 'Consultants, ontwikkelaars, ontwerpers, marketeers, schrijvers, accountants, coaches—iedereen die professionele diensten of advies levert.',
    proCostTitle: 'Kosten & Dekking:',
    proCostAmount: '€450-€1.350/jaar',
    proCoverage: '€1M per claim, €2M totaal (standaard)',
    proDeductible: '€0-€2.250 per claim',
    proExampleTitle: 'Echt Voorbeeld:',
    proExampleText: 'Een freelance ontwikkelaar\'s code veroorzaakt dat een opdrachtgever\'s webshop crasht tijdens Black Friday, resulterend in €90K omzetverlies. Beroepsaansprakelijkheidsverzekering dekt de claim en juridische verdedigingskosten.',

    // General Liability
    genTitle: 'Algemene Aansprakelijkheidsverzekering (AVB)',
    genSubtitle: 'Dekt lichamelijk letsel en materiële schade',
    genCoversTitle: 'Wat Het Dekt:',
    genCoversItems: [
      'Lichamelijk letsel aan opdrachtgevers of derden',
      'Materiële schade (bijv. koffie morsen op laptop van opdrachtgever)',
      'Persoonlijk letsels claims (smaad, laster, aantasting goed naam)',
      'Reclameschade (auteursrechtschending in marketing)'
    ],
    genWhoTitle: 'Wie Heeft Het Nodig:',
    genWhoText: 'ZZP\'ers die opdrachtgevers persoonlijk ontmoeten, werken in kantoren van opdrachtgevers, kantoor-/coworkingspace huren, of opdrachtgevers op hun thuiskantoor ontvangen.',
    genCostTitle: 'Kosten & Dekking:',
    genCostAmount: '€270-€540/jaar',
    genCoverage: '€1M per gebeurtenis, €2M totaal',
    genNote: 'Minder kritiek voor volledig remote ZZP\'ers',

    // Cyber Liability
    cyberTitle: 'Cyber Aansprakelijkheidsverzekering',
    cyberSubtitle: 'Bescherming tegen datalekken en cyberaanvallen',
    cyberCoversTitle: 'Wat Het Dekt:',
    cyberCoversItems: [
      'Kosten voor melding van datalekken (wettelijk verplicht onder AVG)',
      'Kredietbewaking voor getroffen personen',
      'Juridische verdediging tegen rechtszaken gerelateerd aan datalekken',
      'Regelgevende boetes en sancties (AVG naleving)',
      'Bedrijfsonderbreking door cyberaanvallen',
      'Ransomware betalingen (indien geen andere optie bestaat)'
    ],
    cyberWhoTitle: 'Wie Heeft Het Nodig:',
    cyberWhoText: 'Elke ZZP\'er die klantgegevens verwerkt, klantinformatie opslaat, of toegang heeft tot klantsystemen. Vooral kritiek voor ontwikkelaars, marketeers met toegang tot klantgegevens, en iedereen die werkt met persoonsgegevens.',
    cyberCostTitle: 'Kosten & Dekking:',
    cyberCostAmount: '€450-€1.350/jaar',
    cyberCoverage: '€1M-€5M',
    cyberNote: 'Steeds vaker vereist door grote bedrijven en overheidsopdrachtgevers',
    cyberExampleTitle: 'Echt Voorbeeld:',
    cyberExampleText: 'Een freelance VA\'s laptop wordt gestolen met onversleutelde klantgegevens. Cyber aansprakelijkheidsverzekering dekt de €45K kosten van verplichte meldingen van datalekken, kredietbewaking voor 500 getroffen personen, en juridische verdediging.',

    // AOV Insurance
    aovTitle: 'Arbeidsongeschiktheidsverzekering (AOV)',
    aovSubtitle: 'Inkomensbescherming bij arbeidsongeschiktheid',
    aovIntro: 'Als ZZP\'er ben je niet verplicht verzekerd via werkgeversregelingen. De AOV is specifiek ontworpen voor zelfstandigen:',
    aovOptionsTitle: 'Opties voor ZZP\'ers:',
    aovOptionsItems: [
      'AOV Verzekering: Dekking bij volledige of gedeeltelijke arbeidsongeschiktheid; premie afhankelijk van leeftijd, beroep en gewenste uitkering',
      'WIA-Hiaatverzekering: Voor zelfstandigen die ook in loondienst werken; vult gat tussen WIA-uitkering en gewenst inkomen',
      'Broodfonds: Solidair fonds van ZZP\'ers; lage kosten maar beperkte dekking en wachttijden',
      'Inkomensverzekering: Breder dan AOV; kan ook werkloosheid en bedrijfsschade dekken'
    ],
    aovTaxTitle: 'Fiscaal Voordeel:',
    aovTaxText: 'ZZP\'ers kunnen AOV-premies aftrekken van hun belastbaar inkomen als zelfstandigenaftrek, wat duizenden euro\'s per jaar kan besparen.',
    aovCostAmount: '€900-€2.700/jaar',
    aovCoverage: '€1.000-€3.000 per maand uitkering',
    aovNote: 'Premie hangt af van leeftijd, beroep en gewenste dekking',

    // CTA Box 1
    cta1Title: 'Combineer Verzekering met Sterke Contracten',
    cta1Text: 'Verzekering beschermt je financieel, maar solide contracten voorkomen problemen in de eerste plaats. Leer hoe je uitgebreide freelance-overeenkomsten opstelt.',
    cta1Button: 'Lees Contract Gids',

    // Providers Section
    providersTitle: 'Waar je ZZP Verzekering Koopt',
    providersIntro: 'Nederlandse verzekeraars gespecialiseerd in ZZP\'ers:',
    providers: [
      {
        name: 'Zilveren Kruis',
        description: 'Gespecialiseerd in AOV en gezondheidsregelingen voor ZZP\'ers. Goede reputatie voor claimbeoordeling.',
        bestFor: 'AOV en zorgverzekering',
        cost: '€900-€2.400/jaar'
      },
      {
        name: 'AEGON',
        description: 'Uitgebreide verzekeringspakketten specifiek voor zelfstandigen. Flexibele dekkingsopties.',
        bestFor: 'Complete pakketten',
        cost: '€1.200-€3.000/jaar'
      },
      {
        name: 'Nationale-Nederlanden',
        description: 'Breed aanbod zakelijke verzekeringen. Ervaren in MKB en ZZP.',
        bestFor: 'Beroepsaansprakelijkheid en bedrijfsschade',
        cost: '€450-€1.350/jaar'
      },
      {
        name: 'Aon',
        description: 'Gespecialiseerd in cyber aansprakelijkheid. Goed voor tech ZZP\'ers.',
        bestFor: 'Tech ZZP\'ers, cyber aansprakelijkheid',
        cost: '€450-€1.350/jaar'
      },
      {
        name: 'Broodfonds',
        description: 'Solidair fonds van en voor ZZP\'ers. Lage kosten, beperkte dekking.',
        bestFor: 'Budget-vriendelijke arbeidsongeschiktheid',
        cost: '€50-€100/maand + bijdragen'
      },
      {
        name: 'ZZP Verzekeringen.nl',
        description: 'Vergelijkingssite voor meerdere aanbieders. Handig voor beste tarieven.',
        bestFor: 'Prijzen vergelijken tussen verzekeraars',
        cost: 'Varieert per verzekeraar'
      }
    ],

    // Cost Comparison
    costTitle: 'Totale Kosten Schattingen',
    costSubtitle: 'Jaarlijks Verzekeringbudget per Type ZZP\'er',
    costMinTitle: 'Minimale Dekking (Net Gestart)',
    costMinDesc: 'Alleen beroepsaansprakelijkheid',
    costMinAmount: '€450-€720/jaar',
    costMinFor: 'Best voor: Laag-risico creatieve ZZP\'ers met kleine klantenbestand',
    costStdTitle: 'Standaard Dekking (Gevestigde ZZP\'er)',
    costStdDesc: 'Beroepsaansprakelijkheid + Algemene aansprakelijkheid',
    costStdAmount: '€720-€1.350/jaar',
    costStdFor: 'Best voor: Dienstverleners met persoonlijke opdrachtgeversontmoetingen',
    costCompTitle: 'Uitgebreide Dekking (Volledige Bescherming)',
    costCompDesc: 'Beroeps + Algemeen + Cyber aansprakelijkheid',
    costCompAmount: '€1.350-€2.700/jaar',
    costCompFor: 'Best voor: Tech ZZP\'ers, consultants, iedereen die klantgegevens verwerkt',
    costPlusTitle: 'Premium Dekking (Met AOV)',
    costPlusDesc: 'Alle aansprakelijkheid + AOV arbeidsongeschiktheid',
    costPlusAmount: '€2.250-€5.400/jaar',
    costPlusFor: 'Best voor: ZZP\'ers met gezin of hypotheek, hoofdinkomen uit ZZP',

    // Tax Section
    taxTitle: 'Verzekering als Belastingaftrek',
    taxIntro: 'Goed nieuws: Alle zakelijke verzekeringspremies zijn volledig fiscaal aftrekbaar als bedrijfskosten, waardoor je belastbaar inkomen wordt verlaagd:',
    taxExampleTitle: 'Belastingbesparing Voorbeeld',
    taxPremium: 'Jaarlijkse verzekeringkosten',
    taxBracket: 'Jouw belastingtarief',
    taxSavings: 'Belastingbesparing (aftrek)',
    taxActual: 'Werkelijke kosten na belastingvoordeel',
    taxNote: 'Verzekering wordt 30% goedkoper door belastingaftrek. Declareer op aangifte IB (ondernemerskosten).',

    // CTA Box 2
    cta2Title: 'Maximaliseer Belastingaftrek met Goede Administratie',
    cta2Text: 'Houd nauwkeurige financiële administratie bij om verzekering- en bedrijfskosten-aftrekposten te maximaliseren. Leer alles over ZZP belastingen en aftrekposten.',
    cta2ButtonTax: 'Lees Belasting Gids',
    cta2ButtonInvoice: 'Bijhouden Inkomsten',

    // Decision Section
    decisionTitle: 'De Juiste Verzekeringsbeslissing Maken',
    decisionItems: [
      {
        title: 'Begin met Beroepsaansprakelijkheid',
        text: 'Als je maar één polis kunt betalen, maak het beroepsaansprakelijkheid. Dit dekt de meest voorkomende en duurste claims waarmee ZZP\'ers worden geconfronteerd: fouten, gemiste deadlines en professionele nalatigheid.'
      },
      {
        title: 'Breid Dekking Uit Naarmate je Groeit',
        text: 'Begin minimaal en breid dekking uit naarmate je inkomen en klantenbestand groeit. Wanneer je €45K+ jaaromzet haalt of grote bedrijven als opdrachtgever krijgt, is het tijd voor uitgebreide dekking inclusief cyber aansprakelijkheid.'
      },
      {
        title: 'Luister naar Eisen van Opdrachtgevers',
        text: 'Als meerdere opdrachtgevers bewijs van verzekering vragen, is dat een duidelijk signaal dat je dekking nodig hebt. Projecten mislopen door gebrek aan verzekering is duurder dan de premies.'
      },
      {
        title: 'Bekijk Jaarlijks Opnieuw',
        text: 'Herbeoordeel je verzekeringbehoeften elk jaar naarmate je bedrijf evolueert. Veranderingen in inkomen, type opdrachtgevers, aangeboden diensten, of brancherisico\'s kunnen aanpassing van je dekking vereisen.'
      }
    ],

    // Conclusion
    conclusionTitle: 'Bescherm je ZZP Onderneming',
    conclusionP1: 'Verzekering is een investering in de levensduur van je bedrijf en je gemoedsrust. Hoewel de maandelijkse kosten als een last kunnen lijken, kan een enkele onverzekerde claim jaren winst en mogelijk je hele bedrijf wegvagen.',
    conclusionP2: 'De meeste ZZP\'ers hebben minimaal beroepsaansprakelijkheid nodig, vooral naarmate ze groeien voorbij de opstartfase. Voeg algemene aansprakelijkheid toe als je opdrachtgevers persoonlijk ontmoet, en cyber aansprakelijkheid als je klantgegevens verwerkt.',
    conclusionP3: 'Onthoud: Verzekering werkt het beste naast andere bescherming zoals solide contracten, duidelijke communicatie en professionele werkpraktijken. Vertrouw niet alleen op verzekering—combineer het met preventieve maatregelen voor uitgebreide bedrijfsbescherming.',
    conclusionP4: 'Vraag offertes bij 3-5 aanbieders, vergelijk dekkingsbedragen en uitsluitingen (niet alleen prijs), en kies een polis die past bij jouw specifieke risico\'s. De gemoedsrust is de investering waard.',

    // Related Resources
    relatedTitle: 'Gerelateerde Bronnen',
    relatedContract: 'Freelance Contracten 101',
    relatedTax: 'ZZP Belasting Gids',
    relatedClients: 'Meerdere Opdrachtgevers Beheren',
    relatedTools: 'Gratis Zakelijke Tools',

  } : {
    // Hero Section
    heroTitle: 'Freelance Business Insurance: Do You Need It?',
    heroDescription: 'Understand the types of insurance freelancers need, compare costs and coverage, and determine if business insurance is worth the investment for your situation.',
    heroButtonContract: 'Contract Protection Guide',
    heroButtonTools: 'Business Tools',

    // Introduction
    introText: 'As a freelancer, you\'re running a business—and businesses face risks. From client lawsuits to data breaches, the question isn\'t whether risks exist, but whether insurance is worth the cost for your specific situation. This guide covers everything you need to know about freelance business insurance.',

    // Need Insurance Section
    needTitle: 'Do Freelancers Really Need Insurance?',
    needIntro: 'The short answer: It depends on your industry, client requirements, and risk tolerance. Consider these factors:',
    needYesTitle: 'You Probably Need Insurance If:',
    needYesItems: [
      'Clients require proof of insurance (common for enterprise clients)',
      'You handle sensitive client data or intellectual property',
      'You provide professional advice (consulting, legal, financial)',
      'Your work could cause financial loss if mistakes occur',
      'You earn over $50,000 annually (significant assets at risk)',
      'You work with high-value clients or large projects'
    ],
    needMaybeTitle: 'You Might Skip Insurance If:',
    needMaybeItems: [
      'You\'re just starting out with minimal income (< $20K/year)',
      'Your work is low-risk (basic content writing, data entry)',
      'You have minimal personal assets to protect',
      'Clients are small businesses with limited lawsuit risk',
      'You freelance as a side hustle, not primary income',
      'Budget is extremely tight and you\'re testing viability'
    ],
    needInfoBoxTitle: 'Risk vs. Cost Analysis',
    needInfoBoxText: 'Insurance costs $500-$2,000 annually for most freelancers. A single lawsuit defense can cost $50,000+ even if you win. Consider your personal risk tolerance and the likelihood of claims in your industry when deciding.',

    // Types Section
    typesTitle: 'Types of Freelance Business Insurance',

    // Professional Liability
    proTitle: 'Professional Liability Insurance (Errors & Omissions)',
    proSubtitle: 'Most important for service-based freelancers',
    proCoversTitle: 'What It Covers:',
    proCoversItems: [
      'Claims of professional negligence or mistakes in your work',
      'Failure to deliver services as promised',
      'Missed deadlines causing client financial loss',
      'Copyright infringement or intellectual property disputes',
      'Legal defense costs even if claims are baseless'
    ],
    proWhoTitle: 'Who Needs It:',
    proWhoText: 'Consultants, developers, designers, marketers, writers, accountants, coaches—anyone providing professional services or advice.',
    proCostTitle: 'Cost & Coverage:',
    proCostAmount: '$500-$1,500/year',
    proCoverage: '$1M per claim, $2M aggregate (standard)',
    proDeductible: '$0-$2,500 per claim',
    proExampleTitle: 'Real Example:',
    proExampleText: 'A freelance developer\'s code causes a client\'s e-commerce site to crash during Black Friday sales, resulting in $100K lost revenue. Professional liability insurance covers the claim and legal defense costs.',

    // General Liability
    genTitle: 'General Liability Insurance',
    genSubtitle: 'Covers physical injury and property damage',
    genCoversTitle: 'What It Covers:',
    genCoversItems: [
      'Bodily injury to clients or third parties',
      'Property damage (e.g., spilling coffee on client\'s laptop)',
      'Personal injury claims (libel, slander, defamation)',
      'Advertising injury (copyright infringement in marketing)'
    ],
    genWhoTitle: 'Who Needs It:',
    genWhoText: 'Freelancers who meet clients in person, work in client offices, rent office/coworking space, or have clients visit their home office.',
    genCostTitle: 'Cost & Coverage:',
    genCostAmount: '$300-$600/year',
    genCoverage: '$1M per occurrence, $2M aggregate',
    genNote: 'Less critical for fully remote freelancers',

    // Cyber Liability
    cyberTitle: 'Cyber Liability Insurance',
    cyberSubtitle: 'Protection against data breaches and cyber attacks',
    cyberCoversTitle: 'What It Covers:',
    cyberCoversItems: [
      'Data breach notification costs (legally required in many states)',
      'Credit monitoring for affected individuals',
      'Legal defense against lawsuits related to data breaches',
      'Regulatory fines and penalties (GDPR, CCPA compliance)',
      'Business interruption due to cyber attacks',
      'Ransomware payments (if no other option exists)'
    ],
    cyberWhoTitle: 'Who Needs It:',
    cyberWhoText: 'Any freelancer who handles client data, stores customer information, or accesses client systems. Especially critical for developers, marketers with client data access, and anyone working with PII (Personally Identifiable Information).',
    cyberCostTitle: 'Cost & Coverage:',
    cyberCostAmount: '$500-$1,500/year',
    cyberCoverage: '$1M-$5M',
    cyberNote: 'Increasingly required by enterprise clients and government contractors',
    cyberExampleTitle: 'Real Example:',
    cyberExampleText: 'A freelance VA\'s laptop is stolen containing unencrypted client customer data. Cyber liability insurance covers the $50K cost of required data breach notifications, credit monitoring for 500 affected individuals, and legal defense.',

    // AOV Insurance (renamed for English - Disability Insurance)
    aovTitle: 'Health Insurance',
    aovSubtitle: 'Personal health coverage (not business insurance)',
    aovIntro: 'While technically personal insurance, health coverage is critical for freelancers without employer-provided benefits:',
    aovOptionsTitle: 'Options for Freelancers:',
    aovOptionsItems: [
      'Healthcare.gov (ACA Marketplace): Income-based subsidies available; plans vary by state',
      'Health Sharing Ministries: Lower cost but not true insurance; religious requirements',
      'Professional Associations: Freelancers Union, AIGA, other industry groups offer group rates',
      'Spouse\'s Plan: If married, joining spouse\'s employer plan is often most affordable',
      'Short-Term Plans: Temporary coverage for gaps; doesn\'t cover pre-existing conditions'
    ],
    aovTaxTitle: 'Tax Benefit:',
    aovTaxText: 'Self-employed individuals can deduct 100% of health insurance premiums as an "above-the-line" deduction, reducing adjusted gross income. This can save thousands annually.',
    aovCostAmount: '$300-$800/month',
    aovCoverage: 'Varies by plan and state',
    aovNote: 'Fully tax deductible for self-employed individuals',

    // CTA Box 1
    cta1Title: 'Combine Insurance with Strong Contracts',
    cta1Text: 'Insurance protects you financially, but solid contracts prevent issues in the first place. Learn how to create comprehensive freelance agreements.',
    cta1Button: 'Read Contract Guide',

    // Providers Section
    providersTitle: 'Where to Buy Freelance Insurance',
    providersIntro: 'Top insurance providers for freelancers:',
    providers: [
      {
        name: 'Hiscox',
        description: 'Specializes in small business and freelance insurance. Easy online quotes and purchase. Strong reputation for claims handling.',
        bestFor: 'Professional liability (E&O)',
        cost: '$500-$1,000/year'
      },
      {
        name: 'Next Insurance',
        description: '100% online with instant quotes. Tailored packages for specific freelance professions. No broker fees.',
        bestFor: 'General + Professional liability bundles',
        cost: '$400-$800/year'
      },
      {
        name: 'The Hartford',
        description: 'Established insurer with comprehensive coverage options. May require broker for freelance policies.',
        bestFor: 'Comprehensive multi-policy packages',
        cost: '$600-$1,200/year'
      },
      {
        name: 'Embroker',
        description: 'Tech-focused insurance platform. Good for cyber liability. Customizable coverage options.',
        bestFor: 'Tech freelancers, cyber liability',
        cost: '$500-$1,500/year'
      },
      {
        name: 'Insureon',
        description: 'Insurance marketplace comparing quotes from multiple providers. Helpful for finding best rates.',
        bestFor: 'Price shopping multiple carriers',
        cost: 'Varies by carrier'
      },
      {
        name: 'Professional Association Plans',
        description: 'Industry-specific associations (Freelancers Union, AIGA, etc.) often offer group insurance rates to members.',
        bestFor: 'Industry-specific coverage needs',
        cost: 'Membership fee + premiums'
      }
    ],

    // Cost Comparison
    costTitle: 'Total Insurance Cost Estimates',
    costSubtitle: 'Annual Insurance Budget by Freelancer Type',
    costMinTitle: 'Minimal Coverage (Starting Out)',
    costMinDesc: 'Professional liability only',
    costMinAmount: '$500-$800/year',
    costMinFor: 'Best for: Low-risk creative freelancers with small client base',
    costStdTitle: 'Standard Coverage (Established Freelancer)',
    costStdDesc: 'Professional liability + General liability',
    costStdAmount: '$800-$1,500/year',
    costStdFor: 'Best for: Service providers with in-person client meetings',
    costCompTitle: 'Comprehensive Coverage (Full Protection)',
    costCompDesc: 'Professional + General + Cyber liability',
    costCompAmount: '$1,500-$3,000/year',
    costCompFor: 'Best for: Tech freelancers, consultants, anyone handling client data',
    costPlusTitle: 'Premium Coverage (With Health)',
    costPlusDesc: 'All liability + Health insurance',
    costPlusAmount: '$5,000-$12,000/year',
    costPlusFor: 'Best for: Freelancers with family or mortgage, primary income from freelancing',

    // Tax Section
    taxTitle: 'Insurance as a Tax Deduction',
    taxIntro: 'Good news: All business insurance premiums are fully tax-deductible as business expenses, reducing your taxable income:',
    taxExampleTitle: 'Tax Savings Example',
    taxPremium: 'Annual insurance cost',
    taxBracket: 'Your tax bracket (combined)',
    taxSavings: 'Tax savings (deduction)',
    taxActual: 'True cost after tax savings',
    taxNote: 'Insurance becomes 30% cheaper due to tax deductions. Report on Schedule C (Line 15: Insurance).',

    // CTA Box 2
    cta2Title: 'Maximize Tax Deductions with Proper Records',
    cta2Text: 'Keep accurate financial records to maximize insurance and business expense deductions. Learn everything about freelance taxes and deductions.',
    cta2ButtonTax: 'Read Tax Guide',
    cta2ButtonInvoice: 'Track Income',

    // Decision Section
    decisionTitle: 'Making the Right Insurance Decision',
    decisionItems: [
      {
        title: 'Start with Professional Liability',
        text: 'If you can only afford one policy, make it professional liability (E&O). This covers the most common and expensive claims freelancers face: mistakes, missed deadlines, and professional negligence.'
      },
      {
        title: 'Add Coverage as You Grow',
        text: 'Start minimal and expand coverage as your income and client base grow. When you hit $50K+ annual revenue or land enterprise clients, it\'s time for comprehensive coverage including cyber liability.'
      },
      {
        title: 'Listen to Client Requirements',
        text: 'If multiple clients request proof of insurance, it\'s a clear signal you need coverage. Missing out on projects due to lack of insurance is more expensive than the premiums.'
      },
      {
        title: 'Review Annually',
        text: 'Reassess your insurance needs each year as your business evolves. Changes in income, client types, services offered, or industry risks may require adjusting your coverage.'
      }
    ],

    // Conclusion
    conclusionTitle: 'Protect Your Freelance Business',
    conclusionP1: 'Insurance is an investment in your business\'s longevity and your peace of mind. While the monthly cost may seem like a burden, a single uninsured claim can wipe out years of profits and potentially your entire business.',
    conclusionP2: 'Most freelancers need at minimum professional liability (E&O) insurance, especially as they grow beyond the startup phase. Add general liability if you meet clients in person, and cyber liability if you handle any client data.',
    conclusionP3: 'Remember: Insurance works best alongside other protections like solid contracts, clear communication, and professional work practices. Don\'t rely on insurance alone—combine it with preventive measures for comprehensive business protection.',
    conclusionP4: 'Get quotes from 3-5 providers, compare coverage amounts and exclusions (not just price), and choose a policy that matches your specific risks. The peace of mind is worth the investment.',

    // Related Resources
    relatedTitle: 'Related Resources',
    relatedContract: 'Freelance Contracts 101',
    relatedTax: 'Freelance Tax Guide',
    relatedClients: 'Managing Multiple Clients',
    relatedTools: 'Free Business Tools',
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: content.heroTitle,
    description: content.introText.substring(0, 200),
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
    datePublished: '2026-01-15',
    dateModified: '2026-01-15',
    inLanguage: locale === 'nl' ? 'nl-NL' : 'en-US',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-2xl mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                {content.heroTitle}
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                {content.heroDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/resources/freelance-contracts-101`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-heading font-semibold rounded-lg shadow-lg transition-all hover:shadow-xl"
                >
                  <FileText className="w-5 h-5" />
                  {content.heroButtonContract}
                </Link>
                <Link
                  href={`/${locale}/tools`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-heading font-semibold rounded-lg shadow border-2 border-gray-200 dark:border-gray-700 transition-all"
                >
                  {content.heroButtonTools}
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
                    {content.introText}
                  </p>
                </div>

                {/* Do You Need Insurance */}
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  {content.needTitle}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {content.needIntro}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-2 border-green-200 dark:border-green-700 rounded-xl p-6">
                    <h3 className="text-xl font-heading font-bold text-green-900 dark:text-green-400 mb-4">
                      {content.needYesTitle}
                    </h3>
                    <ul className="space-y-2 text-sm text-green-800 dark:text-green-300">
                      {content.needYesItems.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-2 border-yellow-200 dark:border-yellow-700 rounded-xl p-6">
                    <h3 className="text-xl font-heading font-bold text-yellow-900 dark:text-yellow-400 mb-4">
                      {content.needMaybeTitle}
                    </h3>
                    <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-300">
                      {content.needMaybeItems.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-400 mb-2">{content.needInfoBoxTitle}</h4>
                      <p className="text-blue-800 dark:text-blue-300 text-sm">
                        {content.needInfoBoxText}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Types of Insurance */}
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  {content.typesTitle}
                </h2>

                {/* Professional Liability */}
                <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                        {content.proTitle}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">{content.proSubtitle}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{content.proCoversTitle}</h4>
                      <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                        {content.proCoversItems.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{content.proWhoTitle}</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        {content.proWhoText}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{content.proCostTitle}</h4>
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          <strong>{locale === 'nl' ? 'Typische Kosten' : 'Typical Cost'}:</strong> {content.proCostAmount}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          <strong>{locale === 'nl' ? 'Dekkingsbedragen' : 'Coverage Amounts'}:</strong> {content.proCoverage}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          <strong>{locale === 'nl' ? 'Eigen risico' : 'Deductible'}:</strong> {content.proDeductible}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <p className="text-sm text-green-800 dark:text-green-300">
                      <strong>{content.proExampleTitle}</strong> {content.proExampleText}
                    </p>
                  </div>
                </div>

                {/* General Liability */}
                <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                        {content.genTitle}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">{content.genSubtitle}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{content.genCoversTitle}</h4>
                      <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                        {content.genCoversItems.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{content.genWhoTitle}</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        {content.genWhoText}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{content.genCostTitle}</h4>
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          <strong>{locale === 'nl' ? 'Typische Kosten' : 'Typical Cost'}:</strong> {content.genCostAmount}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          <strong>{locale === 'nl' ? 'Dekkingsbedragen' : 'Coverage Amounts'}:</strong> {content.genCoverage}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          <strong>{locale === 'nl' ? 'Opmerking' : 'Note'}:</strong> {content.genNote}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cyber Liability */}
                <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                        {content.cyberTitle}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">{content.cyberSubtitle}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{content.cyberCoversTitle}</h4>
                      <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                        {content.cyberCoversItems.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{content.cyberWhoTitle}</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        {content.cyberWhoText}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{content.cyberCostTitle}</h4>
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          <strong>{locale === 'nl' ? 'Typische Kosten' : 'Typical Cost'}:</strong> {content.cyberCostAmount}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          <strong>{locale === 'nl' ? 'Dekkingsbedragen' : 'Coverage Amounts'}:</strong> {content.cyberCoverage}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          <strong>{locale === 'nl' ? 'Steeds Vaker Vereist' : 'Increasingly Required'}:</strong> {content.cyberNote}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                    <p className="text-sm text-red-800 dark:text-red-300">
                      <strong>{content.cyberExampleTitle}</strong> {content.cyberExampleText}
                    </p>
                  </div>
                </div>

                {/* AOV / Health Insurance */}
                <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                        {content.aovTitle}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">{content.aovSubtitle}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      {content.aovIntro}
                    </p>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{content.aovOptionsTitle}</h4>
                      <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                        {content.aovOptionsItems.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{content.aovTaxTitle}</h4>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                        <p className="text-sm text-green-800 dark:text-green-300">
                          {content.aovTaxText}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        <strong>{locale === 'nl' ? 'Typische Kosten' : 'Typical Cost'}:</strong> {content.aovCostAmount}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        <strong>{locale === 'nl' ? 'Dekking' : 'Coverage'}:</strong> {content.aovCoverage}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>{locale === 'nl' ? 'Opmerking' : 'Note'}:</strong> {content.aovNote}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Box 1 */}
                <div className="bg-gradient-to-br from-primary to-primary-dark dark:from-primary dark:to-primary-dark rounded-2xl p-8 my-12 text-center shadow-xl">
                  <FileText className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">
                    {content.cta1Title}
                  </h3>
                  <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                    {content.cta1Text}
                  </p>
                  <Link
                    href={`/${locale}/resources/freelance-contracts-101`}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary hover:bg-gray-100 font-heading font-semibold rounded-lg shadow-lg transition-all"
                  >
                    <FileText className="w-5 h-5" />
                    {content.cta1Button}
                  </Link>
                </div>

                {/* Insurance Providers */}
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  {content.providersTitle}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {content.providers.map((provider, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
                      <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">{provider.name}</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                        {provider.description}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        <strong>{locale === 'nl' ? 'Best voor' : 'Best for'}:</strong> {provider.bestFor}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        <strong>{locale === 'nl' ? 'Typische kosten' : 'Typical cost'}:</strong> {provider.cost}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Cost Comparison */}
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  {content.costTitle}
                </h2>

                <div className="bg-gradient-to-br from-accent/5 to-primary/5 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 mb-8">
                  <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                    {content.costSubtitle}
                  </h3>

                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{content.costMinTitle}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{content.costMinDesc}</p>
                      <p className="text-3xl font-bold text-primary mb-2">{content.costMinAmount}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{content.costMinFor}</p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{content.costStdTitle}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{content.costStdDesc}</p>
                      <p className="text-3xl font-bold text-primary mb-2">{content.costStdAmount}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{content.costStdFor}</p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{content.costCompTitle}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{content.costCompDesc}</p>
                      <p className="text-3xl font-bold text-primary mb-2">{content.costCompAmount}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{content.costCompFor}</p>
                    </div>

                    {locale === 'nl' && (
                      <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{content.costPlusTitle}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{content.costPlusDesc}</p>
                        <p className="text-3xl font-bold text-primary mb-2">{content.costPlusAmount}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{content.costPlusFor}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tax Deductions */}
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  {content.taxTitle}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {content.taxIntro}
                </p>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-8 mb-8">
                  <h3 className="text-xl font-heading font-bold text-green-900 dark:text-green-400 mb-4">
                    {content.taxExampleTitle}
                  </h3>
                  <div className="space-y-3 text-green-800 dark:text-green-300">
                    <div className="flex justify-between items-center pb-2 border-b border-green-200 dark:border-green-800">
                      <span>{content.taxPremium}</span>
                      <span className="font-semibold">{locale === 'nl' ? '€1.350' : '$1,500'}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-green-200 dark:border-green-800">
                      <span>{content.taxBracket}</span>
                      <span className="font-semibold">30%</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-green-200 dark:border-green-800">
                      <span>{content.taxSavings}</span>
                      <span className="font-semibold text-accent">{locale === 'nl' ? '-€405' : '-$450'}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg pt-2">
                      <span className="font-bold">{content.taxActual}</span>
                      <span className="font-bold text-accent">{locale === 'nl' ? '€945' : '$1,050'}</span>
                    </div>
                  </div>
                  <p className="text-sm text-green-800 dark:text-green-300 mt-4">
                    {content.taxNote}
                  </p>
                </div>

                {/* CTA Box 2 */}
                <div className="bg-gradient-to-br from-accent/10 to-primary/10 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 my-12 text-center border-2 border-accent/20 dark:border-gray-700">
                  <DollarSign className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-3">
                    {content.cta2Title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                    {content.cta2Text}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href={`/${locale}/resources/freelance-tax-guide`}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-white font-heading font-semibold rounded-lg shadow-lg transition-all"
                    >
                      <CheckCircle className="w-5 h-5" />
                      {content.cta2ButtonTax}
                    </Link>
                    <Link
                      href={`/${locale}/tools/invoice-generator`}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-heading font-semibold rounded-lg shadow border-2 border-gray-200 dark:border-gray-700 transition-all"
                    >
                      {content.cta2ButtonInvoice}
                    </Link>
                  </div>
                </div>

                {/* Making the Decision */}
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  {content.decisionTitle}
                </h2>

                <div className="space-y-6 mb-8">
                  {content.decisionItems.map((item, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 border-l-4 border-accent p-6 rounded-r-lg">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Conclusion */}
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  {content.conclusionTitle}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {content.conclusionP1}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {content.conclusionP2}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {content.conclusionP3}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {content.conclusionP4}
                </p>

                {/* Internal Links */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                    {content.relatedTitle}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                      href={`/${locale}/resources/freelance-contracts-101`}
                      className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <FileText className="w-6 h-6 text-primary" />
                      <span className="font-semibold text-gray-900 dark:text-white">{content.relatedContract}</span>
                    </Link>
                    <Link
                      href={`/${locale}/resources/freelance-tax-guide`}
                      className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <DollarSign className="w-6 h-6 text-primary" />
                      <span className="font-semibold text-gray-900 dark:text-white">{content.relatedTax}</span>
                    </Link>
                    <Link
                      href={`/${locale}/resources/managing-multiple-clients`}
                      className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <CheckCircle className="w-6 h-6 text-primary" />
                      <span className="font-semibold text-gray-900 dark:text-white">{content.relatedClients}</span>
                    </Link>
                    <Link
                      href={`/${locale}/tools`}
                      className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Shield className="w-6 h-6 text-primary" />
                      <span className="font-semibold text-gray-900 dark:text-white">{content.relatedTools}</span>
                    </Link>
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
