import React from 'react';
import { Heart } from 'lucide-react';
import thistleImg from '../assets/images/thistle.png';

interface JoinBannerProps {
  onOpenContact?: () => void;
}

export const JoinBanner: React.FC<JoinBannerProps> = () => {
  return (
    <section className="relative overflow-hidden bg-[#3A1554] text-white py-6 sm:py-8 border-t border-b border-purple-900/40">
      {/* Light purple blending Thistle image - Far Left */}
      <div className="absolute left-2 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 w-16 h-20 sm:w-24 sm:h-28 md:w-28 md:h-32 opacity-35 sm:opacity-45 pointer-events-none select-none">
        <img 
          src={thistleImg} 
          alt="" 
          className="w-full h-full object-contain filter brightness-0 invert-[80%] sepia-[30%] hue-rotate-[220deg]"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Light purple blending Thistle image - Far Right */}
      <div className="absolute right-2 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 w-16 h-20 sm:w-24 sm:h-28 md:w-28 md:h-32 opacity-35 sm:opacity-45 pointer-events-none select-none">
        <img 
          src={thistleImg} 
          alt="" 
          className="w-full h-full object-contain filter brightness-0 invert-[80%] sepia-[30%] hue-rotate-[220deg] scale-x-[-1]"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          
          {/* Header row with Heart and Title */}
          <div className="flex items-center justify-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-900/50 flex items-center justify-center shrink-0 border border-purple-400/20 shadow-inner">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-purple-200 stroke-[1.75] fill-purple-300/30" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-serif text-white">
              Ready to Join?
            </h2>
          </div>

          {/* Single line description text */}
          <p className="text-xs sm:text-sm md:text-base text-purple-100 font-medium max-w-2xl">
            We'd love to meet you! Come along to a session and see what we're all about.
          </p>

        </div>
      </div>
    </section>
  );
};

