import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { TrendingUp, ArrowRight, Target, Megaphone } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const slug = 'beste-platforms-marketing-consultants';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/gids/niche-gidsen/${slug}`;

  return {
    title: 'Beste Freelance Platforms voor Marketing Consultants & Growth Hackers 2026',
    description: 'Ontdek de beste platforms voor marketing consultants en growth hackers. Van Upwork tot gespecialiseerde marketingplatforms - waar vind je de hoogste tarieven en beste opdrachten?',
    keywords: 'marketing consultant platforms, growth hacker freelance, marketing freelance werk, digital marketing platforms',
    openGraph: {
      title: 'Beste Platforms voor Marketing Consultants 2026',
      description: 'Top freelance platforms voor marketing consultants met tarieven tot €150/uur.',
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [{ url: `${siteUrl}/images/og/niche-gidsen-og.png`, width: 1200, height: 630, alt: 'Marketing Platforms' }],
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: 'article',
    },
    alternates: { canonical: pageUrl, languages: { 'nl': `${siteUrl}/nl/gids/niche-gidsen/${slug}` } },
    robots: { index: true, follow: true },
  };
}

export default async function MarketingConsultantPlatformsPage({ params }: PageProps) {
  const { locale } = await params;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Beste Freelance Platforms voor Marketing Consultants 2026',
        author: { '@type': 'Organization', name: 'SkillLinkup' },
        publisher: { '@type': 'Organization', name: 'SkillLinkup', logo: { '@type': 'ImageObject', url: 'https://skilllinkup.com/logo.png' } },
        datePublished: '2026-01-09',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `https://skilllinkup.com/${locale}` },
          { '@type': 'ListItem', position: 2, name: 'Gids', item: `https://skilllinkup.com/${locale}/gids` },
          { '@type': 'ListItem', position: 3, name: 'Niche Gidsen', item: `https://skilllinkup.com/${locale}/gids/niche-gidsen` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="min-h-screen bg-white dark:bg-gray-900">
        <section className="bg-gradient-to-br from-secondary via-primary to-accent py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-white text-sm font-semibold">Niche Gids #8</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
                Beste Platforms voor Marketing Consultants
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Marketing consultants verdienen €75-€150/uur op de juiste platforms. Ontdek waar je de beste opdrachten vindt.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href={`/${locale}/platforms`} className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg">
                  Bekijk Platforms
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-xl text-gray-700 dark:text-gray-300">
              Als marketing consultant heb je een unieke positie. Bedrijven betalen premium tarieven voor experts die meetbare omzet genereren.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border">
              <div className="text-4xl font-bold text-primary mb-2">€75-150</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Gemiddeld uurtarief</div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border">
              <div className="text-4xl font-bold text-accent mb-2">€5-20K</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Maandelijkse retainer</div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 text-center border">
              <div className="text-4xl font-bold text-secondary mb-2">60%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Groei marketing freelance</div>
            </div>
          </div>

          <section className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">
                Waarom Marketing Consultants Premium Tarieven Kunnen Vragen
              </h2>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Marketing is een van de weinige vakgebieden waar je direct ROI kunt aantonen. Deze resultaatgerichtheid rechtvaardigt premium tarieven.
            </p>
          </section>

          <div className="bg-gradient-to-br from-secondary via-primary to-accent rounded-lg shadow-xl p-8 md:p-12 text-center">
            <Megaphone className="w-16 h-16 text-white mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">Klaar om Te Groeien?</h3>
            <p className="text-xl text-white/90 mb-8">
              Vind het perfecte platform en start met premium opdrachten binnen 30 dagen.
            </p>
            <Link href={`/${locale}/platforms`} className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg">
              Bekijk Platforms
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
