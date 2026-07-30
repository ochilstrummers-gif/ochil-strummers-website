import React from 'react';
import { Quote, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '../data/homeData';

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  location: string;
}

export const EVENT_TESTIMONIAL_PLACEHOLDERS: TestimonialItem[] = [
  {
    quote: "Testimonial placeholder text – e.g. 'Ochil Strummers performed at our community event and brought so much energy and joy to everyone in attendance!'",
    name: "Event Organiser Name",
    role: "Community Event / Venue",
    location: "Alva / Clackmannanshire",
  },
  {
    quote: "Testimonial placeholder text – e.g. 'Our residents and guests thoroughly enjoyed the cheerful ukulele singalong and lively songs.'",
    name: "Activity Coordinator",
    role: "Care Home / Social Club",
    location: "Stirling / Central Scotland",
  },
  {
    quote: "Testimonial placeholder text – e.g. 'A wonderful performance that had the audience clapping, singing along, and smiling throughout.'",
    name: "Venue Host Name",
    role: "Local Community Hall",
    location: "Sauchie / Dollar",
  },
  {
    quote: "Testimonial placeholder text – e.g. 'Warm, engaging, and enthusiastic performers who made our fundraising day extra special.'",
    name: "Fundraiser Coordinator",
    role: "Charity Fundraiser",
    location: "Tillicoultry / Alloa",
  },
  {
    quote: "Testimonial placeholder text – e.g. 'Great selection of songs that catered to all ages. We would gladly welcome them back anytime!'",
    name: "Festival Organiser",
    role: "Local Festival / Fair",
    location: "Central Scotland",
  },
  {
    quote: "Testimonial placeholder text – e.g. 'Fabulous music and brilliant community spirit. A highlight of our annual gathering.'",
    name: "Group Secretary",
    role: "Community Group",
    location: "Clackmannanshire",
  },
];

interface TestimonialsProps {
  title?: string;
  testimonials?: TestimonialItem[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  title = "MEMBER TESTIMONIALS",
  testimonials = TESTIMONIALS,
}) => {
  return (
    <section className="bg-[#F6F4EB] py-12 sm:py-16 border-b border-[#E3DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-lg sm:text-xl font-black text-[#3A1554] tracking-tight uppercase">
            {title}
          </h2>
        </div>

        {/* Testimonial Cards Container */}
        <div className="flex flex-wrap justify-center gap-5">
          {testimonials.map((t, idx) => (
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
                  {t.name ? t.name[0] : 'P'}
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


