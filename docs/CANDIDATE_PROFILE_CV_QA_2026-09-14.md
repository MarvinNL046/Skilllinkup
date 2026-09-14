# Candidate profiles and saved CVs — 14 September 2026

## Delivered behavior

The Jobs dashboard has a dedicated My profile & CV page. Candidates can save a name, headline, region, summary, skills and a PDF/DOC/DOCX CV up to 3 MB. Profile discovery and employer CV downloads are separate, default-off choices. Replacing a CV in the editor asks the candidate to review CV sharing again.

Verified company accounts in the same tenant can search opted-in profiles through Find candidates. Results contain only the chosen profile fields, never the account email. CV contact details are available only if the candidate separately shares the CV. This release does not add unsolicited employer messaging or invitations to apply.

Candidates may explicitly reuse their saved CV when applying. The application receives an independent copy. Replacing or removing the profile CV does not alter previous applications. Newly attached application files retain the existing 10 MB limit; saved profile CVs use a 3 MB limit to stay below the hosted upload request limit.

## Access and persistence

- Convex queries/mutations enforce ownership, completed account context, employer verification and tenant boundaries.
- The download route rechecks current access on every request and streams an attachment with private/no-store headers. Client responses never contain the underlying storage URL.
- Disabling discovery also disables CV sharing. Future downloads are denied immediately after saving; previously downloaded files cannot be recalled.
- Revisions protect against stale edits and against copying a different CV after it changes in another tab.
- Server-mediated uploads claim file ownership and clean up unclaimed files after a failed save. An ambiguous acknowledgement never removes an already attached CV.
- Account data exports include candidate profiles. Requesting account deletion hides the profile and CV; cancelling deletion does not republish them.

## Verification

Automated handler tests cover owner isolation, unauthenticated access, private defaults, separate CV consent, verified employers, tenant isolation, indexed search, immediate revocation, stale writes, replacement, removal and orphan cleanup. The script runs in the launch-contract CI suite.

The development browser check used a dedicated QA candidate and a synthetic PDF. Upload returned 200, the saved file survived reload, and the owner download fired successfully. A 390 px viewport check showed readable fields and visibility controls. No real candidate files or applications were used.

Actual development backend checks confirmed that the private profile was absent from employer search; profile-only sharing returned no CV link; separate CV sharing allowed the verified QA employer to fetch a valid PDF; unrelated accounts were denied; turning sharing off revoked access. The temporary employer verification was restored to its original unverified state and the temporary development-only helper was removed. The synthetic candidate profile and CV remain private.

Full lint, TypeScript, dashboard regression checks, candidate access tests and private-beta copy checks passed locally. The production Convex dry run reported new candidate profile indexes and no deleted indexes.

Limits of manual verification: CV reuse in a newly submitted application and the verified employer cards were reviewed in code rather than exercised through a complete new browser application. Existing application regression checks remain in place. Profile CV replacement/removal are covered by handler tests.

## Next step

Design a vacancy-specific invitation flow with candidate control over incoming contact, rather than exposing account email addresses or immediately enabling general unsolicited messages.
