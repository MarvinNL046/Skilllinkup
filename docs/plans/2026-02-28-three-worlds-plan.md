# Three Worlds Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Split SkillLinkup into 3 marketplace verticals (Online, Local, Jobs) with a homepage world picker, dedicated landing pages, and context-aware navigation.

**Architecture:** Next.js route groups `(online)`, `(local)`, `(jobs)` each with their own layout. A `WorldContext` React context tracks the active world. The header renders a `WorldSwitcher` component and world-specific nav items. Existing Listing/Card components are reused with world-specific data filtering.

**Tech Stack:** Next.js 15 App Router, React 19, Convex, Zustand, Tailwind CSS, Clerk Auth

**Design doc:** `docs/plans/2026-02-28-three-worlds-design.md`

---

## Phase 1: Foundation (WorldContext + WorldSwitcher)

### Task 1: Create WorldContext provider

**Files:**
- Create: `src/context/WorldContext.jsx`

**Step 1: Create the context**

```jsx
"use client";
import { createContext, useContext } from "react";

const WorldContext = createContext(null);

export function WorldProvider({ world, children }) {
  return (
    <WorldContext.Provider value={world}>
      {children}
    </WorldContext.Provider>
  );
}

export function useWorld() {
  return useContext(WorldContext);
}
```

**Step 2: Verify no build errors**

Run: `npx next build --no-lint 2>&1 | tail -5`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/context/WorldContext.jsx
git commit -m "feat: add WorldContext provider for 3 worlds"
```

---

### Task 2: Create WorldSwitcher header component

**Files:**
- Create: `src/components/header/WorldSwitcher.jsx`

**Step 1: Create the component**

A row of 3 pill buttons (Online, Local, Jobs). The active world is highlighted. Links to each world's landing page.

```jsx
"use client";
import Link from "next/link";
import { useWorld } from "@/context/WorldContext";

const worlds = [
  { key: "online", label: "Online", href: "/online", icon: "flaticon-web" },
  { key: "local", label: "Local", href: "/local", icon: "flaticon-location" },
  { key: "jobs", label: "Jobs", href: "/jobs", icon: "flaticon-briefcase" },
];

export default function WorldSwitcher() {
  const activeWorld = useWorld();

  return (
    <div className="d-flex align-items-center gap-2">
      {worlds.map((w) => (
        <Link
          key={w.key}
          href={w.href}
          className={`ud-btn btn-sm bdrs4 fz14 ${
            activeWorld === w.key ? "btn-thm" : "btn-white"
          }`}
          style={{ padding: "6px 14px", textDecoration: "none" }}
        >
          <i className={`${w.icon} me-1`} />
          {w.label}
        </Link>
      ))}
    </div>
  );
}
```

**Step 2: Verify no build errors**

Run: `npx next build --no-lint 2>&1 | tail -5`

**Step 3: Commit**

```bash
git add src/components/header/WorldSwitcher.jsx
git commit -m "feat: add WorldSwitcher pill navigation component"
```

---

### Task 3: Create world-specific navigation config

**Files:**
- Create: `src/data/worldNavigation.js`

**Step 1: Create navigation config per world**

```js
const worldNavigation = {
  online: [
    { id: 1, name: "Services", path: "/online/services" },
    { id: 2, name: "Freelancers", path: "/online/freelancers" },
    { id: 3, name: "Projects", path: "/online/projects" },
  ],
  local: [
    { id: 1, name: "Craftsmen", path: "/local/craftsmen" },
    { id: 2, name: "Quote Requests", path: "/local/quote-requests" },
  ],
  jobs: [
    { id: 1, name: "Browse Jobs", path: "/jobs/browse" },
    { id: 2, name: "Companies", path: "/jobs/companies" },
  ],
  shared: [
    { id: 10, name: "About", path: "/about" },
    { id: 11, name: "Blog", path: "/blog" },
    { id: 12, name: "Contact", path: "/contact" },
  ],
};

