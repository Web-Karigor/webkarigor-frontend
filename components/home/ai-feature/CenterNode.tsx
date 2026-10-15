"use client";

import Image from "next/image";
import { forwardRef } from "react";

const CenterNode = forwardRef<
  HTMLDivElement,
  { imageSrc: string }
>(function CenterNode({ imageSrc }, ref) {
  return (
    <div ref={ref} className="ai-feature-center-node relative">
      <Image
        src={imageSrc}
        alt=""
        fill
        className="ai-feature-center-image"
        sizes="(max-width: 768px) 84px, 132px"
        loading="lazy"
        unoptimized
      />
    </div>
  );
});

export default CenterNode;
