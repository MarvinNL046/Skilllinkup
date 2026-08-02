"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useClerk, useUser } from "@clerk/nextjs";
import { ChevronDown, CircleHelp, LogOut, Menu, Search, Settings, UserRound } from "lucide-react";
import NotificationBell from "@/components/header/NotificationBell";
import dashboardSidebarStore from "@/store/dashboardSidebarStore";
import styles from "./DashboardHeader.module.css";

export default function DashboardHeader() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const toggleMobile = dashboardSidebarStore((state) => state.toggleMobile);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const closeOutside = (event) => { if (menuRef.current && !menuRef.current.contains(event.target)) setOpen(false); };
    const closeEscape = (event) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    return () => { document.removeEventListener("mousedown", closeOutside); document.removeEventListener("keydown", closeEscape); };
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.mobileBrand}><button type="button" onClick={toggleMobile} aria-label="Open dashboard navigation"><Menu size={21} /></button><Link href="/"><Image src="/images/logo/skilllinkup-link-logo.png" alt="Skilllinkup" width={736} height={168} priority /></Link></div>
      <form className={styles.search} action="/online/services"><Search size={18} /><input name="q" aria-label="Search Skilllinkup" placeholder="Search services, professionals or skills…" /></form>
      <div className={styles.actions}>
        <NotificationBell />
        <Link href="/help" className={styles.iconButton} aria-label="Help"><CircleHelp size={20} /></Link>
        <div className={styles.account} ref={menuRef}>
          <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-haspopup="menu"><span className={styles.avatar}>{user?.imageUrl ? <Image src={user.imageUrl} alt={user.fullName || "Your account"} width={42} height={42} unoptimized /> : <UserRound size={19} />}</span><strong>{user?.fullName || "Your account"}</strong><ChevronDown size={15} /></button>
          {open ? <div className={styles.menu} role="menu"><div><strong>{user?.fullName || "Account"}</strong><span>{user?.primaryEmailAddress?.emailAddress}</span></div><Link href="/my-profile" onClick={() => setOpen(false)}><UserRound size={16} /> Profile</Link><Link href="/dashboard/settings" onClick={() => setOpen(false)}><Settings size={16} /> Settings</Link><button type="button" onClick={() => signOut({ redirectUrl: "/" })}><LogOut size={16} /> Log out</button></div> : null}
        </div>
      </div>
    </header>
  );
}
