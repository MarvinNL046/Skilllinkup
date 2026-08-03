# Production monitor incident-delivery rehearsal — 3 August 2026

Scope: prove the automated GitHub incident path for the public Skilllinkup production contract without causing a real production outage or weakening any security gate.

## Result

The automated path passed. A deliberately invalid target created one assigned rehearsal issue after three bounded failures. A second identical failure added evidence to the same issue instead of opening a duplicate. A subsequent successful check against `https://skilllinkup.com` recorded recovery and closed that issue.

| Acceptance criterion                | Evidence                                                                                                                                                           | Result |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| Bounded failure is detected         | [First failed rehearsal run](https://github.com/MarvinNL046/Skilllinkup/actions/runs/30789944649)                                                                  | Passed |
| One rehearsal incident is opened    | [Issue #20](https://github.com/MarvinNL046/Skilllinkup/issues/20), labelled `monitor-rehearsal` and assigned to `MarvinNL046`                                      | Passed |
| Repeated failure is deduplicated    | [Second failed rehearsal run](https://github.com/MarvinNL046/Skilllinkup/actions/runs/30790047993) added a comment to issue #20; the open issue count remained one | Passed |
| Production recovery is verified     | [Successful production run](https://github.com/MarvinNL046/Skilllinkup/actions/runs/30790153156) checked commit `8dfc58d995d53436ab53ee8320ce6b98a3d01673`         | Passed |
| Recovery is recorded before closure | Issue #20 contains the green run URL and was closed as completed                                                                                                   | Passed |

## Safety properties retained

- The failure target was an intentionally invalid hostname, not the production service.
- The verifier still checked the payment quarantine and rejected forged internal credentials.
- The issue contains target, run, commit, trigger and timestamps only; no secrets or participant data were copied.
- Only a successful check against the canonical production URL may close monitor incidents.
- Real incidents and rehearsals use separate labels.

## Remaining human gate

This evidence proves automated delivery, deduplication and recovery handling. It does not prove that a second human receives or acknowledges the alert. Before Wave 0, name a backup owner, configure their approved GitHub notification destination, and record an acknowledgement without placing personal contact details or tokens in the repository.
