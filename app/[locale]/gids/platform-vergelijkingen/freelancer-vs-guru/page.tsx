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
 const pageUrl = `${siteUrl}/${locale}/gids/platform-vergelijkingen/freelancer-vs-guru`;

 const title = locale === 'nl'
 ? 'Freelancer.com vs Guru: Budget Platforms Vergeleken 2026'
 : 'Freelancer.com vs Guru: Budget Platforms Compared 2026';

 const description = locale === 'nl'
 ? 'Vergelijk Freelancer.com en Guru op prijs, gebruiksgemak en klantenkwaliteit. Welk budget platform past het beste bij jou?'
 : 'Compare Freelancer.com and Guru on price, ease of use and client quality. Which budget platform suits you best?';

 return {
 title,
 description,
 keywords: locale === 'nl'
 ? 'freelancer.com vs guru, freelancer of guru, goedkope freelance platforms, budget platforms vergelijken'
 : 'freelancer.com vs guru, freelancer or guru, cheap freelance platforms, compare budget platforms',
 alternates: {
 canonical: pageUrl,
 languages: {
 'en': `${siteUrl}/en/gids/platform-vergelijkingen/freelancer-vs-guru`,
 'nl': `${siteUrl}/nl/gids/platform-vergelijkingen/freelancer-vs-guru`,
 },
 },
 openGraph: {
 title,
 description,
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{
 url: `${siteUrl}/images/og/freelancer-vs-guru.png`,
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

export default async function FreelancerVsGuruPage({ params }: PageProps) {
 const { locale } = await params;
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

 const faqSchema = {
 '@context': 'https://schema.org',
 '@type': 'FAQPage',
 mainEntity: [
 {
 '@type': 'Question',
 name: locale === 'nl' ? 'Welk platform heeft lagere commissies?' : 'Which platform has lower fees?',
 acceptedAnswer: {
 '@type': 'Answer',
 text: locale === 'nl'
 ? 'Guru heeft lagere commissies met een schuivende schaal van 5-9%, terwijl Freelancer.com 10% of een vaste $3 per project rekent. Voor grotere projecten is Guru dus goedkoper.'
 : 'Guru has lower fees with a sliding scale of 5-9%, while Freelancer.com charges 10% or a fixed $3 per project. For larger projects, Guru is cheaper.',
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
 name: 'Freelancer.com vs Guru',
 item: `${siteUrl}/${locale}/gids/platform-vergelijkingen/freelancer-vs-guru`,
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
 ? 'Freelancer.com vs Guru: Budget Platforms Vergeleken'
 : 'Freelancer.com vs Guru: Budget Platforms Compared'}
 </h1>
 <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
 {locale === 'nl'
 ? 'Twee budget-vriendelijke platforms naast elkaar: welke biedt de beste waarde voor freelancers die net starten?'
 : 'Two budget-friendly platforms side by side: which offers the best value for freelancers just starting out?'}
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
 Als je op zoek bent naar <strong>betaalbare freelance platforms</strong>, kom je al snel uit bij Freelancer.com en Guru. Beide platforms richten zich op het budgetsegment met lagere commissies en toegankelijke entry-barriers.
 </>
 ) : (
 <>
 If you're looking for <strong>affordable freelance platforms</strong>, you'll quickly end up at Freelancer.com and Guru. Both platforms target the budget segment with lower fees and accessible entry barriers.
 </>
 )}
 </p>
 <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
 {locale === 'nl'
 ? 'Maar welke van de twee is beter? We vergelijken commissies, gebruiksgemak, klantenkwaliteit en verdienpotentieel.'
 : 'But which of the two is better? We compare fees, ease of use, client quality and earning potential.'}
 </p>
 </div>

 <div className="mb-12">
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6">
 {locale === 'nl' ? 'Vergelijkingstabel' : 'Comparison Table'}
 </h2>
 <div className="overflow-x-auto rounded-lg shadow-lg">
 <table className="w-full border-collapse bg-white dark:bg-gray-900">
 <thead>
 <tr className="bg-gray-100 dark:bg-gray-800">
 <th className="px-6 py-4 text-left font-heading font-semibold text-gray-900 dark:text-white border-b-2 border-gray-200 dark:border-gray-700">
 {locale === 'nl' ? 'Criterium' : 'Criteria'}
 </th>
 <th className="px-6 py-4 text-left font-heading font-semibold text-[#ef2b70] border-b-2 border-gray-200 dark:border-gray-700">
 Freelancer.com
 </th>
 <th className="px-6 py-4 text-left font-heading font-semibold text-[#22c55e] border-b-2 border-gray-200 dark:border-gray-700">
 Guru
 </th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
 <tr>
 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Commissie' : 'Fee'}</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">10% of $3 {locale === 'nl' ? 'vast' : 'flat'}</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">5-9% {locale === 'nl' ? '(schaalbaar)' : '(sliding scale)'}</td>
 </tr>
 <tr className="bg-gray-50 dark:bg-gray-800/50">
 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Gebruikers' : 'Users'}</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">50M+ {locale === 'nl' ? 'gebruikers' : 'users'}</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">3M+ {locale === 'nl' ? 'gebruikers' : 'users'}</td>
 </tr>
 <tr>
 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Gemiddeld uurloon' : 'Average Rate'}</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€15-50/uur</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">€20-60/uur</td>
 </tr>
 <tr className="bg-gray-50 dark:bg-gray-800/50">
 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'Beste voor' : 'Best for'}</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{locale === 'nl' ? 'Contestwedstrijden' : 'Contests'}</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{locale === 'nl' ? 'Langdurige relaties' : 'Long-term relationships'}</td>
 </tr>
 <tr>
 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{locale === 'nl' ? 'SafePay/Escrow' : 'SafePay/Escrow'}</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">✅ {locale === 'nl' ? 'Milestone payments' : 'Milestone payments'}</td>
 <td className="px-6 py-4 text-gray-700 dark:text-gray-300">✅ SafePay</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 <div className="space-y-12">
 <div>
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {locale === 'nl' ? ' Commissies: Waar Bespaar je Meer?' : ' Fees: Where Do You Save More?'}
 </h2>
 <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
 {locale === 'nl'
 ? 'Freelancer.com rekent 10% commissie of een vaste $3 - welke van de twee het laagste is. Voor kleine opdrachten van $30 betaal je dus $3, voor grote projecten van $5000 betaal je $500.'
 : 'Freelancer.com charges 10% commission or a fixed $3 - whichever is lower. So for small jobs of $30 you pay $3, for large projects of $5000 you pay $500.'}
 </p>
 <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
 {locale === 'nl'
 ? 'Guru hanteert een schuivende schaal: 5% voor hun Elite-lidmaatschap, 9% voor gratis accounts. Dat maakt Guru goedkoper voor grotere projecten, zeker als je investeert in een betaald lidmaatschap.'
 : 'Guru uses a sliding scale: 5% for their Elite membership, 9% for free accounts. This makes Guru cheaper for larger projects, especially if you invest in a paid membership.'}
 </p>
 </div>

 <div className="bg-gradient-to-r from-[#ef2b70]/10 to-[#22c55e]/10 rounded-lg p-8 border-l-4 border-[#ef2b70]">
 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {locale === 'nl' ? ' Ontdek Meer Platforms' : ' Discover More Platforms'}
 </h3>
 <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
 {locale === 'nl'
 ? 'Vergelijk alle freelance platforms en vind het beste voor jouw budget en doelen.'
 : 'Compare all freelance platforms and find the best for your budget and goals.'}
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center justify-center rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-3 text-white font-heading font-semibold shadow-lg transition-colors"
 >
 {locale === 'nl' ? 'Vergelijk Platforms' : 'Compare Platforms'}
 </Link>
 </div>

 <div>
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {locale === 'nl' ? ' Unique Features' : ' Unique Features'}
 </h2>
 <div className="grid md:grid-cols-2 gap-6">
 <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border-t-4 border-[#ef2b70]">
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
 Freelancer.com
 </h3>
 <ul className="space-y-2 text-gray-700 dark:text-gray-300">
 <li>✅ {locale === 'nl' ? 'Contests voor design/logo' : 'Contests for design/logos'}</li>
 <li>✅ {locale === 'nl' ? 'Grootste gebruikersbasis' : 'Largest user base'}</li>
 <li>✅ {locale === 'nl' ? 'Mobiele app' : 'Mobile app'}</li>
 <li>❌ {locale === 'nl' ? 'Veel concurrentie' : 'High competition'}</li>
 </ul>
 </div>
 <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border-t-4 border-[#22c55e]">
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
 Guru
 </h3>
 <ul className="space-y-2 text-gray-700 dark:text-gray-300">
 <li>✅ {locale === 'nl' ? 'SafePay betalingsbescherming' : 'SafePay payment protection'}</li>
 <li>✅ {locale === 'nl' ? 'Lagere commissies' : 'Lower fees'}</li>
 <li>✅ {locale === 'nl' ? 'Betere klantenkwaliteit' : 'Better client quality'}</li>
 <li>❌ {locale === 'nl' ? 'Kleinere marktplaats' : 'Smaller marketplace'}</li>
 </ul>
 </div>
 </div>
 </div>

 <div>
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {locale === 'nl' ? ' Welk Platform Kies je?' : ' Which Platform Should You Choose?'}
 </h2>
 <div className="space-y-6">
 <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-500">
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
 {locale === 'nl' ? ' Kies Freelancer.com als je:' : ' Choose Freelancer.com if you:'}
 </h3>
 <ul className="space-y-2 text-gray-700 dark:text-gray-300">
 <li>✓ {locale === 'nl' ? 'Veel kleine opdrachten wilt' : 'Want many small jobs'}</li>
 <li>✓ {locale === 'nl' ? 'Contests/wedstrijden leuk vindt' : 'Enjoy contests/competitions'}</li>
 <li>✓ {locale === 'nl' ? 'Toegang tot grootste markt wilt' : 'Want access to largest market'}</li>
 <li>✓ {locale === 'nl' ? 'Design/creatief werk doet' : 'Do design/creative work'}</li>
 </ul>
 </div>

 <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border-l-4 border-green-500">
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
 {locale === 'nl' ? ' Kies Guru als je:' : ' Choose Guru if you:'}
 </h3>
 <ul className="space-y-2 text-gray-700 dark:text-gray-300">
 <li>✓ {locale === 'nl' ? 'Lagere commissies wilt (5-9%)' : 'Want lower fees (5-9%)'}</li>
 <li>✓ {locale === 'nl' ? 'Langdurige klantrelaties zoekt' : 'Seek long-term client relationships'}</li>
 <li>✓ {locale === 'nl' ? 'Professionelere klanten prefereert' : 'Prefer more professional clients'}</li>
 <li>✓ {locale === 'nl' ? 'Betere betalingsbescherming wilt' : 'Want better payment protection'}</li>
 </ul>
 </div>
 </div>
 </div>

 </div>

 <div className="mt-16 bg-[#1e1541] text-white rounded-lg p-8 sm:p-12 text-center">
 <h2 className="text-3xl font-heading font-bold mb-4">
 {locale === 'nl' ? 'Klaar om te Kiezen?' : 'Ready to Choose?'}
 </h2>
 <p className="text-xl text-gray-200 mb-8">
 {locale === 'nl'
 ? 'Bekijk alle freelance platforms en maak een geïnformeerde keuze.'
 : 'View all freelance platforms and make an informed choice.'}
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
 <Link href={`/${locale}/gids/platform-vergelijkingen/upwork-vs-fiverr`} className="text-[#ef2b70] hover:text-[#d91a5f] font-medium">
 → {locale === 'nl' ? 'Upwork vs Fiverr' : 'Upwork vs Fiverr'}
 </Link>
 <Link href={`/${locale}/gids/platform-vergelijkingen/toptal-vs-upwork`} className="text-[#ef2b70] hover:text-[#d91a5f] font-medium">
 → {locale === 'nl' ? 'Toptal vs Upwork' : 'Toptal vs Upwork'}
 </Link>
 <Link href={`/${locale}/gids/platform-vergelijkingen/beste-platform-schrijvers`} className="text-[#ef2b70] hover:text-[#d91a5f] font-medium">
 → {locale === 'nl' ? 'Beste Platform voor Schrijvers' : 'Best Platform for Writers'}
 </Link>
 <Link href={`/${locale}/gids/platform-vergelijkingen/beste-platform-designers`} className="text-[#ef2b70] hover:text-[#d91a5f] font-medium">
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
