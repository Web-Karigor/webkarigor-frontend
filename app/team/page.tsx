import type { Metadata } from "next";
import dynamic from "next/dynamic";
import TeamSection from "@/components/team/TeamSection";
import teamContent from "@/data/team-content.json";

const Footer = dynamic(() => import("@/components/home/Footer"));

export const metadata: Metadata = {
  title: teamContent.metadata.title,
  description: teamContent.metadata.description,
};

export default function TeamPage() {
  return (
    <div className="team-page">
      <TeamSection />
      <Footer />
    </div>
  );
}
