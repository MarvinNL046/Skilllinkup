"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { useTranslations } from "next-intl";
import DashboardNavigation from "../header/DashboardNavigation";
import ServiceGallery from "./ServiceGallery";
import useConvexProfile from "@/hook/useConvexProfile";
import useConvexCategories from "@/hook/useConvexCategories";
import { flattenLeafMarketplaceCategories } from "@/lib/marketplaceCategories";

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

function worldToServiceType(world) {
  if (world === "local") return "local";
  return "digital"; // online, jobs, default
}

export default function AddServiceInfo() {
  const t = useTranslations("addService");
  const router = useRouter();
  const { convexUser, profile } = useConvexProfile();
  const serviceType = worldToServiceType(convexUser?.preferredWorld);
  const categories = useConvexCategories("en", serviceType);

  const createGig = useMutation(api.marketplace.gigs.create);
  const createPackage = useMutation(api.marketplace.gigs.createPackage);

  // Basic info state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState("");
  const [workType, setWorkType] = useState("remote");
  const [locationCountry, setLocationCountry] = useState("");
  const [locationCity, setLocationCity] = useState("");

  // Package state: three tiers
  const [basicPkg, setBasicPkg] = useState({ ...EMPTY_PACKAGE });
  const [standardPkg, setStandardPkg] = useState({ ...EMPTY_PACKAGE });
  const [premiumPkg, setPremiumPkg] = useState({ ...EMPTY_PACKAGE });

  // UI state
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Helper to update a package field
  const updatePkg = (setter, field, value) => {
    setter((prev) => ({ ...prev, [field]: value }));
  };

  // Check if a package tier has enough data to submit
  const isPkgFilled = (pkg) =>
    pkg.title.trim() && pkg.price && !isNaN(Number(pkg.price)) && pkg.deliveryDays && !isNaN(Number(pkg.deliveryDays));

  const handleSaveAndPublish = async () => {
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

    setSaving(true);
    setSaveError(null);

    try {
      const slug = slugify(title) + "-" + Date.now();

      // Create the gig
      const gigId = await createGig({
        tenantId: convexUser.tenantId,
        freelancerId: profile._id,
        title: title.trim(),
        slug,
        description: description.trim(),
        categoryId: categoryId || undefined,
        tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : undefined,
        workType,
        locationCountry: locationCountry.trim() || undefined,
        locationCity: locationCity.trim() || undefined,
        locale: "en",
      });

      // Create packages for each filled tier
      const tiers = [
        { tier: "basic", pkg: basicPkg },
        { tier: "standard", pkg: standardPkg },
        { tier: "premium", pkg: premiumPkg },
      ];

      for (const { tier, pkg } of tiers) {
        if (isPkgFilled(pkg)) {
          await createPackage({
            gigId,
            tier,
            title: pkg.title.trim(),
            description: pkg.description.trim() || pkg.title.trim(),
            price: Number(pkg.price),
            currency: "EUR",
            deliveryDays: Number(pkg.deliveryDays),
            revisionCount: pkg.revisionCount ? Number(pkg.revisionCount) : undefined,
          });
        }
      }

      setSaveSuccess(true);
      setTimeout(() => {
        router.push("/manage-services");
      }, 1500);
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

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2>{t("pageTitle")}</h2>
              <p className="text">{t("pageDescription")}</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-lg-end">
              <button
                className="ud-btn btn-thm default-box-shadow2"
                onClick={handleSaveAndPublish}
                disabled={saving || !profile}
              >
                {saving ? t("saving") : t("saveAndPublish")}
                <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </div>
        </div>

        <div className="row mb20">
          <div className="col-xl-12">
            <div className="flex items-center gap-2 px-3 py-2 bdrs4" style={{ background: "#f0f9ff", border: "1px solid #bae6fd" }}>
              <i className="flaticon-content fz16" style={{ color: "#0284c7" }} />
              <span className="fz14" style={{ color: "#0369a1" }}>
                {t("lookingToHire")}{" "}
                <Link href="/create-projects" className="fw500" style={{ color: "#0284c7", textDecoration: "underline" }}>
                  {t("createProject")}
                </Link>{" "}
                {t("createProjectHint")}
              </span>
            </div>
          </div>
        </div>

        {saveError && (
          <div className="row mb20">
            <div className="col-xl-12">
              <div className="alert alert-danger" role="alert">
                {saveError}
              </div>
            </div>
          </div>
        )}

        {saveSuccess && (
          <div className="row mb20">
            <div className="col-xl-12">
              <div className="alert alert-success" role="alert">
                {t("successMessage")}
              </div>
            </div>
          </div>
        )}

        {!profile && (
          <div className="row mb20">
            <div className="col-xl-12">
              <div className="alert alert-info" role="alert">
                {t("noProfileError")}
              </div>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-xl-12">
            {/* Basic Information */}
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden relative">
              <div className="bdrb1 pb15 mb25">
                <h5 className="list-title">{t("basicInfo")}</h5>
              </div>
              <div className="col-xl-8">
                <div className="form-style1">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          {t("serviceTitle")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={t("serviceTitlePlaceholder")}
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          {t("category")}
                        </label>
                        <select
                          className="form-control"
                          value={categoryId}
                          onChange={(e) => setCategoryId(e.target.value)}
                        >
                          <option value="">{t("selectCategory")}</option>
                          {flatCategories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                              {cat.label}
                            </option>
                          ))}
                          {categories === undefined && (
                            <option disabled>{t("loadingCategories")}</option>
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          {t("tags")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={t("tagsPlaceholder")}
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          {t("workType")}
                        </label>
                        <select
                          className="form-control"
                          value={workType}
                          onChange={(e) => setWorkType(e.target.value)}
                        >
                          <option value="remote">{t("remote")}</option>
                          <option value="local">{t("localOnsite")}</option>
                          <option value="hybrid">{t("hybrid")}</option>
                        </select>
                      </div>
                    </div>
                    {(workType === "local" || workType === "hybrid") && (
                      <>
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
                      </>
                    )}
                    <div className="col-md-12">
                      <div className="mb10">
                        <label className="heading-color ff-heading fw500 mb10">
                          {t("serviceDescription")}
                        </label>
                        <textarea
                          cols={30}
                          rows={6}
                          placeholder={t("serviceDescriptionPlaceholder")}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Packages */}
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden relative">
              <div className="bdrb1 pb15 mb25">
                <h5 className="list-title">{t("packages")}</h5>
                <p className="text fz14 mt5">
                  {t("packagesDescription")}
                </p>
              </div>
              <div className="row">
                {[
                  { label: t("basic"), pkg: basicPkg, setter: setBasicPkg, required: true },
                  { label: t("standard"), pkg: standardPkg, setter: setStandardPkg, required: false },
                  { label: t("premium"), pkg: premiumPkg, setter: setPremiumPkg, required: false },
                ].map(({ label, pkg, setter, required }) => (
                  <div className="col-md-4" key={label}>
                    <div className="package-tier-card bdr1 bdrs4 p20 mb20">
                      <h6 className="heading-color ff-heading fw600 mb15">
                        {label}
                        {required && <span className="text-danger ms-1">*</span>}
                      </h6>
                      <div className="mb15">
                        <label className="heading-color ff-heading fw500 mb8 fz14">
                          {t("packageName")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={t("packageNamePlaceholder", { tier: label })}
                          value={pkg.title}
                          onChange={(e) => updatePkg(setter, "title", e.target.value)}
                        />
                      </div>
                      <div className="mb15">
                        <label className="heading-color ff-heading fw500 mb8 fz14">
                          {t("description")}
                        </label>
                        <textarea
                          rows={3}
                          className="form-control"
                          placeholder={t("whatIsIncluded")}
                          value={pkg.description}
                          onChange={(e) => updatePkg(setter, "description", e.target.value)}
                        />
                      </div>
                      <div className="mb15">
                        <label className="heading-color ff-heading fw500 mb8 fz14">
                          {t("priceEur")}
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder={t("pricePlaceholder")}
                          min="0"
                          value={pkg.price}
                          onChange={(e) => updatePkg(setter, "price", e.target.value)}
                        />
                      </div>
                      <div className="mb15">
                        <label className="heading-color ff-heading fw500 mb8 fz14">
                          {t("deliveryDays")}
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder={t("deliveryDaysPlaceholder")}
                          min="1"
                          value={pkg.deliveryDays}
                          onChange={(e) => updatePkg(setter, "deliveryDays", e.target.value)}
                        />
                      </div>
                      <div className="mb10">
                        <label className="heading-color ff-heading fw500 mb8 fz14">
                          {t("revisions")}
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder={t("revisionsPlaceholder")}
                          min="0"
                          value={pkg.revisionCount}
                          onChange={(e) => updatePkg(setter, "revisionCount", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ServiceGallery />

            {/* Bottom submit button */}
            <div className="col-xl-12 text-right mb30">
              <button
                className="ud-btn btn-thm default-box-shadow2"
                onClick={handleSaveAndPublish}
                disabled={saving || !profile}
              >
                {saving ? t("saving") : t("saveAndPublish")}
                <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
