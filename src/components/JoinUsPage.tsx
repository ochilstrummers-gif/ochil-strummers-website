import React from 'react';
import { 
  Users, 
  Heart, 
  CheckCircle2, 
  Music, 
  MapPin, 
  Calendar, 
  Clock, 
  Smile, 
  Coffee, 
  Mail, 
  ArrowRight 
} from 'lucide-react';
import logoBadge from '../assets/images/ochil_logo_badge_1785148841944.jpg';
import ochilUkuleleImg from '../assets/images/ochil_hero_ukulele_1785147316608.jpg';
import indoorPhoto from '../assets/images/gallery_indoor_group_1785148867749.jpg';

interface JoinUsPageProps {
  onOpenContact: () => void;
  onNavigateHome: () => void;
}

export const JoinUsPage: React.FC<JoinUsPageProps> = ({ onOpenContact, onNavigateHome }) => {
  return (
    <div className="bg-[#F4F2E9] text-[#1A1A1A] min-h-screen">
      
      {/* 1. Page Header (Matching Banner Format) */}
      <section className="relative bg-[#3A1554] text-white py-6 sm:py-8 border-b border-purple-900/40">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left Column: Title and text */}
            <div className="max-w-3xl space-y-2 text-left">
              <div className="inline-block bg-purple-900/60 text-purple-200 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-purple-700/50 mb-1">
                COME &amp; STRUM WITH US
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
                Join Ochil Strummers
              </h1>
              <p className="text-purple-100 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
                Come and join our great group! Whether you're an absolute beginner or an experienced player, you'll find a warm, friendly welcome at our weekly ukulele jam.
              </p>
            </div>

            {/* Right Column: Logo in line with writing */}
            <div className="shrink-0">
              <img
                src={logoBadge}
                alt="Ochil Strummers Logo"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white/20 shadow-lg object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 2. Main Invitation Section */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Text & Call to Action */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-4xl font-black font-serif text-[#3A1554]">
              Come and Join Our Great Group!
            </h2>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-medium">
              We are a relaxed, friendly community ukulele group based at the foot of the Ochil Hills. Everyone is welcome, and your first session is completely free! If you love music, singing, or just want to try something new, Ochil Strummers is the perfect place for you.
            </p>

            <p className="text-gray-700 text-base leading-relaxed">
              There are no pressure auditions, no stressful tests, and no requirement to read traditional sheet music. We have our own songbook from where we strum classic ukulele songs to pop hits, and take a half-time break with a pint or soft drink, and friendly chatter!
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#596C34] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-gray-800">Free loaner ukuleles provided</span>
              </div>

              <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#596C34] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-gray-800">All skill levels &amp; ages welcome</span>
              </div>

              <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#596C34] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-gray-800">Mondays 7:30pm in Alva</span>
              </div>

              <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#596C34] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-gray-800">Have a wee drink &amp; warm company</span>
              </div>
            </div>

            {/* Prominent Action Button */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenContact}
                className="bg-[#596C34] hover:bg-[#4C5E2C] text-white px-8 py-4 rounded-xl font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-lg transition-all active:scale-95 flex items-center gap-3 cursor-pointer"
              >
                <Users className="w-5 h-5" />
                <span>Join Us Today</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenContact}
                className="bg-white hover:bg-gray-50 text-[#3A1554] border-2 border-[#3A1554] px-6 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Mail className="w-4 h-4 text-[#3A1554]" />
                <span>Ask Us a Question</span>
              </button>
            </div>
          </div>

          {/* Right Column: Group Atmosphere Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#2F1045] group">
              <img
                src={ochilUkuleleImg}
                alt="Ukuleles at the Ochil Hills"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1F0730] via-[#2F1045]/90 to-transparent p-6 text-white space-y-1">
                <p className="text-xs font-extrabold text-amber-300 uppercase tracking-wider">Weekly Jam Session</p>
                <h3 className="text-lg font-bold">The Johnstone Arms Hotel, Alva</h3>
                <p className="text-xs text-purple-200">
                  Come along any Monday at 7:30pm and strum along with us!
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Session Details & What to Expect Cards */}
      <section className="bg-white py-12 sm:py-16 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-[#3A1554] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>Weekly Practice Information</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-serif text-[#3A1554]">
              What to Expect at Your First Session
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Everything you need to know before coming along to join our group.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-[#F4F2E9] rounded-2xl p-6 border border-gray-200 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#3A1554] text-white flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#3A1554]">When &amp; Where</h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                We meet every Monday evening from <strong>7:30pm to 9:30pm</strong> in the function room at <strong>The Johnstone Arms Hotel</strong>, 55 Stirling St, Alva FK12 5ED.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F4F2E9] rounded-2xl p-6 border border-gray-200 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#596C34] text-white flex items-center justify-center font-bold">
                <Music className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#3A1554]">Loaner Ukuleles</h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                Don't have an instrument yet? No problem at all! We have clean, tuned loaner ukuleles ready for you to borrow at your first practice.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F4F2E9] rounded-2xl p-6 border border-gray-200 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#3A1554] text-white flex items-center justify-center font-bold">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#3A1554]">Half-Time Drink &amp; Chat</h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                Halfway through our practice, we stop for a drink and a friendly blether. It’s a great opportunity to get to know everyone!
              </p>
            </div>

          </div>

          {/* Large Banner Callout */}
          <div className="bg-[#3A1554] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-black font-serif">
                Ready to strum along with us?
              </h3>
              <p className="text-purple-100 text-sm sm:text-base max-w-xl">
                Send us a quick message to let us know you're coming or to request a loaner ukulele for Monday night!
              </p>
            </div>

            <button
              onClick={onOpenContact}
              className="bg-[#596C34] hover:bg-[#4C5E2C] text-white font-black px-8 py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all active:scale-95 shrink-0 cursor-pointer flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>Join Us Now</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
