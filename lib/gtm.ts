export type DataLayerEvent = {
  event: string;
  [key: string]: string | number | undefined;
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

const claimedLeadIds = new Set<number>();

export function pushDataLayerEvent(payload: DataLayerEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

export function claimLeadEvent(leadId: number) {
  if (
    typeof window === "undefined" ||
    !Number.isSafeInteger(leadId) ||
    leadId <= 0 ||
    claimedLeadIds.has(leadId)
  ) {
    return false;
  }

  const storageKey = `webkarigor:lead:${leadId}`;
  try {
    if (window.sessionStorage.getItem(storageKey) === "1") {
      claimedLeadIds.add(leadId);
      return false;
    }
    window.sessionStorage.setItem(storageKey, "1");
  } catch {
    // Keep page-lifetime deduplication when browser storage is unavailable.
  }

  claimedLeadIds.add(leadId);
  return true;
}

export function pageTypeFromPath(pathname: string | null | undefined) {
  if (!pathname || pathname === "/") return "home";
  if (pathname === "/contact-us") return "contact";
  if (pathname.startsWith("/service/")) return "service";
  if (pathname === "/pricing") return "pricing";
  if (pathname.startsWith("/blog/")) return "article";
  return "other";
}

export function isWhatsAppUrl(url: string) {
  try {
    const parsed = new URL(url, "https://webkarigor.com");
    const host = parsed.hostname.toLowerCase();
    if (host === "wa.me") {
      return /^\/?\+?\d[\d-]*\/?$/.test(parsed.pathname);
    }

    const isWhatsAppHost = host === "whatsapp.com" || host.endsWith(".whatsapp.com");
    return isWhatsAppHost && parsed.pathname.replace(/\/$/, "") === "/send" && Boolean(parsed.searchParams.get("phone"));
  } catch {
    return false;
  }
}
