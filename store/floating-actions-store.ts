import { create } from "zustand";

type FloatingActionsState = {
  showTop: boolean;
  stackOpen: boolean;
  setShowTop: (show: boolean) => void;
  setStackOpen: (open: boolean) => void;
  toggleStack: () => void;
  closeStack: () => void;
};

export const useFloatingActionsStore = create<FloatingActionsState>((set, get) => ({
  showTop: false,
  stackOpen: false,
  setShowTop: (showTop) => set({ showTop }),
  setStackOpen: (stackOpen) => set({ stackOpen }),
  toggleStack: () => set({ stackOpen: !get().stackOpen }),
  closeStack: () => set({ stackOpen: false }),
}));
