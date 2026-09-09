const worldsByRole = {
  client: ["online", "local"],
  freelancer: ["online"],
  local_professional: ["local"],
  candidate: ["jobs"],
  company: ["jobs"],
};

export function getActiveRole(user) {
  if (user?.activeRole) return user.activeRole;
  if (user?.userType === "freelancer") {
    return user.preferredWorld === "local" ? "local_professional" : "freelancer";
  }
  if (user?.userType === "client") {
    return user.preferredWorld === "jobs" ? "company" : "client";
  }
  return null;
}

export function hasCompletedActiveContext(user) {
  const role = getActiveRole(user);
  if (!worldsByRole[role]?.includes(user?.preferredWorld)) return false;
  // The context-aware backend is authoritative, including an explicit false.
  if (typeof user.activeContextComplete === "boolean") return user.activeContextComplete;
  // Compatibility with the older account contract until both environments align.
  return Boolean(user.onboardingVersion || user.userType);
}
