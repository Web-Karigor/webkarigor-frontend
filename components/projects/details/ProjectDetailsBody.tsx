import {
  PROJECT_DETAILS_UI,
  type ProjectDetail,
} from "@/lib/project-details-data";
import { PD } from "@/lib/project-details-layout";
import ProjectDetailsExtra from "@/components/projects/details/ProjectDetailsExtra";

function RichText({ text, className }: { text: string; className?: string }) {
  return (
    <div className={className}>
      {text.split("\n\n").map((para) => (
        <p
          key={para.slice(0, 56)}
          className="mt-4 m-0 font-montserrat text-[clamp(14px,3.5vw,16px)] font-medium leading-[170%] text-[#4b5563] first:mt-0 sm:mt-5 first:sm:mt-0"
        >
          {para}
        </p>
      ))}
    </div>
  );
}

function TitleBodyList({
  items,
  className = "mt-6 sm:mt-8",
}: {
  items: { title: string; body: string }[];
  className?: string;
}) {
  return (
    <ul className={`m-0 list-none space-y-5 p-0 sm:space-y-6 ${className}`}>
      {items.map((item) => (
        <li key={item.title}>
          <p className="m-0 font-montserrat text-[clamp(15px,3.8vw,16px)] font-bold leading-[150%] text-[#0A0A0A]">
            {item.title}
          </p>
          <p className="mt-1 m-0 font-montserrat text-[clamp(14px,3.5vw,16px)] font-medium leading-[170%] text-[#4b5563]">
            {item.body}
          </p>
        </li>
      ))}
    </ul>
  );
}

const aboutTitleClass =
  "m-0 max-w-[864px] font-montserrat text-[clamp(20px,5vw,28px)] font-bold leading-[140%] tracking-[-0.02em] text-[#0A0A0A]";

