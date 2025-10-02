# SkillLinkup - Next.js 15 with App Router

## Project Overview

**SkillLinkup** is a modern blog platform built with **Next.js 15** and **React 18**, using the **App Router** architecture. The project was migrated from the Blogar HTML template and upgraded from Next.js 12 (Pages Router) to Next.js 15 (App Router) on October 2, 2025.

## Technology Stack

### Core Framework
- **Next.js**: 15.0.0 (App Router)
- **React**: 18.3.1
- **TypeScript**: 5.x (with gradual migration from JavaScript)

### UI & Styling
- **Bootstrap**: 5.3.3
- **React Bootstrap**: 2.10.1
- **Sass**: 1.71.1
- **Framer Motion**: 11.0.8 (animations)

### Additional Libraries
- **Gray Matter**: 4.0.3 (markdown frontmatter parsing)
- **Remark**: 15.0.1 (markdown processing)
- **Remark HTML**: 16.0.1
- **React Slick**: 0.30.2 (carousels)
- **React Paginate**: 8.2.0
- **EmailJS Browser**: 4.3.3
- **Luxon**: 3.4.4 (date handling)
- **Sharp**: 0.33.2 (image optimization)

## Project Structure

### App Router Architecture (`app/` directory)

```
app/
├── layout.tsx          # Root layout with metadata
├── page.tsx            # Homepage (SEO blog variant)
├── about/
│   └── page.tsx        # About page
├── blog/
│   └── page.tsx        # Blog list with pagination
└── contact/
    └── page.tsx        # Contact page with form
```

### Component Structure

```
src/
├── common/
│   ├── components/
│   │   ├── category/     # Category widgets
│   │   ├── form/         # Contact forms
│   │   ├── instagram/    # Instagram integration
│   │   ├── post/         # Post layouts and components
│   │   ├── sidebar/      # Sidebar widgets
│   │   ├── slider/       # Homepage slider
│   │   └── social/       # Social media components
│   └── elements/
│       ├── breadcrumb/   # Breadcrumb navigation
│       ├── footer/       # Footer variants
│       └── header/       # Header variants
├── data/              # Mock data and content
├── pages/             # Legacy Pages Router (being phased out)
└── styles/            # SCSS stylesheets
```

### Static Assets

```
public/
├── images/
│   ├── logo/          # Brand logos
│   ├── post-images/   # Blog post images
│   ├── small-images/  # Thumbnails
│   └── bg/            # Background images
├── css/               # Additional stylesheets
└── fonts/             # Custom fonts
```

## Development

### Local Development Commands

```bash
# Install dependencies
npm install

# Start development server (Next.js 15)
npm run dev
# Opens at http://localhost:3000

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Migration Status

#### ✅ Completed
- Upgraded to Next.js 15.0.0
- Upgraded to React 18.3.1
- Migrated from Pages Router to App Router
- Created root layout with metadata
- Migrated key pages (home, about, blog, contact)
- Added TypeScript configuration

#### 🚧 In Progress
- Converting .js components to .tsx
- Updating image handling for Next.js 15
- Implementing new navigation structure (5 items: Home, Blog, Post, About, Contact)
- Logo integration (SkillLinkup branding)

#### 📋 Pending
- Dynamic routing for blog posts
- Category and tag pages
- Author pages
- Search functionality
- Dark mode implementation

## Key Features

### Homepage (SEO Blog Variant)
- Hero slider with featured posts
- Multiple post sections with different layouts
- Category grid
- Social media integration
- Instagram feed
- Responsive design

### Blog List
- Paginated post listing
- Sidebar with categories, search, recent posts
- Multiple post format support

### Navigation Structure
- **Top Header**: Blog, About, Contact
- **Main Menu**: Home, Blog, Post, About, Contact (centered)

## API & Data

### Content Management
- Uses file-based content system via `lib/api.ts`
- Markdown files for blog posts with frontmatter
- Static generation at build time

### Post Fields
```javascript
[
  'id',
  'title',
  'featureImg',
  'postFormat',
  'featured',
  'slidePost',
  'date',
  'slug',
  'cate',
  'cate_img',
  'author_img',
  'author_name',
  'post_views',
  'read_time',
  'author_social',
]
```

## Configuration

### next.config.js
```javascript
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASEPATH : "",
}
```

### TypeScript
- Auto-generated `tsconfig.json`
- Gradual migration from JavaScript
- Type definitions for React components

## Environment

- **Node.js**: v22.16.0 (via NVM)
- **Platform**: Linux (Ubuntu)
- **Development Port**: 3000

## Git Repository

- **Remote**: https://github.com/MarvinNL046/Skilllinkup.git
- **Branch**: supabase (main branch)

## Version History

### v1.0.0 (October 2, 2025)
- ✅ Upgraded to Next.js 15 with App Router
- ✅ Upgraded to React 18.3.1
- ✅ Added TypeScript support
- ✅ Migrated core pages to App Router
- ✅ Simplified navigation structure
- ✅ Created backup: `skillLinkup-backup-20241002`

### Previous Versions
- Based on Blogar HTML template v1.7.3
- Initial Next.js 12 implementation with Pages Router

## Credits & Original Template

**Original Template**: Blogar - Blog & Magazine HTML5 Template
**Version**: 1.7.3
**Bootstrap**: 5.3.7
**Font Awesome Pro**: 6.5.1

## Notes for Development

### Important Patterns
1. **App Router**: All new pages go in `app/` directory
2. **Metadata**: Use `export const metadata` for SEO
3. **Client Components**: Use `'use client'` directive for interactive components
4. **Server Components**: Default for pages, better performance
5. **Image Optimization**: Use Next.js `<Image>` component

### Common Tasks

**Add a new page**:
```bash
mkdir app/new-page
# Create app/new-page/page.tsx
```

**Update navigation**:
- Edit header components in `src/common/elements/header/`

**Add blog post**:
- Add markdown file to appropriate content directory
- Ensure frontmatter includes all required fields

## Backup Information

A complete backup was created before the Next.js 15 migration:
- **Location**: `skillLinkup-backup-20241002/`
- **Contains**: Original Next.js 12 Pages Router implementation

## Future Enhancements

- [ ] Complete TypeScript migration
- [ ] Implement Server Actions for forms
- [ ] Add Supabase integration for content management
- [ ] Implement dark mode toggle
- [ ] Add authentication system
- [ ] Create admin dashboard
- [ ] Optimize images and assets
- [ ] Implement RSS feed
- [ ] Add sitemap generation
- [ ] SEO improvements
