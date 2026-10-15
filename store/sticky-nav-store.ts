import { create } from "zustand";

export type StickyNavSheet = "services" | "more" | null;

type StickyNavState = {
  sheet: StickyNavSheet;
  setSheet: (sheet: StickyNavSheet) => void;
  toggleSheet: (next: Exclude<StickyNavSheet, null>) => void;
  closeSheet: () => void;
};

export const useStickyNavStore = create<StickyNavState>((set, get) => ({
  sheet: null,
  setSheet: (sheet) => set({ sheet }),
  toggleSheet: (next) =>
    set({ sheet: get().sheet === next ? null : next }),
  closeSheet: () => set({ sheet: null }),
}));
