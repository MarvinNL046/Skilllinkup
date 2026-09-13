# Mobile inbox and notifications QA — 2026-09-13

Scope: development client QA account, Chrome responsive viewport, existing synthetic conversations and orders. No customer messages or production records created.

## Findings and changes

- Notification popover started at x=-70px on a 390px viewport. Anchor it to viewport side margins below the mobile breakpoint and constrain height to the visible viewport. The bell now uses the shared Button component.
- Mobile Back to conversations left the conversation query parameter behind. Clicking a notification for that same conversation then left the list visible. Clear the selected conversation and query parameter on Back; synchronize the panel with an empty route and use history push when opening a conversation.
- Search ignored the project title displayed on the conversation row. Include the context title, with trimmed case-insensitive matching.
- Long conversation previews and project titles pushed row content past the mobile card edge. Constrain grid tracks and row minimum width so existing ellipsis truncation works and timestamps remain visible.

## Verification

- Opened a conversation with 3 unread messages; returning to the list cleared its unread badge.
- Reproduced notification-to-same-conversation failure before the change; verified it opens the conversation after the fix.
- Back to conversations clears the route to /message. Browser Back also returns to the list. Reloading the list keeps the list open.
- Searching `  Android PDF  ` finds the correct project conversation; its workspace link targets the Android QA order.
- Followed a delivery notification to the matching completed QA order and verified its title and delivery notes. The notification counter decreased from 13 to 12 on return.
- Visually checked mobile truncation and notification placement. This turn uses desktop Chrome responsive testing, not a new physical Android test.
- Dashboard MVP checks, targeted ESLint, TypeScript and diff whitespace checks passed.

## Release

Frontend-only change; no data migration or backend deployment needed. CI and Vercel preview must pass before merging. Revert this change if inbox navigation or notification rendering regresses. Production release identity and hosted checks are verified after deployment.
