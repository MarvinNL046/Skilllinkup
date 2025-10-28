import { NextRequest, NextResponse } from 'next/server';
import { getActiveAds } from '@/lib/queries';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

/**
 * GET /api/ads/active?placement=tools_listing
 * Fetch active ads for a specific placement
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const placement = searchParams.get('placement');

    if (!placement) {
      return NextResponse.json(
        { error: 'Placement parameter is required' },
        { status: 400 }
      );
    }

    // Validate placement
    const validPlacements = ['tools_listing', 'tools_detail', 'blog_sidebar'];
    if (!validPlacements.includes(placement)) {
      return NextResponse.json(
        { error: `Invalid placement. Must be one of: ${validPlacements.join(', ')}` },
        { status: 400 }
      );
    }

    console.log(`📢 Fetching active ads for placement: ${placement}`);

    const ads = await getActiveAds(placement);

    console.log(`✅ Found ${ads.length} active ads for ${placement}`);

    return NextResponse.json({
      ads,
      count: ads.length,
    });
  } catch (error) {
    console.error('❌ Error fetching active ads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ads', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
