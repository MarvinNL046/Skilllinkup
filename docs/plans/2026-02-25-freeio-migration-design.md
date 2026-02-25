# Freeio Template Migration Design

**Date:** 2026-02-25
**Status:** Approved
**Branch:** `feature/freeio-migration`

## Summary

Migrate the entire SkillLinkup web app from the current Tailwind CSS design to the Freeio freelance marketplace template (v1.6.0). This is a "Big Bang" migration on a feature branch, replacing the CSS framework, adopting the Freeio layout/components, and connecting them to our existing data layer (Convex, Neon PostgreSQL, Clerk, next-intl).

## Tech Stack Changes

### Add
- Bootstrap 5.3.6 + SASS
- Zustand (state management)
- Swiper (carousels)
- react-countup (animated counters)
- rc-slider (price range filters)
- Flaticon + Font Awesome icon fonts
- Freeio CSS: style.css, responsive.css, dashbord_navitaion.css, spacing utilities

### Keep
- Next.js 15 + React 19 + TypeScript
- Convex (marketplace data)
- Neon PostgreSQL + Drizzle ORM (blog, platforms, tools)
- Clerk (authentication)
- next-intl (i18n: en + nl)
- Chart.js + react-chartjs-2
- localStorage for tools

### Remove
- Tailwind CSS + tailwind.config + postcss config
- Stack Auth files (lib/stack.ts, lib/stack-client.ts, etc.)

### Color Palette (override Freeio defaults)
- Primary: `#ef2b70` (replaces Freeio green `#5BBB7B`)
- Secondary: `#1e1541`
- Accent: `#22c55e`

## Pages & Routing

### Public Pages

