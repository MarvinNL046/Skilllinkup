import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AdWidget } from '@/components/AdWidget';
import { Eye, TrendingUp, Award, Star, Target, CheckCircle, ArrowRight, Zap, Search, UserCheck } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  if (locale === 'nl') {
    return {
      title: 'Freelance Profiel Optimaliseren voor Maximale Zichtbaarheid',
      description: 'Leer bewezen strategieën om je freelance profiel te optimaliseren voor maximale zichtbaarheid. Verhoog profielweergaven met 300% via SEO-tactieken, portfolio-optimalisatie en platform-algoritmes.',
      keywords: 'freelance profiel optimaliseren, upwork profiel tips, fiverr profiel SEO, freelancer zichtbaarheid, profiel optimalisatie tips',
      openGraph: {
        title: 'Freelance Profiel Optimaliseren voor Maximale Zichtbaarheid',
        description: 'Verhoog je freelance profielweergaven met 300% met bewezen optimalisatiestrategieën en platform-specifieke SEO-tactieken.',
        type: 'article',
      },
    };
  }

  return {
    title: 'Optimize Your Freelance Profile for Maximum Visibility',
    description: 'Learn proven strategies to optimize your freelance profile for maximum visibility. Boost profile views by 300% with SEO tactics, portfolio optimization, and platform-specific algorithms.',
    keywords: 'freelance profile optimization, upwork profile tips, fiverr profile SEO, freelancer visibility, profile optimization tips',
    openGraph: {
      title: 'Optimize Your Freelance Profile for Maximum Visibility',
      description: 'Boost your freelance profile views by 300% with proven optimization strategies and platform-specific SEO tactics.',
      type: 'article',
    },
  };
}

