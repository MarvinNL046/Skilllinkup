export function validatePublishingForm(form, kind, now = Date.now()) {
  const job = kind === "job";
  const title = form.title.trim();
  const description = form.description.trim();
  if (title.length < 8 || title.length > 120) return "Use a title between 8 and 120 characters.";
  const minimum = job ? 80 : 40;
  const maximum = job ? 10000 : 5000;
  if (description.length < minimum || description.length > maximum) return `Use a description between ${minimum} and ${maximum.toLocaleString("en-US")} characters.`;
  if (job) {
    if (!form.company.trim()) return "Add the hiring company.";
    if (!form.locationCountry.trim() || form.locationCountry.trim().length > 80) return "Add a valid applicant country.";
    if (form.workType !== "remote" && !form.locationCity.trim()) return "Add the city for hybrid and on-site vacancies.";
    if (form.locationCity.trim().length > 100) return "Use a city name of at most 100 characters.";
    for (const key of ["salaryMin", "salaryMax"]) {
      if (form[key] && (!Number.isFinite(Number(form[key])) || Number(form[key]) < 0)) return "Salary amounts must be valid non-negative numbers.";
    }
    if (form.salaryMin && form.salaryMax && Number(form.salaryMin) > Number(form.salaryMax)) return "Minimum salary cannot exceed maximum salary.";
    if (form.expiresAt && (!Number.isFinite(new Date(`${form.expiresAt}T23:59:59`).getTime()) || new Date(`${form.expiresAt}T23:59:59`).getTime() <= now)) return "The application deadline must be in the future.";
  } else {
    if (!form.categoryId) return "Choose the type of local service you need.";
    if (form.city.trim().length < 2 || form.city.trim().length > 100) return "Use a city or region between 2 and 100 characters.";
    if (!form.postcode.trim() || form.postcode.trim().length > 20) return "Enter a postcode of at most 20 characters.";
    if (!/^(netherlands|nederland|nl)$/i.test(form.country.trim())) return "Local private-beta requests are currently limited to the Netherlands.";
    if (form.preferredDate && !Number.isFinite(new Date(`${form.preferredDate}T09:00:00`).getTime())) return "Choose a valid preferred date.";
  }
  return null;
}
