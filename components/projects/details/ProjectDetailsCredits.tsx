import Image from "next/image";
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
      <p className="m-0 font-montserrat text-[clamp(13px,3.2vw,15px)] font-bold leading-[150%] text-[#0A0A0A]">
        {person.name}
      </p>
    </div>
  );
}

function CreditRow({ group }: { group: CreditGroup }) {
  return (
    <div className="col-span-2 grid grid-cols-subgrid items-start gap-x-3 border-b border-[#E8E4DC] py-4 sm:gap-x-4 sm:py-5 md:gap-x-6">
      <p className="m-0 self-start pt-2 font-montserrat text-[clamp(13px,3.2vw,15px)] font-medium leading-[150%] text-[#6b7280]">
        {group.role}
      </p>

      <div className="flex flex-col gap-2.5">
        {group.people.map((person, i) => (
          <PersonRow
            key={`${person.name}-${person.avatar}-${i}`}
            person={person}
          />
        ))}
      </div>
    </div>
  );
}

function CreditsColumn({ groups }: { groups: CreditGroup[] }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 sm:gap-x-4 md:gap-x-6">
      {groups.map((group) => (
        <CreditRow key={group.role} group={group} />
      ))}
    </div>
  );
}

export default function ProjectDetailsCredits({ project }: { project: ProjectDetail }) {
  const groups = groupCredits(project.credits);
  const leftGroups = groups.filter((_, index) => index % 2 === 0);
  const rightGroups = groups.filter((_, index) => index % 2 === 1);

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

          <div className="mt-8 sm:mt-10">
            <div className="sm:hidden">
              <CreditsColumn groups={groups} />
            </div>

            <div className="hidden gap-x-6 sm:grid sm:grid-cols-2 md:gap-x-10 lg:gap-x-20">
              <CreditsColumn groups={leftGroups} />
              <CreditsColumn groups={rightGroups} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
