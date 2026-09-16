# Invitation journey follow-up — 16 September 2026

Scope: candidate search → invite to a vacancy → candidate receives the invitation → responds → optionally applies → employer sees the follow-up. The invitation feature itself already existed (PRs #90 and #91); this pass checked the end-to-end route and fixed the concrete gaps below.

## Findings and fixes

- **Notification links did not select the invitation.** Both notification types pointed at the list pages only. They now link to `/dashboard/job-invitations?invitation=<id>` and `/dashboard/sent-invitations?invitation=<id>`. The list query accepts an optional invitation id (string, normalized server-side; unknown, malformed or foreign ids return an empty page), and both pages show a “selected invitation” notice with **Show all invitations** and an explicit “Invitation not available” empty state.
- **Neither side could see whether an application followed the invitation.** Each invitation row now carries the linked submitted application (id and stage; drafts and other tenants excluded). Candidates get **Manage application**, employers get **Review application** on the vacancy hiring overview, and the “Review vacancy and apply” action disappears once an application exists.
- **Employer deep link to one application.** `/manage-jobs/<id>/applications?application=<id>` now opens that application; the argument is a normalized string so a bad URL yields “Application not available” instead of a query error.
- **Confirmations lost keyboard focus.** The inline confirm group unmounted the triggering button. Responses and withdrawals now use the shared confirmation dialog: Cancel receives focus, focus returns to the trigger (or the page heading) on close, the confirm button is disabled while saving and after the invitation changed, and errors are shown in the dialog and as a toast.
- **Expired or closed invitations could still be declined**, which would notify the employer about a dead invitation. The backend now rejects any response to an unavailable invitation; the UI shows “Expired” or “No longer available”, hides the response and withdraw actions, and explains that no response is needed.
- **Next step per state.** Every invitation card now has a next-step section for the relevant role covering pending, interested (with and without an application), declined, withdrawn, expired and closed cases. Interest remains clearly separate from applying and never shares CV or email.

## Verification

- `scripts/check-job-invitations.mjs` gained handler tests for the deep-link selection (owner, foreign account, malformed id), the linked application (draft hidden, submitted linked for both audiences, other tenant hidden, no private fields) and the rejected decline on an expired invitation.
- `scripts/check-dashboard-mvp.mjs` gained a component test for both audiences: query arguments for the selected invitation, the not-available state, dialog open/confirm/double-click prevention/error/stale-state handling, retry after a change, hidden actions for expired and unavailable invitations, and the application links.
- Passed locally: TypeScript, targeted ESLint, `check-job-invitations`, `check-hiring-pipeline`, `check-candidate-profiles`, `check-dashboard-mvp` (51 groups), `check-mvp-foundation` (17 suites) and the private-beta copy contract.
- **Real development backend (accurate-anaconda-993)** with the dedicated QA identities and `EMAIL_DELIVERY_DISABLED=true`: a temporary internal fixture verified the QA company, opted the QA candidate in and created one synthetic open vacancy. The actual handlers then ran: vacancy picker, send, idempotent duplicate send, candidate selected list via the notification link, malformed and foreign ids, interest saved once, later decline and employer withdrawal rejected as changed, employer notification deep link, no application created by interest, real application submission, linked application on both sides, employer application selection by URL string, hiring-overview join. Cleanup removed the vacancy, invitation, application, three notifications and one skipped email record, and restored the candidate to private with invitations off and the company to unverified. The fixture was deleted and the clean backend republished.
- The dev server compiled the three changed routes (unauthenticated requests redirect to login).

## Not covered

No authenticated browser click-through was possible in this session: no Chrome extension was connected and QA credentials are not entered by the agent. The dialog focus behaviour is covered by the component test and mirrors the existing application dialogs verified in earlier browser QA. A signed-in desktop and 390 × 844 check of both invitation pages remains the next manual step. No physical phone test.

## Release

Backend change is additive (optional query argument, two additive row fields, stricter response guard). Deploy backend before frontend. Rollback: revert the frontend first; the backend remains compatible with the previous invitation pages.
