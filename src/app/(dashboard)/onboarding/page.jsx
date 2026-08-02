import { Suspense } from "react";
import OnboardingExperience from "@/components/onboarding/OnboardingExperience";

export const metadata = {
  title: "Set up your account | Skilllinkup",
  robots: { index: false, follow: false },
};

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#fffaf7" }} />}>
      <OnboardingExperience />
    </Suspense>
  );
}
