"use client";

import "./StatsBadge.css";
import { useHomePageQuery } from "@/hooks/queries/useHomePageQuery";
import { homeSectionItem, parseYearsBadge } from "@/lib/home-page";

export default function StatsBadge() {
  const { data } = useHomePageQuery();
  const hero = homeSectionItem(data?.data?.sections?.hero);
  if (!hero?.years) return null;

  const stats = parseYearsBadge(hero.years);

  return (
    <div className="flex items-center justify-center gap-2 text-center">
      <h2 className="stats-number leading-none">{stats.number}</h2>

      <div className="flex flex-col items-start">
        <span className="stats-plus leading-none">{stats.plus}</span>
        <span className="stats-pill stats-years leading-none px-4 md:px-6">
          {stats.label}
        </span>
      </div>
    </div>
  );
}
