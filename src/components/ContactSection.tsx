import React from 'react';
import { MapPin, Mail, Phone, Clock, Calendar, Sparkles } from 'lucide-react';
import { NEXT_SESSION } from '../data/homeData';

interface ContactSectionProps {
  onOpenJoinModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenJoinModal }) => {
  return (
    <section id="contact" className="py-16 bg-[#0F172A] text-[#FAF5EE] border-b border-[#3B1F52]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Venue Location & Map Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#4C1D95] border border-[#DDD6FE]/30 text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>Where We Meet</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#FAF5EE] font-serif">
              Hills View Hall in Alva
            </h2>

            <p className="text-base text-slate-300 font-medium leading-relaxed">
              Located right on Park Street in Alva, FK12 5LJ — easily accessible from Stirling, Alloa, Tillicoultry, Menstrie, Dollar, and Clackmannanshire. Free on-site parking is available.
            </p>

            {/* Address Box */}
            <div className="bg-[#1E293B] p-6 rounded-2xl border border-[#3B1F52] space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#FAF5EE] text-base">{NEXT_SESSION.venue}</p>
                  <p className="text-sm text-slate-300">{NEXT_SESSION.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-[#3B1F52]">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#FAF5EE] text-sm">Every Monday Evening</p>
                  <p className="text-xs text-slate-300">Doors open 7:15 PM • Strumming 7:30 PM - 9:30 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-[#3B1F52]">
                <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#FAF5EE] text-sm">Email Us</p>
                  <p className="text-xs text-amber-300">ochilstrummers@gmail.com</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Map Placeholder Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#1E293B] rounded-3xl p-6 border-2 border-[#3B1F52] shadow-2xl text-center space-y-5">
              
              <div className="w-16 h-16 rounded-2xl bg-[#4C1D95] text-amber-300 flex items-center justify-center mx-auto shadow-md">
                <MapPin className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#FAF5EE]">Foot of the Ochil Hills</h3>
                <p className="text-xs text-slate-300 mt-1">Alva Community Centre, FK12 5LJ</p>
              </div>

              <div className="bg-[#0F172A] p-4 rounded-xl border border-[#3B1F52] text-xs space-y-2 text-left">
                <p className="text-amber-200 font-bold">🚍 Public Transport Routes:</p>
                <p className="text-slate-300">• First Bus 51/52 from Stirling & Alloa stops right outside Park Street.</p>
                <p className="text-slate-300">• Ample free car parking behind the community center building.</p>
              </div>

              <button
                onClick={() => { window.open('https://heartfelt-biscotti-1bbd29.netlify.app/forms/join.html', '_blank'); }}
                className="w-full bg-[#6D28D9] hover:bg-[#7C3AED] text-[#FAF5EE] font-extrabold py-3.5 px-4 rounded-xl shadow-lg transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Reserve Your Free Beginner Spot</span>
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
