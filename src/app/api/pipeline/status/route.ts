import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

export async function GET(request: NextRequest) {
  // Auth check
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.PIPELINE_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) {
    return NextResponse.json({ error: "NEXT_PUBLIC_CONVEX_URL not configured" }, { status: 500 });
  }

  try {
    // Fetch EN and NL post counts from Convex in parallel
    const [enResponse, nlResponse] = await Promise.all([
      fetch(`${convexUrl}/api/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: "posts:list", args: { locale: "en", limit: 500 }, format: "json" }),
      }),
      fetch(`${convexUrl}/api/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: "posts:list", args: { locale: "nl", limit: 500 }, format: "json" }),
      }),
    ]);

    const enData = await enResponse.json();
    const nlData = await nlResponse.json();

    const enPosts: any[] = Array.isArray(enData) ? enData : (enData?.value ?? []);
    const nlPosts: any[] = Array.isArray(nlData) ? nlData : (nlData?.value ?? []);

    const enCount = enPosts.length;
    const nlCount = nlPosts.length;

    // Last 5 EN posts (most recently created first, if sorted)
    const recentPosts = enPosts.slice(0, 5).map((p: any) => ({
      slug: p.slug ?? null,
      title: p.title ?? null,
    }));

    // Read topic queue from filesystem
    let topicQueue: { pending: number; completed: number } = { pending: 0, completed: 0 };
    try {
      const queuePath = path.join(process.cwd(), "content", "topic-queue.json");
      const raw = fs.readFileSync(queuePath, "utf-8");
      const data = JSON.parse(raw);
      topicQueue = {
        pending: Array.isArray(data?.queue) ? data.queue.length : 0,
        completed: Array.isArray(data?.completed) ? data.completed.length : 0,
      };
    } catch {
      // File does not exist or is malformed — keep defaults
    }

    return NextResponse.json({
      status: "healthy",
      posts: {
        en: enCount,
        nl: nlCount,
        total: enCount + nlCount,
      },
      recentPosts,
      topicQueue,
    });
  } catch (err: any) {
    console.error("Pipeline status error:", err);
    return NextResponse.json({ error: err.message ?? "Internal server error" }, { status: 500 });
  }
}
