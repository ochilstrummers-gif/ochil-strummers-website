import React from 'react';
import { 
  Smile, 
  Users, 
  Mic, 
  Star, 
  Sparkles, 
  Heart, 
  Music, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight, 
  UserPlus, 
  CheckCircle2, 
  Coffee, 
  BookOpen 
} from 'lucide-react';

import logoBadge from '../assets/images/ochil_logo_badge_1785148841944.jpg';
import thistlePhoto from '../assets/images/gallery_thistle_flower_1785148905098.jpg';
import pubSessionPhoto from '../assets/images/ukulele_pub_session_1785257120765.jpg';

export interface AboutUsPageProps {
  onOpenContact?: () => void;
  onNavigateHome?: () => void;
  onOpenFreeTasterModal?: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ 
  onOpenContact = () => {}, 
  onNavigateHome = () => {},
  onOpenFreeTasterModal
}) => {
  const handleTasterClick = () => {
    if (onOpenFreeTasterModal) {
      onOpenFreeTasterModal();
    } else {
      onOpenContact();
    }
  };

  return (
    <div className="bg-[#FAF8F5] text-[#1A1A1A] min-h-screen font-sans pb-20">
      
      {/* 0. Top Page Header Banner */}
      <section className="relative bg-[#3A1554] text-white py-6 sm:py-8 border-b border-purple-900/40">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left Column: Title and description */}
            <div className="max-w-3xl space-y-2 text-left">
              <div className="inline-block bg-purple-900/60 text-purple-200 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-purple-700/50 mb-1">
                OUR HERITAGE &amp; COMMUNITY
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
                Our Story So Far
              </h1>
              <p className="text-purple-100 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
                Learn about Ochil Strummers — a friendly, vibrant community ukulele group proudly based in Clackmannanshire, Scotland, at the foot of the magnificent Ochil Hills.
              </p>
            </div>

            {/* Right Column: Logo badge */}
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

      {/* 1. SECTION: OUR STORY SO FAR CONTENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5 text-gray-700 text-sm sm:text-base leading-relaxed">
            <p>
              <strong className="text-[#3A1554] font-bold">Ochil Strummers</strong> is a friendly, vibrant community ukulele group proudly based in Clackmannanshire, Scotland, at the foot of the magnificent Ochil Hills.
            </p>

            <p>
              We welcome everyone, from complete beginners who have never held an instrument before to experienced players looking for a lively group to play, sing and socialise with.
            </p>

            <p>
              The band is built on friendship, fun and making music together. There are no intimidating auditions or strict music-reading requirements, just easy-to-follow song sheets, friendly encouragement, and plenty of laughs over a pint or soft drink during our weekly sessions
            </p>

            <p>
              Established in 2025, Ochil Strummers is proudly committee-led, with the day-to-day running of the band shared by a dedicated team of volunteers. We believe in openness, accountability and transparency, with members' subscriptions and fundraising income carefully managed and reinvested back into the band to benefit everyone.
            </p>

            {/* Quote / Highlight Box */}
            <div className="mt-6 p-5 sm:p-7 bg-[#F5F2EA]/80 rounded-2xl border-l-4 border-[#3A1554] shadow-xs">
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed font-normal">
                Whether we're rehearsing on a Monday evening, entertaining audiences at community events, supporting local charities, or simply enjoying making music together, our aim is always the same—to create a welcoming place where friendships grow, confidence flourishes and everyone can enjoy the magic of playing the ukulele.
              </p>
            </div>
          </div>

          {/* Right Image Card Column - Replaced with an elegant premium CSS visual placeholder */}
          <div className="lg:col-span-5 relative mt-2 lg:mt-0">
            <div className="relative rounded-[28px] overflow-hidden shadow-2xl bg-gradient-to-br from-[#4C1D95] via-[#3A1554] to-[#1E0B2E] p-8 text-white h-[450px] sm:h-[520px] flex flex-col justify-between border border-purple-500/20">
              
              {/* Decorative Background Elements */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.15),transparent_60%)] pointer-events-none" />
              <div className="absolute top-10 right-10 opacity-10 pointer-events-none">
                <Music className="w-32 h-32 text-white" />
              </div>

              {/* Top part: Badges and Header */}
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>ALVA REHEARSAL HOME</span>
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-serif font-black text-white leading-tight">
                  The Johnstone Arms
                </h3>
                <p className="text-purple-200 text-sm leading-relaxed max-w-sm">
                  Our welcoming and atmospheric Monday evening gathering space where the strumming circle comes alive.
                </p>
              </div>

              {/* Middle details panel */}
              <div className="relative z-10 space-y-3 bg-[#2A0F3D]/50 backdrop-blur-xs p-5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-300" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">When We Meet</h4>
                    <p className="text-sm font-semibold">Mondays, 7:00 PM – 9:00 PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-amber-300" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">Social Aspect</h4>
                    <p className="text-sm font-semibold">Drinks, laughs &amp; chat during interval</p>
                  </div>
                </div>
              </div>

              {/* Bottom tag line */}
              <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4">
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  No Auditions • All Welcome
                </div>
                <div className="text-xs text-purple-200">
                  Clackmannanshire, Scotland
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      <hr className="border-gray-200 max-w-7xl mx-auto my-2 opacity-60" />

      {/* 2. SECTION: OUR JOURNEY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:pt-6 sm:pb-16">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3A1554] mb-8">
          Our Journey
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Journey Card 1 */}
          <div className="bg-[#FAF8F5] bg-gradient-to-b from-[#F7F4EC] to-[#FAF8F5] p-6 sm:p-7 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200/80 flex items-center justify-center text-[#3A1554] mb-6 shadow-2xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#3A1554] mb-3">
                2025 – A New Beginning
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                The group was established as a committee-led community ukulele group, creating a welcoming, inclusive environment where people of all abilities could enjoy making music together.
              </p>
            </div>
          </div>

          {/* Journey Card 2 */}
          <div className="bg-[#FAF8F5] bg-gradient-to-b from-[#F7F4EC] to-[#FAF8F5] p-6 sm:p-7 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200/80 flex items-center justify-center text-[#3A1554] mb-6 shadow-2xs">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#3A1554] mb-3">
                2025 – Building a Community
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Weekly rehearsals, social events and performances quickly brought together a growing group of enthusiastic players, united by a shared love of music, friendship and fun.
              </p>
            </div>
          </div>

          {/* Journey Card 3 */}
          <div className="bg-[#FAF8F5] bg-gradient-to-b from-[#F7F4EC] to-[#FAF8F5] p-6 sm:p-7 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200/80 flex items-center justify-center text-[#3A1554] mb-6 shadow-2xs">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#3A1554] mb-3">
                2025–2026 – Performing for the Community
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                The group began entertaining audiences at local events, charity fundraisers, care homes, festivals and community venues across Central Scotland, helping to spread smiles through music while supporting worthwhile causes.
              </p>
            </div>
          </div>

          {/* Journey Card 4 */}
          <div className="bg-[#FAF8F5] bg-gradient-to-b from-[#F7F4EC] to-[#FAF8F5] p-6 sm:p-7 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200/80 flex items-center justify-center text-[#3A1554] mb-6 shadow-2xs">
                <Star className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#3A1554] mb-3">
                Today
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                With our new brand, Ochil Strummers, we will continue to grow, welcoming new members of all ages and abilities. Our vision remains simple: to provide a friendly place where everyone can learn, laugh, perform and enjoy making music together.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SECTION: OUR MISSION */}
      <section className="bg-[#F6F3EB] pt-8 pb-16 border-t border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="mb-3">
            <span className="inline-block bg-[#EAE4D7] text-[#3A1554] text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
              OUR AIMS &amp; VALUES
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#3A1554] mb-4">
            Our Mission
          </h2>

          <p className="text-gray-700 text-base sm:text-lg max-w-3xl mx-auto mb-12 leading-relaxed">
            At Ochil Strummers, our core purpose goes beyond just learning chords — we aim to create a welcoming musical home where everyone can thrive.
          </p>

          {/* Mission Cards: Top 3 Cards, Bottom 2 Cards Centered */}
          <div className="space-y-6">
            
            {/* Top Row: 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              
              {/* Aim 1 */}
              <div className="bg-white p-7 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F6F3EB] flex items-center justify-center text-[#3A1554] mb-6">
                    <Smile className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#3A1554] mb-3">
                    Inclusive Music Making
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    To provide a supportive, welcoming environment where people of all musical backgrounds, from complete beginners to seasoned strummers, can play together without fear or pressure.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#3A1554]">
                  <span>Aim #1</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
              </div>

              {/* Aim 2 */}
              <div className="bg-white p-7 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F6F3EB] flex items-center justify-center text-[#3A1554] mb-6">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#3A1554] mb-3">
                    Community &amp; Connection
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    To foster warm Scottish friendships, combat social isolation, and bring people together through the shared joy of song, conversation, and community spirit.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#3A1554]">
                  <span>Aim #2</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
              </div>

              {/* Aim 3 */}
              <div className="bg-white p-7 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F6F3EB] flex items-center justify-center text-[#3A1554] mb-6">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#3A1554] mb-3">
                    Sharing Joy Through Performance
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    To entertain local audiences across Clackmannanshire and Central Scotland, performing at care homes, local festivals, and charity events.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#3A1554]">
                  <span>Aim #3</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
              </div>

            </div>

            {/* Bottom Row: 2 Cards Centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
              
              {/* Aim 4 */}
              <div className="bg-white p-7 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F6F3EB] flex items-center justify-center text-[#3A1554] mb-6">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#3A1554] mb-3">
                    Accessible Learning
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    To offer gentle, easy-to-follow guidance and shared songbooks so anyone can learn at their own pace with loan ukuleles available.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#3A1554]">
                  <span>Aim #4</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
              </div>

              {/* Aim 5 */}
              <div className="bg-white p-7 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F6F3EB] flex items-center justify-center text-[#3A1554] mb-6">
                    <Music className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#3A1554] mb-3">
                    Fun &amp; Wellbeing
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    To promote mental health and personal wellbeing through laughter, singing out loud, and the therapeutic, uplifting nature of the ukulele.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#3A1554]">
                  <span>Aim #5</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. SECTION: WHAT MAKES US DIFFERENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 text-center">
        
        <div className="mb-3">
          <span className="inline-block bg-[#F2EDE4] text-[#3A1554] text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
            WHY YOU'LL LOVE STRUMMING WITH US
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#3A1554] mb-3">
          What Makes Us Different
        </h2>

        <p className="text-gray-600 text-base sm:text-lg mb-12">
          Here is what sets our friendly Scottish community group apart.
        </p>

        {/* 6 Cards 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          {/* Card 1 */}
          <div className="bg-[#FAF8F5] p-7 rounded-2xl border border-gray-200/80 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200/80 flex items-center justify-center text-[#3A1554] mb-6">
              <Smile className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#3A1554] mb-3">
              No Auditions Ever
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Whether you've played for decades or just bought your first ukulele yesterday, you are warmly invited. We have seats for all skill levels.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#FAF8F5] p-7 rounded-2xl border border-gray-200/80 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200/80 flex items-center justify-center text-[#3A1554] mb-6">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#3A1554] mb-3">
              Loan Ukuleles Available
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Don't own an instrument yet? No problem at all! Let us know beforehand and we'll have a tuned ukulele ready for you to try out.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#FAF8F5] p-7 rounded-2xl border border-gray-200/80 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200/80 flex items-center justify-center text-[#3A1554] mb-6">
              <UserPlus className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#3A1554] mb-3">
              Warm Scottish Hospitality
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our rehearsals always feature a half-time break with either a pint or soft drink and friendly chat. It's as much a social club as a musical group.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#FAF8F5] p-7 rounded-2xl border border-gray-200/80 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200/80 flex items-center justify-center text-[#3A1554] mb-6">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#3A1554] mb-3">
              Easy Tabbed Songbooks
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We provide clean, clear chord sheets with simple diagrams so you can follow along easily even if you can't read standard sheet music.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-[#FAF8F5] p-7 rounded-2xl border border-gray-200/80 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200/80 flex items-center justify-center text-[#3A1554] mb-6">
              <Mic className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#3A1554] mb-3">
              Community Gigs &amp; Outreach
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We regularly perform for local care homes, community fetes, and local charity fundraisers, spreading cheer wherever we play.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-[#FAF8F5] p-7 rounded-2xl border border-gray-200/80 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200/80 flex items-center justify-center text-[#3A1554] mb-6">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#3A1554] mb-3">
              Friendly Mentorship
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our experienced members sit alongside newcomers to offer gentle hints and strumming tips in a zero-pressure setting.
            </p>
          </div>

        </div>
      </section>

      {/* 5. SECTION: MEET OUR COMMITTEE */}
      <section className="bg-[#F6F3EB] pt-8 pb-16 border-t border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="mb-3">
            <span className="inline-block bg-[#EAE4D7] text-[#3A1554] text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
              FRIENDLY FACES
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#3A1554] mb-6">
            Meet our Committee
          </h2>

          <div className="max-w-3xl mx-auto space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed mb-12">
            <p>
              Behind every rehearsal, performance and event is a team of dedicated volunteers who generously give their time to help Ochil Strummers thrive.
            </p>
            <p>
              From organising rehearsals and performances to managing finances, maintaining our website and supporting new members, our committee works together to ensure everyone enjoys being part of the band.
            </p>
            <p>
              Above all, we're simply fellow band members who share a passion for music, friendship and making Ochil Strummers a welcoming place for everyone.
            </p>
          </div>

          {/* Committee Grid - Restructured into a clean 5-person grid */}
          <div className="space-y-6 text-left">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              
              {/* Member 1: Pauline Sutton */}
              <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs flex flex-col justify-between">
                <div>
                  {/* Photo Placeholder */}
                  <div className="bg-[#EFECE6] h-48 relative flex flex-col items-center justify-center text-gray-500">
                    <span className="absolute top-3 right-3 bg-[#3A1554] text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-2xs">
                      Concert Ukulele &amp; Cajon
                    </span>
                    <UserPlus className="w-8 h-8 text-[#3A1554]/60 mb-1" />
                    <span className="font-serif text-sm font-bold text-[#3A1554]/80">Photo to be added</span>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 space-y-2">
                    <h3 className="text-xl font-serif font-bold text-[#3A1554]">
                      Pauline Sutton
                    </h3>
                    <p className="text-xs font-bold text-[#3A1554] uppercase tracking-wider">
                      VICE CHAIRPERSON &amp; BAND LEADER
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed pt-2">
                      Helping to shape the future of the group and encouraging players of all abilities, creating an enjoyable rehearsal environment, and leading performances that showcase the band's spirit and dedication.
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-100 text-xs text-gray-500">
                  Member since: 2025
                </div>
              </div>

              {/* Member 2: Linda Nisbet */}
              <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs flex flex-col justify-between">
                <div>
                  {/* Photo Placeholder */}
                  <div className="bg-[#EFECE6] h-48 relative flex flex-col items-center justify-center text-gray-500">
                    <span className="absolute top-3 right-3 bg-[#3A1554] text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-2xs">
                      Tenor Ukulele
                    </span>
                    <UserPlus className="w-8 h-8 text-[#3A1554]/60 mb-1" />
                    <span className="font-serif text-sm font-bold text-[#3A1554]/80">Photo to be added</span>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 space-y-2">
                    <h3 className="text-xl font-serif font-bold text-[#3A1554]">
                      Linda Nisbet
                    </h3>
                    <p className="text-xs font-bold text-[#3A1554] uppercase tracking-wider">
                      CHAIRPERSON &amp; DIGITAL COMMUNICATIONS
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed pt-2">
                      Helping shape the future of Ochil Strummers while looking after our website, social media and communications, ensuring our band stays connected both on and off the stage.
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-100 text-xs text-gray-500">
                  Member since: 2025
                </div>
              </div>

              {/* Member 3: Chris Matheson */}
              <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs flex flex-col justify-between">
                <div>
                  {/* Photo Placeholder */}
                  <div className="bg-[#EFECE6] h-48 relative flex flex-col items-center justify-center text-gray-500">
                    <span className="absolute top-3 right-3 bg-[#3A1554] text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-2xs">
                      Baritone Ukulele
                    </span>
                    <UserPlus className="w-8 h-8 text-[#3A1554]/60 mb-1" />
                    <span className="font-serif text-sm font-bold text-[#3A1554]/80">Photo to be added</span>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 space-y-2">
                    <h3 className="text-xl font-serif font-bold text-[#3A1554]">
                      Chris Matheson
                    </h3>
                    <p className="text-xs font-bold text-[#3A1554] uppercase tracking-wider">
                      GIG ORGANISER
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed pt-2">
                      Coordinating our external performances, charity outings, and community concerts, ensuring we are set up for success and ready to entertain.
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-100 text-xs text-gray-500">
                  Member since: 2025
                </div>
              </div>

              {/* Member 3: Emma Robinson */}
              <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs flex flex-col justify-between">
                <div>
                  {/* Photo Placeholder */}
                  <div className="bg-[#EFECE6] h-48 relative flex flex-col items-center justify-center text-gray-500">
                    <span className="absolute top-3 right-3 bg-[#3A1554] text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-2xs">
                      Excel Spreadsheet
                    </span>
                    <UserPlus className="w-8 h-8 text-[#3A1554]/60 mb-1" />
                    <span className="font-serif text-sm font-bold text-[#3A1554]/80">Photo to be added</span>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 space-y-2">
                    <h3 className="text-xl font-serif font-bold text-[#3A1554]">
                      Emma Robinson
                    </h3>
                    <p className="text-xs font-bold text-[#3A1554] uppercase tracking-wider">
                      TREASURER
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed pt-2">
                      Carefully managing the band's finances, subscriptions, and fundraising income, ensuring they are transparently reinvested back into the club.
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-100 text-xs text-gray-500">
                  Member since: 2025
                </div>
              </div>

              {/* Member 4: Janet Cheetham */}
              <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs flex flex-col justify-between">
                <div>
                  {/* Photo Placeholder */}
                  <div className="bg-[#EFECE6] h-48 relative flex flex-col items-center justify-center text-gray-500">
                    <span className="absolute top-3 right-3 bg-[#3A1554] text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-2xs">
                      Concert Ukulele
                    </span>
                    <UserPlus className="w-8 h-8 text-[#3A1554]/60 mb-1" />
                    <span className="font-serif text-sm font-bold text-[#3A1554]/80">Photo to be added</span>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 space-y-2">
                    <h3 className="text-xl font-serif font-bold text-[#3A1554]">
                      Janet Cheetham
                    </h3>
                    <p className="text-xs font-bold text-[#3A1554] uppercase tracking-wider">
                      SECRETARY
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed pt-2">
                      Managing our general admin, membership records, minutes, and communications, ensuring the day-to-day operations run smoothly.
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-100 text-xs text-gray-500">
                  Member since: 2026
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutUsPage;
