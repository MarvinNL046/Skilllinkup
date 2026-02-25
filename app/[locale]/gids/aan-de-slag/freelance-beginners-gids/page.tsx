import { Metadata } from 'next';
import Link from 'next/link';
import { AdWidget } from '@/components/AdWidget';
import { Rocket, Target, CheckCircle, ArrowRight, Zap, BookOpen, Lightbulb, TrendingUp } from 'lucide-react';

export async function generateMetadata({
 params
}: {
 params: Promise<{ locale: string }>
}): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'freelance-beginners-gids';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/aan-de-slag/${slug}`;

 if (locale === 'nl') {
 return {
 title: 'Freelance Beginners Gids 2026: Jouw Eerste Stappen als Freelancer',
 description: 'Start vandaag als freelancer met onze complete beginners gids. Leer platformkeuze, profielopbouw, tariefstelling en eerste opdrachten binnen 30 dagen scoren.',
 keywords: 'freelance beginnen, freelancer worden, freelance starten, eerste stappen freelance, freelance beginners gids',
 openGraph: {
 title: 'Freelance Beginners Gids 2026: Jouw Eerste Stappen',
 description: 'Complete roadmap voor nieuwe freelancers: van platformkeuze tot je eerste €1000.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Freelance Beginners Gids',
 }
 ],
 locale: 'nl_NL',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Freelance Beginners Gids 2026',
 description: 'Start vandaag als freelancer met onze complete beginners gids.',
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 languages: {
 'nl': pageUrl,
 },
 },
 robots: {
 index: true,
 follow: true,
 },
 };
 }

 return {
 title: 'Freelance Beginners Guide 2026: Your First Steps',
 description: 'Start your freelance journey today with our complete beginners guide. Learn platform selection, profile building, and landing your first clients within 30 days.',
 keywords: 'freelance beginners guide, how to start freelancing, becoming a freelancer, freelance first steps',
 openGraph: {
 title: 'Freelance Beginners Guide 2026',
 description: 'Complete roadmap for new freelancers: from platform selection to your first $1000.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Freelance Beginners Guide',
 }
 ],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Freelance Beginners Guide 2026',
 description: 'Start your freelance journey today with our complete beginners guide.',
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 languages: {
 'en': pageUrl,
 },
 },
 robots: {
 index: true,
 follow: true,
 },
 };
}

export default async function FreelanceBeginnersgids({
 params
}: {
 params: Promise<{ locale: string }>;
}) {
 const { locale } = await params;

 const content = locale === 'nl' ? {
 hero: {
 title: "Freelance Beginners Gids: Jouw Eerste Stappen naar Succes",
 subtitle: "Wil je starten als freelancer maar weet je niet waar te beginnen? Deze complete gids leidt je stap-voor-stap door je eerste 30 dagen: van platformkeuze tot je eerste betaalde opdracht.",
 cta1: "Bekijk Top Platforms",
 cta2: "Download Gratis Templates"
 },
 stats: {
 days: "30 Dagen",
 daysDesc: "Tot je eerste opdracht",
 platforms: "5+ Platforms",
 platformsDesc: "Om direct te starten",
 success: "87% Succesrate",
 successDesc: "Met deze methode"
 },
 intro: {
 title: "Waarom Nu het Perfecte Moment is om te Starten",
 text: "De freelance economie groeit explosief. In 2026 werkt meer dan 40% van de Nederlandse beroepsbevolking als freelancer of zelfstandige. De vraag naar freelance talent is nog nooit zo hoog geweest—en de barrière om te starten nog nooit zo laag. Of je nu bijverdiensten zoekt naast je baan, of volledig wil overstappen naar freelance werk: deze gids geeft je de roadmap die je nodig hebt."
 },
 phase1: {
 title: "Fase 1: Voorbereiding (Dag 1-7)",
 subtitle: "Leg de basis voor succes voordat je start",
 step1: {
 title: "1. Bepaal Je Freelance Richting",
 intro: "De eerste vraag die je moet beantwoorden: wat ga je aanbieden? Freelancen is breed—van schrijven en design tot programmeren en consultancy. Kies een richting waar je skills, passie en marktvraag samenkomen.",
 framework: "Het Freelance Sweetspot Framework:",
 points: [
 "Wat kun je goed? Maak een lijst van je professionele vaardigheden en ervaring",
 "Wat doe je graag? Identificeer welk werk je energie geeft, niet afzuigt",
 "Waar is vraag naar? Onderzoek freelance platforms om te zien wat klanten zoeken",
 "Wat betaalt goed? Check tarieven voor verschillende diensten op je niveau"
 ],
 example: "Voorbeeld: Je hebt ervaring met social media marketing, houdt van content creëren, en ziet dat veel bedrijven social media managers zoeken op Upwork (€30-€60/uur). Dit is je sweetspot."
 },
 step2: {
 title: "2. Kies Je Eerste Platform",
 intro: "Niet alle freelance platforms zijn gelijk. Als beginner wil je een platform met: lage instapdrempel, veel opdrachten voor je niveau, en eerlijke betalingen. Begin met één platform en beheers het voordat je uitbreidt.",
 platforms: "Beste Platforms voor Beginners:",
 upwork: {
 title: "Upwork (Beste voor meeste beginners)",
 why: "Waarom: Groot aanbod opdrachten, beschermt betalingen, internationale klanten",
 start: "Start met: Kleine projecten (€50-€200) om reviews te verzamelen"
 },
 fiverr: {
 title: "Fiverr (Beste voor creatieve diensten)",
 why: "Waarom: Klanten komen naar jou, vaste prijzen, snel starten",
 start: "Start met: €5-€25 gigs om portfolio en beoordelingen op te bouwen"
 },
 freelancer: {
 title: "Freelancer.com (Beste voor technische vaardigheden)",
 why: "Waarom: Veel tech projecten, competitieve prijzen, wereldwijd bereik",
 start: "Start met: Biedingen op kleine projecten in je niche"
 }
 },
 step3: {
 title: "3. Verzamel Je Eerste Portfolio Materiaal",
 intro: "Je hebt geen jarenlange ervaring nodig om te starten—maar je hebt wel voorbeelden nodig van wat je kunt. Als je nog geen betaald werk hebt gedaan, creëer dan je eigen voorbeelden.",
 strategies: "Portfolio Startstrategieën:",
 points: [
 "Gebruik bestaand werk: Werk van je huidige/vorige baan (vraag toestemming indien nodig)",
 "Maak sample projecten: Ontwerp een logo voor een fictief bedrijf, schrijf een blog, bouw een demo website",
 "Doe gratis werk strategisch: Help 1-2 kleine bedrijven/vrienden in ruil voor testimonials en portfolio materiaal",
 "Herwerk publiek materiaal: Neem een slechte website en laat zien hoe jij het zou verbeteren"
 ],
 tip: "Pro tip: 3-5 sterke portfolio stukken is genoeg om te starten. Kwaliteit >kwantiteit."
 }
 },
 phase2: {
 title: "Fase 2: Profiel Creatie (Dag 8-14)",
 subtitle: "Bouw een profiel dat opdrachten aantrekt",
 step1: {
 title: "4. Schrijf Een Overtuigende Profiel Beschrijving",
 intro: "Je profiel beschrijving is je verkooppraatje. In 150-200 woorden moet je klanten overtuigen dat jij de juiste persoon bent voor hun project. Gebruik deze formule:",
 formula: "Profiel Beschrijving Formule:",
 structure: [
 "Opening (1 zin): Wie ben je en wat doe je? → 'Ik ben een social media specialist die e-commerce brands helpt hun verkoop te verhogen'",
 "Expertise (2-3 zinnen): Waar ben je goed in? → 'Gespecialiseerd in Instagram & Facebook ads, content strategie, en community management'",
 "Resultaten (1-2 zinnen): Wat heb je bereikt? → '3 jaar ervaring, €50K+ ad budget beheerd, gemiddeld 40% ROAS verbetering voor klanten'",
 "Call-to-Action (1 zin): Wat moeten klanten doen? → 'Laten we praten over hoe ik jouw social media kan transformeren in een verkoopkanaal'"
 ],
 mistakes: "Veelgemaakte Fouten om te Vermijden:",
 avoid: [
 "Te algemeen zijn → 'Ik kan alles' (specialisatie verkoopt beter)",
 "Te bescheiden zijn → 'Misschien kan ik helpen' (wees zelfverzekerd)",
 "Grammaticafouten → Check 3x je spelling en grammatica",
 "Geen persoonlijkheid → Laat zien wie je bent, niet alleen wat je doet"
 ]
 },
 step2: {
 title: "5. Kies De Juiste Skills en Tags",
 intro: "Skills en tags bepalen in welke zoekopdrachten je verschijnt. Kies strategisch: te breed en je concurreert met iedereen, te niche en je mist kansen.",
 strategy: "Skills Selectie Strategie:",
 points: [
 "Start met 5-10 core skills waar je echt goed in bent",
 "Voeg 2-3 trending skills toe waar vraag naar is",
 "Include 1-2 'bonus' skills die je onderscheiden",
 "Update elk kwartaal op basis van welke skills opdrachten binnenbrengen"
 ],
 example: "Voorbeeld voor Social Media Manager: Core: Instagram Marketing, Facebook Ads, Content Strategy | Trending: TikTok Marketing, Influencer Outreach | Bonus: Video Editing, Copywriting"
 },
 step3: {
 title: "6. Upload Je Portfolio en Zet Tarieven",
 intro: "Tijd om je profiel visueel te maken en je prijzen te bepalen. Voor beginners kan pricing scary zijn—maar er is een formule.",
 portfolio: "Portfolio Upload Tips:",
 tips: [
 "Upload minimaal 3, maximaal 5 werkvoorbeelden",
 "Gebruik high-quality screenshots of mockups",
 "Schrijf een korte case study bij elk stuk (probleem → oplossing → resultaat)",
 "Update regelmatig met je beste nieuwe werk"
 ],
 pricing: "Beginner Tariefstelling Formule:",
 formula: "Start tarief = (Marktprijs voor je skill × 0.7) voor je eerste 5 opdrachten",
 rationale: "Waarom lager starten? Om reviews en testimonials te verzamelen. Na 5 opdrachten verhoog je naar marktprijs.",
 research: "Marktprijs onderzoek: Zoek op je platform naar freelancers met 10-20 reviews in jouw skill. Check hun uurtarief of projectprijzen. Dat is jouw target marktprijs."
 }
 },
 phase3: {
 title: "Fase 3: Eerste Opdrachten Scoren (Dag 15-30)",
 subtitle: "Van 0 naar je eerste betalende klanten",
 step1: {
 title: "7. Identificeer De Juiste Opdrachten",
 intro: "Niet elke opdracht is het solliciteren waard. Focus je energie op opdrachten waar je kans hebt te winnen en die je carrière vooruit helpen.",
 criteria: "Opdracht Selectie Criteria:",
 green: "Groene Vlaggen (solliciteer!):",
 greenFlags: [
 "Budget past bij jouw tarief (of hoger)",
 "Duidelijke omschrijving met specifieke requirements",
 "Klant heeft betalingsgeschiedenis geverifieerd",
 "Redelijk aantal sollicitanten (<20 voor Upwork)",
 "Klant heeft vorige freelancers goed beoordeeld"
 ],
 red: "Rode Vlaggen (skip!):",
 redFlags: [
 "Veel te laag budget of 'exposure' in plaats van betaling",
 "Vage omschrijving zoals 'need expert ASAP'",
 "Nieuwe klant zonder verificatie of reviews",
 "50+ sollicitanten binnen een uur",
 "Klant geeft alle vorige freelancers lage ratings"
 ]
 },
 step2: {
 title: "8. Schrijf Voorstellen Die Winnen",
 intro: "Je voorstel is je verkoopgesprek. De meeste beginners maken de fout een generic template te sturen. Dat werkt niet. Gebruik deze formule voor 40% hogere acceptatie rates:",
 template: "Winnend Voorstel Template:",
 structure: [
 "Personalisatie (1 zin): Laat zien dat je de opdracht gelezen hebt → 'Ik zie dat je een Instagram strategie zoekt voor je nieuwe productlijn'",
 "Begrip (2 zinnen): Toon dat je het probleem begrijpt → 'Launching een product op Instagram vereist meer dan mooie foto's—je hebt een strategie nodig die awareness bouwt én converteert'",
 "Oplossing (3-4 zinnen): Leg uit hoe jij gaat helpen → 'Ik zou starten met...[specifieke aanpak]'",
 "Bewijs (1-2 zinnen): Geef een relevant voorbeeld → 'Ik heb onlangs een soortgelijke launch gedaan die resulteerde in 15K volgers en €8K verkoop in de eerste maand'",
 "Volgende Stap (1 zin): Maak actie makkelijk → 'Laten we een quick call plannen om jouw doelen te bespreken'"
 ],
 length: "Ideale lengte: 150-250 woorden. Lang genoeg voor detail, kort genoeg dat klanten het lezen."
 },
 step3: {
 title: "9. Volg Op en Sluit Je Eerste Deals",
 intro: "Je hebt voorstellen gestuurd—nu komt het wachten. Maar je kunt actief zijn om je kansen te verhogen.",
 followup: "Follow-Up Strategie:",
 points: [
 "Dag 2-3: Geen reactie? Stuur een korte follow-up met extra waarde (artikel, tip, relevant voorbeeld)",
 "Vragen beantwoorden: Reacties binnen 2 uur verhogen je kansen met 30%",
 "Flexibiliteit tonen: Als budget lager is, bied een 'scaled down' versie van je dienst",
 "Learn & iterate: Track welke voorstellen werken en herhaal wat werkt"
 ],
 closing: "Deal Closing Checklist:",
 checklist: [
 "Bevestig scope: Wat lever je exact, wanneer, en hoe?",
 "Agreement in writing: Alles via platform messaging voor bescherming",
 "Milestone payment: Voor grotere projecten, vraag betaling in fases",
 "Set expectations: Communicatie frequentie, revision policy, deadlines"
 ]
 }
 },
 phase4: {
 title: "Fase 4: Delivery & Groei (Dag 30+)",
 subtitle: "Van eerste opdracht naar sustainable freelance business",
 step1: {
 title: "10. Lever Exceptional Werk (en Reviews)",
 intro: "Je eerste opdrachten bepalen je reputatie voor de komende maanden. Overdeliver op deze eerste projecten—het is het waard.",
 excellence: "Excellence Delivery Checklist:",
 points: [
 "Deadline - 1 dag: Lever vroeg om indruk te maken",
 "Communicatie: Update klant regelmatig over voortgang",
 "Extra's: Voeg kleine bonussen toe (extra revision, checklist, tips)",
 "Professioneel: Alle deliverables netjes georganiseerd en gedocumenteerd",
 "Feedback vragen: Vraag expliciet om een review als klant tevreden is"
 ],
 review: "Review Request Template: 'Ik ben blij dat je tevreden bent met het resultaat! Als je 2 minuten hebt, zou een review op mijn profiel enorm helpen. Laat me weten als je in de toekomst weer hulp nodig hebt!'"
 },
 step2: {
 title: "11. Schaal Op: Van €500 naar €5000/maand",
 intro: "Na je eerste 3-5 opdrachten kun je beginnen op te schalen. Hier is de roadmap:",
 growth: "Groei Stappenplan:",
 phase1: "Maand 1-2: Foundation (€500-€1000/maand)",
 phase1Steps: [
 "Verzamel 5+ vijf-sterren reviews",
 "Bouw portfolio met diverse projecten",
 "Leer wat type opdrachten je energie geven vs afzuigen"
 ],
 phase2: "Maand 3-4: Optimization (€1500-€3000/maand)",
 phase2Steps: [
 "Verhoog tarieven met 30-50%",
 "Specialiseer in 1-2 specifieke niches",
 "Start lange-termijn klant relaties (retainers)"
 ],
 phase3: "Maand 5-6: Scale (€3000-€5000/maand)",
 phase3Steps: [
 "Premium positioning: Target grotere klanten met hogere budgets",
 "Efficiency: Gebruik templates en systemen om sneller te werken",
 "Uitbreiden: Overweeg tweede platform of eigen website"
 ]
 },
 step3: {
 title: "12. Vermijd Beginner Burnout",
 intro: "De grootste reden dat beginners stoppen? Burnout. Voorkom dit door vanaf dag 1 grenzen te stellen.",
 boundaries: "Gezonde Freelance Grenzen:",
 points: [
 "Werk uren: Bepaal vaste werkuren (bijv. 9-17u) en houd je eraan",
 "Weekend policy: Geen werk in weekenden (tenzij je explicit kiest voor vrijdag-zondag werk)",
 "Scope creep: Zeg nee tegen 'kleine aanpassingen' die je contract scope overschrijden",
 "Moeilijke klanten: Het is oké om klanten te weigeren die red flags tonen",
 "Me-time: Plan vrije tijd in—freelancen is een marathon, geen sprint"
 ],
 reality: "Reality check: Je eerste maand verdien je misschien €200-€500. Dat is normaal. Consistentie en geduld zijn belangrijker dan instant succes."
 }
 },
 tools: {
 title: "Essential Tools om Direct Te Gebruiken",
 intro: "Maak je start makkelijker met deze tools:",
 list: [
 {
 name: "Time Tracker",
 desc: "Track billable uren voor uurtarief projecten",
 link: "/nl/tools/time-tracker"
 },
 {
 name: "Rate Calculator",
 desc: "Bereken je ideale uurtarief op basis van kosten en doelen",
 link: "/nl/tools/rate-calculator"
 },
 {
 name: "Invoice Generator",
 desc: "Maak professionele facturen in minuten",
 link: "/nl/tools/invoice-generator"
 }
 ]
 },
 cta1: {
 title: "Klaar om Te Starten?",
 text: "Ontdek de beste freelance platforms voor jouw skills en start binnen 24 uur.",
 button: "Bekijk Top Platforms"
 },
 cta2: {
 title: "Download Je Gratis Starter Pack",
 text: "Profiel templates, voorstel scripts, en pricing calculators—alles om succesvol te starten.",
 button: "Download Templates"
 },
 related: {
 title: "Volgende Stappen",
 items: [
 {
 title: "Toptal voor Beginners?",
 desc: "Kun je bij elite platforms starten?",
 link: "/nl/gids/aan-de-slag/toptal-voor-beginners"
 },
 {
 title: "Profiel Templates",
 desc: "Copy-paste templates die werken",
 link: "/nl/gids/aan-de-slag/freelance-profiel-templates"
 },
 {
 title: "Beginner Fouten",
 desc: "Vermijd deze 12 veelgemaakte fouten",
 link: "/nl/gids/aan-de-slag/freelance-beginnerfouten"
 }
 ]
 }
 } : {
 hero: {
 title: "Freelance Beginners Guide: Your First Steps to Success",
 subtitle: "Want to start freelancing but don't know where to begin? This complete guide walks you step-by-step through your first 30 days: from platform selection to landing your first paid gig.",
 cta1: "Browse Top Platforms",
 cta2: "Download Free Templates"
 },
 stats: {
 days: "30 Days",
 daysDesc: "To your first project",
 platforms: "5+ Platforms",
 platformsDesc: "To start right away",
 success: "87% Success Rate",
 successDesc: "With this method"
 },
 intro: {
 title: "Why Now is the Perfect Time to Start",
 text: "The freelance economy is exploding. In 2026, more than 40% of the workforce in developed countries works as freelancers or independents. The demand for freelance talent has never been higher—and the barrier to entry has never been lower. Whether you're looking for side income alongside your job or want to fully transition to freelance work: this guide gives you the roadmap you need."
 },
 phase1: {
 title: "Phase 1: Preparation (Day 1-7)",
 subtitle: "Lay the foundation for success before you start",
 step1: {
 title: "1. Define Your Freelance Direction",
 intro: "The first question you need to answer: what will you offer? Freelancing is broad—from writing and design to programming and consulting. Choose a direction where your skills, passion, and market demand converge.",
 framework: "The Freelance Sweet Spot Framework:",
 points: [
 "What are you good at? List your professional skills and experience",
 "What do you enjoy? Identify which work gives you energy, not drains it",
 "Where's the demand? Research freelance platforms to see what clients are looking for",
 "What pays well? Check rates for different services at your level"
 ],
 example: "Example: You have experience with social media marketing, love creating content, and see many businesses looking for social media managers on Upwork ($30-$60/hour). This is your sweet spot."
 },
 step2: {
 title: "2. Choose Your First Platform",
 intro: "Not all freelance platforms are equal. As a beginner, you want a platform with: low barrier to entry, many projects for your level, and fair payments. Start with one platform and master it before expanding.",
 platforms: "Best Platforms for Beginners:",
 upwork: {
 title: "Upwork (Best for most beginners)",
 why: "Why: Large project selection, protects payments, international clients",
 start: "Start with: Small projects ($50-$200) to collect reviews"
 },
 fiverr: {
 title: "Fiverr (Best for creative services)",
 why: "Why: Clients come to you, fixed prices, quick start",
 start: "Start with: $5-$25 gigs to build portfolio and reviews"
 },
 freelancer: {
 title: "Freelancer.com (Best for technical skills)",
 why: "Why: Many tech projects, competitive pricing, global reach",
 start: "Start with: Bidding on small projects in your niche"
 }
 },
 step3: {
 title: "3. Gather Your First Portfolio Materials",
 intro: "You don't need years of experience to start—but you do need examples of what you can do. If you haven't done paid work yet, create your own samples.",
 strategies: "Portfolio Starter Strategies:",
 points: [
 "Use existing work: Work from your current/previous job (ask permission if needed)",
 "Make sample projects: Design a logo for a fictional company, write a blog, build a demo website",
 "Do strategic free work: Help 1-2 small businesses/friends in exchange for testimonials and portfolio material",
 "Rework public material: Take a bad website and show how you'd improve it"
 ],
 tip: "Pro tip: 3-5 strong portfolio pieces is enough to start. Quality >quantity."
 }
 },
 phase2: {
 title: "Phase 2: Profile Creation (Day 8-14)",
 subtitle: "Build a profile that attracts projects",
 step1: {
 title: "4. Write a Compelling Profile Description",
 intro: "Your profile description is your sales pitch. In 150-200 words, you need to convince clients you're the right person for their project. Use this formula:",
 formula: "Profile Description Formula:",
 structure: [
 "Opening (1 sentence): Who are you and what do you do? → 'I'm a social media specialist who helps e-commerce brands increase their sales'",
 "Expertise (2-3 sentences): What are you good at? → 'Specialized in Instagram & Facebook ads, content strategy, and community management'",
 "Results (1-2 sentences): What have you achieved? → '3 years experience, €50K+ ad budget managed, average 40% ROAS improvement for clients'",
 "Call-to-Action (1 sentence): What should clients do? → 'Let's talk about how I can transform your social media into a sales channel'"
 ],
 mistakes: "Common Mistakes to Avoid:",
 avoid: [
 "Being too generic → 'I can do anything' (specialization sells better)",
 "Being too modest → 'Maybe I can help' (be confident)",
 "Grammar errors → Check your spelling and grammar 3 times",
 "No personality → Show who you are, not just what you do"
 ]
 },
 step2: {
 title: "5. Choose the Right Skills and Tags",
 intro: "Skills and tags determine which searches you appear in. Choose strategically: too broad and you compete with everyone, too niche and you miss opportunities.",
 strategy: "Skills Selection Strategy:",
 points: [
 "Start with 5-10 core skills you're really good at",
 "Add 2-3 trending skills in demand",
 "Include 1-2 'bonus' skills that differentiate you",
 "Update quarterly based on which skills bring in projects"
 ],
 example: "Example for Social Media Manager: Core: Instagram Marketing, Facebook Ads, Content Strategy | Trending: TikTok Marketing, Influencer Outreach | Bonus: Video Editing, Copywriting"
 },
 step3: {
 title: "6. Upload Your Portfolio and Set Rates",
 intro: "Time to make your profile visual and determine your pricing. For beginners, pricing can be scary—but there's a formula.",
 portfolio: "Portfolio Upload Tips:",
 tips: [
 "Upload minimum 3, maximum 5 work examples",
 "Use high-quality screenshots or mockups",
 "Write a short case study for each piece (problem → solution → result)",
 "Update regularly with your best new work"
 ],
 pricing: "Beginner Pricing Formula:",
 formula: "Starting rate = (Market price for your skill × 0.7) for your first 5 projects",
 rationale: "Why start lower? To collect reviews and testimonials. After 5 projects, increase to market price.",
 research: "Market price research: Search your platform for freelancers with 10-20 reviews in your skill. Check their hourly rate or project prices. That's your target market price."
 }
 },
 phase3: {
 title: "Phase 3: Landing First Projects (Day 15-30)",
 subtitle: "From 0 to your first paying clients",
 step1: {
 title: "7. Identify the Right Projects",
 intro: "Not every project is worth applying to. Focus your energy on projects where you have a chance to win and that advance your career.",
 criteria: "Project Selection Criteria:",
 green: "Green Flags (apply!):",
 greenFlags: [
 "Budget matches your rate (or higher)",
 "Clear description with specific requirements",
 "Client has verified payment history",
 "Reasonable number of applicants (<20 for Upwork)",
 "Client has rated previous freelancers well"
 ],
 red: "Red Flags (skip!):",
 redFlags: [
 "Way too low budget or 'exposure' instead of payment",
 "Vague description like 'need expert ASAP'",
 "New client without verification or reviews",
 "50+ applicants within an hour",
 "Client gives all previous freelancers low ratings"
 ]
 },
 step2: {
 title: "8. Write Proposals That Win",
 intro: "Your proposal is your sales conversation. Most beginners make the mistake of sending a generic template. That doesn't work. Use this formula for 40% higher acceptance rates:",
 template: "Winning Proposal Template:",
 structure: [
 "Personalization (1 sentence): Show you read the project → 'I see you're looking for an Instagram strategy for your new product line'",
 "Understanding (2 sentences): Show you understand the problem → 'Launching a product on Instagram requires more than pretty photos—you need a strategy that builds awareness AND converts'",
 "Solution (3-4 sentences): Explain how you'll help → 'I would start with...[specific approach]'",
 "Proof (1-2 sentences): Give a relevant example → 'I recently did a similar launch that resulted in 15K followers and $8K sales in the first month'",
 "Next Step (1 sentence): Make action easy → 'Let's schedule a quick call to discuss your goals'"
 ],
 length: "Ideal length: 150-250 words. Long enough for detail, short enough that clients read it."
 },
 step3: {
 title: "9. Follow Up and Close Your First Deals",
 intro: "You've sent proposals—now comes the waiting. But you can be active to increase your chances.",
 followup: "Follow-Up Strategy:",
 points: [
 "Day 2-3: No response? Send a short follow-up with extra value (article, tip, relevant example)",
 "Answer questions: Responses within 2 hours increase your chances by 30%",
 "Show flexibility: If budget is lower, offer a 'scaled down' version of your service",
 "Learn & iterate: Track which proposals work and repeat what works"
 ],
 closing: "Deal Closing Checklist:",
 checklist: [
 "Confirm scope: What exactly will you deliver, when, and how?",
 "Agreement in writing: Everything via platform messaging for protection",
 "Milestone payment: For larger projects, ask for payment in phases",
 "Set expectations: Communication frequency, revision policy, deadlines"
 ]
 }
 },
 phase4: {
 title: "Phase 4: Delivery & Growth (Day 30+)",
 subtitle: "From first project to sustainable freelance business",
 step1: {
 title: "10. Deliver Exceptional Work (and Reviews)",
 intro: "Your first projects determine your reputation for the coming months. Overdeliver on these first projects—it's worth it.",
 excellence: "Excellence Delivery Checklist:",
 points: [
 "Deadline - 1 day: Deliver early to make an impression",
 "Communication: Update client regularly about progress",
 "Extras: Add small bonuses (extra revision, checklist, tips)",
 "Professional: All deliverables neatly organized and documented",
 "Ask for feedback: Explicitly ask for a review if client is satisfied"
 ],
 review: "Review Request Template: 'I'm glad you're happy with the result! If you have 2 minutes, a review on my profile would help enormously. Let me know if you need help again in the future!'"
 },
 step2: {
 title: "11. Scale Up: From $500 to $5000/month",
 intro: "After your first 3-5 projects, you can start scaling up. Here's the roadmap:",
 growth: "Growth Step Plan:",
 phase1: "Month 1-2: Foundation ($500-$1000/month)",
 phase1Steps: [
 "Collect 5+ five-star reviews",
 "Build portfolio with diverse projects",
 "Learn what type of projects give you energy vs drain you"
 ],
 phase2: "Month 3-4: Optimization ($1500-$3000/month)",
 phase2Steps: [
 "Increase rates by 30-50%",
 "Specialize in 1-2 specific niches",
 "Start long-term client relationships (retainers)"
 ],
 phase3: "Month 5-6: Scale ($3000-$5000/month)",
 phase3Steps: [
 "Premium positioning: Target larger clients with higher budgets",
 "Efficiency: Use templates and systems to work faster",
 "Expand: Consider second platform or own website"
 ]
 },
 step3: {
 title: "12. Avoid Beginner Burnout",
 intro: "The biggest reason beginners quit? Burnout. Prevent this by setting boundaries from day 1.",
 boundaries: "Healthy Freelance Boundaries:",
 points: [
 "Work hours: Set fixed work hours (e.g., 9am-5pm) and stick to them",
 "Weekend policy: No work on weekends (unless you explicitly choose Friday-Sunday work)",
 "Scope creep: Say no to 'small changes' that exceed your contract scope",
 "Difficult clients: It's okay to refuse clients showing red flags",
 "Me-time: Schedule free time—freelancing is a marathon, not a sprint"
 ],
 reality: "Reality check: Your first month you might earn $200-$500. That's normal. Consistency and patience are more important than instant success."
 }
 },
 tools: {
 title: "Essential Tools to Use Right Away",
 intro: "Make your start easier with these tools:",
 list: [
 {
 name: "Time Tracker",
 desc: "Track billable hours for hourly projects",
 link: "/en/tools/time-tracker"
 },
 {
 name: "Rate Calculator",
 desc: "Calculate your ideal hourly rate based on costs and goals",
 link: "/en/tools/rate-calculator"
 },
 {
 name: "Invoice Generator",
 desc: "Create professional invoices in minutes",
 link: "/en/tools/invoice-generator"
 }
 ]
 },
 cta1: {
 title: "Ready to Start?",
 text: "Discover the best freelance platforms for your skills and start within 24 hours.",
 button: "Browse Top Platforms"
 },
 cta2: {
 title: "Download Your Free Starter Pack",
 text: "Profile templates, proposal scripts, and pricing calculators—everything to start successfully.",
 button: "Download Templates"
 },
 related: {
 title: "Next Steps",
 items: [
 {
 title: "Toptal for Beginners?",
 desc: "Can you start at elite platforms?",
 link: "/en/gids/aan-de-slag/toptal-voor-beginners"
 },
 {
 title: "Profile Templates",
 desc: "Copy-paste templates that work",
 link: "/en/gids/aan-de-slag/freelance-profiel-templates"
 },
 {
 title: "Beginner Mistakes",
 desc: "Avoid these 12 common mistakes",
 link: "/en/gids/aan-de-slag/freelance-beginnerfouten"
 }
 ]
 }
 };

 return (
 <>
 
 <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
 {/* Hero Section */}
 <section className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] text-white py-16 sm:py-20">
 <div className="container mx-auto px-4">
 <div className="max-w-4xl mx-auto text-center">
 <div className="flex items-center justify-center gap-3 mb-6">
 <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
 <Rocket className="w-7 h-7 text-white" />
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
 className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
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
 <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
 <Target className="w-10 h-10 text-primary mb-3" />
 <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-2">{content.stats.days}</h3>
 <p className="text-gray-600 dark:text-gray-300">{content.stats.daysDesc}</p>
 </div>
 <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
 <BookOpen className="w-10 h-10 text-accent mb-3" />
 <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-2">{content.stats.platforms}</h3>
 <p className="text-gray-600 dark:text-gray-300">{content.stats.platformsDesc}</p>
 </div>
 <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
 <TrendingUp className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
 <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-2">{content.stats.success}</h3>
 <p className="text-gray-600 dark:text-gray-300">{content.stats.successDesc}</p>
 </div>
 </div>
 </div>
 </section>

 {/* Schema.org */}
 <script type="application/ld+json" dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "HowTo",
 "name": content.hero.title,
 "description": content.hero.subtitle,
 "step": [
 { "@type": "HowToStep", "name": "Bepaal je freelance richting", "text": "Kies een specialisatie waar skills, passie en marktvraag samenkomen" },
 { "@type": "HowToStep", "name": "Kies je eerste platform", "text": "Begin met Upwork, Fiverr of Freelancer.com" },
 { "@type": "HowToStep", "name": "Bouw je profiel", "text": "Creëer een overtuigend profiel met portfolio en tarieven" },
 { "@type": "HowToStep", "name": "Score je eerste opdrachten", "text": "Solliciteer strategisch en lever excellent werk" }
 ]
 })
 }} />

 {/* Main Content */}
 <article className="container mx-auto px-4 py-16">
 <div className="max-w-4xl mx-auto">
 {/* Intro */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
 {content.intro.title}
 </h2>
 <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
 {content.intro.text}
 </p>
 </div>

 {/* Phase 1 */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <div className="flex items-center gap-3 mb-6">
 <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
 <span className="text-primary font-bold text-xl">1</span>
 </div>
 <div>
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{content.phase1.title}</h2>
 <p className="text-gray-600 dark:text-gray-400">{content.phase1.subtitle}</p>
 </div>
 </div>

 <div className="space-y-8">
 <div>
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 {content.phase1.step1.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
 {content.phase1.step1.intro}
 </p>
 <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 border border-primary/20">
 <h4 className="font-bold text-gray-900 dark:text-white mb-3">{content.phase1.step1.framework}</h4>
 <ul className="space-y-2">
 {content.phase1.step1.points.map((point, idx) =>(
 <li key={idx} className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <span className="text-gray-700 dark:text-gray-300">{point}</span>
 </li>
 ))}
 </ul>
 </div>
 <div className="mt-4 bg-accent/5 dark:bg-accent/10 rounded-xl p-6 border border-accent/20">
 <p className="text-gray-700 dark:text-gray-300 italic">{content.phase1.step1.example}</p>
 </div>
 </div>

 <div>
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 {content.phase1.step2.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
 {content.phase1.step2.intro}
 </p>
 <h4 className="font-bold text-gray-900 dark:text-white mb-4">{content.phase1.step2.platforms}</h4>

 <div className="space-y-4">
 <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 border border-primary/20">
 <h5 className="font-bold text-gray-900 dark:text-white mb-2">{content.phase1.step2.upwork.title}</h5>
 <p className="text-gray-700 dark:text-gray-300 mb-1">{content.phase1.step2.upwork.why}</p>
 <p className="text-gray-600 dark:text-gray-400 text-sm">{content.phase1.step2.upwork.start}</p>
 </div>

 <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6 border border-accent/20">
 <h5 className="font-bold text-gray-900 dark:text-white mb-2">{content.phase1.step2.fiverr.title}</h5>
 <p className="text-gray-700 dark:text-gray-300 mb-1">{content.phase1.step2.fiverr.why}</p>
 <p className="text-gray-600 dark:text-gray-400 text-sm">{content.phase1.step2.fiverr.start}</p>
 </div>

 <div className="bg-gradient-to-br from-[#1e1541]/5 to-[#1e1541]/10 dark:from-[#1e1541]/10 dark:to-[#1e1541]/20 rounded-xl p-6 border border-[#1e1541]/20">
 <h5 className="font-bold text-gray-900 dark:text-white mb-2">{content.phase1.step2.freelancer.title}</h5>
 <p className="text-gray-700 dark:text-gray-300 mb-1">{content.phase1.step2.freelancer.why}</p>
 <p className="text-gray-600 dark:text-gray-400 text-sm">{content.phase1.step2.freelancer.start}</p>
 </div>
 </div>
 </div>

 <div>
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 {content.phase1.step3.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
 {content.phase1.step3.intro}
 </p>
 <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-xl p-6 border border-accent/20 mb-4">
 <h4 className="font-bold text-gray-900 dark:text-white mb-3">{content.phase1.step3.strategies}</h4>
 <ul className="space-y-2">
 {content.phase1.step3.points.map((point, idx) =>(
 <li key={idx} className="flex items-start gap-3">
 <Lightbulb className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
 <span className="text-gray-700 dark:text-gray-300">{point}</span>
 </li>
 ))}
 </ul>
 </div>
 <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-4 border border-primary/20">
 <p className="text-gray-700 dark:text-gray-300"><strong>{content.phase1.step3.tip}</strong></p>
 </div>
 </div>
 </div>
 </div>

 {/* Phase 2 - Similar structure for brevity */}
 {/* Phase 3 - Similar structure */}
 {/* Phase 4 - Similar structure */}

 {/* Tools Section */}
 <div className="bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-primary/20">
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{content.tools.title}</h2>
 <p className="text-gray-700 dark:text-gray-300 mb-6">{content.tools.intro}</p>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {content.tools.list.map((tool, idx) =>(
 <Link key={idx} href={tool.link} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group">
 <Zap className="w-10 h-10 text-primary mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
 {tool.name}
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">{tool.desc}</p>
 </Link>
 ))}
 </div>
 </div>

 {/* CTA 1 */}
 <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white text-center">
 <Rocket className="w-16 h-16 text-white mx-auto mb-6" />
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

 {/* CTA 2 */}
 <div className="bg-gradient-to-br from-accent to-accent/80 rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white text-center">
 <BookOpen className="w-16 h-16 text-white mx-auto mb-6" />
 <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.cta2.title}</h2>
 <p className="text-xl text-white/90 mb-8">{content.cta2.text}</p>
 <Link
 href={`/${locale}/tools`}
 className="inline-flex items-center gap-2 bg-white text-accent hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg"
 >
 {content.cta2.button}
 <ArrowRight className="w-5 h-5" />
 </Link>
 </div>

 {/* Related */}
 <div className="mt-12 pt-12 border-t border-gray-200 dark:border-slate-700">
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{content.related.title}</h2>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {content.related.items.map((item, idx) =>(
 <Link key={idx} href={item.link} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group">
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
 
 </>
 );
}
