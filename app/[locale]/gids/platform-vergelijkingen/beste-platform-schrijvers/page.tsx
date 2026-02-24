import { Metadata } from 'next';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata>{
 const { locale } = await params;
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/platform-vergelijkingen/beste-platform-schrijvers`;

 const title = locale === 'nl'
 ? 'Beste Freelance Platform voor Schrijvers & Content Creators 2026'
 : 'Best Freelance Platform for Writers & Content Creators 2026';

 const description = locale === 'nl'
 ? 'Ontdek de 5 beste platforms voor freelance schrijvers: Upwork, Fiverr, Contently, Scripted en iWriter. Vergelijk tarieven en kies het beste.'
 : 'Discover the 5 best platforms for freelance writers: Upwork, Fiverr, Contently, Scripted and iWriter. Compare rates and choose the best.';

 return {
 title,
 description,
 keywords: locale === 'nl'
 ? 'beste platform schrijvers, freelance schrijven, content creator platforms, upwork schrijvers, fiverr writing'
 : 'best platform writers, freelance writing, content creator platforms, upwork writers, fiverr writing',
 alternates: {
 canonical: pageUrl,
 languages: {
 'en': `${siteUrl}/en/gids/platform-vergelijkingen/beste-platform-schrijvers`,
 'nl': `${siteUrl}/nl/gids/platform-vergelijkingen/beste-platform-schrijvers`,
 },
 },
 openGraph: {
 title,
 description,
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{
 url: `${siteUrl}/images/og/beste-platform-schrijvers.png`,
 width: 1200,
 height: 630,
 alt: title,
 }],
 locale: locale === 'nl' ? 'nl_NL' : 'en_US',
 type: 'article',
 },
 robots: {
 index: true,
 follow: true,
 },
 };
}

export default async function BestePlatformSchrijversPage({ params }: PageProps) {
 const { locale } = await params;
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

 const faqSchema = {
 '@context': 'https://schema.org',
 '@type': 'FAQPage',
 mainEntity: [
 {
 '@type': 'Question',
 name: locale === 'nl' ? 'Wat is het beste platform voor beginnende schrijvers?' : 'What is the best platform for beginning writers?',
 acceptedAnswer: {
 '@type': 'Answer',
 text: locale === 'nl'
 ? 'Fiverr is ideaal voor beginners omdat je direct gigs kunt aanbieden zonder sollicitatieproces. Start met eenvoudige artikelen van 500 woorden voor €15-25 en bouw je portfolio op.'
 : 'Fiverr is ideal for beginners because you can offer gigs directly without an application process. Start with simple 500-word articles for €15-25 and build your portfolio.',
 },
 },
 {
 '@type': 'Question',
 name: locale === 'nl' ? 'Hoeveel verdienen freelance schrijvers gemiddeld?' : 'How much do freelance writers earn on average?',
 acceptedAnswer: {
 '@type': 'Answer',
 text: locale === 'nl'
 ? 'Gemiddelde tarieven variëren per platform: Upwork €0,05-0,30 per woord, Fiverr €15-100 per artikel, Contently €0,25-1,00 per woord voor enterprise content.'
 : 'Average rates vary per platform: Upwork €0.05-0.30 per word, Fiverr €15-100 per article, Contently €0.25-1.00 per word for enterprise content.',
 },
 },
 ],
 };

 const breadcrumbSchema = {
 '@context': 'https://schema.org',
 '@type': 'BreadcrumbList',
 itemListElement: [
 {
 '@type': 'ListItem',
 position: 1,
 name: 'Home',
 item: `${siteUrl}/${locale}`,
 },
 {
 '@type': 'ListItem',
 position: 2,
 name: locale === 'nl' ? 'Gids' : 'Guide',
 item: `${siteUrl}/${locale}/gids`,
 },
 {
 '@type': 'ListItem',
 position: 3,
 name: locale === 'nl' ? 'Platform Vergelijkingen' : 'Platform Comparisons',
 item: `${siteUrl}/${locale}/gids/platform-vergelijkingen`,
 },
 {
 '@type': 'ListItem',
 position: 4,
 name: locale === 'nl' ? 'Beste Platform Schrijvers' : 'Best Platform Writers',
 item: `${siteUrl}/${locale}/gids/platform-vergelijkingen/beste-platform-schrijvers`,
 },
 ],
 };

 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
 <Header />
 <main className="flex-1">
 <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 sm:py-16">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto">
 <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white sm:text-5xl mb-6">
 {locale === 'nl'
 ? 'Beste Freelance Platform voor Schrijvers in 2026'
 : 'Best Freelance Platform for Writers in 2026'}
 </h1>
 <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
 {locale === 'nl'
 ? 'De 5 beste platforms voor freelance schrijvers vergeleken: tarieven, klantenkwaliteit en waar je als content creator het meeste verdient.'
 : 'The 5 best platforms for freelance writers compared: rates, client quality and where you earn the most as a content creator.'}
 </p>
 <div className="flex flex-col sm:flex-row gap-4">
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center justify-center rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-3 text-white font-heading font-semibold shadow-lg transition-colors"
 >
 {locale === 'nl' ? 'Bekijk Alle Platforms' : 'View All Platforms'}
 </Link>
 </div>
 </div>
 </div>
 </section>

 <article className="py-12 bg-white dark:bg-gray-800">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto">

 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
 {locale === 'nl' ? (
 <>
 Als freelance schrijver heb je de keuze uit <strong>tientallen platforms</strong>. Maar welke bieden de beste tarieven? Waar vind je kwalitatieve klanten? En op welk platform kun je het snelste groeien?
 </>
 ) : (
 <>
 As a freelance writer you have a choice of <strong>dozens of platforms</strong>. But which offer the best rates? Where do you find quality clients? And on which platform can you grow the fastest?
 </>
 )}
 </p>
 <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
 {locale === 'nl'
 ? 'We vergelijken de top 5 platforms voor content creators: van budget-vriendelijke opties tot premium netwerken voor ervaren schrijvers.'
 : 'We compare the top 5 platforms for content creators: from budget-friendly options to premium networks for experienced writers.'}
 </p>
 </div>

 <div className="mb-12">
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6">
 {locale === 'nl' ? 'Top 5 Platforms voor Schrijvers' : 'Top 5 Platforms for Writers'}
 </h2>
 <div className="space-y-6">

 <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border-l-4 border-[#ef2b70]">
 <div className="flex items-start justify-between mb-4">
 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
 1. Upwork
 </h3>
 <span className="bg-[#ef2b70] text-white px-3 py-1 rounded-full text-sm font-semibold">
 {locale === 'nl' ? 'Meest Populair' : 'Most Popular'}
 </span>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 {locale === 'nl'
 ? 'Het grootste freelance platform met miljoenen schrijfopdrachten. Ideaal voor beginners tot experts met tarieven van €0,05-0,30 per woord.'
 : 'The largest freelance platform with millions of writing jobs. Ideal for beginners to experts with rates of €0.05-0.30 per word.'}
 </p>
 <div className="grid md:grid-cols-3 gap-4 text-sm">
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Tarieven' : 'Rates'}</p>
 <p className="text-gray-600 dark:text-gray-400">€20-100/uur</p>
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Commissie' : 'Fee'}</p>
 <p className="text-gray-600 dark:text-gray-400">5-20%</p>
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Beste voor' : 'Best for'}</p>
 <p className="text-gray-600 dark:text-gray-400">{locale === 'nl' ? 'Alle niveaus' : 'All levels'}</p>
 </div>
 </div>
 </div>

 <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border-l-4 border-[#22c55e]">
 <div className="flex items-start justify-between mb-4">
 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
 2. Fiverr
 </h3>
 <span className="bg-[#22c55e] text-white px-3 py-1 rounded-full text-sm font-semibold">
 {locale === 'nl' ? 'Beste voor Beginners' : 'Best for Beginners'}
 </span>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 {locale === 'nl'
 ? 'Gig-gebaseerd platform waar je diensten aanbiedt. Start direct met blogartikelen, SEO content of ghostwriting voor vaste prijzen.'
 : 'Gig-based platform where you offer services. Start immediately with blog articles, SEO content or ghostwriting for fixed prices.'}
 </p>
 <div className="grid md:grid-cols-3 gap-4 text-sm">
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Tarieven' : 'Rates'}</p>
 <p className="text-gray-600 dark:text-gray-400">€15-100/artikel</p>
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Commissie' : 'Fee'}</p>
 <p className="text-gray-600 dark:text-gray-400">20%</p>
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Beste voor' : 'Best for'}</p>
 <p className="text-gray-600 dark:text-gray-400">{locale === 'nl' ? 'Snelle opdrachten' : 'Quick jobs'}</p>
 </div>
 </div>
 </div>

 <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
 <div className="flex items-start justify-between mb-4">
 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
 3. Contently
 </h3>
 <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
 {locale === 'nl' ? 'Premium' : 'Premium'}
 </span>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 {locale === 'nl'
 ? 'Premium platform voor enterprise content marketing. Werk met grote merken zoals Coca-Cola en Microsoft aan hoogwaardige content.'
 : 'Premium platform for enterprise content marketing. Work with major brands like Coca-Cola and Microsoft on high-quality content.'}
 </p>
 <div className="grid md:grid-cols-3 gap-4 text-sm">
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Tarieven' : 'Rates'}</p>
 <p className="text-gray-600 dark:text-gray-400">€0,25-1,00/woord</p>
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Commissie' : 'Fee'}</p>
 <p className="text-gray-600 dark:text-gray-400">Variabel</p>
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Beste voor' : 'Best for'}</p>
 <p className="text-gray-600 dark:text-gray-400">{locale === 'nl' ? 'Experts' : 'Experts'}</p>
 </div>
 </div>
 </div>

 <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 4. Scripted
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 {locale === 'nl'
 ? 'Gespecialiseerd in blog content, whitepapers en case studies. Klanten vinden jou op basis van expertise en niche.'
 : 'Specialized in blog content, whitepapers and case studies. Clients find you based on expertise and niche.'}
 </p>
 <div className="grid md:grid-cols-3 gap-4 text-sm">
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Tarieven' : 'Rates'}</p>
 <p className="text-gray-600 dark:text-gray-400">€0,10-0,40/woord</p>
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Commissie' : 'Fee'}</p>
 <p className="text-gray-600 dark:text-gray-400">30-50%</p>
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Beste voor' : 'Best for'}</p>
 <p className="text-gray-600 dark:text-gray-400">{locale === 'nl' ? 'Niche experts' : 'Niche experts'}</p>
 </div>
 </div>
 </div>

 <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 5. iWriter
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 {locale === 'nl'
 ? 'Budget platform met veel volume. Ideaal om te starten en snel een portfolio op te bouwen met honderden artikelen.'
 : 'Budget platform with high volume. Ideal to start and quickly build a portfolio with hundreds of articles.'}
 </p>
 <div className="grid md:grid-cols-3 gap-4 text-sm">
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Tarieven' : 'Rates'}</p>
 <p className="text-gray-600 dark:text-gray-400">€0,01-0,08/woord</p>
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Commissie' : 'Fee'}</p>
 <p className="text-gray-600 dark:text-gray-400">35%</p>
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Beste voor' : 'Best for'}</p>
 <p className="text-gray-600 dark:text-gray-400">{locale === 'nl' ? 'Portfolio building' : 'Portfolio building'}</p>
 </div>
 </div>
 </div>

 </div>
 </div>

 <div className="bg-gradient-to-r from-[#ef2b70]/10 to-[#22c55e]/10 rounded-lg p-8 border-l-4 border-[#ef2b70] mb-12">
 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {locale === 'nl' ? ' Wil je Meer Platforms Vergelijken?' : ' Want to Compare More Platforms?'}
 </h3>
 <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
 {locale === 'nl'
 ? 'Ontdek alle freelance platforms en vind het perfecte match voor jouw schrijfstijl en niche.'
 : 'Discover all freelance platforms and find the perfect match for your writing style and niche.'}
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center justify-center rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-3 text-white font-heading font-semibold shadow-lg transition-colors"
 >
 {locale === 'nl' ? 'Bekijk Alle Platforms' : 'View All Platforms'}
 </Link>
 </div>

 <div className="space-y-12">
 <div>
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {locale === 'nl' ? ' Tariefvergelijking: Wat kun je Verdienen?' : ' Rate Comparison: What Can You Earn?'}
 </h2>
 <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
 {locale === 'nl'
 ? 'De tarieven variëren enorm per platform en je ervaringsniveau. Hier is een realistisch overzicht van wat je kunt verdienen:'
 : 'Rates vary enormously per platform and your experience level. Here\'s a realistic overview of what you can earn:'}
 </p>

 <div className="overflow-x-auto rounded-lg shadow-lg">
 <table className="w-full border-collapse bg-white dark:bg-gray-900">
 <thead>
 <tr className="bg-gray-100 dark:bg-gray-800">
 <th className="px-6 py-4 text-left font-heading font-semibold text-gray-900 dark:text-white border-b-2">
 {locale === 'nl' ? 'Platform' : 'Platform'}
 </th>
 <th className="px-6 py-4 text-left font-heading font-semibold text-gray-900 dark:text-white border-b-2">
 {locale === 'nl' ? 'Beginner' : 'Beginner'}
 </th>
 <th className="px-6 py-4 text-left font-heading font-semibold text-gray-900 dark:text-white border-b-2">
 {locale === 'nl' ? 'Gevorderd' : 'Intermediate'}
 </th>
 <th className="px-6 py-4 text-left font-heading font-semibold text-gray-900 dark:text-white border-b-2">
 {locale === 'nl' ? 'Expert' : 'Expert'}
 </th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
 <tr>
 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Upwork</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€0,05/woord</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€0,15/woord</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€0,30+/woord</td>
 </tr>
 <tr className="bg-gray-50 dark:bg-gray-800/50">
 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Fiverr</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€15/artikel</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€50/artikel</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€100+/artikel</td>
 </tr>
 <tr>
 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Contently</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">-</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€0,40/woord</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€1,00+/woord</td>
 </tr>
 <tr className="bg-gray-50 dark:bg-gray-800/50">
 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">iWriter</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€0,01/woord</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€0,04/woord</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€0,08/woord</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 <div>
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {locale === 'nl' ? ' Welk Platform Kies je als Schrijver?' : ' Which Platform Should You Choose as a Writer?'}
 </h2>

 <div className="space-y-6">
 <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border-l-4 border-green-500">
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
 {locale === 'nl' ? ' Beginnende schrijver? Start hier:' : ' Beginning writer? Start here:'}
 </h3>
 <ul className="space-y-2 text-gray-700 dark:text-gray-300">
 <li><strong>Stap 1:</strong>{locale === 'nl' ? 'Fiverr - Bouw portfolio met 10-20 artikelen' : 'Fiverr - Build portfolio with 10-20 articles'}</li>
 <li><strong>Stap 2:</strong>{locale === 'nl' ? 'Upwork - Solliciteer naar betere projecten' : 'Upwork - Apply for better projects'}</li>
 <li><strong>Stap 3:</strong>{locale === 'nl' ? 'Verhoog tarieven naar €0,10-0,15/woord' : 'Increase rates to €0.10-0.15/word'}</li>
 </ul>
 </div>

 <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border-l-4 border-purple-500">
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
 {locale === 'nl' ? ' Ervaren schrijver? Ga premium:' : ' Experienced writer? Go premium:'}
 </h3>
 <ul className="space-y-2 text-gray-700 dark:text-gray-300">
 <li>✓ <strong>Contently</strong>- {locale === 'nl' ? 'Voor enterprise content marketing' : 'For enterprise content marketing'}</li>
 <li>✓ <strong>Scripted</strong>- {locale === 'nl' ? 'Specialiseer in jouw niche' : 'Specialize in your niche'}</li>
 <li>✓ <strong>Upwork</strong>- {locale === 'nl' ? 'Direct contact met klanten' : 'Direct contact with clients'}</li>
 </ul>
 </div>
 </div>
 </div>

 </div>

 <div className="mt-16 bg-[#1e1541] text-white rounded-lg p-8 sm:p-12 text-center">
 <h2 className="text-3xl font-heading font-bold mb-4">
 {locale === 'nl' ? 'Start je Schrijfcarrière' : 'Start Your Writing Career'}
 </h2>
 <p className="text-xl text-gray-200 mb-8">
 {locale === 'nl'
 ? 'Ontdek alle platforms en kies het beste voor jouw schrijfstijl en ervaring.'
 : 'Discover all platforms and choose the best for your writing style and experience.'}
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center justify-center rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-colors"
 >
 {locale === 'nl' ? 'Bekijk Alle Platforms' : 'View All Platforms'}
 </Link>
 </div>

 <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {locale === 'nl' ? 'Meer Platform Vergelijkingen:' : 'More Platform Comparisons:'}
 </h3>
 <div className="grid sm:grid-cols-2 gap-4">
 <Link href={`/${locale}/gids/platform-vergelijkingen/beste-platform-designers`} className="text-[#ef2b70] hover:text-[#d91a5f] font-medium">
 → {locale === 'nl' ? 'Beste Platform voor Designers' : 'Best Platform for Designers'}
 </Link>
 <Link href={`/${locale}/gids/platform-vergelijkingen/upwork-vs-fiverr`} className="text-[#ef2b70] hover:text-[#d91a5f] font-medium">
 → {locale === 'nl' ? 'Upwork vs Fiverr' : 'Upwork vs Fiverr'}
 </Link>
 <Link href={`/${locale}/gids/platform-vergelijkingen/toptal-vs-upwork`} className="text-[#ef2b70] hover:text-[#d91a5f] font-medium">
 → {locale === 'nl' ? 'Toptal vs Upwork' : 'Toptal vs Upwork'}
 </Link>
 <Link href={`/${locale}/gids/platform-vergelijkingen/freelancer-vs-guru`} className="text-[#ef2b70] hover:text-[#d91a5f] font-medium">
 → {locale === 'nl' ? 'Freelancer.com vs Guru' : 'Freelancer.com vs Guru'}
 </Link>
 </div>
 </div>

 </div>
 </div>
 </article>
 </main>
 <Footer />
 </>
 );
}
