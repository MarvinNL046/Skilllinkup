# Mobile delivery review — 2026-09-13

Environment: development Convex accurate-anaconda-993, separate client and freelancer QA accounts, Chrome at 390px. Client via phone QA address on port 3012; freelancer via localhost:3011. This is responsive browser verification, not a new physical Android test.

Synthetic order: md7326dtane6mbyd830cb515f18eadym / BETA-20260913-HF4LKE. Its previously uploaded files were preserved. Only clearly marked QA delivery notes and revision feedback were added.

## Journey verified

1. Added a version 1 delivery note and submitted work for review as freelancer.
2. Client received the submitted version and opened the completion confirmation. Keep reviewing cancelled without changing the order.
3. Entered revision feedback, opened the confirmation again, saw the unsent-feedback reminder, and cancelled. The feedback stayed intact.
4. Requested a revision. Revision requested and the feedback persisted after reload and were visible to the freelancer.
5. Freelancer added the requested version 2 heading in a new synthetic delivery note and resubmitted.
6. Client reviewed version 2 and confirmed completion.
7. Both accounts showed Completed after a full reload. Delivery notes, file download links and revision conversation remained available.

## Improvements

- A selected file or typed delivery note must be added to the order before submitting, requesting a revision or approving. An inline message explains the next action.
- Completion uses the shared dialog and buttons, with scope confirmation, the effect on revisions, private-beta payment wording and a Keep reviewing option.
- Failed approval stays in the dialog with an inline error and retry. Unsent revision feedback is called out before completion.
- A synchronous pending guard prevents overlapping delivery, approval, revision and add-to-order requests from rapid taps.

## Checks and release

Dashboard regression suite passes, including new tests for confirmation/cancel, pending additions, duplicate taps, failed approval retry and preservation of revision feedback. Targeted ESLint, TypeScript and whitespace checks pass. No backend or schema changes.

Release through the existing PR/CI/Vercel workflow. Revert if completion/revision controls stop working or the dialog prevents normal navigation. Confirm deployed commit and hosted release checks after publication.
