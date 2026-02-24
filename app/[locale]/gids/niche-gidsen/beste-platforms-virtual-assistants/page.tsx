import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }>}): Promise<Metadata>{
 const { locale } = await params;

 return {
 title: 'Beste Freelance Platforms voor Virtual Assistants 2026 | SkillLinkup',
 description: 'Ontdek waar VAs consistent werk vinden met recurring revenue. Vergelijk de beste platforms voor virtual assistants met vaste klanten en goede tarieven.',
 alternates: {
 canonical: `https://skilllinkup.com/${locale}/gids/niche-gidsen/beste-platforms-virtual-assistants`,
 languages: {
 'nl': 'https://skilllinkup.com/nl/gids/niche-gidsen/beste-platforms-virtual-assistants',
 'en': 'https://skilllinkup.com/en/guide/niche-guides/best-platforms-virtual-assistants',
 'x-default': 'https://skilllinkup.com/en/guide/niche-guides/best-platforms-virtual-assistants',
 }
 },
 openGraph: {
 title: 'Beste Freelance Platforms voor Virtual Assistants 2026',
 description: 'Vind platforms met vaste klanten en recurring revenue voor VAs.',
 url: `https://skilllinkup.com/${locale}/gids/niche-gidsen/beste-platforms-virtual-assistants`,
 siteName: 'SkillLinkup',
 locale: 'nl_NL',
 type: 'article',
 }
 };
}

