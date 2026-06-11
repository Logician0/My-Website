'use client';

import { Hero } from '@/components/Hero';
import { ServicesRound } from '@/components/ServicesRound';
import { SocialOrbit } from '@/components/SocialOrbit';
import { Process } from '@/components/Process';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { ContactForm } from '@/components/ContactForm';
import { Newsletter } from '@/components/Newsletter';
import { PremiumBackground } from '@/components/PremiumBackground';
import { SciFiDivider } from '@/components/SciFiDivider';

export function HomePage() {
  return (
    <main>

      {/* Hero with Scrollytelling */}
      <Hero />
      <SciFiDivider />

      {/* REPLACED: Interactive Character Selection Portfolio */}
      <ServicesRound />
      <SciFiDivider />

      {/* Process with Light Beam */}
      <Process />
      <SciFiDivider />

      {/* About with Social Orbit */}
      <SocialOrbit />
      <SciFiDivider />

      {/* Testimonials Carousel */}
      <Testimonials />
      <SciFiDivider />

      {/* FAQ Section */}
      <FAQ />
      <SciFiDivider />

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 relative overflow-hidden" aria-label="Contact Section">
        <PremiumBackground />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4 tracking-tighter text-white uppercase drop-shadow-xl">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-600">Scale?</span>
          </h2>
          <p className="text-white/50 text-center mb-12 font-light tracking-[0.1em] uppercase text-sm">
            Let's discuss your next big project.
          </p>
          
          <ContactForm />
        </div>
      </section>

      <Newsletter />
    </main>
  );
}