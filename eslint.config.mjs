import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      // The React Compiler is not enabled for this application. These compiler-
      // specific rules currently flag established controlled-form and relative-
      // time patterns that are valid without compiler transforms. Keep the core
      // Hooks, accessibility and Next.js rules active.
      "react-hooks/immutability": "off",
      "react-hooks/purity": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/static-components": "off",
    },
  },
  globalIgnores([
    ".next/**",
    ".next-corrupt-*/**",
    "convex/_generated/**",
    "documentation/**",
    "public/**",
    "work/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
  ]),
]);
