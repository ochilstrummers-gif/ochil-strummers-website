import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Music, Volume2, Sparkles, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { NEXT_SESSION, FEATURED_SONGS, SongPreview } from '../data/homeData';
import { playStrumChord, playUkuleleNote } from '../utils/audioTuner';

interface NextSessionCardProps {
  onOpenJoinModal: () => void;
}

export const NextSessionCard: React.FC<NextSessionCardProps> = ({ onOpenJoinModal }) => {
  const [activeSongId, setActiveSongId] = useState<string | null>(FEATURED_SONGS[0].id);
  const [playingChord, setPlayingChord] = useState<string | null>(null);

  const handlePlayChord = (chord: string) => {
    setPlayingChord(chord);
    playStrumChord(chord);
    setTimeout(() => setPlayingChord(null), 800);
  };

  return (
    <section id="next-session" className="py-16 bg-[#FAF5EE] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F3E8FF] border border-[#DDD6FE] text-[#4C1D95] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>Weekly Practice Night</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] font-serif">
            Join Us This Monday Evening
          </h2>
          <p className="mt-2 text-base sm:text-lg text-[#1E293B]/80 font-medium">
            Whether you've played for years or are picking up a ukulele for the first time, you'll find a warm welcome at The Johnstone Arms Hotel in Alva.
          </p>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Venue & Logistics Card (Navy Dark Theme) */}
          <div className="lg:col-span-5 bg-[#0F172A] text-[#FAF5EE] rounded-3xl p-6 sm:p-8 shadow-xl border border-[#3B1F52] space-y-6">
            
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-300 font-extrabold">Next Session</span>
                <h3 className="text-2xl font-black text-[#FAF5EE] font-serif mt-0.5">Alva Strum Night</h3>
              </div>
              <span className="bg-[#4C1D95] text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-[#DDD6FE]/30">
                Weekly Monday
              </span>
            </div>

            {/* Logistics Details */}
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 bg-[#1E293B] p-3.5 rounded-xl border border-[#3B1F52]">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#FAF5EE]">{NEXT_SESSION.time}</p>
                  <p className="text-xs text-slate-300">{NEXT_SESSION.doorsOpen}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#1E293B] p-3.5 rounded-xl border border-[#3B1F52]">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#FAF5EE]">{NEXT_SESSION.venue}</p>
                  <p className="text-xs text-slate-300">{NEXT_SESSION.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#1E293B] p-3.5 rounded-xl border border-[#3B1F52]">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#FAF5EE]">Entry Fee: {NEXT_SESSION.cost}</p>
                  <p className="text-xs text-amber-200">First session free for new visitors!</p>
                </div>
              </div>
            </div>

            {/* Evening Schedule Timeline */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-3">
                Evening Schedule (2 Hours)
              </h4>
              <div className="space-y-2 text-xs border-l-2 border-[#4C1D95] pl-3">
                <p><strong className="text-amber-200">6:45 PM:</strong> Doors open, tuning & free loaner uke setup</p>
                <p><strong className="text-amber-200">7:00 PM:</strong> Warm-up songs & easy chord refresher</p>
                <p><strong className="text-amber-200">8:00 PM:</strong> Half-time tea, shortbread & chat</p>
                <p><strong className="text-amber-200">8:15 PM:</strong> Feature songbook strum-along</p>
                <p><strong className="text-amber-200">9:00 PM:</strong> Finish & chat</p>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => { window.open('https://heartfelt-biscotti-1bbd29.netlify.app/forms/join.html', '_blank'); }}
              className="w-full bg-gradient-to-r from-[#6D28D9] to-[#4C1D95] hover:from-[#7C3AED] hover:to-[#5B21B6] text-[#FAF5EE] font-bold py-3.5 px-4 rounded-xl shadow-md border border-[#DDD6FE]/30 transition-all text-center text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Reserve a Free Beginner Spot</span>
            </button>

          </div>

          {/* Column 2: This Week's Songbook & Interactive Chord Audio Preview */}
          <div className="lg:col-span-7 bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 shadow-md border-2 border-[#E8DEC8] space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E8DEC8]">
              <div>
                <span className="text-xs font-extrabold text-[#4C1D95] uppercase tracking-wider">Songbook Preview</span>
                <h3 className="text-2xl font-black text-[#0F172A] font-serif">Songs We'll Strum This Week</h3>
              </div>
              <span className="text-xs font-bold bg-[#F3E8FF] text-[#4C1D95] px-3 py-1 rounded-full border border-[#DDD6FE]">
                Click chords to hear tuning audio!
              </span>
            </div>

            {/* Song Selection Tabs */}
            <div className="space-y-3">
              {FEATURED_SONGS.map((song: SongPreview) => {
                const isSelected = activeSongId === song.id;
                return (
                  <div
                    key={song.id}
                    className={`rounded-2xl border transition-all cursor-pointer overflow-hidden ${
                      isSelected
                        ? 'border-[#4C1D95] bg-[#FAF5EE] shadow-md'
                        : 'border-[#E8DEC8] bg-[#FFFDF9] hover:border-[#4C1D95]/50'
                    }`}
                  >
                    {/* Song Bar */}
                    <div
                      onClick={() => setActiveSongId(isSelected ? null : song.id)}
                      className="p-4 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                          isSelected ? 'bg-[#4C1D95] text-[#FAF5EE]' : 'bg-[#F5EFE6] text-[#0F172A]'
                        }`}>
                          <Music className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-[#0F172A] text-base">{song.title}</h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#4C1D95] text-[#FAF5EE]">
                              {song.tag}
                            </span>
                          </div>
                          <p className="text-xs text-[#1E293B]/70 font-medium">By {song.artist} • {song.tempo}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#4C1D95] bg-[#F3E8FF] px-2.5 py-1 rounded-md hidden sm:inline-block">
                          {song.difficulty}
                        </span>
                        {isSelected ? <ChevronUp className="w-5 h-5 text-[#4C1D95]" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                      </div>
                    </div>

                    {/* Expanded Chord & Audio Strum Helper */}
                    {isSelected && (
                      <div className="px-4 pb-4 pt-2 border-t border-[#E8DEC8]/80 bg-[#FAF5EE] space-y-3">
                        <p className="text-xs text-[#0F172A]/80 font-medium">
                          Tap any chord button below to play its acoustic Ukulele strum sound:
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          {song.chords.map((chord) => (
                            <button
                              key={chord}
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePlayChord(chord);
                              }}
                              className={`px-3.5 py-2 rounded-xl font-black text-sm transition-all border shadow-xs flex items-center gap-1.5 ${
                                playingChord === chord
                                  ? 'bg-[#6D28D9] text-[#FAF5EE] border-[#DDD6FE] scale-105'
                                  : 'bg-[#FFFDF9] text-[#4C1D95] border-[#4C1D95] hover:bg-[#4C1D95] hover:text-[#FAF5EE]'
                              }`}
                            >
                              <Volume2 className="w-3.5 h-3.5 text-amber-500" />
                              <span>{chord} Chord</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

            {/* Beginner Assurance Footer */}
            <div className="bg-[#F3E8FF] border border-[#DDD6FE] p-4 rounded-2xl flex items-center gap-3 text-xs sm:text-sm text-[#4C1D95] font-semibold">
              <Check className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Full songbooks with chord charts are provided free at every session. No printing needed!</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
