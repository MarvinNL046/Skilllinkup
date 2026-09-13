export async function uploadWorkspaceFile(file, getUploadUrl) {
  if (file.size > 25 * 1024 * 1024) throw new Error("Files must be smaller than 25 MB.");
  let body;
  try {
    // Android file providers can return a selection that is no longer readable.
    // Read it before requesting an upload URL so this has its own recovery message.
    body = await file.arrayBuffer();
  } catch {
    throw new Error("This file could not be read. Save it to Downloads on your device, then select it again.");
  }
  const uploadUrl = await getUploadUrl();
  let response;
  try {
    response = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type || "application/octet-stream" },
      body,
    });
  } catch {
    throw new Error("The upload connection failed. Check your connection and try again. Your file selection and note are still here.");
  }
  if (!response.ok) throw new Error("The file could not be uploaded. Please try again.");
  const result = await response.json();
  if (!result.storageId) throw new Error("The upload was not confirmed. Please try again.");
  return result.storageId;
}
