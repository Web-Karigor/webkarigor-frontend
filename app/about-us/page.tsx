import type { Metadata } from "next";
import AboutCapabilities from "@/components/about/AboutCapabilities";
import AboutHero from "@/components/about/AboutHero";
import AboutImpact from "@/components/about/AboutImpact";
import AboutTeam from "@/components/about/AboutTeam";
import AboutVision from "@/components/about/AboutVision";
import AboutWhyChoose from "@/components/about/AboutWhyChoose";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/home/Footer";
import HomeConsultation from "@/components/home/HomeConsultation";

export const metadata: Metadata = {
  title: "About Us — Webkarigor",
  description:
    "Building digital products that empower businesses and delight users. Learn about Webkarigor’s vision, team, and approach.",
};

export default function AboutUsPage() {
  return (
    <div className="bg-[#FFFEFB]">
      <AboutHero />
      <AboutImpact />
      <AboutVision />
      <AboutCapabilities />
      <AboutTeam />
      <AboutWhyChoose />
      <FAQ />
      <HomeConsultation />
      <Footer />
    </div>
  );
}
