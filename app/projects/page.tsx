import type { Metadata } from "next";
import Footer from "@/components/home/Footer";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import ProjectsHero from "@/components/projects/ProjectsHero";

export const metadata: Metadata = {
  title: "Projects — Webkarigor",
  description:
    "Explore our portfolio of creative work, where strategy, design, and development come together to support businesses across diverse industries and markets.",
};

export default function ProjectsPage() {
  return (
    <div className="bg-[#FFFDF6]">
      <ProjectsHero />
      <ProjectsGrid />
      <Footer />
    </div>
  );
}
