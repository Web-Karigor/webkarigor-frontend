import { splitTrailingWords, splitTwoLineHeading } from "@/lib/home-page";
import type { ContactStoryPost } from "@/types/contact-us-success-stories";

export { homeSectionItem as contactSectionItem } from "@/lib/home-page";

/** "Have A Question Or Just Want To Chat?" → two visual lines. */
export function splitContactHeroTitle(title: string) {
  const [line1, line2] = splitTwoLineHeading(title);
  return { line1, accent: line2 };
}

/** "Get In Touch Now For Business Or Career Opportunities!" → accent last 2 words. */
export function splitContactConnectTitle(title: string) {
  const { head, tail } = splitTrailingWords(title, 2);
  return { line1: head, accent: tail || head };
}

/** "Details For The Startups" → accent last word. */
export function splitContactDeckTitle(title: string) {
  const { head, tail } = splitTrailingWords(title, 1);
  return { line1: head, accent: tail || head };
}

/** "Success Stories That Inspire Us" → Success [Stories] That [Inspire Us]. */
export function splitContactStoriesTitle(title: string) {
  const parts = title.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 4) {
    return {
      line1: parts[0] ?? "",
      accent1: parts[1] ?? "",
      line2: parts[2] ?? "",
      accent2: parts.slice(3).join(" "),
    };
  }
  if (parts.length === 3) {
    return {
      line1: parts[0] ?? "",
      accent1: parts[1] ?? "",
      line2: "",
      accent2: parts[2] ?? "",
    };
  }
  const { head, tail } = splitTrailingWords(title, 1);
  return { line1: head, accent1: tail, line2: "", accent2: "" };
}

/** First word → accent, rest → title (FAQ). */
export function splitContactFaqTitle(title: string) {
  const parts = title.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { accent: title.trim(), title: "" };
  return {
    accent: parts[0] ?? "",
    title: parts.slice(1).join(" "),
  };
}

export function parseContactOffice(address: string, whatsapp: string) {
  const rawAddress = address.trim();
  const phone = whatsapp.trim();
  const digits = phone.replace(/\D/g, "");

  let country = "";
  let line = rawAddress;
  const comma = rawAddress.indexOf(",");
  if (comma > 0) {
    const maybeCountry = rawAddress.slice(0, comma).trim();
    if (maybeCountry && maybeCountry.length < 40 && !/\d/.test(maybeCountry)) {
      country = maybeCountry;
      line = rawAddress.slice(comma + 1).trim();
    }
  }

  return {
    country,
    address: line || rawAddress,
    phone,
    whatsappHref: digits ? `https://wa.me/${digits}` : "",
  };
}

export type ContactStoryCategory = {
  id: string;
  label: string;
  image: string;
  imageAlt: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

export function mapContactStoryPosts(
  posts: ContactStoryPost[] | undefined | null,
): ContactStoryCategory[] {
  if (!posts?.length) return [];

  return [...posts]
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((post) => {
      const fields = post.fields ?? {};
      const id = fields.id?.trim() || String(post.id);
      const label = fields.label?.trim() ?? "";
      const image = fields.image?.url?.trim() ?? "";
      const imageAlt =
        fields.imagealt?.trim() ||
        fields.image?.alt_text?.trim() ||
        fields.image?.name?.trim() ||
        label;
      const quote = fields.quote?.trim() ?? "";
      const name = fields.name?.trim() ?? "";
      const role = fields.role?.trim() ?? "";
      const avatar = fields.avatar?.trim() ?? "";

      if (!id || !label || !image || !quote || !name) return null;

      return { id, label, image, imageAlt, quote, name, role, avatar };
    })
    .filter((item): item is ContactStoryCategory => item !== null);
}
