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
      <body className={dmSans.className}>
        {children}
      </body>
    </html>
  );
}
