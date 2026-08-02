"use client";

import { useEffect } from "react";
import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Footer14 from "@/components/footer/Footer14";
import AuthPageShell, { clerkAppearance } from "@/components/auth/AuthPageShell";

export default function LoginPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();
  useEffect(() => { if (isLoaded && isSignedIn) router.replace("/dashboard"); }, [isLoaded, isSignedIn, router]);
  if (!isLoaded || isSignedIn) return <div className="flex justify-center items-center min-h-screen" role="status" aria-label="Opening your account"><div className="spinner-border text-primary" /></div>;
  return <div><AuthPageShell mode="login" title="Welcome back." subtitle="Sign in to continue to your projects, messages and matches."><SignIn routing="path" path="/login" fallbackRedirectUrl="/dashboard" signUpUrl="/register" appearance={clerkAppearance} /></AuthPageShell><Footer14 /></div>;
}
