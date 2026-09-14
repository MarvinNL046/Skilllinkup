import { auth } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../../convex/_generated/api";

export const dynamic = "force-dynamic";
const headers = {
  "Cache-Control": "private, no-store",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
};
const fail = (status, error) => Response.json({ error }, { status, headers });
export async function GET(request, { params }) {
  const session = await auth();
  if (!session.userId) return fail(401, "Sign in to download this CV.");
  const serverSecret = process.env.INTERNAL_EMAIL_SECRET,
    origin = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!serverSecret || !origin)
    return fail(503, "CV downloads are temporarily unavailable.");
  const token = await session.getToken({ template: "convex" });
  if (!token) return fail(401, "Sign in again to download this CV.");
  const convex = new ConvexHttpClient(origin);
  convex.setAuth(token);
  let file;
  const version = new URL(request.url).searchParams.get("version");
  if (
    version !== null &&
    (!/^\d+$/.test(version) || !Number.isSafeInteger(Number(version)))
  )
    return fail(400, "Invalid CV version.");
  try {
    file = await convex.query(
      api.marketplace.candidateProfiles.getResumeDownload,
      {
        profileId: (await params).profileId,
        serverSecret,
        ...(version === null ? {} : { expectedUpdatedAt: Number(version) }),
      },
    );
  } catch {
    return fail(
      403,
      "This CV is private or no longer shared with your account.",
    );
  }
  if (!file) return fail(404, "This CV is no longer available.");
  try {
    const url = new URL(file.url);
    if (
      url.origin !== new URL(origin).origin ||
      !url.pathname.startsWith("/api/storage/")
    )
      return fail(502, "The CV could not be downloaded.");
    const upstream = await fetch(url, {
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(15000),
    });
    if (!upstream.ok || !upstream.body)
      return fail(502, "The CV could not be downloaded. Try again.");
    const extension =
      file.contentType === "application/pdf"
        ? "pdf"
        : file.contentType === "application/msword"
          ? "doc"
          : "docx";
    return new Response(upstream.body, {
      headers: {
        ...headers,
        "Content-Type": file.contentType,
        "Content-Disposition": `attachment; filename="candidate-cv.${extension}"`,
      },
    });
  } catch {
    return fail(502, "The CV could not be downloaded. Try again.");
  }
}
