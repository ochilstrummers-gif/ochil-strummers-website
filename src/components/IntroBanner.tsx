import React from 'react';
import thistle from '../assets/images/thistle.png';
import ochilHillsDrawing from '../assets/images/ochilhillsdrawing.png';

export const IntroBanner: React.FC = () => {
  return (
    <section className="-mt-16 sm:-mt-24 md:-mt-32 lg:-mt-40 relative z-10 bg-[#F4F2E9]/95 backdrop-blur-md border-t border-b border-[#E3DFC8] py-6 sm:py-8 md:py-10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
          
          {/* Left: Thistle Icon */}
          <div className="md:col-span-2 flex justify-center md:justify-start">
            <div className="w-20 h-24 sm:w-24 sm:h-28 flex items-center justify-center">
              <img 
                src={thistle} 
                alt="Scottish Thistle" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Center: Headline & Text */}
          <div className="md:col-span-6 text-center md:text-left space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-[#3A1554] tracking-tight">
              Music brings people together.
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-700 font-medium leading-relaxed">
              Whether you're picking up a ukulele for the first time or have been playing for years, you'll find friendship, encouragement and plenty of laughter at Ochil Strummers.
            </p>
          </div>

          {/* Right: Line art drawing of Ochil Hills */}
          <div className="md:col-span-4 hidden md:flex justify-end items-center">
            <img 
              src={ochilHillsDrawing} 
              alt="Ochil Hills Drawing" 
              className="w-full max-w-[260px] max-h-24 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
