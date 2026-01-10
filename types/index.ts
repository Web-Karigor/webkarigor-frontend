// Common types for the application

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}
