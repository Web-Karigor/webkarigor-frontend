"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import ConsultationForm from "@/components/home/ConsultationForm";
import "@/components/home/HomeConsultation.css";
import { setSmoothScrollLocked } from "@/lib/smooth-scroll";
import {
  useConsultationStore,
  openConsultationModal,
  getQuotationContext,
  type QuotationContext,
} from "@/store/consultation-store";

export type { QuotationContext };
export { openConsultationModal, getQuotationContext };

export default function ConsultationModal() {
  const router = useRouter();
  const open = useConsultationStore((s) => s.open);
  const closeModal = useConsultationStore((s) => s.closeModal);

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setSmoothScrollLocked(true);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      setSmoothScrollLocked(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeModal]);

  if (!open) return null;

  return (
    <div
      className="consultation-modal-backdrop"
      data-lenis-prevent
      onClick={closeModal}
    >
      <div
        className="consultation-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Book a consultation"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="consultation-modal-media" aria-hidden>
          <Image
            src="/contact-us/contact-form-image.png"
            alt=""
            fill
            className="consultation-modal-media-img"
            sizes="(min-width: 768px) 560px, 0px"
          />
        </div>

        <button
          type="button"
          className="consultation-modal-close"
          onClick={closeModal}
          aria-label="Close form"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="consultation-modal-body">
          <ConsultationForm
            hideSchedule
            showWhatsApp
            formLocation="consultation_modal"
            onSuccess={() => {
              closeModal();
              router.push("/thank-you");
            }}
          />
        </div>
      </div>
    </div>
  );
}
