# Confirmations and role guards, block 3 — 17 September 2026

Source: `PRODUCTION_READINESS_AUDIT_2026-09-17.md`, dashboard findings on irreversible actions, role guards, loading states and accessibility.

## Changes

- **Shared `ConfirmDialog`** (`src/components/ui/ConfirmDialog.jsx`) built on the existing dialog and `Button`: Cancel is focused first, the action cannot be submitted twice, a failed action keeps the dialog open with its error, and focus returns to the control that opened it.
- **Local workspace** (`OrderWorkspace.jsx`): "Mark service complete", "Cancel appointment" and removing a delivered file now ask for confirmation and explain the consequence. The remove button names the file for screen readers and confirms success with a toast.
- **Account deletion** (`PrivacyInfo.jsx`): the request is sent only after a confirmation that lists the immediate effects (profile becomes private, CV sharing and invitations switch off).
- **Admin disputes** (`AdminDisputeList.jsx`): decisions need a confirmation with a required resolution note, errors show in the dialog instead of `alert()`, loading is no longer shown as "no open disputes", and the wording no longer speaks of releasing or refunding money (English and Dutch).
- **Native prompts removed**: service removal, experience, education, certificate and portfolio deletion used `window.confirm` or `confirm`; they now use the shared dialog.
- **Experience tab**: edit and delete controls were unfocusable `<a>` icons without labels. They are labelled icon buttons now, the add buttons use the shared `Button`, and certificate links render only for `https://` URLs.
- **Portfolio tab**: cards show the first image as a thumbnail instead of an "N images" placeholder, with shared buttons.
- **Role guards**: `/dashboard/credits` (local professional), `/proposal` (online freelancer) and `/projects/[id]` (online client) are wrapped in `AccountModeGuard`. `/reviews` stays unguarded because several roles use it.
- **Auth proxy**: `/projects/<id>` sits under the public `/projects` prefix and is now protected explicitly; the public list stays public.
- **Manage Services**: an account without a freelancer profile saw "Loading your services…" forever. It now gets a "complete your profile" state with a link.

## Verification

- `check-dashboard-mvp.mjs` gained a scenario group: the shared dialog blocks double submits, keeps a failure visible, allows a retry and closes on success; removing a service reaches the mutation only through the confirmation; the workspace no longer calls the appointment mutation directly from the buttons; the three routes carry their guard; and no dashboard component may call `confirm()` or `alert()`. The last check was shown to fail when a native prompt was injected.
- TypeScript, full ESLint and all regression and contract suites pass.
- Local server: `/projects` returns 200 and `/projects/<id>` redirects to sign-in, as do `/proposal`, `/dashboard/credits` and `/admin/disputes`.
- Not verified in a browser: the signed-in dialogs and screens themselves. No authenticated session was available, so focus behaviour relies on the shared dialog pattern that earlier browser QA verified for applications and invitations.

## Release

Frontend only. No backend deploy.
