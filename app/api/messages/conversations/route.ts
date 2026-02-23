import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth } from '@/lib/auth-helpers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/messages/conversations - List all conversations for the current user
export async function GET() {
  try {
    const user = await requireAuth();

    const rows = await sql`
      SELECT
        c.id,
        c.order_id,
        c.project_id,
        c.participant_1,
        c.participant_2,
        c.last_message_at,
        c.last_message_preview,
        c.unread_count_1,
        c.unread_count_2,
        c.status,
        c.created_at,
        -- Other participant info
        CASE
          WHEN c.participant_1 = ${user.id} THEN u2.id
          ELSE u1.id
        END AS other_user_id,
        CASE
          WHEN c.participant_1 = ${user.id} THEN COALESCE(u2.name, u2.email, 'Unknown')
          ELSE COALESCE(u1.name, u1.email, 'Unknown')
        END AS other_user_name,
        CASE
          WHEN c.participant_1 = ${user.id} THEN u2.image
          ELSE u1.image
        END AS other_user_image,
        -- Unread count for current user
        CASE
          WHEN c.participant_1 = ${user.id} THEN c.unread_count_1
          ELSE c.unread_count_2
        END AS my_unread_count
      FROM conversations c
      LEFT JOIN users u1 ON c.participant_1 = u1.id
      LEFT JOIN users u2 ON c.participant_2 = u2.id
      WHERE c.participant_1 = ${user.id}
         OR c.participant_2 = ${user.id}
      ORDER BY c.last_message_at DESC NULLS LAST, c.created_at DESC
    `;

    const conversations = rows.map((row) => ({
      id: String(row.id ?? ''),
      orderId: row.order_id ? String(row.order_id) : null,
      projectId: row.project_id ? String(row.project_id) : null,
      participant1: String(row.participant_1 ?? ''),
      participant2: String(row.participant_2 ?? ''),
      lastMessageAt: row.last_message_at
        ? new Date(row.last_message_at as string).toISOString()
        : null,
      lastMessagePreview: row.last_message_preview
        ? String(row.last_message_preview)
        : null,
      unreadCount: Number(row.my_unread_count ?? 0),
      status: String(row.status ?? 'active'),
      createdAt: new Date(row.created_at as string).toISOString(),
      otherUser: {
        id: row.other_user_id ? String(row.other_user_id) : '',
        name: String(row.other_user_name ?? 'Unknown'),
        image: row.other_user_image ? String(row.other_user_image) : null,
      },
    }));

    return NextResponse.json({ conversations });
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('GET /api/messages/conversations error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/messages/conversations - Create a new conversation
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const { recipientId, orderId, projectId } = body as {
      recipientId: string;
      orderId?: string;
      projectId?: string;
    };

    if (!recipientId) {
      return NextResponse.json({ error: 'recipientId is required' }, { status: 400 });
    }

    if (recipientId === user.id) {
      return NextResponse.json({ error: 'Cannot start conversation with yourself' }, { status: 400 });
    }

    // Check if a conversation already exists between these two users
    const existing = await sql`
      SELECT id FROM conversations
      WHERE (participant_1 = ${user.id} AND participant_2 = ${recipientId})
         OR (participant_1 = ${recipientId} AND participant_2 = ${user.id})
      LIMIT 1
    `;

    if (existing.length > 0) {
      return NextResponse.json({ conversationId: String(existing[0].id) });
    }

    // Get tenant_id for the current user
    const tenantRows = await sql`
      SELECT tenant_id FROM users WHERE id = ${user.id} LIMIT 1
    `;
    const tenantId = tenantRows[0]?.tenant_id;
    if (!tenantId) {
      return NextResponse.json({ error: 'Could not determine tenant' }, { status: 500 });
    }

    // Create new conversation
    const newRows = await sql`
      INSERT INTO conversations (tenant_id, participant_1, participant_2, order_id, project_id, status)
      VALUES (
        ${tenantId},
        ${user.id},
        ${recipientId},
        ${orderId ?? null},
        ${projectId ?? null},
        'active'
      )
      RETURNING id
    `;

    return NextResponse.json({ conversationId: String(newRows[0].id) }, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('POST /api/messages/conversations error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
