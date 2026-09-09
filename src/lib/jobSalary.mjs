export function formatJobSalary(job) {
  const min = typeof job.salaryMin === "number" && Number.isFinite(job.salaryMin) ? job.salaryMin : null;
  const max = typeof job.salaryMax === "number" && Number.isFinite(job.salaryMax) ? job.salaryMax : null;
  if (min === null && max === null) return null;
  const currency = job.currency || "EUR";
  const format = (amount) => new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(amount);
  if (min !== null && max !== null) return min === max ? format(min) : `${format(min)}–${format(max)}`;
  return min !== null ? `From ${format(min)}` : `Up to ${format(max)}`;
}
