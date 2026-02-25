"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import MultiStepForm from "@/components/forms/MultiStepForm";
import { useOnboardingStore } from "@/store/onboardingStore";
import ClientBasics from "@/components/onboarding/steps/ClientBasics";
import ClientNeeds from "@/components/onboarding/steps/ClientNeeds";
import ClientLocation from "@/components/onboarding/steps/ClientLocation";

const steps = [
  { title: "Basics", description: "Tell us about you." },
  { title: "Project needs", description: "What are you looking to build?" },
  { title: "Location", description: "Where is your team based?" },
];

export default function ClientOnboarding() {
  const locale = useLocale();
  const router = useRouter();
  const { user } = useUser();

  const currentStep = useOnboardingStore((state) => state.currentStep);
  const setStep = useOnboardingStore((state) => state.setStep);
  const reset = useOnboardingStore((state) => state.reset);

  const clientName = useOnboardingStore((state) => state.clientName);
  const companyName = useOnboardingStore((state) => state.companyName);
  const projectType = useOnboardingStore((state) => state.projectType);
  const budgetRange = useOnboardingStore((state) => state.budgetRange);
  const projectDescription = useOnboardingStore((state) => state.projectDescription);
  const clientCountry = useOnboardingStore((state) => state.clientCountry);

  const setUserType = useMutation(api.users.setUserType);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  useEffect(() => {
    setStep(0);
  }, [setStep]);

  const validateStep = (step: number) => {
    if (step === 0) {
      return clientName.trim() && companyName.trim();
    }
    if (step === 1) {
      return projectType && budgetRange && projectDescription.trim();
    }
    if (step === 2) {
      return clientCountry.trim();
    }
    return true;
  };

  const handleNext = () => {
    setError(null);
    if (!validateStep(currentStep)) {
      setError("Please complete the required fields before continuing.");
      return;
    }
    setStep(currentStep + 1);
  };

  const handleBack = () => {
    setError(null);
    setStep(Math.max(currentStep - 1, 0));
  };

  const handleSubmit = async () => {
    setError(null);
    if (!validateStep(currentStep)) {
      setError("Please complete the required fields before submitting.");
      return;
    }

    if (!user) {
      setError("You need to be signed in to complete onboarding.");
      return;
    }

    setSubmitting(true);
    try {
      await setUserType({ userType: "client" });
      await user.update({
        publicMetadata: {
          ...(user.publicMetadata || {}),
          userType: "client",
          onboardingCompleted: true,
        },
      });

      reset();
      router.push(`/${locale}/dashboard`);
    } catch (err) {
      console.error("[ClientOnboarding] submit failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="alert alert-danger mb20" role="alert">
          {error}
        </div>
      )}
      <MultiStepForm
        steps={steps}
        currentStep={currentStep}
        onNext={handleNext}
        onBack={handleBack}
        onSubmit={handleSubmit}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        isNextDisabled={submitting}
        isSubmitDisabled={submitting}
      >
        {currentStep === 0 && <ClientBasics />}
        {currentStep === 1 && <ClientNeeds />}
        {currentStep === 2 && <ClientLocation />}
      </MultiStepForm>
    </div>
  );
}