export default function ProjectDetailsBody({ project }: { project: ProjectDetail }) {
  const metaRows = [
    { label: PROJECT_DETAILS_UI.metaLabels.execution, value: project.meta.execution },
    { label: PROJECT_DETAILS_UI.metaLabels.clientName, value: project.meta.clientName },
    { label: PROJECT_DETAILS_UI.metaLabels.projectArea, value: project.meta.projectArea },
    { label: PROJECT_DETAILS_UI.metaLabels.status, value: project.meta.status },
    { label: PROJECT_DETAILS_UI.metaLabels.technologies, value: project.meta.technologies },
  ];

  return (
    <section className="pd-body bg-[#FFFDF6] pt-12 pb-8 sm:pt-16 sm:pb-10 md:pt-20 lg:pt-[100px] lg:pb-10">
      <div
        className="mx-auto w-full px-[clamp(16px,4vw,40px)]"
        style={{ maxWidth: PD.content + 80 }}
      >
        <div className="mx-auto w-full" style={{ maxWidth: PD.content }}>
          <h1 className="pd-title m-0 w-full text-left font-montserrat text-[clamp(24px,6vw,48px)] font-bold leading-[1.3] tracking-[-0.02em] text-black">
            {project.title}
          </h1>
          <div className="mt-6 h-px w-full bg-[#E5E1D8] sm:mt-8 md:mt-10" />

          <div className="pd-body-split mt-8 grid grid-cols-1 items-start gap-8 sm:mt-10 lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-[60px]">
            <div className="flex flex-col gap-5 sm:gap-6 lg:sticky lg:top-3 lg:max-h-[calc(100dvh-24px)] lg:self-start lg:overflow-y-auto lg:overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden">
              <aside className="rounded-2xl bg-[#FFF8DC] p-5 sm:rounded-[24px] sm:p-6 lg:p-8">
                <h2 className="m-0 font-montserrat text-[clamp(17px,4vw,20px)] font-bold leading-[140%] tracking-[-0.02em] text-[#0A0A0A]">
                  {PROJECT_DETAILS_UI.projectDetails}
                </h2>
                <dl className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
                  {metaRows.map((row) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-1 items-baseline gap-1 sm:grid-cols-[minmax(0,140px)_1fr] sm:gap-3"
                    >
                      <dt className="m-0 font-montserrat text-[13px] font-bold leading-[150%] text-[#0A0A0A] sm:text-[14px]">
                        {row.label}
                      </dt>
                      <dd className="m-0 min-w-0 break-words font-montserrat text-[13px] font-medium leading-[150%] text-[#4b5563] sm:text-[14px]">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </aside>

              <aside className="rounded-2xl bg-[#FFF8DC] p-5 sm:rounded-[24px] sm:p-6 lg:p-8">
                <h2 className="m-0 font-montserrat text-[clamp(17px,4vw,20px)] font-bold leading-[140%] tracking-[-0.02em] text-[#0A0A0A]">
                  {PROJECT_DETAILS_UI.clientsVoice}
                </h2>
                <p className="mt-4 m-0 font-montserrat text-[clamp(14px,3.5vw,15px)] font-medium leading-[170%] text-[#4b5563] sm:mt-5">
                  {project.clientVoice}
                </p>
              </aside>
            </div>

            <div className="min-w-0">
              <div className="max-w-[865px]">
                <h2 className="m-0 font-montserrat text-[clamp(22px,5.5vw,32px)] font-bold leading-[140%] tracking-[-0.02em] text-[#0A0A0A]">
                  {project.about.eyebrow}
                </h2>
                <h3 className={`mt-3 sm:mt-4 ${aboutTitleClass}`}>
                  {project.about.headline}
                </h3>
                <div className="mt-4 sm:mt-5">
                  <RichText text={project.about.body} />
                </div>
                {project.about.items?.length ? (
                  <TitleBodyList items={project.about.items} />
                ) : null}
                {project.about.more ? (
                  <div className="mt-8 sm:mt-10">
                    <h3 className={aboutTitleClass}>{project.about.more.headline}</h3>
                    <div className="mt-4 sm:mt-5">
                      <RichText text={project.about.more.body} />
                    </div>
                    {project.about.more.subhead ? (
                      <p className="mt-6 m-0 font-montserrat text-[clamp(15px,3.8vw,16px)] font-bold leading-[150%] text-[#0A0A0A] sm:mt-8">
                        {project.about.more.subhead}
                      </p>
                    ) : null}
                    {project.about.more.items?.length ? (
                      <TitleBodyList items={project.about.more.items} className="mt-4 sm:mt-5" />
                    ) : null}
                    {project.about.more.closing ? (
                      <div className="mt-6 sm:mt-8">
                        <RichText text={project.about.more.closing} />
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>

              {/* Mockup image hidden on details page
              <div
                data-project-cursor
                className="pd-mockup relative mt-8 w-full overflow-hidden rounded-2xl bg-[#f3f1ea] sm:mt-10 sm:rounded-3xl lg:rounded-[40px]"
              >
                <Image
                  src={project.mockupImage}
                  alt={PROJECT_DETAILS_UI.mockupAlt}
                  width={1600}
                  height={1000}
                  className="h-auto w-full object-contain"
                  sizes="(max-width: 1024px) 100vw, 840px" loading="lazy"/>
              </div>
              */}

              <div className="mt-10 flex flex-col gap-8 sm:mt-14 sm:gap-12 md:mt-16 md:gap-14">
                {project.problem ? (
                  <div className="w-full max-w-[865px]">
                    <h3 className="m-0 font-montserrat text-[clamp(20px,5vw,28px)] font-bold leading-[140%] tracking-[-0.02em] text-[#0A0A0A]">
                      {PROJECT_DETAILS_UI.problem}
                    </h3>
                    <div className="mt-3 sm:mt-4">
                      <RichText text={project.problem} />
                    </div>
                  </div>
                ) : null}

                <div className="pd-solution w-full max-w-[865px]">
                  <h3 className="m-0 font-montserrat text-[clamp(20px,5vw,28px)] font-bold leading-[140%] tracking-[-0.02em] text-[#0A0A0A]">
                    {PROJECT_DETAILS_UI.solution}
                  </h3>
                  <div className="mt-3 sm:mt-4">
                    <RichText text={project.solution} />
                  </div>
                </div>
              </div>

              {project.extraSections?.length ? (
                <ProjectDetailsExtra sections={project.extraSections} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
