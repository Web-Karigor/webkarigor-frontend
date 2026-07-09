export const SLIDER_IMAGES = ["/s1.png", "/s2.png", "/s3.png", "/s4.png"] as const;

export const TEAM_IMAGES = ["/sm1.png", "/sm2.jpg", "/sm3.jpg", "/sm4.png"] as const;

export const PORTFOLIO_IMAGES = [...SLIDER_IMAGES, ...TEAM_IMAGES] as const;
