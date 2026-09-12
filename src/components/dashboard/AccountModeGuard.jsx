"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { onboardingUrl } from "@/lib/onboardingRedirect.mjs";
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
  const router = useRouter();
  const switchContext = useMutation(api.users.switchAccountContext);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inFlight = useRef(false);

  if (!isLoaded || convexUser === undefined) {
    return (
      <Card><CardContent className="p-8 text-base text-[var(--text-secondary)]">Checking your account mode...</CardContent></Card>
    );
  }

  const roles = convexUser?.accountRoles || [];
  const hasRole = roles.includes(role);
  const isActive =
    convexUser?.activeRole === role && convexUser?.preferredWorld === world;
  const complete = hasRole && convexUser.onboardingContexts?.some((context) => context.role === role && context.world === world && context.version > 0);
  if (isActive && complete) return children;

  async function continueInMode() {
    if (inFlight.current) return;
    const destination = window.location.pathname + window.location.search + window.location.hash;
    if (!convexUser) {
      router.push(`/login?${new URLSearchParams({ redirect_url: destination })}`);
      return;
    }
    if (!complete) {
      router.push(onboardingUrl(destination, { role, world }));
      return;
    }
    inFlight.current = true;
    setBusy(true);
    setError("");
    try {
      await switchContext({ activeRole: role, preferredWorld: world });
      // The reactive account query reveals this same page after switching.
    } catch {
      setError("We could not switch your account mode. Please try again.");
    } finally {
      inFlight.current = false;
      setBusy(false);
    }
  }

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
            Continue as {labels[role]} · {world === "jobs" ? "Jobs" : world === "local" ? "Local" : "Online"}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
            {complete
              ? "Switch to this account mode to continue here."
              : "Complete the short setup for this mode. You will return to this page when it is ready."}
          </p>
          <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <CheckCircle2 size={16} /> Your existing account and history stay unchanged
          </p>
        </div>
        <div>
          <Button type="button" onClick={continueInMode} disabled={busy}>
            {busy ? "Switching…" : !convexUser ? "Sign in to continue" : complete ? "Switch and continue" : "Complete setup"}<ArrowRight size={16} />
          </Button>
          {error && <p role="alert" className="mt-3 text-sm">{error}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
