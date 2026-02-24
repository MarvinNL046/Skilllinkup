import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

type Props = {
 params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'freelance-uurtarief-berekenen';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/prijzen-verdienen/${slug}`;

 if (locale === 'nl') {
 return {
 title: "Freelance Uurtarief Berekenen in 2026: Stap-voor-Stap Gids + Gratis Calculator",
 description: "Bereken je perfecte freelance uurtarief in 5 minuten. Ontdek de formule die professionals gebruiken, inclusief gratis calculator. Van €30 tot €150+ per uur is mogelijk.",
 keywords: "freelance uurtarief berekenen, uurtarief calculator, freelance tarief 2026, freelance prijzen, zzp tarief berekenen",
 openGraph: {
 title: "Freelance Uurtarief Berekenen in 2026: Stap-voor-Stap Gids + Gratis Calculator",
 description: "Bereken je perfecte freelance uurtarief in 5 minuten. Ontdek de formule die professionals gebruiken, inclusief gratis calculator. Van €30 tot €150+ per uur is mogelijk.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Freelance Uurtarief Berekenen - SkillLinkup',
 }
 ],
 locale: 'nl_NL',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "Freelance Uurtarief Berekenen in 2026: Stap-voor-Stap Gids + Gratis Calculator",
 description: "Bereken je perfecte freelance uurtarief in 5 minuten. Ontdek de formule die professionals gebruiken, inclusief gratis calculator. Van €30 tot €150+ per uur is mogelijk.",
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 },
 };
 }

 return {
 title: "Calculate Your Freelance Hourly Rate in 2026: Step-by-Step Guide + Free Calculator",
 description: "Calculate your perfect freelance hourly rate in 5 minutes. Discover the formula professionals use, including free calculator. From $35 to $175+ per hour is possible.",
 keywords: "freelance hourly rate calculator, hourly rate formula, freelance pricing 2026, calculate freelance rate",
 openGraph: {
 title: "Calculate Your Freelance Hourly Rate in 2026: Step-by-Step Guide + Free Calculator",
 description: "Calculate your perfect freelance hourly rate in 5 minutes. Discover the formula professionals use, including free calculator. From $35 to $175+ per hour is possible.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Calculate Your Freelance Hourly Rate - SkillLinkup',
 }
 ],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "Calculate Your Freelance Hourly Rate in 2026: Step-by-Step Guide + Free Calculator",
 description: "Calculate your perfect freelance hourly rate in 5 minutes. Discover the formula professionals use, including free calculator. From $35 to $175+ per hour is possible.",
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 },
 };
}

export default async function FreelanceUurtariefBerekenenPage({ params }: Props) {
 const { locale } = await params;

 const content = locale === 'nl' ? {
 h1: "Freelance Uurtarief Berekenen: De Complete Gids voor 2026",
 intro: "Je hebt je skills, je hebt je portfolio, maar wat vraag je per uur? Dit is de vraag die elke startende freelancer wakker houdt. Te laag, en je werkt voor een minimumloon. Te hoog, en je schrikt klanten af. Laten we samen je perfecte uurtarief berekenen.",
 cta1: "Bereken Je Tarief",
 cta1Url: "/nl/tools/rate-calculator",
 } : {
 h1: "Calculate Your Freelance Hourly Rate: The Complete 2026 Guide",
 intro: "You have your skills, you have your portfolio, but what do you charge per hour? This is the question that keeps every starting freelancer awake. Too low, and you work for minimum wage. Too high, and you scare away clients. Let's calculate your perfect hourly rate together.",
 cta1: "Calculate Your Rate",
 cta1Url: "/en/tools/rate-calculator",
 };

 return (
 <>
 <Header />

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
 {/* Section 1: Waarom Je Uurtarief Cruciaal Is */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Waarom Je Uurtarief Cruciaal Is
 </h2>
 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Je uurtarief bepaalt niet alleen hoeveel je verdient, maar ook hoe klanten je waarnemen. Een te laag tarief suggereert gebrek aan ervaring. Een goed berekend tarief positioneert je als professional.
 </p>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 3 Redenen Waarom Een Goed Tarief Essentieel Is
 </h3>
 <ul className="space-y-4">
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3 text-xl">1.</span>
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Financiële Stabiliteit:</strong>Je moet genoeg verdienen om belastingen, pensioen en ziekteverzuim te dekken
 </span>
 </li>
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3 text-xl">2.</span>
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Professionele Perceptie:</strong>Klanten associëren hogere tarieven met betere kwaliteit
 </span>
 </li>
 <li className="flex items-start">
 <span className="text-[#ef2b70] font-bold mr-3 text-xl">3.</span>
 <span className="text-[#64607d]">
 <strong className="text-[#1e1541]">Werkdruk Balans:</strong>Een goed tarief betekent minder uren werken voor hetzelfde inkomen
 </span>
 </li>
 </ul>
 </div>
 </div>
 </section>

 {/* Section 2: De Freelance Uurtarief Formule */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 De Freelance Uurtarief Formule (Stap voor Stap)
 </h2>

 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 mb-8 text-white">
 <h3 className="font-heading font-bold text-2xl mb-4">
 De Basisformule
 </h3>
 <div className="bg-white/10 backdrop-blur rounded-lg p-6 font-mono text-lg">
 Uurtarief = (Gewenst Jaarinkomen + Kosten) / Factureerbare Uren
 </div>
 </div>

 <div className="prose prose-lg max-w-none">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 Stap 1: Bepaal Je Gewenste Jaarinkomen
 </h3>
 <p className="text-[#64607d] leading-relaxed mb-6">
 Begin met het inkomen dat je nodig hebt om comfortabel te leven. Denk aan huur/hypotheek, boodschappen, verzekeringen, sparen en leuke dingen. Voor de meeste freelancers ligt dit tussen €35.000 en €65.000 bruto per jaar.
 </p>

 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 Stap 2: Tel Je Bedrijfskosten Op
 </h3>
 <div className="bg-white rounded-lg shadow p-6 mb-6">
 <ul className="space-y-3">
 <li className="flex justify-between border-b border-gray-100 pb-2">
 <span className="text-[#64607d]">Accountant / Boekhouding</span>
 <strong className="text-[#1e1541]">€500 - €2.000/jaar</strong>
 </li>
 <li className="flex justify-between border-b border-gray-100 pb-2">
 <span className="text-[#64607d]">Software & Tools</span>
 <strong className="text-[#1e1541]">€500 - €3.000/jaar</strong>
 </li>
 <li className="flex justify-between border-b border-gray-100 pb-2">
 <span className="text-[#64607d]">Marketing & Website</span>
 <strong className="text-[#1e1541]">€500 - €2.000/jaar</strong>
 </li>
 <li className="flex justify-between border-b border-gray-100 pb-2">
 <span className="text-[#64607d]">Werkplek & Apparatuur</span>
 <strong className="text-[#1e1541]">€1.000 - €5.000/jaar</strong>
 </li>
 <li className="flex justify-between border-b border-gray-100 pb-2">
 <span className="text-[#64607d]">Verzekeringen</span>
 <strong className="text-[#1e1541]">€500 - €1.500/jaar</strong>
 </li>
 <li className="flex justify-between pt-2">
 <strong className="text-[#1e1541]">Totaal</strong>
 <strong className="text-[#ef2b70]">€3.000 - €13.500/jaar</strong>
 </li>
 </ul>
 </div>

 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 Stap 3: Bereken Je Factureerbare Uren
 </h3>
 <p className="text-[#64607d] leading-relaxed mb-4">
 Dit is waar veel freelancers de fout in gaan. Je hebt NIET 52 weken × 40 uur = 2.080 factureerbare uren per jaar. De realiteit?
 </p>

 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg mb-6">
 <p className="text-[#64607d] leading-relaxed mb-4">
 <strong className="text-[#1e1541]">Realistisch scenario:</strong>
 </p>
 <ul className="space-y-2 text-[#64607d]">
 <li>• 52 weken per jaar</li>
 <li>• Minus 4 weken vakantie = <strong>48 werkweken</strong></li>
 <li>• Minus 10 feestdagen = <strong>46 werkweken</strong></li>
 <li>• × 40 uur = 1.840 uur</li>
 <li>• Maar slechts <strong>60-70% is factureerbaar</strong>(rest = admin, sales, marketing)</li>
 <li>• <strong className="text-[#ef2b70]">Factureerbare uren: 1.100 - 1.300 uur/jaar</strong></li>
 </ul>
 </div>
 </div>
 </section>

 {/* CTA Section 1 */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Doe de Berekening in 5 Minuten
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Gebruik onze gratis calculator en ontdek precies wat je moet vragen
 </p>
 <Link
 href="/nl/tools/rate-calculator"
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Bereken Nu Je Tarief →
 </Link>
 </div>
 </section>

 {/* Section 3: Voorbeeld Berekening */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Voorbeeld: Van Inkomenswens naar Uurtarief
 </h2>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
 Scenario: Junior Developer
 </h3>

 <div className="space-y-4 mb-6">
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Gewenst netto jaarinkomen</span>
 <strong className="text-[#1e1541]">€40.000</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Belastingen (≈30%)</span>
 <strong className="text-[#1e1541]">€17.142</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Gewenst bruto inkomen</span>
 <strong className="text-[#1e1541]">€57.142</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Bedrijfskosten</span>
 <strong className="text-[#1e1541]">€5.000</strong>
 </div>
 <div className="flex justify-between items-center border-b border-[#ef2b70] border-b-2 pb-3">
 <strong className="text-[#1e1541]">Totaal benodigd</strong>
 <strong className="text-[#1e1541]">€62.142</strong>
 </div>
 <div className="flex justify-between items-center">
 <span className="text-[#64607d]">Factureerbare uren</span>
 <strong className="text-[#1e1541]">1.200 uur</strong>
 </div>
 </div>

 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg p-6 text-white text-center">
 <p className="text-lg mb-2">Minimaal Uurtarief</p>
 <p className="font-heading font-bold text-4xl">€62.142 ÷ 1.200 = <span className="text-[#22c55e]">€52</span>/uur</p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
 Scenario: Senior Consultant
 </h3>

 <div className="space-y-4 mb-6">
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Gewenst netto jaarinkomen</span>
 <strong className="text-[#1e1541]">€70.000</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Belastingen (≈35%)</span>
 <strong className="text-[#1e1541]">€37.692</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Gewenst bruto inkomen</span>
 <strong className="text-[#1e1541]">€107.692</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Bedrijfskosten</span>
 <strong className="text-[#1e1541]">€12.000</strong>
 </div>
 <div className="flex justify-between items-center border-b border-[#ef2b70] border-b-2 pb-3">
 <strong className="text-[#1e1541]">Totaal benodigd</strong>
 <strong className="text-[#1e1541]">€119.692</strong>
 </div>
 <div className="flex justify-between items-center">
 <span className="text-[#64607d]">Factureerbare uren</span>
 <strong className="text-[#1e1541]">1.100 uur</strong>
 </div>
 </div>

 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg p-6 text-white text-center">
 <p className="text-lg mb-2">Minimaal Uurtarief</p>
 <p className="font-heading font-bold text-4xl">€119.692 ÷ 1.100 = <span className="text-[#22c55e]">€109</span>/uur</p>
 </div>
 </div>
 </section>

 {/* Section 4: Veelgemaakte Fouten */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 7 Veelgemaakte Fouten Bij Tarief Berekenen
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Fout 1: Je Voltijd Salaris Delen Door 1.800
 </h3>
 <p className="text-[#64607d]">
 Als freelancer heb je VEEL meer kosten dan een werknemer. Je moet zelf belastingen, pensioen, ziekteverzuim en alle bedrijfskosten betalen.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Fout 2: Vakantie en Ziekte Niet Meenemen
 </h3>
 <p className="text-[#64607d]">
 Je factureert niet tijdens vakantie, feestdagen of ziekte. Reken met 1.100-1.300 factureerbare uren, niet 2.000.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Fout 3: Admin Tijd Niet Meenemen
 </h3>
 <p className="text-[#64607d]">
 Sales, offertes, factureren, netwerken, marketing - dit zijn allemaal uren die je niet factureert maar wel moet doen.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Fout 4: Jezelf Vergelijken Met Gemiddelden
 </h3>
 <p className="text-[#64607d]">
 "Het gemiddelde uurtarief voor developers is €65." Dat zegt niks over JOUWkosten, ervaring en marktpositie.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Fout 5: Platform Fees Vergeten
 </h3>
 <p className="text-[#64607d]">
 Upwork neemt 5-20% commissie. Fiverr 20%. Dit moet je doorberekenen in je uurtarief of je verdient veel minder.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Fout 6: Te Laag Starten "Om Ervaring Op Te Doen"
 </h3>
 <p className="text-[#64607d]">
 Later verhogen is veel moeilijker dan meteen een realistisch tarief vragen. Start niet onder je minimum.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 ❌ Fout 7: Belastingen Onderschatten
 </h3>
 <p className="text-[#64607d]">
 In Nederland betaal je 37,1% tot 49,5% inkomstenbelasting. Reken met minstens 30-35% om onaangename verrassingen te voorkomen.
 </p>
 </div>
 </div>
 </section>

 {/* CTA Section 2 */}
 <section className="mb-16">
 <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Vergelijk Platform Kosten
 </h3>
 <p className="text-xl mb-6 text-gray-300">
 Ontdek welk freelance platform de laagste commissie rekent
 </p>
 <Link
 href="/nl/platforms"
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Bekijk Platform Vergelijking →
 </Link>
 </div>
 </section>

 {/* Section 5: Tarief Aanpassen Per Situatie */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Wanneer Verander Je Je Tarief?
 </h2>

 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Je basisuurtarief is je uitgangspunt, maar niet altijd je definitieve prijs. Hier zijn situaties waar je moet aanpassen:
 </p>

 <div className="grid md:grid-cols-2 gap-6 mb-8">
 <div className="bg-white rounded-lg shadow p-6">
 <div className="text-3xl mb-3"></div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 Verhoog Je Tarief Bij:
 </h3>
 <ul className="space-y-2 text-[#64607d]">
 <li>• Complexe projecten met hoog risico</li>
 <li>• Korte deadlines / spoed opdrachten</li>
 <li>• Klanten met groot budget (enterprise)</li>
 <li>• Hoge vraag naar jouw skills</li>
 <li>• Specialistische expertise vereist</li>
 </ul>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <div className="text-3xl mb-3"></div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 Overweeg Korting Bij:
 </h3>
 <ul className="space-y-2 text-[#64607d]">
 <li>• Langlopende contracten (6+ maanden)</li>
 <li>• Grote volume aan uren (bulk discount)</li>
 <li>• Non-profit / goed doel (optioneel)</li>
 <li>• Portfolio opbouw in nieuwe niche</li>
 <li>• Terugkerende klant loyaliteit</li>
 </ul>
 </div>
 </div>

 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg">
 <p className="text-[#1e1541] font-semibold mb-2">
 Let Op: Nooit Onder Je Minimum
 </p>
 <p className="text-[#64607d]">
 Je basisuurtarief is je MINIMUM. Dat is het tarief waarbij je break-even draait. Korting geven betekent minder verdienen voor hetzelfde werk. Doe dit alleen strategisch.
 </p>
 </div>
 </div>
 </section>

 {/* Section 6: Volgende Stappen */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Wat Nu? Jouw Actieplan
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 1
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Bereken Je Basisuurtarief
 </h3>
 <p className="text-[#64607d] mb-3">
 Gebruik onze calculator om je minimale uurtarief te bepalen op basis van jouw kosten en inkomenswens.
 </p>
 <Link
 href="/nl/tools/rate-calculator"
 className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
 >
 Start Calculator →
 </Link>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 2
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Vergelijk Platform Commissies
 </h3>
 <p className="text-[#64607d] mb-3">
 Ontdek welk platform de laagste fees rekent, zodat je meer overhoudt van elk project.
 </p>
 <Link
 href="/nl/gids/prijzen-verdienen/upwork-kosten"
 className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
 >
 Bekijk Upwork Kosten →
 </Link>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 3
 </div>
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Leer Onderhandelen
 </h3>
 <p className="text-[#64607d] mb-3">
 Ontdek hoe je hogere tarieven vraagt zonder klanten af te schrikken.
 </p>
 <Link
 href="/nl/gids/prijzen-verdienen/hogere-tarieven-onderhandelen"
 className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
 >
 Leer Onderhandelen →
 </Link>
 </div>
 </div>
 </div>
 </section>

 {/* Final CTA */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Krijg Maandelijkse Prijsstrategieën
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Schrijf je in voor onze nieuwsbrief en ontvang tips om je tarieven te verhogen
 </p>
 <Link
 href="/nl/newsletter"
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Download Gratis Prijsgids →
 </Link>
 </div>
 </section>

 </>
 ) : (
 <>
 {/* English content would go here - simplified for now */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Why Your Hourly Rate Is Critical
 </h2>
 <p className="text-[#64607d] leading-relaxed mb-6">
 Your hourly rate determines not only how much you earn, but also how clients perceive you. A rate that's too low suggests lack of experience. A well-calculated rate positions you as a professional.
 </p>
 </section>

 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Calculate in 5 Minutes
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Use our free calculator and discover exactly what you should charge
 </p>
 <Link
 href="/en/tools/rate-calculator"
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Calculate Your Rate →
 </Link>
 </div>
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
 ? "Freelance Uurtarief Berekenen in 2026: Stap-voor-Stap Gids + Gratis Calculator"
 : "Calculate Your Freelance Hourly Rate in 2026: Step-by-Step Guide + Free Calculator",
 "description": locale === 'nl'
 ? "Bereken je perfecte freelance uurtarief in 5 minuten. Ontdek de formule die professionals gebruiken, inclusief gratis calculator."
 : "Calculate your perfect freelance hourly rate in 5 minutes. Discover the formula professionals use, including free calculator.",
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
 "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/prijzen-verdienen/freelance-uurtarief-berekenen`
 }
 })
 }}
 />
 </main>

 <Footer />
 </>
 );
}
