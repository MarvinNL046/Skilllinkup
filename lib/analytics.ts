/**
 * Analytics utility functions for Google Tag Manager dataLayer
 *
 * Usage:
 * import { trackEvent, trackConversion } from '@/lib/analytics';
 *
 * trackEvent('button_click', { button_name: 'cta_hero' });
 * trackConversion('newsletter_signup', { method: 'footer' });
 */

// Extend Window interface for dataLayer
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Push a custom event to the GTM dataLayer
 */
export function trackEvent(
  eventName: string,
  params?: EventParams
): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });
}

/**
 * Track a conversion event (newsletter signup, form submission, etc.)
 */
export function trackConversion(
  conversionType: 'newsletter_signup' | 'contact_form' | 'tool_usage' | 'platform_click',
  params?: EventParams
): void {
  trackEvent('conversion', {
    conversion_type: conversionType,
    ...params,
  });
}

/**
 * Track a CTA button click
 */
export function trackCTAClick(
  ctaName: string,
  ctaLocation: string,
  destinationUrl?: string
): void {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation,
    destination_url: destinationUrl,
  });
}

/**
 * Track outbound/affiliate link clicks
 */
export function trackOutboundLink(
  platformName: string,
  linkUrl: string,
  linkLocation: string
): void {
  trackEvent('outbound_link', {
    platform_name: platformName,
    link_url: linkUrl,
    link_location: linkLocation,
  });
}

/**
 * Track tool usage (calculator, invoice generator, etc.)
 */
export function trackToolUsage(
  toolName: string,
  action: 'start' | 'complete' | 'export',
  params?: EventParams
): void {
  trackEvent('tool_usage', {
    tool_name: toolName,
    tool_action: action,
    ...params,
  });
}

/**
 * Track page engagement (scroll depth, time on page)
 */
export function trackEngagement(
  engagementType: 'scroll_depth' | 'time_on_page',
  value: number,
  pagePath?: string
): void {
  trackEvent('engagement', {
    engagement_type: engagementType,
    engagement_value: value,
    page_path: pagePath || (typeof window !== 'undefined' ? window.location.pathname : ''),
  });
}
