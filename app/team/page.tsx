import type { Metadata } from "next";
import TeamSection from "@/components/team/TeamSection";
import teamContent from "@/data/team-content.json";

export const metadata: Metadata = {
  title: teamContent.metadata.title,
  description: teamContent.metadata.description,
};

export default function TeamPage() {
  return (
    <div className="team-page">
      <TeamSection />
    </div>
  );
}
