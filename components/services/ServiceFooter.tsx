import Link from "next/link";

const FOOTER_LINKS = [
  { label: "About Us", href: "/about-us" },
  { label: "Privacy Policy", href: "/policies" },
  { label: "Terms of Service", href: "/policies" },
  { label: "FAQ", href: "/service#faq" },
] as const;

export default function ServiceFooter() {
  return (
    <footer className="border-t-[0.5px] border-[#CAC4B1]">
      {/* Figma — 1680 × 24 hug, space-between */}
      <div className="mx-auto flex w-full max-w-[1680px] flex-col items-center gap-4 px-[clamp(16px,4vw,40px)] py-6 text-center max-md:gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:text-left">
        <Link
          href="/"
          className="shrink-0 font-museoModerno text-[28px] font-semibold leading-none text-black"
        >
          Webkarigor
        </Link>

        <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-8 lg:gap-10">
          <nav
            className="flex w-full flex-col items-center gap-3 max-md:gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2 lg:gap-x-8"
            aria-label="Footer"
          >
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-montserrat text-[14px] font-medium text-[#9ca3af] transition-colors hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="m-0 font-montserrat text-[14px] font-medium text-[#9ca3af]">
            © 2024 Webkarigor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
