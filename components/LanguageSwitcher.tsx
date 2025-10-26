'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  // Remove current locale from pathname to get the base path
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

  // Determine the other locale
  const otherLocale = locale === 'nl' ? 'en' : 'nl';
  const flag = locale === 'nl' ? '🇬🇧' : '🇳🇱';
  const label = otherLocale.toUpperCase();

  return (
    <Link
      href={`/${otherLocale}${pathnameWithoutLocale}`}
      className="relative w-auto px-3 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 flex items-center justify-center gap-2 group text-sm font-medium text-gray-700 dark:text-gray-300"
      title={`Switch to ${label}`}
      aria-label={`Switch to ${label}`}
    >
      <span className="text-base">{flag}</span>
      <span className="font-semibold">{label}</span>

      {/* Hover glow effect */}
      <span className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 transition-all duration-300 ease-in-out" />
    </Link>
  );
}
