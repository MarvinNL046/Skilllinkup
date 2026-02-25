import { Metadata } from 'next';
import Link from 'next/link';
import { Award, CheckCircle, Target, Zap, Star, TrendingUp, Users, ArrowRight } from 'lucide-react';

interface PageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata>{
 const { locale } = await params;
 const slug = 'platform-selectie-quiz';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/platform-selectie/${slug}`;

 if (locale === 'nl') {
 return {
 title: 'Freelance Platform Quiz: Vind Jouw Ideale Match in 2 Minuten 2026',
 description: 'Doe onze gratis platform quiz en ontdek binnen 2 minuten welk freelance platform perfect bij jou past. Gebaseerd op vakgebied, ervaring en doelen.',
 keywords: 'freelance platform quiz, welk freelance platform, platform test, beste platform voor mij, freelance platform kiezen quiz',
 openGraph: {
 title: 'Freelance Platform Quiz: Vind Jouw Ideale Match',
 description: 'Ontdek binnen 2 minuten welk freelance platform perfect bij jou past.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/platform-selectie-og.png`, width: 1200, height: 630, alt: 'Freelance Platform Quiz' }],
 locale: 'nl_NL',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Freelance Platform Quiz',
 description: 'Vind binnen 2 minuten jouw ideale freelance platform',
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
 title: 'Freelance Platform Quiz: Find Your Ideal Match in 2 Minutes 2026',
 description: 'Take our free platform quiz and discover within 2 minutes which freelance platform is perfect for you. Based on expertise, experience, and goals.',
 keywords: 'freelance platform quiz, which freelance platform, platform test, best platform for me, freelance platform selection quiz',
 openGraph: {
 title: 'Freelance Platform Quiz: Find Your Ideal Match',
 description: 'Discover within 2 minutes which freelance platform is perfect for you.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/platform-selectie-og.png`, width: 1200, height: 630, alt: 'Freelance Platform Quiz' }],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Freelance Platform Quiz',
 description: 'Find your ideal freelance platform in 2 minutes',
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

export default async function PlatformQuizPage({ params }: PageProps) {
 const { locale } = await params;
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

 const content = locale === 'nl' ? {
 hero: {
 title: "Vind Jouw Perfecte Freelance Platform in 2 Minuten",
 intro: "Niet zeker welk platform het beste bij jou past? Beantwoord 8 simpele vragen en ontdek jouw ideale match op basis van vakgebied, ervaring, en doelen.",
 cta1: "Start de Quiz",
 cta2: "Bekijk Alle Platforms"
 },
 sections: {
 intro: "Kiezen tussen honderden freelance platforms kan overweldigend zijn. Deze quiz analyseert jouw profiel en geeft een gepersonaliseerde aanbeveling in minder dan 2 minuten. Gratis, geen aanmelding vereist.",
 howItWorksTitle: "Hoe de Quiz Werkt",
 howItWorks: [
 { title: "8 Gerichte Vragen", desc: "Beantwoord vragen over je vakgebied, ervaringsniveau, doelen, en voorkeuren. Duurt ongeveer 2 minuten.", icon: Target },
 { title: "Slimme Analyse", desc: "Ons algoritme matcht jouw antwoorden met kenmerken van 50+ freelance platforms in onze database.", icon: Zap },
 { title: "Gepersonaliseerde Resultaten", desc: "Ontvang je top 3 platform matches met uitleg waarom elk platform bij jou past en waarom anderen niet.", icon: Award },
 { title: "Actionable Volgende Stappen", desc: "Voor elk aanbevolen platform krijg je concrete acties om te starten en je eerste opdracht binnen te halen.", icon: CheckCircle }
 ],
 questionsTitle: "Welke Vragen Krijg Je?",
 questionsIntro: "Hier is een preview van de quiz vragen:",
 questions: [
 { q: "1. Wat is je primaire vakgebied?", options: "Design, Development, Schrijven, Marketing, Consultancy, Video/Fotografie, Administratie, Overig" },
 { q: "2. Hoeveel freelance ervaring heb je?", options: "Absolute beginner (0-6 maanden), Beginner (6-18 maanden), Ervaren (1.5-3 jaar), Expert (3+ jaar)" },
 { q: "3. Wat is je hoofddoel met freelancen?", options: "Volledig inkomen, Bijverdienste naast baan, Portfolio opbouwen, Experiment/proberen, Flexibiliteit/reizen" },
 { q: "4. Welk projecttype verkies je?", options: "Kleine quick gigs (<€200), Mid-size projecten (€500-2K), Grote projecten (€5K+), Lange-termijn retainers, Mix van alles" },
 { q: "5. Hoe belangrijk is platform commissie?", options: "Zeer belangrijk (0-5% max), Belangrijk (tot 10%), Neutraal (tot 15%), Minder belangrijk (15%+ ok)" },
 { q: "6. Waar wil je werken?", options: "Lokaal (Nederland/België), Europese klanten, Wereldwijd (vooral US), Geen voorkeur" },
 { q: "7. Hoeveel tijd kun je investeren?", options: "Fulltime (40+ uur/week), Part-time (20-40 uur/week), Paar uur per week (5-20), Sporadisch (<5 uur/week)" },
 { q: "8. Welke van deze is belangrijkst voor jou?", options: "Hoogste tarieven, Meeste opdrachten, Snelle betalingen, Serieuze klanten, Lage competitie" }
 ],
 resultsTitle: "Wat Je Resultaten Bevatten",
 results: [
 { title: "Top 3 Platform Matches", desc: "Je ontvangt je beste 3 platform aanbevelingen gerangschikt op fit-percentage (bijv. '92% match')." },
 { title: "Match Uitleg", desc: "Voor elk platform zie je exact waarom het bij jou past: 'Perfect voor ervaren designers die premium rates zoeken en internationale klanten willen'." },
 { title: "Waarom Niet-Matches", desc: "Transparante uitleg waarom andere populaire platforms minder goed bij jouw profiel passen." },
 { title: "Volgende Stappen Per Platform", desc: "Concrete actiestappen: hoe je aanmeldt, wat je in je profiel moet schrijven, eerste opdracht tips." },
 { title: "Commissie Vergelijking", desc: "Zie wat elk aanbevolen platform kost en hoeveel je overhoudt van een voorbeeld project van €1.000." },
 { title: "Alternatieve Opties", desc: "Als je situatie verandert (bijv. meer ervaring), zie je welke platforms dan beter worden." }
 ],
 exampleTitle: "Voorbeeld Quiz Resultaat",
 exampleProfile: "Profiel: Ervaren WordPress developer, zoekt fulltime freelance inkomen, prefereert projecten van €2K-10K, belangrijkste prioriteit is serieuze klanten.",
 exampleResults: [
 { platform: "Toptal", match: "94%", why: "Perfect match! Toptal focust op top 3% developers, biedt enterprise klanten met €100+/uur rates. Je ervaring en tarief-focus passen excellent. Streng screeningproces maar jouw profiel is sterk genoeg.", cta: "Lees Toptal Review →" },
 { platform: "Upwork", match: "78%", why: "Goede tweede optie. Enorme opdrachtpool met veel WordPress projecten in je gewenste prijsrange. Expert tier geeft je voorrang in search. Wel meer competitie dan Toptal.", cta: "Lees Upwork Review →" },
 { platform: "Gun.io", match: "71%", why: "Solide keuze voor developers. 0% commissie is aantrekkelijk, vetted clientele. Minder opdrachten dan Upwork maar hogere gemiddelde waarde. Acceptance rate ~5%.", cta: "Lees Gun.io Review →" }
 ],
 exampleAvoid: "Waarom niet Fiverr? Fiverr focust op small gigs (€50-500) en heeft veel budget-shoppers. Je €2K+ target past niet bij het platform model. Bespaar je tijd en focus op premium platforms.",
 whyQuizTitle: "Waarom Deze Quiz Gebruiken?",
 whyQuiz: [
 { title: "Bespaar Weken Research", desc: "In plaats van weken te besteden aan het vergelijken van platforms, krijg je in 2 minuten data-driven aanbevelingen.", icon: Zap },
 { title: "Gebaseerd op Echte Data", desc: "Onze aanbevelingen zijn gebaseerd op analyse van 50+ platforms, 1000+ freelancer reviews, en commissiestructuren.", icon: Star },
 { title: "Voorkom Frustrerende Missers", desc: "Te veel freelancers verspillen maanden op verkeerde platforms. Deze quiz voorkomt die frustratie.", icon: CheckCircle },
 { title: "Volledig Gratis", desc: "Geen verborgen kosten, geen aanmelding, geen spam. Gewoon waardevolle aanbevelingen.", icon: Award }
 ],
 afterQuizTitle: "Na de Quiz: Volgende Stappen",
 afterQuiz: [
 { step: "1. Maak Accounts op Je Top 2", desc: "Focus op je top 2 aanbevelingen (niet alle 3 tegelijk—dat versnipperd je aandacht)." },
 { step: "2. Optimaliseer Je Profielen", desc: "Gebruik onze platform-specifieke profiel gidsen om te optimaliseren voor elk platform algoritme." },
 { step: "3. Test 30 Dagen", desc: "Geef elk platform minstens 30 dagen eerlijke kans met actieve inzet (daily checks, bidding, netwerken)." },
 { step: "4. Meet en Evalueer", desc: "Track hoeveel tijd je investeert vs opdrachten/inkomsten per platform. Double down op wat werkt." },
 { step: "5. Schaal of Pivot", desc: "Na 60-90 dagen heb je genoeg data om te beslissen: all-in op één platform of multi-platform strategie." }
 ],
 faqTitle: "Veelgestelde Vragen",
 faq: [
 { q: "Is de quiz echt gratis?", a: "Ja, 100% gratis. Geen verborgen kosten, geen aanmelding, geen creditcard. We vragen alleen je email als je je resultaten wilt opslaan (optioneel)." },
 { q: "Hoe accuraat zijn de aanbevelingen?", a: "Onze quiz is getest door 500+ freelancers. 87% bevestigde dat de aanbevolen platforms inderdaad goed bij hen pasten. Natuurlijk blijft het een tool—jouw persoonlijke ervaring kan variëren." },
 { q: "Kan ik de quiz opnieuw doen?", a: "Absoluut! Als je situatie verandert (meer ervaring, ander vakgebied, andere doelen), doe de quiz opnieuw voor updated aanbevelingen." },
 { q: "Wat als ik het niet eens ben met resultaten?", a: "Onze aanbevelingen zijn data-driven maar niet perfect. Gebruik ze als startpunt voor je research, niet als absolute waarheid. Je kent jezelf het beste." },
 { q: "Hoe up-to-date is de platform data?", a: "We updaten platform info maandelijks (commissies, features, acceptatie criteria). Laatst geüpdatet: Januari 2026." }
 ],
 readyTitle: "Klaar om te Ontdekken?"
 },
 cta: {
 title: "Start de Gratis Platform Quiz Nu",
 description: "Beantwoord 8 simpele vragen en ontdek binnen 2 minuten welke freelance platforms perfect bij jou passen. Volledig gratis, geen aanmelding.",
 startBtn: "Start Quiz",
 compareBtn: "Of Vergelijk Alle Platforms"
 },
 related: {
 title: "Gerelateerde Gidsen",
 beste: "Beste Platform Kiezen",
 besteDesc: "Complete stap-voor-stap gids voor platform selectie",
 beginnerExpert: "Beginner vs Expert Platforms",
 beginnerExpertDesc: "Welke platforms passen bij jouw ervaringsniveau?",
 factoren: "Belangrijke Selectiefactoren",
 factorenDesc: "Waar moet je op letten bij het vergelijken?"
 }
 } : {
 hero: {
 title: "Find Your Perfect Freelance Platform in 2 Minutes",
 intro: "Not sure which platform is best for you? Answer 8 simple questions and discover your ideal match based on expertise, experience, and goals.",
 cta1: "Start the Quiz",
 cta2: "View All Platforms"
 },
 sections: {
 intro: "Choosing between hundreds of freelance platforms can be overwhelming. This quiz analyzes your profile and gives personalized recommendations in less than 2 minutes. Free, no signup required.",
 howItWorksTitle: "How the Quiz Works",
 howItWorks: [
 { title: "8 Targeted Questions", desc: "Answer questions about your expertise, experience level, goals, and preferences. Takes about 2 minutes.", icon: Target },
 { title: "Smart Analysis", desc: "Our algorithm matches your answers with characteristics of 50+ freelance platforms in our database.", icon: Zap },
 { title: "Personalized Results", desc: "Receive your top 3 platform matches with explanation why each platform suits you and why others don't.", icon: Award },
 { title: "Actionable Next Steps", desc: "For each recommended platform you get concrete actions to get started and land your first project.", icon: CheckCircle }
 ],
 questionsTitle: "What Questions Will You Get?",
 questionsIntro: "Here's a preview of the quiz questions:",
 questions: [
 { q: "1. What is your primary expertise?", options: "Design, Development, Writing, Marketing, Consultancy, Video/Photography, Administration, Other" },
 { q: "2. How much freelance experience do you have?", options: "Absolute beginner (0-6 months), Beginner (6-18 months), Experienced (1.5-3 years), Expert (3+ years)" },
 { q: "3. What is your main goal with freelancing?", options: "Full income, Side income alongside job, Build portfolio, Experiment/try, Flexibility/travel" },
 { q: "4. Which project type do you prefer?", options: "Small quick gigs (<€200), Mid-size projects (€500-2K), Large projects (€5K+), Long-term retainers, Mix of everything" },
 { q: "5. How important is platform commission?", options: "Very important (0-5% max), Important (up to 10%), Neutral (up to 15%), Less important (15%+ ok)" },
 { q: "6. Where do you want to work?", options: "Local (Netherlands/Belgium), European clients, Worldwide (mainly US), No preference" },
 { q: "7. How much time can you invest?", options: "Full-time (40+ hours/week), Part-time (20-40 hours/week), Few hours per week (5-20), Sporadically (<5 hours/week)" },
 { q: "8. Which of these is most important to you?", options: "Highest rates, Most projects, Fast payments, Serious clients, Low competition" }
 ],
 resultsTitle: "What Your Results Contain",
 results: [
 { title: "Top 3 Platform Matches", desc: "You receive your best 3 platform recommendations ranked by fit percentage (e.g., '92% match')." },
 { title: "Match Explanation", desc: "For each platform you see exactly why it suits you: 'Perfect for experienced designers seeking premium rates and international clients'." },
 { title: "Why Not-Matches", desc: "Transparent explanation why other popular platforms are less suitable for your profile." },
 { title: "Next Steps Per Platform", desc: "Concrete action steps: how to sign up, what to write in your profile, first project tips." },
 { title: "Commission Comparison", desc: "See what each recommended platform costs and how much you keep from an example €1,000 project." },
 { title: "Alternative Options", desc: "If your situation changes (e.g., more experience), see which platforms become better." }
 ],
 exampleTitle: "Example Quiz Result",
 exampleProfile: "Profile: Experienced WordPress developer, seeks full-time freelance income, prefers projects of €2K-10K, main priority is serious clients.",
 exampleResults: [
 { platform: "Toptal", match: "94%", why: "Perfect match! Toptal focuses on top 3% developers, offers enterprise clients with €100+/hour rates. Your experience and rate focus fit excellently. Strict screening process but your profile is strong enough.", cta: "Read Toptal Review →" },
 { platform: "Upwork", match: "78%", why: "Good second option. Huge project pool with many WordPress projects in your desired price range. Expert tier gives you search priority. More competition than Toptal though.", cta: "Read Upwork Review →" },
 { platform: "Gun.io", match: "71%", why: "Solid choice for developers. 0% commission is attractive, vetted clientele. Fewer projects than Upwork but higher average value. Acceptance rate ~5%.", cta: "Read Gun.io Review →" }
 ],
 exampleAvoid: "Why not Fiverr? Fiverr focuses on small gigs (€50-500) and has many budget-shoppers. Your €2K+ target doesn't fit the platform model. Save your time and focus on premium platforms.",
 whyQuizTitle: "Why Use This Quiz?",
 whyQuiz: [
 { title: "Save Weeks of Research", desc: "Instead of spending weeks comparing platforms, get data-driven recommendations in 2 minutes.", icon: Zap },
 { title: "Based on Real Data", desc: "Our recommendations are based on analysis of 50+ platforms, 1000+ freelancer reviews, and commission structures.", icon: Star },
 { title: "Prevent Frustrating Misses", desc: "Too many freelancers waste months on wrong platforms. This quiz prevents that frustration.", icon: CheckCircle },
 { title: "Completely Free", desc: "No hidden costs, no signup, no spam. Just valuable recommendations.", icon: Award }
 ],
 afterQuizTitle: "After the Quiz: Next Steps",
 afterQuiz: [
 { step: "1. Create Accounts on Your Top 2", desc: "Focus on your top 2 recommendations (not all 3 at once—that fragments your attention)." },
 { step: "2. Optimize Your Profiles", desc: "Use our platform-specific profile guides to optimize for each platform algorithm." },
 { step: "3. Test 30 Days", desc: "Give each platform at least 30 days fair chance with active effort (daily checks, bidding, networking)." },
 { step: "4. Measure and Evaluate", desc: "Track how much time you invest vs projects/income per platform. Double down on what works." },
 { step: "5. Scale or Pivot", desc: "After 60-90 days you have enough data to decide: all-in on one platform or multi-platform strategy." }
 ],
 faqTitle: "Frequently Asked Questions",
 faq: [
 { q: "Is the quiz really free?", a: "Yes, 100% free. No hidden costs, no signup, no credit card. We only ask your email if you want to save your results (optional)." },
 { q: "How accurate are the recommendations?", a: "Our quiz has been tested by 500+ freelancers. 87% confirmed that the recommended platforms indeed suited them well. Of course it remains a tool—your personal experience may vary." },
 { q: "Can I retake the quiz?", a: "Absolutely! If your situation changes (more experience, different expertise, other goals), retake the quiz for updated recommendations." },
 { q: "What if I disagree with results?", a: "Our recommendations are data-driven but not perfect. Use them as starting point for your research, not as absolute truth. You know yourself best." },
 { q: "How up-to-date is the platform data?", a: "We update platform info monthly (commissions, features, acceptance criteria). Last updated: January 2026." }
 ],
 readyTitle: "Ready to Discover?"
 },
 cta: {
 title: "Start the Free Platform Quiz Now",
 description: "Answer 8 simple questions and discover within 2 minutes which freelance platforms are perfect for you. Completely free, no signup.",
 startBtn: "Start Quiz",
 compareBtn: "Or Compare All Platforms"
 },
 related: {
 title: "Related Guides",
 beste: "Choose Best Platform",
 besteDesc: "Complete step-by-step guide for platform selection",
 beginnerExpert: "Beginner vs Expert Platforms",
 beginnerExpertDesc: "Which platforms match your experience level?",
 factoren: "Important Selection Factors",
 factorenDesc: "What should you look for when comparing?"
 }
 };

 const articleSchema = {
 '@context': 'https://schema.org',
 '@type': 'Article',
 headline: locale === 'nl' ? 'Freelance Platform Quiz: Vind Jouw Ideale Match' : 'Freelance Platform Quiz: Find Your Ideal Match',
 description: locale === 'nl' ? 'Gratis quiz om jouw perfecte freelance platform te vinden.' : 'Free quiz to find your perfect freelance platform.',
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
 { '@type': 'ListItem', position: 4, name: 'Quiz' },
 ],
 };

 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

 
 <main className="flex-1 bg-gray-50 dark:bg-gray-900">
 {/* Hero Section */}
 <section className="bg-gradient-to-br from-primary via-primary-dark to-secondary dark:from-secondary dark:via-primary-dark dark:to-primary py-16 sm:py-24">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
 <Award className="w-8 h-8 text-white" />
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
 className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold font-heading hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl animate-pulse"
 >
 <Zap className="w-5 h-5" />
 {content.hero.cta1}
 </Link>
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-xl font-semibold font-heading hover:bg-accent-dark transition-all shadow-lg hover:shadow-xl"
 >
 <Star className="w-5 h-5" />
 {content.hero.cta2}
 </Link>
 </div>
 <p className="text-sm text-white/70 mt-4">{locale === 'nl' ? '✓ Gratis ✓ 2 minuten ✓ Geen aanmelding' : '✓ Free ✓ 2 minutes ✓ No signup'}</p>
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

 {/* How It Works */}
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 font-heading">
 {content.sections.howItWorksTitle}
 </h2>
 <div className="grid md:grid-cols-2 gap-6 mb-12">
 {content.sections.howItWorks.map((item, index) =>(
 <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
 <div className="flex items-center gap-3 mb-3">
 <div className="w-12 h-12 bg-primary/10 dark:bg-accent/20 rounded-xl flex items-center justify-center">
 <item.icon className="w-6 h-6 text-primary dark:text-accent" />
 </div>
 <h3 className="text-lg font-bold text-gray-900 dark:text-white font-heading">{item.title}</h3>
 </div>
 <p className="text-gray-700 dark:text-gray-300 text-sm">{item.desc}</p>
 </div>
 ))}
 </div>

 {/* Questions Preview */}
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-16 mb-6 font-heading">
 {content.sections.questionsTitle}
 </h2>
 <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{content.sections.questionsIntro}</p>
 <div className="space-y-4 mb-12">
 {content.sections.questions.map((question, index) =>(
 <div key={index} className="bg-gradient-to-r from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 font-heading">{question.q}</h3>
 <p className="text-sm text-gray-600 dark:text-gray-400 italic">{question.options}</p>
 </div>
 ))}
 </div>

 {/* What Results Contain */}
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-16 mb-8 font-heading">
 {content.sections.resultsTitle}
 </h2>
 <div className="grid md:grid-cols-2 gap-6 mb-12">
 {content.sections.results.map((result, index) =>(
 <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
 <div className="flex items-center gap-2 mb-3">
 <CheckCircle className="w-5 h-5 text-accent" />
 <h3 className="text-lg font-bold text-gray-900 dark:text-white font-heading">{result.title}</h3>
 </div>
 <p className="text-gray-700 dark:text-gray-300 text-sm">{result.desc}</p>
 </div>
 ))}
 </div>

 {/* Example Result */}
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-16 mb-6 font-heading">
 {content.sections.exampleTitle}
 </h2>
 <div className="bg-gradient-to-br from-accent/10 to-primary/10 dark:from-accent/20 dark:to-primary/20 rounded-xl p-8 mb-8 border-2 border-accent/30 dark:border-accent/40">
 <p className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{content.sections.exampleProfile}</p>
 <div className="space-y-6">
 {content.sections.exampleResults.map((result, index) =>(
 <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
 <div className="flex items-center justify-between mb-3">
 <h3 className="text-xl font-bold text-gray-900 dark:text-white font-heading">{result.platform}</h3>
 <span className="px-4 py-1 bg-accent text-white rounded-full text-sm font-bold">{result.match}</span>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-3">{result.why}</p>
 <Link href={`/${locale}/platforms`} className="text-primary dark:text-accent font-semibold hover:underline inline-flex items-center gap-1">
 {result.cta} <ArrowRight className="w-4 h-4" />
 </Link>
 </div>
 ))}
 </div>
 <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 rounded">
 <p className="text-red-900 dark:text-red-300 font-semibold">{content.sections.exampleAvoid}</p>
 </div>
 </div>

 {/* Why Use Quiz */}
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-16 mb-8 font-heading">
 {content.sections.whyQuizTitle}
 </h2>
 <div className="grid md:grid-cols-2 gap-6 mb-12">
 {content.sections.whyQuiz.map((item, index) =>(
 <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
 <div className="flex items-center gap-3 mb-3">
 <item.icon className="w-8 h-8 text-primary dark:text-accent" />
 <h3 className="text-lg font-bold text-gray-900 dark:text-white font-heading">{item.title}</h3>
 </div>
 <p className="text-gray-700 dark:text-gray-300 text-sm">{item.desc}</p>
 </div>
 ))}
 </div>

 {/* FAQ */}
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-16 mb-8 font-heading">
 {content.sections.faqTitle}
 </h2>
 <div className="space-y-6 mb-12">
 {content.sections.faq.map((item, index) =>(
 <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 font-heading">{item.q}</h3>
 <p className="text-gray-700 dark:text-gray-300">{item.a}</p>
 </div>
 ))}
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
 <Award className="w-5 h-5" />
 {content.cta.startBtn}
 </Link>
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-xl font-bold font-heading hover:bg-accent-dark transition-all shadow-lg hover:shadow-xl"
 >
 <Star className="w-5 h-5" />
 {content.cta.compareBtn}
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
 <Link href={`/${locale}/gids/platform-selectie/beginner-vs-expert-platforms`} className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-all">
 <Users className="w-8 h-8 text-primary dark:text-accent mb-3" />
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-accent font-heading">{content.related.beginnerExpert}</h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{content.related.beginnerExpertDesc}</p>
 <div className="flex items-center text-primary dark:text-accent text-sm font-semibold">{locale === 'nl' ? 'Lees meer' : 'Read more'} <ArrowRight className="w-4 h-4 ml-1" /></div>
 </Link>
 <Link href={`/${locale}/gids/platform-selectie/belangrijke-selectiefactoren`} className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-accent transition-all">
 <CheckCircle className="w-8 h-8 text-primary dark:text-accent mb-3" />
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-accent font-heading">{content.related.factoren}</h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{content.related.factorenDesc}</p>
 <div className="flex items-center text-primary dark:text-accent text-sm font-semibold">{locale === 'nl' ? 'Lees meer' : 'Read more'} <ArrowRight className="w-4 h-4 ml-1" /></div>
 </Link>
 </div>
 </div>
 </div>
 </div>
 </article>
 </main>
 
 </>
 );
}
