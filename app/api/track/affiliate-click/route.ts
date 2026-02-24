import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export const runtime = 'edge';

// Get database connection
const sql = neon(process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL || '');

export async function POST(request: NextRequest) {
 try {
 // Parse the request body (handles both JSON and sendBeacon)
 let data;
 const contentType = request.headers.get('content-type');

 if (contentType?.includes('application/json')) {
 data = await request.json();
 } else {
 // sendBeacon sends as text/plain
 const text = await request.text();
 data = JSON.parse(text);
 }

 const {
 platform_id,
 platform_name,
 link_type,
 url,
 } = data;

 // Get request metadata
 const userAgent = request.headers.get('user-agent') || '';
 const referer = request.headers.get('referer') || '';
 const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
 request.headers.get('x-real-ip') ||
 'unknown';

 // Insert tracking record
 await sql`
 INSERT INTO affiliate_clicks (
 platform_id,
 platform_name,
 link_type,
 destination_url,
 ip_address,
 user_agent,
 referer,
 clicked_at
 ) VALUES (
 ${platform_id},
 ${platform_name},
 ${link_type},
 ${url},
 ${ip},
 ${userAgent},
 ${referer},
 NOW()
 )
 `;

 return NextResponse.json({ success: true });
 } catch (error) {
 // Log error but don't expose details
 console.error('Affiliate click tracking error:', error);

 // Return success anyway to not block user navigation
 return NextResponse.json({ success: true });
 }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
 return new NextResponse(null, {
 status: 200,
 headers: {
 'Access-Control-Allow-Origin': '*',
 'Access-Control-Allow-Methods': 'POST, OPTIONS',
 'Access-Control-Allow-Headers': 'Content-Type',
 },
 });
}
