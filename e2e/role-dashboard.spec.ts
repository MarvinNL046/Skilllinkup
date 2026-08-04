import { expect, test } from "@playwright/test";
import { clerk, setupClerkTestingToken } from "@clerk/testing/playwright";

const multiRoleEmail =
  process.env.PLAYWRIGHT_FREELANCER_EMAIL ||
  process.env.SMOKE_FREELANCER_EMAIL ||
  "skilllinkup.qa+clerk_test@skilllinkup.com";

async function signIn(page: import("@playwright/test").Page, baseURL: string | undefined) {
  if (!baseURL) throw new Error("Playwright baseURL is required.");
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => Boolean((window as any).Clerk));
  if (await page.evaluate(() => Boolean((window as any).Clerk?.session))) {
    await page.evaluate(async () => (window as any).Clerk.signOut());
    await page.context().clearCookies();
    await page.goto(baseURL, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => Boolean((window as any).Clerk) && !(window as any).Clerk.session);
  }
  await clerk.signIn({ page, emailAddress: multiRoleEmail });
  await page.goto(new URL("/dashboard", baseURL).toString(), { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: /Good morning/i })).toBeVisible({ timeout: 20_000 });
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("cookie_consent", "necessary");
    window.localStorage.setItem("dashboard-sidebar-collapsed", "false");
  });
  await setupClerkTestingToken({ page });
});

test("one account receives the correct dashboard for every role context", async ({ page, baseURL }) => {
  await signIn(page, baseURL);

  const dashboardBrand = page.getByRole("link", { name: "Skilllinkup home" });
  await expect(dashboardBrand.locator("img")).toHaveCount(1);
  await expect(dashboardBrand.locator("img")).toHaveAttribute(
    "src",
    /skilllinkup-logo\.png/,
  );
  await page.getByRole("button", { name: "Collapse sidebar" }).click();
  await expect(dashboardBrand.locator("img")).toBeVisible();
  await page.getByRole("button", { name: "Expand sidebar" }).click();

  const contexts = [
    { value: "client:online", heading: /overview of your projects/i, nav: "Find Online Talent" },
    { value: "client:local", heading: /Your local work, clearly organised/i, nav: "My Quote Requests" },
    { value: "freelancer:online", heading: /overview of your proposals/i, nav: "Manage Services" },
    { value: "local_professional:local", heading: /Turn nearby demand into trusted work/i, nav: "My Leads" },
    { value: "candidate:jobs", heading: /Keep your job search moving/i, nav: "My Applications" },
    { value: "company:jobs", heading: /Build your team from one hiring workspace/i, nav: "Manage Jobs" },
  ];

  for (const context of contexts) {
    const switcher = page.getByRole("combobox", { name: "Switch account role and marketplace" });
    await switcher.selectOption(context.value);
    await expect(page.getByText(context.heading).first()).toBeVisible({ timeout: 15_000 });
    await expect(page.getByRole("link", { name: context.nav, exact: true }).first()).toBeVisible();
  }

  await page.getByRole("combobox", { name: "Switch account role and marketplace" }).selectOption("client:online");
  await expect(page.getByRole("link", { name: "Manage Services", exact: true })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Add Services", exact: true })).toHaveCount(0);

  await page.getByRole("combobox", { name: "Switch account role and marketplace" }).selectOption("client:local");
  await expect(page.getByText(/Your local work, clearly organised/i).first()).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByText(/Your local work, clearly organised/i).first()).toBeVisible();
  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(hasHorizontalOverflow).toBe(false);
});

test("protected tools require the matching active account mode", async ({ page, baseURL }) => {
  await signIn(page, baseURL);

  const switcher = page.getByRole("combobox", {
    name: "Switch account role and marketplace",
  });
  await switcher.selectOption("client:online");
  await page.goto(new URL("/add-services", baseURL).toString(), {
    waitUntil: "domcontentloaded",
  });
  await expect(
    page.getByRole("heading", { name: "Continue as Online freelancer" }),
  ).toBeVisible({ timeout: 20_000 });
  await expect(page.getByText(/another mode on your account/i)).toBeVisible();

  await page.goto(new URL("/dashboard", baseURL).toString(), {
    waitUntil: "domcontentloaded",
  });
  await page
    .getByRole("combobox", { name: "Switch account role and marketplace" })
    .selectOption("freelancer:online");
  await page.goto(new URL("/create-job", baseURL).toString(), {
    waitUntil: "domcontentloaded",
  });
  await expect(
    page.getByRole("heading", { name: "Continue as Company hiring" }),
  ).toBeVisible({ timeout: 20_000 });

  await page.goto(new URL("/dashboard", baseURL).toString(), {
    waitUntil: "domcontentloaded",
  });
  await page
    .getByRole("combobox", { name: "Switch account role and marketplace" })
    .selectOption("client:online");
});
