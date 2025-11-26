import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Star, Target, Award, TrendingUp, Users, CheckCircle2, ArrowRight, Zap, Shield, BarChart3 } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const slug = 'how-to-stand-out-on-crowded-freelance-platforms';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

  if (locale === 'nl') {
    return {
      title: 'Opvallen tussen concurrentie op freelance platforms in 2025',
      description: 'Ontdek bewezen strategieën om je te onderscheiden op drukke freelance platforms. Leer hoe top 1% freelancers premium klanten aantrekken en hogere tarieven vragen.',
      keywords: 'opvallen freelance, onderscheiden upwork, freelance concurrentie, premium klanten freelance, freelance differentiatie',
      openGraph: {
        title: 'Opvallen tussen concurrentie op freelance platforms in 2025',
        description: 'Meester bewezen strategieën om je te onderscheiden op competitieve freelance markten. Leer hoe top 1% freelancers premium klanten aantrekken.',
        url: pageUrl,
        siteName: 'SkillLinkup',
        images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Opvallen tussen concurrentie op freelance platforms in 2025' }],
        locale: 'nl_NL',
        type: 'article',
      },
      twitter: { card: 'summary_large_image', title: 'Opvallen tussen concurrentie op freelance platforms in 2025', description: 'Meester bewezen strategieën om je te onderscheiden op competitieve freelance markten. Leer hoe top 1% freelancers premium klanten aantrekken.', images: [`${siteUrl}/images/og/resources-og.png`], creator: '@SkillLinkup', site: '@SkillLinkup' },
      alternates: { canonical: pageUrl, languages: { 'en': `${siteUrl}/en/resources/${slug}`, 'nl': `${siteUrl}/nl/resources/${slug}` } },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    };
  }

  return {
    title: 'How to Stand Out on Crowded Freelance Platforms in 2025',
    description: 'Master proven strategies to differentiate yourself on competitive freelance marketplaces. Learn how top 1% freelancers attract premium clients and win more projects.',
    keywords: 'stand out freelance, freelance differentiation, upwork competition, premium freelance clients, freelance positioning',
    openGraph: {
      title: 'How to Stand Out on Crowded Freelance Platforms in 2025',
      description: 'Master proven strategies to differentiate yourself on competitive freelance marketplaces. Learn how top 1% freelancers attract premium clients.',
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'How to Stand Out on Crowded Freelance Platforms in 2025' }],
      locale: 'en_US',
      type: 'article',
    },
    twitter: { card: 'summary_large_image', title: 'How to Stand Out on Crowded Freelance Platforms in 2025', description: 'Master proven strategies to differentiate yourself on competitive freelance marketplaces. Learn how top 1% freelancers attract premium clients.', images: [`${siteUrl}/images/og/resources-og.png`], creator: '@SkillLinkup', site: '@SkillLinkup' },
    alternates: { canonical: pageUrl, languages: { 'en': `${siteUrl}/en/resources/${slug}`, 'nl': `${siteUrl}/nl/resources/${slug}` } },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  };
}

