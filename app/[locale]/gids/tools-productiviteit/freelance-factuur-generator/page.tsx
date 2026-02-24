import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type Props = {
 params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'freelance-factuur-generator';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/tools-productiviteit/${slug}`;

 if (locale === 'nl') {
 return {
 title: "Beste Factuur Generators voor Freelancers 2026: Gratis & Betaald Vergeleken",
 description: "Vergelijk de 8 beste factuur generators voor freelancers. Gratis en betaalde opties met automatische nummering, BTW en professionele templates. Start vandaag nog.",
 keywords: "factuur generator, gratis factuur maken, online factuur, freelance facturen, btw factuur generator",
 openGraph: {
 title: "Beste Factuur Generators voor Freelancers 2026: Gratis & Betaald",
 description: "Vergelijk de 8 beste factuur generators voor freelancers. Gratis en betaalde opties met automatische nummering en BTW.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Factuur Generators Vergelijking - SkillLinkup',
 }
 ],
 locale: 'nl_NL',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "Beste Factuur Generators voor Freelancers 2026",
 description: "Vergelijk de 8 beste factuur generators. Gratis en betaalde opties met automatische nummering en BTW.",
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 },
 };
 }

 return {
 title: "Best Invoice Generators for Freelancers 2026: Free & Paid Compared",
 description: "Compare the 8 best invoice generators for freelancers. Free and paid options with automatic numbering, VAT and professional templates. Start today.",
 keywords: "invoice generator, free invoice maker, online invoice, freelance invoices",
 openGraph: {
 title: "Best Invoice Generators for Freelancers 2026: Free & Paid",
 description: "Compare the 8 best invoice generators for freelancers. Free and paid options with automatic numbering and VAT.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/gids-og.png`,
 width: 1200,
 height: 630,
 alt: 'Invoice Generators Comparison - SkillLinkup',
 }
 ],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: "Best Invoice Generators for Freelancers 2026",
 description: "Compare the 8 best invoice generators for freelancers.",
 images: [`${siteUrl}/images/og/gids-og.png`],
 },
 alternates: {
 canonical: pageUrl,
 },
 };
}

