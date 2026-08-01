import Image from "next/image";
import servicesContent from "@/data/services-content.json";

const { title, description, logos } = servicesContent.clients;

export default function ServiceClients() {
  return (
    <section className="bg-[#f8fafc] px-4 py-16 sm:px-8 lg:px-10 lg:py-[100px]">
      <div className="mx-auto flex w-full max-w-[1208px] flex-col items-center gap-8 lg:gap-[60px]">
        <h2 className="m-0 text-center font-montserrat text-[clamp(1.875rem,4vw,2.5rem)] font-bold leading-[1.2] tracking-[-0.02em] text-[#111827]">
          {title}
        </h2>
        <p className="m-0 w-full max-w-[1208px] text-center font-montserrat text-[clamp(0.9375rem,1.5vw,1.0625rem)] leading-[1.75] text-[#4b5563]">
          {description}
        </p>

        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {logos.map((client) => (
            <div
              key={client.name}
              className="flex aspect-square items-center justify-center rounded-[20px] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] lg:p-8"
            >
              <Image
                src={client.src}
                alt={client.name}
                width={160}
                height={160}
                className="h-auto max-h-full w-auto max-w-full object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
