import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "nl", "de", "fr", "es", "pt", "it", "pl"],
  defaultLocale: "en",
  // Don't add locale prefix to URLs — keep existing route structure
  localePrefix: "as-needed",
});
