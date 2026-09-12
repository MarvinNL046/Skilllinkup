const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_PIXELS = 16_000_000;
const MAX_EDGE = 8192;

function supportedImage(bytes) {
  const png = [137, 80, 78, 71, 13, 10, 26, 10].every(
    (byte, index) => bytes[index] === byte,
  );
  const jpeg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  const webp =
    String.fromCharCode(...bytes.subarray(0, 4)) === "RIFF" &&
    String.fromCharCode(...bytes.subarray(8, 12)) === "WEBP";
  return png || jpeg || webp;
}

// The file never leaves the browser. Re-encoding strips metadata and gives the
// preview and PDF the same bounded PNG, including any transparent background.
export async function prepareInvoiceLogo(file) {
  if (!file.size || file.size > MAX_FILE_BYTES)
    throw new Error("Choose a logo smaller than 5 MB.");
  const header = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  if (!supportedImage(header))
    throw new Error("Choose a PNG, JPG or WebP image for your logo.");
  let bitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error(
      "This image could not be opened. Try another PNG, JPG or WebP file.",
    );
  }
  try {
    const { width, height } = bitmap;
    if (
      !width ||
      !height ||
      width > MAX_EDGE ||
      height > MAX_EDGE ||
      width * height > MAX_PIXELS
    ) {
      throw new Error(
        "This image is too large. Use a logo up to 16 megapixels and 8,192 pixels per side.",
      );
    }
    const scale = Math.min(1, 1200 / width, 550 / height);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(width * scale));
    canvas.height = Math.max(1, Math.round(height * scale));
    const context = canvas.getContext("2d");
    if (!context)
      throw new Error("Your logo could not be prepared. Please try again.");
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");
    if (!dataUrl.startsWith("data:image/png;base64,"))
      throw new Error("Your logo could not be prepared. Please try again.");
    return {
      dataUrl,
      width: canvas.width,
      height: canvas.height,
      name: file.name,
    };
  } finally {
    bitmap.close();
  }
}
