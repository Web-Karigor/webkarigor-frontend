"use client";

import Image from "next/image";

const portfolioItems = [
  { id: 1, image: "/h1.png" },
  { id: 2, image: "/h2.png" },
  { id: 3, image: "/h1.png" },
  { id: 4, image: "/h2.png" },
  { id: 5, image: "/h1.png" },
  { id: 6, image: "/h2.png" },
];

export default function Portfolio() {
  return (
    <section className="relative py-16 md:py-24 px-4 md:px-6 bg-[#FFFDF6]">
      <div className="max-w-[1320px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block px-4 md:px-6 py-2 border-2 border-[#39B770] rounded-full bg-[#FEFCF6] mb-4">
            <span className="text-[#39B770] font-medium text-sm md:text-base">Our Portfolio</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F1E1C] mt-4">
            Prepare Your Solution
          </h2>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
              style={{
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
              }}
            >
              <Image
                src={item.image}
                alt={`Portfolio item ${item.id}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* Soft glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
