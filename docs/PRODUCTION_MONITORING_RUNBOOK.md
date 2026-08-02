# Skilllinkup production monitoring runbook

Last updated: 2 August 2026

## Automated synthetic monitor

The GitHub Actions workflow `Production monitor` runs at 7, 22, 37 and 52 minutes past every hour. It executes the same hosted release verifier used during promotion against `https://skilllinkup.com` and checks:

- core public Online, Local, Jobs, Services and Projects routes;
- release-traceable `/api/health` metadata;
- the private-beta payment quarantine;
- rejection of forged internal credentials.

Each scheduled run retries the complete verification up to three times with a bounded 20-second delay. Three failures make the workflow fail and create a visible GitHub Actions failure. The workflow does not send credentials, participant data or request bodies containing personal information.

## Alert-delivery acceptance

The workflow is an implemented alert source, but the launch gate remains open until a named primary owner and backup prove that the alert reaches their configured GitHub notification destination.

1. Assign the monitoring owner and backup in `PRIVATE_BETA_OPERATIONS_RUNBOOK.md`.
2. Enable GitHub Actions failure notifications for both people.
3. Manually dispatch `Production monitor` with `base_url` set to `https://monitor-rehearsal.invalid`.
4. Confirm the workflow fails after three bounded attempts and both people receive the expected notification.
5. Record acknowledgement time and channel without copying tokens or personal data into the repository.
6. Dispatch the workflow again with `https://skilllinkup.com` and confirm it succeeds.

Do not disable Deployment Protection, Clerk authorization, payment quarantine or internal-secret checks to make monitoring green.

## Triage

1. Open the failed workflow summary and identify the first failing route or contract.
2. Verify `https://skilllinkup.com/api/health` and match its commit and immutable deployment URL to the current release.
3. Query Vercel errors for that deployment with a bounded time window.
4. Classify the incident using `PRIVATE_BETA_OPERATIONS_RUNBOOK.md`.
5. Stop beta invitations for SEV-1 or SEV-2 incidents and notify the release, support and safety owners.
6. Roll back only to the recorded last-known-good frontend artifact. Never independently roll back an incompatible Convex schema.
7. Run the production monitor plus one authenticated workflow smoke before reopening traffic.

## Remaining observability gate

This synthetic monitor detects public availability and contract regressions. It does not replace client/server exception tracking, a Vercel log drain or an accountable responder. Before Wave 0, select and test an error destination appropriate to the Vercel plan, then record the provider, retention policy, privacy review, primary owner and backup in the release record.
