# Worlds, navigation and visitor copy

## Language and route model

Use **One Skilllinkup account, three worlds — Online, Local, Jobs.** Use "world" for these three areas; keep task labels concrete: browse jobs, post a vacancy, request quotes, offer online services. English copy should be clear, personal and professional.

- `/online`, `/local`, `/jobs` are the world entry pages. Homepage and mobile navigation link to these entry points.
- `/services` remains the services overview with the Online world header; existing category and recovered SEO URLs remain intact.
- The shared `MarketplaceMegaMenu` renders centered category and Browse panels. World Services filters categories to online-compatible services. Header search is hidden below 1536px to leave room for all world links; page search remains available.
- Shared `WorldEntryPoints` explains the two sides of each world, public browsing and invitation-only account actions.
- `/jobs/companies` explains company setup, verification, publishing and applicant management. Candidate CVs are attached to applications; no public CV bank or candidate directory is promised.

Homepage, auth, onboarding, role dashboards, waitlist and shared SEO CTA copy now use clearer actions and fewer unsupported outcome claims. Existing behaviour and account guards are retained. This is a targeted English pass, not a full translation rewrite.

## SEO reference

Consulted the active Obsidian vault at `Documents/webdev/webdev`: `SEO/00 SEO Playbook (index).md`, `19 TOFU MOFU BOFU - funnel page types.md`, `21 Internal linking - hub and spoke.md`, and `13 On-page SEO checklist (80+ items).md`. Applied clear page intent, descriptive internal links and a low-commitment launch-update CTA. No recovered URLs were removed or redirected.

## Verification

- Dashboard MVP checks, private-beta copy check, targeted ESLint and TypeScript passed locally.
- Chrome 1280px: three-column category and Browse panels centered and readable; Escape closes and returns focus; Tab reaches panel links. WordPress category retains the world header.
- Chrome 390px: Jobs audience cards and employer landing fit without horizontal overflow; shared action buttons remain readable. Mobile Online/Local/Jobs links work; Online reaches `/online`.
- Employer entry opens `/jobs/companies`; launch-update modal opens with the new copy and closes with Escape. No waitlist record, application, vacancy or account was created in this review.
- Release gate: PR contract checks and Vercel preview build before merge; production health and hosted release checks after deployment.

## Next product decision

Define a job-seeker profile/CV experience before adding employer search: who can see it, explicit opt-in to discoverability, how to hide it, and how employers may contact a candidate. The current application-specific CV flow remains the MVP behaviour.

## Rollback

Revert this release if navigation becomes inaccessible, service category URLs fail, or Jobs account actions stop reaching their existing guarded flows. No database migration or backend deployment is part of this change.
