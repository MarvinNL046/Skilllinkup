import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import sharp from 'sharp';

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

    // Generate unique filename with .webp extension
    const timestamp = Date.now();
    const originalName = file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase();
    const filename = `${timestamp}-${originalName}.webp`;

    // Convert image to WebP format with Sharp
    // Quality 85 is a good balance between file size and image quality
    const webpBuffer = await sharp(buffer)
      .webp({ quality: 85 })
      .toBuffer();

    // Create upload directories if they don't exist
    // We save to BOTH admin and main app for instant availability
    const adminUploadDir = join(process.cwd(), 'public', 'images', 'posts');
    const mainAppUploadDir = join(process.cwd(), '..', 'skillLinkup', 'public', 'images', 'posts');

    if (!existsSync(adminUploadDir)) {
      await mkdir(adminUploadDir, { recursive: true });
    }
    if (!existsSync(mainAppUploadDir)) {
      await mkdir(mainAppUploadDir, { recursive: true });
    }

    // Save WebP file to BOTH locations
    const adminFilepath = join(adminUploadDir, filename);
    const mainAppFilepath = join(mainAppUploadDir, filename);

    await writeFile(adminFilepath, webpBuffer);
    await writeFile(mainAppFilepath, webpBuffer);

    // Calculate file size reduction
    const originalSize = buffer.length;
    const webpSize = webpBuffer.length;
    const reduction = Math.round(((originalSize - webpSize) / originalSize) * 100);

    // Always return relative path for consistent database storage
    // This works in both development and production
    const relativePath = `/images/posts/${filename}`;

    return NextResponse.json({
      success: true,
      url: relativePath,    // Relative path works everywhere
      filename: filename,
      originalSize: `${Math.round(originalSize / 1024)}KB`,
      webpSize: `${Math.round(webpSize / 1024)}KB`,
      reduction: `${reduction}%`
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het uploaden' },
      { status: 500 }
    );
  }
}
