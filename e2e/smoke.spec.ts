import fs from "fs";
import path from "path";
import { test, expect } from "@playwright/test";
import { clerk, setupClerkTestingToken } from "@clerk/testing/playwright";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";

const manifestPath = path.join(process.cwd(), "e2e", ".smoke-data.json");
const dashboardUserEmail =
  process.env.PLAYWRIGHT_SIGN_IN_EMAIL ||
  process.env.SMOKE_CLIENT_EMAIL ||
  "testonboarding@skilllinkup.com";
const freelancerUserEmail =
  process.env.PLAYWRIGHT_FREELANCER_EMAIL ||
  process.env.SMOKE_FREELANCER_EMAIL ||
  dashboardUserEmail;
const outsiderUserEmail =
  process.env.PLAYWRIGHT_OUTSIDER_EMAIL ||
  "skilllinkup.qa+outsider_clerk_test@skilllinkup.com";
const localClientUserEmail =
  process.env.PLAYWRIGHT_LOCAL_CLIENT_EMAIL ||
  "skilllinkup.qa+local-client_clerk_test@skilllinkup.com";
const companyUserEmail =
  process.env.PLAYWRIGHT_COMPANY_EMAIL ||
  process.env.SMOKE_COMPANY_EMAIL ||
  "skilllinkup.qa+company_clerk_test@skilllinkup.com";

function readManifest() {
  if (!fs.existsSync(manifestPath)) {
    throw new Error(
      "Missing e2e/.smoke-data.json. Run `npm run e2e:seed` first.",
    );
  }
  return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
}

function readLocalEnvValue(key: string) {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return undefined;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    if (!line || line.trimStart().startsWith("#")) continue;
    const separator = line.indexOf("=");
    if (separator === -1 || line.slice(0, separator).trim() !== key) continue;
    return line
      .slice(separator + 1)
      .trim()
      .replace(/^"|"$/g, "");
  }
  return undefined;
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("cookie_consent", "necessary");
  });
  await setupClerkTestingToken({ page });
});

async function signInToDashboardUser(
  page,
  baseURL,
  emailAddress = dashboardUserEmail,
) {
  if (!baseURL) {
    throw new Error("Playwright baseURL is required for Clerk sign-in.");
  }

  await page.goto(baseURL, {
    waitUntil: "domcontentloaded",
  });

  await page.waitForFunction(() => Boolean((window as any).Clerk));
  const hasActiveSession = await page.evaluate(() =>
    Boolean((window as any).Clerk?.session),
  );
  if (hasActiveSession) {
    await page.evaluate(async () => {
      await (window as any).Clerk.signOut();
    });
    await page.context().clearCookies();
    await page.goto(baseURL, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(
      () => Boolean((window as any).Clerk) && !(window as any).Clerk.session,
    );
  }

  await clerk.signIn({
    page,
    emailAddress,
  });

  await page.reload({
    waitUntil: "domcontentloaded",
  });
}

async function tabToControl(
  page: import("@playwright/test").Page,
  target: import("@playwright/test").Locator,
  maxTabs = 80,
) {
  for (let index = 0; index < maxTabs; index += 1) {
    await page.keyboard.press("Tab");
    if (await target.evaluate((element) => element === document.activeElement)) {
      const focusStyle = await target.evaluate((element) => {
        const style = window.getComputedStyle(element);
        return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth };
      });
      expect(focusStyle.outlineStyle).not.toBe("none");
      expect(Number.parseFloat(focusStyle.outlineWidth)).toBeGreaterThanOrEqual(2);
      return;
    }
  }
  throw new Error(`Keyboard focus did not reach ${await target.getAttribute("aria-label") || await target.textContent() || "the requested control"}.`);
}

async function createAuthenticatedConvexClient(
  page,
  baseURL,
  emailAddress: string,
) {
  await signInToDashboardUser(page, baseURL, emailAddress);
  await page.waitForFunction(() => Boolean((window as any).Clerk?.session));
  const token = await page.evaluate(async () => {
    return await (window as any).Clerk.session.getToken({ template: "convex" });
  });
  if (!token)
    throw new Error(`Clerk did not issue a Convex JWT for ${emailAddress}.`);

  const convexUrl =
    process.env.NEXT_PUBLIC_CONVEX_URL ||
    readLocalEnvValue("NEXT_PUBLIC_CONVEX_URL");
  if (!convexUrl)
    throw new Error(
      "NEXT_PUBLIC_CONVEX_URL is required for direct Convex security tests.",
    );
  const client = new ConvexHttpClient(convexUrl);
  client.setAuth(token);
  return client;
}

async function createIsolatedAuthenticatedConvexClient(
  browser: import("@playwright/test").Browser,
  baseURL: string | undefined,
  emailAddress: string,
) {
  if (!baseURL)
    throw new Error("Playwright baseURL is required for Clerk sign-in.");
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.addInitScript(() => {
    window.localStorage.setItem("cookie_consent", "necessary");
  });
  await setupClerkTestingToken({ page });
  await signInToDashboardUser(page, baseURL, emailAddress);
  await page.waitForFunction(() => Boolean((window as any).Clerk?.session));
  const token = await page.evaluate(async () => {
    return await (window as any).Clerk.session.getToken({ template: "convex" });
  });
  await context.close();
  if (!token)
    throw new Error(`Clerk did not issue a Convex JWT for ${emailAddress}.`);

  const convexUrl =
    process.env.NEXT_PUBLIC_CONVEX_URL ||
    readLocalEnvValue("NEXT_PUBLIC_CONVEX_URL");
  if (!convexUrl)
    throw new Error(
      "NEXT_PUBLIC_CONVEX_URL is required for direct Convex security tests.",
    );
  const client = new ConvexHttpClient(convexUrl);
  client.setAuth(token);
  return client;
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
    page.getByRole("heading", { name: /Smoke Test Service/ }).first(),
  ).toBeVisible();
  await expect(
    page.getByText("Smoke Test Package", { exact: false }).first(),
  ).toBeVisible();
});

