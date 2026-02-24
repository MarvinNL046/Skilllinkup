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
 title: 'Langdurige Klantrelaties: Van Eenmalig naar Vaste Opdrachtgever',
 description: 'Leer hoe je eenmalige klanten omzet in vaste opdrachtgevers. Retainer strategies, client retention technieken, en relationship management voor stabiel freelance inkomen.',
 keywords: 'langdurige klantrelaties, retainer contracts, client retention, vaste klanten, freelance relaties, recurring revenue, client management',
 openGraph: {
 title: 'Langdurige Klantrelaties: Van Eenmalig naar Vaste Opdrachtgever',
 description: 'Transformeer eenmalige projecten in langdurige partnerships met stabiel inkomen',
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
 "name": "Langdurige Klantrelaties",
 "item": `https://skilllinkup.com/${locale}/gids/succes-strategieen/langdurige-klantrelaties`
 }
 ]
 };

 const articleSchema = {
 "@context": "https://schema.org",
 "@type": "Article",
 "headline": "Langdurige Klantrelaties: Van Eenmalig naar Vaste Opdrachtgever",
 "description": "Bewezen strategieën voor het transformeren van eenmalige klanten in vaste opdrachtgevers met retainer contracts en relationship management.",
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
 "@id": `https://skilllinkup.com/${locale}/gids/succes-strategieen/langdurige-klantrelaties`
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
 <li className="text-[#ef2b70]" aria-current="page">Langdurige Klantrelaties</li>
 </ol>
 </nav>

 <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
 Langdurige Klantrelaties Opbouwen
 </h1>
 <p className="text-xl text-gray-300 max-w-3xl">
 Transformeer eenmalige projecten in langdurige partnerships met stabiel, voorspelbaar inkomen.
 </p>
 </div>
 </div>

 <article className="container mx-auto px-4 py-16 max-w-4xl">
 <div className="prose prose-lg max-w-none">
 <div className="bg-[#22c55e]/10 border-l-4 border-[#22c55e] p-6 mb-8 rounded-r-lg">
 <p className="text-lg font-semibold text-gray-900 mb-2">De Recurring Revenue Revolutie</p>
 <p className="text-gray-700 mb-0">
 Freelancers die elk project als eenmalig behandelen hebben een <strong>inkomenachtbaan</strong>- elke maand opnieuw jagen op klanten.
 Maar de top 10% heeft <strong>60-80% recurring revenue</strong>van vaste klanten. Het verschil? Ze behandelen elk project
 als het begin van een langdurige relatie, niet als een transactie.
 </p>
 </div>

 <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
 Waarom Langdurige Klanten Goud Waard Zijn
 </h2>

 <p className="text-gray-700 leading-relaxed mb-6">
 De economie van klantbehoud vs. acquisitie is niet subtiel - het is <strong>extreem</strong>:
 </p>

 <div className="grid md:grid-cols-2 gap-6 mb-12">
 <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
 <h3 className="font-semibold text-red-800 mb-4">Nieuwe Klant Acquisitiè</h3>
 <ul className="space-y-2 text-sm text-gray-700">
 <li>• <strong>20-40 uur</strong>aan proposal schrijven per maand</li>
 <li>• <strong>€100-€300</strong>marketing kosten (ads, connects, tools)</li>
 <li>• <strong>10-20% win rate</strong>gemiddeld</li>
 <li>• <strong>Onzekerheid</strong>over volgende maand inkomen</li>
 <li>• <strong>Learning curve</strong>bij elke nieuwe klant</li>
 <li>• <strong>Geen vertrouwen</strong>opgebouwd = lagere prijzen</li>
 </ul>
 </div>

 <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
 <h3 className="font-semibold text-green-800 mb-4">✅ Bestaande Klant Retention</h3>
 <ul className="space-y-2 text-sm text-gray-700">
 <li>• <strong>2-5 uur</strong>onderhoud per maand</li>
 <li>• <strong>€0</strong>marketing kosten</li>
 <li>• <strong>80-95% renewal rate</strong>bij goede relaties</li>
 <li>• <strong>Voorspelbaar</strong>maandelijks inkomen</li>
 <li>• <strong>Geen onboarding</strong>- je kent hun systemen al</li>
 <li>• <strong>Vertrouwen</strong>= 30-50% hogere tarieven mogelijk</li>
 </ul>
 </div>
 </div>

 <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
 <p className="text-gray-800 font-semibold mb-2">De 80/20 Regel van Freelance Inkomen</p>
 <p className="text-gray-700 mb-0">
 Succesvolle freelancers krijgen <strong>80% van hun inkomen van 20% van hun klanten</strong>- hun vaste opdrachtgevers.
 Focus dus niet op "meer klanten", maar op "betere relaties met bestaande klanten".
 </p>
 </div>

 <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
 Het 5-Fase Relationship Framework
 </h2>

 <p className="text-gray-700 leading-relaxed mb-6">
 Een eenmalige klant wordt niet magisch een vaste opdrachtgever. Er is een <strong>systematisch proces</strong>
 dat je moet doorlopen bij elk project.
 </p>

 <div className="space-y-8 mb-12">
 <div className="border-l-4 border-[#ef2b70] bg-gray-50 p-6 rounded-r-lg">
 <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
 Fase 1: De Eerste 7 Dagen - Impressie Vastleggen
 </h3>
 <p className="text-gray-700 mb-4">
 <strong>Doel:</strong>Overtref verwachtingen zo hard dat de klant denkt "Ik wil dit vaker".
 </p>
 <p className="text-gray-700 mb-3">
 <strong>Kritieke acties:</strong>
 </p>
 <ul className="space-y-2 text-gray-700 text-sm ml-4">
 <li>• Lever iets tastbaars binnen 48 uur (quick win, prototype, eerste resultaat)</li>
 <li>• Stuur dagelijkse updates - ook als er weinig vooruitgang is</li>
 <li>• Identificeer en los een probleem op waar ze niet om gevraagd hebben</li>
 <li>• Toon proactiviteit: "Ik zag ook [issue], zal ik dit meteen fixen?"</li>
 </ul>
 </div>

 <div className="border-l-4 border-[#ef2b70] bg-gray-50 p-6 rounded-r-lg">
 <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
 Fase 2: Mid-Project - Het Momentum Moment
 </h3>
 <p className="text-gray-700 mb-4">
 <strong>Doel:</strong>Plant de zaadjes voor toekomstige projecten zonder pushy te zijn.
 </p>
 <p className="text-gray-700 mb-3">
 <strong>Strategie:</strong>
 </p>
 <ul className="space-y-2 text-gray-700 text-sm ml-4">
 <li>• Mention gerelateerde opportunities: "Na deze redesign kan ik je ook helpen met [X]"</li>
 <li>• Deel industry insights: "Ik zie dat veel bedrijven in jouw sector nu [trend] implementeren"</li>
 <li>• Vraag naar hun roadmap: "Wat zijn jullie plannen voor Q2? Misschien kan ik daar bij helpen"</li>
 <li>• Wees adviseur, niet alleen uitvoerder</li>
 </ul>
 </div>

 <div className="border-l-4 border-[#ef2b70] bg-gray-50 p-6 rounded-r-lg">
 <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
 Fase 3: Oplevering - De Upsell Window
 </h3>
 <p className="text-gray-700 mb-4">
 <strong>Doel:</strong>Zet eenmalig project om in eerste retainer of follow-up project.
 </p>
 <p className="text-gray-700 mb-3">
 <strong>De perfecte upsell timing:</strong>
 </p>
 <ul className="space-y-2 text-gray-700 text-sm ml-4">
 <li>• Direct na positieve feedback op finale oplevering</li>
 <li>• Gebruik het "momentum script": "Nu dit live is, wil je waarschijnlijk [logische volgende stap]"</li>
 <li>• Bied een "maintenance package" aan: "Ik kan dit maandelijks onderhouden voor [prijs]"</li>
 <li>• Frame als voortzetting, niet nieuwe verkoop: "Laten we dit momentum vasthouden"</li>
 </ul>
 </div>

 <div className="border-l-4 border-[#ef2b70] bg-gray-50 p-6 rounded-r-lg">
 <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
 Fase 4: Post-Project - Stay Top-of-Mind
 </h3>
 <p className="text-gray-700 mb-4">
 <strong>Doel:</strong>Blijf relevant zonder opdringerig te zijn.
 </p>
 <p className="text-gray-700 mb-3">
 <strong>De 30-60-90 dag follow-up strategie:</strong>
 </p>
 <ul className="space-y-2 text-gray-700 text-sm ml-4">
 <li>• <strong>Dag 30:</strong>Check-in email: "Hoe gaat het met [geleverd project]? Alles nog naar wens?"</li>
 <li>• <strong>Dag 60:</strong>Value-add: Deel een relevant artikel/tool/tip zonder iets te vragen</li>
 <li>• <strong>Dag 90:</strong>Soft pitch: "Ik werk nu aan [soortgelijk project], misschien interessant voor jullie?"</li>
 <li>• Herhaal elke 90 dagen tot ze terugkomen of duidelijk aangeven dat ze niks nodig hebben</li>
 </ul>
 </div>

 <div className="border-l-4 border-[#22c55e] bg-green-50 p-6 rounded-r-lg">
 <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
 Fase 5: Retainer Conversion - Het Eindspel
 </h3>
 <p className="text-gray-700 mb-4">
 <strong>Doel:</strong>Transformeer ad-hoc projecten in maandelijks retainer contract.
 </p>
 <p className="text-gray-700 mb-3">
 <strong>Wanneer ben je ready voor retainer pitch:</strong>
 </p>
 <ul className="space-y-2 text-gray-700 text-sm ml-4">
 <li>• Je hebt minimaal <strong>2-3 projecten</strong>succesvol afgerond voor deze klant</li>
 <li>• Ze komen elke <strong>maand of elk kwartaal</strong>terug met nieuw werk</li>
 <li>• Je begrijpt hun business en kunt <strong>proactief suggesties</strong>doen</li>
 <li>• Ze vragen jou om advies, niet alleen uitvoering</li>
 </ul>
 </div>
 </div>

 <div className="bg-gradient-to-r from-[#ef2b70] to-[#ff4081] text-white p-8 rounded-xl my-12 shadow-lg">
 <h3 className="font-heading text-2xl font-bold mb-4">Vind Platforms die Langdurige Relaties Ondersteunen</h3>
 <p className="text-lg mb-6 text-white/90">
 Sommige platforms zijn beter voor retainers en repeat business dan anderen. Kies strategisch voor maximale client lifetime value.
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-block bg-white text-[#ef2b70] font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-md"
 >
 Vergelijk Freelance Platforms →
 </Link>
 </div>

 <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
 Retainer Contracts: De Anatomie van Stabiel Inkomen
 </h2>

 <p className="text-gray-700 leading-relaxed mb-6">
 Een retainer is <strong>geen maandelijks project</strong>- het is een partnership waarin jij beschikbaar bent voor ongoing support.
 </p>

 <h3 className="font-heading text-2xl font-semibold text-[#1e1541] mt-8 mb-4">
 3 Soorten Retainer Contracts
 </h3>

 <div className="space-y-6 mb-12">
 <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
 <h4 className="font-semibold text-lg text-[#1e1541] mb-3">
 1. Hour-Based Retainer (Meest Voorkomend)
 </h4>
 <p className="text-gray-700 mb-3">
 <strong>Structuur:</strong>Klant betaalt voor X uur per maand aan jouw tarief.
 </p>
 <p className="text-gray-700 mb-3">
 <strong>Voorbeeld:</strong>€2.400/maand voor 20 uur (€120/uur)
 </p>
 <p className="text-gray-600 text-sm mb-3">
 <strong>Voordelen:</strong>Simpel, flexibel, makkelijk te begrijpen voor klant
 </p>
 <p className="text-gray-600 text-sm">
 <strong>Nadelen:</strong>Je bent nog steeds tijd voor geld aan het ruilen
 </p>
 </div>

 <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
 <h4 className="font-semibold text-lg text-[#1e1541] mb-3">
 2. Project-Based Retainer (Value-Focused)
 </h4>
 <p className="text-gray-700 mb-3">
 <strong>Structuur:</strong>Klant betaalt vast bedrag voor specifieke deliverables per maand.
 </p>
 <p className="text-gray-700 mb-3">
 <strong>Voorbeeld:</strong>€3.500/maand voor 4 blog posts, 2 social media campagnes, en wekelijkse SEO rapportage
 </p>
 <p className="text-gray-600 text-sm mb-3">
 <strong>Voordelen:</strong>Duidelijke scope, geen uur-tracking, voorspelbare workload
 </p>
 <p className="text-gray-600 text-sm">
 <strong>Nadelen:</strong>Scope creep risico als deliverables niet kristalhelder zijn
 </p>
 </div>

 <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
 <h4 className="font-semibold text-lg text-[#1e1541] mb-3">
 3. Access-Based Retainer (Premium)
 </h4>
 <p className="text-gray-700 mb-3">
 <strong>Structuur:</strong>Klant betaalt voor toegang tot jouw expertise - onbeperkte vragen, ad-hoc support.
 </p>
 <p className="text-gray-700 mb-3">
 <strong>Voorbeeld:</strong>€5.000/maand voor "onbeperkte consultancy binnen 24-uur response tijd"
 </p>
 <p className="text-gray-600 text-sm mb-3">
 <strong>Voordelen:</strong>Hoogste prijs per klant, meeste flexibiliteit, minste administratie
 </p>
 <p className="text-gray-600 text-sm">
 <strong>Nadelen:</strong>Risico op overbelasting, alleen haalbaar met goede boundaries
 </p>
 </div>
 </div>

 <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8 rounded-r-lg">
 <p className="text-gray-800 font-semibold mb-2">Pro Tip: Start met Hour-Based, Upgrade naar Project-Based</p>
 <p className="text-gray-700 mb-0">
 Begin met een simpele hour-based retainer (makkelijkste verkoop). Na 2-3 maanden zie je patronen in hun requests.
 Dan stel je voor: "Ik zie dat je elke maand ongeveer [X] vraagt. Wat als we dit standaardiseren voor een vast bedrag?"
 Dit is een <strong>natural upgrade</strong>naar project-based met 20-30% prijsverhoging.
 </p>
 </div>

 <h3 className="font-heading text-2xl font-semibold text-[#1e1541] mt-8 mb-4">
 De Retainer Pitch Template
 </h3>

 <p className="text-gray-700 leading-relaxed mb-6">
 Hoe pitch je een retainer aan een bestaande klant zonder pushy te zijn?
 </p>

 <div className="bg-green-50 border border-green-300 p-6 my-8 rounded-lg">
 <p className="text-gray-800 font-semibold mb-3">✅ Bewezen Retainer Pitch Script</p>
 <div className="bg-white p-5 rounded border border-gray-200 space-y-3">
 <p className="text-gray-700 text-sm">
 <strong>Opening (Patroon herkenning):</strong><br />
 "Ik merk dat we nu al [aantal] maanden samenwerken en dat je elke maand terugkomt met [type werk].
 Dat is geweldig, maar ik denk dat we dit efficiënter kunnen maken voor allebei."
 </p>
 <p className="text-gray-700 text-sm">
 <strong>Probleem identificatie:</strong><br />
 "Nu moet jij elke keer een nieuw project aanmaken, betaling regelen, briefing schrijven.
 En ik moet elke keer opnieuw plannen wanneer ik tijd voor je heb. Dat kost ons allebei tijd."
 </p>
 <p className="text-gray-700 text-sm">
 <strong>Oplossing presentatie:</strong><br />
 "Wat als we een maandelijks arrangement maken? Voor een vast bedrag van €[X] per maand krijg je:
 [deliverable 1], [deliverable 2], en [deliverable 3]. Plus prioriteit support als je iets extra's nodig hebt."
 </p>
 <p className="text-gray-700 text-sm">
 <strong>Voordeel voor klant:</strong><br />
 "Voor jou betekent dit: voorspelbare kosten, geen gedoe met telkens nieuwe contracten, en ik kan proactief
 meedenken omdat ik gegarandeerde tijd voor je heb. En je krijgt [10-15%] korting vs. wat je nu betaalt per project."
 </p>
 <p className="text-gray-700 text-sm">
 <strong>Soft close:</strong><br />
 "Zullen we dit een maand proberen en kijken hoe het werkt? Je kunt altijd stoppen met 30 dagen opzegtermijn."
 </p>
 </div>
 </div>

 <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
 Relationship Management: Het Dagelijkse Werk
 </h2>

 <p className="text-gray-700 leading-relaxed mb-6">
 Langdurige relaties ontstaan niet vanzelf. Ze vereisen <strong>consistent relationship management</strong>.
 </p>

 <h3 className="font-heading text-2xl font-semibold text-[#1e1541] mt-8 mb-4">
 De Wekelijkse Client Touch Routine
 </h3>

 <p className="text-gray-700 leading-relaxed mb-6">
 Top freelancers reserveren <strong>vrijdag middag (2-3 uur)</strong>voor client relationship maintenance:
 </p>

 <div className="space-y-4 mb-8">
 <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-[#ef2b70]">
 <h4 className="font-semibold text-gray-900 mb-2">Active Clients (30 min per client)</h4>
 <ul className="space-y-2 text-gray-700 text-sm">
 <li>• Stuur wekelijkse progress update (ook als er weinig vooruitgang is)</li>
 <li>• Anticipeer op vragen: "Waarschijnlijk vraag je je af over [X], hier is de status..."</li>
 <li>• Deel quick wins: "Kleine update: ik heb ook [bonus] gedaan"</li>
 </ul>
 </div>

 <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-[#ef2b70]">
 <h4 className="font-semibold text-gray-900 mb-2">Dormant Clients (10 min per client)</h4>
 <ul className="space-y-2 text-gray-700 text-sm">
 <li>• Check hun website/social media voor updates</li>
 <li>• Stuur relevante content: "Zag dit artikel, dacht aan jullie [project]"</li>
 <li>• Casual check-in: "Hoe gaat het met [eerder geleverd project]?"</li>
 </ul>
 </div>

 <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-[#ef2b70]">
 <h4 className="font-semibold text-gray-900 mb-2">Prospective Clients (5 min per client)</h4>
 <ul className="space-y-2 text-gray-700 text-sm">
 <li>• Follow-up op oude proposals die niet doorgingen</li>
 <li>• "Hoi [naam], hoe is het gegaan met [project]? Zijn jullie nog op zoek naar hulp?"</li>
 <li>• Resurrect 20-30% van "dode" leads met deze aanpak</li>
 </ul>
 </div>
 </div>

 <h3 className="font-heading text-2xl font-semibold text-[#1e1541] mt-8 mb-4">
 De Client Lifecycle Automation
 </h3>

 <p className="text-gray-700 leading-relaxed mb-6">
 Gebruik tools om relationship management te <strong>systematiseren zonder het persoonlijke gevoel te verliezen</strong>:
 </p>

 <div className="overflow-x-auto mb-8">
 <table className="w-full border-collapse text-sm">
 <thead>
 <tr className="bg-[#1e1541] text-white">
 <th className="border border-gray-300 p-3 text-left">Tool</th>
 <th className="border border-gray-300 p-3 text-left">Use Case</th>
 <th className="border border-gray-300 p-3 text-left">Kosten</th>
 </tr>
 </thead>
 <tbody>
 <tr className="bg-gray-50">
 <td className="border border-gray-300 p-3"><strong>HubSpot CRM</strong></td>
 <td className="border border-gray-300 p-3">Track client interactions, set follow-up reminders</td>
 <td className="border border-gray-300 p-3">Gratis</td>
 </tr>
 <tr>
 <td className="border border-gray-300 p-3"><strong>Streak</strong></td>
 <td className="border border-gray-300 p-3">CRM inside Gmail, perfect voor email-based workflows</td>
 <td className="border border-gray-300 p-3">$19/maand</td>
 </tr>
 <tr className="bg-gray-50">
 <td className="border border-gray-300 p-3"><strong>Notion</strong></td>
 <td className="border border-gray-300 p-3">Client database met notes, project history, templates</td>
 <td className="border border-gray-300 p-3">Gratis</td>
 </tr>
 <tr>
 <td className="border border-gray-300 p-3"><strong>Zapier</strong></td>
 <td className="border border-gray-300 p-3">Automate follow-ups, birthday emails, milestone messages</td>
 <td className="border border-gray-300 p-3">$20/maand</td>
 </tr>
 <tr className="bg-gray-50">
 <td className="border border-gray-300 p-3"><strong>Loom</strong></td>
 <td className="border border-gray-300 p-3">Personal video updates (way more engaging than text)</td>
 <td className="border border-gray-300 p-3">Gratis</td>
 </tr>
 </tbody>
 </table>
 </div>

 <div className="bg-gradient-to-r from-[#1e1541] to-[#2a1f5f] text-white p-8 rounded-xl my-12 shadow-lg">
 <h3 className="font-heading text-2xl font-bold mb-4">Klaar voor Stabiel Inkomen?</h3>
 <p className="text-lg mb-6 text-white/90">
 Sommige platforms maken het makkelijker om langdurige client relaties te onderhouden met built-in messaging en project management.
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-block bg-[#ef2b70] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#d91f5f] transition-all transform hover:scale-105 shadow-md"
 >
 Vind Jouw Platform →
 </Link>
 </div>

 <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
 Red Flags: Wanneer Moet Je Stoppen met Investeren
 </h2>

 <p className="text-gray-700 leading-relaxed mb-6">
 Niet elke klant is geschikt voor een langdurige relatie. <strong>Herken de signalen</strong>dat je energie beter elders investeert:
 </p>

 <div className="space-y-4 mb-8">
 <div className="border-l-4 border-red-500 bg-red-50 p-5">
 <h4 className="font-semibold text-red-800 mb-2">Chronisch Late Betaler</h4>
 <p className="text-gray-700 text-sm">
 Als een klant consistent &gt;30 dagen te laat betaalt ondanks reminders, stop met investeren.
 Geen retainer aanbieden - je cashflow kan dit niet aan.
 </p>
 </div>

 <div className="border-l-4 border-red-500 bg-red-50 p-5">
 <h4 className="font-semibold text-red-800 mb-2">Scope Creep Champion</h4>
 <p className="text-gray-700 text-sm">
 Klanten die constant vragen om "kleine extra's" zonder te betalen, zullen een retainer misbruiken.
 Dit patroon verandert niet - cut your losses.
 </p>
 </div>

 <div className="border-l-4 border-red-500 bg-red-50 p-5">
 <h4 className="font-semibold text-red-800 mb-2">Micro-Manager</h4>
 <p className="text-gray-700 text-sm">
 Klanten die elke pixel en woordkeuze willen controleren, zijn uitputtend voor langdurige relaties.
 Tenzij ze premium betalen (3x normaal tarief), is dit niet sustainable.
 </p>
 </div>

 <div className="border-l-4 border-red-500 bg-red-50 p-5">
 <h4 className="font-semibold text-red-800 mb-2">Chronic Complainer</h4>
 <p className="text-gray-700 text-sm">
 Als een klant na 2-3 projecten nog steeds constant ontevreden is (ondanks revisions), zal dit nooit veranderen.
 Dit is hun persoonlijkheid, niet jouw werk.
 </p>
 </div>
 </div>

 <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
 <p className="text-gray-800 font-semibold mb-2">The 80/20 Client Cull</p>
 <p className="text-gray-700 mb-0">
 Evalueer elk half jaar: welke 20% van je klanten genereert 80% van je stress? <strong>Fire them</strong>.
 Zelfs als ze goed betalen - de mental overhead is niet de moeite waard. Reinvesteer die energie in je top clients.
 </p>
 </div>

 <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
 Veelgestelde Vragen over Langdurige Klantrelaties
 </h2>

 <div className="space-y-6 mb-12">
 <div className="border-l-4 border-[#ef2b70] pl-6">
 <h4 className="font-semibold text-lg text-gray-900 mb-2">
 Hoeveel retainer clients heb ik nodig voor stabiel inkomen?
 </h4>
 <p className="text-gray-700 mb-0">
 <strong>Sweet spot: 3-7 retainer clients</strong>. Minder dan 3 = te afhankelijk van individuele clients.
 Meer dan 7 = je wordt bottleneck en kan niet schalen. Target: €2K-€5K per retainer = €10K-€25K MRR met 5 clients.
 </p>
 </div>

 <div className="border-l-4 border-[#ef2b70] pl-6">
 <h4 className="font-semibold text-lg text-gray-900 mb-2">
 Wat als een client stopt met de retainer na 2 maanden?
 </h4>
 <p className="text-gray-700 mb-0">
 <strong>Normaal</strong>. Gemiddelde retainer lifetime is 6-12 maanden. Zorg dat je altijd 2-3 nieuwe clients
 in je pipeline hebt om churn te compenseren. Target renewal rate: <strong>70-80%</strong>na eerste 3 maanden.
 </p>
 </div>

 <div className="border-l-4 border-[#ef2b70] pl-6">
 <h4 className="font-semibold text-lg text-gray-900 mb-2">
 Moet ik korting geven voor retainer commitment?
 </h4>
 <p className="text-gray-700 mb-0">
 <strong>Kleine korting (10-15%) is strategisch</strong>, maar frame het als "voorspelbaarheid discount" niet als "bulk discount".
 Zeg: "Omdat je me gegarandeerde tijd geeft, kan ik dit tegen een beter tarief doen" - niet "Je krijgt korting omdat het veel werk is".
 </p>
 </div>

 <div className="border-l-4 border-[#ef2b70] pl-6">
 <h4 className="font-semibold text-lg text-gray-900 mb-2">
 Hoe ga ik om met ongebruikte retainer uren?
 </h4>
 <p className="text-gray-700 mb-0">
 <strong>Duidelijke policy nodig</strong>. Opties: (1) "Use it or lose it" - uren vervallen einde maand,
 (2) "Rollover" - max 20% kan doorschuiven naar volgende maand, (3) "Bank" - onbeperkt sparen maar niet uitbetalen.
 Meest gebruikelijk: optie 2 (rollover met cap).
 </p>
 </div>
 </div>

 <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
 Conclusie: Relationships Are Your Real Asset
 </h2>

 <p className="text-gray-700 leading-relaxed mb-6">
 Je skill set is waardevol. Maar je <strong>client relationships zijn je échte vermogen</strong>als freelancer.
 </p>

 <p className="text-gray-700 leading-relaxed mb-6">
 <strong>Samenvatting van het langdurige relatie framework:</strong>
 </p>

 <ul className="space-y-3 mb-8">
 <li className="flex items-start gap-3">
 <span className="text-[#22c55e] text-xl mt-1">→</span>
 <span className="text-gray-700"><strong>Eerste 7 dagen</strong>- Maak een onuitwisbare eerste indruk</span>
 </li>
 <li className="flex items-start gap-3">
 <span className="text-[#22c55e] text-xl mt-1">→</span>
 <span className="text-gray-700"><strong>Mid-project</strong>- Plant zaadjes voor toekomstige projecten</span>
 </li>
 <li className="flex items-start gap-3">
 <span className="text-[#22c55e] text-xl mt-1">→</span>
 <span className="text-gray-700"><strong>Bij oplevering</strong>- De perfecte upsell window</span>
 </li>
 <li className="flex items-start gap-3">
 <span className="text-[#22c55e] text-xl mt-1">→</span>
 <span className="text-gray-700"><strong>Post-project</strong>- 30-60-90 dag follow-up routine</span>
 </li>
 <li className="flex items-start gap-3">
 <span className="text-[#22c55e] text-xl mt-1">→</span>
 <span className="text-gray-700"><strong>Retainer pitch</strong>- Na 2-3 succesvolle projecten</span>
 </li>
 <li className="flex items-start gap-3">
 <span className="text-[#22c55e] text-xl mt-1">→</span>
 <span className="text-gray-700"><strong>Wekelijkse maintenance</strong>- Investeer vrijdag middag in relaties</span>
 </li>
 </ul>

 <p className="text-gray-700 leading-relaxed mb-6">
 De shift van "project jager" naar "relationship manager" is de grootste mind-shift die je als freelancer maakt.
 </p>

 <p className="text-gray-700 leading-relaxed mb-6">
 En het resultaat? <strong>60-80% voorspelbaar inkomen</strong>van vaste clients, minder tijd aan acquisitie,
 hogere tarieven door vertrouwen, en een business die daadwerkelijk <em>asset value</em>heeft.
 </p>

 <p className="text-gray-700 leading-relaxed font-semibold">
 Start vandaag: kies je beste huidige klant en implementeer fase 1 van dit framework. Elk project is het begin van een potentieel langdurige relatie. 
 </p>
 </div>
 </article>
 </>
 );
}
