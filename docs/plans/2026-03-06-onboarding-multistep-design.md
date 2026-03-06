# Onboarding Multi-Step Form Design

**Goal:** Replace the current 2-step onboarding with a 4-step animated multi-step form that collects role, world, skills, and profile info — saving everything to Convex and surfacing it in the dashboard.

**Architecture:** Single page (`/onboarding/page.jsx`), client-side step state, CSS slide animations, saves in two calls: existing `setUserType` after step 2, new `completeOnboarding` mutation after step 4.

**Tech Stack:** React state, CSS transitions (no library), Convex mutations, existing `freelancerProfiles` schema fields.

---

## Steps

### Freelancer (4 steps)
1. **Rol kiezen** — "I'm looking for talent" vs "I offer services"
2. **World kiezen** — Online / Local / Jobs
3. **Skills kiezen** — Tag-click UI, max 10 tags, pulled from existing `skills` table
4. **Bio + uurtarief** — Tagline (1 line), bio (textarea), hourly rate (number input) + "Skip, do this later" link

### Client (3 steps)
1. **Rol kiezen** — same as above
2. **World kiezen** — same as above
3. **Wat zoek je?** — Category tags (what services they need), saved to `users.bio` as comma-separated string. "Skip" available.

---

## UX / Design

- **Achtergrond:** volledig wit (`bg-white min-vh-100`)
- **Voortgangsbalk:** horizontale balk bovenaan, percentage-based (25% / 50% / 75% / 100%), roze fill (`#ef2b70`)
- **Stapnummer:** "Step 2 of 4" tekst boven de titel
- **Animaties:** slide-left bij vooruit, slide-right bij terug — CSS `transform: translateX` + `opacity`, 250ms ease
- **Back-knop:** elke stap behalve stap 1
- **Skip:** alleen stap 3 (skills) en stap 4 (bio/tarief)

---

## Data Flow

| Stap | Actie | Mutation |
|------|-------|----------|
| 1+2 voltooid | Rol + world opslaan, freelancerProfile aanmaken | `users.setUserType` (bestaand) |
| 3 voltooid | Skills opslaan op freelancerProfile | `freelancers.updateProfile` (bestaand) |
| 4 voltooid | Bio + tagline + hourlyRate opslaan | `freelancers.updateProfile` (bestaand) |
| Client stap 3 | Interesses opslaan | `users.updateBio` (nieuw, simpel) |

Redirect na laatste stap: `/${preferredWorld}/dashboard` (of `/${preferredWorld}` als er geen dashboard is).

---

## Dashboard Aanpassing

- **Profiel-compleetheid banner:** toont als `bio` of `skills` leeg is op freelancerProfile
  - Tekst: "Je profiel is X% compleet" + link naar `/my-profile`
  - Verbergt zodra profiel volledig is
- **Welcome tekst:** vervangt generieke tekst door `Hi {displayName}!` + tagline als die er is

---

## Files to Change

| File | Wijziging |
|------|-----------|
| `src/app/(dashboard)/onboarding/page.jsx` | Volledig herschrijven: 4 stappen, animaties, progress bar, witte BG |
| `src/components/dashboard/section/DashboardInfo.jsx` | Profiel-compleetheid banner toevoegen + welcome tekst personaliseren |
| `convex/users.ts` | `updateBio` mutation toevoegen (voor client stap 3) |

Geen schema-wijzigingen nodig — alle velden bestaan al.
