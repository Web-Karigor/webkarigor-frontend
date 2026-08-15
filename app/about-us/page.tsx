import type { Metadata } from "next";
import dynamic from "next/dynamic";
import AboutHero from "@/components/about/AboutHero";
import AboutImpact from "@/components/about/AboutImpact";
import { ABOUT_METADATA } from "@/lib/about-data";
import "@/styles/site-pages-laptop.css";

const AboutVision = dynamic(() => import("@/components/about/AboutVision"));
const AboutCapabilities = dynamic(
  () => import("@/components/about/AboutCapabilities"),
);
const Team = dynamic(() => import("@/components/home/Team"));
const AboutWhyChoose = dynamic(() => import("@/components/about/AboutWhyChoose"));
const FAQ = dynamic(() => import("@/components/home/FAQ"));
const HomeConsultation = dynamic(() => import("@/components/home/HomeConsultation"));
const Footer = dynamic(() => import("@/components/home/Footer"));

export const metadata: Metadata = {
  title: ABOUT_METADATA.title,
  description: ABOUT_METADATA.description,
};

export default function AboutUsPage() {
  return (
    <div className="site-laptop bg-[#FFFEFB]">
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