test("project detail renders", async ({ page, baseURL }) => {
  const manifest = readManifest();
  await page.goto(new URL(manifest.routes.project, baseURL).toString(), {
    waitUntil: "networkidle",
  });

  await expect(
    page.getByRole("heading", { name: /Smoke Test Project/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Send your proposal" }),
  ).toBeVisible();
});

test("public project inventory and demo routes are labelled honestly", async ({
  page,
  baseURL,
}) => {
  await page.goto(new URL("/projects", baseURL).toString(), {
    waitUntil: "networkidle",
  });

  await expect(page.getByText("Live private-beta inventory")).toBeVisible();
  await expect(page.locator('a[href^="/online/project/"]').first()).toBeVisible();
  await expect(page.getByText("342 projects found")).toHaveCount(0);
  await expect(page.getByText("Studio Bright")).toHaveCount(0);

  await page.goto(new URL("/online/freelancer/demo", baseURL).toString(), {
    waitUntil: "networkidle",
  });
  await expect(page.getByText("Illustrative profile preview")).toBeVisible();

  await page.goto(new URL("/online/project/demo", baseURL).toString(), {
    waitUntil: "networkidle",
  });
  await expect(page.getByText("Illustrative project preview")).toBeVisible();
});

test("project inventory and profile preview fit a mobile viewport", async ({
  page,
  baseURL,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const route of ["/projects", "/online/freelancer/demo"]) {
    await page.goto(new URL(route, baseURL).toString(), {
      waitUntil: "networkidle",
    });
    await expect(page.locator("h1:visible")).toHaveCount(1);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  }
});

test("quote request detail renders", async ({ page, baseURL }) => {
  const manifest = readManifest();
  await page.goto(new URL(manifest.routes.quoteRequest, baseURL).toString(), {
    waitUntil: "networkidle",
  });

  await expect(
    page.getByRole("heading", { name: /Smoke Test Quote Request/ }),
  ).toBeVisible();
  await expect(page.getByText("Lead Status")).toBeVisible();
});

test("job detail renders", async ({ page, baseURL }) => {
  const manifest = readManifest();
  await page.goto(new URL(manifest.routes.job, baseURL).toString(), {
    waitUntil: "networkidle",
  });

  await expect(
    page.getByRole("heading", { name: /Smoke Test Job/ }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Apply For Job/ }).first(),
  ).toBeVisible();
});

test("dashboard redirects to login when signed out", async ({
  page,
  baseURL,
}) => {
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
    page
      .getByRole("heading", { level: 1, name: /Good (morning|afternoon|evening),/ })
      .first(),
  ).toBeVisible({ timeout: 15_000 });
  await expect(
    page.getByText("Here is an overview of your projects and recent activity."),
  ).toBeVisible();
});

test("protected workspace indexes expose one labelled page heading", async ({
  page,
  baseURL,
}) => {
  await signInToDashboardUser(page, baseURL);

  for (const route of [
    "/dashboard",
    "/manage-projects",
    "/proposal",
    "/orders",
    "/message",
    "/create-projects",
    "/my-profile",
  ]) {
    await page.goto(new URL(route, baseURL).toString(), {
      waitUntil: "domcontentloaded",
    });
    await expect(page.locator("h1:visible")).toHaveCount(1, {
      timeout: 20_000,
    });
  }

  const hydrationErrors: string[] = [];
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      /hydration failed|hydrated.*didn't match/i.test(message.text())
    ) {
      hydrationErrors.push(message.text());
    }
  });

  await page.evaluate(() => {
    window.localStorage.setItem("dashboard-sidebar-collapsed", "true");
  });
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.getByRole("link", { name: "Dashboard" })).toBeVisible();
  const collapseSidebar = page.getByRole("button", { name: "Collapse sidebar" });
  await expect(collapseSidebar).toBeVisible();
  await collapseSidebar.click();
  const expandSidebar = page.getByRole("button", { name: "Expand sidebar" });
  await expect(expandSidebar).toBeVisible();
  await expandSidebar.click();
  await expect(
    page.getByRole("button", { name: "Collapse sidebar" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();
  expect(hydrationErrors).toEqual([]);
});

test("private-beta finance routes explain that payments are disabled", async ({
  page,
  baseURL,
}) => {
  test.setTimeout(45_000);
  await signInToDashboardUser(page, baseURL);

  for (const route of ["/payouts", "/invoice", "/statements"]) {
    await page.goto(new URL(route, baseURL).toString(), {
      waitUntil: "domcontentloaded",
    });
    await expect(page.locator("h1:visible")).toHaveCount(1, {
      timeout: 15_000,
    });
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "No payment, escrow or transfer is created",
      }),
    ).toBeVisible();
  }
});

test("candidate application pipeline renders for the signed-in fixture", async ({
  page,
  baseURL,
}) => {
  const manifest = readManifest();
  await signInToDashboardUser(page, baseURL);

  await page.goto(
    new URL(manifest.routes.candidateApplications, baseURL).toString(),
    {
      waitUntil: "domcontentloaded",
    },
  );

  await expect(
    page.getByRole("heading", { name: "My applications" }),
  ).toBeVisible({
    timeout: 20_000,
  });
  await expect(page.getByText(/Smoke Test Job/).first()).toBeVisible();
  await expect(
    page.getByText("Submitted", { exact: true }).first(),
  ).toBeVisible();
});

test("private-beta order workspace renders deliverables and messaging", async ({
  page,
  baseURL,
}) => {
  const manifest = readManifest();
  await signInToDashboardUser(page, baseURL);

  await page.goto(new URL(manifest.routes.order, baseURL).toString(), {
    waitUntil: "domcontentloaded",
  });

  await expect(page.getByTestId("order-workspace")).toBeVisible({
    timeout: 20_000,
  });
  await expect(
    page.getByRole("heading", { name: /Smoke Workspace Project/ }),
  ).toBeVisible();
  await expect(
    page.getByText("Initial delivery note for the smoke-test workspace."),
  ).toBeVisible();
  await expect(
    page.getByText("In progress", { exact: true }).first(),
  ).toBeVisible();

  const smokeMessage = `Playwright workspace message ${Date.now()}`;
  await page.getByPlaceholder("Write a project message…").fill(smokeMessage);
  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.getByText(smokeMessage)).toBeVisible({ timeout: 15_000 });
});

test("online client can open the order workspace as the distinct buying party", async ({
  page,
  baseURL,
}) => {
  const manifest = readManifest();
  await signInToDashboardUser(page, baseURL, localClientUserEmail);

  await page.goto(new URL(manifest.routes.order, baseURL).toString(), {
    waitUntil: "domcontentloaded",
  });

  await expect(page.getByTestId("order-workspace")).toBeVisible({
    timeout: 20_000,
  });
  await expect(
    page.getByRole("heading", { name: /Smoke Workspace Project/ }),
  ).toBeVisible();
  await expect(
    page.getByText("Initial delivery note for the smoke-test workspace."),
  ).toBeVisible();
  await expect(
    page.getByText("In progress", { exact: true }).first(),
  ).toBeVisible();
});

