# Hiring journey verification — 14 September 2026

Dedicated candidate and company QA accounts on accurate-anaconda-993 exercised the real authenticated Convex handlers. Email delivery was disabled. The synthetic vacancy belonged to the unverified QA company and was not a public verified listing.

Passed: application submission, duplicate submission rejection, employer applicant retrieval, candidate denial when trying employer status updates, messaging locked before screening, screening, shared conversation identity from both participants, two persisted messages in opposite directions, idempotent message retry, read markers, interview, offer, hired, candidate status notification destinations, and rejection of a transition away from Hired. Each stage was fetched again from the candidate query.

Chrome candidate UI: displayed Hired, opened the existing conversation with both messages, followed the repaired context link to the selected application and retained Hired after reload. No console errors.

## Finding and fix

Job-application conversations stored a link containing a database ID, while the public vacancy route looks up a slug. This generated an unusable destination and also depended on the vacancy remaining publicly available. Conversation list and detail queries now derive a private destination per participant: the candidate's selected application or the employer's applicant overview. Existing stored links are corrected at read time without a migration. Missing records or tenant mismatches produce no context link. Conversation access checks remain in place.

Regression checks: 17 foundation suites, dashboard suite, TypeScript and targeted ESLint. Added actual-handler tests for candidate/employer destinations, legacy links, closed/deleted jobs, deleted applications, tenant mismatches and outsider denial.

## Scope and cleanup

This combines real backend calls under both identities with browser checks of the candidate's result. It is not a complete click-through of the employer browser, the public application form, or a physical Android test. The previous confirmation-dialog regression tests cover final-decision controls. No claim of a fully verified public signup-to-hire journey is made.

Removed the synthetic vacancy, application, conversation, messages, related notifications, skipped email records and temporary helper; pushed the clean development backend again. Retained QA accounts and unrelated previous test records.

Release: backward-compatible query fix, no schema migration. Deploy backend before frontend copy. Rollback by reverting the query change if existing conversation reads fail.

Next: perform the remaining public vacancy/application form and employer-browser click-through with a verified QA company in an isolated development setup.
