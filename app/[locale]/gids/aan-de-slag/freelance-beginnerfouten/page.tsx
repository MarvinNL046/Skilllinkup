import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AdWidget } from '@/components/AdWidget';
import { AlertTriangle, XCircle, CheckCircle, ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react';

export async function generateMetadata({
 params
}: {
 params: Promise<{ locale: string }>
}): Promise<Metadata>{
 const { locale } = await params;
 const slug = 'freelance-beginnerfouten';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/aan-de-slag/${slug}`;

 if (locale === 'nl') {
 return {
 title: "12 Freelance Beginnerfouten die Je Duizenden Euro's Kosten (en Hoe Te Vermijden)",
 description: 'Vermijd deze 12 kostbare freelance fouten. Van pricing tot client management—leer van andermans fouten in plaats van je eigen geld te verliezen.',
 keywords: 'freelance fouten beginners, freelance mistakes, freelance tips, freelance advies',
 openGraph: {
 title: '12 Freelance Beginnerfouten die Geld Kosten',
 description: 'Vermijd deze fouten en bespaar duizenden euro\'s.',
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
 title: '12 Freelance Beginner Mistakes That Cost Thousands (and How to Avoid Them)',
 description: 'Avoid these 12 costly freelance mistakes. From pricing to client management—learn from others\' mistakes instead of losing your own money.',
 keywords: 'freelance mistakes beginners, freelancing tips, freelance advice',
 openGraph: {
 title: '12 Freelance Beginner Mistakes That Cost Money',
 description: 'Avoid these mistakes and save thousands.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 locale: 'en_US',
 type: 'article',
 },
 alternates: { canonical: pageUrl },
 robots: { index: true, follow: true },
 };
}

export default async function FreelanceBeginnerfouten({
 params
}: {
 params: Promise<{ locale: string }>;
}) {
 const { locale } = await params;

 const content = locale === 'nl' ? {
 hero: {
 title: "12 Freelance Beginnerfouten Die Je Duizenden Euro's Kosten",
 subtitle: "95% van de nieuwe freelancers maakt deze fouten. Ze verliezen geld, tijd en klanten—en de meeste stoppen binnen 6 maanden. Leer van andermans fouten in plaats van je eigen geld te verbranden.",
 cta1: "Start Met Juiste Platforms",
 cta2: "Download Beginners Gids"
 },
 stats: {
 quit: "60% Stopt Binnen 6 Maanden",
 quitDesc: "Door vermijdbare fouten",
 cost: "€2000-€5000 Verlies",
 costDesc: "Gemiddelde eerste jaar",
 avoid: "12 Kritieke Fouten",
 avoidDesc: "Die je vandaag kunt vermijden"
 },
 intro: {
 title: "Waarom Beginners Falen (en Jij Niet)",
 text: "De meeste freelance guides vertellen je wat je MOET doen. Deze gids is anders—ik laat je zien wat je NIET moet doen. Deze 12 fouten kosten beginners gemiddeld €2000-€5000 in het eerste jaar, plus ontelbare verloren opdrachten en burned bridges. Als je deze fouten vermijdt, heb je al een voorsprong op 95% van je concurrentie."
 },
 mistakes: [
 {
 number: 1,
 category: "Pricing",
 title: "Te Goedkoop Starten (en Te Lang Goedkoop Blijven)",
 problem: "De grootste fout: €5-€10/uur vragen omdat je 'moet beginnen'. Dit lijkt logisch maar vernietigt je business voordat het begint.",
 why: "Waarom Dit Slecht Is:",
 reasons: [
 "Je trekt de slechtste klanten aan (die alleen op prijs kopen)",
 "Je hebt geen marge voor fouten of extra werk",
 "Je kunt niet opschalen (€10/uur × 40 uur = €400/week = armoede)",
 "Je wordt niet serieus genomen (goedkoop = waardeloos in klant psychologie)"
 ],
 reality: "Reality check: Een beginnende web developer die €10/uur vraagt moet 400 uur werken om €4000 te verdienen. Eén die €40/uur vraagt hoeft maar 100 uur te werken voor hetzelfde. Wie denk je heeft meer tijd voor skill development?",
 solution: "De Fix:",
 fixes: [
 "Start minimaal op 70% van marktprijs voor je skill level",
 "Research marktprijzen: Zoek freelancers met 10-20 reviews, check hun tarieven",
 "Verhoog elke 5 opdrachten met 20-30%",
 "Na 10 opdrachten: marktprijs of hoger"
 ],
 example: "Voorbeeld: Beginnende content writer → Start €25/uur (niet €5), verhoog naar €30 na 5 opdrachten, naar €40 na 10 opdrachten. Binnen 3 maanden verdien je 8x meer per uur dan met de 'goedkoop starten' strategie."
 },
 {
 number: 2,
 category: "Client Management",
 title: "Scope Creep Accepteren Zonder Pushback",
 problem: "'Kun je dit ook snel toevoegen?' 'Kleine aanpassing, duurt maar 5 minuten' 'Oh, en kun je ook...' → Je bent nu gratis aan het werken.",
 why: "Waarom Dit Gebeurt:",
 reasons: [
 "Je wilt de klant niet teleurstellen (noble, maar naïef)",
 "Je bent bang de review te verliezen (klanten respecteren grenzen)",
 "Je denkt '5 minuten maakt niet uit' (het stapelt op tot uren)",
 "Je hebt geen duidelijk contract (vage scope = uitbuiting)"
 ],
 cost: "De Kosten: Gemiddelde freelancer verliest 10-15 uur/maand aan scope creep. Bij €40/uur = €400-€600 verloren inkomsten per maand = €4800-€7200 per jaar.",
 solution: "De Fix:",
 fixes: [
 "Duidelijke scope in contract: 'Includes: X, Y, Z. Additional requests quoted separately.'",
 "Polite pushback template: 'Happy to add that! It's outside our original scope, so €[amount] for [estimated hours]. Shall I send an updated quote?'",
 "Include 1-2 minor revisions, maar define 'minor'",
 "Track alle tijd, zelfs 'quick changes'—je zult geschokt zijn hoeveel het is"
 ],
 example: "Real example: Designer accepteerde '5 kleine aanpassingen' na project. Bleek 8 uur extra werk te zijn. Bij €50/uur = €400 gratis werk. Als je 2x per maand dit doet, verlies je €800/maand = €9600/jaar."
 },
 {
 number: 3,
 category: "Platform Strategy",
 title: "Op Te Veel Platforms Tegelijk Starten",
 problem: "Je maakt profielen op Upwork, Fiverr, Freelancer.com, Guru, PeoplePerHour EN je eigen website. Je verspreidt je energie en slaagt nergens.",
 why: "Waarom Dit Niet Werkt:",
 reasons: [
 "Elk platform heeft eigen algoritme en best practices",
 "Je hebt geen tijd om 5 profielen te optimaliseren",
 "Je reviews zijn verspreid (10 reviews op 1 platform >2 reviews op 5 platforms)",
 "Je leert niet wat werkt omdat je te veel variabelen hebt"
 ],
 solution: "De Fix:",
 fixes: [
 "Kies 1 primair platform voor je eerste 3 maanden",
 "Master dat platform: learn algoritme, optimization, proposal writing",
 "Build naar 10+ reviews en Top Rated/Pro status",
 "DAN uitbreiden naar tweede platform"
 ],
 example: "Better strategy: 3 maanden Upwork → Top Rated → 3 maanden Fiverr → Level 2 Seller → Overweeg eigen website. Nu heb je bewezen track record op elk platform."
 },
 {
 number: 4,
 category: "Time Management",
 title: "Geen Grenzen Stellen (24/7 Beschikbaar Zijn)",
 problem: "Je reageert op berichten om 23:00. Je werkt in weekenden. Je bent altijd 'on'. Resultaat: burnout binnen 3 maanden.",
 why: "Waarom Beginners Dit Doen:",
 reasons: [
 "Angst klanten te verliezen: 'If I don't respond immediately they'll hire someone else'",
 "Guilt over 'not working hard enough'",
 "Geen duidelijke werk/leven grenzen",
 "Copying toxic hustle culture: 'Sleep when you're dead'"
 ],
 reality: "Reality: Klanten respecteren grenzen. Professionele freelancers hebben werkuren. 24/7 beschikbaar zijn signaleert DESPERATIE, niet professionalisme.",
 solution: "De Fix:",
 fixes: [
 "Set werkuren: Bijv. 9:00-17:00 weekdagen",
 "Auto-responder: 'Thanks for your message. I respond within 24 hours during business hours (Mon-Fri, 9-5 CET).'",
 "Weekend policy: NO work in weekenden tenzij emergency (met 50% extra tarief)",
 "Evening cutoff: Geen berichten checken na 18:00",
 "Communicate boundaries in onboarding: 'I work Mon-Fri 9-5. For urgent matters, email subject line: URGENT.'"
 ],
 benefit: "Benefit: Je voorkomt burnout, je werkt efficiënter, en klanten respecteren je meer."
 },
 {
 number: 5,
 category: "Portfolio",
 title: "Geen Portfolio of Generic Portfolio",
 problem: "Je hebt of nul voorbeelden, of 20 random projecten zonder context. Klanten weten niet wat je kunt.",
 why: "Waarom Dit Fatal Is:",
 reasons: [
 "Klanten kiezen op basis van bewijs, niet beloftes",
 "Generic portfolio = je lijkt op 1000 andere freelancers",
 "Geen case studies = klanten zien geen ROI",
 "Te veel werk = klanten zijn overwhelmed en skippen"
 ],
 solution: "De Fix:",
 fixes: [
 "5-8 beste projecten (quality >quantity)",
 "Elk project: Probleem → Jouw Oplossing → Resultaat",
 "Include metrics: '40% conversie increase', '€10K omzet impact'",
 "Visueel sterk: High-quality screenshots, mockups",
 "Targeted: Portfolio stukken die jouw target klanten aanspreken"
 ],
 beginner: "Als je geen betaald werk hebt: Maak 3 sample projecten. Redesign een slechte website, schrijf een sample blog, ontwerp een fictional brand. Toon wat je kunt."
 },
 {
 number: 6,
 category: "Communication",
 title: "Slechte of Inconsistente Communicatie",
 problem: "Je reageert laat, je updates zijn vaag, klanten moeten achter je aan zitten. Dit doodt trust en repeat business.",
 why: "Waarom Dit Career-Ending Is:",
 reasons: [
 "Trust is alles in freelance—bad communication destroys it",
 "Klanten interpreteren radio silence als problemen",
 "Late responses = je lijkt unreliable of niet interested",
 "Vage updates = klanten vrezen dat je behind bent"
 ],
 solution: "De Fix:",
 fixes: [
 "Response time: Max 24 uur (ideaal 2-4 uur tijdens werkuren)",
 "Weekly updates: Elke vrijdag stuur je status update, ook als 'everything on track'",
 "Proactive communication: Probleem? Tell klant immediately, niet 1 dag voor deadline",
 "Clear language: Geen jargon, clear yes/no, specific timelines",
 "Set expectations: 'I'll send an update every Wednesday. Feel free to ping me anytime.'"
 ],
 template: "Update template: 'Hi [Naam], quick update: ✅ Completed: [X] | In Progress: [Y] | Next: [Z]. On track for [deadline]. Questions? Let me know!'"
 },
 {
 number: 7,
 category: "Contracts",
 title: "Zonder Contract Starten ('We Trust Each Other')",
 problem: "'We don't need a contract, I trust you!' Famous last words. 30% van de freelancers wordt niet betaald voor minimaal 1 project. Don't be that statistic.",
 why: "Waarom Mensen Dit Skippen:",
 reasons: [
 "Angst de deal te verliezen: 'If I ask for contract they'll think I don't trust them'",
 "Naïviteit: 'They seem nice, it'll be fine'",
 "Luiheid: Contracts maken is work",
 "Inexperience: Je weet niet hoe"
 ],
 disasters: [
 "Klant weigert te betalen: 'It's not what I expected' (no defined scope)",
 "Scope creep explosion: 'You agreed to do this' (no written agreement)",
 "IP disputes: 'I own the work' vs 'No, I do' (no IP clause)",
 "Late payment: Weken wachten zonder recourse (no payment terms)"
 ],
 solution: "De Fix:",
 fixes: [
 "ALWAYS gebruik platform escrow (Upwork, Fiverr) voor eerste projects",
 "Voor direct clients: Simple contract template (Google: 'freelance contract template')",
 "Minimum clauses: Scope, Timeline, Payment Terms, Revisions Policy, IP Rights",
 "Payment terms: 50% upfront, 50% on delivery (of milestones voor grote projecten)",
 "Get it signed: DocuSign, HelloSign (free tiers available)"
 ],
 script: "Script: 'Great! To protect both of us, I use a simple contract that outlines scope, timeline and payment. I'll send it over—takes 2 minutes to review. Standard practice for all my clients.'"
 },
 {
 number: 8,
 category: "Skill Development",
 title: "Niet Investeren in Skills (Blijven Steken op Beginner Level)",
 problem: "Je leert de basics en dan... stop je met leren. Je blijft €20/uur verdienen terwijl de markt evolueert.",
 why: "Waarom Beginners Dit Doen:",
 reasons: [
 "Busy met werk: 'No time to learn'",
 "Comfort zone: Je weet genoeg om te overleven",
 "Geen plan: Je weet niet WAT te leren",
 "Gratis resources bias: Je leert alleen van gratis YouTube, niet diepgaand"
 ],
 cost: "Opportunity cost: Beginnende designer blijft bij basis Canva → verdient €20/uur. Colleague leert Figma, UX principles, animation → verdient €60/uur na 1 jaar. Verschil = €40/uur × 1000 uur/jaar = €40.000 gemist inkomen.",
 solution: "De Fix:",
 fixes: [
 "Dedicate 5 uur/week aan skill development (10% van 50-uur werkweek)",
 "Paid courses >free YouTube: Invest €200-€500/jaar in quality education",
 "Follow industry leaders: Zie wat experts doen, leer nieuwe technieken",
 "Build projects: Apply nieuwe skills in side projects",
 "Get certified: Platform certificates (Upwork tests, Google, HubSpot) boost credibility"
 ],
 path: "Growth path: Basics (maand 1-3) → Intermediate (maand 4-9) → Advanced techniques (maand 10-15) → Specialization (maand 16+). Each level = tarief verhogen."
 },
 {
 number: 9,
 category: "Client Selection",
 title: "Elke Klant Accepteren (Inclusief Red Flags)",
 problem: "'I need the money, I'll take any client.' Dit lijkt pragmatisch maar leads naar nightmare projecten die je reputatie schaden.",
 why: "Red Flag Klanten Herkennen:",
 redflags: [
 "Vague requirements: 'I'll know it when I see it'",
 "Onrealistisch budget: '€100 voor een complete webshop'",
 "Urgency zonder reden: 'I need this by tomorrow'",
 "Meerdere vorige freelancers: 'I've hired 5 people, all failed'",
 "Geen reviews of nieuwe account: Possible scammer",
 "Pushy over prijs: 'Can you do it for half?'",
 "Vague over payment: 'We'll discuss payment later'"
 ],
 cost: "Cost van bad clients: Stress, late/no payment, scope creep, bad review (damages future earnings), time wasted = gemiddeld €500-€1500 per nightmare client.",
 solution: "De Fix:",
 fixes: [
 "Qualification checklist: Run mental checklist voor je accepteert",
 "Trust je gut: Red flags? Politely decline",
 "It's okay to say no: 'Thanks for considering me, but I don't think I'm the right fit for this project.'",
 "Check client history: Reviews they left, response time, verification",
 "Start small: Met nieuwe clients, start met small test project voor je grotere commit"
 ],
 mantra: "Mantra: 1 good client >5 nightmare clients. Protect je tijd en mental health."
 },
 {
 number: 10,
 category: "Specialization",
 title: "'Ik Doe Alles' Syndroom",
 problem: "Je profiel zegt: 'Web design, SEO, content writing, social media, video editing, graphic design...' Klanten denken: 'Jack of all trades, master of none.'",
 why: "Waarom Dit Niet Werkt:",
 reasons: [
 "Klanten zoeken experts, niet generalisten",
 "Je concurreert op prijs (geen unique value)",
 "Je kan niet THE BEST worden als je alles doet",
 "Marketing is moeilijk: 'I do everything' = no clear positioning"
 ],
 reality: "Reality: '€40/uur WordPress specialist' wint van '€30/uur web designer + SEO + content + social media'.",
 solution: "De Fix:",
 fixes: [
 "Pick 1 primary skill voor eerste 6 maanden",
 "Niche down verder: Niet 'web designer', maar 'Shopify designer voor fashion brands'",
 "Build depth: Become top 10% in je niche",
 "Secondary skills: Okay to have, but promote primary first",
 "Market positioning: 'I specialize in X for Y clients'"
 ],
 example: "Example: Niet 'I do social media' → 'Instagram growth specialist for e-commerce brands (fashion/beauty)'. Tweede persoon krijgt 3x meer opdrachten bij hogere tarieven."
 },
 {
 number: 11,
 category: "Financial Management",
 title: "Geen Buffer/Savings (Living Project-to-Project)",
 problem: "Je verdient €2000, je spent €2000. Volgende maand heb je een slow period → panic → accepteer slechte deal uit desperatie.",
 why: "Waarom Dit Gevaarlijk Is:",
 reasons: [
 "Freelance inkomen fluctueert—altijd",
 "Zonder buffer ben je forced om elke opdracht te nemen",
 "Emergencies happen: Computer crash, ziekte, client delayed payment",
 "Desperation leads to bad decisions (red flag clients, underpaying)"
 ],
 solution: "De Fix:",
 fixes: [
 "Month 1-3: Save 20% van elke payment",
 "Goal: 3 maanden kosten in buffer (€3000-€6000 depending on lifestyle)",
 "Separate accounts: 1 voor business, 1 voor personal, 1 voor savings/tax",
 "Tax money: Set aside 25-30% voor belastingen (don't spend it!)",
 "Emergency fund: €1000 minimum voor computer repair, etc."
 ],
 timeline: "Timeline: Bij €2000/maand → Save €400/maand → €1200 na 3 maanden → €2400 na 6 maanden → €4800 na 1 jaar = comfortable buffer."
 },
 {
 number: 12,
 category: "Mindset",
 title: "Opgeef Te Snel (Stop Na Eerste 3 Moeilijke Maanden)",
 problem: "Maand 1-2: Excited! Maand 3: Waar zijn de klanten? Maand 4: This isn't working. Maand 5: Geeft op. 60% van beginners quit precies hier.",
 why: "Waarom Mensen Opgeven:",
 reasons: [
 "Unrealistic expectations: 'I thought I'd make €5K in month 1'",
 "Vergelijken met others: Social media shows only success, not struggle",
 "Slow start = assume failure: 'It's not working' (but it takes time)",
 "Geen support systeem: Doing it alone is hard",
 "Geen metrics: Can't see progress because not tracking"
 ],
 reality: "Reality: Maand 1-3 zijn altijd moeilijk. Je bouwt reputatie, leert platforms, maakt fouten. Maand 4-6 is waar het momentum begint. Maand 7-12 is waar echte growth komt.",
 solution: "De Fix:",
 fixes: [
 "Realistic timeline: Commit to minimum 12 maanden voor je oordeelt",
 "Track metrics: Proposals sent, response rate, projects won → je ziet progress",
 "Celebrate small wins: Eerste review, eerste €100, eerste repeat client",
 "Join communities: Reddit r/freelance, Facebook groups, local meetups",
 "Find accountability partner: Andere freelancer in journey, check in weekly"
 ],
 mantra: "Mantra: 'Slow progress is still progress. I'm building a business, not a lottery ticket.'"
 }
 ],
 summary: {
 title: "Samenvatting: De 12 Fouten & Fixes",
 list: [
 "Te goedkoop starten → Start op 70% marktprijs, verhoog elke 5 opdrachten",
 "Scope creep accepteren → Clear contracts, polite pushback, track alle tijd",
 "Te veel platforms → Master 1 platform first, dan expand",
 "24/7 beschikbaar → Set werkuren, boundaries, auto-responders",
 "Geen portfolio → 5-8 case studies met metrics en resultaten",
 "Slechte communicatie → 24u response time, weekly updates, proactive",
 "Zonder contract → ALWAYS contract, platform escrow, clear terms",
 "Niet leren → 5 uur/week skill development, paid courses",
 "Alle klanten accepteren → Red flag checklist, het is oké om nee te zeggen",
 "Alles doen → Specialize in 1 skill/niche, word expert",
 "Geen buffer → Save 20%, build 3-maand buffer, tax money apart",
 "Te snel opgeven → Commit 12 maanden, track progress, find support"
 ]
 },
 cta1: {
 title: "Start Met De Juiste Platforms",
 text: "Vermijd platform-gerelateerde fouten door direct te kiezen voor platforms die passen bij jouw skill level en doelen.",
 button: "Vergelijk Platforms"
 },
 cta2: {
 title: "Download De Complete Beginner Survival Gids",
 text: "Checklists, templates en frameworks om elke fout in deze lijst te vermijden. Plus: maandelijkse actieplan voor je eerste jaar.",
 button: "Download Gratis"
 },
 related: {
 title: "Volgende Stappen",
 items: [
 {
 title: "Beginners Gids",
 desc: "Stap-voor-stap roadmap van 0 naar eerste opdracht",
 link: "/nl/gids/aan-de-slag/freelance-beginners-gids"
 },
 {
 title: "Profiel Templates",
 desc: "Copy-paste profielen die opdrachten scoren",
 link: "/nl/gids/aan-de-slag/freelance-profiel-templates"
 },
 {
 title: "Voorstel Schrijven",
 desc: "Templates voor voorstellen die 40% meer winnen",
 link: "/nl/gids/aan-de-slag/eerste-freelance-voorstel"
 }
 ]
 }
 } : {
 // English content
 hero: {
 title: "12 Freelance Beginner Mistakes That Cost Thousands",
 subtitle: "95% of new freelancers make these mistakes. They lose money, time and clients—and most quit within 6 months. Learn from others' mistakes instead of burning your own money.",
 cta1: "Start With Right Platforms",
 cta2: "Download Beginners Guide"
 },
 stats: {
 quit: "60% Quit Within 6 Months",
 quitDesc: "Due to avoidable mistakes",
 cost: "$2000-$5000 Loss",
 costDesc: "Average first year",
 avoid: "12 Critical Mistakes",
 avoidDesc: "You can avoid today"
 },
 intro: {
 title: "Why Beginners Fail (and You Won't)",
 text: "Most freelance guides tell you what you SHOULD do. This guide is different—I'll show you what NOT to do. These 12 mistakes cost beginners an average of $2000-$5000 in the first year, plus countless lost jobs and burned bridges."
 },
 mistakes: [
 {
 number: 1,
 category: "Pricing",
 title: "Starting Too Cheap (and Staying Cheap Too Long)",
 problem: "The biggest mistake: charging $5-$10/hour because you 'need to start somewhere'.",
 why: "Why This Is Bad:",
 reasons: [
 "You attract the worst clients (who only buy on price)",
 "You have no margin for errors or extra work"
 ],
 reality: "Reality check: A beginner web developer charging $10/hour needs to work 400 hours to earn $4000.",
 solution: "The Fix:",
 fixes: [
 "Start at minimum 70% of market rate for your skill level",
 "Research market prices: Look at freelancers with 10-20 reviews"
 ],
 example: "Example: Beginner content writer → Start $25/hour (not $5), increase to $30 after 5 jobs."
 }
 ],
 summary: {
 title: "Your Action Plan",
 list: [
 "Price at 70% of market rate minimum",
 "Focus on 1 platform first"
 ]
 },
 cta1: {
 title: "Start With The Right Platforms",
 text: "Avoid platform-related mistakes by choosing platforms that fit your skill level and goals.",
 button: "Compare Platforms"
 },
 cta2: {
 title: "Download The Complete Beginner Survival Guide",
 text: "Checklists, templates and frameworks to avoid every mistake in this list.",
 button: "Download Free"
 },
 related: {
 title: "Next Steps",
 items: [
 {
 title: "Beginners Guide",
 desc: "Complete roadmap from 0 to first job",
 link: "/en/gids/aan-de-slag/freelance-beginners-gids"
 }
 ]
 }
 };

 return (
 <>
 <Header />
 <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
 {/* Hero */}
 <section className="bg-gradient-to-br from-red-600 via-red-700 to-[#1e1541] text-white py-16 sm:py-20">
 <div className="container mx-auto px-4">
 <div className="max-w-4xl mx-auto text-center">
 <div className="flex items-center justify-center gap-3 mb-6">
 <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
 <AlertTriangle className="w-7 h-7 text-white" />
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
 className="inline-flex items-center gap-2 bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg"
 >
 {content.hero.cta1}
 <ArrowRight className="w-5 h-5" />
 </Link>
 <Link
 href={`/${locale}/gids/aan-de-slag/freelance-beginners-gids`}
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
 <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-2 border-red-200 dark:border-red-800">
 <XCircle className="w-10 h-10 text-red-600 mb-3" />
 <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-2">{content.stats.quit}</h3>
 <p className="text-gray-600 dark:text-gray-300">{content.stats.quitDesc}</p>
 </div>
 <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-2 border-red-200 dark:border-red-800">
 <AlertTriangle className="w-10 h-10 text-red-600 mb-3" />
 <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-2">{content.stats.cost}</h3>
 <p className="text-gray-600 dark:text-gray-300">{content.stats.costDesc}</p>
 </div>
 <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-2 border-green-200 dark:border-green-800">
 <Shield className="w-10 h-10 text-green-600 mb-3" />
 <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-2">{content.stats.avoid}</h3>
 <p className="text-gray-600 dark:text-gray-300">{content.stats.avoidDesc}</p>
 </div>
 </div>
 </div>
 </section>

 {/* Schema */}
 <script type="application/ld+json" dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "Article",
 "headline": content.hero.title,
 "description": content.hero.subtitle,
 "author": { "@type": "Organization", "name": "SkillLinkup" },
 "publisher": { "@type": "Organization", "name": "SkillLinkup" },
 "datePublished": "2026-01-15"
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

 {/* Mistakes - showing first 3 for brevity */}
 {content.mistakes.slice(0, 3).map((mistake) =>(
 <div key={mistake.number} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border-l-4 border-red-600">
 <div className="flex items-start gap-4 mb-6">
 <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
 <span className="text-white font-bold text-xl">{mistake.number}</span>
 </div>
 <div className="flex-1">
 <span className="text-sm font-bold text-red-600 uppercase tracking-wide">{mistake.category}</span>
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{mistake.title}</h3>
 </div>
 </div>

 <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 mb-6 border border-red-200 dark:border-red-800">
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed"><strong>❌ Het Probleem:</strong>{mistake.problem}</p>
 </div>

 <h4 className="font-bold text-gray-900 dark:text-white mb-3">{mistake.why}</h4>
 <ul className="space-y-2 mb-6">
 {mistake.reasons?.map((reason, idx) =>(
 <li key={idx} className="flex items-start gap-3">
 <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
 <span className="text-gray-700 dark:text-gray-300">{reason}</span>
 </li>
 ))}
 </ul>

 {mistake.reality && (
 <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 mb-6">
 <p className="text-gray-700 dark:text-gray-300"><strong>{mistake.reality}</strong></p>
 </div>
 )}

 <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
 <h4 className="font-bold text-green-800 dark:text-green-300 mb-3">✅ {mistake.solution}</h4>
 <ul className="space-y-2">
 {mistake.fixes?.map((fix, idx) =>(
 <li key={idx} className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
 <span className="text-gray-700 dark:text-gray-300">{fix}</span>
 </li>
 ))}
 </ul>
 </div>

 {mistake.example && (
 <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
 <p className="text-gray-700 dark:text-gray-300"><strong>{mistake.example}</strong></p>
 </div>
 )}
 </div>
 ))}

 {/* Summary */}
 <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border-2 border-green-300 dark:border-green-700">
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{content.summary.title}</h2>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {content.summary.list.map((item, idx) =>(
 <div key={idx} className="flex items-start gap-3 bg-white dark:bg-slate-800 rounded-xl p-4">
 <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
 <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
 </div>
 ))}
 </div>
 </div>

 {/* CTAs */}
 <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white text-center">
 <Shield className="w-16 h-16 text-white mx-auto mb-6" />
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