test("local professional can open the appointment workspace", async ({
  page,
  baseURL,
}) => {
  const manifest = readManifest();
  await signInToDashboardUser(page, baseURL, freelancerUserEmail);

  await page.goto(new URL(manifest.routes.localOrder, baseURL).toString(), {
    waitUntil: "domcontentloaded",
  });

  await expect(page.getByTestId("local-appointment")).toBeVisible({
    timeout: 20_000,
  });
  await expect(
    page.getByRole("heading", { name: /Smoke Local Appointment/ }),
  ).toBeVisible();
  await expect(page.getByText("requested", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Confirm appointment" }),
  ).toBeVisible();
});

test("local client can open the appointment without professional controls", async ({
  page,
  baseURL,
}) => {
  const manifest = readManifest();
  await signInToDashboardUser(page, baseURL, localClientUserEmail);

  await page.goto(new URL(manifest.routes.localOrder, baseURL).toString(), {
    waitUntil: "domcontentloaded",
  });

  await expect(page.getByTestId("local-appointment")).toBeVisible({
    timeout: 20_000,
  });
  await expect(page.getByText("requested", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Confirm appointment" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Propose new time" }),
  ).toBeVisible();
});

test("deep Online and Local workspaces expose visible keyboard focus", async ({
  page,
  baseURL,
}) => {
  test.setTimeout(60_000);
  const manifest = readManifest();
  await signInToDashboardUser(page, baseURL, freelancerUserEmail);

  await page.goto(new URL(manifest.routes.order, baseURL).toString(), {
    waitUntil: "domcontentloaded",
  });
  await expect(page.getByTestId("order-workspace")).toBeVisible({ timeout: 20_000 });
  await page.locator("body").focus();
  await tabToControl(page, page.getByRole("button", { name: "Submit work for review" }));
  await tabToControl(page, page.getByRole("textbox", { name: "Project message" }));

  await page.goto(new URL(manifest.routes.localOrder, baseURL).toString(), {
    waitUntil: "domcontentloaded",
  });
  await expect(page.getByTestId("local-appointment")).toBeVisible({ timeout: 20_000 });
  await page.locator("body").focus();
  await tabToControl(page, page.getByRole("textbox", { name: "Propose a new appointment time" }));
  await tabToControl(page, page.getByRole("button", { name: "Confirm appointment" }));
  await tabToControl(page, page.getByRole("button", { name: "Cancel appointment" }));
});

const roleSmokeCases = [
  {
    role: "client",
    env: "PLAYWRIGHT_CLIENT_EMAIL",
    route: "/dashboard",
    heading: /Good (morning|afternoon|evening),/,
  },
  {
    role: "freelancer",
    env: "PLAYWRIGHT_FREELANCER_EMAIL",
    route: "/dashboard",
    heading: /Good (morning|afternoon|evening),/,
  },
  {
    role: "local professional",
    env: "PLAYWRIGHT_LOCAL_PROFESSIONAL_EMAIL",
    route: "/dashboard",
    heading: /Good (morning|afternoon|evening),/,
  },
  {
    role: "candidate",
    env: "PLAYWRIGHT_CANDIDATE_EMAIL",
    route: "/dashboard/applications",
    heading: "My applications",
  },
  {
    role: "company",
    env: "PLAYWRIGHT_COMPANY_EMAIL",
    route: "/manage-jobs",
    heading: "Manage Jobs",
  },
  {
    role: "admin",
    env: "PLAYWRIGHT_ADMIN_EMAIL",
    route: "/dashboard",
    heading: /Good (morning|afternoon|evening),/,
  },
];

for (const roleCase of roleSmokeCases) {
  test(`${roleCase.role} account can open its primary workspace`, async ({
    page,
    baseURL,
  }) => {
    const emailAddress = process.env[roleCase.env];
    test.skip(
      !emailAddress,
      `${roleCase.env} is not configured for this environment.`,
    );
    await signInToDashboardUser(page, baseURL, emailAddress);
    await page.goto(new URL(roleCase.route, baseURL).toString(), {
      waitUntil: "domcontentloaded",
    });
    await expect(
      page.getByRole("heading", { name: roleCase.heading }).first(),
    ).toBeVisible({ timeout: 20_000 });
  });
}

test("non-admin account is denied the Trust and Safety recovery queue", async ({
  page,
  baseURL,
}) => {
  await signInToDashboardUser(page, baseURL, dashboardUserEmail);
  await page.goto(new URL("/admin/trust", baseURL).toString(), {
    waitUntil: "domcontentloaded",
  });

  await expect(
    page.getByRole("heading", { name: "Admin access required" }),
  ).toBeVisible({ timeout: 20_000 });
  await expect(page.getByText("Trust & Safety centre")).toHaveCount(0);
});

test("admin account can open the Trust and Safety recovery queue", async ({
  page,
  baseURL,
}) => {
  const adminEmail = process.env.PLAYWRIGHT_ADMIN_EMAIL;
  test.skip(
    !adminEmail,
    "PLAYWRIGHT_ADMIN_EMAIL is not configured for this environment.",
  );
  await signInToDashboardUser(page, baseURL, adminEmail);
  await page.goto(new URL("/admin/trust", baseURL).toString(), {
    waitUntil: "domcontentloaded",
  });

  await expect(
    page.getByRole("heading", { name: "Trust & Safety centre" }),
  ).toBeVisible({ timeout: 20_000 });
  await expect(
    page.getByRole("heading", { name: "Private-beta health" }),
  ).toBeVisible({ timeout: 20_000 });
  await expect(page.getByText(/committed/).first()).toBeVisible({
    timeout: 20_000,
  });
  await expect(page.getByText("Admin access required")).toHaveCount(0);
});

test("unrelated account cannot read another user's private order workspace", async ({
  page,
  baseURL,
}) => {
  const manifest = readManifest();
  await signInToDashboardUser(page, baseURL, outsiderUserEmail);
  await page.goto(new URL(manifest.routes.order, baseURL).toString(), {
    waitUntil: "domcontentloaded",
  });

  await expect(
    page.getByRole("heading", { name: "We could not load this page." }),
  ).toBeVisible({ timeout: 20_000 });
  await expect(page.getByText(/Smoke Workspace Project/)).toHaveCount(0);
});

