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
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectDetail(slug);
  if (!project) {
    return { title: "Project — Webkarigor" };
  }
  return {
    title: `${project.title} — Webkarigor`,
    description: project.about.body,
  };
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectDetail(slug);
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
