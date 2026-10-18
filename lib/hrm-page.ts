import { stripHtml } from "@/lib/home-page";

export { homeSectionItem as hrmSectionItem } from "@/lib/home-page";
export {
  parseErpContact as parseHrmContact,
  mapErpTeamPhotos as mapHrmTeamPhotos,
} from "@/lib/erp-page";

/**
 * Split HRM hero title into the 3-line layout.
 * e.g. "Customized HR and Payroll Management Software In Bangladesh"
 * → line1 "Customized HR and" / line2 "Payroll Management Software" / brand "In Bangladesh"
 */
export function splitHrmHeroTitle(title: string) {
  const trimmed = title.trim();
  const inMatch = trimmed.match(/^(.*?)\s+(In\s+.+)$/i);
  if (inMatch?.[1] && inMatch[2]) {
    const before = inMatch[1].trim();
    const brand = inMatch[2].trim();
    const andMatch = before.match(/^(.*?and)\s+(.+)$/i);
    if (andMatch?.[1] && andMatch[2]) {
      return {
        line1: andMatch[1].trim(),
        line2: andMatch[2].trim(),
        brand,
      };
    }
    return { line1: before, line2: "", brand };
  }

  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length <= 2) {
    return { line1: trimmed, line2: "", brand: "" };
  }
  const brandCount = Math.min(2, Math.floor(words.length / 3) || 1);
  const brand = words.slice(-brandCount).join(" ");
  const rest = words.slice(0, -brandCount);
  const mid = Math.ceil(rest.length / 2);
  return {
    line1: rest.slice(0, mid).join(" "),
    line2: rest.slice(mid).join(" "),
    brand,
  };
}

/** First word → accent, remainder → title (FAQ heading). */
export function splitLeadingWord(text: string) {
  const parts = text.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { accent: text.trim(), title: "" };
  return {
    accent: parts[0] ?? "",
    title: parts.slice(1).join(" "),
  };
}

export function extractHrmLeadText(html: string) {
  return stripHtml(html);
}
