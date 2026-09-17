import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const surfaces = [
  "src/components/home/HomeHero.jsx",
  "src/components/home/MarketplaceShowcase.jsx",
  "src/components/home/ProcessWorkspace.jsx",
  "src/components/home/TrustStories.jsx",
  "src/components/freelancers/FreelancerDirectory.jsx",
  "src/components/freelancers/FreelancerProfile.jsx",
  "src/components/projects/ProjectsOverview.jsx",
  "src/components/projects/ProjectDetail.jsx",
  "src/components/services/ServicesOverview.jsx",
  "src/components/business/BusinessLanding.jsx",
  "src/components/dashboard/section/DashboardInfo.jsx",
  "src/components/dashboard/section/PrivateBetaFinanceInfo.jsx",
  "src/app/(online)/online/page.jsx",
  "src/app/(local)/local/page.jsx",
  "src/app/(jobs-world)/jobs/page.jsx",
  "src/components/section/CtaBanner3.jsx",
  "src/components/section/CtaBanner4.jsx",
  "src/components/section/About5.jsx",
  "src/components/dashboard/section/RoleDashboardInfo.jsx",
  "src/data/dashboard.js",
];

const forbiddenClaims = [
  /24\/7 support/i,
  /identity verification/i,
  /only pay for work you approve/i,
  /\d+\+ freelance platforms/i,
  /verified freelancers/i,
  /verified reviews/i,
  /(\|\||\?\?) "Verified company"/,
  /skilllinkup guarantees/i,
  /satisfaction support/i,
  /cashback rate/i,
  /dashboard\/rewards/i,
  /342 projects found/i,
  /trusted by clients worldwide/i,
  /top-rated professionals/i,
  /reliable payments/i,
  /protected payments?/i,
  /pay safely/i,
  /25[.,]000\+/i,
  /70[.,]000\+/i,
  /150[.,]000\+/i,
];

const failures = [];
for (const file of surfaces) {
  const source = await readFile(resolve(process.cwd(), file), "utf8");
  for (const pattern of forbiddenClaims) {
    if (pattern.test(source)) failures.push(`${file}: ${pattern}`);
  }
}

// Template and illustrative routes must not exist in production builds.
for (const gone of ["src/app/ui-elements", "src/app/invoices", "src/components/dashboard/section/RewardsInfo.jsx"]) {
  try {
    await readFile(resolve(process.cwd(), gone, gone.endsWith(".jsx") ? "" : "page.jsx"), "utf8");
    failures.push(`${gone}: template route or screen still exists`);
  } catch {}
}
const projectDetail = await readFile(resolve(process.cwd(), "src/components/projects/ProjectDetail.jsx"), "utf8");
if (!projectDetail.includes('process.env.NODE_ENV === "development" && (id === "sustainable-interior-brand"'))
  failures.push("ProjectDetail.jsx: the illustrative project must be limited to development");
const legal = await readFile(resolve(process.cwd(), "messages/en.json"), "utf8");
for (const pattern of [/Payments on SkillLinkup are processed by Stripe/i, /Refunds may be issued at SkillLinkup's discretion/i])
  if (pattern.test(legal)) failures.push(`messages/en.json: ${pattern}`);

if (failures.length) {
  console.error("Private-beta copy verification failed:\n" + failures.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

console.log(`Private-beta copy verified across ${surfaces.length} launch surfaces.`);
