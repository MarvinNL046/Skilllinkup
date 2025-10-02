import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/queries';

export const runtime = 'edge';

export async function GET() {
  try {
    const categories = await getCategories();

    return NextResponse.json({
      success: true,
      data: categories,
      count: categories.length,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch categories',
      },
      { status: 500 }
    );
  }
}
