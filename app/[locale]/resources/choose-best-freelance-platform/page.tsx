import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }>}): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'choose-best-freelance-platform';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

 if (locale === 'nl') {
 return {
 title: 'Beste Freelance Platform Kiezen voor Jouw Ervaringsniveau',
 description: 'Leer hoe je het perfecte freelance platform kiest op basis van ervaring. Expert gids voor Upwork, Fiverr, Toptal en 25+ platformen voor beginners tot experts.',
 keywords: 'freelance platform kiezen, beste freelance site, Upwork vs Fiverr, platform selectie, beginner freelance platformen, expert freelance marktplaatsen',
 openGraph: {
 title: 'Beste Freelance Platform Kiezen voor Jouw Ervaringsniveau',
 description: 'Leer hoe je het perfecte freelance platform kiest op basis van ervaring. Expert gids voor 25+ platformen.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/resources-og.png`,
 width: 1200,
 height: 630,
 alt: 'Beste Freelance Platform Kiezen voor Jouw Ervaringsniveau',
 }
 ],
 locale: 'nl_NL',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Beste Freelance Platform Kiezen voor Jouw Ervaringsniveau',
 description: 'Leer hoe je het perfecte freelance platform kiest op basis van ervaring. Expert gids voor Upwork, Fiverr, Toptal en 25+ platformen voor beginners tot experts.',
 images: [`${siteUrl}/images/og/resources-og.png`],
 creator: '@SkillLinkup',
 site: '@SkillLinkup',
 },
 alternates: {
 canonical: pageUrl,
 languages: {
 'en': `${siteUrl}/en/resources/${slug}`,
 'nl': `${siteUrl}/nl/resources/${slug}`,
 },
 },
 robots: {
 index: true,
 follow: true,
 googleBot: {
 index: true,
 follow: true,
 'max-video-preview': -1,
 'max-image-preview': 'large',
 'max-snippet': -1,
 },
 },
 };
 }

 return {
 title: 'How to Choose the Best Freelance Platform for Your Skill Level',
 description: 'Learn how to choose the perfect freelance platform based on your experience. Expert guide comparing Upwork, Fiverr, Toptal & 25+ platforms for beginners to experts.',
 keywords: 'choose freelance platform, best freelance site, Upwork vs Fiverr, freelance platform selection, beginner freelance platforms, expert freelance marketplaces',
 openGraph: {
 title: 'How to Choose the Best Freelance Platform for Your Skill Level',
 description: 'Learn how to choose the perfect freelance platform based on your experience. Expert guide comparing Upwork, Fiverr, Toptal & 25+ platforms.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/resources-og.png`,
 width: 1200,
 height: 630,
 alt: 'How to Choose the Best Freelance Platform for Your Skill Level',
 }
 ],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'How to Choose the Best Freelance Platform for Your Skill Level',
 description: 'Learn how to choose the perfect freelance platform based on your experience. Expert guide comparing Upwork, Fiverr, Toptal & 25+ platforms for beginners to experts.',
 images: [`${siteUrl}/images/og/resources-og.png`],
 creator: '@SkillLinkup',
 site: '@SkillLinkup',
 },
 alternates: {
 canonical: pageUrl,
 languages: {
 'en': `${siteUrl}/en/resources/${slug}`,
 'nl': `${siteUrl}/nl/resources/${slug}`,
 },
 },
 robots: {
 index: true,
 follow: true,
 googleBot: {
 index: true,
 follow: true,
 'max-video-preview': -1,
 'max-image-preview': 'large',
 'max-snippet': -1,
 },
 },
 };
}

