import type { ProjectExtraSection } from "@/lib/project-details-data";

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((para) => (
        <p
          key={para.slice(0, 48)}
          className="mt-3 m-0 font-montserrat text-[clamp(14px,3.5vw,16px)] font-medium leading-[170%] text-[#4b5563] first:mt-0 sm:mt-4 first:sm:mt-0"
        >
          {para}
        </p>
      ))}
    </>
  );
}

function ExtraSection({ section }: { section: ProjectExtraSection }) {
  return (
    <article className="w-full max-w-[865px]">
      <h2 className="m-0 font-montserrat text-[clamp(22px,5.5vw,32px)] font-bold leading-[140%] tracking-[-0.02em] text-[#0A0A0A]">
        {section.title}
      </h2>
      {section.headline ? (
        <h3 className="mt-3 m-0 font-montserrat text-[clamp(17px,4vw,22px)] font-medium leading-[145%] tracking-[-0.02em] text-[#0A0A0A] sm:mt-4">
          {section.headline}
        </h3>
      ) : null}
      {section.intro ? (
        <div className="mt-4 sm:mt-5">
          <Paragraphs text={section.intro} />
        </div>
      ) : null}
      {section.paragraphs?.map((para) => (
        <p
          key={para.slice(0, 48)}
          className="mt-4 m-0 font-montserrat text-[clamp(14px,3.5vw,16px)] font-medium leading-[170%] text-[#4b5563] sm:mt-5"
        >
          {para}
        </p>
      ))}

      {section.phases?.map((phase) => (
        <div key={phase.title} className="mt-8 sm:mt-10">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="m-0 font-montserrat text-[clamp(18px,4.5vw,24px)] font-bold leading-[140%] tracking-[-0.02em] text-[#0A0A0A]">
              {phase.title}
            </h3>
            {phase.period ? (
              <span className="font-montserrat text-[13px] font-semibold text-[#6b7280] sm:text-[14px]">
                {phase.period}
              </span>
            ) : null}
          </div>
          {phase.intro ? (
            <p className="mt-2 m-0 font-montserrat text-[clamp(14px,3.5vw,16px)] font-medium leading-[170%] text-[#4b5563]">
              {phase.intro}
            </p>
          ) : null}
          <ul className="mt-4 m-0 list-none space-y-3 p-0">
            {phase.items.map((item) => (
              <li key={item.title}>
                <p className="m-0 font-montserrat text-[15px] font-bold leading-[150%] text-[#0A0A0A] sm:text-[16px]">
                  {item.title}
                </p>
                <p className="mt-1 m-0 font-montserrat text-[clamp(14px,3.5vw,16px)] font-medium leading-[170%] text-[#4b5563]">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {section.flows?.length ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:mt-8 sm:grid-cols-3 sm:gap-6">
          {section.flows.map((flow) => (
            <div key={flow.title} className="rounded-2xl bg-[#FFF8DC] p-5 sm:p-6">
              <h3 className="m-0 font-montserrat text-[15px] font-bold leading-[140%] text-[#0A0A0A] sm:text-[16px]">
                {flow.title}
              </h3>
              <ol className="mt-3 m-0 list-none space-y-2 p-0">
                {flow.items.map((item, index) => (
                  <li
                    key={item}
                    className="font-montserrat text-[14px] font-medium leading-[160%] text-[#4b5563]"
                  >
                    {index + 1}. {item}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      ) : null}

      {section.groups?.map((group) => (
        <div key={group.title} className="mt-8 sm:mt-10">
          <h3 className="m-0 font-montserrat text-[clamp(18px,4.5vw,24px)] font-bold leading-[140%] tracking-[-0.02em] text-[#0A0A0A]">
            {group.title}
          </h3>
          {group.intro ? (
            <p className="mt-2 m-0 font-montserrat text-[clamp(14px,3.5vw,16px)] font-medium leading-[170%] text-[#4b5563]">
              {group.intro}
            </p>
          ) : null}
          <ul className="mt-3 m-0 list-disc space-y-1.5 pl-5">
            {group.items.map((item) => (
              <li
                key={item}
                className="font-montserrat text-[clamp(14px,3.5vw,16px)] font-medium leading-[170%] text-[#4b5563]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {section.focus?.length ? (
        <div className="mt-6 sm:mt-8">
          <h3 className="m-0 font-montserrat text-[15px] font-bold leading-[140%] text-[#0A0A0A] sm:text-[16px]">
            Focus Areas
          </h3>
          <ul className="mt-3 m-0 list-disc space-y-1.5 pl-5">
            {section.focus.map((item) => (
              <li
                key={item}
                className="font-montserrat text-[clamp(14px,3.5vw,16px)] font-medium leading-[170%] text-[#4b5563]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {section.colors?.length ? (
        <div className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
          {section.colors.map((color) => (
            <div
              key={color.label}
              className="flex min-w-[140px] items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_0_20px_rgba(0,0,0,0.06)]"
            >
              <span
                className="h-10 w-10 shrink-0 rounded-full border border-black/10"
                style={{ backgroundColor: color.value }}
              />
              <div>
                <p className="m-0 font-montserrat text-[13px] font-bold text-[#0A0A0A]">
                  {color.label}
                </p>
                <p className="m-0 font-montserrat text-[12px] font-medium text-[#6b7280]">
                  {color.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {section.closing ? (
        <p className="mt-5 m-0 font-montserrat text-[clamp(14px,3.5vw,16px)] font-medium leading-[170%] text-[#4b5563] sm:mt-6">
          {section.closing}
        </p>
      ) : null}
    </article>
  );
}

export default function ProjectDetailsExtra({
  sections,
}: {
  sections: ProjectExtraSection[];
}) {
  if (!sections.length) return null;

  return (
    <div className="mt-12 flex flex-col gap-12 sm:mt-16 sm:gap-14 md:mt-20 md:gap-16">
      {sections.map((section) => (
        <ExtraSection key={section.title} section={section} />
      ))}
    </div>
  );
}
