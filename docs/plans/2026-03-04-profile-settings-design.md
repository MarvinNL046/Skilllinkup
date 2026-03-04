# Profile & Settings Page — Design Document

**Date**: 2026-03-04
**Status**: Approved
**Scope**: Dashboard only (public profile page `/freelancer/[id]` is a separate sprint)

---

## Overview

Transform the current minimal `/my-profile` dashboard page into a full-featured, tabbed profile editor for all user types (freelancers, local workers, job seekers, clients). Approach: iterative — build one tab at a time, always deployable.

---

## Route & Navigation

**Single route**: `/my-profile`
**Tab state**: URL query param `?tab=profile|portfolio|experience|settings`
**Default**: `?tab=profile`

Sidebar link stays as-is. Tab bar renders inside the page.

---

## Tab 1 — Profile (extend existing)

**File**: `src/components/dashboard/section/ProfileDetails.jsx` (extend)

### Fields to add to existing form:
- Cover image upload (wide banner at top, stored via Convex storage)
- Twitter/X URL
- GitHub URL

### Convex schema additions (`freelancerProfiles`):
```
twitterUrl: v.optional(v.string())
githubUrl: v.optional(v.string())
profileVisibility: v.optional(v.string())  // "public" | "private"
contactPermission: v.optional(v.string())  // "everyone" | "clients_only" | "nobody"
```

### Cover image upload:
Same pattern as avatar: `generateCoverUploadUrl` mutation → Convex storage → `saveCoverStorageId` mutation.

---

## Tab 2 — Portfolio (new)

**New Convex table**: `portfolioProjects`

```typescript
portfolioProjects: defineTable({
  userId: v.id("users"),
  tenantId: v.id("tenants"),
  title: v.string(),
  description: v.optional(v.string()),
  imageIds: v.optional(v.array(v.string())),   // Convex storage IDs
  imageUrls: v.optional(v.array(v.string())),  // resolved public URLs
  tags: v.optional(v.array(v.string())),
  externalUrl: v.optional(v.string()),
  sortOrder: v.optional(v.number()),
  createdAt: v.number(),
  updatedAt: v.number(),
}).index("by_user", ["userId"])
```

**New Convex file**: `convex/marketplace/portfolio.ts`
- `getByUser(userId)` — query
- `create(userId, title, description, imageIds, tags, externalUrl)` — mutation
- `update(projectId, ...fields)` — mutation
- `remove(projectId)` — mutation
- `generateImageUploadUrl()` — mutation (Convex storage)
- `saveProjectImages(projectId, storageIds[])` — mutation

**UI components**:

```
PortfolioTab.jsx
  PortfolioProjectCard.jsx    — thumbnail grid, edit/delete icons
  PortfolioProjectModal.jsx   — add/edit modal
    MultiImageUploader.jsx    — drag-drop or click, max 5 images, Convex storage
```

**Layout**: 2-column grid (desktop), 1-column (mobile). Each card shows first image as thumbnail, title, tags. Edit/delete icons on hover.

**Modal fields**: Title (required), Description, Tags (comma-separated), External URL, Images (up to 5, reorderable).

---

## Tab 3 — Experience (new)

**New Convex tables**:

```typescript
workExperience: defineTable({
  userId: v.id("users"),
  tenantId: v.id("tenants"),
  company: v.string(),
  companyLogoUrl: v.optional(v.string()),
  title: v.string(),
  startDate: v.number(),          // timestamp
  endDate: v.optional(v.number()), // null if isCurrent
  isCurrent: v.optional(v.boolean()),
  description: v.optional(v.string()),
  sortOrder: v.optional(v.number()),
  createdAt: v.number(),
}).index("by_user", ["userId"])

education: defineTable({
  userId: v.id("users"),
  tenantId: v.id("tenants"),
  school: v.string(),
  degree: v.optional(v.string()),
  field: v.optional(v.string()),
  startYear: v.optional(v.number()),
  endYear: v.optional(v.number()),
  description: v.optional(v.string()),
  sortOrder: v.optional(v.number()),
  createdAt: v.number(),
}).index("by_user", ["userId"])

userCertifications: defineTable({
  userId: v.id("users"),
  tenantId: v.id("tenants"),
  name: v.string(),
  issuer: v.optional(v.string()),
  year: v.optional(v.number()),
  url: v.optional(v.string()),
  createdAt: v.number(),
}).index("by_user", ["userId"])
```

