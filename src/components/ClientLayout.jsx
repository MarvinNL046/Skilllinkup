"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import BottomToTop from "@/components/button/BottomToTop";
import SearchModal1 from "@/components/modal/SearchModal1";
import NavSidebar from "@/components/sidebar/NavSidebar";
import Providers from "@/components/Providers";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";
import AnnouncementBar from "@/components/ui/AnnouncementBar";
import CookieConsent from "@/components/ui/CookieConsent";
import { Toaster } from "sonner";

if (typeof window !== "undefined") {
  import("bootstrap");
}

export default function ClientLayout({ children }) {
  const path = usePathname();

  // wow js - re-initialize on route change
  useEffect(() => {
    const WOW = require("@/utils/wow");
    const wow = new WOW.default({
      mobile: false,
      live: false,
    });
    wow.init();
  }, [path]);

  return (
    <Providers>
      <a href="#main-content" className="skip-nav">
        Skip to content
      </a>
      <AnnouncementBar />
      <SearchModal1 />
      <main id="main-content">{children}</main>

      {/* bottom to top */}
      <BottomToTop />

      {/* sidebar mobile navigation */}
      <NavSidebar />
      <ExitIntentPopup />
      <Toaster position="bottom-right" richColors />
      <CookieConsent />
    </Providers>
  );
}
