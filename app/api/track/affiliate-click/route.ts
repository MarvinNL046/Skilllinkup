import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Affiliate click tracking — currently logs only.
// TODO: Add affiliateClicks table to Convex schema and persist data.
export async function POST(request: NextRequest) {
 try {
   let data;
   const contentType = request.headers.get('content-type');

   if (contentType?.includes('application/json')) {
     data = await request.json();
   } else {
     const text = await request.text();
     data = JSON.parse(text);
   }

   console.log('Affiliate click:', {
     platform: data.platform_name,
     link_type: data.link_type,
     url: data.url,
   });

   return NextResponse.json({ success: true });
 } catch (error) {
   console.error('Affiliate click tracking error:', error);
   return NextResponse.json({ success: true });
 }
}

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
