"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { SEO_NAVIGATION } from "@/lib/seo-navigation-data";

export function Footer() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-background-gray dark:border-gray-800 bg-background-light dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* SEO Navigation Section */}
        <div className="mb-12 pb-12 border-b border-background-gray dark:border-gray-800">
          <h3 className="font-heading font-bold text-xl mb-6 text-text-primary dark:text-white">
            Explore Freelance Resources
          </h3>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
            {SEO_NAVIGATION.map((pillar) => (
              <div key={pillar.id}>
                <h4 className="font-heading font-semibold mb-3 text-text-primary dark:text-white flex items-center gap-2">
                  <span>{pillar.icon}</span>
                  <span className="text-sm">{pillar.name}</span>
                </h4>
                <ul className="space-y-2 text-xs">
                  {pillar.subPillars.slice(0, 3).map((subPillar) => (
                    <li key={subPillar.slug}>
                      <Link
                        href={`/${locale}${subPillar.slug}`}
                        className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors"
                      >
                        {subPillar.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href={`/${locale}${pillar.slug}`}
                      className="text-accent hover:text-accent-dark dark:text-accent dark:hover:text-accent-light transition-colors font-medium"
                    >
                      View all →
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Navigation */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href={`/${locale}`} className="inline-block">
              <Image
                src="/images/logo/skilllinkup-transparant-rozepunt.webp"
                alt="SkillLinkup"
                width={150}
                height={50}
                className="object-contain h-10"
              />
            </Link>
            <p className="mt-4 text-sm text-text-secondary dark:text-gray-400 leading-relaxed">
              {t('footer.slogan')}
            </p>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="font-heading font-bold mb-4 text-text-primary dark:text-white">{t('footer.platforms')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={`/${locale}/platforms`} className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  {t('footer.allPlatforms')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/platforms/upwork`} className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  {t('footer.upworkReview')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/platforms/fiverr`} className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  {t('footer.fiverrReview')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/comparisons`} className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  {t('footer.platformComparisons')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading font-bold mb-4 text-text-primary dark:text-white">{t('footer.resources')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={`/${locale}/guides`} className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  {t('footer.guidesTutorials')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  {t('footer.blog')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tools`} className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  {t('footer.freelanceTools')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/newsletter`} className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  {t('footer.newsletterLink')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading font-bold mb-4 text-text-primary dark:text-white">{t('footer.company')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={`/${locale}/about`} className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  {t('footer.termsOfService')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/disclosure`} className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  {t('footer.affiliateDisclosure')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-background-gray dark:border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <p className="text-sm text-text-secondary dark:text-gray-400">
              {t('footer.copyright', { year: currentYear })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
