# Per-vacancy hiring overview

Date: 2026-09-14

## Delivered behavior

Employers can open **Hiring overview** from their vacancy card or sent invitation. The existing `/manage-jobs/[id]/applications` page now shows invitations sent, interested replies and applications received, with separate Applications and Invitations & interest tabs.

Each invitation is matched to a submitted application for the same vacancy and candidate. **Review application** selects that exact application even when it would be beyond the first results page. Interest does not create an application or share a CV. Draft applications are hidden. Deleted candidate accounts no longer break the application list.

Counts include closed and withdrawn applications, exclude drafts, and display 500+ when bounded reads reach the cap. The labels explain that these are overlapping totals, not sequential conversion rates. Invitations are paginated and can be filtered by response. Existing application stage and messaging actions are retained.

## Verification

- Full ESLint and TypeScript checks passed.
- Launch contract suite passed, including the new `scripts/check-hiring-pipeline.mjs` handler tests.
- Dashboard regression suite passed, including linked-application selection, filter reset, invitation-tab query skipping and returning to all applications.
- Handler tests cover owner and tenant boundaries, unauthenticated access, pagination, 500+ caps, draft exclusion, missing/deleted records, application status changes, and safe invitation result fields.
- Real development Convex smoke used the two existing dedicated QA accounts and one temporary **closed** synthetic vacancy. One interested invitation and one submitted application produced counts 1/1/1; the focused application query returned the same linked application. All three synthetic records were removed. No emails or notifications were sent.
- Temporary development fixture function removed and development backend republished; fixture is not part of this release.
- Private-beta copy contract passed.
- Chrome confirmed the candidate session is kept outside the company-only view. The authenticated employer browser follow-up below completed the desktop and responsive checks. A physical-phone check remains separate from browser viewport testing.

## Authenticated browser follow-up

Used the existing Company QA account on localhost against the development backend. A temporary closed vacancy had one interested invitation and one synthetic application. Opened Hiring overview from the vacancy card, selected Invitations & interest, opened the exact application, moved it to In review and confirmed it persisted after reload. Also tested an empty Declined filter, returning to Interested, the mobile navigation drawer, Sent invitations → Hiring overview, and opening/cancelling Edit vacancy.

Viewport checks: desktop, 390×844 and 360×800 in Chrome. The hiring overview fit these widths, including the long QA email address. Found and corrected an unrelated legacy table layout on Manage Jobs: mobile users had to scroll a narrow table horizontally, while desktop columns lacked spacing. Manage Jobs now reuses the existing dashboard card layout below 600px, retains a spaced desktop table, and uses shared 44px action buttons. Measurements confirmed document width equals viewport width at both mobile sizes and all three vacancy actions are 44px high.

The old View Job action led to an unavailable vacancy page for the closed fixture. Public links are now shown only for open, unexpired vacancies in a verified company workspace; hiring review and edit remain available. Regression coverage includes closed, filled, expired and unverified cases plus the valid open case.

No captured browser errors on the tested employer tab. Development `EMAIL_DELIVERY_DISABLED=true` was verified before changing the synthetic application stage. The scheduled email was skipped. Temporary vacancy, invitation, application, in-app notification, skipped email record and fixture helper were removed; no production records were changed. The browser viewport was reset. Publishing a fresh vacancy or inviting a real candidate was not part of this follow-up.

## Deployment and rollback

Additive backend change: two indexes on `jobInvitations`, two read-only queries, optional focused application argument and additive `jobId` invitation field. Deploy backend before the frontend. No data migration or new outbound communication.

Release gates: CI contract checks and preview build green, production backend dry-run reviewed, production frontend ready, hosted release smoke and health commit match. If the hiring page fails to load or existing application actions regress, revert the frontend release first. The additive backend remains compatible with the previous frontend.
