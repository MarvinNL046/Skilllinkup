/**
 * Detect template/placeholder image URLs so the UI can fall back to a
 * DS gradient card instead of rendering Uideck's stock placeholders
 * (the "839X548" / "329X245" labelled greyboxes that ship in
 * /public/images/listings/).
 *
 * Real gig uploads land under /uploads/ or external storage (cloudinary,
 * convex, s3) — we accept those by default and reject only known dummy
 * paths.
 */
export function isRealImage(src) {
  if (typeof src !== "string" || !src) return false;
  if (src.includes("/images/listings/service-details")) return false;
  if (src.includes("/images/listings/list-")) return false;
  if (src.includes("/images/listings/g-")) return false;
  if (src.includes("placeholder")) return false;
  return true;
}

/**
 * Pick the first real image from a list (string URLs or { url } objects),
 * or null if none are real.
 */
export function pickRealImage(list) {
  if (!Array.isArray(list)) return null;
  for (const item of list) {
    const src = typeof item === "string" ? item : item?.url;
    if (isRealImage(src)) return src;
  }
  return null;
}
