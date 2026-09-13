import { auth } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../../convex/_generated/api";

export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff", "Referrer-Policy": "no-referrer" };
const fail = (status, error) => Response.json({ error }, { status, headers });

export async function GET(_request, { params }) {
  const session = await auth();
  if (!session.userId) return fail(401, "Sign in to download this file.");
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) return fail(503, "Downloads are temporarily unavailable.");
  const token = await session.getToken({ template: "convex" });
  if (!token) return fail(401, "Sign in again to download this file.");
  const convex = new ConvexHttpClient(convexUrl);
  convex.setAuth(token);
  const { deliverableId } = await params;
  let file;
  try { file = await convex.query(api.marketplace.deliverables.getDownload, { deliverableId }); }
  catch { return fail(403, "This file is not available to this account."); }
  if (!file) return fail(404, "This file is no longer available.");
  try {
    const url = new URL(file.url);
    if (url.origin !== new URL(convexUrl).origin || !url.pathname.startsWith("/api/storage/")) return fail(502, "This file could not be downloaded.");
    const upstream = await fetch(url, { cache: "no-store", redirect: "error", signal: AbortSignal.timeout(15000) });
    if (!upstream.ok || !upstream.body) return fail(502, "Download failed. Please try again.");
    const name = file.fileName.replace(/[\x00-\x1f\x7f/\\]/g, "_");
    const fallback = name.replace(/[^\x20-\x7e]|[";]/g, "_");
    const encoded = encodeURIComponent(name).replace(/['()*]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
    return new Response(upstream.body, { headers: {
      ...headers,
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${fallback}"; filename*=UTF-8''${encoded}`,
    } });
  } catch { return fail(502, "Download failed. Please try again."); }
}
