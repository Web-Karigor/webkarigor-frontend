import type { HomePageSections, HomeSection } from "@/types/home-page";

export function homeSectionItem<T>(
  section?: HomeSection<T>,
): T | undefined {
  return section?.items?.[0];
}

export function stripHtml(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Split trailing words for accent/title heading pairs. */
export function splitTrailingWords(text: string, count: number) {
  const parts = text.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= count) return { head: text.trim(), tail: "" };
  return {
    head: parts.slice(0, -count).join(" "),
    tail: parts.slice(-count).join(" "),
  };
}

export function parseYearsBadge(years: string) {
  const match = years.match(/(\d+)\s*(\+)?\s*(.*)/);
  if (!match) {
    return { number: years, plus: "", label: "" };
  }
  return {
    number: match[1] ?? years,
    plus: match[2] ?? "+",
    label: (match[3] || "Years").trim(),
  };
}

export function splitHeroTitle(title: string, middleTitle: string) {
  const trimmed = title.trim();
  const suffixMatch = trimmed.match(/\s+(in\s+.+)$/i);
  if (suffixMatch?.[1]) {
    return {
      line1: trimmed.slice(0, trimmed.length - suffixMatch[1].length).trim(),
      line2: middleTitle.trim(),
      line3: suffixMatch[1].trim(),
    };
  }
  return {
    line1: trimmed,
    line2: middleTitle.trim(),
    line3: "",
  };
}

export function getHomeSections(
  sections: HomePageSections | undefined,
) {
  return sections ?? {};
}

export function splitTwoLineHeading(text: string) {
  const parts = text.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return [text.trim(), ""] as const;
  const mid = Math.ceil(parts.length / 2);
  return [parts.slice(0, mid).join(" "), parts.slice(mid).join(" ")] as const;
}

export function titleCaseName(name: string) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}
