"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import TagsInput from "@/components/ui/TagsInput";
import { useTranslations } from "next-intl";
import DashboardNavigation from "../header/DashboardNavigation";
import ServiceImagePicker from "./ServiceImagePicker";
import useConvexProfile from "@/hook/useConvexProfile";
import useConvexCategories from "@/hook/useConvexCategories";
import { flattenLeafMarketplaceCategories } from "@/lib/marketplaceCategories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowRight, AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const EMPTY_PACKAGE = {
  title: "",
  description: "",
  price: "",
  deliveryDays: "",
  revisionCount: "",
};
const enhanced = process.env.NEXT_PUBLIC_SERVICE_EDITOR_ENABLED === "1";

function worldToServiceType(world) {
  if (world === "local") return "local";
  return "digital";
}

export default function AddServiceInfo() {
  const t = useTranslations("addService");
  const router = useRouter();
  const { convexUser, profile } = useConvexProfile();
  const serviceType = worldToServiceType(convexUser?.preferredWorld);
  const categories = useConvexCategories("en", serviceType);

  const createGig = useMutation(enhanced ? api.marketplace.serviceEditor.create : api.marketplace.gigs.create);
  const createPackage = useMutation(api.marketplace.gigs.createPackage);
  const removeGig = useMutation(api.marketplace.gigs.remove);
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState([]);
  const [workType, setWorkType] = useState("remote");
  const [locationCountry, setLocationCountry] = useState("");
  const [locationCity, setLocationCity] = useState("");

  const [basicPkg, setBasicPkg] = useState({ ...EMPTY_PACKAGE });
  const [standardPkg, setStandardPkg] = useState({ ...EMPTY_PACKAGE });
  const [premiumPkg, setPremiumPkg] = useState({ ...EMPTY_PACKAGE });

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const updatePkg = (setter, field, value) => {
    setter((prev) => ({ ...prev, [field]: value }));
  };

  const isPkgFilled = (pkg) =>
    pkg.title.trim() &&
    pkg.price &&
    Number.isFinite(Number(pkg.price)) && Number(pkg.price) > 0 &&
    pkg.deliveryDays &&
    Number.isInteger(Number(pkg.deliveryDays)) && Number(pkg.deliveryDays) > 0 &&
    (!pkg.revisionCount || (Number.isInteger(Number(pkg.revisionCount)) && Number(pkg.revisionCount) >= 0));

  const handleSaveAndPublish = async () => {
    if (saving || saveSuccess || uploading) return;
    if (!profile?._id || !convexUser) {
      setSaveError(t("mustBeSignedIn"));
      return;
    }
    if (!title.trim()) {
      setSaveError(t("enterTitle"));
      return;
    }
    if (!description.trim()) {
      setSaveError(t("enterDescription"));
      return;
    }
    if (!isPkgFilled(basicPkg)) {
      setSaveError(t("completeBasicPackage"));
      return;
    }
    for (const pkg of [standardPkg, premiumPkg]) {
      if (Object.values(pkg).some((value) => value.trim()) && !isPkgFilled(pkg)) {
        setSaveError("Complete each package you started: a name, positive price, whole delivery days and non-negative whole revisions.");
        return;
      }
    }

    setSaving(true);
    setSaveError(null);

    try {
      const slug = slugify(title) + "-" + Date.now();

      const service = {
        freelancerId: profile._id,
        title: title.trim(),
        slug,
        description: description.trim(),
        categoryId: categoryId || undefined,
        tags: tags.length > 0 ? tags : undefined,
        workType,
        locationCountry: locationCountry.trim() || undefined,
        locationCity: locationCity.trim() || undefined,
        locale: "en",
        imageUrls,
        packages: [
        { tier: "basic", pkg: basicPkg },
        { tier: "standard", pkg: standardPkg },
        { tier: "premium", pkg: premiumPkg },
        ].filter(({ pkg }) => isPkgFilled(pkg)).map(({ tier, pkg }) => ({
            tier,
            title: pkg.title.trim(),
            description: pkg.description.trim() || pkg.title.trim(),
            price: Number(pkg.price),
            deliveryDays: Number(pkg.deliveryDays),
            revisionCount: pkg.revisionCount
              ? Number(pkg.revisionCount)
              : undefined,
          })),
      };
      if (enhanced) await createGig(service);
      else {
        const { packages, imageUrls: unusedImages, ...fields } = service;
        void unusedImages;
        const gigId = await createGig({ ...fields, tenantId: convexUser.tenantId });
        try { for (const pkg of packages) await createPackage({ ...pkg, gigId, currency: "EUR" }); }
        catch (cause) { await removeGig({ gigId }); throw cause; }
      }

      setSaveSuccess(true);
      router.push("/manage-services");
    } catch (error) {
      console.error("Failed to create gig:", error);
      setSaveError(error.message || t("failedToSave"));
    } finally {
      setSaving(false);
    }
  };

  const flatCategories = categories
    ? flattenLeafMarketplaceCategories(categories)
    : [];

  const SaveButton = () => (
    <Button
      onClick={handleSaveAndPublish}
      disabled={saving || saveSuccess || uploading || !profile}
      className="whitespace-nowrap"
    >
      {saving ? t("saving") : t("saveAndPublish")}
      <ArrowRight className="ml-1 h-4 w-4" />
    </Button>
  );

  return (
    <div className="dashboard__content hover-bgc-color">
      <DashboardNavigation />

      <div className="dashboard_title_area mb-6">
        <div>
          <h1>{t("pageTitle")}</h1>
          <p className="text-[var(--text-secondary)]">{t("pageDescription")}</p>
        </div>
        <SaveButton />
      </div>

      <Alert variant="info" className="mb-5">
        <Info className="h-4 w-4" />
        <AlertDescription>
          {t("lookingToHire")}{" "}
          <Link
            href="/create-projects"
            className="font-medium text-primary hover:underline"
          >
            {t("createProject")}
          </Link>{" "}
          {t("createProjectHint")}
        </AlertDescription>
      </Alert>

      {saveError && (
        <Alert variant="destructive" className="mb-5">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{saveError}</AlertDescription>
        </Alert>
      )}

      {saveSuccess && (
        <Alert variant="success" className="mb-5">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>{t("successMessage")}</AlertDescription>
        </Alert>
      )}

      {profile === null && (
        <Alert variant="warning" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="font-semibold mb-1">{t("noProfileError")}</div>
            <Button asChild size="sm" className="mt-2">
              <Link href="/onboarding?role=freelancer">
                {t("switchToFreelancerLink")}
              </Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Basic Information */}
      <Card className="mb-6 overflow-hidden">
        <CardHeader className="border-b border-[var(--border-subtle)] pb-4">
          <CardTitle className="text-lg font-semibold">{t("basicInfo")}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl">
            <div className="space-y-2">
              <Label htmlFor="gig-title">{t("serviceTitle")}</Label>
              <Input
                id="gig-title"
                placeholder={t("serviceTitlePlaceholder")}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gig-category">{t("category")}</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger id="gig-category">
                  <SelectValue
                    placeholder={
                      categories === undefined
                        ? t("loadingCategories")
                        : t("selectCategory")
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {flatCategories.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gig-tags">{t("tags")}</Label>
              <TagsInput
                value={tags}
                onChange={setTags}
                placeholder={t("tagsPlaceholder")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gig-work-type">{t("workType")}</Label>
              <Select value={workType} onValueChange={setWorkType}>
                <SelectTrigger id="gig-work-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remote">{t("remote")}</SelectItem>
                  <SelectItem value="local">{t("localOnsite")}</SelectItem>
                  <SelectItem value="hybrid">{t("hybrid")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {(workType === "local" || workType === "hybrid") && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="gig-country">{t("country")}</Label>
                  <Input
                    id="gig-country"
                    placeholder={t("countryPlaceholder")}
                    value={locationCountry}
                    onChange={(e) => setLocationCountry(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gig-city">{t("city")}</Label>
                  <Input
                    id="gig-city"
                    placeholder={t("cityPlaceholder")}
                    value={locationCity}
                    onChange={(e) => setLocationCity(e.target.value)}
                  />
                </div>
              </>
            )}
            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="gig-description">{t("serviceDescription")}</Label>
              <Textarea
                id="gig-description"
                rows={6}
                placeholder={t("serviceDescriptionPlaceholder")}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Packages */}
      <Card className="mb-6 overflow-hidden">
        <CardHeader className="border-b border-[var(--border-subtle)] pb-4">
          <CardTitle className="text-lg font-semibold">{t("packages")}</CardTitle>
          <p className="text-sm text-[var(--text-secondary)]">
            {t("packagesDescription")}
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {[
              { label: t("basic"), pkg: basicPkg, setter: setBasicPkg, required: true },
              { label: t("standard"), pkg: standardPkg, setter: setStandardPkg, required: false },
              { label: t("premium"), pkg: premiumPkg, setter: setPremiumPkg, required: false },
            ].map(({ label, pkg, setter, required }) => (
              <Card key={label}>
                <CardContent className="p-5 space-y-4">
                  <h6 className="text-base font-semibold">
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                  </h6>
                  <div className="space-y-2">
                    <Label htmlFor={`pkg-name-${label}`} className="text-sm">
                      {t("packageName")}
                    </Label>
                    <Input
                      id={`pkg-name-${label}`}
                      placeholder={t("packageNamePlaceholder", { tier: label })}
                      value={pkg.title}
                      onChange={(e) => updatePkg(setter, "title", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`pkg-desc-${label}`} className="text-sm">
                      {t("description")}
                    </Label>
                    <Textarea
                      id={`pkg-desc-${label}`}
                      rows={3}
                      placeholder={t("whatIsIncluded")}
                      value={pkg.description}
                      onChange={(e) =>
                        updatePkg(setter, "description", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`pkg-price-${label}`} className="text-sm">
                      {t("priceEur")}
                    </Label>
                    <Input
                      id={`pkg-price-${label}`}
                      type="number"
                      placeholder={t("pricePlaceholder")}
                      min="0.01"
                      step="0.01"
                      value={pkg.price}
                      onChange={(e) => updatePkg(setter, "price", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`pkg-days-${label}`} className="text-sm">
                      {t("deliveryDays")}
                    </Label>
                    <Input
                      id={`pkg-days-${label}`}
                      type="number"
                      placeholder={t("deliveryDaysPlaceholder")}
                      min="1"
                      value={pkg.deliveryDays}
                      onChange={(e) =>
                        updatePkg(setter, "deliveryDays", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`pkg-rev-${label}`} className="text-sm">
                      {t("revisions")}
                    </Label>
                    <Input
                      id={`pkg-rev-${label}`}
                      type="number"
                      placeholder={t("revisionsPlaceholder")}
                      min="0"
                      value={pkg.revisionCount}
                      onChange={(e) =>
                        updatePkg(setter, "revisionCount", e.target.value)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {enhanced && <Card className="mb-6"><CardContent className="pt-6"><ServiceImagePicker value={imageUrls} onChange={setImageUrls} disabled={saving || saveSuccess} onBusyChange={setUploading} /></CardContent></Card>}

      {/* Bottom submit button */}
      <div className="flex justify-end mb-8">
        <SaveButton />
      </div>
    </div>
  );
}
