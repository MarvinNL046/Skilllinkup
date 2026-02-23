import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ChevronRight, FileText } from 'lucide-react';
import { sql } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth-helpers';
import { QuoteRequestForm } from '@/components/marketplace/QuoteRequestForm';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
  params: Promise<{ locale: string }>;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default async function QuoteRequestPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('quotes');

  const user = await getCurrentUser();

  // Fetch all marketplace categories (both remote and local)
  let categories: Category[] = [];
  try {
    const rows = await sql`
      SELECT id, COALESCE(name, '') AS name, COALESCE(slug, '') AS slug
      FROM marketplace_categories
      ORDER BY name ASC
    `;
    categories = rows as Category[];
  } catch (error) {
    console.error('Error fetching categories:', error);
  }

  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-8"
          aria-label="Breadcrumb"
        >
          <Link
            href={`/${locale}/marketplace`}
            className="hover:text-primary transition-colors"
          >
            Marketplace
          </Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-gray-700 dark:text-gray-200">{t('title')}</span>
        </nav>

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
            <FileText className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-3">
            {t('heroTitle')}
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            {t('heroSubtitle')}
          </p>
        </div>

        {/* How it works */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { step: '1', text: 'Describe your project and location' },
            { step: '2', text: 'Receive quotes from local professionals' },
            { step: '3', text: 'Compare and accept the best quote' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-white text-sm font-bold mb-2">
                {item.step}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
          {!user ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
                Please sign in to submit a quote request.
              </p>
              <Link
                href={`/${locale}/auth/signin`}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <QuoteRequestForm categories={categories} locale={locale} />
          )}
        </div>
      </div>
    </section>
  );
}