export default async function OptimizingFreelanceProfileMaximumVisibility({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const content = locale === 'nl' ? {
    hero: {
      h1: "Optimaliseer Je Freelance Profiel voor Maximale Zichtbaarheid",
      intro: "Transformeer je freelance profiel naar een klantenmagneet. Leer bewezen strategieën om zichtbaarheid met 300% te verhogen, hoger te ranken in zoekresultaten en premium klanten aan te trekken die toprates betalen.",
      cta1: "Bekijk Top Platforms",
      cta2: "Lees Expert Gidsen"
    },
    introduction: {
      title: "Waarom Profiel Optimalisatie Je Belangrijkste Investering Is",
      p1: "Je freelance profiel is je digitale etalage, persoonlijk merk en vertegenwoordiger in één. Op platforms zoals Upwork, Fiverr, Freelancer en Toptal bepaalt je profiel of klanten je vinden, vertrouwen en inhuren. Toch optimaliseert 87% van de freelancers hun profiel nooit verder dan de basis setup, waardoor duizenden euro's aan potentiële inkomsten op tafel blijven liggen.",
      p2: "Profiel optimalisatie gaat niet over het systeem manipuleren—het gaat om strategische positionering. Goed geoptimaliseerde profielen ontvangen 3-5x meer weergaven, ranken hoger in platform zoekresultaten en converteren browsers naar betalende klanten met aanzienlijk hogere percentages. Deze uitgebreide gids onthult de exacte strategieën die top-verdienende freelancers gebruiken om profiel zichtbaarheid te maximaliseren op alle grote platforms.",
      stats: [
        { value: "300% Meer Weergaven", desc: "Gemiddelde toename na optimalisatie" },
        { value: "5x Hogere Ranking", desc: "In platform zoekresultaten" },
        { value: "40% Meer Uitnodigingen", desc: "Directe klant uitnodigingen" }
      ]
    },
    algorithms: {
      title: "Platform Algoritmes Begrijpen: Hoe Zoeken Echt Werkt",
      intro: "Elk groot freelance platform gebruikt eigen algoritmes om profielen te ranken in zoekresultaten. Hoewel de exacte formules vertrouwelijk zijn, onthult uitgebreid testen en platformdocumentatie de belangrijkste ranking factoren. Deze algoritmes begrijpen is de basis van effectieve profiel optimalisatie.",
      factors: [
        {
          title: "Keyword Relevantie en Dichtheid (Gewicht: 35%)",
          desc: "Platforms scannen je profieltitel, overzicht, vaardigheden en portfoliobeschrijvingen naar keywords die overeenkomen met klant zoekopdrachten. Strategische keyword plaatsing in sectie met hoge prioriteit signaleert relevantie aan het algoritme. Echter, keyword stuffing triggert penalties—natuurlijke integratie is essentieel.",
          action: "Onderzoek de exacte termen die klanten gebruiken om je diensten te zoeken. Gebruik tools zoals platform zoekbalken, Google autocomplete en concurrentprofielen om populaire keywords te identificeren. Plaats primaire keywords in je titel en eerste 150 karakters van je overzicht."
        },
        {
          title: "Job Success Score en Klant Feedback (Gewicht: 30%)",
          desc: "Je trackrecord heeft enorm algoritmisch gewicht. Platforms geven prioriteit aan profielen met hoge success rates, positieve reviews en afgeronde projecten. Een 95%+ success score kan je ranking met 40-60% verhogen vergeleken met profielen met lagere ratings.",
          action: "Focus op kwaliteit boven kwantiteit in je eerste 10 projecten. Een perfecte 5.0 rating met gedetailleerde positieve reviews vestigt algoritmische geloofwaardigheid. Accepteer nooit projecten die je niet uitzonderlijk kunt leveren—vroege ratings beïnvloeden onevenredig de lange termijn zichtbaarheid."
        }
      ]
    },
    cta1: {
      title: "Vergelijk Platform Features en Kies Je Beste Match",
      desc: "Verschillende platforms belonen verschillende optimalisatiestrategieën. Vergelijk algoritme types, ranking factoren en profiel features over 500+ freelance marktplaatsen om te vinden waar jouw profiel het beste presteert.",
      button: "Bekijk Alle Platforms"
    },
    profileTitle: {
      title: "De Perfecte Profieltitel Creëren: Je Eerste Indruk",
      intro: "Je profieltitel is het algoritmisch belangrijkste element van je profiel. Het verschijnt in zoekresultaten, bepaalt initiële ranking en beïnvloedt click-through rates. Een strategische titel kan profielweergaven met 150% verhogen vergeleken met generieke alternatieven.",
      formula: {
        title: "Profieltitel Formule voor Maximale Zichtbaarheid",
        pattern: "[Primaire Vaardigheid] | [Specialisatie] | [Kernvoordeel/Resultaat]",
        example: "Voorbeeld: Full Stack Developer | React & Node.js Expert | Bouw Schaalbare Web Apps",
        items: [
          { label: "Primaire Vaardigheid", desc: "Gebruik de exacte term waarnaar klanten zoeken (bijv. 'Grafisch Ontwerper' niet 'Visueel Creatief')" },
          { label: "Specialisatie", desc: "Je niche binnen de brede categorie (bijv. 'WordPress Expert' of 'B2B Content Writer')" },
          { label: "Kernvoordeel", desc: "Het primaire resultaat dat klanten behalen (bijv. 'Verhoog Conversies met 40%')" }
        ]
      },
      mistakes: {
        title: "Profieltitel Fouten Die Zichtbaarheid Doden",
        items: [
          "Generieke titels: 'Ervaren Professional' of 'Hard Werkende Freelancer'",
          "Meerdere ongerelateerde vaardigheden: 'Schrijver, Designer, Developer, Marketeer'",
          "Keyword stuffing: 'SEO Expert SEO Specialist SEO Consultant SEO Writer'",
          "Vage beschrijvingen: 'Creatieve Professional' of 'Tech Enthousiast'"
        ]
      }
    },
    relatedTitle: "Gerelateerde Resources",
    relatedItems: [
      { title: "Schrijf Winnende Offertes", desc: "Templates en voorbeelden om meer klanten binnen te halen" },
      { title: "Beheers Platform Algoritmes", desc: "Krijg meer job uitnodigingen met algoritmische strategieën" },
      { title: "Bouw Converterende Portfolio", desc: "Best practices en echte voorbeelden" }
    ]
  } : {
    hero: {
      h1: "Optimize Your Freelance Profile for Maximum Visibility",
      intro: "Transform your freelance profile into a client magnet. Learn proven strategies to boost visibility by 300%, rank higher in search results, and attract premium clients who pay top rates.",
      cta1: "Browse Top Platforms",
      cta2: "Read Expert Guides"
    },
    introduction: {
      title: "Why Profile Optimization Is Your Most Important Investment",
      p1: "Your freelance profile is your digital storefront, personal brand, and sales representative rolled into one. On platforms like Upwork, Fiverr, Freelancer, and Toptal, your profile determines whether clients find you, trust you, and hire you. Yet 87% of freelancers never optimize their profiles beyond the basic setup, leaving thousands of dollars in potential earnings on the table.",
      p2: "Profile optimization isn't about gaming the system—it's about strategic positioning. Well-optimized profiles receive 3-5x more views, rank higher in platform search results, and convert browsers into paying clients at significantly higher rates. This comprehensive guide reveals the exact strategies top-earning freelancers use to maximize profile visibility across all major platforms.",
      stats: [
        { value: "300% More Views", desc: "Average increase after optimization" },
        { value: "5x Higher Ranking", desc: "In platform search results" },
        { value: "40% More Invites", desc: "Direct client invitations" }
      ]
    },
    algorithms: {
      title: "Understanding Freelance Platform Algorithms: How Search Really Works",
      intro: "Every major freelance platform uses proprietary algorithms to rank profiles in search results. While the exact formulas are confidential, extensive testing and platform documentation reveal the key ranking factors. Understanding these algorithms is the foundation of effective profile optimization.",
      factors: [
        {
          title: "Keyword Relevance and Density (Weight: 35%)",
          desc: "Platforms scan your profile title, overview, skills, and portfolio descriptions for keywords matching client searches. Strategic keyword placement in high-priority sections signals relevance to the algorithm. However, keyword stuffing triggers penalties—natural integration is essential.",
          action: "Research the exact terms clients use to search for your services. Use tools like platform search bars, Google autocomplete, and competitor profiles to identify high-volume keywords. Place primary keywords in your title and first 150 characters of your overview."
        },
        {
          title: "Job Success Score and Client Feedback (Weight: 30%)",
          desc: "Your track record carries immense algorithmic weight. Platforms prioritize profiles with high success rates, positive reviews, and completed projects. A 95%+ success score can boost your ranking by 40-60% compared to profiles with lower ratings.",
          action: "Focus on quality over quantity in your first 10 projects. A perfect 5.0 rating with detailed positive reviews establishes algorithmic credibility. Never accept projects you can't deliver exceptionally—early ratings disproportionately impact long-term visibility."
        }
      ]
    },
    cta1: {
      title: "Compare Platform Features and Choose Your Best Match",
      desc: "Different platforms reward different optimization strategies. Compare algorithm types, ranking factors, and profile features across 500+ freelance marketplaces to find where your profile will perform best.",
      button: "Browse All Platforms"
    },
    profileTitle: {
      title: "Crafting the Perfect Profile Title: Your First Impression",
      intro: "Your profile title is the most algorithmically important element of your profile. It appears in search results, determines initial ranking, and influences click-through rates. A strategic title can increase profile views by 150% compared to generic alternatives.",
      formula: {
        title: "Profile Title Formula for Maximum Visibility",
        pattern: "[Primary Skill] | [Specialization] | [Key Benefit/Result]",
        example: "Example: Full Stack Developer | React & Node.js Expert | Building Scalable Web Apps",
        items: [
          { label: "Primary Skill", desc: "Use the exact term clients search for (e.g., 'Graphic Designer' not 'Visual Creative')" },
          { label: "Specialization", desc: "Your niche within the broad category (e.g., 'WordPress Expert' or 'B2B Content Writer')" },
          { label: "Key Benefit", desc: "The primary outcome clients achieve (e.g., 'Increase Conversions by 40%')" }
        ]
      },
      mistakes: {
        title: "Profile Title Mistakes That Kill Visibility",
        items: [
          "Generic titles: 'Experienced Professional' or 'Hard Working Freelancer'",
          "Multiple unrelated skills: 'Writer, Designer, Developer, Marketer'",
          "Keyword stuffing: 'SEO Expert SEO Specialist SEO Consultant SEO Writer'",
          "Vague descriptors: 'Creative Professional' or 'Tech Enthusiast'"
        ]
      }
    },
    relatedTitle: "Related Resources",
    relatedItems: [
      { title: "Write Winning Proposals", desc: "Templates and examples to close more clients" },
      { title: "Master Platform Algorithms", desc: "Get more job invites with algorithmic strategies" },
      { title: "Build Converting Portfolio", desc: "Best practices and real examples" }
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
                  <Eye className="w-7 h-7 text-white" />
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
                  href="/platforms"
                  className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  {content.hero.cta1}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/blog"
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
            "headline": content.hero.h1,
            "description": content.hero.intro,
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
                {content.introduction.title}
              </h2>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {content.introduction.p1}
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {content.introduction.p2}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border border-primary/20">
                    <TrendingUp className="w-10 h-10 text-primary mb-3" />
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{content.introduction.stats[0].value}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{content.introduction.stats[0].desc}</p>
                  </div>
                  <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border border-accent/20">
                    <Target className="w-10 h-10 text-accent mb-3" />
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{content.introduction.stats[1].value}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{content.introduction.stats[1].desc}</p>
                  </div>
                  <div className="bg-gradient-to-br from-[#1e1541]/10 to-[#1e1541]/5 dark:from-[#1e1541]/30 dark:to-[#1e1541]/20 rounded-xl p-6 border border-[#1e1541]/20">
                    <Star className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{content.introduction.stats[2].value}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{content.introduction.stats[2].desc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Understanding Platform Algorithms */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {content.algorithms.title}
              </h2>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {content.algorithms.intro}
              </p>

              <div className="space-y-6">
                {content.algorithms.factors.map((factor, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Search className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {factor.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                        {factor.desc}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        <strong>{locale === 'nl' ? 'Actiestap:' : 'Action Step:'}</strong> {factor.action}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section 1 */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <Search className="w-16 h-16 text-white mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {content.cta1.title}
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  {content.cta1.desc}
                </p>
                <Link
                  href="/platforms"
                  className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg"
                >
                  {content.cta1.button}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Profile Title Optimization */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {content.profileTitle.title}
              </h2>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {content.profileTitle.intro}
              </p>

              <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border border-accent/20 mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {content.profileTitle.formula.title}
                </h3>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-slate-900 rounded-lg p-4">
                    <p className="font-mono text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {content.profileTitle.formula.pattern}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {content.profileTitle.formula.example}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {content.profileTitle.formula.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300"><strong>{item.label}:</strong> {item.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-xl mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {content.profileTitle.mistakes.title}
                </h3>
                <ul className="space-y-2">
                  {content.profileTitle.mistakes.items.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-600 dark:text-red-400 font-bold">✗</span>
                      <span className="text-gray-700 dark:text-gray-300">{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Ad Widget */}
            <div className="mb-12">
              <AdWidget placement="blog_sidebar" />
            </div>

            {/* Related Resources */}
            <div className="mt-12 pt-12 border-t border-gray-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {content.relatedTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                  href="/resources/how-to-write-proposals-that-win"
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group"
                >
                  <Award className="w-10 h-10 text-primary mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {content.relatedItems[0].title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {content.relatedItems[0].desc}
                  </p>
                </Link>
                <Link
                  href="/resources/mastering-freelance-platform-algorithms"
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group"
                >
                  <TrendingUp className="w-10 h-10 text-accent mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {content.relatedItems[1].title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {content.relatedItems[1].desc}
                  </p>
                </Link>
                <Link
                  href="/resources/building-portfolio-that-converts"
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group"
                >
                  <Star className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {content.relatedItems[2].title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {content.relatedItems[2].desc}
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
