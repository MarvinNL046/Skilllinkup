# Message draft verification — 2026-09-13

Unsent messages use session storage scoped to the account and conversation. Inbox and order workspace share the draft and in-flight send within one browser tab. Rejected sends preserve text; successful sends clear the matching draft. Storage failures keep an in-memory draft and show a reload warning. Offline submissions show an inline error without starting a mutation.

## Verified

- Dashboard regression checks, TypeScript, targeted ESLint and production build pass.
- Regression scenarios cover isolated accounts/conversations, fresh module restoration, shared pending promises, rejected send/retry, preserving a newer draft, blocked storage and offline/reconnect behavior.
- Chrome localhost, development freelancer QA account: entered a two-line synthetic draft, reloaded and saw both lines, opened the linked order workspace and saw the same draft, sent once, reloaded and saw one message with an empty composer.
- No production user content was changed during browser QA. Offline behavior was tested in the component harness, not by disconnecting Chrome.

## Boundary / next step

The pending-send registry is per JavaScript runtime. It does not guarantee deduplication after a full reload during an uncertain server acknowledgement, or across separate tabs. Add a persisted client request identifier and server-side idempotency before claiming that guarantee. Session drafts are not synchronized across devices.
