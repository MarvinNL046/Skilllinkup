// Shared email style constants for SkillLinkup
// Extracted from welcome.tsx - used by all marketplace email templates

import type React from 'react';

// Brand colors
export const colors = {
 primary: '#ef2b70',
 secondary: '#1e1541',
 accent: '#22c55e',
 amber: '#f59e0b',
 background: '#f8f9fb',
 white: '#ffffff',
 text: '#1e1541',
 textMuted: '#64607d',
 textLight: '#9691ad',
 border: '#e5e7eb',
} as const;

export const fontFamily =
 '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

// Layout styles
export const main: React.CSSProperties = {
 backgroundColor: colors.background,
 fontFamily,
};

export const container: React.CSSProperties = {
 backgroundColor: colors.white,
 margin: '0 auto',
 maxWidth: '600px',
};

// Header
export const header: React.CSSProperties = {
 backgroundColor: colors.secondary,
 padding: '24px 32px',
 textAlign: 'center' as const,
};

export const logo: React.CSSProperties = {
 margin: '0 auto',
 filter: 'brightness(0) invert(1)',
};

// Hero
export const heroSection: React.CSSProperties = {
 backgroundColor: colors.primary,
 padding: '48px 32px',
 textAlign: 'center' as const,
};

export const heroTitle: React.CSSProperties = {
 color: colors.white,
 fontSize: '32px',
 fontWeight: '700',
 lineHeight: '1.2',
 margin: '0 0 12px 0',
};

export const heroSubtitle: React.CSSProperties = {
 color: 'rgba(255, 255, 255, 0.9)',
 fontSize: '18px',
 fontWeight: '400',
 lineHeight: '1.5',
 margin: '0',
};

// Content
export const contentSection: React.CSSProperties = {
 padding: '32px 32px 16px 32px',
};

export const paragraph: React.CSSProperties = {
 color: colors.text,
 fontSize: '16px',
 lineHeight: '1.6',
 margin: '0 0 16px 0',
};

// CTA Button
export const ctaButton: React.CSSProperties = {
 backgroundColor: colors.primary,
 borderRadius: '8px',
 color: colors.white,
 display: 'inline-block',
 fontSize: '16px',
 fontWeight: '600',
 padding: '14px 32px',
 textDecoration: 'none',
};

// Divider
export const divider: React.CSSProperties = {
 borderColor: colors.border,
 borderStyle: 'solid',
 borderWidth: '1px 0 0 0',
 margin: '0',
};

// Footer
export const footer: React.CSSProperties = {
 backgroundColor: colors.background,
 padding: '32px',
 textAlign: 'center' as const,
};

export const footerLogo: React.CSSProperties = {
 margin: '0 auto 16px auto',
 opacity: 0.7,
};

export const footerText: React.CSSProperties = {
 color: colors.textMuted,
 fontSize: '13px',
 lineHeight: '1.5',
 margin: '0 0 12px 0',
};

export const footerLink: React.CSSProperties = {
 color: colors.primary,
 textDecoration: 'none',
};

export const copyright: React.CSSProperties = {
 color: colors.textLight,
 fontSize: '12px',
 margin: '0',
};

// Info box (for order details, form data, etc.)
export const infoBox: React.CSSProperties = {
 backgroundColor: colors.background,
 borderRadius: '12px',
 padding: '20px 24px',
 margin: '16px 0',
};

export const infoLabel: React.CSSProperties = {
 color: colors.textMuted,
 fontSize: '13px',
 fontWeight: '500',
 margin: '0 0 4px 0',
};

export const infoValue: React.CSSProperties = {
 color: colors.text,
 fontSize: '16px',
 fontWeight: '600',
 margin: '0 0 12px 0',
};
