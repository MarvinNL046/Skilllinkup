# Application withdrawal confirmation

Withdraw now opens the shared Dialog with the vacancy title and a clear explanation that withdrawal cannot be undone and the candidate cannot reapply. The shared outline Keep application button receives initial focus. Escape and cancellation restore focus; successful withdrawal falls back to the page heading if the original action disappears.

The dialog remains open during submission and on failure, with inline error feedback and a toast. Duplicate requests are blocked. The selected application is resolved from current query data, so an updated non-withdrawable status disables confirmation and retries use the latest version.

Verified 14 September 2026:
- Dashboard regression suite covers opening without mutation, cancellation, dismissal, pending dismissal blocking, duplicate clicks, inline failure, status changes, retry and success.
- TypeScript and targeted ESLint passed.
- Chrome desktop: named dialog, initial safe focus, cancellation and Escape with focus return.
- Chrome 390 × 844 viewport: dialog and both actions fit; a synthetic application was actually withdrawn through the UI and remained Withdrawn after reload. No browser console errors. This is viewport testing, not a physical phone test.
- Closed synthetic vacancy, application, employer notification and temporary internal helper were removed from development after QA. No production data was modified by QA.

Frontend-only release; no schema or production backend change required. Rollback by reverting the frontend commit if confirmation prevents valid withdrawals.

Next: make the available next step clearer for each application status, including when messaging the employer becomes available.
