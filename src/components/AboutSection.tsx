import React from 'react';
import { Heart, Coffee, Users, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { CLUB_STATS } from '../data/homeData';
import groupPhoto from '../assets/images/ochil_ukulele_group_1785147330166.jpg';

interface AboutSectionProps {
  onOpenJoinModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenJoinModal }) => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-[#FAF5EE] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#F3E8FF] border border-[#DDD6FE] text-[#4C1D95] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 text-amber-600" />
            <span>Our Ethos & Story</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] font-serif">
            Welcome to Ochil Strummers
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#1E293B]/80 font-medium leading-relaxed">
            Founded at the foot of the magnificent Ochil Hills, we are an inclusive Scottish music club brought together by a shared love for four nylon strings, good songs, and warm conversation.
          </p>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-[#FFFDF9] bg-[#0F172A]">
              <img
                src={groupPhoto}
                alt="Ukulele with Scottish tartan blanket and shortbread tea"
                className="w-full h-[380px] object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://picsum.photos/seed/ukulele-tartan/800/600";
                }}
              />
              
              {/* Badge Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0F172A]/90 backdrop-blur-md p-4 rounded-2xl border border-[#DDD6FE]/30 text-[#FAF5EE]">
                <p className="text-xs font-extrabold text-amber-300 uppercase tracking-wider"> Scottish Hospitality</p>
                <p className="text-sm font-bold mt-0.5">Tea, coffee & shortbread served half-time every session</p>
              </div>
            </div>
          </div>

          {/* Right Column: About Details */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] font-serif">
              "If you can hold it, you can strum it!"
            </h3>
            
            <p className="text-base text-[#1E293B]/85 font-medium leading-relaxed">
              Whether you picked up a ukulele yesterday or have been playing for decades, our weekly gatherings in Alva provide a relaxed space to sing, learn, and relax after a busy week.
            </p>

            {/* 3 Pillars List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-[#FFFDF9] p-4 rounded-2xl border border-[#E8DEC8] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#F3E8FF] text-[#4C1D95] flex items-center justify-center mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#0F172A] text-sm">1. Zero Auditions</h4>
                <p className="text-xs text-[#1E293B]/70 mt-1">No pressure, no tests. Sing quietly or belt it out!</p>
              </div>

              <div className="bg-[#FFFDF9] p-4 rounded-2xl border border-[#E8DEC8] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#F3E8FF] text-[#4C1D95] flex items-center justify-center mb-3">
                  <Coffee className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#0F172A] text-sm">2. Half-Time Blether</h4>
                <p className="text-xs text-[#1E293B]/70 mt-1">Catch up with neighbors over tea & Scottish biscuits.</p>
              </div>

              <div className="bg-[#FFFDF9] p-4 rounded-2xl border border-[#E8DEC8] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#F3E8FF] text-[#4C1D95] flex items-center justify-center mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#0F172A] text-sm">3. Community Gigs</h4>
                <p className="text-xs text-[#1E293B]/70 mt-1">Optional fun performances at local care homes & galas.</p>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-sm text-[#0F172A] font-semibold">
                <CheckCircle2 className="w-5 h-5 text-[#4C1D95]" />
                <span>8 Free loaner ukuleles reserved for newcomers every Monday</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#0F172A] font-semibold">
                <CheckCircle2 className="w-5 h-5 text-[#4C1D95]" />
                <span>Large print songbooks and chord sheets available</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#0F172A] font-semibold">
                <CheckCircle2 className="w-5 h-5 text-[#4C1D95]" />
                <span>Convenient venue at The Johnstone Arms Hotel, Alva</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenJoinModal}
                className="bg-[#4C1D95] hover:bg-[#3B1F52] text-[#FAF5EE] px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Come Along & Try It Free</span>
              </button>
            </div>

          </div>

        </div>

        {/* Stats Strip Banner */}
        <div className="bg-[#0F172A] text-[#FAF5EE] rounded-3xl p-6 sm:p-8 border border-[#3B1F52] grid grid-cols-2 lg:grid-cols-4 gap-6">
          {CLUB_STATS.map((stat, idx) => (
            <div key={idx} className="text-center space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-amber-300 font-serif">{stat.value}</p>
              <p className="text-sm font-bold text-[#FAF5EE]">{stat.label}</p>
              <p className="text-xs text-slate-300">{stat.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