test("unrelated account cannot read a company's applicant pipeline", async ({
  page,
  baseURL,
}) => {
  const manifest = readManifest();
  await signInToDashboardUser(page, baseURL, outsiderUserEmail);
  await page.goto(
    new URL(manifest.routes.employerApplications, baseURL).toString(),
    {
      waitUntil: "domcontentloaded",
    },
  );

  await expect(
    page.getByRole("heading", { name: "We could not load this page." }),
  ).toBeVisible({ timeout: 20_000 });
  await expect(page.getByText(/Smoke Test Job/)).toHaveCount(0);
});

test("Convex rejects direct cross-account reads and mutations", async ({
  page,
  baseURL,
}) => {
  const manifest = readManifest();
  const client = await createAuthenticatedConvexClient(
    page,
    baseURL,
    outsiderUserEmail,
  );

  await expect(
    client.mutation(api.marketplace.projects.update, {
      projectId: manifest.ids.workspaceProjectId,
      title: "This cross-account update must never be persisted",
    }),
  ).rejects.toThrow(/Unauthorized/);
  await expect(
    client.mutation(api.marketplace.projects.remove, {
      projectId: manifest.ids.workspaceProjectId,
    }),
  ).rejects.toThrow(/Unauthorized/);
  await expect(
    client.query(api.marketplace.orders.getById, {
      orderId: manifest.ids.orderId,
    }),
  ).rejects.toThrow(/not a party to this order/);
  await expect(
    client.mutation(api.marketplace.deliverables.generateUploadUrl, {
      orderId: manifest.ids.orderId,
    }),
  ).rejects.toThrow(/Unauthorized/);
  await expect(
    client.mutation(api.marketplace.orders.deliver, {
      orderId: manifest.ids.orderId,
    }),
  ).rejects.toThrow(/only the freelancer/);
  await expect(
    client.mutation(api.marketplace.orders.requestRevision, {
      orderId: manifest.ids.orderId,
      message: "This unauthorized revision request must never be persisted.",
    }),
  ).rejects.toThrow(/only the client/);
  await expect(
    client.mutation(api.marketplace.orders.approve, {
      orderId: manifest.ids.orderId,
    }),
  ).rejects.toThrow(/only the client/);
  await expect(
    client.query(api.marketplace.jobApplications.listForJob, {
      jobId: manifest.ids.jobId,
    }),
  ).rejects.toThrow(/Unauthorized/);
  await expect(
    client.query(api.chat.conversations.getByOrder, {
      orderId: manifest.ids.orderId,
    }),
  ).rejects.toThrow(/Unauthorized/);
  await expect(
    client.mutation(api.chat.conversations.openForContext, {
      context: { type: "project_bid", bidId: manifest.ids.bidId },
    }),
  ).rejects.toThrow(/Unauthorized/);
  await expect(
    client.mutation(api.chat.conversations.openForContext, {
      context: { type: "local_quote", quoteId: manifest.ids.localQuoteId },
    }),
  ).rejects.toThrow(/Unauthorized/);
  await expect(
    client.mutation(api.chat.messages.send, {
      conversationId: manifest.ids.conversationId,
      content: "This outsider message must never be persisted.",
    }),
  ).rejects.toThrow(/Unauthorized/);
  await expect(
    client.mutation(api.marketplace.trust.createSupportTicket, {
      category: "online_order",
      subject: "Forbidden linked order",
      description:
        "This ticket must not be allowed to reference another user's private order.",
      relatedOrderId: manifest.ids.orderId,
    }),
  ).rejects.toThrow(/cannot link this order/);
  await expect(
    client.mutation(api.users.switchAccountContext, {
      activeRole: "company",
      preferredWorld: "jobs",
    }),
  ).rejects.toThrow(/Add this role to your account/);
  await expect(
    client.mutation(api.users.switchAccountContext, {
      activeRole: "client",
      preferredWorld: "jobs",
    }),
  ).rejects.toThrow(/not available in the selected product world/);
  await expect(
    client.query(api.marketplace.trust.listReportsForAdmin, {
      limit: 5,
    }),
  ).rejects.toThrow(/Admin access required/);
  await expect(
    client.query(api.marketplace.operations.getSnapshot, {
      windowDays: 30,
    }),
  ).rejects.toThrow(/Admin access required/);
  await expect(
    client.query(api.marketplace.localAppointments.getByOrder, {
      orderId: manifest.ids.localOrderId,
    }),
  ).rejects.toThrow(/Unauthorized/);
  await expect(
    client.mutation(api.marketplace.localAppointments.reschedule, {
      appointmentId: manifest.ids.localAppointmentId,
      scheduledStart: Date.now() + 8 * 24 * 60 * 60 * 1000,
    }),
  ).rejects.toThrow(/Unauthorized/);
  await expect(
    client.mutation(api.marketplace.localAppointments.updateStatus, {
      appointmentId: manifest.ids.localAppointmentId,
      status: "confirmed",
    }),
  ).rejects.toThrow(/Unauthorized/);
  await expect(
    client.mutation(api.marketplace.quotes.acceptQuote, {
      quoteId: manifest.ids.localQuoteId,
    }),
  ).rejects.toThrow(/Only the client who created this request/);
  await expect(
    client.mutation(api.marketplace.quotes.submitQuote, {
      quoteRequestId: manifest.ids.quoteRequestId,
      amount: 450,
      description:
        "This outsider quote must be rejected before it can be persisted.",
    }),
  ).rejects.toThrow(/Add the local professional role/);
  await expect(
    client.mutation(api.marketplace.leads.claimLead, {
      quoteRequestId: manifest.ids.quoteRequestId,
      claimType: "shared",
    }),
  ).rejects.toThrow(/Add the local professional role/);
});

