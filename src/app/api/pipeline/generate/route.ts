import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

import type { PostCategory, TopicQueue, PipelineResult } from "@/lib/pipeline/types";
import { scrapeTopicContext } from "@/lib/pipeline/scraper";
import { selectTopic, generatePost } from "@/lib/pipeline/content-generator";
import { factCheck } from "@/lib/pipeline/fact-checker";
import { generateFeaturedImage } from "@/lib/pipeline/image-generator";
import { commitImageToGitHub } from "@/lib/pipeline/github-commit";

export const maxDuration = 300;

const TOPIC_QUEUE_PATH = path.join(process.cwd(), "content", "topic-queue.json");

interface RequestBody {
  topic?: string;
  category?: PostCategory;
  locale?: "en" | "nl";
  dryRun?: boolean;
  force?: boolean;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Auth check
  const pipelineSecret = process.env.PIPELINE_SECRET;
  const authHeader = request.headers.get("Authorization");
  const expectedAuth = `Bearer ${pipelineSecret}`;

  if (!pipelineSecret || authHeader !== expectedAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: RequestBody = await request.json();
    const locale = body.locale ?? "en";
    const dryRun = body.dryRun ?? false;

    // Step a: Load topic queue from filesystem
    let topicQueue: TopicQueue | null = null;
    try {
      const raw = fs.readFileSync(TOPIC_QUEUE_PATH, "utf-8");
      topicQueue = JSON.parse(raw) as TopicQueue;
    } catch {
      // Topic queue file missing or invalid — fall back to TOPIC_BANK
      topicQueue = null;
    }

    // Step b: Get existing post slugs from Convex via HTTP API
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
      return NextResponse.json(
        { error: "NEXT_PUBLIC_CONVEX_URL environment variable is not set" },
        { status: 500 }
      );
    }

    const internalSecret = process.env.INTERNAL_EMAIL_SECRET;
    if (!internalSecret) {
      return NextResponse.json(
        { error: "INTERNAL_EMAIL_SECRET environment variable is not set" },
        { status: 500 }
      );
    }

    let existingSlugs: string[] = [];
    try {
      const convexRes = await fetch(`${convexUrl}/api/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: "posts:list",
          args: { locale, limit: 500 },
          format: "json",
        }),
      });

      if (convexRes.ok) {
        const convexData = await convexRes.json();
        // Extract slugs from the results array
        const results: Array<{ slug?: string }> = convexData?.value ?? convexData?.result ?? convexData ?? [];
        if (Array.isArray(results)) {
          existingSlugs = results
            .map((r) => r?.slug)
            .filter((s): s is string => typeof s === "string" && s.length > 0);
        }
      } else {
        console.warn(
          `[pipeline/generate] Convex query returned ${convexRes.status} — proceeding with empty slug list`
        );
      }
    } catch (err) {
      console.warn("[pipeline/generate] Failed to fetch existing slugs from Convex:", err);
    }

    // Step c: Select topic
    let topic: string;
    let category: PostCategory;
    let sources: string[] = [];

    if (body.topic && body.category) {
      topic = body.topic;
      category = body.category;
    } else {
      const selected = selectTopic(existingSlugs, topicQueue);

      if (!selected) {
        console.log("[pipeline/generate] No unpublished topics remaining");
        return NextResponse.json({
          success: true,
          message: "No unpublished topics remaining in queue or TOPIC_BANK",
        });
      }

      topic = selected.topic;
      category = selected.category;
      sources = selected.sources ?? [];
    }

    console.log(`[pipeline/generate] Selected topic: "${topic}" (${category}, ${locale})`);

    // Step d: Scrape context
    const scrapedContext = await scrapeTopicContext(topic, sources);
    console.log(
      `[pipeline/generate] Scraped context: ${scrapedContext.length} chars`
    );

    // Step e: Generate post
    const post = await generatePost(topic, category, scrapedContext, existingSlugs, locale);
    console.log(`[pipeline/generate] Generated post: "${post.title}" (slug: ${post.slug})`);

    // Step f: Fact check
    const factCheckResult = factCheck(post.content, scrapedContext);
    console.log(
      `[pipeline/generate] Fact check: ${factCheckResult.verifiedClaims}/${factCheckResult.totalClaims} verified, risk: ${factCheckResult.riskLevel}`
    );

    if (factCheckResult.riskLevel === "high") {
      console.warn(
        `[pipeline/generate] HIGH RISK fact check — ${factCheckResult.unverifiedClaims.length} unverified claims. Publishing anyway but flagging.`
      );
    }

    // Step g: Persist (only when not a dry run)
    let imageUrl: string | null = null;

    if (!dryRun) {
      // Generate featured image
      const imageResult = await generateFeaturedImage(post.title, category);

      if (imageResult) {
        imageUrl = await commitImageToGitHub(post.slug, imageResult.buffer, imageResult.format);
        console.log(
          `[pipeline/generate] Image committed to GitHub (${imageResult.format}): ${imageUrl ?? "failed"}`
        );
      } else {
        console.warn("[pipeline/generate] Image generation returned null — skipping GitHub commit");
      }

      // Upsert post to Convex
      const upsertPayload: Record<string, unknown> = {
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        tags: post.tags,
        categorySlug: post.categorySlug,
        readTime: post.readTime,
        authorName: post.authorName,
        locale: post.locale,
        status: "published",
        serverSecret: internalSecret,
      };
      if (imageUrl) {
        upsertPayload.featureImg = imageUrl;
      }

      const upsertRes = await fetch(`${convexUrl}/api/mutation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: "posts:upsertBySlug",
          format: "json",
          args: [upsertPayload],
        }),
      });

      if (!upsertRes.ok) {
        const errText = await upsertRes.text();
        console.error(
          `[pipeline/generate] Convex upsert failed (${upsertRes.status}): ${errText}`
        );
      } else {
        console.log(`[pipeline/generate] Post upserted to Convex: ${post.slug}`);
      }
    }

    // Step h: Return result
    const result: PipelineResult = {
      slug: post.slug,
      title: post.title,
      riskLevel: factCheckResult.riskLevel,
      locale: post.locale,
      imageUrl,
      dryRun,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[pipeline/generate] Pipeline error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
