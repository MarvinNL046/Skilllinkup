import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function isConfigured(value: string | undefined, prefix?: string) {
  const normalized = value?.trim();
  return Boolean(normalized && (!prefix || normalized.startsWith(prefix)));
}

export async function GET() {
  const environment = process.env.VERCEL_ENV ?? "development";
  const hosted = environment === "preview" || environment === "production";
  const siteUrl = isConfigured(process.env.NEXT_PUBLIC_SITE_URL, hosted ? "https://" : undefined);
  const convexSite = isConfigured(process.env.NEXT_PUBLIC_CONVEX_SITE_URL, "https://");
  const clerkIssuer = isConfigured(process.env.CLERK_JWT_ISSUER_DOMAIN, "https://");
  const serverSecrets = [
    process.env.INTERNAL_EMAIL_SECRET,
    process.env.CRON_SECRET,
    process.env.PIPELINE_SECRET,
  ].every((secret) => Boolean(secret?.trim() && secret.trim().length >= 32));
  const expectedClerkPrefix = environment === "production" ? "pk_live_" : "pk_test_";
  const expectedConvexPrefix = environment === "production" ? "prod:" : "dev:";
  const environmentContract = !hosted || (
    siteUrl
    && convexSite
    && clerkIssuer
    && serverSecrets
    && isConfigured(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, expectedClerkPrefix)
    && isConfigured(process.env.CONVEX_DEPLOYMENT, expectedConvexPrefix)
  );
  const checks = {
    convex: isConfigured(process.env.NEXT_PUBLIC_CONVEX_URL, "https://"),
    clerkPublishable: isConfigured(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, "pk_"),
    clerkSecret: isConfigured(process.env.CLERK_SECRET_KEY, "sk_"),
    environmentContract,
    paymentMode: "private_beta_disabled" as const,
    analyticsMode: "disabled" as const,
  };
  const healthy = checks.convex && checks.clerkPublishable && checks.clerkSecret && checks.environmentContract;

  return NextResponse.json(
    {
      status: healthy ? "ok" : "degraded",
      service: "skilllinkup-web",
      version: process.env.npm_package_version ?? "unknown",
      environment,
      checks,
      timestamp: new Date().toISOString(),
    },
    {
      status: healthy ? 200 : 503,
      headers: { "Cache-Control": "no-store, max-age=0" },
    }
  );
}
