import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { readdirSync, existsSync } from "fs";
import { join } from "path";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Pillar configuration
const PILLARS: Record<string, {
 id: number;
 name: string;
 nameEn: string;
 icon: string;
 description: string;
 descriptionEn: string;
 color: string;
 gradient: string;
}>= {
 "platform-selectie": {
 id: 1,
 name: "Platform Selectie",
 nameEn: "Platform Selection",
 icon: "",
 description: "Vind het perfecte freelance platform voor jouw skills en doelen. Leer hoe je de juiste keuze maakt.",
 descriptionEn: "Find the perfect freelance platform for your skills and goals. Learn how to make the right choice.",
 color: "bg-pink-50 border-pink-200",
 gradient: "from-pink-500 to-rose-500",
 },
 "platform-reviews": {
 id: 2,
 name: "Platform Reviews",
 nameEn: "Platform Reviews",
 icon: "",
 description: "Diepgaande, eerlijke reviews van de populairste freelance platforms. Ontdek de voor- en nadelen.",
 descriptionEn: "In-depth, honest reviews of the most popular freelance platforms. Discover the pros and cons.",
 color: "bg-yellow-50 border-yellow-200",
 gradient: "from-yellow-500 to-orange-500",
 },
 "prijzen-verdienen": {
 id: 3,
 name: "Prijzen & Verdienen",
 nameEn: "Pricing & Earnings",
 icon: "",
 description: "Leer hoe je je tarieven bepaalt, meer verdient en slim omgaat met platformkosten.",
 descriptionEn: "Learn how to set your rates, earn more and smartly deal with platform fees.",
 color: "bg-green-50 border-green-200",
 gradient: "from-green-500 to-emerald-500",
 },
 "aan-de-slag": {
 id: 4,
 name: "Aan de Slag",
 nameEn: "Getting Started",
 icon: "",
 description: "Stap-voor-stap gidsen voor beginnende freelancers. Van je eerste profiel tot je eerste klant.",
 descriptionEn: "Step-by-step guides for beginner freelancers. From your first profile to your first client.",
 color: "bg-blue-50 border-blue-200",
 gradient: "from-blue-500 to-cyan-500",
 },
 "tools-productiviteit": {
 id: 5,
 name: "Tools & Productiviteit",
 nameEn: "Tools & Productivity",
 icon: "",
 description: "Essentiële tools en software om efficiënter te werken als freelancer.",
 descriptionEn: "Essential tools and software to work more efficiently as a freelancer.",
 color: "bg-purple-50 border-purple-200",
 gradient: "from-purple-500 to-violet-500",
 },
 "platform-vergelijkingen": {
 id: 6,
 name: "Platform Vergelijkingen",
 nameEn: "Platform Comparisons",
 icon: "",
 description: "Zij-aan-zij vergelijkingen van populaire platforms. Ontdek welke het beste bij jou past.",
 descriptionEn: "Side-by-side comparisons of popular platforms. Discover which one suits you best.",
 color: "bg-indigo-50 border-indigo-200",
 gradient: "from-indigo-500 to-blue-500",
 },
 "succes-strategieen": {
 id: 7,
 name: "Succes Strategieën",
 nameEn: "Success Strategies",
 icon: "",
 description: "Bewezen strategieën om te groeien, meer klanten te krijgen en succesvol te zijn.",
 descriptionEn: "Proven strategies to grow, get more clients and be successful.",
 color: "bg-orange-50 border-orange-200",
 gradient: "from-orange-500 to-red-500",
 },
 "niche-gidsen": {
 id: 8,
 name: "Niche Gidsen",
 nameEn: "Niche Guides",
 icon: "",
 description: "Specifieke gidsen voor jouw vakgebied: developers, designers, schrijvers en meer.",
 descriptionEn: "Specific guides for your field: developers, designers, writers and more.",
 color: "bg-teal-50 border-teal-200",
 gradient: "from-teal-500 to-green-500",
 },
 "zakelijk-beheer": {
 id: 9,
 name: "Zakelijk Beheer",
 nameEn: "Business Management",
 icon: "",
 description: "Alles over facturatie, belastingen, contracten en zakelijk beheer voor freelancers.",
 descriptionEn: "Everything about invoicing, taxes, contracts and business management for freelancers.",
 color: "bg-red-50 border-red-200",
 gradient: "from-red-500 to-pink-500",
 },
 "best-practices": {
 id: 10,
 name: "Best Practices",
 nameEn: "Best Practices",
 icon: "",
 description: "Tips, tricks en best practices van succesvolle freelancers.",
 descriptionEn: "Tips, tricks and best practices from successful freelancers.",
 color: "bg-cyan-50 border-cyan-200",
 gradient: "from-cyan-500 to-blue-500",
 },
};

// Get subpillars from filesystem
function getSubpillars(pillarSlug: string): string[] {
 try {
 const pillarPath = join(process.cwd(), 'app', '[locale]', 'gids', pillarSlug);
 if (!existsSync(pillarPath)) return [];

 return readdirSync(pillarPath, { withFileTypes: true })
 .filter(d =>d.isDirectory())
 .map(d =>d.name);
 } catch {
 return [];
 }
}

