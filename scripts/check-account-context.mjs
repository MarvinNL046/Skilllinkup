import assert from "node:assert/strict";
import { getActiveRole, hasCompletedActiveContext } from "../src/lib/accountContext.mjs";

const contexts = [["client", "online"], ["client", "local"], ["freelancer", "online"], ["local_professional", "local"], ["candidate", "jobs"], ["company", "jobs"]];
for (const [activeRole, preferredWorld] of contexts) {
  const user = { activeRole, preferredWorld, activeContextComplete: true };
  assert.equal(hasCompletedActiveContext(user), true, `${activeRole}/${preferredWorld}`);
  assert.equal(getActiveRole(user), activeRole);
  assert.equal(hasCompletedActiveContext({ ...user, activeContextComplete: false, userType: "client", onboardingVersion: 1 }), false);
}
assert.equal(hasCompletedActiveContext(null), false);
assert.equal(hasCompletedActiveContext({ activeRole: "company", preferredWorld: "online", activeContextComplete: true }), false);
assert.equal(hasCompletedActiveContext({ activeRole: "client", preferredWorld: "online" }), false);
assert.equal(hasCompletedActiveContext({ userType: "client", preferredWorld: "online" }), true);
assert.equal(getActiveRole({ userType: "freelancer", preferredWorld: "local" }), "local_professional");
assert.equal(getActiveRole({ activeRole: "candidate", userType: "client", preferredWorld: "jobs" }), "candidate");
console.log("Account context checks passed: six roles, incomplete contexts, legacy accounts and role precedence.");
