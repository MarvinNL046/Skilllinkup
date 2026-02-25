"use client";

import { useState, useEffect, KeyboardEvent, useRef } from "react";
import Image from "next/image";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import type { Id } from "@/convex/_generated/dataModel";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface ProfileForm {
  displayName: string;
  tagline: string;
  bio: string;
  hourlyRate: string;
  workType: "remote" | "local" | "hybrid";
  locationCity: string;
  locationCountry: string;
  skills: string[];
  languages: string[];
  websiteUrl: string;
  linkedinUrl: string;
  isAvailable: boolean;
}

const DEFAULT_FORM: ProfileForm = {
  displayName: "",
  tagline: "",
  bio: "",
  hourlyRate: "",
  workType: "remote",
  locationCity: "",
  locationCountry: "",
  skills: [],
  languages: [],
  websiteUrl: "",
  linkedinUrl: "",
  isAvailable: true,
};

// ─────────────────────────────────────────────────────────────────────────────
// Inner client component that has access to Convex user ID
// ─────────────────────────────────────────────────────────────────────────────

interface ProfileEditorProps {
  convexUserId: Id<"users">;
  clerkEmail: string;
  clerkAvatarUrl: string | undefined;
}

function ProfileEditor({ convexUserId, clerkEmail, clerkAvatarUrl }: ProfileEditorProps) {
  const profile = useQuery(api.marketplace.freelancers.getByUserId, {
    userId: convexUserId,
  });

  const updateProfile = useMutation(api.marketplace.freelancers.updateProfile);

  const [form, setForm] = useState<ProfileForm>(DEFAULT_FORM);
  const [profileId, setProfileId] = useState<Id<"freelancerProfiles"> | null>(null);
  const [skillInput, setSkillInput] = useState("");
  const [langInput, setLangInput] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const initRef = useRef(false);

  // Populate form once profile data arrives (only on first load)
  useEffect(() => {
    if (profile === undefined) return; // still loading
    if (initRef.current) return;       // already initialised
    initRef.current = true;
    setHydrated(true);

    if (profile) {
      setProfileId(profile._id);
      setForm({
        displayName: profile.displayName ?? "",
        tagline: profile.tagline ?? "",
        bio: profile.bio ?? "",
        hourlyRate: profile.hourlyRate ? String(profile.hourlyRate) : "",
        workType: (profile.workType as ProfileForm["workType"]) ?? "remote",
        locationCity: profile.locationCity ?? "",
        locationCountry: profile.locationCountry ?? "",
        skills: Array.isArray(profile.skills) ? profile.skills : [],
        languages: Array.isArray(profile.languages) ? profile.languages : [],
        websiteUrl: profile.websiteUrl ?? "",
        linkedinUrl: profile.linkedinUrl ?? "",
        isAvailable: profile.isAvailable !== false,
      });
    } else {
      // No profile yet – still show empty form
      setHydrated(true);
    }
  }, [profile]);

  function updateField<K extends keyof ProfileForm>(key: K, value: ProfileForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleTagKeyDown(
    e: KeyboardEvent<HTMLInputElement>,
    inputValue: string,
    field: "skills" | "languages",
    setInput: (v: string) => void
  ) {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (!form[field].includes(trimmed)) {
        updateField(field, [...form[field], trimmed]);
      }
      setInput("");
    }
  }

  function addTag(field: "skills" | "languages", input: string, setInput: (v: string) => void) {
    const trimmed = input.trim();
    if (trimmed && !form[field].includes(trimmed)) {
      updateField(field, [...form[field], trimmed]);
      setInput("");
    }
  }

  function removeTag(field: "skills" | "languages", tag: string) {
    updateField(field, form[field].filter((t) => t !== tag));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!profileId) {
      setStatus("error");
      setErrorMessage("No freelancer profile found. Please complete onboarding first.");
      return;
    }

    setStatus("saving");
    setErrorMessage("");

    try {
      await updateProfile({
        profileId,
        displayName: form.displayName.trim() || undefined,
        tagline: form.tagline.trim() || undefined,
        bio: form.bio.trim() || undefined,
        hourlyRate: form.hourlyRate ? parseFloat(form.hourlyRate) : undefined,
        workType: form.workType,
        locationCity: form.locationCity.trim() || undefined,
        locationCountry: form.locationCountry.trim() || undefined,
        skills: form.skills.length > 0 ? form.skills : undefined,
        languages: form.languages.length > 0 ? form.languages : undefined,
        websiteUrl: form.websiteUrl.trim() || undefined,
        linkedinUrl: form.linkedinUrl.trim() || undefined,
        isAvailable: form.isAvailable,
      });

      setStatus("saved");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to save profile.");
    }
  }

  const showLocationFields = form.workType === "local" || form.workType === "hybrid";

  // Loading skeleton
  if (!hydrated) {
    return (
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2 className="mb-0">My Profile</h2>
              <p className="text">Loading your profile...</p>
            </div>
          </div>
        </div>
        <div className="ps-widget bgc-white bdrs4 p30 mb30">
          <div className="text-center py40">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No freelancer profile
  if (hydrated && !profileId) {
    return (
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2 className="mb-0">My Profile</h2>
            </div>
          </div>
        </div>
        <div className="ps-widget bgc-white bdrs4 p30 mb30">
          <div className="text-center py40">
            <span className="flaticon-photo fz40 text-thm" />
            <p className="fz15 mt15">
              You do not have a freelancer profile yet. Please complete onboarding to create one.
            </p>
            <a href="/dashboard/seller" className="ud-btn btn-thm mt20">
              Go to Seller Onboarding
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard__content hover-bgc-color">
      {/* Page header */}
      <div className="row pb40">
        <div className="col-lg-9">
          <div className="dashboard_title_area">
            <h2 className="mb-0">My Profile</h2>
            <p className="text">Update your public freelancer profile below.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xl-12">

            {/* ── Section 1: Profile Image ── */}
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="bdrb1 pb15 mb30">
                <h5 className="title fz17 mb-0">Profile Photo</h5>
              </div>
              <div className="d-flex align-items-center">
                <div className="profile-photo position-relative me-4">
                  <Image
                    src={clerkAvatarUrl || "/images/resource/user.png"}
                    alt="Profile photo"
                    width={90}
                    height={90}
                    className="rounded-circle"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <p className="fz14 mb5">
                    <strong>Profile photo is managed by Clerk.</strong>
                  </p>
                  <p className="fz13 text">
                    To change your photo, visit{" "}
                    <a
                      href="/user-profile"
                      className="text-thm"
                      target="_blank"
                      rel="noreferrer"
                    >
                      account settings
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* ── Section 2: Basic Info ── */}
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="bdrb1 pb15 mb30">
                <h5 className="title fz17 mb-0">Basic Information</h5>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="mb25">
                    <label className="heading-color ff-heading fw500 mb10">
                      Display Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      placeholder="Your public name"
                      value={form.displayName}
                      onChange={(e) => updateField("displayName", e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mb25">
                    <label className="heading-color ff-heading fw500 mb10">
                      Email <span className="fz12 text">(managed by Clerk)</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value={clerkEmail}
                      readOnly
                      disabled
                    />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="mb25">
                    <label className="heading-color ff-heading fw500 mb10">
                      Tagline
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Full-Stack Developer specialising in React"
                      value={form.tagline}
                      onChange={(e) => updateField("tagline", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Section 3: Professional ── */}
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="bdrb1 pb15 mb30">
                <h5 className="title fz17 mb-0">Professional Details</h5>
              </div>
              <div className="row">
                {/* Hourly Rate */}
                <div className="col-sm-6">
                  <div className="mb25">
                    <label className="heading-color ff-heading fw500 mb10">
                      Hourly Rate (€/hr)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="form-control"
                      placeholder="e.g. 75"
                      value={form.hourlyRate}
                      onChange={(e) => updateField("hourlyRate", e.target.value)}
                    />
                  </div>
                </div>

                {/* Availability toggle */}
                <div className="col-sm-6">
                  <div className="mb25">
                    <label className="heading-color ff-heading fw500 mb10">
                      Availability
                    </label>
                    <div className="d-flex align-items-center gap10 mt10">
                      <div className="form-check form-switch mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="isAvailable"
                          checked={form.isAvailable}
                          onChange={(e) => updateField("isAvailable", e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="isAvailable">
                          {form.isAvailable ? "Available for work" : "Not available"}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="col-sm-12">
                  <div className="mb25">
                    <label className="heading-color ff-heading fw500 mb10">
                      Skills
                    </label>
                    <div className="d-flex flex-wrap gap-2 mb10">
                      {form.skills.map((skill) => (
                        <span
                          key={skill}
                          className="badge-style2 d-inline-flex align-items-center gap5"
                        >
                          {skill}
                          <button
                            type="button"
                            className="btn-close fz10 ms-1"
                            aria-label={`Remove ${skill}`}
                            onClick={() => removeTag("skills", skill)}
                          />
                        </span>
                      ))}
                    </div>
                    <div className="d-flex gap10">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type a skill and press Enter"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) =>
                          handleTagKeyDown(e, skillInput, "skills", setSkillInput)
                        }
                      />
                      <button
                        type="button"
                        className="ud-btn btn-thm-outline"
                        onClick={() => addTag("skills", skillInput, setSkillInput)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Languages */}
                <div className="col-sm-12">
                  <div className="mb25">
                    <label className="heading-color ff-heading fw500 mb10">
                      Languages
                    </label>
                    <div className="d-flex flex-wrap gap-2 mb10">
                      {form.languages.map((lang) => (
                        <span
                          key={lang}
                          className="badge-style2 d-inline-flex align-items-center gap5"
                        >
                          {lang}
                          <button
                            type="button"
                            className="btn-close fz10 ms-1"
                            aria-label={`Remove ${lang}`}
                            onClick={() => removeTag("languages", lang)}
                          />
                        </span>
                      ))}
                    </div>
                    <div className="d-flex gap10">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type a language and press Enter"
                        value={langInput}
                        onChange={(e) => setLangInput(e.target.value)}
                        onKeyDown={(e) =>
                          handleTagKeyDown(e, langInput, "languages", setLangInput)
                        }
                      />
                      <button
                        type="button"
                        className="ud-btn btn-thm-outline"
                        onClick={() => addTag("languages", langInput, setLangInput)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Section 4: Location ── */}
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="bdrb1 pb15 mb30">
                <h5 className="title fz17 mb-0">Location & Work Type</h5>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="mb25">
                    <label className="heading-color ff-heading fw500 mb10">
                      Work Type
                    </label>
                    <div className="d-flex flex-wrap gap10">
                      {(["remote", "local", "hybrid"] as const).map((wt) => (
                        <label
                          key={wt}
                          className={`cursor-pointer selectbox bdrs4 px-3 py-2 border ${
                            form.workType === wt ? "border-thm bg-thm text-white" : ""
                          }`}
                          style={{ cursor: "pointer" }}
                        >
                          <input
                            type="radio"
                            name="workType"
                            value={wt}
                            checked={form.workType === wt}
                            onChange={() => updateField("workType", wt)}
                            className="d-none"
                          />
                          {wt.charAt(0).toUpperCase() + wt.slice(1)}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {showLocationFields && (
                  <>
                    <div className="col-sm-6">
                      <div className="mb25">
                        <label className="heading-color ff-heading fw500 mb10">
                          City
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Amsterdam"
                          value={form.locationCity}
                          onChange={(e) => updateField("locationCity", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb25">
                        <label className="heading-color ff-heading fw500 mb10">
                          Country (ISO code)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. NL"
                          maxLength={2}
                          value={form.locationCountry}
                          onChange={(e) =>
                            updateField("locationCountry", e.target.value.toUpperCase())
                          }
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ── Section 5: About / Bio ── */}
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="bdrb1 pb15 mb30">
                <h5 className="title fz17 mb-0">About Me</h5>
              </div>
              <div className="mb25">
                <label className="heading-color ff-heading fw500 mb10">
                  Bio
                </label>
                <textarea
                  className="form-control"
                  rows={6}
                  placeholder="Tell clients about your background, expertise, and what makes you stand out..."
                  value={form.bio}
                  onChange={(e) => updateField("bio", e.target.value)}
                />
              </div>
            </div>

            {/* ── Section 6: Online Presence ── */}
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="bdrb1 pb15 mb30">
                <h5 className="title fz17 mb-0">Online Presence</h5>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="mb25">
                    <label className="heading-color ff-heading fw500 mb10">
                      Website URL
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      placeholder="https://yourwebsite.com"
                      value={form.websiteUrl}
                      onChange={(e) => updateField("websiteUrl", e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mb25">
                    <label className="heading-color ff-heading fw500 mb10">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={form.linkedinUrl}
                      onChange={(e) => updateField("linkedinUrl", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Section 7: Change Password (Clerk link) ── */}
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="bdrb1 pb15 mb30">
                <h5 className="title fz17 mb-0">Security</h5>
              </div>
              <p className="fz14 mb15">
                Passwords and two-factor authentication are managed by Clerk.
              </p>
              <a
                href="/user-profile"
                target="_blank"
                rel="noreferrer"
                className="ud-btn btn-thm-outline"
              >
                <span className="flaticon-lock mr10" />
                Manage Password &amp; Security
              </a>
            </div>

            {/* ── Status messages ── */}
            {status === "saved" && (
              <div className="alert alert-success bdrs4 mb25" role="alert">
                <span className="flaticon-check mr10" />
                Profile saved successfully!
              </div>
            )}
            {status === "error" && (
              <div className="alert alert-danger bdrs4 mb25" role="alert">
                <span className="flaticon-warning mr10" />
                {errorMessage || "An error occurred. Please try again."}
              </div>
            )}

            {/* ── Submit ── */}
            <div className="d-flex justify-content-end pb30">
              <button
                type="submit"
                className="ud-btn btn-thm"
                disabled={status === "saving"}
              >
                {status === "saving" ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    />
                    Saving...
                  </>
                ) : (
                  "Save Profile"
                )}
              </button>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Bridge component: resolve Clerk → Convex user ID, then render ProfileEditor
// ─────────────────────────────────────────────────────────────────────────────

function ConvexUserBridge() {
  const { user: clerkUser, isLoaded } = useUser();

  // Fetch the Convex user record that matches this Clerk user
  const convexUser = useQuery(
    api.users.getByClerkId,
    isLoaded && clerkUser ? { clerkId: clerkUser.id } : "skip"
  );

  if (!isLoaded || convexUser === undefined) {
    return (
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2 className="mb-0">My Profile</h2>
            </div>
          </div>
        </div>
        <div className="ps-widget bgc-white bdrs4 p30 mb30">
          <div className="text-center py40">
            <div className="spinner-border text-thm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!clerkUser) {
    return (
      <div className="dashboard__content hover-bgc-color">
        <div className="ps-widget bgc-white bdrs4 p30 mb30">
          <p className="text-center py40">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  if (!convexUser) {
    return (
      <div className="dashboard__content hover-bgc-color">
        <div className="ps-widget bgc-white bdrs4 p30 mb30">
          <p className="text-center py40">
            Your account is not yet set up. Please complete onboarding.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ProfileEditor
      convexUserId={convexUser._id}
      clerkEmail={clerkUser.primaryEmailAddress?.emailAddress ?? ""}
      clerkAvatarUrl={clerkUser.imageUrl}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page export
// ─────────────────────────────────────────────────────────────────────────────

export default function MyProfilePage() {
  return <ConvexUserBridge />;
}
