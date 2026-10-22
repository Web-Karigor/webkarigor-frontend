import { proxyPostType } from "@/lib/proxy-post-type";

export const revalidate = 900;

export function GET() {
  return proxyPostType("social-links");
}
