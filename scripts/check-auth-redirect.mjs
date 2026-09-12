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

const browserOrigins = [
  "https://skilllinkup.com",
  "http://localhost:3011",
  "https://skilllinkup-h8hbbt5d7-marvinnl046s-projects.vercel.app",
];
const clerkReturnPath = "/create-projects?category=logo%20design&skills=C%2B%2B#brief";
check("Clerk absolute returns are normalized only for the trusted current browser origin", () => {
  for (const origin of browserOrigins) {
    const query = new URLSearchParams({ redirect_url: origin + clerkReturnPath });
    const target = new URLSearchParams(query.toString()).get("redirect_url");
    assert.equal(safeAuthRedirect(target, origin), clerkReturnPath);
    assert.equal(safeAuthRedirect(target), "/dashboard");
    assert.equal(safeAuthRedirect(`${origin}/online/../services?q=design`, origin), "/services?q=design");
  }
  assert.equal(safeAuthRedirect("https://skilllinkup.com:443/create-projects", "https://skilllinkup.com"), "/create-projects");
});

check("Absolute return URLs cannot change scheme, host or port or include credentials", () => {
  const origin = "https://skilllinkup.com";
  for (const target of [
    "http://skilllinkup.com/create-projects", "https://skilllinkup.com:444/create-projects",
    "https://skilllinkup.com.example.org/create-projects", "https://example.org/create-projects",
    "https://user@skilllinkup.com/create-projects", "https://user:password@skilllinkup.com/create-projects",
    "https://@skilllinkup.com/create-projects", "ftp://skilllinkup.com/create-projects",
    "javascript:location.href='/create-projects'", "//skilllinkup.com/create-projects",
  ]) assert.equal(safeAuthRedirect(target, origin), "/dashboard", target);
  assert.equal(safeAuthRedirect("https://localhost:3011/create-projects", "http://localhost:3011"), "/dashboard");
  assert.equal(safeAuthRedirect("http://localhost:3012/create-projects", "http://localhost:3011"), "/dashboard");
  for (const untrusted of [undefined, null, "null", "https://skilllinkup.com/path", "https://user@skilllinkup.com", "ftp://skilllinkup.com"]) {
    assert.equal(safeAuthRedirect(`${origin}/create-projects`, untrusted), "/dashboard");
  }
});

check("Same-origin absolute URLs retain encoded path and auth-loop protections", () => {
  for (const origin of browserOrigins) {
    for (const path of rejectedTargets.filter((target) => typeof target === "string" && target.startsWith("/"))) {
      assert.equal(safeAuthRedirect(origin + path, origin), "/dashboard", origin + path);
    }
  }
});

// Exercise the actual JSX component/effect with Clerk and navigation adapters.
// No browser, authentication request, storage access or network is involved.
function componentFixture(file, { target, isLoaded = true, isSignedIn = false, pathname = "/services", origin = browserOrigins[0], server = false } = {}) {
  const effects = [];
  const navigations = [];
  const state = [];
  const dependencies = [];
  let hookIndex = 0;
  let originReads = 0;
  const params = new URLSearchParams();
  if (target !== undefined && target !== null) params.set("redirect_url", target);
  const SignIn = () => null;
  const router = { replace: (url) => navigations.push(url) };
  const overrides = {
    react: {
      ...react,
      useState(initial) {
        const index = hookIndex++;
        if (!(index in state)) state[index] = initial;
        return [state[index], (value) => { state[index] = value; }];
      },
      useEffect(callback, deps) {
        const index = hookIndex++;
        if (!dependencies[index] || deps.some((value, position) => !Object.is(value, dependencies[index][position]))) effects.push(callback);
        dependencies[index] = deps;
      },
    },
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
  const browser = server ? {} : { window: { get location() { originReads += 1; return { origin }; } } };
  vm.runInNewContext(code, { exports, ...browser, require(id) {
    if (Object.hasOwn(overrides, id)) return overrides[id];
    if (id === "react/jsx-runtime") return require(id);
    throw new Error(`Unexpected fixture dependency: ${id}`);
  } });
  function flushEffects() { effects.splice(0).forEach((effect) => effect()); }
  function renderContent() {
    hookIndex = 0;
    const boundary = exports.default();
    const content = boundary.props.children;
    return { boundary, rendered: content.type(content.props) };
  }
  function renderAfterMount() {
    renderContent();
    flushEffects();
    return renderContent();
  }
  return { Page: exports.default, effects, navigations, SignIn, params, renderContent, renderAfterMount, flushEffects, originReads: () => originReads };
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
    const { boundary, rendered } = fixture.renderAfterMount();
    assert.equal(boundary.type, react.Suspense);
    assert.equal(findElement(rendered, fixture.SignIn), null);
    fixture.flushEffects();
    assert.deepEqual(fixture.navigations, [safeAuthRedirect(target)]);
  }
});

