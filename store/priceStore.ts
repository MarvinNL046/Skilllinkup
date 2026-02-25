import { create } from 'zustand';

interface PriceState {
  plan: string;
  priceRange: [number, number];
  togglePlan: (val: string) => void;
  setPriceRange: (val: [number, number]) => void;
}

export const usePriceStore = create<PriceState>((set) => ({
  plan: '1m',
  priceRange: [0, 100000],
  togglePlan: (val) => set({ plan: val }),
  setPriceRange: (val) => set({ priceRange: val }),
}));
