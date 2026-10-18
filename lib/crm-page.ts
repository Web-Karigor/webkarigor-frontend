import { stripHtml } from "@/lib/home-page";

export { homeSectionItem as crmSectionItem } from "@/lib/home-page";
export { mapErpTeamPhotos as mapCrmTeamPhotos } from "@/lib/erp-page";
export { splitTrailingWords } from "@/lib/home-page";

/** "Bespoke Custom CRM Software Develop Services" → 2 lines. */
export function splitCrmHeroTitle(title: string) {
  const trimmed = title.trim();
  const softwareMatch = trimmed.match(/^(.*?Software)\s+(.+)$/i);
  if (softwareMatch?.[1] && softwareMatch[2]) {
    return {
      line1: softwareMatch[1].trim(),
      line2: softwareMatch[2].trim(),
    };
  }
  const words = trimmed.split(/\s+/).filter(Boolean);
  const mid = Math.ceil(words.length / 2);
  return {
    line1: words.slice(0, mid).join(" "),
    line2: words.slice(mid).join(" "),
  };
}

export function extractCrmText(html: string) {
  return stripHtml(html);
}