test("context conversations stay private, idempotent and isolated per product", async ({
  browser,
  baseURL,
}) => {
  const manifest = readManifest();
  const onlineClient = await createIsolatedAuthenticatedConvexClient(
    browser,
    baseURL,
    dashboardUserEmail,
  );
  const localClient = await createIsolatedAuthenticatedConvexClient(
    browser,
    baseURL,
    localClientUserEmail,
  );
  const professional = await createIsolatedAuthenticatedConvexClient(
    browser,
    baseURL,
    freelancerUserEmail,
  );

  const onlineConversationId = await onlineClient.mutation(
    api.chat.conversations.openForContext,
    { context: { type: "project_bid", bidId: manifest.ids.bidId } },
  );
  await expect(
    professional.mutation(api.chat.conversations.openForContext, {
      context: { type: "project_bid", bidId: manifest.ids.bidId },
    }),
  ).resolves.toBe(onlineConversationId);

  const localConversationId = await localClient.mutation(
    api.chat.conversations.openForContext,
    { context: { type: "local_quote", quoteId: manifest.ids.localQuoteId } },
  );
  await expect(
    professional.mutation(api.chat.conversations.openForContext, {
      context: { type: "local_quote", quoteId: manifest.ids.localQuoteId },
    }),
  ).resolves.toBe(localConversationId);

  expect(onlineConversationId).not.toBe(localConversationId);
  expect(
    (await onlineClient.query(api.chat.conversations.getById, {
      conversationId: onlineConversationId,
    }))?.context.type,
  ).toBe("project_bid");
  expect(
    (await localClient.query(api.chat.conversations.getById, {
      conversationId: localConversationId,
    }))?.context.type,
  ).toBe("local_appointment");
});

test("stored uploads enforce authoritative MIME, size and account ownership", async ({
  browser,
  baseURL,
}) => {
  const manifest = readManifest();
  expect(freelancerUserEmail).not.toBe(dashboardUserEmail);
  const freelancer = await createIsolatedAuthenticatedConvexClient(
    browser,
    baseURL,
    freelancerUserEmail,
  );
  const client = await createIsolatedAuthenticatedConvexClient(
    browser,
    baseURL,
    dashboardUserEmail,
  );
  const outsider = await createIsolatedAuthenticatedConvexClient(
    browser,
    baseURL,
    outsiderUserEmail,
  );

  async function upload(contentType: string, body: Blob) {
    const uploadUrl = await freelancer.mutation(
      api.marketplace.deliverables.generateUploadUrl,
      { orderId: manifest.ids.orderId },
    );
    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": contentType },
      body,
    });
    expect(response.ok).toBeTruthy();
    return ((await response.json()) as { storageId: string })
      .storageId as never;
  }

  const textStorageId = await upload(
    "text/plain",
    new Blob(["private beta upload ownership test"]),
  );
  const textDeliverableId = await freelancer.mutation(
    api.marketplace.deliverables.add,
    {
      orderId: manifest.ids.orderId,
      storageId: textStorageId,
      fileName: "ownership-test.txt",
    },
  );

  await expect(
    client.mutation(api.marketplace.deliverables.add, {
      orderId: manifest.ids.orderId,
      storageId: textStorageId,
      fileName: "replayed.txt",
    }),
  ).rejects.toThrow(/belongs to another account/);

  await expect(
    outsider.mutation(api.marketplace.jobApplications.submit, {
      jobId: manifest.ids.jobId,
      coverLetter:
        "I am submitting this deliberately invalid attachment to verify that server-side MIME validation rejects it safely.",
      resumeStorageId: textStorageId,
    }),
  ).rejects.toThrow(/PDF, DOC or DOCX/);

  const largePdfStorageId = await upload(
    "application/pdf",
    new Blob([new ArrayBuffer(10 * 1024 * 1024 + 1)]),
  );
  const largeDeliverableId = await freelancer.mutation(
    api.marketplace.deliverables.add,
    {
      orderId: manifest.ids.orderId,
      storageId: largePdfStorageId,
      fileName: "oversize-resume-test.pdf",
    },
  );

  await expect(
    outsider.mutation(api.marketplace.jobApplications.submit, {
      jobId: manifest.ids.jobId,
      coverLetter:
        "I am submitting this deliberately oversized attachment to verify that authoritative storage metadata is enforced.",
      resumeStorageId: largePdfStorageId,
    }),
  ).rejects.toThrow(/smaller than 10 MB/);

  await freelancer.mutation(api.marketplace.deliverables.remove, {
    deliverableId: textDeliverableId,
  });
  await freelancer.mutation(api.marketplace.deliverables.remove, {
    deliverableId: largeDeliverableId,
  });
});

test("Convex grants the dedicated admin account its protected query", async ({
  page,
  baseURL,
}) => {
  const adminEmail = process.env.PLAYWRIGHT_ADMIN_EMAIL;
  test.skip(
    !adminEmail,
    "PLAYWRIGHT_ADMIN_EMAIL is not configured for this environment.",
  );
  const client = await createAuthenticatedConvexClient(
    page,
    baseURL,
    adminEmail,
  );
  const reports = await client.query(
    api.marketplace.trust.listReportsForAdmin,
    { limit: 5 },
  );
  expect(Array.isArray(reports)).toBe(true);
  const operations = await client.query(
    api.marketplace.operations.getSnapshot,
    { windowDays: 30 },
  );
  expect(operations.windowDays).toBe(30);
  expect(operations.online.demand).toBeGreaterThanOrEqual(1);
  expect(operations.local.demand).toBeGreaterThanOrEqual(1);
  expect(operations.jobs.demand).toBeGreaterThanOrEqual(1);
});

test("local client can reschedule but cannot confirm the appointment", async ({
  page,
  baseURL,
}) => {
  const manifest = readManifest();
  const client = await createAuthenticatedConvexClient(
    page,
    baseURL,
    localClientUserEmail,
  );
  const scheduledStart = Date.now() + 9 * 24 * 60 * 60 * 1000;

  const appointment = await client.query(
    api.marketplace.localAppointments.getByOrder,
    {
      orderId: manifest.ids.localOrderId,
    },
  );
  expect(appointment?.status).toBe("requested");
  await expect(
    client.mutation(api.marketplace.localAppointments.updateStatus, {
      appointmentId: manifest.ids.localAppointmentId,
      status: "confirmed",
    }),
  ).rejects.toThrow(/professional confirms the appointment/);
  await expect(
    client.mutation(api.marketplace.localAppointments.reschedule, {
      appointmentId: manifest.ids.localAppointmentId,
      scheduledStart,
      note: "The client proposed a new private-beta appointment time.",
    }),
  ).resolves.toEqual({ success: true });
  const rescheduled = await client.query(
    api.marketplace.localAppointments.getByOrder,
    {
      orderId: manifest.ids.localOrderId,
    },
  );
  expect(rescheduled?.scheduledStart).toBe(scheduledStart);
  expect(rescheduled?.status).toBe("requested");
});

