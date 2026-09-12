"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import { flattenLeafMarketplaceCategories } from "@/lib/marketplaceCategories";
import { Button } from "@/components/ui/button";
import styles from "./ProjectWizard.module.css";
import {
  validateProjectFields,
  PROJECT_LIMITS,
} from "@/lib/projectValidation.mjs";

const EMPTY = {
  title: "",
  description: "",
  categoryId: "",
  skills: "",
  budgetMin: "",
  budgetMax: "",
  deadline: "",
};
const STEPS = ["Project details", "Budget & timing", "Review"];

export default function CreateProjectInfo() {
  const router = useRouter();
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const createProject = useMutation(api.marketplace.projects.create);
  const categories = useQuery(api.marketplace.categories.list, {
    locale: "en",
    serviceType: "digital",
  });
  const leaves = useMemo(
    () => (categories ? flattenLeafMarketplaceCategories(categories) : []),
    [categories],
  );
  const [form, setForm] = useState(EMPTY);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [restored, setRestored] = useState(false);
  const [ready, setReady] = useState(false);
  const heading = useRef(null);
  const draftKey = convexUser?._id
    ? `skilllinkup-project-draft:${convexUser._id}`
    : null;
  useEffect(() => {
    setForm(EMPTY);
    setRestored(false);
    setReady(false);
    setStep(0);
    if (!draftKey) return;
    try {
      const saved = JSON.parse(localStorage.getItem(draftKey) || "null");
      if (saved?.version === 1 && saved.form) {
        setForm(
          Object.fromEntries(
            Object.entries(EMPTY).map(([key, value]) => [
              key,
              typeof saved.form[key] === "string" ? saved.form[key] : value,
            ]),
          ),
        );
        setRestored(true);
      }
    } catch {
      /* A missing or unreadable local draft must not block creation. */
    }
    setReady(true);
  }, [draftKey]);
  function field(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  }
  function go(next) {
    setStep(next);
    setError("");
    requestAnimationFrame(() => heading.current?.focus());
  }
  function validate(section) {
    const fields = validateProjectFields(form, { requireBudget: true });
    if (section === 0) {
      if (fields.title || fields.description)
        return fields.title || fields.description;
      if (!leaves.some((item) => item._id === form.categoryId))
        return "Choose a project category.";
    }
    if (section === 1) {
      if (fields.budgetMin || fields.budgetMax)
        return fields.budgetMin || fields.budgetMax;
      const min = Number(form.budgetMin),
        max = Number(form.budgetMax);
      if (
        !form.budgetMin ||
        !form.budgetMax ||
        !Number.isFinite(min) ||
        !Number.isFinite(max) ||
        min <= 0 ||
        max <= 0
      )
        return "Enter a positive minimum and maximum budget.";
      if (min > max)
        return "The minimum budget cannot exceed the maximum budget.";
      if (
        form.deadline &&
        (!Number.isFinite(Date.parse(form.deadline)) ||
          new Date(form.deadline + "T23:59:59").getTime() < Date.now())
      )
        return "Choose today or a future deadline.";
    }
    return "";
  }
  function saveDraft() {
    try {
      localStorage.setItem(draftKey, JSON.stringify({ version: 1, form }));
      toast.success("Draft saved on this device");
    } catch {
      setError(
        "Your browser could not save this draft. Keep this page open to preserve your work.",
      );
    }
  }
  async function submit(event) {
    event.preventDefault();
    const issue = step === 2 ? validate(0) || validate(1) : validate(step);
    if (issue) {
      setError(issue);
      return;
    }
    if (step < 2) {
      go(step + 1);
      return;
    }
    if (saving) return;
    setSaving(true);
    try {
      const title = form.title.trim();
      await createProject({
        title,
        slug: `${title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .slice(0, 70)}-${Date.now()}`,
        description: form.description.trim(),
        categoryId: form.categoryId,
        requiredSkills: [
          ...new Set(
            form.skills
              .split(",")
              .map((value) => value.trim())
              .filter(Boolean),
          ),
        ],
        budgetMin: Number(form.budgetMin),
        budgetMax: Number(form.budgetMax),
        currency: "EUR",
        deadline: form.deadline
          ? new Date(form.deadline + "T23:59:59").getTime()
          : undefined,
        workType: "remote",
        locale: "en",
      });
      try {
        localStorage.removeItem(draftKey);
      } catch {
        /* Publication already succeeded. */
      }
      toast.success("Your project is live");
      router.push("/manage-projects");
    } catch (failure) {
      setError(
        failure?.message ||
          "Could not publish your project. Your details are still here.",
      );
      setSaving(false);
    }
  }
  if (!isLoaded || (isAuthenticated && !convexUser))
    return <p role="status">Loading your account…</p>;
  if (!isAuthenticated)
    return (
      <div className={styles.page}>
        <h1>Sign in to post a project</h1>
        <Link href="/login">Sign in</Link>
      </div>
    );
  if (
    convexUser.activeRole !== "client" ||
    convexUser.preferredWorld !== "online"
  )
    return (
      <div className={styles.page}>
        <h1>Use your online client account</h1>
        <p>Switch to your online client role to post a project.</p>
        <Link href="/dashboard">Back to dashboard</Link>
      </div>
    );
  return (
    <div className={styles.page}>
      <Link href="/dashboard">Back to dashboard</Link>
      <header>
        <h1>Post a project</h1>
        <p>
          Describe the work, set a budget and review your brief before
          publishing.
        </p>
      </header>
      <ol className={styles.steps} aria-label="Project creation progress">
        {STEPS.map((label, index) => (
          <li key={label} aria-current={step === index ? "step" : undefined}>
            <span>{index + 1}</span>
            {label}
          </li>
        ))}
      </ol>
      {restored ? (
        <p role="status" className={styles.notice}>
          Your saved draft has been restored.
        </p>
      ) : null}
      <form onSubmit={submit} noValidate className={styles.panel}>
        <h2 ref={heading} tabIndex={-1}>
          {STEPS[step]}
        </h2>
        {error ? (
          <p role="alert" className={styles.error}>
            {error}
          </p>
        ) : null}
        {step === 0 ? (
          <div className={styles.fields}>
            <label>
              Project title
              <input
                aria-label="Project title"
                value={form.title}
                maxLength={120}
                onChange={(e) => field("title", e.target.value)}
                placeholder="e.g. Design a website for my bakery"
              />
            </label>
            <label>
              Category
              <select
                aria-label="Project category"
                value={form.categoryId}
                onChange={(e) => field("categoryId", e.target.value)}
              >
                <option value="">
                  {categories === undefined
                    ? "Loading categories…"
                    : "Select a category"}
                </option>
                {leaves.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Project description
              <textarea
                aria-label="Project description"
                rows={7}
                maxLength={PROJECT_LIMITS.descriptionMax}
                value={form.description}
                onChange={(e) => field("description", e.target.value)}
                placeholder="Describe your goal, the deliverables and what a successful result looks like."
              />
              <small>
                80–10,000 characters. Include the deliverables and what success
                looks like.
              </small>
            </label>
            <label>
              Skills (optional)
              <input
                aria-label="Required skills"
                value={form.skills}
                maxLength={500}
                onChange={(e) => field("skills", e.target.value)}
                placeholder="e.g. Web design, WordPress"
              />
              <small>Separate skills with commas.</small>
            </label>
            <p className={styles.notice}>
              This project is for online work. For work at your location,{" "}
              <Link href="/local/request-quote">request local quotes</Link>.
            </p>
          </div>
        ) : null}
        {step === 1 ? (
          <div className={styles.fields}>
            <p>Enter the total project budget in EUR.</p>
            <div className={styles.budget}>
              <label>
                Minimum budget (€)
                <input
                  aria-label="Minimum budget"
                  type="number"
                  min="1"
                  step="0.01"
                  value={form.budgetMin}
                  onChange={(e) => field("budgetMin", e.target.value)}
                />
              </label>
              <label>
                Maximum budget (€)
                <input
                  aria-label="Maximum budget"
                  type="number"
                  min="1"
                  step="0.01"
                  value={form.budgetMax}
                  onChange={(e) => field("budgetMax", e.target.value)}
                />
              </label>
            </div>
            <label>
              Deadline (optional)
              <input
                aria-label="Project deadline"
                type="date"
                value={form.deadline}
                onChange={(e) => field("deadline", e.target.value)}
              />
            </label>
            <p className={styles.notice}>
              The private beta does not process payments. This budget records
              the scope you want to discuss with freelancers.
            </p>
          </div>
        ) : null}
        {step === 2 ? (
          <div className={styles.review}>
            <h3>{form.title}</h3>
            <p>{form.description}</p>
            <dl>
              <dt>Category</dt>
              <dd>
                {leaves.find((item) => item._id === form.categoryId)?.label}
              </dd>
              <dt>Skills</dt>
              <dd>{form.skills || "Not specified"}</dd>
              <dt>Total budget</dt>
              <dd>
                €{form.budgetMin} – €{form.budgetMax}
              </dd>
              <dt>Deadline</dt>
              <dd>{form.deadline || "To be agreed"}</dd>
              <dt>Delivery</dt>
              <dd>Online</dd>
            </dl>
            <Button variant="outline" type="button" onClick={() => go(0)}>
              Edit project details
            </Button>
            <Button variant="outline" type="button" onClick={() => go(1)}>
              Edit budget & timing
            </Button>
          </div>
        ) : null}
        <footer className={styles.actions}>
          {step > 0 ? (
            <Button
              variant="outline"
              type="button"
              disabled={saving}
              onClick={() => go(step - 1)}
            >
              Previous
            </Button>
          ) : null}
          <Button variant="outline" type="button" disabled={saving || !ready} onClick={saveDraft}>
            Save draft
          </Button>
          <Button
            type="submit"
            disabled={saving || !ready || categories === undefined}
          >
            {saving
              ? "Publishing…"
              : step === 2
                ? "Publish project"
                : "Continue"}
          </Button>
        </footer>
      </form>
    </div>
  );
}
