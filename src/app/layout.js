import { DM_Sans, Poppins, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "react-tooltip/dist/react-tooltip.css";
import "rc-slider/assets/index.css";
import ClientLayout from "@/components/ClientLayout";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";

// Legacy DM_Sans — kept until all pages migrated to design-system typography
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

// Design-system typography — "Poppins × Inter Modern + Space Grotesk".
// Poppins: primary sans (fris, tech/creative, rounded geometric personality).
// Inter: UI/body companion (optimised for small text and dense layouts).
// Space Grotesk: display + numerics (super-geometric, energetic headlines).
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const ogLocaleMap = { en: "en_US", nl: "nl_NL", de: "de_DE", fr: "fr_FR", es: "es_ES", pt: "pt_BR", it: "it_IT", pl: "pl_PL" };

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations("rootMeta");

  return {
    title: {
      default: t("title"),
      template: "%s | SkillLinkup",
    },
    description: t("description"),
    metadataBase: new URL("https://skilllinkup.com"),
    openGraph: {
      type: "website",
      siteName: "SkillLinkup",
      title: t("title"),
      description: t("description"),
      url: "https://skilllinkup.com",
      images: [
        {
          url: "/images/logo/skilllinkup-og.png",
          width: 1200,
          height: 630,
          alt: t("ogAlt"),
        },
      ],
      locale: ogLocaleMap[locale] || "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("twitterDescription"),
      images: ["/images/logo/skilllinkup-og.png"],
    },
    alternates: {
      canonical: "./",
    },
  };
}

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${poppins.variable} ${inter.variable} ${spaceGrotesk.variable} ${dmSans.variable}`}
    >
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-BRER9FEMTE" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BRER9FEMTE');
            `,
          }}
        />
      </head>
      <body className={poppins.className}>
        <NextIntlClientProvider messages={messages}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
