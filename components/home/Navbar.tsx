"use client";

import Link from "next/link";

export default function NavbarTailwind() {
  return (
   <header className="absolute top-[39px] left-0 right-0 z-[9999]">
      <div className="max-w-[1800px] mx-auto flex items-center justify-between px-6">
        
        {/* CENTER NAVBAR */}
        <nav className="flex justify-center flex-1">
          <div className="navbar-container flex items-center rounded-[24px]">
            <div className="navbar-content flex items-center justify-center font-semibold">
              <Link href="/" className="navbar-link text-center transition-colors font-semibold">
                Home
              </Link>

              <Link href="/service" className="navbar-link text-center transition-colors font-semibold">
                Service
              </Link>

              <Link
                href="/"
                className="webkarigor-button relative inline-flex items-center justify-center transition-colors font-semibold"
              >
                <span className="webkarigor-inner w-full h-full flex items-center justify-center">
                  <span className="webkarigor-text text-center font-semibold">
                    Webkarigor
                  </span>
                </span>
              </Link>

              <Link href="/case" className="navbar-link text-center transition-colors font-semibold">
                Case
              </Link>

              <Link href="/about-us" className="navbar-link text-center transition-colors font-semibold">
                About us
              </Link>
            </div>
          </div>
        </nav>

        {/* RIGHT CTA BUTTON */}
        <button
          className="
            inline-flex items-center gap-[10px]
            px-[24px] py-[24px]
            border border-[#000000]
            rounded-[12px]
            text-[#000000]
            font-bold
            text-[20px]
            leading-[1]
            hover:bg-black hover:text-white
          "
        >
          Let’s get started
        </button>
      </div>
    </header>
  );
}
