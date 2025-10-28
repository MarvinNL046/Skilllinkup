import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AdWidget } from '@/components/AdWidget';
import { PenTool, BookOpen, Zap, CheckCircle, ArrowRight, Star, TrendingUp, Award, FileText } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  if (locale === 'nl') {
    return {
      title: 'Beste Platformen voor Freelance Schrijvers & Content Creators',
      description: 'Ontdek top freelance platforms voor schrijvers en contentmakers in 2025. Vergelijk tarieven, opdrachttypes en vind platformen die kwaliteit waarderen en eerlijk betalen.',
      openGraph: {
        title: 'Beste Platformen voor Freelance Schrijvers 2025',
        description: 'Vind de beste schrijfplatformen die jouw expertise waarderen. Vergelijk tarieven en bouw een bloeiende schrijfcarrière.',
        type: 'article',
        locale: 'nl_NL',
      },
    };
  }

  return {
    title: 'Best Platforms for Freelance Writers & Content Creators',
    description: 'Discover top freelance writing platforms for content creators in 2025. Compare rates, content types, and find marketplaces that value quality writing and pay fairly.',
    keywords: 'freelance writing platforms, content writing jobs, blog writing marketplace, copywriting platforms',
    openGraph: {
      title: 'Best Platforms for Freelance Writers & Content Creators 2025',
      description: 'Find the best marketplaces for freelance writers. Compare rates, project types, and build a thriving writing career.',
      type: 'article',
    },
  };
}

