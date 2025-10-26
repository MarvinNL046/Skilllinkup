import { getTranslations } from 'next-intl/server';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'termsPage.metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'termsPage' });

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
              1. {t('sections.section1.title')}
            </h2>
            <p className="">
              {t('sections.section1.content')}
            </p>
            <p className="">
              {t('sections.section1.content2')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="">
              2. {t('sections.section2.title')}
            </h2>
            <h3 className="">
              {t('sections.section2.subsection.title')}
            </h3>
            <p className="">
              {t('sections.section2.subsection.content')}
            </p>
            <ul className="">
              {(t.raw('sections.section2.subsection.list') as string[]).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="">
              3. {t('sections.section3.title')}
            </h2>
            <p className="">
              {t('sections.section3.content')}
            </p>
            <p className="">
              {t('sections.section3.content2')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="">
              4. {t('sections.section4.title')}
            </h2>
            <p className="">
              {t('sections.section4.content')}
            </p>
            <p className="">
              {t('sections.section4.content2')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="">
              5. {t('sections.section5.title')}
            </h2>
            <p className="">
              {t('sections.section5.content')}
            </p>
            <ul className="">
              {(t.raw('sections.section5.list') as string[]).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="">
              {t('sections.section5.content2')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="">
              6. {t('sections.section6.title')}
            </h2>
            <p className="">
              {t('sections.section6.content')} <a href={`/${locale}/disclosure`} className="text-primary hover:text-primary-dark">{t('sections.section6.linkText')}</a> {t('sections.section6.content2')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="">
              7. {t('sections.section7.title')}
            </h2>
            <p className="">
              {t('sections.section7.content')}
            </p>
            <p className="">
              {t('sections.section7.content2')}
            </p>
            <ul className="">
              {(t.raw('sections.section7.list') as string[]).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="">
              8. {t('sections.section8.title')}
            </h2>
            <p className="">
              {t('sections.section8.content')}
            </p>
            <ul className="">
              {(t.raw('sections.section8.list') as string[]).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="">
              9. {t('sections.section9.title')}
            </h2>
            <p className="">
              {t('sections.section9.content')}
            </p>
            <ul className="">
              {(t.raw('sections.section9.list') as string[]).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="">
              10. {t('sections.section10.title')}
            </h2>
            <p className="">
              {t('sections.section10.content')}
            </p>
            <ul className="">
              {(t.raw('sections.section10.list') as string[]).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="">
              11. {t('sections.section11.title')}
            </h2>
            <p className="">
              {t('sections.section11.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="">
              12. {t('sections.section12.title')}
            </h2>
            <p className="">
              {t('sections.section12.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="">
              13. {t('sections.section13.title')}
            </h2>
            <p className="">
              {t('sections.section13.content')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="">
              14. {t('sections.section14.title')}
            </h2>
            <p className="">
              {t('sections.section14.content')}
            </p>
            <p className="">
              {t('sections.section14.email')}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="">
              15. {t('sections.section15.title')}
            </h2>
            <p className="">
              {t('sections.section15.content')}
            </p>
          </section>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
