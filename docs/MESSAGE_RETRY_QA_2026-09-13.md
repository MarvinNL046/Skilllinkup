# Message retry idempotency — 2026-09-13

Each send gets a UUID persisted with its content in session storage before the mutation. A failed or uncertain send reuses that UUID after reload. Success removes it so intentionally repeating the same text creates a new message.

The Convex mutation authenticates conversation membership, validates the request and uses an index scoped to conversation, sender and UUID. Existing matching requests return the original message ID before writes, notifications, unread increments, rate limiting or email scheduling. Reusing an ID for changed content fails. The lookup and insert run in one Convex transaction. The optional field preserves compatibility with older clients and existing records.

Verification: foundation and dashboard regression suites, TypeScript, targeted ESLint and production build passed. The development deployment accepted the schema/index. Two concurrent authenticated CLI requests under the freelancer QA identity and one later retry all returned message `kx7bwts01ykkq5k953ffsfz4ch8eas14`. Client tests simulate lost acknowledgement and reload, checking persisted-ID reuse and a fresh ID after success. Handler tests check authorization, changed-content rejection, separate sender/conversation scope and single notification/email/unread effects.

Limits: reload recovery requires available session storage. Independently composed messages in separate tabs have different IDs and remain separate messages. Old clients that omit the optional ID retain their previous behavior. Deleting a message also deletes its retry record.

Next: show a clear connection/pending-delivery status in the shared composer, including when Convex is reconnecting while the browser still reports online.
