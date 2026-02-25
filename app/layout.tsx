/**
 * Root layout - minimal wrapper for locale routing
 * Fonts defined here to avoid hydration mismatch
 */
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        {/* Freeio vendor CSS loaded from public/ */}
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/animate.css" />
        <link rel="stylesheet" href="/css/ace-responsive-menu.css" />
        <link rel="stylesheet" href="/css/menu.css" />
        <link rel="stylesheet" href="/css/fontawesome.css" />
        <link rel="stylesheet" href="/css/flaticon.css" />
        <link rel="stylesheet" href="/css/bootstrap-select.min.css" />
        <link rel="stylesheet" href="/css/slider.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/ud-custom-spacing.css" />
        <link rel="stylesheet" href="/css/dashbord_navitaion.css" />
        <link rel="stylesheet" href="/css/responsive.css" />
      </head>
      <body className={dmSans.className}>
        {children}
      </body>
    </html>
  );
}
