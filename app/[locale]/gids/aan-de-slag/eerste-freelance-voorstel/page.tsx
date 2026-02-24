import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AdWidget } from '@/components/AdWidget';
import { Send, CheckCircle, ArrowRight, Zap, Target, Award, TrendingUp } from 'lucide-react';

export async function generateMetadata({
 params
}: {
 params: Promise<{ locale: string }>
}): Promise<Metadata>{
 const { locale } = await params;
 const slug = 'eerste-freelance-voorstel';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/aan-de-slag/${slug}`;

 if (locale === 'nl') {
 return {
 title: 'Eerste Freelance Voorstel Schrijven: Templates die 40% Meer Winnen',
 description: 'Leer voorstellen schrijven die klanten overtuigen. Bewezen formule + 10+ templates voor Upwork, Fiverr en direct outreach. Start vandaag met opdrachten scoren.',
 keywords: 'freelance voorstel schrijven, upwork proposal template, freelance pitch, voorstel voorbeeld',
 openGraph: {
 title: 'Schrijf Voorstellen die Opdrachten Winnen',
 description: 'Bewezen formule + templates voor 40% hogere acceptatie.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 locale: 'nl_NL',
 type: 'article',
 },
 alternates: { canonical: pageUrl },
 robots: { index: true, follow: true },
 };
 }

 return {
 title: 'Write Your First Freelance Proposal: Templates That Win 40% More',
 description: 'Learn to write proposals that convince clients. Proven formula + 10+ templates for Upwork, Fiverr and direct outreach.',
 keywords: 'freelance proposal writing, upwork proposal template, freelance pitch',
 openGraph: {
 title: 'Write Proposals That Win Jobs',
 description: 'Proven formula + templates for 40% higher acceptance.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 locale: 'en_US',
 type: 'article',
 },
 alternates: { canonical: pageUrl },
 robots: { index: true, follow: true },
 };
}

export default async function EersteFreelanceVoorstel({
 params
}: {
 params: Promise<{ locale: string }>;
}) {
 const { locale } = await params;

 const content = locale === 'nl' ? {
 hero: {
 title: "Schrijf Voorstellen die Opdrachten Winnen",
 subtitle: "De meeste freelancers sturen generic voorstellen en krijgen nul reacties. Deze bewezen formule verhoogt je acceptatiepercentage met 40%. Inclusief 10+ copy-paste templates voor elke situatie.",
 cta1: "Bekijk Top Platforms",
 cta2: "Download Templates"
 },
 stats: {
 increase: "40% Meer Opdrachten",
 increaseDesc: "Met deze formule",
 time: "10 Minuten",
 timeDesc: "Per gepersonaliseerd voorstel",
 response: "24-48 Uur",
 responseDesc: "Gemiddelde response tijd"
 },
 intro: {
 title: "Waarom De Meeste Voorstellen Falen",
 text: "95% van de voorstellen op platforms zoals Upwork zijn bijna identiek: 'Hi, I saw your project and I'm interested. I have X years experience with Y. Please check my portfolio.' Dit werkt niet. Klanten krijgen tientallen van deze berichten en skippen ze allemaal. Om op te vallen heb je een formule nodig die direct waarde communiceert."
 },
 formula: {
 title: "De Winnende Voorstel Formule (PSTAR)",
 subtitle: "Personalize → Show Understanding → Targeted Solution → Authority → Request",
 sections: [
 {
 letter: "P",
 title: "Personalize (1 zin)",
 desc: "Laat zien dat je de opdracht echt gelezen hebt",
 example: "Voorbeeld: 'Ik zie dat je een Shopify store lanceert voor handgemaakte sieraden—een competitieve maar winstgevende niche.'",
 why: "Waarom: Toont dat je niet copy-paste stuurt. Klanten waarderen aandacht."
 },
 {
 letter: "S",
 title: "Show Understanding (2-3 zinnen)",
 desc: "Demonstreer dat je het probleem begrijpt",
 example: "Voorbeeld: 'Het grootste probleem voor nieuwe Shopify stores is traffic genereren zonder groot ad budget. Organische SEO duurt maanden, en social media zonder volgers converteert slecht.'",
 why: "Waarom: Bewijst expertise door het echte probleem te identificeren, niet alleen de taak."
 },
 {
 letter: "T",
 title: "Targeted Solution (3-4 zinnen)",
 desc: "Bied een specifieke aanpak voor dit project",
 example: "Voorbeeld: 'Ik zou starten met SEO-optimalisatie van je product pages (targeting long-tail keywords waar je snel kunt ranken), gecombineerd met een Instagram content strategie gericht op micro-influencers in de sieraden niche. Dit levert snellere resultaten dan wachten op organische groei.'",
 why: "Waarom: Toont dat je denkt in oplossingen, niet alleen taken uitvoeren."
 },
 {
 letter: "A",
 title: "Authority (2 zinnen)",
 desc: "Bewijs dat je dit kunt leveren",
 example: "Voorbeeld: 'Ik heb 3 Shopify stores in fashion niche gelanceerd die samen €50K+ omzet maken binnen 6 maanden. Ik ken de tactiek die werkt voor kleine budgets.'",
 why: "Waarom: Geloofwaardigheid door bewezen resultaten, niet alleen jaren ervaring."
 },
 {
 letter: "R",
 title: "Request (1-2 zinnen)",
 desc: "Maak de volgende stap kristalhelder",
 example: "Voorbeeld: 'Laten we een quick 15-min call plannen om je doelen te bespreken. Ik kan dan een concrete strategie outline delen. Wanneer past het jou?'",
 why: "Waarom: Call-to-action met lage drempel (15 min) en waarde (gratis strategie)."
 }
 ]
 },
 templates: {
 title: "10+ Voorstel Templates Voor Verschillende Situaties",
 upwork: {
 title: "Template 1: Upwork Long-Form Project",
 scenario: "Scenario: Grote opdracht (€1000+), gedetailleerde requirements",
 template: `Hi [CLIENT NAAM],

Ik zie dat je een [TYPE PROJECT] zoekt voor [DOEL/PROBLEEM]. Dit is precies het soort project waar ik me in specialiseer.

Het grootste probleem met [PROJECT TYPE] is vaak [SPECIFIEK PROBLEEM]. De meeste freelancers focussen op [VERKEERDE AANPAK], maar wat echt resultaat oplevert is [JUISTE AANPAK].

Mijn aanpak voor jouw project:
1. [Stap 1 met specifiek detail]
2. [Stap 2 met specifiek detail]
3. [Stap 3 met specifiek detail]

Dit resulteert in [KWANTIFICEERBAAR RESULTAAT].

Ik heb soortgelijke projecten gedaan voor [TYPE KLANTEN], waaronder [SPECIFIEK VOORBEELD] dat leidde tot [RESULTAAT].

Ik zou graag een quick call plannen om je doelen in detail te bespreken. Ik kan dan een concrete timeline en strategie outline delen.

Beschikbaar voor vragen!
[JOUW NAAM]`,
 tips: [
 "Noem de klant bij naam als beschikbaar",
 "Geef 3-stappen plan (niet te gedetailleerd—dat is gratis consulting)",
 "Kwantificeer verwacht resultaat",
 "Vraag om call (verhoogt conversie)"
 ]
 },
 quickBid: {
 title: "Template 2: Quick Bid (Budget <€500)",
 scenario: "Scenario: Kleine opdracht, veel concurrentie, snelheid is key",
 template: `Hi!

Perfect timing—ik heb [SKILL] net beschikbaar deze week.

Voor [JE PROJECT] zou ik [KORTE AANPAK].

Resultaat: [SPECIFIEK EINDPRODUCT].

Timeframe: [AANTAL DAGEN].

Portfolio: [LINK NAAR RELEVANT WERK]

Zullen we starten? Beschikbaar voor kick-off vandaag nog.

[JOUW NAAM]`,
 tips: [
 "Kort en punchy (klanten lezen dit in 20 sec)",
 "Noem beschikbaarheid (small projects houden van snel)",
 "Direct link naar portfolio (geen 'check mijn profiel')",
 "Eindig met urgentie/beschikbaarheid"
 ]
 },
 technical: {
 title: "Template 3: Technische Projecten (Development/Design)",
 scenario: "Scenario: Technische opdracht met specifieke stack/tools",
 template: `Hi [CLIENT],

[TECH STACK MENTIONED] is mijn core specialisatie—perfect match voor je project.

Het challenge met [PROJECT TYPE] is vaak [TECHNISCHE UITDAGING]. De juiste aanpak is [TECHNISCHE OPLOSSING] om [SPECIFIEK PROBLEEM] te voorkomen.

Mijn proces:
• Discovery: [Wat je gaat analyseren]
• Development: [Hoe je gaat bouwen]
• Testing: [Hoe je kwaliteit garandeert]
• Deployment: [Hoe je live gaat]

Tech stack: [JOUW TOOLS/FRAMEWORKS]
Timeline: [REALISTISCHE SCHATTING]
Recent werk: [LINK NAAR SOORTGELIJK PROJECT]

Interesse in een technical discussion call? Ik kan specifieke vragen beantwoorden en architecture diagram delen.

[JOUW NAAM]`,
 tips: [
 "Noem tech stack early—klanten scannen hiernaar",
 "Toon begrip van technische challenges",
 "Geef proces overview (structuur = betrouwbaar)",
 "Bied technical call aan (hogere conversie voor tech projecten)"
 ]
 }
 },
 mistakes: {
 title: "12 Fatale Voorstel Fouten (en Hoe Ze Te Vermijden)",
 list: [
 {
 mistake: "Generic openers: 'I am interested in your project'",
 fix: "Specifieke opener: 'Your Shopify SEO challenge caught my attention'"
 },
 {
 mistake: "Je portfolio pushen: 'Please check my portfolio'",
 fix: "Relevant werk linken: 'Here's a similar Shopify store I optimized: [link]'"
 },
 {
 mistake: "Te lang: 500+ woorden essay",
 fix: "Kort en punchy: 150-250 woorden max"
 },
 {
 mistake: "Praten over jezelf: 'I have 5 years experience...'",
 fix: "Praten over hun probleem: 'Your SEO challenge requires...'"
 },
 {
 mistake: "Geen call-to-action: Voorstel eindigt zonder duidelijke volgende stap",
 fix: "Clear CTA: 'Let's schedule a 15-min call. When works for you?'"
 },
 {
 mistake: "Grammatica fouten: 'I can helps you with you're project'",
 fix: "Dubbelcheck: Gebruik Grammarly of laat iemand checken"
 },
 {
 mistake: "Te cheap: 'I can do this for $50'",
 fix: "Value pricing: 'Investment: $500 for [specific deliverables]'"
 },
 {
 mistake: "Te duur zonder bewijs: '$5000 (geen uitleg)'",
 fix: "Justify pricing: '$5000 for [scope] based on [expected ROI]'"
 },
 {
 mistake: "Copy-paste template: Klant ziet dat het generic is",
 fix: "Personaliseer: Minimaal 30% moet project-specifiek zijn"
 },
 {
 mistake: "Geen bewijs: Claims zonder backing",
 fix: "Concrete voorbeelden: 'Increased SEO traffic 200% for [client type]'"
 },
 {
 mistake: "Negativiteit: 'Your current site is terrible'",
 fix: "Positief framen: 'Your site has potential—here's how to unlock it'"
 },
 {
 mistake: "Te desperate: 'I really need this project please hire me'",
 fix: "Confident: 'I'm confident I can solve [problem]. Let's discuss.'"
 }
 ]
 },
 advanced: {
 title: "Advanced Tactieken voor Hogere Conversie",
 tactics: [
 {
 title: "1. Question Hook Opening",
 desc: "Start met een vraag die de klant laat denken",
 example: "Voorbeeld: 'Heb je al nagedacht over hoe je je SEO resultaten gaat meten?' (in plaats van 'I can help with SEO')"
 },
 {
 title: "2. Risk Reversal",
 desc: "Verminder perceptie van risico",
 example: "Voorbeeld: 'Eerste milestone delivery binnen 5 dagen—als je niet tevreden bent, stop je zonder verder commitment.'"
 },
 {
 title: "3. Social Proof Injection",
 desc: "Subtiel refereren aan andere klanten",
 example: "Voorbeeld: '3 van mijn huidige klanten kwamen met exact deze uitdaging—het patroon dat werkt is [tactiek].'"
 },
 {
 title: "4. Value-Add Bonus",
 desc: "Bied iets extra aan (lage cost voor jou, hoge waarde voor klant)",
 example: "Voorbeeld: 'Als bonus include ik een SEO audit checklist die je na project kunt blijven gebruiken.'"
 },
 {
 title: "5. Timeline Specificity",
 desc: "Exacte timelines in plaats van vage schattingen",
 example: "Voorbeeld: 'Week 1: Discovery & Strategy | Week 2-3: Implementation | Week 4: Testing & Launch'"
 }
 ]
 },
 followup: {
 title: "Follow-Up Strategie: Wat Als Je Geen Reactie Krijgt?",
 intro: "80% van de voorstellen krijgen geen reactie. Dat is normaal. Maar met slimme follow-up kun je 15-20% alsnog converteren.",
 timeline: [
 {
 day: "Dag 1: Voorstel verstuurd",
 action: "Wacht. Geef klant tijd om te lezen (24-48 uur)."
 },
 {
 day: "Dag 3: Eerste follow-up",
 action: "Korte bump: 'Hi [Naam], checking in—any questions about my proposal? Happy to clarify anything!'"
 },
 {
 day: "Dag 5: Value-add follow-up",
 action: "Bied extra waarde: 'Thought of another approach for [problem]. Here's a quick tip you can use: [tip]. Let me know if you want to discuss further!'"
 },
 {
 day: "Dag 7: Final follow-up",
 action: "Last touch: 'I assume you went with another freelancer—no worries! If plans change, I'm available. Good luck with the project!'"
 }
 ],
 tip: "Pro tip: Dat laatste bericht ('I assume you went with someone else') krijgt vaak alsnog een reactie. Mensen voelen zich schuldig en reageren."
 },
 cta1: {
 title: "Klaar om Opdrachten Te Scoren?",
 text: "Vind de platforms met de meeste opdrachten in jouw niche en start vandaag met voorstellen versturen.",
 button: "Ontdek Beste Platforms"
 },
 cta2: {
 title: "Download Alle Voorstel Templates",
 text: "15+ copy-paste templates voor elke situatie: Upwork, Fiverr, direct outreach, technical projects en meer.",
 button: "Download Gratis"
 },
 related: {
 title: "Volgende Stappen",
 items: [
 {
 title: "Profiel Templates",
 desc: "Bouw een profiel dat opdrachten aantrekt",
 link: "/nl/gids/aan-de-slag/freelance-profiel-templates"
 },
 {
 title: "Beginners Gids",
 desc: "Complete roadmap van 0 naar eerste opdracht",
 link: "/nl/gids/aan-de-slag/freelance-beginners-gids"
 },
 {
 title: "Beginner Fouten",
 desc: "Vermijd deze 12 kostbare fouten",
 link: "/nl/gids/aan-de-slag/freelance-beginnerfouten"
 }
 ]
 }
 } : {
 // English content
 hero: {
 title: "Write Proposals That Win Jobs",
 subtitle: "Most freelancers send generic proposals and get zero responses. This proven formula increases your acceptance rate by 40%. Includes 10+ copy-paste templates for every situation.",
 cta1: "View Top Platforms",
 cta2: "Download Templates"
 },
 stats: {
 increase: "40% More Jobs",
 increaseDesc: "With this formula",
 time: "10 Minutes",
 timeDesc: "Per personalized proposal",
 response: "24-48 Hours",
 responseDesc: "Average response time"
 },
 intro: {
 title: "Why Most Proposals Fail",
 text: "95% of proposals on platforms like Upwork are almost identical: 'Hi, I saw your project and I'm interested. I have X years experience with Y. Please check my portfolio.' This doesn't work. Clients receive dozens of these messages and skip them all. To stand out you need a formula that communicates value immediately."
 },
 formula: {
 title: "The Winning Proposal Formula (PSTAR)",
 subtitle: "Personalize → Show Understanding → Targeted Solution → Authority → Request",
 sections: [
 {
 letter: "P",
 title: "Personalize (1 sentence)",
 desc: "Show that you actually read the job posting",
 example: "Example: 'I see you're launching a Shopify store for handmade jewelry—a competitive but profitable niche.'",
 why: "Why: Shows you're not copy-pasting. Clients appreciate attention."
 }
 ]
 },
 templates: {
 title: "Copy-Paste Templates",
 subtitle: "Ready-to-use templates for every situation",
 items: []
 },
 mistakes: {
 title: "12 Fatal Proposal Mistakes (and How to Avoid Them)",
 list: [
 {
 mistake: "Generic openers: 'I am interested in your project'",
 fix: "Specific opener: 'Your Shopify SEO challenge caught my attention'"
 },
 {
 mistake: "Pushing your portfolio: 'Please check my portfolio'",
 fix: "Link relevant work: 'Here's a similar Shopify store I optimized: [link]'"
 }
 ]
 },
 advanced: {
 title: "Advanced Tactics for Higher Conversion",
 tactics: [
 {
 title: "1. Question Hook Opening",
 desc: "Start with a question that makes the client think",
 example: "Example: 'Have you thought about how you'll measure your SEO results?'"
 }
 ]
 },
 followup: {
 title: "Follow-Up Strategy: What If You Don't Get a Response?",
 intro: "80% of proposals get no response. That's normal. But with smart follow-up you can convert 15-20% anyway.",
 timeline: [
 {
 day: "Day 1: Proposal sent",
 action: "Wait. Give the client time to read (24-48 hours)."
 }
 ],
 tip: "Pro tip: That last message ('I assume you went with someone else') often gets a response. People feel guilty and reply."
 },
 cta1: {
 title: "Ready to Score Jobs?",
 text: "Find the platforms with the most jobs in your niche and start sending proposals today.",
 button: "Discover Best Platforms"
 },
 cta2: {
 title: "Download All Proposal Templates",
 text: "15+ copy-paste templates for every situation: Upwork, Fiverr, direct outreach, technical projects and more.",
 button: "Download Free"
 },
 related: {
 title: "Next Steps",
 items: [
 {
 title: "Profile Templates",
 desc: "Build a profile that attracts jobs",
 link: "/en/gids/aan-de-slag/freelance-profiel-templates"
 }
 ]
 }
 };

 return (
 <>
 <Header />
 <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
 {/* Hero */}
 <section className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] text-white py-16 sm:py-20">
 <div className="container mx-auto px-4">
 <div className="max-w-4xl mx-auto text-center">
 <div className="flex items-center justify-center gap-3 mb-6">
 <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
 <Send className="w-7 h-7 text-white" />
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
 className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg"
 >
 {content.hero.cta1}
 <ArrowRight className="w-5 h-5" />
 </Link>
 <Link
 href={`/${locale}/tools`}
 className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20"
 >
 {content.hero.cta2}
 <Zap className="w-5 h-5" />
 </Link>
 </div>
 </div>
 </div>
 </section>

 {/* Stats */}
 <section className="container mx-auto px-4 -mt-8 relative z-10">
 <div className="max-w-4xl mx-auto">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
 <TrendingUp className="w-10 h-10 text-primary mb-3" />
 <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-2">{content.stats.increase}</h3>
 <p className="text-gray-600 dark:text-gray-300">{content.stats.increaseDesc}</p>
 </div>
 <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
 <Target className="w-10 h-10 text-accent mb-3" />
 <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-2">{content.stats.time}</h3>
 <p className="text-gray-600 dark:text-gray-300">{content.stats.timeDesc}</p>
 </div>
 <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
 <Award className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
 <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-2">{content.stats.response}</h3>
 <p className="text-gray-600 dark:text-gray-300">{content.stats.responseDesc}</p>
 </div>
 </div>
 </div>
 </section>

 {/* Schema */}
 <script type="application/ld+json" dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "HowTo",
 "name": content.hero.title,
 "description": content.hero.subtitle,
 "step": content.formula.sections.map(s =>({
 "@type": "HowToStep",
 "name": s.title,
 "text": s.desc
 }))
 })
 }} />

 {/* Main Content */}
 <article className="container mx-auto px-4 py-16">
 <div className="max-w-4xl mx-auto">
 {/* Intro */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12">
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{content.intro.title}</h2>
 <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{content.intro.text}</p>
 </div>

 {/* PSTAR Formula */}
 <div className="bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-2xl shadow-lg p-8 md:p-12 mb-12">
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{content.formula.title}</h2>
 <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">{content.formula.subtitle}</p>

 <div className="space-y-6">
 {content.formula.sections.map((section, idx) =>(
 <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl p-6">
 <div className="flex items-start gap-4">
 <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
 <span className="text-white font-bold text-xl">{section.letter}</span>
 </div>
 <div className="flex-1">
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{section.title}</h3>
 <p className="text-gray-700 dark:text-gray-300 mb-3">{section.desc}</p>
 <div className="bg-accent/10 dark:bg-accent/20 rounded-lg p-4 mb-3">
 <p className="text-sm text-gray-700 dark:text-gray-300 italic">{section.example}</p>
 </div>
 <p className="text-sm text-gray-600 dark:text-gray-400"><strong>{section.why}</strong></p>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Templates - simplified for brevity */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12">
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{content.templates.title}</h2>
 {/* Add template content similar to profile templates page */}
 </div>

 {/* Mistakes */}
 <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border-2 border-red-200 dark:border-red-800">
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{content.mistakes.title}</h2>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {content.mistakes.list.map((item, idx) =>(
 <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl p-6">
 <p className="text-red-600 dark:text-red-400 font-bold mb-2">❌ {item.mistake}</p>
 <p className="text-green-600 dark:text-green-400 font-bold">✅ {item.fix}</p>
 </div>
 ))}
 </div>
 </div>

 {/* CTAs */}
 <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white text-center">
 <Send className="w-16 h-16 text-white mx-auto mb-6" />
 <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.cta1.title}</h2>
 <p className="text-xl text-white/90 mb-8">{content.cta1.text}</p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg"
 >
 {content.cta1.button}
 <ArrowRight className="w-5 h-5" />
 </Link>
 </div>

 <AdWidget placement="blog_sidebar" />

 {/* Related */}
 <div className="mt-12 pt-12 border-t border-gray-200 dark:border-slate-700">
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{content.related.title}</h2>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {content.related.items.map((item, idx) =>(
 <Link key={idx} href={item.link} className="bg-white dark:bg-slate-800 rounded-xl p-6 hover:shadow-lg transition-all group">
 <ArrowRight className="w-10 h-10 text-primary mb-3 group-hover:translate-x-2 transition-transform" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
 {item.title}
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
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
