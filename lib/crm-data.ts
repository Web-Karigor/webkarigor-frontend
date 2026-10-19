import content from "@/data/crm-content.json";

export const CRM_FEATURES_SECTION = {
  title: "",
  description: "",
};

export const CRM_FEATURES = content.features.items;

export const CRM_REVIEWS_SECTION = {
  title: "",
  description: "",
};

export const CRM_TESTIMONIALS_SUMMARY = content.testimonials.summary;

export const CRM_TESTIMONIAL_AVATARS = content.testimonials.avatars;

export const CRM_TESTIMONIALS = content.testimonials.items.map((item) => ({
  quote: item.quote,
  name: item.name,
  role: item.role,
  avatar: "",
  rating: item.rating,
}));