test("local professional completes the confirmed service lifecycle", async ({
  page,
  baseURL,
}) => {
  const manifest = readManifest();
  const professional = await createAuthenticatedConvexClient(
    page,
    baseURL,
    freelancerUserEmail,
  );

  await expect(
    professional.mutation(api.marketplace.localAppointments.updateStatus, {
      appointmentId: manifest.ids.localAppointmentId,
      status: "confirmed",
    }),
  ).resolves.toEqual({ success: true });
  expect(
    (
      await professional.query(api.marketplace.localAppointments.getByOrder, {
        orderId: manifest.ids.localOrderId,
      })
    )?.status,
  ).toBe("confirmed");

  await expect(
    professional.mutation(api.marketplace.localAppointments.updateStatus, {
      appointmentId: manifest.ids.localAppointmentId,
      status: "in_progress",
    }),
  ).resolves.toEqual({ success: true });
  expect(
    (
      await professional.query(api.marketplace.quotes.getRequestById, {
        requestId: manifest.ids.localQuoteRequestId,
      })
    )?.status,
  ).toBe("in_progress");

  await expect(
    professional.mutation(api.marketplace.localAppointments.updateStatus, {
      appointmentId: manifest.ids.localAppointmentId,
      status: "completed",
    }),
  ).resolves.toEqual({ success: true });
  expect(
    (
      await professional.query(api.marketplace.localAppointments.getByOrder, {
        orderId: manifest.ids.localOrderId,
      })
    )?.status,
  ).toBe("completed");
  expect(
    (
      await professional.query(api.marketplace.quotes.getRequestById, {
        requestId: manifest.ids.localQuoteRequestId,
      })
    )?.status,
  ).toBe("completed");
  expect(
    (
      await professional.query(api.marketplace.orders.getById, {
        orderId: manifest.ids.localOrderId,
      })
    )?.status,
  ).toBe("completed");
  await expect(
    professional.mutation(api.marketplace.localAppointments.updateStatus, {
      appointmentId: manifest.ids.localAppointmentId,
      status: "confirmed",
    }),
  ).rejects.toThrow(/Invalid status transition/);
});

test("local client and professional publish two-sided reviews after completion", async ({
  browser,
  baseURL,
}) => {
  const manifest = readManifest();
  const client = await createIsolatedAuthenticatedConvexClient(
    browser,
    baseURL,
    localClientUserEmail,
  );
  const professional = await createIsolatedAuthenticatedConvexClient(
    browser,
    baseURL,
    freelancerUserEmail,
  );

  await expect(
    client.mutation(api.marketplace.reviews.create, {
      orderId: manifest.ids.localOrderId,
      revieweeId: manifest.ids.qaUserId,
      reviewerRole: "client",
      overallRating: 5,
      communicationRating: 5,
      qualityRating: 5,
      content:
        "The professional arrived prepared, communicated clearly and completed the local work carefully.",
    }),
  ).resolves.toEqual(expect.any(String));
  const privateReviews = await client.query(
    api.marketplace.reviews.getByOrder,
    {
      orderId: manifest.ids.localOrderId,
    },
  );
  expect(privateReviews).toHaveLength(1);
  expect(privateReviews[0]?.isPublic).toBe(false);

  await expect(
    professional.mutation(api.marketplace.reviews.create, {
      orderId: manifest.ids.localOrderId,
      revieweeId: manifest.ids.localClientId,
      reviewerRole: "freelancer",
      overallRating: 5,
      communicationRating: 5,
      content:
        "The customer provided clear access details and confirmed the completed work promptly.",
    }),
  ).resolves.toEqual(expect.any(String));
  const publicReviews = await professional.query(
    api.marketplace.reviews.getByOrder,
    {
      orderId: manifest.ids.localOrderId,
    },
  );
  expect(publicReviews).toHaveLength(2);
  expect(publicReviews.every((review) => review.isPublic)).toBe(true);
});

test("local client cancellation synchronizes appointment, request and order", async ({
  browser,
  baseURL,
}) => {
  const manifest = readManifest();
  const client = await createIsolatedAuthenticatedConvexClient(
    browser,
    baseURL,
    localClientUserEmail,
  );
  const professional = await createIsolatedAuthenticatedConvexClient(
    browser,
    baseURL,
    freelancerUserEmail,
  );

  await expect(
    client.mutation(api.marketplace.localAppointments.updateStatus, {
      appointmentId: manifest.ids.cancellationAppointmentId,
      status: "cancelled",
      note: "The customer cancelled this private-beta appointment before confirmation.",
    }),
  ).resolves.toEqual({ success: true });
  expect(
    (
      await client.query(api.marketplace.localAppointments.getByOrder, {
        orderId: manifest.ids.cancellationOrderId,
      })
    )?.status,
  ).toBe("cancelled");
  expect(
    (
      await client.query(api.marketplace.quotes.getRequestById, {
        requestId: manifest.ids.cancellationQuoteRequestId,
      })
    )?.status,
  ).toBe("cancelled");
  expect(
    (
      await client.query(api.marketplace.orders.getById, {
        orderId: manifest.ids.cancellationOrderId,
      })
    )?.status,
  ).toBe("cancelled");
  await expect(
    professional.mutation(api.marketplace.localAppointments.updateStatus, {
      appointmentId: manifest.ids.cancellationAppointmentId,
      status: "confirmed",
    }),
  ).rejects.toThrow(/Invalid status transition/);
});

