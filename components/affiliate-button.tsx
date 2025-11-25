'use client';

import { useCallback } from 'react';

interface AffiliateButtonProps {
  platformId: string;
  platformName: string;
  affiliateLink: string | null;
  websiteUrl: string | null;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'sidebar';
}

export function AffiliateButton({
  platformId,
  platformName,
  affiliateLink,
  websiteUrl,
  children,
  className = '',
  variant = 'primary',
}: AffiliateButtonProps) {
  // Use affiliate link if available, otherwise fallback to website URL
  const targetUrl = affiliateLink || websiteUrl;

  const handleClick = useCallback(async () => {
    if (!targetUrl) return;

    // Track the click asynchronously (don't block navigation)
    try {
      // Use sendBeacon for reliable tracking even during navigation
      const data = JSON.stringify({
        platform_id: platformId,
        platform_name: platformName,
        link_type: affiliateLink ? 'affiliate' : 'direct',
        url: targetUrl,
      });

      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/track/affiliate-click', data);
      } else {
        // Fallback for older browsers
        fetch('/api/track/affiliate-click', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: data,
          keepalive: true,
        });
      }
    } catch (error) {
      // Don't block navigation on tracking errors
      console.error('Failed to track affiliate click:', error);
    }
  }, [platformId, platformName, affiliateLink, targetUrl]);

  if (!targetUrl) {
    return null;
  }

  // Determine styling based on variant
  const baseStyles = {
    primary: 'inline-flex items-center justify-center gap-2 rounded-lg bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 px-8 py-3 font-heading font-semibold text-primary dark:text-accent-light transition-all shadow-lg',
    secondary: 'inline-flex items-center gap-1 text-primary hover:text-primary-dark dark:text-accent-light dark:hover:text-accent font-semibold transition-colors',
    sidebar: 'inline-flex items-center justify-center w-full rounded-lg bg-primary hover:bg-primary-dark dark:bg-accent dark:hover:bg-accent-dark px-4 py-2.5 text-sm font-heading font-semibold text-white transition-all shadow-md',
  };

  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      className={`${baseStyles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

// Simple CTA button for quick use
interface AffiliateCTAProps {
  platform: {
    id: string;
    name: string;
    affiliate_link: string | null;
    website_url: string | null;
  };
  label?: string;
  variant?: 'primary' | 'secondary' | 'sidebar';
  className?: string;
  showIcon?: boolean;
}

export function AffiliateCTA({
  platform,
  label = 'Visit Platform',
  variant = 'primary',
  className = '',
  showIcon = true,
}: AffiliateCTAProps) {
  const isAffiliate = !!platform.affiliate_link;

  return (
    <AffiliateButton
      platformId={platform.id}
      platformName={platform.name}
      affiliateLink={platform.affiliate_link}
      websiteUrl={platform.website_url}
      variant={variant}
      className={className}
    >
      {label}
      {showIcon && (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      )}
      {isAffiliate && (
        <span className="sr-only">(affiliate link)</span>
      )}
    </AffiliateButton>
  );
}
