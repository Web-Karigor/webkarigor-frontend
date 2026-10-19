import { proxyPostType } from "@/lib/proxy-post-type";

export function GET() {
  return proxyPostType("industries-menu");
}
