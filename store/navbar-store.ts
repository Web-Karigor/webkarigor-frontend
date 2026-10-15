import { create } from "zustand";

export type NavMenu = "services" | "more";

type NavbarState = {
  scrolled: boolean;
  navHidden: boolean;
  activeId: string;
  openMenu: NavMenu | null;
  setScrolled: (scrolled: boolean) => void;
  setNavHidden: (navHidden: boolean) => void;
  setActiveId: (activeId: string | ((prev: string) => string)) => void;
  setOpenMenu: (
    openMenu: NavMenu | null | ((prev: NavMenu | null) => NavMenu | null),
  ) => void;
  closeMenu: () => void;
};

export const useNavbarStore = create<NavbarState>((set) => ({
  scrolled: false,
  navHidden: false,
  activeId: "brand",
  openMenu: null,
  setScrolled: (scrolled) => set({ scrolled }),
  setNavHidden: (navHidden) => set({ navHidden }),
  setActiveId: (activeId) =>
    set((state) => ({
      activeId:
        typeof activeId === "function" ? activeId(state.activeId) : activeId,
    })),
  setOpenMenu: (openMenu) =>
    set((state) => ({
      openMenu:
        typeof openMenu === "function" ? openMenu(state.openMenu) : openMenu,
    })),
  closeMenu: () => set({ openMenu: null }),
}));
