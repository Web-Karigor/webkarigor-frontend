"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Pencil,
  Phone,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { ERP_HERO, ERP_TRUSTED_LOGOS } from "@/lib/erp-data";

const CUSTOMERS = [
  {
    name: "Kadin Herwitz",
    id: "87364523",
    rate: "70.00",
    balance: "-270.00",
    balanceNeg: true,
    deposit: "500.00",
    status: "ACTIVE" as const,
  },
  {
    name: "Kadin Herwitz",
    id: "87364523",
    rate: "70.00",
    balance: "270.00",
    balanceNeg: false,
    deposit: "500.00",
    status: "INACTIVE" as const,
  },
  {
    name: "Kadin Herwitz",
    id: "87364523",
    rate: "70.00",
    balance: "270.00",
    balanceNeg: false,
    deposit: "500.00",
    status: "ACTIVE" as const,
  },
];


export default function ErpHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <header className="fixed inset-x-0 top-0 z-50 w-full bg-[#FFFEFB] shadow-[0_4px_8px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex h-[72px] w-full max-w-[1680px] items-center justify-between px-[clamp(16px,3.5vw,50px)] sm:h-[88px] lg:h-[108px]">
          <Link
            href="/"
            className="font-museoModerno text-[clamp(22px,2vw,28px)] font-semibold leading-none text-black"
          >
            Webkarigor
          </Link>
          <Link
            href="#contact"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#0EC47B] px-5 py-2.5 font-montserrat text-[clamp(13px,1vw,15px)] font-bold text-white transition-opacity hover:opacity-90 sm:px-6 sm:py-3"
          >
            Get a Quote
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1850px] px-[clamp(16px,3.5vw,50px)] pt-[128px] pb-14 lg:pb-20">
        <div className="flex w-full flex-col items-stretch gap-12 py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          {/* Left copy — Figma 636 × 388 */}
          <div className="flex w-full max-w-[636px] shrink-0 flex-col justify-center lg:min-h-[388px]">
            <h1 className="m-0 font-montserrat text-[clamp(2.5rem,4.5vw,3.75rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#111827]">
              {ERP_HERO.titleLine1}
              <br />
              {ERP_HERO.titleLine2}
              <br />
              <span className="relative inline-block">
                {ERP_HERO.titleBrand}
                <svg
                  className="pointer-events-none absolute -bottom-0.5 left-0 w-full"
                  viewBox="0 0 220 10"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M1 7 C40 2, 90 9, 140 4 C165 2, 195 6, 218 3"
                    stroke="#A7F3D0"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-6 m-0 max-w-[520px] font-manrope text-[18px] font-semibold leading-[150%] tracking-[0] text-[#A7A7A7]">
              {ERP_HERO.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-[#0EC47B] px-8 py-3.5 font-montserrat text-[15px] font-bold text-white shadow-[0_10px_28px_rgba(14,196,123,0.35)] transition-opacity hover:opacity-90"
              >
                Start Your Project
              </Link>
              <a
                href={`tel:${ERP_HERO.hotline.replace(/-/g, "")}`}
                className="inline-flex items-center gap-2.5 rounded-full border border-[#D0D5DD] bg-white px-5 py-3.5 font-montserrat text-[14px] font-semibold text-[#111827] transition-colors hover:bg-black/[0.03]"
              >
                <Phone className="h-4 w-4 shrink-0 text-[#111827]" aria-hidden />
                Say hello: {ERP_HERO.hotline}
              </a>
            </div>
          </div>

          {/* Right visual — 1st Figma image composition */}
          <div className="relative w-full max-w-[720px] shrink-0 pt-14 max-lg:mx-auto lg:ml-auto">
            <div className="relative w-full">
              {/* Dot pattern — Figma 107.59×124.47 · #5A7184 @ 10% · top-left */}
              <div
                aria-hidden
                className="absolute z-[1] grid grid-cols-6 content-start gap-x-[14px] gap-y-[14px]"
                style={{
                  width: 107.59,
                  height: 124.47,
                  left: 110,
                  top: -80,
                  opacity: 0.4,
                }}
              >
                {Array.from({ length: 30 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-[5px] w-[5px] rounded-full bg-[#5A7184]"
                  />
                ))}
              </div>

              {/* Yellow half-circle — top-left behind dashboard */}
              <div
                aria-hidden
                className="absolute z-0 left-[-24px] top-[-40px] h-[100px] w-[90px] bg-[#FEED35] sm:left-[-70px] sm:top-[-80px] sm:h-[180px] sm:w-[166px]"
                style={{
                  borderRadius: "360px 0 0 0px",
                }}
              />

              {/* Green circle — bottom-right behind dashboard */}
              <div
                aria-hidden
                className="absolute z-0 bottom-[-40px] right-4 h-[120px] w-[120px] rounded-full bg-[#0EC47B] sm:bottom-[-80px] sm:right-20 sm:h-[204px] sm:w-[204px]"
              />

              {/* Dashboard frame */}
              <div
                className="relative z-[2] w-full max-w-[696.55px] overflow-x-auto overflow-y-hidden bg-white"
                style={{
                  marginLeft: "auto",
                  marginRight: 0,
                  borderRadius: 6.83,
                  border: "8px solid #12141D",
                  boxShadow: "0px 4px 60px 0px rgba(0, 0, 0, 0.08)",
                  maxHeight: 498.51,
                }}
              >
                {/* Toolbar */}
                <div className="flex items-center justify-between gap-3 border-b border-[#F0F0F0] px-4 py-3 sm:px-5">
                  <div className="flex h-9 max-w-[200px] flex-1 items-center gap-2 rounded-lg bg-[#F5F6F8] px-3">
                    <Search className="h-3.5 w-3.5 text-[#98A2B3]" aria-hidden />
                    <span className="font-montserrat text-[12px] text-[#98A2B3]">
                      Search
                    </span>
                  </div>
                  <button
                    type="button"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#7C3AED] px-3 py-2 font-montserrat text-[11px] font-bold text-white sm:px-3.5 sm:text-[12px]"
                  >
                    <Plus className="h-3.5 w-3.5" aria-hidden />
                    Add Customer
                  </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto px-2 sm:px-3">
                  <table className="w-full min-w-[480px] border-collapse text-left sm:min-w-0">
                    <thead>
                      <tr className="border-b border-[#F0F0F0]">
                        <th className="w-8 py-2.5 pl-2">
                          <span className="inline-block h-3.5 w-3.5 rounded border border-[#D0D5DD]" />
                        </th>
                        {["NAME", "DESCRIPTION", "RATE", "BALANCE", "DEPOSIT", "STATUS", ""].map(
                          (h) => (
                            <th
                              key={h || "act"}
                              className="py-2.5 px-1 font-montserrat text-[8px] font-semibold uppercase tracking-wide text-[#98A2B3] sm:whitespace-nowrap sm:text-[10px]"
                            >
                              {h}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {CUSTOMERS.map((row, i) => (
                        <tr key={i} className="border-b border-[#F5F5F5]">
                          <td className="py-2.5 pl-2">
                            <span className="inline-block h-3.5 w-3.5 rounded border border-[#D0D5DD]" />
                          </td>
                          <td className="py-2.5 pr-2">
                            <p className="m-0 font-montserrat text-[11px] font-bold leading-tight text-[#111827] sm:text-[12px]">
                              {row.name}
                            </p>
                            <p className="m-0 font-montserrat text-[9px] text-[#98A2B3]">
                              {row.id}
                            </p>
                          </td>
                          <td className="hidden py-2.5 pr-2 font-montserrat text-[10px] text-[#98A2B3] sm:table-cell">
                            Lorem ipsum...
                          </td>
                          <td className="py-2.5 pr-2 font-montserrat text-[10px] text-[#475467]">
                            {row.rate} INR
                          </td>
                          <td
                            className={`py-2.5 pr-2 font-montserrat text-[10px] font-semibold ${
                              row.balanceNeg ? "text-[#F04438]" : "text-[#12B76A]"
                            }`}
                          >
                            {row.balance} INR
                          </td>
                          <td className="hidden py-2.5 pr-2 font-montserrat text-[10px] text-[#475467] md:table-cell">
                            {row.deposit} INR
                          </td>
                          <td className="py-2.5 pr-1">
                            <span
                              className={`inline-flex rounded-full px-2 py-0.5 font-montserrat text-[8px] font-bold uppercase tracking-wide sm:text-[9px] ${
                                row.status === "ACTIVE"
                                  ? "bg-[#12B76A] text-white"
                                  : "border border-[#D0D5DD] bg-white text-[#667085]"
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                          <td className="py-2.5 pr-1">
                            <div className="flex items-center gap-0.5 text-[#8B9CF7]">
                              <Pencil className="h-3 w-3" aria-hidden />
                              <Trash2 className="h-3 w-3" aria-hidden />
                              <MoreVertical className="h-3 w-3" aria-hidden />
                            </div>
                          </td>
                        </tr>
                      ))}
                      {/* Skeleton rows */}
                      {Array.from({ length: 4 }).map((_, i) => (
                        <tr key={`sk-${i}`} className="border-b border-[#F8F8F8]">
                          <td className="py-3 pl-2">
                            <span className="inline-block h-3.5 w-3.5 rounded border border-[#E5E7EB]" />
                          </td>
                          <td colSpan={2} className="py-3">
                            <span className="block h-2 w-24 rounded bg-[#E5E7EB]" />
                            <span className="mt-1.5 block h-1.5 w-14 rounded bg-[#F0F0F0]" />
                          </td>
                          <td className="py-3">
                            <span className="block h-2 w-12 rounded bg-[#E5E7EB]" />
                          </td>
                          <td className="py-3">
                            <span className="block h-2 w-14 rounded bg-[#E5E7EB]" />
                          </td>
                          <td className="hidden py-3 md:table-cell">
                            <span className="block h-2 w-12 rounded bg-[#E5E7EB]" />
                          </td>
                          <td className="py-3">
                            <span className="inline-block h-4 w-12 rounded-full border border-[#E5E7EB]" />
                          </td>
                          <td className="py-3">
                            <div className="flex gap-0.5 text-[#C7D2FE]">
                              <Pencil className="h-3 w-3" aria-hidden />
                              <Trash2 className="h-3 w-3" aria-hidden />
                              <MoreVertical className="h-3 w-3" aria-hidden />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer */}
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-[#F0F0F0] bg-white px-4 py-2.5">
                  <p className="m-0 font-montserrat text-[9px] font-semibold uppercase tracking-wide text-[#98A2B3]">
                    Active Customers: 478/708
                  </p>
                  <div className="flex items-center gap-3 font-montserrat text-[9px] text-[#667085]">
                    <span className="hidden sm:inline">Rows per page: 10</span>
                    <span>1-10 of 708</span>
                    <span className="inline-flex gap-1">
                      <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
                      <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </div>
                </div>
              </div>

              {/* Avatar — sits on top rim of dashboard */}
              <div
                className="absolute left-1/2 z-[5] -translate-x-1/2 overflow-hidden rounded-full border-[6px] border-white"
                style={{
                  width: 109,
                  height: 109,
                  top: -54,
                  boxShadow: "0px 44px 54px 0px rgba(37, 55, 63, 0.16)",
                }}
              >
                <Image
                  src={ERP_HERO.avatarImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="109px"
                  unoptimized
                />
              </div>

              {/* TECHNOLOGY card — overlaps bottom-left of dashboard */}
              <div
                className="absolute z-[5] left-2 w-[min(168px,42%)] rounded-xl bg-white p-3 sm:left-[-50px] sm:w-[168px] sm:p-3.5 md:w-[180px]"
                style={{
                  bottom: 36,
                  boxShadow: "0px 12px 40px rgba(15, 23, 42, 0.12)",
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="m-0 font-montserrat text-[10px] font-bold uppercase tracking-wider text-[#98A2B3]">
                    Technology
                  </p>
                  <p className="m-0 text-right font-montserrat text-[16px] font-bold leading-none text-[#111827]">
                    27.24
                    <span className="ml-0.5 text-[10px] font-semibold text-[#98A2B3]">
                      ROI
                    </span>
                  </p>
                </div>
                <div className="mt-3 flex h-12 items-end gap-1 border-b border-[#F2F4F7] pb-1">
                  {[35, 55, 42, 78, 50, 88, 62, 70, 45, 82, 58, 90, 48, 75, 60, 68].map(
                    (h, i) => (
                      <span
                        key={i}
                        className="flex-1 rounded-[2px] bg-[#FBBF24]"
                        style={{ height: `${h}%` }}
                      />
                    ),
                  )}
                </div>
                <ul className="mt-3 m-0 list-none space-y-2 p-0">
                  {[
                    { label: "Cloud Services", pct: 81, color: "#F79009" },
                    { label: "Automation", pct: 28, color: "#FBBF24" },
                    { label: "Business Transformation", pct: 11, color: "#D0D5DD" },
                  ].map((row) => (
                    <li
                      key={row.label}
                      className="flex items-center justify-between gap-2"
                    >
                      <span className="inline-flex items-center gap-1.5 font-montserrat text-[9px] font-medium text-[#667085]">
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-sm"
                          style={{ backgroundColor: row.color }}
                        />
                        {row.label}
                      </span>
                      <span className="font-montserrat text-[9px] font-bold text-[#111827]">
                        {row.pct}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust / logo bar */}
      <div className="w-full bg-[#F7F8FA]">
        <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-8 px-[clamp(16px,3.5vw,50px)] py-10 sm:flex-row sm:items-center sm:justify-between sm:gap-12">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 sm:gap-x-10">
            {ERP_TRUSTED_LOGOS.map((logo) => (
              <Image
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                width={88}
                height={28}
                className="h-6 w-auto object-contain opacity-60 grayscale sm:h-7"
                unoptimized
              />
            ))}
          </div>
          <div className="max-w-[420px] text-left sm:text-right">
            <p className="m-0 font-montserrat text-[clamp(18px,2vw,22px)] font-bold leading-[1.3] tracking-[-0.02em] text-[#18214D]">
              {ERP_HERO.trustTitle}
            </p>
            <p className="mt-2 m-0 font-montserrat text-[13px] font-medium leading-[1.55] text-[#98A2B3]">
              {ERP_HERO.trustDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
