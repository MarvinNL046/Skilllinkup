import { create } from "zustand";

/**
 * Mobile navigation offcanvas — DS-native replacement for Bootstrap's
 * data-bs-toggle="offcanvas" pattern. The hamburger button in
 * MobileNavigation2 calls open(); the NavSidebar panel reads isOpen
 * and animates in / out; clicks on menu items or the backdrop call
 * close().
 */
const navStore = create((set) => ({
  isNavOpen: false,
  openNav: () => set({ isNavOpen: true }),
  closeNav: () => set({ isNavOpen: false }),
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
}));

export default navStore;
