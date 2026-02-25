import { Metadata } from 'next';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata>{
 const { locale } = await params;
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/platform-vergelijkingen/beste-platform-designers`;

 const title = locale === 'nl'
 ? 'Beste Freelance Platform voor Designers & Creatives 2026'
 : 'Best Freelance Platform for Designers & Creatives 2026';

 const description = locale === 'nl'
 ? 'Ontdek de 5 beste platforms voor freelance designers: 99designs, Dribbble, Behance, Upwork en Fiverr. Vergelijk tarieven en portfoliomogelijkheden.'
 : 'Discover the 5 best platforms for freelance designers: 99designs, Dribbble, Behance, Upwork and Fiverr. Compare rates and portfolio opportunities.';

 return {
 title,
 description,
 keywords: locale === 'nl'
 ? 'beste platform designers, freelance design, grafisch ontwerp platforms, 99designs, dribbble designers'
 : 'best platform designers, freelance design, graphic design platforms, 99designs, dribbble designers',
 alternates: {
 canonical: pageUrl,
 languages: {
 'en': `${siteUrl}/en/gids/platform-vergelijkingen/beste-platform-designers`,
 'nl': `${siteUrl}/nl/gids/platform-vergelijkingen/beste-platform-designers`,
 },
 },
 openGraph: {
 title,
 description,
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{
 url: `${siteUrl}/images/og/beste-platform-designers.png`,
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

export default async function BestePlatformDesignersPage({ params }: PageProps) {
 const { locale } = await params;
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

 const faqSchema = {
 '@context': 'https://schema.org',
 '@type': 'FAQPage',
 mainEntity: [
 {
 '@type': 'Question',
 name: locale === 'nl' ? 'Wat is het beste platform voor beginnende designers?' : 'What is the best platform for beginning designers?',
 acceptedAnswer: {
 '@type': 'Answer',
 text: locale === 'nl'
 ? 'Fiverr is ideaal voor beginners omdat je direct gigs kunt aanbieden. Start met logo designs voor €25-50 en bouw je portfolio op. Combineer met Behance voor portfolio exposure.'
 : 'Fiverr is ideal for beginners because you can offer gigs directly. Start with logo designs for €25-50 and build your portfolio. Combine with Behance for portfolio exposure.',
 },
 },
 {
 '@type': 'Question',
 name: locale === 'nl' ? 'Hoeveel verdienen freelance designers gemiddeld?' : 'How much do freelance designers earn on average?',
 acceptedAnswer: {
 '@type': 'Answer',
 text: locale === 'nl'
 ? 'Gemiddelde tarieven variëren: beginners €25-50 per logo, gevorderden €50-150 per uur, experts €150-300 per uur. Op premium platforms zoals Dribbble Pro verdienen designers €100-500 per uur.'
 : 'Average rates vary: beginners €25-50 per logo, intermediates €50-150 per hour, experts €150-300 per hour. On premium platforms like Dribbble Pro, designers earn €100-500 per hour.',
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
 name: locale === 'nl' ? 'Beste Platform Designers' : 'Best Platform Designers',
 item: `${siteUrl}/${locale}/gids/platform-vergelijkingen/beste-platform-designers`,
 },
 ],
 };

 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
 
 <main className="flex-1">
 <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 sm:py-16">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto">
 <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white sm:text-5xl mb-6">
 {locale === 'nl'
 ? 'Beste Freelance Platform voor Designers in 2026'
 : 'Best Freelance Platform for Designers in 2026'}
 </h1>
 <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
 {locale === 'nl'
 ? 'De 5 beste platforms voor freelance designers vergeleken: van portfolio-platforms tot design contests en directe klantprojecten.'
 : 'The 5 best platforms for freelance designers compared: from portfolio platforms to design contests and direct client projects.'}
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
 Als freelance designer heb je unieke behoeften: je wilt je <strong>portfolio laten zien</strong>, kwalitatieve klanten vinden, en <strong>eerlijk betaald</strong>worden voor je creativiteit. Maar welk platform biedt de beste combinatie?
 </>
 ) : (
 <>
 As a freelance designer you have unique needs: you want to <strong>showcase your portfolio</strong>, find quality clients, and be <strong>fairly paid</strong>for your creativity. But which platform offers the best combination?
 </>
 )}
 </p>
 <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
 {locale === 'nl'
 ? 'We vergelijken de top 5 platforms voor designers: van contest-gebaseerde platforms tot premium netwerken voor UX/UI experts.'
 : 'We compare the top 5 platforms for designers: from contest-based platforms to premium networks for UX/UI experts.'}
 </p>
 </div>

 <div className="mb-12">
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6">
 {locale === 'nl' ? 'Top 5 Platforms voor Designers' : 'Top 5 Platforms for Designers'}
 </h2>
 <div className="space-y-6">

 <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border-l-4 border-[#ef2b70]">
 <div className="flex items-start justify-between mb-4">
 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
 1. 99designs
 </h3>
 <span className="bg-[#ef2b70] text-white px-3 py-1 rounded-full text-sm font-semibold">
 {locale === 'nl' ? 'Beste voor Contests' : 'Best for Contests'}
 </span>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 {locale === 'nl'
 ? 'Gespecialiseerd in design contests. Klanten lanceren wedstrijden, designers dienen ontwerpen in, winnaar krijgt betaald. Perfect voor logo\'s, branding en packaging.'
 : 'Specialized in design contests. Clients launch competitions, designers submit designs, winner gets paid. Perfect for logos, branding and packaging.'}
 </p>
 <div className="grid md:grid-cols-3 gap-4 text-sm">
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Tarieven' : 'Rates'}</p>
 <p className="text-gray-600 dark:text-gray-400">€200-2000/contest</p>
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Commissie' : 'Fee'}</p>
 <p className="text-gray-600 dark:text-gray-400">Variabel</p>
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Beste voor' : 'Best for'}</p>
 <p className="text-gray-600 dark:text-gray-400">{locale === 'nl' ? 'Branding, logo\'s' : 'Branding, logos'}</p>
 </div>
 </div>
 </div>

 <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
 <div className="flex items-start justify-between mb-4">
 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
 2. Dribbble
 </h3>
 <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
 {locale === 'nl' ? 'Premium Network' : 'Premium Network'}
 </span>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 {locale === 'nl'
 ? 'De LinkedIn voor designers. Portfolio-first platform waar klanten jou vinden op basis van je werk. Dribbble Pro geeft toegang tot premium freelance opdrachten.'
 : 'The LinkedIn for designers. Portfolio-first platform where clients find you based on your work. Dribbble Pro gives access to premium freelance jobs.'}
 </p>
 <div className="grid md:grid-cols-3 gap-4 text-sm">
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Tarieven' : 'Rates'}</p>
 <p className="text-gray-600 dark:text-gray-400">€100-500/uur</p>
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Lidmaatschap' : 'Membership'}</p>
 <p className="text-gray-600 dark:text-gray-400">$12/maand</p>
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Beste voor' : 'Best for'}</p>
 <p className="text-gray-600 dark:text-gray-400">UI/UX, web design</p>
 </div>
 </div>
 </div>

 <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
 <div className="flex items-start justify-between mb-4">
 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
 3. Behance (Adobe)
 </h3>
 <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
 {locale === 'nl' ? 'Gratis Portfolio' : 'Free Portfolio'}
 </span>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 {locale === 'nl'
 ? 'Adobe\'s portfolio platform met miljoenen designers. Gratis exposure, geen commissies, maar wel minder directe opdrachten dan andere platforms.'
 : 'Adobe\'s portfolio platform with millions of designers. Free exposure, no commissions, but fewer direct jobs than other platforms.'}
 </p>
 <div className="grid md:grid-cols-3 gap-4 text-sm">
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Tarieven' : 'Rates'}</p>
 <p className="text-gray-600 dark:text-gray-400">Onderhandelen</p>
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Commissie' : 'Fee'}</p>
 <p className="text-gray-600 dark:text-gray-400">0% (gratis)</p>
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Beste voor' : 'Best for'}</p>
 <p className="text-gray-600 dark:text-gray-400">{locale === 'nl' ? 'Portfolio building' : 'Portfolio building'}</p>
 </div>
 </div>
 </div>

 <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border-l-4 border-[#22c55e]">
 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 4. Upwork
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 {locale === 'nl'
 ? 'Grootste freelance marktplaats met duizenden design opdrachten. Van logo\'s tot complexe UX/UI projecten. Veel concurrentie maar ook hoge tarieven mogelijk.'
 : 'Largest freelance marketplace with thousands of design jobs. From logos to complex UX/UI projects. High competition but also high rates possible.'}
 </p>
 <div className="grid md:grid-cols-3 gap-4 text-sm">
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Tarieven' : 'Rates'}</p>
 <p className="text-gray-600 dark:text-gray-400">€30-150/uur</p>
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

 <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 5. Fiverr
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 {locale === 'nl'
 ? 'Gig-gebaseerd platform met enorme vraag naar design. Start met logo\'s voor €25-50, schaal op naar full branding packages van €500+. Ideaal voor beginners.'
 : 'Gig-based platform with huge demand for design. Start with logos for €25-50, scale up to full branding packages of €500+. Ideal for beginners.'}
 </p>
 <div className="grid md:grid-cols-3 gap-4 text-sm">
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Tarieven' : 'Rates'}</p>
 <p className="text-gray-600 dark:text-gray-400">€25-500/gig</p>
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Commissie' : 'Fee'}</p>
 <p className="text-gray-600 dark:text-gray-400">20%</p>
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Beste voor' : 'Best for'}</p>
 <p className="text-gray-600 dark:text-gray-400">{locale === 'nl' ? 'Quick wins, beginners' : 'Quick wins, beginners'}</p>
 </div>
 </div>
 </div>

 </div>
 </div>

 <div className="bg-gradient-to-r from-[#ef2b70]/10 to-[#22c55e]/10 rounded-lg p-8 border-l-4 border-[#ef2b70] mb-12">
 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {locale === 'nl' ? ' Ontdek Meer Design Platforms' : ' Discover More Design Platforms'}
 </h3>
 <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
 {locale === 'nl'
 ? 'Vergelijk alle freelance platforms en vind het perfecte match voor jouw designstijl en specialisatie.'
 : 'Compare all freelance platforms and find the perfect match for your design style and specialization.'}
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
 {locale === 'nl' ? ' Tariefvergelijking per Designtype' : ' Rate Comparison per Design Type'}
 </h2>

 <div className="overflow-x-auto rounded-lg shadow-lg mb-8">
 <table className="w-full border-collapse bg-white dark:bg-gray-900">
 <thead>
 <tr className="bg-gray-100 dark:bg-gray-800">
 <th className="px-6 py-4 text-left font-heading font-semibold text-gray-900 dark:text-white border-b-2">
 {locale === 'nl' ? 'Designtype' : 'Design Type'}
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
 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Logo Design</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€25-75</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€150-500</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€1000-5000</td>
 </tr>
 <tr className="bg-gray-50 dark:bg-gray-800/50">
 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Web Design</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€500-1500</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€2000-5000</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€8000-20k</td>
 </tr>
 <tr>
 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">UI/UX Design</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€40-80/uur</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€100-200/uur</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€250-500/uur</td>
 </tr>
 <tr className="bg-gray-50 dark:bg-gray-800/50">
 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Branding Package</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€200-800</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€1500-5000</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€10k-50k</td>
 </tr>
 <tr>
 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Social Media Graphics</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€15-40/post</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€50-150/post</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€200-500/post</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 <div>
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {locale === 'nl' ? ' Welk Platform Kies je als Designer?' : ' Which Platform Should You Choose as a Designer?'}
 </h2>

 <div className="space-y-6">
 <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border-l-4 border-green-500">
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
 {locale === 'nl' ? ' Beginnend designer? Deze stappenplan:' : ' Beginning designer? This roadmap:'}
 </h3>
 <ol className="space-y-2 text-gray-700 dark:text-gray-300 list-decimal list-inside">
 <li><strong>Maand 1-2:</strong>{locale === 'nl' ? 'Behance portfolio opbouwen met 10-15 projecten' : 'Build Behance portfolio with 10-15 projects'}</li>
 <li><strong>Maand 2-3:</strong>{locale === 'nl' ? 'Fiverr gigs starten voor logo\'s en social media' : 'Start Fiverr gigs for logos and social media'}</li>
 <li><strong>Maand 4-6:</strong>{locale === 'nl' ? 'Upwork profiel met eerste reviews opbouwen' : 'Build Upwork profile with first reviews'}</li>
 <li><strong>Maand 6+:</strong>{locale === 'nl' ? 'Dribbble Pro + 99designs voor hogere tarieven' : 'Dribbble Pro + 99designs for higher rates'}</li>
 </ol>
 </div>

 <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border-l-4 border-purple-500">
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
 {locale === 'nl' ? ' Ervaren designer? Focus op premium:' : ' Experienced designer? Focus on premium:'}
 </h3>
 <ul className="space-y-2 text-gray-700 dark:text-gray-300">
 <li>✓ <strong>Dribbble Pro</strong>- {locale === 'nl' ? 'Beste klanten vinden jouw portfolio' : 'Best clients find your portfolio'}</li>
 <li>✓ <strong>99designs</strong>- {locale === 'nl' ? 'Win high-budget contests (€1000+)' : 'Win high-budget contests (€1000+)'}</li>
 <li>✓ <strong>Upwork</strong>- {locale === 'nl' ? 'Langdurige enterprise projecten' : 'Long-term enterprise projects'}</li>
 <li>✓ <strong>Behance</strong>- {locale === 'nl' ? 'Blijf portfolio updaten voor exposure' : 'Keep updating portfolio for exposure'}</li>
 </ul>
 </div>

 <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-500">
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
 {locale === 'nl' ? ' Pro tips voor designers:' : ' Pro tips for designers:'}
 </h3>
 <ul className="space-y-2 text-gray-700 dark:text-gray-300">
 <li>{locale === 'nl' ? 'Gebruik meerdere platforms tegelijk voor maximale exposure' : 'Use multiple platforms simultaneously for maximum exposure'}</li>
 <li>{locale === 'nl' ? 'Portfolio is belangrijker dan platformkeuze - investeer hier tijd in' : 'Portfolio is more important than platform choice - invest time here'}</li>
 <li>{locale === 'nl' ? 'Specialiseer in een niche (b.v. SaaS UI, e-commerce branding)' : 'Specialize in a niche (e.g. SaaS UI, e-commerce branding)'}</li>
 <li>{locale === 'nl' ? 'Verhoog tarieven elke 3-6 maanden op basis van reviews' : 'Increase rates every 3-6 months based on reviews'}</li>
 </ul>
 </div>
 </div>
 </div>

 <div>
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {locale === 'nl' ? ' Platform Rankings per Categorie' : ' Platform Rankings per Category'}
 </h2>

 <div className="grid md:grid-cols-2 gap-6">
 <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
 <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-3">
 {locale === 'nl' ? ' Beste Portfolio Platform' : ' Best Portfolio Platform'}
 </h3>
 <ol className="space-y-2 text-gray-700 dark:text-gray-300 list-decimal list-inside">
 <li>Behance (gratis, grootste bereik)</li>
 <li>Dribbble (premium network)</li>
 <li>Upwork (geïntegreerd met opdrachten)</li>
 </ol>
 </div>

 <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
 <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-3">
 {locale === 'nl' ? ' Hoogste Verdiensten' : ' Highest Earnings'}
 </h3>
 <ol className="space-y-2 text-gray-700 dark:text-gray-300 list-decimal list-inside">
 <li>Dribbble Pro (€100-500/uur)</li>
 <li>99designs (€1000+ contests)</li>
 <li>Upwork (€50-200/uur)</li>
 </ol>
 </div>

 <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
 <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-3">
 {locale === 'nl' ? ' Snelste Opdrachten' : ' Fastest Jobs'}
 </h3>
 <ol className="space-y-2 text-gray-700 dark:text-gray-300 list-decimal list-inside">
 <li>Fiverr (direct verkopen)</li>
 <li>99designs (contests wekelijks)</li>
 <li>Upwork (veel vraag)</li>
 </ol>
 </div>

 <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
 <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-3">
 {locale === 'nl' ? ' Beste Klantenkwaliteit' : ' Best Client Quality'}
 </h3>
 <ol className="space-y-2 text-gray-700 dark:text-gray-300 list-decimal list-inside">
 <li>Dribbble Pro (enterprise)</li>
 <li>99designs (serieuze budgetten)</li>
 <li>Upwork (gediversifieerd)</li>
 </ol>
 </div>
 </div>
 </div>

 </div>

 <div className="mt-16 bg-[#1e1541] text-white rounded-lg p-8 sm:p-12 text-center">
 <h2 className="text-3xl font-heading font-bold mb-4">
 {locale === 'nl' ? 'Start je Design Carrière' : 'Start Your Design Career'}
 </h2>
 <p className="text-xl text-gray-200 mb-8">
 {locale === 'nl'
 ? 'Ontdek alle platforms en bouw je freelance design business op de juiste fundering.'
 : 'Discover all platforms and build your freelance design business on the right foundation.'}
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
 <Link href={`/${locale}/gids/platform-vergelijkingen/beste-platform-schrijvers`} className="text-[#ef2b70] hover:text-[#d91a5f] font-medium">
 → {locale === 'nl' ? 'Beste Platform voor Schrijvers' : 'Best Platform for Writers'}
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
 
 </>
 );
}
