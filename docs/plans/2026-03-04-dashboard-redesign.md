# Dashboard 2026 Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the SkillLinkup dashboard into a premium 2026-feeling UI with a dark sidebar, glassmorphism header, and crisper content cards — across all dashboard pages.

**Architecture:** CSS override file (`dashboard-theme.css`) imported in `globals.css` handles global dashboard tokens and card polish. The 3 layout shell components (`DashboardSidebar`, `DashboardHeader`, `DashboardLayout`) are updated with new inline styles and CSS classes. No functional code changes — pure visual layer.

**Tech Stack:** Next.js 15, Bootstrap 5 (existing), custom CSS, inline React styles

---

## Context for the implementer

The dashboard uses a "Freeio" Bootstrap template. Key CSS lives in `public/css/style.css` and is imported in `src/app/globals.css`. Dashboard-specific CSS is in `public/css/dashbord_navitaion.css`.

**Key existing CSS classes:**
- `.dashboard__sidebar` — white sidebar, 300px wide, fixed, `margin-top: 80px`
- `.dashboard_sidebar_list .sidebar_list_item a` — nav item styles
- `.dashboard_sidebar_list .sidebar_list_item a.-is-active` — active nav item (currently dark gray)
- `.dashboard__main` — content area, `padding-left: 300px`
- `.dashboard__content` — inner content wrapper, `padding: 60px`
- `.statistics_funfact` — stat card wrapper class
- `.header-nav.dashboard_header` — the topbar

**Brand colors:**
- Primary pink: `#ef2b70`
- Dark navy: `#1e1541`
- New sidebar bg: `#0f0c1e`

---

### Task 1: Create `dashboard-theme.css` with CSS tokens and sidebar dark theme

**Files:**
- Create: `src/app/dashboard-theme.css`
- Modify: `src/app/globals.css` (add one import line at the end)

**Step 1: Create the new CSS file**

Create `src/app/dashboard-theme.css` with this exact content:

