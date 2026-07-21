"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { ChevronDown, Mail } from "lucide-react";

const PROFILE_IMAGE = "/sm4.png";

const PROJECT_TYPES = [
  "Product Design",
  "Product Development",
  "Branding",
  "Marketing",
  "Mobile App",
  "Other",
] as const;

const fieldClass =
  "w-full rounded-[10px] border-[0.5px] border-[#e5e7eb] bg-white px-4 py-3 font-montserrat text-[14px] font-medium text-[#111827] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-[#0ec47b]";

export default function ServiceContact() {
  const [projectType, setProjectType] = useState("");
  const [typeOpen, setTypeOpen] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section id="contact" className="scroll-mt-24 border-t-[3px] border-[#0ec47b] bg-[#FFFEFB]">
      {/* Figma 2149-9338 — 1920 × hug, pt 80 / px 300 / pb 40, gap 10 */}
      <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 items-stretch gap-10 px-[clamp(16px,4vw,40px)] pb-10 pt-20 lg:grid-cols-2 lg:gap-10">
        <aside className="flex h-auto flex-col justify-between gap-5 overflow-visible lg:h-[518px] lg:max-w-[520px]">
          <div className="flex flex-col gap-5">
            <h2 className="m-0 font-montserrat text-[clamp(26px,7vw,48px)] font-bold leading-[1.15] tracking-[-0.03em] text-[#111827]">
              <span className="block">Let&apos;s Build Something</span>
              <span className="block">Users Will Love.</span>
            </h2>

            <p className="m-0 max-w-[440px] font-montserrat text-[clamp(14px,1.1vw,16px)] font-medium leading-[1.6] text-[#6b7280]">
              Ready to transform your digital product? Reach out for a free
              consultation. No obligation. Response within 24 hours.
            </p>

            <Link
              href="mailto:hello@webkarigor.com"
              className="inline-flex w-full max-md:justify-center items-center gap-2.5 font-montserrat text-[15px] font-semibold text-[#111827] transition-colors hover:text-[#0ec47b] sm:w-fit"
            >
              <Mail className="h-[18px] w-[18px] shrink-0 text-[#111827]" strokeWidth={1.75} aria-hidden />
              hello@webkarigor.com
            </Link>
          </div>

          <div className="flex w-full shrink-0 flex-col items-center text-center sm:w-fit sm:items-start sm:text-left">
            <div className="relative h-[160px] w-[174px]">
              <Image
                src={PROFILE_IMAGE}
                alt="Esther Howard"
                fill
                className="rounded-[12px] object-cover"
                sizes="174px"
              />
            </div>
            <div className="pt-3">
              <p className="m-0 font-montserrat text-[20px] font-bold leading-tight text-[#000000]">
                Esther Howard
              </p>
              <p className="m-0 mt-1 font-montserrat text-[14px] font-medium text-[#838383]">
                CEO, Webkarigor
              </p>
            </div>
          </div>
        </aside>

        <form
          onSubmit={handleSubmit}
          className="flex h-auto w-full flex-col gap-3 rounded-[20px] border-[0.5px] border-[#eef0f3] bg-white p-5 shadow-[0_12px_40px_rgba(17,24,39,0.06)] sm:p-6 lg:h-[518px]"
        >
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className={fieldClass}
              required
              aria-label="Your Name"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={fieldClass}
              required
              aria-label="Email"
            />
          </div>

          <input
            type="tel"
            name="mobile"
            placeholder="Mobile"
            className={fieldClass}
            required
            aria-label="Mobile"
          />

          <input
            type="text"
            name="company"
            placeholder="Company"
            className={fieldClass}
            aria-label="Company"
          />

          <div className="relative">
            <button
              type="button"
              className={`${fieldClass} flex items-center justify-between text-left ${
                projectType ? "text-[#111827]" : "text-[#9ca3af]"
              }`}
              onClick={() => setTypeOpen((open) => !open)}
              aria-expanded={typeOpen}
              aria-haspopup="listbox"
            >
              <span>{projectType || "Project Type"}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-[#6b7280] transition-transform ${
                  typeOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>
            <input type="hidden" name="projectType" value={projectType} />

            {typeOpen && (
              <ul
                className="absolute left-0 right-0 z-20 mt-1.5 overflow-hidden rounded-[10px] border-[0.5px] border-[#e5e7eb] bg-white shadow-[0_10px_30px_rgba(17,24,39,0.1)]"
                role="listbox"
              >
                {PROJECT_TYPES.map((option) => (
                  <li key={option}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={projectType === option}
                      className="flex w-full px-4 py-2.5 text-left font-montserrat text-[14px] font-medium text-[#111827] transition-colors hover:bg-[#f9fafb]"
                      onClick={() => {
                        setProjectType(option);
                        setTypeOpen(false);
                      }}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <textarea
            name="details"
            rows={4}
            placeholder="Project Details"
            className={`${fieldClass} min-h-[112px] flex-1 resize-none`}
            required
            aria-label="Project Details"
          />

          <button
            type="submit"
            className="mt-auto w-full shrink-0 rounded-[12px] bg-[#0EC47B] px-5 py-3.5 font-montserrat text-[15px] font-bold text-white transition-opacity hover:opacity-90"
          >
            Get Free Quote
          </button>
        </form>
      </div>
    </section>
  );
}
