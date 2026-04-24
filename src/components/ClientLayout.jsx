"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import BottomToTop from "@/components/button/BottomToTop";
import NavSidebar from "@/components/sidebar/NavSidebar";
import Providers from "@/components/Providers";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";
import AnnouncementBar from "@/components/ui/AnnouncementBar";
import CookieConsent from "@/components/ui/CookieConsent";
import { Toaster } from "sonner";

export default function ClientLayout({ children }) {
  const path = usePathname();

  // wow.js - re-initialize fade-in animations on route change. Template-only
  // scroll-reveal library; kept until we migrate wow classes to the DS Motion
  // One pattern. Does not depend on Bootstrap.
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
      <main id="main-content">{children}</main>

      <BottomToTop />

      {/* Mobile navigation offcanvas — DS-native panel driven by navStore,
          no Bootstrap JS required. */}
      <NavSidebar />
      <ExitIntentPopup />
      <Toaster position="bottom-right" richColors />
      <CookieConsent />
    </Providers>
  );
}
