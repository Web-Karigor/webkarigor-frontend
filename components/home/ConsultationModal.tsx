"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import ConsultationForm from "@/components/home/ConsultationForm";
import homeContent from "@/data/home-content.json";
import "@/components/home/HomeConsultation.css";
import { setSmoothScrollLocked } from "@/lib/smooth-scroll";

const MODAL_IMAGE = homeContent.consultation.contact.image;

const OPEN_EVENT = "open-consultation-modal";

export type QuotationContext = {
  packageId: number | null;
  serviceId: number | null;
};

let quotationContext: QuotationContext = {
  packageId: null,
  serviceId: null,
};

export function getQuotationContext(): QuotationContext {
  return quotationContext;
}

export function openConsultationModal(context?: Partial<QuotationContext>) {
  quotationContext = {
    packageId: context?.packageId ?? null,
    serviceId: context?.serviceId ?? null,
  };
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export default function ConsultationModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setSmoothScrollLocked(true);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      setSmoothScrollLocked(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="consultation-modal-backdrop"
      data-lenis-prevent
      onClick={() => setOpen(false)}
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
            src={MODAL_IMAGE}
            alt=""
            fill
            sizes="(min-width: 768px) 46vw, 0px"
            className="consultation-modal-media-img" loading="lazy"/>
        </div>

        <button
          type="button"
          className="consultation-modal-close"
          onClick={() => setOpen(false)}
          aria-label="Close form"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="consultation-modal-body">
          <ConsultationForm
            showWhatsApp
            onSuccess={() => {
              window.setTimeout(() => setOpen(false), 1600);
            }}
          />
        </div>
      </div>
    </div>
  );
}
