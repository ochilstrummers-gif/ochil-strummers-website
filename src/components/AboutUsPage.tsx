import React from 'react';
import { Heart, Coffee, Users, Award, Sparkles, CheckCircle2, ArrowLeft, MapPin, Calendar, Music, Mail, HelpCircle, ShieldCheck } from 'lucide-react';
import groupPhoto from '../assets/images/ukulele_pub_session_1785257120765.jpg';
import indoorGroupPhoto from '../assets/images/gallery_indoor_group_1785148867749.jpg';
import womenStrummersPhoto from '../assets/images/gallery_women_strummers_1785148893490.jpg';
import monumentPhoto from '../assets/images/gallery_outdoor_monument_1785148882137.jpg';
import thistleImg from '../assets/images/thistle.png';

interface AboutUsPageProps {
  onOpenContact: () => void;
  onNavigateHome: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onOpenContact, onNavigateHome }) => {
  return (
    <div className="bg-[#F4F2E9] text-[#1A1A1A] min-h-screen">
      
      {/* 1. Page Header / Hero Banner */}
      <section className="relative bg-[#3A1554] text-white py-12 sm:py-16 overflow-hidden">
        {/* Background thistle watermarks */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-32 h-40 opacity-15 pointer-events-none">
          <img src={thistleImg} alt="" className="w-full h-full object-contain filter brightness-0 invert" />
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-32 h-40 opacity-15 pointer-events-none">
          <img src={thistleImg} alt="" className="w-full h-full object-contain filter brightness-0 invert scale-x-[-1]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-purple-200 hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-6 transition-colors bg-purple-900/40 px-3.5 py-1.5 rounded-full border border-purple-400/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#596C34] text-white px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Our Ethos &amp; Story</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
              About Ochil Strummers
            </h1>
            <p className="text-purple-100 text-base sm:text-lg font-medium leading-relaxed">
              Central Scotland's friendliest ukulele club — bringing people together across Alva, Tillicoultry, Dollar, Alloa, and Stirling through music, laughter, and warm Scottish hospitality.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Story & Image Showcase */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Group Photo Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#2F1045]">
              <img
                src={groupPhoto}
                alt="Ochil Strummers Ukulele Group"
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#2F1045]/90 backdrop-blur-md p-4 rounded-2xl border border-purple-400/30 text-white">
                <p className="text-xs font-extrabold text-amber-300 uppercase tracking-wider">Scottish Community</p>
                <p className="text-sm font-bold mt-0.5">Established at the foot of the Ochil Hills</p>
              </div>
            </div>
          </div>

          {/* Right: Story Content */}
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#3A1554]">
              "If you can hold it, you can strum it!"
            </h2>
            
            <p className="text-gray-700 text-base leading-relaxed">
              Ochil Strummers was formed with a simple goal: to create a warm, welcoming, and completely pressure-free environment where anyone can learn and enjoy playing the ukulele.
            </p>

            <p className="text-gray-700 text-base leading-relaxed">
              Whether you picked up a ukulele yesterday or have been playing for decades, our weekly sessions at <strong>The Johnstone Arms Hotel in Alva</strong> provide a relaxed space to sing along to traditional Scottish songs, classic pop hits, and folk favorites.
            </p>

            {/* Checklist items */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-3 text-sm text-gray-800 font-semibold">
                <CheckCircle2 className="w-5 h-5 text-[#596C34] shrink-0" />
                <span>Zero auditions or sheet-music reading required</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-800 font-semibold">
                <CheckCircle2 className="w-5 h-5 text-[#596C34] shrink-0" />
                <span>Free loaner ukuleles reserved for absolute beginners</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-800 font-semibold">
                <CheckCircle2 className="w-5 h-5 text-[#596C34] shrink-0" />
                <span>Half-time tea, coffee, and shortbread included every week</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-800 font-semibold">
                <CheckCircle2 className="w-5 h-5 text-[#596C34] shrink-0" />
                <span>Community performances at local care homes, galas, and charity events</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={onOpenContact}
                className="bg-[#596C34] hover:bg-[#4C5E2C] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Get In Touch To Join</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Club Pillars / Values Grid */}
      <section className="bg-white py-12 sm:py-16 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-black font-serif text-[#3A1554]">
              What Makes Our Club Special
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Four simple pillars that guide everything we do every week
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-gray-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#3A1554] text-white flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 font-serif">1. Everyone Welcome</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                No auditions, no tests, and no experience needed. People of all ages and backgrounds join together to play.
              </p>
            </div>

            <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-gray-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#596C34] text-white flex items-center justify-center font-bold">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 font-serif">2. The Half-Time Blether</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Music is only half the fun! We pause mid-session for tea, coffee, Scottish shortbread, and friendly chats.
              </p>
            </div>

            <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-gray-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#3A1554] text-white flex items-center justify-center font-bold">
                <Music className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 font-serif">3. Diverse Songbook</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                From Scottish folk classics like <i>Wild Mountain Thyme</i> to upbeat 60s pop and modern tunes.
              </p>
            </div>

            <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-gray-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#596C34] text-white flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 font-serif">4. Community Spirit</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                We perform at local care homes, charity fundraisers, and community galas to spread joy through music.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Photo Gallery Highlights */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#3A1554]">
            Life at Ochil Strummers
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Snapshots from our weekly sessions and outings across Clackmannanshire
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white">
            <img src={indoorGroupPhoto} alt="Indoor strum session" className="w-full h-56 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-sm text-gray-900">Weekly Gatherings</h3>
              <p className="text-xs text-gray-500 mt-1">Strumming together in a warm, relaxed atmosphere.</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white">
            <img src={womenStrummersPhoto} alt="Strummers rehearsing" className="w-full h-56 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-sm text-gray-900">Friendly &amp; Inclusive</h3>
              <p className="text-xs text-gray-500 mt-1">Members supporting each other with chord tips and smiles.</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white">
            <img src={monumentPhoto} alt="Outdoor community performance" className="w-full h-56 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-sm text-gray-900">Community Outings</h3>
              <p className="text-xs text-gray-500 mt-1">Sharing music at local Scottish landmarks and galas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Group Leadership / Committee Section (Ready for user to populate) */}
      <section className="bg-[#FAF9F5] py-12 sm:py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#596C34]">Meet The Team</span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#3A1554] mt-1">
              Group Organisers &amp; Song Leaders
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              The volunteers who keep Ochil Strummers running smoothly every week
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            {/* Organiser Card 1 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-purple-100 text-[#3A1554] flex items-center justify-center mx-auto border-2 border-purple-300 font-bold text-xl">
                OS
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900">Group Coordinator</h3>
                <p className="text-xs text-[#596C34] font-semibold">Organiser &amp; Host</p>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Welcomes new members, sets up the hall, and makes sure everyone has a ukulele and a songbook!
              </p>
            </div>

            {/* Organiser Card 2 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-[#596C34] flex items-center justify-center mx-auto border-2 border-emerald-300 font-bold text-xl">
                SL
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900">Song Leader</h3>
                <p className="text-xs text-[#596C34] font-semibold">Musical Guide</p>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Guides us through chords, tempos, and vocal harmonies with patience, humor, and enthusiasm.
              </p>
            </div>

            {/* Organiser Card 3 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs text-center space-y-3 sm:col-span-2 lg:col-span-1">
              <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto border-2 border-amber-300 font-bold text-xl">
                TC
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900">Tea &amp; Hospitality</h3>
                <p className="text-xs text-[#596C34] font-semibold">Half-Time Refreshments</p>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Ensures the kettle is boiled and the biscuits are stacked ready for our half-time break!
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Frequently Asked Questions */}
      <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3A1554] uppercase tracking-wider bg-purple-100 px-3 py-1 rounded-full mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#3A1554]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4 text-left">
          
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
            <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#596C34]"></span>
              Do I need to own a ukulele to come along?
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 pl-4 leading-relaxed">
              Not at all! We have 8 spare loaner ukuleles available free of charge for newcomers. Just let us know in advance so we can reserve one for you.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
            <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#596C34]"></span>
              What if I can't read sheet music or play any instrument?
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 pl-4 leading-relaxed">
              No problem! Ukulele chord charts are simple diagrams showing where to place your fingers. Most songs use just 3 or 4 basic chords, and we learn at a comfortable, easy pace together.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
            <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#596C34]"></span>
              When and where do you meet?
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 pl-4 leading-relaxed">
              We meet at <strong>The Johnstone Arms Hotel, 55 Stirling St, Alva FK12 5ED</strong>. Check our Events calendar or reach out to confirm our upcoming session times!
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
            <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#596C34]"></span>
              Is there a fee to attend sessions?
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 pl-4 leading-relaxed">
              Your first session is completely free! After that, we charge a modest small weekly contribution to cover hall hire and tea/biscuit supplies.
            </p>
          </div>

        </div>
      </section>

      {/* 7. Bottom Call to Action */}
      <section className="bg-[#3A1554] text-white py-12 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 space-y-4 relative z-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-serif">
            Ready to Join the Strum?
          </h2>
          <p className="text-purple-100 text-sm sm:text-base max-w-xl mx-auto">
            Come along to our next session and experience the joy of making music together in a friendly community.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenContact}
              className="bg-[#596C34] hover:bg-[#4C5E2C] text-white font-bold px-8 py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all active:scale-95"
            >
              Contact Us To Get Started
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
