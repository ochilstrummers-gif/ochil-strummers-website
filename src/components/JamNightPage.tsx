import React, { useState } from 'react';
import { 
  Music, 
  MapPin, 
  Calendar, 
  Clock, 
  Play, 
  Volume2, 
  BookOpen, 
  Mic, 
  Sparkles, 
  Users, 
  Heart, 
  ArrowRight, 
  CheckCircle2, 
  Mail,
  Camera,
  Film
} from 'lucide-react';

import logoBadge from '../assets/images/ochil_logo_badge_1785148841944.jpg';
import pubSessionPhoto from '../assets/images/ukulele_pub_session_1785257120765.jpg';
import stageUkulelesPhoto from '../assets/images/stage_ukuleles_bass_cajon_1785255678136.jpg';
import indoorGroupPhoto from '../assets/images/gallery_indoor_group_1785148867749.jpg';
import outdoorMonumentPhoto from '../assets/images/gallery_outdoor_monument_1785148882137.jpg';
import thistlePhoto from '../assets/images/gallery_thistle_flower_1785148905098.jpg';
import { playStrumChord } from '../utils/audioTuner';

interface JamNightPageProps {
  onOpenContact: () => void;
  onNavigateHome: () => void;
  onNavigateEvents?: () => void;
}

export const JamNightPage: React.FC<JamNightPageProps> = ({ onOpenContact, onNavigateHome, onNavigateEvents }) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'PHOTOS' | 'VIDEOS'>('ALL');
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const mediaItems = [
    {
      id: 'vid-1',
      type: 'VIDEO',
      title: 'Thursday Jam Night Singalong',
      location: 'The Johnstone Arms, Alva',
      duration: '1:45',
      image: pubSessionPhoto,
      caption: 'Lively group strumming and hearty singalong in the function room at The Johnstone Arms.',
      song: 'Wild Mountain Thyme',
      chord: 'C'
    },
    {
      id: 'vid-2',
      type: 'VIDEO',
      title: 'Ukulele, Cajón & Guitar Medley',
      location: 'The Johnstone Arms, Alva',
      duration: '2:10',
      image: stageUkulelesPhoto,
      caption: 'Full rhythm section bringing together ukuleles, cajón percussion, acoustic guitar, and vocals!',
      song: '500 Miles (I\'m Gonna Be)',
      chord: 'F'
    },
    {
      id: 'img-1',
      type: 'PHOTO',
      title: 'Warm Welcome in the Function Room',
      location: 'The Johnstone Arms Hotel',
      image: indoorGroupPhoto,
      caption: 'Members arriving with ukuleles, guitars, and smiles ready for an evening of music.',
      date: 'Jam Night'
    },
    {
      id: 'img-2',
      type: 'PHOTO',
      title: 'Shared Songbooks & Good Cheer',
      location: 'The Johnstone Arms Hotel',
      image: pubSessionPhoto,
      caption: 'Following along with our provided songbooks while enjoying a drink and great company.',
      date: 'Bi-Weekly Jam'
    },
    {
      id: 'vid-3',
      type: 'VIDEO',
      title: 'Acoustic Folk Classics Jam',
      location: 'The Johnstone Arms, Alva',
      duration: '1:30',
      image: outdoorMonumentPhoto,
      caption: 'Uplifting acoustic performance featuring traditional Scottish folk tunes and pop favorites.',
      song: 'Loch Lomond',
      chord: 'G'
    },
    {
      id: 'img-3',
      type: 'PHOTO',
      title: 'Our Instrument Corner',
      location: 'The Johnstone Arms Hotel',
      image: stageUkulelesPhoto,
      caption: 'Ukuleles, bass, and percussion lined up before the jam session kicks off.',
      date: 'Thursday Jam'
    },
  ];

  const filteredMedia = mediaItems.filter(item => {
    if (activeFilter === 'PHOTOS') return item.type === 'PHOTO';
    if (activeFilter === 'VIDEOS') return item.type === 'VIDEO';
    return true;
  });

  const handlePlayMedia = (id: string, chord: string = 'C') => {
    if (playingVideoId === id) {
      setPlayingVideoId(null);
    } else {
      setPlayingVideoId(id);
      playStrumChord(chord);
    }
  };

  return (
    <div className="bg-[#F4F2E9] text-[#1A1A1A] min-h-screen">
      
      {/* 1. Page Header (Matching Header Banner Format) */}
      <section className="relative bg-[#3A1554] text-white py-6 sm:py-8 border-b border-purple-900/40">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left Column: Title and text */}
            <div className="max-w-3xl space-y-2 text-left">
              <div className="inline-block bg-purple-900/60 text-purple-200 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-purple-700/50 mb-1">
                LIVE MUSIC &amp; COMMUNITY JAM
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
                Jam Night at The Johnstone Arms
              </h1>
              <p className="text-purple-100 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
                An open acoustic jam session where every musician, singer, and music enthusiast is welcome. Bring your instrument, bring your voice, or just come along to listen and sing!
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

      {/* 2. Welcome & Key Features Overview */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Introduction & Rules */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#3A1554]/10 text-[#3A1554] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>The Johnstone Arms Hotel, Alva</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-serif text-[#3A1554]">
                Any Instrument • Any Voice • Songbook Provided
              </h2>
            </div>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-medium">
              Our Jam Nights at <strong>The Johnstone Arms Hotel in Alva</strong> run <strong>every 2nd Thursday from 7:30pm to 10:00pm</strong>. Check out our {onNavigateEvents ? (
                <button 
                  onClick={onNavigateEvents}
                  className="text-[#3A1554] underline font-bold hover:text-[#596C34] transition-colors cursor-pointer"
                >
                  Events Page
                </button>
              ) : (
                <span className="font-bold text-[#3A1554]">Events Page</span>
              )} for when we are playing next!
            </p>

            <p className="text-gray-700 text-base leading-relaxed">
              We welcome <strong>any instrument</strong>—from ukuleles and acoustic guitars to whatever you can play. Even if you don’t play an instrument, <strong>your voice is an instrument!</strong> You are warmly invited to come along and sing along with us. We provide full songbooks so everyone can follow the lyrics and chords easily.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs">
                <Calendar className="w-5 h-5 text-[#596C34] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-gray-800">Every 2nd Thursday (7:30pm - 10:00pm)</span>
              </div>

              <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#596C34] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-gray-800">Your voice is an instrument too</span>
              </div>

              <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#596C34] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-gray-800">Songbooks provided for all</span>
              </div>

              <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#596C34] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-gray-800">Cozy Johnstone Arms venue</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              {onNavigateEvents && (
                <button
                  onClick={onNavigateEvents}
                  className="bg-[#596C34] hover:bg-[#4C5E2C] text-white px-8 py-4 rounded-xl font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-lg transition-all active:scale-95 flex items-center gap-3 cursor-pointer"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Check Next Jam Date</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={onOpenContact}
                className="bg-white hover:bg-gray-50 text-[#3A1554] border-2 border-[#3A1554] px-6 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Mail className="w-4 h-4 text-[#3A1554]" />
                <span>Ask Us About Jam Night</span>
              </button>
            </div>
          </div>

          {/* Right Column: Main Showcase Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#2F1045] group">
              <img
                src={pubSessionPhoto}
                alt="Jam Night at The Johnstone Arms"
                className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1F0730] via-transparent to-transparent opacity-90" />

              <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-1">
                <div className="inline-block bg-amber-400 text-black text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md mb-1">
                  LOCATION &amp; TIME
                </div>
                <h3 className="text-xl font-bold font-serif">The Johnstone Arms Hotel, Alva</h3>
                <p className="text-xs text-purple-200">
                  Every 2nd Thursday • 7:30pm to 10:00pm • Function Room
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Photos & Video Clips Section */}
      <section className="bg-white py-12 sm:py-16 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Section Header & Filter Tabs */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-100 pb-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-[#3A1554] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Camera className="w-3.5 h-3.5" />
                <span>Jam Night Media</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-serif text-[#3A1554]">
                Videos &amp; Photos From Our Sessions
              </h2>
              <p className="text-gray-600 text-sm">
                Get a taste of the music, laughter, and atmosphere at our Johnstone Arms jam nights.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 bg-[#F4F2E9] p-1.5 rounded-xl border border-gray-200">
              <button
                onClick={() => setActiveFilter('ALL')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === 'ALL'
                    ? 'bg-[#3A1554] text-white shadow-xs'
                    : 'text-gray-700 hover:text-[#3A1554]'
                }`}
              >
                All Media
              </button>
              <button
                onClick={() => setActiveFilter('VIDEOS')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeFilter === 'VIDEOS'
                    ? 'bg-[#3A1554] text-white shadow-xs'
                    : 'text-gray-700 hover:text-[#3A1554]'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>Video Clips</span>
              </button>
              <button
                onClick={() => setActiveFilter('PHOTOS')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeFilter === 'PHOTOS'
                    ? 'bg-[#3A1554] text-white shadow-xs'
                    : 'text-gray-700 hover:text-[#3A1554]'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Photos</span>
              </button>
            </div>
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedia.map((item) => {
              const isPlaying = playingVideoId === item.id;

              return (
                <div 
                  key={item.id}
                  className="bg-[#F4F2E9] rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all group flex flex-col"
                >
                  {/* Media Thumbnail */}
                  <div className="relative h-56 overflow-hidden bg-[#2F1045]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
                      {item.type === 'VIDEO' ? (
                        <>
                          <Film className="w-3 h-3 text-amber-400" />
                          <span>Video ({item.duration})</span>
                        </>
                      ) : (
                        <>
                          <Camera className="w-3 h-3 text-purple-300" />
                          <span>Photo</span>
                        </>
                      )}
                    </div>

                    {/* Interactive Play Button for Videos */}
                    {item.type === 'VIDEO' && (
                      <button
                        onClick={() => handlePlayMedia(item.id, item.chord)}
                        className="absolute inset-0 flex items-center justify-center cursor-pointer group/play"
                        title="Click to play sample jam strum"
                      >
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                          isPlaying 
                            ? 'bg-amber-400 text-black scale-110 shadow-lg' 
                            : 'bg-white/90 text-[#3A1554] group-hover/play:scale-110 group-hover/play:bg-amber-400 group-hover/play:text-black shadow-md'
                        }`}>
                          {isPlaying ? (
                            <Volume2 className="w-6 h-6 animate-pulse" />
                          ) : (
                            <Play className="w-6 h-6 fill-current ml-0.5" />
                          )}
                        </div>
                      </button>
                    )}

                    {/* Song overlay if playing */}
                    {isPlaying && (
                      <div className="absolute bottom-3 left-3 right-3 bg-[#3A1554]/90 backdrop-blur-xs p-2 rounded-lg border border-purple-400/40 text-white text-xs flex items-center justify-between">
                        <span className="font-bold truncate">🎵 Playing: {item.song}</span>
                        <span className="text-[10px] bg-amber-400 text-black font-extrabold px-1.5 py-0.5 rounded">
                          Strumming
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#596C34]">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{item.location}</span>
                      </div>
                      <h3 className="text-lg font-bold text-[#3A1554] leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {item.caption}
                      </p>
                    </div>

                    {item.type === 'VIDEO' && (
                      <button
                        onClick={() => handlePlayMedia(item.id, item.chord)}
                        className="w-full text-center py-2 bg-white hover:bg-purple-50 text-[#3A1554] font-bold text-xs rounded-lg border border-purple-200 transition-colors cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-[#3A1554]" />
                        <span>{isPlaying ? 'Stop Audio Sample' : 'Listen to Jam Sample'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};
