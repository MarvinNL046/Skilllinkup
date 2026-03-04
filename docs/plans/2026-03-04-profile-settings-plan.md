# Profile & Settings Page — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform `/my-profile` into a full-featured tabbed profile editor (Profile / Portfolio / Experience / Settings) for all user types.

**Architecture:** Single route `/my-profile` with URL-based tab state (`?tab=`). Each tab is an independent React component. Backend is Convex with new tables per phase. Each of the 4 phases is independently deployable.

**Tech Stack:** Next.js 15, React 19, Convex (backend + file storage), Clerk (auth), Bootstrap modal pattern, Tailwind + existing CSS classes.

**Design doc:** `docs/plans/2026-03-04-profile-settings-design.md`

---

## Phase 1 — Tab Infrastructure + Profile Tab Extension

### Task 1: Add tab bar to MyProfileInfo.jsx

**Files:**
- Modify: `src/components/dashboard/section/MyProfileInfo.jsx`

**Context:** Currently this file renders only `<ProfileDetails />`. We convert it to a tab-aware wrapper that reads `?tab=` from the URL and renders the correct tab component. Uses Next.js `useSearchParams` + `useRouter`.

**Step 1: Rewrite MyProfileInfo.jsx**

```jsx
"use client";
import { useSearchParams, useRouter } from "next/navigation";
import DashboardNavigation from "../header/DashboardNavigation";
import ProfileDetails from "./ProfileDetails";

const TABS = [
  { key: "profile", label: "Profile" },
  { key: "portfolio", label: "Portfolio" },
  { key: "experience", label: "Experience" },
  { key: "settings", label: "Settings" },
];

export default function MyProfileInfo() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "profile";

  const setTab = (key) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", key);
    router.push(`/my-profile?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-9">
          <div className="dashboard_title_area">
            <h2>My Profile</h2>
            <p className="text">Manage your profile, portfolio, and settings.</p>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="row mb20">
        <div className="col-xl-12">
          <div className="navtab-style1">
            <nav>
              <div className="nav nav-tabs">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    className={`nav-link fw500 ps-0 ${activeTab === tab.key ? "active" : ""}`}
                    onClick={() => setTab(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="row">
        <div className="col-xl-12">
          {activeTab === "profile" && <ProfileDetails />}
          {activeTab === "portfolio" && (
            <div className="ps-widget bgc-white bdrs4 p30 mb30">
              <p className="text fz15">Portfolio tab — coming soon.</p>
            </div>
          )}
          {activeTab === "experience" && (
            <div className="ps-widget bgc-white bdrs4 p30 mb30">
              <p className="text fz15">Experience tab — coming soon.</p>
            </div>
          )}
          {activeTab === "settings" && (
            <div className="ps-widget bgc-white bdrs4 p30 mb30">
              <p className="text fz15">Settings tab — coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Verify visually**

Navigate to `http://localhost:3000/my-profile`. You should see 4 tab buttons. Clicking each updates the URL (`?tab=portfolio` etc.) and shows the placeholder text. Profile tab shows the existing form. No console errors.

**Step 3: Commit**

```bash
git add src/components/dashboard/section/MyProfileInfo.jsx
git commit -m "feat: add tabbed navigation to /my-profile page"
```

---

### Task 2: Extend Convex schema for Profile tab fields

**Files:**
- Modify: `convex/schema.ts` — add 4 fields to `freelancerProfiles`
- Modify: `convex/marketplace/freelancers.ts` — add args to `updateProfile`

**Context:** The `freelancerProfiles` table needs 4 new optional fields. The `updateProfile` mutation already uses a loop over `Object.entries(fields)` so it automatically handles new optional args — just add them to the `args` validator.

**Step 1: Add fields to schema.ts**

In the `freelancerProfiles` defineTable, after `linkedinUrl`, add:

```typescript
    twitterUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    profileVisibility: v.optional(v.string()), // "public" | "private"
    contactPermission: v.optional(v.string()), // "everyone" | "clients_only" | "nobody"
```

**Step 2: Add args to updateProfile in freelancers.ts**

In the `updateProfile` mutation args block (after `linkedinUrl`), add:

```typescript
    twitterUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
```

(profileVisibility and contactPermission are handled in the Settings tab in Phase 4.)

**Step 3: Add cover image mutations to freelancers.ts**

After the existing `saveAvatarStorageId` mutation, add:

```typescript
export const generateCoverUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");
    return await ctx.storage.generateUploadUrl();
  },
});

export const saveCoverStorageId = mutation({
  args: {
    profileId: v.id("freelancerProfiles"),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");
    const url = await ctx.storage.getUrl(args.storageId);
    if (!url) throw new Error("Failed to get storage URL");
    await ctx.db.patch(args.profileId, { coverImageUrl: url, updatedAt: Date.now() });
    return url;
  },
});
```

**Step 4: Push schema to Convex**

```bash
npx convex dev
```

Wait for Convex to accept the schema (no errors in terminal). New fields are optional so no data migration needed.

**Step 5: Commit**

```bash
git add convex/schema.ts convex/marketplace/freelancers.ts
git commit -m "feat: extend freelancerProfiles schema with cover image and social links"
```

---

### Task 3: Extend ProfileDetails.jsx with cover image + social fields

**Files:**
- Modify: `src/components/dashboard/section/ProfileDetails.jsx`

**Context:** Add cover image upload section at the top (same pattern as avatar: generateUploadUrl → direct fetch → saveStorageId). Add Twitter and GitHub URL inputs to the form. Pre-fill from profile data.

**Step 1: Add state variables and mutations**

At the top of `ProfileDetails`, after the existing `saveAvatarStorageId` mutation line, add:

```jsx
const generateCoverUrl = useMutation(api.marketplace.freelancers.generateCoverUploadUrl);
const saveCoverStorageId = useMutation(api.marketplace.freelancers.saveCoverStorageId);
```

Add state variables after existing ones:

```jsx
const [twitterUrl, setTwitterUrl] = useState("");
const [githubUrl, setGithubUrl] = useState("");
const [selectedCoverFile, setSelectedCoverFile] = useState(null);
const [coverPreviewUrl, setCoverPreviewUrl] = useState(null);
```

**Step 2: Pre-fill in useEffect**

In the `useEffect` that pre-fills form fields, add:

```jsx
setTwitterUrl(profile.twitterUrl || "");
setGithubUrl(profile.githubUrl || "");
```

**Step 3: Handle cover upload in handleSubmit**

Before `await updateProfile(...)`, add (same pattern as avatar):

```jsx
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
```

**Step 4: Add twitterUrl and githubUrl to updateProfile call**

```jsx
twitterUrl: twitterUrl || undefined,
githubUrl: githubUrl || undefined,
```

**Step 5: Add cover image UI section**

At the very top of the returned JSX (before the avatar section), add:

```jsx
{/* Cover image */}
<div className="mb25">
  <div
    className="position-relative bdrs4 overflow-hidden"
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
      className="position-absolute bottom-0 end-0 m-2 ud-btn btn-white btn-sm"
      style={{ cursor: "pointer" }}
    >
      <input
        type="file"
        accept=".png,.jpg,.jpeg"
        className="d-none"
        onChange={(e) => {
          const f = e.target.files[0];
          if (f) { setSelectedCoverFile(f); setCoverPreviewUrl(URL.createObjectURL(f)); }
        }}
      />
      <i className="flaticon-pencil me-1" /> Edit Cover
    </label>
  </div>
</div>
```

**Step 6: Add Twitter/GitHub inputs to form**

After the LinkedIn URL input block, add two new input blocks:

```jsx
{/* Twitter/X URL */}
<div className="col-sm-6">
  <div className="mb20">
    <label className="heading-color ff-heading fw500 mb10">Twitter / X URL</label>
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
    <label className="heading-color ff-heading fw500 mb10">GitHub URL</label>
    <input
      type="url"
      className="form-control"
      placeholder="https://github.com/yourusername"
      value={githubUrl}
      onChange={(e) => setGithubUrl(e.target.value)}
    />
  </div>
</div>
```

**Step 7: Verify visually**

Go to `http://localhost:3000/my-profile?tab=profile`. You should see:
- A grey cover image banner (160px tall) with an "Edit Cover" button
- Twitter and GitHub URL fields in the form
- Saving the form works (no console errors, toast shows)

**Step 8: Commit**

```bash
git add src/components/dashboard/section/ProfileDetails.jsx
git commit -m "feat: add cover image upload and social links to profile tab"
```

---

## Phase 2 — Portfolio Tab

### Task 4: Create Convex portfolio table and mutations

**Files:**
- Modify: `convex/schema.ts`
- Create: `convex/marketplace/portfolio.ts`

**Step 1: Add portfolioProjects table to schema.ts**

After the `userCertifications` table (or at end of marketplace section), add:

```typescript
  portfolioProjects: defineTable({
    userId: v.id("users"),
    tenantId: v.id("tenants"),
    title: v.string(),
    description: v.optional(v.string()),
    imageUrls: v.optional(v.array(v.string())),
    tags: v.optional(v.array(v.string())),
    externalUrl: v.optional(v.string()),
    sortOrder: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),
```

**Step 2: Create convex/marketplace/portfolio.ts**

```typescript
import { v } from "convex/values";
import { query, mutation } from "../_generated/server";

export const getByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("portfolioProjects")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("asc")
      .collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    imageUrls: v.optional(v.array(v.string())),
    tags: v.optional(v.array(v.string())),
    externalUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");
    const user = await ctx.db.query("users").withIndex("by_email", (q) => q.eq("email", identity.email!)).first();
    if (!user) throw new Error("User not found");
    const tenant = await ctx.db.query("tenants").first();
    if (!tenant) throw new Error("No tenant found");
    const now = Date.now();
    return await ctx.db.insert("portfolioProjects", {
      userId: user._id,
      tenantId: tenant._id,
      title: args.title,
      description: args.description,
      imageUrls: args.imageUrls,
      tags: args.tags,
      externalUrl: args.externalUrl,
      sortOrder: now,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    projectId: v.id("portfolioProjects"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    imageUrls: v.optional(v.array(v.string())),
    tags: v.optional(v.array(v.string())),
    externalUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");
    const { projectId, ...fields } = args;
    const project = await ctx.db.get(projectId);
    if (!project) throw new Error("Project not found");
    const patch: Record<string, unknown> = { updatedAt: Date.now() };
    for (const [k, v] of Object.entries(fields)) {
      if (v !== undefined) patch[k] = v;
    }
    await ctx.db.patch(projectId, patch);
    return projectId;
  },
});

export const remove = mutation({
  args: { projectId: v.id("portfolioProjects") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");
    const project = await ctx.db.get(args.projectId);
    if (!project) throw new Error("Project not found");
    await ctx.db.delete(args.projectId);
    return args.projectId;
  },
});

export const generateImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");
    return await ctx.storage.generateUploadUrl();
  },
});
```

**Step 3: Push schema**

```bash
npx convex dev
```

Wait for no errors.

**Step 4: Commit**

```bash
git add convex/schema.ts convex/marketplace/portfolio.ts
git commit -m "feat: add portfolioProjects Convex table and CRUD mutations"
```

---

### Task 5: Build PortfolioTab component

**Files:**
- Create: `src/components/dashboard/section/PortfolioTab.jsx`
- Create: `src/components/dashboard/modal/PortfolioProjectModal.jsx`

**Step 1: Create PortfolioProjectModal.jsx**

```jsx
"use client";
import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import Image from "next/image";

export default function PortfolioProjectModal({ project, onClose }) {
  const createProject = useMutation(api.marketplace.portfolio.create);
  const updateProject = useMutation(api.marketplace.portfolio.update);
  const generateUploadUrl = useMutation(api.marketplace.portfolio.generateImageUploadUrl);

  const isEdit = !!project;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setDescription(project.description || "");
      setTagsInput((project.tags || []).join(", "));
      setExternalUrl(project.externalUrl || "");
      setImageUrls(project.imageUrls || []);
    } else {
      setTitle(""); setDescription(""); setTagsInput(""); setExternalUrl(""); setImageUrls([]);
    }
  }, [project]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files).slice(0, 5 - imageUrls.length);
    if (files.length === 0) return;
    setUploading(true);
    try {
      const urls = await Promise.all(files.map(async (file) => {
        const uploadUrl = await generateUploadUrl();
        const res = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        if (!res.ok) throw new Error("Upload failed");
        const { storageId } = await res.json();
        // Store storageId as URL placeholder — resolved on read via Convex
        // For simplicity, use object URL for preview; save storageId as url
        return storageId;
      }));
      setImageUrls((prev) => [...prev, ...urls].slice(0, 5));
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (idx) => setImageUrls((prev) => prev.filter((_, i) => i !== idx));

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim()) { toast.error("Title is required"); return; }
    setSaving(true);
    const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
    try {
      if (isEdit) {
        await updateProject({ projectId: project._id, title, description: description || undefined, imageUrls, tags, externalUrl: externalUrl || undefined });
        toast.success("Project updated");
      } else {
        await createProject({ title, description: description || undefined, imageUrls, tags, externalUrl: externalUrl || undefined });
        toast.success("Project added");
      }
      onClose?.();
    } catch (err) {
      toast.error(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal fade" id="portfolioModal" tabIndex={-1}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEdit ? "Edit Project" : "Add Portfolio Project"}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" />
          </div>
          <form onSubmit={handleSave}>
            <div className="modal-body p30">
              <div className="mb20">
                <label className="heading-color ff-heading fw500 mb10">Title *</label>
                <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. E-commerce website redesign" required />
              </div>
              <div className="mb20">
                <label className="heading-color ff-heading fw500 mb10">Description</label>
                <textarea className="form-control pt15" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What did you build and what was the outcome?" />
              </div>
              <div className="mb20">
                <label className="heading-color ff-heading fw500 mb10">Tags</label>
                <input className="form-control" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="e.g. React, UI Design, Figma" />
                <small className="text-muted">Separate with commas</small>
              </div>
              <div className="mb20">
                <label className="heading-color ff-heading fw500 mb10">External Link</label>
                <input type="url" className="form-control" value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} placeholder="https://..." />
              </div>
              <div className="mb20">
                <label className="heading-color ff-heading fw500 mb10">Images ({imageUrls.length}/5)</label>
                <div className="d-flex flex-wrap gap-2 mb10">
                  {imageUrls.map((url, idx) => (
                    <div key={idx} className="position-relative" style={{ width: 80, height: 80 }}>
                      <div className="bdrs4 overflow-hidden" style={{ width: 80, height: 80, background: "#eee", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span className="fz12 text-muted">img {idx + 1}</span>
                      </div>
                      <button type="button" className="position-absolute top-0 end-0 btn btn-sm btn-danger p-0" style={{ width: 20, height: 20, fontSize: 10 }} onClick={() => removeImage(idx)}>×</button>
                    </div>
                  ))}
                  {imageUrls.length < 5 && (
                    <label className="bdrs4 bdr1 d-flex align-items-center justify-content-center text-muted" style={{ width: 80, height: 80, cursor: "pointer" }}>
                      <input type="file" accept="image/*" multiple className="d-none" onChange={handleImageUpload} disabled={uploading} />
                      {uploading ? "..." : "+ Add"}
                    </label>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="ud-btn btn-white" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" className="ud-btn btn-thm" disabled={saving}>{saving ? "Saving..." : isEdit ? "Save Changes" : "Add Project"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Create PortfolioTab.jsx**

```jsx
"use client";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import { toast } from "sonner";
import PortfolioProjectModal from "../modal/PortfolioProjectModal";

function ProjectCard({ project, onEdit, onDelete }) {
  const tags = project.tags || [];
  const hasImages = project.imageUrls && project.imageUrls.length > 0;

  return (
    <div className="col-sm-6 col-lg-4 mb20">
      <div className="ps-widget bgc-white bdrs4 overflow-hidden position-relative">
        {/* Thumbnail */}
        <div style={{ height: 160, background: hasImages ? "#ddd" : "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {hasImages
            ? <span className="fz13 text-muted">{project.imageUrls.length} image{project.imageUrls.length !== 1 ? "s" : ""}</span>
            : <span className="flaticon-photo fz30 text-muted" />}
        </div>
        <div className="p15">
          <h6 className="mb5">{project.title}</h6>
          {project.description && <p className="fz13 text mb10" style={{ WebkitLineClamp: 2, overflow: "hidden", display: "-webkit-box", WebkitBoxOrient: "vertical" }}>{project.description}</p>}
          {tags.length > 0 && (
            <div className="d-flex flex-wrap gap-1 mb10">
              {tags.map((tag, i) => <span key={i} className="badge bg-light text-dark fz11">{tag}</span>)}
            </div>
          )}
          <div className="d-flex gap-2">
            <button className="ud-btn btn-white btn-sm" onClick={() => onEdit(project)} data-bs-toggle="modal" data-bs-target="#portfolioModal">
              <span className="flaticon-pencil me-1" />Edit
            </button>
            <button className="ud-btn btn-white btn-sm text-danger" onClick={() => onDelete(project._id)}>
              <span className="flaticon-delete" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioTab() {
  const { convexUser, isLoaded } = useConvexUser();
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = useQuery(
    api.marketplace.portfolio.getByUser,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );
  const removeProject = useMutation(api.marketplace.portfolio.remove);

  const handleDelete = async (projectId) => {
    if (!confirm("Delete this portfolio project?")) return;
    try {
      await removeProject({ projectId });
      toast.success("Project deleted");
    } catch (err) {
      toast.error(err.message || "Failed to delete");
    }
  };

  const handleAddNew = () => setSelectedProject(null);

  if (!isLoaded || projects === undefined) {
    return <div className="ps-widget bgc-white bdrs4 p30 mb30"><div className="spinner-border text-thm" role="status" /></div>;
  }

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30">
        <div className="d-flex justify-content-between align-items-center bdrb1 pb15 mb25">
          <h5 className="list-title">Portfolio Projects</h5>
          <button className="ud-btn btn-thm btn-sm" data-bs-toggle="modal" data-bs-target="#portfolioModal" onClick={handleAddNew}>
            + Add Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py30">
            <span className="flaticon-photo fz40 text-muted" />
            <p className="text mt10 mb15">No portfolio projects yet. Add your first project!</p>
            <button className="ud-btn btn-thm" data-bs-toggle="modal" data-bs-target="#portfolioModal" onClick={handleAddNew}>
              + Add Project
            </button>
          </div>
        ) : (
          <div className="row">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} onEdit={setSelectedProject} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      <PortfolioProjectModal
        project={selectedProject}
        onClose={() => {
          setSelectedProject(null);
          // Close modal programmatically
          document.getElementById("portfolioModal")?.querySelector("[data-bs-dismiss]")?.click();
        }}
      />
    </>
  );
}
```

**Step 3: Wire PortfolioTab into MyProfileInfo.jsx**

Replace the portfolio placeholder in `MyProfileInfo.jsx`:

```jsx
import PortfolioTab from "./PortfolioTab";
// ...
{activeTab === "portfolio" && <PortfolioTab />}
```

**Step 4: Verify visually**

Go to `http://localhost:3000/my-profile?tab=portfolio`. You should see:
- "Portfolio Projects" heading + "Add Project" button
- Empty state with icon and CTA
- Clicking "Add Project" opens a modal with title/description/tags/images fields
- Adding a project shows it as a card in the grid

**Step 5: Commit**

```bash
git add src/components/dashboard/section/PortfolioTab.jsx \
        src/components/dashboard/modal/PortfolioProjectModal.jsx \
        src/components/dashboard/section/MyProfileInfo.jsx
git commit -m "feat: add Portfolio tab with project cards and Convex CRUD"
```

---

## Phase 3 — Experience Tab

### Task 6: Create Convex experience tables and mutations

**Files:**
- Modify: `convex/schema.ts`
- Create: `convex/marketplace/experience.ts`

**Step 1: Add 3 tables to schema.ts**

```typescript
  workExperience: defineTable({
    userId: v.id("users"),
    tenantId: v.id("tenants"),
    company: v.string(),
    title: v.string(),
    startDate: v.number(),
    endDate: v.optional(v.number()),
    isCurrent: v.optional(v.boolean()),
    description: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  education: defineTable({
    userId: v.id("users"),
    tenantId: v.id("tenants"),
    school: v.string(),
    degree: v.optional(v.string()),
    field: v.optional(v.string()),
    startYear: v.optional(v.number()),
    endYear: v.optional(v.number()),
    description: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  userCertifications: defineTable({
    userId: v.id("users"),
    tenantId: v.id("tenants"),
    name: v.string(),
    issuer: v.optional(v.string()),
    year: v.optional(v.number()),
    url: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),
```

**Step 2: Create convex/marketplace/experience.ts**

```typescript
import { v } from "convex/values";
import { query, mutation } from "../_generated/server";

async function requireUser(ctx: any) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Authentication required");
  const user = await ctx.db.query("users").withIndex("by_email", (q: any) => q.eq("email", identity.email!)).first();
  if (!user) throw new Error("User not found");
  const tenant = await ctx.db.query("tenants").first();
  if (!tenant) throw new Error("No tenant found");
  return { user, tenant };
}

// ---- Work Experience ----

export const getWorkExperience = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.query("workExperience").withIndex("by_user", (q) => q.eq("userId", args.userId)).order("desc").collect();
  },
});

export const addWorkExperience = mutation({
  args: {
    company: v.string(),
    title: v.string(),
    startDate: v.number(),
    endDate: v.optional(v.number()),
    isCurrent: v.optional(v.boolean()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { user, tenant } = await requireUser(ctx);
    const now = Date.now();
    return await ctx.db.insert("workExperience", { ...args, userId: user._id, tenantId: tenant._id, createdAt: now, updatedAt: now });
  },
});

export const updateWorkExperience = mutation({
  args: {
    id: v.id("workExperience"),
    company: v.optional(v.string()),
    title: v.optional(v.string()),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    isCurrent: v.optional(v.boolean()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.auth.getUserIdentity() ?? (() => { throw new Error("Auth required"); })();
    const { id, ...fields } = args;
    const patch: Record<string, unknown> = { updatedAt: Date.now() };
    for (const [k, v] of Object.entries(fields)) { if (v !== undefined) patch[k] = v; }
    await ctx.db.patch(id, patch);
    return id;
  },
});

export const removeWorkExperience = mutation({
  args: { id: v.id("workExperience") },
  handler: async (ctx, args) => {
    await ctx.auth.getUserIdentity() ?? (() => { throw new Error("Auth required"); })();
    await ctx.db.delete(args.id);
    return args.id;
  },
});

// ---- Education ----

export const getEducation = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.query("education").withIndex("by_user", (q) => q.eq("userId", args.userId)).order("desc").collect();
  },
});

export const addEducation = mutation({
  args: {
    school: v.string(),
    degree: v.optional(v.string()),
    field: v.optional(v.string()),
    startYear: v.optional(v.number()),
    endYear: v.optional(v.number()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { user, tenant } = await requireUser(ctx);
    const now = Date.now();
    return await ctx.db.insert("education", { ...args, userId: user._id, tenantId: tenant._id, createdAt: now, updatedAt: now });
  },
});

export const updateEducation = mutation({
  args: {
    id: v.id("education"),
    school: v.optional(v.string()),
    degree: v.optional(v.string()),
    field: v.optional(v.string()),
    startYear: v.optional(v.number()),
    endYear: v.optional(v.number()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.auth.getUserIdentity() ?? (() => { throw new Error("Auth required"); })();
    const { id, ...fields } = args;
    const patch: Record<string, unknown> = { updatedAt: Date.now() };
    for (const [k, v] of Object.entries(fields)) { if (v !== undefined) patch[k] = v; }
    await ctx.db.patch(id, patch);
    return id;
  },
});

export const removeEducation = mutation({
  args: { id: v.id("education") },
  handler: async (ctx, args) => {
    await ctx.auth.getUserIdentity() ?? (() => { throw new Error("Auth required"); })();
    await ctx.db.delete(args.id);
    return args.id;
  },
});

// ---- Certifications ----

export const getCertifications = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.query("userCertifications").withIndex("by_user", (q) => q.eq("userId", args.userId)).order("desc").collect();
  },
});

export const addCertification = mutation({
  args: {
    name: v.string(),
    issuer: v.optional(v.string()),
    year: v.optional(v.number()),
    url: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { user, tenant } = await requireUser(ctx);
    return await ctx.db.insert("userCertifications", { ...args, userId: user._id, tenantId: tenant._id, createdAt: Date.now() });
  },
});

export const removeCertification = mutation({
  args: { id: v.id("userCertifications") },
  handler: async (ctx, args) => {
    await ctx.auth.getUserIdentity() ?? (() => { throw new Error("Auth required"); })();
    await ctx.db.delete(args.id);
    return args.id;
  },
});
```

**Step 3: Push schema**

```bash
npx convex dev
```

**Step 4: Commit**

```bash
git add convex/schema.ts convex/marketplace/experience.ts
git commit -m "feat: add workExperience, education, certifications Convex tables"
```

---

### Task 7: Build ExperienceTab component

**Files:**
- Create: `src/components/dashboard/section/ExperienceTab.jsx`
- Create: `src/components/dashboard/modal/ExperienceModal.jsx`

**Step 1: Create ExperienceModal.jsx**

A single modal with a `type` prop (`"work"` | `"education"` | `"certification"`) that renders the correct fields.

```jsx
"use client";
import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

function formatDateInput(ts) {
  if (!ts) return "";
  return new Date(ts).toISOString().slice(0, 7); // "YYYY-MM"
}

function parseDateInput(str) {
  if (!str) return undefined;
  return new Date(str + "-01").getTime();
}

export default function ExperienceModal({ type, item, onClose }) {
  const isEdit = !!item;

  // Work experience mutations
  const addWork = useMutation(api.marketplace.experience.addWorkExperience);
  const updateWork = useMutation(api.marketplace.experience.updateWorkExperience);
  // Education mutations
  const addEdu = useMutation(api.marketplace.experience.addEducation);
  const updateEdu = useMutation(api.marketplace.experience.updateEducation);
  // Certification mutations
  const addCert = useMutation(api.marketplace.experience.addCertification);

  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);
  const [description, setDescription] = useState("");
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [field, setField] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [certName, setCertName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [certYear, setCertYear] = useState("");
  const [certUrl, setCertUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!item) return;
    if (type === "work") {
      setCompany(item.company || ""); setJobTitle(item.title || "");
      setStartDate(formatDateInput(item.startDate)); setEndDate(formatDateInput(item.endDate));
      setIsCurrent(!!item.isCurrent); setDescription(item.description || "");
    } else if (type === "education") {
      setSchool(item.school || ""); setDegree(item.degree || ""); setField(item.field || "");
      setStartYear(item.startYear ? String(item.startYear) : ""); setEndYear(item.endYear ? String(item.endYear) : "");
      setDescription(item.description || "");
    } else if (type === "certification") {
      setCertName(item.name || ""); setIssuer(item.issuer || "");
      setCertYear(item.year ? String(item.year) : ""); setCertUrl(item.url || "");
    }
  }, [item, type]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (type === "work") {
        const args = { company, title: jobTitle, startDate: parseDateInput(startDate) || Date.now(), endDate: isCurrent ? undefined : parseDateInput(endDate), isCurrent, description: description || undefined };
        if (isEdit) await updateWork({ id: item._id, ...args });
        else await addWork(args);
      } else if (type === "education") {
        const args = { school, degree: degree || undefined, field: field || undefined, startYear: startYear ? Number(startYear) : undefined, endYear: endYear ? Number(endYear) : undefined, description: description || undefined };
        if (isEdit) await updateEdu({ id: item._id, ...args });
        else await addEdu(args);
      } else if (type === "certification") {
        await addCert({ name: certName, issuer: issuer || undefined, year: certYear ? Number(certYear) : undefined, url: certUrl || undefined });
      }
      toast.success(isEdit ? "Updated" : "Added");
      onClose?.();
    } catch (err) {
      toast.error(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const titles = { work: "Work Experience", education: "Education", certification: "Certification" };

  return (
    <div className="modal fade" id="experienceModal" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEdit ? "Edit" : "Add"} {titles[type]}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" />
          </div>
          <form onSubmit={handleSave}>
            <div className="modal-body p30">
              {type === "work" && (
                <>
                  <div className="mb20"><label className="heading-color ff-heading fw500 mb10">Company *</label><input className="form-control" value={company} onChange={(e) => setCompany(e.target.value)} required placeholder="e.g. Acme Corp" /></div>
                  <div className="mb20"><label className="heading-color ff-heading fw500 mb10">Job Title *</label><input className="form-control" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required placeholder="e.g. Senior Developer" /></div>
                  <div className="row">
                    <div className="col-sm-6 mb20"><label className="heading-color ff-heading fw500 mb10">Start Date</label><input type="month" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></div>
                    <div className="col-sm-6 mb20"><label className="heading-color ff-heading fw500 mb10">End Date</label><input type="month" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} disabled={isCurrent} /></div>
                  </div>
                  <div className="mb20"><div className="form-check"><input type="checkbox" className="form-check-input" id="isCurrent" checked={isCurrent} onChange={(e) => setIsCurrent(e.target.checked)} /><label className="form-check-label" htmlFor="isCurrent">I currently work here</label></div></div>
                  <div className="mb20"><label className="heading-color ff-heading fw500 mb10">Description</label><textarea className="form-control pt15" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Key responsibilities and achievements..." /></div>
                </>
              )}
              {type === "education" && (
                <>
                  <div className="mb20"><label className="heading-color ff-heading fw500 mb10">School *</label><input className="form-control" value={school} onChange={(e) => setSchool(e.target.value)} required placeholder="e.g. University of Amsterdam" /></div>
                  <div className="mb20"><label className="heading-color ff-heading fw500 mb10">Degree</label><input className="form-control" value={degree} onChange={(e) => setDegree(e.target.value)} placeholder="e.g. Bachelor" /></div>
                  <div className="mb20"><label className="heading-color ff-heading fw500 mb10">Field of Study</label><input className="form-control" value={field} onChange={(e) => setField(e.target.value)} placeholder="e.g. Computer Science" /></div>
                  <div className="row">
                    <div className="col-sm-6 mb20"><label className="heading-color ff-heading fw500 mb10">Start Year</label><input type="number" className="form-control" value={startYear} onChange={(e) => setStartYear(e.target.value)} placeholder="2018" min="1950" max="2030" /></div>
                    <div className="col-sm-6 mb20"><label className="heading-color ff-heading fw500 mb10">End Year</label><input type="number" className="form-control" value={endYear} onChange={(e) => setEndYear(e.target.value)} placeholder="2022" min="1950" max="2030" /></div>
                  </div>
                </>
              )}
              {type === "certification" && (
                <>
                  <div className="mb20"><label className="heading-color ff-heading fw500 mb10">Certificate Name *</label><input className="form-control" value={certName} onChange={(e) => setCertName(e.target.value)} required placeholder="e.g. AWS Solutions Architect" /></div>
                  <div className="mb20"><label className="heading-color ff-heading fw500 mb10">Issuing Organization</label><input className="form-control" value={issuer} onChange={(e) => setIssuer(e.target.value)} placeholder="e.g. Amazon Web Services" /></div>
                  <div className="row">
                    <div className="col-sm-6 mb20"><label className="heading-color ff-heading fw500 mb10">Year</label><input type="number" className="form-control" value={certYear} onChange={(e) => setCertYear(e.target.value)} placeholder="2023" /></div>
                    <div className="col-sm-6 mb20"><label className="heading-color ff-heading fw500 mb10">Credential URL</label><input type="url" className="form-control" value={certUrl} onChange={(e) => setCertUrl(e.target.value)} placeholder="https://..." /></div>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="ud-btn btn-white" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" className="ud-btn btn-thm" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Create ExperienceTab.jsx**

```jsx
"use client";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import { toast } from "sonner";
import ExperienceModal from "../modal/ExperienceModal";

function SectionHeader({ title, onAdd, modalType, setModalType }) {
  return (
    <div className="d-flex justify-content-between align-items-center bdrb1 pb15 mb20">
      <h5 className="list-title mb-0">{title}</h5>
      <button className="ud-btn btn-thm btn-sm" data-bs-toggle="modal" data-bs-target="#experienceModal" onClick={() => { setModalType(modalType); onAdd(); }}>
        + Add
      </button>
    </div>
  );
}

function formatMonthYear(ts) {
  if (!ts) return "Present";
  return new Date(ts).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

export default function ExperienceTab() {
  const { convexUser, isLoaded } = useConvexUser();
  const [modalType, setModalType] = useState("work");
  const [selectedItem, setSelectedItem] = useState(null);

  const workExp = useQuery(api.marketplace.experience.getWorkExperience, convexUser?._id ? { userId: convexUser._id } : "skip");
  const education = useQuery(api.marketplace.experience.getEducation, convexUser?._id ? { userId: convexUser._id } : "skip");
  const certs = useQuery(api.marketplace.experience.getCertifications, convexUser?._id ? { userId: convexUser._id } : "skip");

  const removeWork = useMutation(api.marketplace.experience.removeWorkExperience);
  const removeEdu = useMutation(api.marketplace.experience.removeEducation);
  const removeCert = useMutation(api.marketplace.experience.removeCertification);

  const handleDelete = async (type, id) => {
    if (!confirm("Delete this item?")) return;
    try {
      if (type === "work") await removeWork({ id });
      else if (type === "education") await removeEdu({ id });
      else await removeCert({ id });
      toast.success("Deleted");
    } catch (err) { toast.error(err.message || "Failed"); }
  };

  const handleEdit = (type, item) => { setModalType(type); setSelectedItem(item); };
  const handleAdd = () => setSelectedItem(null);

  if (!isLoaded) return <div className="ps-widget bgc-white bdrs4 p30 mb30"><div className="spinner-border text-thm" role="status" /></div>;

  return (
    <>
      {/* Work Experience */}
      <div className="ps-widget bgc-white bdrs4 p30 mb20">
        <SectionHeader title="Work Experience" modalType="work" onAdd={handleAdd} setModalType={setModalType} />
        {(workExp || []).length === 0 ? (
          <p className="text fz14">No work experience added yet.</p>
        ) : (
          (workExp || []).map((item) => (
            <div key={item._id} className="d-flex justify-content-between align-items-start bdrb1 pb15 mb15">
              <div>
                <h6 className="mb2">{item.title}</h6>
                <p className="fz14 text mb2">{item.company}</p>
                <p className="fz13 text-muted mb5">{formatMonthYear(item.startDate)} — {item.isCurrent ? "Present" : formatMonthYear(item.endDate)}</p>
                {item.description && <p className="fz13 text mb-0">{item.description}</p>}
              </div>
              <div className="d-flex gap-2">
                <a className="icon" style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#experienceModal" onClick={() => handleEdit("work", item)}><span className="flaticon-pencil" /></a>
                <a className="icon text-danger" style={{ cursor: "pointer" }} onClick={() => handleDelete("work", item._id)}><span className="flaticon-delete" /></a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Education */}
      <div className="ps-widget bgc-white bdrs4 p30 mb20">
        <SectionHeader title="Education" modalType="education" onAdd={handleAdd} setModalType={setModalType} />
        {(education || []).length === 0 ? (
          <p className="text fz14">No education added yet.</p>
        ) : (
          (education || []).map((item) => (
            <div key={item._id} className="d-flex justify-content-between align-items-start bdrb1 pb15 mb15">
              <div>
                <h6 className="mb2">{item.school}</h6>
                {item.degree && <p className="fz14 text mb2">{item.degree}{item.field ? `, ${item.field}` : ""}</p>}
                {(item.startYear || item.endYear) && <p className="fz13 text-muted mb-0">{item.startYear || ""}  {item.endYear ? `— ${item.endYear}` : ""}</p>}
              </div>
              <div className="d-flex gap-2">
                <a className="icon" style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#experienceModal" onClick={() => handleEdit("education", item)}><span className="flaticon-pencil" /></a>
                <a className="icon text-danger" style={{ cursor: "pointer" }} onClick={() => handleDelete("education", item._id)}><span className="flaticon-delete" /></a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Certifications */}
      <div className="ps-widget bgc-white bdrs4 p30 mb20">
        <SectionHeader title="Certifications" modalType="certification" onAdd={handleAdd} setModalType={setModalType} />
        {(certs || []).length === 0 ? (
          <p className="text fz14">No certifications added yet.</p>
        ) : (
          (certs || []).map((item) => (
            <div key={item._id} className="d-flex justify-content-between align-items-start bdrb1 pb15 mb15">
              <div>
                <h6 className="mb2">{item.name}</h6>
                {item.issuer && <p className="fz14 text mb2">{item.issuer}{item.year ? ` · ${item.year}` : ""}</p>}
                {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="fz13 text-thm">View certificate ↗</a>}
              </div>
              <a className="icon text-danger" style={{ cursor: "pointer" }} onClick={() => handleDelete("certification", item._id)}><span className="flaticon-delete" /></a>
            </div>
          ))
        )}
      </div>

      <ExperienceModal type={modalType} item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
}
```

**Step 3: Wire ExperienceTab into MyProfileInfo.jsx**

```jsx
import ExperienceTab from "./ExperienceTab";
// ...
{activeTab === "experience" && <ExperienceTab />}
```

**Step 4: Verify visually**

Go to `http://localhost:3000/my-profile?tab=experience`. Verify:
- 3 sections: Work Experience, Education, Certifications
- Each has a "+ Add" button that opens a type-appropriate modal
- Adding work experience shows company, title, dates timeline-style
- Delete works with confirmation

**Step 5: Commit**

```bash
git add src/components/dashboard/section/ExperienceTab.jsx \
        src/components/dashboard/modal/ExperienceModal.jsx \
        src/components/dashboard/section/MyProfileInfo.jsx
git commit -m "feat: add Experience tab with work history, education, certifications"
```

---

## Phase 4 — Settings Tab

### Task 8: Create notification settings Convex table and mutations

**Files:**
- Modify: `convex/schema.ts`
- Create: `convex/marketplace/notificationSettings.ts`

**Step 1: Add table to schema.ts**

```typescript
  userNotificationSettings: defineTable({
    userId: v.id("users"),
    newMessage: v.optional(v.boolean()),
    orderUpdate: v.optional(v.boolean()),
    reviewReceived: v.optional(v.boolean()),
    marketingEmails: v.optional(v.boolean()),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),
```

**Step 2: Create convex/marketplace/notificationSettings.ts**

```typescript
import { v } from "convex/values";
import { query, mutation } from "../_generated/server";

export const getByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.query("userNotificationSettings").withIndex("by_user", (q) => q.eq("userId", args.userId)).first();
  },
});

export const upsert = mutation({
  args: {
    newMessage: v.optional(v.boolean()),
    orderUpdate: v.optional(v.boolean()),
    reviewReceived: v.optional(v.boolean()),
    marketingEmails: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");
    const user = await ctx.db.query("users").withIndex("by_email", (q) => q.eq("email", identity.email!)).first();
    if (!user) throw new Error("User not found");

    const existing = await ctx.db.query("userNotificationSettings").withIndex("by_user", (q) => q.eq("userId", user._id)).first();
    const now = Date.now();
    if (existing) {
      await ctx.db.patch(existing._id, { ...args, updatedAt: now });
      return existing._id;
    } else {
      return await ctx.db.insert("userNotificationSettings", { userId: user._id, ...args, updatedAt: now });
    }
  },
});
```

**Step 3: Push schema**

```bash
npx convex dev
```

**Step 4: Commit**

```bash
git add convex/schema.ts convex/marketplace/notificationSettings.ts
git commit -m "feat: add userNotificationSettings Convex table and upsert mutation"
```

---

### Task 9: Build SettingsTab component

**Files:**
- Create: `src/components/dashboard/section/SettingsTab.jsx`

**Context:** 4 sections: Account (read-only email + password reset), Account Type Switcher (uses `api.users.setUserType`), Notification Preferences (toggles), Privacy (visibility + contact).

```jsx
"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

const ACCOUNT_TYPES = [
  { key: "client", label: "Client" },
  { key: "freelancer", label: "Freelancer" },
  { key: "job_seeker", label: "Job Seeker" },
];

const VISIBILITY_OPTIONS = [
  { value: "public", label: "Public — visible to everyone" },
  { value: "private", label: "Private — only visible to you" },
];

const CONTACT_OPTIONS = [
  { value: "everyone", label: "Everyone" },
  { value: "clients_only", label: "Clients & employers only" },
  { value: "nobody", label: "Nobody" },
];

export default function SettingsTab() {
  const { convexUser, isLoaded } = useConvexUser();
  const { user: clerkUser } = useUser();

  const setUserType = useMutation(api.users.setUserType);
  const upsertNotifications = useMutation(api.marketplace.notificationSettings.upsert);
  const updateProfile = useMutation(api.marketplace.freelancers.updateProfile);

  const profile = useQuery(
    api.marketplace.freelancers.getByUserId,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );

  const notifSettings = useQuery(
    api.marketplace.notificationSettings.getByUser,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );

  const [accountType, setAccountType] = useState("");
  const [notifs, setNotifs] = useState({ newMessage: true, orderUpdate: true, reviewReceived: true, marketingEmails: false });
  const [visibility, setVisibility] = useState("public");
  const [contactPermission, setContactPermission] = useState("everyone");
  const [savingType, setSavingType] = useState(false);
  const [savingNotifs, setSavingNotifs] = useState(false);
  const [savingPrivacy, setSavingPrivacy] = useState(false);

  useEffect(() => {
    if (convexUser) setAccountType(convexUser.userType || "client");
  }, [convexUser]);

  useEffect(() => {
    if (notifSettings) {
      setNotifs({
        newMessage: notifSettings.newMessage ?? true,
        orderUpdate: notifSettings.orderUpdate ?? true,
        reviewReceived: notifSettings.reviewReceived ?? true,
        marketingEmails: notifSettings.marketingEmails ?? false,
      });
    }
  }, [notifSettings]);

  useEffect(() => {
    if (profile) {
      setVisibility(profile.profileVisibility || "public");
      setContactPermission(profile.contactPermission || "everyone");
    }
  }, [profile]);

  const handleSaveType = async () => {
    setSavingType(true);
    try {
      await setUserType({ userType: accountType });
      toast.success("Account type updated");
    } catch (err) { toast.error(err.message || "Failed"); }
    finally { setSavingType(false); }
  };

  const handleSaveNotifs = async () => {
    setSavingNotifs(true);
    try {
      await upsertNotifications(notifs);
      toast.success("Notification preferences saved");
    } catch (err) { toast.error(err.message || "Failed"); }
    finally { setSavingNotifs(false); }
  };

  const handleSavePrivacy = async () => {
    if (!profile?._id) return;
    setSavingPrivacy(true);
    try {
      await updateProfile({ profileId: profile._id, profileVisibility: visibility, contactPermission });
      toast.success("Privacy settings saved");
    } catch (err) { toast.error(err.message || "Failed"); }
    finally { setSavingPrivacy(false); }
  };

  if (!isLoaded) return <div className="ps-widget bgc-white bdrs4 p30 mb30"><div className="spinner-border text-thm" role="status" /></div>;

  return (
    <>
      {/* Account */}
      <div className="ps-widget bgc-white bdrs4 p30 mb20">
        <h5 className="list-title bdrb1 pb15 mb20">Account</h5>
        <div className="row">
          <div className="col-sm-6 mb20">
            <label className="heading-color ff-heading fw500 mb10">Email</label>
            <input className="form-control" value={clerkUser?.primaryEmailAddress?.emailAddress || convexUser?.email || ""} disabled />
            <small className="text-muted">To change your email, contact support.</small>
          </div>
        </div>
        <button className="ud-btn btn-white" onClick={() => clerkUser?.update({})}>
          <i className="flaticon-security me-2" /> Change Password
        </button>
      </div>

      {/* Account Type */}
      <div className="ps-widget bgc-white bdrs4 p30 mb20">
        <h5 className="list-title bdrb1 pb15 mb20">Account Type</h5>
        <p className="text fz14 mb15">Your account type determines which features and dashboard sections are available to you.</p>
        <div className="d-flex gap-2 mb20">
          {ACCOUNT_TYPES.map((t) => (
            <button
              key={t.key}
              className={`ud-btn ${accountType === t.key ? "btn-thm" : "btn-white"}`}
              onClick={() => setAccountType(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button className="ud-btn btn-thm" onClick={handleSaveType} disabled={savingType}>
          {savingType ? "Saving..." : "Save Account Type"}
        </button>
      </div>

      {/* Notifications */}
      <div className="ps-widget bgc-white bdrs4 p30 mb20">
        <h5 className="list-title bdrb1 pb15 mb20">Notification Preferences</h5>
        {[
          { key: "newMessage", label: "New message received" },
          { key: "orderUpdate", label: "Order status update" },
          { key: "reviewReceived", label: "Review received" },
          { key: "marketingEmails", label: "Marketing & tips from SkillLinkup" },
        ].map(({ key, label }) => (
          <div key={key} className="d-flex justify-content-between align-items-center bdrb1 pb15 mb15">
            <span className="fz15">{label}</span>
            <div className="form-check form-switch mb-0">
              <input
                className="form-check-input"
                type="checkbox"
                checked={notifs[key]}
                onChange={(e) => setNotifs((prev) => ({ ...prev, [key]: e.target.checked }))}
              />
            </div>
          </div>
        ))}
        <button className="ud-btn btn-thm mt10" onClick={handleSaveNotifs} disabled={savingNotifs}>
          {savingNotifs ? "Saving..." : "Save Preferences"}
        </button>
      </div>

      {/* Privacy */}
      <div className="ps-widget bgc-white bdrs4 p30 mb20">
        <h5 className="list-title bdrb1 pb15 mb20">Privacy</h5>
        <div className="mb20">
          <label className="heading-color ff-heading fw500 mb10">Profile Visibility</label>
          <select className="form-control" value={visibility} onChange={(e) => setVisibility(e.target.value)}>
            {VISIBILITY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="mb20">
          <label className="heading-color ff-heading fw500 mb10">Who can contact me</label>
          <select className="form-control" value={contactPermission} onChange={(e) => setContactPermission(e.target.value)}>
            {CONTACT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <button className="ud-btn btn-thm" onClick={handleSavePrivacy} disabled={savingPrivacy}>
          {savingPrivacy ? "Saving..." : "Save Privacy Settings"}
        </button>
      </div>
    </>
  );
}
```

**Step 2: Wire SettingsTab into MyProfileInfo.jsx**

```jsx
import SettingsTab from "./SettingsTab";
// ...
{activeTab === "settings" && <SettingsTab />}
```

**Step 3: Verify visually**

Go to `http://localhost:3000/my-profile?tab=settings`. Verify:
- Email shows (read-only)
- Account type pills highlight current type, switching and saving works
- Notification toggles save correctly
- Privacy dropdowns save and persist on reload

**Step 4: Commit**

```bash
git add src/components/dashboard/section/SettingsTab.jsx \
        src/components/dashboard/section/MyProfileInfo.jsx
git commit -m "feat: add Settings tab with account type, notifications, and privacy"
```

---

## Final Verification Checklist

After all 4 phases:

- [ ] `http://localhost:3000/my-profile` — tab bar visible, URL updates on click
- [ ] `?tab=profile` — cover image upload works, Twitter/GitHub fields save
- [ ] `?tab=portfolio` — add/edit/delete projects, images upload to Convex storage
- [ ] `?tab=experience` — add work experience with date range, education, certifications
- [ ] `?tab=settings` — account type switch, notification toggles, privacy dropdowns all save
- [ ] No console errors on any tab
- [ ] `npx tsc --noEmit` — no TypeScript errors
- [ ] Each tab independently deployable (verified at end of each phase)
