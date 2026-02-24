import { getTranslations } from 'next-intl/server';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

interface PageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
 const { locale } = await params;
 const t = await getTranslations({ locale, namespace: 'disclosurePage.metadata' });

 return {
 title: t('title'),
 description: t('description'),
 };
}

export default async function DisclosurePage({ params }: PageProps) {
 const { locale } = await params;
 const t = await getTranslations({ locale, namespace: 'disclosurePage' });

 // Format date with locale
 const lastUpdated = new Date().toLocaleDateString(
 locale === 'nl' ? 'nl-NL' : 'en-US',
 { year: 'numeric', month: 'long', day: 'numeric' }
 );

 return (
 <>
 <Header />
 <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
 <div className="container mx-auto px-4 py-16 max-w-4xl">
 <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {t('title')}
 </h1>
 <p className="text-gray-600 dark:text-gray-400 mb-8">
 {t('lastUpdated')}: {lastUpdated}
 </p>

 <div className="prose prose-lg dark:prose-invert max-w-none
 prose-headings:font-heading
 prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8
 prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-3 prose-h3:mt-6
 prose-p:mb-4
 prose-ul:mb-4 prose-ul:space-y-2
 prose-li:marker:text-primary dark:prose-li:marker:text-accent
 prose-strong:font-semibold
 prose-a:text-primary dark:prose-a:text-accent prose-a:no-underline
 prose-a:hover:text-primary-dark dark:prose-a:hover:text-accent/90">
 <section className="mb-8">
 <h2 className="">
 {t('sections.section1.title')}
 </h2>
 <p className="">
 {t('sections.section1.content')}
 </p>
 </section>

 <section className="mb-8">
 <h2 className="">
 {t('sections.section2.title')}
 </h2>
 <p className="">
 {t('sections.section2.content')}
 </p>
 <p className="">
 {t('sections.section2.content2')}
 </p>
 </section>

 <section className="mb-8">
 <h2 className="">
 {t('sections.section3.title')}
 </h2>
 <p className="">
 {t('sections.section3.content')}
 </p>
 <ul className="">
 {(t.raw('sections.section3.list') as string[]).map((item, index) =>(
 <li key={index}>{item}</li>
 ))}
 </ul>
 <p className="">
 {t('sections.section3.content2')}
 </p>
 </section>

 <section className="mb-8">
 <h2 className="">
 {t('sections.section4.title')}
 </h2>
 <p className="">
 {t('sections.section4.content')}
 </p>
 <ul className="">
 {(t.raw('sections.section4.list') as string[]).map((item, index) =>(
 <li key={index}>{item}</li>
 ))}
 </ul>
 </section>

 <section className="mb-8">
 <h2 className="">
 {t('sections.section5.title')}
 </h2>
 <p className="">
 {t('sections.section5.content')}
 </p>
 <ul className="">
 {(t.raw('sections.section5.list') as string[]).map((item, index) =>(
 <li key={index}>{item}</li>
 ))}
 </ul>
 <p className="">
 {t('sections.section5.content2')}
 </p>
 </section>

 <section className="mb-8">
 <h2 className="">
 {t('sections.section6.title')}
 </h2>
 <p className="">
 {t('sections.section6.content')}
 </p>
 <ul className="">
 {(t.raw('sections.section6.list') as string[]).map((item, index) =>(
 <li key={index}>{item}</li>
 ))}
 </ul>
 <p className="">
 {t('sections.section6.content2')}
 </p>
 </section>

 <section className="mb-8">
 <h2 className="">
 {t('sections.section7.title')}
 </h2>
 <p className="">
 {t('sections.section7.content')}
 </p>
 </section>

 <section className="mb-8">
 <h2 className="">
 {t('sections.section8.title')}
 </h2>
 <p className="">
 {t('sections.section8.content')}
 </p>
 </section>

 <section className="mb-8">
 <h2 className="">
 {t('sections.section9.title')}
 </h2>
 <p className="">
 {t('sections.section9.content')}
 </p>
 <ul className="">
 {(t.raw('sections.section9.list') as string[]).map((item, index) =>(
 <li key={index}>{item}</li>
 ))}
 </ul>
 <p className="">
 {t('sections.section9.content2')}
 </p>
 </section>

 <section className="mb-8">
 <h2 className="">
 {t('sections.section10.title')}
 </h2>
 <p className="">
 {t('sections.section10.content')}
 </p>
 <ul className="">
 {(t.raw('sections.section10.list') as string[]).map((item, index) =>(
 <li key={index}>{item}</li>
 ))}
 </ul>
 </section>

 <section className="mb-8">
 <h2 className="">
 {t('sections.section11.title')}
 </h2>
 <p className="">
 {t('sections.section11.content')}
 </p>
 </section>

 <section className="mb-8">
 <h2 className="">
 {t('sections.section12.title')}
 </h2>
 <p className="">
 {t('sections.section12.content')}
 </p>
 <p className="">
 {t('sections.section12.email')}
 </p>
 <p className="">
 {t('sections.section12.content2')}
 </p>
 </section>

 <section className="mb-8 bg-accent/10 dark:bg-accent/20 p-6 rounded-lg border-l-4 border-accent">
 <h3 className="">
 {t('sections.section13.title')}
 </h3>
 <p className="">
 {t('sections.section13.content')}
 </p>
 </section>
 </div>
 </div>
 </div>
 <Footer />
 </>
 );
}
