import { create } from 'zustand';

interface ToggleState {
  isDashboardSidebarActive: boolean;
  isListingActive: boolean;
  dashboardSidebarToggleHandler: () => void;
  listingToggleHandler: () => void;
}

export const useToggleStore = create<ToggleState>((set) => ({
  isDashboardSidebarActive: false,
  isListingActive: false,
  dashboardSidebarToggleHandler: () =>
    set((state) => ({ isDashboardSidebarActive: !state.isDashboardSidebarActive })),
  listingToggleHandler: () =>
    set((state) => ({ isListingActive: !state.isListingActive })),
}));
