# Skilllinkup Preview rollback rehearsal

Date: 2 August 2026

## Scope and safety boundary

This engineering rehearsal changed only the protected Preview alias `skilllinkup-preview.vercel.app`. Production domains, production data, Clerk live identity, the Convex production deployment and payment quarantine were not changed.

The alias restoration ran in a `finally` block so the current Preview artifact was reassigned even if verification of the rollback target failed.

## Verified artifacts

| Purpose                             | Deployment                                                                                    | Commit                                     |
| ----------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Previous known-good rollback target | `dpl_ByJxZ7RGtsqEyS63n5zjXFpryfVr` / `skilllinkup-n2gr621v7-marvinnl046s-projects.vercel.app` | `3b030fb2a01728ec1c807759324e1f3686d5fd22` |
| Current Preview restoration target  | `dpl_BCqXHpoLSLXPZLEnPF9Sxr69d4tB` / `skilllinkup-3bv4sets0-marvinnl046s-projects.vercel.app` | `6d1b8ec9ab8bc82fc6fe9f4fe7f924c55cea9040` |

Both immutable artifacts returned `status: ok`, a valid Preview environment contract and release-traceable health before the alias changed.

## Rehearsal result

1. Assigned `skilllinkup-preview.vercel.app` to the previous known-good artifact.
2. Queried `/api/health` through the stable alias with Deployment Protection still enabled via `vercel curl`.
3. Confirmed the alias served commit `3b030fb2a01728ec1c807759324e1f3686d5fd22` with `status: ok`.
4. Restored the stable alias to the current Preview artifact in the guaranteed cleanup path.
5. Confirmed the alias served commit `6d1b8ec9ab8bc82fc6fe9f4fe7f924c55cea9040` with `status: ok`.
6. Confirmed the restored homepage contained the Skilllinkup identity.
7. Inspected the alias and confirmed it resolves to deployment `dpl_BCqXHpoLSLXPZLEnPF9Sxr69d4tB`.

Result: **passed**.

## Remaining launch gate

This proves the reversible technical procedure on Preview. Before Wave 0, a named release owner and backup must repeat or observe the rehearsal, record acknowledgement and approve the production rollback policy. A production rollback must only target a recorded compatible artifact and must include authenticated workspace acceptance; this Preview exercise does not authorize an unreviewed production rollback or an independent Convex schema rollback.
