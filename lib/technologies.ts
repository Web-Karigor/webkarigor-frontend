import type {
  TechGroup,
  TechItem,
  TechnologyPost,
} from "@/types/technologies";

/** Same 4-column layout as before (5 items per column). */
const COLUMN_SIZE = 5;
const GROUP_TITLES = ["Back end", "Front end", "Design", "Tools & Cloud"];

export function mapTechnologyPostsToGroups(
  posts: TechnologyPost[] | undefined,
): TechGroup[] {
  const items: TechItem[] = [...(posts ?? [])]
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((post) => ({
      id: post.id,
      name: post.fields?.name?.trim() ?? "",
      icon: post.fields?.icon?.trim() ?? "",
    }))
    .filter((item) => item.name && item.icon);

  if (!items.length) return [];

  const groups: TechGroup[] = [];
  for (let i = 0; i < items.length; i += COLUMN_SIZE) {
    groups.push({
      title: GROUP_TITLES[groups.length] ?? `Group ${groups.length + 1}`,
      items: items.slice(i, i + COLUMN_SIZE),
    });
  }
  return groups;
}
