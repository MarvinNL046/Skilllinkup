"use client";

import { Suspense, useEffect } from "react";
import { SignUp, useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import Footer14 from "@/components/footer/Footer14";
import AuthPageShell, { clerkAppearance, RoleChoice } from "@/components/auth/AuthPageShell";

function RegisterContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "client";
  return <><RoleChoice role={role} /><SignUp routing="path" path="/register" fallbackRedirectUrl={`/onboarding?role=${role}`} signInUrl="/login" appearance={clerkAppearance} /></>;
}

export default function RegisterPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();
  useEffect(() => { if (isLoaded && isSignedIn) router.replace("/dashboard"); }, [isLoaded, isSignedIn, router]);
  if (!isLoaded || isSignedIn) return <div className="flex justify-center items-center min-h-screen" role="status" aria-label="Opening your account"><div className="spinner-border text-primary" /></div>;
  return <div><AuthPageShell mode="register" title="Create your free account." subtitle="Join professionals and clients building great work worldwide."><Suspense fallback={<div role="status">Loading registration…</div>}><RegisterContent /></Suspense></AuthPageShell><Footer14 /></div>;
}
