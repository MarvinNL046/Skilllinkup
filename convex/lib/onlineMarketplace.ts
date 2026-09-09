// Reconciled with the existing development deployment (2026-09-07).
var f = new Set(["remote", "online"]),
  u = new Set(["digital", "hybrid"]),
  w = 12;
function classifyLegacyOnlineProviderProfile(e, n) {
  if (e.providerRole !== void 0) return {
    eligible: !1,
    reason: "already_classified"
  };
  if (e.workType === "local" || e.workType === "hybrid") return {
    eligible: !1,
    reason: "local_or_hybrid_work_type"
  };
  if (!n || e.userId !== n._id) return {
    eligible: !1,
    reason: "profile_user_mismatch"
  };
  if (e.tenantId !== n.tenantId) return {
    eligible: !1,
    reason: "tenant_mismatch"
  };
  let r = n.accountRoles ?? [];
  return n.activeRole === "local_professional" || n.preferredWorld === "local" || r.includes("local_professional") && !r.includes("freelancer") ? {
    eligible: !1,
    reason: "local_account_context"
  } : e.workType === "remote" || e.workType === "online" ? {
    eligible: !0,
    providerRole: "freelancer" as const,
    workType: e.workType,
    evidence: "explicit_online_work_type"
  } : e.locationPostcode !== void 0 || e.serviceRadiusKm !== void 0 || e.latitude !== void 0 || e.longitude !== void 0 ? {
    eligible: !1,
    reason: "local_profile_signals"
  } : n.activeRole === "freelancer" || n.preferredWorld === "online" || r.includes("freelancer") ? {
    eligible: !0,
    providerRole: "freelancer" as const,
    workType: "remote",
    evidence: "legacy_online_account_context"
  } : {
    eligible: !1,
    reason: "insufficient_online_evidence"
  };
}
function assertOnlineWorkType(e, n) {
  if (!e || !f.has(e)) throw new Error(`${n} must use an Online work type (remote or online).`);
}
function assertActiveOnlineProviderProfile(e, n) {
  if (!e) throw new Error("Online freelancer profile not found.");
  if (e.userId !== n.ownerId) throw new Error("Unauthorized.");
  if (e.tenantId !== n.accountTenantId || n.resourceTenantId && e.tenantId !== n.resourceTenantId) throw new Error("Online marketplace tenant mismatch.");
  if (e.providerRole !== "freelancer") throw new Error("Use an Online freelancer profile for this action.");
  if (e.status !== "active") throw new Error("Your Online freelancer profile must be active.");
  return assertOnlineWorkType(e.workType, "Online freelancer profile"), e;
}
function assertOnlineGig(e, n, r) {
  if (e.tenantId !== r.expectedTenantId || n.tenantId !== e.tenantId) throw new Error("Online marketplace tenant mismatch.");
  if (e.freelancerId !== n._id) throw new Error("Gig owner profile mismatch.");
  return assertOnlineWorkType(r.workType ?? e.workType, "Online service"), e;
}
function assertOnlineProject(e, n) {
  if (e.tenantId !== n.expectedTenantId) throw new Error("Online marketplace tenant mismatch.");
  if (n.expectedClientId && e.clientId !== n.expectedClientId) throw new Error("Project owner mismatch.");
  return assertOnlineWorkType(n.workType ?? e.workType, "Online project"), e;
}
async function assertOnlineMarketplaceCategory(e, n, r, a) {
  if (!n) return null;
  let l = new Set(),
    i = n,
    s = null;
  for (let d = 0; i && d < w; d += 1) {
    if (l.has(i)) throw new Error("Marketplace category hierarchy contains a cycle.");
    l.add(i);
    let t = await e.db.get(i);
    if (!t) throw new Error("Marketplace category not found.");
    if (s ??= t, t.tenantId !== r) throw new Error("Marketplace category tenant mismatch.");
    if (a && t.locale !== a) throw new Error("Marketplace category locale mismatch.");
    if (t.isActive === !1) throw new Error("Marketplace category is not active.");
    if (t.serviceType !== void 0 && !u.has(t.serviceType)) throw new Error("Use an Online service category for this action.");
    i = t.parentId;
  }
  if (i) throw new Error("Marketplace category hierarchy is too deep.");
  return s;
}
export { classifyLegacyOnlineProviderProfile, assertOnlineWorkType, assertActiveOnlineProviderProfile, assertOnlineGig, assertOnlineProject, assertOnlineMarketplaceCategory };
