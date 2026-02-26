"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import Image from "next/image";

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const setUserType = useMutation(api.users.setUserType);
  const [selected, setSelected] = useState(roleParam || null);
  const [saving, setSaving] = useState(false);

  // If user already has a userType that was explicitly set, skip onboarding
  useEffect(() => {
    if (convexUser?.userType === "freelancer" || convexUser?.userType === "client") {
      router.replace("/services");
    }
  }, [convexUser, router]);

  // Redirect unauthenticated users
  useEffect(() => {
    if (isLoaded && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoaded, isAuthenticated, router]);

  async function handleSelect(type) {
    setSelected(type);
    setSaving(true);
    try {
      await setUserType({ email: convexUser.email, userType: type });
      router.push("/services");
    } catch (err) {
      console.error("Failed to set user type:", err);
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
                    onClick={() => handleSelect("client")}
                    disabled={saving}
                    className="w-100 border-0 p-0 bg-transparent"
                    style={{ cursor: saving ? "wait" : "pointer" }}
                  >
                    <div
                      className={`p-4 bdrs12 text-center ${
                        selected === "client"
                          ? "border border-2 border-primary bgc-light shadow-lg"
                          : "border border-1 bg-white shadow-sm"
                      }`}
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
                          background: selected === "client" ? "#ef2b70" : "#f0f0f0",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <i
                          className="flaticon-search-1 fz30"
                          style={{
                            color: selected === "client" ? "#fff" : "#555",
                          }}
                        />
                      </div>
                      <h4 className="title mb-2">I&apos;m looking for freelancers</h4>
                      <p className="text fz14 mb-0">
                        Post projects, hire talent, and manage your team.
                      </p>
                    </div>
                  </button>
                </div>

                {/* Freelancer card */}
                <div className="col-sm-6">
                  <button
                    onClick={() => handleSelect("freelancer")}
                    disabled={saving}
                    className="w-100 border-0 p-0 bg-transparent"
                    style={{ cursor: saving ? "wait" : "pointer" }}
                  >
                    <div
                      className={`p-4 bdrs12 text-center ${
                        selected === "freelancer"
                          ? "border border-2 border-primary bgc-light shadow-lg"
                          : "border border-1 bg-white shadow-sm"
                      }`}
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
                          background: selected === "freelancer" ? "#ef2b70" : "#f0f0f0",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <i
                          className="flaticon-presentation fz30"
                          style={{
                            color: selected === "freelancer" ? "#fff" : "#555",
                          }}
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

              {saving && (
                <div className="text-center mt-4">
                  <div className="spinner-border spinner-border-sm text-primary me-2" role="status" />
                  <span className="text fz14">Setting up your account...</span>
                </div>
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
