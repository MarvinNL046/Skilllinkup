import fs from "fs";
import path from "path";
import { test, expect } from "@playwright/test";
import { clerk, setupClerkTestingToken } from "@clerk/testing/playwright";

const manifestPath = path.join(process.cwd(), "e2e", ".smoke-data.json");
const dashboardUserEmail =
  process.env.PLAYWRIGHT_SIGN_IN_EMAIL
  || process.env.SMOKE_CLIENT_EMAIL
  || "testonboarding@skilllinkup.com";

function readManifest() {
  if (!fs.existsSync(manifestPath)) {
    throw new Error(
      "Missing e2e/.smoke-data.json. Run `npm run e2e:seed` first."
    );
  }
  return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
}

test.beforeEach(async ({ page }) => {
  await setupClerkTestingToken({ page });
});

async function signInToDashboardUser(page, baseURL) {
  if (!baseURL) {
    throw new Error("Playwright baseURL is required for Clerk sign-in.");
  }

  await page.goto(baseURL, {
    waitUntil: "domcontentloaded",
  });

  await clerk.signIn({
    page,
    emailAddress: dashboardUserEmail,
  });
}

test("service detail renders", async ({ page, baseURL }) => {
  const manifest = readManifest();
  await page.goto(new URL(manifest.routes.service, baseURL).toString(), {
    waitUntil: "networkidle",
  });

  await expect(
    page.getByRole("heading", { name: /Smoke Test Service/ }).first()
  ).toBeVisible();
  await expect(
    page.getByText("Smoke Test Package", { exact: false }).first()
  ).toBeVisible();
});

test("project detail renders", async ({ page, baseURL }) => {
  const manifest = readManifest();
  await page.goto(new URL(manifest.routes.project, baseURL).toString(), {
    waitUntil: "networkidle",
  });

  await expect(
    page.getByRole("heading", { name: /Smoke Test Project/ })
  ).toBeVisible();
  await expect(page.getByText("Project Proposals (1)")).toBeVisible();
});

test("quote request detail renders", async ({ page, baseURL }) => {
  const manifest = readManifest();
  await page.goto(new URL(manifest.routes.quoteRequest, baseURL).toString(), {
    waitUntil: "networkidle",
  });

  await expect(
    page.getByRole("heading", { name: /Smoke Test Quote Request/ })
  ).toBeVisible();
  await expect(page.getByText("Lead Status")).toBeVisible();
});

test("job detail renders", async ({ page, baseURL }) => {
  const manifest = readManifest();
  await page.goto(new URL(manifest.routes.job, baseURL).toString(), {
    waitUntil: "networkidle",
  });

  await expect(
    page.getByRole("heading", { name: /Smoke Test Job/ }).first()
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Apply For Job/ }).first()
  ).toBeVisible();
});

test("dashboard redirects to login when signed out", async ({ page, baseURL }) => {
  await page.goto(new URL("/dashboard", baseURL).toString(), {
    waitUntil: "domcontentloaded",
  });

  await expect(page).toHaveURL(/\/login/, { timeout: 15_000 });
});

test("dashboard renders when signed in", async ({ page, baseURL }) => {
  await signInToDashboardUser(page, baseURL);

  await page.goto(new URL("/dashboard", baseURL).toString(), {
    waitUntil: "domcontentloaded",
  });

  await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 });
  await expect(
    page.getByRole("heading", { name: "Dashboard" }).first()
  ).toBeVisible();
  await expect(
    page.getByText("Welcome back! Here is what is happening with your account.")
  ).toBeVisible();
});
