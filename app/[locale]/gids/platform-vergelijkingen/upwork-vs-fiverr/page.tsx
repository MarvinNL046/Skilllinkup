import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata>{
 const { locale } = await params;
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/platform-vergelijkingen/upwork-vs-fiverr`;

 const title = locale === 'nl'
 ? 'Upwork vs Fiverr: Welk Platform is Beter in 2026?'
 : 'Upwork vs Fiverr: Which Platform is Better in 2026?';

 const description = locale === 'nl'
 ? 'Vergelijk Upwork en Fiverr op commissie, klanten, verdiensten en gebruiksgemak. Ontdek welk freelance platform het beste bij jouw vaardigheden past.'
 : 'Compare Upwork and Fiverr on fees, clients, earnings and ease of use. Discover which freelance platform suits your skills best.';

 return {
 title,
 description,
 keywords: locale === 'nl'
 ? 'upwork vs fiverr, upwork of fiverr, freelance platform vergelijken, beste freelance platform, upwork commissie, fiverr commissie'
 : 'upwork vs fiverr, upwork or fiverr, compare freelance platforms, best freelance platform, upwork fees, fiverr fees',
 alternates: {
 canonical: pageUrl,
 languages: {
 'en': `${siteUrl}/en/gids/platform-vergelijkingen/upwork-vs-fiverr`,
 'nl': `${siteUrl}/nl/gids/platform-vergelijkingen/upwork-vs-fiverr`,
 },
 },
 openGraph: {
 title,
 description,
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{
 url: `${siteUrl}/images/og/upwork-vs-fiverr.png`,
 width: 1200,
 height: 630,
 alt: title,
 }],
 locale: locale === 'nl' ? 'nl_NL' : 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title,
 description,
 images: [`${siteUrl}/images/og/upwork-vs-fiverr.png`],
 },
 robots: {
 index: true,
 follow: true,
 },
 };
}

export default async function UpworkVsFiverrPage({ params }: PageProps) {
 const { locale } = await params;
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

 const faqSchema = {
 '@context': 'https://schema.org',
 '@type': 'FAQPage',
 mainEntity: [
 {
 '@type': 'Question',
 name: locale === 'nl' ? 'Is Upwork of Fiverr beter voor beginners?' : 'Is Upwork or Fiverr better for beginners?',
 acceptedAnswer: {
 '@type': 'Answer',
 text: locale === 'nl'
 ? 'Fiverr is over het algemeen beter voor beginners omdat je direct met gigs kunt starten zonder sollicitatieproces. Upwork vereist meer investering in profielopbouw en proposals, maar biedt hogere verdiensten op langere termijn.'
 : 'Fiverr is generally better for beginners as you can start with gigs immediately without an application process. Upwork requires more investment in profile building and proposals, but offers higher earnings in the long run.',
 },
 },
 {
 '@type': 'Question',
 name: locale === 'nl' ? 'Welk platform heeft lagere commissies?' : 'Which platform has lower fees?',
 acceptedAnswer: {
 '@type': 'Answer',
 text: locale === 'nl'
 ? 'Upwork heeft een schuivende schaal van 5-20% afhankelijk van je totale verdiensten per klant. Fiverr rekent een vaste 20% commissie. Voor langetermijnklanten is Upwork goedkoper, voor eenmalige opdrachten is het verschil minimaal.'
 : 'Upwork has a sliding scale of 5-20% depending on your total lifetime billings with each client. Fiverr charges a flat 20% fee. For long-term clients, Upwork is cheaper; for one-time projects, the difference is minimal.',
 },
 },
 {
 '@type': 'Question',
 name: locale === 'nl' ? 'Kan ik op beide platforms tegelijk werken?' : 'Can I work on both platforms simultaneously?',
 acceptedAnswer: {
 '@type': 'Answer',
 text: locale === 'nl'
 ? 'Ja, je kunt op beide platforms tegelijk actief zijn. Veel freelancers gebruiken Fiverr voor snelle gigs en Upwork voor grotere projecten. Zorg wel dat je beide profielen professioneel onderhoudt.'
 : 'Yes, you can be active on both platforms simultaneously. Many freelancers use Fiverr for quick gigs and Upwork for larger projects. Just make sure to maintain both profiles professionally.',
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
 name: 'Upwork vs Fiverr',
 item: `${siteUrl}/${locale}/gids/platform-vergelijkingen/upwork-vs-fiverr`,
 },
 ],
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
 />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
 />
 
 <main className="flex-1">
 {/* Hero Section */}
 <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 sm:py-16">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto">
 <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white sm:text-5xl mb-6">
 {locale === 'nl'
 ? 'Upwork vs Fiverr: Welk Platform is Beter in 2026?'
 : 'Upwork vs Fiverr: Which Platform is Better in 2026?'}
 </h1>
 <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
 {locale === 'nl'
 ? 'De twee grootste freelance platforms vergeleken: commissies, klantenkwaliteit, verdiensten en gebruiksgemak. Ontdek welke het beste bij jou past.'
 : 'The two largest freelance platforms compared: fees, client quality, earnings and ease of use. Discover which one suits you best.'}
 </p>

 {/* CTA #1 - Primary */}
 <div className="flex flex-col sm:flex-row gap-4 mb-8">
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center justify-center rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-3 text-white font-heading font-semibold shadow-lg transition-colors"
 >
 {locale === 'nl' ? 'Bekijk Alle Platforms' : 'View All Platforms'}
 </Link>
 <Link
 href={`/${locale}/gids/platform-vergelijkingen/toptal-vs-upwork`}
 className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-gray-50 border-2 border-gray-300 px-8 py-3 text-[#1e1541] font-heading font-semibold shadow transition-colors"
 >
 {locale === 'nl' ? 'Volgende Vergelijking →' : 'Next Comparison →'}
 </Link>
 </div>
 </div>
 </div>
 </section>

 {/* Main Content */}
 <article className="py-12 bg-white dark:bg-gray-800">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto">

 {/* Introduction */}
 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
 {locale === 'nl' ? (
 <>
 Je wilt starten als freelancer, maar je twijfelt: <strong>Upwork of Fiverr?</strong>Het is de vraag die elke startende freelancer zich stelt. Beide platforms hebben miljoenen gebruikers, maar ze werken compleet anders.
 </>
 ) : (
 <>
 You want to start as a freelancer, but you're wondering: <strong>Upwork or Fiverr?</strong>It's the question every starting freelancer asks themselves. Both platforms have millions of users, but they work completely differently.
 </>
 )}
 </p>
 <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
 {locale === 'nl'
 ? 'Upwork draait om solliciteren naar projecten en langdurige klantrelaties. Fiverr daarentegen is gebaseerd op gigs die je aanbiedt - klanten komen naar jou toe. Welk model past beter bij jouw werkstijl?'
 : 'Upwork revolves around applying for projects and long-term client relationships. Fiverr, on the other hand, is based on gigs you offer - clients come to you. Which model fits your work style better?'}
 </p>
 </div>

 {/* Comparison Table */}
 <div className="mb-12">
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6">
 {locale === 'nl' ? 'De Belangrijkste Verschillen in één Oogopslag' : 'Key Differences at a Glance'}
 </h2>
 <div className="overflow-x-auto rounded-lg shadow-lg">
 <table className="w-full border-collapse bg-white dark:bg-gray-900">
 <thead>
 <tr className="bg-gray-100 dark:bg-gray-800">
 <th className="px-6 py-4 text-left font-heading font-semibold text-gray-900 dark:text-white border-b-2 border-gray-200 dark:border-gray-700">
 {locale === 'nl' ? 'Criterium' : 'Criteria'}
 </th>
 <th className="px-6 py-4 text-left font-heading font-semibold text-[#ef2b70] border-b-2 border-gray-200 dark:border-gray-700">
 Upwork
 </th>
 <th className="px-6 py-4 text-left font-heading font-semibold text-[#22c55e] border-b-2 border-gray-200 dark:border-gray-700">
 Fiverr
 </th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
 <tr>
 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
 {locale === 'nl' ? 'Commissie' : 'Fee'}
 </td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
 5-20% {locale === 'nl' ? '(schaalbaar)' : '(sliding scale)'}
 </td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
 20% {locale === 'nl' ? '(vast)' : '(flat)'}
 </td>
 </tr>
 <tr className="bg-gray-50 dark:bg-gray-800/50">
 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
 {locale === 'nl' ? 'Werkwijze' : 'Work Method'}
 </td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
 {locale === 'nl' ? 'Solliciteren naar projecten' : 'Apply for projects'}
 </td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
 {locale === 'nl' ? 'Gigs aanbieden' : 'Offer gigs'}
 </td>
 </tr>
 <tr>
 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
 {locale === 'nl' ? 'Beste voor' : 'Best for'}
 </td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
 {locale === 'nl' ? 'Langdurige projecten' : 'Long-term projects'}
 </td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
 {locale === 'nl' ? 'Snelle gigs' : 'Quick gigs'}
 </td>
 </tr>
 <tr className="bg-gray-50 dark:bg-gray-800/50">
 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
 {locale === 'nl' ? 'Gemiddeld uurloon' : 'Average Hourly Rate'}
 </td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
 €25-75/uur
 </td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
 €15-40/uur
 </td>
 </tr>
 <tr>
 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
 {locale === 'nl' ? 'Moeilijkheidsgraad start' : 'Difficulty Level'}
 </td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
 {locale === 'nl' ? 'Gemiddeld' : 'Medium'}
 </td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
 {locale === 'nl' ? 'Makkelijk' : 'Easy'}
 </td>
 </tr>
 <tr className="bg-gray-50 dark:bg-gray-800/50">
 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
 {locale === 'nl' ? 'Connects/credits' : 'Connects/credits'}
 </td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
 {locale === 'nl' ? 'Connects nodig (€0,15/stuk)' : 'Connects required (€0.15 each)'}
 </td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
 {locale === 'nl' ? 'Geen extra kosten' : 'No extra costs'}
 </td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 {/* Detailed Comparison Sections */}
 <div className="space-y-12">

 {/* Section 1: Fees */}
 <div>
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {locale === 'nl' ? ' Commissies: Waar Betaal je Voor?' : ' Fees: What Are You Paying For?'}
 </h2>
 <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
 {locale === 'nl' ? (
 <>
 <strong>Upwork</strong>hanteert een schuivende schaal die afhangt van je <em>lifetime billings</em>met elke klant:
 </>
 ) : (
 <>
 <strong>Upwork</strong>uses a sliding scale based on your <em>lifetime billings</em>with each client:
 </>
 )}
 </p>
 <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4 ml-4">
 <li>0-€500: <strong>20%</strong>{locale === 'nl' ? 'commissie' : 'fee'}</li>
 <li>€500-€10.000: <strong>10%</strong>{locale === 'nl' ? 'commissie' : 'fee'}</li>
 <li>€10.000+: <strong>5%</strong>{locale === 'nl' ? 'commissie' : 'fee'}</li>
 </ul>
 <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
 {locale === 'nl'
 ? 'Dit betekent: hoe langer je met dezelfde klant werkt, hoe minder commissie je betaalt. Voor freelancers die langdurige relaties opbouwen, kan dit op termijn duizenden euro\'s schelen.'
 : 'This means: the longer you work with the same client, the less commission you pay. For freelancers building long-term relationships, this can save thousands of euros over time.'}
 </p>
 <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
 {locale === 'nl' ? (
 <>
 <strong>Fiverr</strong>daarentegen rekent altijd <strong>20% commissie</strong>, ongeacht hoeveel je verdient. Simpel en voorspelbaar, maar niet voordelig voor terugkerende klanten.
 </>
 ) : (
 <>
 <strong>Fiverr</strong>on the other hand always charges <strong>20% commission</strong>, regardless of how much you earn. Simple and predictable, but not beneficial for returning clients.
 </>
 )}
 </p>
 </div>

 {/* Section 2: Client Quality */}
 <div>
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {locale === 'nl' ? ' Klantenkwaliteit: Wie Vind je Waar?' : ' Client Quality: Who Do You Find Where?'}
 </h2>
 <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
 {locale === 'nl'
 ? 'Dit is waar het verschil enorm wordt. Upwork trekt over het algemeen serieuze bedrijven aan met grotere budgetten. Je vindt er startups, scale-ups en zelfs Fortune 500-bedrijven.'
 : "This is where the difference becomes huge. Upwork generally attracts serious businesses with larger budgets. You'll find startups, scale-ups and even Fortune 500 companies."}
 </p>
 <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
 {locale === 'nl'
 ? 'Fiverr heeft veel particulieren en kleine bedrijven die op zoek zijn naar betaalbare diensten. Denk aan logo\'s voor €25, blogartikelen voor €50, of Instagram posts voor €15.'
 : 'Fiverr has many individuals and small businesses looking for affordable services. Think logos for €25, blog articles for €50, or Instagram posts for €15.'}
 </p>
 <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
 {locale === 'nl'
 ? ' <strong>Welk platform kies je?</strong>Als je premium diensten levert en hogere tarieven wilt, kies dan Upwork. Wil je snel starten met kleinere opdrachten? Fiverr is ideaal.'
 : ' <strong>Which platform do you choose?</strong>If you deliver premium services and want higher rates, choose Upwork. Want to start quickly with smaller assignments? Fiverr is ideal.'}
 </p>
 </div>

 {/* CTA #2 - Mid-content */}
 <div className="bg-gradient-to-r from-[#ef2b70]/10 to-[#22c55e]/10 rounded-lg p-8 border-l-4 border-[#ef2b70]">
 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {locale === 'nl' ? ' Klaar om te Starten?' : ' Ready to Start?'}
 </h3>
 <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
 {locale === 'nl'
 ? 'Vergelijk alle freelance platforms en vind het perfecte match voor jouw vaardigheden en doelen.'
 : 'Compare all freelance platforms and find the perfect match for your skills and goals.'}
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center justify-center rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-3 text-white font-heading font-semibold shadow-lg transition-colors"
 >
 {locale === 'nl' ? 'Vergelijk Alle Platforms' : 'Compare All Platforms'}
 </Link>
 </div>

 {/* Section 3: Ease of Use */}
 <div>
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {locale === 'nl' ? ' Gebruiksgemak: Welk Platform is Makkelijker?' : ' Ease of Use: Which Platform is Easier?'}
 </h2>
 <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
 {locale === 'nl'
 ? 'Fiverr wint hier met overmacht. Je maakt een profiel, creëert een paar gigs, en klanten kunnen direct bestellen. Geen sollicitaties, geen proposals schrijven - gewoon publiceren en wachten.'
 : 'Fiverr wins here by a landslide. You create a profile, create a few gigs, and clients can order directly. No applications, no writing proposals - just publish and wait.'}
 </p>
 <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
 {locale === 'nl'
 ? 'Upwork vereist meer werk vooraf. Je moet een sterk profiel bouwen, met elke sollicitatie een custom proposal schrijven (kost 1-6 Connects per sollicitatie), en concurreren met honderden andere freelancers.'
 : 'Upwork requires more upfront work. You need to build a strong profile, write a custom proposal with each application (costs 1-6 Connects per application), and compete with hundreds of other freelancers.'}
 </p>
 <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 rounded-r-lg">
 <p className="text-gray-800 dark:text-gray-200">
 <strong>Pro tip:</strong>{locale === 'nl'
 ? 'Veel freelancers starten op Fiverr om ervaring op te bouwen en eerste reviews te krijgen, en schakelen daarna over naar Upwork voor hogere tarieven.'
 : 'Many freelancers start on Fiverr to build experience and get first reviews, then switch to Upwork for higher rates.'}
 </p>
 </div>
 </div>

 {/* Section 4: Earnings Potential */}
 <div>
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {locale === 'nl' ? ' Verdienpotentieel: Waar Verdien je Meer?' : ' Earnings Potential: Where Do You Earn More?'}
 </h2>
 <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
 {locale === 'nl'
 ? 'De cijfers liegen niet: gemiddelde uurlonen op Upwork liggen significant hoger. Denk aan €25-75 per uur voor middelmatige tot gevorderde freelancers, versus €15-40 per uur op Fiverr.'
 : 'The numbers don\'t lie: average hourly wages on Upwork are significantly higher. Think €25-75 per hour for intermediate to advanced freelancers, versus €15-40 per hour on Fiverr.'}
 </p>
 <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
 {locale === 'nl'
 ? 'Maar vergeet niet: op Fiverr kun je sneller aan opdrachten komen. Als je 10 kleine opdrachten per week doet à €30, verdien je evenveel als met 2 grote Upwork-projecten van €150.'
 : 'But don\'t forget: on Fiverr you can get assignments faster. If you do 10 small assignments per week at €30, you earn as much as with 2 large Upwork projects of €150.'}
 </p>
 <div className="grid md:grid-cols-2 gap-6">
 <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border-t-4 border-[#ef2b70]">
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
 {locale === 'nl' ? 'Upwork Verdiensten' : 'Upwork Earnings'}
 </h3>
 <ul className="space-y-2 text-gray-700 dark:text-gray-300">
 <li>✅ {locale === 'nl' ? 'Hogere uurlonen' : 'Higher hourly rates'}</li>
 <li>✅ {locale === 'nl' ? 'Langdurige contracten' : 'Long-term contracts'}</li>
 <li>✅ {locale === 'nl' ? 'Dalende commissies' : 'Declining fees'}</li>
 <li>❌ {locale === 'nl' ? 'Meer concurrentie' : 'More competition'}</li>
 </ul>
 </div>
 <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border-t-4 border-[#22c55e]">
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
 {locale === 'nl' ? 'Fiverr Verdiensten' : 'Fiverr Earnings'}
 </h3>
 <ul className="space-y-2 text-gray-700 dark:text-gray-300">
 <li>✅ {locale === 'nl' ? 'Snelle opdrachten' : 'Quick assignments'}</li>
 <li>✅ {locale === 'nl' ? 'Passieve sales' : 'Passive sales'}</li>
 <li>✅ {locale === 'nl' ? 'Volume compensatie' : 'Volume compensation'}</li>
 <li>❌ {locale === 'nl' ? 'Lagere tarieven' : 'Lower rates'}</li>
 </ul>
 </div>
 </div>
 </div>

 {/* Section 5: Which to Choose */}
 <div>
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {locale === 'nl' ? ' Welk Platform Past bij Jou?' : ' Which Platform Suits You?'}
 </h2>
 <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
 {locale === 'nl'
 ? 'De keuze hangt volledig af van je doelen, vaardigheden en werkstijl. Hier is een simpele beslisboom:'
 : 'The choice depends entirely on your goals, skills and work style. Here\'s a simple decision tree:'}
 </p>

 <div className="space-y-6">
 <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-500">
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
 {locale === 'nl' ? ' Kies Upwork als je:' : ' Choose Upwork if you:'}
 </h3>
 <ul className="space-y-2 text-gray-700 dark:text-gray-300">
 <li>✓ {locale === 'nl' ? 'Hogere uurlonen wilt (€40+)' : 'Want higher hourly rates (€40+)'}</li>
 <li>✓ {locale === 'nl' ? 'Langdurige klantrelaties prefereert' : 'Prefer long-term client relationships'}</li>
 <li>✓ {locale === 'nl' ? 'Complexe projecten aankan' : 'Can handle complex projects'}</li>
 <li>✓ {locale === 'nl' ? 'Tijd wilt investeren in proposals' : 'Want to invest time in proposals'}</li>
 <li>✓ {locale === 'nl' ? 'Aantoonbare expertise hebt' : 'Have demonstrable expertise'}</li>
 </ul>
 </div>

 <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border-l-4 border-green-500">
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
 {locale === 'nl' ? ' Kies Fiverr als je:' : ' Choose Fiverr if you:'}
 </h3>
 <ul className="space-y-2 text-gray-700 dark:text-gray-300">
 <li>✓ {locale === 'nl' ? 'Snel wilt starten zonder gedoe' : 'Want to start quickly without hassle'}</li>
 <li>✓ {locale === 'nl' ? 'Standaard diensten aanbiedt' : 'Offer standard services'}</li>
 <li>✓ {locale === 'nl' ? 'Volume boven premium zet' : 'Prioritize volume over premium'}</li>
 <li>✓ {locale === 'nl' ? 'Passieve sales wilt opbouwen' : 'Want to build passive sales'}</li>
 <li>✓ {locale === 'nl' ? 'Beginnend freelancer bent' : 'Are a beginning freelancer'}</li>
 </ul>
 </div>
 </div>
 </div>

 {/* FAQ Section */}
 <div>
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6">
 {locale === 'nl' ? ' Veelgestelde Vragen' : ' Frequently Asked Questions'}
 </h2>
 <div className="space-y-6">
 <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
 <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-3">
 {locale === 'nl' ? 'Is Upwork of Fiverr beter voor beginners?' : 'Is Upwork or Fiverr better for beginners?'}
 </h3>
 <p className="text-gray-700 dark:text-gray-300">
 {locale === 'nl'
 ? 'Fiverr is over het algemeen beter voor beginners omdat je direct met gigs kunt starten zonder sollicitatieproces. Upwork vereist meer investering in profielopbouw en proposals, maar biedt hogere verdiensten op langere termijn.'
 : 'Fiverr is generally better for beginners as you can start with gigs immediately without an application process. Upwork requires more investment in profile building and proposals, but offers higher earnings in the long run.'}
 </p>
 </div>

 <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
 <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-3">
 {locale === 'nl' ? 'Welk platform heeft lagere commissies?' : 'Which platform has lower fees?'}
 </h3>
 <p className="text-gray-700 dark:text-gray-300">
 {locale === 'nl'
 ? 'Upwork heeft een schuivende schaal van 5-20% afhankelijk van je totale verdiensten per klant. Fiverr rekent een vaste 20% commissie. Voor langetermijnklanten is Upwork goedkoper, voor eenmalige opdrachten is het verschil minimaal.'
 : 'Upwork has a sliding scale of 5-20% depending on your total lifetime billings with each client. Fiverr charges a flat 20% fee. For long-term clients, Upwork is cheaper; for one-time projects, the difference is minimal.'}
 </p>
 </div>

 <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
 <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-3">
 {locale === 'nl' ? 'Kan ik op beide platforms tegelijk werken?' : 'Can I work on both platforms simultaneously?'}
 </h3>
 <p className="text-gray-700 dark:text-gray-300">
 {locale === 'nl'
 ? 'Ja, je kunt op beide platforms tegelijk actief zijn. Veel freelancers gebruiken Fiverr voor snelle gigs en Upwork voor grotere projecten. Zorg wel dat je beide profielen professioneel onderhoudt.'
 : 'Yes, you can be active on both platforms simultaneously. Many freelancers use Fiverr for quick gigs and Upwork for larger projects. Just make sure to maintain both profiles professionally.'}
 </p>
 </div>
 </div>
 </div>

 </div>

 {/* CTA #3 - Bottom */}
 <div className="mt-16 bg-[#1e1541] text-white rounded-lg p-8 sm:p-12 text-center">
 <h2 className="text-3xl font-heading font-bold mb-4">
 {locale === 'nl' ? 'Klaar om te Starten?' : 'Ready to Start?'}
 </h2>
 <p className="text-xl text-gray-200 mb-8">
 {locale === 'nl'
 ? 'Ontdek alle freelance platforms en vind het perfecte match voor jouw vaardigheden.'
 : 'Discover all freelance platforms and find the perfect match for your skills.'}
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center justify-center rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-colors"
 >
 {locale === 'nl' ? 'Bekijk Alle Platforms' : 'View All Platforms'}
 </Link>
 <Link
 href={`/${locale}/gids/platform-vergelijkingen/toptal-vs-upwork`}
 className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#1e1541] font-heading font-semibold shadow-lg transition-colors"
 >
 {locale === 'nl' ? 'Volgende Vergelijking' : 'Next Comparison'}
 </Link>
 </div>
 </div>

 {/* Internal Links */}
 <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {locale === 'nl' ? 'Meer Platform Vergelijkingen:' : 'More Platform Comparisons:'}
 </h3>
 <div className="grid sm:grid-cols-2 gap-4">
 <Link
 href={`/${locale}/gids/platform-vergelijkingen/toptal-vs-upwork`}
 className="text-[#ef2b70] hover:text-[#d91a5f] font-medium"
 >
 → {locale === 'nl' ? 'Toptal vs Upwork: Premium vs Mainstream' : 'Toptal vs Upwork: Premium vs Mainstream'}
 </Link>
 <Link
 href={`/${locale}/gids/platform-vergelijkingen/beste-platform-schrijvers`}
 className="text-[#ef2b70] hover:text-[#d91a5f] font-medium"
 >
 → {locale === 'nl' ? 'Beste Platform voor Schrijvers' : 'Best Platform for Writers'}
 </Link>
 <Link
 href={`/${locale}/gids/platform-vergelijkingen/freelancer-vs-guru`}
 className="text-[#ef2b70] hover:text-[#d91a5f] font-medium"
 >
 → {locale === 'nl' ? 'Freelancer.com vs Guru' : 'Freelancer.com vs Guru'}
 </Link>
 <Link
 href={`/${locale}/gids/platform-vergelijkingen/beste-platform-designers`}
 className="text-[#ef2b70] hover:text-[#d91a5f] font-medium"
 >
 → {locale === 'nl' ? 'Beste Platform voor Designers' : 'Best Platform for Designers'}
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
