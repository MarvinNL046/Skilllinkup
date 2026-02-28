"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import Image from "next/image";

const WORLDS = [
  {
    id: "online",
    icon: "flaticon-web",
    title: "Online",
    desc: "Digital services — design, development, marketing",
  },
  {
    id: "local",
    icon: "flaticon-place",
    title: "Local",
    desc: "Local services — find or offer services in your area",
  },
  {
    id: "jobs",
    icon: "flaticon-briefcase",
    title: "Jobs",
    desc: "Job market — browse or post opportunities",
  },
];

function OnboardingContent() {
  const router = useRouter();
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const setUserType = useMutation(api.users.setUserType);

  // Check if user arrived with ?role=freelancer (switching roles)
  const [searchParams] = useState(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search);
    }
    return new URLSearchParams();
  });
  const switchRole = searchParams.get("role");

  const [step, setStep] = useState(switchRole ? 2 : 1);
  const [role, setRole] = useState(switchRole || null);
  const [saving, setSaving] = useState(false);

  // If user already completed onboarding, redirect — unless they're switching roles
  useEffect(() => {
    if (switchRole) return; // Skip redirect when explicitly switching
    if (convexUser?.userType && convexUser?.preferredWorld) {
      router.replace(`/${convexUser.preferredWorld}`);
    }
    // Existing user with userType but no preferredWorld → show step 2 only
    if (convexUser?.userType && !convexUser?.preferredWorld) {
      setRole(convexUser.userType);
      setStep(2);
    }
  }, [convexUser, router, switchRole]);

  // Redirect unauthenticated users
  useEffect(() => {
    if (isLoaded && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoaded, isAuthenticated, router]);

  function handleRoleSelect(type) {
    setRole(type);
    setStep(2);
  }

  async function handleWorldSelect(world) {
    setSaving(true);
    try {
      await setUserType({
        email: convexUser.email,
        userType: role,
        preferredWorld: world,
      });
      router.push(`/${world}`);
    } catch (err) {
      console.error("Failed to save onboarding:", err);
      setSaving(false);
    }
  }

  if (!isLoaded || !convexUser) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bgc-thm4 min-vh-100 d-flex flex-column">
      {/* Minimal header with logo */}
      <header className="py-4 text-center">
        <Image
          src="/images/logo/skilllinkup-transparant-rozepunt.webp"
          alt="SkillLinkup"
          width={200}
          height={50}
          style={{ objectFit: "contain" }}
          priority
        />
      </header>

      {/* Main content */}
      <main className="flex-grow-1 d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xl-7">
              {/* Progress dots */}
              <div className="d-flex justify-content-center gap-2 mb-4">
                {[1, 2].map((s) => (
                  <div
                    key={s}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: step >= s ? "#ef2b70" : "#d1d5db",
                      transition: "background 0.2s ease",
                    }}
                  />
                ))}
              </div>

              {step === 1 && (
                <>
                  <div className="text-center mb-5">
                    <h2 className="title mb-2">Welcome to SkillLinkup!</h2>
                    <p className="text fz17">
                      What would you like to do? You can always change this later.
                    </p>
                  </div>

                  <div className="row g-4 justify-content-center">
                    {/* Client card */}
                    <div className="col-sm-6">
                      <button
                        onClick={() => handleRoleSelect("client")}
                        className="w-100 border-0 p-0 bg-transparent"
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          className="p-4 bdrs12 text-center border border-1 bg-white shadow-sm"
                          style={{
                            minHeight: 260,
                            transition: "all 0.2s ease",
                          }}
                        >
                          <div
                            className="d-flex align-items-center justify-content-center mx-auto mb-4 rounded-circle"
                            style={{
                              width: 80,
                              height: 80,
                              background: "#f0f0f0",
                              transition: "all 0.2s ease",
                            }}
                          >
                            <i
                              className="flaticon-search-1 fz30"
                              style={{ color: "#555" }}
                            />
                          </div>
                          <h4 className="title mb-2">I&apos;m looking for talent</h4>
                          <p className="text fz14 mb-0">
                            Post projects, hire talent, and manage your team.
                          </p>
                        </div>
                      </button>
                    </div>

                    {/* Freelancer card */}
                    <div className="col-sm-6">
                      <button
                        onClick={() => handleRoleSelect("freelancer")}
                        className="w-100 border-0 p-0 bg-transparent"
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          className="p-4 bdrs12 text-center border border-1 bg-white shadow-sm"
                          style={{
                            minHeight: 260,
                            transition: "all 0.2s ease",
                          }}
                        >
                          <div
                            className="d-flex align-items-center justify-content-center mx-auto mb-4 rounded-circle"
                            style={{
                              width: 80,
                              height: 80,
                              background: "#f0f0f0",
                              transition: "all 0.2s ease",
                            }}
                          >
                            <i
                              className="flaticon-presentation fz30"
                              style={{ color: "#555" }}
                            />
                          </div>
                          <h4 className="title mb-2">I offer services</h4>
                          <p className="text fz14 mb-0">
                            Create gigs, find clients, and grow your freelance business.
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="text-center mb-5">
                    <h2 className="title mb-2">Choose your world</h2>
                    <p className="text fz17">
                      Where would you like to start? You can explore all worlds anytime.
                    </p>
                  </div>

                  <div className="row g-4 justify-content-center">
                    {WORLDS.map((w) => (
                      <div className="col-sm-4" key={w.id}>
                        <button
                          onClick={() => handleWorldSelect(w.id)}
                          disabled={saving}
                          className="w-100 border-0 p-0 bg-transparent"
                          style={{ cursor: saving ? "wait" : "pointer" }}
                        >
                          <div
                            className="p-4 bdrs12 text-center border border-1 bg-white shadow-sm"
                            style={{
                              minHeight: 220,
                              transition: "all 0.2s ease",
                            }}
                          >
                            <div
                              className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle"
                              style={{
                                width: 70,
                                height: 70,
                                background: "#f0f0f0",
                                transition: "all 0.2s ease",
                              }}
                            >
                              <i
                                className={`${w.icon} fz28`}
                                style={{ color: "#555" }}
                              />
                            </div>
                            <h5 className="title mb-2">{w.title}</h5>
                            <p className="text fz13 mb-0">{w.desc}</p>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Back button */}
                  {!convexUser?.userType && (
                    <div className="text-center mt-4">
                      <button
                        onClick={() => setStep(1)}
                        className="btn btn-link text-decoration-none"
                        disabled={saving}
                      >
                        <i className="fas fa-arrow-left me-1" /> Back
                      </button>
                    </div>
                  )}

                  {saving && (
                    <div className="text-center mt-4">
                      <div className="spinner-border spinner-border-sm text-primary me-2" role="status" />
                      <span className="text fz14">Setting up your account...</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}
