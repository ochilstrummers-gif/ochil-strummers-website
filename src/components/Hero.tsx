import React from 'react';
import { ArrowRight } from 'lucide-react';
import heroBg from '../assets/images/ochil_hero_valley_landscape_1785165430563-1.jpeg';
import logoBadge from '../assets/images/ochil_logo_badge_1785148841944.jpg';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#E2E6D8]">
      {/* Background Panoramic Photo */}
      <div className="relative w-full h-[460px] sm:h-[520px] md:h-[580px] lg:h-[640px]">
        <img
          src={heroBg}
          alt="Scenic panoramic view of the Ochil Hills valley and surrounding countryside"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />

        {/* Soft Left Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent max-w-3xl" />

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start pt-6 sm:pt-8 md:pt-10 lg:pt-12">
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            
            {/* Logo Badge and Headline Container */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full overflow-hidden border-3 border-[#3A1554] shadow-2xl bg-[#3A1554] shrink-0 transition-transform hover:scale-105">
                <img 
                  src={logoBadge} 
                  alt="Ochil Strummers Logo Badge"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Main Bold Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1A1A] tracking-tight leading-[1.08] font-serif">
                Play Together.<br />
                Laugh Together.<br />
                <span className="text-[#692482]">Belong Together.</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-gray-800 font-medium leading-relaxed max-w-lg">
              A friendly ukulele group in the heart of the Ochils. Everyone welcome. No auditions. Just good music and great company.
            </p>

            {/* Call to Action Pill Button */}
            <div className="pt-2">
              <button
                onClick={onOpenContact}
                className="inline-flex items-center justify-center space-x-2 bg-[#422057] hover:bg-[#2d143c] text-white px-7 py-3.5 rounded-full font-semibold text-sm tracking-wider active:scale-95 transition duration-200 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>COME ALONG AND MEET US</span>
                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
