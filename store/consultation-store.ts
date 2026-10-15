import { create } from "zustand";

export type QuotationContext = {
  packageId: number | null;
  serviceId: number | null;
};

type ConsultationState = {
  open: boolean;
  quotation: QuotationContext;
  openModal: (context?: Partial<QuotationContext>) => void;
  closeModal: () => void;
};

export const useConsultationStore = create<ConsultationState>((set) => ({
  open: false,
  quotation: {
    packageId: null,
    serviceId: null,
  },
  openModal: (context) =>
    set({
      open: true,
      quotation: {
        packageId: context?.packageId ?? null,
        serviceId: context?.serviceId ?? null,
      },
    }),
  closeModal: () => set({ open: false }),
}));

/**
 * Imperative helper — works outside React components.
 * Also safe as onClick={openConsultationModal} (ignores the DOM event).
 */
export function openConsultationModal(
  context?: Partial<QuotationContext> | { nativeEvent?: unknown },
) {
  if (context && typeof context === "object" && "nativeEvent" in context) {
    useConsultationStore.getState().openModal();
    return;
  }
  useConsultationStore.getState().openModal(
    context as Partial<QuotationContext> | undefined,
  );
}

export function getQuotationContext(): QuotationContext {
  return useConsultationStore.getState().quotation;
}
