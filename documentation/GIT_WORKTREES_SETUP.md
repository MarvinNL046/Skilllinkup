# Git Worktrees Setup for SkillLinkup Multi-Subdomain Architecture

## Overview

Git Worktrees allow multiple working directories from a single repository, perfect for managing:
- **Main App** (skilllinkup.com) - Public affiliate blog
- **CMS** (cms.skilllinkup.com) - Content management system
- **Admin** (admin.skilllinkup.com) - Publisher/user administration

**Key Benefits**:
1. ✅ Shared Git history across all subdomains
2. ✅ Claude Code maintains context across all worktrees
3. ✅ Independent dependencies per subdomain
4. ✅ Easy synchronization of shared code
5. ✅ Work on multiple features in parallel

## Current Repository Structure

```
~/Documenten/skillLinkup/     # Main worktree (supabase branch)
├── .git/                     # Git database
├── app/                      # Next.js 15 App Router
├── src/                      # Shared components
├── documentation/            # Project documentation
└── package.json
```

## Step 1: Create Branches for Subdomains

```bash
cd ~/Documenten/skillLinkup

# Create CMS branch
git checkout -b cms/main
git push -u origin cms/main

# Create Admin branch
git checkout -b admin/main
git push -u origin admin/main

# Return to main branch
git checkout supabase
```

## Step 2: Create Worktrees

```bash
# Create CMS worktree
git worktree add ../skillLinkup-cms cms/main

# Create Admin worktree
git worktree add ../skillLinkup-admin admin/main
```

## Step 3: Verify Worktree Setup

```bash
# List all worktrees
git worktree list
# Output:
# /home/marvin/Documenten/skillLinkup              abc1234 [supabase]
# /home/marvin/Documenten/skillLinkup-cms          def5678 [cms/main]
# /home/marvin/Documenten/skillLinkup-admin        ghi9012 [admin/main]
```

## Final Directory Structure

```
~/Documenten/
├── skillLinkup/              # Main public blog (supabase branch)
│   ├── .git/                 # Main Git database
│   ├── app/
│   │   ├── page.tsx         # Homepage with SEO blog
│   │   ├── blog/
│   │   ├── post/[slug]/
│   │   ├── about/
│   │   └── contact/
│   ├── src/
│   │   ├── common/
│   │   └── styles/
│   ├── documentation/
│   └── package.json
│
├── skillLinkup-cms/          # CMS subdomain (cms/main branch)
│   ├── .git -> ../skillLinkup/.git/worktrees/skillLinkup-cms
│   ├── app/
│   │   ├── cms/
│   │   │   ├── page.tsx     # CMS Dashboard
│   │   │   ├── posts/       # Post editor
│   │   │   ├── media/       # Media library
│   │   │   └── settings/    # Tenant settings
│   │   └── api/             # CMS API routes
│   ├── src/
│   │   ├── cms-components/  # CMS-specific components
│   │   └── editor/          # Rich text editor
│   └── package.json         # CMS dependencies (TipTap, React DnD)
│
└── skillLinkup-admin/        # Admin subdomain (admin/main branch)
    ├── .git -> ../skillLinkup/.git/worktrees/skillLinkup-admin
    ├── app/
    │   ├── admin/
    │   │   ├── page.tsx     # Admin Dashboard
    │   │   ├── tenants/     # Tenant management
    │   │   ├── users/       # User management
    │   │   └── analytics/   # Analytics & reports
    │   └── api/             # Admin API routes
    ├── src/
    │   ├── admin-components/
    │   └── charts/          # Dashboard charts
    └── package.json         # Admin dependencies (Recharts, DataGrid)
```

## Shared Code Strategy

### Option A: Shared src/ Directory (Recommended)
Keep shared components in `src/common/` and sync across worktrees:

```bash
# From main worktree
cd ~/Documenten/skillLinkup
git add src/common/
git commit -m "feat: update shared components"
git push

# From CMS worktree
cd ~/Documenten/skillLinkup-cms
git merge supabase  # Merge shared changes
```

### Option B: Git Submodule (Advanced)
Create separate `shared-components` repo and reference it:

