import type { Metadata, Viewport } from "next";
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
import ScrollProgress from "@/components/ScrollProgress";
import GlobalCursor from "@/components/GlobalCursor";
import Preloader from "@/components/Preloader";
import GsapProvider from "@/components/providers/GsapProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Script from "next/script";
import GtmEvents from "@/components/providers/GtmEvents";

export const revalidate = 900;

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

export const metadata: Metadata = {
  title: "Webkarigor",
  description: "",
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TJ44HQWH');`}
        </Script>
      </head>
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
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TJ44HQWH" height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" /></noscript>
        <QueryProvider>
        <GtmEvents />
        <SmoothScroll>
        <GsapProvider>
          <Preloader />
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
          <ScrollProgress />
        </GsapProvider>
        </SmoothScroll>
        </QueryProvider>
      </body>
    </html>
  );
}
