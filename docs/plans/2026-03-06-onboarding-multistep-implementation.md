# Onboarding Multi-Step Form Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the 2-step onboarding with a 4-step animated multi-step form (freelancer: role → world → skills → bio/rate; client: role → world → interests), saving all data to Convex and surfacing profile completeness in the dashboard.

**Architecture:** Single page rewrite of `onboarding/page.jsx` with client-side step state and CSS slide animations. Saves via existing `setUserType` mutation (step 2) and existing `updateProfile` mutation (steps 3+4). New `updateBio` mutation added to `users.ts` for client interests. Dashboard gets a profile-completeness banner and personalized welcome text.

**Tech Stack:** React useState, CSS transitions (no library), Convex mutations (`api.users.setUserType`, `api.marketplace.freelancers.updateProfile`, new `api.users.updateBio`), existing Bootstrap/flaticon classes.

---

## Context for the implementer

**Key files to understand first:**
- `src/app/(dashboard)/onboarding/page.jsx` — current 2-step form, will be fully replaced
- `convex/users.ts:225` — `setUserType` mutation saves `userType` + `preferredWorld`, creates freelancerProfile for freelancers
- `convex/marketplace/freelancers.ts:56` — `getByUserId` query (owner-only, needs userId)
- `convex/marketplace/freelancers.ts:110` — `updateProfile` mutation, takes `profileId` + optional fields
- `src/components/dashboard/section/DashboardInfo.jsx:71` — welcome text to personalize
- The `skills` table in Convex is empty — use a hardcoded list of common skills instead

**Important:** The skills table has no data, so step 3 uses a hardcoded SKILLS array in the component. No Convex query needed for skills.

**Hardcoded skills to use:**
```js
const SKILLS = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
  "Python", "Django", "FastAPI", "PHP", "Laravel",
  "UI/UX Design", "Figma", "Graphic Design", "Logo Design", "Branding",
  "SEO", "Content Writing", "Copywriting", "Social Media", "Email Marketing",
  "Video Editing", "Motion Graphics", "Photography", "3D Modeling",
  "WordPress", "Shopify", "Webflow", "Vue.js", "Angular",
  "Data Analysis", "Machine Learning", "DevOps", "AWS", "Docker",
];
```

**Client interests (step 3 for clients):**
```js
const CLIENT_INTERESTS = [
  "Web Development", "Mobile Apps", "Design & Branding", "Marketing",
  "Writing & Content", "Video & Animation", "Data & Analytics",
  "SEO & Growth", "E-commerce", "AI & Automation",
];
```

---

## Task 1: Add `updateBio` mutation to `convex/users.ts`

**Files:**
- Modify: `convex/users.ts` (append at end of file)

**Step 1: Add the mutation**

Append after the last export in `convex/users.ts`:

```typescript
/**
 * Save a simple bio/interests string for client users during onboarding.
 */
export const updateBio = mutation({
  args: {
    bio: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    await ctx.db.patch(user._id, {
      bio: args.bio,
      updatedAt: Date.now(),
    });
    return { success: true };
  },
});
```

**Step 2: Verify `bio` field exists on users table**

Check `convex/schema.ts` — look for `bio` near line 34. It should say `bio: v.optional(v.string())`. If not, add it to the users table definition.

**Step 3: Deploy to dev and verify TypeScript**

```bash
npx convex dev --once
```
Expected: `✔ Convex functions ready!` with no errors.

**Step 4: Commit**

```bash
git add convex/users.ts
git commit -m "feat(onboarding): add updateBio mutation for client interests"
```

---

## Task 2: Add CSS animations for step transitions

**Files:**
- Modify: `src/app/globals.css` (or find the main CSS file — check `src/app/layout.jsx` for the import)

**Step 1: Find the global CSS file**

```bash
grep -r "globals\|global\.css\|main\.css" src/app/layout.jsx 2>/dev/null | head -3
```

**Step 2: Add slide animation classes**

Add at the end of the global CSS file:

```css
/* Onboarding step transitions */
.onboarding-step {
  animation: slideInRight 0.25s ease forwards;
}
.onboarding-step.slide-back {
  animation: slideInLeft 0.25s ease forwards;
}
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-40px); }
  to   { opacity: 1; transform: translateX(0); }
}
```

**Step 3: Commit**

