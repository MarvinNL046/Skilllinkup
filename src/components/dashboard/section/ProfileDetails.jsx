"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useConvexProfile from "@/hook/useConvexProfile";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowRight, Pencil, Trash2, Upload, Info } from "lucide-react";

function LoadingSkeleton({ title }) {
  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="border-b border-[var(--border-subtle)] pb-4">
        <Skeleton className="h-5 w-48" />
      </CardHeader>
      <CardContent className="pt-6 space-y-3">
        {[120, 90, 110, 95, 80].map((w, i) => (
          <div key={i} className="grid grid-cols-[120px_1fr] items-center gap-4">
            <Skeleton className="h-3.5" style={{ width: `${w}px` }} />
            <Skeleton className="h-9" />
          </div>
        ))}
        <span role="status" className="sr-only">
          {title}
        </span>
      </CardContent>
    </Card>
  );
}

export default function ProfileDetails() {
  const t = useTranslations("myProfile");
  const { convexUser, isLoaded, profile, updateProfile } = useConvexProfile();
  const generateUploadUrl = useMutation(
    api.marketplace.freelancers.generateAvatarUploadUrl
  );
  const saveAvatarStorageId = useMutation(
    api.marketplace.freelancers.saveAvatarStorageId
  );
  const generateCoverUrl = useMutation(
    api.marketplace.freelancers.generateCoverUploadUrl
  );
  const saveCoverStorageId = useMutation(
    api.marketplace.freelancers.saveCoverStorageId
  );

  const [displayName, setDisplayName] = useState("");
  const [tagline, setTagline] = useState("");
  const [bio, setBio] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [languagesInput, setLanguagesInput] = useState("");
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
      if (profile.skills && profile.skills.length > 0) {
        setSkillsInput(profile.skills.join(", "));
      }
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

    const skillsArray = skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    const languagesArray = languagesInput
      .split(",")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    try {
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

  if (!isLoaded || convexUser === undefined) {
    return <LoadingSkeleton title={t("loadingProfile")} />;
  }

  if (isLoaded && !convexUser && convexUser !== undefined) {
    return (
      <Card className="mb-6 overflow-hidden">
        <CardHeader className="border-b border-[var(--border-subtle)] pb-4">
          <CardTitle className="text-lg font-semibold">{t("profileDetails")}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-[var(--text-secondary)]">{t("settingUpAccount")}</p>
        </CardContent>
      </Card>
    );
  }

  const isFreelancer = convexUser?.userType === "freelancer";
  if (!isFreelancer && profile === null) {
    return (
      <Card className="mb-6 overflow-hidden">
        <CardHeader className="border-b border-[var(--border-subtle)] pb-4">
          <CardTitle className="text-lg font-semibold">{t("profileDetails")}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("name")}</Label>
              <Input value={convexUser?.name || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label>{t("email")}</Label>
              <Input value={convexUser?.email || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label>{t("accountType")}</Label>
              <Input
                value={
                  convexUser?.userType === "freelancer"
                    ? "Freelancer"
                    : convexUser?.userType === "client"
                    ? "Client"
                    : t("notSet")
                }
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label>Marketplace</Label>
              <Input
                value={
                  convexUser?.preferredWorld === "local"
                    ? "Local marketplace"
                    : convexUser?.preferredWorld === "jobs"
                    ? "Jobs board"
                    : "Online marketplace"
                }
                disabled
              />
            </div>
          </div>
          <Alert variant="info">
            <Info className="h-4 w-4" />
            <AlertDescription>
              {t("switchToFreelancer")}{" "}
              <Link
                href="/onboarding?role=freelancer"
                className="font-medium text-primary hover:underline"
              >
                {t("switchToFreelancerLink")}
              </Link>{" "}
              {t("switchToFreelancerDesc")}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (profile === undefined) {
    return <LoadingSkeleton title={t("loadingProfile")} />;
  }

  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="border-b border-[var(--border-subtle)] pb-4">
        <CardTitle className="text-lg font-semibold">{t("profileDetails")}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Cover image */}
        <div
          className="relative h-40 rounded-md overflow-hidden mb-6"
          style={{
            background: coverPreviewUrl
              ? `url(${coverPreviewUrl}) center/cover`
              : profile?.coverImageUrl
              ? `url(${profile.coverImageUrl}) center/cover`
              : "var(--surface-2)",
          }}
        >
          <label className="absolute bottom-3 right-3 cursor-pointer">
            <Button asChild variant="outline" size="sm">
              <span>
                <Pencil className="mr-1 h-4 w-4" />
                {t("editCover")}
              </span>
            </Button>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files[0];
                if (f) {
                  setSelectedCoverFile(f);
                  setCoverPreviewUrl(URL.createObjectURL(f));
                }
              }}
            />
          </label>
        </div>

        {/* Avatar section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 max-w-2xl">
          <Image
            height={71}
            width={71}
            className="rounded-full object-cover h-[71px] w-[71px] flex-shrink-0"
            src={
              previewUrl
                ? previewUrl
                : profile?.avatarUrl || "/images/team/default-avatar.svg"
            }
            alt="profile"
          />
          <div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
                className="text-[var(--text-tertiary)] hover:text-destructive"
                aria-label="Remove avatar"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  <Upload className="h-4 w-4" />
                  {t("uploadImages")}
                </span>
              </label>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-2">
              {t("imageRequirements")}
            </p>
          </div>
        </div>

        {/* Profile form */}
        <form onSubmit={handleSubmit} className="max-w-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="displayName">{t("displayName")}</Label>
              <Input
                id="displayName"
                placeholder={t("displayNamePlaceholder")}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tagline">{t("tagline")}</Label>
              <Input
                id="tagline"
                placeholder={t("taglinePlaceholder")}
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hourly-rate">{t("hourlyRateLabel")}</Label>
              <Input
                id="hourly-rate"
                type="number"
                placeholder={t("hourlyRatePlaceholder")}
                min="0"
                step="1"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">{t("websiteUrl")}</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://yourwebsite.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">{t("city")}</Label>
              <Input
                id="city"
                placeholder={t("cityPlaceholder")}
                value={locationCity}
                onChange={(e) => setLocationCity(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">{t("country")}</Label>
              <Input
                id="country"
                placeholder={t("countryPlaceholder")}
                value={locationCountry}
                onChange={(e) => setLocationCountry(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">{t("linkedinUrl")}</Label>
              <Input
                id="linkedin"
                type="url"
                placeholder="https://linkedin.com/in/yourprofile"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">{t("twitterUrl")}</Label>
              <Input
                id="twitter"
                type="url"
                placeholder="https://twitter.com/yourhandle"
                value={twitterUrl}
                onChange={(e) => setTwitterUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">{t("githubUrl")}</Label>
              <Input
                id="github"
                type="url"
                placeholder="https://github.com/yourusername"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="languages">{t("languages")}</Label>
              <Input
                id="languages"
                placeholder={t("languagesPlaceholder")}
                value={languagesInput}
                onChange={(e) => setLanguagesInput(e.target.value)}
              />
              <p className="text-xs text-[var(--text-tertiary)]">{t("separateLanguages")}</p>
            </div>
            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="skills">{t("skills")}</Label>
              <Input
                id="skills"
                placeholder={t("skillsPlaceholder")}
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
              />
              <p className="text-xs text-[var(--text-tertiary)]">{t("separateSkills")}</p>
            </div>
            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="bio">{t("introduceYourself")}</Label>
              <Textarea
                id="bio"
                rows={6}
                placeholder={t("bioPlaceholder")}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" disabled={saving || !profile}>
                {saving ? t("saving") : t("saveProfile")}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