```css
/* ============================================================
   SkillLinkup Dashboard 2026 Theme
   Overrides the Freeio template with a dark sidebar +
   glassmorphism header + crispy cards design.
   ============================================================ */

/* ---- CSS Tokens ---- */
:root {
  --dash-sidebar-bg:        #0f0c1e;
  --dash-sidebar-width:     260px;
  --dash-sidebar-text:      rgba(255, 255, 255, 0.6);
  --dash-sidebar-text-hover: rgba(255, 255, 255, 0.92);
  --dash-sidebar-active-bar: #ef2b70;
  --dash-sidebar-hover-bg:  rgba(255, 255, 255, 0.06);
  --dash-content-bg:        #f4f3ff;
  --dash-card-bg:           #ffffff;
  --dash-card-border:       rgba(0, 0, 0, 0.07);
  --dash-card-shadow:       0 2px 16px rgba(0, 0, 0, 0.06);
  --dash-card-radius:       16px;
  --dash-header-bg:         rgba(255, 255, 255, 0.8);
  --dash-header-blur:       blur(24px);
  --dash-header-border:     rgba(0, 0, 0, 0.08);
}

/* ---- Sidebar overrides ---- */
.dashboard__sidebar {
  background-color: var(--dash-sidebar-bg) !important;
  width: var(--dash-sidebar-width) !important;
  border-right: none !important;
  padding: 20px 0 40px 0 !important;
}

.dashboard__sidebar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.15) !important;
}

/* Section labels: START / ORGANIZE AND MANAGE / ACCOUNT */
.dashboard__sidebar .fz15.ff-heading {
  color: rgba(255, 255, 255, 0.3) !important;
  font-size: 10px !important;
  font-weight: 600 !important;
  letter-spacing: 0.1em !important;
  text-transform: uppercase !important;
  padding-left: 24px !important;
  margin-top: 24px !important;
  margin-bottom: 4px !important;
}

/* Nav items */
.dashboard_sidebar_list .sidebar_list_item a {
  color: var(--dash-sidebar-text) !important;
  border-radius: 0 !important;
  padding: 11px 24px !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  transition: all 0.15s ease !important;
  border-left: 3px solid transparent;
}

.dashboard_sidebar_list .sidebar_list_item a:hover {
  background-color: var(--dash-sidebar-hover-bg) !important;
  color: var(--dash-sidebar-text-hover) !important;
  border-left-color: rgba(239, 43, 112, 0.4) !important;
}

.dashboard_sidebar_list .sidebar_list_item a.-is-active,
.dashboard_sidebar_list .sidebar_list_item a.-is-active:hover {
  background-color: rgba(239, 43, 112, 0.12) !important;
  color: #ffffff !important;
  border-left-color: var(--dash-sidebar-active-bar) !important;
  font-weight: 600 !important;
}

/* Icons in nav items */
.dashboard_sidebar_list .sidebar_list_item a i {
  font-size: 16px !important;
  opacity: 0.8;
}

.dashboard_sidebar_list .sidebar_list_item a.-is-active i {
  opacity: 1;
}

/* ---- Main content area ---- */
.dashboard__main {
  padding-left: var(--dash-sidebar-width) !important;
  background-color: var(--dash-content-bg) !important;
  min-height: 100vh;
}

/* ---- Content inner padding ---- */
.dashboard__content {
  padding: 40px 40px 40px !important;
  background-color: transparent !important;
}

/* ---- Glassmorphism Header ---- */
.header-nav.dashboard_header {
  background: var(--dash-header-bg) !important;
  backdrop-filter: var(--dash-header-blur) !important;
  -webkit-backdrop-filter: var(--dash-header-blur) !important;
  border-bottom: 1px solid var(--dash-header-border) !important;
  box-shadow: none !important;
  position: sticky !important;
  top: 0 !important;
  z-index: 100 !important;
}

/* ---- Stat Cards (statistics_funfact) ---- */
.statistics_funfact {
  background: var(--dash-card-bg) !important;
  border: 1px solid var(--dash-card-border) !important;
  border-radius: var(--dash-card-radius) !important;
  box-shadow: var(--dash-card-shadow) !important;
  padding: 24px !important;
}

/* Stat card: big bold number */
.statistics_funfact .title,
.statistics_funfact h2,
.statistics_funfact h3 {
  font-size: 2rem !important;
  font-weight: 700 !important;
  line-height: 1.1 !important;
  letter-spacing: -0.02em !important;
  color: #111827 !important;
}

/* Stat card label */
.statistics_funfact .fz15,
.statistics_funfact .sub-title {
  font-size: 13px !important;
  font-weight: 500 !important;
  color: #6b7280 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
}

/* Stat card subtle text */
.statistics_funfact .fz14,
.statistics_funfact p {
  font-size: 12px !important;
  color: #9ca3af !important;
}

/* ---- Widget/card boxes ---- */
.ps-widget.bgc-white {
  background: var(--dash-card-bg) !important;
  border: 1px solid var(--dash-card-border) !important;
  border-radius: var(--dash-card-radius) !important;
  box-shadow: var(--dash-card-shadow) !important;
}

/* ---- Dashboard page title area ---- */
.dashboard_title_area h2 {
  font-size: 1.5rem !important;
  font-weight: 700 !important;
  letter-spacing: -0.02em !important;
  color: #111827 !important;
}

.dashboard_title_area p.text {
  color: #6b7280 !important;
  font-size: 14px !important;
}

/* ---- Hover background for content area ---- */
.dashboard__content.hover-bgc-color {
  background-color: transparent !important;
}
```

**Step 2: Add import to `globals.css`**

Open `src/app/globals.css`. At the end of the `@import` block (after line 12, before the `a { cursor: pointer; }` line), add:

```css
@import "./dashboard-theme.css";
```

So the top of `globals.css` becomes:
```css
@import "./../../public/css/bootstrap.min.css";
@import "./../../public/css/animate.css";
@import "./../../public/css/ace-responsive-menu.css";
@import "./../../public/css/menu.css";
@import "./../../public/css/fontawesome.css";
@import "./../../public/css/flaticon.css";
@import "./../../public/css/bootstrap-select.min.css";
@import "./../../public/css/slider.css";
@import "./../../public/css/style.css";
@import "./../../public/css/ud-custom-spacing.css";
@import "./../../public/css/dashbord_navitaion.css";
@import "./../../public/css/responsive.css";
@import "./dashboard-theme.css";
```

**Step 3: Verify it builds**

```bash
cd /home/marvin/Projecten/Skilllinkup && npm run build 2>&1 | tail -20
```

Expected: build succeeds, no CSS errors.

**Step 4: Commit**

```bash
git add src/app/dashboard-theme.css src/app/globals.css
git commit -m "feat: add dashboard-theme.css — dark sidebar + glassmorphism tokens"
```

---

### Task 2: Update DashboardSidebar — dark world switcher pills + logo

