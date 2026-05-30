// Complete Type Definitions for Logician Creatives

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  categories: Category[];
}

export interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
  items: Item[];
}

export interface Item {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  metadata: ItemMetadata;
}

export interface ItemMetadata {
  type: 'video' | 'web' | 'ai';
  youtubeId?: string;
  aspect?: '16/9' | '9/16';
  url?: string;
  features?: string[];
  platform?: string;
  stack?: string;
  integrations?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface Tool {
  id: string;
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'ai' | 'database' | 'cloud' | 'design' | 'video';
  color: string;
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  service: string;
  message: string;
  budget?: string;
}

export interface ContactSubmission extends ContactFormData {
  id: string;
  createdAt: Date;
}

export interface NavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface SocialLink {
  id: string;
  name: string;
  icon: string;
  url: string;
  color: string;
}
