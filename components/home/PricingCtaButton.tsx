"use client";

import { openConsultationModal } from "@/store/consultation-store";

export default function PricingCtaButton({
  children,
  packageId,
  serviceId,
}: {
  children: React.ReactNode;
  packageId?: number | null;
  serviceId?: number | null;
}) {
  return (
    <button
      type="button"
      className="home-pricing-cta capitalize"
      onClick={() =>
        openConsultationModal({
          packageId: packageId ?? null,
          serviceId: serviceId ?? null,
        })
      }
    >
      {children}
    </button>
  );
}