export default async function BestePlatformsVirtualAssistantsPage({ params }: { params: Promise<{ locale: string }>}) {
 const { locale } = await params;

 const jsonLd = {
 '@context': 'https://schema.org',
 '@type': 'Article',
 headline: 'Beste Freelance Platforms voor Virtual Assistants 2026',
 description: 'Ontdek waar VAs consistent werk vinden met recurring revenue.',
 author: {
 '@type': 'Organization',
 name: 'SkillLinkup'
 },
 publisher: {
 '@type': 'Organization',
 name: 'SkillLinkup',
 logo: {
 '@type': 'ImageObject',
 url: 'https://skilllinkup.com/images/logo.png'
 }
 },
 datePublished: '2026-01-01',
 dateModified: '2026-01-01'
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />

 <div className="bg-gradient-to-br from-[#1e1541] via-[#2a1f5e] to-[#1e1541] text-white">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
 <div className="max-w-4xl mx-auto">
 <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
 Beste Freelance Platforms voor Virtual Assistants in 2026
 </h1>
 <p className="text-xl md:text-2xl text-gray-300 mb-8">
 Als VA wil je geen losse klusjes van €5 per uur. Je wilt vaste klanten met recurring revenue die jouw tijd waarderen. Hier vind je de platforms waar dat mogelijk is.
 </p>
 <div className="flex flex-wrap gap-4">
 <Link
 href={`/${locale}/platforms`}
 className="rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-3 text-white font-heading font-semibold shadow-lg transition-colors"
 >
 Vind Jouw Platform →
 </Link>
 <Link
 href={`/${locale}/gids/niche-gidsen`}
 className="rounded-lg bg-white/10 hover:bg-white/20 px-8 py-3 text-white font-heading font-semibold border border-white/30 transition-colors"
 >
 Meer Niche Gidsen
 </Link>
 </div>
 </div>
 </div>
 </div>

 <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
 <div className="max-w-4xl mx-auto">

 <section className="mb-12">
 <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1e1541] mb-6">
 Waarom niet elk platform geschikt is voor VAs
 </h2>
 <p className="text-lg text-[#64607d] mb-4">
 Het probleem met algemene freelance platforms? Ze zijn gebouwd voor eenmalige projecten. Maar als VA wil je <strong className="text-[#1e1541]">vaste klanten die je maandelijks betalen</strong>.
 </p>
 <p className="text-lg text-[#64607d] mb-4">
 Een developer kan €3.000 verdienen met één project en doorgaan naar de volgende. Als VA werk je anders: je verdient €500-1.500 per maand per klant, maar dan wel voor 3-12 maanden (of langer).
 </p>
 <p className="text-lg text-[#64607d] mb-6">
 In deze gids laten we je zien welke platforms gebouwd zijn voor long-term VA werk, met klanten die begrijpen dat een goede VA je business draait en daar ook voor willen betalen.
 </p>
 </section>

 <section className="mb-12">
 <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1e1541] mb-6">
 Top 6 platforms voor virtual assistants
 </h2>

 <div className="space-y-8">
 <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
 <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-3">
 1. Belay - Voor premium VAs (€20-40/uur)
 </h3>
 <p className="text-[#64607d] mb-4">
 <strong className="text-[#1e1541]">Waarom dit platform?</strong>Belay is het Toptal van virtual assistants. Ze screenen zwaar (3% acceptance), maar als je erin komt, krijg je toegang tot enterprise klanten die €25-40/uur betalen.
 </p>
 <ul className="space-y-2 mb-4">
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span className="text-[#64607d]"><strong>Top tarieven:</strong>€25-40/uur voor ervaren VAs</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span className="text-[#64607d]"><strong>Vaste klanten:</strong>Gemiddeld 6-12 maanden contracten</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span className="text-[#64607d]"><strong>Benefits:</strong>Betaalde vakantiedagen en zorgverzekering</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span className="text-[#64607d]"><strong>Full support:</strong>Backup VAs als je ziek bent</span>
 </li>
 </ul>
 <p className="text-[#64607d] italic">
 Let op: Je hebt minimaal 3-5 jaar VA ervaring nodig. Dit is niet voor starters.
 </p>
 </div>

 <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
 <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-3">
 2. Time Etc - Voor UK/US markt (£18-30/uur)
 </h3>
 <p className="text-[#64607d] mb-4">
 <strong className="text-[#1e1541]">Waarom dit platform?</strong>Time Etc heeft 10.000+ klanten en focust op long-term matches. Ze betalen goed en hun klanten zijn loyaal.
 </p>
 <ul className="space-y-2 mb-4">
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span className="text-[#64607d]"><strong>Stable income:</strong>Terugkerende maandelijkse klanten</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span className="text-[#64607d]"><strong>Flexibel:</strong>Kies je eigen uren (10-40u/week)</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span className="text-[#64607d]"><strong>Goed betaald:</strong>£18-30/uur afhankelijk van skills</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span className="text-[#64607d]"><strong>Training:</strong>Gratis training en skill development</span>
 </li>
 </ul>
 </div>

 <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
 <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-3">
 3. Upwork - Voor volume en variety (€15-35/uur)
 </h3>
 <p className="text-[#64607d] mb-4">
 <strong className="text-[#1e1541]">Waarom dit platform?</strong>Upwork heeft 500+ nieuwe VA opdrachten per week. Perfect om je eerste klanten te vinden en long-term relaties op te bouwen.
 </p>
 <ul className="space-y-2 mb-4">
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span className="text-[#64607d]"><strong>Enorm volume:</strong>Altijd werk beschikbaar</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span className="text-[#64607d]"><strong>Diverse taken:</strong>Email, kalender, social media, admin</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span className="text-[#64607d]"><strong>Easy start:</strong>Ook voor beginnende VAs</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span className="text-[#64607d]"><strong>Retainer friendly:</strong>Recurring contracts feature</span>
 </li>
 </ul>
 <p className="text-[#64607d] italic">
 Let op: 10% commissie, maar veel VAs vinden hier multi-jaar klanten.
 </p>
 </div>

 <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
 <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-3">
 4. Fancy Hands - Voor task-based VAs ($3-7 per taak)
 </h3>
 <p className="text-[#64607d] mb-4">
 <strong className="text-[#1e1541]">Waarom dit platform?</strong>Fancy Hands werkt met kleine taken (15-30 min). Perfect om extra bij te verdienen naast vaste klanten.
 </p>
 <ul className="space-y-2 mb-4">
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span className="text-[#64607d]"><strong>Flexible:</strong>Pak taken wanneer je tijd hebt</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span className="text-[#64607d]"><strong>Quick tasks:</strong>15-30 minuten per taak</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span className="text-[#64607d]"><strong>Easy entry:</strong>Geen interview proces</span>
 </li>
 </ul>
 <p className="text-[#64607d] italic">
 Realistisch: €300-600/maand extra als je 10-20 uur per week werkt.
 </p>
 </div>

 <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
 <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-3">
 5. MyOutDesk - Voor real estate VAs (€10-25/uur)
 </h3>
 <p className="text-[#64607d] mb-4">
 <strong className="text-[#1e1541]">Waarom dit platform?</strong>Gespecialiseerd in VAs voor makelaars. Als je interesse hebt in real estate, is dit een goudmijn.
 </p>
 <ul className="space-y-2 mb-4">
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span className="text-[#64607d]"><strong>Niche focus:</strong>Alleen real estate klanten</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span className="text-[#64607d]"><strong>Training provided:</strong>Gratis real estate training</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span className="text-[#64607d]"><strong>Long-term:</strong>Makelaars zoeken vaste VAs</span>
 </li>
 </ul>
 </div>

 <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
 <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-3">
 6. Zirtual - Voor startup VAs (€15-30/uur)
 </h3>
 <p className="text-[#64607d] mb-4">
 <strong className="text-[#1e1541]">Waarom dit platform?</strong>Zirtual richt zich op startups en entrepreneurs. Je werkt voor ambitieuze founders die snel groeien.
 </p>
 <ul className="space-y-2 mb-4">
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span className="text-[#64607d]"><strong>Startup cultuur:</strong>Dynamische, jonge klanten</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span className="text-[#64607d]"><strong>Growth potential:</strong>Groei mee met succesvolle startups</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] mr-2">✓</span>
 <span className="text-[#64607d]"><strong>Diverse taken:</strong>Niet alleen admin, ook projecten</span>
 </li>
 </ul>
 </div>
 </div>
 </section>

 <div className="rounded-lg bg-gradient-to-r from-[#ef2b70] to-[#d91a5f] p-8 text-white mb-12">
 <h3 className="font-heading text-2xl font-bold mb-4">
 Ben je gespecialiseerde VA?
 </h3>
 <p className="text-lg mb-6">
 Social media VAs, bookkeeping VAs, en executive assistants kunnen hogere tarieven vragen (€30-60/uur). Filter platforms op jouw specialisatie.
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-block rounded-lg bg-white text-[#ef2b70] hover:bg-gray-100 px-8 py-3 font-heading font-semibold shadow-lg transition-colors"
 >
 Filter op Specialisatie →
 </Link>
 </div>

 <section className="mb-12">
 <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1e1541] mb-6">
 Hoe kies je het juiste platform als VA?
 </h2>

 <div className="space-y-6">
 <div>
 <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-3">
 Bepaal je VA specialisatie
 </h3>
 <p className="text-[#64607d] mb-4">
 "Ik kan alles" werkt niet. Specialisten verdienen 50-100% meer. Hier zijn de meest lucratieve niches:
 </p>
 <div className="rounded-lg shadow bg-white p-6">
 <ul className="space-y-3">
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3">→</span>
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Executive Assistant:</strong>€30-60/uur. Voor C-level executives. Belay en Time Etc zijn perfect.
 </span>
 </li>
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3">→</span>
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Social Media VA:</strong>€20-40/uur. Content planning, posting, engagement. Upwork heeft veel vraag.
 </span>
 </li>
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3">→</span>
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Bookkeeping VA:</strong>€25-50/uur. QuickBooks/Xero kennis vereist. Time Etc en Belay betalen goed.
 </span>
 </li>
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3">→</span>
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Real Estate VA:</strong>€15-30/uur. MyOutDesk is de specialist hier.
 </span>
 </li>
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3">→</span>
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">General Admin VA:</strong>€15-25/uur. Upwork en Fancy Hands voor hoog volume.
 </span>
 </li>
 </ul>
 </div>
 </div>

 <div>
 <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-3">
 Platform strategie: start breed, word specifiek
 </h3>
 <p className="text-[#64607d] mb-4">
 Veel VAs maken de fout om meteen te solliciteren bij premium platforms (Belay, Time Etc) zonder ervaring. Beter plan:
 </p>
 <div className="space-y-4">
 <div className="rounded-lg shadow bg-white p-6">
 <h4 className="font-heading font-bold text-[#1e1541] mb-2">Fase 1: Ervaring opbouwen (Maand 1-3)</h4>
 <p className="text-[#64607d] mb-3">
 Start op <strong>Upwork</strong>of <strong>Fancy Hands</strong>. Vraag €15-20/uur. Doel: 5-10 goede reviews verzamelen en leren wat voor werk je leuk vindt.
 </p>
 </div>
 <div className="rounded-lg shadow bg-white p-6">
 <h4 className="font-heading font-bold text-[#1e1541] mb-2">Fase 2: Specialiseren (Maand 4-6)</h4>
 <p className="text-[#64607d] mb-3">
 Kies een niche op basis van je ervaring. Verhoog tarief naar €25-30/uur. Solliciteer bij <strong>Time Etc</strong>of <strong>Zirtual</strong>.
 </p>
 </div>
 <div className="rounded-lg shadow bg-white p-6">
 <h4 className="font-heading font-bold text-[#1e1541] mb-2">Fase 3: Premium (Maand 6+)</h4>
 <p className="text-[#64607d]">
 Met 1+ jaar ervaring solliciteer je bij <strong>Belay</strong>. Verdien €30-40/uur met vaste benefits. Dit is de endgame voor VAs.
 </p>
 </div>
 </div>
 </div>
 </div>
 </section>

 <section className="mb-12">
 <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1e1541] mb-6">
 Skills die je nodig hebt als VA in 2026
 </h2>
 <p className="text-lg text-[#64607d] mb-6">
 De VA markt evolueert. Hier zijn de must-have skills om competitief te blijven:
 </p>

 <div className="space-y-6">
 <div className="rounded-lg shadow bg-white p-6">
 <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
 1. Tool mastery (niet alleen basics!)
 </h3>
 <p className="text-[#64607d] mb-3">
 Klanten verwachten dat je hun tools kent. Investeer tijd in:
 </p>
 <div className="grid md:grid-cols-2 gap-4">
 <ul className="space-y-2 ml-6 list-disc text-[#64607d]">
 <li><strong>Email & Calendar:</strong>Gmail, Outlook, Calendly</li>
 <li><strong>Project Management:</strong>Asana, Trello, ClickUp, Monday</li>
 <li><strong>Communication:</strong>Slack, Teams, Zoom</li>
 <li><strong>File Management:</strong>Google Drive, Dropbox, OneDrive</li>
 </ul>
 <ul className="space-y-2 ml-6 list-disc text-[#64607d]">
 <li><strong>CRM:</strong>HubSpot, Salesforce basics</li>
 <li><strong>Social Media:</strong>Hootsuite, Buffer, Later</li>
 <li><strong>Accounting:</strong>QuickBooks, Xero (basis)</li>
 <li><strong>Design:</strong>Canva, basic Photoshop</li>
 </ul>
 </div>
 </div>

 <div className="rounded-lg shadow bg-white p-6">
 <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
 2. Proactive mindset (niet alleen taken afvinken)
 </h3>
 <p className="text-[#64607d] mb-3">
 Goede VAs denken mee, slechte VAs wachten op instructies. Voorbeelden:
 </p>
 <ul className="space-y-2 ml-6 list-disc text-[#64607d]">
 <li>"Ik zag dat je kalender vol zit volgende week. Moet ik meetings verschuiven?"</li>
 <li>"Deze vendor is 20% duurder geworden. Ik heb 3 alternatieven gevonden."</li>
 <li>"Je inbox had 200 ongelezen emails. Ik heb ze gesorteerd op prioriteit."</li>
 </ul>
 <p className="text-[#64607d] mt-3 italic">
 Dit is waarom topklanten €40/uur betalen vs €15/uur.
 </p>
 </div>

 <div className="rounded-lg shadow bg-white p-6">
 <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
 3. Communication excellence
 </h3>
 <p className="text-[#64607d]">
 VAs werken remote. Slechte communicatie = verloren klanten. Master het:
 </p>
 <ul className="space-y-2 ml-6 list-disc text-[#64607d] mt-3">
 <li><strong>Response tijd:</strong>Binnen 2 uur tijdens werkuren</li>
 <li><strong>Proactive updates:</strong>Wekelijkse summary van gedane werk</li>
 <li><strong>Clear writing:</strong>Geen miscommunicatie door vage emails</li>
 <li><strong>Time zone awareness:</strong>Weet wanneer je klant online is</li>
 </ul>
 </div>
 </div>
 </section>

 <div className="rounded-lg bg-[#f8f9fb] p-8 mb-12">
 <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-4">
 Pricing guide voor VAs
 </h3>
 <p className="text-[#64607d] mb-6">
 Wat moet je vragen? Hier zijn marktconforme tarieven:
 </p>
 <div className="rounded-lg shadow bg-white p-6">
 <table className="w-full text-left">
 <thead>
 <tr className="border-b">
 <th className="pb-3 font-heading text-[#1e1541]">Specialisatie</th>
 <th className="pb-3 font-heading text-[#1e1541]">Beginner</th>
 <th className="pb-3 font-heading text-[#1e1541]">Ervaren</th>
 <th className="pb-3 font-heading text-[#1e1541]">Expert</th>
 </tr>
 </thead>
 <tbody className="text-[#64607d]">
 <tr className="border-b">
 <td className="py-3">General Admin</td>
 <td className="py-3">€10-15/u</td>
 <td className="py-3">€15-25/u</td>
 <td className="py-3">€25-35/u</td>
 </tr>
 <tr className="border-b">
 <td className="py-3">Social Media</td>
 <td className="py-3">€15-20/u</td>
 <td className="py-3">€20-30/u</td>
 <td className="py-3">€30-50/u</td>
 </tr>
 <tr className="border-b">
 <td className="py-3">Executive Assistant</td>
 <td className="py-3">€20-25/u</td>
 <td className="py-3">€25-40/u</td>
 <td className="py-3">€40-60/u</td>
 </tr>
 <tr className="border-b">
 <td className="py-3">Bookkeeping</td>
 <td className="py-3">€20-25/u</td>
 <td className="py-3">€25-40/u</td>
 <td className="py-3">€40-60/u</td>
 </tr>
 <tr>
 <td className="py-3">Real Estate VA</td>
 <td className="py-3">€12-18/u</td>
 <td className="py-3">€18-28/u</td>
 <td className="py-3">€28-40/u</td>
 </tr>
 </tbody>
 </table>
 </div>
 <p className="text-sm text-[#64607d] mt-4 italic">
 * Amerikaanse klanten betalen vaak 20-40% meer dan Europese klanten.
 </p>
 </div>

 <section className="mb-12">
 <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1e1541] mb-6">
 Stappenplan: je eerste €2.000/maand als VA
 </h2>

 <div className="space-y-4">
 <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#22c55e]">
 <div className="flex items-start">
 <span className="text-3xl font-bold text-[#1e1541] mr-4">1</span>
 <div>
 <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-2">
 Kies je eerste platform (Week 1)
 </h3>
 <p className="text-[#64607d]">
 Als beginner: <strong>Upwork</strong>. Ze hebben het meeste volume en ook ruimte voor starters. Maak een profiel met 2-3 niche skills (bijv. "Email management + Calendar + Slack").
 </p>
 </div>
 </div>
 </div>

 <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#22c55e]">
 <div className="flex items-start">
 <span className="text-3xl font-bold text-[#1e1541] mr-4">2</span>
 <div>
 <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-2">
 Land je eerste klanten (Week 1-3)
 </h3>
 <p className="text-[#64607d] mb-3">
 Bid op 10-15 opdrachten per dag. Schrijf custom proposals. Target: 2-3 klanten met recurring werk (10-20 uur per week).
 </p>
 <p className="text-[#64607d] italic">
 Start tarief: €15-18/uur. Focus op reviews krijgen, niet op geld.
 </p>
 </div>
 </div>
 </div>

 <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#22c55e]">
 <div className="flex items-start">
 <span className="text-3xl font-bold text-[#1e1541] mr-4">3</span>
 <div>
 <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-2">
 Overdeliver en upsell (Maand 1-2)
 </h3>
 <p className="text-[#64607d] mb-3">
 Lever meer dan beloofd. Als je inbox management doet, stel dan ook filters in. Als je kalender beheert, optimaliseer dan ook meeting tijden.
 </p>
 <p className="text-[#64607d] italic">
 Klanten uitbreiden van 10u naar 20u per week = dubbel inkomen zonder nieuwe acquisitie.
 </p>
 </div>
 </div>
 </div>

 <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#22c55e]">
 <div className="flex items-start">
 <span className="text-3xl font-bold text-[#1e1541] mr-4">4</span>
 <div>
 <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-2">
 Schaal naar €2.000+ (Maand 2-4)
 </h3>
 <p className="text-[#64607d] mb-3">
 Met 5+ goede reviews:
 </p>
 <ul className="space-y-1 ml-6 list-disc text-[#64607d]">
 <li>Verhoog tarief naar €22-25/uur</li>
 <li>3 klanten × 30 uur per week = €2.000-2.250/maand</li>
 <li>Of: Solliciteer bij Time Etc of Belay</li>
 </ul>
 </div>
 </div>
 </div>
 </div>
 </section>

 <section className="mb-12">
 <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1e1541] mb-6">
 Veelgestelde vragen van VAs
 </h2>

 <div className="space-y-6">
 <div className="rounded-lg shadow bg-white p-6">
 <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
 Kan ik fulltime leven als VA in Nederland?
 </h3>
 <p className="text-[#64607d]">
 Absoluut. Met €25/uur en 30 factuurbare uren per week verdien je €3.000 bruto per maand. Trek 30-35% belasting af en je houdt €2.000-2.100 netto over. Dat is meer dan minimumloon en je werkt vanuit huis.
 </p>
 </div>

 <div className="rounded-lg shadow bg-white p-6">
 <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
 Moet ik werken in Amerikaanse tijdzones?
 </h3>
 <p className="text-[#64607d]">
 Niet altijd. Veel Amerikaanse klanten zijn blij met VAs die werken tijdens Europese uren (voor hun early morning work). Maar executive assistants moeten vaak wel overlappen met klant tijdzone. Kies klanten op basis van jouw voorkeur.
 </p>
 </div>

 <div className="rounded-lg shadow bg-white p-6">
 <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
 Hoe behoud ik klanten long-term?
 </h3>
 <p className="text-[#64607d]">
 3 geheimen: (1) Wees betrouwbaar - doe wat je zegt. (2) Wees proactief - los problemen op voordat klant het ziet. (3) Communiceer transparant - weekly updates, geen verrassingen. Klanten betalen graag voor peace of mind.
 </p>
 </div>

 <div className="rounded-lg shadow bg-white p-6">
 <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-3">
 Welke certificeringen helpen om meer te verdienen?
 </h3>
 <p className="text-[#64607d]">
 QuickBooks certification (€30-40/uur), HubSpot certification (gratis!), Google Workspace certification (gratis). Ook: Project Management courses op Coursera. Investeer €200-500 in certificaten en verdien €5-10/uur meer.
 </p>
 </div>
 </div>
 </section>

 <div className="rounded-lg bg-[#f8f9fb] p-8 mb-12">
 <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-4">
 Ontdek meer niche gidsen
 </h3>
 <div className="grid md:grid-cols-2 gap-4">
 <Link
 href={`/${locale}/gids/niche-gidsen/beste-platforms-schrijvers`}
 className="rounded-lg bg-white hover:shadow-lg p-4 border border-gray-200 transition-shadow"
 >
 <h4 className="font-heading font-semibold text-[#1e1541] mb-2">
 Voor Schrijvers →
 </h4>
 <p className="text-sm text-[#64607d]">
 Content platforms met vaste opdrachten en eerlijke tarieven
 </p>
 </Link>
 <Link
 href={`/${locale}/gids/niche-gidsen/beste-platforms-marketing-consultants`}
 className="rounded-lg bg-white hover:shadow-lg p-4 border border-gray-200 transition-shadow"
 >
 <h4 className="font-heading font-semibold text-[#1e1541] mb-2">
 Voor Marketing Consultants →
 </h4>
 <p className="text-sm text-[#64607d]">
 High-ticket platforms voor marketing specialisten
 </p>
 </Link>
 </div>
 </div>

 <div className="rounded-lg bg-gradient-to-br from-[#1e1541] to-[#2a1f5e] p-8 text-white text-center">
 <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
 Klaar om te starten als Virtual Assistant?
 </h3>
 <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
 Vergelijk alle VA platforms op tarieven, type klanten, contract lengte en support. Vind het platform waar jouw organisatorische talent het meest gewaardeerd wordt.
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-colors text-lg"
 >
 Vind Jouw Ideale Platform →
 </Link>
 </div>

 </div>
 </article>
 </>
 );
}
