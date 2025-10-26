'use client';

import { useTheme } from './ThemeProvider';
import { useTranslations } from 'next-intl';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('theme');

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? t('switchToLight') : t('switchToDark')}
      title={theme === 'dark' ? t('switchToLight') : t('switchToDark')}
      className="relative w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 flex items-center justify-center group"
    >
      {/* Sun Icon - Shows in dark mode */}
      <svg
        className={`absolute w-5 h-5 text-yellow-500 transition-all duration-500 ease-in-out ${
          theme === 'dark'
            ? 'rotate-0 scale-100 opacity-100'
            : 'rotate-90 scale-0 opacity-0'
        }`}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>

      {/* Moon Icon - Shows in light mode */}
      <svg
        className={`absolute w-5 h-5 text-indigo-600 dark:text-indigo-400 transition-all duration-500 ease-in-out ${
          theme === 'light'
            ? 'rotate-0 scale-100 opacity-100'
            : '-rotate-90 scale-0 opacity-0'
        }`}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>

      {/* Hover glow effect */}
      <span className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 transition-all duration-300 ease-in-out" />
    </button>
  );
}
