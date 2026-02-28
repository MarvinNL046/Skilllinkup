# Three Worlds Design — SkillLinkup

## Overview

SkillLinkup's UI splits into 3 "worlds" — distinct marketplace verticals that share infrastructure but have unique navigation, heroes, and listing types.

| World | Route prefix | Purpose | Key entities |
|-------|-------------|---------|--------------|
| Online Marketplace | `/online` | Digital freelancers & gigs | gigs, freelancers, projects |
| Local Marketplace | `/local` | Local craftsmen & quote requests | craftsmen (filtered freelancers), quoteRequests, quotes |
| Jobs | `/jobs` | Vacancies & applicants | jobs, companies |

Language: English throughout. Homepage at `/` serves as world picker.

## Architecture: Next.js Route Groups

Each world gets its own route group with a dedicated layout. Shared components are reused with world-specific props/filters.

```
src/app/
├── (home)/page.jsx                    # World picker homepage
├── (online)/
│   ├── layout.jsx                     # Online world layout
│   └── online/
│       ├── page.jsx                   # Online landing (hero + trending gigs)
│       ├── services/page.jsx          # All services (reuse Listing6)
│       ├── services/[slug]/page.jsx   # Services by category
│       ├── service/[id]/page.jsx      # Service detail
│       ├── freelancers/page.jsx       # Freelancers (reuse Listing14)
│       ├── freelancer/[id]/page.jsx   # Freelancer detail
│       ├── projects/page.jsx          # Projects (reuse Listing19)
│       └── project/[id]/page.jsx      # Project detail
├── (local)/
│   ├── layout.jsx                     # Local world layout
│   └── local/
│       ├── page.jsx                   # Local landing (hero + popular quotes)
│       ├── craftsmen/page.jsx         # Browse local craftsmen
│       ├── craftsman/[id]/page.jsx    # Craftsman detail
│       ├── quote-requests/page.jsx    # Browse quote requests
│       └── quote-request/[id]/page.jsx
├── (jobs)/
│   ├── layout.jsx                     # Jobs world layout
│   └── jobs/
│       ├── page.jsx                   # Jobs landing (hero + recent jobs)
│       ├── browse/page.jsx            # All jobs (reuse Listing16)
│       ├── job/[id]/page.jsx          # Job detail
│       └── companies/page.jsx         # Companies listing
```

Existing routes (`/services`, `/freelancers`, `/jobs`, `/projects`) get redirects to their new world-prefixed paths.

## Homepage (World Picker)

URL: `/`

Components:
1. **Header** — General nav (no world-specific items), no WorldSwitcher pills
2. **Hero** — Tagline: "Find the right talent, anywhere"
3. **WorldCards** — 3 cards in a row:
   - Online Marketplace: icon, description, CTA → `/online`, optional live count
   - Local Marketplace: icon, description, CTA → `/local`, optional live count
   - Jobs: icon, description, CTA → `/jobs`, optional live count
4. **Trending section** — Featured content (mix or online-only)
5. **How it works** — 3-4 step explainer
6. **Footer**

## Context-Aware Header

### WorldSwitcher Component
Small pills `[Online | Local | Jobs]` next to the logo. Active world is highlighted. Visible on all world pages, not on homepage.

### WorldContext Provider
React context holding the active world (`"online" | "local" | "jobs" | null`).
- Homepage: `null`
- `/online/*`: `"online"`
- `/local/*`: `"local"`
- `/jobs/*`: `"jobs"`

### Navigation per World

| World | Nav items |
|-------|-----------|
| Homepage | Browse, About, Blog, Contact |
| Online | Services, Freelancers, Projects, About |
| Local | Craftsmen, Quote Requests, About |
| Jobs | Browse Jobs, Companies, About |

Categories mega-menu filters by `serviceType`:
- Online → `serviceType: 'digital'`
- Local → `serviceType: 'local'`
- Jobs → no categories mega-menu (replaced by job type filters)

## Data Layer

### No Schema Changes Required

Existing schema already supports 3 worlds:
- `marketplaceCategories.serviceType: 'digital' | 'local' | 'hybrid'`
- `gigs.workType`, `projects.workType` for online vs local
- `quoteRequests` + `quotes` tables for local marketplace
- `jobs` table for vacancies

### Query Adjustments
- `gigs.list` → add `workType` filter, default `'remote'` for Online
- `freelancerProfiles.list` → filter by `workType` per world
- `quoteRequests.list` → already exists, prominent in Local world
- `jobs.list` → already exists, prominent in Jobs world
- New: `stats.getWorldCounts` → counts services/craftsmen/jobs for homepage cards

### Component Reuse
Existing Listing components (Listing6, Listing14, Listing16, Listing19) receive an optional `worldFilter` prop to select the correct Convex query parameters.

## Redirects

Old routes redirect to new world-prefixed routes:
- `/services` → `/online/services`
- `/freelancers` → `/online/freelancers`
- `/projects` → `/online/projects`
- `/service/[id]` → `/online/service/[id]`
- `/freelancer/[id]` → `/online/freelancer/[id]`
- `/project/[id]` → `/online/project/[id]`
- `/job/[id]` → `/jobs/job/[id]`

Dashboard routes remain unchanged at `/dashboard/*`.
