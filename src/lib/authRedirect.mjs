const FALLBACK = "/dashboard";
const INTERNAL_ORIGIN = "https://internal.invalid";
const AUTH_PATH = /^\/(?:[a-z]{2}\/)?(?:login|register|sign-in|sign-up)(?:\/|$)/i;
const UNSAFE_CHARACTERS = /[\\\u0000-\u001f\u007f]/;

// Input is the value returned by URLSearchParams.get(), not the outer encoded
// query string. Keep query/fragment encoding intact while checking the path.
export function safeAuthRedirect(value) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//") || UNSAFE_CHARACTERS.test(value)) {
    return FALLBACK;
  }

  try {
    const target = new URL(value, INTERNAL_ORIGIN);
    if (target.origin !== INTERNAL_ORIGIN) return FALLBACK;
    let pathname = target.pathname;

    // Check encoded separators, dot segments and auth routes too. Bound repeated
    // decoding and reject deeper nesting instead of accepting an ambiguous URL.
    for (let depth = 0; depth < 5; depth += 1) {
      if (pathname.startsWith("//") || UNSAFE_CHARACTERS.test(pathname)) return FALLBACK;
      const normalized = new URL(pathname, INTERNAL_ORIGIN);
      if (normalized.origin !== INTERNAL_ORIGIN || AUTH_PATH.test(normalized.pathname)) return FALLBACK;
      const decoded = decodeURIComponent(pathname);
      if (decoded === pathname) return `${target.pathname}${target.search}${target.hash}`;
      pathname = decoded;
    }
  } catch {
    // Malformed encodings and URLs use the same predictable account destination.
  }
  return FALLBACK;
}
