import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

type Props = {
 params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'upwork-kosten';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/prijzen-verdienen/${slug}`;

 if (locale === 'nl') {
 return {
 title: "Upwork Kosten Calculator 2026: Hoeveel Hou Je Écht Over? (5-20% Fee)",
 description: "Complete Upwork kostengids: 5-20% service fee per contract, $0.15 Connects, Freelancer Plus $19.99/maand. Bereken wat je écht overhoudt na alle kosten.",
 keywords: "upwork kosten, upwork service fee, upwork commissie, connects kosten, freelancer plus prijs, upwork calculator",
 openGraph: {
 title: "Upwork Kosten Calculator 2026: Hoeveel Hou Je Écht Over? (5-20% Fee)",
 description: "Complete Upwork kostengids: 5-20% service fee per contract, $0.15 Connects, Freelancer Plus $19.99/maand. Bereken wat je écht overhoudt.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Upwork Kosten Calculator - SkillLinkup',
 }
 ],
 locale: 'nl_NL',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "Upwork Kosten Calculator 2026: Hoeveel Hou Je Écht Over?",
 description: "Complete Upwork kostengids: 5-20% service fee per contract, $0.15 Connects, Freelancer Plus $19.99/maand.",
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 },
 };
 }

 return {
 title: "Upwork Costs Calculator 2026: What You Actually Keep (5-20% Fee)",
 description: "Complete Upwork cost guide: 5-20% service fee per contract, $0.15 Connects, Freelancer Plus $19.99/month. Calculate what you actually keep after all fees.",
 keywords: "upwork costs, upwork service fee, upwork commission, connects cost, freelancer plus price, upwork calculator",
 openGraph: {
 title: "Upwork Costs Calculator 2026: What You Actually Keep (5-20% Fee)",
 description: "Complete Upwork cost guide: 5-20% service fee per contract, $0.15 Connects, Freelancer Plus $19.99/month.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Upwork Costs Calculator - SkillLinkup',
 }
 ],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "Upwork Costs Calculator 2026: What You Actually Keep",
 description: "Complete Upwork cost guide: 5-20% service fee per contract, $0.15 Connects, Freelancer Plus $19.99/month.",
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 },
 };
}

export default async function UpworkKostenPage({ params }: Props) {
 const { locale } = await params;

 const content = locale === 'nl' ? {
 h1: "Upwork Kosten: Wat Hou Je Écht Over in 2026?",
 intro: "Je verdient $5.000 op Upwork. Hoeveel krijg je uitbetaald? Als je denkt $5.000, heb ik slecht nieuws. Na service fees, Connects, en payment processing blijft er minder over dan je denkt.",
 cta1: "Bereken Netto Inkomen",
 cta1Url: "/nl/tools/rate-calculator",
 } : {
 h1: "Upwork Costs: What You Actually Keep in 2026",
 intro: "You earn $5,000 on Upwork. How much do you get paid? If you think $5,000, I have bad news. After service fees, Connects, and payment processing, you keep less than you think.",
 cta1: "Calculate Net Income",
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
 {/* Section 1: Service Fee Breakdown */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Upwork Service Fee: 5-20% Per Contract
 </h2>

 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 De grootste kostenpost op Upwork is de <strong className="text-[#1e1541]">service fee</strong>. Dit is een percentage van je inkomsten dat Upwork inhoudt. Het percentage hangt af van hoeveel je <strong>per klant</strong>hebt verdiend (lifetime billing).
 </p>

 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 mb-8 text-white">
 <h3 className="font-heading font-bold text-2xl mb-6">
 Upwork Fee Tiers (Per Klant)
 </h3>
 <div className="space-y-4">
 <div className="bg-white/10 backdrop-blur rounded-lg p-6">
 <div className="flex justify-between items-center mb-2">
 <span className="text-lg font-semibold">Eerste $500</span>
 <span className="text-3xl font-bold">20%</span>
 </div>
 <p className="text-sm text-white/80">Hoogste tarief voor nieuwe klanten</p>
 </div>
 <div className="bg-white/10 backdrop-blur rounded-lg p-6">
 <div className="flex justify-between items-center mb-2">
 <span className="text-lg font-semibold">$500,01 - $10.000</span>
 <span className="text-3xl font-bold">10%</span>
 </div>
 <p className="text-sm text-white/80">Gemiddeld tarief voor terugkerende klanten</p>
 </div>
 <div className="bg-white/10 backdrop-blur rounded-lg p-6">
 <div className="flex justify-between items-center mb-2">
 <span className="text-lg font-semibold">$10.000+</span>
 <span className="text-3xl font-bold">5%</span>
 </div>
 <p className="text-sm text-white/80">Laagste tarief voor grote projecten</p>
 </div>
 </div>
 </div>

 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg mb-6">
 <p className="text-[#1e1541] font-semibold mb-2">
 Let Op: Per Klant, Niet Per Project
 </p>
 <p className="text-[#64607d]">
 De fee tiers gelden PER KLANT lifetime. Als je $15.000 hebt verdiend van Klant A, betaal je 5% over alle toekomstige projecten met die klant. Voor een nieuwe Klant B begin je weer bij 20%.
 </p>
 </div>
 </div>
 </section>

 {/* Section 2: Real Examples */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Praktijkvoorbeelden: Wat Hou Je Over?
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
 Scenario 1: Kleine Opdracht ($500)
 </h3>
 <div className="space-y-4">
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Project waarde</span>
 <strong className="text-[#1e1541]">$500,00</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Upwork fee (20%)</span>
 <strong className="text-red-500">-$100,00</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Payment processing (≈2.5%)</span>
 <strong className="text-red-500">-$12,50</strong>
 </div>
 <div className="flex justify-between items-center pt-2">
 <strong className="text-[#1e1541] text-xl">Netto uitbetaling</strong>
 <strong className="text-[#22c55e] text-2xl">$387,50</strong>
 </div>
 </div>
 <div className="bg-[#f8f9fb] rounded-lg p-4 mt-6">
 <p className="text-[#64607d]">
 <strong className="text-[#1e1541]">Effectief verlies:</strong>22,5% van je inkomsten
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
 Scenario 2: Terugkerende Klant ($3.000 project, totaal $4.500 lifetime)
 </h3>
 <div className="space-y-4">
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Project waarde</span>
 <strong className="text-[#1e1541]">$3.000,00</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Fee eerste $500 (20%)</span>
 <strong className="text-red-500">-$100,00</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Fee $500-$4.500 (10%)</span>
 <strong className="text-red-500">-$290,00</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Payment processing (≈2.5%)</span>
 <strong className="text-red-500">-$75,00</strong>
 </div>
 <div className="flex justify-between items-center pt-2">
 <strong className="text-[#1e1541] text-xl">Netto uitbetaling</strong>
 <strong className="text-[#22c55e] text-2xl">$2.535,00</strong>
 </div>
 </div>
 <div className="bg-[#f8f9fb] rounded-lg p-4 mt-6">
 <p className="text-[#64607d]">
 <strong className="text-[#1e1541]">Effectief verlies:</strong>15,5% van je inkomsten
 </p>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
 Scenario 3: Grote Klant ($15.000 project, totaal $25.000 lifetime)
 </h3>
 <div className="space-y-4">
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Project waarde</span>
 <strong className="text-[#1e1541]">$15.000,00</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Fee eerste $500 (20%)</span>
 <strong className="text-red-500">-$100,00</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Fee $500-$10.000 (10%)</span>
 <strong className="text-red-500">-$950,00</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Fee $10.000+ (5%)</span>
 <strong className="text-red-500">-$750,00</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Payment processing (≈2.5%)</span>
 <strong className="text-red-500">-$375,00</strong>
 </div>
 <div className="flex justify-between items-center pt-2">
 <strong className="text-[#1e1541] text-xl">Netto uitbetaling</strong>
 <strong className="text-[#22c55e] text-2xl">$12.825,00</strong>
 </div>
 </div>
 <div className="bg-[#f8f9fb] rounded-lg p-4 mt-6">
 <p className="text-[#64607d]">
 <strong className="text-[#1e1541]">Effectief verlies:</strong>14,5% van je inkomsten
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* CTA Section 1 */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Bereken Je Minimale Uurtarief
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Reken Upwork fees mee in je tariefberekening om niet onder je minimum te gaan
 </p>
 <Link
 href="/nl/gids/prijzen-verdienen/freelance-uurtarief-berekenen"
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Bereken Minimaal Tarief →
 </Link>
 </div>
 </section>

 {/* Section 3: Connects Kosten */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Connects: De Verborgen Kostenpost
 </h2>

 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Om op Upwork te kunnen solliciteren op projecten heb je <strong className="text-[#1e1541]">Connects</strong>nodig. Dit zijn virtuele "credits" die je gebruikt om voorstellen in te dienen.
 </p>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
 Connects Prijzen 2026
 </h3>
 <div className="space-y-4">
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Gratis maandelijks</span>
 <strong className="text-[#1e1541]">80 Connects</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Prijs per extra Connect</span>
 <strong className="text-[#1e1541]">$0,15</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Gemiddeld per voorstel</span>
 <strong className="text-[#1e1541]">2-6 Connects</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Featured proposals (extra)</span>
 <strong className="text-[#1e1541]">+20 Connects</strong>
 </div>
 </div>
 </div>

 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 Maandelijkse Connects Kosten Berekenen
 </h3>

 <div className="bg-white rounded-lg shadow p-6 mb-6">
 <p className="text-[#64607d] mb-4">
 <strong className="text-[#1e1541]">Scenario:</strong>Je stuurt 40 voorstellen per maand (gemiddeld 4 Connects elk)
 </p>
 <div className="space-y-2 text-[#64607d]">
 <p>• Benodigde Connects: 40 × 4 = <strong className="text-[#1e1541]">160 Connects</strong></p>
 <p>• Gratis Connects: <strong className="text-[#1e1541]">80</strong></p>
 <p>• Te kopen: 160 - 80 = <strong className="text-[#1e1541]">80 Connects</strong></p>
 <p>• Kosten: 80 × $0,15 = <strong className="text-[#ef2b70]">$12/maand</strong></p>
 <p>• <strong className="text-[#1e1541]">Jaarlijks:</strong>$12 × 12 = <strong className="text-[#ef2b70]">$144/jaar</strong></p>
 </div>
 </div>

 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg">
 <p className="text-[#1e1541] font-semibold mb-2">
 Tip: Connects worden teruggestort
 </p>
 <p className="text-[#64607d]">
 Als je een opdracht binnenkrijgt, krijg je de gebruikte Connects terug. Dit reduceert je effectieve kosten als je een goede conversie rate hebt.
 </p>
 </div>
 </div>
 </section>

 {/* Section 4: Freelancer Plus */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Freelancer Plus: $19,99/Maand (Worth It?)
 </h2>

 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Upwork biedt een premium abonnement aan: <strong className="text-[#1e1541]">Freelancer Plus</strong>voor $19,99 per maand. Is dit het waard?
 </p>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
 Wat Krijg Je?
 </h3>
 <div className="grid md:grid-cols-2 gap-6">
 <div>
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">Voordelen:</h4>
 <ul className="space-y-2 text-[#64607d]">
 <li>✅ 70 extra Connects/maand (waarde $10,50)</li>
 <li>✅ Custom proposal templates</li>
 <li>✅ Portfolio showcase projects</li>
 <li>✅ Promoted proposals (1 per maand)</li>
 <li>✅ Profile badge (verhoogt vertrouwen)</li>
 </ul>
 </div>
 <div>
 <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">Nadelen:</h4>
 <ul className="space-y-2 text-[#64607d]">
 <li>❌ $239,88 per jaar kosten</li>
 <li>❌ Geen fee discount</li>
 <li>❌ ROI alleen bij hoog volume proposals</li>
 <li>❌ Meeste features ook gratis mogelijk</li>
 </ul>
 </div>
 </div>
 </div>

 <div className="bg-[#f8f9fb] rounded-lg p-6 mb-6">
 <h4 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
 Break-Even Analyse
 </h4>
 <p className="text-[#64607d] mb-4">
 <strong className="text-[#1e1541]">Kosten:</strong>$19,99/maand = $239,88/jaar
 </p>
 <p className="text-[#64607d] mb-4">
 <strong className="text-[#1e1541]">Waarde:</strong>70 Connects × 12 maanden × $0,15 = $126/jaar
 </p>
 <p className="text-[#1e1541] font-semibold">
 Conclusie: Je betaalt $113,88 extra voor profile badge en templates. Alleen de moeite waard als je 100+ voorstellen per maand stuurt.
 </p>
 </div>
 </div>
 </section>

 {/* CTA Section 2 */}
 <section className="mb-16">
 <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Vergelijk met Toptal Kosten
 </h3>
 <p className="text-xl mb-6 text-gray-300">
 Toptal heeft een compleet ander businessmodel - ontdek de verschillen
 </p>
 <Link
 href="/nl/gids/prijzen-verdienen/toptal-prijzen"
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Bekijk Toptal Prijzen →
 </Link>
 </div>
 </section>

 {/* Section 5: Total Cost Breakdown */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Totale Upwork Kosten per Jaar
 </h2>

 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Laten we alle kosten bij elkaar optellen voor een realistische berekening. We nemen een gemiddelde freelancer met $50.000 omzet per jaar.
 </p>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
 Jaar 1: Nieuwe Freelancer ($50.000 Omzet)
 </h3>
 <div className="space-y-4">
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Bruto omzet</span>
 <strong className="text-[#1e1541]">$50.000</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Service fees (gem. 12%)</span>
 <strong className="text-red-500">-$6.000</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Payment processing (2.5%)</span>
 <strong className="text-red-500">-$1.250</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Connects (gem. $15/maand)</span>
 <strong className="text-red-500">-$180</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Freelancer Plus (optioneel)</span>
 <strong className="text-red-500">-$240</strong>
 </div>
 <div className="flex justify-between items-center pt-3 bg-[#f8f9fb] rounded-lg px-4 py-3 mt-4">
 <strong className="text-[#1e1541] text-xl">Netto uitbetaling</strong>
 <strong className="text-[#22c55e] text-2xl">$42.330</strong>
 </div>
 </div>
 <div className="mt-6 text-center">
 <p className="text-[#1e1541] font-semibold text-lg">
 Totale kosten: <span className="text-[#ef2b70]">15,3% van je omzet</span>
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* Section 6: Cost Reduction Tips */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 5 Manieren om Upwork Kosten te Verlagen
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#22c55e]">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 1. Focus op Langetermijn Klanten
 </h3>
 <p className="text-[#64607d]">
 Hoe meer je van één klant verdient, hoe lager je fee percentage. Bij $10.000+ betaal je slechts 5%. Investeer in klantrelaties in plaats van steeds nieuwe klanten zoeken.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#22c55e]">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 2. Gebruik Gratis Connects Efficiënt
 </h3>
 <p className="text-[#64607d]">
 Je krijgt 80 gratis Connects/maand. Solliciteer alleen op jobs waar je 50%+ match hebt. Kwaliteit &gt; kwantiteit bespaart Connects en verhoogt je succes rate.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#22c55e]">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 3. Rekening Houden Bij Pricing
 </h3>
 <p className="text-[#64607d]">
 Bereken Upwork fees mee in je uurtarief. Als je €60/uur wilt verdienen, vraag €75/uur om na 20% fee nog op €60 uit te komen.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#22c55e]">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 4. Skip Freelancer Plus (Meestal)
 </h3>
 <p className="text-[#64607d]">
 Tenzij je 100+ proposals per maand stuurt, is Freelancer Plus niet winstgevend. Gebruik gratis tools zoals Notion voor templates en focus op kwaliteit proposals.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#22c55e]">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
 5. Migreer Top Klanten Off-Platform (Legaal)
 </h3>
 <p className="text-[#64607d] mb-3">
 Na 24 maanden en $10.000+ met een klant mag je volgens Upwork TOS off-platform gaan zonder boetes. Bespreek dit met je beste klanten om 100% van je tarief te behouden.
 </p>
 <div className="bg-[#fff8f8] rounded-lg p-4">
 <p className="text-sm text-[#64607d]">
 <strong className="text-[#1e1541]">Let op:</strong>Lees altijd de meest recente Upwork Terms of Service. Deze regel kan veranderen.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* Final CTA */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Leer Hogere Tarieven Vragen
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Compenseer Upwork fees door betere onderhandelingstechnieken
 </p>
 <Link
 href="/nl/gids/prijzen-verdienen/hogere-tarieven-onderhandelen"
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Lees Onderhandelgids →
 </Link>
 </div>
 </section>

 </>
 ) : (
 <>
 {/* English content - simplified */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Upwork Service Fee: 5-20% Per Contract
 </h2>
 <p className="text-[#64607d] leading-relaxed mb-6">
 The biggest cost on Upwork is the service fee. This is a percentage of your earnings that Upwork withholds. The percentage depends on how much you've earned per client (lifetime billing).
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
 ? "Upwork Kosten Calculator 2026: Hoeveel Hou Je Écht Over?"
 : "Upwork Costs Calculator 2026: What You Actually Keep",
 "description": locale === 'nl'
 ? "Complete Upwork kostengids: 5-20% service fee per contract, $0.15 Connects, Freelancer Plus $19.99/maand."
 : "Complete Upwork cost guide: 5-20% service fee per contract, $0.15 Connects, Freelancer Plus $19.99/month.",
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
 "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/prijzen-verdienen/upwork-kosten`
 }
 })
 }}
 />
 </main>

 <Footer />
 </>
 );
}