```bash
git add src/app/globals.css  # or whichever file you modified
git commit -m "feat(onboarding): add slide transition CSS animations"
```

---

## Task 3: Rewrite `onboarding/page.jsx` — steps 1 & 2 (role + world)

**Files:**
- Modify: `src/app/(dashboard)/onboarding/page.jsx` (full rewrite)

**Step 1: Replace the file with this base structure**

This keeps the existing step 1 (role) and step 2 (world) logic intact but adds the progress bar, white background, and animation wrapper:

```jsx
"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import Image from "next/image";

const WORLDS = [
  { id: "online",  icon: "flaticon-web",       title: "Online",  desc: "Digital services — design, development, marketing" },
  { id: "local",   icon: "flaticon-place",      title: "Local",   desc: "Local services — find or offer services in your area" },
  { id: "jobs",    icon: "flaticon-briefcase",  title: "Jobs",    desc: "Job market — browse or post opportunities" },
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

function ProgressBar({ step, totalSteps }) {
  const pct = Math.round((step / totalSteps) * 100);
  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="fz13 text-muted">Step {step} of {totalSteps}</span>
        <span className="fz13 text-muted">{pct}%</span>
      </div>
      <div style={{ height: 4, background: "#e5e7eb", borderRadius: 2 }}>
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "#ef2b70",
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
  const router = useRouter();
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const setUserType = useMutation(api.users.setUserType);
  const updateProfile = useMutation(api.marketplace.freelancers.updateProfile);
  const updateBio = useMutation(api.users.updateBio);

  const [searchParams] = useState(() =>
    typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams()
  );
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

  // Fetch freelancer profile once we know userId (to get profileId for updateProfile calls)
  const freelancerProfile = useQuery(
    api.marketplace.freelancers.getByUserId,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );

  useEffect(() => {
    if (freelancerProfile?._id) setProfileId(freelancerProfile._id);
  }, [freelancerProfile]);

  // Redirect if already onboarded
  useEffect(() => {
    if (switchRole) return;
    if (convexUser?.userType && convexUser?.preferredWorld) {
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

  async function handleRoleSelect(type) {
    setRole(type);
    goTo(2);
  }

  async function handleWorldSelect(world) {
    setSelectedWorld(world);
    setSaving(true);
    try {
      await setUserType({ userType: role, preferredWorld: world });
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
    goTo(3);
  }

  async function handleSkillsNext() {
    // Save skills immediately if we have a profileId (freelancer)
    if (role === "freelancer" && profileId && selectedSkills.length > 0) {
      try {
        await updateProfile({ profileId, skills: selectedSkills });
      } catch (err) {
        console.error("Skills save failed:", err);
      }
    }
    goTo(4);
  }

  async function handleSkillsSkip() {
    goTo(4);
  }

  async function handleProfileSave() {
    setSaving(true);
    try {
      if (role === "freelancer" && profileId) {
        await updateProfile({
          profileId,
          tagline: tagline || undefined,
          bio: bio || undefined,
          hourlyRate: hourlyRate ? Number(hourlyRate) : undefined,
        });
      } else if (role === "client" && (bio || selectedSkills.length > 0)) {
        const interests = selectedSkills.join(", ");
        if (interests) await updateBio({ bio: interests });
      }
      router.push(`/${selectedWorld}`);
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  }

  async function handleProfileSkip() {
    router.push(`/${selectedWorld}`);
  }

  const totalSteps = role === "client" ? 3 : 4;

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
    <div className="bg-white min-vh-100 d-flex flex-column">
      {/* Minimal header */}
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

      <main className="flex-grow-1 d-flex align-items-center py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-xl-6">

              {/* Progress bar — skip on step 1 */}
              {step > 1 && <ProgressBar step={step} totalSteps={totalSteps} />}

              {/* STEP 1: Role */}
              {step === 1 && (
                <StepWrapper direction={direction}>
                  <div className="text-center mb-5">
                    <h2 className="title mb-2">Welcome to SkillLinkup!</h2>
                    <p className="fz17 text-muted">What would you like to do? You can always change this later.</p>
                  </div>
                  <div className="row g-4 justify-content-center">
                    {[
                      { type: "client",     icon: "flaticon-search-1", label: "I'm looking for talent",    desc: "Post projects, hire talent, and manage your team." },
                      { type: "freelancer", icon: "flaticon-presentation", label: "I offer services", desc: "Create gigs, find clients, and grow your freelance business." },
                    ].map(({ type, icon, label, desc }) => (
                      <div key={type} className="col-sm-6">
                        <button onClick={() => handleRoleSelect(type)} className="w-100 border-0 p-0 bg-transparent" style={{ cursor: "pointer" }}>
                          <div className="p-4 bdrs12 text-center border bg-white shadow-sm" style={{ minHeight: 240, transition: "box-shadow 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(239,43,112,0.15)"}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = ""}>
                            <div className="d-flex align-items-center justify-content-center mx-auto mb-4 rounded-circle" style={{ width: 80, height: 80, background: "#f5f5f5" }}>
                              <i className={`${icon} fz30`} style={{ color: "#ef2b70" }} />
                            </div>
                            <h4 className="title mb-2">{label}</h4>
                            <p className="fz14 text-muted mb-0">{desc}</p>
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
                    <h2 className="title mb-2">Choose your world</h2>
                    <p className="fz17 text-muted">Where would you like to start? You can explore all worlds anytime.</p>
                  </div>
                  <div className="row g-4 justify-content-center">
                    {WORLDS.map((w) => (
                      <div key={w.id} className="col-sm-4">
                        <button onClick={() => handleWorldSelect(w.id)} disabled={saving} className="w-100 border-0 p-0 bg-transparent" style={{ cursor: saving ? "wait" : "pointer" }}>
                          <div className="p-4 bdrs12 text-center border bg-white shadow-sm" style={{ minHeight: 200, transition: "box-shadow 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(239,43,112,0.15)"}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = ""}>
                            <div className="d-flex align-items-center justify-content-center mx-auto mb-3 rounded-circle" style={{ width: 64, height: 64, background: "#f5f5f5" }}>
                              <i className={`${w.icon} fz26`} style={{ color: "#ef2b70" }} />
                            </div>
                            <h5 className="title mb-1">{w.title}</h5>
                            <p className="fz13 text-muted mb-0">{w.desc}</p>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                  {!convexUser?.userType && (
                    <div className="text-center mt-4">
                      <button onClick={() => goTo(1, "back")} className="btn btn-link text-muted text-decoration-none fz14" disabled={saving}>
                        ← Back
                      </button>
                    </div>
                  )}
                  {saving && (
                    <div className="text-center mt-3">
                      <div className="spinner-border spinner-border-sm me-2" style={{ color: "#ef2b70" }} role="status" />
                      <span className="fz14 text-muted">Saving...</span>
                    </div>
                  )}
                </StepWrapper>
              )}

              {/* STEP 3: Skills / Client Interests */}
              {step === 3 && (
                <StepWrapper direction={direction}>
                  <div className="text-center mb-4">
                    <h2 className="title mb-2">
                      {role === "freelancer" ? "What are your skills?" : "What are you looking for?"}
                    </h2>
                    <p className="fz17 text-muted">
                      {role === "freelancer"
                        ? "Pick up to 10 skills. This helps clients find you."
                        : "Select the services you're interested in."}
                    </p>
                  </div>
                  <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
                    {(role === "freelancer" ? SKILLS : CLIENT_INTERESTS).map((skill) => {
                      const active = selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          className="btn btn-sm bdrs20 px-3 py-2"
                          style={{
                            border: `1.5px solid ${active ? "#ef2b70" : "#e5e7eb"}`,
                            background: active ? "#fdf0f4" : "#fff",
                            color: active ? "#ef2b70" : "#374151",
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
                    <p className="text-center fz13 text-muted mb-4">
                      {selectedSkills.length}/10 selected
                    </p>
                  )}
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <button onClick={() => goTo(2, "back")} className="btn btn-link text-muted text-decoration-none fz14">
                      ← Back
                    </button>
                    <div className="d-flex gap-3">
                      <button onClick={handleSkillsSkip} className="btn btn-outline-secondary btn-sm bdrs8">
                        Skip
                      </button>
                      <button
                        onClick={handleSkillsNext}
                        className="btn btn-sm bdrs8 text-white"
                        style={{ background: "#ef2b70", minWidth: 100 }}
                        disabled={selectedSkills.length === 0}
                      >
                        Continue →
                      </button>
                    </div>
                  </div>
                </StepWrapper>
              )}

              {/* STEP 4: Bio / Rate (freelancer only — clients redirect after step 3) */}
              {step === 4 && role === "freelancer" && (
                <StepWrapper direction={direction}>
                  <div className="text-center mb-4">
                    <h2 className="title mb-2">Tell clients about yourself</h2>
                    <p className="fz17 text-muted">A complete profile gets 3× more views. You can edit this anytime.</p>
                  </div>
                  <div className="mb-3">
                    <label className="fz14 fw600 mb-1 d-block">Tagline <span className="text-muted fw400">(1 sentence)</span></label>
                    <input
                      type="text"
                      className="form-control bdrs8"
                      placeholder="e.g. Full-stack developer with 5 years React experience"
                      value={tagline}
                      onChange={e => setTagline(e.target.value)}
                      maxLength={100}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="fz14 fw600 mb-1 d-block">Bio</label>
                    <textarea
                      className="form-control bdrs8"
                      rows={4}
                      placeholder="Describe your experience, what you love to work on, and what makes you great..."
                      value={bio}
                      onChange={e => setBio(e.target.value)}
                      maxLength={800}
                    />
                    <div className="text-end fz12 text-muted mt-1">{bio.length}/800</div>
                  </div>
                  <div className="mb-4">
                    <label className="fz14 fw600 mb-1 d-block">Hourly rate <span className="text-muted fw400">(USD)</span></label>
                    <div className="input-group" style={{ maxWidth: 200 }}>
                      <span className="input-group-text bdrs8" style={{ borderRight: 0 }}>$</span>
                      <input
                        type="number"
                        className="form-control bdrs8"
                        placeholder="e.g. 50"
                        min={1}
                        max={9999}
                        value={hourlyRate}
                        onChange={e => setHourlyRate(e.target.value)}
                        style={{ borderLeft: 0 }}
                      />
                      <span className="input-group-text bdrs8">/hr</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <button onClick={() => goTo(3, "back")} className="btn btn-link text-muted text-decoration-none fz14" disabled={saving}>
                      ← Back
                    </button>
                    <div className="d-flex gap-3">
                      <button onClick={handleProfileSkip} className="btn btn-outline-secondary btn-sm bdrs8" disabled={saving}>
                        Skip for now
                      </button>
                      <button
                        onClick={handleProfileSave}
                        className="btn btn-sm bdrs8 text-white"
                        style={{ background: "#ef2b70", minWidth: 120 }}
                        disabled={saving || (!bio && !tagline && !hourlyRate)}
                      >
                        {saving ? (
                          <><span className="spinner-border spinner-border-sm me-1" role="status" /> Saving...</>
                        ) : "Finish setup →"}
                      </button>
                    </div>
                  </div>
                </StepWrapper>
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
```

