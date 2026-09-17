import {
  Laptop,
  MonitorCheck,
  Palette,
  ShoppingBag,
  SlidersHorizontal,
  Wrench,
} from "lucide-react";

const SERVICES = [
  {
    title: "Corporate Website Development",
    description: "Professional websites designed around your brand, services, customers, and business objectives.",
    color: "#12B76A",
    bg: "#E8F8F0",
    icon: "corporate",
    category: "Strategic Brand & Market Alignment",
    tag: "Enterprise Standard",
  },
  {
    title: "Custom Web Design and Development",
    description: "Web solutions that are designed specifically for a business that has certain functionality, workflows, or technical needs.",
    color: "#F79009",
    bg: "#FEF4E6",
    icon: "custom",
    category: "Tailored Architecture",
    tag: "Custom Workflows",
  },
  {
    title: "E-commerce Website Development",
    description: "Online stores designed around product discovery, customer experience, performance, and business operations.",
    color: "#EE46BC",
    bg: "#FCE8F5",
    icon: "ecommerce",
    category: "Conversion & Velocity",
    tag: "High-Performance",
  },
  {
    title: "Web Application Development",
    description: "Scalable browser-based applications for more complex digital products and business processes.",
    color: "#2E90FA",
    bg: "#E8F3FE",
    icon: "application",
    category: "SaaS & Business Systems",
    tag: "Complex Logic",
  },
  {
    title: "Website Redesign Service",
    description: "Modernize an outdated website's design, usability, structure, performance, and technical foundation.",
    color: "#7A5AF8",
    bg: "#F0ECFE",
    icon: "redesign",
    category: "UX & Stack Modernization",
    tag: "Evolution",
  },
  {
    title: "Website Maintenance and Development Support",
    description: "Ongoing technical improvements, feature development, maintenance, and performance work based on project requirements.",
    color: "#667085",
    bg: "#F2F4F7",
    icon: "maintenance",
    category: "Continuous Reliability & SLA",
    tag: "Lifecycle Support",
  },
] as const;

const ICONS = {
  corporate: MonitorCheck,
  custom: SlidersHorizontal,
  ecommerce: ShoppingBag,
  application: Laptop,
  redesign: Palette,
  maintenance: Wrench,
} as const;

export default function Services() {
  return (
    <section className="bg-[#f8fafb] py-[clamp(48px,6vw,76px)]">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-8 px-[clamp(20px,4vw,120px)] md:gap-10">
        <div className="flex w-full flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="max-w-[560px] shrink-0">
            <p className="m-0 font-montserrat text-[15px] font-semibold leading-none text-[#00b873]">
              Our Services
            </p>
            <h2 className="mt-3 m-0 max-w-[540px] font-montserrat text-[clamp(28px,3.2vw,40px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#0c0d0e]">
              Our Web Design and Development Services
            </h2>
          </div>
          <p className="m-0 w-full max-w-[650px] font-manrope text-[16px] font-medium leading-[1.55] text-[#a4a8ad] md:pb-0.5 lg:text-[18px]">
            Different businesses need different types of websites. Our web design and development services can be tailored to your project&apos;s goals, audience, features, speed, and future direction.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[service.icon];
            return (
              <article
                key={service.title}
                className="group flex min-h-[190px] w-full flex-col rounded-[16px] border border-[#edf0f1] border-l-2 border-l-[#00c982] bg-white px-5 py-4 shadow-[0_8px_24px_rgba(31,41,55,0.04)] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(31,41,55,0.09)] lg:min-h-[210px] lg:px-6 lg:py-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-montserrat text-[24px] font-bold leading-none text-[#e2e5e7]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="inline-flex h-7 w-7 items-center justify-center rounded-[6px]"
                    style={{ backgroundColor: service.bg, color: service.color }}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </span>
                </div>
                <div className="mt-4 flex min-w-0 flex-1 flex-col">
                  <h2 className="m-0 font-montserrat text-[18px] font-bold leading-[1.25] text-[#18202a] lg:text-[20px]">
                    {service.title}
                  </h2>
                  <p className="mt-2 m-0 font-montserrat text-[14px] font-medium leading-[1.5] text-[#7f8b9b] lg:text-[15px]">
                    {service.description}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#edf0f1] pt-2 font-montserrat text-[11px] font-medium leading-none text-[#a9b2bf]">
                  <span>{service.category}</span>
                  <span className="shrink-0">{service.tag}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
