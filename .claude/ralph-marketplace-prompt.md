You are continuing freelance marketplace development on the `feature/marketplace` branch at `/home/marvin/Projecten/Skilllinkup`.

## Context

Read the full implementation plan: `docs/plans/2026-02-22-freelance-marketplace-implementation.md`
Read the design doc: `docs/plans/2026-02-22-freelance-marketplace-design.md`

**Phases 1-2 are COMPLETE.** Check `git log --oneline feature/marketplace --not main` to see all completed work (17 commits).

## Your Task

Implement the NEXT incomplete phase (3, then 4, then 5, then 6) following the plan exactly.

### Phase Overview:
- **Phase 3:** Real-time messaging (Pusher) + Project board with bidding + Milestone payments
- **Phase 4:** Location-based search + Quote request flow for local services
- **Phase 5:** Two-sided review system + Dispute resolution + Freelancer verification/badges
- **Phase 6:** Marketplace SEO pages + Navigation integration + Homepage integration

## How To Work

For each phase:
1. Read the implementation plan for that phase's tasks
2. For each task, dispatch a **coder subagent** (Task tool with subagent_type="coder") with:
   - Complete task description with all file paths, code patterns, i18n strings
   - All project conventions (Next.js 15 await params, force-dynamic, raw Neon SQL, safe helpers, Tailwind styling)
   - Commit instructions
3. After each subagent completes, verify the commit landed with `git log --oneline -1`
4. Move to the next task
5. After all tasks in a phase complete, do a TypeScript check: `npx tsc --noEmit 2>&1 | grep -v '@jest/globals'`
6. Move to the next phase

## Critical Project Conventions (pass to ALL subagents):

```typescript
// Next.js 15: params are Promises
interface PageProps { params: Promise<{ locale: string }>; }
export default async function Page({ params }: PageProps) {
  const { locale } = await params;
}

// Every DB page needs:
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Database: raw Neon SQL (NOT Drizzle ORM)
import { sql } from '@/lib/db';

// Safe helpers for all DB values
import { safeImage, safeText, safeArray } from '@/lib/safe';

// Auth helpers
import { getCurrentUser, requireAuth, requireFreelancer } from '@/lib/auth-helpers';

// i18n: add keys to messages/en.json AND messages/nl.json
// Server: const t = await getTranslations({ locale, namespace: 'key' });
// Client: const t = useTranslations('key');

// Styling: Tailwind with primary (#ef2b70), secondary (#1e1541), accent (#22c55e)
// Icons: lucide-react, Fonts: font-heading (Lexend)
```

## Existing Files You Can Import From:
- `lib/db.ts` - exports `sql` (raw Neon) and `db` (Drizzle)
- `lib/marketplace-queries.ts` - all marketplace query functions
- `lib/auth.ts` - Auth.js v5 config
- `lib/auth-helpers.ts` - getCurrentUser, requireAuth, requireFreelancer
- `lib/stripe.ts` - Stripe server client
- `lib/stripe-client.ts` - Stripe client-side loader
- `lib/safe.ts` - safeImage, safeText, safeArray, safeNumber, safeBoolean
- `lib/defaults.ts` - DEFAULTS object
- `components/header.tsx` - site Header
- `components/footer.tsx` - site Footer
- `components/dashboard/SellerSidebar.tsx` - seller dashboard sidebar

## Completion

When ALL phases 3 through 6 are complete, all commits are in, and TypeScript compiles clean, output:
<promise>ALL PHASES COMPLETE</promise>