export default worldNavigation;
```

**Step 2: Commit**

```bash
git add src/data/worldNavigation.js
git commit -m "feat: add world-specific navigation config"
```

---

### Task 4: Create WorldNavigation header component

**Files:**
- Create: `src/components/header/WorldNavigation.jsx`

**Step 1: Create the component**

This replaces the standard Navigation.jsx inside world layouts. It reads the active world from context and renders the appropriate nav items + shared items.

```jsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorld } from "@/context/WorldContext";
import worldNavigation from "@/data/worldNavigation";

export default function WorldNavigation() {
  const world = useWorld();
  const path = usePathname();

  const worldItems = worldNavigation[world] || [];
  const sharedItems = worldNavigation.shared;

  return (
    <ul className="ace-responsive-menu" style={{ display: "flex", gap: 0, listStyle: "none", margin: 0, padding: 0 }}>
      {worldItems.map((item) => (
        <li key={item.id} className={path.startsWith(item.path) ? "ui-active" : ""}>
          <Link className="list-item" href={item.path}>
            <span className="title">{item.name}</span>
          </Link>
        </li>
      ))}
      {sharedItems.map((item) => (
        <li key={item.id} className={path === item.path ? "ui-active" : ""}>
          <Link className="list-item" href={item.path}>
            <span className="title">{item.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/header/WorldNavigation.jsx
git commit -m "feat: add WorldNavigation component for context-aware nav"
```

---

### Task 5: Create WorldHeader component

**Files:**
- Create: `src/components/header/WorldHeader.jsx`

**Step 1: Create the header**

This is a variant of Header19 that includes WorldSwitcher + WorldNavigation. Copy the structure from Header19.jsx but swap Navigation for WorldNavigation and add WorldSwitcher.

```jsx
"use client";
import Link from "next/link";
import Image from "next/image";
import WorldSwitcher from "./WorldSwitcher";
import WorldNavigation from "./WorldNavigation";
import NotificationBell from "@/components/dashboard/NotificationBell";
import { useUser, useClerk } from "@clerk/nextjs";

export default function WorldHeader() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  return (
    <header className="header-nav nav-innerpage-style at-home20 main-menu border-0">
      <nav className="posr">
        <div className="container-fluid posr menu_bdrt1">
          <div className="row align-items-center justify-content-between">
            {/* Logo */}
            <div className="col-auto">
              <div className="d-flex align-items-center">
                <Link className="header-logo" href="/">
                  <Image
                    width={140}
                    height={40}
                    src="/images/logo/skilllinkup-logo.svg"
                    alt="SkillLinkup"
                  />
                </Link>
                <div className="ms-3">
                  <WorldSwitcher />
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="col-auto">
              <WorldNavigation />
            </div>

            {/* Right side: auth buttons */}
            <div className="col-auto">
              <div className="d-flex align-items-center gap-3">
                {isSignedIn ? (
                  <>
                    <NotificationBell />
                    <Link href="/dashboard" className="ud-btn btn-thm add-joining">
                      Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/become-seller" className="login-info">
                      Become a Seller
                    </Link>
                    <Link href="/login" className="login-info">
                      Sign in
                    </Link>
                    <Link href="/register" className="ud-btn btn-thm add-joining">
                      Join
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
```

> **Note for implementer:** Match the exact HTML structure/classnames from the existing `Header19.jsx`. The code above shows the conceptual structure — adapt classnames and markup to match the current header's visual style exactly. Read Header19.jsx before implementing.

**Step 2: Verify no build errors**

**Step 3: Commit**

```bash
git add src/components/header/WorldHeader.jsx
git commit -m "feat: add WorldHeader with WorldSwitcher + WorldNavigation"
```

---

## Phase 2: Homepage World Picker

### Task 6: Create WorldCard component

**Files:**
- Create: `src/components/card/WorldCard.jsx`

**Step 1: Create the component**

```jsx
import Link from "next/link";

export default function WorldCard({ icon, title, description, href, count, color }) {
  return (
    <div className="col-sm-6 col-lg-4">
      <Link href={href} className="text-decoration-none">
        <div
          className="listing-style1 bdrs8 p30 position-relative overflow-hidden"
          style={{ minHeight: 220, cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
        >
          <div className="text-center">
            <div
              className="d-inline-flex align-items-center justify-content-center mb15"
              style={{ width: 64, height: 64, borderRadius: "50%", background: color || "#f0f0f0", fontSize: 28 }}
            >
              <i className={icon} style={{ color: "#fff" }} />
            </div>
            <h4 className="list-title mb-2">{title}</h4>
            <p className="body-color fz14 mb10">{description}</p>
            {count !== undefined && (
              <span className="fz13 fw500" style={{ color: color || "#ef2b70" }}>
                {count.toLocaleString()}+ listings
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/card/WorldCard.jsx
git commit -m "feat: add WorldCard component for homepage world picker"
```

---

### Task 7: Create HomepageHero component

**Files:**
- Create: `src/components/hero/HomepageHero.jsx`

**Step 1: Create the component**

Simple hero with tagline and 3 WorldCards below. Replaces the search-oriented Hero20 on the homepage.

```jsx
import WorldCard from "@/components/card/WorldCard";

const worlds = [
  {
    icon: "flaticon-web",
    title: "Online Marketplace",
    description: "Find digital freelancers for remote projects — design, development, marketing and more.",
    href: "/online",
    color: "#ef2b70",
  },
  {
    icon: "flaticon-location",
    title: "Local Marketplace",
    description: "Connect with skilled craftsmen in your area for home improvement, repairs and services.",
    href: "/local",
    color: "#1e1541",
  },
  {
    icon: "flaticon-briefcase",
    title: "Jobs",
    description: "Browse job openings or post vacancies to find the right candidates for your team.",
    href: "/jobs",
    color: "#22c55e",
  },
];

export default function HomepageHero() {
  return (
    <section className="hero-home13 at-home20 overflow-hidden pt60 pb40">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center mb40">
            <h1 className="hero-title animate-up-1 mb15">
              Find the Right Talent, <span style={{ color: "#ef2b70" }}>Anywhere</span>
            </h1>
            <p className="hero-text fz17 animate-up-2">
              Whether you need a remote freelancer, a local craftsman, or your next hire — SkillLinkup connects you.
            </p>
          </div>
        </div>
        <div className="row animate-up-3">
          {worlds.map((w) => (
            <WorldCard key={w.href} {...w} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/hero/HomepageHero.jsx
git commit -m "feat: add HomepageHero with 3 world cards"
```

---

### Task 8: Update homepage to use world picker

**Files:**
- Modify: `src/app/(home)/page.jsx`

**Step 1: Replace Hero20 + TrendingService14 with HomepageHero**

The homepage now shows the world picker hero instead of the old search hero. Keep NeedSomething2 (how it works) and CtaBanner18 (CTA).

```jsx
import Footer14 from "@/components/footer/Footer14";
import Header19 from "@/components/header/Header19";
import HomepageHero from "@/components/hero/HomepageHero";
import NeedSomething2 from "@/components/section/NeedSomething2";
import CtaBanner18 from "@/components/section/CtaBanner18";

export const metadata = {
  title: "SkillLinkup — Find the Right Talent, Anywhere",
  description: "Online freelancers, local craftsmen, and job vacancies — all in one platform.",
};

export default function page() {
  return (
    <div className="wrapper ovh">
      <Header19 />
      <div className="body_content">
        <HomepageHero />
        <NeedSomething2 />
        <CtaBanner18 />
      </div>
      <Footer14 />
    </div>
  );
}
```

**Step 2: Verify with dev server**

Run: `npm run dev` → visit `http://localhost:3000`
Expected: 3 world cards visible, clicking one navigates to `/online`, `/local`, or `/jobs`

**Step 3: Commit**

```bash
git add src/app/\(home\)/page.jsx
git commit -m "feat: replace homepage with world picker"
```

---

## Phase 3: Online World (reuse existing marketplace)

### Task 9: Create Online world layout

**Files:**
- Create: `src/app/(online)/layout.jsx`

**Step 1: Create the layout**

Wraps all `/online/*` routes with WorldProvider set to "online" and the WorldHeader.

```jsx
import { WorldProvider } from "@/context/WorldContext";
import WorldHeader from "@/components/header/WorldHeader";
import Footer14 from "@/components/footer/Footer14";

export default function OnlineLayout({ children }) {
  return (
    <WorldProvider world="online">
      <div className="wrapper ovh">
        <WorldHeader />
        <div className="body_content">
          {children}
        </div>
        <Footer14 />
      </div>
    </WorldProvider>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/\(online\)/layout.jsx
git commit -m "feat: add Online world layout with WorldProvider"
```

---

### Task 10: Create Online landing page

**Files:**
- Create: `src/app/(online)/online/page.jsx`

**Step 1: Create the page**

Reuses Hero20 (search hero) and TrendingService14 (trending gigs) from the old homepage.

```jsx
import Hero20 from "@/components/hero/Hero20";
import TrendingService14 from "@/components/section/TrendingService14";

export const metadata = {
  title: "Online Marketplace — SkillLinkup",
  description: "Find digital freelancers for remote projects. Browse services, hire talent, and get work done.",
};

export default function OnlinePage() {
  return (
    <>
      <Hero20 />
      <TrendingService14 />
    </>
  );
}
```

**Step 2: Verify with dev server**

Visit: `http://localhost:3000/online`
Expected: Hero search bar + trending services, WorldSwitcher shows "Online" active

**Step 3: Commit**

```bash
git add src/app/\(online\)/online/page.jsx
git commit -m "feat: add Online world landing page"
```

---

### Task 11: Create Online services, freelancers, projects pages

**Files:**
- Create: `src/app/(online)/online/services/page.jsx`
- Create: `src/app/(online)/online/services/[slug]/page.jsx`
- Create: `src/app/(online)/online/service/[id]/page.jsx`
- Create: `src/app/(online)/online/freelancers/page.jsx`
- Create: `src/app/(online)/online/freelancer/[id]/page.jsx`
- Create: `src/app/(online)/online/projects/page.jsx`
- Create: `src/app/(online)/online/project/[id]/page.jsx`

**Step 1: Create all pages**

Each page reuses the exact same Listing/detail components from the existing routes. The layout already provides WorldHeader + Footer, so pages only need the content.

Copy the content (not the layout wrapper) from each existing page:
- `src/app/(service)/services/page.jsx` → imports/renders Breadcumb + Listing6
- `src/app/(service)/services/[slug]/page.jsx` → category-filtered services
- `src/app/(service)/service/[id]/page.jsx` → service detail
- `src/app/(freelancer)/freelancers/page.jsx` → Listing14
- `src/app/(freelancer)/freelancer/[id]/page.jsx` → freelancer detail
- `src/app/(project)/projects/page.jsx` → Listing19
- `src/app/(project)/project/[id]/page.jsx` → project detail

> **Key:** Read each source page. Copy only the inner content (what's between `<div className="body_content">` and `</div>`), since the layout handles the wrapper, header, and footer.

**Step 2: Verify with dev server**

Visit: `/online/services`, `/online/freelancers`, `/online/projects`
Expected: Same listings as before but within the world layout

**Step 3: Commit**

```bash
git add src/app/\(online\)/
git commit -m "feat: add Online world browse pages (services, freelancers, projects)"
```

---

## Phase 4: Local World

### Task 12: Create Local world layout

**Files:**
- Create: `src/app/(local)/layout.jsx`

**Step 1: Create the layout**

Same pattern as Online layout but with `world="local"`.

```jsx
import { WorldProvider } from "@/context/WorldContext";
import WorldHeader from "@/components/header/WorldHeader";
import Footer14 from "@/components/footer/Footer14";

export default function LocalLayout({ children }) {
  return (
    <WorldProvider world="local">
      <div className="wrapper ovh">
        <WorldHeader />
        <div className="body_content">
          {children}
        </div>
        <Footer14 />
      </div>
    </WorldProvider>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/\(local\)/layout.jsx
git commit -m "feat: add Local world layout with WorldProvider"
```

---

### Task 13: Create Local landing page with hero

**Files:**
- Create: `src/components/hero/LocalHero.jsx`
- Create: `src/app/(local)/local/page.jsx`

**Step 1: Create LocalHero**

A hero specific to local services — emphasizes location-based search.

```jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LocalHero() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [postcode, setPostcode] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (postcode) params.set("location", postcode);
    router.push(`/local/craftsmen?${params.toString()}`);
  };

  return (
    <section className="hero-home13 at-home20 overflow-hidden pt60 pb40" style={{ background: "linear-gradient(135deg, #1e1541 0%, #2d1f5e 100%)" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center mb30">
            <h1 className="hero-title text-white mb15">
              Find Trusted Local Craftsmen
            </h1>
            <p className="hero-text text-white-50 fz17">
              From plumbers to painters — get quotes from skilled professionals near you.
            </p>
          </div>
          <div className="col-lg-8">
            <form onSubmit={handleSearch} className="d-flex gap-2 justify-content-center">
              <input
                type="text"
                className="form-control bdrs4"
                placeholder="What do you need? (e.g. plumber, painter)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ maxWidth: 300 }}
              />
              <input
                type="text"
                className="form-control bdrs4"
                placeholder="Postcode or city"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                style={{ maxWidth: 200 }}
              />
              <button type="submit" className="ud-btn btn-thm bdrs4">
                Search <i className="fal fa-search ms-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Create the landing page**

```jsx
import LocalHero from "@/components/hero/LocalHero";

export const metadata = {
  title: "Local Marketplace — SkillLinkup",
  description: "Find skilled craftsmen near you. Get quotes for home improvement, repairs, and local services.",
};

export default function LocalPage() {
  return (
    <>
      <LocalHero />
      {/* TODO: Add trending quote requests or featured craftsmen section */}
    </>
  );
}
```

**Step 3: Verify with dev server**

Visit: `http://localhost:3000/local`
Expected: Local hero with search + postcode fields, WorldSwitcher shows "Local" active

**Step 4: Commit**

```bash
git add src/components/hero/LocalHero.jsx src/app/\(local\)/local/page.jsx
git commit -m "feat: add Local world landing page with location-based hero"
```

---

### Task 14: Create Local craftsmen listing page

**Files:**
- Create: `src/app/(local)/local/craftsmen/page.jsx`

**Step 1: Create the page**

Reuses Listing14 (freelancer listing) — the freelancers displayed are filtered to `workType: 'local'` or `'hybrid'`. For now, reuse the component as-is (it shows all freelancers). A future task can add workType filtering to the Convex query.

```jsx
import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Listing14 from "@/components/section/Listing14";

export const metadata = {
  title: "Local Craftsmen — SkillLinkup",
  description: "Browse skilled craftsmen available in your area.",
};

export default function CraftsmenPage() {
  return (
    <>
      <Breadcumb3 path={["Home", "Local", "Craftsmen"]} />
      <Listing14 />
    </>
  );
}
```

> **Note for implementer:** Check how Breadcumb3 accepts props. Read `src/components/breadcumb/Breadcumb3.jsx` to understand the prop interface. It may use `path` as array or have a different prop name.

**Step 2: Commit**

```bash
git add src/app/\(local\)/local/craftsmen/page.jsx
git commit -m "feat: add Local craftsmen listing page"
```

---

### Task 15: Create Local craftsman detail + quote request pages

**Files:**
- Create: `src/app/(local)/local/craftsman/[id]/page.jsx`
- Create: `src/app/(local)/local/quote-requests/page.jsx`
- Create: `src/app/(local)/local/quote-request/[id]/page.jsx`

**Step 1: Create craftsman detail page**

Reuse the freelancer detail page component.

> **Implementer:** Read `src/app/(freelancer)/freelancer/[id]/page.jsx` and copy its content structure.

**Step 2: Create quote requests listing page**

This is a new listing page for quote requests. Since Convex already has `quoteRequests` table and a `quotes.listRequests()` query, create a client component that fetches and displays them.

```jsx
// src/app/(local)/local/quote-requests/page.jsx
import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import QuoteRequestListing from "@/components/section/QuoteRequestListing";

export const metadata = {
  title: "Quote Requests — SkillLinkup",
  description: "Browse open quote requests from clients looking for local services.",
};

export default function QuoteRequestsPage() {
  return (
    <>
      <Breadcumb3 path={["Home", "Local", "Quote Requests"]} />
      <QuoteRequestListing />
    </>
  );
}
```

**Step 3: Create QuoteRequestListing component**

**Files:**
- Create: `src/components/section/QuoteRequestListing.jsx`

```jsx
"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";

export default function QuoteRequestListing() {
  const requests = useQuery(api.marketplace.quotes.listRequests, { limit: 20 });

  if (requests === undefined) {
    return (
      <section className="pt30 pb90">
        <div className="container text-center py-5">
          <div className="spinner-border text-thm" role="status" />
        </div>
      </section>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <section className="pt30 pb90">
        <div className="container text-center py-5">
          <i className="flaticon-clipboard fz40 text mb20 d-block" />
          <h4>No Quote Requests Yet</h4>
          <p className="body-color">Check back soon for local service requests.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt30 pb90">
      <div className="container">
        <div className="row">
          {requests.map((req) => (
            <div key={req._id} className="col-sm-6 col-lg-4 mb20">
              <div className="listing-style1 bdrs8 p20">
                <h5 className="list-title mb-1">{req.title || req.description?.slice(0, 50) || "Quote Request"}</h5>
                <p className="body-color fz13 mb10">{req.categoryName || "General"}</p>
                <p className="body-color fz14 mb15">
                  {req.description?.length > 120
                    ? req.description.slice(0, 120) + "..."
                    : req.description}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fz13 body-color">
                    {req.budget ? `Budget: €${req.budget}` : "Budget: Flexible"}
                  </span>
                  <Link
                    href={`/local/quote-request/${req._id}`}
                    className="ud-btn btn-thm2 bdrs4"
                    style={{ fontSize: "0.8rem", padding: "6px 14px" }}
                  >
                    View <i className="fal fa-arrow-right-long ms-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

> **Note for implementer:** Check if `api.marketplace.quotes.listRequests` exists and what it returns. Read `convex/marketplace/quotes.ts` to verify the query name and return shape. Adjust field names accordingly.

**Step 4: Create quote request detail page (placeholder)**

```jsx
// src/app/(local)/local/quote-request/[id]/page.jsx
export const metadata = { title: "Quote Request — SkillLinkup" };

export default async function QuoteRequestDetailPage({ params }) {
  const { id } = await params;
  return (
    <section className="pt30 pb90">
      <div className="container">
        <h2>Quote Request</h2>
        <p>Detail page for quote request {id} — to be implemented with full quote submission form.</p>
      </div>
    </section>
  );
}
```

**Step 5: Commit**

```bash
git add src/app/\(local\)/ src/components/section/QuoteRequestListing.jsx
git commit -m "feat: add Local world pages (craftsmen, quote requests)"
```

---

## Phase 5: Jobs World

### Task 16: Create Jobs world layout

**Files:**
- Create: `src/app/(jobs-world)/layout.jsx`

> **Note:** Route group is `(jobs-world)` not `(jobs)` to avoid conflict with existing `(job)` group.

```jsx
import { WorldProvider } from "@/context/WorldContext";
import WorldHeader from "@/components/header/WorldHeader";
import Footer14 from "@/components/footer/Footer14";

export default function JobsLayout({ children }) {
  return (
    <WorldProvider world="jobs">
      <div className="wrapper ovh">
        <WorldHeader />
        <div className="body_content">
          {children}
        </div>
        <Footer14 />
      </div>
    </WorldProvider>
  );
}
```

**Commit:**

```bash
git add src/app/\(jobs-world\)/layout.jsx
git commit -m "feat: add Jobs world layout with WorldProvider"
```

---

### Task 17: Create Jobs landing page with hero

**Files:**
- Create: `src/components/hero/JobsHero.jsx`
- Create: `src/app/(jobs-world)/jobs/page.jsx`

**Step 1: Create JobsHero**

```jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JobsHero() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    router.push(`/jobs/browse?${params.toString()}`);
  };

  return (
    <section className="hero-home13 at-home20 overflow-hidden pt60 pb40" style={{ background: "linear-gradient(135deg, #0f6b3a 0%, #22c55e 100%)" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center mb30">
            <h1 className="hero-title text-white mb15">
              Find Your Next Opportunity
            </h1>
            <p className="hero-text text-white-50 fz17">
              Browse job openings from top companies or post a vacancy to find the right talent.
            </p>
          </div>
          <div className="col-lg-6">
            <form onSubmit={handleSearch} className="d-flex gap-2 justify-content-center">
              <input
                type="text"
                className="form-control bdrs4"
                placeholder="Job title, skill, or company"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ maxWidth: 400 }}
              />
              <button type="submit" className="ud-btn btn-white bdrs4" style={{ color: "#22c55e" }}>
                Search <i className="fal fa-search ms-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Create landing page**

```jsx
import JobsHero from "@/components/hero/JobsHero";

export const metadata = {
  title: "Jobs — SkillLinkup",
  description: "Browse job openings or post vacancies. Find full-time, part-time, and freelance opportunities.",
};

export default function JobsPage() {
  return (
    <>
      <JobsHero />
      {/* TODO: Add featured jobs section */}
    </>
  );
}
```

**Step 3: Commit**

```bash
git add src/components/hero/JobsHero.jsx src/app/\(jobs-world\)/jobs/page.jsx
git commit -m "feat: add Jobs world landing page with hero"
```

---

### Task 18: Create Jobs browse and detail pages

**Files:**
- Create: `src/app/(jobs-world)/jobs/browse/page.jsx`
- Create: `src/app/(jobs-world)/jobs/job/[id]/page.jsx`
- Create: `src/app/(jobs-world)/jobs/companies/page.jsx`

**Step 1: Create browse page**

Reuse Listing16 (jobs listing).

```jsx
import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Listing16 from "@/components/section/Listing16";

export const metadata = {
  title: "Browse Jobs — SkillLinkup",
  description: "Find full-time, part-time, and freelance job openings.",
};

export default function BrowseJobsPage() {
  return (
    <>
      <Breadcumb3 path={["Home", "Jobs", "Browse"]} />
      <Listing16 />
    </>
  );
}
```

**Step 2: Create job detail page**

> **Implementer:** Copy content from `src/app/(job)/job/[id]/page.jsx`.

**Step 3: Create companies page (placeholder)**

```jsx
export const metadata = {
  title: "Companies — SkillLinkup",
  description: "Browse companies hiring on SkillLinkup.",
};

export default function CompaniesPage() {
  return (
    <section className="pt30 pb90">
      <div className="container text-center py-5">
        <i className="flaticon-office fz40 text mb20 d-block" />
        <h2>Companies</h2>
        <p className="body-color">Company directory coming soon.</p>
      </div>
    </section>
  );
}
```

**Step 4: Commit**

```bash
git add src/app/\(jobs-world\)/
git commit -m "feat: add Jobs world browse pages (jobs, companies)"
```

---

## Phase 6: Redirects & Navigation Cleanup

### Task 19: Add redirects for old routes

**Files:**
- Modify: `next.config.js`

**Step 1: Add redirects**

```js
async redirects() {
  return [
    { source: "/services", destination: "/online/services", permanent: true },
    { source: "/services/:slug", destination: "/online/services/:slug", permanent: true },
    { source: "/service/:id", destination: "/online/service/:id", permanent: true },
    { source: "/freelancers", destination: "/online/freelancers", permanent: true },
    { source: "/freelancer/:id", destination: "/online/freelancer/:id", permanent: true },
    { source: "/projects", destination: "/online/projects", permanent: true },
    { source: "/project/:id", destination: "/online/project/:id", permanent: true },
  ];
},
```

> **Note for implementer:** Read `next.config.js` first. Add the `redirects()` function alongside existing config (headers, images). Do NOT redirect `/jobs` since it conflicts with the new `/jobs` world — the old `(job)` route group pages should be removed or kept as-is if they're separate from the world routes.

**Step 2: Verify redirects**

Visit: `http://localhost:3000/services`
Expected: Redirects to `/online/services`

**Step 3: Commit**

```bash
git add next.config.js
git commit -m "feat: add redirects from old routes to world-prefixed routes"
```

---

### Task 20: Update Navigation.jsx for homepage

**Files:**
- Modify: `src/components/header/Navigation.jsx`

**Step 1: Update Browse menu links**

Update the Browse mega-menu to point to world-prefixed routes:
- "All Services" → `/online/services`
- "Projects" → `/online/projects`
- "Jobs" → `/jobs/browse`
- "Freelancers" → `/online/freelancers`
- "Platforms" → `/platforms` (unchanged)

Also update the active-path detection to match new routes.

> **Implementer:** Read `Navigation.jsx` and update the hardcoded Browse links and `path.startsWith()` checks.

**Step 2: Verify with dev server**

Visit homepage, click Browse links — should navigate to world-prefixed routes.

**Step 3: Commit**

```bash
git add src/components/header/Navigation.jsx
git commit -m "feat: update Navigation links to world-prefixed routes"
```

---

## Phase 7: Verification & Polish

### Task 21: End-to-end verification

**No files to create/modify — testing only.**

**Step 1: Run build**

```bash
npm run build
```
Expected: No errors

**Step 2: Manual testing checklist**

Run `npm run dev` and verify:

- [ ] `/` — Homepage shows 3 world cards, clicking each navigates correctly
- [ ] `/online` — Online hero with search, WorldSwitcher shows "Online" active
- [ ] `/online/services` — Services listing loads with sidebar filters
- [ ] `/online/freelancers` — Freelancers listing loads
- [ ] `/online/projects` — Projects listing loads
- [ ] `/local` — Local hero with postcode search field
- [ ] `/local/craftsmen` — Craftsmen listing loads (freelancers)
- [ ] `/local/quote-requests` — Quote requests listing loads (or empty state)
- [ ] `/jobs` — Jobs hero with green gradient
- [ ] `/jobs/browse` — Jobs listing loads
- [ ] `/jobs/companies` — Companies placeholder page
- [ ] `/services` → redirects to `/online/services`
- [ ] `/freelancers` → redirects to `/online/freelancers`
- [ ] Header WorldSwitcher pills navigate between worlds
- [ ] Nav items change per world
- [ ] No console errors on any page

**Step 3: Commit any polish fixes**

```bash
git add -A
git commit -m "fix: polish three worlds implementation"
```

---

## Summary

| Phase | Tasks | Key deliverables |
|-------|-------|-----------------|
| 1: Foundation | 1-5 | WorldContext, WorldSwitcher, WorldNavigation, WorldHeader |
| 2: Homepage | 6-8 | WorldCard, HomepageHero, updated homepage |
| 3: Online World | 9-11 | Layout, landing page, 7 browse/detail pages |
| 4: Local World | 12-15 | Layout, LocalHero, craftsmen, quote requests |
| 5: Jobs World | 16-18 | Layout, JobsHero, browse, companies |
| 6: Navigation | 19-20 | Redirects, updated nav links |
| 7: Verification | 21 | Build + manual testing |

**Total: 21 tasks, ~15 commits**
