"use client";

import { create } from "zustand";

export interface PortfolioItem {
  title: string;
  image: string;
  link: string;
}

interface OnboardingState {
  currentStep: number;
  // Freelancer - basics
  name: string;
  profilePhoto: string;
  tagline: string;
  bio: string;
  // Freelancer - expertise
  category: string;
  skills: string[];
  experienceLevel: string;
  hourlyRate: number;
  // Freelancer - work preferences
  workType: "remote" | "local" | "hybrid";
  countries: string[];
  city: string;
  languages: string[];
  // Freelancer - portfolio
  portfolioItems: PortfolioItem[];
  certificates: string[];
  // Freelancer - verification
  linkedinUrl: string;
  websiteUrl: string;
  // Client onboarding
  clientName: string;
  companyName: string;
  companyWebsite: string;
  projectType: string;
  projectDescription: string;
  budgetRange: string;
  timeline: string;
  requiredSkills: string[];
  clientCountry: string;
  clientCity: string;
  // Actions
  setStep: (step: number) => void;
  updateField: <K extends keyof OnboardingState>(
    field: K,
    value: OnboardingState[K]
  ) => void;
  addPortfolioItem: (item: PortfolioItem) => void;
  removePortfolioItem: (index: number) => void;
  reset: () => void;
}

const initialState: Omit<OnboardingState, "setStep" | "updateField" | "reset" | "addPortfolioItem" | "removePortfolioItem"> = {
  currentStep: 0,
  name: "",
  profilePhoto: "",
  tagline: "",
  bio: "",
  category: "",
  skills: [],
  experienceLevel: "",
  hourlyRate: 0,
  workType: "remote",
  countries: [],
  city: "",
  languages: [],
  portfolioItems: [],
  certificates: [],
  linkedinUrl: "",
  websiteUrl: "",
  clientName: "",
  companyName: "",
  companyWebsite: "",
  projectType: "",
  projectDescription: "",
  budgetRange: "",
  timeline: "",
  requiredSkills: [],
  clientCountry: "",
  clientCity: "",
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,
  setStep: (step) => set({ currentStep: step }),
  updateField: (field, value) => set({ [field]: value } as Partial<OnboardingState>),
  addPortfolioItem: (item) =>
    set((state) => ({ portfolioItems: [...state.portfolioItems, item] })),
  removePortfolioItem: (index) =>
    set((state) => ({
      portfolioItems: state.portfolioItems.filter((_, i) => i !== index),
    })),
  reset: () => set({ ...initialState }),
}));
