import React from 'react';
import { Quote, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '../data/homeData';

export const Testimonials: React.FC = () => {
  return (
    <section className="bg-[#F6F4EB] py-12 sm:py-16 border-b border-[#E3DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-lg sm:text-xl font-black text-[#3A1554] tracking-tight uppercase">
            MEMBER TESTIMONIALS
          </h2>
        </div>

        {/* Member Testimonial Cards Container */}
        <div className="flex flex-wrap justify-center gap-5">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.85rem)] lg:max-w-[380px] bg-white p-5 rounded-2xl border border-gray-200/90 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow relative"
            >
              <Quote className="w-6 h-6 text-[#3A1554]/15 absolute top-4 right-4" />

              <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed italic relative z-10 pt-1 whitespace-pre-line">
                "{t.quote}"
              </p>

              <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#422057] text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                  {t.name[0]}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 text-xs sm:text-sm truncate">{t.name}</h4>
                  <p className="text-[11px] text-[#596C34] font-semibold flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span>{t.location} • {t.role}</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

