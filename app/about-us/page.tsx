import type { Metadata } from "next";
import AboutCapabilities from "@/components/about/AboutCapabilities";
import AboutHero from "@/components/about/AboutHero";
import AboutImpact from "@/components/about/AboutImpact";
import AboutVision from "@/components/about/AboutVision";
import AboutWhyChoose from "@/components/about/AboutWhyChoose";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/home/Footer";
import HomeConsultation from "@/components/home/HomeConsultation";
import Team from "@/components/home/Team";
import { ABOUT_METADATA } from "@/lib/about-data";

export const metadata: Metadata = {
  title: ABOUT_METADATA.title,
  description: ABOUT_METADATA.description,
};

export default function AboutUsPage() {
  return (
    <div className="bg-[#FFFEFB]">
      <AboutHero />
      <AboutImpact />
      <AboutVision />
      <AboutCapabilities />
      <Team />
      <AboutWhyChoose />
      <FAQ />
      <HomeConsultation />
      <Footer />
    </div>
  );
}
