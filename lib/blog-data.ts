export const BLOG_PAGE = {
  eyebrow: "Beyond the Interface",
  titleLead: "Perspectives on Design,",
  titleRest: "Technology & Growth",
  description:
    "Essays on design, technology, and the decisions that shape how products grow.",
};

const BLOG_DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Dhaka",
});

export function formatBlogDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const parts = BLOG_DATE_FORMAT.formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value ?? "";
  return `${part("day")} ${part("month")}, ${part("year")}`;
}

export function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
