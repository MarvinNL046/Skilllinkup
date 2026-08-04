"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Layers3 } from "lucide-react";
import useConvexUser from "@/hook/useConvexUser";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const labels = {
  client: "Customer",
  freelancer: "Online freelancer",
  local_professional: "Local professional",
  candidate: "Job seeker",
  company: "Company hiring",
};

export default function AccountModeGuard({ role, world, children }) {
  const { convexUser, isLoaded } = useConvexUser();

  if (!isLoaded || convexUser === undefined) {
    return (
      <Card><CardContent className="p-8 text-base text-[var(--text-secondary)]">Checking your account mode...</CardContent></Card>
    );
  }

  const roles = convexUser?.accountRoles || [];
  const hasRole = roles.includes(role);
  const isActive =
    convexUser?.activeRole === role && convexUser?.preferredWorld === world;
  if (hasRole && isActive) return children;

  return (
    <Card className="overflow-hidden border-[var(--border-subtle)]">
      <CardContent className="grid gap-6 p-7 md:grid-cols-[auto_1fr_auto] md:items-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--surface-soft)] text-[var(--navy-900)]">
          <Layers3 size={27} />
        </span>
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[.14em] text-emerald-700">
            Separate account mode
          </p>
          <h1 className="mb-2 text-2xl font-semibold text-[var(--navy-900)]">
            Continue as {labels[role]}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
            {hasRole
              ? "This tool belongs to another mode on your account. Switch from the dashboard menu first."
              : "Complete the short onboarding for this mode before its tools and permissions become available."}
          </p>
          <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <CheckCircle2 size={16} /> Your existing account and history stay unchanged
          </p>
        </div>
        <Button asChild>
          <Link href={hasRole ? "/dashboard" : `/onboarding?role=${role}`}>
            {hasRole ? "Open dashboard" : "Add this mode"}<ArrowRight size={16} />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
