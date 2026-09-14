# Candidate application status — 14 September 2026

Status notifications now open the exact application through an optional application query parameter. Selection checks both candidate ownership and tenant, handles malformed IDs without throwing, and reaches applications outside the first pagination page. Private employer notes remain excluded. Closed, expired and removed vacancies retain the candidate's application record without a public vacancy link.

## Verification

- Foundation handler suites: 16 passed, including 125-row pagination, focused selection, foreign owner rejection, invalid ID, removed vacancy fallback, human status text and private note exclusion.
- Hiring pipeline and dashboard component regression suites passed.
- TypeScript, targeted ESLint and diff whitespace checks passed.
- Development Convex push succeeded.
- Chrome: dedicated employer QA changed a synthetic application to screening using the real mutation; candidate QA opened the resulting notification, saw In review and refreshed with the same result.
- Chrome 390 × 844 viewport: selected application and shared actions fit without horizontal overflow. This was not a physical phone test.
- Show all applications returned to the list. A malformed application URL displayed Application not available without a console error.

## Test isolation

Used a closed synthetic vacancy and existing dedicated QA accounts on accurate-anaconda-993. Development email delivery was disabled. The fixture, notification, skipped email record and temporary internal helper were removed after verification; the clean backend was pushed again. No customer messages or public vacancies were created.

## Release notes

No schema migration. Deploy the backward-compatible backend before the frontend. Older generic notification URLs remain valid. Roll back the frontend if focused navigation fails; the optional backend argument can remain safely deployed.

Next: review the candidate's next actions after each status, including a confirmation step before withdrawing an application.
