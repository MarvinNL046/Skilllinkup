# Search & Category UX Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Werkende zoekfunctie met autocomplete-dropdown, "Popular right now" chips, categorie-pills op de services pagina, en fix van de `.slice(0,9)` bug die search kapotmaakte.

**Architecture:** Nieuwe `SearchBarWithDropdown` component (autocomplete via Convex full-text index), nieuwe `useConvexSearch` hook (search vs list afhankelijk van query), `CategoryPills` component. Listing6 leest `?q=` uit URL en gebruikt de juiste query. WorldHeader krijgt inline zoekbalk (vervangt dode modal-input).

**Tech Stack:** React, Convex `api.marketplace.gigs.search` + `api.marketplace.categories.list`, Next.js `useRouter`/`useSearchParams`, inline CSS (geen extra libraries).

---

### Task 1: `useConvexSearch` hook + export `mapGigToProduct`

**Files:**
- Modify: `src/hook/useConvexGigs.js` (export `mapGigToProduct`)
- Create: `src/hook/useConvexSearch.js`

**Context:**
- `api.marketplace.gigs.list` → `{ locale: string, limit?: number }` → enriched gigs[]
- `api.marketplace.gigs.search` → `{ query: string, locale: string }` → enriched gigs[]
- Beide queries returnen objecten met: `_id`, `title`, `slug`, `firstImage`, `freelancerProfile`, `category`, `minPrice`, `ratingAverage`, `ratingCount`, `isFeatured`, `locationCountry`
- `category` heeft `.name` (string), `.slug`

**Step 1: Export `mapGigToProduct` uit `useConvexGigs.js`**

Verander `function mapGigToProduct` → `export function mapGigToProduct` (line 6):

```js
// src/hook/useConvexGigs.js — alleen deze regel aanpassen:
export function mapGigToProduct(gig, index) {  // was: function mapGigToProduct
```

**Step 2: Maak `src/hook/useConvexSearch.js`**

```js
"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { mapGigToProduct } from "./useConvexGigs";

export default function useConvexSearch(query) {
  const isSearching = query?.trim().length >= 2;

  const searchResults = useQuery(
    api.marketplace.gigs.search,
    isSearching ? { query: query.trim(), locale: "en" } : "skip"
  );

  const listResults = useQuery(
    api.marketplace.gigs.list,
    isSearching ? "skip" : { locale: "en" }
  );

  const raw = isSearching ? searchResults : listResults;
  if (raw === undefined) return undefined;
  return raw.map(mapGigToProduct);
}
```

**Step 3: Verify**

Run: `npm run build`
Expected: geen TypeScript/ESLint errors over `mapGigToProduct`.

**Step 4: Commit**

```bash
git add src/hook/useConvexGigs.js src/hook/useConvexSearch.js
git commit -m "feat: add useConvexSearch hook, export mapGigToProduct"
```

---

### Task 2: `SearchBarWithDropdown` component

**Files:**
- Create: `src/components/ui/SearchBarWithDropdown.jsx`

**Context:**
- `api.marketplace.gigs.search` returneert gig-objecten met `.title` (string)
- Navigeert naar `/online/services?q=<query>` bij submit
- "skip" als Convex arg = query wordt niet uitgevoerd

**Step 1: Maak `src/components/ui/SearchBarWithDropdown.jsx`**