**Step 2: Fix client flow — redirect after step 3**

In the `handleSkillsNext` function, add a redirect for clients after saving:

```js
async function handleSkillsNext() {
  if (role === "freelancer" && profileId && selectedSkills.length > 0) {
    try { await updateProfile({ profileId, skills: selectedSkills }); }
    catch (err) { console.error("Skills save failed:", err); }
  }
  if (role === "client") {
    // Save interests and redirect directly
    if (selectedSkills.length > 0) {
      try { await updateBio({ bio: selectedSkills.join(", ") }); }
      catch (err) { console.error(err); }
    }
    router.push(`/${selectedWorld}`);
    return;
  }
  goTo(4);
}
```

And same for `handleSkillsSkip` for clients:

```js
async function handleSkillsSkip() {
  if (role === "client") {
    router.push(`/${selectedWorld}`);
    return;
  }
  goTo(4);
}
```

**Step 3: Verify locally**

```bash
npm run dev
```

Go to `http://localhost:3000/onboarding` and test:
- Register flow: role → world → skills → bio/rate
- Back buttons work
- Skip buttons work
- Progress bar shows correct %
- White background throughout

**Step 4: Commit**

```bash
git add src/app/(dashboard)/onboarding/page.jsx
git commit -m "feat(onboarding): multi-step form with animations, progress bar, skills + bio"
```

