# Ralph Loop Prompt: SkillLinkup Freeio Template → Werkende Webapp

## Doel
Maak de SkillLinkup webapp volledig werkend door het Freeio Next.js template te verbinden met de bestaande Convex backend en Clerk auth. Alle knoppen, pagina's en flows moeten werken.

## Huidige Staat
- **Frontend**: Freeio Next.js 15.3.2 template (src/app, src/components, src/data)
- **Backend**: Convex backend VOLLEDIG aanwezig (convex/ directory, 696-line schema, 11+ modules, marketplace met 13 modules)
- **Auth**: Clerk keys + Convex auth.config.ts al geconfigureerd in .env.local
- **Probleem**: Frontend gebruikt hardcoded static data (src/data/*.js), geen providers, geen middleware, geen auth flow

## Fase 1: Providers & Dependencies (EERST)

### 1.1 Installeer ontbrekende packages
```bash
npm install convex @clerk/nextjs
```

### 1.2 Voeg ClerkProvider + ConvexProvider toe aan src/app/layout.js
- Wrap de app met ClerkProvider en ConvexProviderWithClerk
- Gebruik de bestaande env vars: NEXT_PUBLIC_CONVEX_URL, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- Let op: layout.js is al "use client"

### 1.3 Maak middleware.ts aan in project root
- Clerk middleware voor auth route protection
- Public routes: /, /about-2, /blog-3, /blog-single, /contact, /faq, /help, /pricing, /terms, /service-6, /service-single-v3, /freelancer-2, /freelancer-single-v3, /employee-2, /employee-single, /project-4, /project-single-v3, /job-3, /job-single, /login, /register, /become-seller
- Protected routes: /dashboard/*, /add-services, /create-projects, /manage-*, /my-profile, /invoice, /message, /payouts, /proposal, /reviews, /saved, /statements

### Smoke Test Fase 1:
- [ ] `npm run dev` start zonder errors
- [ ] Homepage (/) laadt correct
- [ ] ClerkProvider is actief (check React DevTools of console)
- [ ] Convex client connect (check browser console voor Convex connection)

---

## Fase 2: Auth Flow

### 2.1 Login pagina (src/app/(auth)/login/page.jsx)
- Vervang de statische form met Clerk's `<SignIn />` component
- Of: behoud het Freeio design maar koppel form submission aan Clerk
- Redirect na login naar /dashboard

### 2.2 Register pagina (src/app/(auth)/register/page.jsx)
- Vervang met Clerk's `<SignUp />` component
- Of: behoud design, koppel aan Clerk

### 2.3 User sync
- Na Clerk login → trigger `users.syncUser` Convex mutation
- Dit staat al in convex/users.ts (syncUser functie)
- Maak een ConvexUserSync component die in layout draait

### 2.4 Header auth state
- Toon login/register knoppen voor uitgelogde users
- Toon avatar/naam + logout voor ingelogde users
- Header component: src/components/header/Header19.jsx (home-20 gebruikt deze)

### Smoke Test Fase 2:
- [ ] /login toont Clerk sign-in (of werkende form)
- [ ] /register toont Clerk sign-up (of werkende form)
- [ ] Na login → redirect naar /dashboard
- [ ] User wordt gesyncet naar Convex (check Convex dashboard)
- [ ] Header toont juiste auth state
- [ ] Logout werkt
- [ ] Protected routes redirecten naar /login als niet ingelogd

---

## Fase 3: Data Layer - Vervang Static Data met Convex

### 3.1 Belangrijke data files die vervangen moeten worden:
- `src/data/product.js` (32KB hardcoded gigs/services) → `useQuery(api.marketplace.gigs.list)`
- `src/data/job.js` → `useQuery(api.marketplace.jobs.list)`
- `src/data/project.js` → `useQuery(api.marketplace.projects.list)`
- `src/data/blog.js` → `useQuery(api.posts.list)`

### 3.2 Maak data-bridge hooks (src/hook/)
Maak hooks die Convex data omzetten naar het format dat de Freeio components verwachten:
```
useGigs() → haalt Convex gigs op, mapped naar product.js format
useJobs() → haalt Convex jobs op, mapped naar job.js format
useProjects() → haalt Convex projects op
useFreelancers() → haalt Convex freelancer profiles op
useBlogPosts() → haalt Convex posts op
```

### 3.3 Update listing componenten
- De Listing componenten (Listing12, Listing14, etc.) importeren nu uit src/data/
- Update deze om de nieuwe hooks te gebruiken
- Behoud fallback naar static data als Convex nog leeg is

### 3.4 Update card componenten
- GigCard, JobCard, ProjectCard, FreelancerCard, etc.
- Zorg dat ze werken met zowel static data als Convex data

### Smoke Test Fase 3:
- [ ] /service-6 toont services (uit Convex of fallback static data)
- [ ] /freelancer-2 toont freelancers
- [ ] /project-4 toont projects
- [ ] /job-3 toont jobs
- [ ] /blog-3 toont blog posts
- [ ] Detail pagina's werken (service-single-v3, freelancer-single-v3, etc.)
- [ ] Zoeken/filteren werkt op listing pagina's

---

## Fase 4: Dashboard Connecties

### 4.1 Dashboard layout
- src/app/(dashboard)/ heeft 13 pagina's
- Alle moeten protected zijn (alleen ingelogde users)
- Sidebar navigatie moet werken

### 4.2 Koppel dashboard pagina's aan Convex:
- `/dashboard` → Overview stats (useQuery api.marketplace.dashboard)
- `/my-profile` → Profiel bewerken (useMutation api.users)
- `/manage-services` → Eigen services/gigs beheren
- `/manage-jobs` → Eigen jobs beheren
- `/manage-projects` → Eigen projects beheren
- `/message` → Berichten (conversations + messages)
- `/reviews` → Reviews bekijken
- `/proposal` → Bids/proposals bekijken
- `/saved` → Opgeslagen items
- `/invoice` → Facturen
- `/payouts` → Uitbetalingen
- `/statements` → Overzichten
- `/add-services` → Nieuwe service toevoegen
- `/create-projects` → Nieuw project aanmaken

### Smoke Test Fase 4:
- [ ] /dashboard laadt met user data
- [ ] Sidebar navigatie werkt tussen alle dashboard pagina's
- [ ] /my-profile toont en kan profiel updaten
- [ ] /add-services form werkt (maakt gig aan in Convex)
- [ ] /create-projects form werkt
- [ ] /message toont conversations
- [ ] /manage-services toont eigen services
- [ ] /saved toont opgeslagen items

---

## Fase 5: Overige Pagina's

### 5.1 Statische pagina's (hoeven geen Convex):
- /about-2, /contact, /faq, /help, /pricing, /terms, /become-seller
- Controleer dat ze correct laden en links werken

### 5.2 Single/detail pagina's:
- /service-single-v3 → Moet gig data laden uit Convex
- /freelancer-single-v3 → Freelancer profiel uit Convex
- /project-single-v3 → Project detail uit Convex
- /job-single → Job detail uit Convex
- /blog-single → Blog post uit Convex
- /employee-single → Employee profiel uit Convex

### Smoke Test Fase 5:
- [ ] Alle statische pagina's laden zonder errors
- [ ] Navigatie links tussen pagina's werken
- [ ] Detail pagina's tonen data (of graceful empty state)
- [ ] 404 pagina werkt voor niet-bestaande routes

---

## Fase 6: Final Smoke Test & Polish

### 6.1 Volledige flow test:
- [ ] Bezoeker kan homepage bekijken
- [ ] Bezoeker kan services/freelancers/projects/jobs browsen
- [ ] Bezoeker kan registreren
- [ ] Nieuwe user kan inloggen
- [ ] Ingelogde user ziet dashboard
- [ ] User kan profiel aanmaken/bewerken
- [ ] User kan service/gig aanmaken
- [ ] User kan project aanmaken
- [ ] User kan zoeken en filteren
- [ ] User kan uitloggen
- [ ] Alle pagina navigatie werkt (geen broken links)
- [ ] Geen console errors

### 6.2 Build test:
```bash
npm run build
```
- [ ] Build slaagt zonder errors
- [ ] Geen TypeScript/ESLint blocking errors

---

## Belangrijke Context

### Convex Schema Structuur (key tables):
- `users` → synced van Clerk, heeft role (client/freelancer/admin)
- `gigs` → services/gigs met packages, images
- `projects` → client projects met bids
- `jobs` → vacatures
- `orders` → bestellingen met milestones
- `conversations` + `messages` → chat
- `marketplaceReviews` → reviews
- `freelancerProfiles` → freelancer details
- `savedItems` → bookmarks

### Convex Functions (al gebouwd):
- `convex/users.ts` → syncUser, getCurrentUser, setUserType
- `convex/marketplace/gigs.ts` → list, create, update, getBySlug
- `convex/marketplace/jobs.ts` → list, create, getBySlug
- `convex/marketplace/projects.ts` → list, create, getBySlug
- `convex/marketplace/freelancers.ts` → list, search, getById
- `convex/marketplace/orders.ts` → create, updateStatus
- `convex/marketplace/reviews.ts` → create, getByTarget
- `convex/chat/conversations.ts` + `convex/chat/messages.ts` → messaging
- `convex/posts.ts` → blog posts
- `convex/categories.ts`, `convex/platforms.ts`, `convex/tools.ts`, `convex/ads.ts`

### Zustand Stores (bestaand, behouden):
- `src/store/listingStore.js` → filtering, sorting, search (client-side)
- `src/store/toggleStore.js` → UI toggles (sidebar, etc.)
- `src/store/priceStore.js` → price range filter
- `src/store/shopStore.js` → kan verwijderd (shop is weg)

### File Naming Conventies:
- Template componenten zijn .jsx (niet .tsx)
- Convex functies zijn .ts
- Gebruik "use client" directive waar nodig voor Convex/Clerk hooks