```bash
# Create shared repo
cd ~/Documenten
mkdir skillLinkup-shared
cd skillLinkup-shared
git init
# ... add shared code

# Add as submodule to each worktree
cd ~/Documenten/skillLinkup
git submodule add ../skillLinkup-shared src/shared
```

## Working with Worktrees

### Daily Workflow

**1. Work on Main Blog (Public Site)**
```bash
cd ~/Documenten/skillLinkup
npm run dev  # Port 3000
# Edit blog features, posts, SEO
git add .
git commit -m "feat: add new blog post"
git push
```

**2. Work on CMS (Content Management)**
```bash
cd ~/Documenten/skillLinkup-cms
npm run dev  # Port 3001 (configure in package.json)
# Edit CMS features, post editor
git add .
git commit -m "feat: add rich text editor"
git push
```

**3. Work on Admin (Administration)**
```bash
cd ~/Documenten/skillLinkup-admin
npm run dev  # Port 3002
# Edit admin features, user management
git add .
git commit -m "feat: add tenant dashboard"
git push
```

### Synchronizing Shared Code

**Scenario: You update shared components in main worktree**

```bash
# In main worktree
cd ~/Documenten/skillLinkup
# Edit src/common/components/Header.tsx
git add src/common/
git commit -m "feat: update shared header"
git push

# Sync to CMS
cd ~/Documenten/skillLinkup-cms
git fetch origin
git merge origin/supabase  # Merge main branch changes
# Resolve any conflicts

# Sync to Admin
cd ~/Documenten/skillLinkup-admin
git fetch origin
git merge origin/supabase
```

### Switching Context for Claude Code

When working with Claude Code, specify which worktree:

```bash
# Work on CMS
cd ~/Documenten/skillLinkup-cms
claude-code

# Work on Admin
cd ~/Documenten/skillLinkup-admin
claude-code

# Work on Main
cd ~/Documenten/skillLinkup
claude-code
```

Claude maintains context by reading `.git/worktrees/` references.

## Port Configuration

Configure each worktree to run on different ports:

### Main (package.json)
```json
{
  "scripts": {
    "dev": "next dev -p 3000"
  }
}
```

### CMS (package.json)
```json
{
  "scripts": {
    "dev": "next dev -p 3001"
  }
}
```

### Admin (package.json)
```json
{
  "scripts": {
    "dev": "next dev -p 3002"
  }
}
```

## Subdomain Configuration (Local Development)

Edit `/etc/hosts` for local subdomain testing:

```bash
sudo nano /etc/hosts

# Add:
127.0.0.1   localhost
127.0.0.1   skilllinkup.local
127.0.0.1   cms.skilllinkup.local
127.0.0.1   admin.skilllinkup.local
```

## Environment Variables per Worktree

Each worktree can have different `.env.local`:

### Main (.env.local)
```env
NEXT_PUBLIC_SITE_URL=https://skilllinkup.com
NEXT_PUBLIC_TENANT_TYPE=public
DATABASE_URL=postgresql://...
```

### CMS (.env.local)
```env
NEXT_PUBLIC_SITE_URL=https://cms.skilllinkup.com
NEXT_PUBLIC_TENANT_TYPE=cms
NEXTAUTH_URL=https://cms.skilllinkup.com
DATABASE_URL=postgresql://...
```

### Admin (.env.local)
```env
NEXT_PUBLIC_SITE_URL=https://admin.skilllinkup.com
NEXT_PUBLIC_TENANT_TYPE=admin
NEXTAUTH_URL=https://admin.skilllinkup.com
DATABASE_URL=postgresql://...
```

## Common Git Worktree Commands

```bash
# List all worktrees
git worktree list

# Remove a worktree
git worktree remove ../skillLinkup-cms

# Prune deleted worktrees
git worktree prune

# Move a worktree
git worktree move ../skillLinkup-cms ../cms

# Lock a worktree (prevent deletion)
git worktree lock ../skillLinkup-cms

# Unlock a worktree
git worktree unlock ../skillLinkup-cms
```

## Deployment Strategy

