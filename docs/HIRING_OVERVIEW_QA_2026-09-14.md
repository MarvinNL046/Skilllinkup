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
- Chrome confirmed the existing candidate session is kept outside the company-only view. An authenticated employer browser walkthrough and physical-phone check of this specific new overview were not performed in this release; backend handler and parent-component interactions were tested as described above.

## Deployment and rollback

Additive backend change: two indexes on `jobInvitations`, two read-only queries, optional focused application argument and additive `jobId` invitation field. Deploy backend before the frontend. No data migration or new outbound communication.

Release gates: CI contract checks and preview build green, production backend dry-run reviewed, production frontend ready, hosted release smoke and health commit match. If the hiring page fails to load or existing application actions regress, revert the frontend release first. The additive backend remains compatible with the previous frontend.
