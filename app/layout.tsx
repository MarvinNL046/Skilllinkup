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
  title: "Best Freelance Platforms 2025 | Compare Upwork, Fiverr & More - SkillLinkup",
  description: "Compare 25+ freelance platforms in 2025. Read honest reviews of Upwork, Fiverr, Toptal & more. Find the perfect marketplace for your skills today!",
  keywords: "freelance platforms 2025, best freelance marketplaces, Upwork vs Fiverr, freelance platform comparison, top freelance sites, freelancer reviews, remote work platforms",
  icons: {
    icon: "/images/favicon-skilllinkup.png",
    shortcut: "/images/favicon-skilllinkup.png",
    apple: "/images/favicon-skilllinkup.png",
  },
  openGraph: {
    title: "Best Freelance Platforms 2025 | Compare Upwork, Fiverr & More",
    description: "Compare 25+ freelance platforms. Read honest reviews and find the perfect marketplace for your skills.",
    url: "https://skilllinkup.com",
    siteName: "SkillLinkup",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://skilllinkup.com/images/og-image-homepage.jpg",
        width: 1200,
        height: 630,
        alt: "SkillLinkup - Compare Freelance Platforms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Freelance Platforms 2025 | Compare Upwork, Fiverr & More",
    description: "Compare 25+ freelance platforms. Read honest reviews and find the perfect marketplace for your skills.",
    images: ["https://skilllinkup.com/images/og-image-homepage.jpg"],
    creator: "@SkillLinkup",
    site: "@SkillLinkup",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://skilllinkup.com",
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
