"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { SEO_NAVIGATION, getLocalizedSlug, getLocalizedSubPillarSlug } from "@/lib/seo-navigation-data";

// Mapping between SEO_NAVIGATION ids and translation keys
const CATEGORY_TRANSLATION_KEYS: Record<number, { category: string; guides: string[] }>= {
 1: { category: 'platformSelection', guides: ['chooseBestPlatform', 'beginnerVsExpert', 'keySelectionFactors'] },
 2: { category: 'platformReviews', guides: ['whatIsUpwork', 'whatIsToptal', 'upworkGuide'] },
 3: { category: 'pricingEarnings', guides: ['calculateRates', 'pricingStrategies', 'upworkPricing'] },
 4: { category: 'gettingStarted', guides: ['beginnersGuide', 'toptalForBeginners', 'profileTemplates'] },
 5: { category: 'toolsProductivity', guides: ['essentialTools', 'timeTracking', 'invoiceGenerator'] },
 6: { category: 'platformComparisons', guides: ['upworkVsFiverr', 'toptalVsUpwork', 'freelancerVsGuru'] },
 7: { category: 'successStrategies', guides: ['standOut', 'biddingStrategies', 'clientRelationships'] },
 8: { category: 'nicheGuides', guides: ['forDevelopers', 'forDesigners', 'forWriters'] },
 9: { category: 'businessManagement', guides: ['invoicing', 'taxes', 'contracts'] },
 10: { category: 'bestPractices', guides: ['profileOptimization', 'winningProposals', 'platformAlgorithms'] },
};

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
 {t('footer.exploreResources')}
 </h3>
 <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
 {SEO_NAVIGATION.map((pillar) =>{
 const translationKey = CATEGORY_TRANSLATION_KEYS[pillar.id];
 const categoryName = translationKey
 ? t(`seoNavigation.categories.${translationKey.category}.name`)
 : pillar.name;

 return (
 <div key={pillar.id}>
 <h4 className="font-heading font-semibold mb-3 text-text-primary dark:text-white flex items-center gap-2">
 <span>{pillar.icon}</span>
 <span className="text-sm">{categoryName}</span>
 </h4>
 <ul className="space-y-2 text-xs">
 {pillar.subPillars.slice(0, 3).map((subPillar, index) =>{
 const guideKey = translationKey?.guides[index];
 const guideName = guideKey
 ? t(`seoNavigation.categories.${translationKey.category}.guides.${guideKey}.name`)
 : subPillar.name;

 return (
 <li key={subPillar.slug}>
 <Link
 href={`/${locale}${getLocalizedSubPillarSlug(subPillar, locale)}`}
 className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors"
 >
 {guideName}
 </Link>
 </li>
 );
 })}
 <li>
 <Link
 href={`/${locale}${getLocalizedSlug(pillar, locale)}`}
 className="text-accent hover:text-accent-dark dark:text-accent dark:hover:text-accent-light transition-colors font-medium"
 >
 {t('footer.viewAll')}
 </Link>
 </li>
 </ul>
 </div>
 );
 })}
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
 <Link href={`/${locale}/${locale === 'nl' ? 'gids' : 'guides'}`} className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
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
