import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/marketplace/freelancers/nearby
// Query params:
// lat - latitude (required)
// lon - longitude (required)
// radius - search radius in km (default: 25)
// limit - max results (default: 20, max: 100)
// offset - pagination offset (default: 0)
// skill - filter by skill
// workType - filter by work_type ('local' | 'hybrid')
export async function GET(request: NextRequest) {
 try {
 const { searchParams } = new URL(request.url);

 const lat = parseFloat(searchParams.get('lat') ?? '');
 const lon = parseFloat(searchParams.get('lon') ?? '');

 if (isNaN(lat) || isNaN(lon)) {
 return NextResponse.json(
 { error: 'lat and lon query parameters are required and must be valid numbers' },
 { status: 400 }
 );
 }

 const radius = Math.min(
 Math.max(parseFloat(searchParams.get('radius') ?? '25'), 1),
 500
 );
 const limit = Math.min(parseInt(searchParams.get('limit') ?? '20', 10), 100);
 const offset = Math.max(parseInt(searchParams.get('offset') ?? '0', 10), 0);
 const skill = searchParams.get('skill') ?? null;
 const workType = searchParams.get('workType') ?? null;

 // Build the inner query using the Haversine formula.
 // PostgreSQL does not allow filtering on computed column aliases in WHERE/HAVING
 // of the same query level, so we wrap it in a subquery.
 let rows;

 if (skill && workType) {
 rows = await sql`
 SELECT *
 FROM (
 SELECT
 fp.id,
 fp.user_id,
 fp.display_name,
 fp.tagline,
 fp.avatar_url,
 fp.hourly_rate,
 fp.work_type,
 fp.location_city,
 fp.location_country,
 fp.location_postcode,
 fp.service_radius_km,
 fp.skills,
 fp.languages,
 fp.is_verified,
 fp.is_available,
 fp.rating_average,
 fp.rating_count,
 fp.total_orders,
 fp.completion_rate,
 fp.response_time_hours,
 fp.status,
 fp.latitude,
 fp.longitude,
 u.name AS user_name,
 (
 6371 * acos(
 LEAST(
 1.0,
 cos(radians(${lat})) * cos(radians(fp.latitude))
 * cos(radians(fp.longitude) - radians(${lon}))
 + sin(radians(${lat})) * sin(radians(fp.latitude))
 )
 )
 ) AS distance_km
 FROM freelancer_profiles fp
 JOIN users u ON fp.user_id = u.id
 WHERE
 fp.status = 'active'
 AND fp.work_type = ${workType}
 AND fp.latitude IS NOT NULL
 AND fp.longitude IS NOT NULL
 AND ${skill} = ANY(fp.skills)
 ) sub
 WHERE sub.distance_km <= ${radius}
 ORDER BY sub.distance_km ASC
 LIMIT ${limit}
 OFFSET ${offset}
 `;
 } else if (skill) {
 rows = await sql`
 SELECT *
 FROM (
 SELECT
 fp.id,
 fp.user_id,
 fp.display_name,
 fp.tagline,
 fp.avatar_url,
 fp.hourly_rate,
 fp.work_type,
 fp.location_city,
 fp.location_country,
 fp.location_postcode,
 fp.service_radius_km,
 fp.skills,
 fp.languages,
 fp.is_verified,
 fp.is_available,
 fp.rating_average,
 fp.rating_count,
 fp.total_orders,
 fp.completion_rate,
 fp.response_time_hours,
 fp.status,
 fp.latitude,
 fp.longitude,
 u.name AS user_name,
 (
 6371 * acos(
 LEAST(
 1.0,
 cos(radians(${lat})) * cos(radians(fp.latitude))
 * cos(radians(fp.longitude) - radians(${lon}))
 + sin(radians(${lat})) * sin(radians(fp.latitude))
 )
 )
 ) AS distance_km
 FROM freelancer_profiles fp
 JOIN users u ON fp.user_id = u.id
 WHERE
 fp.status = 'active'
 AND fp.work_type IN ('local', 'hybrid')
 AND fp.latitude IS NOT NULL
 AND fp.longitude IS NOT NULL
 AND ${skill} = ANY(fp.skills)
 ) sub
 WHERE sub.distance_km <= ${radius}
 ORDER BY sub.distance_km ASC
 LIMIT ${limit}
 OFFSET ${offset}
 `;
 } else if (workType) {
 rows = await sql`
 SELECT *
 FROM (
 SELECT
 fp.id,
 fp.user_id,
 fp.display_name,
 fp.tagline,
 fp.avatar_url,
 fp.hourly_rate,
 fp.work_type,
 fp.location_city,
 fp.location_country,
 fp.location_postcode,
 fp.service_radius_km,
 fp.skills,
 fp.languages,
 fp.is_verified,
 fp.is_available,
 fp.rating_average,
 fp.rating_count,
 fp.total_orders,
 fp.completion_rate,
 fp.response_time_hours,
 fp.status,
 fp.latitude,
 fp.longitude,
 u.name AS user_name,
 (
 6371 * acos(
 LEAST(
 1.0,
 cos(radians(${lat})) * cos(radians(fp.latitude))
 * cos(radians(fp.longitude) - radians(${lon}))
 + sin(radians(${lat})) * sin(radians(fp.latitude))
 )
 )
 ) AS distance_km
 FROM freelancer_profiles fp
 JOIN users u ON fp.user_id = u.id
 WHERE
 fp.status = 'active'
 AND fp.work_type = ${workType}
 AND fp.latitude IS NOT NULL
 AND fp.longitude IS NOT NULL
 ) sub
 WHERE sub.distance_km <= ${radius}
 ORDER BY sub.distance_km ASC
 LIMIT ${limit}
 OFFSET ${offset}
 `;
 } else {
 rows = await sql`
 SELECT *
 FROM (
 SELECT
 fp.id,
 fp.user_id,
 fp.display_name,
 fp.tagline,
 fp.avatar_url,
 fp.hourly_rate,
 fp.work_type,
 fp.location_city,
 fp.location_country,
 fp.location_postcode,
 fp.service_radius_km,
 fp.skills,
 fp.languages,
 fp.is_verified,
 fp.is_available,
 fp.rating_average,
 fp.rating_count,
 fp.total_orders,
 fp.completion_rate,
 fp.response_time_hours,
 fp.status,
 fp.latitude,
 fp.longitude,
 u.name AS user_name,
 (
 6371 * acos(
 LEAST(
 1.0,
 cos(radians(${lat})) * cos(radians(fp.latitude))
 * cos(radians(fp.longitude) - radians(${lon}))
 + sin(radians(${lat})) * sin(radians(fp.latitude))
 )
 )
 ) AS distance_km
 FROM freelancer_profiles fp
 JOIN users u ON fp.user_id = u.id
 WHERE
 fp.status = 'active'
 AND fp.work_type IN ('local', 'hybrid')
 AND fp.latitude IS NOT NULL
 AND fp.longitude IS NOT NULL
 ) sub
 WHERE sub.distance_km <= ${radius}
 ORDER BY sub.distance_km ASC
 LIMIT ${limit}
 OFFSET ${offset}
 `;
 }

 return NextResponse.json({
 freelancers: rows,
 meta: {
 lat,
 lon,
 radius,
 limit,
 offset,
 count: rows.length,
 },
 });
 } catch (error) {
 console.error('GET /api/marketplace/freelancers/nearby error:', error);
 return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
 }
}
