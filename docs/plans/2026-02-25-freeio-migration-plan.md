# Freeio Template Migration - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate SkillLinkup from Tailwind CSS to the Freeio freelance marketplace Bootstrap template, replacing all pages with Freeio design while preserving Convex, Clerk, and next-intl.

**Architecture:** Big Bang migration on `feature/freeio-migration` branch. Strip Tailwind, install Bootstrap 5 + SASS, copy Freeio CSS/fonts/assets, then rebuild pages from template JSX converted to TSX. All data flows through Convex (marketplace) and Neon/Drizzle (blog, platforms). Clerk handles auth, next-intl handles i18n.

**Tech Stack:** Next.js 15.5.4, React 19, TypeScript, Bootstrap 5.3.6, SASS, Convex, Clerk, next-intl, Zustand, Chart.js, Swiper, rc-slider

**Freeio template location:** `/home/marvin/Projecten/freelance marketplace template/freeio`
**SkillLinkup project:** `/home/marvin/Projecten/Skilllinkup`

---

## Phase 0: Foundation

### Task 1: Create feature branch

**Step 1: Create and switch to feature branch**

```bash
cd /home/marvin/Projecten/Skilllinkup
git checkout -b feature/freeio-migration
```

**Step 2: Commit**

```bash
git commit --allow-empty -m "chore: start freeio migration branch"
```

---

### Task 2: Install new dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install Bootstrap, SASS, and Freeio dependencies**

```bash
npm install bootstrap@5.3.6 sass zustand swiper rc-slider react-countup wowjs @popperjs/core fslightbox-react react-stickynode react-tooltip
```

**Step 2: Verify installation**

```bash
node -e "require('bootstrap/package.json').version"
# Expected: 5.3.6
```

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install Bootstrap 5, SASS, and Freeio dependencies"
```

---

### Task 3: Copy Freeio CSS assets

**Files:**
- Create: `public/css/` (entire directory from Freeio)
- Create: `public/fonts/` (entire directory from Freeio)

**Step 1: Copy CSS files**

```bash
cp -r "/home/marvin/Projecten/freelance marketplace template/freeio/public/css" /home/marvin/Projecten/Skilllinkup/public/css
```

**Step 2: Copy font files**

```bash
cp -r "/home/marvin/Projecten/freelance marketplace template/freeio/public/fonts" /home/marvin/Projecten/Skilllinkup/public/fonts
```

**Step 3: Copy webfonts (Font Awesome)**

```bash
cp -r "/home/marvin/Projecten/freelance marketplace template/freeio/public/fonts/webfonts" /home/marvin/Projecten/Skilllinkup/public/fonts/webfonts
```

**Step 4: Copy essential Freeio images (logos, icons, backgrounds)**

```bash
cp "/home/marvin/Projecten/freelance marketplace template/freeio/public/images/header-logo"* /home/marvin/Projecten/Skilllinkup/public/images/
cp "/home/marvin/Projecten/freelance marketplace template/freeio/public/images/dashboard-navicon.svg" /home/marvin/Projecten/Skilllinkup/public/images/
cp "/home/marvin/Projecten/freelance marketplace template/freeio/public/images/mobile-dark-nav-icon.svg" /home/marvin/Projecten/Skilllinkup/public/images/
cp "/home/marvin/Projecten/freelance marketplace template/freeio/public/images/white-nav-icon.svg" /home/marvin/Projecten/Skilllinkup/public/images/
cp -r "/home/marvin/Projecten/freelance marketplace template/freeio/public/images/background" /home/marvin/Projecten/Skilllinkup/public/images/background
cp -r "/home/marvin/Projecten/freelance marketplace template/freeio/public/images/vector-img" /home/marvin/Projecten/Skilllinkup/public/images/vector-img
cp -r "/home/marvin/Projecten/freelance marketplace template/freeio/public/images/icon" /home/marvin/Projecten/Skilllinkup/public/images/icon
cp -r "/home/marvin/Projecten/freelance marketplace template/freeio/public/images/partners" /home/marvin/Projecten/Skilllinkup/public/images/partners
cp -r "/home/marvin/Projecten/freelance marketplace template/freeio/public/images/team" /home/marvin/Projecten/Skilllinkup/public/images/team
cp -r "/home/marvin/Projecten/freelance marketplace template/freeio/public/images/testimonials" /home/marvin/Projecten/Skilllinkup/public/images/testimonials
cp -r "/home/marvin/Projecten/freelance marketplace template/freeio/public/images/about" /home/marvin/Projecten/Skilllinkup/public/images/about
cp -r "/home/marvin/Projecten/freelance marketplace template/freeio/public/images/listings" /home/marvin/Projecten/Skilllinkup/public/images/listings
cp -r "/home/marvin/Projecten/freelance marketplace template/freeio/public/images/home" /home/marvin/Projecten/Skilllinkup/public/images/home
cp -r "/home/marvin/Projecten/freelance marketplace template/freeio/public/images/blog" /home/marvin/Projecten/Skilllinkup/public/images/blog
cp -r "/home/marvin/Projecten/freelance marketplace template/freeio/public/images/resource" /home/marvin/Projecten/Skilllinkup/public/images/resource
cp -r "/home/marvin/Projecten/freelance marketplace template/freeio/public/images/gallery" /home/marvin/Projecten/Skilllinkup/public/images/gallery
```

**Step 5: Verify files copied**

```bash
ls /home/marvin/Projecten/Skilllinkup/public/css/ | wc -l
# Expected: 15+ files
ls /home/marvin/Projecten/Skilllinkup/public/fonts/ | wc -l
# Expected: 5+ files (flaticon fonts)
```

**Step 6: Commit**

```bash
git add public/css/ public/fonts/ public/images/
git commit -m "chore: copy Freeio CSS, fonts, and image assets"
```

---

### Task 4: Remove Tailwind CSS

**Files:**
- Delete: `tailwind.config.js`
- Delete: `postcss.config.mjs`
- Modify: `app/globals.css` (replace Tailwind with Freeio imports)

**Step 1: Delete Tailwind config files**

```bash
rm /home/marvin/Projecten/Skilllinkup/tailwind.config.js
rm /home/marvin/Projecten/Skilllinkup/postcss.config.mjs
```

**Step 2: Uninstall Tailwind packages**

```bash
npm uninstall tailwindcss @tailwindcss/typography postcss autoprefixer
```

**Step 3: Replace globals.css with Freeio imports**

Replace `app/globals.css` entirely with:

```css
/* Freeio CSS Framework Imports */
@import "../../public/css/bootstrap.min.css";
@import "../../public/css/animate.css";
@import "../../public/css/ace-responsive-menu.css";
@import "../../public/css/menu.css";
@import "../../public/css/fontawesome.css";
@import "../../public/css/flaticon.css";
@import "../../public/css/bootstrap-select.min.css";
@import "../../public/css/slider.css";
@import "../../public/css/style.css";
@import "../../public/css/ud-custom-spacing.css";
@import "../../public/css/dashbord_navitaion.css";
@import "../../public/css/responsive.css";

