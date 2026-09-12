"use client";

import { Suspense, useEffect, useState } from "react";
import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import Footer14 from "@/components/footer/Footer14";
import AuthPageShell, { clerkAppearance } from "@/components/auth/AuthPageShell";
import { safeAuthRedirect } from "@/lib/authRedirect.mjs";

function OpeningAccount() {
  return <div className="flex justify-center items-center min-h-screen" role="status" aria-label="Opening your account"><div className="spinner-border text-primary" /></div>;
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [trustedOrigin, setTrustedOrigin] = useState(null);
  const redirectTo = safeAuthRedirect(searchParams.get("redirect_url"), trustedOrigin);
  const { isLoaded, isSignedIn } = useUser();
  // Match server/initial client output, then resolve Clerk's absolute return URL
  // before mounting SignIn or navigating an existing session.
  useEffect(() => {
    setTrustedOrigin(window.location.origin);
  }, []);
  useEffect(() => {
    if (trustedOrigin && isLoaded && isSignedIn) router.replace(redirectTo);
  }, [trustedOrigin, isLoaded, isSignedIn, redirectTo, router]);
  if (!trustedOrigin || !isLoaded || isSignedIn) return <OpeningAccount />;
  return <div><AuthPageShell mode="login" title="Welcome back." subtitle="Sign in to continue to your projects, messages and matches."><SignIn routing="path" path="/login" forceRedirectUrl={redirectTo} fallbackRedirectUrl={redirectTo} signUpUrl="/register" appearance={clerkAppearance} /></AuthPageShell><Footer14 /></div>;
}

export default function LoginPage() {
  return <Suspense fallback={<OpeningAccount />}><LoginContent /></Suspense>;
}
