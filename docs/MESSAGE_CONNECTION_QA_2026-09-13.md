# Shared composer connection feedback

The inbox and order workspace use the same MessageBox. It subscribes to the installed Convex client's connection state and browser online/offline events. Initial connection, reconnection, offline composition and pending acknowledgement have distinct accessible status text. New submissions are blocked while disconnected; typing remains available unless a send is already pending. A pending mutation is left with Convex to retry, without starting an additional request. Success is shown only after the send promise resolves.

Verification on 2026-09-13: dashboard regression suite, targeted ESLint, TypeScript and production build passed. Component tests simulate initial connection, online browser with disconnected socket, browser offline events, reconnect, lost connection during send, duplicate submit, rejection and successful retry. Chrome development QA confirmed a synthetic message is saved, its composer cleared and “Message sent.” displayed. Browser network loss was simulated in the component harness, not by disconnecting Chrome.

Next: a complete mobile acceptance pass through request, proposal, conversation and delivery, checking these statuses alongside the main workflow.
