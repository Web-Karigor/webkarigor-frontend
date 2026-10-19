import type {
  AboutFooterItem,
  AboutMedia,
  AboutPageResponse,
} from "@/types/about-page";

export type AboutStat = {
  value: string;
  label: string;
  description: string;
};

const FOOTER_TITLE =
  "Let's build what your users will love and your business will grow with";

const FOOTER_DESKTOP = [
  "Let's build what your users will love",
  "and your business will grow with",
];

const FOOTER_MOBILE = [
  "Let's build what your",
  "users will love and your",
  "business will grow with",
];

function mediaUrl(media: AboutMedia | undefined) {
  return media?.url?.trim() ?? "";
}

function mediaAlt(media: AboutMedia | undefined) {
  return media?.alt_text?.trim() || media?.name?.trim() || "";
}

function plusCount(value: number | string | null | undefined) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  return raw.endsWith("+") ? raw : `${raw}+`;
}

function splitWords(text: string, parts: number) {
  const words = text.trim().split(/\s+/).filter(Boolean);
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

export function mapAboutHero(data: AboutPageResponse | undefined) {
  const sections = data?.data?.sections;
  const images = (sections?.hero?.items?.[0]?.images ?? [])
    .map((image) => mediaUrl(image))
    .filter(Boolean);
  const title = sections?.digital_product?.items?.[0]?.title?.trim() ?? "";
  return { title, images };
}

export function mapAboutImpact(data: AboutPageResponse | undefined) {
  const item = data?.data?.sections?.digital_product?.items?.[0];
  const images = item?.images ?? [];
  const main = images[0];
  const stats: AboutStat[] = [
    {
      value: plusCount(item?.year),
      label: "Years",
      description: item?.year_content?.trim() ?? "",
    },
    {
      value: plusCount(item?.projects),
      label: "Projects",
      description: item?.project_content?.trim() ?? "",
    },
  ].filter((stat) => stat.value || stat.description);

  return {
    intro: item?.subtitle?.trim() ?? "",
    stats,
    mainImage: mediaUrl(main),
    mainImageAlt: mediaAlt(main),
    gallery: images.slice(1).flatMap((image) => {
      const src = mediaUrl(image);
      return src ? [{ src, alt: mediaAlt(image) }] : [];
    }),
  };
}

export function mapAboutVision(data: AboutPageResponse | undefined) {
  const item = data?.data?.sections?.our_vision?.items?.[0];
  const images = item?.images ?? [];
  const slots = ["large", "top", "bottomLeft", "bottomRight"] as const;
  const mapped = Object.fromEntries(
    slots.map((slot, index) => [
      slot,
      {
        src: mediaUrl(images[index]),
        alt: mediaAlt(images[index]),
      },
    ]),
  ) as Record<(typeof slots)[number], { src: string; alt: string }>;

  return {
    title: item?.title?.trim() ?? "",
    lead: item?.subtitle?.trim() ?? "",
    images: mapped,
  };
}

export function mapAboutFooter(item: AboutFooterItem | undefined) {
  const title = item?.title?.trim() ?? "";
  const tagline = [item?.section, item?.section_2, item?.section_3]
    .map((part) => part?.trim() ?? "")
    .filter(Boolean);
  return { title, tagline };
}

export function aboutFooterHeading(title: string) {
  const normalized = title.replace(/\u2019/g, "'").trim();
  if (normalized === FOOTER_TITLE) {
    return { desktop: FOOTER_DESKTOP, mobile: FOOTER_MOBILE };
  }
  return {
    desktop: splitWords(normalized, 2),
    mobile: splitWords(normalized, 3),
  };
}
