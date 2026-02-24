import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { sql } from '@/lib/db';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userType } = await request.json();
    if (!['client', 'freelancer'].includes(userType)) {
      return NextResponse.json({ error: 'Invalid user type' }, { status: 400 });
    }

    await sql`
      UPDATE users SET user_type = ${userType}, updated_at = NOW()
      WHERE id = ${user.id}
    `;

    // If freelancer, auto-create a basic freelancer profile if one doesn't exist
    if (userType === 'freelancer') {
      const existing = await sql`
        SELECT id FROM freelancer_profiles WHERE user_id = ${user.id} LIMIT 1
      `;
      if (existing.length === 0) {
        await sql`
          INSERT INTO freelancer_profiles (user_id, display_name, status, locale)
          VALUES (${user.id}, ${user.name || user.email}, 'active', 'en')
        `;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Set user type error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
