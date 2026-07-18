import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/home/Footer";
import ProjectDetailsBody from "@/components/projects/details/ProjectDetailsBody";
import ProjectDetailsCredits from "@/components/projects/details/ProjectDetailsCredits";
import ProjectDetailsCTA, {
  ProjectDetailsRelated,
} from "@/components/projects/details/ProjectDetailsCTA";
import ProjectDetailsHero from "@/components/projects/details/ProjectDetailsHero";
import ProjectDetailsTestimonial from "@/components/projects/details/ProjectDetailsTestimonial";
import {
  getAllProjectSlugs,
  getProjectDetail,
} from "@/lib/project-details-data";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProjectDetail(params.slug);
  if (!project) {
    return { title: "Project — Webkarigor" };
  }
  return {
    title: `${project.title} — Webkarigor`,
    description: project.about.body,
  };
}

export default function ProjectDetailsPage({ params }: PageProps) {
  const project = getProjectDetail(params.slug);
  if (!project) notFound();

  return (
    <div className="bg-[#FFFDF6]">
      <ProjectDetailsHero project={project} />
      <ProjectDetailsBody project={project} />
      <ProjectDetailsCredits project={project} />
      <ProjectDetailsTestimonial project={project} />
      <ProjectDetailsCTA project={project} />
      <ProjectDetailsRelated project={project} />
      <Footer />
    </div>
  );
}
