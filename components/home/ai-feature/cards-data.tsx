import type { FeatureCardData } from "./types";
import homeContent from "@/data/home-content.json";

const cards = homeContent.aiFeature.cards as FeatureCardData[];

export { cards as featureCards };
