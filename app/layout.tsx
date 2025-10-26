/**
 * Root layout - minimal wrapper for locale routing
 * Fonts defined here to avoid hydration mismatch
 * Note: lang attribute is not set here - it's handled by middleware and locale layout metadata
 */
import { Inter, Lexend } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} ${lexend.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
