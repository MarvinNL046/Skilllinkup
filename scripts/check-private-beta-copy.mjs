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
  "src/components/services/WebDesignCategory.jsx",
  "src/components/business/BusinessLanding.jsx",
  "src/components/dashboard/section/DashboardInfo.jsx",
  "src/components/dashboard/section/PrivateBetaFinanceInfo.jsx",
  "src/app/(online)/online/page.jsx",
  "src/app/(local)/local/page.jsx",
  "src/app/(jobs-world)/jobs/page.jsx",
];

const forbiddenClaims = [
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

if (failures.length) {
  console.error("Private-beta copy verification failed:\n" + failures.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

console.log(`Private-beta copy verified across ${surfaces.length} launch surfaces.`);
