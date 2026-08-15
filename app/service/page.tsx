import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceMarquee from "@/components/services/ServiceMarquee";
import ServiceClients from "@/components/services/ServiceClients";
import servicesContent from "@/data/services-content.json";
import "@/styles/service-pages-laptop.css";

const ServiceOfferings = dynamic(
  () => import("@/components/services/ServiceOfferings"),
);
const TechServices = dynamic(() => import("@/components/home/TechServices"));
const ServiceTechGrid = dynamic(
  () => import("@/components/services/ServiceTechGrid"),
);
const ServiceWhyChoose = dynamic(
  () => import("@/components/services/ServiceWhyChoose"),
);
const Team = dynamic(() => import("@/components/home/Team"));
const ServiceTestimonials = dynamic(
  () => import("@/components/services/ServiceTestimonials"),
);
const ServicePricing = dynamic(
  () => import("@/components/services/ServicePricing"),
);
const FAQ = dynamic(() => import("@/components/home/FAQ"));
const HomeConsultation = dynamic(
  () => import("@/components/home/HomeConsultation"),
);
const ServiceFooter = dynamic(
  () => import("@/components/services/ServiceFooter"),
);

export const metadata: Metadata = {
  title: servicesContent.metadata.title,
  description: servicesContent.metadata.description,
};

export default function ServicePage() {
  return (
    <div className="svc-laptop bg-white">
      <ServiceHero />
      <ServiceMarquee />
      <ServiceClients />
      <ServiceOfferings />
      <TechServices />
      <ServiceTechGrid />
      <ServiceWhyChoose />
      <Team />
      <ServiceTestimonials />
      <ServicePricing />
      <FAQ className="bg-white" />
      <ServiceMarquee />
      <HomeConsultation hideSchedule backgroundColor="#FFFEFB" />
      <ServiceFooter />
    </div>
  );
}