> **Note**: Languages already stored in `freelancerProfiles.languages[]`. Extend to structured format: add `userLanguages` table with `language` + `level` (native/fluent/intermediate/basic). Or: keep as simple array for now (simpler to ship).

**Decision**: Keep languages as comma-separated array in existing field for now. Add proper level structure in a future iteration.

**New Convex file**: `convex/marketplace/experience.ts`
- CRUD for workExperience, education, userCertifications

**UI components**:

```
ExperienceTab.jsx
  WorkExperienceSection.jsx   — timeline list, add/edit/delete
  EducationSection.jsx        — list, add/edit/delete
  CertificationsSection.jsx   — list, add/edit/delete (nice-to-have)
  ExperienceModal.jsx         — shared modal for add/edit (type-aware)
```

**Pattern**: Each section has a "+ Add" button. Items show as cards with edit (pencil) and delete (trash) icons. Clicking edit opens a modal pre-filled with existing data.

---

## Tab 4 — Settings (new)

**New Convex table**:

```typescript
userNotificationSettings: defineTable({
  userId: v.id("users"),
  newMessage: v.optional(v.boolean()),
  orderUpdate: v.optional(v.boolean()),
  reviewReceived: v.optional(v.boolean()),
  marketingEmails: v.optional(v.boolean()),
  updatedAt: v.number(),
}).index("by_user", ["userId"])
```

**New Convex file**: `convex/marketplace/notificationSettings.ts`
- `getByUser(userId)` — query
- `upsert(userId, settings)` — mutation

**UI sections**:

### Account
- Email: read-only display (from Clerk, cannot change here)
- "Change Password" button → `clerk.openUserProfile()` or redirect to Clerk hosted page
- "Delete Account" danger zone (future scope, not in this sprint)

### Account Type Switcher
- Pill buttons: `Client | Freelancer | Job Seeker`
- Calls existing `updateUserType` mutation on users table
- Warning: switching type may affect visible dashboard links

### Notification Preferences
- Toggle list:
  - New message received
  - Order status update
  - Review received
  - Marketing & tips (SkillLinkup newsletter)

### Privacy
- "Profile visibility" — Public / Private toggle
- "Who can contact me" — Everyone / Clients only / Nobody dropdown
- Stored on `freelancerProfiles.profileVisibility` / `contactPermission`

---

## Implementation Order (Iterative)

| Phase | Tab | Key work | Schema changes |
|-------|-----|----------|----------------|
| 1 | Profile | Tab bar, cover image, Twitter/GitHub fields | Add 4 fields to freelancerProfiles |
| 2 | Portfolio | New table, CRUD, multi-image upload | portfolioProjects table |
| 3 | Experience | New tables, LinkedIn-style timeline UI | workExperience, education, userCertifications |
| 4 | Settings | Account type switcher, notifications, privacy | userNotificationSettings table |

Each phase is independently deployable.

---

## Technical Notes

- **Convex file storage**: All image uploads (cover, portfolio, company logos) use `ctx.storage.generateUploadUrl()` → direct upload from browser → `ctx.storage.getUrl(storageId)` to resolve public URL.
- **Tab URL state**: `useSearchParams()` + `useRouter()` in `MyProfileInfo.jsx`. Tab switches update URL without full page reload.
- **Modals**: Bootstrap modals (`data-bs-toggle="modal"`) consistent with existing dashboard components.
- **Auth guard**: All mutations require `ctx.auth.getUserIdentity()` — same pattern as existing mutations.
- **Public profile page** (`/freelancer/[id]`): NOT in scope for this sprint. Data added in this sprint will be available for a future public profile update.