```jsx
"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const POPULAR = [
  "logo design",
  "web development",
  "video editing",
  "graphic design",
  "content writing",
];

function BoldMatch({ text, query }) {
  if (!query) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <strong>{text.slice(idx, idx + query.length)}</strong>
      {text.slice(idx + query.length)}
    </span>
  );
}

export default function SearchBarWithDropdown({
  placeholder = "What service are you looking for today?",
  className = "",
}) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef(null);

  // 250ms debounce
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 250);
    return () => clearTimeout(t);
  }, [query]);

  // Sluit dropdown bij klik buiten
  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const searchResults = useQuery(
    api.marketplace.gigs.search,
    debouncedQuery.trim().length >= 2
      ? { query: debouncedQuery.trim(), locale: "en" }
      : "skip"
  );

  const suggestions =
    debouncedQuery.trim().length >= 2
      ? [...new Set((searchResults || []).map((g) => g.title))].slice(0, 8)
      : [];

  function navigate(q) {
    setIsOpen(false);
    setQuery(q);
    router.push(`/online/services?q=${encodeURIComponent(q)}`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) navigate(query.trim());
  }

  return (
    <div
      ref={wrapperRef}
      className={`position-relative ${className}`}
      style={{ minWidth: 300 }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          background: "#f4f4f5",
          borderRadius: 10,
          border: "none",
          overflow: "hidden",
        }}
      >
        <input
          type="text"
          className="form-control border-0"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
          style={{ background: "transparent", fontSize: 14, boxShadow: "none" }}
          autoComplete="off"
        />
        <button
          type="submit"
          style={{
            background: "none",
            border: "none",
            padding: "0 14px",
            cursor: "pointer",
            fontSize: 16,
            color: "#555",
          }}
        >
          <span className="flaticon-loupe" />
        </button>
      </form>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          {query.trim().length < 2 ? (
            // Popular right now
            <div style={{ padding: "12px 16px" }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#888",
                  letterSpacing: 1,
                  marginBottom: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>↗</span> POPULAR RIGHT NOW
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {POPULAR.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => navigate(term)}
                    style={{
                      background: "#f4f4f5",
                      border: "none",
                      borderRadius: 20,
                      padding: "6px 14px",
                      fontSize: 13,
                      cursor: "pointer",
                      color: "#222",
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : suggestions.length > 0 ? (
            // Autocomplete suggesties
            <ul style={{ margin: 0, padding: "8px 0", listStyle: "none" }}>
              {suggestions.map((title, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => navigate(title)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      width: "100%",
                      textAlign: "left",
                      padding: "9px 16px",
                      background: "none",
                      border: "none",
                      fontSize: 14,
                      cursor: "pointer",
                      color: "#222",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f9f9f9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    <span
                      className="flaticon-loupe"
                      style={{ fontSize: 12, color: "#aaa" }}
                    />
                    <BoldMatch text={title} query={debouncedQuery} />
                  </button>
                </li>
              ))}
            </ul>
          ) : searchResults !== undefined ? (
            <div style={{ padding: "12px 16px", fontSize: 13, color: "#888" }}>
              No suggestions found
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
```

**Step 2: Verify**

Run: `npm run build`
Expected: geen errors.

**Step 3: Commit**

```bash
git add src/components/ui/SearchBarWithDropdown.jsx
git commit -m "feat: add SearchBarWithDropdown with autocomplete and popular terms"
```

---

### Task 3: `CategoryPills` component

**Files:**
- Create: `src/components/ui/CategoryPills.jsx`

**Context:**
- `api.marketplace.categories.list` → `{ locale?: string }` → array van parent categories
- Elke category heeft: `_id`, `slug`, `name` (string), `children[]`
- Huidige categorie: uit URL path `/online/services/[slug]`
- Actieve zoekopdracht: uit `?q=` URL param

**Step 1: Maak `src/components/ui/CategoryPills.jsx`**

```jsx
"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function CategoryPills() {
  const categories = useQuery(api.marketplace.categories.list, {
    locale: "en",
  });
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  // Haal slug op uit /online/services/[slug]
  const pathParts = pathname.split("/online/services/");
  const currentSlug = pathParts.length > 1 ? pathParts[1].split("/")[0] : "";
  const isAll = !currentSlug && !q;

  const pillStyle = (active) => ({
    padding: "6px 16px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 500,
    background: active ? "#ef2b70" : "#f4f4f5",
    color: active ? "#fff" : "#444",
    textDecoration: "none",
    whiteSpace: "nowrap",
    display: "inline-block",
  });

  return (
    <div style={{ marginBottom: 24 }}>
      {q && (
        <p style={{ fontSize: 14, color: "#555", marginBottom: 12 }}>
          Results for: <strong>&ldquo;{q}&rdquo;</strong>
        </p>
      )}
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        <Link href="/online/services" style={pillStyle(isAll)}>
          All
        </Link>
        {(categories || []).map((cat) => (
          <Link
            key={cat._id}
            href={`/online/services/${cat.slug}`}
            style={pillStyle(cat.slug === currentSlug)}
          >
            {cat.name || cat.slug}
          </Link>
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ui/CategoryPills.jsx
git commit -m "feat: add CategoryPills component for service browsing"
```

