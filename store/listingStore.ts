import { create } from 'zustand';

interface ListingState {
  deliveryTime: string;
  level: string;
  location: string[];
  bestSeller: string;
  designTool: string[];
  speak: string[];
  search: string;
  category: string[];
  projectType: string;
  englishLevel: string;
  jobType: string[];
  noOfEmployee: string;
  setDeliveryTime: (val: string) => void;
  setLevel: (val: string) => void;
  setLocation: (val: string[]) => void;
  setBestSeller: (val: string) => void;
  setDesignTool: (val: string[]) => void;
  setSpeak: (val: string[]) => void;
  setSearch: (val: string) => void;
  setCategory: (val: string[]) => void;
  setProjectType: (val: string) => void;
  setEnglishLevel: (val: string) => void;
  setJobType: (val: string[]) => void;
  setNoOfEmployee: (val: string) => void;
  resetFilters: () => void;
}

const initialState = {
  deliveryTime: '',
  level: '',
  location: [] as string[],
  bestSeller: '',
  designTool: [] as string[],
  speak: [] as string[],
  search: '',
  category: [] as string[],
  projectType: '',
  englishLevel: '',
  jobType: [] as string[],
  noOfEmployee: '',
};

export const useListingStore = create<ListingState>((set) => ({
  ...initialState,
  setDeliveryTime: (val) => set({ deliveryTime: val }),
  setLevel: (val) => set({ level: val }),
  setLocation: (val) => set({ location: val }),
  setBestSeller: (val) => set({ bestSeller: val }),
  setDesignTool: (val) => set({ designTool: val }),
  setSpeak: (val) => set({ speak: val }),
  setSearch: (val) => set({ search: val }),
  setCategory: (val) => set({ category: val }),
  setProjectType: (val) => set({ projectType: val }),
  setEnglishLevel: (val) => set({ englishLevel: val }),
  setJobType: (val) => set({ jobType: val }),
  setNoOfEmployee: (val) => set({ noOfEmployee: val }),
  resetFilters: () => set(initialState),
}));
