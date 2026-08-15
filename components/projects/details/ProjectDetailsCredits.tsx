"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  PROJECT_DETAILS_UI,
  type ProjectCredit,
  type ProjectDetail,
} from "@/lib/project-details-data";
import { PD } from "@/lib/project-details-layout";

type CreditGroup = {
  role: string;
  people: ProjectCredit[];
};

function groupCredits(credits: ProjectCredit[]): CreditGroup[] {
  const map = new Map<string, ProjectCredit[]>();
  for (const credit of credits) {
    const list = map.get(credit.role);
    if (list) list.push(credit);
    else map.set(credit.role, [credit]);
  }
  return Array.from(map.entries()).map(([role, people]) => ({ role, people }));
}

function PersonRow({ person }: { person: ProjectCredit }) {
  return (
    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#f3f1ea] sm:h-10 sm:w-10">
        <Image
          src={person.avatar}
          alt={person.name}
          fill
          className="object-cover"
          sizes="40px"
        />
      </div>
      <p className="m-0 max-w-[100px] truncate font-montserrat text-[clamp(13px,3.2vw,15px)] font-bold leading-[150%] text-[#0A0A0A] sm:max-w-none sm:overflow-visible sm:whitespace-normal">
        {person.name}
      </p>
    </div>
  );
}

function CreditRow({ group }: { group: CreditGroup }) {
  const [open, setOpen] = useState(false);
  const hasMany = group.people.length > 1;
  const first = group.people[0];
  const rest = group.people.slice(1);

  return (
    <div className="border-b border-[#E8E4DC] py-4 sm:py-5">
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <p className="m-0 min-w-0 flex-1 pt-2 font-montserrat text-[clamp(13px,3.2vw,15px)] font-medium leading-[150%] text-[#6b7280]">
          {group.role}
        </p>

        <div className="flex min-w-0 shrink-0 flex-col items-end">
          {hasMany ? (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="flex items-center gap-1.5 text-left outline-none transition-opacity hover:opacity-80"
            >
              <PersonRow person={first} />
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-[#6b7280] transition-transform duration-300 ease-out ${
                  open ? "rotate-180" : "rotate-0"
                }`}
                strokeWidth={2}
                aria-hidden
              />
            </button>
          ) : (
            <PersonRow person={first} />
          )}

          {hasMany ? (
            <div
              className="grid w-full ease-out"
              style={{
                gridTemplateRows: open ? "1fr" : "0fr",
                transition: "grid-template-rows 350ms ease-out",
              }}
            >
              <div className="overflow-hidden">
                <div
                  className={`flex flex-col items-end gap-2.5 pt-2.5 transition-opacity duration-300 ease-out ${
                    open ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {rest.map((person, i) => (
                    <PersonRow
                      key={`${person.name}-${person.avatar}-${i}`}
                      person={person}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetailsCredits({ project }: { project: ProjectDetail }) {
  const groups = groupCredits(project.credits);

  return (
    <section className="pd-credits bg-[#FFFDF6] pt-12 pb-8 sm:pt-16 sm:pb-10 md:pt-20 lg:pt-[100px] lg:pb-10">
      <div
        className="mx-auto w-full px-[clamp(16px,4vw,40px)]"
        style={{ maxWidth: PD.content + 80 }}
      >
        <div className="mx-auto w-full" style={{ maxWidth: PD.content }}>
          <h2 className="m-0 font-montserrat text-[clamp(24px,6vw,40px)] font-bold leading-[130%] tracking-[-0.03em] text-[#0A0A0A]">
            {PROJECT_DETAILS_UI.credits}
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-x-6 sm:mt-10 sm:grid-cols-2 md:gap-x-10 lg:gap-x-20">
            {groups.map((group) => (
              <CreditRow key={group.role} group={group} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
