import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Pillar configuration with translations
const PILLARS = [
 {
 id: 1,
 nameNl: "Platform Selectie",
 nameEn: "Platform Selection",
 slug: "platform-selectie",
 icon: "",
 descriptionNl: "Vind het perfecte freelance platform voor jouw skills en doelen",
 descriptionEn: "Find the perfect freelance platform for your skills and goals",
 color: "bg-pink-50 border-pink-200",
 },
 {
 id: 2,
 nameNl: "Platform Reviews",
 nameEn: "Platform Reviews",
 slug: "platform-reviews",
 icon: "",
 descriptionNl: "Diepgaande reviews van populaire freelance platforms",
 descriptionEn: "In-depth reviews of popular freelance platforms",
 color: "bg-yellow-50 border-yellow-200",
 },
 {
 id: 3,
 nameNl: "Prijzen & Verdienen",
 nameEn: "Pricing & Earnings",
 slug: "prijzen-verdienen",
 icon: "",
 descriptionNl: "Leer hoe je je tarieven bepaalt en meer verdient",
 descriptionEn: "Learn how to set your rates and earn more",
 color: "bg-green-50 border-green-200",
 },
 {
 id: 4,
 nameNl: "Aan de Slag",
 nameEn: "Getting Started",
 slug: "aan-de-slag",
 icon: "",
 descriptionNl: "Stap-voor-stap gidsen voor beginnende freelancers",
 descriptionEn: "Step-by-step guides for beginner freelancers",
 color: "bg-blue-50 border-blue-200",
 },
 {
 id: 5,
 nameNl: "Tools & Productiviteit",
 nameEn: "Tools & Productivity",
 slug: "tools-productiviteit",
 icon: "",
 descriptionNl: "Essentiële tools om efficiënter te werken",
 descriptionEn: "Essential tools to work more efficiently",
 color: "bg-purple-50 border-purple-200",
 },
 {
 id: 6,
 nameNl: "Platform Vergelijkingen",
 nameEn: "Platform Comparisons",
 slug: "platform-vergelijkingen",
 icon: "",
 descriptionNl: "Zij-aan-zij vergelijkingen van populaire platforms",
 descriptionEn: "Side-by-side comparisons of popular platforms",
 color: "bg-indigo-50 border-indigo-200",
 },
 {
 id: 7,
 nameNl: "Succes Strategieën",
 nameEn: "Success Strategies",
 slug: "succes-strategieen",
 icon: "",
 descriptionNl: "Bewezen strategieën om te groeien als freelancer",
 descriptionEn: "Proven strategies to grow as a freelancer",
 color: "bg-orange-50 border-orange-200",
 },
 {
 id: 8,
 nameNl: "Niche Gidsen",
 nameEn: "Niche Guides",
 slug: "niche-gidsen",
 icon: "",
 descriptionNl: "Specifieke gidsen voor jouw vakgebied",
 descriptionEn: "Specific guides for your field of expertise",
 color: "bg-teal-50 border-teal-200",
 },
 {
 id: 9,
 nameNl: "Zakelijk Beheer",
 nameEn: "Business Management",
 slug: "zakelijk-beheer",
 icon: "",
 descriptionNl: "Facturatie, belastingen en contracten",
 descriptionEn: "Invoicing, taxes, and contracts",
 color: "bg-red-50 border-red-200",
 },
 {
 id: 10,
 nameNl: "Best Practices",
 nameEn: "Best Practices",
 slug: "best-practices",
 icon: "",
 descriptionNl: "Tips en tricks van succesvolle freelancers",
 descriptionEn: "Tips and tricks from successful freelancers",
 color: "bg-cyan-50 border-cyan-200",
 },
];

export async function generateMetadata({
 params,
}: {
 params: Promise<{ locale: string }>;
}): Promise<Metadata>{
 const { locale } = await params;
 const isNL = locale === "nl";

 return {
 title: isNL
 ? "Freelance Gidsen | Complete Verzameling | SkillLinkup"
 : "Freelance Guides | Complete Collection | SkillLinkup",
 description: isNL
 ? "Ontdek onze uitgebreide collectie freelance gidsen. Van platform selectie tot zakelijk beheer - alles wat je nodig hebt om te slagen als freelancer."
 : "Discover our comprehensive collection of freelance guides. From platform selection to business management - everything you need to succeed as a freelancer.",
 openGraph: {
 title: isNL ? "Freelance Gidsen | SkillLinkup" : "Freelance Guides | SkillLinkup",
 description: isNL
 ? "Complete verzameling gidsen voor freelancers"
 : "Complete collection of guides for freelancers",
 },
 };
}

export default async function GidsPage({
 params,
}: {
 params: Promise<{ locale: string }>;
}) {
 const { locale } = await params;
 const isNL = locale === "nl";

 return (
 <>
 <Header />
 <main className="min-h-screen bg-background-light dark:bg-gray-900">
 {/* Hero Section */}
 <section className="bg-gradient-to-b from-secondary to-secondary-medium py-16 sm:py-20">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="mx-auto max-w-3xl text-center">
 <h1 className="mb-6 text-4xl font-heading font-bold tracking-tight text-white sm:text-5xl">
 {isNL ? "Freelance Gidsen" : "Freelance Guides"}
 </h1>
 <p className="text-lg text-gray-300">
 {isNL
 ? "Ontdek onze uitgebreide collectie gidsen om je freelance carrière naar het volgende niveau te tillen. Van beginner tot expert - wij hebben je gedekt."
 : "Discover our comprehensive collection of guides to take your freelance career to the next level. From beginner to expert - we've got you covered."}
 </p>
 </div>
 </div>
 </section>

 {/* Pillars Grid */}
 <section className="py-16">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
 {PILLARS.map((pillar) =>(
 <Link
 key={pillar.id}
 href={`/${locale}/gids/${pillar.slug}`}
 className={`group rounded-lg border-2 ${pillar.color} p-6 transition-all hover:shadow-lg hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700`}
 >
 <div className="mb-4 text-4xl">{pillar.icon}</div>
 <h2 className="mb-2 font-heading font-bold text-text-primary dark:text-white group-hover:text-primary transition-colors">
 {isNL ? pillar.nameNl : pillar.nameEn}
 </h2>
 <p className="text-sm text-text-secondary dark:text-gray-400">
 {isNL ? pillar.descriptionNl : pillar.descriptionEn}
 </p>
 <div className="mt-4 flex items-center text-sm font-medium text-primary">
 {isNL ? "Bekijk gidsen" : "View guides"}
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
 </div>
 </section>

 {/* CTA Section */}
 <section className="bg-primary py-16">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <h2 className="mb-4 text-2xl font-heading font-bold text-white sm:text-3xl">
 {isNL
 ? "Klaar om te beginnen?"
 : "Ready to get started?"}
 </h2>
 <p className="mb-8 text-lg text-white/90">
 {isNL
 ? "Vergelijk de beste freelance platforms en vind jouw perfecte match."
 : "Compare the best freelance platforms and find your perfect match."}
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-heading font-semibold text-primary shadow-lg transition-all hover:bg-gray-100"
 >
 {isNL ? "Vergelijk Platforms" : "Compare Platforms"}
 </Link>
 </div>
 </section>
 </main>
 <Footer />
 </>
 );
}
