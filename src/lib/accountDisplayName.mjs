/** Prefer the saved profile name; never greet someone with a placeholder or email. */
export function accountDisplayName(profile, clerkUser) {
  const name = [profile?.name, clerkUser?.firstName, clerkUser?.fullName]
    .find((value) => typeof value === "string" && value.trim() &&
      value.trim().toLowerCase() !== "user" && !value.includes("@"));
  if (name) return name.trim().split(/\s+/u)[0];
  return clerkUser?.username?.trim() || "there";
}
