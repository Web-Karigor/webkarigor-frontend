"use client";

import Link from "next/link";

export default function NavbarTailwind() {
  return (
    <header className="fixed top-[39px] left-0 right-0 z-[9999] flex justify-center">
      <nav className="navbar-container flex items-center rounded-[24px]">
        <div className="navbar-content flex items-center justify-center font-semibold">
          <Link href="/" className="navbar-link text-center transition-colors font-semibold">
            Home
          </Link>
          <Link href="/service" className="navbar-link text-center transition-colors font-semibold">
            Service
          </Link>
          <Link href="/" className="webkarigor-button relative inline-flex items-center justify-center transition-colors font-semibold">
            <span className="webkarigor-inner w-full h-full flex items-center justify-center">
              <span className="webkarigor-text text-center font-semibold">Webkarigor</span>
            </span>
          </Link>
          <Link href="/case" className="navbar-link text-center transition-colors font-semibold">
            Case
          </Link>
          <Link href="/about-us" className="navbar-link text-center transition-colors font-semibold">
            About us
          </Link>
        </div>
      </nav>
    </header>
  );
}
