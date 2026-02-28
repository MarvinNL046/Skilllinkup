"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import DashboardNavigation from "../header/DashboardNavigation";
import useConvexUser from "@/hook/useConvexUser";
import { toast } from "sonner";

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export default function CreateProjectInfo() {
  const router = useRouter();
  const { convexUser, isLoaded } = useConvexUser();
  const createProject = useMutation(api.marketplace.projects.create);

  // Fetch marketplace categories for the dropdown
  const categories = useQuery(api.marketplace.categories.list, { locale: "en" });

  const [form, setForm] = useState({
    title: "",
    description: "",
    categoryId: "",
    budgetMin: "",
    budgetMax: "",
    requiredSkills: "",
    deadline: "",
    workType: "remote",
  });

  const [status, setStatus] = useState({ loading: false, error: null, success: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (status.error) {
      setStatus((prev) => ({ ...prev, error: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!convexUser?._id) {
      setStatus({ loading: false, error: "You must be logged in to create a project.", success: false });
      return;
    }

    if (!form.title.trim()) {
      setStatus({ loading: false, error: "Project title is required.", success: false });
      return;
    }

    if (!form.description.trim()) {
      setStatus({ loading: false, error: "Project description is required.", success: false });
      return;
    }

    // Budget validation
    const parsedMin = form.budgetMin ? parseFloat(form.budgetMin) : NaN;
    const parsedMax = form.budgetMax ? parseFloat(form.budgetMax) : NaN;

    if (Number.isFinite(parsedMin) && parsedMin < 0) {
      setStatus({ loading: false, error: "Budget minimum cannot be negative.", success: false });
      return;
    }

    if (Number.isFinite(parsedMax) && parsedMax < 0) {
      setStatus({ loading: false, error: "Budget maximum cannot be negative.", success: false });
      return;
    }

    if (Number.isFinite(parsedMin) && Number.isFinite(parsedMax) && parsedMin > parsedMax) {
      setStatus({ loading: false, error: "Budget minimum cannot be higher than budget maximum.", success: false });
      return;
    }

    // Deadline validation — must be in the future
    if (form.deadline) {
      const deadlineDate = new Date(form.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadlineDate < today) {
        setStatus({ loading: false, error: "Deadline must be a future date.", success: false });
        return;
      }
    }

    setStatus({ loading: true, error: null, success: false });

    try {
      const slug = generateSlug(form.title) + "-" + Date.now();

      const skillsArray = form.requiredSkills
        ? form.requiredSkills.split(",").map((s) => s.trim()).filter(Boolean)
        : undefined;

      const budgetMin = Number.isFinite(parsedMin) ? parsedMin : undefined;
      const budgetMax = Number.isFinite(parsedMax) ? parsedMax : undefined;
      const deadlineMs = form.deadline ? new Date(form.deadline).getTime() : undefined;

      await createProject({
        title: form.title.trim(),
        slug,
        description: form.description.trim(),
        categoryId: form.categoryId || undefined,
        requiredSkills: skillsArray,
        budgetMin,
        budgetMax,
        currency: "EUR",
        deadline: deadlineMs,
        workType: form.workType || undefined,
        locale: "en",
      });

      setStatus({ loading: false, error: null, success: true });
      toast.success("Project created successfully!");

      // Reset form
      setForm({
        title: "",
        description: "",
        categoryId: "",
        budgetMin: "",
        budgetMax: "",
        requiredSkills: "",
        deadline: "",
        workType: "remote",
      });

      // Redirect after short delay so user sees success message
      setTimeout(() => {
        router.push("/manage-projects");
      }, 1500);
    } catch (err) {
      const message = err.message || "Failed to create project.";
      setStatus({ loading: false, error: message, success: false });
      toast.error(message);
    }
  };

  // Show login prompt if user is not authenticated
  if (isLoaded && !convexUser) {
    return (
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 text-center">
              <h4 className="mb15">Sign in required</h4>
              <p className="text-muted mb20">You need to be logged in to create a project.</p>
              <button
                onClick={() => router.push("/login")}
                className="ud-btn btn-thm"
              >
                Sign In
                <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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
              <h2>Create Project</h2>
              <p className="text">Post a project and receive bids from freelancers.</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-lg-end">
              <button
                type="submit"
                form="create-project-form"
                className="ud-btn btn-dark"
                disabled={status.loading || !isLoaded}
              >
                {status.loading ? "Saving..." : "Save & Publish"}
                <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="bdrb1 pb15 mb25">
                <h5 className="list-title">Project Details</h5>
              </div>

              {status.error && (
                <div className="alert alert-danger mb20" role="alert">
                  {status.error}
                </div>
              )}
              {status.success && (
                <div className="alert alert-success mb20" role="alert">
                  Project created successfully! Redirecting...
                </div>
              )}

              <div className="col-xl-8">
                <form id="create-project-form" className="form-style1" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Project Title <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          className="form-control"
                          placeholder="e.g. Build a React dashboard"
                          value={form.title}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-sm-12">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Category
                        </label>
                        <select
                          name="categoryId"
                          className="form-control"
                          value={form.categoryId}
                          onChange={handleChange}
                        >
                          <option value="">-- Select a category --</option>
                          {categories === undefined && (
                            <option disabled>Loading categories...</option>
                          )}
                          {categories &&
                            categories.map((cat) => (
                              <optgroup key={cat._id} label={cat.name}>
                                <option value={cat._id}>{cat.name}</option>
                                {cat.children &&
                                  cat.children.map((child) => (
                                    <option key={child._id} value={child._id}>
                                      &nbsp;&nbsp;{child.name}
                                    </option>
                                  ))}
                              </optgroup>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Budget Min (EUR)
                        </label>
                        <input
                          type="number"
                          name="budgetMin"
                          className="form-control"
                          placeholder="e.g. 500"
                          min="0"
                          value={form.budgetMin}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Budget Max (EUR)
                        </label>
                        <input
                          type="number"
                          name="budgetMax"
                          className="form-control"
                          placeholder="e.g. 2000"
                          min="0"
                          value={form.budgetMax}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Work Type
                        </label>
                        <select
                          name="workType"
                          className="form-control"
                          value={form.workType}
                          onChange={handleChange}
                        >
                          <option value="remote">Remote</option>
                          <option value="local">On-site</option>
                          <option value="hybrid">Hybrid</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Deadline
                        </label>
                        <input
                          type="date"
                          name="deadline"
                          className="form-control"
                          value={form.deadline}
                          onChange={handleChange}
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                    </div>

                    <div className="col-sm-12">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Required Skills (comma separated)
                        </label>
                        <input
                          type="text"
                          name="requiredSkills"
                          className="form-control"
                          placeholder="e.g. React, TypeScript, Node.js"
                          value={form.requiredSkills}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Project Description <span className="text-danger">*</span>
                        </label>
                        <textarea
                          name="description"
                          cols={30}
                          rows={6}
                          className="form-control"
                          placeholder="Describe your project in detail..."
                          value={form.description}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="text-start">
                        <button
                          type="submit"
                          className="ud-btn btn-thm"
                          disabled={status.loading || !isLoaded}
                        >
                          {status.loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" />
                              Saving...
                            </>
                          ) : (
                            <>
                              Save & Publish
                              <i className="fal fa-arrow-right-long" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
