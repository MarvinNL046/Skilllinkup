import { NextResponse } from 'next/server';
import { getPostBySlug } from '@/lib/queries';

export const runtime = 'edge';

export async function GET(
 request: Request,
 context: { params: Promise<{ slug: string }>}
) {
 const params = await context.params;
 try {
 const post = await getPostBySlug(params.slug);

 if (!post) {
 return NextResponse.json(
 {
 success: false,
 error: 'Post not found',
 },
 { status: 404 }
 );
 }

 return NextResponse.json({
 success: true,
 data: post,
 });
 } catch (error) {
 console.error('Error fetching post:', error);
 return NextResponse.json(
 {
 success: false,
 error: 'Failed to fetch post',
 },
 { status: 500 }
 );
 }
}
