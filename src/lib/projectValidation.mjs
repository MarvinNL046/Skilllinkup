export const PROJECT_LIMITS = {
  titleMin: 10,
  titleMax: 120,
  descriptionMin: 80,
  descriptionMax: 10000,
};

export function validateProjectFields(fields, { requireBudget = false } = {}) {
  const errors = {};
  const title = fields.title?.trim() || "";
  const description = fields.description?.trim() || "";
  if (
    title.length < PROJECT_LIMITS.titleMin ||
    title.length > PROJECT_LIMITS.titleMax
  )
    errors.title = "Project titles must be between 10 and 120 characters.";
  if (
    description.length < PROJECT_LIMITS.descriptionMin ||
    description.length > PROJECT_LIMITS.descriptionMax
  )
    errors.description =
      "Project descriptions must be between 80 and 10,000 characters.";
  for (const key of ["budgetMin", "budgetMax"]) {
    const value = fields[key];
    if (value === undefined || value === "") {
      if (requireBudget)
        errors[key] = "Enter a positive minimum and maximum budget.";
    } else if (!Number.isFinite(Number(value)) || Number(value) <= 0) {
      errors[key] = "Budgets must be positive amounts.";
    }
  }
  if (
    fields.budgetMin !== undefined &&
    fields.budgetMax !== undefined &&
    fields.budgetMin !== "" &&
    fields.budgetMax !== "" &&
    Number(fields.budgetMin) > Number(fields.budgetMax)
  )
    errors.budgetMax = "The minimum budget cannot exceed the maximum budget.";
  return errors;
}

export function assertValidProjectFields(fields) {
  const error = Object.values(validateProjectFields(fields))[0];
  if (error) throw new Error(error);
}
