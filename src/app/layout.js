import { DM_Sans } from "next/font/google";
import "./globals.css";
import "react-tooltip/dist/react-tooltip.css";
import "rc-slider/assets/index.css";
import ClientLayout from "@/components/ClientLayout";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata = {
  title: "SkillLinkup",
  description: "Find and hire top freelancers or offer your services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.className}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
