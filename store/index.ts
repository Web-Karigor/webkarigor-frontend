/**
 * Client UI state (Zustand).
 * Server/API data stays in TanStack Query hooks — do not duplicate there.
 */

export {
  useConsultationStore,
  openConsultationModal,
  getQuotationContext,
  type QuotationContext,
} from "./consultation-store";

export {
  useStickyNavStore,
  type StickyNavSheet,
} from "./sticky-nav-store";

export { useFloatingActionsStore } from "./floating-actions-store";

export { useNavbarStore, type NavMenu } from "./navbar-store";

export { useBlogUiStore } from "./blog-ui-store";
