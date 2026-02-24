// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
 const secret = req.nextUrl.searchParams.get("secret");
 if (secret !== process.env.REVALIDATE_SECRET) {
 return NextResponse.json({ ok: false, error: "Invalid secret" }, { status: 401 });
 }

 try {
 const { paths = [] } = await req.json().catch(() =>({ paths: [] as string[] }));

 // 1) Ongeldig cache-tag → herlaadt data voor sitemap en relevante pagina's
 revalidateTag("sitemap");

 // 2) Optioneel: belangrijke paden direct verversen
 revalidatePath("/");
 revalidatePath("/blog");
 revalidatePath("/platforms");
 for (const p of paths) revalidatePath(p);

 // 3) Zoekmachines pingen (alleen in productie)
 const site = process.env.NEXT_PUBLIC_SITE_URL;
 if (site?.startsWith("http://") || site?.startsWith("https://")) {
 // Alleen pingen als het een echte URL is (niet localhost in productie)
 if (!site.includes("localhost")) {
 const sm = `${site}/sitemap.xml`;
 fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sm)}`).catch(() =>{});
 fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sm)}`).catch(() =>{});
 }
 }

 return NextResponse.json({ ok: true, revalidated: { tag: "sitemap", paths } });
 } catch (e: any) {
 return NextResponse.json({ ok: false, error: e?.message ?? "Unknown error" }, { status: 500 });
 }
}
