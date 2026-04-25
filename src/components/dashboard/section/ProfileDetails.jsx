"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useConvexProfile from "@/hook/useConvexProfile";
import { useTranslations } from "next-intl";

export default function ProfileDetails() {
  const t = useTranslations("myProfile");
  const { convexUser, isLoaded, profile, updateProfile } = useConvexProfile();
  const generateUploadUrl = useMutation(api.marketplace.freelancers.generateAvatarUploadUrl);
  const saveAvatarStorageId = useMutation(api.marketplace.freelancers.saveAvatarStorageId);
  const generateCoverUrl = useMutation(api.marketplace.freelancers.generateCoverUploadUrl);
  const saveCoverStorageId = useMutation(api.marketplace.freelancers.saveCoverStorageId);

  const [displayName, setDisplayName] = useState("");
  const [tagline, setTagline] = useState("");
  const [bio, setBio] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [skillsInput, setSkillsInput] = useState(""); // comma-separated
  const [languagesInput, setLanguagesInput] = useState(""); // comma-separated
  const [locationCity, setLocationCity] = useState("");
  const [locationCountry, setLocationCountry] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedCoverFile, setSelectedCoverFile] = useState(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState(null);

  // Pre-fill form fields once profile loads
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || "");
      setTagline(profile.tagline || "");
      setBio(profile.bio || "");
      setHourlyRate(profile.hourlyRate ? String(profile.hourlyRate) : "");
      setLocationCity(profile.locationCity || "");
      setLocationCountry(profile.locationCountry || "");
      setWebsiteUrl(profile.websiteUrl || "");
      setLinkedinUrl(profile.linkedinUrl || "");
      setTwitterUrl(profile.twitterUrl || "");
      setGithubUrl(profile.githubUrl || "");

      // Skills: array -> comma-separated string
      if (profile.skills && profile.skills.length > 0) {
        setSkillsInput(profile.skills.join(", "));
      }

      // Languages: array -> comma-separated string
      if (profile.languages && profile.languages.length > 0) {
        setLanguagesInput(profile.languages.join(", "));
      }
    }
  }, [profile]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile?._id) return;

    setSaving(true);

    // Parse comma-separated inputs into arrays
    const skillsArray = skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const languagesArray = languagesInput
      .split(",")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    try {
      // Upload avatar to Convex storage if a new file was selected
      if (selectedFile) {
        const uploadUrl = await generateUploadUrl();
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": selectedFile.type },
          body: selectedFile,
        });
        if (!result.ok) throw new Error("Avatar upload failed");
        const { storageId } = await result.json();
        await saveAvatarStorageId({ profileId: profile._id, storageId });
        setSelectedFile(null);
      }

      // Upload cover image if a new file was selected
      if (selectedCoverFile) {
        const uploadUrl = await generateCoverUrl();
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": selectedCoverFile.type },
          body: selectedCoverFile,
        });
        if (!result.ok) throw new Error("Cover upload failed");
        const { storageId } = await result.json();
        await saveCoverStorageId({ profileId: profile._id, storageId });
        setSelectedCoverFile(null);
      }

      await updateProfile({
        profileId: profile._id,
        displayName: displayName || undefined,
        tagline: tagline || undefined,
        bio: bio || undefined,
        hourlyRate: hourlyRate ? Number(hourlyRate) : undefined,
        skills: skillsArray.length > 0 ? skillsArray : undefined,
        languages: languagesArray.length > 0 ? languagesArray : undefined,
        locationCity: locationCity || undefined,
        locationCountry: locationCountry || undefined,
        websiteUrl: websiteUrl || undefined,
        linkedinUrl: linkedinUrl || undefined,
        twitterUrl: twitterUrl || undefined,
        githubUrl: githubUrl || undefined,
      });

      toast.success(t("profileSaved"));
    } catch (error) {
      console.error("Failed to save profile:", error);
      toast.error(t("saveFailed"));
    } finally {
      setSaving(false);
    }
  };

  // Still loading: Clerk or Convex user not yet resolved
  if (!isLoaded || convexUser === undefined) {
    return (
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden relative">
        <div className="bdrb1 pb15 mb25"><h5 className="list-title">{t("profileDetails")}</h5></div>
        <div className="flex items-center gap-2">
          <div className="spinner-border spinner-border-sm text-success" role="status" />
          <p className="text mb-0">{t("loadingProfile")}</p>
        </div>
      </div>
    );
  }

  // Clerk is loaded but no Convex user yet (being synced)
  if (isLoaded && !convexUser && convexUser !== undefined) {
    return (
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden relative">
        <div className="bdrb1 pb15 mb25"><h5 className="list-title">{t("profileDetails")}</h5></div>
        <p className="text">{t("settingUpAccount")}</p>
      </div>
    );
  }

  // Non-freelancer: show a basic profile card with account info
  const isFreelancer = convexUser?.userType === "freelancer";
  if (!isFreelancer && profile === null) {
    return (
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">{t("profileDetails")}</h5>
        </div>
        <div className="row">
          <div className="col-sm-6 mb20">
            <label className="heading-color ff-heading fw500 mb10">{t("name")}</label>
            <input type="text" className="form-control" value={convexUser?.name || ""} disabled />
          </div>
          <div className="col-sm-6 mb20">
            <label className="heading-color ff-heading fw500 mb10">{t("email")}</label>
            <input type="text" className="form-control" value={convexUser?.email || ""} disabled />
          </div>
          <div className="col-sm-6 mb20">
            <label className="heading-color ff-heading fw500 mb10">{t("accountType")}</label>
            <input type="text" className="form-control" value={convexUser?.userType || t("notSet")} disabled />
          </div>
          <div className="col-sm-6 mb20">
            <label className="heading-color ff-heading fw500 mb10">{t("world")}</label>
            <input type="text" className="form-control" value={convexUser?.preferredWorld || "online"} disabled />
          </div>
        </div>
        <div className="alert alert-light mt10" role="alert">
          {t("switchToFreelancer")} <Link href="/onboarding?role=freelancer" className="fw500 text-thm">{t("switchToFreelancerLink")}</Link> {t("switchToFreelancerDesc")}
        </div>
      </div>
    );
  }

  // Profile query still loading (profile === undefined but userType is freelancer)
  if (profile === undefined) {
    return (
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden relative">
        <div className="bdrb1 pb15 mb25"><h5 className="list-title">{t("profileDetails")}</h5></div>
        <div className="flex items-center gap-2">
          <div className="spinner-border spinner-border-sm text-success" role="status" />
          <p className="text mb-0">{t("loadingProfile")}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">{t("profileDetails")}</h5>
        </div>

        {/* Cover image */}
        <div className="mb25">
          <div
            className="relative bdrs4 overflow-hidden"
            style={{
              height: 160,
              background: coverPreviewUrl
                ? `url(${coverPreviewUrl}) center/cover`
                : profile?.coverImageUrl
                ? `url(${profile.coverImageUrl}) center/cover`
                : "#f0f0f0",
            }}
          >
            <label
              className="absolute bottom-0 end-0 m-2 ud-btn btn-white btn-sm"
              style={{ cursor: "pointer" }}
            >
              <input
                type="file"
                accept=".png,.jpg,.jpeg"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files[0];
                  if (f) { setSelectedCoverFile(f); setCoverPreviewUrl(URL.createObjectURL(f)); }
                }}
              />
              <i className="flaticon-pencil me-1" /> {t("editCover")}
            </label>
          </div>
        </div>

        {/* Avatar section */}
        <div className="col-xl-7">
          <div className="profile-box sm:flex items-center mb30">
            <div className="profile-img mb20-sm">
              <Image
                height={71}
                width={71}
                className="rounded-circle wa-xs"
                src={
                  previewUrl
                    ? previewUrl
                    : profile?.avatarUrl || "/images/team/default-avatar.svg"
                }
                style={{
                  height: "71px",
                  width: "71px",
                  objectFit: "cover",
                }}
                alt="profile"
              />
            </div>
            <div className="profile-content ml20 ml0-xs">
              <div className="flex items-center my-3">
                <a
                  className="tag-delt text-thm2"
                  onClick={() => { setSelectedFile(null); setPreviewUrl(null); }}
                  style={{ cursor: "pointer" }}
                >
                  <span className="flaticon-delete text-thm2" />
                </a>
                <label style={{ cursor: "pointer" }}>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <a className="upload-btn ml10">{t("uploadImages")}</a>
                </label>
              </div>
              <p className="text mb-0">
                {t("imageRequirements")}
              </p>
            </div>
          </div>
        </div>

        {/* Profile form */}
        <div className="col-lg-7">
          <form className="form-style1" onSubmit={handleSubmit}>
            <div className="row">

              {/* Display Name */}
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    {t("displayName")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("displayNamePlaceholder")}
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
              </div>

              {/* Tagline */}
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    {t("tagline")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("taglinePlaceholder")}
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                  />
                </div>
              </div>

              {/* Hourly Rate */}
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    {t("hourlyRateLabel")}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder={t("hourlyRatePlaceholder")}
                    min="0"
                    step="1"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                  />
                </div>
              </div>

              {/* Website URL */}
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    {t("websiteUrl")}
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://yourwebsite.com"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                  />
                </div>
              </div>

              {/* Location City */}
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    {t("city")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("cityPlaceholder")}
                    value={locationCity}
                    onChange={(e) => setLocationCity(e.target.value)}
                  />
                </div>
              </div>

              {/* Location Country */}
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    {t("country")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("countryPlaceholder")}
                    value={locationCountry}
                    onChange={(e) => setLocationCountry(e.target.value)}
                  />
                </div>
              </div>

              {/* LinkedIn URL */}
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    {t("linkedinUrl")}
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                  />
                </div>
              </div>

              {/* Twitter/X URL */}
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    {t("twitterUrl")}
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://twitter.com/yourhandle"
                    value={twitterUrl}
                    onChange={(e) => setTwitterUrl(e.target.value)}
                  />
                </div>
              </div>

              {/* GitHub URL */}
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    {t("githubUrl")}
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://github.com/yourusername"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                  />
                </div>
              </div>

              {/* Languages (comma-separated) */}
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    {t("languages")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("languagesPlaceholder")}
                    value={languagesInput}
                    onChange={(e) => setLanguagesInput(e.target.value)}
                  />
                  <small className="text-muted">{t("separateLanguages")}</small>
                </div>
              </div>

              {/* Skills (comma-separated) */}
              <div className="col-md-12">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    {t("skills")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("skillsPlaceholder")}
                    value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
                  />
                  <small className="text-muted">{t("separateSkills")}</small>
                </div>
              </div>

              {/* Bio */}
              <div className="col-md-12">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    {t("introduceYourself")}
                  </label>
                  <textarea
                    cols={30}
                    rows={6}
                    placeholder={t("bioPlaceholder")}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="col-md-12">
                <div className="text-left">
                  <button
                    type="submit"
                    className="ud-btn btn-thm"
                    disabled={saving || !profile}
                  >
                    {saving ? t("saving") : t("saveProfile")}
                    <i className="fal fa-arrow-right-long" />
                  </button>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </>
  );
}
