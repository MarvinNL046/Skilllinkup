import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth } from '@/lib/auth-helpers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/marketplace/seller/verify
// Freelancer submits their profile for admin review
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();

    const { document_type, notes } = body;

    // Validate document_type
    const validDocumentTypes = ['id', 'kvk', 'portfolio'];
    if (!document_type || !validDocumentTypes.includes(document_type)) {
      return NextResponse.json(
        { error: 'document_type must be one of: id, kvk, portfolio' },
        { status: 400 }
      );
    }

    // Fetch existing freelancer profile
    const profiles = await sql`
      SELECT id, status, is_verified
      FROM freelancer_profiles
      WHERE user_id = ${user.id}
      LIMIT 1
    `;

    if (!profiles || profiles.length === 0) {
      return NextResponse.json(
        { error: 'No freelancer profile found. Create a profile first.' },
        { status: 404 }
      );
    }

    const profile = profiles[0];

    // Already verified
    if (profile.is_verified) {
      return NextResponse.json(
        { error: 'Profile is already verified.' },
        { status: 409 }
      );
    }

    // Already pending verification
    if (profile.status === 'pending_verification') {
      return NextResponse.json(
        { error: 'Verification request already submitted. Please wait for admin review.' },
        { status: 409 }
      );
    }

    // Update profile status to pending_verification
    await sql`
      UPDATE freelancer_profiles
      SET
        status = 'pending_verification',
        updated_at = NOW()
      WHERE id = ${profile.id}
    `;

    // Create admin notification for verification request
    // We store notifications in a generic way - check if notifications table exists
    // and fall back gracefully if it doesn't
    try {
      await sql`
        INSERT INTO notifications (
          user_id,
          type,
          title,
          message,
          metadata,
          is_read,
          created_at
        ) VALUES (
          ${user.id},
          'verification_requested',
          'Verification Request Submitted',
          'Your verification request has been submitted and is pending admin review.',
          ${JSON.stringify({
            freelancer_profile_id: profile.id,
            document_type,
            notes: notes ?? null,
          })}::jsonb,
          false,
          NOW()
        )
      `;
    } catch (notifErr) {
      // Notifications table may not exist yet; log but don't fail the request
      console.warn('Could not create notification (table may not exist):', notifErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Verification request submitted successfully.',
        status: 'pending_verification',
      },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('POST /api/marketplace/seller/verify error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
