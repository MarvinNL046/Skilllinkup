import { auth } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../../convex/_generated/api";

export const dynamic = "force-dynamic";
const privateHeaders = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff", "Referrer-Policy": "no-referrer" };
const fail = (status, error) => Response.json({ error }, { status, headers: privateHeaders });

export async function GET(_request, { params }) {
  const session = await auth();
  if (!session.userId) return fail(401, "Sign in to download this CV.");
  const serverSecret = process.env.INTERNAL_EMAIL_SECRET;
  if (!serverSecret || !process.env.NEXT_PUBLIC_CONVEX_URL) return fail(503, "CV downloads are temporarily unavailable.");
  const token = await session.getToken({ template: "convex" });
  if (!token) return fail(401, "Sign in again to download this CV.");
  const { applicationId } = await params;
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  convex.setAuth(token);
  let file;
  try { file = await convex.query(api.marketplace.jobApplications.getResumeDownload, { applicationId, serverSecret }); }
  catch { return fail(403, "This CV is not available to this account."); }
  if (!file) return fail(404, "This CV is no longer available.");
  try {
    const upstream = await fetch(file.url, { cache: "no-store", redirect: "error", signal: AbortSignal.timeout(15000) });
    if (!upstream.ok || !upstream.body) return fail(502, "The CV could not be downloaded. Try again.");
    const extension = file.contentType === "application/pdf" ? "pdf" : file.contentType === "application/msword" ? "doc" : "docx";
    return new Response(upstream.body, { headers: { ...privateHeaders, "Content-Type": file.contentType, "Content-Disposition": `attachment; filename="resume.${extension}"` } });
  } catch { return fail(502, "The CV could not be downloaded. Try again."); }
}