export default async function FreelanceFactuurGeneratorPage({ params }: Props) {
 const { locale } = await params;

 const content = locale === 'nl' ? {
 h1: "Beste Factuur Generators voor Freelancers 2026",
 intro: "Professionele facturen versturen in 5 minuten zonder ingewikkelde software? Een goede factuur generator maakt factureren zo simpel als een online formulier invullen. Ontdek welke opties gratis zijn en wanneer betaalde tools de investering waard zijn.",
 cta1: "Maak Gratis Factuur",
 cta1Url: "/nl/tools/invoice-generator",
 } : {
 h1: "Best Invoice Generators for Freelancers 2026",
 intro: "Send professional invoices in 5 minutes without complicated software? A good invoice generator makes invoicing as simple as filling in an online form. Discover which options are free and when paid tools are worth the investment.",
 cta1: "Create Free Invoice",
 cta1Url: "/en/tools/invoice-generator",
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
 {/* Section 1: Gratis vs Betaald */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Gratis of Betaald: Wat Heb Je Nodig?
 </h2>
 <div className="prose prose-lg max-w-none">
 <p className="text-[#64607d] leading-relaxed mb-6">
 De keuze tussen een gratis factuur generator en betaalde software hangt af van je situatie. Voor sporadische facturen is gratis prima. Maar bij 10+ facturen per maand loont automatisering zich snel.
 </p>

 <div className="grid md:grid-cols-2 gap-8 mb-8">
 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="text-4xl mb-4"></div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 Gratis Tools
 </h3>
 <div className="space-y-3 mb-6">
 <p className="text-[#22c55e] font-semibold">✅ Perfect voor:</p>
 <ul className="space-y-2 text-[#64607d]">
 <li>• 1-10 facturen per maand</li>
 <li>• Starters zonder budget</li>
 <li>• Eenmalige projecten</li>
 <li>• Simpele facturatie behoeften</li>
 </ul>
 </div>
 <div className="space-y-3">
 <p className="text-red-500 font-semibold">❌ Beperkingen:</p>
 <ul className="space-y-2 text-[#64607d]">
 <li>• Geen automatische herinneringen</li>
 <li>• Handmatige administratie</li>
 <li>• Beperkte templates</li>
 <li>• Soms branding/watermark</li>
 </ul>
 </div>
 </div>

 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="text-4xl mb-4"></div>
 <h3 className="font-heading font-semibold text-2xl text-[#1e1541] mb-4">
 Betaalde Software
 </h3>
 <div className="space-y-3 mb-6">
 <p className="text-[#22c55e] font-semibold">✅ Perfect voor:</p>
 <ul className="space-y-2 text-[#64607d]">
 <li>• 10+ facturen per maand</li>
 <li>• Terugkerende klanten</li>
 <li>• BTW-plichtige freelancers</li>
 <li>• Professionele branding</li>
 </ul>
 </div>
 <div className="space-y-3">
 <p className="text-[#ef2b70] font-semibold">Extra voordelen:</p>
 <ul className="space-y-2 text-[#64607d]">
 <li>• Automatische nummering</li>
 <li>• Betalingsherinneringen</li>
 <li>• BTW-tracking</li>
 <li>• Time tracking integratie</li>
 </ul>
 </div>
 </div>
 </div>

 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg">
 <p className="text-[#1e1541] font-semibold mb-2">
 Snelle Rekensom
 </p>
 <p className="text-[#64607d]">
 Als je 2 uur per maand bespaart met automatisering, en je uurtarief is €50, dan verdien je €100 terug. Betaalde software van €15/maand is dan al winstgevend.
 </p>
 </div>
 </div>
 </section>

 {/* Section 2: Top 8 Factuur Generators */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Top 8 Factuur Generators Vergeleken
 </h2>

 <div className="space-y-8">
 {/* Tool 1: SkillLinkup Invoice Generator */}
 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-lg p-8 text-white">
 <div className="flex items-start justify-between mb-4">
 <div>
 <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm mb-2">ONZE TOOL</div>
 <h3 className="font-heading font-bold text-2xl mb-2">
 1. SkillLinkup Invoice Generator
 </h3>
 <p className="text-white/90">100% gratis, geen registratie vereist</p>
 </div>
 <div className="text-right">
 <div className="font-heading font-bold text-3xl">GRATIS</div>
 <div className="text-white/80 text-sm">altijd</div>
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-6 mb-6">
 <div>
 <h4 className="font-semibold mb-3">✅ Features</h4>
 <ul className="space-y-2 text-white/90">
 <li>• Automatische factuurnummering (INV-2026-XXXX)</li>
 <li>• Multi-currency (€, $, £)</li>
 <li>• Logo upload</li>
 <li>• BTW-berekening</li>
 <li>• PDF export & printen</li>
 <li>• LocalStorage (geen account nodig)</li>
 </ul>
 </div>
 <div>
 <h4 className="font-semibold mb-3">Ideaal Voor</h4>
 <ul className="space-y-2 text-white/90">
 <li>• Freelancers die direct willen starten</li>
 <li>• Geen abonnement willen</li>
 <li>• Privacy-bewuste professionals</li>
 <li>• Internationale klanten</li>
 </ul>
 </div>
 </div>

 <Link
 href="/nl/tools/invoice-generator"
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-6 py-3 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all"
 >
 Maak Nu Een Factuur →
 </Link>
 </div>

 {/* Tool 2: Moneybird */}
 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-start justify-between mb-4">
 <div>
 <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-2">
 2. Moneybird
 </h3>
 <p className="text-[#64607d]">All-in-one facturatie en boekhouding</p>
 </div>
 <div className="text-right">
 <div className="text-[#ef2b70] font-heading font-bold text-2xl">€15</div>
 <div className="text-[#64607d] text-sm">/maand</div>
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-6 mb-6">
 <div>
 <h4 className="font-semibold text-[#1e1541] mb-3">✅ Voordelen</h4>
 <ul className="space-y-2 text-[#64607d]">
 <li>• Automatische herinneringen</li>
 <li>• BTW-aangifte integratie</li>
 <li>• Terugkerende facturen</li>
 <li>• Tijd tracking</li>
 <li>• Nederlandse interface</li>
 </ul>
 </div>
 <div>
 <h4 className="font-semibold text-[#1e1541] mb-3">❌ Nadelen</h4>
 <ul className="space-y-2 text-[#64607d]">
 <li>• Geen gratis plan</li>
 <li>• Overkill voor sporadisch gebruik</li>
 <li>• Abonnement verplicht</li>
 </ul>
 </div>
 </div>
 </div>

 {/* Tool 3: Facturen.net */}
 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-start justify-between mb-4">
 <div>
 <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-2">
 3. Facturen.net
 </h3>
 <p className="text-[#64607d]">Gratis online factuur generator</p>
 </div>
 <div className="text-right">
 <div className="text-[#22c55e] font-heading font-bold text-2xl">GRATIS</div>
 <div className="text-[#64607d] text-sm">basis versie</div>
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-6 mb-6">
 <div>
 <h4 className="font-semibold text-[#1e1541] mb-3">✅ Voordelen</h4>
 <ul className="space-y-2 text-[#64607d]">
 <li>• 100% gratis (met watermark)</li>
 <li>• Simpel en snel</li>
 <li>• Nederlandse templates</li>
 <li>• PDF download</li>
 </ul>
 </div>
 <div>
 <h4 className="font-semibold text-[#1e1541] mb-3">❌ Nadelen</h4>
 <ul className="space-y-2 text-[#64607d]">
 <li>• Watermark op gratis versie</li>
 <li>• Geen opslag van facturen</li>
 <li>• Basis functionaliteit</li>
 </ul>
 </div>
 </div>
 </div>

 {/* Tool 4: Invoice Ninja */}
 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-start justify-between mb-4">
 <div>
 <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-2">
 4. Invoice Ninja
 </h3>
 <p className="text-[#64607d]">Open-source facturatie platform</p>
 </div>
 <div className="text-right">
 <div className="text-[#22c55e] font-heading font-bold text-2xl">GRATIS</div>
 <div className="text-[#64607d] text-sm">5 klanten</div>
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-6 mb-6">
 <div>
 <h4 className="font-semibold text-[#1e1541] mb-3">✅ Voordelen</h4>
 <ul className="space-y-2 text-[#64607d]">
 <li>• Gratis tot 5 klanten</li>
 <li>• Online betalingen</li>
 <li>• Tijd tracking</li>
 <li>• Custom branding</li>
 <li>• Open source</li>
 </ul>
 </div>
 <div>
 <h4 className="font-semibold text-[#1e1541] mb-3">❌ Nadelen</h4>
 <ul className="space-y-2 text-[#64607d]">
 <li>• Engelse interface</li>
 <li>• Technische setup vereist</li>
 <li>• Geen NL BTW-support</li>
 </ul>
 </div>
 </div>
 </div>

 {/* Tool 5: Zervant */}
 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-start justify-between mb-4">
 <div>
 <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-2">
 5. Zervant
 </h3>
 <p className="text-[#64607d]">Gratis voor kleine freelancers</p>
 </div>
 <div className="text-right">
 <div className="text-[#22c55e] font-heading font-bold text-2xl">€0-€16</div>
 <div className="text-[#64607d] text-sm">/maand</div>
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-6 mb-6">
 <div>
 <h4 className="font-semibold text-[#1e1541] mb-3">✅ Voordelen</h4>
 <ul className="space-y-2 text-[#64607d]">
 <li>• Gratis tot 5 facturen/maand</li>
 <li>• Multi-currency</li>
 <li>• Professionele templates</li>
 <li>• Mobile app</li>
 <li>• Meerdere talen</li>
 </ul>
 </div>
 <div>
 <h4 className="font-semibold text-[#1e1541] mb-3">❌ Nadelen</h4>
 <ul className="space-y-2 text-[#64607d]">
 <li>• Beperkt tot 5 facturen (gratis)</li>
 <li>• Geen BTW-aangifte</li>
 <li>• Premium voor meer features</li>
 </ul>
 </div>
 </div>
 </div>

 {/* Tool 6: Jortt */}
 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-start justify-between mb-4">
 <div>
 <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-2">
 6. Jortt
 </h3>
 <p className="text-[#64607d]">Facturatie specialist</p>
 </div>
 <div className="text-right">
 <div className="text-[#ef2b70] font-heading font-bold text-2xl">€9</div>
 <div className="text-[#64607d] text-sm">/maand</div>
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-6 mb-6">
 <div>
 <h4 className="font-semibold text-[#1e1541] mb-3">✅ Voordelen</h4>
 <ul className="space-y-2 text-[#64607d]">
 <li>• Nederlandse software</li>
 <li>• Automatische herinneringen</li>
 <li>• Tijd tracking</li>
 <li>• Goede prijs</li>
 </ul>
 </div>
 <div>
 <h4 className="font-semibold text-[#1e1541] mb-3">❌ Nadelen</h4>
 <ul className="space-y-2 text-[#64607d]">
 <li>• Geen gratis versie</li>
 <li>• Minder features dan Moneybird</li>
 </ul>
 </div>
 </div>
 </div>

 {/* Tool 7: Canva Invoice Maker */}
 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-start justify-between mb-4">
 <div>
 <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-2">
 7. Canva Invoice Maker
 </h3>
 <p className="text-[#64607d]">Design-gerichte facturen</p>
 </div>
 <div className="text-right">
 <div className="text-[#22c55e] font-heading font-bold text-2xl">GRATIS</div>
 <div className="text-[#64607d] text-sm">basis</div>
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-6 mb-6">
 <div>
 <h4 className="font-semibold text-[#1e1541] mb-3">✅ Voordelen</h4>
 <ul className="space-y-2 text-[#64607d]">
 <li>• Mooie design templates</li>
 <li>• Drag & drop editor</li>
 <li>• Gratis basis versie</li>
 <li>• Brand kit integratie</li>
 </ul>
 </div>
 <div>
 <h4 className="font-semibold text-[#1e1541] mb-3">❌ Nadelen</h4>
 <ul className="space-y-2 text-[#64607d]">
 <li>• Geen automatisering</li>
 <li>• Handmatige nummering</li>
 <li>• Geen BTW-functie</li>
 </ul>
 </div>
 </div>
 </div>

 {/* Tool 8: FreshBooks */}
 <div className="bg-white rounded-lg shadow-lg p-8">
 <div className="flex items-start justify-between mb-4">
 <div>
 <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-2">
 8. FreshBooks
 </h3>
 <p className="text-[#64607d]">Premium internationale optie</p>
 </div>
 <div className="text-right">
 <div className="text-[#ef2b70] font-heading font-bold text-2xl">$17</div>
 <div className="text-[#64607d] text-sm">/maand</div>
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-6 mb-6">
 <div>
 <h4 className="font-semibold text-[#1e1541] mb-3">✅ Voordelen</h4>
 <ul className="space-y-2 text-[#64607d]">
 <li>• Professioneel platform</li>
 <li>• Online betalingen</li>
 <li>• Tijd tracking</li>
 <li>• Expense tracking</li>
 </ul>
 </div>
 <div>
 <h4 className="font-semibold text-[#1e1541] mb-3">❌ Nadelen</h4>
 <ul className="space-y-2 text-[#64607d]">
 <li>• Duur voor starters</li>
 <li>• Geen NL BTW-support</li>
 <li>• Engelse interface</li>
 </ul>
 </div>
 </div>
 </div>

 </div>
 </section>

 {/* CTA Section 1 */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Maak Nu Je Eerste Factuur
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Gratis, zonder registratie, professioneel resultaat
 </p>
 <Link
 href="/nl/tools/invoice-generator"
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Start Gratis Generator →
 </Link>
 </div>
 </section>

 {/* Section 3: Wat Moet Op Een Factuur */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Wat Moet Wettelijk Op Een Factuur? (Checklist)
 </h2>

 <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
 <p className="text-[#64607d] leading-relaxed mb-6">
 In Nederland ben je als ondernemer verplicht bepaalde informatie op je factuur te zetten. Mist er iets? Dan is je factuur niet geldig en kun je niet betaald krijgen.
 </p>

 <div className="grid md:grid-cols-2 gap-6">
 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
 Verplichte Gegevens
 </h3>
 <ul className="space-y-3">
 <li className="flex items-start">
 <span className="text-[#22c55e] font-bold mr-3">✓</span>
 <span className="text-[#64607d]">Factuurnummer (uniek en oplopend)</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] font-bold mr-3">✓</span>
 <span className="text-[#64607d]">Factuurdatum</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] font-bold mr-3">✓</span>
 <span className="text-[#64607d]">Je bedrijfsnaam en adres</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] font-bold mr-3">✓</span>
 <span className="text-[#64607d]">Je KvK-nummer</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] font-bold mr-3">✓</span>
 <span className="text-[#64607d]">Je BTW-nummer (als BTW-plichtig)</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] font-bold mr-3">✓</span>
 <span className="text-[#64607d]">Klant naam en adres</span>
 </li>
 </ul>
 </div>

 <div>
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-4">
 Financiële Details
 </h3>
 <ul className="space-y-3">
 <li className="flex items-start">
 <span className="text-[#22c55e] font-bold mr-3">✓</span>
 <span className="text-[#64607d]">Omschrijving van producten/diensten</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] font-bold mr-3">✓</span>
 <span className="text-[#64607d]">Aantal en prijs per stuk</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] font-bold mr-3">✓</span>
 <span className="text-[#64607d]">BTW-percentage en bedrag</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] font-bold mr-3">✓</span>
 <span className="text-[#64607d]">Totaalbedrag inclusief BTW</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] font-bold mr-3">✓</span>
 <span className="text-[#64607d]">Betalingstermijn (bijv. 14 dagen)</span>
 </li>
 <li className="flex items-start">
 <span className="text-[#22c55e] font-bold mr-3">✓</span>
 <span className="text-[#64607d]">Je bankrekeningnummer (IBAN)</span>
 </li>
 </ul>
 </div>
 </div>
 </div>

 <div className="bg-[#fff8f8] border-l-4 border-[#ef2b70] p-6 rounded-r-lg">
 <p className="text-[#1e1541] font-semibold mb-2">
 Let Op: BTW-Vrijstelling
 </p>
 <p className="text-[#64607d]">
 Gebruik je de KOR (Kleineondernemersregeling)? Dan mag je geen BTW op je factuur zetten. Vermeld in plaats daarvan: "Onder de KOR wordt geen BTW berekend."
 </p>
 </div>
 </section>

 {/* Section 4: Tips voor Sneller Betaald Worden */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 7 Tips om Sneller Betaald Te Worden
 </h2>

 <div className="space-y-6">
 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 1. Verstuur Direct Na Oplevering
 </h3>
 <p className="text-[#64607d]">
 Wacht niet tot het einde van de maand. Factuur versturen op de dag van oplevering verhoogt je kans op snelle betaling met 40%.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 2. Gebruik Kortere Betalingstermijnen
 </h3>
 <p className="text-[#64607d]">
 In plaats van "30 dagen" kun je "14 dagen" hanteren. De wet staat maximaal 60 dagen toe, maar korter is vaak beter.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 3. Maak Online Betalen Makkelijk
 </h3>
 <p className="text-[#64607d]">
 Voeg een "Betaal Nu" knop toe met Mollie of Stripe. Klanten betalen 3x sneller als ze direct kunnen klikken.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 4. Automatische Herinneringen
 </h3>
 <p className="text-[#64607d]">
 Tools zoals Moneybird sturen automatisch vriendelijke herinneringen. Dit bespaart jou awkward emails en verhoogt betaalpercentage.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 5. Vooruitbetaling Voor Grote Projecten
 </h3>
 <p className="text-[#64607d]">
 Bij opdrachten boven €2.000 vraag je 30-50% vooruit. Dit voorkomt cashflow problemen en toont professionaliteit.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 6. Persoonlijk Bericht Toevoegen
 </h3>
 <p className="text-[#64607d]">
 Een korte persoonlijke noot ("Bedankt voor de fijne samenwerking!") maakt je factuur menselijker en verhoogt betaalsnelheid.
 </p>
 </div>

 <div className="bg-white rounded-lg shadow p-6">
 <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
 7. Incassorente Vermelden
 </h3>
 <p className="text-[#64607d]">
 Voeg toe: "Bij te late betaling zijn wij genoodzaakt incassokosten en rente (2% per maand) in rekening te brengen." Dit werkt preventief.
 </p>
 </div>
 </div>
 </section>

 {/* CTA Section 2 */}
 <section className="mb-16">
 <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Track Je Factureerbare Uren
 </h3>
 <p className="text-xl mb-6 text-gray-300">
 Gebruik onze gratis time tracker en mis geen minuut meer
 </p>
 <Link
 href="/nl/tools/time-tracker"
 className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Start Time Tracker →
 </Link>
 </div>
 </section>

 {/* Final CTA */}
 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Ontdek Meer Freelance Tools
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Verhoog je productiviteit met onze gratis tools voor freelancers
 </p>
 <Link
 href="/nl/tools"
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Bekijk Alle Tools →
 </Link>
 </div>
 </section>

 </>
 ) : (
 <>
 {/* English content - simplified */}
 <section className="mb-16">
 <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
 Free or Paid: What Do You Need?
 </h2>
 <p className="text-[#64607d] leading-relaxed mb-6">
 The choice between a free invoice generator and paid software depends on your situation. For occasional invoices, free is fine. But with 10+ invoices per month, automation pays off quickly.
 </p>
 </section>

 <section className="mb-16">
 <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
 <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
 Create Your First Invoice Now
 </h3>
 <p className="text-xl mb-6 text-white/90">
 Free, no registration, professional results
 </p>
 <Link
 href="/en/tools/invoice-generator"
 className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
 >
 Start Free Generator →
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
 "@graph": [
 {
 "@type": "Article",
 "headline": locale === 'nl'
 ? "Beste Factuur Generators voor Freelancers 2026: Gratis & Betaald Vergeleken"
 : "Best Invoice Generators for Freelancers 2026: Free & Paid Compared",
 "description": locale === 'nl'
 ? "Vergelijk de 8 beste factuur generators voor freelancers. Gratis en betaalde opties met automatische nummering en BTW."
 : "Compare the 8 best invoice generators for freelancers. Free and paid options with automatic numbering and VAT.",
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
 "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/tools-productiviteit/freelance-factuur-generator`
 }
 },
 {
 "@type": "BreadcrumbList",
 "itemListElement": [
 {
 "@type": "ListItem",
 "position": 1,
 "name": "Home",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}`
 },
 {
 "@type": "ListItem",
 "position": 2,
 "name": locale === 'nl' ? "Gids" : "Guide",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids`
 },
 {
 "@type": "ListItem",
 "position": 3,
 "name": locale === 'nl' ? "Tools & Productiviteit" : "Tools & Productivity",
 "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/tools-productiviteit`
 },
 {
 "@type": "ListItem",
 "position": 4,
 "name": locale === 'nl' ? "Freelance Factuur Generator" : "Freelance Invoice Generator"
 }
 ]
 }
 ]
 })
 }}
 />
 </main>

 <Footer />
 </>
 );
}
