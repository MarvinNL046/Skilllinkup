import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Geen bestand geüpload' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Ongeldig bestandstype. Alleen JPEG, PNG, WebP en GIF zijn toegestaan.' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Bestand is te groot. Maximum grootte is 5MB.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase();
    const filename = `${timestamp}-${originalName}`;

    // Create upload directory if it doesn't exist
    // We'll upload to the main app's public folder so images are accessible
    const uploadDir = join(process.cwd(), '..', 'skillLinkup', 'public', 'images', 'posts');

    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Save file
    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Return the URL path
    // For admin dashboard, we need the full URL to the main app
    const mainAppUrl = process.env.NEXT_PUBLIC_MAIN_APP_URL || 'http://localhost:3000';
    const imageUrl = `${mainAppUrl}/images/posts/${filename}`;

    return NextResponse.json({
      success: true,
      url: imageUrl,
      filename: filename
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het uploaden' },
      { status: 500 }
    );
  }
}