/* Third-party component CSS */
@import "rc-slider/assets/index.css";
@import "react-tooltip/dist/react-tooltip.css";

/* SkillLinkup Custom Overrides */
:root {
  --theme-color: #ef2b70;
  --theme-color2: #1e1541;
  --theme-color3: #22c55e;
}

/* Override Freeio green (#5BBB7B) with our primary pink */
.text-thm,
.toggle-btn .active,
a:hover {
  color: #ef2b70 !important;
}

.btn-thm,
.ud-btn.btn-thm {
  background-color: #ef2b70 !important;
  border-color: #ef2b70 !important;
}

.btn-thm:hover,
.ud-btn.btn-thm:hover {
  background-color: #d1245f !important;
  border-color: #d1245f !important;
}

.bgc-thm {
  background-color: #ef2b70 !important;
}

.bdrc-thm {
  border-color: #ef2b70 !important;
}

/* Secondary color overrides */
.text-thm2 {
  color: #1e1541 !important;
}

.bgc-thm2 {
  background-color: #1e1541 !important;
}

/* Accent/success color */
.text-thm3,
.text-success-custom {
  color: #22c55e !important;
}
```

**Step 4: Verify build still starts (will have styling issues, that's expected)**

```bash
cd /home/marvin/Projecten/Skilllinkup && npx next build 2>&1 | tail -5
```

Expected: Build may have warnings but should not error on CSS imports.

**Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove Tailwind CSS, replace with Freeio Bootstrap imports and color overrides"
```

---

### Task 5: Clean up Stack Auth files

**Files:**
- Delete: `lib/stack.ts` (if exists)
- Delete: `lib/stack-client.ts` (if exists)
- Modify: Any files still importing Stack Auth

**Step 1: Find all Stack Auth references**

```bash
grep -r "stack" /home/marvin/Projecten/Skilllinkup/lib/ --include="*.ts" --include="*.tsx" -l
grep -r "stack-auth\|stackAuth\|StackAuth\|@stackframe" /home/marvin/Projecten/Skilllinkup/  --include="*.ts" --include="*.tsx" -l
```

**Step 2: Delete Stack Auth specific files**

