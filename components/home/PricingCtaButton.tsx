"use client";

import { openConsultationModal } from "@/store/consultation-store";

export default function PricingCtaButton({
  children,
  packageId,
  serviceId,
  packageName,
  serviceName,
}: {
  children: React.ReactNode;
  packageId?: number | null;
  serviceId?: number | null;
  packageName?: string | null;
  serviceName?: string | null;
}) {
  return (
    <button
      type="button"
      className="home-pricing-cta capitalize"
      data-gtm-cta="true"
      data-cta-id="pricing-inquiry"
      data-cta-location="pricing"
      onClick={() =>
        openConsultationModal({
          packageId: packageId ?? null,
          serviceId: serviceId ?? null,
          packageName: packageName ?? null,
          serviceName: serviceName ?? null,
        })
      }
    >
      {children}
    </button>
  );
}
