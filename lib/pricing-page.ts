import { stripHtml } from "@/lib/home-page";
import type { PricingPageResponse } from "@/types/pricing-page";

function wordsOf(text: string) {
  return text.trim().split(/\s+/).filter(Boolean);
}

function splitBalanced(text: string, parts: number) {
  const words = wordsOf(text);
  if (!words.length || parts < 1) return [];
  const lines: string[] = [];
  let index = 0;
  for (let part = 0; part < parts; part += 1) {
    const take = Math.ceil((words.length - index) / (parts - part));
    lines.push(words.slice(index, index + take).join(" "));
    index += take;
  }
  return lines.filter(Boolean);
}

export function mapPackagesHeadingItem(item?: {
  title?: string | null;
  subtitle?: string | null;
  content?: string | null;
} | null) {
  const subtitleWords = wordsOf(item?.subtitle ?? "");
  return {
    badge: item?.title?.trim() ?? "",
    headingAccent: subtitleWords[0] ? `${subtitleWords[0]} ` : "",
    headingTitle: subtitleWords.slice(1).join(" "),
    description: stripHtml(item?.content ?? ""),
  };
}

export function mapPricingPlansHeader(data: PricingPageResponse | undefined) {
  return mapPackagesHeadingItem(data?.data?.sections?.packages?.items?.[0]);
}

export function mapPricingHero(data: PricingPageResponse | undefined) {
  const item = data?.data?.sections?.hero?.items?.[0];
  const title = item?.title_2?.trim() ?? "";
  return {
    eyebrow: item?.title?.trim() ?? "",
    titleLines: title ? splitBalanced(title, 2) : [],
  };
}

export function mapPricingQuote(data: PricingPageResponse | undefined) {
  const item = data?.data?.sections?.request_quote?.items?.[0];
  const title = item?.title?.trim() ?? "";
  const words = wordsOf(title);
  const splitAt = words.findIndex((word, index) => index > 0 && /^[A-Z]/.test(word));
  return {
    titleLines: !title
      ? []
      : splitAt > 0
        ? [words.slice(0, splitAt).join(" "), words.slice(splitAt).join(" ")]
        : splitBalanced(title, 2),
    description: item?.subtitle?.trim() ?? "",
    ctaLabel: item?.button_text?.trim() ?? "",
  };
}

export function mapCompletePackages(data: PricingPageResponse | undefined) {
  const item = data?.data?.sections?.complete_packages?.items?.[0];
  const packages = (item?.packages ?? []).map((entry) => entry.trim()).filter(Boolean);
  const columnCount = 4;
  const size = Math.ceil(packages.length / columnCount);
  const columns = size
    ? Array.from({ length: columnCount }, (_, index) =>
        packages.slice(index * size, (index + 1) * size),
      ).filter((column) => column.length > 0)
    : [];
  return {
    title: item?.title?.trim() ?? "",
    columns,
  };
}

export function mapPricingTestimonial(data: PricingPageResponse | undefined) {
  const item = data?.data?.sections?.testimonial?.items?.[0];
  const words = wordsOf(item?.subtitle ?? "");
  const accent = words.at(-1) ?? "";
  const rest = words.slice(0, -1);
  const headingLines =
    rest.length <= 1 ? [rest[0] ?? "", ""] : [rest[0], rest.slice(1).join(" ")];
  return {
    badge: item?.title?.trim() ?? "",
    headingLines,
    headingAccent: accent,
  };
}

export function mapBuiltFor(data: PricingPageResponse | undefined) {
  const item = data?.data?.sections?.build_for_growth?.items?.[0];
  return {
    title: item?.title?.trim() ?? "",
    ours: item?.section_one_title?.trim() ?? "",
    others: item?.section_two_title?.trim() ?? "",
    oursItems: (item?.section_one_lists ?? []).map((entry) => entry.trim()).filter(Boolean),
    othersItems: (item?.section_two_lists ?? []).map((entry) => entry.trim()).filter(Boolean),
  };
}

export function mapPricingFaq(data: PricingPageResponse | undefined) {
  const item = data?.data?.sections?.faq?.items?.[0];
  const subtitle = wordsOf(item?.subtitle ?? "");
  return {
    badge: item?.title?.trim() ?? "",
    headingAccent: subtitle[0] ?? "",
    headingTitle: subtitle.slice(1).join(" "),
    ctaText: item?.cta_title?.trim() ?? "",
    ctaLabel: item?.cta_button_text?.trim() ?? "",
  };
}

export function mapFeaturedWork(data: PricingPageResponse | undefined) {
  const item = data?.data?.sections?.featured_work?.items?.[0];
  return {
    title: item?.title?.trim() ?? "",
    description: item?.subtitle?.trim() ?? "",
    images: (item?.images ?? []).flatMap((image) => {
      const src = image?.url?.trim() ?? "";
      if (!src) return [];
      return [
        {
          id: image.id,
          src,
          alt: image.alt_text?.trim() || image.name?.trim() || "",
        },
      ];
    }),
  };
}
