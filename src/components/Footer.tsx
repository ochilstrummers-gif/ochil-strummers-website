import React from 'react';
import { Music, Heart, MapPin, Mail, Calendar } from 'lucide-react';

interface FooterProps {
  onOpenJoinModal: () => void;
  onScrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenJoinModal, onScrollToSection }) => {
  return (
    <footer className="bg-[#0F172A] text-[#FAF5EE] border-t border-[#3B1F52] relative">
      
      {/* Tartan Accent Line */}
      <div className="h-2 w-full tartan-accent-strip" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#4C1D95] text-amber-300 flex items-center justify-center font-bold shadow-md">
                <Music className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black font-serif text-[#FAF5EE]">Ochil Strummers 🏴󠁧󠁢󠁳󠁣󠁴󠁿</h3>
                <p className="text-xs text-amber-200">Central Scotland's Community Ukulele Club</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-sm font-medium leading-relaxed">
              Bringing folk together across Alva, Stirling, Tillicoultry, Menstrie, Alloa, and Dollar for weekly ukulele strum-alongs, singing, and friendly blether.
            </p>

            <div className="text-xs text-slate-400 font-semibold space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" /> The Johnstone Arms Hotel, 55 Stirling St, Alva FK12 5ED
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> Mondays @ 7:30 PM - 9:30 PM
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">Quick Links</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-300">
              <li>
                <button onClick={() => onScrollToSection('hero')} className="hover:text-amber-300 transition-colors">
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('next-session')} className="hover:text-amber-300 transition-colors">
                  Next Monday Session
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('interactive-tuner')} className="hover:text-amber-300 transition-colors">
                  Ukulele Tuner & Chords
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('about')} className="hover:text-amber-300 transition-colors">
                  About Our Ethos
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('songbook')} className="hover:text-amber-300 transition-colors">
                  Featured Songbook
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('faq')} className="hover:text-amber-300 transition-colors">
                  Newcomer FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Join Callout */}
          <div className="md:col-span-4 bg-[#1E293B] p-5 rounded-2xl border border-[#3B1F52] space-y-3">
            <h4 className="text-sm font-bold text-[#FAF5EE]">First Visit Free!</h4>
            <p className="text-xs text-slate-300">
              Never played before? We have 8 loaner ukuleles waiting for you this Monday evening.
            </p>
            <button
              onClick={onOpenJoinModal}
              className="w-full bg-[#4C1D95] hover:bg-[#6D28D9] text-[#FAF5EE] font-bold py-2.5 px-4 rounded-xl text-xs border border-[#DDD6FE]/30 transition-all shadow-md"
            >
              Reserve a Loaner Ukulele
            </button>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-[#1E293B] text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Ochil Strummers Ukulele Club. All rights reserved.</p>
          <p className="flex items-center gap-1 text-slate-400">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for music lovers in Central Scotland
          </p>
        </div>

      </div>
    </footer>
  );
};
