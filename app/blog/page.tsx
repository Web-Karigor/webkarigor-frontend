import type { Metadata } from "next";
import BlogList from "@/components/blog/BlogList";
import { BLOG_PAGE } from "@/lib/blog-data";
import "@/styles/site-pages-laptop.css";

export const metadata: Metadata = {
  title: `${BLOG_PAGE.titleLead} ${BLOG_PAGE.titleRest} — Webkarigor`,
  description: BLOG_PAGE.description,
};

export default function BlogPage() {
  return (
    <div className="site-laptop bg-[#FFFDF6]">
      <BlogList />
    </div>
  );
}
