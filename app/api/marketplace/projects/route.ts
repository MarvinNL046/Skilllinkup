import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth } from '@/lib/auth-helpers';
import { getOpenProjects } from '@/lib/marketplace-queries';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/marketplace/projects
// Returns paginated list of open projects with optional filters
export async function GET(request: NextRequest) {
 try {
 const { searchParams } = new URL(request.url);

 const limit = Math.min(parseInt(searchParams.get('limit') ?? '20', 10), 100);
 const offset = Math.max(parseInt(searchParams.get('offset') ?? '0', 10), 0);
 const locale = searchParams.get('locale') ?? 'en';

 const projects = await getOpenProjects(limit, offset, locale);

 return NextResponse.json({ projects });
 } catch (error) {
 console.error('GET /api/marketplace/projects error:', error);
 return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
 }
}

// POST /api/marketplace/projects
// Create a new project (requires authentication)
export async function POST(request: NextRequest) {
 try {
 const user = await requireAuth();
 const body = await request.json();

 // Validation
 const title = String(body.title ?? '').trim();
 if (title.length < 5) {
 return NextResponse.json(
 { error: 'Title must be at least 5 characters' },
 { status: 400 }
 );
 }

 const description = String(body.description ?? '').trim();
 if (description.length < 20) {
 return NextResponse.json(
 { error: 'Description must be at least 20 characters' },
 { status: 400 }
 );
 }

 const locale = body.locale ?? 'en';
 const workType = body.work_type ?? 'remote';
 const currency = body.currency ?? 'EUR';

 const requiredSkills = Array.isArray(body.required_skills)
 ? body.required_skills.filter((s: unknown) =>typeof s === 'string' && s.trim())
 : [];

 const budgetMin =
 body.budget_min !== null && body.budget_min !== undefined
 ? Number(body.budget_min)
 : null;
 const budgetMax =
 body.budget_max !== null && body.budget_max !== undefined
 ? Number(body.budget_max)
 : null;

 if (budgetMin !== null && isNaN(budgetMin)) {
 return NextResponse.json(
 { error: 'budget_min must be a number' },
 { status: 400 }
 );
 }
 if (budgetMax !== null && isNaN(budgetMax)) {
 return NextResponse.json(
 { error: 'budget_max must be a number' },
 { status: 400 }
 );
 }
 if (budgetMin !== null && budgetMax !== null && budgetMin >budgetMax) {
 return NextResponse.json(
 { error: 'budget_min cannot be greater than budget_max' },
 { status: 400 }
 );
 }

 // Generate unique slug
 const slug =
 title
 .toLowerCase()
 .replace(/[^a-z0-9]+/g, '-')
 .replace(/(^-|-$)/g, '')
 .slice(0, 80) +
 '-' +
 Math.random().toString(36).slice(2, 7);

 // Get tenant_id from user record
 const userRows = await sql`
 SELECT tenant_id FROM users WHERE id = ${user.id} LIMIT 1
 `;
 const tenantId = userRows[0]?.tenant_id ?? null;

 const deadline = body.deadline ? String(body.deadline) : null;
 const categoryId = body.category_id ? String(body.category_id) : null;

 // Insert project
 const rows = await sql`
 INSERT INTO projects (
 tenant_id,
 client_id,
 title,
 slug,
 description,
 category_id,
 required_skills,
 budget_min,
 budget_max,
 currency,
 deadline,
 work_type,
 location_city,
 location_country,
 location_postcode,
 attachments,
 bid_count,
 views,
 status,
 locale,
 published_at
 ) VALUES (
 ${tenantId},
 ${user.id},
 ${title},
 ${slug},
 ${description},
 ${categoryId},
 ${JSON.stringify(requiredSkills)}::TEXT[],
 ${budgetMin},
 ${budgetMax},
 ${currency},
 ${deadline},
 ${workType},
 ${body.location_city ? String(body.location_city).trim() : null},
 ${body.location_country ? String(body.location_country).trim() : null},
 ${body.location_postcode ? String(body.location_postcode).trim() : null},
 '[]'::JSONB,
 0,
 0,
 'open',
 ${locale},
 NOW()
 )
 RETURNING id, title, slug, status, created_at
 `;

 const project = rows[0];

 return NextResponse.json(
 { project, message: 'Project created successfully' },
 { status: 201 }
 );
 } catch (err) {
 if (err instanceof Error && err.message === 'Unauthorized') {
 return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
 }
 console.error('POST /api/marketplace/projects error:', err);
 return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
 }
}
