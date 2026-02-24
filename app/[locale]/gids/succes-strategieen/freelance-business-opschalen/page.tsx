import Link from 'next/link';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata>{
 const { locale } = await params;

 return {
 title: 'Freelance Business Opschalen: Van Solopreneur naar €10K+ per Maand',
 description: 'Leer hoe je van solopreneur naar schaalbare freelance business groeit. Bewezen strategieën voor team building, automatisering, en inkomsten scaling zonder meer uren te werken.',
 keywords: 'freelance business opschalen, solopreneur, team bouwen, automatisering, passief inkomen, freelance groei, schaalbare business',
 openGraph: {
 title: 'Freelance Business Opschalen: Van Solo naar Schaalbaar',
 description: 'Groei van solopreneur naar schaalbare freelance business met team en automatisering',
 type: 'article',
 locale: locale,
 siteName: 'SkillLinkup',
 },
 };
}

export default async function Page({ params }: PageProps) {
 const { locale } = await params;

 const breadcrumbSchema = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 "itemListElement": [
 {
 "@type": "ListItem",
 "position": 1,
 "name": "Home",
 "item": `https://skilllinkup.com/${locale}`
 },
 {
 "@type": "ListItem",
 "position": 2,
 "name": "Gids",
 "item": `https://skilllinkup.com/${locale}/gids`
 },
 {
 "@type": "ListItem",
 "position": 3,
 "name": "Succes Strategieën",
 "item": `https://skilllinkup.com/${locale}/gids/succes-strategieen`
 },
 {
 "@type": "ListItem",
 "position": 4,
 "name": "Freelance Business Opschalen",
 "item": `https://skilllinkup.com/${locale}/gids/succes-strategieen/freelance-business-opschalen`
 }
 ]
 };

 const articleSchema = {
 "@context": "https://schema.org",
 "@type": "Article",
 "headline": "Freelance Business Opschalen: Van Solopreneur naar €10K+ per Maand",
 "description": "Bewezen strategieën voor het opschalen van je freelance business met team building, automatisering en systematisering.",
 "author": {
 "@type": "Organization",
 "name": "SkillLinkup"
 },
 "publisher": {
 "@type": "Organization",
 "name": "SkillLinkup",
 "logo": {
 "@type": "ImageObject",
 "url": "https://skilllinkup.com/images/logo.png"
 }
 },
 "datePublished": "2026-01-15",
 "dateModified": "2026-01-15",
 "mainEntityOfPage": {
 "@type": "WebPage",
 "@id": `https://skilllinkup.com/${locale}/gids/succes-strategieen/freelance-business-opschalen`
 }
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
 />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
 />

 <div className="bg-gradient-to-b from-[#1e1541] to-[#2a1f5f] py-16">
 <div className="container mx-auto px-4">
 <nav className="text-sm mb-8" aria-label="Breadcrumb">
 <ol className="flex flex-wrap items-center gap-2 text-gray-300">
 <li><Link href={`/${locale}`} className="hover:text-[#ef2b70] transition-colors">Home</Link></li>
 <li className="text-gray-500">/</li>
 <li><Link href={`/${locale}/gids`} className="hover:text-[#ef2b70] transition-colors">Gids</Link></li>
 <li className="text-gray-500">/</li>
 <li><Link href={`/${locale}/gids/succes-strategieen`} className="hover:text-[#ef2b70] transition-colors">Succes Strategieën</Link></li>
 <li className="text-gray-500">/</li>
 <li className="text-[#ef2b70]" aria-current="page">Freelance Business Opschalen</li>
 </ol>
 </nav>

 <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
 Freelance Business Opschalen
 </h1>
 <p className="text-xl text-gray-300 max-w-3xl">
 Van solopreneur naar schaalbare business: bewezen strategieën voor groei zonder meer uren te werken.
 </p>
 </div>
 </div>

 <article className="container mx-auto px-4 py-16 max-w-4xl">
 <div className="prose prose-lg max-w-none">
 <div className="bg-[#22c55e]/10 border-l-4 border-[#22c55e] p-6 mb-8 rounded-r-lg">
 <p className="text-lg font-semibold text-gray-900 mb-2">De Schaal-Paradox</p>
 <p className="text-gray-700 mb-0">
 Als solopreneur zit je vast aan een <strong>inkomenplafond</strong>: jouw tijd × jouw uurtarief.
 Zelfs tegen €150/uur kom je niet boven de €25.000/maand (en dat is bij 40 factureerbare uren per week).
 De echte groei komt wanneer je <strong>ontkoppelt van je eigen tijd</strong>.
 </p>
 </div>

 <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
 De 4 Groeifases van een Freelance Business
 </h2>

 <p className="text-gray-700 leading-relaxed mb-6">
 Elk freelance business doorloopt dezelfde evolutie. Herken jij je huidige fase?
 </p>

 <div className="grid gap-6 mb-12">
 <div className="border-l-4 border-[#ef2b70] bg-gray-50 p-6 rounded-r-lg">
 <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-2">
 Fase 1: Solopreneur (€0 - €5K/maand)
 </h3>
 <p className="text-gray-700 mb-3">
 <strong>Realiteit:</strong>Jij doet alles zelf - van acquisitie tot uitvoering tot administratie.
 Je verkoopt je tijd voor geld.
 </p>
 <p className="text-gray-600 text-sm mb-0">
 <strong>Bottleneck:</strong>Jouw beschikbare uren. Meer verdienen = meer werken.
 </p>
 </div>

 <div className="border-l-4 border-[#ef2b70] bg-gray-50 p-6 rounded-r-lg">
 <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-2">
 Fase 2: Specialist (€5K - €10K/maand)
 </h3>
 <p className="text-gray-700 mb-3">
 <strong>Realiteit:</strong>Je hebt een niche gevonden en vraagt premium tarieven (€100-€200/uur).
 Je kiest je klanten, maar doet nog steeds alles zelf.
 </p>
 <p className="text-gray-600 text-sm mb-0">
 <strong>Bottleneck:</strong>Je raakt uitgeput door de werkdruk. Meer groei betekent burnout risico.
 </p>
 </div>

 <div className="border-l-4 border-[#22c55e] bg-green-50 p-6 rounded-r-lg">
 <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-2">
 Fase 3: Team Leader (€10K - €25K/maand)
 </h3>
 <p className="text-gray-700 mb-3">
 <strong>Realiteit:</strong>Je hebt een klein team (2-5 mensen) dat uitvoerend werk doet.
 Jij focust op klantcontact, strategie en kwaliteitscontrole.
 </p>
 <p className="text-gray-600 text-sm mb-0">
 <strong>Bottleneck:</strong>Team management kost tijd. Je bent essentieel voor elk project.
 </p>
 </div>

 <div className="border-l-4 border-[#22c55e] bg-green-50 p-6 rounded-r-lg">
 <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-2">
 Fase 4: Agency Owner (€25K+/maand)
 </h3>
 <p className="text-gray-700 mb-3">
 <strong>Realiteit:</strong>Je business draait zonder jouw dagelijkse input. Team van 5-15+ mensen,
 systematische processen, meerdere inkomstenstromen.
 </p>
 <p className="text-gray-600 text-sm mb-0">
 <strong>Focus:</strong>Strategie, business development, systemen optimaliseren.
 </p>
 </div>
 </div>

 <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
 Stap 1: Automatiseer Voordat Je Schaalt
 </h2>

 <p className="text-gray-700 leading-relaxed mb-6">
 De grootste fout? Direct mensen aannemen zonder eerst je <strong>processen te systematiseren</strong>.
 Chaotische processen + team = nog meer chaos.
 </p>

 <p className="text-gray-700 leading-relaxed mb-6">
 <strong>Wat moet je automatiseren VOOR je schaalt:</strong>
 </p>

 <ul className="space-y-3 mb-8 ml-6">
 <li className="flex items-start gap-3">
 <span className="text-[#ef2b70] font-bold">→</span>
 <span className="text-gray-700"><strong>Client onboarding</strong>- van contract tot kickoff meeting</span>
 </li>
 <li className="flex items-start gap-3">
 <span className="text-[#ef2b70] font-bold">→</span>
 <span className="text-gray-700"><strong>Project management</strong>- templates, checklists, workflows</span>
 </li>
 <li className="flex items-start gap-3">
 <span className="text-[#ef2b70] font-bold">→</span>
 <span className="text-gray-700"><strong>Communicatie</strong>- standaard emails, status updates, delivery messages</span>
 </li>
 <li className="flex items-start gap-3">
 <span className="text-[#ef2b70] font-bold">→</span>
 <span className="text-gray-700"><strong>Facturatie</strong>- van invoice tot betaling tracking</span>
 </li>
 <li className="flex items-start gap-3">
 <span className="text-[#ef2b70] font-bold">→</span>
 <span className="text-gray-700"><strong>Lead generatie</strong>- content marketing, email sequences</span>
 </li>
 </ul>

 <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
 <p className="text-gray-800 font-semibold mb-2">Essentiële Tools voor Automatisering</p>
 <p className="text-gray-700 mb-3">
 <strong>Gratis/goedkoop om te starten:</strong>
 </p>
 <ul className="space-y-2 text-gray-700">
 <li>• <strong>Notion</strong>- Templates, SOP's, knowledge base (gratis)</li>
 <li>• <strong>Zapier/Make</strong>- Workflow automatisering (€20/maand)</li>
 <li>• <strong>Calendly</strong>- Afspraak planning (gratis)</li>
 <li>• <strong>Streak/HubSpot</strong>- CRM in Gmail (gratis)</li>
 <li>• <strong>Loom</strong>- Video updates voor klanten (gratis)</li>
 </ul>
 </div>

 <div className="bg-gradient-to-r from-[#ef2b70] to-[#ff4081] text-white p-8 rounded-xl my-12 shadow-lg">
 <h3 className="font-heading text-2xl font-bold mb-4">Vind het Beste Platform voor Jouw Niche</h3>
 <p className="text-lg mb-6 text-white/90">
 Sommige platforms zijn beter voor schaalbare businesses dan anderen. Vergelijk commissies, team features en payment processing.
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-block bg-white text-[#ef2b70] font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-md"
 >
 Vergelijk Freelance Platforms →
 </Link>
 </div>

 <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
 Stap 2: Productize je Services
 </h2>

 <p className="text-gray-700 leading-relaxed mb-6">
 "Productized services" betekent: <strong>vaste pakketten met vaste prijzen</strong>in plaats van maatwerk per klant.
 Dit maakt je business schaalbaar omdat elk project hetzelfde proces volgt.
 </p>

 <p className="text-gray-700 leading-relaxed mb-6">
 <strong>Voorbeeld transformatie:</strong>
 </p>

 <div className="grid md:grid-cols-2 gap-6 mb-8">
 <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
 <p className="font-semibold text-red-800 mb-3">❌ Niet Schaalbaar</p>
 <p className="text-gray-700 text-sm mb-3">
 "Website design op maat"
 </p>
 <ul className="space-y-2 text-sm text-gray-600">
 <li>• Elke klant is uniek</li>
 <li>• Moeilijk te delegeren</li>
 <li>• Prijzen variëren enorm</li>
 <li>• Scope creep problemen</li>
 </ul>
 </div>

 <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
 <p className="font-semibold text-green-800 mb-3">✅ Wel Schaalbaar</p>
 <p className="text-gray-700 text-sm mb-3">
 "5-pagina business website in 14 dagen"
 </p>
 <ul className="space-y-2 text-sm text-gray-600">
 <li>• Vaste deliverables</li>
 <li>• Herhaalbaar proces</li>
 <li>• Vaste prijs (€3.500)</li>
 <li>• Makkelijk te trainen</li>
 </ul>
 </div>
 </div>

 <p className="text-gray-700 leading-relaxed mb-6">
 <strong>Hoe maak je een productized service:</strong>
 </p>

 <ol className="space-y-4 mb-8 ml-6">
 <li className="flex items-start gap-3">
 <span className="text-[#ef2b70] font-bold">1.</span>
 <div className="text-gray-700">
 <strong>Analyseer je beste projecten</strong>- Welke projecten liepen soepel en waren winstgevend?
 </div>
 </li>
 <li className="flex items-start gap-3">
 <span className="text-[#ef2b70] font-bold">2.</span>
 <div className="text-gray-700">
 <strong>Identificeer het patroon</strong>- Wat hadden deze projecten gemeen?
 </div>
 </li>
 <li className="flex items-start gap-3">
 <span className="text-[#ef2b70] font-bold">3.</span>
 <div className="text-gray-700">
 <strong>Definieer de scope</strong>- Maak een lijst van exacte deliverables
 </div>
 </li>
 <li className="flex items-start gap-3">
 <span className="text-[#ef2b70] font-bold">4.</span>
 <div className="text-gray-700">
 <strong>Standaardiseer het proces</strong>- Elk project volgt dezelfde stappen
 </div>
 </li>
 <li className="flex items-start gap-3">
 <span className="text-[#ef2b70] font-bold">5.</span>
 <div className="text-gray-700">
 <strong>Bepaal vaste prijzen</strong>- Gebaseerd op tijd × winstmarge
 </div>
 </li>
 <li className="flex items-start gap-3">
 <span className="text-[#ef2b70] font-bold">6.</span>
 <div className="text-gray-700">
 <strong>Creëer upsells</strong>- Basis pakket + premium opties
 </div>
 </li>
 </ol>

 <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8 rounded-r-lg">
 <p className="text-gray-800 font-semibold mb-2">Pro Tip: De 3-Tier Pricing Strategie</p>
 <p className="text-gray-700 mb-0">
 Bied altijd 3 pakketten aan (Basic, Pro, Premium). De meeste klanten kiezen de middelste optie,
 maar de dure optie maakt de middelste optie redelijk lijken. <strong>Gemiddelde order value stijgt met 30-40%</strong>.
 </p>
 </div>

 <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
 Stap 3: Bouw je Team (De Juiste Volgorde)
 </h2>

 <p className="text-gray-700 leading-relaxed mb-6">
 Veel freelancers huren te snel andere freelancers in voor <em>uitvoerend</em>werk. Dat is de verkeerde volgorde.
 </p>

 <p className="text-gray-700 leading-relaxed mb-6">
 <strong>De ideale hiring volgorde voor schalen:</strong>
 </p>

 <div className="space-y-6 mb-12">
 <div className="border-l-4 border-[#22c55e] bg-green-50 p-6 rounded-r-lg">
 <h4 className="font-semibold text-lg text-gray-900 mb-2">Hire #1: Virtuele Assistent (VA)</h4>
 <p className="text-gray-700 mb-3">
 <strong>Kosten:</strong>€10-€25/uur (parttime, 10-20 uur/week)
 </p>
 <p className="text-gray-700 mb-3">
 <strong>Taken:</strong>Email management, scheduling, basis admin, client communication
 </p>
 <p className="text-gray-700 mb-0">
 <strong>Impact:</strong>Geeft je 10-15 uur per week terug voor factureerbaar werk
 </p>
 </div>

 <div className="border-l-4 border-[#22c55e] bg-green-50 p-6 rounded-r-lg">
 <h4 className="font-semibold text-lg text-gray-900 mb-2">Hire #2: Junior in Jouw Vakgebied</h4>
 <p className="text-gray-700 mb-3">
 <strong>Kosten:</strong>€25-€50/uur (flexibel, project-basis)
 </p>
 <p className="text-gray-700 mb-3">
 <strong>Taken:</strong>Eerste versies, research, repetitief werk, basis implementatie
 </p>
 <p className="text-gray-700 mb-0">
 <strong>Impact:</strong>Jij doet alleen nog strategie en final review (3x capaciteit)
 </p>
 </div>

 <div className="border-l-4 border-[#22c55e] bg-green-50 p-6 rounded-r-lg">
 <h4 className="font-semibold text-lg text-gray-900 mb-2">Hire #3: Sales/Account Manager</h4>
 <p className="text-gray-700 mb-3">
 <strong>Kosten:</strong>€40-€80/uur of commission-based (10-15% van sales)
 </p>
 <p className="text-gray-700 mb-3">
 <strong>Taken:</strong>Lead opvolging, proposals, client onboarding, upselling
 </p>
 <p className="text-gray-700 mb-0">
 <strong>Impact:</strong>Jij hoeft niet meer te verkopen, focus 100% op levering
 </p>
 </div>

 <div className="border-l-4 border-[#22c55e] bg-green-50 p-6 rounded-r-lg">
 <h4 className="font-semibold text-lg text-gray-900 mb-2">Hire #4: Senior Specialist (jouw niveau)</h4>
 <p className="text-gray-700 mb-3">
 <strong>Kosten:</strong>€60-€120/uur (parttime of fulltime)
 </p>
 <p className="text-gray-700 mb-3">
 <strong>Taken:</strong>Volledige projecten end-to-end, mentoring juniors
 </p>
 <p className="text-gray-700 mb-0">
 <strong>Impact:</strong>Je business kan draaien zonder jouw dagelijkse input
 </p>
 </div>
 </div>

 <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
 <p className="text-gray-800 font-semibold mb-2">Waar Vind Je Talent?</p>
 <p className="text-gray-700 mb-3">
 <strong>Voor VA's:</strong>Upwork, OnlineJobs.ph, Belay
 </p>
 <p className="text-gray-700 mb-3">
 <strong>Voor Specialisten:</strong>Upwork, Toptal, LinkedIn, je eigen netwerk
 </p>
 <p className="text-gray-700 mb-0">
 <strong>Voor Sales:</strong>LinkedIn, sales communities, referrals van andere agencies
 </p>
 </div>

 <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
 Stap 4: Creëer Passieve Inkomsten (De Ultieme Schaal)
 </h2>

 <p className="text-gray-700 leading-relaxed mb-6">
 De hoogste vorm van schalen? <strong>Inkomsten die binnenkomen zonder dat je of je team tijd investeert</strong>.
 </p>

 <p className="text-gray-700 leading-relaxed mb-6">
 <strong>Bewezen passieve inkomsten modellen voor freelancers:</strong>
 </p>

 <div className="space-y-6 mb-12">
 <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
 <h4 className="font-semibold text-lg text-[#1e1541] mb-3">
 1. Online Cursus of Membership
 </h4>
 <p className="text-gray-700 mb-3">
 Verpak je expertise in een zelf-studie cursus. Eenmalig maken, oneindig verkopen.
 </p>
 <p className="text-gray-600 text-sm">
 <strong>Potentie:</strong>€2.000-€10.000/maand | <strong>Tijd investering:</strong>50-100 uur setup
 </p>
 </div>

 <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
 <h4 className="font-semibold text-lg text-[#1e1541] mb-3">
 2. Templates & Tools
 </h4>
 <p className="text-gray-700 mb-3">
 Verkoop je process templates, checklists, Notion templates, code snippets via Gumroad of je eigen site.
 </p>
 <p className="text-gray-600 text-sm">
 <strong>Potentie:</strong>€500-€5.000/maand | <strong>Tijd investering:</strong>10-30 uur setup
 </p>
 </div>

 <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
 <h4 className="font-semibold text-lg text-[#1e1541] mb-3">
 3. SaaS Product of Software
 </h4>
 <p className="text-gray-700 mb-3">
 Bouw een tool die een probleem oplost dat je continu tegenkomt in jouw niche.
 </p>
 <p className="text-gray-600 text-sm">
 <strong>Potentie:</strong>€5.000-€50.000+/maand | <strong>Tijd investering:</strong>200-500 uur setup
 </p>
 </div>

 <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
 <h4 className="font-semibold text-lg text-[#1e1541] mb-3">
 4. Affiliate Marketing & Partnerships
 </h4>
 <p className="text-gray-700 mb-3">
 Promoot tools die je gebruikt naar je audience, verdien commissie op elke verkoop.
 </p>
 <p className="text-gray-600 text-sm">
 <strong>Potentie:</strong>€500-€5.000/maand | <strong>Tijd investering:</strong>10-20 uur setup
 </p>
 </div>

 <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
 <h4 className="font-semibold text-lg text-[#1e1541] mb-3">
 5. Retainer Contracts
 </h4>
 <p className="text-gray-700 mb-3">
 Niet 100% passief, maar voorspelbaar maandelijks inkomen met beperkte scope.
 </p>
 <p className="text-gray-600 text-sm">
 <strong>Potentie:</strong>€5.000-€20.000/maand | <strong>Tijd investering:</strong>20-40 uur/maand
 </p>
 </div>
 </div>

 <div className="bg-gradient-to-r from-[#1e1541] to-[#2a1f5f] text-white p-8 rounded-xl my-12 shadow-lg">
 <h3 className="font-heading text-2xl font-bold mb-4">Klaar om te Groeien?</h3>
 <p className="text-lg mb-6 text-white/90">
 Kies het platform met de beste features voor team management en schaalbare pricing.
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-block bg-[#ef2b70] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#d91f5f] transition-all transform hover:scale-105 shadow-md"
 >
 Vergelijk Platforms voor Teams →
 </Link>
 </div>

 <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
 Financiële Planning voor Schalen
 </h2>

 <p className="text-gray-700 leading-relaxed mb-6">
 Schalen kost geld voordat het geld oplevert. Plan je cashflow zorgvuldig.
 </p>

 <h3 className="font-heading text-2xl font-semibold text-[#1e1541] mt-8 mb-4">
 Realistische Kosten voor Schalen
 </h3>

 <div className="overflow-x-auto mb-8">
 <table className="w-full border-collapse">
 <thead>
 <tr className="bg-[#1e1541] text-white">
 <th className="border border-gray-300 p-3 text-left">Fase</th>
 <th className="border border-gray-300 p-3 text-left">Maandelijkse Kosten</th>
 <th className="border border-gray-300 p-3 text-left">Verwacht Inkomen</th>
 </tr>
 </thead>
 <tbody>
 <tr className="bg-gray-50">
 <td className="border border-gray-300 p-3">Solopreneur</td>
 <td className="border border-gray-300 p-3">€200-€500 (tools)</td>
 <td className="border border-gray-300 p-3">€3.000-€8.000</td>
 </tr>
 <tr>
 <td className="border border-gray-300 p-3">+ VA</td>
 <td className="border border-gray-300 p-3">€1.000-€2.000</td>
 <td className="border border-gray-300 p-3">€6.000-€12.000</td>
 </tr>
 <tr className="bg-gray-50">
 <td className="border border-gray-300 p-3">+ Junior Specialist</td>
 <td className="border border-gray-300 p-3">€3.000-€5.000</td>
 <td className="border border-gray-300 p-3">€10.000-€18.000</td>
 </tr>
 <tr>
 <td className="border border-gray-300 p-3">+ Sales Person</td>
 <td className="border border-gray-300 p-3">€5.000-€8.000</td>
 <td className="border border-gray-300 p-3">€15.000-€30.000</td>
 </tr>
 <tr className="bg-gray-50">
 <td className="border border-gray-300 p-3">Full Agency</td>
 <td className="border border-gray-300 p-3">€10.000-€20.000</td>
 <td className="border border-gray-300 p-3">€30.000-€100.000+</td>
 </tr>
 </tbody>
 </table>
 </div>

 <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8 rounded-r-lg">
 <p className="text-gray-800 font-semibold mb-2">Kritieke Cashflow Regel</p>
 <p className="text-gray-700 mb-0">
 Zorg dat je minimaal <strong>6 maanden operating expenses</strong>(inclusief team kosten) in kas hebt
 voordat je de volgende growth fase ingaat. Schalen gaat altijd langzamer dan je verwacht.
 </p>
 </div>

 <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
 Veelgestelde Vragen over Schalen
 </h2>

 <div className="space-y-6 mb-12">
 <div className="border-l-4 border-[#ef2b70] pl-6">
 <h4 className="font-semibold text-lg text-gray-900 mb-2">
 Wanneer ben ik klaar om te schalen?
 </h4>
 <p className="text-gray-700 mb-0">
 Als je <strong>(1)</strong>consistent €8K+ per maand verdient, <strong>(2)</strong>meer leads hebt dan je aankunt,
 en <strong>(3)</strong>je processen gedocumenteerd zijn. Minder dan dit en je riskeert cashflow problemen.
 </p>
 </div>

 <div className="border-l-4 border-[#ef2b70] pl-6">
 <h4 className="font-semibold text-lg text-gray-900 mb-2">
 Moet ik mensen in dienst nemen of werken met freelancers?
 </h4>
 <p className="text-gray-700 mb-0">
 Start met <strong>freelancers</strong>(flexibel, geen vaste kosten). Als je consistent werk hebt voor 20+ uur/week,
 overweeg dan vaste krachten. Maar in Europa zijn de kosten van werkgevers hoog - freelancers blijven vaak voordeliger.
 </p>
 </div>

 <div className="border-l-4 border-[#ef2b70] pl-6">
 <h4 className="font-semibold text-lg text-gray-900 mb-2">
 Hoe voorkom ik kwaliteitsverlies bij schalen?
 </h4>
 <p className="text-gray-700 mb-0">
 <strong>Drie checks:</strong>(1) Gedetailleerde process documentation, (2) Quality control checklist voor elk project,
 (3) Jij doet altijd final review in de eerste 6-12 maanden. Train je team op jouw kwaliteitsnormen.
 </p>
 </div>

 <div className="border-l-4 border-[#ef2b70] pl-6">
 <h4 className="font-semibold text-lg text-gray-900 mb-2">
 Wat als mijn klanten alleen met mij willen werken?
 </h4>
 <p className="text-gray-700 mb-0">
 Positioneer je team als <strong>"jouw team"</strong>, niet als externe contractors. "Ik heb een specialist in mijn team
 die dit oppakt, onder mijn supervisie." De meeste klanten willen resultaat, niet specifiek jou - als je kwaliteit garandeert.
 </p>
 </div>
 </div>

 <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
 Conclusie: Schalen is een Marathon, Geen Sprint
 </h2>

 <p className="text-gray-700 leading-relaxed mb-6">
 Van solopreneur naar schaalbare business duurt gemiddeld <strong>2-4 jaar</strong>. Dat is normaal en gezond.
 </p>

 <p className="text-gray-700 leading-relaxed mb-6">
 <strong>De sleutel tot succesvol schalen:</strong>
 </p>

 <ul className="space-y-3 mb-8">
 <li className="flex items-start gap-3">
 <span className="text-[#22c55e] text-xl mt-1">✓</span>
 <span className="text-gray-700"><strong>Systematiseer eerst</strong>- automatiseer en documenteer voordat je team aanneemt</span>
 </li>
 <li className="flex items-start gap-3">
 <span className="text-[#22c55e] text-xl mt-1">✓</span>
 <span className="text-gray-700"><strong>Productize je services</strong>- vaste pakketten zijn schaalbaar, maatwerk niet</span>
 </li>
 <li className="flex items-start gap-3">
 <span className="text-[#22c55e] text-xl mt-1">✓</span>
 <span className="text-gray-700"><strong>Huur in de juiste volgorde</strong>- VA eerst, dan junior, dan sales, dan senior</span>
 </li>
 <li className="flex items-start gap-3">
 <span className="text-[#22c55e] text-xl mt-1">✓</span>
 <span className="text-gray-700"><strong>Bouw passieve inkomsten</strong>- diversifieer je revenue streams</span>
 </li>
 <li className="flex items-start gap-3">
 <span className="text-[#22c55e] text-xl mt-1">✓</span>
 <span className="text-gray-700"><strong>Manage cashflow conservatief</strong>- 6 maanden runway minimum</span>
 </li>
 </ul>

 <p className="text-gray-700 leading-relaxed mb-6">
 De mooiste paradox? <strong>Zodra je business kan draaien zonder jou, wordt het écht waardevol</strong>.
 Niet alleen qua inkomen, maar ook als asset die je eventueel kunt verkopen.
 </p>

 <p className="text-gray-700 leading-relaxed font-semibold">
 Begin vandaag met stap 1: documenteer één proces dat je elke week doet. Dat is de eerste steen van je schaalbare business. 
 </p>
 </div>
 </article>
 </>
 );
}
