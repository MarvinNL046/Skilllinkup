"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { SeoMegaMenu } from "./seo-megamenu";

export function Header() {
 const t = useTranslations();
 const locale = useLocale();
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

 return (
 <header className="sticky top-0 z-50 w-full border-b border-background-gray dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex h-16 items-center justify-between">
 {/* Logo */}
 <Link href={`/${locale}`} className="flex items-center">
 <Image
 src="/images/logo/skilllinkup-transparant-rozepunt.webp"
 alt="SkillLinkup"
 width={150}
 height={50}
 className="object-contain h-10"
 priority
 />
 </Link>

 {/* Desktop Navigation */}
 <nav className="hidden md:flex items-center space-x-8">
 <Link
 href={`/${locale}`}
 className="text-sm font-medium text-text-secondary dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors"
 >
 {t('header.home')}
 </Link>
 <Link
 href={`/${locale}/platforms`}
 className="text-sm font-medium text-text-secondary dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors"
 >
 {t('header.platforms')}
 </Link>
 <Link
 href={`/${locale}/marketplace`}
 className="text-sm font-medium text-text-secondary dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors"
 >
 {t('header.marketplace')}
 </Link>
 <SeoMegaMenu />
 <Link
 href={`/${locale}/reviews`}
 className="text-sm font-medium text-text-secondary dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors"
 >
 {t('header.reviews')}
 </Link>
 <Link
 href={`/${locale}/comparisons`}
 className="text-sm font-medium text-text-secondary dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors"
 >
 {t('header.comparisons')}
 </Link>
 <Link
 href={`/${locale}/tools`}
 className="text-sm font-medium text-text-secondary dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors"
 >
 {t('header.tools')}
 </Link>
 <Link
 href={`/${locale}/about`}
 className="text-sm font-medium text-text-secondary dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors"
 >
 {t('header.about')}
 </Link>
 </nav>

 {/* CTA Button */}
 <div className="hidden md:flex items-center gap-3">
 <LanguageSwitcher />
 <ThemeToggle />
 <Link
 href="/handler/sign-up"
 className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark px-4 py-2 text-sm font-heading font-semibold text-white transition-colors shadow-lg"
 >
 {t('header.signUp')}
 </Link>
 </div>

 {/* Mobile Menu Button */}
 <button
 className="md:hidden rounded-md p-2 text-text-secondary dark:text-gray-300 hover:text-text-primary dark:hover:text-white hover:bg-background-light dark:hover:bg-gray-800"
 onClick={() =>setMobileMenuOpen(!mobileMenuOpen)}
 >
 <svg
 width="24"
 height="24"
 fill="none"
 viewBox="0 0 24 24"
 stroke="currentColor"
 >
 {mobileMenuOpen ? (
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M6 18L18 6M6 6l12 12"
 />
 ) : (
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M4 6h16M4 12h16M4 18h16"
 />
 )}
 </svg>
 </button>
 </div>

 {/* Mobile Menu */}
 {mobileMenuOpen && (
 <div className="md:hidden pb-4 pt-4 border-t border-background-gray dark:border-gray-800 dark:bg-gray-900">
 <nav className="flex flex-col space-y-3">
 <Link
 href={`/${locale}`}
 className="text-sm font-medium text-text-secondary dark:text-gray-300 hover:text-accent dark:hover:text-accent px-2 py-1"
 onClick={() =>setMobileMenuOpen(false)}
 >
 {t('header.home')}
 </Link>
 <Link
 href={`/${locale}/platforms`}
 className="text-sm font-medium text-text-secondary dark:text-gray-300 hover:text-accent dark:hover:text-accent px-2 py-1"
 onClick={() =>setMobileMenuOpen(false)}
 >
 {t('header.platforms')}
 </Link>
 <Link
 href={`/${locale}/marketplace`}
 className="text-sm font-medium text-text-secondary dark:text-gray-300 hover:text-accent dark:hover:text-accent px-2 py-1"
 onClick={() =>setMobileMenuOpen(false)}
 >
 {t('header.marketplace')}
 </Link>
 <SeoMegaMenu isMobile onLinkClick={() =>setMobileMenuOpen(false)} />
 <Link
 href={`/${locale}/reviews`}
 className="text-sm font-medium text-text-secondary dark:text-gray-300 hover:text-accent dark:hover:text-accent px-2 py-1"
 onClick={() =>setMobileMenuOpen(false)}
 >
 {t('header.reviews')}
 </Link>
 <Link
 href={`/${locale}/comparisons`}
 className="text-sm font-medium text-text-secondary dark:text-gray-300 hover:text-accent dark:hover:text-accent px-2 py-1"
 onClick={() =>setMobileMenuOpen(false)}
 >
 {t('header.comparisons')}
 </Link>
 <Link
 href={`/${locale}/tools`}
 className="text-sm font-medium text-text-secondary dark:text-gray-300 hover:text-accent dark:hover:text-accent px-2 py-1"
 onClick={() =>setMobileMenuOpen(false)}
 >
 {t('header.tools')}
 </Link>
 <Link
 href={`/${locale}/about`}
 className="text-sm font-medium text-text-secondary dark:text-gray-300 hover:text-accent dark:hover:text-accent px-2 py-1"
 onClick={() =>setMobileMenuOpen(false)}
 >
 {t('header.about')}
 </Link>
 <Link
 href="/handler/sign-up"
 className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark px-4 py-2 text-sm font-heading font-semibold text-white mt-2 shadow-lg"
 onClick={() =>setMobileMenuOpen(false)}
 >
 {t('header.signUp')}
 </Link>
 <div className="flex justify-center gap-3 mt-4">
 <LanguageSwitcher />
 <ThemeToggle />
 </div>
 </nav>
 </div>
 )}
 </div>
 </header>
 );
}