test("online client and freelancer complete delivery, revision, approval and blind reviews", async ({
  browser,
  baseURL,
}) => {
  const manifest = readManifest();
  const freelancer = await createIsolatedAuthenticatedConvexClient(
    browser,
    baseURL,
    freelancerUserEmail,
  );
  const client = await createIsolatedAuthenticatedConvexClient(
    browser,
    baseURL,
    localClientUserEmail,
  );

  await expect(
    freelancer.mutation(api.marketplace.orders.deliver, {
      orderId: manifest.ids.orderId,
    }),
  ).resolves.toEqual({ success: true });
  expect(
    (
      await freelancer.query(api.marketplace.orders.getById, {
        orderId: manifest.ids.orderId,
      })
    )?.status,
  ).toBe("delivered");
  await expect(
    freelancer.mutation(api.marketplace.orders.approve, {
      orderId: manifest.ids.orderId,
    }),
  ).rejects.toThrow(/only the client/);

  await expect(
    client.mutation(api.marketplace.orders.deliver, {
      orderId: manifest.ids.orderId,
    }),
  ).rejects.toThrow(/only the freelancer/);
  await expect(
    client.mutation(api.marketplace.orders.requestRevision, {
      orderId: manifest.ids.orderId,
      message:
        "Please tighten the responsive layout and include the final handoff notes.",
    }),
  ).resolves.toEqual({ success: true, revisionsUsed: 1 });
  expect(
    (
      await client.query(api.marketplace.orders.getById, {
        orderId: manifest.ids.orderId,
      })
    )?.status,
  ).toBe("revision_requested");

  await expect(
    freelancer.mutation(api.marketplace.orders.deliver, {
      orderId: manifest.ids.orderId,
    }),
  ).resolves.toEqual({ success: true });
  expect(
    (
      await freelancer.query(api.marketplace.orders.getById, {
        orderId: manifest.ids.orderId,
      })
    )?.status,
  ).toBe("delivered");

  await expect(
    client.mutation(api.marketplace.orders.approve, {
      orderId: manifest.ids.orderId,
    }),
  ).resolves.toEqual({ success: true });
  expect(
    (
      await client.query(api.marketplace.orders.getById, {
        orderId: manifest.ids.orderId,
      })
    )?.status,
  ).toBe("completed");
  await expect(
    client.mutation(api.marketplace.orders.requestRevision, {
      orderId: manifest.ids.orderId,
      message: "A completed order must reject this attempted state rollback.",
    }),
  ).rejects.toThrow(/Invalid status transition/);

  const clientReviewId = await client.mutation(api.marketplace.reviews.create, {
    orderId: manifest.ids.orderId,
    revieweeId: manifest.ids.qaUserId,
    reviewerRole: "client",
    overallRating: 5,
    communicationRating: 5,
    qualityRating: 5,
    timelinessRating: 5,
    valueRating: 5,
    content:
      "Clear communication, thoughtful revisions and an excellent private-beta delivery.",
  });
  expect(typeof clientReviewId).toBe("string");
  await expect(
    client.mutation(api.marketplace.reviews.create, {
      orderId: manifest.ids.orderId,
      revieweeId: manifest.ids.qaUserId,
      reviewerRole: "client",
      overallRating: 5,
      content: "This duplicate review must be rejected by the backend.",
    }),
  ).rejects.toThrow(/already reviewed/);

  const freelancerReviewId = await freelancer.mutation(
    api.marketplace.reviews.create,
    {
      orderId: manifest.ids.orderId,
      revieweeId: manifest.ids.localClientId,
      reviewerRole: "freelancer",
      overallRating: 5,
      communicationRating: 5,
      content:
        "Focused feedback and quick approval made this collaboration run smoothly.",
    },
  );
  expect(typeof freelancerReviewId).toBe("string");
  const reviews = await freelancer.query(api.marketplace.reviews.getByOrder, {
    orderId: manifest.ids.orderId,
  });
  expect(reviews).toHaveLength(2);
  expect(reviews.every((review) => review.isPublic)).toBe(true);
});

test("company and candidate complete the protected hiring and withdrawal lifecycles", async ({
  browser,
  baseURL,
}) => {
  const manifest = readManifest();
  const company = await createIsolatedAuthenticatedConvexClient(
    browser,
    baseURL,
    companyUserEmail,
  );
  const candidate = await createIsolatedAuthenticatedConvexClient(
    browser,
    baseURL,
    dashboardUserEmail,
  );

  await expect(
    candidate.mutation(api.marketplace.jobApplications.updateStatus, {
      applicationId: manifest.ids.jobApplicationId,
      status: "screening",
    }),
  ).rejects.toThrow(/Unauthorized/);
  await expect(
    company.mutation(api.marketplace.jobApplications.withdraw, {
      applicationId: manifest.ids.jobApplicationId,
    }),
  ).rejects.toThrow(/Unauthorized/);

  for (const status of ["screening", "interview", "offer", "hired"] as const) {
    await expect(
      company.mutation(api.marketplace.jobApplications.updateStatus, {
        applicationId: manifest.ids.jobApplicationId,
        status,
        employerNote: `Private beta lifecycle moved to ${status}.`,
      }),
    ).resolves.toBe(manifest.ids.jobApplicationId);
    if (status === "screening") {
      const companyConversationId = await company.mutation(
        api.chat.conversations.openForContext,
        {
          context: {
            type: "job_application",
            applicationId: manifest.ids.jobApplicationId,
          },
        },
      );
      await expect(
        candidate.mutation(api.chat.conversations.openForContext, {
          context: {
            type: "job_application",
            applicationId: manifest.ids.jobApplicationId,
          },
        }),
      ).resolves.toBe(companyConversationId);
      expect(
        (await candidate.query(api.chat.conversations.getById, {
          conversationId: companyConversationId,
        }))?.context.type,
      ).toBe("job_application");
    }
  }
  const employerPipeline = await company.query(
    api.marketplace.jobApplications.listForJob,
    {
      jobId: manifest.ids.jobId,
    },
  );
  expect(employerPipeline[0]?.application.status).toBe("hired");
  await expect(
    company.mutation(api.marketplace.jobApplications.updateStatus, {
      applicationId: manifest.ids.jobApplicationId,
      status: "rejected",
    }),
  ).rejects.toThrow(/Invalid status transition/);

  await expect(
    candidate.mutation(api.marketplace.jobApplications.withdraw, {
      applicationId: manifest.ids.withdrawalJobApplicationId,
    }),
  ).resolves.toBe(manifest.ids.withdrawalJobApplicationId);
  const withdrawn = await candidate.query(
    api.marketplace.jobApplications.getMineForJob,
    {
      jobId: manifest.ids.withdrawalJobId,
    },
  );
  expect(withdrawn?.status).toBe("withdrawn");
  await expect(
    company.mutation(api.marketplace.jobApplications.updateStatus, {
      applicationId: manifest.ids.withdrawalJobApplicationId,
      status: "screening",
    }),
  ).rejects.toThrow(/Invalid status transition/);

  await expect(
    company.mutation(api.marketplace.jobs.update, {
      jobId: manifest.ids.withdrawalJobId,
      expiresAt: Date.now() - 60_000,
    }),
  ).resolves.toBe(manifest.ids.withdrawalJobId);
  await expect(
    candidate.mutation(api.marketplace.jobApplications.submit, {
      jobId: manifest.ids.withdrawalJobId,
      coverLetter:
        "This sufficiently long application must be rejected because the vacancy has already expired and is no longer eligible for applications.",
    }),
  ).rejects.toThrow(/job has expired/);
  await expect(
    company.mutation(api.marketplace.jobs.update, {
      jobId: manifest.ids.withdrawalJobId,
      status: "closed",
    }),
  ).resolves.toBe(manifest.ids.withdrawalJobId);
  await expect(
    candidate.mutation(api.marketplace.jobApplications.submit, {
      jobId: manifest.ids.withdrawalJobId,
      coverLetter:
        "This sufficiently long application must be rejected because the employer has explicitly closed the vacancy to all new candidates.",
    }),
  ).rejects.toThrow(/not accepting applications/);

  for (const status of ["paused", "open", "filled"] as const) {
    await expect(
      company.mutation(api.marketplace.jobs.update, {
        jobId: manifest.ids.jobId,
        status,
      }),
    ).resolves.toBe(manifest.ids.jobId);
  }
  await expect(
    company.mutation(api.marketplace.jobs.update, {
      jobId: manifest.ids.jobId,
      status: "open",
    }),
  ).rejects.toThrow(/Invalid status transition/);
  await expect(
    candidate.mutation(api.marketplace.jobs.update, {
      jobId: manifest.ids.withdrawalJobId,
      status: "paused",
    }),
  ).rejects.toThrow(/Unauthorized/);
});

