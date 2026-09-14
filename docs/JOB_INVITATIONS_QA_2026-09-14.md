# Vacancy invitations — 14 September 2026

## Behavior

Candidates can separately opt in to vacancy invitations in My profile & CV. The optional database field defaults to false for existing profiles. Disabling profile discovery also disables invitations; old client saves preserve the invitation choice while discovery stays enabled. Account deletion requests turn it off.

Verified employers can invite an opted-in candidate to an open, unexpired vacancy they own in the same tenant. The directory offers a paginated vacancy picker and an optional note of up to 600 characters. Each candidate can be invited once per vacancy, including after declining or withdrawal. New invitations are limited to 10 per employer per day.

The candidate receives an in-app notification and can review, confirm interest or decline in `/dashboard/job-invitations`. Interest is a response, not an application or a grant of CV/email access. A separate vacancy link lets the candidate submit or check an application. Employers track responses and withdraw pending invitations in `/dashboard/sent-invitations`. Invitations expire after 30 days or the vacancy deadline; closed/deleted jobs and revoked company verification immediately prevent interest confirmation. Turning invitations off blocks new sends while preserving the candidate's ability to review existing invitations.

Notifications use the existing in-app helper with new event types; this release adds no invitation email delivery. Sent and received records are included in paginated account exports.

## Verification

- Handler tests execute the production invitation and authentication code with isolated fixtures. They cover default opt-out, explicit consent, sender/job ownership, verification, tenants, self-invitation, expired/closed jobs, missing access, duplicate delivery, single notifications, stale responses, withdrawal, decline, revoked verification, account deletion, existing applications, pagination and rate limiting.
- Candidate profile tests cover preserving invitation consent for legacy saves and disabling it when discovery is switched off.
- Full lint, TypeScript, dashboard regressions and private-beta copy checks passed locally. The new invitation script runs in launch-contract CI.
- A development-only synthetic vacancy was created for the existing dedicated Company QA and Candidate QA accounts. The candidate enabled invitations through the profile form. The actual authenticated employer mutation sent an invitation, and the notification opened the correct candidate dashboard page.
- The candidate confirmed interest in the browser; the saved status appeared after reload and in the employer's actual backend list. The candidate CV remained private, and querying the job application returned no application. The invitation page was checked at 390 × 844 and the viewport was restored.
- The synthetic vacancy, invitation and their notifications were removed. Temporary QA company verification was restored to unverified. The QA profile was saved back to private with invitations disabled. The temporary development fixture function was deleted and removed from the deployment before release.

Manual scope: the candidate response and preference flow were exercised in Chrome; employer send/options/history were exercised against the real development backend. The employer composer and decline/withdraw branches were reviewed in code and covered by handler tests rather than a second authenticated browser session. No real candidate invitations or emails were sent during QA.

## Next step

Show invitation context alongside existing applicants so companies can follow the transition from invitation to submitted application without treating an expression of interest as an application.
