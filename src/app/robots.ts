import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://skilllinkup.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard/",
          "/admin/",
          "/message/",
          "/orders/",
          "/invoice/",
          "/invoices/",
          "/payouts/",
          "/statements/",
          "/onboarding/",
          "/create-job/",
          "/create-projects/",
          "/proposal/",
          "/local/request-quote/",
          "/local/quote-request/",
          "/login/",
          "/register/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