**Files:**
- Modify: `src/components/dashboard/sidebar/DashboardSidebar.jsx`

The sidebar background is already handled by CSS in Task 1. This task updates the world-switcher pill colors and the section label margins to match the dark theme.

**Step 1: Update the world-switcher pill inline styles**

In `DashboardSidebar.jsx`, find the world-switcher `<button>` inline styles (lines 43–52) and replace:

```jsx
style={{
  backgroundColor: world === w.key ? "#ef2b70" : "#f1f1f1",
  color: world === w.key ? "#fff" : "#555",
  border: "none",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: world === w.key ? 600 : 400,
  padding: "6px 10px",
  transition: "all 0.2s ease",
}}
```

with:

```jsx
style={{
  backgroundColor: world === w.key ? "#ef2b70" : "rgba(255,255,255,0.08)",
  color: world === w.key ? "#fff" : "rgba(255,255,255,0.55)",
  border: "none",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: world === w.key ? 600 : 400,
  padding: "6px 10px",
  transition: "all 0.15s ease",
}}
```

**Step 2: Update the world-switcher wrapper padding**

Find the world-switcher `<div className="d-flex gap-2 px-3 pb-3 pt-2">` (line 37) and change to:

```jsx
<div className="d-flex gap-2 pb-3 pt-3" style={{ padding: "12px 20px 16px" }}>
```

**Step 3: Verify visually**

Run the dev server:
```bash
cd /home/marvin/Projecten/Skilllinkup && npm run dev
```

Visit `http://localhost:3000/dashboard` and check that:
- Sidebar background is dark `#0f0c1e`
- World switcher pills have dark glass look
- Nav items are readable (white text, 60% opacity)
- Active item has pink left border

**Step 4: Commit**

```bash
git add src/components/dashboard/sidebar/DashboardSidebar.jsx
git commit -m "feat: dark world-switcher pills on dashboard sidebar"
```

---

### Task 3: Update DashboardHeader — glassmorphism + sticky

**Files:**
- Modify: `src/components/dashboard/header/DashboardHeader.jsx`

The glassmorphism effect is already applied via CSS (Task 1). This task:
1. Adds a CSS class `dashboard_header` to the `<header>` element so the CSS selector works
2. Removes the old `menu_bdrt1` border class (replaced by CSS)
3. Sharpens the search bar style

**Step 1: Find the `<header>` opening tag** (around line 25 in DashboardHeader.jsx):

```jsx
<header className="header-nav nav-innerpage-style menu-home4 dashboard_header main-menu">
```

This already has `dashboard_header`. Good — the CSS selector `.header-nav.dashboard_header` will match.

**Step 2: Update the search bar inline style**

Find the search input area. The search wrapper `<div className="search_area dashboard-style">` contains an `<input>`. Add a style override to the wrapper div:

Find:
```jsx
<div className="search_area dashboard-style">
  <input
    type="text"
    className="form-control border-0"
    placeholder="What service are you looking for today?"
  />
```

Replace with:
```jsx
<div className="search_area dashboard-style" style={{ background: "#f4f4f5", borderRadius: "10px", border: "none" }}>
  <input
    type="text"
    className="form-control border-0"
    placeholder="What service are you looking for today?"
    style={{ background: "transparent", fontSize: "14px" }}
  />
```

**Step 3: Remove the outer margin-top from the sidebar + main**

The current sidebar has `margin-top: 80px` (from `style.css`) which is designed for a non-sticky header. With our sticky header, the sidebar now naturally sits below the header without the margin. However, to avoid layout shift, we keep the margin-top as-is — the sticky header covers the scrolled content.

Actually, NO change needed here — the current header height is ~80px and the sidebar starts at `margin-top: 80px` which is correct for sticky positioning.

**Step 4: Verify**

With dev server running, visit `http://localhost:3000/dashboard` and verify:
- Header has glass effect (blurred white overlay)
- Search bar has rounded fill
- Scrolling the page: header stays fixed at top

**Step 5: Commit**

```bash
git add src/components/dashboard/header/DashboardHeader.jsx
git commit -m "feat: glassmorphism dashboard header + refined search bar"
```

---

### Task 4: Update DashboardLayout — content background

**Files:**
- Modify: `src/components/dashboard/DashboardLayout.jsx`

The `--dash-content-bg` CSS variable is already applied to `.dashboard__main` via Task 1's CSS. This task verifies it works and optionally adds a min-height to prevent short-page flicker.

**Step 1: Check current DashboardLayout.jsx**