### Netlify Deployment (Separate Sites)

1. **Main Site** (skilllinkup.com)
   - Deploy from `supabase` branch
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **CMS Site** (cms.skilllinkup.com)
   - Deploy from `cms/main` branch
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Environment: `NEXT_PUBLIC_TENANT_TYPE=cms`

3. **Admin Site** (admin.skilllinkup.com)
   - Deploy from `admin/main` branch
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Environment: `NEXT_PUBLIC_TENANT_TYPE=admin`

## Multi-Tenant Database Integration

Each worktree connects to the same Neon database but with different context:

### Main App (Public Blog)
```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const tenantSlug = extractTenantFromSubdomain(host);

  // Set tenant context for RLS
  const response = NextResponse.next();
  response.headers.set('x-tenant-slug', tenantSlug || 'public');
  return response;
}
```

### CMS App
```typescript
// middleware.ts in CMS worktree
export async function middleware(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // CMS users can manage their tenant's content
  const response = NextResponse.next();
  response.headers.set('x-tenant-id', session.user.tenantId);
  return response;
}
```

### Admin App
```typescript
// middleware.ts in Admin worktree
export async function middleware(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  // Admin can access all tenants
  const response = NextResponse.next();
  response.headers.set('x-is-admin', 'true');
  return response;
}
```

## Best Practices

### 1. Branch Naming Convention
- **Main**: `supabase` (public blog)
- **CMS**: `cms/main`, `cms/feature-name`
- **Admin**: `admin/main`, `admin/feature-name`
- **Shared**: `shared/component-name`

### 2. Commit Message Prefixes
- `feat(main):` - Main blog features
- `feat(cms):` - CMS features
- `feat(admin):` - Admin features
- `feat(shared):` - Shared components
- `fix(main):`, `fix(cms):`, `fix(admin):` - Bug fixes

### 3. Merge Strategy
- **Main ← Shared**: Always merge shared changes to main
- **CMS ← Shared**: Pull shared updates regularly
- **Admin ← Shared**: Pull shared updates regularly
- **Never merge CMS → Main** or **Admin → Main** (keep separate)

### 4. CI/CD per Worktree
Create separate GitHub Actions workflows:

**.github/workflows/main.yml**
```yaml
name: Deploy Main
on:
  push:
    branches: [supabase]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod
```

**.github/workflows/cms.yml**
```yaml
name: Deploy CMS
on:
  push:
    branches: [cms/main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod --site cms-skilllinkup
```

## Troubleshooting

### Issue: Worktree won't delete
```bash
# Force remove
git worktree remove --force ../skillLinkup-cms

# Clean up references
git worktree prune
```

### Issue: Conflicts when merging shared code
```bash
# In CMS worktree
git fetch origin
git merge origin/supabase
# Fix conflicts in IDE
git add .
git commit -m "merge: resolve conflicts from main"
```

### Issue: Claude Code loses context
```bash
# Ensure you're in the correct worktree
pwd
# Should show: /home/marvin/Documenten/skillLinkup-cms

# Claude reads .git/worktrees/skillLinkup-cms/gitdir
cat .git/worktrees/skillLinkup-cms/gitdir
```

## Resources

- [Medium: Mastering Git Worktrees with Claude Code](https://medium.com/@dtunai/mastering-git-worktrees-with-claude-code-for-parallel-development-workflow-41dc91e645fe)
- [Git Worktrees Official Docs](https://git-scm.com/docs/git-worktree)
- [Next.js Multi-Zone](https://nextjs.org/docs/advanced-features/multi-zones)
- [Neon Database Docs](https://neon.com/docs/guides/nextjs)

## Next Steps

1. ✅ Create branches: `cms/main`, `admin/main`
2. ✅ Create worktrees: `skillLinkup-cms`, `skillLinkup-admin`
3. 📋 Set up port configuration (3000, 3001, 3002)
4. 📋 Configure environment variables per worktree
5. 📋 Set up local subdomain testing (/etc/hosts)
6. 📋 Create separate Netlify sites for each subdomain
7. 📋 Implement middleware for tenant context per worktree
