import Link from "next/link";
import { Metadata } from "next";

type Props = {
 params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'toptal-prijzen';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/prijzen-verdienen/${slug}`;

 if (locale === 'nl') {
 return {
 title: "Toptal Prijzen 2026: $60-200+/Uur voor Elite Freelancers (0% Fee!)",
 description: "Ontdek hoe Toptal pricing werkt: $60-200+ uur tarieven, geen platform fees voor freelancers, maar strenge selectie (3% acceptance rate). Is het jou waard?",
 keywords: "toptal prijzen, toptal tarieven, toptal kosten, toptal freelancer tarieven, toptal businessmodel, elite freelance platform",
 openGraph: {
 title: "Toptal Prijzen 2026: $60-200+/Uur voor Elite Freelancers (0% Fee!)",
 description: "Ontdek hoe Toptal pricing werkt: $60-200+ uur tarieven, geen platform fees voor freelancers, maar strenge selectie. Is het jou waard?",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Toptal Prijzen - SkillLinkup',
 }
 ],
 locale: 'nl_NL',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "Toptal Prijzen 2026: $60-200+/Uur voor Elite Freelancers",
 description: "Ontdek hoe Toptal pricing werkt: $60-200+ uur tarieven, geen platform fees voor freelancers, maar strenge selectie.",
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 },
 };
 }

 return {
 title: "Toptal Pricing 2026: $60-200+/Hr for Elite Freelancers (0% Fee!)",
 description: "Discover how Toptal pricing works: $60-200+ hourly rates, no platform fees for freelancers, but strict selection (3% acceptance rate). Is it worth it?",
 keywords: "toptal pricing, toptal rates, toptal costs, toptal freelancer rates, toptal business model, elite freelance platform",
 openGraph: {
 title: "Toptal Pricing 2026: $60-200+/Hr for Elite Freelancers (0% Fee!)",
 description: "Discover how Toptal pricing works: $60-200+ hourly rates, no platform fees for freelancers, but strict selection.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Toptal Pricing - SkillLinkup',
 }
 ],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "Toptal Pricing 2026: $60-200+/Hr for Elite Freelancers",
 description: "Discover how Toptal pricing works: $60-200+ hourly rates, no platform fees for freelancers, but strict selection.",
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 },
 };
}

export default async function ToptalPrijzenPage({ params }: Props) {
 const { locale } = await params;

 const content = locale === 'nl' ? {
 h1: "Toptal Prijzen: Wat Verdienen Elite Freelancers in 2026?",
 intro: "Toptal is anders. Geen racen naar de bodem met €15/uur tarieven. Geen 20% platform fees. Maar ook: strenge selectie waar slechts 3% doorheen komt. Laten we de cijfers bekijken.",
 cta1: "Bereken Je Potentieel Tarief",
 cta1Url: "/nl/tools/rate-calculator",
 } : {
 h1: "Toptal Pricing: What Elite Freelancers Earn in 2026",
 intro: "Toptal is different. No race to the bottom with $15/hr rates. No 20% platform fees. But also: strict selection where only 3% get through. Let's look at the numbers.",
 cta1: "Calculate Your Potential Rate",
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
 {/* Section 1: The Toptal Model */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Het Toptal Businessmodel: Hoe Het Werkt
 </h2>

 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Toptal is geen typisch freelance platform. Het is een <strong className="text-[#1e1541]">exclusief netwerk</strong>van top 3% freelancers wereldwijd. Hun model is fundamenteel anders dan Upwork of Fiverr.
 </p>

 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 mb-8 text-white">
 <h3 className="font-heading font-bold text-2xl mb-6">
 Toptal vs Traditionele Platforms
 </h3>
 <div className="grid md:grid-cols-2 gap-8">
 <div>
 <h4 className="font-semibold text-lg mb-4">Traditioneel (Upwork/Fiverr):</h4>
 <ul className="space-y-2 text-white/90">
 <li>✓ Iedereen kan zich aanmelden</li>
 <li>✓ Freelancers solliciteren op jobs</li>
 <li>✓ 5-20% fee voor freelancers</li>
 <li>✓ Race to the bottom pricing</li>
 <li>✓ Zelf klanten vinden</li>
 </ul>
 </div>
 <div>
 <h4 className="font-semibold text-lg mb-4">Toptal Model:</h4>
 <ul className="space-y-2 text-white/90">
 <li>✓ 3% acceptance rate (strenge selectie)</li>
 <li>✓ Toptal matcht jou met klanten</li>
 <li>✓ 0% fee voor freelancers</li>
 <li>✓ Premium pricing (client betaalt meer)</li>
 <li>✓ Passieve lead flow</li>
 </ul>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 Het Geheim: Client-Side Fees
 </h3>
 <p className="text-[#64607d] mb-4">
 Toptal rekent <strong className="text-[#1e1541]">niets</strong>bij de freelancer. In plaats daarvan betalen klanten een heftige markup:
 </p>
 <div className="bg-[#f8f9fb] rounded-lg p-6">
 <p className="text-[#64607d] mb-2">
 <strong className="text-[#1e1541]">Jouw tarief:</strong>$100/uur
 </p>
 <p className="text-[#64607d] mb-2">
 <strong className="text-[#1e1541]">Client betaalt:</strong>$150-200/uur
 </p>
 <p className="text-[#64607d]">
 <strong className="text-[#1e1541]">Toptal markup:</strong>50-100% bovenop jouw tarief
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* Section 2: Typical Rates */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Toptal Tarieven: Wat Kun Je Verdienen?
 </h2>

 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Toptal houdt exacte tarieven geheim, maar uit interviews met Toptal freelancers en openbare data zijn dit de gemiddelde ranges per specialisatie:
 </p>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-center justify-between mb-4">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
 Software Developers
 </h3>
 <span className="text-3xl font-bold text-[#22c55e]">$60-150/uur</span>
 </div>
 <div className="space-y-3 text-[#64607d]">
 <div className="flex justify-between border-b border-gray-100 pb-2">
 <span>Junior (3-5 jaar)</span>
 <strong className="text-[#1e1541]">$60-80/uur</strong>
 </div>
 <div className="flex justify-between border-b border-gray-100 pb-2">
 <span>Mid-level (5-8 jaar)</span>
 <strong className="text-[#1e1541]">$80-120/uur</strong>
 </div>
 <div className="flex justify-between">
 <span>Senior/Architect (8+ jaar)</span>
 <strong className="text-[#1e1541]">$120-150/uur</strong>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-center justify-between mb-4">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
 Designers
 </h3>
 <span className="text-3xl font-bold text-[#22c55e]">$70-120/uur</span>
 </div>
 <div className="space-y-3 text-[#64607d]">
 <div className="flex justify-between border-b border-gray-100 pb-2">
 <span>UX/UI Designer</span>
 <strong className="text-[#1e1541]">$70-100/uur</strong>
 </div>
 <div className="flex justify-between border-b border-gray-100 pb-2">
 <span>Product Designer</span>
 <strong className="text-[#1e1541]">$80-120/uur</strong>
 </div>
 <div className="flex justify-between">
 <span>Design Director</span>
 <strong className="text-[#1e1541]">$100-120/uur</strong>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-center justify-between mb-4">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
 Finance Experts
 </h3>
 <span className="text-3xl font-bold text-[#22c55e]">$80-200+/uur</span>
 </div>
 <div className="space-y-3 text-[#64607d]">
 <div className="flex justify-between border-b border-gray-100 pb-2">
 <span>Financial Analyst</span>
 <strong className="text-[#1e1541]">$80-120/uur</strong>
 </div>
 <div className="flex justify-between border-b border-gray-100 pb-2">
 <span>CFO / Consultant</span>
 <strong className="text-[#1e1541]">$120-200/uur</strong>
 </div>
 <div className="flex justify-between">
 <span>Investment Banking</span>
 <strong className="text-[#1e1541]">$150-200+/uur</strong>
 </div>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-center justify-between mb-4">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541]">
 Project Managers
 </h3>
 <span className="text-3xl font-bold text-[#22c55e]">$60-100/uur</span>
 </div>
 <div className="space-y-3 text-[#64607d]">
 <div className="flex justify-between border-b border-gray-100 pb-2">
 <span>Technical PM</span>
 <strong className="text-[#1e1541]">$60-80/uur</strong>
 </div>
 <div className="flex justify-between border-b border-gray-100 pb-2">
 <span>Senior PM</span>
 <strong className="text-[#1e1541]">$80-100/uur</strong>
 </div>
 <div className="flex justify-between">
 <span>Program Director</span>
 <strong className="text-[#1e1541]">$100-120/uur</strong>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg mt-8">
 <p className="text-[#1e1541] font-semibold mb-2">
 Belangrijke Nuance
 </p>
 <p className="text-[#64607d]">
 Deze tarieven zijn wat JIJ als freelancer ontvangt. De client betaalt 50-100% meer. Een developer op $100/uur betekent dat de client $150-200/uur betaalt.
 </p>
 </div>
 </div>
 </section>

 {/* CTA Section 1 */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Vergelijk met Upwork Kosten
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Ontdek hoeveel je meer overhoudt bij Toptal (0% fee) vs Upwork (5-20% fee)
 </p>
 <Link
 href="/nl/gids/prijzen-verdienen/upwork-kosten"
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Bekijk Upwork Kosten →
 </Link>
 </div>
 </section>

 {/* Section 3: Selection Process */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 De Toptal Selectie: Waarom Slechts 3% Wordt Geaccepteerd
 </h2>

 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Toptal's hoge tarieven zijn alleen mogelijk door extreme kwaliteitscontrole. Hun selectieproces is berucht streng en duurt 3-5 weken.
 </p>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6">
 De 5 Screening Fases
 </h3>

 <div className="space-y-6">
 <div className="flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 1
 </div>
 <div>
 <h4 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Language & Communication Screening
 </h4>
 <p className="text-[#64607d] mb-2">
 30 minuten gesprek met recruiter. Engels moet vloeiend zijn. Personality fit check.
 </p>
 <p className="text-sm text-[#64607d]">
 <strong>Afwijzing rate:</strong>~40% valt hier al af
 </p>
 </div>
 </div>

 <div className="flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 2
 </div>
 <div>
 <h4 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Technical Skills Assessment
 </h4>
 <p className="text-[#64607d] mb-2">
 Diepgaande technische test (90-120 minuten). Coderen, problem-solving, algoritmes.
 </p>
 <p className="text-sm text-[#64607d]">
 <strong>Afwijzing rate:</strong>~30% faalt de technische test
 </p>
 </div>
 </div>

 <div className="flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 3
 </div>
 <div>
 <h4 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Live Technical Screening
 </h4>
 <p className="text-[#64607d] mb-2">
 60-90 minuten live coding met senior engineer. Real-world probleem oplossen terwijl je denken wordt beoordeeld.
 </p>
 <p className="text-sm text-[#64607d]">
 <strong>Afwijzing rate:</strong>~15% faalt live screening
 </p>
 </div>
 </div>

 <div className="flex items-start">
 <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 4
 </div>
 <div>
 <h4 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Test Project
 </h4>
 <p className="text-[#64607d] mb-2">
 Onbetaald project (4-8 uur werk) om je end-to-end workflow te testen. Code quality, communicatie, deadlines.
 </p>
 <p className="text-sm text-[#64607d]">
 <strong>Afwijzing rate:</strong>~10% faalt test project
 </p>
 </div>
 </div>

 <div className="flex items-start">
 <div className="bg-[#22c55e] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
 5
 </div>
 <div>
 <h4 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 Acceptance & Onboarding
 </h4>
 <p className="text-[#64607d] mb-2">
 Profiel setup, rate negotiation, matching preferences. Je bent binnen!
 </p>
 <p className="text-sm text-[#22c55e] font-semibold">
 Gefeliciteerd - je behoort tot de top 3%
 </p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-[#f8f9fb] rounded-lg p-6">
 <h4 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
 Totale Tijdsinvestering
 </h4>
 <ul className="space-y-2 text-[#64607d]">
 <li>• Voorbereiding: 10-20 uur (studeren, portfolio oppoetsen)</li>
 <li>• Screening proces: 15-25 uur (gesprekken, tests, project)</li>
 <li>• Wachttijd: 3-5 weken tussen stappen</li>
 <li>• <strong className="text-[#1e1541]">Totaal: 30-50 uur investering</strong></li>
 </ul>
 </div>
 </div>
 </section>

 {/* Section 4: Income Comparison */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Toptal vs Upwork: Hoeveel Verdien Je Écht?
 </h2>

 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 Laten we de getallen vergelijken voor een senior developer die $50.000 per jaar verdient.
 </p>

 <div className="grid md:grid-cols-2 gap-8 mb-8">
 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-6 text-center">
 Upwork Scenario
 </h3>
 <div className="space-y-4">
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Uurtarief</span>
 <strong className="text-[#1e1541]">$50/uur</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Factureerbare uren</span>
 <strong className="text-[#1e1541]">1.200/jaar</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Bruto omzet</span>
 <strong className="text-[#1e1541]">$60.000</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Platform fee (12%)</span>
 <strong className="text-red-500">-$7.200</strong>
 </div>
 <div className="flex justify-between items-center border-b border-gray-100 pb-3">
 <span className="text-[#64607d]">Connects kosten</span>
 <strong className="text-red-500">-$180</strong>
 </div>
 <div className="flex justify-between items-center pt-3">
 <strong className="text-[#1e1541]">Netto inkomen</strong>
 <strong className="text-[#22c55e] text-xl">$52.620</strong>
 </div>
 </div>
 </div>

 <div className="bg-gradient-to-br from-[#1e1541] to-[#2a1f5e] rounded-lg shadow-xl p-8 text-white border-4 border-[#22c55e]">
 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#22c55e] text-white px-4 py-1 rounded-full text-sm font-bold">
 MEER VERDIENEN
 </div>
 <h3 className="font-heading font-semibold text-2xl mb-6 text-center">
 Toptal Scenario
 </h3>
 <div className="space-y-4">
 <div className="flex justify-between items-center border-b border-white/20 pb-3">
 <span className="text-gray-300">Uurtarief</span>
 <strong>$50/uur</strong>
 </div>
 <div className="flex justify-between items-center border-b border-white/20 pb-3">
 <span className="text-gray-300">Factureerbare uren</span>
 <strong>1.200/jaar</strong>
 </div>
 <div className="flex justify-between items-center border-b border-white/20 pb-3">
 <span className="text-gray-300">Bruto omzet</span>
 <strong>$60.000</strong>
 </div>
 <div className="flex justify-between items-center border-b border-white/20 pb-3">
 <span className="text-gray-300">Platform fee</span>
 <strong className="text-[#22c55e]">$0 ✓</strong>
 </div>
 <div className="flex justify-between items-center border-b border-white/20 pb-3">
 <span className="text-gray-300">Matching kosten</span>
 <strong className="text-[#22c55e]">$0 ✓</strong>
 </div>
 <div className="flex justify-between items-center pt-3">
 <strong>Netto inkomen</strong>
 <strong className="text-[#22c55e] text-xl">$60.000</strong>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-[#22c55e]/10 border-2 border-[#22c55e] rounded-lg p-6 text-center">
 <p className="text-[#1e1541] font-bold text-2xl mb-2">
 Verschil: +$7.380 per jaar (14% meer)
 </p>
 <p className="text-[#64607d]">
 Bij hetzelfde uurtarief verdien je bij Toptal meer door 0% platform fees
 </p>
 </div>
 </div>
 </section>

 {/* CTA Section 2 */}
 <section className="mb-16">
 <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Bereken Je Ideale Uurtarief
 </h3>
 <p className="text-xl mb-6 text-gray-300">
 Ontdek wat je moet vragen om je inkomensdoelen te bereiken
 </p>
 <Link
 href="/nl/gids/prijzen-verdienen/freelance-uurtarief-berekenen"
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Bereken Minimaal Tarief →
 </Link>
 </div>
 </section>

 {/* Section 5: Pros & Cons */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Is Toptal Het Waard? Eerlijke Analyse
 </h2>

 <div className="grid md:grid-cols-2 gap-8">
 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#22c55e] mb-6">
 ✅ Voordelen
 </h3>
 <ul className="space-y-4">
 <li className="flex items-start">
 <span className="text-[#22c55e] text-xl mr-3">✓</span>
 <div>
 <strong className="text-[#1e1541]">0% Platform Fees</strong>
 <p className="text-sm text-[#64607d]">Hou 100% van je tarief, geen commissie</p>
 </div>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] text-xl mr-3">✓</span>
 <div>
 <strong className="text-[#1e1541]">Premium Tarieven</strong>
 <p className="text-sm text-[#64607d]">$60-200+/uur, geen race naar de bodem</p>
 </div>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] text-xl mr-3">✓</span>
 <div>
 <strong className="text-[#1e1541]">Passieve Leads</strong>
 <p className="text-sm text-[#64607d]">Toptal matcht jou, geen solliciteren nodig</p>
 </div>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] text-xl mr-3">✓</span>
 <div>
 <strong className="text-[#1e1541]">Enterprise Klanten</strong>
 <p className="text-sm text-[#64607d]">Samenwerken met Fortune 500 bedrijven</p>
 </div>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] text-xl mr-3">✓</span>
 <div>
 <strong className="text-[#1e1541]">Prestige</strong>
 <p className="text-sm text-[#64607d]">Top 3% badge verhoogt je marktwaarde</p>
 </div>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] text-xl mr-3">✓</span>
 <div>
 <strong className="text-[#1e1541]">Langetermijn Projecten</strong>
 <p className="text-sm text-[#64607d]">Gemiddeld 6-12+ maanden contracten</p>
 </div>
 </li>
 </ul>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-red-500 mb-6">
 ❌ Nadelen
 </h3>
 <ul className="space-y-4">
 <li className="flex items-start">
 <span className="text-red-500 text-xl mr-3">✗</span>
 <div>
 <strong className="text-[#1e1541]">Extreem Moeilijk In Te Komen</strong>
 <p className="text-sm text-[#64607d]">3% acceptance rate, 30-50 uur screening proces</p>
 </div>
 </li>
 <li className="flex items-start">
 <span className="text-red-500 text-xl mr-3">✗</span>
 <div>
 <strong className="text-[#1e1541]">Geen Controle Over Klanten</strong>
 <p className="text-sm text-[#64607d]">Toptal beslist welke matches je krijgt</p>
 </div>
 </li>
 <li className="flex items-start">
 <span className="text-red-500 text-xl mr-3">✗</span>
 <div>
 <strong className="text-[#1e1541]">Mogelijk Inactieve Periodes</strong>
 <p className="text-sm text-[#64607d]">Als er geen geschikte matches zijn, geen werk</p>
 </div>
 </li>
 <li className="flex items-start">
 <span className="text-red-500 text-xl mr-3">✗</span>
 <div>
 <strong className="text-[#1e1541]">Strikte Kwaliteitseisen</strong>
 <p className="text-sm text-[#64607d]">Slechte reviews = verwijderd van platform</p>
 </div>
 </li>
 <li className="flex items-start">
 <span className="text-red-500 text-xl mr-3">✗</span>
 <div>
 <strong className="text-[#1e1541]">Vereist Senior Niveau</strong>
 <p className="text-sm text-[#64607d]">Meestal 5+ jaar ervaring nodig</p>
 </div>
 </li>
 <li className="flex items-start">
 <span className="text-red-500 text-xl mr-3">✗</span>
 <div>
 <strong className="text-[#1e1541]">Geen Transparantie</strong>
 <p className="text-sm text-[#64607d]">Client markup onbekend, kan demotiverend zijn</p>
 </div>
 </li>
 </ul>
 </div>
 </div>
 </section>

 {/* Section 6: Should You Apply */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Moet Je Voor Toptal Gaan?
 </h2>

 <div className="prose prose-lg max-w-none">
 <div className="space-y-6">
 <div className="bg-[#22c55e]/10 border-2 border-[#22c55e] rounded-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 ✅ Ja, Solliciteer Als Je:
 </h3>
 <ul className="space-y-3 text-[#64607d]">
 <li>✓ <strong className="text-[#1e1541]">5+ jaar ervaring</strong>hebt in je veld</li>
 <li>✓ <strong className="text-[#1e1541]">Vloeiend Engels</strong>spreekt en schrijft</li>
 <li>✓ Een <strong className="text-[#1e1541]">sterk portfolio</strong>hebt met complexe projecten</li>
 <li>✓ <strong className="text-[#1e1541]">30-50 uur</strong>kunt investeren in screening</li>
 <li>✓ Premium tarieven wilt zonder <strong className="text-[#1e1541]">platform fees</strong></li>
 <li>✓ <strong className="text-[#1e1541]">Langetermijn stabiliteit</strong>prefereert boven veel kleine jobs</li>
 <li>✓ De <strong className="text-[#1e1541]">prestige</strong>van "top 3%" waardeert</li>
 </ul>
 </div>

 <div className="bg-red-50 border-2 border-red-300 rounded-lg p-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 ❌ Nee, Kies Anders Als Je:
 </h3>
 <ul className="space-y-3 text-[#64607d]">
 <li>✗ <strong className="text-[#1e1541]">Beginnende freelancer</strong>bent (&lt;3 jaar)</li>
 <li>✗ <strong className="text-[#1e1541]">Snel inkomen</strong>nodig hebt (screening duurt weken)</li>
 <li>✗ <strong className="text-[#1e1541]">Volume boven kwaliteit</strong>prefereert (veel kleine jobs)</li>
 <li>✗ <strong className="text-[#1e1541]">Flexibiliteit</strong>belangrijker vindt dan hoge tarieven</li>
 <li>✗ Niet comfortabel bent met <strong className="text-[#1e1541]">technische interviews</strong></li>
 <li>✗ Je <strong className="text-[#1e1541]">eigen klanten wilt kiezen</strong></li>
 </ul>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 Pro Tip: Gebruik Beide
 </h3>
 <p className="text-[#64607d] mb-4">
 De beste strategie? Solliciteer bij Toptal voor premium langetermijn werk, maar gebruik Upwork/Fiverr als backup tijdens slow periods. Diversificeer je income streams.
 </p>
 <Link
 href="/nl/platforms"
 className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
 >
 Bekijk Alle Freelance Platforms →
 </Link>
 </div>
 </div>
 </section>

 {/* Final CTA */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Leer Onderhandelen voor Top Tarieven
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Of je nu Toptal, Upwork of directe klanten hebt - betere onderhandeling = meer inkomen
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
 The Toptal Business Model: How It Works
 </h2>
 <p className="text-[#64607d] leading-relaxed mb-6">
 Toptal is not a typical freelance platform. It's an exclusive network of the top 3% of freelancers worldwide. Their model is fundamentally different from Upwork or Fiverr.
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
 ? "Toptal Prijzen 2026: Wat Verdienen Elite Freelancers?"
 : "Toptal Pricing 2026: What Elite Freelancers Earn",
 "description": locale === 'nl'
 ? "Ontdek hoe Toptal pricing werkt: $60-200+ uur tarieven, geen platform fees voor freelancers, maar strenge selectie."
 : "Discover how Toptal pricing works: $60-200+ hourly rates, no platform fees for freelancers, but strict selection.",
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
 "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/prijzen-verdienen/toptal-prijzen`
 }
 })
 }}
 />
 </main>

 
 </>
 );
}
