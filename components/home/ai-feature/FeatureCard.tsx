import Image from "next/image";
import { forwardRef } from "react";

type FeatureCardProps = {
  title: string;
  imageSrc: string;
  index: number;
};

const FeatureCard = forwardRef<HTMLElement, FeatureCardProps>(
  function FeatureCard({ title, imageSrc }, ref) {
    return (
      <article ref={ref} className="ai-feature-card ai-feature-card--asset">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="ai-feature-card-asset"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px"
          priority={false}
        />
      </article>
    );
  },
);

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
