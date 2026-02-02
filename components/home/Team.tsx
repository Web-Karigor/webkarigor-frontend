import React from "react";

/* ========= Images ========= */
const upperImages = [
  { src: "/sm1.png", type: "small" },
  { src: "/sm2.jpg", type: "small" },
  { src: "/sm3.jpg", type: "small" },
  { src: "/sm4.png", type: "big" }, // 👈 big
];

const lowerImages = [
  { src: "/sm4.png", type: "big" }, // 👈 big
  { src: "/sm3.jpg", type: "small" },
  { src: "/sm2.jpg", type: "small" },
  { src: "/sm1.png", type: "small" },
];

/* ========= Card ========= */
const ImageCard = ({ src, type }) => {
  const widthClass =
    type === "big"
      ? "w-[421px]"
      : "w-[279px]";

  return (
    <div
      className={`${widthClass} h-[439px] rounded-[32px] overflow-hidden
      border border-[#EFEFEF] bg-white
      shadow-[0_8px_24px_rgba(0,0,0,0.06)]
      flex-shrink-0`}
    >
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover"
        draggable={false}
      />
    </div>
  );
};

/* ========= Image Row ========= */
const ImageRow = ({ images }) => {
  return (
    <div className="flex gap-6">
      {images.map((img, i) => (
        <ImageCard key={i} src={img.src} type={img.type} />
      ))}
    </div>
  );
};

/* ========= Main ========= */
const Team = () => {
  return (
    <section className="bg-[#FEFCF6] py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-4 md:px-6">

        {/* ===== Mobile Heading ===== */}
        <div className="lg:hidden mb-10 text-center">
          <h2 className="text-4xl font-black text-[#141414]">Small Team</h2>
          <p className="text-4xl font-extrabold text-[#A0A4AA]">Big Result</p>
        </div>

        {/* ================= Row 1 ================= */}
        <div className="flex items-center justify-between mb-12">

          {/* Images */}
          <div className="overflow-x-auto lg:overflow-visible">
            <ImageRow images={upperImages} />
          </div>

          {/* Small Team */}
          <div className="hidden lg:block pl-10">
            <div className="leading-[0.9] text-right space-y-20">
              <div className="text-[92px] font-black text-[#141414]">
                Small
              </div>
              <div className="text-[92px] font-black text-[#141414]">
                Team
              </div>
            </div>
          </div>
        </div>

        {/* ================= Row 2 ================= */}
        <div className="flex items-center justify-between">

          {/* Big Result */}
          <div className="hidden lg:block pr-10">
            <div className="leading-[0.9] space-y-20">
              <div className="text-[92px] font-extrabold text-[#A0A4AA]">
                Big
              </div>
              <div className="text-[92px] font-extrabold text-[#A0A4AA]">
                Result
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="overflow-x-auto lg:overflow-visible">
            <ImageRow images={lowerImages} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Team;