Delete any files found that are Stack Auth specific (lib/stack.ts, lib/stack-client.ts). Keep files that only reference `stackAuthId` as a database field name (that's a Convex schema field, not a Stack Auth import).

**Step 3: Clean up any dangling imports**

Remove imports of Stack Auth from any files that still reference them.

**Step 4: Verify no Stack Auth imports remain**

```bash
grep -r "@stackframe\|from.*stack-auth\|from.*stack-client" /home/marvin/Projecten/Skilllinkup/ --include="*.ts" --include="*.tsx"
# Expected: No output (no remaining Stack Auth imports)
```

**Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove Stack Auth files and references"
```

---

### Task 6: Set up Zustand stores

**Files:**
- Create: `store/toggleStore.ts`
- Create: `store/listingStore.ts`
- Create: `store/priceStore.ts`

**Step 1: Create store directory**

```bash
mkdir -p /home/marvin/Projecten/Skilllinkup/store
```

**Step 2: Create toggleStore.ts**

Convert from Freeio's `src/store/toggleStore.js` to TypeScript:

```typescript
// store/toggleStore.ts
import { create } from 'zustand';

interface ToggleState {
  isDashboardSidebarActive: boolean;
  isListingActive: boolean;
  dashboardSidebarToggleHandler: () => void;
  listingToggleHandler: () => void;
}

export const useToggleStore = create<ToggleState>((set) => ({
  isDashboardSidebarActive: false,
  isListingActive: false,
  dashboardSidebarToggleHandler: () =>
    set((state) => ({ isDashboardSidebarActive: !state.isDashboardSidebarActive })),
  listingToggleHandler: () =>
    set((state) => ({ isListingActive: !state.isListingActive })),
}));
```

**Step 3: Create listingStore.ts**

Convert from Freeio's `src/store/listingStore.js`:

```typescript
// store/listingStore.ts
import { create } from 'zustand';

interface ListingState {
  deliveryTime: string;
  level: string;
  location: string[];
  bestSeller: string;
  designTool: string[];
  speak: string[];
  search: string;
  category: string[];
  projectType: string;
  englishLevel: string;
  jobType: string[];
  noOfEmployee: string;
  setDeliveryTime: (val: string) => void;
  setLevel: (val: string) => void;
  setLocation: (val: string[]) => void;
  setBestSeller: (val: string) => void;
  setDesignTool: (val: string[]) => void;
  setSpeak: (val: string[]) => void;
  setSearch: (val: string) => void;
  setCategory: (val: string[]) => void;
  setProjectType: (val: string) => void;
  setEnglishLevel: (val: string) => void;
  setJobType: (val: string[]) => void;
  setNoOfEmployee: (val: string) => void;
  resetFilters: () => void;
}

const initialState = {
  deliveryTime: '',
  level: '',
  location: [],
  bestSeller: '',
  designTool: [],
  speak: [],
  search: '',
  category: [],
  projectType: '',
  englishLevel: '',
  jobType: [],
  noOfEmployee: '',
};

export const useListingStore = create<ListingState>((set) => ({
  ...initialState,
  setDeliveryTime: (val) => set({ deliveryTime: val }),
  setLevel: (val) => set({ level: val }),
  setLocation: (val) => set({ location: val }),
  setBestSeller: (val) => set({ bestSeller: val }),
  setDesignTool: (val) => set({ designTool: val }),
  setSpeak: (val) => set({ speak: val }),
  setSearch: (val) => set({ search: val }),
  setCategory: (val) => set({ category: val }),
  setProjectType: (val) => set({ projectType: val }),
  setEnglishLevel: (val) => set({ englishLevel: val }),
  setJobType: (val) => set({ jobType: val }),
  setNoOfEmployee: (val) => set({ noOfEmployee: val }),
  resetFilters: () => set(initialState),
}));
```

**Step 4: Create priceStore.ts**

```typescript
// store/priceStore.ts
import { create } from 'zustand';

interface PriceState {
  plan: string;
  priceRange: [number, number];
  togglePlan: (val: string) => void;
  setPriceRange: (val: [number, number]) => void;
}

export const usePriceStore = create<PriceState>((set) => ({
  plan: '1m',
  priceRange: [0, 100000],
  togglePlan: (val) => set({ plan: val }),
  setPriceRange: (val) => set({ priceRange: val }),
}));
```

**Step 5: Commit**

```bash
git add store/
git commit -m "feat: add Zustand stores (toggle, listing filters, price range)"
```

---

### Task 7: Copy Freeio data files

**Files:**
- Create: `data/dashboard.ts`
- Create: `data/navigation.ts`

**Step 1: Create data directory**

```bash
mkdir -p /home/marvin/Projecten/Skilllinkup/data
```

**Step 2: Create navigation data**

Convert Freeio's navigation data from `src/data/dashboard.js` to TypeScript. This provides sidebar menu items, invoice mock data, etc. Read the original file and convert to typed exports.

```typescript
// data/navigation.ts
export interface NavItem {
  id: number;
  label: string;
  icon: string;
  href: string;
  roles?: ('freelancer' | 'client')[];
}

export const dashboardNavigation: NavItem[] = [
  // START section
  { id: 1, label: 'Dashboard', icon: 'flaticon-home', href: '/dashboard' },
  { id: 2, label: 'My Proposals', icon: 'flaticon-document', href: '/dashboard/proposals', roles: ['freelancer'] },
  { id: 3, label: 'Saved', icon: 'flaticon-like', href: '/dashboard/saved' },
  { id: 4, label: 'Message', icon: 'flaticon-chat', href: '/dashboard/messages' },
  { id: 5, label: 'Reviews', icon: 'flaticon-review-1', href: '/dashboard/reviews' },
  { id: 6, label: 'Invoice', icon: 'flaticon-receipt', href: '/dashboard/invoice' },
  { id: 7, label: 'Payouts', icon: 'flaticon-dollar', href: '/dashboard/payouts', roles: ['freelancer'] },
  { id: 8, label: 'Statements', icon: 'flaticon-web', href: '/dashboard/statements' },
  // ORGANIZE & MANAGE section
  { id: 9, label: 'Manage Services', icon: 'flaticon-presentation', href: '/dashboard/manage-services', roles: ['freelancer'] },
  { id: 10, label: 'Manage Jobs', icon: 'flaticon-briefcase', href: '/dashboard/manage-jobs', roles: ['client'] },
  { id: 11, label: 'Manage Projects', icon: 'flaticon-content', href: '/dashboard/manage-projects', roles: ['client'] },
  { id: 12, label: 'Add Services', icon: 'flaticon-document', href: '/dashboard/add-services', roles: ['freelancer'] },
  { id: 13, label: 'Create Project', icon: 'flaticon-content', href: '/dashboard/create-projects', roles: ['client'] },
  // ACCOUNT section
  { id: 14, label: 'My Profile', icon: 'flaticon-photo', href: '/dashboard/my-profile' },
  { id: 15, label: 'Logout', icon: 'flaticon-logout', href: '/sign-out' },
];

export const navigationSections = [
  { title: 'Start', items: [1, 2, 3, 4, 5, 6, 7, 8] },
  { title: 'Organize and Manage', items: [9, 10, 11, 12, 13] },
  { title: 'Account', items: [14, 15] },
];
```

**Step 3: Commit**

```bash
git add data/
git commit -m "feat: add navigation data with role-based menu items"
```

---

## Phase 1: Layout Shell

### Task 8: Update root layout with Bootstrap

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/[locale]/layout.tsx`

**Step 1: Read current root layout**

Read `app/layout.tsx` to understand current font setup and structure.

**Step 2: Update root layout**

Replace font imports with DM Sans (Freeio's font). Keep Clerk/Convex/next-intl providers. Add Bootstrap JS dynamic import. Import globals.css (which now has Freeio CSS).

Key changes:
- Font: Switch from Inter/Lexend to `DM_Sans` with weights 400, 500, 700
- Add `className="wrapper ovh"` to body (Freeio pattern)
- Keep all existing providers (ClerkProvider, ConvexClientProvider, NextIntlClientProvider)

**Step 3: Update locale layout**

Read `app/[locale]/layout.tsx`. Keep provider structure. Remove any Tailwind-specific class references.

**Step 4: Verify dev server starts**

```bash
cd /home/marvin/Projecten/Skilllinkup && npm run dev &
# Check http://localhost:3000 loads without crash
```

**Step 5: Commit**

```bash
git add app/layout.tsx app/[locale]/layout.tsx
git commit -m "feat: update root layout with DM Sans font and Bootstrap setup"
```

---

### Task 9: Create Header component

**Files:**
- Create: `components/layout/Header.tsx`
- Create: `components/layout/Navigation.tsx`
- Create: `components/layout/MobileNavigation.tsx`

**Step 1: Read Freeio Header19**

Read `/home/marvin/Projecten/freelance marketplace template/freeio/src/components/header/Header19.jsx` (used by home-20).

**Step 2: Create Header.tsx**

Convert Header19.jsx to TypeScript. Key adaptations:
- Replace hardcoded links with locale-aware `Link` from next-intl
- Replace "Sign In" / "Join" buttons with Clerk `<SignedIn>` / `<SignedOut>` components
- Add `LanguageSwitcher` component integration
- Use `useUser()` from Clerk for user dropdown
- Keep all Bootstrap classes identical to Freeio

**Step 3: Create Navigation.tsx**

Convert Freeio's `Navigation.jsx` to TypeScript. Replace hardcoded menu items with data from `data/navigation.ts`. Add locale prefix to all links using `useLocale()` from next-intl.

**Step 4: Create MobileNavigation.tsx**

Convert Freeio's `MobileNavigation2.jsx` to TypeScript. Same adaptations as Header.

**Step 5: Verify header renders**

Start dev server, check that header appears with logo, navigation, and auth buttons.

**Step 6: Commit**

```bash
git add components/layout/
git commit -m "feat: add Freeio Header, Navigation, and MobileNavigation components"
```

---

### Task 10: Create Footer component

**Files:**
- Create: `components/layout/Footer.tsx`

**Step 1: Read Freeio Footer14**

Read `/home/marvin/Projecten/freelance marketplace template/freeio/src/components/footer/Footer14.jsx` (used by home-20).

**Step 2: Create Footer.tsx**

Convert to TypeScript. Replace hardcoded text with `useTranslations()` calls. Add locale-aware links. Keep Bootstrap classes.

**Step 3: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: add Freeio Footer component"
```

---

### Task 11: Create Breadcrumb component

**Files:**
- Create: `components/layout/Breadcrumb.tsx`

**Step 1: Read Freeio Breadcrumb component**

Read from `/home/marvin/Projecten/freelance marketplace template/freeio/src/components/breadcumb/`.

**Step 2: Create Breadcrumb.tsx**

Convert to TypeScript with props for `title`, `subtitle`, and `breadcrumbItems` array. Use next-intl Link.

**Step 3: Commit**

```bash
git add components/layout/Breadcrumb.tsx
git commit -m "feat: add Freeio Breadcrumb component"
```

---

### Task 12: Create DashboardLayout components

**Files:**
- Create: `components/dashboard/DashboardLayout.tsx`
- Create: `components/dashboard/DashboardHeader.tsx`
- Create: `components/dashboard/DashboardSidebar.tsx`
- Create: `components/dashboard/DashboardFooter.tsx`

**Step 1: Read Freeio dashboard layout files**

Read:
- `/home/marvin/Projecten/freelance marketplace template/freeio/src/components/dashboard/DashboardLayout.jsx`
- `/home/marvin/Projecten/freelance marketplace template/freeio/src/components/dashboard/header/DashboardHeader.jsx`
- `/home/marvin/Projecten/freelance marketplace template/freeio/src/components/dashboard/sidebar/DashboardSidebar.jsx`
- `/home/marvin/Projecten/freelance marketplace template/freeio/src/components/dashboard/footer/DashboardFooter.jsx`

**Step 2: Create DashboardLayout.tsx**

Convert to TypeScript. Use `useToggleStore()` for sidebar toggle. Wrap children with sidebar + main content pattern.

**Step 3: Create DashboardSidebar.tsx**

Convert to TypeScript. Key adaptations:
- Import navigation items from `data/navigation.ts`
- Filter items by user role (from Clerk `useUser()` + Convex user data)
- Use `usePathname()` from next/navigation for active state
- Use locale-aware links

**Step 4: Create DashboardHeader.tsx**

Convert to TypeScript. Integrate Clerk user data for profile dropdown. Add notification/message badges from Convex queries.

**Step 5: Create DashboardFooter.tsx**

Simple copyright footer, convert to TypeScript.

**Step 6: Commit**

```bash
git add components/dashboard/
git commit -m "feat: add Freeio DashboardLayout, Sidebar, Header, and Footer"
```

---

### Task 13: Wire up layouts to pages

**Files:**
- Modify: `app/[locale]/layout.tsx` (add Header + Footer for public pages)
- Create: `app/[locale]/dashboard/layout.tsx` (DashboardLayout wrapper)

**Step 1: Update locale layout**

Wrap page content with `<Header />` and `<Footer />` for public pages. Dashboard pages will use their own layout.

**Step 2: Create dashboard layout**

```typescript
// app/[locale]/dashboard/layout.tsx
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
```

**Step 3: Verify both layouts render**

- Visit `http://localhost:3000/en` → Should show Freeio header + footer
- Visit `http://localhost:3000/en/dashboard` → Should show dashboard sidebar + header

**Step 4: Commit**

```bash
git add app/[locale]/layout.tsx app/[locale]/dashboard/layout.tsx
git commit -m "feat: wire up Freeio layouts - public Header/Footer and Dashboard layout"
```

---

## Phase 2: Auth & Onboarding

### Task 14: Restyle Clerk auth pages

**Files:**
- Modify: `app/[locale]/sign-in/[[...sign-in]]/page.tsx`
- Modify: `app/[locale]/sign-up/[[...sign-up]]/page.tsx`

**Step 1: Read Freeio login/register page structure**

Read:
- `/home/marvin/Projecten/freelance marketplace template/freeio/src/app/(auth)/login/page.jsx`
- `/home/marvin/Projecten/freelance marketplace template/freeio/src/app/(auth)/register/page.jsx`

**Step 2: Wrap Clerk components in Freeio auth layout**

Use Freeio's auth page layout (centered card with background) wrapping Clerk's `<SignIn />` and `<SignUp />` components. Use Clerk's `appearance` prop to match Bootstrap styling.

**Step 3: Commit**

```bash
git add app/[locale]/sign-in/ app/[locale]/sign-up/
git commit -m "feat: restyle Clerk auth pages with Freeio layout"
```

---

### Task 15: Create MultiStepForm component

**Files:**
- Create: `components/forms/MultiStepForm.tsx`

**Step 1: Build reusable multi-step form wrapper**

```typescript
// components/forms/MultiStepForm.tsx
"use client";

interface MultiStepFormProps {
  steps: { title: string; description: string }[];
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  children: React.ReactNode;
}
```

Features:
- Progress bar showing current step (Bootstrap progress component)
- Step indicator with titles
- Back / Next / Submit buttons
- Step validation callback before advancing

**Step 2: Commit**

```bash
git add components/forms/MultiStepForm.tsx
git commit -m "feat: add MultiStepForm component with progress bar and navigation"
```

---

### Task 16: Create form input components

**Files:**
- Create: `components/forms/SelectInput.tsx`
- Create: `components/forms/TagInput.tsx`
- Create: `components/forms/ImageUpload.tsx`

**Step 1: Create SelectInput**

Freeio-styled dropdown select. Uses Bootstrap form-select classes.

**Step 2: Create TagInput**

Input with tag pills. Add button adds tag, X removes tag. Used for skills, languages.

**Step 3: Create ImageUpload**

Profile photo / portfolio image upload with preview. Uses existing upload API pattern.

**Step 4: Commit**

```bash
git add components/forms/
git commit -m "feat: add form components (SelectInput, TagInput, ImageUpload)"
```

---

### Task 17: Freelancer onboarding flow

**Files:**
- Create: `app/[locale]/become-freelancer/page.tsx`
- Create: `components/onboarding/FreelancerOnboarding.tsx`
- Create: `components/onboarding/steps/FreelancerBasics.tsx`
- Create: `components/onboarding/steps/FreelancerExpertise.tsx`
- Create: `components/onboarding/steps/FreelancerWorkPreference.tsx`
- Create: `components/onboarding/steps/FreelancerPortfolio.tsx`
- Create: `components/onboarding/steps/FreelancerVerification.tsx`
- Create: `store/onboardingStore.ts`

**Step 1: Create onboarding Zustand store**

```typescript
// store/onboardingStore.ts
import { create } from 'zustand';

interface FreelancerOnboardingState {
  currentStep: number;
  // Step 1: Basics
  name: string;
  profilePhoto: string;
  tagline: string;
  bio: string;
  // Step 2: Expertise
  category: string;
  skills: string[];
  experienceLevel: string;
  hourlyRate: number;
  // Step 3: Work Preference
  workType: 'remote' | 'local' | 'hybrid';
  countries: string[];
  city: string;
  languages: string[];
  // Step 4: Portfolio
  portfolioItems: { title: string; image: string; link: string }[];
  certificates: string[];
  // Step 5: Verification
  linkedinUrl: string;
  websiteUrl: string;
  // Actions
  setStep: (step: number) => void;
  updateField: (field: string, value: any) => void;
  reset: () => void;
}
```

**Step 2: Create each step component**

Each step is a form section using `SelectInput`, `TagInput`, `ImageUpload` from `components/forms/`. Each validates its own fields before allowing "Next".

**Step 3: Create FreelancerOnboarding.tsx**

Client component that composes MultiStepForm + step components. On final submit, calls Convex mutation to create freelancer profile + updates Clerk metadata.

**Step 4: Create page.tsx**

Server component that renders FreelancerOnboarding inside Freeio auth layout (similar to login page - centered card, clean background).

**Step 5: Verify flow**

Navigate to `/en/become-freelancer`. Walk through all 5 steps. Verify form state persists between steps. Verify skip works on steps 4/5.

**Step 6: Commit**

```bash
git add app/[locale]/become-freelancer/ components/onboarding/ store/onboardingStore.ts
git commit -m "feat: add freelancer onboarding multi-step form (5 steps)"
```

---

### Task 18: Client onboarding flow

**Files:**
- Create: `app/[locale]/become-client/page.tsx`
- Create: `components/onboarding/ClientOnboarding.tsx`
- Create: `components/onboarding/steps/ClientBasics.tsx`
- Create: `components/onboarding/steps/ClientNeeds.tsx`
- Create: `components/onboarding/steps/ClientLocation.tsx`

**Step 1: Extend onboarding store with client fields**

Add client-specific fields to `store/onboardingStore.ts` or create separate client store.

**Step 2: Create 3 step components**

Similar pattern to freelancer but simpler (3 steps instead of 5).

**Step 3: Create page and verify**

**Step 4: Commit**

```bash
git add app/[locale]/become-client/ components/onboarding/
git commit -m "feat: add client onboarding multi-step form (3 steps)"
```

---

### Task 19: Role-based middleware

**Files:**
- Modify: `middleware.ts`

**Step 1: Read current middleware**

Read `/home/marvin/Projecten/Skilllinkup/middleware.ts`.

**Step 2: Add onboarding redirect logic**

After Clerk auth check, if user is authenticated but has no `userType` set, redirect to role selection page. If `userType` is set but onboarding is incomplete, redirect to appropriate onboarding page.

**Step 3: Verify redirects work**

- New user signs up → redirected to role selection
- User selects freelancer → redirected to `/become-freelancer`
- User completes onboarding → redirected to `/dashboard`

**Step 4: Commit**

```bash
git add middleware.ts
git commit -m "feat: add role-based onboarding redirect middleware"
```

---

## Phase 3: Public Marketplace Pages

### Task 20: Homepage (home-20)

**Files:**
- Modify: `app/[locale]/page.tsx`
- Create: `components/homepage/Hero20.tsx`
- Create: `components/homepage/TrendingServices.tsx`
- Create: `components/homepage/BrowseCategories.tsx`
- Create: `components/homepage/Testimonials.tsx`
- Create: `components/homepage/Partners.tsx`
- Create: `components/homepage/CtaBanner.tsx`
- Create: `components/homepage/InspiringWork.tsx`

**Step 1: Read Freeio home-20 page and all section components**

Read:
- `/home/marvin/Projecten/freelance marketplace template/freeio/src/app/(home)/home-20/page.jsx`
- All section components referenced (Hero20, TrendingService14, BrowserCategory20, etc.)

**Step 2: Create each section component**

Convert each Freeio section to TypeScript. Replace mock data with:
- `TrendingServices`: Convex query for featured services/gigs
- `BrowseCategories`: Convex query for categories
- `Testimonials`: Convex query or static data
- `Partners`: Static images
- `Hero20`: Search bar that navigates to `/services?search=...`

**Step 3: Compose homepage**

Wire all sections into `app/[locale]/page.tsx` matching Freeio home-20 layout order.

**Step 4: Commit**

```bash
git add app/[locale]/page.tsx components/homepage/
git commit -m "feat: add Freeio home-20 homepage with hero, services, categories, testimonials"
```

---

### Task 21: ServiceCard + Services list + FilterSidebar

**Files:**
- Create: `components/marketplace/ServiceCard.tsx`
- Create: `components/marketplace/FilterSidebar.tsx`
- Create: `app/[locale]/services/page.tsx`

**Step 1: Read Freeio service-1 page and listing card**

Read Freeio's service listing components and filter sidebar.

**Step 2: Create ServiceCard.tsx**

Freeio's `listing-style1` card pattern. Props: title, image, price, rating, freelancer name/avatar, category.

**Step 3: Create FilterSidebar.tsx**

Category checkboxes, price range (rc-slider), location filter, rating filter. Uses `useListingStore` for state.

**Step 4: Create services page**

Server component fetches all services from Convex. Passes to client component with filters.

**Step 5: Commit**

```bash
git add components/marketplace/ app/[locale]/services/
git commit -m "feat: add services listing page with ServiceCard and FilterSidebar"
```

---

### Task 22: Service detail page

**Files:**
- Create: `app/[locale]/services/[slug]/page.tsx`

**Step 1: Read Freeio service-single-v3**

Read the detail page layout: image gallery, description, pricing packages, reviews, freelancer sidebar.

**Step 2: Create service detail page**

Server component fetches service by slug from Convex. Renders Freeio service-single-v3 layout.

**Step 3: Commit**

```bash
git add app/[locale]/services/[slug]/
git commit -m "feat: add service detail page (service-single-v3)"
```

---

### Task 23: FreelancerCard + Freelancers list

**Files:**
- Create: `components/marketplace/FreelancerCard.tsx`
- Create: `app/[locale]/freelancers/page.tsx`

**Step 1: Read Freeio freelancer-1**

**Step 2: Create FreelancerCard + listing page with filters**

**Step 3: Commit**

```bash
git add components/marketplace/FreelancerCard.tsx app/[locale]/freelancers/
git commit -m "feat: add freelancers listing page with FreelancerCard"
```

---

### Task 24: Freelancer detail page

**Files:**
- Create: `app/[locale]/freelancers/[slug]/page.tsx`

**Step 1: Read Freeio freelancer-single-v3**

**Step 2: Create detail page** - Portfolio, skills, reviews, hire button, contact

**Step 3: Commit**

```bash
git add app/[locale]/freelancers/[slug]/
git commit -m "feat: add freelancer detail page (freelancer-single-v3)"
```

---

### Task 25: ProjectCard + Projects list

**Files:**
- Create: `components/marketplace/ProjectCard.tsx`
- Create: `app/[locale]/projects/page.tsx`

**Step 1: Read Freeio project-3**

**Step 2: Create ProjectCard + listing page**

**Step 3: Commit**

```bash
git add components/marketplace/ProjectCard.tsx app/[locale]/projects/
git commit -m "feat: add projects listing page with ProjectCard"
```

---

### Task 26: Project detail page

**Files:**
- Create: `app/[locale]/projects/[slug]/page.tsx`

**Step 1: Read Freeio project-single-v3**

**Step 2: Create detail page** - Description, budget, deadline, bids, bid submission form

**Step 3: Commit**

```bash
git add app/[locale]/projects/[slug]/
git commit -m "feat: add project detail page (project-single-v3)"
```

---

### Task 27: JobCard + Jobs list

**Files:**
- Create: `components/marketplace/JobCard.tsx`
- Create: `app/[locale]/jobs/page.tsx`

**Step 1: Read Freeio job-1**

**Step 2: Create JobCard + listing page**

**Step 3: Commit**

```bash
git add components/marketplace/JobCard.tsx app/[locale]/jobs/
git commit -m "feat: add jobs listing page with JobCard"
```

---

### Task 28: Employees list

**Files:**
- Create: `app/[locale]/employees/page.tsx`

**Step 1: Read Freeio employee-1**

**Step 2: Create employees page** - Client/employer profiles with company info

**Step 3: Commit**

```bash
git add app/[locale]/employees/
git commit -m "feat: add employees listing page"
```

---

### Task 29: About page

**Files:**
- Create: `app/[locale]/about/page.tsx`

**Step 1: Read Freeio about-2**

**Step 2: Create about page** - Team section, stats counters, mission statement. Use react-countup for animated numbers.

**Step 3: Commit**

```bash
git add app/[locale]/about/
git commit -m "feat: add about page (about-2)"
```

---

## Phase 4: Dashboard

### Task 30: Dashboard overview

**Files:**
- Modify: `app/[locale]/dashboard/page.tsx`
- Create: `components/dashboard/StatCard.tsx`
- Create: `components/dashboard/LineChart.tsx`
- Create: `components/dashboard/DoughnutChart.tsx`
- Create: `components/dashboard/RecentActivity.tsx`

**Step 1: Read Freeio DashboardInfo.jsx and chart components**

**Step 2: Create StatCard.tsx**

Freeio's `statistics_funfact` pattern. Props: icon, label, value, meta text.

**Step 3: Create chart components**

Convert Freeio's LineChart.jsx and DoughnutChart.jsx to TypeScript. Connect to Convex data (earnings, profile views).

**Step 4: Create RecentActivity.tsx**

Timeline component showing recent orders, messages, reviews.

**Step 5: Compose dashboard page**

4 stat cards in grid, charts (8-4 split), 3-column bottom section (most viewed, recent purchases, activity).

**Step 6: Commit**

```bash
git add app/[locale]/dashboard/page.tsx components/dashboard/
git commit -m "feat: add dashboard overview with stats, charts, and activity feed"
```

---

### Task 31: My Profile page

**Files:**
- Create: `app/[locale]/dashboard/my-profile/page.tsx`

**Step 1: Read Freeio MyProfileInfo.jsx and ProfileDetails.jsx**

**Step 2: Create profile page**

Form with: profile image, name, email, tagline, bio, hourly rate, skills, languages, work type, location, social links. Submit calls Convex mutation to update profile.

**Step 3: Commit**

```bash
git add app/[locale]/dashboard/my-profile/
git commit -m "feat: add dashboard My Profile page"
```

---

### Task 32: Manage Services + Add Services

**Files:**
- Create: `app/[locale]/dashboard/manage-services/page.tsx`
- Create: `app/[locale]/dashboard/add-services/page.tsx`
- Create: `components/dashboard/ManageServiceCard.tsx`

**Step 1: Read Freeio ManageServiceInfo.jsx and AddServiceInfo.jsx**

**Step 2: Create manage services** - Table with service cards, status tabs, edit/delete actions

**Step 3: Create add services** - Multi-section form for creating new service/gig

**Step 4: Commit**

```bash
git add app/[locale]/dashboard/manage-services/ app/[locale]/dashboard/add-services/ components/dashboard/ManageServiceCard.tsx
git commit -m "feat: add Manage Services and Add Services dashboard pages"
```

---

### Task 33: Manage Projects + Create Project

**Files:**
- Create: `app/[locale]/dashboard/manage-projects/page.tsx`
- Create: `app/[locale]/dashboard/create-projects/page.tsx`

**Step 1: Read Freeio ManageProjectInfo.jsx and CreateProjectInfo.jsx**

**Step 2: Create both pages**

**Step 3: Commit**

```bash
git add app/[locale]/dashboard/manage-projects/ app/[locale]/dashboard/create-projects/
git commit -m "feat: add Manage Projects and Create Project dashboard pages"
```

---

### Task 34: Manage Jobs

**Files:**
- Create: `app/[locale]/dashboard/manage-jobs/page.tsx`

**Step 1: Read Freeio ManageJobInfo.jsx**

**Step 2: Create page**

**Step 3: Commit**

```bash
git add app/[locale]/dashboard/manage-jobs/
git commit -m "feat: add Manage Jobs dashboard page"
```

---

### Task 35: Proposals page

**Files:**
- Create: `app/[locale]/dashboard/proposals/page.tsx`
- Create: `components/dashboard/DataTable.tsx`

**Step 1: Read Freeio ProposalInfo.jsx**

**Step 2: Create reusable DataTable component**

Freeio's `table-style3` pattern. Reusable for proposals, invoices, payouts, statements.

**Step 3: Create proposals page using DataTable**

**Step 4: Commit**

```bash
git add app/[locale]/dashboard/proposals/ components/dashboard/DataTable.tsx
git commit -m "feat: add Proposals page with reusable DataTable component"
```

---

### Task 36: Messages page

**Files:**
- Create: `app/[locale]/dashboard/messages/page.tsx`
- Create: `components/dashboard/MessageLayout.tsx`
- Create: `components/dashboard/ConversationList.tsx`
- Create: `components/dashboard/ChatWindow.tsx`

**Step 1: Read Freeio MessageInfo.jsx and MessageBox.jsx**

**Step 2: Create messaging components**

Split-pane layout: conversation list (33%) + chat window (67%). Connect to existing Convex chat queries with polling.

**Step 3: Commit**

```bash
git add app/[locale]/dashboard/messages/ components/dashboard/
git commit -m "feat: add Messages page with conversation list and chat window"
```

---

### Task 37: Reviews page

**Files:**
- Create: `app/[locale]/dashboard/reviews/page.tsx`

**Step 1: Read Freeio ReviewsInfo.jsx**

**Step 2: Create reviews page** - Tabbed layout (received/given/pending)

**Step 3: Commit**

```bash
git add app/[locale]/dashboard/reviews/
git commit -m "feat: add Reviews dashboard page"
```

---

### Task 38: Invoice + Payouts + Statements

**Files:**
- Create: `app/[locale]/dashboard/invoice/page.tsx`
- Create: `app/[locale]/dashboard/payouts/page.tsx`
- Create: `app/[locale]/dashboard/statements/page.tsx`

**Step 1: Read Freeio InvoiceInfo, PayoutInfo, StatementInfo**

**Step 2: Create all three pages** using DataTable component

**Step 3: Commit**

```bash
git add app/[locale]/dashboard/invoice/ app/[locale]/dashboard/payouts/ app/[locale]/dashboard/statements/
git commit -m "feat: add Invoice, Payouts, and Statements dashboard pages"
```

---

### Task 39: Saved items page

**Files:**
- Create: `app/[locale]/dashboard/saved/page.tsx`

**Step 1: Read Freeio SavedInfo.jsx**

**Step 2: Create saved page** - Grid of saved services/freelancers with remove button

**Step 3: Commit**

```bash
git add app/[locale]/dashboard/saved/
git commit -m "feat: add Saved items dashboard page"
```

---

### Task 40: Stripe Connect page

**Files:**
- Modify: `app/[locale]/dashboard/stripe/page.tsx` (restyle existing)

**Step 1: Read existing Stripe page**

**Step 2: Restyle with Bootstrap classes**

Keep Stripe Connect logic, replace Tailwind classes with Bootstrap equivalents.

**Step 3: Commit**

```bash
git add app/[locale]/dashboard/stripe/
git commit -m "feat: restyle Stripe Connect page with Bootstrap"
```

---

## Phase 5: Restyle Existing Content

### Task 41: Blog pages

**Files:**
- Modify: `app/[locale]/blog/page.tsx` (restyle to blog-3)
- Modify: `app/[locale]/blog/[slug]/page.tsx` (restyle detail)

**Step 1: Read Freeio blog-3 layout**

Read `/home/marvin/Projecten/freelance marketplace template/freeio/src/app/(blog)/blog-3/page.jsx`.

**Step 2: Restyle blog list** to match blog-3 layout

**Step 3: Restyle blog detail** with Freeio typography and layout

**Step 4: Commit**

```bash
git add app/[locale]/blog/
git commit -m "feat: restyle blog pages with Freeio blog-3 design"
```

---

### Task 42: Platforms pages

**Files:**
- Modify: All files under `app/[locale]/platforms/`

**Step 1: Restyle platform list and detail pages**

Replace Tailwind classes with Bootstrap. Match card style to ServiceCard pattern.

**Step 2: Commit**

```bash
git add app/[locale]/platforms/
git commit -m "feat: restyle platforms pages with Bootstrap"
```

---

### Task 43: Tools pages

**Files:**
- Modify: `app/[locale]/tools/page.tsx`
- Modify: `app/[locale]/tools/time-tracker/page.tsx`
- Modify: `app/[locale]/tools/rate-calculator/page.tsx`
- Modify: `app/[locale]/tools/invoice-generator/page.tsx`

**Step 1: Restyle all tools pages**

Replace Tailwind with Bootstrap. Keep all localStorage logic and functionality.

**Step 2: Commit**

```bash
git add app/[locale]/tools/
git commit -m "feat: restyle tools pages with Bootstrap"
```

---

### Task 44: AdWidget restyle

**Files:**
- Modify: `components/AdWidget.tsx`

**Step 1: Replace Tailwind classes with Bootstrap**

**Step 2: Commit**

```bash
git add components/AdWidget.tsx
git commit -m "feat: restyle AdWidget with Bootstrap"
```

---

## Phase 6: Polish & Cleanup

### Task 45: Responsive testing

**Step 1: Test all pages at mobile (375px), tablet (768px), desktop (1280px)**

Use Playwright or browser dev tools to verify:
- Header collapses to mobile nav
- Dashboard sidebar hides on mobile
- Cards stack on mobile, grid on desktop
- Forms are usable on mobile

**Step 2: Fix any responsive issues found**

**Step 3: Commit fixes**

```bash
git add -A
git commit -m "fix: responsive layout issues across all pages"
```

---

### Task 46: i18n translations

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/nl.json`

**Step 1: Add translation keys for all new pages**

Dashboard labels, onboarding steps, marketplace filters, button text, etc.

**Step 2: Add Dutch translations**

Use existing translation workflow or Google Translate script.

**Step 3: Commit**

```bash
git add messages/
git commit -m "feat: add i18n translations for all new pages (en + nl)"
```

---

### Task 47: SEO updates

**Files:**
- Modify: `app/sitemap.ts`
- Modify: Various `page.tsx` files (metadata)

**Step 1: Update sitemap**

Add all new routes: /services, /freelancers, /projects, /jobs, /employees, /about, /become-freelancer, /become-client.

**Step 2: Add metadata to all new pages**

Title, description, Open Graph images for each public page.

**Step 3: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat: update sitemap and SEO metadata for all new pages"
```

---

### Task 48: Remove old unused files

**Step 1: Find unused components**

```bash
# List old dashboard components that are now replaced
ls components/dashboard/
# Check for any old Tailwind-only components
```

**Step 2: Delete unused files**

Remove old seller dashboard structure, old Tailwind components, etc.

**Step 3: Verify build passes**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove old unused components and Tailwind artifacts"
```

---

### Task 49: Performance check

**Step 1: Analyze bundle size**

```bash
npm run build
# Check .next/analyze or build output for bundle sizes
```

**Step 2: Optimize if needed**

- Subset icon fonts (remove unused Flaticon/FA icons)
- Lazy load heavy components (charts, Swiper)
- Optimize images

**Step 3: Final commit**

```bash
git add -A
git commit -m "perf: optimize bundle size and lazy-load heavy components"
```

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 0 | 1-7 | Foundation: dependencies, CSS, stores, data |
| 1 | 8-13 | Layout Shell: header, footer, sidebar, breadcrumb |
| 2 | 14-19 | Auth & Onboarding: Clerk restyle, multi-step forms, middleware |
| 3 | 20-29 | Public Pages: homepage, services, freelancers, projects, jobs, about |
| 4 | 30-40 | Dashboard: overview, profile, services, projects, messages, financials |
| 5 | 41-44 | Restyle: blog, platforms, tools, ads |
| 6 | 45-49 | Polish: responsive, i18n, SEO, cleanup, performance |

**Total: 49 tasks across 6 phases**

Each phase produces a working milestone. Phase 0+1 gives you the visual shell. Phase 2 gives auth. Phase 3 gives the public marketplace. Phase 4 gives the full dashboard. Phase 5+6 polish everything.
