import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 300;

export async function GET(request: NextRequest) {
  // Verify Vercel cron secret
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/pipeline/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PIPELINE_SECRET}`,
      },
      body: JSON.stringify({ locale: "en" }),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (err: any) {
    console.error("Cron generate-blog error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
