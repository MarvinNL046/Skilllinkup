import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function isConfigured(value: string | undefined, prefix?: string) {
  const normalized = value?.trim();
  return Boolean(normalized && (!prefix || normalized.startsWith(prefix)));
}

function normalizedReleaseSha(value: string | undefined) {
  const normalized = value?.trim().toLowerCase();
  return normalized && /^[a-f0-9]{40}$/.test(normalized) ? normalized : null;
}

function normalizedDeployment(value: string | undefined) {
  const normalized = value?.trim().toLowerCase();
  return normalized && /^[a-z0-9-]+\.vercel\.app$/.test(normalized)
    ? normalized
    : null;
}

export async function GET() {
  const environment = process.env.VERCEL_ENV ?? "development";
  const hosted = environment === "preview" || environment === "production";
  const version = process.env.SKILLLINKUP_APP_VERSION?.trim() || "unknown";
  const commit = normalizedReleaseSha(
    process.env.SKILLLINKUP_RELEASE_SHA ?? process.env.VERCEL_GIT_COMMIT_SHA,
  );
  const deployment = normalizedDeployment(
    process.env.SKILLLINKUP_DEPLOYMENT_URL ?? process.env.VERCEL_URL,
  );
  const releaseTraceable = !hosted || Boolean(commit && deployment && version !== "unknown");
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
    releaseTraceable,
    paymentMode: "private_beta_disabled" as const,
    analyticsMode: "disabled" as const,
  };
  const healthy = checks.convex
    && checks.clerkPublishable
    && checks.clerkSecret
    && checks.environmentContract
    && checks.releaseTraceable;
  const releaseHeader = commit?.slice(0, 12) ?? `${version}-local`;

  return NextResponse.json(
    {
      status: healthy ? "ok" : "degraded",
      service: "skilllinkup-web",
      version,
      release: {
        commit,
        deployment,
      },
      environment,
      checks,
      timestamp: new Date().toISOString(),
    },
    {
      status: healthy ? 200 : 503,
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "X-Skilllinkup-Release": releaseHeader,
      },
    }
  );
}