export default async function BestPlatformsFreelanceWritersContentCreators({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const content = locale === 'nl' ? {
    hero: {
      badge: 'Schrijfopdrachten',
      h1: 'Beste Platformen voor Freelance Schrijvers en Content Creators',
      intro: 'Vind premium schrijfplatformen die eerlijk betalen, jouw expertise respecteren en je verbinden met klanten die kwaliteitscontent waarderen. Vergelijk tarieven, opdrachttypes en bouw een duurzame schrijfcarrière.',
      ctaPrimary: 'Bekijk Alle Platformen',
      ctaSecondary: 'Bereken Je Tarief',
    },
    introduction: {
      title: 'Waarom de Juiste Platform Keuze Belangrijk Is',
      content: [
        'De freelance schrijfmarkt in 2025 biedt ongekende kansen voor getalenteerde schrijvers en contentmakers. Niet alle platformen waarderen kwaliteitsschrijven echter gelijk. Sommige betalen centjes per woord en behandelen schrijvers als contentmachines. Andere herkennen schrijven als strategische bedrijfsinvestering en compenseren eerlijk. Jouw platformkeuze bepaalt niet alleen je inkomen, maar ook je carrière traject, creatieve vervulling en professionele groei.',
        'Deze uitgebreide gids onderzoekt de beste freelance schrijfplatformen voor verschillende niches: blogcontent, copywriting, technisch schrijven, journalistiek en creatief schrijven. We vergelijken betalingsstructuren (per woord, per project, retainer), redactionele ondersteuning, eigendomsrechten en de kwaliteit van klanten die je kunt verwachten.',
      ],
      stats: [
        { label: '300+ Platformen', value: 'Geanalyseerd voor schrijfopdrachten' },
        { label: '€0,10-€2/woord', value: 'Gemiddeld tarief in 2025' },
        { label: 'Kwaliteit Eerst', value: 'Premium platformen waarderen expertise' },
      ],
    },
    sections: [
      {
        title: 'Wat Maakt een Platform Goed voor Freelance Schrijvers?',
        items: [
          {
            title: 'Eerlijke Vergoeding en Transparante Tarieven',
            content: 'De beste schrijfplatformen bieden duidelijke, competitieve betalingsstructuren. Zoek naar minimumtarieven boven €0,10/woord voor algemene content, €0,25-€1,00+/woord voor gespecialiseerde niches, transparante betalingsvoorwaarden en snelle betalingsverwerking (wekelijks of tweewekelijks). Vermijd platformen die schrijvers uitbuiten met hongerlonen.',
          },
          {
            title: 'Redactionele Ondersteuning en Kwaliteitsnormen',
            content: 'Premium platformen investeren in redactionele infrastructuur die schrijverssucces ondersteunt. Dit omvat duidelijke content briefs met onderzoekslinks en SEO richtlijnen, constructieve feedback die je vak verbetert, redelijke revisiebeleid (typisch 1-2 rondes), en stijlgidsen voor consistentie. Sterke redactionele ondersteuning helpt je beter werk af te leveren.',
          },
          {
            title: 'Auteursrechten en Naamsvermelding',
            content: 'Begrijp eigendomsrechten voordat je werk accepteert. Sommige platformen vereisen dat schrijvers alle rechten overdragen (work-for-hire), terwijl anderen portfolio gebruik of bylines toestaan. Als je alle rechten overdraagt, moeten tarieven dit verlies van toekomstig verdienpotentieel weerspiegelen. Verduidelijk of je werk in je portfolio kunt tonen.',
          },
          {
            title: 'Vast Werk en Klantrelaties',
            content: 'De beste platformen faciliteren doorlopende relaties in plaats van eenmalige projecten. Zoek naar platformen met retainer mogelijkheden, klant favoriet systemen voor herhalingswerk, content series en pakketdeals, en directe communicatie met klanten. Vaste klanten verminderen de feast-or-famine cyclus.',
          },
        ],
      },
      {
        title: 'Soorten Freelance Schrijfplatformen',
        items: [
          {
            title: 'Premium Content Netwerken',
            content: 'Deze elite platformen screenen schrijvers zorgvuldig en matchen ze met hoogwaardige klanten die bereid zijn premium tarieven te betalen. Ze vereisen doorgaans schrijfvoorbeelden, vakkennis en bewezen ervaring. Tarieven variëren van €0,25-€2,00+ per woord afhankelijk van specialisatie.',
            bestFor: 'Ervaren schrijvers met 3+ jaar professionele ervaring, vakexperts, journalisten en specialisten die premium tarieven zoeken voor hoogwaardige content.',
          },
          {
            title: 'Content Mills en Volume Platformen',
            content: 'Hoogvolume platformen met consistent werk tegen lagere tarieven (€0,01-€0,10/woord). Ze bieden stabiel inkomen voor nieuwe schrijvers die ervaring opbouwen, maar leiden zelden tot carrière vooruitgang. Content normen zijn doorgaans lager, gericht op kwantiteit boven kwaliteit.',
            bestFor: 'Beginnende schrijvers die portfolio\'s opbouwen, degenen die direct inkomen nodig hebben, of schrijvers die snelheid en consistentie ontwikkelen. Behandel als springplank, niet bestemming.',
          },
          {
            title: 'Niche Schrijfplatformen',
            content: 'Gespecialiseerde platformen gericht op specifieke contenttypes of industrieën: technisch schrijven, gezondheidszorg/medische content, financiën en juridisch schrijven, SaaS en technologie content, of creatief en literair schrijven. Deze platformen verbinden specialisten met klanten die specifieke expertise zoeken.',
            bestFor: 'Vakexperts, schrijvers met professionele achtergronden in specifieke industrieën, en degenen die gespecialiseerde kennis willen inzetten voor premium tarieven.',
          },
          {
            title: 'Publicatie en Magazine Platformen',
            content: 'Digitale publicatienetwerken die journalisten en schrijvers verbinden met online magazines, nieuwsuitgevers en content publicaties. Ze bieden doorgaans bylines, redactionele ondersteuning en hogere normen dan algemene content platformen. Betaling varieert sterk (€0,10-€1,00+/woord).',
            bestFor: 'Journalisten, feature schrijvers, en degenen die bylines en reputatie prioriteit geven boven maximaal inkomen. Perfect voor het opbouwen van een herkenbaar auteursmerk.',
          },
        ],
      },
    ],
    rates: {
      title: 'Freelance Schrijftarieven in 2025 Begrijpen',
      intro: 'Schrijftarieven variëren dramatisch op basis van contenttype, specialisatie, klantindustrie en platform. Markttarieven begrijpen helpt je competitief te prijzen terwijl je eerlijke compensatie voor je expertise garandeert.',
      benchmarks: [
        { type: 'Blogcontent (Algemeen)', rate: '€0,05-€0,25/woord of €50-€250 per 1000-woord post' },
        { type: 'SEO Content', rate: '€0,10-€0,30/woord met keyword onderzoek en optimalisatie' },
        { type: 'Copywriting', rate: '€0,25-€1,00+/woord voor verkooppagina\'s, landingspagina\'s, email sequences' },
        { type: 'Technisch Schrijven', rate: '€0,30-€1,50/woord voor documentatie, whitepapers, case studies' },
        { type: 'Journalistiek', rate: '€0,25-€2,00/woord afhankelijk van publicatie prestige en onderzoeksdiepte' },
        { type: 'Gespecialiseerde Niches', rate: 'Financiën, gezondheidszorg, juridische content eisen 50-100% premies' },
      ],
    },
    success: {
      title: 'Een Succesvolle Freelance Schrijfcarrière Opbouwen',
      strategies: [
        {
          title: 'Ontwikkel een Winstgevende Schrijfniche',
          content: 'Generalistische schrijvers concurreren met miljoenen wereldwijd. Niche specialisten eisen premium tarieven en trekken ideale klanten aan. Kies een specialisatie op basis van professionele achtergrond of opleiding, persoonlijke interesses die je diep kunt onderzoeken, marktvraag en tarief potentieel.',
        },
        {
          title: 'Bouw een Portfolio dat Jouw Expertise Verkoopt',
          content: 'Je portfolio toont schrijfkwaliteit en vakkennis. Neem 8-12 beste voorbeelden op die range binnen je niche tonen, gepubliceerde stukken met bylines waar mogelijk, case studies die klantuitdagingen en resultaten uitleggen, en testimonials van tevreden klanten.',
        },
        {
          title: 'Beheers de Kunst van Pitchen en Voorstellen',
          content: 'Winnende voorstellen tonen begrip van klantbehoeften, je relevante ervaring en hoe je waarde levert. Verwijs naar specifieke details uit de vacaturepost, leg je relevante expertise uit, geef relevante voorbeelden direct gerelateerd aan het project.',
        },
        {
          title: 'Stap Over van Uurloon naar Waardegebaseerde Prijzen',
          content: 'Ervaren schrijvers verschuiven van uur- of per-woord tarieven naar waardegebaseerde projectprijzen. Deze aanpak compenseert je voor expertise en resultaten in plaats van geïnvesteerde tijd. Een ervaren schrijver die een project in 3 uur voltooit, zou niet minder moeten verdienen dan een tragere schrijver die 10 uur neemt.',
        },
      ],
    },
    mistakes: {
      title: 'Veelgemaakte Fouten van Freelance Schrijvers',
      items: [
        {
          title: 'Hongerlonen Accepteren voor "Ervaring"',
          content: 'Veel nieuwe schrijvers accepteren €10-20 voor 1000-woord artikelen, gelovend dat exposure of ervaring uitbuiting rechtvaardigt. Dit onderwaardeert schrijven professioneel en maakt duurzame carrières onmogelijk. Begin met eerlijke tarieven en verbeter van daaruit.',
        },
        {
          title: 'Uitsluitend op Prijs Concurreren',
          content: 'Racen naar de bodem op prijs trekt nachtmerrie klanten aan die onbeperkte revisies, onrealistische deadlines eisen en je tijd niet respecteren. Concurreer in plaats daarvan op expertise, kwaliteit en betrouwbaarheid. Klanten die premium tarieven betalen zijn doorgaans gemakkelijker om mee te werken.',
        },
        {
          title: 'Portfolio en Professionele Ontwikkeling Verwaarlozen',
          content: 'Veel schrijvers blijven vast zitten in laag betaalde platformen omdat ze nooit portfolio\'s, gespecialiseerde expertise of professionele reputaties ontwikkelen die carrière vooruitgang mogelijk maken. Investeer regelmatig tijd in het creëren van portfolio stukken en het ontwikkelen van vakkennis.',
        },
        {
          title: 'Auteursrechten en Gebruiksvoorwaarden Negeren',
          content: 'Veel schrijvers geven alle rechten over zonder de implicaties te begrijpen. Als je werk niet in je portfolio kunt gebruiken of klanten je content onbeperkt kunnen doorverkopen, heb je aanzienlijke waarde verloren. Verduidelijk altijd eigendomsvoorwaarden.',
        },
      ],
    },
    cta: {
      final: {
        title: 'Start Vandaag Je Freelance Schrijfcarrière',
        description: 'Vergelijk schrijfplatformen, lees reviews van ervaren schrijvers in jouw niche, bereken je optimale tarieven, en vind platformen die kwaliteitscontent waarderen en schrijvers eerlijk betalen.',
        primaryButton: 'Bekijk Alle Platformen per Categorie',
        secondaryButton: 'Bereken Je Niche Tarief',
      },
    },
    related: {
      title: 'Gerelateerde Bronnen voor Freelance Schrijvers',
      resources: [
        { title: 'Schrijfplatformen', description: 'Bekijk platformen gespecialiseerd voor schrijvers en content creators' },
        { title: 'Schrijver Reviews', description: 'Lees reviews van schrijvers in jouw specialisatie' },
        { title: 'Tarief Calculator', description: 'Bereken eerlijke tarieven voor je schrijfdiensten' },
      ],
    },
  } : {
    hero: {
      badge: 'Writing Opportunities',
      h1: 'Best Platforms for Freelance Writers and Content Creators',
      intro: 'Find premium freelance writing platforms that pay fairly, respect your expertise, and connect you with clients who value quality content. Compare rates, content types, and build a sustainable writing career.',
      ctaPrimary: 'Browse All Platforms',
      ctaSecondary: 'Calculate Your Rate',
    },
    introduction: {
      title: 'Why Choosing the Right Writing Platform Matters',
      content: [
        'The freelance writing landscape in 2025 offers unprecedented opportunities for talented writers and content creators. However, not all platforms value quality writing equally. Some pay pennies per word, treating writers as content machines. Others recognize writing as strategic business investment and compensate fairly. Your platform choice determines not just your income, but your career trajectory, creative fulfillment, and professional growth.',
        'This comprehensive guide examines the best freelance writing platforms across multiple niches: blog content, copywriting, technical writing, journalism, and creative writing. We\'ll compare payment structures (per word, per project, retainer), editorial support, content ownership rights, and the quality of clients you can expect.',
      ],
      stats: [
        { label: '300+ Platforms', value: 'Analyzed for writing opportunities' },
        { label: '$0.10-$2/word', value: 'Typical rate range in 2025' },
        { label: 'Quality First', value: 'Premium platforms value expertise' },
      ],
    },
    sections: [
      {
        title: 'What Makes a Platform Great for Freelance Writers?',
        items: [
          {
            title: 'Fair Compensation and Transparent Rates',
            content: 'The best writing platforms offer clear, competitive payment structures. Look for minimum rates above $0.10/word for general content, $0.25-$1.00+/word for specialized niches, transparent payment terms with milestone options, and prompt payment processing (weekly or bi-weekly). Avoid platforms that exploit writers with poverty wages.',
          },
          {
            title: 'Editorial Support and Quality Standards',
            content: 'Premium platforms invest in editorial infrastructure that supports writer success. This includes clear content briefs with research links and SEO guidelines, constructive feedback that improves your craft, reasonable revision policies (typically 1-2 rounds), and style guides ensuring consistency.',
          },
          {
            title: 'Content Rights and Attribution',
            content: 'Understand content ownership before accepting work. Some platforms require writers to transfer all rights (work-for-hire), while others allow portfolio use or bylines. Premium journalism platforms often provide bylines boosting your credibility. If surrendering all rights, rates should reflect this loss.',
          },
          {
            title: 'Steady Work and Client Relationships',
            content: 'The best platforms facilitate ongoing relationships rather than one-off projects. Look for platforms offering retainer opportunities, client favoriting systems that build repeat business, content series and package deals, and direct communication with clients. Steady clients reduce the feast-or-famine cycle.',
          },
        ],
      },
      {
        title: 'Types of Freelance Writing Platforms',
        items: [
          {
            title: 'Premium Content Networks',
            content: 'These elite platforms carefully vet writers and match them with high-quality clients willing to pay premium rates for expertise. They typically require writing samples, subject matter expertise, and proven experience. Rates range from $0.25-$2.00+ per word depending on specialization.',
            bestFor: 'Experienced writers with 3+ years professional experience, subject matter experts, journalists, and specialists seeking premium rates for high-quality content.',
          },
          {
            title: 'Content Mills and Volume Platforms',
            content: 'High-volume platforms offering consistent work at lower rates ($0.01-$0.10/word). They provide steady income for new writers building experience but rarely lead to career advancement. Content standards are typically lower, focusing on quantity over quality.',
            bestFor: 'Entry-level writers building portfolios, those needing immediate income, or writers developing speed and consistency. Treat as stepping stone, not destination.',
          },
          {
            title: 'Niche Writing Marketplaces',
            content: 'Specialized platforms focusing on specific content types or industries: technical writing, healthcare/medical content, finance and legal writing, SaaS and technology content, or creative and literary writing. These platforms connect specialists with clients seeking specific expertise.',
            bestFor: 'Subject matter experts, writers with professional backgrounds in specific industries, and those who want to leverage specialized knowledge for premium rates.',
          },
          {
            title: 'Publication and Magazine Platforms',
            content: 'Digital publication networks connecting journalists and writers with online magazines, news outlets, and content publications. They typically offer bylines, editorial support, and higher standards than general content platforms. Payment varies widely ($0.10-$1.00+/word).',
            bestFor: 'Journalists, feature writers, and those prioritizing bylines and reputation over maximum income. Perfect for building a recognizable author brand.',
          },
        ],
      },
    ],
    rates: {
      title: 'Understanding Freelance Writing Rates in 2025',
      intro: 'Writing rates vary dramatically based on content type, specialization, client industry, and platform. Understanding market rates helps you price competitively while ensuring fair compensation for your expertise.',
      benchmarks: [
        { type: 'Blog Content (General)', rate: '$0.05-$0.25/word or $50-$250 per 1000-word post' },
        { type: 'SEO Content', rate: '$0.10-$0.30/word with keyword research and optimization' },
        { type: 'Copywriting', rate: '$0.25-$1.00+/word for sales pages, landing pages, email sequences' },
        { type: 'Technical Writing', rate: '$0.30-$1.50/word for documentation, white papers, case studies' },
        { type: 'Journalism', rate: '$0.25-$2.00/word depending on publication prestige and research depth' },
        { type: 'Specialized Niches', rate: 'Finance, healthcare, legal content command 50-100% premiums' },
      ],
    },
    success: {
      title: 'Building a Successful Freelance Writing Career',
      strategies: [
        {
          title: 'Develop a Profitable Writing Niche',
          content: 'Generalist writers compete with millions globally. Niche specialists command premium rates and attract ideal clients. Choose a specialization based on professional background or education, personal interests you can research deeply, market demand and rate potential.',
        },
        {
          title: 'Build a Portfolio That Sells Your Expertise',
          content: 'Your portfolio demonstrates writing quality and subject matter expertise. Include 8-12 best samples showing range within your niche, published pieces with bylines when possible, case studies explaining client challenges and results, and testimonials from satisfied clients.',
        },
        {
          title: 'Master the Art of Pitching and Proposals',
          content: 'Winning proposals demonstrate understanding of the client\'s needs, your relevant experience, and how you\'ll deliver value. Reference specific details from the job posting, explain your relevant expertise and unique perspective, provide relevant samples directly related to the project.',
        },
        {
          title: 'Transition from Hourly to Value-Based Pricing',
          content: 'Experienced writers shift from hourly or per-word rates to value-based project pricing. This approach compensates you for expertise and results rather than time invested. A seasoned writer completing a project in 3 hours shouldn\'t earn less than a slower writer taking 10 hours.',
        },
      ],
    },
    mistakes: {
      title: 'Common Mistakes Freelance Writers Make',
      items: [
        {
          title: 'Accepting Poverty Wages for "Experience"',
          content: 'Many new writers accept $10-20 for 1000-word articles, believing exposure or experience justifies exploitation. This undervalues writing professionally and makes sustainable careers impossible. Start at fair rates and improve from there—never work for poverty wages.',
        },
        {
          title: 'Competing Solely on Price',
          content: 'Racing to the bottom on price attracts nightmare clients who demand unlimited revisions, unrealistic turnarounds, and don\'t respect your time. Instead, compete on expertise, quality, and reliability. Clients paying premium rates are typically easier to work with.',
        },
        {
          title: 'Neglecting Portfolio and Professional Development',
          content: 'Many writers stay trapped in low-paying platforms because they never develop portfolios, specialized expertise, or professional reputations enabling career advancement. Invest time regularly in creating portfolio pieces and developing subject matter expertise.',
        },
        {
          title: 'Ignoring Content Rights and Usage Terms',
          content: 'Many writers surrender all rights without understanding implications. If you can\'t use work in your portfolio or clients can resell your content indefinitely, you\'ve lost significant value. Always clarify ownership terms.',
        },
      ],
    },
    cta: {
      final: {
        title: 'Start Your Freelance Writing Career Today',
        description: 'Compare writing platforms, read reviews from experienced writers in your niche, calculate your optimal rates, and find marketplaces that value quality content and pay writers fairly.',
        primaryButton: 'Browse All Platforms by Category',
        secondaryButton: 'Calculate Your Niche Rate',
      },
    },
    related: {
      title: 'Related Resources for Freelance Writers',
      resources: [
        { title: 'Writing Platforms', description: 'Browse platforms specialized for writers and content creators' },
        { title: 'Writer Reviews', description: 'Read reviews from writers in your specialization' },
        { title: 'Rate Calculator', description: 'Calculate fair rates for your writing services' },
      ],
    },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: locale === 'nl' ? "Beste Platformen voor Freelance Schrijvers en Content Creators" : "Best Platforms for Freelance Writers and Content Creators",
    description: locale === 'nl'
      ? "Ontdek top freelance platforms voor schrijvers en contentmakers in 2025. Vergelijk tarieven en vind platformen die kwaliteit waarderen."
      : "Discover top freelance writing platforms for content creators in 2025. Compare rates, content types, and find marketplaces that value quality writing.",
    inLanguage: locale === 'nl' ? 'nl' : 'en',
    author: {
      "@type": "Organization",
      "name": "SkillLinkup"
    },
    publisher: {
      "@type": "Organization",
      "name": "SkillLinkup"
    },
    datePublished: "2025-01-01",
    dateModified: "2025-01-01"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] text-white py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <PenTool className="w-7 h-7 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {content.hero.h1}
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                {content.hero.intro}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  {content.hero.ctaPrimary}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href={`/${locale}/tools/rate-calculator`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20"
                >
                  {content.hero.ctaSecondary}
                  <Zap className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">

            {/* Introduction */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {content.introduction.title}
              </h2>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                {content.introduction.content.map((paragraph, idx) => (
                  <p key={idx} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                  {content.introduction.stats.map((stat, idx) => (
                    <div key={idx} className={`bg-gradient-to-br ${
                      idx === 0 ? 'from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 border-primary/20' :
                      idx === 1 ? 'from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 border-accent/20' :
                      'from-[#1e1541]/10 to-[#1e1541]/5 dark:from-[#1e1541]/30 dark:to-[#1e1541]/20 border-[#1e1541]/20'
                    } rounded-xl p-6 border`}>
                      {idx === 0 ? <PenTool className="w-10 h-10 text-primary mb-3" /> :
                       idx === 1 ? <TrendingUp className="w-10 h-10 text-accent mb-3" /> :
                       <Star className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />}
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">{stat.label}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sections */}
            {content.sections.map((section, sectionIdx) => (
              <div key={sectionIdx} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  {section.title}
                </h2>

                <div className="space-y-6">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx}>
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 ${
                          itemIdx % 4 === 0 ? 'bg-primary/10 dark:bg-primary/20' :
                          itemIdx % 4 === 1 ? 'bg-accent/10 dark:bg-accent/20' :
                          itemIdx % 4 === 2 ? 'bg-[#1e1541]/10 dark:bg-[#1e1541]/30' :
                          'bg-primary/10 dark:bg-primary/20'
                        } rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <CheckCircle className={`w-6 h-6 ${
                            itemIdx % 4 === 0 ? 'text-primary' :
                            itemIdx % 4 === 1 ? 'text-accent' :
                            itemIdx % 4 === 2 ? 'text-[#1e1541] dark:text-white' :
                            'text-primary'
                          }`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {item.content}
                          </p>
                        </div>
                      </div>
                      {item.bestFor && (
                        <div className={`${
                          itemIdx % 4 === 0 ? 'bg-primary/5 dark:bg-primary/10 border-primary/20' :
                          itemIdx % 4 === 1 ? 'bg-accent/5 dark:bg-accent/10 border-accent/20' :
                          itemIdx % 4 === 2 ? 'bg-[#1e1541]/5 dark:bg-[#1e1541]/20 border-[#1e1541]/20' :
                          'bg-primary/5 dark:bg-primary/10 border-primary/20'
                        } rounded-xl p-6 border`}>
                          <p className="font-semibold text-gray-900 dark:text-white mb-2">
                            {locale === 'nl' ? 'Beste Voor:' : 'Best For:'}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">{item.bestFor}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Ad Widget */}
            <div className="mb-12">
              <AdWidget placement="blog_sidebar" />
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
              <div className="max-w-3xl mx-auto">
                <PenTool className="w-16 h-16 text-white mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {content.cta.final.title}
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  {content.cta.final.description}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href={`/${locale}/platforms`}
                    className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg"
                  >
                    {content.cta.final.primaryButton}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href={`/${locale}/tools/rate-calculator`}
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20"
                  >
                    {content.cta.final.secondaryButton}
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
                {content.related.resources.map((resource, idx) => (
                  <Link
                    key={idx}
                    href={`/${locale}/${idx === 0 ? 'platforms' : idx === 1 ? 'reviews' : 'tools/rate-calculator'}`}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group"
                  >
                    {idx === 0 ? <PenTool className="w-10 h-10 text-primary mb-3" /> :
                     idx === 1 ? <Star className="w-10 h-10 text-accent mb-3" /> :
                     <Zap className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />}
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {resource.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
