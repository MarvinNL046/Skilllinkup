"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import BottomToTop from "@/components/button/BottomToTop";
import SearchModal1 from "@/components/modal/SearchModal1";
import NavSidebar from "@/components/sidebar/NavSidebar";
import Providers from "@/components/Providers";

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
      <SearchModal1 />
      {children}

      {/* bottom to top */}
      <BottomToTop />

      {/* sidebar mobile navigation */}
      <NavSidebar />
    </Providers>
  );
}