test("company can publish a vacancy and open its applicant pipeline", async ({
  page,
  baseURL,
}) => {
  const companyEmail = process.env.PLAYWRIGHT_COMPANY_EMAIL;
  test.skip(
    !companyEmail,
    "PLAYWRIGHT_COMPANY_EMAIL is not configured for this environment.",
  );
  await signInToDashboardUser(page, baseURL, companyEmail);
  await page.goto(new URL("/create-job", baseURL).toString(), {
    waitUntil: "domcontentloaded",
  });

  await expect(
    page.getByRole("button", { name: "Publish vacancy" }),
  ).toBeEnabled({
    timeout: 20_000,
  });

  const suffix = Date.now();
  const vacancyTitle = `Playwright Product Designer ${suffix}`;
  await page.getByLabel("Job title").pressSequentially(vacancyTitle);
  await page
    .getByLabel("Company")
    .pressSequentially("Skilllinkup Playwright Company");
  await page.getByLabel("Category").selectOption({ index: 1 });
  await page
    .getByLabel("Role description")
    .pressSequentially(
      "We are looking for a thoughtful product designer who can lead discovery, create clear interaction flows, collaborate with engineering and measure the quality of released work.",
    );
  await page
    .getByLabel("Required skills")
    .pressSequentially("Product strategy, Figma, Research");
  await expect(page.getByRole("heading", { name: vacancyTitle })).toBeVisible();
  await page.getByRole("button", { name: "Publish vacancy" }).click();

  await expect(page).toHaveURL(/\/manage-jobs\/[^/]+\/applications/, {
    timeout: 20_000,
  });
  await expect(
    page.getByRole("heading", { name: "Review applicants" }),
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
    page.getByRole("heading", { name: "Tell us about your project" }),
  ).toBeVisible();
  await expect(page.getByTestId("create-project-submit").first()).toBeEnabled({
    timeout: 20_000,
  });

  await page.getByTestId("create-project-title").fill(title);
  await page.getByTestId("create-project-budget-min").fill("900");
  await page.getByTestId("create-project-budget-max").fill("1200");
  await page.getByTestId("create-project-deadline").fill(formatDateInput(5));
  await page
    .getByTestId("create-project-description")
    .fill(
      "Playwright authenticated CRUD smoke test project created from the dashboard to verify the complete create, edit and cancellation workflow.",
    );
  for (let step = 2; step < 5; step += 1) {
    await page.getByTestId("create-project-submit").click();
    await expect(page.getByTestId("create-project-submit")).toHaveText(
      step === 4 ? /Publish project/ : /Next step/,
    );
  }
  await page.getByTestId("create-project-submit").click();

  await page.waitForURL(/\/manage-projects/, { timeout: 20_000 });

  const createdRow = page
    .getByTestId("manage-project-row")
    .filter({
      hasText: title,
    })
    .first();

  await expect(createdRow).toBeVisible({ timeout: 15_000 });
  await expect(createdRow).toContainText("EUR 900 - 1200");
  await expect(createdRow).toContainText("Open");

  const editTrigger = createdRow.getByTestId("manage-project-edit");
  await editTrigger.click();

  const editModal = page.getByTestId("manage-project-edit-modal");
  await expect(editModal).toBeVisible();
  await expect(editModal.getByTestId("manage-project-edit-title")).toBeFocused();
  for (let press = 0; press < 12; press += 1) {
    await page.keyboard.press("Tab");
    const focusInsideDialog = await page.evaluate(() =>
      Boolean(document.activeElement?.closest("[role='dialog']")),
    );
    expect(focusInsideDialog).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(editModal).toHaveCount(0);
  await expect(editTrigger).toBeFocused();

  await editTrigger.click();
  await expect(editModal).toBeVisible();
  await editModal.getByTestId("manage-project-edit-title").fill(updatedTitle);
  await editModal
    .getByTestId("manage-project-edit-description")
    .fill("Updated by the authenticated Playwright CRUD smoke test.");
  await editModal.getByTestId("manage-project-edit-budget-min").fill("1100");
  await editModal.getByTestId("manage-project-edit-budget-max").fill("1500");
  await editModal.getByTestId("manage-project-edit-work-type").click();
  await page.getByRole("option", { name: /Hybrid/i }).click();
  await editModal.getByTestId("manage-project-edit-submit").click();

  const updatedRow = page
    .getByTestId("manage-project-row")
    .filter({
      hasText: updatedTitle,
    })
    .first();

  await expect(updatedRow).toBeVisible({ timeout: 15_000 });
  await expect(updatedRow).toContainText("EUR 1100 - 1500");
  await expect(updatedRow).toContainText("Hybrid");

  await updatedRow.getByTestId("manage-project-delete").dispatchEvent("click");

  const deleteModal = page
    .getByTestId("manage-project-delete-modal")
    .filter({
      hasText: updatedTitle,
    })
    .first();

  await expect(deleteModal).toContainText(updatedTitle, { timeout: 15_000 });
  await deleteModal
    .getByTestId("manage-project-delete-confirm")
    .dispatchEvent("click");

  await expect(updatedRow).toContainText("Cancelled", { timeout: 15_000 });
});
