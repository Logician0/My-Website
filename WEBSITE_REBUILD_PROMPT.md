# Portfolio WebsiteRebuild Prompt - Complete Specification

## **PROJECT OVERVIEW**

You are creating **Logician Creatives** - a modern, performance-optimized portfolio website showcasing video editing, web development, and AI agent services. The site is built with React 19 + Vite, styled with Tailwind CSS, and features smooth animations via Framer Motion.

**Key Characteristics:**
- Modern, dark-themed (OLED black #000000)
- Highly animated and interactive
- Video-first portfolio showcase
- Service-based categorization
- Mobile-responsive with desktop enhancements
- SEO-optimized with lazy loading
- Forms integrated with EmailJS and Google Sheets

---

## **PROJECT SETUP**

### **Tech Stack**
```
- Framework: React 19.2.3 + TypeScript
- Build Tool: Vite
- Styling: Tailwind CSS 4.1.17 (with Vite plugin)
- Routing: React Router 7.1.5
- Animation: Framer Motion 12.34.3
- 3D: Three.js, React Three Fiber (optional, not heavily used)
- Forms: EmailJS 4.4.1
- Icons: Lucide React 0.563.0
- Fonts: @fontsource/inter, @fontsource/geist-mono
```

### **Project Structure**
```
portfolio-preview/
├── src/
│   ├── App.tsx                 # Router with lazy-loaded pages
│   ├── main.tsx               # React 19 entry point
│   ├── index.css              # Global styles & animations
│   ├── components/
│   │   ├── Hero.tsx           # Hero section with character image
│   │   ├── Navbar.tsx         # Sticky nav with smart hide
│   │   ├── Footer.tsx         # Responsive footer
│   │   ├── BentoGrid.tsx      # Service visualization
│   │   ├── ServicesRound.tsx  # Interactive service selector
│   │   ├── InteractivePortfolio.tsx
│   │   ├── Testimonials.tsx   # Client testimonials carousel
│   │   ├── Marquee.tsx        # Scrolling tech stack
│   │   ├── Process.tsx        # 5-step workflow
│   │   ├── SocialOrbit.tsx    # Social icons with breathing motion
│   │   ├── FAQ.tsx            # Accordion
│   │   ├── ContactForm.tsx    # EmailJS form
│   │   ├── Newsletter.tsx     # Email subscription (Google Sheets)
│   │   ├── Contact.tsx
│   │   ├── sections/ServicesOrbit.tsx
│   │   └── ui/SpotlightCard.tsx
│   ├── pages/
│   │   ├── HomePage.tsx       # Landing page
│   │   ├── ServicePage.tsx    # Dynamic service detail page
│   │   ├── VideoCategoryPage.tsx
│   │   ├── CareersPage.tsx
│   │   ├── Privacy.tsx
│   │   └── Terms.tsx
│   ├── lib/
│   │   ├── data.ts           # Seed data for all services
│   │   ├── types.ts          # TypeScript interfaces
│   │   └── hierarchy.ts      # Navigation routing
│   └── utils/
│       └── cn.ts             # className merge utility
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/
├── index.html                # Entry HTML with SEO meta tags
├── vite.config.ts            # Vite configuration
├── tsconfig.json
├── package.json
└── vercel.json              # Vercel deployment config
```

---

## **KEY PAGES DETAILED SPECS**

### **1. HomePage.tsx**
A vertical stack of 9 major sections:

1. **Hero Component** - Full viewport hero
   - Background: Gradient from light gray (#90a0b2) → darker gray (#4a5868) → black (#030303)
   - Character image: `/suraj-cutout.png` (custom PNG with transparent background)
   - Desktop: Large "SURAJ" title with side "LOGICIAN CREATIVES" labels
   - Mobile: "LOGICIAN CREATIVES" stacked headline
   - CTAs: "View Work" button + "Contact" button with icons
   - Bottom: Animated fade strip + animated chevron "scroll to explore"
   - Smooth scroll links to #portfolio and #contact sections

2. **ServicesRound Component** - Interactive service showcase (Video, Web, AI)
   - Tabbed interface (Video Editing / Web Development)
   - Bento grid for video items (desktop) / mobile grid
   - YouTube modal for video playback
   - Web project cards with tech badges

3. **Marquee Component** - 2-row scrolling tech stack
   - Tools: React, Next.js, TypeScript, Tailwind, Framer Motion, Node.js, Python, OpenAI, etc.
   - Horizontal infinite scroll animation
   - Side fade gradients
   - Expertise metrics: Frontend 8+, AI/ML 5+, Video 6+, Cloud 4+

4. **Process Component** - 5-step workflow
   - SVG-based process loop with 5 circular steps
   - Animated light particle flowing through the path
   - Cards: Discovery → Strategy → Design → Develop → Launch
   - Active step highlighting

5. **SocialOrbit Component** - Social media with breathing animation
   - 5 social platforms: YouTube, Twitter/X, Instagram, LinkedIn, GitHub
   - Central toggle button to expand/collapse
   - Orbital positioning with breathing scale animation
   - Hover effects with smooth transitions

6. **Testimonials Component** - Client testimonial carousel
   - Auto-advance every 6 seconds
   - Manual navigation arrows
   - 5+ testimonials with avatar, name, role, company, quote, 5-star rating
   - Direction-aware smooth transitions

7. **FAQ Component** - Collapsible accordion
   - 4 pre-written Q&A items
   - Smooth expand/collapse animation
   - Single-item expansion behavior
   - Link to contact form for more questions

8. **ContactForm Component** - Email form
   - Fields: Name, Email, Message
   - EmailJS backend integration
   - Success/error messaging
   - Loading state spinner

9. **Newsletter Component** - Email subscription
   - Single email input
   - Google Sheets backend integration
   - Success state with checkmark
   - 4-second success display before reset

**Footer Component** at bottom with responsive layout

---

### **2. ServicePage.tsx**
Dynamic page for each service (video-editing, web-dev, ai-agents):

**URL:** `/services/:slug`

**Features:**
- Dynamic color theming per service (pink, cyan, violet)
- Service title, icon, and description
- Categories grid showing available sub-categories
- Item modal with:
  - Thumbnail + YouTube embed support
  - Title, description, tags
  - Link to external project (if available)
  - Close button (ESC key support)
- Responsive grid layout
- Service icons: Film (video), Code (web), Bot (AI)

---

### **3. VideoCategoryPage.tsx**
Deep-dive video category page:

**URL:** `/services/video-editing/:categoryId`

**Features:**
- Main video player (center/left) supporting 16:9 and 9:16 aspect ratios
- Thumbnail grid on right/bottom
- Auto-scroll to top when video selected
- "Playing" state indicator on thumbnails
- Video info below player (title, description)
- Links to related videos

---

### **4. Other Pages**

**CareersPage.tsx:**
- Empty state "No current openings"
- Link back to home
- Set up for future job listings

**Privacy.tsx:**
- 8-section grid with icons
- Covers: Data collection, asset handling, AI processing, usage, sharing, security, retention, cookies
- Purple/blue gradient ambience
- Background grain texture

**Terms.tsx:**
- 4 main sections: Acceptance, IP/Ownership, Prohibited conduct, Liability
- Pink/purple gradient background
- Professional legal language

---

## **DETAILED COMPONENTS SPECIFICATION**

### **Hero.tsx**
```
- Full viewport height (min-h-[100svh])
- Gradient background: from-[#90a0b2] via-[#4a5868] to-[#030303]
- Layout:
  * Desktop: Character image on left (50%), Text/CTAs on right (50%)
  * Mobile: Image on top, text/CTAs below
- Character image: Scale transform (1 to 1.15) on viewport intersection
- Headline text color: Gradient white/gray
- Animated fade strip at bottom (opacity 0 → 1)
- Floating chevron animation at bottom
- Two buttons: "View Work" → scroll to #portfolio, "Contact" → scroll to #contact
- Responsive padding and sizing
```

### **Navbar.tsx**
```
- Position: Fixed, sticky top
- Features:
  * Smart visibility: Shows on scroll, hides 1s after scroll stops
  * Hover prevents auto-hide
  * Semi-transparent background with backdrop blur
- Homepage (route /):
  * Hash-based navigation to sections (#portfolio, #process, #about, #contact)
  * Active highlighting based on scroll position
  * Smooth scroll behavior
- Service pages (route /services/:slug):
  * Convert to route-based links (Home, Services, Pricing, About, Contact)
  * Back button logic
  * Active route highlighting
- Navigation items: Icon + text, with hover effects
- Mobile: Compact hamburger menu or icon-only layout
```

### **Footer.tsx**
```
Two layouts:

Mobile (< 768px):
- Brand + social in top row
- 2-column grid: Services | Company
- 1-column: Legal links (Privacy, Terms, Copyright)
- Compact spacing

Desktop (≥ 768px):
- 4-column layout:
  * Column 1: Brand description + tagline
  * Column 2: Services (Video Editing, Web Dev, AI Agents)
  * Column 3: Company (Home, Careers, Pricing, Contact)
  * Column 4: Connect (Social links + "Let's work together" CTA)
- All links to appropriate routes or external URLs
- Social icons: YouTube, Twitter/X, Instagram, LinkedIn, GitHub
- Footer divider line above footer
```

### **BentoGrid.tsx**
```
Desktop-only (hidden on mobile < 1024px)
- SVG connection lines between service hubs
- Animated light particles flowing through connections
- 3 service cards in triangular arrangement:
  * Each has: Icon, title, description, color gradient, link
  * Services: Video Editing (pink), Web Development (cyan), AI Agents (violet)
- Responsive SVG scaling
- Filter glow effects on light elements
```

### **ServicesRound.tsx**
```
Interactive service showcase with:

1. Tabbed interface: "Video Editing" | "Web Development"

2. Video Tab:
   - Desktop: Bento grid (6 cols × 4 rows, 10 items)
   - Mobile: Bento grid (4 cols × 5 rows, 10 items)
   - Organic border radius per cell
   - Hover: Scale 1.008 + translateY -3px
   - Click → YouTube modal opens
   
3. Web Tab:
   - Desktop: Bento grid (4 cols × 3 rows, 6 items)
   - Mobile: Bento grid (2 cols × 3 rows, 6 items)
   - Cards show image + title + tech stack tags
   
4. YouTube Modal:
   - Fixed overlay (100% viewport)
   - Black bg with blur backdrop
   - Centered iframe (1000px × 700px max)
   - Close button (top-right X)
   - Video title/category at bottom
   - ESC key to close
   - Click backdrop to close

5. Video Data (10 YouTube videos):
   - Each has: id, title, category, youtubeId, aspect ratio (16/9 or 9/16), grid area
   - YouTube embed URL: https://www.youtube.com/embed/{id}?autoplay=1&rel=0&modestbranding=1
   - Placeholder thumbnails from YouTube Image API
```

### **Testimonials.tsx**
```
- Auto-advancing carousel (6-second intervals)
- 5+ testimonial cards:
  * Avatar (32px circle image)
  * Name, role, company
  * Quote text
  * 5-star rating (yellow stars)
- Manual navigation: Previous/Next arrows
- Direction-aware transitions (left-to-right or right-to-left)
- Pause on hover
- Smooth Framer Motion animations
- Quote icon decoration
```

### **Marquee.tsx**
```
- 2 horizontal scrolling rows
- Each row: 20 tools with emoji icon + name
- Tools: React, Next.js, TypeScript, Tailwind, Framer Motion, Node.js, Python, 
          OpenAI, TensorFlow, PostgreSQL, MongoDB, DevOps, Docker, AWS, Stripe, etc.
- Scroll directions: Row 1 left-to-right, Row 2 right-to-left
- Infinite smooth animation (35s cycle)
- Side fade gradients (black on edges)
- Below marquee: Expertise metrics grid
  * 4 columns: Frontend 8+ years, AI/ML 5+ years, Video 6+ years, Cloud 4+ years
```

### **Process.tsx**
```
- SVG-based process visualization
- 5 circular steps arranged in loop pattern
- Animated light beam particle flowing through the path
- Active step: Filled/highlighted
- Process steps: Discovery, Strategy, Design, Develop, Launch
- Each step has icon from lucide-react
- Below SVG: 5 detail cards for each step
- Responsive scaling of SVG
```

### **SocialOrbit.tsx**
```
- Central toggle button ("See more" → expand)
- 5 social icons arranged in orbit:
  * YouTube, Twitter/X, Instagram, LinkedIn, GitHub
- Breathing animation: Scale 0.8 → 1.0 → 0.8 (8s cycle)
- Orbital positioning: Responsive radius (100-150px)
- Icons clickable, open to external URLs
- Hover: Scale up slightly
- Mobile: Simplified grid, no orbit
```

### **FAQ.tsx**
```
- 4 Q&A items in accordion style
- Default: Collapsed
- Click to expand/collapse single item
- Smooth height transition animation
- Styling:
  * Question: Bold, white text
  * Answer: Regular, lighter gray text
  * Divider line between Q and A
  * Cyan highlight on active item
  * Plus icon rotates to X when expanded
- Section header: "Frequently Asked Questions"
- Footer link: "More questions? Contact me →"
```

### **ContactForm.tsx**
```
- 3 input fields:
  1. Name (text) - with icon
  2. Email (email) - with icon
  3. Message (textarea) - with icon
- Submit button: Gradient pink/violet
- Loading state: Spinner during EmailJS call
- Validation: Basic email/required field checks
- Success message: "Message sent! I will get back to you soon."
- Error message: "Failed to send message. Try again."
- Form resets on success
- Input focus effects (color-coded)
- EmailJS config:
  * Service ID: service_s7yikyc
  * Template ID: template_nfvwwoo
  * Public Key: GQ4FbqViDpRQZkMu1
```

### **Newsletter.tsx**
```
- Email input field (placeholder: "your@email.com")
- Subscribe button
- Features:
  * Loading state: Spinner during submission
  * Success state: Checkmark + "Subscribed!" message (4s display)
  * Validation: Email format check
  * Submission: POST to Google Apps Script
  * URL: https://script.google.com/macros/s/AKfycbyTeaVRbmbLLXNg8yRzb-ayEN8Ex6hX9DSIbWSmJUHIRZbba6Rl1CJ3NtcDhuxBTzI/exec
  * Saves to Google Sheet: "Logician Creatives Newsletter"
- Responsive: Stacked on mobile, inline on desktop
```

### **SpotlightCard.tsx** (UI Component)
```
- Mouse-tracking spotlight effect
- Features:
  * Radial gradient spotlight follows cursor
  * Border glow on hover
  * Smooth transitions
  * Customizable spotlight color
  * Optional glow variant
- Used within component internals for special card effects
```

---

## **DATA STRUCTURE (lib/data.ts, lib/types.ts)**

### **TypeScript Interfaces** (lib/types.ts)

```typescript
type Service = {
  id: string
  slug: string
  title: string
  description: string
  icon: string ("Film" | "Code2" | "Bot")
  color: "pink" | "cyan" | "violet"
  gradient: string
  categories: Category[]
}

type Category = {
  id: string
  title: string
  description: string
  image: string
  items: Item[]
}

type Item = {
  id: string
  title: string
  description: string
  thumbnail: string
  tags: string[]
  metadata: ItemMetadata
}

type ItemMetadata = {
  type: "video" | "web" | "ai"
  youtubeId?: string
  aspect?: "16/9" | "9/16"
  url?: string
  features?: string[]
  videoUrl?: string
  tech?: string[]
}

type Testimonial = {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  content: string
  rating: number (1-5)
}

type Tool = {
  id: string
  name: string
  icon: string
  category: string
  color: string
}

type ProcessStep = {
  id: string
  step: number
  title: string
  description: string
  icon: React.ComponentType
}
```

### **Seed Data** (lib/data.ts)

**3 Main Services:**

1. **Video Editing** (pink gradient)
   - 5 categories:
     * Shorts & Reels (4 videos)
     * Promo Videos (4 videos)
     * Podcasts (3 videos)
     * AI Videos (4 videos)
     * Travel & Cinematic (5 videos)
   - Total: 20 video items
   - Each video: title, description, YouTube ID, aspect ratio

2. **Web Development** (cyan gradient)
   - 3 categories:
     * Corporate (2 projects)
     * Landing Pages (2 projects)
     * Portfolios (2 projects)
   - Total: 6 web items
   - Each project: title, description, tech stack, image URL, project link

3. **AI Agents** (violet gradient)
   - 3 categories:
     * Chatbots (3 solutions)
     * Workflow Automation (3 solutions)
     * Analytics & Insights (3 solutions)
   - Total: 9 AI items
   - Each solution: title, description, features

**Other Data:**
- 20 tools/technologies with emojis and categories
- 5 testimonials with avatars and 5-star ratings
- 5 process steps with icons
- 5 social media links

---

## **STYLING & ANIMATIONS (index.css)**

### **Color System**
- OLED-optimized dark mode (#000000)
- Primary gradient colors: Violet, Pink, Cyan
- Text hierarchy: White (primary) → Secondary (65% opacity) → Muted (45% opacity)

### **Keyframe Animations**
1. **aurora** (20s) - Ambient background gradient shift
2. **breathe** (10s) - Pulsing glow effect
3. **marquee/marquee-reverse** (35s) - Horizontal infinite scroll
4. **photon-glow** (2s) - Cyan light beam effect
5. **portfolio-shimmer** (1.8s) - Loading skeleton animation
6. **pulse-soft** (3s) - Gentle opacity pulse
7. **float** (5s) - Vertical floating elevation
8. **modalDrop** (0.4s, cubic-bezier) - Modal entrance animation

### **Responsive Classes**
- `.bento-video-grid` - 6 cols (desktop)
- `.bento-video-mobile` - 4 cols (mobile)
- `.bento-web-grid` - 4 cols (desktop)
- `.bento-web-mobile` - 2 cols (mobile)
- `.bento-cell` - Base cell styles with hover transforms
- Organic border-radius utilities: `.bento-shape-v1` through `.bento-shape-w6`

### **Key Transition Speeds**
- Component entrance: 0.6s
- Hover effects: 0.3-0.5s
- Smooth scroll: 0.4s
- Framer Motion standard: ease: [0.16, 1, 0.3, 1]

---

## **ROUTING & NAVIGATION (lib/hierarchy.ts, App.tsx)**

### **Routes**
```
/                           → HomePage
/services/:slug             → ServicePage (slug: video-editing, web-dev, ai-agents)
/services/video-editing/:categoryId → VideoCategoryPage
/careers                    → CareersPage
/privacy                    → Privacy
/terms                      → TermsPage
```

### **Navigation Helpers**
- Hash-based scroll on HomePage (#portfolio, #process, #about, #contact)
- Active section detection via scroll position
- Breadcrumb navigation via hierarchy.ts parent mapping
- Dynamic icon resolution per service

---

## **PERFORMANCE OPTIMIZATIONS**

1. **Code Splitting:** Pages lazy-loaded via React.lazy()
2. **Image Optimization:** Responsive sizing, lazy loading
3. **CSS Splitting:** Tailwind Vite plugin for critical CSS extraction
4. **Vendor Bundling:** React, Framer, Icons in separate chunks
5. **SVG Optimization:** Inline SVGs with will-change hints
6. **Content Visibility:** `content-visibility: auto` for sections
7. **Scroll Performance:** Debounced resize/scroll listeners

---

## **SEO & META TAGS**

**index.html:**
- Title: "Logician Creatives | AI • Video • Web Excellence"
- Meta Description: "Transform views into growth with AI-powered experiences, cinematic content, and world-class web platforms."
- Theme Color: #000000
- Viewport: width=device-width, initial-scale=1.0

**Pages:**
- Dynamic titles and descriptions per page/service
- Open Graph tags for social sharing
- robots.txt and sitemap.xml in public/

---

## **BUILD & DEPLOYMENT**

**Vite Config:**
- React plugin with JSX support
- Tailwind CSS Vite plugin
- Path alias: `@` → `src/`
- Build target: ES2020
- Manual chunking strategy for vendors
- CSS code splitting enabled

**Vercel Deployment:**
- vercel.json configuration file included
- Build command: `vite build`
- Output directory: `dist/`
- Environment variables for EmailJS and Google Sheets

---

## **FORM INTEGRATIONS**

### **EmailJS Contact Form**
- Endpoint: EmailJS API
- Service ID: service_s7yikyc
- Template ID: template_nfvwwoo
- Public Key: GQ4FbqViDpRQZkMu1
- Template variables: user_name, user_email, message
- Response: Success/error toast

### **Google Sheets Newsletter**
- Endpoint: Google Apps Script
- URL: https://script.google.com/macros/s/AKfycbyTeaVRbmbLLXNg8yRzb-ayEN8Ex6hX9DSIbWSmJUHIRZbba6Rl1CJ3NtcDhuxBTzI/exec
- Method: POST (no-cors)
- Payload: { email: string }
- Response: JSON { success: boolean }

---

## **ADDITIONAL NOTES**

1. **Character Image:** Supply `/suraj-cutout.png` (transparent PNG) for Hero section
2. **Social Links:** Update with actual profile URLs in data.ts
3. **YouTube IDs:** Replace with real videos or use placeholders for demo
4. **Testimonial Avatars:** Use external image URLs or local assets
5. **Future Enhancements:**
   - Case study blog section
   - Client testimonial form submission
   - Advanced video editing portfolio with before/after sliders
   - Interactive 3D project showcases (Three.js integration available)
   - Pricing calculator for services
   - Booking/consultation calendar integration

---

## **SUMMARY**

This is a comprehensive, production-ready portfolio website with:
- ✅ 6 main pages + 3 dynamic service pages
- ✅ 13+ reusable components
- ✅ 30+ smooth animations
- ✅ 2 form integrations
- ✅ Video portfolio showcase with YouTube modals
- ✅ Responsive mobile-to-desktop design
- ✅ Dark mode OLED-optimized styling
- ✅ Performance optimizations for fast load times
- ✅ Full TypeScript support
- ✅ SEO-ready structure

Use this prompt as your complete specification to rebuild the website from scratch!

"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

/* ═══ TYPES ═══ */
type Ratio = "16/9" | "9/16";

interface VideoProject {
  id: string;
  title: string;
  category: string;
  youtubeId: string;
  ratio: Ratio;
  grid: string;
  w?: string;
  h?: string;
  /* NEW: Controls whether the video renders on PC, Phone, or Both */
  showOn?: "desktop" | "mobile" | "all";
}

interface WebProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
  grid: string;
}

/* ═══ YOUTUBE URLS ═══ */
const gridYtEmbed = (id: string) => `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${id}&modestbranding=1&rel=0`;
const modalYtEmbed = (id: string) => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1`;
const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

/* ═══ DATA ═══ */
const trustedClients = [
  { name: "Dr Aditi Govitrikar", followers: "1.4M", image: "public/images/aditi.webp" },
  { name: "Waryam Singh", followers: "53K", image: "public/images/waryam_singh.webp" },
  { name: "MyPlixLife", followers: "1.5M", image: "public/images/plix.webp" },
  { name: "Sahil Gambhir", followers: "5.9M", image: "public/images/sahil_gambhir.webp" },
  { name: "LightLife by Dr Morepen", followers: "38.5K", image: "public/images/lightlife.webp" },
  { name: "Ghar Soaps", followers: "1.8M", image: "public/images/ghar_soaps.webp" },
  { name: "Jr.Hardik Pandya", followers: "971K", image: "public/images/jr_hardik.webp" },
  { name: "Tiya Gambhir", followers: "315k", image: "public/images/tiya_gambhir.webp" },
  { name: "The Real Estate Lawyer", followers: "94k", image: "public/images/relawyer.jpg" },
  { name: "Palak Bharti", followers: "165k", image: "public/images/palak_bharti.jpg" },
  { name: "Pete Z", followers: "296k", image: "public/images/pete_z.jpg" },
];

/* NEW: 14 Videos! Two for each spot (Desktop vs Mobile) with unique IDs, URLs, and dimensions */
const videoProjects: VideoProject[] = [
  // v1 (Horizontal Top Left)
  { id: "v1-desk", showOn: "desktop", title: "Desert Bloom", category: "Color Grade", youtubeId: "B3oxUCV6zPg", ratio: "16/9", grid: "v1", w: "150%", h: "150%" },
  { id: "v1-mob", showOn: "mobile", title: "Desert Bloom", category: "Color Grade", youtubeId: "pn7-ZM81hQM", ratio: "16/9", grid: "v1", w: "120%", h: "120%" },

  // v2 (Horizontal Top Right)
  { id: "v2-desk", showOn: "desktop", title: "Fashion Clip", category: "Reels", youtubeId: "83WR-gPqV-k", ratio: "16/9", grid: "v2", w: "140%", h: "140%" },
  { id: "v2-mob", showOn: "mobile", title: "Fashion Clip", category: "Reels", youtubeId: "9ao4FEaDGhQ", ratio: "16/9", grid: "v2", w: "150%", h: "150%" },

  // v3 (Vertical Mid 1)
  { id: "v3-desk", showOn: "desktop", title: "Motion ID", category: "CGI", youtubeId: "0Ph6MpGKq8I", ratio: "9/16", grid: "v3", w: "110%", h: "110%" },
  { id: "v3-mob", showOn: "mobile", title: "Motion ID", category: "CGI", youtubeId: "TmNR8txRmYc", ratio: "9/16", grid: "v3", w: "300%", h: "300%" },

  // v4 (Vertical Mid 2)
  { id: "v4-desk", showOn: "desktop", title: "Neon City", category: "3D Art", youtubeId: "ODFJFJIEuZg", ratio: "9/16", grid: "v4", w: "110%", h: "110%" },
  { id: "v4-mob", showOn: "mobile", title: "Neon City", category: "3D Art", youtubeId: "HZsiToZ8zCI", ratio: "9/16", grid: "v4", w: "250%", h: "250%" },

  // v5 (Vertical Mid 3)
  { id: "v5-desk", showOn: "desktop", title: "Tech Short", category: "Social", youtubeId: "-v31vBqMixw", ratio: "9/16", grid: "v5", w: "213%", h: "213%" },
  { id: "v5-mob", showOn: "mobile", title: "Tech Short", category: "Social", youtubeId: "B3oxUCV6zPg", ratio: "9/16", grid: "v5", w: "200%", h: "200%" },

  // v6 (Horizontal Bot 1)
  { id: "v6-desk", showOn: "desktop", title: "Fitness Promo", category: "Ad", youtubeId: "MxKeZvMf2TM", ratio: "16/9", grid: "v6", w: "140%", h: "140%" },
  { id: "v6-mob", showOn: "mobile", title: "Fitness Promo", category: "Ad", youtubeId: "DxsDekHDKXo", ratio: "16/9", grid: "v6", w: "130%", h: "130%" },

  // v7 (Horizontal Bot 2)
  { id: "v7-desk", showOn: "desktop", title: "Brand Promo", category: "Campaign", youtubeId: "lsqQnlXeZ6Q", ratio: "16/9", grid: "v7", w: "212%", h: "212%" },
  { id: "v7-mob", showOn: "mobile", title: "Brand Promo", category: "Campaign", youtubeId: "wyz9Ok6gDyA", ratio: "16/9", grid: "v7", w: "100%", h: "100%" },
];

const webProjects: WebProject[] = [
  { id: "w1", title: "Fintech Dashboard", description: "Real-time analytics", tech: ["Next.js", "TS"], link: "https://example.com", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070", grid: "w1" },
  { id: "w2", title: "Creative Portfolio", description: "Designer portfolio", tech: ["Three.js", "GSAP"], link: "https://example.com", image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1964", grid: "w2" },
  { id: "w3", title: "SaaS Landing", description: "B2B landing page", tech: ["React", "Framer"], link: "https://example.com", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015", grid: "w3" },
  { id: "w4", title: "E-Commerce", description: "Shopping with AI", tech: ["Shopify", "TW"], link: "https://example.com", image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2070", grid: "w4" },
  { id: "w5", title: "Real Estate", description: "Virtual tours", tech: ["Vue.js", "Mapbox"], link: "https://example.com", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070", grid: "w5" },
  { id: "w6", title: "Healthcare App", description: "HIPAA compliant", tech: ["React", "Node"], link: "https://example.com", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1470", grid: "w6" },
  { id: "w7", title: "Crypto Exchange", description: "Live trading data", tech: ["React", "D3"], link: "https://example.com", image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=2000", grid: "w7" },
];

/* ═══ ANIMATION CONFIG ═══ */
const appleSpring: Transition = { type: "spring", bounce: 0, duration: 0.45 };

/* ═══ BENTO VIDEO CARD ═══ */
function BentoVideoCard({ video, index, onPlay }: { video: VideoProject; index: number; onPlay: (v: VideoProject) => void }) {
  const [loaded, setLoaded] = useState(false);

  // Magic visibility logic based on the array setup
  const visibilityClass =
    video.showOn === "desktop" ? "max-md:!hidden" :
      video.showOn === "mobile" ? "md:!hidden" : "";

  return (
    <motion.div
      layoutId={`video-wrapper-${video.id}`}
      onClick={() => onPlay(video)}
      initial={{ opacity: 0, scale: 0.88, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ layout: { type: "spring", bounce: 0, duration: 0.45 }, duration: 0.7, delay: 0.08 * index, ease: [0.16, 1, 0.3, 1] }}
      className={`bento-cell bento-shape-${video.grid} force-mobile-card group relative cursor-pointer overflow-hidden bg-[#0a0a0c] !transition-none ${visibilityClass}`}
      style={{ gridArea: video.grid }}
    >
      <div className={`absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <iframe
          src={gridYtEmbed(video.youtubeId)}
          onLoad={() => setLoaded(true)}
          style={{ width: video.w || "100%", height: video.h || "100%" }}
          className="absolute max-w-none transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          allow="autoplay; muted; playsinline"
          title="Video Background"
        />
      </div>
      {!loaded && <div className="absolute inset-0 portfolio-shimmer" />}

      <motion.div className="absolute inset-0 pointer-events-none p-3 md:p-6 flex flex-col justify-end items-center text-center z-[5] opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-[1]" />
        <div className="relative z-[4] w-full mt-auto">
          <p className="text-white text-[11px] md:text-[14px] font-bold leading-tight tracking-tight drop-shadow-md">
            {video.title}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══ BENTO WEB CARD ═══ */
function BentoWebCard({ project, index }: { project: WebProject; index: number }) {
  return (
    <motion.a
      href={project.link} target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.88, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: 0.08 * index, ease: [0.16, 1, 0.3, 1] }}
      className={`bento-cell bento-shape-${project.grid} force-mobile-card group relative cursor-pointer overflow-hidden !transition-none`}
      style={{ gridArea: project.grid }}
    >
      <img src={project.image} alt={project.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />

      <div className="absolute inset-0 pointer-events-none p-4 md:p-6 flex flex-col justify-end items-center text-center z-[5]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-[1]" />
        <span className="relative z-[5] px-2.5 py-1 mb-2 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.12em] text-white/90 bg-black/40 backdrop-blur-md rounded-full border border-white/[0.08] md:hidden">
          {project.tech[0]}
        </span>
        <p className="relative z-[4] text-white text-[12px] md:text-[14px] font-bold leading-tight drop-shadow-md">{project.title}</p>
      </div>
    </motion.a>
  );
}

/* ═══ MAIN ═══ */
export function ServicesRound() {
  const [tab, setTab] = useState<"video" | "web">("video");
  const [activeVideo, setActiveVideo] = useState<VideoProject | null>(null);
  const [showIframe, setShowIframe] = useState(false);

  const openVideo = useCallback((v: VideoProject) => {
    setActiveVideo(v);
    setTimeout(() => setShowIframe(true), 400);
  }, []);

  const closeVideo = useCallback(() => {
    setShowIframe(false);
    setTimeout(() => setActiveVideo(null), 10);
  }, []);

  return (
    <section id="portfolio" className="relative w-full bg-[#030305] overflow-hidden font-sans" style={{ padding: "clamp(50px,8vw,120px) 0" }}>

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (min-width: 769px) {
          .bento-video-grid, .bento-web-grid {
            display: grid !important;
            grid-template-columns: repeat(6, 1fr) !important;
            grid-template-rows: 150px 150px 150px !important;
            gap: 16px !important;
            grid-template-areas:
              "v1 v1 v2 v2 v3 v4"
              "v1 v1 v6 v6 v3 v4"
              "v7 v7 v7 v5 v5 v5" !important;
          }
          .bento-shape-w1 { grid-area: v1 !important; }
          .bento-shape-w2 { grid-area: v2 !important; }
          .bento-shape-w3 { grid-area: v3 !important; }
          .bento-shape-w4 { grid-area: v4 !important; }
          .bento-shape-w5 { grid-area: v5 !important; }
          .bento-shape-w6 { grid-area: v6 !important; }
          .bento-shape-w7 { grid-area: v7 !important; }
        }

        @media (max-width: 768px) {
          .bento-video-grid.force-mobile-grid {
            display: grid !important;
            grid-template-columns: repeat(6, 1fr) !important; 
            grid-auto-rows: auto !important;
            grid-template-areas: none !important;
            gap: 10px !important;
          }
          .bento-web-grid.force-mobile-grid {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important; 
            grid-template-rows: none !important; 
            grid-auto-rows: max-content !important;
            align-content: start !important; 
            grid-template-areas: none !important;
            gap: 6px !important;
          }
          .bento-shape-v1, .bento-shape-v2 { grid-column: span 3 !important; aspect-ratio: 16/9 !important; border-radius: 16px !important; }
          .bento-shape-v3, .bento-shape-v4, .bento-shape-v5 { grid-column: span 2 !important; aspect-ratio: 9/16 !important; border-radius: 12px !important; transform: translateY(-48px) !important; }
          .bento-shape-v6, .bento-shape-v7 { grid-column: span 3 !important; aspect-ratio: 16/9 !important; border-radius: 16px !important; }
          .bento-shape-w1, .bento-shape-w2, .bento-shape-w3, .bento-shape-w4, .bento-shape-w5, .bento-shape-w6, .bento-shape-w7 { grid-column: span 1 !important; aspect-ratio: 1/1 !important; border-radius: 12px !important; }
          .force-mobile-card { grid-area: auto !important; width: 100% !important; height: auto !important; }
        }
      `}} />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-cyan-500/[0.02] blur-[200px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-500/[0.015] blur-[200px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="w-full overflow-hidden mb-12 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max marquee gap-4 md:gap-6">
            {[...trustedClients, ...trustedClients, ...trustedClients, ...trustedClients].map((client, idx) => (
              <div key={idx} className="flex items-center gap-3 md:gap-4 bg-white/[0.02] border border-white/[0.04] rounded-full pr-5 pl-2 py-2">
                <img src={client.image} alt={client.name} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-white/[0.1]" />
                <div className="flex flex-col">
                  <span className="text-white text-[10px] md:text-xs font-bold leading-tight">{client.name}</span>
                  <span className="text-white/40 text-[9px] md:text-[10px] font-medium leading-tight">{client.followers} followers</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8 md:mb-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-5">
            <h2 className="text-[clamp(28px,5vw,52px)] font-black text-white leading-[1.05] tracking-tight text-center md:text-left whitespace-nowrap">
              Some <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/60 via-white/40 to-white/20">Works</span>
            </h2>

            <div className="relative flex items-center p-1 bg-white/[0.03] border border-white/[0.06] rounded-xl flex-shrink-0 w-full md:w-auto">
              <motion.div className="absolute top-1 bottom-1 rounded-[10px] bg-white/[0.07] border border-white/[0.1]"
                animate={{ left: tab === "video" ? "4px" : "50%", width: "calc(50% - 4px)" }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
              <button onClick={() => setTab("video")} className={`relative z-10 flex-1 md:flex-none px-2 md:px-7 py-3 md:py-2.5 text-[10px] sm:text-[11px] md:text-xs font-bold uppercase tracking-[0.05em] md:tracking-[0.1em] transition-colors duration-300 ${tab === "video" ? "text-white" : "text-white/30"}`}>
                Video Editing
              </button>
              <button onClick={() => setTab("web")} className={`relative z-10 flex-1 md:flex-none px-2 md:px-7 py-3 md:py-2.5 text-[10px] sm:text-[11px] md:text-xs font-bold uppercase tracking-[0.05em] md:tracking-[0.1em] transition-colors duration-300 ${tab === "web" ? "text-white" : "text-white/30"}`}>
                Web Dev
              </button>
            </div>
          </div>
        </div>

        {tab === "video" ? (
          <div className="grid bento-video-grid force-mobile-grid relative">
            {videoProjects.map((v, i) => <BentoVideoCard key={v.id} video={v} index={i} onPlay={openVideo} />)}
          </div>
        ) : (
          <div className="grid bento-web-grid force-mobile-grid relative">
            {webProjects.map((w, i) => <BentoWebCard key={w.id} project={w} index={i} />)}
          </div>
        )}

        <div className="mt-10 md:mt-16 flex justify-center">
          <a
            href={tab === "video" ? "/video-library" : "/web-library"}
            className="group relative flex items-center gap-3 px-8 py-3.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.2] rounded-full transition-all duration-300"
          >
            <span className="text-white text-[11px] md:text-xs font-bold uppercase tracking-[0.1em]">View Library</span>
            <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </a>
        </div>

      </div>

      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={closeVideo}
              className="absolute inset-0 bg-black/90 md:bg-black/80 md:backdrop-blur-xl cursor-pointer pointer-events-auto"
            />

            <motion.div
              layoutId={`video-wrapper-${activeVideo.id}`}
              transition={appleSpring}
              className={`relative z-10 w-full bg-black overflow-hidden shadow-2xl rounded-2xl md:rounded-[32px] ring-1 ring-white/10 !transition-none pointer-events-auto ${activeVideo.ratio === '16/9' ? 'aspect-video max-w-[1100px]' : 'aspect-[9/16] max-w-[450px]'}`}
            >
              <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ delay: 0.2 }} onClick={closeVideo} className="absolute top-4 right-4 z-[60] w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-xl transition-colors border border-white/10">
                <X size={20} className="text-white" />
              </motion.button>

              {showIframe ? (
                <iframe src={modalYtEmbed(activeVideo.youtubeId)} title={activeVideo.title} allowFullScreen allow="autoplay; fullscreen" className="w-full h-full relative z-10 bg-black" />
              ) : (
                <img src={ytThumb(activeVideo.youtubeId)} alt="" className="w-full h-full object-cover" />
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { Play, ExternalLink, X, ArrowRight } from "lucide-react";

/* ═══ TYPES ═══ */
type Ratio = "16/9" | "9/16";

interface VideoProject {
  id: string;
  title: string;
  category: string;
  youtubeId: string;
  ratio: Ratio;
  gridClass?: string;
  isCenterpiece?: boolean;
  w?: string;
  h?: string;
  showOn?: "desktop" | "mobile" | "all";
}

interface WebProject {
  id: string;
  title: string;
  tech: string;
  link: string;
  image: string;
  gridClass?: string;
  isCenterpiece?: boolean;
}

/* ═══ YOUTUBE URLS ═══ */
const gridYtEmbed = (id: string) => `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${id}&modestbranding=1&rel=0`;
const modalYtEmbed = (id: string) => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1`;
const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

/* ═══ ANIMATION CONFIG (From original code) ═══ */
const appleSpring: Transition = { type: "spring", bounce: 0, duration: 0.35 };

/* ═══ DATA ═══ */
const trustedClients = [
  { name: "Dr Aditi Govitrikar", followers: "1.4M", image: "/images/aditi.webp" },
  { name: "Waryam Singh", followers: "53K", image: "/images/waryam_singh.webp" },
  { name: "MyPlixLife", followers: "1.5M", image: "/images/plix.webp" },
  { name: "Sahil Gambhir", followers: "5.9M", image: "/images/sahil_gambhir.webp" },
  { name: "LightLife by Dr Morepen", followers: "38.5K", image: "/images/lightlife.webp" },
  { name: "Ghar Soaps", followers: "1.8M", image: "/images/ghar_soaps.webp" },
  { name: "Jr.Hardik Pandya", followers: "971K", image: "/images/jr_hardik.webp" },
  { name: "Tiya Gambhir", followers: "315k", image: "/images/tiya_gambhir.webp" },
  { name: "The Real Estate Lawyer", followers: "94k", image: "/images/relawyer.jpg" },
  { name: "Palak Bharti", followers: "165k", image: "/images/palak_bharti.jpg" },
  { name: "Pete Z", followers: "296k", image: "/images/pete_z.jpg" },
];

/* 11 slots (10 grid + 1 centerpiece) with Desktop/Mobile pairs */
const videoProjects: VideoProject[] = [
  { id: "v1-desk", showOn: "desktop", title: "Desert Bloom", category: "Color Grade", youtubeId: "B3oxUCV6zPg", ratio: "16/9", gridClass: "col-span-3 row-span-1", w: "150%", h: "150%" },
  { id: "v1-mob", showOn: "mobile", title: "Desert Bloom", category: "Color Grade", youtubeId: "pn7-ZM81hQM", ratio: "16/9", gridClass: "col-span-3 row-span-1", w: "150%", h: "150%" },

  { id: "v2-desk", showOn: "desktop", title: "Fashion Clip", category: "Reels", youtubeId: "83WR-gPqV-k", ratio: "16/9", gridClass: "col-span-1 row-span-1", w: "200%", h: "200%" },
  { id: "v2-mob", showOn: "mobile", title: "Fashion Clip", category: "Reels", youtubeId: "9ao4FEaDGhQ", ratio: "16/9", gridClass: "col-span-1 row-span-1", w: "200%", h: "200%" },

  { id: "v3-desk", showOn: "desktop", title: "Motion ID-009", category: "CGI", youtubeId: "0Ph6MpGKq8I", ratio: "9/16", gridClass: "col-span-2 row-span-2", w: "110%", h: "110%" },
  { id: "v3-mob", showOn: "mobile", title: "Motion ID-009", category: "CGI", youtubeId: "TmNR8txRmYc", ratio: "9/16", gridClass: "col-span-2 row-span-2", w: "150%", h: "150%" },

  { id: "v4-desk", showOn: "desktop", title: "Neon City", category: "3D Art", youtubeId: "ODFJFJIEuZg", ratio: "9/16", gridClass: "col-span-2 row-span-2", w: "110%", h: "110%" },
  { id: "v4-mob", showOn: "mobile", title: "Neon City", category: "3D Art", youtubeId: "HZsiToZ8zCI", ratio: "9/16", gridClass: "col-span-2 row-span-2", w: "150%", h: "150%" },

  { id: "v5-desk", showOn: "desktop", title: "Tech Short", category: "Social", youtubeId: "-v31vBqMixw", ratio: "9/16", gridClass: "col-span-1 row-span-1", w: "213%", h: "213%" },
  { id: "v5-mob", showOn: "mobile", title: "Tech Short", category: "Social", youtubeId: "B3oxUCV6zPg", ratio: "9/16", gridClass: "col-span-1 row-span-1", w: "213%", h: "213%" },

  { id: "v6-desk", showOn: "desktop", title: "Automotive Ad", category: "Commercial", youtubeId: "MxKeZvMf2TM", ratio: "16/9", gridClass: "col-span-3 row-span-1", w: "140%", h: "140%" },
  { id: "v6-mob", showOn: "mobile", title: "Automotive Ad", category: "Commercial", youtubeId: "DxsDekHDKXo", ratio: "16/9", gridClass: "col-span-3 row-span-1", w: "140%", h: "140%" },

  { id: "v7-desk", showOn: "desktop", title: "Travel Doc", category: "YouTube", youtubeId: "lsqQnlXeZ6Q", ratio: "16/9", gridClass: "col-span-3 row-span-1", w: "212%", h: "212%" },
  { id: "v7-mob", showOn: "mobile", title: "Travel Doc", category: "YouTube", youtubeId: "wyz9Ok6gDyA", ratio: "16/9", gridClass: "col-span-3 row-span-1", w: "150%", h: "150%" },

  { id: "v8-desk", showOn: "desktop", title: "Event B-Roll", category: "Highlight", youtubeId: "B3oxUCV6zPg", ratio: "16/9", gridClass: "col-span-1 row-span-1", w: "200%", h: "200%" },
  { id: "v8-mob", showOn: "mobile", title: "Event B-Roll", category: "Highlight", youtubeId: "pn7-ZM81hQM", ratio: "16/9", gridClass: "col-span-1 row-span-1", w: "200%", h: "200%" },

  { id: "v9-desk", showOn: "desktop", title: "Fitness Promo", category: "Ad", youtubeId: "83WR-gPqV-k", ratio: "16/9", gridClass: "col-span-3 row-span-1", w: "150%", h: "150%" },
  { id: "v9-mob", showOn: "mobile", title: "Fitness Promo", category: "Ad", youtubeId: "9ao4FEaDGhQ", ratio: "16/9", gridClass: "col-span-3 row-span-1", w: "150%", h: "150%" },

  { id: "v10-desk", showOn: "desktop", title: "Product Tease", category: "Promo", youtubeId: "MxKeZvMf2TM", ratio: "16/9", gridClass: "col-span-1 row-span-1", w: "200%", h: "200%" },
  { id: "v10-mob", showOn: "mobile", title: "Product Tease", category: "Promo", youtubeId: "DxsDekHDKXo", ratio: "16/9", gridClass: "col-span-1 row-span-1", w: "200%", h: "200%" },

  { id: "v11-desk", showOn: "desktop", title: "Showreel 2026", category: "Main Reel", youtubeId: "lsqQnlXeZ6Q", ratio: "16/9", isCenterpiece: true, w: "180%", h: "180%" },
  { id: "v11-mob", showOn: "mobile", title: "Showreel 2026", category: "Main Reel", youtubeId: "wyz9Ok6gDyA", ratio: "9/16", isCenterpiece: true, w: "180%", h: "180%" },
];

const webProjects: WebProject[] = [
  { id: "w1", title: "Fintech Dashboard", tech: "Next.js", link: "https://example.com", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070", gridClass: "col-span-3 row-span-1" },
  { id: "w2", title: "App UI", tech: "React Native", link: "https://example.com", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1470", gridClass: "col-span-1 row-span-1" },
  { id: "w3", title: "Creative Portfolio", tech: "Framer Motion", link: "https://example.com", image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1964", gridClass: "col-span-2 row-span-2" },
  { id: "w4", title: "SaaS Landing Page", tech: "Webflow", link: "https://example.com", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015", gridClass: "col-span-2 row-span-2" },
  { id: "w5", title: "Crypto Exchange", tech: "Vue.js", link: "https://example.com", image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1470", gridClass: "col-span-1 row-span-1" },
  { id: "w6", title: "Real Estate Portal", tech: "Tailwind", link: "https://example.com", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070", gridClass: "col-span-3 row-span-1" },
  { id: "w7", title: "E-Commerce", tech: "Shopify", link: "https://example.com", image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2070", gridClass: "col-span-3 row-span-1" },
  { id: "w8", title: "Healthcare App", tech: "React", link: "https://example.com", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1470", gridClass: "col-span-1 row-span-1" },
  { id: "w9", title: "Travel Blog", tech: "Gatsby", link: "https://example.com", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2070", gridClass: "col-span-3 row-span-1" },
  { id: "w10", title: "Music Player", tech: "Svelte", link: "https://example.com", image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1470", gridClass: "col-span-1 row-span-1" },
  { id: "w11", title: "Award Winning Agency", tech: "Three.js", link: "https://example.com", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064", isCenterpiece: true }
];


/* ═══ COMPONENTS ═══ */

function VideoModalContent({ video, onClose, showIframe, appleSpring }: { video: VideoProject; onClose: () => void; showIframe: boolean; appleSpring: Transition }) {
  const gridYtEmbed = (id: string) => `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${id}&modestbranding=1&rel=0`;
  const modalYtEmbed = (id: string) => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1`;
  const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  const isCenterpiece = video.isCenterpiece;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 cursor-pointer pointer-events-auto"
        style={{ willChange: "opacity" }}
      />

      {isCenterpiece ? (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={appleSpring}
          className={`z-10 bg-black overflow-hidden shadow-2xl rounded-2xl md:rounded-[32px] ring-1 ring-white/10 !transition-none pointer-events-auto ${video.ratio === '16/9' ? 'aspect-video max-w-[90vw] md:max-w-[1100px]' : 'aspect-[9/16] max-w-[90vw] md:max-w-[500px]'} w-full`}
          style={{ willChange: "transform, opacity" }}
        >
          {showIframe ? (
            <iframe src={modalYtEmbed(video.youtubeId)} title={video.title} allowFullScreen allow="autoplay; fullscreen" className="w-full h-full relative z-10 bg-black" />
          ) : (
            <img src={ytThumb(video.youtubeId)} alt="" className="w-full h-full object-cover" />
          )}
        </motion.div>
      ) : (
        <motion.div
          layoutId={`video-wrapper-${video.id}`}
          transition={appleSpring}
          className={`relative z-10 w-full bg-black overflow-hidden shadow-2xl rounded-2xl md:rounded-[32px] ring-1 ring-white/10 !transition-none pointer-events-auto ${video.ratio === '16/9' ? 'aspect-video max-w-[1100px]' : 'aspect-[9/16] max-w-[450px]'}`}
          style={{ willChange: "transform, opacity" }}
        >
          {showIframe ? (
            <iframe src={modalYtEmbed(video.youtubeId)} title={video.title} allowFullScreen allow="autoplay; fullscreen" className="w-full h-full relative z-10 bg-black" />
          ) : (
            <img src={ytThumb(video.youtubeId)} alt="" className="w-full h-full object-cover" />
          )}
        </motion.div>
      )}

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.8 }} 
        transition={{ delay: 0.15, duration: 0.2 }}
        onClick={onClose}
        className="fixed top-8 left-1/2 z-[70] w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/80 rounded-full transition-colors border border-white/10"
        style={{ transform: "translateX(-50%)", willChange: "transform, opacity" }}
      >
        <X size={20} className="text-white" />
      </motion.button>
    </>
  );
}

function BentoVideoCard({ video, index, onPlay }: { video: VideoProject; index: number; onPlay: (v: VideoProject) => void }) {
  const [loaded, setLoaded] = useState(false);
  const visibilityClass = video.showOn === "desktop" ? "max-md:hidden" : video.showOn === "mobile" ? "md:hidden" : "";
  const mobileHiddenClass = (video as any).mobileHidden ? "max-md:hidden" : "";

  return (
    <motion.div
      layoutId={`video-wrapper-${video.id}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      onClick={() => onPlay(video)}
      className={`relative group cursor-pointer overflow-hidden rounded-lg md:rounded-2xl bg-zinc-900 border border-white/10 shadow-lg transform-gpu transition-all duration-300 hover:border-white/30 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] !transition-none ${video.gridClass} ${visibilityClass} ${mobileHiddenClass}`}
      style={{ willChange: "transform" }}
    >
      <div className="absolute inset-0 w-full h-full bg-black">
        <div className={`absolute inset-0 transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}>
          <iframe
            src={gridYtEmbed(video.youtubeId)}
            onLoad={() => setLoaded(true)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:scale-105 transition-transform duration-500"
            style={{ width: video.w || "150%", height: video.h || "150%", border: "none", willChange: "transform" }}
            allow="autoplay; muted; playsinline"
            title={video.title}
          />
        </div>
        {!loaded && <div className="absolute inset-0 bg-zinc-800 animate-pulse" />}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shadow-2xl mb-2 md:mb-3 transform scale-75 group-hover:scale-100 transition-transform duration-400">
          <Play className="w-4 h-4 md:w-6 md:h-6 text-white ml-1" fill="currentColor" />
        </div>
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-400 text-center px-4">
          <p className="text-cyan-400 text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-0.5">{video.category}</p>
          <h3 className="text-white text-[10px] md:text-sm font-bold leading-tight line-clamp-1">{video.title}</h3>
        </div>
      </div>
    </motion.div>
  );
}

function CenterpieceVideo({ video, onPlay }: { video: VideoProject; onPlay: (v: VideoProject) => void }) {
  const [loaded, setLoaded] = useState(false);
  const visibilityClass = video.showOn === "desktop" ? "max-md:hidden" : video.showOn === "mobile" ? "md:hidden" : "";

  return (
    <motion.div
      layoutId={`video-wrapper-${video.id}`}
      onClick={() => onPlay(video)}
      className={`absolute top-1/2 left-1/2 w-[45vw] h-[45vw] md:w-[380px] md:h-[380px] rounded-full overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] border-[6px] border-[#05070A] z-20 group cursor-pointer transform-gpu bg-zinc-900 !transition-none ${visibilityClass}`}
      style={{ x: "-50%", y: "-50%", willChange: "transform, opacity" }}
    >
      <div className={`absolute inset-0 transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <iframe
          src={gridYtEmbed(video.youtubeId)}
          onLoad={() => setLoaded(true)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:scale-110 transition-transform duration-500"
          style={{ width: video.w || "150%", height: video.h || "150%", border: "none", willChange: "transform" }}
          allow="autoplay; muted; playsinline"
          title={video.title}
        />
      </div>
      {!loaded && <div className="absolute inset-0 bg-zinc-800 animate-pulse" />}

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shadow-2xl mb-1 md:mb-2 transform scale-75 group-hover:scale-100 transition-transform duration-400">
          <Play className="w-4 h-4 md:w-6 md:h-6 text-white ml-1" fill="currentColor" />
        </div>
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-400 text-center px-4">
          <p className="text-cyan-400 text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-0.5">{video.category}</p>
          <h3 className="text-white text-[10px] md:text-sm font-bold leading-tight line-clamp-1">{video.title}</h3>
        </div>
      </div>
    </motion.div>
  );
}


/* ═══ MAIN LAYOUT ═══ */

export function ServicesRound() {
  const [activeTab, setActiveTab] = useState<"video" | "web">("video");
  const [activeVideo, setActiveVideo] = useState<VideoProject | null>(null);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    const handlePopState = () => { if (activeVideo) closeVideo(); };
    window.addEventListener("popstate", handlePopState);

    // Removed `document.body.style.overflow = "hidden"` to allow scrolling

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [activeVideo]);

  const openVideo = useCallback((v: VideoProject) => {
    setActiveVideo(v);
    window.history.pushState({ isModalOpen: true }, "");
    setTimeout(() => setShowIframe(true), 400); // Delayed Iframe render for smooth animation
  }, []);

  const closeVideo = useCallback(() => {
    setShowIframe(false);
    setTimeout(() => {
      setActiveVideo(null);
      if (window.history.state?.isModalOpen) window.history.back();
    }, 10);
  }, []);

  return (
    <section id="portfolio" className="relative w-full py-8 md:py-12 bg-[#05070A] overflow-hidden font-sans">
      {/* Added py-8 md:py-12 right here for a little bit of spacing! */}

      <div className="absolute inset-0 bg-gradient-to-b from-[#1a202c]/40 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[500px] bg-blue-500/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

        <h3 className="text-white/40 text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4 text-center">
          Worked With...
        </h3>

        {/* Trusted Clients Marquee */}
        <div className="w-full max-w-7xl overflow-hidden mb-12 md:mb-16 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max marquee gap-4 md:gap-6">
            {[...trustedClients, ...trustedClients, ...trustedClients, ...trustedClients].map((client, idx) => (
              <div key={idx} className="flex items-center gap-3 md:gap-4 bg-white/[0.03] border border-white/[0.04] rounded-full pr-5 pl-2 py-2 shadow-sm">
                <img src={client.image} alt={client.name} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-white/[0.1]" />
                <div className="flex flex-col">
                  <span className="text-white text-[10px] md:text-xs font-bold leading-tight">{client.name}</span>
                  <span className="text-white/40 text-[9px] md:text-[10px] font-medium leading-tight">{client.followers} followers</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-xl mb-6">
            Some <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-600">Works</span>
          </h2>

          <div className="relative flex items-center p-1.5 mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full w-max shadow-2xl saturate-150">
            <motion.div
              className="absolute top-1.5 bottom-1.5 rounded-full bg-white/10 border border-white/20"
              animate={{ left: activeTab === "video" ? "6px" : "50%", width: "calc(50% - 6px)" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
            <button onClick={() => setActiveTab("video")} className={`relative z-10 px-8 py-2.5 text-xs md:text-sm font-bold uppercase transition-colors duration-300 ${activeTab === "video" ? "text-white" : "text-white/40 hover:text-white/80"}`}>
              Video Editing
            </button>
            <button onClick={() => setActiveTab("web")} className={`relative z-10 px-8 py-2.5 text-xs md:text-sm font-bold uppercase transition-colors duration-300 ${activeTab === "web" ? "text-white" : "text-white/40 hover:text-white/80"}`}>
              Web Design
            </button>
          </div>
        </motion.div>

        <div className="relative w-full max-w-6xl mx-auto min-h-[500px]">

          {activeTab === "video" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="relative w-full">
              <div className="grid grid-cols-4 md:grid-cols-8 grid-flow-row-dense gap-2 md:gap-4 auto-rows-[30vw] md:auto-rows-[200px]">
                {videoProjects.filter(v => !v.isCenterpiece).map((video, idx) => {
                  const filteredVideos = videoProjects.filter(v => !v.isCenterpiece);
                  const isTopOrBottom = idx < 2 || idx >= filteredVideos.length - 2;
                  const mobileHiddenClass = isTopOrBottom ? "max-md:hidden" : "";
                  const visibilityClass = video.showOn === "desktop" ? "max-md:hidden" : video.showOn === "mobile" ? "md:hidden" : "";
                  
                  return (
                    <div key={video.id} className={`block focus:outline-none ${video.gridClass} ${mobileHiddenClass} ${visibilityClass}`}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.03 }}
                        onClick={() => openVideo(video)}
                        className="relative w-full h-full group cursor-pointer overflow-hidden rounded-lg md:rounded-2xl bg-zinc-900 border border-white/10 shadow-lg transform-gpu transition-all duration-300 hover:border-white/30 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                      >
                        <div className="absolute inset-0 w-full h-full bg-black">
                          <div className={`absolute inset-0 transition-opacity duration-500`}>
                            <iframe
                              src={gridYtEmbed(video.youtubeId)}
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:scale-105 transition-transform duration-500"
                              style={{ width: video.w || "150%", height: video.h || "150%", border: "none", willChange: "transform" }}
                              allow="autoplay; muted; playsinline"
                              title={video.title}
                            />
                          </div>
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                          <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shadow-2xl mb-2 md:mb-3 transform scale-75 group-hover:scale-100 transition-transform duration-400">
                            <Play className="w-4 h-4 md:w-6 md:h-6 text-white ml-1" fill="currentColor" />
                          </div>
                          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-400 text-center px-4">
                            <p className="text-cyan-400 text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-0.5">{video.category}</p>
                            <h3 className="text-white text-[10px] md:text-sm font-bold leading-tight line-clamp-1">{video.title}</h3>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              {videoProjects.filter(v => v.isCenterpiece).map((centerpiece) => (
                <CenterpieceVideo key={centerpiece.id} video={centerpiece} onPlay={openVideo} />
              ))}
            </motion.div>
          )}

          {activeTab === "web" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="relative w-full">
              <div className="grid grid-cols-4 md:grid-cols-8 grid-flow-row-dense gap-2 md:gap-4 auto-rows-[30vw] md:auto-rows-[200px]">
                {webProjects.filter(w => !w.isCenterpiece).map((web, idx) => {
                  const filteredWebs = webProjects.filter(w => !w.isCenterpiece);
                  const isTopOrBottom = idx < 2 || idx >= filteredWebs.length - 2;
                  const mobileHiddenClass = isTopOrBottom ? "max-md:hidden" : "";
                  
                  return (
                    <a key={web.id} href={web.link} target="_blank" rel="noopener noreferrer" className={`block focus:outline-none ${web.gridClass} ${mobileHiddenClass}`}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.05 }}
                        className="relative w-full h-full group overflow-hidden rounded-lg md:rounded-2xl bg-zinc-900 border border-white/10 shadow-lg transform-gpu transition-all duration-500 hover:border-white/30 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                      >
                        <div className="absolute inset-0 w-full h-full bg-black">
                          <img src={web.image} alt={web.title} className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-700" />
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex items-center gap-1.5 md:gap-2 bg-white/20 backdrop-blur-md px-4 py-2 md:px-5 md:py-2.5 rounded-full text-white text-[9px] md:text-xs font-bold border border-white/20 transform scale-90 group-hover:scale-100 transition-transform duration-500 mb-2 md:mb-3 shadow-2xl">
                            Visit Site <ExternalLink size={14} className="md:w-[16px] md:h-[16px]" />
                          </div>
                          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-center px-4">
                            <p className="text-white/60 text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-0.5">{web.tech}</p>
                            <h3 className="text-white text-[10px] md:text-sm font-bold leading-tight line-clamp-1">{web.title}</h3>
                          </div>
                        </div>
                      </motion.div>
                    </a>
                  );
                })}
              </div>

              {webProjects.filter(w => w.isCenterpiece).map((centerpiece) => (
                <a key={centerpiece.id} href={centerpiece.link} target="_blank" rel="noopener noreferrer">
                  <motion.div
                    initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%", rotate: 45 }}
                    animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%", rotate: 45 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
                    className="absolute top-1/2 left-1/2 w-[40vw] h-[40vw] md:w-[320px] md:h-[320px] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] border-[6px] border-[#05070A] z-20 group cursor-pointer transform-gpu bg-zinc-900"
                  >
                    <img src={centerpiece.image} alt="Centerpiece" className="absolute top-1/2 left-1/2 w-[150%] h-[150%] max-w-none -translate-x-1/2 -translate-y-1/2 -rotate-45 object-cover opacity-100 group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="-rotate-45 flex flex-col items-center">
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 md:px-5 md:py-2.5 rounded-full text-white text-[9px] md:text-xs font-bold border border-white/20 transform scale-90 group-hover:scale-100 transition-transform duration-500 mb-2 md:mb-3 shadow-2xl">
                          Hero Project <ExternalLink size={14} className="md:w-[16px] md:h-[16px]" />
                        </div>
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-center px-4">
                          <p className="text-white/60 text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-0.5">{centerpiece.tech}</p>
                          <h3 className="text-white text-[10px] md:text-sm font-bold leading-tight line-clamp-1">{centerpiece.title}</h3>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </a>
              ))}
            </motion.div>
          )}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="mt-16 md:mt-24">
          <a href={activeTab === "video" ? "/video-library" : "/web-library"} className="group relative overflow-hidden inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-white/5 backdrop-blur-2xl border border-white/20 text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-white/10 hover:border-white/40 shadow-2xl">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-100" />
            <span className="relative z-10">View Full Library</span>
            <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
        </motion.div>
      </div>

      {/* --- ORIGINAL ANIMATE PRESENCE LOGIC --- */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] flex items-center justify-center pointer-events-none ${!activeVideo.isCenterpiece ? 'p-4 md:p-8' : ''}`}
          >
            <VideoModalContent video={activeVideo} onClose={closeVideo} showIframe={showIframe} appleSpring={appleSpring} />
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}