import type { Metadata } from "next";
import Footer from "@/components/home/Footer";
import ProjectHoverCursor from "@/components/projects/ProjectHoverCursor";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import ProjectsHero from "@/components/projects/ProjectsHero";
import { PROJECTS_METADATA } from "@/lib/projects-data";
import "@/styles/site-pages-laptop.css";

export const metadata: Metadata = PROJECTS_METADATA;

export default function ProjectsPage() {
  return (
    <div className="site-laptop bg-[#FFFDF6]">
      <ProjectHoverCursor />
      <ProjectsHero />
      <ProjectsGrid />
      <Footer />
    </div>
  );
}
