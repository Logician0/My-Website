# Logician Creatives - Premium Portfolio & Automation Ecosystem

This repository contains the source code for the live website: **[logiciancreatives.in](https://logiciancreatives.in)**.

This is a premium, high-performance portfolio ecosystem engineered for video editing, software development, and AI automation services. It is optimized for zero-server hosting (Vercel) while leveraging cloud-based integrations (Google Sheets, EmailJS) to run background automated workflows without any dedicated backend server costs.

---

## 🛠️ Core Tech Stack

The portal is built on a modern, ultra-fast, and type-safe front-end framework:

*   **Framework:** **React 19** (leveraging `Suspense` and `lazy` for optimized bundle splitting and performance).
*   **Build Tool & Bundler:** **Vite 7** (with `vite-plugin-singlefile` for clean single-page outputs where needed, and fast-refresh hot module reloading).
*   **Styling:** **Tailwind CSS v4** (utilizing the new `@tailwindcss/vite` compiler for super-fast compilation, native CSS variables configuration, and advanced utility classes).
*   **Language:** **TypeScript 5.x** (with strict interface configurations and safety contracts).
*   **Animation & Physics:** **Framer Motion 12** (physics-based spring transitions, smooth layout changes) and **Three.js** / **React Three Fiber (R3F)** / **Drei** (powering interactive 3D particle systems and magnetic canvas elements).
*   **Routing:** **React Router DOM v7** (declarative client-side routing with global transition interceptors).
*   **Automations:**
    *   **EmailJS** for direct client-to-inbox automated messaging.
    *   **Google Apps Script Web App** for database-free serverless contact caching to Google Sheets.

---

## 🚀 Key Features & Modules

1.  **Centralized Template Configuration (`templateConfig.ts`)**: Edit website copy, social links, meta tags, and features globally in under **3 minutes** from a single source of truth.
2.  **Magnetic Social Connections Orbit (`SocialOrbit.tsx`)**: Interactive UI with custom profile picture magnet physics, connected to dynamic floating social status indicators.
3.  **Vibrant OLED Dark Mode Theme**: Pitch black background (`#000000`) paired with custom neon-cyan and deep-violet gradient glow cards.
4.  **High-Fidelity Video Showcase (`VideoCategoryPage.tsx`)**:
    *   *Sticky Mobile Watch Player:* Automatically docks current video to the top of the viewport on mobile devices.
    *   *YouTube Optimization:* Dynamic default thumbnail resolution fallback & deferred iframe loading (300ms delay) to prevent page load blocking.
5.  **Admin Management Dashboard (`AdminPage.tsx`)**: Admin portal UI to visualize, manage, and edit page layout contents.
6.  **Recruitment Pipeline (`CareersPage.tsx`)**: Custom layout displaying open positions, company perks, and job requirements.
7.  **Interactive Portfolio Hub (`InteractivePortfolio.tsx` & `ServicesRound.tsx`)**: Seamless category switcher with liquid glass spring selectors and infinite sliders.
8.  **Automated Serverless Forms**: Real-time feedback validation, anti-spam protections, and instant webhook triggers to Google Sheets and EmailJS.

---

## 📂 Live Project Directory & Structure

Detailed file layout of the project, detailing the architecture of the live portal:

```
/
├── public/                # Static assets (images, logos, avatars, my-photo.webp)
├── src/
│   ├── components/        # Modular UI components
│   │   ├── sections/
│   │   │   └── ServicesOrbit.tsx   # Floating orbital display of services
│   │   ├── ui/
│   │   │   └── SpotlightCard.tsx   # Premium mouse-tracking card hover effect
│   │   ├── BentoGrid.tsx           # Hub diagram layouts showing capabilities
│   │   ├── Contact.tsx             # Interactive layout and contact information
│   │   ├── ContactForm.tsx         # Automated contact form via EmailJS integration
│   │   ├── FAQ.tsx                 # Accordion-style developer FAQs
│   │   ├── Footer.tsx              # Clean site footer with brand links
│   │   ├── GlobalBackground.tsx    # OLED grid background effects
│   │   ├── Hero.tsx                # Cutout image slider and header text
│   │   ├── InteractivePortfolio.tsx # Main tab showcase grid
│   │   ├── Marquee.tsx             # Endless sliding animations
│   │   ├── Navbar.tsx              # Apple-style glass shortcut pill
│   │   ├── Newsletter.tsx          # Automated newsletter signup to Google Sheets
│   │   ├── PremiumBackground.tsx   # Magnetic particles system
│   │   ├── Process.tsx             # Step-by-step pipeline & Tools marquee
│   │   ├── SciFiDivider.tsx        # High-tech decorative divider
│   │   ├── ServiceLayout.tsx       # Reusable layout template for services
│   │   ├── ServicesRound.tsx       # Horizontal works lists and swipe lists
│   │   ├── SocialOrbit.tsx         # Orbit connector and stats grid
│   │   └── Testimonials.tsx        # Sliding glass testimonial display
│   ├── config/
│   │   └── templateConfig.ts       # Central file to edit template details
│   ├── data/
│   │   └── portfolio.json          # Seed database containing all items/categories
│   ├── lib/
│   │   ├── data.ts                 # Local data loader mapping portfolio.json
│   │   ├── hierarchy.ts            # Route configuration pathing
│   │   └── types.ts                # Strict TypeScript interface contracts
│   ├── pages/
│   │   ├── AdminPage.tsx           # Full admin panel to add, edit, and organize
│   │   ├── CareersPage.tsx         # Recruitment listing layout
│   │   ├── HomePage.tsx            # Main landing page assembler
│   │   ├── Privacy.tsx             # Compliance layout
│   │   ├── ServicePage.tsx         # Detailed service features page
│   │   ├── Terms.tsx               # Client contract layout
│   │   └── VideoCategoryPage.tsx   # YouTube watch page and recommendations
│   ├── utils/
│   │   └── cn.ts                   # Tailwind merge className utility
│   ├── App.tsx                     # Main layout router and ScrollToTop interceptor
│   ├── index.css                   # Custom global resetting, aurora bg & animations
│   └── main.tsx                    # React mount entrypoint
├── package.json            # Project dependencies and run commands list
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Build bundler configuration
└── vercel.json             # Deployment headers
```

---

## ⚡ Automation Workflows & Integrations

The live website utilizes key cloud APIs and microservices to run backend automations serverlessly:

### 1. 📧 Google Sheets Automated Newsletter Integration
In `Newsletter.tsx`, rather than spinning up an expensive database for subscriber emails, a custom Google Apps Script Web App is utilized to append emails directly to a secure **Google Sheet** in real-time.
*   **Web App Endpoint (`SCRIPT_URL`)**: 
    `https://script.google.com/macros/s/AKfycbyTeaVRbmbLLXNg8yRzb-ayEN8Ex6hX9DSIbWSmJUHIRZbba6Rl1CJ3NtcDhuxBTzI/exec`
*   **Workflow**: When a visitor enters their email to subscribe to the newsletter, the client-side sends a `POST` request with `mode: "no-cors"`. The macro processes the payload and appends a row with `Email` and `Timestamp` to your spreadsheet.
*   **App Script Logic**:
    ```javascript
    function doPost(e) {
      try {
        var sheet = SpreadsheetApp.openById("YOUR_SPREADSHEET_ID").getActiveSheet();
        var data = JSON.parse(e.postData.contents);
        sheet.appendRow([data.email, new Date()]);
        return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
      } catch(error) {
        return ContentService.createTextOutput("Error: " + error).setMimeType(ContentService.MimeType.TEXT);
      }
    }
    ```

### 2. 📬 Lead Alerts & Automations via EmailJS
In `ContactForm.tsx`, the client contact form uses **EmailJS** (`@emailjs/browser`) to send structured email alerts directly to your inbox whenever a potential client submits a proposal.
*   **Workflow Configuration**:
    *   **Service ID**: `service_s7yikyc`
    *   **Template ID**: `template_nfvwwoo`
    *   **Public Key**: `GQ4FbqViDpRQZkMu1`
*   **Automation Mechanics**: The form fields (`from_name`, `reply_to`, `service`, `message`) map directly to an EmailJS HTML template. When submitted, the client SDK fires the message straight through the EmailJS server, which compiles the email and sends it to your primary mailbox instantly.

---

## 🎨 Theme & Premium Design Systems

### 💎 OLED Dark Mode & Apple Liquid Glass Aesthetic
*   **OLED Pure Black Background**: Built on absolute `#000000` to make neon-cyan and deep-violet gradient elements stand out.
*   **Liquid Glass Switchers**: Tab selectors utilizing custom Framer Motion spring physics, semi-transparent frosted highlights, and backdrop blurs to simulate dynamic, premium glass properties.
*   **Airy Minimalist Typography**: Utilizes font combinations from Google Fonts (Inter and Geist Mono) with high tracking and light font weights for a premium editorial feel.
*   **Breathing Animation Space**: Micro-animations on buttons, links, and cards for responsive hover magnification.

### 🎥 High-Fidelity Video Showcase (YouTube Optimized)
*   **Sticky Mobile Watch Mode**: On mobile, the active video player sticks to the top of the viewport. recommended list scrolls cleanly underneath, mirroring the native YouTube mobile watch experience.
*   **Fallback Thumbnail Loader**: Automatically defaults to high-quality YouTube thumbnails (`hqdefault.jpg`), resolving missing image issues.
*   **Deferred Iframe Loading**: YouTube iframes are deferred by 300ms, completely resolving page load blocking and rendering transitions instantly (0.1s) on mobile devices.

---

## ⚡ Unique Elements Done Differently
1.  **Centralized Template Config**: Unlike other templates where you must edit dozens of HTML/TSX files to change a name or social link, this website exposes everything inside `templateConfig.ts`. It takes less than **3 minutes** to customize.
2.  **Magnetic Social Connections Orbit**: The "About" section features a magnetic profile picture surrounded by an interactive, breathing orbit of social icons that expand and connect on click.
3.  **Smooth Page Transition Scrolls**: Solves the standard Single Page Application (SPA) lag by using a global `ScrollToTop` router interceptor that temporarily toggles scrolling behavior to reset viewport coordinates instantly without sluggish animations.

---

## 🔧 Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   cd My-Website-main
   ```
2. Install the project dependencies:
   ```bash
   npm install
   ```

### Development
To start the local development server with hot reload:
```bash
npm run dev
```

### Production Build
To compile the static assets for deployment:
```bash
npm run build
```
This compiles the code into the `dist/` directory, optimized and ready to be hosted on Vercel, Netlify, or Github Pages.
