import type { Metadata } from "next";
import { Inter, Manrope, Montserrat, MuseoModerno } from "next/font/google";
import "./globals.css";
import "@/styles/section-shared.css";
import "@/styles/pricing.css";
import Navbar from "@/components/home/Navbar";
import MobileBrand from "@/components/home/MobileBrand";
import Footer from "@/components/home/Footer";
import ConsultationModal from "@/components/home/ConsultationModal";
import StickyNav from "@/components/home/StickuNav";
import FloatingActions from "@/components/FloatingActions";
import GlobalCursor from "@/components/GlobalCursor";
import GsapProvider from "@/components/providers/GsapProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import homeContent from "@/data/home-content.json";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
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
          bg-[#FFFDF6]
          relative
        `}
      >
        <QueryProvider>
        <SmoothScroll>
        <GsapProvider>
          <GlobalCursor />
          <div className="relative z-10 overflow-x-clip">
            <Navbar />
            <MobileBrand />
            <main className="pb-[88px] lg:pb-0">{children}</main>
            <Footer />
          </div>
          <ConsultationModal />
          <StickyNav />
          <FloatingActions />
        </GsapProvider>
        </SmoothScroll>
        </QueryProvider>
      </body>
    </html>
  );
}