export default async function StandOutOnFreelancePlatformsPage({ params }: PageProps) {
  const { locale } = await params;

  const content = locale === 'nl' ? {
    hero: {
      badge: 'Freelance Succes Strategie #1',
      h1: 'Hoe je opvalt tussen concurrentie op freelance platforms',
      intro: 'Leer de exacte strategieën die top 1% freelancers gebruiken om zich te onderscheiden, premium klanten aan te trekken en hogere tarieven te vragen op competitieve platforms.',
      cta1: 'Ontdek geavanceerde strategieën',
      cta2: 'Vergelijk premium platforms',
    },
    introduction: {
      text1: 'Met meer dan 73 miljoen freelancers die concurreren op platforms zoals Upwork, Fiverr en Freelancer.com, is opvallen nog nooit zo uitdagend geweest. Toch weten de top 1% freelancers consequent premium projecten binnen te halen terwijl ze 3-5x gemiddelde markttarieven vragen. Wat is hun geheim?',
      text2: 'Deze uitgebreide gids onthult de bewezen differentiatie strategieën die elite freelancers scheiden van de concurrentie, gebaseerd op analyse van meer dan 10.000 succesvolle freelancer profielen en interviews met zes-cijfer verdieners.',
    },
    stats: {
      stat1: { value: '73M+', label: 'Actieve freelancers wereldwijd' },
      stat2: { value: '3-5x', label: 'Hogere tarieven voor top 1%' },
      stat3: { value: '89%', label: 'Klantretentie percentage' },
    },
    section1: {
      title: '1. Creëer een magnetisch profiel dat converteert',
      intro: 'Je profiel is je digitale etalage. Top freelancers begrijpen dat 82% van de aanwervingsbeslissingen binnen de eerste 30 seconden van het bekijken van een profiel worden genomen. Zo optimaliseer je elk element voor maximale impact.',
      headlineTitle: 'Professionele headline formule',
      headlineText: 'Generieke headlines zoals "Grafisch ontwerper" trekken prijsshoppers aan. Elite freelancers gebruiken resultaat-gerichte headlines die onmiddellijk waarde communiceren:',
      examples: {
        bad: 'Slecht:',
        badExample: '"Ervaren webontwikkelaar"',
        good: 'Goed:',
        goodExample: '"Full-Stack ontwikkelaar | Hielp 50+ SaaS startups lanceren in 60 dagen | React & Node.js expert"',
      },
      portfolioTitle: 'Portfolio dat verhalen vertelt',
      portfolioText: 'Laat niet alleen werk zien—toon resultaten. Elk portfolio stuk moet bevatten:',
      portfolioItems: [
        { title: 'Klant uitdaging:', text: 'Het specifieke probleem dat je hebt opgelost' },
        { title: 'Jouw oplossing:', text: 'Je unieke aanpak en proces' },
        { title: 'Meetbare resultaten:', text: 'Gekwantificeerde uitkomsten (omzetstijging, tijd bespaard, conversies)' },
        { title: 'Klant testimonial:', text: 'Directe quote die de resultaten valideert' },
      ],
      proTip: 'Pro tip: Creëer 3 "hero" portfolio stukken gericht op je ideale klantprofiel. Deze moeten je hoogwaardigste werk tonen en video testimonials bevatten waar mogelijk. Profielen met video testimonials converteren 64% beter dan alleen-tekst profielen.',
    },
    cta1: {
      title: 'Klaar om je freelance game te verhogen?',
      text: 'Ontdek welke premium platforms de beste kansen bieden voor jouw specialisatie en ervaringsniveau.',
      button: 'Vergelijk premium platforms',
    },
    section2: {
      title: '2. Niche down om level up te gaan',
      intro: 'De contra-intuïtieve waarheid: je focus versmallen vergroot je kansen. Generalisten concurreren op prijs; specialisten concurreren op expertise en vragen premium tarieven.',
      subTitle: 'De rijkdom zit in de niches',
      subText: 'Onderzoek toont aan dat gespecialiseerde freelancers 47% meer verdienen dan generalisten. Zo identificeer je jouw winstgevende niche:',
      industryTitle: 'Industrie specialisatie',
      industryText: 'Focus op een specifieke industrie waar je domeinexpertise of sterke interesse hebt.',
      industryItems: ['SaaS bedrijven', 'E-commerce merken', 'Gezondheidszorg startups', 'Fintech platforms'],
      problemTitle: 'Probleem specialisatie',
      problemText: 'Word de go-to expert voor het oplossen van een specifiek bedrijfsprobleem.',
      problemItems: ['Verlaten winkelwagen herstel', 'Mobiele app onboarding', 'Landingspagina conversie', 'API integratie'],
      authorityTitle: 'Autoriteit opbouwen in je niche',
      authorityText: 'Zodra je je niche hebt gekozen, vestig jezelf als de autoriteit door:',
      authorityItems: [
        { title: 'Case Study bibliotheek', text: 'Creëer 5-7 gedetailleerde case studies die je niche expertise tonen met specifieke metrics en klantresultaten.' },
        { title: 'Thought leadership content', text: 'Publiceer artikelen, tutorials of videos die je diepe kennis tonen van industrie-specifieke uitdagingen.' },
        { title: 'Niche-specifieke certificeringen', text: 'Verdien relevante certificeringen of creëer je eigen frameworks die gespecialiseerde methodologie tonen.' },
      ],
    },
    relatedTitle: 'Vervolg je freelance reis',
    related: [
      { title: 'Geavanceerde offerte strategieën', text: 'Meester proposal tactieken die premium projecten winnen' },
      { title: 'Langdurige klantrelaties opbouwen', text: 'Verander eenmalige opdrachten in terugkerende inkomsten' },
      { title: 'Krijg elke keer 5-sterren reviews', text: 'Bewezen tactieken voor perfecte klant feedback' },
    ],
  } : {
    hero: {
      badge: 'Freelance Success Strategy #1',
      h1: 'How to Stand Out on Crowded Freelance Platforms',
      intro: 'Learn the exact strategies that top 1% freelancers use to differentiate themselves, attract premium clients, and command higher rates on competitive platforms.',
      cta1: 'Explore Advanced Strategies',
      cta2: 'Compare Premium Platforms',
    },
    introduction: {
      text1: 'With over 73 million freelancers competing on platforms like Upwork, Fiverr, and Freelancer.com, standing out has never been more challenging. Yet the top 1% of freelancers consistently secure premium projects while charging 3-5x industry average rates. What\'s their secret?',
      text2: 'This comprehensive guide reveals the proven differentiation strategies that separate elite freelancers from the competition, based on analysis of over 10,000 successful freelancer profiles and interviews with six-figure earners.',
    },
    stats: {
      stat1: { value: '73M+', label: 'Active Freelancers Globally' },
      stat2: { value: '3-5x', label: 'Higher Rates for Top 1%' },
      stat3: { value: '89%', label: 'Client Retention Rate' },
    },
    section1: {
      title: '1. Craft a Magnetic Profile That Converts',
      intro: 'Your profile is your digital storefront. Top freelancers understand that 82% of hiring decisions are made within the first 30 seconds of viewing a profile. Here\'s how to optimize every element for maximum impact.',
      headlineTitle: 'Professional Headline Formula',
      headlineText: 'Generic headlines like "Graphic Designer" attract price-shoppers. Elite freelancers use outcome-focused headlines that immediately communicate value:',
      examples: {
        bad: 'Bad:',
        badExample: '"Experienced Web Developer"',
        good: 'Good:',
        goodExample: '"Full-Stack Developer | Helped 50+ SaaS Startups Launch in 60 Days | React & Node.js Expert"',
      },
      portfolioTitle: 'Portfolio That Tells Stories',
      portfolioText: 'Don\'t just showcase work—showcase results. Each portfolio piece should include:',
      portfolioItems: [
        { title: 'Client Challenge:', text: 'The specific problem you solved' },
        { title: 'Your Solution:', text: 'Your unique approach and process' },
        { title: 'Measurable Results:', text: 'Quantified outcomes (revenue increase, time saved, conversions)' },
        { title: 'Client Testimonial:', text: 'Direct quote validating the results' },
      ],
      proTip: 'Pro Tip: Create 3 "hero" portfolio pieces targeting your ideal client profile. These should demonstrate your highest-value work and include video testimonials when possible. Profiles with video testimonials convert 64% better than text-only profiles.',
    },
    cta1: {
      title: 'Ready to Elevate Your Freelance Game?',
      text: 'Discover which premium platforms offer the best opportunities for your specialization and experience level.',
      button: 'Compare Premium Platforms',
    },
    section2: {
      title: '2. Niche Down to Level Up',
      intro: 'The counterintuitive truth: narrowing your focus expands your opportunities. Generalists compete on price; specialists compete on expertise and command premium rates.',
      subTitle: 'The Riches Are in the Niches',
      subText: 'Research shows specialized freelancers earn 47% more than generalists. Here\'s how to identify your profitable niche:',
      industryTitle: 'Industry Specialization',
      industryText: 'Focus on a specific industry where you have domain expertise or strong interest.',
      industryItems: ['SaaS companies', 'E-commerce brands', 'Healthcare startups', 'Fintech platforms'],
      problemTitle: 'Problem Specialization',
      problemText: 'Become the go-to expert for solving a specific business problem.',
      problemItems: ['Abandoned cart recovery', 'Mobile app onboarding', 'Landing page conversion', 'API integration'],
      authorityTitle: 'Building Authority in Your Niche',
      authorityText: 'Once you\'ve chosen your niche, establish yourself as the authority through:',
      authorityItems: [
        { title: 'Case Study Library', text: 'Create 5-7 detailed case studies showcasing your niche expertise with specific metrics and client results.' },
        { title: 'Thought Leadership Content', text: 'Publish articles, tutorials, or videos demonstrating your deep knowledge of industry-specific challenges.' },
        { title: 'Niche-Specific Certifications', text: 'Earn relevant certifications or create your own frameworks that demonstrate specialized methodology.' },
      ],
    },
    relatedTitle: 'Continue Your Freelance Journey',
    related: [
      { title: 'Advanced Bidding Strategies', text: 'Master proposal tactics that win premium projects' },
      { title: 'Building Long-Term Client Relationships', text: 'Turn one-time gigs into recurring revenue streams' },
      { title: 'Get 5-Star Reviews Every Time', text: 'Proven tactics for perfect client feedback' },
    ],
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: content.hero.h1,
    description: locale === 'nl'
      ? 'Uitgebreide gids over jezelf onderscheiden op competitieve freelance markten en premium klanten aantrekken.'
      : 'Comprehensive guide on differentiating yourself on competitive freelance marketplaces and attracting premium clients.',
    author: {
      '@type': 'Organization',
      name: 'SkillLinkup',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SkillLinkup',
      logo: {
        '@type': 'ImageObject',
        url: 'https://skilllinkup.com/logo.png',
      },
    },
    datePublished: '2025-01-15',
    dateModified: '2025-01-15',
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
        <section className="bg-gradient-to-br from-primary via-primary-dark to-secondary py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Star className="w-4 h-4 text-accent" />
                <span className="text-white text-sm font-semibold">{content.hero.badge}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
                {content.hero.h1}
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                {content.hero.intro}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={`/${locale}/blog`}
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  {content.hero.cta1}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
                >
                  {content.hero.cta2}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
          {/* Introduction */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              {content.introduction.text1}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {content.introduction.text2}
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border border-gray-200 dark:border-slate-700">
              <div className="text-4xl font-bold text-primary mb-2">{content.stats.stat1.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{content.stats.stat1.label}</div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border border-gray-200 dark:border-slate-700">
              <div className="text-4xl font-bold text-accent mb-2">{content.stats.stat2.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{content.stats.stat2.label}</div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border border-gray-200 dark:border-slate-700">
              <div className="text-4xl font-bold text-secondary mb-2">{content.stats.stat3.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{content.stats.stat3.label}</div>
            </div>
          </div>

          {/* Section 1: Profile Optimization */}
          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  {content.section1.title}
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {content.section1.intro}
            </p>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              {content.section1.headlineTitle}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {content.section1.headlineText}
            </p>
            <div className="bg-accent/5 border-l-4 border-accent rounded-r-lg p-6 mb-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-gray-900 dark:text-white">{content.section1.examples.bad}</strong>
                    <span className="text-gray-600 dark:text-gray-400"> {content.section1.examples.badExample}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-gray-900 dark:text-white">{content.section1.examples.good}</strong>
                    <span className="text-gray-600 dark:text-gray-400"> {content.section1.examples.goodExample}</span>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              {content.section1.portfolioTitle}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {content.section1.portfolioText}
            </p>
            <ul className="space-y-3 mb-6">
              {content.section1.portfolioItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <span className="text-gray-700 dark:text-gray-300"><strong>{item.title}</strong> {item.text}</span>
                </li>
              ))}
            </ul>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Pro Tip:</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {content.section1.proTip}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section 1 */}
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-lg shadow-xl p-8 md:p-12 mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                {content.cta1.title}
              </h3>
              <p className="text-xl text-white/90 mb-8">
                {content.cta1.text}
              </p>
              <Link
                href={`/${locale}/platforms`}
                className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg"
              >
                {content.cta1.button}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Section 2: Specialization Strategy */}
          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  {content.section2.title}
                </h2>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {content.section2.intro}
            </p>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              {content.section2.subTitle}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {content.section2.subText}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  {content.section2.industryTitle}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {content.section2.industryText}
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  {content.section2.industryItems.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  {content.section2.problemTitle}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {content.section2.problemText}
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  {content.section2.problemItems.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              {content.section2.authorityTitle}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {content.section2.authorityText}
            </p>
            <div className="space-y-4 mb-6">
              {content.section2.authorityItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">{idx + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Related Articles */}
          <section className="border-t border-gray-200 dark:border-slate-700 pt-12">
            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              {content.relatedTitle}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href={`/${locale}/resources/advanced-bidding-strategies-to-win-more-freelance-projects`} className="group bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 hover:border-accent hover:shadow-lg transition-all">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {content.related[0].title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {content.related[0].text}
                </p>
              </Link>
              <Link href={`/${locale}/resources/building-long-term-client-relationships-on-freelance-platforms`} className="group bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 hover:border-accent hover:shadow-lg transition-all">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {content.related[1].title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {content.related[1].text}
                </p>
              </Link>
              <Link href={`/${locale}/resources/how-to-get-5-star-reviews-on-every-freelance-project`} className="group bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 hover:border-accent hover:shadow-lg transition-all">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {content.related[2].title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {content.related[2].text}
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
