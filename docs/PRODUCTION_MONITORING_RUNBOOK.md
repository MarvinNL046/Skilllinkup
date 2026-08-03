# Skilllinkup production monitoring runbook

Last updated: 3 August 2026

## Automated synthetic monitor

The GitHub Actions workflow `Production monitor` runs at 7, 22, 37 and 52 minutes past every hour. It executes the same hosted release verifier used during promotion against `https://skilllinkup.com` and checks:

- core public Online, Local, Jobs, Services and Projects routes;
- release-traceable `/api/health` metadata;
- the private-beta payment quarantine;
- rejection of forged internal credentials.

Each scheduled run retries the complete verification up to three times with a bounded 20-second delay. Three failures make the workflow fail and open or update one assigned GitHub incident instead of creating repeated issues. A later successful production run records recovery and closes open monitor incidents. The workflow does not send credentials, participant data or request bodies containing personal information.

Incident routing:

- production failures use the `production-monitor` label;
- deliberate alert tests use the separate `monitor-rehearsal` label;
- the repository owner `MarvinNL046` is the current primary assignee;
- repeated failures append evidence to the existing open issue;
- recovery comments include the green workflow URL before the issue closes.

## Alert-delivery acceptance

The workflow now has a named primary owner and an assigned GitHub-issue delivery channel. The launch gate remains partially open until a named human backup confirms their notification destination.

The automated failure, deduplication and recovery path passed its controlled rehearsal on 3 August 2026. See `PRODUCTION_MONITOR_REHEARSAL_2026-08-03.md` for the immutable run and issue evidence.

1. Keep the primary owner and future backup current in `PRIVATE_BETA_OPERATIONS_RUNBOOK.md`.
2. Ensure both people watch assigned GitHub issues or route those notifications to their approved destination.
3. Manually dispatch `Production monitor` with `base_url` set to `https://monitor-rehearsal.invalid`.
4. Confirm the workflow fails after three bounded attempts and opens an assigned `monitor-rehearsal` issue.
5. Record acknowledgement time and channel without copying tokens or personal data into the repository.
6. Dispatch the workflow again with `https://skilllinkup.com`; confirm it succeeds, adds a recovery comment and closes the rehearsal issue.

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
