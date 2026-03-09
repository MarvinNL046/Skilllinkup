import { DM_Sans } from "next/font/google";
import "./globals.css";
import "react-tooltip/dist/react-tooltip.css";
import "rc-slider/assets/index.css";
import ClientLayout from "@/components/ClientLayout";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata = {
  title: {
    default: "SkillLinkup — Find the Right Talent, Anywhere",
    template: "%s | SkillLinkup",
  },
  description: "Online freelancers, local craftsmen, and job vacancies — all in one platform. Low fees, secure payments, and a marketplace built for both buyers and sellers.",
  metadataBase: new URL("https://skilllinkup.com"),
  openGraph: {
    type: "website",
    siteName: "SkillLinkup",
    title: "SkillLinkup — Find the Right Talent, Anywhere",
    description: "Online freelancers, local craftsmen, and job vacancies — all in one platform. Low fees, secure payments, and a marketplace built for both buyers and sellers.",
    url: "https://skilllinkup.com",
    images: [
      {
        url: "/images/logo/skilllinkup-og.png",
        width: 1200,
        height: 630,
        alt: "SkillLinkup — Find the Right Talent, Anywhere",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillLinkup — Find the Right Talent, Anywhere",
    description: "Online freelancers, local craftsmen, and job vacancies — all in one platform.",
    images: ["/images/logo/skilllinkup-og.png"],
  },
  alternates: {
    canonical: "./",
  },
};

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${dmSans.className}`}>
        <NextIntlClientProvider messages={messages}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
