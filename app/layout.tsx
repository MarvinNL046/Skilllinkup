import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "SkillLinkup - Find the Best Freelance Marketplaces",
  description: "Compare and discover the best freelance platforms for your skills. Honest reviews, detailed comparisons, and expert insights to help you succeed as a freelancer.",
  keywords: "freelance platforms, freelance marketplaces, Upwork, Fiverr, freelancer reviews, remote work",
  openGraph: {
    title: "SkillLinkup - Find the Best Freelance Marketplaces",
    description: "Compare and discover the best freelance platforms for your skills.",
    url: "https://skilllinkup.com",
    siteName: "SkillLinkup",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillLinkup - Find the Best Freelance Marketplaces",
    description: "Compare and discover the best freelance platforms for your skills.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${lexend.variable} font-sans antialiased`}>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
