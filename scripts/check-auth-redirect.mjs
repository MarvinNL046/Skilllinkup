import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { createRequire } from "node:module";
import * as redirectHelpers from "../src/lib/authRedirect.mjs";

const { safeAuthRedirect } = redirectHelpers;
const require = createRequire(import.meta.url);
const ts = require("typescript");
const react = require("react");
let checks = 0;
function check(name, run) { run(); checks += 1; console.log(`PASS ${name}`); }

check("Internal destinations retain encoded query data and fragments", () => {
  for (const target of ["/", "/dashboard", "/services?q=logo%20design&language=en", "/nl/jobs/browse?q=C%2B%2B+%26+design#results", "/freelancer/ren%C3%A9"]) {
    assert.equal(safeAuthRedirect(target), target);
  }
  assert.equal(safeAuthRedirect("/online/../services?q=design"), "/services?q=design");
  const outerQuery = new URLSearchParams({ redirect_url: "/services?q=logo%20design&sort=newest" });
  assert.equal(safeAuthRedirect(new URLSearchParams(outerQuery.toString()).get("redirect_url")), "/services?q=logo%20design&sort=newest");
});

const rejectedTargets = [
  undefined, null, "", "dashboard", " https://example.org", "https://example.org", "https://internal.invalid/services", "//example.org", "///example.org/path", "javascript:alert(1)", "data:text/html,test",
  "/\\example.org", "\\example.org", "/%5cexample.org", "/%255cexample.org", "/%2fexample.org", "/%252fexample.org", "/\n/example.org", "/%00login", "/%7flogin", "/bad%encoding",
  "/login", "/login?redirect_url=/services", "/login/factor-one", "/register", "/nl/register/verify-email-address", "/de/login", "/fr/login#form", "/es/register", "/pt/login", "/it/register", "/pl/login",
  "/sign-in", "/sign-up", "/nl/sign-in", "/%73ign-up",
  "/services/../login", "/%6cogin", "/%256cogin", "/nl%2flogin", "/safe%2f..%2flogin", "/safe/%2e%2e/register", "/safe/%252e%252e/register",
];
check("Unsafe destinations and direct/encoded auth loops fall back to dashboard", () => {
  for (const target of rejectedTargets) assert.equal(safeAuthRedirect(target), "/dashboard", String(target));
});

// Exercise the actual JSX component/effect with Clerk and navigation adapters.
// No browser, authentication request, storage access or network is involved.
function componentFixture(file, { target, isLoaded = true, isSignedIn = false, pathname = "/services" } = {}) {
  const effects = [];
  const navigations = [];
  const params = new URLSearchParams();
  if (target !== undefined && target !== null) params.set("redirect_url", target);
  const SignIn = () => null;
  const router = { replace: (url) => navigations.push(url) };
  const overrides = {
    react: { ...react, useEffect: (callback) => effects.push(callback) },
    "next/navigation": { useRouter: () => router, useSearchParams: () => params, usePathname: () => pathname },
    "next/link": { __esModule: true, default: "Link" },
    "next-intl": { useTranslations: () => (key) => key === "signIn" ? "Inloggen" : key },
    "@clerk/nextjs": { SignIn, useUser: () => ({ isLoaded, isSignedIn }) },
    "@/components/footer/Footer14": { __esModule: true, default: "Footer" },
    "@/components/auth/AuthPageShell": { __esModule: true, default: "AuthPageShell", clerkAppearance: {} },
    "@/lib/authRedirect.mjs": redirectHelpers,
  };
  const source = fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, require(id) {
    if (Object.hasOwn(overrides, id)) return overrides[id];
    if (id === "react/jsx-runtime") return require(id);
    throw new Error(`Unexpected fixture dependency: ${id}`);
  } });
  return { Page: exports.default, effects, navigations, SignIn, params };
}

function findElement(element, type) {
  if (!element) return null;
  if (element.type === type) return element;
  for (const child of react.Children.toArray(element.props?.children)) {
    const match = findElement(child, type);
    if (match) return match;
  }
  return null;
}

const loginFile = "src/app/(auth)/login/[[...login]]/page.jsx";
check("Already signed-in sessions honor the safe return target instead of overwriting it", () => {
  for (const target of ["/services?q=logo%20design&sort=newest", "/local/professionals", ...rejectedTargets]) {
    const fixture = componentFixture(loginFile, { target, isSignedIn: true });
    const boundary = fixture.Page();
    assert.equal(boundary.type, react.Suspense);
    const content = boundary.props.children;
    const rendered = content.type(content.props);
    assert.equal(findElement(rendered, fixture.SignIn), null);
    fixture.effects.forEach((effect) => effect());
    assert.deepEqual(fixture.navigations, [safeAuthRedirect(target)]);
  }
});

check("Clerk sign-in receives the same safe target while the signup route remains unchanged", () => {
  for (const target of ["/jobs/browse?q=C%2B%2B", "//example.org", "/nl/login", undefined]) {
    const fixture = componentFixture(loginFile, { target });
    const content = fixture.Page().props.children;
    const signIn = findElement(content.type(content.props), fixture.SignIn);
    assert.ok(signIn);
    assert.equal(signIn.props.forceRedirectUrl, safeAuthRedirect(target));
    assert.equal(signIn.props.fallbackRedirectUrl, safeAuthRedirect(target));
    assert.equal(signIn.props.signUpUrl, "/register");
    fixture.effects.forEach((effect) => effect());
    assert.equal(fixture.navigations.length, 0);
  }
});

check("Loading auth state neither redirects nor mounts the sign-in widget", () => {
  const fixture = componentFixture(loginFile, { target: "/services", isLoaded: false, isSignedIn: true });
  const content = fixture.Page().props.children;
  assert.equal(findElement(content.type(content.props), fixture.SignIn), null);
  fixture.effects.forEach((effect) => effect());
  assert.equal(fixture.navigations.length, 0);
});

check("Public sign-in links preserve page filters, locale labels and the menu-close handler", () => {
  const fixture = componentFixture("src/components/header/PublicSignInLink.jsx");
  fixture.params.set("q", "C++ & design");
  fixture.params.set("sort", "newest");
  const onClick = () => {};
  const boundary = fixture.Page({ onClick });
  assert.equal(boundary.type, react.Suspense);
  assert.equal(boundary.props.fallback.props.href, "/login");
  const content = boundary.props.children;
  const link = content.type(content.props);
  const target = new URL(link.props.href, "https://internal.invalid").searchParams.get("redirect_url");
  assert.equal(target, "/services?q=C%2B%2B+%26+design&sort=newest");
  assert.equal(safeAuthRedirect(target), target);
  assert.equal(link.props.children, "Inloggen");
  assert.equal(link.props.onClick, onClick);
});

console.log(`\n${checks} auth redirect checks passed (${rejectedTargets.length} rejected URL variants).`);