// Convert slug to readable title
function slugToTitle(slug: string): string {
 return slug
 .split('-')
 .map(word =>word.charAt(0).toUpperCase() + word.slice(1))
 .join(' ');
}

export async function generateMetadata({
 params,
}: {
 params: Promise<{ locale: string; pillar: string }>;
}): Promise<Metadata>{
 const { locale, pillar } = await params;
 const pillarData = PILLARS[pillar];

 if (!pillarData) {
 return { title: "Not Found" };
 }

 const isNL = locale === "nl";
 const name = isNL ? pillarData.name : pillarData.nameEn;
 const description = isNL ? pillarData.description : pillarData.descriptionEn;

 return {
 title: `${name} | Freelance Gidsen | SkillLinkup`,
 description,
 openGraph: {
 title: `${name} | SkillLinkup`,
 description,
 },
 };
}

export default async function PillarPage({
 params,
}: {
 params: Promise<{ locale: string; pillar: string }>;
}) {
 const { locale, pillar } = await params;
 const pillarData = PILLARS[pillar];

 if (!pillarData) {
 notFound();
 }

 const isNL = locale === "nl";
 const subpillars = getSubpillars(pillar);

 return (
 <>
 <Header />
 <main className="min-h-screen bg-background-light dark:bg-gray-900">
 {/* Hero Section */}
 <section className={`bg-gradient-to-r ${pillarData.gradient} py-16 sm:py-20`}>
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="mx-auto max-w-3xl text-center">
 <div className="mb-4 text-6xl">{pillarData.icon}</div>
 <h1 className="mb-6 text-4xl font-heading font-bold tracking-tight text-white sm:text-5xl">
 {isNL ? pillarData.name : pillarData.nameEn}
 </h1>
 <p className="text-lg text-white/90">
 {isNL ? pillarData.description : pillarData.descriptionEn}
 </p>
 </div>
 </div>
 </section>

 {/* Breadcrumb */}
 <div className="border-b border-background-gray dark:border-gray-800 bg-white dark:bg-gray-800">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
 <nav className="flex text-sm">
 <Link href={`/${locale}`} className="text-text-secondary hover:text-primary dark:text-gray-400">
 Home
 </Link>
 <span className="mx-2 text-text-muted dark:text-gray-500">/</span>
 <Link href={`/${locale}/gids`} className="text-text-secondary hover:text-primary dark:text-gray-400">
 {isNL ? "Gidsen" : "Guides"}
 </Link>
 <span className="mx-2 text-text-muted dark:text-gray-500">/</span>
 <span className="text-text-primary dark:text-white font-medium">
 {isNL ? pillarData.name : pillarData.nameEn}
 </span>
 </nav>
 </div>
 </div>

 {/* Subpillars List */}
 <section className="py-16">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <h2 className="mb-8 text-2xl font-heading font-bold text-text-primary dark:text-white">
 {isNL ? "Gidsen in deze categorie" : "Guides in this category"}
 </h2>

 {subpillars.length >0 ? (
 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
 {subpillars.map((subpillar) =>(
 <Link
 key={subpillar}
 href={`/${locale}/gids/${pillar}/${subpillar}`}
 className="group rounded-lg border border-background-gray dark:border-gray-700 bg-white dark:bg-gray-800 p-6 transition-all hover:shadow-lg hover:border-primary"
 >
 <h3 className="mb-2 font-heading font-bold text-text-primary dark:text-white group-hover:text-primary transition-colors">
 {slugToTitle(subpillar)}
 </h3>
 <div className="flex items-center text-sm text-primary">
 {isNL ? "Lees meer" : "Read more"}
 <svg
 className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
 fill="none"
 viewBox="0 0 24 24"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M9 5l7 7-7 7"
 />
 </svg>
 </div>
 </Link>
 ))}
 </div>
 ) : (
 <div className="rounded-lg border border-background-gray dark:border-gray-700 bg-white dark:bg-gray-800 p-8 text-center">
 <p className="text-text-secondary dark:text-gray-400">
 {isNL
 ? "Gidsen worden binnenkort toegevoegd. Kom snel terug!"
 : "Guides are being added soon. Check back later!"}
 </p>
 </div>
 )}
 </div>
 </section>

 {/* CTA Section */}
 <section className="bg-secondary py-16">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <h2 className="mb-4 text-2xl font-heading font-bold text-white sm:text-3xl">
 {isNL ? "Meer ontdekken?" : "Discover more?"}
 </h2>
 <p className="mb-8 text-lg text-gray-300">
 {isNL
 ? "Bekijk alle gidsen of vergelijk direct de beste platforms."
 : "View all guides or directly compare the best platforms."}
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <Link
 href={`/${locale}/gids`}
 className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-heading font-semibold text-secondary shadow-lg transition-all hover:bg-gray-100"
 >
 {isNL ? "Alle Gidsen" : "All Guides"}
 </Link>
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-3 text-base font-heading font-semibold text-white transition-all hover:bg-white/10"
 >
 {isNL ? "Vergelijk Platforms" : "Compare Platforms"}
 </Link>
 </div>
 </div>
 </section>
 </main>
 <Footer />
 </>
 );
}
