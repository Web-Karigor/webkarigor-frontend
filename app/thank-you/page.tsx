import type { Metadata } from "next";
import Link from "next/link";
import "@/components/contact/ThankYou.css";

export const metadata: Metadata = {
  title: "Thank You | Webkarigor",
  description:
    "We received your message. The Webkarigor team will review it and reply within 24 hours.",
  robots: { index: false, follow: true },
};

const steps = [
  {
    title: "We review",
    text: "Your project details are with the team, and we read every note.",
  },
  {
    title: "We reply",
    text: "Expect a response within 24 hours on the number or email you shared.",
  },
  {
    title: "We plan",
    text: "We’ll suggest a time to talk through scope, timeline, and next steps.",
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" aria-hidden>
      <path
        d="M5 12.5 9.2 17 19 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ThankYouPage() {
  return (
    <section
      className="relative isolate flex min-h-screen min-h-[100dvh] items-center justify-center overflow-hidden px-4 py-8 sm:px-6 sm:py-12 mt-5"
      aria-labelledby="thank-you-heading"
    >
      <div
        className="pointer-events-none absolute -right-16 top-10 -z-10 h-48 w-48 rounded-full bg-indigo-500/15 blur-3xl sm:right-10 sm:h-80 sm:w-80"
        aria-hidden="true"
      />

      <div className="w-full max-w-3xl rounded-2xl border border-gray-200/20 p-5 shadow-xl sm:p-8 md:p-12">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full sm:mb-6 sm:h-16 sm:w-16">
          <CheckIcon />
        </div>

        <p className="mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold sm:mb-5 sm:text-sm">
          <span className="thank-you-badge-text">
            Message received
          </span>
        </p>

        <h1
          id="thank-you-heading"
          className="mb-4 text-3xl font-bold leading-tight tracking-tight sm:mb-5 sm:text-4xl md:text-5xl"
        >
          Thank you
          <span className="mt-2 block text-2xl leading-snug sm:text-3xl md:text-4xl">
            we’ll take it from here
          </span>
        </h1>

        <p className="mb-7 max-w-xl text-sm leading-7 sm:mb-8 sm:text-base">
          Your request is in. We’ll get back to you shortly with a clear next
          step for the project.
        </p>

        <ol className="mb-7 grid grid-cols-1 gap-6 border-y border-gray-200/20 py-6 sm:mb-9 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="grid min-w-0 grid-cols-[2rem_minmax(0,1fr)] gap-x-3 sm:block"
            >
              <span className="row-span-2 mb-3 text-sm font-semibold opacity-60">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h2 className="mb-2 text-base font-semibold leading-snug sm:text-lg">
                {step.title}
              </h2>

              <p className="text-sm leading-6 opacity-80 sm:leading-7">
                {step.text}
              </p>
            </li>
          ))}
        </ol>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-center text-sm font-semibold transition-transform hover:-translate-y-0.5 sm:w-auto sm:text-base"
          >
            <span>Back to home</span>
            <ArrowIcon />
          </Link>

          <Link
            href="/projects"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-xl px-5 py-3 text-center text-sm font-semibold transition-transform hover:-translate-y-0.5 sm:w-auto sm:text-base"
          >
            <span>See our work</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
