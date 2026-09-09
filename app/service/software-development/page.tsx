import type { Metadata } from "next";
import FAQ from "@/components/home/FAQ";
import FeaturesOrbit from "@/components/services/software-development/FeaturesOrbit";
import Hero from "@/components/services/software-development/Hero";
import Portfolio from "@/components/services/software-development/Portfolio";
import Pricing from "@/components/services/software-development/Pricing";
import Reviews from "@/components/services/software-development/Reviews";
import Team from "@/components/services/software-development/Team";
import Trusted from "@/components/services/software-development/Trusted";
import WhyChoose from "@/components/services/software-development/WhyChoose";
import HomeConsultation from "@/components/home/HomeConsultation";
import ServiceFooter from "@/components/services/ServiceFooter";
import ServiceMarquee from "@/components/services/ServiceMarquee";
// import { MANPOWER_METADATA } from "@/lib/manpower-data";
import "@/styles/service-pages-laptop.css";

// export const metadata: Metadata = MANPOWER_METADATA;

export default function SoftwareDevelopmentServicePage() {
  return (
    <div className="svc-laptop bg-[#FFFEFB]">
      <Hero />
      <Trusted />
      <Portfolio />
      <FeaturesOrbit />
      <WhyChoose />
      <Team />
      <Reviews />
      <Pricing />
      <FAQ className="bg-white" ctaHref="#contact" />
      <ServiceMarquee />
      <HomeConsultation />
      <ServiceFooter />
    </div>
  );
}
