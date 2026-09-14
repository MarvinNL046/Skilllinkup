import { auth } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";

export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "private, no-store" };
const fail = (status, error) => Response.json({ error }, { status, headers });
const types = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export async function POST(request) {
  const session = await auth();
  if (!session.userId) return fail(401, "Sign in to save your CV.");
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return fail(403, "Save your CV from the Skilllinkup page.");
  const serverSecret = process.env.INTERNAL_EMAIL_SECRET,
    origin = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!serverSecret || !origin)
    return fail(503, "CV uploads are temporarily unavailable.");
  const token = await session.getToken({ template: "convex" });
  if (!token) return fail(401, "Sign in again to save your CV.");
  // Bound the multipart body before parsing, below Vercel's request-size limit.
  const reader = request.body?.getReader();
  if (!reader) return fail(400, "Choose a CV file.");
  const chunks = [];
  let length = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > 3 * 1024 * 1024 + 65536) {
      await reader.cancel();
      return fail(413, "Your profile CV must be no larger than 3 MB.");
    }
    chunks.push(value);
  }
  let file, fields;
  try {
    const form = await new Response(new Blob(chunks), {
      headers: { "Content-Type": request.headers.get("content-type") || "" },
    }).formData();
    file = form.get("file");
    fields = JSON.parse(form.get("profile"));
    if (
      !(file instanceof File) ||
      file.size < 1 ||
      file.size > 3 * 1024 * 1024 ||
      !types.has(file.type)
    )
      return fail(400, "Choose a PDF, DOC or DOCX file up to 3 MB.");
  } catch {
    return fail(400, "The selected file could not be read. Choose it again.");
  }
  const convex = new ConvexHttpClient(origin);
  convex.setAuth(token);
  let uploadedStorageId;
  try {
    const url = await convex.mutation(
      api.marketplace.candidateProfiles.generateResumeUploadUrl,
      { serverSecret },
    );
    const upload = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
      redirect: "error",
      signal: AbortSignal.timeout(20000),
    });
    if (!upload.ok)
      return fail(
        502,
        "Your CV could not be uploaded. Your current CV is unchanged.",
      );
    const { storageId } = await upload.json();
    uploadedStorageId = storageId;
    const profile = await convex.mutation(
      api.marketplace.candidateProfiles.save,
      {
        displayName: fields.displayName,
        headline: fields.headline,
        location: fields.location,
        summary: fields.summary,
        skills: fields.skills,
        discoverable: fields.discoverable,
        shareResume: fields.shareResume,
        expectedUpdatedAt: fields.expectedUpdatedAt,
        resumeStorageId: storageId,
        resumeName: file.name,
        serverSecret,
      },
    );
    return Response.json({ profile }, { headers });
  } catch {
    if (uploadedStorageId) {
      try {
        await convex.mutation(
          api.marketplace.candidateProfiles.discardUnattachedResume,
          { storageId: uploadedStorageId, serverSecret },
        );
      } catch {
        /* Preserve the original save error; never remove an attached file. */
      }
    }
    return fail(
      409,
      "The save was not confirmed. Your entries are still here. Reload to check the saved version before retrying.",
    );
  }
}
