import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/home/Footer";
import ProjectHoverCursor from "@/components/projects/ProjectHoverCursor";
import ProjectDetailsBody from "@/components/projects/details/ProjectDetailsBody";
import ProjectDetailsCredits from "@/components/projects/details/ProjectDetailsCredits";
import ProjectDetailsCTA, {
  ProjectDetailsRelated,
} from "@/components/projects/details/ProjectDetailsCTA";
import ProjectDetailsHero from "@/components/projects/details/ProjectDetailsHero";
import ProjectDetailsTestimonial from "@/components/projects/details/ProjectDetailsTestimonial";
import {
  PROJECT_DETAILS_METADATA,
  getAllProjectSlugs,
  getProjectDetail,
} from "@/lib/project-details-data";
import "@/styles/site-pages-laptop.css";

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
    return { title: PROJECT_DETAILS_METADATA.fallbackTitle };
  }
  return {
    title: `${project.title} — ${PROJECT_DETAILS_METADATA.siteName}`,
    description: project.about.body,
  };
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectDetail(slug);
  if (!project) notFound();

  return (
    <div className="site-laptop bg-[#FFFDF6]">
      <ProjectHoverCursor />
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
