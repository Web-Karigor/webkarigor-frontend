import ConnectedFeatures from "@/components/home/ConnectedFeatures";
import HeroSection from "@/components/home/HeroSection";
import HeroSlider from "@/components/home/HeroSlider";
import IndustryWins from "@/components/home/IndustryWins";
import Team from "@/components/home/Team";
import Services from "@/components/home/Services";
import Technologies from "@/components/home/Technologies";
import VideoSection from "@/components/home/VideoSection";

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <HeroSlider />
      <Services />
      <ConnectedFeatures />
      <VideoSection />
      <IndustryWins />
      <Team />
      <Technologies />
    </div>
  );
}