| Page | Freeio Source | Route | Data Source |
|------|--------------|-------|-------------|
| Homepage | home-20 | /[locale]/ | Convex (featured freelancers, services) + Neon (blog posts) |
| Services list | service-1 | /[locale]/services | Convex (gigs/services) |
| Service detail | service-single-v3 | /[locale]/services/[slug] | Convex (gig detail, reviews) |
| Projects list | project-3 | /[locale]/projects | Convex (projects) |
| Project detail | project-single-v3 | /[locale]/projects/[slug] | Convex (project detail, bids) |
| Job list | job-1 | /[locale]/jobs | Convex (job listings) |
| Freelancers list | freelancer-1 | /[locale]/freelancers | Convex (freelancer profiles) |
| Freelancer detail | freelancer-single-v3 | /[locale]/freelancers/[slug] | Convex (profile, portfolio, reviews) |
| Employees list | employee-1 | /[locale]/employees | Convex (client/employer profiles) |
| About | about-2 | /[locale]/about | Static + next-intl translations |
| Blog list | blog-3 | /[locale]/blog | Neon (posts, categories) |
| Blog detail | existing (restyle) | /[locale]/blog/[slug] | Neon |
| Tools | existing (restyle) | /[locale]/tools/* | localStorage |
| Platforms | existing (restyle) | /[locale]/platforms/* | Neon |

### Auth Pages (Clerk)

| Page | Route | Implementation |
|------|-------|---------------|
| Login | /[locale]/sign-in | Clerk `<SignIn />` with Freeio styling |
| Register | /[locale]/sign-up | Clerk `<SignUp />` with role choice |
| Become Freelancer | /[locale]/become-freelancer | Multi-step onboarding (5 steps) |
| Become Client | /[locale]/become-client | Multi-step onboarding (3 steps) |

### Dashboard Pages (behind auth)

| Page | Freeio Source | Route |
|------|--------------|-------|
| Dashboard overview | dashboard | /[locale]/dashboard |
| My Profile | my-profile | /[locale]/dashboard/my-profile |
| Manage Services | manage-services | /[locale]/dashboard/manage-services |
| Add Services | add-services | /[locale]/dashboard/add-services |
| Manage Projects | manage-projects | /[locale]/dashboard/manage-projects |
| Create Project | create-projects | /[locale]/dashboard/create-projects |
| Manage Jobs | manage-jobs | /[locale]/dashboard/manage-jobs |
| Proposals | proposal | /[locale]/dashboard/proposals |
| Messages | message | /[locale]/dashboard/messages |
| Reviews | reviews | /[locale]/dashboard/reviews |
| Invoice | invoice | /[locale]/dashboard/invoice |
| Payouts | payouts | /[locale]/dashboard/payouts |
| Statements | statements | /[locale]/dashboard/statements |
| Saved | saved | /[locale]/dashboard/saved |
| Stripe Connect | existing | /[locale]/dashboard/stripe |

Dashboard routes are flat (matching Freeio structure). Sidebar shows role-based menu items (freelancer vs client).

## Onboarding Design

Two separate multi-step forms with Zustand state persistence, progress bar, back/next navigation, and per-step validation.

### Freelancer Onboarding (/[locale]/become-freelancer)

| Step | Content | Fields |
|------|---------|--------|
| 1. Basics | Personal info | Name, profile photo, tagline, bio |
| 2. Expertise | What you do | Category, skills (tags), experience level, hourly rate |
| 3. Work preference | How/where you work | Work type (remote/local/hybrid), countries, city, languages |
| 4. Portfolio | Show your work | Portfolio items (title + image + link), certificates |
| 5. Verification | Build trust | ID verification, LinkedIn URL, website |

Steps 4 and 5 are skippable (not required).

### Client Onboarding (/[locale]/become-client)

| Step | Content | Fields |
|------|---------|--------|
| 1. Basics | Who you are | Name, company name (optional), profile photo, bio |
| 2. Needs | What you need | Categories of interest, budget range, project frequency |
| 3. Location | Where you are | Country, city, preference remote/local/hybrid |

### Post-Onboarding
- Convex mutation creates profile
- Clerk custom claim updated: `role: 'freelancer' | 'client'`
- Middleware checks onboarding completion, redirects if incomplete

Registration flow: `Sign Up (Clerk) -> Choose role -> Multi-step onboarding -> Dashboard`

## Component Architecture

### Directory Structure
```
components/
├── layout/          # Header, Footer, MobileNav, Breadcrumb, LanguageSwitcher
├── dashboard/       # DashboardLayout, Sidebar, Header, Footer, StatCard, Charts, DataTable
├── marketplace/     # ServiceCard, FreelancerCard, ProjectCard, JobCard, FilterSidebar, SearchBar
├── forms/           # MultiStepForm, SelectInput, TagInput, ImageUpload, PriceRange
├── onboarding/      # FreelancerOnboarding, ClientOnboarding step components
├── ui/              # Modals, Tooltips, Badges, Buttons (Freeio style)
└── tools/           # TimeTracker, RateCalculator, InvoiceGenerator (restyled)
```

### Shared Layout Components

| Component | Source | Function |
|-----------|--------|----------|
| Header | Freeio header | Navbar: logo, navigation, search, auth buttons, user dropdown |
| MobileNavigation | Freeio | Hamburger menu + slide-in nav for mobile |
| Footer | Freeio footer | Links, social, newsletter |
| Breadcrumb | Freeio breadcumb | Breadcrumb with background banner |
| LanguageSwitcher | Existing | Language toggle NL/EN integrated in header |

### Dashboard Components

| Component | Source | Function |
|-----------|--------|----------|
| DashboardLayout | Freeio | Wrapper: header + sidebar + main + footer |
| DashboardHeader | Freeio | Header with search, notifications, user dropdown |
| DashboardSidebar | Freeio | Navigation, role-based menu items |
| DashboardFooter | Freeio | Copyright footer |
| StatCard | Freeio statistics_funfact | Stat card (icon + value + label) |
| LineChart | Freeio | Profile views / earnings chart |
| DoughnutChart | Freeio | Traffic / distribution chart |
| DataTable | Freeio table-style3 | Reusable table for orders, invoices, statements |
| MessageBox | Freeio | Chat interface (polling-based) |

### Marketplace Components

| Component | Source | Function |
|-----------|--------|----------|
| ServiceCard | Freeio listing-style1 | Gig/service card with image, price, rating |
| FreelancerCard | Freeio | Freelancer card with photo, skills, rate |
| ProjectCard | Freeio | Project card with budget, deadline, bids |
| JobCard | Freeio | Job listing with details |
| ReviewCard | Freeio | Review with stars, text, author |
| FilterSidebar | Freeio | Filters: category, price range (rc-slider), location, rating |
| SearchBar | Freeio hero | Search bar with category dropdown |

### Form Components

| Component | Function |
|-----------|----------|
| MultiStepForm | Wrapper: steps, progress bar, navigation |
| SelectInput | Dropdown (Freeio style) |
| TagInput | Skills/languages tag input with add/remove |
| ImageUpload | Profile photo/portfolio upload |
| PriceRange | rc-slider wrapper |

### Restyled Existing Components

| Component | Change |
|-----------|--------|
| AdWidget | Tailwind -> Bootstrap classes |
| RichTextEditor | Restyle, keep functionality |
| TimeTracker | Tailwind -> Bootstrap |
| RateCalculator | Tailwind -> Bootstrap |
| InvoiceGenerator | Tailwind -> Bootstrap |

## Migration Strategy

### Phase 0: Foundation
1. Install Bootstrap 5 + SASS, copy Freeio CSS/fonts/assets
2. Remove Tailwind CSS (config, postcss, all utility classes)
3. Clean up Stack Auth files
4. Install Zustand, Swiper, rc-slider, react-countup
5. Customize color palette (#ef2b70, #1e1541, #22c55e)
6. Set up Freeio icon fonts (Flaticon + Font Awesome)

### Phase 1: Layout Shell
7. Header + MobileNavigation + Footer (Freeio design)
8. DashboardLayout + DashboardSidebar + DashboardHeader
9. Breadcrumb component
10. LanguageSwitcher integration in header
11. Update root layout: Bootstrap imports, fonts, global styles

**Milestone:** Entire app renders in new Freeio shell.

### Phase 2: Auth & Onboarding
12. Clerk Sign In / Sign Up pages with Freeio styling
13. MultiStepForm component
14. Freelancer onboarding (5 steps)
15. Client onboarding (3 steps)
16. Role-based middleware (onboarding check + redirect)

**Milestone:** Users can register and onboard as freelancer or client.

### Phase 3: Public Marketplace Pages
17. Homepage (home-20) with hero, featured services, freelancers, counters
18. ServiceCard + Services list (service-1) + FilterSidebar
19. Service detail (service-single-v3)
20. FreelancerCard + Freelancers list (freelancer-1)
21. Freelancer detail (freelancer-single-v3)
22. ProjectCard + Projects list (project-3)
23. Project detail (project-single-v3)
24. JobCard + Jobs list (job-1)
25. Employees list (employee-1)
26. About page (about-2)

**Milestone:** All public marketplace pages live with real Convex data.

### Phase 4: Dashboard
27. Dashboard overview (stats, charts, activity)
28. My Profile page
29. Manage Services + Add Services
30. Manage Projects + Create Project
31. Manage Jobs
32. Proposals page
33. Messages (chat interface, polling-based)
34. Reviews page
35. Invoice + Payouts + Statements
36. Saved items
37. Stripe Connect page

**Milestone:** Complete working dashboard for freelancers and clients.

### Phase 5: Restyle Existing Content
38. Blog list (blog-3 design) + blog detail
39. Platforms pages restyle to Bootstrap
40. Tools restyle (TimeTracker, RateCalculator, InvoiceGenerator)
41. AdWidget restyle

**Milestone:** Entire app consistent in Freeio design.

### Phase 6: Polish & Cleanup
42. Responsive testing (mobile, tablet, desktop)
43. i18n translations for all new pages
44. SEO: update sitemap, meta tags, Open Graph
45. Remove old unused components/pages
46. Performance check (bundle size, image optimization)

**Milestone:** Production-ready.

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Bootstrap + lingering Tailwind class conflicts | Phase 0 strips Tailwind completely before adding Bootstrap |
| Freeio mock data replacement edge cases | Use safe helpers (safeText, safeImage) from lib/safe.ts |
| Google Maps dependency in Freeio | Skip for now, use simple location text fields |
| Large bundle size from Bootstrap + icon fonts | Tree-shake unused Bootstrap modules, subset icon fonts |
| JSX -> TSX conversion errors | Gradual conversion with TypeScript strict mode |

## Decisions Log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| CSS Framework | Bootstrap 5 (replace Tailwind) | Fastest path to MVP, 1:1 component copy from template |
| Migration approach | Big Bang on feature branch | Clean codebase, no framework conflicts |
| Icons | Flaticon + Font Awesome (from template) | Matches Freeio design exactly |
| Auth | Clerk (keep) | Already in use, Stack Auth removed |
| i18n | Keep next-intl (en + nl) | Existing investment, user requirement |
| Dashboard routing | Flat (Freeio style) | Simpler than nested seller/client routes |
| Onboarding | Separate multi-step forms per role | Better UX, clearer separation of concerns |
| State management | Zustand (from template) | Lightweight, used by Freeio for sidebar toggle etc. |
| Messaging | Polling-based (keep) | No extra paid subscriptions needed |
