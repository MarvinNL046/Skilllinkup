import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import crypto from 'crypto';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, userType } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!['client', 'freelancer'].includes(userType)) {
      return NextResponse.json({ error: 'Invalid user type' }, { status: 400 });
    }

    const existing = await sql`SELECT id FROM users WHERE email = ${email} LIMIT 1`;
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    const tenants = await sql`SELECT id FROM tenants LIMIT 1`;
    const tenantId = tenants[0]?.id;
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

    const result = await sql`
      INSERT INTO users (name, email, password_hash, user_type, tenant_id, role, created_at, updated_at)
      VALUES (${name}, ${email}, ${passwordHash}, ${userType}, ${tenantId}, 'author', NOW(), NOW())
      RETURNING id
    `;

    return NextResponse.json({ success: true, userId: result[0].id });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
  }
}