---

### Task 4: Fix `Listing6` — useConvexSearch + remove slice bug + add CategoryPills

**Files:**
- Modify: `src/components/section/Listing6.jsx`

**Context:**
- Regel 34: `const product1 = useConvexGigs();` → vervangen door `useConvexSearch(q)`
- Regel 78-87: `.slice(0, 9)` staat vóór filters (BUG) → verwijderen, slice komt ACHTER filters
- `CategoryPills` toevoegen boven de results-rij (in de `col-lg-9` div)
- `q` lezen uit URL searchParams (staat al op regel 30-32)

**Step 1: Pas `Listing6.jsx` aan**

Vervang de volledige inhoud van het bestand:

```jsx
"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useConvexSearch from "@/hook/useConvexSearch";
import ListingOption2 from "../element/ListingOption2";
import ListingSidebarModal1 from "../modal/ListingSidebarModal1";
import ListingSidebar1 from "../sidebar/ListingSidebar1";
import Pagination1 from "./Pagination1";
import listingStore from "@/store/listingStore";
import priceStore from "@/store/priceStore";
import PopularServiceSlideCard1 from "../card/PopularServiceSlideCard1";
import TrendingServiceCard1 from "../card/TrendingServiceCard1";
import EmptyState from "@/components/ui/EmptyState";
import CategoryPills from "@/components/ui/CategoryPills";
import Link from "next/link";

export default function Listing6() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const setSearch = listingStore((state) => state.setSearch);
  const getDeliveryTime = listingStore((state) => state.getDeliveryTime);
  const getPriceRange = priceStore((state) => state.priceRange);
  const getLevel = listingStore((state) => state.getLevel);
  const getLocation = listingStore((state) => state.getLocation);
  const getBestSeller = listingStore((state) => state.getBestSeller);
  const getDesginTool = listingStore((state) => state.getDesginTool);
  const getSpeak = listingStore((state) => state.getSpeak);

  // Sync URL search params to Zustand store on mount
  useEffect(() => {
    if (q) setSearch(q);
  }, [q, setSearch]);

  const product1 = useConvexSearch(q);

  if (product1 === undefined) {
    return (
      <section className="pt30 pb90">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-thm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="body-color mt-3">Loading services...</p>
          </div>
        </div>
      </section>
    );
  }

  const deliveryFilter = (item) =>
    getDeliveryTime === "" || getDeliveryTime === "anytime"
      ? item
      : item.deliveryTime === getDeliveryTime;
  const priceFilter = (item) =>
    getPriceRange.min <= item.price && getPriceRange.max >= item.price;
  const levelFilter = (item) =>
    getLevel?.length !== 0 ? getLevel.includes(item.level) : true;
  const locationFilter = (item) =>
    getLocation?.length !== 0 ? getLocation.includes(item.location) : true;
  const sortByFilter = (item) =>
    getBestSeller === "best-seller" ? true : item.sort === getBestSeller;
  const designToolFilter = (item) =>
    getDesginTool?.length !== 0 ? getDesginTool.includes(item.tool) : item;
  const speakFilter = (item) =>
    getSpeak?.length !== 0 ? getSpeak.includes(item.language) : true;

  // Filters EERST, slice DAARNA (was omgekeerd — dat was de bug)
  let content = product1
    .filter(deliveryFilter)
    .filter(priceFilter)
    .filter(levelFilter)
    .filter(locationFilter)
    .filter(sortByFilter)
    .filter(designToolFilter)
    .filter(speakFilter)
    .slice(0, 9)
    .map((item, i) => (
      <div key={i} className="col-sm-6 col-xl-4">
        {item?.gallery ? (
          <PopularServiceSlideCard1 data={item} />
        ) : (
          <TrendingServiceCard1 data={item} />
        )}
      </div>
    ));

  return (
    <>
      <section className="pt30 pb90">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <ListingSidebar1 />
            </div>
            <div className="col-lg-9">
              <CategoryPills />
              <ListingOption2 itemLength={content?.length} />
              {product1.length === 0 ? (
                <EmptyState
                  icon="🎨"
                  title="No services yet"
                  description="Be the first to offer your services on SkillLinkup"
                  actionLabel="Become a Seller"
                  actionHref="/become-seller"
                />
              ) : content.length === 0 ? (
                <EmptyState
                  icon="🔍"
                  title="No matching services"
                  description="Try adjusting your filters"
                />
              ) : (
                <div className="row">{content}</div>
              )}
              {content.length > 0 && <Pagination1 />}
            </div>
          </div>
        </div>
      </section>
      <ListingSidebarModal1 />
    </>
  );
}
```