check("Clerk sign-in receives the same safe target while the signup route remains unchanged", () => {
  for (const target of ["/jobs/browse?q=C%2B%2B", "//example.org", "/nl/login", undefined]) {
    const fixture = componentFixture(loginFile, { target });
    const { rendered } = fixture.renderAfterMount();
    const signIn = findElement(rendered, fixture.SignIn);
    assert.ok(signIn);
    assert.equal(signIn.props.forceRedirectUrl, safeAuthRedirect(target));
    assert.equal(signIn.props.fallbackRedirectUrl, safeAuthRedirect(target));
    assert.equal(signIn.props.signUpUrl, "/register");
    fixture.flushEffects();
    assert.equal(fixture.navigations.length, 0);
  }
});

check("Loading auth state neither redirects nor mounts the sign-in widget", () => {
  const fixture = componentFixture(loginFile, { target: "/services", isLoaded: false, isSignedIn: true });
  const { rendered } = fixture.renderAfterMount();
  assert.equal(findElement(rendered, fixture.SignIn), null);
  fixture.flushEffects();
  assert.equal(fixture.navigations.length, 0);
});

check("Server and initial client output wait for browser origin without premature Clerk props or navigation", () => {
  for (const isSignedIn of [false, true]) {
    const target = browserOrigins[0] + clerkReturnPath;
    const server = componentFixture(loginFile, { target, isSignedIn, server: true });
    const client = componentFixture(loginFile, { target, isSignedIn });
    const serverOutput = server.renderContent().rendered;
    const clientOutput = client.renderContent().rendered;
    assert.equal(findElement(serverOutput, server.SignIn), null);
    assert.equal(findElement(clientOutput, client.SignIn), null);
    const { renderToStaticMarkup } = require("react-dom/server");
    assert.equal(renderToStaticMarkup(serverOutput), renderToStaticMarkup(clientOutput));
    assert.equal(client.originReads(), 0);
    client.flushEffects();
    assert.equal(client.originReads(), 1);
    assert.deepEqual(client.navigations, []);
  }
});

check("Mounted login uses trusted browser origin for Clerk props and existing-session navigation", () => {
  for (const origin of browserOrigins) {
    for (const isSignedIn of [false, true]) {
      for (const [target, expected] of [
        [origin + clerkReturnPath, clerkReturnPath],
        ["https://example.org/create-projects", "/dashboard"],
        [origin + "/%256cogin", "/dashboard"],
      ]) {
        const fixture = componentFixture(loginFile, { target, origin, isSignedIn });
        const { rendered } = fixture.renderAfterMount();
        fixture.flushEffects();
        assert.equal(fixture.originReads(), 1);
        if (isSignedIn) {
          assert.deepEqual(fixture.navigations, [expected]);
        } else {
          const signIn = findElement(rendered, fixture.SignIn);
          assert.ok(signIn);
          assert.equal(signIn.props.forceRedirectUrl, expected);
          assert.equal(signIn.props.fallbackRedirectUrl, expected);
          assert.equal(signIn.props.signUpUrl, "/register");
          assert.deepEqual(fixture.navigations, []);
        }
      }
    }
  }
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
