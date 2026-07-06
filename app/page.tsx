import HeroSection from "@/components/home/HeroSection";
import Services from "@/components/home/Services";
import Technologies from "@/components/home/Technologies";
import TechServices from "@/components/home/TechServices";
import Team from "@/components/home/Team";
import PricingSection from "@/components/home/PricingSection";
import FAQ from "@/components/home/FAQ";
import HeroSlider from "@/components/home/HeroSlider";
// import ConnectedFeatures from "@/components/home/ConnectedFeatures";
import VideoSection from "@/components/home/VideoSection";
import AIFeature from "@/components/home/AIFeature";
import HomeBanner from "@/components/home/HomeBanner";
import TrustedFounders from "@/components/home/TrustedFounders";
import Case from "@/components/home/Case";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <HeroSlider />
      <Services />
      {/* <ConnectedFeatures /> */}
      <AIFeature />
      <VideoSection />
      <TechServices />
      <Case />
      <Technologies />
      <TrustedFounders />
      <Team />
      <PricingSection />
      <HomeBanner />
      <FAQ />
      <Footer />
    </div>
  );
}