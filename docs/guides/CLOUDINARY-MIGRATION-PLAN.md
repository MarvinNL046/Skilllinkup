# Cloudinary Migration Plan: User-Generated Content Strategy

**Goal**: Migrate from Git-based image storage to Cloudinary CDN for scalable user-generated content (avatars, portfolios, videos).

**Timeline**: 2-3 days setup + 1 day migration
**Cost**: Free tier (25GB storage, 25GB bandwidth/month) → upgrade as needed

---

## Table of Contents

1. [Why Cloudinary?](#why-cloudinary)
2. [Architecture Overview](#architecture-overview)
3. [Phase 1: Cloudinary Setup](#phase-1-cloudinary-setup)
4. [Phase 2: Upload Component](#phase-2-upload-component)
5. [Phase 3: Database Schema](#phase-3-database-schema)
6. [Phase 4: Migration Strategy](#phase-4-migration-strategy)
7. [Phase 5: Admin Dashboard Integration](#phase-5-admin-dashboard-integration)
8. [Phase 6: User Portal Features](#phase-6-user-portal-features)
9. [Cost Analysis](#cost-analysis)
10. [Security Best Practices](#security-best-practices)

---

## Why Cloudinary?

### Current Problem (Git-based storage)
- ❌ Every image upload requires git commit + push
- ❌ Netlify build times increase with file count
- ❌ GitHub repo size limits (~1GB recommended)
- ❌ No automatic image optimization
- ❌ Not scalable for user-generated content

### Cloudinary Solution
- ✅ **Direct uploads** from browser (no server involvement)
- ✅ **Automatic optimization** (WebP, AVIF, lazy loading)
- ✅ **On-the-fly transformations** (resize, crop, format conversion)
- ✅ **Video support** with transcoding
- ✅ **Global CDN** for fast delivery worldwide
- ✅ **Unlimited scale** (millions of images)
- ✅ **Free tier** sufficient for MVP

---

## Architecture Overview

### Current Flow (Git-based)
```
User uploads → Saved to /public/images/posts/ → Git commit → Push to GitHub → Netlify deploy → Image available
```
**Problem**: 5-10 minutes delay, not scalable

### New Flow (Cloudinary)
```
User uploads → Direct to Cloudinary → Returns URL → Save to Neon DB → Image available instantly ⚡
```
**Benefit**: Instant availability, zero git commits, infinite scale

### Architecture Diagram
```
┌─────────────┐
│   Browser   │
│  (Next.js)  │
└──────┬──────┘
       │
       │ 1. User selects image
       │
       ▼
┌─────────────────────┐
│  Upload Widget/API  │
│   (Cloudinary SDK)  │
└──────┬──────────────┘
       │
       │ 2. Direct upload (signed)
       │
       ▼
┌─────────────────────┐
│    Cloudinary CDN   │
│  (Image Storage)    │
└──────┬──────────────┘
       │
       │ 3. Returns secure URL
       │
       ▼
┌─────────────────────┐
│   Next.js API       │
│   (Save to DB)      │
└──────┬──────────────┘
       │
       │ 4. Store URL in database
       │
       ▼
┌─────────────────────┐
│   Neon PostgreSQL   │
│  users.avatar_url   │
│  portfolios.image   │
└─────────────────────┘
```

---

## Phase 1: Cloudinary Setup

### Step 1.1: Create Cloudinary Account
1. Go to https://cloudinary.com/users/register_free
2. Sign up with email (or GitHub)
3. Note down your credentials:
   - **Cloud Name**: `skilllinkup` (example)
   - **API Key**: `123456789012345`
   - **API Secret**: `abcdefghijklmnopqrstuvwxyz`

### Step 1.2: Configure Environment Variables

**Frontend** (`/home/marvin/Documenten/skillLinkup/.env.local`):
```bash
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="skilllinkup_unsigned" # Created in step 1.3
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

**Admin Dashboard** (`/home/marvin/Documenten/skillLinkup-admin/.env.local`):
```bash
# Same as above
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="skilllinkup_unsigned"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

**Netlify Environment Variables**:
- Go to Netlify Dashboard → Site settings → Environment variables
- Add all variables above (except secrets - those stay server-side only)

### Step 1.3: Create Upload Preset

**Why?** Upload presets define rules for uploads (size limits, formats, folders).

**Steps**:
1. Go to Cloudinary Dashboard → Settings → Upload
2. Click "Add upload preset"
3. Configure:
   - **Preset name**: `skilllinkup_unsigned`
   - **Signing Mode**: Unsigned (for direct browser uploads)
   - **Folder**: `skilllinkup/` (organizes your images)
   - **Allowed formats**: jpg, png, gif, webp, mp4, mov
   - **Max file size**: 10MB (images), 50MB (videos)
   - **Transformations**:
     - Auto quality
     - Auto format (WebP/AVIF)
     - Max dimensions: 2000x2000
4. Save preset

### Step 1.4: Install Cloudinary SDK

**Frontend**:
```bash
cd /home/marvin/Documenten/skillLinkup
npm install cloudinary-react cloudinary
```

**Admin Dashboard**:
```bash
cd /home/marvin/Documenten/skillLinkup-admin
npm install cloudinary-react cloudinary
```

---

## Phase 2: Upload Component

### Step 2.1: Create Reusable Upload Component

**File**: `components/CloudinaryUpload.tsx`

```typescript
'use client';

import { CldUploadWidget } from 'cloudinary-react';
import { useState } from 'react';
import Image from 'next/image';

interface CloudinaryUploadProps {
  onUploadSuccess: (url: string) => void;
  folder?: string;
  maxFiles?: number;
  resourceType?: 'image' | 'video' | 'auto';
  buttonText?: string;
  currentImage?: string;
}

export function CloudinaryUpload({
  onUploadSuccess,
  folder = 'skilllinkup',
  maxFiles = 1,
  resourceType = 'image',
  buttonText = 'Upload Image',
  currentImage
}: CloudinaryUploadProps) {
  const [uploadedUrl, setUploadedUrl] = useState<string>(currentImage || '');
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = (result: any) => {
    if (result.event === 'success') {
      const secureUrl = result.info.secure_url;
      setUploadedUrl(secureUrl);
      onUploadSuccess(secureUrl);
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Preview */}
      {uploadedUrl && (
        <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={uploadedUrl}
            alt="Uploaded preview"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Upload Widget */}
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
        onUpload={handleUpload}
        options={{
          folder,
          maxFiles,
          resourceType,
          clientAllowedFormats: resourceType === 'image'
            ? ['jpg', 'jpeg', 'png', 'webp', 'gif']
            : ['mp4', 'mov', 'avi'],
          maxFileSize: resourceType === 'image' ? 10000000 : 50000000, // 10MB / 50MB
          cropping: resourceType === 'image',
          croppingAspectRatio: 1, // Square for avatars
          croppingShowDimensions: true,
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => {
              setIsUploading(true);
              open();
            }}
            disabled={isUploading}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
          >
            {isUploading ? 'Uploading...' : buttonText}
          </button>
        )}
      </CldUploadWidget>

      {/* Upload Status */}
      {isUploading && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span>Uploading to Cloudinary...</span>
        </div>
      )}
    </div>
  );
}
```

### Step 2.2: Usage Examples

**Avatar Upload** (User Profile):
```typescript
'use client';

import { CloudinaryUpload } from '@/components/CloudinaryUpload';
import { useState } from 'react';

export function UserProfileForm() {
  const [avatarUrl, setAvatarUrl] = useState('');

  const handleAvatarUpload = (url: string) => {
    setAvatarUrl(url);
    // Save to database via API
    fetch('/api/user/avatar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ avatarUrl: url })
    });
  };

  return (
    <div>
      <h2>Upload Avatar</h2>
      <CloudinaryUpload
        onUploadSuccess={handleAvatarUpload}
        folder="skilllinkup/avatars"
        buttonText="Upload Avatar"
        currentImage={avatarUrl}
      />
    </div>
  );
}
```

**Portfolio Upload** (Multiple images):
```typescript
'use client';

import { CloudinaryUpload } from '@/components/CloudinaryUpload';
import { useState } from 'react';

export function PortfolioUpload() {
  const [portfolioImages, setPortfolioImages] = useState<string[]>([]);

  const handleImageUpload = (url: string) => {
    setPortfolioImages(prev => [...prev, url]);
    // Save to database
    fetch('/api/portfolio/images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl: url })
    });
  };

  return (
    <div>
      <h2>Upload Portfolio Images</h2>
      <CloudinaryUpload
        onUploadSuccess={handleImageUpload}
        folder="skilllinkup/portfolios"
        maxFiles={10}
        buttonText="Add Portfolio Image"
      />

      {/* Display uploaded images */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {portfolioImages.map((url, index) => (
          <img key={index} src={url} alt={`Portfolio ${index + 1}`} className="rounded-lg" />
        ))}
      </div>
    </div>
  );
}
```

**Video Upload** (Portfolio demo reels):
```typescript
<CloudinaryUpload
  onUploadSuccess={handleVideoUpload}
  folder="skilllinkup/videos"
  resourceType="video"
  buttonText="Upload Demo Reel"
/>
```

---

## Phase 3: Database Schema

### Step 3.1: Add Cloudinary Columns to Existing Tables

**Migration**: `drizzle/migrations/0011_add_cloudinary_support.sql`

```sql
-- Add avatar_url to users table (Cloudinary URL)
ALTER TABLE users ADD COLUMN avatar_url TEXT;

-- Add Cloudinary support to platforms table
ALTER TABLE platforms ADD COLUMN logo_cloudinary_url TEXT;
ALTER TABLE platforms ADD COLUMN screenshot_cloudinary_url TEXT;

-- Create portfolio table for freelancers
CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL, -- Cloudinary URL
  video_url TEXT, -- Optional demo reel
  project_url TEXT, -- External link
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_portfolios_user_id ON portfolios(user_id);

-- Add portfolio images table for multiple images per project
CREATE TABLE portfolio_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL, -- Cloudinary URL
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_portfolio_images_portfolio_id ON portfolio_images(portfolio_id);
```

### Step 3.2: Update Drizzle Schema

**File**: `drizzle/schema.ts`

```typescript
import { pgTable, uuid, varchar, text, timestamp, integer } from 'drizzle-orm/pg-core';

// Update users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  avatar: varchar('avatar', { length: 500 }), // Legacy - keep for backward compatibility
  avatarUrl: text('avatar_url'), // NEW: Cloudinary URL
  role: varchar('role', { length: 50 }).default('user'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Update platforms table
export const platforms = pgTable('platforms', {
  // ... existing fields
  logoUrl: varchar('logo_url', { length: 500 }), // Legacy
  logoCloudinaryUrl: text('logo_cloudinary_url'), // NEW: Cloudinary logo
  screenshotCloudinaryUrl: text('screenshot_cloudinary_url'), // NEW: Cloudinary screenshot
});

// NEW: Portfolios table
export const portfolios = pgTable('portfolios', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  imageUrl: text('image_url').notNull(), // Cloudinary URL
  videoUrl: text('video_url'), // Optional demo reel
  projectUrl: text('project_url'), // External link
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// NEW: Portfolio images table
export const portfolioImages = pgTable('portfolio_images', {
  id: uuid('id').primaryKey().defaultRandom(),
  portfolioId: uuid('portfolio_id').references(() => portfolios.id, { onDelete: 'cascade' }).notNull(),
  imageUrl: text('image_url').notNull(), // Cloudinary URL
  orderIndex: integer('order_index').default(0),
  createdAt: timestamp('created_at').defaultNow()
});
```

### Step 3.3: Run Migration

```bash
cd /home/marvin/Documenten/skillLinkup
npm run db:generate
npm run db:migrate
```

---

## Phase 4: Migration Strategy

### Step 4.1: Migrate Existing Images to Cloudinary

**Why migrate?**
- Faster load times with CDN
- Automatic optimization
- Consistent image delivery
- Free up Git repo space

**Script**: `scripts/migrate-images-to-cloudinary.ts`

```typescript
import { v2 as cloudinary } from 'cloudinary';
import { db } from '../lib/db';
import { platforms } from '../drizzle/schema';
import fs from 'fs';
import path from 'path';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function migrateImages() {
  console.log('🚀 Starting image migration to Cloudinary...');

  // Get all platforms with local images
  const allPlatforms = await db.select().from(platforms);

  for (const platform of allPlatforms) {
    if (!platform.logoUrl || platform.logoCloudinaryUrl) {
      console.log(`⏭️  Skipping ${platform.name} (no logo or already migrated)`);
      continue;
    }

    try {
      // Convert /images/posts/xxx.webp to local file path
      const localPath = path.join(process.cwd(), 'public', platform.logoUrl);

      // Check if file exists
      if (!fs.existsSync(localPath)) {
        console.log(`⚠️  File not found: ${localPath}`);
        continue;
      }

      console.log(`📤 Uploading ${platform.name} logo to Cloudinary...`);

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(localPath, {
        folder: 'skilllinkup/platforms',
        public_id: platform.slug,
        resource_type: 'image',
        overwrite: true
      });

      console.log(`✅ Uploaded: ${result.secure_url}`);

      // Update database with Cloudinary URL
      await db.update(platforms)
        .set({
          logoCloudinaryUrl: result.secure_url,
          screenshotCloudinaryUrl: result.secure_url // Same for now
        })
        .where(eq(platforms.id, platform.id));

      console.log(`💾 Updated database for ${platform.name}`);

    } catch (error) {
      console.error(`❌ Failed to migrate ${platform.name}:`, error);
    }
  }

  console.log('✅ Migration complete!');
}

// Run migration
migrateImages().catch(console.error);
```

**Run migration**:
```bash
npx tsx scripts/migrate-images-to-cloudinary.ts
```

### Step 4.2: Update Components to Use Cloudinary URLs

**File**: `components/top-rated-platforms.tsx`

```typescript
// Before (local images)
<Image
  src={platform.logoUrl}
  alt={platform.name}
  width={800}
  height={600}
/>

// After (Cloudinary with fallback)
<Image
  src={platform.logoCloudinaryUrl || platform.logoUrl || '/images/default-platform.webp'}
  alt={platform.name}
  width={800}
  height={600}
/>
```

### Step 4.3: Cleanup Old Images (Optional)

**After verifying Cloudinary migration works**:
```bash
# Delete old images from Git (keeps them in Cloudinary)
git rm public/images/posts/*.webp
git commit -m "chore: Remove migrated images (now on Cloudinary)"
git push origin main
```

**Benefit**: Reduces repo size, faster builds, cleaner codebase

---

## Phase 5: Admin Dashboard Integration

### Step 5.1: Update RichTextEditor with Cloudinary

**File**: `components/RichTextEditor.tsx` (Admin Dashboard)

```typescript
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { CloudinaryUpload } from './CloudinaryUpload';

export function RichTextEditor({ content, onChange }: { content: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  const handleImageInsert = (cloudinaryUrl: string) => {
    // Insert Cloudinary image into editor
    editor?.chain().focus().setImage({ src: cloudinaryUrl }).run();
  };

  return (
    <div className="border rounded-lg p-4">
      {/* Cloudinary Upload Button */}
      <div className="mb-4">
        <CloudinaryUpload
          onUploadSuccess={handleImageInsert}
          folder="skilllinkup/blog-posts"
          buttonText="Insert Image from Cloudinary"
        />
      </div>

      {/* TipTap Editor */}
      <EditorContent editor={editor} className="prose max-w-none" />
    </div>
  );
}
```

**Benefit**:
- No more dual-folder uploads
- Instant image availability
- Automatic optimization

### Step 5.2: Platform Logo Upload (Admin)

**File**: `app/admin/platforms/edit/[id]/page.tsx`

```typescript
'use client';

import { CloudinaryUpload } from '@/components/CloudinaryUpload';
import { useState } from 'react';

export default function EditPlatformPage() {
  const [logoUrl, setLogoUrl] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState('');

  const handleSave = async () => {
    await fetch(`/api/platforms/${platformId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        logoCloudinaryUrl: logoUrl,
        screenshotCloudinaryUrl: screenshotUrl
      })
    });
  };

  return (
    <div className="space-y-6">
      <h1>Edit Platform</h1>

      {/* Logo Upload */}
      <div>
        <label className="block font-semibold mb-2">Platform Logo</label>
        <CloudinaryUpload
          onUploadSuccess={setLogoUrl}
          folder="skilllinkup/platforms/logos"
          buttonText="Upload Logo"
          currentImage={logoUrl}
        />
      </div>

      {/* Screenshot Upload */}
      <div>
        <label className="block font-semibold mb-2">Homepage Screenshot</label>
        <CloudinaryUpload
          onUploadSuccess={setScreenshotUrl}
          folder="skilllinkup/platforms/screenshots"
          buttonText="Upload Screenshot"
          currentImage={screenshotUrl}
        />
      </div>

      <button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded-lg">
        Save Changes
      </button>
    </div>
  );
}
```

---

## Phase 6: User Portal Features

### Step 6.1: Freelancer Profile Page

**File**: `app/profile/page.tsx`

```typescript
'use client';

import { CloudinaryUpload } from '@/components/CloudinaryUpload';
import { useState } from 'react';

export default function FreelancerProfilePage() {
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    avatarUrl: '',
    skills: []
  });

  const handleAvatarUpload = async (url: string) => {
    setProfile(prev => ({ ...prev, avatarUrl: url }));

    // Save to database
    await fetch('/api/user/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ avatarUrl: url })
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

      {/* Avatar Upload */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Profile Picture</label>
        <CloudinaryUpload
          onUploadSuccess={handleAvatarUpload}
          folder="skilllinkup/avatars"
          buttonText="Upload Avatar"
          currentImage={profile.avatarUrl}
        />
      </div>

      {/* Name */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Name</label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Bio */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Bio</label>
        <textarea
          value={profile.bio}
          onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
          className="w-full px-4 py-2 border rounded-lg h-32"
        />
      </div>

      <button className="px-6 py-3 bg-primary text-white rounded-lg">
        Save Profile
      </button>
    </div>
  );
}
```

### Step 6.2: Portfolio Management

**File**: `app/portfolio/page.tsx`

```typescript
'use client';

import { CloudinaryUpload } from '@/components/CloudinaryUpload';
import { useState } from 'react';

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState({
    title: '',
    description: '',
    imageUrl: '',
    videoUrl: '',
    projectUrl: ''
  });

  const handleImageUpload = (url: string) => {
    setCurrentProject(prev => ({ ...prev, imageUrl: url }));
  };

  const handleVideoUpload = (url: string) => {
    setCurrentProject(prev => ({ ...prev, videoUrl: url }));
  };

  const handleSaveProject = async () => {
    await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentProject)
    });

    // Reset form
    setCurrentProject({ title: '', description: '', imageUrl: '', videoUrl: '', projectUrl: '' });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">My Portfolio</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Project</h2>

        {/* Project Title */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Project Title</label>
          <input
            type="text"
            value={currentProject.title}
            onChange={(e) => setCurrentProject(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="E-commerce Website Redesign"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            value={currentProject.description}
            onChange={(e) => setCurrentProject(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-2 border rounded-lg h-24"
            placeholder="Describe your project..."
          />
        </div>

        {/* Featured Image */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Featured Image</label>
          <CloudinaryUpload
            onUploadSuccess={handleImageUpload}
            folder="skilllinkup/portfolios"
            buttonText="Upload Project Image"
            currentImage={currentProject.imageUrl}
          />
        </div>

        {/* Demo Video (Optional) */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Demo Video (Optional)</label>
          <CloudinaryUpload
            onUploadSuccess={handleVideoUpload}
            folder="skilllinkup/portfolios/videos"
            resourceType="video"
            buttonText="Upload Demo Video"
            currentImage={currentProject.videoUrl}
          />
        </div>

        {/* External Link */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Project URL (Optional)</label>
          <input
            type="url"
            value={currentProject.projectUrl}
            onChange={(e) => setCurrentProject(prev => ({ ...prev, projectUrl: e.target.value }))}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="https://example.com"
          />
        </div>

        <button
          onClick={handleSaveProject}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          Add Project
        </button>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: any) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
              {project.videoUrl && (
                <div className="mt-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Has Video</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Cost Analysis

### Cloudinary Pricing Tiers

#### Free Tier (Perfect for MVP)
- ✅ 25 GB storage
- ✅ 25 GB bandwidth/month
- ✅ Unlimited transformations
- ✅ 25,000 transformations/month
- ✅ Basic image & video support
- **Cost**: $0/month

**Suitable for**:
- ~5,000 images (average 5MB each)
- ~10,000 monthly active users
- MVP launch phase

#### Plus Tier (Growth)
- ✅ 100 GB storage
- ✅ 100 GB bandwidth/month
- ✅ Unlimited transformations
- ✅ Advanced video features
- **Cost**: $89/month

**Suitable for**:
- ~20,000 images
- ~50,000 monthly active users
- Post-launch growth

#### Advanced Tier (Scale)
- ✅ 500 GB storage
- ✅ 500 GB bandwidth/month
- ✅ Advanced AI features
- ✅ Priority support
- **Cost**: $224/month

**Suitable for**:
- ~100,000 images
- ~200,000 monthly active users
- Full-scale platform

### Cost Comparison: Git vs Cloudinary

| Factor | Git-based (Current) | Cloudinary |
|--------|---------------------|------------|
| **Storage** | Limited by GitHub (1GB recommended) | 25GB free, scalable |
| **Bandwidth** | Limited by Netlify | 25GB/month free |
| **Optimization** | Manual (WebP conversion) | Automatic (WebP, AVIF, lazy load) |
| **Speed** | ~500ms (GitHub → Netlify) | ~50ms (CDN edge servers) |
| **Scalability** | Not scalable for UGC | Unlimited |
| **Monthly Cost** | $0 | $0 (Free tier) → $89 (Plus) |
| **Developer Time** | High (manual commits) | Low (automated) |

**ROI**: Even at $89/month, you save ~10 hours/month in manual image management = **$400-800/month in developer time**

---

## Security Best Practices

### 1. Signed Uploads (Production)

**Problem**: Unsigned uploads allow anyone to upload to your Cloudinary account.

**Solution**: Use signed uploads with server-side signature generation.

**Implementation**:

**API Route**: `app/api/cloudinary/signature/route.ts`

```typescript
import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: NextRequest) {
  // Verify user is authenticated
  const session = await getSession(request); // Your auth function
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { folder } = await request.json();

  // Generate signature
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder,
      upload_preset: 'skilllinkup_signed'
    },
    process.env.CLOUDINARY_API_SECRET!
  );

  return NextResponse.json({
    signature,
    timestamp,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY
  });
}
```

**Updated Upload Component**:
```typescript
<CldUploadWidget
  signatureEndpoint="/api/cloudinary/signature"
  // ... rest of config
>
```

### 2. File Size Limits

**Prevent abuse**:
- Images: 10MB max
- Videos: 50MB max
- Implement in upload preset AND client-side validation

```typescript
options={{
  maxFileSize: 10000000, // 10MB
  clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp']
}}
```

### 3. Rate Limiting

**Prevent spam uploads**:

**Middleware**: `middleware.ts`

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 h'), // 10 uploads per hour
  analytics: true
});

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/cloudinary')) {
    const ip = request.ip ?? '127.0.0.1';
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json({ error: 'Too many uploads' }, { status: 429 });
    }
  }

  return NextResponse.next();
}
```

### 4. Content Moderation

**Automatic moderation** with Cloudinary AI:

```typescript
const result = await cloudinary.uploader.upload(file, {
  moderation: 'aws_rek:suggestive:0.8', // Flag suggestive content
  notification_url: 'https://yoursite.com/api/moderation-webhook'
});
```

**Manual review workflow**:
1. User uploads image
2. Cloudinary moderates
3. Flagged content → pending review
4. Admin approves/rejects
5. Approved images go live

---

## Implementation Timeline

### Week 1: Foundation
- **Day 1**: Cloudinary account setup, environment variables
- **Day 2**: Install SDKs, create upload component
- **Day 3**: Database schema changes, run migrations
- **Day 4**: Migrate existing images to Cloudinary
- **Day 5**: Test and verify migration

### Week 2: Integration
- **Day 1**: Update admin dashboard (RichTextEditor)
- **Day 2**: Update platform logo/screenshot uploads
- **Day 3**: Build user profile page with avatar upload
- **Day 4**: Build portfolio management page
- **Day 5**: Test end-to-end flows

### Week 3: Polish & Launch
- **Day 1**: Implement signed uploads (security)
- **Day 2**: Add rate limiting and moderation
- **Day 3**: Performance testing and optimization
- **Day 4**: Documentation and training
- **Day 5**: Production launch 🚀

---

## Success Metrics

### Technical Metrics
- ✅ Image load time: <500ms → <100ms (80% improvement)
- ✅ Build time: 5 minutes → 30 seconds (90% reduction)
- ✅ Repo size: 500MB → 50MB (90% reduction)
- ✅ Upload success rate: >95%

### User Experience Metrics
- ✅ Upload time: Instant (vs 5-10 minutes with Git)
- ✅ Image quality: Automatic WebP/AVIF optimization
- ✅ Global load times: <200ms (CDN edge servers)

### Business Metrics
- ✅ Developer time saved: 10 hours/month
- ✅ Storage costs: $0 (free tier)
- ✅ Scalability: Ready for 100K+ users
- ✅ User satisfaction: Professional image handling

---

## Troubleshooting

### Common Issues

**1. Upload fails with "Invalid signature"**
- **Cause**: Unsigned preset with signed upload widget
- **Fix**: Use matching preset type (unsigned preset with unsigned widget)

**2. Images not loading on production**
- **Cause**: Environment variables not set on Netlify
- **Fix**: Add `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` to Netlify env vars

**3. CORS errors in browser**
- **Cause**: Cloudinary CORS settings
- **Fix**: Add your domain to Cloudinary Dashboard → Settings → Security → Allowed domains

**4. Large upload times**
- **Cause**: Not using Cloudinary's optimized upload widget
- **Fix**: Ensure using `CldUploadWidget` from `cloudinary-react`

---

## Next Steps

1. **Review this plan** with your team
2. **Create Cloudinary account** (free tier)
3. **Set up development environment** (local testing)
4. **Run migration script** on test data
5. **Deploy to staging** for QA
6. **Production launch** 🚀

---

## Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Next.js Cloudinary Integration](https://cloudinary.com/documentation/react_integration)
- [Upload Widget Customization](https://cloudinary.com/documentation/upload_widget)
- [Image Transformations](https://cloudinary.com/documentation/image_transformations)
- [Video Transformations](https://cloudinary.com/documentation/video_manipulation_and_delivery)

---

**Questions?** Contact the development team or open an issue in the project repo.

**Ready to scale?** Let's migrate to Cloudinary! 🚀
