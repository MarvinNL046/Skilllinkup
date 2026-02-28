"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import DashboardNavigation from "../header/DashboardNavigation";
import ServiceGallery from "./ServiceGallery";
import useConvexProfile from "@/hook/useConvexProfile";
import useConvexCategories from "@/hook/useConvexCategories";

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

export default function AddServiceInfo() {
  const router = useRouter();
  const { convexUser, profile } = useConvexProfile();
  const categories = useConvexCategories("en");

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
      setSaveError("You must be signed in with a freelancer profile to add a service.");
      return;
    }
    if (!title.trim()) {
      setSaveError("Please enter a service title.");
      return;
    }
    if (!description.trim()) {
      setSaveError("Please enter a service description.");
      return;
    }
    if (!isPkgFilled(basicPkg)) {
      setSaveError("Please complete at least the Basic package (title, price, and delivery days).");
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
      setSaveError(error.message || "Failed to save service. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Flatten the category tree for the dropdown
  const flatCategories = [];
  if (categories) {
    for (const cat of categories) {
      flatCategories.push({ id: cat._id, name: cat.name, indent: false });
      if (cat.children) {
        for (const child of cat.children) {
          flatCategories.push({ id: child._id, name: child.name, indent: true });
        }
      }
    }
  }

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2>Add Services</h2>
              <p className="text">Fill in the details below to publish your new service.</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-lg-end">
              <button
                className="ud-btn btn-dark"
                onClick={handleSaveAndPublish}
                disabled={saving || !profile}
              >
                {saving ? "Saving..." : "Save & Publish"}
                <i className="fal fa-arrow-right-long" />
              </button>
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
                Service created successfully! Redirecting...
              </div>
            </div>
          </div>
        )}

        {!profile && (
          <div className="row mb20">
            <div className="col-xl-12">
              <div className="alert alert-info" role="alert">
                No freelancer profile found. Please set your account type to freelancer first.
              </div>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-xl-12">
            {/* Basic Information */}
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="bdrb1 pb15 mb25">
                <h5 className="list-title">Basic Information</h5>
              </div>
              <div className="col-xl-8">
                <div className="form-style1">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Service Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. I will design your website"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Category
                        </label>
                        <select
                          className="form-control"
                          value={categoryId}
                          onChange={(e) => setCategoryId(e.target.value)}
                        >
                          <option value="">Select a category</option>
                          {flatCategories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.indent ? "\u00a0\u00a0\u2514 " : ""}{cat.name}
                            </option>
                          ))}
                          {categories === undefined && (
                            <option disabled>Loading categories...</option>
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Tags (comma separated)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. web, design, react"
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Work Type
                        </label>
                        <select
                          className="form-control"
                          value={workType}
                          onChange={(e) => setWorkType(e.target.value)}
                        >
                          <option value="remote">Remote</option>
                          <option value="local">Local / On-site</option>
                          <option value="hybrid">Hybrid</option>
                        </select>
                      </div>
                    </div>
                    {(workType === "local" || workType === "hybrid") && (
                      <>
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
                      </>
                    )}
                    <div className="col-md-12">
                      <div className="mb10">
                        <label className="heading-color ff-heading fw500 mb10">
                          Service Description
                        </label>
                        <textarea
                          cols={30}
                          rows={6}
                          placeholder="Describe your service in detail"
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
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="bdrb1 pb15 mb25">
                <h5 className="list-title">Packages</h5>
                <p className="text fz14 mt5">
                  Define your pricing tiers. Basic is required; Standard and Premium are optional.
                </p>
              </div>
              <div className="row">
                {[
                  { label: "Basic", pkg: basicPkg, setter: setBasicPkg, required: true },
                  { label: "Standard", pkg: standardPkg, setter: setStandardPkg, required: false },
                  { label: "Premium", pkg: premiumPkg, setter: setPremiumPkg, required: false },
                ].map(({ label, pkg, setter, required }) => (
                  <div className="col-md-4" key={label}>
                    <div className="package-tier-card bdr1 bdrs4 p20 mb20">
                      <h6 className="heading-color ff-heading fw600 mb15">
                        {label}
                        {required && <span className="text-danger ms-1">*</span>}
                      </h6>
                      <div className="mb15">
                        <label className="heading-color ff-heading fw500 mb8 fz14">
                          Package Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={`e.g. ${label} Package`}
                          value={pkg.title}
                          onChange={(e) => updatePkg(setter, "title", e.target.value)}
                        />
                      </div>
                      <div className="mb15">
                        <label className="heading-color ff-heading fw500 mb8 fz14">
                          Description
                        </label>
                        <textarea
                          rows={3}
                          className="form-control"
                          placeholder="What is included?"
                          value={pkg.description}
                          onChange={(e) => updatePkg(setter, "description", e.target.value)}
                        />
                      </div>
                      <div className="mb15">
                        <label className="heading-color ff-heading fw500 mb8 fz14">
                          Price (EUR)
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="e.g. 50"
                          min="0"
                          value={pkg.price}
                          onChange={(e) => updatePkg(setter, "price", e.target.value)}
                        />
                      </div>
                      <div className="mb15">
                        <label className="heading-color ff-heading fw500 mb8 fz14">
                          Delivery Days
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="e.g. 3"
                          min="1"
                          value={pkg.deliveryDays}
                          onChange={(e) => updatePkg(setter, "deliveryDays", e.target.value)}
                        />
                      </div>
                      <div className="mb10">
                        <label className="heading-color ff-heading fw500 mb8 fz14">
                          Revisions
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="e.g. 2"
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
            <div className="col-xl-12 text-end mb30">
              <button
                className="ud-btn btn-dark"
                onClick={handleSaveAndPublish}
                disabled={saving || !profile}
              >
                {saving ? "Saving..." : "Save & Publish"}
                <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
