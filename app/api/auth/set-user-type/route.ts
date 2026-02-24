import { NextRequest, NextResponse } from 'next/server';
import { getStackServerApp } from '@/lib/stack';
import { sql } from '@/lib/db';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Get Stack Auth user directly (more reliable than getCurrentUser in API routes)
    let stackUser;
    try {
      stackUser = await getStackServerApp().getUser();
    } catch (e) {
      console.error('[set-user-type] Stack Auth getUser error:', e);
      return NextResponse.json({ error: 'Auth failed' }, { status: 401 });
    }

    if (!stackUser) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const email = stackUser.primaryEmail;
    if (!email) {
      return NextResponse.json({ error: 'No email on account' }, { status: 400 });
    }

    const { userType } = await request.json();
    if (!['client', 'freelancer'].includes(userType)) {
      return NextResponse.json({ error: 'Invalid user type' }, { status: 400 });
    }

    // Find or create local user
    let localUser = await sql`
      SELECT id, name FROM users WHERE email = ${email} LIMIT 1
    `;

    if (localUser.length === 0) {
      // Auto-create local user
      const tenants = await sql`SELECT id FROM tenants LIMIT 1`;
      const tenantId = tenants[0]?.id || null;

      await sql`
        INSERT INTO users (email, name, image, user_type, tenant_id, role, email_verified)
        VALUES (
          ${email},
          ${stackUser.displayName || email.split('@')[0]},
          ${stackUser.profileImageUrl || null},
          ${userType},
          ${tenantId},
          'author',
          NOW()
        )
      `;

      localUser = await sql`
        SELECT id, name FROM users WHERE email = ${email} LIMIT 1
      `;
    } else {
      // Update existing user type
      await sql`
        UPDATE users SET user_type = ${userType}, updated_at = NOW()
        WHERE id = ${localUser[0].id}
      `;
    }

    const userId = localUser[0].id;
    const userName = localUser[0].name || stackUser.displayName || email.split('@')[0];

    // If freelancer, auto-create a basic freelancer profile
    if (userType === 'freelancer') {
      const existing = await sql`
        SELECT id FROM freelancer_profiles WHERE user_id = ${userId} LIMIT 1
      `;
      if (existing.length === 0) {
        await sql`
          INSERT INTO freelancer_profiles (user_id, display_name, status, locale)
          VALUES (${userId}, ${userName}, 'active', 'en')
        `;
      }
    }

    return NextResponse.json({ success: true, userType });
  } catch (error) {
    console.error('[set-user-type] Error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
