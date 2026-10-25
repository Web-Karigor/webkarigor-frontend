"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isWhatsAppUrl, pageTypeFromPath, pushDataLayerEvent } from "@/lib/gtm";

export default function GtmEvents() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const element = target.closest<HTMLElement>("a[href], button[data-gtm-cta='true']");
      if (!element) return;
      const href = element instanceof HTMLAnchorElement ? element.getAttribute("href") ?? "" : "";
      const location = element.dataset.contactLocation ?? element.dataset.ctaLocation;
      if (href.toLowerCase().startsWith("tel:")) {
        pushDataLayerEvent({ event: "phone_click", contact_location: location ?? "site_link", page_type: pageTypeFromPath(pathname) });
      } else if (href && isWhatsAppUrl(href)) {
        pushDataLayerEvent({ event: "whatsapp_click", contact_location: location ?? "site_link", page_type: pageTypeFromPath(pathname) });
      }

      if (element.dataset.gtmCta === "true") {
        pushDataLayerEvent({ event: "cta_click", cta_id: element.dataset.ctaId, cta_text: element.getAttribute("aria-label") ?? element.textContent?.trim().slice(0, 80), cta_location: element.dataset.ctaLocation ?? "site", page_type: pageTypeFromPath(pathname) });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  return null;
}