export default async function ChooseBestFreelancePlatform({ params }: { params: Promise<{ locale: string }>}) {
 const { locale } = await params;

 const content = locale === 'nl' ? {
 hero: {
 h1: 'Beste Freelance Platform Kiezen voor Jouw Ervaringsniveau',
 intro: 'Vind het perfecte freelance platform dat bij jouw ervaring, vaardigheden en inkomstensdoelen past in 2026',
 },
 jsonLd: {
 headline: 'Beste Freelance Platform Kiezen voor Jouw Ervaringsniveau',
 description: 'Uitgebreide gids om het juiste freelance platform te kiezen op basis van je ervaringsniveau, vaardigheden en carrièredoelen.',
 },
 intro: 'Het kiezen van het juiste freelance platform kan je freelance carrière maken of breken. Met meer dan 25 platformen beschikbaar in 2026, elk gericht op verschillende ervaringsniveaus en specialisaties, kan de beslissing overweldigend aanvoelen. Deze uitgebreide gids helpt je het perfecte platform te selecteren op basis van je huidige ervaringsniveau, ervaring en carrière-aspiraties.',
 cta1: {
 title: 'Klaar om Jouw Perfecte Platform te Vinden?',
 text: 'Vergelijk 25+ freelance platformen naast elkaar. Bekijk tarieven, betalingsvoorwaarden en gebruikersreviews op één plek.',
 button: 'Vergelijk Alle Platformen →',
 },
 sections: {
 levels: {
 title: 'Je Ervaringsniveau Begrijpen: Waar Sta Je?',
 beginner: {
 title: 'Beginner Niveau (0-2 Jaar Ervaring)',
 text: 'Als je net begint met je freelance reis, zit je in de beginnercategorie. Je hebt misschien basisvaardigheden maar beperkte professionele ervaring of portfoliowerk. In deze fase ben je gefocust op:',
 points: [
 'Je portfolio opbouwen met echte klantprojecten',
 'Geloofwaardigheid opbouwen door reviews en beoordelingen',
 'Leren hoe je effectief met klanten communiceert',
 'Projectprijzen en tijdsinschatting begrijpen',
 'Een professionele werkroutine ontwikkelen',
 ],
 platforms: 'Beste Platformen: Fiverr, Freelancer.nl, PeoplePerHour - Lage toegangsbarrières, geweldig voor het opdoen van ervaring',
 },
 intermediate: {
 title: 'Gemiddeld Niveau (2-5 Jaar Ervaring)',
 text: 'Je hebt een solide basis opgebouwd en hebt meerdere voltooide projecten op je naam staan. Je begrijpt klantbehoeften, kunt projecten nauwkeurig inschatten en hebt gespecialiseerde vaardigheden ontwikkeld. Jouw prioriteiten zijn:',
 points: [
 'Beter betalende klanten vinden die kwaliteit waarderen',
 'Specialiseren in specifieke niches of industrieën',
 'Langetermijnrelaties met klanten opbouwen',
 'Je uurtarief of projectkosten verhogen',
 'Meerdere projecten efficiënt beheren',
 ],
 platforms: 'Beste Platformen: Upwork, Guru, Freelancer.com (Pro tier) - Balans tussen kansen en kwaliteit klanten',
 },
 expert: {
 title: 'Expert Niveau (5+ Jaar Ervaring)',
 text: 'Je bent een doorgewinterde professional met diepe expertise in je vakgebied. Je hebt een indrukwekkend portfolio, testimonials en misschien branche-erkenning. Op dit niveau zoek je:',
 points: [
 'Premium klanten die bereid zijn top tarieven te betalen',
 'Complexe, uitdagende projecten die expertise tonen',
 'Strategische partnerschappen en terugkerende contracten',
 'Minimale platformkosten om inkomsten te maximaliseren',
 'Exclusieve toegang tot gescreende, hoogwaardige kansen',
 ],
 platforms: 'Beste Platformen: Toptal, Gun.io, Gigster - Rigoureuze screening, premium klanten, hoogste tarieven',
 },
 },
 factors: {
 title: 'Belangrijke Selectiefactoren Op Basis van Je Ervaringsniveau',
 table: {
 headers: ['Factor', 'Beginner', 'Gemiddeld', 'Expert'],
 rows: [
 ['Toegangsvereisten', 'Laag/Geen', 'Portfolio Review', 'Rigoureuze Screening'],
 ['Concurrentieniveau', 'Zeer Hoog', 'Gemiddeld', 'Laag'],
 ['Gemiddelde Projectwaarde', '€50-€500', '€500-€5.000', '€5.000+'],
 ['Platformkosten', '15-20%', '10-15%', '0-10%'],
 ['Klantkwaliteit', 'Gemengd', 'Goed', 'Uitstekend'],
 ],
 },
 },
 },
 cta2: {
 title: 'Bereken Je Ideale Freelance Tarief',
 text: 'Gebruik onze gratis calculator om het juiste uurtarief voor je ervaringsniveau en ervaring te bepalen.',
 button: 'Bereken Je Tarief →',
 },
 conclusion: {
 title: 'Conclusie: Je Platformkeuze Doet Ertoe',
 text: [
 'Het kiezen van het juiste freelance platform voor je ervaringsniveau gaat niet alleen over het vinden van werk—het gaat over jezelf positioneren voor langetermijnsucces. Het platform dat je kiest beïnvloedt de klanten die je aantrekt, de tarieven die je kunt vragen, en uiteindelijk de carrière die je zult volgen.',
 'Onthoud dat je "juiste" platform zal veranderen naarmate je groeit. Wat perfect werkt als beginner bij het opbouwen van portfoliostukken, zal beperkend aanvoelen zodra je diepe expertise hebt ontwikkeld en premium klanten wilt. Omarm deze evolutie en wees bereid om je platformstrategie elke 6-12 maanden opnieuw te evalueren.',
 'Het belangrijkste is om niet toe te staan dat analyseverlamming je ervan weerhoudt te beginnen. Kies 2-3 platformen die aansluiten bij je huidige ervaringsniveau, creëer uitstekende profielen en begin met solliciteren. Je leert meer van twee weken echte platformervaring dan van maanden onderzoek. Je freelance carrière begint met dat eerste project—dus kies je platform en ga aan de slag.',
 ],
 },
 related: {
 title: 'Ga Verder Met Je Platform Onderzoek',
 links: [
 {
 href: '/resources/beginner-vs-expert-platforms',
 title: 'Beginner vs. Expert Platformen Vergeleken',
 text: 'Gedetailleerde breakdown van platformverschillen per ervaringsniveau',
 },
 {
 href: '/resources/key-factors-choosing-freelance-marketplace',
 title: '5 Belangrijke Factoren om te Overwegen',
 text: 'Essentiële criteria voor platformselectie naast ervaringsniveau',
 },
 {
 href: '/platforms',
 title: 'Vergelijk Alle 25+ Platformen',
 text: 'Zij-aan-zij vergelijking van tarieven, functies en reviews',
 },
 {
 href: '/resources/platform-selection-quiz',
 title: 'Doe Onze Platform Quiz',
 text: 'Vind je perfecte platform match in 2 minuten',
 },
 ],
 },
 } : {
 hero: {
 h1: 'How to Choose the Best Freelance Platform for Your Skill Level',
 intro: 'Find the perfect freelance marketplace that matches your experience, skills, and income goals in 2026',
 },
 jsonLd: {
 headline: 'How to Choose the Best Freelance Platform for Your Skill Level',
 description: 'Comprehensive guide to choosing the right freelance platform based on your experience level, skills, and career goals.',
 },
 intro: 'Choosing the right freelance platform can make or break your freelancing career. With over 25 platforms available in 2026, each catering to different skill levels and specializations, the decision might feel overwhelming. This comprehensive guide will help you select the perfect platform based on your current skill level, experience, and career aspirations.',
 cta1: {
 title: 'Ready to Find Your Perfect Platform?',
 text: 'Compare 25+ freelance platforms side-by-side. See fees, payment terms, and user reviews all in one place.',
 button: 'Compare All Platforms →',
 },
 sections: {
 levels: {
 title: 'Understanding Your Skill Level: Where Do You Stand?',
 beginner: {
 title: 'Beginner Level (0-2 Years Experience)',
 text: 'If you\'re just starting your freelancing journey, you\'re in the beginner category. You might have foundational skills but limited professional experience or portfolio work. At this stage, you\'re focused on:',
 points: [
 'Building your portfolio with real client projects',
 'Establishing credibility through reviews and ratings',
 'Learning how to communicate with clients effectively',
 'Understanding project pricing and time estimation',
 'Developing a professional work routine',
 ],
 platforms: 'Best Platforms: Fiverr, Freelancer.com, PeoplePerHour - Low entry barriers, great for building experience',
 },
 intermediate: {
 title: 'Intermediate Level (2-5 Years Experience)',
 text: 'You\'ve built a solid foundation and have several completed projects under your belt. You understand client needs, can estimate projects accurately, and have developed specialized skills. Your priorities include:',
 points: [
 'Finding higher-paying clients who value quality',
 'Specializing in specific niches or industries',
 'Building long-term client relationships',
 'Increasing your hourly rate or project fees',
 'Managing multiple projects efficiently',
 ],
 platforms: 'Best Platforms: Upwork, Guru, Freelancer.com (Pro tier) - Balance of opportunity and quality clients',
 },
 expert: {
 title: 'Expert Level (5+ Years Experience)',
 text: 'You\'re a seasoned professional with deep expertise in your field. You have an impressive portfolio, testimonials, and perhaps industry recognition. At this level, you\'re seeking:',
 points: [
 'Premium clients willing to pay top-tier rates',
 'Complex, challenging projects that showcase expertise',
 'Strategic partnerships and recurring contracts',
 'Minimal platform fees to maximize earnings',
 'Exclusive access to vetted, high-quality opportunities',
 ],
 platforms: 'Best Platforms: Toptal, Gun.io, Gigster - Rigorous vetting, premium clients, highest rates',
 },
 },
 factors: {
 title: 'Key Selection Factors Based on Your Skill Level',
 table: {
 headers: ['Factor', 'Beginner', 'Intermediate', 'Expert'],
 rows: [
 ['Entry Requirements', 'Low/None', 'Portfolio Review', 'Rigorous Vetting'],
 ['Competition Level', 'Very High', 'Moderate', 'Low'],
 ['Average Project Value', '$50-$500', '$500-$5,000', '$5,000+'],
 ['Platform Fees', '15-20%', '10-15%', '0-10%'],
 ['Client Quality', 'Mixed', 'Good', 'Excellent'],
 ],
 },
 },
 },
 cta2: {
 title: 'Calculate Your Ideal Freelance Rate',
 text: 'Use our free calculator to determine the right hourly rate for your skill level and experience.',
 button: 'Calculate Your Rate →',
 },
 conclusion: {
 title: 'Conclusion: Your Platform Choice Matters',
 text: [
 'Choosing the right freelance platform for your skill level isn\'t just about finding work—it\'s about positioning yourself for long-term success. The platform you choose influences the clients you attract, the rates you can command, and ultimately the career trajectory you\'ll follow.',
 'Remember that your "right" platform will change as you grow. What works perfectly as a beginner building portfolio pieces will feel limiting once you\'ve developed deep expertise and want premium clients. Embrace this evolution and be willing to reassess your platform strategy every 6-12 months.',
 'Most importantly, don\'t let analysis paralysis prevent you from starting. Pick 2-3 platforms that align with your current skill level, create outstanding profiles, and start applying. You\'ll learn more from two weeks of actual platform experience than from months of research. Your freelancing career starts with that first project—so choose your platform and get to work.',
 ],
 },
 related: {
 title: 'Continue Your Platform Research',
 links: [
 {
 href: '/resources/beginner-vs-expert-platforms',
 title: 'Beginner vs. Expert Platforms Compared',
 text: 'Detailed breakdown of platform differences by experience level',
 },
 {
 href: '/resources/key-factors-choosing-freelance-marketplace',
 title: '5 Key Factors to Consider',
 text: 'Essential criteria for platform selection beyond skill level',
 },
 {
 href: '/platforms',
 title: 'Compare All 25+ Platforms',
 text: 'Side-by-side comparison of fees, features, and reviews',
 },
 {
 href: '/resources/platform-selection-quiz',
 title: 'Take Our Platform Quiz',
 text: 'Find your perfect platform match in 2 minutes',
 },
 ],
 },
 };

 const jsonLd = {
 '@context': 'https://schema.org',
 '@type': 'Article',
 headline: content.jsonLd.headline,
 description: content.jsonLd.description,
 author: {
 '@type': 'Organization',
 name: 'SkillLinkup',
 },
 publisher: {
 '@type': 'Organization',
 name: 'SkillLinkup',
 logo: {
 '@type': 'ImageObject',
 url: 'https://skilllinkup.com/images/logo/skilllinkup-transparant-rozepunt.webp',
 },
 },
 datePublished: '2026-01-15',
 dateModified: '2026-01-15',
 };

 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
 
 <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#1e1541] dark:to-gray-900">
 {/* Hero Section */}
 <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#ef2b70] to-[#1e1541] text-white">
 <div className="max-w-4xl mx-auto">
 <h1 className="text-4xl md:text-5xl font-bold mb-6 font-['Lexend']">
 {content.hero.h1}
 </h1>
 <p className="text-xl md:text-2xl text-gray-100 font-['Inter']">
 {content.hero.intro}
 </p>
 </div>
 </section>

 {/* Main Content */}
 <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
 {/* Introduction */}
 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
 {content.intro}
 </p>
 </div>

 {/* CTA 1 */}
 <div className="my-12 p-8 bg-gradient-to-r from-[#ef2b70]/10 to-[#1e1541]/10 dark:from-[#ef2b70]/20 dark:to-[#1e1541]/20 rounded-2xl border-2 border-[#ef2b70]/20">
 <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white font-['Lexend']">
 {content.cta1.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.cta1.text}
 </p>
 <Link
 href="/platforms"
 className="inline-block px-8 py-4 bg-[#ef2b70] hover:bg-[#d91f5e] text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
 >
 {content.cta1.button}
 </Link>
 </div>

 {/* Section 1: Understanding Your Skill Level */}
 <section className="mb-16">
 <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white font-['Lexend']">
 {content.sections.levels.title}
 </h2>

 <div className="space-y-8">
 <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
 <h3 className="text-2xl font-semibold mb-4 text-[#ef2b70] font-['Lexend']">
 {content.sections.levels.beginner.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 {content.sections.levels.beginner.text}
 </p>
 <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
 {content.sections.levels.beginner.points.map((point, i) =>(
 <li key={i}>{point}</li>
 ))}
 </ul>
 <div className="mt-4 p-4 bg-[#22c55e]/10 rounded-xl">
 <p className="text-sm font-semibold text-[#22c55e]">
 {content.sections.levels.beginner.platforms}
 </p>
 </div>
 </div>

 <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
 <h3 className="text-2xl font-semibold mb-4 text-[#ef2b70] font-['Lexend']">
 {content.sections.levels.intermediate.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 {content.sections.levels.intermediate.text}
 </p>
 <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
 {content.sections.levels.intermediate.points.map((point, i) =>(
 <li key={i}>{point}</li>
 ))}
 </ul>
 <div className="mt-4 p-4 bg-[#22c55e]/10 rounded-xl">
 <p className="text-sm font-semibold text-[#22c55e]">
 {content.sections.levels.intermediate.platforms}
 </p>
 </div>
 </div>

 <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
 <h3 className="text-2xl font-semibold mb-4 text-[#ef2b70] font-['Lexend']">
 {content.sections.levels.expert.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 {content.sections.levels.expert.text}
 </p>
 <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
 {content.sections.levels.expert.points.map((point, i) =>(
 <li key={i}>{point}</li>
 ))}
 </ul>
 <div className="mt-4 p-4 bg-[#22c55e]/10 rounded-xl">
 <p className="text-sm font-semibold text-[#22c55e]">
 {content.sections.levels.expert.platforms}
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* Section 2: Key Factors by Skill Level */}
 <section className="mb-16">
 <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white font-['Lexend']">
 {content.sections.factors.title}
 </h2>

 <div className="overflow-x-auto">
 <table className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
 <thead className="bg-gradient-to-r from-[#ef2b70] to-[#1e1541] text-white">
 <tr>
 {content.sections.factors.table.headers.map((header, i) =>(
 <th key={i} className="px-6 py-4 text-left">{header}</th>
 ))}
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
 {content.sections.factors.table.rows.map((row, i) =>(
 <tr key={i}>
 {row.map((cell, j) =>(
 <td key={j} className={`px-6 py-4 ${j === 0 ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
 {cell}
 </td>
 ))}
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </section>

 {/* CTA 2 */}
 <div className="my-12 p-8 bg-gradient-to-r from-[#22c55e]/10 to-[#1e1541]/10 dark:from-[#22c55e]/20 dark:to-[#1e1541]/20 rounded-2xl border-2 border-[#22c55e]/20">
 <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white font-['Lexend']">
 {content.cta2.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.cta2.text}
 </p>
 <Link
 href="/tools/rate-calculator"
 className="inline-block px-8 py-4 bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
 >
 {content.cta2.button}
 </Link>
 </div>

 {/* Conclusion */}
 <section className="mb-16">
 <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white font-['Lexend']">
 {content.conclusion.title}
 </h2>
 <div className="prose prose-lg dark:prose-invert max-w-none">
 {content.conclusion.text.map((paragraph, i) =>(
 <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
 {paragraph}
 </p>
 ))}
 </div>
 </section>

 {/* Related Links */}
 <section className="mt-16 p-8 bg-gray-100 dark:bg-gray-800 rounded-2xl">
 <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white font-['Lexend']">
 {content.related.title}
 </h3>
 <div className="grid md:grid-cols-2 gap-4">
 {content.related.links.map((link, i) =>(
 <Link key={i} href={link.href} className="p-4 bg-white dark:bg-gray-700 rounded-xl hover:shadow-lg transition-shadow">
 <h4 className="font-semibold text-[#ef2b70] mb-2">{link.title}</h4>
 <p className="text-sm text-gray-600 dark:text-gray-400">{link.text}</p>
 </Link>
 ))}
 </div>
 </section>
 </article>
 </main>
 
 </>
 );
}
