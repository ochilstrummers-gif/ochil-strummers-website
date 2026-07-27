import React, { useState } from 'react';
import { Music, Volume2, Sparkles, Sliders } from 'lucide-react';
import { FEATURED_SONGS } from '../data/homeData';
import { playStrumChord } from '../utils/audioTuner';

export const SongbookPreview: React.FC = () => {
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');

  const filteredSongs = filterDifficulty === 'All'
    ? FEATURED_SONGS
    : FEATURED_SONGS.filter(s => s.difficulty === filterDifficulty);

  return (
    <section id="songbook" className="py-16 bg-[#FFFDF9] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-[#F3E8FF] border border-[#DDD6FE] text-[#4C1D95] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Music className="w-3.5 h-3.5 text-amber-600" />
            <span>Club Repertoire</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] font-serif">
            Featured Songs We Play
          </h2>
          <p className="mt-2 text-base text-[#1E293B]/80 font-medium">
            Over 180 songs in our printed and digital binders — from Scottish anthems to classic pop and rock hits.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          <span className="text-xs font-bold text-[#4C1D95] uppercase tracking-wider mr-2 flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5" /> Filter:
          </span>
          {['All', 'Beginner', 'Easy'].map((level) => (
            <button
              key={level}
              onClick={() => setFilterDifficulty(level)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                filterDifficulty === level
                  ? 'bg-[#4C1D95] text-[#FAF5EE] border-[#4C1D95] shadow-xs'
                  : 'bg-[#FAF5EE] text-[#0F172A] border-[#E8DEC8] hover:border-[#4C1D95]'
              }`}
            >
              {level} Songs
            </button>
          ))}
        </div>

        {/* Song Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSongs.map((song) => (
            <div
              key={song.id}
              className="bg-[#FAF5EE] p-6 rounded-2xl border-2 border-[#E8DEC8] hover:border-[#4C1D95]/40 transition-all shadow-xs space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-black uppercase text-[#4C1D95] bg-[#F3E8FF] px-2.5 py-0.5 rounded border border-[#DDD6FE]">
                    {song.tag}
                  </span>
                  <h3 className="text-xl font-black text-[#0F172A] mt-2 font-serif">{song.title}</h3>
                  <p className="text-xs text-[#1E293B]/70 font-semibold">Artist: {song.artist}</p>
                </div>
                <span className="text-xs font-bold bg-[#0F172A] text-[#FAF5EE] px-3 py-1 rounded-full">
                  {song.difficulty}
                </span>
              </div>

              <div className="text-xs text-[#0F172A] space-y-1 bg-[#FFFDF9] p-3 rounded-xl border border-[#E8DEC8]">
                <p><strong>Tempo:</strong> {song.tempo}</p>
                <p><strong>Chords Used:</strong> {song.chords.join(', ')}</p>
              </div>

              {/* Audio Chords Button Row */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-bold text-[#4C1D95]">Hear Chords:</span>
                {song.chords.map((chord) => (
                  <button
                    key={chord}
                    onClick={() => playStrumChord(chord)}
                    className="bg-[#FFFDF9] hover:bg-[#4C1D95] text-[#4C1D95] hover:text-[#FAF5EE] px-2.5 py-1 rounded-lg border border-[#4C1D95] text-xs font-bold transition-colors flex items-center gap-1 shadow-xs"
                  >
                    <Volume2 className="w-3 h-3 text-amber-500" />
                    {chord}
                  </button>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Songbook Request Banner */}
        <div className="mt-10 bg-[#0F172A] text-[#FAF5EE] p-6 rounded-2xl border border-[#3B1F52] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4C1D95] text-amber-300 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-base">Have a favorite Scottish or pop song?</p>
              <p className="text-xs text-slate-300">We add new member requests to the songbook every month!</p>
            </div>
          </div>
          <a
            href="#faq"
            className="bg-[#FAF5EE] hover:bg-amber-100 text-[#0F172A] px-4 py-2 rounded-xl text-xs font-bold transition-colors shrink-0"
          >
            Ask About Song Requests
          </a>
        </div>

      </div>
    </section>
  );
};
