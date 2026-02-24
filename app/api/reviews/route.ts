import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST - Create a new review
export async function POST(request: NextRequest) {
 try {
 const body = await request.json();

 // Validate required fields
 const { platformId, userName, title, content, overallRating, locale } = body;

 if (!platformId || !userName || !title || !content || !overallRating) {
 return NextResponse.json(
 { error: 'Missing required fields: platformId, userName, title, content, overallRating' },
 { status: 400 }
 );
 }

 // Validate locale (default to 'en')
 const validLocale = ['en', 'nl'].includes(locale) ? locale : 'en';

 // Validate rating ranges
 const ratings = ['overallRating', 'easeOfUseRating', 'supportRating', 'valueRating'];
 for (const rating of ratings) {
 if (body[rating] && (body[rating] < 1 || body[rating] >5)) {
 return NextResponse.json(
 { error: `${rating} must be between 1 and 5` },
 { status: 400 }
 );
 }
 }

 // Verify platform exists
 const platformCheck = await sql`
 SELECT id FROM platforms WHERE id = ${platformId}
 `;

 if (platformCheck.length === 0) {
 return NextResponse.json(
 { error: 'Platform not found' },
 { status: 404 }
 );
 }

 // Insert the review (status = 'pending' for moderation)
 const result = await sql`
 INSERT INTO reviews (
 platform_id,
 user_id,
 user_name,
 user_avatar,
 user_role,
 title,
 content,
 overall_rating,
 ease_of_use_rating,
 support_rating,
 value_rating,
 pros,
 cons,
 project_type,
 earnings_range,
 years_experience,
 verified,
 helpful_count,
 status,
 locale,
 created_at,
 updated_at
 ) VALUES (
 ${platformId},
 ${`anon-${Date.now()}`},
 ${userName},
 ${null},
 ${body.userRole || null},
 ${title},
 ${content},
 ${overallRating},
 ${body.easeOfUseRating || overallRating},
 ${body.supportRating || overallRating},
 ${body.valueRating || overallRating},
 ${JSON.stringify(body.pros || [])},
 ${JSON.stringify(body.cons || [])},
 ${body.projectType || null},
 ${body.earningsRange || null},
 ${body.yearsExperience || null},
 ${false},
 ${0},
 ${'pending'},
 ${validLocale},
 NOW(),
 NOW()
 )
 RETURNING id
 `;

 return NextResponse.json({
 success: true,
 message: 'Review submitted successfully and pending approval',
 reviewId: result[0].id,
 });
 } catch (error) {
 console.error('Error creating review:', error);
 return NextResponse.json(
 { error: 'Failed to submit review' },
 { status: 500 }
 );
 }
}

// GET - Fetch reviews (with optional platformId and locale filter)
export async function GET(request: NextRequest) {
 try {
 const { searchParams } = new URL(request.url);
 const platformId = searchParams.get('platformId');
 const locale = searchParams.get('locale') || 'en';
 const status = searchParams.get('status') || 'approved';
 const limit = parseInt(searchParams.get('limit') || '50');
 const offset = parseInt(searchParams.get('offset') || '0');

 let reviews;

 if (platformId) {
 reviews = await sql`
 SELECT
 r.*,
 p.name as platform_name,
 p.slug as platform_slug
 FROM reviews r
 LEFT JOIN platforms p ON r.platform_id = p.id AND p.locale = ${locale}
 WHERE r.platform_id = ${platformId}
 AND r.status = ${status}
 AND r.locale = ${locale}
 ORDER BY r.created_at DESC
 LIMIT ${limit}
 OFFSET ${offset}
 `;
 } else {
 reviews = await sql`
 SELECT
 r.*,
 p.name as platform_name,
 p.slug as platform_slug
 FROM reviews r
 LEFT JOIN platforms p ON r.platform_id = p.id AND p.locale = ${locale}
 WHERE r.status = ${status}
 AND r.locale = ${locale}
 ORDER BY r.created_at DESC
 LIMIT ${limit}
 OFFSET ${offset}
 `;
 }

 // Parse JSONB fields
 const parsedReviews = reviews.map(review =>({
 ...review,
 pros: typeof review.pros === 'string' ? JSON.parse(review.pros) : review.pros || [],
 cons: typeof review.cons === 'string' ? JSON.parse(review.cons) : review.cons || [],
 }));

 return NextResponse.json({
 reviews: parsedReviews,
 count: parsedReviews.length,
 });
 } catch (error) {
 console.error('Error fetching reviews:', error);
 return NextResponse.json(
 { error: 'Failed to fetch reviews' },
 { status: 500 }
 );
 }
}
