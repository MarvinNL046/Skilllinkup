'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

interface CategoryPill {
  name: string;
  slug: string;
  icon: string | null;
}

interface MarketplaceHeroProps {
  categories: CategoryPill[];
}

export function MarketplaceHero({ categories }: MarketplaceHeroProps) {
  const locale = useLocale();
  const t = useTranslations('homepage.marketplaceHero');
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${locale}/marketplace/gigs?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-secondary dark:bg-secondary-dark">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-white/90">{t('badge')}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 leading-tight">
            {t('title')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-primary">
              {t('titleHighlight')}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/75 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-10">
            <div className="flex rounded-lg overflow-hidden shadow-xl bg-white">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full pl-12 pr-4 py-4 text-base text-text-primary placeholder:text-text-muted border-0 focus:outline-none focus:ring-0"
                />
              </div>
              <button
                type="submit"
                className="px-6 sm:px-8 bg-primary hover:bg-primary-dark text-white font-heading font-semibold text-sm transition-colors flex-shrink-0"
              >
                {t('searchButton')}
              </button>
            </div>
          </form>

          {/* Popular category pills */}
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              <span className="text-sm text-white/50 self-center mr-1">{t('popular')}:</span>
              {categories.slice(0, 6).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${locale}/marketplace/gigs?category=${cat.slug}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium text-white/80 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 transition-colors backdrop-blur-sm"
                >
                  {cat.icon && <span className="text-sm">{cat.icon}</span>}
                  {cat.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
