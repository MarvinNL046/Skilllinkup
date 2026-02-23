import { NextRequest, NextResponse } from 'next/server';
import { geocodeAddress } from '@/lib/geocoding';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/geocode?q=Amsterdam
// Proxies to Nominatim so the browser does not hit it directly (avoids CORS and rate-limit issues)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') ?? '';

  if (!q.trim()) {
    return NextResponse.json({ error: 'q parameter is required' }, { status: 400 });
  }

  const coords = await geocodeAddress(q.trim());
  if (!coords) {
    return NextResponse.json({ error: 'Location not found' }, { status: 404 });
  }

  return NextResponse.json(coords);
}
