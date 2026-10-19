import {
  Cloud,
  Home,
  Hospital,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import content from "@/data/services-content.json";

const OFFERING_ICONS = {
  shoppingCart: ShoppingCart,
  cloud: Cloud,
  hospital: Hospital,
  home: Home,
} as const satisfies Record<string, LucideIcon>;

export type ServiceOffering = {
  title: string;
  description: string;
  icon: LucideIcon;
  variant: "yellow" | "green";
};

export const SERVICE_OFFERINGS: ServiceOffering[] = [];

export const TESTIMONIALS: {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
}[] = [];

export type PricingPlan = {
  title: string;
  price: string;
  subtitle: string;
  features: string[];
};

export type PricingMarket = {
  label: string;
  theme: "yellow" | "green";
  plans: PricingPlan[];
};

export const PRICING_MARKETS: PricingMarket[] = content.pricing.markets.map(
  (market) => ({
    label: market.label,
    theme: market.theme === "green" ? "green" : "yellow",
    plans: market.plans.map((plan) => ({
      title: plan.title,
      price: plan.price,
      subtitle: plan.subtitle,
      features: content.pricing.sharedFeatures,
    })),
  }),
);

export { OFFERING_ICONS };
