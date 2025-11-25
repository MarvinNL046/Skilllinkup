"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { SEO_NAVIGATION, type Pillar, type SubPillar } from "@/lib/seo-navigation-data";

// Re-export for backward compatibility
export { SEO_NAVIGATION } from "@/lib/seo-navigation-data";

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
  "/resources/best-freelance-platforms-web-developers-2025": { category: "nicheGuides", guide: "forDevelopers" },
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


interface SeoMegaMenuProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export function SeoMegaMenu({ isMobile = false, onLinkClick }: SeoMegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations("seoNavigation");
  const tResources = useTranslations("resourcesPage");

  // Helper to get translated category name
  const getCategoryName = (pillarId: number): string => {
    const key = CATEGORY_KEYS[pillarId];
    if (key) {
      try {
        return t(`categories.${key}.name`);
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
          name: t(`categories.${mapping.category}.guides.${mapping.guide}.name`),
          description: t(`categories.${mapping.category}.guides.${mapping.guide}.description`),
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

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setActiveColumn(null);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
    setActiveColumn(null);
    onLinkClick?.();
  };

  // Desktop megamenu
  if (!isMobile) {
    return (
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm font-medium text-text-secondary dark:text-[#ff4085] hover:text-[#ef2b70] dark:hover:text-[#ef2b70] transition-colors flex items-center gap-1"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {t("guides")}
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div
            ref={menuRef}
            className="absolute left-1/2 -translate-x-1/2 mt-2 w-screen max-w-7xl bg-white dark:bg-gray-900 border border-background-gray dark:border-gray-800 rounded-lg shadow-xl z-50"
          >
            <div className="grid grid-cols-5 gap-4 p-6">
              {SEO_NAVIGATION.map((pillar) => (
                <div key={pillar.id} className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-background-gray dark:border-gray-800">
                    <span className="text-2xl">{pillar.icon}</span>
                    <h3 className="font-heading font-semibold text-sm text-text-primary dark:text-white">
                      {getCategoryName(pillar.id)}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {pillar.subPillars.map((sub) => {
                      const translated = getGuideTranslation(sub.slug);
                      return (
                        <li key={sub.slug}>
                          <Link
                            href={sub.slug}
                            onClick={handleLinkClick}
                            className="block text-xs text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors group"
                          >
                            <span className="font-medium group-hover:underline">{translated.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="border-t border-background-gray dark:border-gray-800 bg-background-tint dark:bg-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-text-primary dark:text-white">
                    {tResources("browseAll")}
                  </p>
                  <p className="text-xs text-text-secondary dark:text-gray-400">
                    {tResources("expertInsights")}
                  </p>
                </div>
                <Link
                  href="/resources"
                  onClick={handleLinkClick}
                  className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark px-4 py-2 text-sm font-heading font-semibold text-white transition-colors shadow-lg"
                >
                  {tResources("viewAllGuides")} →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Mobile accordion menu
  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left text-sm font-medium text-text-secondary dark:text-[#ff4085] hover:text-[#ef2b70] dark:hover:text-[#ef2b70] px-2 py-1 flex items-center justify-between"
      >
        <span>{t("guides")}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="pl-4 space-y-3">
          {SEO_NAVIGATION.map((pillar) => (
            <div key={pillar.id}>
              <button
                onClick={() => setActiveColumn(activeColumn === pillar.id ? null : pillar.id)}
                className="w-full text-left flex items-center gap-2 text-sm font-semibold text-text-primary dark:text-white py-1"
              >
                <span>{pillar.icon}</span>
                <span>{getCategoryName(pillar.id)}</span>
                <svg
                  className={`w-3 h-3 ml-auto transition-transform ${
                    activeColumn === pillar.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {activeColumn === pillar.id && (
                <ul className="pl-8 mt-2 space-y-2">
                  {pillar.subPillars.map((sub) => {
                    const translated = getGuideTranslation(sub.slug);
                    return (
                      <li key={sub.slug}>
                        <Link
                          href={sub.slug}
                          onClick={handleLinkClick}
                          className="block text-xs text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors py-1"
                        >
                          {translated.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}

          <Link
            href="/resources"
            onClick={handleLinkClick}
            className="block text-sm font-semibold text-primary hover:text-primary-dark transition-colors py-2"
          >
            {tResources("viewAllGuides")} →
          </Link>
        </div>
      )}
    </div>
  );
}
