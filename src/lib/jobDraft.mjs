export const EMPTY_JOB_FORM = Object.freeze({
  title: "",
  company: "",
  categoryId: "",
  description: "",
  requiredSkills: "",
  salaryMin: "",
  salaryMax: "",
  currency: "EUR",
  jobType: "full-time",
  experienceLevel: "mid",
  workType: "remote",
  locationCity: "",
  locationCountry: "Netherlands",
  benefits: "",
  expiresAt: "",
});

export function jobDraftKey(userId) {
  return userId ? `skilllinkup-job-draft:${userId}` : null;
}

export function restoreJobDraft(raw) {
  try {
    const draft = JSON.parse(raw || "null");
    if (draft?.version !== 1 || !draft.form || typeof draft.form !== "object")
      return null;
    return Object.fromEntries(
      Object.entries(EMPTY_JOB_FORM).map(([key, fallback]) => [
        key,
        typeof draft.form[key] === "string" ? draft.form[key] : fallback,
      ]),
    );
  } catch {
    return null;
  }
}
