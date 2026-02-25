"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useUser } from "@clerk/nextjs";
import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import MultiStepForm from "@/components/forms/MultiStepForm";
import { useOnboardingStore } from "@/store/onboardingStore";
import FreelancerBasics from "@/components/onboarding/steps/FreelancerBasics";
import FreelancerExpertise from "@/components/onboarding/steps/FreelancerExpertise";
import FreelancerWorkPreference from "@/components/onboarding/steps/FreelancerWorkPreference";
import FreelancerPortfolio from "@/components/onboarding/steps/FreelancerPortfolio";
import FreelancerVerification from "@/components/onboarding/steps/FreelancerVerification";

const steps = [
  { title: "Basics", description: "Your public profile essentials." },
  { title: "Expertise", description: "Skills and experience level." },
  { title: "Work preferences", description: "Location and availability." },
  { title: "Portfolio", description: "Showcase your best work." },
  { title: "Verification", description: "Link your professional profiles." },
];

export default function FreelancerOnboarding() {
  const locale = useLocale();
  const router = useRouter();
  const convex = useConvex();
  const { user } = useUser();

  const currentStep = useOnboardingStore((state) => state.currentStep);
  const setStep = useOnboardingStore((state) => state.setStep);
  const reset = useOnboardingStore((state) => state.reset);

  const name = useOnboardingStore((state) => state.name);
  const profilePhoto = useOnboardingStore((state) => state.profilePhoto);
  const tagline = useOnboardingStore((state) => state.tagline);
  const bio = useOnboardingStore((state) => state.bio);
  const category = useOnboardingStore((state) => state.category);
  const skills = useOnboardingStore((state) => state.skills);
  const experienceLevel = useOnboardingStore((state) => state.experienceLevel);
  const hourlyRate = useOnboardingStore((state) => state.hourlyRate);
  const workType = useOnboardingStore((state) => state.workType);
  const countries = useOnboardingStore((state) => state.countries);
  const city = useOnboardingStore((state) => state.city);
  const languages = useOnboardingStore((state) => state.languages);
  const portfolioItems = useOnboardingStore((state) => state.portfolioItems);
  const websiteUrl = useOnboardingStore((state) => state.websiteUrl);
  const linkedinUrl = useOnboardingStore((state) => state.linkedinUrl);

  const convexUser = useQuery(api.users.getCurrentUser);
  const setUserType = useMutation(api.users.setUserType);
  const updateProfile = useMutation(api.marketplace.freelancers.updateProfile);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  useEffect(() => {
    setStep(0);
  }, [setStep]);

  const validateStep = (step: number) => {
    if (step === 0) {
      return name.trim() && tagline.trim() && bio.trim();
    }
    if (step === 1) {
      return category && skills.length > 0 && experienceLevel && hourlyRate > 0;
    }
    if (step === 2) {
      return workType && city.trim() && languages.length > 0;
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
    if (!convexUser) {
      setError("We couldn't load your account. Please try again.");
      return;
    }

    setSubmitting(true);
    try {
      await setUserType({ userType: "freelancer" });

      const profile = await convex.query(api.marketplace.freelancers.getByUserId, {
        userId: convexUser._id,
      });

      if (profile) {
        await updateProfile({
          profileId: profile._id,
          displayName: name,
          tagline,
          bio,
          avatarUrl: profilePhoto || undefined,
          hourlyRate: hourlyRate || undefined,
          workType,
          locationCity: city,
          locationCountry: countries[0],
          languages,
          skills,
          portfolioUrls: portfolioItems.map((item) => item.link || item.image),
          websiteUrl: websiteUrl || undefined,
          linkedinUrl: linkedinUrl || undefined,
          isAvailable: true,
          locale,
        });
      }

      await user.update({
        publicMetadata: {
          ...(user.publicMetadata || {}),
          userType: "freelancer",
          onboardingCompleted: true,
        },
      });

      reset();
      router.push(`/${locale}/dashboard`);
    } catch (err) {
      console.error("[FreelancerOnboarding] submit failed:", err);
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
        {currentStep === 0 && <FreelancerBasics />}
        {currentStep === 1 && <FreelancerExpertise />}
        {currentStep === 2 && <FreelancerWorkPreference />}
        {currentStep === 3 && <FreelancerPortfolio />}
        {currentStep === 4 && <FreelancerVerification />}
      </MultiStepForm>
    </div>
  );
}
