import type { Metadata } from "next";
import { Inter, Manrope, Montserrat, MuseoModerno } from "next/font/google";
import "./globals.css";
import "@/styles/section-shared.css";
import "@/styles/pricing.css";
import "@/styles/legacy-solution.css";
import Navbar from "@/components/home/Navbar";
import StickyNav from "@/components/home/StickuNav";
import GlobalCursor from "@/components/GlobalCursor";
import GsapProvider from "@/components/providers/GsapProvider";
import homeContent from "@/data/home-content.json";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const museoModerno = MuseoModerno({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-museoModerno",
  display: "swap",
});

const { title, description } = homeContent.metadata;

export const metadata: Metadata = {
  title,
  description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${inter.variable}
          ${montserrat.variable}
          ${manrope.variable}
          ${museoModerno.variable}
          font-sans
          overflow-x-hidden
          bg-[#FFFDF6]
          relative
        `}
      >
        <GsapProvider>
          <GlobalCursor />
          <div className="relative z-10 overflow-x-clip">
            <Navbar />
            <main className="pb-[88px] lg:pb-0">{children}</main>
          </div>
          <StickyNav />
        </GsapProvider>
      </body>
    </html>
  );
}
