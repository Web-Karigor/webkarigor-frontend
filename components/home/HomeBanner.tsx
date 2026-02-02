import React from "react";
import Image from "next/image";

const HomeBanner = () => {
  return (
    <section className="w-full relative overflow-hidden py-20 bg-gradient-to-br from-[#5ee99e] via-[#b1e863] to-[#e6e85b]">
      {/* Absolute Bg Image */}
      <Image
        src="/rr.png"
        alt=""
        fill
        className="object-cover object-center opacity-30 pointer-events-none select-none"
        style={{ zIndex: 0 }}
        priority
      />
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <div className="md:w-2/3 w-full mb-10 md:mb-0">
          <h2 className="text-2xl md:text-[40px] font-bold font-montserrat text-black mb-2 flex flex-col gap-y-2 md:gap-y-5">
            <span>Every product is different</span>
            <span>Your pricing should be too</span>
          </h2>
          <p className="text-[20px] font-montserrat font-medium text-[#222] mt-4">
            Looking for a custom solution or specific service?
          </p>
        </div>
        <div className="md:w-auto w-full flex md:justify-end justify-center">
          <button
            className="bg-white px-7 py-3 rounded-xl shadow-lg text-[24px] font-semibold text-black transition hover:bg-[#f3f3f3] border border-slate-200"
            style={{ minWidth: 170 }}
          >
            Request a quote
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;