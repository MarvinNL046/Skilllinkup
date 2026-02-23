import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth } from '@/lib/auth-helpers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/messages/send - Send a message in a conversation
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const { conversationId, content, messageType = 'text', fileUrl, fileName, fileSize } = body as {
      conversationId: string;
      content?: string;
      messageType?: string;
      fileUrl?: string;
      fileName?: string;
      fileSize?: number;
    };

    if (!conversationId) {
      return NextResponse.json({ error: 'conversationId is required' }, { status: 400 });
    }

    if (!content && !fileUrl) {
      return NextResponse.json({ error: 'content or fileUrl is required' }, { status: 400 });
    }

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

    // Insert the message
    const msgRows = await sql`
      INSERT INTO messages (
        conversation_id,
        sender_id,
        content,
        message_type,
        file_url,
        file_name,
        file_size,
        is_read
      )
      VALUES (
        ${conversationId},
        ${user.id},
        ${content ?? null},
        ${messageType},
        ${fileUrl ?? null},
        ${fileName ?? null},
        ${fileSize ?? null},
        false
      )
      RETURNING id, conversation_id, sender_id, content, message_type, file_url, file_name, file_size, is_read, created_at
    `;

    const msg = msgRows[0];

    // Build a short preview for the conversation list
    const preview =
      messageType === 'file'
        ? `[File] ${fileName ?? 'attachment'}`
        : (content ?? '').substring(0, 100);

    // Determine which participant is the recipient to increment their unread count
    const isParticipant1 = conv.participant_1 === user.id;

    if (isParticipant1) {
      // Sender is participant_1 → increment unread_count_2
      await sql`
        UPDATE conversations
        SET
          last_message_at = NOW(),
          last_message_preview = ${preview},
          unread_count_2 = unread_count_2 + 1,
          updated_at = NOW()
        WHERE id = ${conversationId}
      `;
    } else {
      // Sender is participant_2 → increment unread_count_1
      await sql`
        UPDATE conversations
        SET
          last_message_at = NOW(),
          last_message_preview = ${preview},
          unread_count_1 = unread_count_1 + 1,
          updated_at = NOW()
        WHERE id = ${conversationId}
      `;
    }

    // Fetch sender info for the response
    const senderRows = await sql`
      SELECT COALESCE(name, email, 'Unknown') AS sender_name, image AS sender_image
      FROM users WHERE id = ${user.id} LIMIT 1
    `;
    const senderName = senderRows[0]?.sender_name ?? 'Unknown';
    const senderImage = senderRows[0]?.sender_image ?? null;

    return NextResponse.json(
      {
        message: {
          id: String(msg.id ?? ''),
          conversationId: String(msg.conversation_id ?? ''),
          senderId: String(msg.sender_id ?? ''),
          content: msg.content ? String(msg.content) : null,
          messageType: String(msg.message_type ?? 'text'),
          fileUrl: msg.file_url ? String(msg.file_url) : null,
          fileName: msg.file_name ? String(msg.file_name) : null,
          fileSize: msg.file_size ? Number(msg.file_size) : null,
          isRead: false,
          createdAt: new Date(msg.created_at as string).toISOString(),
          sender: {
            name: String(senderName),
            image: senderImage ? String(senderImage) : null,
          },
        },
      },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('POST /api/messages/send error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
