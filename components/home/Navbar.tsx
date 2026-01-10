"use client";

import Link from "next/link";
import { FolderKanban, Settings, DollarSign, Menu, MessageCircle } from "lucide-react";

export default function NavbarTailwind() {
  return (
    <header className="fixed top-5 left-0 right-0 z-[9999] pointer-events-none">
      <div className="max-w-2xl mx-auto px-4 pb-4">
        <div
          className="relative rounded-2xl bg-[#070707]/95 backdrop-blur-2xl ring-1 ring-white/5 shadow-2xl overflow-visible pointer-events-auto"
          style={{ height: 60 }}
        >
          <nav className="relative z-10 h-full flex items-center justify-between px-4">
            {/* Left group: Projects + Services */}
            <div className="flex items-center gap-3">
              <Link
                href="/projects"
                className="group flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#9ae6b4] hover:text-white transition"
              >
                <FolderKanban className="w-4 h-4" />
                <span className="hidden md:inline">Projects</span>
              </Link>
              <Link
                href="/services"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-200/80 hover:text-white transition"
              >
                <Settings className="w-4 h-4" />
                <span>Services</span>
              </Link>
            </div>

            {/* Center: Start a Project CTA */}
            <div className="flex-1 flex justify-center">
              <a
                href="/contact"
                className="relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded text-sm font-semibold text-white overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)",
                  boxShadow: "0 4px 14px 0 rgba(147, 51, 234, 0.4)",
                }}
              >
                <MessageCircle className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Start a Project</span>
              </a>
            </div>

            {/* Right group: Pricing + More */}
            <div className="flex items-center gap-3">
              <Link
                href="/pricing"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-200/80 hover:text-white transition"
              >
                <DollarSign className="w-4 h-4" />
                <span>Pricing</span>
              </Link>
              <Link
                href="/more"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-200/80 hover:text-white transition"
              >
                <Menu className="w-4 h-4" />
                <span>More</span>
              </Link>
            </div>
          </nav>

          {/* subtle bottom glow line */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-40 rounded-full pointer-events-none">
            <div
              className="w-full h-full rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(16,185,129,0.06), rgba(124,58,237,0.02), transparent 60%)",
                opacity: 0.25,
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
