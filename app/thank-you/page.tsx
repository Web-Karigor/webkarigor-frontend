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
    <section className="thank-you" aria-labelledby="thank-you-heading">
      <div className="thank-you-orb" aria-hidden />
      <div className="thank-you-card">
        <div className="thank-you-mark">
          <CheckIcon />
        </div>
        <p className="thank-you-badge">
          <span className="thank-you-badge-text">Message received</span>
        </p>
        <h1 id="thank-you-heading" className="thank-you-title">
          Thank you
          <span className="thank-you-title-accent">we’ll take it from here</span>
        </h1>
        <p className="thank-you-desc">
          Your request is in. We’ll get back to you shortly with a clear next
          step for the project.
        </p>

        <ol className="thank-you-steps">
          {steps.map((step, index) => (
            <li key={step.title} className="thank-you-step">
              <span className="thank-you-step-index">0{index + 1}</span>
              <h2 className="thank-you-step-title">{step.title}</h2>
              <p className="thank-you-step-text">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="thank-you-actions">
          <Link href="/" className="thank-you-btn">
            <span>Back to home</span>
            <ArrowIcon />
          </Link>
          <Link href="/projects" className="thank-you-btn thank-you-btn--ghost">
            <span>See our work</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
