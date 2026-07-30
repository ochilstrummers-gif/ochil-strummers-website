import React from 'react';
import { MapPin, Calendar, Clock, Smile, ArrowRight } from 'lucide-react';
import pubSessionPhoto from '../assets/images/ukulele_pub_session_1785257120765.jpg';

interface WhereWeMeetSectionProps {
  onOpenContact?: () => void;
  onOpenFreeTasterModal?: () => void;
}

export const WhereWeMeetSection: React.FC<WhereWeMeetSectionProps> = ({
  onOpenContact,
  onOpenFreeTasterModal,
}) => {
  const handleTasterClick = () => {
    if (onOpenFreeTasterModal) {
      onOpenFreeTasterModal();
    } else if (onOpenContact) {
      onOpenContact();
    }
  };

  return (
    <section className="bg-[#F6F4EB] py-10 sm:py-14 border-t border-[#E3DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="mb-2">
          <span className="inline-block bg-[#EFECE6] text-[#3A1554] text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border border-purple-200/50">
            WEEKLY REHEARSALS
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#3A1554] mb-8">
          Where We Meet
        </h2>

        {/* Large Venue Container Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm text-left max-w-5xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Details Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Header Title with Pin Icon */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#3A1554] text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <MapPin className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#3A1554]">
                    The Johnstone Arms Hotel
                  </h3>
                  <p className="text-gray-600 text-sm font-semibold">
                    Alva, Clackmannanshire
                  </p>
                </div>
              </div>

              {/* Info Grid: Rehearsal Day & Start Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#F4F2E9] p-4 rounded-2xl border border-gray-200/80 flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#3A1554]" />
                  <div>
                    <span className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      REHEARSAL DAY
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      Monday
                    </span>
                  </div>
                </div>

                <div className="bg-[#F4F2E9] p-4 rounded-2xl border border-gray-200/80 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#3A1554]" />
                  <div>
                    <span className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      START TIME
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      7:30 PM – 9:30 PM
                    </span>
                  </div>
                </div>
              </div>

              {/* Amber Welcome Banner */}
              <div className="bg-[#FDF3D6] border border-amber-200 p-4 rounded-2xl flex items-center gap-3 text-amber-900 text-xs sm:text-sm font-medium">
                <div className="w-7 h-7 rounded-full bg-amber-200/80 text-amber-900 flex items-center justify-center shrink-0">
                  <Smile className="w-4 h-4" />
                </div>
                <span>
                  All skill levels welcome! Bring a ukulele if you have one, or borrow one of ours!
                </span>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  onClick={handleTasterClick}
                  className="bg-[#3A1554] hover:bg-[#2A0F3D] text-white px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors inline-flex items-center gap-2.5 shadow-md active:scale-95 cursor-pointer"
                >
                  <span>FREE TASTER SESSION</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>

            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-white/60 bg-[#3A1554]">
                <img
                  src={pubSessionPhoto}
                  alt="Johnstone Arms, Alva"
                  className="w-full h-64 sm:h-72 object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Photo Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-12 text-white">
                  <h4 className="font-bold text-base text-white">
                    Johnstone Arms, Alva
                  </h4>
                  <p className="text-amber-200 text-xs font-medium">
                    Warm &amp; cozy rehearsal space
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
