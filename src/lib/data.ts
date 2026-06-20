import type { Service, Testimonial, Tool, ProcessStep, SocialLink, Category, Item } from './types';
import portfolioData from '../data/portfolio.json';

// Complete Seed Data matching Prisma schema requirements

// Services loaded from dynamic portfolio.json
export const services: Service[] = portfolioData.services as Service[];


export const testimonials: Testimonial[] = [
  {
    id: 't-1',
    name: 'Sahil Gambhir',
    role: 'Creator',
    company: '5.9M Followers',
    avatar: '/images/sahil_gambhir.webp',
    content: 'Logician Creatives completely transformed my content strategy. Their video editing is top-tier, and the storytelling keeps my audience hooked from the first second to the last.',
    rating: 5
  },
  {
    id: 't-2',
    name: 'Dr Aditi Govitrikar',
    role: 'Creator',
    company: '1.4M Followers',
    avatar: '/images/aditi.webp',
    content: 'Working with Logician Creatives has been incredible. Their team understands exactly how to capture the right vibe and deliver content that truly connects with millions of people.',
    rating: 5
  },
  {
    id: 't-3',
    name: 'Ghar Soaps',
    role: 'Brand',
    company: '1.8M Followers',
    avatar: '/images/ghar_soaps.webp',
    content: 'The promotional content they created for us was a game changer. The aesthetic, the pacing, and the overall production quality directly contributed to massive spikes in our engagement and sales.',
    rating: 5
  },
  {
    id: 't-4',
    name: 'MyPlixLife',
    role: 'Brand',
    company: '1.5M Followers',
    avatar: '/images/plix.webp',
    content: 'They do not just edit videos; they build digital experiences. From high-quality web development to flawless content production, they are an absolute powerhouse for any brand looking to scale.',
    rating: 5
  },
  {
    id: 't-5',
    name: 'Jr.Hardik Pandya',
    role: 'Creator',
    company: '971K Followers',
    avatar: '/images/jr_hardik.webp',
    content: 'Fast, reliable, and incredibly creative. The cinematic edits and smooth transitions they deliver make every piece of content feel premium. Highly recommended!',
    rating: 5
  }
];

export const tools: Tool[] = [
  { id: 'tool-react', name: 'React', icon: '⚛️', category: 'frontend', color: '#61DAFB' },
  { id: 'tool-nextjs', name: 'Next.js', icon: '▲', category: 'frontend', color: '#ffffff' },
  { id: 'tool-typescript', name: 'TypeScript', icon: '📘', category: 'frontend', color: '#3178C6' },
  { id: 'tool-tailwind', name: 'Tailwind CSS', icon: '🎨', category: 'frontend', color: '#38BDF8' },
  { id: 'tool-framer', name: 'Framer Motion', icon: '🎬', category: 'frontend', color: '#BB00FF' },
  { id: 'tool-openai', name: 'OpenAI', icon: '🤖', category: 'ai', color: '#10A37F' },
  { id: 'tool-langchain', name: 'LangChain', icon: '🔗', category: 'ai', color: '#1C3C3C' },
  { id: 'tool-python', name: 'Python', icon: '🐍', category: 'backend', color: '#3776AB' },
  { id: 'tool-nodejs', name: 'Node.js', icon: '💚', category: 'backend', color: '#339933' },
  { id: 'tool-postgresql', name: 'PostgreSQL', icon: '🐘', category: 'database', color: '#4169E1' },
  { id: 'tool-prisma', name: 'Prisma', icon: '◮', category: 'database', color: '#2D3748' },
  { id: 'tool-redis', name: 'Redis', icon: '🔴', category: 'database', color: '#DC382D' },
  { id: 'tool-aws', name: 'AWS', icon: '☁️', category: 'cloud', color: '#FF9900' },
  { id: 'tool-vercel', name: 'Vercel', icon: '▲', category: 'cloud', color: '#ffffff' },
  { id: 'tool-docker', name: 'Docker', icon: '🐳', category: 'cloud', color: '#2496ED' },
  { id: 'tool-figma', name: 'Figma', icon: '🎯', category: 'design', color: '#F24E1E' },
  { id: 'tool-ae', name: 'After Effects', icon: '🎞️', category: 'video', color: '#9999FF' },
  { id: 'tool-davinci', name: 'DaVinci Resolve', icon: '🎬', category: 'video', color: '#E67E22' },
  { id: 'tool-premiere', name: 'Premiere Pro', icon: '🎥', category: 'video', color: '#9999FF' },
  { id: 'tool-blender', name: 'Blender', icon: '🟠', category: 'video', color: '#F5792A' }
];

export const processSteps: ProcessStep[] = [
  {
    id: 'step-1',
    step: 1,
    title: 'Discovery',
    description: 'Deep dive into your vision, goals, market position, and challenges. We learn everything about your business.',
    icon: 'Search'
  },
  {
    id: 'step-2',
    step: 2,
    title: 'Strategy',
    description: 'Craft a tailored roadmap with clear milestones, KPIs, and a timeline designed for maximum impact.',
    icon: 'Map'
  },
  {
    id: 'step-3',
    step: 3,
    title: 'Design',
    description: 'Create stunning visuals and seamless user experiences that align with your brand and convert visitors.',
    icon: 'Palette'
  },
  {
    id: 'step-4',
    step: 4,
    title: 'Develop',
    description: 'Build with cutting-edge technology, clean architecture, and obsessive attention to performance and detail.',
    icon: 'Code2'
  },
  {
    id: 'step-5',
    step: 5,
    title: 'Launch',
    description: 'Deploy, optimize, monitor, and iterate. We celebrate your success and ensure continued growth.',
    icon: 'Rocket'
  }
];

export const socialLinks: SocialLink[] = [
  { id: 'yt', name: 'YouTube', icon: 'Youtube', url: 'https://youtube.com', color: '#FF0000' },
  { id: 'x', name: 'X (Twitter)', icon: 'Twitter', url: 'https://x.com', color: '#ffffff' },
  { id: 'ig', name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com', color: '#E4405F' },
  { id: 'li', name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com', color: '#0A66C2' },
  { id: 'gh', name: 'GitHub', icon: 'Github', url: 'https://github.com', color: '#ffffff' }
];

// Helper functions
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}

export function getAllServices(): Service[] {
  return services;
}

export function getServiceCategories(serviceSlug: string): Category[] {
  const service = getServiceBySlug(serviceSlug);
  return service?.categories || [];
}

export function getItemById(itemId: string): { item: Item; service: Service; category: Category } | undefined {
  for (const service of services) {
    for (const category of service.categories) {
      const item = category.items.find(i => i.id === itemId);
      if (item) {
        return { item, service, category };
      }
    }
  }
  return undefined;
}