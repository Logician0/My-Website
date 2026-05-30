import type { Service, Testimonial, Tool, ProcessStep, SocialLink, Category, Item } from './types';

// Complete Seed Data matching Prisma schema requirements

// Services ordered: Video Editing, Web Development, AI Agents
export const services: Service[] = [
  {
    id: 'svc-video-editing',
    slug: 'video-editing',
    title: 'Video Editing',
    description: 'Cinematic storytelling that captivates audiences and drives engagement with Hollywood-quality production.',
    icon: 'Film',
    color: 'pink',
    gradient: 'from-pink-600 via-rose-600 to-red-600',
    categories: [
      {
        id: 'cat-shorts',
        title: 'Shorts & Reels',
        description: 'Viral-ready vertical content optimized for maximum engagement',
        image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
        items: [
          {
            id: '1',
            title: 'Filmmaking Episode 1',
            description: 'Fast-paced, hook-driven product reveals designed to stop thumbs and drive action.',
            thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&auto=format&fit=crop&q=80',
            tags: ['Vertical', 'Fast Paced', 'Hooks'],
            metadata: {
              type: 'video',
              youtubeId: 'Eh1w-Vv2ShA',
              aspect: '9/16'
            }
          },
          {
            id: '2',
            title: 'Filmmaking Episode 2',
            description: 'Authentic, engaging lifestyle content that builds genuine audience connection.',
            thumbnail: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600&auto=format&fit=crop&q=80',
            tags: ['Authentic', 'Storytelling', 'Engaging'],
            metadata: {
              type: 'video',
              youtubeId: 'B3oxUCV6zPg',
              aspect: '9/16'
            }
          },
          {
            id: '3',
            title: 'Filmmaking Episode 3',
            description: 'User-generated style content that converts with authentic appeal.',
            thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80',
            tags: ['UGC', 'Conversion', 'Authentic'],
            metadata: {
              type: 'video',
              youtubeId: 'lN2rqP5-wuc',
              aspect: '9/16'
            }
          }
        ]
      },
      {
        id: 'cat-promo',
        title: 'Promo Videos',
        description: 'High-impact promotional content for products, services, and events',
        image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=80',
        items: [
          {
            id: '1',
            title: 'Zar App Promo',
            description: 'Vertical product promos designed for social media feeds and stories.',
            thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
            tags: ['Vertical', 'App', 'Social'],
            metadata: {
              type: 'video',
              youtubeId: 'hFGV4zHmXxY',
              aspect: '9/16'
            }
          },
          {
            id: '2',
            title: 'Ghar Soap Promo',
            description: 'Widescreen brand campaigns for YouTube and streaming platforms.',
            thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&auto=format&fit=crop&q=80',
            tags: ['Vertical', 'Product', 'Campaign'],
            metadata: {
              type: 'video',
              youtubeId: 'sojAvbUGQew',
              aspect: '9/16'
            }
          },
          {
            id: '3',
            title: 'Plix Tablets Promo',
            description: 'Dynamic event promotions that build anticipation and drive attendance.',
            thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80',
            tags: ['Vertical', 'Product', 'Campaign'],
            metadata: {
              type: 'video',
              youtubeId: '0Ph6MpGKq8I',
              aspect: '9/16'
            }
          },
          {
            id: '4',
            title: 'LightLife Weightloss Product Promo',
            description: 'Vertical app demos perfect for app store listings and social ads.',
            thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&auto=format&fit=crop&q=80',
            tags: ['Vertical', 'Health', 'Product'],
            metadata: {
              type: 'video',
              youtubeId: 'wyz9Ok6gDyA',
              aspect: '9/16'
            }
          }
        ]
      },
      {
        id: 'cat-podcasts',
        title: 'Podcasts',
        description: 'Professional podcast production with engaging visuals and clips',
        image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80',
        items: [
          {
            id: 'item-podcast-full',
            title: 'Full Episode Edit',
            description: 'Complete podcast episode with multi-camera editing and graphics.',
            thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&auto=format&fit=crop&q=80',
            tags: ['Full Episode', 'Multi-cam', 'Graphics'],
            metadata: {
              type: 'video',
              youtubeId: 'MtN1YnoL46Q',
              aspect: '16/9'
            }
          },
          {
            id: 'item-podcast-clip-vertical',
            title: 'Viral Clip (Vertical)',
            description: 'Attention-grabbing vertical clips optimized for TikTok and Reels.',
            thumbnail: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=600&auto=format&fit=crop&q=80',
            tags: ['Clip', 'Vertical', 'Viral'],
            metadata: {
              type: 'video',
              youtubeId: 'jNQXAC9IVRw',
              aspect: '9/16'
            }
          },
          {
            id: 'item-podcast-clip-horizontal',
            title: 'YouTube Short Clip',
            description: 'Horizontal clips perfect for YouTube and Twitter engagement.',
            thumbnail: 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=600&auto=format&fit=crop&q=80',
            tags: ['Clip', 'Horizontal', 'YouTube'],
            metadata: {
              type: 'video',
              youtubeId: 'LXb3EKWsInQ',
              aspect: '16/9'
            }
          },
          {
            id: 'item-podcast-highlights',
            title: 'Episode Highlights',
            description: 'Best moments compilation for audience retention and new viewer acquisition.',
            thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80',
            tags: ['Highlights', 'Compilation', 'Engaging'],
            metadata: {
              type: 'video',
              youtubeId: 'CVpNNMlQ3m8',
              aspect: '16/9'
            }
          }
        ]
      },
      {
        id: 'cat-ai-videos',
        title: 'AI Videos',
        description: 'Next-gen AI-powered video content and animations',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
        items: [
          {
            id: 'item-ai-avatar-vertical',
            title: 'AI Avatar (Vertical)',
            description: 'AI-generated spokesperson videos for social media and ads.',
            thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80',
            tags: ['AI Avatar', 'Vertical', 'Spokesperson'],
            metadata: {
              type: 'video',
              youtubeId: 'ScMzIvxBSi4',
              aspect: '9/16'
            }
          },
          {
            id: 'item-ai-explainer',
            title: 'AI Explainer',
            description: 'Horizontal AI-generated explainer videos with custom visuals.',
            thumbnail: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=600&auto=format&fit=crop&q=80',
            tags: ['AI', 'Explainer', 'Horizontal'],
            metadata: {
              type: 'video',
              youtubeId: 'MtN1YnoL46Q',
              aspect: '16/9'
            }
          },
          {
            id: 'item-ai-animation-vertical',
            title: 'AI Animation (Vertical)',
            description: 'Stunning AI-generated animations in vertical format.',
            thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80',
            tags: ['AI', 'Animation', 'Vertical'],
            metadata: {
              type: 'video',
              youtubeId: 'dQw4w9WgXcQ',
              aspect: '9/16'
            }
          },
          {
            id: 'item-ai-music-video',
            title: 'AI Music Video',
            description: 'AI-generated visuals synced to music for immersive experiences.',
            thumbnail: 'https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=600&auto=format&fit=crop&q=80',
            tags: ['AI', 'Music', 'Horizontal'],
            metadata: {
              type: 'video',
              youtubeId: 'LXb3EKWsInQ',
              aspect: '16/9'
            }
          }
        ]
      },
      {
        id: 'cat-travel-cinematic',
        title: 'Travel & Cinematic',
        description: 'Breathtaking travel content and cinematic storytelling',
        image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=80',
        items: [
          {
            id: 'item-travel-diary',
            title: 'Travel Diary',
            description: '4K color-graded travel content with cinematic transitions and storytelling.',
            thumbnail: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&auto=format&fit=crop&q=80',
            tags: ['4K', 'Color Graded', 'Cinematic'],
            metadata: {
              type: 'video',
              youtubeId: 'MtN1YnoL46Q',
              aspect: '16/9'
            }
          },
          {
            id: 'item-brand-documentary',
            title: 'Brand Documentary',
            description: 'Deep-dive documentaries that tell your brand story with emotional impact.',
            thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&auto=format&fit=crop&q=80',
            tags: ['Documentary', 'Brand Story', 'Emotional'],
            metadata: {
              type: 'video',
              youtubeId: 'LXb3EKWsInQ',
              aspect: '16/9'
            }
          },
          {
            id: 'item-commercial',
            title: 'TV Commercial',
            description: 'Broadcast-ready commercials with premium production value.',
            thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80',
            tags: ['Broadcast', 'Premium', 'Commercial'],
            metadata: {
              type: 'video',
              youtubeId: 'CVpNNMlQ3m8',
              aspect: '16/9'
            }
          },
          {
            id: 'item-destination-reel',
            title: 'Destination Reel',
            description: 'Vertical destination showcases perfect for travel brands.',
            thumbnail: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&auto=format&fit=crop&q=80',
            tags: ['Vertical', 'Destination', 'Travel'],
            metadata: {
              type: 'video',
              youtubeId: 'jNQXAC9IVRw',
              aspect: '9/16'
            }
          },
          {
            id: 'item-adventure-series',
            title: 'Adventure Series',
            description: 'Epic adventure content with drone shots and action sequences.',
            thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80',
            tags: ['Adventure', 'Drone', 'Action'],
            metadata: {
              type: 'video',
              youtubeId: 'ScMzIvxBSi4',
              aspect: '16/9'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'svc-web-dev',
    slug: 'web-dev',
    title: 'Web Development',
    description: 'Blazing-fast, conversion-optimized digital experiences built with cutting-edge technology and obsessive attention to detail.',
    icon: 'Code2',
    color: 'cyan',
    gradient: 'from-cyan-600 via-teal-600 to-emerald-600',
    categories: [
      {
        id: 'cat-corporate',
        title: 'Corporate & Business Websites',
        description: 'Professional, high-performance web solutions for established enterprises and growing businesses.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
        items: [
          {
            id: 'item-corp-1',
            title: 'Shree Ram Properties',
            description: 'A premium real estate platform featuring dynamic property listings and seamless lead capture.',
            thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop&q=80',
            tags: ['Real Estate', 'Next.js', 'Corporate'],
            metadata: {
              type: 'web',
              url: 'https://logiciancreatives.in',
              stack: 'Next.js + Tailwind + Framer Motion',
              features: ['Property Search', 'Lead Generation', 'Admin Dashboard']
            }
          },
          {
            id: 'item-corp-2',
            title: 'Aditya General Store',
            description: 'A modern digital storefront streamlining inventory and customer engagement for local business.',
            thumbnail: 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?w=600&auto=format&fit=crop&q=80',
            tags: ['E-commerce', 'Local Business', 'Retail'],
            metadata: {
              type: 'web',
              url: 'https://logiciancreatives.in',
              stack: 'React + Node.js',
              features: ['Inventory Sync', 'WhatsApp Integration', 'Digital Catalog']
            }
          }
        ]
      },
      {
        id: 'cat-landing-pages',
        title: 'Marketing & Landing Pages',
        description: 'Conversion-focused single-page experiences designed to turn visitors into lifelong customers.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
        items: [
          {
            id: 'item-landing-1',
            title: 'High-Conversion SaaS Landing',
            description: 'Optimized for lead generation with interactive elements and lightning-fast performance.',
            thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&auto=format&fit=crop&q=80',
            tags: ['Marketing', 'Framer Motion', 'Conversion'],
            metadata: {
              type: 'web',
              url: 'https://logiciancreatives.in',
              stack: 'Next.js + Framer Motion',
              features: ['A/B Tested', 'Mobile First', 'Heatmap Ready']
            }
          }
        ]
      },
      {
        id: 'cat-portfolios',
        title: 'Personal Portfolios & V-Cards',
        description: 'Bespoke digital identities for creatives, professionals, and thought leaders.',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
        items: [
          {
            id: 'item-portfolio-1',
            title: 'Creative Director Portfolio',
            description: 'Immersive storytelling through visual design and smooth, interactive motion.',
            thumbnail: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&auto=format&fit=crop&q=80',
            tags: ['Portfolio', 'Creative', 'Motion'],
            metadata: {
              type: 'web',
              url: 'https://logiciancreatives.in',
              stack: 'React + Three.js',
              features: ['Custom Animations', 'Dark Mode', 'Mobile Optimized']
            }
          }
        ]
      }
    ]
  },
  {
    id: 'svc-ai-agents',
    slug: 'ai-agents',
    title: 'AI Agents',
    description: 'Intelligent automation solutions that transform customer interactions and streamline operations with cutting-edge artificial intelligence.',
    icon: 'Bot',
    color: 'violet',
    gradient: 'from-violet-600 via-purple-600 to-indigo-600',
    categories: [
      {
        id: 'cat-chatbots',
        title: 'Chatbots',
        description: '24/7 intelligent conversational agents that never sleep',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
        items: [
          {
            id: 'item-support-bot',
            title: 'Support Bot',
            description: 'Intelligent customer support that resolves 80% of queries automatically with sentiment analysis and context awareness.',
            thumbnail: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&auto=format&fit=crop&q=80',
            tags: ['NLP', '24/7', 'Multi-language'],
            metadata: {
              type: 'ai',
              features: ['Sentiment Analysis', 'CRM Sync', 'Handoff to Human', 'Analytics Dashboard'],
              platform: 'Web & Mobile'
            }
          },
          {
            id: 'item-sales-assistant',
            title: 'Sales Assistant',
            description: 'AI-powered lead qualification and nurturing that works around the clock to grow your pipeline.',
            thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
            tags: ['Lead Gen', 'CRM', 'Qualification'],
            metadata: {
              type: 'ai',
              features: ['Lead Scoring', 'Calendar Integration', 'Follow-up Automation'],
              platform: 'Slack & Web'
            }
          }
        ]
      },
      {
        id: 'cat-automation',
        title: 'Workflow Automation',
        description: 'End-to-end process automation that eliminates manual tasks',
        image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&auto=format&fit=crop&q=80',
        items: [
          {
            id: 'item-doc-processor',
            title: 'Doc Processor',
            description: 'Automated document processing with OCR, data extraction, and intelligent routing.',
            thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
            tags: ['OCR', 'Parsing', 'PDF'],
            metadata: {
              type: 'ai',
              features: ['OCR Recognition', 'Data Extraction', 'Auto-classification', 'API Integration'],
              integrations: ['Zapier', 'Make', 'n8n']
            }
          },
          {
            id: 'item-email-automation',
            title: 'Email Automation',
            description: 'Smart email routing, response generation, and workflow triggers.',
            thumbnail: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=600&auto=format&fit=crop&q=80',
            tags: ['Email', 'GPT', 'Workflows'],
            metadata: {
              type: 'ai',
              features: ['Smart Categorization', 'Auto-response', 'Priority Detection'],
              integrations: ['Gmail', 'Outlook', 'Custom SMTP']
            }
          }
        ]
      },
      {
        id: 'cat-analytics',
        title: 'Analytics & Insights',
        description: 'AI-powered analytics that turn data into actionable intelligence',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
        items: [
          {
            id: 'item-market-pulse',
            title: 'Market Pulse',
            description: 'Real-time trend detection and competitive intelligence powered by advanced NLP.',
            thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80',
            tags: ['Trend Detection', 'NLP', 'Real-time'],
            metadata: {
              type: 'ai',
              features: ['Social Listening', 'Competitor Tracking', 'Trend Forecasting', 'Custom Alerts'],
              platform: 'Dashboard & API'
            }
          }
        ]
      }
    ]
  }
];

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