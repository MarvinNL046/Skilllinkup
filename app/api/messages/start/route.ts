import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth } from '@/lib/auth-helpers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/messages/start - Start or find a conversation from gig/order context
export async function POST(request: NextRequest) {
 try {
 const user = await requireAuth();
 const body = await request.json();
 const { recipientId, orderId, gigId } = body as {
 recipientId: string;
 orderId?: string;
 gigId?: string;
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

 if (existing.length >0) {
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

 // Resolve order_id from gigId if provided and orderId not given
 let resolvedOrderId: string | null = orderId ?? null;

 // Create new conversation
 const newRows = await sql`
 INSERT INTO conversations (tenant_id, participant_1, participant_2, order_id, status)
 VALUES (
 ${tenantId},
 ${user.id},
 ${recipientId},
 ${resolvedOrderId},
 'active'
 )
 RETURNING id
 `;

 return NextResponse.json({ conversationId: String(newRows[0].id) }, { status: 201 });
 } catch (err) {
 if (err instanceof Error && err.message === 'Unauthorized') {
 return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
 }
 console.error('POST /api/messages/start error:', err);
 return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
 }
}
