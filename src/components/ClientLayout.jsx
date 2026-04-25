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

  // Motion One — subtle spring-based hover lift on every .card. Per the
  // SkillLinkup Design System v2 handoff: scale 1.012 with the spring
  // easing on enter, ease back on leave. Wrapped in try/catch so a CDN
  // miss doesn't break the page. Re-runs on route change so newly
  // mounted cards get the listeners.
  useEffect(() => {
    let cleanups = [];
    let cancelled = false;
    (async () => {
      try {
        const { animate } = await import("motion");
        if (cancelled) return;
        const cards = document.querySelectorAll(".card, .card-vakman");
        cards.forEach((el) => {
          if (el.dataset.motionLiftBound === "1") return;
          el.dataset.motionLiftBound = "1";
          const onEnter = () =>
            animate(el, { scale: 1.012 }, { duration: 0.25, easing: [0.34, 1.56, 0.64, 1] });
          const onLeave = () =>
            animate(el, { scale: 1 }, { duration: 0.25 });
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            el.removeEventListener("mouseenter", onEnter);
            el.removeEventListener("mouseleave", onLeave);
            delete el.dataset.motionLiftBound;
          });
        });
      } catch {
        // Motion One unavailable — cards stay static, no error surfaced
      }
    })();
    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
    };
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
