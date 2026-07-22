"use client";

import Image from "next/image";
import { forwardRef } from "react";

const CenterNode = forwardRef<HTMLDivElement>(function CenterNode(_, ref) {
  return (
    <div ref={ref} className="ai-feature-center-node relative">
      <Image
        src="/ai-feature/center-node.png"
        alt="Webkarigor"
        fill
        className="ai-feature-center-image"
        sizes="(max-width: 768px) 72px, 112px"
        priority
      />
    </div>
  );
});

export default CenterNode;
