import type { Metadata } from "next";
import TeamSection from "@/components/team/TeamSection";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Team — Webkarigor",
  description:
    "Meet the handpicked team behind Webkarigor — designers, engineers, and product thinkers building digital products that perform.",
};

export default function TeamPage() {
  return (
    <div className="team-page">
      <TeamSection />
    </div>
  );
}
