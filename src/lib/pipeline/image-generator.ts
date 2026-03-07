import { PostCategory } from "./types";

export const CATEGORY_STYLES: Record<PostCategory, string> = {
  "platform-reviews":
    "Professional workspace with laptop showing modern UI dashboard, blue and white tones, clean minimalist design",
  "freelancing-tips":
    "Creative freelancer workspace in a coffee shop, warm lighting, notebook and laptop, inspiring atmosphere",
  "hiring-guide":
    "Professional team meeting in modern office, talent acquisition theme, corporate blue tones",
  "industry-trends":
    "Futuristic digital landscape with data visualization, tech-forward design, purple and blue gradients",
  "tool-reviews":
    "Modern desktop setup with multiple productivity tools and apps, organized workspace, bright lighting",
  "career-development":
    "Professional climbing stairs or path metaphor, growth and progress theme, sunrise colors",
  "pricing-guides":
    "Calculator, financial charts, and money management tools on a clean desk, green and gold accents",
  "remote-work":
    "Beautiful home office or co-working space, natural light, plants, comfortable and productive atmosphere",
};

function buildPrompt(title: string, category: PostCategory): string {
  const categoryStyle = CATEGORY_STYLES[category];
  return `Professional blog featured image for an article titled '${title}'. Style: ${categoryStyle}. Photorealistic, no text, no watermarks, no logos, professional quality suitable for a business blog. Modern and trustworthy feel.`;
}

/** Tier 1: Gemini image generation */
async function geminiGenerate(
  prompt: string,
  signal: AbortSignal
): Promise<Buffer | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const model = "gemini-2.0-flash-exp";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    }),
    signal,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.warn(
      `[image-generator] Gemini API error ${response.status}: ${errorText}`
    );
    return null;
  }

  const data = await response.json();
  const parts: Array<{
    text?: string;
    inlineData?: { mimeType: string; data: string };
  }> = data?.candidates?.[0]?.content?.parts ?? [];

  const imagePart = parts.find((part) => part.inlineData);
  if (!imagePart?.inlineData) {
    console.warn("[image-generator] No inline image data in Gemini response");
    return null;
  }

  return Buffer.from(imagePart.inlineData.data, "base64");
}

/** Tier 2 (fallback): xAI Grok Imagine */
async function xaiGenerate(
  prompt: string,
  signal: AbortSignal
): Promise<Buffer | null> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return null;

  const response = await fetch("https://api.x.ai/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "grok-imagine-image",
      prompt,
      aspect_ratio: "16:9",
      resolution: "1k",
      n: 1,
      response_format: "b64_json",
    }),
    signal,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.warn(
      `[image-generator] xAI API error ${response.status}: ${errorText}`
    );
    return null;
  }

  const data = await response.json();
  const b64 = data?.data?.[0]?.b64_json;
  if (!b64) {
    console.warn("[image-generator] No base64 image data in xAI response");
    return null;
  }

  return Buffer.from(b64, "base64");
}

/**
 * Convert a PNG/JPEG buffer to WebP for smaller file sizes.
 * Falls back to the original buffer if sharp is unavailable.
 */
async function toWebP(buffer: Buffer): Promise<{ data: Buffer; format: "webp" | "png" }> {
  try {
    const sharp = (await import("sharp")).default;
    const webpBuffer = await sharp(buffer).webp({ quality: 82 }).toBuffer();
    console.log(`[image-generator] Converted to WebP: ${buffer.length} -> ${webpBuffer.length} bytes`);
    return { data: webpBuffer, format: "webp" };
  } catch {
    console.warn("[image-generator] sharp not available — keeping PNG format");
    return { data: buffer, format: "png" };
  }
}

/**
 * Generate a featured image for a blog post.
 * Tries Gemini first, falls back to xAI Grok Imagine.
 * Converts to WebP if sharp is available.
 */
export async function generateFeaturedImage(
  title: string,
  category: PostCategory
): Promise<{ buffer: Buffer; format: "webp" | "png" } | null> {
  const prompt = buildPrompt(title, category);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60_000);

  try {
    // Tier 1: Gemini
    console.log("[image-generator] Trying Gemini...");
    const geminiResult = await geminiGenerate(prompt, controller.signal);
    if (geminiResult) {
      console.log("[image-generator] Gemini succeeded");
      const converted = await toWebP(geminiResult);
      return { buffer: converted.data, format: converted.format };
    }

    // Tier 2: xAI fallback
    console.log("[image-generator] Gemini failed, trying xAI...");
    const xaiResult = await xaiGenerate(prompt, controller.signal);
    if (xaiResult) {
      console.log("[image-generator] xAI succeeded");
      const converted = await toWebP(xaiResult);
      return { buffer: converted.data, format: converted.format };
    }

    console.warn("[image-generator] All image providers failed");
    return null;
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      console.error("[image-generator] Request timed out after 60s");
    } else {
      console.error("[image-generator] Unexpected error:", err);
    }
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}
