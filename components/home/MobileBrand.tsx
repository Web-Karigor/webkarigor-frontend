// import Image from "next/image";
import Link from "next/link";
import homeContent from "@/data/home-content.json";

const { brand } = homeContent.navbar;

export default function MobileBrand() {
  return (
    <div
      className="pointer-events-none inset-x-0 top-0 z-[70] flex justify-center lg:hidden"
      style={{ paddingTop: "max(14px, env(safe-area-inset-top))" }}
    >
      <Link
        href="/"
        aria-label="Webkarigor home"
        className="font-montserrat text-[32px] font-extrabold tracking-[-0.04em] text-[#1f1e1c] sm:text-[17px]"
      >
        {/* <span className="flex items-center rounded-full bg-[#fffaea] px-4 py-1.5 font-montserrat text-[15px] font-semibold leading-none tracking-[-0.02em] sm:text-[16px]">
          <span className="bg-[linear-gradient(160deg,#0ec47b_0%,#2eeda0_48%,#15d286_72%,#b8e070_90%,#e4ef96_100%)] bg-clip-text text-transparent">
            {brand}
          </span>
        </span> */}
        {brand}
      </Link>
    </div>
  );
}
