"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import Image from "next/image";
import { useTranslations } from "next-intl";

const WORLDS = [
  { id: "online",  icon: "flaticon-web",       title: "Online",  descKey: "worldOnlineDesc" },
  { id: "local",   icon: "flaticon-place",      title: "Local",   descKey: "worldLocalDesc" },
  { id: "jobs",    icon: "flaticon-briefcase",  title: "Jobs",    descKey: "worldJobsDesc" },
];

const SKILLS = [
  "JavaScript","TypeScript","React","Next.js","Node.js",
  "Python","Django","FastAPI","PHP","Laravel",
  "UI/UX Design","Figma","Graphic Design","Logo Design","Branding",
  "SEO","Content Writing","Copywriting","Social Media","Email Marketing",
  "Video Editing","Motion Graphics","Photography","3D Modeling",
  "WordPress","Shopify","Webflow","Vue.js","Angular",
  "Data Analysis","Machine Learning","DevOps","AWS","Docker",
];

const CLIENT_INTERESTS = [
  "Web Development","Mobile Apps","Design & Branding","Marketing",
  "Writing & Content","Video & Animation","Data & Analytics",
  "SEO & Growth","E-commerce","AI & Automation",
];

function ProgressBar({ step, totalSteps, t }) {
  const pct = Math.round((step / totalSteps) * 100);
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted">{t("stepOf", { step, total: totalSteps })}</span>
        <span className="text-sm text-muted">{pct}%</span>
      </div>
      <div style={{ height: 4, background: "#e5e7eb", borderRadius: 2 }}>
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "#f06635",
            borderRadius: 2,
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}

function StepWrapper({ children, direction }) {
  return (
    <div className={`onboarding-step${direction === "back" ? " slide-back" : ""}`}>
      {children}
    </div>
  );
}