---

## Task 4: Profile completeness banner in dashboard

**Files:**
- Modify: `src/components/dashboard/section/DashboardInfo.jsx`

**Step 1: Add profile query and completeness logic**

After the existing `useQuery` calls (around line 20), add:

```jsx
const freelancerProfile = useQuery(
  api.marketplace.freelancers.getByUserId,
  userId && convexUser?.userType === "freelancer" ? { userId } : "skip"
);

// Calculate completeness for freelancers
const completenessItems = convexUser?.userType === "freelancer" ? [
  { done: !!freelancerProfile?.bio,        label: "Add a bio",         href: "/my-profile" },
  { done: !!(freelancerProfile?.skills?.length), label: "Add skills",  href: "/my-profile" },
  { done: !!freelancerProfile?.hourlyRate, label: "Set hourly rate",   href: "/my-profile" },
  { done: !!freelancerProfile?.tagline,    label: "Add a tagline",     href: "/my-profile" },
] : [];
const completedCount = completenessItems.filter(i => i.done).length;
const completenessPct = completenessItems.length > 0
  ? Math.round((completedCount / completenessItems.length) * 100)
  : 100;
const showBanner = convexUser?.userType === "freelancer" && completenessPct < 100 && freelancerProfile !== undefined;
```

**Step 2: Replace the welcome title area (around line 71)**

