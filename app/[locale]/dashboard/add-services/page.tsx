"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { useQuery, useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PackageForm {
  title: string;
  description: string;
  price: string;
  deliveryDays: string;
  revisionCount: string;
}

interface ServiceForm {
  title: string;
  categoryId: string;
  description: string;
  tags: string[];
  workType: "remote" | "local" | "hybrid";
  locationCity: string;
  locationCountry: string;
  serviceRadiusKm: string;
  pkg: PackageForm;
}

const DEFAULT_PKG: PackageForm = {
  title: "",
  description: "",
  price: "",
  deliveryDays: "7",
  revisionCount: "1",
};

const DEFAULT_FORM: ServiceForm = {
  title: "",
  categoryId: "",
  description: "",
  tags: [],
  workType: "remote",
  locationCity: "",
  locationCountry: "",
  serviceRadiusKm: "",
  pkg: DEFAULT_PKG,
};

// ---------------------------------------------------------------------------
// Slug helper
// ---------------------------------------------------------------------------

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// ---------------------------------------------------------------------------
// Tag input row
// ---------------------------------------------------------------------------

function TagInput({
  tags,
  onChange,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
}) {
  const [input, setInput] = useState("");

  function addTag() {
    const val = input.trim().toLowerCase();
    if (val && !tags.includes(val) && tags.length < 10) {
      onChange([...tags, val]);
      setInput("");
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  }

  function removeTag(tag: string) {
    onChange(tags.filter((t) => t !== tag));
  }

  return (
    <div>
      {tags.length > 0 && (
        <div className="d-flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="badge bg-secondary d-flex align-items-center gap-1 fz12 fw400 py-1 px-2 bdrs4"
            >
              {tag}
              <button
                type="button"
                className="border-0 bg-transparent text-white p-0 ms-1"
                style={{ lineHeight: 1 }}
                onClick={() => removeTag(tag)}
                aria-label={`Remove tag ${tag}`}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="d-flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a tag and press Enter"
          disabled={tags.length >= 10}
          className="form-control ud-form-control"
        />
        <button
          type="button"
          className="ud-btn btn-light-thm bdrs4 px-3"
          onClick={addTag}
          disabled={tags.length >= 10}
        >
          Add
        </button>
      </div>
      <p className="fz12 body-color mt-1">{tags.length}/10 tags</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function AddServicesPage() {
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editSlug = searchParams.get("edit");
  const isEditing = Boolean(editSlug);

  const { user: clerkUser, isLoaded } = useUser();

  const [form, setForm] = useState<ServiceForm>(DEFAULT_FORM);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Convex mutations
  const createGig = useMutation(api.marketplace.gigs.create);
  const updateGig = useMutation(api.marketplace.gigs.update);
  const createPackage = useMutation(api.marketplace.gigs.createPackage);

  // ---------------------------------------------------------------------------
  // Resolve Convex user and freelancer profile
  // ---------------------------------------------------------------------------

  const convexUser = useQuery(
    api.users.getByClerkId,
    clerkUser?.id ? { clerkId: clerkUser.id } : "skip"
  );

  const freelancerProfile = useQuery(
    api.marketplace.freelancers.getByUserId,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );

  // ---------------------------------------------------------------------------
  // Categories (flat list for dropdown)
  // ---------------------------------------------------------------------------

  const rawCategories = useQuery(api.marketplace.categories.list, { locale });

  // Flatten category tree into a flat array for the dropdown
  const categories = rawCategories
    ? flattenCategoryTree(rawCategories as CategoryNode[])
    : [];

  // ---------------------------------------------------------------------------
  // When editing, load the existing gig data
  // ---------------------------------------------------------------------------

  const existingGig = useQuery(
    api.marketplace.gigs.getBySlug,
    editSlug ? { slug: editSlug, locale } : "skip"
  );

  useEffect(() => {
    if (!existingGig) return;
    const firstPkg = existingGig.packages?.[0];
    setForm({
      title: existingGig.title,
      categoryId: existingGig.categoryId ?? "",
      description: existingGig.description,
      tags: existingGig.tags ?? [],
      workType: (existingGig.workType as ServiceForm["workType"]) ?? "remote",
      locationCity: existingGig.locationCity ?? "",
      locationCountry: existingGig.locationCountry ?? "",
      serviceRadiusKm: existingGig.serviceRadiusKm ? String(existingGig.serviceRadiusKm) : "",
      pkg: {
        title: firstPkg?.title ?? "",
        description: firstPkg?.description ?? "",
        price: firstPkg?.price ? String(firstPkg.price) : "",
        deliveryDays: firstPkg?.deliveryDays ? String(firstPkg.deliveryDays) : "7",
        revisionCount: firstPkg?.revisionCount ? String(firstPkg.revisionCount) : "1",
      },
    });
  }, [existingGig]);

  // ---------------------------------------------------------------------------
  // Form helpers
  // ---------------------------------------------------------------------------

  function updateField<K extends keyof ServiceForm>(key: K, value: ServiceForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updatePkg<K extends keyof PackageForm>(key: K, value: PackageForm[K]) {
    setForm((prev) => ({ ...prev, pkg: { ...prev.pkg, [key]: value } }));
  }

  // ---------------------------------------------------------------------------
  // Submit
  // ---------------------------------------------------------------------------

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!freelancerProfile) {
      setErrorMsg("No freelancer profile found. Please complete your profile first.");
      setStatus("error");
      return;
    }

    if (!convexUser) {
      setErrorMsg("User not found. Please sign in again.");
      setStatus("error");
      return;
    }

    // Validation
    if (form.title.trim().length < 10) {
      setErrorMsg("Title must be at least 10 characters.");
      setStatus("error");
      return;
    }
    if (form.description.trim().length < 50) {
      setErrorMsg("Description must be at least 50 characters.");
      setStatus("error");
      return;
    }
    const price = Number(form.pkg.price);
    if (!price || price <= 0) {
      setErrorMsg("Package price must be greater than 0.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      if (isEditing && existingGig) {
        // Update existing gig
        await updateGig({
          gigId: existingGig._id as Id<"gigs">,
          title: form.title.trim(),
          description: form.description.trim(),
          categoryId: form.categoryId
            ? (form.categoryId as Id<"marketplaceCategories">)
            : undefined,
          tags: form.tags,
          workType: form.workType,
          locationCity: form.locationCity.trim() || undefined,
          locationCountry: form.locationCountry.trim() || undefined,
          serviceRadiusKm: form.serviceRadiusKm
            ? Number(form.serviceRadiusKm)
            : undefined,
        });

        setStatus("success");
        setTimeout(() => {
          router.push(`/${locale}/dashboard/manage-services`);
        }, 1200);
      } else {
        // Create new gig
        const slug = `${slugify(form.title.trim())}-${Date.now().toString(36)}`;

        const gigId = await createGig({
          tenantId: convexUser.tenantId as Id<"tenants">,
          freelancerId: freelancerProfile._id as Id<"freelancerProfiles">,
          title: form.title.trim(),
          slug,
          description: form.description.trim(),
          categoryId: form.categoryId
            ? (form.categoryId as Id<"marketplaceCategories">)
            : undefined,
          tags: form.tags.length > 0 ? form.tags : undefined,
          workType: form.workType,
          locationCity: form.locationCity.trim() || undefined,
          locationCountry: form.locationCountry.trim() || undefined,
          serviceRadiusKm: form.serviceRadiusKm
            ? Number(form.serviceRadiusKm)
            : undefined,
          locale,
        });

        // Create the basic package for the gig
        await createPackage({
          gigId: gigId as Id<"gigs">,
          tier: "basic",
          title: form.pkg.title.trim() || form.title.trim(),
          description: form.pkg.description.trim(),
          price,
          currency: "EUR",
          deliveryDays: Number(form.pkg.deliveryDays) || 7,
          revisionCount: Number(form.pkg.revisionCount) || 1,
        });

        setStatus("success");
        setTimeout(() => {
          router.push(`/${locale}/dashboard/manage-services`);
        }, 1200);
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "An unexpected error occurred. Please try again."
      );
    }
  }

  // ---------------------------------------------------------------------------
  // Render: loading
  // ---------------------------------------------------------------------------

  if (!isLoaded || convexUser === undefined || freelancerProfile === undefined) {
    return (
      <div className="dashboard__main pl0-md">
        <div className="dashboard_title_area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="dashbord_title_text text-center py-5">
                  <span className="flaticon-loading fz30 text-thm" />
                  <p className="body-color mt10">Loading…</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Render: not a freelancer
  // ---------------------------------------------------------------------------

  if (convexUser && !freelancerProfile) {
    return (
      <div className="dashboard__main pl0-md">
        <div className="dashboard_title_area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="dashbord_title_text text-center py-5">
                  <span className="flaticon-warning fz30 text-thm" />
                  <h4 className="mt15">No freelancer profile found</h4>
                  <p className="body-color mt10 mb20">
                    Complete your freelancer profile before adding services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const showLocation = form.workType === "local" || form.workType === "hybrid";

  // ---------------------------------------------------------------------------
  // Render: form
  // ---------------------------------------------------------------------------

  return (
    <div className="dashboard__main pl0-md">
      <div className="dashboard_title_area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="dashbord_title_text">
                <h2 className="title">{isEditing ? "Edit Service" : "Add New Service"}</h2>
                <p className="body-color mt5">
                  {isEditing
                    ? "Update the details of your service listing."
                    : "Fill in the details below to create a new service listing."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <form onSubmit={handleSubmit}>

              {/* -------------------------------------------------------
                  Section 1: Basic Information
              ------------------------------------------------------- */}
              <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                <div className="bdrb1 pb15 mb25">
                  <h5 className="title fz17 mb-0">
                    <span className="flaticon-document mr10 text-thm fz15" />
                    Basic Information
                  </h5>
                </div>

                {/* Title */}
                <div className="mb25">
                  <label className="form-label fw500 dark-color mb5">
                    Service Title <span className="text-thm">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control ud-form-control"
                    placeholder="I will design a professional logo for your brand"
                    value={form.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    maxLength={120}
                    required
                  />
                  <p className="fz12 body-color mt-1">{form.title.length}/120 — minimum 10 characters</p>
                </div>

                {/* Category */}
                <div className="mb25">
                  <label className="form-label fw500 dark-color mb5">Category</label>
                  <select
                    className="form-control ud-form-control"
                    value={form.categoryId}
                    onChange={(e) => updateField("categoryId", e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.indent}{cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="mb25">
                  <label className="form-label fw500 dark-color mb5">
                    Description <span className="text-thm">*</span>
                  </label>
                  <textarea
                    className="form-control ud-form-control"
                    rows={7}
                    placeholder="Describe what you will deliver, how you work, and why clients should choose you. Be specific about deliverables, your process, and what makes your service unique."
                    value={form.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    maxLength={5000}
                    required
                  />
                  <p className="fz12 body-color mt-1">{form.description.length}/5000 — minimum 50 characters</p>
                </div>

                {/* Tags */}
                <div className="mb25">
                  <label className="form-label fw500 dark-color mb5">
                    Tags / Skills
                  </label>
                  <TagInput
                    tags={form.tags}
                    onChange={(tags) => updateField("tags", tags)}
                  />
                </div>

                {/* Work Type */}
                <div className="mb25">
                  <label className="form-label fw500 dark-color mb5">Work Type</label>
                  <div className="d-flex gap-3 flex-wrap">
                    {(["remote", "local", "hybrid"] as const).map((wt) => (
                      <label
                        key={wt}
                        className={`d-flex align-items-center gap-2 px-4 py-2 bdrs4 border cursor-pointer fz14 fw500 ${
                          form.workType === wt
                            ? "bg-thm text-white border-thm"
                            : "bg-white dark-color border-color-#e9e9e9"
                        }`}
                        style={{ cursor: "pointer" }}
                      >
                        <input
                          type="radio"
                          name="work_type"
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

                {/* Location fields (conditional) */}
                {showLocation && (
                  <div className="row">
                    <div className="col-sm-6 mb25">
                      <label className="form-label fw500 dark-color mb5">City</label>
                      <input
                        type="text"
                        className="form-control ud-form-control"
                        placeholder="Amsterdam"
                        value={form.locationCity}
                        onChange={(e) => updateField("locationCity", e.target.value)}
                      />
                    </div>
                    <div className="col-sm-6 mb25">
                      <label className="form-label fw500 dark-color mb5">Country</label>
                      <input
                        type="text"
                        className="form-control ud-form-control"
                        placeholder="NL"
                        value={form.locationCountry}
                        onChange={(e) => updateField("locationCountry", e.target.value)}
                      />
                    </div>
                    <div className="col-sm-6 mb25">
                      <label className="form-label fw500 dark-color mb5">
                        Service Radius (km)
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="form-control ud-form-control"
                        placeholder="50"
                        value={form.serviceRadiusKm}
                        onChange={(e) => updateField("serviceRadiusKm", e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* -------------------------------------------------------
                  Section 2: Pricing
              ------------------------------------------------------- */}
              <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                <div className="bdrb1 pb15 mb25">
                  <h5 className="title fz17 mb-0">
                    <span className="flaticon-receipt mr10 text-thm fz15" />
                    Pricing
                  </h5>
                </div>

                <div className="row">
                  {/* Package name */}
                  <div className="col-sm-12 mb25">
                    <label className="form-label fw500 dark-color mb5">
                      Package Name
                    </label>
                    <input
                      type="text"
                      className="form-control ud-form-control"
                      placeholder="Basic Package"
                      value={form.pkg.title}
                      onChange={(e) => updatePkg("title", e.target.value)}
                      maxLength={80}
                    />
                    <p className="fz12 body-color mt-1">Leave blank to use your service title</p>
                  </div>

                  {/* Price */}
                  <div className="col-sm-6 mb25">
                    <label className="form-label fw500 dark-color mb5">
                      Price (€) <span className="text-thm">*</span>
                    </label>
                    <div className="position-relative">
                      <span
                        className="position-absolute top-50 translate-middle-y ps-3 body-color fz15"
                        style={{ left: 0 }}
                      >
                        €
                      </span>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        className="form-control ud-form-control"
                        style={{ paddingLeft: "1.8rem" }}
                        placeholder="50"
                        value={form.pkg.price}
                        onChange={(e) => updatePkg("price", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Delivery days */}
                  <div className="col-sm-6 mb25">
                    <label className="form-label fw500 dark-color mb5">
                      Delivery Days <span className="text-thm">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="form-control ud-form-control"
                      placeholder="7"
                      value={form.pkg.deliveryDays}
                      onChange={(e) => updatePkg("deliveryDays", e.target.value)}
                      required
                    />
                  </div>

                  {/* Revisions */}
                  <div className="col-sm-6 mb25">
                    <label className="form-label fw500 dark-color mb5">Revisions</label>
                    <input
                      type="number"
                      min="0"
                      className="form-control ud-form-control"
                      placeholder="1"
                      value={form.pkg.revisionCount}
                      onChange={(e) => updatePkg("revisionCount", e.target.value)}
                    />
                  </div>

                  {/* Package description */}
                  <div className="col-sm-12 mb0">
                    <label className="form-label fw500 dark-color mb5">Package Description</label>
                    <textarea
                      className="form-control ud-form-control"
                      rows={3}
                      placeholder="What is included in this package?"
                      value={form.pkg.description}
                      onChange={(e) => updatePkg("description", e.target.value)}
                      maxLength={500}
                    />
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------------
                  Section 3: Gallery (placeholder)
              ------------------------------------------------------- */}
              <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                <div className="bdrb1 pb15 mb25">
                  <h5 className="title fz17 mb-0">
                    <span className="flaticon-photo mr10 text-thm fz15" />
                    Gallery
                  </h5>
                </div>

                <div
                  className="text-center py-4 bdrs4"
                  style={{
                    border: "2px dashed #e9e9e9",
                  }}
                >
                  <span className="flaticon-photo fz40 text-thm2 d-block mb15" />
                  <p className="dark-color fw500 mb5">Upload service images</p>
                  <p className="body-color fz14 mb20">
                    Up to 5 images. JPG, PNG, WebP. Max 5MB each.
                  </p>
                  <button type="button" className="ud-btn btn-light-thm bdrs4 px-4">
                    <span className="flaticon-upload mr10" />
                    Browse Files
                  </button>
                </div>
                <p className="fz12 body-color mt15">
                  Image upload will be available in a future update. You can publish your service now and add images later.
                </p>
              </div>

              {/* -------------------------------------------------------
                  Error / success messages
              ------------------------------------------------------- */}
              {status === "error" && errorMsg && (
                <div
                  className="alert bdrs4 mb25 px-4 py-3 fz14"
                  style={{
                    background: "#fff4f4",
                    border: "1px solid #ffcccc",
                    color: "#c0392b",
                  }}
                >
                  <span className="flaticon-warning me-2" />
                  {errorMsg}
                </div>
              )}

              {status === "success" && (
                <div
                  className="alert bdrs4 mb25 px-4 py-3 fz14"
                  style={{
                    background: "#f0faf4",
                    border: "1px solid #b7e4c7",
                    color: "#1e7e34",
                  }}
                >
                  <span className="flaticon-checked me-2" />
                  {isEditing
                    ? "Service updated successfully! Redirecting…"
                    : "Service created and submitted for review! Redirecting…"}
                </div>
              )}

              {/* -------------------------------------------------------
                  Submit button
              ------------------------------------------------------- */}
              <div className="d-flex justify-content-between align-items-center">
                <button
                  type="button"
                  className="ud-btn btn-white bdrs4"
                  onClick={() => router.push(`/${locale}/dashboard/manage-services`)}
                >
                  <span className="flaticon-left-arrow me-2" />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ud-btn btn-thm bdrs4"
                  disabled={status === "submitting" || status === "success"}
                >
                  {status === "submitting" ? (
                    <>
                      <span className="flaticon-loading me-2" />
                      {isEditing ? "Updating…" : "Publishing…"}
                    </>
                  ) : isEditing ? (
                    <>
                      <span className="flaticon-checked me-2" />
                      Update Service
                    </>
                  ) : (
                    <>
                      <span className="flaticon-document me-2" />
                      Publish Service
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* -------------------------------------------------------
              Sidebar: tips
          ------------------------------------------------------- */}
          <div className="col-lg-3">
            <div className="ps-widget bgc-white bdrs4 p30 mb30">
              <h6 className="title fz15 mb20">Tips for a great listing</h6>
              <ul className="p-0 m-0" style={{ listStyle: "none" }}>
                {[
                  "Use a clear, specific title that describes exactly what you offer.",
                  "Write a detailed description — buyers want to know exactly what they get.",
                  "Set a competitive price to attract your first reviews.",
                  "Add relevant tags so buyers can find your service easily.",
                  "Upload images to increase clicks by up to 3x.",
                ].map((tip, i) => (
                  <li key={i} className="d-flex gap-2 mb15 fz14 body-color">
                    <span className="flaticon-checked text-thm flex-shrink-0 mt-1" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="ps-widget bgc-white bdrs4 p30 mb30">
              <h6 className="title fz15 mb15">After publishing</h6>
              <p className="fz14 body-color mb0">
                Your service will be reviewed by our team. Once approved it will be visible
                to buyers on the marketplace. This typically takes 1–2 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Category tree flattener
// ---------------------------------------------------------------------------

interface CategoryNode {
  _id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  children?: CategoryNode[];
}

interface FlatCategory {
  id: string;
  name: string;
  indent: string;
}

function flattenCategoryTree(
  nodes: CategoryNode[],
  depth = 0
): FlatCategory[] {
  const result: FlatCategory[] = [];
  const indent = depth > 0 ? "\u00A0\u00A0".repeat(depth * 2) + "└ " : "";

  for (const node of nodes) {
    result.push({ id: node._id, name: node.name, indent });
    if (node.children && node.children.length > 0) {
      result.push(...flattenCategoryTree(node.children, depth + 1));
    }
  }

  return result;
}
