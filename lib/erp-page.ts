import type { HomeMedia } from "@/types/home-page";

export { homeSectionItem as erpSectionItem } from "@/lib/home-page";

/** Split ERP hero title into the 3-line layout used by ErpHero. */
export function splitErpHeroTitle(title: string) {
  const trimmed = title.trim();
  const forMatch = trimmed.match(/^(.*?)\s+(for\s+.+)$/i);
  if (forMatch?.[1] && forMatch[2]) {
    const beforeFor = forMatch[1].trim();
    const brand = forMatch[2].trim();
    const inMatch = beforeFor.match(/^(.*?)\s+(in\s+.+)$/i);
    if (inMatch?.[1] && inMatch[2]) {
      return {
        line1: inMatch[1].trim(),
        line2: inMatch[2].trim(),
        brand,
      };
    }
    return { line1: beforeFor, line2: "", brand };
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

/** Parse `"Say hello : +880 …"` into label + phone. */
export function parseErpContact(contact: string) {
  const trimmed = contact.trim();
  const parts = trimmed.split(/\s*:\s*/);
  if (parts.length >= 2) {
    return {
      label: parts[0]?.trim() || "Say hello",
      phone: parts.slice(1).join(":").trim(),
    };
  }
  return { label: "Say hello", phone: trimmed };
}

export type CollagePhotos = {
  large: string;
  left: string;
  bottom: string;
  right: string;
  center: string;
};

/** Map CMS team images onto collage slots (API order → layout slots). */
export function mapErpTeamPhotos(
  images: HomeMedia[] | undefined | null,
): CollagePhotos | null {
  const urls = (images ?? [])
    .map((img) => img?.url?.trim() ?? "")
    .filter(Boolean);
  if (urls.length < 5) return null;

  return {
    large: urls[0]!,
    left: urls[1]!,
    bottom: urls[2]!,
    right: urls[3]!,
    center: urls[4]!,
  };
}
