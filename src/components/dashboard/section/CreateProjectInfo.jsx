"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { useTranslations } from "next-intl";
import DashboardNavigation from "../header/DashboardNavigation";
import useConvexUser from "@/hook/useConvexUser";
import { flattenLeafMarketplaceCategories } from "@/lib/marketplaceCategories";
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

function worldToServiceType(world) {
  if (world === "local") return "local";
  return "digital"; // online, jobs, default
}

export default function CreateProjectInfo() {
  const t = useTranslations("createProject");
  const router = useRouter();
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const createProject = useMutation(api.marketplace.projects.create);

  // Fetch marketplace categories filtered by user's preferred world
  const serviceType = worldToServiceType(convexUser?.preferredWorld);
  const categoryArgs = { locale: "en" };
  if (serviceType) categoryArgs.serviceType = serviceType;
  const categories = useQuery(api.marketplace.categories.list, categoryArgs);
  const leafCategories = categories
    ? flattenLeafMarketplaceCategories(categories)
    : [];

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

    if (!isAuthenticated) {
      setStatus({ loading: false, error: t("errorMustBeLoggedIn"), success: false });
      return;
    }

    if (!form.title.trim()) {
      setStatus({ loading: false, error: t("errorTitleRequired"), success: false });
      return;
    }

    if (!form.description.trim()) {
      setStatus({ loading: false, error: t("errorDescriptionRequired"), success: false });
      return;
    }

    // Budget validation
    const parsedMin = form.budgetMin ? parseFloat(form.budgetMin) : NaN;
    const parsedMax = form.budgetMax ? parseFloat(form.budgetMax) : NaN;

    if (Number.isFinite(parsedMin) && parsedMin < 0) {
      setStatus({ loading: false, error: t("errorBudgetMinNegative"), success: false });
      return;
    }

    if (Number.isFinite(parsedMax) && parsedMax < 0) {
      setStatus({ loading: false, error: t("errorBudgetMaxNegative"), success: false });
      return;
    }

    if (Number.isFinite(parsedMin) && Number.isFinite(parsedMax) && parsedMin > parsedMax) {
      setStatus({ loading: false, error: t("errorBudgetMinMax"), success: false });
      return;
    }

    // Deadline validation — must be in the future
    if (form.deadline) {
      const deadlineDate = new Date(form.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadlineDate < today) {
        setStatus({ loading: false, error: t("errorDeadlineFuture"), success: false });
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
      toast.success(t("projectCreated"));

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
      const message = err.message || t("errorFailed");
      setStatus({ loading: false, error: message, success: false });
      toast.error(message);
    }
  };

  if (isAuthenticated && convexUser === undefined) {
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
              <div className="spinner-border spinner-border-sm text-success" role="status" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated && convexUser === null) {
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
              <p className="text-muted mb0">{t("settingUpAccount")}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoaded && !isAuthenticated) {
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
              <h4 className="mb15">{t("signInRequired")}</h4>
              <p className="text-muted mb20">{t("signInRequiredDesc")}</p>
              <button
                onClick={() => router.push("/login")}
                className="ud-btn btn-thm"
              >
                {t("signIn")}
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
              <h2>{t("title")}</h2>
              <p className="text">{t("pageDescription")}</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-lg-end">
              <button
                type="submit"
                form="create-project-form"
                className="ud-btn btn-thm default-box-shadow2"
                disabled={status.loading || !isLoaded}
              >
                {status.loading ? t("saving") : t("saveAndPublish")}
                <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </div>
        </div>

        <div className="row mb20">
          <div className="col-xl-12">
            <div className="flex items-center gap-2 px-3 py-2 bdrs4" style={{ background: "#f0f9ff", border: "1px solid #bae6fd" }}>
              <i className="flaticon-document fz16" style={{ color: "#0284c7" }} />
              <span className="fz14" style={{ color: "#0369a1" }}>
                {t("offerServicesInstead")}{" "}
                <Link href="/add-services" className="fw500" style={{ color: "#0284c7", textDecoration: "underline" }}>
                  {t("addAService")}
                </Link>{" "}
                {t("addAServiceHint")}
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden relative">
              <div className="bdrb1 pb15 mb25">
                <h5 className="list-title">{t("projectDetails")}</h5>
              </div>

              {status.error && (
                <div className="alert alert-danger mb20" role="alert">
                  {status.error}
                </div>
              )}
              {status.success && (
                <div className="alert alert-success mb20" role="alert">
                  {t("successMessage")}
                </div>
              )}

              <div className="col-xl-8">
                <form
                  id="create-project-form"
                  className="form-style1"
                  onSubmit={handleSubmit}
                  data-testid="create-project-form"
                >
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          {t("projectTitle")} <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          className="form-control"
                          placeholder={t("projectTitlePlaceholder")}
                          value={form.title}
                          onChange={handleChange}
                          required
                          data-testid="create-project-title"
                        />
                      </div>
                    </div>

                    <div className="col-sm-12">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          {t("category")}
                        </label>
                        <select
                          name="categoryId"
                          className="form-control"
                          value={form.categoryId}
                          onChange={handleChange}
                        >
                          <option value="">{t("selectCategory")}</option>
                          {categories === undefined && (
                            <option disabled>{t("loadingCategories")}</option>
                          )}
                          {leafCategories.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          {t("budgetMin")}
                        </label>
                        <input
                          type="number"
                          name="budgetMin"
                          className="form-control"
                          placeholder={t("budgetMinPlaceholder")}
                          min="0"
                          value={form.budgetMin}
                          onChange={handleChange}
                          data-testid="create-project-budget-min"
                        />
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          {t("budgetMax")}
                        </label>
                        <input
                          type="number"
                          name="budgetMax"
                          className="form-control"
                          placeholder={t("budgetMaxPlaceholder")}
                          min="0"
                          value={form.budgetMax}
                          onChange={handleChange}
                          data-testid="create-project-budget-max"
                        />
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          {t("workType")}
                        </label>
                        <select
                          name="workType"
                          className="form-control"
                          value={form.workType}
                          onChange={handleChange}
                        >
                          <option value="remote">{t("remote")}</option>
                          <option value="local">{t("onSite")}</option>
                          <option value="hybrid">{t("hybrid")}</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          {t("deadline")}
                        </label>
                        <input
                          type="date"
                          name="deadline"
                          className="form-control"
                          value={form.deadline}
                          onChange={handleChange}
                          min={new Date().toISOString().split("T")[0]}
                          data-testid="create-project-deadline"
                        />
                      </div>
                    </div>

                    <div className="col-sm-12">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          {t("requiredSkills")}
                        </label>
                        <input
                          type="text"
                          name="requiredSkills"
                          className="form-control"
                          placeholder={t("requiredSkillsPlaceholder")}
                          value={form.requiredSkills}
                          onChange={handleChange}
                          data-testid="create-project-skills"
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          {t("projectDescription")} <span className="text-danger">*</span>
                        </label>
                        <textarea
                          name="description"
                          cols={30}
                          rows={6}
                          className="form-control"
                          placeholder={t("projectDescriptionPlaceholder")}
                          value={form.description}
                          onChange={handleChange}
                          required
                          data-testid="create-project-description"
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="text-left">
                        <button
                          type="submit"
                          className="ud-btn btn-thm"
                          disabled={status.loading || !isLoaded}
                          data-testid="create-project-submit"
                        >
                          {status.loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" />
                              {t("saving")}
                            </>
                          ) : (
                            <>
                              {t("saveAndPublish")}
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