Replace:
```jsx
<div className="dashboard_title_area">
  <h2>Dashboard</h2>
  <p className="text">Welcome back! Here is what is happening with your account.</p>
</div>
```

With:
```jsx
<div className="dashboard_title_area">
  <h2>Hi, {convexUser?.name?.split(" ")[0] || "there"}!</h2>
  <p className="text">
    {freelancerProfile?.tagline || "Welcome back! Here is what is happening with your account."}
  </p>
</div>
```

**Step 3: Add the banner just before the stats row**

Find the stats row (starts with `{!notAuthenticated && (<>`), and add the banner right after the opening fragment:

```jsx
{showBanner && (
  <div className="row mb20">
    <div className="col-12">
      <div className="bdrs8 p20 d-flex align-items-center justify-content-between flex-wrap gap-3"
        style={{ background: "#fdf0f4", border: "1px solid #fbd5e2" }}>
        <div className="d-flex align-items-center gap-3">
          <div style={{ minWidth: 120 }}>
            <div className="fz13 text-muted mb-1">Profile completeness</div>
            <div style={{ height: 6, background: "#fbd5e2", borderRadius: 3 }}>
              <div style={{ height: "100%", width: `${completenessPct}%`, background: "#ef2b70", borderRadius: 3, transition: "width 0.3s ease" }} />
            </div>
            <div className="fz12 text-muted mt-1">{completenessPct}% complete</div>
          </div>
          <div>
            {completenessItems.filter(i => !i.done).slice(0, 2).map(item => (
              <div key={item.label} className="fz13 text-muted">
                <i className="fas fa-circle fz8 me-1" style={{ color: "#ef2b70" }} /> {item.label}
              </div>
            ))}
          </div>
        </div>
        <a href="/my-profile" className="btn btn-sm bdrs8 text-white fz13"
          style={{ background: "#ef2b70" }}>
          Complete profile →
        </a>
      </div>
    </div>
  </div>
)}
```

**Step 4: Run dev and verify**

```bash
npm run dev
```

Log in as a freelancer with an incomplete profile. Verify:
- Banner shows with correct percentage
- "Hi, [firstName]!" greeting appears
- Tagline shows if set, fallback text if not
- Banner disappears when profile is 100% complete

**Step 5: Commit**

```bash
git add src/components/dashboard/section/DashboardInfo.jsx
git commit -m "feat(dashboard): profile completeness banner + personalized welcome"
```

---

## Task 5: Deploy and verify end-to-end

**Step 1: Build check**

```bash
npm run build
```
Expected: no errors.

**Step 2: Deploy Convex to prod**

```bash
npx convex deploy -y
```

**Step 3: Push to Vercel**

```bash
git push origin main
```

**Step 4: Smoke test on production**

- Register a new account at `/register`
- Complete all 4 onboarding steps as freelancer
- Verify redirect goes to `/{world}` after step 4
- Open `/dashboard` — verify banner shows + greeting is personalized
- Complete the profile → verify banner disappears

**Step 5: Test client flow**

- Register another account
- Choose "client" in step 1
- Verify only 3 steps (role → world → interests)
- Verify redirect after step 3
