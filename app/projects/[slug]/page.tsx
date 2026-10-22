import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectHoverCursor from "@/components/projects/ProjectHoverCursor";
import ProjectDetailsBody from "@/components/projects/details/ProjectDetailsBody";
import ProjectDetailsCredits from "@/components/projects/details/ProjectDetailsCredits";
import ProjectDetailsCTA, {
  ProjectDetailsRelated,
} from "@/components/projects/details/ProjectDetailsCTA";
import ProjectDetailsHero from "@/components/projects/details/ProjectDetailsHero";
import ProjectDetailsTestimonial from "@/components/projects/details/ProjectDetailsTestimonial";
import { PROJECT_DETAILS_METADATA } from "@/lib/project-details-data";
import {
  fetchProjectsResponse,
  findProjectPost,
  mapPostToProjectDetail,
  PROJECT_SLUG_ALIASES,
  sortedPosts,
  stripHtml,
} from "@/lib/projects";
import "@/styles/site-pages-laptop.css";

export const revalidate = 900;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;

export async function generateStaticParams() {
  const json = await fetchProjectsResponse();
  const posts = sortedPosts(json?.data?.posts);
  const slugs = new Set(
    posts
      .map((post) => post.fields?.slug?.trim())
      .filter(Boolean) as string[],
  );
  Object.keys(PROJECT_SLUG_ALIASES).forEach((alias) => slugs.add(alias));
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const json = await fetchProjectsResponse();
  const post = findProjectPost(json?.data?.posts, slug);
  if (!post) {
    return { title: PROJECT_DETAILS_METADATA.fallbackTitle };
  }
  const mapped = mapPostToProjectDetail(
    post,
    sortedPosts(json?.data?.posts),
  );
  const title = mapped?.title || post.fields?.title?.trim() || "Project";
  const description =
    mapped?.about.body || stripHtml(post.fields?.overview);
  return {
    title: `${title} — ${PROJECT_DETAILS_METADATA.siteName}`,
    description,
  };
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const json = await fetchProjectsResponse();
  const posts = sortedPosts(json?.data?.posts);
  const post = findProjectPost(posts, slug);
  if (!post) notFound();

  const project = mapPostToProjectDetail(post, posts);
  if (!project) notFound();

  return (
    <div className="site-laptop bg-[#FFFDF6]">
      <ProjectHoverCursor />
      <ProjectDetailsHero project={project} />
      <ProjectDetailsBody project={project} />
      {project.credits.length ? (
        <ProjectDetailsCredits project={project} />
      ) : null}
      {project.testimonial.quote ? (
        <ProjectDetailsTestimonial project={project} />
      ) : null}
      <ProjectDetailsCTA project={project} />
      {project.related.length ? (
        <ProjectDetailsRelated project={project} />
      ) : null}
    </div>
  );
}