**Step 2: Verify**

Run: `npm run build`
Expected: geen errors.

**Step 3: Commit**

```bash
git add src/components/section/Listing6.jsx
git commit -m "fix: use Convex search query in Listing6, remove slice-before-filter bug, add CategoryPills"
```

---

### Task 5: Fix `WorldHeader` — voeg inline zoekbalk toe

**Files:**
- Modify: `src/components/header/WorldHeader.jsx`

**Context:**
- Huidig: 3 `col-auto` kolommen (logo+switcher | nav | user buttons), geen zoekbalk
- De WorldHeader heeft ook een modal-versie van de zoekbalk (regels 99-138) — die fixxen we mee
- Zoekbalk komt als nieuwe `col` (flex, groeit om ruimte op te vullen) tussen logo-kolom en nav-kolom

**Step 1: Pas `WorldHeader.jsx` aan**

Vervang de volledige inhoud:

```jsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import WorldNavigation from "./WorldNavigation";
import WorldSwitcher from "./WorldSwitcher";
import MobileNavigation2 from "./MobileNavigation2";
import NotificationBell from "./NotificationBell";
import SearchBarWithDropdown from "@/components/ui/SearchBarWithDropdown";
import { useUser, useClerk } from "@clerk/nextjs";

export default function WorldHeader() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  return (
    <>
      <header className="header-nav nav-innerpage-style at-home20 main-menu border-0 ">
        <nav className="posr">
          <div className="container-fluid custom-container custom-container2 posr">
            <div className="row align-items-center justify-content-between">
              {/* Logo + World switcher */}
              <div className="col-auto px-0 px-xl-3">
                <div className="d-flex align-items-center justify-content-between gap-3">
                  <div className="logos">
                    <Link className="header-logo logo1" href="/">
                      <Image
                        width={172}
                        height={40}
                        src="/images/logo/skilllinkup-transparant-rozepunt.webp"
                        alt="Header Logo"
                        priority
                      />
                    </Link>
                  </div>
                  <WorldSwitcher />
                </div>
              </div>

              {/* Zoekbalk — alleen desktop */}
              <div className="col d-none d-xl-block px-3">
                <SearchBarWithDropdown />
              </div>

              {/* Navigatie */}
              <div className="col-auto px-0 px-xl-3">
                <WorldNavigation />
              </div>

              {/* User buttons */}
              <div className="col-auto pe-0">
                <div className="d-flex align-items-center">
                  {isSignedIn ? (
                    <>
                      <Link className="login-info" href="/dashboard">
                        Dashboard
                      </Link>
                      <span className="ml15 mr5 position-relative d-inline-flex align-items-center">
                        <NotificationBell />
                      </span>
                      <Link className="login-info mr10 ml15" href="/dashboard">
                        {user?.imageUrl ? (
                          <Image
                            width={36}
                            height={36}
                            src={user.imageUrl}
                            alt={user.fullName || "User"}
                            className="rounded-circle"
                          />
                        ) : (
                          <span>{user?.firstName || "User"}</span>
                        )}
                      </Link>
                      <button
                        className="ud-btn add-joining home20-join-btn bdrs12 text-white"
                        onClick={() => signOut({ redirectUrl: "/" })}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link className="login-info" href="/become-seller">
                        <span className="d-none d-xl-inline-block">Become a</span>{" "}
                        Seller
                      </Link>
                      <Link
                        className="login-info mr10 home18-sign-btn px30 py-1 bdrs12 ml30 bdr1-dark"
                        href="/login"
                      >
                        Sign in
                      </Link>
                      <Link
                        className="ud-btn add-joining home20-join-btn bdrs12 text-white"
                        href="/register"
                      >
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
      <MobileNavigation2 />
    </>
  );
}
```