Current content (from file):
```jsx
<div className="dashboard dashboard_wrapper pr30 pr0-xl ...">
  <DashboardSidebar />
  <div className="dashboard__main pl0-md">
    {children}
    <DashboardFooter />
  </div>
</div>
```

**Step 2: Add background color override via className**

The `.dashboard__main` already gets `background-color: var(--dash-content-bg)` from the CSS. No JSX changes needed here — the CSS handles it.

Only verify: the `dashboard_content_wrapper` div in `DashboardLayout.jsx` that wraps everything. Currently it might have its own background. Find:

```jsx
<div className="dashboard_content_wrapper">
```

If this div has any background (from `style.css`), add an override:
```jsx
<div className="dashboard_content_wrapper" style={{ backgroundColor: "var(--dash-content-bg)" }}>
```

**Step 3: Verify**

Visit `http://localhost:3000/dashboard` — the content area should have a light lavender background `#f4f3ff` instead of the old off-white `#f1f1f1`.

**Step 4: Commit**

```bash
git add src/components/dashboard/DashboardLayout.jsx
git commit -m "feat: dashboard content area background updated to lavender"
```

---

### Task 5: Polish stat cards with colored accent borders

**Files:**
- Modify: `src/components/dashboard/section/DashboardInfo.jsx`

The stat cards currently use `.statistics_funfact` CSS. Task 1's CSS makes them larger and bolder. This task adds a colored left-border accent to each card via inline styles to distinguish them visually.

**Step 1: Read DashboardInfo.jsx to understand current stat card structure**

```bash
cat /home/marvin/Projecten/Skilllinkup/src/components/dashboard/section/DashboardInfo.jsx
```

**Step 2: Find the 4 stat card wrappers**

Each stat card is wrapped in something like:
```jsx
<div className="col-sm-6 col-xxl-3">
  <div className="statistics_funfact">
    ...
  </div>
</div>
```

**Step 3: Add accent border styles to each card**

Add `borderLeft: "4px solid <color>"` to each `.statistics_funfact` div. Use these accent colors:
- Card 1 (Active Gigs): `borderLeft: "4px solid #ef2b70"`
- Card 2 (Total Orders): `borderLeft: "4px solid #6366f1"`
- Card 3 (Pending Orders): `borderLeft: "4px solid #f59e0b"`
- Card 4 (Total Earnings): `borderLeft: "4px solid #10b981"`

Example for card 1:
```jsx
<div className="statistics_funfact" style={{ borderLeft: "4px solid #ef2b70" }}>
```

**Step 4: Verify**

Visit `http://localhost:3000/dashboard` — each stat card has a distinct colored left border, bold numbers, and clean shadow.

**Step 5: Commit**

```bash
git add src/components/dashboard/section/DashboardInfo.jsx
git commit -m "feat: stat card color accent borders"
```

---

### Task 6: Final verification — check all dashboard pages

**No file changes — verification only.**

**Step 1: Visit each dashboard page in the browser**

With the dev server running, verify each page looks correct:

- `http://localhost:3000/dashboard` — main dashboard
- `http://localhost:3000/my-profile` — profile tabs
- `http://localhost:3000/orders` — orders list
- `http://localhost:3000/manage-projects` — projects
- `http://localhost:3000/saved` — saved items
- `http://localhost:3000/message` — messages

Check for:
- Dark sidebar visible on all pages
- Active nav item has pink left border
- Header has glass effect
- Content area has light lavender background
- Cards have rounded corners + subtle shadow

**Step 2: Check mobile (optional)**

Resize browser to < 991px. Sidebar should hide (existing Bootstrap behavior). Mobile navigation should still work.

**Step 3: Take screenshot evidence**

Take a screenshot of the `/dashboard` page for before/after comparison.

**Step 4: Commit final state**

```bash
git add -A
git commit -m "feat: dashboard 2026 redesign complete — dark sidebar, glassmorphism, crispy cards"
```

---

## Summary of all changed files

| File | What changed |
|---|---|
| `src/app/dashboard-theme.css` | New — all CSS tokens and overrides |
| `src/app/globals.css` | +1 import line |
| `src/components/dashboard/sidebar/DashboardSidebar.jsx` | World-switcher pill colors |
| `src/components/dashboard/header/DashboardHeader.jsx` | Search bar style |
| `src/components/dashboard/DashboardLayout.jsx` | Background color |
| `src/components/dashboard/section/DashboardInfo.jsx` | Card accent borders |
