import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
 try {
 const body = await request.json();
 const { postId, authorName, authorEmail, content } = body;

 // Validation
 if (!postId || !authorName || !authorEmail || !content) {
 return NextResponse.json(
 { error: 'Missing required fields' },
 { status: 400 }
 );
 }

 // Email validation
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if (!emailRegex.test(authorEmail)) {
 return NextResponse.json(
 { error: 'Invalid email address' },
 { status: 400 }
 );
 }

 // Content length validation
 if (content.length < 3 || content.length >5000) {
 return NextResponse.json(
 { error: 'Comment must be between 3 and 5000 characters' },
 { status: 400 }
 );
 }

 const sql = neon(process.env.DATABASE_URL!);

 // Insert comment with 'pending' status (requires moderation)
 const result = await sql`
 INSERT INTO comments (
 id,
 post_id,
 author_name,
 author_email,
 content,
 status,
 created_at
 ) VALUES (
 gen_random_uuid(),
 ${postId},
 ${authorName},
 ${authorEmail},
 ${content},
 'pending',
 NOW()
 )
 RETURNING id, created_at;
 `;

 return NextResponse.json({
 success: true,
 message: 'Comment submitted successfully. It will appear after moderation.',
 comment: result[0],
 });

 } catch (error) {
 console.error('Error posting comment:', error);
 return NextResponse.json(
 { error: 'Failed to post comment' },
 { status: 500 }
 );
 }
}