**Step 2: Verify**

Run: `npm run build`
Expected: geen errors.

**Step 3: Commit**

```bash
git add src/components/header/WorldHeader.jsx
git commit -m "feat: add SearchBarWithDropdown to WorldHeader"
```

---

### Task 6: Fix `DashboardHeader` + `SearchModal1`

**Files:**
- Modify: `src/components/dashboard/header/DashboardHeader.jsx` (regels 64-76)
- Modify: `src/components/modal/SearchModal1.jsx`

**Context:**
- DashboardHeader: dode `<input>` op regels 64-76 vervangen door `SearchBarWithDropdown`
- SearchModal1: navigeert naar `/services` (fout) → `/online/services?q=<value>`

**Step 1: Fix `DashboardHeader.jsx`**

Vervang regels 64-76 (het blok met `search_area dashboard-style`):

```jsx
// Oud (regels 64-76):
<div className="ml40 d-none d-xl-block">
  <div className="search_area dashboard-style" style={{ background: "#f4f4f5", borderRadius: "10px", border: "none" }}>
    <input
      type="text"
      className="form-control border-0"
      placeholder="What service are you looking for today?"
      style={{ background: "transparent", fontSize: "14px" }}
    />
    <label>
      <span className="flaticon-loupe" />
    </label>
  </div>
</div>

// Nieuw:
<div className="ml40 d-none d-xl-block" style={{ minWidth: 320 }}>
  <SearchBarWithDropdown />
</div>
```

Voeg import toe bovenaan DashboardHeader.jsx (na de bestaande imports):

```jsx
import SearchBarWithDropdown from "@/components/ui/SearchBarWithDropdown";
```

**Step 2: Fix `SearchModal1.jsx`**

Vervang de volledige inhoud:

```jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchModal1() {
  const [value, setValue] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim()) {
      router.push(`/online/services?q=${encodeURIComponent(value.trim())}`);
    }
  }

  return (
    <div className="search-modal">
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel" />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fal fa-xmark" />
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className="popup-search-field search_area">
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="What service are you looking for today?"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <label>
                  <span className="far fa-magnifying-glass" />
                </label>
                <button className="ud-btn btn-thm" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 3: Verify**

Run: `npm run build`
Expected: geen errors.

**Step 4: Commit**

```bash
git add src/components/dashboard/header/DashboardHeader.jsx src/components/modal/SearchModal1.jsx
git commit -m "fix: SearchBarWithDropdown in DashboardHeader, fix SearchModal1 URL"
```

---

### Task 7: Deploy

**Step 1: Push naar GitHub**

```bash
git push
```

**Step 2: Deploy Convex prod** (schema ongewijzigd, maar search index deploy bevestigen)

```bash
npx convex deploy -y
```

Expected: `Deployed Convex functions.`

**Step 3: Deploy Vercel**

```bash
vercel --prod
```

Expected: `Aliased: https://skilllinkup.com`

**Step 4: Smoke test**

1. Ga naar `https://skilllinkup.com/online/services`
2. Check: categorie-pills zichtbaar boven resultaten
3. Klik zoekbalk in header → "Popular right now" chips verschijnen
4. Typ "logo" → autocomplete suggesties verschijnen met **bold** match
5. Klik suggestie → navigeert naar `/online/services?q=logo+design`
6. Check: resultatenpagina toont `Results for: "logo design"` + gefilterde gigs
