"use client";
import { create } from "zustand";

/**
 * Dashboard app-shell sidebar state. Two flags:
 *   collapsed  — desktop ≥1280px, user manually folded it to icon rail
 *   mobileOpen — <1024px drawer state
 *
 * Both values are session-only. A deterministic initial value prevents the
 * server and browser from rendering different dashboard trees during
 * hydration. The collapse choice still survives client-side navigation.
 */
const dashboardSidebarStore = create((set) => ({
  // Keep the server and the browser's first render identical.
  collapsed: false,
  mobileOpen: false,

  toggleCollapsed: () =>
    set((state) => ({ collapsed: !state.collapsed })),

  setCollapsed: (value) =>
    set({ collapsed: !!value }),

  openMobile:  () => set({ mobileOpen: true }),
  closeMobile: () => set({ mobileOpen: false }),
  toggleMobile: () => set((s) => ({ mobileOpen: !s.mobileOpen })),
}));

export default dashboardSidebarStore;
