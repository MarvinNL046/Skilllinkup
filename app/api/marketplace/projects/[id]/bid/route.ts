import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth } from '@/lib/auth-helpers';
import { createNotification } from '@/lib/marketplace-queries';
import { sendEmailAsync } from '@/lib/send-email';
import { getUserContact } from '@/lib/get-user-email';
import { NewBidEmail } from '@/emails/new-bid';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/marketplace/projects/[id]/bid
// Place a bid on a project (requires freelancer profile)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params;
    const user = await requireAuth();
    const body = await request.json();

    // Validate inputs
    const amount = Number(body.amount);
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'amount must be a positive number' },
        { status: 400 }
      );
    }

    const deliveryDays = parseInt(body.delivery_days, 10);
    if (!deliveryDays || deliveryDays <= 0) {
      return NextResponse.json(
        { error: 'delivery_days must be a positive integer' },
        { status: 400 }
      );
    }

    const pitch = String(body.pitch ?? '').trim();
    if (pitch.length < 20) {
      return NextResponse.json(
        { error: 'pitch must be at least 20 characters' },
        { status: 400 }
      );
    }

    const currency = body.currency ? String(body.currency) : 'EUR';

    // Verify project exists and is open
    const projectRows = await sql`
      SELECT id, client_id, title, status FROM projects WHERE id = ${projectId} LIMIT 1
    `;

    if (projectRows.length === 0) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const project = projectRows[0];

    if (project.status !== 'open') {
      return NextResponse.json(
        { error: 'This project is not accepting bids' },
        { status: 400 }
      );
    }

    // Prevent client from bidding on their own project
    if (project.client_id === user.id) {
      return NextResponse.json(
        { error: 'You cannot bid on your own project' },
        { status: 400 }
      );
    }

    // Require an active freelancer profile
    const profileRows = await sql`
      SELECT id FROM freelancer_profiles
      WHERE user_id = ${user.id} AND status = 'active'
      LIMIT 1
    `;

    if (profileRows.length === 0) {
      return NextResponse.json(
        { error: 'You need an active freelancer profile to place bids' },
        { status: 403 }
      );
    }

    const freelancerId = profileRows[0].id as string;

    // Check for duplicate bid
    const existingBid = await sql`
      SELECT id FROM bids
      WHERE project_id = ${projectId} AND freelancer_id = ${freelancerId}
      LIMIT 1
    `;

    if (existingBid.length > 0) {
      return NextResponse.json(
        { error: 'You have already placed a bid on this project' },
        { status: 409 }
      );
    }

    // Insert the bid
    const bidRows = await sql`
      INSERT INTO bids (
        project_id,
        freelancer_id,
        amount,
        currency,
        delivery_days,
        pitch,
        attachments,
        status
      ) VALUES (
        ${projectId},
        ${freelancerId},
        ${amount},
        ${currency},
        ${deliveryDays},
        ${pitch},
        '[]'::JSONB,
        'pending'
      )
      RETURNING id, status, created_at
    `;

    const bid = bidRows[0];

    // Increment project bid_count
    await sql`
      UPDATE projects
      SET bid_count = bid_count + 1
      WHERE id = ${projectId}
    `;

    // Notify project owner
    try {
      await createNotification(
        String(project.client_id),
        'new_bid',
        'New bid received',
        `You received a new bid of ${currency === 'EUR' ? '€' : currency}${amount} on your project "${project.title}".`,
        `/en/dashboard/projects/${projectId}`,
        { project_id: projectId, bid_id: bid.id, amount, currency }
      );
    } catch (notifyErr) {
      // Non-critical: log but don't fail the request
      console.error('Failed to send bid notification:', notifyErr);
    }

    // Send new bid email to project owner
    const ownerContact = await getUserContact(String(project.client_id));
    const bidderRows = await sql`
      SELECT COALESCE(u.name, u.email, 'A freelancer') AS name
      FROM users u WHERE u.id = ${user.id} LIMIT 1
    `;
    const bidderName = (bidderRows[0]?.name as string) || 'A freelancer';

    if (ownerContact) {
      sendEmailAsync({
        to: ownerContact.email,
        subject: `New bid on "${project.title}" - SkillLinkup`,
        react: NewBidEmail({
          clientName: ownerContact.name,
          projectTitle: String(project.title),
          bidAmount: amount,
          currency,
          deliveryDays,
          freelancerName: bidderName,
          projectId,
        }),
      });
    }

    return NextResponse.json(
      { bid, message: 'Bid submitted successfully' },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('POST /api/marketplace/projects/[id]/bid error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
