import { getTranslations } from 'next-intl/server';

interface PageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
 const { locale } = await params;
 const t = await getTranslations({ locale, namespace: 'privacyPage.metadata' });

 return {
 title: t('title'),
 description: t('description'),
 };
}

export default async function PrivacyPage({ params }: PageProps) {
 const { locale } = await params;
 const t = await getTranslations({ locale, namespace: 'privacyPage' });

 // Format date with locale
 const lastUpdated = new Date().toLocaleDateString(
 locale === 'nl' ? 'nl-NL' : 'en-US',
 { year: 'numeric', month: 'long', day: 'numeric' }
 );

 return (
 <>
 
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
 <h2>{t('sections.section1.title')}</h2>
 <p>{t('sections.section1.content')}</p>
 <p>{t('sections.section1.content2')}</p>
 </section>

 <section className="mb-8">
 <h2>{t('sections.section2.title')}</h2>
 <h3>{t('sections.section2.subsection1.title')}</h3>
 <p>{t('sections.section2.subsection1.content')}</p>
 <ul>
 {(t.raw('sections.section2.subsection1.list') as string[]).map((item, index) =>(
 <li key={index}>{item}</li>
 ))}
 </ul>
 <p>{t('sections.section2.subsection1.content2')}</p>
 <ul>
 {(t.raw('sections.section2.subsection1.list2') as string[]).map((item, index) =>(
 <li key={index}>{item}</li>
 ))}
 </ul>

 <h3>{t('sections.section2.subsection2.title')}</h3>
 <p>{t('sections.section2.subsection2.content')}</p>
 <ul>
 {(t.raw('sections.section2.subsection2.list') as string[]).map((item, index) =>(
 <li key={index}>{item}</li>
 ))}
 </ul>
 </section>

 <section className="mb-8">
 <h2>{t('sections.section3.title')}</h2>
 <p>{t('sections.section3.content')}</p>
 <ul>
 {(t.raw('sections.section3.list') as string[]).map((item, index) =>(
 <li key={index}>{item}</li>
 ))}
 </ul>
 </section>

 <section className="mb-8">
 <h2>{t('sections.section4.title')}</h2>
 <p>{t('sections.section4.content')}</p>
 <ul>
 {(t.raw('sections.section4.list') as string[]).map((item, index) =>(
 <li key={index}>{item}</li>
 ))}
 </ul>
 <p>{t('sections.section4.content2')}</p>
 </section>

 <section className="mb-8">
 <h2>{t('sections.section5.title')}</h2>
 <p>{t('sections.section5.content')}</p>
 </section>

 <section className="mb-8">
 <h2>{t('sections.section6.title')}</h2>
 <p>{t('sections.section6.content')}</p>
 </section>

 <section className="mb-8">
 <h2>{t('sections.section7.title')}</h2>
 <p>{t('sections.section7.content')}</p>
 </section>

 <section className="mb-8">
 <h2>{t('sections.section8.title')}</h2>
 <p>{t('sections.section8.content')}</p>
 <ul>
 {(t.raw('sections.section8.list') as string[]).map((item, index) =>(
 <li key={index}>{item}</li>
 ))}
 </ul>
 <p>{t('sections.section8.content2')}</p>
 </section>

 <section className="mb-8">
 <h2>{t('sections.section9.title')}</h2>
 <p>{t('sections.section9.content')}</p>
 </section>

 <section className="mb-8">
 <h2>{t('sections.section10.title')}</h2>
 <p>{t('sections.section10.content')}</p>
 </section>

 <section className="mb-8">
 <h2>{t('sections.section11.title')}</h2>
 <p>{t('sections.section11.content')}</p>
 </section>

 <section className="mb-8">
 <h2>{t('sections.section12.title')}</h2>
 <p>{t('sections.section12.content')}</p>
 <p>{t('sections.section12.email')}</p>
 </section>
 </div>
 </div>
 </div>
 
 </>
 );
}
