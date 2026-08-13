import homeContent from "@/data/home-content.json";

export const SLIDER_IMAGES = homeContent.assets.sliderImages;

export const TEAM_IMAGES = homeContent.assets.teamImages;

export const PORTFOLIO_IMAGES = [...SLIDER_IMAGES, ...TEAM_IMAGES];
