"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import useConvexProfile from "@/hook/useConvexProfile";

export default function ProfileDetails() {
  const { convexUser, profile, updateProfile } = useConvexProfile();

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
  const [saving, setSaving] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
      setSelectedImage(URL.createObjectURL(file));
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
      });

      toast.success("Profile saved successfully!");
    } catch (error) {
      console.error("Failed to save profile:", error);
      toast.error("Something went wrong while saving. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Still loading: convexUser not yet resolved
  if (convexUser === undefined) {
    return (
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Profile Details</h5>
        </div>
        <p className="text">Loading profile...</p>
      </div>
    );
  }

  // Non-freelancer: show a basic profile card with account info
  const isFreelancer = convexUser?.userType === "freelancer";
  if (!isFreelancer && profile === null) {
    return (
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Profile Details</h5>
        </div>
        <div className="row">
          <div className="col-sm-6 mb20">
            <label className="heading-color ff-heading fw500 mb10">Name</label>
            <input type="text" className="form-control" value={convexUser?.name || ""} disabled />
          </div>
          <div className="col-sm-6 mb20">
            <label className="heading-color ff-heading fw500 mb10">Email</label>
            <input type="text" className="form-control" value={convexUser?.email || ""} disabled />
          </div>
          <div className="col-sm-6 mb20">
            <label className="heading-color ff-heading fw500 mb10">Account Type</label>
            <input type="text" className="form-control" value={convexUser?.userType || "Not set"} disabled />
          </div>
          <div className="col-sm-6 mb20">
            <label className="heading-color ff-heading fw500 mb10">World</label>
            <input type="text" className="form-control" value={convexUser?.preferredWorld || "online"} disabled />
          </div>
        </div>
        <div className="alert alert-light mt10" role="alert">
          Want to offer your services? <Link href="/onboarding?role=freelancer" className="fw500 text-thm">Switch to freelancer mode</Link> to set up your full profile with skills, hourly rate, and more.
        </div>
      </div>
    );
  }

  // Profile query still loading (profile === undefined but userType is freelancer)
  if (profile === undefined) {
    return (
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Profile Details</h5>
        </div>
        <p className="text">Loading profile...</p>
      </div>
    );
  }

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Profile Details</h5>
        </div>

        {/* Avatar section */}
        <div className="col-xl-7">
          <div className="profile-box d-sm-flex align-items-center mb30">
            <div className="profile-img mb20-sm">
              <Image
                height={71}
                width={71}
                className="rounded-circle wa-xs"
                src={
                  selectedImage
                    ? selectedImage
                    : profile?.avatarUrl || "/images/team/fl-1.png"
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
              <div className="d-flex align-items-center my-3">
                <a
                  className="tag-delt text-thm2"
                  onClick={() => setSelectedImage(null)}
                  style={{ cursor: "pointer" }}
                >
                  <span className="flaticon-delete text-thm2" />
                </a>
                <label style={{ cursor: "pointer" }}>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    className="d-none"
                    onChange={handleImageChange}
                  />
                  <a className="upload-btn ml10">Upload Images</a>
                </label>
              </div>
              <p className="text mb-0">
                Max file size is 1MB, Minimum dimension: 330x300 And Suitable
                files are .jpg &amp; .png
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
                    Display Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your display name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
              </div>

              {/* Tagline */}
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Tagline
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your professional tagline"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                  />
                </div>
              </div>

              {/* Hourly Rate */}
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Hourly Rate ($)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="e.g. 75"
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
                    Website URL
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
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Amsterdam"
                    value={locationCity}
                    onChange={(e) => setLocationCity(e.target.value)}
                  />
                </div>
              </div>

              {/* Location Country */}
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Country
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Netherlands"
                    value={locationCountry}
                    onChange={(e) => setLocationCountry(e.target.value)}
                  />
                </div>
              </div>

              {/* LinkedIn URL */}
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    LinkedIn URL
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

              {/* Languages (comma-separated) */}
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Languages
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. English, Dutch, German"
                    value={languagesInput}
                    onChange={(e) => setLanguagesInput(e.target.value)}
                  />
                  <small className="text-muted">Separate multiple languages with a comma</small>
                </div>
              </div>

              {/* Skills (comma-separated) */}
              <div className="col-md-12">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Skills
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. React, Node.js, UI Design, SEO"
                    value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
                  />
                  <small className="text-muted">Separate multiple skills with a comma</small>
                </div>
              </div>

              {/* Bio */}
              <div className="col-md-12">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">
                    Introduce Yourself
                  </label>
                  <textarea
                    cols={30}
                    rows={6}
                    placeholder="Tell clients about yourself, your experience, and what makes you stand out..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="col-md-12">
                <div className="text-start">
                  <button
                    type="submit"
                    className="ud-btn btn-thm"
                    disabled={saving || !profile}
                  >
                    {saving ? "Saving..." : "Save Profile"}
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
