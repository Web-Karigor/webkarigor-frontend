import type { Metadata } from "next";
import ManpowerFAQ from "@/components/services/manpower/ManpowerFAQ";
import ManpowerFeaturesOrbit from "@/components/services/manpower/ManpowerFeaturesOrbit";
import ManpowerHero from "@/components/services/manpower/ManpowerHero";
import ManpowerPortfolio from "@/components/services/manpower/ManpowerPortfolio";
import ManpowerPricing from "@/components/services/manpower/ManpowerPricing";
import ManpowerReviews from "@/components/services/manpower/ManpowerReviews";
import ManpowerTeam from "@/components/services/manpower/ManpowerTeam";
import ManpowerTrusted from "@/components/services/manpower/ManpowerTrusted";
import ManpowerWhyChoose from "@/components/services/manpower/ManpowerWhyChoose";
import ServiceContact from "@/components/services/ServiceContact";
import ServiceFooter from "@/components/services/ServiceFooter";
import ServiceMarquee from "@/components/services/ServiceMarquee";

export const metadata: Metadata = {
  title: "Manpower Services — Webkarigor",
  description:
    "Hire verified talent, scale teams fast, and deliver with Webkarigor manpower services — staffing, squads, and flexible engagement models.",
};

export default function ManpowerServicePage() {
  return (
    <div className="bg-[#FFFEFB]">
      <ManpowerHero />
      <ManpowerTrusted />
      <ManpowerPortfolio />
      <ManpowerFeaturesOrbit />
      <ManpowerWhyChoose />
      <ManpowerTeam />
      <ManpowerReviews />
      <ManpowerPricing />
      <ManpowerFAQ />
      <ServiceMarquee />
      <ServiceContact />
      <ServiceFooter />
    </div>
  );
}
