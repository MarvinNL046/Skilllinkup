# Public application and employer browser QA

Verified in Chrome against local Next.js and the development Convex deployment using dedicated candidate and company QA accounts.

- Opened the public synthetic vacancy, followed Apply For Job, checked the empty form could not submit, and sent a synthetic application without a CV.
- Application sent remained visible after reload. Manage application opened the exact submitted application in the candidate dashboard.
- Employer hiring overview displayed the application and its message. In review enabled messaging; Interview and Offer saved with the corresponding guidance.
- Closed opened a named confirmation with Cancel focused. Cancelling preserved In review and restored focus to the stage selector.
- At 390 × 844, the Hired confirmation fitted the viewport with readable text and full-width actions. Confirming saved Hired; reload preserved it, removed the stage selector and retained messaging.

Found and fixed a public-page withdrawal shortcut that bypassed the dashboard confirmation. All saved application states now link to Manage application. Closed copy no longer claims another candidate was selected. A component regression covers all seven saved statuses.

The temporary development vacancy, application, notifications and skipped email records were removed. The QA company verification status was restored to unverified and the temporary helper removed. Email delivery was disabled throughout; no customer was contacted.

This pass did not upload a CV or use a physical phone. Existing upload checks and the prior backend/message journey remain separate evidence. Next: check the candidate discovery and invitation journey with the same clear next-step guidance.
