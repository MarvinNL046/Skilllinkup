import { safeAuthRedirect } from "./authRedirect.mjs";

export function safeOnboardingRedirect(value) {
  const target = safeAuthRedirect(value);
  let pathname = new URL(target, "https://internal.invalid").pathname;
  // Avoid returning to setup itself, including encoded route names.
  for (let depth = 0; depth < 5; depth += 1) {
    pathname = new URL(pathname, "https://internal.invalid").pathname;
    if (/^\/(?:[a-z]{2}\/)?onboarding(?:\/|$)/i.test(pathname)) return "/dashboard";
    const decoded = decodeURIComponent(pathname);
    if (decoded === pathname) break;
    pathname = decoded;
  }
  return target;
}

export function onboardingUrl(destination, context) {
  const params = new URLSearchParams({ redirect_url: safeOnboardingRedirect(destination) });
  const worlds = { client: ["online", "local"], freelancer: ["online"], local_professional: ["local"], candidate: ["jobs"], company: ["jobs"] };
  if (worlds[context?.role]?.includes(context?.world)) {
    params.set("role", context.role);
    params.set("world", context.world);
  }
  return `/onboarding?${params}`;
}
