import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/services/crm/Hero";
import Marquee from "@/components/services/crm/Marquee";
import Clients from "@/components/services/crm/Clients";
import servicesContent from "@/data/crm-content.json";
import "@/styles/service-pages-laptop.css";
import Services from "@/components/home/Services";

const Offerings = dynamic(
  () => import("@/components/services/crm/Offerings"),
);
const TechServices = dynamic(() => import("@/components/home/TechServices"));
const TechGrid = dynamic(
  () => import("@/components/services/crm/TechGrid"),
);
const WhyChoose = dynamic(
  () => import("@/components/services/crm/WhyChoose"),
);
const TeamSection = dynamic(() => import("@/components/services/crm/TeamSection"));
const Testimonials = dynamic(
  () => import("@/components/services/crm/Testimonials"),
);
const Pricing = dynamic(
  () => import("@/components/services/crm/Pricing"),
);
const FAQ = dynamic(() => import("@/components/services/crm/FAQ"));
const HomeConsultation = dynamic(
  () => import("@/components/home/HomeConsultation"),
);
const Footer = dynamic(
  () => import("@/components/services/crm/Footer"),
);

export const metadata: Metadata = {
  title: servicesContent.metadata.title,
  description: servicesContent.metadata.description,
};

export default function CrmPage() {
  return (
    <div className="svc-laptop bg-white">
      <Hero />
      <Marquee />
      <Clients />
      <Offerings />
      <Services />
      <TechGrid />
      <WhyChoose />
      <TeamSection />
      <Testimonials />
      <Pricing />
      <FAQ className="bg-white" ctaHref="#contact" />
      <Marquee />
      <HomeConsultation />
      <Footer />
    </div>
  );
}
