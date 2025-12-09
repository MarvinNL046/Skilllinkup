import Link from "next/link";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEO_NAVIGATION } from "@/lib/seo-navigation-data";

interface SeoIndexPageProps {
  params: Promise<{ locale: string }>;
}

// Category key mapping for translations
const CATEGORY_KEYS: Record<number, string> = {
  1: "platformSelection",
  2: "platformReviews",
  3: "pricingEarnings",
  4: "gettingStarted",
  5: "toolsProductivity",
  6: "platformComparisons",
  7: "successStrategies",
  8: "nicheGuides",
  9: "businessManagement",
  10: "bestPractices",
};

// Slug to translation key mapping
const SLUG_TO_KEY: Record<string, { category: string; guide: string }> = {
  // Platform Selection
  "/resources/choose-best-freelance-platform": { category: "platformSelection", guide: "chooseBestPlatform" },
  "/resources/beginner-vs-expert-platforms": { category: "platformSelection", guide: "beginnerVsExpert" },
  "/resources/key-factors-choosing-freelance-marketplace": { category: "platformSelection", guide: "keySelectionFactors" },
  "/resources/multiple-freelance-platforms-pros-cons": { category: "platformSelection", guide: "multiplePlatforms" },
  "/resources/platform-selection-quiz": { category: "platformSelection", guide: "platformQuiz" },
  // Platform Reviews
  "/resources/what-is-upwork": { category: "platformReviews", guide: "whatIsUpwork" },
  "/resources/what-is-toptal": { category: "platformReviews", guide: "whatIsToptal" },
  "/resources/upwork-complete-guide": { category: "platformReviews", guide: "upworkGuide" },
  "/resources/fiverr-beginner-guide": { category: "platformReviews", guide: "fiverrBeginners" },
  "/resources/toptal-review": { category: "platformReviews", guide: "toptalReview" },
  "/resources/is-toptal-legit": { category: "platformReviews", guide: "isToptalLegit" },
  "/resources/freelancer-platform-deep-dive": { category: "platformReviews", guide: "freelancerCom" },
  "/resources/guru-platform-analysis": { category: "platformReviews", guide: "guruPlatform" },
  // Pricing & Earnings
  "/resources/calculate-freelance-hourly-rate": { category: "pricingEarnings", guide: "calculateRates" },
  "/resources/freelance-pricing-strategies": { category: "pricingEarnings", guide: "pricingStrategies" },
  "/resources/upwork-pricing": { category: "pricingEarnings", guide: "upworkPricing" },
  "/resources/toptal-pricing": { category: "pricingEarnings", guide: "toptalPricing" },
  "/resources/99designs-pricing": { category: "pricingEarnings", guide: "99designsPricing" },
  "/resources/upwork-pricing-tactics": { category: "pricingEarnings", guide: "upworkPricingTactics" },
  "/resources/negotiate-higher-rates": { category: "pricingEarnings", guide: "negotiateRates" },
  "/resources/platform-fees-maximize-earnings": { category: "pricingEarnings", guide: "maximizeEarnings" },
  // Getting Started
  "/resources/freelance-beginners-guide": { category: "gettingStarted", guide: "beginnersGuide" },
  "/resources/toptal-for-beginners": { category: "gettingStarted", guide: "toptalForBeginners" },
  "/resources/freelance-profile-templates": { category: "gettingStarted", guide: "profileTemplates" },
  "/resources/first-freelance-proposal": { category: "gettingStarted", guide: "firstProposal" },
  "/resources/freelance-beginner-mistakes": { category: "gettingStarted", guide: "avoidMistakes" },
  "/resources/freelance-platform-setup": { category: "gettingStarted", guide: "platformSetup" },
  // Tools & Productivity
  "/resources/essential-freelance-tools": { category: "toolsProductivity", guide: "essentialTools" },
  "/resources/best-time-tracking-tools-freelancers": { category: "toolsProductivity", guide: "timeTracking" },
  "/resources/freelance-invoice-generator": { category: "toolsProductivity", guide: "invoiceGenerator" },
  "/resources/project-management-tools-freelancers": { category: "toolsProductivity", guide: "projectManagement" },
  "/resources/freelance-accounting-software": { category: "toolsProductivity", guide: "accountingSoftware" },
  // Platform Comparisons
  "/resources/upwork-vs-fiverr": { category: "platformComparisons", guide: "upworkVsFiverr" },
  "/resources/toptal-vs-upwork": { category: "platformComparisons", guide: "toptalVsUpwork" },
  "/resources/freelancer-vs-guru": { category: "platformComparisons", guide: "freelancerVsGuru" },
  "/resources/best-platform-writers": { category: "platformComparisons", guide: "bestForWriters" },
  "/resources/best-platform-designers": { category: "platformComparisons", guide: "bestForDesigners" },
  // Success Strategies
  "/resources/how-to-stand-out-on-crowded-freelance-platforms": { category: "successStrategies", guide: "standOut" },
  "/resources/advanced-bidding-strategies-to-win-more-freelance-projects": { category: "successStrategies", guide: "biddingStrategies" },
  "/resources/building-long-term-client-relationships-on-freelance-platforms": { category: "successStrategies", guide: "clientRelationships" },
  "/resources/how-to-get-5-star-reviews-on-every-freelance-project": { category: "successStrategies", guide: "fiveStarReviews" },
  "/resources/scaling-your-freelance-business-from-solo-to-agency": { category: "successStrategies", guide: "scaleYourBusiness" },
  // Niche Guides
  "/resources/best-freelance-platforms-web-developers-2026": { category: "nicheGuides", guide: "forDevelopers" },
  "/resources/top-freelance-platforms-graphic-designers-creatives": { category: "nicheGuides", guide: "forDesigners" },
  "/resources/best-platforms-freelance-writers-content-creators": { category: "nicheGuides", guide: "forWriters" },
  "/resources/freelance-platforms-virtual-assistants-complete-guide": { category: "nicheGuides", guide: "forVAs" },
  "/resources/best-freelance-platforms-marketing-consultants": { category: "nicheGuides", guide: "forMarketers" },
  // Business Management
  "/resources/freelance-invoicing-guide": { category: "businessManagement", guide: "invoicing" },
  "/resources/freelance-tax-guide": { category: "businessManagement", guide: "taxes" },
  "/resources/freelance-contracts-101": { category: "businessManagement", guide: "contracts" },
  "/resources/managing-multiple-clients": { category: "businessManagement", guide: "multipleClients" },
  "/resources/freelance-business-insurance": { category: "businessManagement", guide: "insurance" },
  // Best Practices
  "/resources/optimizing-freelance-profile-maximum-visibility": { category: "bestPractices", guide: "profileOptimization" },
  "/resources/how-to-write-proposals-that-win": { category: "bestPractices", guide: "winningProposals" },
  "/resources/mastering-freelance-platform-algorithms": { category: "bestPractices", guide: "platformAlgorithms" },
  "/resources/building-portfolio-that-converts": { category: "bestPractices", guide: "portfolioBuilding" },
  "/resources/freelance-platform-communication": { category: "bestPractices", guide: "clientCommunication" },
};

