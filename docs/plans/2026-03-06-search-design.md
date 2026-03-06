# Search & Category UX Design

**Goal:** Werkende zoekfunctie met autocomplete-dropdown, "Popular right now" chips, en categorie-pills op de services pagina.

**Architecture:** Nieuwe herbruikbare `SearchBarWithDropdown` component die de bestaande Convex `search` query (full-text index op `gigs.title`) aanspreekt. Fix `Listing6` om Convex search te gebruiken i.p.v. client-side filter op 9 gigs. Categorie-pills boven de resultaten.

**Tech Stack:** React, Convex `api.marketplace.gigs.search` + `api.marketplace.categories.list`, Next.js `useRouter` + `useSearchParams`, Zustand `listingStore`.

---

## Components

### SearchBarWithDropdown (`src/components/ui/SearchBarWithDropdown.jsx`)

**State:** `query` (string), `isOpen` (bool)

**Gedrag:**
- Focus + leeg → "Popular right now" chips (hardcoded: "logo design", "web development", "video editing", "graphic design", "content writing")
- Typen → 250ms debounce → `api.marketplace.gigs.search({ query, locale: "en" })` → max 8 unieke titels
- Bold highlight: split titel op match, bold het matchende deel
- Klik suggestie / Enter → `router.push("/online/services?q=<query>")`
- Klik buiten / Escape → sluit dropdown
- Props: `placeholder`, `className`

**Convex query gebruik:** `useQuery(api.marketplace.gigs.search, query.trim().length >= 2 ? { query, locale: "en" } : "skip")`

### Categorie-pills (`src/components/ui/CategoryPills.jsx`)

- Horizontaal scrollbare rij boven de Listing6 resultaten
- "All" pill + alle top-level categorieën via `api.marketplace.categories.list`
- Actief: roze achtergrond (`#ef2b70`, wit tekst)
- Inactief: lichtgrijs
- Klikken → `/online/services` (All) of `/online/services/[slug]` (categorie)
- Toont zoeklabel: _"Results for: „affiliate marketing""_ als `?q=` aanwezig

---

## Fixes

### WorldHeader (`src/components/header/WorldHeader.jsx`)
Voeg `SearchBarWithDropdown` toe tussen logo-blok en navigatie (middenkolom).

### DashboardHeader (`src/components/dashboard/header/DashboardHeader.jsx`)
Vervang dode `<input>` door `SearchBarWithDropdown`.

### SearchModal1 (`src/components/modal/SearchModal1.jsx`)
Fix URL: `/services` → `/online/services?q=<value>`.

### useConvexGigs → useConvexSearch (`src/hook/useConvexSearch.js`)
Nieuwe hook:
```js
export default function useConvexSearch(query) {
  const searchResults = useQuery(
    api.marketplace.gigs.search,
    query?.trim().length >= 2 ? { query, locale: "en" } : "skip"
  );
  const allGigs = useQuery(
    api.marketplace.gigs.list,
    query?.trim().length >= 2 ? "skip" : { locale: "en" }
  );
  const raw = query?.trim().length >= 2 ? searchResults : allGigs;
  if (raw === undefined) return undefined;
  return raw.map(mapGigToProduct);
}
```

### Listing6 (`src/components/section/Listing6.jsx`)
- Lees `?q=` uit URL → gebruik `useConvexSearch(q)` i.p.v. `useConvexGigs()`
- Verwijder `.slice(0, 9)` voor filters (dit is de root cause van gebroken search)
- Voeg `CategoryPills` toe boven de resultatenrij

---

## Data Flow

```
Gebruiker typt "affiliate"
  → SearchBarWithDropdown debounce 250ms
  → useQuery(api.marketplace.gigs.search, { query: "affiliate", locale: "en" })
  → Convex full-text index → titels terug
  → Dropdown toont max 8 suggesties (bold match)

Gebruiker klikt "affiliate marketing"
  → router.push("/online/services?q=affiliate+marketing")
  → Listing6 leest ?q=, roept useConvexSearch("affiliate marketing")
  → api.marketplace.gigs.search → gefilterde gigs
  → CategoryPills toont "Results for: affiliate marketing"
```

---

## Files to Change

| File | Wijziging |
|------|-----------|
| `src/components/ui/SearchBarWithDropdown.jsx` | Nieuw: autocomplete component |
| `src/components/ui/CategoryPills.jsx` | Nieuw: categorie-pills + zoeklabel |
| `src/hook/useConvexSearch.js` | Nieuw: search/list hook |
| `src/components/header/WorldHeader.jsx` | SearchBarWithDropdown toevoegen |
| `src/components/dashboard/header/DashboardHeader.jsx` | Dode input vervangen |
| `src/components/modal/SearchModal1.jsx` | URL fix |
| `src/components/section/Listing6.jsx` | useConvexSearch + slice fix + CategoryPills |
