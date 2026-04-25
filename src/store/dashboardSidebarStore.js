"use client";
import { create } from "zustand";

const STORAGE_KEY = "dashboard-sidebar-collapsed";

function readInitial() {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function persist(value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, value ? "true" : "false");
  } catch {
    /* ignore */
  }
}

/**
 * Dashboard app-shell sidebar state. Two flags:
 *   collapsed  — desktop ≥1280px, user manually folded it to icon rail
 *   mobileOpen — <1024px drawer state
 *
 * collapsed persists to localStorage; mobileOpen is ephemeral.
 */
const dashboardSidebarStore = create((set) => ({
  collapsed: readInitial(),
  mobileOpen: false,

  toggleCollapsed: () =>
    set((state) => {
      const next = !state.collapsed;
      persist(next);
      return { collapsed: next };
    }),

  setCollapsed: (value) =>
    set(() => {
      persist(value);
      return { collapsed: !!value };
    }),

  openMobile:  () => set({ mobileOpen: true }),
  closeMobile: () => set({ mobileOpen: false }),
  toggleMobile: () => set((s) => ({ mobileOpen: !s.mobileOpen })),
}));

export default dashboardSidebarStore;
