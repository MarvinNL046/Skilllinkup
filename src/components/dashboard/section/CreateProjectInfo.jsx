"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import DashboardNavigation from "../header/DashboardNavigation";
import useConvexUser from "@/hook/useConvexUser";
import { flattenLeafMarketplaceCategories } from "@/lib/marketplaceCategories";
import TagsInput from "@/components/ui/TagsInput";
import { toast } from "sonner";
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
import { ArrowRight, Info, AlertCircle, CheckCircle2 } from "lucide-react";

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
  return "digital";
}

function PageShell({ children }) {
  return (
    <div className="dashboard__content hover-bgc-color">
      <DashboardNavigation />
      {children}
    </div>
  );
}

export default function CreateProjectInfo() {
  const t = useTranslations("createProject");
  const locale = useLocale();
  const router = useRouter();
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const createProject = useMutation(api.marketplace.projects.create);

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
    requiredSkills: [],
    deadline: "",
    workType: "remote",
  });

  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status.error) {
      setStatus((prev) => ({ ...prev, error: null }));
    }
  };

  const setField = (name) => (value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
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
      setStatus({
        loading: false,
        error: t("errorDescriptionRequired"),
        success: false,
      });
      return;
    }

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
    if (
      Number.isFinite(parsedMin) &&
      Number.isFinite(parsedMax) &&
      parsedMin > parsedMax
    ) {
      setStatus({ loading: false, error: t("errorBudgetMinMax"), success: false });
      return;
    }

    if (form.deadline) {
      const deadlineDate = new Date(form.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadlineDate < today) {
        setStatus({
          loading: false,
          error: t("errorDeadlineFuture"),
          success: false,
        });
        return;
      }
    }

    setStatus({ loading: true, error: null, success: false });

    try {
      const slug = generateSlug(form.title) + "-" + Date.now();
      const skillsArray =
        form.requiredSkills.length > 0 ? form.requiredSkills : undefined;
      const budgetMin = Number.isFinite(parsedMin) ? parsedMin : undefined;
      const budgetMax = Number.isFinite(parsedMax) ? parsedMax : undefined;
      const deadlineMs = form.deadline
        ? new Date(form.deadline).getTime()
        : undefined;

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

      setForm({
        title: "",
        description: "",
        categoryId: "",
        budgetMin: "",
        budgetMax: "",
        requiredSkills: [],
        deadline: "",
        workType: "remote",
      });

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
      <PageShell>
        <Card>
          <CardContent className="p-8 flex justify-center">
            <div
              role="status"
              aria-label="Loading"
              className="h-6 w-6 animate-spin rounded-full border-3 border-[var(--border-subtle)] border-t-primary"
            />
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  if (isAuthenticated && convexUser === null) {
    return (
      <PageShell>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-[var(--text-secondary)]">{t("settingUpAccount")}</p>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  if (isLoaded && !isAuthenticated) {
    return (
      <PageShell>
        <Card>
          <CardContent className="p-8 text-center">
            <h4 className="text-xl font-semibold mb-3">{t("signInRequired")}</h4>
            <p className="text-[var(--text-secondary)] mb-5">
              {t("signInRequiredDesc")}
            </p>
            <Button onClick={() => router.push("/login")}>
              {t("signIn")}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  const SaveButton = ({ withSpinner = false }) => (
    <Button
      type="submit"
      form="create-project-form"
      disabled={status.loading || !isLoaded}
      data-testid={withSpinner ? "create-project-submit" : undefined}
      className="whitespace-nowrap"
    >
      {status.loading ? (
        <>
          {withSpinner && (
            <span
              role="status"
              aria-label={t("saving")}
              className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2"
            />
          )}
          {t("saving")}
        </>
      ) : (
        <>
          {t("saveAndPublish")}
          <ArrowRight className="ml-1 h-4 w-4" />
        </>
      )}
    </Button>
  );

  return (
    <PageShell>
      <div className="dashboard_title_area mb-6">
        <div>
          <h2>{t("title")}</h2>
          <p className="text-[var(--text-secondary)]">{t("pageDescription")}</p>
        </div>
        <SaveButton />
      </div>

      <Alert variant="info" className="mb-5">
        <Info className="h-4 w-4" />
        <AlertDescription>
          {t("offerServicesInstead")}{" "}
          <Link
            href="/add-services"
            className="font-medium text-primary hover:underline"
          >
            {t("addAService")}
          </Link>{" "}
          {t("addAServiceHint")}
        </AlertDescription>
      </Alert>

      <Card className="overflow-hidden">
        <CardHeader className="border-b border-[var(--border-subtle)] pb-4">
          <CardTitle className="text-lg font-semibold">
            {t("projectDetails")}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {status.error && (
            <Alert variant="destructive" className="mb-5">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{status.error}</AlertDescription>
            </Alert>
          )}
          {status.success && (
            <Alert variant="success" className="mb-5">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>{t("successMessage")}</AlertDescription>
            </Alert>
          )}

          <form
            id="create-project-form"
            onSubmit={handleSubmit}
            data-testid="create-project-form"
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl"
          >
            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="project-title">
                {t("projectTitle")}{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="project-title"
                type="text"
                name="title"
                placeholder={t("projectTitlePlaceholder")}
                value={form.title}
                onChange={handleChange}
                required
                data-testid="create-project-title"
              />
            </div>

            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="project-category">{t("category")}</Label>
              <Select
                value={form.categoryId}
                onValueChange={setField("categoryId")}
              >
                <SelectTrigger id="project-category">
                  <SelectValue
                    placeholder={
                      categories === undefined
                        ? t("loadingCategories")
                        : t("selectCategory")
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {leafCategories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-budget-min">{t("budgetMin")}</Label>
              <Input
                id="project-budget-min"
                type="number"
                name="budgetMin"
                placeholder={t("budgetMinPlaceholder")}
                min="0"
                value={form.budgetMin}
                onChange={handleChange}
                data-testid="create-project-budget-min"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-budget-max">{t("budgetMax")}</Label>
              <Input
                id="project-budget-max"
                type="number"
                name="budgetMax"
                placeholder={t("budgetMaxPlaceholder")}
                min="0"
                value={form.budgetMax}
                onChange={handleChange}
                data-testid="create-project-budget-max"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-work-type">{t("workType")}</Label>
              <Select
                value={form.workType}
                onValueChange={setField("workType")}
              >
                <SelectTrigger id="project-work-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remote">{t("remote")}</SelectItem>
                  <SelectItem value="local">{t("onSite")}</SelectItem>
                  <SelectItem value="hybrid">{t("hybrid")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-deadline">{t("deadline")}</Label>
              <Input
                id="project-deadline"
                type="date"
                name="deadline"
                lang={locale}
                value={form.deadline}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                data-testid="create-project-deadline"
              />
              <p className="text-xs text-[var(--text-tertiary)]">
                {t("deadlineHint")}
              </p>
            </div>

            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="project-skills">{t("requiredSkills")}</Label>
              <TagsInput
                value={form.requiredSkills}
                onChange={(arr) =>
                  setForm((prev) => ({ ...prev, requiredSkills: arr }))
                }
                placeholder={t("requiredSkillsPlaceholder")}
              />
            </div>

            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="project-description">
                {t("projectDescription")}{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="project-description"
                name="description"
                rows={6}
                placeholder={t("projectDescriptionPlaceholder")}
                value={form.description}
                onChange={handleChange}
                required
                data-testid="create-project-description"
              />
            </div>

            <div className="sm:col-span-2">
              <SaveButton withSpinner />
            </div>
          </form>
        </CardContent>
      </Card>
    </PageShell>
  );
}
