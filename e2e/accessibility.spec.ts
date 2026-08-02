import { expect, test } from "@playwright/test";

const PUBLIC_ROUTES = [
  "/",
  "/services",
  "/projects",
  "/online/freelancers",
  "/local",
  "/jobs",
  "/login",
  "/register",
] as const;

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("cookie_consent", "necessary");
  });
});

for (const route of PUBLIC_ROUTES) {
  test(`${route} exposes a labelled, landmark-based page`, async ({ page }) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });

    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1:visible")).toHaveCount(1);
    await expect(page.locator("#main-content")).toHaveAttribute("tabindex", "-1");

    const violations = await page.evaluate(() => {
      const visible = (element: Element) => {
        const style = window.getComputedStyle(element);
        return style.display !== "none" && style.visibility !== "hidden";
      };
      const hasLabel = (element: Element) => {
        const id = element.getAttribute("id");
        const labelledBy = element.getAttribute("aria-labelledby");
        return Boolean(
          element.getAttribute("aria-label")?.trim() ||
          element.getAttribute("title")?.trim() ||
          (id && document.querySelector(`label[for="${CSS.escape(id)}"]`)) ||
          element.closest("label") ||
          (labelledBy && labelledBy.split(/\s+/).every((labelId) => document.getElementById(labelId))),
        );
      };
      const controls = [...document.querySelectorAll("input:not([type='hidden']), select, textarea")]
        .filter(visible)
        .filter((element) => !hasLabel(element))
        .map((element) => `${element.tagName.toLowerCase()}[type=${element.getAttribute("type") || "n/a"}]`);
      const images = [...document.querySelectorAll("img")]
        .filter((image) => !image.hasAttribute("alt"))
        .map((image) => image.getAttribute("src") || "unknown image");
      const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
      const duplicateIds = [...new Set(ids.filter((id, index) => id && ids.indexOf(id) !== index))];
      return { controls, images, duplicateIds };
    });

    expect(violations).toEqual({ controls: [], images: [], duplicateIds: [] });
  });
}

test("keyboard users can skip directly to page content", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const skipLink = page.locator(".skip-nav");

  for (let attempt = 0; attempt < 5; attempt += 1) {
    await page.keyboard.press("Tab");
    if (await skipLink.evaluate((element) => element === document.activeElement)) break;
  }

  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("reduced-motion preference disables nonessential page motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(350);

  const motionState = await page.evaluate(() => {
    const element = document.querySelector(".card, .card-vakman") || document.body;
    const style = window.getComputedStyle(element);
    return {
      animationDuration: style.animationDuration,
      transitionDuration: style.transitionDuration,
      motionLiftBound: element.getAttribute("data-motion-lift-bound"),
    };
  });

  expect(Number.parseFloat(motionState.animationDuration)).toBeLessThanOrEqual(0.00001);
  expect(Number.parseFloat(motionState.transitionDuration)).toBeLessThanOrEqual(0.00001);
  expect(motionState.motionLiftBound).toBeNull();
});

test("mobile navigation and waitlist dialogs manage keyboard focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByRole("dialog", { name: "Mobile navigation" })).toHaveCount(0);
  await page.getByRole("button", { name: "Open navigation" }).click();

  const mobileNavigation = page.getByRole("dialog", { name: "Mobile navigation" });
  await expect(mobileNavigation).toBeVisible();
  await expect(page.getByRole("button", { name: "Close navigation" })).toBeFocused();

  const waitlistTrigger = mobileNavigation.getByRole("button", { name: "Join Waitlist" });
  await waitlistTrigger.click();
  const waitlistDialog = page.locator('[role="dialog"][data-state="open"]');
  const email = waitlistDialog.getByRole("textbox", { name: /email/i });
  await expect(email).toBeFocused();

  for (let press = 0; press < 8; press += 1) {
    await page.keyboard.press("Tab");
    const focusInsideDialog = await page.evaluate(() =>
      Boolean(document.activeElement?.closest("[role='dialog']")),
    );
    expect(focusInsideDialog).toBe(true);
  }

  await page.keyboard.press("Escape");
  await expect(waitlistDialog).toHaveCount(0);
  await expect(waitlistTrigger).toBeFocused();
});

test("mobile professional filters trap and restore keyboard focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/online/freelancers", { waitUntil: "networkidle" });

  const trigger = page.getByRole("button", { name: "Filters", exact: true });
  await trigger.click();

  const dialog = page.getByRole("dialog", { name: "Filter professionals" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close filters" })).toBeFocused();

  const available = dialog.getByRole("checkbox", { name: "Available now" });
  await available.focus();
  await page.keyboard.press("Space");
  await expect(available).toBeChecked();

  for (let press = 0; press < 14; press += 1) {
    await page.keyboard.press("Tab");
    const focusInsideDialog = await page.evaluate(() =>
      Boolean(document.activeElement?.closest("[role='dialog']")),
    );
    expect(focusInsideDialog).toBe(true);
  }

  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
