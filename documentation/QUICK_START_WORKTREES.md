# Quick Start: Git Worktrees for SkillLinkup

## ✅ Setup Complete!

Your Git Worktrees are now configured:

```
~/Documenten/
├── skillLinkup/              ✅ Main public blog (main branch)
├── skillLinkup-cms/          ✅ CMS subdomain (cms/main branch)
└── skillLinkup-admin/        ✅ Admin subdomain (admin/main branch)
```

## Verify Setup

```bash
cd ~/Documenten/skillLinkup
git worktree list

# Output:
# /home/marvin/Documenten/skillLinkup        ba8e6c1 [main]
# /home/marvin/Documenten/skillLinkup-admin  ba8e6c1 [admin/main]
# /home/marvin/Documenten/skillLinkup-cms    ba8e6c1 [cms/main]
```

## Next Steps

### 1. Configure Development Ports

**Main App (package.json)**
```bash
cd ~/Documenten/skillLinkup
nano package.json
# Change: "dev": "next dev -p 3000"
```

**CMS App (package.json)**
```bash
cd ~/Documenten/skillLinkup-cms
nano package.json
# Change: "dev": "next dev -p 3001"
```

**Admin App (package.json)**
```bash
cd ~/Documenten/skillLinkup-admin
nano package.json
# Change: "dev": "next dev -p 3002"
```

### 2. Install Dependencies per Worktree

```bash
# Main
cd ~/Documenten/skillLinkup
npm install

# CMS (will have additional dependencies later)
cd ~/Documenten/skillLinkup-cms
npm install

# Admin (will have additional dependencies later)
cd ~/Documenten/skillLinkup-admin
npm install
```

### 3. Run Development Servers

Open 3 terminals:

**Terminal 1: Main Blog**
```bash
cd ~/Documenten/skillLinkup
npm run dev
# http://localhost:3000
```

**Terminal 2: CMS**
```bash
cd ~/Documenten/skillLinkup-cms
npm run dev
# http://localhost:3001
```

**Terminal 3: Admin**
```bash
cd ~/Documenten/skillLinkup-admin
npm run dev
# http://localhost:3002
```

### 4. Configure Local Subdomains (Optional)

Edit `/etc/hosts`:
```bash
sudo nano /etc/hosts

# Add:
127.0.0.1   skilllinkup.local
127.0.0.1   cms.skilllinkup.local
127.0.0.1   admin.skilllinkup.local
```

## Daily Workflow Examples

### Work on Main Blog
```bash
cd ~/Documenten/skillLinkup
npm run dev
# Edit blog features, write posts
git add .
git commit -m "feat(main): add new blog post"
git push
```

### Work on CMS
```bash
cd ~/Documenten/skillLinkup-cms
npm run dev
# Edit CMS features
git add .
git commit -m "feat(cms): add post editor"
git push
```

### Work on Admin
```bash
cd ~/Documenten/skillLinkup-admin
npm run dev
# Edit admin features
git add .
git commit -m "feat(admin): add user management"
git push
```

### Sync Shared Code

When you update shared components in main:
```bash
# In main worktree
cd ~/Documenten/skillLinkup
git add src/common/
git commit -m "feat(shared): update header component"
git push

# Sync to CMS
cd ~/Documenten/skillLinkup-cms
git fetch origin
git merge origin/main

# Sync to Admin
cd ~/Documenten/skillLinkup-admin
git fetch origin
git merge origin/main
```

## How Claude Code Maintains Context

When you run Claude Code from any worktree, it can see:
1. The current worktree's files
2. The shared Git history
3. Links to other worktrees via `.git/worktrees/`

This means I (Claude) maintain full context across all subdomains!

## Architecture Overview

```
┌─────────────────────────────────────────┐
│  SKILLLINKUP MULTI-SUBDOMAIN ARCHITECTURE │
└─────────────────────────────────────────┘

┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  MAIN APP        │  │  CMS APP         │  │  ADMIN APP       │
│  Port 3000       │  │  Port 3001       │  │  Port 3002       │
├──────────────────┤  ├──────────────────┤  ├──────────────────┤
│ • Public Blog    │  │ • Post Editor    │  │ • User Mgmt      │
│ • SEO Content    │  │ • Media Library  │  │ • Tenant Mgmt    │
│ • Affiliate Links│  │ • Tenant Settings│  │ • Analytics      │
└──────────────────┘  └──────────────────┘  └──────────────────┘
         │                     │                     │
         └─────────────────────┴─────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │  SHARED GIT REPO   │
                    │  NEON DATABASE     │
                    └───────────────────┘
```

## Environment Variables

Each worktree should have its own `.env.local`:

### Main (.env.local)
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_TENANT_TYPE=public
```

### CMS (.env.local)
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3001
NEXT_PUBLIC_TENANT_TYPE=cms
```

### Admin (.env.local)
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3002
NEXT_PUBLIC_TENANT_TYPE=admin
```

## Common Commands

```bash
# List all worktrees
git worktree list

# Check which worktree you're in
pwd
git branch --show-current

# Switch between worktrees (just cd)
cd ~/Documenten/skillLinkup        # Main
cd ~/Documenten/skillLinkup-cms    # CMS
cd ~/Documenten/skillLinkup-admin  # Admin
```

## Troubleshooting

### "Not a git repository" error
```bash
# Make sure you're in a worktree directory
pwd
# Should show one of:
# /home/marvin/Documenten/skillLinkup
# /home/marvin/Documenten/skillLinkup-cms
# /home/marvin/Documenten/skillLinkup-admin
```

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or change port in package.json
"dev": "next dev -p 3003"
```

## What's Next?

1. ✅ Git Worktrees are set up
2. 📋 Configure port numbers (3000, 3001, 3002)
3. 📋 Create environment variables per worktree
4. 📋 Set up Neon database connection
5. 📋 Build CMS features in CMS worktree
6. 📋 Build Admin features in Admin worktree
7. 📋 Deploy to Netlify (3 separate sites)

## Resources

- [Full Git Worktrees Guide](./GIT_WORKTREES_SETUP.md)
- [Multi-Tenant Architecture](./MULTI_TENANT_ARCHITECTURE.md)
- [Product Vision & Roadmap](./PRODUCT_VISION_ROADMAP.md)
