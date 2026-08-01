"use client";

import Image from "next/image";
import { forwardRef } from "react";
import homeContent from "@/data/home-content.json";

const { centerImage, centerAlt } = homeContent.aiFeature;

const CenterNode = forwardRef<HTMLDivElement>(function CenterNode(_, ref) {
  return (
    <div ref={ref} className="ai-feature-center-node relative">
      <Image
        src={centerImage}
        alt={centerAlt}
        fill
        className="ai-feature-center-image"
        sizes="(max-width: 768px) 72px, 112px"
        priority
      />
    </div>
  );
});

export default CenterNode;
