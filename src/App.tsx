'use client';

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

// --- Lazy Load Pages ---

const HomePage = lazy(() =>
  import('@/pages/HomePage').then(module => ({ default: module.HomePage }))
);

const ServicePage = lazy(() =>
  import('@/pages/ServicePage').then(module => ({ default: module.ServicePage }))
);

const VideoCategoryPage = lazy(() =>
  import('@/pages/VideoCategoryPage').then(module => ({ default: module.VideoCategoryPage }))
);

const CareersPage = lazy(() =>
  import('@/pages/CareersPage').then(module => ({ default: module.CareersPage }))
);

// ✅ FIX: Import path must match filename 'PrivacyPage' (not 'Privacy')
const PrivacyPage = lazy(() =>
  import('@/pages/Privacy').then(module => ({ default: module.PrivacyPage }))
);

// ✅ FIX: Import path must match filename 'TermsPage' (not 'Terms')
const TermsPage = lazy(() =>
  import('@/pages/Terms').then(module => ({ default: module.TermsPage }))
);


// --- Loading Spinner ---
const PageLoader = () => (
  <div className="h-screen w-full bg-black flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
  </div>
);

export function App() {
  return (
    <BrowserRouter>
      {/* min-h-screen: Ensures the background fills the window 
         flex-col: Stacks Navbar, Content, Footer vertically
         overflow-x-hidden: Prevents side-scrolling issues
      */}
      <div className="min-h-screen bg-black text-white antialiased cursor-default flex flex-col overflow-x-hidden">
        
        <Navbar />

        {/* flex-grow: Pushes the Footer to the bottom if content is short.
           w-full: Ensures content takes full width.
        */}
        <div className="flex-grow w-full relative">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/careers" element={<CareersPage />} />
              
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />

              <Route
                path="/services/video-editing/:categoryId"
                element={<VideoCategoryPage />}
              />
              <Route path="/services/:slug" element={<ServicePage />} />
            </Routes>
          </Suspense>
        </div>

        <Footer />
        
      </div>
    </BrowserRouter>
  );
}