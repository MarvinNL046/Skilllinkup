# Dashboard 2026 Redesign — Design Document

## Goal
Transform the SkillLinkup dashboard from a generic 2021 SaaS template into a premium 2026 product with a dark sidebar, glassmorphism header, and crispy typography.

## Approach
**Option B**: Replace the 3 layout shell components + add `dashboard-theme.css`. Content components get CSS treatment via the stylesheet — no functional regressions.

---

## Visual Design

### Color Palette
| Token | Value | Usage |
|---|---|---|
| `--dash-sidebar-bg` | `#0f0c1e` | Sidebar background |
| `--dash-sidebar-text` | `rgba(255,255,255,0.6)` | Nav item text (inactive) |
| `--dash-sidebar-text-active` | `#ffffff` | Nav item text (active) |
| `--dash-sidebar-active-bar` | `#ef2b70` | Active indicator bar |
| `--dash-sidebar-hover-bg` | `rgba(255,255,255,0.06)` | Hover state background |
| `--dash-content-bg` | `#f8f7ff` | Main content area |
| `--dash-card-bg` | `#ffffff` | Card/widget background |
| `--dash-card-border` | `rgba(0,0,0,0.06)` | Card border |
| `--dash-card-shadow` | `0 2px 12px rgba(0,0,0,0.06)` | Card shadow |
| `--dash-header-bg` | `rgba(255,255,255,0.75)` | Topbar background (glass) |

### Typography
- Page titles: `font-size: 1.5rem; font-weight: 700; letter-spacing: -0.02em`
- Stat numbers: `font-size: 2rem; font-weight: 700; line-height: 1`
- Sidebar labels: `font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.3`
- Nav items: `font-size: 14px; font-weight: 500`

---

## Components to Change

### 1. `src/components/dashboard/sidebar/DashboardSidebar.jsx`
- Background: `#0f0c1e`
- Logo: white logo variant
- World switcher pills: `rgba(255,255,255,0.08)` bg, active = `#ef2b70`
- Nav items: left-border active indicator (3px `#ef2b70`), hover bg
- Section labels: uppercase, faded

### 2. `src/components/dashboard/header/DashboardHeader.jsx`
- Glassmorphism: `background: rgba(255,255,255,0.75); backdrop-filter: blur(20px)`
- Sticky positioning: `position: sticky; top: 0; z-index: 100`
- Search bar: rounded, light gray fill `#f4f4f5`
- Icons: sharper `#374151`
- Subtle bottom border: `1px solid rgba(0,0,0,0.06)`

### 3. `src/components/dashboard/DashboardLayout.jsx`
- Content area background: `#f8f7ff`
- Remove or minimize the existing `dashboard_content_wrapper` padding quirks

### 4. New file: `src/app/dashboard-theme.css`
- CSS custom properties (tokens above)
- Stat card overrides: larger numbers, border-radius 16px, colored left-border accents
- Page title typography
- Widget/card polish
- World switcher pill styles
- Sidebar scroll behavior

### 5. `src/app/layout.jsx` (or wherever global CSS is imported)
- Import `dashboard-theme.css`

---

## Card Accent Colors (stat cards)
Each of the 4 stat cards gets a distinct colored left border:
- Active Gigs: `#ef2b70` (brand pink)
- Total Orders: `#6366f1` (indigo)
- Pending Orders: `#f59e0b` (amber)
- Total Earnings: `#10b981` (emerald)

---

## Animation Constraints
- Max transition: `0.15s ease` — nothing heavier
- No entrance animations on page load
- Hover transitions only (sidebar items, card hover)

---

## What Does NOT Change
- All functional components (stat data, orders table, forms, etc.)
- Bootstrap grid (keeps layout structure)
- Routing, auth, Convex queries
- Mobile responsive breakpoints

---

## Files Changed
1. `src/components/dashboard/sidebar/DashboardSidebar.jsx` — restyled
2. `src/components/dashboard/header/DashboardHeader.jsx` — glassmorphism
3. `src/components/dashboard/DashboardLayout.jsx` — bg color + css import
4. `src/app/dashboard-theme.css` — new CSS file with all tokens + overrides
5. `src/app/layout.jsx` — import new CSS

---

## Success Criteria
- Sidebar is dark (`#0f0c1e`) with clear active state
- Header has glass effect (backdrop-filter)
- Stat cards are larger, bolder, with colored accents
- Page feels "crispy" — good contrast, no muddy grays
- All dashboard pages affected (via shared layout + CSS)
- No functional regressions
- Page still feels fast (no heavy animations)
