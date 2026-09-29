"use client";

import { openConsultationModal } from "@/components/home/ConsultationModal";

export default function PricingCtaButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="home-pricing-cta capitalize"
      onClick={openConsultationModal}
    >
      {children}
    </button>
  );
}
