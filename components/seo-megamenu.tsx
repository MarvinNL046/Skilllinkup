"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { SEO_NAVIGATION, type Pillar, type SubPillar } from "@/lib/seo-navigation-data";

// Re-export for backward compatibility
export { SEO_NAVIGATION } from "@/lib/seo-navigation-data";


interface SeoMegaMenuProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export function SeoMegaMenu({ isMobile = false, onLinkClick }: SeoMegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
          Guides
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
                      {pillar.name}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {pillar.subPillars.map((sub) => (
                      <li key={sub.slug}>
                        <Link
                          href={sub.slug}
                          onClick={handleLinkClick}
                          className="block text-xs text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors group"
                        >
                          <span className="font-medium group-hover:underline">{sub.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="border-t border-background-gray dark:border-gray-800 bg-background-tint dark:bg-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-text-primary dark:text-white">
                    Browse All 50+ Freelance Guides
                  </p>
                  <p className="text-xs text-text-secondary dark:text-gray-400">
                    Expert insights to help you succeed on any platform
                  </p>
                </div>
                <Link
                  href="/seo"
                  onClick={handleLinkClick}
                  className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark px-4 py-2 text-sm font-heading font-semibold text-white transition-colors shadow-lg"
                >
                  View All Guides →
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
        <span>Guides</span>
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
                <span>{pillar.name}</span>
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
                  {pillar.subPillars.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={sub.slug}
                        onClick={handleLinkClick}
                        className="block text-xs text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors py-1"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <Link
            href="/seo"
            onClick={handleLinkClick}
            className="block text-sm font-semibold text-primary hover:text-primary-dark transition-colors py-2"
          >
            View All 50+ Guides →
          </Link>
        </div>
      )}
    </div>
  );
}
