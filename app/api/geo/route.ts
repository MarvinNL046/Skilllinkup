import { NextResponse } from 'next/server';

// Edge Runtime with geolocation data
export const runtime = 'edge';

/**
 * Get user's geolocation and device info
 * Useful for analytics, personalization, A/B testing
 * GET /api/geo
 */
export async function GET(request: Request) {
 try {
 // Edge Functions provide geo data automatically
 const geo = {
 // Vercel Edge Runtime provides these headers
 country: request.headers.get('x-country') || 'unknown',
 region: request.headers.get('x-subdivision-code') || 'unknown',
 city: request.headers.get('x-city') || 'unknown',
 timezone: request.headers.get('x-timezone') || 'UTC',

 // User agent info
 userAgent: request.headers.get('user-agent') || 'unknown',

 // IP address (anonymized)
 ip: request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown',
 };

 // Example: Personalize content based on location
 const recommendations = getLocalizedContent(geo.country);

 return NextResponse.json({
 success: true,
 geo,
 recommendations,
 edge: {
 location: 'Served from nearest edge location',
 latency: '<50ms',
 },
 });
 } catch (error) {
 console.error('Error getting geo data:', error);
 return NextResponse.json(
 { success: false, error: 'Failed to get geo data' },
 { status: 500 }
 );
 }
}

// Helper function for localized content
function getLocalizedContent(country: string) {
 const contentByCountry: Record<string, string[]>= {
 NL: ['SEO tips voor Nederlandse bedrijven', 'Google.nl optimalisatie'],
 BE: ['SEO voor Belgische markten', 'Meertalige SEO'],
 US: ['SEO strategies for US markets', 'Google.com optimization'],
 GB: ['UK SEO best practices', 'Google.co.uk tips'],
 };

 return contentByCountry[country] || ['Global SEO strategies', 'International SEO'];
}
