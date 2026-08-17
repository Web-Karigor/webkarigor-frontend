import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import HeroSlider from "@/components/home/HeroSlider";
import Services from "@/components/home/Services";
import ProjectHoverCursor from "@/components/projects/ProjectHoverCursor";

/** Below-the-fold: code-split so first paint stays light. SSR kept so layout/SEO unchanged. */
const AIFeature = dynamic(() => import("@/components/home/AIFeature"));
const VideoSection = dynamic(() => import("@/components/home/VideoSection"));
const TechServices = dynamic(() => import("@/components/home/TechServices"));
const Case = dynamic(() => import("@/components/home/Case"));
const Technologies = dynamic(() => import("@/components/home/Technologies"));
const TrustedFounders = dynamic(() => import("@/components/home/TrustedFounders"));
const Team = dynamic(() => import("@/components/home/Team"));
const Team2 = dynamic(() => import("@/components/home/Team2"));
const PricingSection = dynamic(() => import("@/components/home/PricingSection"));
const HomeBanner = dynamic(() => import("@/components/home/HomeBanner"));
const FAQ = dynamic(() => import("@/components/home/FAQ"));
const HomeConsultation = dynamic(() => import("@/components/home/HomeConsultation"));
const Footer = dynamic(() => import("@/components/home/Footer"));

export default function Home() {
  return (
    <div className="relative">
      <ProjectHoverCursor />
      <HeroSection />
      <HeroSlider />
      <Services />
      <AIFeature />
      <VideoSection />
      <TechServices />
      <Case />
      <Technologies />
      <TrustedFounders />
      <div className="hidden md:block">
        <Team />
      </div>
      <div className="md:hidden">
        <Team2 />
      </div>
      <PricingSection />
      <HomeBanner />
      <FAQ />
      <HomeConsultation />
      <Footer />
    </div>
  );
}
