import type { Metadata } from "next";
import { Inter, Manrope, Montserrat, MuseoModerno } from "next/font/google";
import "./globals.css";
import "@/styles/section-shared.css";
import "@/styles/pricing.css";
import "@/styles/legacy-solution.css";
import Navbar from "@/components/home/Navbar";
import GsapProvider from "@/components/providers/GsapProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-manrope",
});

const museoModerno = MuseoModerno({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-museoModerno",
});
export const metadata: Metadata = {
  title: "Webkarigor - Company Website",
  description: "Webkarigor Company Website",
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
        {/* CONTENT LAYER */}
        <div className="relative z-10 overflow-x-clip">
          <Navbar />
          <main>{children}</main>
        </div>
        </GsapProvider>
      </body>
    </html>
  );
}