function OnboardingContent() {
  const t = useTranslations("onboarding");
  const router = useRouter();
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const setUserType = useMutation(api.users.setUserType);
  const updateProfile = useMutation(api.marketplace.freelancers.updateProfile);
  const updateBio = useMutation(api.users.updateBio);

  // Fix #6: use useSearchParams instead of useState + window.location.search
  const searchParams = useSearchParams();
  const switchRole = searchParams.get("role");

  const [step, setStep] = useState(switchRole ? 2 : 1);
  const [direction, setDirection] = useState("forward");
  const [role, setRole] = useState(switchRole || null);
  const [selectedWorld, setSelectedWorld] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [bio, setBio] = useState("");
  const [tagline, setTagline] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [saving, setSaving] = useState(false);
  const [profileId, setProfileId] = useState(null);
  // Fix #4: error state for user-visible feedback
  const [errorMessage, setErrorMessage] = useState("");

  // Fix #5: ref to prevent useEffect redirect re-entry
  const hasRedirected = useRef(false);

  const freelancerProfile = useQuery(
    api.marketplace.freelancers.getByUserId,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );

  useEffect(() => {
    if (freelancerProfile?._id) setProfileId(freelancerProfile._id);
  }, [freelancerProfile]);

  // Fix #5: guard with hasRedirected ref
  useEffect(() => {
    if (switchRole) return;
    if (hasRedirected.current) return;
    if (convexUser?.userType && convexUser?.preferredWorld) {
      hasRedirected.current = true;
      router.replace(`/${convexUser.preferredWorld}`);
    }
    if (convexUser?.userType && !convexUser?.preferredWorld) {
      setRole(convexUser.userType);
      setStep(2);
    }
  }, [convexUser, router, switchRole]);

  useEffect(() => {
    if (isLoaded && !isAuthenticated) router.replace("/login");
  }, [isLoaded, isAuthenticated, router]);

  function goTo(nextStep, dir = "forward") {
    setDirection(dir);
    setStep(nextStep);
  }

  function toggleSkill(skill) {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : prev.length < 10 ? [...prev, skill] : prev
    );
  }

  // Fix #7: remove async (no await inside)
  // Fix #4: clear error on entry
  function handleRoleSelect(type) {
    setErrorMessage("");
    setRole(type);
    goTo(2);
  }

  // Fix #1: don't advance on error; fix #4: set error message on failure
  async function handleWorldSelect(world) {
    setErrorMessage("");
    setSelectedWorld(world);
    setSaving(true);
    try {
      await setUserType({ userType: role, preferredWorld: world });
      goTo(3);
    } catch (err) {
      console.error(err);
      setErrorMessage(t("failedToSave"));
    } finally {
      setSaving(false);
    }
  }

  // Fix #2: selectedWorld null guard; fix #4: clear error and set on failure
  async function handleSkillsNext() {
    setErrorMessage("");
    if (role === "freelancer" && profileId && selectedSkills.length > 0) {
      try {
        await updateProfile({ profileId, skills: selectedSkills });
      } catch (err) {
        console.error("Skills save failed:", err);
        setErrorMessage(t("somethingWentWrong"));
      }
    }
    if (role === "client") {
      if (selectedSkills.length > 0) {
        try { await updateBio({ bio: selectedSkills.join(", ") }); }
        catch (err) {
          console.error(err);
          setErrorMessage(t("somethingWentWrong"));
        }
      }
      router.push(`/${selectedWorld ?? "online"}`);
      return;
    }
    goTo(4);
  }

  // Fix #2: selectedWorld null guard; fix #4: clear error on entry
  async function handleSkillsSkip() {
    setErrorMessage("");
    if (role === "client") {
      router.push(`/${selectedWorld ?? "online"}`);
      return;
    }
    goTo(4);
  }

  // Fix #2: selectedWorld null guard; fix #4: clear error and set on failure
  async function handleProfileSave() {
    setErrorMessage("");
    setSaving(true);
    try {
      if (role === "freelancer" && profileId) {
        await updateProfile({
          profileId,
          tagline: tagline || undefined,
          bio: bio || undefined,
          hourlyRate: hourlyRate ? Number(hourlyRate) : undefined,
        });
      }
      router.push(`/${selectedWorld ?? "online"}`);
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Please try again.");
      setSaving(false);
    }
  }

  // Fix #7: remove async (no await inside)
  // Fix #2: selectedWorld null guard
  function handleProfileSkip() {
    router.push(`/${selectedWorld ?? "online"}`);
  }

  // Fix #9: comment — role is null before step 1 completes; ProgressBar only shown from step 2
  const totalSteps = role === "client" ? 3 : 4;

  if (!isLoaded || !convexUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{t("loading")}</span>
        </div>
      </div>
    );
  }

  // Fix #3: wait for freelancer profile to resolve before showing step 3+
  if (role === "freelancer" && step >= 3 && freelancerProfile === undefined) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{t("loading")}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-min-h-screen flex flex-col">
      <header className="py-4 text-center border-bottom">
        <Image
          src="/images/logo/skilllinkup-transparant-rozepunt.webp"
          alt="SkillLinkup"
          width={180}
          height={45}
          style={{ objectFit: "contain" }}
          priority
        />
      </header>

      <main className="grow flex items-center py-5">
        <div className="container">
          <div className="row justify-center">
            <div className="col-lg-7 col-xl-6">

              {step > 1 && <ProgressBar step={step} totalSteps={totalSteps} t={t} />}

              {/* STEP 1: Role */}
              {step === 1 && (
                <StepWrapper direction={direction}>
                  <div className="text-center mb-5">
                    <h2 className="title mb-2">{t("welcomeTitle")}</h2>
                    <p className="text-lg text-muted">{t("welcomeSubtitle")}</p>
                  </div>
                  <div className="row g-4 justify-center">
                    {[
                      { type: "client",     icon: "flaticon-search-1",     label: t("lookingForTalent"),  desc: t("lookingForTalentDesc") },
                      { type: "freelancer", icon: "flaticon-presentation",  label: t("offerServices"),        desc: t("offerServicesDesc") },
                    ].map(({ type, icon, label, desc }) => (
                      <div key={type} className="col-sm-6">
                        {/* Fix #8: type="button" */}
                        <button
                          type="button"
                          onClick={() => handleRoleSelect(type)}
                          className="w-full border-0 p-0 bg-transparent"
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            className="p-4 bdrs12 text-center border bg-white shadow-sm"
                            style={{ minHeight: 240, transition: "box-shadow 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(239,43,112,0.15)"}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = ""}
                          >
                            <div
                              className="flex items-center justify-center mx-auto mb-4 rounded-circle"
                              style={{ width: 80, height: 80, background: "#f5f5f5" }}
                            >
                              <i className={`${icon} text-3xl`} style={{ color: "#f06635" }} />
                            </div>
                            <h4 className="title mb-2">{label}</h4>
                            <p className="text-sm text-muted mb-0">{desc}</p>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </StepWrapper>
              )}

              {/* STEP 2: World */}
              {step === 2 && (
                <StepWrapper direction={direction}>
                  <div className="text-center mb-5">
                    <h2 className="title mb-2">{t("chooseWorld")}</h2>
                    <p className="text-lg text-muted">{t("chooseWorldSubtitle")}</p>
                  </div>
                  <div className="row g-4 justify-center">
                    {WORLDS.map((w) => (
                      <div key={w.id} className="col-sm-4">
                        {/* Fix #8: type="button" */}
                        <button
                          type="button"
                          onClick={() => handleWorldSelect(w.id)}
                          disabled={saving}
                          className="w-full border-0 p-0 bg-transparent"
                          style={{ cursor: saving ? "wait" : "pointer" }}
                        >
                          <div
                            className="p-4 bdrs12 text-center border bg-white shadow-sm"
                            style={{ minHeight: 200, transition: "box-shadow 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(239,43,112,0.15)"}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = ""}
                          >
                            <div
                              className="flex items-center justify-center mx-auto mb-3 rounded-circle"
                              style={{ width: 64, height: 64, background: "#f5f5f5" }}
                            >
                              <i className={`${w.icon} text-2xl`} style={{ color: "#f06635" }} />
                            </div>
                            <h5 className="title mb-1">{w.title}</h5>
                            <p className="text-sm text-muted mb-0">{t(w.descKey)}</p>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                  {!convexUser?.userType && (
                    <div className="text-center mt-4">
                      {/* Fix #8: type="button" */}
                      <button
                        type="button"
                        onClick={() => goTo(1, "back")}
                        className="btn btn-link text-muted no-underline text-sm"
                        disabled={saving}
                      >
                        ← {t("back")}
                      </button>
                    </div>
                  )}
                  {saving && (
                    <div className="text-center mt-3">
                      <div className="spinner-border spinner-border-sm me-2" style={{ color: "#f06635" }} role="status" />
                      <span className="text-sm text-muted">{t("saving")}</span>
                    </div>
                  )}
                </StepWrapper>
              )}

              {/* STEP 3: Skills / Client Interests */}
              {step === 3 && (
                <StepWrapper direction={direction}>
                  <div className="text-center mb-4">
                    <h2 className="title mb-2">
                      {role === "freelancer" ? t("whatAreYourSkills") : t("whatLookingFor")}
                    </h2>
                    <p className="text-lg text-muted">
                      {role === "freelancer"
                        ? t("pickSkills")
                        : t("selectServices")}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {(role === "freelancer" ? SKILLS : CLIENT_INTERESTS).map((skill) => {
                      const active = selectedSkills.includes(skill);
                      return (
                        // Fix #8: type="button"
                        <button
                          type="button"
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          className="btn btn-sm bdrs20 px-3 py-2"
                          style={{
                            border: `1.5px solid ${active ? "#f06635" : "#e5e7eb"}`,
                            background: active ? "#fdf0f4" : "#fff",
                            color: active ? "#f06635" : "#374151",
                            fontWeight: active ? 600 : 400,
                            transition: "all 0.15s ease",
                          }}
                        >
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                  {role === "freelancer" && (
                    <p className="text-center text-sm text-muted mb-4">
                      {t("skillsSelected", { count: selectedSkills.length })}
                    </p>
                  )}
                  <div className="flex justify-between items-center mt-2">
                    {/* Fix #8: type="button" */}
                    <button
                      type="button"
                      onClick={() => goTo(2, "back")}
                      className="btn btn-link text-muted no-underline text-sm"
                    >
                      ← Back
                    </button>
                    <div className="flex gap-3">
                      {/* Fix #8: type="button" */}
                      <button
                        type="button"
                        onClick={handleSkillsSkip}
                        className="btn btn-outline-secondary btn-sm bdrs8"
                      >
                        {t("skip")}
                      </button>
                      {/* Fix #8: type="button" */}
                      <button
                        type="button"
                        onClick={handleSkillsNext}
                        className="btn btn-sm bdrs8 text-white"
                        style={{ background: "#f06635", minWidth: 100 }}
                        disabled={selectedSkills.length === 0}
                      >
                        {t("continue")} →
                      </button>
                    </div>
                  </div>
                </StepWrapper>
              )}

              {/* STEP 4: Bio / Rate (freelancer only) */}
              {step === 4 && role === "freelancer" && (
                <StepWrapper direction={direction}>
                  <div className="text-center mb-4">
                    <h2 className="title mb-2">{t("tellAboutYourself")}</h2>
                    <p className="text-lg text-muted">{t("profileViews")}</p>
                  </div>
                  <div className="mb-3">
                    <label className="text-sm font-semibold mb-1 block">
                      {t("tagline")} <span className="text-muted font-normal">{t("taglineHint")}</span>
                    </label>
                    <input
                      type="text"
                      className="form-control bdrs8"
                      placeholder={t("taglinePlaceholder")}
                      value={tagline}
                      onChange={e => setTagline(e.target.value)}
                      maxLength={100}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="text-sm font-semibold mb-1 block">{t("bio")}</label>
                    <textarea
                      className="form-control bdrs8"
                      rows={4}
                      placeholder={t("bioPlaceholder")}
                      value={bio}
                      onChange={e => setBio(e.target.value)}
                      maxLength={800}
                    />
                    <div className="text-right text-xs text-muted mt-1">{bio.length}/800</div>
                  </div>
                  <div className="mb-4">
                    <label className="text-sm font-semibold mb-1 block">
                      {t("hourlyRate")} <span className="text-muted font-normal">{t("hourlyRateCurrency")}</span>
                    </label>
                    <div className="input-group" style={{ maxWidth: 200 }}>
                      <span className="input-group-text" style={{ borderRight: 0 }}>$</span>
                      <input
                        type="number"
                        className="form-control"
                        placeholder={t("hourlyRatePlaceholder")}
                        min={1}
                        max={9999}
                        value={hourlyRate}
                        onChange={e => setHourlyRate(e.target.value)}
                        style={{ borderLeft: 0 }}
                      />
                      <span className="input-group-text">{t("perHour")}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    {/* Fix #8: type="button" */}
                    <button
                      type="button"
                      onClick={() => goTo(3, "back")}
                      className="btn btn-link text-muted no-underline text-sm"
                      disabled={saving}
                    >
                      ← Back
                    </button>
                    <div className="flex gap-3">
                      {/* Fix #8: type="button" */}
                      <button
                        type="button"
                        onClick={handleProfileSkip}
                        className="btn btn-outline-secondary btn-sm bdrs8"
                        disabled={saving}
                      >
                        {t("skipForNow")}
                      </button>
                      {/* Fix #8: type="button" */}
                      <button
                        type="button"
                        onClick={handleProfileSave}
                        className="btn btn-sm bdrs8 text-white"
                        style={{ background: "#f06635", minWidth: 120 }}
                        disabled={saving || (!bio && !tagline && !hourlyRate)}
                      >
                        {saving ? (
                          <><span className="spinner-border spinner-border-sm me-1" role="status" /> {t("saving")}</>
                        ) : <>{t("finishSetup")} →</>}
                      </button>
                    </div>
                  </div>
                </StepWrapper>
              )}

              {/* Fix #4: error display */}
              {errorMessage && (
                <div className="alert alert-danger mt-3 text-sm bdrs8" role="alert">
                  {errorMessage}
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
  const tc = useTranslations("common");
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">{tc("loading")}</span>
          </div>
        </div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}
