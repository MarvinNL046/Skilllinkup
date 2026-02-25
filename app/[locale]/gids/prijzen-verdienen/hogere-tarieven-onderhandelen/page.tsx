import Link from "next/link";
import { Metadata } from "next";

type Props = {
 params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'hogere-tarieven-onderhandelen';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/prijzen-verdienen/${slug}`;

 if (locale === 'nl') {
 return {
 title: "Hogere Freelance Tarieven Onderhandelen: 9 Technieken Die Werken in 2026",
 description: "Leer hoe je 30-50% meer vraagt zonder klanten te verliezen. Bewezen onderhandelingstechnieken, scripts en psychologische tactieken die topfreelancers gebruiken.",
 keywords: "freelance onderhandelen, hogere tarieven vragen, prijsonderhandeling, freelance sales, rate negotiation, pricing psychology",
 openGraph: {
 title: "Hogere Freelance Tarieven Onderhandelen: 9 Technieken Die Werken in 2026",
 description: "Leer hoe je 30-50% meer vraagt zonder klanten te verliezen. Bewezen onderhandelingstechnieken, scripts en psychologische tactieken.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Hogere Tarieven Onderhandelen - SkillLinkup',
 }
 ],
 locale: 'nl_NL',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "Hogere Freelance Tarieven Onderhandelen: 9 Technieken Die Werken",
 description: "Leer hoe je 30-50% meer vraagt zonder klanten te verliezen. Bewezen onderhandelingstechnieken en scripts.",
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 },
 };
 }

 return {
 title: "Negotiate Higher Freelance Rates: 9 Techniques That Work in 2026",
 description: "Learn how to charge 30-50% more without losing clients. Proven negotiation techniques, scripts and psychological tactics top freelancers use.",
 keywords: "freelance negotiation, higher rates, price negotiation, freelance sales, rate negotiation, pricing psychology",
 openGraph: {
 title: "Negotiate Higher Freelance Rates: 9 Techniques That Work in 2026",
 description: "Learn how to charge 30-50% more without losing clients. Proven negotiation techniques, scripts and psychological tactics.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Negotiate Higher Rates - SkillLinkup',
 }
 ],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "Negotiate Higher Freelance Rates: 9 Techniques That Work",
 description: "Learn how to charge 30-50% more without losing clients. Proven negotiation techniques and scripts.",
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 },
 };
}

export default async function HogereTarievenOnderhandelenPage({ params }: Props) {
 const { locale } = await params;

 const content = locale === 'nl' ? {
 h1: "Hogere Tarieven Onderhandelen Zonder Klanten Te Verliezen",
 intro: "Je wilt meer vragen. Maar telkens als je het bedrag noemt, voel je je schuldig. 'Misschien is dit te veel?' Die stem in je hoofd kost je duizenden euro's per jaar. Tijd om dat te veranderen.",
 cta1: "Bereken Je Doeltarief",
 cta1Url: "/nl/tools/rate-calculator",
 } : {
 h1: "Negotiate Higher Rates Without Losing Clients",
 intro: "You want to charge more. But every time you mention the amount, you feel guilty. 'Maybe this is too much?' That voice in your head costs you thousands per year. Time to change that.",
 cta1: "Calculate Your Target Rate",
 cta1Url: "/en/tools/rate-calculator",
 };

 return (
 <>
 

 <main className="min-h-screen bg-[#f8f9fb]">
 {/* Hero Section */}
 <section className="bg-gradient-to-br from-[#1e1541] via-[#2a1f5e] to-[#1e1541] text-white py-16">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
 {content.h1}
 </h1>
 <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
 {content.intro}
 </p>
 <Link
 href={content.cta1Url}
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 {content.cta1} →
 </Link>
 </div>
 </div>
 </section>

 {/* Main Content */}
 <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">

 {locale === 'nl' ? (
 <>
 {/* Section 1: The Mindset Shift */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 De #1 Reden Waarom Freelancers Te Weinig Vragen
 </h2>

 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Het probleem is niet je onderhandelingstechniek. Het is je <strong className="text-[#1e1541]">mindset</strong>. Herken je dit?
 </p>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
 Schadelijke Gedachten Die Je Tegenhouden
 </h3>
 <div className="space-y-4">
 <div className="flex items-start">
 <span className="text-red-500 text-2xl mr-3">❌</span>
 <div>
 <p className="text-[#64607d]">
 <strong className="text-[#1e1541]">"Dit bedrag is te hoog"</strong>→ Gebaseerd op wat? Je angst of marktdata?
 </p>
 </div>
 </div>
 <div className="flex items-start">
 <span className="text-red-500 text-2xl mr-3">❌</span>
 <div>
 <p className="text-[#64607d]">
 <strong className="text-[#1e1541]">"Ze zullen 'nee' zeggen"</strong>→ En dan? Je huidige situatie verandert niet.
 </p>
 </div>
 </div>
 <div className="flex items-start">
 <span className="text-red-500 text-2xl mr-3">❌</span>
 <div>
 <p className="text-[#64607d]">
 <strong className="text-[#1e1541]">"Ik ben nog niet goed genoeg"</strong>→ Niemand voelt zich 100% klaar. Start nu.
 </p>
 </div>
 </div>
 <div className="flex items-start">
 <span className="text-red-500 text-2xl mr-3">❌</span>
 <div>
 <p className="text-[#64607d]">
 <strong className="text-[#1e1541]">"Andere freelancers vragen minder"</strong>→ Reden te meer om jezelf te differentiëren.
 </p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-white mb-8">
 <h3 className="font-heading font-bold text-2xl mb-4">
 De Mindset Shift Die Alles Verandert
 </h3>
 <p className="text-lg text-white/90 mb-4">
 Je verkoopt geen <strong>tijd</strong>. Je verkoopt <strong>transformatie</strong>.
 </p>
 <p className="text-white/90">
 Klanten betalen niet voor 40 uur werk. Ze betalen voor een website die €100.000 extra omzet genereert. Voor een design dat hun klantenconversie verdubbelt. Voor code die hun platform schaalt naar 1 miljoen gebruikers.
 </p>
 </div>

 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg">
 <p className="text-[#1e1541] font-semibold mb-2">
 Onderhandel Regel #1
 </p>
 <p className="text-[#64607d]">
 Wie het eerst over geld praat, verliest. Laat de klant eerst de waarde zien die ze zoeken. Dan pas prijs je die waarde.
 </p>
 </div>
 </div>
 </section>

 {/* Technique 1: Anchor High */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Techniek #1: Anchor High (Hoog Beginnen)
 </h2>

 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Psychologie feit: het eerste getal dat genoemd wordt <strong className="text-[#1e1541]">bepaalt de onderhandeling</strong>. Dit heet <em>anchoring bias</em>.
 </p>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
 Voorbeeld: Website Project
 </h3>

 <div className="grid md:grid-cols-2 gap-8 mb-6">
 <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
 <h4 className="font-semibold text-lg text-red-700 mb-4">❌ Laag Beginnen</h4>
 <p className="text-sm text-[#64607d] mb-4">
 <strong className="text-[#1e1541]">Jij:</strong>"Ik dacht aan €3.000?"
 </p>
 <p className="text-sm text-[#64607d] mb-4">
 <strong className="text-[#1e1541]">Client:</strong>"Hmm, kunnen we €2.500 doen?"
 </p>
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Resultaat:</strong>Je eindigt op €2.700 (10% korting)
 </p>
 </div>

 <div className="bg-[#22c55e]/10 border-2 border-[#22c55e] rounded-lg p-6">
 <h4 className="font-semibold text-lg text-[#22c55e] mb-4">✅ Hoog Beginnen</h4>
 <p className="text-sm text-[#64607d] mb-4">
 <strong className="text-[#1e1541]">Jij:</strong>"Voor deze scope is het €5.000."
 </p>
 <p className="text-sm text-[#64607d] mb-4">
 <strong className="text-[#1e1541]">Client:</strong>"Dat is wat hoog, kunnen we €4.000 doen?"
 </p>
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Resultaat:</strong>Je eindigt op €4.500 (33% meer!)
 </p>
 </div>
 </div>

 <div className="bg-[#f8f9fb] rounded-lg p-6">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
 Hoe Hoog Is Te Hoog?
 </h4>
 <p className="text-[#64607d] mb-3">
 Vuistregel: <strong className="text-[#1e1541]">Start 20-30% boven je doeltarief</strong>. Dit geeft ruimte om te "onderhandelen" naar je eigenlijke doel.
 </p>
 <p className="text-sm text-[#64607d]">
 Als je €75/uur wilt verdienen, vraag €90-100/uur. Na onderhandeling eindig je op €80-85/uur.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* Technique 2: Value Framing */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Techniek #2: Value Framing (Waarde Verpakking)
 </h2>

 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Verander de conversatie van <em>"Hoeveel kost dit?"</em>naar <em>"Wat levert dit op?"</em>
 </p>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
 Script Template: Van Kosten naar Waarde
 </h3>

 <div className="space-y-6">
 <div className="border-l-4 border-[#ef2b70] pl-6 py-4 bg-[#fff8f8]">
 <p className="text-[#1e1541] font-semibold mb-2">❌ Kosten-Focused:</p>
 <p className="text-[#64607d] italic">
 "Een nieuwe website kost €5.000. Dat is mijn tarief."
 </p>
 </div>

 <div className="border-l-4 border-[#22c55e] pl-6 py-4 bg-[#22c55e]/5">
 <p className="text-[#1e1541] font-semibold mb-2">✅ Waarde-Focused:</p>
 <p className="text-[#64607d] italic mb-4">
 "Jullie doel is 30% meer leads via de website, toch? Op basis van jullie huidige 200 leads/maand betekent dat 60 extra leads."
 </p>
 <p className="text-[#64607d] italic mb-4">
 "Als jullie conversie rate 10% is, zijn dat 6 extra klanten per maand. Bij een average order value van €500 is dat €3.000 extra omzet per maand."
 </p>
 <p className="text-[#64607d] italic">
 "Mijn investering van €5.000 levert na 2 maanden al €6.000 op. Na 12 maanden: €36.000. Dat is een ROI van 620%."
 </p>
 </div>
 </div>

 <div className="bg-[#f8f9fb] rounded-lg p-6 mt-6">
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
 De Waarde Formule
 </h4>
 <div className="space-y-2 text-[#64607d]">
 <p>1. <strong className="text-[#1e1541]">Vraag naar hun doel</strong>(meer leads, hogere conversie, lagere kosten)</p>
 <p>2. <strong className="text-[#1e1541]">Kwantificeer de impact</strong>(hoeveel meer/minder in €)</p>
 <p>3. <strong className="text-[#1e1541]">Bereken ROI</strong>(wat levert jouw werk op?)</p>
 <p>4. <strong className="text-[#1e1541]">Frame je prijs</strong>als investering met return</p>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* CTA Section 1 */}
 <section className="mb-16">
 <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Leer Value-Based Pricing
 </h3>
 <p className="text-xl mb-6 text-gray-300">
 Ontdek geavanceerde prijsstrategieën die je 2-3x meer laten verdienen
 </p>
 <Link
 href="/nl/gids/prijzen-verdienen/freelance-prijsstrategieen"
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Bekijk Prijsstrategieën →
 </Link>
 </div>
 </section>

 {/* Technique 3-6: Quick Overview */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 6 Extra Onderhandelingstechnieken
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 Techniek #3: Silence Is Power
 </h3>
 <p className="text-[#64607d] mb-4">
 Noem je tarief en <strong className="text-[#1e1541]">zwijg</strong>. Niet verantwoorden, niet uitleggen, gewoon wachten. De eerste die praat, verliest meestal.
 </p>
 <div className="bg-[#f8f9fb] rounded-lg p-4">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Voorbeeld:</strong>"Voor deze scope is mijn tarief €5.000." [3 seconden stilte] Als client dan zegt "Dat is hoog", antwoord je: "Wat is jouw budget dan?" Laat hen eerst een getal noemen.
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 Techniek #4: Good-Better-Best Options
 </h3>
 <p className="text-[#64607d] mb-4">
 Bied altijd 3 opties. De meeste klanten kiezen het middelste pakket (wat je eigenlijke doel is).
 </p>
 <div className="bg-[#f8f9fb] rounded-lg p-4">
 <ul className="space-y-2 text-sm text-[#64607d]">
 <li>• <strong className="text-[#1e1541]">Basic:</strong>€3.000 (minimum features)</li>
 <li>• <strong className="text-[#1e1541]">Premium:</strong>€5.000 (jouw doel - best value)</li>
 <li>• <strong className="text-[#1e1541]">Enterprise:</strong>€8.000 (extra's)</li>
 </ul>
 <p className="text-sm text-[#64607d] mt-3">
 60-70% kiest Premium omdat het "redelijk" lijkt vergeleken met Enterprise.
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 Techniek #5: "Flinch" Techniek
 </h3>
 <p className="text-[#64607d] mb-4">
 Klant zegt een budget dat te laag is? Reageer met verbazing: <em>"Oh, voor dat budget kunnen we helaas niet de kwaliteit leveren die jullie zoeken."</em>
 </p>
 <div className="bg-[#f8f9fb] rounded-lg p-4">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Waarom dit werkt:</strong>Je "flinch" (terugdeinzen) laat hen twijfelen aan hun budget. Vaak komen ze zelf met een hoger bedrag terug.
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 Techniek #6: Trade, Don't Discount
 </h3>
 <p className="text-[#64607d] mb-4">
 Nooit zomaar korting geven. Als ze vragen om lagere prijs, <strong className="text-[#1e1541]">verwijder features</strong>in plaats van prijs verlagen.
 </p>
 <div className="bg-[#f8f9fb] rounded-lg p-4">
 <p className="text-sm text-[#64607d] mb-3">
 <strong className="text-[#1e1541]">Client:</strong>"Kunnen we €4.000 doen in plaats van €5.000?"
 </p>
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Jij:</strong>"Zeker! Dan halen we de blog sectie en contact form eraf. Of willen jullie die features wel? Dan blijft het €5.000."
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 Techniek #7: "That's Fair" Response
 </h3>
 <p className="text-[#64607d] mb-4">
 Klant vraagt korting? Reageer met: <em>"Dat is een faire vraag. Kan ik ook iets fairs vragen? Wat is jullie budget voor dit project?"</em>
 </p>
 <div className="bg-[#f8f9fb] rounded-lg p-4">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Waarom dit werkt:</strong>Je erkent hun verzoek zonder toe te geven, en draait het gesprek naar hun budget. Nu weet je waar je mee werkt.
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 Techniek #8: Social Proof Leverage
 </h3>
 <p className="text-[#64607d] mb-4">
 Gebruik vergelijkbare projecten als bewijs: <em>"Vorige maand heb ik een gelijkaardig project gedaan voor [bekend bedrijf] voor €6.000. Voor jullie doe ik €5.000."</em>
 </p>
 <div className="bg-[#f8f9fb] rounded-lg p-4">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Bonus:</strong>Nu lijkt €5.000 een deal (10% korting), terwijl dat je eigenlijke target was.
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 Techniek #9: "Split the Difference" Trap
 </h3>
 <p className="text-[#64607d] mb-4">
 Klant zegt: "Jij zegt €5.000, ik wil €3.000. Laten we €4.000 doen?" NIET meteen akkoord gaan.
 </p>
 <div className="bg-[#f8f9fb] rounded-lg p-4">
 <p className="text-sm text-[#64607d] mb-3">
 <strong className="text-[#1e1541]">Betere reactie:</strong>"Ik waardeer het compromis. Kunnen we dan €4.500 doen? Dat is mijn minimum voor deze kwaliteit."
 </p>
 <p className="text-sm text-[#64607d]">
 Nu eindig je op €4.500 in plaats van €4.000 - €500 extra met één zin.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* CTA Section 2 */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Bereken Je Ideale Uurtarief
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Weet precies wat je moet vragen op basis van je kosten en doelen
 </p>
 <Link
 href="/nl/gids/prijzen-verdienen/freelance-uurtarief-berekenen"
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Bereken Nu Je Tarief →
 </Link>
 </div>
 </section>

 {/* Section: Common Objections */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Hoe Reageer Je Op: "Dat Is Te Duur"
 </h2>

 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 De meest voorkomende bezwaren en hoe je erop reageert zonder te zakken.
 </p>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
 Bezwaar: "Dat is boven ons budget"
 </h3>
 <div className="space-y-4">
 <div className="border-l-4 border-red-300 pl-4 bg-red-50 py-3">
 <p className="text-sm text-[#64607d]">
 <strong className="text-red-700">❌ Slecht:</strong>"Oké, ik kan wel €500 korting geven."
 </p>
 </div>
 <div className="border-l-4 border-[#22c55e] pl-4 bg-[#22c55e]/5 py-3">
 <p className="text-sm text-[#64607d] mb-2">
 <strong className="text-[#22c55e]">✅ Goed:</strong>"Ik begrijp het. Wat is jullie budget dan? Misschien kunnen we de scope aanpassen zodat het past."
 </p>
 <p className="text-xs text-[#64607d] italic">
 (Nu krijg je hun budget te horen EN behoud je controle over de scope)
 </p>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
 Bezwaar: "Andere freelancers vragen minder"
 </h3>
 <div className="space-y-4">
 <div className="border-l-4 border-red-300 pl-4 bg-red-50 py-3">
 <p className="text-sm text-[#64607d]">
 <strong className="text-red-700">❌ Slecht:</strong>"Oke dan, ik match hun prijs."
 </p>
 </div>
 <div className="border-l-4 border-[#22c55e] pl-4 bg-[#22c55e]/5 py-3">
 <p className="text-sm text-[#64607d] mb-2">
 <strong className="text-[#22c55e]">✅ Goed:</strong>"Dat klopt. Jullie kunnen iemand voor €3.000 vinden. Maar ik lever X, Y, Z dat zij niet doen. De vraag is: wat is jullie doel? De goedkoopste of de beste oplossing?"
 </p>
 <p className="text-xs text-[#64607d] italic">
 (Frame jezelf als premium optie, niet als commodity)
 </p>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
 Bezwaar: "We moeten er nog over nadenken"
 </h3>
 <div className="space-y-4">
 <div className="border-l-4 border-red-300 pl-4 bg-red-50 py-3">
 <p className="text-sm text-[#64607d]">
 <strong className="text-red-700">❌ Slecht:</strong>"Oké, laat maar weten!"
 </p>
 </div>
 <div className="border-l-4 border-[#22c55e] pl-4 bg-[#22c55e]/5 py-3">
 <p className="text-sm text-[#64607d] mb-2">
 <strong className="text-[#22c55e]">✅ Goed:</strong>"Natuurlijk. Mag ik vragen waar jullie twijfels zitten? Is het de prijs, de scope, of iets anders? Dan kan ik daar direct op ingaan."
 </p>
 <p className="text-xs text-[#64607d] italic">
 (Achter "nadenken" zit vaak een specifiek bezwaar. Graaf het op en los het op)
 </p>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
 Bezwaar: "Kunnen we eerst een klein testproject doen?"
 </h3>
 <div className="space-y-4">
 <div className="border-l-4 border-red-300 pl-4 bg-red-50 py-3">
 <p className="text-sm text-[#64607d]">
 <strong className="text-red-700">❌ Slecht:</strong>"Ja, ik doe een gratis testje."
 </p>
 </div>
 <div className="border-l-4 border-[#22c55e] pl-4 bg-[#22c55e]/5 py-3">
 <p className="text-sm text-[#64607d] mb-2">
 <strong className="text-[#22c55e]">✅ Goed:</strong>"Zeker! Ik kan een beperkte scope doen voor €X. Als jullie tevreden zijn, schalen we op naar het volledige project. Sound good?"
 </p>
 <p className="text-xs text-[#64607d] italic">
 (Test projecten zijn prima, maar NOOIT gratis. Waardeer je tijd)
 </p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Section: Email Templates */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Email Templates: Tariefverhoging Communiceren
 </h2>

 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Hoe communiceer je hogere tarieven naar bestaande klanten zonder ze te verliezen?
 </p>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 Template 1: Tariefverhoging Bestaande Klant
 </h3>
 <div className="bg-[#f8f9fb] rounded-lg p-6 mb-4">
 <p className="text-sm text-[#64607d] mb-2"><strong>Onderwerp:</strong>Update: Nieuwe tarieven per [datum]</p>
 <hr className="my-4 border-gray-200" />
 <div className="space-y-3 text-sm text-[#64607d]">
 <p>Hoi [Naam],</p>
 <p>Ik wilde je laten weten dat ik vanaf [datum over 30-60 dagen] mijn tarieven aanpas van €X naar €Y per uur.</p>
 <p>De afgelopen [tijd] heb ik geïnvesteerd in [nieuwe certificeringen / tools / skills] waardoor ik nog betere resultaten kan leveren. Deze investering weerspiegelt zich in mijn nieuwe tarieven.</p>
 <p><strong>Voor jou als bestaande klant:</strong>Alle projecten die we vóór [datum] starten blijven tegen het oude tarief. Daarna geldt het nieuwe tarief.</p>
 <p>Ik waardeer onze samenwerking enorm en kijk uit naar de volgende projecten samen!</p>
 <p>Groeten,<br />[Jouw Naam]</p>
 </div>
 </div>
 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-4">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Waarom dit werkt:</strong>Je geeft advance notice, legt uit waarom, en geeft bestaande klanten een grandfathered period.
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 Template 2: Hoger Tarief Voor Nieuwe Klant
 </h3>
 <div className="bg-[#f8f9fb] rounded-lg p-6 mb-4">
 <p className="text-sm text-[#64607d] mb-2"><strong>Onderwerp:</strong>Re: [Project] - Voorstel en Tarieven</p>
 <hr className="my-4 border-gray-200" />
 <div className="space-y-3 text-sm text-[#64607d]">
 <p>Hoi [Naam],</p>
 <p>Bedankt voor je interesse in [project]. Op basis van wat we hebben besproken, zie ik dat jullie [specifiek doel] willen bereiken.</p>
 <p><strong>Mijn aanpak:</strong></p>
 <ul className="list-disc pl-6 space-y-1">
 <li>[Stap 1 met specifieke deliverable]</li>
 <li>[Stap 2 met specifieke deliverable]</li>
 <li>[Stap 3 met specifieke deliverable]</li>
 </ul>
 <p><strong>Timeline:</strong>[X] weken</p>
 <p><strong>Investering:</strong>€[Bedrag] (fixed price) OF €[Tarief]/uur (geschat [X] uren)</p>
 <p>Dit omvat [list van wat inbegrepen is]. [Exclusions] zijn niet inbegrepen.</p>
 <p>Op basis van jullie huidige [metric], verwacht ik dat dit project [kwantificeerbaar resultaat] oplevert binnen [tijdframe].</p>
 <p>Wanneer kunnen we starten?</p>
 <p>Groeten,<br />[Jouw Naam]</p>
 </div>
 </div>
 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-4">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Waarom dit werkt:</strong>Je noemt prijs als "investering", linkt het aan resultaten, en eindigt met momentum (niet "laat maar weten" maar "wanneer starten we?").
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* Final CTA */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Download Gratis Onderhandelingsscripts
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Krijg kant-en-klare scripts voor elke onderhandelingssituatie
 </p>
 <Link
 href="/nl/newsletter"
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Download Scripts →
 </Link>
 </div>
 </section>

 </>
 ) : (
 <>
 {/* English content - simplified */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 The #1 Reason Freelancers Charge Too Little
 </h2>
 <p className="text-[#64607d] leading-relaxed mb-6">
 The problem isn't your negotiation technique. It's your mindset. Do you recognize this?
 </p>
 </section>
 </>
 )}

 </article>

 {/* Schema.org Markup */}
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "Article",
 "headline": locale === 'nl'
 ? "Hogere Freelance Tarieven Onderhandelen: 9 Technieken Die Werken in 2026"
 : "Negotiate Higher Freelance Rates: 9 Techniques That Work in 2026",
 "description": locale === 'nl'
 ? "Leer hoe je 30-50% meer vraagt zonder klanten te verliezen. Bewezen onderhandelingstechnieken, scripts en psychologische tactieken."
 : "Learn how to charge 30-50% more without losing clients. Proven negotiation techniques, scripts and psychological tactics.",
 "author": {
 "@type": "Organization",
 "name": "SkillLinkup"
 },
 "publisher": {
 "@type": "Organization",
 "name": "SkillLinkup",
 "logo": {
 "@type": "ImageObject",
 "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/images/logo.png`
 }
 },
 "mainEntityOfPage": {
 "@type": "WebPage",
 "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/prijzen-verdienen/hogere-tarieven-onderhandelen`
 }
 })
 }}
 />
 </main>

 
 </>
 );
}
