# Mobile acceptance pass — 2026-09-13

Chrome at 390 × 844, localhost:3011 against development Convex. Used the separate client and freelancer QA accounts. This is a desktop browser with a mobile viewport, not a physical-device keyboard or mobile Safari test. No production customer records were changed.

## Completed flow

1. Client sign-in and mobile navigation. Empty project form rejected with a title validation error.
2. Created `QA ONLY mobile acceptance 20260913`, web development, budget EUR 100–150, React and Responsive design skills. Saved draft, reloaded, verified title/category/description/skills and budget restored.
3. Published project `ms7b9z60cmbxr6b0zwgxk2kyzd8easkp`; client list showed Open and zero bids.
4. Freelancer submitted a EUR 125 proposal with three-day delivery. Success appeared, public response count became one, dashboard showed one pending proposal.
5. Client chose the proposal. Order `md7ckm80d57gcavc90h8tzzn5n8ebb8f` (`BETA-20260913-C7V0D0`) opened in progress with EUR 125 and September 16 deadline.
6. Client added a synthetic brief note and a two-line message. Both survived reload and were visible to the freelancer.
7. Freelancer added a synthetic delivery note and submitted for review. Status became Delivered for review with confirmation toast.
8. Client approved delivery. Reload confirmed Completed, retained conversation and notes, and removed delivery actions.

## Fixed during this pass

- Manage Projects required horizontal scrolling to discover budget/status/actions on mobile. Reused the existing responsive stacked-table pattern used for services. Verified the result visually at mobile width.
- Project actions now compose the shared Button, with a visible View Bids label and larger edit/delete targets.
- The owner-facing empty bids message incorrectly invited the client to submit a proposal. Corrected it to a neutral received-proposals message in all eight locales.

Dashboard and order regression suites, targeted ESLint, TypeScript and production build passed.

## Remaining priorities

1. After reload, the public project page shows an empty proposal form even when this freelancer already submitted. Dashboard correctly retains the pending proposal. Read the authenticated freelancer's existing bid and show its status instead of an empty form. Server already rejects a second bid, but the UI is misleading.
2. Project category selection contains hundreds of options. A searchable, grouped selector would reduce mobile scrolling.

Boundaries: this pass used note-only delivery (an allowed path); binary upload/download, revision request and email delivery were not retested here. Earlier dedicated checks do not substitute for claiming they were tested in this pass. Browser viewport was restored after testing.
