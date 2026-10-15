import { create } from "zustand";

type BlogUiState = {
  query: string;
  visibleCount: number;
  setQuery: (query: string) => void;
  setVisibleCount: (count: number | ((prev: number) => number)) => void;
  reset: (pageSize: number) => void;
};

export const useBlogUiStore = create<BlogUiState>((set) => ({
  query: "",
  visibleCount: 4,
  setQuery: (query) => set({ query }),
  setVisibleCount: (count) =>
    set((state) => ({
      visibleCount: typeof count === "function" ? count(state.visibleCount) : count,
    })),
  reset: (pageSize) => set({ query: "", visibleCount: pageSize }),
}));
