"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, Link2 } from "lucide-react";
import Image from "next/image";

type ShareNetwork = {
  id: string;
  label: string;
  href: (url: string, title: string) => string;
};

const NETWORKS: ShareNetwork[] = [
  {
    id: "facebook",
    label: "Facebook",
    href: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    id: "x",
    label: "X",
    href: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: (url, title) => `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
];

export default function BlogShare({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pageUrl = () => window.location.href;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(pageUrl());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="inline-flex font-bold items-center gap-1.5 font-montserrat text-[13px] font-medium text-[#8d8d8d] transition-colors hover:text-[#111] sm:text-[15px]"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => {
          setCopied(false);
          setOpen((value) => !value);
        }}
      >
        <Image src="/blogs/vector.png" alt="Share" width={18} height={18} />
        Share
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-[calc(100%+10px)] z-30 min-w-[188px] overflow-hidden rounded-2xl border border-[#E7E1D4] bg-white py-1.5 shadow-[0_16px_40px_rgba(17,17,17,0.1)]"
        >
          {NETWORKS.map((network) => (
            <a
              key={network.id}
              role="menuitem"
              href={network.href(pageUrl(), title)}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2.5 font-montserrat text-[14px] font-medium text-[#1F1E1C] transition-colors hover:bg-[#FAF7EC]"
              onClick={() => setOpen(false)}
            >
              {network.label}
            </a>
          ))}
          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-2 px-4 py-2.5 text-left font-montserrat text-[14px] font-medium text-[#1F1E1C] transition-colors hover:bg-[#FAF7EC]"
            onClick={() => void copyLink()}
          >
            {copied ? (
              <Check className="h-4 w-4" strokeWidth={2} aria-hidden />
            ) : (
              <Link2 className="h-4 w-4" strokeWidth={2} aria-hidden />
            )}
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
