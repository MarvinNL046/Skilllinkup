import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth } from '@/lib/auth-helpers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/messages/conversations/[id] - Get messages for a conversation
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    const { id: conversationId } = await params;

    const { searchParams } = new URL(request.url);
    const limit = Math.min(Number(searchParams.get('limit') ?? '50'), 100);
    const before = searchParams.get('before');

    // Verify the user is a participant in this conversation
    const convRows = await sql`
      SELECT id, participant_1, participant_2
      FROM conversations
      WHERE id = ${conversationId}
      LIMIT 1
    `;

    if (convRows.length === 0) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    const conv = convRows[0];
    const isParticipant =
      conv.participant_1 === user.id || conv.participant_2 === user.id;

    if (!isParticipant) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Fetch messages with optional pagination
    let messageRows;
    if (before) {
      messageRows = await sql`
        SELECT
          m.id,
          m.conversation_id,
          m.sender_id,
          m.content,
          m.message_type,
          m.file_url,
          m.file_name,
          m.file_size,
          m.is_read,
          m.created_at,
          COALESCE(u.name, u.email, 'Unknown') AS sender_name,
          u.image AS sender_image
        FROM messages m
        LEFT JOIN users u ON m.sender_id = u.id
        WHERE m.conversation_id = ${conversationId}
          AND m.created_at < ${before}::timestamptz
        ORDER BY m.created_at DESC
        LIMIT ${limit}
      `;
    } else {
      messageRows = await sql`
        SELECT
          m.id,
          m.conversation_id,
          m.sender_id,
          m.content,
          m.message_type,
          m.file_url,
          m.file_name,
          m.file_size,
          m.is_read,
          m.created_at,
          COALESCE(u.name, u.email, 'Unknown') AS sender_name,
          u.image AS sender_image
        FROM messages m
        LEFT JOIN users u ON m.sender_id = u.id
        WHERE m.conversation_id = ${conversationId}
        ORDER BY m.created_at DESC
        LIMIT ${limit}
      `;
    }

    // Mark unread messages from the other participant as read
    const otherParticipantId =
      conv.participant_1 === user.id ? conv.participant_2 : conv.participant_1;

    await sql`
      UPDATE messages
      SET is_read = true
      WHERE conversation_id = ${conversationId}
        AND sender_id = ${otherParticipantId as string}
        AND is_read = false
    `;

    // Reset the unread count for the current user
    if (conv.participant_1 === user.id) {
      await sql`
        UPDATE conversations
        SET unread_count_1 = 0
        WHERE id = ${conversationId}
      `;
    } else {
      await sql`
        UPDATE conversations
        SET unread_count_2 = 0
        WHERE id = ${conversationId}
      `;
    }

    // Messages come from DB newest-first; reverse so UI gets oldest-first
    const messages = messageRows.reverse().map((row) => ({
      id: String(row.id ?? ''),
      conversationId: String(row.conversation_id ?? ''),
      senderId: row.sender_id ? String(row.sender_id) : null,
      content: row.content ? String(row.content) : null,
      messageType: String(row.message_type ?? 'text'),
      fileUrl: row.file_url ? String(row.file_url) : null,
      fileName: row.file_name ? String(row.file_name) : null,
      fileSize: row.file_size ? Number(row.file_size) : null,
      isRead: Boolean(row.is_read),
      createdAt: new Date(row.created_at as string).toISOString(),
      sender: {
        name: String(row.sender_name ?? 'Unknown'),
        image: row.sender_image ? String(row.sender_image) : null,
      },
    }));

    return NextResponse.json({ messages });
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('GET /api/messages/conversations/[id] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
