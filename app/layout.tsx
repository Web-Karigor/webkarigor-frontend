import type { Metadata } from "next";
import { Inter, Montserrat, MuseoModerno } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-montserrat",
});

const museoModerno = MuseoModerno({
  subsets: ["latin"],
  weight: ["600", "700"],
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
          ${museoModerno.variable}
          font-sans
          overflow-x-hidden
          scroll-smooth
          bg-[#FFFDF6]
          relative
        `}
      >
        {/* 🌈 GLOBAL GRADIENT BACKGROUND */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "1700px",
            height: "585px",
            top: "-454px",
            left: "110px",
            background: "radial-gradient(circle, #BBFF68 80%, transparent 70%)",
            opacity: 0.28,
            filter: "blur(400px)",
            zIndex: 0,
          }}
        />

        {/* CONTENT LAYER */}
        <div className="relative z-10">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

