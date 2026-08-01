import {
  Cloud,
  Home,
  Hospital,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import serviceSharedContent from "@/data/service-shared-content.json";
import servicesContent from "@/data/services-content.json";

export const MARQUEE_ITEMS = serviceSharedContent.marquee.items;

export type ClientLogo = {
  name: string;
  src: string;
};

export const CLIENTS_DESCRIPTION = servicesContent.clients.description;

export const CLIENT_LOGOS: ClientLogo[] = servicesContent.clients.logos;

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

export const SERVICE_OFFERINGS: ServiceOffering[] =
  servicesContent.offerings.items.map((item) => ({
    title: item.title,
    description: item.description,
    icon: OFFERING_ICONS[item.icon as keyof typeof OFFERING_ICONS],
    variant: item.variant as "yellow" | "green",
  }));

export const TECH_STACK = servicesContent.techStack;

export const WHY_CHOOSE_FEATURES = servicesContent.whyChooseFeatures;

export const TESTIMONIALS = servicesContent.testimonials.items;

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

export const PRICING_MARKETS: PricingMarket[] =
  servicesContent.pricing.markets.map((market) => ({
    label: market.label,
    theme: market.theme as "yellow" | "green",
    plans: market.plans.map((plan) => ({
      ...plan,
      features: [...servicesContent.pricing.sharedFeatures],
    })),
  }));

export const SERVICE_FAQS = serviceSharedContent.faq.items;
