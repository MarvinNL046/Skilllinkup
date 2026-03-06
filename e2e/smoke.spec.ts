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

  await page.reload({
    waitUntil: "domcontentloaded",
  });
}

function formatDateInput(daysFromToday = 1) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  return date.toISOString().split("T")[0];
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

test("authenticated project crud flow works", async ({ page, baseURL }) => {
  const suffix = Date.now();
  const title = `Playwright CRUD Project ${suffix}`;
  const updatedTitle = `${title} Updated`;

  await signInToDashboardUser(page, baseURL);

  await page.goto(new URL("/create-projects", baseURL).toString(), {
    waitUntil: "domcontentloaded",
  });

  await expect(
    page.getByRole("heading", { name: "Create Project" })
  ).toBeVisible();
  await expect(page.getByTestId("create-project-submit").first()).toBeEnabled({
    timeout: 20_000,
  });

  await page.getByTestId("create-project-title").fill(title);
  await page.getByTestId("create-project-budget-min").fill("900");
  await page.getByTestId("create-project-budget-max").fill("1200");
  await page.getByTestId("create-project-deadline").fill(formatDateInput(5));
  await page.getByTestId("create-project-skills").fill("React, TypeScript, Playwright");
  await page.getByTestId("create-project-description").fill(
    "Playwright authenticated CRUD smoke test project created from the dashboard."
  );
  await page.getByTestId("create-project-submit").first().click();

  await page.waitForURL(/\/manage-projects/, { timeout: 20_000 });

  const createdRow = page.getByTestId("manage-project-row").filter({
    hasText: title,
  }).first();

  await expect(createdRow).toBeVisible({ timeout: 15_000 });
  await expect(createdRow).toContainText("EUR 900 - 1200");
  await expect(createdRow).toContainText("Open");

  await createdRow.getByTestId("manage-project-edit").click({ force: true });

  const editModal = page.getByTestId("manage-project-edit-modal");
  await expect(editModal).toBeVisible();
  await editModal.getByTestId("manage-project-edit-title").fill(updatedTitle);
  await editModal.getByTestId("manage-project-edit-description").fill(
    "Updated by the authenticated Playwright CRUD smoke test."
  );
  await editModal.getByTestId("manage-project-edit-budget-min").fill("1100");
  await editModal.getByTestId("manage-project-edit-budget-max").fill("1500");
  await editModal.getByTestId("manage-project-edit-work-type").selectOption("hybrid");
  await editModal.getByTestId("manage-project-edit-submit").click();

  const updatedRow = page.getByTestId("manage-project-row").filter({
    hasText: updatedTitle,
  }).first();

  await expect(updatedRow).toBeVisible({ timeout: 15_000 });
  await expect(updatedRow).toContainText("EUR 1100 - 1500");
  await expect(updatedRow).toContainText("Hybrid");

  await updatedRow.getByTestId("manage-project-delete").dispatchEvent("click");

  const deleteModal = page.getByTestId("manage-project-delete-modal").filter({
    hasText: updatedTitle,
  }).first();

  await expect(deleteModal).toContainText(updatedTitle, { timeout: 15_000 });
  await deleteModal
    .getByTestId("manage-project-delete-confirm")
    .dispatchEvent("click");

  await expect(updatedRow).toContainText("Cancelled", { timeout: 15_000 });
});