export async function generateMetadata({ params }: SeoIndexPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resourcesPage" });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/resources`;

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: t("meta.keywords"),

    // Open Graph (Facebook, LinkedIn, etc.)
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [
        {
          url: `${siteUrl}/images/og/resources-og.png`,
          width: 1200,
          height: 630,
          alt: t("meta.ogTitle"),
        }
      ],
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: "website",
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: t("meta.ogTitle"),
      description: t("meta.twitterDescription"),
      images: [`${siteUrl}/images/og/resources-og.png`],
      creator: '@SkillLinkup',
      site: '@SkillLinkup',
    },

    // Canonical URL with language alternates
    alternates: {
      canonical: pageUrl,
      languages: {
        'en': `${siteUrl}/en/resources`,
        'nl': `${siteUrl}/nl/resources`,
      },
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function SeoIndexPage({ params }: SeoIndexPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resourcesPage" });
  const tNav = await getTranslations({ locale, namespace: "seoNavigation" });

  // Helper to get translated category name
  const getCategoryName = (pillarId: number): string => {
    const key = CATEGORY_KEYS[pillarId];
    if (key) {
      try {
        return tNav(`categories.${key}.name`);
      } catch {
        return SEO_NAVIGATION.find(p => p.id === pillarId)?.name || "";
      }
    }
    return SEO_NAVIGATION.find(p => p.id === pillarId)?.name || "";
  };

  // Helper to get translated guide name and description
  const getGuideTranslation = (slug: string): { name: string; description: string } => {
    const mapping = SLUG_TO_KEY[slug];
    if (mapping) {
      try {
        return {
          name: tNav(`categories.${mapping.category}.guides.${mapping.guide}.name`),
          description: tNav(`categories.${mapping.category}.guides.${mapping.guide}.description`),
        };
      } catch {
        // Fallback to original data
      }
    }
    const pillar = SEO_NAVIGATION.flatMap(p => p.subPillars).find(s => s.slug === slug);
    return {
      name: pillar?.name || "",
      description: pillar?.description || "",
    };
  };

  // Schema.org JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("meta.ogTitle"),
    description: t("meta.ogDescription"),
    url: `https://skilllinkup.com/${locale}/resources`,
    publisher: {
      "@type": "Organization",
      name: "SkillLinkup",
      logo: {
        "@type": "ImageObject",
        url: "https://skilllinkup.com/images/logo/skilllinkup-transparant-rozepunt.webp",
      },
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: 57,
      itemListElement: SEO_NAVIGATION.flatMap((pillar, pillarIndex) =>
        pillar.subPillars.map((sub, subIndex) => {
          const translated = getGuideTranslation(sub.slug);
          return {
            "@type": "ListItem",
            position: pillarIndex * 5 + subIndex + 1,
            item: {
              "@type": "Article",
              name: translated.name,
              url: `https://skilllinkup.com/${locale}${sub.slug}`,
              description: translated.description,
            },
          };
        })
      ),
    },
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background-white to-accent/5 dark:from-primary/5 dark:via-gray-900 dark:to-accent/5 py-20 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 dark:bg-accent/20 text-accent dark:text-accent-light text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                {t("badge")}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-text-primary dark:text-white mb-6">
                {t("title")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  {t("titleHighlight")}
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-text-secondary dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                {t("subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#guides"
                  className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark px-8 py-3 text-base font-heading font-semibold text-white transition-colors shadow-lg"
                >
                  {t("browseAllGuides")}
                </Link>
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 hover:bg-background-light dark:hover:bg-gray-700 px-8 py-3 text-base font-heading font-semibold text-text-primary dark:text-white border border-background-gray dark:border-gray-700 transition-colors"
                >
                  {t("comparePlatforms")}
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white dark:bg-gray-900 border-y border-background-gray dark:border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-heading font-bold text-primary dark:text-primary-light mb-2">55+</div>
                <div className="text-sm text-text-secondary dark:text-gray-400">{t("stats.expertGuides")}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-heading font-bold text-accent dark:text-accent-light mb-2">10</div>
                <div className="text-sm text-text-secondary dark:text-gray-400">{t("stats.topicCategories")}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-heading font-bold text-primary dark:text-primary-light mb-2">20+</div>
                <div className="text-sm text-text-secondary dark:text-gray-400">{t("stats.platformsCovered")}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-heading font-bold text-accent dark:text-accent-light mb-2">100%</div>
                <div className="text-sm text-text-secondary dark:text-gray-400">{t("stats.freeContent")}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Guides Grid */}
        <section id="guides" className="py-20 bg-background-light dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {SEO_NAVIGATION.map((pillar) => (
                <div key={pillar.id}>
                  {/* Pillar Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-5xl">{pillar.icon}</span>
                    <div>
                      <h2 className="text-3xl font-heading font-bold text-text-primary dark:text-white">
                        {getCategoryName(pillar.id)}
                      </h2>
                      <p className="text-text-secondary dark:text-gray-400 mt-1">
                        {pillar.subPillars.length} {t("comprehensiveGuides")}
                      </p>
                    </div>
                  </div>

                  {/* Subpillar Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pillar.subPillars.map((sub) => {
                      const translated = getGuideTranslation(sub.slug);
                      return (
                        <Link
                          key={sub.slug}
                          href={`/${locale}${sub.slug}`}
                          className="group block bg-white dark:bg-gray-900 rounded-lg border border-background-gray dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-all hover:shadow-lg p-6"
                        >
                          <h3 className="text-lg font-heading font-semibold text-text-primary dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors mb-2">
                            {translated.name}
                          </h3>
                          <p className="text-sm text-text-secondary dark:text-gray-400 mb-4">
                            {translated.description}
                          </p>
                          <div className="flex items-center text-primary dark:text-primary-light text-sm font-medium">
                            {t("readGuide")}
                            <svg
                              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary-dark dark:from-primary-dark dark:to-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
                {t("cta.title")}
              </h2>
              <p className="text-lg text-white/90 mb-8">
                {t("cta.subtitle")}
              </p>
              <Link
                href={`/${locale}/newsletter`}
                className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-background-light px-8 py-3 text-base font-heading font-semibold text-primary transition-colors shadow-lg"
              >
                {t("cta.button")}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
