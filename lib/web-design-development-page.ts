export { homeSectionItem as wddSectionItem } from "@/lib/home-page";
export {
  parseErpContact as parseWddContact,
  mapErpTeamPhotos as mapWddTeamPhotos,
} from "@/lib/erp-page";

/**
 * Split WDD hero title into the 3-line layout.
 * e.g. "Professional Website Design and Development Services For Your Business"
 * → "Professional Website Design" / "and Development Services" / "For Your Business"
 */
export function splitWddHeroTitle(title: string) {
  const trimmed = title.trim();
  const forMatch = trimmed.match(/^(.*?)\s+(For\s+.+)$/i);
  if (forMatch?.[1] && forMatch[2]) {
    const before = forMatch[1].trim();
    const brand = forMatch[2].trim();
    const andMatch = before.match(/^(.*?)\s+(and\s+.+)$/i);
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
  const brandCount = Math.min(3, Math.floor(words.length / 3) || 1);
  const brand = words.slice(-brandCount).join(" ");
  const rest = words.slice(0, -brandCount);
  const mid = Math.ceil(rest.length / 2);
  return {
    line1: rest.slice(0, mid).join(" "),
    line2: rest.slice(mid).join(" "),
    brand,
  };
}
