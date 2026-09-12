"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { safeAuthRedirect } from "@/lib/authRedirect.mjs";

function ContextualSignInLink(props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const returnTo = !pathname || pathname === "/"
    ? "/dashboard"
    : safeAuthRedirect(pathname + (query ? `?${query}` : ""));
  return <Link {...props} href={`/login?redirect_url=${encodeURIComponent(returnTo)}`} />;
}

export default function PublicSignInLink({ className = "skl-action-secondary", onClick }) {
  const t = useTranslations("nav");
  const props = { className, onClick, children: t("signIn") };
  return (
    <Suspense fallback={<Link {...props} href="/login" />}>
      <ContextualSignInLink {...props} />
    </Suspense>
  );
}
